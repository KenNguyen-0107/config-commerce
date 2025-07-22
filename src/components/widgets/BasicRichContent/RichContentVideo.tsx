"use client";
import { useIntersectionObserver } from "@/hook/useIntersectionObserver";
import { cn } from "@/lib/utils";
import React, { Ref } from "react";
import { BasicRichContentProps } from "./types";

const RichContentVideo: React.FC<BasicRichContentProps> = (props) => {
  const { __typename, Id, Content, BackgroundColor, Padding, CssClass, Section } = props;

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
  });

  return (
    <div ref={elementRef as Ref<HTMLDivElement>}>
      {isIntersecting && (
        <div
          data-component={__typename}
          data-component-id={Id}
          dangerouslySetInnerHTML={{ __html: Content || "" }}
          style={{
            backgroundColor: BackgroundColor || undefined,
            padding: Padding || undefined,
          }}
          className={cn(
            CssClass,
            "[&>iframe]:w-full [&>iframe]:h-[224px] [&>iframe]:lg:h-[340px] flex flex-col items-center text-center",
            Section === "PdpServiceCard" && "h-full [&>iframe]:max-w-full [&_span.fr-video]:h-full [&_video]:h-full [&_video]:object-cover"
          )}
        />
      )}
    </div>
  );
};

export default RichContentVideo;
