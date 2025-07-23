
import React from 'react';
import { CategoryListProps } from './types';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { getImgSrc } from "@/components/utils";
import { SmartLink } from "@/components/shared/smartLink";

const CategoryList: React.FC<CategoryListProps> = (props) => {
	const { __typename, Id, Categories, CssClass } = props;
	const categoryItems = Categories?.Items;

	if (!categoryItems?.length) return null;

	return (
		<div
			data-component={__typename}
			data-component-id={Id}
			className={cn("pb-20", CssClass)}
		>
			<div className="container grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-6 lg:gap-y-10 -mt-8 lg:-mt-20">
				{categoryItems.map((category, index) => (
					<SmartLink
						key={index}
						href={category?.Path || "#"}
						className="px-6 py-10 bg-white shadow-lg text-center"
					>
						<Image
							src={getImgSrc(category?.LargeImagePath || "")}
							alt={category?.ImageAltText || "category image"}
							loading="eager"
							width={214}
							height={162}
						/>

						<h3 className="uppercase text-blue mt-4">{category?.Name}</h3>
					</SmartLink>
				))}
			</div>
		</div>
	);
};

export default CategoryList;
