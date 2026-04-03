"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  return (
    <section className="w-full">
      {/* --- 1. HEADER SECTION (Same as About) --- */}
      <div className="technical-grid border-b border-neutral-200">
        <div className="border-r border-neutral-200" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-4 py-8 px-6 md:px-8">
            <div className="inline-flex w-fit px-3 py-1 border border-neutral-200 rounded-full bg-white">
              <span className="text-sm font-medium text-neutral-950 tracking-tight">Get in touch</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-950 leading-tight">
              Let’s Turn Ideas <br /> Into Impact. 🚀
            </h2>
          </div>
          <div className="flex items-end justify-start py-8 px-6 md:px-8">
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
              Built for meaningful collaboration and impactful outcomes. Share project goals, ideas, or challenges to start shaping better digital experiences.
            </p>
          </div>
        </div>
        <div className="border-l border-neutral-200" />
      </div>

      {/* --- 2. MAIN CONTENT --- */}
      <div className="technical-grid border-b border-neutral-200">
        <div className="border-r border-neutral-200" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 py-10 px-6 md:px-8">
          
          {/* KOLOM KIRI: Foto & Metadata (Same as About) */}
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1 min-h-[300px] bg-neutral-200 rounded-xl border border-neutral-200 shadow-inner relative overflow-hidden">
              {/* <img src="/images/contact.jpg" className="object-cover w-full h-full" /> */}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-neutral-950 tracking-tight">Widigda Mukti</span>
                <span className="text-lg text-neutral-400 font-medium tracking-tight">UIUX Designer</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                  <img src="/icons/Upwork.svg" alt="Upwork" className="w-6 h-6" />
                </a>
                <a href="#" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                  <img src="/icons/Dribble.svg" alt="Dribbble" className="w-6 h-6" />
                </a>
                <a href="#" className="transition-all duration-300 opacity-100 grayscale hover:opacity-75 hover:grayscale-0">
                  <img src="/icons/LinkedIn.svg" alt="LinkedIn" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Form (Customized per Screenshot) */}
          <div className="p-6 md:p-8 rounded-xl border border-neutral-200 bg-white flex flex-col gap-6 mt-8 md:mt-0">
            <div className="grid grid-cols-1 gap-5">
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-950">Full Name</Label>
                <Input 
                  placeholder="Your full name" 
                  className="px-4 py-2 h-auto rounded-lg border-neutral-200 bg-white focus-visible:ring-neutral-400 shadow-none text-neutral-700" 
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-neutral-950">Email Address</Label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="px-4 py-2 h-auto rounded-lg border-neutral-200 bg-white focus-visible:ring-neutral-400 shadow-none text-neutral-700" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-neutral-950">Phone Number</Label>
                  <Input 
                    placeholder="+62 xxx xxxx xxxx" 
                    className="px-4 py-2 h-auto rounded-lg border-neutral-200 bg-white focus-visible:ring-neutral-400 shadow-none text-neutral-700" 
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-950">Project Category</Label>
                <Input 
                  placeholder="e.g. Website Design, Mobile App, Branding" 
                  className="px-4 py-2 h-auto rounded-lg border-neutral-200 bg-white focus-visible:ring-neutral-400 shadow-none text-neutral-700" 
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-950">Your Message</Label>
                <Textarea 
                  placeholder="Tell me about your project or inquiry..." 
                  className="rounded-lg border-neutral-200 bg-white px-4 py-2 h-auto min-h-[120px] focus-visible:ring-neutral-400 shadow-none resize-none text-neutral-700" 
                />
              </div>
            </div>

            {/* Button: Same Height and Radius as Inputs */}
            <Button className="w-full px-4 py-2 h-auto rounded-lg bg-neutral-950 text-white font-medium text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-none">
              Send Message
              <Send size={18} strokeWidth={2.5} />
            </Button>
          </div>
        </div>
        <div className="border-l border-neutral-200" />
      </div>
    </section>
  )
}