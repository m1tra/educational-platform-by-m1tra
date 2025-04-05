import { Filter, Search, Shield } from "lucide-react";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../ui/select";
import { rolesProps } from "../admin";


interface HeaderProps{
    searchTerm:string,
    roles:rolesProps[],
    statusFilter:string,
    roleFilter:string,
    setSearchTerm:(e:string)=>void,
    setRoleFilter:(e:string)=>void,
    setStatusFilter:(e:string)=>void,
}

export function Header({searchTerm,setSearchTerm,roleFilter,setRoleFilter,roles,statusFilter,setStatusFilter}:HeaderProps) {
    return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени или email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Роль: {roleFilter === "all" ? "Все" : roles.find((r) => r.value === roleFilter)?.label}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все роли</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Статус: {statusFilter === "all" ? "Все" : statusFilter}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="inactive">Неактивные</SelectItem>
              <SelectItem value="pending">Ожидающие</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }