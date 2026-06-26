// js/player/player.js
import { state, addToRecent, toggleFavorite } from "../core/state.js";
import { getEpgForChannel } from "../api/epg.js";
import { buildQualityMenu } from "./quality.js";
import { fmtTime } from "../utils/time.js";
import { escapeHtml, escapeAttr, initials } from "../utils/escape.js";

let hls = null;
let currentChannel = null;
let currentIndex = -1;
let epgTickInterval = null;
let hideCtrlTimer = null;
let el = null;
let sleepTimerInterval = null;
let sleepEndsAt = null;
// Fix race condition: simpan referensi playing listener agar bisa di-remove
// sebelum loadStream dipanggil lagi (navigasi channel cepat)
let _playingListener = null;

export function initPlayer(els) {
    el = els;
    el.closeBtn.addEventListener("click", closePlayer);
    el.favBtn.addEventListener("click", () => {
        if (!currentChannel) return;
        toggleFavorite(currentChannel.id);
        updateFavIcon();
    });
    if (el.qualityBtn && el.qualityMenu) {
        el.qualityBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            el.qualityMenu.classList.toggle("hidden");
        });
        document.addEventListener("click", () =>
            el.qualityMenu?.classList.add("hidden"),
        );
    }
    document.addEventListener("keydown", handleKeyboard);
    initCustomControls();
    initSidebar();
    initSleepTimer();
    initShareChannel();
}

function buildShareUrl(channel) {
    const BASE_URL = window.location.origin;
    const slug = (channel.name || "channel")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    const params = new URLSearchParams({ play: slug, src: channel.url });
    return BASE_URL + "/?" + params.toString();
}

function initShareChannel() {
    const btn = document.getElementById("shareChannelBtn");
    const toast = document.getElementById("shareToast");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        if (!currentChannel) return;

        const name = currentChannel.name;
        const shareUrl = buildShareUrl(currentChannel);

        // Mobile: native share sheet
        if (navigator.share) {
            try {
                await navigator.share({
                    title: name + " — StreamVista",
                    text: "Tonton " + name + " gratis di StreamVista",
                    url: shareUrl,
                });
                return;
            } catch (e) {
                // fallback ke copy
            }
        }

        // Desktop: copy ke clipboard
        try {
            await navigator.clipboard.writeText(shareUrl);
            showShareToast(toast, "✅ Link disalin!");
        } catch {
            const ta = document.createElement("textarea");
            ta.value = shareUrl;
            ta.style.cssText = "position:fixed;opacity:0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
            showShareToast(toast, "✅ Link disalin!");
        }
    });
}

function showShareToast(toast, msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.add("hidden"), 2500);
}

function initSleepTimer() {
    const btn = document.getElementById("sleepTimerBtn");
    const menu = document.getElementById("sleepMenu");
    const cancelBtn = document.getElementById("sleepCancelBtn");
    const customInput = document.getElementById("sleepCustomInput");
    const customBtn = document.getElementById("sleepCustomBtn");
    if (!btn || !menu) return;

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("hidden");
    });
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && e.target !== btn)
            menu.classList.add("hidden");
    });

    document.querySelectorAll(".sleep-preset").forEach((p) => {
        p.addEventListener("click", () => {
            startSleepTimer(parseInt(p.dataset.min));
            menu.classList.add("hidden");
        });
    });

    customBtn.addEventListener("click", () => {
        const min = parseInt(customInput.value);
        if (!min || min < 1) return;
        startSleepTimer(min);
        customInput.value = "";
        menu.classList.add("hidden");
    });
    customInput.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Enter") customBtn.click();
    });

    cancelBtn.addEventListener("click", () => {
        cancelSleepTimer();
        menu.classList.add("hidden");
    });
}

