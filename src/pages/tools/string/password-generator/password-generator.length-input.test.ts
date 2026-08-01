import { describe, expect, it } from 'vitest';
import { clampLengthInput, sanitizeLengthInput } from './lengthInput';

describe('password generator length input', () => {
  it('allows typing intermediate digits below the minimum (e.g. 3 → 30)', () => {
    expect(sanitizeLengthInput('3')).toBe('3');
    expect(sanitizeLengthInput('30')).toBe('30');
    expect(sanitizeLengthInput('')).toBe('');
  });

  it('caps values above the maximum while typing', () => {
    expect(sanitizeLengthInput('257')).toBe('256');
    expect(sanitizeLengthInput('999')).toBe('256');
  });

  it('rejects non-numeric input while typing', () => {
    expect(sanitizeLengthInput('12a')).toBeNull();
    expect(sanitizeLengthInput('-1')).toBeNull();
  });

  it('clamps to the valid range on blur', () => {
    expect(clampLengthInput('')).toBe('4');
    expect(clampLengthInput('3')).toBe('4');
    expect(clampLengthInput('30')).toBe('30');
    expect(clampLengthInput('256')).toBe('256');
    expect(clampLengthInput('999')).toBe('256');
  });
});
