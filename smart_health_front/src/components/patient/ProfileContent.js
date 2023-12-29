import React, { useState, useEffect } from 'react';
import photoPersonne from '../../images/photoPersonne.jpg';
import { editPatient, getPatient } from '../Api';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editableFields, setEditableFields] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    birthday: "",
    // Ajoutez d'autres champs si nécessaire
  });

  const handleFieldChange = (field, value) => {
    if (field === "birthday") {
      // Formatage de la date
      const dateObject = new Date(value);
      const formattedDate = dateObject.toISOString().split('T')[0];
  
      setEditableFields({
        ...editableFields,
        [field]: formattedDate,
      });
    } else {
      setEditableFields({
        ...editableFields,
        [field]: value,
      });
    }
  };
  
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await getPatient(userId);
        setUserData(response.data);
        setEditableFields({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          birthday: response.data.birthday || "",
          // Ajoutez d'autres champs si nécessaire
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des informations du patient depuis l\'API:', error);
      }
    };

    fetchPatientInfo();
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      const response = await editPatient(userId, editableFields);
      setUserData(response.data);
      console.log("Profil mis à jour avec succès !", response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
        <div className="p-4 md:p-12 text-center lg:text-left">
          <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
         
          </div>
          <div className=" rounded-full w-full ">
        <img src={photoPersonne} alt="personne" className="w-full object-cover rounded-lg mx-auto "  />
      </div>
          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userData.firstName}</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

          <div className="pb-6">
            <label htmlFor="firstName" className="font-semibold text-gray-700 block pb-1">First Name</label>
            <input
              id="firstName"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={editableFields.firstName}
              onChange={(e) => handleFieldChange("firstName", e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="lastName" className="font-semibold text-gray-700 block pb-1">Last Name</label>
            <input
              id="lastName"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={editableFields.lastName}
              onChange={(e) => handleFieldChange("lastName", e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="phone" className="font-semibold text-gray-700 block pb-1">Phone</label>
            <input
              id="phone"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={editableFields.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="address" className="font-semibold text-gray-700 block pb-1">Address</label>
            <input
              id="address"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={editableFields.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="birthday" className="font-semibold text-gray-700 block pb-1">Birthday</label>
            <input
              id="birthday"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="date"
              value={editableFields.birthday}
              onChange={(e) => handleFieldChange("birthday", e.target.value)}
            />
          </div>

          <div className="pt-12 pb-8">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full" onClick={handleUpdateProfile}>
              Update Profile
            </button>
          </div>
          
        </div>
        
      </div>

     
      
    </div>
  );
};

export default Profile;
