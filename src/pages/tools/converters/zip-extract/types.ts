export interface InitialValuesType {
  extractAll: boolean;
  selectedPaths: string[];
}

export interface ZipEntryInfo {
  path: string;
  size: number;
  isDirectory: boolean;
}
