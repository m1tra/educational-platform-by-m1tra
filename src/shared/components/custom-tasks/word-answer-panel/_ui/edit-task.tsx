import { Save, X } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { RadioGroupManager } from "./radio-group-manager";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image"

import { ExamTicketProps } from "../exam-ticket-interface";
import { ImageUpload } from "./image-uploader";

interface EditTaskProps {
  selectedImage: string;
  setSelectedImage: Dispatch<SetStateAction<string>>;
  item: ExamTicketProps
  editingTest: ExamTicketProps;
  setEditingTest: Dispatch<SetStateAction<ExamTicketProps>>;
  newOption: string;
  setNewOption: Dispatch<SetStateAction<string>>;
  saveEdit: (index: number) => void;
  index: number;
  setEditingIndex: Dispatch<SetStateAction<number | null>>;
}


export function EditTask({index,setEditingIndex,setSelectedImage,item,editingTest,setEditingTest,newOption,setNewOption,saveEdit}:EditTaskProps) {

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, field: "question" | "expectedOutput") => {
    setEditingTest((prev) => ({ ...prev, [field]: e.target.value }))
  }


  return (
      <div className="flex flex-col w-full gap-2">
          {item.image&&
            <Image
              src={item.image! || "/placeholder.svg"}
              alt="Preview"
              width={120}
              height={120}
              className="object-cover"
            />
          }
          <ImageUpload                 
            setSelectedImage={(base64) => {
              setSelectedImage(base64)
              setEditingTest(prev => ({ ...prev, image: base64 }))
            }}
            />

          <Label>Вопрос</Label>
          <Input value={editingTest.question} onChange={(e) => handleEditChange(e, "question")} />
          {item.options && item.options.length > 0 ? (
          <div className="space-y-2">
            <Label>Варианты ответов</Label>
            <RadioGroupManager 
              variant='edit'
              radioOptions={editingTest.options || []}
              newOption={newOption}
              setRadioOptions={(options) => setEditingTest(prev => ({...prev, options}))}
              setNewOption={setNewOption}
              selectedOption={editingTest.expectedOutput}
              setSelectedOption={(option) => setEditingTest(prev => ({...prev, expectedOutput: option || ''}))}
            />
          </div>
          ) : (
            <>
              <Label>Ответ</Label>
              <Input value={editingTest.expectedOutput} onChange={(e) => handleEditChange(e, "expectedOutput")} />
            </>
          )}
          <div className="flex justify-between gap-2">
            <Button variant="outline" size="sm" onClick={()=>setEditingIndex(null)}>
              <X className="h-4 w-4 mr-1" /> Отмена
            </Button>
            <Button variant="default" size="sm" onClick={() => saveEdit(index)}>
              <Save className="h-4 w-4 mr-1" /> Сохранить
            </Button>
          </div>
    </div>
  )
  }