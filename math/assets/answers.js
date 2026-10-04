/* Limited arithmetic and single-variable rational-expression equivalence.
   Parse data, never execute learner input. Unsupported notation keeps the
   application's existing exact-string/alternative-answer behaviour. */
(function () {
  const trim = a => { while (a.length > 1 && Math.abs(a[a.length - 1]) < 1e-12) a.pop(); return a; };
  const zero = a => a.every(x => Math.abs(x) < 1e-12);
  const add = (a, b, sign) => trim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] || 0) + sign * (b[i] || 0)));
  function mul(a, b) {
    if (a.length + b.length > 32) throw Error('degree');
    const out = Array(a.length + b.length - 1).fill(0);
    a.forEach((x, i) => b.forEach((y, j) => { out[i + j] += x * y; }));
    return trim(out);
  }
  const constant = x => ({ n: [x], d: [1] });
  function combine(a, b, op) {
    if (op === '+') return { n: add(mul(a.n, b.d), mul(b.n, a.d), 1), d: mul(a.d, b.d) };
    if (op === '-') return { n: add(mul(a.n, b.d), mul(b.n, a.d), -1), d: mul(a.d, b.d) };
    if (op === '*') return { n: mul(a.n, b.n), d: mul(a.d, b.d) };
    if (zero(b.n)) throw Error('division by zero');
    return { n: mul(a.n, b.d), d: mul(a.d, b.n) };
  }
  function parse(raw) {
    let s = String(raw).toLowerCase().trim();
    if (s.length > 180) return null;
    s = s.replace(/\$/g, '').replace(/−/g, '-').replace(/×|·/g, '*').replace(/÷/g, '/')
      .replace(/\\(?:times|cdot)/g, '*').replace(/\\div/g, '/')
      .replace(/\\pi|π/g, 'pi').replace(/√/g, 'sqrt')
      .replace(/\{/g, '(').replace(/\}/g, ')');
    // A mixed number is addition, rather than implicit multiplication.
    s = s.replace(/(^|[^\w.])(-?)(\d+)\s+(\d+)\/(\d+)/g,
      (_, pre, neg, whole, n, d) => pre + neg + '(' + whole + '+' + n + '/' + d + ')');
    s = s.replace(/\s+/g, '');
    const tokens = s.match(/sqrt|pi|\d+(?:\.\d*)?|\.\d+|[a-z]|[()+*/^%-]/g);
    if (!tokens || tokens.join('') !== s || tokens.length > 100) return null;
    let at = 0, variable = null;
    const peek = () => tokens[at];
    const scalar = a => {
      if (a.n.length !== 1 || a.d.length !== 1 || zero(a.d)) throw Error('constant required');
      return a.n[0] / a.d[0];
    };
    function atom() {
      const t = tokens[at++]; let a;
      if (t === '(') { a = sum(); if (tokens[at++] !== ')') throw Error('parenthesis'); }
      else if (t === 'sqrt') {
        // Only numeric roots are supported, never symbolic sqrt(x).
        a = constant(Math.sqrt(scalar(atom())));
      } else if (t === 'pi') a = constant(Math.PI);
      else if (/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(t || '')) a = constant(+t);
      else if (/^[a-z]$/.test(t || '')) {
        if (variable && variable !== t) throw Error('multiple variables');
        variable = t; a = { n: [0, 1], d: [1] };
      } else throw Error('atom');
      if (peek() === '%') { at++; a = combine(a, constant(100), '/'); }
      if (peek() === '^') {
        at++; const exponent = scalar(unary());
        if (!Number.isInteger(exponent) || Math.abs(exponent) > 10) throw Error('power');
        let out = constant(1);
        for (let i = 0; i < Math.abs(exponent); i++) out = combine(out, a, '*');
        a = exponent < 0 ? combine(constant(1), out, '/') : out;
      }
      return a;
    }
    function unary() {
      if (peek() === '+') { at++; return unary(); }
      if (peek() === '-') { at++; const a = unary(); return { n: a.n.map(x => -x), d: a.d }; }
      return atom();
    }
    function product() {
      let a = unary();
      while (at < tokens.length) {
        const t = peek();
        if (t === '*' || t === '/') { at++; a = combine(a, unary(), t); }
        else if (t === '(' || t === 'sqrt' || t === 'pi' || /^[a-z]$/.test(t || '')) a = combine(a, unary(), '*');
        else break;
      }
      return a;
    }
    function sum() {
      let a = product();
      while (peek() === '+' || peek() === '-') { const op = tokens[at++]; a = combine(a, product(), op); }
      return a;
    }
    try {
      const a = sum();
      if (at !== tokens.length || zero(a.d) || !a.n.concat(a.d).every(Number.isFinite)) return null;
      return { ...a, variable };
    } catch (_) { return null; }
  }
  window.equivalentAnswer = function (given, expected) {
    const a = parse(given), b = parse(expected);
    if (!a || !b || (a.variable && b.variable && a.variable !== b.variable)) return false;
    try {
      const left = mul(a.n, b.d), right = mul(b.n, a.d);
      return Array.from({ length: Math.max(left.length, right.length) }, (_, i) =>
        Math.abs((left[i] || 0) - (right[i] || 0)) <= 1e-10 * Math.max(1, Math.abs(left[i] || 0), Math.abs(right[i] || 0))).every(Boolean);
    } catch (_) { return false; }
  };
})();
