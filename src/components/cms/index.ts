import { ComponentTypeDictionary } from "@packages/optimizely-cms-react";
import SlideShow from "../widgets/SlideShow";
import CardInformation from "../common/CardInformation";
import PromotionCard from "./PromotionCard";
import ShoppingWithUs from "./ShoppingWithUs";

export const CmsDictionary: ComponentTypeDictionary = [
	{
		type: "Promotion/Card",
		component: PromotionCard,
	},
	// CardInformation
	{
		type: "CardInformation/Card",
		component: CardInformation
	},
	// Shopping with us
	{
		type: "ShoppingWithUs",
		component: ShoppingWithUs
	},
	// Shopping with us
	{
		type: "SlideShow",
		component: SlideShow
	}
]

export default CmsDictionary