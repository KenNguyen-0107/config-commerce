import { ReactNode } from "react";
import PDPInfo from "./PdpInfo";
import PDPCarousel from "../PdpCarousel";

const PDPContent = ({ children, data }: { children: ReactNode; data?: Record<string, any> }) => {
	if (!data) return null;

	const isPdpVariant = data?.ChildTraitValuesContainer?.ChildTraitValues?.length > 0;

	return (
		<div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:py-10 lg:px-0">
			<PDPCarousel images={data.ImageContainer?.Images} />
			<div className="space-y-10">
				<PDPInfo data={data} isPdpVariant={isPdpVariant} />
				{children}
			</div>
		</div>
	);
};

export default PDPContent;
