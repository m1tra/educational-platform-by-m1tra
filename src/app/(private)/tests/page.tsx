
import { TestsList } from "@/src/shared/components/test-list/test-list"


export default async function HomePage() {

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">

      <section className="mb-12 min-h-screen ">
        <div className="mx-auto max-w-6xl">
          <TestsList />
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