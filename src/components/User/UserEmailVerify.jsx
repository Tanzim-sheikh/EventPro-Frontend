import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../API/axios';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const UserEmailVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const stateEmail = location.state?.email;
    if (stateEmail) setEmail(stateEmail);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (!email || !otp) throw new Error('Please enter email and OTP');
      const res = await axiosInstance.post('/User/UserEmailVerification', { email, otp: String(otp).trim() });
      setSuccessMsg(res.data?.message || 'Email verified successfully');
      setTimeout(() => navigate('/auth/user/login'), 1000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Verification failed';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#A3B886] rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0zM12 14v4m6-10l-1.5 1.5M6 8L4.5 9.5" />
              </svg>
            </div>
          </div>
          <h1 className="text-center text-3xl font-bold text-[#5a6b47] font-audiowide mb-2">Verify your email</h1>
          <p className="text-center text-sm text-[#5a6b47]">We sent a 6-digit code to your email. Enter it below to verify.</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-[#8C9F6E] border-2 rounded-lg shadow-lg shadow-[#8C9F6E]/30">
          <div className="bg-[#f0f5e8] py-8 px-6 rounded-lg">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm text-center">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg text-sm text-center">{successMsg}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#5a6b47] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a6b47] mb-2">Verification Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200 tracking-widest text-center"
                  required
                />
                <p className="mt-2 text-xs text-[#5a6b47]">Code expires in 5 minutes.</p>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#A3B886] text-white font-semibold rounded-lg shadow-md hover:bg-[#7a8c5e] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying…' : 'Verify Email'}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm text-[#5a6b47]">
              Didn’t receive the code? Check spam folder. You can also try signing up again to get a new code.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserEmailVerify;

