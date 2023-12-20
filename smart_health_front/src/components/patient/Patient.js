import React from 'react'
import Card from '../Assistant/Card'
import Header from '../Assistant/Header'
import StatisticsCard from '../Assistant/StatisticsCard'
import Comptes from '../Assistant/Comptes'
import Consultations from '../Assistant/Consultations'
import RDVs from '../Assistant/RDVs'
import Navbar from '../Navbar'

const Patient = () => {
  return (
    <div x-data="setup()" className="{ 'dark': isDark }">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
  
      <Navbar/>
      <div class="h-full ml-14 mt-20 mb-10 md:ml-64">
        <StatisticsCard/>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
          <Comptes/>
          <Consultations/>
        </div>
        <RDVs/>
      {/* <Card/> */}
    </div>
    </div>
  )
}

export default Patient
