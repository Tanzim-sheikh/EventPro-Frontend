import React, { useEffect, useMemo, useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import axios from "axios";
import { axios_url } from "../../API/axios";

const SkeletonCard = () => (
  <div className="rounded-2xl border border-[#a8b892] bg-white p-5 animate-pulse">
    <div className="h-4 w-24 bg-[#e2ead5] rounded" />
    <div className="mt-2 h-6 w-2/3 bg-[#e2ead5] rounded" />
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="h-4 w-full bg-[#e2ead5] rounded" />
      <div className="h-4 w-full bg-[#e2ead5] rounded" />
    </div>
  </div>
);

const UserEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [eventsById, setEventsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortKey, setSortKey] = useState("date_desc");

  // 1) Fetch user's bookings to get eventIds
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const res = await axios.get(`${axios_url}/Booking/UserAllBookings`, {
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

  // 2) After bookings loaded, fetch each event detail (unique eventIds)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const ids = [...new Set((bookings || []).map(b => b?.eventId).filter(Boolean))];
        if (ids.length === 0) return;
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const requests = ids.map(id => axios.get(`${axios_url}/Event/EventById/${id}`, { headers }).then(r => ({ id, ok: r?.data?.success, data: r?.data?.data, msg: r?.data?.message }))
          .catch(err => ({ id, ok: false, data: null, msg: err?.response?.data?.message || err?.message }))
        );
        const results = await Promise.all(requests);
        const map = {};
        results.forEach(r => { if (r.ok && r.data) map[r.id] = r.data; });
        setEventsById(prev => ({ ...prev, ...map }));
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvents();
  }, [bookings]);

  // Build event list from bookings using fetched event details
  const eventsList = useMemo(() => {
    const ids = [...new Set((bookings || []).map(b => b?.eventId).filter(Boolean))];
    return ids.map(id => eventsById[id]).filter(Boolean);
  }, [bookings, eventsById]);

  // Map eventId -> booking info (organizerName/organizerNumber)
  const bookingByEventId = useMemo(() => {
    const m = {};
    (bookings || []).forEach(b => {
      if (b?.eventId && !m[b.eventId]) {
        m[b.eventId] = {
          organizerName: b?.organizerName,
          organizerNumber: b?.organizerNumber,
        };
      }
    });
    return m;
  }, [bookings]);

  const filtered = useMemo(() => {
    let list = [...eventsList];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((e) =>
        (e?.eventName || "").toLowerCase().includes(q) ||
        (e?.organizerName || "").toLowerCase().includes(q) ||
        (e?.city || "").toLowerCase().includes(q)
      );
    }
    if (dateFilter) {
      const onlyDate = (d) => {
        try { return new Date(d).toISOString().slice(0,10); } catch { return ""; }
      };
      list = list.filter((e) => onlyDate(e?.date) === dateFilter);
    }
    switch (sortKey) {
      case "date_asc":
        list.sort((a,b)=> new Date(a?.date||0) - new Date(b?.date||0));
        break;
      case "date_desc":
        list.sort((a,b)=> new Date(b?.date||0) - new Date(a?.date||0));
        break;
      default:
        break;
    }
    return list;
  }, [eventsList, query, dateFilter, sortKey]);

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
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#2f3a25]">My Events</h1>
            <p className="text-[#405036] text-sm">Events you have booked</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#a8b892] bg-white p-4 md:p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <input
                type="text"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search by event, organizer or city"
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_,i)=>(<SkeletonCard key={i} />))}
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#a8b892] bg-white p-8 text-center text-[#405036]">
            You haven't booked any events yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((e) => (
              <div key={e?._id} className="rounded-2xl border border-[#a8b892] bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="relative min-h-[160px] bg-[#f3f7ef] rounded-xl overflow-hidden">
                  {(() => {
                    const photo = e?.eventPhoto;
                    const photoUrl = typeof photo === 'string' ? photo : (photo?.url || "");
                    return photoUrl ? (
                      <img src={photoUrl} alt={e?.eventName || "Event"} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-[#6a7b58]">No Image</div>
                    );
                  })()}
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#2f3a25] line-clamp-2">{e?.eventName || "-"}</h3>
                <p className="text-sm text-[#405036] line-clamp-2">{e?.description || 'No description available.'}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-[#405036]">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Date</div>
                    <div className="font-semibold text-[#2f3a25]">{e?.date ? new Date(e.date).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }) : '-'}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Time</div>
                    <div className="font-semibold text-[#2f3a25]">{e?.time || '-'}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Organizer</div>
                    <div className="font-semibold text-[#2f3a25]">{e?.organizerName || bookingByEventId[e?._id]?.organizerName || '-'}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Organizer Mobile</div>
                    <div className="font-semibold text-[#2f3a25]">{bookingByEventId[e?._id]?.organizerNumber || '-'}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Category</div>
                    <div className="font-semibold text-[#2f3a25]">{e?.category || '-'}</div>
                  </div>
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
export default UserEvents;