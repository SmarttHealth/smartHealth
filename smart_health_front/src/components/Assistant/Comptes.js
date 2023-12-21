import React, { useEffect, useState } from 'react'

const Comptes = () => {
  const [patients, setPatients]=useState([]);
 
  useEffect(() => {
    const fetchPatients = async () => {
        try {console.log("1")
            const response = await fetch('http://localhost:8082/api/users/patient/inactiveAccounts');
            console.log("2")
            if (response.ok) {
                const data = await response.json();
                setPatients(data);
            } else {
                console.error('Échec de la récupération des patients');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des patients:', error);
        }
    };

    fetchPatients();
}, []);
const updateState = async (accountId, index) => {
  try {
    const response = await fetch('http://localhost:8082/api/users/activate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountId }),
    });

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

  return (
    <div class="relative flex flex-col min-w-0 mb-4 ml-5 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
              <div class="rounded-t mb-0 px-0 border-0">
                <div class="flex flex-wrap items-center px-4 py-2">
                  <div class="relative w-full max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">Comptes</h3>
                  </div>
                  <div class="relative w-full max-w-full flex-grow flex-1 text-right">
                    <button class="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                  </div>
                </div>
                <div class="block w-full overflow-x-auto">
                  <table class="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">first Name</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Last Name</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">phone</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">address</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">birthday</th>
                        <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                    patients.map((patient, index) => (
              <tr key={patient._id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.phone}</td>
                <td>{patient.address}</td>
                <td>{patient.birthday}</td>
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
