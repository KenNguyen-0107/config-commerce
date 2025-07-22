"use client"

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

const StickyNav = ({ children, data }: {
	children: ReactNode,
	data?: Record<string, any>
}) => {
	const [topPos, setTopPos] = useState(0);

	useEffect(() => {
		const NavPrimary = document.querySelector("[data-section='NavPrimary']")
		const pos = NavPrimary?.getBoundingClientRect().height
		if (!pos) return;
		setTopPos(pos)
	}, [])

	if (!data) return null;

	return (
		<section
			data-component="PdpStickyNav"
			className="bg-[#6B8096] hidden lg:block sticky top-0 z-[8]"
			style={{ top: `${topPos}px` }}
		>
			<div className={cn(
				"container mx-auto flex justify-between items-center",
				"[&>div]:flex [&>div]:items-center [&>div:nth-child(2)]:justify-end"
			)}>
				{children}
			</div>
		</section>
	)
}

export default StickyNav;