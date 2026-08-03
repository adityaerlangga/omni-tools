import { describe, expect, it, vi } from 'vitest';

vi.mock('jsqr', () => ({
  default: (data: Uint8ClampedArray) => {
    // Sentinel: if first pixel R channel is 1, pretend we found a QR
    if (data[0] === 1) {
      return { data: 'https://example.com', location: {} };
    }
    return null;
  }
}));

import { decodeQrFromImageData } from './service';

describe('qr-decoder helpers', () => {
  it('returns decoded text when jsQR finds a code', () => {
    const data = new Uint8ClampedArray(4);
    data[0] = 1;
    const imageData = { data, width: 1, height: 1 } as ImageData;
    expect(decodeQrFromImageData(imageData)).toEqual({
      success: true,
      text: 'https://example.com'
    });
  });

  it('returns a clear error when no QR code is found', () => {
    const data = new Uint8ClampedArray(4);
    const imageData = { data, width: 1, height: 1 } as ImageData;
    expect(decodeQrFromImageData(imageData)).toEqual({
      success: false,
      text: 'No QR code found in this image.'
    });
  });
});
