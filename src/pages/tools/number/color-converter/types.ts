export interface InitialValuesType {
  hex: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
  source: 'hex' | 'rgb' | 'hsl';
}

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorConversionResult {
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  cssRgb: string;
  cssHsl: string;
}
