/**
 * Event Management Page - Admin with Stats
 * עמוד ניהול אירועים למנהלי מערכת - עם סטטיסטיקות
 */

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  People as PeopleIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  updateExpiredEvents
} from '../features/events/userEvent.service';
import type { UserEvent, UserEventInput } from '../models/userEvent.model';
import { EventType, EventStatus, TargetAudience } from '../models/userEvent.model';

export const EventManagementPage = () => {
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<UserEvent | null>(null);
  const [formData, setFormData] = useState<UserEventInput>({
    name: '',
    type: EventType.INFO_DAY,
    description: '',
    dateTime: new Date(),
    location: '',
    targetAudience: TargetAudience.CANDIDATE,
    status: EventStatus.OPEN
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      await updateExpiredEvents();
      const eventsData = await getAllEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
      alert('שגיאה בטעינת האירועים');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingEvent) {
        const result = await updateEvent(editingEvent.eventId, formData);
        if (result.success) {
          alert('האירוע עודכן בהצלחה!');
        } else {
          alert(result.errors?.join('\n'));
          return;
        }
      } else {
        const result = await createEvent(formData);
        if (result.success) {
          alert('האירוע נוצר בהצלחה!');
        } else {
          alert(result.errors?.join('\n'));
          return;
        }
      }

      resetForm();
      loadEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('שגיאה בשמירת האירוע');
    }
  };

  const handleEdit = (event: UserEvent) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      type: event.type,
      description: event.description,
      dateTime: event.dateTime instanceof Date ? event.dateTime : new Date(event.dateTime),
      location: event.location,
      targetAudience: event.targetAudience,
      status: event.status,
      maxParticipants: event.maxParticipants,
      registrationLink: event.registrationLink
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId: string, eventName: string) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את האירוע "${eventName}"?`)) {
      return;
    }

    try {
      const result = await deleteEvent(eventId);
      if (result.success) {
        alert('האירוע נמחק בהצלחה');
        loadEvents();
      } else {
        alert(result.errors?.join('\n'));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('שגיאה במחיקת האירוע');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: EventType.INFO_DAY,
      description: '',
      dateTime: new Date(),
      location: '',
      targetAudience: TargetAudience.CANDIDATE,
      status: EventStatus.OPEN
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const formatDate = (date: Date | any): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  };

  const getStatusColor = (status: EventStatus): 'success' | 'warning' | 'default' => {
    switch (status) {
      case EventStatus.OPEN: return 'success';
      case EventStatus.FULL: return 'warning';
      case EventStatus.ENDED: return 'default';
      default: return 'default';
    }
  };

  // Calculate stats
  const totalEvents = events.length;
  const openEvents = events.filter(e => e.status === EventStatus.OPEN).length;
  const fullEvents = events.filter(e => e.status === EventStatus.FULL).length;
  const endedEvents = events.filter(e => e.status === EventStatus.ENDED).length;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, direction: 'rtl' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            ניהול אירועים
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadEvents}
              sx={{ '& .MuiButton-startIcon': { marginLeft: '6px', marginRight: '-2px' } }}
            >
              רענן
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ '& .MuiButton-startIcon': { marginLeft: '6px', marginRight: '-2px' } }}
            >
              אירוע חדש
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        {/* Stats Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 2,
            mb: 3,
          }}
        >
          <Paper sx={{ p: 2.5, textAlign: 'center', bgcolor: 'cardGreen.main' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover',
                color: 'text.secondary',
                margin: '0 auto',
                mb: 1.5,
              }}
            >
              <CalendarIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={700}>
              {totalEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              סך אירועים
            </Typography>
          </Paper>

          <Paper sx={{ p: 2.5, textAlign: 'center', bgcolor: 'cardGreen.main' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover',
                color: 'text.secondary',
                margin: '0 auto',
                mb: 1.5,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={700}>
              {openEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אירועים פתוחים
            </Typography>
          </Paper>

          <Paper sx={{ p: 2.5, textAlign: 'center', bgcolor: 'cardGreen.main' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover',
                color: 'text.secondary',
                margin: '0 auto',
                mb: 1.5,
              }}
            >
              <PeopleIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={700}>
              {fullEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אירועים מלאים
            </Typography>
          </Paper>

          <Paper sx={{ p: 2.5, textAlign: 'center', bgcolor: 'cardGreen.main' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover',
                color: 'text.secondary',
                margin: '0 auto',
                mb: 1.5,
              }}
            >
              <EventIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={700}>
              {endedEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אירועים שהסתיימו
            </Typography>
          </Paper>
        </Box>
        {/* Table */}
        {events.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              אין אירועים במערכת
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setShowForm(true)}
            >
              הוסף אירוע ראשון
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>שם האירוע</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>סוג</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>תאריך</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>קהל יעד</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>משתתפים</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>סטטוס</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.eventId}>
                    <TableCell align="center">{event.name}</TableCell>
                    <TableCell align="center">{event.type}</TableCell>
                    <TableCell align="center">{formatDate(event.dateTime)}</TableCell>
                    <TableCell align="center">{event.targetAudience}</TableCell>
                    <TableCell align="center">
                      {event.status === EventStatus.OPEN ? (
                        <>
                          {event.currentParticipants}
                          {event.maxParticipants && ` / ${event.maxParticipants}`}
                        </>
                      ) : (
                        <Typography color="text.secondary">—</Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={event.status}
                        color={getStatusColor(event.status)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(event)}
                          title="ערוך אירוע"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(event.eventId, event.name)}
                          title="מחק אירוע"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Dialog Form */}
        <Dialog
          open={showForm}
          onClose={resetForm}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingEvent ? 'עריכת אירוע' : 'אירוע חדש'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="שם האירוע"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                fullWidth
              />

              <TextField
                select
                label="סוג האירוע"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                required
                fullWidth
              >
                {Object.values(EventType).map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="תיאור האירוע"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                multiline
                rows={3}
                fullWidth
              />

              <TextField
                label="תאריך ושעה"
                type="datetime-local"
                value={formData.dateTime instanceof Date
                  ? formData.dateTime.toISOString().slice(0, 16)
                  : ''}
                onChange={(e) => setFormData({
                  ...formData,
                  dateTime: new Date(e.target.value)
                })}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="מיקום / קישור"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                fullWidth
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                <TextField
                  select
                  label="קהל יעד"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetAudience: e.target.value as TargetAudience
                  })}
                  required
                  fullWidth
                >
                  {Object.values(TargetAudience).map((audience) => (
                    <MenuItem key={audience} value={audience}>{audience}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="מספר מקומות מוגבל"
                  type="number"
                  value={formData.maxParticipants || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    maxParticipants: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                  fullWidth
                />

                <TextField
                  select
                  label="סטטוס"
                  value={formData.status}
                  onChange={(e) => setFormData({
                    ...formData,
                    status: e.target.value as EventStatus
                  })}
                  required
                  fullWidth
                >
                  {Object.values(EventStatus).map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </TextField>
              </Box>

              <TextField
                label="קישור להרשמה (אופציונלי)"
                value={formData.registrationLink || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  registrationLink: e.target.value || undefined
                })}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={resetForm}>ביטול</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              {editingEvent ? 'עדכן אירוע' : 'צור אירוע'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};