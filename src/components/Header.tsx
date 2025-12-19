import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HelpIcon from '@mui/icons-material/Help';
import NavigationIcon from '@mui/icons-material/Navigation';

const Header = () => {
  const menuItems = [
    { text: 'ניהול דף הבית', icon: <HomeIcon />, path: '/' },
    { text: 'ניהול קורסים', icon: <MenuBookIcon />, path: '/courses' },
    { text: 'ניהול צמיחה', icon: <TrendingUpIcon />, path: '/growth' },
    { text: 'ניהול השארת פרטים', icon: <ContactMailIcon />, path: '/contact' },
    { text: 'ניהול עזרה', icon: <HelpIcon />, path: '/help' },
    { text: 'ניהול ניווט', icon: <NavigationIcon />, path: '/navigation' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2e917aff' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            {menuItems.reverse().map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{ 
                  minWidth: 'auto',
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          
          <Typography variant="h6" component="div" sx={{ ml: 4 }}>
            מערכת ניהול מידע
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Right Side Vertical Menu */}
      <Box 
  sx={{ 
    position: 'fixed',
    right: 0,
    top: '72px',
    height: 'calc(100vh - 64px)',
    width: '200px',
    backgroundColor: '#ffffff33',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    p: 2,
    pt: 3,
    zIndex: 1000,
    borderLeft: '1px solid #e0e0e0',
    boxSizing: 'border-box'
  }}
>
  {menuItems.reverse().map((item) => (
    <Button
      key={`side-${item.text}`}
      color="inherit"
      component={Link}
      to={item.path}
      sx={{ 
        justifyContent: 'flex-start',  // Align to the right
        width: '100%',
        color: '#2e917a',
        display: 'flex',
        flexDirection: 'row',
        gap: 1,  // Space between icon and text
        '&:hover': {
          backgroundColor: 'rgba(46, 145, 122, 0.1)'
        }
      }}
    >
      {item.icon}
      <span style={{ marginRight: '8px' }}>{item.text}</span>
    </Button>
  ))}
</Box>
    </>
  );
};

export default Header;