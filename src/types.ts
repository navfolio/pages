export type NavfolioPageModuleId = string;

export type NavfolioPageModuleBuiltinId = 'projects' | 'vibe' | 'media';

export type NavfolioContentExtension = 'md' | 'mdx';

export interface NavfolioScaffoldTemplateContext {
  title: string;
  slug: string;
  isoDate: string;
  now: Date;
}

export interface NavfolioPageModuleNav {
  label: string;
  href: string;
}

export interface NavfolioPageModuleScaffold {
  command: string;
  collection: string;
  directory: string;
  defaultExtension?: NavfolioContentExtension;
  fileName?: (slug: string, now: Date) => string;
  template?: 'article' | 'project' | 'vibe';
  frontmatter?: (context: NavfolioScaffoldTemplateContext) => string;
  body?: (context: NavfolioScaffoldTemplateContext) => string;
}

export interface NavfolioPageModuleRoute {
  pattern?: string | ((moduleRoute: string) => string);
  entrypoint: URL;
  prerender?: boolean;
}

export interface NavfolioPageModule {
  id: NavfolioPageModuleId;
  enabled?: boolean;
  route: string;
  nav: NavfolioPageModuleNav;
  collections: string[];
  scaffold?: NavfolioPageModuleScaffold;
  routes?: NavfolioPageModuleRoute[];
}

export interface NavfolioPageModuleOptions {
  enabled?: boolean;
  route?: string;
}

export interface ResolvedNavfolioPageModule extends NavfolioPageModule {
  enabled: true;
  route: string;
  nav: NavfolioPageModuleNav;
}

export interface NavfolioPagesPlugin {
  name: '@navfolio/pages';
  enabled?: boolean;
}
