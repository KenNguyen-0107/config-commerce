"use client"

import useAuthenStore from "@/store/authen-store";
import React, { lazy } from "react";
import { CommonHeaderSignInProps } from "./types";
import WelcomeText from "./WelcomeText";
import { SmartLink } from "@/components/shared/smartLink";

const LogOutButton = lazy(() => import("./LogOutButton"));

const CommonHeaderSignIn: React.FC<CommonHeaderSignInProps> = (props) => {
	const { userInfo } = useAuthenStore();

	const { Section } = props;
	if (Section == undefined) return null;

	const accountManagement = [
		{ title: "My Account", href: userInfo.userProfileId ? "/my-account" : "" },
		{
			title: "Login or Register",
			href: userInfo.userProfileId ? "" : "/login-register",
		},
		{ title: "Basket", href: "/cart" },
	];
	return (
		<div className="hidden lg:block">
			<WelcomeText userInfo={userInfo} />

			<div className="relative group z-[3]">
				<SmartLink
					href={userInfo.userProfileId ? "/my-account" : "/login-register"}
					className="font-medium text-blue flex items-center gap-2"
				>
					<div>MY ACCOUNT</div>
					<span className="arrow-down"></span>
				</SmartLink>
				<div className="group-hover:block hidden absolute w-[200px] ">
					{accountManagement.map(
						(item, index) =>
							item.href && (
								<SmartLink
									href={item.href}
									key={index}
									className="block px-5 py-3 bg-[#f8f8f8] text-blue hover:bg-gray-300"
								>
									{item.title}
								</SmartLink>
							)
					)}
					{userInfo.userProfileId && (
						<div className="px-5 py-3 bg-[#f8f8f8] text-blue hover:bg-gray-300">
							<LogOutButton />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CommonHeaderSignIn;
