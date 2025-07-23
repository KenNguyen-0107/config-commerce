# Publishing Guide for @niteco/seo-nextjs

This document provides instructions for publishing the package to npm.

## Prerequisites

1. You need an npm account
2. You need to be added as a collaborator to the @niteco organization
3. You need to be logged in to npm (`npm login`)

## Files We've Set Up

The package includes the following files for npm publishing:

- **package.json**: Main package configuration
- **.npmignore**: Controls which files are excluded from the npm package
- **jest.config.js**: Configuration for Jest testing
- **jest.setup.js**: Setup file for Jest
- **.eslintrc.js**: ESLint configuration
- **scripts/publish.js**: Helper script for publishing

## Unit Tests

We've added unit tests for the core SEO components:

1. The DefaultSeo component
2. The NextSeo component
3. The Head tag building utilities

Run tests with:

```bash
npm test
```

## Publishing Process

### Manual Publishing

1. Make sure all changes are committed
2. Build the package: `npm run build`
3. Run tests: `npm test`
4. Update the version: `npm version patch|minor|major`
5. Publish: `npm publish`
6. Push changes and tags: `git push && git push --tags`

### Using the Publish Script

We've created a convenience script to handle the publishing process:

```bash
npm run publish:npm
```

This script will:

1. Run tests
2. Build the package
3. Prompt for version bump type (patch, minor, major)
4. Update package.json
5. Create a git tag
6. Publish to npm
7. Optionally push tags to remote

## Continuous Integration Considerations

For a more robust workflow, consider setting up CI/CD with GitHub Actions to:

- Run tests on every pull request
- Publish automatically on merges to main/master branch
- Generate and publish documentation

## GitHub Actions Automation

We've set up several GitHub Actions workflows to automate the release process:

### 1. Automatic Version Bumping (.github/workflows/version-bump.yml)

This workflow automatically bumps the package version when a pull request is merged to main/master.

- It determines the version bump type based on PR title:
  - Major bump (`2.0.0`) for PRs with "BREAKING CHANGE" or "!:" in the title
  - Minor bump (`1.1.0`) for PRs starting with "feat:" or "feature:"
  - Patch bump (`1.0.1`) for all other changes

Follow [Conventional Commits](https://www.conventionalcommits.org/) for your PR titles:

```
feat: add new component
fix: resolve issue with SEO rendering
chore: update dependencies
BREAKING CHANGE: refactor API
```

### 2. Automatic Publishing (.github/workflows/publish.yml)

This workflow automatically publishes new versions to npm when changes are pushed to main/master.

- It checks if the current version already exists on npm
- If it's a new version, it publishes the package
- It also creates a GitHub release with the new version

### 3. Documentation Generation (.github/workflows/docs.yml)

This workflow automatically generates API documentation and publishes it to GitHub Pages.

- It uses TypeDoc to generate documentation from JSDoc comments
- It publishes the documentation to the `gh-pages` branch
- The documentation is accessible at: `https://[your-github-username].github.io/seo-nextjs/`

## Required Secrets

For these workflows to work, you need to add the following secrets to your GitHub repository:

1. `NPM_TOKEN`: An npm access token with publish permissions
   - Create it at https://www.npmjs.com/settings/[your-username]/tokens
   - Make sure it has publish permissions
   - Add it to your repository secrets

## Local Documentation Generation

You can also generate documentation locally:

```bash
npm run docs
```

This will create a `docs` directory with the API documentation.

## Package Organization

- `src/meta/`: SEO component implementations
- `src/utils/`: Utility functions (if needed)
- `tests/`: Unit tests
- `lib/`: Built files (generated, not checked into git)

## Troubleshooting

If you encounter issues during publishing:

1. Check npm authentication: `npm whoami`
2. Verify package access: `npm access ls-collaborators @niteco/seo-nextjs`
3. Check for conflicting versions: `npm view @niteco/seo-nextjs versions`
