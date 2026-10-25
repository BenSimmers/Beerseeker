# Beer Seeker

The Beer Seeker promotional website, built with Next.js.

## Development

```sh
npm ci
npm run dev
```

## Code quality

ESLint checks Next.js, React, and TypeScript code. Prettier formats source files,
styles, and configuration, with conflicting ESLint formatting rules disabled.

```sh
npm run lint          # Check for lint errors and warnings
npm run lint:fix      # Apply automatic lint fixes
npm run format        # Format the project
npm run format:check  # Check formatting without changing files
npm run build        # Build for production
```

Generated files, dependencies, and build output are excluded from formatting.
