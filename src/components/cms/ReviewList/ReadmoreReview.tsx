"use client";

import Icon from "@/components/shared/icons";
import { IReview } from "./ReviewItem";
import { useState } from "react";

export const ReadmoreReview = ({ review }: { review: IReview }) => {
	const [isReadMore, setIsReadMore] = useState(false);

	return (
		<>
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
		</>
	);
};
