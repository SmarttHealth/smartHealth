import React, { useEffect, useState } from "react";
import heartHealthImage from "../../images/cardiologieService.jpeg";
import ServicesCard from "../service/ServicesCard";
import { FaHeartbeat } from "react-icons/fa";
import { getRDVParPatient, getServiceForDoctor } from "../Api";

const ServiceSuiviContent = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [services, setServices] = useState([]);
  const patientId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRDVParPatient(patientId);
        const rendezVousData = response.data;

        if (rendezVousData.length > 0) {
          const doctorId = rendezVousData[0].id_medecin;
          setSelectedDoctorId(doctorId);
            console.log("id medecin,,,,,,,,,",doctorId);
          // Appeler la méthode pour récupérer les services associés au médecin
          const servicesResponse = await getServiceForDoctor(doctorId);
          setServices(servicesResponse.data);
        }

        setRendezVous(rendezVousData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    if (patientId) {
      fetchData();
    }
  }, [patientId]);

  return (
    <div className="flex justify-center">
      <h1 className=""> Service suivi</h1>
      {services.map((service) => (
        <ServicesCard
          key={service._id}
          icon={<FaHeartbeat size={35} className="text-backgroundColor " />}
          title={service.title}
          image={service.image}
          description={service.description}
          doctors={service.doctors}
        />
      ))}
    </div>
  );
};

export default ServiceSuiviContent;
