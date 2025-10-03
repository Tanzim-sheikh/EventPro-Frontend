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

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 font-audiowide">
            Select Signup Option
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose whether you're signing up as a user or an organizer
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-[#8C9F6E] rounded-lg border-2 shadow-lg shadow-[#8C9F6E]">
          <div className="bg-[#f0f5e8] py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Tab Selector */}
            <div className="flex rounded-md shadow-sm mb-8">
              <button
                onClick={() => setActiveTab('user')}
                className={`flex-1 py-2 px-4 rounded-l-md text-sm font-medium ${
                  activeTab === 'user'
                    ? 'bg-[#A3B886] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                User
              </button>
              <button
                onClick={() => setActiveTab('organizer')}
                className={`flex-1 py-2 px-4 rounded-r-md text-sm font-medium ${
                  activeTab === 'organizer'
                    ? 'bg-[#A3B886] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Organizer
              </button>
            </div>

            {/* Content based on active tab */}
            <div className="space-y-6">
              {activeTab === 'user' ? (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">User Signup</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Create an account to browse and book events that interest you.
                  </p>
                  <button
                    onClick={handleUserSignup}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#A3B886] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C9F6E]"
                  >
                    Continue as User
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Organizer Signup</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Create an account to host and manage your own events.
                  </p>
                  <button
                    onClick={handleOrganizerSignup}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#A3B886] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C9F6E]"
                  >
                    Continue as Organizer
                  </button>
                </div>
              )}

              <div className="text-center text-sm">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate(activeTab === 'user' ? '/auth/user/login' : '/auth/organizer/login')}
                    className="font-medium text-[#A3B886] hover:text-[#A3B886]"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OptionSignup;