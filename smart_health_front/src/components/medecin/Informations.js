import React, { useEffect, useState, createContext, useContext } from 'react';
import Info from './info';
import InfoConsultation from './infoConsultation';
import BasicDateCalendar from './calender';
import { usePatients } from './patientsProvider';

export default function Informations({counter}){
      // Création d'un contexte
    const MyContext = createContext();
    const [sortedPatients, setSortedPatients] = useState([]);
    const [triggerEffect, setTriggerEffect] = useState(false);
   // const listRDVs = usePatients();
/*
    const fetchData = () =>{
        setListPatients(JSON.parse(localStorage.getItem('ListPatients')));
    }
*/
/*
   const fetchListPat = () =>{
    
    // Trier la liste des patients par heure de début de RDV
    if (listRDVs && listRDVs.length > 0) {
        const sortedList = listPatients.sort((a, b) => {
          // Convertir les heures de type string en objet Date pour la comparaison
          const timeA = a.heure_debut_RDV.replace(':', ''); // Convertir en format numérique sans les deux-points
          const timeB = b.heure_debut_RDV.replace(':', '');
          return timeA - timeB; // Tri croissant par heure de début de RDV
        });
  
        setSortedPatients(sortedList);
   }
   }
   /*
   useEffect(() => {
    fetchData();
    const timeout = setTimeout(() => {
        setTriggerEffect(true);
      }, 3000);
  },[]);
*/
/*
   useEffect(() => {
    fetchListPat();
    if (triggerEffect) {
        setTriggerEffect(false);
      }
  }, [listPatients,triggerEffect]);
 */
    return (
        <div className="flex flex-row">
            
        <div className="w-1/3 ml-4">
            <BasicDateCalendar/>
        </div>
        <div className="w-1/3 mr-4">
            <Info counter={counter}/>
        </div>
        <div className="w-1/3 ml-4">
            <InfoConsultation counter={counter}/>
        </div>
          
    </div>
    )
}