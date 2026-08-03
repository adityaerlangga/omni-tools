import { heicTo, isHeic } from 'heic-to';

export type HeicToJpgOptions = {
  quality: number;
};

export function buildJpgFileName(originalName: string): string {
  const base = originalName.replace(/\.[^/.]+$/i, '') || 'image';
  return `${base}.jpg`;
}

export function isHeicFileName(name: string): boolean {
  return /\.(heic|heif)$/i.test(name);
}

export async function convertHeicToJpg(
  file: File,
  options: HeicToJpgOptions
): Promise<File> {
  const heic =
    (await isHeic(file)) ||
    isHeicFileName(file.name) ||
    file.type === 'image/heic' ||
    file.type === 'image/heif';

  if (!heic) {
    throw new Error('Selected file is not a HEIC/HEIF image');
  }

  const quality = Math.min(1, Math.max(0.1, options.quality / 100));
  const convertedBlob = await heicTo({
    blob: file,
    type: 'image/jpeg',
    quality
  });

  return new File([convertedBlob], buildJpgFileName(file.name), {
    type: 'image/jpeg'
  });
}
