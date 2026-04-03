export type Portofolio = {
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

export const portoData: Portofolio[] = [
  {
    id: "1",
    thumbnail: "/thumnail.png",
    title: "DAPRA - Mobile App Cleaning Service & Home Care",
    slug: "dapra-cleaning-service-app",
    subtitle: "Revolusi pemesanan jasa kebersihan berbasis mobile dengan pelacakan tenaga kerja.",
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
    subtitle: "Transformasi visual website web agensi untuk menunjang performa bisnis.",
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
    subtitle: "Digitalisasi sistem kontrol stok dan penjualan grade kualitas walet secara tepat.",
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
    subtitle: "Dashboard monitoring IoT untuk pemantauan cerdas sistem tata air gedung.",
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
    subtitle: "Desain portofolio minimalis nan elegan yang dibangun dengan Astro & React modern.",
    category: "UI/UX Design",
    content: "Website portofolio pribadi yang dibangun menggunakan Astro dan React. Menampilkan proyek desain dan pengembangan web dengan performa tinggi dan desain bersih.",
    status: "Draft",
    views: 4200,
    likes: 890,
    shares: 320,
    date: "15 Feb 2026",
  },
  {
    id: "6",
    thumbnail: "/thumnail.png",
    title: "Eco-Friendly E-Commerce Storefront Redesign",
    slug: "eco-store-redesign",
    subtitle: "A sustainable fashion brand's digital presence refresh.",
    category: "Fullstack Development",
    content: "Building a headless e-commerce store focused on smooth checkout flows and modern aesthetics, bringing the brand's eco-friendly message to the forefront.",
    status: "Published",
    views: 1540,
    likes: 310,
    shares: 55,
    date: "05 Jan 2026",
  },
  {
    id: "7",
    thumbnail: "/thumnail.png",
    title: "FinTech Mobile Banking Application",
    slug: "fintech-banking-app",
    subtitle: "Seamless financial tracking and transfer UI/UX.",
    category: "Mobile Design",
    content: "Designing an intuitive, secure, and visually appealing mobile banking experience that helps millennials track expenses and transfer money effortlessly.",
    status: "Draft",
    views: 450,
    likes: 80,
    shares: 12,
    date: "12 Dec 2025",
  },
];