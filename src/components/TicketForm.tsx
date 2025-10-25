"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Ticket } from "../pages/TicketManagement"

interface TicketFormProps {
  ticket?: Ticket
  onSubmit: (data: Omit<Ticket, "id" | "createdAt">) => void
  onCancel: () => void
}

export default function TicketForm({ ticket, onSubmit, onCancel }: TicketFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"open" | "in_progress" | "closed">("open")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title)
      setDescription(ticket.description)
      setStatus(ticket.status)
      setPriority(ticket.priority)
    }
  }, [ticket])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }

    if (description.length > 500) {
      newErrors.description = "Description must be less than 500 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit({
      title,
      description,
      status,
      priority,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setStatus("open")
    setPriority("medium")
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter ticket title"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter ticket description"
          rows={4}
          className={`w-full bg-white border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          <p className="text-muted text-sm ml-auto">{description.length}/500</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "open" | "in_progress" | "closed")}
            className="w-full"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
            className="w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" className="btn-primary flex-1">
          {ticket ? "Update Ticket" : "Create Ticket"}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline flex-1">
          Cancel
        </button>
      </div>
    </form>
  )
}
