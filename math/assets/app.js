/* Two-course 7th grade math site — app logic */
(function () {
'use strict';

/* ---------------- LaTeX subset renderer ---------------- */
const SYM = { times:'×', div:'÷', cdot:'·', pm:'±', mp:'∓', leq:'≤', le:'≤', geq:'≥', ge:'≥',
  neq:'≠', ne:'≠', approx:'≈', sim:'∼', cong:'≅', equiv:'≡', parallel:'∥', perp:'⊥',
  Rightarrow:'⇒', Leftarrow:'⇐', rightarrow:'→', leftarrow:'←', to:'→', mapsto:'↦',
  angle:'∠', triangle:'△', Delta:'Δ', alpha:'α', beta:'β', theta:'θ', pi:'π', Pi:'Π', sigma:'σ',
  star:'★', diamond:'◇', triangleleft:'◁', triangleright:'▷', square:'□', bullet:'•',
  cup:'∪', cap:'∩', subset:'⊂', in:'∈', emptyset:'∅', lfloor:'⌊', rfloor:'⌋',
  lceil:'⌈', rceil:'⌉', langle:'⟨', rangle:'⟩', cdots:'⋯', ldots:'…', dots:'…', vdots:'⋮',
  therefore:'∴', because:'∵', circ:'°', degree:'°', infty:'∞', overleftrightarrow:'↔', quad:' ', qquad:'  ' };

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function mathHTML(src) {
  let p = 0;
  const raw = () => { // literal {...} for \text
    if (src[p] !== '{') return esc(src[p++] || '');
    p++; let d = 1, out = '';
    while (p < src.length && d) { if (src[p] === '{') d++; else if (src[p] === '}') { d--; if (!d) break; } out += src[p++]; }
    p++; return esc(out);
  };
  function arg() {
    while (src[p] === ' ') p++;
    if (src[p] === '{') { p++; const h = seq('}'); if (src[p] === '}') p++; return h; }
    return atom();
  }
  function atom() {
    const c = src[p];
    if (c === undefined) return '';
    if (c === '\\') {
      p++; let cmd = '';
      while (p < src.length && /[a-zA-Z]/.test(src[p])) cmd += src[p++];
      if (!cmd) { const ch = src[p++]; return ch === ',' || ch === ';' || ch === '!' ? '' : esc(ch); }
      if (cmd === 'dfrac' || cmd === 'frac' || cmd === 'tfrac') {
        const a = arg(), b = arg();
        return '<span class="frac"><span class="n">' + a + '</span><span class="d">' + b + '</span></span>'; }
      if (cmd === 'binom' || cmd === 'dbinom') { const a = arg(), b = arg();
        return '(<span class="frac" style="vertical-align:-.45em"><span class="n" style="border:0">' + a +
               '</span><span class="d" style="border-top:0;margin-top:0">' + b + '</span></span>)'; }
      if (cmd === 'sqrt') { const a = arg(); return '<span class="sq"><span class="r">√</span><span class="g">' + a + '</span></span>'; }
      if (cmd === 'overline') return '<span class="ovl">' + arg() + '</span>';
      if (cmd === 'underline') return '<span style="border-bottom:1.2px solid currentColor">' + arg() + '</span>';
      if (cmd === 'text' || cmd === 'mathrm' || cmd === 'mbox' || cmd === 'operatorname')
        return '<span style="font-family:var(--sans);font-size:.9em">' + raw() + '</span>';
      if (cmd === 'left' || cmd === 'right') {          // \left\lfloor, \right), \left. …
        if (src[p] === '\\') { p++; let d = '';
          while (p < src.length && /[a-zA-Z]/.test(src[p])) d += src[p++];
          return SYM[d] !== undefined ? SYM[d] : ''; }
        const ch = src[p++]; return ch === '.' ? '' : esc(ch); }
      if (SYM[cmd] !== undefined) return SYM[cmd];
      return esc(cmd);
    }
    if (c === '{') { p++; const h = seq('}'); if (src[p] === '}') p++; return h; }
    p++;
    if (/[a-zA-Z]/.test(c)) return '<i>' + c + '</i>';
    return esc(c);
  }
  function seq(stop) {
    let out = '';
    while (p < src.length) {
      if (stop && src[p] === stop) break;
      if (src[p] === '^' || src[p] === '_') {
        const tag = src[p] === '^' ? 'sup' : 'sub'; p++;
        const a = arg();
        out += (a === '°') ? '°' : '<' + tag + '>' + a + '</' + tag + '>';
        continue; }
      if (src[p] === '&' || src[p] === '\n') { p++; out += ' '; continue; }
      out += atom();
    }
    return out;
  }
  return seq(null);
}

/** Render a string that mixes authored HTML with $...$ math. */
function M(s) {
  if (s == null) return '';
  s = String(s); let out = '', i = 0;
  while (i < s.length) {
    if (s[i] === '$' && (i === 0 || s[i - 1] !== '\\')) {
      let j = i + 1;
      while (j < s.length && !(s[j] === '$' && s[j - 1] !== '\\')) j++;
      out += '<span class="m">' + mathHTML(s.slice(i + 1, j)) + '</span>';
      i = j + 1;
    } else { out += s[i]; i++; }
  }
  return out;
}
/** Plain text version (for print fallbacks and aria labels). */
function plain(s) { const d = document.createElement('div'); d.innerHTML = M(s); return d.textContent; }

/* ---------------- storage ---------------- */
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
const UKEY = n => 'm3z:u:' + n.toLowerCase();
const users = () => LS.get('m3z:users', []);
function saveUsers(list) { LS.set('m3z:users', list); }
function blank(name, pace) {
  return { name, pace: pace || 'standard', course: 'accel', created: Date.now(), results: {}, mistakes: [], favs: [], days: [], reviewed: {}, reviews: 0 }; }
let S = null;                                   // current profile
function persist() { if (S) LS.set(UKEY(S.name), S); }

/* ---------------- answer checking ---------------- */
function norm(s) {
  return String(s).trim().toLowerCase()
    .replace(/[$,]/g, '').replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/−/g, '-')
    .replace(/\s*(<=|>=|<|>|=)\s*/g, '$1').replace(/\s+/g, ' ').trim();
}
function parseVal(raw) {
  let s = String(raw).trim().toLowerCase().replace(/[$,%°]/g, '').replace(/\s+/g, ' ').trim();
  let m = s.match(/^(-?)(\d+)\s+(\d+)\/(\d+)$/);            // mixed: 1 1/8
  if (m) return (m[1] ? -1 : 1) * (+m[2] + (+m[3]) / (+m[4]));
  const t = s.replace(/\s/g, '');
  m = t.match(/^(-?\d+)\/(-?\d+)$/);                         // fraction
  if (m && +m[2] !== 0) return (+m[1]) / (+m[2]);
  if (/^-?\d*\.?\d+$/.test(t) && t !== '-' && t !== '.') return parseFloat(t);
  return null;
}
function isRight(given, prob) {
  if (prob.c) return false;                                  // MC handled separately
  const g = norm(given); if (!g) return false;
  const list = [prob.a].concat(prob.alt || []);
  if (list.some(e => norm(e) === g)) return true;
  const gv = parseVal(given);
  if (gv !== null) return list.some(e => { const ev = parseVal(e); return ev !== null && Math.abs(gv - ev) < 1e-6; });
  return false;
}

/* ---------------- data helpers ---------------- */
const ALL = window.UNITS, BANK = window.BANK, CH = window.CHALLENGE, COURSES = window.COURSES;
let COURSE = COURSES.accel;     // the course being studied
let U = [];                     // its units, in course order
function setCourse(id) { COURSE = COURSES[id] || COURSES.accel; U = COURSE.units.map(i => ALL.find(u => u.id === i)).filter(Boolean); }
setCourse('accel');
/** A unit's number is its position in the active course — units are shared, positions are not. */
function courseOf(u) {
  if (u && COURSE.units.indexOf(u.id) >= 0) return COURSE;
  for (const k in COURSES) if (u && COURSES[k].units.indexOf(u.id) >= 0) return COURSES[k];
  return COURSE;
}
function unitNo(u) {
  if (!u) return '?';
  let i = COURSE.units.indexOf(u.id);
  if (i >= 0) return i + 1;
  for (const k in COURSES) { i = COURSES[k].units.indexOf(u.id); if (i >= 0) return i + 1; }
  return '?';
}
const unitById = id => ALL.find(u => u.id === id);
function probsFor(unitId) {
  const core = (BANK[unitId] || []).map(p => Object.assign({ unitId, kind: 'core' }, p));
  const amc = (CH[unitId] || []).map(p => Object.assign({ unitId, kind: 'amc', t: 4, skill: 'amc' }, p));
  return { core, amc };
}
function sessionFor(unitId, pace) {
  const { core, amc } = probsFor(unitId);
  if (pace === 'steady') return core.filter(p => p.t <= 2);
  if (pace === 'challenge') return core.filter(p => p.t >= 2).concat(amc.slice(0, 4));
  return core;
}
const done = p => S.results[p.id];
function unitStats(unitId) {
  const { core } = probsFor(unitId);
  const solved = core.filter(p => S.results[p.id] && S.results[p.id].correct).length;
  return { solved, total: core.length, pct: Math.round(solved / core.length * 100) };
}
function overall() {
  let s = 0, t = 0;
  U.forEach(u => { const st = unitStats(u.id); s += st.solved; t += st.total; });
  const amcDone = Object.keys(S.results).filter(k => k.startsWith('amc-') && S.results[k].correct).length;
  return { s, t, pct: t ? Math.round(s / t * 100) : 0, amcDone };
}
function touchDay() {
  const d = new Date().toISOString().slice(0, 10);
  if (S.days[S.days.length - 1] !== d) { S.days.push(d); if (S.days.length > 400) S.days.shift(); persist(); }
}
function streak() {
  if (!S.days.length) return 0;
  let n = 0; const day = 864e5; let cur = new Date().setHours(0, 0, 0, 0);
  const set = new Set(S.days);
  if (!set.has(new Date(cur).toISOString().slice(0, 10))) cur -= day;
  while (set.has(new Date(cur).toISOString().slice(0, 10))) { n++; cur -= day; }
  return n;
}


/* ---------------- skills, drills, spaced review ---------------- */
const SKILL_LABELS = {
  unitrate:'Unit rates', fracrate:'Rates with fractions', userate:'Using a rate', compare:'Comparing two things',
  avgrate:'Average speed', basicpct:'Percent of a number', convert:'Converting forms', multiplier:'Percent multipliers',
  pctchange:'Percent change', findoriginal:'Finding the original', successive:'Successive changes',
  addfrac:'Adding fractions', multfrac:'Multiplying fractions', divfrac:'Dividing fractions', mixed:'Mixed numbers',
  order:'Order of operations', wordfrac:'Fraction word problems', addneg:'Adding negatives', subneg:'Subtracting negatives',
  multneg:'Multiplying & dividing signs', chain:'Chains of signs', exponent:'Negatives and exponents',
  negfrac:'Negative fractions', context:'Negatives in context', mean:'Mean', median:'Median', mode:'Mode',
  meansum:'Working back from an average', mad:'Mean absolute deviation', sample:'Scaling up a sample',
  bias:'Spotting bias', centre:'Choosing a centre', capture:'Capture–recapture', basic:'Basic probability',
  complement:'Complements', backwards:'Working backwards', samplespace:'Sample spaces',
  experimental:'Experimental probability', counting:'Counting outcomes', area:'Unequal spinners',
  independent:'Independent events', replacement:'With / without replacement', combinations:'Combinations',
  dice:'Two dice', identify:'Is it proportional?', findk:'Finding the constant k', useprop:'Using a proportion',
  combine:'Combining like terms', distribute:'Distributing', evaluate:'Evaluating expressions', pattern:'Pattern rules',
  custom:'Custom operations', inverse:'Inverse relationships', translate:'Translating words', solveword:'Word problems',
  consecutive:'Consecutive integers', twoparts:'Splitting into parts', inequality:'Inequality word problems',
  geometry:'Geometry word problems', ages:'Age problems', coins:'Coin problems', rounding:'Rounding in context',
  onestep:'One-step', twostep:'Two-step', bothsides:'Variables on both sides', parens:'With parentheses',
  fractions:'Clearing fractions', special:'No solution / all solutions', wordeq:'Equations from words',
  flip:'Flipping the sign', notation:'Open & closed dots', word:'Budget problems', compound:'Compound inequalities',
  scalefactor:'Scale factor', readscale:'Reading a scale', similar:'Similar figures', areascale:'Area scaling',
  indirect:'Indirect measurement', map:'Map scales', volscale:'Volume scaling', rectangle:'Rectangles',
  triangle:'Triangles', parallelogram:'Parallelograms', trapezoid:'Trapezoids', circle:'Circles',
  perimeter:'Perimeter', composite:'Composite figures', slice:'Cross sections', solids:'Faces, edges, vertices',
  measure:'Measuring a section', nets:'Nets', prism:'Prisms', cylinder:'Cylinders', surface:'Surface area',
  pyramid:'Pyramids & cones', scaling:'Scaling volume', angles:'Angle facts', polygon:'Polygon angles',
  parallel:'Parallel lines', construct:'Constructions'
};
const skillLabel = k => SKILL_LABELS[k] || String(k).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, c => c.toUpperCase());

