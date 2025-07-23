"use client";

import { SmartLink } from "@/components/shared/smartLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo, useState } from "react";

interface DesktopMenuProps {
	isOpen?: boolean;
	activeItem?: string | null;
	onMouseLeave?: () => void;
	onMouseEnter?: () => void;
}

export function DesktopMenu({ isOpen, activeItem }: DesktopMenuProps) {
	const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

	const menuContent = {
		FENCING: {
			title: "GARDEN FENCE PANELS",
			description:
				"Jacksons' beautifully handcrafted fence panels are made with exact attention to detail to ensure the utmost quality and durability for a long service life, and are all guaranteed for 25 years.",
			image: "/images/FencingInstall",
			jobVacancies: { title: "Job Vacancies", href: "/jobs" },
			leftColumns: [
				{
					items: [
						{
							title: "Jaksun Solar Panel Fencing",
							href: "/fencing/solar",
							sub: [],
						},
						{
							title: "Traditional Fencing (Kit form)",
							href: "/fencing/traditional",
							sub: [
								{
									title: "Traditional Fencing (Kit form 1",
									href: "/fencing/panels",
								},
								{
									title: "Traditional Fencing (Kit form 2",
									href: "/fencing/panels",
								},
								{
									title: "Traditional Fencing (Kit form 3",
									href: "/fencing/panels",
								},
							],
						},
						{
							title: "Trellis Panels",
							href: "/fencing/trellis",
							sub: [
								{ title: "Trellis Panels 1", href: "/fencing/panels" },
								{ title: "Trellis Panels 2", href: "/fencing/panels" },
								{ title: "Trellis Panels 3", href: "/fencing/panels" },
							],
						},
						{
							title: "Posts & Accessories",
							href: "/fencing/posts",
							sub: [
								{ title: "Posts & Accessories 1", href: "/fencing/panels" },
								{ title: "Posts & Accessories 2", href: "/fencing/panels" },
								{ title: "Posts & Accessories 3", href: "/fencing/panels" },
							],
						},
						{
							title: "Equestrian Fencing",
							href: "/fencing/equestrian",
							sub: [
								{ title: "Equestrian Fencing 1", href: "/fencing/panels" },
								{ title: "Equestrian Fencing 2", href: "/fencing/panels" },
								{ title: "Equestrian Fencing 3", href: "/fencing/panels" },
							],
						},
						{
							title: "Agricultural Fencing",
							href: "/fencing/agricultural",
							sub: [
								{ title: "Agricultural Fencing 1", href: "/fencing/panels" },
								{ title: "Agricultural Fencing 2", href: "/fencing/panels" },
								{ title: "Agricultural Fencing 3", href: "/fencing/panels" },
							],
						},
						{
							title: "Security Fencing",
							href: "/fencing/security",
							sub: [
								{ title: "Security Fencing 1", href: "/fencing/panels" },
								{ title: "Security Fencing 2", href: "/fencing/panels" },
								{ title: "Security Fencing 3", href: "/fencing/panels" },
							],
						},
						{
							title: "Metal Fencing",
							href: "/fencing/metal",
							sub: [
								{ title: "Metal Fencing 1", href: "/fencing/panels" },
								{ title: "Metal Fencing 2", href: "/fencing/panels" },
								{ title: "Metal Fencing 3", href: "/fencing/panels" },
							],
						},
						{
							title: "R.O.W & Demarcation",
							href: "/fencing/row",
							sub: [
								{ title: "R.O.W & Demarcation 1", href: "/fencing/panels" },
								{ title: "R.O.W & Demarcation 2", href: "/fencing/panels" },
								{ title: "R.O.W & Demarcation 3", href: "/fencing/panels" },
							],
						},
						{
							title: "Playground & Play Area",
							href: "/fencing/playground",
							sub: [
								{ title: "Playground & Play Area 1", href: "/fencing/panels" },
								{ title: "Playground & Play Area 2", href: "/fencing/panels" },
								{ title: "Playground & Play Area 3", href: "/fencing/panels" },
							],
						},
						{
							title: "Noise Reduction Fencing",
							href: "/fencing/noise",
							sub: [
								{ title: "Noise Reduction Fencing 1", href: "/fencing/panels" },
								{ title: "Noise Reduction Fencing 2", href: "/fencing/panels" },
								{ title: "Noise Reduction Fencing 3", href: "/fencing/panels" },
							],
						},
						{
							title: "Wire Mesh & Netting",
							href: "/fencing/wire",
							sub: [
								{ title: "Wire Mesh & Netting 1", href: "/fencing/panels" },
								{ title: "Wire Mesh & Netting 2", href: "/fencing/panels" },
								{ title: "Wire Mesh & Netting 3", href: "/fencing/panels" },
							],
						},
					],
				},
			],
		},
	};
	const subMenu = [
		{
			title: "Traditional Fencing (Kit form)",
			href: "/fencing/traditional",
			sub: [
				{
					title: "Traditional Fencing (Kit form 1",
					href: "/fencing/panels",
				},
				{
					title: "Traditional Fencing (Kit form 2",
					href: "/fencing/panels",
				},
				{
					title: "Traditional Fencing (Kit form 3",
					href: "/fencing/panels",
				},
			],
		},
		{
			title: "Trellis Panels",
			href: "/fencing/trellis",
			sub: [
				{ title: "Trellis Panels 1", href: "/fencing/panels" },
				{ title: "Trellis Panels 2", href: "/fencing/panels" },
				{ title: "Trellis Panels 3", href: "/fencing/panels" },
			],
		},
		{
			title: "Posts & Accessories",
			href: "/fencing/posts",
			sub: [
				{ title: "Posts & Accessories 1", href: "/fencing/panels" },
				{ title: "Posts & Accessories 2", href: "/fencing/panels" },
				{ title: "Posts & Accessories 3", href: "/fencing/panels" },
			],
		},
		{
			title: "Equestrian Fencing",
			href: "/fencing/equestrian",
			sub: [
				{ title: "Equestrian Fencing 1", href: "/fencing/panels" },
				{ title: "Equestrian Fencing 2", href: "/fencing/panels" },
				{ title: "Equestrian Fencing 3", href: "/fencing/panels" },
			],
		},
		{
			title: "Agricultural Fencing",
			href: "/fencing/agricultural",
			sub: [
				{ title: "Agricultural Fencing 1", href: "/fencing/panels" },
				{ title: "Agricultural Fencing 2", href: "/fencing/panels" },
				{ title: "Agricultural Fencing 3", href: "/fencing/panels" },
			],
		},
		{
			title: "Security Fencing",
			href: "/fencing/security",
			sub: [
				{ title: "Security Fencing 1", href: "/fencing/panels" },
				{ title: "Security Fencing 2", href: "/fencing/panels" },
				{ title: "Security Fencing 3", href: "/fencing/panels" },
			],
		},
		{
			title: "Metal Fencing",
			href: "/fencing/metal",
			sub: [
				{ title: "Metal Fencing 1", href: "/fencing/panels" },
				{ title: "Metal Fencing 2", href: "/fencing/panels" },
				{ title: "Metal Fencing 3", href: "/fencing/panels" },
			],
		},
		{
			title: "R.O.W & Demarcation",
			href: "/fencing/row",
			sub: [
				{ title: "R.O.W & Demarcation 1", href: "/fencing/panels" },
				{ title: "R.O.W & Demarcation 2", href: "/fencing/panels" },
				{ title: "R.O.W & Demarcation 3", href: "/fencing/panels" },
			],
		},
		{
			title: "Playground & Play Area",
			href: "/fencing/playground",
			sub: [
				{ title: "Playground & Play Area 1", href: "/fencing/panels" },
				{ title: "Playground & Play Area 2", href: "/fencing/panels" },
				{ title: "Playground & Play Area 3", href: "/fencing/panels" },
			],
		},
		{
			title: "Noise Reduction Fencing",
			href: "/fencing/noise",
			sub: [
				{ title: "Noise Reduction Fencing 1", href: "/fencing/panels" },
				{ title: "Noise Reduction Fencing 2", href: "/fencing/panels" },
				{ title: "Noise Reduction Fencing 3", href: "/fencing/panels" },
			],
		},
		{
			title: "Wire Mesh & Netting",
			href: "/fencing/wire",
			sub: [
				{ title: "Wire Mesh & Netting 1", href: "/fencing/panels" },
				{ title: "Wire Mesh & Netting 2", href: "/fencing/panels" },
				{ title: "Wire Mesh & Netting 3", href: "/fencing/panels" },
			],
		},
	];

	const subM = useMemo(() => {
		let a = [{ title: "", href: "" }];
		subMenu.map((item) => {
			if (item.title === activeMenuItem) {
				a = item.sub;
			}
		});
		return a;
	}, [activeMenuItem]);

	const content = menuContent[activeItem as keyof typeof menuContent];
	if (!content || !isOpen) return null;

	return (
		<div className="absolute left-0 right-0 bg-muted-background shadow-lg">
			<div className="container py-8">
				<h2 className="text-2xl font-bold text-blue mb-6">{activeItem}</h2>
				<div className="grid grid-cols-12 gap-8">
					<div className="col-span-6 grid grid-cols-2">
						<div className="space-y-4">
							{content.leftColumns[0].items.map(
								(item: { title: string; href: string }, itemIndex: number) => (
									<SmartLink
										key={itemIndex}
										href={item.href}
										className="flex items-center gap-2 text-blue hover:text-blue/80"
										onMouseEnter={() => {
											setActiveMenuItem(item.title);
										}}
									>
										<div className={item.title === activeMenuItem ? "" : "text-muted"}>
											{item.title}
										</div>
										{item.title === activeMenuItem && (
											<Image
												width={10}
												height={8}
												alt="icon start"
												src={"/icons/arrow-hover.svg"}
											/>
										)}
									</SmartLink>
								)
							)}
						</div>
						<div className={cn("space-y-4", "pl-8")}>
							{(subM as unknown as Array<{ title: string; href: string }>).map(
								(item, itemIndex) => (
									<SmartLink
										key={itemIndex}
										href={item.href}
										className="block text-muted hover:text-muted/80"
									>
										{item.title}
									</SmartLink>
								)
							)}
						</div>
					</div>

					<div className="col-span-6 relative">
						<div className="relative h-[400px] overflow-hidden rounded-lg">
							<Image src="/images/gate.jpg" alt={content.title} fill className="object-cover" />
							<div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8">
								<h3 className="text-4xl font-bold text-white mb-4">{content.title}</h3>
								<p className="text-white mb-6 max-w-2xl">{content.description}</p>
								<Button
									variant="stroke-blue"
									className="bg-transparent text-white border-white hover:bg-white hover:text-blue"
									title="View product"
								>
									VIEW PRODUCT
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
