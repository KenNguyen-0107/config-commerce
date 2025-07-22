export default function ProductCardPrice({ price, vatText }: {
	price: string,
	vatText?: string
}) {
	if (!price) return null;

	return (
		<div className="flex items-center gap-1 text-blue text-xl">
			<span>FROM {price}</span>
			{vatText && 
				<span className="text-muted text-xs sm:text-sm">EXC VAT</span>
			}
		</div>
	)
}