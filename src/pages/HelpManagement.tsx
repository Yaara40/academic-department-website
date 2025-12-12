import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const HelpManagement = () => {
  return (
    <Box sx={{ direction: 'rtl', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        ניהול עזרה
      </Typography>
      
      <Paper sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="body1">
          כאן יהיה ניהול תוכן דפי העזרה והשאלות הנפוצות
        </Typography>
      </Paper>
    </Box>
  );
};

export default HelpManagement;