export interface Requirement {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  color: string;
}

export interface Article {
  id: string;
  title: string;
  imageUrl: string;
  articleUrl: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  initial: string;
  color: string;
}

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  sources: string[];
  submissionDate: string;
  status: "חדש" | "ממתין" | "נוצר קשר" | "נסגר";
};
