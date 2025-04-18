import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { TabsContent } from "@/src/shared/components/ui/tabs";
import { CreditCard } from "lucide-react";

export function Payment(){
    return(
        <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки оплаты</CardTitle>
                <CardDescription>Управляйте вашими платежными данными и подпиской</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Текущий план</p>
                      <p className="text-sm text-muted-foreground">Профессиональный</p>
                    </div>
                    <Badge variant="secondary">Активен</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Следующий платеж: 15.05.2023</p>
                    <Button variant="outline" size="sm">
                      Изменить план
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Способы оплаты</Label>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Истекает: 12/24</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Изменить
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Email для счетов</Label>
                  <Input id="billing-email" defaultValue="ivan.petrov@example.com" />
                </div>
              </CardContent>
            </Card>
        </TabsContent>
    )
}