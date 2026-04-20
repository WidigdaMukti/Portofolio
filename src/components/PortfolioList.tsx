"use client"

import * as React from "react"
import { ChevronsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn"

export function PortfolioList({ projects = [] }: { projects?: any[] }) {
    const [visibleCount, setVisibleCount] = React.useState(6);
    const visiblePortos = projects.slice(0, visibleCount);

    return (
        <section className="w-full">
            {/* --- HEADER --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <FadeIn delay={0.1} direction="up" className="flex flex-col gap-4 pt-8 pb-0 md:py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Portfolio</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Portfolio highlights <br /> collection. ⚡
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up" className="flex items-end justify-start pb-8 pt-4 md:py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            A collection of projects that showcase how thoughtful design solves real problems, improves user experience, and delivers meaningful results.
                        </p>
                    </FadeIn>
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- GRID ITEMS --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />
                <StaggerContainer delayChildren={0.1} staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-8 md:gap-y-12 py-8 md:py-12 px-6 md:px-8">
                    {visiblePortos.map((porto) => (
                        <StaggerItem key={porto.id}>
                        <a 
                            key={porto.id} 
                            href={`/portofolio/${porto.slug}`} 
                            className="group cursor-pointer flex flex-col gap-6"
                        >
                            <div className="aspect-[16/9] w-full bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden relative transition-transform duration-300 ease-out group-hover:rotate-2 group-hover:scale-[1.02]">
                                <img src={porto.thumbnail} className="w-full h-full object-cover" alt={porto.title} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg md:text-xl font-semibold text-neutral-950 tracking-tight">
                                        {porto.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-500 font-medium">
                                        {porto.category}
                                    </p>
                                </div>
                                <div className="h-10 w-10 shrink-0 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-950 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300">
                                    <IconArrowRight size={20} stroke={2} />
                                </div>
                            </div>
                        </a>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- LOAD MORE --- */}
            {/* --- LOAD MORE --- */}
            {visibleCount < projects.length ? (
                <div className="technical-grid border-b border-neutral-200">
                    <div className="border-r border-neutral-200" />
                    <FadeIn delay={0.1} direction="up" className="flex items-center justify-center py-6 md:py-8 border-t border-neutral-200">
                        <Button 
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            variant="outline" 
                            className="group rounded-full border-neutral-200 px-4 py-2 h-auto text-sm font-medium text-neutral-950 hover:bg-neutral-800 hover:text-white gap-2 shadow-none transition-all active:scale-95"
                        >
                            Load More <ChevronsDown size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Button>
                    </FadeIn>
                    <div className="border-l border-neutral-200" />
                </div>
            ) : (
                <div className="technical-grid border-b border-neutral-200" />
            )}
        </section>
    );
}