import { expect, describe, it } from 'vitest';
import { convertCase, convertText, splitWords } from './service';

describe('case-converter', () => {
  it('splits mixed identifier formats', () => {
    expect(splitWords('helloWorld')).toEqual(['hello', 'World']);
    expect(splitWords('HelloWorld')).toEqual(['Hello', 'World']);
    expect(splitWords('hello_world')).toEqual(['hello', 'world']);
    expect(splitWords('hello-world')).toEqual(['hello', 'world']);
    expect(splitWords('XMLHttpRequest')).toEqual(['XML', 'Http', 'Request']);
  });

  it('converts to each supported case', () => {
    const input = 'hello world';
    expect(convertCase(input, 'lowercase')).toBe('hello world');
    expect(convertCase(input, 'uppercase')).toBe('HELLO WORLD');
    expect(convertCase(input, 'title')).toBe('Hello World');
    expect(convertCase(input, 'camel')).toBe('helloWorld');
    expect(convertCase(input, 'pascal')).toBe('HelloWorld');
    expect(convertCase(input, 'snake')).toBe('hello_world');
    expect(convertCase(input, 'kebab')).toBe('hello-world');
    expect(convertCase(input, 'constant')).toBe('HELLO_WORLD');
  });

  it('converts from camelCase to snake_case', () => {
    expect(convertCase('getUserName', 'snake')).toBe('get_user_name');
  });

  it('processes multiple lines', () => {
    expect(convertText('fooBar\nbazQux', { targetCase: 'kebab' })).toBe(
      'foo-bar\nbaz-qux'
    );
  });
});
