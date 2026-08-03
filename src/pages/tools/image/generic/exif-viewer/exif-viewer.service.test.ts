import { describe, expect, it } from 'vitest';
import { formatExifAsText, formatExifValue } from './service';

describe('exif-viewer helpers', () => {
  it('formats primitive and date values', () => {
    expect(formatExifValue('Canon')).toBe('Canon');
    expect(formatExifValue(42)).toBe('42');
    expect(formatExifValue(new Date('2020-01-02T03:04:05.000Z'))).toBe(
      '2020-01-02T03:04:05.000Z'
    );
  });

  it('formats arrays and objects', () => {
    expect(formatExifValue([1, 2, 3])).toBe('1, 2, 3');
    expect(formatExifValue({ a: 1 })).toBe('{"a":1}');
  });

  it('returns a clear message when no tags are present', () => {
    expect(formatExifAsText(null)).toBe(
      'No EXIF / metadata found in this image.'
    );
    expect(formatExifAsText({})).toBe(
      'No EXIF / metadata found in this image.'
    );
  });

  it('formats tags as sorted key/value lines', () => {
    expect(
      formatExifAsText({
        Make: 'Canon',
        Model: 'EOS',
        ISO: 100
      })
    ).toBe('ISO: 100\nMake: Canon\nModel: EOS');
  });
});
