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
import type { Testimonial } from "../models/Home";

const COLLECTION_NAME = "testimonials";

class TestimonialConverter implements FirestoreDataConverter<Testimonial> {
  toFirestore(testimonial: WithFieldValue<Testimonial>): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = testimonial as Testimonial;
    return data;
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Testimonial {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as Testimonial;
  }
}

const testimonialConverter = new TestimonialConverter();

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const testimonialsSnapshot = await getDocs(
    collection(firestore, COLLECTION_NAME).withConverter(testimonialConverter)
  );
  return testimonialsSnapshot.docs.map((doc) => doc.data());
}

export async function getTestimonial(id: string): Promise<Testimonial | null> {
  const testimonialDocRef = doc(firestore, COLLECTION_NAME, id).withConverter(
    testimonialConverter
  );
  const docSnap = await getDoc(testimonialDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

export async function addTestimonial(
  testimonial: Omit<Testimonial, "id">
): Promise<string> {
  const testimonialsCollection = collection(
    firestore,
    COLLECTION_NAME
  ).withConverter(testimonialConverter);
  const docRef = await addDoc(
    testimonialsCollection,
    testimonial as Testimonial
  );
  return docRef.id;
}

export async function updateTestimonial(
  testimonial: Testimonial
): Promise<void> {
  const testimonialDocRef = doc(
    firestore,
    COLLECTION_NAME,
    testimonial.id
  ).withConverter(testimonialConverter);
  await setDoc(testimonialDocRef, testimonial);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const testimonialDoc = doc(firestore, COLLECTION_NAME, id);
  await deleteDoc(testimonialDoc);
}
