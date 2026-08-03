export type ParsedBase64Image = {
  mimeType: string;
  base64: string;
  extension: string;
};

const MIME_EXTENSION: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/bmp': 'bmp',
  'image/svg+xml': 'svg'
};

/**
 * Normalize pasted input: trim whitespace/newlines and optional surrounding quotes.
 */
export function normalizeBase64Input(input: string): string {
  return input
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/\s+/g, '');
}

export function detectMimeFromBase64Header(base64: string): string | null {
  // Common magic-byte prefixes in base64
  if (base64.startsWith('iVBORw0KGgo')) return 'image/png';
  if (base64.startsWith('/9j/')) return 'image/jpeg';
  if (base64.startsWith('R0lGOD')) return 'image/gif';
  if (base64.startsWith('UklGR')) return 'image/webp';
  if (base64.startsWith('Qk')) return 'image/bmp';
  if (base64.startsWith('PHN2Zy') || base64.startsWith('PD94bW'))
    return 'image/svg+xml';
  return null;
}

export function parseBase64ImageInput(input: string): ParsedBase64Image {
  const normalized = normalizeBase64Input(input);
  if (!normalized) {
    throw new Error('Empty input');
  }

  let mimeType = 'image/png';
  let base64 = normalized;

  const dataUrlMatch = normalized.match(/^data:([^;]+);base64,(.+)$/i);
  if (dataUrlMatch) {
    mimeType = dataUrlMatch[1].toLowerCase();
    base64 = dataUrlMatch[2];
  } else {
    const detected = detectMimeFromBase64Header(normalized);
    if (detected) mimeType = detected;
  }

  // Basic sanity check for base64 alphabet
  if (!/^[A-Za-z0-9+/]+=*$/.test(base64)) {
    throw new Error('Invalid base64 string');
  }

  const extension = MIME_EXTENSION[mimeType] || 'png';
  return { mimeType, base64, extension };
}

export function base64ToUint8Array(base64: string): Uint8Array {
  const binary =
    typeof atob === 'function'
      ? atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function base64ToImageFile(
  input: string,
  fileName = 'decoded-image'
): File {
  const { mimeType, base64, extension } = parseBase64ImageInput(input);
  const bytes = base64ToUint8Array(base64);
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return new File([copy], `${fileName}.${extension}`, { type: mimeType });
}
