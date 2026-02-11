import { doc, getDoc, setDoc, QueryDocumentSnapshot } from "firebase/firestore";
import type {
  FirestoreDataConverter,
  SnapshotOptions,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "./config";

const COLLECTION_NAME = "siteSettings";
const DOCUMENT_ID = "growthOptions";

export interface GrowthOptions {
  pageTitle: string;
  pageDescription: string;
}

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

export async function saveGrowthOptions(data: GrowthOptions): Promise<void> {
  const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID).withConverter(
    growthOptionsConverter
  );
  await setDoc(docRef, data);
}
