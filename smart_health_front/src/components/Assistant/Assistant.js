import React from 'react'
import Sidebar from './Sidebar'
import Card from './Card'
import Header from './Header'
import StatisticsCard from './StatisticsCard'
import Comptes from './Comptes'
import Consultations from './Consultations'
import RDVs from './RDVs'

const Assistant = () => {
  return (
    <div x-data="setup()" className="{ 'dark': isDark }">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
  
{/*       
      <Sidebar/> */}
      <div class="h-full ml-14 mt-20 mb-10 md:ml-64">
        <StatisticsCard/>
        </div>
        <div class="mr-10 ml-60">
          <Comptes/>
          {/* <Consultations/> */}
        </div>
        <Consultations/>
        <RDVs/>
      {/* <Card/> */}
    </div>
    </div>
  )
}

export default Assistant
