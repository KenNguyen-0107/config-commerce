"use client"

import type React from "react"

import { useState } from "react"

export default function ForgetPassword() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("https://jacksonsfencing-configcommerce-d-cl.niteco.dev/api/v1/sessions/current", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          resetPassword: true
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create account")
      }

      const data = await response.json()
      console.log("Account created successfully:", data)
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
          <label htmlFor="use-name" className="sr-only">
            UserName
          </label>
          <input
            id="use-name"
            name="User Name"
            type="User Name"
            autoComplete="User Name"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[var(--color-duck)] focus:border-[var(--color-duck)] focus:z-10 sm:text-sm"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-[var(--color-red-brown)] text-sm">{error}</p>}

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-blue)] hover:bg-[var(--color-duck)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-duck)]"
          disabled={loading}
        >
          {loading ? "Loading" : "Get new Password"}
        </button>
      </div>
    </form>
  )
}