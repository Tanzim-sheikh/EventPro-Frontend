import { Link } from 'react-router-dom';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosInstance from '../../API/axios';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const horizontalSectionRef = useRef(null);
  const horizontalContentRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [query, setQuery] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const [defaultEvents, setDefaultEvents] = useState([]); // events loaded on mount
  const [displayEvents, setDisplayEvents] = useState([]); // exactly 4 cards to render
  const [hasSearched, setHasSearched] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Requests go through axiosInstance (baseURL from env)

  const features = [
    {
      icon: '🎯',
      title: 'Easy Booking',
      content: 'Book events in just a few clicks with real-time availability.'
    },
    {
      icon: '🎨',
      title: 'Create & Host',
      content: 'Organize your own events with powerful management tools.'
    },
    {
      icon: '📊',
      title: 'Smart Dashboard',
      content: 'Track bookings and manage attendees with analytics.'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      content: 'Secure payment gateways for hassle-free transactions.'
    },
    {
      icon: '🔄',
      title: 'Real-time Updates',
      content: 'Stay informed with live updates on bookings and events.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      content: 'Works seamlessly on all devices - mobile, tablet, desktop.'
    },
    {
      icon: '🌟',
      title: 'User Reviews',
      content: 'Read and share experiences to help others choose events.'
    },
    {
      icon: '⚡',
      title: 'Quick Support',
      content: '24/7 customer support to help with any issues.'
    }
  ];

  // Load latest events (public)
  useEffect(() => {
    let mounted = true;
    const loadLatest = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosInstance.get(`/Event/LatestEvents`, { params: { limit: 4 } });
        if (!mounted) return;
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        setEventsData(list);
        setDefaultEvents(list);
        setDisplayEvents(list.slice(0, 4));
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || e?.message || "Failed to load events");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadLatest();
    return () => { mounted = false; };
  }, []);

  // Search events (public)
  const onSearch = async (e) => {
    e?.preventDefault?.();
    const q = query.trim();
    if (!q) {
      // If cleared search, restore defaults
      setHasSearched(false);
      setNoResults(false);
      setDisplayEvents(defaultEvents.slice(0, 4));
      return;
    }
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);
      const res = await axiosInstance.get(`/Event/PublicEvents`, { params: { q } });
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setEventsData(list);

      if (!list.length) {
        setNoResults(true);
        // Show default events if nothing matches
        setDisplayEvents(defaultEvents.slice(0, 4));
      } else {
        setNoResults(false);
        const primary = list.slice(0, 4);
        if (primary.length < 4) {
          const fillPool = defaultEvents.filter((ev) => !primary.some((p) => p?._id === ev?._id));
          const filled = [...primary, ...fillPool].slice(0, 4);
          setDisplayEvents(filled);
        } else {
          setDisplayEvents(primary);
        }
      }
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!horizontalSectionRef.current || !horizontalContentRef.current) return;

    const horizontalSection = horizontalSectionRef.current;
    const horizontalContent = horizontalContentRef.current;

    // Calculate total width of horizontal content
    const horizontalItems = horizontalContent.querySelectorAll('.horizontal-item');
    const totalWidth = Array.from(horizontalItems).reduce(
      (total, item) => total + item.offsetWidth, 0
    );

    // Set horizontal content width
    horizontalContent.style.width = `${totalWidth}px`;

    // GSAP animation for horizontal scroll
    const animation = gsap.to(horizontalContent, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSection,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          setIsScrolling(self.progress > 0 && self.progress < 1);
        }
      }
    });

    // Refresh ScrollTrigger on window resize
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', refreshScrollTrigger);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', refreshScrollTrigger);
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      animation.scrollTrigger?.kill();
    };
  }, [windowWidth]); // Re-run effect when window width changes

  return (
    // < id="About" className="relative overflow-hidden bg-gradient-to-br from-[#f8faf8] to-[#e9efe9] py-20">
    <div id="About" className="relative overflow-hidden py-20 bg-white z-0">
      {/* Title Section */}
      <div className="w-full max-w-[1600px] bg-white p-2 mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#5a6b47]  text-center font-audiowide">
          Discover Events
        </h1>
        <p className="text-base md:text-lg text-[#5a6b47] text-center max-w-3xl mx-auto">
          Explore trending events or search by name, city, or address.
        </p>

        {/* Search Bar - Professional Glass Style */}
        <form onSubmit={onSearch} className="mt-6 max-w-3xl mx-auto">
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#9ab07a] via-[#8C9F6E] to-[#6f8251]">
            <div className="flex items-center gap-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl px-3 pr-3 md:pr-3">
              {/* Search Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-xl text-[#5a6b47]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 110-14 7 7 0 010 14z" />
                </svg>
              </div>

              {/* Input */}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events by name, city, or address..."
                className="flex-1 bg-transparent py-3 md:py-4 px-1 md:px-2 outline-none text-[#2f3a25] placeholder:text-[#2f3a25]/50"
                aria-label="Search events"
              />

              {/* Clear Button */}
              {query?.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="hidden sm:flex items-center gap-1 text-[#5a6b47] hover:text-[#3f4c33] px-3 py-2 rounded-xl hover:bg-[#eef3e9] transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm">Clear</span>
                </button>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="ml-auto inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-[#A3B886] text-white font-semibold shadow hover:bg-[#7b8f60] active:scale-[0.99] transition"
                aria-label="Search"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span className="text-sm">Loading</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Search</span>
                    <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Helper/Error text */}
          {error && <div className="mt-2 text-sm text-red-600 text-center">{error}</div>}
          {!error && (
            <div className="mt-2 text-xs md:text-sm text-[#5a6b47]/70 text-center">
              Try keywords like <span className="font-semibold">"Music"</span>, <span className="font-semibold">"Kolkata"</span>, or <span className="font-semibold">"Conference"</span>
            </div>
          )}
          {hasSearched && noResults && !error && (
            <div className="mt-2 text-sm text-[#5a6b47] text-center">
              No matching results. Showing latest events.
            </div>
          )}
        </form>
      </div>

      {/* Horizontal Scroll Section */}
      <section
        ref={horizontalSectionRef}
        className="relative h-screen mb-10 z-0 pointer-events-none"
      >
        <div className="mt-10 sticky top-0 h-screen overflow-hidden z-0">
          <div
            ref={horizontalContentRef}
            className="horizontal-content flex absolute top-0 left-0 h-full z-0"
          >
            {(displayEvents.length ? displayEvents : Array.from({ length: 4 })).map((ev, index) => (
              <div
                key={index}
                className="horizontal-item flex-shrink-0 w-screen h-full flex items-center justify-center px-4 md:px-10"
              >
                <div
                  className={`w-full h-4/5 rounded-3xl overflow-hidden relative flex items-end justify-start`}
                  style={{
                    backgroundImage: ev ? `url(${ev.eventPhoto?.url || ev.eventPhoto || ''})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: ev ? undefined : '#8C9F6E',
                  }}
                >
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 w-full p-6 md:p-10 text-white">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 font-audiowide">{ev?.eventName || `Event ${index + 1}`}</h2>
                    <p className="text-sm md:text-base opacity-90">
                      {ev ? `${new Date(ev.date).toLocaleDateString()} • ${ev.city || '-'} • ${ev.address || '-'}` : 'Coming soon'}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-sm md:text-base">
                      {ev?.status && <span className="px-2 py-1 rounded-full bg-white/90 text-black/80">{ev.status}</span>}
                      <span className="px-2 py-1 rounded-full bg-white/90 text-black/80">{ev?.price ? `₹ ${ev.price}` : 'Free'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex items-center justify-center pointer-events-auto">
          <Link
            to="/events"
            className="text-lg md:text-xl font-bold text-center text-white mb-8 md:mb-12 font-audiowide bg-[#A3B886] p-3 rounded-full hover:bg-[#7b8f60] transition-colors cursor-pointer"
          >
            Event Dashboard
          </Link>
        </div> */}
        <div className="flex items-center justify-center pointer-events-auto">
  <Link
    to="/events"
    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#A3B886] to-[#8C9F6E] text-white font-audiowide text-lg font-bold hover:from-[#8C9F6E] hover:to-[#7b8f60] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 rounded-lg border border-white/20"
  >
    Event Dashboard
  </Link>
</div>
      </section>

      {/* Features Grid */}
      <div className="w-full max-w-[1600px] mx-auto px-4 mt-20 md:mt-30">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#5a6b47] mb-8 md:mb-12 font-audiowide">Why Choose Evenza?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-4 md:p-6 hover:shadow-lg transition-shadow duration-300 border border-[#dbe4d3]"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-bold text-[#5a6b47] mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-[#5a6b47]">{feature.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
<div className="w-full max-w-[1600px] mx-auto mt-16 md:mt-24 px-4">
  <div className="bg-[#f9faf7] rounded-3xl py-12 md:py-16 px-6 md:px-12 shadow-md border border-[#dfe6d9]">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#5a6b47] text-center font-audiowide mb-14 tracking-wide">
      How It Works
    </h2>

    {/* Timeline layout */}
    <div className="relative">
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#cbd5bd] z-0"></div>
      
      <div className="space-y-12 md:space-y-16">
        {[
          {
            title: "Create Your Free Account",
            desc: "Sign up in seconds and start exploring events tailored for you.",
            icon: (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
            )
          },
          {
            title: "Discover Exciting Events",
            desc: "Browse a wide range of events happening around you in real-time.",
            icon: (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4
                4-1.79 4-4-1.79-4-4-4z"/>
              </svg>
            )
          },
          {
            title: "Book Securely",
            desc: "Reserve your spot instantly with our secure and seamless payments.",
            icon: (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a5 5 0 00-10 0v2H5v12h14V9h-2z"/>
              </svg>
            )
          },
          {
            title: "Enjoy The Experience",
            desc: "Show up and enjoy the unforgettable moments we’ve helped you create.",
            icon: (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"/>
              </svg>
            )
          },
        ].map((step, index) => (
          <div key={index} className="relative z-10">
            {/* Mobile: icon then content */}
            <div className="md:hidden flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-[#A3B886] flex items-center justify-center shadow-md">
                {step.icon}
              </div>
            </div>
            <div className="md:hidden">
              <div className="bg-white border border-[#e4e9e1] p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-[#5a6b47] mb-2">{step.title}</h3>
                <p className="text-sm text-[#5a6b47]/80 leading-relaxed">{step.desc}</p>
              </div>
            </div>

            {/* Desktop: alternate left/right around center line */}
            <div className="hidden md:flex items-center">
              {index % 2 === 0 ? (
                <>
                  {/* Left icon */}
                  <div className="md:w-1/2 pr-6 flex justify-end">
                    <div className="w-16 h-16 rounded-full bg-[#A3B886] flex items-center justify-center shadow-md">
                      {step.icon}
                    </div>
                  </div>
                  {/* Right content */}
                  <div className="md:w-1/2 pl-6">
                    <div className="bg-white border border-[#e4e9e1] p-6 rounded-xl shadow-sm hover:shadow-md transition">
                      <h3 className="text-lg md:text-xl font-semibold text-[#5a6b47] mb-2">{step.title}</h3>
                      <p className="text-sm md:text-base text-[#5a6b47]/80 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Left content */}
                  <div className="md:w-1/2 pr-6">
                    <div className="bg-white border border-[#e4e9e1] p-6 rounded-xl shadow-sm hover:shadow-md transition">
                      <h3 className="text-lg md:text-xl font-semibold text-[#5a6b47] mb-2">{step.title}</h3>
                      <p className="text-sm md:text-base text-[#5a6b47]/80 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {/* Right icon */}
                  <div className="md:w-1/2 pl-6 flex justify-start">
                    <div className="w-16 h-16 rounded-full bg-[#A3B886] flex items-center justify-center shadow-md">
                      {step.icon}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

{/* CTA Section */}
<div className="mt-20 md:mt-28 text-center px-4 max-w-2xl mx-auto">
  <h3 className="text-2xl md:text-3xl font-extrabold text-[#5a6b47] mb-4 font-audiowide">
    Ready to Elevate Your Event Experience?
  </h3>
  <p className="text-lg md:text-xl text-[#5a6b47]/90 leading-relaxed">
    With Evenza, managing and booking events becomes effortless. Join now and take the first step towards unforgettable experiences.
  </p>
</div>
</div>
      );
};

export default About;