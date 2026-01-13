import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./config";
import type { ContactInfo } from "../models/Home";

// שם ה-Collection וה-Document ID
const COLLECTION_NAME = "contactInfo";
const DOCUMENT_ID = "contactInfo";

/**
 * שליפת פרטי התקשרות מ-Firestore
 */
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as ContactInfo;
    }
    return null;
  } catch (error) {
    console.error("Error getting contact info:", error);
    throw error;
  }
}

/**
 * שמירת פרטי התקשרות ל-Firestore
 */
export async function saveContactInfo(contactInfo: ContactInfo): Promise<void> {
  try {
    const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID);
    await setDoc(docRef, contactInfo);
  } catch (error) {
    console.error("Error saving contact info:", error);
    throw error;
  }
}
