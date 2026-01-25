import { doc, getDoc, setDoc, QueryDocumentSnapshot } from "firebase/firestore";
import type {
  FirestoreDataConverter,
  SnapshotOptions,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "./config";

// שם ה-Collection וה-Document ID
const COLLECTION_NAME = "siteSettings";
const DOCUMENT_ID = "growthOptions";

export interface GrowthOptions {
  pageTitle: string;
  pageDescription: string;
}

// Converter class
class GrowthOptionsConverter implements FirestoreDataConverter<GrowthOptions> {
  toFirestore(data: WithFieldValue<GrowthOptions>): DocumentData {
    return { ...data };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): GrowthOptions {
    const data = snapshot.data(options);
    return data as GrowthOptions;
  }
}

const growthOptionsConverter = new GrowthOptionsConverter();

/**
 * שליפת כותרת ותיאור דף הצמיחה מ-Firestore
 */
export async function getGrowthOptions(): Promise<GrowthOptions | null> {
  const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID).withConverter(
    growthOptionsConverter
  );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

/**
 * שמירת כותרת ותיאור דף הצמיחה ל-Firestore
 */
export async function saveGrowthOptions(data: GrowthOptions): Promise<void> {
  const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID).withConverter(
    growthOptionsConverter
  );
  await setDoc(docRef, data);
}
