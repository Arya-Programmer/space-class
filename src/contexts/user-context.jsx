"use client"

import React, { createContext, useContext, useReducer } from "react"

// useContext Hook Explanation:
// useContext allows components to consume values from a React Context without
// having to pass props down through multiple component levels (prop drilling).
// It provides a way to share state globally across the component tree.

// useReducer Hook Explanation:
// useReducer is used for managing complex state logic that involves multiple
// sub-values or when the next state depends on the previous one. It's similar
// to Redux reducers - you dispatch actions to update state in a predictable way.
// It's preferred over useState when you have complex state logic.

const initialState = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      lastLogin: "2024-01-14",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Moderator",
      status: "inactive",
      lastLogin: "2024-01-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "active",
      lastLogin: "2024-01-16",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-13",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  selectedUser: null,
  loading: false,
  filter: "",
}

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload, loading: false }
    case "SET_SELECTED_USER":
      return { ...state, selectedUser: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_FILTER":
      return { ...state, filter: action.payload }
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      }
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      }
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    default:
      return state
  }
}

const UserContext = createContext()

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}
