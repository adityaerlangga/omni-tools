import { load, YAMLException } from 'js-yaml';
import { InitialValuesType } from './types';

export function yamlToJson(input: string, options: InitialValuesType): string {
  if (!input.trim()) {
    return '';
  }

  try {
    const parsed = load(input);
    const indent =
      options.indentationType === 'tab' ? '\t' : options.spacesCount;
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    if (error instanceof YAMLException) {
      return `Invalid YAML: ${error.message}`;
    }
    return `Invalid YAML: ${
      error instanceof Error ? error.message : 'Unable to parse YAML'
    }`;
  }
}
