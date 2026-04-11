"use client"

import * as React from "react"

export function AboutSection() {
    return (
        <section id="about" className="w-full scroll-mt-16">

            {/* --- 1. HEADER SECTION --- */}
            <div className="technical-grid border-t border-b border-neutral-200">
                {/* Gutter Kiri */}
                <div className="border-r border-neutral-200" />

                {/* Konten Header */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Kolom Kiri: Badge & Title */}
                    <div className="flex flex-col gap-4 pt-8 pb-0 md:py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">About me</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Design that connects <br /> ideas and people. 🎯
                        </h2>
                    </div>

                    {/* Kolom Kanan: Deskripsi (Align Bottom-Left) */}
                    <div className="flex items-end justify-start pb-8 pt-4 md:py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            Creating meaningful digital experiences where technology, aesthetics, and human needs come together seamlessly.
                        </p>
                    </div>
                </div>

                {/* Gutter Kanan */}
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 2. MAIN CONTENT (Bento Style: Left for Media/Info, Right for Story) --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-6 md:px-8">

                    {/* KOLOM KIRI: Foto (Fill) + Name & Socials */}
                    <div className="flex flex-col gap-6 h-full">
                        {/* Foto: h-full & flex-1 biar narik ngikutin tinggi teks di kanan */}
                        <div className="flex-1 min-h-[300px] bg-neutral-200 rounded-xl border border-neutral-200 shadow-inner relative overflow-hidden">
                            <img src="/home/mukti.webp" alt="Widigda Mukti" className="object-cover w-full h-full" />
                        </div>

                        {/* Nama & Socials (Satu kolom dengan foto) */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="text-xl font-semibold text-neutral-950 tracking-tight">Widigda Mukti</span>
                                <span className="text-lg text-neutral-400 tracking-tight">UIUX Designer</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Upwork */}
                                <a href="https://www.upwork.com/freelancers/~012d8d96b80b21dc8b?mp_source=share" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                                    <img src="/icons/Upwork.svg" alt="Upwork" className="w-6 h-6" />
                                </a>
                                {/* Dribbble */}
                                <a href="#" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                                    <img src="/icons/Dribble.svg" alt="Dribbble" className="w-6 h-6" />
                                </a>
                                {/* LinkedIn */}
                                <a href="https://www.linkedin.com/in/widigda-mukti" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                                    <img src="/icons/LinkedIn.svg" alt="LinkedIn" className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Teks Cerita */}
                    <div className="flex flex-col gap-4 text-sm text-neutral-800 leading-relaxed md:text-base">
                        <p>
                            Design and technology have always been closely connected in my journey. With a background in Informatics Engineering, I developed a strong foundation in problem-solving and system thinking, while also nurturing my interest in visual design and creativity.
                        </p>
                        <p>
                            What started as a curiosity for building and designing systems evolved into a deeper focus on UI/UX. I see design not only as how something looks, but how it works, feels, and connects with users in a meaningful way.
                        </p>
                        <p>
                            My approach centers on creating balanced experiences, where aesthetics meet functionality. I enjoy translating complex ideas into simple, intuitive interfaces that align with both user needs and technical feasibility.
                        </p>
                        <p>
                            For me, great design is about harmony between humans and technology. It’s about crafting solutions that are not only visually pleasing, but also purposeful, efficient, and able to create real impact.
                        </p>
                    </div>

                </div>

                <div className="border-l border-neutral-200" />
            </div>

        </section>
    )
}