import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import type {
  FirestoreDataConverter,
  SnapshotOptions,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "./config";
import type { Requirement } from "../models/Home";

const COLLECTION_NAME = "requirements";

// Converter class
class RequirementConverter implements FirestoreDataConverter<Requirement> {
  toFirestore(requirement: WithFieldValue<Requirement>): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = requirement as Requirement;
    return data;
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Requirement {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as Requirement;
  }
}

const requirementConverter = new RequirementConverter();

/**
 * שליפת כל הדרישות
 */
export async function getAllRequirements(): Promise<Requirement[]> {
  const requirementsSnapshot = await getDocs(
    collection(firestore, COLLECTION_NAME).withConverter(requirementConverter)
  );
  return requirementsSnapshot.docs.map((doc) => doc.data());
}

/**
 * שליפת דרישה בודדת
 */
export async function getRequirement(id: string): Promise<Requirement | null> {
  const requirementDocRef = doc(firestore, COLLECTION_NAME, id).withConverter(
    requirementConverter
  );
  const docSnap = await getDoc(requirementDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

/**
 * הוספת דרישה חדשה
 */
export async function addRequirement(
  requirement: Omit<Requirement, "id">
): Promise<string> {
  const requirementsCollection = collection(
    firestore,
    COLLECTION_NAME
  ).withConverter(requirementConverter);
  const docRef = await addDoc(
    requirementsCollection,
    requirement as Requirement
  );
  return docRef.id;
}

/**
 * עדכון דרישה
 */
export async function updateRequirement(
  requirement: Requirement
): Promise<void> {
  const requirementDocRef = doc(
    firestore,
    COLLECTION_NAME,
    requirement.id
  ).withConverter(requirementConverter);
  await setDoc(requirementDocRef, requirement);
}

/**
 * מחיקת דרישה
 */
export async function deleteRequirement(id: string): Promise<void> {
  const requirementDoc = doc(firestore, COLLECTION_NAME, id);
  await deleteDoc(requirementDoc);
}
