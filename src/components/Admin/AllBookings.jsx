import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../API/axios';
import AdminLayout from "./layout/AdminLayout.jsx";

const AllBookings = () => {
  const Navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get('/Booking/AdminAll', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setBookings(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch admin bookings error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return bookings;
    return bookings.filter((b) => {
      return (
        b?.eventName?.toLowerCase().includes(q) ||
        b?.userName?.toLowerCase().includes(q) ||
        b?.organizerName?.toLowerCase().includes(q)
      );
    });
  }, [bookings, search]);

  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const totalTickets = bookings.reduce((sum, b) => sum + Number(b?.ticketCount || 0), 0);
    const totalRevenue = bookings.reduce((sum, b) => sum + Number(b?.totalAmount || 0), 0);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = bookings.filter((b) => {
      const d = b?.createdAt ? new Date(b.createdAt) : null;
      return d && d > oneWeekAgo;
    }).length;

    return { totalBookings, totalTickets, totalRevenue, newThisWeek };
  }, [bookings]);

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
    <AdminLayout
      title="All Bookings"
      subtitle="Monitor all bookings across events, organizers and users"
      actions={(
        <button
          onClick={() => Navigate("/admin")}
          className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      )}
    >
      <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative z-10 mt-2 p-3 rounded-xl">
          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalTickets}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h2m0 0a2 2 0 012-2h10a2 2 0 012 2m-14 0v10a2 2 0 002 2h10a2 2 0 002-2V7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3h2a1 1 0 012 0c0 .552-.448 1-1 1H9v2h2.5c1.933 0 3.5-1.343 3.5-3s-1.567-3-3.5-3zm0 9v-2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">New This Week</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.newThisWeek}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by event, user or organizer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 shadow-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={fetchAll}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
                {(search) && (
                  <button
                    onClick={() => setSearch("")}
                    className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold shadow-sm hover:shadow transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-8">
                <div className="animate-pulse">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 mb-4 py-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/60">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">Booking</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">Event</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">Payment</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">When</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/40">
                    {filtered.length > 0 ? (
                      filtered.map((b, idx) => (
                        <tr key={idx} className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200">
                          {/* Booking */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {b?.userName?.charAt(0)?.toUpperCase() || "B"}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  #{b?._id?.slice(-8) || "—"}
                                </div>
                                <div className="text-xs text-gray-500">Tickets: {b?.ticketCount || 0}</div>
                              </div>
                            </div>
                          </td>

                          {/* Event */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">{b?.eventName || "Unknown Event"}</div>
                            <div className="text-xs text-gray-600">
                              By {b?.organizerName || "Organizer"}
                            </div>
                          </td>

                          {/* Customer */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{b?.userName || "User"}</div>
                            <div className="text-xs text-gray-500">User ID: {b?.userId?.toString()?.slice(-8) || "—"}</div>
                          </td>

                          {/* Payment */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                              ₹{Number(b?.totalAmount || 0).toLocaleString()}
                            </span>
                          </td>

                          {/* When */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div>{b?.eventDate ? formatDate(b.eventDate) : "Unknown"}</div>
                            <div className="text-xs text-gray-500">{formatTime(b?.eventTime, b?.eventDate)}</div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-16 text-center">
                          <div className="text-gray-500">
                            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                              {search ? "No bookings match your search criteria." : "No bookings have been created yet."}
                            </p>
                            {search && (
                              <button
                                onClick={() => setSearch("")}
                                className="mt-3 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                              >
                                Clear search
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer summary */}
          {!loading && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600 gap-2">
              <div>
                Showing <span className="font-semibold">{filtered.length}</span> of{" "}
                <span className="font-semibold">{bookings.length}</span> bookings
              </div>
              {search && (
                <div className="text-blue-600">Filtered by: "{search}"</div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllBookings;

