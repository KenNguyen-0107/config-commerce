import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ISubLinks } from "../..";
import { SmartLink } from "@/components/shared/smartLink";

const CategoryLevelTwo = ({ subLink }: { subLink?: ISubLinks }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!subLink || !subLink.Url) return null;
	return (
		<>
			<button
				className="pl-6 pr-4 py-3 flex items-center justify-between"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<h4 className="text-blue uppercase">{subLink.Title}</h4>
				{!!subLink?.children?.length && isExpanded && <ChevronUp size={20} />}
				{!!subLink?.children?.length && !isExpanded && (
					<ChevronDown size={20} />
				)}
			</button>

			<div
				className={cn(
					"flex flex-col gap-6",
					"transition-all overflow-hidden",
					isExpanded ? "max-h-screen py-3" : "max-h-0 py-0"
				)}
			>
				<SmartLink
					href={subLink.Url || ""}
					title={subLink.Title}
					className="text-muted pl-10"
				>
					View All
				</SmartLink>
				{subLink?.children?.map((sub, index) => (
					<SmartLink
						key={index}
						title={sub.Title}
						href={sub.Url || "/"}
						className="text-muted pl-10"
					>
						{sub.Title}
					</SmartLink>
				))}
			</div>
		</>
	);
};

export default CategoryLevelTwo;
