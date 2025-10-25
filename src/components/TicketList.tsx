"use client"

import type { Ticket } from "../pages/TicketManagement"

interface TicketListProps {
  tickets: Ticket[]
  onEdit: (ticket: Ticket) => void
  onDelete: (id: string) => void
}

export default function TicketList({ tickets, onEdit, onDelete }: TicketListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-amber-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{ticket.title}</h3>
              <p className="text-muted text-sm mt-1">{ticket.description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(ticket)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(ticket.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex gap-4">
              <div>
                <span className={`status-badge status-${ticket.status}`}>{ticket.status.replace("_", " ")}</span>
              </div>
              <div>
                <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                </span>
              </div>
            </div>
            <p className="text-muted text-sm">{new Date(ticket.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
