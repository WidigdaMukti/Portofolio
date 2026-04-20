"use client"

import * as React from "react"
import { ChevronsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn"

export function BlogList({ blogs = [] }: { blogs?: any[] }) {
    const [visibleCount, setVisibleCount] = React.useState(6);
    const visibleBlogs = blogs.slice(0, visibleCount);

    return (
        <section className="w-full">
            {/* --- HEADER --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <FadeIn delay={0.1} direction="up" className="flex flex-col gap-4 pt-8 pb-0 md:py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Blog & Insights</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Thoughts, ideas, <br /> and deep dives. ✍️
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up" className="flex items-end justify-start pb-8 pt-4 md:py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            A curated space for sharing industry insights, technical processes, and thoughtful reflections on design and development.
                        </p>
                    </FadeIn>
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 2. BLOG CARDS GRID --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />

                <StaggerContainer delayChildren={0.1} staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-8 md:gap-y-12 py-8 md:py-12 px-6 md:px-8">
                    {visibleBlogs.map((blog) => (
                        <StaggerItem key={blog.id}>
                        <a
                            key={blog.id}
                            href={`/blog/${blog.slug}`}
                            className="group flex flex-col border border-neutral-200 rounded-xl bg-white overflow-hidden hover:border-neutral-300 transition-all duration-300"
                        >
                            <div className="aspect-[16/9] bg-neutral-100 overflow-hidden w-full shrink-0">
                                <img src={blog.thumbnail} className="w-full h-full object-cover" alt={blog.title} />
                            </div>

                            <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4">
                                <div className="flex items-center gap-3 text-sm font-medium text-neutral-400">
                                    <span>{blog.category}</span>
                                    <span className="text-neutral-200">|</span>
                                    <span>{blog.date}</span>
                                </div>
                                
                                <h3 className="text-xl font-semibold text-neutral-950 tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-neutral-950 transition-all">
                                    {blog.title}
                                </h3>
                                
                                <p className="text-base text-neutral-500 leading-relaxed line-clamp-2 hidden md:block">
                                    {blog.subtitle}
                                </p>
                            </div>
                        </a>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 3. BOTTOM BORDER OR LOAD MORE --- */}
            {visibleCount < blogs.length ? (
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