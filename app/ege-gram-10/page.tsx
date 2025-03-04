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

  const words: Word[] = [
    { "withGaps": "пр..вратное", "correct": "прЕвратное" },
    { "withGaps": "пр..зирать", "correct": "прЕзирать" },
    { "withGaps": "пр..хоть", "correct": "прИхоть" },
    { "withGaps": "пр..вилегия", "correct": "прИвилегия" },
    { "withGaps": "пр..исполненный", "correct": "прЕисполненный" },
    { "withGaps": "пр..небрегать", "correct": "прЕнебрегать" },
    { "withGaps": "пр..следовать", "correct": "прЕследовать" },
    { "withGaps": "пр..нудить", "correct": "прИнудить" },
    { "withGaps": "пр..возносить", "correct": "прЕвозносить" },
    { "withGaps": "пр..мерять", "correct": "прИмерять" },
    { "withGaps": "пр..обладать", "correct": "прЕобладать" },
    { "withGaps": "пр..цениться", "correct": "прИцениться" },
    { "withGaps": "пр..страстие", "correct": "прИстрастие" },
    { "withGaps": "пр..видение", "correct": "прИвидение" },
    { "withGaps": "пр..чуда", "correct": "прИчуда" },
    { "withGaps": "пр..сяга", "correct": "прИсяга" },
    { "withGaps": "пр..пятствие", "correct": "прЕпятствие" },
    { "withGaps": "пр..словутый", "correct": "прЕсловутый" },
    { "withGaps": "пр..способиться", "correct": "прИспособиться" },
    { "withGaps": "пр..тензия", "correct": "прЕтензия" },
    { "withGaps": "пр..говор", "correct": "прИговор" },
    { "withGaps": "пр..баутка", "correct": "прИбаутка" },
    { "withGaps": "пр..вередливый", "correct": "прИвередливый" },
    { "withGaps": "пр..внести", "correct": "прИвнести" },
    { "withGaps": "пр..волье", "correct": "прИволье" },
    { "withGaps": "пр..увеличить", "correct": "прЕувеличить" },
    { "withGaps": "беспр..кословно", "correct": "беспрЕкословно" },
    { "withGaps": "пр..годиться", "correct": "прИгодиться" },
    { "withGaps": "пр..льстить(ся)", "correct": "прЕльстить(ся)" },
    { "withGaps": "пр..гожий", "correct": "прИгожий" },
    { "withGaps": "пр..зидент", "correct": "прЕзидент" },
    { "withGaps": "пр..дираться", "correct": "прИдираться" },
    { "withGaps": "пр..возмочь", "correct": "прЕвозмочь" },
    { "withGaps": "пр..ключение", "correct": "прИключение" },
    { "withGaps": "пр..рогатива", "correct": "прЕрогатива" },
    { "withGaps": "пр..лежный", "correct": "прИлежный" },
    { "withGaps": "беспр..страстный", "correct": "беспрИстрастный" },
    { "withGaps": "пр..менять", "correct": "прИменять" },
    { "withGaps": "пр..оритет", "correct": "прИоритет" },
    { "withGaps": "пр..скорбный", "correct": "прИскорбный" },
    { "withGaps": "непр..менно", "correct": "непрЕменно" },
    { "withGaps": "пр..сниться", "correct": "прИсниться" },
    { "withGaps": "пр..поднести", "correct": "прЕподнести" },
    { "withGaps": "пр..страстный", "correct": "прИстрастный" },
    { "withGaps": "пр..успеть", "correct": "прЕуспеть" },
    { "withGaps": "пр..тязание", "correct": "прИтязание" },
    { "withGaps": "пр..чудливый", "correct": "прИчудливый" },
    { "withGaps": "пр..хотливый", "correct": "прИхотливый" },
    { "withGaps": "пр..знать(ся)", "correct": "прИзнать(ся)" },
    { "withGaps": "пр..целиться", "correct": "прИцелиться" },
    { "withGaps": "пр..сечь", "correct": "прЕсечь" },
    { "withGaps": "пр..людия", "correct": "прЕлюдия" },
    { "withGaps": "пр..слушиваться", "correct": "прИслушиваться" },
    { "withGaps": "пр..смотреться", "correct": "прИсмотреться" },
    { "withGaps": "пр..выкнуть", "correct": "прИвыкнуть" },
    { "withGaps": "пр..норовиться", "correct": "прИноровиться" },
    { "withGaps": "непр..миримый", "correct": "непрИмиримый" },
    { "withGaps": "пр..мета", "correct": "прИмета" },
    { "withGaps": "непр..менно", "correct": "непрЕменно" },
    { "withGaps": "пр..готовить", "correct": "прИготовить" },
    { "withGaps": "пр..рост", "correct": "прИрост" },
    { "withGaps": "пр..умножить", "correct": "прИумножить" },
    { "withGaps": "непр..глядный", "correct": "непрИглядный" },
    { "withGaps": "пр..митивный", "correct": "прИмитивный" },
    { "withGaps": "пр..грешение", "correct": "прЕгрешение" },
    { "withGaps": "пр..вентивный", "correct": "прЕвентивный" },
    { "withGaps": "пр..налечь", "correct": "прИналечь" },
    { "withGaps": "аттр..кцион", "correct": "аттрАкцион" }
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

