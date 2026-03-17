export type Portofolio = {
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

export const portoData: Portofolio[] = [
  {
    id: "1",
    thumbnail: "/thumnail.png",
    title: "DAPRA - Mobile App Cleaning Service & Home Care",
    slug: "dapra-cleaning-service-app",
    category: "UI/UX Design",
    content: "Membangun sistem pemesanan jasa kebersihan rumah yang terintegrasi dengan pelacakan tenaga kerja secara real-time. Fokus pada kemudahan UI/UX untuk pengguna rumah tangga.",
    status: "Draft",
    views: 2450,
    likes: 520,
    shares: 85,
    date: "12 Mar 2026",
  },
  {
    id: "2",
    thumbnail: "/thumnail.png",
    title: "Redesain Website NORE Digital Agency",
    slug: "nore-digital-agency-redesign",
    category: "UI/UX Design",
    content: "Melakukan perombakan total pada struktur informasi dan tampilan visual website agensi digital untuk meningkatkan conversion rate dan brand awareness.",
    status: "Published",
    views: 1820,
    likes: 340,
    shares: 42,
    date: "05 Mar 2026",
  },
  {
    id: "3",
    thumbnail: "/thumnail.png",
    title: "Sistem Manajemen Grade & Penjualan Sarang Burung Walet",
    slug: "swiftlet-nest-grading-system",
    category: "UI/UX Design",
    content: "Aplikasi mobile untuk mengelola klasifikasi kualitas (grading) sarang burung walet secara digital, memudahkan proses kontrol stok dan transaksi penjualan.",
    status: "Draft",
    views: 980,
    likes: 150,
    shares: 28,
    date: "28 Feb 2026",
  },
  {
    id: "4",
    thumbnail: "/thumnail.png",
    title: "Dashboard Monitoring & Kontrol Pompa Air Gedung",
    slug: "building-water-pump-monitoring",
    category: "UI/UX Design",
    content: "Perancangan antarmuka monitoring sistem pompa air gedung berbasis IoT untuk memantau performa mesin dan penggunaan air secara efisien.",
    status: "Published",
    views: 1100,
    likes: 210,
    shares: 15,
    date: "20 Feb 2026",
  },
  {
    id: "5",
    thumbnail: "/thumnail.png",
    title: "Modern Minimalist Personal Portfolio Website",
    slug: "modern-minimalist-portfolio-website",
    category: "UI/UX Design",
    content: "Website portofolio pribadi yang dibangun menggunakan Astro dan React. Menampilkan proyek desain dan pengembangan web dengan performa tinggi dan desain bersih.",
    status: "Draft",
    views: 4200,
    likes: 890,
    shares: 320,
    date: "15 Feb 2026",
  },
];