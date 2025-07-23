"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const CreateNewAddress = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<"create" | "edit">("create");
	const [currentAddress, setCurrentAddress] = useState({});

	const handleOpenCreateModal = () => {
		setModalMode("create");
		setCurrentAddress({});
		setIsModalOpen(true);
	};

	return (
		<Button
			onClick={handleOpenCreateModal}
			className=" py-2 px-4 rounded font-medium"
			buttonLabel="Create new address"
		>
			CREATE NEW ADDESS
		</Button>
	);
};

export default CreateNewAddress;
