import { InitialValuesType } from './types';

export type MatchInfo = {
  match: string;
  index: number;
  groups: string[];
};

function buildFlags(options: InitialValuesType): string {
  return (
    (options.flagG ? 'g' : '') +
    (options.flagI ? 'i' : '') +
    (options.flagM ? 'm' : '')
  );
}

export function testRegex(input: string, options: InitialValuesType): string {
  if (!options.pattern) {
    return 'Enter a regular expression pattern.';
  }

  let regex: RegExp;
  try {
    regex = new RegExp(options.pattern, buildFlags(options));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `Invalid regular expression: ${message}`;
  }

  const matches: MatchInfo[] = [];
  if (regex.global) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(input)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1)
      });
      if (match[0] === '') {
        regex.lastIndex++;
      }
    }
  } else {
    const match = regex.exec(input);
    if (match) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1)
      });
    }
  }

  const lines: string[] = [];
  lines.push(`Matches: ${matches.length}`);
  if (matches.length === 0) {
    lines.push('No matches found.');
  } else {
    matches.forEach((m, i) => {
      const groupInfo =
        m.groups.length > 0
          ? ` groups=[${m.groups.map((g) => JSON.stringify(g)).join(', ')}]`
          : '';
      lines.push(`${i + 1}. "${m.match}" at index ${m.index}${groupInfo}`);
    });
  }

  if (options.showReplacement) {
    lines.push('');
    lines.push('Replacement result:');
    try {
      const replaceRegex = new RegExp(options.pattern, buildFlags(options));
      lines.push(input.replace(replaceRegex, options.replacement));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      lines.push(`Replacement failed: ${message}`);
    }
  }

  return lines.join('\n');
}
