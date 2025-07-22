import ProductListing from "@/components/cms/ProductListing";
import ProductList from "./product-list";
import PanelQuestion from "@/components/cms/PannerQuestion";
import VideoListing from "@/components/cms/VideoListing";
import ReviewList from "@/components/cms/ReviewList";

export default function ProductListPage() {
	return (
		<>
			<ProductList />
			<ProductListing />
			<PanelQuestion />
			<VideoListing />
			<ReviewList />
		</>
	)
}