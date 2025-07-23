"use client";
import { useRouter } from "next/navigation"; // T
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useOrderHistoryStore } from "@/store/order-history-store";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const RenderOrderButtonSet = () => {
	const params = useParams();
	const orderId = params.orderId;
	const [togglePopup, setTogglePopup] = useState(false);
	const { orderItem } = useOrderHistoryStore();
	const router = useRouter();

	const cancelOrder = async () => {
		try {
			const response = await fetch(`/api/orders/${orderId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...orderItem, status: "CancellationRequested" }),
			});

			if (!response.ok) {
				throw new Error("Failed to cancel order");
			}
			window?.location?.reload();
			setTogglePopup(false);
		} catch (error) {
			console.error("Error cancelling order:", error);
		}
	};

	return (
		<>
			<div className="flex flex-col lg:flex-row gap-2 w-full md:w-auto md:justify-end">
				<Button
					variant="stroke-blue"
					disabled={orderItem.status === "CancellationRequested"}
					onClick={() => setTogglePopup(true)}
					buttonLabel="Cancel"
				>
					CANCEL
				</Button>
				{/* temporary hide re-order cta  */}
				{/* <Button className="px-6 py-4">RE-ORDER</Button> */}
			</div>
			<Dialog open={togglePopup} onOpenChange={setTogglePopup}>
				<DialogContent className="sm:max-w-[425px] gap-8 bg-white">
					<DialogHeader className="space-y-8">
						<DialogTitle className="text-3xl font-medium text-blue">CANCEL ORDER</DialogTitle>
						<DialogDescription className="font-lora font-medium text-lg">
							Are you sure you want to cancel this order?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-between gap-4 w-full">
						<Button
							variant="tertiary"
							className="border-blue border-[1px] text-blue h-14 basis-1/2"
							onClick={() => setTogglePopup(false)}
							buttonLabel="Cancel"
						>
							Cancel
						</Button>
						<Button
							className="h-14 sm:space-x-0 basis-1/2 !ml-0"
							onClick={cancelOrder}
							buttonLabel="Ok"
						>
							OK
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default RenderOrderButtonSet;
