import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const events = [
  { date: '2025-07-27', title: 'Team Meeting' },
  { date: '2025-07-28', title: 'Call with Client' },
];

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dayEvents = events.filter(
    (event) => event.date === selectedDate.toISOString().slice(0, 10)
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Calendar</Typography>
      <Box display="flex" gap={4} flexWrap="wrap">
        <Paper elevation={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </LocalizationProvider>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, minWidth: 240, p: 2 }}>
          <Typography variant="h6">Events</Typography>
          <List>
            {dayEvents.length === 0 && (
              <ListItem>
                <ListItemText primary="No events for this day." />
              </ListItem>
            )}
            {dayEvents.map((event, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={event.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default CalendarPage;