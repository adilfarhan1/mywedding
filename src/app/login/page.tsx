"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Users, UserCheck, UserX, Clock, Link as LinkIcon,
  Download, Search, Filter, QrCode, Plus, X, ChevronDown,
  Tag, Trash2, Check, SlidersHorizontal, Crown, Heart
} from "lucide-react";
import QRCode from "qrcode";

// ─── Types ────────────────────────────────────────────────────────────────────
type Guest = {
  _id: string;
  name: string;
  category?: string;
  familyCategory?: string;
  side?: "bride" | "groom";
  attending: boolean | null;
  members: number;
  slug?: string;
  createdAt: string;
};

type FamilyCategory = { _id: string; name: string; side: "bride" | "groom" };

// ─── QR Modal ─────────────────────────────────────────────────────────────────
function QRModal({ guest, onClose }: { guest: Guest; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const url = typeof window !== "undefined" ? `${window.location.origin}/invite/${guest.slug}` : "";

  useEffect(() => {
    if (canvasRef.current && url) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 240, margin: 2,
        color: { dark: "#1a1a1a", light: "#faf7f0" },
      });
    }
  }, [url]);

  const downloadQR = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `invite-${guest.slug}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-[#faf7f0] rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl max-w-xs w-full mx-4" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/10 transition"><X size={16} className="text-[#7a6a4a]" /></button>
        <p className="font-serif text-xl text-[#7a6a4a]">{guest.name}</p>
        <canvas ref={canvasRef} className="rounded-xl" />
        <p className="text-[10px] text-[#b0a080] break-all text-center">{url}</p>
        <div className="flex gap-3 w-full">
          <button onClick={() => navigator.clipboard.writeText(url)} className="flex-1 py-2 border border-[#c9a84c]/50 text-[#c9a84c] rounded-lg text-xs uppercase tracking-wider hover:bg-[#c9a84c]/10 transition">Copy Link</button>
          <button onClick={downloadQR} className="flex-1 py-2 bg-[#c9a84c] text-white rounded-lg text-xs uppercase tracking-wider hover:bg-[#b8973b] transition">Download</button>
        </div>
      </div>
    </div>
  );
}

// ─── Family Category Modal ─────────────────────────────────────────────────────
function FamilyCategoryModal({
  categories, onAdd, onDelete, onClose,
}: {
  categories: FamilyCategory[];
  onAdd: (name: string, side: "bride" | "groom") => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [side, setSide] = useState<"bride" | "groom">("bride");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError("");
    try {
      await onAdd(name.trim(), side);
      setName("");
    } catch (err: any) {
      setError(err.message || "Failed to add category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-[#faf7f0] rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/10 transition"><X size={16} className="text-[#7a6a4a]" /></button>
        <h3 className="font-serif text-xl text-[#7a6a4a] mb-4">Manage Family Categories</h3>

        <div className="flex gap-2 mb-1">
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Category name (e.g. Al-Rashid Family)"
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-[#c9a84c]/40 bg-white focus:outline-none focus:border-[#c9a84c] text-[#3a3020]"
          />
          <select value={side} onChange={e => setSide(e.target.value as "bride" | "groom")} className="px-3 py-2 text-sm rounded-lg border border-[#c9a84c]/40 bg-white focus:outline-none focus:border-[#c9a84c] text-[#3a3020]">
            <option value="bride">Bride</option>
            <option value="groom">Groom</option>
          </select>
          <button onClick={handleAdd} disabled={saving} className="p-2 bg-[#c9a84c] text-white rounded-lg hover:bg-[#b8973b] transition disabled:opacity-50">
            <Plus size={16} />
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

        <div className="space-y-2 max-h-64 overflow-y-auto mt-3">
          {categories.length === 0 && <p className="text-center text-[#b0a080] text-sm py-4">No categories yet.</p>}
          {categories.map(cat => (
            <div key={cat._id} className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-[#e8dfc0]">
              <div className="flex items-center gap-2">
                {cat.side === "bride" ? <Heart size={12} className="text-pink-400" /> : <Crown size={12} className="text-blue-400" />}
                <span className="text-sm text-[#3a3020]">{cat.name}</span>
                <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full ${cat.side === "bride" ? "bg-pink-100 text-pink-500" : "bg-blue-100 text-blue-500"}`}>{cat.side}</span>
              </div>
              <button onClick={() => onDelete(cat._id)} className="p-1 hover:bg-red-50 rounded text-red-400 transition"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Guest Table ───────────────────────────────────────────────────────────────
function GuestTable({ guests, loading, onQR, onCopyLink, onMarkInvited }: {
  guests: Guest[]; loading: boolean;
  onQR: (g: Guest) => void; onCopyLink: (slug: string) => void; onMarkInvited: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#e8dfc0] text-[#b0a080] tracking-wider uppercase text-[10px]">
            <th className="pb-3 font-normal pl-1">Name</th>
            <th className="pb-3 font-normal">Family</th>
            <th className="pb-3 font-normal">Status</th>
            <th className="pb-3 font-normal">Members</th>
            <th className="pb-3 font-normal">Invited</th>
            <th className="pb-3 font-normal text-right pr-1">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0e8d0]">
          {loading ? (
            <tr><td colSpan={6} className="py-8 text-center text-[#b0a080]">
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
                Loading guests...
              </div>
            </td></tr>
          ) : guests.length === 0 ? (
            <tr><td colSpan={6} className="py-8 text-center text-[#b0a080]">No guests found.</td></tr>
          ) : guests.map((guest) => (
            <tr key={guest._id} className="hover:bg-[#fdf5e4]/60 transition-colors group">
              <td className="py-3 pl-1">
                <div className="font-medium text-[#3a3020]">{guest.name}</div>
                {guest.category && <div className="text-[10px] text-[#b0a080] mt-0.5">{guest.category}</div>}
              </td>
              <td className="py-3">
                {guest.familyCategory
                  ? <span className="text-xs bg-[#f5ead0] text-[#7a6a4a] px-2 py-0.5 rounded-full">{guest.familyCategory}</span>
                  : <span className="text-[#d0c8b0]">—</span>}
              </td>
              <td className="py-3">
                {guest.attending === true ? (
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200"><Check size={10} /> Attending</span>
                ) : guest.attending === false ? (
                  <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full border border-red-200"><X size={10} /> Declined</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200"><Clock size={10} /> Pending</span>
                )}
              </td>
              <td className="py-3 text-[#7a6a4a]">{guest.members || "—"}</td>
              <td className="py-3">
                <button onClick={() => onMarkInvited(guest._id)} title="Toggle invited mark"
                  className="w-5 h-5 rounded border-2 border-[#c9a84c]/40 bg-white hover:border-[#c9a84c] flex items-center justify-center transition">
                  <Check size={10} className="text-[#c9a84c] opacity-0 group-hover:opacity-50 transition" />
                </button>
              </td>
              <td className="py-3 text-right pr-1">
                <div className="flex items-center justify-end gap-1">
                  {guest.slug && (
                    <>
                      <button onClick={() => onQR(guest)} className="p-1.5 hover:bg-[#f5ead0] rounded-lg transition text-[#c9a84c]" title="Show QR Code"><QrCode size={14} /></button>
                      <button onClick={() => onCopyLink(guest.slug!)} className="p-1.5 hover:bg-[#f5ead0] rounded-lg transition text-[#c9a84c]" title="Copy Link"><LinkIcon size={14} /></button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [guests, setGuests] = useState<Guest[]>([]);
  const [familyCategories, setFamilyCategories] = useState<FamilyCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"all" | "bride" | "groom">("all");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "attending" | "declined" | "pending">("all");
  const [filterFamily, setFilterFamily] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [qrGuest, setQrGuest] = useState<Guest | null>(null);
  const [showFamilyModal, setShowFamilyModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newSide, setNewSide] = useState<"bride" | "groom">("bride");
  const [newCategory, setNewCategory] = useState("");
  const [newFamilyCategory, setNewFamilyCategory] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "wedding" && password === "wed123") {
      setIsAuthenticated(true);
      fetchGuests();
      fetchFamilyCategories();
    } else {
      alert("Invalid credentials");
    }
  };

  // ── API helpers ──────────────────────────────────────────────────────────────

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/guests");
      if (res.ok) {
        const data = await res.json();
        setGuests(data.guests || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFamilyCategories = async () => {
    try {
      const res = await fetch("/api/admin/family-categories");
      if (res.ok) {
        const data = await res.json();
        setFamilyCategories(data.categories || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addFamilyCategory = async (name: string, side: "bride" | "groom") => {
    const res = await fetch("/api/admin/family-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, side }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to add category");
    }
    await fetchFamilyCategories();
  };

  const deleteFamilyCategory = async (id: string) => {
    const res = await fetch(`/api/admin/family-categories?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete category");
    }
    await fetchFamilyCategories();
  };

  const generateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    try {
      const res = await fetch("/api/admin/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, side: newSide, category: newCategory, familyCategory: newFamilyCategory }),
      });
      if (res.ok) {
        setNewName(""); setNewCategory(""); setNewFamilyCategory("");
        fetchGuests();
      }
    } catch (error) { console.error(error); }
  };

  const copyToClipboard = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/invite/${slug}`);
    alert("Copied!");
  };

  const downloadCSV = () => {
    const headers = ["Name", "Side", "Family Category", "Category", "Status", "Members", "Link"];
    const rows = filteredGuests.map(g => [
      `"${g.name}"`, g.side || "", `"${g.familyCategory || ""}"`, `"${g.category || ""}"`,
      g.attending === true ? "Attending" : g.attending === false ? "Declined" : "Pending",
      g.members, g.slug ? `${window.location.origin}/invite/${g.slug}` : "",
    ].join(","));
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); link.download = "wedding_guests.csv"; link.click();
  };

  // ── Derived data ─────────────────────────────────────────────────────────────

  const filteredGuests = useMemo(() => {
    return guests.filter(g => {
      if (activeTab !== "all" && g.side !== activeTab) return false;
      if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterStatus === "attending" && g.attending !== true) return false;
      if (filterStatus === "declined" && g.attending !== false) return false;
      if (filterStatus === "pending" && g.attending !== null) return false;
      if (filterFamily && g.familyCategory !== filterFamily) return false;
      if (filterCategory && g.category !== filterCategory) return false;
      return true;
    });
  }, [guests, activeTab, search, filterStatus, filterFamily, filterCategory]);

  const stats = (list: Guest[]) => ({
    total: list.length,
    confirmed: list.filter(g => g.attending === true).length,
    declined: list.filter(g => g.attending === false).length,
    pending: list.filter(g => g.attending === null).length,
    heads: list.reduce((a, g) => a + (g.attending === true ? (g.members || 0) : 0), 0),
  });

  const brideGuests = guests.filter(g => g.side === "bride");
  const groomGuests = guests.filter(g => g.side === "groom");
  const allStats = stats(guests);
  const brideStats = stats(brideGuests);
  const groomStats = stats(groomGuests);

  // ── Login Screen ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f0] p-4"
        style={{ backgroundImage: "radial-gradient(ellipse at 60% 20%, #f5ead0 0%, #faf7f0 60%)" }}>
        <form onSubmit={handleLogin} className="bg-white rounded-3xl p-10 w-full max-w-md shadow-xl border border-[#e8dfc0]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#fdf5e4] border border-[#c9a84c]/30 mb-4">
              <Crown size={22} className="text-[#c9a84c]" />
            </div>
            <h1 className="font-serif text-3xl text-[#7a6a4a]">Wedding Admin</h1>
            <p className="text-[#b0a080] text-sm mt-1 tracking-wider">RSVP Management Portal</p>
          </div>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
            className="w-full bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-4 py-3 mb-3 text-[#3a3020] focus:outline-none focus:border-[#c9a84c] transition-colors text-sm" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-4 py-3 mb-6 text-[#3a3020] focus:outline-none focus:border-[#c9a84c] transition-colors text-sm" />
          <button type="submit" className="w-full bg-[#c9a84c] text-white py-3 rounded-xl font-semibold tracking-widest uppercase text-sm hover:bg-[#b8973b] transition-all shadow-md">
            Enter Dashboard
          </button>
        </form>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#3a3020]"
      style={{ backgroundImage: "radial-gradient(ellipse at 80% 0%, #f5ead0 0%, #faf7f0 50%)" }}>
      {qrGuest && <QRModal guest={qrGuest} onClose={() => setQrGuest(null)} />}
      {showFamilyModal && (
        <FamilyCategoryModal
          categories={familyCategories}
          onAdd={addFamilyCategory}
          onDelete={deleteFamilyCategory}
          onClose={() => setShowFamilyModal(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#7a6a4a]">Attendance Dashboard</h1>
            <p className="text-[#b0a080] text-xs tracking-widest uppercase mt-1">Real-time RSVP Tracking</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFamilyModal(true)} className="flex items-center gap-2 px-4 py-2 border border-[#c9a84c]/40 text-[#c9a84c] rounded-xl text-xs uppercase tracking-wider hover:bg-[#c9a84c]/10 transition">
              <Tag size={14} /> Families
            </button>
            <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-white rounded-xl text-xs uppercase tracking-wider hover:bg-[#b8973b] transition shadow-sm">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-[#e8dfc0] shadow-sm">
            <div className="flex items-center gap-2 mb-3"><Heart size={14} className="text-pink-400" /><span className="text-xs uppercase tracking-widest text-[#b0a080]">Bride's Side</span></div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div><p className="font-serif text-2xl text-[#7a6a4a]">{brideStats.total}</p><p className="text-[10px] text-[#b0a080]">Invited</p></div>
              <div><p className="font-serif text-2xl text-emerald-600">{brideStats.confirmed}</p><p className="text-[10px] text-[#b0a080]">Confirmed</p></div>
              <div><p className="font-serif text-2xl text-red-400">{brideStats.declined}</p><p className="text-[10px] text-[#b0a080]">Declined</p></div>
              <div><p className="font-serif text-2xl text-amber-500">{brideStats.pending}</p><p className="text-[10px] text-[#b0a080]">Pending</p></div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#f0e8d0] text-center"><span className="text-xs text-[#b0a080]">Total Heads: </span><span className="font-semibold text-[#c9a84c]">{brideStats.heads}</span></div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#e8dfc0] shadow-sm">
            <div className="flex items-center gap-2 mb-3"><Crown size={14} className="text-blue-400" /><span className="text-xs uppercase tracking-widest text-[#b0a080]">Groom's Side</span></div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div><p className="font-serif text-2xl text-[#7a6a4a]">{groomStats.total}</p><p className="text-[10px] text-[#b0a080]">Invited</p></div>
              <div><p className="font-serif text-2xl text-emerald-600">{groomStats.confirmed}</p><p className="text-[10px] text-[#b0a080]">Confirmed</p></div>
              <div><p className="font-serif text-2xl text-red-400">{groomStats.declined}</p><p className="text-[10px] text-[#b0a080]">Declined</p></div>
              <div><p className="font-serif text-2xl text-amber-500">{groomStats.pending}</p><p className="text-[10px] text-[#b0a080]">Pending</p></div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#f0e8d0] text-center"><span className="text-xs text-[#b0a080]">Total Heads: </span><span className="font-semibold text-[#c9a84c]">{groomStats.heads}</span></div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-[#c9a84c] rounded-2xl p-5 text-white shadow-sm">
            <div className="flex items-center gap-2 mb-3"><Users size={14} className="text-white/70" /><span className="text-xs uppercase tracking-widest text-white/70">Combined Total</span></div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div><p className="font-serif text-2xl">{allStats.total}</p><p className="text-[10px] text-white/70">Invited</p></div>
              <div><p className="font-serif text-2xl">{allStats.confirmed}</p><p className="text-[10px] text-white/70">Confirmed</p></div>
              <div><p className="font-serif text-2xl">{allStats.declined}</p><p className="text-[10px] text-white/70">Declined</p></div>
              <div><p className="font-serif text-2xl">{allStats.pending}</p><p className="text-[10px] text-white/70">Pending</p></div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 text-center"><span className="text-xs text-white/70">Total Heads: </span><span className="font-bold text-white text-lg">{allStats.heads}</span></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Add Guest Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 border border-[#e8dfc0] shadow-sm sticky top-6">
              <h2 className="font-serif text-lg text-[#7a6a4a] mb-4">Add Guest</h2>
              <form onSubmit={generateLink} className="flex flex-col gap-3">
                <input type="text" required placeholder="Guest / Family Name" value={newName} onChange={e => setNewName(e.target.value)}
                  className="w-full bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] transition text-[#3a3020]" />

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#b0a080] mb-2">Side</p>
                  <div className="grid grid-cols-2 gap-2">
                    <label className={`flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs cursor-pointer transition ${newSide === "bride" ? "bg-pink-50 border-pink-300 text-pink-600" : "border-[#e0d4b0] text-[#b0a080] hover:border-pink-200"}`}>
                      <input type="radio" className="sr-only" value="bride" checked={newSide === "bride"} onChange={() => setNewSide("bride")} />
                      <Heart size={12} /> Bride
                    </label>
                    <label className={`flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs cursor-pointer transition ${newSide === "groom" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-[#e0d4b0] text-[#b0a080] hover:border-blue-200"}`}>
                      <input type="radio" className="sr-only" value="groom" checked={newSide === "groom"} onChange={() => setNewSide("groom")} />
                      <Crown size={12} /> Groom
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#b0a080]">Family Category</p>
                    <button type="button" onClick={() => setShowFamilyModal(true)} className="text-[10px] text-[#c9a84c] hover:underline">+ Manage</button>
                  </div>
                  <select value={newFamilyCategory} onChange={e => setNewFamilyCategory(e.target.value)}
                    className="w-full bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] text-[#3a3020]">
                    <option value="">None</option>
                    {familyCategories.filter(c => c.side === newSide).map(c => (
                      <option key={c._id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] text-[#3a3020]">
                  <option value="">Group (optional)</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Co-workers">Co-workers</option>
                  <option value="VIP">VIP</option>
                </select>

                <button type="submit" className="w-full bg-[#c9a84c] text-white py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold hover:bg-[#b8973b] transition shadow-sm flex items-center justify-center gap-2">
                  <Plus size={14} /> Create Invite Link
                </button>
              </form>
            </div>
          </div>

          {/* Guest List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-[#e8dfc0] shadow-sm overflow-hidden">
              <div className="flex border-b border-[#e8dfc0]">
                {(["all", "bride", "groom"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-xs uppercase tracking-widest font-medium transition flex items-center justify-center gap-1.5 ${activeTab === tab ? "border-b-2 border-[#c9a84c] text-[#7a6a4a] bg-[#fdf8ee]" : "text-[#b0a080] hover:text-[#7a6a4a]"}`}>
                    {tab === "bride" && <Heart size={11} className="text-pink-400" />}
                    {tab === "groom" && <Crown size={11} className="text-blue-400" />}
                    {tab === "all" ? "All Guests" : `${tab.charAt(0).toUpperCase() + tab.slice(1)}'s Side`}
                  </button>
                ))}
              </div>

              <div className="p-4 border-b border-[#f0e8d0] flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[160px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0a080]" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search guests..."
                    className="w-full pl-9 pr-3 py-2 bg-[#faf7f0] border border-[#e0d4b0] rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] text-[#3a3020]" />
                </div>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)}
                  className="bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] text-[#7a6a4a]">
                  <option value="all">All Status</option>
                  <option value="attending">Attending</option>
                  <option value="declined">Declined</option>
                  <option value="pending">Pending</option>
                </select>
                <select value={filterFamily} onChange={e => setFilterFamily(e.target.value)}
                  className="bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] text-[#7a6a4a]">
                  <option value="">All Families</option>
                  {familyCategories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                </select>
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                  className="bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] text-[#7a6a4a]">
                  <option value="">All Groups</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Co-workers">Co-workers</option>
                  <option value="VIP">VIP</option>
                </select>
                {(search || filterStatus !== "all" || filterFamily || filterCategory) && (
                  <button onClick={() => { setSearch(""); setFilterStatus("all"); setFilterFamily(""); setFilterCategory(""); }}
                    className="flex items-center gap-1 px-3 py-2 text-xs text-red-400 hover:bg-red-50 rounded-xl transition">
                    <X size={12} /> Clear
                  </button>
                )}
              </div>

              <div className="px-5 py-2 bg-[#fdf8ee] border-b border-[#f0e8d0]">
                <span className="text-[11px] text-[#b0a080]">Showing {filteredGuests.length} of {guests.length} guests</span>
              </div>

              <div className="p-4">
                <GuestTable guests={filteredGuests} loading={loading} onQR={setQrGuest} onCopyLink={copyToClipboard} onMarkInvited={(id) => console.log("mark invited", id)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}