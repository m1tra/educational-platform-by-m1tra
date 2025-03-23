export default function Profile(){
    
    const stats = [
        {
            label: "Пройдено тестов",
            value: "12"
        },
        {
            label: "Средний балл",
            value: "85%"
        },
        {
            label: "В процессе",
            value: "3"
        },
        {
            label: "Достижений",
            value: "5"
        }
    ]

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-primary/20"></div>
                    <div>
                        <h1 className="text-2xl font-bold">Добро пожаловать, Username</h1>
                        <p className="text-muted-foreground">student@example.com</p>
                        <div className="mt-4">
                            <div className="flex flex-wrap gap-1">
                                {[...Array(52)].map((_, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-1">
                                        {[...Array(7)].map((_, dayIndex) => {
                                            const intensity = Math.floor(Math.random() * 4); // 0-3 для разной интенсивности
                                            return (
                                                <div
                                                    key={dayIndex}
                                                    className={`w-3 h-3 rounded-sm ${
                                                        intensity === 0 ? 'bg-muted' :
                                                        intensity === 1 ? 'bg-primary/30' :
                                                        intensity === 2 ? 'bg-primary/60' :
                                                        'bg-primary'
                                                    }`}
                                                    title="Активность"
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                    Редактировать профиль
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="p-6 rounded-xl bg-card border">
                        <p className="text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2 p-6 rounded-xl bg-card border">
                    <h2 className="text-xl font-bold mb-4">Последние тесты</h2>
                    <div className="space-y-4">
                        {[1,2,3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                                <div>
                                    <p className="font-medium">Название теста {i + 1}</p>
                                    <p className="text-sm text-muted-foreground">Пройден: 12.03.2024</p>
                                </div>
                                <p className="text-xl font-bold">95%</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="p-6 rounded-xl bg-card border">
                    <h2 className="text-xl font-bold mb-4">Достижения</h2>
                    <div className="space-y-4">
                        {[1,2,3].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                                <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                                <div>
                                    <p className="font-medium">Достижение {i + 1}</p>
                                    <p className="text-sm text-muted-foreground">Получено: 12.03.2024</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}