import React, { useState,useEffect } from 'react';
import "../../styles/rendervous.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editRDV } from '../Api';
import { addRDV } from '../Api';
import { getPatients, getDoctors } from '../Api';
import moment from 'moment';
import 'moment/locale/fr';

const RendezVous = ({ onClose, doctorId,appointmentToEdit, assistant }) => {
  console.log("rdvvvvvvvvvvvvv: ",appointmentToEdit)
  const patientId=localStorage.getItem("userId");
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(""); 
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [edit, setEdit] = useState(false);
  const [patientid, setPatientid]=useState('');
  const [doctorid, setDoctorid] = useState('');


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);
  
  useEffect(() => {
    // Si appointmentToEdit existe, cela signifie que l'utilisateur veut modifier un rendez-vous
    if (appointmentToEdit) {
      setEdit(true);
      setSelectedAppointmentType(appointmentToEdit.type);
      setSelectedDate(moment(appointmentToEdit.date_RDV).format('YYYY-MM-DD'));
      setSelectedStartTime(appointmentToEdit.Heure_debut_RDV);
      setSelectedEndTime(appointmentToEdit.Heure_fin_RDV);
    }
  }, [appointmentToEdit]);

  useEffect(() => {
    // Si appointmentToEdit existe, cela signifie que l'utilisateur veut modifier un rendez-vous
    if (appointmentToEdit) {
      setEdit(true);
      setSelectedAppointmentType(appointmentToEdit.type);
      setSelectedDate(moment(appointmentToEdit.date_RDV).format('YYYY-MM-DD'));
      setSelectedStartTime(appointmentToEdit.Heure_debut_RDV);
      setSelectedEndTime(appointmentToEdit.Heure_fin_RDV);
      setSelectedDoctor(`${appointmentToEdit.medecin.lastName} ${appointmentToEdit.medecin.firstName}`);
      setSelectedPatient(`${appointmentToEdit.patient.lastName} ${appointmentToEdit.patient.firstName}`);
    }
  }, [appointmentToEdit]);


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);
  const timeOptions = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00',
  ];

  const handleAppointmentTypeChange = (type) => {
    setSelectedAppointmentType(type);

  };

  const handleDoctorChange = (doctor) => {
    setSelectedDoctor(doctor);
    if (assistant) {
      // If assistant is true, set the doctorId directly
      setDoctorid(doctor._id);
    }
  };

  const handlePatientChange = (patient) => {
    setSelectedPatient(patient);
    if (assistant) {
      // If assistant is true, set the patientId directly
      setPatientid(patient._id);
    }
  };

  const handleBookNow = async () => {
    const rendezVousData = {
      type: selectedAppointmentType,
      date_RDV: selectedDate,
      Heure_debut_RDV: selectedStartTime,
      Heure_fin_RDV: selectedEndTime,
      id_patient: assistant? patientid: patientId,
      id_medecin: assistant? doctorid: doctorId,
    };

    try {
      if (appointmentToEdit) {
        // Si appointmentToEdit existe, cela signifie que l'utilisateur modifie un rendez-vous
        await editRDV(appointmentToEdit._id, rendezVousData);
        toast.info('Rendez-vous mis à jour avec succès');
      } else {
        // Sinon, l'utilisateur crée un nouveau rendez-vous
        const response = await addRDV(rendezVousData);
        toast.info(response.data.message || 'Rendez-vous ajouté avec succès');
      }

      onClose();
    } catch (error) {
      console.error('Erreur lors de la gestion du rendez-vous:', error);
      toast.info('Erreur lors de la gestion du rendez-vous');
    }
  };

  return (
    <div className="modal-overlay  pt-0 mt-20">
      <div className="modal z-30">
        <button onClick={onClose} className="close-button">
          &#10006;
        </button>
        <div className="relative mx-auto mb-1 mt-0 max-w-screen-lg overflow-hidden rounded-t-xl bg-blue-400/60 py-32 text-center shadow-xl shadow-gray-300">
          <h1 className="mt-2 px-8 text-sm font-bold text-white md:text-5xl">Book an appointment</h1>
          <p className="mt-6 text-sm text-white">Get an appointment with our experienced accountants</p>
          <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover" src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
        </div>
        <div className="mx-auto grid max-w-screen-lg px-6 pb-20 relative z-20">
        <div className="mt-4 font-serif text-sm font-bold text-blue-900">Select appointment type</div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <label className="flex items-center text-black">
            <input
              type="radio"
              value="en ligne"
              checked={selectedAppointmentType === 'en ligne'}
              onChange={() => handleAppointmentTypeChange('en ligne')}
              className="mr-2 form-radio text-blue-500"
            />
            en ligne
          </label>
          <label className="flex items-center text-black">
            <input
              type="radio"
              value="en présentiel"
              checked={selectedAppointmentType === 'en présentiel'}
              onChange={() => handleAppointmentTypeChange('en présentiel')}
              className="mr-2 form-radio text-blue-500"
            />
            en présentiel
          </label>
          </div>

          {(assistant || edit) && (
          <div className="grid grid-cols-2 gap-4">
            {/* Select a doctor */}
            <div>
              <select
                className="mt-2 px-2 py-1 border rounded-lg w-full text-xs"
                value={selectedDoctor}
                onChange={(e) => handleDoctorChange(e.target.value)}
              >
                <option value="">Select doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.lastName} {doctor.firstName}
                  </option>
                ))}
              </select>
            </div>


          {/* Select a patient */}
          <div>
              <select
                className="mt-2 px-2 py-1 border rounded-lg w-full text-xs"
                value={selectedPatient}
                onChange={(e) => handlePatientChange(e.target.value)}
              >
                <option value="">Select patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.lastName} {patient.firstName}
                  </option>
                ))}
              </select>
            </div>
            </div>
          )}

          {/* Date selection section */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="mt-4 font-serif text-sm font-bold text-blue-900">Select a date</p>
              <input
                type="date"
                className="datepicker-input mt-2 px-2 py-1 border rounded-lg w-full text-xs"
                placeholder="Select date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Time selection section */}
          
            <div>
              <p className="mt-4 font-serif text-sm font-bold text-blue-900">Select a time</p>
              <div className="mt-2 grid grid-cols-4 gap-2 lg:max-w-xl">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    className={`rounded-lg ${selectedStartTime === time ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-900'} px-2 py-1 text-xs font-medium active:scale-95`}
                    onClick={() => setSelectedStartTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            
          </div>

          {/* ... (existing code for end time selection and Book Now button remains unchanged) */}
          
            <div>
              <p className="mt-4 font-serif text-sm font-bold text-blue-900">Select end time</p>
              <div className="mt-2 grid grid-cols-4 gap-2 lg:max-w-xl">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    className={`rounded-lg ${selectedEndTime === time ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-900'} px-2 py-1 text-xs font-medium active:scale-95`}
                    onClick={() => setSelectedEndTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button
                className="mt-4 w-28 rounded-full border-4 border-blue-500 bg-blue-600 px-4 py-1 text-sm font-bold text-white transition hover:translate-y-1"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
       
      </div>
    
  );
};


export default RendezVous;
