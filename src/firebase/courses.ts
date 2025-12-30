import { 
  addDoc, 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc
} from "firebase/firestore";
import type { 
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue
} from "firebase/firestore";
import { firestore } from "./config";
import { Course } from "../models/Course";

// ========================================
// CONVERTER - ממיר בין Course ל-Firestore
// ========================================
class CourseConverter implements FirestoreDataConverter<Course> {
  // פונקציה שהופכת Course לפורמט של Firestore
  toFirestore(course: WithFieldValue<Course>): DocumentData {
    return {
      courseId: course.courseId,
      name: course.name,
      credits: course.credits,
      semester: course.semester,
      year: course.year || "",
      description: course.description || "",
      syllabus: course.syllabus || "",
      isMandatory: course.isMandatory || false,
      isActive: course.isActive || true,
      instructor: course.instructor || ""
    };
  }

  // פונקציה שהופכת מסמך מ-Firestore ל-Course
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Course {
    const data = snapshot.data(options);
    return new Course(
      snapshot.id,              // Firestore ID
      data.courseId,            // קוד הקורס
      data.name,
      data.credits,
      data.semester,
      data.year,
      data.description,
      data.syllabus,
      data.isMandatory,
      data.isActive,
      data.instructor
    );
  }
}

// ========================================
// הפונקציות לעבודה עם FIRESTORE
// ========================================

// 📝 הוספת קורס חדש
export async function addCourse(course: Course): Promise<void> {
  const courseCollection = collection(firestore, "courses")
    .withConverter(new CourseConverter());
  
  await addDoc(courseCollection, course);
}

// 📋 קבלת כל הקורסים
export async function listCourses(): Promise<Course[]> {
  const coursesSnapshot = await getDocs(
    collection(firestore, "courses").withConverter(new CourseConverter())
  );
  
  return coursesSnapshot.docs.map(doc => doc.data());
}

// ✏️ עדכון קורס קיים
export async function updateCourse(course: Course): Promise<void> {
  const courseDoc = doc(firestore, "courses", course.id)
    .withConverter(new CourseConverter());
  
  await updateDoc(courseDoc, {
    courseId: course.courseId,
    name: course.name,
    credits: course.credits,
    semester: course.semester,
    year: course.year,
    description: course.description,
    syllabus: course.syllabus,
    isMandatory: course.isMandatory,
    isActive: course.isActive,
    instructor: course.instructor
  });
}

// 🗑️ מחיקת קורס
export async function deleteCourse(courseId: string): Promise<void> {
  const courseDoc = doc(firestore, "courses", courseId);
  await deleteDoc(courseDoc);
}