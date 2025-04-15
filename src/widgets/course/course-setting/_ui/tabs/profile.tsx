import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/shared/components/ui/select";
import { TabsContent } from "@/src/shared/components/ui/tabs";
import { Textarea } from "@/src/shared/components/ui/textarea";

export function Profile(){
    return(
        <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Информация профиля</CardTitle>
                <CardDescription>Обновите информацию о вашем профиле преподавателя</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" defaultValue="Иван" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Фамилия</Label>
                    <Input id="surname" defaultValue="Петров" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ivan.petrov@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    placeholder="Расскажите о себе и своем опыте преподавания"
                    defaultValue="Преподаватель с 10-летним опытом в области программирования и математики."
                    className="min-h-32"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Специализация</Label>
                  <Select defaultValue="programming">
                    <SelectTrigger id="specialization">
                      <SelectValue placeholder="Выберите специализацию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Математика</SelectItem>
                      <SelectItem value="physics">Физика</SelectItem>
                      <SelectItem value="programming">Программирование</SelectItem>
                      <SelectItem value="languages">Языки</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Социальные сети</CardTitle>
                <CardDescription>Добавьте ссылки на ваши профили в социальных сетях</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Веб-сайт</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" placeholder="https://github.com/username" />
                </div>
              </CardContent>
            </Card>
        </TabsContent>
    )
}