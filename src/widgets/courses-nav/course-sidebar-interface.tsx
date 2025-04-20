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
  Star,
  Clock,
  Sparkles,
  Tags,
  Filter,
  LayoutGrid,
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

const coursesItems = [
  {
    section: "Фильтрация",
    items: [
      { title: "Все курсы", url: "/courses", icon: LayoutGrid },
      { title: "По тэгам", url: "/courses/tags", icon: Tags },
      { title: "Фильтры", url: "/courses/filters", icon: Filter },
    ],
  },
]

const testsItems = [
  {
    section: "Фильтрация",
    items: [
      { title: "Все тесты", url: "/tests", icon: LayoutGrid },
      { title: "По тэгам", url: "/tests/tags", icon: Tags },
      { title: "Фильтры", url: "/tests/filters", icon: Filter },
    ],
  },
]

const homeItems = [
  {
    section: "Личное",
    items: [
      { title: "Моя панель", url: "/home", icon: Home },
      { title: "Избранное", url: "/home/favorites", icon: Star },
      { title: "Недавние", url: "/home/recent", icon: Clock },
      { title: "Рекомендации", url: "/home/recommendations", icon: Sparkles },
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

  const getVariantItems = () => {
    switch (variant) {
      case "teaching":
        return teachingItems
      case "courses":
        return coursesItems
      case "tests":
        return testsItems
      case "home":
        return homeItems
      default:
        return []
    }
  }

  const variantItems = getVariantItems()

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2">
              <GraduationCap className="h-6 w-6" />
              <span className="font-semibold">Навигация</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroupRenderer label="Навигация" items={globalNav} pathname={pathname} />
            {variantItems.map(({ section, items }) => (
              <SidebarGroupRenderer key={section} label={section} items={items} pathname={pathname} />
            ))}
          </SidebarContent>

          <SidebarFooter className="border-t">
            {variant === "teaching" && (
              <div className="p-2">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <PlusCircle className="h-4 w-4" />
                  <span>Создать курс</span>
                </Button>
              </div>
            )}
            <div className="p-2">
              <Profile />
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <div className="flex items-center h-16 px-4  gap-10">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <div className="border border-white/30 p-1.5 rounded-sm">
                <span className="font-mono text-sm">T/E</span>
              </div>
              <span className="font-mono tracking-tight">ThinksEra</span>
            </div>  
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
