// import React, { useContext, useEffect, useMemo, useState } from "react";
// import AdminLayout from "./layout/AdminLayout.jsx";
// import axios from "axios";
// import AuthContext from "../../context/AuthContext.jsx";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// const Badge = ({ text, tone = "default" }) => {
//   const map = {
//     default: "bg-slate-100 text-slate-700",
//     green: "bg-emerald-100 text-emerald-700",
//     blue: "bg-blue-100 text-blue-700",
//     gray: "bg-gray-100 text-gray-700",
//     red: "bg-red-100 text-red-700",
//     amber: "bg-amber-100 text-amber-700",
//   };
//   return (
//     <span className={`px-2 py-1 text-xs rounded-full font-medium ${map[tone] || map.default}`}>
//       {text}
//     </span>
//   );
// };

// const statusTone = (status = "") => {
//   const s = status.toLowerCase();
//   if (s === "upcoming") return "green";
//   if (s === "live") return "blue";
//   if (s === "completed") return "gray";
//   if (s === "cancelled") return "red";
//   return "amber";
// };

// const formatDate = (iso) => {
//   if (!iso) return "-";
//   try {
//     return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
//   } catch {
//     return iso;
//   }
// };

// const AllEvents = () => {
//   const { token: ctxToken } = useContext(AuthContext) || {};
//   const token = ctxToken || localStorage.getItem("token");

//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("all");
//   const [editing, setEditing] = useState(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     let mounted = true;
//     const fetchAll = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const endpoint = `/Event/AllEvents`;
//         const tryOnce = async (base) =>
//           axios.get(`${base}${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });

//         let res;
//         try {
//           res = await tryOnce(API_BASE);
//         } catch (err1) {
//           const altBase = (() => {
//             try {
//               const url = new URL(API_BASE);
//               const port = url.port || (url.protocol === 'https:' ? '443' : '80');
//               const newPort = port === '8000' ? '5000' : '8000';
//               url.port = newPort;
//               return url.toString().replace(/\/$/, "");
//             } catch {
//               return API_BASE;
//             }
//           })();
//           try {
//             res = await tryOnce(altBase);
//             console.warn(`[AllEvents] Primary API_BASE failed, used fallback: ${altBase}`);
//           } catch (err2) {
//             throw err1;
//           }
//         }
//         if (!mounted) return;
//         setEvents(Array.isArray(res?.data?.data) ? res.data.data : []);
//       } catch (e) {
//         if (!mounted) return;
//         setError(e?.response?.data?.message || e?.message || "Failed to load events");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };
//     if (token) fetchAll();
//     return () => {
//       mounted = false;
//     };
//   }, [token]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return events
//       .filter((ev) => {
//         if (status !== "all" && ev?.status?.toLowerCase() !== status) return false;
//         if (!q) return true;
//         return (
//           ev?.eventName?.toLowerCase().includes(q) ||
//           ev?.organizerName?.toLowerCase().includes(q) ||
//           ev?.city?.toLowerCase().includes(q) ||
//           ev?.address?.toLowerCase().includes(q)
//         );
//       })
//       .sort((a, b) => new Date(b.date) - new Date(a.date));
//   }, [events, query, status]);

//   const refresh = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/Event/AllEvents`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEvents(Array.isArray(res?.data?.data) ? res.data.data : []);
//     } catch (e) {
//       setError(e?.response?.data?.message || e?.message || "Failed to refresh events");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startEdit = (ev) => setEditing({ ...ev });
//   const closeEdit = () => setEditing(null);
//   const onEditChange = (k, v) => setEditing((p) => ({ ...p, [k]: v }));
//   const saveEdit = async () => {
//     if (!editing?._id) return;
//     const payload = {
//       eventName: editing.eventName,
//       date: editing.date,
//       time: editing.time,
//       city: editing.city,
//       address: editing.address,
//       tickets: editing.tickets,
//       price: editing.price,
//       description: editing.description,
//       status: editing.status,
//     };
//     try {
//       setSaving(true);
//       const res = await axios.patch(`${API_BASE}/Event/UpdateEvent/${editing._id}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const updated = res?.data?.data;
//       if (updated?._id) {
//         setEvents((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
//         closeEdit();
//       } else {
//         await refresh();
//         closeEdit();
//       }
//     } catch (e) {
//       alert(e?.response?.data?.message || e?.message || "Failed to update event");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const onDelete = async (id) => {
//     if (!id) return;
//     if (!confirm("Delete this event?")) return;
//     try {
//       await axios.delete(`${API_BASE}/Event/DeleteEvent/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEvents((prev) => prev.filter((e) => e._id !== id));
//     } catch (e) {
//       alert(e?.response?.data?.message || e?.message || "Failed to delete event");
//     }
//   };

