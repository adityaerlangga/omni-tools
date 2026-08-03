import { describe, expect, it } from 'vitest';
import {
  detectMimeFromBase64Header,
  normalizeBase64Input,
  parseBase64ImageInput
} from './service';

describe('base64-to-image helpers', () => {
  it('normalizes whitespace and quotes', () => {
    expect(normalizeBase64Input('  "abc\\n123"  '.replace('\\n', '\n'))).toBe(
      'abc123'
    );
    expect(normalizeBase64Input("  'xyz' ")).toBe('xyz');
  });

  it('detects common image mime types from base64 headers', () => {
    expect(detectMimeFromBase64Header('iVBORw0KGgoAAA')).toBe('image/png');
    expect(detectMimeFromBase64Header('/9j/4AAQ')).toBe('image/jpeg');
    expect(detectMimeFromBase64Header('R0lGODlh')).toBe('image/gif');
  });

  it('parses a data URL', () => {
    const parsed = parseBase64ImageInput(
      'data:image/jpeg;base64,/9j/4AAQSkZJRg=='
    );
    expect(parsed.mimeType).toBe('image/jpeg');
    expect(parsed.extension).toBe('jpg');
    expect(parsed.base64).toBe('/9j/4AAQSkZJRg==');
  });

  it('parses raw base64 and infers PNG', () => {
    const parsed = parseBase64ImageInput('iVBORw0KGgoAAAANSUhEUg==');
    expect(parsed.mimeType).toBe('image/png');
    expect(parsed.extension).toBe('png');
  });

  it('throws on empty input', () => {
    expect(() => parseBase64ImageInput('   ')).toThrow('Empty input');
  });

  it('throws on invalid base64 characters', () => {
    expect(() => parseBase64ImageInput('not valid!!!')).toThrow(
      'Invalid base64 string'
    );
  });
});
