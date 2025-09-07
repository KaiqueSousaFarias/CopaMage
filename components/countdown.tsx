"use client"

import { useState, useEffect } from "react"

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-10-19T00:00:00-03:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-4 justify-center">
      <div className="text-center">
        <div className="bg-card rounded-lg p-4 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
          <div className="text-sm text-muted-foreground">Dias</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-card rounded-lg p-4 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
          <div className="text-sm text-muted-foreground">Horas</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-card rounded-lg p-4 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
          <div className="text-sm text-muted-foreground">Min</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-card rounded-lg p-4 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
          <div className="text-sm text-muted-foreground">Seg</div>
        </div>
      </div>
    </div>
  )
}
