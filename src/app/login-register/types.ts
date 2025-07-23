export interface IWebsiteSettings {
	UsePaymetricGateway?: boolean;
	CmsType?: string;
	IncludeSiteNameInPageTitle?: boolean;
	PageTitleDelimiter?: string;
	SiteNameAfterTitle?: boolean;
}

export interface IAccountSettings {
	AllowCreateAccount?: boolean;
	AllowGuestCheckout?: boolean;
	AllowSubscribeToNewsLetter?: boolean;
	AllowEmptyShipping?: boolean;
	RequireSelectCustomerOnSignIn?: boolean;
	PasswordMinimumLength?: number;
	PasswordMinimumRequiredLength?: number;
	PasswordRequiresSpecialCharacter?: boolean;
	PasswordRequiresUppercase?: boolean;
	PasswordRequiresLowercase?: boolean;
	PasswordRequiresDigit?: boolean;
	RememberMe?: boolean;
	KeepMeSignedIn?: boolean;
	DaysToRetainUser?: number;
	UseEmailAsUserName?: boolean;
	EnableWarehousePickup?: boolean;
	LogOutUserAfterPasswordChange?: boolean;
	RequireActivateAccount?: boolean;
}

export interface ICustomerSettings {
	AllowBillToAddressEdit?: boolean;
	AllowShipToAddressEdit?: boolean;
	AllowCreateNewShipToAddress?: boolean;
	BillToCompanyRequired?: boolean;
	BillToFirstNameRequired?: boolean;
	BillToLastNameRequired?: boolean;
	ShipToCompanyRequired?: boolean;
	ShipToFirstNameRequired?: boolean;
	ShipToLastNameRequired?: boolean;
	BudgetsFromOnlineOnly?: boolean;
	BillToStateRequired?: boolean;
	ShipToStateRequired?: boolean;
	DisplayAccountsReceivableBalances?: boolean;
	AllowOneTimeAddresses?: boolean;
}

export interface ISearchSettings {
	AutocompleteEnabled?: boolean;
	SearchHistoryEnabled?: boolean;
	SearchHistoryLimit?: number;
	EnableBoostingByPurchaseHistory?: boolean;
	AllowFilteringForPreviouslyPurchasedProducts?: boolean;
	SearchPath?: string | null;
	SearchProvider?: string;
}

export interface IOrderSettings {
	AllowCancellationRequest?: boolean;
	AllowQuickOrder?: boolean;
	CanReorderItems?: boolean;
	CanOrderUpload?: boolean;
	AllowRma?: boolean;
	ShowCostCode?: boolean;
	ShowPoNumber?: boolean;
	ShowTermsCode?: boolean;
	ShowErpOrderNumber?: boolean;
	ShowWebOrderNumber?: boolean;
	ShowOrderStatus?: boolean;
	ShowOrders?: boolean;
	LookBackDays?: number;
	VmiEnabled?: boolean;
}

export interface ICartSettings {
	CanRequestDeliveryDate?: boolean;
	CanRequisition?: boolean;
	CanEditCostCode?: boolean;
	AddToCartPopupTimeout?: number;
	BypassCvvForSavedCards?: boolean;
	EnableRequestPickUpDate?: boolean;
	EnableSavedCreditCards?: boolean;
	MaximumDeliveryPeriod?: number;
	OnePageCheckout?: boolean;
	RequiresPoNumber?: boolean;
	ShowCostCode?: boolean;
	ShowCreditCard?: boolean;
	ShowLineNotes?: boolean;
	ShowNewsletterSignup?: boolean;
	ShowPayPal?: boolean;
	ShowPoNumber?: boolean;
	ShowTaxAndShipping?: boolean;
}
export interface IProductSettings {
	AllowBackOrder?: boolean;
	AllowBackOrderForDelivery?: boolean;
	AllowBackOrderForPickup?: boolean;
	AlternateUnitsOfMeasure?: boolean;
	AttributesTabSortOrder?: string;
	CanAddToCart?: boolean;
	CanSeePrices?: boolean;
	CanSeeProducts?: boolean;
	CanShowPriceFilters?: boolean;
	CatalogUrlPath?: string;
	DefaultViewType?: string;
	DisplayAttributesInTabs?: boolean;
	DisplayDocumentsInTabs?: boolean;
	DisplayFacetsForStockedItems?: boolean;
	DisplayInventoryPerWarehouse?: boolean;
	DisplayInventoryPerWarehouseOnlyOnProductDetail?: boolean;
	DocumentsTabSortOrder?: string;
	EnableProductComparisons?: boolean;
	EnableVat?: boolean;
	NumberOfProductsToLoad?: number;
	PricingService?: string;
	ProductLoadStyle?: string;
	RealTimeInventory?: boolean;
	RealTimePricing?: boolean;
	ShowAddToCartConfirmationDialog?: boolean;
	ShowInventoryAvailability?: boolean;
	ShowSavingsAmount?: boolean;
	ShowSavingsPercent?: boolean;
}

export interface ICatalogSettings {
	NotFoundLargeImagePath?: string;
	NotFoundMediumImagePath?: string;
	NotFoundSmallImagePath?: string;
	InventorySettings?: {
		ShowInventoryAvailability?: string;
		ShowInventoryOnCart?: boolean;
	};
	PricingSettings?: {
		Service?: string;
		ShowSavingsAmount?: boolean;
		ShowSavingsPercent?: boolean;
	};
}

export interface IAllSettings {
	WebsiteSettings?: IWebsiteSettings;
	AccountSettings?: IAccountSettings;
	CustomerSettings?: ICustomerSettings;
	SearchSettings?: ISearchSettings;
	OrderSettings?: IOrderSettings;
	CartSettings?: ICartSettings;
	ProductSettings?: IProductSettings;
	CatalogSettings?: ICatalogSettings;
}
