module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	plugins: ["@typescript-eslint", "react"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: "module",
	},
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
	},
	overrides: [
		{
			files: ["**/*.test.ts", "**/*.test.tsx"],
			env: {
				jest: true,
			},
		},
	],
};
