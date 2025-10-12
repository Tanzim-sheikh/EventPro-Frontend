import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../API/axios";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { Calendar, Clock, User, Ticket } from "lucide-react";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-[#e2ead5]" />
    <div className="p-6">
      <div className="h-4 w-3/4 bg-[#e2ead5] rounded mb-2" />
      <div className="h-3 w-1/2 bg-[#e2ead5] rounded mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#e2ead5] rounded" />
        <div className="h-3 w-2/3 bg-[#e2ead5] rounded" />
      </div>
    </div>
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
        const res = await axiosInstance.get('/Booking/OrganizerBookings', {
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
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#2f3a25] flex items-center gap-2">
              <Ticket className="w-8 h-8 text-[#A3B886]" />
              Bookings
            </h1>
            <p className="text-[#405036] text-sm">All tickets booked for your events</p>
          </div>
          <div className="bg-[#A3B886] text-white px-4 py-2 rounded-full text-sm font-medium">
            {filtered.length} Bookings
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_,i)=>(<SkeletonCard key={i} />))}
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#a8b892] bg-white p-8 text-center text-[#405036]">
            <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Bookings Found</h3>
            <p>No users have booked your events yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b) => (
              <div key={b?._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Ticket Header */}
                <div className="bg-gradient-to-r from-[#A3B886] to-[#8a9b6e] p-4 text-white relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-5 h-5" />
                      <span className="text-sm font-medium">EVENT TICKET</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-90">Booking Ref</div>
                      <div className="text-sm font-bold">#{String(b?._id||'').slice(-8)}</div>
                    </div>
                  </div>
                  {/* Ticket Perforation */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-center">
                    <div className="w-8 h-2 bg-white rounded-full opacity-20"></div>
                  </div>
                </div>

                {/* Event Image Placeholder */}
                <div className="h-32 bg-gradient-to-br from-[#f3f7ef] to-[#e2ead5] flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-[#6a7b58]" />
                </div>

                {/* Ticket Content */}
                <div className="p-6">
                  {/* Event Name */}
                  <h3 className="text-xl font-bold text-[#2f3a25] mb-2 line-clamp-2">
                    {b?.eventName || "Event Name"}
                  </h3>

                  {/* Ticket Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-[#6a7b58] flex-shrink-0" />
                      <div>
                        <div className="text-[#6a7b58] text-xs uppercase tracking-wide">Event Date</div>
                        <div className="font-semibold text-[#2f3a25]">{formatDate(b?.eventDate)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-[#6a7b58] flex-shrink-0" />
                      <div>
                        <div className="text-[#6a7b58] text-xs uppercase tracking-wide">Event Time</div>
                        <div className="font-semibold text-[#2f3a25]">{formatTime(b?.eventTime, b?.eventDate)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-[#6a7b58] flex-shrink-0" />
                      <div>
                        <div className="text-[#6a7b58] text-xs uppercase tracking-wide">Booked By</div>
                        <div className="font-semibold text-[#2f3a25]">{b?.userName || 'User'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Info Section */}
                  <div className="border-t border-[#e2ead5] pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-center">
                        <div className="text-[#6a7b58] text-xs uppercase tracking-wide">Tickets</div>
                        <div className="text-lg font-bold text-[#2f3a25]">{b?.ticketCount || 0}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#6a7b58] text-xs uppercase tracking-wide">Total Amount</div>
                        <div className="text-lg font-bold text-[#A3B886]">₹{Number(b?.totalAmount||0)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Bottom Border */}
                <div className="h-1 bg-gradient-to-r from-[#A3B886] to-[#8a9b6e]"></div>
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
