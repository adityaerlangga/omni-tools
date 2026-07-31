import { describe, expect, it } from 'vitest';
import { buildNavModules } from './navModules';

describe('buildNavModules short labels', () => {
  it('resolves namespaced tool i18n keys to human-readable titles', () => {
    const t = (key: string) => {
      if (key === 'video:addAudio.title') return 'Add Audio to Video';
      return key;
    };

    const video = buildNavModules(t).find((m) => m.id === 'video');
    expect(video).toBeDefined();

    const addAudio = video!.children.find((c) => c.path === 'video/add-audio');
    expect(addAudio?.shortLabel).toBe('Add Audio to Video');
  });

  it('falls back to path title when translation returns an unresolved key', () => {
    const t = (key: string) => {
      // Simulate the old bug: wrapping tool keys with translation:
      if (key.startsWith('video:')) return key.replace(':', '.');
      return key;
    };

    const video = buildNavModules(t).find((m) => m.id === 'video');
    const addAudio = video!.children.find((c) => c.path === 'video/add-audio');
    expect(addAudio?.shortLabel).toBe('Add Audio');
    expect(addAudio?.shortLabel).not.toMatch(/video[.:]/);
  });

  it('uses explicit SHORT_LABELS for image tools', () => {
    const image = buildNavModules().find((m) => m.id === 'image');
    const compress = image!.children.find(
      (c) => c.path === 'image-generic/compress'
    );
    expect(compress?.shortLabel).toBe('Compress');
  });
});
