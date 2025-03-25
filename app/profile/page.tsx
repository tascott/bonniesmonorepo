"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, ArrowLeft, Camera } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { currentUser, updateUserProfile } = useAuth()
  const [displayName, setDisplayName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "")
      setPhotoURL(currentUser.photoURL || "")
    } else {
      router.push("/login")
    }
  }, [currentUser, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setError("")
      setSuccess("")
      setLoading(true)
      await updateUserProfile(displayName, photoURL)
      setSuccess("Profile updated successfully!")
    } catch {
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-slate-700 hover:text-orange-500">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={photoURL} alt={displayName} />
                    <AvatarFallback className="bg-[#86BBD8] text-[#2F4858] text-2xl">
                      {displayName ? displayName.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      const url = prompt("Enter image URL (for demo purposes)")
                      if (url) setPhotoURL(url)
                    }}
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change avatar</span>
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={currentUser.email || ""} disabled className="bg-slate-50" />
                    <p className="text-xs text-slate-500">Email cannot be changed</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" asChild>
                <Link href="/change-password">Change Password</Link>
              </Button>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" asChild>
                <Link href="/delete-account">Delete Account</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

