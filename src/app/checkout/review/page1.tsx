"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronUp, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [billingShippingOpen, setBillingShippingOpen] = useState(false)

  return (
    <div className="bg-muted-background min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <h1 className="text-tertiary text-2xl font-bold mr-2">CHECKOUT</h1>
          {/* <span className="text-duck text-sm">STEP 2/2</span> */}
        </div>

        {/* Back button */}
        <button className="flex items-center text-tertiary mb-6">
          <ChevronLeft className="h-4 w-4" />
          <span className="uppercase text-sm font-medium">Back</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/5">
            {/* Review & Submit */}
            <h2 className="text-tertiary text-xl font-bold mb-6">REVIEW & SUBMIT</h2>

            {/* Payment Details */}
            <div className="mb-6">
              <h3 className="text-duck text-sm font-bold mb-4">PAYMENT DETAILS</h3>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="w-full md:w-1/2">
                  <label className="text-muted text-sm mb-1 block">Payment Method*</label>
                  <Select onValueChange={setPaymentMethod}>
                    <SelectTrigger className="bg-white border-secondary-background h-12 rounded-none">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="payment-card">Payment Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-1/2">
                  <label className="text-muted text-sm mb-1 block">PO Number*</label>
                  <Input className="bg-white border-secondary-background h-12 rounded-none" />
                </div>
              </div>
            </div>

            {/* Your Details - Only show when payment method is selected */}
            {paymentMethod && (
              <div className="mb-6">
                <h3 className="text-duck text-sm font-bold mb-4">YOUR DETAILS</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-muted text-sm mb-1 block">Name on Card*</label>
                    <Input className="bg-white border-secondary-background h-12 rounded-none" defaultValue="ANH NGUYEN" />
                  </div>
                  <div>
                    <label className="text-muted text-sm mb-1 block">Card Number*</label>
                    <Input className="bg-white border-secondary-background h-12 rounded-none" defaultValue="0000001000001976" />
                  </div>
                  <div>
                    <label className="text-muted text-sm mb-1 block">Card Type*</label>
                    <Select defaultValue="visa">
                      <SelectTrigger className="bg-white border-secondary-background h-12 rounded-none">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">Mastercard</SelectItem>
                        <SelectItem value="amex">American Express</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-muted text-sm mb-1 block">Expiration Month*</label>
                      <Select defaultValue="july">
                        <SelectTrigger className="bg-white border-secondary-background h-12 rounded-none">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="january">January</SelectItem>
                          <SelectItem value="february">February</SelectItem>
                          <SelectItem value="march">March</SelectItem>
                          <SelectItem value="april">April</SelectItem>
                          <SelectItem value="may">May</SelectItem>
                          <SelectItem value="june">June</SelectItem>
                          <SelectItem value="july">July</SelectItem>
                          <SelectItem value="august">August</SelectItem>
                          <SelectItem value="september">September</SelectItem>
                          <SelectItem value="october">October</SelectItem>
                          <SelectItem value="november">November</SelectItem>
                          <SelectItem value="december">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/2">
                      <label className="text-muted text-sm mb-1 block">Expiration Year*</label>
                      <Select defaultValue="2025">
                        <SelectTrigger className="bg-white border-secondary-background h-12 rounded-none">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                          <SelectItem value="2029">2029</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-muted text-sm mb-1 block">Security code*</label>
                    <Input className="bg-white border-secondary-background h-12 rounded-none" defaultValue="123" />
                  </div>
                  <button className="text-duck text-sm font-medium uppercase">
                    Locate my card's security code
                  </button>
                </div>

                {/* Billing & Shipping Information */}
                <div className="mt-6">
                  <button
                    className="w-full bg-secondary-background flex items-center justify-between p-3"
                    onClick={() => setBillingShippingOpen(!billingShippingOpen)}
                  >
                    <span className="text-tertiary text-sm font-bold">BILLING & SHIPPING INFORMATION</span>
                    {billingShippingOpen ? (
                      <ChevronUp className="h-4 w-4 text-tertiary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-tertiary" />
                    )}
                  </button>

                  {billingShippingOpen && (
                    <div className="border border-secondary-background border-t-0 p-4 bg-white">
                      <div className="flex justify-between mb-4">
                        <div>
                          <h4 className="text-duck text-xs font-bold mb-1">CARRIER</h4>
                          <p className="text-tertiary text-sm">Flat Rate</p>
                        </div>
                        <div>
                          <h4 className="text-duck text-xs font-bold mb-1">SERVICE</h4>
                          <p className="text-tertiary text-sm">Flat Rate</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-duck text-xs font-bold mb-1">SHIPPING ADDRESS</h4>
                          <button className="text-duck flex items-center text-xs">
                            <Edit2 className="h-3 w-3 mr-1" />
                            EDIT
                          </button>
                        </div>
                        <div className="text-tertiary text-sm space-y-1">
                          <p>Niteco</p>
                          <p>Address 1</p>
                          <p>London, Greater London 10000</p>
                          <p>United Kingdom</p>
                          <p>anh.nguyen12@niteco.se</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-duck text-xs font-bold mb-1">BILLING ADDRESS</h4>
                          <button className="text-duck flex items-center text-xs">
                            <Edit2 className="h-3 w-3 mr-1" />
                            EDIT
                          </button>
                        </div>
                        <div className="text-tertiary text-sm space-y-1">
                          <p>Niteco</p>
                          <p>Address 1</p>
                          <p>London, Greater London 10000</p>
                          <p>United Kingdom</p>
                          <p>anh.nguyen12@niteco.se</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Place Order Button */}
            <Button className="w-full bg-tertiary hover:bg-[#011e41] text-white rounded-none h-12 mt-6">
              PLACE ORDER
            </Button>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-tertiary text-lg font-bold">ORDER SUMMARY</h3>
                <button className="text-duck flex items-center text-xs">
                  <Edit2 className="h-3 w-3 mr-1" />
                  EDIT BASKET
                </button>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-tertiary">DISCOUNT</span>
                <span className="text-tertiary font-bold">£0.00</span>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-tertiary font-bold">TOTAL INC VAT</span>
                <span className="text-tertiary text-xl font-bold">£129.10</span>
              </div>

              {/* Product Items */}
              <div className="border-t border-secondary-background pt-4 mb-4">
                <div className="mb-6">
                  <div className="flex justify-between">
                    <h4 className="text-tertiary text-xs font-bold mb-1">
                      1.0M HIGH, LEVEL TOP ROUND PALE PALISADE PANEL (1.83M WIDE)
                    </h4>
                    <div className="text-right">
                      <p className="text-tertiary font-bold">£129.10</p>
                      <p className="text-muted text-xs">INC VAT</p>
                    </div>
                  </div>
                  <p className="text-tertiary font-bold">£129.10</p>
                  <p className="text-muted text-xs">Product Code: 223500</p>
                  <p className="text-tertiary mt-2">1</p>
                </div>

                <div className="border-t border-secondary-background pt-4 mb-4">
                  <div className="flex justify-between">
                    <h4 className="text-tertiary text-xs font-bold mb-1">
                      1.0M HIGH, LEVEL TOP ROUND PALE PALISADE PANEL (1.83M WIDE)
                    </h4>
                    <div className="text-right">
                      <p className="text-tertiary font-bold">£129.10</p>
                      <p className="text-muted text-xs">INC VAT</p>
                    </div>
                  </div>
                  <p className="text-tertiary font-bold">£129.10</p>
                  <p className="text-muted text-xs">Product Code: 223500</p>
                  <p className="text-tertiary mt-2">1</p>
                </div>
              </div>

              {/* Order Totals */}
              <div className="border-t border-secondary-background pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-tertiary">SUBTOTAL</span>
                  <span className="text-tertiary font-bold">£129.10</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-tertiary">SHIPPING FEE</span>
                  <span className="text-tertiary font-bold">£0.00</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-tertiary">DISCOUNT</span>
                  <span className="text-tertiary font-bold">£0.00</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-tertiary">TAX</span>
                  <span className="text-tertiary font-bold">£12.91</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-tertiary font-bold">TOTAL INC VAT</span>
                  <span className="text-tertiary text-xl font-bold">£129.10</span>
                </div>
              </div>
            </div>

            {/* Promotion Code */}
            <div className="bg-white p-4">
              <label className="text-muted text-sm mb-2 block">Have a Promotion Code?</label>
              <div className="flex">
                <Input className="bg-white border-secondary-background h-12 rounded-none flex-grow" />
                <Button className="bg-tertiary hover:bg-[#011e41] text-white rounded-none h-12 px-6 ml-2">
                  APPLY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

