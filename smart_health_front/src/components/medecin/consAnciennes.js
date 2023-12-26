import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography, Divider } from '@mui/material';

const documents = ['analyse.pdf', 'rapport.pdf', 'analyse.pdf', 'rapport.pdf', 'analyse.pdf', 'rapport.pdf']
const consultations = ['con_01', 'con_02', 'con_01', 'con_02', 'con_01', 'con_02']
const ConAnciennes = () => {
  return (
    <Paper elevation={3} style={{ marginBottom: '20px' }}>
 {/* Liste des documents */}
      <Typography variant="h5" gutterBottom>
        Documents :
      </Typography>
      <List sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 135,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}>
        {documents.map((document, index) => (
          <ListItem key={index}>
            <ListItemText primary={document} />
          </ListItem>
          
        ))}
        <ListItem >
            <ListItemText primary="diagnostique :" />
          </ListItem>
        
      </List>
      

     <Divider style={{ margin: '15px 0' }} />

      <Typography variant="h5" gutterBottom>
        Consultations Anciennes :
      </Typography>

       
      {/* Liste des anciennes consultations */}
      <List sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 135,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}>
        {consultations.map((consultation, index) => (
          <ListItem key={index}>
            <ListItemText primary={consultation} />
          </ListItem>
        ))}
      </List>

      
</Paper>
     
  );
};

export default ConAnciennes;
