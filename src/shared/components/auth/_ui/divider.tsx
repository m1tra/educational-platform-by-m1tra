export function Divider({}) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-white/20" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-black px-2 text-white/50 font-mono">или войдите через</span>
      </div>
    </div>
  )
}
