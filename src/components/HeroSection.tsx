"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <div className="flex flex-col items-start gap-6 py-10 md:py-20">
            {/* Badge Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for New Projects
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                Designing Digital <br />
                <span className="text-emerald-500">Experiences.</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                Halo, gue Widigda. Seorang UI/UX Designer yang lagi eksplorasi banyak hal di 
                <strong className="text-slate-200"> Apple Developer Academy</strong>. 
                Gue fokus bikin produk yang nggak cuma fungsional, tapi juga enak dipandang.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 h-11">
                    Liat Portofolio
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5 h-11 px-8">
                    Hubungi Gue
                </Button>
            </div>
        </div>
    )
}