function startSleepTimer(minutes) {
    cancelSleepTimer();
    sleepEndsAt = Date.now() + minutes * 60 * 1000;

    const btn = document.getElementById("sleepTimerBtn");
    const cancelBtn = document.getElementById("sleepCancelBtn");
    if (cancelBtn) cancelBtn.classList.remove("hidden");
    if (btn) btn.classList.add("active");

    const badge = getOrCreateSleepBadge();

    sleepTimerInterval = setInterval(() => {
        const remaining = sleepEndsAt - Date.now();
        if (remaining <= 0) {
            closePlayer();
            cancelSleepTimer();
            return;
        }
        const m = Math.floor(remaining / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        const label =
            m > 0
                ? m + ":" + String(s).padStart(2, "0")
                : "0:" + String(s).padStart(2, "0");
        if (badge) badge.textContent = "⏱ " + label;
    }, 1000);
}

function cancelSleepTimer() {
    if (sleepTimerInterval) {
        clearInterval(sleepTimerInterval);
        sleepTimerInterval = null;
    }
    sleepEndsAt = null;
    const badge = document.getElementById("sleepBadge");
    const btn = document.getElementById("sleepTimerBtn");
    const cancelBtn = document.getElementById("sleepCancelBtn");
    if (badge) badge.remove();
    if (btn) btn.classList.remove("active");
    if (cancelBtn) cancelBtn.classList.add("hidden");
}

function getOrCreateSleepBadge() {
    let badge = document.getElementById("sleepBadge");
    if (!badge) {
        badge = document.createElement("span");
        badge.id = "sleepBadge";
        badge.className = "sleep-badge";
        const top = document.querySelector(".player-top");
        if (top) top.appendChild(badge);
    }
    return badge;
}

function initCustomControls() {
    const wrap = el.video.closest(".video-wrap");
    const vcPlay = document.getElementById("vcPlay");
    const vcPlayIcon = document.getElementById("vcPlayIcon");
    const vcMute = document.getElementById("vcMute");
    const vcVolLine = document.getElementById("vcVolLine");
    const vcVolume = document.getElementById("vcVolume");
    const vcFullscreen = document.getElementById("vcFullscreen");
    const vcProgress = document.getElementById("vcProgress");
    const vcBar = document.getElementById("vcBar");
    const vcThumb = document.getElementById("vcThumb");
    const vcTime = document.getElementById("vcTime");
    if (!wrap || !vcPlay) return;

    const showControls = () => {
        wrap.classList.add("show-controls");
        clearTimeout(hideCtrlTimer);
        hideCtrlTimer = setTimeout(() => {
            if (!el.video.paused) wrap.classList.remove("show-controls");
        }, 3000);
    };
    wrap.addEventListener("mousemove", showControls);
    let _touchStartY = 0;
    wrap.addEventListener(
        "touchstart",
        (e) => {
            _touchStartY = e.touches[0].clientY;
            wrap.classList.toggle("show-controls");
        },
        { passive: true },
    );

    // Swipe atas → channel sebelumnya, swipe bawah → channel berikutnya
    wrap.addEventListener(
        "touchend",
        (e) => {
            const dy = e.changedTouches[0].clientY - _touchStartY;
            if (Math.abs(dy) > 50) {
                navigateChannel(dy < 0 ? -1 : 1);
            }
        },
        { passive: true },
    );

    const updatePlayIcon = () => {
        vcPlayIcon.setAttribute(
            "d",
            el.video.paused
                ? "M8 5v14l11-7z"
                : "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
        );
    };
    vcPlay.addEventListener("click", () => {
        el.video.paused ? el.video.play() : el.video.pause();
        showControls();
    });
    el.video.addEventListener("play", updatePlayIcon);
    el.video.addEventListener("pause", () => {
        updatePlayIcon();
        wrap.classList.add("show-controls");
    });
    el.video.addEventListener("click", () => {
        el.video.paused ? el.video.play() : el.video.pause();
        showControls();
    });

    vcMute.addEventListener("click", () => {
        el.video.muted = !el.video.muted;
        vcVolLine.style.display = el.video.muted ? "none" : "";
        vcVolume.value = el.video.muted ? 0 : el.video.volume;
    });
    vcVolume.addEventListener("input", () => {
        el.video.volume = vcVolume.value;
        el.video.muted = vcVolume.value == 0;
        vcVolLine.style.display = el.video.muted ? "none" : "";
    });

    el.video.addEventListener("timeupdate", () => {
        if (!el.video.duration || !isFinite(el.video.duration)) return;
        const pct = (el.video.currentTime / el.video.duration) * 100;
        vcBar.style.width = pct + "%";
        vcThumb.style.left = pct + "%";
        vcTime.textContent =
            fmtSeconds(el.video.currentTime) +
            " / " +
            fmtSeconds(el.video.duration);
        vcTime.classList.add("is-vod");
    });
    vcProgress.addEventListener("click", (e) => {
        if (!el.video.duration || !isFinite(el.video.duration)) return;
        const rect = vcProgress.getBoundingClientRect();
        el.video.currentTime =
            ((e.clientX - rect.left) / rect.width) * el.video.duration;
    });

    vcFullscreen.addEventListener("click", () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (wrap.requestFullscreen) {
            wrap.requestFullscreen();
        } else if (el.video.webkitEnterFullscreen) {
            // Fallback untuk Chrome Android
            el.video.webkitEnterFullscreen();
        }
    });

    // Picture-in-Picture
    const vcPip = document.getElementById("vcPip");
    if (vcPip) {
        // Sembunyikan tombol kalau browser tidak support PiP
        if (!document.pictureInPictureEnabled) {
            vcPip.style.display = "none";
        } else {
            vcPip.addEventListener("click", async () => {
                try {
                    if (document.pictureInPictureElement) {
                        await document.exitPictureInPicture();
                    } else {
                        await el.video.requestPictureInPicture();
                    }
                } catch (err) {
                    console.warn("PiP gagal:", err.message);
                }
            });
            // Sync icon saat masuk/keluar PiP
            el.video.addEventListener("enterpictureinpicture", () => {
                vcPip.style.opacity = "1";
                vcPip.style.color = "#e5575f";
            });
            el.video.addEventListener("leavepictureinpicture", () => {
                vcPip.style.opacity = "";
                vcPip.style.color = "";
            });
        }
    }
    document.addEventListener("fullscreenchange", () => {
        const p = vcFullscreen.querySelector("path");
        if (!p) return;
        p.setAttribute(
            "d",
            document.fullscreenElement
                ? "M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 0 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"
                : "M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M16 21h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3",
        );
    });
}

