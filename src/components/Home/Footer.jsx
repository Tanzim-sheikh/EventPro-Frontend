// import React from "react";
// import logo from "../../assets/letter-e.png";
// import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="w-full bg-[#A3B886] text-white px-6 py-12 md:px-16">
//       <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
//         {/* Brand */}
//         <div>
//           <div className="mb-4 flex items-center gap-2">
//             <img
//               src={logo}
//               alt="Evenza Logo"
//               className="h-10 w-auto object-contain"
//             />
//             <span className="text-2xl font-extrabold font-audiowide">Evenza</span>
//           </div>
//           <p className="text-sm leading-relaxed mb-6">
//             Your trusted platform to create, organize and manage events
//             effortlessly.
//           </p>
//           <div className="flex gap-4">
//             <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A3B886] hover:bg-[#6e8151] hover:text-white transition">
//               <FaTwitter />
//             </a>
//             <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A3B886] hover:bg-[#6e8151] hover:text-white transition">
//               <FaFacebook />
//             </a>
//             <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A3B886] hover:bg-[#6e8151] hover:text-white transition">
//               <FaInstagram />
//             </a>
//             <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A3B886] hover:bg-[#6e8151] hover:text-white transition">
//               <FaLinkedin />
//             </a>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="grid grid-cols-2 gap-8 text-sm">
//           <div>
//             <h3 className="text-lg font-semibold font-audiowide mb-4">
//               Quick Links
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="/" className="hover:text-orange-300 transition">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="/events" className="hover:text-orange-300 transition">
//                   Events
//                 </a>
//               </li>
//               <li>
//                 <a href="/about" className="hover:text-orange-300 transition">
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a href="/contact" className="hover:text-orange-300 transition">
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold font-audiowide mb-4">
//               Resources
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="hover:text-orange-300 transition">
//                   Help Center
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-orange-300 transition">
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-orange-300 transition">
//                   Tutorials
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-orange-300 transition">
//                   FAQs
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h3 className="text-lg font-semibold font-audiowide mb-4">
//             Stay Updated
//           </h3>
//           <p className="text-sm mb-4">
//             Subscribe to get the latest event updates and offers.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="flex-1 px-4 py-2 rounded-md bg-[#e2ead5] text-[#5a6b47] placeholder-[#8C9F6E] focus:outline-none focus:ring-2 focus:ring-orange-300"
//             />
//             <button className="px-5 py-2 bg-white text-[#A3B886] font-semibold rounded-md hover:bg-orange-400 hover:text-white transition">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bottom */}
//       <div className="border-t border-[#a8b892] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
//         <p>
//           &copy; {new Date().getFullYear()} Evenza. All rights reserved.
//         </p>
//         <div className="flex gap-6 mt-4 md:mt-0">
//           <a href="#" className="hover:text-orange-300 transition">
//             Privacy Policy
//           </a>
//           <a href="#" className="hover:text-orange-300 transition">
//             Terms of Service
//           </a>
//           <a href="#" className="hover:text-orange-300 transition">
//             Cookie Policy
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import logo from "../../assets/letter-e.png";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-tr from-[#7D915D] via-[#A3B886] to-[#B4C49A] text-white px-6 py-12 md:px-16 shadow-inner backdrop-blur-sm border-t border-[#d8e3c9]/30">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm"></div>
              <img 
                src={logo} 
                alt="Evenza Logo" 
                className="relative h-10 w-auto object-contain" 
              />
            </div>
            <span className="text-2xl font-extrabold font-audiowide drop-shadow-sm">Evenza</span>
          </div>
          <p className="text-sm leading-relaxed mb-6 text-white/90">
            Your trusted platform to create, organize and manage events effortlessly.
          </p>
          <div className="flex gap-3">
            <a 
              href="#" 
              aria-label="Twitter"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-[#5a6b47] transition-all duration-300 hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a 
              href="#" 
              aria-label="Facebook"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-[#5a6b47] transition-all duration-300 hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a 
              href="#" 
              aria-label="Instagram"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-[#5a6b47] transition-all duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a 
              href="#" 
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-[#5a6b47] transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-semibold font-audiowide mb-4 drop-shadow-sm">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-orange-300 transition-colors duration-200 text-white/90 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-orange-300 transition-colors duration-200 text-white/90 hover:text-white">
                  Events
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-orange-300 transition-colors duration-200 text-white/90 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-300 transition-colors duration-200 text-white/90 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-audiowide mb-4 drop-shadow-sm">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-orange-300 transition-colors duration-200 text-white/90 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-300 transition-colors duration-200 text-white/90 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-300 transition-colors duration-200 text-white/90 hover:text-white">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-300 transition-colors duration-200 text-white/90 hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold font-audiowide mb-4 drop-shadow-sm">
            Stay Updated
          </h3>
          <p className="text-sm mb-4 text-white/90">
            Subscribe to get the latest event updates and offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
            />
            <button className="px-6 py-3 bg-white text-[#5a6b47] font-semibold rounded-xl hover:bg-orange-400 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-white/80">
          &copy; {new Date().getFullYear()} Evenza. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-orange-300 transition-colors duration-200 text-white/80 hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-orange-300 transition-colors duration-200 text-white/80 hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-orange-300 transition-colors duration-200 text-white/80 hover:text-white">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;