import { TabsContent } from "@/src/shared/components/ui/tabs";
import { PieChartCompletion } from "../charts/pie-chart-completion";
import { LineChartActivity } from "../charts/line-chart-activity";
import { BarChartEngagement } from "../charts/bar-chart-engagement";

const courseEngagementData = [
    { name: "Математика", студенты: 120, завершили: 85, активные: 95 },
    { name: "Физика", студенты: 80, завершили: 45, активные: 60 },
    { name: "Программирование", студенты: 150, завершили: 110, активные: 130 },
    { name: "История", студенты: 60, завершили: 30, активные: 40 },
    { name: "Английский", студенты: 90, завершили: 70, активные: 75 },
  ]
  
  const completionRateData = [
    { name: "Завершили", value: 65, color: "#22c55e" },
    { name: "В процессе", value: 25, color: "#3b82f6" },
    { name: "Не начали", value: 10, color: "#f43f5e" },
  ]
  
  const monthlyActivityData = [
    { name: "Янв", активность: 65 },
    { name: "Фев", активность: 59 },
    { name: "Мар", активность: 80 },
    { name: "Апр", активность: 81 },
    { name: "Май", активность: 56 },
    { name: "Июн", активность: 55 },
    { name: "Июл", активность: 40 },
    { name: "Авг", активность: 50 },
    { name: "Сен", активность: 70 },
    { name: "Окт", активность: 90 },
    { name: "Ноя", активность: 85 },
    { name: "Дек", активность: 75 },
  ]

export function Overview(){
    return(
        <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <LineChartActivity monthlyActivityData={monthlyActivityData}/>
              <PieChartCompletion completionRateData={completionRateData}/>
            </div>
            <BarChartEngagement courseEngagementData={courseEngagementData}/>
        </TabsContent>
    )
}