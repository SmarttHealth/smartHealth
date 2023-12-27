import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getDoctors } from '../Api';

const ListeDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div class="relative flex flex-col min-w-0 mb-4 ml-5 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-60% mt-14 mr-5 shadow-lg rounded">
              <div class="rounded-t mb-0 px-0 border-0">
                <div class="flex flex-wrap items-center px-4 py-2">
              <div class="relative w-full max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">List of Doctors</h3>
              </div>          
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>

                </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {doctors.slice(0, 5).map((doctor) => (
                    <tr key={doctor._id} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3 text-sm">{`${doctor.firstName} ${doctor.lastName}`}</td>
                    <td className="px-4 py-3 text-sm">{doctor.phone}</td>

                    </tr>
                ))}
                </tbody>
              </table>
        </div>
      </div>
    </div>
  );
};

export default ListeDoctors;
