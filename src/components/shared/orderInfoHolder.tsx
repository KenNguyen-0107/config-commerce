"use client"

import useCurrentOrderStore from '@/store/current-order-store';
import { useEffect } from 'react';

interface IDataSummery {
	billTo: {
		customerNumber: string
	}
}

const OrderInfoHolder = () => {
	const { setCurrentOrder  } = useCurrentOrderStore()

	useEffect(() => {
		const getCurrentOrderInfo = async () => {
			const reqCart = await fetch("/api/cart/current");
			if (reqCart.status !== 200) return;
			const res = await fetch("/api/cart/full-validate", { method: "GET" })
			const dataSummary: IDataSummery = JSON.parse(await res.text());

			setCurrentOrder({
				customerNumber: dataSummary.billTo.customerNumber
			})
		}
		
		getCurrentOrderInfo()
	}, [setCurrentOrder])

	return <></>
};

export default OrderInfoHolder;