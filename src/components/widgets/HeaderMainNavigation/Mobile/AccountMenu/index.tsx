"use client";

import { SmartLink } from "@/components/shared/smartLink";
import LogOutButton from "@/components/widgets/CommonHeaderSignIn/LogOutButton";
import useAuthenStore from "@/store/authen-store";
import { Fragment } from "react";

const AccountMenuMobile = () => {
	const { userInfo } = useAuthenStore();

	const accountManagement = [
		{ title: "My Account", href: userInfo.userProfileId ? "/my-account" : "" },
		{
			title: "Login or Register",
			href: userInfo.userProfileId ? "" : "/login-register",
		},
	];
	return (
		<>
			<div className="flex flex-col uppercase border-t border-b border-[#8C8B90]">
				{accountManagement.map((item, index) => (
					<Fragment key={index}>
						{item.href && (
							<SmartLink
								href={item.href}
								className="block pl-6 pr-4 py-3 text-blue hover:bg-gray-300"
							>
								{item.title}
							</SmartLink>
						)}
					</Fragment>
				))}

				{userInfo.userProfileId && (
					<div className="px-5 py-3 text-blue hover:bg-gray-300">
						<LogOutButton />
					</div>
				)}
			</div>
			<div className="pl-6 pr-4 py-3">
				<p className="text-muted">Our other sites:</p>
				<h6 className="text-base text-blue uppercase flex justify-between">
					<span>COMMERCIAL & HIGH SECURITY</span>
					<span>|</span>
					<span>FRANCE</span>
				</h6>
			</div>
		</>
	);
};

export default AccountMenuMobile;
