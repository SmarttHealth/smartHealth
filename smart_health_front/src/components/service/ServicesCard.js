import React, { useState } from "react";
import { Link } from 'react-router-dom';
import ServiceDetails from "../../pages/ServiceDetails";
const ServicesCard = ({ icon, title, image, description, doctors }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="group flex flex-col items-center text-left gap-2 w-full lg:w-1/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out hover:bg-blue-600">
      <div className="p-6 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-[#ade9dc] flex flex-row">
        {icon}
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>

      <img src={image} alt={title} className="mt-2 max-h-40 object-cover font-medium" />
      <p>{description}</p>

      {/* Utilisez Link pour créer un lien vers la page de détails */}
      <Link to={`/services/${title}`}>
        <button
          className="flex-row items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          En savoir plus
        </button>
      </Link>

      {modalOpen && (
        <ServiceDetails
          title={title}
          image={image}
          description={description}
          
        />
      )}
    </div>
  );
};

  
export default ServicesCard;
