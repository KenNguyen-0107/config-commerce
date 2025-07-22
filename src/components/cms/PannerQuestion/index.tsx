"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "WHAT IS THE MOST POPULAR TYPE OF FENCE PANEL?",
    answer: `Timber fence panels are the most popular type of garden fencing option. Traditional styles like Featherboard are commonplace amongst gardens across the UK but as homes have become more contemporary over the last decade, modern, semi-solid, decorative panels have become more popular, like Venetian Hit and Miss.

    Sustainability has become a more important topic in recent years and products with a longer lifespan are now opted for rather than products that may only last five years or so. In the long run, this saves money by reducing frequent repairs and replacements, but also reduces the amount of treated fencing that ends up in landfill which is better for the environment.`,
  },
  {
    question: "WHAT ARE THE DIFFERENT STYLES OF FENCE PANEL?",
    answer:
      "Various styles are available including traditional Featherboard, modern Venetian, and decorative options.",
  },
  {
    question: "HOW LONG DO FENCE PANELS LAST?",
    answer:
      "The lifespan varies depending on the material and maintenance, but quality panels can last many years.",
  },
  {
    question: "WHAT SIZES ARE FENCE PANELS?",
    answer:
      "Fence panels come in various standard sizes to suit different garden requirements.",
  },
  {
    question: "DO OUR FENCE PANELS WORK WITH OTHERS CONCRETE AND METAL POSTS?",
    answer:
      "Yes, our fence panels are designed to be compatible with standard concrete and metal posts.",
  },
  {
    question: "DO I NEED TO PAINT OR STAIN FENCE PANELS?",
    answer:
      "While not always necessary, painting or staining can extend the life of wooden fence panels.",
  },
  {
    question: "ARE FENCE PANELS A FIRE RISK?",
    answer:
      "All fence panels meet safety standards and proper installation minimizes any potential risks.",
  },
];

export default function PanelQuestion() {
  return (
    <div className="bg-muted-background">
      <div className="w-full container mx-auto px-4 py-8 lg:py-10">
        <h2 className="text-blue text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-center">
          COMMON PANEL QUESTIONS
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full [&_[data-state=open]>button>svg]:rotate-180"
        >
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-muted bg-muted-background" //Updated border color here
            >
              <AccordionTrigger className="py-4 hover:no-underline [&>svg]:text-yellow">
                <span className="text-blue font-semibold text-left lg:text-xl">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="text-muted font-lora font-medium lg:text-lg whitespace-pre-line">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
