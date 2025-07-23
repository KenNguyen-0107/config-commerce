import React from "react";
import { BasicButtonProps } from "./types";
import { Button, ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AddToBasket from "@/components/products/PdpContent/AddToBasket";
import { getProductThumbnail } from "@/components/utils";

const BasicButton: React.FC<BasicButtonProps> = (props) => {
	const { __typename, Id, Link, Variant, CssClass, Label = "Button", Section, Info } = props;

	if (Section === "PdpStickyNav") {
		return (
			<AddToBasket
				className="gap-0 justify-center"
				buttonClass="whitespace-nowrap flex-grow"
				showControl={false}
				id={Info?.Id}
				canAddToCart={Info?.CanAddToCart}
				code={Info?.ProductNumber}
				image={getProductThumbnail(Info?.ImageContainer?.Images)}
				name={Info?.ProductTitle}
				price={Info?.UnitListPrice}
				priceDisplay={Info?.UnitListPriceDisplay}
				url={Info?.Url}
			/>
		);
	}

	return (
		<Button
			data-component={__typename}
			data-component-id={Id}
			variant={(Variant as ButtonVariant) || "primary"}
			href={Link?.Url || "#"}
			clampText={Section !== "InstallationAdvice"}
			className={cn(Section === "InstallationAdvice" && "whitespace-nowrap", CssClass || "")}
			title={Label as string}
		>
			{Label}
		</Button>
	);
};

export default BasicButton;
