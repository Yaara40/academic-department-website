import CourseList from '../features/courses/components/CourseList';
import Box from '@mui/material/Box';

const CoursesManagement = () => {
  return (
    <Box sx={{ direction: 'rtl' }}>
      <CourseList />
    </Box>
  );
};

export default CoursesManagement;