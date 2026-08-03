import { expect, describe, it } from 'vitest';
import {
  base32Decode,
  clampPeriod,
  formatTotp,
  generateTotp,
  hotp
} from './service';

describe('totp-generator', () => {
  it('decodes Base32 secrets', () => {
    // "Hello!" => JBSWY3DPEE (padding omitted)
    const decoded = base32Decode('JBSWY3DPEE');
    expect(String.fromCharCode(...decoded)).toBe('Hello!');
  });

  it('rejects invalid Base32', () => {
    expect(() => base32Decode('!!!!')).toThrow(/Base32/);
  });

  it('clamps period', () => {
    expect(clampPeriod('30')).toBe(30);
    expect(clampPeriod('0')).toBe(30);
    expect(clampPeriod('999')).toBe(300);
  });

  it('matches RFC 4226 HOTP test vector', async () => {
    // Seed "12345678901234567890" as raw key bytes
    const key = new TextEncoder().encode('12345678901234567890');
    expect(await hotp(key, 0, 6)).toBe('755224');
    expect(await hotp(key, 1, 6)).toBe('287082');
    expect(await hotp(key, 2, 6)).toBe('359152');
  });

  it('generates a stable TOTP for a fixed timestamp', async () => {
    // Base32 of ASCII "12345678901234567890"
    const secret = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';
    // RFC 6238: T=59, X=30, digits=8 => 94287082
    const { code, remaining } = await generateTotp(secret, 8, 30, 59 * 1000);
    expect(code).toBe('94287082');
    expect(remaining).toBe(1);
  });

  it('formats errors for bad secrets', async () => {
    const result = await formatTotp('@@@', { digits: '6', period: '30' });
    expect(result).toMatch(/^Error:/);
  });
});
