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
  therefore:'∴', because:'∵', circ:'°', degree:'°', infty:'∞', overleftrightarrow:'↔', quad:' ', qquad:'  ',
  sum:'∑', prod:'∏', int:'∫', ell:'ℓ', partial:'∂', nabla:'∇', propto:'∝', simeq:'≃',
  mu:'μ', gamma:'γ', Gamma:'Γ', omega:'ω', Omega:'Ω', varphi:'φ', phi:'φ', Phi:'Φ',
  lambda:'λ', Lambda:'Λ', delta:'δ', epsilon:'ε', varepsilon:'ε', rho:'ρ', tau:'τ',
  psi:'ψ', Psi:'Ψ', chi:'χ', eta:'η', zeta:'ζ', nu:'ν', xi:'ξ', Xi:'Ξ', kappa:'κ',
  iota:'ι', upsilon:'υ', Theta:'Θ',
  otimes:'⊗', oplus:'⊕', ominus:'⊖', odot:'⊙', boxtimes:'⊠', ast:'∗', bigstar:'★',
  diamondsuit:'♦', heartsuit:'♥', spadesuit:'♠', clubsuit:'♣',
  Leftrightarrow:'⇔', leftrightarrow:'↔', iff:'⇔', implies:'⇒', longrightarrow:'→', longleftarrow:'←',
  mid:'∣', nmid:'∤', notin:'∉', supset:'⊃', subseteq:'⊆', supseteq:'⊇', setminus:'∖',
  ll:'≪', gg:'≫', prime:'′', aleph:'ℵ' };

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
      /* n choose k: a two-row stack in brackets that stretch to its height — the same build as
         a column matrix. Drawn as a bar-less fraction it sank below the line beside short brackets. */
      if (cmd === 'binom' || cmd === 'dbinom' || cmd === 'tbinom') { const a = arg(), b = arg();
        return '<span class="mat binom"><b>(</b><span class="mg"><span class="mr"><span class="mc">' + a +
               '</span></span><span class="mr"><span class="mc">' + b + '</span></span></span><b>)</b></span>'; }
      if (cmd === 'sqrt') { const a = arg(); return '<span class="sq"><span class="r">√</span><span class="g">' + a + '</span></span>'; }
      if (cmd === 'overline') return '<span class="ovl">' + arg() + '</span>';
      if (cmd === 'underline') return '<span style="border-bottom:1.2px solid currentColor">' + arg() + '</span>';
      if (cmd === 'text' || cmd === 'mathrm' || cmd === 'mbox' || cmd === 'operatorname')
        return '<span style="font-family:var(--sans);font-size:.9em">' + raw() + '</span>';
      if (cmd === 'overrightarrow' || cmd === 'vec') return '<span class="ovr">' + arg() + '</span>';
      if (cmd === 'hat' || cmd === 'widehat') return '<span class="hat">' + arg() + '</span>';
      if (cmd === 'bar') return '<span class="ovl">' + arg() + '</span>';
      if (cmd === 'boxed') return '<span class="boxed">' + arg() + '</span>';
      if (cmd === 'textbf' || cmd === 'mathbf' || cmd === 'bf') return '<strong>' + arg() + '</strong>';
      if (cmd === 'textit' || cmd === 'mathit' || cmd === 'emph') return '<em>' + arg() + '</em>';
      if (cmd === 'phantom') return '<span style="visibility:hidden">' + arg() + '</span>';
      if (cmd === 'pmod') return '<span class="mo">(mod ' + arg() + ')</span>';
      if (cmd === 'mod' || cmd === 'bmod') return '<span class="mo">mod</span> ' + arg();
      /* bmatrix / pmatrix / vmatrix — rows split on \\, cells on & */
      if (cmd === 'begin') {
        const env = raw().replace(/[^a-z]/g, '');
        const endTok = '\\end{' + env + '}';
        const stop = src.indexOf(endTok, p);
        const body = stop < 0 ? src.slice(p) : src.slice(p, stop);
        p = stop < 0 ? src.length : stop + endTok.length;
        const rows = body.split('\\\\').map(r => r.split('&').map(c => mathHTML(c.trim())));
        const br = env.charAt(0) === 'p' ? ['(', ')'] : env.charAt(0) === 'v' ? ['|', '|'] :
                   env.charAt(0) === 'B' ? ['{', '}'] : ['[', ']'];
        return '<span class="mat"><b>' + br[0] + '</b><span class="mg">' +
          rows.map(r => '<span class="mr">' + r.map(c => '<span class="mc">' + c + '</span>').join('') + '</span>').join('') +
          '</span><b>' + br[1] + '</b></span>';
      }
      if (cmd === 'end') { arg(); return ''; }
      /* sizing, spacing and layout hints carry no meaning here — drop them, and their argument */
      if (/^(big|Big|bigg|Bigg)[lrm]?$/.test(cmd) || cmd === 'displaystyle' || cmd === 'textstyle' ||
          cmd === 'limits' || cmd === 'nolimits' || cmd === 'mathstrut' || cmd === 'strut') return '';
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
/* Markdown emphasis. Applied to the prose only — inside $…$ an asterisk is
   multiplication. Math is lifted out to placeholders first so that emphasis is free to
   straddle a formula, as in "**the answer is $x = 4$.**" */
function emph(t) {
  return t.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
          .replace(/(^|[\s(\[])\*(?!\s)([^*\n]+?)(?<!\s)\*(?=$|[\s.,;:!?)\]])/g, '$1<em>$2</em>');
}
function M(s) {
  if (s == null) return '';
  s = String(s);
  const math = [];
  let stripped = '', i = 0;
  while (i < s.length) {
    if (s[i] === '\\' && s[i + 1] === '$') { stripped += '$'; i += 2; continue; }  // an escaped dollar is just a dollar
    if (s[i] === '$') {
      /* $$…$$ is display math; treating it as two empty inline spans spilled the rest as plain text */
      const disp = s[i + 1] === '$';
      const open = i + (disp ? 2 : 1);
      let j = open;
      if (disp) { while (j < s.length && !(s[j] === '$' && s[j + 1] === '$')) j++; }
      else { while (j < s.length && !(s[j] === '$' && s[j - 1] !== '\\')) j++; }
      stripped += '\u0000' + math.length + '\u0000';
      math.push('<span class="m' + (disp ? ' disp' : '') + '">' + mathHTML(s.slice(open, j)) + '</span>');
      i = j + (disp ? 2 : 1);
    } else { stripped += s[i]; i++; }
  }
  /* Text keeps its few inline tags, but any other "<" is a less-than sign. Left raw, "Give the
     answer as x<number." opened a <number.> element that swallowed everything after it. */
  stripped = stripped.replace(/<(?!\/?(?:strong|em|br|b|i|sup|sub|span|code)\b)/gi, '&lt;');
  return emph(stripped).replace(/\u0000(\d+)\u0000/g, (_, n) => math[+n]);
}
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
  if (gv !== null && list.some(e => { const ev = parseVal(e); return ev !== null && Math.abs(gv - ev) < 1e-6; })) return true;
  return !!window.equivalentAnswer && list.some(e => window.equivalentAnswer(given, e));
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
/* The AMC set is stored with long field names (choices / answer / steps), but the player,
   the checker and the print sheets all read the bank's short ones (c / a / s). Without this
   an AMC problem plays as type-in with an undefined answer, and every reply is marked wrong. */
function asProb(p) {
  if (!p || p.c || !Array.isArray(p.choices)) return p;
  return Object.assign({}, p, { c: p.choices, a: p.answer, s: p.s || p.steps });
}
function probsFor(unitId) {
  const core = (BANK[unitId] || []).map(p => Object.assign({ unitId, kind: 'core' }, p));
  const amc = (CH[unitId] || []).map(p => asProb(Object.assign({ unitId, kind: 'amc', t: 4, skill: 'amc' }, p)));
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
/* ---------------- the knowledge map ---------------- */
/* PREREQ is a DAG over unit ids. Diagnosis walks it upstream against the learner's
   own results, so a wrong answer can point at the thing that actually went missing. */
const PRE = window.PREREQ || {}, SKPRE = window.SKILL_PREREQ || {};
const prereqsOf = id => PRE[id] || [];
let _unlocks = null, _depth = null;
/** Units that name this one as a prerequisite. */
function unlocks(id) {
  if (!_unlocks) { _unlocks = {};
    for (const u in PRE) for (const p of PRE[u]) (_unlocks[p] = _unlocks[p] || []).push(u); }
  return _unlocks[id] || [];
}
/** Longest path from a root — used to lay the map out in honest layers. */
function depthOf(id) {
  if (!_depth) { _depth = {};
    const d = u => { if (u in _depth) return _depth[u]; _depth[u] = 0;
      let m = 0; for (const p of prereqsOf(u)) m = Math.max(m, d(p) + 1); return _depth[u] = m; };
    for (const u in PRE) d(u); }
  return _depth[id] || 0;
}
/** How a unit is actually going, from what the learner has done in it. */
function unitState(id) {
  const ps = (BANK[id] || []);
  const tried = ps.filter(p => S && S.results[p.id]).length;
  const solved = ps.filter(p => S && S.results[p.id] && S.results[p.id].correct).length;
  const open = !!(S && S.mistakes.some(m => m.unitId === id));
  const rate = tried ? solved / tried : 0;
  // Completion after a retry is useful progress, but mastery needs independent
  // evidence across the core skills. Fresh generated work can supply it too.
  const skills = [...new Set(ps.map(p => p.skill).filter(Boolean))];
  const independent = r => r && (r.firstTryCorrect === true ||
    (r.firstTryCorrect == null && r.correct && r.attempts === 1));
  const covered = new Set(ps.filter(p => S && independent(S.results[p.id])).map(p => p.skill));
  if (S) Object.values(S.results).forEach(r => {
    if (r.unitId === id && independent(r)) covered.add(r.skill);
  });
  const enough = tried >= Math.min(6, ps.length) && skills.every(k => covered.has(k));
  const state = !tried ? 'new' : tried < 3 ? 'started'
    : rate < 0.6 ? 'weak'
    : (open && rate < 0.8) ? 'weak'
    : (open || rate < 0.85 || !enough) ? 'shaky' : 'solid';
  return { id, total: ps.length, tried, solved, open, rate, state };
}
const MAP_LABEL = { solid: 'Solid', shaky: 'Nearly there', weak: 'Needs work', started: 'Just started', new: 'Not started' };
const MAP_FILL = { solid: 'var(--right-soft)', shaky: 'var(--mark-soft)', weak: 'var(--wrong-soft)',
                   started: 'var(--accent-soft)', new: 'var(--paper)' };
const MAP_LINE = { solid: 'var(--right)', shaky: 'var(--mark)', weak: 'var(--wrong)',
                   started: 'var(--accent)', new: 'var(--rule)' };

/** Everything upstream of a unit, nearest first, with how many steps back it is. */
function upstream(id, maxDist) {
  const dist = {}; let layer = prereqsOf(id).slice(), d = 1;
  while (layer.length && d <= (maxDist || 3)) {
    const next = [];
    for (const u of layer) if (!(u in dist)) { dist[u] = d; next.push.apply(next, prereqsOf(u)); }
    layer = next; d++;
  }
  return dist;
}
/** Prerequisites worth going back to. Only what the evidence supports: something
    attempted and going badly, or a direct prerequisite never touched at all. */
function gapsFor(id, skill) {
  const dist = upstream(id, 3);
  for (const p of (skill && SKPRE[id + '.' + skill]) || []) if (!(p in dist)) dist[p] = 1;
  const out = [];
  for (const u in dist) {
    const m = unitState(u);
    if (m.state === 'solid' || m.state === 'shaky') continue;
    if (m.state === 'new' && dist[u] > 1) continue;      // an untouched distant ancestor proves nothing
    if (!m.total) continue;
    out.push(Object.assign({ dist: dist[u] }, m));
  }
  out.sort((a, b) => (a.state === 'weak' ? 0 : 1) - (b.state === 'weak' ? 0 : 1)
                  || a.dist - b.dist || a.rate - b.rate);
  return out;
}
/** Units in this course whose prerequisites are all in good shape — where to leap next. */
function readyUnits() {
  return U.filter(u => {
    const m = unitState(u.id);
    if (m.tried) return false;
    return prereqsOf(u.id).every(p => {
      const s = unitState(p).state; return s === 'solid' || s === 'shaky';
    });
  });
}
/** Units held back by something upstream, with the nearest blocker named. */
function blockedUnits() {
  const out = [];
  for (const u of U) {
    const m = unitState(u.id);
    if (m.tried) continue;
    const bad = prereqsOf(u.id).map(unitState).filter(s => s.state === 'weak');
    if (bad.length) out.push({ unit: u, blockers: bad });
  }
  return out;
}

/* ---------------- concepts: the map at the level of single ideas ---------------- */
/* A unit is too coarse to send someone back to. CONCEPTS (concepts.js) turns every term the
   lessons define into a concept and traces each problem to the ones it uses, so a wrong
   answer on a Precalculus statistics question can point at "median", taught in Grade 6. */
const CON = window.CONCEPTS || { list: [], byId: {}, forProblem: () => [], problemsOf: () => [], chain: () => [] };
/** The concepts a problem uses, most telling first. */
function conceptsOf(p, u) {
  if (!p) return [];
  return CON.forProblem(p.unitId ? p : Object.assign({ unitId: u && u.id }, p));
}
/** How a concept is going, from every stored problem that uses it, in whichever unit.
    `except` leaves one problem out — the one just missed says nothing new about the idea. */
function conceptState(c, except) {
  const ids = CON.problemsOf(c).filter(id => id !== except);
  const tried = ids.filter(id => S && S.results[id]).length;
  const solved = ids.filter(id => S && S.results[id] && S.results[id].correct).length;
  const open = !!(S && S.mistakes.some(m => ids.indexOf(m.id) > -1));
  const rate = tried ? solved / tried : 0;
  const state = !tried ? 'new' : tried < 2 && !open ? 'started'
    : rate < 0.6 ? 'weak'
    : (open && rate < 0.8) ? 'weak'
    : (open || rate < 0.85) ? 'shaky' : 'solid';
  return { tried, solved, open, rate, state, total: ids.length };
}
/** Where a concept is first taught, as a learner would say it: "Grade 6 · Centre & Spread". */
function conceptHome(c) {
  const hu = unitById(c.home);
  return `${courseOf(hu).short} · ${plain(hu.title)}`;
}
function conceptRecord(m, elsewhere) {
  return !m.tried ? `not tried ${elsewhere ? 'any other problem' : 'any problem'} that uses it yet`
    : `${m.solved} of ${m.tried} right on ${elsewhere ? 'other ' : ''}problems that use it${m.open ? ', with a miss still in your mistake list' : ''}`;
}
let _probIdx = null;
/** Every stored problem by id, ready to play, so a concept can gather its own practice set. */
function problemById(id) {
  if (!_probIdx) { _probIdx = {};
    for (const u in BANK) BANK[u].forEach(p => _probIdx[p.id] = Object.assign({ unitId: u, kind: 'core' }, p));
    for (const u in CH) probsFor(u).amc.forEach(p => _probIdx[p.id] = p); }
  return _probIdx[id];
}
/** Problems that use a concept: ones missed first, then untried, solved last; warm-ups before AMC. */
function conceptSet(c, n) {
  const rank = p => (S.results[p.id] && S.results[p.id].correct ? 2 : S.results[p.id] ? 0 : 1) * 10 + (p.t || 2);
  return CON.problemsOf(c).map(problemById).filter(Boolean).sort((a, b) => rank(a) - rank(b)).slice(0, n || 8);
}

/* ---------------- chapters: the "big units" a school tests ---------------- */
/* Schools test at the end of each chapter, every three to six weeks, with a midterm and a
   final on top. A unit here is a week or two of work, so a chapter is a run of two or three
   consecutive units in course order, split where the topic changes. */
const _chapters = {};
function chaptersOf(course) {
  course = course || COURSE;
  if (_chapters[course.id]) return _chapters[course.id];
  const runs = [];
  course.units.filter(id => unitById(id)).forEach(id => {
    const s = unitById(id).strand, r = runs[runs.length - 1];
    if (r && r.s === s) r.ids.push(id); else runs.push({ s, ids: [id] });
  });
  // A long run of one topic is cut evenly into pieces of at most three units…
  const parts = [];
  runs.forEach(r => { const k = Math.ceil(r.ids.length / 3), per = r.ids.length / k;
    for (let i = 0; i < k; i++) parts.push(r.ids.slice(Math.round(i * per), Math.round((i + 1) * per))); });
  // …and a lone unit joins its smaller neighbour, so no test covers a single unit.
  let i;
  while (parts.length > 1 && (i = parts.findIndex(p => p.length === 1)) > -1) {
    const L = parts[i - 1], R = parts[i + 1];
    const a = !L ? i : !R ? i - 1 : (L.length <= R.length ? i - 1 : i);
    parts.splice(a, 2, parts[a].concat(parts[a + 1]));
  }
  return _chapters[course.id] = parts.map((ids, k) => ({ key: 'c' + (k + 1), n: k + 1, ids,
    name: [...new Set(ids.map(id => window.STRANDS[unitById(id).strand].name))].join(' & ') }));
}
const unitSpan = ids => { const ns = ids.map(id => unitNo(unitById(id)));
  return ns.length > 1 ? 'Units ' + ns[0] + '–' + ns[ns.length - 1] : 'Unit ' + ns[0]; };
/** What a review covers: one chapter, the first half of the course (midterm), or all of it.
    `target` is the length of the practice test, `amc` the bonus problems after it. */
function testScope(key) {
  const chs = chaptersOf(), c = chs.find(x => x.key === key);
  if (c) return { key, ids: c.ids, kind: 'chapter', title: 'Chapter ' + c.n + ' review',
    sub: c.name + ' · ' + unitSpan(c.ids), target: 18, amc: 2 };
  if (key === 'mid') { const half = chs.slice(0, Math.ceil(chs.length / 2)), ids = half.flatMap(x => x.ids);
    return { key, ids, kind: 'exam', title: 'Midterm review', sub: 'Chapters 1–' + half.length + ' · ' + unitSpan(ids), target: 24, amc: 3 }; }
  if (key === 'final') return { key, ids: chs.flatMap(x => x.ids), kind: 'exam', title: 'Final exam review',
    sub: 'All ' + chs.length + ' chapters of ' + COURSE.name, target: 36, amc: 4 };
  return null;
}
const testKey = key => COURSE.id + ':' + key;
const lastTest = key => ((S.tests || {})[testKey(key)] || [])[0] || null;
const shuffled = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
/** A comprehensive practice test: fresh problems spread across every skill in the scope —
    skills the learner has stumbled on first in line — mixed together the way a real test
    mixes topics, then a few unsolved AMC problems as a bonus at the end. */
/** Problems per unit: the target shared out, but never falling far short of it — one each
    across Precalculus's 25 units would make the longest course the shortest final. */
function perUnit(sc) {
  const k = sc.ids.length, per = Math.max(1, Math.round(sc.target / k));
  return per * k < sc.target * 0.8 ? per + 1 : per;
}
function testSet(sc) {
  const per = perUnit(sc);
  let seed = (Date.now() ^ (Math.random() * 1e9)) | 0;
  const main = [], seen = {};
  sc.ids.forEach(id => {
    const sk = unitSkills(id); if (!sk.length) return;
    const shaky = sk.filter(k => { const t = skillStat(id, k).state; return t === 'open' || t === 'shaky'; });
    const order = shuffled(shaky).concat(shuffled(sk.filter(k => shaky.indexOf(k) < 0)));
    for (let i = 0, made = 0; made < per && i < per * 4; i++) {
      const k = order[i % order.length];
      let p = null;
      try { p = window.makeProblem(id, k, seed += 7919); } catch (e) {}
      if (!p) { const b = (BANK[id] || []).filter(x => x.skill === k); if (b.length) p = Object.assign({}, b[Math.floor(Math.random() * b.length)]); }
      if (!p) continue;
      const dup = p.q + '|' + (p.c || []).join('|'); if (seen[dup]) continue; seen[dup] = 1;
      p.unitId = id; p.t = p.t || 2; main.push(p); made++;
    }
  });
  const amc = shuffled(sc.ids.flatMap(id => probsFor(id).amc)
    .filter(p => !(S.results[p.id] && S.results[p.id].correct))).slice(0, sc.amc);
  return shuffled(main).concat(amc);
}
/* ---------------- big ideas: the threads through the grades ---------------- */
/* IDEAS (ideas.js) puts every unit on one ladder that runs across the grades, so knowledge
   comes in three sizes: topic › big idea › unit, with the small concepts hanging off units. */
const IDEAS = window.IDEAS || [], IDEA_OF = {};
IDEAS.forEach(i => i.units.forEach((u, k) => IDEA_OF[u] = { idea: i, step: k }));
const ideaById = id => IDEAS.find(i => i.id === id);
const GRADE = { grade6: 'Grade 6', accel: 'Grade 7', math7: 'Grade 7', grade8: 'Grade 8', grade9: 'Algebra I',
                geometry: 'Geometry', algebra2: 'Algebra II', precalc: 'Precalculus' };
/** Where a unit is first met, across every course: "Grade 6", "Algebra I". */
function gradeOf(id) {
  for (const k in COURSES) if (COURSES[k].units.indexOf(id) > -1) return GRADE[k] || COURSES[k].short;
  return '';
}
/** Big ideas this one rests on, and those resting on it — read off the unit prerequisites. */
function ideaLinks(idea) {
  const before = {}, after = {};
  idea.units.forEach(u => {
    prereqsOf(u).forEach(p => { const o = IDEA_OF[p]; if (o && o.idea !== idea) before[o.idea.id] = o.idea; });
    unlocks(u).forEach(p => { const o = IDEA_OF[p]; if (o && o.idea !== idea) after[o.idea.id] = o.idea; });
  });
  // A two-way link reads as a contradiction; the earlier relation is the one worth showing.
  return { before: Object.values(before), after: Object.values(after).filter(i => !before[i.id]) };
}
/** "Statistics & Probability › Describing data › Grade 6 · Centre & Spread", as links. */
function crumbs(unitId) {
  const o = IDEA_OF[unitId], u = unitById(unitId);
  return `<nav class="crumbs" aria-label="Where this sits">${window.STRANDS[u.strand].name} ›
    ${o ? `<button class="linkbtn" data-nav="#/map/i/${o.idea.id}">${o.idea.name}</button> ›` : ''}
    <button class="linkbtn" data-nav="#/u/${unitId}/learn">${gradeOf(unitId)} · ${plain(u.title)}</button></nav>`;
}

/** On a lesson: which big idea it is a step of, and the steps either side, across the grades. */
function ideaLine(uid) {
  const o = IDEA_OF[uid]; if (!o) return '';
  const prev = o.idea.units[o.step - 1], next = o.idea.units[o.step + 1];
  const step = x => `${gradeOf(x)} · ${plain(unitById(x).title)}`;
  return `<div class="idealine"><button class="linkbtn" data-nav="#/map/i/${o.idea.id}">Big idea: <b>${o.idea.name}</b></button>
    <span class="unitlab">step ${o.step + 1} of ${o.idea.units.length}</span>
    ${prev ? `<button class="linkbtn" data-nav="#/u/${prev}/learn" title="The step before">← ${step(prev)}</button>` : ''}
    ${next ? `<button class="linkbtn" data-nav="#/u/${next}/learn" title="The step after">${step(next)} →</button>` : ''}</div>`;
}

/* ---------------- search: one box for the whole site ---------------- */
/* Big ideas, lessons, concepts and drills in one index. A concept also answers to the everyday
   words people type for it (SEARCH_WORDS: "average" finds mean), and every result says where it
   lives, so a search is also a lesson in how the subject is organised. */
let _findIdx = null;
function findIndex() {
  if (_findIdx) return _findIdx;
  const syn = {}, words = window.SEARCH_WORDS || {};
  for (const k in words) (syn[words[k]] = syn[words[k]] || []).push(k);
  const out = [];
  IDEAS.forEach(i => out.push({ type: 'idea', title: i.name, go: '#/map/i/' + i.id,
    sub: window.STRANDS[i.strand].name + ' · ' + gradeOf(i.units[0]) + (i.units.length > 1 ? ' → ' + gradeOf(i.units[i.units.length - 1]) : ''),
    hay: [i.name, i.gist].concat(i.units.map(u => unitById(u).title)).join(' ') }));
  ALL.forEach(u => { const o = IDEA_OF[u.id];
    out.push({ type: 'unit', unit: u.id, title: u.title, go: '#/u/' + u.id + '/learn',
      sub: gradeOf(u.id) + (o ? ' · ' + o.idea.name + ', step ' + (o.step + 1) : ''),
      hay: [u.title, plain(u.big)].concat(u.sections.map(x => plain(x.h))).join(' ') }); });
  CON.list.forEach(c => { const o = IDEA_OF[c.home], name = plain(c.name);
    out.push({ type: 'concept', c, unit: c.home, title: name, syn: syn[c.alias] || [], go: '#/map/c/' + c.id,
      sub: (o ? o.idea.name + ' › ' : '') + gradeOf(c.home) + ' · ' + plain(unitById(c.home).title),
      hay: [name, plain(c.def)].concat(syn[c.alias] || []).join(' ') }); });
  ALL.forEach(u => { const can = window.genSkills ? window.genSkills(u.id) : [];
    unitSkills(u.id).forEach(k => { if (can.indexOf(k) < 0) return;
      out.push({ type: 'drill', unit: u.id, title: plain(skillLabel(k, u.id)), go: '#/drill/' + u.id + '/' + k,
        sub: 'Drill · ' + gradeOf(u.id) + ' · ' + plain(u.title), hay: skillLabel(k, u.id) + ' ' + u.title }); }); });
  out.forEach(e => { e.t = e.title.toLowerCase(); e.h = e.hay.toLowerCase(); });
  return _findIdx = out;
}
const reEsc = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Exact name or everyday word first, then names that start with it, then any word of a name,
    then anywhere in the description — nudged towards the course being studied. */
function findScore(e, q, words) {
  let sc = e.t === q || (e.syn && e.syn.indexOf(q) > -1) ? 100 : e.t.startsWith(q) ? 80
    : new RegExp('(^|[^a-z0-9])' + reEsc(q)).test(e.t) ? 65
    : (e.syn && e.syn.some(w => w.startsWith(q))) ? 60
    : words.every(w => e.h.indexOf(w) > -1) ? (e.t.indexOf(words[0]) > -1 ? 45 : 25) : 0;
  if (sc && e.unit && COURSE.units.indexOf(e.unit) > -1) sc += 4;
  return sc;
}
const FIND_GROUPS = [['concept', 'Concepts', 8], ['idea', 'Big ideas', 4], ['unit', 'Lessons', 6], ['drill', 'Drills', 5]];
function findRender(q) {
  const box = $('#findres');
  q = q.trim().toLowerCase();
  if (!q) { box.innerHTML = `<p class="mapnote" style="margin:12px 4px">Type a word from maths, or an everyday one — <em>average</em>, <em>rise over run</em>, <em>box and whisker</em>, <em>percent</em>. Results show where each thing lives.</p>`; return; }
  const words = q.split(/\s+/).filter(Boolean), idx = findIndex();
  const scored = idx.map(e => [e, findScore(e, q, words)]).filter(x => x[1]).sort((a, b) => b[1] - a[1]);
  const html = FIND_GROUPS.map(([type, label, n]) => {
    const hits = scored.filter(x => x[0].type === type).slice(0, n);
    return hits.length ? `<div class="findgroup"><h4>${label}</h4>${hits.map(([e]) => {
      const st = e.type === 'concept' ? conceptState(e.c) : e.type === 'unit' ? unitState(e.unit) : null;
      return `<button class="findhit" role="option" data-go="${e.go}"><b>${esc(e.title)}</b>
        ${st && st.tried ? `<span class="chip ${CON_CHIP[st.state]}">${(e.type === 'concept' ? CON_LABEL : MAP_LABEL)[st.state]}</span>` : ''}
        <span class="findsub">${esc(e.sub)}</span></button>`; }).join('')}</div>` : ''; }).join('');
  box.innerHTML = html || `<p class="mapnote" style="margin:12px 4px">Nothing matches “${esc(q)}”. Try a shorter word.</p>`;
  box.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { closeFinder(); go(b.dataset.go); });
  const first = box.querySelector('.findhit'); if (first) first.classList.add('on');
}
function openFinder() {
  if (!S) return;
  $('#finder').hidden = false; document.body.classList.add('finding');
  const q = $('#findq'); q.value = ''; findRender(''); setTimeout(() => q.focus(), 0);
}
function closeFinder() { $('#finder').hidden = true; document.body.classList.remove('finding'); }

