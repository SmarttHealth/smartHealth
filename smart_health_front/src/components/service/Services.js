import React, { useState } from "react";
import ServicesCard from "./ServicesCard";
import { RiMicroscopeLine } from "react-icons/ri";
import { MdLocalHospital } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import EndocrinologieI from "../../images/servcie2Endocrinologie.jpg";
import RhumotologueServiceI from "../../images/RhumotologueService.jpg";
import heartHealthImage from "../../images/cardiologieService.jpeg";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const servicesData = [
    {
      icon: <MdLocalHospital size={35} className="text-backgroundColor" />,
      title: "Endocrinology",
      image: EndocrinologieI,
      description: "Endocrinology is a specialized branch of medicine that focuses on the study and management of the endocrine system, which plays a crucial role in regulating various bodily functions.",
    },
    {
      icon: <RiMicroscopeLine size={35} className="text-backgroundColor" />,
      title: "Rheumatology",
      image: RhumotologueServiceI,
      description: "Rheumatology is a specialized field within medicine that concentrates on the diagnosis and treatment of disorders affecting the musculoskeletal system, particularly the joints, bones, muscles, and connective tissues.",
    },
    {
      icon: <FaHeartbeat size={35} className="text-backgroundColor" />,
      title: "Cardiology ",
      image: heartHealthImage,
      description: "Cardiology is a specialized branch of medicine dedicated to the study, diagnosis, and treatment of diseases and conditions related to the cardiovascular system.",
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 pt-24 lg:pt-16" id="services">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-semibold text-cyan-800">Our Services</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 pt-14 ">
        {servicesData.map((service, index) => (
          <ServicesCard
            key={index}
            icon={service.icon}
            title={service.title}
            image={service.image}
            description={service.description}
            openModal={() => openModal(service)}
          />
        ))}
      </div>

      
    </div>
  );
};

export default Services;
