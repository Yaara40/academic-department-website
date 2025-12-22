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

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}