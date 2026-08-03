export type OutputFormat = 'jpeg' | 'png';

export type RemoveExifOptions = {
  outputFormat: OutputFormat;
  jpegQuality: number;
};

export function getOutputMimeType(format: OutputFormat): string {
  return format === 'png' ? 'image/png' : 'image/jpeg';
}

export function getOutputExtension(format: OutputFormat): string {
  return format === 'png' ? 'png' : 'jpg';
}

export function buildCleanFileName(
  originalName: string,
  format: OutputFormat
): string {
  const base = originalName.replace(/\.[^/.]+$/, '') || 'image';
  return `${base}-no-exif.${getOutputExtension(format)}`;
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to encode image'));
      },
      mimeType,
      quality
    );
  });
}

/**
 * Strip metadata by re-encoding the image through a canvas.
 * EXIF and other metadata are not preserved by canvas export.
 */
export async function removeExifFromImage(
  file: File,
  options: RemoveExifOptions
): Promise<File> {
  const img = await loadImageFromFile(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas is not supported in this browser');
  }

  // Opaque white background for JPEG (no alpha)
  if (options.outputFormat === 'jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const mimeType = getOutputMimeType(options.outputFormat);
  const quality =
    options.outputFormat === 'jpeg'
      ? Math.min(1, Math.max(0.1, options.jpegQuality / 100))
      : undefined;

  const blob = await canvasToBlob(canvas, mimeType, quality);
  return new File([blob], buildCleanFileName(file.name, options.outputFormat), {
    type: mimeType
  });
}
