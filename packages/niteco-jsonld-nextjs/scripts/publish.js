#!/usr/bin/env node

/**
 * This script helps with the npm publishing process.
 * It performs several checks before publishing:
 * 1. Verifies that tests pass
 * 2. Builds the package
 * 3. Prompts for version bump type
 * 4. Updates package.json
 * 5. Creates a git tag
 * 6. Publishes to npm
 */

const { execSync } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Colors for console output
const colors = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
};

function log(message, color = colors.reset) {
	console.log(`${color}${message}${colors.reset}`);
}

function execCommand(command) {
	try {
		return execSync(command, { stdio: "inherit" });
	} catch (error) {
		log(`Error executing command: ${command}`, colors.red);
		process.exit(1);
	}
}

function updateVersion(bumpType) {
	log("Updating version...", colors.cyan);
	execCommand(`npm version ${bumpType} --no-git-tag-version`);

	// Read the new version
	const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));
	return packageJson.version;
}

function confirmAction(question) {
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer.toLowerCase().startsWith("y"));
		});
	});
}

async function main() {
	try {
		log("Running tests...", colors.cyan);
		execCommand("npm test");

		log("Building package...", colors.cyan);
		execCommand("npm run build");

		log("\nCurrent package version:", colors.yellow);
		execCommand("npm version --no-git-tag-version");

		log("\nWhat type of version bump would you like to make?", colors.magenta);
		log("1. patch - Bug fixes (1.0.0 -> 1.0.1)", colors.blue);
		log("2. minor - New features (1.0.0 -> 1.1.0)", colors.blue);
		log("3. major - Breaking changes (1.0.0 -> 2.0.0)", colors.blue);

		const versionChoice = await new Promise((resolve) => {
			rl.question("Enter your choice (1-3): ", (answer) => {
				resolve(answer.trim());
			});
		});

		let bumpType;
		switch (versionChoice) {
			case "1":
				bumpType = "patch";
				break;
			case "2":
				bumpType = "minor";
				break;
			case "3":
				bumpType = "major";
				break;
			default:
				log("Invalid choice. Exiting.", colors.red);
				process.exit(1);
		}

		const newVersion = updateVersion(bumpType);
		log(`\nNew version will be: ${newVersion}`, colors.green);

		const confirmPublish = await confirmAction(
			"Are you sure you want to publish this version? (y/n): "
		);
		if (!confirmPublish) {
			log("Publishing cancelled.", colors.yellow);
			process.exit(0);
		}

		// Create git tag
		log("\nCreating git commit and tag...", colors.cyan);
		execCommand("git add package.json");
		execCommand(`git commit -m "chore: bump version to ${newVersion}"`);
		execCommand(`git tag v${newVersion}`);

		// Publish to npm
		log("\nPublishing to npm...", colors.cyan);
		execCommand("npm publish");

		log(`\n✅ Successfully published version ${newVersion} to npm!`, colors.green);

		const pushTag = await confirmAction("Push git tag to remote? (y/n): ");
		if (pushTag) {
			execCommand("git push");
			execCommand("git push --tags");
			log("Successfully pushed tags to remote!", colors.green);
		}
	} catch (error) {
		log(`Error: ${error.message}`, colors.red);
		process.exit(1);
	} finally {
		rl.close();
	}
}

main();
