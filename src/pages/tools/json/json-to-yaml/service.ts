import { dump } from 'js-yaml';
import { InitialValuesType } from './types';

export function jsonToYaml(input: string, options: InitialValuesType): string {
  if (!input.trim()) {
    return '';
  }

  try {
    const parsed = JSON.parse(input);
    return dump(parsed, {
      indent: Math.max(1, options.indent || 2),
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    }).trimEnd();
  } catch (error) {
    return `Invalid JSON: ${
      error instanceof Error ? error.message : 'Unable to parse JSON'
    }`;
  }
}