/** The scope's concepts, each under the first unit in the scope that teaches or revisits it. */
function scopeConcepts(sc) {
  const seen = {}, by = {};
  sc.ids.forEach(id => { by[id] = CON.list.filter(c => c.units.indexOf(id) > -1 && !seen[c.id] && (seen[c.id] = 1)); });
  return by;
}
/** After Check all: the score, unit by unit, and the ideas behind every miss. */
function testReport(sc, list, state) {
  const isAmc = p => p.kind === 'amc';
  const main = list.map((p, k) => ({ p, s: state[k] })).filter(x => !isAmc(x.p));
  const bonus = list.map((p, k) => ({ p, s: state[k] })).filter(x => isAmc(x.p));
  const ok = main.filter(x => x.s === true).length, blank = main.filter(x => x.s === null).length;
  const pct = main.length ? Math.round(ok / main.length * 100) : 0;
  const verdict = pct >= 85 ? ['t1', 'Ready for the test'] : pct >= 65 ? ['t3', 'Nearly there'] : ['amc', 'Worth more review first'];
  const misses = {};
  list.forEach((p, k) => { if (state[k] === false) conceptsOf(p).slice(0, 2).forEach(c => misses[c.id] = (misses[c.id] || 0) + 1); });
  const top = Object.keys(misses).sort((a, b) => misses[b] - misses[a]).slice(0, 8).map(id => CON.byId[id]);
  return `<div class="card-note testreport">
    <p class="eyebrow">Practice test result</p>
    <div class="row" style="align-items:baseline"><h3 style="font-size:1.6rem;margin:0">${ok} / ${main.length}</h3>
      <span class="chip ${verdict[0]}">${verdict[1]}</span>
      ${bonus.length ? `<span class="unitlab">AMC bonus ${bonus.filter(x => x.s === true).length} of ${bonus.length}</span>` : ''}
      ${blank ? `<span class="unitlab">${blank} left blank — blanks count as wrong on a real test</span>` : ''}</div>
    <table class="trows">${sc.ids.map(id => { const u = unitById(id), mine = main.filter(x => x.p.unitId === id);
        const r = mine.filter(x => x.s === true).length, f = mine.length ? r / mine.length : 1;
        return `<tr><td>Unit ${unitNo(u)} · ${plain(u.title)}</td><td class="tnum">${r} / ${mine.length}</td>
          <td>${f >= 0.85 ? '<span class="chip t1">Solid</span>' : `<span class="row" style="gap:6px">
            <button class="btn sm" data-nav="#/u/${id}/learn">Re-read</button><button class="btn sm" data-nav="#/u/${id}/drills">Drill</button></span>`}</td></tr>`; }).join('')}
    </table>
    ${top.length ? `<h4>The ideas behind your misses</h4><div class="maprow">${top.map(c =>
        `<button class="mapchip" data-state="weak" data-nav="#/map/c/${c.id}"><b>${M(c.name)}</b><span>missed ${misses[c.id]}× · ${conceptHome(c)}</span></button>`).join('')}</div>` : ''}
    <p class="mapnote" style="margin-top:12px">${pct >= 85 ? 'Every miss is still worth a look — open it above and read the solution.'
      : 'Go back to the units marked above, then take the test again. The numbers are new every time, so a retake is a fair test.'}
      Every miss is waiting in <strong>My mistakes</strong> too.</p>
    <div class="row" style="margin-top:10px"><button class="btn pri" data-retake>Take a new practice test</button></div>
  </div>`;
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
/* ---- Grade 8 and Algebra I skills ---- */
const SKILL_LABELS_89 = {
  reflect:'Reflections', rotate:'Rotations', compose:'Two moves in a row', corresp:'Corresponding parts',
  rigid:'What stays the same', sequence:'Sequences of moves', solve:'Solving for x', orient:'Orientation',
  dilate:'Dilating a point', factor:'Finding the scale factor', volume:'Volume scaling',
  both:'Variables on both sides', bracket:'Brackets', collect:'Collecting like terms', fraction:'Clearing fractions',
  vertical:'Vertical angles', exterior:'Exterior angles', aa:'Angle-angle similarity',
  twopoints:'Slope from two points', table:'Rates from a table', proportional:'Is it proportional?',
  graph:'Reading the graph', missing:'Finding a missing value',
  readmb:'Reading m and b', intercept:'Intercepts', rearrange:'Rearranging into y = mx + b',
  isfunction:'Is it a function?', linear:'Linear or not', domain:'Domain', range:'Range',
  substitute:'Substitution', eliminate:'Elimination', check:'Checking a solution',
  nosolution:'No solution', multiply:'Multiplying to eliminate', infinite:'Infinitely many solutions',
  direction:'Direction of the association', axes:'Choosing the axes', outlier:'Outliers', form:'Form of the pattern',
  cause:'Association, not cause', describe:'Describing a plot', strength:'Strength', count:'Reading the dots',
  predict:'Predicting from a trend', cluster:'Clusters', reason:'Reasoning about data', design:'Study design',
  equation:'Equation of the line', residual:'Residuals', extrapolate:'Interpolate or extrapolate', fit:'Judging the fit',
  complete:'Completing the table', read:'Reading the table', joint:'Joint frequencies', marginal:'Marginal frequencies',
  rowpct:'Percent of a row', colpct:'Percent of a column', association:'Is there an association?',
  distance:'Distance between points', midpoint:'Midpoints', exact:'Exact distances', shape:'Shapes on the grid',
  divide:'Dividing powers of ten', tidy:'Tidying the front number', add:'Adding', howmany:'How many times larger',
  fix:'Fixing the form', subtract:'Subtracting',
  cone:'Cones', sphere:'Spheres', radius:'Radius or diameter?', decimal:'Rounding a volume', scale:'Scaling a solid',
  parts:'Naming the parts', simplify:'Simplifying', structure:'Seeing the structure', units:'Units and conversions',
  literal:'Literal equations', words:'Translating the words',
  pointslope:'Point-slope form', slopeint:'Slope-intercept form', intercepts:'Intercepts',
  perp:'Perpendicular slopes', standard:'Standard form',
  model:'Writing a model', rate:'Rate of change', arith:'Arithmetic sequences', shift:'Shifting a graph',
  boundary:'Solid or dashed?', shade:'Which side to shade',
  readr:'Reading r', resplot:'Residual plots', sign:'Sign of r', residsum:'Sum of the residuals',
  interpret:'Interpreting in context',
  classify:'Linear or exponential?', initial:'Initial value', rule:'Writing the rule', compute:'Computing a value',
  geometric:'Geometric sequences', double:'Doubling and tripling',
  term:'Finding a term', explicit:'Explicit formulas', recursive:'Recursive formulas',
  findd:'Finding the common difference', findr:'Finding the common ratio', sum:'How many terms?',
  square:'Squaring a binomial', closure:'Closure', degree:'Degree',
  gcf:'Taking out the GCF', trinomial:'Trinomials', squares:'Difference of squares',
  gcffirst:'GCF first', lead:'Leading coefficient', perfect:'Perfect square trinomials',
  prime:'Will it factor?', grouping:'Factoring by grouping',
  opens:'Which way it opens', axis:'Axis of symmetry', yint:'The y-intercept', vertexform:'Vertex form',
  vertex:'Finding the vertex', roots:'Roots', width:'Narrow or wide', minmax:'Maximum or minimum',
  symmetry:'Using symmetry',
  sqroot:'Taking square roots', factorout:'Factoring out x', formula:'The quadratic formula',
  discrim:'The discriminant', zeroprod:'Zero product property',
  irrational:'Rational or irrational?', exponent:'Rational exponents',
  absvalue:'Absolute value', piecewise:'Piecewise functions', isolate:'Isolating the bars', step:'Step functions',
  quartile:'Quartiles', iqr:'Interquartile range', choose:'Mean or median?', skew:'Skew',
  resistant:'Resistant statistics', fivenum:'Five-number summary', display:'Choosing a display', effect:'Shifting the data'
};
for (const k in SKILL_LABELS_89) if (!(k in SKILL_LABELS)) SKILL_LABELS[k] = SKILL_LABELS_89[k];

/* A few keys mean different things in different units, so those units override the shared label. */
/* Skill keys are reused across units, and a key that means one thing in an early unit can
   mean something else entirely in a later one — `complete` is completing a table in Two-Way
   Tables and completing the square in Equations of Circles. Anything that would inherit the
   wrong name, or no name at all, gets named for its own unit here. */
const SKILL_OVERRIDES = {
  transformations: { translate:'Translations', identify:'Naming the transformation' },
  dilations: { area:'Area scaling' },
  slope: { special:'Horizontal & vertical lines' },
  slopeforms: { special:'Horizontal & vertical lines' },
  inequalities9: { circle:'Open & closed circles' },
  quadgraphs: { context:'Projectile problems' },
  writelinear: { avgrate:'Average rate of change' },
  angles8: { solve:'Solving for x in a diagram' },
  volume8: { compare:'Cone against cylinder', backwards:'Working back to a length' },
  multistep: { word:'Word problems' },
  linearfn: { word:'Word problems' },
  systems8: { word:'Word problems' },
  systems9: { word:'Word problems' },
  scinotation: { word:'Word problems', multiply:'Multiplying' },
  factoring: { area:'Area models', complete:'Factoring completely' },
  solving9: { word:'Word problems', linear:'Linear equations' },
  solvequad: { word:'Word problems', factor:'Solving by factoring', complete:'Completing the square' },
  exponential: { factor:'Growth & decay factor', solve:'Solving by trial' },
  functiondef: { vertical:'The vertical line test' },
  polynomials: { area:'Area models', multiply:'Multiplying' },
  radicals: { exponent:'Rational exponents', evaluate:'Evaluating powers',
              add:'Adding roots', multiply:'Multiplying roots', simplify:'Simplest radical form' },
  bestfit: { slope:'Interpreting the slope', intercept:'Interpreting the intercept', solve:'Reading a value back' },
  regression: { slope:'Interpreting the slope' },
  sequences9: { classify:'Arithmetic or geometric?', graph:'Graphing a sequence' },
  advfunctions: { solve:'Absolute value equations', graph:'Reading the graph' },
  expressions9: { simplify:'Simplifying' },

  /* grade 7 */
  exponents: { zero:'The zero exponent', product:'Multiplying powers', quotient:'Dividing powers',
               power:'A power of a power', negative:'Negative exponents',
               scientific:'Scientific notation', scicalc:'Arithmetic in scientific notation' },
  problemsolving: { simpler:'Trying a smaller case', guesscheck:'Guess, check and adjust' },
  squareroots: { root:'Exact square roots', square:'Squaring a number', perfect:'Perfect squares',
                 decimal:'Roots of decimals', fraction:'Roots of fractions',
                 estimate:'Trapping a root between whole numbers' },
  realnumbers: { classify:'Rational or irrational?', order:'Ordering different forms',
                 repeating:'Repeating decimals as fractions' },
  gcflcm: { lcm:'Least common multiple', primefact:'Prime factorisation', product:'GCF times LCM' },
  measurement: { metric:'Metric conversions', sqconvert:'Converting square units' },
  circles: { circumference:'Circumference', sector:'Sectors & semicircles' },
  graphs: { readcircle:'Reading a circle graph', readline:'Reading a line graph',
            estimate:'Estimating a calculation', misleading:'Spotting a misleading graph' },
  pythagorean: { hyp:'Finding the hypotenuse', leg:'Finding a missing leg',
                 converse:'Is it a right triangle?', apply:'Diagonals & distances' },
  functions: { slope:'Slope from a table', solvefn:'Working back to the input' },

  /* geometry */
  geobasics: { terms:'Undefined terms', notation:'Geometric notation',
               segadd:'Segment addition', angadd:'Angle addition', bisector:'Bisectors' },
  geoproof: { structure:'The shape of a proof', converse:'Converses', counter:'Counterexamples',
              reason:'Naming the reason', logic:'Conditional statements' },
  triproof: { choose:'Which shortcut applies?', proof:'Putting a proof together',
              reflexive:'The shared side', cpctc:'CPCTC',
              isosceles:'Isosceles triangles', hl:'The hypotenuse-leg case' },
  polygons: { anglesum:'Interior angle sum', regular:'Regular polygon angles',
              family:'The quadrilateral family', diagonals:'What the diagonals tell you',
              midsegment:'Midsegments', identify:'Naming the quadrilateral' },
  simproof: { side:'Finding a missing side', prop:'Proportional segments',
              shadow:'Shadows & indirect measurement', test:'Which similarity test?',
              scale:'Scale factor', area:'Ratio of areas',
              backarea:'From area ratio back to sides', mean:'Geometric mean' },
  righttri: { ratio:'Naming the ratio', identify:'Opposite, adjacent, hypotenuse',
              side:'Finding a missing side', angle:'Finding a missing angle',
              inverse:'Inverse trig', special:'Special right triangles',
              depression:'Elevation & depression', twostep:'Two-step problems' },
  circleangles: { central:'Central angles', inscribed:'Inscribed angles',
                  semicircle:'Angles in a semicircle', vertex:'Where the vertex sits',
                  outside:'Vertex outside the circle', inside:'Chords crossing inside',
                  chords:'Intersecting chords', sameArc:'Angles on the same arc',
                  tangent:'Tangent lengths', tangentradius:'Tangent & radius',
                  tangents:'Two tangents from a point', cyclic:'Cyclic quadrilaterals' },
  circleeq: { read:'Reading centre & radius', write:'Writing the equation',
              form:'The standard form', diameter:'Centre from a diameter',
              point:'Inside, on, or outside?', complete:'Completing the square',
              intersect:'Where a line meets a circle' },
  coordproof: { slope:'Slope of a segment', tool:'Choosing the right formula',
                proof:'Proving it with coordinates' },
  solids3d: { section:'Cross sections', slant:'Slant height', revolve:'Solids of revolution' },

  /* algebra II */
  functionops: { add:'Adding functions', mult:'Multiplying functions', compose:'Composing',
                 order:'Does the order matter?', formula:'Composing as a formula',
                 inverse:'Finding an inverse', exists:'Which functions have one?',
                 verify:'Reading an inverse backwards', domain:'Domain of a composition' },
  transformfn: { shift:'Slides', reflect:'Flips', vertex:'Reading the vertex',
                 stretch:'Stretches', inside:'Inside the bracket', write:'Writing the equation',
                 piece:'Piecewise functions', describe:'Describing a transformation',
                 start:'Where the graph starts' },
  polydiv: { remainder:'The remainder theorem', root:'Which root goes in the box',
             factor:'The factor theorem', divide:'Long division', check:'Is it a factor?',
             quotient:'Finding the quotient', cubic:'Factoring a cubic',
             findk:'Finding a missing coefficient', rational:'Possible rational roots' },
  polyfn: { degree:'Degree', ends:'End behaviour', roots:'Roots from the factors',
            multiplicity:'Cross or bounce?', turns:'Turning points', yint:'The y-intercept',
            write:'Building from the roots', mindegree:'Smallest possible degree',
            degreefac:'Degree from factors' },
  complexnum: { power:'Powers of i', root:'Roots of negatives', add:'Adding',
                multiply:'Multiplying', conjugate:'Conjugates', divide:'Dividing',
                discriminant:'When roots are complex', solve:'Solving with i',
                norm:'Times its conjugate' },
  radicaleq: { solve:'Solving a radical equation', start:'Where the graph starts',
               exponent:'Rational exponents', isolate:'Isolate before squaring',
               extraneous:'Extraneous solutions', nosolution:'When there is no solution',
               cube:'Cube roots', domain:'Domain of a root' },
  rational: { exclude:'Excluded values', simplify:'Simplifying', multiply:'Multiplying',
              add:'Adding', divide:'Dividing', solve:'Solving', work:'Work & rate problems',
              asymptote:'Asymptotes' },
  logarithms: { evaluate:'Evaluating a log', special:'The values to know',
                convert:'Exponential and log form', expand:'Expanding', power:'The power law',
                condense:'Condensing', solve:'Solving log equations', law:'Which law applies?',
                laws:'Using the laws', solvepow:'Unknown in the exponent',
                domain:'What a log will accept', negative:'Logs of fractions' },
  expmodels: { classify:'Linear or exponential?', factor:'Growth & decay factors',
               evaluate:'Evaluating a model', model:'Building a model', half:'Half-life',
               compound:'Compound interest', decay:'Modelling a decline',
               solve:'Solving for the time', logscale:'Reading a log scale',
               backwards:'Working back in time' },
  series: { sigma:'Sigma notation', terms:'Counting the terms', type:'Arithmetic or geometric?',
            arith:'Arithmetic series', geom:'Geometric series', ratio:'The common ratio',
            infinite:'Infinite series', converge:'Does it converge?',
            decimal:'Repeating decimals' },
  unitcircle: { convert:'Degrees to radians', todeg:'Radians to degrees', full:'A full turn',
                reference:'Reference angles', quadrant:'Signs by quadrant',
                value:'Values on the circle', arc:'Arc length', coterminal:'Coterminal angles',
                cotermneg:'Coterminal from a negative' },
  triggraphs: { amplitude:'Amplitude', amp2:'Amplitude from a picture', period:'Period',
                midline:'Midline', start:'Where the wave starts', max:'Maximum', min:'Minimum',
                maxmin:'Maximum & minimum', findb:'Finding b from the period',
                shift:'Phase shift', wheel:'Ferris wheel models' },
  trigid: { identity:'The Pythagorean identity', quotient:'The quotient identity',
            reciprocal:'Reciprocal identities', solve:'Solving trig equations',
            solvecos:'The second solution', count:'How many solutions?',
            simplify:'Simplifying with an identity', quadratic:'Quadratic in disguise',
            square:'What sin squared means', quadrant:'Sign from the quadrant',
            tan:'Finding the tangent' },
  normaldist: { rule:'The 68-95-99.7 rule', zscore:'z-scores', interval:'Between two values',
                tail:'One tail', value:'Back to a raw value', percentile:'Percentiles',
                between:'From the mean outwards', skew:'When the bell does not fit',
                count:'How many people' },
  statinf: { design:'Which study design?', bias:'Spotting bias', interval:'Confidence intervals',
             random:'Why random matters', margin:'Margin of error', size:'Choosing a sample size',
             conclude:'What the interval allows', quadruple:'Shrinking the margin',
             cause:'Association or cause?', simulate:'Judging by simulation',
             confidence:'What confidence means', compare:'Comparing two intervals',
             decided:'Has the data decided?', literary:'A famous failure' },

  /* precalculus */
  invtrig: { value:'Exact values', negative:'Negative arguments', range:'What each one returns',
             compose:'Composing with the original', domain:'What arcsine will accept',
             obtuse:'When the calculator is not enough' },
  trigadv: { third:'The third angle', which:'Which rule applies?', sines:'The law of sines',
             cosines:'The law of cosines', angle:'Finding an angle from three sides',
             area:'Area from two sides and an angle', ambiguous:'The ambiguous case',
             inequality:'Can these sides close?', survey:'Surveying problems' },
  polar: { topolar:'Finding r', torect:'Polar to rectangular', equation:'Polar equations',
           angle:'Finding the direction', quadrant:'When arctangent misleads',
           coterminal:'Coterminal directions', negative:'Negative r', modulus:'Modulus of a complex number' },
  vectors: { add:'Adding', subtract:'Subtracting', magnitude:'Magnitude', scalar:'Scalar multiples',
             dot:'The dot product', perp:'Testing for perpendicular', components:'Finding components',
             resultant:'Resultants', unit:'Unit vectors', findk:'Solving for a component' },
  matrices: { dims:'Dimensions', add:'Adding', scalar:'Scalar multiples', det:'Determinants',
              shape:'Do the shapes fit?', multiply:'Multiplying', order:'Does order matter?',
              inverse:'Inverses', system:'Systems and determinants', identity:'The identity matrix',
              findk:'Making it singular' },
  conics: { identify:'Naming the conic', circle:'Circles', ellipse:'Ellipses', hyperbola:'Hyperbolas',
            parabola:'Parabolas', sign:'What the sign decides', complete:'Completing the square' },
  paramfn: { point:'Plotting from t', eliminate:'Eliminating the parameter', why:'Why parametrics exist',
             circle:'Circles and the identity', ellipse:'Ellipses', projectile:'Projectile motion',
             peak:'The highest point', domain:'What t allows', largest:'Extreme values' },
  probadv: { factorial:'Factorials', counting:'Multiplying choices', combination:'Combinations',
             permutation:'Permutations', which:'Does order matter?', pascal:'Pascal\u2019s triangle',
             binomial:'The binomial theorem', prob:'Counting into probability', symmetry:'The symmetry rule' },
  limits: { substitute:'When substitution works', meaning:'What a limit says',
            factor:'Factoring past 0/0', factor2:'Factoring past 0/0', cancel:'Cancelling a common factor',
            indeterminate:'What 0/0 means', onesided:'One-sided limits', exists:'Does the limit exist?',
            continuity:'Continuity', rationalise:'Rationalising the top' },
  derivintro: { average:'Average rate of change', power:'The power rule', constant:'Derivative of a constant',
                evaluate:'Slope at a point', quotient:'The difference quotient',
                definition:'From the definition', flat:'Where the tangent is flat',
                sign:'What the sign tells you' },
  areaintro: { rectangle:'Constant rates', triangle:'Triangles under the graph',
               trapezium:'Steadily changing rates', units:'What the area means',
               width:'Strip width', strips:'How many strips', leftsum:'Left sums', rightsum:'Right sums',
               bracket:'Bracketing the answer', exact:'Exact areas', negative:'Below the axis' },

  /* grade 6 */
  decimalops: { add:'Adding decimals', subtract:'Subtracting decimals', multiply:'Multiplying decimals',
                divide:'Dividing decimals', money:'Splitting a bill', convert:'Decimals and fractions',
                estimate:'Estimating' },
  fracdiv: { divide:'Dividing fractions', reciprocal:'Reciprocals', mixed:'Mixed numbers',
             word:'Word problems', whole:'Dividing a whole number', bigger:'Why the answer grows' },
  integers6: { compare:'Comparing negatives', abs:'Absolute value', opposite:'Opposites',
               order:'Ordering', context:'Temperature and depth', furthest:'Furthest from zero',
               true:'Which statement is true?' },
  coordplane: { quadrant:'Naming the quadrant', read:'Writing coordinates', reflect:'Reflections',
                distance:'Distance on the grid', axis:'Points on an axis', shape:'Shapes on the grid',
                perimeter:'Perimeter on the grid', area:'Area on the grid' },
  ratios6: { simplify:'Simplifying a ratio', equivalent:'Equivalent ratios', order:'Which order?',
             scale:'Scaling a recipe', whole:'Part of the whole', share:'Sharing in a ratio',
             backwards:'Working backwards', notequiv:'Spotting a fake' },
  unitrates: { rate:'Finding a rate', price:'Price per item', convert:'Converting units',
               better:'Which is the better buy?', apply:'Using a rate', wage:'Hourly pay',
               compare:'Comparing two rates', fuel:'Fuel economy', backwards:'Working backwards' },
  percent6: { convert:'Percents, decimals and fractions', of:'A percent of a number',
              discount:'Discounts', increase:'Increases', change:'Percent change',
              backwards:'Finding the original', trap:'Up then down' },
  expressions6: { order:'Order of operations', exponent:'Exponents', evaluate:'Evaluating',
                  write:'Writing an expression', expand:'Expanding a bracket',
                  collect:'Collecting like terms', equivalent:'Equivalent expressions',
                  square:'Substituting a negative' },
  equations6: { solve:'Solving one step', word:'From words to an equation', check:'Checking a solution' },
  inequal6: { symbol:'Which symbol?', write:'Writing an inequality', circle:'Open or filled?',
              solve:'Solving', over:'Does the endpoint count?', test:'Testing a value',
              count:'Counting the whole numbers', real:'Real-world limits', phrase:'Matching the phrase' },
  areatri: { triangle:'Triangles', rect:'Rectangles', parallelogram:'Parallelograms',
             trapezoid:'Trapezoids', perimeter:'Perimeter', backwards:'Working back to a length',
             composite:'Composite shapes', units:'Square units' },
  surfacenets: { box:'Boxes', cube:'Cubes', faces:'Counting faces', pyramid:'Pyramids',
                 prism:'Prisms', wrap:'Wrapping problems', units:'Square units',
                 which:'Area or volume?', backwards:'Working back to an edge' },
  volumefrac: { box:'Boxes', cube:'Cubes', fraction:'Fractional edges', smallcubes:'Counting small cubes',
                howmany:'How many fit', backwards:'Working back to a length', capacity:'Capacity',
                scaling:'Halving every edge', units:'Cubic units' },
  statquestions: { which:'Is it statistical?', count:'Counting the data', chart:'Which chart?',
                   shape:'Shape of the distribution', outlier:'Spotting an outlier',
                   histogram:'Histograms', range:'Range', describe:'Describing a distribution',
                   twohumps:'Two humps', variability:'What varies', read:'Reading a plot' },
  centerspread: { mean:'Mean', median:'Median', mode:'Mode', range:'Range',
                  mad:'Mean absolute deviation', backwards:'Working back from a mean',
                  choose:'Which centre to use', spread:'Comparing spread', outlier:'Effect of an outlier' }
};

const skillLabel = (k, unitId) => (unitId && SKILL_OVERRIDES[unitId] && SKILL_OVERRIDES[unitId][k])
  || SKILL_LABELS[k] || String(k).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, c => c.toUpperCase());

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
const go = h => { closeOverlays(); if (location.hash === h) { if (S) render(); } else location.hash = h; };
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
    <p class="sub">${Object.keys(COURSES).length} courses, from Grade 6 through Precalculus — ${ALL.length} units between them, with worked examples, drills and AMC challenges mixed in.</p>
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
  // AMC problems saved to mistakes or favourites before asProb existed still carry the long names
  (S.mistakes || []).forEach(m => { m.snap = asProb(m.snap); });
  (S.favs || []).forEach(f => { f.snap = asProb(f.snap); });
  if (!existing) { S.pace = pace || 'standard'; S.course = course || 'accel'; }
  else { if (pace) S.pace = pace; if (course) S.course = course; }
  if (!PACE[S.pace]) S.pace = 'standard';
  if (!COURSES[S.course]) S.course = 'accel';
  setCourse(S.course);                                          // after the course is settled, not before
  const list = users(); if (!list.some(u => u.toLowerCase() === name.toLowerCase())) { list.push(name); saveUsers(list); }
  LS.set('m3z:last', name); persist(); touchDay();
  $('#login').hidden = true; $('#app').hidden = false;
  buildRail(); buildWho(); if (!location.hash || location.hash === '#') go('#/'); else render();
  setTimeout(() => CON.index && CON.index(), 600);   // tag every problem now, not on the first hint
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
  /* In course order, a chapter at a time, each closing on its review — the way a school
     year runs. The last test score sits where a unit shows its progress ring. */
  const rev = (key, label) => { const t = lastTest(key);
    return `<button class="unit-link rev" data-nav="#/test/${key}"><span class="n">✎</span><span>${label}</span>
      <span class="pct">${t ? Math.round(t.ok / t.n * 100) + '%' : ''}</span></button>`; };
  $('#rail').innerHTML = `
    <div class="rail-top"><button class="brand" id="home"><b>${window.BRAND || 'Math 3Zs'}</b><span>${COURSE.name}</span></button></div>
    <div class="rail-scroll">
      ${chaptersOf().map(c => `<div class="strand-h">Chapter ${c.n} · ${c.name}</div>` +
        c.ids.map(unitById).map(u => { const st = unitStats(u.id);
          return `<button class="unit-link" data-u="${u.id}"><span class="n">${unitNo(u)}</span>
            <span>${u.title}</span>${ring(st.pct)}</button>`; }).join('') + rev(c.key, 'Chapter ' + c.n + ' review')).join('')}
      <div class="strand-h">Exams</div>${rev('mid', 'Midterm review')}${rev('final', 'Final exam review')}
    </div>
    <div class="rail-foot">
      <button class="navbtn" data-nav="#/progress">◔ <span>Progress</span></button>
      <button class="navbtn" data-nav="#/review">⟳ <span>Mixed review</span></button>
      <button class="navbtn" data-nav="#/mistakes">↻ <span>My mistakes</span><span class="cnt" id="mcount"></span></button>
      <button class="navbtn" data-nav="#/favourites">★ <span>Saved problems</span><span class="cnt" id="fcount"></span></button>
      <button class="navbtn" data-nav="#/map">⌗ <span>Knowledge map</span></button>
      <button class="navbtn" data-nav="#/print">⎙ <span>Print centre</span></button>
      <button class="navbtn" data-nav="#/settings">⚙ <span>Course &amp; pace</span></button>
    </div>`;
  $('#home').onclick = () => go('#/');          // go() closes the drawer
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
    <b>${S.name}</b><select class="sw" id="courseBtn" title="Switch course" aria-label="Course">${
      Object.values(COURSES).map(c => `<option value="${c.id}"${c.id === COURSE.id ? ' selected' : ''}>${c.short}</option>`).join('')}</select>
    <button class="sw" id="paceBtn" title="Change pace">${PACE[S.pace].label}</button>
    <button class="sw" id="outBtn" title="Switch user">switch</button>`;
  $('#courseBtn').onchange = e => pickCourse(e.target.value);
  $('#paceBtn').onclick = cyclePace;
  $('#outBtn').onclick = signOut;
}
function pickCourse(id) {
  if (!COURSES[id] || id === S.course) return;
  S.course = id;
  setCourse(S.course); persist(); buildRail(); buildWho(); go('#/'); render();
}
function cyclePace() {
  const ks = Object.keys(PACE); S.pace = ks[(ks.indexOf(S.pace) + 1) % ks.length];
  persist(); buildWho(); render();
}
function closeNav() { document.body.classList.remove('nav'); }
/* The drawer, the search sheet and the print view all sit above the top bar, so a tap
   on Home lands on them instead. Any navigation dismisses all three first. */
function closeOverlays() {
  closeNav();
  if (!$('#finder').hidden) closeFinder();
  if (!$('#printview').hidden) closePrint();
}

/* ---------------- views ---------------- */
function render() {
  const h = (location.hash || '#/').slice(1);
  const v = $('#view'); v.scrollTop = 0; window.scrollTo(0, 0);
  const d = h.match(/^\/drill\/([\w]+)\/([\w]+)/);
  if (d && unitById(d[1])) return viewDrill(d[1], d[2]);
  if (h.startsWith('/review')) return viewReview();
  const tm = h.match(/^\/test\/(\w+)/);
  if (tm) return viewTest(tm[1]);
  if (h.startsWith('/progress')) return viewProgress(decodeURIComponent((h.split('/')[2] || '')));
  const m = h.match(/^\/u\/([\w]+)(?:\/(\w+))?(?:\/([\w.-]+))?/);
  if (m && unitById(m[1])) return viewUnit(m[1], m[2] || 'learn', m[3]);
  if (h.startsWith('/mistakes')) return viewMistakes();
  if (h.startsWith('/favourites')) return viewFavs();
  if (h.startsWith('/print')) return viewPrintCentre();
  if (h.startsWith('/map')) {            // /map, /map/i/<idea>, /map/k, /map/c/<concept>, /map/units[/<unit>]; /map/<unit> from older links
    const seg = h.split('/');
    if (seg[2] === 'units') return viewMap(seg[3] || null);
    if (seg[2] && unitById(seg[2])) return viewMap(seg[2]);
    if (seg[2] === 'i') return viewIdea(seg[3]);
    if (seg[2] === 'c') return viewConcept(decodeURIComponent(seg[3] || ''));
    if (seg[2] === 'k') return viewGlossary(seg[3] === 'all');
    return viewIdeas();
  }
  if (h.startsWith('/settings')) return viewSettings();
  viewHome();
  function viewHome() {
    const o = overall(), st = streak();
    const nextUnit = U.find(u => unitStats(u.id).pct < 100) || U[0];
    v.innerHTML = `<div class="wrap wide">
      <p class="eyebrow">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      <h1 style="font-size:2.1rem;margin:6px 0 4px;letter-spacing:-.02em">Hello, ${S.name}.</h1>
      <p class="lead" style="margin-bottom:14px;max-width:56ch">${st > 1 ? `You have practised ${st} days in a row. ` : ''}Pick up where you left off in <strong>${nextUnit.title}</strong>, or choose any unit below.</p>
      <div class="row" style="margin:0 0 26px">
        <span class="unitlab">Course <strong>${COURSE.name}</strong></span>
        <span class="unitlab">Pace <strong>${PACE[S.pace].label}</strong></span>
        <button class="btn sm" data-nav="#/settings">Change course or pace</button>
      </div>
      <div class="grid g3" style="margin-bottom:28px">
        <div class="stat"><div class="v">${o.s}<span style="font-size:1rem;color:var(--ink3)">/${o.t}</span></div><div class="l">problems solved</div></div>
        <div class="stat"><div class="v">${o.pct}%</div><div class="l">of the course</div>
          <div class="bar" style="margin-top:8px"><i style="width:${o.pct}%"></i></div></div>
        <div class="stat"><div class="v">${o.amcDone}</div><div class="l">AMC challenges cleared</div></div>
        <div class="stat"><div class="v">${S.mistakes.length}</div><div class="l">to review</div>
          ${S.mistakes.length ? `<button class="btn sm" style="margin-top:8px" data-nav="#/mistakes">Review now</button>` : ''}</div>
      </div>
      ${(() => { const weak = U.map(u => unitState(u.id)).filter(m => m.state === 'weak'), ready = readyUnits();
        if (!weak.length && !(o.s > 0 && ready.length)) return '';
        return `<button class="ucard" data-nav="#/map" style="margin-bottom:28px">
          <span class="rail-strip" style="background:${weak.length ? 'var(--wrong)' : 'var(--right)'}"></span>
          <p class="eyebrow" style="padding-left:.75rem">Knowledge map</p>
          <h4>${weak.length ? (weak.length === 1 ? 'One unit is holding others up' : weak.length + ' units are holding others up')
                            : 'You are clear to move ahead'}</h4>
          <p>${weak.length ? 'Work further on rests on ' + (weak.length === 1 ? 'it' : 'them') + '. The map shows exactly what, and what to shore up first.'
                           : ready.length + ' unit' + (ready.length === 1 ? '' : 's') + ' ahead of you rest only on things you have already got solid.'}</p>
          <div class="meta"><span class="pct" style="color:${weak.length ? 'var(--wrong)' : 'var(--right)'}">Open the map &rarr;</span></div></button>`; })()}
      ${studiedUnits().length >= 2 ? `<button class="ucard" data-nav="#/review" style="margin-bottom:28px">
        <span class="rail-strip" style="background:var(--mark)"></span>
        <p class="eyebrow" style="padding-left:.75rem">Spaced practice</p>
        <h4>Mixed review — ${studiedUnits().length} units in play</h4>
        <p>Ten problems jumping between everything you have studied, with fresh numbers. Ten minutes here does more for remembering than ten more problems in one unit.</p>
        <div class="meta"><span class="pct" style="color:var(--mark)">Start review &rarr;</span></div></button>` : ''}
      ${chaptersOf().map(c => `
        <h2 style="font-size:1.15rem;margin:26px 0 12px">Chapter ${c.n} · ${c.name} <span class="unitlab" style="font-family:var(--sans)">${unitSpan(c.ids)}</span></h2>
        <div class="grid g2">${c.ids.map(unitById).map(u => { const s = unitStats(u.id);
          return `<button class="ucard" data-u="${u.id}"><span class="rail-strip"></span>
            <p class="eyebrow" style="padding-left:.75rem">Unit ${unitNo(u)}</p><h4>${u.title}</h4><p>${plain(u.big)}</p>
            <div class="meta"><div class="bar"><i style="width:${s.pct}%"></i></div><span class="pct">${s.solved}/${s.total}</span></div>
          </button>`; }).join('')}${reviewCard(c.key, 'Chapter ' + c.n + ' review',
            'Concept review and a practice test covering ' + unitSpan(c.ids) + ' — fresh problems every time.')}</div>`).join('')}
      <h2 style="font-size:1.15rem;margin:26px 0 12px">Exams</h2>
      <div class="grid g2">${reviewCard('mid', 'Midterm review', 'The first half of the course: concept review and a longer practice test.')}
        ${reviewCard('final', 'Final exam review', 'The whole course: every chapter, with a long practice test.')}</div>
    </div>`;
    wire(v);
  }
}
/** A review on the home page: the card that closes each chapter, and the two exams. */
function reviewCard(key, title, blurb) {
  const t = lastTest(key);
  return `<button class="ucard revcard" data-nav="#/test/${key}"><span class="rail-strip" style="background:var(--mark)"></span>
    <p class="eyebrow" style="padding-left:.75rem">✎ Review</p><h4>${title}</h4><p>${blurb}</p>
    <div class="meta"><span class="pct" style="color:var(--mark)">${t ? 'Last practice test ' + t.ok + ' / ' + t.n + ' · ' + fmtDate(t.at) : 'Not taken yet'} &rarr;</span></div></button>`;
}
function wire(root) {
  root.querySelectorAll('[data-u]').forEach(b => b.onclick = () => go('#/u/' + b.dataset.u + '/learn'));
  root.querySelectorAll('[data-nav]').forEach(b => b.onclick = () => go(b.dataset.nav));
}

/* ---------- unit ---------- */
function viewUnit(id, tab, focus) {
  const u = unitById(id), v = $('#view'), st = unitStats(id);
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', b.dataset.u === id));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', 'false'));
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">Unit ${unitNo(u)} · ${window.STRANDS[u.strand].name}</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">${u.title}</h1>
    ${ideaLine(id)}
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
  if (v.querySelector('.idealine')) wire(v.querySelector('.idealine'));
  const body = $('#tabbody');
  if (tab === 'practice') return runSession(body, u, sessionFor(id, S.pace), 'practice');
  if (tab === 'drills') return drillsBody(body, u);
  if (tab === 'challenge') return runSession(body, u, probsFor(id).amc.map(p => Object.assign({ t: 4 }, p)), 'challenge');
  if (tab === 'print') return unitPrintPanel(body, u);
  learnBody(body, u, focus);
}

/* Long runs of text read as a wall on a phone, so anything past about four lines is
   broken at the nearest sentence end. Splitting on rendered length keeps the author free
   to write a whole thought without counting characters. */
function splitLong(t, target) {
  const plainLen = x => x.replace(/<[^>]+>/g, '').replace(/\$[^$]*\$/g, 'X').length;
  if (plainLen(t) <= (target || 160)) return [t];
  const parts = t.split(/(?<=[.!?])\s+/);
  const out = []; let cur = '';
  for (const p of parts) {
    if (cur && plainLen(cur + ' ' + p) > (target || 160)) { out.push(cur); cur = p; }
    else cur = cur ? cur + ' ' + p : p;
  }
  if (cur) out.push(cur);
  return out;
}
/* A discovery opener is a blocks array: strings are paragraphs, {fig} drops in a figure,
   {punch} is the pay-off that earns the notation. Same shape drives screen and print. */
function discoverBlocks(u, figwrap) {
  if (!u.discover) return '';
  return u.discover.map((b, i) => {
    if (typeof b === 'string') return splitLong(b).map(t => `<p${i === 0 ? ' class="lead-in"' : ''}>${M(t)}</p>`).join('');
    if (b.fig) return figwrap ? `<div class="figwrap">${window.figure(b.fig)}</div>` : '';
    if (b.punch) return `<div class="punch">${splitLong(b.punch, 150).map(t => `<p>${M(t)}</p>`).join('')}</div>`;
    return '';
  }).join('');
}
function factBlocks(u) {
  return u.funfact ? u.funfact.flatMap(t => splitLong(t)).map(t => `<p>${M(t)}</p>`).join('') : '';
}

/** The unit's own illustration, shown once the first section has set up what it shows. */
function unitFig(u) {
  return u.fig && window.FIGURES && window.FIGURES[u.fig]
    ? `<div class="figwrap">${window.figure(u.fig)}</div>` : '';
}
function learnBody(body, u, focus) {
  body.innerHTML = `
    ${u.discover ? `<div class="card-note discover"><h4>Discover it yourself</h4>${discoverBlocks(u, true)}</div>` : unitFig(u)}
    ${u.sections.map((s, i) => `<section class="sec"><h3>${M(s.h)}</h3>
      ${s.p.map(p => `<p>${M(p)}</p>`).join('')}
      ${s.fig ? `<div class="figwrap">${window.figure(s.fig)}</div>` : ''}
      ${s.box ? `<div class="box ${s.box.k}"><h4>${M(s.box.h)}</h4><p>${M(s.box.t)}</p></div>` : ''}</section>
      ${i === 0 && u.discover ? unitFig(u) : ''}`).join('')}
    <section class="sec"><h3>Worked examples</h3>
      ${u.examples.map((e, i) => `<div class="ex">
        <header><span class="eyebrow">Example ${i + 1}</span><b>${M(e.t)}</b></header>
        <div class="q">${M(e.q)}</div>
        ${e.fig ? `<div class="exfig">${window.figure(e.fig)}</div>` : ''}
        <ol class="steps">${e.steps.map(s => `<li><div><div class="do">${M(s.do)}</div><div class="why">${M(s.why)}</div></div></li>`).join('')}</ol>
        <div class="ans">Answer: ${M(e.ans)}</div></div>
        ${e.try && window.INTERACTIVE && window.INTERACTIVE[e.try] ? `<div class="tryit" data-try="${e.try}"></div>` : ''}`).join('')}
    </section>
    <section class="sec"><h3>Words to know</h3>
      <div class="vocab">${u.vocab.map(([t, d]) => { const c = CON.forTerm ? CON.forTerm(t, u.id) : null;
        return `<div><dt>${c ? `<button class="linkbtn term" data-nav="#/map/c/${c.id}" title="Where this idea comes from and where it leads">${M(t)}</button>` : M(t)}</dt><dd>${M(d)}</dd></div>`; }).join('')}</div></section>
    <section class="sec"><h3>Mistakes to watch for</h3>
      <ul class="mist">${u.mistakes.map(m => `<li><span>${M(m)}</span></li>`).join('')}</ul></section>
    ${u.funfact ? `<div class="card-note"><h4>Fun fact</h4>${factBlocks(u)}</div>` : ''}
    <div class="row" style="margin-top:32px">
      <button class="btn pri" data-t2="practice">Start practising →</button>
      <button class="btn" id="plesson">⎙ Print this lesson</button>
    </div>`;
  body.querySelectorAll('[data-t2]').forEach(b => b.onclick = () => go('#/u/' + u.id + '/' + b.dataset.t2));
  body.querySelectorAll('.vocab [data-nav]').forEach(b => b.onclick = () => go(b.dataset.nav));
  body.querySelectorAll('[data-try]').forEach(x => window.INTERACTIVE[x.dataset.try](x));
  $('#plesson').onclick = () => doPrint([lessonSheet(u)], 'Unit ' + unitNo(u) + ' lesson sheet');
  if (focus && CON.byId[focus]) focusConcept(body, u, CON.byId[focus]);
}
/** Arriving from a trace-back: say what was asked for, light up the section that teaches it
    and its entry in Words to know, and scroll there. */
function focusConcept(body, u, c) {
  const words = c.alias.split(/[\s-]+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[\\s-]+');
  const rx = new RegExp('(^|[^a-z])' + words + '(s|es)?(?![a-z])' + (c.alias === 'pi' ? '|π' : ''), 'i');
  const secs = [...body.querySelectorAll('section.sec')].slice(0, u.sections.length);
  const sec = secs.find(x => rx.test(x.textContent));
  const row = [...body.querySelectorAll('.vocab > div')].find(x => rx.test(x.querySelector('dt').textContent));
  [sec, row].forEach(x => x && x.classList.add('focus'));
  const note = el('div', 'backtrack focusnote', `<b>${M(c.name)}</b>${M(c.def)}
    <span class="trace-meta" style="display:block;margin-top:4px">${sec ? 'Highlighted below, where this lesson teaches it.'
      : row ? 'Highlighted below in Words to know.' : 'Taught in this lesson.'}${c.home !== u.id ? ' First met in ' + conceptHome(c) + '.' : ''}</span>`);
  body.insertBefore(note, body.firstChild);
  const target = sec || row;
  if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
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
        : mode === 'concept' ? 'Every problem here uses this one idea, gathered from whichever units it turns up in — the ones you missed come first.'
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
      showUnit: mode === 'review' || mode === 'concept',
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
        <button class="btn" data-nav="#/u/${u.id}/${mode === 'challenge' || mode === 'concept' ? 'learn' : 'challenge'}">${mode === 'challenge' || mode === 'concept' ? 'Back to the lesson' : 'AMC challenge →'}</button>
      </div></div></div>`;
    $('#again').onclick = () => {
      if (mode === 'drill' && list[0] && list[0].unitId) return viewDrill(list[0].unitId, list[0].skill);
      if (mode === 'review') return go('#/review');
      i = 0; state.fill(null); show(); };
    wire($('#slot'));
  }
  show();
}

