"use client"

import { useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type]

  return (
    <div className="fixed top-5 right-5 z-50 animate-fade-in">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg`}
      >
        {message}
      </div>
    </div>
  )
}
