import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { extractZipFiles, listZipEntries } from './service';

async function makeZipFile(): Promise<File> {
  const zip = new JSZip();
  zip.file('hello.txt', 'hello');
  zip.file('folder/world.txt', 'world');
  const blob = await zip.generateAsync({ type: 'blob' });
  return new File([blob], 'test.zip', { type: 'application/zip' });
}

describe('zip-extract service', () => {
  it('lists zip entries', async () => {
    const zipFile = await makeZipFile();
    const entries = await listZipEntries(zipFile);
    const paths = entries.map((e) => e.path);
    expect(paths).toContain('hello.txt');
    expect(paths).toContain('folder/world.txt');
  });

  it('extracts selected files', async () => {
    const zipFile = await makeZipFile();
    const { files, zipFile: outZip } = await extractZipFiles(
      zipFile,
      ['hello.txt'],
      false
    );
    expect(files).toHaveLength(1);
    expect(files[0].name).toBe('hello.txt');
    expect(await files[0].text()).toBe('hello');
    expect(outZip).toBeNull();
  });

  it('extracts all files into a zip when multiple', async () => {
    const zipFile = await makeZipFile();
    const { files, zipFile: outZip } = await extractZipFiles(zipFile, [], true);
    expect(files.length).toBeGreaterThanOrEqual(2);
    expect(outZip).not.toBeNull();
    expect(outZip!.name).toBe('extracted.zip');
  });
});
