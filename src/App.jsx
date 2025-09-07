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
import OrganizerSignup from './components/Organizer/OrganizerSignup';
import OrganizerLogin from './components/Organizer/OrganizerLogin';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/OptionLogin" element={<OptionLogin />} />
        <Route path="/OptionSignup" element={<OptionSignup />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/organizerSignup" element={<OrganizerSignup />} />
        <Route path="/organizerLogin" element={<OrganizerLogin />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;