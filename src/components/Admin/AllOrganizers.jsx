// import axios from "axios"
// import { axios_url } from "../../API/axios";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const AllOrganizers = () => {
   
//     const Navigate = useNavigate();
//     const [organizers, setOrganizers] = useState([])
//     const [loading, setLoading] = useState(true);

//     const GetAllOrganizers = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.get(`${axios_url}/Admin/AllOrganizers`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.data.success) {
//                 setOrganizers(response.data.data);
//             }
//         } catch (error) {
//             console.error("Error fetching Organizers:", error.response?.data || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         GetAllOrganizers();
//     }, []);

//     return (
//         <>
//             {/* Premium gradient backdrop */}
//             <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f5f9f2] via-[#eef5e6] to-[#e6f0dc]">
//                 {/* Decorative gradient blobs */}
//                 <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#8C9F6E]/30 to-[#34d399]/20 blur-3xl"></div>
//                 <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#60a5fa]/20 to-[#8C9F6E]/25 blur-3xl"></div>

//                 {/* Header */}
//                 <div className="px-4 sm:px-6 lg:px-8 pt-10">
//                     <div className="mx-auto max-w-7xl">
//                         <div className="flex items-center justify-between mb-8">
//                             <div>
//                                 <h1 className="font-audiowide text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
//                                     <span className="bg-gradient-to-r from-[#8C9F6E] via-[#34d399] to-[#60a5fa] bg-clip-text text-transparent">
//                                         All Organizers
//                                     </span>
//                                 </h1>
//                                 <p className="mt-2 text-sm text-[#5a6b47]/80">
//                                     Manage and view all registered organizers
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={() => Navigate("/admin")}
//                                 className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8C9F6E] to-[#34d399] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//                             >
//                                 ← Back to Dashboard
//                             </button>
//                         </div>

//                         {/* Stats Card */}
//                         <div className="mb-8">
//                             <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#ec4899] shadow-xl">
//                                 <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6">
//                                     <div className="flex items-center gap-4">
//                                         <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] text-white shadow-lg">
//                                             <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
//                                                 <path d="M16 6a4 4 0 11-8 0 4 4 0 018 0z"/>
//                                                 <path fillRule="evenodd" d="M12 14a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z" clipRule="evenodd"/>
//                                             </svg>
//                                         </div>
//                                         <div>
//                                             <div className="text-2xl font-bold text-[#2b2440]">{organizers.length}</div>
//                                             <div className="text-sm text-[#5a6b47]/80">Total Organizers</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Table Container */}
//                         <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#8C9F6E] to-[#34d399] shadow-2xl">
//                             <div className="rounded-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
//                                 {loading ? (
//                                     <div className="flex justify-center items-center py-20">
//                                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8C9F6E]"></div>
//                                     </div>
//                                 ) : (
//                                     <div className="overflow-x-auto">
//                                         <table className="min-w-full">
//                                             <thead className="bg-gradient-to-r from-[#8C9F6E] to-[#34d399] text-white">
//                                                 <tr>
//                                                     <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">S.No.</th>
//                                                     <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
//                                                     <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Surname</th>
//                                                     <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
//                                                     <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Phone</th>
//                                                     <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Gender</th>
//                                                     <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Date of Birth</th>
//                                                     <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="divide-y divide-gray-200">
//                                                 {organizers.length > 0 ? (
//                                                     organizers.map((organizer, idx) => (
//                                                         <tr key={idx} className="hover:bg-gradient-to-r hover:from-[#8C9F6E]/5 hover:to-[#34d399]/5 transition-all duration-200">
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2b3a2e]">
//                                                                 <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#8C9F6E] to-[#34d399] text-white text-xs font-bold">
//                                                                     {idx + 1}
//                                                                 </div>
//                                                             </td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2b3a2e] font-medium">{organizer.Name}</td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47]">{organizer.surname}</td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47]">{organizer.email}</td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47]">{organizer.phoneNumber}</td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47] capitalize">{organizer.gender}</td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47]">
//                                                                 {new Date(organizer.dateOfBirth).toLocaleDateString("en-IN", {
//                                                                     day: "2-digit",
//                                                                     month: "2-digit",
//                                                                     year: "numeric",
//                                                                 })}
//                                                             </td>
//                                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#8C9F6E] to-[#34d399] text-white">
//                                                                     {organizer.type}
//                                                                 </span>
//                                                             </td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="8" className="px-6 py-12 text-center">
//                                                             <div className="text-[#5a6b47]/60">
//                                                                 <svg className="mx-auto h-12 w-12 text-[#A3B886]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                                 </svg>
//                                                                 <h3 className="mt-2 text-sm font-medium text-[#2b3a2e]">No organizers found</h3>
//                                                                 <p className="mt-1 text-sm text-[#5a6b47]/60">No organizers have registered yet.</p>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AllOrganizers

