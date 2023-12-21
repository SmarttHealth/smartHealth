import React from "react";



import Doctors from "../components/home/Doctors";
import Footer from "../components/home/Footer";
import Services from "../components/service/Services";
import Navbar from "../components/home/Navbar";
import About from "../components/home/About";
import Header from "../components/home/Header";

import Contact from "../components/home/Contact";
const Home = () => {
  return (
    <div id="home">
      <Navbar/>
      <Header/>
      <About/>
        {/* <Stats/>
         */}
        <Services id="services"/>
         
        <Doctors/>
        <Contact/>
        <Footer/>
      
     
  
    </div>
  );
};

export default Home;
