import { ComponentTypeDictionary } from "@packages/optimizely-cms-react"
import CartActions from "./CartActions"
import CartFulfillmentMethodSelector from "./CartFulfillmentMethodSelector"
import CartHeader from "./CartHeader"
import CartLines from "./CartLines"
import CartPageContainer from "./CartPageContainer"
import CartTotal from "./CartTotal"

export const CartWidgetDictionary: ComponentTypeDictionary = [
  {
    type: "CartPageContainer",
    component: CartPageContainer
  },
  {
    type: "CartHeader",
    component: CartHeader
  },
  {
    type: "CartTotal",
    component: CartTotal
  },
  {
    type: "CartLines",
    component: CartLines
  },
  {
    type: "CartFulfillmentMethodSelector",
    component: CartFulfillmentMethodSelector
  },
  {
    type: "CartActions",
    component: CartActions
  },
  // {
  //   type: "CartApproverMessage",
  //   component: CartApproverMessage
  // },
]

export default CartWidgetDictionary
