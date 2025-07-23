"use client";
import { HreflangTags, LocalizationConfig } from "@packages/niteco-hreflang-nextjs";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const CustomHreflang = ({ data }: { data: LocalizationConfig }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const fullPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

	return <HreflangTags urlSlug={fullPath} config={data} />;
};

export default CustomHreflang;
