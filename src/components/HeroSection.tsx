"use client"

import * as React from "react"
import { IconArrowUpRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {

    return (
        <section className="w-full border-b border-neutral-200">
            <div className={`technical-grid`}>
                {/* Gutter Kiri */}
                <div className="border-r border-neutral-200" />

                {/* AREA KONTEN TENGAH */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-8 py-10 md:py-16 px-6 md:px-8">

                    {/* Sisi Kiri: Teks & CTA */}
                    <div className="flex flex-col items-start space-y-4">
                        {/* Badge Label */}
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">
                                Widigda's Portofolio Website
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-950 leading-[1.15]">
                            Crafting{" "}
                            <span className="inline-flex align-middle bg-[#FFD0D0] p-1.5 rounded-md mx-1 -rotate-12 transition-transform hover:rotate-0 duration-300">
                                {/* Figma Icon Placeholder - Bisa diganti SVG Figma */}
                                <svg width="24" height="24" viewBox="0 0 38 57" fill="none" className="w-6 h-6 md:w-8 md:h-8">
                                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
                                    <path d="M0 47.5C0 42.2533 4.2533 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.2533 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                                    <path d="M0 28.5C0 23.2533 4.2533 19 9.5 19H19V38H9.5C4.2533 38 0 33.7467 0 28.5Z" fill="#A259FF" />
                                    <path d="M0 9.5C0 4.2533 4.2533 0 9.5 0H19V19H9.5C4.2533 19 0 13.7467 0 9.5Z" fill="#F24E1E" />
                                    <path d="M19 0H28.5C33.7467 0 38 4.2533 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" />
                                </svg>
                            </span>{" "}
                            Designs <br />
                            That Work Harder, <br />
                            Think <span className="text-neutral-400">Bigger.</span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-xl text-sm md:text-base text-neutral-500 leading-relaxed">
                            Whether you need a complete brand identity or a conversion-focused
                            website, I create designs that deliver. With a keen eye for detail, I ensure
                            every element serves both form and function.
                        </p>

                        {/* Button Hire Me */}
                        <Button asChild
                            className="rounded-full bg-neutral-950 text-white px-4 py-2 h-auto text-sm font-medium hover:bg-neutral-800 transition-all gap-2 group shadow-none"
                        >
                            <a href="/contact">
                                Hire Me
                                <IconArrowUpRight size={22} stroke={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </Button>
                    </div>

                    {/* Sisi Kanan: Image Stack Placeholder */}
                    <div className="hidden lg:flex justify-center items-center relative py-8">
                        {/* Stack background dekoratif */}
                        <div className="absolute w-[85%] aspect-[4/3] bg-neutral-100 rounded-xl rotate-6 translate-x-4" />
                        <div className="absolute w-[85%] aspect-[4/3] bg-neutral-50 rounded-xl rotate-3 translate-x-2 border border-neutral-100" />

                        {/* Frame Utama */}
                        <div className="relative w-[85%] aspect-[4/3] bg-neutral-200 rounded-xl border border-neutral-300 shadow-sm flex items-center justify-center overflow-hidden">
                            {/* Tempat Naruh Screenshot Design Kamu Nanti */}
                            <div className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Preview Image</div>
                        </div>
                    </div>

                </div>

                {/* Gutter Kanan */}
                <div className="border-l border-neutral-200" />
            </div>
        </section>
    )
}