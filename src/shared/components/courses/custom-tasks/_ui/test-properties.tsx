import React from 'react';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '../../../ui/card';
import TagInput from '../../../ui/tags';
import { DifficultySlider } from './difficulty-slider';

interface TestPropertiesProps {
    difficulty: string;
    setDifficulty: (e: string) => void;
    tags: string[];
    setTags: (e: string[]) => void;
}

export const TestProperties = ({ difficulty, setDifficulty, tags, setTags }: TestPropertiesProps) => {


  return (
    <Card>
        <CardHeader>
          <CardTitle>Свойства теста</CardTitle>
          <CardDescription>Настройте дополнительные свойства для вашего теста</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <DifficultySlider difficulty={difficulty} setDifficulty={setDifficulty}/>
          <TagInput tags={tags} setTags={setTags} />

        </CardContent>
    </Card>
  );
};
