"use client";

import ReviewItem, { IReview } from "./ReviewItem";
import Icon from "@/components/shared/icons";
import { SmartLink } from "@/components/shared/smartLink";

const reviews: IReview[] = [
	{
		rating: 5,
		title: "Excellent Service",
		text: "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
		author: "Gillygate",
		timeAgo: "15 hours ago",
		replyDate: "11 October",
		verified: true,
	},
	{
		rating: 5,
		title: "Excellent Service",
		text: "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
		author: "Gillygate",
		timeAgo: "15 hours ago",
		replyDate: "11 October",
		verified: true,
	},
];

export default function TrustpilotWidget() {
	return (
		<div className="w-full bg-[#186684] px-4 py-8 lg:py-12">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* Header */}
				<div className="space-y-4 text-center">
					<h2 className="text-white text-2xl lg:text-3xl font-bold tracking-wide">
						TRUSTPILOT
					</h2>
					<div className="space-y-2">
						<div className="flex items-center justify-center gap-2">
							<span className="text-white text-[28px] font-light">
								Excellent
							</span>
							<div className="flex gap-0.5">
								{[...Array(5)].map((_, i) => (
									<Icon
										iconName="star"
										key={i}
										size={10}
										className="w-10 h-10"
									/>
								))}
							</div>
						</div>
						<div className="flex items-center justify-center gap-2 text-white font-xs font-helvetical">
							<span>Based on</span>
							<SmartLink href="#" className="underline">
								3,405 reviews
							</SmartLink>
						</div>
					</div>
				</div>

				{/* Reviews */}
				<div className="space-y-4">
					{reviews.map((review, index) => (
						<ReviewItem key={index} {...review} />
					))}
				</div>
			</div>
		</div>
	);
}