const CON_LABEL = { solid: 'Solid', shaky: 'Nearly there', weak: 'Needs work', started: 'Just started', new: 'Not tried yet' };
const CON_CHIP = { solid: 't1', shaky: 't3', weak: 'amc', started: 't2', new: 't2' };
/** After a wrong answer: the ideas the problem turns on, weakest first, each traced back to
    where it was first taught and to anything earlier it rests on that is also going badly. */
function traceBox(cs, p) {
  const rank = { weak: 0, shaky: 1, started: 2, new: 3, solid: 4 };
  const items = cs.slice(0, 3).map(c => ({ c, m: conceptState(c, p.id) }))
    .sort((a, b) => rank[a.m.state] - rank[b.m.state]);
  const names = items.map(x => '<strong>' + M(x.c.name) + '</strong>');
  const box = el('div', 'backtrack trace');
  box.innerHTML = `<b>Trace it back.</b> This one turns on ${names.length > 1
      ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0]}.
    ${items.map(({ c, m }) => {
      const deeper = CON.chain(c.id).map(x => CON.byId[x.id]).find(d => conceptState(d).state === 'weak');
      return `<div class="trace-item">
        <div class="trace-h"><b>${M(c.name)}</b>${m.tried ? `<span class="chip ${CON_CHIP[m.state]}">${CON_LABEL[m.state]}</span>` : ''}</div>
        <p>${M(c.def)}</p>
        <p class="trace-meta">First taught in ${conceptHome(c)}. You have ${conceptRecord(m, true)}.</p>
        ${deeper ? `<p class="trace-meta">It rests on <strong>${M(deeper.name)}</strong> (${conceptHome(deeper)}),
          which is going badly too — that may be the real snag.</p>` : ''}
        <div class="row" style="margin-top:8px">
          <button class="btn sm" data-nav="#/u/${c.home}/learn/${c.id}">Review it in the lesson</button>
          ${deeper ? `<button class="btn sm" data-nav="#/u/${deeper.home}/learn/${deeper.id}">Go back to ${plain(M(deeper.name))}</button>` : ''}
          <button class="btn sm" data-nav="#/map/c/${c.id}">Trace it on the map</button></div>
      </div>`; }).join('')}`;
  return box;
}

