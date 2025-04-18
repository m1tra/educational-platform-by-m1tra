import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/shared/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";

export function Students(){
    return(
        <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Статистика по студентам</CardTitle>
                <CardDescription>Детальная информация о прогрессе и активности студентов</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Здесь будет отображаться детальная статистика по студентам
                </p>
              </CardContent>
            </Card>
        </TabsContent>
    )
}