import { InitialValuesType, UnitCategory } from './types';

/** Factors to convert each unit to its category base unit. */
const LENGTH_TO_M: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344
};

const WEIGHT_TO_G: Record<string, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  oz: 28.349523125,
  lb: 453.59237,
  t: 1_000_000
};

const VOLUME_TO_ML: Record<string, number> = {
  ml: 1,
  l: 1000,
  tsp: 4.92892159375,
  tbsp: 14.78676478125,
  cup: 236.5882365,
  fl_oz: 29.5735295625,
  pt: 473.176473,
  qt: 946.352946,
  gal: 3785.411784
};

function convertTemperature(
  value: number,
  from: string,
  to: string
): number {
  let celsius = value;
  if (from === 'F') celsius = ((value - 32) * 5) / 9;
  else if (from === 'K') celsius = value - 273.15;

  if (to === 'C') return celsius;
  if (to === 'F') return (celsius * 9) / 5 + 32;
  if (to === 'K') return celsius + 273.15;
  return value;
}

function convertLinear(
  value: number,
  from: string,
  to: string,
  factors: Record<string, number>
): number {
  const fromFactor = factors[from];
  const toFactor = factors[to];
  if (fromFactor == null || toFactor == null) {
    throw new Error(`Unsupported unit conversion: ${from} → ${to}`);
  }
  return (value * fromFactor) / toFactor;
}

export function convertUnitValue(
  value: number,
  category: UnitCategory,
  fromUnit: string,
  toUnit: string
): number {
  if (!Number.isFinite(value)) return NaN;
  if (fromUnit === toUnit) return value;

  switch (category) {
    case 'length':
      return convertLinear(value, fromUnit, toUnit, LENGTH_TO_M);
    case 'weight':
      return convertLinear(value, fromUnit, toUnit, WEIGHT_TO_G);
    case 'volume':
      return convertLinear(value, fromUnit, toUnit, VOLUME_TO_ML);
    case 'temperature':
      return convertTemperature(value, fromUnit, toUnit);
    default:
      return NaN;
  }
}

export function unitConverter(
  input: string,
  options: InitialValuesType
): string {
  if (!input) return '';

  const { category, fromUnit, toUnit, precision } = options;
  const safePrecision = Math.max(0, Math.min(12, precision));

  return input
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      const value = Number(trimmed);
      if (!Number.isFinite(value)) return '';
      const result = convertUnitValue(value, category, fromUnit, toUnit);
      if (!Number.isFinite(result)) return '';
      return String(Number(result.toFixed(safePrecision)));
    })
    .join('\n');
}
