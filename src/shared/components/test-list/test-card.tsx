"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { motion } from "framer-motion"
import { useUserRole } from "@/src/entities/session/use-user-role"
import { Edit, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { Test } from "../../types/test"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


interface TestProps {
  test: Test
  handleDelete:(id:string)=>void
}

export const Difficulty = {
  Лёгкий: "bg-green-500",
  Средний: "bg-yellow-500",
  Сложный: "bg-red-500",
}

export function TestCard({ test, handleDelete }: TestProps) {
  const [edit,setEdit] = useState<string | null>(null)

  const questionsCount = JSON.parse(test.questions).length

  const difficultyColor = Difficulty[test.difficulty as keyof typeof Difficulty]

  const { isModerator } = useUserRole()

  const router = useRouter()

  useEffect(() => {
    if (edit) {
      router.push(`/custom-test?id=${edit}`);
    }
  }, [edit]);
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-88 flex flex-col transition-all hover:shadow-md border-2 relative">
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
          <p className="text-sm text-muted-foreground">Вопросов: {questionsCount}</p>
        </CardContent>
        <CardFooter className="pt-2">
          {isModerator && (
              <div className="absolute bottom-20  ">
                <Button variant="ghost" size="icon"  onClick={() => handleDelete(test.id)}>
                  <Trash className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon"  onClick={() => setEdit(test.id)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            )}
          {test.comingSoon ? (
            <div className="w-full py-2.5 px-4 rounded-md bg-muted text-center text-muted-foreground text-sm">
              В разработке
            </div>
          ) : (
            <Link href={`/tests/test/${test.id}`} className="w-full">
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

