"use client"

import * as React from "react"
import { IconChevronLeft, IconChevronRight, IconArrowUpRight, IconArrowRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface DetailProps {
    data: any;
    relatedItems: any[];
    type: 'portofolio' | 'blog';
    prevLink?: string;
    nextLink?: string;
}

export function DetailSection({ data, relatedItems, type, prevLink, nextLink }: DetailProps) {
    return (
        <section className="w-full bg-white">
            {/* --- 1. HEADER SECTION --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                
                <div className="py-6 md:py-8 px-6 md:px-8 flex flex-col gap-6">
                    <nav className="flex items-center gap-2 text-sm font-medium text-neutral-400">
                        <a href="/" className="hover:text-neutral-950 transition-colors">Home</a>
                        <IconChevronRight size={14} className="text-neutral-300" />
                        <a href={`/${type}`} className="hover:text-neutral-950 transition-colors capitalize">{type}</a>
                        <IconChevronRight size={14} className="text-neutral-300" />
                        <span className="text-neutral-950">{data.category}</span>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-neutral-950">
                        {data.title}
                    </h1>
                    <p className="text-lg text-neutral-500 font-medium leading-relaxed">
                        {data.subtitle}
                    </p>
                </div>

                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 2. MAIN VISUAL --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />
                <div className="px-6 md:px-8 mt-8">
                    <div className="aspect-[16/9] w-full bg-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
                        <img src={data.thumbnail} className="w-full h-full object-cover" alt="Featured" />
                    </div>
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 3. CONTENT AREA (PROSE) --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />
                <div className="py-10 md:py-16 px-6 md:px-8">
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center gap-3 text-sm font-medium text-neutral-400 -mt-8">
                            <span>{data.category}</span>
                            <span className="text-neutral-200">|</span>
                            <span>{data.date}</span>
                        </div>
                        
                        <div 
                            className="prose prose-neutral max-w-none 
                            prose-h3:text-2xl prose-h3:font-bold prose-h3:tracking-tight prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-neutral-950
                            prose-p:text-lg prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-6
                            prose-li:text-neutral-600 prose-li:text-lg
                            prose-strong:text-neutral-950"
                            dangerouslySetInnerHTML={{ __html: data.content }} 
                        />
                    </div>
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 4. PAGINATION --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                <div className="flex items-center justify-between py-6 md:py-8 px-6 md:px-8 border-t border-neutral-200">
                    <div className="w-1/2 flex justify-start">
                        {prevLink && (
                            <Button asChild variant="outline" className="group rounded-full gap-2 text-neutral-950 font-medium shadow-none border-neutral-200 hover:bg-neutral-800 hover:text-white px-4 py-2 h-auto transition-all">
                                <a href={prevLink}>
                                    <IconChevronLeft size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> Previous Post
                                </a>
                            </Button>
                        )}
                    </div>
                    
                    <div className="w-1/2 flex justify-end">
                        {nextLink && (
                            <Button asChild variant="outline" className="group rounded-full gap-2 text-neutral-950 font-medium shadow-none border-neutral-200 hover:bg-neutral-800 hover:text-white px-4 py-2 h-auto transition-all">
                                <a href={nextLink}>
                                    Next Post <IconChevronRight size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 4. RELATED ITEMS HEADER --- */}
            <div className="technical-grid border-b border-neutral-200 bg-white">
                <div className="border-r border-neutral-200" />
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-4 pt-8 pb-0 md:py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Highlight</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Related {type === 'blog' ? 'Blogs' : 'Project'}
                        </h2>
                    </div>
                    <div className="flex items-end justify-start pb-8 pt-4 md:py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            Related writings that dive deeper into design decisions, workflows, and creative problem-solving. Each article expands on ideas shared throughout this project.
                        </p>
                    </div>
                </div>

                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 5. RELATED ITEMS CARDS --- */}
            <div className="technical-grid border-b border-neutral-200 bg-white">
                <div className="border-r border-neutral-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 md:py-12 px-6 md:px-8">
                    {relatedItems.map((item, idx) => {
                        if (type === 'blog') {
                            return (
                                <a key={item.id || idx} href={`/${type}/${item.slug}`} className="group flex flex-col border border-neutral-200 rounded-xl bg-white overflow-hidden hover:border-neutral-300 transition-all duration-300">
                                    <div className="aspect-[16/9] bg-neutral-100 overflow-hidden w-full shrink-0">
                                        <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.title} />
                                    </div>

                                    <div className="p-6 flex flex-col gap-4">
                                        <div className="flex items-center gap-3 text-sm font-medium text-neutral-400">
                                            <span>{item.category}</span>
                                            <span className="text-neutral-200">|</span>
                                            <span>{item.date}</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-semibold text-neutral-950 tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-neutral-950 transition-all">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-base text-neutral-500 leading-relaxed line-clamp-2">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </a>
                            );
                        } else {
                            return (
                                <a key={item.id || idx} href={`/${type}/${item.slug}`} className="group cursor-pointer flex flex-col gap-6">
                                    <div className="aspect-[16/9] w-full bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden relative transition-transform duration-300 ease-out group-hover:rotate-2 group-hover:scale-[1.02]">
                                        <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.title} />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg md:text-xl font-semibold text-neutral-950 tracking-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-neutral-500 font-medium">
                                                {item.subtitle || item.category}
                                            </p>
                                        </div>
                                        <div className="h-10 w-10 shrink-0 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-950 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300">
                                            <IconArrowRight size={20} stroke={2} />
                                        </div>
                                    </div>
                                </a>
                            );
                        }
                    })}
                </div>

                <div className="border-l border-neutral-200" />
            </div>
        </section>
    )
}