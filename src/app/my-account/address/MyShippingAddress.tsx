"use client";
import { PenLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChangeAddressModal from "./ChangeAddressModal";

const MyShippingAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentAddress = {
    companyName: "Niteco",
    attention: "Anh Nguyen",
    address1: "123 Oxford Street",
    address2: "Floor 2",
    country: "United Kingdom",
    city: "London",
    state: "Greater London",
    postalCode: "10000",
    email: "anh.nguyen12@niteco.se",
  };

  useEffect(() => {
    const getAllAddresses = async () => {
      const fetchCurrentSession = await fetch("/api/sessions/current");
      if (!fetchCurrentSession.ok) {
        // redirect to login page
        throw new Error("Failed to fetch current session");
      }
      const reqGetCurrentBillTo = await fetch("/api/billTos/current");
      if (!reqGetCurrentBillTo.ok) {
        throw new Error("Failed to fetch current bill to");
      }

      const currentBillToId = JSON.parse(await reqGetCurrentBillTo.text()).id
      const getRelatedShipTo = await fetch(`/api/billTos/${currentBillToId}/shiptos/${currentBillToId}`)
      if (!getRelatedShipTo.ok) {
        throw new Error("Failed to fetch related ship to")
      }

      // const getAddressFields = await fetch("/api/address/addressFields")
      // if (!getAddressFields.ok) {
      //   throw new Error("Failed to fetch address fields")
      // }

      // const allAddress = await fetchAddress()
      const getAllShipTos = await fetch("/api/billTos/current/shipTos")
      if (!getAllShipTos.ok) {
        throw new Error("Failed to fetch all ship tos")
      }
    
      console.log('allAddressallAddress', JSON.parse(await getAllShipTos.text()));

      // => setState({ allAddress })
    };

    getAllAddresses();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAddress = (formData: any) => {
    // Xử lý lưu địa chỉ mới
    console.log("Saved address:", formData);
    // Cập nhật shipping address
    setIsModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-tertiary font-bold text-base uppercase">
            Shipping Address
          </h2>
          <button
            onClick={handleOpenEditModal}
            className="text-tertiary flex items-center gap-1"
          >
            <PenLine size={18} />
            <span className="font-medium cursor-pointer">EDIT</span>
          </button>
        </div>
        <div className="text-tertiary space-y-1">
          {Object.values(currentAddress).map((item, index) => (
            <p
              key={index}
              className="font-lora text-sm lg:text-base font-medium"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      {/* <ChangeAddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
        initialData={currentAddress}
        mode="edit"
      /> */}
    </>
  );
};

export default MyShippingAddress;
