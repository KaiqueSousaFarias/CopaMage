"use client"

import {useState, useEffect, useRef} from "react"
import Confetti from "react-confetti"
import {useWindowSize} from "react-use"
import Link from "next/link";

export function Countdown() {
    const {width, height} = useWindowSize()
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [started, setStarted] = useState(false)
    const [ended, setEnded] = useState(false)
    const intervalRef = useRef<number | null>(null)
    useEffect(() => {
        const targetDate = new Date("2025-10-19T09:00:00-03:00").getTime()
        const endDate = new Date("2025-10-19T19:00:00-03:00").getTime()
        const updateCountdown = () => {
            const now = new Date().getTime()
            if (now > endDate) {
                setEnded(true)
                if (intervalRef.current !== null) clearInterval(intervalRef.current)
                return
            }
            if (now >= targetDate && now <= endDate) {
                setStarted(true)
                return
            }
            const difference = targetDate - now
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            } else {
                setStarted(true)
                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current)
                }
            }
        }
        updateCountdown()
        intervalRef.current = window.setInterval(updateCountdown, 1000)

        return () => {
            if (intervalRef.current !== null) clearInterval(intervalRef.current)
        }
    }, [])

    if (started) {
        return (
            <div className="relative flex justify-center items-center">
                {/* Efeito de confete sobre o contador */}
                <Confetti width={width} height={height} numberOfPieces={150} recycle={false}/>

                {/* Overlay central, sem ocupar espaço do layout */}
                <div className="absolute top-1/2 -translate-y-1/2 text-center animate-pulse">
                    <Link href="/cronograma">
                        <div
                            className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white font-extrabold text-2xl px-6 py-3 rounded-full shadow-lg">
                            🎉 O evento começou! 🎉
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

    if (ended) {
        return (
            <div className="flex flex-col items-center justify-center h-32 px-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-xl shadow-md">
            <span className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A8.001 8.001 0 014 12a8 8 0 0116 0c0 2.21-.89 4.21-2.34 5.66A7.963 7.963 0 0113 16.93z" fill="#6366f1"/>
                </svg>
                Evento encerrado!
            </span>
                <span className="text-base text-gray-600 mb-4">
                Obrigado por participar. Confira fotos e novidades:
            </span>
                <a
                    href="https://www.instagram.com/copamagejjofc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition"
                >
                    Instagram da Copa
                </a>
            </div>
        )
    }


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
