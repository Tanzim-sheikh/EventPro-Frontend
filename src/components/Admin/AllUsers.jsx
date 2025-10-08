import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../API/axios';
import AdminLayout from "./layout/AdminLayout.jsx";

const AllUsers = () => {
    const Navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [userType, setUserType] = useState("all");

    const GetallUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.get('/Admin/AllUsers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
       GetallUsers();
    }, []);

    // Filter users based on search and type
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = userType === "all" || user.type === userType;
        return matchesSearch && matchesType;
    });

    // Get unique user types for filter
    const userTypes = [...new Set(users.map(user => user.type))];

    return (
        <AdminLayout
          title="All Users"
          subtitle="Comprehensive management and overview of all registered users"
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
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div className="relative z-10 mt-2 p-3 rounded-xl">
              {/* Header Stats */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Total Users */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Users</p>
                        <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Active Users */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Active Today</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {users.filter(user => user.lastActive === new Date().toDateString()).length}
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* New This Week */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">New This Week</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {users.filter(user => {
                            const oneWeekAgo = new Date();
                            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                            return new Date(user.createdAt) > oneWeekAgo;
                          }).length}
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Filtered Results */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Filtered</p>
                        <p className="text-3xl font-bold text-gray-900">{filteredUsers.length}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filters Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 max-w-2xl">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 shadow-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                    >
                      <option value="all">All Types</option>
                      {userTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    
                    <button
                      onClick={GetallUsers}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh
                    </button>
                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-lg overflow-hidden">
                {loading ? (
                  // Loading Skeleton
                  <div className="p-8">
                    <div className="animate-pulse">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                      {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="flex items-center space-x-4 mb-4 py-4">
                          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                          <div className="h-6 bg-gray-200 rounded w-20"></div>
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
                            User
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">
                            Contact
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">
                            Account
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200/60">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/40">
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user, idx) => (
                            <tr 
                              key={idx} 
                              className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 cursor-pointer"
                            >
                              {/* User Info */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {user.name || 'Unknown User'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      ID: {user._id?.slice(-8) || 'N/A'}
                                    </div>
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
                                    {user.email || 'No email'}
                                  </div>
                                  {user.phoneNumber && (
                                    <div className="text-sm text-gray-600 flex items-center gap-2">
                                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                      </svg>
                                      {user.phoneNumber}
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Account Information */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="space-y-1">
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Type:</span> 
                                    <span className="ml-1 capitalize">{user.type || 'User'}</span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Joined:</span> 
                                    <span className="ml-1">
                                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Status Badge */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col gap-2">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                    user.type === 'admin' 
                                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                      : user.type === 'organizer'
                                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                  }`}>
                                    {user.type || 'User'}
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                                    Active
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          // Empty State
                          <tr>
                            <td colSpan="4" className="px-6 py-16 text-center">
                              <div className="text-gray-500">
                                <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                  {searchTerm || userType !== 'all' 
                                    ? "No users match your search criteria." 
                                    : "No users have registered yet. Users will appear here once they sign up."}
                                </p>
                                {(searchTerm || userType !== 'all') && (
                                  <button
                                    onClick={() => { setSearchTerm(''); setUserType('all'); }}
                                    className="mt-3 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                  >
                                    Clear filters
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
              {!loading && filteredUsers.length > 0 && (
                <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                  <div>
                    Showing <span className="font-semibold">{filteredUsers.length}</span> of{' '}
                    <span className="font-semibold">{users.length}</span> users
                  </div>
                  {(searchTerm || userType !== 'all') && (
                    <div className="text-blue-600">
                      Filtered by: {searchTerm && `"${searchTerm}"`} {searchTerm && userType !== 'all' && ' • '} 
                      {userType !== 'all' && `Type: ${userType}`}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </AdminLayout>
    );
};

export default AllUsers;