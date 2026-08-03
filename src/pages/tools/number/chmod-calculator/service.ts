import { ChmodResult, InitialValuesType } from './types';

function triadToBits(r: boolean, w: boolean, x: boolean): number {
  return (r ? 4 : 0) + (w ? 2 : 0) + (x ? 1 : 0);
}

function triadToSymbolic(r: boolean, w: boolean, x: boolean): string {
  return `${r ? 'r' : '-'}${w ? 'w' : '-'}${x ? 'x' : '-'}`;
}

export function calculateChmod(options: InitialValuesType): ChmodResult {
  const owner = triadToBits(options.ur, options.uw, options.ux);
  const group = triadToBits(options.gr, options.gw, options.gx);
  const other = triadToBits(options.or, options.ow, options.ox);

  const octal = `${owner}${group}${other}`;
  const symbolic = `-${triadToSymbolic(options.ur, options.uw, options.ux)}${triadToSymbolic(
    options.gr,
    options.gw,
    options.gx
  )}${triadToSymbolic(options.or, options.ow, options.ox)}`;

  return {
    octal,
    symbolic,
    numeric: parseInt(octal, 8)
  };
}

export function formatChmodResult(result: ChmodResult): string {
  return [
    `Octal: ${result.octal}`,
    `Symbolic: ${result.symbolic}`,
    `chmod ${result.octal}`
  ].join('\n');
}

/** Parse octal string like "755" into checkbox values. */
export function chmodFromOctal(octal: string): InitialValuesType | null {
  const cleaned = octal.trim();
  if (!/^[0-7]{3}$/.test(cleaned)) return null;
  const [o, g, t] = cleaned.split('').map((d) => parseInt(d, 10));
  const bits = (n: number) => ({
    r: (n & 4) !== 0,
    w: (n & 2) !== 0,
    x: (n & 1) !== 0
  });
  const owner = bits(o);
  const group = bits(g);
  const other = bits(t);
  return {
    ur: owner.r,
    uw: owner.w,
    ux: owner.x,
    gr: group.r,
    gw: group.w,
    gx: group.x,
    or: other.r,
    ow: other.w,
    ox: other.x
  };
}
