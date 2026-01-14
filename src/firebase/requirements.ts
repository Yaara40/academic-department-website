import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "./config";
import type { Requirement } from "../models/Home";

const COLLECTION_NAME = "requirements";

/**
 * שליפת כל הדרישות
 */
export async function getAllRequirements(): Promise<Requirement[]> {
  try {
    const requirementsCollection = collection(firestore, COLLECTION_NAME);
    const requirementsSnapshot = await getDocs(requirementsCollection);
    return requirementsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Requirement[];
  } catch (error) {
    console.error("Error getting requirements:", error);
    throw error;
  }
}

/**
 * הוספת דרישה חדשה
 */
export async function addRequirement(
  requirement: Omit<Requirement, "id">
): Promise<string> {
  try {
    const requirementsCollection = collection(firestore, COLLECTION_NAME);
    const docRef = await addDoc(requirementsCollection, requirement);
    return docRef.id;
  } catch (error) {
    console.error("Error adding requirement:", error);
    throw error;
  }
}

/**
 * עדכון דרישה
 */
export async function updateRequirement(
  id: string,
  requirement: Partial<Requirement>
): Promise<void> {
  try {
    const requirementDoc = doc(firestore, COLLECTION_NAME, id);
    await updateDoc(requirementDoc, requirement);
  } catch (error) {
    console.error("Error updating requirement:", error);
    throw error;
  }
}

/**
 * מחיקת דרישה
 */
export async function deleteRequirement(id: string): Promise<void> {
  try {
    const requirementDoc = doc(firestore, COLLECTION_NAME, id);
    await deleteDoc(requirementDoc);
  } catch (error) {
    console.error("Error deleting requirement:", error);
    throw error;
  }
}
