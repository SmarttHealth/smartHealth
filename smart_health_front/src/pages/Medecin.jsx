import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Ordonnace from '../components/medecin/ordonnance';
import Navbar from '../components/Navbar'
import Section from '../components/medecin/section';
import Informations from '../components/medecin/Informations';
import { Button } from '@mui/material';
import { PatientsProvider } from '../components/medecin/patientsProvider';
import Diagnostique from '../components/medecin/diagnostic';
import Analyse from '../components/medecin/analyse';
import Scanner from '../components/medecin/scanner';

const Medecin = () => {
  const counter = 0;
  return (
    <PatientsProvider>
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={14}>
          <Navbar/>
        </Grid>
              <Grid item >
            <div style={{ marginTop: '100px' }}>
              <Section counter={counter}/>
          </div>
          <div style={{ marginTop: '50px' }} >
              <Grid item sm={16} >
                  <Informations counter={counter}/>
              </Grid>
          </div>
          <div >
              <Grid item sm={16}>
                  <Diagnostique/>
              </Grid>
          </div>
          <div >
              <Grid item sm={16}>
                  <Ordonnace />
              </Grid>
          </div>
          <div >
              <Grid item sm={16}>
                  <Analyse/>
              </Grid>
          </div>
          <div >
              <Grid item sm={16}>
                  <Scanner/>
              </Grid>
          </div>
        </Grid>
      </Grid>
      <Button>Fermer la consultation</Button>
    </Box> 
    </div>
    </PatientsProvider>
  );
}

export default Medecin;