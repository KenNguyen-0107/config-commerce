// api: https://jacksonsfencing-configcommerce-d-cl.niteco.dev/api/v1/carts/current
let payload = {
    "uri": "http://b2b.local.com:30000/api/v1/carts/current",
    "cartLinesUri": "http://b2b.local.com:30000/api/v1/carts/current/cartlines",
    "id": "current",
    "trackId": "e218ae66-7789-4889-afff-b28f0092a12b",
    "status": "Cart",
    "statusDisplay": "Cart",
    "type": "Order",
    "typeDisplay": "Order",
    "orderNumber": "e0802180-fd90-4ad8-b6a6-96d82a559085",
    "erpOrderNumber": "",
    "orderDate": "2025-02-26T07:07:42.161Z",
    "userLabel": "trungvuong",
    "userRoles": "",
    "shipToLabel": "Use Billing Address",
    "notes": "this is Order Notes",
    "carrier": {
        "id": "3c925a44-cabe-43e0-9391-9f0100a15970",
        "description": "Flat Rate",
        "shipVias": [
            {
                "id": "b8779b49-3ec9-4aab-99df-08dd2ae51f47",
                "description": "Flat Fate B",
                "isDefault": false
            }
        ]
    },
    "shipVia": {
        "id": "b8779b49-3ec9-4aab-99df-08dd2ae51f47",
        "description": "Flat Fate B",
        "isDefault": false
    },
    "fulfillmentMethod": "Ship",
    "requestedPickupDate": null,
    "poNumber": "",
    "promotionCode": null,
    "initiatedByUserName": "trungvuong",
    "totalQtyOrdered": 1,
    "lineCount": 1,
    "totalCountDisplay": 1,
    "quoteRequiredCount": 0,
    "orderSubTotal": 65.75,
    "orderSubTotalDisplay": "£65.75",
    "orderSubTotalWithOutProductDiscounts": 65.75,
    "orderSubTotalWithOutProductDiscountsDisplay": "£65.75",
    "totalTax": 6.58,
    "totalTaxDisplay": "£6.58",
    "shippingAndHandling": 0,
    "shippingAndHandlingDisplay": "£0.00",
    "orderGrandTotal": 72.33,
    "orderGrandTotalDisplay": "£72.33",
    "costCodeLabel": null,
    "isAuthenticated": true,
    "isGuestOrder": false,
    "isSalesperson": false,
    "isSubscribed": false,
    "requiresPoNumber": true,
    "displayContinueShoppingLink": true,
    "canModifyOrder": true,
    "canSaveOrder": true,
    "canBypassCheckoutAddress": false,
    "canRequisition": false,
    "canRequestQuote": false,
    "canEditCostCode": false,
    "showTaxAndShipping": true,
    "showLineNotes": true,
    "showCostCode": false,
    "showNewsletterSignup": true,
    "showPoNumber": true,
    "showCreditCard": true,
    "showECheck": true,
    "showPayPal": false,
    "isAwaitingApproval": false,
    "requiresApproval": false,
    "approverReason": "",
    "hasApprover": false,
    "salespersonName": "",
    "costCodes": [],
    "warehouses": null,
    "customerOrderTaxes": [],
    "canCheckOut": true,
    "hasInsufficientInventory": false,
    "currencySymbol": "£",
    "requestedDeliveryDate": null,
    "requestedDeliveryDateDisplay": null,
    "cartNotPriced": false,
    "messages": [],
    "creditCardBillingAddress": null,
    "alsoPurchasedProducts": null,
    "requestedPickupDateDisplay": null,
    "taxFailureReason": "None",
    "failedToGetRealTimeInventory": false,
    "unassignCart": false,
    "customerVatNumber": "",
    "vmiLocationId": null,
    "additionalEmails": "",
    "defaultWarehouse": {
        "uri": null,
        "id": "be7f6bc3-00d3-4704-aef8-a60b013fa478",
        "name": "DefaultWarehouse",
        "address1": "36 rue de Raymond Poincaré",
        "address2": "",
        "city": "Nantes",
        "contactName": "Jackson Fencing",
        "countryId": "eaab0470-e310-e311-ba31-d43d7e4e88b2",
        "deactivateOn": null,
        "description": "",
        "phone": "19001009",
        "postalCode": "44300",
        "shipSite": "",
        "state": "Pays de la Loire",
        "isDefault": true,
        "alternateWarehouses": null,
        "latitude": 0,
        "longitude": 0,
        "hours": "",
        "distance": 0,
        "allowPickup": false,
        "pickupShipViaId": null,
        "properties": {}
    },
    "properties": {},
    "billToId": "b517e198-a18f-49e9-ab2f-b28e002f68bd",
    "shipToId": "b517e198-a18f-49e9-ab2f-b28e002f68bd",
    "paymentMethod": null,
    "paymentOptions": {
        "paymentMethods": [
            {
                "name": "CC",
                "description": "Credit Card",
                "isCreditCard": true,
                "isECheck": false,
                "isPaymentProfile": false,
                "cardType": null,
                "billingAddress": null,
                "isPaymentProfileExpired": false,
                "tokenScheme": null,
                "fingerprint": null
            }
        ],
        "cardTypes": [
            {
                "key": "Visa",
                "value": "VISA"
            },
            {
                "key": "Mastercard",
                "value": "MASTERCARD"
            },
            {
                "key": "American Express",
                "value": "AMERICAN EXPRESS"
            },
            {
                "key": "Discover",
                "value": "DISCOVER"
            }
        ],
        "expirationMonths": [
            {
                "key": "January",
                "value": 1
            },
            {
                "key": "February",
                "value": 2
            },
            {
                "key": "March",
                "value": 3
            },
            {
                "key": "April",
                "value": 4
            },
            {
                "key": "May",
                "value": 5
            },
            {
                "key": "June",
                "value": 6
            },
            {
                "key": "July",
                "value": 7
            },
            {
                "key": "August",
                "value": 8
            },
            {
                "key": "September",
                "value": 9
            },
            {
                "key": "October",
                "value": 10
            },
            {
                "key": "November",
                "value": 11
            },
            {
                "key": "December",
                "value": 12
            }
        ],
        "expirationYears": [
            {
                "key": 2025,
                "value": 2025
            },
            {
                "key": 2026,
                "value": 2026
            },
            {
                "key": 2027,
                "value": 2027
            },
            {
                "key": 2028,
                "value": 2028
            },
            {
                "key": 2029,
                "value": 2029
            },
            {
                "key": 2030,
                "value": 2030
            },
            {
                "key": 2031,
                "value": 2031
            },
            {
                "key": 2032,
                "value": 2032
            },
            {
                "key": 2033,
                "value": 2033
            },
            {
                "key": 2034,
                "value": 2034
            }
        ],
        "creditCard": {
            "cardType": null,
            "cardHolderName": null,
            "cardNumber": null,
            "expirationMonth": 1,
            "expirationYear": 2025,
            "securityCode": null,
            "useBillingAddress": true,
            "address1": null,
            "city": null,
            "state": null,
            "stateAbbreviation": null,
            "country": null,
            "countryAbbreviation": null,
            "postalCode": null,
            "maskedCardNumber": null,
            "browserInfo": ""
        },
        "eCheck": null,
        "canStorePaymentProfile": false,
        "storePaymentProfile": false,
        "isPayPal": false,
        "isAdyenDropIn": false,
        "payPalPayerId": null,
        "payPalToken": null,
        "payerId": null,
        "payPalPaymentUrl": null,
        "threeDs": null,
        "adyenPspReference": null
    },
    "carriers": [
        {
            "id": "3c925a44-cabe-43e0-9391-9f0100a15970",
            "description": "Flat Rate",
            "shipVias": [
                {
                    "id": "b8779b49-3ec9-4aab-99df-08dd2ae51f47",
                    "description": "Flat Fate B",
                    "isDefault": false
                }
            ]
        }
    ],
    "cartLines": [
        {
            "uri": "http://b2b.local.com:30000/api/v1/carts/current/cartlines/0a77744e-ad50-4a42-859e-b28f0092f372",
            "productUri": "/Product/field-gate?option=sc_255000",
            "id": "0a77744e-ad50-4a42-859e-b28f0092f372",
            "line": 1,
            "productId": "1f043d2b-4718-4880-9b12-b27a00ab9a03",
            "requisitionId": null,
            "smallImagePath": "http://b2b.local.com:30000/UserFiles/PLP-GardenGatesSets/255000%20-%20900mm%20wide%20Left%20hand%20hanging%20gate.jpg?width=500&height=662",
            "altText": "Wooden Field Gates",
            "productName": "",
            "manufacturerItem": "sc_255000",
            "customerName": null,
            "shortDescription": "0.90m Uni-Gate Braced For Left Hand Hanging Planed Finish",
            "erpNumber": "sc_255000",
            "unitOfMeasure": "",
            "unitOfMeasureDisplay": "",
            "unitOfMeasureDescription": "",
            "baseUnitOfMeasure": "",
            "baseUnitOfMeasureDisplay": "",
            "qtyPerBaseUnitOfMeasure": 1,
            "costCode": "",
            "notes": "",
            "qtyOrdered": 1,
            "qtyLeft": -1,
            "pricing": {
                "productId": "1f043d2b-4718-4880-9b12-b27a00ab9a03",
                "isOnSale": false,
                "requiresRealTimePrice": false,
                "additionalResults": {},
                "unitCost": 0,
                "unitCostDisplay": "",
                "unitListPrice": 65.75,
                "unitListPriceDisplay": "£65.75",
                "extendedUnitListPrice": 0,
                "extendedUnitListPriceDisplay": "£0.00",
                "unitRegularPrice": 65.75,
                "unitRegularPriceDisplay": "£65.75",
                "extendedUnitRegularPrice": 0,
                "extendedUnitRegularPriceDisplay": "£0.00",
                "unitNetPrice": 65.75,
                "unitNetPriceDisplay": "£65.75",
                "extendedUnitNetPrice": 65.75,
                "extendedUnitNetPriceDisplay": "£65.75",
                "unitOfMeasure": null,
                "vatRate": 0,
                "vatAmount": 0,
                "vatAmountDisplay": null,
                "unitListBreakPrices": [],
                "unitRegularBreakPrices": [],
                "regularPrice": 65.75,
                "regularPriceDisplay": "£65.75",
                "extendedRegularPrice": 0,
                "extendedRegularPriceDisplay": "£0.00",
                "actualPrice": 65.75,
                "actualPriceDisplay": "£65.75",
                "extendedActualPrice": 65.75,
                "extendedActualPriceDisplay": "£65.75",
                "regularBreakPrices": [],
                "actualBreakPrices": [],
                "unitListPriceWithVat": 0,
                "unitListPriceWithVatDisplay": null,
                "extendedUnitListPriceWithVat": 0,
                "extendedUnitListPriceWithVatDisplay": null,
                "unitRegularPriceWithVat": 0,
                "unitRegularPriceWithVatDisplay": "£0.00",
                "extendedUnitRegularPriceWithVat": 0,
                "extendedUnitRegularPriceWithVatDisplay": "£0.00",
                "vatMinusExtendedUnitRegularPrice": 0
            },
            "isPromotionItem": false,
            "isDiscounted": false,
            "isConfigured": false,
            "isFixedConfiguration": false,
            "quoteRequired": false,
            "breakPrices": [],
            "sectionOptions": [],
            "availability": {
                "messageType": 0,
                "message": null,
                "requiresRealTimeInventory": false
            },
            "qtyOnHand": 0,
            "canAddToCart": true,
            "isQtyAdjusted": false,
            "hasInsufficientInventory": false,
            "canBackOrder": false,
            "trackInventory": false,
            "salePriceLabel": "",
            "cantBuy": false,
            "isSubscription": false,
            "productSubscription": {
                "subscriptionAddToInitialOrder": false,
                "subscriptionAllMonths": false,
                "subscriptionApril": true,
                "subscriptionAugust": true,
                "subscriptionCyclePeriod": "",
                "subscriptionDecember": true,
                "subscriptionFebruary": true,
                "subscriptionFixedPrice": false,
                "subscriptionJanuary": true,
                "subscriptionJuly": true,
                "subscriptionJune": true,
                "subscriptionMarch": true,
                "subscriptionMay": true,
                "subscriptionNovember": true,
                "subscriptionOctober": true,
                "subscriptionPeriodsPerCycle": 0,
                "subscriptionSeptember": true,
                "subscriptionShipViaId": null,
                "subscriptionTotalCycles": 0
            },
            "isRestricted": false,
            "canAddToWishlist": true,
            "isActive": true,
            "brand": null,
            "vmiBinId": null,
            "isDiscontinued": false,
            "allowZeroPricing": false,
            "properties": {}
        }
    ],
    "billTo": {
        "id": "b517e198-a18f-49e9-ab2f-b28e002f68bd"
    },
    "shipTo": {
        "id": "b517e198-a18f-49e9-ab2f-b28e002f68bd"
    }
}