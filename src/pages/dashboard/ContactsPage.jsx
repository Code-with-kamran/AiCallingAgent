import React from 'react';
import { Box, Typography, Paper, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'phone', headerName: 'Phone', flex: 1 },
];

const rows = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '555-1234' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', phone: '555-5678' },
];

const ContactsPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Contacts</Typography>
    <Paper elevation={2} sx={{ height: 400, mb: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Paper>
    <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 32, right: 32 }}>
      <AddIcon />
    </Fab>
  </Box>
);

export default ContactsPage;