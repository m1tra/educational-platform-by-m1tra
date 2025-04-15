import { Button } from "@/src/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { Separator } from "@/src/shared/components/ui/separator";
import { Switch } from "@/src/shared/components/ui/switch";
import { TabsContent } from "@/src/shared/components/ui/tabs";

export function Security(){
    return(
        <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>Управляйте настройками безопасности вашего аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Текущий пароль</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Новый пароль</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="pt-2">
                  <Button>Изменить пароль</Button>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Двухфакторная аутентификация</Label>
                      <p className="text-sm text-muted-foreground">
                        Добавьте дополнительный уровень безопасности для вашего аккаунта
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="session-timeout">Автоматический выход</Label>
                      <p className="text-sm text-muted-foreground">
                        Автоматически выходить из аккаунта после периода неактивности
                      </p>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
        </TabsContent>
    )
}