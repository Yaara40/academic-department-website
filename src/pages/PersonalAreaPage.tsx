/**
 * Personal Area Page - Candidate
 * עמוד אזור אישי למועמד - פעילות ואירועים
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Event as EventIcon,
  Assessment as AssessmentIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { EventCard } from '../features/events/EventCard';
import { ActivityList } from '../features/activity/ActivityList';
import { ActivityStatsComponent } from '../features/activity/ActivityStats';
import { 
  getOpenEvents, 
  getUpcomingEvents,
  registerToEvent 
} from '../features/events/userEvent.service';
import { 
  getUserActivities, 
  getUserActivityStats,
  quickLogActivity 
} from '../features/activity/userActivity.service';
import type { UserEvent } from '../models/userEvent.model';
import { TargetAudience } from '../models/userEvent.model';
import type { UserActivity } from '../features/activity/userActivity.model';
import { ActivityType, UserRole } from '../features/activity/userActivity.model';
import type { ActivityStats } from '../features/activity/userActivity.service';

interface PersonalAreaPageProps {
  userId: string;
  userEmail: string;
}

export const PersonalAreaPage: React.FC<PersonalAreaPageProps> = ({ 
  userId, 
  userEmail 
}) => {
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [eventFilter, setEventFilter] = useState<'all' | 'open'>('open');
  
  useEffect(() => {
    loadData();
    
    quickLogActivity(
      userEmail,
      UserRole.CANDIDATE,
      ActivityType.PAGE_VIEW,
      'אזור אישי',
      'כניסה לאזור האישי'
    );
  }, [userId, userEmail]);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const eventsData = eventFilter === 'open' 
        ? await getOpenEvents(TargetAudience.CANDIDATE)
        : await getUpcomingEvents(TargetAudience.CANDIDATE);
      
      setEvents(eventsData);
      
      const activitiesData = await getUserActivities(userId, 50);
      setActivities(activitiesData);
      
      const statsData = await getUserActivityStats(userId);
      setStats(statsData);
      
      const registered = new Set(
        activitiesData
          .filter(a => a.activityType === ActivityType.EVENT_REGISTRATION)
          .map(a => a.eventId)
          .filter((id): id is string => id !== undefined)
      );
      setRegisteredEvents(registered);
      
    } catch (error) {
      console.error('Error loading personal area data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEventRegistration = async (eventId: string) => {
    try {
      const result = await registerToEvent(eventId);
      
      if (result.success) {
        const event = events.find(e => e.eventId === eventId);
        
        await quickLogActivity(
          userEmail,
          UserRole.CANDIDATE,
          ActivityType.EVENT_REGISTRATION,
          'אזור אישי',
          `הרשמה לאירוע: ${event?.name || 'לא ידוע'}`,
          eventId
        );
        
        setRegisteredEvents(prev => new Set(prev).add(eventId));
        loadData();
        
        alert('ההרשמה לאירוע בוצעה בהצלחה!');
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
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            האזור האישי שלי
          </Typography>
          <Typography variant="h6" color="text.secondary">
            ברוך הבא! כאן תוכל לעקוב אחר הפעילות שלך ולהירשם לאירועים
          </Typography>
        </Box>
        
        {stats && <ActivityStatsComponent stats={stats} />}
        
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tab 
              icon={<EventIcon />} 
              label={`אירועים (${events.length})`}
              iconPosition="start"
              sx={{ 
                fontSize: 16,
                fontWeight: 600,
                '& .MuiTab-iconWrapper': { marginLeft: 1 }
              }}
            />
            <Tab 
              icon={<AssessmentIcon />} 
              label={`היסטוריית פעילות (${activities.length})`}
              iconPosition="start"
              sx={{ 
                fontSize: 16,
                fontWeight: 600,
                '& .MuiTab-iconWrapper': { marginLeft: 1 }
              }}
            />
          </Tabs>
        </Paper>
        
        <Box>
          {activeTab === 0 ? (
            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Typography variant="h5" fontWeight={600}>
                  אירועים קרובים
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <ToggleButtonGroup
                    value={eventFilter}
                    exclusive
                    onChange={(_, newFilter) => {
                      if (newFilter !== null) {
                        setEventFilter(newFilter);
                        loadData();
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
                    onClick={loadData}
                    sx={{
                      '& .MuiButton-startIcon': { marginLeft: '6px', marginRight: '-2px' }
                    }}
                  >
                    רענן
                  </Button>
                </Box>
              </Box>
              
              {events.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                  <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    אין אירועים זמינים כרגע
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    בקרוב יפורסמו אירועים חדשים
                  </Typography>
                </Paper>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    },
                    gap: 3,
                  }}
                >
                  {events.map(event => (
                    <EventCard 
                      key={event.eventId}
                      event={event}
                      onRegister={handleEventRegistration}
                      isRegistered={registeredEvents.has(event.eventId)}
                      showRegistrationButton={true}
                    />
                  ))}
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    היסטוריית הפעילות שלי
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    כל הפעולות שביצעת באתר מתועדות כאן
                  </Typography>
                </Box>
                
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={loadData}
                  sx={{
                    '& .MuiButton-startIcon': { marginLeft: '6px', marginRight: '-2px' }
                  }}
                >
                  רענן
                </Button>
              </Box>
              
              <ActivityList 
                activities={activities}
                showEmpty={true}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};