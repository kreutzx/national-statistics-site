// Canvas charts drawn in code — no chart library, no network.
// Every chart is a plain <canvas> with device-pixel scaling and a
// text fallback in its aria-label, so the figures exist even without paint.

const INK = '#0e2a2b';
const TEAL = '#0f4c4f';
const RED = '#b3261e';
const GOLD = '#c98a12';
const GRID = '#e3ddd0';
const MUTED = '#5c665f';

function setupCanvas(canvas, heightCss) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const widthCss = canvas.clientWidth || canvas.parentElement.clientWidth || 640;
  canvas.width = Math.round(widthCss * dpr);
  canvas.height = Math.round(heightCss * dpr);
  canvas.style.height = heightCss + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, widthCss, heightCss);
  return { ctx, w: widthCss, h: heightCss };
}

function axes(ctx, w, h, pad, min, max, yTicks) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '12px -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const t of yTicks) {
    const y = pad.t + ((max - t) / (max - min)) * (h - pad.t - pad.b);
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
    ctx.fillText(String(t), pad.l - 8, y);
  }
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.moveTo(pad.l, pad.t);
  ctx.lineTo(pad.l, h - pad.b);
  ctx.lineTo(w - pad.r, h - pad.b);
  ctx.stroke();
}

function xLabels(ctx, w, h, pad, labels, step) {
  ctx.fillStyle = MUTED;
  ctx.font = '12px -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const n = labels.length;
  labels.forEach((label, i) => {
    if (i % step !== 0 && i !== n - 1) return;
    const x = pad.l + (i / (n - 1)) * (w - pad.l - pad.r);
    ctx.fillText(String(label), x, h - pad.b + 8);
  });
}

// Line chart for a year series: [{year, value}].
export function drawLine(canvas, series, opts = {}) {
  const { ctx, w, h } = setupCanvas(canvas, opts.height || 240);
  const values = series.map((d) => d.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const span = max - min || 1;
  min -= span * 0.15;
  max += span * 0.15;
  const pad = { t: 14, r: 16, b: 26, l: 46 };
  const yTicks = niceTicks(min, max, 4);
  axes(ctx, w, h, pad, yTicks[0], yTicks[yTicks.length - 1], yTicks);
  const x = (i) => pad.l + (i / (series.length - 1)) * (w - pad.l - pad.r);
  const y = (v) => pad.t + ((max - v) / (max - min)) * (h - pad.t - pad.b);
  // Area fill.
  ctx.beginPath();
  series.forEach((d, i) => (i === 0 ? ctx.moveTo(x(i), y(d.value)) : ctx.lineTo(x(i), y(d.value))));
  ctx.lineTo(x(series.length - 1), h - pad.b);
  ctx.lineTo(x(0), h - pad.b);
  ctx.closePath();
  ctx.fillStyle = 'rgba(15, 76, 79, 0.08)';
  ctx.fill();
  // Line.
  ctx.beginPath();
  series.forEach((d, i) => (i === 0 ? ctx.moveTo(x(i), y(d.value)) : ctx.lineTo(x(i), y(d.value))));
  ctx.strokeStyle = opts.color || TEAL;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();
  // Points + last value label.
  ctx.fillStyle = opts.color || TEAL;
  series.forEach((d, i) => {
    ctx.beginPath();
    ctx.arc(x(i), y(d.value), i === series.length - 1 ? 5 : 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
  const last = series[series.length - 1];
  ctx.font = '700 13px -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = INK;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText(String(last.value), Math.min(x(series.length - 1) - 34, w - 60), y(last.value) - 8);
  xLabels(ctx, w, h, pad, series.map((d) => d.year), opts.labelStep || 1);
}

// Bar chart for a year series. Negative bars go below the zero line in red.
export function drawBars(canvas, series, opts = {}) {
  const { ctx, w, h } = setupCanvas(canvas, opts.height || 240);
  const values = series.map((d) => d.value);
  let min = Math.min(0, Math.min(...values));
  let max = Math.max(...values);
  const span = max - min || 1;
  min -= span * 0.08;
  max += span * 0.12;
  const pad = { t: 16, r: 16, b: 26, l: 46 };
  const yTicks = niceTicks(min, max, 4);
  axes(ctx, w, h, pad, yTicks[0], yTicks[yTicks.length - 1], yTicks);
  const y = (v) => pad.t + ((max - v) / (max - min)) * (h - pad.t - pad.b);
  const slot = (w - pad.l - pad.r) / series.length;
  const barW = Math.min(34, slot * 0.62);
  ctx.font = '12px -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  series.forEach((d, i) => {
    const cx = pad.l + slot * i + slot / 2;
    const negative = d.value < 0;
    const top = y(Math.max(d.value, 0));
    const bottom = y(Math.min(d.value, 0));
    ctx.fillStyle = negative ? RED : d.value === max ? GOLD : TEAL;
    ctx.fillRect(cx - barW / 2, top, barW, Math.max(2, bottom - top));
    ctx.fillStyle = INK;
    ctx.textBaseline = negative ? 'top' : 'bottom';
    ctx.fillText(formatValue(d.value), cx, negative ? bottom + 4 : top - 4);
  });
  xLabels(ctx, w, h, pad, series.map((d) => d.year), opts.labelStep || 1);
}

// Horizontal bars for labelled shares: [{label, value}].
export function drawHbars(canvas, rows, opts = {}) {
  const rowH = opts.rowHeight || 34;
  const { ctx, w, h } = setupCanvas(canvas, rows.length * rowH + 14);
  const max = Math.max(...rows.map((r) => r.value));
  const labelW = opts.labelWidth || 168;
  ctx.font = '13px -apple-system, "Segoe UI", Roboto, sans-serif';
  rows.forEach((row, i) => {
    const y = 8 + i * rowH;
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(row.label, labelW - 10, y + 11);
    const trackX = labelW;
    const trackW = w - trackX - 56;
    ctx.fillStyle = '#eee8da';
    ctx.fillRect(trackX, y, trackW, 16);
    ctx.fillStyle = opts.color || TEAL;
    ctx.fillRect(trackX, y, Math.max(2, (row.value / max) * trackW), 16);
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.fillText(formatValue(row.value) + (opts.suffix || ''), trackX + Math.max(2, (row.value / max) * trackW) + 6, y + 11);
  });
}

function niceTicks(min, max, count) {
  const step = (max - min) / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.ceil(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + 1e-9; v += s) ticks.push(round1(v));
  if (ticks.length < 2) ticks.push(round1(max));
  return ticks;
}

function round1(v) {
  return Math.round(v * 10) / 10;
}

function formatValue(v) {
  return Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100);
}

// Redraw every canvas on the page (after a view render or a resize).
export function paintCharts() {
  document.querySelectorAll('canvas.chart[data-chart]').forEach((canvas) => {
    const kind = canvas.dataset.chart;
    const data = JSON.parse(canvas.dataset.series || '[]');
    if (kind === 'line') drawLine(canvas, data, { color: canvas.dataset.color });
    if (kind === 'bars') drawBars(canvas, data);
    if (kind === 'hbars') {
      drawHbars(canvas, data, { suffix: canvas.dataset.suffix || '', color: canvas.dataset.color });
    }
  });
}
