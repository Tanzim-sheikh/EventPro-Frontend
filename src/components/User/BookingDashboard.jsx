import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axios";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const BookingDashboard = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [bookLoading, setBookLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(`/Event/EventById/${eventId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res?.data?.success) setEvent(res.data.data);
        else setError(res?.data?.message || "Failed to load event");
      } catch (e) {
        console.error(e);
        setError(e?.response?.data?.message || e?.message || "Failed to load event");
      } finally { setLoading(false); }
    };
    fetchEvent();
  }, [eventId]);

  const title = useMemo(() => `Booking • ${eventId || "Unknown Event"}`, [eventId]);
  const priceNum = Number(event?.price || 0);
  const total = useMemo(() => (priceNum > 0 ? priceNum * qty : 0), [priceNum, qty]);

  const handleBook = async () => {
    try {
      setError("");
      if (!eventId) return setError("Invalid event.");
      if (!qty || qty < 1) return setError("Please select at least 1 ticket.");
      const name = localStorage.getItem("Name") || "User";
      const token = localStorage.getItem("token");
      if (!token) return setError("Please login to continue.");

      setBookLoading(true);
      const payload = {
        eventId,
        ticketCount: qty,
        userName: name,
        totalAmount: total,
      };
      const res = await axiosInstance.post('/Booking/CreateBooking', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res?.data?.success) {
        // Show success animation then navigate
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/user");
        }, 3000);
      } else {
        setError(res?.data?.message || "Booking failed. Try again.");
      }
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || e?.message || "Booking failed.");
    } finally {
      setBookLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#e2ead5]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pb-20 pt-6">
        <div className="rounded-2xl border border-[#a8b892] bg-white p-0 overflow-hidden shadow-sm">
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-lg px-8 py-10 text-center border border-[#a8b892]">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center relative">
                  <span className="absolute inline-flex h-16 w-16 rounded-full bg-green-200 opacity-75 animate-ping" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-8 w-8 text-green-600"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2f3a25]">Booking Confirmed</h3>
                <p className="mt-1 text-sm text-[#405036]">Redirecting to your dashboard…</p>
              </div>
            </div>
          )}
          {loading && (
            <div className="p-6 text-[#405036]">Loading event…</div>
          )}
          {!loading && error && (
            <div className="p-6">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">{error}</div>
            </div>
          )}
          {!loading && !error && event && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Left: Image + Details */}
              <div className="lg:col-span-2">
                <div className="relative min-h-[260px] bg-[#f3f7ef]">
                  {(() => {
                    const photo = event?.eventPhoto;
                    const photoUrl = typeof photo === 'string' ? photo : (photo?.url || "");
                    return photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={event?.eventName || "Event"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-[#6a7b58]">
                        No Image
                      </div>
                    );
                  })()}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#2f3a25]">{event?.eventName}</h2>
                    {event?.status && (
                      <span className="px-3 py-1 rounded-full bg-[#eaf2e0] text-[#2f3a25] text-xs md:text-sm whitespace-nowrap">
                        {event.status}
                      </span>
                    )}
                  </div>
                  <p className="text-[#405036]">{event?.description || 'No description available.'}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-[#a8b892] bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-[#6a7b58]">Date & Time</div>
                      <div className="mt-1 text-[#2f3a25] font-semibold">
                        {event?.date ? new Date(event.date).toLocaleString() : '-'}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#a8b892] bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-[#6a7b58]">Location</div>
                      <div className="mt-1 text-[#2f3a25] font-semibold">{event?.city || '-'}</div>
                      <div className="text-sm text-[#405036]">{event?.address || '-'}</div>
                    </div>
                    <div className="rounded-xl border border-[#a8b892] bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-[#6a7b58]">Category</div>
                      <div className="mt-1 text-[#2f3a25] font-semibold">{event?.category || '-'}</div>
                    </div>
                    <div className="rounded-xl border border-[#a8b892] bg-white p-4">
                      <div className="text-xs uppercase tracking-wide text-[#6a7b58]">Organizer</div>
                      <div className="mt-1 text-[#2f3a25] font-semibold">{event?.organizerName || '-'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Booking Summary */}
              <div className="lg:col-span-1 p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-[#a8b892] bg-white">
                <div className="sticky top-6 space-y-5">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#6a7b58]">Booking Summary</div>
                    <div className="mt-1 text-lg font-bold text-[#2f3a25] line-clamp-2">{event?.eventName}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#a8b892] bg-white p-3">
                      <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Date</div>
                      <div className="mt-1 text-[#2f3a25] font-semibold text-sm">{event?.date ? new Date(event.date).toLocaleDateString() : '-'}</div>
                    </div>
                    <div className="rounded-xl border border-[#a8b892] bg-white p-3">
                      <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Time</div>
                      <div className="mt-1 text-[#2f3a25] font-semibold text-sm">{event?.time || '-'}</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#a8b892] bg-white p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Price</div>
                        <div className="text-[#2f3a25] font-semibold">{priceNum > 0 ? `₹ ${priceNum}` : 'Free'}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-[11px] uppercase tracking-wide text-[#6a7b58]">Tickets</div>
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="h-8 w-8 rounded-lg border border-[#8C9F6E] text-[#2f3a25] hover:bg-[#e2ead5]"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <div className="min-w-[2.5rem] text-center font-semibold">{qty}</div>
                        <button
                          onClick={() => setQty((q) => Math.min(10, q + 1))}
                          className="h-8 w-8 rounded-lg border border-[#8C9F6E] text-[#2f3a25] hover:bg-[#e2ead5]"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {priceNum > 0 && (
                      <div className="mt-2 text-sm text-[#405036]">
                        Subtotal: <span className="font-semibold text-[#2f3a25]">₹ {total}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleBook}
                      disabled={bookLoading}
                      className={`mt-4 w-full rounded-lg text-white py-2.5 text-sm font-semibold ${bookLoading ? 'bg-[#8C9F6E] cursor-not-allowed' : 'bg-[#A3B886] hover:bg-[#6e8151]'}`}
                    >
                      {bookLoading ? 'Processing…' : 'Proceed to booking'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BookingDashboard;
