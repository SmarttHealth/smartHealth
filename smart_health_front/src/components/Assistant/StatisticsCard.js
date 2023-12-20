import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faUserInjured, faCalendarCheck   } from '@fortawesome/free-solid-svg-icons';
const StatisticsCard = () => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
      <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
         <FontAwesomeIcon icon={faUserMd} className="text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out" />
  </div>
        <div class="text-right">
          <p class="text-2xl">36</p>
          <p>Doctors</p>
        </div>
      </div>
      <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
         <FontAwesomeIcon icon={faUserInjured} className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out" />
        </div>
        <div class="text-right">
          <p class="text-2xl">557</p>
          <p>PATIENTS</p>
        </div>
      </div>
      <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
         <FontAwesomeIcon icon={faCalendarCheck} className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out" />
        </div>
        <div class="text-right">
          <p class="text-2xl">1569</p>
          <p>APPOINTMENTS</p>
        </div>
      </div>
    </div>
  )
}

export default StatisticsCard
