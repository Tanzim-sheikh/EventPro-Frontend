import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axios_url } from "../../API/axios";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const OrganizerProfile = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${axios_url}/Organizer/OrganizerProfile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setProfile(response.data.data);
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to load organizer profile');
                if (error.response?.status === 401) {
                    navigate('/auth/login');
                }
            } finally {
                setLoading(false);
            }
        };

        if (token && user?.type === 'organizer') {
            fetchProfile();
        } else if (user && user.type !== 'organizer') {
            navigate('/');
        } else {
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
        <Header/>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="bg-[#8C9F6E] px-6 py-8 text-center">
                        <div className="w-32 h-32 mx-auto rounded-full bg-white p-1 shadow-lg">
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-4xl text-[#5a6b47] font-bold">
                                    {profile?.Name?.charAt(0)?.toUpperCase() || 'O'}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mt-4">{profile?.Name || 'Organizer'}</h1>
                        <p className="text-white/90">{profile?.email || ''}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                            {profile?.type?.toUpperCase() || 'ORGANIZER'}
                        </span>
                    </div>

                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Organizer Information</h2>
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                <p className="mt-1 text-gray-900">{profile?.Name || 'Not provided'}</p>
                            </div>
                            <div className="border-b pb-4">
                                <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                                <p className="mt-1 text-gray-900">{profile?.email || 'Not provided'}</p>
                            </div>
                            <div className="border-b pb-4">
                                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                                <p className="mt-1 text-gray-900">{profile?.phoneNumber || 'Not provided'}</p>
                            </div>
                            <div className="border-b pb-4">
                                <h3 className="text-sm font-medium text-gray-500">Account Created </h3>
                                <p className="mt-1 text-gray-900">{profile?.createdAt ? new Date(profile?.createdAt).toLocaleDateString() : 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
  
    );
};

export default OrganizerProfile;


