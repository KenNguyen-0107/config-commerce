import { SmartLink } from "@/components/shared/smartLink";

export function OtherSites() {
	return (
		<div className="py-6 border-t border-muted">
			<p className="text-muted mb-4">Our other sites:</p>
			<div className="space-y-4">
				<SmartLink
					href="/commercial"
					className="block text-blue text-base font-medium"
				>
					COMMERCIAL & HIGH SECURITY
				</SmartLink>
				<SmartLink
					href="/france"
					className="block text-blue text-base font-medium"
				>
					FRANCE
				</SmartLink>
			</div>
		</div>
	);
}
