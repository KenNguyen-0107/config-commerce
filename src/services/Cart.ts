import { API_BASE_URL, API_CART_FRAGMENT, API_CARTLINE_FRAGMENT, API_URL_CURRENT_FRAGMENT, del, doesNotHaveExpand, get, patch, post } from "./Api";
import { BillToModel, CartCollectionModel, CartLineModel, CartModel, PromotionCollectionModel, PromotionModel, RealTimeCartInventoryModel, ShipToModel } from "./ApiModels";
import { AddCartApiParameter, AddCartLinesApiParameter, AddCartPromotionApiParameter, AddProductApiParameter, Cart, CartCollectionResult, CartResult, ClearCartApiParameter, GetCartApiParameter, GetCartPromotionsApiParameter, GetCartsApiParameter, GetRealTimeCartInventoryApiParameter, IApiError, RemoveCartApiParameter, RemoveCartLineApiParameter, RemoveCartLinesApiParameter, RemoveCartPromotionApiParameter, RemoveCartPromotionsApiParameter, ServiceResult, UpdateCartApiParameter, UpdateCartLineApiParameter } from "./types";
import { handleApiError } from "./utils";

const cartsUrl = `${API_BASE_URL}/${API_CART_FRAGMENT}`;

export async function addCart(parameter: AddCartApiParameter) {
    try {
        await post(`${cartsUrl}`, parameter);
        return {
            successful: true,
        };
    } catch (error) {
			const apiError = error as IApiError
        if ("status" in apiError && (apiError.status === 400 || apiError.status === 403 || apiError.status === 404)) {
            return {
                successful: false,
                errorMessage: apiError?.errorJson?.message || apiError?.errorMessage || "error",
                statusCode: apiError.status,
            };
        }
        throw apiError;
    }
}

export async function getCart(parameter: GetCartApiParameter) {
    const { cartId, ...newParameter } = parameter;
    const cartModel = await get<CartModel>(`${cartsUrl}/${cartId}`, newParameter);
    const cartResult = cleanCart(cartModel, newParameter);
    return cartResult;
}

export async function getCarts(parameter: GetCartsApiParameter): Promise<ServiceResult<CartCollectionResult>> {
    try {
        const carts = await get<CartCollectionModel>(cartsUrl, parameter);
        return {
            successful: true,
            result: cleanCarts(carts),
        };
    } catch (error) {
			const apiError = error as IApiError
        if (handleApiError(apiError) && apiError.status === 400) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message || "",
            };
        }
        throw apiError;
    }
}

function cleanCarts(cartCollection: CartCollectionModel): CartCollectionResult {
    const cartCollectionResult = {
        pagination: cartCollection.pagination,
        carts: [],
    } as CartCollectionResult;

    cartCollection.carts?.forEach(cart => {
        delete cart.cartLines;
        cartCollectionResult.carts!.push({
            ...cart,
            orderDate: cart.orderDate && new Date(cart.orderDate),
            collectionShipToLabel: cart.shipToLabel,
        });
    });

    return cartCollectionResult;
}

export async function updateCart(parameter: UpdateCartApiParameter) {
    const { cart } = parameter;
    const { billToId, shipToId } = cart;
    const patchModel: CartModel = {
        ...cart,
        billTo: billToId ? ({ id: billToId } as BillToModel) : null,
        shipTo: shipToId ? ({ id: shipToId } as ShipToModel) : null,
    };

    const cartModel = await patch<CartModel>(`${cartsUrl}/${patchModel.id}`, patchModel);
    const cartResult = cleanCart(cartModel, { expand: ["paymentOptions"] });
    return cartResult;
}

export async function updateCartWithResult(parameter: UpdateCartApiParameter): Promise<ServiceResult<CartResult>> {
    const { cart } = parameter;
    const { billToId, shipToId } = cart;
    const patchModel: CartModel = {
        ...cart,
        billTo: billToId ? ({ id: billToId } as BillToModel) : null,
        shipTo: shipToId ? ({ id: shipToId } as ShipToModel) : null,
    };
    try {
        const cartModel = await patch<CartModel>(`${cartsUrl}/${patchModel.id}`, patchModel);
        const cartResult = cleanCart(cartModel, { expand: ["paymentOptions"] });
        return {
            successful: true,
            result: cartResult,
        };
    } catch (error) {
			const apiError = error as IApiError
        if (handleApiError(apiError) && apiError.status === 400) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message || "",
            };
        }
        throw apiError;
    }
}

