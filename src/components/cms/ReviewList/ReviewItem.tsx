import Icon from "@/components/shared/icons";
import { Card } from "@/components/ui/card";
import { ReadmoreReview } from "./ReadmoreReview";

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

				<ReadmoreReview review={review} />
			</div>
		</Card>
	);
};

export default ReviewItem;
