import type * as Schema from "./graphql";
import type { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export const B2BHomePageDataFragmentDoc = gql`
    fragment B2BHomePageData on B2BHomePage {
  __typename
  ExcludeFromNavigation
  ExcludeFromSignInRequired
  HideBreadcrumbs
  HideFooter
  HideHeader
  HorizontalRule
  Id
  Languages
  LayoutPage
  LayoutPageId
  MetaDescription
  MetaKeywords
  Name
  NodeId
  OpenGraphImage
  OpenGraphTitle
  OpenGraphUrl
  ParentId
  SortOrder
  StructuredPageData
  Tags
  TemplateHash
  Title
  Type
  Url
  UrlSegment
  VariantName
  WebsiteId
}
    `;
export const B2BPageDataFragmentDoc = gql`
    fragment B2BPageData on B2BPage {
  __typename
  ExcludeFromNavigation
  ExcludeFromSignInRequired
  HideBreadcrumbs
  HideFooter
  HideHeader
  HorizontalRule
  Id
  Languages
  LayoutPage
  LayoutPageId
  MetaDescription
  MetaKeywords
  Name
  NodeId
  OpenGraphImage
  OpenGraphTitle
  OpenGraphUrl
  ParentId
  SortOrder
  StructuredPageData
  Tags
  TemplateHash
  Title
  Type
  Url
  UrlSegment
  VariantName
  WebsiteId
}
    `;
export const ProductListPageDataFragmentDoc = gql`
    fragment ProductListPageData on ProductListPage {
  __typename
  CategoryId
  ExcludeFromNavigation
  ExcludeFromSignInRequired
  HideBreadcrumbs
  HideFooter
  HideHeader
  HorizontalRule
  Id
  Languages
  LayoutPage
  LayoutPageId
  MetaDescription
  MetaKeywords
  Name
  NodeId
  OpenGraphImage
  OpenGraphTitle
  OpenGraphUrl
  ParentId
  SortOrder
  StructuredPageData
  Tags
  TemplateHash
  Title
  Type
  Url
  UrlSegment
  VariantName
  WebsiteId
}
    `;
export const AddressBookDataFragmentDoc = gql`
    fragment AddressBookData on AddressBook {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const AddressBookPaginationDataFragmentDoc = gql`
    fragment AddressBookPaginationData on AddressBookPagination {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const AddressBookSearchBoxDataFragmentDoc = gql`
    fragment AddressBookSearchBoxData on AddressBookSearchBox {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const BasicBannerDataFragmentDoc = gql`
    fragment BasicBannerData on BasicBanner {
  __typename
  Background
  BackgroundColor
  BackgroundImage
  ButtonLabel
  ButtonLink {
    Type
    Url
    Value
  }
  CenterTextVertically
  ContentPadding
  CssClass
  CustomCSS
  CustomFontSizes
  Description
  DisableButton
  FocalPoint
  H1FontSize
  H2FontSize
  H3FontSize
  H4FontSize
  H5FontSize
  H6FontSize
  Heading
  Id
  Image
  ImageOverlay
  ImageWidth
  ImageHeight
  IsLayout
  MinimumHeight
  NormalFontSize
  ParentId
  PartialOverlay
  PartialOverlayPositioning
  ResponsiveFontSizes
  Subheading
  Variant
  Zone
  SiteHost
  Loading
}
    `;
export const BasicButtonDataFragmentDoc = gql`
    fragment BasicButtonData on BasicButton {
  __typename
  Alignment
  CssClass
  CustomCSS
  Id
  IsLayout
  Label
  Link {
    Type
    Value
    Url
  }
  ParentId
  Variant
  Zone
}
    `;
export const BasicGridDataFragmentDoc = gql`
    fragment BasicGridData on BasicGrid {
  __typename
  CssClass
  CustomCSS
  ExtraLargeColumnCount
  ExtraLargeRowCount
  ExtraSmallColumnCount
  Id
  IsFullWidth
  IsLayout
  LargeColumnCount
  MediumColumnCount
  ParentId
  SmallColumnCount
  Zone
}
    `;
export const BasicImageDataFragmentDoc = gql`
    fragment BasicImageData on BasicImage {
  __typename
  AltText
  CssClass
  CustomCSS
  Id
  ImageUrl
  IsLayout
  ParentId
  Zone
  ImageLink {
    Type
    Value
    Url
  }
  ImageWidth
  ImageHeight
}
    `;
export const BasicLinkDataFragmentDoc = gql`
    fragment BasicLinkData on BasicLink {
  __typename
  CustomCSS
  Destination {
    Type
    Value
  }
  Id
  IsLayout
  OverrideTitle
  ParentId
  Zone
}
    `;
export const BasicLogoDataFragmentDoc = gql`
    fragment BasicLogoData on BasicLogo {
  __typename
  CustomCSS
  Id
  IsLayout
  IsMobileSpecific
  LogoImage
  MobileSpecificImage
  ParentId
  Zone
}
    `;
export const BasicNavigationListDataFragmentDoc = gql`
    fragment BasicNavigationListData on BasicNavigationList {
  __typename
  CustomCSS
  Depth
  Id
  IsLayout
  LeftMargin
  Link {
    Type
    Value
    Url
  }
  MarginBottom
  ParentId
  Type
  Zone
}
    `;
export const BasicPageTitleDataFragmentDoc = gql`
    fragment BasicPageTitleData on BasicPageTitle {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const BasicQuestionAnswersDataFragmentDoc = gql`
    fragment BasicQuestionAnswersData on BasicQuestionAnswers {
  __typename
  CustomCSS
  Description
  Id
  IsLayout
  ParentId
  QuestionAnswersContainer {
    QuestionAnswers {
      Answer
      Question
    }
  }
  Title
  Type
  Zone
}
    `;
export const BasicRichContentDataFragmentDoc = gql`
    fragment BasicRichContentData on BasicRichContent {
  __typename
  BackgroundColor
  Content
  CssClass
  CustomCSS
  Id
  IsLayout
  Padding
  ParentId
  Zone
}
    `;
export const BasicRowDataFragmentDoc = gql`
    fragment BasicRowData on BasicRow {
  __typename
  Columns
  CssClass
  CustomCSS
  FullWidthColor
  FullWidthImage
  FullWidthImageFocalPoint
  FullWidthStylingType
  Gap
  Id
  IsFullWidth
  IsLayout
  ParentId
  Reflow
  Variant
  Zone
}
    `;
export const BasicRowsDataFragmentDoc = gql`
    fragment BasicRowsData on BasicRows {
  __typename
  CssClass
  CustomCSS
  Gap
  Id
  IsFullWidth
  IsLayout
  ParentId
  RowCount
  Zone
}
    `;
export const BasicSocialLinksDataFragmentDoc = gql`
    fragment BasicSocialLinksData on BasicSocialLinks {
  __typename
  Alignment
  BackgroundColor
  CustomCSS
  Direction
  IconColor
  IconSize
  Id
  IsLayout
  Links {
    LinkItems {
      Destination {
        Type
        Value
      }
      Icon
      OpenInNewWindow
      OverriddenTitle
      Title
    }
  }
  LinksPerRow
  ParentId
  VisibilityState
  Zone
}
    `;
export const CartActionsDataFragmentDoc = gql`
    fragment CartActionsData on CartActions {
  __typename
  AddAllToListVariant
  CheckoutVariant
  CustomCSS
  FullWidthButton
  Id
  IsLayout
  ParentId
  RequestForQuoteVariant
  SaveOrderVariant
  Type
  Zone
}
    `;
export const CartApproverMessageDataFragmentDoc = gql`
    fragment CartApproverMessageData on CartApproverMessage {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CartFulfillmentMethodSelectorDataFragmentDoc = gql`
    fragment CartFulfillmentMethodSelectorData on CartFulfillmentMethodSelector {
  __typename
  CustomCSS
  DisplayStyle
  Id
  IsLayout
  ParentId
  ShipToHomeMessage
  StorePickUpMessage
  Type
  Zone
}
    `;
export const CartHeaderDataFragmentDoc = gql`
    fragment CartHeaderData on CartHeader {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CartLinesDataFragmentDoc = gql`
    fragment CartLinesData on CartLines {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  ShowAddToList
  ShowBackToTop
  ShowBrand
  ShowImage
  ShowItemCount
  ShowLineNotes
  ShowPerUnitPrice
  ShowPriceLabel
  ShowProductNumber
  ShowProductTitle
  ShowRemoveAllActions
  ShowVmiBinDetails
  Type
  Zone
}
    `;
export const CartPageContainerDataFragmentDoc = gql`
    fragment CartPageContainerData on CartPageContainer {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CartTotalDataFragmentDoc = gql`
    fragment CartTotalData on CartTotal {
  __typename
  CustomCSS
  Id
  IncludeActions
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CategoryListDataFragmentDoc = gql`
    fragment CategoryListData on CategoryList {
  __typename
  Categories {
    Items {
      HtmlContent
      Id
      ImageAltText
      IsDynamic
      IsFeatured
      LargeImagePath
      MetaDescription
      MetaKeywords
      MobileBannerImageUrl
      MobilePrimaryText
      MobileSecondaryText
      MobileTextColor
      MobileTextJustification
      Name
      Path
      ShortDescription
      SmallImagePath
      SortOrder
      UrlSegment
    }
  }
  CustomCSS
  Id
  IsLayout
  ParentId
  ShowImages
  ShowOnlyTopLevelCategories
  Zone
}
    `;
export const CheckoutReviewAndSubmitActionButtonsDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitActionButtonsData on CheckoutReviewAndSubmitActionButtons {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutReviewAndSubmitCarrierServiceDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitCarrierServiceData on CheckoutReviewAndSubmitCarrierService {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutReviewAndSubmitCartTotalDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitCartTotalData on CheckoutReviewAndSubmitCartTotal {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutReviewAndSubmitHeaderDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitHeaderData on CheckoutReviewAndSubmitHeader {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutReviewAndSubmitPageContainerDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitPageContainerData on CheckoutReviewAndSubmitPageContainer {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutReviewAndSubmitPaymentDetailsDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitPaymentDetailsData on CheckoutReviewAndSubmitPaymentDetails {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutReviewAndSubmitProductListDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitProductListData on CheckoutReviewAndSubmitProductList {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutReviewAndSubmitPromotionCodeDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitPromotionCodeData on CheckoutReviewAndSubmitPromotionCode {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutReviewAndSubmitShippingInfoDataFragmentDoc = gql`
    fragment CheckoutReviewAndSubmitShippingInfoData on CheckoutReviewAndSubmitShippingInfo {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutShippingAddressesDataFragmentDoc = gql`
    fragment CheckoutShippingAddressesData on CheckoutShippingAddresses {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutShippingCartTotalDataFragmentDoc = gql`
    fragment CheckoutShippingCartTotalData on CheckoutShippingCartTotal {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutShippingFulfillmentMethodSelectorDataFragmentDoc = gql`
    fragment CheckoutShippingFulfillmentMethodSelectorData on CheckoutShippingFulfillmentMethodSelector {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutShippingHeaderDataFragmentDoc = gql`
    fragment CheckoutShippingHeaderData on CheckoutShippingHeader {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutShippingOrderNotesEntryDataFragmentDoc = gql`
    fragment CheckoutShippingOrderNotesEntryData on CheckoutShippingOrderNotesEntry {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CheckoutShippingPageContainerDataFragmentDoc = gql`
    fragment CheckoutShippingPageContainerData on CheckoutShippingPageContainer {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CommonCartLinkDataFragmentDoc = gql`
    fragment CommonCartLinkData on CommonCartLink {
  __typename
  CustomCSS
  Icon
  Id
  IsLayout
  ParentId
  VisibilityState
  Zone
}
    `;
export const CommonHeaderSignInDataFragmentDoc = gql`
    fragment CommonHeaderSignInData on CommonHeaderSignIn {
  __typename
  CustomCSS
  Icon
  Id
  IncludeAccountMenu
  IsLayout
  ParentId
  ShowInventoryToggle
  ShowPricingToggle
  VisibilityState
  Zone
}
    `;
export const CommonPlaceholderDataFragmentDoc = gql`
    fragment CommonPlaceholderData on CommonPlaceholder {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Variant
  Zone
}
    `;
export const CommonProductCarouselDataFragmentDoc = gql`
    fragment CommonProductCarouselData on CommonProductCarousel {
  __typename
  CarouselType
  CustomCSS
  DisplayProductsFrom
  Id
  IsLayout
  MaxNumberOfColumns
  MaximumNumberOfImageBadges
  MaximumNumberOfTextBadges
  NumberOfProductsToDisplay
  ParentId
  RelatedProductType
  SeedWithManuallyAssigned
  SelectedCategoryIds
  ShowAddToCart
  ShowAddToList
  ShowBrandName
  ShowImage
  ShowImageBadges
  ShowPartNumbers
  ShowPrice
  ShowTextBadges
  ShowTitle
  Title
  TitleAlignment
  Type
  WidgetPosition
  Zone
}
    `;
export const CommonRatingAndReviewDataFragmentDoc = gql`
    fragment CommonRatingAndReviewData on CommonRatingAndReview {
  __typename
  CustomCSS
  Destination {
    Type
    Value
    Url
  }
  Id
  IsLayout
  MaxNumberOfItems
  ParentId
  Title
  Type
  Zone
}
    `;
export const CommonRecentOrdersDataFragmentDoc = gql`
    fragment CommonRecentOrdersData on CommonRecentOrders {
  __typename
  CustomCSS
  Id
  IsLayout
  NumberOfRecords
  ParentId
  Type
  Zone
}
    `;
export const CommonRecentQuotesDataFragmentDoc = gql`
    fragment CommonRecentQuotesData on CommonRecentQuotes {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CommonRecentWhishlistsDataFragmentDoc = gql`
    fragment CommonRecentWhishlistsData on CommonRecentWhishlists {
  __typename
  CustomCSS
  Id
  IsLayout
  NumberOfRecords
  ParentId
  Type
  Zone
}
    `;
export const CommonSignInDataFragmentDoc = gql`
    fragment CommonSignInData on CommonSignIn {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CreateAccountDataFragmentDoc = gql`
    fragment CreateAccountData on CreateAccount {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CreateAddressButtonDataFragmentDoc = gql`
    fragment CreateAddressButtonData on CreateAddressButton {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CurrentBillingAddressDataFragmentDoc = gql`
    fragment CurrentBillingAddressData on CurrentBillingAddress {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const CurrentShippingAddressDataFragmentDoc = gql`
    fragment CurrentShippingAddressData on CurrentShippingAddress {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const ErrorWidgetDataFragmentDoc = gql`
    fragment ErrorWidgetData on ErrorWidget {
  __typename
  CustomCSS
  Id
  IsLayout
  Message
  ParentId
  Type
  Zone
}
    `;
export const FooterContainerDataFragmentDoc = gql`
    fragment FooterContainerData on FooterContainer {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Zone
}
    `;
export const HeaderMainNavigationDataFragmentDoc = gql`
    fragment HeaderMainNavigationData on HeaderMainNavigation {
  CustomCSS
  __typename
  Id
  IsLayout
  Links {
    LinkItems {
      SubLinksContainer {
        SubLinks {
          Id
          Level
          Title
          Url
          Type
        }
      }
      Title
      LinkType
      OverrideTitle
      OverriddenTitle
      Destination {
        Type
        Url
        Value
      }
    }
  }
  OpenParentPages
  ParentId
  ShowQuickOrder
  Zone
  _id
  _modified
  _score
}
    `;
export const HeaderSearchInputDataFragmentDoc = gql`
    fragment HeaderSearchInputData on HeaderSearchInput {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Zone
}
    `;
export const LinkListDataFragmentDoc = gql`
    fragment LinkListData on LinkList {
  __typename
  Alignment
  CustomCSS
  Direction
  Id
  IsLayout
  Links {
    LinkItems {
      Destination {
        Type
        Value
      }
      Icon
      OpenInNewWindow
      OverriddenTitle
      OverrideTitle
      Title
    }
  }
  ParentId
  Title
  TitleLink {
    Type
    Value
  }
  Zone
}
    `;
export const MyAccountHomepageSelectorDataFragmentDoc = gql`
    fragment MyAccountHomepageSelectorData on MyAccountHomepageSelector {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const MyAccountViewDataFragmentDoc = gql`
    fragment MyAccountViewData on MyAccountView {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderCancelNotificationDataFragmentDoc = gql`
    fragment OrderCancelNotificationData on OrderCancelNotification {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderConfirmationAccountSignUpMessageDataFragmentDoc = gql`
    fragment OrderConfirmationAccountSignUpMessageData on OrderConfirmationAccountSignUpMessage {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderConfirmationHeaderDataFragmentDoc = gql`
    fragment OrderConfirmationHeaderData on OrderConfirmationHeader {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderConfirmationOrderInformationDataFragmentDoc = gql`
    fragment OrderConfirmationOrderInformationData on OrderConfirmationOrderInformation {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderConfirmationPageContainerDataFragmentDoc = gql`
    fragment OrderConfirmationPageContainerData on OrderConfirmationPageContainer {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderConfirmationProductListDataFragmentDoc = gql`
    fragment OrderConfirmationProductListData on OrderConfirmationProductList {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderConfirmationTotalDataFragmentDoc = gql`
    fragment OrderConfirmationTotalData on OrderConfirmationTotal {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDateDataFragmentDoc = gql`
    fragment OrderDateData on OrderDate {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsBillingAddressDataFragmentDoc = gql`
    fragment OrderDetailsBillingAddressData on OrderDetailsBillingAddress {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsButtonSetDataFragmentDoc = gql`
    fragment OrderDetailsButtonSetData on OrderDetailsButtonSet {
  __typename
  ButtonOrderContainer {
    ButtonOrders {
      Fields {
        Name
      }
    }
  }
  CustomCSS
  GenerateEmailAttachmentFromWebpage
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsNotesDataFragmentDoc = gql`
    fragment OrderDetailsNotesData on OrderDetailsNotes {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsPaymentTermsDataFragmentDoc = gql`
    fragment OrderDetailsPaymentTermsData on OrderDetailsPaymentTerms {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsRequestedDateDataFragmentDoc = gql`
    fragment OrderDetailsRequestedDateData on OrderDetailsRequestedDate {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsShipmentPackagesDataFragmentDoc = gql`
    fragment OrderDetailsShipmentPackagesData on OrderDetailsShipmentPackages {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsShippingAddressDataFragmentDoc = gql`
    fragment OrderDetailsShippingAddressData on OrderDetailsShippingAddress {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsShippingMethodDataFragmentDoc = gql`
    fragment OrderDetailsShippingMethodData on OrderDetailsShippingMethod {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsStatusDataFragmentDoc = gql`
    fragment OrderDetailsStatusData on OrderDetailsStatus {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsSummaryTableDataFragmentDoc = gql`
    fragment OrderDetailsSummaryTableData on OrderDetailsSummaryTable {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsTitleDataFragmentDoc = gql`
    fragment OrderDetailsTitleData on OrderDetailsTitle {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsTotalDataFragmentDoc = gql`
    fragment OrderDetailsTotalData on OrderDetailsTotal {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsVatNumberDataFragmentDoc = gql`
    fragment OrderDetailsVatNumberData on OrderDetailsVatNumber {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderDetailsVmiLocationDataFragmentDoc = gql`
    fragment OrderDetailsVmiLocationData on OrderDetailsVmiLocation {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistoryHeaderDataFragmentDoc = gql`
    fragment OrderHistoryHeaderData on OrderHistoryHeader {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistoryPaginationDataFragmentDoc = gql`
    fragment OrderHistoryPaginationData on OrderHistoryPagination {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistoryResultCountDataFragmentDoc = gql`
    fragment OrderHistoryResultCountData on OrderHistoryResultCount {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchClearButtonDataFragmentDoc = gql`
    fragment OrderHistorySearchClearButtonData on OrderHistorySearchClearButton {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFieldDateRangeDataFragmentDoc = gql`
    fragment OrderHistorySearchFieldDateRangeData on OrderHistorySearchFieldDateRange {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFieldOrderNumberDataFragmentDoc = gql`
    fragment OrderHistorySearchFieldOrderNumberData on OrderHistorySearchFieldOrderNumber {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFieldOrderTotalDataFragmentDoc = gql`
    fragment OrderHistorySearchFieldOrderTotalData on OrderHistorySearchFieldOrderTotal {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFieldOrderTotalOperatorDataFragmentDoc = gql`
    fragment OrderHistorySearchFieldOrderTotalOperatorData on OrderHistorySearchFieldOrderTotalOperator {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFieldPoNumberDataFragmentDoc = gql`
    fragment OrderHistorySearchFieldPoNumberData on OrderHistorySearchFieldPoNumber {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFieldProductErpNumber2DataFragmentDoc = gql`
    fragment OrderHistorySearchFieldProductErpNumber2Data on OrderHistorySearchFieldProductErpNumber2 {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFieldShipTosDataFragmentDoc = gql`
    fragment OrderHistorySearchFieldShipTosData on OrderHistorySearchFieldShipTos {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFieldStatusDataFragmentDoc = gql`
    fragment OrderHistorySearchFieldStatusData on OrderHistorySearchFieldStatus {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchFormDataFragmentDoc = gql`
    fragment OrderHistorySearchFormData on OrderHistorySearchForm {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistorySearchTagsDataFragmentDoc = gql`
    fragment OrderHistorySearchTagsData on OrderHistorySearchTags {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderHistoryTableDataFragmentDoc = gql`
    fragment OrderHistoryTableData on OrderHistoryTable {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderPoDataFragmentDoc = gql`
    fragment OrderPoData on OrderPo {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const OrderSalespersonDataFragmentDoc = gql`
    fragment OrderSalespersonData on OrderSalesperson {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const ProductDataFragmentDoc = gql`
    fragment ProductData on Product {
  __typename
  ActivateOn
  AllowZeroPricing
  AttributeTypeContainer {
    AttributeTypes {
      AttributeValueContainer {
        AttributeValues {
          Id
          SortOrder
          Value
          ValueDisplay
        }
      }
      Id
      IncludeOnProduct
      IsComparable
      IsFilter
      IsSearchable
      Label
      Name
      SortOrder
    }
  }
  CanAddToCart
  CanAddToWishlist
  CanConfigure
  CanShowPrice
  CanShowUnitOfMeasure
  CanonicalUrl
  CantBuy
  Categories
  ChildTraitValuesContainer {
    ChildTraitValues {
      Id
      StyleTraitId
      Value
      ValueDisplay
    }
  }
  ConfigurationType
  ContentContainer {
    MetaDescription
    MetaKeywords
    OpenGraphImage
    OpenGraphTitle
    OpenGraphUrl
    PageTitle
    Contents {
      PublishToProductionOn
      CustomerSegment
      DeviceType
      Html
      Language
    }
  }
  CustomerProductNumber
  DeactivateOn
  DefaultChildProductId
  Detail {
    AllowAnyGiftCardAmount
    CanBackOrder
    Configuration {
      HasDefaults
      IsKit
    }
    HasMsds
    IsGiftCard
    IsHazardousGood
    IsSpecialOrder
    IsSubscription
    ModelNumber
    MultipleSaleQty
    Name
    PriceCode
    ProductCode
    ReplacementProductId
    RoundingRule
    ShippingClassification
    ShippingHeight
    ShippingLength
    ShippingWeight
    ShippingWidth
    Sku
    SortOrder
    Subscription {
      SubscriptionAddToInitialOrder
      SubscriptionAllMonths
      SubscriptionApril
      SubscriptionAugust
      SubscriptionDecember
      SubscriptionFebruary
      SubscriptionFixedPrice
      SubscriptionJanuary
      SubscriptionJuly
      SubscriptionJune
      SubscriptionMarch
      SubscriptionMay
      SubscriptionNovember
      SubscriptionOctober
      SubscriptionPeriodsPerCycle
      SubscriptionSeptember
      SubscriptionTotalCycles
    }
    TaxCategory
    TaxCode1
    TaxCode2
    Unspsc
    UpcCode
  }
  DocumentContainer {
    Documents {
      Description
      DocumentType
      FilePath
      Id
      Name
    }
  }
  ExcludeFromRecommendations
  ExcludeWhenOutOfSeason
  Id
  ImageAltText
  ImageContainer {
    Images {
      Id
      ImageAltText
      ImageType
      LargeImagePath
      MediumImagePath
      Name
      SmallImagePath
      SortOrder
    }
  }
  InventoryFulfillment {
    CustomAvailabilityMessage
    ErpManaged
    IsStocked
    IsStockedAtWarehouseLevel
    LowStockLevel
    ReplacementProductId
    TrackInventory
    UnitOfMeasure
  }
  IsDiscontinued
  IsSponsored
  IsVariantParent
  LargeImagePath
  ManufacturerItem
  MediumImagePath
  MinimumOrderQty
  PackDescription
  PriceFacet
  ProductNumber
  RelatedProductContainer {
    RelatedProducts {
      ProductId
      RelatedProductId
      RelationName
      SortOrder
      SystemListValueId
    }
  }
  ProductTitle
  QuoteRequired
  RestrictionGroupContainer {
    RestrictionGroups {
      CustomerRuleManagerId
      Description
      DisplayType
      IsActive
      IsLocationBased
      Name
      ProductRuleManagerId
    }
  }
  SalePriceLabel
  Score
  Seasonal {
    IsSeasonal
    SeasonalApril
    SeasonalAugust
    SeasonalDecember
    SeasonalFebruary
    SeasonalJanuary
    SeasonalJuly
    SeasonalJune
    SeasonalMarch
    SeasonalMay
    SeasonalNovember
    SeasonalOctober
    SeasonalSeptember
  }
  SmallImagePath
  SortPriority
  SpecificationContainer {
    Specifications {
      Description
      HtmlContent
      Id
      Name
      NameDisplay
      SortOrder
      Value
    }
  }
  TrackInventory
  UnitListPrice
  UnitListPriceDisplay
  UnitOfMeasureContainer {
    UnitOfMeasures {
      Description
      Id
      IsDefault
      QtyPerBaseUnitOfMeasure
      RoundingRule
      UnitOfMeasureDisplay
      UnitOfMeasureText
    }
  }
  Uri
  Url
  UrlSegment
  VariantTraitContainer {
    VariantTraits {
      DisplayTextWithSwatch
      DisplayType
      Id
      Name
      NameDisplay
      NumberOfSwatchesVisible
      SortOrder
      TraitValueContainer {
        TraitValues {
          Id
          IsDefault
          Product {
            CanAddToCart
            ImageContainer {
              Images {
                Id
                ImageAltText
                ImageType
                LargeImagePath
                MediumImagePath
                Name
                SmallImagePath
              }
            }
            ProductId
            ProductNumber
            ProductTitle
            UnitListPrice
            UnitPriceDisplay
            UrlSegment
          }
          SortOrder
          SwatchColorValue
          SwatchImageValue
          SwatchType
          Value
          ValueDisplay
        }
      }
      UnselectedValue
    }
  }
  VariantTypeId
  WarehouseContainer {
    Warehouses {
      Description
      Id
      Name
      QtyAvailable
    }
  }
}
    `;
export const ProductDetailsViewDataFragmentDoc = gql`
    fragment ProductDetailsViewData on ProductDetailsView {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const ProductListCardListDataFragmentDoc = gql`
    fragment ProductListCardListData on ProductListCardList {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const ProductListColumnsDataFragmentDoc = gql`
    fragment ProductListColumnsData on ProductListColumns {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const RequestRmaHeaderDataFragmentDoc = gql`
    fragment RequestRmaHeaderData on RequestRmaHeader {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const RequestRmaInformationDataFragmentDoc = gql`
    fragment RequestRmaInformationData on RequestRmaInformation {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const RequestRmaNotesDataFragmentDoc = gql`
    fragment RequestRmaNotesData on RequestRmaNotes {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const RequestRmaProductListDataFragmentDoc = gql`
    fragment RequestRmaProductListData on RequestRmaProductList {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const RequestRmaProductListButtonsDataFragmentDoc = gql`
    fragment RequestRmaProductListButtonsData on RequestRmaProductListButtons {
  __typename
  CustomCSS
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const SharedContentDataFragmentDoc = gql`
    fragment SharedContentData on SharedContent {
  __typename
  CustomCSS
  Id
  IsLayout
  PageId
  ParentId
  Type
  Zone
}
    `;
export const SignInCreateNewAccountDataFragmentDoc = gql`
    fragment SignInCreateNewAccountData on SignInCreateNewAccount {
  __typename
  CustomCSS
  FullWidthButton
  Id
  IsLayout
  ParentId
  Text
  Type
  Zone
}
    `;
export const SignInExistingAccountDataFragmentDoc = gql`
    fragment SignInExistingAccountData on SignInExistingAccount {
  __typename
  ChangePasswordInstructions
  CustomCSS
  FullWidthButton
  Id
  IsLayout
  ParentId
  Type
  Zone
}
    `;
export const SlideShowDataFragmentDoc = gql`
    fragment SlideShowData on SlideShow {
  __typename
  Autoplay
  CssClass
  CustomCSS
  CustomFontSizes
  Height
  Id
  IsLayout
  ParentId
  ResponsiveFontSizes
  ShowArrows
  SlideContainer {
    SlideItems {
      Background
      BackgroundColor
      ButtonLabel
      ButtonLink {
        Type
        Url
        Value
      }
      BackgroundLink {
        Type
        Value
        Url
      }
      ButtonVariant
      CenterTextVertically
      ContentPadding
      FocalPoint
      Heading
      Image
      ImageOverlay
      PartialOverlay
      PartialOverlayPositioning
      ResponsiveImageBehavior
      SlideTitle
      Subheading
    }
  }
  SlideIndicator
  SlideType
  TextAlignment
  Zone
}
    `;
export const SubscribeDataFragmentDoc = gql`
    fragment SubscribeData on Subscribe {
  __typename
  Alignment
  CustomCSS
  Description
  Disclaimer
  Id
  IsLayout
  Label
  ParentId
  Placeholder
  Title
  Type
  Zone
}
    `;
export const getCheckoutShippingPageContentDocument = gql`
    query getCheckoutShippingPageContent {
  CheckoutShippingPage {
    items {
      Type
      WidgetContainer {
        __typename
        Widgets {
          ...BasicBannerData
          ...BasicButtonData
          ...BasicGridData
          ...BasicImageData
          ...BasicLinkData
          ...BasicLogoData
          ...BasicPageTitleData
          ...BasicQuestionAnswersData
          ...BasicRichContentData
          ...BasicRowData
          ...BasicRowsData
          ...BasicSocialLinksData
          ...CartActionsData
          ...CartApproverMessageData
          ...CartFulfillmentMethodSelectorData
          ...CartHeaderData
          ...CartLinesData
          ...CartPageContainerData
          ...CartTotalData
          ...CategoryListData
          ...CheckoutReviewAndSubmitActionButtonsData
          ...CheckoutReviewAndSubmitCarrierServiceData
          ...CheckoutReviewAndSubmitCartTotalData
          ...CheckoutReviewAndSubmitHeaderData
          ...CheckoutReviewAndSubmitPageContainerData
          ...CheckoutReviewAndSubmitPaymentDetailsData
          ...CheckoutReviewAndSubmitProductListData
          ...CheckoutReviewAndSubmitPromotionCodeData
          ...CheckoutReviewAndSubmitShippingInfoData
          ...CheckoutShippingAddressesData
          ...CheckoutShippingCartTotalData
          ...CheckoutShippingFulfillmentMethodSelectorData
          ...CheckoutShippingHeaderData
          ...CheckoutShippingOrderNotesEntryData
          ...CheckoutShippingPageContainerData
          ...CommonCartLinkData
          ...CommonHeaderSignInData
          ...CommonPlaceholderData
          ...CommonProductCarouselData
          ...CommonRatingAndReviewData
          ...CommonSignInData
          ...FooterContainerData
          ...HeaderMainNavigationData
          ...HeaderSearchInputData
          ...LinkListData
          ...ProductDetailsViewData
          ...ProductListCardListData
          ...ProductListColumnsData
          ...SharedContentData
          ...SlideShowData
          ...SubscribeData
        }
      }
    }
  }
}
    ${BasicBannerDataFragmentDoc}
${BasicButtonDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicImageDataFragmentDoc}
${BasicLinkDataFragmentDoc}
${BasicLogoDataFragmentDoc}
${BasicPageTitleDataFragmentDoc}
${BasicQuestionAnswersDataFragmentDoc}
${BasicRichContentDataFragmentDoc}
${BasicRowDataFragmentDoc}
${BasicRowsDataFragmentDoc}
${BasicSocialLinksDataFragmentDoc}
${CartActionsDataFragmentDoc}
${CartApproverMessageDataFragmentDoc}
${CartFulfillmentMethodSelectorDataFragmentDoc}
${CartHeaderDataFragmentDoc}
${CartLinesDataFragmentDoc}
${CartPageContainerDataFragmentDoc}
${CartTotalDataFragmentDoc}
${CategoryListDataFragmentDoc}
${CheckoutReviewAndSubmitActionButtonsDataFragmentDoc}
${CheckoutReviewAndSubmitCarrierServiceDataFragmentDoc}
${CheckoutReviewAndSubmitCartTotalDataFragmentDoc}
${CheckoutReviewAndSubmitHeaderDataFragmentDoc}
${CheckoutReviewAndSubmitPageContainerDataFragmentDoc}
${CheckoutReviewAndSubmitPaymentDetailsDataFragmentDoc}
${CheckoutReviewAndSubmitProductListDataFragmentDoc}
${CheckoutReviewAndSubmitPromotionCodeDataFragmentDoc}
${CheckoutReviewAndSubmitShippingInfoDataFragmentDoc}
${CheckoutShippingAddressesDataFragmentDoc}
${CheckoutShippingCartTotalDataFragmentDoc}
${CheckoutShippingFulfillmentMethodSelectorDataFragmentDoc}
${CheckoutShippingHeaderDataFragmentDoc}
${CheckoutShippingOrderNotesEntryDataFragmentDoc}
${CheckoutShippingPageContainerDataFragmentDoc}
${CommonCartLinkDataFragmentDoc}
${CommonHeaderSignInDataFragmentDoc}
${CommonPlaceholderDataFragmentDoc}
${CommonProductCarouselDataFragmentDoc}
${CommonRatingAndReviewDataFragmentDoc}
${CommonSignInDataFragmentDoc}
${FooterContainerDataFragmentDoc}
${HeaderMainNavigationDataFragmentDoc}
${HeaderSearchInputDataFragmentDoc}
${LinkListDataFragmentDoc}
${ProductDetailsViewDataFragmentDoc}
${ProductListCardListDataFragmentDoc}
${ProductListColumnsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SlideShowDataFragmentDoc}
${SubscribeDataFragmentDoc}`;
export const getCheckoutReviewAndSubmitPageContentDocument = gql`
    query getCheckoutReviewAndSubmitPageContent {
  CheckoutReviewAndSubmitPage {
    items {
      Type
      WidgetContainer {
        __typename
        Widgets {
          ...BasicBannerData
          ...BasicButtonData
          ...BasicGridData
          ...BasicImageData
          ...BasicLinkData
          ...BasicLogoData
          ...BasicPageTitleData
          ...BasicQuestionAnswersData
          ...BasicRichContentData
          ...BasicRowData
          ...BasicRowsData
          ...BasicSocialLinksData
          ...CartActionsData
          ...CartApproverMessageData
          ...CartFulfillmentMethodSelectorData
          ...CartHeaderData
          ...CartLinesData
          ...CartPageContainerData
          ...CartTotalData
          ...CategoryListData
          ...CheckoutReviewAndSubmitActionButtonsData
          ...CheckoutReviewAndSubmitCarrierServiceData
          ...CheckoutReviewAndSubmitCartTotalData
          ...CheckoutReviewAndSubmitHeaderData
          ...CheckoutReviewAndSubmitPageContainerData
          ...CheckoutReviewAndSubmitPaymentDetailsData
          ...CheckoutReviewAndSubmitProductListData
          ...CheckoutReviewAndSubmitPromotionCodeData
          ...CheckoutReviewAndSubmitShippingInfoData
          ...CheckoutShippingAddressesData
          ...CheckoutShippingCartTotalData
          ...CheckoutShippingFulfillmentMethodSelectorData
          ...CheckoutShippingHeaderData
          ...CheckoutShippingOrderNotesEntryData
          ...CheckoutShippingPageContainerData
          ...CommonCartLinkData
          ...CommonHeaderSignInData
          ...CommonPlaceholderData
          ...CommonProductCarouselData
          ...CommonRatingAndReviewData
          ...CommonSignInData
          ...FooterContainerData
          ...HeaderMainNavigationData
          ...HeaderSearchInputData
          ...LinkListData
          ...ProductDetailsViewData
          ...ProductListCardListData
          ...ProductListColumnsData
          ...SharedContentData
          ...SlideShowData
          ...SubscribeData
        }
      }
    }
  }
}
    ${BasicBannerDataFragmentDoc}
${BasicButtonDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicImageDataFragmentDoc}
${BasicLinkDataFragmentDoc}
${BasicLogoDataFragmentDoc}
${BasicPageTitleDataFragmentDoc}
${BasicQuestionAnswersDataFragmentDoc}
${BasicRichContentDataFragmentDoc}
${BasicRowDataFragmentDoc}
${BasicRowsDataFragmentDoc}
${BasicSocialLinksDataFragmentDoc}
${CartActionsDataFragmentDoc}
${CartApproverMessageDataFragmentDoc}
${CartFulfillmentMethodSelectorDataFragmentDoc}
${CartHeaderDataFragmentDoc}
${CartLinesDataFragmentDoc}
${CartPageContainerDataFragmentDoc}
${CartTotalDataFragmentDoc}
${CategoryListDataFragmentDoc}
${CheckoutReviewAndSubmitActionButtonsDataFragmentDoc}
${CheckoutReviewAndSubmitCarrierServiceDataFragmentDoc}
${CheckoutReviewAndSubmitCartTotalDataFragmentDoc}
${CheckoutReviewAndSubmitHeaderDataFragmentDoc}
${CheckoutReviewAndSubmitPageContainerDataFragmentDoc}
${CheckoutReviewAndSubmitPaymentDetailsDataFragmentDoc}
${CheckoutReviewAndSubmitProductListDataFragmentDoc}
${CheckoutReviewAndSubmitPromotionCodeDataFragmentDoc}
${CheckoutReviewAndSubmitShippingInfoDataFragmentDoc}
${CheckoutShippingAddressesDataFragmentDoc}
${CheckoutShippingCartTotalDataFragmentDoc}
${CheckoutShippingFulfillmentMethodSelectorDataFragmentDoc}
${CheckoutShippingHeaderDataFragmentDoc}
${CheckoutShippingOrderNotesEntryDataFragmentDoc}
${CheckoutShippingPageContainerDataFragmentDoc}
${CommonCartLinkDataFragmentDoc}
${CommonHeaderSignInDataFragmentDoc}
${CommonPlaceholderDataFragmentDoc}
${CommonProductCarouselDataFragmentDoc}
${CommonRatingAndReviewDataFragmentDoc}
${CommonSignInDataFragmentDoc}
${FooterContainerDataFragmentDoc}
${HeaderMainNavigationDataFragmentDoc}
${HeaderSearchInputDataFragmentDoc}
${LinkListDataFragmentDoc}
${ProductDetailsViewDataFragmentDoc}
${ProductListCardListDataFragmentDoc}
${ProductListColumnsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SlideShowDataFragmentDoc}
${SubscribeDataFragmentDoc}`;
export const getOrderConfirmationPageContentDocument = gql`
    query getOrderConfirmationPageContent {
  OrderConfirmationPage {
    items {
      Type
      WidgetContainer {
        __typename
        Widgets {
          ...BasicBannerData
          ...BasicButtonData
          ...BasicGridData
          ...BasicImageData
          ...BasicLinkData
          ...BasicLogoData
          ...BasicPageTitleData
          ...BasicQuestionAnswersData
          ...BasicRichContentData
          ...BasicRowData
          ...BasicRowsData
          ...BasicSocialLinksData
          ...CartActionsData
          ...CartApproverMessageData
          ...CartFulfillmentMethodSelectorData
          ...CartHeaderData
          ...CartLinesData
          ...CartPageContainerData
          ...CartTotalData
          ...CategoryListData
          ...OrderConfirmationAccountSignUpMessageData
          ...OrderConfirmationHeaderData
          ...OrderConfirmationOrderInformationData
          ...OrderConfirmationPageContainerData
          ...OrderConfirmationTotalData
          ...CheckoutReviewAndSubmitPaymentDetailsData
          ...CheckoutReviewAndSubmitProductListData
          ...CheckoutReviewAndSubmitPromotionCodeData
          ...CheckoutReviewAndSubmitShippingInfoData
          ...CheckoutShippingAddressesData
          ...CheckoutShippingCartTotalData
          ...CheckoutShippingFulfillmentMethodSelectorData
          ...CheckoutShippingHeaderData
          ...CheckoutShippingOrderNotesEntryData
          ...CheckoutShippingPageContainerData
          ...CommonCartLinkData
          ...CommonHeaderSignInData
          ...CommonPlaceholderData
          ...CommonProductCarouselData
          ...CommonRatingAndReviewData
          ...CommonSignInData
          ...FooterContainerData
          ...HeaderMainNavigationData
          ...HeaderSearchInputData
          ...LinkListData
          ...ProductDetailsViewData
          ...ProductListCardListData
          ...ProductListColumnsData
          ...SharedContentData
          ...SlideShowData
          ...SubscribeData
        }
      }
    }
  }
}
    ${BasicBannerDataFragmentDoc}
${BasicButtonDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicImageDataFragmentDoc}
${BasicLinkDataFragmentDoc}
${BasicLogoDataFragmentDoc}
${BasicPageTitleDataFragmentDoc}
${BasicQuestionAnswersDataFragmentDoc}
${BasicRichContentDataFragmentDoc}
${BasicRowDataFragmentDoc}
${BasicRowsDataFragmentDoc}
${BasicSocialLinksDataFragmentDoc}
${CartActionsDataFragmentDoc}
${CartApproverMessageDataFragmentDoc}
${CartFulfillmentMethodSelectorDataFragmentDoc}
${CartHeaderDataFragmentDoc}
${CartLinesDataFragmentDoc}
${CartPageContainerDataFragmentDoc}
${CartTotalDataFragmentDoc}
${CategoryListDataFragmentDoc}
${OrderConfirmationAccountSignUpMessageDataFragmentDoc}
${OrderConfirmationHeaderDataFragmentDoc}
${OrderConfirmationOrderInformationDataFragmentDoc}
${OrderConfirmationPageContainerDataFragmentDoc}
${OrderConfirmationTotalDataFragmentDoc}
${CheckoutReviewAndSubmitPaymentDetailsDataFragmentDoc}
${CheckoutReviewAndSubmitProductListDataFragmentDoc}
${CheckoutReviewAndSubmitPromotionCodeDataFragmentDoc}
${CheckoutReviewAndSubmitShippingInfoDataFragmentDoc}
${CheckoutShippingAddressesDataFragmentDoc}
${CheckoutShippingCartTotalDataFragmentDoc}
${CheckoutShippingFulfillmentMethodSelectorDataFragmentDoc}
${CheckoutShippingHeaderDataFragmentDoc}
${CheckoutShippingOrderNotesEntryDataFragmentDoc}
${CheckoutShippingPageContainerDataFragmentDoc}
${CommonCartLinkDataFragmentDoc}
${CommonHeaderSignInDataFragmentDoc}
${CommonPlaceholderDataFragmentDoc}
${CommonProductCarouselDataFragmentDoc}
${CommonRatingAndReviewDataFragmentDoc}
${CommonSignInDataFragmentDoc}
${FooterContainerDataFragmentDoc}
${HeaderMainNavigationDataFragmentDoc}
${HeaderSearchInputDataFragmentDoc}
${LinkListDataFragmentDoc}
${ProductDetailsViewDataFragmentDoc}
${ProductListCardListDataFragmentDoc}
${ProductListColumnsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SlideShowDataFragmentDoc}
${SubscribeDataFragmentDoc}`;
export const getContentByIdDocument = gql`
    query getContentById($id: String!) {
  B2BPage(where: {Id: {eq: $id}}) {
    items {
      Type
      ...B2BHomePageData
      ...B2BPageData
      ...ProductListPageData
      WidgetContainer {
        __typename
        Widgets {
          ...BasicBannerData
          ...BasicButtonData
          ...BasicGridData
          ...BasicImageData
          ...BasicLinkData
          ...BasicLogoData
          ...BasicPageTitleData
          ...BasicQuestionAnswersData
          ...BasicRichContentData
          ...BasicRowData
          ...BasicRowsData
          ...BasicSocialLinksData
          ...CategoryListData
          ...CommonCartLinkData
          ...CommonHeaderSignInData
          ...CommonPlaceholderData
          ...CommonProductCarouselData
          ...CommonRatingAndReviewData
          ...CommonSignInData
          ...FooterContainerData
          ...HeaderMainNavigationData
          ...HeaderSearchInputData
          ...LinkListData
          ...ProductDetailsViewData
          ...ProductListCardListData
          ...ProductListColumnsData
          ...SharedContentData
          ...SlideShowData
          ...SubscribeData
        }
      }
    }
  }
}
    ${B2BHomePageDataFragmentDoc}
${B2BPageDataFragmentDoc}
${ProductListPageDataFragmentDoc}
${BasicBannerDataFragmentDoc}
${BasicButtonDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicImageDataFragmentDoc}
${BasicLinkDataFragmentDoc}
${BasicLogoDataFragmentDoc}
${BasicPageTitleDataFragmentDoc}
${BasicQuestionAnswersDataFragmentDoc}
${BasicRichContentDataFragmentDoc}
${BasicRowDataFragmentDoc}
${BasicRowsDataFragmentDoc}
${BasicSocialLinksDataFragmentDoc}
${CategoryListDataFragmentDoc}
${CommonCartLinkDataFragmentDoc}
${CommonHeaderSignInDataFragmentDoc}
${CommonPlaceholderDataFragmentDoc}
${CommonProductCarouselDataFragmentDoc}
${CommonRatingAndReviewDataFragmentDoc}
${CommonSignInDataFragmentDoc}
${FooterContainerDataFragmentDoc}
${HeaderMainNavigationDataFragmentDoc}
${HeaderSearchInputDataFragmentDoc}
${LinkListDataFragmentDoc}
${ProductDetailsViewDataFragmentDoc}
${ProductListCardListDataFragmentDoc}
${ProductListColumnsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SlideShowDataFragmentDoc}
${SubscribeDataFragmentDoc}`;
export const getContentByPathDocument = gql`
    query getContentByPath($path: String!) {
  B2BPage(where: {Url: {eq: $path}}) {
    items {
      Type
      ...B2BHomePageData
      ...B2BPageData
      ...ProductListPageData
      WidgetContainer {
        __typename
        Widgets {
          ...BasicBannerData
          ...BasicButtonData
          ...BasicGridData
          ...BasicImageData
          ...BasicLinkData
          ...BasicLogoData
          ...BasicPageTitleData
          ...BasicQuestionAnswersData
          ...BasicRichContentData
          ...BasicRowData
          ...BasicRowsData
          ...BasicSocialLinksData
          ...CategoryListData
          ...CommonCartLinkData
          ...CommonHeaderSignInData
          ...CommonPlaceholderData
          ...CommonProductCarouselData
          ...CommonRatingAndReviewData
          ...CommonSignInData
          ...FooterContainerData
          ...HeaderMainNavigationData
          ...HeaderSearchInputData
          ...LinkListData
          ...ProductDetailsViewData
          ...ProductListCardListData
          ...ProductListColumnsData
          ...SharedContentData
          ...SlideShowData
          ...SubscribeData
        }
      }
    }
  }
}
    ${B2BHomePageDataFragmentDoc}
${B2BPageDataFragmentDoc}
${ProductListPageDataFragmentDoc}
${BasicBannerDataFragmentDoc}
${BasicButtonDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicImageDataFragmentDoc}
${BasicLinkDataFragmentDoc}
${BasicLogoDataFragmentDoc}
${BasicPageTitleDataFragmentDoc}
${BasicQuestionAnswersDataFragmentDoc}
${BasicRichContentDataFragmentDoc}
${BasicRowDataFragmentDoc}
${BasicRowsDataFragmentDoc}
${BasicSocialLinksDataFragmentDoc}
${CategoryListDataFragmentDoc}
${CommonCartLinkDataFragmentDoc}
${CommonHeaderSignInDataFragmentDoc}
${CommonPlaceholderDataFragmentDoc}
${CommonProductCarouselDataFragmentDoc}
${CommonRatingAndReviewDataFragmentDoc}
${CommonSignInDataFragmentDoc}
${FooterContainerDataFragmentDoc}
${HeaderMainNavigationDataFragmentDoc}
${HeaderSearchInputDataFragmentDoc}
${LinkListDataFragmentDoc}
${ProductDetailsViewDataFragmentDoc}
${ProductListCardListDataFragmentDoc}
${ProductListColumnsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SlideShowDataFragmentDoc}
${SubscribeDataFragmentDoc}`;
export const getContentByTypeDocument = gql`
    query getContentByType($type: String!) {
  B2BPage(where: {Type: {eq: $type}}) {
    items {
      Type
      ...B2BHomePageData
      ...B2BPageData
      ...ProductListPageData
      WidgetContainer {
        __typename
        Widgets {
          ...AddressBookData
          ...AddressBookPaginationData
          ...AddressBookSearchBoxData
          ...BasicBannerData
          ...BasicButtonData
          ...BasicGridData
          ...BasicImageData
          ...BasicLinkData
          ...BasicLogoData
          ...BasicNavigationListData
          ...BasicPageTitleData
          ...BasicQuestionAnswersData
          ...BasicRichContentData
          ...BasicRowData
          ...BasicRowsData
          ...BasicSocialLinksData
          ...CartActionsData
          ...CartApproverMessageData
          ...CartFulfillmentMethodSelectorData
          ...CartHeaderData
          ...CartLinesData
          ...CartPageContainerData
          ...CartTotalData
          ...CategoryListData
          ...CheckoutReviewAndSubmitActionButtonsData
          ...CheckoutReviewAndSubmitCarrierServiceData
          ...CheckoutReviewAndSubmitCartTotalData
          ...CheckoutReviewAndSubmitHeaderData
          ...CheckoutReviewAndSubmitPageContainerData
          ...CheckoutReviewAndSubmitPaymentDetailsData
          ...CheckoutReviewAndSubmitProductListData
          ...CheckoutReviewAndSubmitPromotionCodeData
          ...CheckoutReviewAndSubmitShippingInfoData
          ...CheckoutShippingAddressesData
          ...CheckoutShippingCartTotalData
          ...CheckoutShippingFulfillmentMethodSelectorData
          ...CheckoutShippingHeaderData
          ...CheckoutShippingOrderNotesEntryData
          ...CheckoutShippingPageContainerData
          ...CommonCartLinkData
          ...CommonHeaderSignInData
          ...CommonPlaceholderData
          ...CommonProductCarouselData
          ...CommonRatingAndReviewData
          ...CommonRecentOrdersData
          ...CommonRecentQuotesData
          ...CommonRecentWhishlistsData
          ...CommonSignInData
          ...CreateAccountData
          ...CreateAddressButtonData
          ...CurrentBillingAddressData
          ...CurrentShippingAddressData
          ...FooterContainerData
          ...HeaderMainNavigationData
          ...HeaderSearchInputData
          ...LinkListData
          ...MyAccountHomepageSelectorData
          ...MyAccountViewData
          ...OrderCancelNotificationData
          ...OrderConfirmationAccountSignUpMessageData
          ...OrderConfirmationHeaderData
          ...OrderConfirmationOrderInformationData
          ...OrderConfirmationPageContainerData
          ...OrderConfirmationProductListData
          ...OrderConfirmationTotalData
          ...OrderDateData
          ...OrderDetailsBillingAddressData
          ...OrderDetailsButtonSetData
          ...OrderDetailsNotesData
          ...OrderDetailsPaymentTermsData
          ...OrderDetailsRequestedDateData
          ...OrderDetailsShipmentPackagesData
          ...OrderDetailsShippingAddressData
          ...OrderDetailsShippingMethodData
          ...OrderDetailsStatusData
          ...OrderDetailsSummaryTableData
          ...OrderDetailsTitleData
          ...OrderDetailsTotalData
          ...OrderDetailsVatNumberData
          ...OrderDetailsVmiLocationData
          ...OrderHistoryHeaderData
          ...OrderHistoryPaginationData
          ...OrderHistoryResultCountData
          ...OrderHistorySearchClearButtonData
          ...OrderHistorySearchFieldDateRangeData
          ...OrderHistorySearchFieldOrderNumberData
          ...OrderHistorySearchFieldOrderTotalData
          ...OrderHistorySearchFieldOrderTotalOperatorData
          ...OrderHistorySearchFieldPoNumberData
          ...OrderHistorySearchFieldProductErpNumber2Data
          ...OrderHistorySearchFieldShipTosData
          ...OrderHistorySearchFieldStatusData
          ...OrderHistorySearchFormData
          ...OrderHistorySearchTagsData
          ...OrderHistoryTableData
          ...OrderPoData
          ...OrderSalespersonData
          ...ProductDetailsViewData
          ...ProductListCardListData
          ...ProductListColumnsData
          ...RequestRmaHeaderData
          ...RequestRmaInformationData
          ...RequestRmaNotesData
          ...RequestRmaProductListData
          ...RequestRmaProductListButtonsData
          ...SharedContentData
          ...SignInCreateNewAccountData
          ...SignInExistingAccountData
          ...SlideShowData
          ...SubscribeData
        }
      }
    }
  }
}
    ${B2BHomePageDataFragmentDoc}
${B2BPageDataFragmentDoc}
${ProductListPageDataFragmentDoc}
${AddressBookDataFragmentDoc}
${AddressBookPaginationDataFragmentDoc}
${AddressBookSearchBoxDataFragmentDoc}
${BasicBannerDataFragmentDoc}
${BasicButtonDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicImageDataFragmentDoc}
${BasicLinkDataFragmentDoc}
${BasicLogoDataFragmentDoc}
${BasicNavigationListDataFragmentDoc}
${BasicPageTitleDataFragmentDoc}
${BasicQuestionAnswersDataFragmentDoc}
${BasicRichContentDataFragmentDoc}
${BasicRowDataFragmentDoc}
${BasicRowsDataFragmentDoc}
${BasicSocialLinksDataFragmentDoc}
${CartActionsDataFragmentDoc}
${CartApproverMessageDataFragmentDoc}
${CartFulfillmentMethodSelectorDataFragmentDoc}
${CartHeaderDataFragmentDoc}
${CartLinesDataFragmentDoc}
${CartPageContainerDataFragmentDoc}
${CartTotalDataFragmentDoc}
${CategoryListDataFragmentDoc}
${CheckoutReviewAndSubmitActionButtonsDataFragmentDoc}
${CheckoutReviewAndSubmitCarrierServiceDataFragmentDoc}
${CheckoutReviewAndSubmitCartTotalDataFragmentDoc}
${CheckoutReviewAndSubmitHeaderDataFragmentDoc}
${CheckoutReviewAndSubmitPageContainerDataFragmentDoc}
${CheckoutReviewAndSubmitPaymentDetailsDataFragmentDoc}
${CheckoutReviewAndSubmitProductListDataFragmentDoc}
${CheckoutReviewAndSubmitPromotionCodeDataFragmentDoc}
${CheckoutReviewAndSubmitShippingInfoDataFragmentDoc}
${CheckoutShippingAddressesDataFragmentDoc}
${CheckoutShippingCartTotalDataFragmentDoc}
${CheckoutShippingFulfillmentMethodSelectorDataFragmentDoc}
${CheckoutShippingHeaderDataFragmentDoc}
${CheckoutShippingOrderNotesEntryDataFragmentDoc}
${CheckoutShippingPageContainerDataFragmentDoc}
${CommonCartLinkDataFragmentDoc}
${CommonHeaderSignInDataFragmentDoc}
${CommonPlaceholderDataFragmentDoc}
${CommonProductCarouselDataFragmentDoc}
${CommonRatingAndReviewDataFragmentDoc}
${CommonRecentOrdersDataFragmentDoc}
${CommonRecentQuotesDataFragmentDoc}
${CommonRecentWhishlistsDataFragmentDoc}
${CommonSignInDataFragmentDoc}
${CreateAccountDataFragmentDoc}
${CreateAddressButtonDataFragmentDoc}
${CurrentBillingAddressDataFragmentDoc}
${CurrentShippingAddressDataFragmentDoc}
${FooterContainerDataFragmentDoc}
${HeaderMainNavigationDataFragmentDoc}
${HeaderSearchInputDataFragmentDoc}
${LinkListDataFragmentDoc}
${MyAccountHomepageSelectorDataFragmentDoc}
${MyAccountViewDataFragmentDoc}
${OrderCancelNotificationDataFragmentDoc}
${OrderConfirmationAccountSignUpMessageDataFragmentDoc}
${OrderConfirmationHeaderDataFragmentDoc}
${OrderConfirmationOrderInformationDataFragmentDoc}
${OrderConfirmationPageContainerDataFragmentDoc}
${OrderConfirmationProductListDataFragmentDoc}
${OrderConfirmationTotalDataFragmentDoc}
${OrderDateDataFragmentDoc}
${OrderDetailsBillingAddressDataFragmentDoc}
${OrderDetailsButtonSetDataFragmentDoc}
${OrderDetailsNotesDataFragmentDoc}
${OrderDetailsPaymentTermsDataFragmentDoc}
${OrderDetailsRequestedDateDataFragmentDoc}
${OrderDetailsShipmentPackagesDataFragmentDoc}
${OrderDetailsShippingAddressDataFragmentDoc}
${OrderDetailsShippingMethodDataFragmentDoc}
${OrderDetailsStatusDataFragmentDoc}
${OrderDetailsSummaryTableDataFragmentDoc}
${OrderDetailsTitleDataFragmentDoc}
${OrderDetailsTotalDataFragmentDoc}
${OrderDetailsVatNumberDataFragmentDoc}
${OrderDetailsVmiLocationDataFragmentDoc}
${OrderHistoryHeaderDataFragmentDoc}
${OrderHistoryPaginationDataFragmentDoc}
${OrderHistoryResultCountDataFragmentDoc}
${OrderHistorySearchClearButtonDataFragmentDoc}
${OrderHistorySearchFieldDateRangeDataFragmentDoc}
${OrderHistorySearchFieldOrderNumberDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalOperatorDataFragmentDoc}
${OrderHistorySearchFieldPoNumberDataFragmentDoc}
${OrderHistorySearchFieldProductErpNumber2DataFragmentDoc}
${OrderHistorySearchFieldShipTosDataFragmentDoc}
${OrderHistorySearchFieldStatusDataFragmentDoc}
${OrderHistorySearchFormDataFragmentDoc}
${OrderHistorySearchTagsDataFragmentDoc}
${OrderHistoryTableDataFragmentDoc}
${OrderPoDataFragmentDoc}
${OrderSalespersonDataFragmentDoc}
${ProductDetailsViewDataFragmentDoc}
${ProductListCardListDataFragmentDoc}
${ProductListColumnsDataFragmentDoc}
${RequestRmaHeaderDataFragmentDoc}
${RequestRmaInformationDataFragmentDoc}
${RequestRmaNotesDataFragmentDoc}
${RequestRmaProductListDataFragmentDoc}
${RequestRmaProductListButtonsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SignInCreateNewAccountDataFragmentDoc}
${SignInExistingAccountDataFragmentDoc}
${SlideShowDataFragmentDoc}
${SubscribeDataFragmentDoc}`;
export const getMyAccountPageContentDocument = gql`
    query getMyAccountPageContent {
  MyAccountPage {
    items {
      Type
      WidgetContainer {
        __typename
        Widgets {
          ...BasicRowData
          ...BasicGridData
          ...BasicNavigationListData
          ...AddressBookData
          ...AddressBookPaginationData
          ...AddressBookSearchBoxData
          ...CommonRecentOrdersData
          ...CommonRecentQuotesData
          ...CommonRecentWhishlistsData
          ...CreateAccountData
          ...CreateAddressButtonData
          ...CurrentBillingAddressData
          ...CurrentShippingAddressData
          ...MyAccountHomepageSelectorData
          ...MyAccountViewData
          ...OrderCancelNotificationData
          ...OrderConfirmationAccountSignUpMessageData
          ...OrderConfirmationHeaderData
          ...OrderConfirmationOrderInformationData
          ...OrderConfirmationPageContainerData
          ...OrderConfirmationProductListData
          ...OrderConfirmationTotalData
          ...OrderDateData
          ...OrderDetailsBillingAddressData
          ...OrderDetailsButtonSetData
          ...OrderDetailsNotesData
          ...OrderDetailsPaymentTermsData
          ...OrderDetailsRequestedDateData
          ...OrderDetailsShipmentPackagesData
          ...OrderDetailsShippingAddressData
          ...OrderDetailsShippingMethodData
          ...OrderDetailsStatusData
          ...OrderDetailsSummaryTableData
          ...OrderDetailsTitleData
          ...OrderDetailsTotalData
          ...OrderDetailsVatNumberData
          ...OrderDetailsVmiLocationData
          ...OrderHistoryHeaderData
          ...OrderHistoryPaginationData
          ...OrderHistoryResultCountData
          ...OrderHistorySearchClearButtonData
          ...OrderHistorySearchFieldDateRangeData
          ...OrderHistorySearchFieldOrderNumberData
          ...OrderHistorySearchFieldOrderTotalData
          ...OrderHistorySearchFieldOrderTotalOperatorData
          ...OrderHistorySearchFieldPoNumberData
          ...OrderHistorySearchFieldProductErpNumber2Data
          ...OrderHistorySearchFieldShipTosData
          ...OrderHistorySearchFieldStatusData
          ...OrderHistorySearchFormData
          ...OrderHistorySearchTagsData
          ...OrderHistoryTableData
          ...OrderPoData
          ...OrderSalespersonData
          ...RequestRmaHeaderData
          ...RequestRmaInformationData
          ...RequestRmaNotesData
          ...RequestRmaProductListData
          ...RequestRmaProductListButtonsData
          ...SharedContentData
          ...SignInCreateNewAccountData
          ...SignInExistingAccountData
        }
      }
    }
  }
}
    ${BasicRowDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicNavigationListDataFragmentDoc}
${AddressBookDataFragmentDoc}
${AddressBookPaginationDataFragmentDoc}
${AddressBookSearchBoxDataFragmentDoc}
${CommonRecentOrdersDataFragmentDoc}
${CommonRecentQuotesDataFragmentDoc}
${CommonRecentWhishlistsDataFragmentDoc}
${CreateAccountDataFragmentDoc}
${CreateAddressButtonDataFragmentDoc}
${CurrentBillingAddressDataFragmentDoc}
${CurrentShippingAddressDataFragmentDoc}
${MyAccountHomepageSelectorDataFragmentDoc}
${MyAccountViewDataFragmentDoc}
${OrderCancelNotificationDataFragmentDoc}
${OrderConfirmationAccountSignUpMessageDataFragmentDoc}
${OrderConfirmationHeaderDataFragmentDoc}
${OrderConfirmationOrderInformationDataFragmentDoc}
${OrderConfirmationPageContainerDataFragmentDoc}
${OrderConfirmationProductListDataFragmentDoc}
${OrderConfirmationTotalDataFragmentDoc}
${OrderDateDataFragmentDoc}
${OrderDetailsBillingAddressDataFragmentDoc}
${OrderDetailsButtonSetDataFragmentDoc}
${OrderDetailsNotesDataFragmentDoc}
${OrderDetailsPaymentTermsDataFragmentDoc}
${OrderDetailsRequestedDateDataFragmentDoc}
${OrderDetailsShipmentPackagesDataFragmentDoc}
${OrderDetailsShippingAddressDataFragmentDoc}
${OrderDetailsShippingMethodDataFragmentDoc}
${OrderDetailsStatusDataFragmentDoc}
${OrderDetailsSummaryTableDataFragmentDoc}
${OrderDetailsTitleDataFragmentDoc}
${OrderDetailsTotalDataFragmentDoc}
${OrderDetailsVatNumberDataFragmentDoc}
${OrderDetailsVmiLocationDataFragmentDoc}
${OrderHistoryHeaderDataFragmentDoc}
${OrderHistoryPaginationDataFragmentDoc}
${OrderHistoryResultCountDataFragmentDoc}
${OrderHistorySearchClearButtonDataFragmentDoc}
${OrderHistorySearchFieldDateRangeDataFragmentDoc}
${OrderHistorySearchFieldOrderNumberDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalOperatorDataFragmentDoc}
${OrderHistorySearchFieldPoNumberDataFragmentDoc}
${OrderHistorySearchFieldProductErpNumber2DataFragmentDoc}
${OrderHistorySearchFieldShipTosDataFragmentDoc}
${OrderHistorySearchFieldStatusDataFragmentDoc}
${OrderHistorySearchFormDataFragmentDoc}
${OrderHistorySearchTagsDataFragmentDoc}
${OrderHistoryTableDataFragmentDoc}
${OrderPoDataFragmentDoc}
${OrderSalespersonDataFragmentDoc}
${RequestRmaHeaderDataFragmentDoc}
${RequestRmaInformationDataFragmentDoc}
${RequestRmaNotesDataFragmentDoc}
${RequestRmaProductListDataFragmentDoc}
${RequestRmaProductListButtonsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SignInCreateNewAccountDataFragmentDoc}
${SignInExistingAccountDataFragmentDoc}`;
export const getAddressesPageContentDocument = gql`
    query getAddressesPageContent {
  AddressesPage {
    items {
      Type
      WidgetContainer {
        __typename
        Widgets {
          ...BasicRowData
          ...BasicGridData
          ...BasicNavigationListData
          ...AddressBookData
          ...AddressBookPaginationData
          ...AddressBookSearchBoxData
          ...CommonRecentOrdersData
          ...CommonRecentQuotesData
          ...CommonRecentWhishlistsData
          ...CreateAccountData
          ...CreateAddressButtonData
          ...CurrentBillingAddressData
          ...CurrentShippingAddressData
          ...MyAccountHomepageSelectorData
          ...MyAccountViewData
          ...OrderCancelNotificationData
          ...OrderConfirmationAccountSignUpMessageData
          ...OrderConfirmationHeaderData
          ...OrderConfirmationOrderInformationData
          ...OrderConfirmationPageContainerData
          ...OrderConfirmationProductListData
          ...OrderConfirmationTotalData
          ...OrderDateData
          ...OrderDetailsBillingAddressData
          ...OrderDetailsButtonSetData
          ...OrderDetailsNotesData
          ...OrderDetailsPaymentTermsData
          ...OrderDetailsRequestedDateData
          ...OrderDetailsShipmentPackagesData
          ...OrderDetailsShippingAddressData
          ...OrderDetailsShippingMethodData
          ...OrderDetailsStatusData
          ...OrderDetailsSummaryTableData
          ...OrderDetailsTitleData
          ...OrderDetailsTotalData
          ...OrderDetailsVatNumberData
          ...OrderDetailsVmiLocationData
          ...OrderHistoryHeaderData
          ...OrderHistoryPaginationData
          ...OrderHistoryResultCountData
          ...OrderHistorySearchClearButtonData
          ...OrderHistorySearchFieldDateRangeData
          ...OrderHistorySearchFieldOrderNumberData
          ...OrderHistorySearchFieldOrderTotalData
          ...OrderHistorySearchFieldOrderTotalOperatorData
          ...OrderHistorySearchFieldPoNumberData
          ...OrderHistorySearchFieldProductErpNumber2Data
          ...OrderHistorySearchFieldShipTosData
          ...OrderHistorySearchFieldStatusData
          ...OrderHistorySearchFormData
          ...OrderHistorySearchTagsData
          ...OrderHistoryTableData
          ...OrderPoData
          ...OrderSalespersonData
          ...RequestRmaHeaderData
          ...RequestRmaInformationData
          ...RequestRmaNotesData
          ...RequestRmaProductListData
          ...RequestRmaProductListButtonsData
          ...SharedContentData
          ...SignInCreateNewAccountData
          ...SignInExistingAccountData
        }
      }
    }
  }
}
    ${BasicRowDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicNavigationListDataFragmentDoc}
${AddressBookDataFragmentDoc}
${AddressBookPaginationDataFragmentDoc}
${AddressBookSearchBoxDataFragmentDoc}
${CommonRecentOrdersDataFragmentDoc}
${CommonRecentQuotesDataFragmentDoc}
${CommonRecentWhishlistsDataFragmentDoc}
${CreateAccountDataFragmentDoc}
${CreateAddressButtonDataFragmentDoc}
${CurrentBillingAddressDataFragmentDoc}
${CurrentShippingAddressDataFragmentDoc}
${MyAccountHomepageSelectorDataFragmentDoc}
${MyAccountViewDataFragmentDoc}
${OrderCancelNotificationDataFragmentDoc}
${OrderConfirmationAccountSignUpMessageDataFragmentDoc}
${OrderConfirmationHeaderDataFragmentDoc}
${OrderConfirmationOrderInformationDataFragmentDoc}
${OrderConfirmationPageContainerDataFragmentDoc}
${OrderConfirmationProductListDataFragmentDoc}
${OrderConfirmationTotalDataFragmentDoc}
${OrderDateDataFragmentDoc}
${OrderDetailsBillingAddressDataFragmentDoc}
${OrderDetailsButtonSetDataFragmentDoc}
${OrderDetailsNotesDataFragmentDoc}
${OrderDetailsPaymentTermsDataFragmentDoc}
${OrderDetailsRequestedDateDataFragmentDoc}
${OrderDetailsShipmentPackagesDataFragmentDoc}
${OrderDetailsShippingAddressDataFragmentDoc}
${OrderDetailsShippingMethodDataFragmentDoc}
${OrderDetailsStatusDataFragmentDoc}
${OrderDetailsSummaryTableDataFragmentDoc}
${OrderDetailsTitleDataFragmentDoc}
${OrderDetailsTotalDataFragmentDoc}
${OrderDetailsVatNumberDataFragmentDoc}
${OrderDetailsVmiLocationDataFragmentDoc}
${OrderHistoryHeaderDataFragmentDoc}
${OrderHistoryPaginationDataFragmentDoc}
${OrderHistoryResultCountDataFragmentDoc}
${OrderHistorySearchClearButtonDataFragmentDoc}
${OrderHistorySearchFieldDateRangeDataFragmentDoc}
${OrderHistorySearchFieldOrderNumberDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalOperatorDataFragmentDoc}
${OrderHistorySearchFieldPoNumberDataFragmentDoc}
${OrderHistorySearchFieldProductErpNumber2DataFragmentDoc}
${OrderHistorySearchFieldShipTosDataFragmentDoc}
${OrderHistorySearchFieldStatusDataFragmentDoc}
${OrderHistorySearchFormDataFragmentDoc}
${OrderHistorySearchTagsDataFragmentDoc}
${OrderHistoryTableDataFragmentDoc}
${OrderPoDataFragmentDoc}
${OrderSalespersonDataFragmentDoc}
${RequestRmaHeaderDataFragmentDoc}
${RequestRmaInformationDataFragmentDoc}
${RequestRmaNotesDataFragmentDoc}
${RequestRmaProductListDataFragmentDoc}
${RequestRmaProductListButtonsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SignInCreateNewAccountDataFragmentDoc}
${SignInExistingAccountDataFragmentDoc}`;
export const getOrderHistoryPageContentDocument = gql`
    query getOrderHistoryPageContent {
  OrderHistoryPage {
    items {
      Type
      WidgetContainer {
        __typename
        Widgets {
          ...BasicRowData
          ...BasicGridData
          ...BasicNavigationListData
          ...AddressBookData
          ...AddressBookPaginationData
          ...AddressBookSearchBoxData
          ...CommonRecentOrdersData
          ...CommonRecentQuotesData
          ...CommonRecentWhishlistsData
          ...CreateAccountData
          ...CreateAddressButtonData
          ...CurrentBillingAddressData
          ...CurrentShippingAddressData
          ...MyAccountHomepageSelectorData
          ...MyAccountViewData
          ...OrderCancelNotificationData
          ...OrderConfirmationAccountSignUpMessageData
          ...OrderConfirmationHeaderData
          ...OrderConfirmationOrderInformationData
          ...OrderConfirmationPageContainerData
          ...OrderConfirmationProductListData
          ...OrderConfirmationTotalData
          ...OrderDateData
          ...OrderDetailsBillingAddressData
          ...OrderDetailsButtonSetData
          ...OrderDetailsNotesData
          ...OrderDetailsPaymentTermsData
          ...OrderDetailsRequestedDateData
          ...OrderDetailsShipmentPackagesData
          ...OrderDetailsShippingAddressData
          ...OrderDetailsShippingMethodData
          ...OrderDetailsStatusData
          ...OrderDetailsSummaryTableData
          ...OrderDetailsTitleData
          ...OrderDetailsTotalData
          ...OrderDetailsVatNumberData
          ...OrderDetailsVmiLocationData
          ...OrderHistoryHeaderData
          ...OrderHistoryPaginationData
          ...OrderHistoryResultCountData
          ...OrderHistorySearchClearButtonData
          ...OrderHistorySearchFieldDateRangeData
          ...OrderHistorySearchFieldOrderNumberData
          ...OrderHistorySearchFieldOrderTotalData
          ...OrderHistorySearchFieldOrderTotalOperatorData
          ...OrderHistorySearchFieldPoNumberData
          ...OrderHistorySearchFieldProductErpNumber2Data
          ...OrderHistorySearchFieldShipTosData
          ...OrderHistorySearchFieldStatusData
          ...OrderHistorySearchFormData
          ...OrderHistorySearchTagsData
          ...OrderHistoryTableData
          ...OrderPoData
          ...OrderSalespersonData
          ...RequestRmaHeaderData
          ...RequestRmaInformationData
          ...RequestRmaNotesData
          ...RequestRmaProductListData
          ...RequestRmaProductListButtonsData
          ...SharedContentData
          ...SignInCreateNewAccountData
          ...SignInExistingAccountData
        }
      }
    }
  }
}
    ${BasicRowDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicNavigationListDataFragmentDoc}
${AddressBookDataFragmentDoc}
${AddressBookPaginationDataFragmentDoc}
${AddressBookSearchBoxDataFragmentDoc}
${CommonRecentOrdersDataFragmentDoc}
${CommonRecentQuotesDataFragmentDoc}
${CommonRecentWhishlistsDataFragmentDoc}
${CreateAccountDataFragmentDoc}
${CreateAddressButtonDataFragmentDoc}
${CurrentBillingAddressDataFragmentDoc}
${CurrentShippingAddressDataFragmentDoc}
${MyAccountHomepageSelectorDataFragmentDoc}
${MyAccountViewDataFragmentDoc}
${OrderCancelNotificationDataFragmentDoc}
${OrderConfirmationAccountSignUpMessageDataFragmentDoc}
${OrderConfirmationHeaderDataFragmentDoc}
${OrderConfirmationOrderInformationDataFragmentDoc}
${OrderConfirmationPageContainerDataFragmentDoc}
${OrderConfirmationProductListDataFragmentDoc}
${OrderConfirmationTotalDataFragmentDoc}
${OrderDateDataFragmentDoc}
${OrderDetailsBillingAddressDataFragmentDoc}
${OrderDetailsButtonSetDataFragmentDoc}
${OrderDetailsNotesDataFragmentDoc}
${OrderDetailsPaymentTermsDataFragmentDoc}
${OrderDetailsRequestedDateDataFragmentDoc}
${OrderDetailsShipmentPackagesDataFragmentDoc}
${OrderDetailsShippingAddressDataFragmentDoc}
${OrderDetailsShippingMethodDataFragmentDoc}
${OrderDetailsStatusDataFragmentDoc}
${OrderDetailsSummaryTableDataFragmentDoc}
${OrderDetailsTitleDataFragmentDoc}
${OrderDetailsTotalDataFragmentDoc}
${OrderDetailsVatNumberDataFragmentDoc}
${OrderDetailsVmiLocationDataFragmentDoc}
${OrderHistoryHeaderDataFragmentDoc}
${OrderHistoryPaginationDataFragmentDoc}
${OrderHistoryResultCountDataFragmentDoc}
${OrderHistorySearchClearButtonDataFragmentDoc}
${OrderHistorySearchFieldDateRangeDataFragmentDoc}
${OrderHistorySearchFieldOrderNumberDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalOperatorDataFragmentDoc}
${OrderHistorySearchFieldPoNumberDataFragmentDoc}
${OrderHistorySearchFieldProductErpNumber2DataFragmentDoc}
${OrderHistorySearchFieldShipTosDataFragmentDoc}
${OrderHistorySearchFieldStatusDataFragmentDoc}
${OrderHistorySearchFormDataFragmentDoc}
${OrderHistorySearchTagsDataFragmentDoc}
${OrderHistoryTableDataFragmentDoc}
${OrderPoDataFragmentDoc}
${OrderSalespersonDataFragmentDoc}
${RequestRmaHeaderDataFragmentDoc}
${RequestRmaInformationDataFragmentDoc}
${RequestRmaNotesDataFragmentDoc}
${RequestRmaProductListDataFragmentDoc}
${RequestRmaProductListButtonsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SignInCreateNewAccountDataFragmentDoc}
${SignInExistingAccountDataFragmentDoc}`;
export const getOrderDetailsPageContentDocument = gql`
    query getOrderDetailsPageContent {
  OrderDetailsPage {
    items {
      Type
      WidgetContainer {
        __typename
        Widgets {
          ...BasicRowData
          ...BasicGridData
          ...BasicNavigationListData
          ...AddressBookData
          ...AddressBookPaginationData
          ...AddressBookSearchBoxData
          ...CommonRecentOrdersData
          ...CommonRecentQuotesData
          ...CommonRecentWhishlistsData
          ...CreateAccountData
          ...CreateAddressButtonData
          ...CurrentBillingAddressData
          ...CurrentShippingAddressData
          ...MyAccountHomepageSelectorData
          ...MyAccountViewData
          ...OrderCancelNotificationData
          ...OrderConfirmationAccountSignUpMessageData
          ...OrderConfirmationHeaderData
          ...OrderConfirmationOrderInformationData
          ...OrderConfirmationPageContainerData
          ...OrderConfirmationProductListData
          ...OrderConfirmationTotalData
          ...OrderDateData
          ...OrderDetailsBillingAddressData
          ...OrderDetailsButtonSetData
          ...OrderDetailsNotesData
          ...OrderDetailsPaymentTermsData
          ...OrderDetailsRequestedDateData
          ...OrderDetailsShipmentPackagesData
          ...OrderDetailsShippingAddressData
          ...OrderDetailsShippingMethodData
          ...OrderDetailsStatusData
          ...OrderDetailsSummaryTableData
          ...OrderDetailsTitleData
          ...OrderDetailsTotalData
          ...OrderDetailsVatNumberData
          ...OrderDetailsVmiLocationData
          ...OrderHistoryHeaderData
          ...OrderHistoryPaginationData
          ...OrderHistoryResultCountData
          ...OrderHistorySearchClearButtonData
          ...OrderHistorySearchFieldDateRangeData
          ...OrderHistorySearchFieldOrderNumberData
          ...OrderHistorySearchFieldOrderTotalData
          ...OrderHistorySearchFieldOrderTotalOperatorData
          ...OrderHistorySearchFieldPoNumberData
          ...OrderHistorySearchFieldProductErpNumber2Data
          ...OrderHistorySearchFieldShipTosData
          ...OrderHistorySearchFieldStatusData
          ...OrderHistorySearchFormData
          ...OrderHistorySearchTagsData
          ...OrderHistoryTableData
          ...OrderPoData
          ...OrderSalespersonData
          ...RequestRmaHeaderData
          ...RequestRmaInformationData
          ...RequestRmaNotesData
          ...RequestRmaProductListData
          ...RequestRmaProductListButtonsData
          ...SharedContentData
          ...SignInCreateNewAccountData
          ...SignInExistingAccountData
        }
      }
    }
  }
}
    ${BasicRowDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicNavigationListDataFragmentDoc}
${AddressBookDataFragmentDoc}
${AddressBookPaginationDataFragmentDoc}
${AddressBookSearchBoxDataFragmentDoc}
${CommonRecentOrdersDataFragmentDoc}
${CommonRecentQuotesDataFragmentDoc}
${CommonRecentWhishlistsDataFragmentDoc}
${CreateAccountDataFragmentDoc}
${CreateAddressButtonDataFragmentDoc}
${CurrentBillingAddressDataFragmentDoc}
${CurrentShippingAddressDataFragmentDoc}
${MyAccountHomepageSelectorDataFragmentDoc}
${MyAccountViewDataFragmentDoc}
${OrderCancelNotificationDataFragmentDoc}
${OrderConfirmationAccountSignUpMessageDataFragmentDoc}
${OrderConfirmationHeaderDataFragmentDoc}
${OrderConfirmationOrderInformationDataFragmentDoc}
${OrderConfirmationPageContainerDataFragmentDoc}
${OrderConfirmationProductListDataFragmentDoc}
${OrderConfirmationTotalDataFragmentDoc}
${OrderDateDataFragmentDoc}
${OrderDetailsBillingAddressDataFragmentDoc}
${OrderDetailsButtonSetDataFragmentDoc}
${OrderDetailsNotesDataFragmentDoc}
${OrderDetailsPaymentTermsDataFragmentDoc}
${OrderDetailsRequestedDateDataFragmentDoc}
${OrderDetailsShipmentPackagesDataFragmentDoc}
${OrderDetailsShippingAddressDataFragmentDoc}
${OrderDetailsShippingMethodDataFragmentDoc}
${OrderDetailsStatusDataFragmentDoc}
${OrderDetailsSummaryTableDataFragmentDoc}
${OrderDetailsTitleDataFragmentDoc}
${OrderDetailsTotalDataFragmentDoc}
${OrderDetailsVatNumberDataFragmentDoc}
${OrderDetailsVmiLocationDataFragmentDoc}
${OrderHistoryHeaderDataFragmentDoc}
${OrderHistoryPaginationDataFragmentDoc}
${OrderHistoryResultCountDataFragmentDoc}
${OrderHistorySearchClearButtonDataFragmentDoc}
${OrderHistorySearchFieldDateRangeDataFragmentDoc}
${OrderHistorySearchFieldOrderNumberDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalOperatorDataFragmentDoc}
${OrderHistorySearchFieldPoNumberDataFragmentDoc}
${OrderHistorySearchFieldProductErpNumber2DataFragmentDoc}
${OrderHistorySearchFieldShipTosDataFragmentDoc}
${OrderHistorySearchFieldStatusDataFragmentDoc}
${OrderHistorySearchFormDataFragmentDoc}
${OrderHistorySearchTagsDataFragmentDoc}
${OrderHistoryTableDataFragmentDoc}
${OrderPoDataFragmentDoc}
${OrderSalespersonDataFragmentDoc}
${RequestRmaHeaderDataFragmentDoc}
${RequestRmaInformationDataFragmentDoc}
${RequestRmaNotesDataFragmentDoc}
${RequestRmaProductListDataFragmentDoc}
${RequestRmaProductListButtonsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SignInCreateNewAccountDataFragmentDoc}
${SignInExistingAccountDataFragmentDoc}`;
export const getRequestRmaPageContentDocument = gql`
    query getRequestRmaPageContent {
  RequestRmaPage {
    items {
      Type
      WidgetContainer {
        __typename
        Widgets {
          ...BasicRowData
          ...BasicGridData
          ...BasicNavigationListData
          ...AddressBookData
          ...AddressBookPaginationData
          ...AddressBookSearchBoxData
          ...CommonRecentOrdersData
          ...CommonRecentQuotesData
          ...CommonRecentWhishlistsData
          ...CreateAccountData
          ...CreateAddressButtonData
          ...CurrentBillingAddressData
          ...CurrentShippingAddressData
          ...MyAccountHomepageSelectorData
          ...MyAccountViewData
          ...OrderCancelNotificationData
          ...OrderConfirmationAccountSignUpMessageData
          ...OrderConfirmationHeaderData
          ...OrderConfirmationOrderInformationData
          ...OrderConfirmationPageContainerData
          ...OrderConfirmationProductListData
          ...OrderConfirmationTotalData
          ...OrderDateData
          ...OrderDetailsBillingAddressData
          ...OrderDetailsButtonSetData
          ...OrderDetailsNotesData
          ...OrderDetailsPaymentTermsData
          ...OrderDetailsRequestedDateData
          ...OrderDetailsShipmentPackagesData
          ...OrderDetailsShippingAddressData
          ...OrderDetailsShippingMethodData
          ...OrderDetailsStatusData
          ...OrderDetailsSummaryTableData
          ...OrderDetailsTitleData
          ...OrderDetailsTotalData
          ...OrderDetailsVatNumberData
          ...OrderDetailsVmiLocationData
          ...OrderHistoryHeaderData
          ...OrderHistoryPaginationData
          ...OrderHistoryResultCountData
          ...OrderHistorySearchClearButtonData
          ...OrderHistorySearchFieldDateRangeData
          ...OrderHistorySearchFieldOrderNumberData
          ...OrderHistorySearchFieldOrderTotalData
          ...OrderHistorySearchFieldOrderTotalOperatorData
          ...OrderHistorySearchFieldPoNumberData
          ...OrderHistorySearchFieldProductErpNumber2Data
          ...OrderHistorySearchFieldShipTosData
          ...OrderHistorySearchFieldStatusData
          ...OrderHistorySearchFormData
          ...OrderHistorySearchTagsData
          ...OrderHistoryTableData
          ...OrderPoData
          ...OrderSalespersonData
          ...RequestRmaHeaderData
          ...RequestRmaInformationData
          ...RequestRmaNotesData
          ...RequestRmaProductListData
          ...RequestRmaProductListButtonsData
          ...SharedContentData
          ...SignInCreateNewAccountData
          ...SignInExistingAccountData
        }
      }
    }
  }
}
    ${BasicRowDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicNavigationListDataFragmentDoc}
${AddressBookDataFragmentDoc}
${AddressBookPaginationDataFragmentDoc}
${AddressBookSearchBoxDataFragmentDoc}
${CommonRecentOrdersDataFragmentDoc}
${CommonRecentQuotesDataFragmentDoc}
${CommonRecentWhishlistsDataFragmentDoc}
${CreateAccountDataFragmentDoc}
${CreateAddressButtonDataFragmentDoc}
${CurrentBillingAddressDataFragmentDoc}
${CurrentShippingAddressDataFragmentDoc}
${MyAccountHomepageSelectorDataFragmentDoc}
${MyAccountViewDataFragmentDoc}
${OrderCancelNotificationDataFragmentDoc}
${OrderConfirmationAccountSignUpMessageDataFragmentDoc}
${OrderConfirmationHeaderDataFragmentDoc}
${OrderConfirmationOrderInformationDataFragmentDoc}
${OrderConfirmationPageContainerDataFragmentDoc}
${OrderConfirmationProductListDataFragmentDoc}
${OrderConfirmationTotalDataFragmentDoc}
${OrderDateDataFragmentDoc}
${OrderDetailsBillingAddressDataFragmentDoc}
${OrderDetailsButtonSetDataFragmentDoc}
${OrderDetailsNotesDataFragmentDoc}
${OrderDetailsPaymentTermsDataFragmentDoc}
${OrderDetailsRequestedDateDataFragmentDoc}
${OrderDetailsShipmentPackagesDataFragmentDoc}
${OrderDetailsShippingAddressDataFragmentDoc}
${OrderDetailsShippingMethodDataFragmentDoc}
${OrderDetailsStatusDataFragmentDoc}
${OrderDetailsSummaryTableDataFragmentDoc}
${OrderDetailsTitleDataFragmentDoc}
${OrderDetailsTotalDataFragmentDoc}
${OrderDetailsVatNumberDataFragmentDoc}
${OrderDetailsVmiLocationDataFragmentDoc}
${OrderHistoryHeaderDataFragmentDoc}
${OrderHistoryPaginationDataFragmentDoc}
${OrderHistoryResultCountDataFragmentDoc}
${OrderHistorySearchClearButtonDataFragmentDoc}
${OrderHistorySearchFieldDateRangeDataFragmentDoc}
${OrderHistorySearchFieldOrderNumberDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalDataFragmentDoc}
${OrderHistorySearchFieldOrderTotalOperatorDataFragmentDoc}
${OrderHistorySearchFieldPoNumberDataFragmentDoc}
${OrderHistorySearchFieldProductErpNumber2DataFragmentDoc}
${OrderHistorySearchFieldShipTosDataFragmentDoc}
${OrderHistorySearchFieldStatusDataFragmentDoc}
${OrderHistorySearchFormDataFragmentDoc}
${OrderHistorySearchTagsDataFragmentDoc}
${OrderHistoryTableDataFragmentDoc}
${OrderPoDataFragmentDoc}
${OrderSalespersonDataFragmentDoc}
${RequestRmaHeaderDataFragmentDoc}
${RequestRmaInformationDataFragmentDoc}
${RequestRmaNotesDataFragmentDoc}
${RequestRmaProductListDataFragmentDoc}
${RequestRmaProductListButtonsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SignInCreateNewAccountDataFragmentDoc}
${SignInExistingAccountDataFragmentDoc}`;
export const getProductsByCategoryIdsDocument = gql`
    query getProductsByCategoryIds($ids: [String!]!) {
  Product(where: {Categories: {in: $ids}}) {
    items {
      ...ProductData
    }
  }
}
    ${ProductDataFragmentDoc}`;
export const getProductsByIdsDocument = gql`
    query getProductsByIds($ids: [String!]!) {
  Product(where: {Id: {in: $ids}}) {
    items {
      ...ProductData
    }
  }
}
    ${ProductDataFragmentDoc}`;
export const getProductDetailByPathDocument = gql`
    query getProductDetailByPath($path: String!) {
  Product(where: {Url: {eq: $path}}) {
    items {
      ...ProductData
    }
  }
}
    ${ProductDataFragmentDoc}`;
export const getProductDetailCmsPageDocument = gql`
    query getProductDetailCmsPage($path: String!) {
  GenericPage(where: {Url: {eq: $path}}) {
    items {
      WidgetContainer {
        __typename
        Widgets {
          ...BasicBannerData
          ...BasicButtonData
          ...BasicGridData
          ...BasicImageData
          ...BasicLinkData
          ...BasicLogoData
          ...BasicQuestionAnswersData
          ...BasicRichContentData
          ...BasicRowData
          ...BasicRowsData
          ...BasicSocialLinksData
          ...CategoryListData
          ...CommonCartLinkData
          ...CommonHeaderSignInData
          ...CommonPlaceholderData
          ...CommonProductCarouselData
          ...CommonRatingAndReviewData
          ...CommonSignInData
          ...FooterContainerData
          ...HeaderMainNavigationData
          ...HeaderSearchInputData
          ...LinkListData
          ...ProductDetailsViewData
          ...ProductListCardListData
          ...ProductListColumnsData
          ...SharedContentData
          ...SlideShowData
        }
      }
    }
  }
}
    ${BasicBannerDataFragmentDoc}
${BasicButtonDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicImageDataFragmentDoc}
${BasicLinkDataFragmentDoc}
${BasicLogoDataFragmentDoc}
${BasicQuestionAnswersDataFragmentDoc}
${BasicRichContentDataFragmentDoc}
${BasicRowDataFragmentDoc}
${BasicRowsDataFragmentDoc}
${BasicSocialLinksDataFragmentDoc}
${CategoryListDataFragmentDoc}
${CommonCartLinkDataFragmentDoc}
${CommonHeaderSignInDataFragmentDoc}
${CommonPlaceholderDataFragmentDoc}
${CommonProductCarouselDataFragmentDoc}
${CommonRatingAndReviewDataFragmentDoc}
${CommonSignInDataFragmentDoc}
${FooterContainerDataFragmentDoc}
${HeaderMainNavigationDataFragmentDoc}
${HeaderSearchInputDataFragmentDoc}
${LinkListDataFragmentDoc}
${ProductDetailsViewDataFragmentDoc}
${ProductListCardListDataFragmentDoc}
${ProductListColumnsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SlideShowDataFragmentDoc}`;
export const getProductByKeywordDocument = gql`
    query getProductByKeyword($keyword: String!) {
  Product(where: {_fulltext: {contains: $keyword}}) {
    items {
      ...ProductData
    }
  }
}
    ${ProductDataFragmentDoc}`;
export const getSiginPageContentDocument = gql`
    query getSiginPageContent {
  SignInPage {
    items {
      WidgetContainer {
        Widgets {
          ...BasicBannerData
          ...BasicButtonData
          ...BasicGridData
          ...BasicImageData
          ...BasicLinkData
          ...BasicLogoData
          ...BasicPageTitleData
          ...BasicQuestionAnswersData
          ...BasicRichContentData
          ...BasicRowData
          ...BasicRowsData
          ...BasicSocialLinksData
          ...CartActionsData
          ...CartApproverMessageData
          ...CartFulfillmentMethodSelectorData
          ...CartHeaderData
          ...CartLinesData
          ...CartPageContainerData
          ...CartTotalData
          ...CategoryListData
          ...CheckoutReviewAndSubmitActionButtonsData
          ...CheckoutReviewAndSubmitCarrierServiceData
          ...CheckoutReviewAndSubmitCartTotalData
          ...CheckoutReviewAndSubmitHeaderData
          ...CheckoutReviewAndSubmitPageContainerData
          ...CheckoutReviewAndSubmitPaymentDetailsData
          ...CheckoutReviewAndSubmitProductListData
          ...CheckoutReviewAndSubmitPromotionCodeData
          ...CheckoutReviewAndSubmitShippingInfoData
          ...CheckoutShippingAddressesData
          ...CheckoutShippingCartTotalData
          ...CheckoutShippingFulfillmentMethodSelectorData
          ...CheckoutShippingHeaderData
          ...CheckoutShippingOrderNotesEntryData
          ...CheckoutShippingPageContainerData
          ...CommonCartLinkData
          ...CommonHeaderSignInData
          ...CommonPlaceholderData
          ...CommonProductCarouselData
          ...CommonRatingAndReviewData
          ...CommonSignInData
          ...FooterContainerData
          ...HeaderMainNavigationData
          ...HeaderSearchInputData
          ...LinkListData
          ...ProductDetailsViewData
          ...ProductListCardListData
          ...ProductListColumnsData
          ...SharedContentData
          ...SignInCreateNewAccountData
          ...SignInExistingAccountData
          ...SlideShowData
          ...SubscribeData
        }
      }
    }
  }
}
    ${BasicBannerDataFragmentDoc}
${BasicButtonDataFragmentDoc}
${BasicGridDataFragmentDoc}
${BasicImageDataFragmentDoc}
${BasicLinkDataFragmentDoc}
${BasicLogoDataFragmentDoc}
${BasicPageTitleDataFragmentDoc}
${BasicQuestionAnswersDataFragmentDoc}
${BasicRichContentDataFragmentDoc}
${BasicRowDataFragmentDoc}
${BasicRowsDataFragmentDoc}
${BasicSocialLinksDataFragmentDoc}
${CartActionsDataFragmentDoc}
${CartApproverMessageDataFragmentDoc}
${CartFulfillmentMethodSelectorDataFragmentDoc}
${CartHeaderDataFragmentDoc}
${CartLinesDataFragmentDoc}
${CartPageContainerDataFragmentDoc}
${CartTotalDataFragmentDoc}
${CategoryListDataFragmentDoc}
${CheckoutReviewAndSubmitActionButtonsDataFragmentDoc}
${CheckoutReviewAndSubmitCarrierServiceDataFragmentDoc}
${CheckoutReviewAndSubmitCartTotalDataFragmentDoc}
${CheckoutReviewAndSubmitHeaderDataFragmentDoc}
${CheckoutReviewAndSubmitPageContainerDataFragmentDoc}
${CheckoutReviewAndSubmitPaymentDetailsDataFragmentDoc}
${CheckoutReviewAndSubmitProductListDataFragmentDoc}
${CheckoutReviewAndSubmitPromotionCodeDataFragmentDoc}
${CheckoutReviewAndSubmitShippingInfoDataFragmentDoc}
${CheckoutShippingAddressesDataFragmentDoc}
${CheckoutShippingCartTotalDataFragmentDoc}
${CheckoutShippingFulfillmentMethodSelectorDataFragmentDoc}
${CheckoutShippingHeaderDataFragmentDoc}
${CheckoutShippingOrderNotesEntryDataFragmentDoc}
${CheckoutShippingPageContainerDataFragmentDoc}
${CommonCartLinkDataFragmentDoc}
${CommonHeaderSignInDataFragmentDoc}
${CommonPlaceholderDataFragmentDoc}
${CommonProductCarouselDataFragmentDoc}
${CommonRatingAndReviewDataFragmentDoc}
${CommonSignInDataFragmentDoc}
${FooterContainerDataFragmentDoc}
${HeaderMainNavigationDataFragmentDoc}
${HeaderSearchInputDataFragmentDoc}
${LinkListDataFragmentDoc}
${ProductDetailsViewDataFragmentDoc}
${ProductListCardListDataFragmentDoc}
${ProductListColumnsDataFragmentDoc}
${SharedContentDataFragmentDoc}
${SignInCreateNewAccountDataFragmentDoc}
${SignInExistingAccountDataFragmentDoc}
${SlideShowDataFragmentDoc}
${SubscribeDataFragmentDoc}`;
export const getAddressDocument = gql`
    query getAddress {
  Website {
    items {
      Id
      ParentId
      BillToAddressContainer {
        BillToAddresses {
          FieldName
          DisplayName
          IsVisible
          IsSystemField
          IsRequired
          IsMaxFieldLengthRequired
          MaxFieldLength
        }
      }
      ShipToAddressContainer {
        ShipToAddresses {
          FieldName
          DisplayName
          IsVisible
          IsSystemField
          IsRequired
          IsMaxFieldLengthRequired
          MaxFieldLength
        }
      }
    }
  }
}
    `;
export const getRatingReviewDocument = gql`
    query getRatingReview($url: String!) {
  RatingAndReviewPage(where: {Destination: {Url: {eq: $url}}}) {
    items {
      Status
      Id
      LayoutPageId
      Name
      NodeId
      ParentId
      SortOrder
      TemplateHash
      Type
      VariantName
      WebsiteId
      ExcludeFromNavigation
      ExcludeFromSignInRequired
      HideBreadcrumbs
      HideFooter
      HideHeader
      HorizontalRule
      LayoutPage
      StructuredPageData
      MetaKeywords
      MetaDescription
      OpenGraphTitle
      OpenGraphUrl
      OpenGraphImage
      Title
      UrlSegment
      Url
      Body
      Rating
      Verified
    }
  }
}
    `;
export const getCategoryDocument = gql`
    query getCategory($id: String!) {
  Category(where: {Id: {eq: $id}}) {
    items {
      _deleted
      _modified
      _score
      _id
      Id
      Name
      ShortDescription
      UrlSegment
      SmallImagePath
      LargeImagePath
      ImageAltText
      MetaKeywords
      MetaDescription
      HtmlContent
      SortOrder
      IsFeatured
      IsDynamic
      Path
      MobileBannerImageUrl
      MobilePrimaryText
      MobileSecondaryText
      MobileTextJustification
      MobileTextColor
      OpenGraphImage
      OpenGraphTitle
      OpenGraphUrl
      PageTitle
      ParentId
      ContentManagerId
      PropertyContainer {
        Properties {
          Name
          Value
        }
      }
    }
  }
}
    `;
export const getProductListPageDocument = gql`
    query getProductListPage($url: String!) {
  ProductListPage(where: {Url: {eq: $url}}) {
    items {
      CategoryId
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCheckoutShippingPageContent(variables?: Schema.getCheckoutShippingPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getCheckoutShippingPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getCheckoutShippingPageContentQuery>(getCheckoutShippingPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCheckoutShippingPageContent', 'query', variables);
    },
    getCheckoutReviewAndSubmitPageContent(variables?: Schema.getCheckoutReviewAndSubmitPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getCheckoutReviewAndSubmitPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getCheckoutReviewAndSubmitPageContentQuery>(getCheckoutReviewAndSubmitPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCheckoutReviewAndSubmitPageContent', 'query', variables);
    },
    getOrderConfirmationPageContent(variables?: Schema.getOrderConfirmationPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getOrderConfirmationPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getOrderConfirmationPageContentQuery>(getOrderConfirmationPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrderConfirmationPageContent', 'query', variables);
    },
    getContentById(variables: Schema.getContentByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getContentByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentByIdQuery>(getContentByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getContentById', 'query', variables);
    },
    getContentByPath(variables: Schema.getContentByPathQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getContentByPathQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentByPathQuery>(getContentByPathDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getContentByPath', 'query', variables);
    },
    getContentByType(variables: Schema.getContentByTypeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getContentByTypeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentByTypeQuery>(getContentByTypeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getContentByType', 'query', variables);
    },
    getMyAccountPageContent(variables?: Schema.getMyAccountPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getMyAccountPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getMyAccountPageContentQuery>(getMyAccountPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyAccountPageContent', 'query', variables);
    },
    getAddressesPageContent(variables?: Schema.getAddressesPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getAddressesPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getAddressesPageContentQuery>(getAddressesPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAddressesPageContent', 'query', variables);
    },
    getOrderHistoryPageContent(variables?: Schema.getOrderHistoryPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getOrderHistoryPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getOrderHistoryPageContentQuery>(getOrderHistoryPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrderHistoryPageContent', 'query', variables);
    },
    getOrderDetailsPageContent(variables?: Schema.getOrderDetailsPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getOrderDetailsPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getOrderDetailsPageContentQuery>(getOrderDetailsPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrderDetailsPageContent', 'query', variables);
    },
    getRequestRmaPageContent(variables?: Schema.getRequestRmaPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getRequestRmaPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getRequestRmaPageContentQuery>(getRequestRmaPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRequestRmaPageContent', 'query', variables);
    },
    getProductsByCategoryIds(variables: Schema.getProductsByCategoryIdsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getProductsByCategoryIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getProductsByCategoryIdsQuery>(getProductsByCategoryIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductsByCategoryIds', 'query', variables);
    },
    getProductsByIds(variables: Schema.getProductsByIdsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getProductsByIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getProductsByIdsQuery>(getProductsByIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductsByIds', 'query', variables);
    },
    getProductDetailByPath(variables: Schema.getProductDetailByPathQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getProductDetailByPathQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getProductDetailByPathQuery>(getProductDetailByPathDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductDetailByPath', 'query', variables);
    },
    getProductDetailCmsPage(variables: Schema.getProductDetailCmsPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getProductDetailCmsPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getProductDetailCmsPageQuery>(getProductDetailCmsPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductDetailCmsPage', 'query', variables);
    },
    getProductByKeyword(variables: Schema.getProductByKeywordQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getProductByKeywordQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getProductByKeywordQuery>(getProductByKeywordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductByKeyword', 'query', variables);
    },
    getSiginPageContent(variables?: Schema.getSiginPageContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getSiginPageContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getSiginPageContentQuery>(getSiginPageContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSiginPageContent', 'query', variables);
    },
    getAddress(variables?: Schema.getAddressQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getAddressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getAddressQuery>(getAddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAddress', 'query', variables);
    },
    getRatingReview(variables: Schema.getRatingReviewQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getRatingReviewQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getRatingReviewQuery>(getRatingReviewDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRatingReview', 'query', variables);
    },
    getCategory(variables: Schema.getCategoryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getCategoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getCategoryQuery>(getCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategory', 'query', variables);
    },
    getProductListPage(variables: Schema.getProductListPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getProductListPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getProductListPageQuery>(getProductListPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductListPage', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;