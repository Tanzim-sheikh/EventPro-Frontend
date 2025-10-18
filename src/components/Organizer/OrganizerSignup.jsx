// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../../API/axios';
// import Header from '../Home/Header';
// import Footer from '../Home/Footer';

// const OrganizerSignup = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     Name: '',
//     surname: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     gender: 'male',
//     dateOfBirth: '',
//     profilePhoto: null,
//     aadharDoc: null,
//     panDoc: null,
//     gstDoc: null,
//     profilePreviewUrl: '',
//     aadharPreviewUrl: '',
//     panPreviewUrl: '',
//     gstPreviewUrl: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFile = (e) => {
//     const { name, files } = e.target;
//     if (files && files[0]) {
//       const file = files[0];
//       const previewUrl = URL.createObjectURL(file);
//       const previewKey =
//         name === 'profilePhoto' ? 'profilePreviewUrl' :
//         name === 'aadharDoc' ? 'aadharPreviewUrl' :
//         name === 'panDoc' ? 'panPreviewUrl' :
//         name === 'gstDoc' ? 'gstPreviewUrl' : '';
//       setFormData((prev) => ({ ...prev, [name]: file, [previewKey]: previewUrl }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMsg('');
    
//     try {
//       const fd = new FormData();
//       fd.append('Name', formData.Name);
//       fd.append('surname', formData.surname);
//       fd.append('email', formData.email);
//       fd.append('phoneNumber', formData.phoneNumber);
//       fd.append('password', formData.password);
//       fd.append('gender', formData.gender);
//       fd.append('dateOfBirth', formData.dateOfBirth);
//       if (formData.profilePhoto) fd.append('profilePhoto', formData.profilePhoto);
//       if (formData.aadharDoc) fd.append('aadharDoc', formData.aadharDoc);
//       if (formData.panDoc) fd.append('panDoc', formData.panDoc);
//       if (formData.gstDoc) fd.append('gstDoc', formData.gstDoc);

