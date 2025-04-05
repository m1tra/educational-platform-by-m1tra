'use client'
import { useUserRole } from "@/src/entities/session/use-user-role";
import AdminUsersPage from "@/src/shared/components/admin-dashboard/admin";


export default function EditPage(){
    const { isAdmin } = useUserRole();
    return(
        <div className="flex min-h-screen flex-col">
            {isAdmin ? (
                <AdminUsersPage/>
            ) : (
                <div className="text-center text-red-500">
                    У вас нет доступа к этой странице
                </div>
            )}
        </div>
    )
}