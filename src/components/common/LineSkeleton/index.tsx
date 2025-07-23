import React from "react";
import { cn } from "@/lib/utils";

const LineSkeleton = ({
	width = 200,
	height = 20,
	bgColor = "#E5E7EB",
	customClass = "",
}: {
	width?: number;
	height?: number;
	bgColor?: string;
	customClass?: string;
}) => {
	return (
		<div
			className={cn("h-5 bg-gray-200 rounded animate-pulse w-48", customClass)}
			style={{ height: height, width: width, backgroundColor: bgColor }}
		></div>
	);
};

export default LineSkeleton;
