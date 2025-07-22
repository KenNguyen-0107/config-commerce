import { ComponentTypeDictionary } from "@packages/optimizely-cms-react"
import SignInCreateNewAccount from "./SignInCreateNewAccount"
import SignInExistingAccount from "./SignInExistingAccount"

export const SigninWidgetDictionary: ComponentTypeDictionary = [
  {
    type: "SignInCreateNewAccount",
    component: SignInCreateNewAccount
  },
  {
    type: "SignInExistingAccount",
    component: SignInExistingAccount
  },
]

export default SigninWidgetDictionary
