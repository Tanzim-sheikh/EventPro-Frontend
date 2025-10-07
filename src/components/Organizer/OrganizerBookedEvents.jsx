import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axios_url } from "../../API/axios";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const SkeletonCard = () => (
  <div className="rounded-2xl border border-[#a8b892] bg-white p-5 animate-pulse">
    <div className="h-4 w-24 bg-[#e2ead5] rounded" />
    <div className="mt-2 h-6 w-2/3 bg-[#e2ead5] rounded" />
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="h-4 w-full bg-[#e2ead5] rounded" />
      <div className="h-4 w-full bg-[#e2ead5] rounded" />
    </div>
    <div className="mt-3 grid grid-cols-3 gap-3">
      <div className="h-4 w-full bg-[#e2ead5] rounded" />
      <div className="h-4 w-full bg-[#e2ead5] rounded" />
      <div className="h-4 w-full bg-[#e2ead5] rounded" />
    </div>
    <div className="mt-5 h-9 w-28 bg-[#e2ead5] rounded" />
  </div>
);

const OrganizerBookedEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortKey, setSortKey] = useState("date_desc");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const res = await axios.get(`${axios_url}/Booking/OrganizerBookings`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res?.data?.success) {
          setBookings(Array.isArray(res.data.data) ? res.data.data : []);
        } else {
          setError(res?.data?.message || "Failed to load bookings");
        }
      } catch (e) {
        console.error(e);
        setError(e?.response?.data?.message || e?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filtered = useMemo(() => {
    let list = [...bookings];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((b) =>
        (b?.eventName || "").toLowerCase().includes(q) ||
        (b?.userName || "").toLowerCase().includes(q)
      );
    }
    if (dateFilter) {
      const onlyDate = (d) => {
        try { return new Date(d).toISOString().slice(0,10); } catch { return ""; }
      };
      list = list.filter((b) => onlyDate(b?.eventDate) === dateFilter);
    }
    switch (sortKey) {
      case "date_asc":
        list.sort((a,b)=> new Date(a?.eventDate||0) - new Date(b?.eventDate||0));
        break;
      case "date_desc":
        list.sort((a,b)=> new Date(b?.eventDate||0) - new Date(a?.eventDate||0));
        break;
      case "amount_desc":
        list.sort((a,b)=> (Number(b?.totalAmount)||0) - (Number(a?.totalAmount)||0));
        break;
      case "amount_asc":
        list.sort((a,b)=> (Number(a?.totalAmount)||0) - (Number(b?.totalAmount)||0));
        break;
      default:
        break;
    }
    return list;
  }, [bookings, query, dateFilter, sortKey]);

  const formatDate = (d) => {
    if (!d) return "-";
    try { return new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }); } catch { return String(d); }
  };
  const formatTime = (t, d) => {
    if (t) return t;
    if (d) try { return new Date(d).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", hour12:true }); } catch {}
    return "-";
  };

  return (
    <div className="min-h-screen bg-[#e2ead5]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#2f3a25]">Bookings</h1>
            <p className="text-[#405036] text-sm">All tickets booked for your events</p>
          </div>
        </div>

        {/* Controls */}
        <div className="rounded-2xl border border-[#a8b892] bg-white p-4 md:p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <input
                type="text"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search by event or user"
                className="w-full rounded-lg border border-[#a8b892] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A3B886]"
              />
            </div>
            <div>
              <input
                type="date"
                value={dateFilter}
                onChange={(e)=>setDateFilter(e.target.value)}
                className="w-full rounded-lg border border-[#a8b892] px-3 py-2 text-sm text-[#2f3a25] focus:outline-none focus:ring-2 focus:ring-[#A3B886]"
              />
            </div>
            <div>
              <select
                value={sortKey}
                onChange={(e)=>setSortKey(e.target.value)}
                className="w-full rounded-lg border border-[#a8b892] px-3 py-2 text-sm bg-white text-[#2f3a25] focus:outline-none focus:ring-2 focus:ring-[#A3B886]"
              >
                <option value="date_desc">Newest date</option>
                <option value="date_asc">Oldest date</option>
                <option value="amount_desc">Amount high to low</option>
                <option value="amount_asc">Amount low to high</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_,i)=>(<SkeletonCard key={i} />))}
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#a8b892] bg-white p-8 text-center text-[#405036]">
            No bookings found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((b) => (
              <div key={b?._id} className="rounded-2xl border border-[#a8b892] bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs rounded-full bg-[#eaf2e0] text-[#2f3a25]">{b?.ticketCount || 0} Tickets</span>
                  <span className="text-sm font-semibold text-[#2f3a25]">₹ {Number(b?.totalAmount||0)}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-[#2f3a25] line-clamp-2">{b?.eventName || "-"}</h3>
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm text-[#405036]">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Date</div>
                    <div className="font-semibold text-[#2f3a25]">{formatDate(b?.eventDate)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Time</div>
                    <div className="font-semibold text-[#2f3a25]">{formatTime(b?.eventTime, b?.eventDate)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Booked By</div>
                    <div className="font-semibold text-[#2f3a25]">{b?.userName || '-'}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Organizer</div>
                    <div className="font-semibold text-[#2f3a25]">{b?.organizerName || '-'}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-[#6a7b58]">#{String(b?._id || '').slice(-8)}</div>
                  <button
                    type="button"
                    className="rounded-lg bg-[#A3B886] hover:bg-[#6e8151] text-white text-sm font-semibold px-3 py-2"
                    onClick={() => {
                      // reserved for future: open booking details modal
                    }}
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrganizerBookedEvents;
