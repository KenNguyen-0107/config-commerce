import { ComponentTypeDictionary } from "@packages/optimizely-cms-react";
import CheckoutShippingAddresses from "./CheckoutShippingAddresses";
import CheckoutShippingCartTotal from "./CheckoutShippingCartTotal";
import CheckoutShippingHeader from "./CheckoutShippingHeader";
import CheckoutShippingPageContainer from "./CheckoutShippingPageContainer";
import CheckoutReviewAndSubmitPaymentDetails from "./CheckoutReviewAndSubmitPaymentDetails";
import CheckoutReviewAndSubmitHeader from "./CheckoutReviewAndSubmitHeader";
import CheckoutReviewAndSubmitPageContainer from "./CheckoutReviewAndSubmitPageContainer";
import CheckoutReviewAndSubmitCartTotal from "./CheckoutReviewAndSubmitCartTotal";
// import CheckoutReviewAndSubmitPromotionCode from "./CheckoutReviewAndSubmitPromotionCode";
// import OrderConfirmationAccountSignUpMessage from "./OrderConfirmationAccountSignUpMessage";
import OrderConfirmationHeader from "./OrderConfirmationHeader";
import OrderConfirmationOrderInformation from "./OrderConfirmationOrderInformation";
import OrderConfirmationPageContainer from "./OrderConfirmationPageContainer";
import OrderConfirmationTotal from "./OrderConfirmationTotal";

const envPrefix = process.env.GRAPH_ENV || "";

export const CheckoutWidgetDictionary: ComponentTypeDictionary = [
	// {
	//   type: `${envPrefix}CheckoutReviewAndSubmitActionButtons`,
	//   component: CheckoutReviewAndSubmitActionButtons
	// },
	// {
	//   type: `${envPrefix}CheckoutShippingOrderNotesEntry`,
	//   component: CheckoutShippingOrderNotesEntry
	// },
	{
		type: `${envPrefix}CheckoutShippingPageContainer`,
		component: CheckoutShippingPageContainer,
	},
	// {
	//   type: `${envPrefix}CheckoutReviewAndSubmitShippingInfo`,
	//   component: CheckoutReviewAndSubmitShippingInfo
	// },
	{
		type: `${envPrefix}CheckoutShippingAddresses`,
		component: CheckoutShippingAddresses,
	},
	{
		type: `${envPrefix}CheckoutShippingCartTotal`,
		component: CheckoutShippingCartTotal,
	},
	// {
	//   type: `${envPrefix}CheckoutShippingFulfillmentMethodSelector`,
	//   component: CheckoutShippingFulfillmentMethodSelector
	// },
	{
		type: `${envPrefix}CheckoutShippingHeader`,
		component: CheckoutShippingHeader,
	},
	// {
	//   type: `${envPrefix}CheckoutReviewAndSubmitCarrierService`,
	//   component: CheckoutReviewAndSubmitCarrierService
	// },
	{
		type: `${envPrefix}CheckoutReviewAndSubmitCartTotal`,
		component: CheckoutReviewAndSubmitCartTotal,
	},
	{
		type: `${envPrefix}CheckoutReviewAndSubmitHeader`,
		component: CheckoutReviewAndSubmitHeader,
	},
	{
		type: `${envPrefix}CheckoutReviewAndSubmitPageContainer`,
		component: CheckoutReviewAndSubmitPageContainer,
	},
	{
		type: `${envPrefix}CheckoutReviewAndSubmitPaymentDetails`,
		component: CheckoutReviewAndSubmitPaymentDetails,
	},
	// {
	//   type: `${envPrefix}CheckoutReviewAndSubmitProductList`,
	//   component: CheckoutReviewAndSubmitProductList
	// },
	// {
	//   type: `${envPrefix}CheckoutReviewAndSubmitPromotionCode`,
	//   component: CheckoutReviewAndSubmitPromotionCode
	// },
	// {
	//   type: `${envPrefix}OrderConfirmationAccountSignUpMessage`,
	//   component: OrderConfirmationAccountSignUpMessage
	// },
	{
		type: `${envPrefix}OrderConfirmationHeader`,
		component: OrderConfirmationHeader,
	},
	{
		type: `${envPrefix}OrderConfirmationOrderInformation`,
		component: OrderConfirmationOrderInformation,
	},
	{
		type: `${envPrefix}OrderConfirmationPageContainer`,
		component: OrderConfirmationPageContainer,
	},
	{
		type: `${envPrefix}OrderConfirmationTotal`,
		component: OrderConfirmationTotal,
	},
];

export default CheckoutWidgetDictionary;
