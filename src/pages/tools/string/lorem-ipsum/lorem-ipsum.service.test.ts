import { expect, describe, it } from 'vitest';
import { clampCount, generateLorem, generateWords } from './service';

describe('lorem-ipsum', () => {
  it('clamps counts by type', () => {
    expect(clampCount('0', 'words')).toBe(1);
    expect(clampCount('10', 'words')).toBe(10);
    expect(clampCount('999', 'words')).toBe(500);
    expect(clampCount('999', 'paragraphs')).toBe(50);
  });

  it('generates the requested number of words', () => {
    const words = generateLorem({ type: 'words', count: '5' }).split(/\s+/);
    expect(words).toHaveLength(5);
    expect(generateWords(3)).toEqual(['lorem', 'ipsum', 'dolor']);
  });

  it('generates sentences ending with periods', () => {
    const text = generateLorem({ type: 'sentences', count: '2' });
    const sentences = text.split(/(?<=\.)\s+/);
    expect(sentences).toHaveLength(2);
    expect(sentences[0].endsWith('.')).toBe(true);
  });

  it('generates multiple paragraphs', () => {
    const text = generateLorem({ type: 'paragraphs', count: '3' });
    expect(text.split('\n\n')).toHaveLength(3);
  });
});
