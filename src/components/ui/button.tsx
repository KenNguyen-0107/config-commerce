"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SmartLink } from "../shared/smartLink";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "tertiary"
	| "emphasize"
	| "stroke-blue";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm lg:text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none uppercase",
	{
		variants: {
			variant: {
				primary:
					"bg-cta-primary-bg text-cta-primary-text hover:bg-cta-primary-hover-bg hover:text-cta-primary-hover-text active:bg-cta-primary-hover-bg active:text-cta-primary-hover-text disabled:opacity-50",
				secondary:
					"border border-cta-secondary-bg bg-cta-secondary-bg text-cta-secondary-text hover:bg-cta-secondary-hover-bg hover:text-cta-secondary-hover-text hover:border-cta-secondary-bg active:bg-cta-secondary-hover-bg active:text-cta-secondary-hover-text disabled:opacity-50",
				tertiary:
					"border-cta-stroke-text border-solid border-[1px] bg-cta-stroke-bg text-cta-stroke-text hover:bg-cta-stroke-hover-bg hover:text-cta-stroke-hover-text active:bg-cta-stroke-hover-bg active:text-cta-stroke-hover-text",
				emphasize:
					"bg-cta-emphasize-bg text-cta-emphasize-text hover:bg-cta-emphasize-hover-bg hover:text-cta-emphasize-hover-text active:bg-cta-emphasize-hover-bg active:text-cta-emphasize-hover-text disabled:opacity-50",
				"stroke-blue":
					"border-cta-stroke-blue-text border-solid border-[1px] bg-cta-stroke-blue-bg text-cta-stroke-blue-text hover:bg-cta-stroke-blue-hover-bg hover:text-cta-stroke-blue-hover-text active:bg-cta-stroke-blue-hover-bg active:text-cta-stroke-blue-hover-text disabled:opacity-50",
			},
			size: {
				// default: "px-3 py-1 lg:px-6 lg:py-4",
				default: "px-4 lg:px-6 py-4",
				icon: "hw-9",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement & HTMLAnchorElement>,
		VariantProps<typeof buttonVariants> {
	href?: string;
	asChild?: boolean;
	buttonLabel?: string;
	clampText?: boolean;
}

const Button = React.forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	ButtonProps
>(
	(
		{ className, variant, size, href, buttonLabel, clampText = true, ...props },
		ref
	) => {
		if (href) {
			return (
				<SmartLink
					href={href}
					className={cn(buttonVariants({ variant, size, className }))}
					ref={ref as React.Ref<HTMLAnchorElement>}
					{...props}
				>
					{clampText ? (
						<span className="line-clamp-1">{props.children}</span>
					) : (
						props.children
					)}
				</SmartLink>
			);
		}

		return (
			<button
				aria-label={buttonLabel || "button label"}
				title={buttonLabel || "button title"}
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref as React.Ref<HTMLButtonElement>}
				{...props}
			/>
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
