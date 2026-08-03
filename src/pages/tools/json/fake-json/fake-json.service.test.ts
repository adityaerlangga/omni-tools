import { expect, describe, it } from 'vitest';
import { generateFakeJson } from './service';

describe('fake-json', () => {
  it('generates a single nested object by default', () => {
    const result = JSON.parse(
      generateFakeJson({ count: 1, seed: 'test-seed' })
    );
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
    expect(result.address).toHaveProperty('city');
    expect(Array.isArray(result.tags)).toBe(true);
  });

  it('generates an array when count > 1', () => {
    const result = JSON.parse(
      generateFakeJson({ count: 3, seed: 'array-seed' })
    );
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
  });

  it('is deterministic for the same seed', () => {
    const a = generateFakeJson({ count: 2, seed: 'stable' });
    const b = generateFakeJson({ count: 2, seed: 'stable' });
    expect(a).toBe(b);
  });
});
