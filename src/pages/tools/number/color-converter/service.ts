import {
  ColorConversionResult,
  HslColor,
  InitialValuesType,
  RgbColor
} from './types';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function parseHex(hex: string): RgbColor | null {
  const cleaned = hex.trim().replace(/^#/, '');
  const normalized =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned;

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16)
  };
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  const toHex = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function rgbToHsl({ r, g, b }: RgbColor): HslColor {
  const rn = clamp(r, 0, 255) / 255;
  const gn = clamp(g, 0, 255) / 255;
  const bn = clamp(b, 0, 255) / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToRgb({ h, s, l }: HslColor): RgbColor {
  const hn = ((h % 360) + 360) % 360;
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = ln - c / 2;

  let rn = 0;
  let gn = 0;
  let bn = 0;

  if (hn < 60) [rn, gn, bn] = [c, x, 0];
  else if (hn < 120) [rn, gn, bn] = [x, c, 0];
  else if (hn < 180) [rn, gn, bn] = [0, c, x];
  else if (hn < 240) [rn, gn, bn] = [0, x, c];
  else if (hn < 300) [rn, gn, bn] = [x, 0, c];
  else [rn, gn, bn] = [c, 0, x];

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255)
  };
}

export function convertColor(
  options: InitialValuesType
): ColorConversionResult | null {
  let rgb: RgbColor | null = null;

  if (options.source === 'hex') {
    rgb = parseHex(options.hex);
  } else if (options.source === 'rgb') {
    if (
      [options.r, options.g, options.b].some(
        (v) => Number.isNaN(v) || v < 0 || v > 255
      )
    ) {
      return null;
    }
    rgb = { r: options.r, g: options.g, b: options.b };
  } else {
    if (
      Number.isNaN(options.h) ||
      Number.isNaN(options.s) ||
      Number.isNaN(options.l) ||
      options.s < 0 ||
      options.s > 100 ||
      options.l < 0 ||
      options.l > 100
    ) {
      return null;
    }
    rgb = hslToRgb({ h: options.h, s: options.s, l: options.l });
  }

  if (!rgb) return null;

  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);

  return {
    hex,
    rgb,
    hsl,
    cssRgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    cssHsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
  };
}

export function formatColorResult(result: ColorConversionResult | null): string {
  if (!result) return '';
  return [
    `HEX: ${result.hex}`,
    `RGB: ${result.cssRgb}`,
    `HSL: ${result.cssHsl}`
  ].join('\n');
}
