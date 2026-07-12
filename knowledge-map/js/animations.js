/* ============================================================================
   Knowledge Map — Animation Library
   Self-contained, offline, dependency-free interactive SVG/canvas visuals.
   Usage:  AnimLib.render("photosynthesis", containerEl, {caption, alt})
   Every builder returns a cleanup() function to stop timers/RAF loops.
   ========================================================================== */
(function () {
  "use strict";

  const SVGNS = "http://www.w3.org/2000/svg";
  const rafs = new WeakMap();

  /* ---- tiny SVG helpers ---------------------------------------------------*/
  function S(tag, attrs, kids) {
    const e = document.createElementNS(SVGNS, tag);
    if (attrs) for (const k in attrs) {
      if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
      if (c) e.appendChild(c);
    });
    return e;
  }
  function svg(w, h, kids) {
    const s = S("svg", {
      viewBox: "0 0 " + w + " " + h,
      class: "anim-svg",
      preserveAspectRatio: "xMidYMid meet",
      role: "img"
    }, kids);
    return s;
  }
  function txt(x, y, str, attrs) {
    return S("text", Object.assign({ x: x, y: y, "text-anchor": "middle",
      "font-family": "system-ui,sans-serif" }, attrs || {}), null) &&
      (function (t) { t.textContent = str; return t; })(S("text",
        Object.assign({ x: x, y: y, "text-anchor": "middle",
          "font-family": "ui-sans-serif,system-ui,sans-serif" }, attrs || {})));
  }
  function ctrlBar() { const d = document.createElement("div"); d.className = "anim-controls"; return d; }
  function button(label, onClick) {
    const b = document.createElement("button");
    b.className = "anim-btn"; b.type = "button"; b.textContent = label;
    b.addEventListener("click", onClick); return b;
  }
  function slider(min, max, val, step, onInput) {
    const i = document.createElement("input");
    i.type = "range"; i.min = min; i.max = max; i.value = val; i.step = step;
    i.className = "anim-slider";
    i.addEventListener("input", function () { onInput(parseFloat(i.value)); });
    return i;
  }
  function label(t) { const s = document.createElement("span"); s.className = "anim-label"; s.textContent = t; return s; }
  const C = {
    ink: "var(--anim-ink)", sky: "#5aa9e6", water: "#2d9cdb", sun: "#ffcf3f",
    leaf: "#4caf50", soil: "#8d6e63", rock: "#78909c", magma: "#ff7043",
    energy: "#ff9800", cell: "#b3e5fc", nucleus: "#7e57c2", membrane: "#26a69a",
    red: "#ef5350", blue: "#42a5f5", green: "#66bb6a", purple: "#ab47bc",
    orange: "#ffa726", pink: "#ec407a", grey: "#90a4ae", gold: "#fbc02d"
  };

  /* ==========================================================================
     REGISTRY
     ========================================================================== */
  const B = {}; // builders: key -> function(container, opts) -> cleanup

  /* ---------- States of Matter --------------------------------------------*/
  B.statesOfMatter = function (host) {
    let state = "solid", raf, t = 0;
    const s = svg(420, 260);
    const box = S("rect", { x: 40, y: 40, width: 340, height: 180, rx: 10,
      fill: "none", stroke: C.grey, "stroke-width": 2 });
    s.appendChild(box);
    const N = 36, parts = [];
    for (let i = 0; i < N; i++) {
      const c = S("circle", { r: 8, fill: C.blue, opacity: 0.9 });
      s.appendChild(c);
      parts.push({ el: c, hx: 60 + (i % 6) * 55, hy: 65 + Math.floor(i / 6) * 27,
        vx: (Math.random() - 0.5), vy: (Math.random() - 0.5), x: 0, y: 0 });
    }
    const cap = S("text", { x: 210, y: 245, "text-anchor": "middle",
      fill: C.ink, "font-size": 15, "font-weight": 600 });
    cap.textContent = "SOLID — particles vibrate in place";
    s.appendChild(cap);
    host.appendChild(s);
    function step() {
      t += 0.05;
      parts.forEach(function (p, i) {
        if (state === "solid") {
          p.x = p.hx + Math.sin(t * 3 + i) * 2.2;
          p.y = p.hy + Math.cos(t * 3 + i * 1.3) * 2.2;
        } else if (state === "liquid") {
          p.x += p.vx * 1.4; p.y += p.vy * 1.4;
          if (p.x < 52 || p.x > 368) p.vx *= -1;
          if (p.y < 120 || p.y > 208) p.vy *= -1;   // liquid settles lower half
          p.x = Math.max(52, Math.min(368, p.x));
          p.y = Math.max(120, Math.min(208, p.y));
        } else {
          p.x += p.vx * 3.2; p.y += p.vy * 3.2;
          if (p.x < 52 || p.x > 368) p.vx *= -1;
          if (p.y < 52 || p.y > 208) p.vy *= -1;
          p.x = Math.max(52, Math.min(368, p.x));
          p.y = Math.max(52, Math.min(208, p.y));
        }
        p.el.setAttribute("cx", p.x); p.el.setAttribute("cy", p.y);
      });
      raf = requestAnimationFrame(step);
    }
    parts.forEach(function (p) { p.x = p.hx; p.y = p.hy; });
    step();
    const bar = ctrlBar();
    [["Solid", "solid", C.blue, "vibrate in place"],
     ["Liquid", "liquid", C.water, "slide past each other"],
     ["Gas", "gas", C.red, "fly freely & fill the space"]].forEach(function (o) {
      bar.appendChild(button(o[0], function () {
        state = o[1];
        parts.forEach(function (p) { p.el.setAttribute("fill", o[2]); });
        cap.textContent = o[0].toUpperCase() + " — particles " + o[3];
      }));
    });
    host.appendChild(bar);
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- Photosynthesis ----------------------------------------------*/
  B.photosynthesis = function (host) {
    const s = svg(460, 300);
    s.appendChild(S("rect", { x: 0, y: 0, width: 460, height: 300, fill: "none" }));
    // sun
    const sun = S("circle", { cx: 70, cy: 60, r: 30, fill: C.sun });
    s.appendChild(sun);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      s.appendChild(S("line", { x1: 70 + Math.cos(a) * 34, y1: 60 + Math.sin(a) * 34,
        x2: 70 + Math.cos(a) * 46, y2: 60 + Math.sin(a) * 46, stroke: C.sun, "stroke-width": 3,
        "stroke-linecap": "round" }));
    }
    // plant
    s.appendChild(S("rect", { x: 218, y: 150, width: 10, height: 110, fill: C.leaf }));
    s.appendChild(S("ellipse", { cx: 190, cy: 160, rx: 44, ry: 22, fill: C.leaf, transform: "rotate(-20 190 160)" }));
    s.appendChild(S("ellipse", { cx: 256, cy: 160, rx: 44, ry: 22, fill: "#43a047", transform: "rotate(20 256 160)" }));
    s.appendChild(S("path", { d: "M200 260 q23 -20 46 0 q-23 12 -46 0 z", fill: C.soil }));
    // reactant labels
    function tag(x, y, t, col) {
      const g = S("g", null);
      g.appendChild(S("rect", { x: x - 42, y: y - 15, width: 84, height: 26, rx: 13, fill: col, opacity: 0.15 }));
      const tt = S("text", { x: x, y: y + 3, "text-anchor": "middle", fill: col, "font-size": 13, "font-weight": 700 });
      tt.textContent = t; g.appendChild(tt); return g;
    }
    s.appendChild(tag(70, 130, "Sunlight", C.orange));
    s.appendChild(tag(110, 235, "H₂O (roots)", C.water));
    s.appendChild(tag(390, 210, "CO₂ (air)", C.grey));
    s.appendChild(tag(390, 90, "O₂ out", C.green));
    s.appendChild(tag(300, 120, "Glucose (C₆H₁₂O₆)", C.gold));
    // moving particles
    const flows = [
      { path: [[110, 222], [216, 190]], col: C.water },   // water up
      { path: [[352, 205], [235, 175]], col: C.grey },    // CO2 in
      { path: [[80, 95], [210, 155]], col: C.orange },    // light in
      { path: [[240, 150], [372, 100]], col: C.green },   // O2 out
    ];
    const dots = flows.map(function (f) {
      const d = S("circle", { r: 5, fill: f.col });
      s.appendChild(d); return d;
    });
    const eq = S("text", { x: 230, y: 292, "text-anchor": "middle", fill: C.ink,
      "font-size": 13, "font-weight": 600 });
    eq.textContent = "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂";
    s.appendChild(eq);
    host.appendChild(s);
    let t = 0, raf;
    function step() {
      t = (t + 0.012) % 1;
      flows.forEach(function (f, i) {
        const p = f.path, k = t;
        dots[i].setAttribute("cx", p[0][0] + (p[1][0] - p[0][0]) * k);
        dots[i].setAttribute("cy", p[0][1] + (p[1][1] - p[0][1]) * k);
        dots[i].setAttribute("opacity", Math.sin(k * Math.PI));
      });
      raf = requestAnimationFrame(step);
    }
    step();
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- Water Cycle --------------------------------------------------*/
  B.waterCycle = function (host) {
    const s = svg(460, 300);
    s.appendChild(S("rect", { x: 0, y: 210, width: 460, height: 90, fill: C.water, opacity: 0.7 }));
    s.appendChild(S("path", { d: "M0 210 q60 -40 120 -10 q60 30 120 -5 q60 -30 120 5 q60 25 100 -5 v110 H0 Z",
      fill: C.water, opacity: 0.35 }));
    // mountain + sun
    s.appendChild(S("polygon", { points: "300,210 380,90 460,210", fill: C.rock }));
    s.appendChild(S("polygon", { points: "352,132 380,90 408,132", fill: "#eceff1" }));
    s.appendChild(S("circle", { cx: 60, cy: 55, r: 26, fill: C.sun }));
    // cloud
    const cloud = S("g", null);
    ["70,26", "36,10", "-4,26"].forEach(function () {});
    [[130, 90, 30], [165, 80, 34], [200, 92, 26]].forEach(function (c) {
      cloud.appendChild(S("ellipse", { cx: c[0], cy: c[1], rx: c[2], ry: c[2] * 0.7, fill: "#eceff1" }));
    });
    s.appendChild(cloud);
    // arrows + labels
    function lbl(x, y, t, col) {
      const tt = S("text", { x: x, y: y, "text-anchor": "middle", fill: col || C.ink,
        "font-size": 12, "font-weight": 700 }); tt.textContent = t; return tt;
    }
    s.appendChild(lbl(70, 150, "Evaporation ↑", C.orange));
    s.appendChild(lbl(255, 55, "Condensation", C.sky));
    s.appendChild(lbl(300, 150, "↓ Precipitation", C.water));
    s.appendChild(lbl(380, 200, "Collection →", C.leaf));
    // particles rising (evap) and falling (rain)
    const evap = [], rain = [];
    for (let i = 0; i < 6; i++) {
      const e = S("circle", { r: 4, fill: C.orange, opacity: 0.8 }); s.appendChild(e);
      evap.push({ el: e, x: 40 + i * 12, y: 210, sp: 0.6 + Math.random() });
      const r = S("line", { x1: 0, y1: 0, x2: 0, y2: 8, stroke: C.water, "stroke-width": 2, "stroke-linecap": "round" });
      s.appendChild(r); rain.push({ el: r, x: 150 + i * 12, y: 110 + Math.random() * 30 });
    }
    host.appendChild(s);
    let raf;
    function step() {
      evap.forEach(function (p) {
        p.y -= p.sp; if (p.y < 100) { p.y = 210; p.x = 40 + Math.random() * 60; }
        p.el.setAttribute("cx", p.x); p.el.setAttribute("cy", p.y);
        p.el.setAttribute("opacity", (p.y - 100) / 110);
      });
      rain.forEach(function (p) {
        p.y += 3; if (p.y > 205) { p.y = 108; p.x = 140 + Math.random() * 70; }
        p.el.setAttribute("x1", p.x); p.el.setAttribute("y1", p.y);
        p.el.setAttribute("x2", p.x); p.el.setAttribute("y2", p.y + 8);
      });
      raf = requestAnimationFrame(step);
    }
    step();
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- Animal / Plant Cell -----------------------------------------*/
  function cellBuilder(plant) {
    return function (host) {
      const s = svg(440, 320);
      const info = document.createElement("div");
      info.className = "anim-readout";
      info.textContent = "Tap a labeled part to learn what it does.";
      const parts = plant ? [
        ["Cell wall", 220, 30, "Rigid outer layer that supports & protects the plant cell."],
        ["Chloroplast", 130, 150, "Where photosynthesis happens — captures light to make food."],
        ["Large vacuole", 250, 170, "Big storage sac for water; keeps the cell firm."],
        ["Nucleus", 300, 110, "Control center holding DNA."],
        ["Mitochondrion", 160, 240, "Powerhouse — releases energy from food."]
      ] : [
        ["Cell membrane", 220, 22, "Flexible boundary controlling what enters/leaves."],
        ["Nucleus", 220, 160, "Control center holding DNA."],
        ["Mitochondrion", 140, 230, "Powerhouse — releases energy from food."],
        ["Ribosome", 320, 210, "Builds proteins."],
        ["Cytoplasm", 320, 110, "Jelly-like fluid where parts float."]
      ];
      if (plant) s.appendChild(S("rect", { x: 30, y: 30, width: 380, height: 260, rx: 14, fill: "#c8e6c9", stroke: C.leaf, "stroke-width": 6 }));
      s.appendChild(S(plant ? "rect" : "ellipse", plant
        ? { x: 42, y: 42, width: 356, height: 236, rx: 8, fill: C.cell }
        : { cx: 220, cy: 160, rx: 190, ry: 128, fill: C.cell, stroke: C.membrane, "stroke-width": 5 }));
      // nucleus
      s.appendChild(S("circle", { cx: plant ? 300 : 220, cy: plant ? 110 : 160, r: 40, fill: C.nucleus, opacity: 0.85 }));
      s.appendChild(S("circle", { cx: plant ? 300 : 220, cy: plant ? 110 : 160, r: 16, fill: "#4a148c" }));
      // mitochondria
      [[140, 230], [160, 240]].slice(0, 1).forEach(function () {});
      s.appendChild(S("ellipse", { cx: plant ? 160 : 140, cy: plant ? 240 : 230, rx: 34, ry: 18, fill: C.red, opacity: 0.8 }));
      if (plant) {
        [[130, 150], [190, 200], [110, 210]].forEach(function (c) {
          s.appendChild(S("ellipse", { cx: c[0], cy: c[1], rx: 20, ry: 12, fill: C.leaf }));
        });
        s.appendChild(S("ellipse", { cx: 250, cy: 175, rx: 55, ry: 45, fill: C.water, opacity: 0.35 }));
      } else {
        [[320, 210], [280, 235], [300, 130]].forEach(function (c) {
          s.appendChild(S("circle", { cx: c[0], cy: c[1], r: 6, fill: C.purple }));
        });
      }
      // clickable hotspots + labels
      parts.forEach(function (p) {
        const g = S("g", { class: "anim-hotspot", style: "cursor:pointer" });
        const dot = S("circle", { cx: p[1], cy: p[2], r: 9, fill: "#fff", stroke: C.ink, "stroke-width": 2 });
        const t = S("text", { x: p[1], y: p[2] + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: C.ink });
        t.textContent = "?";
        g.appendChild(dot); g.appendChild(t);
        g.addEventListener("click", function () {
          info.innerHTML = "<b>" + p[0] + "</b> — " + p[3];
          s.querySelectorAll(".anim-hotspot circle").forEach(function (c) { c.setAttribute("fill", "#fff"); });
          dot.setAttribute("fill", C.sun);
        });
        s.appendChild(g);
      });
      host.appendChild(s); host.appendChild(info);
      return function () {};
    };
  }
  B.animalCell = cellBuilder(false);
  B.plantCell = cellBuilder(true);

  /* ---------- Mitosis stepper ---------------------------------------------*/
  B.mitosis = function (host) {
    const phases = [
      ["Interphase", "Cell grows and copies its DNA."],
      ["Prophase", "Chromosomes condense; nuclear membrane breaks down."],
      ["Metaphase", "Chromosomes line up in the middle."],
      ["Anaphase", "Sister chromatids pull to opposite ends."],
      ["Telophase", "Two new nuclei form."],
      ["Cytokinesis", "Cytoplasm splits → two identical cells."]
    ];
    let i = 0;
    const s = svg(420, 240);
    const cell = S("ellipse", { cx: 210, cy: 110, rx: 150, ry: 92, fill: C.cell, stroke: C.membrane, "stroke-width": 4 });
    s.appendChild(cell);
    const chrom = S("g", null); s.appendChild(chrom);
    const name = S("text", { x: 210, y: 210, "text-anchor": "middle", fill: C.ink, "font-size": 18, "font-weight": 800 });
    s.appendChild(name);
    const desc = document.createElement("div"); desc.className = "anim-readout";
    function draw() {
      while (chrom.firstChild) chrom.removeChild(chrom.firstChild);
      const p = phases[i];
      name.textContent = p[0]; desc.innerHTML = "<b>" + p[0] + "</b> — " + p[1];
      function bar(x, y, col, rot) {
        chrom.appendChild(S("rect", { x: x - 5, y: y - 22, width: 10, height: 44, rx: 5, fill: col,
          transform: "rotate(" + (rot || 0) + " " + x + " " + y + ")" }));
      }
      if (i <= 1) { bar(170, 110, C.red, 30); bar(250, 110, C.blue, -20); }
      else if (i === 2) { bar(205, 90, C.red); bar(215, 90, C.red); bar(205, 140, C.blue); bar(215, 140, C.blue); }
      else if (i >= 3 && i <= 4) { bar(120, 90, C.red); bar(300, 90, C.red); bar(120, 140, C.blue); bar(300, 140, C.blue);
        if (i === 4) { chrom.appendChild(S("ellipse", { cx: 120, cy: 110, rx: 30, ry: 40, fill: "none", stroke: C.membrane, "stroke-dasharray": "4 3" }));
          chrom.appendChild(S("ellipse", { cx: 300, cy: 110, rx: 30, ry: 40, fill: "none", stroke: C.membrane, "stroke-dasharray": "4 3" })); } }
      else { cell.setAttribute("opacity", 0.3);
        chrom.appendChild(S("ellipse", { cx: 120, cy: 110, rx: 70, ry: 60, fill: C.cell, stroke: C.membrane, "stroke-width": 4 }));
        chrom.appendChild(S("ellipse", { cx: 300, cy: 110, rx: 70, ry: 60, fill: C.cell, stroke: C.membrane, "stroke-width": 4 }));
        bar(120, 110, C.red); bar(300, 110, C.blue); }
      if (i !== 5) cell.setAttribute("opacity", 1);
    }
    draw(); host.appendChild(s); host.appendChild(desc);
    const bar = ctrlBar();
    bar.appendChild(button("◀ Prev", function () { i = (i + 5) % 6; draw(); }));
    bar.appendChild(button("Next ▶", function () { i = (i + 1) % 6; draw(); }));
    host.appendChild(bar);
    return function () {};
  };

  /* ---------- DNA helix ----------------------------------------------------*/
  B.dnaHelix = function (host) {
    const s = svg(300, 320); const g = S("g", null); s.appendChild(g);
    const rungs = 14, cols = { A: C.red, T: C.orange, G: C.green, C: C.blue };
    const pairs = [["A", "T"], ["T", "A"], ["G", "C"], ["C", "G"]];
    const rows = [];
    for (let i = 0; i < rungs; i++) {
      const y = 20 + i * 20;
      const p = pairs[i % 4];
      const rung = S("g", null);
      const l = S("circle", { r: 7, cy: y, fill: cols[p[0]] });
      const r = S("circle", { r: 7, cy: y, fill: cols[p[1]] });
      const bar = S("line", { y1: y, y2: y, stroke: C.grey, "stroke-width": 3 });
      rung.appendChild(bar); rung.appendChild(l); rung.appendChild(r);
      g.appendChild(rung); rows.push({ y: y, l: l, r: r, bar: bar, ph: i * 0.5 });
    }
    host.appendChild(s);
    const leg = document.createElement("div"); leg.className = "anim-readout";
    leg.innerHTML = "Base pairs: <b style='color:" + C.red + "'>A</b>–<b style='color:" + C.orange + "'>T</b> and <b style='color:" + C.green + "'>G</b>–<b style='color:" + C.blue + "'>C</b>. The two strands twist into a double helix.";
    host.appendChild(leg);
    let t = 0, raf;
    function step() {
      t += 0.03;
      rows.forEach(function (row) {
        const a = t + row.ph;
        const lx = 150 + Math.sin(a) * 70, rx = 150 - Math.sin(a) * 70;
        row.l.setAttribute("cx", lx); row.r.setAttribute("cx", rx);
        row.bar.setAttribute("x1", lx); row.bar.setAttribute("x2", rx);
        const sc = 0.5 + 0.5 * Math.abs(Math.cos(a));
        row.l.setAttribute("r", 4 + sc * 4); row.r.setAttribute("r", 4 + sc * 4);
      });
      raf = requestAnimationFrame(step);
    }
    step();
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- Punnett square ----------------------------------------------*/
  B.punnettSquare = function (host) {
    let p1 = "Bb", p2 = "Bb";
    const wrap = document.createElement("div");
    const s = svg(300, 300);
    host.appendChild(s);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function alleles(g) { return [g[0], g[1]]; }
    function draw() {
      while (s.firstChild) s.removeChild(s.firstChild);
      const a = alleles(p1), b = alleles(p2);
      // grid
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        if (r === 0 && c === 0) continue;
        s.appendChild(S("rect", { x: 40 + c * 80, y: 40 + r * 80, width: 80, height: 80,
          fill: (r > 0 && c > 0) ? "#fff" : "#eef", stroke: C.ink, "stroke-width": 1.5 }));
      }
      function put(x, y, str, col) { const t = S("text", { x: x, y: y, "text-anchor": "middle",
        "font-size": 26, "font-weight": 800, fill: col || C.ink }); t.textContent = str; s.appendChild(t); }
      put(80 + 0, 30, "", ); // header handled below
      // parent labels
      a.forEach(function (al, c) { put(40 + (c + 1) * 80 + 40, 70, al, C.blue); });
      b.forEach(function (al, r) { put(80, 40 + (r + 1) * 80 + 45, al, C.red); });
      const counts = {};
      for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
        let geno = [a[c], b[r]].sort(function (x, y) {
          const xl = x === x.toUpperCase(); const yl = y === y.toUpperCase();
          return xl === yl ? 0 : (xl ? -1 : 1); }).join("");
        counts[geno] = (counts[geno] || 0) + 1;
        put(40 + (c + 1) * 80 + 40, 40 + (r + 1) * 80 + 48, geno,
          geno[0] === geno[0].toUpperCase() && geno.indexOf(geno[0].toLowerCase()) < 0 ? C.purple :
          (geno[0].toLowerCase() === geno[1] || geno[1] === geno[1].toUpperCase() ? C.ink : C.grey));
      }
      const dom = Object.keys(counts).filter(function (k) { return /[A-Z]/.test(k); }).reduce(function (a, k) { return a + counts[k]; }, 0);
      readout.innerHTML = "Offspring genotypes: " + Object.keys(counts).map(function (k) { return "<b>" + k + "</b>×" + counts[k]; }).join(", ") +
        ". About <b>" + dom + " in 4</b> show the dominant trait.";
    }
    draw();
    const bar = ctrlBar();
    [["Parent 1", function (v) { p1 = v; }, p1], ["Parent 2", function (v) { p2 = v; }, p2]].forEach(function (o) {
      const sel = document.createElement("select"); sel.className = "anim-btn";
      ["BB", "Bb", "bb"].forEach(function (g) { const op = document.createElement("option"); op.value = g; op.textContent = o[0] + ": " + g; sel.appendChild(op); });
      sel.value = o[2];
      sel.addEventListener("change", function () { o[1](sel.value); draw(); });
      bar.appendChild(sel);
    });
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  /* ---------- Food web / energy pyramid -----------------------------------*/
  B.foodWeb = function (host) {
    const s = svg(440, 300);
    const nodes = {
      grass: [70, 250, "🌱 Grass", C.leaf], rabbit: [70, 130, "🐰 Rabbit", C.orange],
      grasshopper: [200, 250, "🦗 Grasshopper", C.green], bird: [200, 130, "🐦 Bird", C.sky],
      fox: [340, 190, "🦊 Fox", C.red], hawk: [340, 60, "🦅 Hawk", C.purple]
    };
    const edges = [["grass", "rabbit"], ["grass", "grasshopper"], ["grasshopper", "bird"],
      ["rabbit", "fox"], ["bird", "fox"], ["rabbit", "hawk"], ["bird", "hawk"], ["fox", "hawk"]];
    s.appendChild(S("defs", null, S("marker", { id: "arw", markerWidth: 8, markerHeight: 8, refX: 7, refY: 4, orient: "auto" },
      S("path", { d: "M0 0 L8 4 L0 8 Z", fill: C.grey }))));
    edges.forEach(function (e) {
      const a = nodes[e[0]], b = nodes[e[1]];
      s.appendChild(S("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: C.grey, "stroke-width": 2, "marker-end": "url(#arw)", opacity: 0.6 }));
    });
    Object.keys(nodes).forEach(function (k) {
      const n = nodes[k];
      s.appendChild(S("circle", { cx: n[0], cy: n[1], r: 26, fill: n[3], opacity: 0.25, stroke: n[3], "stroke-width": 2 }));
      const t = S("text", { x: n[0], y: n[1] + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: C.ink });
      t.textContent = n[2]; s.appendChild(t);
    });
    host.appendChild(s);
    const r = document.createElement("div"); r.className = "anim-readout";
    r.innerHTML = "Arrows point in the direction <b>energy flows</b> — from the organism being eaten to the one eating it.";
    host.appendChild(r);
    return function () {};
  };

  B.energyPyramid = function (host) {
    const s = svg(420, 300);
    const levels = [
      ["Producers", "10,000 units", C.leaf, 340],
      ["Primary consumers", "1,000 units", C.green, 260],
      ["Secondary consumers", "100 units", C.orange, 180],
      ["Tertiary consumers", "10 units", C.red, 100]
    ];
    levels.forEach(function (lv, i) {
      const y = 250 - i * 55, w = lv[3], x = 210 - w / 2;
      s.appendChild(S("polygon", { points: [x, y, x + w, y, x + w - 40, y - 50, x + 40, y - 50].join(" "), fill: lv[2], opacity: 0.85 }));
      const t = S("text", { x: 210, y: y - 18, "text-anchor": "middle", fill: "#fff", "font-size": 13, "font-weight": 800 });
      t.textContent = lv[0]; s.appendChild(t);
      const e = S("text", { x: 210, y: y - 4, "text-anchor": "middle", fill: "#fff", "font-size": 11 });
      e.textContent = lv[1]; s.appendChild(e);
    });
    host.appendChild(s);
    const r = document.createElement("div"); r.className = "anim-readout";
    r.innerHTML = "Only about <b>10%</b> of energy passes to the next level — the rest is used for life or lost as heat.";
    host.appendChild(r);
    return function () {};
  };

  /* ---------- Atom (Bohr) --------------------------------------------------*/
  B.atomBohr = function (host) {
    let Z = 6; // carbon
    const names = { 1: "Hydrogen", 2: "Helium", 3: "Lithium", 6: "Carbon", 8: "Oxygen", 11: "Sodium", 17: "Chlorine" };
    const s = svg(340, 320); host.appendChild(s);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    let raf, t = 0, electrons = [];
    function config(z) { const shells = [2, 8, 8]; const out = []; let left = z;
      for (let i = 0; i < shells.length && left > 0; i++) { out.push(Math.min(shells[i], left)); left -= shells[i]; } return out; }
    function draw() {
      while (s.firstChild) s.removeChild(s.firstChild);
      const shells = config(Z); electrons = [];
      shells.forEach(function (cnt, si) {
        const rad = 45 + si * 40;
        s.appendChild(S("circle", { cx: 170, cy: 150, r: rad, fill: "none", stroke: C.grey, "stroke-width": 1, opacity: 0.5 }));
        for (let k = 0; k < cnt; k++) electrons.push({ r: rad, a: (k / cnt) * Math.PI * 2, sp: 0.02 - si * 0.004 });
      });
      s.appendChild(S("circle", { cx: 170, cy: 150, r: 26, fill: C.red, opacity: 0.85 }));
      const nl = S("text", { x: 170, y: 155, "text-anchor": "middle", fill: "#fff", "font-size": 13, "font-weight": 800 });
      nl.textContent = Z + "p"; s.appendChild(nl);
      electrons.forEach(function () {});
      electrons.forEach(function (e) { e.el = S("circle", { r: 6, fill: C.blue }); s.appendChild(e.el); });
      readout.innerHTML = "<b>" + (names[Z] || "Element " + Z) + "</b> — " + Z + " protons, electron shells: " + config(Z).join(", ") + ".";
    }
    draw();
    function step() { t += 1; electrons.forEach(function (e) {
      const ang = e.a + t * e.sp; e.el.setAttribute("cx", 170 + Math.cos(ang) * e.r); e.el.setAttribute("cy", 150 + Math.sin(ang) * e.r); });
      raf = requestAnimationFrame(step); }
    step();
    const bar = ctrlBar();
    [1, 2, 3, 6, 8, 11, 17].forEach(function (z) { bar.appendChild(button(names[z], function () { Z = z; draw(); })); });
    host.appendChild(bar); host.appendChild(readout);
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- pH scale -----------------------------------------------------*/
  B.phScale = function (host) {
    const s = svg(440, 170); host.appendChild(s);
    const cols = ["#e53935", "#fb8c00", "#fdd835", "#c0ca33", "#7cb342", "#43a047",
      "#00897b", "#00acc1", "#1e88e5", "#3949ab", "#5e35b1", "#8e24aa", "#6a1b9a", "#4a148c", "#311b92"];
    cols.forEach(function (c, i) { s.appendChild(S("rect", { x: 20 + i * 27, y: 40, width: 27, height: 40, fill: c })); });
    for (let i = 0; i <= 14; i++) { const t = S("text", { x: 20 + i * 27 + 13.5, y: 98, "text-anchor": "middle", "font-size": 11, fill: C.ink }); t.textContent = i; s.appendChild(t); }
    s.appendChild((function () { const t = S("text", { x: 60, y: 30, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: C.red }); t.textContent = "◀ Acidic"; return t; })());
    s.appendChild((function () { const t = S("text", { x: 380, y: 30, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: C.purple }); t.textContent = "Basic ▶"; return t; })());
    const marker = S("polygon", { points: "0,-8 8,4 -8,4", fill: C.ink });
    const mg = S("g", null); mg.appendChild(marker); s.appendChild(mg);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    const examples = { 0: "Battery acid", 2: "Lemon juice", 3: "Vinegar", 5: "Black coffee", 6: "Milk", 7: "Pure water (neutral)", 8: "Sea water", 9: "Baking soda", 11: "Ammonia", 13: "Bleach", 14: "Drain cleaner" };
    function set(v) { mg.setAttribute("transform", "translate(" + (20 + v * 27 + 13.5) + ",36)");
      let near = 7, best = 99; Object.keys(examples).forEach(function (k) { if (Math.abs(k - v) < best) { best = Math.abs(k - v); near = k; } });
      readout.innerHTML = "pH <b>" + v + "</b> — " + (v < 7 ? "acidic" : v > 7 ? "basic (alkaline)" : "neutral") + ". Around here: <b>" + examples[near] + "</b>."; }
    set(7);
    const bar = ctrlBar(); bar.appendChild(label("pH")); bar.appendChild(slider(0, 14, 7, 1, set));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  /* ---------- Chemical reaction (bonds) -----------------------------------*/
  B.chemicalReaction = function (host) {
    const s = svg(440, 220); host.appendChild(s);
    // 2H2 + O2 -> 2H2O
    function atom(x, y, r, col, lbl) { const g = S("g", null);
      g.appendChild(S("circle", { cx: x, cy: y, r: r, fill: col })); const t = S("text", { x: x, y: y + 5, "text-anchor": "middle", fill: "#fff", "font-weight": 800, "font-size": 14 }); t.textContent = lbl; g.appendChild(t); return g; }
    const stage = S("g", null); s.appendChild(stage);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    let reacted = false;
    function draw() {
      while (stage.firstChild) stage.removeChild(stage.firstChild);
      if (!reacted) {
        stage.appendChild(atom(60, 90, 16, C.grey, "H")); stage.appendChild(atom(95, 90, 16, C.grey, "H"));
        stage.appendChild(atom(60, 150, 16, C.grey, "H")); stage.appendChild(atom(95, 150, 16, C.grey, "H"));
        stage.appendChild(atom(180, 120, 22, C.red, "O")); stage.appendChild(atom(230, 120, 22, C.red, "O"));
        const t = S("text", { x: 220, y: 40, "text-anchor": "middle", fill: C.ink, "font-size": 15, "font-weight": 700 }); t.textContent = "Reactants: 2H₂ + O₂"; stage.appendChild(t);
      } else {
        [[110, 100], [300, 130]].forEach(function (c) {
          stage.appendChild(atom(c[0], c[1], 22, C.red, "O"));
          stage.appendChild(atom(c[0] - 30, c[1] - 22, 14, C.grey, "H"));
          stage.appendChild(atom(c[0] + 30, c[1] - 22, 14, C.grey, "H"));
        });
        const t = S("text", { x: 220, y: 40, "text-anchor": "middle", fill: C.green, "font-size": 15, "font-weight": 700 }); t.textContent = "Product: 2H₂O (water)"; stage.appendChild(t);
      }
    }
    draw();
    readout.innerHTML = "Atoms are <b>rearranged</b>, never created or destroyed — count them before and after!";
    const bar = ctrlBar(); bar.appendChild(button("React ▶ / Reset", function () { reacted = !reacted; draw(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  /* ---------- Forces & motion ---------------------------------------------*/
  B.forcesMotion = function (host) {
    let F = 4, raf, x = 60, v = 0;
    const s = svg(440, 220); host.appendChild(s);
    s.appendChild(S("line", { x1: 0, y1: 170, x2: 440, y2: 170, stroke: C.grey, "stroke-width": 3 }));
    const box = S("rect", { x: x, y: 130, width: 40, height: 40, rx: 6, fill: C.blue });
    s.appendChild(box);
    const arrow = S("line", { stroke: C.red, "stroke-width": 4, "marker-end": "url(#fmarw)" });
    s.appendChild(S("defs", null, S("marker", { id: "fmarw", markerWidth: 8, markerHeight: 8, refX: 6, refY: 4, orient: "auto" }, S("path", { d: "M0 0 L8 4 L0 8 Z", fill: C.red }))));
    s.appendChild(arrow);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function step() {
      const a = F / 2; v += a * 0.02; x += v;
      if (x > 400) { x = 400; v = -v * 0.4; } if (x < 0) { x = 0; v = -v * 0.4; }
      box.setAttribute("x", x);
      arrow.setAttribute("x1", x + 40); arrow.setAttribute("y1", 150);
      arrow.setAttribute("x2", x + 40 + F * 8); arrow.setAttribute("y2", 150);
      readout.innerHTML = "Force = <b>" + F + " N</b> → acceleration a = F/m = <b>" + (F / 2).toFixed(1) + " m/s²</b> (mass 2 kg). Newton's 2nd law: F = ma.";
      raf = requestAnimationFrame(step);
    }
    step();
    const bar = ctrlBar(); bar.appendChild(label("Push force")); bar.appendChild(slider(0, 10, 4, 1, function (v2) { F = v2; }));
    bar.appendChild(button("Reset", function () { x = 60; v = 0; }));
    host.appendChild(bar); host.appendChild(readout);
    return function () { cancelAnimationFrame(raf); };
  };

  B.newtonsCradle = function (host) {
    const s = svg(360, 240); host.appendChild(s);
    s.appendChild(S("line", { x1: 40, y1: 40, x2: 320, y2: 40, stroke: C.ink, "stroke-width": 4 }));
    const balls = []; const n = 5, R = 18, base = 110;
    for (let i = 0; i < n; i++) { const x = base + i * (R * 2 + 2);
      const str = S("line", { x1: x, y1: 42, x2: x, y2: 160, stroke: C.grey, "stroke-width": 1.5 });
      const c = S("circle", { cx: x, cy: 178, r: R, fill: C.rock, stroke: C.ink, "stroke-width": 1.5 });
      s.appendChild(str); s.appendChild(c); balls.push({ x0: x, str: str, c: c }); }
    let t = 0, raf;
    function step() { t += 0.06; const sw = Math.sin(t);
      const first = balls[0], last = balls[n - 1];
      const swing = 55 * Math.max(0, -Math.cos(t));
      const left = sw < 0 ? swing : 0, right = sw > 0 ? swing : 0;
      function place(b, dx) { const ang = dx / 120; const px = b.x0 + Math.sin(ang) * 0 + dx; const py = 178 - (1 - Math.cos(dx / 120)) * 0;
        b.c.setAttribute("cx", b.x0 + dx); b.c.setAttribute("cy", 178 - Math.abs(dx) * 0.15);
        b.str.setAttribute("x2", b.x0 + dx); b.str.setAttribute("y2", 160 - Math.abs(dx) * 0.12); }
      place(first, -left); place(last, right);
      raf = requestAnimationFrame(step); }
    step();
    const r = document.createElement("div"); r.className = "anim-readout";
    r.innerHTML = "Momentum & energy pass straight through the middle balls — conservation of momentum in action.";
    host.appendChild(r);
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- Waves --------------------------------------------------------*/
  function waveBuilder(longitudinal) {
    return function (host) {
      let amp = 30, freq = 2, raf, t = 0;
      const s = svg(440, 200); host.appendChild(s);
      const g = S("g", null); s.appendChild(g);
      const readout = document.createElement("div"); readout.className = "anim-readout";
      const pts = 60;
      function step() {
        t += 0.05; while (g.firstChild) g.removeChild(g.firstChild);
        if (!longitudinal) {
          let d = "M0 100";
          for (let i = 0; i <= pts; i++) { const x = i / pts * 440; const y = 100 - amp * Math.sin((i / pts) * freq * Math.PI * 2 - t * 2); d += " L" + x.toFixed(1) + " " + y.toFixed(1); }
          g.appendChild(S("path", { d: d, fill: "none", stroke: C.blue, "stroke-width": 3 }));
        } else {
          for (let i = 0; i < 40; i++) { const base = i / 40 * 440;
            const off = amp * 0.5 * Math.sin((i / 40) * freq * Math.PI * 2 - t * 2);
            g.appendChild(S("circle", { cx: base + off, cy: 100, r: 5, fill: C.purple })); }
        }
        readout.innerHTML = "Amplitude = <b>" + amp + "</b> (loudness/brightness), wavelength shorter = higher frequency = higher pitch/energy.";
        raf = requestAnimationFrame(step);
      }
      step();
      const bar = ctrlBar();
      bar.appendChild(label("Amplitude")); bar.appendChild(slider(5, 45, 30, 1, function (v) { amp = v; }));
      bar.appendChild(label("Frequency")); bar.appendChild(slider(1, 6, 2, 1, function (v) { freq = v; }));
      host.appendChild(bar); host.appendChild(readout);
      return function () { cancelAnimationFrame(raf); };
    };
  }
  B.waveTransverse = waveBuilder(false);
  B.waveLongitudinal = waveBuilder(true);

  B.emSpectrum = function (host) {
    const s = svg(440, 160); host.appendChild(s);
    const bands = [["Radio", "#546e7a"], ["Micro", "#00897b"], ["IR", "#e53935"], ["Visible", "url(#rain)"], ["UV", "#8e24aa"], ["X-ray", "#3949ab"], ["Gamma", "#212121"]];
    s.appendChild(S("defs", null, (function () { const lg = S("linearGradient", { id: "rain" });
      ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa"].forEach(function (c, i) { lg.appendChild(S("stop", { offset: (i / 5 * 100) + "%", "stop-color": c })); }); return lg; })()));
    bands.forEach(function (b, i) { const x = 20 + i * 58;
      s.appendChild(S("rect", { x: x, y: 40, width: 58, height: 40, fill: b[1] }));
      const t = S("text", { x: x + 29, y: 100, "text-anchor": "middle", "font-size": 11, fill: C.ink, "font-weight": 600 }); t.textContent = b[0]; s.appendChild(t); });
    s.appendChild((function () { const t = S("text", { x: 40, y: 30, "font-size": 11, fill: C.ink }); t.textContent = "◀ longer wavelength, lower energy"; return t; })());
    s.appendChild((function () { const t = S("text", { x: 300, y: 30, "font-size": 11, fill: C.ink }); t.textContent = "higher energy ▶"; return t; })());
    host.appendChild(s);
    const r = document.createElement("div"); r.className = "anim-readout";
    r.innerHTML = "Visible light is a tiny slice of the whole electromagnetic spectrum.";
    host.appendChild(r);
    return function () {};
  };

  /* ---------- Simple circuit ----------------------------------------------*/
  B.simpleCircuit = function (host) {
    let on = false, raf, t = 0;
    const s = svg(360, 240); host.appendChild(s);
    const wire = "M80 60 H280 V180 H80 V60";
    s.appendChild(S("path", { d: wire, fill: "none", stroke: C.grey, "stroke-width": 5 }));
    // battery
    s.appendChild(S("rect", { x: 60, y: 105, width: 40, height: 30, fill: C.red })); const bt = S("text", { x: 80, y: 125, "text-anchor": "middle", fill: "#fff", "font-weight": 800 }); bt.textContent = "🔋"; s.appendChild(bt);
    // bulb
    const bulb = S("circle", { cx: 280, cy: 120, r: 20, fill: "#546e7a" }); s.appendChild(bulb);
    // switch
    const swline = S("line", { x1: 150, y1: 60, x2: 190, y2: 45, stroke: C.ink, "stroke-width": 5, "stroke-linecap": "round" }); s.appendChild(swline);
    s.appendChild(S("circle", { cx: 150, cy: 60, r: 4, fill: C.ink })); s.appendChild(S("circle", { cx: 200, cy: 60, r: 4, fill: C.ink }));
    const dots = []; for (let i = 0; i < 12; i++) { const d = S("circle", { r: 4, fill: C.gold, opacity: 0 }); s.appendChild(d); dots.push(d); }
    const readout = document.createElement("div"); readout.className = "anim-readout";
    // path param
    const segs = [[80, 60, 280, 60], [280, 60, 280, 180], [280, 180, 80, 180], [80, 180, 80, 60]];
    function ptAt(u) { const seg = Math.floor(u * 4) % 4; const f = (u * 4) % 1; const g = segs[seg]; return [g[0] + (g[2] - g[0]) * f, g[1] + (g[3] - g[1]) * f]; }
    function step() { t = (t + 0.004) % 1;
      dots.forEach(function (d, i) { const u = (t + i / 12) % 1; const p = ptAt(u); d.setAttribute("cx", p[0]); d.setAttribute("cy", p[1]); d.setAttribute("opacity", on ? 1 : 0); });
      raf = requestAnimationFrame(step); }
    step();
    function set() { swline.setAttribute("transform", on ? "rotate(15 150 60)" : "");
      swline.setAttribute("x2", on ? 200 : 190); swline.setAttribute("y2", on ? 60 : 45);
      bulb.setAttribute("fill", on ? C.sun : "#546e7a");
      readout.innerHTML = on ? "Circuit <b>closed</b> — electrons flow, the bulb lights up. ⚡" : "Circuit <b>open</b> — the gap stops the current, bulb is off.";
    }
    set();
    const bar = ctrlBar(); bar.appendChild(button("Flip switch", function () { on = !on; set(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- Plate tectonics ---------------------------------------------*/
  B.plateTectonics = function (host) {
    let mode = "convergent", raf, t = 0;
    const s = svg(440, 240); host.appendChild(s);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    const left = S("g", null), right = S("g", null); s.appendChild(left); s.appendChild(right);
    function plate(g, dir) { while (g.firstChild) g.removeChild(g.firstChild);
      g.appendChild(S("rect", { x: dir < 0 ? -220 : 220, y: 120, width: 220, height: 90, fill: C.rock }));
      g.appendChild(S("rect", { x: dir < 0 ? -220 : 220, y: 108, width: 220, height: 14, fill: C.leaf })); }
    plate(left, -1); plate(right, 1);
    s.appendChild(S("rect", { x: 0, y: 205, width: 440, height: 35, fill: C.magma, opacity: 0.7 }));
    function step() { t += 0.02; let dx = Math.sin(t) * 20;
      if (mode === "convergent") { left.setAttribute("transform", "translate(" + (20 + Math.abs(dx)) + ",0)"); right.setAttribute("transform", "translate(" + (-(20 + Math.abs(dx))) + ",0)"); }
      else if (mode === "divergent") { left.setAttribute("transform", "translate(" + (-20 - Math.abs(dx)) + ",0)"); right.setAttribute("transform", "translate(" + (20 + Math.abs(dx)) + ",0)"); }
      else { left.setAttribute("transform", "translate(0," + (dx * 0.6) + ")"); right.setAttribute("transform", "translate(0," + (-dx * 0.6) + ")"); }
      raf = requestAnimationFrame(step); }
    step();
    const texts = { convergent: "Convergent — plates collide, building mountains or subduction zones. 🏔️", divergent: "Divergent — plates pull apart, new crust forms (mid-ocean ridges). 🌋", transform: "Transform — plates slide past each other, causing earthquakes. 〰️" };
    function set() { readout.innerHTML = texts[mode]; }
    set();
    const bar = ctrlBar(); ["convergent", "divergent", "transform"].forEach(function (m) { bar.appendChild(button(m[0].toUpperCase() + m.slice(1), function () { mode = m; set(); })); });
    host.appendChild(bar); host.appendChild(readout);
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- Rock cycle ---------------------------------------------------*/
  B.rockCycle = function (host) {
    const s = svg(360, 320); host.appendChild(s);
    const nodes = { Igneous: [180, 50, C.magma], Sedimentary: [300, 230, C.gold], Metamorphic: [60, 230, C.purple] };
    s.appendChild(S("defs", null, S("marker", { id: "rc", markerWidth: 8, markerHeight: 8, refX: 7, refY: 4, orient: "auto" }, S("path", { d: "M0 0 L8 4 L0 8 Z", fill: C.grey }))));
    const arcs = [["Igneous", "Sedimentary", "weathering & deposition"], ["Sedimentary", "Metamorphic", "heat & pressure"], ["Metamorphic", "Igneous", "melting & cooling"]];
    arcs.forEach(function (a) { const p = nodes[a[0]], q = nodes[a[1]];
      s.appendChild(S("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: C.grey, "stroke-width": 2, "marker-end": "url(#rc)" }));
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; const t = S("text", { x: mx, y: my, "text-anchor": "middle", "font-size": 10, fill: C.ink }); t.textContent = a[2]; s.appendChild(t); });
    Object.keys(nodes).forEach(function (k) { const n = nodes[k];
      s.appendChild(S("circle", { cx: n[0], cy: n[1], r: 42, fill: n[2], opacity: 0.85 }));
      const t = S("text", { x: n[0], y: n[1] + 4, "text-anchor": "middle", fill: "#fff", "font-weight": 800, "font-size": 12 }); t.textContent = k; s.appendChild(t); });
    host.appendChild(s);
    const r = document.createElement("div"); r.className = "anim-readout"; r.innerHTML = "Rocks are constantly recycled — any type can become any other over long time scales.";
    host.appendChild(r);
    return function () {};
  };

  /* ---------- Moon phases --------------------------------------------------*/
  B.moonPhases = function (host) {
    let phase = 0; const s = svg(320, 260); host.appendChild(s);
    s.appendChild(S("rect", { x: 0, y: 0, width: 320, height: 260, fill: "#0d1b2a" }));
    s.appendChild(S("circle", { cx: 160, cy: 130, r: 60, fill: "#fdfdfd" }));
    const shadow = S("path", { fill: "#0d1b2a" }); s.appendChild(shadow);
    const names = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Third Quarter", "Waning Crescent"];
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function draw() { const f = phase / 8; // 0..1
      // Simple terminator using two arcs
      const r = 60, cx = 160, cy = 130; let d;
      if (phase === 0) d = "M" + (cx - r) + " " + cy + " a" + r + " " + r + " 0 1 0 " + (2 * r) + " 0 a" + r + " " + r + " 0 1 0 " + (-2 * r) + " 0";
      else if (phase === 4) d = "";
      else { const lit = f < 0.5 ? f * 2 : (1 - f) * 2; const waxing = f < 0.5;
        const k = 1 - lit * 2; // -1..1 curvature
        const sweepOuter = waxing ? 1 : 0;
        d = "M" + cx + " " + (cy - r) + " A" + r + " " + r + " 0 0 " + (waxing ? 0 : 1) + " " + cx + " " + (cy + r) +
            " A" + (r * Math.abs(k)) + " " + r + " 0 0 " + (k > 0 ? (waxing ? 1 : 0) : (waxing ? 0 : 1)) + " " + cx + " " + (cy - r) + " Z"; }
      shadow.setAttribute("d", d);
      readout.innerHTML = "<b>" + names[phase] + "</b> — we see the sunlit part of the Moon from a changing angle as it orbits Earth (~29.5 days).";
    }
    draw();
    const bar = ctrlBar(); bar.appendChild(button("◀", function () { phase = (phase + 7) % 8; draw(); }));
    bar.appendChild(button("▶", function () { phase = (phase + 1) % 8; draw(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  /* ---------- Solar system -------------------------------------------------*/
  B.solarSystem = function (host) {
    const s = svg(400, 400); host.appendChild(s);
    s.appendChild(S("circle", { cx: 200, cy: 200, r: 22, fill: C.sun }));
    const planets = [["Mercury", 45, "#9e9e9e", 0.04, 5], ["Venus", 70, "#e6b800", 0.03, 8], ["Earth", 98, C.blue, 0.024, 9], ["Mars", 125, C.red, 0.019, 7], ["Jupiter", 165, "#c9a06a", 0.011, 15]];
    const bodies = planets.map(function (p) {
      s.appendChild(S("circle", { cx: 200, cy: 200, r: p[1], fill: "none", stroke: C.grey, "stroke-width": 1, opacity: 0.4 }));
      const c = S("circle", { r: p[4], fill: p[2] }); s.appendChild(c);
      return { el: c, r: p[1], sp: p[3], a: Math.random() * 6, name: p[0] };
    });
    let raf;
    function step() { bodies.forEach(function (b) { b.a += b.sp; b.el.setAttribute("cx", 200 + Math.cos(b.a) * b.r); b.el.setAttribute("cy", 200 + Math.sin(b.a) * b.r); }); raf = requestAnimationFrame(step); }
    step();
    const r = document.createElement("div"); r.className = "anim-readout"; r.innerHTML = "Inner planets orbit faster (Kepler's laws). Not to scale — real distances are enormous!";
    host.appendChild(r);
    return function () { cancelAnimationFrame(raf); };
  };

  /* ---------- Seasons ------------------------------------------------------*/
  B.seasons = function (host) {
    const s = svg(440, 240); host.appendChild(s);
    s.appendChild(S("circle", { cx: 90, cy: 120, r: 30, fill: C.sun }));
    const positions = [[360, 120, "N summer", -23.5], [360, 120, "", 0]];
    const earth = S("g", null); s.appendChild(earth);
    let idx = 0; const seasons = [["June — N. Hemisphere Summer", -23.5, "North tilts toward Sun → long days, direct light."],
      ["Sept — Equinox", 0, "Neither pole tilts toward Sun → equal day & night."],
      ["Dec — N. Hemisphere Winter", 23.5, "North tilts away → short days, slanted light."],
      ["March — Equinox", 0, "Equal day & night again."]];
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function draw() { while (earth.firstChild) earth.removeChild(earth.firstChild);
      const tilt = seasons[idx][1]; const g = S("g", { transform: "translate(340,120) rotate(" + tilt + ")" });
      g.appendChild(S("circle", { r: 34, fill: C.blue }));
      g.appendChild(S("line", { x1: 0, y1: -46, x2: 0, y2: 46, stroke: C.ink, "stroke-width": 2, "stroke-dasharray": "3 3" }));
      g.appendChild(S("line", { x1: -34, y1: 0, x2: 34, y2: 0, stroke: "#fff", "stroke-width": 1 }));
      earth.appendChild(g);
      readout.innerHTML = "<b>" + seasons[idx][0] + "</b> — " + seasons[idx][2];
    }
    draw();
    const bar = ctrlBar(); bar.appendChild(button("Next season ▶", function () { idx = (idx + 1) % 4; draw(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  B.carbonCycle = function (host) {
    const s = svg(440, 280); host.appendChild(s);
    const nodes = { "Atmosphere CO₂": [220, 40, C.sky], "Plants": [90, 150, C.leaf], "Animals": [350, 150, C.orange], "Fossil fuels / Soil": [220, 240, C.soil] };
    s.appendChild(S("defs", null, S("marker", { id: "cc", markerWidth: 8, markerHeight: 8, refX: 7, refY: 4, orient: "auto" }, S("path", { d: "M0 0 L8 4 L0 8 Z", fill: C.grey }))));
    [["Atmosphere CO₂", "Plants", "photosynthesis"], ["Plants", "Animals", "eating"], ["Animals", "Atmosphere CO₂", "respiration"], ["Fossil fuels / Soil", "Atmosphere CO₂", "burning"], ["Plants", "Fossil fuels / Soil", "decay"]].forEach(function (e) {
      const p = nodes[e[0]], q = nodes[e[1]]; s.appendChild(S("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: C.grey, "stroke-width": 2, "marker-end": "url(#cc)", opacity: 0.7 })); });
    Object.keys(nodes).forEach(function (k) { const n = nodes[k]; s.appendChild(S("rect", { x: n[0] - 55, y: n[1] - 18, width: 110, height: 36, rx: 10, fill: n[2], opacity: 0.85 }));
      const t = S("text", { x: n[0], y: n[1] + 5, "text-anchor": "middle", fill: "#fff", "font-size": 11, "font-weight": 700 }); t.textContent = k; s.appendChild(t); });
    host.appendChild(s);
    const r = document.createElement("div"); r.className = "anim-readout"; r.innerHTML = "Carbon cycles among air, living things, and the ground. Burning fossil fuels adds extra CO₂ to the air.";
    host.appendChild(r);
    return function () {};
  };

  B.periodicTrends = function (host) {
    const s = svg(440, 220); host.appendChild(s);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    const cells = [["H", 0, 0, C.red], ["He", 17, 0, C.purple], ["Li", 0, 1, C.orange], ["Be", 1, 1, C.gold], ["B", 12, 1, C.green], ["C", 13, 1, C.grey], ["N", 14, 1, C.sky], ["O", 15, 1, C.blue], ["F", 16, 1, C.leaf], ["Ne", 17, 1, C.purple], ["Na", 0, 2, C.orange], ["Cl", 16, 2, C.leaf]];
    cells.forEach(function (c) { const x = 20 + c[1] * 23, y = 30 + c[2] * 40;
      s.appendChild(S("rect", { x: x, y: y, width: 21, height: 34, fill: c[3], opacity: 0.3, stroke: c[3], "stroke-width": 1 }));
      const t = S("text", { x: x + 10.5, y: y + 22, "text-anchor": "middle", "font-size": 10, "font-weight": 700, fill: C.ink }); t.textContent = c[0]; s.appendChild(t); });
    s.appendChild((function () { const t = S("text", { x: 220, y: 200, "text-anchor": "middle", fill: C.ink, "font-size": 12 }); t.textContent = "Rows = periods (energy levels) • Columns = groups (similar properties)"; return t; })());
    host.appendChild(s);
    readout.innerHTML = "Elements in the same <b>column</b> react similarly. Reactivity and size follow patterns across the table.";
    host.appendChild(readout);
    return function () {};
  };

  /* ==========================================================================
     MATH VISUALS
     ========================================================================== */
  B.numberLine = function (host, opts) {
    const s = svg(440, 120); host.appendChild(s);
    const min = (opts && opts.min) != null ? opts.min : -10, max = (opts && opts.max) != null ? opts.max : 10;
    const y = 60, x0 = 20, x1 = 420; const span = max - min;
    s.appendChild(S("line", { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, "stroke-width": 2, "marker-end": "url(#nlA)", "marker-start": "url(#nlA)" }));
    s.appendChild(S("defs", null, S("marker", { id: "nlA", markerWidth: 8, markerHeight: 8, refX: 4, refY: 4, orient: "auto" }, S("path", { d: "M0 0 L8 4 L0 8 Z", fill: C.ink }))));
    for (let v = min; v <= max; v++) { const x = x0 + (v - min) / span * (x1 - x0);
      s.appendChild(S("line", { x1: x, y1: y - 6, x2: x, y2: y + 6, stroke: C.ink, "stroke-width": 1.5 }));
      const t = S("text", { x: x, y: y + 24, "text-anchor": "middle", "font-size": 11, fill: C.ink }); t.textContent = v; s.appendChild(t); }
    const pt = S("circle", { r: 8, cy: y, fill: C.red }); s.appendChild(pt);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function set(v) { const x = x0 + (v - min) / span * (x1 - x0); pt.setAttribute("cx", x); readout.innerHTML = "Point at <b>" + v + "</b>. Numbers grow to the right, shrink to the left."; }
    set(0);
    const bar = ctrlBar(); bar.appendChild(label("Slide")); bar.appendChild(slider(min, max, 0, 1, set));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  B.doubleNumberLine = function (host) {
    let k = 2; const s = svg(440, 180); host.appendChild(s);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    const g = S("g", null); s.appendChild(g);
    function draw() { while (g.firstChild) g.removeChild(g.firstChild);
      [[60, "Hours", 1, C.blue], [120, "Miles", k, C.red]].forEach(function (row) {
        g.appendChild(S("line", { x1: 30, y1: row[0], x2: 410, y2: row[0], stroke: row[3], "stroke-width": 2 }));
        for (let i = 0; i <= 5; i++) { const x = 30 + i / 5 * 380;
          g.appendChild(S("line", { x1: x, y1: row[0] - 5, x2: x, y2: row[0] + 5, stroke: row[3], "stroke-width": 2 }));
          const t = S("text", { x: x, y: row[0] - 10, "text-anchor": "middle", "font-size": 11, fill: C.ink }); t.textContent = (i * row[2]); s.appendChild(t); }
        const lab = S("text", { x: 30, y: row[0] + 24, "font-size": 12, fill: row[3], "font-weight": 700 }); lab.textContent = row[1]; g.appendChild(lab);
      });
      readout.innerHTML = "Speed = <b>" + k + " miles per hour</b>. Both lines scale together — that's a proportional relationship.";
    }
    draw();
    const bar = ctrlBar(); bar.appendChild(label("Miles per hour")); bar.appendChild(slider(1, 6, 2, 1, function (v) { k = v; draw(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  function grid(s, ox, oy, unit, xmin, xmax, ymin, ymax) {
    for (let x = xmin; x <= xmax; x++) s.appendChild(S("line", { x1: ox + x * unit, y1: oy + ymin * unit, x2: ox + x * unit, y2: oy + ymax * unit, stroke: "#dfe6ee", "stroke-width": 1 }));
    for (let y = ymin; y <= ymax; y++) s.appendChild(S("line", { x1: ox + xmin * unit, y1: oy + y * unit, x2: ox + xmax * unit, y2: oy + y * unit, stroke: "#dfe6ee", "stroke-width": 1 }));
    s.appendChild(S("line", { x1: ox + xmin * unit, y1: oy, x2: ox + xmax * unit, y2: oy, stroke: C.ink, "stroke-width": 2 }));
    s.appendChild(S("line", { x1: ox, y1: oy + ymin * unit, x2: ox, y2: oy + ymax * unit, stroke: C.ink, "stroke-width": 2 }));
  }

  B.coordinatePlane = function (host) {
    const s = svg(320, 320); host.appendChild(s);
    const ox = 160, oy = 160, u = 28;
    grid(s, ox, oy, u, -5, 5, -5, 5);
    const pt = S("circle", { r: 7, fill: C.red }); s.appendChild(pt);
    const lbl = S("text", { fill: C.red, "font-size": 13, "font-weight": 700 }); s.appendChild(lbl);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    let px = 3, py = 2;
    function set() { pt.setAttribute("cx", ox + px * u); pt.setAttribute("cy", oy - py * u);
      lbl.setAttribute("x", ox + px * u + 8); lbl.setAttribute("y", oy - py * u - 8); lbl.textContent = "(" + px + ", " + py + ")";
      readout.innerHTML = "Point <b>(" + px + ", " + py + ")</b>: go " + px + " right/left (x), then " + py + " up/down (y)."; }
    set();
    const bar = ctrlBar(); bar.appendChild(label("x")); bar.appendChild(slider(-5, 5, 3, 1, function (v) { px = v; set(); }));
    bar.appendChild(label("y")); bar.appendChild(slider(-5, 5, 2, 1, function (v) { py = v; set(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  B.linearGrapher = function (host) {
    let m = 1, b = 0; const s = svg(320, 320); host.appendChild(s);
    const ox = 160, oy = 160, u = 26; grid(s, ox, oy, u, -5, 5, -5, 5);
    const line = S("line", { stroke: C.blue, "stroke-width": 3 }); s.appendChild(line);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function draw() { const x1 = -5, x2 = 5; const y1 = m * x1 + b, y2 = m * x2 + b;
      line.setAttribute("x1", ox + x1 * u); line.setAttribute("y1", oy - y1 * u);
      line.setAttribute("x2", ox + x2 * u); line.setAttribute("y2", oy - y2 * u);
      readout.innerHTML = "y = <b>" + m + "</b>x + <b>" + b + "</b> — slope " + m + " (rise/run), y-intercept " + b + "."; }
    draw();
    const bar = ctrlBar(); bar.appendChild(label("slope m")); bar.appendChild(slider(-3, 3, 1, 0.5, function (v) { m = v; draw(); }));
    bar.appendChild(label("intercept b")); bar.appendChild(slider(-4, 4, 0, 1, function (v) { b = v; draw(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  B.quadraticGrapher = function (host) {
    let a = 1, h = 0, k = 0; const s = svg(320, 320); host.appendChild(s);
    const ox = 160, oy = 200, u = 26; grid(s, ox, oy, u, -5, 5, -6, 3);
    const path = S("path", { fill: "none", stroke: C.purple, "stroke-width": 3 }); s.appendChild(path);
    const vtx = S("circle", { r: 5, fill: C.red }); s.appendChild(vtx);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function draw() { let d = ""; for (let x = -5; x <= 5; x += 0.2) { const y = a * (x - h) * (x - h) + k; const sx = ox + x * u, sy = oy - y * u; d += (d ? " L" : "M") + sx.toFixed(1) + " " + sy.toFixed(1); }
      path.setAttribute("d", d); vtx.setAttribute("cx", ox + h * u); vtx.setAttribute("cy", oy - k * u);
      readout.innerHTML = "y = " + a + "(x − " + h + ")² + " + k + " — parabola, vertex at <b>(" + h + ", " + k + ")</b>, opens " + (a > 0 ? "up" : "down") + "."; }
    draw();
    const bar = ctrlBar(); bar.appendChild(label("a")); bar.appendChild(slider(-2, 2, 1, 0.5, function (v) { a = v || 0.5; draw(); }));
    bar.appendChild(label("h")); bar.appendChild(slider(-3, 3, 0, 1, function (v) { h = v; draw(); }));
    bar.appendChild(label("k")); bar.appendChild(slider(-4, 2, 0, 1, function (v) { k = v; draw(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  B.pythagorean = function (host) {
    let a = 3, b = 4; const s = svg(360, 340); host.appendChild(s);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    const g = S("g", null); s.appendChild(g);
    function draw() { while (g.firstChild) g.removeChild(g.firstChild);
      const sc = 26; const ox = 110, oy = 230;
      const A = [ox, oy], Bp = [ox + b * sc, oy], Cc = [ox, oy - a * sc];
      g.appendChild(S("polygon", { points: [A, Bp, Cc].map(function (p) { return p.join(","); }).join(" "), fill: C.blue, opacity: 0.25, stroke: C.blue, "stroke-width": 2 }));
      // squares
      g.appendChild(S("rect", { x: ox - a * sc, y: oy - a * sc, width: a * sc, height: a * sc, fill: C.red, opacity: 0.3 }));
      g.appendChild(S("rect", { x: ox, y: oy, width: b * sc, height: b * sc, fill: C.green, opacity: 0.3 }));
      const c = Math.sqrt(a * a + b * b);
      const la = S("text", { x: ox - a * sc / 2, y: oy - a * sc / 2, "text-anchor": "middle", fill: C.red, "font-weight": 700, "font-size": 13 }); la.textContent = "a²=" + (a * a); g.appendChild(la);
      const lb = S("text", { x: ox + b * sc / 2, y: oy + b * sc / 2, "text-anchor": "middle", fill: C.green, "font-weight": 700, "font-size": 13 }); lb.textContent = "b²=" + (b * b); g.appendChild(lb);
      readout.innerHTML = "a² + b² = c² → " + (a * a) + " + " + (b * b) + " = <b>" + (a * a + b * b) + "</b>, so c = √" + (a * a + b * b) + " = <b>" + c.toFixed(2) + "</b>."; }
    draw();
    const bar = ctrlBar(); bar.appendChild(label("a")); bar.appendChild(slider(1, 5, 3, 1, function (v) { a = v; draw(); }));
    bar.appendChild(label("b")); bar.appendChild(slider(1, 6, 4, 1, function (v) { b = v; draw(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  B.transformations = function (host) {
    let mode = "translate", t = 0, raf;
    const s = svg(320, 320); host.appendChild(s);
    const ox = 160, oy = 160, u = 26; grid(s, ox, oy, u, -5, 5, -5, 5);
    const base = [[1, 1], [3, 1], [1, 3]];
    s.appendChild(S("polygon", { points: base.map(function (p) { return (ox + p[0] * u) + "," + (oy - p[1] * u); }).join(" "), fill: "none", stroke: C.grey, "stroke-width": 2, "stroke-dasharray": "4 3" }));
    const shape = S("polygon", { fill: C.orange, opacity: 0.6, stroke: C.orange, "stroke-width": 2 }); s.appendChild(shape);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function step() { t += 0.02; const w = (Math.sin(t) + 1) / 2; let pts;
      if (mode === "translate") pts = base.map(function (p) { return [p[0] + w * 2, p[1] - w * 3]; });
      else if (mode === "reflect") pts = base.map(function (p) { return [w > 0.5 ? -p[0] : p[0], p[1]]; });
      else if (mode === "rotate") { const ang = w * Math.PI / 2; pts = base.map(function (p) { return [p[0] * Math.cos(ang) - p[1] * Math.sin(ang), p[0] * Math.sin(ang) + p[1] * Math.cos(ang)]; }); }
      else pts = base.map(function (p) { return [p[0] * (1 + w), p[1] * (1 + w)]; });
      shape.setAttribute("points", pts.map(function (p) { return (ox + p[0] * u) + "," + (oy - p[1] * u); }).join(" "));
      raf = requestAnimationFrame(step); }
    step();
    const texts = { translate: "Translation — slide every point the same distance & direction.", reflect: "Reflection — flip across a line (mirror image).", rotate: "Rotation — turn around a fixed point.", dilate: "Dilation — resize by a scale factor (shape stays similar)." };
    function set() { readout.innerHTML = texts[mode]; }
    set();
    const bar = ctrlBar(); ["translate", "reflect", "rotate", "dilate"].forEach(function (m) { bar.appendChild(button(m[0].toUpperCase() + m.slice(1), function () { mode = m; set(); })); });
    host.appendChild(bar); host.appendChild(readout);
    return function () { cancelAnimationFrame(raf); };
  };

  B.fractionBars = function (host) {
    let n = 3, d = 4; const s = svg(400, 140); host.appendChild(s);
    const g = S("g", null); s.appendChild(g);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    function draw() { while (g.firstChild) g.removeChild(g.firstChild); const w = 360 / d;
      for (let i = 0; i < d; i++) g.appendChild(S("rect", { x: 20 + i * w, y: 40, width: w - 2, height: 50, fill: i < n ? C.blue : "#e6edf3", stroke: C.ink, "stroke-width": 1 }));
      readout.innerHTML = "<b>" + n + "/" + d + "</b> = " + (n / d).toFixed(3) + " = " + Math.round(n / d * 100) + "% shaded."; }
    draw();
    const bar = ctrlBar(); bar.appendChild(label("numerator")); bar.appendChild(slider(0, 8, 3, 1, function (v) { n = Math.min(v, d); draw(); }));
    bar.appendChild(label("denominator")); bar.appendChild(slider(1, 8, 4, 1, function (v) { d = v; n = Math.min(n, d); draw(); }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  B.scatterPlot = function (host) {
    const s = svg(320, 300); host.appendChild(s);
    const ox = 40, oy = 260, u = 24; grid(s, ox - 40, oy - 240, 1, 0, 0, 0, 0);
    s.appendChild(S("line", { x1: ox, y1: oy, x2: ox + 260, y2: oy, stroke: C.ink, "stroke-width": 2 }));
    s.appendChild(S("line", { x1: ox, y1: oy, x2: ox, y2: oy - 240, stroke: C.ink, "stroke-width": 2 }));
    const data = []; for (let i = 0; i < 12; i++) { const x = i + 1; const y = 0.8 * x + 1 + (Math.sin(i * 3) * 1.5); data.push([x, y]); s.appendChild(S("circle", { cx: ox + x * 18, cy: oy - y * 16, r: 5, fill: C.blue })); }
    // line of best fit (slope ~0.8, intercept 1)
    s.appendChild(S("line", { x1: ox + 1 * 18, y1: oy - (0.8 * 1 + 1) * 16, x2: ox + 12 * 18, y2: oy - (0.8 * 12 + 1) * 16, stroke: C.red, "stroke-width": 2.5 }));
    host.appendChild(s);
    const r = document.createElement("div"); r.className = "anim-readout"; r.innerHTML = "A <b>positive correlation</b>: as x rises, y tends to rise. The red line of best fit models the trend.";
    host.appendChild(r);
    return function () {};
  };

  B.systemsGraph = function (host) {
    const s = svg(320, 320); host.appendChild(s);
    const ox = 160, oy = 160, u = 26; grid(s, ox, oy, u, -5, 5, -5, 5);
    // y = x + 1 and y = -x + 3  -> intersection (1,2)
    function ln(m, b, col) { const x1 = -5, x2 = 5; s.appendChild(S("line", { x1: ox + x1 * u, y1: oy - (m * x1 + b) * u, x2: ox + x2 * u, y2: oy - (m * x2 + b) * u, stroke: col, "stroke-width": 3 })); }
    ln(1, 1, C.blue); ln(-1, 3, C.red);
    s.appendChild(S("circle", { cx: ox + 1 * u, cy: oy - 2 * u, r: 7, fill: C.gold, stroke: C.ink, "stroke-width": 2 }));
    host.appendChild(s);
    const r = document.createElement("div"); r.className = "anim-readout"; r.innerHTML = "The <b>solution</b> to a system is where the lines cross: here <b>(1, 2)</b> satisfies both equations.";
    host.appendChild(r);
    return function () {};
  };

  /* ==========================================================================
     INTERACTIVE UPGRADES — replace static diagrams with tap-to-explore versions
     ========================================================================== */

  B.periodicTrends = function (host) {
    const fam = {
      alkali: ["#ff8a65", "Alkali metal — 1 outer electron, very reactive"],
      alkaline: ["#ffb74d", "Alkaline earth metal — 2 outer electrons, reactive"],
      trans: ["#90caf9", "Transition metal — a strong, everyday metal"],
      metalloid: ["#a5d6a7", "Metalloid — acts between metals and nonmetals"],
      nonmetal: ["#cfd8dc", "Nonmetal — dull and a poor conductor"],
      halogen: ["#fff176", "Halogen — 7 outer electrons, grabs 1 to fill its shell"],
      noble: ["#ce93d8", "Noble gas — full outer shell, barely reacts"],
      post: ["#b0bec5", "Post-transition metal"]
    };
    const E = [
      ["H", "Hydrogen", 1, 1, 1, "nonmetal", "The lightest element; it fuels the Sun."],
      ["He", "Helium", 2, 18, 1, "noble", "Makes balloons float and voices squeak."],
      ["Li", "Lithium", 3, 1, 2, "alkali", "Powers rechargeable phone batteries."],
      ["Be", "Beryllium", 4, 2, 2, "alkaline", "Light and stiff; used in aerospace."],
      ["B", "Boron", 5, 13, 2, "metalloid", "Strengthens heat-proof glass (Pyrex)."],
      ["C", "Carbon", 6, 14, 2, "nonmetal", "The backbone of every living thing."],
      ["N", "Nitrogen", 7, 15, 2, "nonmetal", "78% of the air you breathe."],
      ["O", "Oxygen", 8, 16, 2, "nonmetal", "You can't survive minutes without it."],
      ["F", "Fluorine", 9, 17, 2, "halogen", "Added to toothpaste to protect teeth."],
      ["Ne", "Neon", 10, 18, 2, "noble", "Glows orange-red in signs."],
      ["Na", "Sodium", 11, 1, 3, "alkali", "One half of table salt (NaCl)."],
      ["Mg", "Magnesium", 12, 2, 3, "alkaline", "Burns with a brilliant white light."],
      ["Al", "Aluminum", 13, 13, 3, "post", "Cans, foil, and airplane bodies."],
      ["Si", "Silicon", 14, 14, 3, "metalloid", "The heart of every computer chip."],
      ["P", "Phosphorus", 15, 15, 3, "nonmetal", "In your DNA and the tips of matches."],
      ["S", "Sulfur", 16, 16, 3, "nonmetal", "Smells like rotten eggs."],
      ["Cl", "Chlorine", 17, 17, 3, "halogen", "Keeps pools clean; the other half of salt."],
      ["Ar", "Argon", 18, 18, 3, "noble", "Fills lightbulbs so they last longer."],
      ["K", "Potassium", 19, 1, 4, "alkali", "Bananas are famous for it."],
      ["Ca", "Calcium", 20, 2, 4, "alkaline", "Builds your bones and teeth."],
      ["Sc", "Scandium", 21, 3, 4, "trans", "Used in strong, light alloys."],
      ["Ti", "Titanium", 22, 4, 4, "trans", "As strong as steel but far lighter."],
      ["V", "Vanadium", 23, 5, 4, "trans", "Toughens steel tools."],
      ["Cr", "Chromium", 24, 6, 4, "trans", "Gives 'chrome' its mirror shine."],
      ["Mn", "Manganese", 25, 7, 4, "trans", "Helps make stainless steel."],
      ["Fe", "Iron", 26, 8, 4, "trans", "Earth's core — and the base of steel."],
      ["Co", "Cobalt", 27, 9, 4, "trans", "Makes a deep blue pigment."],
      ["Ni", "Nickel", 28, 10, 4, "trans", "In coins and batteries."],
      ["Cu", "Copper", 29, 11, 4, "trans", "Carries electricity in your walls."],
      ["Zn", "Zinc", 30, 12, 4, "trans", "Coats steel to stop rust."],
      ["Ga", "Gallium", 31, 13, 4, "post", "Melts in your warm hand (29.8°C)."],
      ["Ge", "Germanium", 32, 14, 4, "metalloid", "An early semiconductor."],
      ["As", "Arsenic", 33, 15, 4, "metalloid", "Famous as a poison."],
      ["Se", "Selenium", 34, 16, 4, "nonmetal", "Your body needs a tiny bit."],
      ["Br", "Bromine", 35, 17, 4, "halogen", "One of only two liquid elements."],
      ["Kr", "Krypton", 36, 18, 4, "noble", "Used in some camera flashes."]
    ];
    const cw = 25, ch = 26, ox = 8, oy = 44, W = 8 + 18 * cw + 8;
    const s = svg(W, oy + 4 * ch + 8);
    const title = S("text", { x: W / 2, y: 16, "text-anchor": "middle", "font-size": 14, "font-weight": 700, fill: C.ink });
    title.textContent = "Periodic Table — tap an element"; s.appendChild(title);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    readout.textContent = "Tap any element to see what it is and what it's used for.";
    const cells = {};
    E.forEach(function (e) {
      const x = ox + (e[3] - 1) * cw, y = oy + (e[4] - 1) * ch;
      const g = S("g", { style: "cursor:pointer" });
      const rect = S("rect", { x: x, y: y, width: cw - 2, height: ch - 2, rx: 3, fill: fam[e[5]][0], stroke: "#00000022", "stroke-width": 1 });
      const zt = S("text", { x: x + 3, y: y + 8, "font-size": 5, fill: "#00000099" }); zt.textContent = e[2];
      const st = S("text", { x: x + (cw - 2) / 2, y: y + 19, "text-anchor": "middle", "font-size": 10, "font-weight": 800, fill: "#1a2233" }); st.textContent = e[0];
      g.appendChild(rect); g.appendChild(zt); g.appendChild(st);
      g.addEventListener("click", function () {
        Object.keys(cells).forEach(function (k) { cells[k].setAttribute("stroke", "#00000022"); cells[k].setAttribute("stroke-width", 1); });
        rect.setAttribute("stroke", C.ink); rect.setAttribute("stroke-width", 3);
        readout.innerHTML = "<b>" + e[1] + " (" + e[0] + ")</b> · atomic number " + e[2] + " · " + fam[e[5]][1] + ".<br>" + e[6];
      });
      s.appendChild(g); cells[e[0]] = rect;
    });
    host.appendChild(s); host.appendChild(readout);
    const leg = document.createElement("div"); leg.className = "anim-controls";
    [["Alkali", "alkali"], ["Alkaline", "alkaline"], ["Transition", "trans"], ["Metalloid", "metalloid"], ["Nonmetal", "nonmetal"], ["Halogen", "halogen"], ["Noble gas", "noble"]].forEach(function (p) {
      const b = document.createElement("span"); b.className = "anim-label"; b.style.cssText = "display:inline-flex;align-items:center;gap:5px";
      const sw = document.createElement("span"); sw.style.cssText = "width:12px;height:12px;border-radius:3px;display:inline-block;background:" + fam[p[1]][0];
      b.appendChild(sw); b.appendChild(document.createTextNode(p[0])); leg.appendChild(b);
    });
    host.appendChild(leg);
    return function () {};
  };

  B.foodWeb = function (host) {
    const s = svg(440, 300);
    const nodes = {
      grass: [70, 250, "🌱 Grass", C.leaf, "Producer — makes its own food from sunlight (photosynthesis)."],
      rabbit: [70, 130, "🐰 Rabbit", C.orange, "Primary consumer (herbivore) — eats grass."],
      grasshopper: [200, 250, "🦗 Grasshopper", C.green, "Primary consumer (herbivore) — eats grass."],
      bird: [200, 130, "🐦 Bird", C.sky, "Secondary consumer — eats grasshoppers."],
      fox: [340, 190, "🦊 Fox", C.red, "Secondary consumer (predator) — eats rabbits and birds."],
      hawk: [340, 60, "🦅 Hawk", C.purple, "Top predator — eats rabbits, birds, and even foxes."]
    };
    const edges = [["grass", "rabbit"], ["grass", "grasshopper"], ["grasshopper", "bird"], ["rabbit", "fox"], ["bird", "fox"], ["rabbit", "hawk"], ["bird", "hawk"], ["fox", "hawk"]];
    s.appendChild(S("defs", null, S("marker", { id: "arw", markerWidth: 8, markerHeight: 8, refX: 7, refY: 4, orient: "auto" }, S("path", { d: "M0 0 L8 4 L0 8 Z", fill: C.grey }))));
    const lines = edges.map(function (e) {
      const a = nodes[e[0]], b = nodes[e[1]];
      const ln = S("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: C.grey, "stroke-width": 2, "marker-end": "url(#arw)", opacity: 0.5 });
      ln._e = e; s.appendChild(ln); return ln;
    });
    const readout = document.createElement("div"); readout.className = "anim-readout";
    readout.innerHTML = "Arrows show which way <b>energy flows</b> (eaten → eater). Tap an animal to see its role.";
    const circles = {};
    Object.keys(nodes).forEach(function (k) {
      const n = nodes[k];
      const g = S("g", { style: "cursor:pointer" });
      const c = S("circle", { cx: n[0], cy: n[1], r: 26, fill: n[3], opacity: 0.25, stroke: n[3], "stroke-width": 2 });
      const t = S("text", { x: n[0], y: n[1] + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: C.ink }); t.textContent = n[2];
      g.appendChild(c); g.appendChild(t);
      g.addEventListener("click", function () {
        Object.keys(circles).forEach(function (kk) { circles[kk].setAttribute("stroke-width", 2); circles[kk].setAttribute("opacity", 0.25); });
        c.setAttribute("stroke-width", 4); c.setAttribute("opacity", 0.5);
        lines.forEach(function (ln) { const on = ln._e[0] === k || ln._e[1] === k; ln.setAttribute("stroke", on ? C.gold : C.grey); ln.setAttribute("stroke-width", on ? 4 : 2); ln.setAttribute("opacity", on ? 1 : 0.2); });
        readout.innerHTML = "<b>" + n[2] + "</b> — " + n[4];
      });
      s.appendChild(g); circles[k] = c;
    });
    host.appendChild(s); host.appendChild(readout);
    return function () {};
  };

  B.energyPyramid = function (host) {
    const s = svg(420, 300);
    const levels = [
      ["Producers", "10,000 units", C.leaf, 340, "Plants capture sunlight — this is where almost all the ecosystem's energy enters."],
      ["Primary consumers", "1,000 units", C.green, 260, "Herbivores. Only about 10% of the producers' energy reaches them."],
      ["Secondary consumers", "100 units", C.orange, 180, "Carnivores that eat herbivores — again only ~10% passes up."],
      ["Tertiary consumers", "10 units", C.red, 100, "Top predators. So little energy is left that there can only be a few of them."]
    ];
    const readout = document.createElement("div"); readout.className = "anim-readout";
    readout.innerHTML = "Only about <b>10%</b> of energy passes to the next level up. Tap a level.";
    const shapes = [];
    levels.forEach(function (lv, i) {
      const y = 250 - i * 55, w = lv[3], x = 210 - w / 2;
      const g = S("g", { style: "cursor:pointer" });
      const poly = S("polygon", { points: [x, y, x + w, y, x + w - 40, y - 50, x + 40, y - 50].join(" "), fill: lv[2], opacity: 0.85 });
      const t1 = S("text", { x: 210, y: y - 18, "text-anchor": "middle", fill: "#fff", "font-size": 13, "font-weight": 800 }); t1.textContent = lv[0];
      const t2 = S("text", { x: 210, y: y - 4, "text-anchor": "middle", fill: "#fff", "font-size": 11 }); t2.textContent = lv[1];
      g.appendChild(poly); g.appendChild(t1); g.appendChild(t2);
      g.addEventListener("click", function () {
        shapes.forEach(function (p) { p.setAttribute("stroke", "none"); });
        poly.setAttribute("stroke", C.ink); poly.setAttribute("stroke-width", 3);
        readout.innerHTML = "<b>" + lv[0] + " (" + lv[1] + ")</b> — " + lv[4];
      });
      s.appendChild(g); shapes.push(poly);
    });
    host.appendChild(s); host.appendChild(readout);
    return function () {};
  };

  B.emSpectrum = function (host) {
    const s = svg(440, 160);
    const bands = [
      ["Radio", "#546e7a", "The longest waves. Carry TV, radio, and Wi-Fi."],
      ["Microwave", "#00897b", "Heat food and carry phone signals."],
      ["Infrared", "#e53935", "Felt as heat; used by night-vision and TV remotes."],
      ["Visible", "url(#rain)", "The only light your eyes can see — every color."],
      ["Ultraviolet", "#8e24aa", "Gives sunburns; also sterilizes equipment."],
      ["X-ray", "#3949ab", "Passes through skin to photograph bones."],
      ["Gamma", "#212121", "Highest energy; used to treat cancer."]
    ];
    s.appendChild(S("defs", null, (function () { const lg = S("linearGradient", { id: "rain" }); ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa"].forEach(function (c, i) { lg.appendChild(S("stop", { offset: (i / 5 * 100) + "%", "stop-color": c })); }); return lg; })()));
    const readout = document.createElement("div"); readout.className = "anim-readout";
    readout.innerHTML = "Visible light is a tiny slice of the whole spectrum. Tap a band.";
    const rects = [];
    bands.forEach(function (b, i) {
      const x = 20 + i * 58;
      const g = S("g", { style: "cursor:pointer" });
      const r = S("rect", { x: x, y: 40, width: 58, height: 40, fill: b[1] });
      const t = S("text", { x: x + 29, y: 100, "text-anchor": "middle", "font-size": 10, fill: C.ink, "font-weight": 600 }); t.textContent = b[0];
      g.appendChild(r); g.appendChild(t);
      g.addEventListener("click", function () {
        rects.forEach(function (rr) { rr.setAttribute("stroke", "none"); });
        r.setAttribute("stroke", C.ink); r.setAttribute("stroke-width", 3);
        readout.innerHTML = "<b>" + b[0] + "</b> — " + b[2];
      });
      s.appendChild(g); rects.push(r);
    });
    s.appendChild((function () { const t = S("text", { x: 40, y: 30, "font-size": 11, fill: C.ink }); t.textContent = "◀ longer wavelength, lower energy"; return t; })());
    s.appendChild((function () { const t = S("text", { x: 300, y: 30, "font-size": 11, fill: C.ink }); t.textContent = "higher energy ▶"; return t; })());
    host.appendChild(s); host.appendChild(readout);
    return function () {};
  };

  B.rockCycle = function (host) {
    const s = svg(360, 300);
    const nodes = {
      Igneous: [180, 55, C.magma, "Forms when molten magma or lava cools and hardens. Examples: granite, basalt."],
      Sedimentary: [300, 225, C.gold, "Forms when bits of rock and shells are pressed and cemented in layers. Examples: sandstone, limestone."],
      Metamorphic: [60, 225, C.purple, "Forms when existing rock is squeezed and heated (without melting). Examples: marble, slate."]
    };
    s.appendChild(S("defs", null, S("marker", { id: "rc", markerWidth: 8, markerHeight: 8, refX: 7, refY: 4, orient: "auto" }, S("path", { d: "M0 0 L8 4 L0 8 Z", fill: C.grey }))));
    const arcs = [["Igneous", "Sedimentary", "weathering & deposition"], ["Sedimentary", "Metamorphic", "heat & pressure"], ["Metamorphic", "Igneous", "melting & cooling"]];
    arcs.forEach(function (a) {
      const p = nodes[a[0]], q = nodes[a[1]];
      s.appendChild(S("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: C.grey, "stroke-width": 2, "marker-end": "url(#rc)" }));
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; const t = S("text", { x: mx, y: my, "text-anchor": "middle", "font-size": 10, fill: C.ink }); t.textContent = a[2]; s.appendChild(t);
    });
    const readout = document.createElement("div"); readout.className = "anim-readout";
    readout.innerHTML = "Any rock type can slowly become any other. Tap a rock type to see how it forms.";
    const circles = {};
    Object.keys(nodes).forEach(function (k) {
      const n = nodes[k];
      const g = S("g", { style: "cursor:pointer" });
      const c = S("circle", { cx: n[0], cy: n[1], r: 42, fill: n[2], opacity: 0.85 });
      const t = S("text", { x: n[0], y: n[1] + 4, "text-anchor": "middle", fill: "#fff", "font-weight": 800, "font-size": 12 }); t.textContent = k;
      g.appendChild(c); g.appendChild(t);
      g.addEventListener("click", function () {
        Object.keys(circles).forEach(function (kk) { circles[kk].setAttribute("stroke", "none"); });
        c.setAttribute("stroke", C.ink); c.setAttribute("stroke-width", 3);
        readout.innerHTML = "<b>" + k + " rock</b> — " + n[3];
      });
      s.appendChild(g); circles[k] = c;
    });
    host.appendChild(s); host.appendChild(readout);
    return function () {};
  };

  B.carbonCycle = function (host) {
    const s = svg(440, 280);
    const nodes = {
      "Atmosphere CO₂": [220, 40, C.sky, "Carbon dioxide gas in the air. Plants pull it out; breathing and burning put it back."],
      "Plants": [90, 150, C.leaf, "Absorb CO₂ during photosynthesis and lock the carbon into sugars and wood."],
      "Animals": [350, 150, C.orange, "Eat plants (taking in carbon) and breathe out CO₂ during respiration."],
      "Fossil fuels / Soil": [220, 240, C.soil, "Long-term carbon storage. Burning fossil fuels releases it back very quickly."]
    };
    s.appendChild(S("defs", null, S("marker", { id: "cc", markerWidth: 8, markerHeight: 8, refX: 7, refY: 4, orient: "auto" }, S("path", { d: "M0 0 L8 4 L0 8 Z", fill: C.grey }))));
    [["Atmosphere CO₂", "Plants", "photosynthesis"], ["Plants", "Animals", "eating"], ["Animals", "Atmosphere CO₂", "respiration"], ["Fossil fuels / Soil", "Atmosphere CO₂", "burning"], ["Plants", "Fossil fuels / Soil", "decay"]].forEach(function (e) {
      const p = nodes[e[0]], q = nodes[e[1]]; s.appendChild(S("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: C.grey, "stroke-width": 2, "marker-end": "url(#cc)", opacity: 0.7 }));
    });
    const readout = document.createElement("div"); readout.className = "anim-readout";
    readout.innerHTML = "Carbon cycles among air, living things, and the ground. Tap a box to explore it.";
    const rects = {};
    Object.keys(nodes).forEach(function (k) {
      const n = nodes[k];
      const g = S("g", { style: "cursor:pointer" });
      const r = S("rect", { x: n[0] - 58, y: n[1] - 18, width: 116, height: 36, rx: 10, fill: n[2], opacity: 0.85 });
      const t = S("text", { x: n[0], y: n[1] + 5, "text-anchor": "middle", fill: "#fff", "font-size": 11, "font-weight": 700 }); t.textContent = k;
      g.appendChild(r); g.appendChild(t);
      g.addEventListener("click", function () {
        Object.keys(rects).forEach(function (kk) { rects[kk].setAttribute("stroke", "none"); });
        r.setAttribute("stroke", C.ink); r.setAttribute("stroke-width", 3);
        readout.innerHTML = "<b>" + k + "</b> — " + n[3];
      });
      s.appendChild(g); rects[k] = r;
    });
    host.appendChild(s); host.appendChild(readout);
    return function () {};
  };

  B.scatterPlot = function (host) {
    const s = svg(320, 300);
    const ox = 40, oy = 260;
    s.appendChild(S("line", { x1: ox, y1: oy, x2: ox + 260, y2: oy, stroke: C.ink, "stroke-width": 2 }));
    s.appendChild(S("line", { x1: ox, y1: oy, x2: ox, y2: oy - 240, stroke: C.ink, "stroke-width": 2 }));
    s.appendChild((function () { const t = S("text", { x: ox + 130, y: oy + 26, "text-anchor": "middle", "font-size": 11, fill: C.ink }); t.textContent = "hours studied →"; return t; })());
    s.appendChild((function () { const t = S("text", { x: ox - 26, y: oy - 120, "text-anchor": "middle", "font-size": 11, fill: C.ink, transform: "rotate(-90 " + (ox - 26) + " " + (oy - 120) + ")" }); t.textContent = "test score →"; return t; })());
    const data = []; for (let i = 0; i < 12; i++) { const x = i + 1; const y = 0.8 * x + 1 + (Math.sin(i * 3) * 1.5); data.push([x, y]); }
    const readout = document.createElement("div"); readout.className = "anim-readout";
    readout.innerHTML = "Each dot is one student. Tap a dot, or reveal the trend line.";
    data.forEach(function (d) {
      const c = S("circle", { cx: ox + d[0] * 18, cy: oy - d[1] * 16, r: 6, fill: C.blue, style: "cursor:pointer" });
      c.addEventListener("click", function () { readout.innerHTML = "This student studied <b>" + d[0] + " h</b> and scored about <b>" + Math.round(d[1] * 10) + "</b>. More studying tends to mean higher scores — a <b>positive correlation</b>."; });
      s.appendChild(c);
    });
    const fit = S("line", { x1: ox + 1 * 18, y1: oy - (0.8 * 1 + 1) * 16, x2: ox + 12 * 18, y2: oy - (0.8 * 12 + 1) * 16, stroke: C.red, "stroke-width": 2.5, opacity: 0 }); s.appendChild(fit);
    host.appendChild(s);
    const bar = ctrlBar(); let shown = false;
    bar.appendChild(button("Show line of best fit", function () { shown = !shown; fit.setAttribute("opacity", shown ? 1 : 0); readout.innerHTML = shown ? "The red <b>line of best fit</b> models the trend: as hours go up, scores go up — a <b>positive correlation</b>." : "Each dot is one student. Tap a dot, or reveal the trend line."; }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  B.systemsGraph = function (host) {
    const s = svg(320, 320); host.appendChild(s);
    const ox = 160, oy = 160, u = 26; grid(s, ox, oy, u, -5, 5, -5, 5);
    function ln(m, b, col) { const x1 = -5, x2 = 5; s.appendChild(S("line", { x1: ox + x1 * u, y1: oy - (m * x1 + b) * u, x2: ox + x2 * u, y2: oy - (m * x2 + b) * u, stroke: col, "stroke-width": 3 })); }
    ln(1, 1, C.blue); ln(-1, 3, C.red);
    s.appendChild((function () { const t = S("text", { x: ox + 3.4 * u, y: oy - (1 * 4 + 1) * u - 4, fill: C.blue, "font-size": 11, "font-weight": 700 }); t.textContent = "y = x + 1"; return t; })());
    s.appendChild((function () { const t = S("text", { x: ox - 4.4 * u, y: oy - (1 + 3) * u + 30, fill: C.red, "font-size": 11, "font-weight": 700 }); t.textContent = "y = −x + 3"; return t; })());
    const dot = S("circle", { cx: ox + 1 * u, cy: oy - 2 * u, r: 7, fill: C.gold, stroke: C.ink, "stroke-width": 2, opacity: 0 }); s.appendChild(dot);
    const readout = document.createElement("div"); readout.className = "anim-readout";
    readout.innerHTML = "The solution to a system is where the two lines cross. Can you spot it?";
    const bar = ctrlBar(); let shown = false;
    bar.appendChild(button("Reveal the solution", function () { shown = !shown; dot.setAttribute("opacity", shown ? 1 : 0); readout.innerHTML = shown ? "They cross at <b>(1, 2)</b> — the one point that makes BOTH equations true (1 + 1 = 2 ✓ and −1 + 3 = 2 ✓)." : "The solution is where the two lines cross. Can you spot it?"; }));
    host.appendChild(bar); host.appendChild(readout);
    return function () {};
  };

  /* ==========================================================================
     PUBLIC API
     ========================================================================== */
  const AnimLib = {
    has: function (key) { return typeof B[key] === "function"; },
    keys: function () { return Object.keys(B); },
    render: function (key, container, opts) {
      opts = opts || {};
      // teardown previous
      const prev = rafs.get(container);
      if (prev) { try { prev(); } catch (e) {} }
      container.innerHTML = "";
      container.classList.add("anim-host");
      let cleanup = function () {};
      if (B[key]) {
        try { cleanup = B[key](container, opts) || function () {}; }
        catch (e) { container.textContent = "⚠︎ Could not render visual: " + key; }
      } else if (opts.svg) {
        container.innerHTML = opts.svg; // inline custom SVG
      } else {
        const ph = document.createElement("div"); ph.className = "anim-readout";
        ph.textContent = "🖼️ " + (opts.alt || key);
        container.appendChild(ph);
      }
      if (opts.caption) {
        const cap = document.createElement("figcaption");
        cap.className = "anim-caption"; cap.textContent = opts.caption;
        container.appendChild(cap);
      }
      rafs.set(container, cleanup);
      return cleanup;
    }
  };
  window.AnimLib = AnimLib;
})();