function cleanCart(cartModel: CartModel, parameter?: { expand?: string[]; additionalExpands?: string[] }) {
    cartModel.orderDate = cartModel.orderDate! && new Date(cartModel.orderDate!);
    cartModel.requestedPickupDateDisplay =
        cartModel.requestedPickupDateDisplay! && new Date(cartModel.requestedPickupDateDisplay!);
    cartModel.requestedDeliveryDateDisplay =
        cartModel.requestedDeliveryDateDisplay! && new Date(cartModel.requestedDeliveryDateDisplay!);

    if (doesNotHaveExpand(parameter, "cartLines")) {
        delete cartModel.cartLines;
    }
    if (doesNotHaveExpand(parameter, "paymentOptions")) {
        delete cartModel.paymentMethod;
        delete cartModel.paymentOptions;
    }
    if (doesNotHaveExpand(parameter, "carriers")) {
        delete cartModel.carriers;
    }
    if (doesNotHaveExpand(parameter, "validation")) {
        delete cartModel.billTo?.validation;
        if (cartModel.shipTo) {
            cartModel.shipTo.validation = null;
        }
    }
    const cartResult = {
        cart: cartModel as Cart,
        billTo: cartModel.billTo ? cartModel.billTo : undefined,
        shipTo: cartModel.shipTo ? cartModel.shipTo : undefined,
    };

    if (cartModel.billTo) {
        cartResult.cart.billToId = cartModel.billTo.id;
        delete (cartResult.cart as CartModel).billTo;
    }

    if (cartModel.shipTo) {
        cartResult.cart.shipToId = cartModel.shipTo.id;
        delete (cartResult.cart as CartModel).shipTo;
    }

    return cartResult;
}

export async function getCartPromotions(parameter: GetCartPromotionsApiParameter) {
    const { cartId, ...newParameter } = parameter;
    const promotionCollection = await get<PromotionCollectionModel>(`${cartsUrl}/${cartId}/promotions`, newParameter);

    if (promotionCollection.promotions) {
        addCartLineToId(promotionCollection.promotions);
    }

    return promotionCollection;
}

function addCartLineToId(promotions: PromotionModel[]) {
    promotions.forEach(promo => {
        if (promo.orderLineId) {
            promo.id = `${promo.id}:${promo.orderLineId}`;
        }
    });
}

export function addLineCollection(parameter: AddCartLinesApiParameter) {
    return post(`${cartsUrl}/${parameter.cartId}/cartlines/batch`, parameter.cartLineCollection);
}

export function addProduct(parameter: AddProductApiParameter) {
    const cartLine = {
        productId: parameter.productId,
        qtyOrdered: parameter.qtyOrdered,
        unitOfMeasure: parameter.unitOfMeasure,
        notes: parameter.notes,
        sectionOptions: parameter.sectionOptions,
    } as CartLineModel;

    if (parameter.subscription) {
        cartLine.properties = {
            productSubscription: JSON.stringify(parameter.subscription),
        };
    }

    return post(`${cartsUrl}/${API_URL_CURRENT_FRAGMENT}/${API_CARTLINE_FRAGMENT}`, cartLine);
}

export async function addProductWithResult(parameter: AddProductApiParameter): Promise<ServiceResult<CartLineModel>> {
    const cartLine = {
        productId: parameter.productId,
        qtyOrdered: parameter.qtyOrdered,
        unitOfMeasure: parameter.unitOfMeasure,
        notes: parameter.notes,
        sectionOptions: parameter.sectionOptions,
    } as CartLineModel;

    if (parameter.subscription) {
        cartLine.properties = {
            productSubscription: JSON.stringify(parameter.subscription),
        };
    }

    try {
        const cartLineModel = await post(`${cartsUrl}/${API_URL_CURRENT_FRAGMENT}/cartlines`, cartLine);
        return {
            successful: true,
            result: cartLineModel,
        };
    } catch (error) {
			const apiError = error as IApiError
        if (handleApiError(apiError) && apiError.status === 400) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message || "",
            };
        }
        if (apiError.status === 403) {
            return {
                successful: false,
                errorMessage: apiError.errorMessage,
                statusCode: 403,
            };
        }
        throw apiError;
    }
}

// export function addWishListToCart(parameter: AddWishListToCartApiParameter) {
//     const { wishListId, ...data } = { ...parameter };
//     return post<CartLineCollectionModel>(
//         `${cartsUrl}/${API_URL_CURRENT_FRAGMENT}/cartlines/wishlist/${wishListId}`,
//         data as any,
//     );
// }

