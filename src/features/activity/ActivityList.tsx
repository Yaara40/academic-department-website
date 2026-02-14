/**
 * Activity List Component - MUI Version
 */

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  Divider,
  Chip
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  MenuBook as MenuBookIcon,
  Search as SearchIcon,
  Calculate as CalculateIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import type { UserActivity } from './userActivity.model';
import { ActivityType } from './userActivity.model';

interface ActivityListProps {
  activities: UserActivity[];
  maxItems?: number;
  showEmpty?: boolean;
}

export const ActivityList: React.FC<ActivityListProps> = ({ 
  activities,
  maxItems,
  showEmpty = true 
}) => {
  const displayActivities = maxItems 
    ? activities.slice(0, maxItems) 
    : activities;
  
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.PAGE_VIEW:
        return <VisibilityIcon />;
      case ActivityType.COURSE_VIEW:
        return <MenuBookIcon />;
      case ActivityType.SEARCH:
        return <SearchIcon />;
      case ActivityType.CALCULATOR_USE:
        return <CalculateIcon />;
      case ActivityType.CONTACT_FORM:
        return <EmailIcon />;
      case ActivityType.EVENT_REGISTRATION:
        return <EventIcon />;
      default:
        return <DescriptionIcon />;
    }
  };

  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.PAGE_VIEW:
        return 'info.main';
      case ActivityType.COURSE_VIEW:
        return 'primary.main';
      case ActivityType.SEARCH:
        return 'secondary.main';
      case ActivityType.CALCULATOR_USE:
        return 'warning.main';
      case ActivityType.CONTACT_FORM:
        return 'success.main';
      case ActivityType.EVENT_REGISTRATION:
        return 'error.main';
      default:
        return 'primary.main';
    }
  };
  
  const formatTimestamp = (timestamp: Date | any): string => {
    // המרה ל-Date אם זה Timestamp
    const date = timestamp instanceof Date 
      ? timestamp 
      : timestamp?.toDate?.() || new Date(timestamp);
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'עכשיו';
    if (diffMins < 60) return `לפני ${diffMins} דקות`;
    if (diffHours < 24) return `לפני ${diffHours} שעות`;
    if (diffDays < 7) return `לפני ${diffDays} ימים`;
    
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (activities.length === 0 && !showEmpty) {
    return null;
  }
  
  if (displayActivities.length === 0) {
    return (
      <Paper 
        sx={{ 
          p: 6, 
          textAlign: 'center',
          borderRadius: 2
        }}
      >
        <DescriptionIcon 
          sx={{ 
            fontSize: 64, 
            color: 'text.secondary', 
            mb: 2,
            opacity: 0.5 
          }} 
        />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          טרם בוצעו פעולות
        </Typography>
        <Typography variant="body2" color="text.secondary">
          כאן תופיע ההיסטוריה של הפעילות שלך באתר
        </Typography>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ overflow: 'hidden', borderRadius: 2 }}>
      <Stack divider={<Divider />}>
        {displayActivities.map((activity) => (
          <Box
            key={activity.activityId}
            sx={{
              p: 2,
              display: 'flex',
              gap: 2,
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: getActivityColor(activity.activityType),
                width: 48,
                height: 48
              }}
            >
              {getActivityIcon(activity.activityType)}
            </Avatar>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0.5,
                gap: 2
              }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {activity.activityType}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {formatTimestamp(activity.timestamp)}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {activity.description}
              </Typography>
              
              <Chip 
                icon={<DescriptionIcon fontSize="small" />}
                label={activity.page}
                size="small"
                variant="outlined"
                sx={{ 
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
      
      {maxItems && activities.length > maxItems && (
        <Box sx={{ 
          p: 2, 
          textAlign: 'center',
          bgcolor: 'cardGreen.main',
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <Typography variant="body2" color="text.secondary">
            ועוד {activities.length - maxItems} פעולות נוספות
          </Typography>
        </Box>
      )}
    </Paper>
  );
};