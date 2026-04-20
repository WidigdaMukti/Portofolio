"use client"

import * as React from "react"
import { IconChevronLeft, IconChevronRight, IconArrowUpRight, IconArrowRight, IconHeart, IconHeartFilled, IconShare3 } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn"
import { supabase } from "@/lib/supabase"

interface DetailProps {
    data: any;
    relatedItems: any[];
    type: 'portofolio' | 'blog';
    prevLink?: string;
    nextLink?: string;
}

export function DetailSection({ data, relatedItems, type, prevLink, nextLink }: DetailProps) {
    const [liked, setLiked] = React.useState(false);
    const [localLikes, setLocalLikes] = React.useState<number>(Number(data.likes) || 0);
    const [shared, setShared] = React.useState(false);

    React.useEffect(() => {
        // Handle Likes Initialization
        const hasLiked = localStorage.getItem(`liked_${data.id}`);
        if (hasLiked) {
            setLiked(true);
            setLocalLikes(data.likes > 0 ? data.likes : 1);
        } else {
            setLocalLikes(data.likes || 0);
        }

        // Handle View Tracking (Only increments once per session)
        const hasViewed = sessionStorage.getItem(`viewed_${data.id}`);
        if (!hasViewed && data.id) {
            sessionStorage.setItem(`viewed_${data.id}`, 'true');
            const tableName = type === 'blog' ? 'blogs' : 'portofolios';
            
            // Fire and forget RPC call safely
            const incrementView = async () => {
                const { error } = await supabase.rpc('increment_count', { 
                    table_name: tableName, 
                    column_name: 'views', 
                    row_id: data.id 
                });
                if (error) console.error("Failed to increment views:", error);
            };
            
            incrementView();
        }

    }, [data.id, data.likes, type]);

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: data.title, url: window.location.href });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link disalin!");
            }
            if (!shared) {
                setShared(true);
                await supabase.rpc('increment_share', { 
                    target_table: type, 
                    target_id: data.id 
                });
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    const handleLike = async () => {
        if (!liked) {
            setLiked(true);
            setLocalLikes((prev: number) => prev + 1);
            localStorage.setItem(`liked_${data.id}`, 'true');
            const tableName = type === 'blog' ? 'blogs' : 'portofolios';
            await supabase.rpc('increment_count', { 
                table_name: tableName, 
                column_name: 'likes', 
                row_id: data.id 
            });
        }
    };

    return (
        <section className="w-full bg-white">
            {/* --- 1. HEADER SECTION --- */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                
                <FadeIn delay={0.1} direction="up" className="py-6 md:py-8 px-6 md:px-8 flex flex-col gap-6">
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
                </FadeIn>

                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 2. MAIN VISUAL --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />
                <FadeIn delay={0.2} direction="up" className="px-6 md:px-8 mt-8">
                    <div className="aspect-[16/9] w-full bg-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
                        <img src={data.thumbnail} className="w-full h-full object-cover" alt="Featured" />
                    </div>
                </FadeIn>
                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 3. CONTENT AREA (PROSE) --- */}
            <div className="technical-grid">
                <div className="border-r border-neutral-200" />
                <FadeIn delay={0.3} direction="up" className="py-8 md:py-12 px-6 md:px-8 flex flex-col gap-6 sm:gap-8">
                    {/* META ROW (LIFTS OUT OF MAX-W TO HUG EDGES) */}
                    <div className="flex flex-row items-center justify-between gap-4 w-full pb-4 border-b border-neutral-100 -mt-8">
                        {/* Kiri: Category & Date */}
                        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-medium text-neutral-400">
                            <span className="bg-neutral-100 text-neutral-600 px-2 sm:px-3 py-1 rounded-full text-sm">{data.category}</span>
                            <span className="text-neutral-300">|</span>
                            <span className="text-sm">{data.date}</span>
                        </div>
                        
                        {/* Kanan: Actions (Like & Share) */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button 
                                onClick={handleLike}
                                className={`group flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full border border-transparent sm:border-neutral-200 transition-all text-sm font-medium hover:scale-105 active:scale-95 ${liked ? 'border-red-200 bg-red-50 text-red-600' : 'hover:border-red-200 hover:bg-red-50 text-neutral-600 hover:text-red-600'}`}
                            >
                                {liked ? (
                                    <IconHeartFilled size={18} className="text-red-500 scale-110 transition-transform" />
                                ) : (
                                    <IconHeart size={18} className="group-hover:scale-110 transition-transform" />
                                )}
                                <span className="hidden sm:inline">{localLikes} Likes</span>
                            </button>
                            
                            <button 
                                onClick={handleShare}
                                className="group flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full border border-transparent sm:border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all text-sm font-medium text-neutral-600 hover:text-neutral-950 active:scale-95"
                            >
                                <IconShare3 size={18} className="group-hover:rotate-12 transition-transform" />
                                <span className="hidden sm:inline">Bagikan</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* PROSE WIDE-WRAPPER */}
                    <div className="w-full">
                        <div 
                            className="prose prose-neutral max-w-none 
                            prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:mt-12 prose-h1:mb-6 prose-h1:text-neutral-950
                            prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-neutral-950
                            prose-h3:text-2xl prose-h3:font-bold prose-h3:tracking-tight prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-neutral-950
                            prose-h4:text-xl prose-h4:font-semibold prose-h4:tracking-tight prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-neutral-950
                            prose-h5:text-lg prose-h5:font-semibold prose-h5:mt-5 prose-h5:mb-2 prose-h5:text-neutral-900
                            prose-h6:text-base prose-h6:font-medium prose-h6:mt-4 prose-h6:mb-2 prose-h6:text-neutral-900
                            prose-p:text-base prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-6
                            prose-li:text-neutral-600 prose-li:text-base
                            prose-strong:text-neutral-950
                            prose-img:rounded-xl prose-img:shadow-sm prose-img:w-full"
                            dangerouslySetInnerHTML={{ __html: data.content }} 
                        />
                    </div>
                </FadeIn>
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
                    <FadeIn delay={0.1} direction="up" className="flex flex-col gap-4 pt-8 pb-0 md:py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Highlight</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Related {type === 'blog' ? 'Blogs' : 'Project'}
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up" className="flex items-end justify-start pb-8 pt-4 md:py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            Related writings that dive deeper into design decisions, workflows, and creative problem-solving. Each article expands on ideas shared throughout this project.
                        </p>
                    </FadeIn>
                </div>

                <div className="border-l border-neutral-200" />
            </div>

            {/* --- 5. RELATED ITEMS CARDS --- */}
            <div className="technical-grid border-b border-neutral-200 bg-white">
                <div className="border-r border-neutral-200" />

                <StaggerContainer delayChildren={0.1} staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 md:py-12 px-6 md:px-8">
                    {relatedItems.map((item, idx) => {
                        if (type === 'blog') {
                            return (
                                <StaggerItem key={item.id || idx}>
                                <a href={`/${type}/${item.slug}`} className="group flex flex-col border border-neutral-200 rounded-xl bg-white overflow-hidden hover:border-neutral-300 transition-all duration-300 h-full">
                                    <div className="aspect-[16/9] bg-neutral-100 overflow-hidden w-full shrink-0">
                                        <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.title} />
                                    </div>

                                    <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4">
                                        <div className="flex items-center gap-3 text-sm font-medium text-neutral-400">
                                            <span>{item.category}</span>
                                            <span className="text-neutral-200">|</span>
                                            <span>{item.date}</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-semibold text-neutral-950 tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-neutral-950 transition-all">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-base text-neutral-500 leading-relaxed line-clamp-2 hidden md:block">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </a>
                                </StaggerItem>
                            );
                        } else {
                            return (
                                <StaggerItem key={item.id || idx}>
                                <a href={`/${type}/${item.slug}`} className="group cursor-pointer flex flex-col gap-6 h-full">
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
                                </StaggerItem>
                            );
                        }
                    })}
                </StaggerContainer>

                <div className="border-l border-neutral-200" />
            </div>
        </section>
    )
}