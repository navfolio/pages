import type {
  NavfolioScaffoldTemplateContext,
  NavfolioScaffoldTemplateVariable,
} from './types';

const templateVariablePattern =
  /{{\s*(title|slug|isoDate|date)(?:\s*\|\s*(yaml))?\s*}}/g;

export function renderScaffoldTemplate(
  template: string,
  context: NavfolioScaffoldTemplateContext,
): string {
  return template.replace(
    templateVariablePattern,
    (
      _placeholder,
      variable: NavfolioScaffoldTemplateVariable,
      filter: 'yaml' | undefined,
    ) => {
      const value = context[variable];

      return filter === 'yaml' ? JSON.stringify(value) : value;
    },
  );
}
