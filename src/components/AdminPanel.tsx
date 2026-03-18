"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { TooltipProvider } from "@/components/ui/tooltip"

interface AdminPanelProps {
  children: React.ReactNode;
  pathname: string;
  user: { id: string; name: string; email: string; avatar: string; };
  recentBlogs: { title: string; slug: string }[];
  recentPortos: { title: string; slug: string }[];
  unreadCount: number; // Tambahkan ini
}

export default function AdminPanel({ 
  children, pathname, user, recentBlogs, recentPortos, unreadCount 
}: AdminPanelProps) {
  const paths = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={0}> 
        <AppSidebar 
          user={user} 
          recentBlogs={recentBlogs} 
          recentPortos={recentPortos} 
          unreadCount={unreadCount}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  {paths.length > 1 && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="capitalize">{paths[paths.length - 1]}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:p-8 overflow-x-hidden">
            {children}
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}