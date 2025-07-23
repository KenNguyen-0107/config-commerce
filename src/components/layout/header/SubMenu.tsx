import { useState } from "react";
//import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ChevronLeft } from "lucide-react";
import { FooterButtons } from "./FooterButtons";
import { twMerge as cn } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/shared/smartLink";

interface SubMenuProps {
	currentSection: string | null;
	setCurrentSection: (section: string | null) => void;
	currentItem: {
		title: string;
		href: string;
		submenu?: Array<{
			title: string;
			items?: Array<{ title: string; href: string }>;
			href?: string;
		}>;
	};
	setIsOpen: (isOpen: boolean) => void;
}

const expandVariants = {
	initial: { height: 0, opacity: 0 },
	animate: {
		height: "auto",
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			opacity: { duration: 0.2 },
		},
	},
	exit: {
		height: 0,
		opacity: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			opacity: { duration: 0.2 },
		},
	},
};

export function SubMenu({
	currentSection,
	setCurrentSection,
	currentItem,
	setIsOpen,
}: SubMenuProps) {
	const [expandedItems, setExpandedItems] = useState<string[]>([]);

	const toggleExpanded = (title: string) => {
		setExpandedItems((prev) =>
			prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
		);
	};

	if (!currentItem?.submenu) return null;

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between px-6 py-4 bg-[#F7F7F8]">
				<Button
					onClick={() => setCurrentSection(null)}
					className="flex items-center text-blue"
					buttonLabel={currentSection as string}
				>
					<ChevronLeft className="h-5 w-5 mr-2" />
					<span className="text-lg font-medium">{currentSection}</span>
				</Button>
			</div>
			<div className="flex-1 overflow-auto">
				<div className="px-6">
					<SmartLink
						href={`${currentItem.href}/all`}
						className="block py-6 text-blue font-medium"
						onClick={() => setIsOpen(false)}
					>
						VIEW ALL
					</SmartLink>
					{currentItem.submenu.map((submenu, index) => (
						<div key={index} className="py-6 last:border-0">
							{submenu.items ? (
								<div>
									<button
										onClick={() => toggleExpanded(submenu.title)}
										className="flex items-center justify-between w-full text-blue font-medium"
									>
										<span>{submenu.title}</span>
										<ChevronDown
											className={cn(
												"h-5 w-5 transition-transform duration-300",
												expandedItems.includes(submenu.title) && "rotate-180"
											)}
										/>
									</button>
									{expandedItems.includes(submenu.title) && (
										<div
											variants={expandVariants}
											initial="initial"
											animate="animate"
											exit="exit"
											layout
											className="overflow-hidden"
										>
											<div className="mt-4 space-y-4 pl-4">
												{submenu.items.map((item, itemIndex) => (
													<SmartLink
														key={itemIndex}
														href={item.href}
														className="block text-muted text-base"
														onClick={() => setIsOpen(false)}
													>
														{item.title}
													</SmartLink>
												))}
											</div>
										</div>
									)}
								</div>
							) : (
								<SmartLink
									href={submenu.href || "#"}
									className="block text-blue font-medium"
									onClick={() => setIsOpen(false)}
								>
									{submenu.title}
								</SmartLink>
							)}
						</div>
					))}
				</div>
			</div>
			<FooterButtons />
		</div>
	);
}
