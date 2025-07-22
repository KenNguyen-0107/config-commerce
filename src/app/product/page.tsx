import CreateAccountForm from "./CreateAccount";
import ForgetPassword from "./ForgotPassword";
import LoginForm from "./Login";

export default function CreateAccountPage() {
  return (
    <div className="min-h-screen bg-[var(--light-gray-background)] flex items-center justify-center gap-4 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-blue)]">
              Create New Account
            </h2>
          </div>
          <CreateAccountForm />
        </div>
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-blue)]">
              Login
            </h2>
          </div>
          <LoginForm />
        </div>
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <ForgetPassword />
        </div>
    </div>
  );
}
