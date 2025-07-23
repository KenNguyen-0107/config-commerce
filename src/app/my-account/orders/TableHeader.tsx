"use client";

import { SortField, useOrderHistoryStore } from "@/store/order-history-store";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const TableHeader = () => {
	const { sortField, setSortField, sortDirection, setSortDirection } = useOrderHistoryStore();

	const handleSort = (column: SortField) => {
		if (sortField === column) {
			return setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		}

		setSortField(column);
		setSortDirection("desc");
	};

	return (
		<thead>
			<tr className="border-b border-gray-300 bg-secondary-background text-blue font-bold text-left">
				<th className="p-4 lg:w-[240px]">
					<h5
						className="flex items-center justify-between cursor-pointer"
						onClick={() => handleSort("order")}
					>
						ORDER#
						<div className="ml-2">
							<ChevronUp size={16} className="mb-[-5px]" />
							<ChevronDown size={16} />
						</div>
					</h5>
				</th>
				<th className="p-4 md:table-cell border-l border-white">
					<h5
						className="flex items-center justify-between cursor-pointer"
						onClick={() => handleSort("date")}
					>
						DATE
						<div className="ml-2">
							<ChevronUp size={16} className="mb-[-5px]" />
							<ChevronDown size={16} />
						</div>
					</h5>
				</th>
				<th className="p-4 border-l border-white">
					<h5
						className="flex items-center justify-between cursor-pointer"
						onClick={() => handleSort("total")}
					>
						TOTAL
						<div className="ml-2 hidden md:block">
							<ChevronUp size={16} className="mb-[-5px]" />
							<ChevronDown size={16} />
						</div>
					</h5>
				</th>
				<th className="p-4 md:table-cell border-l border-white">
					<h5 className="flex items-center justify-between cursor-pointer">
						STATUS
						<div className="ml-2">
							<ChevronUp size={16} className="mb-[-5px]" />
							<ChevronDown size={16} />
						</div>
					</h5>
				</th>
				<th className="p-4 md:table-cell lg:w-[240px] border-l border-white">
					<h5 className="flex items-center justify-between cursor-pointer">
						SHIP TO/PICK UP
						<div className="ml-2">
							<ChevronUp size={16} className="mb-[-5px]" />
							<ChevronDown size={16} />
						</div>
					</h5>
				</th>
				<th className="p-4 md:table-cell border-l border-white">
					<h5
						className="flex items-center justify-between cursor-pointer"
						onClick={() => handleSort("poNumber")}
					>
						PO#
						<div className="ml-2">
							<ChevronUp size={16} className="mb-[-5px]" />
							<ChevronDown size={16} />
						</div>
					</h5>
				</th>
			</tr>
		</thead>
	);
};

export default TableHeader;
