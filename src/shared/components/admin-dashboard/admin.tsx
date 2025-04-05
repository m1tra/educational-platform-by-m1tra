"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Header } from "./_ui/admin-header"
import { AdminTable } from "./_ui/table"
import { AdminDialog } from "./_ui/admin-dialog"

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    lastLogin: string | null;
    registeredAt: string;
  }  

// Mock data - replace with actual API calls in production

export interface rolesProps{
    value:string,
    label:string
}

const roles:rolesProps[] = [
  { value: "user", label: "Пользователь" },
  { value: "moderator", label: "Модератор" },
  { value: "admin", label: "Администратор" },
]

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

export default function AdminUsersPage() {




  const [users, setUsers] = useState<User[] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [newRole, setNewRole] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
    setLoading(true)
      try {
        const response = await fetch(`/api/users`)
        const user = await response.json()
        setUsers(user)
      } catch (error) {
        console.error('Ошибка при загрузке юзеров:', error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleRoleChange = async () => {
    console.log(1)
    if (!selectedUser) return

    setLoading(true)
    try {
      const response = await fetch(`/api/users?id=${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      })
      console.log(response)
      if (!response.ok) {
        throw new Error('Ошибка при обновлении роли')
      }

      const updatedUser = await response.json()
      console.log(response)
      setUsers(users?.map(user => user.id === updatedUser.id ? updatedUser : user) || [])
    } catch (error) {
      console.error('Ошибка при обновлении роли:', error)
    } finally {
      setLoading(false)
      setIsRoleDialogOpen(false)
    }
  }

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
  
    return matchesSearch && matchesRole && matchesStatus
  }) || []
  



  const openRoleDialog = (user:User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setIsRoleDialogOpen(true)
  }

  const formatDate = (dateString:string|null) => {
    if (!dateString) return "—"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-6">

      <Card>
        <CardHeader>
          <CardTitle>Пользователи</CardTitle>
          <CardDescription>Управляйте пользователями и их ролями на платформе.</CardDescription>
        </CardHeader>
        <CardContent>
          <Header 
            searchTerm={searchTerm} 
            roles={roles} 
            statusFilter={statusFilter} 
            roleFilter={roleFilter} 
            setSearchTerm={setSearchTerm} 
            setRoleFilter={setRoleFilter} 
            setStatusFilter={setStatusFilter} />  

          <div className="rounded-md border">
            <AdminTable filteredUsers={filteredUsers} roles={roles} statusColors={statusColors} formatDate={formatDate} openRoleDialog={openRoleDialog}/>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Показано {filteredUsers.length} из {users?.length||0} пользователей
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Предыдущая
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Следующая
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedUser && (
            <AdminDialog 
                isRoleDialogOpen={isRoleDialogOpen} 
                setIsRoleDialogOpen={setIsRoleDialogOpen} 
                selectedUser={selectedUser} 
                newRole={newRole} 
                setNewRole={setNewRole}
                handleRoleChange={handleRoleChange} 
                roles={roles}/>
      )}
    </div>
  )
}