import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, date: '2025-07-27', title: 'Team Meeting', description: 'Discuss project updates', time: '10:00 AM', type: 'Meeting' },
    { id: 2, date: '2025-07-28', title: 'Client Call', description: 'Review proposal', time: '3:00 PM', type: 'Call' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({ id: null, title: '', description: '', time: '', type: 'Meeting' });

  // Filter events for selected day
  const dayEvents = events.filter(event => event.date === selectedDate.toISOString().slice(0, 10));

  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentEvent({ id: null, title: '', description: '', time: '', type: 'Meeting' });
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setIsEditMode(true);
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (!currentEvent.title || !currentEvent.time) {
      alert('Title and time are required.');
      return;
    }

    if (isEditMode) {
      setEvents(events.map(ev => (ev.id === currentEvent.id ? currentEvent : ev)));
    } else {
      setEvents([
        ...events,
        { id: Date.now(), date: selectedDate.toISOString().slice(0, 10), ...currentEvent }
      ]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <Button onClick={openAddModal}>+ Add Event</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Compact Calendar */}
        <Card className="p-4 shadow-md">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-full rounded-lg"
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().slice(0, 10);
              return events.some((event) => event.date === dateStr)
                ? 'bg-blue-100 font-semibold rounded-full'
                : '';
            }}
          />
        </Card>

        {/* Expanded Event Section */}
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Events on {selectedDate.toISOString().slice(0, 10)}
          </h2>
          {dayEvents.length === 0 ? (
            <p className="text-gray-500">No events for this day.</p>
          ) : (
            <ul className="space-y-4">
              {dayEvents.map((event) => (
                <li key={event.id} className="p-4 bg-gray-50 rounded-lg border flex justify-between items-start">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">{event.title}</span>
                      <span className="text-sm text-gray-500">{event.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {event.type}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(event)}>Edit</Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Add/Edit Event Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? 'Edit Event' : 'Add New Event'}
      >
        <div className="space-y-4 relative overflow-visible h-auto max-h-[80vh] overflow-y-auto">

          <input
            type="text"
            placeholder="Event title"
            value={currentEvent.title}
            onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            placeholder="Event description"
            value={currentEvent.description}
            onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="time"
            value={currentEvent.time}
            onChange={(e) => setCurrentEvent({ ...currentEvent, time: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="relative">
            <select
              value={currentEvent.type}
              onChange={(e) => setCurrentEvent({ ...currentEvent, type: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Meeting</option>
              <option>Call</option>
              <option>Reminder</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEvent}>{isEditMode ? 'Update Event' : 'Add Event'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarPage;
