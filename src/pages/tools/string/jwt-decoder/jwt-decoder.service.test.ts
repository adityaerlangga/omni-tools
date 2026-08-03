import { expect, describe, it } from 'vitest';
import { decodeJwt } from './service';

function encode(obj: unknown): string {
  const json = JSON.stringify(obj);
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

describe('jwt-decoder', () => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = { sub: '123', name: 'Alice', admin: true };
  const token = `${encode(header)}.${encode(payload)}.signaturepart`;

  it('decodes header, payload, and raw signature', () => {
    const result = decodeJwt(token, { prettyPrint: false });
    const parsed = JSON.parse(result);
    expect(parsed.header).toEqual(header);
    expect(parsed.payload).toEqual(payload);
    expect(parsed.signature).toBe('signaturepart');
  });

  it('pretty-prints when requested', () => {
    const result = decodeJwt(token, { prettyPrint: true });
    expect(result).toContain('\n');
    expect(JSON.parse(result).payload.name).toBe('Alice');
  });

  it('handles tokens without a signature segment', () => {
    const unsigned = `${encode(header)}.${encode(payload)}`;
    const parsed = JSON.parse(decodeJwt(unsigned, { prettyPrint: false }));
    expect(parsed.signature).toBeNull();
  });

  it('returns a clear error for invalid tokens', () => {
    expect(decodeJwt('not-a-jwt', { prettyPrint: false })).toMatch(
      /Invalid JWT/
    );
    expect(decodeJwt('a.b.c', { prettyPrint: false })).toMatch(/Invalid JWT/);
  });

  it('returns empty string for empty input', () => {
    expect(decodeJwt('', { prettyPrint: true })).toBe('');
  });
});
