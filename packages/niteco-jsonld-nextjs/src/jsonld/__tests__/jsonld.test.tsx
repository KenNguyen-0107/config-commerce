import React from "react";
import { render, screen } from "@testing-library/react";
import { JsonLd } from "../jsonld";

describe("JsonLd component", () => {
	it("renders correctly with direct props", () => {
		render(
			<JsonLd
				type="Product"
				scriptKey="test-product"
				name="Test Product"
				description="A test product"
			/>
		);

		const script = screen.getByTestId(undefined);
		expect(script).toBeInTheDocument();
		expect(script.tagName).toBe("SCRIPT");
		expect(script.type).toBe("application/ld+json");

		const jsonContent = JSON.parse(script.innerHTML);
		expect(jsonContent["@type"]).toBe("Product");
		expect(jsonContent.name).toBe("Test Product");
		expect(jsonContent.description).toBe("A test product");
	});

	it("renders correctly with dataArray", () => {
		const testData = [
			{
				"@type": "Product",
				name: "Test Product",
				description: "A test product",
			},
		];

		render(<JsonLd type="Product" scriptKey="test-array" dataArray={testData} />);

		const script = screen.getByTestId(undefined);
		expect(script).toBeInTheDocument();

		const jsonContent = JSON.parse(script.innerHTML);
		expect(Array.isArray(jsonContent)).toBe(true);
		expect(jsonContent[0]["@type"]).toBe("Product");
		expect(jsonContent[0].name).toBe("Test Product");
	});

	it("renders with custom scriptId", () => {
		render(
			<JsonLd type="Product" scriptKey="test-id" scriptId="custom-script-id" name="Test Product" />
		);

		const script = screen.getByTestId("custom-script-id");
		expect(script).toBeInTheDocument();
		expect(script.id).toBe("custom-script-id");
	});

	it("renders with App Directory mode when useAppDir is true", () => {
		const { container } = render(
			<JsonLd type="Product" scriptKey="test-app-dir" name="Test Product" useAppDir={true} />
		);

		// In app dir mode, it shouldn't be wrapped in next/head
		expect(container.firstChild?.nodeName).toBe("SCRIPT");
	});
});
