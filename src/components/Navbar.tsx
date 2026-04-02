"use client"

import * as React from "react"
import { IconWorld, IconMessage2, IconChevronDown } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

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
                <nav className="flex items-center gap-8">
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

                {/* Bagian Kanan Tetap Sama */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-neutral-500 hover:text-neutral-950 cursor-pointer transition-colors group">
                        <IconWorld size={20} stroke={1.5} />
                        <span className="text-sm font-medium uppercase tracking-wider">En</span>
                        <IconChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                    </div>
                    <div className="h-6 w-px bg-neutral-200" />
                    <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-neutral-200 px-4 py-2 h-auto text-sm font-medium text-neutral-950 hover:bg-neutral-50 gap-2 shadow-none"
                    >
                        <a href="/contact">
                            Lets Talk <IconMessage2 size={20} stroke={1.5} />
                        </a>
                    </Button>
                </div>
            </div>
            <div className="border-l border-neutral-200" />
        </header>
    )
}