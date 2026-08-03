export interface InitialValuesType {
  foreground: string;
  background: string;
}

export interface ContrastResult {
  ratio: number;
  ratioLabel: string;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
}
