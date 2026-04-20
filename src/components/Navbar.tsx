"use client"

import * as React from "react"
import { IconWorld, IconMessage2, IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export function Navbar() {
    const [currentPath, setCurrentPath] = React.useState("")
    const [activeSection, setActiveSection] = React.useState("")

    React.useEffect(() => {
        setCurrentPath(window.location.pathname)

        // 1. LOGIKA INTERSECTION OBSERVER
        // Ini buat nge-track section mana yang lagi di depan mata user
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Trigger pas section ada di tengah layar
            threshold: 0
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }, observerOptions)

        // Kita amati section yang ada id-nya (sesuai menu)
        const sections = ["services", "about", "experience"]
        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const menuItems = ["Home", "Portofolio", "Services", "About", "Experience", "Blog"]

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 technical-grid">
            <div className="border-r border-neutral-200" />
            <div className="flex h-16 items-center justify-between px-6 md:px-8">
                {/* KIRI: Menu Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => {
                        const lowCaseItem = item.toLowerCase()
                        const isAnchor = ["Services", "About", "Experience"].includes(item)
                        
                        // Set Href
                        const href = item === "Home" ? "/" 
                                   : isAnchor ? `/#${lowCaseItem}`
                                   : `/${lowCaseItem}`

                        // 2. LOGIKA ACTIVE YANG CANGGIH
                        let isActive = false

                        if (currentPath === "/") {
                            // Kalau di Home:
                            if (isAnchor) {
                                isActive = activeSection === lowCaseItem
                            } else if (item === "Home") {
                                // Home aktif kalau tidak ada section anchor yang sedang dilihat
                                isActive = activeSection === "" || activeSection === "hero" 
                            }
                        } else {
                            // Kalau di halaman lain (Porto/Blog/Contact):
                            isActive = currentPath.startsWith(href) && href !== "/"
                        }

                        return (
                            <a
                                key={item}
                                href={href}
                                className={`text-md font-medium transition-colors duration-300 ${
                                    isActive ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-950"
                                }`}
                            >
                                {item}
                            </a>
                        )
                    })}
                </nav>

                {/* KIRI: Menu Mobile (Sheet) */}
                <div className="md:hidden flex items-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex items-center gap-2 text-neutral-950 font-medium hover:text-neutral-600 transition-colors">
                                <IconMenu2 size={24} stroke={2} />
                                <span className="text-sm uppercase tracking-wider font-semibold">Menu</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-full sm:max-w-md p-6 bg-white border-r-0" showCloseButton={false}>
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            
                            {/* Tombol Close Custom mirip tombol Menu */}
                            <SheetClose asChild>
                                <button className="flex items-center gap-2 text-neutral-950 font-medium hover:text-neutral-600 transition-colors mb-8">
                                    <IconX size={24} stroke={2} />
                                    <span className="text-sm uppercase tracking-wider font-semibold">Close</span>
                                </button>
                            </SheetClose>

                            <nav className="flex flex-col gap-6 mt-4">
                                {menuItems.map((item) => {
                                    const lowCaseItem = item.toLowerCase()
                                    const isAnchor = ["Services", "About", "Experience"].includes(item)
                                    const href = item === "Home" ? "/" : isAnchor ? `/#${lowCaseItem}` : `/${lowCaseItem}`
                                    
                                    let isActive = false
                                    if (currentPath === "/") {
                                        if (isAnchor) isActive = activeSection === lowCaseItem
                                        else if (item === "Home") isActive = activeSection === "" || activeSection === "hero" 
                                    } else {
                                        isActive = currentPath.startsWith(href) && href !== "/"
                                    }

                                    return (
                                        <SheetClose asChild key={item}>
                                            <a
                                                href={href}
                                                className={`text-lg font-medium tracking-tight transition-colors duration-300 ${
                                                    isActive ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-950"
                                                }`}
                                            >
                                                {item}
                                            </a>
                                        </SheetClose>
                                    )
                                })}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* KANAN: CTA (Let's Talk) */}
                <div className="flex items-center gap-4 md:gap-4">
                    <Button
                        asChild
                        variant="outline"
                        className="group rounded-full border-neutral-200 px-3 md:px-4 py-2 h-auto text-sm font-medium text-neutral-950 hover:bg-neutral-800 hover:text-white gap-2 shadow-none transition-all"
                    >
                        <a href="/contact">
                            <span className="flex items-center justify-center gap-2 animate-text-shimmer">
                                Lets Talk <IconMessage2 size={18} stroke={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                        </a>
                    </Button>
                </div>
            </div>
            <div className="border-l border-neutral-200" />
        </header>
    )
}