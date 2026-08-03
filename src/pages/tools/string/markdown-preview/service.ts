import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { InitialValuesType } from './types';

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'a',
    'blockquote',
    'br',
    'code',
    'del',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'img',
    'li',
    'ol',
    'p',
    'pre',
    'strong',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tr',
    'ul'
  ],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
  RETURN_TRUSTED_TYPE: false
};

marked.setOptions({
  gfm: true,
  breaks: false
});

export function renderMarkdown(
  input: string,
  options: InitialValuesType
): string {
  void options;

  if (!input.trim()) {
    return '';
  }

  const rawHtml = marked.parse(input, { async: false }) as string;
  return String(DOMPurify.sanitize(rawHtml, PURIFY_CONFIG));
}
