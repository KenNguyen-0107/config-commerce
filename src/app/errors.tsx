"use client";

import React, { useEffect } from "react";

type ErrorProps = {
	error: Error;
	reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex items-center justify-center">
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-8 mt-8 text-blue">Oops! Something went wrong.</h1>
			</div>
		</div>
	);
}
