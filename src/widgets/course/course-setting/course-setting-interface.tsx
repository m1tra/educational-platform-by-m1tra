"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { Tabs } from "@/src/shared/components/ui/tabs"
import { toast } from "sonner"
import { TabsNavigation } from "./_ui/tabs-navigation"
import { Profile } from "./_ui/tabs/profile"
import { Notifications } from "./_ui/tabs/notifications"
import { Payment } from "./_ui/tabs/payment"
import { Security } from "./_ui/tabs/security"


export function SettingInterface() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Имитация сохранения настроек
    setTimeout(() => {
      setIsSaving(false)
      toast("Настройки сохранены",{description: "Ваши изменения были успешно сохранены."})

    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Настройки</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>Сохранение...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Сохранить изменения
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsNavigation/>
        <Profile/>    
        <Notifications/>
        <Payment/>
        <Security/>
      </Tabs>
    </div>
  )
}
