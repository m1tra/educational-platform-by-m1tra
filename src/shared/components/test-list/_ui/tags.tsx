import {  useState } from "react";

import { Trash, X } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";

const TagsSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 w-20 rounded-lg" />
      <Skeleton className="h-8 w-32 rounded-lg" />
      <Skeleton className="h-8 w-32 rounded-lg" />
      <Skeleton className="h-8 w-20 rounded-lg" />
      <Skeleton className="h-8 w-32 rounded-lg" />
      <Skeleton className="h-8 w-20 rounded-lg" />
      <Skeleton className="h-8 w-20 rounded-lg" />
      <Skeleton className="h-8 w-32 rounded-lg" />
    </>
  )
}


interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  loading: boolean;
}

export default function TagInput({ tags, setTags, loading}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteTag, setDeleteTag] = useState<string | null>(null);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // useEffect(() => {
  //   const deleteTags = async () => {
  //     console.log(deleteTag)
  //     const response = await fetch(`/api/categories?name=${deleteTag}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     if (response.ok) {
  //       toast.success('Тег удален')
  //     } else {
  //       toast.error('Ошибка при удалении тега')
  //     }
  //   }
  //   deleteTags()
  // }, [deleteTag])

  return (
    <div className="w-full max-w-md  space-y-2">
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <TagsSkeleton/ >
        ) : (
          tags.map((tag, index) => (
            <div
              key={index}
            className="flex items-center bg-muted pl-2 gap-2  rounded-lg"
          >
            {/* <Button
              onClick={() => setDeleteTag(tag)}
              size={"icon"}
              variant={"ghost"}
              >
              <Trash></Trash>
            </Button> */}
            <span>{tag}</span>
            <Button
              onClick={() => removeTag(index)}
              size={"icon"}
              variant={"ghost"}
            >
              <X size={14} />
            </Button>
          </div>
        )))}
      </div>
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTag}
          placeholder="Введите тег и нажмите Enter"
        />
        <Button className="absolute right-0 top-1/2 -translate-y-1/2" size={"icon"} variant={"ghost"} onClick={() => setTags([])}>
          <Trash size={14} />
        </Button>
        </div>
    </div>
  );
}
