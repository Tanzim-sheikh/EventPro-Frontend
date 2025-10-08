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
import axiosInstance from '../../API/axios';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const UserSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePhoto: null,
    profilePreviewUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [name]: file, profilePreviewUrl: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('password', formData.password);
      if (formData.profilePhoto) {
        fd.append('profilePhoto', formData.profilePhoto);
      }

      const response = await axiosInstance.post('/User/userSignup', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      console.log("Server Response:", response.data);
      alert("Hey! Your registration is successful! Please verify your email.");
      navigate("/auth/user/verify-email", { state: { email: formData.email } });
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
            <div className="w-16 h-16 bg-[#A3B886] rounded-2xl flex items-center justify-center shadow-lg">
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
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Create a password'
                    className="w-full px-4 py-3 pr-10 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-[#5a6b47] hover:text-[#374151]"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a21.77 21.77 0 015.06-6.94M9.9 4.24A10.94 10.94 0 0112 4c7 0 10 8 10 8a21.82 21.82 0 01-3.22 4.49M1 1l22 22" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-[#5a6b47]">
                  Use at least 8 characters with a mix of letters and numbers
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5a6b47] mb-2">Profile Photo (optional)</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center">
                    {formData.profilePreviewUrl ? (
                      <img src={formData.profilePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886]">IMG</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="profilePhoto" className="inline-flex items-center px-4 py-2 bg-[#A3B886] text-white text-sm font-medium rounded-md shadow hover:bg-[#7a8c5e] cursor-pointer transition-colors">
                      Upload Photo
                    </label>
                    <input
                      id="profilePhoto"
                      name="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="hidden"
                    />
                    {formData.profilePhoto && (
                      <p className="mt-1 text-xs text-gray-500">{formData.profilePhoto.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#A3B886] focus:ring-[#8C9F6E] border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-[#5a6b47]">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#A3B886] hover:text-[#7a8c5e] font-medium">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type='submit'
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#A3B886] text-white font-semibold rounded-lg shadow-md hover:bg-[#7a8c5e] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <Link to="/login" className="font-medium text-[#A3B886] hover:text-[#7a8c5e] transition-colors duration-200">
                  Login here
                </Link>
              </p>
              <p className="text-[#5a6b47]">
                Are you an organizer?{' '}
                <Link to="/organizerSignup" className="font-medium text-[#A3B886] hover:text-[#7a8c5e] transition-colors duration-200">
                  Sign up as Organizer
                </Link>
              </p>
              <p className="text-[#5a6b47]">
                By signing up, you agree to our{' '}
                <Link to="/privacy" className="font-medium text-[#A3B886] hover:text-[#7a8c5e]">
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