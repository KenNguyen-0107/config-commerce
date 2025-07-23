import toJson from "../toJson";

describe("toJson utility", () => {
	it("converts an object to JSON with correct @type", () => {
		const result = toJson("Product", { name: "Test Product" });

		expect(result).toHaveProperty("__html");

		const jsonData = JSON.parse(result.__html);
		expect(jsonData).toEqual({
			"@context": "https://schema.org",
			"@type": "Product",
			name: "Test Product",
		});
	});

	it("handles array input correctly", () => {
		const dataArray = [
			{ "@type": "Product", name: "Product 1" },
			{ "@type": "Product", name: "Product 2" },
		];

		const result = toJson("Product", dataArray);

		expect(result).toHaveProperty("__html");

		const jsonData = JSON.parse(result.__html);
		expect(Array.isArray(jsonData)).toBe(true);
		expect(jsonData).toHaveLength(2);
		expect(jsonData[0].name).toBe("Product 1");
		expect(jsonData[1].name).toBe("Product 2");
	});

	it("adds @context to each array item if not present", () => {
		const dataArray = [
			{ "@type": "Product", name: "Product 1" },
			{ "@type": "Product", name: "Product 2", "@context": "custom-context" },
		];

		const result = toJson("Product", dataArray);
		const jsonData = JSON.parse(result.__html);

		expect(jsonData[0]["@context"]).toBe("https://schema.org");
		expect(jsonData[1]["@context"]).toBe("custom-context"); // Preserves existing @context
	});
});
