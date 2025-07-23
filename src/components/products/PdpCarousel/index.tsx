import { ProductImage } from '@/gql/graphql';
import PDPCarouselCsr from './PdpCarouselCsr';

const PDPCarousel = ({ images }: {
	images?: ProductImage[]
}) => {
	return (
		<PDPCarouselCsr images={images} />
	)
}

export default PDPCarousel;