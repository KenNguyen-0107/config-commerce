"use client";
import { Search, PenLine, MoreVertical } from "lucide-react";
import CreateAddressModal from "./ChangeAddressModal";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IAddress, ICountry } from "./types";

export default function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [initialData, setInitialData] = useState<IAddress>({});
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentShipping, setCurrentShipping] = useState<IAddress>({});
  const [allShipping, setAllShipping] = useState<IAddress[]>([]);
  const [allAddress, setAllAddress] = useState<IAddress>({});
  const [country, setCountry] = useState<ICountry[]>([]);

  const updateDefaultShippingAddress = async (address: IAddress) => {
    const reqUpdate = await fetch("/api/sessions/current", {
      method: "PATCH",
      body: JSON.stringify({
        customerWasUpdated: true,
        shipTo: {
          id: address.id,
        },
      }),
    });

    if (!reqUpdate.ok) {
      throw new Error("Failed to update default shipping address");
    }
  };
  const handleOpenCreateModal = () => {
    setModalMode("create");
    setInitialData({});
    setIsModalOpen(true);
  };

  // Function to handle opening the modal in edit mode
  const handleOpenEditModal = (address: any) => {
    setModalMode("edit");
    setInitialData(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAddress = (formData: any) => {
    console.log("New address data:", formData);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getallShippinges = async () => {
      const fetchCurrentSession = await fetch("/api/sessions/current");
      if (!fetchCurrentSession.ok) {
        // redirect to login page
        throw new Error("Failed to fetch current session");
      }
      const reqGetCurrentBillTo = await fetch("/api/billTos/current");
      if (!reqGetCurrentBillTo.ok) {
        throw new Error("Failed to fetch current bill to");
      }

      const currentBillToId = JSON.parse(await reqGetCurrentBillTo.text()).id;
      const getRelatedShipTo = await fetch(
        `/api/billTos/${currentBillToId}/shiptos/${currentBillToId}`
      );
      if (!getRelatedShipTo.ok) {
        throw new Error("Failed to fetch related ship to");
      }
      // get billing address
      const getAllBillTos = await fetch("/api/billTos/current");
      // get shipping address
      const getAllShipTos = await fetch("/api/billTos/current/shipTos");
      if (!getAllShipTos.ok) {
        throw new Error("Failed to fetch all ship tos");
      }

      let Shipping = JSON.parse(await getAllShipTos.text());
      let billingAddress = JSON.parse(await getAllBillTos.text());

      let currentShipping =
        Shipping.shipTos.find((item: IAddress) => item.id && item.isDefault) ||
        Shipping.shipTos.find((item: IAddress) => item.id);
      let allShipping = Shipping.shipTos.filter(
        (item: IAddress) => item.id && !item.isDefault
      );
      setAllAddress(billingAddress);
      setAllShipping(allShipping);
      setCurrentShipping(currentShipping);
    };

    const getCountries = async () => {
      const reqGetCountries = await fetch("/api/website/countries");
      if (!reqGetCountries.ok) {
        throw new Error("Failed to fetch countries");
      }

      let country = JSON.parse(await reqGetCountries.text());
      console.log("JSON.parse(await reqGetCountries.text())", country);
      setCountry(country.countries);
    };
    getCountries();
    getallShippinges();
  }, []);

  const handleUseAsShipping = async (address: IAddress) => {
    try {
      updateDefaultShippingAddress(address)
      setCurrentShipping(address)
    } catch (error) {
      
    }
  }
  return (
    <div className="bg-muted-background min-h-screen py-4 md:py-10 container">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-tertiary mb-6">ADDRESSES</h1>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column - Shipping & Billing Address */}
          <div className="w-full md:w-[352px] flex flex-col gap-6">
            {/* Shipping Address */}
            <div className="bg-white p-6 rounded h-[224px]">
              <div className="flex justify-between items-center mb-4 text-blue">
                <h2 className="text-blue font-bold text-base uppercase">
                  Shipping Address
                </h2>
                <button
                  onClick={() => handleOpenEditModal(currentShipping)}
                  className="text-tertiary flex items-center gap-1"
                >
                  <PenLine size={18} />
                  <span className="font-medium cursor-pointer">EDIT</span>
                </button>
              </div>
              <div className="text-tertiary space-y-1">
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
                {currentShipping.fullAddress && (
                  <p className="font-lora text-sm lg:text-base font-medium">
                    {currentShipping.fullAddress}
                  </p>
                )}
                {currentShipping.country?.name && (
                  <p className="font-lora text-sm lg:text-base font-medium">
                    {currentShipping.country?.name}
                  </p>
                )}
                {currentShipping.email && (
                  <p className="font-lora text-sm lg:text-base font-medium">
                    {currentShipping.email}
                  </p>
                )}
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white p-6 rounded h-[224px]">
              <div className="flex justify-between items-center mb-4 text-blue">
                <h2 className="text-blue font-bold text-base uppercase">
                  Billing Address
                </h2>
                <button
                  onClick={() => handleOpenEditModal(allAddress)}
                  className="text-tertiary flex items-center gap-1"
                >
                  <PenLine size={18} />
                  <span className="font-medium cursor-pointer">EDIT</span>
                </button>
              </div>
              <div className="text-tertiary space-y-1">
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
                {allAddress.fullAddress && (
                  <p className="font-lora text-sm lg:text-base font-medium">
                    {allAddress.fullAddress}
                  </p>
                )}
                {allAddress.country?.name && (
                  <p className="font-lora text-sm lg:text-base font-medium">
                    {allAddress.country?.name}
                  </p>
                )}
                {allAddress.email && (
                  <p className="font-lora text-sm lg:text-base font-medium">
                    {allAddress.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Address Book */}
          <div className="w-full md:flex-1 bg-white rounded flex-grow">
            <div className="bg-gray-200 p-4 rounded-t">
              <h2 className=" font-bold text-base uppercase text-blue">
                Address Book
              </h2>
            </div>

            <div className="p-4 md:p-6">
              {/* Search and Create New */}
              <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                <div className="relative w-full md:w-[320px]">
                  <input
                    type="text"
                    placeholder="Search ship to"
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tertiary">
                    <Search size={20} />
                  </div>
                </div>
                <Button
                  onClick={handleOpenCreateModal}
                  className=" py-2 px-4 rounded font-medium"
                >
                  CREATE NEW ADDRESS
                </Button>
              </div>

              {/* Address List */}
              <div className="space-y-6">
                {/* Address Item 1 */}
                {allShipping.map((address, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between">
                      <div className="text-tertiary space-y-1">
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
                        {address.fullAddress && (
                          <p className="font-lora text-sm lg:text-base font-medium">
                            {address.fullAddress}
                          </p>
                        )}
                        {address.country?.name && (
                          <p className="font-lora text-sm lg:text-base font-medium">
                            {address.country?.name}
                          </p>
                        )}
                        {address.email && (
                          <p className="font-lora text-sm lg:text-base font-medium">
                            {address.email}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          disabled={address.id === currentShipping.id}
                          className=" py-2 px-4 rounded font-medium hidden md:block"
                          onClick={() => handleUseAsShipping(address)}
                        >
                          USE AS SHIPPING ADDRESS
                        </Button>
                        <button
                          disabled={address.id === currentShipping.id}
                          onClick={() =>
                            handleOpenEditModal(allShipping[index])
                          }
                          className="text-tertiary flex items-center gap-1 md:flex"
                        >
                          <PenLine size={18} />
                          <span className="font-medium">EDIT</span>
                        </button>
                        <Button
                          disabled={address.id === currentShipping.id}
                          className="text-tertiary md:hidden"
                        >
                          <MoreVertical size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <CreateAddressModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveAddress}
          initialData={initialData}
          mode={modalMode}
          listCountry={country}
        />
      </div>
    </div>
  );
}
