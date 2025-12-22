export type GrowthCategory =
  | "לימודים מתקדמים"
  | "יזמות"
  | "קריירה בהייטק"
  | "מחקר"
  | "ניהול"
  | "קריירה בינלאומית";

export interface GrowthOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  category?: GrowthCategory;
}

export interface CareerTrack {
  id: string;
  role: string;
  salaryRange: string;
  demand: "גבוה מאוד" | "גבוה";
}