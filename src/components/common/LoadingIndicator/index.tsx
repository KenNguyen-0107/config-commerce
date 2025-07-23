import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
	/**
	 * Size of the loading indicator in pixels
	 * @default 24
	 */
	size?: number;

	/**
	 * Color of the loading indicator
	 * @default 'currentColor'
	 */
	color?: string;

	/**
	 * Optional additional className
	 */
	className?: string;

	/**
	 * Text to display next to the spinner
	 */
	text?: string;
}

/**
 * A reusable loading indicator component using Lucide React's Loader2 icon
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
	size = 24,
	color = "currentColor",
	className = "",
	text,
}) => {
	return (
		<div className={cn("flex items-center justify-center gap-2", className)}>
			<Loader2
				size={size}
				color={color}
				className="animate-spin"
				aria-hidden="true"
			/>
			{text && <p className="text-base lg:text-md font-medium">{text}</p>}
		</div>
	);
};

export default LoadingIndicator;
