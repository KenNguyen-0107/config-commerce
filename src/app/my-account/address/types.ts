export interface ValidationRules {
  isRequired: boolean;
  isDisabled: boolean;
  maxLength: number | null;
}

export interface Country {
  uri?: string | null;
  id?: string;
  name?: string;
  abbreviation?: string;
  states?: any[]; // Adjust this type based on the structure of states if needed
  properties?: Record<string, any>;
}

export interface IAddress {
  uri?: string | null;
  isNew?: boolean;
  oneTimeAddress?: boolean;
  label?: string;
  validation?: {
    firstName?: ValidationRules;
    lastName?: ValidationRules;
    companyName?: ValidationRules;
    attention?: ValidationRules;
    address1?: ValidationRules;
    address2?: ValidationRules;
    address3?: ValidationRules;
    address4?: ValidationRules;
    country?: ValidationRules;
    state?: ValidationRules;
    city?: ValidationRules;
    postalCode?: ValidationRules;
    phone?: ValidationRules;
    email?: ValidationRules;
    fax?: ValidationRules;
  };
  isDefault?: boolean;
  id?: string;
  customerNumber?: string;
  customerSequence?: string;
  customerName?: string;
  firstName?: string;
  lastName?: string;
  contactFullName?: string;
  companyName?: string;
  attention?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  city?: string;
  postalCode?: string;
  state?: Country;
  country?: Country;
  phone?: number;
  fullAddress?: string;
  email?: string;
  fax?: string;
  isVmiLocation?: boolean;
  properties?: Record<string, any>;
}

export interface ICountry {
  uri?: string;
  id?: string;
  name?: string;
  abbreviation?: string;
  states?: Omit<ICountry, "states">[];
  properties?: Record<string, any>;
}