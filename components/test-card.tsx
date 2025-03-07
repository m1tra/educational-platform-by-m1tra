"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface TestProps {
  test: {
    id: string
    title: string
    description: string
    icon: string
    difficulty: string
    questionsCount: number
    comingSoon?: boolean
  }
}

export function TestCard({ test }: TestProps) {
  // Map difficulty to color
  const difficultyColor =
    {
      Лёгкий: "bg-green-500",
      Средний: "bg-yellow-500",
      Сложный: "bg-red-500",
    }[test.difficulty] || "bg-blue-500"

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="text-4xl mb-2">{test.icon}</div>
            {test.comingSoon ? (
              <Badge variant="outline" className="bg-muted">
                Скоро
              </Badge>
            ) : (
              <Badge className={difficultyColor}>{test.difficulty}</Badge>
            )}
          </div>
          <CardTitle className="text-xl">{test.title}</CardTitle>
          <CardDescription>{test.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">Вопросов: {test.questionsCount}</p>
        </CardContent>
        <CardFooter className="pt-2">
          {test.comingSoon ? (
            <div className="w-full py-2.5 px-4 rounded-md bg-muted text-center text-muted-foreground text-sm">
              В разработке
            </div>
          ) : (
            <Link href={`/${test.id}`} className="w-full">
              <div className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 px-4 rounded-md text-center transition-colors">
                Начать
              </div>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

