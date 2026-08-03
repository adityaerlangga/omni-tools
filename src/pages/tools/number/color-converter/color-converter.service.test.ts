import { describe, expect, it } from 'vitest';
import {
  convertColor,
  hslToRgb,
  parseHex,
  rgbToHex,
  rgbToHsl
} from './service';
import { InitialValuesType } from './types';

describe('color-converter service', () => {
  it('parses hex colors', () => {
    expect(parseHex('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(parseHex('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(parseHex('#00F')).toEqual({ r: 0, g: 0, b: 255 });
    expect(parseHex('invalid')).toBeNull();
  });

  it('converts rgb to hex', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#FF0000');
    expect(rgbToHex({ r: 0, g: 128, b: 255 })).toBe('#0080FF');
  });

  it('converts rgb to hsl and back', () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(hsl).toEqual({ h: 0, s: 100, l: 50 });
    expect(hslToRgb(hsl)).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('converts from hex source', () => {
    const result = convertColor({
      hex: '#336699',
      r: 0,
      g: 0,
      b: 0,
      h: 0,
      s: 0,
      l: 0,
      source: 'hex'
    } satisfies InitialValuesType);

    expect(result?.hex).toBe('#336699');
    expect(result?.rgb).toEqual({ r: 51, g: 102, b: 153 });
    expect(result?.cssRgb).toBe('rgb(51, 102, 153)');
  });

  it('converts from rgb source', () => {
    const result = convertColor({
      hex: '',
      r: 255,
      g: 255,
      b: 255,
      h: 0,
      s: 0,
      l: 0,
      source: 'rgb'
    });
    expect(result?.hex).toBe('#FFFFFF');
    expect(result?.hsl).toEqual({ h: 0, s: 0, l: 100 });
  });

  it('converts from hsl source', () => {
    const result = convertColor({
      hex: '',
      r: 0,
      g: 0,
      b: 0,
      h: 120,
      s: 100,
      l: 50,
      source: 'hsl'
    });
    expect(result?.hex).toBe('#00FF00');
  });
});
