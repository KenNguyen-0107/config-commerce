"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export default function TabRatings() {
  const mock = [
    {
      tabTitle: "PRODUCT INFORMATION",
      tabId: "information",
      content: `<div className="space-y-8">
            <h1 className="text-2xl font-bold text-blue">
              HORIZONTAL TONGUE AND GROOVE FENCE PANELS
            </h1>

            <section>
              <h2 className="text-sm lg:text-lg font-bold text-blue mb-4">
                ABOUT THE PANEL
              </h2>
              <p className="text-muted leading-relaxed">
                Horizontal Tongue and Groove Effect fence panels have a
                contemporary luxury feel often chosen by garden designers. Made
                using Tongue and Groove style boards, this solid fence panel
                offers complete privacy.
              </p>
            </section>
          </div>`,
    },
    {
      tabTitle: "ITEMS TO CONSIDER",
      tabId: "consider",
      content: `<div className="space-y-8">
            <h2 className="text-sm lg:text-lg font-bold text-blue mb-4">
              ITEMS TO CONSIDER
            </h2>
            <p className="text-muted leading-relaxed">
              When considering our Horizontal Tongue and Groove Fence Panels,
              you might want to think about the following items:
            </p>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start">
                <span className="text-[#F4B223] mr-2">•</span>
                Fence post options: Standard Slotted Jakpost®, Heavy Duty
                Slotted Jakposts®, or Mi-T® Metal Post
              </li>
              <li className="flex items-start">
                <span className="text-[#F4B223] mr-2">•</span>
                Gravel board options: Standard Gravel Board or Hedgehog Friendly
                Gravel Board
              </li>
              <li className="flex items-start">
                <span className="text-[#F4B223] mr-2">•</span>
                Installation service if you need help setting up your new fence
              </li>
              <li className="flex items-start">
                <span className="text-[#F4B223] mr-2">•</span>
                Matching gates for a cohesive look
              </li>
            </ul>
          </div>`,
    },
    {
      tabTitle: "DOWNLOADS",
      tabId: "download",
      content: `<div className="space-y-8">
            <h2 className="text-sm lg:text-lg font-bold text-blue mb-4">
              DOWNLOADS
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Here are some useful documents you can download for more
              information:
            </p>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start">
                <span className="text-[#F4B223] mr-2">•</span>
                <a href="#" className="text-[--color-duck] hover:underline">
                  Product Specification Sheet (PDF)
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-[#F4B223] mr-2">•</span>
                <a href="#" className="text-[--color-duck] hover:underline">
                  Installation Guide (PDF)
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-[#F4B223] mr-2">•</span>
                <a href="#" className="text-[--color-duck] hover:underline">
                  Care and Maintenance Instructions (PDF)
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-[#F4B223] mr-2">•</span>
                <a href="#" className="text-[--color-duck] hover:underline">
                  Warranty Information (PDF)
                </a>
              </li>
            </ul>
          </div>`,
    },
  ];
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="information">
        <TabsList>
          {mock.map((item) => <TabsTrigger key={item.tabId} value={item.tabId}>{item.tabTitle}</TabsTrigger> )}
        </TabsList>
        {mock.map((item) => <TabsContent key={item.tabId} value={item.tabId}>
          <div dangerouslySetInnerHTML={{ __html: item.content }} ></div>
        </TabsContent> )}
      </Tabs>
    </div>
  );
}
