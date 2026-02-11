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
import type { Article } from "../models/Home";

const COLLECTION_NAME = "articles";

// Converter class
class ArticleConverter implements FirestoreDataConverter<Article> {
  toFirestore(article: WithFieldValue<Article>): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = article as Article;
    return data;
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Article {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as Article;
  }
}

const articleConverter = new ArticleConverter();

//שליפת כל המאמרים
export async function getAllArticles(): Promise<Article[]> {
  const articlesSnapshot = await getDocs(
    collection(firestore, COLLECTION_NAME).withConverter(articleConverter)
  );
  return articlesSnapshot.docs.map((doc) => doc.data());
}

//שליפת מאמר בודד
export async function getArticle(id: string): Promise<Article | null> {
  const articleDocRef = doc(firestore, COLLECTION_NAME, id).withConverter(
    articleConverter
  );
  const docSnap = await getDoc(articleDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

//הוספת מאמר חדש
export async function addArticle(
  article: Omit<Article, "id">
): Promise<string> {
  const articlesCollection = collection(
    firestore,
    COLLECTION_NAME
  ).withConverter(articleConverter);
  const docRef = await addDoc(articlesCollection, article as Article);
  return docRef.id;
}


//עדכון מאמר
 
export async function updateArticle(article: Article): Promise<void> {
  const articleDocRef = doc(
    firestore,
    COLLECTION_NAME,
    article.id
  ).withConverter(articleConverter);
  await setDoc(articleDocRef, article);
}


 //מחיקת מאמר

export async function deleteArticle(id: string): Promise<void> {
  const articleDoc = doc(firestore, COLLECTION_NAME, id);
  await deleteDoc(articleDoc);
}
