"use client"

import { useState } from "react"
import { Play, Pause, Volume2, Settings, Maximize } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { Progress } from "@/src/shared/components/ui/progress"
import { Slider } from "@/src/shared/components/ui/slider"

interface VideoPlayerProps {
  title: string
  duration: number
}

export function VideoPlayer({ title, duration }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [currentTime, setCurrentTime] = useState(0)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-xl font-medium mb-2">{title}</div>
          <div className="text-zinc-400">Нажмите для воспроизведения</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Progress
              value={(currentTime / duration) * 100}
              className="h-1.5 flex-1 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const percent = (e.clientX - rect.left) / rect.width
                setCurrentTime(percent * duration)
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>

              <span className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex items-center gap-2">
                <Volume2 size={16} className="text-white" />
                <div className="w-20">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setVolume(value[0])}
                    className="h-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                <Settings size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                <Maximize size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
