import { InitialValuesType } from './types';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Decode(input: string): Uint8Array {
  const cleaned = input.toUpperCase().replace(/=+$/, '').replace(/[\s-]/g, '');
  if (!cleaned) {
    throw new Error('Secret is empty');
  }
  if (!/^[A-Z2-7]+$/.test(cleaned)) {
    throw new Error('Secret must be Base32 (A–Z and 2–7)');
  }

  let bits = 0;
  let value = 0;
  const output: number[] = [];

  for (const char of cleaned) {
    const idx = BASE32_ALPHABET.indexOf(char);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      output.push((value >>> bits) & 0xff);
    }
  }

  // Drop residual padding bits so length matches floor(chars * 5 / 8)
  const byteLength = Math.floor((cleaned.length * 5) / 8);
  return new Uint8Array(output.slice(0, byteLength));
}

function counterToBytes(counter: number): Uint8Array {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  // high 32 bits then low 32 bits (big-endian)
  const high = Math.floor(counter / 2 ** 32);
  const low = counter >>> 0;
  view.setUint32(0, high);
  view.setUint32(4, low);
  return new Uint8Array(buf);
}

function toBufferSource(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  ) as ArrayBuffer;
}

export async function hotp(
  key: Uint8Array,
  counter: number,
  digits: number
): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    toBufferSource(key),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    toBufferSource(counterToBytes(counter))
  );
  const hash = new Uint8Array(signature);
  const offset = hash[hash.length - 1] & 0x0f;
  const binary =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);
  const otp = binary % 10 ** digits;
  return otp.toString().padStart(digits, '0');
}

export function clampPeriod(raw: string): number {
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 1) return 30;
  return Math.min(300, n);
}

export async function generateTotp(
  secret: string,
  digits: number,
  period: number,
  nowMs: number = Date.now()
): Promise<{ code: string; remaining: number; counter: number }> {
  const key = base32Decode(secret);
  const nowSec = Math.floor(nowMs / 1000);
  const counter = Math.floor(nowSec / period);
  const remaining = period - (nowSec % period);
  const code = await hotp(key, counter, digits);
  return { code, remaining, counter };
}

export async function formatTotp(
  secret: string,
  options: InitialValuesType,
  nowMs: number = Date.now()
): Promise<string> {
  const trimmed = secret.trim();
  if (!trimmed) return '';

  const digits = options.digits === '8' ? 8 : 6;
  const period = clampPeriod(options.period);

  try {
    const { code, remaining, counter } = await generateTotp(
      trimmed,
      digits,
      period,
      nowMs
    );
    return [
      `Code: ${code}`,
      `Remaining: ${remaining}s`,
      `Period: ${period}s`,
      `Digits: ${digits}`,
      `Counter: ${counter}`
    ].join('\n');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `Error: ${message}`;
  }
}
