import { BillToModel, CartLineCollectionModel, CartLineModel, CartModel, PaginationModel, ProductSubscriptionDto, SectionOptionDto, ShipToModel } from "./ApiModels";

export interface IApiError {
	url: string;
	errorMessage: string;
	status: number;
	errorJson: {
		message?: string;
	};
	detailsPath?: string;
}

export interface Dictionary<T> {
	[key: string]: T;
}

export interface ApiParameter {
	additionalQueryStringParameters?: Dictionary<any>;
}

export interface HasPagingParameters {
	page?: number;
	pageSize?: number;
	defaultPageSize?: number;
	sort?: string;
}

export type Cart = Omit<CartModel, "billTo" | "shipTo"> & {
	billToId?: string;
	shipToId?: string;
	collectionShipToLabel?: string;
};

export interface GetCartApiParameter extends ApiParameter {
	cartId: string;
	forceRecalculation?: boolean;
	allowInvalidAddress?: boolean;
	expand?: (
			| "tax"
			| "shipping"
			| "creditCardBillingAddress"
			| "paymentOptions"
			| "carriers"
			| "shipTos"
			| "validation"
			| "cartLines"
			| "alsoPurchased"
			| "restrictions"
			| "hiddenproducts"
			| "costCodes"
	)[];
	additionalExpands?: string[];
	alsoPurchasedMaxResults?: number;
}

export interface AddCartApiParameter extends ApiParameter {
	shipToId?: string;
	billToId?: string;
	notes?: string;
	vmiLocationId?: string;
}

export interface UpdateCartApiParameter extends ApiParameter {
	cart: Cart;
}

export interface GetCartPromotionsApiParameter extends ApiParameter {
	cartId: string;
}

export interface AddCartLinesApiParameter extends ApiParameter {
	cartId: string;
	cartLineCollection: CartLineCollectionModel;
}

export type CartResult = {
	cart: Cart;
	billTo?: BillToModel;
	shipTo?: ShipToModel;
};

export type CartCollectionResult = {
	carts?: Cart[];
	pagination: PaginationModel | null;
};

export interface GetCartsApiParameter extends ApiParameter, HasPagingParameters {
	shipToId?: string;
	billToId?: string;
	status?: string;
	orderNumber?: string;
	fromDate?: string;
	toDate?: string;
	orderTotalOperator?: string;
	orderTotal?: string;
	orderSubtotalOperator?: string;
	orderSubtotal?: string;
	vmiLocationId?: string;
}

export type ServiceResult<T> =
    | {
          successful: true;
          result: T;
      }
    | {
          successful: false;
          errorMessage: string;
          statusCode?: number;
      };

export interface AddProductApiParameter extends ApiParameter {
	productId: string;
	qtyOrdered: number;
	unitOfMeasure: string;
	notes?: string;
	sectionOptions?: Partial<SectionOptionDto>[];
	subscription?: ProductSubscriptionDto;
}

export interface UpdateCartApiParameter extends ApiParameter {
	cart: Cart;
}

export interface GetCartPromotionsApiParameter extends ApiParameter {
	cartId: string;
}

export interface AddCartLinesApiParameter extends ApiParameter {
	cartId: string;
	cartLineCollection: CartLineCollectionModel;
}

export interface AddWishListToCartApiParameter extends ApiParameter {
	wishListId: string;
	changedSharedListLinesQuantities?: { [key: string]: number };
}

export interface ClearCartApiParameter extends ApiParameter {
	cartId: string;
}

export interface RemoveCartLinesApiParameter extends ApiParameter {
	cartId: string;
}

export interface UpdateCartLineApiParameter extends ApiParameter {
	cartId: string;
	cartLine: CartLineModel;
}

export interface RemoveCartApiParameter extends ApiParameter {
	cartId: string;
	isAlternateCart?: boolean;
}

export interface RemoveCartLineApiParameter extends ApiParameter {
	cartId: string;
	cartLineId: string;
}

export interface AddCartPromotionApiParameter extends ApiParameter {
	cartId: string;
	promotionCode: string;
}

export interface RemoveCartPromotionApiParameter extends ApiParameter {
	cartId: string;
	promotionId: string;
}

export interface RemoveCartPromotionsApiParameter extends ApiParameter {
	cartId: string;
}

export interface GetRealTimeCartInventoryApiParameter extends ApiParameter {
	cartId?: string;
	warehouseIds?: string[];
}
