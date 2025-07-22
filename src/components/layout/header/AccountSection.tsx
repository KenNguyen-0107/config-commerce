import Link from "next/link"

export function AccountSection() {
  return (
    <div className="py-6 border-t border-muted space-y-6">
      <Link href="/account" className="block text-blue font-medium">
        MY ACCOUNT
      </Link>
      <Link href="/login" className="block text-blue font-medium">
        LOGIN OR REGISTER
      </Link>
      <Link href="/forgot-password" className="block text-blue font-medium">
        FORGOTTEN PASSWORD
      </Link>
    </div>
  )
}

