// app/api/stream-proxy/route.ts
// Proxy untuk m3u8 + segmen TS/fMP4, supaya channel yang CORS-blocked
// tetap bisa diputar lewat backend kita (Vercel serverless/edge).

import { NextRequest } from "next/server";

export const runtime = "nodejs"; // butuh nodejs runtime, bukan edge, untuk fleksibilitas fetch header

function absoluteUrl(base: string, relative: string) {
    try {
        return new URL(relative, base).toString();
    } catch {
        return relative;
    }
}

function buildProxyUrl(req: NextRequest, target: string) {
    const origin = req.nextUrl.origin;
    return `${origin}/api/stream-proxy?url=${encodeURIComponent(target)}`;
}

export async function GET(req: NextRequest) {
    const target = req.nextUrl.searchParams.get("url");
    if (!target) {
        return new Response("Missing url param", { status: 400 });
    }

    let upstream: Response;
    try {
        const targetOrigin = new URL(target).origin;
        upstream = await fetch(target, {
            headers: {
                // Beberapa server IPTV cek User-Agent / Referer, jadi kita
                // pura-pura jadi browser biasa yang datang dari domain itu sendiri.
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
                Referer: targetOrigin + "/",
                Origin: targetOrigin,
            },
            redirect: "follow",
        });
    } catch (err) {
        return new Response("Upstream fetch failed: " + String(err), {
            status: 502,
        });
    }

    if (!upstream.ok) {
        console.error(
            `[stream-proxy] upstream ${upstream.status} ${upstream.statusText} -> ${target}`,
        );
        return new Response("Upstream error: " + upstream.status, {
            status: upstream.status,
            headers: { "Access-Control-Allow-Origin": "*" },
        });
    }
    console.log(`[stream-proxy] OK ${upstream.status} -> ${target}`);

    const contentType = upstream.headers.get("content-type") || "";
    const isPlaylist =
        target.endsWith(".m3u8") ||
        contentType.includes("application/vnd.apple.mpegurl") ||
        contentType.includes("application/x-mpegurl");

    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "no-store",
    };

    if (isPlaylist) {
        const text = await upstream.text();
        const rewritten = text
            .split("\n")
            .map((line) => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith("#")) return line;
                // Baris berisi URI segmen / playlist varian -> jadikan absolute,
                // lalu bungkus lagi lewat proxy ini.
                const abs = absoluteUrl(target, trimmed);
                return buildProxyUrl(req, abs);
            })
            .join("\n");

        return new Response(rewritten, {
            status: 200,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/vnd.apple.mpegurl",
            },
        });
    }

    // Segmen biner (.ts / .m4s / key, dll) -> stream langsung passthrough
    const buf = await upstream.arrayBuffer();
    return new Response(buf, {
        status: 200,
        headers: {
            ...corsHeaders,
            "Content-Type": contentType || "video/mp2t",
        },
    });
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
    });
}