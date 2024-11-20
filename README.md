# kanban

## Getting Started

Recommended to use [pnpm](https://pnpm.io/) as the package manager.

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tools and Technologies

### Core

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### UI and Styling

- [Class Variance Authority](https://cva.style/docs) - For creating UI component variants
- [Tailwind Merge](https://github.com/dcastil/tailwind-merge) - For merging Tailwind CSS classes
- [clsx](https://github.com/lukeed/clsx) - For constructing className strings
- [Autoprefixer](https://github.com/postcss/autoprefixer) - For adding vendor prefixes to CSS
- [Next Themes](https://github.com/pacocoursey/next-themes) - For dark/light theme switching
- [Nextjs Toploader](https://github.com/TheSGJ/nextjs-toploader) - For page loading progress bar

### Code Quality

- [ESLint](https://eslint.org/) - For code linting
- [Prettier](https://prettier.io/) - For code formatting
- [Husky](https://typicode.github.io/husky/) - For Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - For running linters on staged files

### Tailwind Plugins

- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - For styling prose content
- [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) - For styling form elements
- [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries) - For container query support

### ESLint Plugins

- [eslint-plugin-check-file](https://github.com/DukeLuo/eslint-plugin-check-file)
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)

### Directory Structure Explanation

- **`app/`**: Contains Next.js 13+ app router pages and layouts

  - Pages are organized by route segments
  - Each page can have its own loading, error, and layout components

- **`components/`**: Reusable components organized by type

  - `containers/`: Wrapper components
  - `icons/`: Icon components
  - `navigation/`: Navigation components like navbar and drawer
  - `theme/`: Theme-related components (theme switcher, provider)
  - `ui/`: Base UI components (buttons, inputs, etc.)

- **`features/`**: Feature-specific components

  - Components are grouped by feature/domain
  - Each feature can have its own components, hooks, and utils
  - Examples: `authentication`, `blog`, `dashboard`, `home`, `pricing`, `settings`

- **`shared/`**: Shared configurations and constants

  - `config/`: Application-wide configuration files
  - Contains site config, metadata, and routes

- **`styles/`**: Global styles and Tailwind CSS configurations

  - Global styles
  - Tailwind component and utility classes

- **`templates/`**: Page templates

  - Layout templates for different pages
  - Compose components for complete pages

- **`utils/`**: Utility functions and helpers
  - Common utility functions

### Key Files

- `tailwind.config.ts`: Tailwind CSS configuration
- `eslint.config.js`: ESLint configuration
- `.prettierrc`: Prettier configuration
- `tsconfig.json`: TypeScript configuration
