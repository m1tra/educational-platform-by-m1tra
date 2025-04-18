import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { ArrowDownRight, GraduationCap } from "lucide-react"

interface CompletionStatsCardProps {
    period: string
  }

export function CompletionStatsCard({period}:CompletionStatsCardProps){
    return(
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Завершаемость</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.7%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />
              <span className="text-rose-500">-2.3%</span>
              <span className="ml-1">
                с прошлого {period === "month" ? "месяца" : period === "week" ? "недели" : "периода"}
              </span>
            </div>
          </CardContent>
        </Card>
    )
}