/** The same set laid out as a worksheet: every problem on screen at once, and nothing
    marked until the learner asks. Paper gives you this for free; on a screen it has to be
    built, because the one-at-a-time player hides how much is left and marks as you go. */
function runSheet(body, u, list, mode, extra) {
  extra = extra || {};
  if (!list.length) { body.innerHTML = `<div class="empty"><b>Nothing here yet</b>Try another tab.</div>`; return; }
  const state = list.map(() => null);
  body.innerHTML = `
    <p style="font-size:.82rem;color:var(--ink3);margin:0 0 20px;max-width:64ch">${mode === 'test'
      ? `Test conditions: ${list.length} problems, no hints, and nothing is marked until you press <b>Check all</b>. Blanks count as wrong, as they would on the day. Hints and full solutions open up once a problem is marked.`
      : `All ${list.length} on one page, like a worksheet. Work straight down — nothing is marked until you press <b>Check all</b>, so you can still change your mind. Every question keeps its own hint.`}</p>
    <div class="wsheet">${list.map((p, k) =>
      `<div class="wsq"><div class="wsn">${k + 1}</div><div class="wss" data-k="${k}"></div></div>`).join('')}</div>
    <div class="wsfoot">
      <button class="btn pri" id="checkall">Check all ${list.length}</button>
      <span class="unitlab" id="wstally"></span>
    </div>`;
  const tally = body.querySelector('#wstally'), btn = body.querySelector('#checkall');
  function draw() {
    const done = state.filter(x => x !== null).length, ok = state.filter(x => x === true).length;
    body.querySelectorAll('.wsn').forEach((el0, k) => {
      el0.dataset.s = state[k] === true ? 'ok' : state[k] === false ? 'no' : ''; });
    tally.innerHTML = !done ? 'Nothing marked yet'
      : `<strong>${ok} right</strong> of ${done} marked` + (done < list.length ? ` · ${list.length - done} still open` : '');
    btn.disabled = done >= list.length;
    btn.textContent = done >= list.length ? 'All ' + list.length + ' marked' : 'Check all ' + list.length;
  }
  body.querySelectorAll('.wss').forEach(slot => {
    const k = +slot.dataset.k;
    playProblem(slot, list[k], { unit: u, defer: true, standalone: true, test: mode === 'test',
      showUnit: mode === 'review' || mode === 'concept', onResult: ok => { state[k] = ok; draw(); } });
  });
  btn.onclick = () => {
    body.querySelectorAll('.wss').forEach(slot => {
      const c = slot.querySelector('#check');
      if (!c || c.disabled) return;
      const inp = slot.querySelector('#ans');
      if (inp && !inp.value.trim()) return;      /* leave blanks alone rather than yanking focus about */
      c.click();
    });
    draw();
    if (extra.onCheck) return extra.onCheck(state);     // a test reports instead of jumping to the first miss
    const qs = body.querySelectorAll('.wsq');
    for (let k = 0; k < qs.length; k++)
      if (state[k] === false) { qs[k].scrollIntoView({ behavior: 'smooth', block: 'center' }); break; }
  };
  draw();
}

