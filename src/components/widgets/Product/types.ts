import {
	Maybe,
	ProductAttributeTypeContainer,
	ProductContentContainer,
	ProductDetail,
	ProductDocumentContainer,
	ProductImageContainer,
	ProductInventoryFulfillment,
	ProductRelatedProductContainer,
	ProductRestrictionGroupContainer,
	ProductSeasonal,
	ProductSpecificationContainer,
	ProductUnitOfMeasureContainer,
	ProductVariantTraitContainer,
	ProductWarehouseContainer,
	Scalars,
} from "@/gql/graphql";

export interface ProductProps {
	children?: React.ReactNode;
	__typename?: "Product";
	ActivateOn?: Maybe<Scalars["String"]["output"]>;
	AllowZeroPricing?: Maybe<Scalars["Boolean"]["output"]>;
	AttributeTypeContainer?: Maybe<ProductAttributeTypeContainer>;
	ChildTraitValuesContainer?: Maybe<ProductAttributeTypeContainer>;
	CanAddToCart?: Maybe<Scalars["Boolean"]["output"]>;
	CanAddToWishlist?: Maybe<Scalars["Boolean"]["output"]>;
	CanConfigure?: Maybe<Scalars["Boolean"]["output"]>;
	CanShowPrice?: Maybe<Scalars["Boolean"]["output"]>;
	CanShowUnitOfMeasure?: Maybe<Scalars["Boolean"]["output"]>;
	CanonicalUrl?: Maybe<Scalars["String"]["output"]>;
	CantBuy?: Maybe<Scalars["Boolean"]["output"]>;
	Categories?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
	ConfigurationType?: Maybe<Scalars["String"]["output"]>;
	ContentContainer?: Maybe<ProductContentContainer>;
	CustomerProductNumber?: Maybe<Scalars["String"]["output"]>;
	CustomerUnitOfMeasure?: Maybe<Scalars["String"]["output"]>;
	DeactivateOn?: Maybe<Scalars["String"]["output"]>;
	DefaultChildProductId?: Maybe<Scalars["String"]["output"]>;
	Detail?: Maybe<ProductDetail>;
	DocumentContainer?: Maybe<ProductDocumentContainer>;
	ExcludeFromRecommendations?: Maybe<Scalars["Boolean"]["output"]>;
	ExcludeWhenOutOfSeason?: Maybe<Scalars["Boolean"]["output"]>;
	Id?: Maybe<Scalars["String"]["output"]>;
	ImageAltText?: Maybe<Scalars["String"]["output"]>;
	ImageContainer?: Maybe<ProductImageContainer>;
	InventoryFulfillment?: Maybe<ProductInventoryFulfillment>;
	IsDiscontinued?: Maybe<Scalars["Boolean"]["output"]>;
	IsSponsored?: Maybe<Scalars["Boolean"]["output"]>;
	IsVariantParent?: Maybe<Scalars["Boolean"]["output"]>;
	LargeImagePath?: Maybe<Scalars["String"]["output"]>;
	ManufacturerItem?: Maybe<Scalars["String"]["output"]>;
	MediumImagePath?: Maybe<Scalars["String"]["output"]>;
	MinimumOrderQty?: Maybe<Scalars["Int"]["output"]>;
	PackDescription?: Maybe<Scalars["String"]["output"]>;
	PriceFacet?: Maybe<Scalars["String"]["output"]>;
	ProductNumber?: Maybe<Scalars["String"]["output"]>;
	ProductTitle?: Maybe<Scalars["String"]["output"]>;
	QuoteRequired?: Maybe<Scalars["Boolean"]["output"]>;
	RelatedProductContainer?: Maybe<ProductRelatedProductContainer>;
	RestrictionGroupContainer?: Maybe<ProductRestrictionGroupContainer>;
	SalePriceLabel?: Maybe<Scalars["String"]["output"]>;
	Score?: Maybe<Scalars["Float"]["output"]>;
	Seasonal?: Maybe<ProductSeasonal>;
	SmallImagePath?: Maybe<Scalars["String"]["output"]>;
	SortPriority?: Maybe<Scalars["Int"]["output"]>;
	SpecificationContainer?: Maybe<ProductSpecificationContainer>;
	TrackInventory?: Maybe<Scalars["Boolean"]["output"]>;
	UnitListPrice?: Maybe<Scalars["Float"]["output"]>;
	UnitListPriceDisplay?: Maybe<Scalars["String"]["output"]>;
	UnitOfMeasureContainer?: Maybe<ProductUnitOfMeasureContainer>;
	Uri?: Maybe<Scalars["String"]["output"]>;
	Url?: Maybe<Scalars["String"]["output"]>;
	UrlSegment?: Maybe<Scalars["String"]["output"]>;
	VariantTraitContainer?: Maybe<ProductVariantTraitContainer>;
	VariantTypeId?: Maybe<Scalars["String"]["output"]>;
	WarehouseContainer?: Maybe<ProductWarehouseContainer>;
	_id?: Maybe<Scalars["String"]["output"]>;
}

