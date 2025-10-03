import React from "react";
import logo from "../../assets/letter-e.png";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#A3B886] text-white px-6 py-12 md:px-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <img
              src={logo}
              alt="Evenza Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-2xl font-extrabold font-audiowide">Evenza</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Your trusted platform to create, organize and manage events
            effortlessly.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A3B886] hover:bg-[#6e8151] hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A3B886] hover:bg-[#6e8151] hover:text-white transition">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A3B886] hover:bg-[#6e8151] hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A3B886] hover:bg-[#6e8151] hover:text-white transition">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-semibold font-audiowide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-orange-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-orange-300 transition">
                  Events
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-orange-300 transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-300 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-audiowide mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-300 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-300 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-300 transition">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-300 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold font-audiowide mb-4">
            Stay Updated
          </h3>
          <p className="text-sm mb-4">
            Subscribe to get the latest event updates and offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-md bg-[#e2ead5] text-[#5a6b47] placeholder-[#8C9F6E] focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button className="px-5 py-2 bg-white text-[#A3B886] font-semibold rounded-md hover:bg-orange-400 hover:text-white transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#a8b892] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Evenza. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-orange-300 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-orange-300 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-orange-300 transition">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const Footer = () => {
//   const footerRef = useRef(null);

//   useEffect(() => {
//     const footer = footerRef.current;

//     gsap.set(footer, { y: 80, opacity: 0 });

//     gsap.to(footer, {
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: footer,
//         start: "top bottom-=80",
//         toggleActions: "play none none none",
//         once: true,
//       },
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <footer
//       ref={footerRef}
//       className="w-full bg-gradient-to-b from-[#6e8151] to-[#5a6b47] text-white px-6 py-16 md:px-16 relative overflow-hidden"
//     >
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2Utb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNIDAgMCBMIDYwIDYwIE0gNjAgMCBMIDAgNjAiLz48L2c+PC9zdmc+')]"></div>
//       </div>
      
//       {/* Top accent line */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f5d56e] to-[#f8c762]"></div>
      
//       <div className="max-w-[1400px] mx-auto relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           {/* Brand Section */}
//           <div className="lg:col-span-4">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-md bg-gradient-to-r from-[#f5d56e] to-[#f8c762] flex items-center justify-center mr-3 shadow-lg">
//                 <span className="text-[#5a6b47] font-bold text-lg">E</span>
//               </div>
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f5d56e] to-[#f8c762] bg-clip-text text-transparent">
//                 Evenza
//               </h2>
//             </div>
//             <p className="text-[#e2ead5] leading-relaxed mb-6 max-w-md">
//               Your trusted platform to create, organize and manage events effortlessly. 
//               Professional tools for exceptional events.
//             </p>
//             <div className="flex gap-3">
//               {["twitter", "facebook", "instagram", "linkedin"].map((icon) => (
//                 <a
//                   key={icon}
//                   href="#"
//                   className="w-10 h-10 flex items-center justify-center rounded-md bg-[#5a6b47] text-[#e2ead5] hover:bg-gradient-to-r hover:from-[#f5d56e] hover:to-[#f8c762] hover:text-[#5a6b47] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#f5d56e]/20"
//                 >
//                   <i className={`fab fa-${icon}`}></i>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold mb-5 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-[#f5d56e] after:to-[#f8c762]">
//                 Quick Links
//               </h3>
//               <ul className="space-y-3">
//                 {["Home", "Events", "About", "Contact"].map((item) => (
//                   <li key={item}>
//                     <a 
//                       href="#" 
//                       className="text-[#e2ead5] hover:text-[#f5d56e] transition-all duration-300 flex items-center group"
//                     >
//                       <span className="w-1 h-1 bg-[#f5d56e] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-5 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-[#f5d56e] after:to-[#f8c762]">
//                 Resources
//               </h3>
//               <ul className="space-y-3">
//                 {["Help Center", "Blog", "Tutorials", "FAQs"].map((item) => (
//                   <li key={item}>
//                     <a 
//                       href="#" 
//                       className="text-[#e2ead5] hover:text-[#f5d56e] transition-all duration-300 flex items-center group"
//                     >
//                       <span className="w-1 h-1 bg-[#f5d56e] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Newsletter */}
//           <div className="lg:col-span-3">
//             <h3 className="text-lg font-semibold mb-5 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-[#f5d56e] after:to-[#f8c762]">
//               Stay Updated
//             </h3>
//             <p className="text-[#e2ead5] mb-5">
//               Subscribe to get the latest event updates and exclusive offers.
//             </p>
//             <div className="space-y-3">
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 className="w-full px-4 py-3 rounded-lg bg-[#5a6b47] border border-[#6e8151] text-white placeholder-[#a8b892] focus:outline-none focus:ring-2 focus:ring-[#f5d56e] focus:border-transparent transition-all"
//               />
//               <button className="w-full py-3 bg-gradient-to-r from-[#f5d56e] to-[#f8c762] text-[#5a6b47] font-medium rounded-lg hover:shadow-lg hover:shadow-[#f5d56e]/30 transition-all duration-300">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="border-t border-[#6e8151] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-[#a8b892] text-sm mb-4 md:mb-0">
//             &copy; {new Date().getFullYear()} Evenza. All rights reserved.
//           </p>
//           <div className="flex flex-wrap gap-5 justify-center">
//             {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
//               <a 
//                 key={item} 
//                 href="#" 
//                 className="text-[#a8b892] hover:text-[#f5d56e] transition-colors duration-300 text-sm"
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;