import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Label } from "@/src/shared/components/ui/label";
import { Separator } from "@/src/shared/components/ui/separator";
import { Switch } from "@/src/shared/components/ui/switch";
import { TabsContent } from "@/src/shared/components/ui/tabs";

export function Notifications(){
    return(
        <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
                <CardDescription>Настройте, какие уведомления вы хотите получать</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email уведомления</Label>
                      <p className="text-sm text-muted-foreground">Получать уведомления по электронной почте</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="student-join">Новые студенты</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомления о новых студентах, присоединившихся к вашим курсам
                      </p>
                    </div>
                    <Switch id="student-join" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="course-completion">Завершение курса</Label>
                      <p className="text-sm text-muted-foreground">Уведомления о студентах, завершивших ваши курсы</p>
                    </div>
                    <Switch id="course-completion" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comments">Комментарии</Label>
                      <p className="text-sm text-muted-foreground">Уведомления о новых комментариях к вашим курсам</p>
                    </div>
                    <Switch id="comments" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Маркетинговые уведомления</Label>
                      <p className="text-sm text-muted-foreground">Получать информацию о новых функциях и предложениях</p>
                    </div>
                    <Switch id="marketing" />
                  </div>
                </div>
              </CardContent>
            </Card>
        </TabsContent>
    )
}