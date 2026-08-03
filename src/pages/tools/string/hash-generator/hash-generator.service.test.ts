import { expect, describe, it } from 'vitest';
import { hashText, md5 } from './service';

describe('hash-generator', () => {
  it('computes known MD5 digests', () => {
    expect(md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
    expect(md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592');
    expect(md5('The quick brown fox jumps over the lazy dog')).toBe(
      '9e107d9d372bb6826bd81d3542a419d6'
    );
  });

  it('hashes with SHA-256 via Web Crypto', async () => {
    const result = await hashText('hello', {
      algorithm: 'SHA-256',
      uppercase: false
    });
    expect(result).toBe(
      '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
    );
  });

  it('hashes with SHA-1', async () => {
    const result = await hashText('hello', {
      algorithm: 'SHA-1',
      uppercase: false
    });
    expect(result).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
  });

  it('uppercases hex when requested', async () => {
    const result = await hashText('hello', {
      algorithm: 'MD5',
      uppercase: true
    });
    expect(result).toBe('5D41402ABC4B2A76B9719D911017C592');
  });

  it('returns empty string for empty input', async () => {
    expect(await hashText('', { algorithm: 'SHA-256', uppercase: false })).toBe(
      ''
    );
  });
});
