"use client"


import { Trophy, Info, Clock, CheckCircle, XCircle, BarChart3, Repeat } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"



export interface TestResultsProps {
  totalTasks: number
  correctCount: number
  totalAttempts: number
  totalTime: number 
  onRestart: () => void
  averageTimePerTask: number 
  fastestTask: number 
  slowestTask: number 
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function TestResults({
  totalTasks,
  correctCount,
  totalAttempts,
  totalTime,
  onRestart,
  averageTimePerTask = 0,
  fastestTask = 0,
  slowestTask = 0,
}: TestResultsProps) {
  const incorrectTasks = totalTasks - correctCount
  const scorePercentage = totalTasks > 0 ? Math.round((correctCount / totalTasks) * 100) : 0
  const efficiencyRate = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0

  const formattedTotalTime = formatTime(totalTime)
  const formattedAvgTime = formatTime(averageTimePerTask )
  const formattedFastestTime = formatTime(fastestTask || 0)
  const formattedSlowestTime = formatTime(slowestTask || 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-2xl aspect-square  mx-auto"
    >
      <Card className="md:shadow-lg shadow-none md:border-2 border-0">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Результаты</CardTitle>
          <CardDescription className="text-center">Вы завершили тест за {formattedTotalTime}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 py-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="details">Детали</TabsTrigger>
              <TabsTrigger value="time">Время</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="flex justify-center w-full">
                <div className="relative flex justify-center">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="stroke-muted-foreground/20"
                        strokeWidth="10"
                        fill="none"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="stroke-primary transition-all duration-1000 ease-in-out"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - scorePercentage / 100)}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-4xl font-bold">{scorePercentage}%</span>
                      <span className="text-sm text-muted-foreground">Результат</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-1">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">Правильно</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-1">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{incorrectTasks}</div>
                  <div className="text-sm text-muted-foreground">Неправильно</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    Всего задач:
                  </span>
                  <span className="text-sm font-medium">{totalTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Выполнено правильно:
                  </span>
                  <span className="text-sm font-medium">{correctCount}</span>
                </div>
             
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    Выполнено неправильно:
                  </span>
                  <span className="text-sm font-medium">{incorrectTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <Repeat className="h-4 w-4 text-muted-foreground" />
                    Всего попыток:
                  </span>
                  <span className="text-sm font-medium">{totalAttempts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    Эффективность:
                  </span>
                  <span className="text-sm font-medium">{efficiencyRate}%</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-xs text-center text-muted-foreground mt-2 cursor-help">
                        Эффективность = (Правильные ответы / Всего попыток) × 100%
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Показывает насколько эффективно вы отвечали на вопросы</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TabsContent>

            <TabsContent value="time" className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Общее время:
                  </span>
                  <span className="text-sm font-medium">{formattedTotalTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Среднее время на задачу:
                  </span>
                  <span className="text-sm font-medium">{formattedAvgTime}</span>
                </div>
                {fastestTask > 0 && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        Самая быстрая задача:
                      </span>
                      <span className="text-sm font-medium">{formattedFastestTime}</span>
                    </div>
                  </>
                )}
                {slowestTask > 0 && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-600" />
                        Самая долгая задача:
                      </span>
                      <span className="text-sm font-medium">{formattedSlowestTime}</span>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>

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
