import { tool as splitImage } from './split/meta';
import { tool as resizeImage } from './resize/meta';
import { tool as compressImage } from './compress/meta';
import { tool as changeColors } from './change-colors/meta';
import { tool as removeBackground } from './remove-background/meta';
import { tool as cropImage } from './crop/meta';
import { tool as changeOpacity } from './change-opacity/meta';
import { tool as createTransparent } from './create-transparent/meta';
import { tool as imageToText } from './image-to-text/meta';
import { tool as qrCodeGenerator } from './qr-code/meta';
import { tool as rotateImage } from './rotate/meta';
import { tool as imageEditor } from './editor/meta';
import { tool as imageToBase64 } from './image-to-base64/meta';
import { tool as base64ToImage } from './base64-to-image/meta';
import { tool as exifViewer } from './exif-viewer/meta';
import { tool as removeExif } from './remove-exif/meta';
import { tool as qrDecoder } from './qr-decoder/meta';
import { tool as heicToJpg } from './heic-to-jpg/meta';

export const imageGenericTools = [
  imageEditor,
  resizeImage,
  compressImage,
  removeBackground,
  cropImage,
  changeOpacity,
  changeColors,
  createTransparent,
  imageToText,
  imageToBase64,
  base64ToImage,
  exifViewer,
  removeExif,
  qrCodeGenerator,
  qrDecoder,
  heicToJpg,
  rotateImage,
  splitImage
];