/** Render one problem into `slot`. opts: {unit, index, total, onResult, onNext, standalone, defer} */
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
      ${opts.showUnit && p.unitId && unitById(p.unitId) ? `<span class="chip t2">Unit ${unitNo(unitById(p.unitId))} · ${unitById(p.unitId).title}</span>` : ''}
      ${opts.total ? `<span style="font-size:.8rem;color:var(--ink3);font-weight:600">${opts.index + 1} of ${opts.total}</span>` : ''}
      <div class="sp" style="flex:1"></div>
      <button class="btn sm star" id="fav" aria-pressed="${isFav()}" title="Save this problem">★ <span>${isFav() ? 'Saved' : 'Save'}</span></button>
    </div>
    <div class="pl-body">
      <div class="qtext">${M(p.q)}</div>
      ${mc ? `<div class="choices">${p.c.map((c, k) =>
          `<button class="choice" data-k="${k}"><span class="k">${'ABCDE'[k]}</span><span>${M(c)}</span></button>`).join('')}</div>${
        opts.defer ? `<div class="answerbar" style="margin-top:14px"><button class="btn pri" id="check">Check</button>
          <span class="unitlab">or leave it and press <strong>Check all</strong> at the foot of the page</span></div>` : ''}`
        : `<div class="answerbar">
            <input type="text" id="ans" placeholder="your answer" autocomplete="off" autocapitalize="off" spellcheck="false">
            ${p.unit ? `<span class="unitlab">${M(p.unit)}</span>` : ''}
            <button class="btn pri" id="check">Check</button></div>
           <p style="font-size:.78rem;color:var(--ink3);margin:8px 0 0">Fractions are fine — type them like <code>3/8</code> or <code>1 1/2</code>.</p>`}
      <div id="fbslot"></div>
    </div>
    <div class="pl-foot">
      <button class="btn sm" id="hint"${opts.test ? ' hidden' : ''}>💡 Hint</button>
      <button class="btn sm" id="more"${opts.test ? ' hidden' : ''}>↻ More like this</button>
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
    /* Without a written hint, the most useful nudge is the idea the problem turns on, in
       the words the lesson used — not "look back at the lesson", which says nowhere. */
    const cs = conceptsOf(p, u).slice(0, p.hint ? 1 : 2);
    const head = t => `<strong style="font-family:var(--sans);font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--mark);display:block;margin-bottom:4px">${t}</strong>`;
    const ideas = cs.map(c => `<p class="keyidea"><b>${M(c.name)}</b> — ${M(c.def)}
      <button class="linkbtn" data-nav="#/u/${c.home}/learn/${c.id}">Where this was taught: ${conceptHome(c)} →</button></p>`).join('');
    const h = el('div', 'hintbox', p.hint ? head('Hint') + M(p.hint) + (ideas ? `<div class="keyideas">${head('Key idea')}${ideas}</div>` : '')
      : ideas ? head(cs.length > 1 ? 'Key ideas' : 'Key idea') + ideas
      : head('Hint') + M('Look back at the worked examples in the lesson — this uses the same move.'));
    fb.appendChild(h); wire(h);
  };
  slot.querySelector('#more').onclick = () => {
    const uid = p.unitId || (u && u.id);
    const skills = window.genSkills(uid);
    const sk = skills.includes(p.skill) ? p.skill : skills[Math.floor(Math.random() * skills.length)];
    const np = window.makeProblem(uid, sk);
    if (np) { np.unitId = uid; playProblem(slot, np,
      opts.defer ? Object.assign({}, opts) : { unit: u, standalone: true }); }
    else fb.appendChild(el('div', 'hintbox', 'No generator for this skill yet — try another problem in the set.'));
  };
  if (opts.onNext) {
    slot.querySelector('#skip').onclick = opts.onNext;
    slot.querySelector('#next').onclick = opts.onNext;
  }
  if (mc) {
    slot.querySelectorAll('.choice').forEach(b => b.onclick = () => {
      if (answered) return; picked = +b.dataset.k;
      slot.querySelectorAll('.choice').forEach(x => x.dataset.state = x === b ? 'sel' : '');
      if (!opts.defer) judge(picked === p.a, p.c[picked]);
    });
    /* On a worksheet the whole set is answered before anything is marked, so a choice
       only gets selected here — the Check button does the judging. */
    if (opts.defer) slot.querySelector('#check').onclick = () => {
      if (answered || picked == null) return; judge(picked === p.a, p.c[picked]); };
  }
  else {
    const inp = slot.querySelector('#ans');
    const submit = () => { if (answered) return; const val = inp.value; if (!val.trim()) { inp.focus(); return; } judge(isRight(val, p), val); };
    slot.querySelector('#check').onclick = submit;
    inp.onkeydown = e => { if (e.key === 'Enter') submit(); };
    setTimeout(() => { if (!opts.standalone) inp.focus({ preventScroll: true }); }, 30);
  }

  function judge(ok, given) {
    answered = true; touchDay();
    if (opts.test) slot.querySelectorAll('#hint, #more').forEach(b => b.hidden = false);
    const prev = S.results[p.id] || { attempts: 0 };
    S.results[p.id] = { correct: ok || prev.correct === true, attempts: prev.attempts + 1, at: Date.now(),
      firstTryCorrect: prev.attempts ? (prev.firstTryCorrect == null ? !!prev.correct && prev.attempts === 1 : prev.firstTryCorrect) : ok,
      unitId: p.unitId || (u && u.id), skill: p.skill };
    if (mc) { slot.querySelectorAll('.choice').forEach((x, k) => {
        x.disabled = true;
        x.dataset.state = k === p.a ? 'right' : (k === picked && !ok) ? 'wrong' : '';
      });
      const cb = slot.querySelector('#check'); if (cb) cb.disabled = true; }
    else { const inp = slot.querySelector('#ans'); inp.disabled = true;
      slot.querySelector('#check').disabled = true;
      inp.style.borderColor = ok ? 'var(--right)' : 'var(--wrong)'; }

    const box = el('div', 'fb ' + (ok ? 'ok' : 'no'));
    box.innerHTML = ok
      ? `<b>Correct.</b>${p.t === 4 || p.kind === 'amc' ? 'That is a competition-level problem — well done.' : 'On to the next one.'}`
      : `<b>Not quite.</b>You answered ${mc ? M(String(given)) : '<strong>' + esc(String(given)) + '</strong>'}. The answer is <strong>${mc ? M(p.c[p.a]) : M(String(p.a))}${p.unit && !mc ? ' ' + plain(p.unit) : ''}</strong>.`;
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
      /* Trace the miss back to the ideas the problem turns on — "median, taught in Grade 6"
         is something to act on, where "this rests on Statistics" is a whole chapter.
         Only when no idea can be named does it fall back to the unit a problem rests on. */
      const cs = conceptsOf(p, u);
      const gap = !cs.length && uid0 ? gapsFor(uid0, p.skill)[0] : null;
      if (cs.length) { const tb = traceBox(cs, p); fb.appendChild(tb); wire(tb); }
      else if (gap) {
        const gu = unitById(gap.id);
        const bt = el('div', 'backtrack');
        bt.innerHTML = `<b>This one rests on ${plain(gu.title)}.</b>
          ${gap.state === 'weak'
            ? 'Of the ' + gap.tried + ' you have tried there, only <strong>' + gap.solved + '</strong> came out right'
              + (gap.open ? ', and one is still in your mistake list' : '') + ' — that may be the real snag.'
            : 'You have not started that one yet, and this builds straight on it.'}
          <span class="row" style="margin-top:8px">
            <button class="btn sm" data-nav="#/u/${gap.id}/learn">Go back to it</button>
            <button class="btn sm" data-nav="#/map/${uid0}">See the map</button></span>`;
        fb.appendChild(bt); wire(bt);
      }
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
    <p class="lead" style="max-width:60ch;margin-bottom:6px">The unit set gives you only two or three goes at each skill. A drill gives you six to twelve fresh ones on a single skill — new numbers every time, so you cannot coast on remembering an answer. Take them one at a time, or put the whole set on one page like a worksheet.</p>
    ${shaky.length ? `<div class="box warn" style="margin:18px 0"><h4>Worth a drill</h4><p>You have stumbled on ${shaky.map(sk => '<strong>' + skillLabel(sk, u.id) + '</strong>').join(', ')} in this unit.</p></div>` : ''}
    <div class="row" style="margin-top:18px">
      <button class="btn" id="ppack">⎙ Print drill packs for every skill</button>
      <span class="unitlab" id="ppackn"></span></div>
    <div id="dopts" style="margin-top:10px"></div>
    <div class="grid g2" style="margin-top:18px">${skills.map(sk => { const st = skillStat(u.id, sk);
      return `<button class="ucard" data-sk="${sk}">
        <span class="rail-strip"${STATE_COLOR[st.state] ? ` style="background:${STATE_COLOR[st.state]}"` : ''}></span>
        <p class="eyebrow" style="padding-left:.75rem">${STATE_LABEL[st.state]}</p>
        <h4>${skillLabel(sk, u.id)}</h4>
        <p>${st.solved} of ${st.total} solved${st.state === 'shaky' ? ', but you needed a second go' : st.state === 'open' ? ' — one is still in your mistake list' : ' in the unit set'}</p>
        <div class="meta"><span class="pct" style="color:var(--accent)">Drill 10 fresh &rarr;</span></div></button>`; }).join('')}</div>`;
  body.querySelectorAll('[data-sk]').forEach(b => b.onclick = () => go('#/drill/' + u.id + '/' + b.dataset.sk));
  const say = () => { const o = drillOpts();
    $('#ppackn').textContent = `${setsLabel(o.sets)} × ${skills.length} skills × ${o.per} fresh problems, answers on their own pages`; };
  $('#dopts').appendChild(drillOptsBar(say)); say();
  $('#ppack').onclick = () => doPrint(drillSheets([u]), 'Unit ' + unitNo(u) + ' drill packs', () => drillSheets([u]));
}
const DRILL_NS = [6, 8, 10, 12];
function viewDrill(unitId, skill) {
  const u = unitById(unitId), v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', b.dataset.u === unitId));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', 'false'));
  const howMany = DRILL_NS.indexOf(S.drillN) > -1 ? S.drillN : 10;
  const sheet = S.drillSheet === true;
  const list = drillSet(unitId, skill, howMany);
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">Unit ${unitNo(u)} · drill</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">${skillLabel(skill, unitId)}</h1>
    <p class="lead" style="max-width:56ch">${list.length} freshly generated problems on this one skill. Hints are on every question.</p>
    <div class="row" style="margin:18px 0 10px">
      <button class="btn sm" data-nav="#/u/${unitId}/drills">← All drills in this unit</button>
      <button class="btn sm" id="newset">↻ New set</button>
      <button class="btn sm" id="pdrill">⎙ Print this drill</button></div>
    <div class="row optbar" style="margin:0 0 22px">
      <label>How many <select class="sw" id="dn">${DRILL_NS.map(k =>
        `<option value="${k}"${k === howMany ? ' selected' : ''}>${k} problems</option>`).join('')}</select></label>
      <label>Layout <select class="sw" id="dlay">
        <option value="one"${sheet ? '' : ' selected'}>One at a time</option>
        <option value="all"${sheet ? ' selected' : ''}>All on one page</option></select></label>
      <span id="dsets"></span>
    </div>
    <div id="sess"></div></div>`;
  wire(v);
  $('#newset').onclick = () => viewDrill(unitId, skill);
  $('#dn').onchange = e => { S.drillN = +e.target.value; persist(); viewDrill(unitId, skill); };
  $('#dlay').onchange = e => { S.drillSheet = e.target.value === 'all'; persist(); viewDrill(unitId, skill); };
  /* The set on screen prints first; any further sets are fresh, and all the answers go last. */
  const drillDoc = first => {
    const n = drillOpts().sets, parts = [];
    for (let i = 1; i <= n; i++) {
      const set = i === 1 && first ? first : drillSet(unitId, skill, howMany);
      parts.push(genParts('Unit ' + unitNo(u) + ' · ' + skillLabel(skill, unitId) + (n > 1 ? ' — set ' + i + ' of ' + n : ''),
        set.length + ' problems on one skill. Show your work.', set,
        'Drill · ' + skillLabel(skill, unitId) + ' · solutions at the back', courseOf(u).name));
    }
    return parts.map(x => x.q).concat(parts.map(x => x.s));
  };
  const sets = drillOptsBar(() => { $('#pdrill').textContent = '⎙ Print ' + (drillOpts().sets > 1 ? drillOpts().sets + ' sets' : 'this drill'); }, false);
  sets.style.display = 'contents'; $('#dsets').replaceWith(sets);
  $('#pdrill').textContent = '⎙ Print ' + (drillOpts().sets > 1 ? drillOpts().sets + ' sets' : 'this drill');
  $('#pdrill').onclick = () => doPrint(drillDoc(list), skillLabel(skill, unitId) + ' drill', () => drillDoc());
  if (!list.length) { $('#sess').innerHTML = '<div class="empty"><b>No drill for this skill yet</b>Try another skill in the unit.</div>'; return; }
  (sheet ? runSheet : runSession)($('#sess'), u, list, 'drill');
}

/* ---------- spaced mixed review ---------- */
/* ---------- chapter, midterm and final reviews ---------- */
/** Getting ready for a test: where you stand, the concepts in one place, then a full practice
    test under test conditions — no hints, nothing marked until the end — with a report. */
