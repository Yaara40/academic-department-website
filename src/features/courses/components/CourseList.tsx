import { useState, useEffect } from 'react';
import { Course } from '../models/Course';

function CourseList() {
  // 1. State - מערך של קורסים
  const [courses, setCourses] = useState<Course[]>([]);

  // 3. useEffect - טעינה מ-localStorage
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

  // 6. שמירה אוטומטית ל-localStorage בכל שינוי
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  }, [courses]);

  // 4. הוספת קורס אקראי
  function addRandomCourse() {
    const names = ['מבוא למחשבים', 'אלגוריתמים', 'מבני נתונים'];
    const semesters = ['א', 'ב', 'קיץ'];

    const newCourse = new Course(
      Date.now().toString(),
      names[Math.floor(Math.random() * names.length)],
      Math.floor(Math.random() * 5) + 3,
      semesters[Math.floor(Math.random() * semesters.length)]
    );

    setCourses([...courses, newCourse]);
  }

  // 9. שמירה ידנית ל-localStorage
  function saveToLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(courses));
    alert('נשמר!');
  }

  // 2. הצגת הטבלה
  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      <h2>קורסים</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={addRandomCourse}>
          הוסף קורס אקראי
        </button>
        <button onClick={saveToLocalStorage}>
          שמור ל-LocalStorage
        </button>
      </div>
      
      <table 
        border={1} 
        style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          textAlign: 'center'
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>שם</th>
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>נ"ז</th>
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>סמסטר</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td style={{ padding: '10px' }}>{course.name}</td>
              <td style={{ padding: '10px' }}>{course.credits}</td>
              <td style={{ padding: '10px' }}>{course.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;