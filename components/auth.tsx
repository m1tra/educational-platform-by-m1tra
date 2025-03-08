"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { User } from "lucide-react";
import { useState } from "react";
const formSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  });

export function Auth() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLogDialogOpen, setIsLogDialogOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        },
      });
    
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
      }
    return(
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
            <Button variant="outline" size="icon">
                <User strokeWidth={2} className=' h-[1.2rem] w-[1.2rem]  text-secondary-foreground' />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Учебная платформа</DialogTitle>
            <DialogDescription>
              Создайте свой аккаунт.
            </DialogDescription>
          </DialogHeader>
       
          <DialogFooter className="flex justify-between w-full">
            <Button variant="link" onClick={() => { setIsLogDialogOpen(false); setIsDialogOpen(true); }}>
              Войти
            </Button>
            <Button type="submit">Зарегестрироваться</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )}