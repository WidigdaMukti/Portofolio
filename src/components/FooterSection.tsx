"use client"

import * as React from "react"
import { IconArrowUpRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export const FooterSection = () => {

  return (
    <footer className="w-full bg-white">

      {/* --- BARIS 1: NAV LINKS --- */}
      <div className={`technical-grid border-neutral-200`}>
        {/* Gutter Kiri */}
        <div className="border-r border-neutral-200" />

        {/* Content: Links dengan separator vertikal tipis (Responsif) */}
        <div className="flex flex-wrap items-center justify-center py-6 md:py-8 gap-x-6 gap-y-4 md:gap-6 text-base font-medium text-neutral-500 px-6 md:px-4 w-full">
          <a href="/" className="hover:text-neutral-950 transition-colors">Home</a>
          <div className="h-4 w-px bg-neutral-200 hidden md:block" />
          <a href="/portofolio" className="hover:text-neutral-950 transition-colors">Portofolio</a>
          <div className="h-4 w-px bg-neutral-200 hidden md:block" />
          <a href="/#services" className="hover:text-neutral-950 transition-colors">Services</a>
          <div className="h-4 w-px bg-neutral-200 hidden md:block" />
          <a href="/#about" className="hover:text-neutral-950 transition-colors">About</a>
          <div className="h-4 w-px bg-neutral-200 hidden md:block" />
          <a href="/#experience" className="hover:text-neutral-950 transition-colors">Experience</a>
          <div className="h-4 w-px bg-neutral-200 hidden md:block" />
          <a href="/blog" className="hover:text-neutral-950 transition-colors">Blog</a>
        </div>

        {/* Gutter Kanan */}
        <div className="border-l border-neutral-200" />
      </div>

      {/* --- BARIS 2: CALL TO ACTION (CTA) --- */}
      <div className={`technical-grid border-t border-neutral-200`}>
        {/* Gutter Kiri */}
        <div className="border-r border-neutral-200" />

        {/* Content: Heading & Button */}
        <div className="flex flex-col items-center justify-center py-10 md:py-16 px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-950 mb-6 md:mb-8">
            Lets Collaborate and <br className="hidden md:block" /> Craft Your Vision
          </h2>

          <Button asChild
            className="group animate-btn-shimmer rounded-full bg-neutral-950 text-white px-5 md:px-6 py-2.5 md:py-3 h-auto text-sm md:text-base font-medium hover:bg-neutral-800 transition-all gap-2 shadow-none"
          >
            <a href="/contact">
              Lets Talk
              <IconArrowUpRight size={22} stroke={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Gutter Kanan */}
        <div className="border-l border-neutral-200" />
      </div>

      {/* --- BARIS 3: COPYRIGHT --- */}
      <div className={`technical-grid border-t border-neutral-200`}>
        {/* Gutter Kiri */}
        <div className="border-r border-neutral-200" />

        {/* Content: Copyright Text */}
        <div className="py-6 md:py-8 flex justify-center">
          <p className="text-sm text-neutral-400 tracking-wide">
            ©Copyright 2026 Widigda. All Right Reserves.
          </p>
        </div>

        {/* Gutter Kanan */}
        <div className="border-l border-neutral-200" />
      </div>

    </footer>
  )
}