import { describe, expect, it } from 'vitest';
import {
  filterHttpStatusCodes,
  formatHttpStatusCodes,
  HTTP_STATUS_CODES
} from './service';

describe('http-status-codes service', () => {
  it('returns all codes for empty query', () => {
    expect(filterHttpStatusCodes('')).toHaveLength(HTTP_STATUS_CODES.length);
  });

  it('filters by code', () => {
    const result = filterHttpStatusCodes('404');
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('Not Found');
  });

  it('filters by text', () => {
    const result = filterHttpStatusCodes('unauthorized');
    expect(result.some((e) => e.code === 401)).toBe(true);
  });

  it('formats results', () => {
    const formatted = formatHttpStatusCodes(
      filterHttpStatusCodes('200')
    );
    expect(formatted).toContain('200 OK');
  });

  it('returns empty message when nothing matches', () => {
    expect(formatHttpStatusCodes([])).toBe('No matching status codes.');
  });
});
