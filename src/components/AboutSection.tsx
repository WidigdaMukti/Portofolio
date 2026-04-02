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
                    <div className="flex flex-col gap-4 py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">About me</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Design that tells <br /> your story. 💬
                        </h2>
                    </div>

                    {/* Kolom Kanan: Deskripsi (Align Bottom-Left) */}
                    <div className="flex items-end justify-start py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            I help brands communicate clearly and confidently through thoughtful, goal-driven visuals that resonate with their audience and strengthen their identity.
                        </p>
                    </div>
                </div>

                {/* Gutter Kanan */}
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 2. MAIN CONTENT (Bento Style: Left for Media/Info, Right for Story) --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 py-8 px-6 md:px-8">

                    {/* KOLOM KIRI: Foto (Fill) + Name & Socials */}
                    <div className="flex flex-col gap-6 h-full">
                        {/* Foto: h-full & flex-1 biar narik ngikutin tinggi teks di kanan */}
                        <div className="flex-1 min-h-[300px] bg-neutral-200 rounded-xl border border-neutral-200 shadow-inner relative overflow-hidden">
                            {/* <img src="..." className="object-cover w-full h-full" /> */}
                        </div>

                        {/* Nama & Socials (Satu kolom dengan foto) */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-semibold text-neutral-950 tracking-tight">Widigda Mukti</span>
                                <span className="text-lg text-neutral-400 tracking-tight">UIUX Designer</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Upwork */}
                                <a href="#" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                                    <img src="/icons/Upwork.svg" alt="Upwork" className="w-6 h-6" />
                                </a>
                                {/* Dribbble */}
                                <a href="#" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                                    <img src="/icons/Dribble.svg" alt="Dribbble" className="w-6 h-6" />
                                </a>
                                {/* LinkedIn */}
                                <a href="#" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                                    <img src="/icons/LinkedIn.svg" alt="LinkedIn" className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Teks Cerita */}
                    <div className="flex flex-col gap-4 text-sm text-neutral-800 leading-relaxed md:text-base">
                        <p>
                            Design isn't just my job—it's my passion. What began as a hobby turned into a full-fledged career when I realized the true power of design: not just making things beautiful, but making them work better.
                        </p>
                        <p>
                            My approach is all about crafting user interfaces that serve a real purpose. I believe great design should solve problems and provide seamless experiences. This meticulous attention to detail allows me to create lasting relationships with clients.
                        </p>
                        <p>
                            I'm a perfectionist when it comes to the details, and I believe it's the little things that elevate design from good to great. This meticulous attention to detail allows me to create lasting relationships with clients. I'm a perfectionist when it comes to the details, and I believe it's the little things that elevate design from good to great.
                        </p>
                        <p>
                            This meticulous attention to detail allows me to create lasting relationships with clients. I'm a perfectionist when it comes to the details, and I believe it's the little things that elevate design from good to great.
                        </p>
                    </div>

                </div>

                <div className="border-l border-neutral-200" />
            </div>

        </section>
    )
}