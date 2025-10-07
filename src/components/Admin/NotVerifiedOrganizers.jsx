// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { axios_url } from '../../API/axios';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../Home/Header';
// import Footer from '../Home/Footer';

// const DocPreview = ({ title, doc }) => {
//   const isImage = (url) => typeof url === 'string' && /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
//   if (!doc?.url) {
//     return (
//       <div className="border rounded-md p-3">
//         <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
//         <p className="text-gray-500 text-sm">Not uploaded</p>
//       </div>
//     );
//   }
//   return (
//     <div className="border rounded-md p-3">
//       <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
//       {isImage(doc.url) ? (
//         <img src={doc.url} alt={title} className="w-full h-36 object-cover rounded" />
//       ) : (
//         <div className="w-full h-36 bg-gray-100 text-gray-600 rounded flex items-center justify-center">PDF Document</div>
//       )}
//       <a
//         href={doc.url}
//         target="_blank"
//         rel="noreferrer"
//         className="mt-3 inline-block px-3 py-1.5 bg-[#A3B886] text-white rounded-md text-sm hover:bg-[#7a8a5f]"
//       >
//         View
//       </a>
//     </div>
//   );
// };

// const NotVerifiedOrganizers = () => {
//   const { token } = useAuth();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${axios_url}/admin/NotVerifiedOrganizers`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         if (res.data?.success) {
//           setItems(res.data.data || []);
//         } else {
//           setError('Failed to load not verified organizers');
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchData();
//   }, [token]);

  
// const RejectOrganizer = async (id) => {
//   try {
//     console.log('Rejecting organizer with ID:', id);
//     const res = await axios.delete(`${axios_url}/admin/RejectOrganizer/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });
//     console.log('Reject response:', res.data);
//     if (res.data?.success) {
//       alert('Organizer rejected successfully');
//       window.location.reload();
//     } else {
//       alert('Failed to reject organizer: ' + (res.data?.message || 'Unknown error'));
//     }
//   } catch (err) {
//     console.error('Reject organizer error:', err);
//     alert('Error rejecting organizer: ' + (err.response?.data?.message || err.message));
//   }
// };

// const VerifyOrganizer = async (id) => {
//   try {
//     console.log('Verifying organizer with ID:', id);
//     const res = await axios.put(`${axios_url}/admin/VerifyOrganizer/${id}`, {}, {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });
//     console.log('Verify response:', res.data);
//     if (res.data?.success) {
//       alert('Organizer verified successfully');
//       window.location.reload();
//     } else {
//       alert('Failed to verify organizer: ' + (res.data?.message || 'Unknown error'));
//     }
//   } catch (err) {
//     console.error('Verify organizer error:', err);
//     alert('Error verifying organizer: ' + (err.response?.data?.message || err.message));
//   }
// };


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8C9F6E]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b">
//             <h1 className="text-xl font-semibold text-gray-800">Not Verified Organizers</h1>
//             <p className="text-sm text-gray-500">Organizers pending admin verification</p>
//           </div>

//           {items.length === 0 ? (
//             <div className="p-6 text-gray-500">No organizers pending verification.</div>
//           ) : (
//             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//               {items.map((org) => (
//                 <div key={org._id} className="border rounded-lg overflow-hidden shadow-sm">
//                   <div className="bg-[#f0f5e8] px-4 py-3 flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-full bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center">
//                       {org?.profilePhoto?.url ? (
//                         <img src={org.profilePhoto.url} alt={org.Name} className="w-full h-full object-cover" />
//                       ) : (
//                         <span className="text-[#5a6b47] font-semibold">
//                           {org?.Name?.charAt(0)?.toUpperCase() || 'O'}
//                         </span>
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="text-base font-semibold text-[#5a6b47]">{org?.Name || 'Organizer'}</h3>
//                       <p className="text-sm text-gray-600">{org?.email}</p>
//                     </div>
//                     <span className="ml-auto text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
//                       Pending
//                     </span>
//                   </div>

//                   <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <DocPreview title="Aadhar" doc={org?.aadharDoc} />
//                     <DocPreview title="PAN" doc={org?.panDoc} />
//                     <DocPreview title="GST" doc={org?.gstDoc} />
//                   </div>

//                   <div className="px-4 py-3 border-t flex gap-3 justify-end">
//                     <button onClick={()=>RejectOrganizer(org._id)} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200">
//                       Reject
//                     </button>
//                     <button onClick={()=>VerifyOrganizer(org._id)} className="px-3 py-1.5 bg-[#A3B886] text-white rounded-md text-sm hover:bg-[#7a8a5f]">
//                       Verify
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default NotVerifiedOrganizers;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axios_url } from '../../API/axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';

