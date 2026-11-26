// Views: every page of the site, rendered from data.js into #view.
// All navigation is hash routing, so every page is reached by a link and
// works from static files with no network request.
import {
  KPIS, POP_SERIES, AGE_GROUPS, GDP_GROWTH, INFLATION, UNEMPLOYMENT,
  SECTORS, PROVINCES, PROVINCE_NOTES, HEALTH_FACTS, EDUCATION_FACTS,
  ECONOMY_FACTS, SOURCES, totalPopulation, provinceRank, provinceShare,
} from './data.js';
import { paintCharts, drawBars } from './charts.js';

const TOTAL = totalPopulation();
const fmt = (n, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function kpiCards() {
  return `<div class="kpi-grid">${KPIS.map((k) => `
    <div class="kpi${k.tone ? ' ' + k.tone : ''}">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}${k.unit ? ` <small>${k.unit}</small>` : ''}</div>
      <div class="kpi-note">${k.note}</div>
      <div class="kpi-note"><span class="kpi-delta">${k.delta}</span></div>
    </div>`).join('')}</div>`;
}

function chartCard(title, sub, chartHtml, note) {
  return `<section class="card"><h3>${title}</h3><p class="card-sub">${sub}</p>${chartHtml}
    <p class="chart-note">${note}</p></section>`;
}

function provinceRows(list, top = 10) {
  return list.slice(0, top).map((p) => {
    const share = provinceShare(p.pop);
    return `<tr>
      <td><a href="#/province/${p.slug}">${p.name}</a></td>
      <td class="num">${fmt(p.pop)}</td>
      <td class="num">${fmt(share, 1)}%</td>
      <td class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:${(p.pop / 50.35 * 100).toFixed(1)}%"></div></div></td>
    </tr>`;
  }).join('');
}

function provinceTable(list, idPrefix) {
  return `<table class="data" id="${idPrefix}-table">
    <thead><tr>
      <th class="sortable" data-sort="name">Province ↕</th>
      <th class="sortable num" data-sort="pop">Population (m) ↕</th>
      <th class="sortable num" data-sort="share">Share ↕</th>
      <th class="num">Capital</th>
      <th>Region</th>
      <th class="bar-cell">Share of West Java</th>
    </tr></thead>
    <tbody>${list.map((p) => `<tr>
      <td><a href="#/province/${p.slug}">${p.name}</a></td>
      <td class="num">${fmt(p.pop)}</td>
      <td class="num">${fmt(provinceShare(p.pop), 1)}%</td>
      <td class="num">${p.capital}</td>
      <td>${p.region}</td>
      <td class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:${(p.pop / 50.35 * 100).toFixed(1)}%"></div></div></td>
    </tr>`).join('')}</tbody></table>`;
}

function factRows(facts) {
  return `<ul class="fact-list">${facts.map((f) => `<li><span>${f.label}<span class="fact-src">${f.src}</span></span><b>${f.value}</b></li>`).join('')}</ul>`;
}

