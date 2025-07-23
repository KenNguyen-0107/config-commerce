import { RowGridMap } from "@/components/widgets/BasicRow/gridMap";
import { BasicRowProps } from "@/components/widgets/BasicRow/types";
import { cn } from "@/lib/utils";

const NavPrimary: React.FC<BasicRowProps> = (props) => {
	const { children, __typename, Id, Columns, Variant } = props;

	const CustomClass = {
		RowWrapper: "flex h-14 items-center justify-end lg:h-20 sticky top-0 z-10 px-2 bg-white",
    ColWrapper: "flex justify-end w-full h-full gap-6 items-center"
	}

	return (
			<div
				data-component={__typename}
				data-component-id={Id}
				data-section={Variant}
				className={cn(
					"grid grid-cols-12 mx-auto gap-8 w-full",
					CustomClass.RowWrapper,
				)}
			>
				{Array.isArray(children) ? (
					children.map((child: any, index: number) => (
						<div
							key={index}
							className={cn(
								RowGridMap[Columns?.[index] ?? 0],
								CustomClass.ColWrapper
							)}
						>
							{child}
						</div>
					))
				) : (
					<>{children}</>
				)}
			</div>
		);
}

export default NavPrimary;