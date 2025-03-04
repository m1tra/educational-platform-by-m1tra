"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { WordLearningTest } from "@/components/word-learning"

// Word data structure
interface Word {
  withGaps: string
  correct: string
}

export default function WordLearningPage() {
  // Sample words data
  const words: Word[] = [
    { "withGaps": "аукц..он", "correct": "аукцИон" },
    { "withGaps": "б..гаж", "correct": "бАгаж" },
    { "withGaps": "б..гровый", "correct": "бАгровый" },
    { "withGaps": "б..гряный", "correct": "бАгряный" },
    { "withGaps": "б..дм..нтон", "correct": "бАдмИнтон" },
    { "withGaps": "б..л..нсировать", "correct": "бАлАнсировать" },
    { "withGaps": "б..лкон", "correct": "бАлкон" },
    { "withGaps": "б..р..льеф", "correct": "бАрЕльеф" },
    { "withGaps": "б..ск..тбол", "correct": "бАскЕтбол" },
    { "withGaps": "б..ссейн", "correct": "бАссейн" },
    { "withGaps": "б..рёза", "correct": "бЕрёза" },
    { "withGaps": "б..речь", "correct": "бЕречь" },
    { "withGaps": "б..рюзовый", "correct": "бИрюзовый" },
    { "withGaps": "б..гатый", "correct": "бОгатый" },
    { "withGaps": "б..гатырь", "correct": "бОгатырь" },
    { "withGaps": "бр..ш..ра", "correct": "брОшЮра" },
    { "withGaps": "б..лл..тень", "correct": "бЮллЕтень" },
    { "withGaps": "в..кцина", "correct": "вАкцина" },
    { "withGaps": "в..р..ант", "correct": "вАрИант" },
    { "withGaps": "в..л..с..пед", "correct": "вЕлОсИпед" },
    { "withGaps": "в..нт..лятор", "correct": "вЕнтИлятор" },
    { "withGaps": "в..рм..шель", "correct": "вЕрмИшель" },
    { "withGaps": "в..ст..бюль", "correct": "вЕстИбюль" },
    { "withGaps": "в..т..ран", "correct": "вЕтЕран" },
    { "withGaps": "в..н..грет", "correct": "вИнЕгрет" },
    { "withGaps": "в..ртуальный", "correct": "вИртуальный" },
    { "withGaps": "в..ртуоз", "correct": "вИртуоз" },
    { "withGaps": "в..траж", "correct": "вИтраж" },
    { "withGaps": "вл..делец", "correct": "влАделец" },
    { "withGaps": "возр..жать", "correct": "возрАжать" },
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

