"use client"

import { useState, useEffect } from "react"
import { Clock, CheckCircle2, PanelTop, Flame, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MiojoGuide() {
  const [activeTimer, setActiveTimer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    {
      id: "water",
      title: "Ferva a Água",
      description: "Coloque 500ml de água em uma panela e leve ao fogo alto até ferver.",
      icon: <PanelTop className="h-5 w-5" />,
      time: 180, // 3 minutes in seconds
    },
    {
      id: "noodles",
      title: "Adicione o Macarrão",
      description: "Abra o pacote e coloque o macarrão na água fervente. Adicione o tempero.",
      icon: <Flame className="h-5 w-5" />,
      time: 180, // 3 minutes in seconds
    },
    {
      id: "serve",
      title: "Sirva o Miojo",
      description: "Desligue o fogo e sirva o miojo em um prato fundo.",
      icon: <Utensils className="h-5 w-5" />,
      time: 0, // No timer needed
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (activeTimer && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1
          const step = steps.find((s) => s.id === activeTimer)
          if (step) {
            setProgress(Math.round(((step.time - newTime) / step.time) * 100))
          }
          return newTime
        })
      }, 1000)
    } else if (timeLeft === 0 && activeTimer) {
      setActiveTimer(null)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [activeTimer, timeLeft, steps])

  const startTimer = (stepId: string) => {
    const step = steps.find((s) => s.id === stepId)
    if (step) {
      setTimeLeft(step.time)
      setProgress(0)
      setActiveTimer(stepId)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Tabs defaultValue="water" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {steps.map((step) => (
            <TabsTrigger key={step.id} value={step.id} className="flex items-center gap-2">
              {step.icon}
              <span className="hidden sm:inline">{step.title.split(" ")[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {steps.map((step) => (
          <TabsContent key={step.id} value={step.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {step.icon}
                  {step.title}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {step.time > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {activeTimer === step.id ? formatTime(timeLeft) : formatTime(step.time)}
                        </span>
                      </div>
                      {activeTimer === step.id && timeLeft === 0 && (
                        <span className="flex items-center gap-1 text-sm text-green-500">
                          <CheckCircle2 className="h-4 w-4" />
                          Pronto!
                        </span>
                      )}
                    </div>
                    <Progress value={activeTimer === step.id ? progress : 0} className="h-2" />
                  </div>
                ) : (
                  <div className="flex h-16 items-center justify-center">
                    <span className="flex items-center gap-2 text-green-500">
                      <CheckCircle2 className="h-5 w-5" />
                      Seu miojo está pronto para comer!
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {step.time > 0 && (
                  <Button
                    onClick={() => startTimer(step.id)}
                    disabled={activeTimer === step.id && timeLeft > 0}
                    className="w-full"
                  >
                    {activeTimer === step.id && timeLeft > 0
                      ? "Temporizador ativo..."
                      : activeTimer === step.id && timeLeft === 0
                        ? "Iniciar novamente"
                        : "Iniciar temporizador"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="mb-2 font-medium">Dicas:</h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>Para um miojo mais saboroso, adicione um ovo durante o cozimento</li>
          <li>Você pode adicionar legumes picados para torná-lo mais nutritivo</li>
          <li>Ajuste o tempo de cozimento conforme sua preferência de textura</li>
        </ul>
      </div>
    </div>
  )
}
