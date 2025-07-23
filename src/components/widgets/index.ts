import { ComponentTypeDictionary } from "@packages/optimizely-cms-react";
import BasicBanner from "./BasicBanner";
import BasicButton from "./BasicButton";
import BasicGrid from "./BasicGrid";
import BasicImage from "./BasicImage";
import BasicLink from "./BasicLink";
import BasicQuestionAnswers from "./BasicQuestionAnswers";
import BasicRichContent from "./BasicRichContent";
import BasicRow from "./BasicRow";
import BasicRows from "./BasicRows";
import CategoryList from "./CategoryList";
import CommonCartLink from "./CommonCartLink";
import CommonHeaderSignIn from "./CommonHeaderSignIn";
import CommonPlaceholder from "./CommonPlaceholder";
import CommonProductCarousel from "./CommonProductCarousel";
import CommonRatingAndReview from "./CommonRatingAndReview";
import FooterContainer from "./FooterContainer";
import HeaderMainNavigation from "./HeaderMainNavigation";
import HeaderSearch from "./HeaderSearchInput";
import LinkList from "./LinkList";
import ProductListCardList from "./ProductListCardList";
import ProductListColumns from "./ProductListColumns";
import SharedContent from "./SharedContent";
import SocialLinks from "./SocialLinks";
import Subscribe from "./Subscribe";
import BasicBreadcrumbs from "./BasicBreadcrumbs";
import CustomVideo from "./CustomVideo";

const envPrefix = process.env.GRAPH_ENV || "";

export const WidgetDictionary: ComponentTypeDictionary = [
	{
		type: `${envPrefix}CategoryList`,
		component: CategoryList,
	},
	{
		type: `${envPrefix}BasicRow`,
		component: BasicRow,
	},
	{
		type: `${envPrefix}BasicRows`,
		component: BasicRows,
	},
	{
		type: `${envPrefix}BasicGrid`,
		component: BasicGrid,
	},
	{
		type: `${envPrefix}Subscribe`,
		component: Subscribe,
	},
	{
		type: `${envPrefix}BasicLink`,
		component: BasicLink,
	},
	{
		type: `${envPrefix}BasicLinkList`,
		component: LinkList,
	},
	{
		type: `${envPrefix}BasicRichContent`,
		component: BasicRichContent,
	},
	{
		type: `${envPrefix}BasicSocialLinks`,
		component: SocialLinks,
	},
	{
		type: `${envPrefix}BasicButton`,
		component: BasicButton,
	},
	{
		type: `${envPrefix}BasicBreadcrumbs`,
		component: BasicBreadcrumbs,
	},
	{
		type: `${envPrefix}BasicImage`,
		component: BasicImage,
	},
	{
		type: `${envPrefix}BasicBanner`,
		component: BasicBanner,
	},
	{
		type: `${envPrefix}FooterContainer`,
		component: FooterContainer,
	},
	{
		type: `${envPrefix}HeaderMainNavigation`,
		component: HeaderMainNavigation,
	},
	{
		type: `${envPrefix}LinkList`,
		component: LinkList,
	},
	{
		type: `${envPrefix}BasicSubscribe`,
		component: Subscribe,
	},
	{
		type: `${envPrefix}CommonCartLink`,
		component: CommonCartLink,
	},
	{
		type: `${envPrefix}CommonSignIn`,
		component: CommonHeaderSignIn,
	},
	{
		type: `${envPrefix}HeaderSearchInput`,
		component: HeaderSearch,
	},
	{
		type: `${envPrefix}SharedContent`,
		component: SharedContent,
	},
	{
		type: `${envPrefix}BasicQuestionAnswers`,
		component: BasicQuestionAnswers,
	},
	{
		type: `${envPrefix}ProductListCardList`,
		component: ProductListCardList,
	},
	{
		type: `${envPrefix}ProductListColumns`,
		component: ProductListColumns,
	},
	{
		type: `${envPrefix}CommonProductCarousel`,
		component: CommonProductCarousel,
	},
	{
		type: `${envPrefix}CommonPlaceholder`,
		component: CommonPlaceholder,
	},
	{
		type: `${envPrefix}CommonRatingAndReview`,
		component: CommonRatingAndReview,
	},
	{
		type: `${envPrefix}CustomVideo`,
		component: CustomVideo,
	},
];

export default WidgetDictionary;
