import { Button } from "../../../ui/button"

const categories = ['Все курсы', 'Опубликовано', 'Черновик']

export function CoursesNavBar(){
    
    return(
        <nav className="flex gap-3">
            {categories.map((category,index)=>(
                <Button key={index} variant={"outline"}>{category}</Button>
            ))}
        </nav>
    )
}