export function renderOverview() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  return `
  <p class="page-kicker">Indonesia · Updated November 2026</p>
  <h1>Indonesia in numbers</h1>
  <p class="page-sub">Population, economy, health, education and all 38 provinces — real published
  figures with their source and year, in one place. Start with the headline indicators, then dig into any section.</p>
  ${kpiCards()}
  <div class="grid-2">
    ${chartCard('Population, 2010–2024', 'Censuses and BPS mid-year projections',
      `<canvas class="chart" data-chart="line" data-series='${JSON.stringify(POP_SERIES)}' role="img" aria-label="Population rose from 237.6 million in 2010 to 281.6 million in 2024"></canvas>`,
      'Source: BPS — Population Census 2010 &amp; 2020, SUPAS 2015, mid-year projections 2021–2024.')}
    ${chartCard('Real GDP growth, 2015–2024', 'Annual change in constant-price GDP',
      `<canvas class="chart" data-chart="bars" data-series='${JSON.stringify(GDP_GROWTH)}' role="img" aria-label="GDP growth was 5.03 percent in 2024, after a 2.07 percent contraction in 2020"></canvas>`,
      'Source: BPS, 2024. The 2020 contraction is the COVID-19 pandemic year.')}
  </div>
  <div class="section-head"><h2>Most populous provinces</h2><a class="more" href="#/provinces">All 38 provinces →</a></div>
  <table class="data"><thead><tr><th>Province</th><th class="num">Population (m)</th><th class="num">Share</th><th class="bar-cell">Share of West Java</th></tr></thead>
  <tbody>${provinceRows(top10)}</tbody></table>
  <p class="source-line">Source: <b>BPS mid-2024 projections</b>. The 38 provinces together hold ${fmt(TOTAL, 1)} million people — Java alone holds 55.7% of the nation on 6.6% of its land.</p>
  <div class="grid-3" style="margin-top:22px">
    <section class="card"><h3>At a glance</h3>
      <ul class="fact-list">
        <li><span>Land area</span><b>1.90m km²</b></li>
        <li><span>Islands</span><b>17,508</b></li>
        <li><span>Provinces</span><b>38</b></li>
        <li><span>Regencies &amp; cities</span><b>514</b></li>
        <li><span>Capital</span><b>Jakarta*</b></li>
      </ul>
      <p class="chart-note">*Nusantara in East Kalimantan is under construction as the new capital. Sources: BPS; Ministry of Home Affairs.</p>
    </section>
    <section class="card"><h3>Latest releases</h3>
      <ul class="fact-list">
        <li><span>GDP Q3 2025 grew</span><b>5.04%</b></li>
        <li><span>Inflation, Oct 2025</span><b>2.86% yoy</b></li>
        <li><span>Unemployment, Feb 2025</span><b>4.76%</b></li>
        <li><span>Poverty, Mar 2025</span><b>8.47%</b></li>
      </ul>
      <p class="chart-note">Source: BPS releases, 2025. Full 2025 annuals land with the 2026 releases.</p>
    </section>
    <section class="card"><h3>Explore by topic</h3>
      <ul class="fact-list">
        <li><span><a href="#/population">Population</a> — age, growth, density</span><b>→</b></li>
        <li><span><a href="#/economy">Economy</a> — GDP, trade, jobs</span><b>→</b></li>
        <li><span><a href="#/health">Health</a> — life expectancy, stunting</span><b>→</b></li>
        <li><span><a href="#/education">Education</a> — literacy, schooling</span><b>→</b></li>
        <li><span><a href="#/provinces">Provinces</a> — all 38, each with a page</span><b>→</b></li>
      </ul>
    </section>
  </div>`;
}

export function renderPopulation() {
  return `
  <p class="page-kicker">Population</p>
  <h1>281.6 million people</h1>
  <p class="page-sub">The world’s fourth most populous country. Growth has slowed to about 1% a year,
  the working-age share is at its peak, and more than half the nation lives on Java.</p>
  <div class="grid-2">
    ${chartCard('Population, 2010–2024', 'Millions of people',
      `<canvas class="chart" data-chart="line" data-series='${JSON.stringify(POP_SERIES)}' role="img" aria-label="Population rose from 237.6 million in 2010 to 281.6 million in 2024"></canvas>`,
      'Source: BPS — censuses 2010 &amp; 2020, SUPAS 2015, projections 2021–2024.')}
    ${chartCard('Age structure, 2024', 'Share of population by age group',
      `<canvas class="chart" data-chart="hbars" data-series='${JSON.stringify(AGE_GROUPS)}' data-suffix="%" role="img" aria-label="24.4 percent aged 0 to 14, 68.5 percent aged 15 to 64, 7.2 percent aged 65 and over"></canvas>`,
      'Source: BPS, 2024. The 15–64 group is 68.5% — the demographic dividend window.')}
  </div>
  <div class="section-head"><h2>All 38 provinces</h2><span class="pill">Sortable · searchable</span></div>
  <div class="table-tools">
    <input type="search" id="provinceSearch" placeholder="Search provinces, capitals, regions…" aria-label="Search provinces">
    <select id="regionFilter" aria-label="Filter by region">
      <option value="">All regions</option>
      ${[...new Set(PROVINCES.map((p) => p.region))].map((r) => `<option>${r}</option>`).join('')}
    </select>
    <span class="count" id="provinceCount">${PROVINCES.length} provinces</span>
  </div>
  <div id="provinceTableWrap">${provinceTable([...PROVINCES].sort((a, b) => b.pop - a.pop), 'pop')}</div>
  <div class="empty-note" id="provinceEmpty" hidden>No province matches that search.</div>
  <p class="source-line">Source: <b>BPS mid-2024 projections</b>, millions, rounded. Shares are of the ${fmt(TOTAL, 1)} million national total. Click a column header to sort; click a province for its own page.</p>`;
}

