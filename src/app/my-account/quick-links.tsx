import Link from 'next/link';
import React from 'react';

const QuickLinks = () => {
	return (
		<div className="px-5 md:px-0 md:w-1/4 md:pr-6">
			<h2 className="text-blue text-3xl font-bold mb-6">QUICK LINKS</h2>
			<nav className="flex flex-col space-y-4">
				<Link href="/my-account/settings" className="text-blue">
					ACCOUNT SETTINGS
				</Link>
				<Link href="/my-account/address" className="text-blue">
					ADDRESSES
				</Link>
				<Link href="/my-account/order-history" className="text-blue">
					ORDER HISTORY
				</Link>
			</nav>
		</div>
	);
};

export default QuickLinks;