import { Shield, UserIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { rolesProps, User } from "../admin";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Dispatch, SetStateAction } from "react";


interface AdminDialogProps {
    isRoleDialogOpen: boolean;
    setIsRoleDialogOpen: Dispatch<SetStateAction<boolean>>;
    selectedUser: User;
    newRole: string;
    setNewRole: Dispatch<SetStateAction<string>>;
    handleRoleChange: () => void;
    roles: rolesProps[];
  }

export function AdminDialog({isRoleDialogOpen,setIsRoleDialogOpen,selectedUser,newRole,setNewRole,handleRoleChange,roles}:AdminDialogProps) {
    return (
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Изменить роль пользователя</DialogTitle>
              <DialogDescription>Изменение роли для пользователя {selectedUser.name}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium">{selectedUser.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
                </div>
              </div>

              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <Shield
                          className={`h-4 w-4 ${
                            role.value === "admin"
                              ? "text-red-500"
                              : role.value === "moderator"
                                ? "text-blue-500"
                                : "text-gray-500"
                          }`}
                        />
                        {role.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleRoleChange}>Сохранить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    );
  }