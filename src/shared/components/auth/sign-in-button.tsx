"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";

export function SignInButton() {
    const handleSignIn = () => signIn()
    return (
        <Button onClick={handleSignIn} variant={"outline"} size={"icon"}>
            <LogInIcon className="h-4 w-4" /> 
        </Button>
    )
}