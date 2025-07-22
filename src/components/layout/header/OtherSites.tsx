import Link from "next/link"

export function OtherSites() {
  return (
    <div className="py-6 border-t border-muted">
      <p className="text-muted mb-4">Our other sites:</p>
      <div className="space-y-4">
        <Link href="/commercial" className="block text-blue text-base font-medium">
          COMMERCIAL & HIGH SECURITY
        </Link>
        <Link href="/france" className="block text-blue text-base font-medium">
          FRANCE
        </Link>
      </div>
    </div>
  )
}

