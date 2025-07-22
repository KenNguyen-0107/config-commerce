'use client'

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Menu } from 'lucide-react'
import { MainMenuItems } from "./MainMenuItems"
import { AccountSection } from "./AccountSection"
import { OtherSites } from "./OtherSites"
import { FooterButtons } from "./FooterButtons"
import { SubMenu } from "./SubMenu"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  mainMenuItems: Array<{
    title: string
    href: string
    submenu?: Array<{
      title: string
      items?: Array<{ title: string; href: string }>
      href?: string
    }>
  }>
}

export function MobileMenu({ isOpen, setIsOpen, mainMenuItems }: MobileMenuProps) {
  const [currentSection, setCurrentSection] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setCurrentSection(null)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      width: "90vw",
    }),
    animate: { 
      x: 0,
      width: "90vw",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      width: "90vw",
    })
  }

  const renderMainMenu = () => (
    <motion.div
      custom={-1}
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-0 top-[8.25rem] bottom-0 z-50 bg-white lg:hidden shadow-lg"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <div className="px-6">
            <MainMenuItems 
              items={mainMenuItems} 
              setCurrentSection={setCurrentSection} 
              setIsOpen={setIsOpen} 
            />
            <AccountSection />
            <OtherSites />
          </div>
        </div>
        <FooterButtons />
      </div>
    </motion.div>
  )

  const renderSubMenu = () => {
    const currentItem = mainMenuItems.find(item => item.title === currentSection)
    if (!currentItem) return null

    return (
      <motion.div
        custom={1}
        variants={menuVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-[8.25rem] bottom-0 z-50 bg-white lg:hidden shadow-lg"
      >
        <SubMenu 
          currentSection={currentSection} 
          setCurrentSection={setCurrentSection} 
          currentItem={currentItem} 
          setIsOpen={setIsOpen} 
        />
      </motion.div>
    )
  }

  return (
    <>
      <Button
        variant="stroke-blue"
        size="icon"
        className="h-10 w-10 p-0 text-blue lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence custom={currentSection ? 1 : -1} mode="wait">
        {isOpen && (
          currentSection ? renderSubMenu() : renderMainMenu()
        )}
      </AnimatePresence>
    </>
  )
}