function viewTest(key) {
  const v = $('#view'), sc = testScope(key);
  if (!sc) return go('#/');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/test/' + key));
  const units = sc.ids.map(unitById), byUnit = scopeConcepts(sc);
  const all = [].concat(...Object.values(byUnit));
  const cst = {}; all.forEach(c => cst[c.id] = conceptState(c));
  const shore = all.filter(c => cst[c.id].state === 'weak' || cst[c.id].state === 'shaky')
    .sort((a, b) => (cst[a.id].state === 'weak' ? 0 : 1) - (cst[b.id].state === 'weak' ? 0 : 1));
  const anyTried = all.some(c => cst[c.id].tried);
  const last = lastTest(key), exam = sc.kind === 'exam';
  const est = perUnit(sc) * sc.ids.length;
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">${exam ? 'Exam review' : 'Chapter review'} · ${COURSE.name}</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">${sc.title}</h1>
    <p class="lead" style="max-width:62ch">${sc.sub}. ${exam
      ? 'An exam reaches back over months, so start with the concept review — it is the fastest way to find what has faded.'
      : 'Schools test at the end of a chapter like this one. Three steps: see where you stand, refresh the concepts, then take a practice test under test conditions.'}</p>
    <div class="row" style="margin:18px 0 6px">
      <button class="btn pri" data-start>Start the practice test →</button>
      <button class="btn" id="tprint">⎙ Print a practice test</button>
      <button class="btn" id="tguide">⎙ Print the study guide</button></div>
    ${last ? `<p class="unitlab" style="margin:8px 0 0">Last practice test: <strong>${last.ok} / ${last.n}</strong> on ${fmtDate(last.at)}</p>` : ''}

    <section class="sec"><h3>1 · Where you stand</h3>
      <div class="grid g3">${units.map(u => { const st = unitStats(u.id), m = unitState(u.id);
        return `<button class="ucard" data-u="${u.id}"><span class="rail-strip" style="background:${MAP_LINE[m.state]}"></span>
          <p class="eyebrow" style="padding-left:.75rem">Unit ${unitNo(u)} · ${MAP_LABEL[m.state]}</p><h4>${u.title}</h4>
          <div class="meta"><div class="bar"><i style="width:${st.pct}%"></i></div><span class="pct">${st.solved}/${st.total}</span></div></button>`; }).join('')}</div>
      ${shore.length ? `<p style="margin:16px 0 0"><b>Concepts to shore up before the test:</b> ${termList(shore.slice(0, 12))}</p>`
        : `<p class="mapnote">${anyTried ? 'No concept in this ' + (exam ? 'stretch' : 'chapter') + ' is going badly. The practice test will show whether that holds under test conditions.'
          : 'Nothing practised here yet — the practice test is a fair place to find out what you already know.'}</p>`}
    </section>

    <section class="sec"><h3>2 · Concept review</h3>
      <p style="margin:0 0 12px">The key ideas, the words to know and the classic mistakes, unit by unit${exam ? ' — open the units you are least sure of' : ''}.</p>
      ${units.map(u => `<details class="crev"${exam ? '' : ' open'}><summary><span class="eyebrow">Unit ${unitNo(u)}</span> ${u.title}</summary>
        <p class="lead" style="font-size:1rem;margin:8px 0">${M(u.big)}</p>
        ${u.sections.filter(s => s.box).map(s => `<div class="box ${s.box.k}"><h4>${M(s.box.h)}</h4><p>${M(s.box.t)}</p></div>`).join('')}
        ${byUnit[u.id].length ? `<div class="vocab" style="margin-top:12px">${byUnit[u.id].map(c => { const m = cst[c.id];
          return `<div><dt>${M(c.name)}${m.tried ? ` <span class="chip ${CON_CHIP[m.state]}">${CON_LABEL[m.state]}</span>` : ''}</dt>
            <dd>${M(c.def)}${c.home !== u.id ? ` <span class="unitlab">— first met in ${conceptHome(c)}</span>` : ''}</dd></div>`; }).join('')}</div>` : ''}
        <p style="margin:14px 0 6px"><b>Watch out for</b></p>
        <ul class="mist">${u.mistakes.slice(0, 3).map(t => `<li><span>${M(t)}</span></li>`).join('')}</ul>
        <div class="row" style="margin-top:12px"><button class="btn sm" data-nav="#/u/${u.id}/learn">Open the full lesson</button>
          <button class="btn sm" data-nav="#/u/${u.id}/drills">Drill its skills</button></div>
      </details>`).join('')}
    </section>

    <section class="sec"><h3>3 · Practice test</h3>
      <p style="margin:0 0 12px">About ${est} fresh problems covering every skill in ${exam ? 'these chapters' : 'the chapter'}, mixed up the way a real test mixes them${sc.amc ? `, then ${sc.amc} AMC problems as a bonus` : ''}. No hints until you check, and new numbers every time you start.</p>
      <div id="tsess"><button class="btn pri" data-start>Start the practice test →</button></div>
    </section>
  </div>`;
  wire(v);
  const start = () => {
    const list = testSet(sc), slot = $('#tsess');
    let saved = false;
    slot.innerHTML = '<div id="tsheet"></div><div id="treport"></div>';
    runSheet($('#tsheet'), units[0], list, 'test', { onCheck: state => {
      if (!saved) { saved = true;
        const main = list.filter(p => p.kind !== 'amc'), ok = list.filter((p, k) => p.kind !== 'amc' && state[k] === true).length;
        S.tests = S.tests || {}; const h = S.tests[testKey(key)] = S.tests[testKey(key)] || [];
        h.unshift({ at: Date.now(), ok, n: main.length }); h.splice(6); persist();
        buildRail(); $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/test/' + key)); }
      const r = $('#treport'); r.innerHTML = testReport(sc, list, state); wire(r);
      r.querySelector('[data-retake]').onclick = start;
      r.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } });
    slot.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  v.querySelectorAll('[data-start]').forEach(b => b.onclick = start);
  $('#tprint').onclick = () => doPrint(practiceTestDoc(sc, testSet(sc)), COURSE.short + ' · ' + sc.title + ' — practice test',
    () => practiceTestDoc(sc, testSet(sc)));
  $('#tguide').onclick = () => doPrint([studyGuide(sc)], COURSE.short + ' · ' + sc.title + ' — study guide');
}
/** On paper: the practice test, then its answers on their own pages. */
function practiceTestDoc(sc, list) {
  const g = genParts(sc.title + ' — practice test', sc.sub + ' · ' + list.length + ' problems. No notes; show your work.',
    list, sc.title + ' practice test · answers at the back', COURSE.name);
  return [g.q, g.s];
}
/** The concept review on paper: for each unit its big idea, key boxes, words and mistakes. */
function studyGuide(sc) {
  const byUnit = scopeConcepts(sc);
  return `<div class="psheet">${PHEAD(sc.title + ' — study guide', sc.sub, COURSE.name)}
    ${sc.ids.map(unitById).map(u => `<div class="psec"><h3>Unit ${unitNo(u)} · ${plain(u.title)}</h3>
      <p>${M(u.big)}</p>
      ${u.sections.filter(s => s.box).map(s => `<div class="pbox"><h4>${M(s.box.h)}</h4><div>${M(s.box.t)}</div></div>`).join('')}
      ${byUnit[u.id].length ? `<table class="pvocab">${byUnit[u.id].map(c => `<tr><td>${plain(M(c.name))}</td><td>${M(c.def)}</td></tr>`).join('')}</table>` : ''}
      <p style="margin-top:5pt"><b>Watch out for</b></p>
      <ol style="font-family:var(--serif);margin:0 0 0 16pt;padding:0">${u.mistakes.slice(0, 3).map(t => `<li>${M(t)}</li>`).join('')}</ol>
    </div>`).join('')}
    <div class="pfoot">${sc.title} study guide · ${COURSE.name}</div></div>`;
}

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
        return `<button class="btn sm" data-dr2="${uid}/${sk}">${skillLabel(sk, uid)} →</button>`; }).join('')}</div>` : ''}

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
    ${(() => { const tally = {};
      S.mistakes.forEach(m => gapsFor(m.unitId).forEach(g => { tally[g.id] = (tally[g.id] || 0) + 1; }));
      const top = Object.keys(tally).sort((a, b) => tally[b] - tally[a]).slice(0, 3);
      if (!top.length) return '';
      return `<div class="box warn" style="margin:16px 0 0"><h4>What these point back to</h4>
        <p>Your mistakes keep leaning on the same earlier ${top.length === 1 ? 'unit' : 'units'}. Fixing ${top.length === 1 ? 'it' : 'those'} usually clears several of these at once.</p>
        <div class="row" style="margin-top:8px">${top.map(id =>
          `<button class="btn sm" data-nav="#/u/${id}/learn">${plain(unitById(id).title)} →</button>`).join('')}
          <button class="btn sm" data-nav="#/map">Open the map</button></div></div>`; })()}
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
    ${u.discover ? `<div class="psec pdiscover"><h3>Discover it yourself</h3>${discoverBlocks(u, true)}</div>` : unitFig(u)}
    ${u.sections.map((s, i) => `<div class="psec"><h3>${plain(s.h)}</h3>
      ${s.p.map(p => `<p>${M(p)}</p>`).join('')}
      ${s.fig ? `<div class="figwrap">${window.figure(s.fig)}</div>` : ''}
      ${s.box ? `<div class="pbox"><h4>${M(s.box.h)}</h4><div>${M(s.box.t)}</div></div>` : ''}</div>
      ${i === 0 && u.discover ? unitFig(u) : ''}`).join('')}
    <div class="psec"><h3>Worked examples</h3>
      ${u.examples.map((e, i) => `<div class="pex"><b>Example ${i + 1} — ${plain(e.t)}</b>
        <div style="font-family:var(--serif);margin:3pt 0">${M(e.q)}</div>
        ${e.fig ? `<div class="figwrap">${window.figure(e.fig)}</div>` : ''}
        <ol>${e.steps.map(s => `<li>${M(s.do)} <span style="color:#555;font-size:9pt">— ${plain(s.why)}</span></li>`).join('')}</ol>
        <div style="margin-top:4pt"><b>Answer:</b> ${M(e.ans)}</div></div>`).join('')}</div>
    <div class="psec"><h3>Words to know</h3><table class="pvocab">
      ${u.vocab.map(([t, d]) => `<tr><td>${plain(t)}</td><td>${M(d)}</td></tr>`).join('')}</table></div>
    <div class="psec"><h3>Mistakes to watch for</h3><ol style="font-family:var(--serif);margin:0 0 0 16pt;padding:0">
      ${u.mistakes.map(m => `<li>${M(m)}</li>`).join('')}</ol></div>
    ${u.funfact ? `<div class="psec"><h3>Fun fact</h3>${factBlocks(u)}</div>` : ''}
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
/* The AMC problems follow the unit set under their own heading, numbered on from it, so the
   solution manual built with the same option lines up question for question. */
const amcHead = (n, from) => `<div class="psec" style="margin-top:12pt"><h3>AMC challenge — ${n} competition problems, from number ${from}</h3></div>`;
function problemSet(u, opts) {
  opts = opts || {};
  const { core, amc } = probsFor(u.id);
  const extra = opts.withAmc ? amc : [];
  const n = core.length + extra.length;
  return `<div class="psheet">${PHEAD('Unit ' + unitNo(u) + ' · ' + u.title, 'Problem set — ' + n + ' problems. Show your work.', courseOf(u).name)}
    ${core.map((p, i) => qBlock(p, i + 1, p.t >= 3)).join('')}
    ${extra.length ? amcHead(extra.length, core.length + 1) + extra.map((p, i) => qBlock(p, core.length + i + 1, true)).join('') : ''}
    <div class="pfoot">Unit ${unitNo(u)} problem set · warm-ups 1–5, core 6–12, stretch 13–${core.length}${extra.length ? ', AMC challenge ' + (core.length + 1) + '–' + n : ''}</div></div>`;
}
function solutionManual(u, opts) {
  opts = opts || {};
  const { core, amc } = probsFor(u.id);
  const list = opts.withAmc ? core.concat(amc) : core;
  return `<div class="psheet">${`<div class="phead"><div><h2>Unit ${unitNo(u)} · ${u.title}</h2>
      <div style="font-size:9.5pt;color:#444">Solution manual — full worked steps</div></div>
      <div class="pm">${window.BRAND} · ${courseOf(u).name} · checking copy<br>${new Date().toLocaleDateString('en-US')}</div></div>`}
    ${list.map((p, i) => (i === core.length ? amcHead(list.length - core.length, core.length + 1) : '') + solBlock(p, i + 1)).join('')}
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
  const g = genParts(title, sub, list, foot + ' · solutions follow on the next page', courseName);
  return g.q + g.s;
}
function genParts(title, sub, list, foot, courseName) {
  return { q: `<div class="psheet">${PHEAD(title, sub, courseName)}
    ${list.map((p, i) => qBlock(p, i + 1, true)).join('')}
    <div class="pfoot">${foot}</div></div>`,
    s: `<div class="psheet"><div class="phead"><div><h2>${title} — solutions</h2></div>
      <div class="pm">${window.BRAND}${courseName ? ' · ' + courseName : ''} · checking copy<br>${new Date().toLocaleDateString('en-US')}</div></div>
      ${list.map((p, i) => solBlock(p, i + 1)).join('')}</div>` };
}
/** Fresh problems on every skill in a unit, grouped by skill. Returns the question sheet and
    the answer sheet separately, so several packs can print with all the answers at the back. */
function drillPack(u, perSkill, set) {
  perSkill = perSkill || 6;
  const groups = [];
  unitSkills(u.id).forEach(sk => { const list = drillSet(u.id, sk, perSkill); if (list.length) groups.push({ sk, list }); });
  let n = 0; const qs = [], ss = [];
  groups.forEach(g => {
    qs.push(`<div class="psec" style="margin-top:10pt"><h3>${skillLabel(g.sk, u.id)}</h3></div>`);
    ss.push(`<div class="psec" style="margin-top:10pt"><h3>${skillLabel(g.sk, u.id)}</h3></div>`);
    g.list.forEach(p => { n++; qs.push(qBlock(p, n, false)); ss.push(solBlock(p, n)); });
  });
  if (!n) return null;
  const which = set ? ' — set ' + set.i + ' of ' + set.n : '';
  return { n, q: `<div class="psheet">${PHEAD('Unit ' + unitNo(u) + ' · ' + u.title,
      'Drill pack' + which + ' — ' + perSkill + ' fresh problems on each of ' + groups.length + ' skills', courseOf(u).name)}
    ${qs.join('')}<div class="pfoot">Unit ${unitNo(u)} drill pack${which} · ${n} problems · solutions at the back</div></div>`,
    s: `<div class="psheet"><div class="phead"><div><h2>Unit ${unitNo(u)} drill pack${which} — solutions</h2></div>
      <div class="pm">${window.BRAND} · checking copy<br>${new Date().toLocaleDateString('en-US')}</div></div>
      ${ss.join('')}</div>` };
}
/* A learner who needs more practice than one pack gives can print several: each set has its
   own fresh numbers. How many sets, and how many problems per skill, is kept per learner. */
const PRINT_SETS = [1, 2, 3, 4, 5], PRINT_PER = [4, 6, 8, 10];
function drillOpts() {
  return { sets: PRINT_SETS.indexOf(S.printSets) > -1 ? S.printSets : 1,
           per: PRINT_PER.indexOf(S.printPer) > -1 ? S.printPer : 6 };
}
const setsLabel = n => n === 1 ? '1 set' : n + ' sets';
/** The two drill choices as an option bar; `onChange` redraws whatever shows the numbers. */
function drillOptsBar(onChange, withPer) {
  const o = drillOpts();
  const bar = el('div', 'row optbar');
  bar.innerHTML = `<label>Drill sets <select class="sw" data-popt="sets">${PRINT_SETS.map(k =>
      `<option value="${k}"${k === o.sets ? ' selected' : ''}>${setsLabel(k)}</option>`).join('')}</select></label>
    ${withPer === false ? '' : `<label>Per skill <select class="sw" data-popt="per">${PRINT_PER.map(k =>
      `<option value="${k}"${k === o.per ? ' selected' : ''}>${k} problems</option>`).join('')}</select></label>`}`;
  bar.querySelectorAll('[data-popt]').forEach(x => x.onchange = () => {
    if (x.dataset.popt === 'sets') S.printSets = +x.value; else S.printPer = +x.value;
    persist(); if (onChange) onChange();
  });
  return bar;
}
/** What the whole-grade print holds, counted before anything is generated. The drill figure
    is a ceiling: a skill with few distinct variations can run out before its full quota. */
function courseCount(o) {
  o = o || drillOpts();
  let set = 0, amc = 0, drill = 0;
  U.forEach(u => { const pr = probsFor(u.id); set += pr.core.length; amc += pr.amc.length;
    drill += unitSkills(u.id).length * o.per * o.sets; });
  return { set, amc, drill, total: set + amc + drill };
}
/** The whole grade on paper. Unit by unit in course order — lesson, problem set with its AMC
    problems, drill sets — so it can be worked straight through; then every answer at the back,
    in the same unit order, behind a divider page so the answers can be kept apart. */
function courseEverything(o) {
  o = o || drillOpts();
  // Drills first, so the cover can give the counts actually printed rather than the ceiling.
  const drills = {}, tally = {};
  U.forEach(u => drills[u.id] = drillSheets([u], o, tally));
  const c = courseCount(o), date = new Date().toLocaleDateString('en-US');
  c.drill = U.reduce((t, u) => t + (tally[u.id] || 0), 0);
  const cover = `<div class="psheet"><div class="phead"><div><h2>${COURSE.name} — the complete course</h2>
      <div style="font-size:9.5pt;color:#444">${U.length} units · ${c.set} problem-set and ${c.amc} AMC problems · ${c.drill} drill problems (${setsLabel(o.sets)}, ${o.per} per skill)</div></div>
      <div class="pm">${window.BRAND}<br>${date}</div></div>
    <div class="pname">Name ______________________________</div>
    <div class="psec"><h3>What is inside</h3>
      <p>Each unit in order: the lesson, its problem set with the AMC challenge problems at the end, then the drill sets. Answers for everything are at the back, after the page headed <b>Answers</b> — take them out before starting if you want to work without them.</p></div>
    <div class="psec"><h3>Units</h3><table class="pvocab">
      ${U.map(u => { const pr = probsFor(u.id); return `<tr><td>Unit ${unitNo(u)}</td><td>${plain(u.title)}
        <span style="color:#555;font-size:9pt"> — ${pr.core.length} + ${pr.amc.length} AMC, ${tally[u.id] || 0} drill</span></td></tr>`; }).join('')}
    </table></div></div>`;
  const divider = `<div class="psheet"><div class="phead"><div><h2>Answers</h2>
      <div style="font-size:9.5pt;color:#444">Solution manuals with full steps, then drill answers — unit by unit, in the same order as the front</div></div>
      <div class="pm">${window.BRAND} · ${COURSE.name}<br>${date}</div></div></div>`;
  const front = [cover], back = [divider];
  U.forEach(u => {
    const d = drills[u.id], half = d.length / 2;
    front.push(lessonSheet(u), problemSet(u, { withAmc: true }), ...d.slice(0, half));
    back.push(solutionManual(u, { withAmc: true }), ...d.slice(half));
  });
  return front.concat(back);
}
/** Fresh drill packs for these units: every question sheet first, then every answer sheet. */
function drillSheets(units, o, tally) {
  o = o || drillOpts();
  const packs = [];
  units.forEach(u => { for (let i = 1; i <= o.sets; i++) {
    const pk = drillPack(u, o.per, o.sets > 1 ? { i, n: o.sets } : null);
    if (pk) { packs.push(pk); if (tally) tally[u.id] = (tally[u.id] || 0) + pk.n; } } });
  return packs.map(pk => pk.q).concat(packs.map(pk => pk.s));
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
      .map(k => plain(skillLabel(k.split('|')[1], k.split('|')[0]))).join(' · ')}</p></div>` : ''}
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
  const { core, amc } = probsFor(u.id), o = drillOpts();
  const drills = o.sets === 1 ? 'a drill pack' : o.sets + ' drill packs';
  body.innerHTML = `<p class="lead" style="max-width:58ch;margin-bottom:22px">Print any of these on paper and work away from the screen. Answers always come on their own pages at the back, so the problems can be handed over without them.</p>
    <div id="dopts" style="margin:0 0 14px"></div>
    <div class="grid g2">
      ${[['lesson', 'Lesson sheet', 'The full explanation, worked examples, vocabulary and the mistakes to watch for.'],
         ['set', 'Problem set', `All ${core.length} problems with ruled space for working. No answers.`],
         ['setamc', 'Problem set + AMC', `The same ${core.length} plus all ${amc.length} AMC challenge problems.`],
         ['sol', 'Solution manual', 'Every problem with full steps, plus a compact answer key.'],
         ['solamc', 'Solution manual + AMC', `Solutions for the extended set, all ${amc.length} AMC problems included.`],
         ['drill', 'Drill packs', `${setsLabel(o.sets)} of ${o.per} fresh problems on every skill, new numbers in each set. Answers at the back.`],
         ['all', 'Everything', `Lesson, problem set with AMC and ${drills}, then every solution at the back.`]].map(([k, t, d]) =>
        `<button class="ucard" data-p="${k}"><span class="rail-strip"></span><h4>⎙ ${t}</h4><p>${d}</p></button>`).join('')}
    </div>
    <div class="box key" style="margin-top:24px"><h4>Tip</h4><p>In the print dialog, choose <strong>Save as PDF</strong> to keep a copy, or print single-sided so there is room to write. Drill packs are generated fresh, so <strong>New problems</strong> in the print view gives a different set.</p></div>`;
  $('#dopts').appendChild(drillOptsBar(() => unitPrintPanel(body, u)));
  body.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
    const k = b.dataset.p;
    const t = 'Unit ' + unitNo(u) + ' · ' + u.title;
    const everything = () => {
      const d = drillSheets([u]), half = d.length / 2;
      return [lessonSheet(u), problemSet(u, { withAmc: true })].concat(d.slice(0, half),
        solutionManual(u, { withAmc: true }), d.slice(half));
    };
    if (k === 'lesson') doPrint([lessonSheet(u)], t + ' — lesson');
    else if (k === 'set') doPrint([problemSet(u)], t + ' — problem set');
    else if (k === 'setamc') doPrint([problemSet(u, { withAmc: true })], t + ' — problem set + AMC');
    else if (k === 'sol') doPrint([solutionManual(u)], t + ' — solutions');
    else if (k === 'solamc') doPrint([solutionManual(u, { withAmc: true })], t + ' — solutions + AMC');
    else if (k === 'drill') doPrint(drillSheets([u]), t + ' — drill packs', () => drillSheets([u]));
    else doPrint(everything(), t + ' — everything', everything);
  });
}
/* ---------- the map view ---------- */
/** Break a title over at most `lines` lines of `max` characters. */
function wrapTitle(t, max, lines) {
  const words = String(t).split(/\s+/), out = []; let cur = '';
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + ' ' + w).length <= max) cur += ' ' + w;
    else { out.push(cur); cur = w; if (out.length === lines) break; }
  }
  if (out.length < lines && cur) out.push(cur);
  const shown = out.join(' ');
  if (shown.length < String(t).length) out[out.length - 1] = out[out.length - 1].replace(/.{1}$/, '…');
  return out;
}
/** Layers by depth in the full graph, then a few barycentre passes to untangle the edges.
    `opt.maxPerRow` wraps a wide layer onto extra rows, which is what lets the same graph
    fit a sheet of paper without shrinking the type to nothing. */
