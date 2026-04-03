// src/lib/data-blog.ts

export type Blog = {
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
};

export const blogData: Blog[] = [
  {
    id: "1",
    thumbnail: "/thumnail.png",
    title: "Membangun Portofolio Modern dengan Astro dan React untuk Content Management System",
    slug: "membangun-portofolio-modern-astro-react",
    subtitle: "Cara mudah dan cepat membuat web super kencang dengan Astro.",
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
    subtitle: "Pahami pentingnya whitespace untuk desain yang nyaman di mata pengunjung.",
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
    subtitle: "Mengenal flow autentikasi modern menggunakan Supabase dan framework Astro.",
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
    subtitle: "Mengapa TypeScript menjadi standar industri baru dan bagaimana mempelajarinya.",
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
    subtitle: "Teknik terbaik mengatasi masalah indexabilitas pada Single Page Application.",
    category: "Technology",
    content: "Banyak tantangan SEO yang muncul saat kita menggunakan framework modern...",
    status: "Draft",
    views: 12,
    likes: 2,
    shares: 0,
    date: "28 Feb 2026",
  },
  {
    id: "6",
    thumbnail: "/thumnail.png",
    title: "Membangun Sistem Design Tokens Lanjutan",
    slug: "design-tokens-lanjutan",
    subtitle: "Menggunakan TailwindCSS untuk skala warna yang konsisten di semua platform.",
    category: "Design",
    content: "Design tokens adalah inti dari setiap design system yang tangguh...",
    status: "Published",
    views: 4500,
    likes: 1200,
    shares: 450,
    date: "14 Nov 2025",
  },
  {
    id: "7",
    thumbnail: "/thumnail.png",
    title: "Manajemen State di React: Redux vs Zustand",
    slug: "state-management-react",
    subtitle: "Kapan harus memilih library state management yang tepat untuk project Anda.",
    category: "Development",
    content: "Seiring bertambah besarnya kompleksitas aplikasi React, kebutuhan manajemen state terpusat tidak bisa dihindari...",
    status: "Published",
    views: 890,
    likes: 115,
    shares: 20,
    date: "02 Sep 2025",
  },
];