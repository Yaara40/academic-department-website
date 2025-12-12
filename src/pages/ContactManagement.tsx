import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const ContactManagement = () => {
  return (
    <Box sx={{ direction: 'rtl', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        ניהול השארת פרטים
      </Typography>
      
      <Paper sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="body1">
          כאן יהיה ניהול פניות ופרטי קשר שהשאירו משתמשים
        </Typography>
      </Paper>
    </Box>
  );
};

export default ContactManagement;