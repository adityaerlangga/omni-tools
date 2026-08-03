export type SqlDialect =
  | 'sql'
  | 'mysql'
  | 'postgresql'
  | 'sqlite'
  | 'mariadb'
  | 'tsql'
  | 'plsql'
  | 'bigquery';

export type InitialValuesType = {
  language: SqlDialect;
  tabWidth: number;
  useTabs: boolean;
  keywordCase: 'preserve' | 'upper' | 'lower';
};
