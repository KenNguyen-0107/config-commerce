import { useQuickSearchStore } from "@/store/quick-search-store";
import React from "react";

const SearchIconBtn = () => {
	const { open } = useQuickSearchStore();

	return (
		<button
			onClick={() => open()}
			className="flex-shrink-0 text-white transition-colors"
			aria-label="Open Search"
			title="Open Search"
		>
			<img
				src={`/icons/search.svg`}
				alt="search"
				width={40}
				height={40}
				sizes="(max-width: 991px) 20px, 40px"
				className="w-7 lg:w-10"
			/>
		</button>
	);
};

export default SearchIconBtn;
