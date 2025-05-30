"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define a simple user interface that mimics the necessary parts of Firebase User
interface MockUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthContextType {
  currentUser: MockUser | null
  loading: boolean
  signup: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock implementations of auth functions
  async function signup(email: string, password: string) {
    console.log("Mock signup called with:", email)
    return Promise.resolve()
  }

  async function login(email: string, password: string) {
    console.log("Mock login called with:", email)
    return Promise.resolve()
  }

  async function logout() {
    console.log("Mock logout called")
    return Promise.resolve()
  }

  async function resetPassword(email: string) {
    console.log("Mock reset password called with:", email)
    return Promise.resolve()
  }

  async function updateUserProfile(displayName: string, photoURL?: string) {
    console.log("Mock update profile called with:", displayName, photoURL)
    return Promise.resolve()
  }

  // This effect runs once on component mount
  useEffect(() => {
    // Immediately set loading to false
    setLoading(false)
  }, [])

  const value = {
    currentUser, // Always null
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

