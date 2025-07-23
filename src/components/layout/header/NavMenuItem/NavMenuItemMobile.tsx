"use client"

import { RowGridMap } from "@/components/widgets/BasicRow/gridMap";
import { BasicRowProps } from "@/components/widgets/BasicRow/types";
import useDevice from "@/hook/useDevice";
import { useUserEvents } from "@/hook/useUserEvents";
import { cn } from "@/lib/utils";
import { useNavMenuStore } from "@/store/nav-store";
import { useEffect, useState } from "react";

const NavMenuItemMobile: React.FC<BasicRowProps> = (props) => {
	const { children, __typename, Id, Columns, Variant } = props;
	const { isOpen } = useNavMenuStore();
	const [topPos, setTopPos] = useState(0);
	const { isMobile } = useDevice();
	const { hasUserInteracted } = useUserEvents();

	useEffect(() => {
		const NavPrimary = document.querySelector("[data-section='NavPrimary']");
		const NavSecondary = document.querySelector("[data-section='NavSecondary']");
		const pos =
			(NavPrimary?.getBoundingClientRect().height || 0) +
			(NavSecondary?.getBoundingClientRect().height || 0);
		if (!pos) return;
		setTopPos(pos);
	}, []);

	if (!isMobile || !hasUserInteracted) {
		return null;
	}

	return (
		<div
			data-component={__typename}
			data-component-id={Id}
			data-section={Variant}
			data-menu="NavMenuMobile"
			className={cn(
				"grid lg:hidden grid-cols-12 mx-auto gap-8 w-full bg-white",
				"fixed z-20 top-24 right-0"
			)}
			style={{ top: isOpen ? `${topPos}px` : 0 }}
		>
			{Array.isArray(children) ? (
				children.map((child: any, index: number) => (
					<div key={index} className={cn(RowGridMap[Columns?.[index] ?? 0])}>
						{child}
					</div>
				))
			) : (
				<>{children}</>
			)}
		</div>
	);
};

export default NavMenuItemMobile;
