import {  useState } from "react";

import {  Tag, X } from "lucide-react";;
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Badge } from "./badge";
import { cn } from "../../lib/utils";


// const TagsSkeleton = () => {
//   return (
//     <>
//       <Skeleton className="h-8 w-20 rounded-lg" />
//       <Skeleton className="h-8 w-32 rounded-lg" />
//       <Skeleton className="h-8 w-32 rounded-lg" />
//       <Skeleton className="h-8 w-20 rounded-lg" />
//       <Skeleton className="h-8 w-32 rounded-lg" />
//       <Skeleton className="h-8 w-20 rounded-lg" />
//       <Skeleton className="h-8 w-20 rounded-lg" />
//       <Skeleton className="h-8 w-32 rounded-lg" />
//     </>
//   )
// }


interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function TagInput({ tags, setTags}: TagInputProps) {
  const [tagInput, setTagInput] = useState("")

  const addTag = () => {
    const normalizedInput = tagInput.trim().toLowerCase();
    const normalizedTags = tags.map(tag => tag.toLowerCase());
  
    if (normalizedInput && !normalizedTags.includes(normalizedInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const deleteTag = () => {
    setTags([])
  }


  return (
    <div className="space-y-2">
        <Label htmlFor="tags">Тэги</Label>
        <div className="flex gap-2">
          <div className="relative w-full">
            <Input
              id="tags"
              placeholder="Добавить тег"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
              }}
            />
            <Button type="button" onClick={deleteTag} variant="link" size={"icon"} className={cn("absolute top-0 right-0") }>
              <X/>
            </Button>
          </div>
          <Button type="button" onClick={addTag} variant="outline">
            <Tag className="h-4 w-4 mr-2" />
            Добавить
          </Button>
          {/* <Button size={"icon"} variant={"outline"}><SlidersHorizontal /></Button> */}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Удалить {tag}</span>
              </button>
            </Badge>
          ))}
          {tags.length === 0 && <span className="text-sm text-muted-foreground">Нет добавленных тегов</span>}
        </div>
  </div>
  );
}
