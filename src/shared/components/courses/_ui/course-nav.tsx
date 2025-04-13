import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/src/shared/components/ui/sidebar"
  import { Users, Home, BookText, ChartNoAxesCombined, Settings } from "lucide-react"
import Link from "next/link"
 
  const items = [
    {
      title: "Панель",
      url: "/teach",
      icon: Home,
    },
    {
      title: "Курсы",
      url: "/teach/dashboard",
      icon: BookText,
    },
    {
      title: "Студенты",
      url: "#",
      icon: Users,
    },
    {
      title: "Аналитика",
      url: "#",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Настройки",
      url: "#",
      icon: Settings,
    },
  ]
   
export function CourseNav(){
    
    return(
        <Sidebar className="mt-[60px]  border-r h-[calc(100vh-1rem)]">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Приложение</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}