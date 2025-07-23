import { Button } from "@/components/ui/button";

export function FooterButtons() {
	return (
		<div className="border-t border-muted p-6 space-y-3">
			<Button className="w-full h-12" title="Fence calculator">
				FENCE CALCULATOR
			</Button>
			<Button className="w-full h-12" variant="stroke-blue" title="Compare panels">
				COMPARE PANELS
			</Button>
		</div>
	);
}
