import Link from "next/link"
import { ChevronDown } from 'lucide-react'

interface MainMenuItemsProps {
  items: Array<{
    title: string
    href: string
    submenu?: Array<{
      title: string
      items?: Array<{ title: string; href: string }>
      href?: string
    }>
  }>
  setCurrentSection: (section: string) => void
  setIsOpen: (isOpen: boolean) => void
}

export function MainMenuItems({ items, setCurrentSection, setIsOpen }: MainMenuItemsProps) {
  return (
    <div className="py-4 space-y-6">
      {items.map((item) => (
        <div key={item.href}>
          {item.submenu ? (
            <button
              onClick={() => setCurrentSection(item.title)}
              className="flex items-center justify-between w-full text-blue font-medium"
            >
              <span>{item.title}</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          ) : (
            <Link
              href={item.href}
              className="block text-blue font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

