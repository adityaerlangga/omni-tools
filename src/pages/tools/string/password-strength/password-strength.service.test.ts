import { expect, describe, it } from 'vitest';
import { analyzePassword, formatReport } from './service';

describe('password-strength', () => {
  it('scores a weak short password low', () => {
    const report = analyzePassword('abc');
    expect(report.score).toBeLessThanOrEqual(1);
    expect(report.length).toBe(3);
    expect(report.suggestions.length).toBeGreaterThan(0);
  });

  it('detects common patterns', () => {
    const report = analyzePassword('password123');
    expect(report.patterns.some((p) => /common/i.test(p))).toBe(true);
  });

  it('rewards long diverse passwords', () => {
    const report = analyzePassword('Tr0ub4dor&3-Extra!');
    expect(report.charsetCount).toBe(4);
    expect(report.score).toBeGreaterThanOrEqual(3);
  });

  it('formats a readable report', () => {
    const text = formatReport('Aa1!aaaaaaa');
    expect(text).toContain('Score:');
    expect(text).toContain('Length:');
    expect(text).toContain('Suggestions:');
  });

  it('returns empty for empty input', () => {
    expect(formatReport('')).toBe('');
  });
});
