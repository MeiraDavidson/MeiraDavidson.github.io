/* Interactive figures: things to move rather than read. Each one fills a container and starts
   in exactly the state of the worked example beside it, so it reads as that example come to
   life. Like the static figures, everything is legible at rest — motion only moves an
   indicator over a curve already drawn — and every reading is also given in words.
   A lesson asks for one with `try: '<name>'` on an example; print shows the static figure. */
(function () {
  const reduced = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  /** At most two places, trailing zeros dropped (2.5, not 2.50). A true minus sign, not a hyphen. */
  const num = x => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : x.toFixed(2).replace(/0$/, '')).replace('-', '−');

  /* ---------- a ball thrown straight up: h(t) = -16t² + vt + h₀ ---------- */
  function projectile(el) {
    const START = { v: 64, h0: 80 };
    let v = START.v, h0 = START.h0, anim = 0;
    // Fixed axes, so a change to the throw shows as a change to the curve.
    const TMAX = 8, HMAX = 320, x0 = 96, y0 = 252, sx = 46, sy = 0.68, colX = 44;
    const X = t => x0 + sx * t, Y = h => y0 - sy * h;
    const h = t => -16 * t * t + v * t + h0;

    el.innerHTML = `<div class="tryhead"><b>Try it yourself</b>
        <span>Change the throw and watch the parabola, the highest point and the landing time follow.</span></div>
      <div class="tryctl">
        <label>Throw speed <output id="pjvo"></output>
          <input type="range" id="pjv" min="0" max="96" step="8" value="${v}"></label>
        <label>Roof height <output id="pjho"></output>
          <input type="range" id="pjh" min="0" max="160" step="8" value="${h0}"></label>
      </div>
      <svg viewBox="0 0 480 300" class="fig tryfig" role="img" xmlns="http://www.w3.org/2000/svg">
        <g class="pj-static">
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(t => `<line x1="${X(t)}" y1="${Y(0)}" x2="${X(t)}" y2="${Y(HMAX)}" class="f-grid"/>
            <text x="${X(t)}" y="${Y(0) + 16}" class="f-lab3">${t}</text>`).join('')}
          ${[80, 160, 240, 320].map(k => `<line x1="${X(0)}" y1="${Y(k)}" x2="${X(TMAX)}" y2="${Y(k)}" class="f-grid"/>
            <text x="${X(0) - 7}" y="${Y(k) + 4}" class="f-lab3" text-anchor="end">${k}</text>`).join('')}
          <line x1="12" y1="${Y(0)}" x2="${X(TMAX) + 6}" y2="${Y(0)}" class="f-axis"/>
          <line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(HMAX) - 6}" class="f-axis"/>
          <text x="${X(TMAX)}" y="${Y(0) + 32}" class="f-lab" text-anchor="end">time (seconds)</text>
          <text x="${X(0) + 6}" y="${Y(HMAX) - 8}" class="f-lab" text-anchor="start">height (feet)</text>
          <text x="${colX}" y="${Y(0) + 32}" class="f-lab3">the ball</text>
        </g>
        <rect class="pj-roof" x="${colX - 20}" width="40" rx="2"/>
        <line class="pj-axis f-dash"/>
        <polyline class="pj-curve f-line"/>
        <g class="pj-dots"></g>
        <g class="pj-labs"></g>
        <line class="pj-link"/>
        <circle class="pj-ball" r="7"/>
        <circle class="pj-trace" r="5"/>
        <text class="pj-now f-lab2" x="${X(TMAX)}" y="${Y(HMAX) - 8}" text-anchor="end"></text>
      </svg>
      <div class="tryread" aria-live="polite"></div>
      <div class="row" style="margin-top:10px">
        <button class="btn sm pri" id="pjgo">▶ Throw</button>
        <button class="btn sm" id="pjreset">Back to the worked example</button></div>`;

    const $ = s => el.querySelector(s);
    const svg = $('svg'), ball = $('.pj-ball'), trace = $('.pj-trace'), link = $('.pj-link'), now = $('.pj-now');
    const at = (node, a) => { for (const k in a) node.setAttribute(k, a[k]); };

    function facts() {
      const tv = v / 32, top = h0 + v * v / 64;
      const disc = Math.sqrt(v * v + 64 * h0);
      const land = (v + disc) / 32, other = (v - disc) / 32;
      return { tv, top, land, other };
    }
    function equation() {
      return `<span class="m"><i>h</i>(<i>t</i>) = −16<i>t</i><sup>2</sup>${v ? ' + ' + v + '<i>t</i>' : ''}${h0 ? ' + ' + h0 : ''}</span>`;
    }
    function place(t) {
      const ht = Math.max(0, h(t));
      at(ball, { cx: colX, cy: Y(ht).toFixed(1) });
      at(trace, { cx: X(t).toFixed(1), cy: Y(ht).toFixed(1) });
      at(link, { x1: colX + 8, y1: Y(ht).toFixed(1), x2: X(t).toFixed(1), y2: Y(ht).toFixed(1) });
      return ht;
    }
    function draw() {
      cancelAnimationFrame(anim); anim = 0; now.textContent = '';
      $('#pjvo').textContent = v + ' ft/s'; $('#pjho').textContent = h0 + ' ft';
      const f = facts();
      at($('.pj-roof'), { y: Y(h0).toFixed(1), height: (sy * h0).toFixed(1) });
      $('.pj-roof').style.display = h0 ? '' : 'none';
      const pts = []; const end = Math.max(f.land, 0);
      for (let i = 0; i <= 80; i++) { const t = end * i / 80; pts.push(X(t).toFixed(1) + ',' + Y(Math.max(0, h(t))).toFixed(1)); }
      at($('.pj-curve'), { points: pts.join(' ') });
      at($('.pj-axis'), { x1: X(f.tv), y1: Y(f.top) - 10, x2: X(f.tv), y2: Y(0) });
      $('.pj-axis').style.display = v ? '' : 'none';
      const dots = [[0, h0]].concat(v ? [[f.tv, f.top]] : [], v && 2 * f.tv < f.land ? [[2 * f.tv, h0]] : [], [[f.land, 0]]);
      $('.pj-dots').innerHTML = dots.map(([t, k]) => `<circle cx="${X(t).toFixed(1)}" cy="${Y(k).toFixed(1)}" r="3.6" class="f-hub"/>`).join('');
      const lab = (t, k, s, cls, dx, dy, anchor) =>
        `<text x="${(X(t) + dx).toFixed(1)}" y="${(Y(k) + dy).toFixed(1)}" class="${cls}" text-anchor="${anchor || 'start'}">${s}</text>`;
      $('.pj-labs').innerHTML = (v ? lab(f.tv, f.top, `highest: ${num(f.top)} ft at ${num(f.tv)} s`, 'f-lab2', 8, -8, f.tv > 4.5 ? 'end' : 'start') : '')
        + (f.land > 0 ? lab(f.land, 0, `lands at ${num(f.land)} s`, 'f-lab2', -6, -8, 'end') : '');
      place(0);
      svg.setAttribute('aria-label', `Graph of ${equation().replace(/<[^>]+>/g, '')}: highest point ${num(f.top)} feet at ${num(f.tv)} seconds, lands at ${num(f.land)} seconds.`);

      const read = $('.tryread');
      if (!v && !h0) { read.innerHTML = `${equation()} — nothing is thrown and there is no height to fall from. Raise the speed or the roof.`; return; }
      read.innerHTML = `<p>${equation()}</p><ul>
        <li><b>Opens downward:</b> <span class="m"><i>a</i> = −16</span> is negative whatever the throw — gravity always pulls it back.</li>
        <li><b>Highest point:</b> ${v ? `${num(f.top)} ft, at <span class="m"><i>t</i> = −${v}/(2·(−16)) = ${num(f.tv)}</span> s.`
          : `the start, ${h0} ft — with no upward speed it is simply dropped, so it only falls.`}</li>
        <li><b>Lands:</b> at <span class="m"><i>t</i> = ${num(f.land)}</span> s, where <span class="m"><i>h</i> = 0</span>.
          ${h0 ? `The other root, <span class="m"><i>t</i> = ${num(f.other)}</span>, is before the throw, so it is thrown away.`
            : 'The other root, <span class="m"><i>t</i> = 0</span>, is the moment it leaves the ground.'}</li>
        ${v ? `<li><b>Symmetry:</b> ${num(f.tv)} s up, and it is back at ${h0 ? 'roof height' : 'the ground'} at ${num(2 * f.tv)} s — the way down mirrors the way up.</li>` : ''}
      </ul>`;
    }
    function go() {
      draw();
      const f = facts();
      if (f.land <= 0) return;
      if (reduced()) { const k = place(f.tv); now.textContent = ''; return k; }
      const t0 = performance.now();
      const step = ms => {
        if (!el.isConnected) return;                        // the lesson was left mid-flight
        const t = Math.min(f.land, (ms - t0) / 1000);       // real time: one second is one second
        const k = place(t);
        now.textContent = `t = ${t.toFixed(1)} s · h = ${Math.round(k)} ft`;
        if (t < f.land) anim = requestAnimationFrame(step); else anim = 0;
      };
      anim = requestAnimationFrame(step);
    }
    $('#pjv').oninput = e => { v = +e.target.value; draw(); };
    $('#pjh').oninput = e => { h0 = +e.target.value; draw(); };
    $('#pjgo').onclick = go;
    $('#pjreset').onclick = () => { v = START.v; h0 = START.h0; $('#pjv').value = v; $('#pjh').value = h0; draw(); };
    draw();
  }

  window.INTERACTIVE = { projectile };
})();
