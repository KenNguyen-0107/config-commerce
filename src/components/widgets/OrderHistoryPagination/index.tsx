"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { OrderHistoryPaginationProps } from "./types";
import { useOrderHistoryStore } from "@/store/order-history-store";
import { useState } from "react";
import { fetchOrderHistory } from "@/utils/orderUtils";

const OrderHistoryPagination: React.FC<OrderHistoryPaginationProps> = () => {
	const {
		resultsPerPage,
		currentPage,
		numberOfPages,
		pageSizeOptions,
		setCurrentPage,
		setResultsPerPage,
		setIsPageSizeOptionsOpen,
	} = useOrderHistoryStore();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handlePageChange = async (page: number) => {
		if (page < 1 || page > numberOfPages) return;
		const resOrders = await fetchOrderHistory({
			pageSize: resultsPerPage.toString(),
			page: page.toString(),
		});

		setCurrentPage(page);
	};

	const handleResultsPerPageChange = async (value: number) => {
		try {
			const resOrders = await fetchOrderHistory({
				pageSize: value.toString(),
				page: "1",
			});
			setResultsPerPage(value);
			setCurrentPage(1);
			setIsPageSizeOptionsOpen(false);
		} catch (error) {
		} finally {
			setIsDropdownOpen(false);
		}
	};

	return (
		<div className="flex flex-col-reverse md:flex-row justify-end items-center p-6 gap-y-2 bg-white lg:gap-10">
			<div className="flex items-center mb-4 md:mb-0 order-2 md:order-1">
				<span className="font-lora font-bold text-muted text-sm lg:text-lg mr-4">
					Results per page
				</span>
				<div className="relative">
					<button
						className="border border-[#8C8B9080] rounded pl-4 pr-2 py-2 flex gap-2 items-center"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						<span className="font-lora text-tertiary text-sm lg:text-base">{resultsPerPage}</span>
						<ChevronDown size={20} />
					</button>
					{isDropdownOpen && (
						<div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
							{pageSizeOptions.map((num) => (
								<button
									key={num}
									className="block w-full text-left px-4 py-2 hover:bg-gray-100"
									onClick={() => handleResultsPerPageChange(num)}
								>
									{num}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="flex items-center gap-[10px] order-1 md:order-2">
				<button
					aria-label="First page"
					onClick={() => handlePageChange(1)}
					disabled={currentPage === 1}
					className="disabled:pointer-events-none"
				>
					<ChevronsLeft size={24} />
				</button>
				<button
					aria-label="Previous page"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="disabled:pointer-events-none"
				>
					<ChevronLeft size={24} />
				</button>

				{/* Page numbers */}
				{Array.from({ length: numberOfPages }, (_, i) => i + 1)
					.filter((page) => {
						return (
							page === 1 ||
							page === numberOfPages ||
							(page >= currentPage - 1 && page <= currentPage + 1)
						);
					})
					.map((page, index, array) => {
						// Add ellipsis if there are gaps
						const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
						const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1;

						return (
							<div key={page} className="flex items-center">
								{showEllipsisBefore && <span className="mx-1">...</span>}
								<button
									className={`mx-1 p-[10px] flex items-center justify-center ${
										currentPage === page ? "bg-blue text-white" : "text-blue"
									}`}
									onClick={() => handlePageChange(page)}
								>
									{page}
								</button>
								{showEllipsisAfter && <span className="mx-1">...</span>}
							</div>
						);
					})}

				<button
					aria-label="Next page"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === numberOfPages}
				>
					<ChevronRight size={24} />
				</button>
				<button
					aria-label="Last page"
					onClick={() => handlePageChange(numberOfPages)}
					disabled={currentPage === numberOfPages}
				>
					<ChevronsRight size={24} />
				</button>
			</div>
		</div>
	);
};

export default OrderHistoryPagination;
