import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash,faCheckCircle, faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getDoctors, getPatients, getPatientsInactives, getRDVsDetails, addConsultation, getRDV, deleteRDV, editRDV } from '../Api';
import RendezVous from '../patient/RendezVous';
import { CustomAlert } from './CustomAlert';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rdvid, setRdvid] = useState(false);
  const [editRDV, setEditRDV] = useState(null);
  const [showModal, setShowModal] = useState(false);



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
        // Update the RDV state to 'en cours'
      const updateRDVResponse = await editRDV(rdvId, { etat: 'en cours' });

  
        if (updateRDVResponse.status === 200) {
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
  const handleAnnuler = async (rdvId) => {
    try {
      setRdvid(rdvId)
      // Set the modal to open
      setIsModalOpen(true);

    } catch (error) {
      console.error('Error handling RDV cancellation:', error);
    }
  };
  
  const handleModalConfirm = async() => {
    try {
              // Update the RDV state to 'cancel'
              const response = await editRDV(rdvid, { etat: 'cancel' });
      
              if (response.status === 200) {
                  // Refresh the RDVs list after canceling the RDV
                  const updatedRDVsResponse = await getRDVsDetails();
      
                  if (updatedRDVsResponse.status === 200) {
                      setRdvs(updatedRDVsResponse.data);
                  } else {
                      console.error('Failed to fetch updated RDVs');
                  }
              } else {
                  console.error('Failed to cancel RDV');
              }
          } catch (error) {
              console.error('Error canceling RDV:', error);
          }
    setIsModalOpen(false);
    // Add your logic here...
  };
  
  const handleModalCancel = () => {
    // If the user clicks "No" on the confirmation modal
    setIsModalOpen(false);
  };
  const handleEditRDV = (rdv) => {
    setEditRDV(rdv);
    setShowModal(true);
  };
  const handleCloseModale = () => {
    setEditRDV(null);
    setShowModal(false);
  };
  
  
  return (
    <div class="relative flex flex-col min-w-0 mb-4 ml-5 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-99% shadow-lg rounded mr-5 mt-14">
              <div class="rounded-t mb-0 px-0 border-0">
                <div class="flex flex-wrap items-center px-4 py-2">
              <div className="flex  justify-between py-3 px-2 bg-gray-50">
              <div className="flex items-center justify-between">
  <div>
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">UPCOMING APPOINTMENTS</h2>
  </div>
  <div className="flex items-center">
    <div className="ml-auto">
      <button className="bg-blue-500 text-white px-1 py-1/2 ml-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
              onClick={() => handleOpenModal()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </div>
</div>

{modalOpen && <RendezVous onClose={handleCloseModal} assistant={true} />}

  </div>
                <table class="w-full">
                  <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th className="px-4 py-3">ID</th>
                      <th class="px-4 py-3">Patient Name</th>
                      <th class="px-4 py-3">Doctor Name</th>
                      <th class="px-4 py-3">Type</th>
                      <th class="px-4 py-3">Status</th>
                      <th class="px-4 py-3">Date</th>
                      <th class="px-4 py-3">Time</th>
                      <th class="px-4 py-3">Contact</th>
                      <th class="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {rdvs.slice(0, 5).map((rdv,index) => (
                <tr key={rdv._id} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3 text-xs">{generateID(index, rdvs.length)}</td>
                  <td className="px-4 py-3 text-xs">{`${rdv.patient.firstName} ${rdv.patient.lastName}`}</td>
                  <td className="px-4 py-3 text-xs">{`${rdv.medecin.firstName} ${rdv.medecin.lastName}`}</td>
                  <td className="px-4 py-3 text-xs">{rdv.type}</td>
                  <td className="px-4 py-3 text-xs">{rdv.etat}</td>
                  <td className="px-4 py-3 text-xs">{rdv.date_RDV ? rdv.date_RDV.slice(0, 10) : ''}</td>
                  <td className="px-4 py-3 text-xs">{rdv.Heure_debut_RDV} - {rdv.Heure_fin_RDV}</td>
                  <td className="px-4 py-3 text-xs">{rdv.patient.contact}</td>
                  <td className="px-4 py-3 text-xs">
                  <div className="flex space-x-2">
                    <button
                       onClick={() => handleEditRDV(rdv)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button
                      onClick={() => handleAnnuler(rdv._id)} 
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleAccept(rdv._id)}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
                </table>
                {isModalOpen && (
      <CustomAlert
        message="Are you sure you want to cancel this RDV?"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    )}
    {showModal && (
        <RendezVous
          onClose={handleCloseModale}
          appointmentToEdit={editRDV}
        />
      )}
              </div>
            </div>
          </div>
  )
};

export default RDVs