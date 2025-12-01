import { useState } from "react";

type Course = {
  id: number;
  name: string;
  points: number;
};

const STORAGE_KEY = "courses"; // זה המפתח ל-localStorage (סעיף 3 במטלה)

const CourseList = () => {
  // המערך של האובייקטים – ה-state
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "מבוא למדעי המחשב", points: 4 },
    { id: 2, name: "מבני נתונים", points: 4 },
    { id: 3, name: "אלגוריתמים", points: 4 },
  ]);

  // פונקציה שתופעל בלחיצה על הכפתור
  const handleSaveToLocalStorage = () => {
    // 1. לוקחים את הנתונים העדכניים מה-state
    const json = JSON.stringify(courses); // 2. ממירים ל-JSON (stringify)

    // 3. שומרים את מחרוזת ה-JSON ב-localStorage תחת אותו מפתח
    localStorage.setItem(STORAGE_KEY, json);
  };

  return (
    <section>
      <h2>רשימת קורסים</h2>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name} – {course.points} נקודות
          </li>
        ))}
      </ul>

      {/* הכפתור של המטלה */}
      <button onClick={handleSaveToLocalStorage}>
        שמירת הנתונים ל-localStorage
      </button>
    </section>
  );
};

export default CourseList;
