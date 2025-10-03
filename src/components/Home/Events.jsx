// import React, { useState, useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import EventsImg1 from '../../assets/EventsImg1.jpg';
// import EventsImg2 from '../../assets/EventsImg2.jpg';
// import EventsImg3 from '../../assets/EventsImg3.jpg';
// import { Navigate, useNavigate } from 'react-router-dom';

// const Events = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);

//   const images = [EventsImg1, EventsImg2, EventsImg3];
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();
//   const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
//   const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

//   return (
//     <div className="min-h-screen w-full bg-white flex flex-col ">
//       {/* Main Section */}
//       <div 
//         data-aos="fade-up"
//         className="flex-1 w-full max-w-[1600px] p-6  flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mx-auto"
//       >
        
//         {/* Left Content */}
//         <div className="flex-1 flex flex-col gap-6 max-sm:text-center">
//           <h1 className="text-5xl font-extrabold text-[#A3B886] mb-2 leading-tight font-audiowide">
//             Evenza
//           </h1>
//           <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//             Book, Create, and Manage Events Effortlessly
//           </h2>
//           <p className="text-lg text-gray-700 mb-2 leading-relaxed">
//             <span className="font-semibold text-[#A3B886]">Evenza</span> is your one-stop platform for all things events. 
//             Whether you want to <span className="font-semibold">book</span> a wedding hall, 
//             <span className="font-semibold"> host</span> a conference, or 
//             <span className="font-semibold"> manage</span> your own parties, we make it easy, fast, and professional.
//           </p>

//           <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4 max-sm:text-left">
//             <li>Book venues and events anywhere, anytime</li>
//             <li>Create and promote your own events</li>
//             <li>Track bookings, manage attendees, and get real-time analytics</li>
//             <li>Modern, responsive dashboard for organizers and users</li>
//             <li>Secure, seamless, and user-friendly experience</li>
//           </ul>

//           <div className="font-audiowide flex flex-wrap gap-4 mt-2 max-sm:justify-center">
//             <button onClick={()=>navigate('/userSignup')} className="px-8 py-3 text-lg rounded-xl bg-[#A3B886] text-white font-semibold hover:bg-[#7c8e62] transition-transform hover:scale-105">
//               Create Event
//             </button>
//             <button className="px-8 py-3 text-lg rounded-xl bg-black text-white font-semibold hover:bg-[#333] transition-transform hover:scale-105">
//               Book Event
//             </button>
//           </div>
//         </div>

//         {/* Image Slider */}
//         <div className="flex-1 flex flex-col gap-6 items-center w-full">
//           <div className="relative w-full max-w-xl h-72 md:h-96 flex items-center justify-center rounded-2xl overflow-hidden">
//             <img
//               src={images[current]}
//               alt={`Event ${current + 1}`}
//               className="object-cover w-full h-full transition-all duration-700"
//             />
//             {/* Prev Button */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#A3B886]/40 text-black rounded-full p-2 z-10 transition"
//               aria-label="Previous"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             {/* Next Button */}
//             <button
//               onClick={nextSlide}
//               className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#A3B886]/40 text-black rounded-full p-2 z-10 transition"
//               aria-label="Next"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//             {/* Dots */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//               {images.map((_, idx) => (
//                 <span
//                   key={idx}
//                   className={`w-3 h-3 rounded-full ${idx === current ? 'bg-[#A3B886]' : 'bg-gray-300'} transition-all duration-300`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Features Section */}
//       <div className="w-full bg-white py-5">
//         <div 
//           data-aos="fade-up"
//           className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6"
//         >
//           {[
//             {
//               icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
//               title: "Book Instantly",
//               desc: "Find and book events or venues in seconds. No hassle, just fun and convenience!",
//               animation: "fade-right"
//             },
//             {
//               icon: 'M9 17v-2a4 4 0 018 0v2m-4-4V7a4 4 0 10-8 0v6a4 4 0 008 0z',
//               title: "Host Effortlessly",
//               desc: "Create, manage, and promote your own events with a few clicks. Grow your audience easily.",
//               animation: "fade-up"
//             },
//             {
//               icon: 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v7m0 0H9m3 0h3',
//               title: "All-in-One Dashboard",
//               desc: "Track bookings, manage attendees, and get analytics in one place. Everything you need, beautifully organized.",
//               animation: "fade-left"
//             }
//           ].map((feature, idx) => (
//             <div
//               key={idx}
//               data-aos={feature.animation}
//               data-aos-delay={idx * 100}
//               className="bg-white rounded-2xl p-10 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-transform"
//             >
//               <svg className="w-14 h-14 text-[#A3B886] mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
//               </svg>
//               <h3 className="font-audiowide font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
//               <p className="text-gray-600">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;


import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EventsImg1 from "../../assets/EventsImg1.jpg";
import EventsImg2 from "../../assets/EventsImg2.jpg";
import EventsImg3 from "../../assets/EventsImg3.jpg";
import { useNavigate } from "react-router-dom";

const Events = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const images = [EventsImg1, EventsImg2, EventsImg3];
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      className="min-h-screen w-full relative flex flex-col z-0"
      id="Events"
      style={{
        backgroundImage: `url(${EventsImg2})`, // background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto px-6 py-12 z-10">
        
        {/* Left Text Section */}
        <div data-aos="fade-right" className="flex-1 text-white space-y-6 lg:pr-10">
          <h1 className="text-5xl font-extrabold leading-tight font-audiowide">
            Welcome to <span className="text-[#A3B886]">Evenza</span>
          </h1>
          <p className="text-lg leading-relaxed">
            The ultimate platform to <span className="font-bold text-[#A3B886]">Book</span>,{" "}
            <span className="font-bold text-[#A3B886]">Host</span> and{" "}
            <span className="font-bold text-[#A3B886]">Manage</span> events effortlessly.
          </p>

          <ul className="space-y-2 text-gray-200">
            <li>✔ Instant event bookings</li>
            <li>✔ Manage attendees with ease</li>
            <li>✔ Modern dashboard for hosts</li>
            <li>✔ Secure & seamless experience</li>
          </ul>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => navigate("/userSignup")}
              className="px-8 py-3 text-lg rounded-xl bg-[#A3B886] text-white font-semibold hover:bg-[#7c8e62] transition-transform hover:scale-105"
            >
              Create Event
            </button>
            <button className="px-8 py-3 text-lg rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-transform hover:scale-105">
              Book Event
            </button>
          </div>
        </div>

        {/* Right Slider Section */}
        <div data-aos="fade-left" className="flex-1 mt-10 lg:mt-0 flex items-center justify-center">
          <div className="relative w-full max-w-lg h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg z-10">
            <img
              src={images[current]}
              alt={`Event ${current + 1}`}
              className="object-cover w-full h-full transition-all duration-700"
            />

            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#A3B886]/60 text-white rounded-full p-2 transition z-20"
              aria-label="Previous"
            >
              ❮
            </button>
            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#A3B886]/60 text-white rounded-full p-2 transition z-20"
              aria-label="Next"
            >
              ❯
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full ${idx === current ? "bg-[#A3B886]" : "bg-gray-400"} transition`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
