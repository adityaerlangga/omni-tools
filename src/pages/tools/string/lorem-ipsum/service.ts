import { InitialValuesType, LoremType } from './types';

const WORDS = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'ut',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'ut',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
  'duis',
  'aute',
  'irure',
  'dolor',
  'in',
  'reprehenderit',
  'in',
  'voluptate',
  'velit',
  'esse',
  'cillum',
  'dolore',
  'eu',
  'fugiat',
  'nulla',
  'pariatur',
  'excepteur',
  'sint',
  'occaecat',
  'cupidatat',
  'non',
  'proident',
  'sunt',
  'in',
  'culpa',
  'qui',
  'officia',
  'deserunt',
  'mollit',
  'anim',
  'id',
  'est',
  'laborum'
];

export function clampCount(raw: string, type: LoremType): number {
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 1) return 1;
  const max = type === 'words' ? 500 : type === 'sentences' ? 100 : 50;
  return Math.min(max, n);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateWords(count: number, startIndex = 0): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[(startIndex + i) % WORDS.length]);
  }
  return result;
}

export function generateSentence(wordCount: number, seed: number): string {
  const words = generateWords(wordCount, seed);
  words[0] = capitalize(words[0]);
  return `${words.join(' ')}.`;
}

export function generateParagraph(sentenceCount: number, seed: number): string {
  const sentences: string[] = [];
  let offset = seed;
  for (let i = 0; i < sentenceCount; i++) {
    const wordCount = 6 + ((seed + i) % 10);
    sentences.push(generateSentence(wordCount, offset));
    offset += wordCount;
  }
  return sentences.join(' ');
}

export function generateLorem(options: InitialValuesType): string {
  const count = clampCount(options.count, options.type);

  if (options.type === 'words') {
    return generateWords(count).join(' ');
  }

  if (options.type === 'sentences') {
    const sentences: string[] = [];
    let offset = 0;
    for (let i = 0; i < count; i++) {
      const wordCount = 6 + (i % 10);
      sentences.push(generateSentence(wordCount, offset));
      offset += wordCount;
    }
    return sentences.join(' ');
  }

  const paragraphs: string[] = [];
  let offset = 0;
  for (let i = 0; i < count; i++) {
    const sentenceCount = 3 + (i % 3);
    paragraphs.push(generateParagraph(sentenceCount, offset));
    offset += sentenceCount * 10;
  }
  return paragraphs.join('\n\n');
}
