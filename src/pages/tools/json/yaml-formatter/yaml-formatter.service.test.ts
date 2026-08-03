import { expect, describe, it } from 'vitest';
import { formatYaml } from './service';

describe('yaml-formatter', () => {
  it('beautifies compact YAML', () => {
    const result = formatYaml('name: Ada\nhobbies: [math, code]', {
      indent: 2,
      sortKeys: false
    });
    expect(result).toContain('name: Ada');
    expect(result).toContain('hobbies:');
    expect(result).toMatch(/- math/);
  });

  it('sorts keys when enabled', () => {
    const result = formatYaml('z: 1\na: 2', {
      indent: 2,
      sortKeys: true
    });
    expect(result.indexOf('a:')).toBeLessThan(result.indexOf('z:'));
  });

  it('returns an error for invalid YAML', () => {
    const result = formatYaml('name: Ada\n  bad: indent', {
      indent: 2,
      sortKeys: false
    });
    expect(result).toMatch(/Invalid YAML/i);
  });
});
