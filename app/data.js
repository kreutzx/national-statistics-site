// Indonesia in Numbers — all figures are real published statistics.
// Each figure carries its source and year; the Sources page lists them all.
// Populations are BPS mid-2024 projections (millions, rounded to 0.01).
// National totals: BPS 2024 unless stated otherwise.

export const META = {
  country: 'Indonesia',
  updated: 'November 2026',
  population: { value: 281.6, unit: 'million', year: 2024, source: 'BPS' },
};

export const KPIS = [
  { label: 'Population', value: '281.6', unit: 'million', note: 'Mid-2024 projection · BPS', delta: '+1.0% vs 2023', tone: 'hot' },
  { label: 'GDP (nominal)', value: 'Rp22,139', unit: 'trillion', note: '2024 · BPS', delta: '+5.03% growth', tone: '' },
  { label: 'GDP per capita', value: 'US$4,960', unit: '', note: '2024 · BPS', delta: 'Rp78.6 million', tone: 'gold' },
  { label: 'Inflation', value: '1.57', unit: '% yoy', note: 'December 2024 · BPS', delta: '▼ from 2.61% in 2023', tone: '' },
  { label: 'Unemployment', value: '4.91', unit: '%', note: 'August 2024 · BPS', delta: '7.47 million people', tone: '' },
  { label: 'Poverty rate', value: '8.57', unit: '%', note: 'September 2024 · BPS', delta: '24.06 million people', tone: '' },
  { label: 'Life expectancy', value: '74.2', unit: 'years', note: '2024 · BPS', delta: '+0.14 vs 2023', tone: '' },
  { label: 'Human Development Index', value: '75.02', unit: '', note: '2024 · BPS', delta: 'High human development', tone: 'gold' },
];

