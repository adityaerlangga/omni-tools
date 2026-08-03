import { expect, describe, it } from 'vitest';
import { formatSql } from './service';

describe('sql-formatter', () => {
  it('formats a basic SQL query', () => {
    const result = formatSql('select id,name from users where active=1', {
      language: 'sql',
      tabWidth: 2,
      useTabs: false,
      keywordCase: 'upper'
    });
    expect(result).toContain('SELECT');
    expect(result).toContain('FROM');
    expect(result).toContain('WHERE');
    expect(result).toMatch(/\n/);
  });

  it('supports dialect selection', () => {
    const result = formatSql(
      'select * from users where created_at::date = current_date',
      {
        language: 'postgresql',
        tabWidth: 2,
        useTabs: false,
        keywordCase: 'lower'
      }
    );
    expect(result.toLowerCase()).toContain('select');
    expect(result.toLowerCase()).toContain('from');
  });

  it('returns empty string for blank input', () => {
    expect(
      formatSql('   ', {
        language: 'sql',
        tabWidth: 2,
        useTabs: false,
        keywordCase: 'preserve'
      })
    ).toBe('');
  });
});
