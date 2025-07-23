"use client";

import { LinkFields } from "@/gql/graphql";
import { useNavMenuStore } from "@/store/nav-store";
import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ISubLinks } from "../..";
import AccountMenuMobile from "../AccountMenu";
import SubMenuMobile from "./SubMenuMobile";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useDevice from "@/hook/useDevice";
import { useUserEvents } from "@/hook/useUserEvents";
export interface ExtendedLinkFields extends LinkFields {
	linksByLevel?: ISubLinks[];
}

const MegaMenuMobileContent = ({ linkItems }: { linkItems: ExtendedLinkFields[] }) => {
	const [portalElement, setPortalElement] = useState<Element | undefined>(undefined);
	const { isOpen, close } = useNavMenuStore();
	const { hasUserInteracted } = useUserEvents();
	const pathname = usePathname();

	const { isMobile } = useDevice();

	useEffect(() => {
		const navIconMobileRef = document.querySelector("#nav-mobile-icons") || document.body;
		if (!navIconMobileRef) return;
		return setPortalElement(navIconMobileRef);
	}, []);

	useEffect(() => {
		if (document.body.offsetWidth > 640) return;
		if (isOpen) {
			return document.body.classList.add("overflow-hidden");
		}

		return document.body.classList.remove("overflow-hidden");
	});

	useEffect(() => {
		close();
	}, [pathname]);

	if (!isMobile || !hasUserInteracted) {
		return null;
	}

	if (!portalElement) return null;

	return (
		<>
			{createPortal(
				<div
					className={cn(
						"flex justify-end lg:hidden",
						"absolute top-[calc(100%+14px)] -right-2",
						"w-screen h-screen",
						"overflow-x-hidden overflow-y-auto",
						isOpen ? "translate-x-0" : "translate-x-full w-0"
					)}
					data-component="MegaMenuMobile"
				>
					{isOpen && (
						<div
							className="absolute top-0 right-0 w-screen h-screen bg-black/10"
							data-component="MegaMenuMobileOverlay"
							role="button"
							onClick={() => close()}
						/>
					)}
					<div
						className={cn(
							"bg-white w-[calc(100%-40px)] relative z-20 overflow-y-auto",
							"transform transition-all ease-in-out",
							isOpen ? "translate-x-0" : "translate-x-full"
						)}
					>
						<nav className="flex flex-col relative">
							{linkItems.map((item, index) => (
								<Fragment key={index}>
									{(item?.OverrideTitle || item?.OverriddenTitle || item?.Title) && (
										<>
											{item.linksByLevel && (
												<SubMenuMobile linksByLevel={item.linksByLevel} item={item} />
											)}
										</>
									)}
								</Fragment>
							))}
						</nav>
						<AccountMenuMobile />
					</div>
				</div>,
				portalElement || document.body
			)}
		</>
	);
};

export default MegaMenuMobileContent;
