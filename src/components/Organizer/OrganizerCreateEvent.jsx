import React, { useMemo, useState, useRef, useContext } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";

const OrganizerCreateEvent = () => {
  const navigate = useNavigate();
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");

  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    eventName: "",
    date: "",
    time: "",
    city: "",
    address: "",
    tickets: "",
    price: "",
    description: "",
    status: "upcoming",
  });
  const API_BASE = useMemo(
    () => import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000",
    []
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onPickFile = () => fileInputRef.current?.click();

  const onFile = (file) => {
    if (!file) return;
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (!ok) {
      setError("Only JPG/PNG/WEBP images are allowed");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    onFile(f);
  };
  const onDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const required = [
        "eventName",
        "date",
        "time",
        "city",
        "address",
        "tickets",
        "price",
        "description",
      ];
      const missing = required.filter((k) => !String(form[k]).trim());
      if (missing.length) {
        throw new Error(`Please fill: ${missing.join(", ")}`);
      }
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      const file = fileInputRef.current?.files?.[0];
      if (file) fd.append("eventPhoto", file);
      const res = await fetch(`${API_BASE}/Event/OrganizerCreateEvent`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to create event");
      }
      setSuccess("Event created successfully");
      setTimeout(() => navigate("/organizer"), 900);
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f9faf7] via-white to-[#eef3e7]">
      <Header />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-8 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#5a6b47] font-audiowide">Create a new experience</h1>
            <p className="text-[#5a6b47]/80 mt-2">Craft an engaging event with a seamless, editorial-style canvas.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-[#dfe6d9] bg-white shadow-sm">
              <div className="relative h-64 md:h-80 bg-[#eef3e7] flex items-center justify-center" onDrop={onDrop} onDragOver={onDragOver}>
                {preview ? (
                  <img src={preview} alt="Event visual" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="mx-auto w-20 h-20 rounded-full bg-[#A3B886]/20 flex items-center justify-center mb-4">
                      <span className="text-[#5a6b47] text-3xl">+</span>
                    </div>
                    <p className="text-[#5a6b47] font-medium">Add a captivating cover</p>
                    <p className="text-[#5a6b47]/60 text-sm mt-1">Drag & drop or upload an image</p>
                    <button type="button" onClick={onPickFile} className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-[#A3B886] text-white hover:bg-[#7b8f60] transition">Upload cover</button>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
              </div>

              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[#5a6b47] text-sm mb-2">Event title</label>
                  <input name="eventName" value={form.eventName} onChange={onChange} placeholder="e.g., Tech Summit 2025" className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 focus:bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5a6b47] text-sm mb-2">Date</label>
                    <input type="date" name="date" value={form.date} onChange={onChange} className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]" />
                  </div>
                  <div>
                    <label className="block text-[#5a6b47] text-sm mb-2">Time</label>
                    <input type="time" name="time" value={form.time} onChange={onChange} className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-[#dfe6d9] bg-white shadow-sm">
              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[#5a6b47] text-sm mb-2">City</label>
                  <input name="city" value={form.city} onChange={onChange} placeholder="e.g., Mumbai" className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#5a6b47] text-sm mb-2">Address</label>
                  <input name="address" value={form.address} onChange={onChange} placeholder="Venue, street and area" className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]" />
                </div>
                <div>
                  <label className="block text-[#5a6b47] text-sm mb-2">Tickets</label>
                  <input type="number" min="0" name="tickets" value={form.tickets} onChange={onChange} placeholder="e.g., 200" className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]" />
                </div>
                <div>
                  <label className="block text-[#5a6b47] text-sm mb-2">Price (₹)</label>
                  <input type="number" min="0" name="price" value={form.price} onChange={onChange} placeholder="e.g., 499" className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]" />
                </div>
                <div>
                  <label className="block text-[#5a6b47] text-sm mb-2">Status</label>
                  <select name="status" value={form.status} onChange={onChange} className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]">
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[#5a6b47] text-sm mb-2">Description</label>
                  <textarea name="description" value={form.description} onChange={onChange} rows={6} placeholder="Tell a story about your event..." className="w-full rounded-2xl border border-[#dfe6d9] bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8C9F6E]" />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">{error}</div>
            )}
            {success && (
              <div className="rounded-2xl border border-green-200 bg-green-50 text-green-700 px-4 py-3">{success}</div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={() => navigate(-1)} className="px-5 py-3 rounded-full border border-[#dfe6d9] text-[#5a6b47] hover:bg-[#f4f7f0]">Cancel</button>
              <button type="submit" disabled={submitting} className="px-6 py-3 rounded-full bg-[#A3B886] text-white hover:bg-[#7b8f60] disabled:opacity-60">{submitting ? "Publishing..." : "Publish Event"}</button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizerCreateEvent;
