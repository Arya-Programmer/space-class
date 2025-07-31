"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../contexts/user-context"

export function UsersTable() {
  const { state, dispatch } = useUserContext()
  const navigate = useNavigate()

  // Local state
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
  })

  // Filter & sort users (memoized)
  const filteredAndSortedUsers = useMemo(() => {
    const filtered = state.users.filter(
      (user) =>
        user.name.toLowerCase().includes(state.filter.toLowerCase()) ||
        user.email.toLowerCase().includes(state.filter.toLowerCase()) ||
        user.role.toLowerCase().includes(state.filter.toLowerCase()),
    )

    return filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [state.users, state.filter, sortField, sortDirection])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch({ type: "DELETE_USER", payload: id })
    }
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    if (newUser.name && newUser.email) {
      const user = {
        id: Date.now(),
        ...newUser,
        status: "active",
        lastLogin: new Date().toISOString().split("T")[0],
        avatar: `/placeholder.svg?height=40&width=40&query=${newUser.name}`,
      }
      dispatch({ type: "ADD_USER", payload: user })
      setNewUser({ name: "", email: "", role: "User" })
      setShowAddForm(false)
    }
  }

  const toggleUserStatus = (user) => {
    dispatch({
      type: "UPDATE_USER",
      payload: {
        ...user,
        status: user.status === "active" ? "inactive" : "active",
      },
    })
  }

  return (
    <div className="users-table-container">
      <div className="table-header">
        <h2>Users Management</h2>
        <div className="table-controls">
          <input
            type="text"
            placeholder="Search users..."
            value={state.filter}
            onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value })}
            className="search-input"
          />
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary">
            Add User
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-user-form">
          <h3>Add New User</h3>
          <form onSubmit={handleAddUser}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="form-input"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="form-input"
                required
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="form-select"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")} className="sortable">
                Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("email")} className="sortable">
                Email {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("role")} className="sortable">
                Role {sortField === "role" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("status")} className="sortable">
                Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("lastLogin")} className="sortable">
                Last Login {sortField === "lastLogin" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="user-avatar" />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge status-${user.status}`}>{user.status}</span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => navigate(`/users/${user.id}`)} className="btn btn-sm btn-info">
                      View
                    </button>
                    <button
                      onClick={() => toggleUserStatus(user)}
                      className={`btn btn-sm ${user.status === "active" ? "btn-warning" : "btn-success"}`}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedUsers.length === 0 && (
        <div className="empty-state">
          <p>No users found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}
