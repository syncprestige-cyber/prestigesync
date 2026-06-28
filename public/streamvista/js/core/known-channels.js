// js/core/known-channels.js
//
// Mapping slug -> URL stream untuk channel yang sering dibagikan
// (misal siaran bola). Tujuannya supaya link share bisa pendek:
//   ?play=alkass-four
// tanpa perlu nyertain &src=... yang panjang dan ter-encode.
//
// Cara nambah channel baru: tambahkan satu baris di bawah,
// key = slug (huruf kecil, pakai tanda "-", dipakai juga sebagai
// fallback nama tampilan), value = URL stream (.m3u8).

export const KNOWN_CHANNELS = {
    "alkass-four": "https://liveeu-gcp.alkassdigital.net/alkass4-p/main.m3u8",
};

/**
 * Ambil src dari known list berdasarkan slug.
 * @param {string} slug
 * @returns {string|null}
 */
export function getKnownChannelSrc(slug) {
    return KNOWN_CHANNELS[slug] || null;
}
