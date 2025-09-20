import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Home from './components/Home/Home';
import Events from './components/Home/Events';
import OptionSignup from './components/Home/OptionSignup';
import OptionLogin from './components/Home/OptionLogin';
import UserSignup from './components/User/UserSignup';
import UserLogin from './components/User/UserLogin';
import UserProfile from './components/User/UserProfile';
import OrganizerSignup from './components/Organizer/OrganizerSignup';
import OrganizerLogin from './components/Organizer/OrganizerLogin';
import OrganizerProfile from './components/Organizer/OrganizerProfile';
import AuthContext, { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./context/protectedRoute.jsx";
import AdminDashborad from './components/Admin/AdminDahsboard.jsx';
import AllUsers from './components/Admin/AllUsers.jsx';
import AllOrganizers from './components/Admin/AllOrganizers.jsx';
import OrganizerDashboard from './components/Organizer/OrganizerDashboard.jsx';
import UserDashboard from './components/User/UserDashboard.jsx';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);
  return (
    <AuthProvider>
    <BrowserRouter>
    <div>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<Home />} />
        
        {/* Authentication Routes */}
        <Route path="/auth">
          <Route index element={<OptionLogin />} />
          <Route path="login" element={<OptionLogin />} />
          <Route path="signup" element={<OptionSignup />} />
          
          {/* User Auth */}
          <Route path="user">
            <Route path="login" element={<UserLogin />} />
            <Route path="signup" element={<UserSignup />} />
          </Route>
          
          {/* Organizer Auth */}
          <Route path="organizer">
            <Route path="login" element={<OrganizerLogin />} />
            <Route path="signup" element={<OrganizerSignup />} />
          </Route>
        </Route>

        {/* Public Content */}
        <Route path="/events" element={<Events />} />

        {/* ========== PROTECTED ROUTES ========== */}
        
        {/* User Routes */}
        <Route path="/user" element={
          <ProtectedRoute requiredUserType="user" />
        }>
          <Route index element={<UserDashboard/>} />
          <Route path="profile" element={<UserProfile />} />
          {/* Add more user routes here */}
        </Route>

        {/* Organizer Routes */}
        <Route path="/organizer" element={
          <ProtectedRoute requiredUserType="organizer" />
        }>
          <Route index element={<OrganizerDashboard />} />
          <Route path="profile" element={<OrganizerProfile />} />
          <Route path='dashborad' element={<OrganizerDashboard/>}/>
          {/* Add more organizer routes here */}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requiredUserType="admin" />
        }>
          <Route index element={<AdminDashborad />} />
          <Route path="profile" element={<div>Admin Profile</div>} />
          <Route path='dashboard' element={<AdminDashborad />} />
          <Route path='allUsers' element={<AllUsers/>}/>
          <Route path='allOrganizers' element={<AllOrganizers/>}/>
          {/* Add more admin routes here */}
        </Route>

        {/* ========== 404 NOT FOUND ========== */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />

      </Routes>
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}
export default App;