import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import Header from "../Home/Header.jsx";
import Footer from "../Home/Footer.jsx";
import axiosInstance from "../../API/axios";

// All requests go through axiosInstance (baseURL from env)

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
  const [editing, setEditing] = useState(null); // event object being edited
  const [saving, setSaving] = useState(false);

  // No status filter

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosInstance.get(`/Event/OrganizerEvents`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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

  const refresh = async () => {
    // simple refetch
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get(`/Event/OrganizerEvents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to refresh events");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    if (!confirm("Delete this event? This action cannot be undone.")) return;
    try {
      const endpoint = `/Event/DeleteEvent/${id}`;
      const headers = { Authorization: `Bearer ${token}` };
      await axiosInstance.delete(endpoint, { headers });
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Failed to delete event");
    }
  };

  const startEdit = (ev) => setEditing({ ...ev });
  const closeEdit = () => setEditing(null);
  const onEditChange = (k, v) => setEditing((prev) => ({ ...prev, [k]: v }));
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
      const endpoint = `/Event/UpdateEvent/${editing._id}`;
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axiosInstance.patch(endpoint, payload, { headers });
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
                    <button className="flex-1 bg-[#A3B886] text-white rounded-lg py-2 text-sm hover:bg-[#7a8c5e] transition" onClick={() => startEdit(ev)}>
                      Edit
                    </button>
                    <button className="flex-1 border border-red-300 text-red-600 rounded-lg py-2 text-sm hover:bg-red-50 transition" onClick={() => onDelete(ev._id)}>
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
      <Footer />

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-xl bg-white rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2f3a25]">Edit Event</h3>
              <button onClick={closeEdit} className="text-[#5a6b47] hover:text-black">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded-lg px-3 py-2" value={editing.eventName || ''} onChange={(e) => onEditChange('eventName', e.target.value)} placeholder="Event name" />
              <input type="date" className="border rounded-lg px-3 py-2" value={editing.date ? new Date(editing.date).toISOString().slice(0,10) : ''} onChange={(e) => onEditChange('date', e.target.value)} />
              <input className="border rounded-lg px-3 py-2" value={editing.time || ''} onChange={(e) => onEditChange('time', e.target.value)} placeholder="Time" />
              <input className="border rounded-lg px-3 py-2" value={editing.city || ''} onChange={(e) => onEditChange('city', e.target.value)} placeholder="City" />
              <input className="border rounded-lg px-3 py-2 md:col-span-2" value={editing.address || ''} onChange={(e) => onEditChange('address', e.target.value)} placeholder="Address" />
              <input type="number" className="border rounded-lg px-3 py-2" value={editing.tickets ?? ''} onChange={(e) => onEditChange('tickets', e.target.valueAsNumber)} placeholder="Tickets" />
              <input type="number" className="border rounded-lg px-3 py-2" value={editing.price ?? ''} onChange={(e) => onEditChange('price', e.target.valueAsNumber)} placeholder="Price" />
              <select className="border rounded-lg px-3 py-2" value={editing.status || ''} onChange={(e) => onEditChange('status', e.target.value)}>
                <option value="">Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <textarea className="border rounded-lg px-3 py-2 md:col-span-2" rows={3} value={editing.description || ''} onChange={(e) => onEditChange('description', e.target.value)} placeholder="Description" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button className="px-4 py-2 rounded-lg border" onClick={closeEdit} disabled={saving}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-[#8C9F6E] text-white disabled:opacity-60" onClick={saveEdit} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizerEvents;
