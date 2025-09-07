import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axios_url } from '../../API/axios';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${axios_url}/User/UserLogin`, formData);
      console.log("Login response:", response);
      if(response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.log("Login error:", error, error.response);
      const msg = error.response?.data?.message || 'Login failed. Please try again!';
      setErrorMsg(msg);
      alert(msg);
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">Login</h1>
        {errorMsg && <div className="text-red-600 text-center mb-4">{errorMsg}</div>}
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card py-8 px-4 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-field"
                required
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input-field"
                required
              />
            </div>
            <div>
              <button type="submit" className="btn-primary w-full">
                Login
              </button>
            </div>
          </form>
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <span className="text-primary-600 hover:text-primary-500 font-medium cursor-pointer" onClick={() => navigate('/signup')}>
                Signup
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Forgot password?{' '}
              <span className="text-primary-600 hover:text-primary-500 font-medium cursor-pointer">
                Forgot password
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
