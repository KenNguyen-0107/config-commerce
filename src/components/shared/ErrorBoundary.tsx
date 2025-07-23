"use client";

import React from "react";
import Maintenance from "./Maintenance";
interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
		this.resetError = this.resetError.bind(this);
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error("Uncaught error:", error, info);
	}

	resetError() {
		this.setState({ hasError: false, error: null });
	}

	render() {
		if (this.state.hasError && this.state.error) {
			return <Maintenance />;
		}

		return this.props.children;
	}
}
