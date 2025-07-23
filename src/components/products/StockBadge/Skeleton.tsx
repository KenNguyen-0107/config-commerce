import { cn } from "@/lib/utils";
import { BadgeType } from "./Badge";

const Skeleton = ({ type }: { type?: BadgeType }) => {
	return (
		<div
			data-skeleton="stock-badge"
			className={cn(
				"animate-pulse bg-muted-background rounded",
				type === "sm" ? "h-8 w30" : "h-10 w-32"
			)}
		></div>
	);
};

export default Skeleton;
