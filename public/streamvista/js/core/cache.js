// js/core/cache.js
import { KEYS, load, save } from "./storage.js";

const CHANNEL_TTL = 3 * 60 * 60 * 1000; // 3 jam
const EPG_TTL     = 6 * 60 * 60 * 1000; // 6 jam

/* ── Channel cache ── */
export function loadChannelCache() {
    return load(KEYS.channelCache, null);
}

export function saveChannelCache(data) {
    save(KEYS.channelCache, data);
    save(KEYS.channelMeta, { ts: Date.now() });
}

export function isChannelCacheStale() {
    const meta = load(KEYS.channelMeta, {});
    return Date.now() - (meta.ts || 0) > CHANNEL_TTL;
}

/* ── EPG cache ── */
export function loadEpgCache() {
    const meta = load(KEYS.epgMeta, {});
    const fresh = Date.now() - (meta.ts || 0) < EPG_TTL;
    if (!fresh) return null;
    return load(KEYS.epgCache, null);
}

export function saveEpgCache(data) {
    save(KEYS.epgCache, data);
    save(KEYS.epgMeta, { ts: Date.now() });
}
