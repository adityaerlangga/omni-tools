import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { InitialValuesType } from './types';

export function xmlToJson(input: string, options: InitialValuesType): string {
  if (!input.trim()) {
    return '';
  }

  const valid = XMLValidator.validate(input);
  if (valid !== true) {
    if (typeof valid === 'object' && valid.err) {
      return `Invalid XML: ${valid.err.msg} (line ${valid.err.line}, col ${valid.err.col})`;
    }
    return 'Invalid XML';
  }

  try {
    const parser = new XMLParser({
      ignoreAttributes: options.ignoreAttributes,
      attributeNamePrefix: '@_',
      allowBooleanAttributes: true
    });
    const parsed = parser.parse(input);
    const indent =
      options.indentationType === 'tab' ? '\t' : options.spacesCount;
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    return `Invalid XML: ${
      error instanceof Error ? error.message : 'Unable to parse XML'
    }`;
  }
}
