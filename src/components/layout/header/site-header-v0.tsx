'use client'

import { Button } from "@/components/ui/button"
import { Phone, Search, ShoppingCart, Wrench } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { DesktopMenu } from "./DesktopMenu"
import { MenuItem } from "./MenuItem"
import { MobileMenu } from "./MobileMenu"

const calculators = [
  {
    title: "FENCE CALCULATOR",
    href: "/calculator/fence"
  },
  {
    title: "DECKING CALCULATOR",
    href: "/calculator/decking"
  },
  {
    title: "GATE CALCULATOR",
    href: "/calculator/gate"
  }
]

const mainMenuItems = [
  {
    title: "FENCING",
    href: "/fencing",
    submenu: [
      {
        title: "GARDEN FENCING PANELS",
        items: [
          { title: "View all", href: "/fencing/garden-panels" },
          { title: "Fence Panels", href: "/fencing/garden-panels/panels" },
          { title: "Fence Builder", href: "/fencing/garden-panels/builder" },
          { title: "Trellis Panels", href: "/fencing/garden-panels/trellis" },
          { title: "Fence Posts & Accessories", href: "/fencing/garden-panels/accessories" },
          { title: "Garden Fence Panels", href: "/fencing/garden-panels/garden" },
        ]
      },
      { title: "JAKSUN SOLAR PANEL FENCING", href: "/fencing/solar" },
      { title: "TRADITIONAL FENCING (KIT FORM)", href: "/fencing/traditional" },
      { title: "TRELLIS PANELS", href: "/fencing/trellis" },
      { title: "POSTS & ACCESSORIES", href: "/fencing/posts" },
      { title: "EQUESTRIAN FENCING", href: "/fencing/equestrian" },
      { title: "AGRICULTURAL FENCING", href: "/fencing/agricultural" },
      { title: "SECURITY FENCING", href: "/fencing/security" },
      { title: "METAL FENCING", href: "/fencing/metal" },
      { title: "GR.O.W & DEMARCATION", href: "/fencing/grow" },
      { title: "PLAYGROUND & PLAY AREA", href: "/fencing/playground" },
      { title: "NOISE REDUCTION FENCING", href: "/fencing/noise" },
      { title: "WIRE MESH & NETTING", href: "/fencing/wire" },
    ]
  },
  { title: "GATES", href: "/gates" },
  { title: "DECKING & LANDSCAPING", href: "/decking-landscaping" },
  { title: "SECURITY FENCING", href: "/security-fencing" },
  { title: "ACOUSTIC", href: "/acoustic" },
  { title: "INSPIRATION & ADVICE", href: "/inspiration-advice" },
  { title: "CALCULATORS", href: "/calculators" },
  { title: "INSTALLATION", href: "/installation" },
  { title: "CONTACT US", href: "/contact" }
]

const topMenuItems = [
  { title: "FENCE CALCULATOR", href: "/calculator/fence" },
  { title: "DECKING CALCULATOR", href: "/calculator/decking" },
  { title: "GATE CALCULATOR", href: "/calculator/gate" },
  { title: "FREE QUOTE", href: "/quote" },
  { title: "QUICK ORDER", href: "/order" },
  { title: "OPENING HOURS", href: "/opening-hours" },
  { title: "ABOUT US", href: "/about" }
]

export function SiteHeaderV0() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  const handleMenuItemClick = (itemTitle: string) => {
    setActiveMenuItem(prevItem => prevItem === itemTitle ? null : itemTitle);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenuItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full bg-white">
      {/* Mobile Top Navigation */}
      <div className="bg-[#D8D8DD] py-2 lg:hidden">
        <div className="container flex items-center justify-between">
          <nav className="flex items-center space-x-2">
            {calculators.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-primary transition-colors hover:text-primary/80 break-words hyphens-auto"
              >
                {item.title.split(' ').map((word, index) => (
                  <span key={index} className="inline-block">
                    {word}
                    {index !== item.title.split(' ').length - 1 && ' '}
                  </span>
                ))}
              </Link>
            ))}
            <Link
              href="/quote"
              className="font-medium text-primary transition-colors hover:text-primary/80 break-words hyphens-auto"
            >
              FREE QUOTE
            </Link>
            <Link
              href="/order"
              className="font-medium text-primary transition-colors hover:text-primary/80 break-words hyphens-auto"
            >
              QUICK ORDER
            </Link>
          </nav>
        </div>
      </div>

      {/* Desktop Top Navigation */}
      <div className="hidden bg-[#D8D8DD] lg:block">
        <div className="container flex h-10 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Wrench className="h-5 w-5 text-primary" />
            {topMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-primary">Our other sites:</span>
            <Link
              href="/commercial"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              COMMERCIAL & HIGH SECURITY
            </Link>
            <div className="h-4 w-px bg-blue" />
            <Link
              href="/france"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              FRANCE
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-14 items-center justify-between lg:h-20">
        {/* Left Section - Phone number (desktop only) */}
        <div className="hidden lg:flex items-center space-x-2">
          <Phone className="h-6 w-6 text-primary" />
          <Link href="tel:0800 408 2234" className="text-2xl font-bold text-primary">
            0800 408 2234
          </Link>
        </div>

        {/* Center - Logo */}
        <Link href="/" className="flex items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Image
            src=""
            alt="Jacksons Fencing"
            width={120}
            height={32}
            className="h-8 w-auto lg:h-12"
            priority
          />
        </Link>

        {/* Right Section - Icons and Account */}
        <div className="flex items-center space-x-3 lg:space-x-6">
          <div className="hidden lg:flex items-center space-x-6">
            {/* <Link href="/sign-in" className="text-xs font-medium text-primary">
            </Link> */}
            <Link href="/account" className="text-xs font-medium text-primary">
              HELLO SIGN IN MY ACCOUNT

            </Link>
          </div>
          <Link
            href="/contact"
            className="flex items-center lg:hidden"
          >
            <Phone className="h-5 w-5 text-primary" />
          </Link>
          {/* <DarkModeToggle /> */}
          <Button
            variant="tertiary"
            size="icon"
            className="h-12 w-12 p-0 text-primary"
          >
            <ShoppingCart className="h-6 w-6" />
          </Button>
          <Button
            variant="tertiary"
            size="icon"
            className="h-12 w-12 p-0 text-primary"
          >
            <Search className="h-6 w-6" />
          </Button>
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} mainMenuItems={mainMenuItems} />
        </div>
      </div>

      {/* Desktop Main Navigation */}
      <div className="hidden border-t border-muted lg:block">
        <div className="container">
          <nav className="flex items-center justify-between py-4">
            {mainMenuItems.map((item) => (
              <MenuItem
                key={item.href}
                item={item}
                isActive={activeMenuItem === item.title}
                onClick={() => handleMenuItemClick(item.title)}
                className="py-2"
                aria-expanded={activeMenuItem === item.title}
              />
            ))}
          </nav>
        </div>
        <DesktopMenu
          isOpen={!!activeMenuItem}
          activeItem={activeMenuItem}
        />
      </div>

      {/* Mobile Menu */}
      {/*<MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} mainMenuItems={mainMenuItems} />*/}
    </header>
  )
}

