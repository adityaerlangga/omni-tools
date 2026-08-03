import { describe, expect, it } from 'vitest';
import { convertTimezone } from './service';
import { InitialValuesType } from './types';

const makeOptions = (
  overrides: Partial<InitialValuesType> = {}
): InitialValuesType => ({
  dateTime: '2024-07-18 12:00:00',
  fromTimezone: 'UTC',
  toTimezone: 'America/New_York',
  ...overrides
});

describe('convertTimezone', () => {
  it('converts UTC to America/New_York', () => {
    const result = convertTimezone(makeOptions());
    expect(result).toContain('2024-07-18');
    expect(result).toContain('08:00:00');
  });

  it('converts America/Los_Angeles to Asia/Tokyo', () => {
    const result = convertTimezone(
      makeOptions({
        dateTime: '2024-01-15 09:00:00',
        fromTimezone: 'America/Los_Angeles',
        toTimezone: 'Asia/Tokyo'
      })
    );
    expect(result).toContain('2024-01-16');
    expect(result).toContain('02:00:00');
  });

  it('returns empty string for invalid datetime', () => {
    expect(
      convertTimezone(makeOptions({ dateTime: 'not-a-date' }))
    ).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(convertTimezone(makeOptions({ dateTime: '' }))).toBe('');
  });

  it('handles identity conversion', () => {
    const result = convertTimezone(
      makeOptions({
        fromTimezone: 'Europe/London',
        toTimezone: 'Europe/London'
      })
    );
    expect(result).toContain('2024-07-18');
    expect(result).toContain('12:00:00');
  });
});
