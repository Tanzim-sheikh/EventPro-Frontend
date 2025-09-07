import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <header 
      id="Home" 
      className="sticky top-0 z-10 bg-[#8C9F6E] font-audiowide clip-header pb-3 rounded-bl-[40px]"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      {/* Tedhi border line */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] transform skew-x-6"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h1 className="text-2xl font-bold text-white tracking-wide hover:cursor-pointer">
              EventPro
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex space-x-8"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <a
              href="#Home"
              onClick={() => {
                navigate("/");
              }}
              className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Events
            </a>
            <a
              href="#About"
              className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-[#EFEFEF] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* User Menu */}
          <div 
            className="hidden md:flex items-center space-x-4"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <button
              onClick={() => navigate("/OptionLogin")}
              className="px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold hover:bg-[#8C9F6E] hover:text-white border border-[#8C9F6E] transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/OptionSignup")}
              className="px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-white hover:text-black transition"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-black focus:outline-none"
              data-aos="fade-left"
              data-aos-delay="300"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="md:hidden bg-[#8C9F6E] border-t border-black"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            <div className="text-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#Home"
              onClick={() => {
                navigate("/");}}
                className="bg-white text-[#8C9F6E] rounded-lg hover:text-black block px-3 py-2 text-base font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="bg-white text-[#8C9F6E] rounded-lg hover:text-black block px-3 py-2 text-base font-medium"
              >
                Events
              </a>
              <a
                href="#"
                className="bg-white text-[#8C9F6E] rounded-lg hover:text-black block px-3 py-2 text-base font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="bg-white text-[#8C9F6E] rounded-lg hover:text-black block px-3 py-2 text-base font-medium"
              >
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => navigate("/OptionLogin")}
                  className="w-full px-4 py-2 rounded-md bg-white text-[#8C9F6E] font-semibold border border-[#8C9F6E] hover:bg-[#EFEFEF] transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/OptionSignup")}
                  className="w-full px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-[#333] transition"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
