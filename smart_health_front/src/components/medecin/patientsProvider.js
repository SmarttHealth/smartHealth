import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPatientsWithAppointmentsTodayByStatus } from '../Api';

const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [listRDVs, setListRDVs] = useState([]);
    const[sortList, setSortList] = useState([])

  const fetchListRDVs = async (userId) => {
    try {
      const response = await getPatientsWithAppointmentsTodayByStatus(userId, 'en_cours');
      setSortList(response.data.patientsList || []);
      if (sortList && sortList.length > 0) {
        const sortedList = sortList.sort((a, b) => {
          const timeA = a.heure_debut_RDV.replace(':', ''); 
          const timeB = b.heure_debut_RDV.replace(':', '');
          return timeA - timeB; 
        });
        setListRDVs(sortedList);
        //console.log('provider ::: ', listRDVs);
   }
    } catch (error) {
      console.error('Error fetching patient list:', error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      fetchListRDVs(user._id);
    }
  });

  return (
    <PatientsContext.Provider value={listRDVs}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => useContext(PatientsContext);
