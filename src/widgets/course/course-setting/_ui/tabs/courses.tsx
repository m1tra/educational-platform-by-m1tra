import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Label } from "@/src/shared/components/ui/label";
import { Separator } from "@/src/shared/components/ui/separator";
import { Switch } from "@/src/shared/components/ui/switch";
import { TabsContent } from "@/src/shared/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/shared/components/ui/select";

export function Courses(){
    return(
        <TabsContent value="courses" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Настройки курсов</CardTitle>
            <CardDescription>Настройте параметры по умолчанию для ваших курсов</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-language">Язык по умолчанию</Label>
              <Select defaultValue="ru">
                <SelectTrigger id="default-language">
                  <SelectValue placeholder="Выберите язык" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-visibility">Видимость по умолчанию</Label>
              <Select defaultValue="private">
                <SelectTrigger id="default-visibility">
                  <SelectValue placeholder="Выберите видимость" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Публичный</SelectItem>
                  <SelectItem value="private">Приватный</SelectItem>
                  <SelectItem value="unlisted">По ссылке</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="comments-enabled">Комментарии</Label>
                <p className="text-sm text-muted-foreground">Разрешить комментарии к курсам по умолчанию</p>
              </div>
              <Switch id="comments-enabled" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-certificates">Автоматические сертификаты</Label>
                <p className="text-sm text-muted-foreground">
                  Автоматически выдавать сертификаты при завершении курса
                </p>
              </div>
              <Switch id="auto-certificates" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    )
}