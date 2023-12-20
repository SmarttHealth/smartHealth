import React from "react";
import image1 from "../images/shape/shape-1.svg"
import image2 from "../images/shape/shape-2.svg"
import image3 from "../images/shape/shape-3.svg"
import image4 from "../images/shape/shape-4.svg"
import image5 from "../images/header-image.svg"
import imageHeader from "../images/imageMedical.png";
import "../styles/css/animate.css"
import "../styles/css/LineIcons.css"
import '../styles/css/tailwindcss.css';
import "../styles/css/tiny-slider.css"
const Header = () => {
  return (
    <div>
      <div id="home" className="header_hero bg-gray relative z-10 overflow-hidden lg:flex items-center">
        <div className="hero_shape shape_1">
          <img src={image1} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_2">
          <img src={image2} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_3">
          <img src={image3} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_4">
          <img src={image4} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_6">
          <img src={image1} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_7">
          <img src={image4} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_8">
          <img src={image3} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_9">
          <img src={image2} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_10">
          <img src={image4} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_11">
          <img src={image1} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="hero_shape shape_12">
          <img src={image2} alt="shape" />
        </div>
        {/* hero shape */}
        <div className="container">
  <div className="row">
    <div className="w-full lg:w-1/2">
      <div className="header_hero_content pt-150 lg:pt-0">
        <h2 className="hero_title text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold text-blue-500">
          Smart Health: Your Trusted Medical Solution
        </h2>
        <p className="mt-8 lg:mr-8">
          Connect with our dedicated team of healthcare professionals. Your well-being is our top priority. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.
        </p>
        <div className="hero_btn mt-10">
          <a className="main-btn bg-blue-500 hover:bg-blue-700" href="#0">
            Start Your Health Journey
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* container */}
        <div className="header_shape hidden lg:block"></div>
        <div className="header_image flex items-center">
          <div className="image 2xl:pl-25">
          <img
      src={imageHeader}
      alt="Header Image"
      style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
    />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;