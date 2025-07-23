import { ComponentTypeDictionary } from "@packages/optimizely-cms-react";
import SignInCreateNewAccount from "./SignInCreateNewAccount";
import SignInExistingAccount from "./SignInExistingAccount";

const envPrefix = process.env.GRAPH_ENV || "";

export const SigninWidgetDictionary: ComponentTypeDictionary = [
	{
    type: `${envPrefix}SignInCreateNewAccount`,
    component: SignInCreateNewAccount,
	},
	{
    type: `${envPrefix}SignInExistingAccount`,
    component: SignInExistingAccount,
	},
]

export default SigninWidgetDictionary;
