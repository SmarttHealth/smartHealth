import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Ordonnace() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Placez ici la logique pour soumettre le formulaire
  };

  return (
    <Box sx={{ p: 2 }} justifyContent={'center'}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
        Traitement
      </Typography>
      <form onSubmit={handleSubmit}>

        <Grid container spacing={2} style={{ marginTop: '20px'}}>
          <Grid item xs={12} >
            <TextField
              required
              fullWidth
              id="medicament"
              name="medicament"
              label="Nom De Medicament"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="periode"
              name="periode"
              label="Periode"
            />
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              required
              fullWidth
              id="nbPrise"
              name="nbPrise"
              label="Nombre De Prise"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="comment"
              name="comment"
              label="Commentaire"
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button type="submit" variant="contained">
            Ajouter Un Med
          </Button>
          <Button type="submit" variant="contained">
            Valider
          </Button>
        </Box>
      </form>
    </Box>
  );
}
