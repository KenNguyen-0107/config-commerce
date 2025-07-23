"use client";

import type React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useState, useCallback } from "react";
import useDevice from "@/hook/useDevice";
import { useUserEvents } from "@/hook/useUserEvents";

interface SmartLinkProps extends NextLinkProps {
	children?: React.ReactNode;
	title?: string;
	href: string;
	className?: string;
	target?: string;
}

const PREFETCH_DELAY = 200;

export function SmartLink({ children, href, className, ...props }: SmartLinkProps) {
	const [shouldPrefetch, setShouldPrefetch] = useState<boolean | null>(false);
	const { hasUserInteracted } = useUserEvents();
	const { isMobile } = useDevice();
	const domain = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN;

	const linkRef = useCallback(
		(node: HTMLAnchorElement | null) => {
			if (!node) return;

			if (isMobile && hasUserInteracted) {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								setShouldPrefetch(null);
								observer.disconnect();
							}
						});
					},
					{
						threshold: 1,
						rootMargin: "0px",
					}
				);

				observer.observe(node);
				return () => observer.disconnect();
			}
		},
		[hasUserInteracted, isMobile]
	);

	const handleMouseEnter = useCallback(() => {
		const timer = setTimeout(() => {
			setShouldPrefetch(null);
		}, PREFETCH_DELAY);

		return () => clearTimeout(timer);
	}, []);

	return (
		<NextLink
			ref={linkRef}
			href={href}
			className={className}
			prefetch={shouldPrefetch}
			rel={`${href.includes("https://") || href.includes("http://") ? "noopener noreferrer" : ""}`}
			{...props}
			onMouseEnter={(...args) => {
				props.onMouseEnter?.(...args);
				handleMouseEnter();
			}}
		>
			{children}
		</NextLink>
	);
}
