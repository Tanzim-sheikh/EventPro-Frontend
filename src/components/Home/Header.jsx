// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import logo from "../../assets/letter-e.png";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const userMenuRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isAuthenticated, user, logout } = useAuth();

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);


//   const handleNavToSection = async (sectionId) => {
//     const goScroll = () => {
//       const el = document.getElementById(sectionId);
//       if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//     };
//     if (location.pathname !== "/") {
//       navigate("/");
//       requestAnimationFrame(() => setTimeout(goScroll, 0));
//     } else {
//       goScroll();
//     }
//   };

//   // Close user menu when clicked outside
//   useEffect(() => {
//     if (!isUserMenuOpen) return;
//     const onDocClick = (e) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
//         setIsUserMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, [isUserMenuOpen]);

//   return (
//     <header
//       id="Home"
//       className="sticky top-0 z-10 bg-[#A3B886] font-audiowide pb-3"
//       data-aos="fade-down"
//       data-aos-duration="1000"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <img
//               src={logo}
//               alt="Evenza Logo"
//               className="h-9 w-auto object-contain"
//             />
//             <h1 className="text-2xl font-bold text-white tracking-wide">Evenza</h1>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link
//               to="/"
//               onClick={() => navigate("/")}
//               className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium"
//             >
//               Home
//             </Link>
//             <button
//               onClick={() => navigate("/events")}
//               className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium"
//             >
//               Events
//             </button>
//             <button
//               onClick={() => handleNavToSection("About")}
//               className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium"
//             >
//               About
//             </button>
//             <button
//               onClick={() => handleNavToSection("Contact")}
//               className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium"
//             >
//               Contact
//             </button>
//           </nav>

