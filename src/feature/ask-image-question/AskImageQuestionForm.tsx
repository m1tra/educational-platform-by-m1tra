"use client"

import { useState, useEffect } from "react"
import Image from "next/image";

import { fetchImageDescription } from "@/src/shared/api/openrouter/service"
import { Loader2, X } from "lucide-react"
import { Card, CardContent } from "@/src/shared/components/ui/card"
import { Button } from "@/src/shared/components/ui/button"

interface AskImageQuestionFormProps {
  result: string | null
  setResult: (result: string) => void
}

export function AskImageQuestionForm({ result, setResult }: AskImageQuestionFormProps) {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile()
          if (file) {
            const reader = new FileReader()
            reader.onload = () => {
              setImage(reader.result as string)

            }
            reader.readAsDataURL(file)
          }
        }
      }
    }

    window.addEventListener("paste", handlePaste)
    return () => {
      window.removeEventListener("paste", handlePaste)
    }
  }, [setResult])

  const handleAsk = async () => {
    if (!image) return
    setLoading(true)

    try {
      const response = await fetchImageDescription({
        role: "user",
        content: [
          {
            type: "text",
            text: "You will be shown an image that contains a multiple-choice question (MCQ). Your task is to: Analyze the image and extract the question text and all answer options.Identify which answer is correct. Format the output as a single line in the following way: question_text: option1|option2|!option3Format explanation: Use a colon : after the question text.Use a vertical bar | to separate each answer option.Add an exclamation mark ! only before the correct answer (and only one correct answer).Example:If the image says: What is the capital of France?A. BerlinB. MadridC. ParisThen the output should be: What is the capital of France?: Berlin|Madrid|!ParisDo not explain your reasoning. Do not include labels like Answer: or Correct:. Just output the result in the required format.",
          },
          { type: "image_url", image_url: { url: image } },
        ],
      })

      setResult(result+response.choices?.[0]?.message?.content || "No response.")
    } catch (e) {
      console.error(e)
      setResult("Error while fetching.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {image ? (
          <Card className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-5 items-start justify-between">
                  <p className="text-sm text-muted-foreground">Изображение готово к обработке</p>
                  
                      <div className="px-6 ">
                        <div className="relative inline-block">
                          <div className="rounded-lg overflow-hidden border-2 border-purple-300 shadow-md">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt="Preview"
                              width={120}
                              height={120}
                              className="object-cover"
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 flex items-center justify-center h-6 w-6 rounded-full shadow-md bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                            onClick={()=>setImage(null)}
                          >
                            <X />
                          </Button>
                        </div>
                      </div>
                      </div>
                    
                <Button
                  onClick={handleAsk}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 w-52"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    "Распознать вопрос"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center border border-dashed rounded-lg p-8 bg-muted/30">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Нажмите Ctrl+V для вставки изображения</p>
              <p className="text-xs text-muted-foreground">Поддерживаются форматы JPG, PNG, GIF</p>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
