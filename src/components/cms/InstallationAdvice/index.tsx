import InformationBanner from "@/components/common/InformationBanner";
import { ButtonVariant } from "@/components/ui/button";

export default function InstallationAdvice() {
  const mock = [
    {
      heading: "FREQUENTLY ASKED QUESTIONS",
      description:
        "Find answers in our FAQ library.",
      ctaText: "FIND OUT MORE",
      imgSrc: '/images/install-question.png',
      imgAltText: "Img alt text",
      ctaHref: 'http://google.com'
    },
    {
      heading: "INSTALLATION AND ADVICE",
      description: "Even the finest fences are only as good as their installation",
      ctaText: "FIND OUT MORE",
      imgSrc: '/images/install-advice.png',
      imgAltText: "Img alt text",
      ctaHref: 'http://google.com'
    },
  ];

  const styleConfig = {
    wrapperStyle: 'bg-blue space-y-10 lg:space-y-8 p-10',
    ctaType: 'secondary' as ButtonVariant,
    ctaClass: '',
    imageStyle: 'w-16 h-16 mb-6 mx-auto',
    headingStyle: 'text-white text-xl lg:text-2xl uppercase font-bold mb-4',
    descriptionStyle: 'text-white text-base lg:text-lg mb-8',
  }

  return (
    <div className="w-full px-4 py-12 lg:py-16 bg-muted-background">
      <div className="mx-auto max-w-7xl text-center">
        <h3 className="text-blue lg:text-xl uppercase tracking-wide mb-2">
          INSTALLATION & ADVICE
        </h3>
        <h2 className="text-blue text-2xl lg:text-4xl uppercase font-bold mb-4">
          INSTALLATION & ADVICE
        </h2>
        <p className="text-muted text-base lg:text-lg max-w-3xl mx-auto mb-12">
          All aspects of the installation covered in accordance with Jacksons
          instructions, best practices and our Approved Installer scheme.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {mock.map((data, index) => (
            <InformationBanner key={index} data={data} styleConfig={styleConfig}/>
          ))}
        </div>
      </div>
    </div>
  );
}
