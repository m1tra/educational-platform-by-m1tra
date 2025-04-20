"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  BookText,
  ListTodo,
  Users,
  ChartBar,
  Settings,
  PlusCircle,
  GraduationCap,
  FileText,
  BookOpen,
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

import { Profile } from "@/src/shared/components/header/_ui/profile"

type SidebarVariant = "teaching" | "home" | "courses" | "tests"

const globalNav = [
  { url: "/home", title: "Главная", icon: Home },
  { url: "/tests", title: "Тесты", icon: FileText },
  { url: "/courses", title: "Курсы", icon: BookOpen },
  { url: "/teach", title: "Преподавание", icon: GraduationCap },
]

const teachingItems = [
  {
    section: "Основное",
    items: [
      { title: "Панель", url: "/teach", icon: Home },
      { title: "Создать курс", url: "/teach/course-dashboard", icon: BookText },
      { title: "Создать тест", url: "/teach/test-dashboard", icon: ListTodo },
    ],
  },
  {
    section: "Управление",
    items: [
      { title: "Студенты", url: "/teach/students", icon: Users },
      { title: "Аналитика", url: "/teach/analytics", icon: ChartBar },
      { title: "Настройки", url: "/teach/settings", icon: Settings },
    ],
  },
]

const isActivePath = (pathname: string, url: string) => pathname === url || pathname.startsWith(`${url}/`)

function SidebarGroupRenderer({
  label,
  items,
  pathname,
}: {
  label: string
  items: { title: string; url: string; icon: React.ElementType }[]
  pathname: string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, url, icon: Icon }) => (
            <SidebarMenuItem key={url}>
              <SidebarMenuButton asChild isActive={isActivePath(pathname, url)}>
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
  )
}

export function CourseSidebarInterface({
  children,
  variant = "home",
}: {
  children: React.ReactNode
  variant: SidebarVariant
}) {
  const pathname = usePathname()

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
            <SidebarGroupRenderer label="Навигация" items={globalNav} pathname={pathname} />

            {variant === "teaching" &&
              teachingItems.map(({ section, items }) => (
                <SidebarGroupRenderer key={section} label={section} items={items} pathname={pathname} />
              ))}
          </SidebarContent>

          <SidebarFooter className="border-t">
            <div className="p-2">
              <Button className="w-full justify-start gap-2" variant="outline">
                <PlusCircle className="h-4 w-4" />
                <span>Создать курс</span>
              </Button>
            </div>

            <div className="p-2">
              <Profile/>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <div className="flex items-center h-16 px-4 border-b">
            <SidebarTrigger />
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
