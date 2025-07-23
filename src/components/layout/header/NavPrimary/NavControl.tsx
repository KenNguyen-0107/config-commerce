"use client"

import useScrollPosition from "@/hook/useScrollPosistion";
import { cn } from "@/lib/utils";
import { useNavMenuStore } from "@/store/nav-store";
import { ChevronUp, Menu } from "lucide-react";

const NavControl = () => {
	const { isOpen, toggle } = useNavMenuStore();
	const scrollPosition = useScrollPosition();

	if (scrollPosition < 100) return null;

	return (
		<button
			aria-label="navbar control"
			title="navbar control"
			className={cn(
				"text-blue lg:absolute lg:top-1/2 lg:-translate-y-1/2 z-50 lg:left-2",
				"hidden lg:block"
			)}
			onClick={() => toggle()}
		>
			{isOpen ? <ChevronUp className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
		</button>
	);
};

export default NavControl;
