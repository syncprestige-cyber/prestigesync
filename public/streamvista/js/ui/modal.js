// js/ui/modal.js
import { state }                              from "../core/state.js";
import { addPlaylist, removePlaylist,
         isDefaultPlaylist, loadAllPlaylists } from "../playlist/manager.js";
import { escapeHtml }                         from "../utils/escape.js";
import { buildGroupStrip }                    from "./filter.js";

let el       = null;
let _onRender = null;
let _groupEls = null;

/**
 * Inisialisasi modal — dipanggil sekali dari app.js.
 */
export function initModal(els, onRender) {
    el        = els;
    _onRender = onRender;
    _groupEls = { groupStrip: els.groupStrip };

    el.addPlaylistBtn.addEventListener("click", () => {
        el.playlistModal.classList.remove("hidden");
        renderPlaylistList();
    });

    el.closePlaylistModalBtn.addEventListener("click", () =>
        el.playlistModal.classList.add("hidden"),
    );

    el.playlistModal.addEventListener("click", (e) => {
        if (e.target === el.playlistModal)
            el.playlistModal.classList.add("hidden");
    });

    el.submitPlaylistBtn.addEventListener("click", handleAdd);
    el.playlistUrlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleAdd();
    });
}

export function renderPlaylistList() {
    if (!el) return;
    if (state.playlists.length === 0) {
        el.playlistList.innerHTML =
            '<p class="playlist-empty">Belum ada playlist ditambahkan.</p>';
        return;
    }

    let html = `<button id="refreshPlaylistsBtn" class="primary-btn"
        style="margin-bottom:12px;width:100%;">🔄 Refresh Semua Playlist</button>`;

    state.playlists.forEach((pl) => {
        const isDefault = isDefaultPlaylist(pl.id);
        html += `
        <div class="playlist-item">
            <div class="pl-info">
                <div class="pl-name">
                    ${escapeHtml(pl.name)}
                    ${isDefault ? '<span class="badge-sample">Popular</span>' : ""}
                </div>
                <div class="pl-meta">${pl.count || 0} channel</div>
            </div>
            <button class="pl-remove" data-id="${escapeHtml(pl.id)}" title="Hapus playlist">
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 6"
                    stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
            </button>
        </div>`;
    });

    el.playlistList.innerHTML = html;

    document.getElementById("refreshPlaylistsBtn")
        ?.addEventListener("click", async (e) => {
            const btn      = e.currentTarget;
            btn.disabled   = true;
            btn.textContent = "⏳ Memuat...";
            await loadAllPlaylists(() => {
                buildGroupStrip(_groupEls, _onRender);
                _onRender();
            });
            renderPlaylistList();
            btn.textContent = "🔄 Refresh Semua Playlist";
            btn.disabled    = false;
        });

    el.playlistList.querySelectorAll(".pl-remove").forEach((btn) => {
        btn.addEventListener("click", () => {
            removePlaylist(btn.dataset.id);
            buildGroupStrip(_groupEls, _onRender);
            renderPlaylistList();
            _onRender();
        });
    });
}

async function handleAdd() {
    const url = el.playlistUrlInput.value.trim();
    el.playlistError.classList.add("hidden");
    if (!url) return showError("Masukkan link playlist M3U dulu.");

    el.submitPlaylistBtn.disabled   = true;
    el.submitPlaylistBtn.textContent = "Memuat…";

    const result = await addPlaylist(url);

    if (result.ok) {
        buildGroupStrip(_groupEls, _onRender);
        renderPlaylistList();
        _onRender();
        el.playlistUrlInput.value = "";
    } else {
        showError(result.error);
    }

    el.submitPlaylistBtn.disabled   = false;
    el.submitPlaylistBtn.textContent = "Tambah";
}

function showError(msg) {
    el.playlistError.textContent = msg;
    el.playlistError.classList.remove("hidden");
}
