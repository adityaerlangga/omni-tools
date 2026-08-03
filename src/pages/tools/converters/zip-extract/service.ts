import JSZip from 'jszip';
import { ZipEntryInfo } from './types';

export async function listZipEntries(file: File): Promise<ZipEntryInfo[]> {
  const zip = await JSZip.loadAsync(file);
  const entries: ZipEntryInfo[] = [];

  zip.forEach((relativePath, entry) => {
    entries.push({
      path: relativePath,
      size: (entry as JSZip.JSZipObject & { _data?: { uncompressedSize?: number } })
        ._data?.uncompressedSize ?? 0,
      isDirectory: entry.dir
    });
  });

  return entries.sort((a, b) => a.path.localeCompare(b.path));
}

export async function extractZipFiles(
  file: File,
  selectedPaths: string[],
  extractAll: boolean
): Promise<{ files: File[]; zipFile: File | null }> {
  const zip = await JSZip.loadAsync(file);
  const files: File[] = [];

  const paths = extractAll
    ? Object.keys(zip.files).filter((p) => !zip.files[p].dir)
    : selectedPaths.filter((p) => zip.files[p] && !zip.files[p].dir);

  for (const path of paths) {
    const entry = zip.files[path];
    const blob = await entry.async('blob');
    const name = path.split('/').pop() || path;
    files.push(new File([blob], name, { type: blob.type || 'application/octet-stream' }));
  }

  if (files.length <= 1) {
    return { files, zipFile: null };
  }

  const outZip = new JSZip();
  for (const f of files) {
    outZip.file(f.name, f);
  }
  const zipBlob = await outZip.generateAsync({ type: 'blob' });
  const zipFile = new File([zipBlob], 'extracted.zip', {
    type: 'application/zip'
  });

  return { files, zipFile };
}
