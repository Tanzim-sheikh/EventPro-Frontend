import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";
import Header from "../Home/Header.jsx";
import Footer from "../Home/Footer.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const statusBadge = (status = "") => {
  const map = {
    upcoming: "bg-emerald-100 text-emerald-700",
    live: "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };
  const cls = map[status?.toLowerCase()] || "bg-amber-100 text-amber-700";
  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${cls}`}>{
      status || "-"
    }</span>
  );
};

const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
};

const formatTime = (t) => (t ? t : "-");

const OrganizerEvents = () => {
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);

  // No status filter

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");
        const endpoint = `/Event/OrganizerEvents`;
        const tryOnce = async (base) =>
          axios.get(`${base}${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });

        let res;
        try {
          res = await tryOnce(API_BASE);
        } catch (err1) {
          // If base is localhost:5000, try :8000 and vice-versa
          const altBase = (() => {
            try {
              const url = new URL(API_BASE);
              const port = url.port || (url.protocol === 'https:' ? '443' : '80');
              const newPort = port === '5000' ? '8000' : '5000';
              url.port = newPort;
              return url.toString().replace(/\/$/, "");
            } catch {
              return API_BASE;
            }
          })();
          try {
            res = await tryOnce(altBase);
            console.warn(`[OrganizerEvents] Primary API_BASE failed, used fallback: ${altBase}`);
          } catch (err2) {
            throw err1; // prefer original error
          }
        }

        if (!mounted) return;
        const list = res?.data?.data || [];
        setEvents(Array.isArray(list) ? list : []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || e?.message || "Failed to load events");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (token) fetchEvents();
    return () => {
      mounted = false;
    };
  }, [token]);

  const filtered = events.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Header />
      <div className="min-h-[70vh] bg-[#f7faf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#5a6b47] font-audiowide">
              Your Events
            </h1>
            <p className="text-[#5a6b47]/80">Manage and track all events you have created.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
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
        </div>

        {/* States */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white border border-[#e4e9e1] rounded-xl p-4">
                <div className="h-40 bg-[#eef3ea] rounded-lg mb-4" />
                <div className="h-5 bg-[#eef3ea] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#eef3ea] rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#e4e9e1] rounded-2xl">
            <div className="text-4xl mb-2">📭</div>
            <h3 className="text-lg font-semibold text-[#5a6b47]">No events found</h3>
            <p className="text-[#5a6b47]/80">Try adjusting filters or create a new event.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ev) => (
              <div
                key={ev._id}
                className="bg-white border border-[#e4e9e1] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
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
                  <div className="absolute top-3 left-3">{statusBadge(ev.status)}</div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#2f3a25] truncate" title={ev.eventName}>
                    {ev.eventName}
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-[#47533a]">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{formatDate(ev.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span>⏰</span>
                      <span>{formatTime(ev.time)}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <span>📍</span>
                      <span className="truncate" title={ev.city}>{ev.city || "-"}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-[#2f3a25] font-semibold">
                      {ev.price ? `₹ ${ev.price}` : "Free"}
                    </div>
                    {typeof ev.tickets !== "undefined" && (
                      <div className="text-xs text-[#5a6b47]">Tickets: {ev.tickets}</div>
                    )}
                  </div>

                  {ev.description && (
                    <p className="mt-3 text-sm text-[#5a6b47]/80 line-clamp-2">{ev.description}</p>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-[#A3B886] text-white rounded-lg py-2 text-sm hover:bg-[#7a8c5e] transition">
                      View
                    </button>
                    <button className="flex-1 border border-[#8C9F6E] text-[#A3B886] rounded-lg py-2 text-sm hover:bg-[#eef3ea] transition">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrganizerEvents;
