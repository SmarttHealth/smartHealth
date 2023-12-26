import React, { useEffect, useState } from 'react'
import { activeAccount, getPatientsInactives } from '../Api';
const Comptes = () => {
  const [patients, setPatients]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchPatients = async () => {
        try {console.log("1")
            const response = await getPatientsInactives();
            console.log("2")
            setPatients(response.data);
            /*
            if (response.ok) {
                const data = await response.json();
                
            } else {
                console.error('Échec de la récupération des patients');
            }
            */
        } catch (error) {
            console.error('Erreur lors de la récupération des patients:', error);
        }
    };

    fetchPatients();
}, []);
const updateState = async (accountId, index) => {
  try {
    const response = await activeAccount(accountId);

    if (response.ok) {
      // Supprimez immédiatement la ligne de la table après activation
      setPatients((prevPatients) =>
        prevPatients.filter((_, i) => i !== index)
      );
    } else {
      console.error('Échec de l\'activation du compte');
    }
  } catch (error) {
    console.error('Erreur lors de l\'activation du compte:', error);
  }
};

const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <div class="relative flex flex-col min-w-0 mb-4 ml-5 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
              <div class="rounded-t mb-0 px-0 border-0">
                <div class="flex flex-wrap items-center px-4 py-2">
                  <div class="relative w-full max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50 text-left">Comptes</h3>
                  </div>
                  <div class="relative w-full max-w-full flex-grow flex-1 text-right">
                  <div className="flex justify-end">
              <button
                onClick={handlePrevPage}
                className=" bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                &lt;
              </button>
              <button
                onClick={handleNextPage}
                className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                &gt;
              </button>
            </div>                  
            </div>
                </div>
                <div class="block w-full overflow-x-auto">
                  <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="  bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold px-4 ">first Name</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Last Name</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">phone</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">address</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">birthday</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                    patients.slice(startIndex, endIndex).map((patient, index) => (
              <tr key={patient._id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.phone}</td>
                <td>{patient.address}</td>
                <td>{patient.birthday.slice(0, 10)}</td>
                <td><button className='bg-green-500 p-2 rounded mt-2' onClick={() => updateState(patient.id_compte, index)}>Activate</button></td>

                </tr>
                    ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  )
}

export default Comptes