function mapLayout(ids, opt) {
  opt = opt || {};
  const NW = opt.NW || 152, NH = opt.NH || 54, GAPY = opt.GAPY || 106, GAPX = opt.GAPX || 22;
  const set = {}; ids.forEach(i => set[i] = 1);
  const base = Math.min.apply(null, ids.map(depthOf));
  const byL = {};
  ids.forEach(i => { const L = depthOf(i) - base; (byL[L] = byL[L] || []).push(i); });
  const layers = Object.keys(byL).map(Number).sort((a, b) => a - b).map(L => byL[L]);
  const pos = {}; layers.forEach(row => row.forEach((u, i) => pos[u] = i));
  const mean = (u, list) => { const v = list.filter(x => set[x]).map(x => pos[x]);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : pos[u]; };
  for (let pass = 0; pass < 5; pass++) {
    for (let L = 1; L < layers.length; L++) {
      layers[L].sort((a, b) => mean(a, prereqsOf(a)) - mean(b, prereqsOf(b)));
      layers[L].forEach((u, i) => pos[u] = i);
    }
    for (let L = layers.length - 2; L >= 0; L--) {
      layers[L].sort((a, b) => mean(a, unlocks(a)) - mean(b, unlocks(b)));
      layers[L].forEach((u, i) => pos[u] = i);
    }
  }
  const cap = opt.maxPerRow || 0;
  const rows = [];
  layers.forEach(row => {
    if (!cap || row.length <= cap) { rows.push(row); return; }
    const n = Math.ceil(row.length / cap), per = Math.ceil(row.length / n);
    for (let i = 0; i < row.length; i += per) rows.push(row.slice(i, i + per));
  });
  const widest = Math.max.apply(null, rows.map(r => r.length));
  const W = opt.W || Math.max(720, widest * (NW + GAPX));
  /* A sheet of paper has a fixed height, so tighten the row pitch rather than let the
     drawing run onto a second page — but never closer than the boxes are tall. */
  let pitch = GAPY;
  if (opt.maxH && rows.length * GAPY + 28 > opt.maxH)
    pitch = Math.max(NH + 12, (opt.maxH - 28) / rows.length);
  const xy = {};
  rows.forEach((row, R) => row.forEach((u, i) => {
    xy[u] = { x: (i + 0.5) * (W / row.length), y: R * pitch + NH / 2 + 14 };
  }));
  return { xy, W, H: rows.length * pitch + 28, NW, NH, layers: rows };
}
function viewMap(selId) {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/map'));
  const own = {}; COURSE.units.forEach(i => own[i] = 1);
  /* Most of what a later course rests on lives in an earlier one. Draw those too —
     but only the ones in the way, or the map becomes a picture of the whole syllabus. */
  const need = {};
  COURSE.units.forEach(c => prereqsOf(c).forEach(p => {
    if (own[p] || !(BANK[p] || []).length) return;
    need[p] = (need[p] || 0) + 1;                       // how much of this course leans on it
  }));
  /* Anything already solid is out of the way and only clutters the picture. The rest
     gets drawn, weakest and most-depended-on first, so the gap is visible not implied. */
  const carried = Object.keys(need)
    .filter(p => unitState(p).state !== 'solid')
    .sort((a, b) => (unitState(a).state === 'weak' ? 0 : 1) - (unitState(b).state === 'weak' ? 0 : 1)
                 || need[b] - need[a])
    .slice(0, 14);
  const carriedHidden = Object.keys(need).filter(p => unitState(p).state !== 'solid').length - carried.length;
  const ids = COURSE.units.concat(carried);
  const inCourse = {}; ids.forEach(i => inCourse[i] = 1);
  const isCarried = {}; carried.forEach(i => isCarried[i] = 1);
  const L = mapLayout(ids);
  const sel = selId && inCourse[selId] ? selId : null;
  const lit = {};                                   // the selected unit's whole dependency chain
  if (sel) { lit[sel] = 'self';
    const up = upstream(sel, 9); for (const u in up) lit[u] = lit[u] || 'up';
    const down = {}; let layer = unlocks(sel), d = 1;
    while (layer.length && d < 9) { const nx = [];
      for (const u of layer) if (!(u in down)) { down[u] = d; nx.push.apply(nx, unlocks(u)); }
      layer = nx; d++; }
    for (const u in down) lit[u] = lit[u] || 'down';
  }

  const edges = [];
  ids.forEach(c => prereqsOf(c).forEach(p => {
    if (!inCourse[p]) return;
    const a = L.xy[p], b = L.xy[c];
    const on = sel && lit[p] && lit[c];
    const my = (a.y + L.NH / 2 + b.y - L.NH / 2) / 2;
    edges.push(`<path d="M${a.x.toFixed(1)} ${(a.y + L.NH / 2).toFixed(1)}
      C${a.x.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${(b.y - L.NH / 2).toFixed(1)}"
      class="mape${on ? ' lit' : sel ? ' dim' : ''}"/>`);
  }));
  const nodes = ids.map(id => {
    const u = unitById(id), m = unitState(id), p = L.xy[id];
    const lines = wrapTitle(u.title, 21, 2);
    const faded = sel && !lit[id];
    return `<g class="mapn${faded ? ' dim' : ''}${sel === id ? ' sel' : ''}${isCarried[id] ? ' carried' : ''}" data-node="${id}" tabindex="0" role="button"
        aria-label="${esc(plain(u.title))}, ${MAP_LABEL[m.state]}${isCarried[id] ? ', from an earlier course' : ''}">
      <rect x="${(p.x - L.NW / 2).toFixed(1)}" y="${(p.y - L.NH / 2).toFixed(1)}" width="${L.NW}" height="${L.NH}" rx="9"
        fill="${MAP_FILL[m.state]}" stroke="${MAP_LINE[m.state]}" stroke-width="${sel === id ? 2.8 : 1.6}"
        ${isCarried[id] ? 'stroke-dasharray="5 3"' : ''}/>
      <text x="${(p.x - L.NW / 2 + 10).toFixed(1)}" y="${(p.y - L.NH / 2 + 15).toFixed(1)}" class="mapnum">${isCarried[id] ? 'earlier' : unitNo(u)}</text>
      ${m.total ? `<text x="${(p.x + L.NW / 2 - 10).toFixed(1)}" y="${(p.y - L.NH / 2 + 15).toFixed(1)}" class="mappct">${m.tried ? m.solved + '/' + m.total : ''}</text>` : ''}
      ${lines.map((t, i) => `<text x="${p.x.toFixed(1)}" y="${(p.y + 2 + i * 13 - (lines.length - 1) * 6).toFixed(1)}" class="mapt">${esc(t)}</text>`).join('')}
    </g>`;
  }).join('');

  const ready = readyUnits(), blocked = blockedUnits();
  const weakAll = ids.map(unitState).filter(m => m.state === 'weak');

  v.innerHTML = `<div class="wrap wide">
    <p class="eyebrow">Knowledge map · ${COURSE.name}</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">What rests on what</h1>
    <p class="lead" style="max-width:62ch">Every arrow means the lower unit genuinely needs the one above it first. Colours come from your own work, so a red box upstream is usually why the one below it felt impossible.</p>
    ${mapTabs('units')}
    <div class="row" style="margin:0 0 10px">
      <button class="btn sm" id="pmap">⎙ Print this map</button></div>
    <div class="row" style="margin:0 0 4px">
      <span class="mapkey"><i style="background:var(--right-soft);border-color:var(--right)"></i>Solid</span>
      <span class="mapkey"><i style="background:var(--mark-soft);border-color:var(--mark)"></i>Nearly there</span>
      <span class="mapkey"><i style="background:var(--wrong-soft);border-color:var(--wrong)"></i>Needs work</span>
      <span class="mapkey"><i style="background:var(--accent-soft);border-color:var(--accent)"></i>Just started</span>
      <span class="mapkey"><i style="background:var(--paper);border-color:var(--rule)"></i>Not started</span>
      ${carried.length ? '<span class="mapkey"><i style="background:var(--paper);border-color:var(--ink3);border-style:dashed"></i>From an earlier course</span>' : ''}
    </div>
    ${carried.length ? `<p class="mapnote">The dashed boxes come from earlier courses. They are drawn because this course rests on them and they are not solid yet${carriedHidden > 0 ? `, and ${carriedHidden} more like them are left off to keep the picture readable` : ''}.</p>` : ''}
    ${!ids.some(i => unitState(i).tried) ? `<div class="box key" style="margin:18px 0 6px"><h4>Start at the top</h4>
      <p>Nothing here is coloured in yet. The boxes with no arrows coming into them rest on nothing else, so any of them is a fair place to begin.</p>
      <div class="row" style="margin-top:8px">${COURSE.units.filter(c => !prereqsOf(c).some(p => own[p])).slice(0, 5).map(c =>
        `<button class="btn sm" data-go="${c}">${plain(unitById(c).title)} →</button>`).join('')}</div></div>` : ''}
    ${ready.length || weakAll.length ? `<div class="grid g2" style="margin:18px 0 6px">
      ${ready.length ? `<div class="box key"><h4>Ready to leap ahead</h4>
        <p>Everything ${ready.length === 1 ? 'this unit rests on is' : 'these rest on is'} in good shape, so you can start ${ready.length === 1 ? 'it' : 'any of them'} now.</p>
        <div class="row" style="margin-top:8px">${ready.slice(0, 6).map(u =>
          `<button class="btn sm" data-go="${u.id}">${plain(u.title)} →</button>`).join('')}</div></div>` : ''}
      ${weakAll.length ? `<div class="box warn"><h4>Worth shoring up</h4>
        <p>${weakAll.length === 1 ? 'One unit is' : weakAll.length + ' units are'} going badly, and ${weakAll.length === 1 ? 'it holds' : 'they hold'} up work further down.</p>
        <div class="row" style="margin-top:8px">${weakAll.slice(0, 6).map(m =>
          `<button class="btn sm" data-go="${m.id}">${plain(unitById(m.id).title)}${isCarried[m.id] ? ' (earlier)' : ''} →</button>`).join('')}</div></div>` : ''}
    </div>` : ''}
    ${blocked.length ? `<p class="mapnote">${blocked.length} unit${blocked.length > 1 ? 's' : ''} further on ${blocked.length > 1 ? 'are' : 'is'} waiting on something that needs work — ${blocked.slice(0, 3).map(b => '<strong>' + plain(b.unit.title) + '</strong>').join(', ')}${blocked.length > 3 ? ' and others' : ''}.</p>` : ''}
    <div class="mapwrap"><svg viewBox="0 0 ${L.W} ${L.H}" class="mapsvg" style="min-width:${Math.min(L.W, 980)}px">
      ${edges.join('')}${nodes}</svg></div>
    <p class="mapdrag">The map is wider than the screen — drag it sideways to see the rest.</p>
    <div id="mapdetail"></div>
  </div>`;

  const detail = $('#mapdetail');
  function showDetail(id) {
    if (!id) { detail.innerHTML = `<p class="mapnote">Tap any box to see what it rests on and what it opens up.</p>`; return; }
    const u = unitById(id), m = unitState(id);
    const pre = prereqsOf(id), post = unlocks(id);
    const chip = s => `<span class="chip ${s === 'solid' ? 't1' : s === 'weak' ? 'amc' : 't2'}">${MAP_LABEL[s]}</span>`;
    const row = (list, empty) => list.length ? `<div class="maprow">${list.map(p => {
        const pm = unitState(p), pu = unitById(p);
        return `<button class="mapchip" data-go="${p}" data-state="${pm.state}">
          <b>${plain(pu.title)}</b><span>${MAP_LABEL[pm.state]}${pm.tried ? ' · ' + pm.solved + '/' + pm.total : ''}${COURSE.units.indexOf(p) < 0 ? ' · from another course' : ''}</span></button>`;
      }).join('')}</div>` : `<p class="mapnote">${empty}</p>`;
    detail.innerHTML = `<div class="card-note" style="margin-top:18px">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <div><p class="eyebrow">Unit ${unitNo(u)}</p>
          <h3 style="margin:2px 0 6px;font-size:1.25rem">${plain(u.title)}</h3>
          ${chip(m.state)} <span class="unitlab">${m.tried ? m.solved + ' of ' + m.total + ' solved' : 'not started yet'}</span></div>
        <div class="row"><button class="btn sm" data-nav="#/u/${id}/learn">Learn</button>
          <button class="btn sm pri" data-nav="#/u/${id}/practice">Practise</button></div>
      </div>
      <h4 style="margin:16px 0 6px;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink3)">Rests on</h4>
      ${row(pre, 'Nothing — this is a starting point.')}
      <h4 style="margin:16px 0 6px;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink3)">Opens up</h4>
      ${row(post, 'Nothing further depends on this one.')}
    </div>`;
    wire(detail);
    detail.querySelectorAll('[data-go]').forEach(b => b.onclick = () => viewMap(b.dataset.go));
  }
  wire(v);
  $('#pmap').onclick = () => doPrint([mapSheet()], 'Knowledge map · ' + COURSE.name);
  v.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { viewMap(b.dataset.go);
    const d = $('#mapdetail'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
  v.querySelectorAll('[data-node]').forEach(g => {
    const pick = () => viewMap(g.dataset.node === sel ? null : g.dataset.node);
    g.onclick = pick;
    g.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } };
  });
  showDetail(sel);
}

const mapTabs = on => `<div class="tabs" style="margin:14px 0 18px">
  <button class="tab" data-nav="#/map" aria-selected="${on === 'ideas'}">Big ideas</button>
  <button class="tab" data-nav="#/map/k" aria-selected="${on === 'concepts'}">Glossary</button>
  <button class="tab" data-nav="#/map/units" aria-selected="${on === 'units'}">Unit map</button></div>`;
/** A search box that opens the finder — one search for the whole site, wherever it is asked. */
const findBox = hint => `<button class="findbox" data-find>⌕ <span>${hint || 'Search big ideas, lessons and concepts — try “average” or “slope”'}</span><kbd>/</kbd></button>`;
/** A unit as a coloured step: green solid, amber nearly, red needs work, outlined if in this course. */
const stepDot = id => { const m = unitState(id);
  return `<i class="step${COURSE.units.indexOf(id) > -1 ? ' mine' : ''}" style="background:${MAP_FILL[m.state]};border-color:${MAP_LINE[m.state]}"
    title="${esc(gradeOf(id) + ' · ' + plain(unitById(id).title) + ' — ' + MAP_LABEL[m.state])}"></i>`; };

/** The knowledge map's front page: every big idea, by topic, each a ladder across the grades. */
function viewIdeas() {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/map'));
  const strands = Object.keys(window.STRANDS).filter(k => IDEAS.some(i => i.strand === k));
  v.innerHTML = `<div class="wrap wide">
    <p class="eyebrow">Knowledge map</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">Big ideas</h1>
    <p class="lead" style="max-width:64ch">School maths is a handful of big ideas that grow up through the grades. Each one below is a ladder: the same idea met again, a step further, each year. Every lesson is one step, and every word it teaches hangs off that step.</p>
    ${mapTabs('ideas')}
    ${findBox()}
    <div class="row" style="margin:12px 0 0">
      ${['solid', 'shaky', 'weak', 'started', 'new'].map(k => `<span class="mapkey"><i style="background:${MAP_FILL[k]};border-color:${MAP_LINE[k]}"></i>${MAP_LABEL[k]}</span>`).join('')}
      <span class="mapkey"><i class="step mine" style="width:14px;height:14px"></i>In ${COURSE.short}</span>
    </div>
    ${strands.map(k => `<h2 class="ideah">${window.STRANDS[k].name}</h2>
      <div class="grid g2">${IDEAS.filter(i => i.strand === k).map(i => {
        const g0 = gradeOf(i.units[0]), g1 = gradeOf(i.units[i.units.length - 1]);
        const n = CON.list.filter(c => i.units.indexOf(c.home) > -1).length;
        const here = i.units.filter(u => COURSE.units.indexOf(u) > -1).length;
        return `<button class="ucard ideacard" data-nav="#/map/i/${i.id}"><span class="rail-strip"></span>
          <p class="eyebrow" style="padding-left:.75rem">${g0 === g1 ? g0 : g0 + ' → ' + g1} · ${i.units.length} step${i.units.length > 1 ? 's' : ''} · ${n} concepts</p>
          <h4>${i.name}</h4><p>${i.gist}</p>
          <div class="meta"><span class="steps-strip">${i.units.map(stepDot).join('')}</span>
            ${here ? `<span class="pct">${here} in ${COURSE.short}</span>` : ''}</div></button>`; }).join('')}</div>`).join('')}
  </div>`;
  wire(v);
}
/** One big idea as a ladder: each step a unit, in the order the grades meet it, with the
    concepts first taught there hanging off it — and the ideas it builds on and leads to. */
