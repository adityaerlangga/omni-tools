import { InitialValuesType } from './types';

const FIRST_NAMES = [
  'Ada',
  'Grace',
  'Alan',
  'Katherine',
  'Linus',
  'Margaret',
  'Tim',
  'Barbara',
  'Donald',
  'Edsger'
];

const LAST_NAMES = [
  'Lovelace',
  'Hopper',
  'Turing',
  'Johnson',
  'Torvalds',
  'Hamilton',
  'Berners-Lee',
  'Liskov',
  'Knuth',
  'Dijkstra'
];

const CITIES = [
  'London',
  'Paris',
  'Berlin',
  'Tokyo',
  'New York',
  'Sydney',
  'Toronto',
  'Singapore'
];

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seedValue: number) {
  let state = seedValue || 1;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function pick<T>(items: T[], random: () => number): T {
  return items[Math.floor(random() * items.length)];
}

function createPerson(index: number, random: () => number) {
  const firstName = pick(FIRST_NAMES, random);
  const lastName = pick(LAST_NAMES, random);
  const id = Math.floor(random() * 900000) + 100000 + index;
  const email = `${firstName}.${lastName}${id}@example.com`
    .toLowerCase()
    .replace(/[^a-z0-9.@+-]/g, '');

  return {
    id,
    name: `${firstName} ${lastName}`,
    email,
    age: Math.floor(random() * 50) + 18,
    active: random() > 0.3,
    address: {
      city: pick(CITIES, random),
      zip: String(Math.floor(random() * 90000) + 10000)
    },
    tags: [
      pick(['admin', 'user', 'guest'], random),
      pick(['beta', 'pro'], random)
    ]
  };
}

export function generateFakeJson(options: InitialValuesType): string {
  const count = Math.min(Math.max(Number(options.count) || 1, 1), 100);
  const seed =
    options.seed?.trim() ||
    `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
  const random = createRng(hashSeed(seed));
  const items = Array.from({ length: count }, (_, index) =>
    createPerson(index, random)
  );

  return JSON.stringify(count === 1 ? items[0] : items, null, 2);
}
