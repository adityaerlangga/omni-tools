import JSZip from 'jszip';

export async function createZipFromFiles(
  files: File[],
  zipName = 'archive.zip'
): Promise<File | null> {
  if (!files.length) return null;

  const zip = new JSZip();
  for (const file of files) {
    const path = file.webkitRelativePath || file.name;
    zip.file(path, file);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const name = zipName.endsWith('.zip') ? zipName : `${zipName}.zip`;
  return new File([blob], name, { type: 'application/zip' });
}
