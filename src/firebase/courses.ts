import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
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

// Converter for Firestore
const courseConverter: FirestoreDataConverter<Course> = {
  toFirestore(course: WithFieldValue<Course>): DocumentData {
    return { ...course };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Course {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as Course;
  },
};

// קבלת כל הקורסים
export async function getAllCourses(): Promise<Course[]> {
  try {
    const coursesCollection = collection(firestore, "courses").withConverter(
      courseConverter
    );
    const snapshot = await getDocs(coursesCollection);
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error getting courses:", error);
    throw error;
  }
}

// הוספת קורס חדש
export async function addCourse(course: Omit<Course, "id">): Promise<string> {
  try {
    const coursesCollection = collection(firestore, "courses");
    const docRef = await addDoc(coursesCollection, course);
    return docRef.id;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
}

// עדכון קורס
export async function updateCourse(
  id: string,
  updates: Partial<Omit<Course, "id">>
): Promise<void> {
  try {
    const courseDoc = doc(firestore, "courses", id);
    await updateDoc(courseDoc, updates);
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}

// מחיקת קורס
export async function deleteCourse(id: string): Promise<void> {
  try {
    const courseDoc = doc(firestore, "courses", id);
    await deleteDoc(courseDoc);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}
