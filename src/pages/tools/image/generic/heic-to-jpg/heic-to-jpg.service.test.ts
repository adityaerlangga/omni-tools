import { describe, expect, it } from 'vitest';
import { buildJpgFileName, isHeicFileName } from './service';

describe('heic-to-jpg helpers', () => {
  it('detects HEIC/HEIF file names', () => {
    expect(isHeicFileName('photo.heic')).toBe(true);
    expect(isHeicFileName('photo.HEIF')).toBe(true);
    expect(isHeicFileName('photo.jpg')).toBe(false);
  });

  it('builds a JPG output file name', () => {
    expect(buildJpgFileName('vacation.HEIC')).toBe('vacation.jpg');
    expect(buildJpgFileName('shot.heif')).toBe('shot.jpg');
    expect(buildJpgFileName('noext')).toBe('noext.jpg');
  });
});