export function renderEconomy() {
  return `
  <p class="page-kicker">Economy</p>
  <h1>A US$1.4 trillion economy</h1>
  <p class="page-sub">Southeast Asia’s largest economy: GDP of Rp22,139 trillion in 2024, growing 5.03%,
  with inflation at 1.57% and unemployment at its lowest in a decade.</p>
  ${kpiCards()}
  <div class="grid-2">
    <section class="card"><h3>Pick a series</h3><p class="card-sub">One chart, three official series — switch and the chart redraws.</p>
      <div class="switcher" id="econSwitcher" role="group" aria-label="Economic series">
        <button data-series="gdp" class="active">GDP growth</button>
        <button data-series="inflation">Inflation</button>
        <button data-series="unemployment">Unemployment</button>
      </div>
      <canvas class="chart" id="econChart" data-chart="bars" data-series='${JSON.stringify(GDP_GROWTH)}' role="img" aria-label="Real GDP growth by year, 2015 to 2024" style="margin-top:12px"></canvas>
      <p class="chart-note" id="econNote">Source: BPS. Real GDP growth, % per year, 2015–2024.</p>
    </section>
    ${chartCard('Where GDP comes from, 2024', 'Share of GDP by sector',
      `<canvas class="chart" data-chart="hbars" data-series='${JSON.stringify(SECTORS)}' data-suffix="%" role="img" aria-label="Manufacturing 18.7 percent, trade 13.0 percent, agriculture 11.9 percent of GDP"></canvas>`,
      'Source: BPS, 2024. Manufacturing is the largest single sector.')}
  </div>
  <h2>Trade, investment &amp; money</h2>
  <div class="card">${factRows(ECONOMY_FACTS)}</div>
  <p class="source-line">Sources: <b>BPS</b> (trade, labour), <b>BKPM</b> (investment), <b>Ministry of Finance</b> (debt), <b>APJII</b> (internet users) — all 2024 unless stated.</p>`;
}

export function renderHealth() {
  const peers = [
    { label: 'Singapore', value: 84.0 }, { label: 'Thailand', value: 79.7 },
    { label: 'Malaysia', value: 76.3 }, { label: 'Viet Nam', value: 75.5 },
    { label: 'Indonesia', value: 74.2 }, { label: 'Philippines', value: 72.0 },
  ];
  return `
  <p class="page-kicker">Health</p>
  <h1>Living longer — 74.2 years</h1>
  <p class="page-sub">Life expectancy has risen by more than two years in a decade, and nearly every
  Indonesian is now covered by national health insurance. Stunting and maternal deaths remain the big challenges.</p>
  <div class="grid-2">
    <section class="card"><h3>Key health indicators</h3>${factRows(HEALTH_FACTS)}</section>
    ${chartCard('Life expectancy in the region, 2024', 'Years at birth, UN estimates',
      `<canvas class="chart" data-chart="hbars" data-series='${JSON.stringify(peers)}' data-suffix=" yrs" data-color="#b3261e" role="img" aria-label="Indonesia life expectancy 74.2 years, behind Singapore 84.0 and Thailand 79.7"></canvas>`,
      'Source: UN World Population Prospects 2024. Indonesia sits mid-table in Southeast Asia.')}
  </div>
  <h2>What the numbers mean</h2>
  <div class="grid-2">
    <section class="card"><h3>Stunting is falling, slowly</h3>
      <p>Stunting among children under five fell to <b>19.8%</b> in 2024 (SSGI), down from 30.8% in 2018 — real progress, still one child in five.</p>
      <p class="chart-note">Source: Ministry of Health, Survei Status Gizi Indonesia 2024.</p></section>
    <section class="card"><h3>Near-universal coverage</h3>
      <p><b>98.7%</b> of the population is enrolled in BPJS Kesehatan, the world’s largest single-payer health scheme — up from 86% in 2019.</p>
      <p class="chart-note">Source: BPJS Kesehatan, 2024.</p></section>
  </div>`;
}

export function renderEducation() {
  const levels = [
    { label: 'Primary (net enrolment)', value: 97.8 },
    { label: 'Junior secondary', value: 82.6 },
    { label: 'Senior secondary', value: 64.9 },
    { label: 'Tertiary (gross)', value: 31.7 },
  ];
  return `
  <p class="page-kicker">Education</p>
  <h1>96.0% can read and write</h1>
  <p class="page-sub">Nearly every child now finishes primary school, and the average Indonesian has
  9.24 years of schooling — but only a third reach university, and the senior-secondary gap is the leak in the pipeline.</p>
  <div class="grid-2">
    <section class="card"><h3>Key education indicators</h3>${factRows(EDUCATION_FACTS)}</section>
    ${chartCard('Enrolment by level, 2023', '% of the age group enrolled',
      `<canvas class="chart" data-chart="hbars" data-series='${JSON.stringify(levels)}' data-suffix="%" role="img" aria-label="Primary enrolment 97.8 percent, junior secondary 82.6, senior secondary 64.9, tertiary 31.7"></canvas>`,
      'Source: BPS, 2023. Primary is net enrolment; tertiary is the gross ratio.')}
  </div>
  <h2>What the numbers mean</h2>
  <div class="grid-2">
    <section class="card"><h3>Schooling keeps rising</h3>
      <p>Mean years of schooling reached <b>9.24 years</b> in 2024, up from 8.1 in 2015. Expected years of schooling — what a child entering school today can expect — is <b>13.2 years</b>.</p>
      <p class="chart-note">Source: BPS, 2024.</p></section>
    <section class="card"><h3>The tertiary gap</h3>
      <p>Gross tertiary enrolment is <b>31.7%</b> — above the Philippines but far below Malaysia (43%) and Singapore (91%). About 4,500 higher-education institutions serve the demand.</p>
      <p class="chart-note">Source: BPS; UNESCO UIS, 2023.</p></section>
  </div>`;
}

