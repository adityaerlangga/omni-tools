export type StrengthReport = {
  score: number;
  label: string;
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
  charsetCount: number;
  patterns: string[];
  suggestions: string[];
};

const COMMON_PASSWORDS = [
  'password',
  '123456',
  '12345678',
  'qwerty',
  'abc123',
  'letmein',
  'admin',
  'welcome',
  'monkey',
  'iloveyou'
];

function detectPatterns(password: string): string[] {
  const patterns: string[] = [];
  const lower = password.toLowerCase();

  if (COMMON_PASSWORDS.some((p) => lower.includes(p))) {
    patterns.push('Contains a common password word');
  }
  if (/(.)\1{2,}/.test(password)) {
    patterns.push('Contains repeated characters (e.g. aaa)');
  }
  if (
    /012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|qwer|asdf|zxcv/i.test(
      password
    )
  ) {
    patterns.push('Contains sequential characters');
  }
  if (/^[A-Za-z]+\d+$/.test(password)) {
    patterns.push('Letters followed only by numbers');
  }
  if (/^\d+$/.test(password)) {
    patterns.push('Digits only');
  }

  return patterns;
}

export function analyzePassword(password: string): StrengthReport {
  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const charsetCount = [hasLower, hasUpper, hasDigit, hasSymbol].filter(
    Boolean
  ).length;
  const patterns = detectPatterns(password);
  const suggestions: string[] = [];

  let score = 0;
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (charsetCount >= 3) score += 1;
  if (charsetCount === 4) score += 1;
  if (patterns.length > 0) score = Math.max(0, score - patterns.length);
  score = Math.min(4, score);

  if (length < 12) {
    suggestions.push('Use at least 12 characters');
  }
  if (!hasLower) suggestions.push('Add lowercase letters');
  if (!hasUpper) suggestions.push('Add uppercase letters');
  if (!hasDigit) suggestions.push('Add digits');
  if (!hasSymbol) suggestions.push('Add symbols (e.g. !@#$)');
  if (patterns.length > 0) {
    suggestions.push('Avoid common words and sequential patterns');
  }
  if (suggestions.length === 0) {
    suggestions.push(
      'Strong password — consider a passphrase for even better memorability'
    );
  }

  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];

  return {
    score,
    label: labels[score],
    length,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
    charsetCount,
    patterns,
    suggestions
  };
}

export function formatReport(password: string): string {
  if (!password) return '';
  const report = analyzePassword(password);
  const lines = [
    `Score: ${report.score}/4 (${report.label})`,
    `Length: ${report.length}`,
    `Charset variety: ${report.charsetCount}/4`,
    `  lowercase: ${report.hasLower ? 'yes' : 'no'}`,
    `  uppercase: ${report.hasUpper ? 'yes' : 'no'}`,
    `  digits: ${report.hasDigit ? 'yes' : 'no'}`,
    `  symbols: ${report.hasSymbol ? 'yes' : 'no'}`,
    '',
    'Patterns:'
  ];
  if (report.patterns.length === 0) {
    lines.push('  None detected');
  } else {
    report.patterns.forEach((p) => lines.push(`  - ${p}`));
  }
  lines.push('', 'Suggestions:');
  report.suggestions.forEach((s) => lines.push(`  - ${s}`));
  return lines.join('\n');
}
