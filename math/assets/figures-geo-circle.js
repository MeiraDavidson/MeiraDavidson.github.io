/* Circle and right-triangle figures for the lesson sections — where π comes from, why the
   area is πr², the angle rules that depend on where the vertex sits, chords and tangents,
   then Pythagoras backwards, naming sides, elevation and the laws of sines and cosines.
   Every circle here is drawn true: inscribed angles really stand on their arc, tangents
   really touch at right angles, and the numbers in the labels are the lesson's numbers. */
(function () {
  const G = window.GEO;
  const { S, ARR, GRID, f1, poly, seg, txt, dot, unit, along, mid, ang, angAt, wedge, right, ticks, par, panel } = G;
  const rad = d => d * Math.PI / 180;
  /** The point of the circle about C at d degrees, measured anticlockwise from east — as on paper. */
  const on = (C, r, d) => [C[0] + r * Math.cos(rad(d)), C[1] - r * Math.sin(rad(d))];
  const ring = (C, r, cls) => `<circle cx="${f1(C[0])}" cy="${f1(C[1])}" r="${f1(r)}" class="${cls || 'f-edge'}"/>`;
  /** The arc of that circle running anticlockwise from d0 to d1 degrees. */
  const arc = (C, r, d0, d1, cls, w) => { const a = on(C, r, d0), b = on(C, r, d1), span = ((d1 - d0) % 360 + 360) % 360;
    return `<path d="M${f1(a[0])} ${f1(a[1])} A${f1(r)} ${f1(r)} 0 ${span > 180 ? 1 : 0} 0 ${f1(b[0])} ${f1(b[1])}" class="${cls || 'f-hi2'}"${w ? ` style="stroke-width:${w}"` : ''}/>`; };
  /** A pie slice of the circle, d0 to d1 anticlockwise. */
  const sector = (C, r, d0, d1, cls) => { const a = on(C, r, d0), b = on(C, r, d1);
    return `<path d="M${f1(C[0])} ${f1(C[1])} L${f1(a[0])} ${f1(a[1])} A${f1(r)} ${f1(r)} 0 ${d1 - d0 > 180 ? 1 : 0} 0 ${f1(b[0])} ${f1(b[1])} Z" class="${cls || 'f-soft'}"/>`; };
  /** Where line AB meets line CD. */
  const cross = (A, B, C, D) => { const r = [B[0] - A[0], B[1] - A[1]], s = [D[0] - C[0], D[1] - C[1]], den = r[0] * s[1] - r[1] * s[0],
    t = ((C[0] - A[0]) * s[1] - (C[1] - A[1]) * s[0]) / den; return [A[0] + t * r[0], A[1] + t * r[1]]; };
  /** A label point d off the middle of AB, on the side away from `away`; the +4 centres 11px text on it. */
  const side = (A, B, d, away) => { const m = mid(A, B), u = unit(B, A); let n = [-u[1], u[0]];
    if (away && (away[0] - m[0]) * n[0] + (away[1] - m[1]) * n[1] > 0) n = [-n[0], -n[1]];
    return [m[0] + n[0] * d, m[1] + n[1] * d + 4]; };
  const lab = (p, s, cls, anchor) => txt(p[0], p[1], s, cls, anchor);
  /** Amber text, to sit beside an amber (f-hi2) line, arc or tile. */
  const amb = (x, y, s, anchor) => `<text x="${f1(x)}" y="${f1(y)}" class="f-lab2" style="fill:var(--mark)" text-anchor="${anchor || 'middle'}">${s}</text>`;
  /** Text turned to run along a slanted line. */
  const rot = (p, deg, s, cls) => `<text x="${f1(p[0])}" y="${f1(p[1])}" class="${cls || 'f-lab'}" text-anchor="middle" transform="rotate(${f1(deg)} ${f1(p[0])} ${f1(p[1])})">${s}</text>`;
  /** A triangle A (bottom left), B (bottom right), C (top) for the oblique-triangle panels. */
  const tri = x => ({ A: [x + 22, 176], B: [x + 200, 176], C: [x + 150, 76] });
  const vlabels = T => lab([T.A[0] - 10, T.A[1] + 6], 'A', 'f-name', 'end') + lab([T.B[0] + 10, T.B[1] + 6], 'B', 'f-name', 'start')
    + lab([T.C[0], T.C[1] - 10], 'C', 'f-name');

  Object.assign(window.FIGURES, {

  /* ---- circles ---- */

  piRollOut: () => { const r = 40, C = [92, 110], y = C[1] + r, x0 = C[0], L = 2 * Math.PI * r, x1 = x0 + L;
    let bars = '';
    for (let k = 0; k < 3; k++) bars += `<rect x="${x0 + k * 2 * r}" y="${y + 8}" width="${2 * r}" height="10" class="f-tile"/>` + txt(x0 + k * 2 * r + r, y + 34, 'd', 'f-lab2');
    return S('0 0 480 232', `<title>A circle rolled through one full turn: the track it leaves is its circumference, just over three diameters long</title>
    ${txt(14, 22, 'roll a circle through one full turn and measure the track it leaves', 'f-cap', 'start')}
    ${ring([x1, C[1]], r, 'f-ghost')}
    ${ring(C, r, 'f-hi2')}
    ${seg([C[0] - r, C[1]], [C[0] + r, C[1]], 'f-line')}${dot(C, 'f-hub', 3)}
    ${txt(C[0], C[1] - 8, 'd', 'f-lab2')}
    ${ARR(146, 62, 292, 62)}${txt(219, 54, 'one full turn', 'f-lab3')}
    ${seg([x0, y], [x1, y], 'f-hi2')}${dot([x0, y], 'f-dot')}${dot([x1, y], 'f-dot')}
    ${amb((x0 + x1) / 2, y - 8, 'C')}
    ${bars}<rect x="${f1(x0 + 6 * r)}" y="${y + 8}" width="${f1(L - 6 * r)}" height="10" class="f-tile2"/>
    ${amb(x0 + 6 * r + 6, y + 34, '0.14d', 'start')}
    ${txt(400, 96, 'C ÷ d', 'f-name', 'start')}${txt(400, 118, '≈ 3.14', 'f-name', 'start')}
    ${txt(14, 208, 'C ÷ d = 3.14159… = π, for a coin or a stadium alike', 'f-cap', 'start')}
    ${txt(14, 226, 'so C = πd, and since d = 2r, C = 2πr', 'f-lab3', 'start')}`); },

  piAreaWedges: () => { const r = 64, C = [86, 122], h = r * Math.cos(rad(15)), w = 2 * r * Math.sin(rad(15)), x0 = 220, yT = 90;
    let o = '';
    for (let k = 0; k < 12; k++) o += sector(C, r, k * 30, (k + 1) * 30, k < 6 ? 'f-tile2' : 'f-tile');
    for (let i = 0; i < 6; i++) o += sector([x0 + w / 2 + i * w, yT], r, 255, 285, 'f-tile')
      + sector([x0 + (i + 1) * w, yT + h], r, 75, 105, 'f-tile2');
    const xr = x0 + 6.5 * w + 14;
    return S('0 0 480 250', `<title>A circle cut into twelve wedges and laid top-to-tail: a near-parallelogram r tall and πr wide</title>
    ${txt(14, 22, 'cut it into wedges, then lay them alternately point-up and point-down', 'f-cap', 'start')}
    ${o}
    ${seg(C, on(C, r, 0), 'f-edge')}${txt(C[0] + r / 2, C[1] - 6, 'r', 'f-name')}
    ${amb(C[0], C[1] - r - 9, 'half of C')}${txt(C[0], C[1] + r + 19, 'half of C', 'f-lab2')}
    ${ARR(164, 122, 204, 122)}
    ${amb(x0 + 3.5 * w, yT - 10, 'πr')}
    ${seg([x0, yT + r + 12], [x0 + 6 * w, yT + r + 12], 'f-dim')}${seg([x0, yT + r + 7], [x0, yT + r + 17], 'f-dim')}${seg([x0 + 6 * w, yT + r + 7], [x0 + 6 * w, yT + r + 17], 'f-dim')}
    ${txt(x0 + 3 * w, yT + r + 28, 'πr — half the circumference', 'f-lab2')}
    ${seg([xr, yT], [xr, yT + r], 'f-dim')}${seg([xr - 5, yT], [xr + 5, yT], 'f-dim')}${seg([xr - 5, yT + r], [xr + 5, yT + r], 'f-dim')}
    ${txt(xr + 9, yT + r / 2 + 4, 'r', 'f-name', 'start')}
    ${txt(14, 228, 'area ≈ πr × r = πr²', 'f-name', 'start')}
    ${txt(14, 244, 'the thinner the wedges, the closer the shape is to a true rectangle', 'f-lab3', 'start')}`); },

  circleRadiusTrap: () => { const s = 7, C1 = [99, 132], C2 = [284, 138], r1 = 5 * s, r2 = 10 * s;
    let quads = '';
    [[0, 1], [1, 1], [1, 0], [0, 0]].forEach(([i, j], k) => {
      quads += `<rect x="${C2[0] + i * r1}" y="${C2[1] - r2 + j * r1}" width="${r1}" height="${r1}" class="${k === 0 ? 'f-tile' : 'f-tile2'}"/>`
        + txt(C2[0] + i * r1 + r1 / 2, C2[1] - r2 + j * r1 + r1 / 2 + 4, '25', k === 2 ? 'f-lab f-halo' : 'f-lab'); });   // the rim crosses the far square, so its label gets a halo
    const dy = C1[1] + r1 + 12;
    return S('0 0 480 246', `<title>A circle of diameter 10: the right area uses r = 5; using 10 as the radius draws a circle four times the area</title>
    ${panel(10, 8, 180, 230, 'r = 5 — correct', 'd = 10, so halve it first')}
    <rect x="${C1[0]}" y="${C1[1] - r1}" width="${r1}" height="${r1}" class="f-tile"/>
    ${txt(C1[0] + r1 / 2, C1[1] - r1 / 2 + 4, '25', 'f-lab')}
    ${ring(C1, r1, 'f-edge')}${seg([C1[0] - r1, C1[1]], C1, 'f-dash')}${seg(C1, [C1[0] + r1, C1[1]], 'f-line')}${dot(C1, 'f-hub', 3)}
    ${txt(C1[0] + r1 / 2, C1[1] + 14, '5', 'f-lab2')}
    ${seg([C1[0] - r1, dy], [C1[0] + r1, dy], 'f-dim')}${seg([C1[0] - r1, dy - 5], [C1[0] - r1, dy + 5], 'f-dim')}${seg([C1[0] + r1, dy - 5], [C1[0] + r1, dy + 5], 'f-dim')}
    ${txt(C1[0], dy + 16, 'd = 10', 'f-lab')}
    ${txt(C1[0], 212, 'A = π · 5² = 25π', 'f-name')}
    ${txt(C1[0], 230, 'C = 2π · 5 = 10π', 'f-lab3')}
    ${panel(198, 8, 272, 230, 'd used as r — wrong', 'that is a circle twice as wide')}
    ${quads}
    ${ring(C2, r2, 'f-edge')}${ring(C2, r1, 'f-dash')}${seg(C2, [C2[0] + r2, C2[1]], 'f-hi2')}${dot(C2, 'f-hub', 3)}
    ${amb(C2[0] + r2 * 0.76, C2[1] + 15, '10')}
    ${txt(364, 92, 'A = π · 10²', 'f-name', 'start')}
    ${txt(364, 110, '= 100π', 'f-name', 'start')}
    ${amb(364, 130, '4 × too big', 'start')}
    ${txt(364, 166, 'C = 2π · 10', 'f-lab3', 'start')}
    ${txt(364, 182, '= 20π', 'f-lab3', 'start')}
    ${txt(364, 198, '2 × too big', 'f-lab3', 'start')}`); },

  /* ---- circle angles ---- */

  centralAngleArc: () => { const O = [118, 128], R = 88, A = on(O, R, -35), B = on(O, R, 35),
      C1 = [322, 84], C2 = [424, 84], q = 36;
    return S('0 0 480 236', `<title>A 70 degree central angle cuts a 70 degree arc; a semicircle is 180 degrees and a quarter circle 90</title>
    ${txt(14, 22, 'a central angle and its arc are the same number', 'f-cap', 'start')}
    ${wedge(O, A, B, 34, 'f-soft')}${ring(O, R, 'f-edge')}
    ${arc(O, R, -35, 35, 'f-hi2', 4)}
    ${seg(O, A, 'f-line')}${seg(O, B, 'f-line')}${ang(O, A, B, 34, 'f-angarc')}
    ${lab(angAt(O, A, B, 52).map((v, i) => v + (i ? 4 : 0)), '70°', 'f-lab2')}
    ${dot(O, 'f-hub')}${txt(O[0] - 8, O[1] + 4, 'O', 'f-name', 'end')}${dot(A, 'f-dot')}${dot(B, 'f-dot')}
    ${amb(O[0] + R + 10, O[1] + 4, '70° arc', 'start')}
    ${ring(C1, q, 'f-edge')}${arc(C1, q, 0, 180, 'f-hi2', 4)}${seg([C1[0] - q, C1[1]], [C1[0] + q, C1[1]], 'f-line')}
    ${arc(C1, 10, 0, 180, 'f-angarc')}${dot(C1, 'f-hub', 3)}${txt(C1[0], C1[1] - 17, '180°', 'f-lab2')}
    ${ring(C2, q, 'f-edge')}${arc(C2, q, 0, 90, 'f-hi2', 4)}${seg(C2, on(C2, q, 0), 'f-line')}${seg(C2, on(C2, q, 90), 'f-line')}
    ${right(C2, on(C2, q, 0), on(C2, q, 90), 9)}${dot(C2, 'f-hub', 3)}${lab(on(C2, 19, 50).map((v, i) => v + (i ? 5 : 4)), '90°', 'f-lab2')}
    ${txt(C1[0], 142, 'semicircle', 'f-name')}${amb(C1[0], 160, '180° arc')}
    ${txt(C2[0], 142, 'quarter circle', 'f-name')}${amb(C2[0], 160, '90° arc')}
    ${txt(372, 196, 'arcs are measured by', 'f-lab3')}${txt(372, 212, 'their central angles;', 'f-lab3')}
    ${txt(372, 228, 'the whole circle is 360°', 'f-lab3')}`); },

  inscribedHalfArc: () => { const O = [128, 136], R = 90, A = on(O, R, 235), B = on(O, R, 305), Pp = on(O, R, 100),
      K = [374, 118], q = 62, L = on(K, q, 180), Rr = on(K, q, 0), D = on(K, q, 62);
    return S('0 0 480 252', `<title>An inscribed angle of 35 degrees and a central angle of 70 degrees standing on the same 70 degree arc, and a right angle in a semicircle</title>
    ${txt(14, 20, 'the same arc: 70° from the centre, 35° from the edge', 'f-cap', 'start')}
    ${wedge(O, A, B, 30, 'f-soft')}${wedge(Pp, A, B, 40, 'f-soft2')}${ring(O, R, 'f-edge')}
    ${arc(O, R, 235, 305, 'f-hi2', 4)}
    ${seg(Pp, A, 'f-edge')}${seg(Pp, B, 'f-edge')}${seg(O, A, 'f-line')}${seg(O, B, 'f-line')}
    ${ang(O, A, B, 30, 'f-angarc')}${ang(Pp, A, B, 40, 'f-angarc2')}
    ${lab(angAt(O, A, B, 46).map((v, i) => v + (i ? 4 : 0)), '70°', 'f-lab2')}
    ${(p => amb(p[0], p[1] + 4, '35°'))(angAt(Pp, A, B, 56))}
    ${dot(O, 'f-hub')}${txt(O[0] - 9, O[1] - 2, 'O', 'f-name', 'end')}
    ${dot(Pp, 'f-dot')}${txt(Pp[0], Pp[1] - 9, 'P', 'f-name')}${dot(A, 'f-dot')}${dot(B, 'f-dot')}
    ${amb(O[0], O[1] + R + 16, '70° arc')}
    ${txt(K[0], 34, 'angle in a semicircle', 'f-name')}
    ${ring(K, q, 'f-edge')}${arc(K, q, 180, 360, 'f-hi2', 4)}${seg(L, Rr, 'f-line')}
    ${seg(D, L, 'f-edge')}${seg(D, Rr, 'f-edge')}${right(D, L, Rr, 10)}${dot(K, 'f-hub', 3)}${dot(D, 'f-dot')}
    ${(p => txt(p[0], p[1] + 4, '90°', 'f-lab2'))(angAt(D, L, Rr, 26))}
    ${amb(K[0], K[1] + q + 16, '180° arc')}
    ${txt(K[0], 222, 'half of 180° = 90°', 'f-lab3')}
    ${txt(K[0], 240, 'the centre is twice the edge', 'f-lab3')}`); },

  outsideAngleArcs: () => { const O = [204, 128], R = 70, F1 = on(O, R, 55), F2 = on(O, R, -55), N1 = on(O, R, 160), N2 = on(O, R, 200),
      P = cross(N1, F1, [0, O[1]], [1, O[1]]),
      K = [398, 118], q = 54, A = on(K, q, 140), B = on(K, q, 40), Cc = on(K, q, -70), D = on(K, q, -110), X = cross(A, Cc, B, D);
    return S('0 0 480 240', `<title>Two secants from an outside point cut arcs of 110 and 40 degrees and meet at 35 degrees; two chords crossing inside meet at half the sum</title>
    ${txt(14, 22, 'outside: half the difference', 'f-title', 'start')}
    ${ring(O, R, 'f-edge')}
    ${seg(P, along(P, F1, Math.hypot(F1[0] - P[0], F1[1] - P[1]) + 20), 'f-edge')}
    ${seg(P, along(P, F2, Math.hypot(F2[0] - P[0], F2[1] - P[1]) + 20), 'f-edge')}
    ${arc(O, R, -55, 55, 'f-hi2', 4)}${arc(O, R, 160, 200, 'f-line', 4)}
    ${ang(P, F1, F2, 36, 'f-angarc3')}${(p => txt(p[0], p[1] + 4, '35°', 'f-name'))(angAt(P, F1, F2, 54))}
    ${dot(P, 'f-dot')}${txt(P[0] - 8, P[1] + 4, 'P', 'f-name', 'end')}
    ${[F1, F2, N1, N2].map(p => dot(p, 'f-dot', 3)).join('')}
    ${amb(O[0] + R + 10, O[1] + 4, '110°', 'start')}${txt(O[0] - R + 22, O[1] + 4, '40°', 'f-lab2')}
    ${txt(P[0] - 14, 222, '(110° − 40°) ÷ 2 = 35°', 'f-cap', 'start')}
    <line x1="318" y1="32" x2="318" y2="226" class="f-rule"/>
    ${txt(332, 22, 'inside: half the sum', 'f-title', 'start')}
    ${ring(K, q, 'f-edge')}${arc(K, q, 40, 140, 'f-hi2', 4)}${arc(K, q, -110, -70, 'f-line', 4)}
    ${seg(A, Cc, 'f-edge')}${seg(B, D, 'f-edge')}
    ${ang(X, A, B, 16, 'f-angarc3')}${(p => txt(p[0], p[1] + 4, '70°', 'f-name'))(angAt(X, A, B, 30))}
    ${[A, B, Cc, D].map(p => dot(p, 'f-dot', 3)).join('')}${dot(X, 'f-dot', 3)}
    ${amb(K[0], K[1] - q - 9, '100°')}${txt(K[0], K[1] + q + 18, '40°', 'f-lab2')}
    ${txt(K[0], 222, '(100° + 40°) ÷ 2 = 70°', 'f-cap')}`); },

  chordsCrossProduct: () => { const u = 15, O = [148, 132], R = 6 * u, X = on(O, Math.sqrt(12) * u, 75.3),
      v = [X[0] - O[0], X[1] - O[1]], pw = v[0] * v[0] + v[1] * v[1] - R * R;
    /* the chord through X in direction d (degrees): its two ends, and the two piece lengths in units */
    const chord = d => { const e = [Math.cos(rad(d)), -Math.sin(rad(d))], k = v[0] * e[0] + v[1] * e[1], s = Math.sqrt(k * k - pw),
      t1 = -k + s, t2 = -k - s; return { E1: [X[0] + t1 * e[0], X[1] + t1 * e[1]], E2: [X[0] + t2 * e[0], X[1] + t2 * e[1]] }; };
    const c1 = chord(75.3 + 73.22), c2 = chord(75.3 - 43.85),
      K = [392, 112], q = 58, my = K[1] + 28, hw = Math.sqrt(q * q - 28 * 28), M = [K[0], my], L = [K[0] - hw, my], Rr = [K[0] + hw, my];
    return S('0 0 480 250', `<title>Two chords crossing inside a circle: pieces 4 and 6 on one, 3 and 8 on the other, and 4 × 6 = 3 × 8</title>
    ${txt(14, 20, 'two chords crossing: the products of the pieces match', 'f-cap', 'start')}
    ${ring(O, R, 'f-edge')}
    ${seg(X, c1.E1, 'f-line')}${seg(X, c1.E2, 'f-line')}${seg(X, c2.E1, 'f-hi2')}${seg(X, c2.E2, 'f-hi2')}
    ${[c1.E1, c1.E2, c2.E1, c2.E2].map(p => dot(p, 'f-dot', 3)).join('')}${dot(X, 'f-dot')}
    ${lab(side(X, c1.E1, 12, O), 'a = 4', 'f-lab2')}${lab(side(X, c1.E2, 13, [X[0], X[1] - 100]), 'b = 6', 'f-lab2')}
    ${(p => amb(p[0], p[1], 'c = 3'))(side(X, c2.E1, 15, [X[0], X[1] - 100]))}${(p => amb(p[0], p[1], 'd = 8'))(side(X, c2.E2, 12, [O[0], O[1] - 60]))}
    ${txt(O[0], 240, 'a · b = c · d:  4 × 6 = 3 × 8 = 24', 'f-cap')}
    <line x1="306" y1="30" x2="306" y2="232" class="f-rule"/>
    ${txt(K[0], 34, 'radius ⟂ chord', 'f-name')}
    ${ring(K, q, 'f-edge')}${seg(L, Rr, 'f-edge')}${seg(K, [K[0], K[1] + q], 'f-line')}${dot(K, 'f-hub', 3)}
    ${right(M, Rr, K, 8)}${ticks(L, M, 1, 'f-tk2')}${ticks(M, Rr, 1, 'f-tk2')}
    ${txt(K[0], 196, 'it cuts the chord', 'f-lab3')}${txt(K[0], 212, 'into two equal halves', 'f-lab3')}`); },

  tangentRightAngle: () => { const u = 14, O = [112, 124], r = 5 * u, P = [O[0] + 13 * u, O[1]], t = Math.acos(5 / 13) * 180 / Math.PI,
      A = on(O, r, t), B = on(O, r, -t), PA = Math.hypot(A[0] - P[0], A[1] - P[1]);
    return S('0 0 480 240', `<title>Two tangents from an outside point P: each meets its radius at a right angle, and PA = PB; with radius 5 and OP 13, PA is 12</title>
    ${ring(O, r, 'f-edge')}
    ${seg(P, along(P, A, PA + 34), 'f-line')}${seg(P, along(P, B, PA + 34), 'f-line')}
    ${seg(O, A, 'f-edge')}${seg(O, B, 'f-edge')}${seg(O, P, 'f-dash')}
    ${right(A, O, P, 10)}${right(B, O, P, 10)}
    ${ticks(P, A, 1, 'f-tk2')}${ticks(P, B, 1, 'f-tk2')}
    ${dot(O, 'f-hub')}${dot(A, 'f-dot')}${dot(B, 'f-dot')}${dot(P, 'f-dot')}
    ${txt(O[0] - 8, O[1] + 4, 'O', 'f-name', 'end')}${txt(P[0] + 9, P[1] + 4, 'P', 'f-name', 'start')}
    ${lab(on(O, r + 14, t + 8), 'A', 'f-name')}${lab(on(O, r + 16, -t - 8).map((v, i) => v + (i ? 6 : 0)), 'B', 'f-name')}
    ${lab(side(O, A, 10, P), '5', 'f-lab')}${lab(side(P, A, 12, O), '12', 'f-lab2')}${txt((O[0] + P[0]) / 2 + 20, O[1] - 7, '13', 'f-lab')}
    ${txt(330, 64, 'tangent ⟂ radius', 'f-name', 'start')}
    ${txt(330, 82, 'at the point of contact', 'f-lab3', 'start')}
    ${txt(330, 116, 'PA = PB', 'f-name', 'start')}
    ${txt(330, 134, 'two tangents from', 'f-lab3', 'start')}${txt(330, 150, 'one outside point', 'f-lab3', 'start')}
    ${txt(330, 184, '5² + 12² = 13²', 'f-name', 'start')}
    ${txt(330, 202, 'the right angle turns', 'f-lab3', 'start')}${txt(330, 218, 'it into Pythagoras', 'f-lab3', 'start')}`); },

  /* ---- Pythagoras ---- */

  pythagLegSubtract: () => { const u = 13, C = [34, 176], B = [34, 176 - 5 * u], A = [34 + 12 * u, 176], k = 224 / 169, x = 236;
    return S('0 0 480 236', `<title>A right triangle with hypotenuse 13 and leg 5: the unknown leg comes from 169 minus 25</title>
    ${txt(14, 22, 'spot the hypotenuse first: it is across from the right angle', 'f-cap', 'start')}
    ${poly([C, B, A], 'f-soft')}
    ${seg(C, B, 'f-edge')}${seg(C, A, 'f-line')}${seg(B, A, 'f-hi2')}${right(C, B, A, 11)}
    ${txt(C[0] - 8, (C[1] + B[1]) / 2 + 4, '5', 'f-name', 'end')}
    ${txt((C[0] + A[0]) / 2, C[1] + 18, 'a = ?', 'f-lab2')}
    ${(p => amb(p[0], p[1], 'c = 13'))(side(B, A, 14, C))}
    <rect x="${x}" y="58" width="224" height="26" rx="3" class="f-tile2"/>${txt(x + 112, 75, 'c² = 169', 'f-name')}
    <rect x="${x}" y="92" width="${f1(25 * k)}" height="26" rx="3" class="f-panel"/>
    <rect x="${f1(x + 25 * k)}" y="92" width="${f1(144 * k)}" height="26" rx="3" class="f-tile"/>
    ${txt(x + 25 * k / 2, 109, '25', 'f-lab')}${txt(x + 25 * k + 144 * k / 2, 109, 'a² = 144', 'f-name')}
    ${txt(x + 25 * k / 2, 134, 'b²', 'f-lab3')}
    ${txt(x, 162, 'a² = c² − b²', 'f-name', 'start')}
    ${txt(x, 182, '= 169 − 25 = 144', 'f-name', 'start')}
    ${txt(x, 204, 'a = √144 = 12', 'f-lab2', 'start')}
    ${txt(14, 228, 'adding gives √194 ≈ 13.9 — longer than the hypotenuse: impossible', 'f-lab3', 'start')}`); },

  pythagConverseTest: () => {
    const cases = [['acute', [6, 7, 8], '36 + 49 = 85', '85 > 64'], ['right', [9, 12, 15], '81 + 144 = 225', '225 = 15²'],
      ['obtuse', [4, 5, 8], '16 + 25 = 41', '41 < 64']];
    return S('0 0 480 236', `<title>Three triangles tested with the converse: a² + b² greater than, equal to, or less than c² means acute, right or obtuse</title>
    ${cases.map(([name, [a, b, c], l1, l2], i) => { const px = 10 + i * 156, s = 120 / c, L = [px + 14, 150], Rb = [px + 134, 150],
        xo = (c * c + b * b - a * a) / (2 * c), T = [L[0] + xo * s, 150 - Math.sqrt(b * b - xo * xo) * s];
      const mark = i === 0 ? ang(T, L, Rb, 16, 'f-angarc') : i === 1 ? right(T, L, Rb, 10) : ang(T, L, Rb, 14, 'f-angarc2');
      return panel(px, 8, 148, 220, name, 'sides ' + a + ', ' + b + ', ' + c) + poly([L, Rb, T], 'f-soft')
        + seg(L, T, 'f-edge') + seg(Rb, T, 'f-edge') + seg(L, Rb, 'f-hi2') + mark
        + lab(side(L, T, 9, Rb), b, 'f-lab') + lab(side(Rb, T, 9, L), a, 'f-lab') + amb((L[0] + Rb[0]) / 2, 168, 'c = ' + c)
        + txt(px + 74, 192, l1, 'f-lab') + txt(px + 74, 212, l2 + (i === 0 ? ' → acute' : i === 1 ? ' → right' : ' → obtuse'), 'f-name'); }).join('')}`); },

  /* ---- right-triangle trigonometry ---- */

  oppAdjSwap: () => { const pane = (px, top) => { const L = [px + 26, 176], R = [px + 150, 176], T = [px + 150, 88],
        V = top ? T : L, W1 = top ? L : R, W2 = top ? R : T, opp = top ? [L, R] : [R, T], adj = top ? [R, T] : [L, R],
        hd = Math.atan2(T[1] - L[1], T[0] - L[0]) * 180 / Math.PI, hp = side(L, T, 9, R);
      return panel(px, 8, 224, 212, top ? 'from the other acute angle' : 'from θ', top ? 'the same triangle, the angle moved' : 'the marked angle decides the names')
        + wedge(V, W1, W2, 28, 'f-soft') + poly([L, R, T], 'f-edge') + seg(opp[0], opp[1], 'f-line') + seg(adj[0], adj[1], 'f-hi2')
        + ang(V, W1, W2, 28, 'f-angarc') + right(R, L, T, 10) + (top ? '' : (p => txt(p[0], p[1] + 4, 'θ', 'f-lab2'))(angAt(L, R, T, 42)))
        + rot([hp[0], hp[1] - 4], hd, 'hypotenuse', 'f-name')
        + (top ? txt((L[0] + R[0]) / 2, 194, 'opposite', 'f-lab2') + amb(R[0] + 8, (R[1] + T[1]) / 2 + 4, 'adjacent', 'start')
               : amb((L[0] + R[0]) / 2, 194, 'adjacent') + txt(R[0] + 8, (R[1] + T[1]) / 2 + 4, 'opposite', 'f-lab2', 'start')); };
    return S('0 0 480 244', `<title>Opposite, adjacent and hypotenuse named from θ, and again from the other acute angle: opposite and adjacent swap</title>
    ${pane(10, false)}${pane(246, true)}
    ${txt(14, 238, 'the hypotenuse never moves; opposite and adjacent swap with the angle', 'f-lab3', 'start')}`); },

  elevDepression: () => { const sea = 200, E = [110, 50], B = [110 + 150 / Math.tan(rad(30)), sea], F = [110, sea], H = [452, 50],
      m = mid(E, B);
    return S('0 0 480 258', `<title>A cliff and a boat: the angle of depression from the cliff top equals the angle of elevation from the boat, as alternate angles between parallel horizontals</title>
    ${txt(14, 20, 'look down from the cliff, look up from the boat — the same angle', 'f-cap', 'start')}
    <rect x="14" y="${sea}" width="452" height="24" class="f-soft"/>
    ${poly([[14, E[1]], E, F, [14, sea]], 'f-tile2')}
    ${seg([14, sea], [466, sea], 'f-edge')}
    ${seg(E, H, 'f-dash')}${txt(H[0], 42, 'horizontal', 'f-lab3', 'end')}
    ${par(E, H, 1)}${par(F, [466, sea], 1)}
    ${right(F, E, B, 10)}
    ${seg(E, B, 'f-line')}${rot([m[0] + 6, m[1] - 9], 30, 'line of sight', 'f-lab')}
    ${ang(E, H, B, 46, 'f-angarc2')}${(p => amb(p[0], p[1] + 4, '30°'))(angAt(E, H, B, 62))}
    ${txt(E[0] + 14, 40, 'angle of depression', 'f-lab2', 'start')}
    ${ang(B, F, E, 46, 'f-angarc2')}${(p => amb(p[0], p[1] + 4, '30°'))(angAt(B, F, E, 62))}
    ${txt(B[0] - 20, sea + 16, 'angle of elevation', 'f-lab2', 'end')}
    ${poly([[B[0] - 16, sea - 6], [B[0] + 22, sea - 6], [B[0] + 15, sea + 6], [B[0] - 10, sea + 6]], 'f-tile')}
    ${seg([B[0] + 4, sea - 6], [B[0] + 4, sea - 42], 'f-edge')}${poly([[B[0] + 7, sea - 40], [B[0] + 7, sea - 10], [B[0] + 28, sea - 10]], 'f-tile2')}
    ${dot(E, 'f-hub')}${dot(B, 'f-hub')}
    ${txt(E[0] - 10, 130, 'height', 'f-name', 'end')}${txt(F[0] + 50, sea + 16, 'distance', 'f-lab')}
    ${txt(14, 248, 'the two horizontals are parallel, so the angles are alternate — and equal', 'f-cap', 'start')}`); },

  /* ---- distance ---- */

  distanceLegsGrid: () => { const s = 28, gx = 40, gy = 40, O = [gx + 3 * s, gy + 3 * s], m = (x, y) => [O[0] + x * s, O[1] - y * s],
      A = m(-2, -1), B = m(3, 2), K = m(3, -1);
    return S('0 0 480 222', `<title>Points A(−2, −1) and B(3, 2) at the ends of a right triangle's slanted side, with legs Δx = 5 and Δy = 3</title>
    ${txt(14, 22, 'draw a horizontal and a vertical leg: the distance is the hypotenuse', 'f-cap', 'start')}
    ${GRID(gx, gy, 7 * s, 5 * s, s)}
    ${seg([gx - 4, O[1]], [gx + 7 * s + 6, O[1]], 'f-axis')}${seg([O[0], gy + 5 * s + 4], [O[0], gy - 6], 'f-axis')}
    ${txt(gx + 7 * s + 10, O[1] + 4, 'x', 'f-lab3', 'start')}${txt(O[0] + 7, gy - 2, 'y', 'f-lab3', 'start')}
    ${txt(O[0] - 4, O[1] + 13, '0', 'f-lab3', 'end')}
    ${poly([A, K, B], 'f-soft')}
    ${seg(A, K, 'f-hi2')}${seg(K, B, 'f-hi2')}${seg(A, B, 'f-line')}${right(K, A, B, 10)}
    ${dot(A, 'f-hub')}${dot(B, 'f-hub')}${dot(K, 'f-dot', 3)}
    ${txt(A[0] - 8, A[1] - 6, 'A(−2, −1)', 'f-name', 'end')}${txt(B[0] + 8, B[1] - 4, 'B(3, 2)', 'f-name', 'start')}
    ${txt(K[0] + 8, K[1] + 15, '(3, −1)', 'f-lab3', 'start')}
    ${amb((A[0] + K[0]) / 2, A[1] + 17, 'Δx = 5')}${amb(K[0] + 8, (K[1] + B[1]) / 2 + 4, 'Δy = 3', 'start')}
    ${lab(side(A, B, 11, K), 'd', 'f-lab2')}
    ${txt(282, 64, 'Δx = x₂ − x₁ = 3 − (−2) = 5', 'f-lab', 'start')}
    ${txt(282, 84, 'Δy = y₂ − y₁ = 2 − (−1) = 3', 'f-lab', 'start')}
    ${txt(282, 116, 'd² = Δx² + Δy²', 'f-name', 'start')}
    ${txt(282, 136, 'd² = 5² + 3² = 34', 'f-name', 'start')}
    ${txt(282, 164, 'd = √34 ≈ 5.83', 'f-lab2', 'start')}
    ${txt(282, 196, 'the corner (3, −1) takes its', 'f-lab3', 'start')}${txt(282, 212, 'x from B and its y from A', 'f-lab3', 'start')}`); },

  /* ---- laws of sines and cosines ---- */

  lawSinesPair: () => { const pane = (px, aas) => { const T = tri(px), mBC = mid(T.B, T.C);
      return panel(px, 8, 224, 238, aas ? 'two angles + a side' : 'two sides + an angle', aas ? 'given A, B and a — find b' : 'given a, b and A — find B')
        + poly([T.A, T.B, T.C], 'f-soft') + wedge(T.A, T.B, T.C, 30, 'f-soft')
        + seg(T.A, T.B, 'f-dim') + seg(T.B, T.C, 'f-line') + seg(T.A, T.C, aas ? 'f-hi2' : 'f-edge')
        + seg(along(T.A, mBC, 34), along(mBC, T.A, 10), 'f-compass')
        + ang(T.A, T.B, T.C, 30, 'f-angarc') + (aas ? ang(T.B, T.A, T.C, 24, 'f-angarc3') : ang(T.B, T.A, T.C, 24, 'f-angarc2'))
        + vlabels(T)
        + lab(side(T.B, T.C, 11, T.A), 'a', 'f-lab2')
        + (aas ? (p => amb(p[0], p[1], 'b = ?'))(side(T.A, T.C, 13, T.B)) : lab(side(T.A, T.C, 11, T.B), 'b', 'f-name'))
        + txt((T.A[0] + T.B[0]) / 2, T.A[1] + 14, 'c', 'f-lab3')
        + (aas ? '' : (p => amb(p[0], p[1] + 4, '?'))(angAt(T.B, T.A, T.C, 38)))
        + txt(px + 112, 214, 'a / sin A = b / sin B', 'f-cap')
        + txt(px + 112, 232, aas ? 'any side will do with two angles' : 'A is not between a and b', 'f-lab3'); };
    return S('0 0 480 272', `<title>The law of sines: in both cases side a and the angle A facing it are known as a pair</title>
    ${pane(10, true)}${pane(246, false)}
    ${txt(14, 266, 'blue: a side and the angle facing it — one complete pair unlocks the rest', 'f-lab3', 'start')}`); },

  lawCosinesNoPair: () => { const pane = (px, sas) => { const T = tri(px);
      return panel(px, 8, 224, 228, sas ? 'two sides + the angle between' : 'three sides', sas ? 'given a, b and C — find c' : 'given a, b and c — find C')
        + poly([T.A, T.B, T.C], 'f-soft') + wedge(T.C, T.A, T.B, 26, sas ? 'f-soft' : 'f-soft2')
        + seg(T.B, T.C, 'f-line') + seg(T.A, T.C, 'f-line') + seg(T.A, T.B, sas ? 'f-hi2' : 'f-line')
        + ang(T.C, T.A, T.B, 26, sas ? 'f-angarc' : 'f-angarc2')
        + vlabels(T)
        + lab(side(T.B, T.C, 11, T.A), 'a', 'f-lab2') + lab(side(T.A, T.C, 11, T.B), 'b', 'f-lab2')
        + (sas ? amb((T.A[0] + T.B[0]) / 2, T.A[1] + 16, 'c = ?') : txt((T.A[0] + T.B[0]) / 2, T.A[1] + 16, 'c', 'f-lab2'))
        + (sas ? '' : (p => amb(p[0], p[1] + 4, '?'))(angAt(T.C, T.A, T.B, 40)))
        + (sas ? txt(px + 112, 214, 'c² = a² + b² − 2ab cos C', 'f-cap')
               : txt(px + 112, 214, 'cos C = (a² + b² − c²) ÷ 2ab', 'f-cap')); };
    return S('0 0 480 262', `<title>The law of cosines: two sides and the angle between them, or all three sides — no side comes with the angle facing it</title>
    ${pane(10, true)}${pane(246, false)}
    ${txt(14, 256, 'no side comes with its own angle; at C = 90° the last term is 0 and it is Pythagoras', 'f-lab3', 'start')}`); },

  });
})();
