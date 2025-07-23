module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src", "<rootDir>/tests"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.stories.{ts,tsx}",
		"!src/**/*.test.{ts,tsx}",
	],
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				isolatedModules: true,
			},
		],
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testPathIgnorePatterns: ["<rootDir>/node_modules/"],
	testMatch: ["**/*.test.(ts|tsx)"],
	verbose: true,
};
