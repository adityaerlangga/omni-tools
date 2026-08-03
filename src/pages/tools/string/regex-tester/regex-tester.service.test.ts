import { expect, describe, it } from 'vitest';
import { testRegex } from './service';

const base = {
  pattern: '\\d+',
  flagG: true,
  flagI: false,
  flagM: false,
  replacement: '#',
  showReplacement: false
};

describe('regex-tester', () => {
  it('lists all global matches', () => {
    const result = testRegex('a1 b22 c333', base);
    expect(result).toContain('Matches: 3');
    expect(result).toContain('"1" at index 1');
    expect(result).toContain('"22" at index 4');
    expect(result).toContain('"333" at index 8');
  });

  it('supports case-insensitive flag', () => {
    const result = testRegex('Hello HELLO', {
      ...base,
      pattern: 'hello',
      flagG: true,
      flagI: true
    });
    expect(result).toContain('Matches: 2');
  });

  it('shows replacement when enabled', () => {
    const result = testRegex('a1 b22', {
      ...base,
      showReplacement: true,
      replacement: 'X'
    });
    expect(result).toContain('Replacement result:');
    expect(result).toContain('aX bX');
  });

  it('reports invalid patterns', () => {
    expect(testRegex('abc', { ...base, pattern: '(' })).toMatch(
      /Invalid regular expression/
    );
  });

  it('prompts when pattern is empty', () => {
    expect(testRegex('abc', { ...base, pattern: '' })).toMatch(
      /Enter a regular expression/
    );
  });
});
