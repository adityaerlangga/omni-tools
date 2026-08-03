import { expect, describe, it } from 'vitest';
import { jsonToYaml } from './service';

describe('json-to-yaml', () => {
  it('converts JSON to YAML', () => {
    const input = JSON.stringify({ name: 'Ada', hobbies: ['math', 'code'] });
    const result = jsonToYaml(input, { indent: 2 });
    expect(result).toContain('name: Ada');
    expect(result).toContain('hobbies:');
    expect(result).toMatch(/- math/);
  });

  it('returns an error for invalid JSON', () => {
    const result = jsonToYaml('{name:', { indent: 2 });
    expect(result).toMatch(/Invalid JSON/i);
  });

  it('returns empty string for blank input', () => {
    expect(jsonToYaml('  ', { indent: 2 })).toBe('');
  });
});
