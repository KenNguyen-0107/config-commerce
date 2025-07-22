import { ProductImage } from '@/gql/graphql';
import PDPCarouselSsr from './PdpCarouselSsr';
import PDPCarouselCsr from './PdpCarouselCsr';

const PDPCarousel = ({ images }: {
	images?: ProductImage[]
}) => {
	return (
		<div className="relative">
			<PDPCarouselSsr images={images} />
			<PDPCarouselCsr images={images} />
		</div>
	)
}

export default PDPCarousel;