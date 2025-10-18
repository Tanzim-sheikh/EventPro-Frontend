// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';

// const OptionSignup = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('user');

//   const handleUserSignup = () => {
//     navigate('/auth/user/signup');
//   };

//   const handleOrganizerSignup = () => {
//     navigate('/auth/organizer/signup');
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 className="text-center text-3xl font-extrabold text-gray-900 font-audiowide">
//             Select Signup Option
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Choose whether you're signing up as a user or an organizer
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-[#8C9F6E] rounded-lg border-2 shadow-lg shadow-[#8C9F6E]">
//           <div className="bg-[#f0f5e8] py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             {/* Tab Selector */}
//             <div className="flex rounded-md shadow-sm mb-8">
//               <button
//                 onClick={() => setActiveTab('user')}
//                 className={`flex-1 py-2 px-4 rounded-l-md text-sm font-medium ${
//                   activeTab === 'user'
//                     ? 'bg-[#A3B886] text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 User
//               </button>
//               <button
//                 onClick={() => setActiveTab('organizer')}
//                 className={`flex-1 py-2 px-4 rounded-r-md text-sm font-medium ${
//                   activeTab === 'organizer'
//                     ? 'bg-[#A3B886] text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 Organizer
//               </button>
//             </div>

//             {/* Content based on active tab */}
//             <div className="space-y-6">
//               {activeTab === 'user' ? (
//                 <div className="text-center">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">User Signup</h3>
//                   <p className="text-sm text-gray-600 mb-6">
//                     Create an account to browse and book events that interest you.
//                   </p>
//                   <button
//                     onClick={handleUserSignup}
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#A3B886] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C9F6E]"
//                   >
//                     Continue as User
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Organizer Signup</h3>
//                   <p className="text-sm text-gray-600 mb-6">
//                     Create an account to host and manage your own events.
//                   </p>
//                   <button
//                     onClick={handleOrganizerSignup}
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#A3B886] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C9F6E]"
//                   >
//                     Continue as Organizer
//                   </button>
//                 </div>
//               )}

//               <div className="text-center text-sm">
//                 <p className="text-gray-600">
//                   Already have an account?{' '}
//                   <button
//                     onClick={() => navigate(activeTab === 'user' ? '/auth/user/login' : '/auth/organizer/login')}
//                     className="font-medium text-[#A3B886] hover:text-[#A3B886]"
//                   >
//                     Login
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default OptionSignup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const OptionSignup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');

  const handleUserSignup = () => {
    navigate('/auth/user/signup');
  };

  const handleOrganizerSignup = () => {
    navigate('/auth/organizer/signup');
  };

  const handleLogin = () => {
    if (activeTab === 'user') {
      navigate('/auth/user/login');
    } else {
      navigate('/auth/organizer/login');
    }
  };

  return (
    <>
      <Header />
      {/* Main Container - Same responsive structure as login */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-audiowide">
              Select Signup Option
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
              Choose whether you're signing up as a user or an organizer
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white border-2 border-[#8C9F6E] rounded-xl shadow-lg shadow-[#8C9F6E]/20 overflow-hidden">
            <div className="bg-[#f8faf5] p-4 sm:p-6 md:p-8">
              
              {/* Tab Selector - Improved for mobile */}
              <div className="flex rounded-lg shadow-sm mb-6 sm:mb-8 bg-gray-100 p-1">
                <button
                  onClick={() => setActiveTab('user')}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === 'user'
                      ? 'bg-[#A3B886] text-white shadow-md'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => setActiveTab('organizer')}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === 'organizer'
                      ? 'bg-[#A3B886] text-white shadow-md'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Organizer
                </button>
              </div>

              {/* Content Section */}
              <div className="space-y-4 sm:space-y-6">
                {/* User Tab Content */}
                {activeTab === 'user' && (
                  <div className="text-center animate-fade-in">
                    <div className="w-16 h-16 mx-auto mb-3 sm:mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#A3B886]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">User Signup</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">
                      Create an account to browse and book events that interest you.
                    </p>
                    <button
                      onClick={handleUserSignup}
                      className="w-full py-3 px-4 bg-[#A3B886] hover:bg-[#8C9F6E] text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                    >
                      Continue as User
                    </button>
                  </div>
                )}

                {/* Organizer Tab Content */}
                {activeTab === 'organizer' && (
                  <div className="text-center animate-fade-in">
                    <div className="w-16 h-16 mx-auto mb-3 sm:mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#A3B886]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Organizer Signup</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">
                      Create an account to host and manage your own events.
                    </p>
                    <button
                      onClick={handleOrganizerSignup}
                      className="w-full py-3 px-4 bg-[#A3B886] hover:bg-[#8C9F6E] text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                    >
                      Continue as Organizer
                    </button>
                  </div>
                )}

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={handleLogin}
                      className="font-medium text-[#A3B886] hover:text-[#8C9F6E] transition-colors duration-200 underline"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info for Small Screens */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 px-4">
              Tap on different tabs to switch between user types
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OptionSignup;