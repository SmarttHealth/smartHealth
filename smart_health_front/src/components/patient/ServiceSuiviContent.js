import React from "react";
import heartHealthImage from "../../images/cardiologieService.jpeg";
import ServicesCard from "../service/ServicesCard";
import { FaHeartbeat } from "react-icons/fa";
const ServiceSuiviContent = () => {
    const serviceProps = {
        icon: <FaHeartbeat size={35} className="text-backgroundColor "/>,
        title: "Cardiologie",
        image: heartHealthImage,
        description: "Cardiology is a specialized branch of medicine dedicated to the study, diagnosis, and treatment of diseases and conditions related to the cardiovascular system.",
        doctors: ["Doctor 1", "Doctor 2"],
      };
  return (
    <div className="flex justify-center">
      <h1 className=""> Service suivi</h1>
        <ServicesCard {...serviceProps} />
    </div>
  );
};

export default ServiceSuiviContent;
