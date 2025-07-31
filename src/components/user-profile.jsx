"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useUserContext } from "../contexts/user-context"

export function UserProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useUserContext()

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
  })

  useEffect(() => {
    const user = state.users.find((u) => u.id === Number(id))
    if (user) {
      dispatch({ type: "SET_SELECTED_USER", payload: user })
      setEditForm({
        name: user.name,
        email: user.email,
        role: user.role,
      })
    }
  }, [id, state.users, dispatch])

  const user = state.selectedUser

  if (!user) {
    return (
      <div className="user-profile">
        <div className="profile-header">
          <button onClick={() => navigate("/users")} className="btn btn-secondary">
            ← Back to Users
          </button>
        </div>
        <div className="empty-state">
          <p>User not found</p>
        </div>
      </div>
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    const updatedUser = {
      ...user,
      ...editForm,
    }
    dispatch({ type: "UPDATE_USER", payload: updatedUser })
    dispatch({ type: "SET_SELECTED_USER", payload: updatedUser })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    })
    setIsEditing(false)
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <button onClick={() => navigate("/users")} className="btn btn-secondary">
          ← Back to Users
        </button>
        <h2>User Profile</h2>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="form-select"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p className="profile-email">{user.email}</p>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Role:</span>
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge status-${user.status}`}>{user.status}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Login:</span>
                  <span>{user.lastLogin}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">User ID:</span>
                  <span>{user.id}</span>
                </div>
              </div>
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