function unitSkills(unitId) { const seen = []; (BANK[unitId] || []).forEach(p => { if (seen.indexOf(p.skill) < 0) seen.push(p.skill); }); return seen; }
function skillStat(unitId, skill) {
  const ps = (BANK[unitId] || []).filter(p => p.skill === skill);
  const solved = ps.filter(p => S.results[p.id] && S.results[p.id].correct).length;
  const open = S.mistakes.some(m => m.unitId === unitId && m.skill === skill);
  const retried = ps.some(p => S.results[p.id] && S.results[p.id].attempts > 1);
  const state = open ? 'open' : (solved === ps.length && retried) ? 'shaky'
    : solved === ps.length ? 'solid' : retried ? 'shaky' : 'new';
  return { total: ps.length, solved, open, retried, struggled: open || retried, state };
}
const STATE_LABEL = { open: 'Needs work', shaky: 'Took a retry', solid: 'Solid', new: 'Skill' };
const STATE_COLOR = { open: 'var(--wrong)', shaky: 'var(--mark)', solid: 'var(--right)', new: '' };
/** Fresh generated problems on one skill. Falls back to fewer if the generator has few forms. */
function drillSet(unitId, skill, n) {
  n = n || 10; const out = [], seen = {};
  let seed = (Date.now() ^ (Math.random() * 1e9)) | 0;
  for (let i = 0; i < n * 10 && out.length < n; i++) {
    const p = window.makeProblem(unitId, skill, seed + i * 7919);
    if (!p) break;
    const key = p.q + '|' + (p.c || []).join('|');
    if (seen[key]) continue;
    seen[key] = 1; p.unitId = unitId; p.t = 2; out.push(p);
  }
  return out;
}
/** Units the learner has actually worked in (3+ problems attempted). */
function studiedUnits() { return U.filter(u => (BANK[u.id] || []).filter(p => S.results[p.id]).length >= 3); }
/** Skills attempted in a unit, weighted so shaky ones come back more often. */
function studiedSkills(unitId) {
  const w = {};
  (BANK[unitId] || []).forEach(p => { const r = S.results[p.id]; if (!r) return;
    w[p.skill] = (w[p.skill] || 0) + (r.attempts > 1 || !r.correct ? 3 : 1); });
  return w;
}
/** A mixed set drawn across studied units, least-recently-reviewed first, all freshly
    generated so it is genuine retrieval rather than remembering an answer. */
function reviewSet(n) {
  n = n || 10;
  const units = studiedUnits();
  if (units.length < 2) return [];
  units.sort((a, b) => (S.reviewed[a.id] || 0) - (S.reviewed[b.id] || 0));
  const out = [], seen = {};
  let seed = (Date.now() ^ (Math.random() * 1e9)) | 0;
  for (let i = 0; out.length < n && i < n * 8; i++) {
    const u = units[i % units.length], w = studiedSkills(u.id), keys = Object.keys(w);
    if (!keys.length) continue;
    const pool = []; keys.forEach(k => { for (let j = 0; j < w[k]; j++) pool.push(k); });
    const skill = pool[Math.floor(Math.random() * pool.length)];
    const p = window.makeProblem(u.id, skill, seed + i * 7919);
    const key = p ? p.q + '|' + (p.c || []).join('|') : null;
    if (p && !seen[key]) { seen[key] = 1; p.unitId = u.id; p.t = 2; out.push(p); }
  }
  return out;
}
function markReviewed(list) {
  const now = Date.now();
  list.forEach(p => { if (p.unitId) S.reviewed[p.unitId] = now; });
  S.reviews = (S.reviews || 0) + 1; persist();
}


/* ---------------- usage & progress ---------------- */
const loadProfile = name => LS.get(UKEY(name), null);
function streakOf(days) {
  if (!days || !days.length) return 0;
  const set = {}; days.forEach(d => set[d] = 1);
  const D = 864e5; let cur = new Date().setHours(0, 0, 0, 0), n = 0;
  const key = t => new Date(t).toISOString().slice(0, 10);
  if (!set[key(cur)]) cur -= D;
  while (set[key(cur)]) { n++; cur -= D; }
  return n;
}
/** Everything the report shows, computed from a raw stored profile. */
function statsFor(p) {
  if (!p) return null;
  const res = p.results || {}, ids = Object.keys(res);
  const course = COURSES[p.course] || COURSES.accel;
  const units = course.units.map(id => ALL.find(u => u.id === id)).filter(Boolean);
  const perUnit = units.map(u => {
    const bank = BANK[u.id] || [];
    return { u, solved: bank.filter(q => res[q.id] && res[q.id].correct).length, total: bank.length };
  });
  const shaky = [];
  units.forEach(u => (BANK[u.id] || []).forEach(q => {
    const r = res[q.id];
    if (r && (r.attempts > 1 || !r.correct) && shaky.indexOf(u.id + '|' + q.skill) < 0) shaky.push(u.id + '|' + q.skill);
  }));
  const D = 864e5, today = new Date().setHours(0, 0, 0, 0), days = [];
  for (let i = 13; i >= 0; i--) days.push({ t: today - i * D, n: 0 });
  let last = 0;
  ids.forEach(k => { const t = res[k].at; if (!t) return;
    if (t > last) last = t;
    const d = new Date(t).setHours(0, 0, 0, 0);
    for (const b of days) if (b.t === d) { b.n++; break; } });
  return {
    name: p.name, course, pace: PACE[p.pace] ? PACE[p.pace].label : p.pace,
    attempted: ids.length,
    solved: ids.filter(k => res[k].correct).length,
    firstTry: ids.filter(k => res[k].correct && res[k].attempts === 1).length,
    amc: ids.filter(k => k.indexOf('amc-') === 0 && res[k].correct).length,
    mistakes: (p.mistakes || []).length, favs: (p.favs || []).length,
    reviews: p.reviews || 0, daysPractised: (p.days || []).length, streak: streakOf(p.days),
    created: p.created || 0, last, perUnit, shaky, activity: days,
    totalProblems: perUnit.reduce((a, x) => a + x.total, 0)
  };
}
const fmtDate = t => t ? new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';

/** 14-day activity. One series, so no legend — the heading names it. */
function activityChart(days) {
  const max = Math.max(1, ...days.map(d => d.n));
  const W = 560, H = 96, base = H - 22, slot = W / days.length, bw = slot - 6, r = 4;
  const bars = days.map((d, i) => {
    const x = i * slot + 3, h = d.n ? Math.max(4, (d.n / max) * (base - 8)) : 2;
    const y = base - h, rr = Math.min(r, h / 2, bw / 2);
    const lab = new Date(d.t).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return `<path d="M${x} ${base} L${x} ${y + rr} Q${x} ${y} ${x + rr} ${y} L${x + bw - rr} ${y} Q${x + bw} ${y} ${x + bw} ${y + rr} L${x + bw} ${base} Z"
      class="${d.n ? 'ac-bar' : 'ac-none'}"><title>${lab}: ${d.n} problem${d.n === 1 ? '' : 's'}</title></path>`
      + (d.n === max && max > 1 ? `<text x="${x + bw / 2}" y="${y - 6}" class="ac-val">${d.n}</text>` : '');
  }).join('');
  const tick = i => new Date(days[i].t).toLocaleDateString('en-US', { day: 'numeric' });
  return `<svg viewBox="0 0 ${W} ${H}" class="fig" role="img"><title>Problems answered on each of the last 14 days</title>
    <line x1="0" y1="${base}" x2="${W}" y2="${base}" class="ac-axis"/>${bars}
    ${[0, 4, 9, 13].map(i => `<text x="${i * slot + bw / 2}" y="${H - 6}" class="ac-tick">${tick(i)}</text>`).join('')}</svg>`;
}

/* ---------------- tiny DOM helpers ---------------- */
const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const go = h => { location.hash = h; };
/** Colour by order of sign-up, so people sharing a computer never collide. */
function avClass(n) {
  const i = users().map(u => u.toLowerCase()).indexOf(String(n || '').toLowerCase());
  return ['', 'z2', 'z3'][(i < 0 ? 0 : i) % 3];
}
const PACE = {
  steady:   { label: 'Steady',   note: 'Warm-ups first, hints always in reach, shorter sets.' },
  standard: { label: 'Standard', note: 'The full set for each unit, hints when you ask.' },
  challenge:{ label: 'Challenge',note: 'Skips the warm-ups and mixes in AMC problems.' }
};

