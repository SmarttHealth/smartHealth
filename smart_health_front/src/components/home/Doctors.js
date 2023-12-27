import React, { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import imgDoc2 from  "../../images/doc2.jpg"
import imgDoc3 from  "../../images/doc3.jpg"
import imgDoc4 from  "../../images/doc4.jpg"
import imgDoc5 from  "../../images/doc5.jpg"
import imgDoc6 from  "../../images/doc6.jpg"
const Doctors = () => {
  const [doctors,setDoctors]=useState([]);
  useEffect(()=>{
    const getDoctors=async ()=>{
      try{
        const listeDoctors=await axios.get("http://localhost:8082/api/users/medecin/")
        setDoctors(listeDoctors.data);
        console.log("doctors",listeDoctors.data)
      }
      catch(err){
        console.log(err)
      }
    };
    getDoctors();
  },[])

    

  const slider = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className=" min-h-screen flex flex-col  justify-center lg:px-32 px-5 pt-16" id="doctors">
      <div className=" flex flex-col items-center   mb-10 lg:mb-7 text-center">
        <div className="text-center lg:text-right" >
          <h1 className=" text-4xl font-semibold text-cyan-800  ">
            Our Doctors
          </h1>
          {/* <p className=" mt-2 text-center lg:text-start">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
            quidem.
          </p> */}
        </div>
        {/* <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div> */}
      </div>
      <div className=" mt-5">
        <Slider ref={slider} {...settings}>
          {doctors.map((e, index) => (
            <div
              className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
              key={index}
            >
              <div>
                <img
                  src={`/doctors/${e.image}.jpg`}
                  alt="img"
                  className=" h-56 rounded-t-xl w-full"
                />
              </div>

              <div className=" flex flex-col justify-center items-center">
                <h1 className=" font-semibold text-xl pt-3">{e.firstName}</h1>
                <h3 className=" ">{e.specialite}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Doctors;