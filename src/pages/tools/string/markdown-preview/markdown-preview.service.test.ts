import { expect, describe, it } from 'vitest';
import { renderMarkdown } from './service';

describe('markdown-preview', () => {
  it('renders markdown to sanitized HTML', () => {
    const result = renderMarkdown('# Hello\n\n**world**', {});
    expect(result).toContain('<h1>Hello</h1>');
    expect(result).toContain('<strong>world</strong>');
  });

  it('strips unsafe HTML', () => {
    const result = renderMarkdown(
      'Safe <script>alert(1)</script> text\n\n[link](javascript:alert(1))',
      {}
    );
    expect(result).not.toContain('<script>');
    expect(result.toLowerCase()).not.toContain('javascript:');
  });

  it('returns empty string for blank input', () => {
    expect(renderMarkdown('   ', {})).toBe('');
  });
});
