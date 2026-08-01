export const MIN_PASSWORD_LENGTH = 4;
export const MAX_PASSWORD_LENGTH = 256;

/** While typing, allow incomplete values (e.g. "3" before "30"). Only cap max. */
export function sanitizeLengthInput(val: string): string | null {
  if (val === '') return '';
  if (!/^\d+$/.test(val)) return null;
  const length = Number(val);
  if (length > MAX_PASSWORD_LENGTH) return String(MAX_PASSWORD_LENGTH);
  return val;
}

/** Clamp to valid range when the field loses focus. */
export function clampLengthInput(val: string): string {
  const length = Number.parseInt(val || '', 10);
  if (Number.isNaN(length) || length < MIN_PASSWORD_LENGTH) {
    return String(MIN_PASSWORD_LENGTH);
  }
  if (length > MAX_PASSWORD_LENGTH) {
    return String(MAX_PASSWORD_LENGTH);
  }
  return String(length);
}
