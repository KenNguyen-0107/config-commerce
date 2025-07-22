'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PenLine } from 'lucide-react'

export default function CheckoutConfirmOrder() {
  const [formData, setFormData] = useState({
    purchaseOrder: '',
    specialInstructions: '',
    acceptLargeDelivery: false,
    acceptSMS: false,
    acceptInstallation: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-blue text-2xl font-bold">CHECKOUT</h1>
          </div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jacksons_Fencing-cl2b0K3vxuR7yuvYSEyNPd5bxQ4STs.png"
            alt="Secured by Sectigo"
            width={100}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-blue text-2xl font-bold mb-8">CONFIRM ORDER</h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[#186684] text-sm font-semibold block">PURCHASE ORDER NUMBER</label>
                  <p className="text-muted text-sm">Add a PO number to the invoice (not required)</p>
                  <Input 
                    placeholder="Purchase order number"
                    value={formData.purchaseOrder}
                    onChange={(e) => setFormData({...formData, purchaseOrder: e.target.value})}
                    className="bg-white border border-[#E5E5E5] rounded-none h-12 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#186684] text-sm font-semibold block">SPECIAL INSTRUCTIONS</label>
                  <p className="text-muted text-sm">
                    Please enter any special instructions for our delivery drivers. Please bear in mind that your delivery will be made by an articulated lorry. Please state here if a small lorry is required
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="largeDelivery"
                        checked={formData.acceptLargeDelivery}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, acceptLargeDelivery: checked as boolean})}
                        className="rounded-none border-[#E5E5E5] w-5 h-5 mt-0.5"
                      />
                      <label htmlFor="largeDelivery" className="text-blue text-sm leading-relaxed">
                        I am happy to accept delivery on Large Articulated Lorry
                      </label>
                    </div>
                    <Textarea 
                      placeholder="Please state here if a small lorry is required"
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                      className="bg-white border border-[#E5E5E5] rounded-none min-h-[120px] px-4 py-3"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[#186684] text-sm font-semibold">MOBILE NUMBER</label>
                    {/* <button type="button" className="text-[#186684] text-sm flex items-center gap-1">
                      <PenLine className="h-4 w-4" />
                      EDIT BASKET
                    </button> */}
                  </div>
                  <p className="text-muted text-sm">
                    Please confirm your mobile phone number as we will always try to notify you by SMS text message.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="smsNotifications"
                        checked={formData.acceptSMS}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, acceptSMS: checked as boolean})}
                        className="rounded-none border-[#E5E5E5] w-5 h-5 mt-0.5"
                      />
                      <label htmlFor="smsNotifications" className="text-blue text-sm leading-relaxed">
                        I am happy to receive delivery notifications via SMS from Jacksons*
                      </label>
                    </div>
                    <p className="text-muted text-xs">*We only use SMS for delivery notifications</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-blue text-sm">I confirm these personal details and addresses are correct</p>
                  <Button 
                    type="submit"
                    className="w-full bg-[#283270] hover:bg-[#283270]/90 text-white font-semibold py-4 rounded-none"
                  >
                    CHECKOUT
                  </Button>
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="installationService"
                      checked={formData.acceptInstallation}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, acceptInstallation: checked as boolean})}
                      className="rounded-none border-[#E5E5E5] w-5 h-5 mt-0.5"
                    />
                    <label htmlFor="installationService" className="text-blue text-sm leading-relaxed">
                      I would like to be contacted regarding Jacksons Fencing's approved installation service.
                    </label>
                  </div>
                  <Button 
                    type="button"
                    variant="emphasize" 
                    className="text-[#186684] p-0 h-auto font-medium hover:no-underline"
                  >
                    REQUEST A QUOTE?
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-white p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-blue text-xl font-bold">ORDER SUMMARY</h2>
              <button type="button" className="text-[#186684] text-sm flex items-center gap-1">
                <PenLine className="h-4 w-4" />
                EDIT BASKET
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between text-blue font-bold">
                <span>TOTAL INC VAT</span>
                <span>£129.10</span>
              </div>

              {[1, 2].map((item) => (
                <div key={item} className="space-y-2 pb-4">
                  <div className="flex justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-blue font-semibold text-sm">
                        1.0M HIGH, LEVEL TOP ROUND PALE PALISADE PANEL (1.83M WIDE)
                      </h3>
                      <p className="text-blue font-semibold">£129.10</p>
                      <p className="text-muted text-sm">Product Code: 223500</p>
                    </div>
                    <span className="text-blue font-medium shrink-0">£129.10</span>
                  </div>
                  <div className="text-muted text-sm text-right">EXC VAT</div>
                  <div className="text-blue">1</div>
                </div>
              ))}

              <div className="space-y-3 pt-6 border-t border-[#F5F5F5]">
                <div className="flex justify-between">
                  <span className="text-blue">SUBTOTAL</span>
                  <span className="text-blue">£129.10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue">VOUCHER</span>
                  <span className="text-blue">£0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue">TOTAL EXC VAT</span>
                  <span className="text-blue">£129.10</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-blue">TOTAL INC VAT</span>
                  <span className="text-blue">£129.10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

