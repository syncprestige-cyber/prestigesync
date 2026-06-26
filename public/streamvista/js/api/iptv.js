// js/api/iptv.js
import { state } from "../core/state.js";
import {
    loadChannelCache,
    saveChannelCache,
    isChannelCacheStale,
} from "../core/cache.js";

const API = {
    channels: "https://iptv-org.github.io/api/channels.json",
    streams: "https://iptv-org.github.io/api/streams.json",
    countries: "https://iptv-org.github.io/api/countries.json",
    categories: "https://iptv-org.github.io/api/categories.json",
    // iptv-org sudah memindahkan field "logo" dari channels.json ke endpoint
    // terpisah ini (1 channel bisa punya beberapa logo per "feed").
    logos: "https://iptv-org.github.io/api/logos.json",
};

/**
 * Bangun map channelId -> logo URL terbaik dari logos.json.
 * Satu channel bisa punya banyak entri logo (per feed/tag), jadi kita
 * prioritaskan: feed utama (feed === null) + in_use === true.
 * Kalau tidak ada yang match persis, pakai entri pertama yang ditemukan
 * untuk channel itu sebagai fallback, supaya tetap ada logo daripada kosong.
 */
function buildLogoMap(logosRes) {
    const map = {};
    logosRes.forEach((l) => {
        if (!l.channel || !l.url) return;
        const isMainFeed = !l.feed;
        const isBest = isMainFeed && l.in_use;

        if (!map[l.channel]) {
            map[l.channel] = {
                url: l.url,
                score: isBest ? 2 : isMainFeed ? 1 : 0,
            };
        } else if ((isBest ? 2 : isMainFeed ? 1 : 0) > map[l.channel].score) {
            map[l.channel] = {
                url: l.url,
                score: isBest ? 2 : isMainFeed ? 1 : 0,
            };
        }
    });
    return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, v.url]));
}

async function fetchFresh() {
    const streamsPromise = fetch(API.streams).then((r) => r.json());
    const logosPromise = fetch(API.logos).then((r) => r.json());
    const [channelsRes, countriesRes, categoriesRes] = await Promise.all([
        fetch(API.channels).then((r) => r.json()),
        fetch(API.countries).then((r) => r.json()),
        fetch(API.categories).then((r) => r.json()),
    ]);
    const streamsRes = await streamsPromise;

    // logos.json cukup besar; kalau gagal fetch, jangan sampai seluruh
    // channel list gagal — cukup fallback ke "tanpa logo" (huruf inisial).
    let logosRes = [];
    try {
        logosRes = await logosPromise;
    } catch (e) {
        console.warn("Gagal memuat logos.json:", e.message);
    }
    const logoMap = buildLogoMap(logosRes);

    const countries = Object.fromEntries(
        countriesRes.map((c) => [c.code, c.name]),
    );
    const categories = Object.fromEntries(
        categoriesRes.map((c) => [c.id, c.name]),
    );

    const streamMap = {};
    streamsRes.forEach((s) => {
        if (!streamMap[s.channel]) streamMap[s.channel] = s.url;
    });

    const channels = channelsRes
        .filter((c) => streamMap[c.id] && !c.closed)
        .map((c) => ({
            id: c.id,
            name: c.name,
            logo: logoMap[c.id] || "",
            country: c.country,
            categories: c.categories || [],
            url: streamMap[c.id],
            source: "iptv-org",
        }));

    return { channels, countries, categories };
}

/**
 * Load channel iptv-org dengan strategi stale-while-revalidate.
 * @param {function} onData - dipanggil tiap kali data siap (cache atau fresh)
 */
export async function loadIptvChannels(onData) {
    const cached = loadChannelCache();

    if (cached) {
        // Tampilkan cache instan
        onData(cached);

        // Refresh di background kalau sudah stale
        if (isChannelCacheStale()) {
            try {
                const fresh = await fetchFresh();
                saveChannelCache(fresh);
                onData(fresh);
            } catch (e) {
                console.warn("Background refresh gagal:", e.message);
            }
        }
        return;
    }

    // Tidak ada cache — fetch langsung (blocking)
    const fresh = await fetchFresh();
    saveChannelCache(fresh);
    onData(fresh);
}

export async function refreshIptvChannels(onData) {
    const fresh = await fetchFresh();
    saveChannelCache(fresh);
    onData(fresh);
}
