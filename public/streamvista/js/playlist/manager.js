// js/playlist/manager.js
import { state, DEFAULT_PLAYLISTS } from "../core/state.js";
import { KEYS, save }               from "../core/storage.js";
import { parseM3U, guessPlaylistName } from "./parser.js";

/**
 * Merge channel dari satu playlist ke state.channels.
 * Channel lama dari playlist yang sama dihapus dulu (replace, bukan duplikat).
 */
export function mergeCustomChannels(playlistId, playlistName, items) {
    state.channels = state.channels.filter((c) => c.playlistId !== playlistId);
    const mapped = items.map((it, idx) => ({
        id:          `custom_${playlistId}_${idx}`,
        name:        it.name,
        logo:        it.logo,
        country:     null,
        categories:  [],
        url:         it.url,
        source:      "custom",
        playlistId,
        playlistName,
        group:       it.group,
    }));
    state.channels.push(...mapped);
}

/**
 * Fetch + parse satu playlist, merge ke state.
 * @param {object} pl - playlist object { id, url, name, count }
 * @param {function} onDone - dipanggil setelah merge selesai
 */
async function loadOnePlaylist(pl, onDone) {
    try {
        const controller = new AbortController();
        const timeout    = setTimeout(() => controller.abort(), 8000);
        const res        = await fetch(pl.url, { signal: controller.signal });
        clearTimeout(timeout);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text  = await res.text();
        const items = parseM3U(text);

        mergeCustomChannels(pl.id, pl.name, items);
        pl.count = items.length;
        console.log(`✅ ${pl.name} → ${pl.count} channels`);
    } catch (err) {
        console.warn(`❌ Gagal ${pl.name}:`, err.message);
        pl.count = 0;
    } finally {
        onDone();
    }
}

/**
 * Load semua playlist secara paralel.
 * onProgress dipanggil setiap satu playlist selesai — untuk render inkremental.
 * @param {function} onProgress - dipanggil tiap playlist selesai
 */
export async function loadAllPlaylists(onProgress) {
    const promises = state.playlists.map(
        (pl) => loadOnePlaylist(pl, onProgress),
    );
    await Promise.all(promises);
    save(KEYS.playlists, state.playlists);
}

/**
 * Tambah playlist baru dari URL.
 * @param {string} url
 * @returns {{ ok: boolean, error?: string, count?: number }}
 */
export async function addPlaylist(url) {
    // Validasi URL
    try {
        new URL(url);
    } catch {
        return { ok: false, error: "Link tidak valid. Pastikan formatnya benar (https://...)." };
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const text  = await res.text();
        const items = parseM3U(text);
        if (items.length === 0) throw new Error("Playlist kosong");

        const id   = "pl_" + Date.now();
        const name = guessPlaylistName(url);
        state.playlists.push({ id, url, name, count: items.length });
        save(KEYS.playlists, state.playlists);

        mergeCustomChannels(id, name, items);
        return { ok: true, count: items.length };
    } catch (err) {
        return { ok: false, error: "Gagal mengambil playlist. Periksa link atau koneksi." };
    }
}

/**
 * Hapus playlist dan semua channel-nya dari state.
 */
export function removePlaylist(id) {
    state.playlists = state.playlists.filter((p) => p.id !== id);
    state.channels  = state.channels.filter((c) => c.playlistId !== id);
    save(KEYS.playlists, state.playlists);
}

/**
 * Cek apakah playlist termasuk default (tidak bisa dihapus permanent).
 */
export function isDefaultPlaylist(id) {
    return DEFAULT_PLAYLISTS.some((d) => d.id === id);
}
