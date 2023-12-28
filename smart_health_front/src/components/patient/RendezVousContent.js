import React, { useEffect, useState } from "react";
import { getRDVParPatient, getDoctor, deleteRDV } from "../Api";
import RendezVous from "./RendezVous";
const RendezVousContent = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRDVForModification, setSelectedRDVForModification] = useState(null); // Nouvel état
  const patientId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        setLoading(true);
        const response = await getRDVParPatient(patientId);
        const rendezVousData = response.data;

        const rendezVousWithMedecin = await Promise.all(rendezVousData.map(async (rdv) => {
          const medecinResponse = await getDoctor(rdv.id_medecin);
          const { firstName, lastName } = medecinResponse.data;

          return {
            ...rdv,
            medecin: { firstName, lastName },
          };
        }));

        setRendezVous(rendezVousWithMedecin);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchRendezVous();
    }
  }, [patientId]);

  const handleModifier = (rdv) => {
    setSelectedRDVForModification(rdv);
    // Logique pour gérer la modification
    console.log("Modifier rendez-vous avec l'ID ");
  };

  const handleAnnuler = async (rdvId) => {
    try {
      await deleteRDV(rdvId);
      // Mettre à jour l'état local après la suppression
      setRendezVous(prevRendezVous => prevRendezVous.filter(rdv => rdv._id !== rdvId));
      console.log(`Annuler rendez-vous avec l'ID : ${rdvId}`);
    } catch (error) {
      console.error('Erreur lors de l\'annulation du rendez-vous:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Mes rendez-vous</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                Date RDV
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                Heure de début RDV
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                Heure de fin RDV
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                État
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                Médecin
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rendezVous.map((rdv) => (
              <tr key={rdv._id}>
                <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  {rdv.type}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {rdv.date_RDV}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {rdv.Heure_debut_RDV}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {rdv.Heure_fin_RDV}
                </td>
                <td className="px-4 py-2 text-sm font-medium whitespace-nowrap">
                  {rdv.etat}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {rdv.medecin && (
                    <span>{rdv.medecin.firstName} {rdv.medecin.lastName}</span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  <button
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleModifier(rdv)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleAnnuler(rdv._id)}
                  >
                    Annuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedRDVForModification && (
        <RendezVous
          onClose={() => setSelectedRDVForModification(null)}
          doctorId={selectedRDVForModification.id_medecin}
          appointmentToEdit={selectedRDVForModification}  // Passez le rendez-vous sélectionné pour modification
        />
      )}
    </div>
  );
}

export default RendezVousContent;
