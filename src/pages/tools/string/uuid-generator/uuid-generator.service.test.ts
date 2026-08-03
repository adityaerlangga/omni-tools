import { expect, describe, it } from 'vitest';
import { clampCount, generateIds, generateNanoId } from './service';

describe('uuid-generator', () => {
  it('clamps count between 1 and 100', () => {
    expect(clampCount('0')).toBe(1);
    expect(clampCount('5')).toBe(5);
    expect(clampCount('150')).toBe(100);
    expect(clampCount('abc')).toBe(1);
  });

  it('generates the requested number of UUIDs', () => {
    const result = generateIds({ count: '3', includeNanoId: false });
    const lines = result.split('\n');
    expect(lines).toHaveLength(3);
    for (const line of lines) {
      expect(line).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    }
  });

  it('appends NanoID when enabled', () => {
    const result = generateIds({ count: '2', includeNanoId: true });
    const lines = result.split('\n');
    expect(lines).toHaveLength(2);
    for (const line of lines) {
      const [uuid, nano] = line.split('\t');
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
      expect(nano).toHaveLength(21);
    }
  });

  it('generates NanoIDs of the requested length', () => {
    expect(generateNanoId(10)).toHaveLength(10);
    expect(generateNanoId()).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
