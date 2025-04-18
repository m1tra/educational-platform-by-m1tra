import React from 'react';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '../../../ui/card';
import { Label } from '../../../ui/label';
import { Tabs, TabsList, TabsTrigger } from '../../../ui/tabs';
import { TabsContent } from '../../../ui/tabs';
import { Switch } from '../../../ui/switch';

export const AdvancedSetting = () => {
  return (
    <Card>
        <CardHeader>
          <CardTitle>Расширенные настройки</CardTitle>
          <CardDescription>Настройте дополнительные параметры теста(временно не работают)</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timing">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timing">Время</TabsTrigger>
              <TabsTrigger value="scoring">Оценивание</TabsTrigger>
              <TabsTrigger value="access">Доступ</TabsTrigger>
            </TabsList>
            <TabsContent value="timing" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="time-limit">Лимит времени</Label>
                  <p className="text-sm text-muted-foreground">Установите лимит времени на выполнение теста</p>
                </div>
                <Switch id="time-limit" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="scheduled">Доступ по расписанию</Label>
                  <p className="text-sm text-muted-foreground">Сделать тест доступным в определённые даты</p>
                </div>
                <Switch id="scheduled" />
              </div>
            </TabsContent>
            <TabsContent value="scoring" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-grade">Автоматическая проверка</Label>
                  <p className="text-sm text-muted-foreground">Автоматически оценивать объективные вопросы</p>
                </div>
                <Switch id="auto-grade" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="partial-credit">Частичный балл</Label>
                  <p className="text-sm text-muted-foreground">Разрешить частичную оценку за частично правильные ответы</p>
                </div>
                <Switch id="partial-credit" />
              </div>
            </TabsContent>
            <TabsContent value="access" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-protected">Защита паролем</Label>
                  <p className="text-sm text-muted-foreground">Требовать пароль для доступа к тесту</p>
                </div>
                <Switch id="password-protected" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-results">Публичные результаты</Label>
                  <p className="text-sm text-muted-foreground">Сделать результаты теста видимыми для всех участников</p>
                </div>
                <Switch id="public-results" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>       
    </Card>
  );
};