export function renderProvinces() {
  return `
  <p class="page-kicker">Provinces</p>
  <h1>38 provinces, one table</h1>
  <p class="page-sub">Every province, ranked by population. Search it, filter by island group, sort any
  column — and open any province for its own page.</p>
  <div class="table-tools">
    <input type="search" id="provinceSearch" placeholder="Search provinces, capitals, regions…" aria-label="Search provinces">
    <select id="regionFilter" aria-label="Filter by region">
      <option value="">All regions</option>
      ${[...new Set(PROVINCES.map((p) => p.region))].map((r) => `<option>${r}</option>`).join('')}
    </select>
    <span class="count" id="provinceCount">${PROVINCES.length} provinces</span>
  </div>
  <div id="provinceTableWrap">${provinceTable([...PROVINCES].sort((a, b) => b.pop - a.pop), 'prov')}</div>
  <div class="empty-note" id="provinceEmpty" hidden>No province matches that search.</div>
  <p class="source-line">Source: <b>BPS mid-2024 projections</b>. Java holds 55.7% of the population; Papua’s six provinces together hold 2.0%.</p>`;
}

export function renderProvince(slug) {
  const p = PROVINCES.find((x) => x.slug === slug);
  if (!p) return `<p class="page-kicker">Not found</p><h1>No such province</h1>
    <p>There is no province with that address. <a href="#/provinces">See all 38 provinces →</a></p>`;
  const rank = provinceRank(slug);
  const share = provinceShare(p.pop);
  const note = PROVINCE_NOTES[slug] || '';
  const neighbours = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `
  <p class="page-kicker">Province · ${p.region} · Rank #${rank} of 38</p>
  <div class="detail-head"><h1>${p.name}</h1><span class="rank-badge">#${rank} most populous</span></div>
  <p class="page-sub">${note}</p>
  <div class="kpi-grid">
    <div class="kpi hot"><div class="kpi-label">Population</div><div class="kpi-value">${fmt(p.pop)} <small>million</small></div><div class="kpi-note">BPS mid-2024 projection</div></div>
    <div class="kpi"><div class="kpi-label">Share of Indonesia</div><div class="kpi-value">${fmt(share, 1)}<small>%</small></div><div class="kpi-note">${fmt(p.pop * 1e6, 0)} people, approx.</div></div>
    <div class="kpi gold"><div class="kpi-label">Capital</div><div class="kpi-value" style="font-size:26px">${p.capital}</div><div class="kpi-note">Provincial capital</div></div>
    <div class="kpi"><div class="kpi-label">Island group</div><div class="kpi-value" style="font-size:26px">${p.region}</div><div class="kpi-note">One of 38 provinces</div></div>
  </div>
  <div class="grid-2">
    <section class="card"><h3>${p.name} vs the largest provinces</h3><p class="card-sub">Population, millions — West Java is the yardstick.</p>
      ${neighbours.map((n) => `<div class="compare-row">
        <span class="compare-label">${n.slug === slug ? `<b>${n.name}</b>` : `<a href="#/province/${n.slug}">${n.name}</a>`}</span>
        <span class="bar-track"><span class="bar-fill${n.slug === slug ? ' red' : ''}" style="display:block;width:${(n.pop / 50.35 * 100).toFixed(1)}%"></span></span>
        <span class="compare-value">${fmt(n.pop)}</span></div>`).join('')}
      <p class="chart-note">Source: BPS mid-2024 projections.</p></section>
    <section class="card"><h3>About this province</h3>
      <ul class="fact-list">
        <li><span>Population rank</span><b>#${rank} of 38</b></li>
        <li><span>Share of national population</span><b>${fmt(share, 2)}%</b></li>
        <li><span>People per point of share</span><b>${fmt(TOTAL / 100, 1)}m</b></li>
        <li><span>Region</span><b>${p.region}</b></li>
        <li><span>National total (context)</span><b>${fmt(TOTAL, 1)}m</b></li>
      </ul>
      <p class="chart-note">Figures: BPS mid-2024 projections. Shares computed from the 38-province table on this site.</p></section>
  </div>
  <p style="margin-top:18px"><a href="#/provinces">← All 38 provinces</a> &nbsp;·&nbsp; <a href="#/population">Population overview →</a></p>`;
}

