"use client"

import * as React from "react"
import { IconArrowUpRight, IconMessage2 } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn"

export function ServicesSection() {
  // 1. DAFTAR GAMBAR UI DESIGN
  // Tambahkan gambar baru ke dalam array ini (jika hanya ada 1 gambar, sistem otomatis mengulanginya biar tidak bolong/kosong)
  const sourceUiImages = ["/home/A1.png"];

  // 2. DAFTAR GAMBAR PROTOTYPE (Anda bahkan bisa bedakan gambar untuk kolom 1, 2, dan 3)
  const sourceProtoCol1 = ["/home/B1.png"];
  const sourceProtoCol2 = ["/home/B1.png"];
  const sourceProtoCol3 = ["/home/B1.png"];

  // --- LOGIC: Memastikan jumlah item minimal ada 4 agar antrean (marquee loop) tidak putus/kosong ---
  const uiImages = Array.from({ length: Math.max(4, sourceUiImages.length) }).map((_, i) => sourceUiImages[i % sourceUiImages.length]);
  const protoCol1 = Array.from({ length: Math.max(4, sourceProtoCol1.length) }).map((_, i) => sourceProtoCol1[i % sourceProtoCol1.length]);
  const protoCol2 = Array.from({ length: Math.max(4, sourceProtoCol2.length) }).map((_, i) => sourceProtoCol2[i % sourceProtoCol2.length]);
  const protoCol3 = Array.from({ length: Math.max(4, sourceProtoCol3.length) }).map((_, i) => sourceProtoCol3[i % sourceProtoCol3.length]);

  const tags = [
    "SaaS Product", "Dashboard", "E-commerce", "Landing Page", 
    "Fintech", "Mobile App", "Edutech", "CRM", "Healthcare Solution",
    "SaaS Product", "Dashboard", "E-commerce", "Landing Page" // Duplicate buat looping seamless
  ];

  return (
    <section id="services" className="w-full scroll-mt-16">
      {/* --- HEADER --- */}
      <div className="technical-grid border-b border-neutral-200">
        <div className="border-r border-neutral-200" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <FadeIn delay={0.1} direction="up" className="flex flex-col gap-4 pt-8 pb-0 md:py-8 px-6 md:px-8">
            <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                <span className="text-sm font-medium text-neutral-950 tracking-tight">Services</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
              Design services that <br /> drive results. 🚀
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="up" className="flex items-end justify-start pb-8 pt-4 md:py-8 px-6 md:px-8">
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
              Focused on crafting user-centered digital products that balance usability, business goals, and seamless interaction.
            </p>
          </FadeIn>
        </div>
        <div className="border-l border-neutral-200" />
      </div>

      {/* --- BENTO GRID --- */}
      <div className="technical-grid">
        <div className="border-r border-neutral-200" />
        
        <StaggerContainer delayChildren={0.1} staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-6 md:px-8 bg-white">
          
          {/* KOLOM KIRI: Panjang - Pendek */}
          <div className="flex flex-col gap-6">
            <StaggerItem>
            {/* UI Design (Long Card) */}
            <div className="bg-neutral-100/50 pt-6 md:pt-8 rounded-xl border border-neutral-200 group cursor-pointer flex flex-col gap-8 min-h-[480px] overflow-hidden">
              <div className="space-y-3 px-6 md:px-8">
                <h3 className="text-xl font-semibold text-neutral-950 tracking-tight">UI Design & Visual Identity</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Designing clean, scalable interfaces and visual systems that create consistency, strengthen brand identity, and improve overall user experience.
                </p>
              </div>
              <div className="relative w-full flex-grow overflow-hidden flex items-center justify-center">
                  <div className="flex animate-marquee gap-6 w-max px-6">
                     {uiImages.map((src, i) => (
                        <div key={i} className="w-[460px] h-[260px] bg-neutral-100 rounded-xl shadow-sm shrink-0 border border-neutral-200 overflow-hidden relative">
                            <img src={src} alt={`UI Design ${i+1}`} className="w-full h-full object-cover" />
                        </div>
                     ))}
                     {uiImages.map((src, i) => (
                        <div key={`dup-${i}`} className="w-[460px] h-[260px] bg-neutral-100 rounded-xl shadow-sm shrink-0 border border-neutral-200 overflow-hidden relative">
                            <img src={src} alt={`UI Design ${i+1}`} className="w-full h-full object-cover" />
                        </div>
                     ))}
                  </div>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#F5F5F5] via-transparent to-[#F5F5F5]" />
              </div>
            </div>
            </StaggerItem>

            <StaggerItem>
            {/* User Research (Short Card) */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 group cursor-pointer hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold text-neutral-950 tracking-tight mb-3">User Research & Strategy</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Understanding user behavior and business needs to define clear strategies that guide product decisions and reduce guesswork.
              </p>
            </div>
            </StaggerItem>
          </div>

          {/* KOLOM KANAN: Pendek - Panjang */}
          <div className="flex flex-col gap-6">
            <StaggerItem>
            {/* UX Design (Short Card) */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 group cursor-pointer hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold text-neutral-950 tracking-tight mb-3">UX Design & Wireframing</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Structuring user flows and wireframes that simplify complex systems into intuitive and efficient experiences.
              </p>
            </div>
            </StaggerItem>

            <StaggerItem>
            {/* Interaction (Long Card) */}
            <div className="bg-neutral-100/50 pt-6 md:pt-8 rounded-xl border border-neutral-200 group cursor-pointer flex flex-col min-h-[480px] overflow-hidden">
              <div className="space-y-3 px-6 md:px-8 relative z-10">
                <h3 className="text-xl font-semibold text-neutral-950 tracking-tight">Interaction & Prototyping</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Bringing ideas to life through interactive prototypes that validate concepts, improve usability, and support faster development.
                </p>
              </div>
              <div className="mt-auto relative w-full h-[320px] overflow-hidden flex justify-center items-center">
                  <div className="flex gap-4 transform rotate-[15deg] scale-110">
                      
                      {/* Column 1: Up */}
                      <div className="flex flex-col gap-4 animate-marquee-vertical h-max">
                         {protoCol1.map((src, i) => (
                            <div key={i} className="w-[100px] h-[200px] bg-white rounded-xl shadow-md border-[4px] border-neutral-100 shrink-0 p-1 relative overflow-hidden">
                                <img src={src} alt="Prototype Screen" className="w-full h-full object-cover rounded-[8px]" />
                            </div>
                         ))}
                         {protoCol1.map((src, i) => (
                            <div key={`dup-${i}`} className="w-[100px] h-[200px] bg-white rounded-xl shadow-md border-[4px] border-neutral-100 shrink-0 p-1 relative overflow-hidden">
                                <img src={src} alt="Prototype Screen" className="w-full h-full object-cover rounded-[8px]" />
                            </div>
                         ))}
                      </div>

                      {/* Column 2: Down */}
                      <div className="flex flex-col gap-4 animate-marquee-vertical-reverse h-max transform -translate-y-12">
                         {protoCol2.map((src, i) => (
                            <div key={i} className="w-[100px] h-[200px] bg-white rounded-xl shadow-md border-[4px] border-neutral-100 shrink-0 p-1 relative overflow-hidden">
                                <img src={src} alt="Prototype Screen" className="w-full h-full object-cover rounded-[8px]" />
                            </div>
                         ))}
                         {protoCol2.map((src, i) => (
                            <div key={`dup-${i}`} className="w-[100px] h-[200px] bg-white rounded-xl shadow-md border-[4px] border-neutral-100 shrink-0 p-1 relative overflow-hidden">
                                <img src={src} alt="Prototype Screen" className="w-full h-full object-cover rounded-[8px]" />
                            </div>
                         ))}
                      </div>

                      {/* Column 3: Up */}
                      <div className="flex flex-col gap-4 animate-marquee-vertical h-max transform translate-y-8">
                         {protoCol3.map((src, i) => (
                            <div key={i} className="w-[100px] h-[200px] bg-white rounded-xl shadow-md border-[4px] border-neutral-100 shrink-0 p-1 relative overflow-hidden">
                                <img src={src} alt="Prototype Screen" className="w-full h-full object-cover rounded-[8px]" />
                            </div>
                         ))}
                         {protoCol3.map((src, i) => (
                            <div key={`dup-${i}`} className="w-[100px] h-[200px] bg-white rounded-xl shadow-md border-[4px] border-neutral-100 shrink-0 p-1 relative overflow-hidden">
                                <img src={src} alt="Prototype Screen" className="w-full h-full object-cover rounded-[8px]" />
                            </div>
                         ))}
                      </div>

                  </div>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#F5F5F5] via-transparent to-[#F5F5F5]" />
              </div>
            </div>
            </StaggerItem>
          </div>
        </StaggerContainer>

        <div className="border-l border-neutral-200" />
      </div>

      {/* --- LOOPING TAGS (Marquee) --- */}
      <div className="technical-grid overflow-hidden">
        <div className="border-r border-neutral-200" />
        
        <div className="py-6 md:py-8 relative flex overflow-hidden border-t border-neutral-200">
          <div className="animate-marquee gap-4 px-4">
            {tags.map((tag, i) => (
              <div key={i} className="px-6 py-2.5 border border-neutral-200 rounded-full text-sm font-medium text-neutral-950 bg-white whitespace-nowrap">
                {tag}
              </div>
            ))}
          </div>
          {/* Duplikasi untuk animasi yang smooth tanpa putus */}
          <div className="animate-marquee gap-4 px-4" aria-hidden="true">
            {tags.map((tag, i) => (
              <div key={`dup-${i}`} className="px-6 py-2.5 border border-neutral-200 rounded-full text-sm font-medium text-neutral-950 bg-white whitespace-nowrap">
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="border-l border-neutral-200" />
      </div>

      {/* --- FINAL CTA --- */}
      <div className="technical-grid">
        <div className="border-r border-neutral-200" />
        <div className="flex items-center justify-center gap-3 py-6 md:py-8 border-t border-neutral-200">
          <Button asChild className="rounded-full bg-neutral-950 text-white px-4 py-2 h-auto text-sm font-medium hover:bg-neutral-800 transition-all gap-2 group shadow-none">
            <a href="/contact">
            Hire Me <IconArrowUpRight size={18} stroke={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
          <div className="w-px h-8 bg-neutral-200 mx-2" />
          <Button asChild variant="outline" className="group rounded-full border-neutral-200 px-4 py-2 h-auto text-sm font-medium text-neutral-950 hover:bg-neutral-800 hover:text-white gap-2 shadow-none transition-all">
            <a href="/contact">
            Lets Talk <IconMessage2 size={18} stroke={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </div>
        <div className="border-l border-neutral-200" />
      </div>
    </section>
  )
}