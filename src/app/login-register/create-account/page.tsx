import CreateAccountForm from "./CreateAccountForm";
import PasswordConditionContent from "./PasswordConditionContent";

export default async function RegisterPage() {
  return (
    <div className="bg-muted-background px-4 py-10 lg:py-20">
      <div className="container">
        <h1 className="text-blue uppercase mb-10">Create an account</h1>
      </div>
      
			<div className="container grid lg:grid-cols-2">
        <CreateAccountForm />

        <PasswordConditionContent />
      </div>
    </div>
  )
}