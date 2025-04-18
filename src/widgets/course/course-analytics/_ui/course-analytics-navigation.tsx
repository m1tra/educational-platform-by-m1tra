import { TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";

export function CourseAnalytics(){
    return(
        <TabsList>
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="students">Студенты</TabsTrigger>
        </TabsList>
    )
}