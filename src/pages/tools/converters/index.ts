import { tool as convertersAudioConverter } from './audio-converter/meta';
import { tool as convertersWebpConverter } from './convert-to-webp/meta';
import { tool as convertersJpgConverter } from './convert-to-jpg/meta';
import { tool as convertersZipCreate } from './zip-create/meta';
import { tool as convertersZipExtract } from './zip-extract/meta';

export const convertersTools = [
  convertersAudioConverter,
  convertersWebpConverter,
  convertersJpgConverter,
  convertersZipCreate,
  convertersZipExtract
];
