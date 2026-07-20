# @navfolio/pages

Unified page module entry point for Navfolio.

This package defines the public page module protocol, resolves configured
modules, and provides the page-system plugin marker. Optional page modules own
their UI and are installed separately.

`projectsModule()` remains re-exported as the starter's default page module.
Install `@navfolio/page-vibe` only when a site needs the Vibe page.

## Usage

```ts
import { markdownPlugin } from '@navfolio/plugin-markdown';
import { pages, projectsModule } from '@navfolio/pages';
import { vibeModule } from '@navfolio/page-vibe';

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
page system as installed in Navfolio's plugin list. `@navfolio/pages` exports
`projectsModule()`, `vibeModule()`, and `mediaModule()` from one entry point;
each remains optional until it appears in `modules`.

## Concepts

- **Pages package**: `@navfolio/pages`, the recommended user-facing entry point.
- **Page module package**: a concrete module package such as
  `@navfolio/page-vibe` or `@navfolio/page-media`.
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
