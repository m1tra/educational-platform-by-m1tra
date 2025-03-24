"use client";


import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useAppSession } from "@/src/entities/session/use-app-session";
import { SignInButton } from "../../auth/sign-in-button";
import { Skeleton } from "../../ui/skeleton";
import { useSignOut } from "@/src/shared/hooks/use-sign-out";



export function Profile() {
  const session = useAppSession()
  const signOut = useSignOut()

  if (session.status === "loading") return <Skeleton className="w-8 h-8 rounded-full" />

  if (session.status === "unauthenticated") return <SignInButton />
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8"
        >
        <Avatar>
            <AvatarImage src={session.data?.user?.image || ""} alt="EP" />
            <AvatarFallback>EP</AvatarFallback>
        </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mr-2 ">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {session.data?.user?.name}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/123`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}