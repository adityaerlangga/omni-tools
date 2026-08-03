import { describe, expect, it } from 'vitest';
import {
  buildCleanFileName,
  getOutputExtension,
  getOutputMimeType
} from './service';

describe('remove-exif helpers', () => {
  it('maps output formats to mime types', () => {
    expect(getOutputMimeType('jpeg')).toBe('image/jpeg');
    expect(getOutputMimeType('png')).toBe('image/png');
  });

  it('maps output formats to extensions', () => {
    expect(getOutputExtension('jpeg')).toBe('jpg');
    expect(getOutputExtension('png')).toBe('png');
  });

  it('builds a clean output file name', () => {
    expect(buildCleanFileName('photo.JPEG', 'jpeg')).toBe('photo-no-exif.jpg');
    expect(buildCleanFileName('shot.png', 'png')).toBe('shot-no-exif.png');
    expect(buildCleanFileName('noext', 'jpeg')).toBe('noext-no-exif.jpg');
  });
});
