import { getProgrammePage } from "./programmes";
import type { Photo } from "./site";

type LonLat = readonly [lon: number, lat: number];

const CITIES: Record<string, LonLat> = {
  Birmingham: [-1.9, 52.49],
  Dublin: [-6.26, 53.35],
  Glasgow: [-4.25, 55.86],
  Leeds: [-1.55, 53.8],
  London: [-0.13, 51.51],
  Manchester: [-2.24, 53.48],
};

/**
 * Land of Great Britain and Ireland as west-to-east longitude spans, one row per half degree of latitude.
 * Coarse on purpose: the map renders as a dot matrix, so only the silhouette has to read.
 */
const LAND: readonly (readonly [lat: number, spans: readonly (readonly [number, number])[]])[] = [
  [58.5, [[-5.0, -3.1]]],
  [58.0, [[-7.0, -6.2], [-5.3, -3.6]]],
  [57.5, [[-7.5, -7.1], [-6.6, -1.8]]],
  [57.0, [[-7.5, -7.3], [-6.1, -2.1]]],
  [56.5, [[-6.3, -2.6]]],
  [56.0, [[-6.0, -2.6]]],
  [55.5, [[-5.8, -1.6]]],
  [55.0, [[-8.4, -6.0], [-5.1, -1.4]]],
  [54.5, [[-8.2, -5.5], [-3.6, -0.6]]],
  [54.0, [[-10.0, -6.2], [-4.7, -4.4], [-3.2, -0.2]]],
  [53.5, [[-10.1, -6.1], [-3.1, 0.1]]],
  [53.0, [[-9.5, -6.0], [-4.6, 0.3]]],
  [52.5, [[-9.9, -6.2], [-4.1, 1.7]]],
  [52.0, [[-10.4, -7.5], [-5.1, 1.5]]],
  [51.5, [[-9.9, -8.6], [-4.3, 1.3]]],
  [51.0, [[-4.5, 1.4]]],
  [50.5, [[-5.1, -3.4], [-1.6, -1.1]]],
  [50.0, [[-5.7, -4.9]]],
];

const WEST = -10.6;
const NORTH = 58.8;
/** Degrees of longitude shrink with latitude; one factor at the islands' middle keeps the shape honest. */
const LON_SCALE = Math.cos((54.5 * Math.PI) / 180);
const UNIT = 100;
const DOT_STEP = 25;

function project([lon, lat]: LonLat) {
  return { x: (lon - WEST) * LON_SCALE * UNIT, y: (NORTH - lat) * UNIT };
}

/** Spans for the quarter-degree row between two authored rows: overlapping spans meet halfway. */
function between(upper: readonly (readonly [number, number])[], lower: readonly (readonly [number, number])[]) {
  return upper.flatMap(([w1, e1]) =>
    lower.filter(([w2, e2]) => w2 < e1 && w1 < e2).map(([w2, e2]) => [(w1 + w2) / 2, (e1 + e2) / 2] as const),
  );
}

function landRows() {
  return LAND.flatMap(([lat, spans], index) => {
    const next = LAND[index + 1];
    return next ? [{ lat, spans }, { lat: lat - 0.25, spans: between(spans, next[1]) }] : [{ lat, spans }];
  });
}

export const MAP_SIZE = { width: Math.round((1.9 - WEST) * LON_SCALE * UNIT), height: Math.round((NORTH - 49.8) * UNIT) };

/** Dot centres on a staggered grid, kept only where they fall on land. */
export const MAP_DOTS: readonly { x: number; y: number }[] = landRows().flatMap(({ lat, spans }, row) => {
  const { y } = project([WEST, lat]);
  const offset = row % 2 === 0 ? 0 : DOT_STEP / 2;
  const dots: { x: number; y: number }[] = [];
  for (let x = offset; x <= MAP_SIZE.width; x += DOT_STEP) {
    const lon = x / (LON_SCALE * UNIT) + WEST;
    if (spans.some(([west, east]) => lon >= west && lon <= east)) dots.push({ x, y });
  }
  return dots;
});

export type MapStop = { city: string; date: string; signups: number; x: number; y: number };

/** Every career conference in date order, placed on the map. Source: the career conferences programme page. */
export const CONFERENCE_ROUTE: readonly MapStop[] = (getProgrammePage("career-conferences")?.events ?? []).map(
  ({ date, place, detail }) => {
    const coords = CITIES[place];
    if (!coords) throw new Error(`No map position for conference city "${place}"`);
    return { city: place, date, signups: Number.parseInt(detail, 10), ...project(coords) };
  },
);

