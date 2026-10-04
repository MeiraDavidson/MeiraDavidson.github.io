/* Coordinate-geometry figures for the lesson sections — the moves and measurements that live
   on a grid: slides, flips and turns with every corner labelled, sequences of moves, scale
   factors, similar triangles, quadrants, midpoints, coordinate proofs and circle equations.
   Same rules as figures.js: legible at rest, colours from the theme, numbers taken from the
   lesson text so the picture and the paragraph agree. Built on the helpers in window.GEO. */
(function () {
  const G = window.GEO;
  const { S, GRID, f1, poly, seg, dot, unit, along, mid, ang, angAt, wedge, right, ticks, lineThru, par } = G;

  /* ---- local helpers ---- */
  const n = v => (v < 0 ? '−' + (-v) : '' + v);                       // a real minus sign
  const tx = (x, y, s, cls, anchor, style) => `<text x="${f1(x)}" y="${f1(y)}" class="${cls || 'f-lab'}" text-anchor="${anchor || 'middle'}"${style ? ` style="${style}"` : ''}>${s}</text>`;
  const AMB = 'fill:var(--mark)', ACC = 'fill:var(--accent)';
  const HALO = 'paint-order:stroke;stroke:var(--paper-2);stroke-width:4px;stroke-linejoin:round';   // reads over a curve
  const cen = pts => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
  /** A label just outside corner p, pushed away from c (usually the shape's centre). */
  const lab = (p, c, s, cls, d, style) => { const u = unit(p, c); d = d || 11;
    return tx(p[0] + u[0] * d, p[1] + u[1] * d + 4, s, cls || 'f-lab', u[0] > .4 ? 'start' : u[0] < -.4 ? 'end' : 'middle', style); };
  /** An arrowhead with its tip at B, pointing from A; h sets the size. */
  const tip = (A, B, cls, h) => { h = h || 5; const u = unit(B, A), px = -u[1], py = u[0];
    return `<path d="M${f1(B[0])} ${f1(B[1])} L${f1(B[0] - u[0] * h * 1.7 + px * h * .75)} ${f1(B[1] - u[1] * h * 1.7 + py * h * .75)} L${f1(B[0] - u[0] * h * 1.7 - px * h * .75)} ${f1(B[1] - u[1] * h * 1.7 - py * h * .75)} Z" class="${cls || 'f-arrowhead'}"/>`; };
  const arrow = (A, B, cls, hcls, h) => seg(A, along(B, A, (h || 5) * 1.3), cls || 'f-arrow') + tip(A, B, hcls, h);
  /** An arc about C from angle a0 to a1 (degrees, counter-clockwise positive, as in maths) with a head. */
  const RAD = Math.PI / 180;
  const onArc = (C, r, a) => [C[0] + r * Math.cos(a * RAD), C[1] - r * Math.sin(a * RAD)];
  const turnArrow = (C, r, a0, a1, cls, hcls, h) => { h = h || 5;
    const sg = a1 > a0 ? 1 : -1, back = (h * 1.4 / r) / RAD, e = a1 - sg * back, A = onArc(C, r, a0), B = onArc(C, r, e);
    return `<path d="M${f1(A[0])} ${f1(A[1])} A${f1(r)} ${f1(r)} 0 ${Math.abs(e - a0) > 180 ? 1 : 0} ${sg > 0 ? 0 : 1} ${f1(B[0])} ${f1(B[1])}" class="${cls || 'f-arrow'}"/>`
      + tip(onArc(C, r, a1 - sg * back * 1.6), onArc(C, r, a1), hcls, h); };
  /** A stacked fraction centred at x, with its bar at y. */
  const frac = (x, y, a, b, cls, w, sa, sb) => tx(x, y - 5, a, cls || 'f-name', 'middle', sa)
    + `<line x1="${f1(x - w / 2)}" y1="${f1(y)}" x2="${f1(x + w / 2)}" y2="${f1(y)}" class="f-dim"/>` + tx(x, y + 14, b, cls || 'f-name', 'middle', sb === undefined ? sa : sb);
  /** A coordinate plane: dotted grid from (x0, y0) to (x1, y1), axes through the origin at (ox, oy),
      s pixels a unit. o.xs / o.ys list the numbers to print (o.yR: right of the axis); o.xAt / o.yAt move that row of
      numbers to another line (for instance the edge of the grid, away from the shapes). */
  const plane = (ox, oy, s, x0, x1, y0, y1, o) => { o = o || {};
    const at = (x, y) => [ox + x * s, oy - y * s];
    let g = GRID(ox + x0 * s, oy - y1 * s, (x1 - x0) * s, (y1 - y0) * s, s);
    if (y0 <= 0 && y1 >= 0) { const a = at(x0 - .4, 0), b = at(x1 + .4, 0); g += seg(a, b, 'f-axis') + tx(b[0] + 5, b[1] + 4, 'x', 'f-lab3', 'start'); }
    if (x0 <= 0 && x1 >= 0) { const a = at(0, y0 - .4), b = at(0, y1 + .4); g += seg(a, b, 'f-axis') + tx(b[0], b[1] - 5, 'y', 'f-lab3'); }
    (o.xs || []).forEach(v => { const p = at(v, o.xAt || 0); g += tx(p[0], p[1] + 14, n(v), 'f-lab3'); });
    (o.ys || []).forEach(v => { const p = at(o.yAt || 0, v); g += o.yR ? tx(p[0] + 6, p[1] + 4, n(v), 'f-lab3', 'start') : tx(p[0] - 6, p[1] + 4, n(v), 'f-lab3', 'end'); });
    return { g, at };
  };
  const cap = s => tx(14, 22, s, 'f-cap', 'start');
  const inc = ([A, B, C]) => { const a = Math.hypot(B[0] - C[0], B[1] - C[1]), b = Math.hypot(A[0] - C[0], A[1] - C[1]),
    c = Math.hypot(A[0] - B[0], A[1] - B[1]), s = a + b + c; return [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s]; };
  const box = (x, y, w, h, title, sub) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="f-panel"/>`
    + tx(x + w / 2, y + 20, title, 'f-name') + (sub ? tx(x + w / 2, y + 37, sub, 'f-lab3') : '');

  Object.assign(window.FIGURES, {

    /* ---------- transformations ---------- */

    slideOnGrid: () => { const { g, at } = plane(129, 153, 21, -5, 6, -3, 5, { xs: [-4, -2, 0, 2, 4, 6], ys: [-2, 0, 2, 4], xAt: -3, yAt: -5 });
      const pre = [[-4, 1], [-1, 1], [-2, 4]].map(p => at(...p)), img = [[1, -1], [4, -1], [3, 2]].map(p => at(...p));
      const c0 = cen(pre), c1 = cen(img), K = at(3, 4);
      return S('0 0 480 262', `<title>A translation 5 right and 2 down: triangle ABC and its image A′B′C′, every vertex moved by the same arrow</title>
      ${cap('a translation slides every point the same way — here 5 right and 2 down')}
      ${g}
      ${poly(pre, 'f-tile')}${poly(img, 'f-tile2')}
      ${pre.map((p, i) => arrow(along(p, img[i], 6), along(img[i], p, 5), 'f-arrow', 'f-arrowhead', 4)).join('')}
      ${arrow(along(pre[2], K, 4), K, 'f-line', 'f-headhi', 4)}${arrow(K, along(img[2], K, 4), 'f-line', 'f-headhi', 4)}
      ${tx(mid(pre[2], K)[0] + 14, K[1] - 7, '5 right', 'f-lab2')}${tx(K[0] + 7, mid(K, img[2])[1] + 4, '2 down', 'f-lab2', 'start')}
      ${pre.map(p => dot(p, 'f-dot', 2.6)).join('')}${img.map(p => dot(p, 'f-dot', 2.6)).join('')}
      ${['A', 'B', 'C'].map((s, i) => lab(pre[i], c0, s, 'f-name', 10)).join('')}
      ${lab(img[0], c1, 'A′', 'f-name', 10)}${lab(img[1], c1, 'B′', 'f-name', 10)}${tx(img[2][0] + 8, img[2][1] + 5, 'C′', 'f-name', 'start')}
      ${tx(290, 70, '(x, y) → (x + 5, y − 2)', 'f-name', 'start')}
      ${tx(290, 102, 'A(−4, 1) → A′(1, −1)', 'f-lab', 'start')}
      ${tx(290, 124, 'B(−1, 1) → B′(4, −1)', 'f-lab', 'start')}
      ${tx(290, 146, 'C(−2, 4) → C′(3, 2)', 'f-lab', 'start')}
      ${tx(290, 180, 'every arrow: same length,', 'f-lab3', 'start')}${tx(290, 197, 'same direction', 'f-lab3', 'start')}
      ${tx(14, 254, 'add 5 to every x, then subtract 2 from every y — one corner at a time', 'f-lab3', 'start')}`); },

    flipOnGrid: () => {
      const L = plane(59, 176, 19, -1, 6, -4, 4), a = L.at;
      const T = [[1, 1], [3, 3], [5, 0]].map(p => a(...p)), I = [[1, -1], [3, -3], [5, 0]].map(p => a(...p));
      const R = plane(357, 205, 19, -5, 5, -1, 5), b = R.at;
      const U = [[1, 1], [4, 2], [2, 4]].map(p => b(...p)), V = [[-1, 1], [-4, 2], [-2, 4]].map(p => b(...p));
      const cT = cen(T), cI = cen(I), cU = cen(U), cV = cen(V);
      return S('0 0 480 272', `<title>Reflections on a grid: across the x-axis the y-coordinate changes sign, across the y-axis the x-coordinate does; every point lands the same distance from the mirror</title>
      ${cap('a reflection puts each point the same distance from the mirror, on the other side')}
      ${box(10, 36, 226, 228, 'across the x-axis', '(x, y) → (x, −y): the y flips')}
      ${box(244, 36, 226, 228, 'across the y-axis', '(x, y) → (−x, y): the x flips')}
      ${L.g}${seg(a(-1.4, 0), a(6.4, 0), 'f-line')}
      ${poly(T, 'f-tile')}${poly(I, 'f-tile2')}
      ${seg(T[0], I[0], 'f-dash')}${seg(T[1], I[1], 'f-dash')}
      ${ticks(T[0], a(1, 0), 1, 'f-tk2')}${ticks(a(1, 0), I[0], 1, 'f-tk2')}${ticks(T[1], a(3, 0), 2, 'f-tk2')}${ticks(a(3, 0), I[1], 2, 'f-tk2')}
      ${right(a(3, 0), a(3, 1), a(4, 0), 6)}
      ${[...T, ...I].map(p => dot(p, 'f-dot', 2.6)).join('')}
      ${lab(T[0], cT, 'A', 'f-name', 9)}${lab(T[1], cT, 'B', 'f-name', 9)}${lab(I[0], cI, 'A′', 'f-name', 9)}${lab(I[1], cI, 'B′', 'f-name', 9)}
      ${tx(T[2][0] + 4, T[2][1] - 10, 'C = C′', 'f-name', 'start')}
      ${tx(T[2][0] + 6, T[2][1] + 24, 'on the mirror:', 'f-lab3', 'start')}${tx(T[2][0] + 6, T[2][1] + 39, 'stays put', 'f-lab3', 'start')}
      ${R.g}${seg(b(0, -1.4), b(0, 5.4), 'f-line')}
      ${poly(U, 'f-tile')}${poly(V, 'f-tile2')}
      ${U.map((p, i) => seg(p, V[i], 'f-dash')).join('')}
      ${U.map((p, i) => ticks(p, b(0, [1, 2, 4][i]), i + 1, 'f-tk2') + ticks(b(0, [1, 2, 4][i]), V[i], i + 1, 'f-tk2')).join('')}
      ${right(b(0, 4), b(0, 5), b(1, 4), 6)}
      ${[...U, ...V].map(p => dot(p, 'f-dot', 2.6)).join('')}
      ${lab(U[1], cU, 'B', 'f-name', 9)}${lab(U[2], cU, 'C', 'f-name', 9)}${lab(V[1], cV, 'B′', 'f-name', 9)}${lab(V[2], cV, 'C′', 'f-name', 9)}
      ${tx(U[0][0] + 3, U[0][1] + 16, 'A', 'f-name', 'start')}${tx(V[0][0] - 3, V[0][1] + 16, 'A′', 'f-name', 'end')}
      ${tx(357, 250, 'equal ticks: equal distances to the mirror', 'f-lab3')}`); },

    turnAboutOrigin: () => { const { g, at } = plane(128, 160, 19, -6, 7, -1, 6, { xs: [-6, -4, -2, 2, 4, 6], ys: [2, 4, 6], yR: 1 });
      const T = [[3, 1], [6, 2], [3, 5]].map(p => at(...p)), I = [[-1, 3], [-2, 6], [-5, 3]].map(p => at(...p)), O = at(0, 0);
      const a0 = Math.atan2(5, 3) / RAD;
      return S('0 0 480 230', `<title>A rotation of 90 degrees counter-clockwise about the origin: triangle ABC turns to A′B′C′, and C(3, 5) lands on C′(−5, 3)</title>
      ${cap('a rotation needs a centre, an angle and a direction')}
      ${g}
      ${poly(T, 'f-tile')}${poly(I, 'f-tile2')}
      ${seg(O, T[2], 'f-dash')}${seg(O, I[2], 'f-dash')}${ticks(O, T[2], 1, 'f-tk2')}${ticks(O, I[2], 1, 'f-tk2')}
      ${right(O, T[2], I[2], 8)}
      ${turnArrow(O, 30, a0 + 4, a0 + 86, 'f-line', 'f-headhi', 4)}
      ${tx(onArc(O, 46, 118)[0], onArc(O, 46, 118)[1] + 4, '90°', 'f-lab2')}
      ${[...T, ...I].map(p => dot(p, 'f-dot', 2.6)).join('')}${dot(O, 'f-hub', 4)}
      ${tx(O[0] - 5, O[1] + 14, 'O', 'f-name', 'end')}
      ${['A', 'B', 'C'].map((s, i) => lab(T[i], cen(T), s, 'f-name', 9)).join('')}
      ${tx(I[0][0] + 3, I[0][1] - 7, 'A′', 'f-name', 'start')}${lab(I[1], cen(I), 'B′', 'f-name', 9)}${lab(I[2], cen(I), 'C′', 'f-name', 9)}
      ${tx(286, 66, 'about O, 90° counter-clockwise', 'f-name', 'start')}
      ${tx(286, 88, '(x, y) → (−y, x)', 'f-lab', 'start')}
      ${tx(286, 112, 'C(3, 5) → C′(−5, 3)', 'f-lab2', 'start')}
      ${tx(286, 134, 'swap: (5, 3), then flip the sign', 'f-lab3', 'start')}${tx(286, 150, 'of the new first number: (−5, 3)', 'f-lab3', 'start')}
      ${tx(286, 180, '180°: (x, y) → (−x, −y)', 'f-lab', 'start')}
      ${tx(286, 200, '270°: (x, y) → (y, −x)', 'f-lab', 'start')}
      ${tx(14, 220, 'OC = OC′: every point keeps its distance from the centre', 'f-lab3', 'start')}`); },

    /* ---------- congruence ---------- */

    reflectThenSlide: () => { const { g, at } = plane(123, 178, 21, -5, 5, -1, 6);
      const T = [[1, 1], [4, 2], [2, 3]].map(p => at(...p)), M = [[-1, 1], [-4, 2], [-2, 3]].map(p => at(...p)), F = [[-1, 3], [-4, 4], [-2, 5]].map(p => at(...p));
      const cT = cen(T);
      return S('0 0 480 244', `<title>Two moves in sequence: reflect triangle ABC in the y-axis, write down the new point A′(−1, 1), then translate 2 up to A″(−1, 3)</title>
      ${cap('finish the first move, write the new point down, then do the second')}
      ${g}${seg(at(0, -1.4), at(0, 6.4), 'f-line')}${tx(at(0, 6.4)[0] + 8, at(0, 6.4)[1] + 10, 'mirror', 'f-lab2', 'start')}
      ${poly(T, 'f-tile')}${poly(M, 'f-dash')}${poly(F, 'f-tile2')}
      ${arrow(along(T[0], M[0], 6), along(M[0], T[0], 5), 'f-arrow', 'f-arrowhead', 4)}
      ${arrow(along(M[0], F[0], 6), along(F[0], M[0], 5), 'f-arrow', 'f-arrowhead', 4)}
      ${[...T, ...M, ...F].map(p => dot(p, 'f-dot', 2.4)).join('')}
      ${['A', 'B', 'C'].map((s, i) => lab(T[i], cT, s, 'f-name', 9)).join('')}
      ${tx(M[0][0] - 2, M[0][1] + 15, 'A′', 'f-name', 'end')}${tx(F[0][0] + 6, F[0][1] - 4, 'A″', 'f-name', 'start')}
      ${tx(262, 62, 'step 1 · reflect in the y-axis', 'f-lab3', 'start')}
      ${tx(262, 82, '(x, y) → (−x, y)', 'f-lab', 'start')}
      ${tx(262, 102, 'A(1, 1) → A′(−1, 1)', 'f-name', 'start')}
      ${tx(262, 136, 'step 2 · translate 2 up', 'f-lab3', 'start')}
      ${tx(262, 156, '(−x, y) → (−x, y + 2)', 'f-lab', 'start')}
      ${tx(262, 176, 'A′(−1, 1) → A″(−1, 3)', 'f-name', 'start')}
      ${poly([[264, 214], [280, 206], [274, 200]], 'f-dash')}${tx(288, 212, 'after step 1 — write it down', 'f-lab3', 'start')}
      ${poly([[264, 234], [280, 226], [274, 220]], 'f-tile2')}${tx(288, 232, 'after step 2', 'f-lab3', 'start')}`); },

    orientationFlips: () => { const T = [[-30, -24], [34, -6], [-12, 30]];
      const cases = [['original', p => p, ['A', 'B', 'C'], 'clockwise', 0], ['rotated', p => [-p[1], p[0]], ['A′', 'B′', 'C′'], 'still clockwise', 0],
        ['reflected', p => [-p[0], p[1]], ['A′', 'B′', 'C′'], 'anticlockwise', 1], ['reflected twice', p => [-p[0], -p[1]], ['A″', 'B″', 'C″'], 'clockwise again', 0]];
      return S('0 0 480 236', `<title>Orientation: a rotation keeps A, B, C running clockwise, one reflection reverses it, a second reflection restores it</title>
      ${cap('follow A → B → C round: a reflection reverses the direction, a turn never does')}
      ${cases.map((c, i) => { const x = 6 + i * 118, w = 112, cx = x + w / 2, cy = 120;
        const pts = T.map(c[1]).map(p => [cx + p[0], cy + p[1]]), I = inc(pts), C0 = cen(pts), rev = c[4];
        return `<rect x="${x}" y="34" width="${w}" height="170" rx="10" class="f-panel"/>` + tx(cx, 55, c[0], 'f-name')
          + poly(pts, rev ? 'f-tile2' : 'f-tile')
          + (rev ? turnArrow(I, 10, 30, 300, 'f-hi2', 'f-backhead', 3.6) : turnArrow(I, 10, 150, -120, 'f-line', 'f-headhi', 3.6))
          + pts.map(p => dot(p, 'f-dot', 2.4)).join('') + c[2].map((s, k) => lab(pts[k], C0, s, 'f-name', 9)).join('')
          + tx(cx, 192, c[3], 'f-lab2', 'middle', rev ? AMB : ''); }).join('')}
      ${tx(240, 226, 'flipped over? Then an odd number of reflections happened', 'f-lab3')}`); },

    /* ---------- dilations ---------- */

    scaleFactorRead: () => { const o1 = [40, 150], o2 = [150, 150], u = 16;
      const t1 = [o1, [o1[0] + 4 * u, o1[1]], [o1[0], o1[1] - 2 * u]], t2 = [o2, [o2[0] + 10 * u, o2[1]], [o2[0], o2[1] - 5 * u]];
      const kx = k => 40 + 120 * k;
      return S('0 0 480 246', `<title>Reading a scale factor: a side of 4 becomes 10 and a side of 2 becomes 5, so k = 2.5 both times</title>
      ${cap('divide an image length by the matching original length — new over old')}
      ${[t1, t2].map(t => poly(t, 'f-soft') + seg(t[1], t[2], 'f-edge') + seg(t[0], t[1], 'f-line') + seg(t[0], t[2], 'f-hi2') + right(t[0], t[1], t[2], 8)).join('')}
      ${tx(72, 166, '4', 'f-lab2')}${tx(32, 138, '2', 'f-lab2', 'end', AMB)}
      ${tx(230, 166, '10', 'f-lab2')}${tx(142, 114, '5', 'f-lab2', 'end', AMB)}
      ${tx(56, 182, 'original', 'f-lab3')}${tx(230, 182, 'image', 'f-lab3')}
      ${arrow([96, 108], [136, 92], 'f-arrow', 'f-arrowhead', 4)}${tx(112, 90, '× k', 'f-lab')}
      ${tx(330, 84, 'k =', 'f-name', 'start')}${frac(368, 80, '10', '4', 'f-lab2', 24)}${tx(386, 84, '= 2.5', 'f-name', 'start')}
      ${tx(330, 132, 'k =', 'f-name', 'start')}${frac(368, 128, '5', '2', 'f-lab2', 24, AMB)}${tx(386, 132, '= 2.5', 'f-name', 'start')}
      ${tx(330, 170, 'same k from both pairs,', 'f-lab3', 'start')}${tx(330, 186, 'so the triangles are similar', 'f-lab3', 'start')}
      <rect x="${kx(0)}" y="208" width="120" height="12" class="f-soft2"/><rect x="${kx(1)}" y="208" width="282" height="12" class="f-soft"/>
      ${seg([kx(0), 220], [kx(3.35), 220], 'f-axis')}
      ${[0, 1, 2, 3].map(k => seg([kx(k), 216], [kx(k), 224], 'f-axis')).join('')}
      ${tx(kx(0), 236, '0', 'f-lab3')}${tx(kx(1), 236, '1 = no change', 'f-lab3')}${tx(kx(2), 236, '2', 'f-lab3')}${tx(kx(3), 236, '3', 'f-lab3')}
      ${tx(kx(.5), 202, 'shrinks', 'f-lab')}${tx(kx(1.75), 202, 'enlarges', 'f-lab')}
      ${dot([kx(2.5), 214], 'f-hub', 4.4)}${tx(kx(2.5), 202, 'k = 2.5', 'f-lab2')}`); },

    similarVsCongruent: () => {
      const rt = (R, u) => [R, [R[0] + 4 * u, R[1]], [R[0], R[1] - 3 * u]];
      const rot = (pts, deg, to) => { const c = cen(pts), r = deg * RAD, q = pts.map(p => [c[0] + (p[0] - c[0]) * Math.cos(r) - (p[1] - c[1]) * Math.sin(r), c[1] + (p[0] - c[0]) * Math.sin(r) + (p[1] - c[1]) * Math.cos(r)]);
        const c2 = cen(q); return q.map(p => [p[0] - c2[0] + to[0], p[1] - c2[1] + to[1]]); };
      const k1 = rt([32, 192], 16), k2 = rot(k1, -150, [178, 132]);
      const s1 = rt([262, 192], 12), s2 = rt([334, 192], 24);
      const marks = (t, r) => right(t[0], t[1], t[2], 7) + ang(t[1], t[0], t[2], r, 'f-angarc', 1) + ang(t[2], t[0], t[1], r - 2, 'f-angarc2', 2);
      const tk = t => ticks(t[0], t[2], 1, 'f-tk') + ticks(t[0], t[1], 2, 'f-tk') + ticks(t[1], t[2], 3, 'f-tk');
      const sides = (t, a, b, c) => { const m = cen(t); return lab(mid(t[0], t[2]), m, a, 'f-lab', 6) + lab(mid(t[0], t[1]), m, b, 'f-lab', 7) + lab(mid(t[1], t[2]), m, c, 'f-lab', 6); };
      return S('0 0 480 250', `<title>Congruent triangles match in every side and angle; similar triangles match in angle while their sides are all multiplied by the same k</title>
      ${cap('congruent means identical; similar means the same shape at any scale')}
      ${box(10, 34, 226, 190, 'congruent', 'same shape, same size: k = 1')}
      ${box(244, 34, 226, 190, 'similar', 'equal angles, sides × 2: k = 2')}
      ${poly(k1, 'f-tile')}${poly(k2, 'f-tile')}${marks(k1, 15)}${marks(k2, 15)}${tk(k1)}${tk(k2)}
      ${poly(s1, 'f-tile')}${poly(s2, 'f-tile2')}${marks(s1, 11)}${marks(s2, 17)}
      ${sides(s1, '3', '4', '5')}${sides(s2, '6', '8', '10')}
      ${tx(240, 244, 'every congruent pair is similar (k = 1); not every similar pair is congruent', 'f-lab3')}`); },

    /* ---------- similarity proofs ---------- */

    twoAnglesForce: () => { const tri = (L, base) => { const side = base * Math.sin(60 * RAD) / Math.sin(70 * RAD);
        return [L, [L[0] + base, L[1]], [L[0] + side * Math.cos(50 * RAD), L[1] - side * Math.sin(50 * RAD)]]; };
      const t1 = tri([24, 196], 100), t2 = tri([162, 196], 160);
      const mk = (t, r) => wedge(t[0], t[1], t[2], r, 'f-soft') + wedge(t[1], t[2], t[0], r, 'f-soft2')
        + ang(t[0], t[1], t[2], r, 'f-angarc', 1) + ang(t[1], t[2], t[0], r, 'f-angarc2', 2) + ang(t[2], t[0], t[1], r - 4, 'f-angarc3', 1)
        + tx(...((p) => [p[0], p[1] + 4])(angAt(t[0], t[1], t[2], r + 13)), '50°', 'f-lab2')
        + tx(...((p) => [p[0], p[1] + 4])(angAt(t[1], t[2], t[0], r + 14)), '60°', 'f-lab2', 'middle', AMB)
        + tx(...((p) => [p[0], p[1] + 4])(angAt(t[2], t[0], t[1], r + 10)), '70°', 'f-name');
      return S('0 0 480 230', `<title>Two triangles of different sizes with angles of 50 and 60 degrees; the third angle is forced to be 70 degrees in both, so they are similar (AA)</title>
      ${cap('fix two angles and the third one has no choice')}
      ${poly(t1, 'f-edge')}${poly(t2, 'f-edge')}${mk(t1, 20)}${mk(t2, 24)}
      ${tx(344, 76, '50° + 60° = 110°', 'f-name', 'start')}
      ${tx(344, 100, '180° − 110° = 70°', 'f-name', 'start')}
      ${tx(344, 128, 'the third angle is', 'f-lab3', 'start')}${tx(344, 144, 'forced in both', 'f-lab3', 'start')}
      ${tx(344, 176, 'AA → similar', 'f-lab2', 'start')}
      ${tx(344, 200, 'AA fixes the shape,', 'f-lab3', 'start')}${tx(344, 216, 'not the size', 'f-lab3', 'start')}`); },

    sideSplitter: () => { const P = [150, 44], Q = [36, 214], R = [300, 214], t = .4;
      const D = [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])], E = [P[0] + t * (R[0] - P[0]), P[1] + t * (R[1] - P[1])], c = cen([P, Q, R]);
      return S('0 0 480 246', `<title>The triangle proportionality theorem: a line parallel to one side cuts the other two sides into pieces a, b and c, d with a/b = c/d</title>
      ${cap('a line parallel to one side cuts the other two sides in the same ratio')}
      ${poly([P, Q, R], 'f-soft')}
      ${seg(Q, R, 'f-edge')}${lineThru(D, E, 'f-edge', 22)}
      ${seg(P, D, 'f-line')}${seg(P, E, 'f-line')}${seg(D, Q, 'f-hi2')}${seg(E, R, 'f-hi2')}
      ${par(D, E, 1)}${par(Q, R, 1)}
      ${dot(D, 'f-hub', 3.6)}${dot(E, 'f-hub', 3.6)}
      ${lab(mid(P, D), c, 'a', 'f-eq', 8, ACC)}${lab(mid(D, Q), c, 'b', 'f-eq', 8, AMB)}
      ${lab(mid(P, E), c, 'c', 'f-eq', 8, ACC)}${lab(mid(E, R), c, 'd', 'f-eq', 8, AMB)}
      ${frac(358, 84, 'a', 'b', 'f-eq', 20, ACC, AMB)}${tx(384, 90, '=', 'f-eq')}${frac(410, 84, 'c', 'd', 'f-eq', 20, ACC, AMB)}
      ${tx(330, 132, 'top piece over bottom piece,', 'f-lab3', 'start')}${tx(330, 148, 'on both sides', 'f-lab3', 'start')}
      ${tx(330, 178, 'or whole over part on both:', 'f-lab3', 'start')}
      ${frac(360, 206, 'a + b', 'a', 'f-lab', 36)}${tx(386, 210, '=', 'f-lab')}${frac(412, 206, 'c + d', 'c', 'f-lab', 36)}
      ${tx(14, 242, 'converse: if the ratios match, the line must be parallel to the third side', 'f-lab3', 'start')}`); },

    shadowHeights: () => { const gy = 266, k = 5, T = [150, gy - 40 * k], Tb = [150, gy], Ts = [150 + 32 * k, gy];
      const Pp = [46, gy - 5 * k], Pb = [46, gy], Ps = [46 + 4 * k, gy], sun = [36, 62], cb = gy - 78;
      return S('0 0 480 292', `<title>Indirect measurement: a 5 ft person casts a 4 ft shadow and a tree casts a 32 ft shadow; the sun's parallel rays make similar triangles, so the tree is 40 ft tall</title>
      ${cap('the sun’s rays arrive parallel, so the two triangles are similar')}
      <circle cx="${sun[0]}" cy="${sun[1]}" r="12" class="f-tile2"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => seg(onArc(sun, 16, a), onArc(sun, 22, a), 'f-tk2')).join('')}
      ${poly([T, Tb, Ts], 'f-soft')}${poly([Pp, Pb, Ps], 'f-soft')}
      ${seg(along(T, Ts, -30), T, 'f-dash')}${seg(along(Pp, Ps, -50), Pp, 'f-dash')}
      ${poly([T, [122, cb], [178, cb]], 'f-panel')}${poly([T, [122, cb], [178, cb]], 'f-tile')}
      <rect x="145" y="${cb}" width="10" height="${gy - cb}" class="f-panel"/><rect x="145" y="${cb}" width="10" height="${gy - cb}" class="f-tile2"/>
      ${seg(T, Ts, 'f-hi2')}${seg(Pp, Ps, 'f-hi2')}${seg(Tb, Ts, 'f-line')}${seg(Pb, Ps, 'f-line')}
      ${seg([10, gy], [334, gy], 'f-axis')}
      <circle cx="46" cy="${gy - 21.4}" r="3.6" class="f-dot"/>${seg([46, gy - 18], [46, gy - 8], 'f-edge')}${seg([46, gy - 8], [42.5, gy], 'f-edge')}${seg([46, gy - 8], [49.5, gy], 'f-edge')}${seg([41, gy - 14], [51, gy - 14], 'f-edge')}
      ${right(Tb, T, Ts, 8)}
      ${ang(Ts, T, Tb, 24, 'f-angarc2', 1)}${ang(Ps, Pp, Pb, 11, 'f-angarc2', 1)}
      ${seg([102, T[1]], [140, T[1]], 'f-dim')}${arrow([108, gy - 100], [108, T[1] + 3], 'f-dim', 'f-arrowhead', 3.4)}${arrow([108, gy - 100], [108, gy - 3], 'f-dim', 'f-arrowhead', 3.4)}
      ${tx(100, gy - 96, 'h', 'f-eq', 'end')}
      ${tx(34, gy - 8, '5 ft', 'f-lab', 'end')}${tx(56, gy + 16, '4 ft', 'f-lab')}${tx(230, gy + 16, '32 ft', 'f-lab')}
      ${tx(344, 84, 'same sun, same angle,', 'f-lab3', 'start')}${tx(344, 100, 'so the triangles are similar', 'f-lab3', 'start')}
      ${frac(358, 142, '5', '4', 'f-eq', 18)}${tx(380, 148, '=', 'f-eq')}${frac(404, 142, 'h', '32', 'f-eq', 24)}
      ${tx(344, 198, 'h = 32 × 5 ÷ 4', 'f-name', 'start')}
      ${tx(344, 236, 'h = 40 ft', 'f-big', 'start')}`); },

    /* ---------- the coordinate plane ---------- */

    quadrantSigns: () => { const { g, at } = plane(127, 151, 21, -5, 5, -5, 5), O = at(0, 0);
      const Q = [['I', 2.5, 2.5, '(+, +)'], ['II', -2.5, 2.5, '(−, +)'], ['III', -2.5, -2.5, '(−, −)'], ['IV', 2.5, -2.5, '(+, −)']];
      const p2 = at(-3, 4), p4 = at(4, -3);
      return S('0 0 480 272', `<title>The four quadrants, numbered anticlockwise from the top right, with the sign pattern of the coordinates in each</title>
      ${cap('four quadrants, numbered anticlockwise from the top right')}
      ${g}
      ${Q.map(q => { const p = at(q[1], q[2]); return tx(p[0], p[1] + 2, q[0], 'f-big') + tx(p[0], p[1] + 20, q[3], 'f-lab'); }).join('')}
      ${turnArrow(O, 26, 40, 318, 'f-arrow', 'f-arrowhead', 3.6)}
      ${dot(p2, 'f-hub', 4)}${tx(p2[0] + 7, p2[1] - 5, '(−3, 4)', 'f-lab2', 'start')}
      ${dot(p4, 'f-hub', 4)}${tx(p4[0] + 7, p4[1] + 4, '(4, −3)', 'f-lab2', 'start')}
      ${tx(272, 78, 'the signs name the quadrant', 'f-name', 'start')}
      ${tx(272, 106, '(−3, 4): x negative, y positive', 'f-lab', 'start')}
      ${tx(272, 124, '→ up and left: quadrant II', 'f-lab2', 'start')}
      ${tx(272, 156, '(4, −3): x positive, y negative', 'f-lab', 'start')}
      ${tx(272, 174, '→ right and down: quadrant IV', 'f-lab2', 'start')}
      ${tx(272, 210, 'a point on an axis is in', 'f-lab3', 'start')}${tx(272, 226, 'no quadrant at all', 'f-lab3', 'start')}`); },

    pointMirrorAxes: () => { const { g, at } = plane(109, 150, 17, -5, 5, -6, 6), P = at(3, 5), X = at(3, -5), Y = at(-3, 5);
      return S('0 0 480 270', `<title>The point (3, 5) reflected in the x-axis lands on (3, −5) and reflected in the y-axis lands on (−3, 5)</title>
      ${cap('reflecting changes the sign of one coordinate — the one that crosses the mirror')}
      ${g}
      ${seg(P, X, 'f-dash')}${seg(P, Y, 'f-dash')}
      ${ticks(P, at(3, 0), 1, 'f-tk2')}${ticks(at(3, 0), X, 1, 'f-tk2')}${ticks(P, at(0, 5), 2, 'f-tk2')}${ticks(at(0, 5), Y, 2, 'f-tk2')}
      ${right(at(3, 0), at(3, 1), at(4, 0), 6)}${right(at(0, 5), at(0, 6), at(1, 5), 6)}
      ${tx(at(3, 2.5)[0] + 8, at(3, 2.5)[1] + 4, '5', 'f-lab', 'start')}${tx(at(3, -2.5)[0] + 8, at(3, -2.5)[1] + 4, '5', 'f-lab', 'start')}
      ${tx(at(1.5, 5)[0], at(1.5, 5)[1] - 12, '3', 'f-lab')}${tx(at(-1.5, 5)[0], at(-1.5, 5)[1] - 12, '3', 'f-lab')}
      ${dot(P, 'f-hub', 4.4)}${dot(X, 'f-marked', 4.4)}${dot(Y, 'f-marked', 4.4)}
      ${tx(P[0] + 8, P[1] + 4, '(3, 5)', 'f-lab2', 'start')}
      ${tx(X[0] + 8, X[1] + 4, '(3, −5)', 'f-lab2', 'start', AMB)}
      ${tx(Y[0] - 2, Y[1] - 9, '(−3, 5)', 'f-lab2', 'middle', AMB)}
      ${tx(236, 82, 'in the x-axis', 'f-name', 'start')}
      ${tx(236, 102, '(3, 5) → (3, −5)', 'f-lab', 'start')}
      ${tx(236, 120, 'x stays put, y changes sign', 'f-lab3', 'start')}
      ${tx(236, 156, 'in the y-axis', 'f-name', 'start')}
      ${tx(236, 176, '(3, 5) → (−3, 5)', 'f-lab', 'start')}
      ${tx(236, 194, 'y stays put, x changes sign', 'f-lab3', 'start')}
      ${tx(236, 228, 'only the coordinate that had', 'f-lab2', 'start')}${tx(236, 245, 'to move changes', 'f-lab2', 'start')}`); },

    /* ---------- distance and midpoint ---------- */

    midpointAverage: () => { const { g, at } = plane(40, 196, 24, 0, 8, 0, 6), A = at(1, 1), B = at(7, 5), M = at(4, 3);
      return S('0 0 480 252', `<title>The midpoint of A(1, 1) and B(7, 5) is M(4, 3): add and halve the x values, then add and halve the y values</title>
      ${cap('the midpoint is the average: add and halve each coordinate separately')}
      ${g}
      ${[A, M, B].map(p => seg(p, [p[0], at(0, 0)[1]], 'f-compass') + seg(p, [at(0, 0)[0], p[1]], 'f-compass')).join('')}
      ${seg(A, B, 'f-line')}${ticks(A, M, 1, 'f-tk2')}${ticks(M, B, 1, 'f-tk2')}
      ${dot(A, 'f-dot', 4)}${dot(B, 'f-dot', 4)}${dot(M, 'f-hub', 5)}
      ${tx(A[0] + 8, A[1] + 15, 'A(1, 1)', 'f-name', 'start')}${tx(B[0] + 8, B[1] - 6, 'B(7, 5)', 'f-name', 'start')}
      ${tx(M[0] + 10, M[1] + 16, 'M(4, 3)', 'f-lab2', 'start')}
      ${[1, 7].map(v => tx(at(v, 0)[0], at(0, 0)[1] + 15, v, 'f-lab3')).join('')}${tx(at(4, 0)[0], at(0, 0)[1] + 15, '4', 'f-lab2')}
      ${[1, 5].map(v => tx(at(0, 0)[0] - 7, at(0, v)[1] + 4, v, 'f-lab3', 'end')).join('')}${tx(at(0, 0)[0] - 7, at(0, 3)[1] + 4, '3', 'f-lab2', 'end')}
      ${tx(272, 74, 'x:', 'f-name', 'start')}${frac(314, 70, '1 + 7', '2', 'f-name', 40)}${tx(340, 74, '= 4', 'f-name', 'start')}
      ${tx(272, 124, 'y:', 'f-name', 'start')}${frac(314, 120, '1 + 5', '2', 'f-name', 40)}${tx(340, 124, '= 3', 'f-name', 'start')}
      ${tx(272, 172, 'M = (4, 3)', 'f-lab2', 'start')}
      ${tx(272, 202, 'check: 4 is between 1 and 7,', 'f-lab3', 'start')}${tx(272, 218, 'and 3 is between 1 and 5', 'f-lab3', 'start')}`); },

    /* ---------- coordinate proof ---------- */

    rectAtOrigin: () => { const O1 = [34, 206], O2 = [290, 196];
      const r1 = [[70, 180], [180, 180], [180, 112], [70, 112]], r2 = [O2, [430, 196], [430, 116], [290, 116]];
      return S('0 0 480 262', `<title>Placing a rectangle for a coordinate proof: anywhere, every corner carries p and q; with a corner at the origin the corners are (0, 0), (a, 0), (a, b) and (0, b)</title>
      ${cap('a proof about any rectangle may put it wherever the algebra is shortest')}
      ${box(10, 34, 226, 200, 'placed anywhere', 'every corner drags p and q along')}
      ${box(244, 34, 226, 200, 'corner at the origin', 'the zeros keep the algebra short')}
      ${seg([26, O1[1]], [226, O1[1]], 'f-axis')}${seg([O1[0], 216], [O1[0], 80], 'f-axis')}
      ${poly(r1, 'f-tile')}${r1.map(p => dot(p, 'f-dot', 3)).join('')}
      ${tx(70, 196, '(p, q)', 'f-lab')}${tx(180, 196, '(p + a, q)', 'f-lab')}
      ${tx(70, 104, '(p, q + b)', 'f-lab')}${tx(180, 104, '(p + a, q + b)', 'f-lab')}
      ${seg([O2[0] - 14, O2[1]], [460, O2[1]], 'f-axis')}${seg([O2[0], 206], [O2[0], 80], 'f-axis')}
      ${poly(r2, 'f-tile')}${seg(O2, r2[2], 'f-dash')}${r2.map(p => dot(p, 'f-hub', 3.4)).join('')}
      ${tx(O2[0] - 4, O2[1] + 15, '(0, 0)', 'f-lab', 'end')}${tx(430, 212, '(a, 0)', 'f-lab')}
      ${tx(430, 108, '(a, b)', 'f-lab')}${tx(O2[0] - 6, 120, '(0, b)', 'f-lab', 'end')}
      ${tx(360, 212, 'a', 'f-lab2')}${tx(438, 160, 'b', 'f-lab2', 'start')}
      ${tx(300, 136, 'diagonal', 'f-lab3', 'start')}${tx(300, 152, '√(a² + b²)', 'f-lab3', 'start')}
      ${tx(240, 254, 'the letters keep it general — this is a coordinate proof', 'f-lab3')}`); },

    perpSlopeProduct: () => { const { g, at } = plane(28, 216, 22, 0, 7, 0, 6), P = at(3, 3);
      const both = (A, B, cls, hcls) => { const a = along(A, B, -4), b = along(B, A, -4);
        return seg(along(a, b, 6), along(b, a, 6), cls) + tip(b, a, hcls, 4) + tip(a, b, hcls, 4); };
      return S('0 0 480 262', `<title>Perpendicular lines with slopes 2/3 and −3/2 multiply to −1; a horizontal and a vertical line are the exception</title>
      ${cap('perpendicular slopes are negative reciprocals: they multiply to −1')}
      ${box(10, 34, 300, 206, 'slopes multiply to −1')}
      ${box(318, 34, 152, 206, 'the exception')}
      ${g}
      ${seg(at(0, 1), at(3, 1), 'f-dim')}${seg(at(3, 1), P, 'f-dim')}${seg(P, at(5, 3), 'f-dim')}${seg(at(5, 3), at(5, 0), 'f-dim')}
      ${both(at(0, 1), at(7, 1 + 14 / 3), 'f-line', 'f-headhi')}
      ${both(at(1, 6), at(5, 0), 'f-hi2', 'f-backhead')}
      ${right(P, at(6, 5), at(5, 0), 9)}${dot(P, 'f-dot', 3.4)}
      ${tx(at(1.5, 1)[0], at(1.5, 1)[1] + 15, '3', 'f-lab2')}${tx(at(3, 2)[0] - 6, at(3, 2)[1] + 4, '2', 'f-lab2', 'end')}
      ${tx(at(4, 3)[0] + 2, at(4, 3)[1] + 16, '2', 'f-lab2', 'middle', AMB)}${tx(at(5, 1.5)[0] + 6, at(5, 1.5)[1] + 4, '−3', 'f-lab2', 'start', AMB)}
      ${tx(212, 92, 'm₁ =', 'f-name', 'start')}${frac(258, 88, '2', '3', 'f-lab2', 18)}
      ${tx(212, 138, 'm₂ =', 'f-name', 'start')}${frac(260, 134, '−3', '2', 'f-lab2', 22, AMB)}
      ${frac(220, 186, '2', '3', 'f-lab2', 16)}${tx(235, 190, '×', 'f-name')}${frac(252, 186, '−3', '2', 'f-lab2', 22, AMB)}${tx(268, 190, '= −1', 'f-name', 'start')}
      ${tx(212, 228, '→ perpendicular', 'f-lab3', 'start')}
      ${seg([334, 140], [454, 140], 'f-line')}${seg([394, 80], [394, 196], 'f-hi2')}${right([394, 140], [404, 140], [394, 130], 9)}
      ${tx(454, 132, 'slope 0', 'f-lab2', 'end')}
      ${tx(400, 92, 'slope', 'f-lab2', 'start', AMB)}${tx(400, 106, 'undefined', 'f-lab2', 'start', AMB)}
      ${tx(394, 214, 'perpendicular, but the', 'f-lab3')}${tx(394, 229, 'product is not −1', 'f-lab3')}
      ${tx(14, 256, 'so check for a vertical side before you reach for the product rule', 'f-lab3', 'start')}`); },

    /* ---------- circle equations ---------- */

    circleEqTriangle: () => { const { g, at } = plane(34, 214, 14, -1, 12, -1, 12), C = at(6, 6), Pt = at(10, 9), K = at(10, 6), r = 5 * 14;
      return S('0 0 480 262', `<title>The circle equation as Pythagoras: from the centre (h, k) to a point (x, y) on the circle, the legs are x − h and y − k and the hypotenuse is the radius r</title>
      ${cap('every point (x, y) on the circle is r from the centre (h, k) — that is Pythagoras')}
      ${g}
      <circle cx="${f1(C[0])}" cy="${f1(C[1])}" r="${r}" class="f-soft"/><circle cx="${f1(C[0])}" cy="${f1(C[1])}" r="${r}" class="f-line"/>
      ${seg(C, at(6, 0), 'f-compass')}${seg(C, at(0, 6), 'f-compass')}
      ${tx(C[0], at(0, 0)[1] + 15, 'h', 'f-lab2')}${tx(at(0, 0)[0] - 7, C[1] + 4, 'k', 'f-lab2', 'end')}
      ${seg(C, K, 'f-hi2')}${seg(K, Pt, 'f-hi2')}${seg(C, Pt, 'f-edge')}${right(K, C, Pt, 8)}
      ${tx(mid(C, K)[0], C[1] + 16, 'x − h', 'f-lab', 'middle', AMB)}
      ${tx(K[0] + 5, mid(K, Pt)[1] + 4, 'y − k', 'f-lab', 'start', AMB + ';' + HALO)}
      ${tx(mid(C, Pt)[0] - 6, mid(C, Pt)[1] - 6, 'r', 'f-eq', 'end')}
      ${dot(C, 'f-hub', 4.4)}${dot(Pt, 'f-dot', 4.4)}
      ${tx(C[0] - 6, C[1] - 7, '(h, k)', 'f-name', 'end')}${tx(Pt[0] + 6, Pt[1] - 6, '(x, y)', 'f-name', 'start')}
      ${tx(266, 70, '(x − h)² + (y − k)² = r²', 'f-name', 'start')}
      ${tx(266, 88, 'leg² + leg² = hypotenuse²', 'f-lab3', 'start')}
      ${tx(266, 126, 'the signs flip', 'f-name', 'start')}
      ${tx(266, 146, '(x − 6)² means h = 6', 'f-lab', 'start')}
      ${tx(266, 164, '(x + 3)² means h = −3', 'f-lab', 'start')}
      ${tx(266, 181, 'because x + 3 = x − (−3)', 'f-lab3', 'start')}
      ${tx(266, 218, 'the right side is r²', 'f-name', 'start')}
      ${tx(266, 238, '= 25 means the radius is 5', 'f-lab', 'start')}`); },

    circlePointTest: () => { const { g, at } = plane(116, 140, 16, -6, 6, -6, 6), O = at(0, 0), r = 80;
      const pin = at(-2, 1), pon = at(3, 4), pout = at(4, -4);
      return S('0 0 480 256', `<title>Testing points against the circle x² + y² = 25: (−2, 1) gives 5, inside; (3, 4) gives 25, on; (4, −4) gives 32, outside</title>
      ${cap('substitute the point and compare with r² — no square roots needed')}
      ${g}
      <circle cx="${O[0]}" cy="${O[1]}" r="${r}" class="f-soft"/><circle cx="${O[0]}" cy="${O[1]}" r="${r}" class="f-line"/>
      ${tx(at(5, 0)[0] + 4, O[1] + 14, '5', 'f-lab3', 'start')}
      ${[pin, pon, pout].map(p => seg(O, p, 'f-compass')).join('')}
      ${dot(O, 'f-dot', 3)}${dot(pin, 'f-hub', 4.4)}${dot(pon, 'f-hub', 4.4)}${dot(pout, 'f-marked', 4.4)}
      ${tx(pin[0], pin[1] - 10, '(−2, 1)', 'f-lab2')}
      ${tx(pon[0] + 7, pon[1] - 5, '(3, 4)', 'f-lab2', 'start')}
      ${tx(pout[0] + 7, pout[1] + 4, '(4, −4)', 'f-lab2', 'start', AMB)}
      ${tx(240, 66, 'x² + y² = 25, so r² = 25', 'f-name', 'start')}
      ${tx(240, 104, '(−2, 1):  4 + 1 = 5', 'f-lab', 'start')}${tx(240, 121, '5 &lt; 25 → inside', 'f-lab2', 'start')}
      ${tx(240, 156, '(3, 4):  9 + 16 = 25', 'f-lab', 'start')}${tx(240, 173, '25 = 25 → on', 'f-lab2', 'start')}
      ${tx(240, 208, '(4, −4):  16 + 16 = 32', 'f-lab', 'start')}${tx(240, 225, '32 &gt; 25 → outside', 'f-lab2', 'start', AMB)}`); },
  });
})();
