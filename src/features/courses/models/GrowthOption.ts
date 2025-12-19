export type GrowthCategory =
  | "לימודים מתקדמים"
  | "יזמות"
  | "קריירה בהייטק";

export interface GrowthOption {
  id: string;
  title: string;
  description: string;
  category: GrowthCategory;
  icon?: string;
}
