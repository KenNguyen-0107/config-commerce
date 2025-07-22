import useScrollPosition from "@/hook/useScrollPosistion";
import { useNavMenuStore } from "@/store/nav-store";
import { ChevronUp, Menu } from "lucide-react";

const NavControl = () => {
	const { isOpen, toggle } = useNavMenuStore();
	const scrollPosition = useScrollPosition();

	if (scrollPosition < 100) return null;

	return (
		<button
			aria-label="navbar control"
			title="navbar control"
			className="text-blue absolute top-1/2 -translate-y-1/2 z-50 left-2"
			onClick={() => toggle()}
		>
			{isOpen ? <ChevronUp className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
		</button>
	);
};

export default NavControl;
