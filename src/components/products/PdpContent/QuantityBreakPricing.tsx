"use client";

import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BreakPrice } from "./types";
interface QuantityBreakPricingProps {
	actualBreakPrices: BreakPrice[];
}

export default function QuantityBreakPricing({
	actualBreakPrices = [],
}: QuantityBreakPricingProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			<button
				aria-label="View Quantity Break Pricing"
				className={cn(
					"text-blue border-none p-0 lg:p-0 capitalize font-lora text-sm",
					(!actualBreakPrices || actualBreakPrices.length === 0) && "opacity-0 pointer-events-none"
				)}
				onClick={() => setIsModalOpen(true)}
			>
				View Quantity Break Pricing
			</button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="QUANTITY PRICING">
				<table className="table-auto w-full text-center text-lg text-black border-spacing-2 font-lora">
					<thead>
						<tr className="">
							<td className="py-2 px-3">Min Qty</td>
							<td className="py-2 px-3">Price Per</td>
							<td className="py-2 px-3"></td>
						</tr>
					</thead>
					<tbody>
						{actualBreakPrices &&
							actualBreakPrices.length > 0 &&
							actualBreakPrices.map((price, index) => (
								<tr className="border-t border-muted" key={index}>
									<td className="pt-3 pb-2 px-3">{price.breakQty}</td>
									<td className="pt-3 pb-2 px-3">{price.breakPriceDisplay}</td>
									<td className="pt-3 pb-2 px-3">{price.savingsMessage}</td>
								</tr>
							))}
					</tbody>
				</table>
			</Modal>
		</>
	);
}
