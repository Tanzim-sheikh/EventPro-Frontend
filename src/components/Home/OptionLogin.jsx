import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const OptionLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');

  const handleUserLogin = () => {
    navigate('/userLogin');
  };

  const handleOrganizerLogin = () => {
    navigate('/organizerLogin');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Select Login Option
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose whether you're a user or an organizer
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Tab Selector */}
            <div className="flex rounded-md shadow-sm mb-8">
              <button
                onClick={() => setActiveTab('user')}
                className={`flex-1 py-2 px-4 rounded-l-md text-sm font-medium ${
                  activeTab === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                User
              </button>
              <button
                onClick={() => setActiveTab('organizer')}
                className={`flex-1 py-2 px-4 rounded-r-md text-sm font-medium ${
                  activeTab === 'organizer'
                    ? 'bg-indigo-600 text-white'
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">User Login</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Login to browse and book events that interest you.
                  </p>
                  <button
                    onClick={handleUserLogin}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Continue as User
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Organizer Login</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Login to create and manage your events.
                  </p>
                  <button
                    onClick={handleOrganizerLogin}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Continue as Organizer
                  </button>
                </div>
              )}

              <div className="text-center text-sm">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate(activeTab === 'user' ? '/UserSignup' : 'OrganizerSignup')}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
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

export default OptionLogin;  