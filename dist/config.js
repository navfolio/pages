import { projectsModule } from '@navfolio/page-projects';
export const defaultPageModules = [projectsModule()];
export function normalizeModuleRoute(route) {
    const trimmed = route.trim();
    if (!trimmed) {
        throw new Error('Navfolio page module route cannot be empty.');
    }
    const withoutSlashes = trimmed.replace(/^\/+|\/+$/g, '');
    if (!withoutSlashes)
        return '/';
    return `/${withoutSlashes}`;
}
export function getConfiguredPageModules(config) {
    return config.modules ?? defaultPageModules;
}
export function getResolvedPageModules(config) {
    const modules = getConfiguredPageModules(config);
    const routeOwners = new Map();
    return modules.flatMap((module) => {
        if (module.enabled === false)
            return [];
        const route = normalizeModuleRoute(module.route);
        const existingOwner = routeOwners.get(route);
        if (existingOwner) {
            throw new Error(`Duplicate Navfolio page module route "${route}" for "${existingOwner}" and "${module.id}".`);
        }
        routeOwners.set(route, module.id);
        return [
            {
                ...module,
                enabled: true,
                route,
                nav: {
                    ...module.nav,
                    href: route,
                },
            },
        ];
    });
}
export function getResolvedPageModule(config, moduleId) {
    return getResolvedPageModules(config).find((module) => module.id === moduleId);
}
export function getPageModuleRoute(config, moduleId) {
    return getResolvedPageModule(config, moduleId)?.route ?? `/${moduleId}`;
}
export function isPageModuleEnabled(config, moduleId) {
    return getResolvedPageModule(config, moduleId) !== undefined;
}
export function getResolvedPageModuleScaffolds(config) {
    return getResolvedPageModules(config).flatMap((module) => {
        if (!module.scaffold)
            return [];
        return [
            {
                moduleId: module.id,
                ...module.scaffold,
                collection: module.scaffold.collection,
                defaultExtension: module.scaffold.defaultExtension ?? 'md',
            },
        ];
    });
}
