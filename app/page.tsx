import { TestCard } from "@/components/test-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, GraduationCap, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const tests = [
    {
      id: "word-learning",
      title: "Правописание слов",
      description: "Заполните пропущенные буквы в словах",
      icon: "📝",
      difficulty: "Средний",
      questionsCount: 22,
      category: "language",
    },
    {
      id: "grammar",
      title: "Грамматика",
      description: "Проверьте свои знания правил грамматики",
      icon: "📚",
      difficulty: "Сложный",
      questionsCount: 15,
      comingSoon: true,
      category: "language",
    },
    {
      id: "punctuation",
      title: "Пунктуация",
      description: "Расставьте знаки препинания правильно",
      icon: "✏️",
      difficulty: "Сложный",
      questionsCount: 10,
      comingSoon: true,
      category: "language",
    },
    {
      id: "vocabulary",
      title: "Словарный запас",
      description: "Расширьте свой словарный запас",
      icon: "🔤",
      difficulty: "Лёгкий",
      questionsCount: 30,
      comingSoon: true,
      category: "language",
    },
    {
      id: "math-basics",
      title: "Основы математики",
      description: "Решайте базовые математические задачи",
      icon: "🔢",
      difficulty: "Лёгкий",
      questionsCount: 20,
      comingSoon: true,
      category: "math",
    },
    {
      id: "algebra",
      title: "Алгебра",
      description: "Решайте алгебраические уравнения",
      icon: "➗",
      difficulty: "Средний",
      questionsCount: 15,
      comingSoon: true,
      category: "math",
    },
    {
      id: "history-dates",
      title: "Исторические даты",
      description: "Проверьте знание важных исторических дат",
      icon: "📅",
      difficulty: "Средний",
      questionsCount: 25,
      comingSoon: true,
      category: "history",
    },
    {
      id: "geography",
      title: "География",
      description: "Проверьте знание географии мира",
      icon: "🌍",
      difficulty: "Средний",
      questionsCount: 18,
      comingSoon: true,
      category: "history",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Учебная платформа</h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Интерактивные тесты для проверки и улучшения ваших знаний в различных областях
        </p>
      </section>

      <section className="mb-12">
        <div className="mx-auto max-w-3xl">
          <Tabs defaultValue="language" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="language" className="flex items-center gap-2 justify-center">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Язык</span>
                </TabsTrigger>
                <TabsTrigger value="math" className="flex items-center gap-2 justify-center">
                  <Brain className="h-4 w-4" />
                  <span className="hidden sm:inline">Математика</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2 justify-center">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">История</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="language" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {tests
                  .filter((test) => test.category === "language")
                  .map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="math" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {tests
                  .filter((test) => test.category === "math")
                  .map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {tests
                  .filter((test) => test.category === "history")
                  .map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-6 shadow-sm mx-auto max-w-5xl mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">Создайте свой тест</h2>
            <p className="text-muted-foreground">Создайте собственный тест с вашими словами и заданиями</p>
          </div>
          <div className="flex-shrink-0">
            <Button asChild>
              <Link href="/custom-test" className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Создать тест</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-6 shadow-sm mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">Хотите больше тестов?</h2>
            <p className="text-muted-foreground">Мы постоянно добавляем новые тесты и улучшаем существующие</p>
          </div>
          <div className="flex-shrink-0">
            <div className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
              Подписаться на обновления
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

