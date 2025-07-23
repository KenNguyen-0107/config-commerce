export const defaultCardDetail = {
    cardName: "",
    cardNumber: "",
    cardType: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
    paymentMethod: "",
    PONumber: "",
};
export const mockPayload= {
  "uri": "http://b2b.local.com:30000/api/v1/carts/current",
  "cartLinesUri": "http://b2b.local.com:30000/api/v1/carts/current/cartlines",
  "id": "current",
  "trackId": "52b9ab16-5497-449e-9fc2-b29800ab1114",
  "status": "Submitted",
  "statusDisplay": "Cart",
  "type": "Order",
  "typeDisplay": "Order",
  "orderNumber": "49edbeac-23fc-48cc-9543-13660dc1fba9",
  "erpOrderNumber": "",
  "orderDate": "2025-03-06T10:23:25.307Z",
  "userLabel": "guest",
  "userRoles": null,
  "shipToLabel": "Use Billing Address",
  "notes": "",
  "carrier": {
      "id": "3c925a44-cabe-43e0-9391-9f0100a15970",
      "description": "Flat Rate",
      "shipVias": [
          {
              "id": "d8ecec49-d924-4add-96ec-9f0100a1792e",
              "description": "Flat Rate",
              "isDefault": true
          }
      ]
  },
  "shipVia": {
      "id": "d8ecec49-d924-4add-96ec-9f0100a1792e",
      "description": "Flat Rate",
      "isDefault": true
  },
  "paymentMethod": {
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
  },
  "fulfillmentMethod": "Ship",
  "requestedPickupDate": "",
  "poNumber": "123456",
  "promotionCode": null,
  "initiatedByUserName": "8d911c5b-6649-4b80-b7ea-c8166cf66fe2",
  "totalQtyOrdered": 2,
  "lineCount": 2,
  "totalCountDisplay": 2,
  "quoteRequiredCount": 0,
  "orderSubTotal": 229.99,
  "orderSubTotalDisplay": "£229.99",
  "orderSubTotalWithOutProductDiscounts": 229.99,
  "orderSubTotalWithOutProductDiscountsDisplay": "£229.99",
  "totalTax": 23,
  "totalTaxDisplay": "£23.00",
  "shippingAndHandling": 12,
  "shippingAndHandlingDisplay": "£12.00",
  "orderGrandTotal": 264.99,
  "orderGrandTotalDisplay": "£264.99",
  "costCodeLabel": null,
  "isAuthenticated": false,
  "isGuestOrder": true,
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
          "cardType": "VISA",
          "cardHolderName": "trungvuong",
          "cardNumber": "4111111111111111",
          "expirationMonth": '12',
          "expirationYear": '2025',
          "securityCode": "123",
          "useBillingAddress": true,
          "address1": null,
          "city": null,
          "state": null,
          "stateAbbreviation": null,
          "country": null,
          "countryAbbreviation": null,
          "postalCode": null,
          "maskedCardNumber": "",
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
  "costCodes": [],
  "carriers": [
      {
          "id": "3c925a44-cabe-43e0-9391-9f0100a15970",
          "description": "Flat Rate",
          "shipVias": [
              {
                  "id": "d8ecec49-d924-4add-96ec-9f0100a1792e",
                  "description": "Flat Rate",
                  "isDefault": true
              }
          ]
      }
  ],
  "warehouses": null,
  "cartLines": [
      {
          "uri": "http://b2b.local.com:30000/api/v1/carts/current/cartlines/d7be8be5-b256-4951-8148-b29800ab1125",
          "productUri": "/product/BBA11MB",
          "id": "d7be8be5-b256-4951-8148-b29800ab1125",
          "line": 1,
          "productId": "56f3ac6f-64d1-4348-b8fb-9cb6011d65d9",
          "requisitionId": null,
          "smallImagePath": "http://b2b.local.com:30000/UserFiles/Product%20images/Jacksons-No-Image-Image-Large.gif?width=500&height=300",
          "altText": "Boarding Boot, Gray",
          "productName": "BBA11MB",
          "manufacturerItem": "",
          "customerName": null,
          "shortDescription": "Boarding Boot, Gray",
          "erpNumber": "BBA11MB",
          "unitOfMeasure": "EA",
          "unitOfMeasureDisplay": "EA",
          "unitOfMeasureDescription": "",
          "baseUnitOfMeasure": "EA",
          "baseUnitOfMeasureDisplay": "EA",
          "qtyPerBaseUnitOfMeasure": 1,
          "costCode": "",
          "notes": "",
          "qtyOrdered": 1,
          "qtyLeft": 6,
          "pricing": {
              "productId": "56f3ac6f-64d1-4348-b8fb-9cb6011d65d9",
              "isOnSale": false,
              "requiresRealTimePrice": false,
              "additionalResults": {},
              "unitCost": 0,
              "unitCostDisplay": "",
              "unitListPrice": 100,
              "unitListPriceDisplay": "£100.00",
              "extendedUnitListPrice": 0,
              "extendedUnitListPriceDisplay": "£0.00",
              "unitRegularPrice": 100,
              "unitRegularPriceDisplay": "£100.00",
              "extendedUnitRegularPrice": 0,
              "extendedUnitRegularPriceDisplay": "£0.00",
              "unitNetPrice": 100,
              "unitNetPriceDisplay": "£100.00",
              "extendedUnitNetPrice": 100,
              "extendedUnitNetPriceDisplay": "£100.00",
              "unitOfMeasure": null,
              "vatRate": 0,
              "vatAmount": 0,
              "vatAmountDisplay": null,
              "unitListBreakPrices": [],
              "unitRegularBreakPrices": [],
              "regularPrice": 100,
              "regularPriceDisplay": "£100.00",
              "extendedRegularPrice": 0,
              "extendedRegularPriceDisplay": "£0.00",
              "actualPrice": 100,
              "actualPriceDisplay": "£100.00",
              "extendedActualPrice": 100,
              "extendedActualPriceDisplay": "£100.00",
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
              "messageType": 1,
              "message": "In Stock",
              "requiresRealTimeInventory": false
          },
          "qtyOnHand": 7,
          "canAddToCart": true,
          "isQtyAdjusted": false,
          "hasInsufficientInventory": false,
          "canBackOrder": false,
          "trackInventory": true,
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
      },
      {
          "uri": "http://b2b.local.com:30000/api/v1/carts/current/cartlines/af58c8e2-f932-4fb3-bd7b-b29800ab1256",
          "productUri": "/product/BBA10WB",
          "id": "af58c8e2-f932-4fb3-bd7b-b29800ab1256",
          "line": 2,
          "productId": "502b325d-55c6-4c27-a518-9cb6011d657f",
          "requisitionId": null,
          "smallImagePath": "http://b2b.local.com:30000/UserFiles/Product%20images/Jacksons-No-Image-Image-Large.gif?width=500&height=300",
          "altText": "Boarding Boot, Black",
          "productName": "BBA10WB",
          "manufacturerItem": "",
          "customerName": null,
          "shortDescription": "Boarding Boot, Black",
          "erpNumber": "BBA10WB",
          "unitOfMeasure": "EA",
          "unitOfMeasureDisplay": "EA",
          "unitOfMeasureDescription": "",
          "baseUnitOfMeasure": "EA",
          "baseUnitOfMeasureDisplay": "EA",
          "qtyPerBaseUnitOfMeasure": 1,
          "costCode": "",
          "notes": "",
          "qtyOrdered": 1,
          "qtyLeft": 98,
          "pricing": {
              "productId": "502b325d-55c6-4c27-a518-9cb6011d657f",
              "isOnSale": false,
              "requiresRealTimePrice": false,
              "additionalResults": {},
              "unitCost": 0,
              "unitCostDisplay": "",
              "unitListPrice": 129.99,
              "unitListPriceDisplay": "£129.99",
              "extendedUnitListPrice": 0,
              "extendedUnitListPriceDisplay": "£0.00",
              "unitRegularPrice": 129.99,
              "unitRegularPriceDisplay": "£129.99",
              "extendedUnitRegularPrice": 0,
              "extendedUnitRegularPriceDisplay": "£0.00",
              "unitNetPrice": 129.99,
              "unitNetPriceDisplay": "£129.99",
              "extendedUnitNetPrice": 129.99,
              "extendedUnitNetPriceDisplay": "£129.99",
              "unitOfMeasure": null,
              "vatRate": 0,
              "vatAmount": 0,
              "vatAmountDisplay": null,
              "unitListBreakPrices": [],
              "unitRegularBreakPrices": [],
              "regularPrice": 129.99,
              "regularPriceDisplay": "£129.99",
              "extendedRegularPrice": 0,
              "extendedRegularPriceDisplay": "£0.00",
              "actualPrice": 129.99,
              "actualPriceDisplay": "£129.99",
              "extendedActualPrice": 129.99,
              "extendedActualPriceDisplay": "£129.99",
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
              "messageType": 1,
              "message": "In Stock",
              "requiresRealTimeInventory": false
          },
          "qtyOnHand": 99,
          "canAddToCart": true,
          "isQtyAdjusted": false,
          "hasInsufficientInventory": false,
          "canBackOrder": false,
          "trackInventory": true,
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
  "customerOrderTaxes": [],
  "canCheckOut": true,
  "hasInsufficientInventory": false,
  "currencySymbol": "£",
  "requestedDeliveryDate": "",
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
      "address1": "Kent  TN25 6BN",
      "address2": "",
      "city": "Ashford",
      "contactName": "Jackson Fencing",
      "countryId": "89ac0470-e310-e311-ba31-d43d7e4e88b2",
      "deactivateOn": null,
      "description": "",
      "phone": "19001009",
      "postalCode": "TN25 6BN",
      "shipSite": "",
      "state": "Stowting Common",
      "isDefault": true,
      "alternateWarehouses": null,
      "latitude": 0,
      "longitude": 0,
      "hours": "",
      "distance": 0,
      "allowPickup": false,
      "pickupShipViaId": "d8ecec49-d924-4add-96ec-9f0100a1792e",
      "properties": {}
  },
  "properties": {},
  "billToId": "1ddc7f14-0b67-4c91-9f11-b29800ab39b7",
  "shipToId": "1ddc7f14-0b67-4c91-9f11-b29800ab39b7",
  "billTo": {
      "id": "1ddc7f14-0b67-4c91-9f11-b29800ab39b7"
  },
  "shipTo": {
      "id": "1ddc7f14-0b67-4c91-9f11-b29800ab39b7"
  }
}