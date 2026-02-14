import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Event as EventIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { 
  getUpcomingEvents,
  registerToEvent 
} from '../features/events/userEvent.service';
import type { UserEvent } from '../models/userEvent.model';
import { TargetAudience, EventStatus } from '../models/userEvent.model';

export default function UserEvents() {
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Registration Form State
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
  });
  
  useEffect(() => {
    loadEvents();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchTerm, events]);
  
  const loadEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getUpcomingEvents(TargetAudience.CANDIDATE);
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegistrationClick = (event: UserEvent) => {
    setSelectedEvent(event);
    setFormData({ fullName: '', email: '' });
    setFormErrors({ fullName: '', email: '' });
    setShowRegistrationForm(true);
  };
  
  const validateForm = (): boolean => {
    const errors = { fullName: '', email: '' };
    let isValid = true;
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'שם מלא הוא שדה חובה';
      isValid = false;
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'שם מלא חייב להכיל לפחות 2 תווים';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'אימייל הוא שדה חובה';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'כתובת אימייל אינה תקינה';
        isValid = false;
      }
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmitRegistration = async () => {
    if (!validateForm() || !selectedEvent) {
      return;
    }
    
    try {
      const result = await registerToEvent(selectedEvent.eventId);
      
      if (result.success) {
        alert(`הרשמה לאירוע "${selectedEvent.name}" בוצעה בהצלחה! ✅\n\nשם: ${formData.fullName}\nאימייל: ${formData.email}\n\nנשלח אליך אישור במייל.`);
        setShowRegistrationForm(false);
        loadEvents();
      } else {
        alert(result.errors?.join('\n') || 'שגיאה בהרשמה לאירוע');
      }
    } catch (error) {
      console.error('Error registering to event:', error);
      alert('שגיאה בהרשמה לאירוע. אנא נסה שוב.');
    }
  };
  
  const formatDate = (date: Date | any): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  };
  
  const formatTime = (date: Date | any): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('he-IL', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  };
  
  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case EventStatus.OPEN:
        return 'success';
      case EventStatus.FULL:
        return 'warning';
      case EventStatus.ENDED:
        return 'default';
      default:
        return 'default';
    }
  };
  
  const getStatusLabel = (status: EventStatus) => {
    switch (status) {
      case EventStatus.OPEN:
        return 'פתוח';
      case EventStatus.FULL:
        return 'מלא';
      case EventStatus.ENDED:
        return 'הסתיים';
      default:
        return status;
    }
  };
  
  const totalEvents = events.length;
  const openEvents = events.filter(e => e.status === EventStatus.OPEN).length;
  const fullEvents = events.filter(e => e.status === EventStatus.FULL).length;
  const endedEvents = events.filter(e => e.status === EventStatus.ENDED).length;
  
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }
  
  return (
    <Box sx={{ padding: 2, direction: 'rtl', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Chip 
            label="30 הימים הקרובים" 
            color="primary" 
            size="small"
            sx={{ mb: 2 }}
          />
          <Typography variant="h3" fontWeight={700} gutterBottom>
            אירועים קרובים
          </Typography>
          <Typography variant="h6" color="text.secondary">
            גלו את האירועים המתוכננים במחלקה, הירשמו בקלות ובואו להיות חלק מהקהילה שלנו
          </Typography>
        </Box>
        
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
            <CalendarIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700}>
              {totalEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              סך אירועים
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 2.5, textAlign: 'center', bgcolor: '#e8f5e9' }}>
            <CheckCircleIcon sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="success.main">
              {openEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אירועים פתוחים
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 2.5, textAlign: 'center', bgcolor: '#fff3e0' }}>
            <PeopleIcon sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="warning.main">
              {fullEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אירועים מלאים
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 2.5, textAlign: 'center', bgcolor: '#f5f5f5' }}>
            <EventIcon sx={{ fontSize: 32, color: 'text.secondary', mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="text.secondary">
              {endedEvents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אירועים שהסתיימו
            </Typography>
          </Paper>
        </Box>
        
        {/* Search */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <TextField
            placeholder="חיפוש לפי שם אירוע, מיקום או תיאור..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ 
              minWidth: 350,
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadEvents}
            sx={{
              '& .MuiButton-startIcon': { marginLeft: '6px', marginRight: '-2px' }
            }}
          >
            רענן
          </Button>
        </Box>
        
        {/* Events Table Header */}
        <Paper sx={{ mb: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr 150px',
              gap: 2,
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 700,
              borderRadius: '8px 8px 0 0',
            }}
          >
            <Typography fontWeight={700}>שם האירוע</Typography>
            <Typography fontWeight={700}>סוג האירוע</Typography>
            <Typography fontWeight={700}>תאריך ושעה</Typography>
            <Typography fontWeight={700}>מיקום</Typography>
            <Typography fontWeight={700}>סטטוס</Typography>
            <Typography fontWeight={700} textAlign="center">פעולה</Typography>
          </Box>
        </Paper>
        
        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <Paper sx={{ p: 8, textAlign: 'center' }}>
            <EventIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              אין אירועים זמינים כרגע
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchTerm ? 'לא נמצאו תוצאות לחיפוש' : 'בקרוב יפורסמו אירועים חדשים'}
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {filteredEvents.map((event, index) => (
              <Paper
                key={event.eventId}
                sx={{
                  p: 2.5,
                  transition: 'all 0.2s',
                  borderRadius: 0,
                  borderBottom: index === filteredEvents.length - 1 ? 'none' : '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    transform: 'translateX(-4px)',
                    boxShadow: 2,
                  },
                  ...(index === filteredEvents.length - 1 && {
                    borderRadius: '0 0 8px 8px',
                  }),
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr 150px',
                    gap: 2,
                    alignItems: 'center',
                  }}
                >
                  {/* שם האירוע */}
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      {event.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {event.description}
                    </Typography>
                  </Box>
                  
                  {/* סוג האירוע */}
                  <Box>
                    <Chip 
                      label={event.type} 
                      size="small"
                      sx={{ bgcolor: 'cardGreen.main', fontWeight: 500 }}
                    />
                  </Box>
                  
                  {/* תאריך ושעה */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                      <CalendarIcon fontSize="small" color="action" />
                      <Typography variant="body2">{formatDate(event.dateTime)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ScheduleIcon fontSize="small" color="action" />
                      <Typography variant="body2">{formatTime(event.dateTime)}</Typography>
                    </Box>
                  </Box>
                  
                  {/* מיקום */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationIcon fontSize="small" color="action" />
                      <Typography variant="body2" sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {event.location}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* סטטוס */}
                  <Box>
                    <Chip 
                      label={getStatusLabel(event.status)}
                      color={getStatusColor(event.status)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  
                  {/* כפתור הרשמה */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      fullWidth
                      disabled={event.status !== EventStatus.OPEN}
                      onClick={() => handleRegistrationClick(event)}
                      sx={{ fontWeight: 700 }}
                    >
                      {event.status === EventStatus.OPEN ? 'הרשמה' : 
                       event.status === EventStatus.FULL ? 'מלא' : 'הסתיים'}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
        
        {/* Registration Form Dialog */}
        <Dialog 
          open={showRegistrationForm} 
          onClose={() => setShowRegistrationForm(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EventIcon />
              <Typography variant="h6" fontWeight={700}>
                הרשמה לאירוע
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent sx={{ mt: 3 }}>
            {selectedEvent && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'cardGreen.main', borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {selectedEvent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(selectedEvent.dateTime)} • {formatTime(selectedEvent.dateTime)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📍 {selectedEvent.location}
                </Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="שם מלא"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                label="כתובת אימייל"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!formErrors.email}
                helperText={formErrors.email}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="body2" color="info.dark">
                  💡 לאחר ההרשמה, תקבל אישור במייל עם כל הפרטים הרלוונטיים לאירוע.
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ p: 2.5 }}>
            <Button 
              onClick={() => setShowRegistrationForm(false)}
              variant="outlined"
            >
              ביטול
            </Button>
            <Button 
              onClick={handleSubmitRegistration}
              variant="contained"
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              אישור הרשמה
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}