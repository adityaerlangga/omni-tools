export type ImageToBase64Options = {
  includeDataUrlPrefix: boolean;
};

/**
 * Convert a File/Blob to a base64 string or data URL.
 * Pure helpers below are unit-tested without File APIs where possible.
 */
export function stripDataUrlPrefix(value: string): string {
  const commaIndex = value.indexOf(',');
  if (value.startsWith('data:') && commaIndex !== -1) {
    return value.slice(commaIndex + 1);
  }
  return value;
}

export function toDataUrl(mimeType: string, base64: string): string {
  return `data:${mimeType || 'application/octet-stream'};base64,${base64}`;
}

export function formatBase64Output(
  dataUrl: string,
  includeDataUrlPrefix: boolean
): string {
  if (includeDataUrlPrefix) return dataUrl;
  return stripDataUrlPrefix(dataUrl);
}

export function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error('File read error'));
    reader.readAsDataURL(file);
  });
}

export async function imageToBase64(
  file: File,
  options: ImageToBase64Options
): Promise<string> {
  const dataUrl = await fileToDataUrl(file);
  return formatBase64Output(dataUrl, options.includeDataUrlPrefix);
}
