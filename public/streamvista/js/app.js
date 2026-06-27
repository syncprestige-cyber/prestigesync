// js/app.js — entry point
import { state, syncDefaultPlaylists, toggleFavorite } from "./core/state.js";
import { loadIptvChannels } from "./api/iptv.js";
import { loadEpg } from "./api/epg.js";
import { loadAllPlaylists } from "./playlist/manager.js";
import { buildFilterStrips, buildGroupStrip } from "./ui/filter.js";
import { initModal, renderPlaylistList } from "./ui/modal.js";
import { initPlayer, openPlayer } from "./player/player.js";
import { render, updateCardInGrid } from "./ui/render.js";

/* ── DOM refs ── */
const el = {
    grid: document.getElementById("channelGrid"),
    empty: document.getElementById("emptyState"),
    loading: document.getElementById("loadingState"),
    meta: document.getElementById("resultMeta"),
    search: document.getElementById("searchInput"),
    favToggle: document.getElementById("favToggleBtn"),
    recentToggle: document.getElementById("recentToggleBtn"),
    bottomNav: document.querySelectorAll(".nav-item"),
    catStrip: document.getElementById("categoryStrip"),
    countryStrip: document.getElementById("countryStrip"),
    groupStrip: document.getElementById("groupStrip"),
    overlay: document.getElementById("playerOverlay"),
    video: document.getElementById("videoPlayer"),
    closeBtn: document.getElementById("closePlayerBtn"),
    favBtn: document.getElementById("playerFavBtn"),
    pName: document.getElementById("playerChannelName"),
    pMeta: document.getElementById("playerChannelMeta"),
    pStatus: document.getElementById("playerStatus"),
    qualityBtn: document.getElementById("qualityBtn"),
    qualityMenu: document.getElementById("qualityMenu"),
    sidebar: document.getElementById("playerSidebar"),
    epgPanel: document.getElementById("playerEpg"),
    epgNowTitle: document.getElementById("epgNowTitle"),
    epgNowTime: document.getElementById("epgNowTime"),
    epgProgressBar: document.getElementById("epgProgressBar"),
    epgNextWrap: document.getElementById("epgNextWrap"),
    epgNextTitle: document.getElementById("epgNextTitle"),
    epgNextTime: document.getElementById("epgNextTime"),
    addPlaylistBtn: document.getElementById("addPlaylistBtn"),
    playlistModal: document.getElementById("playlistModal"),
    closePlaylistModalBtn: document.getElementById("closePlaylistModalBtn"),
    playlistUrlInput: document.getElementById("playlistUrlInput"),
    submitPlaylistBtn: document.getElementById("submitPlaylistBtn"),
    playlistError: document.getElementById("playlistError"),
    playlistList: document.getElementById("playlistList"),
};

/* ── Shortcuts render ── */
const gridEls = { grid: el.grid, empty: el.empty, meta: el.meta };
const filterEls = { catStrip: el.catStrip, countryStrip: el.countryStrip };
const groupEls = { groupStrip: el.groupStrip };

const doRender = () => render(gridEls, onOpen, onFavToggle);

function onOpen(channel) {
    openPlayer(channel);
}
function onFavToggle(id) {
    toggleFavorite(id);
}

/* ── Init ── */
async function init() {
    syncDefaultPlaylists();
    loadEpg();

    initPlayer(el, { onClose: (channelId) => updateCardInGrid(channelId) });
    initModal(el, doRender);
    bindNavEvents();

    try {
        await loadIptvChannels((data) => {
            state.countries = data.countries;
            state.categories = data.categories;
            state.channels = [
                ...data.channels,
                ...state.channels.filter((c) => c.source === "custom"),
            ];
            buildFilterStrips(filterEls, doRender);
            doRender();
            el.loading.classList.add("hidden");
        });
    } catch (err) {
        console.error(err);
        el.loading.innerHTML =
            '<p style="color:#e5575f">Gagal memuat daftar channel.<br>Periksa koneksi lalu refresh.</p>';
    }

    loadAllPlaylists(() => {
        buildGroupStrip(groupEls, doRender);
        doRender();
    }).then(() => renderPlaylistList());
}

/* ── Nav & search events ── */
function bindNavEvents() {
    el.search.addEventListener("input", (e) => {
        state.query = e.target.value.trim().toLowerCase();
        doRender();
    });

    el.favToggle.addEventListener("click", () => {
        setView(state.view === "fav" ? "all" : "fav");
    });

    el.recentToggle.addEventListener("click", () => {
        setView(state.view === "recent" ? "all" : "recent");
    });

    el.bottomNav.forEach((btn) => {
        btn.addEventListener("click", () => {
            setView(btn.dataset.view);
        });
    });
}

/**
 * Satu pintu untuk ganti state.view — dipakai oleh favToggle, recentToggle,
 * dan bottom-nav, supaya semua tombol (topbar maupun mobile) selalu
 * sinkron dan tidak ada logic yang terduplikasi/ketinggalan.
 */
function setView(view) {
    state.view = view;
    syncBottomNav();
    syncTopbarToggles();
    if (view === "search") el.search.focus();
    doRender();
}

function syncTopbarToggles() {
    el.favToggle.classList.toggle("active", state.view === "fav");
    el.recentToggle.classList.toggle("active", state.view === "recent");
    // Dipakai CSS mobile untuk memunculkan search bar hanya saat view = "search"
    document.body.classList.toggle("view-search", state.view === "search");
}

function syncBottomNav() {
    el.bottomNav.forEach((b) =>
        b.classList.toggle("active", b.dataset.view === state.view),
    );
}

/* ── PWA ── */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () =>
        navigator.serviceWorker.register("service-worker.js").catch(() => {}),
    );
}

// Handle deep link: ?play=nama-channel&src=url-stream
function handleDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("src");
    const play = params.get("play");
    if (!src || !play) return;

    // Tunggu channel selesai load, lalu cari dan play
    const tryOpen = () => {
        const name = play.replace(/-/g, " ");
        // Cari di state.channels dulu
        let ch = state.channels.find(
            (c) => c.url === src || c.name.toLowerCase() === name,
        );
        // Kalau tidak ketemu, buat channel sementara dari parameter
        if (!ch) {
            ch = {
                id: "deeplink_" + Date.now(),
                name: play
                    .replace(/-/g, " ")
                    .replace(/\w/g, (l) => l.toUpperCase()),
                url: src,
                logo: "",
                country: null,
                categories: [],
                source: "deeplink",
                playlistName: "Shared Link",
                group: "Shared",
            };
        }
        openPlayer(ch);
        // Bersihkan URL tanpa reload
        window.history.replaceState({}, "", window.location.pathname);
    };

    // Tunda sedikit agar player sudah init
    setTimeout(tryOpen, 1200);
}

init().then(() => handleDeepLink());
