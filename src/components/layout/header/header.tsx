"use client";

import { Button } from "@/components/ui/button";
import { Phone, Search, ShoppingCart, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MenuItem } from "./MenuItem";
import { MobileMenu } from "./MobileMenu";
import { MiniCart } from "@/components/cms/MiniCart";
import { WidgetContainer } from "@/gql/graphql";

const calculators = [
  {
    title: "FENCE CALCULATOR",
    href: "/calculator/fence",
  },
  {
    title: "DECKING CALCULATOR",
    href: "/calculator/decking",
  },
  {
    title: "GATE CALCULATOR",
    href: "/calculator/gate",
  },
  {
    title: "FREE QUOTE",
    href: "/quote",
  },
  {
    title: "QUICK ORDER",
    href: "/order",
  },
];

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
          {
            title: "Fence Posts & Accessories",
            href: "/fencing/garden-panels/accessories",
          },
          {
            title: "Garden Fence Panels",
            href: "/fencing/garden-panels/garden",
          },
        ],
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
    ],
  },
  { title: "GATES", href: "/gates" },
  { title: "DECKING & LANDSCAPING", href: "/decking-landscaping" },
  { title: "SECURITY FENCING", href: "/security-fencing" },
  { title: "ACOUSTIC", href: "/acoustic" },
  { title: "INSPIRATION & ADVICE", href: "/inspiration-advice" },
  { title: "CALCULATORS", href: "/calculators" },
  { title: "INSTALLATION", href: "/installation" },
  { title: "CONTACT US", href: "/contact" },
];

const topMenuItems = [
  { title: "FENCE CALCULATOR", href: "/calculator/fence" },
  { title: "DECKING CALCULATOR", href: "/calculator/decking" },
  { title: "GATE CALCULATOR", href: "/calculator/gate" },
  { title: "FREE QUOTE", href: "/quote" },
  { title: "QUICK ORDER", href: "/order" },
  { title: "OPENING HOURS", href: "/opening-hours" },
  { title: "ABOUT US", href: "/about" },
];

const accountManagement = [
  { title: "My Account", href: "/my-account" },
  { title: "Login or Register", href: "/login-register" },
  { title: "Forgotten Password", href: "/forgotten-password" },
  { title: "Basket", href: "/basket" },
];

interface IHeaderData {
  WidgetContainer: WidgetContainer;
}

// export async function SiteHeader() {
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // const sdk = getSdk();
  // const headerData = getFirstIfExists(
  //   (await sdk.getContentByType({type: 'Header'})).B2BPage?.items
  // ) as IHeaderData;
  // const widgets = headerData?.WidgetContainer?.Widgets?.filter(
  //   (widget) => widget && Object.keys(widget).length > 0
  // ) as unknown as WidgetProps[];
  // console.log("header widgets", widgets);

  const handleMenuItemClick = (itemTitle: string) => {
    setActiveMenuItem((prevItem) =>
      prevItem === itemTitle ? null : itemTitle
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setActiveMenuItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // return (
  //   <div className="lg:block mx-auto py-20">
  //     <RenderAllWidgets factory={getFactory()} widgets={widgets} />
  //   </div>
  // );

  return (
    // <header ref={headerRef} className="sticky top-0 z-50 w-full bg-white">
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Mobile Top Navigation */}
      <div className="bg-secondary-background py-2 lg:hidden">
        <div className="container flex items-center justify-between">
          <nav className="flex items-center">
            {calculators.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs lg:text-base font-medium text-blue transition-colors hover:text-blue/80 break-words hyphens-auto basis-[20%]"
              >
                {item.title.split(" ").map((word, index) => (
                  <span key={index} className="inline-block">
                    {word}
                    {index !== item.title.split(" ").length - 1 && " "}
                  </span>
                ))}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {/* Desktop Top Navigation */}
      <div className="hidden bg-secondary-background lg:block">
        <div className="flex h-10 items-center justify-between px-2 lg:px-4">
          <div className="flex items-center space-x-6">
            <Wrench className="h-5 w-5 text-blue" />
            {topMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs lg:text-base font-medium text-blue transition-colors hover:text-blue/80"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-muted">Our other sites:</span>
            <Link
              href="/commercial"
              className="text-xs lg:text-base font-medium text-blue transition-colors hover:text-blue/80"
            >
              COMMERCIAL & HIGH SECURITY
            </Link>
            <div className="h-4 w-px bg-primary" />
            <Link
              href="/france"
              className="text-xs lg:text-base font-medium text-blue transition-colors hover:text-blue/80"
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
          <Phone className="h-6 w-6 text-blue" />
          <Link href="/" className="text-2xl font-bold text-blue">
            0800 408 2234
          </Link>
        </div>

        {/* Center - Logo */}
        <Link
          href="/product"
          className="flex items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <Image
            src="/images/logo.jpg"
            alt="Jacksons Fencing"
            width={355}
            height={36}
            priority
          />
        </Link>

        {/* Right Section - Icons and Account */}
        <div className="flex items-center space-x-3 lg:space-x-6">
          <div className="hidden lg:block">
            {/* <Link href="/sign-in" className="text-xs font-medium text-blue">
            </Link> */}
            <div className="font-medium text-blue">HELLO SIGN IN</div>
            <div className="relative group z-[1]">
              <Link href="/account" className="font-medium text-blue">
                MY ACCOUNT
              </Link>
              <div className="group-hover:block hidden absolute w-[200px] box-shadow-md">
                {accountManagement.map((item, index) => (
                  <Link
                    href={item.href}
                    className="block px-5 py-3 bg-[#f8f8f8] text-blue hover:bg-gray-300" 
                    key={index}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/contact" className="flex items-center lg:hidden">
            <Phone className="h-6 w-6 text-blue" />
          </Link>
          {/* <DarkModeToggle /> */}
          <MiniCart />
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="secondary"
            size="icon"
            buttonLabel='Search'
            className="hover:bg-transparent p-0 hover:text-blue"
          >
            <Search className="h-6 lg:h-10 w-6 lg:w-10" />
          </Button>
          <MobileMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            mainMenuItems={mainMenuItems}
          />
        </div>
      </div>

      {/* Desktop Main Navigation */}
      <div className="hidden border-t border-muted lg:block relative">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between">
            {mainMenuItems.map((item) => (
              <MenuItem
                key={item.href}
                item={item}
                isActive={activeMenuItem === item.title}
                onMouseEnter={() => setActiveMenuItem(item.title)}
                onMouseLeave={() => setActiveMenuItem(null)}
                onClick={() => handleMenuItemClick(item.title)}
                className="py-4"
                aria-expanded={activeMenuItem === item.title}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} mainMenuItems={mainMenuItems} /> */}
    </header>
  );
}
