"use client";
import { useEffect, useState } from "react";
import Icon from "@/components/shared/icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RatingCardProps } from "../RatingBlock/RatingCardCarousel";

const clampText = "line-clamp-1";

const PDPRatingItem = ({ item }: { item: RatingCardProps }) => {
	// Use null as initial state to prevent hydration mismatch
	const [expand, setExpand] = useState<boolean | null>(null);

	// Use useEffect to set the initial state on the client only
	useEffect(() => {
		setExpand(false);
	}, []);

	// Only render the component content after hydration
	if (expand === null) {
		return null;
	}

	return (
		<Card className="bg-muted-background shadow-none rounded-sm">
			<CardHeader className="p-4 pb-2 space-y-2">
				<div className="space-y-2">
					<div className="flex gap-2 items-center">
						<div className="flex gap-[2px]">
							{[...Array(item.Rating)].map((_, i) => (
								<Icon key={i} iconName="star" size={18} viewSize={18} />
							))}
						</div>
						{item.Verified && (
							<span className="text-xs text-muted flex items-center gap-1">
								<Icon iconName="greytick" size={16} viewSize={16} />
								Verified
							</span>
						)}
					</div>
					<div className="font-medium text-[#0A0F2F] text-sm">{item.Title}</div>
					<p
						className={cn("text-sm text-[#0A0F2F]", expand ? "" : clampText)}
						dangerouslySetInnerHTML={{
							__html: item.Body,
						}}
					></p>
					<div className="flex items-center text-xs gap-2">
						<span className="font-medium text-[#0A0F2F]">Gillygate,</span>
						<span className="text-muted">15 hours ago</span>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-4 pt-2">
				<div className="bg-white p-2 border-l-2 border-green">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2 text-[#0A0F2F]">
							<Icon iconName="reply" size={12} viewSize={12} />
							<span className="font-medium">Reply from Jackson Fencing</span>
						</div>
						<span className="">11 October</span>
					</div>
				</div>
				<div className="mt-2 text-center font-bold">
					{!expand && (
						<button className="text-sm text-green hover:underline" onClick={() => setExpand(true)}>
							Read more
						</button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default PDPRatingItem;
