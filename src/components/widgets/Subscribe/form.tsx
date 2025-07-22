'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { SubscribeFormProps } from "./types"

export default function SubscribeForm(props: SubscribeFormProps) {
  const { label, placeholder } = props

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Implement your newsletter subscription logic here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setEmail("")
      // Show success message or handle accordingly
    } catch (error) {
      // Handle error
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

	return (
		<form onSubmit={handleSubmit} className="max-w-[400px] mx-auto mt-10">
      <div className="flex flex-col gap-10">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="font-lora h-14 p-4 rounded border-[#8C8B9080] border-opacity-50 placeholder:text-muted placeholder:opacity-80 text-base bg-white"
        />
        
        <Button 
          type="submit"
          disabled={isSubmitting}
          variant={"primary"}
          className="w-full h-12"
        >
          {label}
        </Button>
      </div>
    </form>
	)
}