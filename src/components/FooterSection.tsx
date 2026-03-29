"use client"

import * as React from "react"
import { IconArrowUpRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export const FooterSection = () => {

  return (
    <footer className="w-full bg-white">
      
      {/* --- BARIS 1: NAV LINKS --- */}
      <div className={`technical-grid border-t border-neutral-200`}>
        {/* Gutter Kiri */}
        <div className="border-r border-neutral-200" />
        
        {/* Content: Links dengan separator vertikal tipis */}
        <div className="flex items-center justify-center py-8 gap-8 text-md font-medium text-neutral-500">
          <a href="/portofolio" className="hover:text-neutral-950 transition-colors">Portofolio</a>
          <div className="h-4 w-px bg-neutral-200" />
          <a href="/services" className="hover:text-neutral-950 transition-colors">Services</a>
          <div className="h-4 w-px bg-neutral-200" />
          <a href="/about" className="hover:text-neutral-950 transition-colors">About</a>
          <div className="h-4 w-px bg-neutral-200" />
          <a href="/experience" className="hover:text-neutral-950 transition-colors">Experience</a>
          <div className="h-4 w-px bg-neutral-200" />
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
        <div className="flex flex-col items-center justify-center py-8 px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-950 leading-[1.1] mb-8">
            Lets Collaborate and <br /> Craft Your Vision
          </h2>
          
          <Button 
            className="rounded-full bg-neutral-950 text-white px-4 py-2 h-auto text-sm font-medium hover:bg-neutral-800 transition-all gap-2 group shadow-none"
          >
            Lets Talk
            <IconArrowUpRight size={22} stroke={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
        <div className="py-8 flex justify-center">
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