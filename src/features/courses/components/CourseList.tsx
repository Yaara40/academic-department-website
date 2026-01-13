import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../../models/Course';
import { listCourses, deleteCourse } from '../../../firebase/courses';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';

function CourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const coursesData = await listCourses();
      setCourses(coursesData);
    } catch (err) {
      setError('שגיאה בטעינת הקורסים');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.isActive === true).length;
  const mandatoryCourses = courses.filter(c => c.isMandatory === true).length;
  const electiveCourses = courses.filter(c => c.isMandatory === false).length;

  function navigateToNewCourse() {
    navigate('/courses/new');
  }

  const handleDeleteCourse = async (courseId: string, courseName: string) => {
    const confirmDelete = window.confirm(
      `האם אתה בטוח שברצונך למחוק את הקורס "${courseName}"?`
    );

    if (confirmDelete) {
      try {
        await deleteCourse(courseId);
        await loadCourses();
        alert('✅ הקורס נמחק בהצלחה!');
      } catch (err) {
        alert('❌ שגיאה במחיקת הקורס');
        console.error('Error deleting course:', err);
      }
    }
  };

  const handleEditCourse = (courseId: string) => {
    navigate(`/courses/edit/${courseId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2, direction: 'rtl' }}>
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>{error}</Typography>
        <Button variant="contained" onClick={loadCourses}>נסה שוב</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, direction: 'rtl' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>ניהול קורסים</Typography>
        <IconButton color="primary" onClick={loadCourses} title="רענן רשימה">
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* כרטיסי סטטיסטיקה - מעודכנים לשימוש ב-Theme */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4 
      }}>
        {/* סה"כ קורסים */}
        <Card sx={{ textAlign: 'center', bgcolor: 'cardGray' }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {totalCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">סה"כ קורסים</Typography>
          </CardContent>
        </Card>

        {/* קורסים פעילים */}
        <Card sx={{ textAlign: 'center', bgcolor: 'cardGreen' }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {activeCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">קורסים פעילים</Typography>
          </CardContent>
        </Card>

        {/* קורסי חובה */}
        <Card sx={{ textAlign: 'center', bgcolor: 'cardYellow' }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {mandatoryCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">קורסי חובה</Typography>
          </CardContent>
        </Card>

        {/* קורסי בחירה */}
        <Card sx={{ textAlign: 'center', bgcolor: 'cardBlue' }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {electiveCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">קורסי בחירה</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={navigateToNewCourse}
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
        >
          הוסף קורס חדש
        </Button>
      </Box>

      {courses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">אין קורסים להצגה</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={navigateToNewCourse}>הוסף קורס ראשון</Button>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>קוד קורס</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>שם הקורס</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>נ"ז</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>שנה</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>סמסטר</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>מרצה</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>חובה</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעיל</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell align="center">{course.courseId}</TableCell>
                  <TableCell align="center">{course.name}</TableCell>
                  <TableCell align="center">{course.credits}</TableCell>
                  <TableCell align="center">{course.year || '-'}</TableCell>
                  <TableCell align="center">{course.semester}</TableCell>
                  <TableCell align="center">{course.instructor || '-'}</TableCell>
                  <TableCell align="center">
                    <Typography sx={{ color: course.isMandatory ? 'error.main' : 'info.main', fontWeight: 'bold' }}>
                      {course.isMandatory ? 'כן' : 'לא'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ color: course.isActive ? 'success.main' : 'text.secondary', fontWeight: 'bold' }}>
                      {course.isActive ? 'כן' : 'לא'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton color="primary" size="small" onClick={() => handleEditCourse(course.id)} title="ערוך קורס">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small" onClick={() => handleDeleteCourse(course.id, course.name)} title="מחק קורס">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default CourseList;