import { describe, expect, it } from 'vitest';
import { formatBase64Output, stripDataUrlPrefix, toDataUrl } from './service';

describe('image-to-base64 helpers', () => {
  it('strips a data URL prefix', () => {
    expect(stripDataUrlPrefix('data:image/png;base64,abc123==')).toBe(
      'abc123=='
    );
  });

  it('returns raw base64 unchanged when no prefix is present', () => {
    expect(stripDataUrlPrefix('abc123==')).toBe('abc123==');
  });

  it('builds a data URL from mime type and base64', () => {
    expect(toDataUrl('image/jpeg', 'abc')).toBe('data:image/jpeg;base64,abc');
  });

  it('keeps the data URL prefix when requested', () => {
    const dataUrl = 'data:image/png;base64,xyz';
    expect(formatBase64Output(dataUrl, true)).toBe(dataUrl);
  });

  it('removes the data URL prefix when not requested', () => {
    expect(formatBase64Output('data:image/png;base64,xyz', false)).toBe('xyz');
  });
});
