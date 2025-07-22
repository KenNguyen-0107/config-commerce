import { useNavMenuStore } from "@/store/nav-store";
import { useEffect, useState } from "react";

const useScrollPosition = () => {
	const { close } = useNavMenuStore();
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY || window.pageYOffset);
			
			close();
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return scrollPosition;
};

export default useScrollPosition;
