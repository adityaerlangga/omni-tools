import { ContrastResult, InitialValuesType } from './types';

function parseHex(hex: string): { r: number; g: number; b: number } | null {
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

function relativeLuminance(r: number, g: number, b: number): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function getContrastRatio(
  foreground: string,
  background: string
): number | null {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  if (!fg || !bg) return null;

  const l1 = relativeLuminance(fg.r, fg.g, fg.b);
  const l2 = relativeLuminance(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function checkContrast(options: InitialValuesType): ContrastResult | null {
  const ratio = getContrastRatio(options.foreground, options.background);
  if (ratio == null) return null;

  return {
    ratio,
    ratioLabel: `${ratio.toFixed(2)}:1`,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5
  };
}

export function formatContrastResult(result: ContrastResult | null): string {
  if (!result) return '';
  const pass = (ok: boolean) => (ok ? 'Pass' : 'Fail');
  return [
    `Contrast Ratio: ${result.ratioLabel}`,
    `WCAG AA (normal text): ${pass(result.aaNormal)}`,
    `WCAG AA (large text): ${pass(result.aaLarge)}`,
    `WCAG AAA (normal text): ${pass(result.aaaNormal)}`,
    `WCAG AAA (large text): ${pass(result.aaaLarge)}`
  ].join('\n');
}
