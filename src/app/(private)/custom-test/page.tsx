'use client'
import { useUserRole } from "@/src/entities/session/use-user-role";
import { Wrapper } from "@/src/shared/components/custom-tasks/wrapper";


export default function EditPage(){
    const { isModerator,isAdmin } = useUserRole();
    return(
        <div className="flex min-h-screen flex-col">
            {isModerator||isAdmin ? (
                <main className="flex-1 bg-background flex justify-center">
                    <div className="container py-6 md:py-10">
                      <div className="mb-6">
                        <h1 className="text-3xl font-bold tracking-tight">Создайте новый тест</h1>
                        <p className="mt-1 text-muted-foreground">Настройте параметры и содержание теста</p>
                      </div>
                      <Wrapper />
                    </div>
                </main>
            ) : (
                <div className="text-center text-red-500">
                    У вас нет доступа к этой странице
                </div>
            )}
        </div>
    )
}