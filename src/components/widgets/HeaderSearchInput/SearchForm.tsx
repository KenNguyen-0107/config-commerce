"use client"

import Icon from "@/components/shared/icons";
import useClickOutside from "@/hook/useClickOutside";
import useDebounce from "@/hook/useDebounce";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent, RefObject, useCallback, useEffect, useRef, useState, useTransition } from "react";
import { ProductProps } from "../Product/types";
import { SearchByKeyword } from "./actions";
import SearchIconBtn from "./SearchIconBtn";
import SuggestionList from "./SuggestionList";
import { REQUIRED_LENGTH } from "./types";
import { useQuickSearchStore } from "@/store/quick-search-store";

const SearchForm = () => {
	const [isPending, startTransition] = useTransition();
	const [keyword, setKeyword] = useState<string>("");
	const [suggestions, setSuggestions] = useState<ProductProps[]>([]);

	const router = useRouter();
	const  { isOpen, close } = useQuickSearchStore();

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const debouncedSearchInput = useDebounce(keyword, 300);

	const handleSearchSubmit = useCallback(() => {
		if (keyword.trim()) {
			router.push(`/search?query=${encodeURIComponent(keyword)}`);
		}
	}, [keyword, router]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (keyword.length < REQUIRED_LENGTH) return setSuggestions([]);

		if (e.key === "Enter") {
			return handleSearchSubmit();
		}
	};

	const handleOnInputChange = (e: string) => {
		setKeyword(e);
		if (e.length < 2) {
			setSuggestions([]);
		}
	};

	const handleSuggestionSelect = (
		e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();
		router.push(e.currentTarget.href);
		setKeyword("");
		close();
		setSuggestions([]);
	};

	const handleSearchInput = (keyword: string) => {
		startTransition(async () => {
			const result = await SearchByKeyword(keyword);
			// if (result === undefined)
			setSuggestions(result as ProductProps[]);
		});
	};

	useEffect(() => {
		if (debouncedSearchInput.length < REQUIRED_LENGTH)
			return setSuggestions([]);

		handleSearchInput(debouncedSearchInput);
	}, [debouncedSearchInput]);

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus();
		}
	}, [isOpen]);

	useClickOutside(containerRef as RefObject<HTMLElement>, () => {
		close();
		setSuggestions([]);
	});

	if (!isOpen) {
		return (
			<div
				className={cn(
					"absolute z-50 justify-center items-center bg-transparent right-4 top-0 h-full",
					"hidden lg:flex",
				)}
			>
				<SearchIconBtn />
			</div>
		)
	}

	return (
		<div
				ref={containerRef}
				className={cn(
					"absolute z-50 flex justify-center items-center bg-transparent",
					"w-full top-full left-0",
					"lg:left-auto lg:right-4 lg:top-1/2 lg:-translate-y-1/2 lg:w-[350px]"
				)}
			>
				<div className="w-full flex">
					<div className="relative w-full flex-grow">
						<input
							ref={inputRef}
							type="text"
							placeholder="Search..."
							className="block w-full px-4 py-2 border border-gray-300 focus:outline-none"
							value={keyword}
							onChange={(e) => handleOnInputChange(e.target.value)}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleOnInputChange(e.target.value)}
						/>

						{isPending && (
							<div
								role="status"
								className="absolute top-1/2 right-3 -translate-y-1/2"
							>
								<Icon
									iconName="spinner"
									viewSize={100}
									className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue"
								/>
								<span className="sr-only">Loading...</span>
							</div>
						)}
					</div>

					<button
						onClick={handleSearchSubmit}
						className="flex-shrink-0 bg-cta-primary-bg text-white transition-colors"
						aria-label="Search"
					>
						<Icon
							iconName="search"
							size={40}
							viewSize={40}
							className="fill-white"
						/>
					</button>
				</div>

				{!!keyword && (
					<SuggestionList
						keyword={keyword}
						suggestions={suggestions}
						onSelect={handleSuggestionSelect}
						isPending={isPending}
					/>
				)}
			</div>
	);
};

export default SearchForm;