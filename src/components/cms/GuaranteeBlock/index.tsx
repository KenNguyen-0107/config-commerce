import InformationBanner from "@/components/common/InformationBanner";
import { ButtonVariant } from "@/components/ui/button";

export default function GuaranteeBlock({data} : any) {
  const mock = [
    {
      heading: "GUARANTEE PEACE OF MIND",
      description: "To register or find out more about our 25 year guarantee",
      ctaText: "FIND OUT MORE",
      imgSrc: "/images/3img.png",
      imgAltText: "Img alt text",
      ctaHref: "http://google.com",
    },
  ];

  const styleConfig = {
    wrapperStyle: "flex flex-col gap-4",
    ctaType: "stroke-blue" as ButtonVariant,
    ctaClass: "bg-blue text-white font-semibold leading-5 mx-auto",
    imageStyle: "w-auto max-h-[200px] mx-auto",
    headingStyle:
      "text-xl lg:text-2xl leading-[30px] text-center text-blue font-normal",
    descriptionStyle:
      "lg:text-[18px] leading-[28px] text-center text-muted font-medium font-lora",
  };

  return (
    <div className="bg-white py-10 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 lg:gap-8">
          {mock.map((data, index) => (
            <InformationBanner
              key={index}
              data={data}
              styleConfig={styleConfig}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