//   return (
//     <>
//     <AdminLayout title="All Events" subtitle="Overview of every event, across all organizers.">
//       {/* Filters/Search */}
//       <div className="flex flex-col md:flex-row md:items-end md:justify-end gap-3 mb-6">
//         <div className="relative flex-1 sm:w-72">
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search by event, organizer, city..."
//             className="w-full rounded-lg border border-[#dbe4d3] bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E]"
//           />
//           <span className="pointer-events-none absolute right-3 top-2.5 text-[#5a6b47]/60">🔍</span>
//         </div>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="rounded-lg border border-[#dbe4d3] bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E]"
//         >
//           <option value="all">All statuses</option>
//           <option value="upcoming">Upcoming</option>
//           <option value="live">Live</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//           {/* Loading */}
//       {loading && (
//         <div className="space-y-3">
//           <div className="h-10 w-52 bg-[#eef3ea] rounded animate-pulse" />
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="animate-pulse bg-white border border-[#e4e9e1] rounded-xl p-4">
//                 <div className="h-40 bg-[#eef3ea] rounded-lg mb-4" />
//                 <div className="h-5 bg-[#eef3ea] rounded w-3/4 mb-2" />
//                 <div className="h-4 bg-[#eef3ea] rounded w-1/2" />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Error */}
//       {!loading && error && (
//         <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4">{error}</div>
//       )}

//       {/* Empty */}
//       {!loading && !error && filtered.length === 0 && (
//         <div className="text-center py-16 bg-white border border-[#e4e9e1] rounded-2xl">
//           <p className="text-[#5a6b47]/80">Try adjusting filters.</p>
//         </div>
//       )}

//       {/* Cards */}
//       {!loading && !error && filtered.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((ev) => (
//             <div key={ev._id} className="bg-white border border-[#e4e9e1] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
//               <div className="relative h-44 bg-[#eef3ea]">
//                 {ev?.eventPhoto ? (
//                   <img
//                     src={ev.eventPhoto?.url || ev.eventPhoto}
//                     alt={ev.eventName}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-4xl">🎫</div>
//                 )}
//                 <div className="absolute top-3 left-3">
//                   <Badge text={ev.status || "-"} tone={statusTone(ev.status)} />
//                 </div>
//               </div>

//               <div className="p-4 space-y-2">
//                 <div className="flex items-start justify-between gap-2">
//                   <h3 className="text-lg font-semibold text-[#2f3a25] truncate" title={ev.eventName}>{ev.eventName}</h3>
//                   <Badge text={`₹ ${ev.price ?? 0}`} />
//                 </div>
//                 <div className="text-sm text-[#47533a]">By <span className="font-medium">{ev.organizerName || "Unknown"} {ev.organizerSurname || ""}</span></div>

//                 <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-[#47533a]">
//                   <div className="flex items-center gap-2"><span>📅</span><span>{formatDate(ev.date)}</span></div>
//                   <div className="flex items-center gap-2 justify-end"><span>⏰</span><span>{ev.time || "-"}</span></div>
//                   <div className="col-span-2 flex items-center gap-2"><span>📍</span><span className="truncate" title={ev.address}>{ev.city || "-"} • {ev.address || "-"}</span></div>
//                 </div>

//                 <div className="mt-3 flex items-center justify-between text-sm text-[#47533a]">
//                   <div>Tickets: <span className="font-medium">{ev.tickets ?? "-"}</span></div>
//                   <div>ID: <span className="font-mono">{ev._id?.slice(-6)}</span></div>
//                 </div>

//                 {ev.description && (
//                   <p className="mt-2 text-sm text-[#5a6b47]/80 line-clamp-2">{ev.description}</p>
//                 )}

