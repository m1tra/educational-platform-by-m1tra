import { ImageIcon, X } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import Image from "next/image"
import { useRef, useState } from "react";

interface ImageUploadProps {
    setSelectedImage: (base64: string) => void;
  }

export function ImageUpload({setSelectedImage}:ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview,setImagePreview] = useState<string>()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            setSelectedImage(base64String);
            setImagePreview(base64String)
          };
      
          reader.readAsDataURL(file);
        }
        };

    const clearImage = () => {
        setSelectedImage("")
        if (fileInputRef.current) fileInputRef.current.value = ""
      }
    
    return (
        <>
            {imagePreview && (
                <div className="py-3">
                  <div className="relative inline-block">
                    <div className="rounded-lg overflow-hidden border-2 shadow-md">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={120}
                        height={120}
                        className="object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-md bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                      onClick={clearImage}
                    >
                      <X/>
                    </Button>
                  </div>
                </div>
          )}
            <Button
                onClick={() => fileInputRef.current?.click()}
                size={"icon"}
            >
                <ImageIcon className="h-5 w-5" />
            </Button>
            <Input type="file" accept="image/*" className="hidden" ref={fileInputRef}  onChange={handleImageChange}/>
       </>
    )
  }