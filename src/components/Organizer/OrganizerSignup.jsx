// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import Header from '../Home/Header';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { axios_url } from '../../API/axios';
// import Footer from '../Home/Footer';

// const OrganizerSignup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     surname: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     gender: 'male', // Default value
//     dateOfBirth: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post(`${axios_url}/Organizer/organizerSignup`, formData);
//       console.log("Server Response:", response.data);
//       alert("Organizer registration successful!");
//       navigate("/organizer-dashboard"); // Redirect to organizer dashboard
//     } catch (error) {
//       console.log("Error", error);
//       const msg = error.response?.data?.message || "Organizer registration failed!";
//       alert(msg);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">Organizer Signup</h1>
//         </div>
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Name</label>
//                   <input
//                     name="name"
//                     type="text"
//                     onChange={handleChange}
//                     value={formData.name}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Surname</label>
//                   <input
//                     name="surname"
//                     type="text"
//                     onChange={handleChange}
//                     value={formData.surname}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                 <input
//                   name="phoneNumber"
//                   type="tel"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <input
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   minLength="6"
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Gender</label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                     <option value="prefer-not-to-say">Prefer not to say</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//                   <input
//                     name="dateOfBirth"
//                     type="date"
//                     value={formData.dateOfBirth}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Register as Organizer
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6 text-center space-y-2">
//               <p className="text-sm text-gray-600">
//                 Already have an account? <Link to="/organizer-login" className="font-medium text-indigo-600 hover:text-indigo-500">Login as Organizer</Link>
//               </p>
//               <p className="text-sm text-gray-600">
//                 Want to attend events? <Link to="/user-signup" className="font-medium text-indigo-600 hover:text-indigo-500">Signup as User</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default OrganizerSignup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axios_url } from '../../API/axios';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const OrganizerSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
    gender: 'male',
    dateOfBirth: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const response = await axios.post(`${axios_url}/Organizer/organizerSignup`, formData);
      console.log("Server Response:", response.data);
      alert("Organizer registration successful!");
      navigate("/organizerLogin");
    } catch (error) {
      console.log("Error", error);
      const msg = error.response?.data?.message || "Organizer registration failed!";
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
            <div className="w-16 h-16 bg-[#8C9F6E] rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-center text-3xl font-bold text-[#5a6b47] font-audiowide mb-2">
            Organizer Signup
          </h1>
          <p className="text-center text-sm text-[#5a6b47]">
            Create your organizer account to start hosting events
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg border-[#8C9F6E] border-2 rounded-lg shadow-lg shadow-[#8C9F6E]/30">
          <div className="bg-[#f0f5e8] py-8 px-6 rounded-lg">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5a6b47] mb-2">First Name</label>
                  <input
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5a6b47] mb-2">Last Name</label>
                  <input
                    name="surname"
                    type="text"
                    onChange={handleChange}
                    value={formData.surname}
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5a6b47] mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5a6b47] mb-2">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5a6b47] mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                  required
                  minLength="6"
                />
                <p className="mt-1 text-xs text-[#5a6b47]">
                  Minimum 6 characters with letters and numbers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5a6b47] mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5a6b47] mb-2">Date of Birth</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#8C9F6E] focus:ring-[#8C9F6E] border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-[#5a6b47]">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#8C9F6E] hover:text-[#7a8c5e] font-medium">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <div className="pt-4">
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
                      Creating account...
                    </span>
                  ) : (
                    'Register as Organizer'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm space-y-2">
              <p className="text-[#5a6b47]">
                Already have an organizer account?{' '}
                <Link to="/organizerLogin" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e] transition-colors duration-200">
                  Login here
                </Link>
              </p>
              <p className="text-[#5a6b47]">
                Want to attend events?{' '}
                <Link to="/userSignup" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e] transition-colors duration-200">
                  Sign up as User
                </Link>
              </p>
              <p className="text-[#5a6b47]">
                By registering, you agree to our{' '}
                <Link to="/privacy" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e]">
                  Privacy Policy
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

export default OrganizerSignup;