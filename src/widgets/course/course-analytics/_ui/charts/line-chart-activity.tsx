import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/shared/components/ui/card"

type monthlyActivityData = {
    name:string
    активность:number
}

interface LineChartActivityProps {
    monthlyActivityData:monthlyActivityData[]
}

export function LineChartActivity({ monthlyActivityData }: LineChartActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Активность по месяцам</CardTitle>
        <CardDescription>Количество активных студентов по месяцам</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyActivityData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="активность" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
