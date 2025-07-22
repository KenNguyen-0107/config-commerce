'use client';
import { Button } from "@/components/ui/button";
import { MoreVertical, PenLine } from "lucide-react";
import React, { useState } from "react";

const ListShippingAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentAddress, setCurrentAddress] = useState({});

  let shipping = [
    "Niteco",
    "London, Greater London 10000",
    "anh.nguyen12@niteco.se",
  ];

  const handleOpenEditModal = () => {
    setModalMode("edit");
    // setCurrentAddress(address);
    setIsModalOpen(true);
  };
  return (
    <div className="space-y-6">
      {/* Address Item 1 */}
      {shipping.map((item, index) => (
        <div key={index} className="border-b border-gray-200 pb-6">
          <div className="flex justify-between">
            <div className="text-tertiary space-y-1">
              {shipping.map((item, index) => (
                <p
                  key={index}
                  className="font-lora text-sm lg:text-base font-medium"
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button className=" py-2 px-4 rounded font-medium hidden md:block">
                USE AS SHIPPING ADDRESS
              </Button>
              <button
                onClick={handleOpenEditModal}
                className="text-tertiary flex items-center gap-1 md:flex"
              >
                <PenLine size={18} />
                <span className="font-medium cursor-pointer">EDIT</span>
              </button>
              <Button className="text-tertiary md:hidden">
                <MoreVertical size={20} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListShippingAddress;
