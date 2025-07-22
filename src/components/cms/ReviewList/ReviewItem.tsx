import Icon from "@/components/shared/icons";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export interface IReview {
	rating: number;
	title: string;
	text: string;
	author: string;
	timeAgo: string;
	replyDate: string;
	verified: boolean;
}

const ReviewItem = (review: IReview) => {
	const [isReadMore, setIsReadMore] = useState(false);

	return (
		<Card className="bg-muted-background p-6">
			<div className="space-y-4">
				{/* Rating and Verified */}
				<div className="flex items-center gap-3">
					<div className="flex gap-0.5">
						{[...Array(review.rating)].map((_, i) => (
							<Icon iconName="star" key={i} size={18} className="w-[18px] h-[18px]" />
						))}
					</div>
					{review.verified && (
						<span className="flex items-center gap-1 text-muted">
							<Icon iconName="greytick" size={16} viewSize={16} />
							<span className="text-xs">Verified</span>
						</span>
					)}
				</div>

				{/* Review Content */}
				<div className="space-y-2">
					<h3 className=" text-blue text-sm font-medium">{review.title}</h3>
					<p className="text-blue text-sm">{review.text}</p>
				</div>

				{/* Author and Time */}
				<div className="flex items-center gap-2">
					<span className="font-xs font-medium">{review.author}</span>
					<span className="text-sm  text-muted">{review.timeAgo}</span>
				</div>

				{/* Reply */}
				<div className="bg-white p-4 rounded-sm text-sm border-l-2 border-green">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Icon iconName="star" size={12} className="w-3 h-w-3" />
							<span className="text-blue">Reply from Jacksons Fencing</span>
						</div>

						<span className="text-sm">{review.replyDate}</span>
					</div>
					{isReadMore && (
						<div className="text-blue">
							{`Thank you for your 5* review! We're glad to hear that you found
							our online fence builder tool helpful and that you're pleased with
							the quality of our panels.`}
						</div>
					)}
				</div>

				{/* Read More */}
				<div className="text-center">
					<button
						onClick={() => setIsReadMore(!isReadMore)}
						className="text-green hover:underline text-sm font-bold"
					>
						Read more
					</button>
				</div>
			</div>
		</Card>
	);
};

export default ReviewItem;
