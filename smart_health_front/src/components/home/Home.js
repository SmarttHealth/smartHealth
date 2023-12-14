import React from "react";
import Button from "../layout/Button";
import homeimage from "../../images/home.png";

import Doctors from "./Doctors";
import Footer from "./Footer";
import Services from "./Services";
import Navbar from "./Navbar";
import About from "./About";
import Header from "./Header";
import Stats from "./Stats";
import Contact from "./Contact";
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
