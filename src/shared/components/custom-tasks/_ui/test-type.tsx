import React from 'react';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '../../ui/card';
import { Code, ListChecks, Type } from 'lucide-react';
import { Label } from '../../ui/label';

interface TestTypeSelectorProps {
    setSelectedValue: (e: string) => void;
}

export const TestTypeSelector = ({ setSelectedValue }: TestTypeSelectorProps) => {


  return (
    <Card>
    <CardHeader>
      <CardTitle>Тип теста</CardTitle>
      <CardDescription>Выберите тип теста который хотите создать</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div onClick={() => setSelectedValue("words")} className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
          <Type className="h-8 w-8 mb-2 text-primary" />
          <Label htmlFor="words" className="font-medium cursor-pointer">
            Пропущенная буква
          </Label>
          <span className="text-xs text-muted-foreground text-center">
            Вставте пропущенную букву
          </span>
        </div>

        <div onClick={() => setSelectedValue("examTicket")} className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
          <ListChecks className="h-8 w-8 mb-2 text-primary" />
          <Label htmlFor="word-answer" className="font-medium cursor-pointer">
            Вопрос - ответ
          </Label>
          <span className="text-xs text-muted-foreground text-center">Тест формата вопрос ответ</span>
        </div>

        <div onClick={() => setSelectedValue("code")} className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
          <Code className="h-8 w-8 mb-2 text-primary" />
          <Label htmlFor="code" className="font-medium cursor-pointer">
            Код
          </Label>
          <span className="text-xs text-muted-foreground text-center">
            Задачи по программированию со встроенным интерпретатором
          </span>
        </div>

      </div>
    </CardContent>
  </Card>
  );
};
