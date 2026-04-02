"use client"

import * as React from "react"
import { Navbar } from "./Navbar"
import { FooterSection } from "./FooterSection"

interface PublicPanelProps {
    children: React.ReactNode;
}

export default function PublicPanel({ children }: PublicPanelProps) {
    return (
        <div className="relative min-h-screen flex flex-col bg-white font-sans text-neutral-950 antialiased">
            {/* Pakai Navbar Komponen */}
            <Navbar />

            {/* Content Area */}
            <main className="flex-1">
                {children}
            </main>

            {/* Pakai Footer Komponen */}
            <FooterSection />
        </div>
    )
}