"use client"

import * as React from "react"
import { ChevronsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogList() {
    const blogs = [
        {
            id: 1,
            category: "News",
            date: "March 10, 2026",
            title: "The Mindset Shift Every UI Designer Needs to Become a Strong Product Designer",
            excerpt: "Why shifting from visuals to problem-solving is essential for designers who want to grow into product roles."
        },
        {
            id: 2,
            category: "News",
            date: "March 10, 2026",
            title: "The Mindset Shift Every UI Designer Needs to Become a Strong Product Designer",
            excerpt: "Why shifting from visuals to problem-solving is essential for designers who want to grow into product roles."
        }
    ];

    return (
        <section className="w-full">
            {/* --- 1. HEADER SECTION --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-4 py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Blog</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Thoughts on <br /> Craft 💫
                        </h2>
                    </div>
                    <div className="flex items-end justify-start py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            I help brands communicate clearly and confidently through thoughtful, goal-driven visuals.
                        </p>
                    </div>
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 2. BLOG GRID --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-6 md:px-8">
                    {blogs.map((blog) => (
                        <a 
                            key={blog.id} 
                            href="#" 
                            className="group flex flex-col border border-neutral-200 rounded-xl bg-white overflow-hidden hover:border-neutral-300 transition-all duration-300"
                        >
                            {/* IMAGE AREA: No internal border-b, no internal rounding. Wrapper handles clipping. */}
                            <div className="aspect-[16/9] bg-neutral-100 overflow-hidden rounded-xl">
                                <div className="w-full h-full flex items-center justify-center text-neutral-300 italic text-sm">
                                    {/* <img src="..." className="w-full h-full object-cover" /> */}
                                    [ Blog Thumbnail ]
                                </div>
                            </div>

                            {/* CONTENT AREA: Still with padding */}
                            <div className="p-6 flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-base font-medium text-neutral-400">
                                    <span>{blog.category}</span>
                                    <span className="text-neutral-200">|</span>
                                    <span>{blog.date}</span>
                                </div>
                                
                                <h3 className="text-xl font-semibold text-neutral-950 tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-neutral-950 transition-all">
                                    {blog.title}
                                </h3>
                                
                                <p className="text-base text-neutral-500 leading-relaxed line-clamp-2">
                                    {blog.excerpt}
                                </p>
                            </div>
                        </a>
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
    )
}