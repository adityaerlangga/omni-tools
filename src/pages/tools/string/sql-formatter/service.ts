import { format } from 'sql-formatter';
import { InitialValuesType } from './types';

export function formatSql(input: string, options: InitialValuesType): string {
  if (!input.trim()) {
    return '';
  }

  try {
    return format(input, {
      language: options.language,
      tabWidth: Math.max(1, options.tabWidth || 2),
      useTabs: options.useTabs,
      keywordCase: options.keywordCase
    });
  } catch (error) {
    return `Unable to format SQL: ${
      error instanceof Error ? error.message : 'Unknown error'
    }`;
  }
}
