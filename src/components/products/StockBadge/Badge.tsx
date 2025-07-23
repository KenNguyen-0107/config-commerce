"use client";

import { cn } from "@/lib/utils";
import { StockType, useStockStore } from "@/store/stock-store";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type BadgeType = "sm" | "lg";
export type BadgePosition = "card" | "carousel";

const Badge = ({
	productId,
	type = "sm",
	position = "card",
}: {
	productId: string;
	type?: BadgeType;
	position?: BadgePosition;
}) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const { getStockByProductId, loading } = useStockStore();
	const [pdpCarousel, setPdpCarousel] = useState<Element | undefined>(undefined);

	const productStock = getStockByProductId(productId);
	const quantity = productStock?.qtyOnHand || 0;
	const stockType = productStock?.inventoryAvailabilityDtos[0]?.availability?.messageType;
	const stockText = productStock?.inventoryAvailabilityDtos[0]?.availability?.message;
	const badgeCommonClass = "inline-flex items-center gap-1 pl-2 pr-3 rounded";
	const badgeClassByType = type === "lg" ? "py-2 text-base" : "py-1 text-sm";

	useEffect(() => {
		const portalNode = document.querySelector("#pdp-images");
		if (!portalNode) return;
		setPdpCarousel(portalNode);
	}, []);

	useEffect(() => {
		if (loading || !elementRef.current) return;
		const parentNode = elementRef.current.parentElement;
		if (stockType === StockType.AVAILABILITY) {
			return parentNode?.remove();
		}
		parentNode?.querySelector("[data-skeleton='stock-badge']")?.remove();
	}, [loading, stockType]);

	// if (loading) return null;
	if (stockType === StockType.AVAILABILITY) return <div ref={elementRef}></div>;

	const BadgeContent = () => {
		if (!loading && quantity < 1) {
			return (
				<span
					ref={elementRef}
					className={cn(
						badgeCommonClass,
						badgeClassByType,
						pdpCarousel && position === "carousel"
							? "absolute top-2 right-2 z-[5] bg-[#9b0101] text-white"
							: "text-red bg-red/10"
					)}
				>
					<X size={18} />
					{stockText || "Out Of Stock"}
				</span>
			);
		}

		if (quantity > 0) {
			return (
				<span
					ref={elementRef}
					className={cn(
						badgeCommonClass,
						badgeClassByType,
						pdpCarousel && position === "carousel"
							? "absolute top-2 right-2 z-[5] bg-[#089900] text-white"
							: "text-green bg-green/10"
					)}
				>
					<Check size={18} />
					{stockText || "In Stock"}
				</span>
			);
		}

		return null;
	};

	if (position === "carousel" && pdpCarousel) {
		return createPortal(<BadgeContent />, pdpCarousel);
	}
	return <BadgeContent />;
};

export default Badge;