/* ---------------- login ---------------- */
function renderLogin() {
  const list = users();
  const box = $('#login'); box.hidden = false; $('#app').hidden = true;
  const presets = window.PRESETS || [];
  const seen = presets.map(n => n.toLowerCase());
  const known = presets.concat(list.filter(n => seen.indexOf(n.toLowerCase()) < 0));
  const cardFor = (n, i) => {
    const p = LS.get(UKEY(n), null);
    const solved = p ? Object.keys(p.results || {}).filter(k => p.results[k].correct).length : 0;
    const c = p && COURSES[p.course] ? COURSES[p.course].short : null;
    return `<button class="pick" data-n="${n}"><span class="av ${avClass(n)}">${n[0].toUpperCase()}</span>
      <b>${n}</b><span>${p ? solved + ' solved · ' + c : 'start here'}</span></button>`;
  };
  box.innerHTML = `<div class="lcard">
    <h1>${window.SITE_TITLE || 'Math Practice'}</h1>
    <p class="sub">Two 7th grade courses, ${ALL.length} units between them, with worked examples, drills and AMC challenges mixed in.</p>
    ${known.length ? `<div class="pickrow">${known.map(cardFor).join('')}</div>` : ''}
    ${known.length > 1 ? `<p style="font-size:.8rem;color:var(--ink3);margin:0 0 4px">Sharing this computer? Pick your own name each time — progress, mistakes and saved problems are kept separately for each name.</p>` : ''}
    <div class="or">${known.length ? 'or' : 'choose a username'}</div>
    ${known.length ? '' : `<p style="font-size:.85rem;color:var(--ink2);margin:0 0 10px">Pick any name you like. It is remembered on this device, so next time you just tap it — and everyone who uses this computer keeps their own progress.</p>`}
    <div class="row" style="gap:8px">
      <input type="text" id="newname" placeholder="Type a username" maxlength="18" style="max-width:none">
      <button class="btn pri" id="newgo">Start</button>
    </div>
    <div class="or">which class?</div>
    <div class="paceopts" id="courseopts">
      ${Object.values(COURSES).map(c => `<button class="paceopt" data-c="${c.id}" aria-pressed="${c.id === 'accel'}">
        <span class="rd"></span><span><b>${c.name}</b><span>${c.blurb}</span></span></button>`).join('')}
    </div>
    <div class="or">choose a pace</div>
    <div class="paceopts" id="paceopts">
      ${Object.entries(PACE).map(([k, v]) => `<button class="paceopt" data-p="${k}" aria-pressed="${k === 'standard'}">
        <span class="rd"></span><span><b>${v.label}</b><span>${v.note}</span></span></button>`).join('')}
    </div>
    <p style="font-size:.78rem;color:var(--ink3);margin:16px 0 0">The class and pace above apply when you start a <strong>new</strong> name. A name you have used before keeps its own settings, and both can be changed at any time from the bar at the top. Everything is saved in this browser only.</p>
    <button class="btn" style="width:100%;margin-top:12px" id="guest">Just practise, no name</button>
  </div>`;
  let pace = null, course = null;   // null = untouched, so existing profiles keep their own
  box.querySelectorAll('.paceopt[data-p]').forEach(b => b.onclick = () => {
    pace = b.dataset.p;
    box.querySelectorAll('.paceopt[data-p]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  box.querySelectorAll('.paceopt[data-c]').forEach(b => b.onclick = () => {
    course = b.dataset.c;
    box.querySelectorAll('.paceopt[data-c]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  box.querySelectorAll('[data-n]').forEach(b => b.onclick = () => signIn(b.dataset.n, pace, course));
  $('#newgo').onclick = () => { const v = $('#newname').value.trim(); if (v) signIn(v, pace, course); };
  $('#newname').onkeydown = e => { if (e.key === 'Enter') $('#newgo').click(); };
  $('#guest').onclick = () => signIn('Guest', pace, course);
}
function signIn(name, pace, course) {
  const key = UKEY(name);
  const existing = LS.get(key, null);
  S = existing || blank(name, pace);
  S.name = name;
  S.reviewed = S.reviewed || {}; S.reviews = S.reviews || 0;   // profiles made before review existed
  if (!existing) { S.pace = pace || 'standard'; S.course = course || 'accel'; }
  else { if (pace) S.pace = pace; if (course) S.course = course; }
  if (!PACE[S.pace]) S.pace = 'standard';
  if (!COURSES[S.course]) S.course = 'accel';
  setCourse(S.course);                                          // after the course is settled, not before
  const list = users(); if (!list.some(u => u.toLowerCase() === name.toLowerCase())) { list.push(name); saveUsers(list); }
  LS.set('m3z:last', name); persist(); touchDay();
  $('#login').hidden = true; $('#app').hidden = false;
  buildRail(); buildWho(); if (!location.hash || location.hash === '#') go('#/'); else render();
}
function signOut() { S = null; LS.del('m3z:last'); location.hash = ''; renderLogin(); }

/* ---------------- chrome ---------------- */
function ring(pct) {
  const c = 2 * Math.PI * 7;
  return `<svg class="ring" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7" fill="none"
    stroke="var(--rule)" stroke-width="2.5"/><circle cx="9" cy="9" r="7" fill="none" stroke="${pct === 100 ? 'var(--right)' : 'var(--accent)'}"
    stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"
    transform="rotate(-90 9 9)"/></svg>`;
}
function buildRail() {
  const groups = {};
  U.forEach(u => (groups[u.strand] = groups[u.strand] || []).push(u));
  $('#rail').innerHTML = `
    <div class="rail-top"><button class="brand" id="home"><b>${window.BRAND || 'Math 3Zs'}</b><span>${COURSE.name}</span></button></div>
    <div class="rail-scroll">
      ${Object.entries(groups).map(([k, us]) => `<div class="strand-h">${window.STRANDS[k].name}</div>` +
        us.map(u => { const st = unitStats(u.id);
          return `<button class="unit-link" data-u="${u.id}"><span class="n">${unitNo(u)}</span>
            <span>${u.title}</span>${ring(st.pct)}</button>`; }).join('')).join('')}
    </div>
    <div class="rail-foot">
      <button class="navbtn" data-nav="#/progress">◔ <span>Progress</span></button>
      <button class="navbtn" data-nav="#/review">⟳ <span>Mixed review</span></button>
      <button class="navbtn" data-nav="#/mistakes">↻ <span>My mistakes</span><span class="cnt" id="mcount"></span></button>
      <button class="navbtn" data-nav="#/favourites">★ <span>Saved problems</span><span class="cnt" id="fcount"></span></button>
      <button class="navbtn" data-nav="#/print">⎙ <span>Print centre</span></button>
    </div>`;
  $('#home').onclick = () => go('#/');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.onclick = () => { go('#/u/' + b.dataset.u + '/learn'); closeNav(); });
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.onclick = () => { go(b.dataset.nav); closeNav(); });
  refreshCounts();
}
function refreshCounts() {
  const m = $('#mcount'), f = $('#fcount');
  if (m) { m.textContent = S.mistakes.length || ''; m.style.display = S.mistakes.length ? '' : 'none'; }
  if (f) { f.textContent = S.favs.length || ''; f.style.display = S.favs.length ? '' : 'none'; }
}
function buildWho() {
  $('#who').innerHTML = `<span class="av ${avClass(S.name)}">${S.name[0].toUpperCase()}</span>
    <b>${S.name}</b><button class="sw" id="courseBtn" title="Switch course">${COURSE.short}</button>
    <button class="sw" id="paceBtn" title="Change pace">${PACE[S.pace].label}</button>
    <button class="sw" id="outBtn" title="Switch user">switch</button>`;
  $('#courseBtn').onclick = cycleCourse;
  $('#paceBtn').onclick = cyclePace;
  $('#outBtn').onclick = signOut;
}
function cycleCourse() {
  const ks = Object.keys(COURSES);
  S.course = ks[(ks.indexOf(S.course) + 1) % ks.length];
  setCourse(S.course); persist(); buildRail(); buildWho(); go('#/'); render();
}
function cyclePace() {
  const ks = Object.keys(PACE); S.pace = ks[(ks.indexOf(S.pace) + 1) % ks.length];
  persist(); buildWho(); render();
}
function closeNav() { document.body.classList.remove('nav'); }

/* ---------------- views ---------------- */
function render() {
  const h = (location.hash || '#/').slice(1);
  const v = $('#view'); v.scrollTop = 0; window.scrollTo(0, 0);
  const d = h.match(/^\/drill\/([\w]+)\/([\w]+)/);
  if (d && unitById(d[1])) return viewDrill(d[1], d[2]);
  if (h.startsWith('/review')) return viewReview();
  if (h.startsWith('/progress')) return viewProgress(decodeURIComponent((h.split('/')[2] || '')));
  const m = h.match(/^\/u\/([\w]+)(?:\/(\w+))?/);
  if (m && unitById(m[1])) return viewUnit(m[1], m[2] || 'learn');
  if (h.startsWith('/mistakes')) return viewMistakes();
  if (h.startsWith('/favourites')) return viewFavs();
  if (h.startsWith('/print')) return viewPrintCentre();
  viewHome();
  function viewHome() {
    const o = overall(), st = streak();
    const nextUnit = U.find(u => unitStats(u.id).pct < 100) || U[0];
    v.innerHTML = `<div class="wrap wide">
      <p class="eyebrow">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      <h1 style="font-size:2.1rem;margin:6px 0 4px;letter-spacing:-.02em">Hello, ${S.name}.</h1>
      <p class="lead" style="margin-bottom:24px;max-width:56ch">${st > 1 ? `You have practised ${st} days in a row. ` : ''}Pick up where you left off in <strong>${nextUnit.title}</strong>, or choose any unit below.</p>
      <div class="grid g3" style="margin-bottom:28px">
        <div class="stat"><div class="v">${o.s}<span style="font-size:1rem;color:var(--ink3)">/${o.t}</span></div><div class="l">problems solved</div></div>
        <div class="stat"><div class="v">${o.pct}%</div><div class="l">of the course</div>
          <div class="bar" style="margin-top:8px"><i style="width:${o.pct}%"></i></div></div>
        <div class="stat"><div class="v">${o.amcDone}</div><div class="l">AMC challenges cleared</div></div>
        <div class="stat"><div class="v">${S.mistakes.length}</div><div class="l">to review</div>
          ${S.mistakes.length ? `<button class="btn sm" style="margin-top:8px" data-nav="#/mistakes">Review now</button>` : ''}</div>
      </div>
      ${studiedUnits().length >= 2 ? `<button class="ucard" data-nav="#/review" style="margin-bottom:28px">
        <span class="rail-strip" style="background:var(--mark)"></span>
        <p class="eyebrow" style="padding-left:.75rem">Spaced practice</p>
        <h4>Mixed review — ${studiedUnits().length} units in play</h4>
        <p>Ten problems jumping between everything you have studied, with fresh numbers. Ten minutes here does more for remembering than ten more problems in one unit.</p>
        <div class="meta"><span class="pct" style="color:var(--mark)">Start review &rarr;</span></div></button>` : ''}
      ${Object.entries(U.reduce((a, u) => { (a[u.strand] = a[u.strand] || []).push(u); return a; }, {})).map(([k, us]) => `
        <h2 style="font-size:1.15rem;margin:26px 0 12px">${window.STRANDS[k].name}</h2>
        <div class="grid g2">${us.map(u => { const s = unitStats(u.id);
          return `<button class="ucard" data-u="${u.id}"><span class="rail-strip"></span>
            <p class="eyebrow" style="padding-left:.75rem">Unit ${unitNo(u)}</p><h4>${u.title}</h4><p>${plain(u.big)}</p>
            <div class="meta"><div class="bar"><i style="width:${s.pct}%"></i></div><span class="pct">${s.solved}/${s.total}</span></div>
          </button>`; }).join('')}</div>`).join('')}
    </div>`;
    wire(v);
  }
}
function wire(root) {
  root.querySelectorAll('[data-u]').forEach(b => b.onclick = () => go('#/u/' + b.dataset.u + '/learn'));
  root.querySelectorAll('[data-nav]').forEach(b => b.onclick = () => go(b.dataset.nav));
}

/* ---------- unit ---------- */
function viewUnit(id, tab) {
  const u = unitById(id), v = $('#view'), st = unitStats(id);
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', b.dataset.u === id));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', 'false'));
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">Unit ${unitNo(u)} · ${window.STRANDS[u.strand].name}</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">${u.title}</h1>
    <p class="lead" style="max-width:62ch">${M(u.big)}</p>
    <div class="row" style="margin:18px 0 20px">
      <div class="bar" style="max-width:220px"><i style="width:${st.pct}%"></i></div>
      <span class="pct">${st.solved} of ${st.total} solved</span>
    </div>
    <div class="tabs">
      ${[['learn','Learn'],['practice','Practice'],['drills','Drills'],['challenge','AMC challenge'],['print','Print']].map(([k, l]) =>
        `<button class="tab" data-t="${k}" aria-selected="${k === tab}">${l}</button>`).join('')}
    </div>
    <div id="tabbody"></div></div>`;
  v.querySelectorAll('[data-t]').forEach(b => b.onclick = () => go('#/u/' + id + '/' + b.dataset.t));
  const body = $('#tabbody');
  if (tab === 'practice') return runSession(body, u, sessionFor(id, S.pace), 'practice');
  if (tab === 'drills') return drillsBody(body, u);
  if (tab === 'challenge') return runSession(body, u, probsFor(id).amc.map(p => Object.assign({ t: 4 }, p)), 'challenge');
  if (tab === 'print') return unitPrintPanel(body, u);
  learnBody(body, u);
}

function learnBody(body, u) {
  body.innerHTML = `
    <div class="figwrap">${window.figure(u.fig)}</div>
    ${u.sections.map(s => `<section class="sec"><h3>${M(s.h)}</h3>
      ${s.p.map(p => `<p>${M(p)}</p>`).join('')}
      ${s.box ? `<div class="box ${s.box.k}"><h4>${s.box.h}</h4><p>${M(s.box.t)}</p></div>` : ''}</section>`).join('')}
    <section class="sec"><h3>Worked examples</h3>
      ${u.examples.map((e, i) => `<div class="ex">
        <header><span class="eyebrow">Example ${i + 1}</span><b>${M(e.t)}</b></header>
        <div class="q">${M(e.q)}</div>
        <ol class="steps">${e.steps.map(s => `<li><div><div class="do">${M(s.do)}</div><div class="why">${M(s.why)}</div></div></li>`).join('')}</ol>
        <div class="ans">Answer: ${M(e.ans)}</div></div>`).join('')}
    </section>
    <section class="sec"><h3>Words to know</h3>
      <div class="vocab">${u.vocab.map(([t, d]) => `<div><dt>${M(t)}</dt><dd>${M(d)}</dd></div>`).join('')}</div></section>
    <section class="sec"><h3>Mistakes to watch for</h3>
      <ul class="mist">${u.mistakes.map(m => `<li><span>${M(m)}</span></li>`).join('')}</ul></section>
    <div class="row" style="margin-top:32px">
      <button class="btn pri" data-t2="practice">Start practising →</button>
      <button class="btn" id="plesson">⎙ Print this lesson</button>
    </div>`;
  body.querySelectorAll('[data-t2]').forEach(b => b.onclick = () => go('#/u/' + u.id + '/' + b.dataset.t2));
  $('#plesson').onclick = () => doPrint([lessonSheet(u)], 'Unit ' + unitNo(u) + ' lesson sheet');
}

/* ---------- problem session ---------- */
function runSession(body, u, list, mode) {
  if (!list.length) { body.innerHTML = `<div class="empty"><b>Nothing here yet</b>Try another tab.</div>`; return; }
  let i = 0;
  const state = list.map(() => null);
  body.innerHTML = `<div class="prog" id="prog"></div><div id="slot"></div>
    <p style="font-size:.82rem;color:var(--ink3);margin-top:16px">
      ${mode === 'drill' ? 'Every problem here is generated fresh, so the numbers are new each time. Repetition on one skill is the point — take the hints freely.'
        : mode === 'review' ? 'These jump between units on purpose. Feeling rusty on something you once knew is normal, and working through it is exactly what fixes it.'
        : mode === 'challenge' ? 'These are competition problems in the AMC 8 style, matched to this unit. They are meant to be slow going — that is the point.'
        : S.pace === 'steady' ? 'Steady pace: warm-ups first, and the hint button is always there. Take as long as you like.'
        : 'Tip: after any problem you can press <b>More like this</b> for a freshly generated question on the same skill.'}</p>`;
  const prog = $('#prog');
  function drawProg() {
    prog.innerHTML = list.map((p, k) => `<button class="pip" data-i="${k}" title="Problem ${k + 1}"
      data-s="${k === i ? 'now' : state[k] === true ? 'ok' : state[k] === false ? 'no' : ''}"></button>`).join('');
    prog.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { i = +b.dataset.i; show(); });
  }
  function show() {
    drawProg();
    playProblem($('#slot'), list[i], {
      unit: u, index: i, total: list.length,
      showUnit: mode === 'review',
      onResult: ok => { state[i] = ok; drawProg(); },
      onNext: () => { if (i < list.length - 1) { i++; show(); } else finish(); }
    });
  }
  function finish() {
    const ok = state.filter(x => x === true).length;
    $('#slot').innerHTML = `<div class="player"><div class="pl-body" style="text-align:center;padding:40px 24px">
      <p class="eyebrow">Set complete</p>
      <div style="font-family:var(--disp);font-size:3rem;font-weight:700;line-height:1;margin:10px 0">${ok}/${list.length}</div>
      <p style="color:var(--ink2);max-width:42ch;margin:0 auto 20px">${
        ok === list.length ? 'Every one correct. Try the AMC challenge tab for something harder.'
        : `${list.length - ok} to look at again — they are waiting in <strong>My mistakes</strong>, where you can retry them or ask for similar problems.`}</p>
      <div class="row" style="justify-content:center">
        <button class="btn pri" id="again">Start over</button>
        ${ok < list.length ? '<button class="btn" data-nav="#/mistakes">Review mistakes</button>' : ''}
        <button class="btn" data-nav="#/u/${u.id}/${mode === 'challenge' ? 'learn' : 'challenge'}">${mode === 'challenge' ? 'Back to the lesson' : 'AMC challenge →'}</button>
      </div></div></div>`;
    $('#again').onclick = () => {
      if (mode === 'drill' && list[0] && list[0].unitId) return viewDrill(list[0].unitId, list[0].skill);
      if (mode === 'review') return go('#/review');
      i = 0; state.fill(null); show(); };
    wire($('#slot'));
  }
  show();
}

/** Render one problem into `slot`. opts: {unit, index, total, onResult, onNext, standalone} */
function playProblem(slot, p, opts) {
  opts = opts || {};
  const u = opts.unit, mc = !!p.c;
  let picked = null, answered = false, hinted = false;
  const tierLab = p.kind === 'amc' || p.t === 4 ? ['amc', 'AMC challenge'] :
    p.t === 1 ? ['t1', 'Warm-up'] : p.t === 3 ? ['t3', 'Stretch'] : ['t2', 'Core'];
  const isFav = () => S.favs.some(f => f.id === p.id);

  slot.innerHTML = `<div class="player">
    <div class="pl-head">
      <span class="chip ${tierLab[0]}">${tierLab[1]}</span>
      ${p.generated && !opts.showUnit ? '<span class="chip t2">Fresh problem</span>' : ''}
      ${opts.showUnit && p.unitId && unitById(p.unitId) ? `<span class="chip t2">Unit ${unitById(p.unitId).n} · ${unitById(p.unitId).title}</span>` : ''}
      ${opts.total ? `<span style="font-size:.8rem;color:var(--ink3);font-weight:600">${opts.index + 1} of ${opts.total}</span>` : ''}
      <div class="sp" style="flex:1"></div>
      <button class="btn sm star" id="fav" aria-pressed="${isFav()}" title="Save this problem">★ <span>${isFav() ? 'Saved' : 'Save'}</span></button>
    </div>
    <div class="pl-body">
      <div class="qtext">${M(p.q)}</div>
      ${mc ? `<div class="choices">${p.c.map((c, k) =>
          `<button class="choice" data-k="${k}"><span class="k">${'ABCDE'[k]}</span><span>${M(c)}</span></button>`).join('')}</div>`
        : `<div class="answerbar">
            <input type="text" id="ans" placeholder="your answer" autocomplete="off" autocapitalize="off" spellcheck="false">
            ${p.unit ? `<span class="unitlab">${M(p.unit)}</span>` : ''}
            <button class="btn pri" id="check">Check</button></div>
           <p style="font-size:.78rem;color:var(--ink3);margin:8px 0 0">Fractions are fine — type them like <code>3/8</code> or <code>1 1/2</code>.</p>`}
      <div id="fbslot"></div>
    </div>
    <div class="pl-foot">
      <button class="btn sm" id="hint">💡 Hint</button>
      <button class="btn sm" id="more">↻ More like this</button>
      <div class="sp"></div>
      ${opts.onNext ? `<button class="btn sm" id="skip">Skip</button><button class="btn pri sm" id="next" disabled>Next →</button>` : ''}
    </div></div>`;

  const fb = slot.querySelector('#fbslot');
  slot.querySelector('#fav').onclick = e => {
    const b = e.currentTarget;
    if (isFav()) S.favs = S.favs.filter(f => f.id !== p.id);
    else S.favs.unshift({ id: p.id, unitId: p.unitId || (u && u.id), at: Date.now(), snap: p });
    persist(); refreshCounts();
    b.setAttribute('aria-pressed', isFav()); b.querySelector('span').textContent = isFav() ? 'Saved' : 'Save';
  };
  slot.querySelector('#hint').onclick = () => {
    if (hinted) return; hinted = true;
    const h = el('div', 'hintbox', `<strong style="font-family:var(--sans);font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--mark);display:block;margin-bottom:4px">Hint</strong>${M(p.hint || 'Look back at the worked examples in the lesson — this uses the same move.')}`);
    fb.appendChild(h);
  };
  slot.querySelector('#more').onclick = () => {
    const uid = p.unitId || (u && u.id);
    const skills = window.genSkills(uid);
    const sk = skills.includes(p.skill) ? p.skill : skills[Math.floor(Math.random() * skills.length)];
    const np = window.makeProblem(uid, sk);
    if (np) { np.unitId = uid; playProblem(slot, np, { unit: u, standalone: true }); }
    else fb.appendChild(el('div', 'hintbox', 'No generator for this skill yet — try another problem in the set.'));
  };
  if (opts.onNext) {
    slot.querySelector('#skip').onclick = opts.onNext;
    slot.querySelector('#next').onclick = opts.onNext;
  }
  if (mc) slot.querySelectorAll('.choice').forEach(b => b.onclick = () => {
    if (answered) return; picked = +b.dataset.k;
    slot.querySelectorAll('.choice').forEach(x => x.dataset.state = x === b ? 'sel' : '');
    judge(picked === p.a, p.c[picked]);
  });
  else {
    const inp = slot.querySelector('#ans');
    const submit = () => { if (answered) return; const val = inp.value; if (!val.trim()) { inp.focus(); return; } judge(isRight(val, p), val); };
    slot.querySelector('#check').onclick = submit;
    inp.onkeydown = e => { if (e.key === 'Enter') submit(); };
    setTimeout(() => { if (!opts.standalone) inp.focus({ preventScroll: true }); }, 30);
  }

  function judge(ok, given) {
    answered = true; touchDay();
    const prev = S.results[p.id] || { attempts: 0 };
    S.results[p.id] = { correct: ok || prev.correct === true, attempts: prev.attempts + 1, at: Date.now() };
    if (mc) slot.querySelectorAll('.choice').forEach((x, k) => {
      x.disabled = true;
      x.dataset.state = k === p.a ? 'right' : (k === picked && !ok) ? 'wrong' : '';
    });
    else { const inp = slot.querySelector('#ans'); inp.disabled = true;
      slot.querySelector('#check').disabled = true;
      inp.style.borderColor = ok ? 'var(--right)' : 'var(--wrong)'; }

    const box = el('div', 'fb ' + (ok ? 'ok' : 'no'));
    box.innerHTML = ok
      ? `<b>Correct.</b>${p.t === 4 || p.kind === 'amc' ? 'That is a competition-level problem — well done.' : 'On to the next one.'}`
      : `<b>Not quite.</b>You answered ${mc ? '<span class="m">' + mathHTML(String(given)) + '</span>' : '<strong>' + esc(String(given)) + '</strong>'}. The answer is <strong>${mc ? M(p.c[p.a]) : M(String(p.a))}${p.unit && !mc ? ' ' + plain(p.unit) : ''}</strong>.`;
    fb.appendChild(box);

    const sol = el('div', 'soln', `<b>How it works</b><ol>${(p.s || p.steps || []).map(s => `<li>${M(s)}</li>`).join('')}</ol>`);
    fb.appendChild(sol);

    if (!ok) {
      if (!S.mistakes.some(m => m.id === p.id))
        S.mistakes.unshift({ id: p.id, unitId: p.unitId || (u && u.id), given: String(given), at: Date.now(),
          note: '', skill: p.skill || '', snap: p });
      const nb = el('div', 'notebox');
      nb.innerHTML = `<label for="note-${p.id}">What went wrong? (saved with this problem for your review list)</label>
        <textarea id="note-${p.id}" placeholder="e.g. I forgot to flip the inequality sign when I divided by -4"></textarea>`;
      fb.appendChild(nb);
      const ta = nb.querySelector('textarea');
      const existing = S.mistakes.find(m => m.id === p.id);
      if (existing && existing.note) ta.value = existing.note;
      ta.oninput = () => { const m = S.mistakes.find(x => x.id === p.id); if (m) { m.note = ta.value; persist(); } };
      const uid0 = p.unitId || (u && u.id);
      const canDrill = uid0 && p.skill && window.genSkills(uid0).indexOf(p.skill) > -1;
      const btn = el('div', 'row', `<button class="btn sm" id="retry">Try this one again</button>
        <button class="btn sm" id="sim">One more like it</button>
        ${canDrill ? '<button class="btn sm pri" id="drill">Drill this skill (10) →</button>' : ''}`);
      btn.style.marginTop = '12px'; fb.appendChild(btn);
      btn.querySelector('#retry').onclick = () => playProblem(slot, p, opts);
      btn.querySelector('#sim').onclick = () => slot.querySelector('#more').click();
      if (btn.querySelector('#drill')) btn.querySelector('#drill').onclick = () => go('#/drill/' + uid0 + '/' + p.skill);
    } else {
      const idx = S.mistakes.findIndex(m => m.id === p.id);
      if (idx > -1) { S.mistakes.splice(idx, 1); fb.appendChild(el('div', 'hintbox',
        '<strong>Cleared from your mistake list.</strong> You got this one right on the retry.')); }
    }
    persist(); refreshCounts();
    if (opts.onResult) opts.onResult(ok);
    const nx = slot.querySelector('#next'); if (nx) { nx.disabled = false; nx.focus({ preventScroll: true }); }
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}


/* ---------- drills: depth on one skill ---------- */
function drillsBody(body, u) {
  const skills = unitSkills(u.id);
  const shaky = skills.filter(sk => { const t = skillStat(u.id, sk).state; return t === 'open' || t === 'shaky'; });
  body.innerHTML = `
    <p class="lead" style="max-width:60ch;margin-bottom:6px">The unit set gives you only two or three goes at each skill. A drill gives you ten fresh ones on a single skill — new numbers every time, so you cannot coast on remembering an answer.</p>
    ${shaky.length ? `<div class="box warn" style="margin:18px 0"><h4>Worth a drill</h4><p>You have stumbled on ${shaky.map(sk => '<strong>' + skillLabel(sk) + '</strong>').join(', ')} in this unit.</p></div>` : ''}
    <div class="row" style="margin-top:18px">
      <button class="btn" id="ppack">⎙ Print a drill pack for every skill</button>
      <span class="unitlab">${skills.length} skills × 6 fresh problems, answers on their own pages</span></div>
    <div class="grid g2" style="margin-top:18px">${skills.map(sk => { const st = skillStat(u.id, sk);
      return `<button class="ucard" data-sk="${sk}">
        <span class="rail-strip"${STATE_COLOR[st.state] ? ` style="background:${STATE_COLOR[st.state]}"` : ''}></span>
        <p class="eyebrow" style="padding-left:.75rem">${STATE_LABEL[st.state]}</p>
        <h4>${skillLabel(sk)}</h4>
        <p>${st.solved} of ${st.total} solved${st.state === 'shaky' ? ', but you needed a second go' : st.state === 'open' ? ' — one is still in your mistake list' : ' in the unit set'}</p>
        <div class="meta"><span class="pct" style="color:var(--accent)">Drill 10 fresh &rarr;</span></div></button>`; }).join('')}</div>`;
  body.querySelectorAll('[data-sk]').forEach(b => b.onclick = () => go('#/drill/' + u.id + '/' + b.dataset.sk));
  $('#ppack').onclick = () => doPrint([drillPack(u, 6)], 'Unit ' + unitNo(u) + ' drill pack', () => [drillPack(u, 6)]);
}
function viewDrill(unitId, skill) {
  const u = unitById(unitId), v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', b.dataset.u === unitId));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', 'false'));
  const list = drillSet(unitId, skill, 10);
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">Unit ${unitNo(u)} · drill</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">${skillLabel(skill)}</h1>
    <p class="lead" style="max-width:56ch">${list.length} freshly generated problems on this one skill. Hints are on every question.</p>
    <div class="row" style="margin:18px 0 22px">
      <button class="btn sm" data-nav="#/u/${unitId}/drills">← All drills in this unit</button>
      <button class="btn sm" id="newset">↻ New set</button>
      <button class="btn sm" id="pdrill">⎙ Print this drill</button></div>
    <div id="sess"></div></div>`;
  wire(v);
  $('#newset').onclick = () => viewDrill(unitId, skill);
  const drillDoc = set => [genSheet('Unit ' + unitNo(u) + ' · ' + skillLabel(skill),
    set.length + ' problems on one skill. Show your work.', set, 'Drill · ' + skillLabel(skill), courseOf(u).name)];
  $('#pdrill').onclick = () => doPrint(drillDoc(list), skillLabel(skill) + ' drill',
    () => drillDoc(drillSet(unitId, skill, 10)));
  if (!list.length) { $('#sess').innerHTML = '<div class="empty"><b>No drill for this skill yet</b>Try another skill in the unit.</div>'; return; }
  runSession($('#sess'), u, list, 'drill');
}

