import React from 'react'
import Sidebar from './Sidebar'
import Card from './Card'
import Header from './Header'
import StatisticsCard from './StatisticsCard'
import Comptes from './Comptes'
import Consultations from './Consultations'
import RDVs from './RDVs'
import ListeDoctors from './ListeDoctors'
import PatientsList from './PatientsList'
import Navbar from '../Navbar'

const Assistant = () => {
  return (
    <div x-data="setup()" className="{ 'dark': isDark }">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">


      <Navbar/>
      <Sidebar/>
      <div class="h-full ml-20 mt-20 mb-10 md:ml-64">
        <StatisticsCard/>
        </div>
        <div class=" flex  ml-20 ">
          <Comptes/>
          <PatientsList/>
          {/* <Consultations/> */}
        </div>
        <div className='  ml-20 mt-5'>
        <Consultations/>
        </div>
        <div className="flex justify-end ml-20 mb-2">
          <RDVs />
          <ListeDoctors />
        </div>
        
      {/* <Card/> */}
    </div>
    </div>
  )
}

export default Assistant
