# @navfolio/pages

Unified page module entry point for Navfolio.

This package defines the public page module protocol and re-exports Navfolio's
built-in page modules:

- `projectsModule()` from `@navfolio/page-projects`
- `vibeModule()` from `@navfolio/page-vibe`

## Usage

```ts
import { markdownPlugin } from '@navfolio/plugin-markdown';
import { pages, projectsModule, vibeModule } from '@navfolio/pages';

import { defineNavfolioConfig } from './src/plugins/config';

export default defineNavfolioConfig({
  plugins: [markdownPlugin(), pages()],
  modules: [
    projectsModule(),
    vibeModule({
      route: '/space',
    }),
  ],
});
```

`modules` controls which page capabilities are enabled. `pages()` marks the
page system as installed in Navfolio's plugin list.

## Concepts

- **Pages package**: `@navfolio/pages`, the recommended user-facing entry point.
- **Page module package**: a concrete module package such as
  `@navfolio/page-vibe`.
- **Page module**: a configured module object such as `vibeModule()`.

## Module Shape

```ts
export interface NavfolioPageModule {
  id: string;
  enabled?: boolean;
  route: string;
  nav: {
    label: string;
    href: string;
  };
  collections: string[];
  scaffold?: {
    command: string;
    collection: string;
    directory: string;
    defaultExtension?: 'md' | 'mdx';
    template?: 'article' | 'project' | 'vibe';
  };
}
```