/* ── Sidebar daftar channel ── */
function initSidebar() {
    const btn = document.getElementById("playerSidebarBtn");
    const panel = el.sidebar || document.getElementById("playerSidebar");
    el.sidebar = panel;
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
        const isOpen = !panel.classList.contains("hidden");
        if (isOpen) {
            panel.classList.add("hidden");
            el.overlay.classList.remove("sidebar-open");
        } else {
            panel.classList.remove("hidden");
            el.overlay.classList.add("sidebar-open");
            renderSidebarList();
        }
    });
}

function buildSidebarItems(panel, list) {
    panel.querySelectorAll(".ps-item").forEach((e) => e.remove());
    const frag = document.createDocumentFragment();
    list.forEach((c) => {
        const item = document.createElement("div");
        item.className =
            "ps-item" +
            (currentChannel && c.id === currentChannel.id ? " active" : "");
        const sub =
            c.source === "custom"
                ? c.group && c.group !== "Custom"
                    ? c.group
                    : c.playlistName || "Custom"
                : state.countries[c.country] || "";
        const safeInitials = escapeHtml(initials(c.name));
        item.innerHTML = `
            <div class="ps-logo">
                ${c.logo ? `<img src="${escapeAttr(c.logo)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ps-fallback',textContent:'${safeInitials}'}))">` : `<span class="ps-fallback">${safeInitials}</span>`}
            </div>
            <div class="ps-info">
                <div class="ps-name">${escapeHtml(c.name)}</div>
                <div class="ps-sub">${escapeHtml(sub)}</div>
            </div>
        `;
        item.addEventListener("click", () => openPlayer(c));
        frag.appendChild(item);
    });
    panel.appendChild(frag);
    scrollActiveIntoView();
}

