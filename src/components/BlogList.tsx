"use client"

import * as React from "react"
import { ChevronsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogData } from "@/lib/data-blog";

export function BlogList() {
    const [visibleCount, setVisibleCount] = React.useState(6);
    const visibleBlogs = blogData.slice(0, visibleCount);

    return (
        <section className="w-full">
            {/* --- HEADER --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-4 py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Blog & Insights</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Thoughts, ideas, <br /> and deep dives. ✍️
                        </h2>
                    </div>
                    <div className="flex items-end justify-start py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            A curated space for sharing industry insights, technical processes, and thoughtful reflections on design and development.
                        </p>
                    </div>
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 2. BLOG CARDS GRID --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-6 md:px-8">
                    {visibleBlogs.map((blog) => (
                        <a
                            key={blog.id}
                            href={`/blog/${blog.slug}`}
                            className="group flex flex-col border border-neutral-200 rounded-xl bg-white overflow-hidden hover:border-neutral-300 transition-all duration-300"
                        >
                            <div className="aspect-[16/9] bg-neutral-100 overflow-hidden w-full shrink-0">
                                <img src={blog.thumbnail} className="w-full h-full object-cover" alt={blog.title} />
                            </div>

                            <div className="p-6 flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-sm font-medium text-neutral-400">
                                    <span>{blog.category}</span>
                                    <span className="text-neutral-200">|</span>
                                    <span>{blog.date}</span>
                                </div>
                                
                                <h3 className="text-xl font-semibold text-neutral-950 tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-neutral-950 transition-all">
                                    {blog.title}
                                </h3>
                                
                                <p className="text-base text-neutral-500 leading-relaxed line-clamp-2">
                                    {blog.subtitle}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 3. BOTTOM BORDER OR LOAD MORE --- */}
            {visibleCount < blogData.length ? (
                <div className="technical-grid border-b border-neutral-200">
                    <div className="border-r border-neutral-200" />
                    <div className="flex items-center justify-center py-8 border-t border-neutral-200">
                        <Button
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            variant="outline"
                            className="rounded-full border-neutral-200 px-4 py-2 h-auto text-sm font-medium text-neutral-950 hover:bg-neutral-50 gap-2 shadow-none transition-transform active:scale-95"
                        >
                            Load More <ChevronsDown size={18} strokeWidth={2.5} />
                        </Button>
                    </div>
                    <div className="border-l border-neutral-200" />
                </div>
            ) : (
                <div className="technical-grid border-b border-neutral-200 hidden" />
            )}
        </section>
    );
}