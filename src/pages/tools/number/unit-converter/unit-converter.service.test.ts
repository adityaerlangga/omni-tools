import { describe, expect, it } from 'vitest';
import { convertUnitValue, unitConverter } from './service';
import { InitialValuesType } from './types';

const opts = (
  overrides: Partial<InitialValuesType> = {}
): InitialValuesType => ({
  category: 'length',
  fromUnit: 'm',
  toUnit: 'cm',
  precision: 2,
  ...overrides
});

describe('unitConverter', () => {
  it('converts length', () => {
    expect(unitConverter('1', opts())).toBe('100');
    expect(convertUnitValue(1, 'length', 'in', 'cm')).toBeCloseTo(2.54, 2);
  });

  it('converts weight', () => {
    expect(
      unitConverter('1', opts({ category: 'weight', fromUnit: 'kg', toUnit: 'g' }))
    ).toBe('1000');
  });

  it('converts temperature', () => {
    expect(
      unitConverter(
        '0',
        opts({ category: 'temperature', fromUnit: 'C', toUnit: 'F', precision: 1 })
      )
    ).toBe('32');
    expect(
      unitConverter(
        '32',
        opts({ category: 'temperature', fromUnit: 'F', toUnit: 'C', precision: 0 })
      )
    ).toBe('0');
    expect(
      unitConverter(
        '0',
        opts({ category: 'temperature', fromUnit: 'C', toUnit: 'K', precision: 2 })
      )
    ).toBe('273.15');
  });

  it('converts volume', () => {
    expect(
      unitConverter(
        '1',
        opts({ category: 'volume', fromUnit: 'l', toUnit: 'ml', precision: 0 })
      )
    ).toBe('1000');
  });

  it('handles multiline input', () => {
    expect(unitConverter('1\n2\n3', opts({ precision: 0 }))).toBe(
      '100\n200\n300'
    );
  });
});
