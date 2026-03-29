"use client"

import * as React from "react"
import { IconWorld, IconMessage2, IconChevronDown } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { FooterSection } from "./FooterSection"

interface PublicPanelProps {
    children: React.ReactNode;
}

export default function PublicPanel({ children }: PublicPanelProps) {

    return (
        <div className="relative min-h-screen flex flex-col bg-white font-sans text-neutral-950 antialiased">
            
            {/* HEADER - Tetap pakai grid agar konsisten */}
            <header className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 technical-grid`}>
                <div className="border-r border-neutral-200" />
                <div className="flex h-16 items-center justify-between px-4 md:px-8">
                    <nav className="flex items-center gap-8">
                        {["Portofolio", "Services", "About", "Experience", "Blog"].map((item) => (
                            <a key={item} href={`/${item.toLowerCase()}`} className="text-sm font-medium text-neutral-500 hover:text-neutral-950 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-neutral-500 hover:text-neutral-950 cursor-pointer transition-colors group">
                            <IconWorld size={20} stroke={1.5} />
                            <span className="text-[13px] font-medium uppercase tracking-wider">En</span>
                            <IconChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                        </div>
                        <div className="h-6 w-px bg-neutral-200" />
                        <Button variant="outline" className="rounded-full border-neutral-200 px-4 py-2 h-auto text-sm font-medium text-neutral-950 hover:bg-neutral-50 gap-2 shadow-none">
                            Lets Talk
                            <IconMessage2 size={20} stroke={1.5} />
                        </Button>
                    </div>
                </div>
                <div className="border-l border-neutral-200" />
            </header>

            {/* MAIN - Sekarang polos, grid dipindah ke dalam children (HeroSection, dsb) */}
            <main className="flex-1">
                {children}
            </main>

            {/* FOOTER - Sudah pakai per-section grid */}
            <FooterSection />
        </div>
    )
}