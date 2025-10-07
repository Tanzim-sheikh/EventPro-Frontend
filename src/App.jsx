import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

//Public Routes
import Home from './components/Home/Home';
import EventDashboard from './components/Home/EventDashboard.jsx';
import OptionSignup from './components/Home/OptionSignup';
import OptionLogin from './components/Home/OptionLogin';
import AuthContext, { AuthProvider } from "./context/AuthContext.jsx";

//User Routes
import UserSignup from './components/User/UserSignup';
import UserLogin from './components/User/UserLogin';
import UserProfile from './components/User/UserProfile';
import UserEmailVerify from './components/User/UserEmailVerify.jsx';
import UserForgotPaasword from "./components/User/UserForgotPassword.jsx"
import UserDashboard from './components/User/UserDashboard.jsx';
import BookingDashboard from './components/User/BookingDashboard.jsx';
import UserBookings from './components/User/UserBookings.jsx';
import UserEvents from './components/User/UserEvents.jsx';

//Organizer Routes
import OrganizerSignup from './components/Organizer/OrganizerSignup';
import OrganizerLogin from './components/Organizer/OrganizerLogin';
import OrganizerProfile from './components/Organizer/OrganizerProfile';
import OrganizerEmailVerify from './components/Organizer/OrganizerEmailVerify.jsx';
import OrganizerForgotPassword from "./components/Organizer/OrganizerForgotPassword.jsx"
import OrganizerDashboard from './components/Organizer/OrganizerDashboard.jsx';
import OrganizerCreateEvent from "./components/Organizer/OrganizerCreateEvent.jsx"
import OrganizerEvents from "./components/Organizer/OrganizerEvents.jsx"
import OrganizerBookedEvents from "./components/Organizer/OrganizerBookedEvents.jsx"
import OrganizerPastEvents from "./components/Organizer/OrganizerPastEvents.jsx"

//Admin Routes
import ProtectedRoute from "./context/protectedRoute.jsx";
import AdminDashborad from './components/Admin/AdminDahsboard.jsx';
import AllUsers from './components/Admin/AllUsers.jsx';
import AllOrganizers from './components/Admin/AllOrganizers.jsx';
import NotVerifiedOrganizers from './components/Admin/NotVerifiedOrganizers.jsx';
import AllEvents from './components/Admin/AllEvents.jsx';
import AllBookings from './components/Admin/AllBookings.jsx';

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
    <ScrollToTop />
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
            <Route path="verify-email" element={<UserEmailVerify />} />
            <Route path="forgot-password" element={<UserForgotPaasword />} />
          </Route>
          
          {/* Organizer Auth */}
          <Route path="organizer">
            <Route path="login" element={<OrganizerLogin />} />
            <Route path="signup" element={<OrganizerSignup />} />
            <Route path="verify-email" element={<OrganizerEmailVerify />} />
            <Route path="forgot-password" element={<OrganizerForgotPassword />} />
          </Route>
        </Route>

        {/* Public Content */}
        <Route path="/events" element={<EventDashboard />} />

        {/* ========== PROTECTED ROUTES ========== */}
        
        {/* User Routes */}
        <Route path="/user" element={
          <ProtectedRoute requiredUserType="user" />
        }>
          <Route index element={<UserDashboard/>} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="booking/:eventId" element={<BookingDashboard />} />
          {/* Add more user routes here */}
        </Route>

        {/* Organizer Routes */}
        <Route path="/organizer" element={
          <ProtectedRoute requiredUserType="organizer" />
        }>
          <Route index element={<OrganizerDashboard />} />
          <Route path="profile" element={<OrganizerProfile />} />
          <Route path='dashborad' element={<OrganizerDashboard/>}/>
          <Route path='create-event' element={<OrganizerCreateEvent/>}/>
          <Route path='Organizerevents' element={<OrganizerEvents/>}/>
          <Route path='OrganizerBookedEvents' element={<OrganizerBookedEvents/>}/>
          <Route path='OrganizerPastEvents' element={<OrganizerPastEvents/>}/>
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
          <Route path='allEvents' element={<AllEvents/>}/>
          <Route path='not-verified-organizers' element={<NotVerifiedOrganizers/>}/>
          <Route path='allBookings' element={<AllBookings/>}/>
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

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default App;