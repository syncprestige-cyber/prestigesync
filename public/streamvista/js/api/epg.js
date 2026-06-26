// js/api/epg.js
import { parseXmltvTime } from "../utils/time.js";
import { loadEpgCache, saveEpgCache } from "../core/cache.js";

const EPG_URL = "https://raw.githubusercontent.com/AqFad2811/epg/main/indonesia.xml";

let epgMap = null; // { channelId: [{start, stop, title}, ...] }

function parseXmltv(xmlText) {
    const map = {};
    try {
        const doc        = new DOMParser().parseFromString(xmlText, "text/xml");
        const programmes = doc.getElementsByTagName("programme");

        for (let i = 0; i < programmes.length; i++) {
            const p         = programmes[i];
            const channelId = p.getAttribute("channel");
            const start     = parseXmltvTime(p.getAttribute("start"));
            const stop      = parseXmltvTime(p.getAttribute("stop"));
            if (!channelId || !start || !stop) continue;

            const titleEl = p.getElementsByTagName("title")[0];
            const title   = titleEl ? titleEl.textContent.trim() : "Tanpa judul";

            if (!map[channelId]) map[channelId] = [];
            map[channelId].push({ start, stop, title });
        }

        // Urutkan tiap channel berdasarkan waktu mulai
        Object.keys(map).forEach((id) =>
            map[id].sort((a, b) => a.start - b.start),
        );
    } catch (e) {
        console.warn("Parse XMLTV gagal:", e.message);
    }
    return map;
}

/**
 * Load EPG — cek cache dulu, fetch kalau expired.
 * Fire-and-forget: dipanggil di background, tidak blocking render channel.
 */
export async function loadEpg() {
    try {
        const cached = loadEpgCache();
        if (cached) {
            epgMap = cached;
            return;
        }

        const res = await fetch(EPG_URL);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const text = await res.text();
        epgMap = parseXmltv(text);
        saveEpgCache(epgMap);
    } catch (err) {
        console.warn("Gagal memuat EPG:", err.message);
        epgMap = epgMap || {};
    }
}

/**
 * Ambil program sekarang + berikutnya untuk channel tertentu.
 * @returns {{ current, next } | null}
 */
export function getEpgForChannel(channel) {
    if (!epgMap || !channel) return null;
    const list = epgMap[channel.id];
    if (!list || list.length === 0) return null;

    const now = Date.now();
    const idx = list.findIndex((p) => now >= p.start && now < p.stop);
    if (idx === -1) return null;

    return {
        current: list[idx],
        next:    list[idx + 1] || null,
    };
}
