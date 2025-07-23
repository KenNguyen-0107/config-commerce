import { Button } from "@/components/ui/button";
import React from "react";
import { SignInCreateNewAccountProps } from "./types";

const SignInCreateNewAccount: React.FC<SignInCreateNewAccountProps> = (props) => {
	const { Settings } = props;

	return (
		<>
			{Settings?.AccountSettings?.AllowCreateAccount ? (
				<div className="pt-10 lg:pt-0 lg:pl-20 border-l-0 border-t lg:border-t-0 lg:border-l border-muted">
					<h2 className="text-blue mb-6 lg:mb-4">CREATE NEW ACCOUNT</h2>
					<p className="text-gray-700 mb-6 lg:mb-4 font-lora">
						Create an account to checkout faster, view order history, save product lists, and more!
					</p>

					<Button
						href="/login-register/create-account"
						variant="tertiary"
						className="w-full border-blue text-blue hover:text-white hover:bg-blue"
						title="Create account"
					>
						CREATE ACCOUNT
					</Button>
				</div>
			) : null}
		</>
	);
};

export default SignInCreateNewAccount;
