"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContextProvider"
import Toast from "../components/Toast"
import TicketForm from "../components/TicketForm"
import TicketList from "../components/TicketList"

export interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in_progress" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
}

export default function TicketManagement() {
  // const { user } = useAuth()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Load tickets from localStorage
  useEffect(() => {
    const savedTickets = localStorage.getItem("tickets")
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets))
    }
  }, [])

  // Save tickets to localStorage
  const saveTickets = (updatedTickets: Ticket[]) => {
    localStorage.setItem("tickets", JSON.stringify(updatedTickets))
    setTickets(updatedTickets)
  }

  const handleCreateTicket = (ticketData: Omit<Ticket, "id" | "createdAt">) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    saveTickets([...tickets, newTicket])
    setShowForm(false)
    setToast({ message: "Ticket created successfully!", type: "success" })
  }

  const handleUpdateTicket = (ticketData: Omit<Ticket, "id" | "createdAt">) => {
    if (!editingTicket) return
    const updatedTickets = tickets.map((t) => (t.id === editingTicket.id ? { ...t, ...ticketData } : t))
    saveTickets(updatedTickets)
    setEditingTicket(null)
    setShowForm(false)
    setToast({ message: "Ticket updated successfully!", type: "success" })
  }

  const handleDeleteTicket = (id: string) => {
    const updatedTickets = tickets.filter((t) => t.id !== id)
    saveTickets(updatedTickets)
    setDeleteConfirm(null)
    setToast({ message: "Ticket deleted successfully!", type: "success" })
  }

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingTicket(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container-max flex items-center justify-between py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ticket Management</h1>
            <p className="text-muted mt-1">Manage all your support tickets</p>
          </div>
          <button onClick={() => navigate("/dashboard")} className="btn-outline">
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-max py-12">
        {/* Create Button */}
        {!showForm && (
          <div className="mb-8">
            <button onClick={() => setShowForm(true)} className="btn-primary">
              + Create New Ticket
            </button>
          </div>
        )}

        {/* Form Section */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingTicket ? "Edit Ticket" : "Create New Ticket"}
            </h2>
            <TicketForm
              ticket={editingTicket || undefined}
              onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Tickets List */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">All Tickets ({tickets.length})</h2>
          {tickets.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-muted mb-4">No tickets yet. Create one to get started!</p>
              <button onClick={() => setShowForm(true)} className="btn-primary">
                Create First Ticket
              </button>
            </div>
          ) : (
            <TicketList tickets={tickets} onEdit={handleEditTicket} onDelete={(id) => setDeleteConfirm(id)} />
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="card max-w-sm">
              <h3 className="text-xl font-bold text-foreground mb-4">Delete Ticket?</h3>
              <p className="text-muted mb-6">This action cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => handleDeleteTicket(deleteConfirm)} className="btn-primary flex-1">
                  Delete
                </button>
                <button onClick={() => setDeleteConfirm(null)} className="btn-outline flex-1">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-40">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-12 py-8">
        <div className="container-max text-center text-muted text-sm">
          <p>&copy; 2025 TicketHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
