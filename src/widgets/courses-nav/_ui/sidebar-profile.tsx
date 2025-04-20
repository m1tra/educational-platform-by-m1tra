// "use client";


// import { Button } from "/src/shared/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
// import Link from "next/link";
// import { LockKeyhole, LogOut, User } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
// import { useAppSession } from "@/src/entities/session/use-app-session";
// import { SignInButton } from "../../auth/sign-in-button";
// import { Skeleton } from "@/src/shared/components/ui/skeleton"
// import { useSignOut } from "@/src/shared/hooks/use-sign-out";
// import { useUserRole } from "@/src/entities/session/use-user-role";



// export function Profile() {
//   const session = useAppSession()
//   const signOut = useSignOut()
//   const { isAdmin } = useUserRole()

//   if (session.status === "loading") return <Skeleton className="w-8 h-8 rounded-full" />

//   if (session.status === "unauthenticated") return <SignInButton/>

//   const user = session?.data?.user

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="p-px rounded-full self-center h-8 w-8">
//           <Avatar>
//             <AvatarImage src={session.data?.user?.image || ""} alt="ИП" />
//             <AvatarFallback>ИП</AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-40 mr-2">
//         <DropdownMenuLabel>
//           <p>Мой аккаунт</p>
//           <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">{session.data?.user?.name}</p>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           {isAdmin && (
//             <DropdownMenuItem asChild>
//               <Link href={`/admin`}>
//                 <LockKeyhole className="mr-2 h-4 w-4" />
//                 <span>Admin</span>
//               </Link>
//             </DropdownMenuItem>
//           )}
//           <DropdownMenuItem asChild>
//             <Link href={`/profile/${user?.id}`}>
//               <User className="mr-2 h-4 w-4" />
//               <span>Профиль</span>
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={signOut}>
//             <LogOut className="mr-2 h-4 w-4" />
//             <span>Выход</span>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
