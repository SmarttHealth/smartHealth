import React, { useState } from 'react';
import imgDoc6 from  "../images/doc6.jpg";
import DashboardContent from "../components/patient/DashboardContent";
import ConsultationsContent from "../components/patient/ConsultationsContent";
import HistoriqueContent from "../components/patient/HistoriqueContent";
import RendezVousContent from "../components/patient/RendezVousContent";
import ServiceSuiviContent from "../components/patient/ServiceSuiviContent";
import ProfileContent from '../components/patient/ProfileContent';
const Patient = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="font-bold grid grid-cols-5 max-auto mx-auto border-x-2 border-gray-100">
      <div className="col-span-1 h-screen px-7 py-8 bg-blue-600 border-r border-r-gray-100">
        <div className="rounded-full overflow-hidden mb-6">
          <img
            src={imgDoc6}
            alt="Patient Image"
            className="w-25 h-25 object-cover rounded-full mx-auto"
          />
        </div>
        <div className="font-bold text-lg text-center">
          <span>kaoutar</span>
        </div>

        <div className="mt-12">
          <ul className="flex flex-col space-y-3 text-gray-500 text-sm sidebar-menu">
            <li className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${activeSection === 'dashboard' ? 'bg-gray-200' : ''}`} onClick={() => setActiveSection('dashboard')}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </span>
              <span>Dashboard</span>
            </li>
            <li className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${activeSection === 'rendezvous' ? 'bg-gray-200' : ''}`} onClick={() => setActiveSection('rendezvous')}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span>Rendez Vous</span>
            </li>
            <li className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${activeSection === 'profile' ? 'bg-gray-200' : ''}`} onClick={() => setActiveSection('profile')}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </span>
              <span>Profile</span>
            </li>
            <li className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${activeSection === 'serviceSuivi' ? 'bg-gray-200' : ''}`} onClick={() => setActiveSection('serviceSuivi')}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </span>
              <span>Service Suivi</span>
            </li>
            <li className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${activeSection === 'historique' ? 'bg-gray-200' : ''}`} onClick={() => setActiveSection('historique')}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </span>
              <span>Historique</span>
            </li>
            <li className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${activeSection === 'consultations' ? 'bg-gray-200' : ''}`} onClick={() => setActiveSection('consultations')}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 7H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-3m-1-5v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h1" />
                </svg>
              </span>
              <span>Consultations</span>
            </li>
            {/* ... (les autres éléments du menu) */}
          </ul>
        </div>
      </div>

      <div className="col-span-4 p-8">
        {/* Contenu dynamique basé sur la section active */}
        {activeSection === 'dashboard' && <DashboardContent />}
        {activeSection === 'rendezvous' && <RendezVousContent />}
        {activeSection === 'profile' && <ProfileContent />}
        {activeSection === 'serviceSuivi' && <ServiceSuiviContent />}
        {activeSection === 'historique' && <HistoriqueContent />}
        {activeSection === 'consultations' && <ConsultationsContent />}
        {/* ... (ajoutez d'autres sections ici) */}
      </div>
    </div>
  );
}


export default Patient;
