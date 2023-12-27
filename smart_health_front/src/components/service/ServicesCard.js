import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { RiMicroscopeLine } from "react-icons/ri";

import { MdLocalHospital } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
const ServicesCard = ({ _id, nameService  , image, descService, doctors }) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="group flex flex-col items-center text-left gap-2 w-full lg:w-1/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out hover:bg-blue-600">
      <div className=" rounded-full transition-colors duration-300 ease-in-out group-hover:bg-[#ade9dc] flex flex-row">
      {nameService==="Cardiology" ?<FaHeartbeat size={40}/> :nameService==="Endocrinology" ?<RiMicroscopeLine size={40}/> :nameService==="Rheumatology"?<MdLocalHospital size={40}/>:null }
        <h1 className="font-semibold text-lg">{nameService}</h1>
      </div>

      <img src={`/services/${image}`} alt={nameService} className="mt-2 max-h-40 object-cover font-medium" />
      <p>{descService}</p>

      {/* Utilisez Link pour créer un lien vers la page de détails */}
      <Link to={{
          pathname: `/services/${_id}`,
          
        }}>
        <button
          className="flex-row items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          En savoir plus
        </button>
      </Link>

     
    </div>
  );
};

  
export default ServicesCard;
