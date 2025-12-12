import { useState, useEffect } from 'react';
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
  const [courses, setCourses] = useState<Course[]>([]);

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

  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  }, [courses]);

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

  function saveToLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(courses));
    alert('נשמר!');
  }

  return (
    <Box sx={{ padding: 2, direction: 'rtl' }}>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={addRandomCourse}
        >
          הוסף קורס אקראי
        </Button>
        
        <Button 
          variant="outlined" 
          color="success"
          startIcon={<SaveIcon />}
          onClick={saveToLocalStorage}
        >
          שמור ל-LocalStorage
        </Button>
      </Box>
      
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