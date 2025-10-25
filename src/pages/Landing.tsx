import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container-max flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-primary">TicketHub</div>
          <div className="flex gap-4">
            <Link to="/auth/login" className="btn-outline">
              Login
            </Link>
            <Link to="/auth/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Wavy background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#3b82f6"
            fillOpacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary rounded-full opacity-10"></div>
        <div className="absolute bottom-40 left-5 w-24 h-24 bg-secondary rounded-full opacity-10"></div>

        <div className="container-max relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-foreground mb-6">Manage Your Tickets Effortlessly</h1>
            <p className="text-xl text-muted mb-8">
              A modern ticket management system designed for teams. Create, track, and resolve tickets with ease.
            </p>
            <div className="flex gap-4">
              <Link to="/auth/signup" className="btn-primary text-lg">
                Start Free
              </Link>
              <Link to="/auth/login" className="btn-outline text-lg">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Ticket Creation",
                description: "Create and organize tickets with custom fields and priorities.",
                icon: "📝",
              },
              {
                title: "Real-time Updates",
                description: "Track ticket status changes and get instant notifications.",
                icon: "⚡",
              },
              {
                title: "Team Collaboration",
                description: "Work together with your team to resolve issues faster.",
                icon: "👥",
              },
            ].map((feature, idx) => (
              <div key={idx} className="card">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            Join thousands of teams using TicketHub to manage their workflow efficiently.
          </p>
          <Link to="/auth/signup" className="btn-primary text-lg inline-block">
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-gray-50 py-12">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">TicketHub</h4>
              <p className="text-muted text-sm">Modern ticket management for teams.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a href="#" className="hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a href="#" className="hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a href="#" className="hover:text-primary">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted">
            <p>&copy; 2025 TicketHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
