import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Ordonnace from '../components/medecin/ordonnance';
import Navbar from '../components/home/Navbar'
import Section from '../components/medecin/section';
import Informations from '../components/medecin/Informations';

const Medecin = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={14}>
          <Navbar/>
        </Grid>
              <Grid item >
            <div style={{ marginTop: '100px' }}>
              <Section/>
          </div>
          <div style={{ marginTop: '50px' }} >
              <Grid item sm={16} >
                  <Informations/>
              </Grid>
          </div>
          <div >
              <Grid item sm={16}>
                  <Ordonnace/>
              </Grid>
          </div>
        </Grid>
      </Grid>
    </Box> 
    </div>
  );
}

export default Medecin;