export interface CartLine {
	uri: string;
	productUri: string;
	id: string;
	line: number;
	productId: string;
	smallImagePath: string;
	altText: string;
	productName: string;
	manufacturerItem: string;
	customerName: string | null;
	shortDescription: string;
	erpNumber: string;
	unitOfMeasure: string;
	unitOfMeasureDisplay: string;
	unitOfMeasureDescription: string;
	baseUnitOfMeasure: string;
	baseUnitOfMeasureDisplay: string;
	qtyPerBaseUnitOfMeasure: number;
	costCode: string;
	notes: string;
	qtyOrdered: number;
	qtyLeft: number;
	pricing: Pricing;
	isPromotionItem: boolean;
	isDiscounted: boolean;
	isConfigured: boolean;
	isFixedConfiguration: boolean;
	quoteRequired: boolean;
	availability: Availability;
	qtyOnHand: number;
	canAddToCart: boolean;
	isQtyAdjusted: boolean;
	hasInsufficientInventory: boolean;
	canBackOrder: boolean;
	trackInventory: boolean;
	salePriceLabel: string;
	cantBuy: boolean;
	isSubscription: boolean;
	productSubscription: ProductSubscription;
	isRestricted: boolean;
	canAddToWishlist: boolean;
	isActive: boolean;
	vmiBinId: any;
	isDiscontinued: boolean;
	allowZeroPricing: boolean;
}

export interface Pricing {
	productId: string;
	isOnSale: boolean;
	requiresRealTimePrice: boolean;
	unitCost: number;
	unitCostDisplay: string;
	unitListPrice: number;
	unitListPriceDisplay: string;
	extendedUnitListPrice: number;
	extendedUnitListPriceDisplay: string;
	unitRegularPrice: number;
	unitRegularPriceDisplay: string;
	extendedUnitRegularPrice: number;
	extendedUnitRegularPriceDisplay: string;
	unitNetPrice: number;
	unitNetPriceDisplay: string;
	extendedUnitNetPrice: number;
	extendedUnitNetPriceDisplay: string;
	vatRate: number;
	vatAmount: number;
	regularPrice: number;
	regularPriceDisplay: string;
	extendedRegularPrice: number;
	extendedRegularPriceDisplay: string;
	actualPrice: number;
	actualPriceDisplay: string;
	extendedActualPrice: number;
	extendedActualPriceDisplay: string;
	unitListPriceWithVat: number;
	extendedUnitListPriceWithVat: number;
	unitRegularPriceWithVat: number;
	unitRegularPriceWithVatDisplay: string;
	extendedUnitRegularPriceWithVat: number;
	extendedUnitRegularPriceWithVatDisplay: string;
	vatMinusExtendedUnitRegularPrice: number;
}

export interface Availability {
	messageType: number;
	requiresRealTimeInventory: boolean;
}

export interface ProductSubscription {
	subscriptionAddToInitialOrder: boolean;
	subscriptionAllMonths: boolean;
	subscriptionApril: boolean;
	subscriptionAugust: boolean;
	subscriptionCyclePeriod: string;
	subscriptionDecember: boolean;
	subscriptionFebruary: boolean;
	subscriptionFixedPrice: boolean;
	subscriptionJanuary: boolean;
	subscriptionJuly: boolean;
	subscriptionJune: boolean;
	subscriptionMarch: boolean;
	subscriptionMay: boolean;
	subscriptionNovember: boolean;
	subscriptionOctober: boolean;
	subscriptionPeriodsPerCycle: number;
	subscriptionSeptember: boolean;
	subscriptionTotalCycles: number;
}
