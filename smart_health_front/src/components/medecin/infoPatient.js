import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import HomeIcon from '@mui/icons-material/Home';
import { usePatients } from './patientsProvider';



const InfoPatient = ({counter}) => {

  const [currentPatient, setCurrentPatient]=useState();
  const [show, setShow]=useState(false);
  const listRDVs = usePatients();

  useEffect(() => {
    //console.log('la liste des RDVs dans infoPatient ',listRDVs);
      setCurrentPatient(listRDVs[counter]);
      if (currentPatient !== undefined){
        setShow(true);
      }
    
  });
  

  return (
    show ? (
    <Paper elevation={3} >
      <Typography variant="h5" gutterBottom>
        Données Personnelles
      </Typography>
      <List  sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 350,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}>
        
        <ListItem>
          <PersonOutlineIcon/>
          <ListItemText primary="firstName" secondary={currentPatient.patient.firstName}/>
        </ListItem>
        <ListItem>
          <PersonOutlineIcon/>
          <ListItemText primary="lastName" secondary={currentPatient.patient.lastName} />
        </ListItem>
        <ListItem>
          <PhoneIcon/>
          <ListItemText primary="Phone" secondary={currentPatient.patient.phone} />
        </ListItem>
        <ListItem>
          <HomeIcon/>
          <ListItemText primary="address" secondary={currentPatient.patient.address} />
        </ListItem>
        <ListItem>
          <CakeIcon/>
          <ListItemText primary="birthday" secondary={currentPatient.patient.birthday} />
        </ListItem>
        {/* Add more ListItem components for additional client information */}
      </List>
    </Paper>
    ) : (
      <div></div> // Rendu d'un composant div vide si currentPatient est null ou undefined
    )
  );
};

export default InfoPatient;
