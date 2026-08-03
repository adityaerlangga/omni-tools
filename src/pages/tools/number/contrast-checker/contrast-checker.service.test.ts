import { describe, expect, it } from 'vitest';
import { checkContrast, getContrastRatio } from './service';

describe('contrast-checker service', () => {
  it('calculates black on white contrast as 21:1', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF');
    expect(ratio).toBeCloseTo(21, 1);
  });

  it('fails low contrast pairs for AA normal', () => {
    const result = checkContrast({
      foreground: '#777777',
      background: '#FFFFFF'
    });
    expect(result).not.toBeNull();
    expect(result!.aaNormal).toBe(false);
  });

  it('passes high contrast pairs for AAA', () => {
    const result = checkContrast({
      foreground: '#000000',
      background: '#FFFFFF'
    });
    expect(result?.aaaNormal).toBe(true);
    expect(result?.aaNormal).toBe(true);
  });

  it('returns null for invalid colors', () => {
    expect(checkContrast({ foreground: 'nope', background: '#fff' })).toBeNull();
  });
});
