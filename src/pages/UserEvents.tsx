/**
 * User Events Page
 * עמוד אירועים למשתמשים
 */

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { EventCard } from '../features/events/EventCard';
import { 
  getOpenEvents, 
  getUpcomingEvents,
  registerToEvent 
} from '../features/events/userEvent.service';
import type { UserEvent } from '../models/userEvent.model';
import { TargetAudience } from '../models/userEvent.model';

export default function UserEvents() {
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventFilter, setEventFilter] = useState<'all' | 'open'>('open');
  
  useEffect(() => {
    loadEvents();
  }, [eventFilter]);
  
  const loadEvents = async () => {
    setLoading(true);
    try {
      const eventsData = eventFilter === 'open' 
        ? await getOpenEvents(TargetAudience.CANDIDATE)
        : await getUpcomingEvents(TargetAudience.CANDIDATE);
      
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEventRegistration = async (eventId: string) => {
    try {
      const result = await registerToEvent(eventId);
      
      if (result.success) {
        alert('ההרשמה לאירוע בוצעה בהצלחה! ✅');
        loadEvents();
      } else {
        alert(result.errors?.join('\n') || 'שגיאה בהרשמה לאירוע');
      }
    } catch (error) {
      console.error('Error registering to event:', error);
      alert('שגיאה בהרשמה לאירוע. אנא נסה שוב.');
    }
  };
  
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
    <Box sx={{ padding: 2, direction: 'rtl' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            אירועים קרובים
          </Typography>
          <Typography variant="h6" color="text.secondary">
            הירשם לאירועים שלנו והכר את המכללה מקרוב
          </Typography>
        </Box>
        
        {/* Filters */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <ToggleButtonGroup
            value={eventFilter}
            exclusive
            onChange={(_, newFilter) => {
              if (newFilter !== null) {
                setEventFilter(newFilter);
              }
            }}
            size="small"
          >
            <ToggleButton value="open">פתוחים להרשמה</ToggleButton>
            <ToggleButton value="all">כל האירועים</ToggleButton>
          </ToggleButtonGroup>
          
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
        
        {/* Events Grid */}
        {events.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1
          }}>
            <EventIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              אין אירועים זמינים כרגע
            </Typography>
            <Typography variant="body1" color="text.secondary">
              בקרוב יפורסמו אירועים חדשים
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {events.map(event => (
              <EventCard 
                key={event.eventId}
                event={event}
                onRegister={handleEventRegistration}
                isRegistered={false}
                showRegistrationButton={true}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}