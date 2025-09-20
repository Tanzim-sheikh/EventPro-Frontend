// import React, { useRef, useEffect, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const About = () => {
//   const horizontalSectionRef = useRef(null);
//   const horizontalContentRef = useRef(null);
//   const [isScrolling, setIsScrolling] = useState(false);

//  const features = [
//   {
//     icon: '🎯',
//     title: 'Easy Booking',
//     content: 'Book events in just a few clicks with real-time availability.'
//   },
//   {
//     icon: '🎨',
//     title: 'Create & Host',
//     content: 'Organize your own events with powerful management tools.'
//   },
//   {
//     icon: '📊',
//     title: 'Smart Dashboard',
//     content: 'Track bookings and manage attendees with analytics.'
//   },
//   {
//     icon: '🔒',
//     title: 'Secure Payments',
//     content: 'Secure payment gateways for hassle-free transactions.'
//   },
//   {
//     icon: '🔄',
//     title: 'Real-time Updates',
//     content: 'Stay informed with live updates on bookings and events.'
//   },
//   {
//     icon: '📱',
//     title: 'Mobile Friendly',
//     content: 'Works seamlessly on all devices - mobile, tablet, desktop.'
//   },
//   {
//     icon: '🌟',
//     title: 'User Reviews',
//     content: 'Read and share experiences to help others choose events.'
//   },
//   {
//     icon: '⚡',
//     title: 'Quick Support',
//     content: '24/7 customer support to help with any issues.'
//   }
// ];

//   // Horizontal scroll content
//   const horizontalContent = [
//     {
//       title: "Discover Events",
//       description: "Find events that match your interests and preferences",
//       color: "bg-[#8C9F6E]"
//     },
//     {
//       title: "Book Seamlessly", 
//       description: "Reserve your spot with our intuitive booking system",
//       color: "bg-[#7a8c5e]"
//     },
//     {
//       title: "Enjoy Experiences",
//       description: "Create memories at events you'll love",
//       color: "bg-[#8C9F6E]"
//     },
//     {
//       title: "Share Feedback",
//       description: "Help others by sharing your experience",
//       color: "bg-[#7a8c5e]"
//     }
//   ];

//   useEffect(() => {
//     if (!horizontalSectionRef.current || !horizontalContentRef.current) return;

//     const horizontalSection = horizontalSectionRef.current;
//     const horizontalContent = horizontalContentRef.current;

//     // Calculate total width of horizontal content
//     const horizontalItems = horizontalContent.querySelectorAll('.horizontal-item');
//     const totalWidth = Array.from(horizontalItems).reduce(
//       (total, item) => total + item.offsetWidth, 0
//     );

//     // Set horizontal content width
//     horizontalContent.style.width = `${totalWidth}px`;

//     // GSAP animation for horizontal scroll
//     gsap.to(horizontalContent, {
//       x: () => -(totalWidth - window.innerWidth),
//       ease: "none",
//       scrollTrigger: {
//         trigger: horizontalSection,
//         start: "top top",
//         end: () => `+=${totalWidth}`,
//         pin: true,
//         scrub: 1,
//         markers: false, // Set to true for debugging
//         onUpdate: (self) => {
//           setIsScrolling(self.progress > 0 && self.progress < 1);
//         }
//       }
//     });

//     // Cleanup function
//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     <div id="About" className="relative overflow-hidden bg-gradient-to-br from-[#f8faf8] to-[#e9efe9] py-20">
//       {/* Title Section */}
//       <div className="w-full max-w-[1600px] bg-white rounded-3xl p-10 mx-auto mb-12 border border-[#dbe4d3]">
//         <h1 className="text-4xl font-extrabold text-[#5a6b47] mb-4 text-center font-audiowide">
//           About EventPro
//         </h1>
//         <p className="text-lg text-[#5a6b47] text-center max-w-3xl mx-auto">
//           Your all-in-one platform for discovering, booking, and hosting amazing events.
//           Whether you're looking to attend the next big conference or host your own event,
//           we've got you covered.
//         </p>
//       </div>

//       {/* Horizontal Scroll Section */}
//       <section
//         ref={horizontalSectionRef}
//         className="relative h-screen mb-10"
//       >
//         <div className="mt-10 sticky top-0 h-screen overflow-hidden">
//           <div 
//             ref={horizontalContentRef}
//             className="horizontal-content flex absolute top-0 left-0 h-full"
//           >
//             {horizontalContent.map((item, index) => (
//               <div
//                 key={index}
//                 className="horizontal-item flex-shrink-0 w-screen h-full flex items-center justify-center px-10"
//               >
//                 <div className={`w-full h-4/5 ${item.color} text-white rounded-3xl flex items-center justify-center`}>
//                   <div className="text-center max-w-2xl">
//                     <h2 className="text-4xl font-bold mb-6 font-audiowide">{item.title}</h2>
//                     <p className="text-xl mb-8">{item.description}</p>
//                     <div className="text-6xl">{index + 1}</div>
//                     {isScrolling && (
//                       <p className="mt-8 text-lg opacity-80">← Scroll down to continue →</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <div className="w-full max-w-[1600px] mx-auto px-4 mt-30">
//         <h2 className="text-3xl font-bold text-center text-[#5a6b47] mb-12 font-audiowide">Why Choose EventPro?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow duration-300 border border-[#dbe4d3]"
//             >
//               <div className="text-4xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-bold text-[#5a6b47] mb-2">{feature.title}</h3>
//               <p className="text-[#5a6b47]">{feature.content}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="w-full max-w-[1600px] mx-auto mt-20 px-4">
//         <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#dbe4d3]">
//           <h2 className="text-3xl font-bold text-[#5a6b47] mb-8 text-center font-audiowide">How It Works</h2>

