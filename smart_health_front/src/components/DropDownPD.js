import React from 'react'

const DropDownPD = () => {
  return (
    <div className="flex items-center justify-between mb-4">
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
  )
}

export default DropDownPD