function viewIdea(id) {
  const v = $('#view'), idea = ideaById(id);
  if (!idea) return viewIdeas();
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/map'));
  const links = ideaLinks(idea);
  const ideaChip = i => `<button class="mapchip" data-nav="#/map/i/${i.id}"><b>${i.name}</b><span>${window.STRANDS[i.strand].name}</span></button>`;
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">Big idea · ${window.STRANDS[idea.strand].name}</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">${idea.name}</h1>
    <p class="lead" style="max-width:62ch">${idea.gist}</p>
    <div class="row" style="margin:14px 0 0"><button class="btn sm" data-nav="#/map">← All big ideas</button></div>
    <ol class="ladder">${idea.units.map((uid, k) => {
      const u = unitById(uid), m = unitState(uid), st = unitStats(uid), mine = COURSE.units.indexOf(uid) > -1;
      const taught = CON.list.filter(c => c.home === uid);
      return `<li class="rung">
        <span class="rungdot" style="background:${MAP_FILL[m.state]};border-color:${MAP_LINE[m.state]}">${k + 1}</span>
        <div class="rungbody">
          <p class="eyebrow">${gradeOf(uid)}${mine ? ` · <span style="color:var(--accent)">Unit ${unitNo(u)} in ${COURSE.short}</span>` : ''} · ${MAP_LABEL[m.state]}${m.tried ? ' · ' + st.solved + '/' + st.total : ''}</p>
          <h3><button class="linkbtn big" data-nav="#/u/${uid}/learn">${u.title}</button></h3>
          <p class="rungbig">${M(u.big)}</p>
          ${taught.length ? `<p class="rungterms">${termList(taught)}</p>` : ''}
        </div></li>`; }).join('')}</ol>
    ${links.before.length ? `<h4 class="ideasub">Builds on</h4><div class="maprow">${links.before.map(ideaChip).join('')}</div>` : ''}
    ${links.after.length ? `<h4 class="ideasub">Leads to</h4><div class="maprow">${links.after.map(ideaChip).join('')}</div>` : ''}
  </div>`;
  wire(v);
}
/* Concepts are shown as words, not as boxes: a status dot and a link, in a line of text. A wall
   of chips made every term shout equally; a glossary line lets the eye run down the page. */
const sdot = c => { const m = conceptState(c);
  return `<i class="sdot${m.tried ? '' : ' none'}" style="${m.tried ? 'background:' + MAP_LINE[m.state] : ''}" title="${CON_LABEL[m.state]}"></i>`; };
const termLink = c => `<button class="tlink" data-nav="#/map/c/${c.id}">${sdot(c)}${M(c.name)}</button>`;
const termList = (cs, empty) => cs.length ? `<span class="tlist">${cs.map(termLink).join('<span class="tsep">·</span>')}</span>`
  : `<span class="unitlab">${empty}</span>`;

/** Every word the lessons define, A to Z, each with its definition and where it is first taught.
    This course's words by default; one switch shows the whole syllabus. Filtered as you type. */
function viewGlossary(all) {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/map'));
  const own = {}; COURSE.units.forEach(i => own[i] = 1);
  const mineList = CON.list.filter(c => c.units.some(u => own[u]));
  const list = (all ? CON.list : mineList).slice().sort((a, b) => plain(a.name).localeCompare(plain(b.name), 'en', { sensitivity: 'base' }));
  const weak = mineList.filter(c => conceptState(c).state === 'weak');
  const letter = c => { const ch = plain(c.name).charAt(0).toUpperCase(); return /[A-Z]/.test(ch) ? ch : '#'; };
  const letters = [...new Set(list.map(letter))];
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">Knowledge map</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">Glossary</h1>
    <p class="lead" style="max-width:60ch">Every word the lessons define, A to Z. Each one opens to show where it is first taught, what it is built from and where it leads.</p>
    ${mapTabs('concepts')}
    <div class="glossbar">
      <input type="text" id="gfind" placeholder="Filter — median, slope, angle…" autocomplete="off" spellcheck="false">
      <div class="seg" role="group" aria-label="Which words">
        <button data-nav="#/map/k" aria-pressed="${!all}">${COURSE.short} <span>${mineList.length}</span></button>
        <button data-nav="#/map/k/all" aria-pressed="${!!all}">All courses <span>${CON.list.length}</span></button></div>
    </div>
    ${weak.length ? `<p class="glossnote"><b>Needs work:</b> ${termList(weak.slice(0, 8))}</p>` : ''}
    <nav class="azbar">${letters.map(l => `<a href="#" data-az="${l}">${l}</a>`).join('')}</nav>
    <div class="gloss">${letters.map(l => `<section class="gl" data-letter="${l}"><h2 id="az-${l}">${l}</h2>
      <dl>${list.filter(c => letter(c) === l).map(c => `<div class="ge" data-find="${esc((plain(c.name) + ' ' + plain(c.def)).toLowerCase())}">
        <dt>${termLink(c)}</dt><dd>${M(c.def)}<span class="gwhere">${gradeOf(c.home)} · ${plain(unitById(c.home).title)}</span></dd></div>`).join('')}</dl>
    </section>`).join('')}</div>
    <p class="mapnote" id="gnone" hidden>No word matches that. The search in the top bar also looks through lessons and drills.</p>
  </div>`;
  wire(v);
  v.querySelectorAll('[data-az]').forEach(a => a.onclick = e => { e.preventDefault();
    const h = document.getElementById('az-' + a.dataset.az); if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  const f = $('#gfind');
  f.oninput = () => { const q = f.value.trim().toLowerCase(); let shown = 0;
    v.querySelectorAll('.gl').forEach(sec => { let n = 0;
      sec.querySelectorAll('.ge').forEach(e => { const ok = !q || e.dataset.find.indexOf(q) > -1; e.hidden = !ok; n += ok; });
      sec.hidden = !n; shown += n; });
    $('#gnone').hidden = !!shown; v.querySelector('.azbar').hidden = !!q; };
}

/** One concept, set out like a dictionary entry: where it lives, what it means, how you are
    doing with it, then a line each for what it is built from, what it leads to, and its ladder. */
function viewConcept(id) {
  const v = $('#view'), c = CON.byId[id];
  if (!c) return viewGlossary();
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/map'));
  const m = conceptState(c), o = IDEA_OF[c.home], set = conceptSet(c, 8);
  const from = c.rests.map(x => CON.byId[x]), to = c.usedBy.map(x => CON.byId[x]);
  const back = from.length ? CON.chain(c.id, 5).filter(x => x.dist > 1).map(x => CON.byId[x.id]) : [];
  const again = c.units.filter(u => u !== c.home);
  v.innerHTML = `<div class="wrap">
    ${crumbs(c.home)}
    <h1 class="cterm">${M(c.name)}</h1>
    <p class="cdef">${M(c.def)}</p>
    <p class="cstatus">${m.tried ? `<span class="chip ${CON_CHIP[m.state]}">${CON_LABEL[m.state]}</span>` : ''}
      You have ${conceptRecord(m)}.</p>
    <div class="row" style="margin:16px 0 4px">
      <button class="btn" data-nav="#/u/${c.home}/learn/${c.id}">Review it in the lesson</button>
      ${set.length ? `<button class="btn pri" id="cprac">Practise it — ${set.length} problem${set.length > 1 ? 's' : ''}</button>` : ''}</div>
    <dl class="cfacts">
      <dt>Built from</dt><dd>${termList(from, 'Nothing earlier — a starting idea.')}
        ${back.length ? `<span class="cdeep">and before that ${termList(back)}</span>` : ''}</dd>
      <dt>Leads to</dt><dd>${termList(to, 'No later word is defined from this one.')}</dd>
      ${again.length ? `<dt>Comes back in</dt><dd>${again.map(u => `<button class="tlink" data-nav="#/u/${u}/learn">${gradeOf(u)} · ${plain(unitById(u).title)}</button>`).join('<span class="tsep">·</span>')}</dd>` : ''}
      ${o ? `<dt>Its big idea</dt><dd><button class="tlink" data-nav="#/map/i/${o.idea.id}"><b>${o.idea.name}</b></button>
        <ol class="miniladder">${o.idea.units.map((u, k) => `<li${u === c.home ? ' class="here"' : ''}>
          <button class="tlink" data-nav="#/u/${u}/learn"><span>${gradeOf(u)}</span>${plain(unitById(u).title)}</button></li>`).join('')}</ol></dd>` : ''}
    </dl>
    <div id="cpractice" style="margin-top:20px"></div>
  </div>`;
  wire(v);
  if ($('#cprac')) $('#cprac').onclick = () => {
    $('#cprac').disabled = true;
    runSession($('#cpractice'), unitById(c.home), conceptSet(c, 8), 'concept');
    $('#cpractice').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}

/** The map as a sheet of paper. Colour cannot be relied on in print — browsers drop
    backgrounds by default — so each box carries a glyph and a word instead, and a tick
    box so progress can be marked by hand. */
const MAP_GLYPH = { solid: '✓', shaky: '~', weak: '!', started: '·', new: '' };
function mapSheet() {
  const ids = COURSE.units.slice();
  const L = mapLayout(ids, { maxPerRow: 4, NW: 150, NH: 46, GAPY: 84, GAPX: 18, W: 676, maxH: 585 });
  const own = {}; ids.forEach(i => own[i] = 1);

  const edges = [];
  ids.forEach(c => prereqsOf(c).forEach(p => {
    if (!own[p]) return;
    const a = L.xy[p], b = L.xy[c], my = (a.y + L.NH / 2 + b.y - L.NH / 2) / 2;
    edges.push(`<path d="M${a.x.toFixed(1)} ${(a.y + L.NH / 2).toFixed(1)}
      C${a.x.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${(b.y - L.NH / 2).toFixed(1)}"
      fill="none" stroke="#888" stroke-width="1.3"/>`);
  }));
  const nodes = ids.map(id => {
    const u = unitById(id), m = unitState(id), p = L.xy[id];
    const lines = wrapTitle(u.title, 22, 2);
    const left = p.x - L.NW / 2, top = p.y - L.NH / 2;
    return `<g>
      <rect x="${left.toFixed(1)}" y="${top.toFixed(1)}" width="${L.NW}" height="${L.NH}" rx="5"
        fill="#fff" stroke="#111" stroke-width="${m.state === 'weak' ? 2.4 : 1}"/>
      <rect x="${(left + 6).toFixed(1)}" y="${(top + 5).toFixed(1)}" width="9" height="9" rx="1.5" fill="none" stroke="#555" stroke-width="1"/>
      ${m.state === 'solid' ? `<text x="${(left + 10.5).toFixed(1)}" y="${(top + 12.6).toFixed(1)}" style="font:700 8px sans-serif;fill:#111" text-anchor="middle">✓</text>` : ''}
      <text x="${(left + 20).toFixed(1)}" y="${(top + 13).toFixed(1)}" style="font:700 7.5px sans-serif;fill:#555">${unitNo(u)}</text>
      <text x="${(p.x + L.NW / 2 - 6).toFixed(1)}" y="${(top + 13).toFixed(1)}" style="font:700 7.5px sans-serif;fill:#555" text-anchor="end">${m.tried ? m.solved + '/' + m.total : MAP_LABEL[m.state].toLowerCase()}</text>
      ${lines.map((t, i) => `<text x="${p.x.toFixed(1)}" y="${(p.y + 6 + i * 11 - (lines.length - 1) * 5.5).toFixed(1)}" style="font:600 9.5px sans-serif;fill:#111" text-anchor="middle">${esc(t)}</text>`).join('')}
    </g>`;
  }).join('');

  const carried = [];
  ids.forEach(c => prereqsOf(c).forEach(p => {
    if (own[p] || carried.indexOf(p) > -1 || !(BANK[p] || []).length) return;
    if (unitState(p).state !== 'solid') carried.push(p);
  }));
  const weak = ids.concat(carried).map(unitState).filter(m => m.state === 'weak');
  const ready = readyUnits();
  const line = (list, fn) => list.map(fn).join(', ');

  return `<div class="psheet">${PHEAD('Knowledge map · ' + COURSE.name,
      'What rests on what. An arrow means the lower unit needs the one above it first.', COURSE.name)}
    <div class="psec"><svg viewBox="0 0 ${L.W} ${L.H}" style="width:100%;height:auto;display:block">
      ${edges.join('')}${nodes}</svg></div>
    <div class="psec"><h3>How to read it</h3>
      <p>Each box shows its unit number, how many problems you have solved out of that unit's total, and a box to tick when it is finished. A <strong>heavy border</strong> marks a unit going badly — everything below it on the map is resting on that one.</p></div>
    ${weak.length ? `<div class="psec"><h3>Shore these up first</h3>
      <p>${line(weak, m => '<strong>' + plain(unitById(m.id).title) + '</strong>' + (own[m.id] ? '' : ' (from an earlier course)') + ' — ' + m.solved + ' of ' + m.tried + ' tried')}.</p></div>` : ''}
    ${ready.length ? `<div class="psec"><h3>Ready to start</h3>
      <p>Everything these rest on is in good shape: ${line(ready, u => '<strong>' + plain(u.title) + '</strong>')}.</p></div>` : ''}
    ${carried.length ? `<div class="psec"><h3>Brought forward from earlier courses</h3>
      <p>This course also rests on ${line(carried, id => plain(unitById(id).title))}. Those are not drawn above, but a gap in any of them will show up here.</p></div>` : ''}
    <div class="pfoot">Knowledge map · ${COURSE.name} · ${ids.length} units</div></div>`;
}

/* ---------- course and pace: the sign-in choices, reachable from anywhere ---------- */
function viewSettings() {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/settings'));
  v.innerHTML = `<div class="wrap">
    <p class="eyebrow">Settings</p>
    <h1 style="font-size:2rem;margin:6px 0 8px;letter-spacing:-.02em">Course and pace</h1>
    <p class="lead" style="max-width:60ch">Change either of these whenever you like — nothing is lost. Solved problems, mistakes and saved problems all stay where they are, so you can look into another course and come back to find everything as you left it.</p>
    <h2 style="font-size:1.1rem;margin:30px 0 0">Which course?</h2>
    <div class="paceopts">${Object.values(COURSES).map(c =>
      `<button class="paceopt" data-c="${c.id}" aria-pressed="${c.id === COURSE.id}">
        <span class="rd"></span><span><b>${c.name}</b><span>${c.units.length} units · ${c.blurb}</span></span></button>`).join('')}</div>
    <h2 style="font-size:1.1rem;margin:30px 0 0">How hard should the sets be?</h2>
    <div class="paceopts">${Object.entries(PACE).map(([k, p]) =>
      `<button class="paceopt" data-p="${k}" aria-pressed="${k === S.pace}">
        <span class="rd"></span><span><b>${p.label}</b><span>${p.note}</span></span></button>`).join('')}</div>
    <h2 style="font-size:1.1rem;margin:30px 0 10px">Who is practising?</h2>
    <div class="row">
      <button class="btn" id="whoOut">Switch to another name →</button>
      <span class="unitlab">Signed in as <strong>${S.name}</strong> — every name keeps its own progress on this browser</span>
    </div>
  </div>`;
  v.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
    if (b.dataset.c === S.course) return;
    S.course = b.dataset.c; setCourse(S.course); persist(); buildRail(); buildWho(); render(); });
  v.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
    S.pace = b.dataset.p; persist(); buildWho(); render(); });
  $('#whoOut').onclick = signOut;
}

function viewPrintCentre() {
  const v = $('#view');
  $('#rail').querySelectorAll('[data-u]').forEach(b => b.setAttribute('aria-current', 'false'));
  $('#rail').querySelectorAll('[data-nav]').forEach(b => b.setAttribute('aria-current', b.dataset.nav === '#/print'));
  v.innerHTML = `<div class="wrap wide">
    <h1 style="font-size:2rem;margin-bottom:8px">Print centre</h1>
    <p class="lead" style="max-width:60ch;margin-bottom:24px">Class material, problem sets, drills and solutions, ready for paper. Solutions always print as their own document so a set can be worked without the answers in sight. Drill packs and review sheets are generated fresh, and the print view has a <strong>New problems</strong> button so you can re-roll the numbers without leaving the page.</p>
    <div class="box key" style="margin:0 0 22px"><h4>The whole of ${COURSE.name}</h4>
      <p>Every unit in order — lesson, problem set with AMC, drill sets — then all the answers at the back. Switch the course in the top bar to print a different grade.</p>
      <div class="row" style="margin-top:10px"><button class="btn pri" id="allEverything">⎙ Everything for ${COURSE.short}</button>
        <span class="unitlab" id="everyn"></span></div></div>
    <div class="row" style="margin-bottom:26px">
      <button class="btn" id="allLessons">⎙ All ${U.length} lesson sheets</button>
      <button class="btn" id="allSets">⎙ All ${U.length} problem sets + AMC</button>
      <button class="btn" id="allSols">⎙ Complete solution manual + AMC</button>
      <button class="btn" id="allDrills">⎙ All drill packs</button>
      <button class="btn" id="pmap2">⎙ Knowledge map</button>
      ${studiedUnits().length >= 2 ? '<button class="btn" id="prev2">⎙ Mixed review sheet</button>' : ''}
      ${S.mistakes.length ? '<button class="btn" id="pm2">⎙ My review sheet</button>' : ''}
      ${S.favs.length ? '<button class="btn" id="pf2">⎙ My saved problems</button>' : ''}
    </div>
    <div id="dopts" style="margin:-10px 0 26px"></div>
    <h2 style="font-size:1.15rem;margin:0 0 12px">Chapter reviews and exams</h2>
    <p style="font-size:.85rem;color:var(--ink3);margin:0 0 14px;max-width:64ch">A practice test is new problems every time, with the answers on their own pages at the back. A study guide is the concept review on paper: key ideas, words to know and mistakes to watch for.</p>
    <div class="grid g2" style="margin-bottom:28px">${chaptersOf().map(c => ({ key: c.key, t: 'Chapter ' + c.n + ' · ' + c.name, sub: unitSpan(c.ids) }))
      .concat([{ key: 'mid', t: 'Midterm', sub: testScope('mid').sub }, { key: 'final', t: 'Final exam', sub: testScope('final').sub }]).map(x =>
      `<div class="item"><div class="tagrow"><span>${x.sub}</span></div>
        <div style="font-family:var(--disp);font-size:1.02rem;font-weight:600">${x.t}</div>
        <div class="row"><button class="btn sm" data-pt="${x.key}">Practice test</button>
          <button class="btn sm" data-sg="${x.key}">Study guide</button></div></div>`).join('')}</div>
    <h2 style="font-size:1.15rem;margin:0 0 12px">By unit</h2>
    <div class="grid g2">${U.map(u => `<div class="item"><div class="tagrow"><span>Unit ${unitNo(u)}</span><span>·</span><span>${window.STRANDS[u.strand].name}</span></div>
      <div style="font-family:var(--disp);font-size:1.02rem;font-weight:600">${u.title}</div>
      <div class="row"><button class="btn sm" data-l="${u.id}">Lesson</button>
        <button class="btn sm" data-s="${u.id}">Problems + AMC</button>
        <button class="btn sm" data-k="${u.id}">Solutions + AMC</button>
        <button class="btn sm" data-dp="${u.id}">Drill packs</button></div></div>`).join('')}</div></div>`;
  const say = () => { const c = courseCount();
    $('#everyn').textContent = `${U.length} lessons and up to ${c.total.toLocaleString('en-US')} problems (${c.drill.toLocaleString('en-US')} of them drill) — a long print`; };
  $('#dopts').appendChild(drillOptsBar(say)); say();
  $('#allEverything').onclick = () => doPrint(courseEverything(), 'Everything · ' + COURSE.name, () => courseEverything());
  /* unitNo(), not a stored .n — only the 17 original units ever carried that field */
  v.querySelectorAll('[data-l]').forEach(b => b.onclick = () => doPrint([lessonSheet(unitById(b.dataset.l))], 'Unit ' + unitNo(unitById(b.dataset.l)) + ' lesson sheet'));
  v.querySelectorAll('[data-s]').forEach(b => b.onclick = () => doPrint([problemSet(unitById(b.dataset.s), { withAmc: true })], 'Unit ' + unitNo(unitById(b.dataset.s)) + ' problem set + AMC'));
  v.querySelectorAll('[data-k]').forEach(b => b.onclick = () => doPrint([solutionManual(unitById(b.dataset.k), { withAmc: true })], 'Unit ' + unitNo(unitById(b.dataset.k)) + ' solutions + AMC'));
  v.querySelectorAll('[data-pt]').forEach(b => b.onclick = () => { const sc = testScope(b.dataset.pt);
    doPrint(practiceTestDoc(sc, testSet(sc)), COURSE.short + ' · ' + sc.title + ' — practice test', () => practiceTestDoc(sc, testSet(sc))); });
  v.querySelectorAll('[data-sg]').forEach(b => b.onclick = () => { const sc = testScope(b.dataset.sg);
    doPrint([studyGuide(sc)], COURSE.short + ' · ' + sc.title + ' — study guide'); });
  v.querySelectorAll('[data-dp]').forEach(b => b.onclick = () => {
    const u = unitById(b.dataset.dp);
    doPrint(drillSheets([u]), 'Unit ' + unitNo(u) + ' drill packs', () => drillSheets([u])); });
  if ($('#prev2')) $('#prev2').onclick = () => {
    const list = reviewSet(12); if (!list.length) return;
    doPrint(reviewDoc(list), 'Mixed review sheet', () => { const nl = reviewSet(12); markReviewed(nl); return reviewDoc(nl); });
    markReviewed(list); };
  $('#pmap2').onclick = () => doPrint([mapSheet()], 'Knowledge map · ' + COURSE.name);
  $('#allLessons').onclick = () => doPrint(U.map(lessonSheet), 'All ' + U.length + ' lesson sheets');
  $('#allSets').onclick = () => doPrint(U.map(u => problemSet(u, { withAmc: true })), 'All ' + U.length + ' problem sets + AMC');
  $('#allDrills').onclick = () => doPrint(drillSheets(U), 'All drill packs · ' + COURSE.name, () => drillSheets(U));
  $('#allSols').onclick = () => doPrint(U.map(u => solutionManual(u, { withAmc: true })), 'Complete solution manual + AMC');
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
$('#homebtn').onclick = () => { go('#/'); closeNav(); };
$('#scrim').onclick = closeNav;
$('#findbtn').onclick = openFinder;
$('#findx').onclick = closeFinder;
$('#finder').onclick = e => { if (e.target.id === 'finder') closeFinder(); };
$('#findq').oninput = e => findRender(e.target.value);
$('#findq').onkeydown = e => {
  const hits = [...$('#findres').querySelectorAll('.findhit')], i = hits.findIndex(h => h.classList.contains('on'));
  if (e.key === 'Enter' && hits[i]) { e.preventDefault(); hits[i].click(); }
  else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault();
    const j = Math.max(0, Math.min(hits.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)));
    hits.forEach(h => h.classList.remove('on')); if (hits[j]) { hits[j].classList.add('on'); hits[j].scrollIntoView({ block: 'nearest' }); } }
};
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('#finder').hidden) return closeFinder();
  if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  if (S && $('#finder').hidden && $('#printview').hidden) { e.preventDefault(); openFinder(); }
});
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-find]'); if (b) openFinder(); });
window.addEventListener('hashchange', () => { closeOverlays(); if (S) render(); });
const last = LS.get('m3z:last', null);
/* On a shared computer, skipping the picker would silently drop the next person
   into whoever used it last. Only auto-resume when this browser has one profile. */
if (last && LS.get(UKEY(last), null) && users().length <= 1) signIn(last);
else renderLogin();
})();
