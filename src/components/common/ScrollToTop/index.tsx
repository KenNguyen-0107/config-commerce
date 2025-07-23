"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const ScrollToTop = () => {
	const pathname = usePathname();

	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}
		window.scrollTo({
			top: 0,
			behavior: "instant", // default scrollbar position is
		});
	}, [pathname]); // Add pathname as dependency to trigger on route changes

	return null; // No need to render anything
};

export default ScrollToTop;
