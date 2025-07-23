import React from "react";
import { MyAccountViewProps } from "./types";

const MyAccountView: React.FC<MyAccountViewProps> = (props) => {
	const { children } = props;

	return <div className="container mx-auto px-0 flex flex-col lg:flex-row gap-8">{children}</div>;
};

export default MyAccountView;