function renderSidebarList() {
    const panel = el.sidebar;
    if (!panel) return;
    const fullList = state.navigationList || state.currentList || [];

    let searchInput = panel.querySelector(".ps-search");
    if (!searchInput) {
        const wrap = document.createElement("div");
        wrap.className = "ps-search-wrap";
        wrap.innerHTML = `
            <svg class="ps-search-icon" viewBox="0 0 24 24" fill="none" width="15" height="15">
                <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input class="ps-search" type="text" placeholder="Cari channel…" autocomplete="off">
        `;
        panel.appendChild(wrap);
        searchInput = wrap.querySelector(".ps-search");

        searchInput.addEventListener("input", () => {
            const q = searchInput.value.trim().toLowerCase();
            const filtered = q
                ? fullList.filter(
                      (c) =>
                          c.name.toLowerCase().includes(q) ||
                          (state.countries[c.country] || "")
                              .toLowerCase()
                              .includes(q),
                  )
                : fullList;
            buildSidebarItems(panel, filtered);
        });

        searchInput.addEventListener("click", (e) => e.stopPropagation());
        searchInput.addEventListener("keydown", (e) => e.stopPropagation());
    } else {
        searchInput.value = "";
    }

    buildSidebarItems(panel, fullList);
}

function updateSidebarActive() {
    if (!el.sidebar) return;
    const list = state.navigationList || state.currentList || [];
    el.sidebar.querySelectorAll(".ps-item").forEach((item, idx) => {
        const c = list[idx];
        item.classList.toggle(
            "active",
            !!(c && currentChannel && c.id === currentChannel.id),
        );
    });
    scrollActiveIntoView();
}

/**
 * Scroll sidebar supaya item yang sedang aktif terlihat (di tengah panel),
 * tanpa nge-scroll seluruh halaman.
 */
function scrollActiveIntoView() {
    if (!el.sidebar) return;
    const active = el.sidebar.querySelector(".ps-item.active");
    if (!active) return;
    active.scrollIntoView({ block: "center", behavior: "smooth" });
}

function fmtSeconds(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    return h > 0
        ? h +
              ":" +
              String(m).padStart(2, "0") +
              ":" +
              String(s).padStart(2, "0")
        : m + ":" + String(s).padStart(2, "0");
}

/* ── Channel Info Overlay ── */
let chInfoTimer = null;

function showChannelInfoOverlay(channel) {
    const overlay = document.getElementById("channelInfoOverlay");
    const nameEl = document.getElementById("chInfoName");
    const epgEl = document.getElementById("chInfoEpg");
    const logoEl = document.getElementById("chInfoLogo");
    if (!overlay || !nameEl) return;

    // Isi konten
    nameEl.textContent = channel.name;

    // Logo
    logoEl.innerHTML = "";
    if (channel.logo) {
        const img = document.createElement("img");
        img.src = channel.logo;
        img.alt = channel.name;
        img.onerror = () => {
            logoEl.textContent = initials(channel.name);
        };
        logoEl.appendChild(img);
    } else {
        logoEl.textContent = initials(channel.name);
    }

    // EPG — ambil setelah sedikit delay agar epgMap sempat siap
    epgEl.textContent = "";
    setTimeout(() => {
        const epg = getEpgForChannel(channel);
        if (epg?.current) {
            epgEl.textContent = "▶ " + epg.current.title;
        }
    }, 300);

    // Tampilkan
    clearTimeout(chInfoTimer);
    overlay.classList.remove("hidden", "ch-info-hide");
    overlay.classList.add("ch-info-show");

    // Auto-hide setelah 3.5 detik
    chInfoTimer = setTimeout(() => {
        overlay.classList.remove("ch-info-show");
        overlay.classList.add("ch-info-hide");
        setTimeout(() => overlay.classList.add("hidden"), 400);
    }, 3500);
}

