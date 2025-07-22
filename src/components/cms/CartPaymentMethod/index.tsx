import Image from "next/image"

export default function CartPaymentMethod() {
  return (
    <div className="w-full bg-white px-4 py-6 lg:py-10">
      <div className="mx-auto container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Ways to Pay Section */}
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-4">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue">
                <path d="M19 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h5 className="font-bold text-blue tracking-wide">
                WAYS TO PAY
              </h5>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="https://www.jacksons-fencing.co.uk/-/media/images/logos/paypal.gif"
                alt="PayPal"
                width={82}
                height={20}
                className="object-contain"
              />
              <Image
                src="https://www.jacksons-fencing.co.uk/-/media/Images/Logos/visa.png"
                alt="Visa"
                width={82}
                height={27}
                className="object-contain"
              />
              <Image
                src="https://www.jacksons-fencing.co.uk/-/media/Images/Logos/Mastercard.png"
                alt="Mastercard"
                width={50}
                height={31}
                className="object-contain"
              />
              <Image
                src="https://www.jacksons-fencing.co.uk/-/media/jacksons/images/Logo/Globalsign.png"
                alt="Secured by Sectigo"
                width={140}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue">
              <path d="M12 22C12 22 19 18 19 12V5L12 2L5 5V12C5 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h5 className="font-bold text-blue tracking-wide">
              SECURITY YOU CAN TRUST
            </h5>
            <Image
              src="https://www.jacksons-fencing.co.uk/-/media/images/logos/globalsign.png"
              alt="Sectigo"
              width={140}
              height={32}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

