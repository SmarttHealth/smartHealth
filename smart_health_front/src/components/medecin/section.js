import React, { useEffect, useState } from "react";
import { getPatientsWithAppointmentsTodayByStatus } from "../Api";
  
export default function Section({counter}) {
  const[TotalRDV, setTotalRDV] = useState(0);
  const[DidRDV, setDidRDV] = useState(0);
  const[RejectRDV, setRejectRDV] = useState(0);
  const[RemRDV, setRemRDV] = useState(0);
  const[listRDVs, setListRDVs] = useState(null);
  

  const user = JSON.parse(localStorage.getItem('user'));
  console.log("user : ", user._id);
  
  const fetchTotalRDV = async () => {
        try {
          const response = await getPatientsWithAppointmentsTodayByStatus(user._id,"any");
          console.log(response.data);
          setTotalRDV(response.data.numberOfPatientsToday);
          setListRDVs(response.data.patientsList); 
          //localStorage.setItem("ListPatients",JSON.stringify(listRDVs));
          //console.log("liste des medecins: ",listRDVs);
        } catch (error) {
          console.error('Error fetching RDVs:', error);
        }
      };
  
      const fetchRemRDV = async () => {
        try {
          const response = await getPatientsWithAppointmentsTodayByStatus(user._id,"créé");
          console.log(response.data);
          setRemRDV(response.data.numberOfPatientsToday); 
          //console.log("liste des medecins: ",RemRDV);
        } catch (error) {
          console.error('Error fetching RDVs:', error);
        }
      };

      const fetchDidRDV = async () => {
        try {
          const response = await getPatientsWithAppointmentsTodayByStatus(user._id,"fait");
          console.log(response.data);
          setDidRDV(response.data.numberOfPatientsToday); 
          //console.log("liste des medecins: ",DidRDV);
        } catch (error) {
          console.error('Error fetching RDVs:', error);
        }
      };

      const fetchRejectRDV = async () => {
        try {
          const response = await getPatientsWithAppointmentsTodayByStatus(user._id,"annulé");
          console.log(response.data);
          setRejectRDV(response.data.numberOfPatientsToday); 
          //console.log("liste des medecins: ",RejectRDV);
        } catch (error) {
          console.error('Error fetching RDVs:', error);
        }
      };

  useEffect(() => {
    fetchDidRDV();
    fetchRejectRDV();
    fetchRemRDV();
    fetchTotalRDV();
  }, [TotalRDV]);

  return (
      <div>
        <link
          href="https://unpkg.com/tailwindcss@2.2.4/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <div className="bg-gray-100 py-10 px-14 flex justify-center">

          {/* Third Stats Container */}
          <div className="container mx-auto pr-4">
            <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-purple-400 flex items-center justify-between">
                <p className="mr-0 font-bold text-white text-lg pl-5">Current Patient</p>
              </div>
              <p className="py-4 text-violet-800 text-3xl ml-3">{counter+1}</p>
            </div>
          </div>

          <div className="container mx-auto pr-4">
            <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-purple-400 flex items-center justify-between">
                <p className="mr-0 font-bold text-white text-lg pl-5">Total RDV</p>
              </div>
              <p className="py-4 text-violet-800 text-3xl ml-3">{TotalRDV}</p>
            </div>
          </div>

          <div className="container mx-auto pr-4">
            <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-purple-400 flex items-center justify-between">
                <p className="mr-0 font-bold text-white text-lg pl-5">RDV Faits</p>
              </div>
              <p className="py-4 text-violet-800 text-3xl ml-3">{DidRDV}</p>
            </div>
          </div>

          <div className="container mx-auto pr-4">
            <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-purple-400 flex items-center justify-between">
                <p className="mr-0 font-bold text-white text-lg pl-5">RDV Restants</p>
              </div>
              <p className="py-4 text-violet-800 text-3xl ml-3">{RemRDV}</p>
            </div>
          </div>

          <div className="container mx-auto pr-4">
            <div className="w-60 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-purple-400 flex items-center justify-between">
                <p className="mr-0 font-bold text-white text-lg pl-5">RDV Annulés</p>
              </div>
              <p className="py-4 text-violet-800 text-3xl ml-3">{RejectRDV}</p>
            </div>
          </div>
          
        </div>
      </div>
    );
}
