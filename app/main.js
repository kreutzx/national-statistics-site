// Router: hash routes for every page, quick-find for provinces, and a
// resize hook that repaints the canvas charts at the new width.
import { PROVINCES } from './data.js';
import {
  renderOverview, renderPopulation, renderEconomy, renderHealth,
  renderEducation, renderProvinces, renderProvince, renderSources,
  bindViewEvents,
} from './views.js';
import { paintCharts } from './charts.js';

const view = document.getElementById('view');
const NAV = ['overview', 'population', 'economy', 'health', 'education', 'provinces', 'sources'];

function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [page, arg] = hash.split('/');
  let html;
  let nav = 'overview';
  if (page === '' || page === undefined) { html = renderOverview(); }
  else if (page === 'population') { html = renderPopulation(); nav = 'population'; }
  else if (page === 'economy') { html = renderEconomy(); nav = 'economy'; }
  else if (page === 'health') { html = renderHealth(); nav = 'health'; }
  else if (page === 'education') { html = renderEducation(); nav = 'education'; }
  else if (page === 'provinces') { html = renderProvinces(); nav = 'provinces'; }
  else if (page === 'province') { html = renderProvince(arg || ''); nav = 'provinces'; }
  else if (page === 'sources') { html = renderSources(); nav = 'sources'; }
  else {
    html = `<p class="page-kicker">Not found</p><h1>Page not found</h1>
      <p>That address is not part of this site. <a href="#/">Back to the overview →</a></p>`;
  }
  view.innerHTML = html;
  document.querySelectorAll('.main-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === nav);
  });
  document.title = nav === 'overview'
    ? 'Indonesia in Numbers — National Statistics Explorer'
    : `${cap(nav)} — Indonesia in Numbers`;
  bindViewEvents();
  window.scrollTo(0, 0);
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Quick-find in the masthead: jump to the best-matching province page.
document.getElementById('quickFind').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = document.getElementById('quickFindInput').value.trim().toLowerCase();
  if (!q) return;
  const exact = PROVINCES.find((p) => p.name.toLowerCase() === q);
  const starts = PROVINCES.find((p) => p.name.toLowerCase().startsWith(q));
  const contains = PROVINCES.find((p) => p.name.toLowerCase().includes(q)
    || p.capital.toLowerCase().includes(q));
  const hit = exact || starts || contains;
  location.hash = hit ? `#/province/${hit.slug}` : '#/provinces';
  if (!hit) {
    // No match: land on the provinces page with the query filled in.
    requestAnimationFrame(() => {
      const input = document.getElementById('provinceSearch');
      if (input) { input.value = q; input.dispatchEvent(new Event('input')); }
    });
  }
});

// Charts are canvas: repaint them when the viewport changes size.
let resizeTimer = 0;
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(paintCharts, 150);
});

window.addEventListener('hashchange', route);
route();
