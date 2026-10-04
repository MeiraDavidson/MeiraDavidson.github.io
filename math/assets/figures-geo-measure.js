/* Measurement figures for the lesson sections — area, surface area, volume and cross sections.
   Each one shows where a formula comes from rather than restating it: the triangle that is half
   a rectangle, the two trapezoids that make a parallelogram, the net that folds into the box,
   the cone that fits three times into its cylinder. Every number on a drawing is the number in
   the lesson, and the drawing is to scale with it. Solids share one camera (a fixed orthographic
   view from slightly above and to the left), so circles are true ellipses and boxes, pyramids and
   cylinders in one figure agree with each other. */
(function () {
  const G = window.GEO;
  const { S, ARR, f1, P, poly, seg, txt, dot, mid, right, head, along, panel } = G;

  /* ---- 2-D helpers ---- */
  /** A dimension line along AB, pushed `off` px to the right of A→B (below a left-to-right line),
      with end stops and a label beyond it. */
  const dimLine = (A, B, lab, off, cls, gap) => {
    const u = G.unit(B, A), n = [-u[1], u[0]], o = off || 0, a = [A[0] + n[0] * o, A[1] + n[1] * o], b = [B[0] + n[0] * o, B[1] + n[1] * o];
    const stop = q => seg([q[0] + n[0] * 4, q[1] + n[1] * 4], [q[0] - n[0] * 4, q[1] - n[1] * 4], 'f-dim');
    return seg(a, b, 'f-dim') + stop(a) + stop(b) + (lab ? edgeLab(a, b, lab, gap || (Math.abs(n[0]) > .5 ? 6 : 12), cls) : '');
  };
  /** A label beside segment AB, `off` px to the right of A→B; anchored so it never sits on the line. */
  const edgeLab = (A, B, s, off, cls) => {
    const u = G.unit(B, A), n = [-u[1], u[0]], m = mid(A, B), o = off == null ? 10 : off;
    const an = n[0] > .5 ? 'start' : n[0] < -.5 ? 'end' : 'middle';
    return txt(m[0] + n[0] * o, m[1] + n[1] * o + 4, s, cls || 'f-lab', an);
  };
  /** A curved arrow from A to B bending through C. */
  const bend = (A, C, B) => { const e = along(B, C, 9);
    return `<path d="M${f1(A[0])} ${f1(A[1])} Q${f1(C[0])} ${f1(C[1])} ${f1(e[0])} ${f1(e[1])}" class="f-arrow"/>` + head(C, B); };
  /** A region with holes: outer polygon plus inner paths, filled even-odd. */
  const holed = (d, cls) => `<path d="${d}" fill-rule="evenodd" class="${cls}"/>`;
  const ring = (cx, cy, r) => `M${f1(cx - r)} ${f1(cy)} A${r} ${r} 0 1 0 ${f1(cx + r)} ${f1(cy)} A${r} ${r} 0 1 0 ${f1(cx - r)} ${f1(cy)} Z`;
  const rectD = (x, y, w, h) => `M${f1(x)} ${f1(y)} h${f1(w)} v${f1(h)} h${f1(-w)} Z`;

  /* ---- 3-D: one camera for every solid ---- */
  const RAD = Math.PI / 180, AZ = 26 * RAD, EL = 22 * RAD;
  const CA = Math.cos(AZ), SA = Math.sin(AZ), CE = Math.cos(EL), SE = Math.sin(EL);
  const VIEW = [CE * SA, SE, -CE * CA];                  // towards the viewer; z runs away from them
  /** World [x, y up, z away] → screen, s px per unit, world origin at (ox, oy). */
  const cam = (ox, oy, s) => { const p = q => [ox + s * (q[0] * CA + q[2] * SA), oy - s * (q[1] * CE + (q[2] * CA - q[0] * SA) * SE)];
    p.s = s; return p; };
  const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const cen = Q => Q.reduce((c, q) => [c[0] + q[0] / Q.length, c[1] + q[1] / Q.length, c[2] + q[2] / Q.length], [0, 0, 0]);
  const nrm = a => { const L = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / L, a[1] / L, a[2] / L]; };

  /** A convex polyhedron: faces facing the camera get their class, edges between two hidden faces
      are dashed. Returns the layers separately so a cut plane can go between them. */
  const solid = (p, V, F, cls) => {
    const C = cen(V);
    const vis = F.map(f => { let n = cross(sub3(V[f[1]], V[f[0]]), sub3(V[f[2]], V[f[0]]));
      if (dot3(n, sub3(cen(f.map(i => V[i])), C)) < 0) n = n.map(v => -v); return dot3(n, VIEW) > 1e-9; });
    const E = new Map();
    F.forEach((f, k) => f.forEach((a, i) => { const b = f[(i + 1) % f.length], key = Math.min(a, b) + '-' + Math.max(a, b);
      if (!E.has(key)) E.set(key, [a, b, false]); if (vis[k]) E.get(key)[2] = true; }));
    let hid = '', faces = '', edges = '';
    E.forEach(([a, b, v]) => { if (v) edges += seg(p(V[a]), p(V[b]), 'f-edge'); else hid += seg(p(V[a]), p(V[b]), 'f-edge-in'); });
    F.forEach((f, k) => { if (vis[k] && cls[k]) faces += poly(f.map(i => p(V[i])), cls[k]); });
    return { hid, faces, edges, all: hid + faces + edges };
  };
  /** Box [x0,x0+w]×[y0,y0+h]×[z0,z0+d]. Face order: front, back, bottom, top, left, right. */
  const boxV = (x0, y0, z0, w, h, d) => { const x1 = x0 + w, y1 = y0 + h, z1 = z0 + d;
    return [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]; };
  const BOXF = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]];
  const boxCls = (front, top, side) => [front, null, null, top, null, side];
  /** Square pyramid, base half-width a on y = 0, apex at height H. Faces: base, front, right, back, left. */
  const pyrV = (a, H) => [[-a, 0, -a], [a, 0, -a], [a, 0, a], [-a, 0, a], [0, H, 0]];
  const PYRF = [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];

  /** Plane n·x = d through a convex solid → the cross section, as an ordered 3-D polygon. */
  const cutPoly = (V, F, n, d) => {
    const pts = [], seen = new Set();
    F.forEach(f => f.forEach((a, i) => { const b = f[(i + 1) % f.length], key = Math.min(a, b) + '-' + Math.max(a, b);
      if (seen.has(key)) return; seen.add(key);
      const da = dot3(n, V[a]) - d, db = dot3(n, V[b]) - d;
      if (Math.abs(da) < 1e-9) pts.push(V[a]); if (Math.abs(db) < 1e-9) pts.push(V[b]);
      if (da * db < 0) { const t = da / (da - db); pts.push(V[a].map((v, k) => v + (V[b][k] - v) * t)); } }));
    const u = []; pts.forEach(q => { if (!u.some(w => Math.hypot(w[0] - q[0], w[1] - q[1], w[2] - q[2]) < 1e-6)) u.push(q); });
    const c = cen(u), e1 = nrm(cross(n, Math.abs(n[1]) < .9 ? [0, 1, 0] : [1, 0, 0])), e2 = nrm(cross(n, e1));
    return u.sort((A, B) => Math.atan2(dot3(sub3(A, c), e2), dot3(sub3(A, c), e1)) - Math.atan2(dot3(sub3(B, c), e2), dot3(sub3(B, c), e1)));
  };
  /** The true shape of a planar 3-D polygon, laid flat: e1 → right, e2 → up, centred on (cx, cy). */
  const flat = (Q, e1, e2, cx, cy, sc, cls) => {
    const q2 = Q.map(q => [dot3(q, e1), dot3(q, e2)]), xs = q2.map(q => q[0]), ys = q2.map(q => q[1]);
    const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = (Math.min(...ys) + Math.max(...ys)) / 2;
    return poly(q2.map(q => [cx + (q[0] - mx) * sc, cy - (q[1] - my) * sc]), cls || 'f-plane');
  };

  /** Horizontal circle of radius r centred at world point c: [cx, cy, rx, ry] on screen. */
  const ell = (p, c, r) => { const o = p(c); return [o[0], o[1], p.s * r, p.s * r * SE]; };
  const ellD = (e, cls, line) => `<ellipse cx="${f1(e[0])}" cy="${f1(e[1])}" rx="${f1(e[2])}" ry="${f1(e[3])}"${line ? ' fill="none"' : ''} class="${cls}"/>`;
  /** Front (near, lower) half and back half of an ellipse, as separate arcs. */
  const front = (e, cls) => `<path d="M${f1(e[0] - e[2])} ${f1(e[1])} A${f1(e[2])} ${f1(e[3])} 0 0 0 ${f1(e[0] + e[2])} ${f1(e[1])}" fill="none" class="${cls || 'f-edge'}"/>`;
  const back = (e, cls) => `<path d="M${f1(e[0] - e[2])} ${f1(e[1])} A${f1(e[2])} ${f1(e[3])} 0 0 1 ${f1(e[0] + e[2])} ${f1(e[1])}" fill="none" class="${cls || 'f-edge-in'}"/>`;
  /** An upright cylinder on base centre c. o.side / o.top: face classes; o.ghost: thin outline;
      o.noTop: leave the top rim to whatever sits on it; o.openTop: top rim with its back half dashed;
      o.noBottom: leave the bottom rim to a solid standing inside. Layers: fill, hid (dashed), lines. */
  const cylinder = (p, c, r, h, o) => { o = o || {};
    const b = ell(p, c, r), t = ell(p, [c[0], c[1] + h, c[2]], r), ln = o.ghost ? 'f-dim' : 'f-edge';
    const side = `M${f1(b[0] - b[2])} ${f1(b[1])} A${f1(b[2])} ${f1(b[3])} 0 0 0 ${f1(b[0] + b[2])} ${f1(b[1])} L${f1(t[0] + t[2])} ${f1(t[1])} A${f1(t[2])} ${f1(t[3])} 0 0 1 ${f1(t[0] - t[2])} ${f1(t[1])} Z`;
    const fill = (o.side ? `<path d="${side}" class="${o.side}"/>` : '') + (o.top ? ellD(t, o.top) : '');
    const hid = (o.noBottom ? '' : back(b)) + (o.openTop ? back(t) : '');
    const lines = (o.noBottom ? '' : front(b, ln)) + seg([b[0] - b[2], b[1]], [t[0] - t[2], t[1]], ln) + seg([b[0] + b[2], b[1]], [t[0] + t[2], t[1]], ln)
      + (o.noTop ? '' : o.openTop ? front(t, ln) : ellD(t, ln, true));
    return { fill, hid, lines, b, t, all: fill + hid + lines };
  };
  /** An upright cone on base centre c: silhouette lines touch the base ellipse where tangents from the apex meet it.
      o.noBase: leave the base rim to the cylinder it stands in. */
  const cone = (p, c, r, H, o) => { o = o || {};
    const b = ell(p, c, r), A = p([c[0], c[1] + H, c[2]]), Dv = b[1] - A[1];
    const y0 = b[3] * b[3] / Dv, x0 = b[2] * Math.sqrt(Math.max(0, 1 - (b[3] * b[3]) / (Dv * Dv)));
    const L = [b[0] - x0, b[1] - y0], R = [b[0] + x0, b[1] - y0], arc = (big, sw) => `M${f1(L[0])} ${f1(L[1])} A${f1(b[2])} ${f1(b[3])} 0 ${big} ${sw} ${f1(R[0])} ${f1(R[1])}`;
    const fill = o.side ? `<path d="M${f1(A[0])} ${f1(A[1])} L${f1(L[0])} ${f1(L[1])} ${arc(1, 0).slice(arc(1, 0).indexOf('A'))} Z" class="${o.side}"/>` : '';
    const ln = o.ghost ? 'f-dim' : 'f-edge';
    const hid = o.noBase ? '' : `<path d="${arc(0, 1)}" fill="none" class="f-edge-in"/>`;
    const lines = (o.noBase ? '' : `<path d="${arc(1, 0)}" fill="none" class="${ln}"/>`) + seg(A, L, ln) + seg(A, R, ln);
    return { fill, hid, lines, A, b, L, R, all: fill + hid + lines };
  };
  /** A sphere: outline circle plus its equator (front half solid, back half dashed). */
  const sphere = (p, c, r, o) => { o = o || {};
    const C = p(c), R = p.s * r, e = [C[0], C[1], R, R * SE];
    return `<circle cx="${f1(C[0])}" cy="${f1(C[1])}" r="${f1(R)}" class="${o.fill || 'f-face-a'}"/>`
      + (o.slice ? ellD(e, o.slice) : back(e, 'f-edge-in') + front(e, 'f-dim'))
      + `<circle cx="${f1(C[0])}" cy="${f1(C[1])}" r="${f1(R)}" class="f-edge"/>`;
  };

  Object.assign(window.FIGURES, {

    /* ---------- areatri ---------- */

    triHalfRect: () => {
      const sc = 16, base = 128, pan = (k, t, s) => panel(6 + k * 158, 6, 152, 182, t, s);
      const Q = ox => q => [ox + q[0] * sc, base - q[1] * sc];
      // right triangle: legs 6 and 4
      const a = Q(34), A = [a([0, 0]), a([6, 0]), a([0, 4])];
      // isosceles 5, 5, 6: height 4
      const b = Q(164 + 28), B = [b([0, 0]), b([6, 0]), b([3, 4])];
      // obtuse: apex beyond the base, height lands outside
      const c = Q(322 + 14), Cc = [c([0, 0]), c([6, 0]), c([7.5, 4])];
      return S('0 0 480 222', `<title>Three triangles, each with base 6 and height 4: each is half of a 6 by 4 rectangle, area 12</title>
        ${pan(0, 'right triangle', 'the legs are b and h')}
        ${pan(1, 'slanted triangle', 'h is not the side 5')}
        ${pan(2, 'obtuse triangle', 'h lands outside')}
        ${poly([a([6, 0]), a([6, 4]), a([0, 4])], 'f-soft2')}
        ${poly([a([0, 0]), a([6, 0]), a([6, 4]), a([0, 4])], 'f-dash')}
        ${poly(A, 'f-soft')}${poly(A, 'f-edge')}${right(A[0], A[1], A[2], 9)}
        ${edgeLab(A[0], A[1], '6', 10)}${edgeLab(A[2], A[0], '4', 9, 'f-lab2')}
        ${txt(82, 166, '½ × 6 × 4 = 12', 'f-lab2')}

        ${poly([b([0, 0]), b([3, 4]), b([0, 4])], 'f-soft2')}${poly([b([6, 0]), b([6, 4]), b([3, 4])], 'f-soft2')}
        ${poly([b([0, 0]), b([6, 0]), b([6, 4]), b([0, 4])], 'f-dash')}
        ${poly(B, 'f-soft')}${poly(B, 'f-edge')}
        ${seg(b([3, 4]), b([3, 0]), 'f-line')}${right(b([3, 0]), b([6, 0]), b([3, 4]), 8)}
        ${txt(b([3, 0])[0] + 5, b([0, 1.5])[1], '4', 'f-lab2', 'start')}
        ${edgeLab(B[0], B[1], '6', 10)}${edgeLab(B[2], B[0], '5', 7)}${edgeLab(B[1], B[2], '5', 7)}
        ${txt(240, 166, '½ × 6 × 4 = 12', 'f-lab2')}
        ${txt(240, 182, 'not ½ × 6 × 5', 'f-lab3')}

        ${poly([c([0, 0]), c([7.5, 4]), c([1.5, 4])], 'f-soft2')}${poly([c([0, 0]), c([6, 0]), c([7.5, 4]), c([1.5, 4])], 'f-dash')}
        ${seg(c([6, 0]), c([7.5, 0]), 'f-dash')}
        ${poly(Cc, 'f-soft')}${poly(Cc, 'f-edge')}
        ${seg(c([7.5, 4]), c([7.5, 0]), 'f-line')}${right(c([7.5, 0]), c([6, 0]), c([7.5, 4]), 8)}
        ${txt(c([7.5, 0])[0] + 6, c([0, 2])[1] + 4, '4', 'f-lab2', 'start')}
        ${edgeLab(Cc[0], Cc[1], '6', 10)}
        ${txt(398, 166, '½ × 6 × 4 = 12', 'f-lab2')}
        ${txt(240, 214, 'base 6 and height 4 every time — each has half the area of a 6 × 4 rectangle', 'f-cap')}`);
    },

    paraSlideRect: () => {
      const sc = 18, by = 150, L = q => [36 + q[0] * sc, by - q[1] * sc], R = q => [306 + q[0] * sc, by - q[1] * sc];
      const para = [L([0, 0]), L([7, 0]), L([10, 4]), L([3, 4])];
      return S('0 0 480 236', `<title>A parallelogram with base 7, slanted side 5 and height 4: cutting the triangle off one end and sliding it to the other makes a 7 by 4 rectangle</title>
        ${txt(14, 22, 'cut the triangle off one end, slide it to the other', 'f-cap', 'start')}
        ${poly([L([3, 0]), L([7, 0]), L([10, 4]), L([3, 4])], 'f-soft')}
        ${poly([L([0, 0]), L([3, 0]), L([3, 4])], 'f-soft2')}
        ${poly([L([7, 0]), L([10, 0]), L([10, 4])], 'f-soft2')}${poly([L([7, 0]), L([10, 0]), L([10, 4])], 'f-dash')}
        ${poly(para, 'f-edge')}
        ${seg(L([3, 4]), L([3, 0]), 'f-hi2')}${right(L([3, 0]), L([7, 0]), L([3, 4]), 8)}
        ${bend(L([2, 1.6]), L([5.5, 8.6]), L([9, 1.6]))}
        ${txt(L([3, 0])[0] + 6, L([0, 2.1])[1], 'h = 4', 'f-lab2', 'start')}
        ${edgeLab(para[3], para[0], '5', 8)}
        ${edgeLab(para[0], para[1], 'b = 7', 11)}
        ${txt(L([5, 0])[0], 196, 'parallelogram', 'f-name')}
        ${ARR(244, 114, 286, 114)}
        ${poly([R([0, 0]), R([4, 0]), R([7, 4]), R([0, 4])], 'f-soft')}
        ${poly([R([4, 0]), R([7, 0]), R([7, 4])], 'f-soft2')}
        ${seg(R([4, 0]), R([7, 4]), 'f-dash')}
        ${poly([R([0, 0]), R([7, 0]), R([7, 4]), R([0, 4])], 'f-edge')}
        ${right(R([0, 0]), R([1, 0]), R([0, 1]), 8)}
        ${txt(R([2.6, 0])[0], R([0, 2])[1] + 4, '7 × 4 = 28', 'f-lab2')}
        ${edgeLab(R([0, 0]), R([7, 0]), '7', 11)}${edgeLab(R([7, 0]), R([7, 4]), '4', 8)}
        ${txt(R([3.5, 0])[0], 196, 'rectangle', 'f-name')}
        ${txt(240, 228, 'nothing added, nothing removed: A = bh = 28 — the slanted 5 would give 35, too big', 'f-lab3')}`);
    },

    trapTwoCopies: () => {
      const sc = 24, X = q => [26 + q[0] * sc, 156 - q[1] * sc];
      const T1 = [[0, 0], [8, 0], [5.5, 4], [1.5, 4]].map(X), T2 = [[8, 0], [12, 0], [13.5, 4], [5.5, 4]].map(X);
      return S('0 0 480 214', `<title>A trapezoid with parallel sides b1 and b2 and a copy turned upside down fit together into a parallelogram of base b1 plus b2</title>
        ${txt(14, 22, 'two copies, one turned upside down, make a parallelogram', 'f-cap', 'start')}
        ${poly(T1, 'f-tile')}${poly(T2, 'f-tile2')}
        ${poly([X([0, 0]), X([12, 0]), X([13.5, 4]), X([1.5, 4])], 'f-edge')}${seg(X([8, 0]), X([5.5, 4]), 'f-edge')}
        ${seg(X([1.5, 4]), X([1.5, 0]), 'f-dash')}${right(X([1.5, 0]), X([3, 0]), X([1.5, 4]), 8)}
        ${txt(X([1.5, 0])[0] + 6, X([0, 2.4])[1], 'h', 'f-lab2', 'start')}
        ${txt(X([4.3, 0])[0], X([0, 1.4])[1], 'trapezoid', 'f-name')}
        ${txt(X([9.8, 0])[0], X([0, 2.2])[1], 'the same trapezoid,', 'f-lab')}
        ${txt(X([9.8, 0])[0], X([0, 2.2])[1] + 14, 'upside down', 'f-lab')}
        ${edgeLab(T1[2], T1[3], 'b₁', 9, 'f-lab2')}${edgeLab(T2[2], T2[3], 'b₂', 9, 'f-lab2')}
        ${edgeLab(T1[0], T1[1], 'b₂', 11, 'f-lab2')}${edgeLab(T2[0], T2[1], 'b₁', 11, 'f-lab2')}
        ${dimLine(X([0, 0]), X([12, 0]), 'b₁ + b₂', 28, 'f-lab2')}
        ${txt(364, 70, 'parallelogram:', 'f-lab3', 'start')}
        ${txt(364, 88, '(b₁ + b₂) × h', 'f-lab2', 'start')}
        ${txt(364, 120, 'one trapezoid,', 'f-lab3', 'start')}
        ${txt(364, 136, 'half of that:', 'f-lab3', 'start')}
        ${txt(364, 154, '½(b₁ + b₂) × h', 'f-lab2', 'start')}`);
    },

    compositeTwoRoutes: () => {
      const sc = 16, Q = ox => q => [ox + q[0] * sc, 154 - q[1] * sc];
      const shape = [[0, 0], [8, 0], [8, 2], [4, 6], [0, 6]];
      const a = Q(62), b = Q(300), A = shape.map(a), B = shape.map(b);
      return S('0 0 480 244', `<title>One shape, area 40, found two ways: adding a rectangle, a rectangle and a triangle, or subtracting a missing triangle from an 8 by 6 rectangle</title>
        ${panel(6, 6, 230, 206, 'add the pieces', 'A + B + C')}
        ${panel(244, 6, 230, 206, 'subtract what is missing', 'big rectangle − corner')}
        ${poly([[0, 0], [8, 0], [8, 2], [0, 2]].map(a), 'f-soft')}${poly([[0, 2], [4, 2], [4, 6], [0, 6]].map(a), 'f-soft')}
        ${poly([[4, 2], [8, 2], [4, 6]].map(a), 'f-soft2')}
        ${seg(a([0, 2]), a([8, 2]), 'f-dash')}${seg(a([4, 2]), a([4, 6]), 'f-dash')}
        ${poly(A, 'f-edge')}
        ${txt(a([4, 1])[0], a([0, 1])[1] + 4, 'A', 'f-lab2')}${txt(a([2, 0])[0], a([0, 4])[1] + 4, 'B', 'f-lab2')}
        ${txt(a([5.2, 0])[0], a([0, 3.2])[1] + 4, 'C', 'f-lab2')}
        ${edgeLab(A[0], A[1], '8', 11)}${edgeLab(a([0, 2]), a([0, 0]), '2', 7)}${edgeLab(a([0, 6]), a([0, 2]), '4', 7)}
        ${edgeLab(A[3], A[4], '4', 9)}
        ${txt(121, 184, '8×2 + 4×4 + ½×4×4', 'f-lab3')}
        ${txt(121, 202, '= 16 + 16 + 8 = 40', 'f-lab2')}

        ${poly([b([4, 6]), b([8, 6]), b([8, 2])], 'f-soft2')}
        ${poly([[0, 0], [8, 0], [8, 6], [0, 6]].map(b), 'f-dash')}
        ${poly(B, 'f-soft')}${poly(B, 'f-edge')}
        ${txt(b([6.7, 0])[0], b([0, 5])[1] + 4, '−8', 'f-lab2')}
        ${edgeLab(B[0], B[1], '8', 11)}${edgeLab(B[4], B[0], '6', 7)}
        ${edgeLab(b([8, 6]), b([4, 6]), '4', 9)}${edgeLab(b([8, 2]), b([8, 6]), '4', 7)}
        ${txt(359, 184, '8 × 6 − ½ × 4 × 4', 'f-lab3')}
        ${txt(359, 202, '= 48 − 8 = 40', 'f-lab2')}
        ${txt(240, 234, 'the same 40 either way — use the route that needs fewer measurements', 'f-cap')}`);
    },

    /* ---------- area2d ---------- */

    compositeCutouts: () => {
      const sc = 10, by = 160;
      // (a) 8 × 4 rectangle with a half circle of radius 4 on top
      const ax = 85, a0 = ax - 40, a1 = ax + 40, at = by - 40;
      // (b) 10 × 10 square with a circle of radius 3 cut out
      const bx = 240, b0 = bx - 50, bt = by - 100, bc = [bx, by - 50];
      // (c) 10 × 8 frame around an 8 × 6 hole
      const cx = 398, c0 = cx - 50, ct = by - 80;
      return S('0 0 480 256', `<title>Three composite areas: a rectangle plus a half circle, a square minus a circle, and a border found as outer minus inner rectangle</title>
        ${panel(6, 6, 152, 220, 'add', 'half circle on top')}
        ${panel(164, 6, 152, 220, 'subtract', 'a circle cut out')}
        ${panel(322, 6, 152, 220, 'subtract', 'a border')}
        <path d="M${a0} ${by} L${a1} ${by} L${a1} ${at} A40 40 0 0 0 ${a0} ${at} Z" class="f-soft"/>
        <path d="M${a0} ${by} L${a1} ${by} L${a1} ${at} A40 40 0 0 0 ${a0} ${at} Z" class="f-edge"/>
        ${seg([a0, at], [a1, at], 'f-dash')}
        ${dot([ax, at], 'f-hub', 2.6)}${seg([ax, at], [ax + 28.3, at - 28.3], 'f-dim')}
        ${txt(ax + 9, at - 20, 'r = 4', 'f-lab', 'end')}
        ${edgeLab([a0, by], [a1, by], '8', 11)}${edgeLab([a0, at], [a0, by], '4', 7)}
        ${txt(ax, 194, '8×4 + ½π×4²', 'f-lab3')}
        ${txt(ax, 212, '= 32 + 8π ≈ 57.1', 'f-lab2')}

        ${holed(rectD(b0, bt, 100, 100) + ring(bc[0], bc[1], 30), 'f-soft')}
        <rect x="${b0}" y="${bt}" width="100" height="100" class="f-edge"/>
        <circle cx="${bc[0]}" cy="${bc[1]}" r="30" class="f-edge"/>
        ${dot(bc, 'f-hub', 2.6)}${seg(bc, [bc[0] + 30, bc[1]], 'f-dim')}${txt(bc[0] + 15, bc[1] - 6, 'r = 3', 'f-lab')}
        ${edgeLab([b0, by], [b0 + 100, by], '10', 11)}
        ${txt(bx, 194, '10² − π×3²', 'f-lab3')}
        ${txt(bx, 212, '= 100 − 9π ≈ 71.7', 'f-lab2')}

        ${holed(rectD(c0, ct, 100, 80) + rectD(c0 + 10, ct + 10, 80, 60), 'f-soft')}
        <rect x="${c0}" y="${ct}" width="100" height="80" class="f-edge"/>
        <rect x="${c0 + 10}" y="${ct + 10}" width="80" height="60" class="f-edge"/>
        ${txt(cx, ct + 44, '8 × 6', 'f-lab3')}
        ${edgeLab([c0, by], [c0 + 100, by], '10', 11)}${edgeLab([c0, ct], [c0, by], '8', 7)}
        ${txt(cx, 194, '10×8 − 8×6', 'f-lab3')}
        ${txt(cx, 212, '= 80 − 48 = 32', 'f-lab2')}
        ${txt(240, 246, 'often subtraction is faster: the whole shape, take away the hole', 'f-cap')}`);
    },

    samePerimeterRects: () => {
      const u = 16, rects = [[1, 11], [2, 10], [3, 9], [4, 8], [5, 7], [6, 6]];
      const tiles = (x, y, w, h) => { let o = ''; for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) o += `<rect x="${x + i * u}" y="${y + j * u}" width="${u}" height="${u}" class="f-tile2"/>`; return o; };
      const bx = 262, base = 196, k = 120 / 36;
      return S('0 0 480 250', `<title>A 1 by 11 rectangle and a 6 by 6 square both have perimeter 24, but their areas are 11 and 36; areas of all six whole-number rectangles with perimeter 24</title>
        ${txt(14, 22, 'every rectangle here has perimeter 24', 'f-cap', 'start')}
        ${tiles(20, 44, 11, 1)}<rect x="20" y="44" width="${11 * u}" height="${u}" class="f-edge"/>
        ${txt(108, 80, '1 × 11:  P = 24,  A = 11', 'f-lab')}
        ${tiles(60, 100, 6, 6)}<rect x="60" y="100" width="${6 * u}" height="${6 * u}" class="f-edge"/>
        ${txt(108, 214, '6 × 6:  P = 24,  A = 36', 'f-lab')}
        ${txt(360, 52, 'area of each, perimeter 24', 'f-lab3')}
        ${rects.map(([w, l], i) => { const h = w * l * k, x = bx + i * 36;
          return `<rect x="${x}" y="${f1(base - h)}" width="24" height="${f1(h)}" class="${i === 0 || i === 5 ? 'f-tile2' : 'f-tile'}"/>`
            + txt(x + 12, base - h - 6, w * l, 'f-lab2') + txt(x + 12, base + 16, `${w}×${l}`, 'f-lab'); }).join('')}
        ${seg([252, base], [470, base], 'f-axis')}
        ${txt(240, 242, 'the closer to a square, the bigger the area — perimeter does not decide area', 'f-cap')}`);
    },

    /* ---------- surfacenets ---------- */

    boxNetFaces: () => {
      const p = cam(28, 160, 19), V = boxV(0, 0, 0, 5, 4, 3);
      const box = solid(p, V, BOXF, boxCls('f-face-b', 'f-face-a', 'f-face-c'));
      const fc = (q) => cen(q.map(i => V[i]));
      const u = 13, x0 = 214, y0 = 40, cols = [x0, x0 + 3 * u, x0 + 8 * u, x0 + 11 * u, x0 + 16 * u], ym = y0 + 3 * u, yb = ym + 4 * u;
      const face = (x, y, w, h, cls, dims, area) => `<rect x="${x}" y="${y}" width="${w * u}" height="${h * u}" class="${cls}"/>`
        + txt(x + w * u / 2, y + h * u / 2 - 2, dims, 'f-lab') + txt(x + w * u / 2, y + h * u / 2 + 13, area, 'f-lab2');
      const outline = [[cols[1], y0], [cols[2], y0], [cols[2], ym], [cols[4], ym], [cols[4], yb], [cols[2], yb], [cols[2], yb + 3 * u],
        [cols[1], yb + 3 * u], [cols[1], yb], [cols[0], yb], [cols[0], ym], [cols[1], ym]];
      return S('0 0 480 226', `<title>A 5 by 3 by 4 box and its net: two faces of 20, two of 15 and two of 12 square units, 94 in all</title>
        ${box.all}
        ${txt(p(fc([0, 1, 2, 3]))[0], p(fc([0, 1, 2, 3]))[1] + 4, '20', 'f-lab2')}
        ${txt(p(fc([3, 2, 6, 7]))[0], p(fc([3, 2, 6, 7]))[1] + 4, '15', 'f-lab2')}
        ${txt(p(fc([1, 2, 6, 5]))[0], p(fc([1, 2, 6, 5]))[1] + 4, '12', 'f-lab2')}
        ${edgeLab(p(V[0]), p(V[1]), '5', 11)}${edgeLab(p(V[3]), p(V[0]), '4', 7)}${edgeLab(p(V[1]), p(V[5]), '3', 9)}
        ${ARR(166, 112, 200, 112)}
        ${face(cols[0], ym, 3, 4, 'f-face-c', '3 × 4', '12')}
        ${face(cols[1], ym, 5, 4, 'f-face-b', '5 × 4', '20')}
        ${face(cols[2], ym, 3, 4, 'f-face-c', '3 × 4', '12')}
        ${face(cols[3], ym, 5, 4, 'f-face-b', '5 × 4', '20')}
        ${face(cols[1], y0, 5, 3, 'f-face-a', '5 × 3', '15')}
        ${face(cols[1], yb, 5, 3, 'f-face-a', '5 × 3', '15')}
        ${seg([cols[1], ym], [cols[2], ym], 'f-dash')}${seg([cols[1], yb], [cols[2], yb], 'f-dash')}
        ${[1, 2, 3].map(i => seg([cols[i], ym], [cols[i], yb], 'f-dash')).join('')}
        ${poly(outline, 'f-edge')}
        ${txt(240, 198, '(15 + 20 + 12) × 2 = 47 × 2 = 94 square units', 'f-lab2')}
        ${txt(240, 217, 'three different faces, each one twice — same shade, same area', 'f-lab3')}`);
    },

    pyramidNetSlant: () => {
      const p = cam(112, 150, 22), V = pyrV(3, 4), py = solid(p, V, PYRF, [null, 'f-face-b', 'f-face-c', null, null]);
      const O = p([0, 0, 0]), T = p([0, 4, 0]), M = p([3, 0, 0]);   // slant height runs up the right face to the middle of its base edge
      const n = 12, cx = 360, cy = 124, h = 3 * n, s = 5 * n;     // net: square 6, triangles of height 5
      const sq = [[cx - h, cy - h], [cx + h, cy - h], [cx + h, cy + h], [cx - h, cy + h]];
      const tris = [[sq[0], sq[1], [cx, cy - h - s]], [sq[1], sq[2], [cx + h + s, cy]], [sq[2], sq[3], [cx, cy + h + s]], [sq[3], sq[0], [cx - h - s, cy]]];
      return S('0 0 480 262', `<title>A square pyramid with base 6, vertical height 4 and slant height 5, and its net of one square and four triangles, 96 square units</title>
        ${py.hid}${py.faces}
        ${seg(T, O, 'f-dash')}${seg(O, M, 'f-dash')}${right(O, T, M, 7)}
        ${seg(T, M, 'f-line')}
        ${py.edges}
        ${dot(T, 'f-hub', 3)}
        ${txt(O[0] - 5, O[1] - 46, 'h', 'f-lab', 'end')}
        ${edgeLab(M, T, 'ℓ', 7, 'f-lab2')}
        ${edgeLab(p(V[0]), p(V[1]), '6', 12)}
        ${txt(112, 214, 'ℓ = 5 runs up the face', 'f-lab2')}
        ${txt(112, 231, 'h = 4 is inside — too short', 'f-lab3')}
        ${tris.map((t, i) => poly(t, 'f-face-b') + poly(t, 'f-edge')).join('')}
        ${poly(sq, 'f-face-a')}${poly(sq, 'f-edge')}
        ${txt(cx, cy - 2, '6 × 6', 'f-lab')}${txt(cx, cy + 14, '36', 'f-lab2')}
        ${txt(cx, cy - h - 14, '15', 'f-lab2')}${txt(cx - h - 18, cy + 4, '15', 'f-lab2')}${txt(cx, cy + h + 22, '15', 'f-lab2')}
        ${seg([cx + h, cy], [cx + h + s, cy], 'f-line')}${txt(cx + h + 24, cy - 8, 'ℓ = 5', 'f-lab2')}
        ${txt(cx + h + 18, cy + 17, '15', 'f-lab2')}
        ${txt(240, 254, '36 + 4 × (½ × 6 × 5) = 36 + 60 = 96 square units', 'f-lab2')}`);
    },

    /* ---------- volumefrac ---------- */

    fracEdgeBox: () => {
      const p = cam(24, 152, 62), q = cam(316, 152, 62);
      const frame = (cm, V) => { let o = ''; const ix = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
        ix.forEach(([a, b]) => { o += seg(cm(V[a]), cm(V[b]), 'f-edge-in'); }); return o; };
      const big = boxV(0, 0, 0, 2, .75, .5), bx = solid(p, big, BOXF, boxCls('f-face-b', 'f-face-a', 'f-face-c'));
      const A = boxV(0, 0, 0, 1, .75, .5), B = boxV(0, 0, .5, 1, .75, .5);
      const sA = solid(q, A, BOXF, boxCls('f-face-b', 'f-face-a', 'f-face-c')), sB = solid(q, B, BOXF, boxCls(null, 'f-face-a', 'f-face-c'));
      const quarter = y => seg(q([0, y, 0]), q([1, y, 0]), 'f-dim') + seg(q([1, y, 0]), q([1, y, 1]), 'f-dim');
      return S('0 0 480 236', `<title>A box ½ by ¾ by 2 inside two unit cubes; cut in half and restacked it fills ¾ of one unit cube, so its volume is ¾ cubic unit</title>
        ${txt(14, 22, 'a box ½ by ¾ by 2, drawn inside the unit cubes it sits in', 'f-cap', 'start')}
        ${frame(p, boxV(0, 0, 0, 1, 1, 1))}${frame(p, boxV(1, 0, 0, 1, 1, 1))}
        ${bx.faces}
        ${poly([p([1, 0, 0]), p([2, 0, 0]), p([2, .75, 0]), p([1, .75, 0])], 'f-soft2')}
        ${poly([p([1, .75, 0]), p([2, .75, 0]), p([2, .75, .5]), p([1, .75, .5])], 'f-soft2')}
        ${poly([p([2, 0, 0]), p([2, .75, 0]), p([2, .75, .5]), p([2, 0, .5])], 'f-soft2')}
        ${bx.edges}
        ${seg(p([1, 0, 0]), p([1, .75, 0]), 'f-hi2')}${seg(p([1, .75, 0]), p([1, .75, .5]), 'f-hi2')}
        ${edgeLab(p([0, 0, 0]), p([2, 0, 0]), '2', 12, 'f-lab2')}
        ${edgeLab(p([0, .75, 0]), p([0, 0, 0]), '¾', 7, 'f-lab2')}
        ${edgeLab(p([2, 0, 0]), p([2, 0, .5]), '½', 8, 'f-lab2')}
        ${txt(96, 200, '½ × ¾ × 2 = ¾', 'f-lab2')}
        ${bend([170, 100], [230, 64], [292, 100])}
        ${txt(231, 112, 'cut in half,', 'f-lab3')}${txt(231, 127, 'stack behind', 'f-lab3')}
        ${frame(q, boxV(0, 0, 0, 1, 1, 1))}
        ${sB.faces}
        ${poly([q([0, .75, .5]), q([1, .75, .5]), q([1, .75, 1]), q([0, .75, 1])], 'f-soft2')}
        ${poly([q([1, 0, .5]), q([1, .75, .5]), q([1, .75, 1]), q([1, 0, 1])], 'f-soft2')}
        ${sB.edges}${sA.faces}${sA.edges}
        ${quarter(.25)}${quarter(.5)}
        ${edgeLab(q([1, 0, 0]), q([1, 0, 1]), '1', 8)}${edgeLab(q([0, 0, 0]), q([1, 0, 0]), '1', 12)}
        ${edgeLab(q([0, .75, 0]), q([0, 0, 0]), '¾', 7, 'f-lab2')}
        ${txt(360, 200, '¾ of one unit cube', 'f-lab2')}
        ${txt(240, 226, 'less than one cubic unit — just what the size of the box suggests', 'f-cap')}`);
    },

    /* ---------- volume ---------- */

    pyrConeThird: () => {
      const p = cam(118, 174, 19), V = boxV(-2, 0, -2, 4, 5, 4);
      const pr = solid(p, V, BOXF, boxCls('f-face-c', 'f-face-c', 'f-face-c'));
      const py = solid(p, pyrV(2, 5), PYRF, [null, 'f-face-b', 'f-face-a', null, null]);
      const q = cam(352, 174, 19), cy = cylinder(q, [0, 0, 0], 2.2, 5, { side: 'f-face-c', top: 'f-face-c' }), co = cone(q, [0, 0, 0], 2.2, 5, { side: 'f-face-b', noBase: true });
      const hx = p([2, 0, 2]), hy = p([2, 5, 2]);
      return S('0 0 480 262', `<title>A square pyramid inside a prism and a cone inside a cylinder, each with the same base and height: the pointed solid holds one third</title>
        ${txt(240, 22, 'same base, same height — the pointed one holds a third', 'f-cap')}
        ${poly([0, 1, 2, 3].map(i => p(pyrV(2, 5)[i])), 'f-soft2')}
        ${pr.hid}${pr.faces}${py.hid}${py.faces}${py.edges}${pr.edges}
        ${dimLine([hx[0] + 12, hx[1]], [hx[0] + 12, hy[1]], 'h', 0, 'f-lab2')}
        ${txt(118, 216, 'prism  V = Bh', 'f-lab')}
        ${txt(118, 234, 'pyramid  V = ⅓Bh', 'f-lab2')}
        ${cy.fill}${co.fill}${cy.hid}${cy.lines}${co.lines}
        ${dimLine([cy.b[0] + cy.b[2] + 14, cy.b[1]], [cy.t[0] + cy.t[2] + 14, cy.t[1]], 'h', 0, 'f-lab2')}
        ${dot(cy.b, 'f-hub', 2.6)}${seg(cy.b, [cy.b[0] - cy.b[2], cy.b[1]], 'f-dim')}${txt(cy.b[0] - cy.b[2] / 2, cy.b[1] - 5, 'r', 'f-lab2')}
        ${txt(352, 216, 'cylinder  V = πr²h', 'f-lab')}
        ${txt(352, 234, 'cone  V = ⅓πr²h', 'f-lab2')}
        ${txt(240, 254, 'three pyramids fill the prism; three cones fill the cylinder', 'f-lab3')}`);
    },

    /* ---------- volume8 ---------- */

    cylinderFamily: () => {
      const cs = [85, 240, 395].map(x => cam(x, 172, 40));
      const c0 = cylinder(cs[0], [0, 0, 0], 1, 2, { side: 'f-face-b', top: 'f-face-a' });
      const g1 = cylinder(cs[1], [0, 0, 0], 1, 2, { ghost: true, noBottom: true }), k1 = cone(cs[1], [0, 0, 0], 1, 2, { side: 'f-face-b' });
      const g2 = cylinder(cs[2], [0, 0, 0], 1, 2, { ghost: true });
      const t0 = c0.t, b0 = c0.b;
      return S('0 0 480 262', `<title>A cylinder, the cone inside it and the sphere inside it, all with radius r and height 2r: the cone holds one third and the sphere two thirds</title>
        ${txt(240, 22, 'one cylinder, radius r and height 2r — and what fits inside it', 'f-cap')}
        ${c0.all}
        ${dot([t0[0], t0[1]], 'f-hub', 2.6)}${seg([t0[0], t0[1]], [t0[0] + t0[2], t0[1]], 'f-line')}${txt(t0[0] + t0[2] / 2, t0[1] + 13, 'r', 'f-lab2')}
        ${dimLine([b0[0] + b0[2] + 12, b0[1]], [t0[0] + t0[2] + 12, t0[1]], '2r', 0, 'f-lab2')}
        ${k1.fill}${k1.hid}${g1.lines}${k1.lines}
        ${g2.hid}${g2.lines}${sphere(cs[2], [0, 1, 0], 1, { fill: 'f-face-b' })}
        ${txt(85, 206, 'cylinder', 'f-name')}${txt(240, 206, 'cone', 'f-name')}${txt(395, 206, 'sphere', 'f-name')}
        ${txt(85, 224, 'πr²h = 2πr³', 'f-lab2')}${txt(240, 224, '⅓πr²h', 'f-lab2')}${txt(395, 224, '⁴⁄₃πr³', 'f-lab2')}
        ${txt(85, 241, 'the whole', 'f-lab3')}${txt(240, 241, 'one third', 'f-lab3')}${txt(395, 241, 'two thirds', 'f-lab3')}
        ${txt(240, 258, 'cone + sphere = ⅓ + ⅔ = the whole cylinder', 'f-lab3')}`);
    },

    radiusNotDiameter: () => {
      const p = cam(112, 170, 9), cy = cylinder(p, [0, 0, 0], 5, 6, { side: 'f-face-b', top: 'f-face-a' }), t = cy.t, b = cy.b;
      const x0 = 300, y0 = 56, u = 10;
      return S('0 0 480 262', `<title>A cylinder of diameter 10 has radius 5; squaring the diameter by mistake gives 100 instead of 25, four times too big</title>
        ${txt(240, 22, 'the formula wants the radius — halve the diameter first', 'f-cap')}
        ${cy.all}
        ${dimLine([t[0] + t[2], t[1] - t[3] - 10], [t[0] - t[2], t[1] - t[3] - 10], 'd = 10', 0, 'f-lab', 10)}
        ${seg([t[0] - t[2], t[1]], [t[0], t[1]], 'f-dim')}${seg([t[0], t[1]], [t[0] + t[2], t[1]], 'f-line')}${dot([t[0], t[1]], 'f-hub', 2.6)}
        ${txt(t[0] + t[2] / 2, t[1] - 5, 'r = 5', 'f-lab2')}
        ${dimLine([b[0] + b[2] + 12, b[1]], [t[0] + t[2] + 12, t[1]], 'h = 6', 0)}
        ${txt(112, 206, 'π × 5² × 6 = 150π ✓', 'f-lab2')}
        ${txt(112, 224, 'with d by mistake: π × 10² × 6 = 600π', 'f-lab3')}
        <rect x="${x0}" y="${y0}" width="${10 * u}" height="${10 * u}" class="f-tile2"/>
        <rect x="${x0}" y="${y0}" width="${5 * u}" height="${5 * u}" class="f-tile"/>
        ${seg([x0 + 5 * u, y0], [x0 + 5 * u, y0 + 10 * u], 'f-dash')}${seg([x0, y0 + 5 * u], [x0 + 10 * u, y0 + 5 * u], 'f-dash')}
        <rect x="${x0}" y="${y0}" width="${10 * u}" height="${10 * u}" class="f-edge"/>
        ${txt(x0 + 2.5 * u, y0 + 2.5 * u + 4, '5²', 'f-lab2')}
        ${edgeLab([x0 + 5 * u, y0], [x0, y0], '5', 9)}${edgeLab([x0, y0], [x0, y0 + 5 * u], '5', 7)}
        ${edgeLab([x0, y0 + 10 * u], [x0 + 10 * u, y0 + 10 * u], '10', 11)}${edgeLab([x0 + 10 * u, y0 + 10 * u], [x0 + 10 * u, y0], '10', 7)}
        ${txt(x0 + 50, 192, 'r² = 25, but d² = 100', 'f-lab2')}
        ${txt(x0 + 50, 209, 'four of the small squares:', 'f-lab3')}
        ${txt(x0 + 50, 225, '600π is 4 times too big', 'f-lab3')}
        ${txt(240, 254, 'squared, the error is ×4; cubed, as in a sphere, it is ×8', 'f-cap')}`);
    },

    siloComposite: () => {
      const pa = cam(120, 200, 10), pb = cam(340, 200, 10);
      const ca = cylinder(pa, [0, 0, 0], 3, 8, { side: 'f-face-b', noTop: true }), ka = cone(pa, [0, 8, 0], 3, 4, { side: 'f-face-a' });
      const cb = cylinder(pb, [0, 0, 0], 3, 8, { side: 'f-face-b', openTop: true });
      const tb = cb.t, R = tb[2];
      const dome = `M${f1(tb[0] - R)} ${f1(tb[1])} A${f1(R)} ${f1(R)} 0 0 1 ${f1(tb[0] + R)} ${f1(tb[1])} A${f1(R)} ${f1(tb[3])} 0 0 1 ${f1(tb[0] - R)} ${f1(tb[1])} Z`;
      /* vertical dimension at screen x between world heights y0 < y1; side > 0 puts the label right */
      const vd = (pp, x, y0, y1, lab, cls, side) => { const A = pp([0, y0, 0])[1], B = pp([0, y1, 0])[1];
        return side > 0 ? dimLine([x, A], [x, B], lab, 0, cls) : dimLine([x, B], [x, A], lab, 0, cls); };
      const rlab = cyl => { const b = cyl.b; return dot([b[0], b[1]], 'f-hub', 2.4) + seg([b[0], b[1]], [b[0] + b[2], b[1]], 'f-dim') + txt(b[0] + b[2] / 2, b[1] + b[3] + 14, 'r = 3', 'f-lab'); };
      return S('0 0 480 296', `<title>Two silos of radius 3: a cylinder of height 8 with a cone of height 4 on top, 84π, and with a half-sphere on top, 90π</title>
        ${txt(240, 22, 'find each part separately, then add', 'f-cap')}
        ${ca.fill}${ka.fill}${ca.hid}${ka.hid}${ca.lines}${ka.lines}
        ${rlab(ca)}
        ${vd(pa, 164, 0, 8, '8', 'f-lab2', 1)}${vd(pa, 164, 8, 12, '4', 'f-lab2', 1)}
        ${vd(pa, 76, 0, 12, 'total 12', 'f-lab3', -1)}
        ${txt(120, 56, 'cylinder + cone', 'f-name')}
        ${cb.fill}<path d="${dome}" class="f-face-a"/>${cb.hid}${cb.lines}
        <path d="M${f1(tb[0] - R)} ${f1(tb[1])} A${f1(R)} ${f1(R)} 0 0 1 ${f1(tb[0] + R)} ${f1(tb[1])}" class="f-edge"/>
        ${rlab(cb)}
        ${vd(pb, 384, 0, 8, '8', 'f-lab2', 1)}${vd(pb, 384, 8, 11, '3', 'f-lab2', 1)}
        ${vd(pb, 296, 0, 11, 'total 11', 'f-lab3', -1)}
        ${txt(340, 56, 'cylinder + half-sphere', 'f-name')}
        ${txt(120, 246, 'π×3²×8 + ⅓π×3²×4', 'f-lab3')}${txt(120, 264, '= 72π + 12π = 84π', 'f-lab2')}
        ${txt(340, 246, 'π×3²×8 + ½ × ⁴⁄₃π×3³', 'f-lab3')}${txt(340, 264, '= 72π + 18π = 90π', 'f-lab2')}
        ${txt(240, 288, 'the cylinder’s height is its own 8, not the total height of the silo', 'f-lab3')}`);
    },

    /* ---------- sections3d ---------- */

    pyramidSlices: () => {
      const H = 1.9, V = pyrV(1, H), cls = ['f-face-c', 'f-face-b', 'f-face-a', 'f-face-c', 'f-face-c'];
      const cuts = [
        { n: [0, 1, 0], d: .85, e1: [1, 0, 0], e2: [0, 0, -1], t: 'parallel to base', name: 'a square' },
        { n: [0, 0, 1], d: 0, e1: [1, 0, 0], e2: [0, 1, 0], t: 'through the apex', name: 'a triangle' },
        { n: [0, 1, -.6], d: .8, e1: [1, 0, 0], e2: nrm([0, -.6, -1]), t: 'at a slant', name: 'a trapezoid' }];
      return S('0 0 480 256', `<title>A square pyramid cut three ways: parallel to the base gives a square, down through the apex a triangle, at a slant a trapezoid</title>
        ${cuts.map((c, k) => { const x = 6 + k * 158, p = cam(x + 76, 128, 40), s = solid(p, V, PYRF, cls), Q = cutPoly(V, PYRF, c.n, c.d);
          return panel(x, 6, 152, 240, c.t) + s.hid + s.faces + poly(Q.map(p), 'f-plane') + s.edges
            + txt(x + 76, 166, '↓', 'f-lab3') + flat(Q, c.e1, c.e2, x + 76, 194, 26) + txt(x + 76, 234, c.name, 'f-name'); }).join('')}`);
    },

    roundSlices: () => {
      const D = 2.3, HC = 2.4;
      const cyl = (x, y, cut) => { const p = cam(x, y, 26), c = cylinder(p, [0, 0, 0], 1, D, { side: 'f-face-b', top: 'f-face-a' });
        return c.fill + c.hid + cut(p) + c.lines; };
      const con = (x, y, cut) => { const p = cam(x, y, 28), c = cone(p, [0, 0, 0], 1, HC, { side: 'f-face-b' });
        return c.fill + c.hid + cut(p) + c.lines; };
      const tilt = p => { let pts = []; for (let i = 0; i < 72; i++) { const t = i / 72 * 2 * Math.PI; pts.push(p([Math.cos(t), 1.15 + .7 * Math.sin(t), Math.sin(t)])); } return poly(pts, 'f-plane'); };
      const k = 22, rc = 1 - 1 / HC;
      const pn = (x, y, w, t) => panel(x, y, w, 144, t);
      return S('0 0 480 310', `<title>A cylinder cut parallel to its base gives a circle, straight down the middle a rectangle, at a slant an ellipse; a cone cut parallel to its base gives a circle, down through the tip a triangle</title>
        ${pn(6, 6, 152, 'parallel to base')}${pn(164, 6, 152, 'down the middle')}${pn(322, 6, 152, 'at a slant')}
        ${cyl(50, 124, p => ellD(ell(p, [0, 1.15, 0], 1), 'f-plane'))}
        <circle cx="118" cy="90" r="${k}" class="f-plane"/>${txt(118, 138, 'circle', 'f-name')}
        ${cyl(208, 124, p => poly([[-1, 0, 0], [1, 0, 0], [1, D, 0], [-1, D, 0]].map(p), 'f-plane'))}
        <rect x="${276 - k}" y="${f1(90 - D * k / 2)}" width="${2 * k}" height="${f1(D * k)}" class="f-plane"/>${txt(276, 138, 'rectangle', 'f-name')}
        ${cyl(366, 124, tilt)}
        <ellipse cx="434" cy="90" rx="${f1(k * Math.sqrt(1 + .49))}" ry="${k}" class="f-plane"/>${txt(434, 138, 'ellipse', 'f-name')}
        ${pn(6, 158, 231, 'cone: parallel to base')}${pn(243, 158, 231, 'cone: down through the tip')}
        ${con(90, 274, p => ellD(ell(p, [0, 1, 0], rc), 'f-plane'))}
        <circle cx="172" cy="236" r="${f1(rc * k)}" class="f-plane"/>${txt(172, 290, 'a smaller circle', 'f-name')}
        ${con(327, 274, p => poly([[-1, 0, 0], [1, 0, 0], [0, HC, 0]].map(p), 'f-plane'))}
        ${poly([[409 - k, 236 + HC * k / 2], [409 + k, 236 + HC * k / 2], [409, 236 - HC * k / 2]], 'f-plane')}${txt(409, 290, 'triangle', 'f-name')}`);
    },

    /* ---------- solids3d ---------- */

    sphereFourCircles: () => {
      const p = cam(78, 112, 40), q = cam(410, 150, 38), C = p([0, 0, 0]), r = 40;
      const g = cylinder(q, [0, 0, 0], 1, 2, { ghost: true });
      return S('0 0 480 262', `<title>A sphere sliced through the middle gives a circle of area πr²; the surface area is four of those circles, and the sphere holds two thirds of the cylinder around it</title>
        ${txt(240, 22, 'slice through the middle: that circle, four times over, is the surface', 'f-cap')}
        ${sphere(p, [0, 0, 0], 1, { slice: 'f-plane' })}
        ${dot(C, 'f-hub', 2.6)}${seg(C, [C[0] + r, C[1]], 'f-line')}${txt(C[0] + r / 2, C[1] - 4, 'r', 'f-lab2')}
        ${txt(78, 186, 'the middle slice', 'f-lab3')}${txt(78, 204, 'area πr²', 'f-lab2')}
        ${ARR(128, 112, 152, 112)}
        ${[[204, 70], [290, 70], [204, 156], [290, 156]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" class="f-plane"/>` + txt(x, y + 4, 'πr²', 'f-name')).join('')}
        ${txt(247, 218, 'surface area = 4πr²', 'f-lab2')}
        ${g.hid}${g.lines}${sphere(q, [0, 1, 0], 1, { fill: 'f-face-b' })}
        ${txt(410, 186, 'volume ⁴⁄₃πr³', 'f-lab2')}${txt(410, 204, '= ⅔ of the cylinder', 'f-lab3')}${txt(410, 220, 'that just contains it', 'f-lab3')}
        ${txt(240, 252, 'cylinder: πr² × 2r = 2πr³, and ⅔ of 2πr³ is ⁴⁄₃πr³', 'f-lab3')}`);
    },

    /* ---------- measurement ---------- */

    yardFootSquareCube: () => {
      const u = 30, p = cam(326, 178, u), V = boxV(0, 0, 0, 3, 3, 3);
      const cube = solid(p, V, BOXF, boxCls('f-face-b', 'f-face-a', 'f-face-c'));
      let grid = '';
      for (const t of [1, 2]) {
        grid += seg(p([t, 0, 0]), p([t, 3, 0]), 'f-dim') + seg(p([0, t, 0]), p([3, t, 0]), 'f-dim');           // front
        grid += seg(p([t, 3, 0]), p([t, 3, 3]), 'f-dim') + seg(p([0, 3, t]), p([3, 3, t]), 'f-dim');           // top
        grid += seg(p([3, t, 0]), p([3, t, 3]), 'f-dim') + seg(p([3, 0, t]), p([3, 3, t]), 'f-dim');           // side
      }
      const sx = 162, sy = 88;
      return S('0 0 480 272', `<title>1 yard is 3 feet, so a square yard is 3 by 3, 9 square feet, and a cubic yard is 3 by 3 by 3, 27 cubic feet</title>
        ${txt(14, 22, '1 yard = 3 feet — but a square yard is not 3 square feet', 'f-cap', 'start')}
        ${seg([22, 178], [112, 178], 'f-line')}${[22, 52, 82, 112].map(x => seg([x, 171], [x, 185], 'f-dim')).join('')}
        ${[37, 67, 97].map(x => txt(x, 198, '1 ft', 'f-lab')).join('')}
        ${dimLine([112, 154], [22, 154], '1 yd', 0, 'f-lab2', 10)}
        ${[0, 1, 2].map(i => [0, 1, 2].map(j => `<rect x="${sx + i * u}" y="${sy + j * u}" width="${u}" height="${u}" class="f-tile"/>`).join('')).join('')}
        <rect x="${sx}" y="${sy}" width="${3 * u}" height="${3 * u}" class="f-edge"/>
        ${edgeLab([sx, sy + 3 * u], [sx + 3 * u, sy + 3 * u], '3 ft = 1 yd', 12)}${edgeLab([sx, sy], [sx, sy + 3 * u], '3 ft', 7)}
        ${cube.faces}${grid}${cube.edges}
        ${edgeLab(p(V[0]), p(V[1]), '3 ft', 12)}${edgeLab(p(V[3]), p(V[0]), '3 ft', 7)}${edgeLab(p(V[1]), p(V[5]), '3 ft', 8)}
        ${txt(67, 222, '1 yd = 3 ft', 'f-lab2')}${txt(67, 240, '× 3', 'f-lab3')}
        ${txt(207, 222, '1 yd² = 9 ft²', 'f-lab2')}${txt(207, 240, '3 × 3 = 3²', 'f-lab3')}
        ${txt(392, 222, '1 yd³ = 27 ft³', 'f-lab2')}${txt(392, 240, '3 × 3 × 3 = 3³', 'f-lab3')}
        ${txt(240, 264, 'metres the same way: 1 m = 100 cm, so 1 m² = 10,000 cm² and 1 m³ = 1,000,000 cm³', 'f-lab3')}`);
    }
  });
})();
