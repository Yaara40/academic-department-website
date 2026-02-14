/**
 * Activity Stats Component - עם עיגולים צבעוניים
 */

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
      icon: <AssessmentIcon />,
      colorKey: 'primary.main',
      bgColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(102, 187, 106, 0.2)' : 'rgba(44, 131, 50, 0.1)'
    },
    {
      label: 'צפיות בעמודים',
      value: stats.pageViews,
      icon: <VisibilityIcon />,
      colorKey: 'success.main',
      bgColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(102, 187, 106, 0.2)' : 'rgba(76, 175, 80, 0.1)'
    },
    {
      label: 'קורסים שנצפו',
      value: stats.courseViews,
      icon: <MenuBookIcon />,
      colorKey: 'secondary.main',
      bgColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(156, 204, 101, 0.2)' : 'rgba(139, 195, 74, 0.1)'
    },
    {
      label: 'חיפושים',
      value: stats.searches,
      icon: <SearchIcon />,
      colorKey: 'warning.main',
      bgColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(255, 167, 38, 0.2)' : 'rgba(255, 152, 0, 0.1)'
    },
    {
      label: 'שימושים במחשבון',
      value: stats.calculatorUses,
      icon: <CalculateIcon />,
      colorKey: 'error.main',
      bgColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.2)' : 'rgba(244, 67, 54, 0.1)'
    },
    {
      label: 'טפסי יצירת קשר',
      value: stats.contactForms,
      icon: <EmailIcon />,
      colorKey: 'info.main',
      bgColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.2)' : 'rgba(33, 150, 243, 0.1)'
    },
    {
      label: 'הרשמות לאירועים',
      value: stats.eventRegistrations,
      icon: <EventIcon />,
      colorKey: 'success.dark',
      bgColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(56, 142, 60, 0.1)'
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
            <Box 
              sx={{ 
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: card.bgColor,
                color: card.colorKey,
                margin: '0 auto',
                mb: 2,
                fontSize: 28
              }}
            >
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