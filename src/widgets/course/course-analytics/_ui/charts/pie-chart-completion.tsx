import { Tooltip,  ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/shared/components/ui/card"

type completionRateData = {
    name:string
    value:number
    color:string
}

interface completionRateDataProps {
    completionRateData:completionRateData[]
}

export function PieChartCompletion({ completionRateData }: completionRateDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Статус завершения</CardTitle>
        <CardDescription>Распределение студентов по статусу завершения курсов</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={completionRateData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {completionRateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
