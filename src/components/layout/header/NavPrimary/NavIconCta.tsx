"use client";

import MiniCartMobile from "@/components/cms/MiniCart/MiniCartMobile";
import SearchIconBtn from "@/components/widgets/HeaderSearchInput/SearchIconBtn";
import { useNavMenuStore } from "@/store/nav-store";

const NavIconCta = () => {
	const { toggle } = useNavMenuStore();

	const handleToggleMegaMenu = () => {
		toggle();
	};

	return (
		<div
			className="flex items-center gap-4 lg:hidden relative min-w-[144px] justify-end"
			id="nav-mobile-icons"
		>
			<button>
				<img src={`/icons/phone.svg`} alt="phone" width={24} height={24} />
			</button>
			<SearchIconBtn />
			<MiniCartMobile />
			<button onClick={handleToggleMegaMenu}>
				<img src={`/icons/menu.svg`} alt="menu" width={24} height={24} />
			</button>
		</div>
	);
};

export default NavIconCta;
