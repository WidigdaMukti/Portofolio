"use client"

import * as React from "react"
import { IconArrowUpRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { portoData } from "@/lib/data-porto"

export function HeroSection() {

    return (
        <section className="w-full border-b border-neutral-200">
            <div className={`technical-grid`}>
                {/* Gutter Kiri */}
                <div className="border-r border-neutral-200" />

                {/* AREA KONTEN TENGAH */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-16 lg:gap-8 py-10 md:py-12 px-6 md:px-8">

                    {/* Sisi Kiri: Teks & CTA */}
                    <div className="flex flex-col items-start space-y-4">
                        {/* Badge Label */}
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">
                                Widigda Mukti  •  UX/UI Designer
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-950 leading-[1.15]">
                            Designing{" "}
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
                            Better <br />
                            Digital Experiences <br />
                            for <span className="text-neutral-400">Real Impact.</span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-xl text-sm md:text-base text-neutral-500 leading-relaxed">
                            Digital experiences designed to improve usability and create real impact. Each detail is considered to support clarity, function, and seamless interaction.
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

                    {/* Sisi Kanan: Image Stack Terinteraktif (Hidden on Mobile) */}
                    <div className="hidden lg:flex justify-center items-center relative py-8 min-h-[450px]">
                        {portoData.slice(0, 4).map((project, i) => {
                            const isFront = i === 0;
                            const isSecond = i === 1;
                            const isThird = i === 2;
                            const isBack = i === 3;
                            
                            let styleClass = "";
                            if (isFront) {
                                styleClass = "z-40 rotate-0 translate-x-0 translate-y-0 hover:-rotate-1 hover:scale-[1.05] hover:shadow-2xl hover:z-50";
                            } else if (isSecond) {
                                styleClass = "z-30 rotate-[4deg] translate-x-4 -translate-y-6 hover:rotate-[8deg] hover:translate-x-8 hover:-translate-y-10 hover:scale-[1.05] hover:shadow-2xl hover:z-50";
                            } else if (isThird) {
                                styleClass = "z-20 -rotate-[3deg] -translate-x-3 -translate-y-12 hover:-rotate-[4deg] hover:-translate-x-12 hover:-translate-y-16 hover:scale-[1.05] hover:shadow-2xl hover:z-50";
                            } else if (isBack) {
                                styleClass = "z-10 rotate-[7deg] translate-x-6 -translate-y-16 hover:rotate-[10deg] hover:translate-x-14 hover:-translate-y-20 hover:scale-[1.05] hover:shadow-2xl hover:z-50";
                            }

                            return (
                                <a 
                                  key={project.id}
                                  href={`/portofolio/${project.slug}`}
                                  className={`
                                    absolute w-[90%] aspect-[16/9] rounded-xl shadow-xl 
                                    overflow-hidden transition duration-500 ease-out cursor-pointer
                                    ${styleClass}
                                `}>
                                    {/* Overlay Tipis Gelap di gambar belakang supaya gambar depan stand-out */}
                                    {!isFront && <div className="absolute inset-0 bg-neutral-900/10 hover:bg-transparent transition-colors duration-500" />}
                                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                                </a>
                            )
                        })}
                    </div>

                </div>

                {/* Gutter Kanan */}
                <div className="border-l border-neutral-200" />
            </div>
        </section>
    )
}