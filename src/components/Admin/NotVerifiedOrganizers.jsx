import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axios_url } from '../../API/axios';
import { useAuth } from '../../context/AuthContext';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const DocPreview = ({ title, doc }) => {
  const isImage = (url) => typeof url === 'string' && /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  if (!doc?.url) {
    return (
      <div className="border rounded-md p-3">
        <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
        <p className="text-gray-500 text-sm">Not uploaded</p>
      </div>
    );
  }
  return (
    <div className="border rounded-md p-3">
      <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
      {isImage(doc.url) ? (
        <img src={doc.url} alt={title} className="w-full h-36 object-cover rounded" />
      ) : (
        <div className="w-full h-36 bg-gray-100 text-gray-600 rounded flex items-center justify-center">PDF Document</div>
      )}
      <a
        href={doc.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block px-3 py-1.5 bg-[#8C9F6E] text-white rounded-md text-sm hover:bg-[#7a8a5f]"
      >
        View
      </a>
    </div>
  );
};

const NotVerifiedOrganizers = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          setError('Failed to load not verified organizers');
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
  try {
    console.log('Rejecting organizer with ID:', id);
    const res = await axios.delete(`${axios_url}/admin/RejectOrganizer/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log('Reject response:', res.data);
    if (res.data?.success) {
      alert('Organizer rejected successfully');
      window.location.reload();
    } else {
      alert('Failed to reject organizer: ' + (res.data?.message || 'Unknown error'));
    }
  } catch (err) {
    console.error('Reject organizer error:', err);
    alert('Error rejecting organizer: ' + (err.response?.data?.message || err.message));
  }
};

const VerifyOrganizer = async (id) => {
  try {
    console.log('Verifying organizer with ID:', id);
    const res = await axios.put(`${axios_url}/admin/VerifyOrganizer/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log('Verify response:', res.data);
    if (res.data?.success) {
      alert('Organizer verified successfully');
      window.location.reload();
    } else {
      alert('Failed to verify organizer: ' + (res.data?.message || 'Unknown error'));
    }
  } catch (err) {
    console.error('Verify organizer error:', err);
    alert('Error verifying organizer: ' + (err.response?.data?.message || err.message));
  }
};


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
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h1 className="text-xl font-semibold text-gray-800">Not Verified Organizers</h1>
            <p className="text-sm text-gray-500">Organizers pending admin verification</p>
          </div>

          {items.length === 0 ? (
            <div className="p-6 text-gray-500">No organizers pending verification.</div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((org) => (
                <div key={org._id} className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-[#f0f5e8] px-4 py-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#dbe4d3] overflow-hidden flex items-center justify-center">
                      {org?.profilePhoto?.url ? (
                        <img src={org.profilePhoto.url} alt={org.Name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[#5a6b47] font-semibold">
                          {org?.Name?.charAt(0)?.toUpperCase() || 'O'}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#5a6b47]">{org?.Name || 'Organizer'}</h3>
                      <p className="text-sm text-gray-600">{org?.email}</p>
                    </div>
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                      Pending
                    </span>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <DocPreview title="Aadhar" doc={org?.aadharDoc} />
                    <DocPreview title="PAN" doc={org?.panDoc} />
                    <DocPreview title="GST" doc={org?.gstDoc} />
                  </div>

                  <div className="px-4 py-3 border-t flex gap-3 justify-end">
                    <button onClick={()=>RejectOrganizer(org._id)} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200">
                      Reject
                    </button>
                    <button onClick={()=>VerifyOrganizer(org._id)} className="px-3 py-1.5 bg-[#8C9F6E] text-white rounded-md text-sm hover:bg-[#7a8a5f]">
                      Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotVerifiedOrganizers;
