// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';

// const OptionLogin = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('user');

//   const handleUserLogin = () => {
//     navigate('/auth/user/login');
//   };

//   const handleOrganizerLogin = () => {
//     navigate('/auth/organizer/login');
//   };

//   const handleAdminLogin = () => {
//     navigate('/auth/user/login'); // Admin users use the same login as regular users
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen flex flex-col justify-center">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md ">
//           <h2 className="text-center text-3xl font-extrabold text-gray-900 font-audiowide">
//             Select Login Option
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Choose whether you're a user or an organizer
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-[#8C9F6E] border-2 rounded-lg shadow-lg shadow-[#8C9F6E]">
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
//                 className={`flex-1 py-2 px-4 text-sm font-medium ${
//                   activeTab === 'organizer'
//                     ? 'bg-[#A3B886] text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 Organizer
//               </button>
//               <button
//                 onClick={() => setActiveTab('admin')}
//                 className={`flex-1 py-2 px-4 rounded-r-md text-sm font-medium ${
//                   activeTab === 'admin'
//                     ? 'bg-[#A3B886] text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 Admin
//               </button>
//             </div>

//             {/* Content based on active tab */}
//             <div className="space-y-6">
//               {activeTab === 'user' ? (
//                 <div className="text-center">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">User Login</h3>
//                   <p className="text-sm text-gray-600 mb-6">
//                     Login to browse and book events that interest you.
//                   </p>
//                   <button
//                     onClick={handleUserLogin}
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#A3B886] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C9F6E]"
//                   >
//                     Continue as User
//                   </button>
//                 </div>
//               ) : activeTab === 'organizer' ? (
//                 <div className="text-center">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Organizer Login</h3>
//                   <p className="text-sm text-gray-600 mb-6">
//                     Login to create and manage your events.
//                   </p>
//                   <button
//                     onClick={handleOrganizerLogin}
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#A3B886] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C9F6E]"
//                   >
//                     Continue as Organizer
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Login</h3>
//                   <p className="text-sm text-gray-600 mb-6">
//                     Login to access admin panel and manage the system.
//                   </p>
//                   <button
//                     onClick={handleAdminLogin}
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#A3B886] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C9F6E]"
//                   >
//                     Continue as Admin
//                   </button>
//                 </div>
//               )}

//               <div className="text-center text-sm">
//                 <p className="text-gray-600">
//                   Don't have an account?{' '}
//                   <button
//                     onClick={() => navigate(activeTab === 'user' ? '/auth/user/signup' : activeTab === 'organizer' ? '/auth/organizer/signup' : '/auth/user/signup')}
//                     className="font-medium text-[#A3B886] hover:text-[#A3B886]"
//                   >
//                     Sign up
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

// export default OptionLogin;  





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const OptionLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');

  const handleUserLogin = () => {
    navigate('/auth/user/login');
  };

  const handleOrganizerLogin = () => {
    navigate('/auth/organizer/login');
  };

  const handleAdminLogin = () => {
    navigate('/auth/user/login');
  };

  const handleSignup = () => {
    if (activeTab === 'user') {
      navigate('/auth/user/signup');
    } else if (activeTab === 'organizer') {
      navigate('/auth/organizer/signup');
    } else {
      navigate('/auth/user/signup');
    }
  };

  return (
    <>
      <Header />
      {/* Main Container - Better responsive handling */}
      <div className="min-h-screen  flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-audiowide">
              Select Login Option
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
              Choose whether you're a user or an organizer
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white border-2 border-[#8C9F6E] rounded-xl shadow-lg shadow-[#8C9F6E]/20 overflow-hidden">
            <div className="bg-[#f8faf5] p-4 sm:p-6 md:p-8">
              
              {/* Tab Selector - Better for mobile */}
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
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === 'admin'
                      ? 'bg-[#A3B886] text-white shadow-md'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Admin
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
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">User Login</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">
                      Login to browse and book events that interest you.
                    </p>
                    <button
                      onClick={handleUserLogin}
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
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Organizer Login</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">
                      Login to create and manage your events.
                    </p>
                    <button
                      onClick={handleOrganizerLogin}
                      className="w-full py-3 px-4 bg-[#A3B886] hover:bg-[#8C9F6E] text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                    >
                      Continue as Organizer
                    </button>
                  </div>
                )}

                {/* Admin Tab Content */}
                {activeTab === 'admin' && (
                  <div className="text-center animate-fade-in">
                    <div className="w-16 h-16 mx-auto mb-3 sm:mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#A3B886]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Admin Login</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">
                      Login to access admin panel and manage the system.
                    </p>
                    <button
                      onClick={handleAdminLogin}
                      className="w-full py-3 px-4 bg-[#A3B886] hover:bg-[#8C9F6E] text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                    >
                      Continue as Admin
                    </button>
                  </div>
                )}

                {/* Signup Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={handleSignup}
                      className="font-medium text-[#A3B886] hover:text-[#8C9F6E] transition-colors duration-200 underline"
                    >
                      Sign up
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

export default OptionLogin;
