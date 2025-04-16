import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/shared/components/ui/card";
import { TabsContent } from "@/src/shared/components/ui/tabs";

export function Courses(){
    return(
        <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Статистика по курсам</CardTitle>
                <CardDescription>Детальная информация о вовлеченности студентов в курсы</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Здесь будет отображаться детальная статистика по курсам</p>
              </CardContent>
            </Card>
        </TabsContent>
    )
}