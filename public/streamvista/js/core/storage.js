// js/core/storage.js

export const KEYS = {
    favorites: "streamtv_favorites_v1",
    playlists: "streamtv_playlists_v1",
    recent: "streamtv_recent_v1",
    channelCache: "streamtv_channels_cache_v2",
    channelMeta: "streamtv_cache_meta_v2",
    epgCache: "streamtv_epg_cache_v1",
    epgMeta: "streamtv_epg_meta_v1",
    theme: "streamtv_theme",
    deadChannels: "streamtv_dead_channels_v1",
};

export function load(key, fallback = null) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

export function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.warn("Storage write failed:", e.message);
        return false;
    }
}

export function remove(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        // ignore
    }
}
