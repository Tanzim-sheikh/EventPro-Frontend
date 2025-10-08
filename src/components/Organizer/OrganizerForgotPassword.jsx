import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../API/axios';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const OrganizerForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setErrorMsg('');

    try {
      const response = await axiosInstance.put('/Organizer/OrganizerForgotPassword', { email });
      setMessage(response.data?.message || 'Check your email for reset instructions.');
      setOtpSent(true);
    } catch (error) {
      console.log('Organizer forgot-password error:', error?.response?.status, error?.response?.data);
      setErrorMsg(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setErrorMsg('');
    if (newPassword !== confirmPassword) {
      setIsLoading(false);
      return setErrorMsg('Passwords do not match');
    }
    try {
      const response = await axiosInstance.put('/Organizer/OrganizerResetPassword', { email, otp, newPassword });
      setMessage(response.data?.message || 'Password reset successful. You can login now.');
      navigate('/auth/organizer/login');
    } catch (error) {
      console.log('Organizer reset-password error:', error?.response?.status, error?.response?.data);
      setErrorMsg(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center bg-[#f0f5e8]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 font-audiowide">
            Organizer Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to reset your password
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-[#8C9F6E] border-2 rounded-lg shadow-lg shadow-[#8C9F6E]">
          <div className="bg-[#f0f5e8] py-8 px-4 sm:rounded-lg sm:px-10">
            {message && <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md text-sm">{message}</div>}
            {errorMsg && <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">{errorMsg}</div>}

            {!otpSent ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8C9F6E] focus:border-[#8C9F6E] sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#7a8a5f] disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleReset}>
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={otp}
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8C9F6E] focus:border-[#8C9F6E] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="mt-1 relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      placeholder="Enter new password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8C9F6E] focus:border-[#8C9F6E] sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((s) => !s)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                      aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    >
                      {showNewPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      placeholder="Confirm new password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8C9F6E] focus:border-[#8C9F6E] sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A3B886] hover:bg-[#7a8a5f] disabled:opacity-50"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-gray-600">
              Remembered your password?{' '}
              <Link to="/auth/organizer/login" className="font-medium text-[#A3B886] hover:text-[#7a8a5f]">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrganizerForgotPassword;

