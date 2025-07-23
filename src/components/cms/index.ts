import { ComponentTypeDictionary } from "@packages/optimizely-cms-react";
import SlideShow from "../widgets/SlideShow";
import CardInformation from "../common/CardInformation";
import PromotionCard from "./PromotionCard";
import ShoppingWithUs from "./ShoppingWithUs";

const envPrefix = process.env.GRAPH_ENV || "";

export const CmsDictionary: ComponentTypeDictionary = [
	{
		type: `${envPrefix}Promotion/Card`,
		component: PromotionCard,
	},
	// CardInformation
	{
		type: `${envPrefix}CardInformation/Card`,
		component: CardInformation,
	},
	// Shopping with us
	{
		type: `${envPrefix}ShoppingWithUs`,
		component: ShoppingWithUs,
	},
	// Shopping with us
	{
		type: `${envPrefix}SlideShow`,
		component: SlideShow,
	},
];

export default CmsDictionary;
