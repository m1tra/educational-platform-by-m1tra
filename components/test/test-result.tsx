"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Info } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { TestResultsProps } from "./test-interface"



export function TestResults({
  totalTasks,
  correctCount,
  totalAttempts,
  onRestart,
}: TestResultsProps) {
  const incorrectTasks = totalTasks-correctCount
  const scorePercentage1 = totalTasks > 0 ? Math.round((correctCount / totalTasks) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <Card className="md:shadow-lg shadow-none md:border-2 border-0">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Результаты</CardTitle>
          <CardDescription className="text-center">Вы завершили тест</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 py-6">
          <div className="flex justify-evenly w-full">
            <div className="relative flex justify-center w-full">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size={"sm"} className={cn("absolute hover:none top-0 right-0 z-10")}>
                      <Info />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Отношение правильных решений к общему количеству задач</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="relative h-32 w-32">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle className="stroke-muted-foreground/20" strokeWidth="10" fill="none" r="40" cx="50" cy="50" />
                  <circle
                    className="stroke-primary transition-all duration-1000 ease-in-out"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - scorePercentage1 / 100)}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{scorePercentage1}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</div>
                <div className="text-sm text-muted-foreground">Правильно</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{incorrectTasks}</div>
                <div className="text-sm text-muted-foreground">Неправильно</div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Всего задач:</span>
                <span className="text-sm font-medium">{totalTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Выполнено задач:</span>
                <span className="text-sm font-medium">{totalTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Всего попыток:</span>
                <span className="text-sm font-medium">{totalAttempts}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <Button onClick={onRestart} className="w-full">
              Начать заново
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Вернуться к списку тестов</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