//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <ol className="space-y-6">
//                 {[
//                   "Sign up for a free account in seconds",
//                   "Browse and discover amazing events near you", 
//                   "Book your spot with secure payments",
//                   "Get ready for an unforgettable experience"
//                 ].map((step, index) => (
//                   <li key={index} className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8C9F6E] text-white flex items-center justify-center font-bold">
//                       {index + 1}
//                     </div>
//                     <p className="text-[#5a6b47]">{step}</p>
//                   </li>
//                 ))}
//               </ol>

//               <div className="mt-8 text-center">
//                 <button className="px-8 py-3 bg-[#8C9F6E] text-white font-semibold rounded-lg hover:bg-[#7a8c5e] transition-colors duration-300">
//                   Get Started Now
//                 </button>
//               </div>
//             </div>

//             <div className="hidden md:block">
//               <div className="relative w-full h-64 md:h-96 bg-[#f0f5e8] rounded-xl overflow-hidden flex items-center justify-center">
//                 <svg className="w-32 h-32 text-[#8C9F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-12 text-center">
//         <h3 className="text-2xl font-bold text-[#5a6b47] mb-2 font-audiowide">Ready to make your next event unforgettable?</h3>
//         <p className="text-lg text-[#5a6b47] mb-4">Join EventPro today and experience the future of event management and booking.</p>
//         <button className="px-6 py-3 rounded-md bg-[#8C9F6E] text-white font-semibold hover:bg-[#7a8c5e] transition text-lg">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default About;

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const horizontalSectionRef = useRef(null);
  const horizontalContentRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  // Horizontal scroll content
  const horizontalContent = [
    {
      title: "Discover Events",
      description: "Find events that match your interests and preferences",
      color: "bg-[#8C9F6E]"
    },
    {
      title: "Book Seamlessly",
      description: "Reserve your spot with our intuitive booking system",
      color: "bg-[#7a8c5e]"
    },
    {
      title: "Enjoy Experiences",
      description: "Create memories at events you'll love",
      color: "bg-[#8C9F6E]"
    },
    {
      title: "Share Feedback",
      description: "Help others by sharing your experience",
      color: "bg-[#7a8c5e]"
    }
  ];

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
    <div id="About" className="relative overflow-hidden py-20 bg-white">
      {/* Title Section */}
      <div className="w-full max-w-[1600px] bg-white p-2 mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#5a6b47]  text-center font-audiowide">
          About EventPro
        </h1>
        <p className="text-base md:text-lg text-[#5a6b47] text-center max-w-3xl mx-auto">
          Your all-in-one platform for discovering, booking, and hosting amazing events.
          Whether you're looking to attend the next big conference or host your own event,
          we've got you covered.
        </p>
      </div>

      {/* Horizontal Scroll Section */}
      <section
        ref={horizontalSectionRef}
        className="relative h-screen mb-10"
      >
        <div className="mt-10 sticky top-0 h-screen overflow-hidden">
          <div
            ref={horizontalContentRef}
            className="horizontal-content flex absolute top-0 left-0 h-full"
          >
            {horizontalContent.map((item, index) => (
              <div
                key={index}
                className="horizontal-item flex-shrink-0 w-screen h-full flex items-center justify-center px-4 md:px-10"
              >
                <div className={`w-full h-4/5 ${item.color} text-white rounded-3xl flex items-center justify-center p-6 md:p-0`}>
                  <div className="text-center max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 font-audiowide">{item.title}</h2>
                    <p className="text-base md:text-xl mb-6 md:mb-8">{item.description}</p>
                    <div className="text-4xl md:text-6xl">{index + 1}</div>
                    {isScrolling && (
                      <p className="mt-6 md:mt-8 text-sm md:text-lg opacity-80">← Scroll down to continue →</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <div className="w-full max-w-[1600px] mx-auto px-4 mt-20 md:mt-30">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#5a6b47] mb-8 md:mb-12 font-audiowide">Why Choose EventPro?</h2>
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
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-[#dfe6d9] h-full hidden md:block"></div>
      
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
          <div 
            key={index} 
            className={`md:flex items-center md:space-x-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Icon bubble */}
            <div className="flex justify-center md:justify-start md:w-1/2 relative">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#8C9F6E] flex items-center justify-center shadow-md">
                {step.icon}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white border border-[#e4e9e1] p-6 rounded-xl shadow-sm md:w-1/2 hover:shadow-md transition">
              <h3 className="text-lg md:text-xl font-semibold text-[#5a6b47] mb-2">{step.title}</h3>
              <p className="text-sm md:text-base text-[#5a6b47]/80 leading-relaxed">{step.desc}</p>
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
    With EventPro, managing and booking events becomes effortless. Join now and take the first step towards unforgettable experiences.
  </p>
</div>
</div>
      );
};

export default About;