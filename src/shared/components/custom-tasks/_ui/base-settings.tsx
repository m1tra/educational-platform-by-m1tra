import React from 'react';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '../../ui/card';
import { Input } from '../../ui/input';

interface BaseSettingsProps {
  title: string;
  setTitle: (e: string) => void;
  description: string;
  setDescription: (e: string) => void;
}

export const BaseSettings = ({ title, setTitle, description, setDescription }: BaseSettingsProps) => {


  return (
    <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
          <CardDescription>Введите основную информуцию о тесте</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название теста</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название теста"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание теста</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание теста"
            />
          </div>
        </CardContent>
    </Card>
  );
};
