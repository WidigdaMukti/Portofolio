"use client"

import * as React from "react"
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react"

// Memindahkan data statis ke luar komponen agar tidak dirender ulang ("re-create") pada setiap kali render
const EXPERIENCES = [
    {
        id: 1,
        title: "UIUX Designer",
        company: "Nore Inovasi",
        period: "Oktober 2024 - Now",
        duration: "17 Months",
        logo: "/icons/nore.svg", 
        description: [
            "Expert in creating user-centered and intuitive digital experiences.",
            "Skilled in wireframing, prototyping, and interactive design.",
            "Strong eye for visual design, layout, and consistency.",
            "Collaborative problem-solver focused on seamless user journeys."
        ]
    },
    {
        id: 2,
        title: "Intern UI Designer",
        company: "Telkom Indonesia",
        period: "Oktober 2024 - Now",
        duration: "17 Months",
        logo: "/icons/LinkedIn.svg", 
        description: [
            "Assisting in the design process for various digital products.",
            "Conducting user research and empathy mapping for internal tools.",
            "Creating high-fidelity mockups and interactive prototypes.",
            "Collaborating with developers to ensure design feasibility."
        ]
    },
    {
        id: 3,
        title: "Intern UI/UX Specialist",
        company: "Stechoq Robotika Indonesia",
        period: "Oktober 2024 - Now",
        duration: "17 Months",
        logo: "/icons/Upwork.svg", 
        description: [
            "Designing complex dashboard interfaces for industrial robotics.",
            "Developing design systems to maintain consistency across platforms.",
            "Performing usability testing with stakeholders in the manufacturing sector.",
            "Translating technical requirements into user-friendly UI solutions."
        ]
    }
];

export function ExperienceSection() {
    const [expandedId, setExpandedId] = React.useState<number | null>(1);

    const toggleAccordion = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="experience" className="w-full scroll-mt-16">
            {/* HEADER SECTION */}
            <div className="technical-grid border-b border-neutral-200">
                <div className="border-r border-neutral-200" />
                <div className="grid grid-cols-1 md:grid-cols-2 py-8 px-6 md:px-8">
                    <div className="flex flex-col gap-4">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Experiences</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Experience that <br /> delivers. 😎
                        </h2>
                    </div>
                    <div className="flex items-end justify-start md:pt-14">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            From concept to completion, I combine design thinking with thoughtful execution.
                        </p>
                    </div>
                </div>
                <div className="border-l border-neutral-200" />
            </div>

            {/* LIST EXPERIENCE */}
            {EXPERIENCES.map((exp, index) => {
                const isExpanded = expandedId === exp.id;
                const isLast = index === EXPERIENCES.length - 1;

                return (
                    <div key={exp.id} className={`technical-grid ${isLast ? 'border-b border-neutral-200' : ''}`}>
                        <div className="border-r border-neutral-200" />

                        <div className={`flex flex-col w-full bg-white ${!isLast ? 'border-b border-neutral-200' : ''}`}>
                            {/* TRIGGER AREA */}
                            <button 
                                onClick={() => toggleAccordion(exp.id)}
                                aria-expanded={isExpanded}
                                aria-controls={`experience-content-${exp.id}`}
                                className="w-full text-left grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] group focus:outline-none focus-visible:bg-neutral-50 transition-colors"
                            >
                                <div className="border-r border-neutral-200 flex items-center justify-center py-6 md:py-8 px-4">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl border border-neutral-200 overflow-hidden flex items-center justify-center bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-neutral-300">
                                        <img 
                                            src={exp.logo} 
                                            className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" 
                                            alt={exp.company}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-6 md:py-8 px-6 md:px-8">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-lg md:text-xl font-semibold text-neutral-950 tracking-tight leading-tight">
                                            {exp.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-neutral-400">
                                            {exp.company} &bull; {exp.period} | {exp.duration}
                                        </p>
                                    </div>
                                    
                                    <div className="text-neutral-950 transition-all duration-300 group-hover:text-neutral-400">
                                        {isExpanded 
                                            ? <ChevronsDownUp size={22} strokeWidth={1.5} className="animate-in fade-in duration-300" /> 
                                            : <ChevronsUpDown size={22} strokeWidth={1.5} className="animate-in fade-in duration-300" />
                                        }
                                    </div>
                                </div>
                            </button>

                            {/* ACCORDION CONTENT - OPTIMIZED dengan CSS Grid Animation */}
                            <div 
                                id={`experience-content-${exp.id}`}
                                className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                                    isExpanded 
                                      ? "grid-rows-[1fr] opacity-100" 
                                      : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="border-t border-neutral-200 py-8 px-6 md:px-8 bg-white">
                                        <ul className="flex flex-col gap-3">
                                            {exp.description.map((point, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-neutral-500 leading-relaxed">
                                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-l border-neutral-200" />
                    </div>
                );
            })}
        </section>
    );
}