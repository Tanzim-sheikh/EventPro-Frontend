// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import EventsImg1 from "../../assets/EventsImg1.jpg";
// import EventsImg2 from "../../assets/EventsImg2.jpg";
// import EventsImg3 from "../../assets/EventsImg3.jpg";
// import { useNavigate } from "react-router-dom";

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
//     <div
//       className="min-h-screen w-full relative flex flex-col z-0"
//       id="Events"
//       style={{
//         backgroundImage: `url(${EventsImg2})`, // background image
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Content */}
//       <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto px-6 py-12 z-10">
        
//         {/* Left Text Section */}
//         <div data-aos="fade-right" className="flex-1 text-white space-y-6 lg:pr-10">
//           <h1 className="text-5xl font-extrabold leading-tight font-audiowide">
//             Welcome to <span className="text-[#A3B886]">Evenza</span>
//           </h1>
//           <p className="text-lg leading-relaxed">
//             The ultimate platform to <span className="font-bold text-[#A3B886]">Book</span>,{" "}
//             <span className="font-bold text-[#A3B886]">Host</span> and{" "}
//             <span className="font-bold text-[#A3B886]">Manage</span> events effortlessly.
//           </p>

//           <ul className="space-y-2 text-gray-200">
//             <li>✔ Instant event bookings</li>
//             <li>✔ Manage attendees with ease</li>
//             <li>✔ Modern dashboard for hosts</li>
//             <li>✔ Secure & seamless experience</li>
//           </ul>

//           <div className="flex gap-4 pt-4">
//             <button
//               onClick={() => navigate("/userSignup")}
//               className="px-8 py-3 text-lg rounded-xl bg-[#A3B886] text-white font-semibold hover:bg-[#7c8e62] transition-transform hover:scale-105"
//             >
//               Create Event
//             </button>
//             <button className="px-8 py-3 text-lg rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-transform hover:scale-105">
//               Book Event
//             </button>
//           </div>
//         </div>

//         {/* Right Slider Section */}
//         <div data-aos="fade-left" className="flex-1 mt-10 lg:mt-0 flex items-center justify-center">
//           <div className="relative w-full max-w-lg h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg z-10">
//             <img
//               src={images[current]}
//               alt={`Event ${current + 1}`}
//               className="object-cover w-full h-full transition-all duration-700"
//             />

//             {/* Prev Button */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#A3B886]/60 text-white rounded-full p-2 transition z-20"
//               aria-label="Previous"
//             >
//               ❮
//             </button>
//             {/* Next Button */}
//             <button
//               onClick={nextSlide}
//               className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#A3B886]/60 text-white rounded-full p-2 transition z-20"
//               aria-label="Next"
//             >
//               ❯
//             </button>

//             {/* Dots */}
//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
//               {images.map((_, idx) => (
//                 <span
//                   key={idx}
//                   className={`w-3 h-3 rounded-full ${idx === current ? "bg-[#A3B886]" : "bg-gray-400"} transition`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;


// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import EventsImg1 from "../../assets/EventsImg1.jpg";
// import EventsImg2 from "../../assets/EventsImg2.jpg";
// import EventsImg3 from "../../assets/EventsImg3.jpg";
// import { useNavigate } from "react-router-dom";

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

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   const goToSlide = (index) => {
//     setCurrent(index);
//   };

//   return (
//     <div className="min-h-screen w-full bg-white py-16 lg:py-24" id="Events">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
//           {/* Left Text Section */}
//           <div 
//             data-aos="fade-right" 
//             className="flex-1 space-y-8 lg:pr-8"
//           >
//             <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
//               Discover & Create{" "}
//               <span className="text-[#A3B886]">Memorable</span> Events
//             </h1>
            
//             <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
//               The ultimate platform to{" "}
//               <span className="font-semibold text-[#A3B886]">book</span>,{" "}
//               <span className="font-semibold text-[#A3B886]">host</span>, and{" "}
//               <span className="font-semibold text-[#A3B886]">manage</span>{" "}
//               events with unparalleled ease and efficiency.
//             </p>

//             <ul className="space-y-4 text-gray-700">
//               <li className="flex items-center gap-3">
//                 <div className="w-6 h-6 bg-[#A3B886] rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//                 <span>Instant event bookings & registrations</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <div className="w-6 h-6 bg-[#A3B886] rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//                 <span>Smart attendee management system</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <div className="w-6 h-6 bg-[#A3B886] rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//                 <span>Modern dashboard for event organizers</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <div className="w-6 h-6 bg-[#A3B886] rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//                 <span>Secure & seamless user experience</span>
//               </li>
//             </ul>

//             <div className="flex flex-col sm:flex-row gap-4 pt-6">
//               <button
//                 onClick={() => navigate("/userSignup")}
//                 className="px-8 py-4 text-lg font-semibold bg-[#A3B886] text-white rounded-xl hover:bg-[#8fa874] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#A3B886]/30"
//               >
//                 Create Event
//               </button>
//               <button 
//                 onClick={() => navigate("/events")}
//                 className="px-8 py-4 text-lg font-semibold bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-[#A3B886] hover:text-[#A3B886] transition-all duration-300 hover:scale-105"
//               >
//                 Book Event
//               </button>
//             </div>
//           </div>

//           {/* Right Image Slider Section */}
//           <div 
//             data-aos="fade-left" 
//             className="flex-1 flex items-center justify-center w-full max-w-2xl"
//           >
//             <div className="relative w-full">
//               {/* Main Image Container with Tilt */}
//               <div className="relative">
//                 <div className="transform -rotate-2 transition-transform duration-500">
//                   <img
//                     src={images[current]}
//                     alt={`Event ${current + 1}`}
//                     className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
//                   />
                  
//                   {/* Navigation Arrow */}
//                   <button
//                     onClick={nextSlide}
//                     className="absolute top-4 right-4 w-12 h-12 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
//                     aria-label="Next image"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>

//                   {/* Image Counter */}
//                   <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
//                     {current + 1}/{images.length}
//                   </div>

//                   {/* Action Button */}
//                   <button className="absolute bottom-4 left-4 px-6 py-3 bg-[#A3B886] text-white rounded-full font-semibold shadow-lg shadow-[#A3B886]/50 hover:scale-105 transition-all duration-300">
//                     View Details
//                   </button>
//                 </div>
//               </div>

//               {/* Vertical Thumbnail Navigation */}
//               <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
//                 {images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToSlide(index)}
//                     className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 transform hover:scale-110 ${
//                       index === current 
//                         ? "border-[#A3B886] shadow-lg shadow-[#A3B886]/50" 
//                         : "border-white shadow-md"
//                     }`}
//                   >
//                     <img
//                       src={image}
//                       alt={`Thumbnail ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;

// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import EventsImg1 from "../../assets/EventsImg1.jpg";
// import EventsImg2 from "../../assets/EventsImg2.jpg";
// import EventsImg3 from "../../assets/EventsImg3.jpg";
// import { useNavigate } from "react-router-dom";

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

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   const goToSlide = (index) => {
//     setCurrent(index);
//   };

//   return (
//     <div className="min-h-screen w-full bg-white py-12 lg:py-20 flex items-center" id="Events">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
          
//           {/* Left Container - Text Section */}
//           <div 
//             data-aos="fade-right" 
//             className="w-full lg:w-2/5 space-y-6 lg:space-y-8"
//           >
//             <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
//               Discover & Create{" "}
//               <span className="text-[#A3B886]">Memorable</span> Events
//             </h1>
            
//             <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
//               The ultimate platform to{" "}
//               <span className="font-semibold text-[#A3B886]">book</span>,{" "}
//               <span className="font-semibold text-[#A3B886]">host</span>, and{" "}
//               <span className="font-semibold text-[#A3B886]">manage</span>{" "}
//               events with unparalleled ease.
//             </p>

//             <ul className="space-y-3 text-gray-700">
//               <li className="flex items-center gap-3">
//                 <div className="w-5 h-5 bg-[#A3B886] rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base">Instant event bookings & registrations</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <div className="w-5 h-5 bg-[#A3B886] rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base">Smart attendee management system</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <div className="w-5 h-5 bg-[#A3B886] rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base">Modern dashboard for organizers</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <div className="w-5 h-5 bg-[#A3B886] rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base">Secure & seamless experience</span>
//               </li>
//             </ul>

//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <button
//                 onClick={() => navigate("/userSignup")}
//                 className="px-6 py-3 lg:px-8 lg:py-3 text-base font-semibold bg-[#A3B886] text-white rounded-xl hover:bg-[#8fa874] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#A3B886]/30"
//               >
//                 Create Event
//               </button>
//               <button 
//                 onClick={() => navigate("/events")}
//                 className="px-6 py-3 lg:px-8 lg:py-3 text-base font-semibold bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-[#A3B886] hover:text-[#A3B886] transition-all duration-300 hover:scale-105"
//               >
//                 Book Event
//               </button>
//             </div>
//           </div>

//           {/* Middle Container - Main Image Slider */}
//           <div 
//             data-aos="fade-up" 
//             className="w-full lg:w-2/5 flex items-center justify-center relative order-2 lg:order-none"
//           >
//             <div className="relative w-full max-w-md">
//               {/* Main Image Container with Tilt */}
//               <div className="transform -rotate-2 transition-transform duration-500 relative">
//                 <img
//                   src={images[current]}
//                   alt={`Event ${current + 1}`}
//                   className="w-full h-72 lg:h-80 xl:h-96 object-cover rounded-xl shadow-xl"
//                 />
                
//                 {/* Left Arrow Button - Half Outside */}
//                 <button
//                   onClick={nextSlide}
//                   className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white border-2 border-gray-200 hover:border-[#A3B886] text-gray-700 hover:text-[#A3B886] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
//                   aria-label="Next image"
//                 >
//                   <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>

//                 {/* View Button - Half Outside Bottom Left */}
//                 <div className="absolute -bottom-4 -left-4 flex flex-col items-center">
//                   {/* Upward Arrow Icon */}
//                   <svg className="w-4 h-4 text-[#A3B886] mb-1" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M7 14l5-5 5 5z"/>
//                   </svg>
//                   {/* View Button */}
//                   <button className="px-5 py-2 lg:px-6 lg:py-2.5 bg-[#A3B886] text-white rounded-full font-semibold text-sm lg:text-base shadow-lg shadow-[#A3B886]/50 hover:scale-105 transition-all duration-300 whitespace-nowrap">
//                     View
//                   </button>
//                 </div>

//                 {/* Image Counter */}
//                 <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-medium backdrop-blur-sm">
//                   {current + 1}/{images.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Container - Vertical Thumbnails */}
//           <div className="w-full lg:w-1/5 flex justify-center lg:justify-start order-1 lg:order-none">
//             <div className="flex lg:flex-col gap-4 lg:gap-6">
//               {images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 ${
//                     index === current 
//                       ? "border-[#A3B886] shadow-lg shadow-[#A3B886]/40 scale-105" 
//                       : "border-gray-200 shadow-sm"
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
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

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="w-full bg-white py-8 lg:py-12 flex items-center" id="Events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">
          
          {/* Left Container - Text Section */}
          <div 
            data-aos="fade-right" 
            className="w-full lg:w-[45%] space-y-6"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
              Discover & Create{" "}
              <span className="text-[#A3B886]">Memorable</span> Events
            </h1>
            
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              The ultimate platform to{" "}
              <span className="font-semibold text-[#A3B886]">book</span>,{" "}
              <span className="font-semibold text-[#A3B886]">host</span>, and{" "}
              <span className="font-semibold text-[#A3B886]">manage</span>{" "}
              events with unparalleled ease.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#A3B886] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm lg:text-base">Instant event bookings & registrations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#A3B886] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm lg:text-base">Smart attendee management system</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#A3B886] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm lg:text-base">Modern dashboard for organizers</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#A3B886] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm lg:text-base">Secure & seamless experience</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate("/userSignup")}
                className="px-6 py-3 lg:px-7 lg:py-3 text-sm lg:text-base font-semibold bg-[#A3B886] text-white rounded-lg hover:bg-[#8fa874] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#A3B886]/30"
              >
                Create Event
              </button>
              <button 
                onClick={() => navigate("/events")}
                className="px-6 py-3 lg:px-7 lg:py-3 text-sm lg:text-base font-semibold bg-white text-gray-900 border border-gray-300 rounded-lg hover:border-[#A3B886] hover:text-[#A3B886] transition-all duration-300 hover:scale-105"
              >
                Book Event
              </button>
            </div>
          </div>

          {/* Middle Container - Main Image Slider */}
          <div 
            data-aos="fade-up" 
            className="w-full lg:w-[45%] flex items-center justify-center relative order-2 lg:order-none"
          >
            <div className="relative w-full max-w-lg">
              {/* Main Image Container with Tilt */}
              <div className="transform -rotate-2 transition-transform duration-500 relative">
                <img
                  src={images[current]}
                  alt={`Event ${current + 1}`}
                  className="w-full h-72 lg:h-80 xl:h-96 object-cover rounded-xl shadow-xl"
                />
                
                {/* Left Arrow Button - Half Outside */}
                <button
                  onClick={nextSlide}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white border-2 border-gray-200 hover:border-[#A3B886] text-gray-700 hover:text-[#A3B886] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* View Button - Half Outside Bottom Left */}
                <div className="absolute -bottom-4 -left-4 flex flex-col items-center">
                  {/* Upward Arrow Icon */}
                  <svg className="w-4 h-4 text-[#A3B886] mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14l5-5 5 5z"/>
                  </svg>
                  {/* View Button */}
                  <button className="px-5 py-2 lg:px-6 lg:py-2.5 bg-[#A3B886] text-white rounded-full font-semibold text-sm lg:text-base shadow-lg shadow-[#A3B886]/50 hover:scale-105 transition-all duration-300 whitespace-nowrap">
                    View
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-medium backdrop-blur-sm">
                  {current + 1}/{images.length}
                </div>
              </div>
            </div>
          </div>

          {/* Right Container - Vertical Thumbnails */}
          <div className="w-full lg:w-[10%] flex justify-center lg:justify-start order-1 lg:order-none ml-8">
            <div className="flex lg:flex-col gap-3 lg:gap-4 items-center">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 ${
                    index === current 
                      ? "border-[#A3B886] shadow-lg shadow-[#A3B886]/40 scale-105" 
                      : "border-gray-200 shadow-sm"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;