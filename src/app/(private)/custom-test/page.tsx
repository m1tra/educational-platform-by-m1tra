'use client'
import { useUserRole } from "@/src/entities/session/use-user-role";
import { Wrapper } from "@/src/shared/components/custom-tasks/wrapper";


export default function EditPage(){
    const { isAdmin } = useUserRole();
    return(
        <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
            {isAdmin ? (
                <Wrapper/>
            ) : (
                <div className="text-center text-red-500">
                    У вас нет доступа к этой странице
                </div>
            )}
        </div>
    )
}