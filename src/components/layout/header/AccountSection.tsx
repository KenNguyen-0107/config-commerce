import { SmartLink } from "@/components/shared/smartLink";

export function AccountSection() {
	return (
		<div className="py-6 border-t border-muted space-y-6">
			<SmartLink href="/account" className="block text-blue font-medium">
				MY ACCOUNT
			</SmartLink>
			<SmartLink href="/login" className="block text-blue font-medium">
				LOGIN OR REGISTER
			</SmartLink>
			<SmartLink
				href="/forgot-password"
				className="block text-blue font-medium"
			>
				FORGOTTEN PASSWORD
			</SmartLink>
		</div>
	);
}
