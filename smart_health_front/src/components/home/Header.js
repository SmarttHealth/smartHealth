import React, { useEffect, useState } from 'react';
import {  BsArrowLeftCircle,  BsArrowRightCircle } from 'react-icons/bs';
import headerBackground from '../../images/home.png';
import headerBackground1 from '../../images/carousel-2.jpg';
import headerBackground2 from "../../images/blog5.jpg"
const Header = () => {
  const [currentImg, setCurrentImage] = useState(0);
  const images = [
    {
      title: 'SmartHealth',
      subtitle: 'Empowering Health Choices for a Vibrant Life ',
      img: headerBackground,
    },
    {
      title: 'SmartHealth',
      subtitle: "Medical Care, Anywhere You Are: Online Consultations Made Simple",
      img: headerBackground1,
    },
    {
      title: 'SmartHealth',
      subtitle: 'Your Health Journey Starts Here: Virtual Consultations at Your Fingertips',
      img:headerBackground2 ,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImage((prevImg) => (prevImg + 1) % images.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentImg]);

  return (
    <div className="min-h-screen flex items-center justify-center h-[900px] ">
      <div className="relative overflow-hidden h-full w-full">
        <div
          style={{ backgroundImage: `url(${images[currentImg].img})` }}
          className="relative inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-all ease-in-out duration-1000 rounded-md"
        >
          {/* bg-gradient */}
          <div className="w-full h-full absolute top-0 left-0  text-center"></div>

          {/* title-subtitle */}
          <div className="text-black font-bold  flex flex-col items-center justify-center gap-6 mb-25  absolute   bottom-25 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-bold text-8xl">{images[currentImg].title}</span>
            <span className="font-bold text-4xl">{images[currentImg].subtitle}</span>
          </div>

          {/* circles */}
          <div className="flex absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full bg-white transition-all ease-in-out duration-1000 mr-3 cursor-pointer ${
                  currentImg === index ? 'opacity-100' : 'opacity-40'
                }`}
              ></div>
            ))}
          </div>

          {/* button-group */}
          <button
            onClick={() =>
              setCurrentImage((prevImg) => (prevImg - 1 + images.length) % images.length)
            }
            className="absolute text-black font-bold left-7 top-1/2"
          >
            <BsArrowLeftCircle className="w-15 h-15  hover:opacity-100 transition-all ease-in-out duration-300" />
          </button>

          <button
            onClick={() =>
              setCurrentImage((prevImg) => (prevImg + 1) % images.length)
            }
            className="absolute text-black font-bold right-7  top-1/2"
          >
            <BsArrowRightCircle className="w-15 h-15 hover:opacity-100 transition-all ease-in-out duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
