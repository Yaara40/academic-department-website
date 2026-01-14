import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "./config";
import type { Testimonial } from "../models/Home";

const COLLECTION_NAME = "testimonials";

/**
 * שליפת כל ההמלצות
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonialsCollection = collection(firestore, COLLECTION_NAME);
    const testimonialsSnapshot = await getDocs(testimonialsCollection);
    return testimonialsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error("Error getting testimonials:", error);
    throw error;
  }
}

/**
 * הוספת המלצה חדשה
 */
export async function addTestimonial(
  testimonial: Omit<Testimonial, "id">
): Promise<string> {
  try {
    const testimonialsCollection = collection(firestore, COLLECTION_NAME);
    const docRef = await addDoc(testimonialsCollection, testimonial);
    return docRef.id;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw error;
  }
}

/**
 * עדכון המלצה
 */
export async function updateTestimonial(
  id: string,
  testimonial: Partial<Testimonial>
): Promise<void> {
  try {
    const testimonialDoc = doc(firestore, COLLECTION_NAME, id);
    await updateDoc(testimonialDoc, testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
}

/**
 * מחיקת המלצה
 */
export async function deleteTestimonial(id: string): Promise<void> {
  try {
    const testimonialDoc = doc(firestore, COLLECTION_NAME, id);
    await deleteDoc(testimonialDoc);
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
}
