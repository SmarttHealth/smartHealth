import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash,faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getDoctors, getPatients, getPatientsInactives, getRDVsDetails, addConsultation, getRDV, deleteRDV } from '../Api';
import RendezVous from '../patient/RendezVous';

const RDVs = () => {
  const [rdvs,setRdvs]=useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [acceptedRDVs, setAcceptedRDVs] = useState([]);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to generate unique IDs like "R001," "R002," etc.
  const generateID = (index, totalRDVs) => {
    return `R${(index + 1).toString().padStart(totalRDVs.toString().length, '0')}`;
  };

  useEffect(() => {
    const fetchRdvs = async () => {
      try {
        const response = await getRDVsDetails();
    
        if (response.status === 200) {
          setRdvs(response.data);
        } else {
          console.error('Échec de la récupération des rdvs');
        }
      } catch (error) {
        console.error('Error fetching rdvs: ', error);
      }
    };
    // Effect to fetch the list of doctors from the backend
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.data); 
        console.log("liste des medecins: ",doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    const fetchPatients = async () => {
      try {
        const allPatientsResponse = await getPatients();
        const inactivePatientsResponse = await getPatientsInactives();
        
        // Get ids of inactive patients
        const inactivePatientIds = inactivePatientsResponse.data.map(inactivePatient => inactivePatient._id);

        // Filter out inactive patients
        const activePatients = allPatientsResponse.data.filter(patient => {
          return !inactivePatientIds.includes(patient._id);
        });

        setPatients(activePatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchRdvs();
    fetchPatients();
    fetchDoctors();
  }, []);
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };
  const handleNewRdv=()=>{
    navigate("/newRdv")
  }

  const handleAccept = async (rdvId) => {
    try {
      // Fetch the RDV details
      const rdvResponse = await getRDV(rdvId);
  
      if (rdvResponse.status !== 200) {
        console.error('Failed to fetch RDV details');
        return;
      }
  
      const rdvDetails = rdvResponse.data;
  
      // Check if patient and medecin properties exist in rdvDetails
      if (!rdvDetails.id_patient || !rdvDetails.id_medecin) {
        console.error('Patient or Medecin details are missing in RDV');
        return;
      }
  
      // Create a new consultation object respecting the model structure
      const newConsultation = {
        id_patient: rdvDetails.id_patient,
        id_medecin: rdvDetails.id_medecin,
        date_creation: new Date(),
        heure_creation: `${rdvDetails.Heure_debut_RDV} - ${rdvDetails.Heure_fin_RDV}`,
        etat: 'en cours',
        documents: [], // You may need to handle documents based on your logic
      };
  
      // Add the new consultation
      const addConsultationResponse = await addConsultation(newConsultation);
  
      if (addConsultationResponse.status === 201) {
        // If the consultation is added successfully, delete the RDV
        const deleteRDVResponse = await deleteRDV(rdvId);
  
        if (deleteRDVResponse.status === 200) {
          // If the RDV is deleted successfully, update the RDVs state
          const updatedRDVsResponse = await getRDVsDetails();
          
          if (updatedRDVsResponse.status === 200) {
            // Update the RDVs state
            setRdvs(updatedRDVsResponse.data);
          } else {
            console.error('Failed to fetch updated RDVs');
          }
        } else {
          console.error('Failed to delete RDV');
        }
      } else {
        console.error('Failed to add consultation');
      }
    } catch (error) {
      console.error('Error accepting RDV:', error);
    }
  };
  
  
  return (
    <div class="relative flex flex-col min-w-0 mb-4 ml-5 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-99% shadow-lg rounded mr-5 mt-14">
              <div class="rounded-t mb-0 px-0 border-0">
                <div class="flex flex-wrap items-center px-4 py-2">
              <div className="flex  justify-between py-3 px-2 bg-gray-50">
              <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">UPCOMING APPOINTMENTS</h2>
              <div className="ml-50">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                onClick={() => handleOpenModal()}>
                <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              {modalOpen && <RendezVous onClose={handleCloseModal} assistant={true}/>}
            </div>
  </div>
                <table class="w-full">
                  <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th className="px-4 py-3">ID</th>
                      <th class="px-4 py-3">Patient Name</th>
                      <th class="px-4 py-3">Doctor Name</th>
                      <th class="px-4 py-3">Type</th>
                      <th class="px-4 py-3">Date</th>
                      <th class="px-4 py-3">Time</th>
                      <th class="px-4 py-3">Contact</th>
                      <th class="px-4 py-3">Action</th>
                      <th className="px-4 py-3">Accept</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {rdvs.slice(0, 5).map((rdv,index) => (
                <tr key={rdv._id} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3 text-sm">{generateID(index, rdvs.length)}</td>
                  <td className="px-4 py-3 text-sm">{`${rdv.patient.firstName} ${rdv.patient.lastName}`}</td>
                  <td className="px-4 py-3 text-sm">{`${rdv.medecin.firstName} ${rdv.medecin.lastName}`}</td>
                  {/* <td className="px-4 py-3 text-xs">
                    <span className={`px-2 py-1 font-semibold leading-tight ${rdv.status === 'Approved' ? 'text-green-700 bg-green-100' : rdv.status === 'Pending' ? 'text-yellow-700 bg-yellow-100' : 'text-gray-700 bg-gray-100'} rounded-full dark:bg-gray-700 dark:text-gray-100`}>
                      {rdv.status}
                    </span>
                  </td> */}
                  <td className="px-4 py-3 text-sm">{rdv.type}</td>
                  <td className="px-4 py-3 text-sm">{rdv.date_RDV}</td>
                  <td className="px-4 py-3 text-sm">{rdv.Heure_debut_RDV} - {rdv.Heure_fin_RDV}</td>
                  <td className="px-4 py-3 text-sm">{rdv.patient.contact}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      // onClick={() => handleEdit(rdv._id)} // Add your edit/update logic here
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button
                      // onClick={() => handleDelete(rdv._id)} // Add your delete logic here
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleAccept(rdv._id)}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
                </table>
              </div>
            </div>
          </div>
  )
}

export default RDVs