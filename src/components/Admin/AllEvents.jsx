import React, { useContext, useEffect, useMemo, useState } from "react";
import AdminLayout from "./layout/AdminLayout.jsx";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Badge = ({ text, tone = "default" }) => {
  const map = {
    default: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    gray: "bg-gray-100 text-gray-700",
    red: "bg-red-100 text-red-700",
    amber: "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${map[tone] || map.default}`}>
      {text}
    </span>
  );
};

const statusTone = (status = "") => {
  const s = status.toLowerCase();
  if (s === "upcoming") return "green";
  if (s === "live") return "blue";
  if (s === "completed") return "gray";
  if (s === "cancelled") return "red";
  return "amber";
};

const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return iso;
  }
};

const AllEvents = () => {
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError("");
        const endpoint = `/Event/AllEvents`;
        const tryOnce = async (base) =>
          axios.get(`${base}${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });

        let res;
        try {
          res = await tryOnce(API_BASE);
        } catch (err1) {
          const altBase = (() => {
            try {
              const url = new URL(API_BASE);
              const port = url.port || (url.protocol === 'https:' ? '443' : '80');
              const newPort = port === '8000' ? '5000' : '8000';
              url.port = newPort;
              return url.toString().replace(/\/$/, "");
            } catch {
              return API_BASE;
            }
          })();
          try {
            res = await tryOnce(altBase);
            console.warn(`[AllEvents] Primary API_BASE failed, used fallback: ${altBase}`);
          } catch (err2) {
            throw err1;
          }
        }
        if (!mounted) return;
        setEvents(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || e?.message || "Failed to load events");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (token) fetchAll();
    return () => {
      mounted = false;
    };
  }, [token]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter((ev) => {
        if (status !== "all" && ev?.status?.toLowerCase() !== status) return false;
        if (!q) return true;
        return (
          ev?.eventName?.toLowerCase().includes(q) ||
          ev?.organizerName?.toLowerCase().includes(q) ||
          ev?.city?.toLowerCase().includes(q) ||
          ev?.address?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [events, query, status]);

  return (
    <AdminLayout title="All Events" subtitle="Overview of every event, across all organizers.">
      {/* Filters/Search */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-end gap-3 mb-6">
        <div className="relative flex-1 sm:w-72">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by event, organizer, city..."
            className="w-full rounded-lg border border-[#dbe4d3] bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E]"
          />
          <span className="pointer-events-none absolute right-3 top-2.5 text-[#5a6b47]/60">🔍</span>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-[#dbe4d3] bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E]"
        >
          <option value="all">All statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

          {/* Loading */}
      {loading && (
        <div className="space-y-3">
          <div className="h-10 w-52 bg-[#eef3ea] rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white border border-[#e4e9e1] rounded-xl p-4">
                <div className="h-40 bg-[#eef3ea] rounded-lg mb-4" />
                <div className="h-5 bg-[#eef3ea] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#eef3ea] rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4">{error}</div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-16 bg-white border border-[#e4e9e1] rounded-2xl">
          <p className="text-[#5a6b47]/80">Try adjusting filters.</p>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ev) => (
            <div key={ev._id} className="bg-white border border-[#e4e9e1] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-44 bg-[#eef3ea]">
                {ev?.eventPhoto ? (
                  <img
                    src={ev.eventPhoto?.url || ev.eventPhoto}
                    alt={ev.eventName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🎫</div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge text={ev.status || "-"} tone={statusTone(ev.status)} />
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[#2f3a25] truncate" title={ev.eventName}>{ev.eventName}</h3>
                  <Badge text={`₹ ${ev.price ?? 0}`} />
                </div>
                <div className="text-sm text-[#47533a]">By <span className="font-medium">{ev.organizerName || "Unknown"} {ev.organizerSurname || ""}</span></div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-[#47533a]">
                  <div className="flex items-center gap-2"><span>📅</span><span>{formatDate(ev.date)}</span></div>
                  <div className="flex items-center gap-2 justify-end"><span>⏰</span><span>{ev.time || "-"}</span></div>
                  <div className="col-span-2 flex items-center gap-2"><span>📍</span><span className="truncate" title={ev.address}>{ev.city || "-"} • {ev.address || "-"}</span></div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-[#47533a]">
                  <div>Tickets: <span className="font-medium">{ev.tickets ?? "-"}</span></div>
                  <div>ID: <span className="font-mono">{ev._id?.slice(-6)}</span></div>
                </div>

                {ev.description && (
                  <p className="mt-2 text-sm text-[#5a6b47]/80 line-clamp-2">{ev.description}</p>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="rounded-lg py-2 text-sm bg-[#A3B886] text-white hover:bg-[#7a8c5e] transition">View</button>
                  <button className="rounded-lg py-2 text-sm border border-[#8C9F6E] text-[#A3B886] hover:bg-[#eef3ea] transition">Manage</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AllEvents;
