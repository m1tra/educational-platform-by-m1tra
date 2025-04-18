import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { ArrowUpRight, Clock } from "lucide-react"

interface ActiveCourseStatsCard {
    period: string
  }

export function StudentsStatsCard({period}:ActiveCourseStatsCard){
    return(
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Среднее время</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 ч</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">+0.4 ч</span>
              <span className="ml-1">
                с прошлого {period === "month" ? "месяца" : period === "week" ? "недели" : "периода"}
              </span>
            </div>
          </CardContent>
        </Card>
    )
}