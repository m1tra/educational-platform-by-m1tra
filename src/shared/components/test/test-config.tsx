import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { TestConfigProps } from './test-interface'
import { Settings } from 'lucide-react'

export const TestConfig = ({
    tasks,
    taskCount,
    setTaskCount,
    onStart,
    title,
    description
}:TestConfigProps) => {  
    return (
      <div className="w-full max-w-md mx-auto">
      <Card className=" md:shadow-lg shadow-none md:border-2 border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
    
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Количество слов</h3>
              <span className="text-2xl font-bold">{taskCount}</span>
            </div>
    
            <Slider
              value={[taskCount]}
              min={1}
              max={Math.min(tasks.length)}
              step={1}
              onValueChange={(value) => setTaskCount(value[0])}
              className="py-4"
            />
    
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1</span>
              <span>Всего доступно: {tasks.length}</span>
            </div>
          </div>
    
          <div className="bg-muted/50 rounded-lg p-4 space-y-2 relative ">
            <div className="flex items-start gap-2">
              <Settings className="absolute right-3 h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Как это работает</h4>
                <p className="text-sm text-muted-foreground">
                  Вам будет предложено {taskCount} заданий, в которых нужно будет ввести правильный ответ на основе предоставленной информации.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  После 2 неправильных попыток вам будет показан правильный ответ. После 3 попыток система перейдет к
                  следующему слову.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
    
        <CardFooter>
          <Button onClick={()=>onStart(taskCount)} className="w-full">
            Начать тест
          </Button>
        </CardFooter>
      </Card>
    </div>
    )
}