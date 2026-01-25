import { doc, getDoc, setDoc, QueryDocumentSnapshot } from "firebase/firestore";
import type {
  FirestoreDataConverter,
  SnapshotOptions,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "./config";
import type { Contact } from "../models/Home";

// שם ה-Collection וה-Document ID
const COLLECTION_NAME = "contactInfo";
const DOCUMENT_ID = "contactInfo";

// Converter class
class ContactConverter implements FirestoreDataConverter<Contact> {
  toFirestore(data: WithFieldValue<Contact>): DocumentData {
    return { ...data };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Contact {
    const data = snapshot.data(options);
    return data as Contact;
  }
}

const contactConverter = new ContactConverter();

/**
 * שליפת פרטי התקשרות מ-Firestore
 */
export async function getContactInfo(): Promise<Contact | null> {
  const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID).withConverter(
    contactConverter
  );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

/**
 * שמירת פרטי התקשרות ל-Firestore
 */
export async function saveContactInfo(contactInfo: Contact): Promise<void> {
  const docRef = doc(firestore, COLLECTION_NAME, DOCUMENT_ID).withConverter(
    contactConverter
  );
  await setDoc(docRef, contactInfo);
}
