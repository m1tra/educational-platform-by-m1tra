import { useState } from "react";
import { Plus, Edit, Trash, Save, X, CheckCircle } from "lucide-react";


import { RadioGroupManagerProps } from "../exam-ticket-interface";
import { RadioGroup, RadioGroupItem } from "../../../../ui/radio-group";
import { Input } from "../../../../ui/input";
import { Button } from "../../../../ui/button";
import { Label } from "../../../../ui/label";



export function RadioGroupManager({radioOptions,newOption,selectedOption,setRadioOptions,setNewOption,setSelectedOption,variant}:RadioGroupManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const addRadio = () => {
    if (newOption.trim().length > 0) {
      setRadioOptions([...radioOptions, newOption.trim()]);
      setNewOption("");
    }
  };

  const deleteRadio = (index: number) => {
    setRadioOptions(radioOptions.filter((_, i) => i !== index));
    if (radioOptions[index] === selectedOption) {
      setSelectedOption(null); 
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingValue(radioOptions[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  const saveEdit = (index: number) => {
    if (editingValue.trim().length > 0) {
      const updatedOptions = [...radioOptions];
      updatedOptions[index] = editingValue.trim();
      setRadioOptions(updatedOptions);
      setEditingIndex(null);
    }
  };
  
  return (
    <RadioGroup >
      {radioOptions.map((option, index) => (
        <div key={index} className="flex items-center space-x-2 ">
          {editingIndex === index ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                placeholder="Редактировать вариант"
              />
              <Button size="icon" variant="ghost" onClick={() => saveEdit(index)}>
                <Save />
              </Button>
              <Button size="icon" variant="ghost" onClick={cancelEditing}>
                <X />
              </Button>
            </div>
          ) : (
            <>
              <RadioGroupItem
                value={option}
                id={`radio-${index}`}
                checked={selectedOption === option}
                onClick={() => setSelectedOption(option)}
              />
              {selectedOption === option && <CheckCircle size={18} className="text-green-500" />}             
              <Label
                htmlFor={`radio-${index}`}
                className={selectedOption === option ? "text-green-500 font-bold" : ""}
              >
                {option}
              </Label>
              <Button size="icon" variant="ghost" onClick={() => startEditing(index)}>
                <Edit />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => deleteRadio(index)}>
                <Trash />
              </Button>
            </>
          )}
        </div>
      ))}
      {variant==='view'&&(
      <div className="flex items-center space-x-2">
        <Input
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Введите вариант"
        />
        <Button size="icon" variant="ghost" onClick={addRadio}>
          <Plus />
        </Button>
      </div>
      )}
    </RadioGroup>
  );
}
