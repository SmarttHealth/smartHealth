import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { setGenerateScanner } from '../Api';
import { usePatients } from './patientsProvider';
import { Toaster, toast } from 'react-hot-toast';

export default function Scanner() {
  const [scannerValue, setScannerValue] = React.useState('');
  const [indicateursValue, setIndicateursValue] = React.useState('');
  const listRDVs = usePatients();
  const patient = listRDVs[0];
  const medecin = JSON.parse(localStorage.getItem('user'));
  const handleScannerChange = (event) => {
    setScannerValue(event.target.value);
  };

  const handleIndicateursChange = (event) => {
    setIndicateursValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    try{
      event.preventDefault();
      console.log('med ::: ',scannerValue);
      console.log('med ::: ',indicateursValue);
      console.log('medecin ::: ',medecin );
      console.log('patient ::: ',patient.patient);
      const res = await setGenerateScanner(patient.patient, medecin, scannerValue, indicateursValue)
      console.log(res.data);
      toast.success(res.data.message);
      } catch (error) {
        console.error('Error fetching RDVs:', error);
      }
  };

  return (
    <Box sx={{ p: 2 }} justifyContent={'center'}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
        Scanner
      </Typography>
      <form onSubmit={handleSubmit}>

        <Grid container spacing={2} style={{ marginTop: '20px'}}>
          <Grid item xs={12} >
            <TextField
              required
              fullWidth
              id="scanner"
              name="scanner"
              label="Type De Scanner"
              value={scannerValue}
              onChange={handleScannerChange}            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              required
              fullWidth
              id="indicateurs"
              name="indicateurs"
              label="Indicateurs"
              value={indicateursValue}
              onChange={handleIndicateursChange}            />
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button type="submit" variant="contained">
            Ajouter Un Med
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Valider
          </Button>
        </Box>
      </form>
    </Box>
  );
}
