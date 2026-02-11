import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "./config";
import { Course } from "../models/Course";

//הוספת קורס חדש
export async function addCourse(course: Course): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...courseData } = course; // מסירים את ה-id
    await addDoc(collection(firestore, "courses"), courseData);
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
}

//קבלת כל הקורסים
export async function getAllCourses(): Promise<Course[]> {
  try {
    const querySnapshot = await getDocs(collection(firestore, "courses"));
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Course,
    );
  } catch (error) {
    console.error("Error getting courses:", error);
    throw error;
  }
}

//קבלת קורס לפי ID
export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const docRef = doc(firestore, "courses", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Course;
    }
    return null;
  } catch (error) {
    console.error("Error getting course:", error);
    throw error;
  }
}

//עדכון קורס
export async function updateCourse(id: string, course: Course): Promise<void> {
  try {
    const docRef = doc(firestore, "courses", id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...courseData } = course; // מסירים את ה-id
    await updateDoc(docRef, courseData);
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}

//מחיקת קורס
export async function deleteCourse(id: string): Promise<void> {
  try {
    const docRef = doc(firestore, "courses", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}
