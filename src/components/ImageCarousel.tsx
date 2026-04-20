"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

interface ImageCarouselProps {
    images: string[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000) // Sedikit dipercepat agar ritmenya pas
        return () => clearInterval(interval)
    }, [images.length])

    if (!images || images.length === 0) return null

    return (
        <div className="relative w-full aspect-[16/9] bg-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden shadow-sm group">
            <AnimatePresence initial={false} custom={currentIndex}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    initial={{ opacity: 0, x: "10%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "-10%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={`Gallery Image ${currentIndex + 1}`}
                />
            </AnimatePresence>

            {/* Dots Indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentIndex === idx 
                                ? "w-6 bg-white shadow-md" 
                                : "w-2 bg-white/40 hover:bg-white/70"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
