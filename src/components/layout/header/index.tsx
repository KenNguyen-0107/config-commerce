import { SiteHeader } from "./site-header"
// import { SiteHeader } from "./header"
import { SiteHeaderV0 } from "./site-header-v0"

export default function Header() {
	if (process.env.COMPONENT_USED === "v0") {
		return <SiteHeaderV0 />
	}

	return <SiteHeader />
}