import { ComponentTypeDictionary } from "@packages/optimizely-cms-react";
import CommonRecentOrders from "./CommonRecentOrders";
import MyAccountView from "./MyAccountView";
// import CommonRecentQuotes from "./CommonRecentQuotes"
// import CommonRecentWhishlists from "./CommonRecentWhishlists"
import AddressBook from "./AddressBook";
import AddressBookSearchBox from "./AddressBookSearchBox";
import BasicNavigationList from "./BasicNavigationList";
import CreateAddressButton from "./CreateAddressButton";
import CurrentBillingAddress from "./CurrentBillingAddress";
import CurrentShippingAddress from "./CurrentShippingAddress";
// import MyAccountHomepageSelector from "./MyAccountHomepageSelector"
import OrderDetailsButtonSet from "./OrderDetailsButtonSet";
import OrderDetailsShippingAddress from "./OrderDetailsShippingAddress";
import OrderDetailsSummaryTable from "./OrderDetailsSummaryTable";
import OrderDetailsTitle from "./OrderDetailsTitle";
import OrderHistoryHeader from "./OrderHistoryHeader";
import OrderHistoryTable from "./OrderHistoryTable";
import OrderHistoryPagination from "./OrderHistoryPagination";
import OrderDetailsBillingAddress from "./OrderDetailsBillingAddress";
import OrderDate from "./OrderDate";
const envPrefix = process.env.GRAPH_ENV || "";

export const MyAccountDictionary: ComponentTypeDictionary = [
  {
    type: `${envPrefix}MyAccountView`,
    component: MyAccountView,
  },
  {
    type: `${envPrefix}BasicNavigationList`,
    component: BasicNavigationList,
  },
  {
    type: `${envPrefix}CommonRecentOrders`,
    component: CommonRecentOrders,
  },
  // {
  //   type: `${envPrefix}CommonRecentQuotes`,
  //   component: CommonRecentQuotes
  // },
  // {
  //   type: `${envPrefix}CommonRecentWhishlists`,
  //   component: CommonRecentWhishlists
  // },
  // {
  //   type: `${envPrefix}MyAccountHomepageSelector`,
  //   component: MyAccountHomepageSelector
  // },
  // my account address
  {
    type: `${envPrefix}CurrentBillingAddress`,
    component: CurrentBillingAddress,
  },
  {
    type: `${envPrefix}CurrentShippingAddress`,
    component: CurrentShippingAddress,
  },
  {
    type: `${envPrefix}AddressBook`,
    component: AddressBook,
  },
  {
    type: `${envPrefix}AddressBookSearchBox`,
    component: AddressBookSearchBox,
  },
  {
    type: `${envPrefix}CreateAddressButton`,
    component: CreateAddressButton,
  },
  // my account order detail
  {
    type: `${envPrefix}OrderDetailsButtonSet`,
    component: OrderDetailsButtonSet,
  },
  {
    type: `${envPrefix}OrderDetailsShippingAddress`,
    component: OrderDetailsShippingAddress,
  },
  {
    type: `${envPrefix}OrderDetailsBillingAddress`,
    component: OrderDetailsBillingAddress,
  },
  {
    type: `${envPrefix}OrderDetailsSummaryTable`,
    component: OrderDetailsSummaryTable,
  },
  {
    type: `${envPrefix}OrderDetailsTitle`,
    component: OrderDetailsTitle,
  },
  {
    type: `${envPrefix}OrderHistoryHeader`,
    component: OrderHistoryHeader,
  },
  {
    type: `${envPrefix}OrderHistoryTable`,
    component: OrderHistoryTable,
  },
  {
    type: `${envPrefix}OrderDate`,
    component: OrderDate,
  },
  {
    type: `${envPrefix}OrderHistoryPagination`,
    component: OrderHistoryPagination,
  },
];

export default MyAccountDictionary;
