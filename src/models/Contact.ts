export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  submissionDate: string;
  status: "חדש" | "ממתין" | "נוצר קשר" | "נסגר";
  source: string;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  enabled: boolean;
}