// import axios from "axios";
// import {useNavigate} from "react-router-dom"
// import { axios_url } from "../../API/axios";
// import { useEffect, useState } from "react";

// const AdminDashborad = () => {
//  const Navigate = useNavigate();
//  const [users, setUsers] = useState([])

//    const TotalUsers = async ()=>{
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${axios_url}/Admin/AllUsers`, {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       });

//       if (response.data.success) {
//           setUsers(response.data.data);
//       }
//   } catch (error) {
//       console.error("Error fetching users:", error.response?.data || error.message);
//   }
//    }

//    useEffect(()=>{
//     TotalUsers();
//    })
//   return (
//     <>
//       {/* Premium gradient backdrop */}
//       <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f5f9f2] via-[#eef5e6] to-[#e6f0dc]">
//         {/* Decorative gradient blobs */}
//         <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#8C9F6E]/30 to-[#34d399]/20 blur-3xl"></div>
//         <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#60a5fa]/20 to-[#8C9F6E]/25 blur-3xl"></div>

//         {/* Heading */}
//         <div className="px-4 sm:px-6 lg:px-8 pt-10">
//           <div className="mx-auto max-w-7xl text-center">
//             <h1 className="font-audiowide text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
//               <span className="bg-gradient-to-r from-[#8C9F6E] via-[#34d399] to-[#60a5fa] bg-clip-text text-transparent drop-shadow-sm">
//                 Admin Dashboard
//               </span>
//             </h1>
//             <p className="mt-3 md:mt-4 text-sm md:text-base text-[#5a6b47]/80">Insights and controls at a glance</p>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="px-4 sm:px-6 lg:px-8 py-10">
//           <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* Card template */}
//             <div onClick={()=>Navigate("/admin/allUsers")} className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#8C9F6E] via-[#34d399] to-[#60a5fa] shadow-[0_10px_30px_rgba(16,185,129,0.25)]">
//               <div className="rounded-2xl h-full w-full bg-white/80 backdrop-blur-sm p-5 flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                   <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8C9F6E] to-[#34d399] text-white shadow-lg">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M7.5 6a3 3 0 116 0 3 3 0 01-6 0z"/><path d="M2.25 20.25a7.5 7.5 0 1115 0v.75H2.25v-.75z"/></svg>
//                   </div>
//                   <span className="text-xs font-semibold uppercase tracking-wide text-[#5a6b47]/70">Total: <span className="text-green-700 font-audiowide text-xl">{users.length}</span> </span>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-extrabold text-[#243b2a]">Users</div>
//                   <div className="mt-1 text-sm text-[#5a6b47]/70">All registered users</div>
//                 </div>
//               </div>
//             </div>

//             <div onClick={()=>Navigate("/admin/allOrganizers")} className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#7c3aed] via-[#a78bfa] to-[#ec4899] shadow-[0_10px_30px_rgba(167,139,250,0.25)]">
//               <div className="rounded-2xl h-full w-full bg-white/80 backdrop-blur-sm p-5 flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                   <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] text-white shadow-lg">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path d="M16 6a4 4 0 11-8 0 4 4 0 018 0z"/><path fillRule="evenodd" d="M12 14a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z" clipRule="evenodd"/></svg>
//                   </div>
//                   <span className="text-xs font-semibold uppercase tracking-wide text-[#5a6b47]/70">Active</span>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-extrabold text-[#2b2440]">Organizers</div>
//                   <div className="mt-1 text-sm text-[#5a6b47]/70">Verified organizers</div>
//                 </div>
//               </div>
//             </div>

//             <div onClick={()=>Navigate("/admin/allEvents")} className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#f59e0b] via-[#fbbf24] to-[#ef4444] shadow-[0_10px_30px_rgba(251,191,36,0.25)]">
//               <div className="rounded-2xl h-full w-full bg-white/80 backdrop-blur-sm p-5 flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                   <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] text-white shadow-lg">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M3 4.5A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5V6H3V4.5z"/><path fillRule="evenodd" d="M3 7.5h18v12A1.5 1.5 0 0119.5 21h-15A1.5 1.5 0 013 19.5v-12zm4.5 3.75A.75.75 0 018.25 9h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 11.25z" clipRule="evenodd"/></svg>
//                   </div>
//                   <span className="text-xs font-semibold uppercase tracking-wide text-[#5a6b47]/70">Live</span>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-extrabold text-[#402a24]">Events</div>
//                   <div className="mt-1 text-sm text-[#5a6b47]/70">Currently published</div>
//                 </div>
//               </div>
//             </div>

//             <div className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#06b6d4] via-[#14b8a6] to-[#0ea5e9] shadow-[0_10px_30px_rgba(14,165,233,0.25)]">
//               <div className="rounded-2xl h-full w-full bg-white/80 backdrop-blur-sm p-5 flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                   <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0ea5e9] text-white shadow-lg">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M6.75 7.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z"/><path fillRule="evenodd" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75zm2.25 3A.75.75 0 016 9h12a.75.75 0 010 1.5H6A.75.75 0 015.25 9.75z" clipRule="evenodd"/></svg>
//                   </div>
//                   <span className="text-xs font-semibold uppercase tracking-wide text-[#5a6b47]/70">Total</span>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-extrabold text-[#24343b]">Bookings</div>
//                   <div className="mt-1 text-sm text-[#5a6b47]/70">Overall confirmed</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Quick Actions */}
//         <div className="px-4 sm:px-6 lg:px-8 pb-16">
//           <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               {
//                 title: 'Create Event',
//                 desc: 'Publish a new event in minutes',
//                 gradient: 'from-[#8C9F6E] to-[#34d399]'
//               },
//               {
//                 title: 'Verify Organizer',
//                 desc: 'Approve organizer KYC and profiles',
//                 gradient: 'from-[#7c3aed] to-[#ec4899]'
//               },
//               {
//                 title: 'View Reports',
//                 desc: 'Download analytics and trends',
//                 gradient: 'from-[#06b6d4] to-[#0ea5e9]'
//               }
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className={`rounded-2xl p-[1px] bg-gradient-to-r ${item.gradient} shadow-xl cursor-pointer`}
//                 onClick={() => {
//                   if (item.title === 'Verify Organizer') {
//                     Navigate('/admin/not-verified-organizers');
//                   }
//                 }}
//               >
//                 <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 flex items-start gap-4">
//                   <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.gradient} shadow-md`}></div>
//                   <div>
//                     <div className="text-lg font-bold text-[#2b3a2e] font-audiowide">{item.title}</div>
//                     <div className="text-sm text-[#5a6b47]/80">{item.desc}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
//   export default AdminDashborad;
  
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axios_url } from "../../API/axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeOrganizers: 0,
    liveEvents: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);

  const TotalUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${axios_url}/Admin/AllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.data);
        setStats(prev => ({ ...prev, totalUsers: response.data.data.length }));
      }
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    TotalUsers();
  }, []);

  // Loading skeleton for light theme
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6 mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Premium Light Theme Background */}
      <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
        
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-30"></div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header Section */}
          <div className="px-4 sm:px-6 lg:px-8 pt-12">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <h1 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </span>
                </h1>
                <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                  Complete control and real-time insights for efficient management
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid - Premium Light Cards */}
          <div className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Users Card */}
              <div 
                onClick={() => Navigate("/admin/allUsers")}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/80 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-300 hover:shadow-blue-100"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      Total: <span className="text-blue-600 font-bold ml-1">{stats.totalUsers}</span>
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Users</h3>
                  <p className="text-gray-600 text-sm">All registered users in system</p>
                  
                  {/* Hover arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizers Card */}
              <div 
                onClick={() => Navigate("/admin/allOrganizers")}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/80 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-purple-300 hover:shadow-purple-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      Active
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Organizers</h3>
                  <p className="text-gray-600 text-sm">Verified event organizers</p>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Events Card */}
              <div 
                onClick={() => Navigate("/admin/allEvents")}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/80 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-amber-300 hover:shadow-amber-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      Live
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Events</h3>
                  <p className="text-gray-600 text-sm">Currently published events</p>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bookings Card */}
              <div 
                onClick={() => Navigate("/admin/allBookings")}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/80 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-emerald-300 hover:shadow-emerald-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      Total
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Bookings</h3>
                  <p className="text-gray-600 text-sm">Overall confirmed bookings</p>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Quick Actions</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Frequently used admin operations for quick access</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Create Event',
                    desc: 'Publish a new event in minutes',
                    icon: '🎯',
                    gradient: 'from-blue-500 to-blue-600',
                    bgGradient: 'from-blue-50 to-blue-100',
                    border: 'border-blue-200',
                    action: () => Navigate('/admin/create-event')
                  },
                  {
                    title: 'Verify Organizer',
                    desc: 'Approve organizer KYC and profiles',
                    icon: '✅',
                    gradient: 'from-emerald-500 to-emerald-600',
                    bgGradient: 'from-emerald-50 to-emerald-100',
                    border: 'border-emerald-200',
                    action: () => Navigate('/admin/not-verified-organizers')
                  },
                  {
                    title: 'View Reports',
                    desc: 'Download analytics and trends',
                    icon: '📊',
                    gradient: 'from-purple-500 to-purple-600',
                    bgGradient: 'from-purple-50 to-purple-100',
                    border: 'border-purple-200',
                    action: () => Navigate('/admin/reports')
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={item.action}
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.bgGradient} border ${item.border} p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <button className={`w-full py-2 px-4 bg-gradient-to-r ${item.gradient} text-white rounded-lg font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg`}>
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;