//                 <div className="mt-4 grid grid-cols-2 gap-2">
//                   <button className="rounded-lg py-2 text-sm bg-[#A3B886] text-white hover:bg-[#7a8c5e] transition" onClick={() => startEdit(ev)}>Edit</button>
//                   <button className="rounded-lg py-2 text-sm border border-red-300 text-red-600 hover:bg-red-50 transition" onClick={() => onDelete(ev._id)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </AdminLayout>
//     {editing && (
//       <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//         <div className="w-full max-w-xl bg-white rounded-2xl p-5 space-y-3">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-[#2f3a25]">Edit Event</h3>
//             <button onClick={closeEdit} className="text-[#5a6b47] hover:text-black">✕</button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <input className="border rounded-lg px-3 py-2" value={editing.eventName || ''} onChange={(e) => onEditChange('eventName', e.target.value)} placeholder="Event name" />
//             <input type="date" className="border rounded-lg px-3 py-2" value={editing.date ? new Date(editing.date).toISOString().slice(0,10) : ''} onChange={(e) => onEditChange('date', e.target.value)} />
//             <input className="border rounded-lg px-3 py-2" value={editing.time || ''} onChange={(e) => onEditChange('time', e.target.value)} placeholder="Time" />
//             <input className="border rounded-lg px-3 py-2" value={editing.city || ''} onChange={(e) => onEditChange('city', e.target.value)} placeholder="City" />
//             <input className="border rounded-lg px-3 py-2 md:col-span-2" value={editing.address || ''} onChange={(e) => onEditChange('address', e.target.value)} placeholder="Address" />
//             <input type="number" className="border rounded-lg px-3 py-2" value={editing.tickets ?? ''} onChange={(e) => onEditChange('tickets', e.target.valueAsNumber)} placeholder="Tickets" />
//             <input type="number" className="border rounded-lg px-3 py-2" value={editing.price ?? ''} onChange={(e) => onEditChange('price', e.target.valueAsNumber)} placeholder="Price" />
//             <select className="border rounded-lg px-3 py-2" value={editing.status || ''} onChange={(e) => onEditChange('status', e.target.value)}>
//               <option value="">Status</option>
//               <option value="upcoming">Upcoming</option>
//               <option value="live">Live</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//             <textarea className="border rounded-lg px-3 py-2 md:col-span-2" rows={3} value={editing.description || ''} onChange={(e) => onEditChange('description', e.target.value)} placeholder="Description" />
//           </div>
//           <div className="flex justify-end gap-2 pt-2">
//             <button className="px-4 py-2 rounded-lg border" onClick={closeEdit} disabled={saving}>Cancel</button>
//             <button className="px-4 py-2 rounded-lg bg-[#8C9F6E] text-white disabled:opacity-60" onClick={saveEdit} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
//           </div>
//         </div>
//       </div>
//     )}
//     </>
//   );
// };

// export default AllEvents;
import React, { useContext, useEffect, useMemo, useState } from "react";
import AdminLayout from "./layout/AdminLayout.jsx";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";
import { axios_url } from "../../API/axios";

const API_BASE = axios_url;

