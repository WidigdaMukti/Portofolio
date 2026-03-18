"use client"

import * as React from "react"
import { IconBrandGithub, IconBrandInstagram, IconLayoutDashboard } from "@tabler/icons-react"

interface PublicPanelProps {
    children: React.ReactNode;
}

export default function PublicPanel({ children }: PublicPanelProps) {
    return (
        <div className="relative flex min-h-screen flex-col bg-slate-950 text-slate-50 selection:bg-emerald-500/30">
            {/* FIXED NAVBAR (Kaya SidebarProvider tapi versi top-nav) */}
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tighter">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950">
                            W
                        </div>
                        Widigda.
                    </a>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="/" className="hover:text-emerald-400 transition-colors">Home</a>
                        <a href="/blog" className="hover:text-emerald-400 transition-colors">Blog</a>
                        <a href="/portofolio" className="hover:text-emerald-400 transition-colors">Portofolio</a>
                        <div className="h-4 w-px bg-white/10" />
                        <a href="/admin" className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                            <IconLayoutDashboard size={16} />
                            Admin
                        </a>
                    </nav>

                    <div className="flex items-center gap-4 text-slate-400">
                        <a href="#" className="hover:text-white"><IconBrandGithub size={20} /></a>
                        <a href="#" className="hover:text-white"><IconBrandInstagram size={20} /></a>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT (Children masuk sini) */}
            <main className="flex-1">
                {children}
            </main>

            {/* FOOTER (Selalu ada di tiap halaman publik) */}
            <footer className="border-t border-white/5 bg-slate-950/50 py-10">
                <div className="container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Widigda.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-600 font-medium">
                        <a href="#" className="hover:text-emerald-400">Project Inquiry</a>
                        <a href="#" className="hover:text-emerald-400">CV</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}