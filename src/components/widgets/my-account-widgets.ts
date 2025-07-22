import { ComponentTypeDictionary } from "@packages/optimizely-cms-react"
import CommonRecentOrders from "./CommonRecentOrders"
import MyAccountView from "./MyAccountView"
// import CommonRecentQuotes from "./CommonRecentQuotes"
// import CommonRecentWhishlists from "./CommonRecentWhishlists"
import AddressBook from "./AddressBook"
import AddressBookSearchBox from "./AddressBookSearchBox"
import BasicNavigationList from "./BasicNavigationList"
import CreateAddressButton from "./CreateAddressButton"
import CurrentBillingAddress from "./CurrentBillingAddress"
import CurrentShippingAddress from "./CurrentShippingAddress"
import MyAccountHomepageSelector from "./MyAccountHomepageSelector"

export const MyAccountDictionary: ComponentTypeDictionary = [
  {
    type: "MyAccountView",
    component: MyAccountView
  },
  {
    type: "BasicNavigationList",
    component: BasicNavigationList
  },
  {
    type: "CommonRecentOrders",
    component: CommonRecentOrders
  },
  // {
  //   type: "CommonRecentQuotes",
  //   component: CommonRecentQuotes
  // },
  // {
  //   type: "CommonRecentWhishlists",
  //   component: CommonRecentWhishlists
  // },
  {
    type: "MyAccountHomepageSelector",
    component: MyAccountHomepageSelector
  },
  // my account address
  {
    type: "CurrentBillingAddress",
    component: CurrentBillingAddress
  },
  {
    type: "CurrentShippingAddress",
    component: CurrentShippingAddress
  },
  {
    type: "AddressBook",
    component: AddressBook
  },
  {
    type: "AddressBookSearchBox",
    component: AddressBookSearchBox
  },
  {
    type: "CreateAddressButton",
    component: CreateAddressButton
  },
]

export default MyAccountDictionary
