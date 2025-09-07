import React, { use, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Header from '../Home/Header';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { axios_url } from '../../API/axios';
import Footer from '../Home/Footer';

const UserSignup = () => {
   
     const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

   const handleChange = (e) =>{
     const {name, value} = e.target;
     setFormData((prev) =>({
        ...prev,
        [name]: value
     }))     
   }

   const handleSubmit = async (e) =>{
      e.preventDefault(); //Don't load the Page
     
     try{

        const response = await axios.post(`${axios_url}/User/userSignup`, formData);
        console.log("Server Response :", response.data)
        console.log("Yeh Buddy User Sign Uppppp !!!")
        alert("Hey you're Registration is Success")
        navigate("/")
     } 

     catch(error){
        console.log("Error", error ,"oops! Not able to Signup")
        const msg =  error.response?.data?.message || "Bro Form Submition Failed Sorry !";
        alert(msg); // Show the error message to the user
     } 
   }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">Signup</h1>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="card py-8 px-4 sm:px-10">

                        {/* {//Form For Sumitting Data} */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.name}
                                    placeholder='Name'
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Email'
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='Password'
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <button type='submit' className="btn-primary w-full">
                                    Signup
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 text-center space-y-2">
                            <p className="text-sm text-gray-600">
                                Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">Login</Link>
                            </p>
                            <p className="text-sm text-gray-600">
                                Forgot password? <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500 font-medium">Forgot password</Link>
                            </p>
                            <p className="text-sm text-gray-600">
                                Don't have an account? <Link to="/signup" className="text-primary-600 hover:text-primary-500 font-medium">Signup</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default UserSignup;