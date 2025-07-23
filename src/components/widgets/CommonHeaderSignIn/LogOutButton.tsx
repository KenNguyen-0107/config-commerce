"use client";

import { HttpMethod } from "@/app/api/clientApi";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { useUpdateCart } from "@/hook/useUpdateCart";
import useAuthenStore from "@/store/authen-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCheckoutStore } from "@/store/checkout-store";

const LogOutButton = () => {
	const router = useRouter();
	const { resetUserInfo } = useAuthenStore();
	const { syncCurrentCart } = useUpdateCart();
	const [isLoading, setIsLoading] = useState(false);
	const { setIsCheckoutPage } = useCheckoutStore();

	const handleLogOut = async () => {
		try {
			setIsCheckoutPage(false);
			setIsLoading(true);
			const reqFetchCurrentSession = await fetch("/api/sessions/current");
			if (!reqFetchCurrentSession.ok) return;

			const reqLogout = await fetch("/api/sessions/manage", {
				method: HttpMethod.DELETE,
			});
			if (![200, 502].includes(reqLogout.status)) return;

			const reqDeleteCart = await fetch("/api/cart/current", {
				method: HttpMethod.DELETE,
			});
			if (!reqDeleteCart.ok) return;

			const reqRenewSession = await fetch("/api/sessions/current");
			if (!reqRenewSession.ok) return;

			router.push("/");
			resetUserInfo();
			return syncCurrentCart();
		} catch (err) {
			toast.error("Logout failed");
			throw new Error("Logout failed", err as unknown as ErrorOptions);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button onClick={handleLogOut} disabled={isLoading}>
			{isLoading ? <LoadingIndicator text="Logging out..." /> : "Logout"}
		</button>
	);
};

export default LogOutButton;
