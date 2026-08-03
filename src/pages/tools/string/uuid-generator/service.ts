import { v4 as uuidv4 } from 'uuid';
import { InitialValuesType } from './types';

const NANO_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export function generateNanoId(size = 21): string {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  let id = '';
  for (let i = 0; i < size; i++) {
    id += NANO_ALPHABET[bytes[i] % NANO_ALPHABET.length];
  }
  return id;
}

export function clampCount(raw: string): number {
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) return 1;
  return Math.min(100, Math.max(1, n));
}

export function generateIds(options: InitialValuesType): string {
  const count = clampCount(options.count);
  const lines: string[] = [];
  for (let i = 0; i < count; i++) {
    const uuid = uuidv4();
    if (options.includeNanoId) {
      lines.push(`${uuid}\t${generateNanoId()}`);
    } else {
      lines.push(uuid);
    }
  }
  return lines.join('\n');
}
