"use client";

import * as React from "react";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface TabCartProps {
	onCheckout?: () => void;
	onContinueShopping?: () => void;
	onSave?: () => void;
}

export default function CartNavBasket({ onCheckout, onContinueShopping, onSave }: TabCartProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isBasketOpen, setIsBasketOpen] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState("payment");
	const [quantity, setQuantity] = React.useState(1);
	const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

	// const handleIncrement = () => {
	//   setQuantity(prev => prev + 1)
	// }

	// const handleDecrement = () => {
	//   if (quantity > 1) {
	//     setQuantity(prev => prev - 1)
	//   }
	// }

	const getButtonStyle = (buttonName: string, isActive: boolean = false) => {
		const isHovered = hoveredButton === buttonName;
		if (isActive || isHovered) {
			return "bg-white text-blue hover:bg-white";
		}
		return "bg-[#6b8096] text-white hover:bg-white hover:text-blue";
	};

	return (
		<div className="w-full bg-muted-background">
			{/* Cart Actions */}
			<div className="flex h-[60px]">
				<Button
					variant="tertiary"
					className={`h-full rounded-none min-w-[200px] font-bold text-base ${getButtonStyle(
						"continue"
					)}`}
					onClick={onContinueShopping}
					onMouseEnter={() => setHoveredButton("continue")}
					onMouseLeave={() => setHoveredButton(null)}
					buttonLabel="Continue shopping"
				>
					CONTINUE SHOPPING
				</Button>

				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button
							variant="tertiary"
							className={`h-full rounded-none flex-1 font-bold text-base border-l border-white ${getButtonStyle(
								"share",
								isOpen
							)}`}
							onMouseEnter={() => setHoveredButton("share")}
							onMouseLeave={() => setHoveredButton(null)}
							buttonLabel="Share basket"
						>
							SHARE BASKET
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-full sm:max-w-md slide-in">
						<SheetHeader>
							<div className="flex justify-between items-center">
								<SheetTitle className="text-blue text-xl font-bold">SEND TO A FRIEND</SheetTitle>
								<Button
									variant="tertiary"
									size="icon"
									onClick={() => setIsOpen(false)}
									className="text-[#6b8096]"
									buttonLabel="Close"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						</SheetHeader>
						<div className="mt-6">
							<p className="text-sm text-[#6b8096] mb-6">
								Share your basket with one of your friends simply by filling in the form below.
							</p>
							<form className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="yourName">Your Name</Label>
										<Input id="yourName" className="bg-muted-background" ariaLabel="Your Name" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="yourEmail">Your Email Address</Label>
										<Input
											id="yourEmail"
											type="email"
											className="bg-muted-background"
											ariaLabel="Your Email Address"
										/>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="friendName">Friend's Name</Label>
										<Input
											id="friendName"
											className="bg-muted-background"
											ariaLabel="Friend's Name"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="friendEmail">Friend's Email Address</Label>
										<Input
											id="friendEmail"
											type="email"
											className="bg-muted-background"
											ariaLabel="Friend's Email Address"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea id="message" className="min-h-[100px] bg-muted-background" />
								</div>
								<Button
									type="submit"
									className="w-full bg-blue hover:bg-blue/90 text-white"
									buttonLabel="Send"
								>
									SEND
								</Button>
							</form>
						</div>
					</SheetContent>
				</Sheet>

				<Sheet open={isBasketOpen} onOpenChange={setIsBasketOpen}>
					<SheetTrigger asChild>
						<Button
							variant="tertiary"
							className={`h-full rounded-none flex-1 font-bold text-base border-l border-white ${getButtonStyle(
								"save",
								isBasketOpen
							)}`}
							onMouseEnter={() => setHoveredButton("save")}
							onMouseLeave={() => setHoveredButton(null)}
							buttonLabel="Save basket"
						>
							SAVE BASKET
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-full sm:max-w-xl p-0 slide-in">
						<div className="text-white bg-muted-background">
							<div className="flex justify-between items-center p-6">
								<h2 className="text-2xl font-bold">SAVE BASKET</h2>
								<Button
									variant="tertiary"
									size="icon"
									onClick={() => setIsBasketOpen(false)}
									className="text-white hover:text-white/90"
									buttonLabel="Close"
								>
									<X className="h-6 w-6" />
								</Button>
							</div>
							<div className="flex border-t border-white">
								<button
									onClick={() => setActiveTab("basket")}
									className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors
                    ${activeTab === "basket" ? "bg-[#6b8096]" : "hover:bg-blue/90"}`}
								>
									BASKET
								</button>
								<button
									onClick={() => setActiveTab("payment")}
									className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors border-l border-white
                    ${activeTab === "payment" ? "bg-[#6b8096]" : "hover:bg-blue/90"}`}
								>
									PAYMENT METHODS
								</button>
							</div>
						</div>

						<div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto basket-content">
							<div className="text-center space-y-6">
								<h3 className="text-xl font-bold text-blue">
									You must sign in or register to able to save your basket
								</h3>
								<Button
									className="w-full bg-blue hover:bg-blue/90 text-white py-6 text-lg"
									buttonLabel="Sign in"
								>
									SIGN IN
								</Button>
								<div className="text-[#6b8096] text-lg">OR</div>
								<Button
									variant="tertiary"
									className="w-full border-blue text-blue hover:bg-blue/10 py-6 text-lg"
									buttonLabel="Register"
								>
									REGISTER
								</Button>
							</div>
						</div>
					</SheetContent>
				</Sheet>

				<Button
					className="h-full rounded-none min-w-[200px] bg-blue hover:bg-blue/90 text-white font-bold text-base border-l border-white"
					onClick={onCheckout}
					buttonLabel="Checkout securely"
				>
					CHECKOUT SECURELY
				</Button>
			</div>
		</div>
	);
}
