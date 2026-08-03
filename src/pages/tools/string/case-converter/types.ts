export type CaseType =
  | 'lowercase'
  | 'uppercase'
  | 'title'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant';

export type InitialValuesType = {
  targetCase: CaseType;
};
