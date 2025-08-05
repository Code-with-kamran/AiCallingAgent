import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2, X } from 'lucide-react';

// The main CalendarPagelication component for a calendar page.
const CalendarPage = () => {
  /* ---------------- State and Data ---------------- */
  // State to store the list of events. In a real CalendarPagelication, this would come from a database.
  const [events, setEvents] = useState([
    { id: 1, date: '2025-07-27', title: 'Team Meeting' },
    { id: 2, date: '2025-07-28', title: 'Call with Client' },
    { id: 3, date: '2025-08-05', title: 'Project Kickoff' },
    { id: 4, date: '2025-08-15', title: 'Design Review' },
    { id: 5, date: '2025-08-15', title: 'Client Feedback Session' },
  ]);

  // State to manage the currently selected date.
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Manages the state of the modal for creating, editing, and deleting.
  const [modal, setModal] = useState({ type: null, event: null });
  
  // State to manage the form data for adding or editing an event.
  const [formData, setFormData] = useState({ title: '', date: '' });

  /* ---------------- Calendar Logic ---------------- */
  // Get the first day of the current month.
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  // Get the number of days in the current month.
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  // Get the weekday of the first day of the month (0 = Sunday, 6 = Saturday).
  const startingDay = firstDayOfMonth.getDay();

  // Helper function to format a date to 'YYYY-MM-DD' for comparison.
  const formatDate = (date) => {
    // This handles both Date objects and string dates from the form.
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Memoized array of days for the current month.
  const calendarDays = useMemo(() => {
    const days = [];
    // Add placeholder days for the start of the week.
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    // Add all the days of the month.
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [selectedDate, daysInMonth, startingDay]);

  // Filters events for the currently selected date.
  const dayEvents = useMemo(() => {
    return events.filter((event) => event.date === formatDate(selectedDate));
  }, [events, selectedDate]);

  /* ---------------- Navigation Handlers ---------------- */
  /**
   * Moves the calendar to the previous month.
   */
  const goToPreviousMonth = () => {
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate()));
  };

  /**
   * Moves the calendar to the next month.
   */
  const goToNextMonth = () => {
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate()));
  };

  /* ---------------- Event Action Handlers ---------------- */
  /**
   * Opens the modal for creating a new event.
   */
  const openCreate = () => {
    setModal({ type: 'create', event: null });
    setFormData({ title: '', date: formatDate(selectedDate) });
  };

  /**
   * Opens the modal for editing an existing event.
   * @param {object} event The event object to be edited.
   */
  const openEdit = (event) => {
    setModal({ type: 'edit', event });
    setFormData({ title: event.title, date: event.date });
  };
  
  /**
   * Opens the modal for deleting an event.
   * @param {object} event The event object to be deleted.
   */
  const openDelete = (event) => setModal({ type: 'delete', event });

  /**
   * Closes the modal and resets the form and modal state.
   */
  const closeModal = () => setModal({ type: null, event: null });

  /**
   * Handles the form submission for creating or editing an event.
   * @param {object} e The form event object.
   */
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (modal.type === 'create') {
      setEvents(prev => [
        ...prev,
        { id: Date.now(), date: formData.date, title: formData.title },
      ]);
    } else if (modal.type === 'edit') {
      setEvents(prev =>
        prev.map(event =>
          event.id === modal.event.id ? { ...event, title: formData.title, date: formData.date } : event
        )
      );
    }
    closeModal();
  };

  /**
   * Deletes an event from the state.
   */
  const deleteEvent = () => {
    setEvents(prev => prev.filter(event => event.id !== modal.event.id));
    closeModal();
  };

  /* ---------------- Render ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans antialiased">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Calendar</h1>
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Calendar Card */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex-1 max-w-full lg:max-w-lg">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day} className="font-semibold text-gray-600 p-2">
                {day}
              </span>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`p-2 transition-colors ${day ? 'cursor-pointer rounded-lg hover:bg-gray-100' : ''}`}
                onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
              >
                <span
                  className={`block h-8 w-8 leading-8 rounded-full mx-auto ${
                    day && formatDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)) === formatDate(selectedDate)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {day}
                </span>
                {/* Event indicators */}
                {day && events.some(e => e.date === formatDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))) && (
                    <span className="block w-1 h-1 bg-red-500 rounded-full mx-auto mt-1"></span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Events Card */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex-1 min-w-full lg:min-w-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <button
              onClick={openCreate}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm shadow-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Event</span>
            </button>
          </div>

          {dayEvents.length > 0 ? (
            <ul className="space-y-3">
              {dayEvents.map((event, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600 flex justify-between items-center">
                  <h3 className="font-medium text-lg text-gray-900">{event.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(event)}
                      className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => openDelete(event)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No events for this day.</p>
          )}
        </div>
      </div>
      
      {/* Modal for Create/Edit Event */}
      {(modal.type === 'create' || modal.type === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 animate-scale-in">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {modal.type === 'create' ? 'Add Event' : 'Edit Event'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Team Standup"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Event Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {modal.type === 'create' ? 'Add Event' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modal.type === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 m-4 animate-scale-in">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Delete Event</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X size={24} />
              </button>
            </div>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete “<span className="font-semibold">{modal.event?.title}</span>”?
            </p>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel
              </button>
              <button type="button" onClick={deleteEvent} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
