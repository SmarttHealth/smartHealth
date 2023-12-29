import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Paper, Typography, Divider } from '@mui/material';
import { getConsultationByPatAndMed } from '../Api';
import { usePatients } from './patientsProvider';


const ConAnciennes = ({counter}) => {
  const listRDVs = usePatients();
  //console.log("liste des RDVs :::: ",listRDVs);
  //console.log('count ',counter);
  const[consultations, setConsultations]= useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const fetchConsultations = async () =>{
    try{
      const patient = listRDVs[counter].patient;
      const medecin = JSON.parse(localStorage.getItem('user'));

      const res = await getConsultationByPatAndMed(patient._id, medecin._id);
      const sortedConsultations = res.data.sort((a, b) => {
        const dateA = new Date(a.date_creation);
        const dateB = new Date(b.date_creation);
        return dateB - dateA; // Tri décroissant (plus récent d'abord)
      });
      //console.log("sorted cons :: ", sortedConsultations);
      setConsultations(sortedConsultations);
      //console.log('consultationss :',consultations);
    } catch (error) {
      console.error('Error consultations list:', error);
    }
    
  }

  useEffect(() => {
    fetchConsultations();
  });

   // Gérer le clic sur une consultation
   const handleConsultationClick = (documents) => {
    setSelectedDocuments(documents); // Mettre à jour les documents sélectionnés
  };

  return (
   
    <Paper elevation={3} style={{ marginBottom: '20px' }}>
 {/* Liste des documents */}
      <Typography variant="h5" gutterBottom>
        Documents :
      </Typography>
      <List sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 135,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}>
        <ListItem >
            <ListItemText primary="diagnostique :" />
          </ListItem>
        {selectedDocuments.map((document, index) => (
          <ListItem key={index}>
            <ListItemText primary={document} />
          </ListItem>
        ))}
        
      </List>
      
     <Divider style={{ margin: '15px 0' }} />

      <Typography variant="h5" gutterBottom>
        Consultations Anciennes :
      </Typography>

       
      {/* Liste des anciennes consultations */}
      <List sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 135,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}>
        {consultations.map((consultation, index) => (
          <ListItem
            key={index}
            button // Rendre l'élément de la liste cliquable
            onClick={() => handleConsultationClick(consultation.documents)}
          >
            <ListItemText primary={`Consultation ${consultations.length - index}`} />
          </ListItem>
        ))}
      </List>
</Paper>
  )
};

export default ConAnciennes;