const DocPreview = ({ title, doc }) => {
  const isImage = (url) => typeof url === 'string' && /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  
  if (!doc?.url) {
    return (
      <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-4 text-center group hover:bg-gray-100/80 transition-all duration-300">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h4 className="text-sm font-semibold text-gray-700 mb-1">{title}</h4>
        <p className="text-gray-500 text-xs">Not uploaded</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 group hover:shadow-lg transition-all duration-300">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      {isImage(doc.url) ? (
        <div className="relative overflow-hidden rounded-lg mb-3">
          <img 
            src={doc.url} 
            alt={title} 
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        </div>
      ) : (
        <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex flex-col items-center justify-center mb-3">
          <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-blue-600 text-sm font-medium">PDF Document</span>
        </div>
      )}
      <a
        href={doc.url}
        target="_blank"
        rel="noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View Document
      </a>
    </div>
  );
};

const NotVerifiedOrganizers = () => {
  const { token } = useAuth();
  const Navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${axios_url}/admin/NotVerifiedOrganizers`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (res.data?.success) {
          setItems(res.data.data || []);
        } else {
          setError('Failed to load pending organizers');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);

  const RejectOrganizer = async (id) => {
    if (!confirm('Are you sure you want to reject this organizer?')) return;
    
    setProcessing(id);
    try {
      const res = await axios.delete(`${axios_url}/admin/RejectOrganizer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      
      if (res.data?.success) {
        setItems(prev => prev.filter(item => item._id !== id));
      } else {
        alert('Failed to reject organizer: ' + (res.data?.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Error rejecting organizer: ' + (err.response?.data?.message || err.message));
    } finally {
      setProcessing(null);
    }
  };

  const VerifyOrganizer = async (id) => {
    if (!confirm('Are you sure you want to verify this organizer?')) return;
    
    setProcessing(id);
    try {
      const res = await axios.put(`${axios_url}/admin/VerifyOrganizer/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      
      if (res.data?.success) {
        setItems(prev => prev.filter(item => item._id !== id));
      } else {
        alert('Failed to verify organizer: ' + (res.data?.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Error verifying organizer: ' + (err.response?.data?.message || err.message));
    } finally {
      setProcessing(null);
    }
  };

  return (
    <AdminLayout
      title="Pending Verification"
      subtitle="Review and verify organizer documents for platform access"
      actions={(
        <button
          onClick={() => Navigate("/admin")}
          className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      )}
    >
      {/* Premium Background */}
      <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative z-10">
          {/* Header Stats */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Total Pending */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Pending</p>
                    <p className="text-3xl font-bold text-gray-900">{items.length}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Documents to Review */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Documents to Review</p>
                    <p className="text-3xl font-bold text-gray-900">{items.length * 3}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Verified Today */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Avg. Review Time</p>
                    <p className="text-3xl font-bold text-gray-900">24h</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Required */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Action Required</p>
                    <p className="text-3xl font-bold text-gray-900">{items.length}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-lg overflow-hidden">
            {loading ? (
              // Loading Skeleton
              <div className="p-8">
                <div className="animate-pulse">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, idx) => (
                      <div key={idx} className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                          <div className="h-6 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                          ))}
                        </div>
                        <div className="flex gap-3 justify-end">
                          <div className="h-10 bg-gray-200 rounded w-20"></div>
                          <div className="h-10 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : error ? (
              // Error State
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">Unable to Load Data</h3>
                <p className="text-red-600 mb-6 max-w-md mx-auto">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Try Again
                </button>
              </div>
            ) : items.length === 0 ? (
              // Empty State
              <div className="p-16 text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">All Caught Up!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  There are no organizers pending verification. All current applications have been processed.
                </p>
                <button
                  onClick={() => Navigate("/admin")}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              // Organizers Grid
              <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                {items.map((org) => (
                  <div key={org._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                    {/* Organizer Header */}
                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-4 flex items-center gap-4 border-b border-amber-200">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {org?.profilePhoto?.url ? (
                            <img 
                              src={org.profilePhoto.url} 
                              alt={org.Name} 
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            org?.Name?.charAt(0)?.toUpperCase() || 'O'
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-amber-900">{org?.Name || 'Organizer'}</h3>
                        <p className="text-amber-700 text-sm flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {org?.email}
                        </p>
                      </div>
                      
                      <span className="px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-full border border-amber-600 shadow-sm">
                        Awaiting Verification
                      </span>
                    </div>

                    {/* Documents Grid */}
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <DocPreview title="Aadhar Card" doc={org?.aadharDoc} />
                      <DocPreview title="PAN Card" doc={org?.panDoc} />
                      <DocPreview title="GST Certificate" doc={org?.gstDoc} />
                    </div>

                    {/* Additional Info */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Applied: {org?.createdAt ? new Date(org.createdAt).toLocaleDateString() : 'Unknown'}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          ID: {org._id?.slice(-8)}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-white flex gap-3 justify-end">
                      <button 
                        onClick={() => RejectOrganizer(org._id)}
                        disabled={processing === org._id}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processing === org._id ? (
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        {processing === org._id ? 'Processing...' : 'Reject'}
                      </button>
                      <button 
                        onClick={() => VerifyOrganizer(org._id)}
                        disabled={processing === org._id}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processing === org._id ? (
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {processing === org._id ? 'Processing...' : 'Verify'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Info */}
          {!loading && items.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Review all documents carefully before approving organizer verification.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NotVerifiedOrganizers;