/** Distance travelled along the route when each stop is reached, as a share of the whole route (chord lengths). */
const ROUTE_PROGRESS = CONFERENCE_ROUTE.reduce<number[]>((travelled, stop, index) => {
  const from = CONFERENCE_ROUTE[index - 1] ?? stop;
  return [...travelled, (travelled.at(-1) ?? 0) + Math.hypot(stop.x - from.x, stop.y - from.y)];
}, []).map((distance, _, all) => distance / (all.at(-1) || 1));

export type MapCity = { city: string; visits: number; signups: number; reached: number; x: number; y: number };

/** Each city once, with its totals and how far along the route it is first reached (0 to 1). */
export const CONFERENCE_CITIES: readonly MapCity[] = CONFERENCE_ROUTE.reduce<MapCity[]>((cities, stop, index) => {
  const known = cities.find((city) => city.city === stop.city);
  if (known) {
    known.visits += 1;
    known.signups += stop.signups;
  } else {
    cities.push({ city: stop.city, visits: 1, signups: stop.signups, reached: ROUTE_PROGRESS[index], x: stop.x, y: stop.y });
  }
  return cities;
}, []);

export const CONFERENCE_SIGNUPS = CONFERENCE_ROUTE.reduce((total, stop) => total + stop.signups, 0);

/** The route as gentle arcs between consecutive stops, so it reads as a journey rather than a chart. */
export const ROUTE_PATH = CONFERENCE_ROUTE.reduce((path, stop, index) => {
  if (index === 0) return `M ${stop.x.toFixed(1)} ${stop.y.toFixed(1)}`;
  const from = CONFERENCE_ROUTE[index - 1];
  const dx = stop.x - from.x;
  const dy = stop.y - from.y;
  const bend = index % 2 === 0 ? 0.22 : -0.22;
  const cx = (from.x + stop.x) / 2 - dy * bend;
  const cy = (from.y + stop.y) / 2 + dx * bend;
  return `${path} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${stop.x.toFixed(1)} ${stop.y.toFixed(1)}`;
}, "");

export type WhoBeat = { title: string; body: string; photo: Photo };

/** Who IHSAAN is, told in three beats. Each beat is a fact the home page does not state. */
export const WHO_WE_ARE: readonly WhoBeat[] = [
  {
    title: "Grassroots and career-focused",
    body: "IHSAAN is a grassroots organisation helping Muslim students and graduates across the UK and Ireland bridge the gap between university and professional life.",
    photo: { src: "/media/faithful-talent.webp", alt: "Students listening to speakers at an informal IHSAAN session", width: 1800, height: 1114 },
  },
  {
    title: "Programmes built around people",
    body: "From bootcamps and webinars to conferences and career events, our programmes help Muslim students and graduates take their next steps.",
    photo: { src: "/media/gallery/manchester-foyer.webp", alt: "Students gathering in a University of Manchester foyer", width: 2000, height: 1126 },
  },
  {
    title: "A community that stays",
    body: "Alumni stay connected through the IHSAAN alumni network, and the WhatsApp community keeps the conversation going between events.",
    photo: { src: "/media/gallery/conference-audience.webp", alt: "An audience listening at an IHSAAN career conference", width: 2560, height: 1706 },
  },
];

export type Value = { name: string; term: string; body: string };

export const VALUES: readonly Value[] = [
  {
    name: "Faith",
    term: "Imaan",
    body: "We act with integrity, honesty, and accountability to God and to those we serve.",
  },
  {
    name: "Excellence",
    term: "Ihsaan",
    body: "We aim high, take ownership of our work, and keep improving to deliver real impact.",
  },
  {
    name: "Service",
    term: "Khidmah",
    body: "We serve students, partners, and each other with respect, generosity, and care.",
  },
];

export type Executive = { name: string; role: string };

export const EXECUTIVE_TEAM: readonly Executive[] = [
  { name: "Samir Sidat", role: "Chief Executive Officer" },
  { name: "Eyad Abdelhady", role: "Co-Chief Operating Officer" },
  { name: "Musaddiq Iqbal", role: "Co-Chief Operating Officer" },
  { name: "Muhammad Islam", role: "Chief Financial Officer" },
  { name: "Bushra Abdullah", role: "Chief People Officer" },
  { name: "Yusuf Shamsi", role: "Chief Information Officer" },
];
