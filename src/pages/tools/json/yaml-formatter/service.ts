import { dump, load, YAMLException } from 'js-yaml';
import { InitialValuesType } from './types';

export function formatYaml(input: string, options: InitialValuesType): string {
  if (!input.trim()) {
    return '';
  }

  try {
    const parsed = load(input);
    return dump(parsed, {
      indent: Math.max(1, options.indent || 2),
      lineWidth: -1,
      noRefs: true,
      sortKeys: options.sortKeys
    }).trimEnd();
  } catch (error) {
    if (error instanceof YAMLException) {
      return `Invalid YAML: ${error.message}`;
    }
    return `Invalid YAML: ${
      error instanceof Error ? error.message : 'Unable to parse YAML'
    }`;
  }
}
