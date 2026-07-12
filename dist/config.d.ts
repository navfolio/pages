import type { NavfolioPageModule, ResolvedNavfolioPageModule } from './types';
export interface NavfolioPageModuleConfig {
    modules?: NavfolioPageModule[];
}
export declare const defaultPageModules: ({
    id: string;
    enabled: boolean | undefined;
    route: string;
    nav: {
        label: string;
        href: string;
    };
    collections: string[];
    scaffold: {
        command: string;
        collection: string;
        directory: string;
        defaultExtension: "mdx";
        template: "project";
    };
} | {
    id: string;
    enabled: boolean | undefined;
    route: string;
    nav: {
        label: string;
        href: string;
    };
    collections: string[];
    scaffold: {
        command: string;
        collection: string;
        directory: string;
        defaultExtension: "md";
        fileName: (slug: string, now: Date) => string;
        template: "vibe";
    };
})[];
export declare function normalizeModuleRoute(route: string): string;
export declare function getConfiguredPageModules(config: NavfolioPageModuleConfig): NavfolioPageModule[];
export declare function getResolvedPageModules(config: NavfolioPageModuleConfig): ResolvedNavfolioPageModule[];
export declare function getResolvedPageModule(config: NavfolioPageModuleConfig, moduleId: string): ResolvedNavfolioPageModule | undefined;
export declare function getPageModuleRoute(config: NavfolioPageModuleConfig, moduleId: string): string;
export declare function isPageModuleEnabled(config: NavfolioPageModuleConfig, moduleId: string): boolean;
export declare function getResolvedPageModuleScaffolds(config: NavfolioPageModuleConfig): {
    collection: string;
    defaultExtension: import("./types").NavfolioContentExtension;
    command: string;
    directory: string;
    fileName?: (slug: string, now: Date) => string;
    template?: "article" | "project" | "vibe";
    frontmatter?: (context: import("./types").NavfolioScaffoldTemplateContext) => string;
    body?: (context: import("./types").NavfolioScaffoldTemplateContext) => string;
    moduleId: string;
}[];
//# sourceMappingURL=config.d.ts.map