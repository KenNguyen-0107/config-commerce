import { Fragment } from "react";

const NUMBER_OF_SKELETON_LIST = 6;

const Skeleton = () => {
	return (
		<>
			{Array(NUMBER_OF_SKELETON_LIST)
				.fill(0)
				.map((_, index) => (
					<Fragment key={index}>
						<tr
							key={index}
							className="border-b border-muted-background font-lora text-tertiary text-sm lg:text-base h-[86px] lg:h-[89px]"
						>
							<td className="px-4 py-8 text-left lg:w-[240px]">
								<div className="h-[18px] lg:h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</td>
							<td className="px-4 py-8 text-left table-cell">
								<div className="h-[18px] lg:h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</td>
							<td className="px-4 py-8 text-left">
								<div className="h-[18px] lg:h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</td>
							<td className="px-4 py-8 text-left table-cell">
								<div className="h-[18px] lg:h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</td>
							<td className="px-4 py-8 text-left table-cell lg:w-[240px] ">
								<div className="h-[18px] lg:h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</td>
							<td className="px-4 py-8 text-left table-cell">
								<div className="h-[18px] lg:h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</td>
						</tr>
					</Fragment>
				))}
		</>
	);
};

export default Skeleton;
