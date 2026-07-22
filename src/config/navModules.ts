import { DefinedTool, ToolCategory } from '@tools/defineTool';
import { tools } from '@tools/index';

export type NavModuleId =
  | 'image'
  | 'pdf'
  | 'string'
  | 'video'
  | 'audio'
  | 'gif'
  | 'json'
  | 'list'
  | 'csv'
  | 'number'
  | 'time'
  | 'xml'
  | 'converters';

export interface NavModuleDef {
  id: NavModuleId;
  /** i18n key under translation:navModules.* */
  labelKey: string;
  icon: string;
  categories: ToolCategory[];
  /** Preferred child order by tool path (full path e.g. image-generic/compress) */
  preferredOrder?: string[];
}

export interface NavModuleChild {
  path: string;
  shortLabel: string;
  icon: string;
  tool: DefinedTool;
}

export interface NavModule extends NavModuleDef {
  children: NavModuleChild[];
}

/** Short sidebar labels keyed by full tool path */
const SHORT_LABELS: Record<string, string> = {
  'image-generic/editor': 'Editor',
  'image-generic/compress': 'Compress',
  'image-generic/crop': 'Crop',
  'image-generic/resize': 'Resize',
  'image-generic/rotate': 'Rotate',
  'image-generic/remove-background': 'Remove BG',
  'image-generic/change-opacity': 'Opacity',
  'image-generic/change-colors': 'Colors',
  'image-generic/create-transparent': 'Transparent',
  'image-generic/image-to-text': 'OCR',
  'image-generic/qr-code': 'QR Code',
  'image-generic/split-to-pages': 'Split pages',
  'png/compress-png': 'Compress PNG',
  'png/convert-jgp-to-png': 'JPG → PNG',
  'pdf/editor': 'Editor',
  'pdf/split-pdf': 'Split',
  'pdf/rotate-pdf': 'Rotate',
  'pdf/compress-pdf': 'Compress',
  'pdf/merge-pdf': 'Merge',
  'pdf/protect-pdf': 'Protect',
  'pdf/pdf-to-epub': 'PDF → EPUB',
  'pdf/pdf-to-png': 'PDF → PNG',
  'pdf/convert-to-pdf': 'Images → PDF',
  'pdf/extract-image-from-pdf': 'Extract images'
};

export const NAV_MODULE_DEFS: NavModuleDef[] = [
  {
    id: 'image',
    labelKey: 'navModules.image',
    icon: 'material-symbols-light:image-outline-rounded',
    categories: ['image-generic', 'png'],
    preferredOrder: [
      'image-generic/editor',
      'image-generic/compress',
      'image-generic/crop',
      'image-generic/resize',
      'image-generic/rotate',
      'image-generic/remove-background',
      'image-generic/change-opacity',
      'image-generic/change-colors',
      'image-generic/create-transparent',
      'image-generic/image-to-text',
      'image-generic/qr-code',
      'image-generic/split-to-pages',
      'png/compress-png',
      'png/convert-jgp-to-png'
    ]
  },
  {
    id: 'pdf',
    labelKey: 'navModules.pdf',
    icon: 'tabler:pdf',
    categories: ['pdf'],
    preferredOrder: [
      'pdf/editor',
      'pdf/split-pdf',
      'pdf/rotate-pdf',
      'pdf/compress-pdf',
      'pdf/merge-pdf',
      'pdf/protect-pdf',
      'pdf/pdf-to-epub',
      'pdf/pdf-to-png',
      'pdf/convert-to-pdf',
      'pdf/extract-image-from-pdf'
    ]
  },
  {
    id: 'string',
    labelKey: 'navModules.string',
    icon: 'solar:text-bold-duotone',
    categories: ['string']
  },
  {
    id: 'video',
    labelKey: 'navModules.video',
    icon: 'lets-icons:video-light',
    categories: ['video']
  },
  {
    id: 'audio',
    labelKey: 'navModules.audio',
    icon: 'ic:twotone-audiotrack',
    categories: ['audio']
  },
  {
    id: 'gif',
    labelKey: 'navModules.gif',
    icon: 'material-symbols-light:gif-rounded',
    categories: ['gif']
  },
  {
    id: 'json',
    labelKey: 'navModules.json',
    icon: 'lets-icons:json-light',
    categories: ['json']
  },
  {
    id: 'list',
    labelKey: 'navModules.list',
    icon: 'solar:list-bold-duotone',
    categories: ['list']
  },
  {
    id: 'csv',
    labelKey: 'navModules.csv',
    icon: 'material-symbols-light:csv-outline',
    categories: ['csv']
  },
  {
    id: 'number',
    labelKey: 'navModules.number',
    icon: 'lsicon:number-filled',
    categories: ['number']
  },
  {
    id: 'time',
    labelKey: 'navModules.time',
    icon: 'fluent-mdl2:date-time',
    categories: ['time']
  },
  {
    id: 'xml',
    labelKey: 'navModules.xml',
    icon: 'mdi-light:xml',
    categories: ['xml']
  },
  {
    id: 'converters',
    labelKey: 'navModules.converters',
    icon: 'streamline-plump:convert-pdf-1',
    categories: ['converters']
  }
];