const Badge = ({ text, tone = "default" }) => {
  const map = {
    default: "bg-gray-100 text-gray-700 border border-gray-200",
    green: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    blue: "bg-blue-100 text-blue-700 border border-blue-200",
    gray: "bg-gray-100 text-gray-600 border border-gray-200",
    red: "bg-red-100 text-red-700 border border-red-200",
    amber: "bg-amber-100 text-amber-700 border border-amber-200",
  };
  return (
    <span className={`px-3 py-1.5 text-xs rounded-full font-semibold ${map[tone] || map.default}`}>
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
    return new Date(iso).toLocaleDateString(undefined, { 
      year: "numeric", 
      month: "short", 
      day: "2-digit" 
    });
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
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

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

  const refresh = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/Event/AllEvents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to refresh events");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (ev) => setEditing({ ...ev });
  const closeEdit = () => setEditing(null);
  const onEditChange = (k, v) => setEditing((p) => ({ ...p, [k]: v }));
  const saveEdit = async () => {
    if (!editing?._id) return;
    const payload = {
      eventName: editing.eventName,
      date: editing.date,
      time: editing.time,
      city: editing.city,
      address: editing.address,
      tickets: editing.tickets,
      price: editing.price,
      description: editing.description,
      status: editing.status,
    };
    try {
      setSaving(true);
      const res = await axios.patch(`${API_BASE}/Event/UpdateEvent/${editing._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = res?.data?.data;
      if (updated?._id) {
        setEvents((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
        closeEdit();
      } else {
        await refresh();
        closeEdit();
      }
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${API_BASE}/Event/DeleteEvent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Failed to delete event");
    }
  };

  return (
    <>
      <AdminLayout title="" subtitle="">
        {/* Premium Background */}
        <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
          
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          </div>

          <div className="relative z-10">
            {/* Header with Back Button */}
            <div className="px-4 sm:px-6 lg:px-8 pt-8">
              <div className="mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="mb-6 lg:mb-0">
                    <h1 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                      <span className="bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        All Events
                      </span>
                    </h1>
                    <p className="text-lg text-gray-600 font-light">
                      Comprehensive overview and management of all events across organizers
                    </p>
                  </div>
                  <button
                    onClick={() => window.history.back()}
                    className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-fit"
                  >
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>

            {/* Header Stats */}
            <div className="px-4 sm:px-6 lg:px-8 mb-8">
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Events</p>
                        <p className="text-3xl font-bold text-gray-900">{events.length}</p>
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
                        <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {events.filter(e => e.status?.toLowerCase() === 'upcoming').length}
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Live Now</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {events.filter(e => e.status?.toLowerCase() === 'live').length}
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Filtered</p>
                        <p className="text-3xl font-bold text-gray-900">{filtered.length}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters/Search Section */}
            <div className="px-4 sm:px-6 lg:px-8 mb-8">
              <div className="mx-auto max-w-7xl">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 max-w-2xl">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search events by name, organizer, city, or address..."
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 shadow-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                      >
                        <option value="all">All Statuses</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="live">Live</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      
                      <button
                        onClick={refresh}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-4 sm:px-6 lg:px-8 pb-8">
              <div className="mx-auto max-w-7xl">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-lg p-6">
                  {/* Loading State */}
                  {loading && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="animate-pulse bg-gray-100 rounded-2xl p-4 border border-gray-200">
                            <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {!loading && error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Events</h3>
                      <p className="text-red-600">{error}</p>
                      <button
                        onClick={refresh}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Empty State */}
                  {!loading && !error && filtered.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        {query || status !== 'all' 
                          ? "Try adjusting your search criteria or filters to find events." 
                          : "No events have been created yet. Events will appear here once organizers start creating them."}
                      </p>
                      {(query || status !== 'all') && (
                        <button
                          onClick={() => { setQuery(''); setStatus('all'); }}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  )}

                  {/* Events Grid */}
                  {!loading && !error && filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filtered.map((ev) => (
                        <div 
                          key={ev._id} 
                          className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                          {/* Event Image */}
                          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                            {ev?.eventPhoto ? (
                              <img
                                src={ev.eventPhoto?.url || ev.eventPhoto}
                                alt={ev.eventName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-blue-50 to-purple-50">
                                🎪
                              </div>
                            )}
                            
                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                              <Badge text={ev.status || "-"} tone={statusTone(ev.status)} />
                            </div>
                            
                            {/* Price Badge */}
                            <div className="absolute top-3 right-3">
                              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                                <span className="text-sm font-bold text-gray-900">₹{ev.price ?? 0}</span>
                              </div>
                            </div>
                          </div>

                          {/* Event Details */}
                          <div className="p-5">
                            {/* Event Name and Organizer */}
                            <div className="mb-4">
                              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                                {ev.eventName}
                              </h3>
                              <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                By {ev.organizerName || "Unknown"} {ev.organizerSurname || ""}
                              </div>
                            </div>

                            {/* Event Info Grid */}
                            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <span className="font-medium">{formatDate(ev.date)}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <span className="font-medium">{ev.time || "-"}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 col-span-2">
                                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                </div>
                                <span className="font-medium truncate" title={ev.address}>
                                  {ev.city || "-"} • {ev.address || "-"}
                                </span>
                              </div>
                            </div>

                            {/* Tickets and ID */}
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                                <span>Tickets: <strong>{ev.tickets ?? "-"}</strong></span>
                              </div>
                              <div className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                ID: {ev._id?.slice(-6)}
                              </div>
                            </div>

                            {/* Description */}
                            {ev.description && (
                              <p className="text-sm text-gray-600 line-clamp-2 mb-4 border-l-4 border-blue-200 pl-3 py-1 bg-blue-50/50 rounded-r">
                                {ev.description}
                              </p>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                              <button 
                                onClick={() => startEdit(ev)}
                                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button 
                                onClick={() => onDelete(ev._id)}
                                className="py-2.5 px-4 rounded-xl border border-red-300 text-red-600 font-semibold text-sm hover:bg-red-50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Edit Event</h3>
              <button 
                onClick={closeEdit}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                  <input
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={editing.eventName || ''}
                    onChange={(e) => onEditChange('eventName', e.target.value)}
                    placeholder="Event name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={editing.date ? new Date(editing.date).toISOString().slice(0,10) : ''}
                    onChange={(e) => onEditChange('date', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={editing.time || ''}
                    onChange={(e) => onEditChange('time', e.target.value)}
                    placeholder="Time"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={editing.city || ''}
                    onChange={(e) => onEditChange('city', e.target.value)}
                    placeholder="City"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={editing.address || ''}
                    onChange={(e) => onEditChange('address', e.target.value)}
                    placeholder="Address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tickets</label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={editing.tickets ?? ''}
                    onChange={(e) => onEditChange('tickets', e.target.valueAsNumber)}
                    placeholder="Tickets"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={editing.price ?? ''}
                    onChange={(e) => onEditChange('price', e.target.valueAsNumber)}
                    placeholder="Price"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={editing.status || ''}
                    onChange={(e) => onEditChange('status', e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    rows={4}
                    value={editing.description || ''}
                    onChange={(e) => onEditChange('description', e.target.value)}
                    placeholder="Description"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300"
                onClick={closeEdit}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
                onClick={saveEdit}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllEvents;