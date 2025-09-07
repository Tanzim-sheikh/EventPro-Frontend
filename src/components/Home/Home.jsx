import React from 'react'
import Header from './Header'
import Events from './Events'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

function Home() {

  return (
    <>
        <Header/>
        <Events/>
          <About/>
          <Contact/>
          <Footer/>
    </>
  )
}

export default Home;