import { ProductListingCard } from "@/components/common/ProductListingCard";

export default function ProductList() {
	return (
		<section className="bg-light-gray-background p-4 lg:p-8">
			<div className="container grid gap-x-8 gap-y-10 lg:grid-cols-2 lg:grid-cols-3 mt-10">
				{Array.from(Array(9)).map((_, index) => (
					<ProductListingCard
						key={`${index}`}
						title="1.0M HIGH, LEVEL TOP ROUND PALE PALISADE PANEL (1.83M WIDE)"
						price={129.10}
						reviews={17}
						rating={5}
						imageUrl="/placeholder.svg?height=300&width=400"
						type="plp"
						vatText=""
						excerpt="Visit our commercial website, for metal and high security fencing, gates and more"
					/>
				))}
      </div>
    </section>
	)
}