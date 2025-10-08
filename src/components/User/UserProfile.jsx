import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axios";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const UserProfile = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.type === 'organizer') {
            navigate('/organizer/profile');
            return;
        }
        const fetchProfile = async () => {
            try {
                console.log('Fetching profile with token:', token);
                console.log('API URL:', 'http://localhost:5000/User/UserProfile');
                
                const response = await axiosInstance.get('/User/UserProfile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                console.log('Profile response:', response.data);
                
                if (response.data.success) {
                    setProfile(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                console.error('Error response:', error.response?.data);
                console.error('Error status:', error.response?.status);
                
                setError(`Failed to load profile: ${error.response?.data?.message || error.message}`);
                if (error.response?.status === 401) {
                    // Redirect to login if unauthorized
                    navigate('/auth/login');
                }
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProfile();
        } else {
            setError('No authentication token found');
            setLoading(false);
        }
    }, [token, user, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8C9F6E]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-[#A3B886] px-6 py-8 text-center">
                        <div className="w-32 h-32 mx-auto rounded-full bg-white p-1 shadow-lg">
                            {profile?.profilePhoto?.url ? (
                                <img
                                  src={profile.profilePhoto.url}
                                  alt={profile?.name || 'Profile photo'}
                                  className="w-full h-full rounded-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-4xl text-[#5a6b47] font-bold">
                                        {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-white mt-4">{profile?.name || 'User'}</h1>
                        <p className="text-white/90">{profile?.email || ''}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                            {profile?.type?.toUpperCase() || 'USER'}
                        </span>
                    </div>
                    {/* Profile Details */}
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                        
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                <p className="mt-1 text-gray-900">{profile?.name || 'Not provided'}</p>
                            </div>
                            
                            <div className="border-b pb-4">
                                <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                                <p className="mt-1 text-gray-900">{profile?.email || 'Not provided'}</p>
                            </div>
                            
                            <div className="border-b pb-4">
                                <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                                <p className="mt-1 text-gray-900 capitalize">{profile?.type || 'user'}</p>
                            </div>
                            
                            <div className="border-b pb-4">
                                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                                <p className="mt-1 text-gray-900">
                                    {profile?.createdAt 
                                        ? new Date(profile?.createdAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={() => navigate('/profile/edit')}
                                className="px-4 py-2 bg-[#A3B886] text-white rounded-md hover:bg-[#7a8a5f] transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>

    );
};

export default UserProfile;