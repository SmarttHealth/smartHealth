import React, { useState } from 'react';
import "../../styles/rendervous.css";
import axios from 'axios';
const RendezVous = ({ onClose,doctorId }) => {
  //const patientId = localStorage.getItem('patientId');
  const patientId="65802783e1d52bff4ff93568";
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(""); // Utilisez une chaîne au lieu d'un tableau
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const timeOptions = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00',
  ];

  const handleAppointmentTypeChange = (type) => {
    setSelectedAppointmentType(type); // Utilisez une chaîne pour stocker le type sélectionné
  };

  const handleBookNow = async () => {
    const rendezVousData = {
      type: selectedAppointmentType,
      date_RDV: selectedDate,
      Heure_debut_RDV: selectedStartTime,
      Heure_fin_RDV: selectedEndTime,
      id_patient: patientId,
      id_medecin: doctorId,

      // Ajoutez d'autres champs nécessaires
    };
  
    try {
      const response = await axios.post('http://localhost:8082/api/RDV/', rendezVousData);
      console.log('Rendez-vous ajouté avec succès:', response.data);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du rendez-vous:', error);
    }
  };
  return (
    <div className="modal-overlay  pt-0">
      <div className="modal z-30">
        <button onClick={onClose} className="close-button">
          &#10006;
        </button>
        <div className="relative mx-auto  mb-1 mt-0 max-w-screen-lg overflow-hidden rounded-t-xl bg-blue-400/60 py-32 text-center shadow-xl shadow-gray-300">
          <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">Book an appointment</h1>
          <p className="mt-6 text-lg text-white">Get an appointment with our experienced accountants</p>
          <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover" src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
        </div>

        <div className="mx-auto grid max-w-screen-lg px-6 pb-20 relative z-20">
        <div className="mt-8 font-serif text-xl font-bold text-blue-900">Select appointment type</div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <label className="flex items-center text-black">
            <input
              type="radio"
              value="controle"
              checked={selectedAppointmentType === 'controle'}
              onChange={() => handleAppointmentTypeChange('controle')}
              className="mr-2 form-radio text-blue-500"
            />
            Controle
          </label>
          <label className="flex items-center text-black">
            <input
              type="radio"
              value="consultation"
              checked={selectedAppointmentType === 'consultation'}
              onChange={() => handleAppointmentTypeChange('consultation')}
              className="mr-2 form-radio text-blue-500"
            />
            Consultation
          </label>
        </div>
          <div className="">
            <p className="mt-8 font-serif text-xl font-bold text-blue-900">Select a date</p>
            <input
              type="text"
              className="datepicker-input mt-2 px-4 py-2 border rounded-lg w-full"
              placeholder="Select date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="mt-8 font-serif text-xl font-bold text-blue-900">Select a time</div>
          <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
            {timeOptions.map((time) => (
              <button
                key={time}
                className={`rounded-lg ${selectedStartTime === time ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-900'} px-4 py-2 font-medium active:scale-95`}
                onClick={() => setSelectedStartTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <div className="mt-8 font-serif text-xl font-bold text-blue-900">Select end time</div>
          <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
            {timeOptions.map((time) => (
              <button
                key={time}
                className={`rounded-lg ${selectedEndTime === time ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-900'} px-4 py-2 font-medium active:scale-95`}
                onClick={() => setSelectedEndTime(time)}
              >
                {time}
              </button>
            ))}
          </div>

          <button
            className="mt-8 w-56 rounded-full border-8 border-blue-500 bg-blue-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1"
            onClick={handleBookNow}
          >
            Apointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RendezVous;
