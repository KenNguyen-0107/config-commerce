import Icon from "@/components/shared/icons";

export function DeliveryInfo() {
  return (
    <div className="p-6 bg-light-gray-background rounded-lg space-y-2 border-l-duck border-l-4">
      <h3 className="text-2xl text-duck">DELIVERY</h3>
      <p className="font-bold font-lora">
        We aim to deliver most orders within 30 days
      </p>
      <p className="font-medium font-lora">
        Most orders will be delivered within 7-10 days. Dependent on stock
        availability this may be longer on some items. Please call us for latest
        lead time if your order is time sensitive. Delivery charges are
        calculated at checkout based on your order value and postcode.
      </p>
      <button
        className="flex items-center gap-2 font-bold font-lora"
        onClick={() => console.log("See the Jacksons Difference clicked")}
      >
        {/* <Image
          width={25}
          height={25}
          alt="icon start"
          src={"/icons/play.svg"}
          className="w-[25px] h-[25px]"
        /> */}
        <Icon iconName='play' className="hahahha" size={25} />
        See the Jacksons Difference
      </button>
    </div>
  );
}