export function clearCart(parameter: ClearCartApiParameter) {
    return del(`${cartsUrl}/${parameter.cartId}`);
}

export function removeCartLines(parameter: RemoveCartLinesApiParameter) {
    return del(`${cartsUrl}/${parameter.cartId}/cartlines`);
}

export function updateCartLine(parameter: UpdateCartLineApiParameter) {
    return patch(`${cartsUrl}/${parameter.cartId}/cartlines/${parameter.cartLine.id}`, parameter.cartLine);
}

export async function updateCartLineWithResult(
    parameter: UpdateCartLineApiParameter,
): Promise<ServiceResult<CartLineModel>> {
    try {
        const cartLineModel = await updateCartLine(parameter);
        return {
            successful: true,
            result: cartLineModel,
        };
    } catch (error) {
			const apiError = error as IApiError
        if (handleApiError(apiError) && apiError.status === 400) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message || "",
            };
        }
        if (apiError?.status === 404) {
            return {
                successful: false,
                errorMessage: apiError.errorMessage,
            };
        }
        throw apiError;
    }
}

export async function removeCart(parameter: RemoveCartApiParameter): Promise<ServiceResult<void>> {
    try {
        const query = parameter.isAlternateCart !== undefined ? `?isAlternateCart=${parameter.isAlternateCart}` : "";
        const result = await del(`${cartsUrl}/${parameter.cartId}${query}`);
        return {
            successful: true,
            result,
        };
    } catch (error) {
			const apiError = error as IApiError
        if (handleApiError(apiError) && apiError.status === 400) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message || "",
            };
        }
        if (apiError?.status === 404) {
            return {
                successful: false,
                errorMessage: apiError.errorMessage,
            };
        }
        throw apiError;
    }
}

export function removeCartLine(parameter: RemoveCartLineApiParameter) {
    return del(`${cartsUrl}/${parameter.cartId}/cartlines/${parameter.cartLineId}`);
}

export async function removeCartLineWithResult(parameter: RemoveCartLineApiParameter): Promise<ServiceResult<void>> {
    try {
        const result = await removeCartLine(parameter);
        return {
            successful: true,
            result,
        };
    } catch (error) {
			const apiError = error as IApiError
        if (handleApiError(apiError) && apiError.status === 400) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message || "",
            };
        }
        if (apiError?.status === 404) {
            return {
                successful: false,
                errorMessage: apiError.errorMessage,
            };
        }
        throw apiError;
    }
}

export async function addCartPromotion(
    parameter: AddCartPromotionApiParameter,
): Promise<ServiceResult<PromotionModel>> {
    try {
        const promotionModel = await post<PromotionModel>(`${cartsUrl}/${parameter.cartId}/promotions`, {
            promotionCode: parameter.promotionCode,
        } as PromotionModel);
        return {
            successful: true,
            result: promotionModel,
        };
    } catch (error) {
			const apiError = error as IApiError
        if ("status" in apiError && apiError.status === 400 && apiError.errorJson && apiError.errorJson.message) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message || "",
            };
        }
        throw apiError;
    }
}

export async function removeCartPromotion(parameter: RemoveCartPromotionApiParameter): Promise<ServiceResult<void>> {
    try {
        const result = await del(`${cartsUrl}/${parameter.cartId}/promotions/${parameter.promotionId}`);
        return {
            successful: true,
            result,
        };
    } catch (error) {
			const apiError = error as IApiError
        if (handleApiError(apiError) && apiError.status === 400) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message || "",
            };
        }
        if (apiError?.status === 404) {
            return {
                successful: false,
                errorMessage: apiError.errorMessage || "",
            };
        }
        throw apiError;
    }
}

export async function removeCartPromotions(parameter: RemoveCartPromotionsApiParameter) {
    try {
        const result = await del(`${cartsUrl}/${parameter.cartId}/promotions`);
        return {
            successful: true,
            result,
        };
    } catch (error) {
			const apiError = error as IApiError
        if (handleApiError(apiError) && apiError.status === 400) {
            return {
                successful: false,
                errorMessage: apiError.errorJson.message,
            };
        }
        if (apiError?.status === 404) {
            return {
                successful: false,
                errorMessage: apiError.errorMessage,
            };
        }
        throw apiError;
    }
}

export function getCartRealTimeInventory(parameter: GetRealTimeCartInventoryApiParameter) {
    return post<GetRealTimeCartInventoryApiParameter, RealTimeCartInventoryModel>(
        "/api/v1/realtimecartinventory",
        parameter,
    );
}
