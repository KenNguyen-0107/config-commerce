export interface AddressField {
	FieldName: string;
	DisplayName: string;
	IsVisible: boolean;
	IsSystemField: boolean;
	IsRequired: boolean;
	IsMaxFieldLengthRequired: boolean;
	MaxFieldLength: number;
}

export interface AddressContainer {
	ShipToAddresses: AddressField[];
	BillToAddresses: AddressField[];
}

export interface AddressDataProps {
	Id: string;
	ParentId: string | null;
	BillToAddressContainer: AddressContainer;
	ShipToAddressContainer: AddressContainer;
}