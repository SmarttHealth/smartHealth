import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { setGenerateOrdonnance } from '../Api';
import { usePatients } from './patientsProvider';
import { Toaster, toast } from 'react-hot-toast';

export default function Ordonnace({counter}) {

  const [medicaments, setMedicaments] = React.useState([{ id: 1, medicament: '', periode: '', nbPrise: '', comment: '' }]);
  const listRDVs = usePatients();
  const patient = listRDVs[0];
  const medecin = JSON.parse(localStorage.getItem('user'));
  const handleSubmit = async (event) => {
    try{
    event.preventDefault();
    console.log('med ::: ',medicaments);
    console.log('medecin ::: ',medecin );
    console.log('patient ::: ',patient.patient);
    const res = await setGenerateOrdonnance(patient.patient, medecin, medicaments)
    console.log(res.data);
    toast.success(res.data.message);
    } catch (error) {
      console.error('Error fetching RDVs:', error);
    }
    
  };

  const handleAddMedicament = () => {
    const newId = medicaments.length + 1;
    setMedicaments([...medicaments, { id: newId }]);
  };

  const handleInputChange = (event, id, field) => {
    const updatedMedicaments = medicaments.map((medicament) => {
      if (medicament.id === id) {
        return {
          ...medicament,
          [field]: event.target.value // Mettre à jour la valeur du champ spécifique
        };
      }
      return medicament;
    });
    setMedicaments(updatedMedicaments);
  };

  return (
    <Box sx={{ p: 2 }} justifyContent={'center'}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
        Ordonnance
      </Typography>
      {medicaments.map((medicament, index) => (
        <form key={index} onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id={`medicament-${medicament.id}`}
                name={`medicament-${medicament.id}`}
                label="Nom De Medicament"
                onChange={(e) => handleInputChange(e, medicament.id, 'medicament')}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id={`periode-${medicament.id}`}
              name={`periode-${medicament.id}`}
              label="Periode"
              onChange={(e) => handleInputChange(e, medicament.id, 'periode')}
            />
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              required
              fullWidth
              id={`nbPrise-${medicament.id}`}
              name={`nbPrise-${medicament.id}`}
              label="Nombre De Prise"
              onChange={(e) => handleInputChange(e, medicament.id, 'nbPrise')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id={`comment-${medicament.id}`}
              name={`comment-${medicament.id}`}
              label="Commentaire"
              onChange={(e) => handleInputChange(e, medicament.id, 'comment')}
              multiline
              rows={2}
            />
          </Grid>
          </Grid>
        </form>
      ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" onClick={handleAddMedicament}>
          Ajouter Un autre Med
        </Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
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
