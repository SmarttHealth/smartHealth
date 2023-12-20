import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import service1 from '../images/serviceCardiologie.jpg';


import '../styles/css/tailwindcss.css';

const Services = () => {
  const services = [
    {
      image: service1,
      title: 'Service 1',
      description: 'Description du service 1.',
    },
    {
      image: service1,
      title: 'Service 2',
      description: 'Description du service 2.',
    },
    {
      image: service1,
      title: 'Service 3',
      description: 'Description du service 3.',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div id="services" className="services_area bg-gray pt-120 pb-120">
      <div className="container">
        <div className="row justify-center">
          <div className="w-full lg:w-1/2">
            <div className="section_title text-center pb-6">
              <h5 className="sub_title">Nos Services</h5>
              <h4 className="main_title">Services Médicaux</h4>
            </div>
          </div>
        </div>
        <div className="services-wrapper relative">
          <Slider {...settings}>
            {services.map((service, index) => (
              <div key={index} className="w-full lg:w-4/12">
                <div className="single_service_item mx-auto">
                  <div className="single_service mx-3">
                    <div className="service_image relative">
                      <img src={service.image} alt={`Service ${index + 1}`} className="max-w-full max-h-full" />
                    </div>
                    <div className="service_content py-5 px-8 relative">
                      <h4 className="service_title text-xl md:text-2xl">{service.title}</h4>
                      <p className="mt-2">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Services;