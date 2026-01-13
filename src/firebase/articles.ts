import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "./config";
import type { Article } from "../models/Home";

const COLLECTION_NAME = "articles";

/**
 * שליפת כל המאמרים
 */
export async function getAllArticles(): Promise<Article[]> {
  try {
    const articlesCollection = collection(firestore, COLLECTION_NAME);
    const articlesSnapshot = await getDocs(articlesCollection);
    return articlesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Article[];
  } catch (error) {
    console.error("Error getting articles:", error);
    throw error;
  }
}

/**
 * הוספת מאמר חדש
 */
export async function addArticle(
  article: Omit<Article, "id">
): Promise<string> {
  try {
    const articlesCollection = collection(firestore, COLLECTION_NAME);
    const docRef = await addDoc(articlesCollection, article);
    return docRef.id;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
}

/**
 * עדכון מאמר
 */
export async function updateArticle(
  id: string,
  article: Partial<Article>
): Promise<void> {
  try {
    const articleDoc = doc(firestore, COLLECTION_NAME, id);
    await updateDoc(articleDoc, article);
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
}

/**
 * מחיקת מאמר
 */
export async function deleteArticle(id: string): Promise<void> {
  try {
    const articleDoc = doc(firestore, COLLECTION_NAME, id);
    await deleteDoc(articleDoc);
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}
