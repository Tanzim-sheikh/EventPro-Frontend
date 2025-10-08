import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axios";
import Header from "./Header";
import Footer from "./Footer";

// Use centralized axios instance with env-driven baseURL

const Tag = ({ children }) => (
  <span className="px-2 py-1 rounded-full bg-white/90 text-black/80 text-xs md:text-sm">{children}</span>
);

const EventCard = ({ ev }) => {
  const navigate = useNavigate();
  const photo = ev?.eventPhoto?.url || ev?.eventPhoto || "";
  const priceLabel = ev?.price ? `₹ ${ev.price}` : "Free";
  const dateLabel = ev?.date ? new Date(ev.date).toLocaleDateString() : "";
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-[#e6efdf] bg-white shadow-sm hover:shadow-lg transition-all">
      <div
        className="h-44 md:h-52 w-full bg-gray-200 bg-center bg-cover"
        style={{ backgroundImage: photo ? `url(${photo})` : undefined }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-[#2f3a25] line-clamp-1">{ev?.eventName || "Untitled Event"}</h3>
        <p className="mt-1 text-sm text-[#405036] line-clamp-1">{dateLabel} • {ev?.city || "-"}</p>
        <div className="mt-3 flex items-center gap-2">
          {ev?.status && <Tag>{ev.status}</Tag>}
          <Tag>{priceLabel}</Tag>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={()=>navigate(`/user/booking/${ev?._id}`)} className="flex-1 rounded-xl bg-[#8C9F6E] text-white py-2 font-semibold hover:bg-[#7aa341] active:scale-[0.99] transition">
            Book Now
          </button>
          <button onClick={()=>navigate(`/user/booking/${ev?._id}`)} className="flex-1 rounded-xl border border-[#dbe4d3] bg-[#E2EAD5] text-[#2f3a25] py-2 font-semibold hover:bg-[#d6e3c6] active:scale-[0.99] transition">
            Details</button>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
};

const EventDashboard = () => {
  // Search & filters
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(""); // "free" | "paid" | ""

  // Data
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load data
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const [latestRes, publicRes] = await Promise.all([
          axiosInstance.get(`/Event/LatestEvents`, { params: { limit: 12 } }),
          axiosInstance.get(`/Event/PublicEvents`, { params: { limit: 24 } }),
        ]);
        if (!mounted) return;
        const latestList = Array.isArray(latestRes?.data?.data) ? latestRes.data.data : [];
        const publicList = Array.isArray(publicRes?.data?.data) ? publicRes.data.data : [];
        setLatest(latestList);
        // simple heuristics
        setFeatured(publicList.slice(0, 8));
        setTrending(publicList.slice(8, 20));
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || e?.message || "Failed to load events");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    let base = trending.length ? trending : latest;
    if (!base?.length) return [];
    return base.filter((ev) => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || [ev?.eventName, ev?.city, ev?.address]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q));
      const matchesCity = !city || String(ev?.city || "").toLowerCase() === city.toLowerCase();
      const matchesCat = !category || (Array.isArray(ev?.categories) ? ev.categories.includes(category) : String(ev?.category || "").toLowerCase() === category.toLowerCase());
      const matchesPrice = !price || (price === "free" ? !ev?.price : !!ev?.price);
      return matchesQ && matchesCity && matchesCat && matchesPrice;
    });
  }, [trending, latest, query, city, category, price]);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#86B049]/25 to-[#FF8A4C]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-[#FFB26B]/20 to-[#86B049]/25 blur-3xl" />

        <div className="relative max-w-[1200px] mx-auto px-4 pt-20 md:pt-24 pb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold font-audiowide text-[#2f3a25] text-center">
            Find. Book. Experience.
          </h1>
          <p className="mt-3 text-[#405036] text-center max-w-2xl mx-auto">
            Discover curated experiences near you. Powerful filters, stunning events, frictionless booking.
          </p>

          {/* Search + Quick Filters */}
          <form
            onSubmit={(e) => { e.preventDefault(); /* filter happens live */ }}
            className="mt-6 p-[1px] rounded-2xl bg-gradient-to-r from-[#9ab07a] via-[#86B049] to-[#FF8A4C]"
          >
            <div className="rounded-2xl bg-white/90 backdrop-blur-md shadow-xl px-3 py-2 md:px-4 md:py-3 flex flex-col md:flex-row gap-2 md:gap-3">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[#6a7b58]">🔎</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, city, or address"
                  className="flex-1 bg-transparent py-2 px-1 outline-none text-[#2f3a25] placeholder:text-[#2f3a25]/50"
                />
              </div>
              <div className="grid grid-cols-2 md:flex gap-2">
                <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-[#e6efdf] px-3 py-2">
                  <option value="">City: Any</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-[#e6efdf] px-3 py-2">
                  <option value="">Category: Any</option>
                  <option value="Music">Music</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Tech">Tech</option>
                </select>
                <select value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-xl border border-[#e6efdf] px-3 py-2">
                  <option value="">Price: Any</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
                <button type="button" onClick={() => { setQuery(""); setCity(""); setCategory(""); setPrice(""); }} className="rounded-xl border border-[#e6efdf] px-4 py-2 hover:bg-[#f5faf2]">Clear</button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Results Grid (Explore) */}
      <section className="max-w-[1200px] mx-auto px-4 mt-8 mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#2f3a25] font-audiowide">Explore</h2>
          {loading && <span className="text-sm text-[#6a7b58]">Loading…</span>}
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>
        )}

        {!error && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(filtered.length ? filtered : latest).slice(0, 12).map((ev, i) => (
              <EventCard key={ev?._id || i} ev={ev} />
            ))}
          </div>
        )}

        {!loading && !error && !(filtered.length || latest.length) && (
          <div className="mt-6 text-center text-[#6a7b58]">No events to display.</div>
        )}

        <div className="mt-8 flex justify-center">
          <Link to="/auth/user/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8C9F6E] text-white font-semibold shadow hover:bg-[#7b8f60] active:scale-[0.99] transition">
            Book Your Spot
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Featured Slider (moved below) */}
      <section className="max-w-[1200px] mx-auto px-4 mt-4 mb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#2f3a25] font-audiowide">Featured</h2>
          <Link to="/events" className="text-sm text-[#2f3a25] underline">View all</Link>
        </div>
        <div className="mt-4 grid grid-flow-col auto-cols-[70%] sm:auto-cols-[45%] md:auto-cols-[30%] gap-4 overflow-x-auto pb-2 snap-x">
          {(featured.length ? featured : Array.from({ length: 6 })).map((ev, i) => (
            <div key={i} className="snap-start">
              {ev ? (
                <EventCard ev={ev} />
              ) : (
                <div className="h-full min-h-[300px] rounded-2xl border border-[#e6efdf] bg-white animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventDashboard;
