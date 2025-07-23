import React from "react";
import { BasicQuestionAnswersProps } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BasicQuestionAnswers: React.FC<BasicQuestionAnswersProps> = (props) => {
  const { Title } = props;
  const listQuestion = props.QuestionAnswersContainer?.QuestionAnswers;
  if (!listQuestion || listQuestion.length < 0) return null;

  return (
		<div className="bg-muted-background">
			<div className="container mx-auto py-8 lg:py-10 px-4 lg:px-0">
				<h2 className="text-blue text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-center">
					{Title || "COMMON PANEL QUESTIONS"}
				</h2>
				<Accordion
					type="single"
					collapsible
					className="w-full [&_[data-state=open]>button>svg]:rotate-180"
				>
					{listQuestion.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="border-b border-muted bg-muted-background" //Updated border color here
						>
							<AccordionTrigger className="py-4 hover:no-underline [&>svg]:text-yellow">
								<span
									className="text-blue text-left text-md lg:text-xl uppercase"
									dangerouslySetInnerHTML={{ __html: faq?.Question || "" }}
								></span>
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<div
									className="text-muted font-lora font-medium lg:text-lg whitespace-pre-line"
									dangerouslySetInnerHTML={{ __html: faq?.Answer || "" }}
								></div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	);
};

export default BasicQuestionAnswers;
