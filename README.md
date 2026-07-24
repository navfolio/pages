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
import { mediaModule, pages, projectsModule, vibeModule } from '@navfolio/pages';

import { defineNavfolioConfig } from './src/plugins/config';

export default defineNavfolioConfig({
  plugins: [markdownPlugin(), pages()],
  modules: [
    projectsModule(),
    vibeModule({
      route: '/space',
    }),
    mediaModule({
      route: '/shelf',
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
    fileName?: (slug: string, now: Date) => string;
    template: URL;
  };
}
```

Each content-producing module owns and publishes its default Markdown template:

```ts
scaffold: {
  command: 'gallery',
  collection: 'gallery',
  directory: 'src/content/gallery',
  defaultExtension: 'md',
  template: new URL('../templates/default.md', import.meta.url),
}
```

The host maps `command` to the standard
`bun run <command>:new <filename> [output-directory]` interface. Template files
can use `{{ title }}`, `{{ slug }}`, `{{ isoDate }}`, and `{{ date }}`.
Append `| yaml` to emit a YAML-safe quoted scalar, for example
`title: {{ title | yaml }}`. `renderScaffoldTemplate()` is exported for host
scaffold runners.
