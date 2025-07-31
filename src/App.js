import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import { UserProvider } from "./contexts/user-context"
import { UsersTable } from "./components/users-table"
import { UserProfile } from "./components/user-profile"
import { Dashboard } from "./components/dashboard"
import "./App.css"

function Navigation() {
  const location = useLocation()

  return (
    <nav className="nav">
      <div className="nav-brand">
        <h1>React Hooks Demo</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Dashboard
        </Link>
        <Link to="/users" className={location.pathname === "/users" ? "nav-link active" : "nav-link"}>
          Users Table
        </Link>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UsersTable />} />
              <Route path="/users/:id" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </Router>
  )
}

export default App
