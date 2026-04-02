"use client"

import * as React from "react"
import { ChevronsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react";

export function PortfolioList() {
    // Data projects (bisa ditambah sesuai kebutuhan)
    const projects = [
        { id: 1, title: "User Research & Strategy", category: "SaaS Product Website" },
        { id: 2, title: "User Research & Strategy", category: "SaaS Product Website" },
        { id: 3, title: "User Research & Strategy", category: "SaaS Product Website" },
        { id: 4, title: "User Research & Strategy", category: "SaaS Product Website" },
        { id: 5, title: "User Research & Strategy", category: "SaaS Product Website" },
        { id: 6, title: "User Research & Strategy", category: "SaaS Product Website" },
    ];

    return (
        <section className="w-full">
            {/* --- HEADER PORTFOLIO (Pake gaya asli Mukti) --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-4 py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Portfolio</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Portfolio highlights <br /> collection ⚡
                        </h2>
                    </div>

                    <div className="flex items-end justify-start py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            A selection of projects highlighting my creativity and problem-solving approach. From concept to execution, each design balances beauty and function.
                        </p>
                    </div>
                </div>

                <div className="border-l border-neutral-200" />
            </div>

            {/* --- GRID ITEMS (Pake gaya asli Mukti) --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 py-12 px-6 md:px-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group cursor-pointer flex flex-col gap-6">
                            <div className="aspect-[4/3] w-full bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden relative transition-transform duration-300 ease-out group-hover:rotate-2 group-hover:scale-[1.02]">
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-300 font-bold uppercase tracking-widest text-xs">
                                    Project Preview
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg md:text-xl font-semibold text-neutral-950 tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-500 font-medium">
                                        {project.category}
                                    </p>
                                </div>

                                <div className="h-10 w-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-950 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300">
                                    <IconArrowRight size={20} stroke={2} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 3. LOAD MORE --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                <div className="flex items-center justify-center py-8 border-t border-neutral-200">
                    <Button
                        variant="outline"
                        className="rounded-full border-neutral-200 px-4 py-2 h-auto text-sm font-medium text-neutral-950 hover:bg-neutral-50 gap-2 shadow-none transition-transform active:scale-95"
                    >
                        Load More
                        <ChevronsDown size={18} strokeWidth={2.5} />
                    </Button>
                </div>
                <div className="border-l border-neutral-200" />
            </div>
        </section>
    );
}