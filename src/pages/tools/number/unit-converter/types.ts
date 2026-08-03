export type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume';

export type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mi';
export type WeightUnit = 'mg' | 'g' | 'kg' | 'oz' | 'lb' | 't';
export type TemperatureUnit = 'C' | 'F' | 'K';
export type VolumeUnit =
  | 'ml'
  | 'l'
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'fl_oz'
  | 'pt'
  | 'qt'
  | 'gal';

export type Unit =
  | LengthUnit
  | WeightUnit
  | TemperatureUnit
  | VolumeUnit;

export interface InitialValuesType {
  category: UnitCategory;
  fromUnit: string;
  toUnit: string;
  precision: number;
}

export const UNITS_BY_CATEGORY: Record<UnitCategory, string[]> = {
  length: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
  weight: ['mg', 'g', 'kg', 'oz', 'lb', 't'],
  temperature: ['C', 'F', 'K'],
  volume: ['ml', 'l', 'tsp', 'tbsp', 'cup', 'fl_oz', 'pt', 'qt', 'gal']
};
