import { Button } from "@/components/ui/button"

export function FooterButtons() {
  return (
    <div className="border-t border-muted p-6 space-y-3">
      <Button className="w-full h-12">
        FENCE CALCULATOR
      </Button>
      <Button className="w-full h-12" variant="stroke-blue">
        COMPARE PANELS
      </Button>
    </div>
  )
}

