declare module 'jsqr' {
  export interface QRCode {
    data: string;
    location: unknown;
  }

  export interface ImageDataLike {
    data: Uint8ClampedArray;
    width: number;
    height: number;
  }

  export default function jsQR(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options?: { inversionAttempts?: string }
  ): QRCode | null;
}
