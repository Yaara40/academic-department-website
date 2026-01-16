import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { firestore } from "./config";
import { Course } from "../models/Course";

// Converter class (לפי המצגת - עמוד 41)
class CourseConverter implements FirestoreDataConverter<Course> {
  toFirestore(course: WithFieldValue<Course>): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = course as Course;
    return data;
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Course {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as Course;
  }
}

const courseConverter = new CourseConverter();

// קבלת כל הקורסים
export async function getAllCourses(): Promise<Course[]> {
  const coursesSnapshot = await getDocs(
    collection(firestore, "courses").withConverter(courseConverter)
  );
  return coursesSnapshot.docs.map((doc) => doc.data());
}

// קבלת קורס בודד
export async function getCourse(id: string): Promise<Course | null> {
  const courseDocRef = doc(firestore, "courses", id).withConverter(
    courseConverter
  );
  const docSnap = await getDoc(courseDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

// הוספת קורס חדש
export async function addCourse(course: Omit<Course, "id">): Promise<string> {
  const coursesCollection = collection(firestore, "courses").withConverter(
    courseConverter
  );
  const docRef = await addDoc(coursesCollection, course as Course);
  return docRef.id;
}

// עדכון קורס
export async function updateCourse(course: Course): Promise<void> {
  const courseDocRef = doc(firestore, "courses", course.id).withConverter(
    courseConverter
  );
  await setDoc(courseDocRef, course);
}

// מחיקת קורס
export async function deleteCourse(id: string): Promise<void> {
  const courseDoc = doc(firestore, "courses", id);
  await deleteDoc(courseDoc);
}
