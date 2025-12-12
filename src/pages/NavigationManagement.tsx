import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const NavigationManagement = () => {
  return (
    <Box sx={{ direction: 'rtl', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        ניהול ניווט
      </Typography>
      
      <Paper sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="body1">
          כאן יהיה ניהול תפריט הניווט והקישורים באתר
        </Typography>
      </Paper>
    </Box>
  );
};

export default NavigationManagement;