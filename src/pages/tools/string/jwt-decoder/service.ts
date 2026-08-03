import { InitialValuesType } from './types';

export type JwtDecodeResult = {
  header: unknown;
  payload: unknown;
  signature: string | null;
  error?: string;
};

function base64UrlToBase64(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = (4 - (padded.length % 4)) % 4;
  return padded + '='.repeat(padLength);
}

function decodePart(part: string): unknown {
  const json = atob(base64UrlToBase64(part));
  return JSON.parse(json);
}

export function decodeJwt(token: string, options: InitialValuesType): string {
  const trimmed = token.trim();
  if (!trimmed) return '';

  const parts = trimmed.split('.');
  if (parts.length < 2 || parts.length > 3) {
    return 'Invalid JWT: expected 2 or 3 dot-separated segments.';
  }

  try {
    const header = decodePart(parts[0]);
    const payload = decodePart(parts[1]);
    const signature = parts.length === 3 ? parts[2] : null;

    const result: JwtDecodeResult = {
      header,
      payload,
      signature
    };

    return options.prettyPrint
      ? JSON.stringify(result, null, 2)
      : JSON.stringify(result);
  } catch {
    return 'Invalid JWT: unable to decode header or payload (malformed Base64URL or JSON).';
  }
}
