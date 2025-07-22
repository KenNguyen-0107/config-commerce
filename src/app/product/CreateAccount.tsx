"use client"

import type React from "react"

import { useState } from "react"

export default function CreateAccountForm() {
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("https://jacksonsfencing-configcommerce-d-cl.niteco.dev/api/v1/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userName,
          password,
          isSubscribed,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create account")
      }

      const data = await response.json()
      console.log("Account created successfully:", data)
      setSuccess(true)
    } catch (err) {
      setError("An error occurred while creating the account. Please try again.")
      console.error("Error creating account:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[var(--color-duck)] focus:border-[var(--color-duck)] focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="user-name" className="sr-only">
            User Name
          </label>
          <input
            id="user-name"
            name="userName"
            type="text"
            autoComplete="name"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--color-duck)] focus:border-[var(--color-duck)] focus:z-10 sm:text-sm"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--color-duck)] focus:border-[var(--color-duck)] focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[var(--color-duck)] focus:border-[var(--color-duck)] focus:z-10 sm:text-sm"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="subscribe"
          name="subscribe"
          type="checkbox"
          className="h-4 w-4 text-[var(--color-duck)] focus:ring-[var(--color-duck)] border-gray-300 rounded"
          checked={isSubscribed}
          onChange={(e) => setIsSubscribed(e.target.checked)}
        />
        <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-900">
          Subscribe to our newsletter
        </label>
      </div>

      {error && <p className="text-[var(--color-red-brown)] text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Account created successfully!</p>}

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-blue)] hover:bg-[var(--color-duck)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-duck)]"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </form>
  )
}