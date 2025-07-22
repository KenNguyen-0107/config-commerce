import { ComponentTypeDictionary } from "@packages/optimizely-cms-react"
import CheckoutShippingAddresses from "./CheckoutShippingAddresses"
import CheckoutShippingCartTotal from "./CheckoutShippingCartTotal"
import CheckoutShippingHeader from "./CheckoutShippingHeader"
import CheckoutShippingPageContainer from "./CheckoutShippingPageContainer"
import CheckoutReviewAndSubmitPaymentDetails from "./CheckoutReviewAndSubmitPaymentDetails"
import CheckoutReviewAndSubmitHeader from "./CheckoutReviewAndSubmitHeader"
import CheckoutReviewAndSubmitPageContainer from "./CheckoutReviewAndSubmitPageContainer"
import CheckoutReviewAndSubmitCartTotal from "./CheckoutReviewAndSubmitCartTotal"
import CheckoutReviewAndSubmitPromotionCode from "./CheckoutReviewAndSubmitPromotionCode"
import OrderConfirmationAccountSignUpMessage from "./OrderConfirmationAccountSignUpMessage"
import OrderConfirmationHeader from "./OrderConfirmationHeader"
import OrderConfirmationOrderInformation from "./OrderConfirmationOrderInformation"
import OrderConfirmationPageContainer from "./OrderConfirmationPageContainer"
import OrderConfirmationTotal from "./OrderConfirmationTotal"

export const CheckoutWidgetDictionary: ComponentTypeDictionary = [
  // {
  //   type: "CheckoutReviewAndSubmitActionButtons",
  //   component: CheckoutReviewAndSubmitActionButtons
  // },
  // {
  //   type: "CheckoutShippingOrderNotesEntry",
  //   component: CheckoutShippingOrderNotesEntry
  // },
  {
    type: "CheckoutShippingPageContainer",
    component: CheckoutShippingPageContainer
  },
  // {
  //   type: "CheckoutReviewAndSubmitShippingInfo",
  //   component: CheckoutReviewAndSubmitShippingInfo
  // },
  {
    type: "CheckoutShippingAddresses",
    component: CheckoutShippingAddresses
  },
  {
    type: "CheckoutShippingCartTotal",
    component: CheckoutShippingCartTotal
  },
  // {
  //   type: "CheckoutShippingFulfillmentMethodSelector",
  //   component: CheckoutShippingFulfillmentMethodSelector
  // },
  {
    type: "CheckoutShippingHeader",
    component: CheckoutShippingHeader
  },
  // {
  //   type: "CheckoutReviewAndSubmitCarrierService",
  //   component: CheckoutReviewAndSubmitCarrierService
  // },
  {
    type: "CheckoutReviewAndSubmitCartTotal",
    component: CheckoutReviewAndSubmitCartTotal
  },
  {
    type: "CheckoutReviewAndSubmitHeader",
    component: CheckoutReviewAndSubmitHeader
  },
  {
    type: "CheckoutReviewAndSubmitPageContainer",
    component: CheckoutReviewAndSubmitPageContainer
  },
  {
    type: "CheckoutReviewAndSubmitPaymentDetails",
    component: CheckoutReviewAndSubmitPaymentDetails
  },
  // {
  //   type: "CheckoutReviewAndSubmitProductList",
  //   component: CheckoutReviewAndSubmitProductList
  // },
  // {
  //   type: "CheckoutReviewAndSubmitPromotionCode",
  //   component: CheckoutReviewAndSubmitPromotionCode
  // },
  // {
  //   type: "OrderConfirmationAccountSignUpMessage",
  //   component: OrderConfirmationAccountSignUpMessage
  // },
  {
    type: "OrderConfirmationHeader",
    component: OrderConfirmationHeader
  },
  {
    type: "OrderConfirmationOrderInformation",
    component: OrderConfirmationOrderInformation
  },
  {
    type: "OrderConfirmationPageContainer",
    component: OrderConfirmationPageContainer
  },
  {
    type: "OrderConfirmationTotal",
    component: OrderConfirmationTotal
  },
]

export default CheckoutWidgetDictionary
