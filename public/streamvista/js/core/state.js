// js/core/state.js
import { KEYS, load, save } from "./storage.js";

const DEFAULT_PLAYLISTS = [
    {
        id: "imDazui_domestic",
        url: "https://raw.githubusercontent.com/imDazui/Tvlist-awesome-m3u-m3u8/master/m3u/%E5%9B%BD%E5%86%85%E7%94%B5%E8%A7%86%E5%8F%B0202509.m3u",
        name: "🇨🇳 imDazui China TV",
        count: 0,
    },
    {
        id: "imDazui_international",
        url: "https://raw.githubusercontent.com/imDazui/Tvlist-awesome-m3u-m3u8/master/m3u/%E5%9B%BD%E5%A4%96%E7%94%B5%E8%A7%86%E5%8F%B0202409.m3u",
        name: "🌍 imDazui International",
        count: 0,
    },
    {
        id: "yang_gather",
        url: "https://raw.githubusercontent.com/YanG-1989/m3u/main/Gather.m3u",
        name: "🎉 YanG Gather (Rekomendasi)",
        count: 0,
    },
    {
        id: "yang_migu",
        url: "https://raw.githubusercontent.com/YanG-1989/m3u/main/Migu.m3u",
        name: "🇨🇳 YanG Migu",
        count: 0,
    },
    {
        id: "iptvorg_indonesia",
        url: "https://iptv-org.github.io/iptv/countries/id.m3u",
        name: "🇮🇩 Indonesia (iptv-org)",
        count: 0,
    },
];

const REMOVED_IDS = new Set(["yang_sport", "yang_live"]);
const MAX_RECENT = 20;

/* ── State ── */
export const state = {
    channels: [],
    countries: {},
    categories: {},
    activeCategory: "all",
    activeCountry: "all",
    activeGroup: "all",
    query: "",
    view: "all",
    favorites: new Set(load(KEYS.favorites, [])),
    playlists: load(KEYS.playlists, []),
    recent: load(KEYS.recent, []),
    recentSet: new Set(),
    currentList: [],
    navigationList: [],
    renderedCount: 0,
};

// Sync recentSet dari array
state.recentSet = new Set(state.recent.map((r) => r.id));

/* ── Favorites ── */
export function toggleFavorite(id) {
    state.favorites.has(id)
        ? state.favorites.delete(id)
        : state.favorites.add(id);
    save(KEYS.favorites, [...state.favorites]);
}

/* ── Recently Watched ── */
export function addToRecent(channel) {
    state.recent = state.recent.filter((r) => r.id !== channel.id);
    state.recent.unshift({
        id: channel.id,
        name: channel.name,
        logo: channel.logo,
        url: channel.url,
        source: channel.source,
        playlistName: channel.playlistName,
        country: channel.country,
        categories: channel.categories || [],
        playlistId: channel.playlistId,
        group: channel.group,
        watchedAt: Date.now(),
    });
    if (state.recent.length > MAX_RECENT) state.recent.length = MAX_RECENT;
    state.recentSet = new Set(state.recent.map((r) => r.id));
    save(KEYS.recent, state.recent);
}

/* ── Playlists ── */
export function syncDefaultPlaylists() {
    // Hapus playlist usang
    state.playlists = state.playlists.filter((p) => !REMOVED_IDS.has(p.id));
    // Update URL & nama default yang berubah
    state.playlists = state.playlists.map((pl) => {
        const def = DEFAULT_PLAYLISTS.find((d) => d.id === pl.id);
        return def ? { ...pl, url: def.url, name: def.name } : pl;
    });
    // Tambahkan default yang belum ada
    const existingIds = new Set(state.playlists.map((p) => p.id));
    const missing = DEFAULT_PLAYLISTS.filter((d) => !existingIds.has(d.id));
    state.playlists = [...missing, ...state.playlists];
    save(KEYS.playlists, state.playlists);
}

export { DEFAULT_PLAYLISTS };
