import React, { useState, useEffect } from 'react';
import { getCountConsultationParPatient, getRdvCountByPatientId } from '../Api';

const StatsPatient = () => {
  const [consultationCount, setConsultationCount] = useState('');
  const [rdvCount, setRdvCount] = useState('');
  const patientId = localStorage.getItem('userId');

  const fetchConsultationCount = async (patientId) => {
    try {
      const response = await getCountConsultationParPatient(patientId);
      setConsultationCount(response.data.count);
      console.log('Nombre de consultations pour le patient :', consultationCount);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de consultations :', error);
    }
  };

  const fetchRdvCountByPatientId = async (patientId) => {
    try {
      const response = await getRdvCountByPatientId(patientId);
      setRdvCount(response.data.rdvCount);
      console.log('Nombre de rendez-vous pour le patient :', rdvCount);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de rendez-vous :', error);
    }
  };

  useEffect(() => {
    fetchConsultationCount(patientId);
    fetchRdvCountByPatientId(patientId);
  }, [patientId]);
  return (
    <div>
      <div className="m-6">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
              <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 7H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-3m-1-5v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h1" />
                </svg>
              </span>
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">{consultationCount}</h4>
                <div className="text-gray-500">Consultations</div>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
              <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">{rdvCount}</h4>
                <div className="text-gray-500">Rendez-vous</div>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
              <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </span>
              </div>

              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">1</h4>
                <div className="text-gray-500">Services suivis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPatient;
