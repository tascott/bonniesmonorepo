"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  currentUser: User | null
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
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        console.log("User signed up:", userCredential.user)
      })
      .catch((error) => {
        console.error("Error signing up:", error.code, error.message)
        throw error
      })
  }

  async function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        console.log("User signed in:", userCredential.user)
      })
      .catch((error) => {
        console.error("Error signing in:", error.code, error.message)
        throw error
      })
  }

  async function logout() {
    return signOut(auth)
      .then(() => {
        // Sign-out successful
        console.log("User signed out")
      })
      .catch((error) => {
        console.error("Error signing out:", error)
        throw error
      })
  }

  async function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent
        console.log("Password reset email sent")
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error)
        throw error
      })
  }

  async function updateUserProfile(displayName: string, photoURL?: string) {
    if (!auth.currentUser) return

    return updateProfile(auth.currentUser, {
      displayName,
      photoURL: photoURL || auth.currentUser.photoURL,
    })
      .then(() => {
        console.log("User profile updated")
      })
      .catch((error) => {
        console.error("Error updating profile:", error)
        throw error
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