function shortLabelFor(tool: DefinedTool, t?: (key: string) => string): string {
  if (SHORT_LABELS[tool.path]) return SHORT_LABELS[tool.path];
  if (t) {
    const name = t(tool.name);
    if (name && name !== tool.name) return name;
  }
  // Fallback: last path segment, title-cased
  const segment = tool.path.split('/').pop() ?? tool.path;
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function sortTools(
  moduleTools: DefinedTool[],
  preferredOrder?: string[]
): DefinedTool[] {
  if (!preferredOrder?.length) {
    return [...moduleTools].sort((a, b) => a.path.localeCompare(b.path));
  }
  const rank = new Map(preferredOrder.map((p, i) => [p, i]));
  return [...moduleTools].sort((a, b) => {
    const ra = rank.get(a.path) ?? 1000;
    const rb = rank.get(b.path) ?? 1000;
    if (ra !== rb) return ra - rb;
    return a.path.localeCompare(b.path);
  });
}

export function getToolsForModule(moduleId: NavModuleId): DefinedTool[] {
  const def = NAV_MODULE_DEFS.find((m) => m.id === moduleId);
  if (!def) return [];
  const moduleTools = tools.filter((tool) =>
    def.categories.includes(tool.type)
  );
  return sortTools(moduleTools, def.preferredOrder);
}

export function buildNavModules(t?: (key: string) => string): NavModule[] {
  return NAV_MODULE_DEFS.map((def) => {
    const moduleTools = getToolsForModule(def.id);
    return {
      ...def,
      children: moduleTools.map((tool) => ({
        path: tool.path,
        shortLabel: shortLabelFor(tool, t),
        icon: typeof tool.icon === 'string' ? tool.icon : 'mdi:tools',
        tool
      }))
    };
  });
}

export function getModuleById(id: NavModuleId): NavModuleDef | undefined {
  return NAV_MODULE_DEFS.find((m) => m.id === id);
}

export function getModuleForCategory(
  category: ToolCategory
): NavModuleDef | undefined {
  return NAV_MODULE_DEFS.find((m) => m.categories.includes(category));
}

export function getModuleForPath(pathname: string): NavModuleDef | undefined {
  const normalized = pathname.replace(/^\//, '');
  const tool = tools.find(
    (t) => t.path === normalized || normalized.startsWith(t.path + '/')
  );
  if (tool) return getModuleForCategory(tool.type);

  // Module overview: /modules/:id
  const moduleMatch = normalized.match(/^modules\/([^/]+)/);
  if (moduleMatch) {
    return getModuleById(moduleMatch[1] as NavModuleId);
  }

  // Legacy category pages
  const catMatch = normalized.match(/^categories\/([^/]+)/);
  if (catMatch) {
    return getModuleForCategory(catMatch[1] as ToolCategory);
  }

  return undefined;
}

export function getActiveModuleId(pathname: string): NavModuleId | undefined {
  return getModuleForPath(pathname)?.id;
}