export function openPlayer(channel) {
    currentChannel = channel;
    currentIndex = (state.navigationList || state.currentList || []).findIndex(
        (c) => c.id === channel.id,
    );
    el.overlay.classList.remove("hidden");
    el.pName.textContent = channel.name;
    el.pMeta.textContent =
        channel.source === "custom"
            ? channel.group && channel.group !== "Custom"
                ? channel.group
                : channel.playlistName
            : state.countries[channel.country] || "";

    const vcBar = document.getElementById("vcBar");
    const vcThumb = document.getElementById("vcThumb");
    const vcTime = document.getElementById("vcTime");
    if (vcBar) vcBar.style.width = "0%";
    if (vcThumb) vcThumb.style.left = "0%";
    if (vcTime) {
        vcTime.textContent = "LIVE";
        vcTime.classList.remove("is-vod");
    }

    updateFavIcon();
    el.pStatus.classList.remove("hidden");
    el.pStatus.innerHTML =
        '<div class="spinner"></div><p>Menghubungkan ke siaran…</p>';
    addToRecent(channel);
    showChannelInfoOverlay(channel);
    startEpgTicker(channel);
    destroyHls();
    loadStream(channel.url);

    if (el.sidebar && !el.sidebar.classList.contains("hidden")) {
        updateSidebarActive();
    }
}

export function closePlayer() {
    el.overlay.classList.add("hidden");
    el.qualityMenu?.classList.add("hidden");
    stopEpgTicker();
    destroyHls();
    el.video.pause();
    el.video.removeAttribute("src");
    el.video.load();
    clearTimeout(hideCtrlTimer);
    if (el.sidebar) {
        el.sidebar.classList.add("hidden");
        el.overlay.classList.remove("sidebar-open");
    }
    currentChannel = null;
    currentIndex = -1;
}

export function getCurrentChannel() {
    return currentChannel;
}

function loadStream(url) {
    if (el.qualityBtn) el.qualityBtn.style.display = "none";
    el.qualityMenu?.classList.add("hidden");

    const timeout = setTimeout(() => {
        // Phase 3: jangan tampilkan error kalau video terbukti sudah mulai jalan
        if (el.video.readyState >= 3 && !el.video.paused) return;
        showError("timeout");
    }, 12000);
    const clearTO = () => clearTimeout(timeout);

    // Phase 2: safety net — kapan pun video benar-benar mulai play,
    // selalu hilangkan pesan error apa pun penyebab race condition-nya.
    // Remove listener lama dulu agar tidak terpicu dari channel sebelumnya.
    if (_playingListener) {
        el.video.removeEventListener("playing", _playingListener);
    }
    _playingListener = () => {
        clearTO();
        el.pStatus.classList.add("hidden");
        _playingListener = null;
    };
    el.video.addEventListener("playing", _playingListener, { once: true });

    if (url.includes(".m3u8") && window.Hls && Hls.isSupported()) {
        hls = new Hls({
            maxBufferLength: 30,
            xhrSetup: (xhr) => {
                xhr.timeout = 10000;
            },
        });
        hls.loadSource(url);
        hls.attachMedia(el.video);
        hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
            clearTO();
            el.pStatus.classList.add("hidden");
            el.video.play().catch(() => {});
            buildQualityMenu(
                { qualityBtn: el.qualityBtn, qualityMenu: el.qualityMenu },
                hls,
                data.levels,
            );
        });
        hls.on(Hls.Events.ERROR, (_, data) => {
            if (!data.fatal) return;
            clearTO();
            const isCors =
                data.type === Hls.ErrorTypes.NETWORK_ERROR &&
                (data.response?.code === 0 || data.response?.code === 403);
            showError(isCors ? "cors" : "generic");
        });
    } else {
        el.video.src = url;
        el.video.addEventListener(
            "loadeddata",
            () => {
                clearTO();
                el.pStatus.classList.add("hidden");
            },
            { once: true },
        );
        el.video.addEventListener(
            "error",
            () => {
                clearTO();
                showError("generic");
            },
            { once: true },
        );
        el.video.play().catch(() => {});
    }
}

