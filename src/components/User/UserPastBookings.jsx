import React, { useEffect, useMemo, useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import axiosInstance from "../../API/axios";
import { Calendar, Clock, MapPin, User, Ticket, History } from "lucide-react";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-[#f3f4f6]" />
    <div className="p-6">
      <div className="h-4 w-3/4 bg-[#f3f4f6] rounded mb-2" />
      <div className="h-3 w-1/2 bg-[#f3f4f6] rounded mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#f3f4f6] rounded" />
        <div className="h-3 w-2/3 bg-[#f3f4f6] rounded" />
      </div>
    </div>
  </div>
);

const UserPastBookings = () => {
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
        const res = await axiosInstance.get('/Booking/UserAllBookings', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res?.data?.success) {
          setBookings(Array.isArray(res.data.data) ? res.data.data : []);
        } else {
          setError(res?.data?.message || "Failed to load past bookings");
        }
      } catch (e) {
        console.error(e);
        setError(e?.response?.data?.message || e?.message || "Failed to load past bookings");
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
        const requests = ids.map(id => 
          axiosInstance.get(`/Event/EventById/${id}`, { headers })
            .then(r => ({ id, ok: r?.data?.success, data: r?.data?.data, msg: r?.data?.message }))
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

  const filtered = useMemo(() => {
    // Filter for only completed events
    let list = [...bookings].filter(booking => {
      const event = eventsById[booking?.eventId];
      return event && event.status === 'completed';
    });

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((b) =>
        (b?.eventName || "").toLowerCase().includes(q) ||
        (b?.organizerName || "").toLowerCase().includes(q)
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
  }, [bookings, eventsById, query, dateFilter, sortKey]);

  const formatDate = (d) => {
    if (!d) return "-";
    try { return new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }); } 
    catch { return String(d); }
  };

  const formatTime = (t, d) => {
    if (t) return t;
    if (d) try { return new Date(d).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", hour12:true }); } catch {}
    return "-";
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
              <History className="w-8 h-8 text-gray-600" />
              Past Bookings
            </h1>
            <p className="text-gray-600 text-sm">Your completed event history</p>
          </div>
          <div className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            {filtered.length} Past Events
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <input
                type="text"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search by event or organizer"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div>
              <input
                type="date"
                value={dateFilter}
                onChange={(e)=>setDateFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div>
              <select
                value={sortKey}
                onChange={(e)=>setSortKey(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="date_desc">Newest first</option>
                <option value="date_asc">Oldest first</option>
                <option value="amount_desc">Amount high to low</option>
                <option value="amount_asc">Amount low to high</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_,i)=>(<SkeletonCard key={i} />))}
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Past Bookings</h3>
            <p>You don't have any completed events in your history yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b) => (
              <div key={b?._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                <div className="relative">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {eventsById[b.eventId]?.eventImages?.[0] ? (
                      <img 
                        src={eventsById[b.eventId].eventImages[0]} 
                        alt={b.eventName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Ticket className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Completed
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 h-14">
                    {b.eventName || 'Event Name'}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{b.organizerName || 'Organizer'}</span>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Event Date</p>
                        <p className="text-sm font-medium">{formatDate(b.eventDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="text-sm font-medium">{formatTime(b.eventTime, b.eventDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-sm font-medium">{b.eventLocation || 'Online'}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 mt-3 border-t border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Paid</p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{Number(b.totalAmount || 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Tickets</p>
                        <p className="text-sm font-medium">{b.ticketCount || 1} {b.ticketCount === 1 ? 'ticket' : 'tickets'}</p>
                      </div>
                    </div>
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

export default UserPastBookings;