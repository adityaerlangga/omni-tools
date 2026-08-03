import { CaseType, InitialValuesType } from './types';

/** Split mixed-format identifiers into word tokens. */
export function splitWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[_\-.]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toTitle(words: string[]): string {
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function convertCase(input: string, target: CaseType): string {
  if (!input) return '';

  if (target === 'lowercase') return input.toLowerCase();
  if (target === 'uppercase') return input.toUpperCase();

  const words = splitWords(input);
  if (words.length === 0) return '';

  switch (target) {
    case 'title':
      return toTitle(words);
    case 'camel':
      return words
        .map((w, i) => {
          const lower = w.toLowerCase();
          return i === 0
            ? lower
            : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
    case 'pascal':
      return words
        .map((w) => {
          const lower = w.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
    case 'snake':
      return words.map((w) => w.toLowerCase()).join('_');
    case 'kebab':
      return words.map((w) => w.toLowerCase()).join('-');
    case 'constant':
      return words.map((w) => w.toUpperCase()).join('_');
    default:
      return input;
  }
}

export function convertText(input: string, options: InitialValuesType): string {
  return input
    .split('\n')
    .map((line) =>
      line.trim() === '' ? '' : convertCase(line, options.targetCase)
    )
    .join('\n');
}
