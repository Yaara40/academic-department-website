import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../models/Course';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
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
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        {/* כפתור להוספת קורס חדש ידנית */}
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={navigateToNewCourse}
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
        >
          הוסף קורס חדש
        </Button>

        {/* כפתור להוספת קורס אקראי */}
        <Button 
          variant="contained" 
          color="secondary"
          startIcon={<AddIcon />}
          onClick={addRandomCourse}
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
        >
          הוסף קורס אקראי
        </Button>

        {/* כפתור לשמירה ידנית */}
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