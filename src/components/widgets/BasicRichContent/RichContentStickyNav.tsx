"use client";
import { cn } from "@/lib/utils";
import React, { Ref, useEffect, useRef } from "react";
import { BasicRichContentProps } from "./types";

const RichContentStickyNav: React.FC<BasicRichContentProps> = (props) => {
  const { __typename, Id, Content, CssClass } = props;

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef) return;
    elementRef.current?.querySelectorAll("a")?.forEach((el) => {
      el.addEventListener("click", e => {
        e.preventDefault()

        const targetSelector = `[data-section=${el.href.split("#")[1]}]`
        const target = document.querySelector(targetSelector)
        if (!target) return

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      });
    })
  }, [elementRef])

  return (
    <div
      ref={elementRef as Ref<HTMLDivElement>}
      data-component={__typename}
      data-component-id={Id}
      dangerouslySetInnerHTML={{ __html: Content || "" }}
      className={cn(
        "uppercase text-white whitespace-nowrap",
        "[&_a]:py-4 [&_a]:border-b-2 [&_a]:border-transparent [&_a]:hover:border-yellow",
        CssClass,
      )}
    />
  );
};

export default RichContentStickyNav;
