import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./config";

// שם ה-Collection וה-Document ID
const COLLECTION_NAME = "siteSettings";
const DOCUMENT_ID = "growthOptions";

export interface GrowthOptions {
  pageTitle: string;
  pageDescription: string;
}

/**
 * שליפת כותרת ותיאור דף הצמיחה מ-Firestore
 */
export async function getGrowthOptions(): Promise<GrowthOptions | null> {
  try {
    const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as GrowthOptions;
    }
    return null;
  } catch (error) {
    console.error("Error getting growth options:", error);
    throw error;
  }
}

/**
 * שמירת כותרת ותיאור דף הצמיחה ל-Firestore
 */
export async function saveGrowthOptions(data: GrowthOptions): Promise<void> {
  try {
    const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID);
    await setDoc(docRef, data);
  } catch (error) {
    console.error("Error saving growth options:", error);
    throw error;
  }
}
