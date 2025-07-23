import { SmartLink } from "@/components/shared/smartLink";

export default function LinkListTitle({
	text,
	href,
}: {
	text?: string;
	href?: string;
}) {
	if (!text) return null;
	if (!!href) {
		return (
			<SmartLink href={href} className="block uppercase">
				<h4 className="text-blue">{text}</h4>
			</SmartLink>
		);
	}

	return <h4 className="text-blue uppercase">{text}</h4>;
}
