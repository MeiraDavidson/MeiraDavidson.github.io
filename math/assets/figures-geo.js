/* Geometry figures for the lesson sections — the pictures that ARE the concept: a midpoint,
   a bisector, the angle pairs on parallel lines, the congruence tests. Same rules as
   figures.js: legible at rest, colours from the theme, labels in the figure's own words.
   Helpers live on window.GEO so the other figure files can share them. */
(function () {
  const { S, TK, ARR, GRID } = window.FIG;
  const f1 = n => (+n).toFixed(1);
  const P = pts => pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ');
  const poly = (pts, cls) => `<polygon points="${P(pts)}" class="${cls || 'f-edge'}"/>`;
  const pl = (pts, cls) => `<polyline points="${P(pts)}" class="${cls || 'f-edge'}"/>`;
  const seg = (A, B, cls) => `<line x1="${f1(A[0])}" y1="${f1(A[1])}" x2="${f1(B[0])}" y2="${f1(B[1])}" class="${cls || 'f-edge'}"/>`;
  const txt = (x, y, s, cls, anchor) => `<text x="${f1(x)}" y="${f1(y)}" class="${cls || 'f-lab'}" text-anchor="${anchor || 'middle'}">${s}</text>`;
  const dot = (p, cls, r) => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${r || 3.6}" class="${cls || 'f-hub'}"/>`;
  const unit = (A, V) => { const dx = A[0] - V[0], dy = A[1] - V[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
  const along = (V, A, d) => { const u = unit(A, V); return [V[0] + u[0] * d, V[1] + u[1] * d]; };
  const mid = (A, B) => [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const turn = (V, A, B) => { const a1 = Math.atan2(A[1] - V[1], A[0] - V[0]); let d = Math.atan2(B[1] - V[1], B[0] - V[0]) - a1;
    while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI; return [a1, d]; };
  /** The angle at V between rays to A and B (the smaller one), as n concentric arcs. */
  const ang = (V, A, B, r, cls, n) => { const [a1, d] = turn(V, A, B); let o = '';
    for (let k = 0; k < (n || 1); k++) { const rr = r + k * 4;
      o += `<path d="M${f1(V[0] + rr * Math.cos(a1))} ${f1(V[1] + rr * Math.sin(a1))} A${rr} ${rr} 0 0 ${d > 0 ? 1 : 0} ${f1(V[0] + rr * Math.cos(a1 + d))} ${f1(V[1] + rr * Math.sin(a1 + d))}" class="${cls || 'f-angarc'}"/>`; }
    return o; };
  /** A point inside the angle at V, on its bisector, r from V — where an angle's label goes. */
  const angAt = (V, A, B, r) => { const [a1, d] = turn(V, A, B), m = a1 + d / 2; return [V[0] + r * Math.cos(m), V[1] + r * Math.sin(m)]; };
  /** A filled wedge for the angle at V — for when the angle itself is the thing to see. */
  const wedge = (V, A, B, r, cls) => { const [a1, d] = turn(V, A, B);
    return `<path d="M${f1(V[0])} ${f1(V[1])} L${f1(V[0] + r * Math.cos(a1))} ${f1(V[1] + r * Math.sin(a1))} A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${f1(V[0] + r * Math.cos(a1 + d))} ${f1(V[1] + r * Math.sin(a1 + d))} Z" class="${cls || 'f-soft'}"/>`; };
  /** The square corner of a right angle at V. */
  const right = (V, A, B, s) => { s = s || 10; const u = unit(A, V), w = unit(B, V);
    return pl([[V[0] + u[0] * s, V[1] + u[1] * s], [V[0] + (u[0] + w[0]) * s, V[1] + (u[1] + w[1]) * s], [V[0] + w[0] * s, V[1] + w[1] * s]], 'f-sq'); };
  /** A small stroke across an angle's arc — the mark for "these angles are equal". */
  const angTick = (V, A, B, r, cls) => seg(angAt(V, A, B, r - 5), angAt(V, A, B, r + 5), cls || 'f-tk');
  /** n tick marks across the middle of AB — equal ticks, equal lengths. */
  const ticks = (A, B, n, cls) => TK(A[0], A[1], B[0], B[1], n || 1, cls || 'f-tk');
  /** Arrowheads on both ends: a line goes on for ever. One end only: a ray. */
  const head = (A, B, cls) => { const u = unit(B, A), h = 8, x = B[0], y = B[1], px = -u[1], py = u[0];
    return `<path d="M${f1(x)} ${f1(y)} L${f1(x - u[0] * h * 1.6 + px * h * .7)} ${f1(y - u[1] * h * 1.6 + py * h * .7)} L${f1(x - u[0] * h * 1.6 - px * h * .7)} ${f1(y - u[1] * h * 1.6 - py * h * .7)} Z" class="${cls || 'f-arrowhead'}"/>`; };
  const lineThru = (A, B, cls, ext) => { const a = along(A, B, -(ext || 0)), b = along(B, A, -(ext || 0));
    return seg(a, b, cls) + head(b, a, cls === 'f-line' ? 'f-headhi' : '') + head(a, b, cls === 'f-line' ? 'f-headhi' : ''); };
  const ray = (A, B, cls) => seg(A, B, cls) + head(A, B, cls === 'f-line' ? 'f-headhi' : '');
  /** Parallel-line marks: little chevrons at the middle of AB. */
  const par = (A, B, n) => { const u = unit(B, A), m = mid(A, B), px = -u[1], py = u[0]; let o = '';
    for (let k = 0; k < (n || 1); k++) { const c = [m[0] + u[0] * (k * 10 - ((n || 1) - 1) * 5), m[1] + u[1] * (k * 10 - ((n || 1) - 1) * 5)];
      o += pl([[c[0] - u[0] * 6 + px * 5, c[1] - u[1] * 6 + py * 5], c, [c[0] - u[0] * 6 - px * 5, c[1] - u[1] * 6 - py * 5]], 'f-tk'); }
    return o; };
  /** A compass mark: an arc of the circle about C through radius r, from angle a0 to a1 (degrees). */
  const arcmark = (C, r, a0, a1, cls) => { const s = a0 * Math.PI / 180, e = a1 * Math.PI / 180;
    return `<path d="M${f1(C[0] + r * Math.cos(s))} ${f1(C[1] + r * Math.sin(s))} A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 1 : 0} ${f1(C[0] + r * Math.cos(e))} ${f1(C[1] + r * Math.sin(e))}" class="${cls || 'f-compass'}"/>`; };
  /** A titled panel, for figures that compare several cases side by side. */
  const panel = (x, y, w, h, title, sub) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="f-panel"/>`
    + txt(x + 12, y + 20, title, 'f-title', 'start') + (sub ? txt(x + 12, y + 36, sub, 'f-lab3', 'start') : '');

  window.GEO = { S, TK, ARR, GRID, f1, P, poly, pl, seg, txt, dot, unit, along, mid, ang, angAt, angTick, wedge, right, ticks,
                 head, lineThru, ray, par, arcmark, panel };
  const G = window.GEO;

  const T = (x, y, s, cls, a) => G.txt(x, y, s, cls, a);
  const lerp = (A, B, t) => [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
  const at = (V, deg, r) => [V[0] + r * Math.cos(deg * Math.PI / 180), V[1] - r * Math.sin(deg * Math.PI / 180)];

  Object.assign(window.FIGURES, {
  /* ---------- Definitions, postulates & reasoning ---------- */
  geoUndefined: () => { const w = 150, xs = [4, 165, 326];
    const A1 = [xs[1] + 32, 132], B1 = [xs[1] + 118, 86];
    return G.S('0 0 480 182', `<title>Point, line and plane — the three undefined terms</title>
    ${G.panel(xs[0], 4, w, 174, 'Point', 'a location, no size')}
    ${G.dot([xs[0] + 75, 110], 'f-dot', 4.5)}${T(xs[0] + 86, 106, 'A', 'f-name', 'start')}
    ${G.panel(xs[1], 4, w, 174, 'Line', 'endless both ways')}
    ${G.lineThru(A1, B1, 'f-line', 16)}${G.dot(A1)}${G.dot(B1)}
    ${T(A1[0] + 4, A1[1] + 18, 'A', 'f-name', 'start')}${T(B1[0] + 4, B1[1] + 18, 'B', 'f-name', 'start')}
    ${G.panel(xs[2], 4, w, 174, 'Plane', 'flat, endless every way')}
    ${G.poly([[xs[2] + 14, 152], [xs[2] + 100, 152], [xs[2] + 138, 76], [xs[2] + 52, 76]], 'f-tile')}
    ${T(xs[2] + 34, 142, 'P', 'f-name')}${G.dot([xs[2] + 84, 116], 'f-dot')}`); },

  geoNotation: () => { const A = [56, 0], B = [176, 0], rows = [44, 98, 152, 206];
    const tip = (P, dir) => `<path d="M${P[0]} ${P[1]} l${-5 * dir} -3 l0 6 Z" class="f-symb"/>`;
    const sym = (y, kind) => { const x = 262, a = [x - 10, y - 15], b = [x + 10, y - 15];
      return T(x, y, 'AB', 'f-name') + (kind === 'seg' ? G.seg(a, b, 'f-symb')
        : kind === 'ray' ? G.seg(a, b, 'f-symb') + tip(b, 1)
        : kind === 'line' ? G.seg(a, b, 'f-symb') + tip(b, 1) + tip(a, -1) : ''); };
    const r = (y, k) => [[A[0], y], [B[0], y]];
    return G.S('0 0 480 236', `<title>Segment, ray, line and length — four different things, four notations</title>
    ${rows.map(y => G.seg([24, y + 22], [460, y + 22], 'f-rule')).slice(0, 3).join('')}
    ${G.seg([A[0], rows[0]], [B[0], rows[0]], 'f-line')}${G.dot([A[0], rows[0]])}${G.dot([B[0], rows[0]])}
    ${sym(rows[0] + 4, 'seg')}${T(292, rows[0] + 4, 'segment: stops at both ends', 'f-lab', 'start')}
    ${G.ray([A[0], rows[1]], [B[0] + 50, rows[1]], 'f-line')}${G.dot([A[0], rows[1]])}${G.dot([B[0], rows[1]])}
    ${sym(rows[1] + 4, 'ray')}${T(292, rows[1] + 4, 'ray: starts at A, never stops', 'f-lab', 'start')}
    ${G.lineThru([A[0], rows[2]], [B[0], rows[2]], 'f-line', 30)}${G.dot([A[0], rows[2]])}${G.dot([B[0], rows[2]])}
    ${sym(rows[2] + 4, 'line')}${T(292, rows[2] + 4, 'line: endless both ways', 'f-lab', 'start')}
    ${G.seg([A[0], rows[3]], [B[0], rows[3]], 'f-edge')}${G.dot([A[0], rows[3]], 'f-dot')}${G.dot([B[0], rows[3]], 'f-dot')}
    ${G.seg([A[0], rows[3] + 12], [B[0], rows[3] + 12], 'f-dim')}${G.seg([A[0], rows[3] + 7], [A[0], rows[3] + 17], 'f-dim')}${G.seg([B[0], rows[3] + 7], [B[0], rows[3] + 17], 'f-dim')}
    ${T(116, rows[3] + 26, '5 cm', 'f-lab2')}
    ${sym(rows[3] + 4, 'len')}${T(292, rows[3] + 4, 'length: a number, AB = 5', 'f-lab', 'start')}
    ${rows.map(y => T(A[0], y - 9, 'A', 'f-lab') + T(B[0], y - 9, 'B', 'f-lab')).join('')}`); },

  geoSegmentAdd: () => { const y = 112, u = 22, A = [28, y], B = [28 + 3 * u, y], C = [28 + 8 * u, y];
    const dim = (P, Q, yy, s) => G.seg([P[0], yy], [Q[0], yy], 'f-dim') + G.seg([P[0], yy - 5], [P[0], yy + 5], 'f-dim')
      + G.seg([Q[0], yy - 5], [Q[0], yy + 5], 'f-dim') + T((P[0] + Q[0]) / 2, yy - 6, s, 'f-lab2');
    const O = [268, 168], RA = at(O, 0, 196), RB = at(O, 30, 172), RC = at(O, 75, 150);
    return G.S('0 0 480 200', `<title>Segment addition AB + BC = AC, and angle addition</title>
    ${G.seg([16, y], [222, y], 'f-edge')}${G.dot(A)}${G.dot(B)}${G.dot(C)}
    ${T(A[0], y - 12, 'A', 'f-name')}${T(B[0], y - 12, 'B', 'f-name')}${T(C[0], y - 12, 'C', 'f-name')}
    ${dim(A, B, y + 26, '3')}${dim(B, C, y + 26, '5')}${dim(A, C, y + 54, '8')}
    ${T(118, y + 82, 'AB + BC = AC', 'f-cap')}
    ${G.ray(O, RA, 'f-edge')}${G.ray(O, RB, 'f-line')}${G.ray(O, RC, 'f-edge')}
    ${G.ang(O, RA, RB, 42, 'f-angarc')}${G.ang(O, RB, RC, 42, 'f-angarc2')}${G.ang(O, RA, RC, 74, 'f-angarc3')}
    ${T(...G.angAt(O, RA, RB, 58), '30°', 'f-lab2')}${T(...G.angAt(O, RB, RC, 56), '45°', 'f-lab')}${T(...G.angAt(O, RA, RC, 92), '75°', 'f-lab3')}
    ${G.dot(O, 'f-dot')}${T(O[0] - 8, O[1] + 4, 'O', 'f-name', 'end')}
    ${T(RA[0] - 4, RA[1] + 16, 'A', 'f-name')}${T(RB[0] + 4, RB[1] - 8, 'B', 'f-name')}${T(RC[0] + 10, RC[1] + 4, 'C', 'f-name', 'start')}
    ${T(372, 194, '30° + 45° = 75°', 'f-cap')}`); },

  geoBisectors: () => { const A = [28, 132], B = [212, 132], M = [120, 132];
    const V = [268, 184], P = at(V, 0, 196), Q = at(V, 64, 168), R = at(V, 32, 190);
    return G.S('0 0 480 210', `<title>A midpoint and perpendicular bisector; an angle bisector</title>
    ${G.seg([120, 30], [120, 200], 'f-dash')}${G.right(M, B, [120, 40], 11)}
    ${G.seg(A, B, 'f-edge')}${G.ticks(A, M, 1)}${G.ticks(M, B, 1)}
    ${G.dot(A, 'f-dot')}${G.dot(B, 'f-dot')}${G.dot(M)}
    ${T(A[0], A[1] + 20, 'A', 'f-name')}${T(B[0], B[1] + 20, 'B', 'f-name')}${T(M[0] - 9, M[1] + 20, 'M', 'f-name')}
    ${T(128, 40, 'perpendicular bisector', 'f-lab3', 'start')}
    ${T(66, 168, 'AM = MB', 'f-lab2')}
    ${G.ray(V, P, 'f-edge')}${G.ray(V, Q, 'f-edge')}${G.ray(V, R, 'f-line')}
    ${G.ang(V, P, R, 46, 'f-angarc')}${G.ang(V, R, Q, 46, 'f-angarc')}${G.angTick(V, P, R, 46)}${G.angTick(V, R, Q, 46)}
    ${T(...G.angAt(V, P, R, 64), 'x', 'f-lab2')}${T(...G.angAt(V, R, Q, 64), 'x', 'f-lab2')}
    ${T(R[0] - 6, R[1] - 12, 'angle bisector', 'f-lab2', 'end')}`); },

  /* ---------- Angle relationships ---------- */
  anglePairs: () => {
    const cell = (ox, oy, title, sub, kind) => {
      const y1 = oy + 80, y2 = oy + 132, T1 = [ox + 96, oy + 50], T2 = [ox + 172, oy + 160];
      const I = y => { const t = (y - T1[1]) / (T2[1] - T1[1]); return [T1[0] + (T2[0] - T1[0]) * t, y]; };
      const I1 = I(y1), I2 = I(y2), u = G.unit(T2, T1);
      const E = (V, d) => [V[0] + d, V[1]], Wd = (V, d) => [V[0] - d, V[1]];
      const Up = (V, d) => [V[0] - u[0] * d, V[1] - u[1] * d], Dn = (V, d) => [V[0] + u[0] * d, V[1] + u[1] * d];
      let o = G.panel(ox, oy, 232, 166, title, sub);
      if (kind === 'X') {
        const X = [ox + 116, oy + 112], a = at(X, 28, 90), b = at(X, 208, 90), c = at(X, 140, 80), d = at(X, 320, 80);
        o += G.wedge(X, a, c, 30, 'f-soft') + G.wedge(X, b, d, 30, 'f-soft') + G.wedge(X, c, b, 22, 'f-soft2') + G.wedge(X, d, a, 22, 'f-soft2');
        o += G.ang(X, a, c, 30, 'f-angarc') + G.ang(X, b, d, 30, 'f-angarc');
        o += G.seg(a, b, 'f-edge') + G.seg(c, d, 'f-edge');
        o += T(...G.angAt(X, a, c, 44), 'a', 'f-lab2') + T(...G.angAt(X, b, d, 44), 'a', 'f-lab2')
          + T(...G.angAt(X, c, b, 36), 'b', 'f-lab') + T(...G.angAt(X, d, a, 36), 'b', 'f-lab');
        return o;
      }
      o += kind === 'F' ? G.pl([Up(I1, 26), Dn(I2, 10)], 'f-trace') + G.pl([I1, E(I1, 44)], 'f-trace') + G.pl([I2, E(I2, 44)], 'f-trace')
        : kind === 'Z' ? G.pl([Wd(I1, 44), I1, I2, E(I2, 44)], 'f-trace')
        : G.pl([E(I1, 44), I1, I2, E(I2, 44)], 'f-trace');
      o += G.seg([ox + 14, y1], [ox + 218, y1], 'f-edge') + G.seg([ox + 14, y2], [ox + 218, y2], 'f-edge');
      o += G.par([ox + 26, y1], [ox + 50, y1], 1) + G.par([ox + 26, y2], [ox + 50, y2], 1);
      o += G.seg(T1, T2, 'f-edge');
      const pair = kind === 'F' ? [[I1, Up(I1, 9), E(I1, 9)], [I2, Up(I2, 9), E(I2, 9)]]
        : kind === 'Z' ? [[I1, Wd(I1, 9), Dn(I1, 9)], [I2, Up(I2, 9), E(I2, 9)]]
        : [[I1, Dn(I1, 9), E(I1, 9)], [I2, Up(I2, 9), E(I2, 9)]];
      const second = kind === 'C' ? 'f-angarc2' : 'f-angarc';
      o += G.ang(pair[0][0], pair[0][1], pair[0][2], 16, 'f-angarc') + G.ang(pair[1][0], pair[1][1], pair[1][2], 16, second);
      o += T(...G.angAt(...pair[0], 28), 'a', 'f-lab2') + T(...G.angAt(...pair[1], 28), kind === 'C' ? 'b' : 'a', 'f-lab2');
      return o;
    };
    return G.S('0 0 480 340', `<title>Corresponding, alternate interior, co-interior and vertical angles</title>
    ${cell(4, 4, 'Corresponding', 'trace an F · equal', 'F')}
    ${cell(244, 4, 'Alternate interior', 'trace a Z · equal', 'Z')}
    ${cell(4, 172, 'Co-interior', 'trace a C · a + b = 180°', 'C')}
    ${cell(244, 172, 'Vertical', 'where two lines cross · a = a', 'X')}`); },

  triangleSum: () => {
    const A = [28, 218], B = [212, 218], C = [126, 98], L = [20, 98], R = [228, 98];
    const P = [262, 214], Q = [410, 214], Rr = [365.2, 91], E = [470, 214];
    return G.S('0 0 480 250', `<title>Why a triangle's angles add to 180°, and the exterior angle</title>
    ${G.panel(4, 4, 232, 242, 'Why they add to 180°', 'draw a parallel through the top')}
    ${G.seg([16, 98], [232, 98], 'f-dash')}${G.par([196, 98], [218, 98], 1)}${G.par([92, 218], [114, 218], 1)}
    ${G.poly([A, B, C], 'f-edge')}
    ${G.ang(A, B, C, 22, 'f-angarc')}${G.ang(B, A, C, 22, 'f-angarc2')}
    ${G.ang(C, L, A, 20, 'f-angarc')}${G.ang(C, A, B, 20, 'f-angarc3')}${G.ang(C, B, R, 20, 'f-angarc2')}
    ${T(...G.angAt(A, B, C, 36), 'a', 'f-lab2')}${T(...G.angAt(B, A, C, 36), 'b', 'f-lab2')}
    ${T(...G.angAt(C, L, A, 32), 'a', 'f-lab2')}${T(...G.angAt(C, A, B, 34), 'c', 'f-lab3')}${T(...G.angAt(C, B, R, 32), 'b', 'f-lab2')}
    ${T(120, 240, 'a, c and b fill a straight line: 180°', 'f-lab')}
    ${G.panel(244, 4, 232, 242, 'Exterior angle', 'equals the two it does not touch')}
    ${G.seg(Q, E, 'f-dash')}${G.poly([P, Q, Rr], 'f-edge')}
    ${G.ang(P, Q, Rr, 26, 'f-angarc')}${G.ang(Rr, P, Q, 22, 'f-angarc')}${G.ang(Q, E, Rr, 24, 'f-angarc2')}${G.ang(Q, Rr, P, 16, 'f-angarc3')}
    ${T(...G.angAt(P, Q, Rr, 44), '50°', 'f-lab2')}${T(...G.angAt(Rr, P, Q, 40), '60°', 'f-lab2')}
    ${T(...G.angAt(Q, E, Rr, 42), '110°', 'f-lab2')}${T(...G.angAt(Q, Rr, P, 30), '70°', 'f-lab3')}
    ${T(360, 240, '110° = 50° + 60°', 'f-lab')}`); },

  /* ---------- Geometric construction ---------- */
  angleFacts: () => { const xs = [4, 165, 326];
    const V1 = [xs[0] + 76, 144], r1 = at(V1, 125, 74);
    const V2 = [xs[1] + 76, 118], spokes = [15, 118, 196, 284].map(d => at(V2, d, 58));
    const V3 = [xs[2] + 76, 118], a = at(V3, 28, 70), b = at(V3, 208, 70), c = at(V3, 132, 66), d = at(V3, 312, 66);
    return G.S('0 0 480 190', `<title>Angles on a straight line, around a point, and vertical angles</title>
    ${G.panel(xs[0], 4, 152, 182, 'On a straight line', 'a + b = 180°')}
    ${G.seg([xs[0] + 12, 144], [xs[0] + 140, 144], 'f-edge')}${G.seg(V1, r1, 'f-edge')}
    ${G.ang(V1, [xs[0] + 140, 144], r1, 20, 'f-angarc')}${G.ang(V1, r1, [xs[0] + 12, 144], 26, 'f-angarc2')}
    ${T(...G.angAt(V1, [xs[0] + 140, 144], r1, 34), 'a', 'f-lab2')}${T(...G.angAt(V1, r1, [xs[0] + 12, 144], 40), 'b', 'f-lab2')}
    ${G.panel(xs[1], 4, 152, 182, 'Around a point', 'a + b + c + d = 360°')}
    ${spokes.map((s, k) => G.wedge(V2, s, spokes[(k + 1) % 4], 26, k % 2 ? 'f-soft2' : 'f-soft')).join('')}
    ${spokes.map(s => G.seg(V2, s, 'f-edge')).join('')}
    ${spokes.map((s, k) => T(...G.angAt(V2, s, spokes[(k + 1) % 4], 40), 'abcd'[k], 'f-lab2')).join('')}
    ${G.panel(xs[2], 4, 152, 182, 'Vertical angles', 'opposite ones equal')}
    ${G.wedge(V3, a, c, 28, 'f-soft')}${G.wedge(V3, b, d, 28, 'f-soft')}${G.wedge(V3, c, b, 20, 'f-soft2')}${G.wedge(V3, d, a, 20, 'f-soft2')}
    ${G.ang(V3, a, c, 28, 'f-angarc')}${G.ang(V3, b, d, 28, 'f-angarc')}
    ${G.seg(a, b, 'f-edge')}${G.seg(c, d, 'f-edge')}
    ${T(...G.angAt(V3, a, c, 40), 'x', 'f-lab2')}${T(...G.angAt(V3, b, d, 40), 'x', 'f-lab2')}
    ${T(...G.angAt(V3, c, b, 36), 'y', 'f-lab')}${T(...G.angAt(V3, d, a, 36), 'y', 'f-lab')}`); },

  constructSteps: () => {
    const p = [[4, 4], [244, 4], [4, 196], [244, 196]];
    const c1 = (() => { const [ox, oy] = p[0], A = [ox + 24, oy + 72], B = [ox + 110, oy + 72], C = [ox + 24, oy + 140], D = [ox + 110, oy + 140];
      return G.panel(ox, oy, 232, 188, 'Copy a segment', 'compass set to AB, swung from C')
        + G.seg(A, B, 'f-edge') + G.dot(A, 'f-dot') + G.dot(B, 'f-dot') + G.arcmark(A, 86, -18, 18)
        + G.ray(C, [ox + 214, oy + 140], 'f-edge') + G.arcmark(C, 86, -22, 22) + G.seg(C, D, 'f-line') + G.dot(C) + G.dot(D)
        + T(A[0], A[1] - 10, 'A', 'f-name') + T(B[0], B[1] - 10, 'B', 'f-name') + T(C[0], C[1] + 20, 'C', 'f-name') + T(D[0] + 8, D[1] + 20, 'D', 'f-name')
        + T(ox + 116, oy + 176, 'CD = AB', 'f-lab2'); })();
    const c2 = (() => { const [ox, oy] = p[1], A = [ox + 40, oy + 118], B = [ox + 192, oy + 118], M = [ox + 116, oy + 118],
        Pt = [ox + 116, oy + 118 - 48.2], Q = [ox + 116, oy + 118 + 48.2];
      return G.panel(ox, oy, 232, 188, 'Bisect a segment', 'equal arcs from both ends')
        + G.arcmark(A, 90, -46, 46) + G.arcmark(B, 90, 134, 226)
        + G.seg(A, B, 'f-edge') + G.seg([ox + 116, oy + 56], [ox + 116, oy + 180], 'f-line') + G.right(M, B, Pt, 9)
        + G.ticks(A, M, 1) + G.ticks(M, B, 1) + G.dot(A, 'f-dot') + G.dot(B, 'f-dot') + G.dot(M) + G.dot(Pt, 'f-dot', 2.6) + G.dot(Q, 'f-dot', 2.6)
        + T(A[0] - 6, A[1] + 18, 'A', 'f-name') + T(B[0] + 6, B[1] + 18, 'B', 'f-name') + T(M[0] - 9, M[1] + 18, 'M', 'f-name', 'end'); })();
    const c3 = (() => { const [ox, oy] = p[2], V = [ox + 26, oy + 166], R1 = [ox + 216, oy + 166], R2 = at(V, 55, 142),
        X1 = [V[0] + 70, V[1]], X2 = at(V, 55, 70), W = at(V, 27.5, 112.6), Bt = at(V, 27.5, 192);
      return G.panel(ox, oy, 232, 188, 'Bisect an angle', 'arc from the vertex, then equal arcs')
        + G.seg(V, R1, 'f-edge') + G.seg(V, R2, 'f-edge') + G.arcmark(V, 70, -62, 6)
        + G.arcmark(X1, 60, -74, -46) + G.arcmark(X2, 60, -10, 20)
        + G.ray(V, Bt, 'f-line') + G.dot(X1, 'f-dot', 2.6) + G.dot(X2, 'f-dot', 2.6) + G.dot(W, 'f-dot', 2.6)
        + G.ang(V, R1, W, 34, 'f-angarc') + G.ang(V, W, R2, 34, 'f-angarc') + G.angTick(V, R1, W, 34) + G.angTick(V, W, R2, 34); })();
    const c4 = (() => { const [ox, oy] = p[3], Pt = [ox + 116, oy + 150], X1 = [ox + 66, oy + 150], X2 = [ox + 166, oy + 150], Tp = [ox + 116, oy + 150 - 62.4];
      return G.panel(ox, oy, 232, 188, 'Perpendicular at a point', 'equal steps either side, then arcs')
        + G.seg([ox + 14, oy + 150], [ox + 218, oy + 150], 'f-edge') + G.arcmark(Pt, 50, 165, 195) + G.arcmark(Pt, 50, -15, 15)
        + G.arcmark(X1, 80, -66, -36) + G.arcmark(X2, 80, -144, -114)
        + G.seg([ox + 116, oy + 56], [ox + 116, oy + 180], 'f-line') + G.right(Pt, X2, Tp, 9)
        + G.ticks(X1, Pt, 1) + G.ticks(Pt, X2, 1) + G.dot(X1, 'f-dot', 2.6) + G.dot(X2, 'f-dot', 2.6) + G.dot(Tp, 'f-dot', 2.6) + G.dot(Pt)
        + T(Pt[0] + 9, Pt[1] + 18, 'P', 'f-name', 'start'); })();
    return G.S('0 0 480 388', `<title>Four compass-and-straightedge constructions</title>${c1}${c2}${c3}${c4}`); },

  /* ---------- Triangle congruence ---------- */
  congruenceTests: () => {
    const cell = (ox, oy, title, sub, k) => { const A = [ox + 34, oy + 140], B = [ox + 200, oy + 140], C = [ox + 124, oy + 60];
      const side = (P, Q, on, n) => on ? G.seg(P, Q, 'f-line') + G.ticks(P, Q, n) : G.seg(P, Q, 'f-edge');
      let o = G.panel(ox, oy, 232, 160, title, sub);
      if (k === 'SSS') o += side(A, B, 1, 1) + side(B, C, 1, 2) + side(C, A, 1, 3);
      if (k === 'SAS') o += side(A, B, 1, 1) + side(C, A, 1, 2) + side(B, C, 0) + G.ang(A, B, C, 24, 'f-angarc');
      if (k === 'ASA') o += side(A, B, 1, 1) + side(C, A, 0) + side(B, C, 0) + G.ang(A, B, C, 24, 'f-angarc') + G.ang(B, A, C, 22, 'f-angarc', 2);
      if (k === 'AAS') o += side(B, C, 1, 1) + side(A, B, 0) + side(C, A, 0) + G.ang(A, B, C, 24, 'f-angarc') + G.ang(B, A, C, 22, 'f-angarc', 2);
      return o; };
    return G.S('0 0 480 352', `<title>The four triangle congruence tests: SSS, SAS, ASA, AAS</title>
    ${cell(4, 4, 'SSS', 'three sides', 'SSS')}${cell(244, 4, 'SAS', 'two sides and the angle between', 'SAS')}
    ${cell(4, 170, 'ASA', 'two angles and the side between', 'ASA')}${cell(244, 170, 'AAS', 'two angles and a side not between', 'AAS')}
    ${T(240, 346, 'Right triangles have a fifth: HL — the hypotenuse and one leg.', 'f-lab3')}`); },

  congruenceFails: () => {
    const ox = 4, A = [ox + 22, 204], B = [ox + 144.9, 118], C1 = [ox + 93.9, 204], C2 = [ox + 195.9, 204];
    const qx = 244, s1 = [[qx + 20, 200], [qx + 90, 200], [qx + 62, 150]], s2 = [[qx + 106, 200], [qx + 218, 200], [qx + 173.2, 120]];
    const marks = t => G.ang(t[0], t[1], t[2], 16, 'f-angarc') + G.ang(t[1], t[0], t[2], 16, 'f-angarc', 2) + G.ang(t[2], t[0], t[1], 14, 'f-angarc2');
    return G.S('0 0 480 230', `<title>SSA and AAA do not prove triangles congruent</title>
    ${G.panel(4, 4, 232, 222, 'SSA — not enough', 'the last side can land in two places')}
    ${G.seg(A, [ox + 222, 204], 'f-edge')}${G.seg(A, B, 'f-line')}${G.ticks(A, B, 1)}${G.ang(A, [ox + 222, 204], B, 26, 'f-angarc')}
    ${G.arcmark(B, 100, 52, 128)}${G.seg(B, C1, 'f-hi2')}${G.seg(B, C2, 'f-hi2')}${G.ticks(B, C1, 2, 'f-tk2')}${G.ticks(B, C2, 2, 'f-tk2')}
    ${G.dot(A, 'f-dot')}${G.dot(B, 'f-dot')}${G.dot(C1)}${G.dot(C2)}
    ${T(A[0], A[1] + 18, 'A', 'f-name')}${T(B[0], B[1] - 10, 'B', 'f-name')}${T(C1[0], C1[1] + 18, 'C', 'f-name')}${T(C2[0], C2[1] + 18, 'C′', 'f-name')}
    ${G.panel(244, 4, 232, 222, 'AAA — not enough', 'same angles, different sizes')}
    ${G.poly(s1, 'f-tile')}${G.poly(s2, 'f-tile')}${marks(s1)}${marks(s2)}`); },

  isoscelesBase: () => { const Tp = [200, 30], L = [110, 200], R = [290, 200], M = [200, 200];
    return G.S('0 0 480 230', `<title>An isosceles triangle: equal legs, equal base angles</title>
    ${G.seg(Tp, M, 'f-dash')}${G.right(M, R, Tp, 10)}
    ${G.seg(Tp, L, 'f-line')}${G.seg(Tp, R, 'f-line')}${G.seg(L, R, 'f-edge')}
    ${G.ticks(Tp, L, 1)}${G.ticks(Tp, R, 1)}${G.ticks(L, M, 2, 'f-tk2')}${G.ticks(M, R, 2, 'f-tk2')}
    ${G.ang(L, R, Tp, 26, 'f-angarc2')}${G.ang(R, L, Tp, 26, 'f-angarc2')}${G.ang(Tp, L, M, 30, 'f-angarc3')}${G.ang(Tp, M, R, 34, 'f-angarc3')}
    ${T(318, 70, 'Two equal legs', 'f-name', 'start')}${T(318, 86, 'are given…', 'f-lab3', 'start')}
    ${T(318, 128, '…so the base angles', 'f-name', 'start')}${T(318, 144, 'opposite them are equal', 'f-lab3', 'start')}
    ${T(318, 186, 'The apex bisector meets', 'f-name', 'start')}${T(318, 202, 'the base at its midpoint, at 90°', 'f-lab3', 'start')}`); },

  sharedSide: () => { const ox = 4, A = [ox + 30, 138], B = [ox + 116, 76], C = [ox + 202, 138], D = [ox + 116, 198];
    const qx = 244, P1 = [qx + 28, 68], P2 = [qx + 204, 192], Q1 = [qx + 28, 192], Q2 = [qx + 204, 68], X = [qx + 116, 130];
    return G.S('0 0 480 210', `<title>Free third parts: a shared side, and vertical angles</title>
    ${G.panel(4, 4, 232, 202, 'A shared side', 'equal to itself — reflexive')}
    ${G.poly([A, B, D], 'f-soft')}${G.poly([C, B, D], 'f-soft2')}${G.poly([A, B, C, D], 'f-edge')}
    ${G.seg(B, D, 'f-line')}${G.ticks(B, D, 1)}
    ${T(B[0], B[1] - 8, 'B', 'f-name')}${T(D[0] + 10, D[1] - 2, 'D', 'f-name', 'start')}
    ${T(B[0] + 16, (B[1] + D[1]) / 2 + 4, 'BD = BD', 'f-lab2', 'start')}
    ${G.panel(244, 4, 232, 202, 'Vertical angles', 'free equal angles where lines cross')}
    ${G.poly([P1, Q1, X], 'f-soft')}${G.poly([Q2, P2, X], 'f-soft2')}
    ${G.seg(P1, P2, 'f-edge')}${G.seg(Q1, Q2, 'f-edge')}${G.seg(P1, Q1, 'f-edge')}${G.seg(Q2, P2, 'f-edge')}
    ${G.ang(X, P1, Q1, 18, 'f-angarc')}${G.ang(X, Q2, P2, 18, 'f-angarc')}`); },

  /* ---------- Quadrilaterals & polygons ---------- */
  polygonSum: () => { const c = [125, 124], v = [180, 120, 60, 0, -60, -120].map(d => at(c, d, 100));
    const tris = [[v[0], v[1], v[2]], [v[0], v[2], v[3]], [v[0], v[3], v[4]], [v[0], v[4], v[5]]];
    const cen = t => [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3 + 4];
    const rows = [[3, 1, '180°'], [4, 2, '360°'], [5, 3, '540°'], [6, 4, '720°'], ['n', 'n − 2', '(n − 2) × 180°']];
    return G.S('0 0 480 248', `<title>A hexagon splits into four triangles from one vertex: 720°</title>
    ${tris.map((t, k) => G.poly(t, k % 2 ? 'f-soft2' : 'f-soft')).join('')}
    ${G.poly(v, 'f-edge')}${[2, 3, 4].map(k => G.seg(v[0], v[k], 'f-dash')).join('')}
    ${tris.map((t, k) => T(...cen(t), k + 1, 'f-lab2')).join('')}${G.dot(v[0])}
    ${T(125, 242, '6 sides → 4 triangles → 4 × 180° = 720°', 'f-lab')}
    ${T(268, 40, 'sides', 'f-lab3')}${T(336, 40, 'triangles', 'f-lab3')}${T(420, 40, 'angle sum', 'f-lab3')}
    ${G.seg([244, 48], [472, 48], 'f-rule')}
    ${rows.map((r, k) => { const y = 72 + k * 30, cls = k === 4 ? 'f-lab2' : 'f-lab';
      return T(268, y, r[0], cls) + T(336, y, r[1], cls) + T(420, y, r[2], cls); }).join('')}`); },

  parallelogramProps: () => { const A = [20, 204], B = [210, 204], C = [282, 66], D = [92, 66], O = G.mid(A, C);
    const side = (P, Q, n) => G.par(P, lerp(P, Q, .44), n) + G.ticks(lerp(P, Q, .56), Q, n);
    const note = (y, h, d) => T(318, y, h, 'f-name', 'start') + T(318, y + 16, d, 'f-lab3', 'start');
    return G.S('0 0 480 236', `<title>A parallelogram: equal opposite sides and angles; diagonals bisect each other</title>
    ${G.seg(A, C, 'f-dash')}${G.seg(B, D, 'f-dash')}
    ${G.poly([A, B, C, D], 'f-edge')}${side(A, B, 1)}${side(D, C, 1)}${side(A, D, 2)}${side(B, C, 2)}
    ${G.ang(A, B, D, 22, 'f-angarc')}${G.ang(C, D, B, 22, 'f-angarc')}${G.ang(B, C, A, 18, 'f-angarc2', 2)}${G.ang(D, A, C, 18, 'f-angarc2', 2)}
    ${G.ticks(A, O, 1, 'f-tk2')}${G.ticks(O, C, 1, 'f-tk2')}${G.ticks(B, O, 2, 'f-tk2')}${G.ticks(O, D, 2, 'f-tk2')}${G.dot(O)}
    ${note(44, 'Opposite sides', 'equal and parallel')}${note(92, 'Opposite angles', 'equal')}
    ${note(140, 'Next-door angles', 'add to 180°')}${note(188, 'Diagonals', 'cut each other in half')}`); },

  quadDiagonals: () => { const xs = [4, 165, 326];
    const rect = (ox) => { const a = [ox + 18, 74], b = [ox + 134, 74], c = [ox + 134, 166], d = [ox + 18, 166], o = G.mid(a, c);
      return G.poly([a, b, c, d], 'f-edge') + G.right(d, a, c, 9) + G.seg(a, c, 'f-line') + G.seg(b, d, 'f-line')
        + [a, b, c, d].map(p => G.ticks(p, o, 1)).join('') + G.dot(o); };
    const rh = (ox) => { const o = [ox + 76, 120], a = [ox + 16, 120], b = [ox + 76, 80], c = [ox + 136, 120], d = [ox + 76, 160];
      return G.poly([a, b, c, d], 'f-edge') + [[a, b], [b, c], [c, d], [d, a]].map(s => G.ticks(s[0], s[1], 1, 'f-tk2')).join('')
        + G.seg(a, c, 'f-line') + G.seg(b, d, 'f-line') + G.right(o, c, b, 9) + G.dot(o); };
    const sq = (ox) => { const a = [ox + 30, 74], b = [ox + 122, 74], c = [ox + 122, 166], d = [ox + 30, 166], o = G.mid(a, c);
      return G.poly([a, b, c, d], 'f-edge') + [[a, b], [b, c], [c, d], [d, a]].map(s => G.ticks(s[0], s[1], 1, 'f-tk2')).join('')
        + G.seg(a, c, 'f-line') + G.seg(b, d, 'f-line') + G.right(o, c, b, 9) + [a, b, c, d].map(p => G.ticks(p, o, 1)).join('') + G.dot(o); };
    return G.S('0 0 480 200', `<title>Diagonals of a rectangle, a rhombus and a square</title>
    ${G.panel(xs[0], 4, 152, 192, 'Rectangle', 'diagonals equal')}${rect(xs[0])}
    ${G.panel(xs[1], 4, 152, 192, 'Rhombus', 'diagonals at right angles')}${rh(xs[1])}
    ${G.panel(xs[2], 4, 152, 192, 'Square', 'equal and at right angles')}${sq(xs[2])}`); },

  trapezoidProps: () => { const A = [30, 196], B = [290, 196], C = [220, 76], D = [100, 76], M1 = G.mid(A, D), M2 = G.mid(B, C);
    return G.S('0 0 480 236', `<title>An isosceles trapezoid and its midsegment, the average of the bases</title>
    ${G.poly([A, B, C, D], 'f-edge')}${G.par(lerp(A, B, .7), lerp(A, B, .8), 1)}${G.par(lerp(D, C, .62), lerp(D, C, .82), 1)}
    ${G.ticks(A, M1, 1, 'f-tk2')}${G.ticks(B, M2, 1, 'f-tk2')}
    ${G.ang(A, B, D, 22, 'f-angarc')}${G.ang(B, A, C, 22, 'f-angarc')}${G.ang(D, A, C, 18, 'f-angarc2', 2)}${G.ang(C, D, B, 18, 'f-angarc2', 2)}
    ${G.seg(M1, M2, 'f-line')}${G.dot(M1)}${G.dot(M2)}
    ${T(160, 68, 'b₂ = 6', 'f-lab')}${T(160, 216, 'b₁ = 13', 'f-lab')}
    ${T(160, 156, '(13 + 6) ÷ 2 = 9.5', 'f-lab2')}${T(M2[0] + 12, M2[1] + 4, 'midsegment', 'f-lab2', 'start')}
    ${T(330, 52, 'Isosceles trapezoid', 'f-name', 'start')}${T(330, 70, 'equal legs, so', 'f-lab3', 'start')}
    ${T(330, 86, 'equal base angles', 'f-lab3', 'start')}${T(330, 102, 'and equal diagonals', 'f-lab3', 'start')}`); }
  });
})();
