import { describe, expect, it } from 'vitest';
import { createZipFromFiles } from './service';
import JSZip from 'jszip';

describe('createZipFromFiles', () => {
  it('returns null for empty file list', async () => {
    expect(await createZipFromFiles([])).toBeNull();
  });

  it('creates a zip containing the provided files', async () => {
    const fileA = new File(['hello'], 'a.txt', { type: 'text/plain' });
    const fileB = new File(['world'], 'b.txt', { type: 'text/plain' });

    const zipFile = await createZipFromFiles([fileA, fileB], 'bundle.zip');
    expect(zipFile).not.toBeNull();
    expect(zipFile!.name).toBe('bundle.zip');
    expect(zipFile!.type).toBe('application/zip');

    const zip = await JSZip.loadAsync(await zipFile!.arrayBuffer());
    expect(await zip.file('a.txt')?.async('string')).toBe('hello');
    expect(await zip.file('b.txt')?.async('string')).toBe('world');
  });

  it('appends .zip extension when missing', async () => {
    const file = new File(['x'], 'x.txt', { type: 'text/plain' });
    const zipFile = await createZipFromFiles([file], 'archive');
    expect(zipFile!.name).toBe('archive.zip');
  });
});