/* ---------- spaced mixed review ---------- */
function viewReview() {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/review'));
  const units = studiedUnits();
  if (units.length < 2) {
    v.innerHTML = `<div class="wrap"><h1 style="font-size:2rem;margin-bottom:8px">Mixed review</h1>
      <div class="empty"><b>Not enough to review yet</b>Work through two units first. After that, this builds a short set that jumps between everything you have studied — which is what makes it stick.</div></div>`;
    return;
  }
  units.sort((a, b) => (S.reviewed[a.id] || 0) - (S.reviewed[b.id] || 0));
  const due = units.slice(0, 5);
  const ago = t => !t ? 'never reviewed' : (d => d < 1 ? 'reviewed today' : d === 1 ? 'reviewed yesterday' : 'reviewed ' + d + ' days ago')(Math.floor((Date.now() - t) / 864e5));
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">Spaced practice</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">Mixed review</h1>
    <p class="lead" style="max-width:60ch">Ten problems that jump between the units you have already studied, with fresh numbers each time. Coming back to old material after a gap is what moves it into long-term memory — far more than doing extra problems in one sitting.</p>
    <div class="row" style="margin:20px 0 26px">
      <button class="btn pri" id="startrev">Start review →</button>
      <button class="btn" id="prev">⎙ Print a review sheet</button>
      ${S.reviews ? `<span class="unitlab">${S.reviews} review${S.reviews > 1 ? 's' : ''} done</span>` : ''}
    </div>
    <h2 style="font-size:1.1rem;margin:0 0 12px">First in line</h2>
    <p style="font-size:.85rem;color:var(--ink3);margin:0 0 14px">Longest since you last saw it, first. Skills you had to retry come up more often.</p>
    <div class="grid g2">${due.map(u => { const st = unitStats(u.id);
      return `<div class="item"><div class="tagrow"><span>Unit ${unitNo(u)}</span><span>·</span><span>${ago(S.reviewed[u.id])}</span></div>
        <div style="font-family:var(--disp);font-size:1.02rem;font-weight:600">${u.title}</div>
        <div class="meta" style="padding:0"><div class="bar"><i style="width:${st.pct}%"></i></div><span class="pct">${st.solved}/${st.total}</span></div></div>`; }).join('')}</div>
    <div id="sess" style="margin-top:26px"></div></div>`;
  $('#prev').onclick = () => {
    const list = reviewSet(12);
    if (!list.length) return;
    doPrint(reviewDoc(list), 'Mixed review sheet', () => { const nl = reviewSet(12); markReviewed(nl); return reviewDoc(nl); });
    markReviewed(list);
  };
  $('#startrev').onclick = () => {
    const list = reviewSet(10);
    if (!list.length) { $('#sess').innerHTML = '<div class="empty"><b>Could not build a set</b>Try a little more practice first.</div>'; return; }
    v.innerHTML = `<div class="wrap"><p class="eyebrow">Spaced practice</p>
      <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">Mixed review</h1>
      <p class="lead" style="max-width:56ch;margin-bottom:20px">Drawn from ${new Set(list.map(p => p.unitId)).size} units. Each problem tells you which unit it came from once you answer.</p>
      <div id="sess"></div></div>`;
    runSession($('#sess'), unitById(list[0].unitId) || U[0], list, 'review');
    markReviewed(list);
  };
}


/* ---------- progress report ---------- */
function viewProgress(who) {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/progress'));
  const names = users();
  const pick = names.indexOf(who) >= 0 ? who : (names.indexOf(S.name) >= 0 ? S.name : names[0]);
  const st = statsFor(loadProfile(pick));
  if (!st) { v.innerHTML = `<div class="wrap"><h1 style="font-size:2rem">Progress</h1>
    <div class="empty"><b>Nothing recorded yet</b>Answer a few problems and this fills in.</div></div>`; return; }
  const pct = st.totalProblems ? Math.round(st.solved / st.totalProblems * 100) : 0;
  const acc = st.attempted ? Math.round(st.firstTry / st.attempted * 100) : 0;
  const active = st.activity.filter(d => d.n).length;
  v.innerHTML = `<div class="wrap wide">
    <p class="eyebrow">Progress report</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">${esc(st.name)}</h1>
    <p class="lead" style="max-width:60ch">${st.course.name} · ${st.pace} pace · last practised ${fmtDate(st.last)}${st.created ? ' · started ' + fmtDate(st.created) : ''}</p>
    ${names.length > 1 ? `<div class="row" style="margin:16px 0 0">${names.map(n =>
      `<button class="btn sm ${n === pick ? 'pri' : ''}" data-who="${esc(n)}">${esc(n)}</button>`).join('')}</div>` : ''}
    <div class="row" style="margin:16px 0 24px"><button class="btn" id="pprog">⎙ Print this report</button></div>

    <div class="grid g6" style="margin-bottom:28px">
      <div class="stat"><div class="v">${st.solved}<span style="font-size:1rem;color:var(--ink3)">/${st.totalProblems}</span></div>
        <div class="l">problems solved</div><div class="bar" style="margin-top:8px"><i style="width:${pct}%"></i></div></div>
      <div class="stat"><div class="v">${st.daysPractised}</div><div class="l">days practised</div></div>
      <div class="stat"><div class="v">${st.streak}</div><div class="l">day streak</div></div>
      <div class="stat"><div class="v">${acc}%</div><div class="l">right first time</div></div>
      <div class="stat"><div class="v">${st.amc}</div><div class="l">AMC cleared</div></div>
      <div class="stat"><div class="v">${st.reviews}</div><div class="l">mixed reviews</div></div>
    </div>

    <h2 style="font-size:1.15rem;margin:0 0 4px">Last 14 days</h2>
    <p style="font-size:.85rem;color:var(--ink3);margin:0 0 10px">Problems answered each day — ${active} of the last 14 days had practice.</p>
    <div class="figwrap" style="margin-bottom:28px">${activityChart(st.activity)}</div>

    <h2 style="font-size:1.15rem;margin:0 0 12px">Unit by unit</h2>
    <div class="grid g2" style="margin-bottom:28px">${st.perUnit.map((r, i) => `<div class="item" style="gap:6px">
      <div class="tagrow"><span>Unit ${i + 1}</span><span>·</span><span>${r.solved} of ${r.total}</span></div>
      <div style="font-family:var(--disp);font-size:.98rem;font-weight:600">${r.u.title}</div>
      <div class="bar"><i style="width:${Math.round(r.solved / r.total * 100)}%"></i></div></div>`).join('')}</div>

    ${st.shaky.length ? `<h2 style="font-size:1.15rem;margin:0 0 4px">Worth another look</h2>
      <p style="font-size:.85rem;color:var(--ink3);margin:0 0 10px">Skills that needed a second attempt, or are still in the mistake list.</p>
      <div class="row" style="margin-bottom:28px">${st.shaky.slice(0, 24).map(k => { const [uid, sk] = k.split('|');
        return `<button class="btn sm" data-dr2="${uid}/${sk}">${skillLabel(sk)} →</button>`; }).join('')}</div>` : ''}

    <p style="font-size:.78rem;color:var(--ink3)">This report is built from what is saved in this browser. It is not uploaded anywhere.</p>
  </div>`;
  v.querySelectorAll('[data-who]').forEach(b => b.onclick = () => viewProgress(b.dataset.who));
  v.querySelectorAll('[data-dr2]').forEach(b => b.onclick = () => go('#/drill/' + b.dataset.dr2));
  $('#pprog').onclick = () => doPrint([progressSheet(st)], st.name + ' — progress report');
}

/* ---------- mistakes ---------- */
function viewMistakes() {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/mistakes'));
  if (!S.mistakes.length) {
    v.innerHTML = `<div class="wrap"><h1 style="font-size:2rem;margin-bottom:8px">My mistakes</h1>
      <div class="empty"><b>Nothing to review</b>When you miss a problem it lands here, along with your note about what went wrong. Retry it, or ask for more problems on the same skill.</div></div>`;
    return;
  }
  const byUnit = {};
  S.mistakes.forEach(m => (byUnit[m.unitId] = byUnit[m.unitId] || []).push(m));
  v.innerHTML = `<div class="wrap">
    <h1 style="font-size:2rem;margin-bottom:8px">My mistakes</h1>
    <p class="lead" style="max-width:58ch;margin-bottom:8px">${S.mistakes.length} problem${S.mistakes.length > 1 ? 's' : ''} to work through. Getting one right here removes it from the list.</p>
    <div class="row" style="margin:16px 0 24px">
      <button class="btn pri" id="drill">Retry them all →</button>
      <button class="btn" id="pm">⎙ Print my review sheet</button>
    </div>
    ${Object.entries(byUnit).map(([uid, ms]) => { const u = unitById(uid);
      return `<h2 style="font-size:1.1rem;margin:24px 0 10px">Unit ${unitNo(u)} · ${u ? u.title : uid}</h2>
      <div class="grid">${ms.map(m => `<div class="item">
        <div class="tagrow"><span>missed ${new Date(m.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <span>·</span><span>you answered <strong>${esc(m.given)}</strong></span></div>
        <div class="qq">${M(m.snap.q)}</div>
        ${m.note ? `<div class="note"><strong>Your note:</strong> ${esc(m.note)}</div>` : ''}
        <div class="row"><button class="btn sm" data-retry="${m.id}">Try again</button>
          <button class="btn sm" data-sim="${m.id}">More like this</button>
          ${m.skill && window.genSkills(m.unitId).indexOf(m.skill) > -1 ? `<button class="btn sm pri" data-dr="${m.unitId}|${m.skill}">Drill this skill →</button>` : ''}
          <button class="btn sm" data-drop="${m.id}">Remove</button></div>
      </div>`).join('')}</div>`; }).join('')}
    <div id="slot" style="margin-top:24px"></div></div>`;
  const find = id => S.mistakes.find(m => m.id === id);
  v.querySelectorAll('[data-retry]').forEach(b => b.onclick = () => {
    const m = find(b.dataset.retry); if (!m) return;
    playProblem($('#slot'), m.snap, { unit: unitById(m.unitId), standalone: true });
    $('#slot').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  v.querySelectorAll('[data-sim]').forEach(b => b.onclick = () => {
    const m = find(b.dataset.sim); if (!m) return;
    const skills = window.genSkills(m.unitId);
    const sk = skills.includes(m.skill) ? m.skill : skills[0];
    const np = window.makeProblem(m.unitId, sk);
    if (np) { np.unitId = m.unitId; playProblem($('#slot'), np, { unit: unitById(m.unitId), standalone: true });
      $('#slot').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
  v.querySelectorAll('[data-dr]').forEach(b => b.onclick = () => go('#/drill/' + b.dataset.dr.replace('|', '/')));
  v.querySelectorAll('[data-drop]').forEach(b => b.onclick = () => {
    S.mistakes = S.mistakes.filter(m => m.id !== b.dataset.drop); persist(); refreshCounts(); viewMistakes(); });
  $('#drill').onclick = () => {
    const list = S.mistakes.map(m => Object.assign({}, m.snap, { unitId: m.unitId }));
    v.innerHTML = `<div class="wrap"><h1 style="font-size:2rem;margin-bottom:8px">Retry set</h1>
      <p class="lead" style="margin-bottom:20px">Every problem you have missed, in one run.</p><div id="sess"></div></div>`;
    runSession($('#sess'), unitById(list[0].unitId) || U[0], list, 'practice'); };
  $('#pm').onclick = () => doPrint([mistakeSheet()], 'Review sheet for ' + S.name);
}

/* ---------- favourites ---------- */
function viewFavs() {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/favourites'));
  if (!S.favs.length) {
    v.innerHTML = `<div class="wrap"><h1 style="font-size:2rem;margin-bottom:8px">Saved problems</h1>
      <div class="empty"><b>No saved problems yet</b>Press the ★ on any problem to keep it here — good for the ones you want to show someone, or come back to before a test.</div></div>`;
    return;
  }
  v.innerHTML = `<div class="wrap">
    <h1 style="font-size:2rem;margin-bottom:8px">Saved problems</h1>
    <p class="lead" style="max-width:58ch">${S.favs.length} kept for later.</p>
    <div class="row" style="margin:16px 0 24px">
      <button class="btn pri" id="run">Work through them →</button>
      <button class="btn" id="pf">⎙ Print these</button>
    </div>
    <div class="grid">${S.favs.map(f => { const u = unitById(f.unitId);
      return `<div class="item"><div class="tagrow"><span>Unit ${unitNo(u)} · ${u ? u.title : ''}</span>
        <span>·</span><span>saved ${new Date(f.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
        <div class="qq">${M(f.snap.q)}</div>
        <div class="row"><button class="btn sm" data-open="${f.id}">Open</button>
          <button class="btn sm star" aria-pressed="true" data-unsave="${f.id}">★ Unsave</button></div></div>`; }).join('')}</div>
    <div id="slot" style="margin-top:24px"></div></div>`;
  v.querySelectorAll('[data-open]').forEach(b => b.onclick = () => {
    const f = S.favs.find(x => x.id === b.dataset.open); if (!f) return;
    playProblem($('#slot'), f.snap, { unit: unitById(f.unitId), standalone: true });
    $('#slot').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  v.querySelectorAll('[data-unsave]').forEach(b => b.onclick = () => {
    S.favs = S.favs.filter(x => x.id !== b.dataset.unsave); persist(); refreshCounts(); viewFavs(); });
  $('#run').onclick = () => {
    const list = S.favs.map(f => Object.assign({}, f.snap, { unitId: f.unitId }));
    v.innerHTML = `<div class="wrap"><h1 style="font-size:2rem;margin-bottom:20px">Saved problems</h1><div id="sess"></div></div>`;
    runSession($('#sess'), unitById(list[0].unitId) || U[0], list, 'practice'); };
  $('#pf').onclick = () => doPrint([favSheet()], 'Saved problems');
}

/* ---------------- printing ---------------- */
const PHEAD = (title, sub, courseName) => `<div class="phead"><div><h2>${title}</h2>
  <div style="font-size:9.5pt;color:#444">${sub}</div></div>
  <div class="pm">${window.BRAND} · ${courseName || COURSE.name}<br>${new Date().toLocaleDateString('en-US')}</div></div>
  <div class="pname">Name ______________________________  Date ____________  Score ______ / ______</div>`;

function lessonSheet(u) {
  return `<div class="psheet">${PHEAD('Unit ' + unitNo(u) + ' · ' + u.title, plain(u.big), courseOf(u).name)}
    ${u.sections.map(s => `<div class="psec"><h3>${plain(s.h)}</h3>
      ${s.p.map(p => `<p>${M(p)}</p>`).join('')}
      ${s.box ? `<div class="pbox"><h4>${s.box.h}</h4><div>${M(s.box.t)}</div></div>` : ''}</div>`).join('')}
    <div class="psec"><h3>Worked examples</h3>
      ${u.examples.map((e, i) => `<div class="pex"><b>Example ${i + 1} — ${plain(e.t)}</b>
        <div style="font-family:var(--serif);margin:3pt 0">${M(e.q)}</div>
        <ol>${e.steps.map(s => `<li>${M(s.do)} <span style="color:#555;font-size:9pt">— ${plain(s.why)}</span></li>`).join('')}</ol>
        <div style="margin-top:4pt"><b>Answer:</b> ${M(e.ans)}</div></div>`).join('')}</div>
    <div class="psec"><h3>Words to know</h3><table class="pvocab">
      ${u.vocab.map(([t, d]) => `<tr><td>${plain(t)}</td><td>${M(d)}</td></tr>`).join('')}</table></div>
    <div class="psec"><h3>Mistakes to watch for</h3><ol style="font-family:var(--serif);margin:0 0 0 16pt;padding:0">
      ${u.mistakes.map(m => `<li>${M(m)}</li>`).join('')}</ol></div>
    <div class="pfoot">Unit ${unitNo(u)} lesson sheet · ${window.STRANDS[u.strand].name}</div></div>`;
}
function qBlock(p, n, workTall) {
  return `<div class="pq"><div class="pn">${n}.</div><div><div class="pt">${M(p.q)}</div>
    ${p.c ? `<div class="pchoices">${p.c.map((c, k) => `<div>(${'ABCDE'[k]}) ${M(c)}</div>`).join('')}</div>` : ''}
    <div class="pwork ${workTall ? 'tall' : ''}"></div></div></div>`;
}
function solBlock(p, n) {
  const steps = p.s || p.steps || [];
  return `<div class="psol"><b>${n}.</b> <span style="font-family:var(--serif)">${M(p.q)}</span>
    <ol>${steps.map(s => `<li>${M(s)}</li>`).join('')}</ol>
    <div class="pans">Answer: ${p.c ? '(' + 'ABCDE'[p.a] + ') ' + M(p.c[p.a]) : M(String(p.a)) + (p.unit ? ' ' + plain(p.unit) : '')}</div></div>`;
}
function problemSet(u, opts) {
  opts = opts || {};
  const { core, amc } = probsFor(u.id);
  const list = opts.withAmc ? core.concat(amc.slice(0, 5)) : core;
  return `<div class="psheet">${PHEAD('Unit ' + unitNo(u) + ' · ' + u.title, 'Problem set — ' + list.length + ' problems. Show your work.', courseOf(u).name)}
    ${list.map((p, i) => qBlock(p, i + 1, p.t >= 3)).join('')}
    <div class="pfoot">Unit ${unitNo(u)} problem set · warm-ups 1–5, core 6–12, stretch 13–16${opts.withAmc ? ', AMC challenge 17–' + list.length : ''}</div></div>`;
}
function solutionManual(u, opts) {
  opts = opts || {};
  const { core, amc } = probsFor(u.id);
  const list = opts.withAmc ? core.concat(amc.slice(0, 5)) : core;
  return `<div class="psheet">${`<div class="phead"><div><h2>Unit ${unitNo(u)} · ${u.title}</h2>
      <div style="font-size:9.5pt;color:#444">Solution manual — full worked steps</div></div>
      <div class="pm">${window.BRAND} · ${courseOf(u).name} · checking copy<br>${new Date().toLocaleDateString('en-US')}</div></div>`}
    ${list.map((p, i) => solBlock(p, i + 1)).join('')}
    <div class="psec" style="margin-top:14pt"><h3>Answer key</h3>
      <div style="columns:3;font-family:var(--serif);font-size:10pt">${list.map((p, i) =>
        `<div>${i + 1}. ${p.c ? '(' + 'ABCDE'[p.a] + ')' : plain(String(p.a))}</div>`).join('')}</div></div>
    <div class="pfoot">Unit ${unitNo(u)} solutions · keep this copy separate from the problem set</div></div>`;
}
function reviewDoc(list) {
  return [genSheet('Mixed review — ' + S.name,
    '12 problems drawn from ' + new Set(list.map(p => p.unitId)).size + ' units you have studied. Show your work.',
    list, 'Mixed review')];
}
function genSheet(title, sub, list, foot, courseName) {
  return `<div class="psheet">${PHEAD(title, sub, courseName)}
    ${list.map((p, i) => qBlock(p, i + 1, true)).join('')}
    <div class="pfoot">${foot} · solutions follow on the next page</div></div>
    <div class="psheet"><div class="phead"><div><h2>${title} — solutions</h2></div>
      <div class="pm">${window.BRAND}${courseName ? ' · ' + courseName : ''} · checking copy<br>${new Date().toLocaleDateString('en-US')}</div></div>
      ${list.map((p, i) => solBlock(p, i + 1)).join('')}</div>`;
}
/** Fresh problems on every skill in a unit, grouped by skill, with a separate answer document. */
function drillPack(u, perSkill) {
  perSkill = perSkill || 6;
  const groups = [];
  unitSkills(u.id).forEach(sk => { const list = drillSet(u.id, sk, perSkill); if (list.length) groups.push({ sk, list }); });
  let n = 0; const qs = [], ss = [];
  groups.forEach(g => {
    qs.push(`<div class="psec" style="margin-top:10pt"><h3>${skillLabel(g.sk)}</h3></div>`);
    ss.push(`<div class="psec" style="margin-top:10pt"><h3>${skillLabel(g.sk)}</h3></div>`);
    g.list.forEach(p => { n++; qs.push(qBlock(p, n, false)); ss.push(solBlock(p, n)); });
  });
  return `<div class="psheet">${PHEAD('Unit ' + unitNo(u) + ' · ' + u.title,
      'Drill pack — ' + perSkill + ' fresh problems on each of ' + groups.length + ' skills', courseOf(u).name)}
    ${qs.join('')}<div class="pfoot">Unit ${unitNo(u)} drill pack · ${n} problems · solutions follow</div></div>
    <div class="psheet"><div class="phead"><div><h2>Unit ${unitNo(u)} drill pack — solutions</h2></div>
      <div class="pm">${window.BRAND} · checking copy<br>${new Date().toLocaleDateString('en-US')}</div></div>
      ${ss.join('')}</div>`;
}

function progressSheet(st) {
  const pct = st.totalProblems ? Math.round(st.solved / st.totalProblems * 100) : 0;
  const acc = st.attempted ? Math.round(st.firstTry / st.attempted * 100) : 0;
  return `<div class="psheet">${PHEAD(st.name + ' — progress report',
      st.course.name + ' · ' + st.pace + ' pace · last practised ' + fmtDate(st.last), st.course.name)}
    <div class="psec"><h3>Summary</h3><table class="pvocab">
      <tr><td>Problems solved</td><td>${st.solved} of ${st.totalProblems} (${pct}%)</td></tr>
      <tr><td>Days practised</td><td>${st.daysPractised}${st.streak ? ', currently a ' + st.streak + '-day streak' : ''}</td></tr>
      <tr><td>Right first time</td><td>${acc}% of ${st.attempted} attempted</td></tr>
      <tr><td>AMC challenges cleared</td><td>${st.amc}</td></tr>
      <tr><td>Mixed reviews done</td><td>${st.reviews}</td></tr>
      <tr><td>Still in the mistake list</td><td>${st.mistakes}</td></tr>
    </table></div>
    <div class="psec"><h3>Unit by unit</h3><table class="pvocab">
      ${st.perUnit.map((r, i) => `<tr><td>${i + 1}. ${plain(r.u.title)}</td><td>${r.solved} of ${r.total}</td></tr>`).join('')}
    </table></div>
    ${st.shaky.length ? `<div class="psec"><h3>Worth another look</h3><p>${st.shaky.slice(0, 30)
      .map(k => plain(skillLabel(k.split('|')[1]))).join(' · ')}</p></div>` : ''}
    <div class="pfoot">Built from what is saved in this browser · ${new Date().toLocaleDateString('en-US')}</div></div>`;
}
function mistakeSheet() {
  return `<div class="psheet">${PHEAD('Review sheet for ' + S.name, S.mistakes.length + ' problems to work through again')}
    ${S.mistakes.map((m, i) => { const u = unitById(m.unitId);
      return `<div class="pq"><div class="pn">${i + 1}.</div><div>
        <div style="font-size:8.5pt;color:#555">Unit ${u ? unitNo(u) + ' · ' + u.title : ''}${m.note ? ' — your note: ' + esc(m.note) : ''}</div>
        <div class="pt">${M(m.snap.q)}</div>
        ${m.snap.c ? `<div class="pchoices">${m.snap.c.map((c, k) => `<div>(${'ABCDE'[k]}) ${M(c)}</div>`).join('')}</div>` : ''}
        <div class="pwork tall"></div></div></div>`; }).join('')}
    <div class="pfoot">Review sheet · solutions follow</div></div>
    <div class="psheet"><div class="phead"><div><h2>Review sheet — solutions</h2></div>
      <div class="pm">${window.BRAND}<br>${new Date().toLocaleDateString('en-US')}</div></div>
      ${S.mistakes.map((m, i) => solBlock(m.snap, i + 1)).join('')}</div>`;
}
function favSheet() {
  return `<div class="psheet">${PHEAD('Saved problems — ' + S.name, S.favs.length + ' problems kept for later')}
    ${S.favs.map((f, i) => qBlock(f.snap, i + 1, true)).join('')}
    <div class="pfoot">Saved problems · solutions follow</div></div>
    <div class="psheet"><div class="phead"><div><h2>Saved problems — solutions</h2></div>
      <div class="pm">${window.BRAND}<br>${new Date().toLocaleDateString('en-US')}</div></div>
      ${S.favs.map((f, i) => solBlock(f.snap, i + 1)).join('')}</div>`;
}
/* Show the document on screen, then ask for the print dialog. Sandboxed viewers
   (the published artifact runs in one) ignore window.print() silently, so the
   on-screen document is the thing that must always appear. */
let _regen = null, _sheets = '', _title = '';

/* A published artifact runs inside a sandboxed frame: window.print() is ignored there,
   and Cmd/Ctrl+P prints the PARENT page, not this one. So the reliable route is a real
   top-level window we write the document into — it prints normally. If popups are
   blocked we fall back to showing the document in-page. */
function openPrintWindow(html, title) {
  let w = null;
  try { w = window.open('', '_blank'); } catch (e) { return false; }
  if (!w || !w.document) return false;
  const css = Array.prototype.map.call(document.querySelectorAll('style'), s => s.textContent).join('\n');
  const fonts = document.querySelector('link[href*="fonts.googleapis"]');
  // The window's <title> becomes the default PDF filename, so keep it meaningful.
  const clean = String(title || 'Print').replace(/[<>]/g, '');
  try {
    w.document.open();
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>' + clean + '</title>' +
      (fonts ? '<link rel="stylesheet" href="' + fonts.getAttribute('href') + '">' : '') +
      '<style>' + css + '</style>' +
      '<style>body{background:#fff;margin:0}#printview{position:static;overflow:visible;background:#fff}' +
      '.pdoc{box-shadow:none;margin:0 auto}@media screen{.pdoc{margin:0 auto 24px}}' +
      '.pvbar{position:sticky;top:0;z-index:9;display:flex;gap:14px;align-items:center;flex-wrap:wrap;' +
      'padding:12px 18px;background:#f4f6f4;border-bottom:1px solid #c9d2cc;' +
      "font:14px 'Public Sans',system-ui,sans-serif;color:#16211F}" +
      '.pvbar b.t{font:600 15px/1.2 Fraunces,Georgia,serif;margin-right:auto}' +
      '.pvbar button{font:600 14px/1 inherit;background:#17627A;color:#fff;border:0;border-radius:8px;' +
      'padding:10px 16px;cursor:pointer}' +
      '.pvbar .how{flex-basis:100%;font-size:13px;color:#4a5a54;line-height:1.5}' +
      '@media print{.pvbar{display:none!important}}</style>' +
      '</head><body class="pv">' +
      '<div class="pvbar"><b class="t">' + clean + '</b>' +
      '<button id="pvGo" type="button">Print / Save as PDF</button>' +
      '<span class="how">To get a PDF: press <b>&#8984;P</b> (Mac) or <b>Ctrl&#8202;+&#8202;P</b> (Windows), ' +
      'then set <b>Destination</b> or the <b>PDF</b> menu to <b>Save as PDF</b>. ' +
      'This grey bar does not print.</span></div>' +
      '<div id="printview"><div id="printroot" class="pdoc">' + html + '</div></div></body></html>');
    w.document.close();
  } catch (e) { return false; }
  // Wire the button from here — an inline handler would be refused by the page's CSP.
  try {
    const go = w.document.getElementById('pvGo');
    if (go) go.onclick = () => { try { w.print(); } catch (e) {} };
  } catch (e) {}
  setTimeout(() => { try { w.focus(); w.print(); } catch (e) {} }, 500);
  return true;
}
function doPrint(sheets, title, regen) {
  _sheets = sheets.join(''); _title = title || 'Print preview';
  _regen = regen || null;                                  // only generated sheets can be re-rolled
  if (openPrintWindow(_sheets, _title)) return;            // best case: a real printable window
  $('#printroot').innerHTML = _sheets;
  $('#pvTitle').textContent = _title;
  $('#pvNew').hidden = !regen;
  $('#printview').hidden = false;
  document.body.classList.add('pv');
  $('#printview').scrollTop = 0;
  try { window.print(); } catch (e) {}
}
function closePrint() { $('#printview').hidden = true; document.body.classList.remove('pv'); }
function unitPrintPanel(body, u) {
  body.innerHTML = `<p class="lead" style="max-width:58ch;margin-bottom:22px">Print any of these on paper and work away from the screen. The solution manual is a separate document, so a problem set can be handed over without the answers attached.</p>
    <div class="grid g2">
      ${[['lesson', 'Lesson sheet', 'The full explanation, worked examples, vocabulary and the mistakes to watch for.'],
         ['set', 'Problem set', 'All 16 problems with ruled space for working. No answers.'],
         ['setamc', 'Problem set + AMC', 'The same 16 plus five AMC challenge problems.'],
         ['sol', 'Solution manual', 'Every problem with full steps, plus a compact answer key.'],
         ['solamc', 'Solution manual + AMC', 'Solutions for the extended set.'],
         ['all', 'Everything', 'Lesson, problem set and solution manual, in that order.']].map(([k, t, d]) =>
        `<button class="ucard" data-p="${k}"><span class="rail-strip"></span><h4>⎙ ${t}</h4><p>${d}</p></button>`).join('')}
    </div>
    <div class="box key" style="margin-top:24px"><h4>Tip</h4><p>In the print dialog, choose <strong>Save as PDF</strong> to keep a copy, or print single-sided so there is room to write.</p></div>`;
  body.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
    const k = b.dataset.p;
    const t = 'Unit ' + unitNo(u) + ' · ' + u.title;
    if (k === 'lesson') doPrint([lessonSheet(u)], t + ' — lesson');
    else if (k === 'set') doPrint([problemSet(u)], t + ' — problem set');
    else if (k === 'setamc') doPrint([problemSet(u, { withAmc: true })], t + ' — problem set + AMC');
    else if (k === 'sol') doPrint([solutionManual(u)], t + ' — solutions');
    else if (k === 'solamc') doPrint([solutionManual(u, { withAmc: true })], t + ' — solutions + AMC');
    else doPrint([lessonSheet(u), problemSet(u), solutionManual(u)], t + ' — everything');
  });
}
function viewPrintCentre() {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/print'));
  v.innerHTML = `<div class="wrap wide">
    <h1 style="font-size:2rem;margin-bottom:8px">Print centre</h1>
    <p class="lead" style="max-width:60ch;margin-bottom:24px">Class material, problem sets, drills and solutions, ready for paper. Solutions always print as their own document so a set can be worked without the answers in sight. Drill packs and review sheets are generated fresh, and the print view has a <strong>New problems</strong> button so you can re-roll the numbers without leaving the page.</p>
    <div class="row" style="margin-bottom:26px">
      <button class="btn pri" id="allLessons">⎙ All 17 lesson sheets</button>
      <button class="btn" id="allSets">⎙ All 17 problem sets</button>
      <button class="btn" id="allSols">⎙ Complete solution manual</button>
      ${studiedUnits().length >= 2 ? '<button class="btn" id="prev2">⎙ Mixed review sheet</button>' : ''}
      ${S.mistakes.length ? '<button class="btn" id="pm2">⎙ My review sheet</button>' : ''}
      ${S.favs.length ? '<button class="btn" id="pf2">⎙ My saved problems</button>' : ''}
    </div>
    <h2 style="font-size:1.15rem;margin:0 0 12px">By unit</h2>
    <div class="grid g2">${U.map(u => `<div class="item"><div class="tagrow"><span>Unit ${unitNo(u)}</span><span>·</span><span>${window.STRANDS[u.strand].name}</span></div>
      <div style="font-family:var(--disp);font-size:1.02rem;font-weight:600">${u.title}</div>
      <div class="row"><button class="btn sm" data-l="${u.id}">Lesson</button>
        <button class="btn sm" data-s="${u.id}">Problems</button>
        <button class="btn sm" data-k="${u.id}">Solutions</button>
        <button class="btn sm" data-dp="${u.id}">Drill pack</button></div></div>`).join('')}</div></div>`;
  v.querySelectorAll('[data-l]').forEach(b => b.onclick = () => doPrint([lessonSheet(unitById(b.dataset.l))], 'Unit ' + unitById(b.dataset.l).n + ' lesson sheet'));
  v.querySelectorAll('[data-s]').forEach(b => b.onclick = () => doPrint([problemSet(unitById(b.dataset.s))], 'Unit ' + unitById(b.dataset.s).n + ' problem set'));
  v.querySelectorAll('[data-k]').forEach(b => b.onclick = () => doPrint([solutionManual(unitById(b.dataset.k))], 'Unit ' + unitById(b.dataset.k).n + ' solutions'));
  v.querySelectorAll('[data-dp]').forEach(b => b.onclick = () => {
    const u = unitById(b.dataset.dp);
    doPrint([drillPack(u, 6)], 'Unit ' + unitNo(u) + ' drill pack', () => [drillPack(u, 6)]); });
  if ($('#prev2')) $('#prev2').onclick = () => {
    const list = reviewSet(12); if (!list.length) return;
    doPrint(reviewDoc(list), 'Mixed review sheet', () => { const nl = reviewSet(12); markReviewed(nl); return reviewDoc(nl); });
    markReviewed(list); };
  $('#allLessons').onclick = () => doPrint(U.map(lessonSheet), 'All 17 lesson sheets');
  $('#allSets').onclick = () => doPrint(U.map(u => problemSet(u)), 'All 17 problem sets');
  $('#allSols').onclick = () => doPrint(U.map(u => solutionManual(u, { withAmc: true })), 'Complete solution manual');
  if ($('#pm2')) $('#pm2').onclick = () => doPrint([mistakeSheet()], 'Review sheet for ' + S.name);
  if ($('#pf2')) $('#pf2').onclick = () => doPrint([favSheet()], 'Saved problems');
}

/* ---------------- boot ---------------- */
$('#pvPrint').onclick = () => {
  if (openPrintWindow(_sheets, _title)) return;
  try { window.print(); } catch (e) {}
};
$('#pvNew').onclick = () => {
  if (!_regen) return;
  _sheets = _regen().join('');
  $('#printroot').innerHTML = _sheets;
  $('#printview').scrollTop = 0;
};
$('#pvClose').onclick = closePrint;
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#printview').hidden) closePrint(); });
$('#menubtn').onclick = () => document.body.classList.toggle('nav');
$('#scrim').onclick = closeNav;
window.addEventListener('hashchange', () => { if (!$('#printview').hidden) closePrint(); if (S) render(); });
const last = LS.get('m3z:last', null);
/* On a shared computer, skipping the picker would silently drop the next person
   into whoever used it last. Only auto-resume when this browser has one profile. */
if (last && LS.get(UKEY(last), null) && users().length <= 1) signIn(last);
else renderLogin();
})();
