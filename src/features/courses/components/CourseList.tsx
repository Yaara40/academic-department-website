import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../../models/Course';
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
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

function CourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);

  // טעינת נתונים מ-LocalStorage בעת טעינת הקומפוננטה
  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('courses');
      if (saved) {
        const data = JSON.parse(saved);
        setCourses(data);
      }
    };
    loadData();
  }, []);

  // שמירה אוטומטית ל-LocalStorage כאשר הקורסים משתנים
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  }, [courses]);

  // חישוב סטטיסטיקות
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.isActive === 'yes').length;
  const mandatoryCourses = courses.filter(c => c.isMandatory === 'yes').length;
  const electiveCourses = courses.filter(c => c.isMandatory === 'no').length;

  // פונקציה להוספת קורס אקראי
  function addRandomCourse() {
    const names = [
      'מבוא למחשבים',
      'אלגוריתמים',
      'מבני נתונים',
      'תכנות מונחה עצמים',
      'מערכות הפעלה',
      'רשתות מחשבים',
      'בסיסי נתונים',
      'בינה מלאכותית',
      'למידת מכונה',
      'אבטחת מידע',
      'פיתוח אפליקציות Web',
      'הנדסת תוכנה',
      'חישוביות ומורכבות',
      'גרפיקה ממוחשבת',
      'עיבוד שפה טבעית'
    ];
    const semesters = ['א', 'ב', 'קיץ'];

    const newCourse = new Course(
      Date.now().toString(),
      names[Math.floor(Math.random() * names.length)],
      Math.floor(Math.random() * 5) + 3,
      semesters[Math.floor(Math.random() * semesters.length)]
    );

    setCourses([...courses, newCourse]);
  }

  // פונקציה לשמירה ידנית ל-LocalStorage
  function saveToLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(courses));
    alert('נשמר בהצלחה!');
  }

  // פונקציה לניווט לטופס הוספת קורס חדש
  function navigateToNewCourse() {
    navigate('/courses/new');
  }

  return (
    <Box sx={{ padding: 2, direction: 'rtl' }}>
      {/* כותרת */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        ניהול קורסים
      </Typography>

      {/* כרטיסי סטטיסטיקה */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4 
      }}>
        {/* סה"כ קורסים */}
        <Card sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
              {totalCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              סה"כ קורסים
            </Typography>
          </CardContent>
        </Card>

        {/* קורסים פעילים */}
        <Card sx={{ textAlign: 'center', backgroundColor: '#e8f5e9' }}>
          <CardContent>
            <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>
              {activeCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              קורסים פעילים
            </Typography>
          </CardContent>
        </Card>

        {/* קורסי חובה */}
        <Card sx={{ textAlign: 'center', backgroundColor: '#fff3e0' }}>
          <CardContent>
            <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>
              {mandatoryCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              קורסי חובה
            </Typography>
          </CardContent>
        </Card>

        {/* קורסי בחירה */}
        <Card sx={{ textAlign: 'center', backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <Typography variant="h3" color="info.main" sx={{ fontWeight: 'bold' }}>
              {electiveCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              קורסי בחירה
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* כפתורים */}
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

        <Button 
          variant="contained" 
          color="secondary"
          startIcon={<AddIcon />}
          onClick={addRandomCourse}
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
        >
          הוסף קורס אקראי
        </Button>

        <Button 
          variant="outlined" 
          color="success"
          startIcon={<SaveIcon />}
          onClick={saveToLocalStorage}
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
        >
          שמור ל-LocalStorage
        </Button>
      </Box>

      {/* טבלת הקורסים */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>שם</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>נ"ז</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>סמסטר</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell align="center">{course.name}</TableCell>
                <TableCell align="center">{course.credits}</TableCell>
                <TableCell align="center">{course.semester}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CourseList;