//       const response = await axiosInstance.post('/Organizer/OrganizerSignup', fd, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         withCredentials: true
//       });
//       console.log("Server Response:", response.data);
//       alert("Organizer registration successful! Please verify your email.");
//       navigate("/auth/organizer/verify-email", { state: { email: formData.email } });
//     } catch (error) {
//       console.log("Error", error);
//       const msg = error.response?.data?.message || "Organizer registration failed!";
//       setErrorMsg(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="flex justify-center mb-6">
//             <div className="w-16 h-16 bg-[#A3B886] rounded-2xl flex items-center justify-center shadow-lg">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//           </div>
//           <h1 className="text-center text-3xl font-bold text-[#5a6b47] font-audiowide mb-2">
//             Organizer Signup
//           </h1>
//           <p className="text-center text-sm text-[#5a6b47]">
//             Create your organizer account to start hosting events
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg border-[#8C9F6E] border-2 rounded-lg shadow-lg shadow-[#8C9F6E]/30">
//           <div className="bg-[#f0f5e8] py-8 px-6 rounded-lg">
//             {errorMsg && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm text-center">
//                 {errorMsg}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-[#5a6b47] mb-2">First Name</label>
//                   <input
//                     name="Name"
//                     type="text"
//                     onChange={handleChange}
//                     value={formData.name}
//                     placeholder="Enter first name"
//                     className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#5a6b47] mb-2">Last Name</label>
//                   <input
//                     name="surname"
//                     type="text"
//                     onChange={handleChange}
//                     value={formData.surname}
//                     placeholder="Enter last name"
//                     className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#5a6b47] mb-2">Email Address</label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email address"
//                   className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#5a6b47] mb-2">Phone Number</label>
//                 <input
//                   name="phoneNumber"
//                   type="tel"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   placeholder="Enter phone number"
//                   className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#5a6b47] mb-2">Password</label>
//                 <div className="relative">
//                   <input
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Create a strong password"
//                     className="w-full px-4 py-3 pr-10 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
//                     required
//                     minLength="6"
//                   />
//                   <button
//                     type="button"
//                     aria-label={showPassword ? 'Hide password' : 'Show password'}
//                     onClick={() => setShowPassword((p) => !p)}
//                     className="absolute inset-y-0 right-0 px-3 flex items-center text-[#5a6b47] hover:text-[#374151]"
//                   >
//                     {showPassword ? (
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
//                         <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a21.77 21.77 0 015.06-6.94M9.9 4.24A10.94 10.94 0 0112 4c7 0 10 8 10 8a21.82 21.82 0 01-3.22 4.49M1 1l22 22" />
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
//                         <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8S1 12 1 12z" />
//                         <circle cx="12" cy="12" r="3" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 <p className="mt-1 text-xs text-[#5a6b47]">
//                   Minimum 6 characters with letters and numbers
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-[#5a6b47] mb-2">Gender</label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
//                   >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                     <option value="prefer not to say">Prefer not to say</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#5a6b47] mb-2">Date of Birth</label>
//                   <input
//                     name="dateOfBirth"
//                     type="date"
//                     value={formData.dateOfBirth}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-[#dbe4d3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-[#5a6b47] mb-2">Profile Photo</label>
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 rounded-full bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center">
//                       {formData.profilePreviewUrl ? (
//                         <img src={formData.profilePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886]">IMG</div>
//                       )}
//                     </div>
//                     <div>
//                       <label htmlFor="profilePhoto" className="inline-flex items-center px-4 py-2 bg-[#A3B886] text-white text-sm font-medium rounded-md shadow hover:bg-[#7a8c5e] cursor-pointer transition-colors">
//                         Upload Photo
//                       </label>
//                       <input
//                         id="profilePhoto"
//                         name="profilePhoto"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFile}
//                         className="hidden"
//                       />
//                       {formData.profilePhoto && (
//                         <p className="mt-1 text-xs text-gray-500">{formData.profilePhoto.name}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#5a6b47] mb-2">Aadhar (image/pdf)</label>
//                   <div className="flex items-center gap-4">
//                     <div className="w-24 h-16 rounded-md bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center">
//                       {formData.aadharPreviewUrl ? (
//                         <img src={formData.aadharPreviewUrl} alt="Aadhar Preview" className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886] text-xs">DOC</div>
//                       )}
//                     </div>
//                     <div>
//                       <label htmlFor="aadharDoc" className="inline-flex items-center px-4 py-2 bg-[#A3B886] text-white text-sm font-medium rounded-md shadow hover:bg-[#7a8c5e] cursor-pointer transition-colors">
//                         Upload Aadhar
//                       </label>
//                       <input
//                         id="aadharDoc"
//                         name="aadharDoc"
//                         type="file"
//                         accept="image/*,application/pdf"
//                         onChange={handleFile}
//                         className="hidden"
//                       />
//                       {formData.aadharDoc && (
//                         <p className="mt-1 text-xs text-gray-500">{formData.aadharDoc.name}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-[#5a6b47] mb-2">PAN (image/pdf)</label>
//                   <div className="flex items-center gap-4">
//                     <div className="w-24 h-16 rounded-md bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center">
//                       {formData.panPreviewUrl ? (
//                         <img src={formData.panPreviewUrl} alt="PAN Preview" className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886] text-xs">DOC</div>
//                       )}
//                     </div>
//                     <div>
//                       <label htmlFor="panDoc" className="inline-flex items-center px-4 py-2 bg-[#A3B886] text-white text-sm font-medium rounded-md shadow hover:bg-[#7a8c5e] cursor-pointer transition-colors">
//                         Upload PAN
//                       </label>
//                       <input
//                         id="panDoc"
//                         name="panDoc"
//                         type="file"
//                         accept="image/*,application/pdf"
//                         onChange={handleFile}
//                         className="hidden"
//                       />
//                       {formData.panDoc && (
//                         <p className="mt-1 text-xs text-gray-500">{formData.panDoc.name}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#5a6b47] mb-2">GST (image/pdf)</label>
//                   <div className="flex items-center gap-4">
//                     <div className="w-24 h-16 rounded-md bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center">
//                       {formData.gstPreviewUrl ? (
//                         <img src={formData.gstPreviewUrl} alt="GST Preview" className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886] text-xs">DOC</div>
//                       )}
//                     </div>
//                     <div>
//                       <label htmlFor="gstDoc" className="inline-flex items-center px-4 py-2 bg-[#A3B886] text-white text-sm font-medium rounded-md shadow hover:bg-[#7a8c5e] cursor-pointer transition-colors">
//                         Upload GST
//                       </label>
//                       <input
//                         id="gstDoc"
//                         name="gstDoc"
//                         type="file"
//                         accept="image/*,application/pdf"
//                         onChange={handleFile}
//                         className="hidden"
//                       />
//                       {formData.gstDoc && (
//                         <p className="mt-1 text-xs text-gray-500">{formData.gstDoc.name}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   id="terms"
//                   name="terms"
//                   type="checkbox"
//                   className="h-4 w-4 text-[#A3B886] focus:ring-[#8C9F6E] border-gray-300 rounded"
//                   required
//                 />
//                 <label htmlFor="terms" className="ml-2 block text-sm text-[#5a6b47]">
//                   I agree to the{' '}
//                   <Link to="/terms" className="text-[#A3B886] hover:text-[#7a8c5e] font-medium">
//                     Terms and Conditions
//                   </Link>
//                 </label>
//               </div>

//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full py-3 px-4 bg-[#A3B886] text-white font-semibold rounded-lg shadow-md hover:bg-[#7a8c5e] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Creating account...
//                     </span>
//                   ) : (
//                     'Register as Organizer'
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6 text-center text-sm space-y-2">
//               <p className="text-[#5a6b47]">
//                 Already have an organizer account?{' '}
//                 <Link to="/organizerLogin" className="font-medium text-[#A3B886] hover:text-[#7a8c5e] transition-colors duration-200">
//                   Login here
//                 </Link>
//               </p>
//               <p className="text-[#5a6b47]">
//                 Want to attend events?{' '}
//                 <Link to="/userSignup" className="font-medium text-[#A3B886] hover:text-[#7a8c5e] transition-colors duration-200">
//                   Sign up as User
//                 </Link>
//               </p>
//               <p className="text-[#5a6b47]">
//                 By registering, you agree to our{' '}
//                 <Link to="/privacy" className="font-medium text-[#A3B886] hover:text-[#7a8c5e]">
//                   Privacy Policy
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

// export default OrganizerSignup;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../API/axios';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const OrganizerSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    Name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
    gender: 'male',
    dateOfBirth: '',
    profilePhoto: null,
    aadharDoc: null,
    panDoc: null,
    gstDoc: null,
    profilePreviewUrl: '',
    aadharPreviewUrl: '',
    panPreviewUrl: '',
    gstPreviewUrl: ''
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
      const previewKey =
        name === 'profilePhoto' ? 'profilePreviewUrl' :
        name === 'aadharDoc' ? 'aadharPreviewUrl' :
        name === 'panDoc' ? 'panPreviewUrl' :
        name === 'gstDoc' ? 'gstPreviewUrl' : '';
      setFormData((prev) => ({ ...prev, [name]: file, [previewKey]: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const fd = new FormData();
      fd.append('Name', formData.Name);
      fd.append('surname', formData.surname);
      fd.append('email', formData.email);
      fd.append('phoneNumber', formData.phoneNumber);
      fd.append('password', formData.password);
      fd.append('gender', formData.gender);
      fd.append('dateOfBirth', formData.dateOfBirth);
      if (formData.profilePhoto) fd.append('profilePhoto', formData.profilePhoto);
      if (formData.aadharDoc) fd.append('aadharDoc', formData.aadharDoc);
      if (formData.panDoc) fd.append('panDoc', formData.panDoc);
      if (formData.gstDoc) fd.append('gstDoc', formData.gstDoc);

      const response = await axiosInstance.post('/Organizer/OrganizerSignup', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      console.log("Server Response:", response.data);
      alert("Organizer registration successful! Please verify your email.");
      navigate("/auth/organizer/verify-email", { state: { email: formData.email } });
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
      {/* Main Container - Responsive Design */}
      <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#A3B886] rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5a6b47] font-audiowide mb-2">
              Organizer Signup
            </h1>
            <p className="text-xs sm:text-sm text-[#5a6b47] max-w-md mx-auto px-2">
              Create your organizer account to start hosting events
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white border-2 border-[#8C9F6E] rounded-xl shadow-lg shadow-[#8C9F6E]/20 overflow-hidden">
            <div className="bg-[#f8faf5] p-4 sm:p-6 md:p-8">
              {errorMsg && (
                <div className="mb-4 sm:mb-6 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Personal Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5a6b47] mb-1 sm:mb-2">First Name</label>
                    <input
                      name="Name"
                      type="text"
                      onChange={handleChange}
                      value={formData.Name}
                      placeholder="Enter first name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5a6b47] mb-1 sm:mb-2">Last Name</label>
                    <input
                      name="surname"
                      type="text"
                      onChange={handleChange}
                      value={formData.surname}
                      placeholder="Enter last name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5a6b47] mb-1 sm:mb-2">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5a6b47] mb-1 sm:mb-2">Phone Number</label>
                    <input
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-[#5a6b47] mb-1 sm:mb-2">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 border border-[#dbe4d3] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200 text-sm sm:text-base"
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-[#5a6b47] hover:text-[#374151] transition-colors duration-200"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5">
                          <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a21.77 21.77 0 015.06-6.94M9.9 4.24A10.94 10.94 0 0112 4c7 0 10 8 10 8a21.82 21.82 0 01-3.22 4.49M1 1l22 22" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5">
                          <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8S1 12 1 12z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-[#5a6b47]">
                    Minimum 6 characters with letters and numbers
                  </p>
                </div>

                {/* Gender and DOB */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5a6b47] mb-1 sm:mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#dbe4d3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5a6b47] mb-1 sm:mb-2">Date of Birth</label>
                    <input
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#dbe4d3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:border-[#8C9F6E] transition-colors duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* File Uploads Section */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Profile Photo */}
                  <div>
                    <label className="block text-sm font-medium text-[#5a6b47] mb-2 sm:mb-3">Profile Photo</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center flex-shrink-0">
                        {formData.profilePreviewUrl ? (
                          <img src={formData.profilePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886] text-xs">IMG</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label htmlFor="profilePhoto" className="inline-flex items-center px-3 sm:px-4 py-2 bg-[#A3B886] text-white text-xs sm:text-sm font-medium rounded-lg shadow hover:bg-[#7a8c5e] cursor-pointer transition-all duration-200 transform hover:scale-105">
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
                          <p className="mt-1 text-xs text-gray-500 truncate">{formData.profilePhoto.name}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Document Uploads */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Aadhar */}
                    <div>
                      <label className="block text-sm font-medium text-[#5a6b47] mb-2">Aadhar Document</label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="w-20 h-14 rounded-md bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center flex-shrink-0">
                          {formData.aadharPreviewUrl ? (
                            <img src={formData.aadharPreviewUrl} alt="Aadhar Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886] text-xs">AADHAR</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label htmlFor="aadharDoc" className="inline-flex items-center px-3 py-2 bg-[#A3B886] text-white text-xs font-medium rounded-lg shadow hover:bg-[#7a8c5e] cursor-pointer transition-all duration-200">
                            Upload
                          </label>
                          <input
                            id="aadharDoc"
                            name="aadharDoc"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFile}
                            className="hidden"
                          />
                          {formData.aadharDoc && (
                            <p className="mt-1 text-xs text-gray-500 truncate">{formData.aadharDoc.name}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* PAN */}
                    <div>
                      <label className="block text-sm font-medium text-[#5a6b47] mb-2">PAN Document</label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="w-20 h-14 rounded-md bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center flex-shrink-0">
                          {formData.panPreviewUrl ? (
                            <img src={formData.panPreviewUrl} alt="PAN Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886] text-xs">PAN</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label htmlFor="panDoc" className="inline-flex items-center px-3 py-2 bg-[#A3B886] text-white text-xs font-medium rounded-lg shadow hover:bg-[#7a8c5e] cursor-pointer transition-all duration-200">
                            Upload
                          </label>
                          <input
                            id="panDoc"
                            name="panDoc"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFile}
                            className="hidden"
                          />
                          {formData.panDoc && (
                            <p className="mt-1 text-xs text-gray-500 truncate">{formData.panDoc.name}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* GST */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#5a6b47] mb-2">GST Document</label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="w-20 h-14 rounded-md bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center flex-shrink-0">
                          {formData.gstPreviewUrl ? (
                            <img src={formData.gstPreviewUrl} alt="GST Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#A3B886] text-xs">GST</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label htmlFor="gstDoc" className="inline-flex items-center px-3 py-2 bg-[#A3B886] text-white text-xs font-medium rounded-lg shadow hover:bg-[#7a8c5e] cursor-pointer transition-all duration-200">
                            Upload
                          </label>
                          <input
                            id="gstDoc"
                            name="gstDoc"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFile}
                            className="hidden"
                          />
                          {formData.gstDoc && (
                            <p className="mt-1 text-xs text-gray-500 truncate">{formData.gstDoc.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2 pt-2">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-[#A3B886] focus:ring-[#8C9F6E] border-gray-300 rounded mt-1 flex-shrink-0"
                    required
                  />
                  <label htmlFor="terms" className="block text-xs sm:text-sm text-[#5a6b47] leading-tight">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#A3B886] hover:text-[#7a8c5e] font-medium">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-[#A3B886] text-white font-semibold rounded-lg shadow-md hover:bg-[#7a8c5e] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#8C9F6E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

              {/* Footer Links */}
              <div className="mt-6 text-center text-xs sm:text-sm space-y-2">
                <p className="text-[#5a6b47]">
                  Already have an organizer account?{' '}
                  <Link to="/auth/organizer/login" className="font-medium text-[#A3B886] hover:text-[#7a8c5e] transition-colors duration-200">
                    Login here
                  </Link>
                </p>
                <p className="text-[#5a6b47]">
                  Want to attend events?{' '}
                  <Link to="/auth/user/signup" className="font-medium text-[#A3B886] hover:text-[#7a8c5e] transition-colors duration-200">
                    Sign up as User
                  </Link>
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

export default OrganizerSignup;