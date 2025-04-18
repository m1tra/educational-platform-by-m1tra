import { SignInForm } from "@/src/shared/components/auth/sign-in-form"
import Link from "next/link"

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="container relative flex-col items-center justify-center self-center pt-12 pb-12">
        <div className="max-w-[380px] mx-auto border border-white/20 p-6">
          <div className="flex flex-col space-y-2 text-center mb-6">
            <h1 className="text-2xl font-mono tracking-tight">ВОЙТИ В АККАУНТ</h1>
          </div>
          <div className="grid gap-6">
            <SignInForm />
            <p className="px-0 text-center text-xs text-white/60">
              Нажимая продолжить вы соглашаетесь с{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-white transition-colors">
                Пользовательским соглашением
              </Link>{" "}
              и{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-white transition-colors">
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs font-mono text-white/50 hover:text-white transition-colors">
            ВЕРНУТЬСЯ НА ГЛАВНУЮ
          </Link>
        </div>
      </div>
    </div>
  )
}
