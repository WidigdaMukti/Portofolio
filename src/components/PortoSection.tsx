"use client"

import * as React from "react"
import { IconArrowRight, IconBolt } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { portoData } from "@/lib/data-porto";

export function PortoSection() {

    const projects = portoData.slice(0, 4);

    return (
        <section className="w-full">
            {/* --- HEADER PORTFOLIO --- */}
            <div className={`technical-grid border-b border-neutral-200`}>
                {/* Gutter Kiri */}
                <div className="border-r border-neutral-200" />

                {/* Sub-grid Header: Tanpa border tengah agar sejajar dengan grid kartu di bawah */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Kolom Kiri: Judul & Badge */}
                    <div className="flex flex-col gap-4 py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Portfolio</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Portfolio highlights <br /> collection. <span className="text-yellow-400">⚡</span>
                        </h2>
                    </div>

                    {/* Kolom Kanan: Deskripsi (Fill Height & Bottom-Left Alignment) */}
                    <div className="flex items-end justify-start py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            A collection of projects that showcase how thoughtful design solves real problems, improves user experience, and delivers meaningful results.
                        </p>
                    </div>
                </div>

                {/* Gutter Kanan */}
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- GRID ITEMS --- */}
            <div className={`technical-grid`}>
                <div className="border-r border-neutral-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 py-8 px-6 md:px-8">
                    {projects.map((project, index) => (
                        <a key={index} href={`/portofolio/${project.slug}`} className="group cursor-pointer flex flex-col gap-6">
                            {/* Image Placeholder */}
                            <div className="aspect-[16/9] w-full bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden relative transition-transform duration-300 ease-out group-hover:rotate-2 group-hover:scale-[1.02]">
                                <img src={project.thumbnail} className="w-full h-full object-cover" alt={project.title} />
                            </div>

                            {/* Card Info */}
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg md:text-xl font-semibold text-neutral-950 tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-500 font-medium">
                                        {project.category}
                                    </p>
                                </div>

                                {/* Arrow Button */}
                                <div className="h-10 w-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-950 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300">
                                    <IconArrowRight size={20} stroke={2} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="border-l border-neutral-200" />
            </div>

            {/* --- SEE MORE --- */}
            <div className={`technical-grid border-b border-neutral-200`}>
                <div className="border-r border-neutral-200" />

                <div className="flex justify-center py-8 border-t border-neutral-200">
                    <Button asChild
                        variant="outline"
                        className="rounded-full border-neutral-200 px-4 py-2 h-auto text-sm font-medium text-neutral-950 hover:bg-neutral-50 gap-2 shadow-none"
                    >
                        <a href="/portofolio">
                            See More
                            <IconArrowRight size={18} stroke={2.5} />
                        </a>
                    </Button>
                </div>

                <div className="border-l border-neutral-200" />
            </div>
        </section>
    );
}