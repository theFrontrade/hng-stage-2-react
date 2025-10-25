"use client"

import { useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContextProvider"

interface Ticket {
  id: string
  title: string
  status: "open" | "in_progress" | "closed"
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])

  // Load tickets from localStorage
  useEffect(() => {
    const savedTickets = localStorage.getItem("tickets")
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets))
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const totalTickets = tickets.length
  const openTickets = tickets.filter((t) => t.status === "open").length
  const resolvedTickets = tickets.filter((t) => t.status === "closed").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container-max flex items-center justify-between py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted mt-1">Welcome back, {user?.name}!</p>
          </div>
          <button onClick={handleLogout} className="btn-outline">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-max py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Total Tickets</p>
                <p className="text-4xl font-bold text-foreground mt-2">{totalTickets}</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">📋</div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Open Tickets</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{openTickets}</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">⚡</div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Resolved Tickets</p>
                <p className="text-4xl font-bold text-gray-600 mt-2">{resolvedTickets}</p>
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl">✓</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/tickets")}
              className="btn-primary text-left p-4 rounded-lg hover:bg-blue-600"
            >
              <div className="font-bold">Manage Tickets</div>
              <div className="text-sm opacity-90">Create, view, and edit tickets</div>
            </button>
            <button
              onClick={() => navigate("/tickets")}
              className="btn-secondary text-left p-4 rounded-lg hover:bg-green-600"
            >
              <div className="font-bold">View All Tickets</div>
              <div className="text-sm opacity-90">See all tickets in one place</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Tickets</h2>
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted mb-4">No tickets yet</p>
              <button onClick={() => navigate("/tickets")} className="btn-primary">
                Create Your First Ticket
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.slice(-5).map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-medium text-foreground">{ticket.title}</h3>
                  </div>
                  <span className={`status-badge status-${ticket.status}`}>{ticket.status.replace("_", " ")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-12 py-8">
        <div className="container-max text-center text-muted text-sm">
          <p>&copy; 2025 TicketHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
