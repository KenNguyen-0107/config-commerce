import Link from "next/link";

export default function LinkListTitle({text, href} : {
	text?: string,
	href?: string
}) {
	if (!text) return null
	if (!!href) {
		return (
			<Link href={href} className="block uppercase">
				<h4 className="text-blue">{text}</h4>
			</Link>
		);
	}

	return <h4 className="text-blue uppercase">{text}</h4>
}