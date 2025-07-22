'use client'

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
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full grid-cols-3 bg-muted-background h-auto p-0 rounded-none">
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
      className={`text-sm lg:text-lg rounded-none px-6 py-3 text-blue ${
        activeTab === value
          ? 'bg-white shadow-none border-t-[3px] border-t-yellow'
          : 'border-t-[3px] border-t-transparent'
      } hover:bg-white/50 transition-colors`}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ children, value }: { children: React.ReactNode, value: string }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab } = context

  if (activeTab !== value) return null

  return <div className="mt-8">{children}</div>
}

