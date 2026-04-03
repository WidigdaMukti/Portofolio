export type ContentType = 'blog' | 'portofolio';

export interface ContentData {
  id: string;
  thumbnail: string;
  title: string;
  slug: string;
  subtitle?: string;
  category: string;
  content: string;
  status: "Published" | "Draft";
  views: number;
  likes: number;
  shares: number;
  date: string;
}