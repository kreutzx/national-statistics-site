# Indonesia in Numbers — National Statistics Explorer

[![make.fun bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A national statistics site for **Indonesia**: population, economy, health, education and all
**38 provinces**, each with its own page. Every figure carries its source and year.

## What it is

- **Overview dashboard** — 8 headline indicators (population 281.6m, GDP Rp22,139 trillion,
  GDP per capita US$4,960, inflation 1.57%, unemployment 4.91%, poverty 8.57%, life expectancy
  74.2 years, HDI 75.02), population and GDP-growth charts, top-10 provinces, latest releases.
- **Population** — population 2010–2024, age structure, and a sortable, searchable table of all
  38 provinces.
- **Economy** — switchable chart (GDP growth / inflation / unemployment, 2015–2024), GDP by
  sector, trade, investment, debt, internet users, labour force.
- **Health** — life expectancy, under-5 and maternal mortality, stunting (19.8%), BPJS coverage
  (98.7%), and a regional life-expectancy comparison.
- **Education** — literacy 96.0%, mean years of schooling 9.24, enrolment by level.
- **Provinces** — all 38 with population, capital, island group and share; every province has
  its own detail page with rank, share and a comparison chart.
- **Sources & methods** — every source named (BPS, Bank Indonesia, Ministry of Finance, BKPM,
  UN IGME, UN MMEIG, WHO, SSGI, BPJS Kesehatan, APJII).

## How it works

Static files under `app/` — no build step, no network request. Open `app/index.html` in a
browser, or serve it with any static server. Charts are drawn on `<canvas>` in code
(`app/charts.js`); all data lives in `app/data.js`; pages render from `app/views.js` over
hash routes (`#/`, `#/population`, `#/economy`, `#/health`, `#/education`, `#/provinces`,
`#/province/<slug>`, `#/sources`). Search, sort and the economy series switcher all work
offline.

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` and
writes `/output/dossier.json` with the kit's `vendor/makefun-frontend.ts`, then verifies the
screenshot count, sizes and formats:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Screenshots (in `screenshots/`, first by name is the cover): `1-cover.jpg` (overview dashboard,
1280×800), `2-provinces.jpg` (provinces table), `3-economy.jpg` (economy page),
`4-phone.jpg` (overview at phone size, 390×844).

## Figures

All figures are real published statistics with source and year on the page — BPS mid-2024
population projections, BPS 2024 national accounts, UN and WHO estimates. See
`#/sources` in the site for the full list.
