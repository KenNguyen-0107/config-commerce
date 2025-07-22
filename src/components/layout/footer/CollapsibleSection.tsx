'use client'

import { useState, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
}

export function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <h5 className="text-blue uppercase">{title}</h5>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue transition-transform duration-300" />
        )}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-4 flex flex-col space-y-4">{children}</div>
      </div>
    </div>
  )
}

