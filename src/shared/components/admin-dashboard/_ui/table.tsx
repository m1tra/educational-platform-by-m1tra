import { MoreHorizontal, Shield, UserIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Badge } from "../../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { rolesProps, User } from "../admin";

type StatusColor = {
    active: string;
    inactive: string;
    pending: string;
  };
  
  interface TableProps {
    filteredUsers: User[];
    roles: rolesProps[];
    statusColors: StatusColor;
    formatDate: (d: string|null) => string;
    openRoleDialog: (u: User) => void;
  }
  

export function AdminTable({filteredUsers,roles,statusColors,formatDate,openRoleDialog}:TableProps) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Пользователь</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Последний вход</TableHead>
            <TableHead>Дата регистрации</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                Пользователи не найдены
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield
                      className={`h-4 w-4 ${
                        user.role === "ADMIN"
                          ? "text-red-500"
                          : user.role === "MODERATOR"
                            ? "text-blue-500"
                            : "text-gray-500"
                      }`}
                    />
                    <span>{roles.find((r) => r.value === user.role)?.label || user.role}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[user.status] || "bg-foreground"}>
                    {user.status === "active" ? "Активен" : user.status === "inactive" ? "Неактивен" : "Ожидает"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.lastLogin)}</TableCell>
                <TableCell>{formatDate(user.registeredAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Открыть меню</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Действия</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => openRoleDialog(user)}>Изменить роль</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Просмотреть профиль</DropdownMenuItem>
                      <DropdownMenuItem>Отправить сообщение</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Заблокировать пользователя</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  }