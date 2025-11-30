import { useState, useEffect } from 'react';
import { Course } from '../models/Course';

function CourseList() {
  // 1. State - מערך ריק
  const [courses, setCourses] = useState<Course[]>([]);

  // 3. useEffect - טעינה מ-localStorage
  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem('courses');
      if (saved) {
        const data = JSON.parse(saved);
        setCourses(data);
      }
    };
    
    loadData();
  }, []);

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

  // 5. שמירה ל-localStorage
  function saveToLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(courses));
    alert('נשמר!');
  }

  // 2. טבלה
  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      <h2>קורסים</h2>
      
      <button onClick={addRandomCourse}>הוסף קורס</button>
      <button onClick={saveToLocalStorage}>שמור</button>
      
      <table border={1} style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>שם</th>
            <th>נ"ז</th>
            <th>סמסטר</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.credits}</td>
              <td>{course.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;