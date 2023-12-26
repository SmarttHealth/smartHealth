import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function BasicTable() {
  return (
    <TableContainer component={Paper} >
      <Table sx={{ Width: 100, background: '#72A1B4', height: 100}} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="center"  style={{ fontSize: '20px' }}>Current Patient</TableCell>
            <TableCell align="center"   style={{ fontSize: '20px' }}>Total RDV</TableCell>
            <TableCell align="center"  style={{ fontSize: '20px' }}>RDV Faits</TableCell>
            <TableCell align="center"  style={{ fontSize: '20px' }}>RDV Restants</TableCell>
            <TableCell align="center"   style={{ fontSize: '20px' }}>RDV Annulés</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}