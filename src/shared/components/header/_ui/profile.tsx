"use client";


import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import Link from "next/link";
import { LockKeyhole, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useAppSession } from "@/src/entities/session/use-app-session";
import { SignInButton } from "../../auth/sign-in-button";
import { Skeleton } from "../../ui/skeleton";
import { useSignOut } from "@/src/shared/hooks/use-sign-out";
import { useUserRole } from "@/src/entities/session/use-user-role";



export function Profile() {
  const session = useAppSession()
  const signOut = useSignOut()
  const { isAdmin } = useUserRole()

  if (session.status === "loading") return <Skeleton className="w-8 h-8 rounded-full" />

  if (session.status === "unauthenticated") return <SignInButton/>

  const user = session?.data?.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={session.data?.user?.image || ""} alt="ИП" />
            <AvatarFallback>ИП</AvatarFallback>
          </Avatar>
          <span>{session.data?.user?.name || ""}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">{session.data?.user?.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link href={`/admin`}>
                <LockKeyhole className="mr-2 h-4 w-4" />
                <span>Admin</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user?.id}`}>
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
  )
}
