// js/ui/render.js
import { state, isChannelDead, getChannelDeadType } from "../core/state.js";
import { escapeHtml, escapeAttr, initials } from "../utils/escape.js";

const CHUNK_SIZE = 60;

/* ── IntersectionObserver: infinite scroll ── */
let sentinelObserver = null;

function removeSentinel() {
    if (sentinelObserver) {
        sentinelObserver.disconnect();
        sentinelObserver = null;
    }
    document.getElementById("scrollSentinel")?.remove();
}

/* ── IntersectionObserver: lazy-load logo ── */
let logoObserver = null;

function resetLogoObserver() {
    if (logoObserver) {
        logoObserver.disconnect();
        logoObserver = null;
    }
}

/**
 * Beberapa domain logo diketahui selalu gagal di browser karena:
 * - Wikipedia/Wikimedia: OpaqueResponseBlocking (SVG dengan CORS ketat)
 * - upload.wikimedia.org: sama
 * Logo dari domain ini langsung skip ke fallback initials tanpa dicoba,
 * untuk menghindari flood error di console.
 */
function isBlockedLogoDomain(url) {
    if (!url) return false;
    return (
        url.includes("upload.wikimedia.org") || url.includes("wikipedia.org")
    );
}

function getLogoObserver() {
    if (logoObserver) return logoObserver;
    logoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const placeholder = entry.target;
                const src = placeholder.dataset.src;
                if (!src) return;
                logoObserver.unobserve(placeholder);

                const img = document.createElement("img");
                img.alt = placeholder.dataset.alt || "";
                img.decoding = "async";
                // Banyak sumber logo iptv-org (Wikipedia, situs TV pihak ketiga, dll)
                // menolak request kalau Referer header bukan dari domain mereka
                // sendiri (hotlink protection) -> img gagal load -> fallback huruf.
                // "no-referrer" menghapus header itu sehingga sebagian besar
                // logo yang sebelumnya ke-block jadi bisa tampil.
                img.referrerPolicy = "no-referrer";
                img.style.cssText =
                    "width:100%;height:100%;object-fit:contain;border-radius:8px;display:block;";

                let retriedWithoutReferrer = false;

                img.onload = () => {
                    img.style.animation = "imgFadeIn 0.3s ease both";
                    placeholder.parentElement?.replaceChild(img, placeholder);
                };
                img.onerror = () => {
                    // Beberapa CDN justru tersandung kombinasi no-referrer +
                    // crossorigin attribute. Coba sekali lagi tanpa referrer
                    // policy sebelum benar-benar menyerah ke fallback.
                    if (!retriedWithoutReferrer) {
                        retriedWithoutReferrer = true;
                        img.referrerPolicy = "strict-origin-when-cross-origin";
                        img.src = src;
                        return;
                    }
                    const fb =
                        placeholder.parentElement?.querySelector(".fallback");
                    if (fb) fb.style.display = "";
                    placeholder.remove();
                };
                img.src = src;
            });
        },
        { rootMargin: "200px" },
    );
    return logoObserver;
}

/* ── Build card ── */
/* ── Stagger delay counter — reset tiap render() ── */
let _cardStaggerIdx = 0;

function buildCard(c, onOpen, onFavToggle) {
    const isFav = state.favorites.has(c.id);
    const isRecent = state.recentSet.has(c.id);
    const isCustom = c.source === "custom";
    const isDead = isChannelDead(c.id);
    const deadType = isDead ? getChannelDeadType(c.id) : null;
    const isBlocked = deadType === "blocked";
    const subText = isCustom
        ? c.group && c.group !== "Custom"
            ? c.group
            : c.playlistName || "Custom"
        : state.countries[c.country] || "";
    const fb = escapeHtml(initials(c.name));

    const card = document.createElement("div");
    // is-blocked: opacity lebih rendah + tidak ada harapan TTL pendek
    card.className =
        "channel-card" + (isBlocked ? " is-blocked" : isDead ? " is-dead" : "");

    // Stagger: max 30 card pertama di-animasi, sisanya langsung muncul
    const delay = Math.min(_cardStaggerIdx, 29) * 18;
    card.style.animationDelay = delay + "ms";
    _cardStaggerIdx++;

    card.innerHTML = `
        <div class="fav-star${isFav ? " is-fav" : ""}">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.3 6.2 21l1.6-6.7L2.5 9.6l6.9-.6L12 2.5l2.6 6.5 6.9.6-5.3 4.7L18 21z"/>
            </svg>
        </div>
        <div class="channel-logo">
            ${
                c.logo && !isBlockedLogoDomain(c.logo)
                    ? `<span class="logo-placeholder"
                           data-src="${escapeAttr(c.logo)}"
                           data-alt="${escapeAttr(c.name)}">
                       </span>
                       <span class="fallback" style="display:none">${fb}</span>`
                    : `<span class="fallback">${fb}</span>`
            }
        </div>
        <div class="channel-info-row">
            <div class="channel-name">${escapeHtml(c.name)}</div>
            ${subText ? `<div class="channel-sub">${escapeHtml(subText)}</div>` : ""}
        </div>
        ${isCustom ? `<div class="channel-source-badge">Custom</div>` : ""}
        ${isRecent ? `<div class="channel-recent-badge" title="Terakhir ditonton">▶</div>` : ""}
        ${
            isBlocked
                ? `<div class="channel-blocked-badge" title="Channel ini menggunakan DRM atau dibatasi penyedia — tidak bisa diputar di browser">🔐</div>`
                : isDead
                  ? `<div class="channel-dead-badge" title="Beberapa kali gagal diputar, mungkin sedang offline">⚠️</div>`
                  : ""
        }
    `;

    // Lazy-load logo — skip domain yang diketahui selalu gagal
    if (c.logo && !isBlockedLogoDomain(c.logo)) {
        const placeholder = card.querySelector(".logo-placeholder");
        if (placeholder) getLogoObserver().observe(placeholder);
    }

    card.querySelector(".fav-star").addEventListener("click", (e) => {
        e.stopPropagation();
        onFavToggle(c.id);
        e.currentTarget.classList.toggle("is-fav", state.favorites.has(c.id));
    });

    card.addEventListener("click", () => onOpen(c));
    return card;
}

/* ── Main render — dipanggil dari app.js ── */
export function render(els, onOpen, onFavToggle) {
    const { grid, empty, meta } = els;
    let list = [...state.channels];

    if (state.view === "fav") {
        list = list.filter((c) => state.favorites.has(c.id));
    } else if (state.view === "recent") {
        const byId = Object.fromEntries(state.channels.map((c) => [c.id, c]));
        list = state.recent.map((r) => byId[r.id] || r).filter(Boolean);
    }

    if (state.activeCategory !== "all")
        list = list.filter((c) =>
            (c.categories || []).includes(state.activeCategory),
        );
    if (state.activeCountry !== "all")
        list = list.filter((c) => c.country === state.activeCountry);
    if (state.activeGroup !== "all")
        list = list.filter((c) => c.group === state.activeGroup);

    // navigationList di-set di sini — SEBELUM filter query.
    // Tujuan: navigasi ↑↓ di player berjalan dalam konteks filter aktif
    // (kategori/negara/group/view), tapi TIDAK terkurung di hasil search.
    state.navigationList = list;

    if (state.query)
        list = list.filter(
            (c) =>
                c.name.toLowerCase().includes(state.query) ||
                (state.countries[c.country] || "")
                    .toLowerCase()
                    .includes(state.query) ||
                (c.group || "").toLowerCase().includes(state.query),
        );

    meta.textContent = `${list.length.toLocaleString("id-ID")} channel ditemukan`;
    resetLogoObserver();
    _cardStaggerIdx = 0;
    grid.innerHTML = "";
    removeSentinel();

    if (list.length === 0) {
        empty.classList.remove("hidden");
        return;
    }
    empty.classList.add("hidden");

    state.currentList = list;
    state.renderedCount = 0;

    // Simpan callback di closure untuk dipakai sentinel
    const _onOpen = onOpen;
    const _onFavToggle = onFavToggle;

    // Closure chunk() membawa onOpen & onFavToggle via closure, bukan parameter
    const chunk = () => {
        const next = list.slice(
            state.renderedCount,
            state.renderedCount + CHUNK_SIZE,
        );
        if (next.length === 0) return;

        const frag = document.createDocumentFragment();
        next.forEach((c) =>
            frag.appendChild(buildCard(c, _onOpen, _onFavToggle)),
        );
        grid.appendChild(frag);
        state.renderedCount += next.length;

        if (state.renderedCount < list.length) {
            // Buat sentinel baru dengan chunk terbaru
            removeSentinel();
            const sentinel = document.createElement("div");
            sentinel.id = "scrollSentinel";
            sentinel.style.gridColumn = "1 / -1";
            sentinel.style.height = "1px";
            grid.appendChild(sentinel);
            sentinelObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) chunk();
            });
            sentinelObserver.observe(sentinel);
        } else {
            removeSentinel();
        }
    };

    chunk();
}

/**
 * Update status badge (⚠️/🔐) satu card di DOM tanpa re-render seluruh grid.
 * Dipanggil dari app.js via callback onClose di initPlayer,
 * supaya badge langsung muncul saat player ditutup — bukan setelah refresh.
 *
 * @param {string} channelId
 */
export function updateCardInGrid(channelId) {
    const grid = document.getElementById("channelGrid");
    if (!grid) return;

    // Cari card berdasarkan data attribute — kita perlu tag card dengan channel id.
    // Card saat ini tidak punya data-id, jadi kita iterate state.currentList
    // untuk tahu index-nya lalu ambil card ke-N dari grid.
    const idx = state.currentList.findIndex((c) => c.id === channelId);
    if (idx < 0 || idx >= state.renderedCount) return; // belum di-render atau tidak ada

    // Card ke-idx di grid (tidak hitung sentinel div)
    const cards = grid.querySelectorAll(".channel-card");
    const card = cards[idx];
    if (!card) return;

    const isDead = isChannelDead(channelId);
    const deadType = isDead ? getChannelDeadType(channelId) : null;
    const isBlocked = deadType === "blocked";

    // Update class
    card.classList.remove("is-dead", "is-blocked");
    if (isBlocked) card.classList.add("is-blocked");
    else if (isDead) card.classList.add("is-dead");

    // Update badge
    const existingBadge = card.querySelector(
        ".channel-dead-badge, .channel-blocked-badge",
    );
    if (existingBadge) existingBadge.remove();

    if (isBlocked) {
        const badge = document.createElement("div");
        badge.className = "channel-blocked-badge";
        badge.title =
            "Channel ini menggunakan DRM atau dibatasi penyedia — tidak bisa diputar di browser";
        badge.textContent = "🔐";
        card.appendChild(badge);
    } else if (isDead) {
        const badge = document.createElement("div");
        badge.className = "channel-dead-badge";
        badge.title = "Beberapa kali gagal diputar, mungkin sedang offline";
        badge.textContent = "⚠️";
        card.appendChild(badge);
    }
}
