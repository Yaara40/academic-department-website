export class Course {
  id: string;              // Firestore ID
  courseId: string;        // קוד הקורס (93102)
  name: string;            // שם הקורס
  credits: number;         // נקודות זכות
  semester: string;        // סמסטר
  year?: string;           // שנה
  description?: string;    // תיאור
  syllabus?: string;       // סילבוס
  isMandatory?: boolean;   // שינינו מ-string ל-boolean
  isActive?: boolean;      // שינינו מ-string ל-boolean
  instructor?: string;     // הוספנו מרצה (כמו בפיירבייס)

  constructor(
    id: string,
    courseId: string,
    name: string,
    credits: number,
    semester: string,
    year?: string,
    description?: string,
    syllabus?: string,
    isMandatory?: boolean,
    isActive?: boolean,
    instructor?: string
  ) {
    this.id = id;
    this.courseId = courseId;
    this.name = name;
    this.credits = credits;
    this.semester = semester;
    this.year = year;
    this.description = description;
    this.syllabus = syllabus;
    this.isMandatory = isMandatory;
    this.isActive = isActive;
    this.instructor = instructor;
  }
}