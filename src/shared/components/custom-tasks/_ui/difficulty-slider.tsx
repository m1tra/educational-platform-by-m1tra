import React from 'react';
import { Label } from '../../ui/label';
import { Slider } from '../../ui/slider';

interface DifficultySliderProps {
  difficulty: string;
  setDifficulty: (e: string) => void;
}

const difficultyLevels = {
  0: 'Легко',
  50: 'Средне',
  100: 'Сложно',
};


export const DifficultySlider = ({ difficulty, setDifficulty }: DifficultySliderProps) => {
  const handleSliderChange = (value: number[]) => {
    const newDifficulty = difficultyLevels[value[0] as 0 | 50 | 100];
    setDifficulty(newDifficulty);  
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="difficulty">Уровень сложности</Label>
        <span className="text-sm text-muted-foreground">{difficulty}</span>
      </div>
      <Slider
        id="difficulty"
        defaultValue={[50]}
        max={100}
        step={50}
        className="w-full"
        onValueChange={handleSliderChange}
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Легко</span>
        <span>Средне</span>
        <span>Сложно</span>
      </div>
    </div>
  );
};
