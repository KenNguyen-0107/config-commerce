import NavControl from "@/components/layout/header/NavPrimary/NavControl";
import NavIconCta from "@/components/layout/header/NavPrimary/NavIconCta";
import React from "react";
import SearchForm from "./SearchForm";
import { HeaderSearchInputProps } from "./types";

const HeaderSearch: React.FC<HeaderSearchInputProps> = ({ Section }) => {
	if (!Section) return null;

	return (
		<>
			<NavControl />
			<SearchForm />
			<NavIconCta />
		</>
	);
};

export default HeaderSearch;
