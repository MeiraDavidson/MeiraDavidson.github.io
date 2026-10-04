/* Concept map. A unit is too coarse to point at: "this rests on Statistics" sends a
   learner back to a whole chapter when what they are missing is the median. So every
   term the lessons define ("Words to know") becomes a concept, and every problem is
   traced to the concepts it actually uses.

   Nothing here is hand-listed. It is all derived, at load, from data that already exists:
     concepts      each vocab entry; the same term met again further down a prerequisite
                   chain is the same concept revisited, so it keeps its first home
     rests on      other concepts named in its definition, taught before it
     problem tags  concept terms found in the problem's question, choices and steps,
                   resolved to the sense taught in this unit or one upstream of it
   Load after curriculum, bank, challenge and map; app.js reads window.CONCEPTS. */
(function () {
  const UNITS = window.UNITS || [], PRE = window.PREREQ || {};
  const BANK = window.BANK || {}, CH = window.CHALLENGE || {};
  const unitIdx = {}; UNITS.forEach((u, i) => unitIdx[u.id] = i);

  /* ---------- the unit graph, seen from one unit ---------- */
  const _up = {};
  /** Every unit upstream of this one (itself at 0), with how many steps back. */
  function upstream(id) {
    if (_up[id]) return _up[id];
    const dist = { [id]: 0 }; let layer = [id], d = 1;
    while (layer.length) {
      const next = [];
      for (const u of layer) for (const p of PRE[u] || []) if (!(p in dist)) { dist[p] = d; next.push(p); }
      layer = next; d++;
    }
    return _up[id] = dist;
  }
  const _depth = {};
  function depth(id) {
    if (id in _depth) return _depth[id]; _depth[id] = 0;
    let m = 0; for (const p of PRE[id] || []) m = Math.max(m, depth(p) + 1);
    return _depth[id] = m;
  }

  /* ---------- text ---------- */
  /* Lesson and problem text is markdown-ish with $…$ maths. Matching wants plain words:
     the maths delimiters go, \pi reads as "pi", tags and emphasis marks are dropped. */
  function flat(s) {
    return String(s || '').replace(/<[^>]+>/g, ' ').replace(/\\pi\b/g, ' pi ').replace(/π/g, ' pi ')
      .replace(/\\[a-zA-Z]+/g, ' ').replace(/\$/g, '').replace(/[*_{}]/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  }
  /* "Face, edge, vertex" and "Mean / median" define several words at once; each is its own
     concept, sharing the entry's definition. */
  function aliasesOf(term) {
    return flat(term).split(/\s*(?:\/|,)\s*/).map(s => s.trim()).filter(Boolean);
  }
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const _rx = {};
  /** Whole words, any spacing or hyphen between them, a plural ending allowed. */
  function rxFor(alias) {
    if (_rx[alias]) return _rx[alias];
    const body = alias.split(/[\s-]+/).map(reEsc).join('[\\s-]+');
    return _rx[alias] = new RegExp('(^|[^a-z])(' + body + (NO_PLURAL.has(alias) ? '' : '(?:s|es)?') + ')(?![a-z])', 'g');
  }
  const slug = s => s.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  /* Words that are defined in a lesson but are also ordinary words of every problem.
     They stay on the map; they are just never taken as evidence of what a problem uses. */
  const NOT_EVIDENCE = new Set(['check', 'given', 'evaluate', 'solution', 'equation', 'statement',
    'expression', 'variable', 'term', 'estimate', 'theorem', 'at least', 'at most', 'input', 'output',
    'guess', 'revise', 'event', 'outcome', 'conclusion', 'reason', 'data', 'value',
    // two everyday meanings the lessons do not intend: "opposite sides", "90 degrees"
    'opposite', 'degree']);
  /* Words with an everyday meaning too: a town's population, a period of time, the power
     of a machine. These count only inside the concept's own chain of units, where the
     lesson's meaning is the likely one. */
  const IN_CHAIN_ONLY = new Set(['population', 'period', 'sample', 'power', 'multiple', 'similar', 'face',
    'edge', 'leg', 'origin', 'rise', 'run', 'image', 'plane', 'frequency', 'interval', 'model', 'table',
    'distribution', 'identity', 'translation', 'reflection', 'rotation', 'product', 'sum']);
  /* "Means" is nearly always the verb ("which means x = 3"), never the plural of a mean. */
  const NO_PLURAL = new Set(['mean']);

  /* ---------- 1. senses: one per word per vocab entry ---------- */
  const senses = [];
  UNITS.forEach(u => (u.vocab || []).forEach(([term, def], vi) => {
    const as = aliasesOf(term);
    as.forEach(a => senses.push({ alias: a, unit: u.id, def, vi, term: as.length > 1 ? cap(a) : term }));
  }));

  /* ---------- 2. concepts: every sense of a word is one concept, bar true homonyms ---------- */
  /* A word taught twice is nearly always the same idea revisited (parallelogram in Grade 6
     and again in Geometry). These are the exceptions, whose senses only join along a
     prerequisite chain: the base of a triangle is not the base of a power. */
  const HOMONYMS = new Set(['base', 'range', 'standard form', 'vertex', 'tangent', 'orientation', 'check',
    'opposite', 'degree']);
  const CONCEPTS = [], byId = {}, byAlias = {};
  const byWord = {};
  senses.forEach(s => (byWord[s.alias] = byWord[s.alias] || []).push(s));
  for (const alias in byWord) {
    // Earliest first, so the first sense met is the home every later revisit joins.
    const list = byWord[alias].slice().sort((a, b) => depth(a.unit) - depth(b.unit) || unitIdx[a.unit] - unitIdx[b.unit]);
    const groups = [];
    for (const s of list) {
      const g = !HOMONYMS.has(alias) ? groups[0]
        : groups.find(g => g.some(t => s.unit in upstream(t.unit) || t.unit in upstream(s.unit)));
      if (g) g.push(s); else groups.push([s]);
    }
    groups.forEach(g => {
      const home = g[0];
      const id = home.unit + '.' + slug(alias);
      const c = { id, alias, name: home.term, def: home.def, home: home.unit, vi: home.vi,
        units: g.map(s => s.unit), rests: [], usedBy: [], probs: [], evidence: !NOT_EVIDENCE.has(alias) };
      CONCEPTS.push(c); byId[id] = c; (byAlias[alias] = byAlias[alias] || []).push(c);
    });
  }
  // Teaching order: by where the concept is first taught, then its place in that unit's list.
  const order = c => depth(c.home) * 1e6 + unitIdx[c.home] * 100 + c.vi;
  CONCEPTS.sort((a, b) => order(a) - order(b));
  CONCEPTS.forEach((c, i) => c.ord = i);

  /** The concept a word means when it is met in this unit: a sense taught here or upstream,
      the nearest one if several are. Competition problems reach well outside their unit's
      own chain, so failing that, a word with only one meaning still counts, and a word
      with several takes the one taught first — unless it is also an everyday word. */
  function resolve(alias, unitId) {
    const cs = byAlias[alias] || [];
    if (!cs.length) return null;
    const up = upstream(unitId);
    let best = null, bd = Infinity;
    for (const c of cs) for (const u of c.units)
      if (u in up && up[u] < bd) { bd = up[u]; best = c; }
    return best || (IN_CHAIN_ONLY.has(alias) ? null : cs[0]);
  }
  /* Longest words first, and a matched span is blanked out, so "surface area" is not also
     "area" and "mean absolute deviation" is not also "mean". */
  const ALIASES = Object.keys(byAlias).sort((a, b) => b.length - a.length);
  function scan(text, unitId, onlyEvidence) {
    let t = ' ' + flat(text) + ' ';
    const found = [];
    for (const a of ALIASES) {
      if (t.indexOf(a.split(/[\s-]/)[0]) < 0) continue;            // cheap reject
      const rx = rxFor(a); rx.lastIndex = 0;
      if (!rx.test(t)) continue;
      const c = resolve(a, unitId);
      if (c && (!onlyEvidence || c.evidence) && found.indexOf(c) < 0) found.push(c);
      t = t.replace(rxFor(a), (m, pre, w) => pre + ' '.repeat(w.length));
    }
    return found;
  }

  /* ---------- 3. what each concept rests on ---------- */
  CONCEPTS.forEach(c => {
    // Only ideas taught earlier, which also keeps the graph free of cycles.
    const add = d => { if (d !== c && d.ord < c.ord && c.rests.indexOf(d.id) < 0) c.rests.push(d.id); };
    /* Named in its own definition: "the average distance of the values from the mean".
       Only that. Words that merely share a lesson section with it were tried as links too,
       and too many were passing mentions ("median rests on outliers") to show a learner. */
    scan(c.def, c.home, true).forEach(add);
  });
  CONCEPTS.forEach(c => c.rests.forEach(r => byId[r].usedBy.push(c.id)));

  /* ---------- 4. problems ---------- */
  function problemText(p) {
    return [p.q].concat(p.c || p.choices || [], p.s || p.steps || [], p.hint ? [p.hint] : []).join(' \n ');
  }
  /** Every concept a problem uses, plus the ones named in the question itself. */
  function tag(p) {
    return { inQ: scan([p.q].concat(p.c || p.choices || []).join(' '), p.unitId, true),
             all: scan(problemText(p), p.unitId, true) };
  }
  /* Tagging every stored problem takes a moment, so it waits until something asks: the
     first hint, wrong answer or map that needs to know which problems use a concept. */
  let indexed = false;
  function index() {
    if (indexed) return; indexed = true;
    const each = (set, fix) => { for (const u in set) for (const p of set[u])
      tag(fix(Object.assign({ unitId: u }, p))).all.forEach(c => c.probs.push(p.id)); };
    each(BANK, p => p);
    each(CH, p => Object.assign(p, { c: p.choices }));
  }
  const _tags = new WeakMap();
  /** The concepts a problem uses, most telling first: named in the question itself before
      only in the working, and rarer ideas before everyday ones like area. */
  function forProblem(p) {
    if (!p || !p.unitId) return [];
    if (_tags.has(p)) return _tags.get(p);
    index();
    const t = tag(p);
    const out = t.all.sort((a, b) => (t.inQ.includes(a) ? 0 : 1) - (t.inQ.includes(b) ? 0 : 1)
      || a.probs.length - b.probs.length);
    _tags.set(p, out);
    return out;
  }
  /** Ids of the stored problems that use a concept. */
  const problemsOf = c => { index(); return c.probs; };

  /** Walk back from a concept through what it rests on, nearest first, without repeats. */
  function chain(id, maxDepth) {
    const out = [], seen = { [id]: 1 };
    let layer = [id], d = 1;
    while (layer.length && d <= (maxDepth || 4)) {
      const next = [];
      for (const x of layer) for (const r of byId[x].rests) if (!seen[r]) {
        seen[r] = 1; out.push({ id: r, from: x, dist: d }); next.push(r);
      }
      layer = next; d++;
    }
    return out;
  }

  /** The concept a lesson's Words-to-know entry names, as taught in that unit. */
  function forTerm(term, unitId) {
    const a = aliasesOf(term)[0];
    return (byAlias[a] || []).find(c => c.units.indexOf(unitId) > -1) || resolve(a, unitId);
  }

  window.CONCEPTS = { list: CONCEPTS, byId, forProblem, problemsOf, chain, index, forTerm };
})();
