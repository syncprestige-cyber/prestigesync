// js/core/state.js
import { KEYS, load, save } from "./storage.js";

const DEFAULT_PLAYLISTS = [
    // ── Tier 1: Paling stabil, link aktif dikurasi/dites otomatis ──
    {
        id: "freetv_global",
        url: "https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8",
        name: "✅ Free-TV Global (Kurasi)",
        count: 0,
    },
    {
        id: "iptvorg_indonesia",
        url: "https://iptv-org.github.io/iptv/countries/id.m3u",
        name: "🇮🇩 Indonesia (iptv-org)",
        count: 0,
    },
    // ── Tier 2: Indonesia fokus — dikurasi manual, semua sudah di-test ──
    {
        id: "riotryulianto_id",
        url: "https://raw.githubusercontent.com/riotryulianto/iptv-playlists/main/playlist.m3u",
        name: "🇮🇩 Indonesia Lengkap (riotryulianto)",
        count: 0,
    },
    // ── Tier 3: Multi-negara + konten bola/sport — update otomatis tiap Senin.
    //    Banyak channel (V+) butuh DRM, akan tampil badge 🔐 di browser. ──
    {
        id: "dhanytv",
        url: "https://raw.githubusercontent.com/dhasap/dhanytv/main/dhanytv.m3u",
        name: "⚽ DhanyTV — Indonesia + Sport + Asia",
        count: 0,
    },
    // ── Tier 4: Crowdsourced Asia — banyak channel unik, tapi banyak yang mati ──
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
];

// ID playlist yang dihapus dari default — syncDefaultPlaylists() akan
// membersihkannya dari localStorage user yang masih punya entry lama.
// yuanxin69: banyak URL pakai token akun pribadi (authCode/stbId), bukan
// stream publik — sering mati & bermasalah secara etika/legal.
const REMOVED_IDS = new Set([
    "yang_sport",
    "yang_live",
    "yuanxin69_all",
    "yuanxin69_cn",
    "yuanxin69",
]);
const MAX_RECENT = 20;
const DEAD_TTL = 6 * 60 * 60 * 1000; // 6 jam  — error sementara (timeout/generic)
const BLOCKED_TTL = 7 * 24 * 60 * 60 * 1000; // 7 hari — error permanen (DRM/blocked)

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
    deadChannels: load(KEYS.deadChannels, {}), // { channelId: timestampMatiTerakhir }
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

/* ── Dead Channels (lazy-marked, hasil dari player error) ── */
/**
 * Tandai channel sebagai mati (gagal play). Disimpan dengan timestamp
 * supaya bisa "dicoba lagi" otomatis setelah DEAD_TTL berlalu — channel
 * publik gratisan sering hidup/mati berubah-ubah, jadi status ini
 * sementara, bukan permanen.
 */
export function markChannelDead(id) {
    state.deadChannels[id] = { ts: Date.now(), type: "dead" };
    save(KEYS.deadChannels, state.deadChannels);
}

/**
 * Tandai channel sebagai blocked permanen (DRM atau server aktif menolak).
 * TTL jauh lebih panjang (7 hari) karena kondisi ini tidak berubah sendiri.
 */
export function markChannelBlocked(id) {
    state.deadChannels[id] = { ts: Date.now(), type: "blocked" };
    save(KEYS.deadChannels, state.deadChannels);
}

/**
 * Hapus tanda mati — dipanggil saat channel berhasil play (playing event),
 * supaya kalau ternyata sekarang hidup lagi, badge-nya langsung hilang.
 */
export function markChannelAlive(id) {
    if (state.deadChannels[id]) {
        delete state.deadChannels[id];
        save(KEYS.deadChannels, state.deadChannels);
    }
}

/**
 * Cek apakah channel masih dianggap mati (belum lewat TTL).
 * Mendukung format lama (nilai number) dan format baru ({ ts, type }).
 */
export function isChannelDead(id) {
    const entry = state.deadChannels[id];
    if (!entry) return false;

    // Backward-compat: format lama simpan timestamp langsung (number)
    const ts = typeof entry === "number" ? entry : entry.ts;
    const type = typeof entry === "number" ? "dead" : entry.type || "dead";
    const ttl = type === "blocked" ? BLOCKED_TTL : DEAD_TTL;

    if (Date.now() - ts > ttl) {
        delete state.deadChannels[id];
        save(KEYS.deadChannels, state.deadChannels);
        return false;
    }
    return true;
}

/**
 * Cek tipe dead channel — berguna untuk render badge yang tepat.
 * Return: "blocked" | "dead" | null
 */
export function getChannelDeadType(id) {
    const entry = state.deadChannels[id];
    if (!entry) return null;
    const ts = typeof entry === "number" ? entry : entry.ts;
    const type = typeof entry === "number" ? "dead" : entry.type || "dead";
    const ttl = type === "blocked" ? BLOCKED_TTL : DEAD_TTL;
    if (Date.now() - ts > ttl) return null;
    return type;
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
