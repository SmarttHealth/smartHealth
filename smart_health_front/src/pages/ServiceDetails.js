import React from 'react';
import heartHealthImage from '../images/cardiologieService.jpeg';
import Navbar from '../components/home/Navbar';
import { useParams } from "react-router-dom";
import { useEffect,useState
 } from 'react';

 import axios from 'axios';
import RendezVous from '../components/patient/RendezVous';
const ServiceDetails = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const params = useParams();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDoctorId(null);
    setModalOpen(false);
  };

  useEffect(() => {
    console.log("idddddddd",params.id)
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/service/${params.id}`);

        console.log("idddddddd",params.id)
        setService(response.data);
        console.log(response.data);
        setLoading(false);
        // Fetch details for each doctor
       // Appel à la nouvelle méthode pour récupérer les médecins associés au service
       const doctorsResponse = await axios.get(`http://localhost:8082/api/service/${params.id}/doctors`);
       setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error("Error fetching service:", error);
        setLoading(false);
      }
    };

    fetchService();
  },[params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8 w-full bg-gray-100 h-screen">
        {/* Image */}
        <img src={heartHealthImage} alt="Image Principale" className="w-full h-auto rounded-lg" />
        <h1 className="text-3xl text-blue-600 font-bold mb-4 mt-2 pt-3">{service.nameService}</h1>
        {/* Description de service */}
        <div className="flex items-center mb-6 pb-10 pt-10">
          <hr className="border-t-5 border-4 border-solid border-primary text-blue-600 flex-grow mr-4" />
          <h1 className="text-5xl font-bold text-blue-600">Description</h1>
          <hr className="border-t-5 border-4 border-solid border-primary text-blue-600 flex-grow mr-4" />
        </div>
        <p className="mt-4 text-xl text-left text-gray-700">{service.descService}</p>
        <div className="flex items-center mb-6 pb-10 pt-10">
          <hr className="border-t-5 border-4 border-solid border-primary text-blue-600 flex-grow mr-4" />
          <h1 className="text-5xl font-bold text-blue-600">Doctors</h1>
          <hr className="border-t-5 border-4 border-solid border-primary text-blue-600 flex-grow mr-4" />
        </div>

        {/* Liste de docteurs sous forme de témoignages */}
        <div className="mt-4 grid h-[1200px] w-[1200px] text-center md:grid-cols-3 lg:gap-12 ">
         {doctors.map((doctor, index) => (
            <div key={index} className="mb-12 md:mb-0 ">
              <div className="mb-6 flex items-center justify-center">
                <img
                  src={`/doctors/${doctor.image}.jpg`}
                  alt={`Dr. ${doctor.firstName}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-lg dark:shadow-black/30"
                />
              </div>
              <h5 className="mb-4 text-xl font-semibold">{doctor.firstName}</h5>
              <h6 className="mb-4 font-semibold text-primary dark:text-primary-500">{doctor.specialite}</h6>
              <p className="mb-4">{doctor.testimonial}</p>
              <ul className="mb-0 flex items-center justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <li key={star}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
              {/* Boutons Profile et Appointment */}
      <div className="flex flex-row  justify-center  mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md" 
        >
          Profile
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md"  onClick={() => handleOpenModal(doctor._id)} >
          Appointment
        </button>
      </div>
    
            </div>
          ))} 
          
           {modalOpen && <RendezVous onClose={handleCloseModal}  doctorId={selectedDoctorId}/>}
        </div>
      </div>
     
    </div>
  );
};

export default ServiceDetails;
