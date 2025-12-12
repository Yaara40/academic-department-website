import CourseList from '../features/courses/components/CourseList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CoursesManagement = () => {
  return (
    <Box sx={{ direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom>
        ניהול קורסים
      </Typography>
      <CourseList />
    </Box>
  );
};

export default CoursesManagement;