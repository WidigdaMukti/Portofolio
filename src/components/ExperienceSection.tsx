"use client"

import * as React from "react"
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn"

const EXPERIENCES = [
    {
        id: 1,
        title: "UI/UX Designer",
        company: "Nore Inovasi",
        period: "Oktober 2024 - Now",
        duration: "17 Months",
        logo: "/svg/Nore.svg", 
        description: [
            "Designed end-to-end UI/UX for web and mobile applications, ensuring intuitive and visually engaging user interfaces.",
            "Conducted user research and translated insights into actionable design decisions aligned with user needs and business goals.",
            "Collaborated closely with developers to ensure seamless implementation and design consistency across products.",
            "Delivered design solutions based on client requirements while maintaining usability best practices.",
            "Created wireframes, prototypes, and high-fidelity designs to support product development cycles."
        ]
    },
    {
        id: 2,
        title: "Intern UI Designer",
        company: "Telkom Indonesia",
        period: "Jul 2023 - Des 2023",
        duration: "6 Months",
        logo: "/svg/Telkom.svg", 
        description: [
            "UI/UX design for the Netmonk system, focusing on usability and performance-driven interfaces.",
            "Worked within a Scrum environment using Jira to manage tasks, track progress, and align with agile workflows.",
            "Collaborated with cross-functional UI/UX teams to refine user experience and maintain design consistency.",
            "Implemented standardized design systems to improve usability and scalability across the platform.",
            "Ensured all design outputs aligned with user needs while supporting technical and business requirements."
        ]
    },
    {
        id: 3,
        title: "Intern UI/UX Specialist",
        company: "Stechoq Robotika Indonesia",
        period: "Feb 2024 - Jun 2024",
        duration: "5 Months",
        logo: "/svg/Stechoq.svg", 
        description: [
            "Designed UI/UX solutions for Industry 4.0 systems, focusing on efficiency and user-centered workflows.",
            "Developed interfaces for supply chain management systems across web and mobile platforms.",
            "Collaborated with cross-functional teams to deliver scalable and industry-standard design solutions.",
            "Applied user-centered design principles to enhance usability in complex industrial systems.",
            "Produced professional, high-quality designs aligned with modern industry standards and business goals."
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
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <FadeIn delay={0.1} direction="up" className="flex flex-col gap-4 pt-8 pb-0 md:py-8 px-6 md:px-8">
                        <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
                            <span className="text-sm font-medium text-neutral-950 tracking-tight">Experiences</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
                            Experience that <br /> matters. 🚀
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up" className="flex items-end justify-start pb-8 pt-4 md:py-8 px-6 md:px-8">
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                            Shaping meaningful solutions that improve usability, streamline workflows, and deliver real value to users and businesses.
                        </p>
                    </FadeIn>
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
                            <FadeIn delay={0.1 * index} direction="up" className="flex flex-col w-full">
                            {/* TRIGGER AREA */}
                            <button 
                                onClick={() => toggleAccordion(exp.id)}
                                aria-expanded={isExpanded}
                                aria-controls={`experience-content-${exp.id}`}
                                className="w-full text-left grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] group focus:outline-none focus-visible:bg-neutral-50 transition-colors"
                            >
                                <div className="border-r border-neutral-200 flex items-center justify-center py-4 px-4">
                                    <div className="w-20 h-20 overflow-hidden flex items-center justify-center ">
                                        <img 
                                            src={exp.logo} 
                                            className="w-20 h-20 object-contain" 
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
                                    <div className="border-t border-neutral-200 py-6 md:py-8 px-6 md:px-8 bg-white">
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
                            </FadeIn>
                        </div>

                        <div className="border-l border-neutral-200" />
                    </div>
                );
            })}
        </section>
    );
}