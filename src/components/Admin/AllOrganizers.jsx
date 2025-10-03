import axios from "axios"
import { axios_url } from "../../API/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AllOrganizers = () => {
   
    const Navigate = useNavigate();
    const [organizers, setOrganizers] = useState([])
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            {/* Premium gradient backdrop */}
            <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f5f9f2] via-[#eef5e6] to-[#e6f0dc]">
                {/* Decorative gradient blobs */}
                <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#8C9F6E]/30 to-[#34d399]/20 blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#60a5fa]/20 to-[#8C9F6E]/25 blur-3xl"></div>

                {/* Header */}
                <div className="px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="font-audiowide text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                                    <span className="bg-gradient-to-r from-[#8C9F6E] via-[#34d399] to-[#60a5fa] bg-clip-text text-transparent">
                                        All Organizers
                                    </span>
                                </h1>
                                <p className="mt-2 text-sm text-[#5a6b47]/80">
                                    Manage and view all registered organizers
                                </p>
                            </div>
                            <button
                                onClick={() => Navigate("/admin")}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8C9F6E] to-[#34d399] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                ← Back to Dashboard
                            </button>
                        </div>

                        {/* Stats Card */}
                        <div className="mb-8">
                            <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#ec4899] shadow-xl">
                                <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] text-white shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                                <path d="M16 6a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                <path fillRule="evenodd" d="M12 14a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-[#2b2440]">{organizers.length}</div>
                                            <div className="text-sm text-[#5a6b47]/80">Total Organizers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table Container */}
                        <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#8C9F6E] to-[#34d399] shadow-2xl">
                            <div className="rounded-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                                {loading ? (
                                    <div className="flex justify-center items-center py-20">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8C9F6E]"></div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead className="bg-gradient-to-r from-[#8C9F6E] to-[#34d399] text-white">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">S.No.</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Surname</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Phone</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Gender</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Date of Birth</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {organizers.length > 0 ? (
                                                    organizers.map((organizer, idx) => (
                                                        <tr key={idx} className="hover:bg-gradient-to-r hover:from-[#8C9F6E]/5 hover:to-[#34d399]/5 transition-all duration-200">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2b3a2e]">
                                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#8C9F6E] to-[#34d399] text-white text-xs font-bold">
                                                                    {idx + 1}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2b3a2e] font-medium">{organizer.Name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47]">{organizer.surname}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47]">{organizer.email}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47]">{organizer.phoneNumber}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47] capitalize">{organizer.gender}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5a6b47]">
                                                                {new Date(organizer.dateOfBirth).toLocaleDateString("en-IN", {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                })}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#8C9F6E] to-[#34d399] text-white">
                                                                    {organizer.type}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8" className="px-6 py-12 text-center">
                                                            <div className="text-[#5a6b47]/60">
                                                                <svg className="mx-auto h-12 w-12 text-[#A3B886]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <h3 className="mt-2 text-sm font-medium text-[#2b3a2e]">No organizers found</h3>
                                                                <p className="mt-1 text-sm text-[#5a6b47]/60">No organizers have registered yet.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllOrganizers