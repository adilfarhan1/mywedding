"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Clock, Link as LinkIcon, Download } from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // New guest form
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestCategory, setNewGuestCategory] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "wedding" && password === "wed123") {
      setIsAuthenticated(true);
      fetchGuests();
    } else {
      alert("Invalid credentials");
    }
  };

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

  const generateInviteLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;

    try {
      const res = await fetch("/api/admin/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newGuestName, category: newGuestCategory }),
      });
      if (res.ok) {
        setNewGuestName("");
        setNewGuestCategory("");
        fetchGuests();
      } else {
        alert("Failed to generate link");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (slug: string) => {
    const url = `${window.location.origin}/invite/${slug}`;
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  const downloadCSV = () => {
    const headers = ["Name", "Category", "Attending", "Members", "Link"];
    const csvContent = [
      headers.join(","),
      ...guests.map(g => [
        `"${g.name}"`,
        `"${g.category || ''}"`,
        g.attending === true ? "Yes" : g.attending === false ? "No" : "Pending",
        g.members,
        g.slug ? `${window.location.origin}/invite/${g.slug}` : ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "wedding_attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111] p-4 text-white">
        <form onSubmit={handleLogin} className="glass p-8 rounded-2xl w-full max-w-md border border-[var(--color-gold)]/30">
          <h1 className="font-serif text-3xl text-[var(--color-gold)] mb-6 text-center">Admin Access</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
          />
          <button type="submit" className="w-full bg-[var(--color-gold)] text-black py-3 rounded-xl font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
            Login
          </button>
        </form>
      </div>
    );
  }

  const totalInvited = guests.length;
  const totalConfirmed = guests.filter(g => g.attending === true).length;
  const totalDeclined = guests.filter(g => g.attending === false).length;
  const totalPending = totalInvited - totalConfirmed - totalDeclined;
  const totalHeads = guests.reduce((acc, g) => acc + (g.attending === true ? (g.members || 0) : 0), 0);

  return (
    <div className="min-h-screen bg-[#111] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-2">Attendance Dashboard</h1>
            <p className="text-white/60 text-sm tracking-widest uppercase">Real-time RSVP Tracking</p>
          </div>
          <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 border border-[var(--color-gold)]/50 text-[var(--color-gold)] rounded-lg hover:bg-[var(--color-gold)] hover:text-black transition-all">
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Invites", value: totalInvited, icon: Users, color: "text-blue-400" },
            { label: "Confirmed", value: totalConfirmed, icon: UserCheck, color: "text-green-400" },
            { label: "Declined", value: totalDeclined, icon: UserX, color: "text-red-400" },
            { label: "Pending", value: totalPending, icon: Clock, color: "text-orange-400" },
            { label: "Total Heads", value: totalHeads, icon: Users, color: "text-[var(--color-gold)]" },
          ].map((stat, i) => (
            <div key={i} className="glass p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={16} className={stat.color} />
                <span className="text-xs text-white/60 tracking-wider uppercase">{stat.label}</span>
              </div>
              <span className="font-serif text-2xl">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Generate Link Form */}
          <div className="glass p-6 rounded-xl border border-[var(--color-gold)]/20 h-fit">
            <h2 className="font-serif text-xl text-[var(--color-gold)] mb-4">Generate Invite Link</h2>
            <form onSubmit={generateInviteLink} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Family / Guest Name"
                value={newGuestName}
                onChange={e => setNewGuestName(e.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-gold)]"
              />
              <select
                value={newGuestCategory}
                onChange={e => setNewGuestCategory(e.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-gold)]"
              >
                <option value="">Select Category</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Co-workers">Co-workers</option>
              </select>
              <button type="submit" className="bg-[var(--color-gold)] text-black py-2 rounded-lg font-bold tracking-wider uppercase text-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all">
                Create Personalized Link
              </button>
            </form>
          </div>

          {/* Guest List */}
          <div className="md:col-span-2 glass p-6 rounded-xl border border-white/10 overflow-hidden flex flex-col">
            <h2 className="font-serif text-xl text-[var(--color-gold)] mb-4">Guest List</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 tracking-wider uppercase text-xs">
                    <th className="pb-3 font-normal">Name</th>
                    <th className="pb-3 font-normal">Category</th>
                    <th className="pb-3 font-normal">Status</th>
                    <th className="pb-3 font-normal">Members</th>
                    <th className="pb-3 font-normal text-right">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={5} className="py-4 text-center text-white/50">Loading...</td></tr>
                  ) : guests.length === 0 ? (
                    <tr><td colSpan={5} className="py-4 text-center text-white/50">No guests found.</td></tr>
                  ) : (
                    guests.map((guest, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-3">{guest.name}</td>
                        <td className="py-3 text-white/60">{guest.category || '-'}</td>
                        <td className="py-3">
                          {guest.attending === true ? (
                            <span className="text-green-400">Attending</span>
                          ) : guest.attending === false ? (
                            <span className="text-red-400">Declined</span>
                          ) : (
                            <span className="text-orange-400">Pending</span>
                          )}
                        </td>
                        <td className="py-3">{guest.members || '-'}</td>
                        <td className="py-3 text-right">
                          {guest.slug && (
                            <button onClick={() => copyToClipboard(guest.slug)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[var(--color-gold)]" title="Copy Link">
                              <LinkIcon size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
