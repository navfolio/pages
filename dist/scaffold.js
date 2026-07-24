const templateVariablePattern = /{{\s*(title|slug|isoDate|date)(?:\s*\|\s*(yaml))?\s*}}/g;
export function renderScaffoldTemplate(template, context) {
    return template.replace(templateVariablePattern, (_placeholder, variable, filter) => {
        const value = context[variable];
        return filter === 'yaml' ? JSON.stringify(value) : value;
    });
}
