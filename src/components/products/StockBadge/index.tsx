import Badge, { BadgePosition, BadgeType } from "./Badge";
// import Skeleton from './Skeleton';

const StockBadge = ({
	productId,
	type,
	position,
}: {
	productId: string;
	type?: BadgeType;
	position?: BadgePosition;
}) => {
	return (
		<div className="text-base" data-id={productId}>
			{/* <Skeleton type={type} /> */}
			<Badge productId={productId} type={type} position={position} />
		</div>
	);
};

export default StockBadge;
