import { ComponentTypeDictionary } from "@packages/optimizely-cms-react"
import BasicBanner from "./BasicBanner"
import BasicButton from "./BasicButton"
import BasicGrid from "./BasicGrid"
import BasicImage from "./BasicImage"
import BasicLink from "./BasicLink"
import BasicQuestionAnswers from "./BasicQuestionAnswers"
import BasicRichContent from "./BasicRichContent"
import BasicRow from "./BasicRow"
import BasicRows from "./BasicRows"
import CategoryList from "./CategoryList"
import CommonCartLink from "./CommonCartLink"
import CommonHeaderSignIn from "./CommonHeaderSignIn"
import CommonPlaceholder from "./CommonPlaceholder"
import CommonProductCarousel from "./CommonProductCarousel"
import CommonRatingAndReview from "./CommonRatingAndReview"
import FooterContainer from "./FooterContainer"
import HeaderMainNavigation from "./HeaderMainNavigation"
import HeaderSearch from "./HeaderSearchInput"
import LinkList from "./LinkList"
import ProductListCardList from "./ProductListCardList"
import ProductListColumns from "./ProductListColumns"
import SharedContent from "./SharedContent"
import SocialLinks from "./SocialLinks"
import Subscribe from "./Subscribe"
import CartWidgetDictionary from "./cart-widgets"
import CheckoutWidgetDictionary from "./checkout-widgets"
import SigninWidgetDictionary from "./signin-widgets"
import MyAccountDictionary from "./my-account-widgets"

export const WidgetDictionary: ComponentTypeDictionary = [
  {
    type: "CategoryList",
    component: CategoryList,
  },
  {
    type: "BasicRow",
    component: BasicRow,
  },
  {
    type: "BasicRows",
    component: BasicRows,
  },
  {
    type: "BasicGrid",
    component: BasicGrid,
  },
  {
    type: "Subscribe",
    component: Subscribe,
  },
  {
    type: "BasicLink",
    component: BasicLink,
  },
  {
    type: "BasicLinkList",
    component: LinkList,
  },
  {
    type: "BasicRichContent",
    component: BasicRichContent,
  },
  {
    type: "BasicSocialLinks",
    component: SocialLinks,
  },
  {
    type: "BasicButton",
    component: BasicButton,
  },
  {
    type: "BasicImage",
    component: BasicImage,
  },
  {
    type: "BasicBanner",
    component: BasicBanner,
  },
  {
    type: "FooterContainer",
    component: FooterContainer,
  },
  {
    type: "HeaderMainNavigation",
    component: HeaderMainNavigation,
  },
  {
    type: "LinkList",
    component: LinkList,
  },
  {
    type: "BasicSubscribe",
    component: Subscribe,
  },
  {
    type: "CommonCartLink",
    component: CommonCartLink,
  },
  {
    type: "CommonSignIn",
    component: CommonHeaderSignIn,
  },
  {
    type: "HeaderSearchInput",
    component: HeaderSearch,
  },
  {
    type: "SharedContent",
    component: SharedContent,
  },
  {
    type: "BasicQuestionAnswers",
    component: BasicQuestionAnswers,
  },
  {
    type: "ProductListCardList",
    component: ProductListCardList,
  },
  {
    type: "ProductListColumns",
    component: ProductListColumns,
  },
  {
    type: "CommonProductCarousel",
    component: CommonProductCarousel,
  },
  {
    type: "CommonPlaceholder",
    component: CommonPlaceholder,
  },
  {
    type: "CommonRatingAndReview",
    component: CommonRatingAndReview,
  },
  ...CartWidgetDictionary,
  ...CheckoutWidgetDictionary,
  ...SigninWidgetDictionary,
  ...MyAccountDictionary,
]

export default WidgetDictionary
