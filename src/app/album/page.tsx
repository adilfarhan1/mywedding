"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  X, Play, Download, ChevronLeft, ChevronRight,
  ImageIcon, Film, Loader2,
} from "lucide-react";

const FOLDER_ID = "19a8YCIyqZbTPVS10FxfIBiCn_AaVa-Hb";

type MediaItem = {
  id: string;
  name: string;
  mimeType: string;
  isVideo: boolean;
  thumb: string;
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }: {
  items: MediaItem[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const item = items[index];
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/96 backdrop-blur-md" onClick={onClose}>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10">
        <span className="text-white/40 text-xs tracking-widest">{index + 1} / {items.length}</span>
        <div className="flex items-center gap-2">
          <a
            href={`https://drive.google.com/uc?export=download&id=${item.id}`}
            target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white/70 hover:text-white text-xs"
          >
            <Download size={12} /> Download
          </a>
          <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white">
            <X size={18} />
          </button>
        </div>
      </div>

      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white z-10">
        <ChevronLeft size={22} />
      </button>

      <div className="relative max-w-5xl max-h-[85vh] w-full mx-16 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {item.isVideo ? (
          <iframe
            src={`https://drive.google.com/file/d/${item.id}/preview`}
            className="w-full rounded-2xl shadow-2xl" style={{ aspectRatio: "16/9" }}
            allow="autoplay" allowFullScreen
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://lh3.googleusercontent.com/d/${item.id}=w1600`}
            alt={item.name}
            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            onError={(e) => {
                // fallback to smaller size if 1600 fails
                (e.target as HTMLImageElement).src = `https://lh3.googleusercontent.com/d/${item.id}=w800`;
            }}
            />
        )}
      </div>

      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white z-10">
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/35 text-[11px] max-w-xs truncate px-4 text-center">
        {item.name}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function AlbumCard({ item, index, onClick }: { item: MediaItem; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const ratios = ["4/3", "1/1", "4/5", "4/3", "16/9", "1/1", "4/3", "4/5"];
  const ratio = ratios[index % ratios.length];

  // Only load thumbnail when card scrolls into view, staggered to avoid 429
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = (index % 8) * 150; // stagger 150ms per batch of 8
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-[#f0e8d0]"
      style={{ aspectRatio: ratio }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5ead0] to-[#e8d8b0] animate-pulse flex items-center justify-center">
          {item.isVideo ? <Film size={18} className="text-[#c9a84c]/30" /> : <ImageIcon size={18} className="text-[#c9a84c]/30" />}
        </div>
      )}
      {visible && !err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.thumb}
          alt={item.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => { setErr(true); setLoaded(true); }}
        />
      ) : (visible && err ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f5ead0] gap-2">
          {item.isVideo ? <Film size={26} className="text-[#c9a84c]" /> : <ImageIcon size={26} className="text-[#c9a84c]" />}
          <span className="text-[9px] text-[#b0a080] px-2 text-center line-clamp-2">{item.name}</span>
        </div>
      ) : null)}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Video play */}
      {item.isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-black/50 transition">
            <Play size={17} className="text-white fill-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-[10px] truncate flex-1 mr-2 drop-shadow">{item.name}</p>
        <a
          href={`https://drive.google.com/uc?export=download&id=${item.id}`}
          target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 transition text-white shrink-0"
        >
          <Download size={11} />
        </a>
      </div>

      {/* Gold corner */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-3.5 h-[1.5px] bg-[#c9a84c] absolute top-0 right-0" />
        <div className="w-[1.5px] h-3.5 bg-[#c9a84c] absolute top-0 right-0" />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function WeddingAlbum() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "photos" | "videos">("all");

const load = useCallback(async () => {
  setLoading(true);
  setError("");
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_API_KEY not set in .env.local");

    const url = new URL("https://www.googleapis.com/drive/v3/files");
    url.searchParams.set("q", `'${FOLDER_ID}' in parents and trashed = false`);
    url.searchParams.set("fields", "files(id,name,mimeType)");   // ← removed thumbnailLink
    url.searchParams.set("pageSize", "200");
    url.searchParams.set("orderBy", "createdTime desc");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error?.message || `Google API error ${res.status}`);
    }

    const data = await res.json();
    const media: MediaItem[] = (data.files || [])
      .filter((f: any) => f.mimeType?.startsWith("image/") || f.mimeType?.startsWith("video/"))
      .map((f: any) => {
        const isVideo = f.mimeType?.startsWith("video/");
        // ✅ Fully public URLs — no Google login required
        const thumb = isVideo
          ? `https://drive.google.com/thumbnail?id=${f.id}&sz=w400`
          : `https://lh3.googleusercontent.com/d/${f.id}=w400`;
        return { id: f.id, name: f.name, mimeType: f.mimeType, isVideo, thumb };
      });

    setItems(media);
  } catch (e: any) {
    setError(e.message || "Failed to load album");
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => { load(); }, [load]);

  const filtered = items.filter((i) =>
    filter === "all" ? true : filter === "photos" ? !i.isVideo : i.isVideo
  );
  const photos = items.filter((i) => !i.isVideo);
  const videos = items.filter((i) => i.isVideo);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(ellipse at 15% 5%, rgba(201,168,76,0.09) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 90%, rgba(64,145,108,0.06) 0%, transparent 45%),
          #faf7f0
        `,
      }}
    >
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered} index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i! - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex((i) => (i! + 1) % filtered.length)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span style={{ color: "#c9a84c", fontSize: 18 }}>✦</span>
            <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <p className="text-[#b0a080] uppercase mb-2"
            style={{ fontFamily: "var(--font-cinzel, Georgia, serif)", fontSize: 9, letterSpacing: "0.38em" }}>
            Adil Farhan & Lubna Nasrin
          </p>
          <h1 className="text-[#7a6a4a] leading-none mb-2"
            style={{ fontFamily: "var(--font-rouge, Georgia, serif)", fontSize: "clamp(2.6rem, 6vw, 4rem)" }}>
            Wedding Album
          </h1>
          <p className="text-[#b0a080] italic"
            style={{ fontFamily: "var(--font-garamond, Georgia, serif)", fontSize: 13 }}>
            22 November 2026 · Athafy Auditorium, Vadakara
          </p>

          {!loading && items.length > 0 && (
            <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-[#e8dfc0] max-w-xs mx-auto">
              {[{ n: photos.length, l: "Photos" }, { n: videos.length, l: "Videos" }, { n: items.length, l: "Total" }]
                .map(({ n, l }, i, arr) => (
                  <div key={l} className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="font-serif text-2xl text-[#7a6a4a]">{n}</p>
                      <p className="text-[9px] text-[#b0a080] uppercase tracking-widest">{l}</p>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-7 bg-[#e8dfc0]" />}
                  </div>
                ))}
            </div>
          )}
        </header>

        {/* Filters */}
        {!loading && !error && items.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {(["all", "photos", "videos"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-[11px] uppercase tracking-widest transition-all ${
                  filter === f ? "bg-[#c9a84c] text-white shadow-sm" : "border border-[#e0d4b0] text-[#b0a080] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}>
                {f === "all" ? `All (${items.length})` : f === "photos" ? `Photos (${photos.length})` : `Videos (${videos.length})`}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-28 gap-4">
            <Loader2 size={30} className="text-[#c9a84c] animate-spin" />
            <p className="text-[#b0a080] text-sm italic">Loading your memories…</p>
          </div>
        )}

        {/* Error + iframe fallback */}
        {!loading && error && (
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="bg-white rounded-2xl border border-[#e8dfc0] p-5 shadow-sm">
              <p className="text-[#7a6a4a] font-medium text-sm mb-1">⚠ Setup needed</p>
              <p className="text-[#b0a080] text-xs mb-3 font-mono break-all">{error}</p>
              <div className="bg-[#faf7f0] border border-[#e8dfc0] rounded-xl p-3 text-xs font-mono text-[#7a6a4a] mb-3">
                <span className="text-[#b0a080]"># .env.local</span>{"\n"}
                NEXT_PUBLIC_GOOGLE_API_KEY=AIza...
              </div>
              <p className="text-[10px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                ⚠ Google API keys start with <strong>AIza</strong>. Your current key (<code>ec2385ef...</code>) appears to be a different format — please generate a new key at <strong>console.cloud.google.com</strong> → APIs &amp; Services → Credentials.
              </p>
            </div>

            {/* Iframe embed — browse & download without leaving the page */}
            <div>
              <p className="text-center text-[9px] uppercase tracking-widest text-[#b0a080] mb-3">
                Browse & Download — Wedding Album
              </p>
              <div className="rounded-2xl overflow-hidden border border-[#e8dfc0] shadow-sm bg-white">
                <iframe
                  src={`https://drive.google.com/embeddedfolderview?id=${FOLDER_ID}#grid`}
                  className="w-full" style={{ height: 640, border: "none" }}
                  title="Wedding Album"
                />
              </div>
            </div>
          </div>
        )}

        {/* Gallery */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-8">
            {/* Videos */}
            {filter !== "photos" && filtered.some((i) => i.isVideo) && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Film size={12} className="text-[#c9a84c]" />
                  <span className="text-[9px] uppercase tracking-widest text-[#b0a080]">Videos</span>
                  <div className="flex-1 h-px bg-[#f0e8d0]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.filter((i) => i.isVideo).map((item, idx) => (
                    <AlbumCard key={item.id} item={item} index={idx}
                      onClick={() => setLightboxIndex(filtered.indexOf(item))} />
                  ))}
                </div>
              </section>
            )}

            {/* Photos masonry */}
            {filter !== "videos" && filtered.some((i) => !i.isVideo) && (
              <section>
                {filter === "all" && filtered.some((i) => i.isVideo) && (
                  <div className="flex items-center gap-3 mb-4">
                    <ImageIcon size={12} className="text-[#c9a84c]" />
                    <span className="text-[9px] uppercase tracking-widest text-[#b0a080]">Photos</span>
                    <div className="flex-1 h-px bg-[#f0e8d0]" />
                  </div>
                )}
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
                  {filtered.filter((i) => !i.isVideo).map((item, idx) => (
                    <div key={item.id} className="break-inside-avoid mb-3">
                      <AlbumCard item={item} index={idx}
                        onClick={() => setLightboxIndex(filtered.indexOf(item))} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 pb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#c9a84c]/30" />
            <span className="text-[#c9a84c]/50 text-base">✦</span>
            <div className="h-px w-10 bg-[#c9a84c]/30" />
          </div>
          <p className="text-[#b0a080] italic text-xs" style={{ fontFamily: "var(--font-garamond, Georgia, serif)" }}>
            Every photo holds a thousand blessings
          </p>
        </footer>
      </div>
    </div>
  );
}