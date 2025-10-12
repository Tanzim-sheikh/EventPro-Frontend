import React, { useEffect, useState, useContext, useMemo } from "react";
import Header from "../Home/Header.jsx";
import Footer from "../Home/Footer.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import axiosInstance from "../../API/axios";
import axios from "axios";

const API_BASE = 'http://localhost:5000';

const currency = (n) => `₹${Number(n || 0).toLocaleString()}`;
const fmtDate = (d) => {
  if (!d) return "-";
  try { return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" }); } catch { return String(d); }
};

export default function OrganizerPastEvents() {
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPast = async () => {
    try {
      setLoading(true);
      setError("");
      const endpoint = `/Event/OrganizerPastEvents`;
      const headers = { Authorization: `Bearer ${token}` };

      const tryOnce = async (base) => axios.get(`${base}${endpoint}`, { headers });
      let res;
      try {
        res = await tryOnce(API_BASE);
      } catch (err1) {
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
        res = await tryOnce(altBase);
        console.warn(`[OrganizerPastEvents] Primary API_BASE failed, used fallback: ${altBase}`);
      }

      const list = res?.data?.data || [];
      setEvents(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to fetch past events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPast();
  }, [token]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return events;
    return events.filter((ev) => (
      ev?.eventName?.toLowerCase().includes(q) ||
      ev?.city?.toLowerCase().includes(q) ||
      ev?.description?.toLowerCase().includes(q)
    ));
  }, [events, search]);

  const totals = useMemo(() => {
    const tickets = filtered.reduce((s, e) => s + Number(e.ticketsSold || 0), 0);
    const revenue = filtered.reduce((s, e) => s + Number(e.revenue || 0), 0);
    return { tickets, revenue };
  }, [filtered]);

  return (
    <>
      <Header />
      <div className="min-h-[70vh] bg-[#f7faf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#5a6b47] font-audiowide">Past Events</h1>
              <p className="text-[#5a6b47]/80">Completed events with tickets sold and revenue summary.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg border border-[#dbe4d3] bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E]"
                placeholder="Search by event, city, description"
              />
              <button onClick={fetchPast} className="rounded-lg bg-[#A3B886] text-white px-4 py-2.5 hover:bg-[#7a8c5e]">Refresh</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-[#e4e9e1] rounded-xl p-4">
              <div className="text-sm text-[#5a6b47]/80">Total Tickets Sold</div>
              <div className="text-2xl font-bold text-[#2f3a25]">{totals.tickets}</div>
            </div>
            <div className="bg-white border border-[#e4e9e1] rounded-xl p-4">
              <div className="text-sm text-[#5a6b47]/80">Total Revenue</div>
              <div className="text-2xl font-bold text-[#2f3a25]">{currency(totals.revenue)}</div>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-[#e4e9e1] rounded-xl p-4">
                  <div className="h-40 bg-[#eef3ea] rounded-lg mb-4" />
                  <div className="h-5 bg-[#eef3ea] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#eef3ea] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#e4e9e1] rounded-2xl">
              <div className="text-4xl mb-2">📭</div>
              <h3 className="text-lg font-semibold text-[#5a6b47]">No past events</h3>
              <p className="text-[#5a6b47]/80">Completed events will appear here with sales summary.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((ev) => (
                <div key={ev._id} className="bg-white border border-[#e4e9e1] rounded-2xl overflow-hidden shadow-sm">
                  <div className="relative h-44 bg-[#eef3ea]">
                    {ev?.eventPhoto ? (
                      <img src={ev.eventPhoto?.url || ev.eventPhoto} alt={ev.eventName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🎫</div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-100 text-gray-700">Completed</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#2f3a25] truncate" title={ev.eventName}>{ev.eventName}</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-[#47533a]">
                      <div className="flex items-center gap-2"><span>📅</span><span>{fmtDate(ev.date)}</span></div>
                      <div className="flex items-center gap-2 justify-end"><span>📍</span><span className="truncate" title={ev.city}>{ev.city || "-"}</span></div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="bg-[#f6faf2] border border-[#e4e9e1] rounded-lg p-3 text-sm">
                        <div className="text-[#5a6b47]/80">Tickets Sold</div>
                        <div className="text-[#2f3a25] font-semibold">{ev.ticketsSold || 0}</div>
                      </div>
                      <div className="bg-[#f6faf2] border border-[#e4e9e1] rounded-lg p-3 text-sm">
                        <div className="text-[#5a6b47]/80">Revenue</div>
                        <div className="text-[#2f3a25] font-semibold">{currency(ev.revenue)}</div>
                      </div>
                    </div>
                    {ev.description && (
                      <p className="mt-3 text-sm text-[#5a6b47]/80 line-clamp-2">{ev.description}</p>
                    )}
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
}
