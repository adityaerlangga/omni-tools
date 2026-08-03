import { parse as parseExif } from 'exifr';

export type ExifViewerOptions = {
  includeGps: boolean;
};

/**
 * Format a single EXIF value for display.
 */
export function formatExifValue(value: unknown): string {
  if (value == null) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map((v) => formatExifValue(v)).join(', ');
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

/**
 * Convert an EXIF object into sorted key: value lines.
 */
export function formatExifAsText(
  tags: Record<string, unknown> | null | undefined
): string {
  if (!tags || Object.keys(tags).length === 0) {
    return 'No EXIF / metadata found in this image.';
  }

  return Object.keys(tags)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}: ${formatExifValue(tags[key])}`)
    .join('\n');
}

export async function readExifMetadata(
  file: File,
  options: ExifViewerOptions
): Promise<string> {
  const tags = await parseExif(file, {
    tiff: true,
    exif: true,
    gps: options.includeGps,
    xmp: true,
    iptc: true,
    icc: false,
    jfif: true,
    ihdr: true,
    mergeOutput: true,
    reviveValues: true,
    translateKeys: true,
    translateValues: true
  });

  return formatExifAsText(tags as Record<string, unknown> | null);
}
