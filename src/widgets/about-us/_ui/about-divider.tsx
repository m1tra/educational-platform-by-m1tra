export function AboutUsDivider(){
    return(
        <div className="container mx-auto px-4 py-12 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: "01", label: "ТЕСТЫ" },
                { number: "02", label: "КУРСЫ" },
                { number: "03", label: "ИИ" },
                { number: "04", label: "УПРАВЛЕНИЕ" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-mono font-bold">{item.number}</span>
                  <span className="text-white/50 text-sm mt-2 font-mono">{item.label}</span>
                </div>
              ))}
            </div>
        </div>
    )
}