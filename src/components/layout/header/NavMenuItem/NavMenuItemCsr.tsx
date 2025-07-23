"use client"

import { RowGridMap } from "@/components/widgets/BasicRow/gridMap";
import { BasicRowProps } from "@/components/widgets/BasicRow/types";
import useScrollPosition from "@/hook/useScrollPosistion";
import { cn } from "@/lib/utils";
import { useNavMenuStore } from "@/store/nav-store";
import { useEffect, useState } from "react";

const NavMenuItemCsr: React.FC<BasicRowProps> = (props) => {
	const { children, __typename, Id, Columns, Variant } = props;
	const { isOpen } = useNavMenuStore();
	const scrollPosition = useScrollPosition();
	const [topPos, setTopPos] = useState(0);

	useEffect(() => {
		const NavPrimary = document.querySelector("[data-section='NavPrimary']")
		const pos = NavPrimary?.getBoundingClientRect().height
		if (!pos) return;
		setTopPos(pos)
	}, [])

	if (scrollPosition <= 100) return null;

	return (
		<div
			data-component={__typename}
			data-component-id={Id}
			data-section={Variant}
			className={cn(
				"hidden lg:grid grid-cols-12 mx-auto gap-8 w-full bg-white",
				"sticky z-[9]",
				"transition-all duration-300 ease-in-out"
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

export default NavMenuItemCsr;
