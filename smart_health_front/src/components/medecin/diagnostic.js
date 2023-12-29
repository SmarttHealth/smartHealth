import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Diagnostique() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Placez ici la logique pour soumettre le formulaire
  };

  return (
    <Box sx={{ p: 2 }} justifyContent={'center'}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
        Diagnostique
      </Typography>
      <form onSubmit={handleSubmit}>

        <Grid container spacing={2} style={{ marginTop: '20px'}}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="diagnostique"
              name="diagnostique"
              label="Diagnostique"
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
