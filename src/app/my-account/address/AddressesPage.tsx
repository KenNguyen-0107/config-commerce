"use client";
import LineSkeleton from "@/components/common/LineSkeleton";
import { Button } from "@/components/ui/button";
import { MoreVertical, PenLine, Search } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import CreateAddressModal from "./ChangeAddressModal";
import { IAddress } from "./types";
import { fetchAllShipTos, filterShipTos } from "./api";
interface BreadcrumbItem {
	PageId: string;
	PageTitle: string;
	PageUrl: string;
}

export default function AddressesPage({ info }: { info: any }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
	const [activeFilter, setActiveFilter] = useState("");
	const [initialData, setInitialData] = useState<IAddress>({});
	const [modalMode, setModalMode] = useState<"create" | "edit shipping" | "edit billing">("create");
	const [currentShipping, setCurrentShipping] = useState<IAddress>({});
	const [allShipping, setAllShipping] = useState<IAddress[]>([]);
	const [allAddress, setAllAddress] = useState<IAddress>({});

	const updateDefaultShippingAddress = async (address: IAddress) => {
		const reqGetCurrentBillTo = await fetch("/api/billtos/current");
		const currentBillToId = JSON.parse(await reqGetCurrentBillTo.text()).id;
		await fetch(`/api/billtos/${currentBillToId}/shiptos/${address.id}`, {
			method: "PATCH",
			body: JSON.stringify({
				isDefault: true,
			}),
		});
	};

	const getAllShippinges = async () => {
		setIsLoadingAddresses(true);
		try {
			const fetchCurrentSession = await fetch("/api/sessions/current");
			if (!fetchCurrentSession.ok) {
				// redirect to login page
				throw new Error("Failed to fetch current session");
			}
			const reqGetCurrentBillTo = await fetch("/api/billtos/current");
			if (!reqGetCurrentBillTo.ok) {
				throw new Error("Failed to fetch current bill to");
			}
			const billingAddress = JSON.parse(await reqGetCurrentBillTo.text());
			const currentBillToId = billingAddress.id;
			const getRelatedShipTo = await fetch(
				`/api/billtos/${currentBillToId}/shiptos/${currentBillToId}`
			);
			if (!getRelatedShipTo.ok) {
				throw new Error("Failed to fetch related ship to");
			}

			const Shipping = await fetchAllShipTos();

			const currentShipping = Shipping.shipTos.find((item: IAddress) => item.id) || billingAddress;
			const allShipping = Shipping.shipTos.filter((item: IAddress) => item.id);

			if (billingAddress) {
				setAllAddress(billingAddress);
			}
			if (allShipping) {
				setAllShipping(allShipping);
			}
			if (currentShipping) {
				setCurrentShipping(currentShipping);
			}
			setIsModalOpen(false);
		} catch {
		} finally {
			setIsLoadingAddresses(false);
			setIsLoading(false);
		}
	};

	const handleOpenCreateModal = () => {
		setModalMode("create");
		setInitialData({});
		setIsModalOpen(true);
	};

	// Function to handle opening the modal in edit mode
	const handleOpenEditModal = (type: any, address: any) => {
		setModalMode(type);
		setInitialData({ ...address });
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setInitialData({});
	};

	const handleSaveAddress = () => {
		setIsLoading(true);
		getAllShippinges();
	};

	const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleFilterShipTos = useCallback(
		async (value: string) => {
			if (filterTimeoutRef.current) {
				clearTimeout(filterTimeoutRef.current);
			}

			setActiveFilter(value);

			if (value.length < 3) {
				if (value.length === 0) {
					setActiveFilter("default");
					getAllShippinges();
				}
				return;
			}

			const searchParams = new URLSearchParams({
				filter: value,
				page: "1",
				pageSize: "20",
				expand: "validation",
				exclude: "showAll, oneTime, billTo",
			});

			filterTimeoutRef.current = setTimeout(async () => {
				try {
					setIsLoadingAddresses(true);
					const filteredShipTos = await filterShipTos(searchParams.toString());
					setAllShipping(filteredShipTos);
				} catch (error) {
					console.error("Failed to filter addresses:", error);
				} finally {
					setIsLoadingAddresses(false);
				}
			}, 300);
		},
		[getAllShippinges]
	);

	useEffect(() => {
		getAllShippinges();
	}, []);

	const handleUseAsShipping = async (address: IAddress) => {
		try {
			updateDefaultShippingAddress(address);
			setCurrentShipping(address);
		} catch (error) {}
	};
	const skeletonList = () => (
		<>
			{[1, 2, 3].map((item) => (
				<div key={item} className="border-b border-muted pb-6 last:border-b-0">
					<div className="flex justify-between">
						<div className="space-y-2 w-full max-w-[300px]">
							<div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
							<LineSkeleton />
							<div className="h-5 bg-gray-200 rounded animate-pulse w-40"></div>
							<div className="h-5 bg-gray-200 rounded animate-pulse w-36"></div>
						</div>
						<div className="flex flex-col items-center gap-4">
							<div className="h-10 bg-gray-200 rounded animate-pulse w-48 hidden lg:block"></div>
							<div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
							<div className="h-8 bg-gray-200 rounded animate-pulse w-8 lg:hidden"></div>
						</div>
					</div>
				</div>
			))}
		</>
	);
	return (
		<div className="bg-muted-background min-h-screen px-4 lg:px-0">
			{/* {info?.BreadcrumbContainer?.BreadCrumbs && (
				<div className=" bg-secondary-background py-2">
					<div className="flex items-center gap-2 text-sm container">
						{info.BreadcrumbContainer.BreadCrumbs.map((item: BreadcrumbItem, index: number) => (
							<div key={item.PageId}>
								<a href={item.PageUrl} className="font-lora text-sm font-medium transition-colors">
									{item.PageTitle}
								</a>
								{index < info.BreadcrumbContainer.BreadCrumbs.length - 1 && (
									<div className="pl-2 inline-block">/</div>
								)}
							</div>
						))}
					</div>
				</div>
			)} */}

			<div className="container py-6 lg:py-10">
				<h1 className="text-[40px] text-blue mb-6 lg:mb-8">ADDRESSES</h1>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Left column - Shipping & Billing Address */}
					<div className="px-4 py-6 lg:p-6 w-full lg:w-[352px] flex flex-col gap-6 bg-white h-[fit-content]">
						{/* Shipping Address */}
						<div className="">
							<div className="flex justify-between items-center mb-2 lg:mb-4 text-blue">
								<h2 className="text-blue text-base uppercase">Shipping Address</h2>
								{Object.keys(currentShipping).length > 0 && (
									<button
										onClick={() => {
											if (allShipping.length > 0) {
												handleOpenEditModal("edit shipping", currentShipping);
											}
										}}
										className={`${
											allShipping.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
										} text-tertiary flex items-center gap-1`}
										title="Edit shipping address"
									>
										<PenLine size={18} />
										<span className="text-sm lg:text-base text-blue">EDIT</span>
									</button>
								)}
							</div>
							<div className="text-tertiary space-y-1">
								{isLoadingAddresses && !activeFilter ? (
									// Show skeleton while loading
									<>
										<LineSkeleton />
										<LineSkeleton />
										<LineSkeleton />
										<LineSkeleton />
										<LineSkeleton />
									</>
								) : Object.keys(currentShipping).length === 0 ? (
									// Show "No content" when currentShipping is empty
									<p className="font-lora text-sm lg:text-base font-medium text-gray-500">
										Please add or assign shipping address for this user
									</p>
								) : (
									<>
										<div className="flex gap-1">
											<p className="font-lora text-sm lg:text-base font-medium">
												{currentShipping.firstName}
											</p>
											{currentShipping.lastName && (
												<p className="font-lora text-sm lg:text-base font-medium">
													{currentShipping.lastName}
												</p>
											)}
										</div>
										{currentShipping.companyName && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{currentShipping.companyName}
											</p>
										)}
										{currentShipping.address1 && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{currentShipping.address1}
											</p>
										)}
										{currentShipping.country?.name && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{currentShipping.country.name}
											</p>
										)}
										{currentShipping.state?.name && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{currentShipping.state.name}
											</p>
										)}
										{currentShipping.email && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{currentShipping.email}
											</p>
										)}
									</>
								)}
							</div>
						</div>

						{/* Billing Address */}
						<div className="">
							<div className="flex justify-between items-center mb-2 lg:mb-4 text-blue">
								<h2 className="text-blue text-base uppercase">Billing Address</h2>
								{Object.keys(allAddress).length > 0 && (
									<button
										onClick={() => handleOpenEditModal("edit billing", allAddress)}
										className="text-tertiary flex items-center gap-1"
										title="Edit billing address"
									>
										<PenLine size={18} />
										<span className="cursor-pointer text-sm lg:text-base text-blue">EDIT</span>
									</button>
								)}
							</div>
							<div className="text-tertiary space-y-1">
								{isLoadingAddresses && !activeFilter ? (
									// Show skeleton while loading
									<>
										<LineSkeleton />
										<LineSkeleton />
										<LineSkeleton />
										<LineSkeleton />
										<LineSkeleton />
									</>
								) : Object.keys(allAddress).length === 0 ? (
									// Show "No content" when allAddress is empty
									<p className="font-lora text-sm lg:text-base font-medium text-gray-500">
										Please add or assign billing address for this user
									</p>
								) : (
									<>
										<div className="flex gap-1">
											<p className="font-lora text-sm lg:text-base font-medium">
												{allAddress.firstName}
											</p>
											{allAddress.lastName && (
												<p className="font-lora text-sm lg:text-base font-medium">
													{allAddress.lastName}
												</p>
											)}
										</div>
										{allAddress.companyName && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{allAddress.companyName}
											</p>
										)}
										{allAddress.address1 && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{allAddress.address1}
											</p>
										)}
										{allAddress.country?.name && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{allAddress.country.name}
											</p>
										)}
										{allAddress.state?.name && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{allAddress.state.name}
											</p>
										)}
										{allAddress.email && (
											<p className="font-lora text-sm lg:text-base font-medium">
												{allAddress.email}
											</p>
										)}
									</>
								)}
							</div>
						</div>
					</div>

					{/* Right column - Address Book */}
					<div className="w-full lg:flex-1 bg-white flex-grow">
						<div className="bg-secondary-background px-4 py-2 lg:px-6 lg:py-4">
							<div className="text-lg uppercase text-blue">Address Book</div>
						</div>

						<div className="px-4 py-6 lg:px-6 lg:py-[30px]">
							{/* Search and Create New */}
							<div className="flex flex-row gap-4 lg:gap-8 justify-between mb-8 lg:mb-10">
								<div className="relative w-1/2 lg:w-[337px] font-lora">
									<input
										type="text"
										placeholder="Search"
										onChange={(e) => handleFilterShipTos(e.target.value)}
										className="w-full h-11 lg:h-14 pl-4 pr-12 py-0 lg:py-2 font-medium text-[#555] border border-[#8C8B9080] rounded focus:outline-none"
									/>
									<div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-tertiary">
										<Search size={20} />
									</div>
								</div>
								<Button
									onClick={handleOpenCreateModal}
									className="w-1/2 lg:w-[231px] px-2 py-2 lg:py-4 lg:px-6"
									buttonLabel="Create new address"
								>
									CREATE NEW ADDRESS
								</Button>
							</div>

							{/* Address List */}
							<div className="space-y-6">
								{isLoadingAddresses ? (
									// Skeleton
									skeletonList()
								) : (
									<>
										{allShipping.length > 0 ? (
											<>
												{allShipping.map((address, index) => (
													<div
														key={index}
														className={`${
															index === allShipping.length - 1 ? "" : "border-b border-muted"
														} pb-6`}
													>
														<div className="flex justify-between ">
															<div className="text-tertiary space-y-1">
																<div className="flex gap-1">
																	{address.firstName && (
																		<p className="font-lora text-sm lg:text-base font-medium">
																			{address.firstName}
																		</p>
																	)}
																	{address.lastName && (
																		<p className="font-lora text-sm lg:text-base font-medium">
																			{address.lastName}
																		</p>
																	)}
																</div>
																{address.companyName && (
																	<p className="font-lora text-sm lg:text-base font-medium">
																		{address.companyName}
																	</p>
																)}
																{address.address1 && (
																	<p className="font-lora text-sm lg:text-base font-medium">
																		{address.address1}
																	</p>
																)}
																{address.country?.name && (
																	<p className="font-lora text-sm lg:text-base font-medium">
																		{address.country?.name}
																	</p>
																)}
																{address.state?.name && (
																	<p className="font-lora text-sm lg:text-base font-medium">
																		{address.state?.name}
																	</p>
																)}
																{address.email && (
																	<p className="font-lora text-sm lg:text-base font-medium">
																		{address.email}
																	</p>
																)}
															</div>
															<div className="flex flex-col items-center gap-4">
																<Button
																	disabled={address.id === currentShipping?.id}
																	className=" py-4 px-6 font-medium hidden lg:block"
																	onClick={() => handleUseAsShipping(address)}
																	buttonLabel="Use as shipping address"
																>
																	USE AS SHIPPING ADDRESS
																</Button>
																<button
																	disabled={address.id === currentShipping?.id}
																	onClick={() =>
																		handleOpenEditModal("edit shipping", allShipping[index])
																	}
																	className="text-tertiary flex items-center gap-1 lg:flex"
																	title="Edit shipping address"
																>
																	<PenLine size={18} />
																	<span className="cursor-pointer text-sm lg:text-base text-blue">
																		EDIT
																	</span>
																</button>
																<Button
																	disabled={address.id === currentShipping?.id}
																	className="text-tertiary hidden bg-transparent"
																	buttonLabel="More options"
																>
																	<MoreVertical size={20} />
																</Button>
															</div>
														</div>
													</div>
												))}
											</>
										) : (
											<div className="font-lora font-medium text-[#555] text-center py-8 lg:py-10">
												{activeFilter
													? `The address you requested could not be found.`
													: `No address found. Please add or assign address for this user`}
											</div>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				{isModalOpen && (
					<CreateAddressModal
						isOpen={isModalOpen}
						onClose={handleCloseModal}
						onSave={handleSaveAddress}
						initialData={initialData}
						mode={modalMode}
						isLoading={isLoading}
					/>
				)}
			</div>
		</div>
	);
}
