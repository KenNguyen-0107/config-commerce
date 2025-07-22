'use client'

import { cn } from '@/lib/utils'
import React, { createContext, useContext, useState } from 'react'

type TabsContextType = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const Tabs = ({ children, defaultValue }: { children: React.ReactNode, defaultValue: string }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex items-center justify-center bg-white px-4 lg:px-0">
      {children}
    </div>
  )
}

export const TabsTrigger = ({ children, value }: { children: React.ReactNode, value: string }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const { activeTab, setActiveTab } = context

  return (
    <button 
      onClick={() => setActiveTab(value)}
      className={cn(
        "text-sm lg:text-lg text-blue uppercase",
        "bg-secondary-background hover:bg-white/30 transition-colors",
        "min-h-[70px] lg:min-h-0 px-6 py-3",
        activeTab === value
          ? 'bg-muted-background shadow-none border-t-[3px] border-t-yellow'
          : 'border-t-[3px] border-t-transparent'
      )}>
        {children}
    </button>
  )
}

export const TabsContent = ({ children, value }: { children: React.ReactNode, value: string }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab } = context

  if (activeTab !== value) return null

  return <div className="bg-muted-background py-10">{children}</div>
}

