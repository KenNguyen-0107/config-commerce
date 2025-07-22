import { RowGridMap } from "@/components/widgets/BasicRow/gridMap";
import { BasicRowProps } from "@/components/widgets/BasicRow/types";
import { cn } from "@/lib/utils";
import NavMenuItemCsr from "./NavMenuItemCsr";

const NavMenuItem: React.FC<BasicRowProps> = (props) => {
	const { children, __typename, Id, Columns, Variant } = props;

	return (
		<>
			<div
				data-component={__typename}
				data-component-id={Id}
				data-section={Variant}
				className={cn("grid grid-cols-12 mx-auto gap-8 w-full")}
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
		</>
	);
};

export default NavMenuItem;
