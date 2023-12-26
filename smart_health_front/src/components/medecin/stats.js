import React from 'react';
import TableStat from './tableSta';
import InfoPatient from './infoPatient';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ConAnciennes from './consAnciennes';


export default function Stats() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}justifyContent={'center'}>
          <Grid item xs={10}>
            <TableStat />
          </Grid>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={2} style={{ marginTop: '20px', height: '200px' }}>
            <Grid item xs={1}>
              <InfoPatient />
            </Grid>
            <Grid item xs={1} style={{ height: '300px' }}>
              <ConAnciennes />
            </Grid>
           
          </Grid>
        </Grid>
      </Box>

      
    </div>
  );
}
