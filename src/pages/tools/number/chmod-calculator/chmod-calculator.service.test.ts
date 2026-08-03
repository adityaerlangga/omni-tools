import { describe, expect, it } from 'vitest';
import { calculateChmod, chmodFromOctal, formatChmodResult } from './service';
import { InitialValuesType } from './types';

const allOff: InitialValuesType = {
  ur: false,
  uw: false,
  ux: false,
  gr: false,
  gw: false,
  gx: false,
  or: false,
  ow: false,
  ox: false
};

describe('chmod-calculator service', () => {
  it('calculates 755', () => {
    const result = calculateChmod({
      ...allOff,
      ur: true,
      uw: true,
      ux: true,
      gr: true,
      gx: true,
      or: true,
      ox: true
    });
    expect(result.octal).toBe('755');
    expect(result.symbolic).toBe('-rwxr-xr-x');
  });

  it('calculates 644', () => {
    const result = calculateChmod({
      ...allOff,
      ur: true,
      uw: true,
      gr: true,
      or: true
    });
    expect(result.octal).toBe('644');
    expect(result.symbolic).toBe('-rw-r--r--');
  });

  it('formats result', () => {
    const formatted = formatChmodResult(
      calculateChmod({ ...allOff, ur: true, uw: true, ux: true })
    );
    expect(formatted).toContain('Octal: 700');
    expect(formatted).toContain('chmod 700');
  });

  it('parses octal back to flags', () => {
    expect(chmodFromOctal('755')).toEqual({
      ur: true,
      uw: true,
      ux: true,
      gr: true,
      gw: false,
      gx: true,
      or: true,
      ow: false,
      ox: true
    });
    expect(chmodFromOctal('abc')).toBeNull();
  });
});
