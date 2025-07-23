import { SmartLink } from "@/components/shared/smartLink";
import { ISubLinks } from "../..";
import CategoryLevelTwo from "./LevelTwo";

const CategoryLevelOne = ({ linksByLevel }: { linksByLevel?: ISubLinks[] }) => {
	if (!linksByLevel) return null;

	return (
		<>
			{linksByLevel?.map((subLink, index) => (
				<div key={index} className="flex flex-col">
					{!subLink?.children || subLink?.children?.length < 1 &&
						<SmartLink
							href={subLink.Url || ""}
							title={subLink.Title}
							className="pl-6 pr-4 py-3 flex items-center justify-between"
						>
							<h4 className="text-blue uppercase">{subLink.Title}</h4>
						</SmartLink>
					}

					{!!subLink?.children?.length && subLink?.children?.length > 0 &&
						<CategoryLevelTwo subLink={subLink} />
					}
				</div>
			))}
		</>
	);
};

export default CategoryLevelOne;
