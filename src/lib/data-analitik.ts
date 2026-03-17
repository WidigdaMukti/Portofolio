import { blogData } from "./data-blog";
import { portoData } from "./data-porto";

// --- LOGIKA WAKTU (Cek Bulan & Tahun Sekarang) ---
const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

// --- FUNGSI HITUNG GROWTH (Postingan baru di bulan ini) ---
const getGrowthThisMonth = (data: any[]) => {
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
  }).length;
};

// --- FUNGSI TOTALING (Likes & Shares) ---
const sumStats = (data: any[], key: "likes" | "shares") => {
  return data.reduce((acc, item) => acc + (Number(item[key]) || 0), 0);
};

// --- FORMATTER ANGKA (Contoh: 1200 jadi 1.2k) ---
const formatNumber = (num: number) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
};

// --- EXPORT SUMMARY STATS (Dynamic) ---
const bLikes = sumStats(blogData, "likes");
const pLikes = sumStats(portoData, "likes");
const bShares = sumStats(blogData, "shares");
const pShares = sumStats(portoData, "shares");

export const summaryStats = {
  blog: { 
    total: blogData.length, 
    growth: getGrowthThisMonth(blogData) 
  },
  porto: { 
    total: portoData.length, 
    growth: getGrowthThisMonth(portoData) 
  },
  shares: { 
    total: formatNumber(bShares + pShares), 
    detail: `Blog ${bShares} | Porto ${pShares}` 
  },
  likes: { 
    total: formatNumber(bLikes + pLikes), 
    detail: `Blog ${bLikes} | Porto ${pLikes}` 
  },
};

// --- DATA GRAFIK (Dummy, nanti bisa ditarik dari tabel 'analytics' Supabase) ---
export type AnalyticsRange = "3m" | "30d" | "7d";
export const analyticsData: Record<AnalyticsRange, { label: string; Visitor: number }[]> = {
  "3m": [
    { label: "Januari", Visitor: 400 },
    { label: "Februari", Visitor: 800 },
    { label: "Maret", Visitor: 1200 },
  ],
  "30d": [
    { label: "Minggu 1", Visitor: 200 },
    { label: "Minggu 2", Visitor: 450 },
    { label: "Minggu 3", Visitor: 300 },
    { label: "Minggu 4", Visitor: 600 },
  ],
  "7d": [
    { label: "Senin", Visitor: 40 },
    { label: "Selasa", Visitor: 80 },
    { label: "Rabu", Visitor: 35 },
    { label: "Kamis", Visitor: 90 },
    { label: "Jumat", Visitor: 120 },
    { label: "Sabtu", Visitor: 150 },
    { label: "Minggu", Visitor: 110 },
  ],
};