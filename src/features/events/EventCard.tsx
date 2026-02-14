/**
 * Event Card Component - MUI Version
 * קומפוננטת כרטיס אירוע בודד
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import type { UserEvent } from '../../models/userEvent.model';
import { EventStatus } from '../../models/userEvent.model';

interface EventCardProps {
  event: UserEvent;
  onRegister?: (eventId: string) => void;
  isRegistered?: boolean;
  showRegistrationButton?: boolean;
  showAdminActions?: boolean;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onRegister,
  isRegistered = false,
  showRegistrationButton = true,
  showAdminActions = false,
  onEdit,
  onDelete,
}) => {
  const formatDate = (date: Date | any): string => {
    const dateObj = date instanceof Date ? date : date?.toDate?.() || new Date(date);
    
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
  
  const getStatusText = (status: EventStatus): string => {
    switch (status) {
      case EventStatus.OPEN:
        return 'פתוח להרשמה';
      case EventStatus.FULL:
        return 'אירוע מלא';
      case EventStatus.ENDED:
        return 'האירוע הסתיים';
      default:
        return '';
    }
  };
  
  const handleRegisterClick = () => {
    if (onRegister && !isRegistered && event.status === EventStatus.OPEN) {
      onRegister(event.eventId);
    }
  };
  
  const isLocationUrl = (location: string): boolean => {
    return location.startsWith('http://') || location.startsWith('https://');
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Header - שם ואייקון */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
              {event.name}
            </Typography>
            <Chip 
              label={event.type} 
              size="small" 
              sx={{ 
                bgcolor: 'cardGreen.main',
                color: 'text.primary',
                fontWeight: 500
              }} 
            />
          </Box>
          
          <Chip 
            label={getStatusText(event.status)}
            color={getStatusColor(event.status)}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        
        {/* תיאור */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2, lineHeight: 1.6 }}
        >
          {event.description}
        </Typography>
        
        {/* פרטים */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* תאריך ושעה */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(event.dateTime)}
            </Typography>
          </Box>
          
          {/* מיקום */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            {isLocationUrl(event.location) ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="primary.main">
                  קישור לאירוע מקוון
                </Typography>
                <IconButton 
                  size="small" 
                  href={event.location} 
                  target="_blank"
                  sx={{ color: 'primary.main' }}
                >
                  <LinkIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            )}
          </Box>
          
          {/* מספר משתתפים */}
          {event.maxParticipants && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon sx={{ fontSize: 20, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                {event.currentParticipants} / {event.maxParticipants} משתתפים
              </Typography>
            </Box>
          )}
          
          {/* קהל יעד */}
          <Box sx={{ mt: 1 }}>
            <Chip 
              label={`קהל יעד: ${event.targetAudience}`}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: 'primary.main',
                color: 'primary.main'
              }}
            />
          </Box>
        </Box>
      </CardContent>
      
      {/* כפתורי פעולה */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        {showAdminActions ? (
          <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => onEdit?.(event.eventId)}
              fullWidth
              sx={{
                '& .MuiButton-startIcon': { marginLeft: '6px', marginRight: '-2px' }
              }}
            >
              עריכה
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete?.(event.eventId)}
              fullWidth
              sx={{
                '& .MuiButton-startIcon': { marginLeft: '6px', marginRight: '-2px' }
              }}
            >
              מחיקה
            </Button>
          </Box>
        ) : showRegistrationButton ? (
          <Box sx={{ width: '100%' }}>
            {isRegistered ? (
              <Button
                variant="contained"
                disabled
                fullWidth
                sx={{
                  bgcolor: 'success.light',
                  color: 'success.contrastText',
                  '&.Mui-disabled': {
                    bgcolor: 'success.light',
                    color: 'success.contrastText',
                  }
                }}
              >
                ✓ נרשמת לאירוע
              </Button>
            ) : event.status === EventStatus.OPEN ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegisterClick}
                fullWidth
              >
                הרשמה לאירוע
              </Button>
            ) : event.status === EventStatus.FULL ? (
              <Button
                variant="outlined"
                disabled
                fullWidth
              >
                האירוע מלא
              </Button>
            ) : (
              <Button
                variant="outlined"
                disabled
                fullWidth
              >
                האירוע הסתיים
              </Button>
            )}
          </Box>
        ) : null}
      </CardActions>
    </Card>
  );
};