  import React, { useState, useEffect, useRef } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  import { getConsultationsDetails, getDoctors, getPatients, getPatientsInactives,
     addDocumentsToConsultation, readFileContent, editConsultation } from '../Api';
  import ModalDoc from './ModalDoc';
  import DocumentViewer from './DocumentViewer';
  import { CustomAlert } from './CustomAlert';

  const Consultations = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [consultations, setConsultations] = useState(null);
    const [filteredConsultations, setFilteredConsultations] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConsultationDocuments, setSelectedConsultationDocuments] = useState([]);


    const [patients, setPatients] = useState([]);
    const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);
    const [selectedDocumentContent, setSelectedDocumentContent] = useState(null);
    const [cancelConfirmation, setCancelConfirmation] = useState({ isOpen: false, consultationId: null });


  const handleCancelConsultation = async (consultationId) => {
    // Open the confirmation modal
    setCancelConfirmation({ isOpen: true, consultationId });
  };

  const handleConfirmCancel = async () => {
    try {
      // Close the confirmation modal
      setCancelConfirmation({ isOpen: false, consultationId: null });

      // Update the consultation to mark it as canceled
      await editConsultation(cancelConfirmation.consultationId, { etat: 'Canceled' });

      // Update the state to reflect the change
      setFilteredConsultations((prevConsultations) =>
        prevConsultations.map((consultation) =>
          consultation._id === cancelConfirmation.consultationId
            ? { ...consultation, etat: 'Canceled' }
            : consultation
        )
      );
    } catch (error) {
      console.error('Error canceling consultation:', error);
    }
  };

  const handleCancelCancel = () => {
    // Close the confirmation modal without canceling the consultation
    setCancelConfirmation({ isOpen: false, consultationId: null });
  };

    const handleDocumentClick = async (consultationId,document) => {
      try {
        const fileContent = await readFileContent(consultationId,document);
        console.log("contenu ***********************: ",fileContent)
        setSelectedDocumentContent(fileContent);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error reading document content:', error);
      }
    };
    const fileInputRef = useRef(null);
    
    const handleSeeAllClick = (documents) => {
      setSelectedConsultationDocuments(documents);
      setIsModalOpen(true);
    };
    // Function to generate unique IDs like "R001," "R002," etc.
  const generateID = (index, totalCslts) => {
    return `C${(index + 1).toString().padStart(totalCslts.toString().length, '0')}`;
  };


    useEffect(() => {
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
      const fetchConsultations = async () => {
        try {
          const response = await getConsultationsDetails();
      
          if (response.status === 200) {
            setConsultations(response.data);
            setFilteredConsultations(response.data);
            console.log("consultation 👩 ", consultations);
          } else {
            console.error('Échec de la récupération des consultations');
          }
        } catch (error) {
          console.error('Error fetching consultations: ', error);
        }
      };
      
      fetchPatients();
      fetchDoctors();
      fetchConsultations();
    }, []);
    useEffect(() => {
      const filterConsultations = () => {
        let filtered = consultations;

        if (selectedPatient) {
          filtered = filtered.filter(consultation => consultation.patient && consultation.patient.id === selectedPatient._id);
        }
    
        if (selectedDoctor) {
          filtered = filtered.filter(consultation => consultation.medecin && consultation.medecin.id === selectedDoctor._id);
        }

        setFilteredConsultations(filtered);
      };

      filterConsultations();
    }, [selectedPatient, selectedDoctor, consultations]);

    const handlePatientSelect = (patient) => {
      setSelectedPatient(patient);
      setIsPatientDropdownOpen(false);
    };
    const handleDoctorSelect = (doctor) => {
      setSelectedDoctor(doctor);
      setIsPatientDropdownOpen(false);
    };
    const handleFileSelect = (consultation, file) => {
      if (file) {
        console.log("ccccccccccc: ",consultation.patient)
          addDocumentsToConsultation(consultation._id, file)
              .then((response) => {
                  console.log('File uploaded successfully:', response.data);
                  // Effectuez d'autres opérations si nécessaire
              })
              .catch((error) => {
                  console.error('Error uploading file:', error);
              });
      }
  };

    return (
      <div class="mt-4 mx-4">
              <div class=" ml-60 overflow-hidden rounded-lg shadow-xs shadow-lg">
                <div class="w-full overflow-x-auto">
                <div className="flex items-center justify-between py-3 px-2 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Consultations</h2>
              <div className="flex space-x-2">
                    
              <div className="relative">
              <select
            onChange={(e) => handlePatientSelect(e.target.value === "all" ? null : patients.find(p => p._id === e.target.value))}
            value={selectedPatient ? selectedPatient._id : ""}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          >
                    <option value="all">All</option>
                    {patients.map((patient) => (
                      <option key={patient?._id} value={patient?._id} className='bg-white text-black'>
                        {`${patient.lastName} ${patient.firstName}`}
                      </option>
                    ))}
                  </select>
                </div>
              <div className="relative">
              <select
                    onChange={(e) => handleDoctorSelect(e.target.value === "all" ? null : doctors.find(d => d._id === e.target.value))}
                    value={selectedDoctor ? selectedDoctor._id : ""}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                  >
                    <option value="all">All</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {`${doctor.firstName} ${doctor.lastName}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              </div>
                  <table class="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead>
                      <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">id_consultation</th>
                        <th class="px-4 py-3">date de creation</th>
                        <th class="px-4 py-3">Patient</th>
                        <th class="px-4 py-3">Etat</th>
                        <th class="px-4 py-3">Documents</th>
                        <th class="px-4 py-3">Actions</th>

                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {filteredConsultations !== null && filteredConsultations.length > 0 ? (
                      filteredConsultations.map((consultation, index) => (
                        <tr key={consultation._id} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3 text-sm">{generateID(index, filteredConsultations.length)}</td>
                          <td>{consultation.date_creation.slice(0, 10)} at {consultation.heure_creation}</td>
                          <td>{consultation.patient.lastName} {consultation.patient.firstName}</td>
                          <td>
                            {consultation.etat === 'En cours' ? (
                              <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                                {consultation.etat}
                              </span>
                            ) : consultation.etat === 'Ferme' ? (
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                {consultation.etat}
                              </span>
                            ) : (
                              <span>{consultation.etat}</span>
                            )}
                          </td>
                          <td>
              {consultation.documents.length > 0 && (
                <>
                  <button
                    key={0}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleDocumentClick(consultation._id, consultation.documents[0])}
                  >
                    {consultation.documents[0].substring(14)}
                  </button>
                  {consultation.documents.length > 1 && (
                    <>
                      <button
                        className="text-blue-500 hover:underline focus:outline-none mr-2"
                        onClick={() => handleSeeAllClick(consultation.documents)}
                      >
                        See All
                      </button>
                    </>
                  )}
                </>
              )}
              <button
              className="bg-green-500 text-white rounded p-2"
              onClick={() => {
                fileInputRef.current.click();
              }}
              >
                +
              </button>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileSelect(consultation, e.target.files[0])}
                style={{ display: 'none' }}
                ref={fileInputRef}
                />
              </td>
                          <td>
                          <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleCancelConsultation(consultation._id)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                          </td>
                        </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-3 text-center">
                            {selectedPatient && selectedDoctor
                              ? "Aucune consultation trouvée"
                              : selectedPatient
                              ? "Aucune consultation pour ce patient"
                              : selectedDoctor
                              ? "Aucune consultation pour ce médecin"
                              : "Sélectionnez un patient et/ou un médecin"}
                          </td>
                        </tr>
                      )}
                      </tbody>

                      </table>
                      {/* {isModalOpen && (
        <ModalDoc
          documents={selectedConsultationDocuments}
          onClose={() => setIsModalOpen(false)}
        />
      )} */}
      {isModalOpen && (
        <DocumentViewer
          content={selectedDocumentContent}
          onClose={() => {
            setSelectedDocumentContent(null);
            setIsModalOpen(false);
          }}
        />
      )}
      {cancelConfirmation.isOpen && (
          <CustomAlert
            message="Are you sure you want to cancel this consultation?"
            onConfirm={handleConfirmCancel}
            onCancel={handleCancelCancel}
          />
        )}
      </div>
      </div>
    </div>
    )
  }

  export default Consultations