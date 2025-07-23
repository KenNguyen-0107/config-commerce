import { ComponentTypeDictionary } from "@packages/optimizely-cms-react";
import CartActions from "./CartActions";
import CartFulfillmentMethodSelector from "./CartFulfillmentMethodSelector";
import CartHeader from "./CartHeader";
import CartLines from "./CartLines";
import CartPageContainer from "./CartPageContainer";
import CartTotal from "./CartTotal";
const envPrefix = process.env.GRAPH_ENV || "";

export const CartWidgetDictionary: ComponentTypeDictionary = [
	{
		type: `${envPrefix}CartPageContainer`,
		component: CartPageContainer,
	},
	{
		type: `${envPrefix}CartHeader`,
		component: CartHeader,
	},
	{
		type: `${envPrefix}CartTotal`,
		component: CartTotal,
	},
	{
		type: `${envPrefix}CartLines`,
		component: CartLines,
	},
	{
		type: `${envPrefix}CartFulfillmentMethodSelector`,
		component: CartFulfillmentMethodSelector,
	},
	{
		type: `${envPrefix}CartActions`,
		component: CartActions,
	},
	// {
	//   type: `${envPrefix}CartApproverMessage`,
	//   component: CartApproverMessage
	// },
];

export default CartWidgetDictionary;
