"use client";

import type React from "react";

import { useState, useCallback } from "react";
import NextLink, { type LinkProps } from "next/link";

export function CustomLink({
  children,
  title,
  href,
}: {
  children: React.ReactNode;
  title: string;
  href: string;
}) {
  const [isPrefetched, setIsPrefetched] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!isPrefetched) {
      setIsPrefetched(true);
    }
  }, [isPrefetched]);

  return (
    <NextLink
      href={href}
      title={title}
      className="font-frutiger-bold text-blue uppercase"
      prefetch={isPrefetched}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </NextLink>
  );
}
