'use client'
import { useUserRole } from "@/src/entities/session/use-user-role";
import { Wrapper } from "@/src/shared/components/custom-tasks/wrapper";


export default function EditPage(){
    const { isModerator,isAdmin } = useUserRole();
    return(
        <div className="flex min-h-screen flex-col">
            {isModerator||isAdmin ? (
                <section className="flex-1 bg-background flex justify-center">
                    <div className="container py-6 md:py-10">
                      <Wrapper />
                    </div>
                </section>
            ) : (
                <div className="text-center text-red-500">
                    У вас нет доступа к этой странице
                </div>
            )}
        </div>
    )
}