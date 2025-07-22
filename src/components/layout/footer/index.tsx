import BaseFooterV0 from "./site-footer.v0"
import BaseFooter from "./site-footer"

export default function Footer() {
	if (process.env.COMPONENT_USED === "v0") {
		return <BaseFooterV0 />
	}

	return <BaseFooter />
}