/**
 * Activity Stats Component - בסגנון הכרטיסים הירוקים שלך
 */

import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Visibility as VisibilityIcon,
  MenuBook as MenuBookIcon,
  Search as SearchIcon,
  Calculate as CalculateIcon,
  Email as EmailIcon,
  Event as EventIcon
} from '@mui/icons-material';
import type { ActivityStats } from './userActivity.service';

interface ActivityStatsProps {
  stats: ActivityStats;
}

export const ActivityStatsComponent: React.FC<ActivityStatsProps> = ({ stats }) => {
  const statCards = [
    {
      label: 'סך כל הפעילויות',
      value: stats.totalActivities,
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />
    },
    {
      label: 'צפיות בעמודים',
      value: stats.pageViews,
      icon: <VisibilityIcon sx={{ fontSize: 40 }} />
    },
    {
      label: 'קורסים שנצפו',
      value: stats.courseViews,
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />
    },
    {
      label: 'חיפושים',
      value: stats.searches,
      icon: <SearchIcon sx={{ fontSize: 40 }} />
    },
    {
      label: 'שימושים במחשבון',
      value: stats.calculatorUses,
      icon: <CalculateIcon sx={{ fontSize: 40 }} />
    },
    {
      label: 'טפסי יצירת קשר',
      value: stats.contactForms,
      icon: <EmailIcon sx={{ fontSize: 40 }} />
    },
    {
      label: 'הרשמות לאירועים',
      value: stats.eventRegistrations,
      icon: <EventIcon sx={{ fontSize: 40 }} />
    }
  ];
  
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 3,
        mb: 4,
      }}
    >
      {statCards.map((card, index) => (
        <Card 
          key={index}
          sx={{ 
            textAlign: 'center',
            bgcolor: 'cardGreen.main',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            }
          }}
        >
          <CardContent>
            <Box sx={{ color: 'primary.main', mb: 1 }}>
              {card.icon}
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {card.value}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {card.label}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};