import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';



const InfoPatient = ({ client }) => {
  return (
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
          <ListItemText primary="Name" secondary="Nassima Boubeh" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary="Nassima@gmail.com" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Phone" secondary="0636148232" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary="Nassima@gmail.com" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Phone" secondary="0636148232" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Date_naissance" secondary="07-08-2001" />
        </ListItem>
        {/* Add more ListItem components for additional client information */}
      </List>
    </Paper>
  );
};

export default InfoPatient;
