"use client"

import * as React from "react"
import {
  BookOpen,
  LayoutDashboard,
  FolderKanban,
  MoreHorizontal,
  Mail, // Icon untuk Inbox
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  recentBlogs: { title: string; slug: string }[];
  recentPortos: { title: string; slug: string }[];
  unreadCount: number; // Prop baru untuk notifikasi inbox
}

export function AppSidebar({ user, recentBlogs, recentPortos, unreadCount, ...props }: AppSidebarProps) {
  const navigation = {
    main: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Blog", url: "/admin/blog", icon: BookOpen },
      { title: "Portofolio", url: "/admin/portofolio", icon: FolderKanban },
      { title: "Inbox", url: "/admin/inbox", icon: Mail, badge: unreadCount },
    ],
    latestBlog: recentBlogs.map((b) => ({ title: b.title, url: `/admin/blog/${b.slug}` })),
    latestPorto: recentPortos.map((p) => ({ title: p.title, url: `/admin/portofolio/${p.slug}` })),
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.main.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </div>
                    {/* CIRCLE NOTIFICATION BADGE */}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-300">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* RECENT POSTS */}
        <SidebarGroup>
          <SidebarGroupLabel>Recent Posts</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuSub>
                {navigation.latestBlog.length > 0 ? navigation.latestBlog.map((item) => (
                  <SidebarMenuSubItem key={item.url}>
                    <SidebarMenuSubButton asChild>
                      <a href={item.url} className="truncate" title={item.title}>{item.title}</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )) : (
                  <span className="px-4 py-2 text-xs text-muted-foreground">No posts yet</span>
                )}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href="/admin/blog" className="text-muted-foreground">
                      <MoreHorizontal className="size-4" /> 
                      <span>More</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* RECENT PROJECTS */}
        <SidebarGroup>
          <SidebarGroupLabel>Recent Projects</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuSub>
                {navigation.latestPorto.length > 0 ? navigation.latestPorto.map((item) => (
                  <SidebarMenuSubItem key={item.url}>
                    <SidebarMenuSubButton asChild>
                      <a href={item.url} className="truncate" title={item.title}>{item.title}</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )) : (
                  <span className="px-4 py-2 text-xs text-muted-foreground">No projects yet</span>
                )}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href="/admin/portofolio" className="text-muted-foreground">
                      <MoreHorizontal className="size-4" /> 
                      <span>More</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}