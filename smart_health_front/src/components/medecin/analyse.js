import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePatients } from './patientsProvider';
import { Toaster, toast } from 'react-hot-toast';
import { setGenerateAnalyse } from '../Api';

export default function Analyse() {
  const [analyses, setAnalyses] = React.useState([{ id: 1, analyse: '' }]);
  const [medicaments, setMedicaments] = React.useState([{ id: 1, medicament: '', periode: '', nbPrise: '', comment: '' }]);
  const listRDVs = usePatients();
  const patient = listRDVs[0];
  const medecin = JSON.parse(localStorage.getItem('user'));

  const handleAddAnalyse = () => {
    const newId = analyses.length + 1;
    setAnalyses([...analyses, { id: newId }]);
  };

  const handleInputChange = (event, id, field) => {
    const updatedAnalyses = analyses.map((analyse) => {
      if (analyse.id === id) {
        return {
          ...analyse,
          [field]: event.target.value // Mettre à jour la valeur du champ spécifique
        };
      }
      return analyse;
    });
    setAnalyses(updatedAnalyses);
  };
  const handleSubmit = async (event) => {
    try{
      event.preventDefault();
      console.log('ana ::: ',analyses);
      console.log('medecin ::: ',medecin );
      console.log('patient ::: ',patient.patient);
      const res = await setGenerateAnalyse(patient.patient, medecin, analyses)
      console.log(res.data);
      toast.success(res.data.message);
      } catch (error) {
        console.error('Error fetching RDVs:', error);
      }
      
  };

  return (
    <Box sx={{ p: 2 }} justifyContent={'center'}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
        Analyse
      </Typography>
      {analyses.map((analyse, index) => (
        <form key={index} onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id={`analyse-${analyse.id}`}
                name={`analyse-${analyse.id}`}
                label="Analyse"
                onChange={(e) => handleInputChange(e, analyse.id, 'analyse')}
              />
            </Grid>
          </Grid>
        </form>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" onClick={handleAddAnalyse}>
          Ajouter Une autre analyse
        </Button>
        <Button type="submit" variant="contained"onClick={handleSubmit}>
          Valider
        </Button>
      </Box>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Box>
  );
}
