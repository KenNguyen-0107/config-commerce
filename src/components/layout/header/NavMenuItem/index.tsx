import { RowGridMap } from "@/components/widgets/BasicRow/gridMap";
import { BasicRowProps } from "@/components/widgets/BasicRow/types";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const NavMenuItemCsr = dynamic(() => import("./NavMenuItemCsr"))
const NavMenuItemMobile = dynamic(() => import("./NavMenuItemMobile"))

const NavMenuItem: React.FC<BasicRowProps> = (props) => {
	const { children, __typename, Id, Columns, Variant } = props;

	return (
		<>
			<div
				data-component={__typename}
				data-component-id={Id}
				data-section={Variant}
				className={cn("hidden lg:grid grid-cols-12 mx-auto gap-8 w-full")}
			>
				{Array.isArray(children) ? (
					children.map((child: any, index: number) => (
						<div key={index} className={cn(RowGridMap[Columns?.[index] ?? 0])}>
							{child}
						</div>
					))
				) : (
					<>{children}</>
				)}
			</div>
			<NavMenuItemCsr {...props} />
			<NavMenuItemMobile {...props} />
		</>
	);
};

export default NavMenuItem;
