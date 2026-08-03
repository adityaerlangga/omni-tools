import { expect, describe, it } from 'vitest';
import { xmlToJson } from './service';

describe('xml-to-json', () => {
  it('converts XML to JSON', () => {
    const result = xmlToJson('<root><name>Ada</name><age>36</age></root>', {
      indentationType: 'space',
      spacesCount: 2,
      ignoreAttributes: true
    });
    expect(JSON.parse(result)).toEqual({
      root: { name: 'Ada', age: 36 }
    });
  });

  it('includes attributes when enabled', () => {
    const result = xmlToJson('<root id="1"><name>Ada</name></root>', {
      indentationType: 'space',
      spacesCount: 2,
      ignoreAttributes: false
    });
    const parsed = JSON.parse(result);
    expect(parsed.root['@_id']).toBe('1');
  });

  it('returns an error for invalid XML', () => {
    const result = xmlToJson('<root><a></root>', {
      indentationType: 'space',
      spacesCount: 2,
      ignoreAttributes: true
    });
    expect(result).toMatch(/Invalid XML/i);
  });
});
