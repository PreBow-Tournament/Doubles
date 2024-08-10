const rawMaps = [
    'urban',
    'aquatica',
    'boo',
    'chronon',
    'dojo',
    'fortress',
    'galaxy',
    'hyperfrost',
    'flora',
    'sorcery',
    'treehouse',
    'atlantis',
    'stumped',
    'cheesy',
    'condo',
    'lighthouse'
] as const;
type RawMap = typeof rawMaps[number];

type Map = RawMap | RawMap[];

const maps: Map[] = [
    'urban',
    ['aquatica', 'dojo'],
    ['sorcery', 'boo'],
    'chronon',
    'fortress',
    'galaxy',
    'hyperfrost',
    'flora',
    'treehouse',
    'atlantis',
    'stumped',
    'cheesy',
    'condo',
    'lighthouse'
];

export { maps, rawMaps, Map, RawMap };