// Population by year (millions). 2010 and 2020 are censuses; 2015 is SUPAS;
// 2021–2024 are BPS mid-year projections.
export const POP_SERIES = [
  { year: 2010, value: 237.6 }, { year: 2015, value: 255.5 },
  { year: 2020, value: 270.2 }, { year: 2021, value: 272.7 },
  { year: 2022, value: 275.8 }, { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

// Age structure 2024, share of population (BPS).
export const AGE_GROUPS = [
  { label: '0–14 years', value: 24.4 },
  { label: '15–64 years', value: 68.5 },
  { label: '65+ years', value: 7.2 },
];

// Real GDP growth, % per year (BPS).
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// CPI inflation, % year-on-year, December (BPS).
export const INFLATION = [
  { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 },
  { year: 2017, value: 3.61 }, { year: 2018, value: 3.13 },
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
];

// Open unemployment rate, % (BPS, August round).
export const UNEMPLOYMENT = [
  { year: 2015, value: 6.18 }, { year: 2016, value: 5.61 },
  { year: 2017, value: 5.50 }, { year: 2018, value: 5.34 },
  { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
];

// Share of GDP by sector, 2024 (BPS).
export const SECTORS = [
  { label: 'Manufacturing', value: 18.7 },
  { label: 'Wholesale & retail trade', value: 13.0 },
  { label: 'Agriculture & fishing', value: 11.9 },
  { label: 'Construction', value: 9.5 },
  { label: 'Mining & quarrying', value: 8.2 },
  { label: 'All other sectors', value: 38.7 },
];

// All 38 provinces: population (millions, BPS mid-2024 projection),
// capital city and island group. Ranks and shares are computed in code.
export const PROVINCES = [
  { slug: 'west-java', name: 'West Java', pop: 50.35, capital: 'Bandung', region: 'Java' },
  { slug: 'east-java', name: 'East Java', pop: 41.81, capital: 'Surabaya', region: 'Java' },
  { slug: 'central-java', name: 'Central Java', pop: 37.89, capital: 'Semarang', region: 'Java' },
  { slug: 'north-sumatra', name: 'North Sumatra', pop: 15.59, capital: 'Medan', region: 'Sumatra' },
  { slug: 'banten', name: 'Banten', pop: 12.43, capital: 'Serang', region: 'Java' },
  { slug: 'jakarta', name: 'Jakarta', pop: 10.68, capital: 'Jakarta', region: 'Java' },
  { slug: 'south-sulawesi', name: 'South Sulawesi', pop: 9.46, capital: 'Makassar', region: 'Sulawesi' },
  { slug: 'lampung', name: 'Lampung', pop: 9.32, capital: 'Bandar Lampung', region: 'Sumatra' },
  { slug: 'south-sumatra', name: 'South Sumatra', pop: 8.92, capital: 'Palembang', region: 'Sumatra' },
  { slug: 'riau', name: 'Riau', pop: 6.76, capital: 'Pekanbaru', region: 'Sumatra' },
  { slug: 'west-sumatra', name: 'West Sumatra', pop: 5.86, capital: 'Padang', region: 'Sumatra' },
  { slug: 'west-kalimantan', name: 'West Kalimantan', pop: 5.82, capital: 'Pontianak', region: 'Kalimantan' },
  { slug: 'east-nusa-tenggara', name: 'East Nusa Tenggara', pop: 5.66, capital: 'Kupang', region: 'Bali & Nusa Tenggara' },
  { slug: 'west-nusa-tenggara', name: 'West Nusa Tenggara', pop: 5.60, capital: 'Mataram', region: 'Bali & Nusa Tenggara' },
  { slug: 'aceh', name: 'Aceh', pop: 5.56, capital: 'Banda Aceh', region: 'Sumatra' },
  { slug: 'bali', name: 'Bali', pop: 4.39, capital: 'Denpasar', region: 'Bali & Nusa Tenggara' },
  { slug: 'south-kalimantan', name: 'South Kalimantan', pop: 4.28, capital: 'Banjarmasin', region: 'Kalimantan' },
  { slug: 'east-kalimantan', name: 'East Kalimantan', pop: 3.91, capital: 'Samarinda', region: 'Kalimantan' },
  { slug: 'yogyakarta', name: 'Yogyakarta', pop: 3.71, capital: 'Yogyakarta', region: 'Java' },
  { slug: 'jambi', name: 'Jambi', pop: 3.68, capital: 'Jambi City', region: 'Sumatra' },
  { slug: 'central-sulawesi', name: 'Central Sulawesi', pop: 3.11, capital: 'Palu', region: 'Sulawesi' },
  { slug: 'southeast-sulawesi', name: 'Southeast Sulawesi', pop: 2.82, capital: 'Kendari', region: 'Sulawesi' },
  { slug: 'central-kalimantan', name: 'Central Kalimantan', pop: 2.78, capital: 'Palangka Raya', region: 'Kalimantan' },
  { slug: 'north-sulawesi', name: 'North Sulawesi', pop: 2.74, capital: 'Manado', region: 'Sulawesi' },
  { slug: 'riau-islands', name: 'Riau Islands', pop: 2.17, capital: 'Tanjung Pinang', region: 'Sumatra' },
  { slug: 'bengkulu', name: 'Bengkulu', pop: 2.10, capital: 'Bengkulu City', region: 'Sumatra' },
  { slug: 'maluku', name: 'Maluku', pop: 1.98, capital: 'Ambon', region: 'Maluku' },
  { slug: 'west-sulawesi', name: 'West Sulawesi', pop: 1.56, capital: 'Mamuju', region: 'Sulawesi' },
  { slug: 'bangka-belitung', name: 'Bangka Belitung', pop: 1.52, capital: 'Pangkal Pinang', region: 'Sumatra' },
  { slug: 'highland-papua', name: 'Highland Papua', pop: 1.47, capital: 'Wamena', region: 'Papua' },
  { slug: 'north-maluku', name: 'North Maluku', pop: 1.41, capital: 'Sofifi', region: 'Maluku' },
  { slug: 'central-papua', name: 'Central Papua', pop: 1.39, capital: 'Nabire', region: 'Papua' },
  { slug: 'gorontalo', name: 'Gorontalo', pop: 1.28, capital: 'Gorontalo City', region: 'Sulawesi' },
  { slug: 'papua', name: 'Papua', pop: 1.15, capital: 'Jayapura', region: 'Papua' },
  { slug: 'north-kalimantan', name: 'North Kalimantan', pop: 0.73, capital: 'Tanjung Selor', region: 'Kalimantan' },
  { slug: 'southwest-papua', name: 'Southwest Papua', pop: 0.62, capital: 'Sorong', region: 'Papua' },
  { slug: 'west-papua', name: 'West Papua', pop: 0.58, capital: 'Manokwari', region: 'Papua' },
  { slug: 'south-papua', name: 'South Papua', pop: 0.54, capital: 'Merauke', region: 'Papua' },
];

// One-line context shown on a province's own page.
export const PROVINCE_NOTES = {
  'west-java': 'Indonesia’s most populous province — home to 17.9% of the nation — and its largest provincial economy after Jakarta.',
  'east-java': 'The second most populous province, anchored by Surabaya, the country’s second city and busiest eastern port.',
  'central-java': 'The heartland of Javanese culture; Semarang is its capital and largest city.',
  'north-sumatra': 'Sumatra’s most populous province; Medan is the largest city outside Java.',
  'banten': 'Java’s western gateway, bordering Jakarta; home to the port of Merak and heavy industry.',
  'jakarta': 'The national capital and the country’s largest economy — about one sixth of national GDP — on just 0.03% of its land.',
  'south-sulawesi': 'Sulawesi’s largest province by population; Makassar is the main port of eastern Indonesia.',
  'lampung': 'Sumatra’s southern tip, facing Java across the Sunda Strait; a major coffee and food-crop producer.',
  'south-sumatra': 'Palembang, its capital, is one of Indonesia’s oldest cities and a centre of oil, gas and coal.',
  'riau': 'One of Indonesia’s richest resource provinces — oil, gas and palm oil — on Sumatra’s east coast.',
  'west-sumatra': 'Homeland of the Minangkabau people; Padang is its capital on the Indian Ocean coast.',
  'west-kalimantan': 'Kalimantan’s most populous province; Pontianak sits on the equator.',
  'east-nusa-tenggara': 'An archipelago province of more than 500 islands, including Flores, Sumba and Timor.',
  'west-nusa-tenggara': 'Home to Lombok and Sumbawa; Mataram is its capital.',
  'aceh': 'Indonesia’s westernmost province, on the northern tip of Sumatra, with special autonomy.',
  'bali': 'Indonesia’s best-known island: 4.39 million people and the country’s leading tourism destination.',
  'south-kalimantan': 'Banjarmasin, the “city of a thousand rivers”, is its capital; coal and palm oil drive its economy.',
  'east-kalimantan': 'Home to Nusantara, the new national capital under construction, and to Balikpapan and Samarinda.',
  'yogyakarta': 'A special region ruled by its sultan; a centre of education, arts and Javanese culture.',
  'jambi': 'A Sumatran province of rainforest, rubber and palm oil; its capital is Jambi City.',
  'central-sulawesi': 'Palu is its capital on the Gulf of Tomini; nickel and gold are mined here.',
  'southeast-sulawesi': 'Kendari is its capital; nickel mining on its eastern coast has grown fast.',
  'central-kalimantan': 'Indonesia’s largest province by land area, dominated by rainforest and peatland.',
  'north-sulawesi': 'Manado is its capital; Bunaken’s reefs are among the world’s best-known dive sites.',
  'riau-islands': 'An archipelago province facing Singapore; Batam is its industrial hub.',
  'bengkulu': 'A Sumatran province on the Indian Ocean coast; its capital is Bengkulu City.',
  'maluku': 'The historic Spice Islands; Ambon is its capital.',
  'west-sulawesi': 'Indonesia’s newest province on Sulawesi’s west coast until the 2022 Papuan split; Mamuju is its capital.',
  'bangka-belitung': 'Tin-mining islands off Sumatra’s east coast; Pangkal Pinang is its capital.',
  'highland-papua': 'One of four new Papuan provinces created in 2022; Wamena is its capital in the Baliem Valley.',
  'north-maluku': 'Sofifi is its capital; Ternate was once the seat of a spice-trading sultanate.',
  'central-papua': 'Created in 2022; Nabire is its capital on the northern coast.',
  'gorontalo': 'Sulawesi’s smallest province by population; its capital is Gorontalo City.',
  'papua': 'The rump of the former Papua province after the 2022 split; Jayapura is its capital.',
  'north-kalimantan': 'Indonesia’s youngest province (2012) and its least populous on Borneo; Tanjung Selor is its capital.',
  'southwest-papua': 'Created in 2022; Sorong is its capital and the gateway to Raja Ampat.',
  'west-papua': 'Manokwari is its capital on the Bird’s Head Peninsula.',
  'south-papua': 'Created in 2022; Merauke is its capital near the Papua New Guinea border.',
};

export const HEALTH_FACTS = [
  { label: 'Life expectancy at birth', value: '74.2 years', src: 'BPS, 2024' },
  { label: 'Under-5 mortality', value: '21 per 1,000 live births', src: 'UN IGME, 2023' },
  { label: 'Maternal mortality ratio', value: '140 per 100,000 live births', src: 'UN MMEIG, 2020' },
  { label: 'Stunting in children under 5', value: '19.8%', src: 'SSGI (Ministry of Health), 2024' },
  { label: 'Physicians', value: '0.5 per 1,000 people', src: 'WHO, 2020' },
  { label: 'National health insurance (BPJS Kesehatan)', value: '98.7% of population covered', src: 'BPJS Kesehatan, 2024' },
];

export const EDUCATION_FACTS = [
  { label: 'Adult literacy rate (15+)', value: '96.0%', src: 'BPS, 2023' },
  { label: 'Mean years of schooling', value: '9.24 years', src: 'BPS, 2024' },
  { label: 'Expected years of schooling', value: '13.2 years', src: 'BPS, 2024' },
  { label: 'Gross tertiary enrolment ratio', value: '31.7%', src: 'BPS, 2023' },
  { label: 'Schools (all levels)', value: '≈ 440,000', src: 'Ministry of Education, 2023' },
  { label: 'Universities & higher-education institutions', value: '≈ 4,500', src: 'Ministry of Education, 2023' },
];

export const ECONOMY_FACTS = [
  { label: 'Exports of goods', value: 'US$264.7 billion', src: 'BPS, 2024' },
  { label: 'Imports of goods', value: 'US$233.7 billion', src: 'BPS, 2024' },
  { label: 'Trade balance', value: 'US$31.0 billion surplus', src: 'BPS, 2024' },
  { label: 'Total investment realised', value: 'Rp1,714 trillion', src: 'BKPM, 2024' },
  { label: 'Government debt', value: '39.4% of GDP', src: 'Ministry of Finance, 2024' },
  { label: 'Internet users', value: '221.6 million (79.5%)', src: 'APJII, 2024' },
  { label: 'Labour force', value: '152.1 million', src: 'BPS, August 2024' },
  { label: 'Informal workers', value: '57.9% of workers', src: 'BPS, August 2024' },
];

export const SOURCES = [
  { name: 'BPS — Statistics Indonesia', detail: 'Population projections and census 2010/2020, GDP and growth, inflation, unemployment, poverty, HDI, life expectancy, schooling, trade. bps.go.id.' },
  { name: 'Bank Indonesia', detail: 'Monetary and balance-of-payments context; inflation target 2.5% ± 1%. bi.go.id.' },
  { name: 'Ministry of Finance', detail: 'Government debt 39.4% of GDP, 2024. kemenkeu.go.id.' },
  { name: 'BKPM (Investment Coordinating Board)', detail: 'Total investment realised Rp1,714 trillion, 2024. bkpm.go.id.' },
  { name: 'UN IGME', detail: 'Under-5 mortality 21 per 1,000 live births, 2023. childmortality.org.' },
  { name: 'UN MMEIG', detail: 'Maternal mortality ratio 140 per 100,000 live births, 2020.' },
  { name: 'WHO', detail: 'Physician density 0.5 per 1,000 people, 2020. who.int.' },
  { name: 'Ministry of Health / SSGI', detail: 'Stunting prevalence 19.8% among children under 5, 2024.' },
  { name: 'BPJS Kesehatan', detail: 'National health insurance coverage 98.7% of population, 2024.' },
  { name: 'APJII', detail: 'Internet users 221.6 million (79.5% of population), 2024. apjii.or.id.' },
  { name: 'Ministry of Education, Culture, Research and Technology', detail: 'School and university counts, 2023.' },
];

export function totalPopulation() {
  return PROVINCES.reduce((sum, p) => sum + p.pop, 0);
}
export function provinceRank(slug) {
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  return sorted.findIndex((p) => p.slug === slug) + 1;
}
export function provinceShare(pop) {
  return (pop / totalPopulation()) * 100;
}
