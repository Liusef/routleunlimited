"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
    targetDate: number // Unix timestamp
}

/**
 * CountdownTimer is a component that displays a countdown timer until the target date
 * @param {CountdownTimerProps} props
 * @returns {Element}
 * @constructor
 */
export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<string>("")

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate - now
            if (distance < 0 || isNaN(distance)) {
                clearInterval(timer)
                setTimeLeft("New route available!")
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24))
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((distance % (1000 * 60)) / 1000)

                // if all of these are NaN, then we are ready to refresh
                if (isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
                    clearInterval(timer)
                    setTimeLeft("New route available!")
                }

                setTimeLeft(`Refreshes in ${days}d ${hours}h ${minutes}m ${seconds}s`)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return <div className="text-sm text-zinc-400">{timeLeft}</div>
}
