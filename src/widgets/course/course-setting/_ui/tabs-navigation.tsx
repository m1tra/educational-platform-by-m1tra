import { TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";

export function TabsNavigation(){
    return(
        <TabsList>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="billing">Оплата</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>
    )
}