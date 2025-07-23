import TableBody from "@/app/my-account/orders/TableBody";
import TableHeader from "@/app/my-account/orders/TableHeader";
import { OrderHistoryTableProps } from "./types";

const OrderHistoryTable: React.FC<OrderHistoryTableProps> = () => {
	return (
		<div
			className="overflow-x-auto md:overflow-visible relative max-w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
			style={{ WebkitOverflowScrolling: "touch" }}
		>
			<div>
				<table className="w-full min-w-[700px] table-fixed">
					<TableHeader />
					<TableBody />
				</table>
			</div>
		</div>
	);
};

export default OrderHistoryTable;
