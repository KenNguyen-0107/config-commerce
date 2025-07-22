"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { DesktopMenu } from "./DesktopMenu";

interface MenuItemProps {
  item: {
    title: string;
    href: string;
    submenu?: Array<{
      title: string;
      items?: Array<{ title: string; href: string }>;
      href?: string;
    }>;
  };
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  "aria-expanded"?: boolean;
}

export function MenuItem({
  item,
  onClick,
  className,
  "aria-expanded": ariaExpanded,
}: MenuItemProps) {
  const [activeMenuItem, setActiveMenuItem] = useState(false)

  if (!item.submenu) {
    return (
      <Link
        href={item.href}
        className={cn("text-blue hover:text-blue/80", className)}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div
      className=""
      onClick={onClick}
      onMouseEnter={() => setActiveMenuItem(true)}
      onMouseLeave={() => setActiveMenuItem(false)}
    >
      <button
        className={cn(
          "flex items-center space-x-1 text-blue hover:text-blue/80 border-b-2 ",
          activeMenuItem ? "text-yellow border-yellow" : 'border-transparent',
          className
        )}
        aria-expanded={ariaExpanded}
      >
        <span>{item.title}</span>
      </button>
      <DesktopMenu
          isOpen={!!activeMenuItem}
          activeItem={item.title}
        />
    </div>
  );
}
