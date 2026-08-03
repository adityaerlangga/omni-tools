export type HashAlgorithm = 'SHA-256' | 'SHA-512' | 'SHA-1' | 'MD5';

export type InitialValuesType = {
  algorithm: HashAlgorithm;
  uppercase: boolean;
};
