import { cn } from "@/lib/utils"
import { FooterContainerProps } from "./types"

export default function FooterContainer(props: FooterContainerProps) {
	const { children } = props

	const gridAreasLg = `lg:[grid-template-areas:'Content_Content_Content_Content_Content_Content''LinkList1_LinkList2_LinkList3_LinkList4_Subscribe_Subscribe''RichContent_RichContent_RichContent_RichContent_RichContent_RichContent']`
	const gridAreasMd = `lg:[grid-template-areas:'Content_Content_Content''LinkList1_LinkList2_LinkList3''LinkList4_Subscribe_Subscribe''RichContent_RichContent_RichContent']`

	return (
		<div className={cn(
				"flex flex-wrap lg:grid gap-8",
				`${gridAreasMd}`,
				`${gridAreasLg}`,
		)}>
				{children}
		</div>
	)
}