import React, { useState,useEffect } from "react";
import ServicesCard from "./ServicesCard";
import { RiMicroscopeLine } from "react-icons/ri";

import axios from "axios";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
   
  const [services,setservices]=useState([]);
  useEffect(()=>{
    const getDoctors=async ()=>{
      try{
        const listeServices=await axios.get("http://localhost:8082/api/service/")
        setservices(listeServices.data);
        console.log("services",listeServices.data)
      }
      catch(err){
        console.log(err)
      }
    };
    getDoctors();
  },[]);

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
        {services.map((service, index) => (
          <ServicesCard
            key={index}
            _id={service._id}
            nameService={service.nameService}
            image={service.image}
            descService={service.descService}
            openModal={() => openModal(service)}
          />
        ))}
      </div>

      
    </div>
  );
};

export default Services;
