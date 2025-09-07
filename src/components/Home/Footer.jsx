// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="w-full bg-[#8C9F6E] text-white py-12 px-4 clip-footer rounded-tr-[40px]">
//       <div className="max-w-[1600px] mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand Section */}
//           <div className="flex flex-col">
//             <span className="text-2xl font-extrabold tracking-wide text-white mb-4 font-audiowide">EventPro</span>
//             <p className="text-white mb-4">Your premier platform for event management. Create, organize, and manage events with ease.</p>
//             <div className="flex gap-4 mt-2">
//               <a href="#" aria-label="Twitter" className="hover:text-[#8C9F6E] transition">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.28 0-.56-.02-.83-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/>
//                 </svg>
//               </a>
//               <a href="#" aria-label="Facebook" className="hover:text-[#8C9F6E] transition">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M22.68 0H1.32C.59 0 0 .6 0 1.33v21.34C0 23.4.59 24 1.32 24h11.5v-9.29H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.65-4.79 1.32 0 2.45.1 2.78.14v3.22h-1.91c-1.5 0-1.8.71-1.8 1.76v2.31h3.6l-.47 3.62h-3.13V24h6.13c.73 0 1.32-.6 1.32-1.33V1.33C24 .6 23.41 0 22.68 0"/>
//                 </svg>
//               </a>
//               <a href="#" aria-label="Instagram" className="hover:text-[#8C9F6E] transition">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
//                 </svg>
//               </a>
//               <a href="#" aria-label="LinkedIn" className="hover:text-[#8C9F6E] transition">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20.5h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.25 11.25h-3v-5.5c0-1.32-.03-3.01-1.84-3.01-1.84 0-2.12 1.43-2.12 2.91v5.6h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="text-white flex flex-col">
//             <h3 className="text-lg font-semibold text-white mb-4 font-audiowide">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><a href="/" className="text-white hover:text-[#8C9F6E] transition">Home</a></li>
//               <li><a href="/events" className="text-white hover:text-[#8C9F6E] transition">Events</a></li>
//               <li><a href="/about" className="text-white hover:text-[#8C9F6E] transition">About</a></li>
//               <li><a href="/contact" className="text-white hover:text-[#8C9F6E] transition">Contact</a></li>
//             </ul>
//           </div>

//           {/* Resources */}
//           <div className="flex flex-col">
//             <h3 className="text-lg font-semibold text-white mb-4 font-audiowide">Resources</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-white hover:text-[#8C9F6E] transition">Help Center</a></li>
//               <li><a href="#" className="text-white hover:text-[#8C9F6E] transition">Blog</a></li>
//               <li><a href="#" className="text-white hover:text-[#8C9F6E] transition">Tutorials</a></li>
//               <li><a href="#" className="text-white hover:text-[#8C9F6E] transition">FAQs</a></li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="flex flex-col">
//             <h3 className="text-lg font-semibold text-white mb-4 font-audiowide">Stay Updated</h3>
//             <p className="text-white mb-4">Subscribe to our newsletter for the latest updates.</p>
//             <div className="flex flex-col gap-2">
//               <input 
//                 type="email" 
//                 placeholder="Your email" 
//                 className="flex-1 px-4 py-2 rounded-md bg-[#e2ead5] text-[#5a6b47] placeholder-[#8C9F6E] focus:outline-none focus:ring-2 focus:ring-[#8C9F6E]"
//               />

//               <button className="px-4 py-2 bg-[#8C9F6E] text-white rounded-md hover:bg-[#7a8c5e] transition">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-[#8C9F6E] pt-6 flex flex-col md:flex-row justify-between items-center">
//           <div className="text-white text-sm">
//             &copy; {new Date().getFullYear()} EventPro. All rights reserved.
//           </div>
//           <div className="flex gap-6 mt-4 md:mt-0">
//             <a href="#" className="text-white hover:text-[#8C9F6E] text-sm transition">Privacy Policy</a>
//             <a href="#" className="text-white hover:text-[#8C9F6E] text-sm transition">Terms of Service</a>
//             <a href="#" className="text-white hover:text-[#8C9F6E] text-sm transition">Cookie Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;

    // Set initial state
    gsap.set(footer, { y: 100, opacity: 0 });

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top bottom-=100",
        toggleActions: "play none none none",
        once: true
      }
    });

    // Animate in
    tl.to(footer, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#8C9F6E] text-white py-12 px-4 clip-footer rounded-tr-[44px] max-sm:text-center"
    >
      {/* Rest of your footer content remains the same */}
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          {/* Brand Section */}
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-wide text-white mb-4 font-audiowide">EventPro</span>
            <p className="text-white mb-4">Your premier platform for event management. Create, organize, and manage events with ease.</p>
            <div className="flex gap-4 mt-2 max-sm:justify-center max-sm:gap-8">
              <a href="#" aria-label="Twitter" className="hover:text-[#8C9F6E] transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.28 0-.56-.02-.83-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[#8C9F6E] transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.68 0H1.32C.59 0 0 .6 0 1.33v21.34C0 23.4.59 24 1.32 24h11.5v-9.29H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.65-4.79 1.32 0 2.45.1 2.78.14v3.22h-1.91c-1.5 0-1.8.71-1.8 1.76v2.31h3.6l-.47 3.62h-3.13V24h6.13c.73 0 1.32-.6 1.32-1.33V1.33C24 .6 23.41 0 22.68 0" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-[#8C9F6E] transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[#8C9F6E] transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20.5h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.25 11.25h-3v-5.5c0-1.32-.03-3.01-1.84-3.01-1.84 0-2.12 1.43-2.12 2.91v5.6h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex justify-evenly gap-10 max-sm:flex-row max-sm:justify-center max-sm:gap-8">
            {/* Quick Links */}
            <div className="text-white flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-4 font-audiowide">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-white hover:text-[#8C9F6E] transition">Home</a></li>
                <li><a href="/events" className="text-white hover:text-[#8C9F6E] transition">Events</a></li>
                <li><a href="/about" className="text-white hover:text-[#8C9F6E] transition">About</a></li>
                <li><a href="/contact" className="text-white hover:text-[#8C9F6E] transition">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col">
              <h3 className=" text-lg font-semibold text-white mb-4 font-audiowide">Resources</h3>
              <ul className=" space-y-2">
                <li><a href="#" className="text-white hover:text-[#8C9F6E] transition">Help Center</a></li>
                <li><a href="#" className="text-white hover:text-[#8C9F6E] transition">Blog</a></li>
                <li><a href="#" className="text-white hover:text-[#8C9F6E] transition">Tutorials</a></li>
                <li><a href="#" className="text-white hover:text-[#8C9F6E] transition">FAQs</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col max-sm:text-center">
            <h3 className="text-lg font-semibold text-white mb-4 font-audiowide">Stay Updated</h3>
            <p className="text-white mb-4">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-md bg-[#e2ead5] text-[#5a6b47] placeholder-[#8C9F6E] focus:outline-none focus:ring-2 focus:ring-[#8C9F6E]"
              />
              <button className="px-4 py-2 bg-white text-[#8C9F6E] rounded-md hover:bg-[#7a8c5e] hover:text-white transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#8C9F6E] pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white text-sm">
            &copy; {new Date().getFullYear()} EventPro. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-[#8C9F6E] text-sm transition">Privacy Policy</a>
            <a href="#" className="text-white hover:text-[#8C9F6E] text-sm transition">Terms of Service</a>
            <a href="#" className="text-white hover:text-[#8C9F6E] text-sm transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;