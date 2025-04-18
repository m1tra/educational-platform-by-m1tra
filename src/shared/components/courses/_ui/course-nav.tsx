"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Home,
  BookText,
  ListTodo,
  Users,
  ChartNoAxesCombined,
  Settings,
  PlusCircle,
  GraduationCap,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/shared/components/ui/sidebar"

import { Button } from "@/src/shared/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu"

import { Header } from "../../header/app-header"

const items = [
  {
    title: "Панель",
    url: "/teach",
    icon: Home,
    section: "main",
  },
  {
    title: "Создать курс",
    url: "/teach/course-dashboard",
    icon: BookText,
    section: "main",
  },
  {
    title: "Создать тест",
    url: "/teach/test-dashboard",
    icon: ListTodo,
    section: "main",
  },
  {
    title: "Студенты",
    url: "/teach/students",
    icon: Users,
    section: "management",
  },
  {
    title: "Аналитика",
    url: "/teach/analytics",
    icon: ChartNoAxesCombined,
    section: "management",
  },
  {
    title: "Настройки",
    url: "/teach/settings",
    icon: Settings,
    section: "management",
  },
]

export function TeachingSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`)

  const mainItems = items.filter(item => item.section === "main")
  const managementItems = items.filter(item => item.section === "management")

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2">
              <GraduationCap className="h-6 w-6" />
              <span className="font-semibold">Преподавание</span>
            </div>
          </SidebarHeader>
          <SidebarContent>

            <SidebarGroup>
              <SidebarGroupLabel>Основное</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainItems.map(({ title, url, icon: Icon }) => (
                    <SidebarMenuItem key={url}>
                      <SidebarMenuButton asChild isActive={isActive(url)}>
                        <Link href={url}>
                          <Icon className="h-4 w-4" />
                          <span>{title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Управление</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {managementItems.map(({ title, url, icon: Icon }) => (
                    <SidebarMenuItem key={url}>
                      <SidebarMenuButton asChild isActive={isActive(url)}>
                        <Link href={url}>
                          <Icon className="h-4 w-4" />
                          <span>{title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

          </SidebarContent>

          <SidebarFooter className="border-t">
            <div className="p-2">
              <Button className="w-full justify-start gap-2" variant="outline">
                <PlusCircle className="h-4 w-4" />
                <span>Создать курс</span>
              </Button>
            </div>
            <div className="p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>ИП</AvatarFallback>
                    </Avatar>
                    <span>Иван Петров</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Настройки профиля</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <div className="flex items-center h-16 px-4 border-b">
            <SidebarTrigger />
            <Header />
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
