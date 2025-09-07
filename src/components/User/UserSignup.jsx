// import React, { use, useState } from 'react'
// import { Navigate } from 'react-router-dom';
// import Header from '../Home/Header';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { axios_url } from '../../API/axios';
// import Footer from '../Home/Footer';

// const UserSignup = () => {
   
//      const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//     })

//    const handleChange = (e) =>{
//      const {name, value} = e.target;
//      setFormData((prev) =>({
//         ...prev,
//         [name]: value
//      }))     
//    }

//    const handleSubmit = async (e) =>{
//       e.preventDefault(); //Don't load the Page
     
//      try{

//         const response = await axios.post(`${axios_url}/User/userSignup`, formData);
//         console.log("Server Response :", response.data)
//         console.log("Yeh Buddy User Sign Uppppp !!!")
//         alert("Hey you're Registration is Success")
//         navigate("/")
//      } 

//      catch(error){
//         console.log("Error", error ,"oops! Not able to Signup")
//         const msg =  error.response?.data?.message || "Bro Form Submition Failed Sorry !";
//         alert(msg); // Show the error message to the user
//      } 
//    }

//     return (
//         <>
//             <Header />
//             <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//                 <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                     <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">Signup</h1>
//                 </div>
//                 <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                     <div className="card py-8 px-4 sm:px-10">

//                         {/* {//Form For Sumitting Data} */}
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div>
//                                 <input
//                                     name="name"
//                                     type="text"
//                                     onChange={handleChange}
//                                     value={formData.name}
//                                     placeholder='Name'
//                                     className="input-field"
//                                 />
//                             </div>
//                             <div>
//                                 <input
//                                     name="email"
//                                     type="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     placeholder='Email'
//                                     className="input-field"
//                                 />
//                             </div>
//                             <div>
//                                 <input
//                                     name="password"
//                                     type="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     placeholder='Password'
//                                     className="input-field"
//                                 />
//                             </div>
//                             <div>
//                                 <button type='submit' className="btn-primary w-full">
//                                     Signup
//                                 </button>
//                             </div>
//                         </form>
//                         <div className="mt-6 text-center space-y-2">
//                             <p className="text-sm text-gray-600">
//                                 Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">Login</Link>
//                             </p>
//                             <p className="text-sm text-gray-600">
//                                 Forgot password? <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500 font-medium">Forgot password</Link>
//                             </p>
//                             <p className="text-sm text-gray-600">
//                                 Don't have an account? <Link to="/signup" className="text-primary-600 hover:text-primary-500 font-medium">Signup</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer/>
//         </>
//     )
// }
// export default UserSignup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axios_url } from '../../API/axios';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const UserSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
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
      const response = await axios.post(`${axios_url}/User/userSignup`, formData);
      console.log("Server Response:", response.data);
      alert("Hey! Your registration is successful!");
      navigate("/login");
    } catch (error) {
      console.log("Error", error);
      const msg = error.response?.data?.message || "Registration failed. Please try again!";
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h1 className="text-center text-3xl font-bold text-[#5a6b47] font-audiowide mb-2">
            User Signup
          </h1>
          <p className="text-center text-sm text-[#5a6b47]">
            Join us and start exploring amazing events
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
                <label htmlFor="name" className="block text-sm font-medium text-[#5a6b47] mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder='Enter your full name'
                  className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#5a6b47] mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#5a6b47] mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Create a password'
                  className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                  required
                />
                <p className="mt-1 text-xs text-[#5a6b47]">
                  Use at least 8 characters with a mix of letters and numbers
                </p>
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

              <div>
                <button
                  type='submit'
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
                    'Create Account'
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
                    Or sign up with
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
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e] transition-colors duration-200">
                  Login here
                </Link>
              </p>
              <p className="text-[#5a6b47]">
                Are you an organizer?{' '}
                <Link to="/organizerSignup" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e] transition-colors duration-200">
                  Sign up as Organizer
                </Link>
              </p>
              <p className="text-[#5a6b47]">
                By signing up, you agree to our{' '}
                <Link to="/privacy" className="font-medium text-[#8C9F6E] hover:text-[#7a8c5e]">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default UserSignup;