//           {/* User Menu */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated && user ? (
//               <div className="relative" ref={userMenuRef}>
//                 <button
//                   onClick={() => setIsUserMenuOpen((prev) => !prev)}
//                   className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-[#A3B886] font-semibold hover:bg-gray-100 transition"
//                 >
//                   <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#A3B886] text-white">
//                     {(user.name || user.Name || "U").charAt(0).toUpperCase()}
//                   </span>
//                   <span>{user.name || user.Name || "User"}</span>
//                   <svg
//                     className={`h-4 w-4 transition-transform ${
//                       isUserMenuOpen ? "rotate-180" : ""
//                     }`}
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.23 7.21a.75.75 0 011.06.02L10 11.185l3.71-3.955a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0l-4.24-4.52a.75.75 0 01.02-1.06z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//                 {isUserMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2">
//                     <Link
//                       to={`/${user.type?.toLowerCase() || "user"}`}
//                       onClick={() => setIsUserMenuOpen(false)}
//                       className="block px-4 py-2 text-sm text-[#A3B886] hover:bg-gray-100 text-center"
//                     >
//                       {(user.type || "User")} Dashboard
//                     </Link>
//                     <Link
//                       to={`/${user.type?.toLowerCase() || "user"}/profile`}
//                       onClick={() => setIsUserMenuOpen(false)}
//                       className="block px-4 py-2 text-sm text-[#A3B886] hover:bg-gray-100 text-center"
//                     >
//                       My Profile
//                     </Link>
//                     <div className="my-1 h-px bg-gray-200" />
//                     <button
//                       onClick={() => {
//                         setIsUserMenuOpen(false);
//                         logout();
//                         navigate("/");
//                       }}
//                       className="block w-full text-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-white hover:text-red-600 rounded-b-md"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <button
//                   onClick={() => navigate("/auth/login")}
//                   className="px-4 py-2 rounded-md bg-white text-[#A3B886] font-semibold hover:bg-[#A3B886] hover:text-white border border-[#8C9F6E] transition"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => navigate("/auth/signup")}
//                   className="px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-white hover:text-black transition"
//                 >
//                   Sign Up
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-white hover:text-black focus:outline-none"
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

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-[#A3B886] border-t border-black">
//             <div className="text-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <button
//                 onClick={() => {
//                   navigate("/");
//                   setIsMenuOpen(false);
//                 }}
//                 className="w-full bg-white text-[#A3B886] rounded-lg block px-3 py-2 text-base font-medium"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavToSection("Events");
//                   setIsMenuOpen(false);
//                 }}
//                 className="w-full bg-white text-[#A3B886] rounded-lg block px-3 py-2 text-base font-medium"
//               >
//                 Events
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavToSection("About");
//                   setIsMenuOpen(false);
//                 }}
//                 className="w-full bg-white text-[#A3B886] rounded-lg block px-3 py-2 text-base font-medium"
//               >
//                 About
//               </button>
//               <button
//                 onClick={() => {
//                   handleNavToSection("Contact");
//                   setIsMenuOpen(false);
//                 }}
//                 className="w-full bg-white text-[#A3B886] rounded-lg block px-3 py-2 text-base font-medium"
//               >
//                 Contact
//               </button>
//               <div className="pt-4 space-y-2">
//                 {isAuthenticated && user ? (
//                   <div className="space-y-2">
//                     <div className="text-white text-center py-2">
//                       {user.name || user.Name || "User"}
//                     </div>
//                     <Link
//                       to={`/${user.type?.toLowerCase() || "user"}`}
//                       className="block px-4 py-2 text-sm text-center bg-white text-[#A3B886] rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {(user.type || "User")} Dashboard
//                     </Link>
//                     <Link
//                       to={`/${user.type?.toLowerCase() || "user"}/profile`}
//                       className="block px-4 py-2 text-sm text-center bg-white text-[#A3B886] rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       My Profile
//                     </Link>
//                     <button
//                       onClick={() => {
//                         setIsMenuOpen(false);
//                         logout();
//                         navigate("/");
//                       }}
//                       className="block w-full text-center px-4 py-2 text-sm text-red-600 bg-white rounded-md"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => {
//                         navigate("/auth/login");
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full px-4 py-2 rounded-md bg-white text-[#A3B886] font-semibold border border-[#8C9F6E]"
//                     >
//                       Login
//                     </button>
//                     <button
//                       onClick={() => {
//                         navigate("/auth/signup");
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full px-4 py-2 rounded-md bg-black text-white font-semibold"
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
import logo from "../../assets/letter-e.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    // Handle scroll effect for shadow
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`sticky top-0 z-50 font-audiowide transition-all duration-300 ${
        isScrolled 
          ? "bg-gradient-to-br from-[#A3B886] via-[#B4C49A] to-[#8FA572] shadow-lg backdrop-blur-md border-b border-[#b9c7a7]/40" 
          : "bg-gradient-to-br from-[#A3B886] via-[#B4C49A] to-[#8FA572] backdrop-blur-md border-b border-[#b9c7a7]/30"
      }`}
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <img
                src={logo}
                alt="Evenza Logo"
                className="relative h-8 w-8 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-sm">Evenza</h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-white hover:text-[#f0f4ec] rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Home
            </Link>
            <button
              onClick={() => navigate("/events")}
              className="px-4 py-2 text-sm font-medium text-white hover:text-[#f0f4ec] rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Events
            </button>
            <button
              onClick={() => handleNavToSection("About")}
              className="px-4 py-2 text-sm font-medium text-white hover:text-[#f0f4ec] rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              About
            </button>
            <button
              onClick={() => handleNavToSection("Contact")}
              className="px-4 py-2 text-sm font-medium text-white hover:text-[#f0f4ec] rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Contact
            </button>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 border border-white/20 transition-all duration-200"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white">
                    {(user.name || user.Name || "U").charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-32 truncate">
                    {user.name || user.Name || "User"}
                  </span>
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
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md shadow-xl rounded-xl py-2 border border-white/20">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name || user.Name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {(user.type || "User")} Account
                      </p>
                    </div>
                    <Link
                      to={`/${user.type?.toLowerCase() || "user"}`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#A3B886]/10 hover:text-[#5a6b47] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {(user.type || "User")} Dashboard
                    </Link>
                    <Link
                      to={`/${user.type?.toLowerCase() || "user"}/profile`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#A3B886]/10 hover:text-[#5a6b47] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    <div className="my-1 h-px bg-gray-200" />
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-xl"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-5 py-2 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="px-5 py-2 rounded-xl font-semibold bg-white text-[#5a6b47] hover:bg-[#f0f4ec] hover:text-[#3f4c33] transition-all duration-200 shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
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
          <div className="md:hidden bg-gradient-to-br from-[#A3B886] via-[#B4C49A] to-[#8FA572] border-t border-white/20 backdrop-blur-md">
            <div className="px-2 pt-2 pb-4 space-y-2">
              <button
                onClick={() => {
                  navigate("/");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate("/events");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
              >
                Events
              </button>
              <button
                onClick={() => {
                  handleNavToSection("About");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => {
                  handleNavToSection("Contact");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
              >
                Contact
              </button>
              
              <div className="pt-4 border-t border-white/20 space-y-3">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 rounded-lg bg-white/5">
                      <p className="text-sm font-medium text-white">
                        {user.name || user.Name || "User"}
                      </p>
                      <p className="text-xs text-white/70">
                        {(user.type || "User")} Account
                      </p>
                    </div>
                    <Link
                      to={`/${user.type?.toLowerCase() || "user"}`}
                      className="flex items-center gap-3 w-full px-4 py-3 bg-white text-[#5a6b47] rounded-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {(user.type || "User")} Dashboard
                    </Link>
                    <Link
                      to={`/${user.type?.toLowerCase() || "user"}/profile`}
                      className="flex items-center gap-3 w-full px-4 py-3 bg-white/10 text-white rounded-lg font-medium border border-white/20"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 bg-red-50 rounded-lg font-medium border border-red-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        navigate("/auth/login");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate("/auth/signup");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg font-semibold bg-white text-[#5a6b47] hover:bg-[#f0f4ec] transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
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