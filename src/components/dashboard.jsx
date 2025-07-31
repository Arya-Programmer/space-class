import { useMemo } from "react"
import { Link } from "react-router-dom"
import { useUserContext } from "../contexts/user-context"

export function Dashboard() {
  const { state } = useUserContext()

  // useMemo for calculating dashboard statistics
  const stats = useMemo(() => {
    const totalUsers = state.users.length
    const activeUsers = state.users.filter((user) => user.status === "active").length
    const inactiveUsers = totalUsers - activeUsers
    const adminUsers = state.users.filter((user) => user.role === "Admin").length

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminUsers,
    }
  }, [state.users])

  const recentUsers = useMemo(() => {
    return state.users.sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime()).slice(0, 3)
  }, [state.users])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome to the React Hooks demonstration app</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeUsers}</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.inactiveUsers}</div>
          <div className="stat-label">Inactive Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.adminUsers}</div>
          <div className="stat-label">Admin Users</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-users">
          <h3>Recent Users</h3>
          <div className="user-list">
            {recentUsers.map((user) => (
              <div key={user.id} className="user-item">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="user-avatar" />
                <div className="user-details">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                  <div className="user-meta">
                    <span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role}</span>
                    <span className="last-login">Last login: {user.lastLogin}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/users" className="btn btn-primary">
            View All Users
          </Link>
        </div>

        <div className="hooks-explanation">
          <h3>React Hooks Used in This App</h3>
          <div className="hooks-list">
            <div className="hook-item">
              <h4>useState</h4>
              <p>Manages local component state like form inputs, toggles, and UI state.</p>
            </div>
            <div className="hook-item">
              <h4>useContext</h4>
              <p>Provides global state access without prop drilling through the component tree.</p>
            </div>
            <div className="hook-item">
              <h4>useReducer</h4>
              <p>Manages complex state logic with actions and reducers, similar to Redux.</p>
            </div>
            <div className="hook-item">
              <h4>useMemo</h4>
              <p>Optimizes performance by memoizing expensive calculations and filtering operations.</p>
            </div>
            <div className="hook-item">
              <h4>useEffect</h4>
              <p>Handles side effects like data fetching and component lifecycle events.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
