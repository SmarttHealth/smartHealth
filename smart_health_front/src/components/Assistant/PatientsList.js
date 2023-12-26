import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPatients } from '../Api';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div class="relative flex flex-col min-w-0 mb-4 ml-5 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-99% shadow-lg rounded mr-5">
              <div class="rounded-t mb-0 px-0 border-0">
                <div class="flex flex-wrap items-center px-4 py-2">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300 text-left">News Patients</h2>
          </div>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {patients.slice(0, 5).map((patient) => (
                <tr key={patient._id} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3 text-sm">{`${patient.firstName} ${patient.lastName}`}</td>
                  <td className="px-4 py-3 text-sm">{patient.phone}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;
