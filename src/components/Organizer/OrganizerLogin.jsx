// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { axios_url } from '../../API/axios';
// import Header from '../Home/Header';
// import Footer from '../Home/Footer';

// const OrganizerLogin = () => {
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
  
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${axios_url}/Organizer/organizerLogin`, formData);
//       console.log("Login response:", response.data);
      
//       if(response.data.token) {
//         localStorage.setItem('organizerToken', response.data.token);
//         localStorage.setItem('organizerData', JSON.stringify(response.data.organizer));
//       }
      
//       alert('Login successful!');
//       navigate('/organizer-dashboard');
//     } catch (error) {
//       console.error("Login error:", error.response?.data);
//       const msg = error.response?.data?.message || 'Login failed. Please try again!';
//       setErrorMsg(msg);
//       alert(msg);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screenflex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md ">
//           <h2 className="text-center text-3xl font-extrabold text-gray-900 font-audiowide">
//             Organizer Login
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Access your organizer dashboard
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-[#f0f5e8] py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             {errorMsg && (
//               <div className="mb-4 text-sm text-red-600 text-center">
//                 {errorMsg}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <Link to="/organizer-forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
//                     Forgot your password?
//                   </Link>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">
//                     Or continue with
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <div>
//                   <a
//                     href="#"
//                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                   >
//                     <span className="sr-only">Sign in with Google</span>
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
//                     </svg>
//                   </a>
//                 </div>

//                 <div>
//                   <a
//                     href="#"
//                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                   >
//                     <span className="sr-only">Sign in with Facebook</span>
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6 text-center text-sm">
//               <p className="text-gray-600">
//                 Don't have an organizer account?{' '}
//                 <Link to="/organizerSignup" className="font-medium text-indigo-600 hover:text-indigo-500">
//                   Sign up
//                 </Link>
//               </p>
//               <p className="mt-2 text-gray-600">
//                 Want to attend events?{' '}
//                 <Link to="/userLogin" className="font-medium text-indigo-600 hover:text-indigo-500">
//                   Login as User
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default OrganizerLogin;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axios_url } from '../../API/axios';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const OrganizerLogin = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const response = await axios.post(`${axios_url}/Organizer/organizerLogin`, formData);
      console.log("Login response:", response.data);
      
      if(response.data.token) {
        localStorage.setItem('organizerToken', response.data.token);
        localStorage.setItem('organizerData', JSON.stringify(response.data.organizer));
      }
      
      alert('Login successful!');
      navigate('/organizer-dashboard');
    } catch (error) {
      console.error("Login error:", error.response?.data);
      const msg = error.response?.data?.message || 'Login failed. Please try again!';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#8C9F6E] rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold text-[#5a6b47] font-audiowide">
            Organizer Login
          </h2>
          <p className="mt-2 text-center text-sm text-[#5a6b47]">
            Access your organizer dashboard
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-[#8C9F6E] border-2 rounded-lg shadow-lg shadow-[#8C9F6E]/30">
          <div className="bg-[#f0f5e8] py-8 px-6 rounded-lg">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#5a6b47] mb-2">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#5a6b47] mb-2">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#8C9F6E] focus:ring-[#8C9F6E] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[#5a6b47]">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/organizer-forgot-password" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e] transition-colors duration-200">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#8C9F6E] text-white font-semibold rounded-lg shadow-md hover:bg-[#7a8c5e] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#dbe4d3]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#f0f5e8] text-[#5a6b47]">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-[#dbe4d3] rounded-md shadow-sm bg-white text-sm font-medium text-[#5a6b47] hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 10.5c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5z"/>
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>
                </div>

                <div>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-[#dbe4d3] rounded-md shadow-sm bg-white text-sm font-medium text-[#5a6b47] hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    <span className="ml-2">Facebook</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm space-y-2">
              <p className="text-[#5a6b47]">
                Don't have an organizer account?{' '}
                <Link to="/organizerSignup" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e] transition-colors duration-200">
                  Sign up
                </Link>
              </p>
              <p className="text-[#5a6b47]">
                Want to attend events?{' '}
                <Link to="/userLogin" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e] transition-colors duration-200">
                  Login as User
                </Link>
              </p>
              <p className="text-[#5a6b47]">
                Go back to{' '}
                <Link to="/optionLogin" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e] transition-colors duration-200">
                  Login Options
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrganizerLogin;