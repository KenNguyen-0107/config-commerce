"use client"

import { useFetchStock } from "@/hook/useFetchStock";

const FetchStock = ({ productIds } : {
	productIds: string[]
}) => {
	useFetchStock(productIds.filter(id => id))

	return <></>;
};

export default FetchStock;