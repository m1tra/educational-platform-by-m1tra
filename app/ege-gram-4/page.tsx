"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { WordLearningTest } from "@/components/tests"

// Word data structure
interface Word {
  withGaps: string
  correct: string
}

export default function WordLearningPage() {
  // Sample words data
  const words: Word[] = [
    { "withGaps": "аэропорты", "correct": "аэропОрты" },
    { "withGaps": "банты", "correct": "бАнты" },
    { "withGaps": "бороду", "correct": "бОроду" },
    { "withGaps": "бухгалтеров", "correct": "бухгАлтеров" },
    { "withGaps": "вероисповедание", "correct": "вероисповЕдание" },
    { "withGaps": "водопровод, газопровод, нефтепровод", "correct": "водопровОд, газопровОд, нефтепровОд" },
    { "withGaps": "гражданство", "correct": "граждАнство" },
    { "withGaps": "дефис", "correct": "дЕфис" },
    { "withGaps": "дешевизна", "correct": "дешевИзна" },
    { "withGaps": "диспансер", "correct": "диспансЕр" },
    { "withGaps": "договоренность", "correct": "договорЁнность" },
    { "withGaps": "документ", "correct": "докумЕнт" },
    { "withGaps": "досуг", "correct": "досУг" },
    { "withGaps": "еретик", "correct": "еретИк" },
    { "withGaps": "жалюзи", "correct": "жалюзИ" },
    { "withGaps": "значимость", "correct": "знАчимость" },
    { "withGaps": "иксы", "correct": "Иксы" },
    { "withGaps": "каталог", "correct": "каталОг" },
    { "withGaps": "квартал", "correct": "квартАл" },
    { "withGaps": "километр", "correct": "киломЕтр" },
    { "withGaps": "конусов", "correct": "кОнусов" },
    { "withGaps": "корысть", "correct": "корЫсть" },
    { "withGaps": "краны", "correct": "крАны" },
    { "withGaps": "кремень, кремня", "correct": "кремЕнь, кремнЯ" },
    { "withGaps": "лекторов", "correct": "лЕкторов" },

      
]
    


  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться на главную
        </Link>
      </div>

      <WordLearningTest
        words={words}
        title="Учим правописание слов"
        description="Заполните пропущенные буквы в словах"
      />
    </div>
  )
}

