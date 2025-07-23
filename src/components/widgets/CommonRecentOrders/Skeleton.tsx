import { Fragment } from "react";

const NUMBER_OF_SKELETON_LIST = 5;

const Skeleton = () => {
	return (
		<>
			{Array(NUMBER_OF_SKELETON_LIST)
				.fill(0)
				.map((_, index) => (
					<Fragment key={index}>
						{index !== 0 && <div className="h-[1px] w-full bg-muted my-6"></div>}
						<div className="grid grid-cols-2 lg:grid-cols-4 lg:items-center gap-4">
							<div className="flex flex-col gap-2">
								<div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
								<div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
								<div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
								<div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="h-6 bg-gray-200 rounded animate-pulse w-16 ml-auto"></div>
								<div className="h-6 bg-gray-200 rounded animate-pulse w-16 ml-auto"></div>
							</div>
						</div>
					</Fragment>
				))}
		</>
	);
};

export default Skeleton;
