import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ConsultationsContent = () => {
  const [consultations, setConsultations] = useState([]);
  const [medecins, setMedecins] = useState({});

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/consultation/');
        console.log("consultations", response.data);
        setConsultations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des consultations:', error);
      }
    };

    fetchConsultations();
  }, []);

  useEffect(() => {
    const fetchMedecin = async (idMedecin) => {
      try {
        const response = await axios.get(`http://localhost:8082/api/users/medecin/${idMedecin}`);
        console.log("medecin", response.data);
        setMedecins((prevMedecins) => ({ ...prevMedecins, [idMedecin]: response.data }));
      } catch (error) {
        console.error('Erreur lors de la récupération du médecin:', error);
      }
    };

    // Récupérer les détails du médecin pour chaque consultation
    consultations.forEach((consultation) => {
      fetchMedecin(consultation.id_medecin);
    });
  }, [consultations]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Mes consultations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-x-3">
                  <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <button className="flex items-center gap-x-2">
                    <span>ID Médecin</span>
                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                      <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                      <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                    </svg>
                  </button>
                </div>
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Date de Création
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                État
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Heure de Création
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Documents
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation) => (
              <tr key={consultation._id}>
                <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                    {medecins[consultation.id_medecin] && (
                      <>
                        {/* <img
                          
                          src= {`/doctors/${medecins[consultation.id_medecin].image}.jpg`}
                          alt={`${medecins[consultation.id_medecin].nom} ${medecins[consultation.id_medecin].prenom}`}
                          className="w-8 h-8 rounded-full"
                        /> */}
                        <span>{medecins[consultation.id_medecin].firstName} {medecins[consultation.id_medecin].lastName}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{consultation.date_creation}</td>
                <td className="px-4 py-2 text-sm font-medium whitespace-nowrap">
                  {consultation.etat==="En cours" ? <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2 className="text-sm font-normal">{consultation.etat}</h2>
                  </div>:<div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-400 bg-emerald-100/60 dark:bg-gray-800">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     < path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2 className="text-sm font-normal">{consultation.etat}</h2>
                  </div>}
                  
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {consultation.heure_creation}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {consultation.documents}
                </td>
                <td className="px-4 py-2 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                      Archive
                    </button>
                    <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultationsContent;