function destroyHls() {
    if (hls) {
        hls.destroy();
        hls = null;
    }
}

function showError(type = "generic") {
    el.pStatus.classList.remove("hidden");
    const msg =
        type === "cors"
            ? "🔒 Channel diblokir CORS.<br>Tekan ↑ ↓ untuk coba channel lain."
            : type === "timeout"
              ? "⏱️ Koneksi terlalu lambat.<br>Tekan ↑ ↓ untuk pindah channel."
              : "⚠️ Channel tidak bisa diputar.<br>Tekan ↑ ↓ untuk pindah channel.";
    el.pStatus.innerHTML =
        '<p style="text-align:center;line-height:1.7;padding:0 20px">' +
        msg +
        "</p>";
}

function updateFavIcon() {
    el.favBtn.classList.toggle(
        "active",
        !!(currentChannel && state.favorites.has(currentChannel.id)),
    );
}

function handleKeyboard(e) {
    if (document.activeElement?.tagName === "INPUT") return;
    if (el.overlay.classList.contains("hidden")) return;
    switch (e.key) {
        case " ":
            e.preventDefault();
            el.video.paused ? el.video.play() : el.video.pause();
            break;
        case "f":
        case "F":
            e.preventDefault();
            el.video.closest(".video-wrap")?.requestFullscreen?.();
            break;
        case "Escape":
            closePlayer();
            break;
        case "ArrowUp":
            e.preventDefault();
            navigateChannel(-1);
            break;
        case "ArrowDown":
            e.preventDefault();
            navigateChannel(1);
            break;
    }
}

function navigateChannel(dir) {
    const list = state.navigationList || state.currentList || [];
    if (!list.length) return;
    let idx = list.findIndex((c) => c.id === currentChannel?.id);
    idx = (idx + dir + list.length) % list.length;
    openPlayer(list[idx]);
}

function startEpgTicker(channel) {
    stopEpgTicker();
    renderEpgPanel(channel);
    epgTickInterval = setInterval(() => {
        if (currentChannel) renderEpgPanel(currentChannel);
    }, 30000);
}

function stopEpgTicker() {
    if (epgTickInterval) {
        clearInterval(epgTickInterval);
        epgTickInterval = null;
    }
    el.epgPanel?.classList.add("hidden");
}

function renderEpgPanel(channel) {
    if (!el.epgPanel) return;
    const data = getEpgForChannel(channel);
    if (!data) {
        el.epgPanel.classList.add("hidden");
        return;
    }
    el.epgPanel.classList.remove("hidden");
    el.epgNowTitle.textContent = data.current.title;
    el.epgNowTime.textContent =
        fmtTime(data.current.start) + " – " + fmtTime(data.current.stop);
    const pct = Math.min(
        100,
        Math.max(
            0,
            ((Date.now() - data.current.start) /
                (data.current.stop - data.current.start)) *
                100,
        ),
    );
    el.epgProgressBar.style.width = pct + "%";
    if (data.next) {
        el.epgNextWrap.classList.remove("hidden");
        el.epgNextTitle.textContent = data.next.title;
        el.epgNextTime.textContent =
            fmtTime(data.next.start) + " – " + fmtTime(data.next.stop);
    } else {
        el.epgNextWrap.classList.add("hidden");
    }
}