export function renderSources() {
  return `
  <p class="page-kicker">Sources &amp; methods</p>
  <h1>Where every figure comes from</h1>
  <p class="page-sub">Every number on this site names its source and year on the page where it appears.
  Populations are BPS mid-2024 projections; census years are 2010 and 2020. Shares and ranks are computed from the
  figures shown — never from a hidden dataset.</p>
  <div class="card"><ul class="fact-list">
    ${SOURCES.map((s) => `<li><span><b>${s.name}</b><span class="fact-src">${s.detail}</span></span></li>`).join('')}
  </ul></div>
  <h2>Methods</h2>
  <div class="grid-2">
    <section class="card"><h3>What “projection” means</h3>
      <p>BPS mid-year projections start from the 2020 census and roll forward with births, deaths and migration.
      They are the standard denominator for 2024 rates; the next census is in 2030.</p></section>
    <section class="card"><h3>Rounding</h3>
      <p>Provincial populations are rounded to 0.01 million; the 38 sum to ${fmt(TOTAL, 1)} million against the
      published national total of 281.6 million. Percentages are computed from the unrounded table and shown to one decimal.</p></section>
  </div>`;
}

// Wire the controls of the view that was just rendered. Called by main.js
// after every render; controls that are absent are simply skipped.
export function bindViewEvents() {
  const search = document.getElementById('provinceSearch');
  const region = document.getElementById('regionFilter');
  if (search || region) {
    let sortKey = 'pop';
    let sortDir = -1;
    const apply = () => {
      const q = (search ? search.value : '').trim().toLowerCase();
      const r = region ? region.value : '';
      let list = PROVINCES.filter((p) => (!r || p.region === r)
        && (!q || `${p.name} ${p.capital} ${p.region}`.toLowerCase().includes(q)));
      list = [...list].sort((a, b) => {
        if (sortKey === 'name') return sortDir * a.name.localeCompare(b.name);
        if (sortKey === 'share') return sortDir * (provinceShare(a.pop) - provinceShare(b.pop));
        return sortDir * (a.pop - b.pop);
      });
      const wrap = document.getElementById('provinceTableWrap');
      const empty = document.getElementById('provinceEmpty');
      const count = document.getElementById('provinceCount');
      if (wrap) wrap.innerHTML = provinceTable(list, 'dyn');
      if (empty) empty.hidden = list.length > 0;
      if (count) count.textContent = `${list.length} province${list.length === 1 ? '' : 's'}`;
      bindSortHandlers(apply, (k) => { sortKey = k; });
    };
    const bindSortHandlers = (rerun, setKey) => {
      document.querySelectorAll('#provinceTableWrap th.sortable').forEach((th) => {
        th.addEventListener('click', () => {
          const k = th.dataset.sort;
          if (sortKey === k) sortDir *= -1; else { setKey(k); sortDir = k === 'name' ? 1 : -1; }
          rerun();
        });
      });
    };
    bindSortHandlers(apply, (k) => { sortKey = k; });
    if (search) search.addEventListener('input', apply);
    if (region) region.addEventListener('change', apply);
  }
  const switcher = document.getElementById('econSwitcher');
  if (switcher) {
    const seriesMap = {
      gdp: { data: GDP_GROWTH, note: 'Source: BPS. Real GDP growth, % per year, 2015–2024.', label: 'Real GDP growth by year, 2015 to 2024' },
      inflation: { data: INFLATION, note: 'Source: BPS. Consumer price inflation, % year-on-year (December), 2015–2024.', label: 'Inflation by year, 2015 to 2024' },
      unemployment: { data: UNEMPLOYMENT, note: 'Source: BPS. Open unemployment rate, % (August round), 2015–2024.', label: 'Unemployment rate by year, 2015 to 2024' },
    };
    switcher.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-series]');
      if (!btn) return;
      switcher.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === btn));
      const canvas = document.getElementById('econChart');
      const entry = seriesMap[btn.dataset.series];
      canvas.dataset.series = JSON.stringify(entry.data);
      canvas.setAttribute('aria-label', entry.label);
      document.getElementById('econNote').textContent = entry.note;
      drawBars(canvas, entry.data);
    });
  }
  paintCharts();
}
