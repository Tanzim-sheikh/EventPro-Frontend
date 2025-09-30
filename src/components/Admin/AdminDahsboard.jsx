import axios from "axios";
import {useNavigate} from "react-router-dom"
import { axios_url } from "../../API/axios";
import { useEffect, useState } from "react";

const AdminDashborad = () => {
 const Navigate = useNavigate();
 const [users, setUsers] = useState([])

   const TotalUsers = async ()=>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${axios_url}/Admin/AllUsers`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.data.success) {
          setUsers(response.data.data);
      }
  } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
  }
   }

   useEffect(()=>{
    TotalUsers();
   })
  return (
    <>
      {/* Premium gradient backdrop */}
      <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f5f9f2] via-[#eef5e6] to-[#e6f0dc]">
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#8C9F6E]/30 to-[#34d399]/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#60a5fa]/20 to-[#8C9F6E]/25 blur-3xl"></div>

        {/* Heading */}
        <div className="px-4 sm:px-6 lg:px-8 pt-10">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="font-audiowide text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#8C9F6E] via-[#34d399] to-[#60a5fa] bg-clip-text text-transparent drop-shadow-sm">
                Admin Dashboard
              </span>
            </h1>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-[#5a6b47]/80">Insights and controls at a glance</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card template */}
            <div onClick={()=>Navigate("/admin/allUsers")} className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#8C9F6E] via-[#34d399] to-[#60a5fa] shadow-[0_10px_30px_rgba(16,185,129,0.25)]">
              <div className="rounded-2xl h-full w-full bg-white/80 backdrop-blur-sm p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8C9F6E] to-[#34d399] text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M7.5 6a3 3 0 116 0 3 3 0 01-6 0z"/><path d="M2.25 20.25a7.5 7.5 0 1115 0v.75H2.25v-.75z"/></svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#5a6b47]/70">Total: <span className="text-green-700 font-audiowide text-xl">{users.length}</span> </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#243b2a]">Users</div>
                  <div className="mt-1 text-sm text-[#5a6b47]/70">All registered users</div>
                </div>
              </div>
            </div>

            <div onClick={()=>Navigate("/admin/allOrganizers")} className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#7c3aed] via-[#a78bfa] to-[#ec4899] shadow-[0_10px_30px_rgba(167,139,250,0.25)]">
              <div className="rounded-2xl h-full w-full bg-white/80 backdrop-blur-sm p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path d="M16 6a4 4 0 11-8 0 4 4 0 018 0z"/><path fillRule="evenodd" d="M12 14a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z" clipRule="evenodd"/></svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#5a6b47]/70">Active</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#2b2440]">Organizers</div>
                  <div className="mt-1 text-sm text-[#5a6b47]/70">Verified organizers</div>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#f59e0b] via-[#fbbf24] to-[#ef4444] shadow-[0_10px_30px_rgba(251,191,36,0.25)]">
              <div className="rounded-2xl h-full w-full bg-white/80 backdrop-blur-sm p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M3 4.5A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5V6H3V4.5z"/><path fillRule="evenodd" d="M3 7.5h18v12A1.5 1.5 0 0119.5 21h-15A1.5 1.5 0 013 19.5v-12zm4.5 3.75A.75.75 0 018.25 9h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 11.25z" clipRule="evenodd"/></svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#5a6b47]/70">Live</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#402a24]">Events</div>
                  <div className="mt-1 text-sm text-[#5a6b47]/70">Currently published</div>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl p-[1px] bg-gradient-to-br from-[#06b6d4] via-[#14b8a6] to-[#0ea5e9] shadow-[0_10px_30px_rgba(14,165,233,0.25)]">
              <div className="rounded-2xl h-full w-full bg-white/80 backdrop-blur-sm p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0ea5e9] text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M6.75 7.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z"/><path fillRule="evenodd" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75zm2.25 3A.75.75 0 016 9h12a.75.75 0 010 1.5H6A.75.75 0 015.25 9.75z" clipRule="evenodd"/></svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#5a6b47]/70">Total</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#24343b]">Bookings</div>
                  <div className="mt-1 text-sm text-[#5a6b47]/70">Overall confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Create Event',
                desc: 'Publish a new event in minutes',
                gradient: 'from-[#8C9F6E] to-[#34d399]'
              },
              {
                title: 'Verify Organizer',
                desc: 'Approve organizer KYC and profiles',
                gradient: 'from-[#7c3aed] to-[#ec4899]'
              },
              {
                title: 'View Reports',
                desc: 'Download analytics and trends',
                gradient: 'from-[#06b6d4] to-[#0ea5e9]'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-[1px] bg-gradient-to-r ${item.gradient} shadow-xl cursor-pointer`}
                onClick={() => {
                  if (item.title === 'Verify Organizer') {
                    Navigate('/admin/not-verified-organizers');
                  }
                }}
              >
                <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.gradient} shadow-md`}></div>
                  <div>
                    <div className="text-lg font-bold text-[#2b3a2e] font-audiowide">{item.title}</div>
                    <div className="text-sm text-[#5a6b47]/80">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
  export default AdminDashborad;
  