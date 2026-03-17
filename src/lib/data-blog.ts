// src/lib/data-blog.ts

export type Blog = {
  id: string;
  thumbnail: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  status: "Published" | "Draft";
  views: number;
  likes: number;
  shares: number;
  date: string;
};

export const blogData: Blog[] = [
  {
    id: "1",
    thumbnail: "/thumnail.png",
    title: "Membangun Portofolio Modern dengan Astro dan React untuk Content Management System",
    slug: "membangun-portofolio-modern-astro-react",
    category: "Development",
    content: "Astro adalah framework web yang dirancang untuk kecepatan... (isi konten di sini)",
    status: "Published",
    views: 1250,
    likes: 450,
    shares: 120,
    date: "12 Mar 2026",
  },
  {
    id: "2",
    thumbnail: "/thumnail.png",
    title: "Tips UI/UX: Mengapa Padding Lebih Penting dari Warna",
    slug: "tips-ui-ux-pentingnya-padding",
    category: "UI/UX Design",
    content: "Dalam dunia desain, whitespace atau negatif space bukanlah ruang kosong biasa...",
    status: "Draft",
    views: 0,
    likes: 0,
    shares: 0,
    date: "10 Mar 2026",
  },
  {
    id: "3",
    thumbnail: "/thumnail.png",
    title: "Integrasi Supabase Auth ke dalam Project Astro",
    slug: "integrasi-supabase-auth-astro",
    category: "Development",
    content: "Supabase memberikan kemudahan dalam manajemen database dan auth...",
    status: "Published",
    views: 850,
    likes: 230,
    shares: 45,
    date: "05 Mar 2026",
  },
  {
    id: "4",
    thumbnail: "/thumnail.png",
    title: "Panduan Belajar TypeScript untuk Pemula di 2026",
    slug: "panduan-belajar-typescript-2026",
    category: "Technology",
    content: "TypeScript adalah superset dari JavaScript yang menambahkan static typing...",
    status: "Published",
    views: 3420,
    likes: 890,
    shares: 310,
    date: "01 Mar 2026",
  },
  {
    id: "5",
    thumbnail: "/thumnail.png",
    title: "Optimasi SEO pada Website Single Page Application",
    slug: "optimasi-seo-spa",
    category: "Technology",
    content: "Banyak tantangan SEO yang muncul saat kita menggunakan framework modern...",
    status: "Draft",
    views: 12,
    likes: 2,
    shares: 0,
    date: "28 Feb 2026",
  },
];