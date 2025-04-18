import { Tooltip,  ResponsiveContainer, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/shared/components/ui/card"

type courseEngagementData = {
    name:string
    студенты:number
    завершили:number
    активные:number
}

interface courseEngagementDataProps {
    courseEngagementData:courseEngagementData[]
}

export function BarChartEngagement({ courseEngagementData }: courseEngagementDataProps) {
  return (
    <Card>
        <CardHeader>
          <CardTitle>Вовлеченность по курсам</CardTitle>
          <CardDescription>Количество студентов, активных и завершивших по каждому курсу</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={courseEngagementData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="студенты" fill="#3b82f6" />
              <Bar dataKey="активные" fill="#22c55e" />
              <Bar dataKey="завершили" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
    </Card>
  )
}
