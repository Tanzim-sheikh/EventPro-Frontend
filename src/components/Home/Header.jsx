// import React, { useState, useEffect, Fragment, useRef } from "react";
// import { createPortal } from 'react-dom';
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
//   const userMenuButtonRef = useRef(null);
//   const userMenuRef = useRef(null);
//   const [userMenuPosition, setUserMenuPosition] = useState({ top: 0, left: 0 });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isAuthenticated, user, logout } = useAuth();

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);

//   const handleNavToSection = async (sectionId) => {
//     const goScroll = () => {
//       const el = document.getElementById(sectionId);
//       if (el) {
//         el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     };
//     if (location.pathname !== '/') {
//       navigate('/');
//       requestAnimationFrame(() => {
//         setTimeout(goScroll, 0);
//       });
//     } else {
//       goScroll();
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen) {
//       const prev = document.body.style.overflow;
//       document.body.style.overflow = 'hidden';
//       return () => { document.body.style.overflow = prev; };
//     }
//   }, [isMenuOpen]);

//   useEffect(() => {
//     if (!isUserMenuOpen) return;
//     const updatePosition = () => {
//       const buttonEl = userMenuButtonRef.current;
//       if (!buttonEl) return;
//       const rect = buttonEl.getBoundingClientRect();
//       // Dropdown width is w-56 => 14rem => 224px
//       const dropdownWidth = 224;
//       setUserMenuPosition({
//         top: rect.bottom + window.scrollY + 8,
//         left: rect.right + window.scrollX - dropdownWidth,
//       });
//     };
//     updatePosition();
//     window.addEventListener('resize', updatePosition);
//     window.addEventListener('scroll', updatePosition, true);

//     const onDocClick = (e) => {
//       const btn = userMenuButtonRef.current;
//       const menu = userMenuRef.current;
//       if (!btn || !menu) return;
//       if (btn.contains(e.target) || menu.contains(e.target)) return;
//       setIsUserMenuOpen(false);
//     };
//     document.addEventListener('mousedown', onDocClick);

//     return () => {
//       window.removeEventListener('resize', updatePosition);
//       window.removeEventListener('scroll', updatePosition, true);
//       document.removeEventListener('mousedown', onDocClick);
//     };
//   }, [isUserMenuOpen]);

//   return (
//     <header 
//       id="Home" 
//       className="sticky top-0 z-10 bg-[#8C9F6E] font-audiowide pb-3 overflow-visible"
//       data-aos="fade-down"
//       data-aos-duration="1000"
//     >
//       {/* Tedhi border line */}
//       <div className="absolute bottom-0 left-0 w-full h-[4px] transform skew-x-6"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link 
//             to="/" 
//             className="flex items-center"
//             data-aos="fade-right"
//             data-aos-delay="200"
//           >
//             <h1 className="text-2xl font-bold text-white tracking-wide hover:cursor-pointer">
//               EventPro
//             </h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav 
//             className="hidden md:flex items-center space-x-8"
//             data-aos="fade-down"
//             data-aos-delay="300"
//           >
//             <Link
//               to="/"
//               className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
//               onClick={() => {
//                 navigate("/");
//               }}
//             >
//               Home
//             </Link>
//             <button
//               onClick={() => handleNavToSection('Events')}
//               className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
//             >
//               Events
//             </button>
//             <button
//               onClick={() => handleNavToSection('About')}
//               className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
//             >
//               About
//             </button>
//             <button
//               onClick={() => handleNavToSection('Contact')}
//               className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
//             >
//               Contact
//             </button>
//           </nav>

//           {/* User Menu */}
//           <div 
//             className="hidden md:flex items-center space-x-4"
//             data-aos="fade-left"
//             data-aos-delay="400"
//           > 
//           {isAuthenticated && user ? (
//             <div className="relative">
//               <button
//                 ref={userMenuButtonRef}
//                 onClick={() => setIsUserMenuOpen((prev) => !prev)}
//                 className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold hover:bg-gray-100 transition"
//               >
//                 <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#8C9F6E] text-white">
//                   {(user.name || user.Name || 'U').charAt(0).toUpperCase()}
//                 </span>
//                 <span>{user.name || user.Name || 'User'}</span>
//                 <svg className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.185l3.71-3.955a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0l-4.24-4.52a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                 </svg>
//               </button>
//               {isUserMenuOpen && createPortal(
//                 (
//                   <div
//                     ref={userMenuRef}
//                     style={{ position: 'fixed', top: `${userMenuPosition.top}px`, left: `${userMenuPosition.left}px`, width: '14rem' }}
//                     className="bg-white shadow-lg rounded-md py-2 z-[9999]"
//                   >
//                     {/* <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                       Signed in as
//                       <div className="font-semibold text-gray-900 truncate">{user.email || user.name || user.Name}</div>
//                     </div> */}
//                     <Link
//                       to={`/${user.type?.toLowerCase() || 'user'}`}
//                       onClick={() => setIsUserMenuOpen(false)}
//                       className="block px-4 py-2 text-sm text-center text-[#8C9F6E] hover:bg-gray-100"
//                     >
//                       {(user.type|| 'User')} Dashboard
//                     </Link>
//                     <Link
//                       to={`/${user.type?.toLowerCase() || 'user'}/profile`}
//                       onClick={() => setIsUserMenuOpen(false)}
//                       className="block px-4 py-2 text-sm text-center text-[#8C9F6E] hover:bg-gray-100"
//                     >
//                       My Profile
//                     </Link>
//                     <div className="my-1 h-px bg-gray-200" />
//                     <button
//                       onClick={() => {
//                         setIsUserMenuOpen(false);
//                         logout();
//                         navigate('/');
//                       }}
//                       className="block w-full text-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-white hover:text-red-600"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 ),
//                 document.body
//               )}
//             </div>
//           ):(
//             <React.Fragment>
//               <button
//                 onClick={() => navigate("/auth/login")}
//                 className="px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold hover:bg-[#8C9F6E] hover:text-white border border-[#8C9F6E] transition"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => navigate("/auth/signup")}
//                 className="px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-white hover:text-black transition"
//               >
//                 Sign Up
//               </button>
//             </React.Fragment>
//           )}
           
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-white hover:text-black focus:outline-none"
//               data-aos="fade-left"
//               data-aos-delay="300"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isMenuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div 
//             className="md:hidden bg-[#8C9F6E] border-t border-black relative z-50"
//             data-aos="fade-down"
//             data-aos-duration="500"
//           >
//             <div className="text-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <a
//                 href="#Home"
//               onClick={() => {
//                 navigate("/");}}
//                 className="bg-white text-[#8C9F6E] rounded-lg hover:text-black block px-3 py-2 text-base font-medium"
//               >
//                 Home
//               </a>
//               <button
//                 onClick={() => { handleNavToSection('Events'); setIsMenuOpen(false); }}
//                 className="w-full text-center bg-white text-[#8C9F6E] rounded-lg hover:text-black block px-3 py-2 text-base font-medium"
//               >
//                 Events
//               </button>
//               <button
//                 onClick={() => { handleNavToSection('About'); setIsMenuOpen(false); }}
//                 className="w-full text-center bg-white text-[#8C9F6E] rounded-lg hover:text-black block px-3 py-2 text-base font-medium"
//               >
//                 About
//               </button>
//               <button
//                 onClick={() => { handleNavToSection('Contact'); setIsMenuOpen(false); }}
//                 className="w-full text-center bg-white text-[#8C9F6E] rounded-lg hover:text-black block px-3 py-2 text-base font-medium"
//               >
//                 Contact
//               </button>
//               <div className="pt-4 space-y-2">
//                 {isAuthenticated && user ? (
//                   <div className="space-y-2 text-left">
//                     <div className="text-white text-center py-2">
//                       {user.name || user.Name || 'User'}
//                     </div>
//                     <button
//                       onClick={() => setIsMobileUserMenuOpen((p) => !p)}
//                       className="w-full flex items-center text-center justify-between px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold border border-[#8C9F6E] hover:bg-gray-100 transition"
//                     >
//                       <div>Account</div>
//                       <svg className={`h-4 w-4 transition-transform ${isMobileUserMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                         <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.185l3.71-3.955a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0l-4.24-4.52a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                     {isMobileUserMenuOpen && (
//                       <div className="ml-2 mr-2 rounded-md bg-white shadow divide-y">
//                         <Link
//                           to={`/${user.type?.toLowerCase() || 'user'}`}
//                           className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100"
//                           onClick={() => { setIsMenuOpen(false); setIsMobileUserMenuOpen(false); }}
//                         >
//                           {(user.type || 'User')} Dashboard
//                         </Link>
//                         <Link
//                           to={`/${user.type?.toLowerCase() || 'user'}/profile`}
//                           className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100"
//                           onClick={() => { setIsMenuOpen(false); setIsMobileUserMenuOpen(false); }}
//                         >
//                           My Profile
//                         </Link>
//                         <button
//                           onClick={() => {
//                             setIsMobileUserMenuOpen(false);
//                             setIsMenuOpen(false);
//                             logout();
//                             navigate('/');
//                           }}
//                           className="block w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => {
//                         navigate("/auth/login");
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold border border-[#8C9F6E] hover:bg-[#EFEFEF] transition"
//                     >
//                       Login
//                     </button>
//                     <button
//                       onClick={() => {
//                         navigate("/auth/signup");
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-[#333] transition"
//                     >
//                       Sign Up
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleNavToSection = async (sectionId) => {
    const goScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => setTimeout(goScroll, 0));
    } else {
      goScroll();
    }
  };

  // Close user menu when clicked outside
  useEffect(() => {
    if (!isUserMenuOpen) return;
    const onDocClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isUserMenuOpen]);

  return (
    <header
      id="Home"
      className="sticky top-0 z-10 bg-[#8C9F6E] font-audiowide pb-3"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              EventPro
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={() => navigate("/")}
              className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <button
              onClick={() => handleNavToSection("Events")}
              className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium"
            >
              Events
            </button>
            <button
              onClick={() => handleNavToSection("About")}
              className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium"
            >
              About
            </button>
            <button
              onClick={() => handleNavToSection("Contact")}
              className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium"
            >
              Contact
            </button>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold hover:bg-gray-100 transition"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#8C9F6E] text-white">
                    {(user.name || user.Name || "U").charAt(0).toUpperCase()}
                  </span>
                  <span>{user.name || user.Name || "User"}</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.185l3.71-3.955a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0l-4.24-4.52a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2">
                    <Link
                      to={`/${user.type?.toLowerCase() || "user"}`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-[#8C9F6E] hover:bg-gray-100 text-center"
                    >
                      {(user.type || "User")} Dashboard
                    </Link>
                    <Link
                      to={`/${user.type?.toLowerCase() || "user"}/profile`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-[#8C9F6E] hover:bg-gray-100 text-center"
                    >
                      My Profile
                    </Link>
                    <div className="my-1 h-px bg-gray-200" />
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                      className="block w-full text-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-white hover:text-red-600 rounded-b-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold hover:bg-[#8C9F6E] hover:text-white border border-[#8C9F6E] transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-black focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#8C9F6E] border-t border-black">
            <div className="text-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  navigate("/");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-white text-[#8C9F6E] rounded-lg block px-3 py-2 text-base font-medium"
              >
                Home
              </button>
              <button
                onClick={() => {
                  handleNavToSection("Events");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-white text-[#8C9F6E] rounded-lg block px-3 py-2 text-base font-medium"
              >
                Events
              </button>
              <button
                onClick={() => {
                  handleNavToSection("About");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-white text-[#8C9F6E] rounded-lg block px-3 py-2 text-base font-medium"
              >
                About
              </button>
              <button
                onClick={() => {
                  handleNavToSection("Contact");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-white text-[#8C9F6E] rounded-lg block px-3 py-2 text-base font-medium"
              >
                Contact
              </button>
              <div className="pt-4 space-y-2">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="text-white text-center py-2">
                      {user.name || user.Name || "User"}
                    </div>
                    <Link
                      to={`/${user.type?.toLowerCase() || "user"}`}
                      className="block px-4 py-2 text-sm text-center bg-white text-[#8C9F6E] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {(user.type || "User")} Dashboard
                    </Link>
                    <Link
                      to={`/${user.type?.toLowerCase() || "user"}/profile`}
                      className="block px-4 py-2 text-sm text-center bg-white text-[#8C9F6E] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                      className="block w-full text-center px-4 py-2 text-sm text-red-600 bg-white rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/auth/login");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold border border-[#8C9F6E]"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate("/auth/signup");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 rounded-md bg-black text-white font-semibold"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
