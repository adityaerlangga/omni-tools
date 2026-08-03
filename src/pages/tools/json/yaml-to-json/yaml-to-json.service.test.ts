import { expect, describe, it } from 'vitest';
import { yamlToJson } from './service';

describe('yaml-to-json', () => {
  it('converts YAML to pretty JSON', () => {
    const input = 'name: Ada\nage: 36\nhobbies:\n  - math\n  - code';
    const result = yamlToJson(input, {
      indentationType: 'space',
      spacesCount: 2
    });
    expect(JSON.parse(result)).toEqual({
      name: 'Ada',
      age: 36,
      hobbies: ['math', 'code']
    });
    expect(result).toContain('\n  "name"');
  });

  it('returns an error for invalid YAML', () => {
    const result = yamlToJson('name: Ada\n  bad: indent', {
      indentationType: 'space',
      spacesCount: 2
    });
    expect(result).toMatch(/Invalid YAML/i);
  });

  it('returns empty string for blank input', () => {
    expect(
      yamlToJson('   ', { indentationType: 'space', spacesCount: 2 })
    ).toBe('');
  });
});