import axios from "axios"
import { axios_url } from "../../API/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AllOrganizers = () => {
   
    const Navigate = useNavigate();
    const [organizers, setOrganizers] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const GetAllOrganizers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${axios_url}/Admin/AllOrganizers`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setOrganizers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching Organizers:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllOrganizers();
    }, []);

    // Filter organizers based on search
    const filteredOrganizers = organizers.filter(organizer =>
        organizer.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organizer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organizer.phoneNumber?.includes(searchTerm)
    );

    return (
        <>
            {/* Premium Light Theme Background */}
            <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
                
                {/* Subtle Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
                </div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-30"></div>

                {/* Main Content */}
                <div className="relative z-10">
                    {/* Header Section */}
                    <div className="px-4 sm:px-6 lg:px-8 pt-8">
                        <div className="mx-auto max-w-7xl">
                            {/* Header with Back Button */}
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                                <div className="mb-6 lg:mb-0">
                                    <h1 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                                        <span className="bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                            All Organizers
                                        </span>
                                    </h1>
                                    <p className="text-lg text-gray-600 font-light">
                                        Manage and monitor all registered event organizers
                                    </p>
                                </div>
                                <button
                                    onClick={() => Navigate("/admin")}
                                    className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-fit"
                                >
                                    <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Dashboard
                                </button>
                            </div>

                            {/* Stats and Search Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                {/* Stats Card */}
                                <div className="lg:col-span-1">
                                    <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/80 p-6 transition-all duration-300 hover:shadow-xl hover:border-purple-300">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-gray-900">{organizers.length}</div>
                                                    <div className="text-sm text-gray-600">Total Organizers</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Bar */}
                                <div className="lg:col-span-2">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search organizers by name, email, or phone..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Table Container */}
                            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/80 shadow-lg overflow-hidden">
                                {loading ? (
                                    // Loading Skeleton
                                    <div className="p-8">
                                        <div className="animate-pulse">
                                            {[...Array(5)].map((_, idx) => (
                                                <div key={idx} className="flex items-center space-x-4 mb-4">
                                                    <div className="h-12 bg-gray-200 rounded w-12"></div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200/60">
                                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/80">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">
                                                        S.No.
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">
                                                        Organizer
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">
                                                        Contact
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">
                                                        Personal Info
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200/40">
                                                {filteredOrganizers.length > 0 ? (
                                                    filteredOrganizers.map((organizer, idx) => (
                                                        <tr 
                                                            key={idx} 
                                                            className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 cursor-pointer"
                                                            onClick={() => {/* Add organizer detail view */}}
                                                        >
                                                            {/* Serial Number */}
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                                                        {idx + 1}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* Organizer Name */}
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div>
                                                                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                                        {organizer.Name} {organizer.surname}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 capitalize">
                                                                        {organizer.type}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* Contact Information */}
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="space-y-1">
                                                                    <div className="text-sm text-gray-900 flex items-center gap-2">
                                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                        </svg>
                                                                        {organizer.email}
                                                                    </div>
                                                                    <div className="text-sm text-gray-600 flex items-center gap-2">
                                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                                        </svg>
                                                                        {organizer.phoneNumber}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* Personal Information */}
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="space-y-1">
                                                                    <div className="text-sm text-gray-600">
                                                                        <span className="font-medium">Gender:</span> 
                                                                        <span className="capitalize ml-1">{organizer.gender}</span>
                                                                    </div>
                                                                    <div className="text-sm text-gray-600">
                                                                        <span className="font-medium">DOB:</span> 
                                                                        <span className="ml-1">
                                                                            {new Date(organizer.dateOfBirth).toLocaleDateString("en-IN", {
                                                                                day: "2-digit",
                                                                                month: "2-digit",
                                                                                year: "numeric",
                                                                            })}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* Status Badge */}
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md">
                                                                    Active
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    // Empty State
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-16 text-center">
                                                            <div className="text-gray-500">
                                                                <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                </svg>
                                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No organizers found</h3>
                                                                <p className="text-gray-600 max-w-md mx-auto">
                                                                    {searchTerm ? "No organizers match your search criteria." : "No organizers have registered yet."}
                                                                </p>
                                                                {searchTerm && (
                                                                    <button
                                                                        onClick={() => setSearchTerm("")}
                                                                        className="mt-3 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                                                    >
                                                                        Clear search
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Footer Stats */}
                            {!loading && filteredOrganizers.length > 0 && (
                                <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                                    <div>
                                        Showing <span className="font-semibold">{filteredOrganizers.length}</span> of{' '}
                                        <span className="font-semibold">{organizers.length}</span> organizers
                                    </div>
                                    {searchTerm && (
                                        <div className="text-blue-600">
                                            Filtered by: "{searchTerm}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllOrganizers;