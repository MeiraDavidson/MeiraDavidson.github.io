/* Inline SVG illustrations. Every figure is legible at rest; motion is an
   indicator moving over content that is already drawn. */
(function () {
  const S = (vb, body, cls) => `<svg viewBox="${vb}" class="fig ${cls || ''}" role="img" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

  const TK = (x1, y1, x2, y2, n, cls) => { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1,
      ux = dx / L, uy = dy / L, px = -uy, py = ux, mx = (x1 + x2) / 2, my = (y1 + y2) / 2, out = [];
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 5.5, cx = mx + ux * o, cy = my + uy * o;
      out.push(`<line x1="${(cx + px * 6).toFixed(1)}" y1="${(cy + py * 6).toFixed(1)}" x2="${(cx - px * 6).toFixed(1)}" y2="${(cy - py * 6).toFixed(1)}" class="${cls || 'f-dim'}"/>`); }
    return out.join(''); };
  const ARR = (x1, y1, x2, y2, cls) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 7;
    return `<line x1="${x1}" y1="${y1}" x2="${(x2 - Math.cos(a) * h).toFixed(1)}" y2="${(y2 - Math.sin(a) * h).toFixed(1)}" class="${cls || 'f-arrow'}"/>` +
      `<path d="M${x2} ${y2} L${(x2 - Math.cos(a - .4) * h * 1.9).toFixed(1)} ${(y2 - Math.sin(a - .4) * h * 1.9).toFixed(1)} L${(x2 - Math.cos(a + .4) * h * 1.9).toFixed(1)} ${(y2 - Math.sin(a + .4) * h * 1.9).toFixed(1)} Z" class="f-arrowhead"/>`; };
  const GRID = (x, y, w, h, st) => { let o = '';
    for (let i = 0; i <= w + .1; i += st) o += `<line x1="${x + i}" y1="${y}" x2="${x + i}" y2="${y + h}" class="f-grid"/>`;
    for (let j = 0; j <= h + .1; j += st) o += `<line x1="${x}" y1="${y + j}" x2="${x + w}" y2="${y + j}" class="f-grid"/>`;
    return o; };
  const DOTS = (pts, cls) => pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.6" class="${cls || 'f-dot'}"/>`).join('');

  /* Shared <defs> for the discovery illustrations. Ids are namespaced per figure so two
     figures on one page cannot collide. Gradients give the objects enough depth that a
     reader sees a thing, not a schematic. */
  const GRAD = (id, a, b, c) => `<radialGradient id="${id}" cx="38%" cy="32%" r="72%">
      <stop offset="0" stop-color="${a}"/><stop offset=".58" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`;
  const LGRAD = (id, a, b, vert) => `<linearGradient id="${id}" x1="0" y1="0" x2="${vert?0:1}" y2="${vert?1:0}">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const SHEEN = (w, h, r) => `<path d="M${-w*0.55} ${-h*0.5} Q${-w*0.3} ${-h*0.72} ${w*0.05} ${-h*0.7}" fill="none"
      stroke="#fff" stroke-width="${r||2.2}" stroke-linecap="round" opacity=".7"/>`;
  /* A person icon — head plus shoulders. Used wherever a count is a count of people. */
  const PERSON = (x, y, s, cls) => `<g transform="translate(${x} ${y}) scale(${s||1})" class="${cls||'f-person'}">
      <circle cx="0" cy="-7" r="4.6"/><path d="M-6.4 6 a6.4 7 0 0 1 12.8 0 z"/></g>`;
  /* A coin, for money contexts. */
  const COIN = (x, y, r, id) => `<g transform="translate(${x} ${y})">
      <ellipse cx="0" cy="2" rx="${r}" ry="${r*0.34}" fill="#000" opacity=".1"/>
      <circle r="${r}" fill="url(#${id})" stroke="#9a7b3c" stroke-width="1.3"/>
      <circle r="${r*0.62}" fill="none" stroke="#b8923f" stroke-width="1"/></g>`;
  /* A unit square tile, for area models built from real tiles. */
  const TILE = (x, y, w, h, fill, stroke) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2.5"
      fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
  const ARC = (cx, cy, r, a0, a1, cls) => { const p = (a) => [cx + r*Math.cos(a*Math.PI/180), cy - r*Math.sin(a*Math.PI/180)];
    const [x0,y0] = p(a0), [x1,y1] = p(a1);
    return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${Math.abs(a1-a0)>180?1:0} ${a1>a0?0:1} ${x1.toFixed(1)} ${y1.toFixed(1)}" class="${cls||'f-angarc'}"/>`; };

  window.FIGURES = {


  powerTower: () => S('0 0 480 212', `
    <title>Doubling: each step multiplies by two</title>
    ${[1,2,3,4,5].map((e,i)=>{const v=Math.pow(2,e),h=v*3.1,x=34+i*86;
      return `<rect x="${x}" y="${157-h}" width="52" height="${h}" rx="3" class="f-fill" style="--d:${i*160}ms"/>`+
             `<text x="${x+26}" y="${149-h}" class="f-lab2">${v}</text>`+
             `<text x="${x+26}" y="177" class="f-lab">2^${e}</text>`}).join('')}
    <line x1="24" y1="158" x2="450" y2="158" class="f-axis"/>
    <text x="14" y="20" class="f-cap" text-anchor="start">an exponent counts factors — each step multiplies by 2, it does not add 2</text>
    <text x="14" y="202" class="f-lab3" text-anchor="start">2^5 = 32, not 10</text>`),

  workBackwards: () => S('0 0 480 180', `
    <title>Undoing a chain of operations in reverse</title>
    ${[['n','start'],['3n','×3'],['3n−4','−4'],['10','÷2']].map((b,i)=>{const x=22+i*118;
      return `<rect x="${x}" y="52" width="86" height="46" rx="6" class="${i===3?'f-panel2':'f-panel'}"/>`+
             `<text x="${x+43}" y="80" class="f-eq" text-anchor="middle">${b[0]}</text>`+
             (i?`<text x="${x-16}" y="44" class="f-lab2">${b[1]}</text>`:'')}).join('')}
    ${[0,1,2].map(i=>`<path d="M${112+i*118} 62 L ${134+i*118} 62" class="f-arrow" marker-end="url(#fb1)"/>`).join('')}
    ${[0,1,2].map(i=>`<path d="M${134+i*118} 90 L ${112+i*118} 90" class="f-back" marker-end="url(#fb2)" style="--d:${(2-i)*400}ms"/>`).join('')}
    <defs><marker id="fb1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" class="f-arrowhead"/></marker>
    <marker id="fb2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" class="f-backhead"/></marker></defs>
    <text x="14" y="22" class="f-cap" text-anchor="start">forward: ×3, then −4, then ÷2</text>
    <text x="14" y="130" class="f-cap" text-anchor="start">backward: ×2, then +4, then ÷3 — undo in reverse order</text>
    <text x="14" y="158" class="f-big" text-anchor="start">n = 8</text>`),

  squareGrid: () => S('0 0 480 180', `
    <title>A 7 by 7 square of 49 unit squares</title>
    ${Array.from({length:49},(_,i)=>`<rect x="${30+(i%7)*20}" y="${22+Math.floor(i/7)*20}" width="18" height="18" rx="1.5" class="f-fill" style="--d:${i*18}ms"/>`).join('')}
    <path d="M30 172 L 168 172" class="f-dim"/><text x="99" y="166" class="f-lab">side 7</text>
    <path d="M20 22 L 20 160" class="f-dim"/><text x="13" y="95" class="f-lab">7</text>
    <text x="200" y="52" class="f-cap" text-anchor="start">side → area is squaring</text>
    <text x="200" y="84" class="f-big" text-anchor="start">7² = 49</text>
    <text x="200" y="112" class="f-cap" text-anchor="start">area → side is the square root</text>
    <text x="200" y="144" class="f-big" text-anchor="start">√49 = 7</text>`),

  numberSets: () => S('0 0 480 212', `
    <title>Real numbers: nested rational sets beside the irrationals</title>
    <rect x="14" y="14" width="452" height="150" rx="12" class="f-panel"/>
    <text x="240" y="33" class="f-name">REAL NUMBERS</text>
    <rect x="28" y="42" width="268" height="112" rx="10" class="f-set"/>
    <text x="162" y="60" class="f-name">rational</text>
    <rect x="46" y="68" width="232" height="78" rx="9" class="f-set"/>
    <text x="162" y="86" class="f-name">integers</text>
    <rect x="64" y="94" width="196" height="44" rx="8" class="f-set"/>
    <text x="162" y="111" class="f-name">whole</text>
    <text x="162" y="130" class="f-nl">0, 1, 2, 3, …</text>
    <rect x="312" y="42" width="142" height="112" rx="10" class="f-set2"/>
    <text x="383" y="60" class="f-name">irrational</text>
    <text x="383" y="95" class="f-eq" text-anchor="middle">π</text>
    <text x="383" y="126" class="f-eq" text-anchor="middle">√2</text>
    <text x="383" y="148" class="f-lab">never repeats</text>
    <text x="14" y="186" class="f-cap" text-anchor="start">integers add the negatives (−5) · rationals add the fractions (¾, 0.6)</text>
    <text x="14" y="204" class="f-lab3" text-anchor="start">every whole number is also an integer, and also rational — the rings nest</text>`),

  factorTree: () => S('0 0 480 190', `
    <title>A factor tree for 36 giving 2 times 2 times 3 times 3</title>
    <circle cx="150" cy="30" r="19" class="f-panel2"/><text x="150" y="36" class="f-eq" text-anchor="middle">36</text>
    <path d="M136 43 L 100 68 M164 43 L 200 68" class="f-branch"/>
    <circle cx="92" cy="82" r="18" class="f-panel"/><text x="92" y="88" class="f-eq" text-anchor="middle">4</text>
    <circle cx="208" cy="82" r="18" class="f-panel"/><text x="208" y="88" class="f-eq" text-anchor="middle">9</text>
    <path d="M80 95 L 56 120 M104 95 L 128 120 M196 95 L 172 120 M220 95 L 244 120" class="f-branch"/>
    ${[[50,134,'2'],[134,134,'2'],[166,134,'3'],[250,134,'3']].map(p=>
      `<circle cx="${p[0]}" cy="${p[1]}" r="17" class="f-sec1"/><text x="${p[0]}" y="${p[1]+6}" class="f-node">${p[2]}</text>`).join('')}
    <text x="150" y="176" class="f-lab2">36 = 2² · 3²</text>
    <text x="296" y="66" class="f-cap" text-anchor="start">GCF: shared primes,</text>
    <text x="296" y="86" class="f-cap" text-anchor="start">lowest powers</text>
    <text x="296" y="122" class="f-cap" text-anchor="start">LCM: every prime,</text>
    <text x="296" y="142" class="f-cap" text-anchor="start">highest powers</text>`),

  circleParts: () => S('0 0 480 200', `
    <title>A circle labelled with radius, diameter, chord and sector</title>
    <g transform="translate(130,100)">
      <path d="M0 0 L0 -72 A72 72 0 0 1 62 36 Z" class="f-sec2" opacity="0.5"/>
      <circle r="72" class="f-ring"/>
      <line x1="-72" y1="0" x2="72" y2="0" class="f-line"/>
      <line x1="0" y1="0" x2="0" y2="-72" class="f-mark"/>
      <line x1="-52" y1="50" x2="52" y2="50" class="f-dash"/>
      <circle r="4" class="f-hub"/>
      <text x="36" y="-8" class="f-lab">radius</text>
      <text x="-30" y="-8" class="f-lab">diameter</text>
      <text x="0" y="68" class="f-lab">chord</text>
      <text x="40" y="-40" class="f-name">sector</text>
    </g>
    <text x="238" y="52" class="f-cap" text-anchor="start">C = 2πr — a length, so r once</text>
    <text x="238" y="82" class="f-cap" text-anchor="start">A = πr² — a square measure, so r²</text>
    <text x="238" y="118" class="f-big" text-anchor="start">π = C ÷ d</text>
    <text x="238" y="146" class="f-lab3" text-anchor="start">the same for every circle, ≈ 3.14159</text>
    <text x="238" y="172" class="f-lab3" text-anchor="start">a sector of n° is n/360 of the whole</text>`),

  barLine: () => S('0 0 480 200', `
    <title>The same two values drawn on a full axis and on a truncated axis</title>
    <text x="108" y="18" class="f-cap">axis from 0 — honest</text>
    <line x1="34" y1="150" x2="190" y2="150" class="f-axis"/>
    <line x1="34" y1="34" x2="34" y2="150" class="f-axis"/>
    <rect x="62" y="41" width="40" height="109" class="f-fill"/>
    <rect x="128" y="35" width="40" height="115" class="f-fill"/>
    <text x="82" y="166" class="f-lab">74</text><text x="148" y="166" class="f-lab">78</text>
    <text x="26" y="154" class="f-lab3" text-anchor="end">0</text>
    <text x="368" y="18" class="f-cap">axis from 70 — misleading</text>
    <line x1="294" y1="150" x2="450" y2="150" class="f-axis"/>
    <line x1="294" y1="34" x2="294" y2="150" class="f-axis"/>
    <rect x="322" y="92" width="40" height="58" class="f-fill2"/>
    <rect x="388" y="34" width="40" height="116" class="f-fill2"/>
    <text x="342" y="166" class="f-lab">74</text><text x="408" y="166" class="f-lab">78</text>
    <text x="286" y="154" class="f-lab3" text-anchor="end">70</text>
    <text x="14" y="192" class="f-cap" text-anchor="start">same data — a 4-point gap looks like a doubling. Read the numbers, not the bars.</text>`),

  pythagoras: () => S('0 0 480 268', `
    <title>Squares built on the three sides of a 3-4-5 right triangle</title>
    <!-- 18px per unit. Right angle at C(120,170); legs 3 up and 4 right. -->
    <rect x="66" y="116" width="54" height="54" class="f-fill" opacity="0.34"/>
    <text x="93" y="150" class="f-name">9</text>
    <rect x="120" y="170" width="72" height="72" class="f-fill2" opacity="0.4"/>
    <text x="156" y="212" class="f-name">16</text>
    <path d="M120 116 L 192 170 L 246 98 L 174 44 Z" class="f-sec1" opacity="0.26"/>
    <path d="M120 116 L 192 170 L 246 98 L 174 44 Z" class="f-edge"/>
    <text x="183" y="112" class="f-name">25</text>
    <path d="M120 116 L 192 170 L 120 170 Z" class="f-panel2"/>
    <path d="M120 116 L 192 170 L 120 170 Z" class="f-edge"/>
    <path d="M132 170 L 132 158 L 120 158" class="f-edge"/>
    <text x="110" y="146" class="f-lab" text-anchor="end">3</text>
    <text x="156" y="186" class="f-lab">4</text>
    <text x="166" y="132" class="f-lab">5</text>
    <text x="280" y="70" class="f-big" text-anchor="start">a² + b² = c²</text>
    <text x="280" y="102" class="f-cap" text-anchor="start">9 + 16 = 25</text>
    <text x="280" y="134" class="f-lab3" text-anchor="start">the two smaller squares, together,</text>
    <text x="280" y="154" class="f-lab3" text-anchor="start">have exactly the area of the big one</text>
    <text x="280" y="190" class="f-lab3" text-anchor="start">c is opposite the right angle</text>
    <text x="280" y="210" class="f-lab3" text-anchor="start">and always the longest side</text>`),

  functionMachine: () => S('0 0 480 180', `
    <title>A function machine multiplying by three then adding two</title>
    <circle cx="48" cy="90" r="24" class="f-panel2"/><text x="48" y="97" class="f-eq" text-anchor="middle">4</text>
    <text x="48" y="138" class="f-lab">input x</text>
    <path d="M76 90 L 116 90" class="f-arrow" marker-end="url(#fm1)"/>
    <defs><marker id="fm1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" class="f-arrowhead"/></marker></defs>
    <rect x="124" y="46" width="184" height="88" rx="10" class="f-panel"/>
    <text x="216" y="80" class="f-eq" text-anchor="middle">×3, then +2</text>
    <text x="216" y="112" class="f-lab2">f(x) = 3x + 2</text>
    <text x="216" y="30" class="f-lab">the rule</text>
    <path d="M316 90 L 356 90" class="f-arrow" marker-end="url(#fm1)"/>
    <circle cx="388" cy="90" r="24" class="f-sec2"/><text x="388" y="97" class="f-node">14</text>
    <text x="388" y="138" class="f-lab">output y</text>
    <text x="14" y="168" class="f-cap" text-anchor="start">one input in, exactly one output out — that is what makes it a function</text>`),

  doubleNumberLine: () => S('0 0 480 170', `
    <title>A double number line linking tickets to dollars</title>
    ${[0,1,2,3,4].map(i => `<line x1="${40+i*100}" y1="46" x2="${40+i*100}" y2="118" class="f-rule"/>`).join('')}
    <line x1="40" y1="46" x2="440" y2="46" class="f-axis"/>
    <line x1="40" y1="118" x2="440" y2="118" class="f-axis"/>
    ${[0,1,2,3,4].map(i => `<circle cx="${40+i*100}" cy="46" r="4" class="f-dot"/><circle cx="${40+i*100}" cy="118" r="4" class="f-dot"/>`).join('')}
    ${[0,1,2,3,4].map(i => `<text x="${40+i*100}" y="34" class="f-lab">${i}</text>`).join('')}
    ${[0,1,2,3,4].map(i => `<text x="${40+i*100}" y="140" class="f-lab">$${(i*4.5).toFixed(2)}</text>`).join('')}
    <text x="40" y="16" class="f-cap" text-anchor="start">tickets</text>
    <text x="40" y="162" class="f-cap" text-anchor="start">cost</text>
    <g class="f-slide"><line x1="40" y1="40" x2="40" y2="124" class="f-mark"/>
      <circle cx="40" cy="46" r="7" class="f-marked"/><circle cx="40" cy="118" r="7" class="f-marked"/></g>`),

  percentGrid: () => S('0 0 480 200', `
    <title>A hundred-square grid with 64 squares shaded</title>
    ${Array.from({length:100}, (_, i) => {
      const x = 130 + (i % 10) * 18, y = 24 + Math.floor(i / 10) * 18;
      return `<rect x="${x}" y="${y}" width="16" height="16" rx="1.5" class="${i < 64 ? 'f-fill' : 'f-empty'}" style="--d:${i * 14}ms"/>`;
    }).join('')}
    <text x="345" y="92" class="f-big" text-anchor="start">64%</text>
    <text x="345" y="114" class="f-cap" text-anchor="start">= 64/100</text>
    <text x="345" y="132" class="f-cap" text-anchor="start">= 0.64</text>
    <text x="118" y="112" class="f-cap" text-anchor="end">one whole</text>
    <text x="118" y="130" class="f-cap" text-anchor="end">= 100 squares</text>`),

  fractionBars: () => S('0 0 480 190', `
    <title>Thirds and quarters renamed as twelfths so they can be added</title>
    <text x="16" y="28" class="f-cap" text-anchor="start">2/3</text>
    <g>${Array.from({length:3},(_,i)=>`<rect x="${70+i*120}" y="14" width="116" height="30" rx="3" class="${i<2?'f-fill':'f-empty'}"/>`).join('')}</g>
    <text x="16" y="74" class="f-cap" text-anchor="start">1/4</text>
    <g>${Array.from({length:4},(_,i)=>`<rect x="${70+i*90}" y="60" width="86" height="30" rx="3" class="${i<1?'f-fill2':'f-empty'}"/>`).join('')}</g>
    <line x1="70" y1="106" x2="430" y2="106" class="f-rule"/>
    <text x="16" y="140" class="f-cap" text-anchor="start">twelfths</text>
    <g>${Array.from({length:12},(_,i)=>`<rect x="${70+i*30}" y="122" width="26" height="30" rx="3" class="${i<8?'f-fill':i<11?'f-fill2':'f-empty'}"/>`).join('')}</g>
    <text x="70" y="176" class="f-cap" text-anchor="start">8/12 + 3/12 = 11/12</text>`),

  numberLineHop: () => S('0 0 480 140', `
    <title>A number line showing negative three plus five</title>
    <line x1="30" y1="86" x2="450" y2="86" class="f-axis"/>
    ${Array.from({length:13},(_,i)=>{const x=30+i*35,v=i-6;return `<line x1="${x}" y1="80" x2="${x}" y2="92" class="f-rule"/><text x="${x}" y="112" class="f-lab">${v}</text>`}).join('')}
    <line x1="30" y1="86" x2="240" y2="86" class="f-neg"/>
    <path d="M105 82 Q 140 42 175 82" class="f-arc" style="--d:0ms"/>
    <path d="M175 82 Q 210 42 245 82" class="f-arc" style="--d:180ms"/>
    <path d="M245 82 Q 280 42 315 82" class="f-arc" style="--d:360ms"/>
    <path d="M315 82 Q 350 42 385 82" class="f-arc" style="--d:540ms"/>
    <path d="M385 82 Q 420 42 455 82" class="f-arc-off" style="--d:720ms"/>
    <circle cx="105" cy="86" r="6" class="f-start"/>
    <circle cx="280" cy="86" r="7" class="f-marked f-hop"/>
    <text x="30" y="28" class="f-cap" text-anchor="start">-3 + 5 = 2 &nbsp;·&nbsp; start at -3, walk 5 steps right</text>`),

  samplingDots: () => S('0 0 480 190', `
    <title>A small random sample drawn from a large population</title>
    <rect x="14" y="26" width="230" height="150" rx="10" class="f-panel"/>
    <text x="129" y="18" class="f-cap">population — 900 students</text>
    ${Array.from({length:96},(_,i)=>{const x=30+(i%12)*17.5,y=42+Math.floor(i/12)*17;
      const s=[3,7,15,22,29,34,41,50,58,63,71,80,88,93].includes(i);
      return `<circle cx="${x}" cy="${y}" r="${s?5:3.5}" class="${s?'f-sampled':'f-pop'}" style="--d:${i*20}ms"/>`}).join('')}
    <path d="M250 100 L 288 100" class="f-arrow" marker-end="url(#fa)"/>
    <defs><marker id="fa" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" class="f-arrowhead"/></marker></defs>
    <rect x="296" y="46" width="170" height="110" rx="10" class="f-panel2"/>
    <text x="381" y="38" class="f-cap">sample — 60 students</text>
    ${Array.from({length:14},(_,i)=>`<circle cx="${318+(i%5)*33}" cy="${72+Math.floor(i/5)*30}" r="6" class="f-sampled"/>`).join('')}
    <text x="381" y="174" class="f-cap">18 of 60 walk → about 30%</text>`),

  spinner: () => S('0 0 480 200', `
    <title>A spinner with four coloured sectors</title>
    <g transform="translate(150,100)">
      <circle r="76" class="f-panel"/>
      <path d="M0 0 L0 -76 A76 76 0 0 1 76 0 Z" class="f-sec1"/>
      <path d="M0 0 L76 0 A76 76 0 0 1 0 76 Z" class="f-sec2"/>
      <path d="M0 0 L0 76 A76 76 0 0 1 -76 0 Z" class="f-sec3"/>
      <path d="M0 0 L-76 0 A76 76 0 0 1 0 -76 Z" class="f-sec4"/>
      <circle r="76" class="f-ring"/>
      <g class="f-spin"><path d="M0 6 L0 -60 L7 -48 M0 -60 L-7 -48" class="f-needle"/></g>
      <circle r="7" class="f-hub"/>
    </g>
    <text x="256" y="58" class="f-cap" text-anchor="start">4 equal sections</text>
    <text x="256" y="88" class="f-big" text-anchor="start">P = 1/4</text>
    <text x="256" y="118" class="f-cap" text-anchor="start">each section is equally likely,</text>
    <text x="256" y="138" class="f-cap" text-anchor="start">so you may simply count them</text>
    <text x="256" y="166" class="f-cap" text-anchor="start">unequal wedges → use area instead</text>`),

  treeDiagram: () => S('0 0 480 232', `
    <title>A probability tree for two draws without replacement</title>
    <circle cx="44" cy="105" r="9" class="f-hub"/>
    <path d="M53 105 L 160 52" class="f-branch"/><path d="M53 105 L 160 158" class="f-branch"/>
    <text x="96" y="66" class="f-lab2">4/10</text><text x="96" y="152" class="f-lab2">6/10</text>
    <circle cx="172" cy="52" r="15" class="f-sec1"/><text x="172" y="57" class="f-node">R</text>
    <circle cx="172" cy="158" r="15" class="f-sec2"/><text x="172" y="163" class="f-node">B</text>
    <path d="M187 52 L 292 24" class="f-branch f-lit"/><path d="M187 52 L 292 80" class="f-branch"/>
    <path d="M187 158 L 292 130" class="f-branch"/><path d="M187 158 L 292 186" class="f-branch"/>
    <text x="236" y="28" class="f-lab2">3/9</text><text x="236" y="76" class="f-lab2">6/9</text>
    <text x="236" y="126" class="f-lab2">4/9</text><text x="236" y="182" class="f-lab2">5/9</text>
    <circle cx="304" cy="24" r="13" class="f-sec1"/><text x="304" y="29" class="f-node">R</text>
    <circle cx="304" cy="80" r="13" class="f-sec2"/><text x="304" y="85" class="f-node">B</text>
    <circle cx="304" cy="130" r="13" class="f-sec1"/><text x="304" y="135" class="f-node">R</text>
    <circle cx="304" cy="186" r="13" class="f-sec2"/><text x="304" y="191" class="f-node">B</text>
    <text x="330" y="29" class="f-lab3" text-anchor="start">RR = 4/10 × 3/9 = 2/15</text>
    <text x="330" y="85" class="f-lab3" text-anchor="start">RB = 4/15</text>
    <text x="330" y="135" class="f-lab3" text-anchor="start">BR = 4/15</text>
    <text x="330" y="191" class="f-lab3" text-anchor="start">BB = 1/3</text>
    <text x="14" y="226" class="f-cap" text-anchor="start">multiply along a path · add across paths · all four sum to 1</text>`),

  proportionalLine: () => S('0 0 480 200', `
    <title>A proportional graph: a straight line through the origin</title>
    ${Array.from({length:8},(_,i)=>`<line x1="${50+i*50}" y1="20" x2="${50+i*50}" y2="166" class="f-grid"/>`).join('')}
    ${Array.from({length:5},(_,i)=>`<line x1="50" y1="${166-i*36}" x2="400" y2="${166-i*36}" class="f-grid"/>`).join('')}
    <line x1="50" y1="166" x2="410" y2="166" class="f-axis"/>
    <line x1="50" y1="166" x2="50" y2="16" class="f-axis"/>
    <line x1="50" y1="166" x2="386" y2="22" class="f-line"/>
    <circle cx="50" cy="166" r="5" class="f-origin"/>
    <text x="44" y="186" class="f-lab" text-anchor="end">(0,0)</text>
    <circle cx="100" cy="145" r="5" class="f-marked"/>
    <text x="108" y="140" class="f-lab2" text-anchor="start">(1, k)</text>
    <circle cx="0" cy="0" r="7" class="f-runner"><animateMotion dur="4s" repeatCount="indefinite" path="M50,166 L386,22" keyPoints="0;1;1" keyTimes="0;0.75;1" calcMode="linear"/></circle>
    <text x="418" y="26" class="f-cap" text-anchor="start">y = kx</text>
    <text x="14" y="14" class="f-cap" text-anchor="start">every point has the same ratio y ÷ x = k</text>`),

  sequenceBlocks: () => S('0 0 480 182', `
    <title>A growing tile pattern with rule 3n plus 2</title>
    ${[1,2,3,4].map(n => {
      const ox = 22 + (n - 1) * 118, blocks = [];
      for (let i = 0; i < n * 3 + 2; i++) {
        const c = i % 3, rr = Math.floor(i / 3);
        blocks.push(`<rect x="${ox + c * 24}" y="${120 - rr * 24}" width="21" height="21" rx="2" class="${i < 2 ? 'f-fill2' : 'f-fill'}" style="--d:${(n*80 + i*30)}ms"/>`);
      }
      return blocks.join('') + `<text x="${ox + 30}" y="152" class="f-lab">n = ${n}</text>` +
             `<text x="${ox + 30}" y="18" class="f-lab2">${n * 3 + 2}</text>`;
    }).join('')}
    <text x="14" y="176" class="f-cap" text-anchor="start">step of 3 each time, plus a starting 2 → rule: 3n + 2</text>`),

  balanceScale: () => S('0 0 480 180', `
    <title>A balance scale showing an equation stays level</title>
    <path d="M240 40 L 90 40 M240 40 L 390 40" class="f-beam"/>
    <path d="M240 40 L 240 132" class="f-beam"/>
    <path d="M196 148 L 284 148 M240 132 L 240 148" class="f-beam"/>
    <path d="M90 40 L 62 84 L 118 84 Z" class="f-pan"/>
    <path d="M390 40 L 362 84 L 418 84 Z" class="f-pan"/>
    <circle cx="240" cy="40" r="8" class="f-hub"/>
    <text x="90" y="112" class="f-big">3x + 5</text>
    <text x="390" y="112" class="f-big">20</text>
    <text x="240" y="24" class="f-cap">=</text>
    <text x="14" y="172" class="f-cap" text-anchor="start">take 5 from one side, you must take 5 from the other — or it tips</text>`),

  equationSteps: () => S('0 0 480 200', `
    <title>Solving three x plus five equals twenty, one step per line</title>
    ${[['3x + 5 = 20','the equation'],['3x = 15','subtract 5 from both sides'],['x = 5','divide both sides by 3'],['3(5) + 5 = 20 ✓','check in the original']]
      .map((row, i) => `<g class="f-step" style="--d:${i * 500}ms">
        <line x1="26" y1="${30 + i * 46}" x2="26" y2="${62 + i * 46}" class="f-tick"/>
        <text x="46" y="${52 + i * 46}" class="f-eq" text-anchor="start">${row[0]}</text>
        <text x="240" y="${52 + i * 46}" class="f-lab3" text-anchor="start">${row[1]}</text></g>`).join('')}`),

  inequalityLine: () => S('0 0 480 140', `
    <title>Number line showing x is less than or equal to negative four</title>
    <line x1="30" y1="76" x2="450" y2="76" class="f-axis"/>
    ${Array.from({length:13},(_,i)=>{const x=30+i*35,v=i-8;return `<line x1="${x}" y1="70" x2="${x}" y2="82" class="f-rule"/><text x="${x}" y="102" class="f-lab">${v}</text>`}).join('')}
    <line x1="30" y1="76" x2="170" y2="76" class="f-shade"/>
    <path d="M40 76 L 22 76 M30 68 L 20 76 L 30 84" class="f-shade"/>
    <circle cx="170" cy="76" r="8" class="f-closed"/>
    <text x="30" y="30" class="f-cap" text-anchor="start">x ≤ -4 &nbsp;·&nbsp; closed dot includes -4; shading runs left forever</text>
    <text x="196" y="54" class="f-lab2" text-anchor="start">-4 is a solution</text>
    <text x="30" y="130" class="f-lab3" text-anchor="start">an open circle would mean x &lt; -4, leaving -4 out</text>`),

  scaleFigure: () => S('0 0 480 190', `
    <title>A shape scaled by two: lengths double, area quadruples</title>
    <rect x="30" y="112" width="60" height="45" rx="3" class="f-fill"/>
    <text x="60" y="176" class="f-lab">3 × 4 · area 12</text>
    <path d="M108 134 L 146 134" class="f-arrow" marker-end="url(#fa2)"/>
    <defs><marker id="fa2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" class="f-arrowhead"/></marker></defs>
    <text x="127" y="122" class="f-lab2">× 2</text>
    <g>${Array.from({length:4},(_,i)=>`<rect x="${164+(i%2)*60}" y="${67+Math.floor(i/2)*45}" width="60" height="45" rx="3" class="${i===0?'f-fill':'f-fill-soft'}" style="--d:${i*250}ms"/>`).join('')}</g>
    <text x="224" y="176" class="f-lab">6 × 8 · area 48</text>
    <text x="310" y="68" class="f-cap" text-anchor="start">lengths × 2</text>
    <text x="310" y="104" class="f-big" text-anchor="start">area × 4</text>
    <text x="310" y="128" class="f-cap" text-anchor="start">because 2 × 2 = 2²</text>
    <text x="310" y="152" class="f-lab3" text-anchor="start">volume would be × 8</text>`),

  areaDecompose: () => S('0 0 480 180', `
    <title>A parallelogram rearranged into a rectangle of equal area</title>
    <path d="M60 130 L 100 50 L 230 50 L 190 130 Z" class="f-fill"/>
    <path d="M100 50 L 60 130 L 100 130 Z" class="f-slice"/>
    <line x1="100" y1="50" x2="100" y2="130" class="f-dash"/>
    <text x="145" y="158" class="f-lab">parallelogram: b × h</text>
    <path d="M250 90 L 288 90" class="f-arrow" marker-end="url(#fa3)"/>
    <defs><marker id="fa3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" class="f-arrowhead"/></marker></defs>
    <rect x="308" y="50" width="130" height="80" class="f-fill"/>
    <path d="M438 50 L 438 130 L 398 130 Z" class="f-slice-moved"/>
    <text x="373" y="158" class="f-lab">same rectangle, same area</text>
    <line x1="296" y1="50" x2="296" y2="130" class="f-dim"/>
    <text x="286" y="94" class="f-lab2" text-anchor="end">h</text>
    <text x="14" y="18" class="f-cap" text-anchor="start">cut the triangle off one end, slide it to the other — nothing is lost</text>`),

  cubeSlice: () => S('0 0 480 200', `
    <title>A plane slicing through a cube to reveal a hexagon</title>
    <g transform="translate(120,102)">
      <path d="M-62 -42 L 34 -78 L 34 30 L -62 66 Z" class="f-face-a"/>
      <path d="M-62 -42 L 34 -78 L 96 -42 L 0 -6 Z" class="f-face-b"/>
      <path d="M0 -6 L 96 -42 L 96 66 L 0 102 Z" class="f-face-c"/>
      <path d="M-62 -42 L 34 -78 L 96 -42 L 96 66 L 0 102 L -62 66 Z" class="f-edge"/>
      <path d="M0 -6 L 0 102 M0 -6 L -62 -42 M0 -6 L 96 -42" class="f-edge-in"/>
      <path d="M-62 12 L -14 -42 L 50 -60 L 96 -6 L 48 48 L -16 66 Z" class="f-plane"/>
    </g>
    <text x="252" y="56" class="f-cap" text-anchor="start">one flat cut, six faces crossed</text>
    <text x="252" y="88" class="f-big" text-anchor="start">→ a hexagon</text>
    <text x="252" y="118" class="f-cap" text-anchor="start">cut 3 faces near a corner → triangle</text>
    <text x="252" y="140" class="f-cap" text-anchor="start">cut parallel to a face → square</text>
    <text x="252" y="170" class="f-lab3" text-anchor="start">one side per face the plane meets</text>`),

  prismNet: () => S('0 0 480 200', `
    <title>A box unfolded into its net, showing six faces</title>
    <g class="f-unfold">
      <rect x="150" y="76" width="70" height="50" class="f-tile"/>
      <rect x="220" y="76" width="50" height="50" class="f-tile"/>
      <rect x="270" y="76" width="70" height="50" class="f-tile"/>
      <rect x="340" y="76" width="50" height="50" class="f-tile"/>
      <rect x="220" y="26" width="50" height="50" class="f-tile2"/>
      <rect x="220" y="126" width="50" height="50" class="f-tile2"/>
    </g>
    <text x="185" y="106" class="f-nl">7×5</text><text x="245" y="106" class="f-nl">3×5</text>
    <text x="305" y="106" class="f-nl">7×5</text><text x="365" y="106" class="f-nl">3×5</text>
    <text x="245" y="56" class="f-nl">7×3</text><text x="245" y="156" class="f-nl">7×3</text>
    <text x="14" y="20" class="f-cap" text-anchor="start">surface area = the area of the whole net</text>
    <text x="14" y="52" class="f-lab3" text-anchor="start">2(7×5) + 2(3×5)</text>
    <text x="14" y="72" class="f-lab3" text-anchor="start">+ 2(7×3)</text>
    <text x="14" y="108" class="f-big" text-anchor="start">= 142</text>
    <text x="14" y="136" class="f-lab3" text-anchor="start">volume is different:</text>
    <text x="14" y="156" class="f-lab3" text-anchor="start">7 × 5 × 3 = 105</text>`),

  angleFan: () => S('0 0 480 180', `
    <title>Two crossing lines with vertical and supplementary angles marked</title>
    <line x1="60" y1="150" x2="300" y2="30" class="f-axis"/>
    <line x1="60" y1="46" x2="300" y2="140" class="f-axis"/>
    <path d="M205 60 A 42 42 0 0 1 216 96" class="f-angarc"/>
    <path d="M136 108 A 42 42 0 0 1 148 71" class="f-angarc"/>
    <path d="M148 71 A 42 42 0 0 1 205 60" class="f-angarc2"/>
    <path d="M216 96 A 42 42 0 0 1 136 108" class="f-angarc2"/>
    <text x="232" y="86" class="f-lab2" text-anchor="start">52°</text>
    <text x="118" y="94" class="f-lab2" text-anchor="end">52°</text>
    <text x="176" y="52" class="f-lab2">128°</text>
    <text x="176" y="126" class="f-lab2">128°</text>
    <circle cx="178" cy="93" r="5" class="f-hub"/>
    <text x="320" y="62" class="f-cap" text-anchor="start">opposite angles are equal</text>
    <text x="320" y="88" class="f-cap" text-anchor="start">neighbours sum to 180°</text>
    <text x="320" y="118" class="f-lab3" text-anchor="start">52 + 52 + 128 + 128 = 360</text>`)
,

  /* ---------------- Grade 8 ---------------- */

  transformGrid: () => { const tri = (x, y, f) => `M${x} ${y} L${x} ${y - 40} L${x + 35 * f} ${y} Z`;
    return S('0 0 480 236', `
    <title>The three rigid motions: slide, flip, turn</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">a rigid motion moves a shape without bending or resizing it</text>
    ${[10, 168, 326].map(x => GRID(x, 44, 134, 148, 19)).join('')}
    ${[10, 168, 326].map(x => `<rect x="${x}" y="44" width="134" height="148" class="f-panel" fill="none"/>`).join('')}
    <path d="${tri(30, 175, 1)}" class="f-tile"/><path d="${tri(95, 175, 1)}" class="f-fill2"/>
    ${ARR(72, 145, 92, 145)}
    <line x1="237" y1="50" x2="237" y2="186" class="f-dash"/>
    <path d="${tri(225, 175, -1)}" class="f-tile"/><path d="${tri(249, 175, 1)}" class="f-fill2"/>
    <path d="${tri(385, 175, 1)}" class="f-tile"/><path d="M385 175 L345 175 L385 140 Z" class="f-fill2"/>
    <circle cx="385" cy="175" r="4" class="f-hub"/>
    <text x="77" y="208" class="f-name">translate</text><text x="77" y="226" class="f-lab3">slide it over</text>
    <text x="235" y="208" class="f-name">reflect</text><text x="235" y="226" class="f-lab3">flip over a line</text>
    <text x="393" y="208" class="f-name">rotate</text><text x="393" y="226" class="f-lab3">turn about a point</text>`); },

  congruentPair: () => S('0 0 480 226', `
    <title>Congruent triangles with matching sides marked</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">congruent = same size and same shape, however it has been moved</text>
    <path d="M60 180 L170 180 L105 92 Z" class="f-tile"/>
    <path d="M310 190 L310 80 L400 135 Z" class="f-tile2"/>
    ${TK(60, 180, 170, 180, 1)}${TK(310, 190, 310, 80, 1)}
    ${TK(60, 180, 105, 92, 2)}${TK(310, 190, 400, 135, 2)}
    ${TK(170, 180, 105, 92, 3)}${TK(310, 80, 400, 135, 3)}
    <text x="54" y="192" class="f-lab" text-anchor="end">A</text>
    <text x="176" y="192" class="f-lab" text-anchor="start">B</text>
    <text x="105" y="84" class="f-lab">C</text>
    <text x="304" y="200" class="f-lab" text-anchor="end">A'</text>
    <text x="304" y="74" class="f-lab" text-anchor="end">B'</text>
    <text x="408" y="140" class="f-lab" text-anchor="start">C'</text>
    ${ARR(196, 136, 286, 136)}
    <text x="241" y="126" class="f-lab3">rotate</text>
    <text x="14" y="222" class="f-lab3" text-anchor="start">one tick matches one tick: AB = A'B', AC = A'C', BC = B'C'</text>`),

  dilationRays: () => S('0 0 480 240', `
    <title>A dilation from a centre, scale factor 2</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">a dilation stretches every distance from the centre by the same factor</text>
    <line x1="40" y1="200" x2="150" y2="94" class="f-arc-off"/>
    <line x1="40" y1="200" x2="250" y2="174" class="f-arc-off"/>
    <line x1="40" y1="200" x2="150" y2="174" class="f-arc-off"/>
    <path d="M90 148 L140 186 L90 186 Z" class="f-tile"/>
    <path d="M140 96 L240 172 L140 172 Z" class="f-tile2" fill-opacity=".1"/>
    <circle cx="40" cy="200" r="5" class="f-hub"/>
    <text x="34" y="216" class="f-lab" text-anchor="end">O</text>
    <text x="84" y="142" class="f-lab" text-anchor="end">A</text>
    <text x="134" y="90" class="f-lab" text-anchor="end">A'</text>
    <text x="248" y="188" class="f-lab" text-anchor="start">B'</text>
    <text x="142" y="198" class="f-lab" text-anchor="start">B</text>
    <text x="272" y="96" class="f-cap" text-anchor="start">scale factor k = 2</text>
    <text x="272" y="122" class="f-lab3" text-anchor="start">OA' is twice OA</text>
    <text x="272" y="144" class="f-lab3" text-anchor="start">every side doubles</text>
    <text x="272" y="166" class="f-lab3" text-anchor="start">every angle stays the same</text>
    <text x="272" y="192" class="f-lab2" text-anchor="start">similar, not congruent</text>
    <text x="14" y="230" class="f-lab3" text-anchor="start">k &gt; 1 enlarges, 0 &lt; k &lt; 1 shrinks, k = 1 changes nothing</text>`),

  parallelCut: () => S('0 0 480 244', `
    <title>Parallel lines cut by a transversal</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">a transversal across parallel lines makes only two different angles</text>
    <line x1="40" y1="170" x2="272" y2="170" class="f-axis"/>
    <line x1="40" y1="80" x2="272" y2="80" class="f-axis"/>
    <line x1="72" y1="210" x2="184" y2="50" class="f-line"/>
    <path d="M128 170 A 28 28 0 0 0 116.1 147.1" class="f-angarc"/>
    <path d="M116.1 147.1 A 28 28 0 0 0 72 170" class="f-angarc2"/>
    <path d="M191 80 A 28 28 0 0 0 179.1 57.1" class="f-angarc"/>
    <text x="137" y="157" class="f-lab2" text-anchor="start">55</text>
    <text x="80" y="134" class="f-lab">125</text>
    <text x="200" y="66" class="f-lab2" text-anchor="start">55</text>
    <text x="278" y="84" class="f-lab" text-anchor="start">a</text>
    <text x="278" y="174" class="f-lab" text-anchor="start">b</text>
    <text x="52" y="66" class="f-lab3" text-anchor="start">a is parallel to b</text>
    <text x="310" y="104" class="f-cap" text-anchor="start">corresponding</text>
    <text x="310" y="124" class="f-lab3" text-anchor="start">angles are equal</text>
    <text x="310" y="152" class="f-cap" text-anchor="start">co-interior</text>
    <text x="310" y="172" class="f-lab3" text-anchor="start">angles add to 180</text>
    <text x="14" y="236" class="f-lab3" text-anchor="start">55 + 125 = 180, so every angle in the picture is 55 or 125</text>`),

  slopeTriangle: () => S('0 0 480 250', `
    <title>Slope as rise over run, the same anywhere on the line</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">slope is a rate: how far up for every step across</text>
    ${GRID(50, 54, 234, 156, 26)}
    <line x1="44" y1="210" x2="292" y2="210" class="f-axis"/>
    <line x1="50" y1="216" x2="50" y2="48" class="f-axis"/>
    <line x1="50" y1="184" x2="219" y2="71" class="f-line"/>
    <path d="M50 184 L128 184 L128 132 Z" class="f-tile"/>
    <path d="M128 132 L206 132 L206 80 Z" class="f-tile2"/>
    <text x="89" y="199" class="f-lab">run 3</text>
    <text x="134" y="163" class="f-lab2" text-anchor="start">rise 2</text>
    <text x="167" y="147" class="f-lab">run 3</text>
    <text x="212" y="111" class="f-lab2" text-anchor="start">rise 2</text>
    ${DOTS([[50, 184], [128, 132], [206, 80]], 'f-hub')}
    <text x="310" y="104" class="f-cap" text-anchor="start">rise</text>
    <line x1="310" y1="112" x2="348" y2="112" class="f-axis"/>
    <text x="310" y="130" class="f-cap" text-anchor="start">run</text>
    <text x="360" y="120" class="f-big" text-anchor="start">= 2/3</text>
    <text x="310" y="162" class="f-lab3" text-anchor="start">both triangles give 2/3</text>
    <text x="310" y="182" class="f-lab3" text-anchor="start">that is what makes it</text>
    <text x="310" y="200" class="f-lab3" text-anchor="start">a straight line</text>
    <text x="14" y="240" class="f-lab3" text-anchor="start">going down as you move right makes the rise negative</text>`),

  interceptLine: () => S('0 0 480 250', `
    <title>y = mx + b: slope and y-intercept</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">two numbers fix a line: where it starts and how steep it is</text>
    ${GRID(60, 54, 208, 156, 26)}
    <line x1="52" y1="210" x2="292" y2="210" class="f-axis"/>
    <line x1="60" y1="216" x2="60" y2="48" class="f-axis"/>
    <line x1="60" y1="158" x2="268" y2="54" class="f-line"/>
    <path d="M112 132 L216 132 L216 80 Z" class="f-tile"/>
    <text x="164" y="147" class="f-lab">run 4</text>
    <text x="222" y="110" class="f-lab2" text-anchor="start">rise 2</text>
    <circle cx="60" cy="158" r="5" class="f-hub"/>
    <text x="54" y="152" class="f-lab2" text-anchor="end">b = 2</text>
    <text x="54" y="168" class="f-lab3" text-anchor="end">start here</text>
    <text x="308" y="88" class="f-big" text-anchor="start">y = mx + b</text>
    <text x="308" y="126" class="f-cap" text-anchor="start">m = slope</text>
    <text x="308" y="146" class="f-lab3" text-anchor="start">2/4 = 1/2 here</text>
    <text x="308" y="174" class="f-cap" text-anchor="start">b = y-intercept</text>
    <text x="308" y="194" class="f-lab3" text-anchor="start">the value when x = 0</text>
    <text x="14" y="240" class="f-lab3" text-anchor="start">y = (1/2)x + 2 : start at 2, then go up 1 for every 2 across</text>`),

  systemCross: () => S('0 0 480 250', `
    <title>Two lines meeting at the solution of a system</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">the solution of a system is the point that satisfies both equations</text>
    ${GRID(55, 44, 234, 156, 26)}
    <line x1="47" y1="200" x2="300" y2="200" class="f-axis"/>
    <line x1="55" y1="206" x2="55" y2="38" class="f-axis"/>
    <line x1="55" y1="174" x2="185" y2="44" class="f-line"/>
    <line x1="55" y1="57" x2="289" y2="174" class="f-mark"/>
    <circle cx="133" cy="96" r="6" class="f-hub"/>
    <text x="142" y="90" class="f-lab2" text-anchor="start">(3, 4)</text>
    <text x="192" y="48" class="f-lab" text-anchor="start">y = x + 1</text>
    <text x="296" y="182" class="f-lab" text-anchor="start">x + 2y = 11</text>
    <text x="14" y="226" class="f-lab3" text-anchor="start">check in both: 4 = 3 + 1 and 3 + 2(4) = 11</text>
    <text x="14" y="244" class="f-lab3" text-anchor="start">parallel lines never meet, so that system has no solution</text>`),

  scatterCloud: () => { const P = (x, pts) => pts.map(p => `<circle cx="${(x + 14 + p[0] * 108).toFixed(1)}" cy="${(166 - p[1] * 112).toFixed(1)}" r="3.4" class="f-dot"/>`).join('');
    const up = [[.06, .12], [.18, .28], [.28, .2], [.4, .42], [.5, .5], [.6, .62], [.72, .55], [.84, .8], [.94, .88]];
    const dn = up.map(p => [1 - p[0], p[1]]);
    const no = [[.1, .68], [.22, .22], [.34, .56], [.44, .14], [.52, .82], [.62, .38], [.74, .64], [.84, .18], [.94, .5]];
    return S('0 0 480 222', `
    <title>Positive, negative and no association in scatter plots</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">a scatter plot shows two measurements for each person or thing</text>
    ${[10, 168, 326].map(x => `<rect x="${x}" y="40" width="136" height="136" class="f-panel"/>` +
      `<line x1="${x + 10}" y1="170" x2="${x + 128}" y2="170" class="f-axis"/>` +
      `<line x1="${x + 10}" y1="170" x2="${x + 10}" y2="46" class="f-axis"/>`).join('')}
    ${P(10, up)}${P(168, dn)}${P(326, no)}
    <text x="78" y="196" class="f-name">positive</text>
    <text x="236" y="196" class="f-name">negative</text>
    <text x="394" y="196" class="f-name">none</text>
    <text x="78" y="214" class="f-lab3">up together</text>
    <text x="236" y="214" class="f-lab3">one up, one down</text>
    <text x="394" y="214" class="f-lab3">no pattern</text>`); },

  trendLine: () => S('0 0 480 246', `
    <title>A line of best fit through a scatter plot</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">the line of best fit runs through the middle of the cloud</text>
    <line x1="60" y1="200" x2="336" y2="200" class="f-axis"/>
    <line x1="60" y1="206" x2="60" y2="48" class="f-axis"/>
    <line x1="70" y1="190" x2="325" y2="72" class="f-line"/>
    ${DOTS([[85, 180], [105, 190], [120, 165], [140, 158], [155, 170], [175, 140], [195, 132], [210, 145], [230, 118], [250, 105], [270, 112], [295, 85], [315, 78]])}
    <text x="198" y="218" class="f-lab">hours practised</text>
    <text x="60" y="40" class="f-lab" text-anchor="start">score</text>
    <text x="352" y="90" class="f-cap" text-anchor="start">roughly</text>
    <text x="352" y="110" class="f-cap" text-anchor="start">half above,</text>
    <text x="352" y="130" class="f-cap" text-anchor="start">half below</text>
    <text x="352" y="158" class="f-lab3" text-anchor="start">use it to predict</text>
    <text x="352" y="176" class="f-lab3" text-anchor="start">inside the data,</text>
    <text x="352" y="194" class="f-lab3" text-anchor="start">not far outside it</text>
    <text x="14" y="238" class="f-lab3" text-anchor="start">a trend is not a cause — both may be following something else entirely</text>`),

  twoWayGrid: () => S('0 0 480 222', `
    <title>A two-way frequency table with row and column totals</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">a two-way table counts every person once, in exactly one cell</text>
    <rect x="40" y="44" width="260" height="150" class="f-panel"/>
    <rect x="40" y="44" width="260" height="34" class="f-panel2"/>
    <rect x="40" y="160" width="260" height="34" class="f-panel2"/>
    <line x1="120" y1="44" x2="120" y2="194" class="f-rule"/>
    <line x1="180" y1="44" x2="180" y2="194" class="f-rule"/>
    <line x1="240" y1="44" x2="240" y2="194" class="f-rule"/>
    <line x1="40" y1="78" x2="300" y2="78" class="f-rule"/>
    <line x1="40" y1="119" x2="300" y2="119" class="f-rule"/>
    <line x1="40" y1="160" x2="300" y2="160" class="f-rule"/>
    <text x="150" y="67" class="f-name">dog</text><text x="210" y="67" class="f-name">no dog</text><text x="270" y="67" class="f-name">total</text>
    <text x="80" y="104" class="f-name">cat</text><text x="80" y="145" class="f-name">no cat</text><text x="80" y="183" class="f-name">total</text>
    <text x="150" y="104" class="f-lab2">12</text><text x="210" y="104" class="f-lab2">18</text><text x="270" y="104" class="f-lab">30</text>
    <text x="150" y="145" class="f-lab2">20</text><text x="210" y="145" class="f-lab2">10</text><text x="270" y="145" class="f-lab">30</text>
    <text x="150" y="183" class="f-lab">32</text><text x="210" y="183" class="f-lab">28</text><text x="270" y="183" class="f-lab">60</text>
    <text x="316" y="100" class="f-lab3" text-anchor="start">rows add across</text>
    <text x="316" y="120" class="f-lab3" text-anchor="start">columns add down</text>
    <text x="316" y="140" class="f-lab3" text-anchor="start">both reach 60</text>
    <text x="14" y="214" class="f-lab3" text-anchor="start">12 of the 32 dog owners also keep a cat, which is about 38 percent of them</text>`),

  distancePlane: () => S('0 0 480 232', `
    <title>Distance between two points as a right triangle</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">the distance formula is the Pythagorean theorem in disguise</text>
    ${GRID(55, 60, 224, 140, 28)}
    <line x1="47" y1="200" x2="288" y2="200" class="f-axis"/>
    <line x1="55" y1="208" x2="55" y2="54" class="f-axis"/>
    <path d="M83 172 L167 172 L167 88 Z" class="f-tile"/>
    <line x1="83" y1="172" x2="167" y2="88" class="f-line"/>
    ${DOTS([[83, 172], [167, 88]], 'f-hub')}
    <text x="78" y="188" class="f-lab" text-anchor="end">A(1, 1)</text>
    <text x="174" y="82" class="f-lab" text-anchor="start">B(5, 4)</text>
    <text x="125" y="189" class="f-lab2">4 across</text>
    <text x="173" y="134" class="f-lab2" text-anchor="start">3 up</text>
    <text x="304" y="92" class="f-cap" text-anchor="start">d^2 = 4^2 + 3^2</text>
    <text x="304" y="118" class="f-cap" text-anchor="start">d^2 = 16 + 9 = 25</text>
    <text x="304" y="148" class="f-big" text-anchor="start">d = 5</text>
    <text x="14" y="224" class="f-lab3" text-anchor="start">subtract the x values for the run, the y values for the rise, then use a^2 + b^2 = c^2</text>`),

  solidsTrio: () => S('0 0 480 224', `
    <title>Volume of a cylinder, a cone and a sphere</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">three round solids, three formulas worth knowing cold</text>
    <path d="M40 62 L40 158 A 35 12 0 0 0 110 158 L110 62" class="f-face-b"/>
    <path d="M40 62 L40 158 A 35 12 0 0 0 110 158 L110 62" class="f-edge"/>
    <ellipse cx="75" cy="62" rx="35" ry="12" class="f-face-a"/>
    <ellipse cx="75" cy="62" rx="35" ry="12" class="f-edge"/>
    <path d="M180 158 L215 58 L250 158" class="f-face-b"/>
    <path d="M180 158 L215 58 L250 158" class="f-edge"/>
    <ellipse cx="215" cy="158" rx="35" ry="12" class="f-face-a"/>
    <ellipse cx="215" cy="158" rx="35" ry="12" class="f-edge"/>
    <circle cx="380" cy="110" r="52" class="f-face-b"/>
    <circle cx="380" cy="110" r="52" class="f-edge"/>
    <ellipse cx="380" cy="110" rx="52" ry="17" class="f-edge-in"/>
    <line x1="75" y1="62" x2="110" y2="62" class="f-dim"/>
    <text x="93" y="56" class="f-lab">r</text>
    <line x1="126" y1="62" x2="126" y2="158" class="f-dim"/>
    <text x="133" y="114" class="f-lab" text-anchor="start">h</text>
    <line x1="380" y1="110" x2="432" y2="110" class="f-dim"/>
    <text x="406" y="104" class="f-lab">r</text>
    <text x="75" y="186" class="f-name">cylinder</text><text x="215" y="186" class="f-name">cone</text><text x="380" y="186" class="f-name">sphere</text>
    <text x="75" y="206" class="f-lab2">V = pi r^2 h</text>
    <text x="215" y="206" class="f-lab2">V = (1/3) pi r^2 h</text>
    <text x="380" y="206" class="f-lab2">V = (4/3) pi r^3</text>
    <text x="14" y="220" class="f-lab3" text-anchor="start">a cone holds exactly one third of the cylinder that would wrap around it</text>`)
,

  /* ---------------- Grade 9: Algebra I ---------------- */

  structureTerms: () => S('0 0 480 206', `
    <title>The parts of an algebraic expression</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">reading an expression is half of algebra</text>
    <text x="108" y="112" class="f-big">3</text>
    <text x="128" y="112" class="f-big">x</text>
    <text x="144" y="98" class="f-lab2" text-anchor="start">2</text>
    <text x="172" y="112" class="f-big">+</text>
    <text x="200" y="112" class="f-big">5</text>
    <text x="219" y="112" class="f-big">x</text>
    <text x="246" y="112" class="f-big">-</text>
    <text x="270" y="112" class="f-big">8</text>
    ${ARR(96, 56, 106, 92)}${ARR(160, 56, 132, 92)}${ARR(214, 56, 148, 90)}
    <text x="76" y="48" class="f-lab" text-anchor="start">coefficient</text>
    <text x="150" y="48" class="f-lab" text-anchor="start">variable</text>
    <text x="216" y="48" class="f-lab" text-anchor="start">exponent</text>
    <path d="M98 128 L98 134 L152 134 L152 128" class="f-dim" fill="none"/>
    <path d="M192 128 L192 134 L230 134 L230 128" class="f-dim" fill="none"/>
    <path d="M240 128 L240 134 L282 134 L282 128" class="f-dim" fill="none"/>
    <text x="125" y="150" class="f-lab3">term</text>
    <text x="211" y="150" class="f-lab3">term</text>
    <text x="261" y="150" class="f-lab3">constant term</text>
    <text x="320" y="96" class="f-cap" text-anchor="start">3 terms</text>
    <text x="320" y="118" class="f-lab3" text-anchor="start">degree 2</text>
    <text x="320" y="138" class="f-lab3" text-anchor="start">one variable</text>
    <text x="14" y="184" class="f-lab3" text-anchor="start">+ and - signs cut an expression into terms; the sign in front belongs to the term after it</text>
    <text x="14" y="200" class="f-lab3" text-anchor="start">so the third term is -8, not 8</text>`),

  shiftLines: () => S('0 0 480 252', `
    <title>Changing b slides a line; m keeps it parallel</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">change b and the line slides; change m and it tilts</text>
    ${GRID(60, 42, 192, 176, 24)}
    <line x1="52" y1="146" x2="264" y2="146" class="f-axis"/>
    <line x1="60" y1="224" x2="60" y2="36" class="f-axis"/>
    <line x1="60" y1="98" x2="132" y2="26" class="f-line"/>
    <line x1="60" y1="146" x2="180" y2="26" class="f-dash"/>
    <line x1="60" y1="218" x2="252" y2="26" class="f-mark"/>
    <line x1="300" y1="86" x2="336" y2="86" class="f-line"/>
    <text x="346" y="91" class="f-lab" text-anchor="start">y = x + 2</text>
    <line x1="300" y1="118" x2="336" y2="118" class="f-dash"/>
    <text x="346" y="123" class="f-lab" text-anchor="start">y = x</text>
    <line x1="300" y1="150" x2="336" y2="150" class="f-mark"/>
    <text x="346" y="155" class="f-lab" text-anchor="start">y = x - 3</text>
    <text x="300" y="184" class="f-lab3" text-anchor="start">same m, so all three</text>
    <text x="300" y="202" class="f-lab3" text-anchor="start">stay parallel</text>
    <text x="14" y="244" class="f-lab3" text-anchor="start">f(x) + k moves the graph up k; f(x + k) moves it left k, which surprises nearly everyone</text>`),

  growthCurves: () => { const pts = [0, 1, 2, 3, 4, 5, 6, 7].map(t => [60 + t * 40, 190 - (Math.pow(2, t) / 128) * 150]);
    return S('0 0 480 234', `
    <title>Linear growth against exponential growth</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">adding the same amount, against multiplying by the same amount</text>
    <line x1="52" y1="190" x2="352" y2="190" class="f-axis"/>
    <line x1="60" y1="198" x2="60" y2="34" class="f-axis"/>
    <line x1="60" y1="190" x2="340" y2="64" class="f-mark"/>
    <polyline points="${pts.map(p => p[0].toFixed(0) + ',' + p[1].toFixed(1)).join(' ')}" class="f-line"/>
    ${DOTS(pts.map(p => [p[0], +p[1].toFixed(1)]), 'f-hub')}
    <text x="248" y="122" class="f-lab" text-anchor="start">+ 6 each step</text>
    <text x="216" y="146" class="f-lab2" text-anchor="start">x 2 each step</text>
    <text x="198" y="212" class="f-lab">time</text>
    <text x="66" y="48" class="f-lab" text-anchor="start">amount</text>
    <text x="368" y="96" class="f-lab3" text-anchor="start">linear:</text>
    <text x="368" y="114" class="f-lab3" text-anchor="start">y = mx + b</text>
    <text x="368" y="144" class="f-lab3" text-anchor="start">exponential:</text>
    <text x="368" y="162" class="f-lab3" text-anchor="start">y = a(b)^x</text>
    <text x="14" y="226" class="f-lab3" text-anchor="start">the exponential starts behind and still overtakes, every single time</text>`); },

  areaModelPoly: () => S('0 0 480 230', `
    <title>Multiplying two binomials with an area model</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">a rectangle turns multiplying brackets into adding areas</text>
    <rect x="70" y="60" width="140" height="100" class="f-tile"/>
    <rect x="210" y="60" width="60" height="100" class="f-tile2"/>
    <rect x="70" y="160" width="140" height="40" class="f-tile2"/>
    <rect x="210" y="160" width="60" height="40" class="f-tile"/>
    <rect x="70" y="60" width="200" height="140" class="f-edge"/>
    <line x1="210" y1="60" x2="210" y2="200" class="f-edge"/>
    <line x1="70" y1="160" x2="270" y2="160" class="f-edge"/>
    <text x="140" y="50" class="f-name">x</text><text x="240" y="50" class="f-name">3</text>
    <text x="60" y="115" class="f-name" text-anchor="end">x</text><text x="60" y="185" class="f-name" text-anchor="end">2</text>
    <text x="140" y="116" class="f-lab2">x^2</text><text x="240" y="116" class="f-lab2">3x</text>
    <text x="140" y="186" class="f-lab2">2x</text><text x="240" y="186" class="f-lab2">6</text>
    <text x="294" y="88" class="f-cap" text-anchor="start">(x + 3)(x + 2)</text>
    <text x="294" y="116" class="f-lab3" text-anchor="start">= x^2 + 3x + 2x + 6</text>
    <text x="294" y="142" class="f-lab2" text-anchor="start">= x^2 + 5x + 6</text>
    <text x="14" y="222" class="f-lab3" text-anchor="start">every pair gets multiplied once, which is all that FOIL is really saying</text>`),

  factorBox: () => S('0 0 480 230', `
    <title>Factoring a quadratic by finding the side lengths</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">factoring runs the area model backwards: you know the inside, find the sides</text>
    <rect x="70" y="60" width="150" height="95" class="f-tile"/>
    <rect x="220" y="60" width="60" height="95" class="f-tile2"/>
    <rect x="70" y="155" width="150" height="45" class="f-tile2"/>
    <rect x="220" y="155" width="60" height="45" class="f-tile"/>
    <rect x="70" y="60" width="210" height="140" class="f-edge"/>
    <line x1="220" y1="60" x2="220" y2="200" class="f-edge"/>
    <line x1="70" y1="155" x2="280" y2="155" class="f-edge"/>
    <text x="145" y="50" class="f-lab2">x</text><text x="250" y="50" class="f-lab2">3</text>
    <text x="60" y="112" class="f-lab2" text-anchor="end">x</text><text x="60" y="182" class="f-lab2" text-anchor="end">4</text>
    <text x="145" y="113" class="f-name">x^2</text><text x="250" y="113" class="f-name">3x</text>
    <text x="145" y="183" class="f-name">4x</text><text x="250" y="183" class="f-name">12</text>
    <text x="304" y="84" class="f-cap" text-anchor="start">x^2 + 7x + 12</text>
    <text x="304" y="112" class="f-lab3" text-anchor="start">need a . b = 12</text>
    <text x="304" y="132" class="f-lab3" text-anchor="start">and a + b = 7</text>
    <text x="304" y="158" class="f-lab2" text-anchor="start">3 and 4</text>
    <text x="304" y="184" class="f-cap" text-anchor="start">(x + 3)(x + 4)</text>
    <text x="14" y="222" class="f-lab3" text-anchor="start">list the factor pairs of 12: 1 and 12, 2 and 6, 3 and 4 — only the last pair adds to 7</text>`),

  parabolaParts: () => { const pt = u => [140 + 40 * u, 170 - 30 * (u * u - 4 * u + 3)];
    const path = []; for (let u = -0.2; u <= 4.21; u += 0.2) { const p = pt(u); path.push(p[0].toFixed(1) + ',' + p[1].toFixed(1)); }
    return S('0 0 480 262', `
    <title>The key features of a parabola</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">y = x^2 - 4x + 3</text>
    <line x1="96" y1="170" x2="348" y2="170" class="f-axis"/>
    <line x1="140" y1="240" x2="140" y2="46" class="f-axis"/>
    <line x1="220" y1="52" x2="220" y2="228" class="f-dash"/>
    <polyline points="${path.join(' ')}" class="f-line"/>
    ${DOTS([[180, 170], [260, 170], [220, 200], [140, 80]], 'f-hub')}
    <text x="174" y="162" class="f-lab" text-anchor="end">(1, 0)</text>
    <text x="266" y="162" class="f-lab" text-anchor="start">(3, 0)</text>
    <text x="230" y="214" class="f-lab2" text-anchor="start">vertex (2, -1)</text>
    <text x="134" y="76" class="f-lab" text-anchor="end">(0, 3)</text>
    <text x="226" y="62" class="f-lab3" text-anchor="start">axis x = 2</text>
    <text x="360" y="96" class="f-lab3" text-anchor="start">a &gt; 0, so it</text>
    <text x="360" y="114" class="f-lab3" text-anchor="start">opens upward</text>
    <text x="360" y="142" class="f-lab3" text-anchor="start">roots are where</text>
    <text x="360" y="160" class="f-lab3" text-anchor="start">y = 0</text>
    <text x="14" y="252" class="f-lab3" text-anchor="start">the axis sits halfway between the roots, and x = -b/2a agrees</text>`); },

  quadRoots: () => S('0 0 480 206', `
    <title>The zero product property</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">if a product equals zero, at least one factor must be zero</text>
    <rect x="165" y="34" width="150" height="28" rx="5" class="f-panel2"/>
    <text x="240" y="53" class="f-eq" text-anchor="middle">x^2 - 5x + 6 = 0</text>
    <rect x="165" y="76" width="150" height="28" rx="5" class="f-panel2"/>
    <text x="240" y="95" class="f-eq" text-anchor="middle">(x - 2)(x - 3) = 0</text>
    ${ARR(240, 62, 240, 74)}${ARR(204, 104, 156, 118)}${ARR(276, 104, 324, 118)}
    <rect x="88" y="120" width="104" height="26" rx="5" class="f-panel"/>
    <text x="140" y="138" class="f-eq" text-anchor="middle">x - 2 = 0</text>
    <rect x="288" y="120" width="104" height="26" rx="5" class="f-panel"/>
    <text x="340" y="138" class="f-eq" text-anchor="middle">x - 3 = 0</text>
    ${ARR(140, 146, 140, 158)}${ARR(340, 146, 340, 158)}
    <rect x="110" y="160" width="60" height="26" rx="5" class="f-panel2"/>
    <text x="140" y="178" class="f-lab2">x = 2</text>
    <rect x="310" y="160" width="60" height="26" rx="5" class="f-panel2"/>
    <text x="340" y="178" class="f-lab2">x = 3</text>
    <text x="14" y="200" class="f-lab3" text-anchor="start">this works only against zero — a product of 6 would tell you nothing</text>`),

  radicalLadder: () => S('0 0 480 196', `
    <title>Simplifying a square root by pulling out a perfect square</title>
    <text x="14" y="26" class="f-cap" text-anchor="start">pull out the largest perfect square</text>
    <rect x="20" y="72" width="76" height="34" rx="5" class="f-panel"/>
    <text x="58" y="95" class="f-eq" text-anchor="middle">sqrt 72</text>
    ${ARR(100, 89, 118, 89)}
    <rect x="122" y="72" width="104" height="34" rx="5" class="f-panel"/>
    <text x="174" y="95" class="f-eq" text-anchor="middle">sqrt(36 . 2)</text>
    ${ARR(230, 89, 248, 89)}
    <rect x="252" y="72" width="124" height="34" rx="5" class="f-panel"/>
    <text x="314" y="95" class="f-eq" text-anchor="middle">sqrt36 . sqrt2</text>
    ${ARR(380, 89, 398, 89)}
    <rect x="402" y="72" width="62" height="34" rx="5" class="f-panel2"/>
    <text x="433" y="95" class="f-eq" text-anchor="middle">6 sqrt2</text>
    <text x="58" y="132" class="f-lab3">start</text>
    <text x="174" y="132" class="f-lab3">square factor</text>
    <text x="314" y="132" class="f-lab3">split the root</text>
    <text x="433" y="132" class="f-lab3">done</text>
    <text x="14" y="164" class="f-lab3" text-anchor="start">36 is the biggest perfect square dividing 72; check it: 6^2 . 2 = 36 . 2 = 72</text>
    <text x="14" y="184" class="f-lab3" text-anchor="start">using 4 instead gives 2 sqrt18, which is right but not yet finished</text>`),

  absVeeGraph: () => S('0 0 480 236', `
    <title>Absolute value graphs form a V at the vertex</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">absolute value measures distance, so it is never negative</text>
    <line x1="40" y1="170" x2="404" y2="170" class="f-axis"/>
    <line x1="170" y1="204" x2="170" y2="46" class="f-axis"/>
    <polyline points="50,58 170,170 290,58" class="f-line"/>
    <polyline points="140,58 260,170 350,86" class="f-mark"/>
    ${DOTS([[170, 170], [260, 170]], 'f-hub')}
    <text x="44" y="50" class="f-lab" text-anchor="start">y = |x|</text>
    <text x="356" y="82" class="f-lab" text-anchor="start">y = |x - 3|</text>
    <text x="164" y="190" class="f-lab" text-anchor="end">(0, 0)</text>
    <text x="268" y="190" class="f-lab" text-anchor="start">(3, 0)</text>
    <text x="14" y="220" class="f-lab3" text-anchor="start">the V bends at the vertex, where the inside of the bars is zero</text>
    <text x="14" y="234" class="f-lab3" text-anchor="start">|x - 3| = 0 when x = 3, which is why the graph slides right, not left</text>`),

  boxPlotSpread: () => S('0 0 480 216', `
    <title>A box plot and the five-number summary</title>
    <text x="14" y="24" class="f-cap" text-anchor="start">the box holds the middle half; the whiskers show the rest</text>
    <line x1="102" y1="98" x2="167" y2="98" class="f-axis"/>
    <line x1="310" y1="98" x2="401" y2="98" class="f-axis"/>
    <line x1="102" y1="86" x2="102" y2="110" class="f-axis"/>
    <line x1="401" y1="86" x2="401" y2="110" class="f-axis"/>
    <rect x="167" y="78" width="143" height="40" class="f-panel2"/>
    <line x1="232" y1="78" x2="232" y2="118" class="f-tick"/>
    <text x="102" y="66" class="f-lab">min 4</text>
    <text x="167" y="66" class="f-lab">Q1 9</text>
    <text x="232" y="66" class="f-lab2">median 14</text>
    <text x="310" y="66" class="f-lab">Q3 20</text>
    <text x="401" y="66" class="f-lab">max 27</text>
    <path d="M167 130 L167 136 L310 136 L310 130" class="f-dim" fill="none"/>
    <text x="238" y="152" class="f-lab3">IQR = 20 - 9 = 11</text>
    <text x="401" y="152" class="f-lab3">range 23</text>
    <line x1="50" y1="178" x2="450" y2="178" class="f-axis"/>
    ${[0, 5, 10, 15, 20, 25, 30].map(v => `<line x1="${50 + v * 13}" y1="178" x2="${50 + v * 13}" y2="184" class="f-axis"/><text x="${50 + v * 13}" y="198" class="f-nl">${v}</text>`).join('')}
    <text x="14" y="212" class="f-lab3" text-anchor="start">each of the four pieces holds about a quarter of the values</text>`)
,

  /* ---------------- Discovery illustrations ---------------- */

  discTransform: () => S('0 0 400 268', `
    <defs>${LGRAD('dtA', '#fde3c0', '#f6c98d')}${LGRAD('dtB', '#cfe4f2', '#a9cde6')}</defs>
    <rect width="400" height="268" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the same paper card, moved three ways</text>
    ${GRID(24, 44, 352, 210, 22)}
    <g>
      <path d="M40 150 L40 100 L84 150 Z" class="f-shadow" transform="translate(2 3)"/>
      <path d="M40 150 L40 100 L84 150 Z" fill="url(#dtA)" stroke="#c98a3e" stroke-width="2"/>
      <circle cx="46" cy="140" r="3.4" fill="#8a4638"/>
      <text x="56" y="164" class="f-step">start</text>
    </g>
    ${ARR(94, 124, 128, 124)}
    <g>
      <path d="M140 150 L140 100 L184 150 Z" class="f-shadow" transform="translate(2 3)"/>
      <path d="M140 150 L140 100 L184 150 Z" fill="url(#dtA)" stroke="#c98a3e" stroke-width="2"/>
      <circle cx="146" cy="140" r="3.4" fill="#8a4638"/>
      <text x="162" y="164" class="f-step">slid over</text>
    </g>
    <line x1="212" y1="70" x2="212" y2="176" class="f-dash"/>
    <g>
      <path d="M284 150 L284 100 L240 150 Z" class="f-shadow" transform="translate(2 3)"/>
      <path d="M284 150 L284 100 L240 150 Z" fill="url(#dtB)" stroke="#4f86aa" stroke-width="2"/>
      <circle cx="278" cy="140" r="3.4" fill="#8a4638"/>
      <text x="262" y="164" class="f-step">flipped</text>
    </g>
    <g>
      <path d="M344 150 L344 100 L300 106 Z" class="f-shadow" transform="translate(2 3)"/>
      <path d="M344 150 L344 100 L300 106 Z" fill="url(#dtB)" stroke="#4f86aa" stroke-width="2"/>
      <circle cx="340" cy="142" r="3.4" fill="#8a4638"/>
      <text x="330" y="164" class="f-step">turned</text>
    </g>
    <g transform="translate(0 20)">
      <text x="200" y="226" class="f-cap">same three side lengths every time</text>
    </g>`),

  discCongruent: () => S('0 0 400 273', `
    <defs>${LGRAD('dcA', '#fde3c0', '#eeb877')}</defs>
    <rect width="400" height="273" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">two pieces cut from the same die</text>
    <g>
      <path d="M70 160 L170 160 L112 76 Z" class="f-shadow" transform="translate(3 4)"/>
      <path d="M70 160 L170 160 L112 76 Z" fill="url(#dcA)" stroke="#c98a3e" stroke-width="2.2"/>
      ${TK(70,160,170,160,1)}${TK(70,160,112,76,2)}${TK(170,160,112,76,3)}
      <text x="120" y="182" class="f-step">piece A</text>
    </g>
    <g>
      <path d="M250 200 L250 100 L334 158 Z" class="f-shadow" transform="translate(3 4)"/>
      <path d="M250 200 L250 100 L334 158 Z" fill="url(#dcA)" stroke="#c98a3e" stroke-width="2.2"/>
      ${TK(250,200,250,100,1)}${TK(250,200,334,158,2)}${TK(250,100,334,158,3)}
      <text x="292" y="222" class="f-step">piece B, turned</text>
    </g>
    ${ARR(186, 130, 234, 130)}
    <text x="210" y="120" class="f-lab3">turn it</text>
    <text x="200" y="256" class="f-cap">one tick fits one tick, two fit two, three fit three</text>`),

  discDilate: () => S('0 0 400 295', `
    <defs>${GRAD('ddLamp', '#fff6d8', '#ffe08a', '#f0bc4e')}</defs>
    <rect width="400" height="295" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a projector makes a bigger copy, never a different shape</text>
    <path d="M46 168 L200 96 L200 240 Z" fill="var(--accent)" opacity=".08"/>
    <path d="M46 168 L340 60 L340 276 Z" fill="var(--accent)" opacity=".05"/>
    <line x1="46" y1="168" x2="340" y2="60" class="f-arc-off"/>
    <line x1="46" y1="168" x2="340" y2="276" class="f-arc-off"/>
    <line x1="46" y1="168" x2="340" y2="168" class="f-arc-off"/>
    <circle cx="46" cy="168" r="13" fill="url(#ddLamp)" stroke="#c98a3e" stroke-width="1.8"/>
    <text x="46" y="200" class="f-step">lamp</text>
    <g>
      <rect x="140" y="138" width="42" height="60" rx="3" class="f-shadow" transform="translate(2 2)"/>
      <rect x="140" y="138" width="42" height="60" rx="3" fill="#dcebf7" stroke="#4f86aa" stroke-width="1.8"/>
      <circle cx="152" cy="154" r="5" fill="#f0bc4e"/>
      <path d="M144 192 L158 168 L168 180 L178 164 L178 192 Z" fill="#8fbf8a"/>
      <text x="161" y="214" class="f-step">the slide</text>
    </g>
    <g>
      <rect x="256" y="108" width="84" height="120" rx="4" class="f-shadow" transform="translate(3 3)"/>
      <rect x="256" y="108" width="84" height="120" rx="4" fill="#dcebf7" stroke="#4f86aa" stroke-width="2.2"/>
      <circle cx="280" cy="140" r="10" fill="#f0bc4e"/>
      <path d="M264 216 L292 168 L312 192 L332 160 L332 216 Z" fill="#8fbf8a"/>
      <text x="298" y="248" class="f-step">the picture on the wall</text>
    </g>
    <text x="200" y="278" class="f-cap">twice as far from the lamp means twice as wide and twice as tall</text>`),

  discMultistep: () => S('0 0 400 329', `
    <defs>${LGRAD('dmBag', '#f6c98d', '#dfa25c', true)}</defs>
    <rect width="400" height="329" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">take the same thing off both pans and it still balances</text>
    ${[0,1].map(row => { const y = 66 + row*130;
      const nBags = row ? 1 : 3, nRight = row ? 0 : 2;
      return `<line x1="60" y1="${y}" x2="340" y2="${y}" class="f-beam"/>
      <path d="M200 ${y} L200 ${y+44}" class="f-beam"/>
      <path d="M182 ${y+44} L218 ${y+44} L206 ${y+58} L194 ${y+58} Z" fill="var(--ink2)"/>
      <path d="M${60-26} ${y+4} A 30 30 0 0 0 ${60+26} ${y+4}" class="f-pan"/>
      <path d="M${340-26} ${y+4} A 30 30 0 0 0 ${340+26} ${y+4}" class="f-pan"/>
      ${[...Array(nBags)].map((_,i)=>`<g transform="translate(${44+i*16} ${y-13})">
         <path d="M-6 0 q6 -9 12 0 q3 12 -6 12 q-9 0 -6 -12 z" fill="url(#dmBag)" stroke="#c98a3e" stroke-width="1.2"/>
         <text x="0" y="9" style="font:700 7px var(--sans);fill:#6b4a1f" text-anchor="middle">x</text></g>`).join('')}
      ${[...Array(row?5:7)].map((_,i)=>`<circle cx="${318+(i%4)*12}" cy="${y-8-Math.floor(i/4)*12}" r="4.6" fill="var(--ink2)"/>`).join('')}
      ${[...Array(nRight)].map((_,i)=>`<g transform="translate(${296+i*16} ${y-13})">
         <path d="M-6 0 q6 -9 12 0 q3 12 -6 12 q-9 0 -6 -12 z" fill="url(#dmBag)" stroke="#c98a3e" stroke-width="1.2" opacity="${row?'.25':'1'}"/></g>`).join('')}
      <text x="200" y="${y+80}" class="f-step">${row ? 'one bag left, and five weights — so one bag weighs five'
        : 'take two bags off each side'}</text>`; }).join('')}
    <text x="200" y="312" class="f-lab2">every legal step in algebra is that one move, written down</text>`),

  discAngles8: () => S('0 0 400 304', `
    <rect width="400" height="304" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a road cutting two parallel tracks</text>
    ${[0,1].map(i => { const y = 110 + i*92;
      return `<rect x="30" y="${y-9}" width="340" height="18" rx="3" fill="#d8cfc0"/>
      <line x1="30" y1="${y-5}" x2="370" y2="${y-5}" stroke="#a89880" stroke-width="2.2"/>
      <line x1="30" y1="${y+5}" x2="370" y2="${y+5}" stroke="#a89880" stroke-width="2.2"/>
      ${[...Array(12)].map((_,k)=>`<rect x="${38+k*28}" y="${y-11}" width="7" height="22" fill="#b09a78"/>`).join('')}`; }).join('')}
    <path d="M118 290 L282 50" stroke="#5a4a3a" stroke-width="15" opacity=".85" stroke-linecap="round"/>
    <path d="M118 290 L282 50" stroke="#fff" stroke-width="2" stroke-dasharray="12 12" opacity=".8"/>
    ${ARC(180, 202, 34, 0, 55, 'f-angarc')}
    ${ARC(180, 202, 34, 55, 180, 'f-angarc2')}
    ${ARC(243, 110, 34, 0, 55, 'f-angarc')}
    <text x="222" y="192" class="f-lab2" text-anchor="start">55°</text>
    <text x="152" y="176" class="f-lab">125°</text>
    <text x="286" y="100" class="f-lab2" text-anchor="start">55°</text>
    <text x="200" y="256" class="f-cap">the road meets the second track at the very same tilt</text>`),

  discSlope: () => S('0 0 400 289', `
    <defs>${LGRAD('dsRamp', '#cfe4f2', '#9cc6e0', true)}</defs>
    <rect width="400" height="289" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the same ramp, measured at two places</text>
    <path d="M40 240 L340 96 L340 240 Z" fill="url(#dsRamp)" stroke="#4f86aa" stroke-width="2.2"/>
    ${[0,1].map(i => { const x0 = 90 + i*130, run = 90, x1 = x0 + run;
      const yAt = x => 240 - (x - 40) * (144/300);
      return `<path d="M${x0} ${yAt(x0).toFixed(1)} L${x1} ${yAt(x0).toFixed(1)} L${x1} ${yAt(x1).toFixed(1)} Z" fill="var(--mark)" opacity=".25"/>
      <line x1="${x0}" y1="${yAt(x0).toFixed(1)}" x2="${x1}" y2="${yAt(x0).toFixed(1)}" class="f-dim"/>
      <line x1="${x1}" y1="${yAt(x0).toFixed(1)}" x2="${x1}" y2="${yAt(x1).toFixed(1)}" class="f-dim"/>
      <text x="${x0+run/2}" y="${(yAt(x0)+15).toFixed(1)}" class="f-lab">across 3</text>
      <text x="${x1+7}" y="${((yAt(x0)+yAt(x1))/2+4).toFixed(1)}" class="f-lab2" text-anchor="start">up 2</text>`; }).join('')}
    <circle cx="40" cy="240" r="4.5" class="f-hub"/><circle cx="340" cy="96" r="4.5" class="f-hub"/>
    <text x="200" y="272" class="f-cap">near the bottom or near the top, it climbs 2 for every 3 across</text>`),

  discFunction: () => S('0 0 400 295', `
    <defs>${LGRAD('dfM', '#e8eef5', '#c6d3e0', true)}</defs>
    <rect width="400" height="295" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">press B4 and you always get the same snack</text>
    <rect x="96" y="44" width="208" height="210" rx="10" fill="url(#dfM)" stroke="#5a4a3a" stroke-width="2.4"/>
    <rect x="110" y="58" width="122" height="128" rx="5" fill="#fdfaf3" stroke="#a89880" stroke-width="1.6"/>
    ${[0,1,2].map(r => [0,1,2].map(c =>
      `<rect x="${118+c*38}" y="${66+r*42}" width="30" height="32" rx="3" fill="${r===1&&c===1?'var(--accent)':'#e4dccd'}" opacity="${r===1&&c===1?'.85':'1'}" stroke="#b8a895" stroke-width="1"/>`).join('')).join('')}
    <text x="171" y="132" style="font:700 13px var(--sans);fill:#fff" text-anchor="middle">B4</text>
    <rect x="244" y="58" width="48" height="128" rx="5" fill="#2b3a4a"/>
    ${[0,1,2,3].map(r => [0,1].map(c =>
      `<circle cx="${258+c*20}" cy="${74+r*30}" r="8" fill="${r===1&&c===1?'var(--accent)':'#4b5b6b'}"/>
       <text x="${258+c*20}" y="${78+r*30}" style="font:700 8px var(--sans);fill:#fff" text-anchor="middle">${'ABCD'[r]}${c+3}</text>`).join('')).join('')}
    <rect x="110" y="200" width="182" height="40" rx="5" fill="#2b3a4a"/>
    <rect x="124" y="208" width="30" height="24" rx="3" fill="var(--accent)" opacity=".9"/>
    <text x="222" y="224" style="font:600 11px var(--sans);fill:#cfd8e2" text-anchor="middle">collect here</text>
    ${ARR(200, 192, 200, 202)}
    <text x="200" y="278" class="f-cap">one button in, one snack out — every single time</text>`),

  discScatter: () => { const kids = [[2,52],[3,58],[3.5,55],[4,64],[5,66],[5.5,73],[6,70],[7,81],[7.5,78],[8,88]];
    return S('0 0 400 249', `
    <rect width="400" height="249" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one child, two measurements, one dot</text>
    <rect x="26" y="42" width="128" height="140" rx="6" class="f-card"/>
    <text x="90" y="60" class="f-step">the sheet</text>
    <line x1="36" y1="68" x2="144" y2="68" class="f-rule"/>
    <text x="52" y="82" style="font:600 8.5px var(--sans);fill:var(--ink3)" text-anchor="middle">hours</text>
    <text x="112" y="82" style="font:600 8.5px var(--sans);fill:var(--ink3)" text-anchor="middle">score</text>
    ${kids.slice(0,6).map((k,i)=>`<text x="52" y="${98+i*14}" style="font:500 9px var(--sans);fill:var(--ink2)" text-anchor="middle">${k[0]}</text>
      <text x="112" y="${98+i*14}" style="font:500 9px var(--sans);fill:var(--ink2)" text-anchor="middle">${k[1]}</text>`).join('')}
    ${ARR(160, 122, 186, 122)}
    <line x1="200" y1="182" x2="372" y2="182" class="f-axis"/>
    <line x1="200" y1="182" x2="200" y2="48" class="f-axis"/>
    ${kids.map(k=>`<circle cx="${(200+k[0]*20).toFixed(0)}" cy="${(182-(k[1]-46)*2.6).toFixed(0)}" r="4.4" class="f-hub"/>`).join('')}
    <text x="286" y="198" class="f-lab">hours practised</text>
    <text x="200" y="40" class="f-lab" text-anchor="start">score</text>
    <text x="200" y="232" class="f-cap">each row of the sheet becomes exactly one dot</text>`); }
,

  discLinearfn: () => S('0 0 400 273', `
    <defs>${LGRAD('dlM', '#2b3a4a', '#1d2836', true)}${GRAD('dlCoin', '#fff3cf', '#f0cf7e', '#d6a93f')}</defs>
    <rect width="400" height="273" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a taxi meter: a fee to start, then a rate per mile</text>
    <rect x="132" y="44" width="136" height="80" rx="8" fill="url(#dlM)" stroke="#5a4a3a" stroke-width="2"/>
    <rect x="144" y="56" width="112" height="34" rx="3" fill="#0f1720"/>
    <text x="200" y="80" style="font:700 19px var(--mono, monospace);fill:#7fe08a" text-anchor="middle">$3.00</text>
    <text x="200" y="110" style="font:600 9.5px var(--sans);fill:#a9b6c3" text-anchor="middle">before you move an inch</text>
    ${[0,1,2,3].map(i => { const x = 60 + i*90, tot = 3 + 2*i;
      return `<g transform="translate(${x} 176)">
        <rect x="-32" y="-14" width="64" height="30" rx="6" class="f-card"/>
        <text x="0" y="6" style="font:700 12px var(--sans);fill:var(--ink)" text-anchor="middle">$${tot}.00</text>
        <text x="0" y="34" class="f-step">${i === 0 ? 'mile 0' : 'mile ' + i}</text>
        ${[...Array(i ? 1 : 0)].map(() => COIN(0, -34, 9, 'dlCoin')).join('')}
        ${i ? `<text x="0" y="-48" class="f-lab2">+$2</text>` : ''}
      </g>`; }).join('')}
    ${[0,1,2].map(i => ARR(60 + i*90 + 36, 176, 60 + (i+1)*90 - 36, 176)).join('')}
    <text x="200" y="256" class="f-cap">the $3 never comes back — it is where the meter starts</text>`),

  discSystems8: () => S('0 0 400 305', `
    <rect width="400" height="305" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">two hire shops, one day where they cost the same</text>
    <g>
      <rect x="26" y="44" width="150" height="66" rx="7" class="f-card"/>
      <text x="101" y="66" style="font:700 11.5px var(--sans);fill:var(--accent-2)" text-anchor="middle">SHOP A</text>
      <text x="101" y="86" class="f-lab">$20 to join</text>
      <text x="101" y="102" class="f-lab">+ $6 a day</text>
    </g>
    <g>
      <rect x="224" y="44" width="150" height="66" rx="7" class="f-card"/>
      <text x="299" y="66" style="font:700 11.5px var(--sans);fill:var(--mark)" text-anchor="middle">SHOP B</text>
      <text x="299" y="86" class="f-lab">$50 to join</text>
      <text x="299" y="102" class="f-lab">+ $3 a day</text>
    </g>
    ${GRID(52, 130, 300, 132, 30)}
    <line x1="46" y1="262" x2="364" y2="262" class="f-axis"/>
    <line x1="52" y1="268" x2="52" y2="124" class="f-axis"/>
    <line x1="52" y1="242" x2="352" y2="122" class="f-line"/>
    <line x1="52" y1="212" x2="352" y2="152" class="f-mark"/>
    <circle cx="202" cy="182" r="7" class="f-hub"/>
    <text x="212" y="176" class="f-lab2" text-anchor="start">day 10, $80 either way</text>
    <text x="358" y="118" class="f-lab" text-anchor="end">A</text>
    <text x="358" y="166" class="f-lab" text-anchor="end">B</text>
    <text x="200" y="288" class="f-cap">before day 10 shop A is cheaper; after it, shop B is</text>`),

  discBestfit: () => { const pts = [[62,236],[86,244],[104,218],[128,210],[146,224],[170,190],[196,180],[212,196],[240,164],[266,148],[290,158],[316,124],[338,112]];
    return S('0 0 400 305', `
    <defs>${LGRAD('dbR', '#f3e2c4', '#e0c79b')}</defs>
    <rect width="400" height="305" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">lay a ruler through the middle of the cloud</text>
    <line x1="46" y1="262" x2="368" y2="262" class="f-axis"/>
    <line x1="52" y1="268" x2="52" y2="48" class="f-axis"/>
    ${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4.6" class="f-dot"/>`).join('')}
    ${pts.map(p=>{ const ly = 250 - (p[0]-52)*0.42; return `<line x1="${p[0]}" y1="${p[1]}" x2="${p[0]}" y2="${ly.toFixed(1)}" stroke="var(--mark)" stroke-width="1.3" opacity=".55"/>`; }).join('')}
    <g transform="rotate(-22.8 52 250)">
      <rect x="46" y="240" width="330" height="18" rx="3" fill="url(#dbR)" stroke="#b8a895" stroke-width="1.4"/>
      ${[...Array(16)].map((_,i)=>`<line x1="${56+i*20}" y1="240" x2="${56+i*20}" y2="${i%2?248:252}" stroke="#8a7a66" stroke-width="1"/>`).join('')}
    </g>
    <text x="200" y="288" class="f-cap">roughly half the dots sit above the ruler, half below</text>`); },

  discTwoway: () => S('0 0 400 292', `
    <rect width="400" height="292" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">sixty people, two questions, four boxes</text>
    <text x="200" y="46" class="f-lab3">do you own a dog?  do you own a cat?</text>
    ${[[0,0,12,'f-person-2'],[1,0,18,'f-person'],[0,1,20,'f-person-3'],[1,1,10,'f-person']].map(([c,r,n,cls]) => {
      const x0 = 78 + c*150, y0 = 66 + r*112;
      return `<rect x="${x0}" y="${y0}" width="136" height="100" rx="8" fill="var(--paper)" stroke="var(--rule)" stroke-width="1.4"/>
        <text x="${x0+70}" y="${y0+18}" class="f-step">${['dog + cat','dog, no cat','cat, no dog','neither'][r*2+c]}</text>
        ${[...Array(n)].map((_,i)=>PERSON(x0 + 17 + (i%7)*17, y0 + 44 + Math.floor(i/7)*22, .78, cls)).join('')}
        <text x="${x0+126}" y="${y0+94}" class="f-lab2" text-anchor="end">${n}</text>`; }).join('')}`),

  discDistance: () => S('0 0 400 289', `
    <rect width="400" height="289" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">four blocks east, three blocks north — or cut across the park</text>
    ${[...Array(5)].map((_,r)=>[...Array(6)].map((_,c)=>
      `<rect x="${44+c*54}" y="${48+r*44}" width="46" height="36" rx="3" fill="#e8e0d2" stroke="#d3c8b6" stroke-width="1"/>`).join('')).join('')}
    <rect x="98" y="136" width="208" height="80" rx="6" fill="#cfe6cc" stroke="#8fbf8a" stroke-width="1.6"/>
    <text x="202" y="180" style="font:600 11px var(--sans);fill:#4a7a46" text-anchor="middle">the park</text>
    <path d="M98 224 L314 224" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M314 224 L314 128" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" opacity=".85"/>
    <path d="M98 224 L314 128" stroke="var(--mark)" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 0"/>
    <circle cx="98" cy="224" r="7" fill="var(--wrong)"/>
    <circle cx="314" cy="128" r="7" class="f-hub"/>
    <text x="206" y="244" class="f-lab2">4 blocks</text>
    <text x="324" y="180" class="f-lab2" text-anchor="start">3 blocks</text>
    <text x="186" y="164" class="f-lab" text-anchor="end">the short cut</text>
    <text x="200" y="272" class="f-cap">walking the streets is 4 + 3 = 7 blocks</text>`),

  discSciNot: () => S('0 0 400 240', `
    <rect width="400" height="240" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">how many zeros did you just read?</text>
    <rect x="24" y="44" width="352" height="46" rx="6" class="f-card"/>
    <text x="200" y="74" style="font:600 16px var(--mono, monospace);fill:var(--ink)" text-anchor="middle">300 000 000</text>
    <text x="200" y="106" class="f-step">the speed of light, in metres per second</text>
    <text x="200" y="134" class="f-lab3">count the zeros. Now look away and say how many there were.</text>
    ${ARR(200, 148, 200, 170)}
    <rect x="128" y="180" width="144" height="46" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="200" y="211" style="font:600 17px var(--serif)" fill="var(--ink)" text-anchor="middle">3 × 10⁸</text>`),

  discVolume8: () => S('0 0 400 261', `
    <defs>${LGRAD('dvW', '#bfe0f2', '#7fb8de', true)}</defs>
    <rect width="400" height="261" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">fill the cone, pour it in — three times exactly fills the can</text>
    ${[0,1,2].map(i => { const x = 62 + i*58, fill = 1;
      return `<g transform="translate(${x} 96)">
        <path d="M-26 44 L0 -30 L26 44" fill="url(#dvW)" opacity=".85" stroke="#4f86aa" stroke-width="1.6"/>
        <ellipse cx="0" cy="44" rx="26" ry="9" fill="#a9cde6" stroke="#4f86aa" stroke-width="1.6"/>
        <text x="0" y="72" class="f-step">pour ${i+1}</text>
      </g>`; }).join('')}
    ${ARR(214, 108, 244, 108)}
    <g transform="translate(316 60)">
      <path d="M-34 0 L-34 130 A 34 12 0 0 0 34 130 L34 0" fill="#e8eef2" stroke="#4f86aa" stroke-width="2"/>
      <path d="M-34 44 L-34 130 A 34 12 0 0 0 34 130 L34 44 A 34 12 0 0 1 -34 44" fill="url(#dvW)" opacity=".9"/>
      <ellipse cx="0" cy="44" rx="34" ry="12" fill="#bfe0f2" stroke="#4f86aa" stroke-width="1.4"/>
      <ellipse cx="0" cy="0" rx="34" ry="12" fill="#f4f8fa" stroke="#4f86aa" stroke-width="2"/>
      <text x="0" y="158" class="f-step">same radius, same height</text>
    </g>
    <text x="200" y="244" class="f-cap">three coneloads, not two and not four</text>`)
,

  discExpr: () => S('0 0 400 213', `
    <rect width="400" height="213" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">an expression is built out of parts, like a sentence</text>
    <g transform="translate(0 20)">
      ${TILE(44, 56, 92, 56, 'var(--accent-soft)', 'var(--accent)')}
      <text x="90" y="92" style="font:600 22px var(--serif);fill:var(--ink)" text-anchor="middle">3x²</text>
      <text x="164" y="92" style="font:600 22px var(--serif);fill:var(--ink3)" text-anchor="middle">+</text>
      ${TILE(192, 56, 70, 56, 'var(--accent-soft)', 'var(--accent)')}
      <text x="227" y="92" style="font:600 22px var(--serif);fill:var(--ink)" text-anchor="middle">5x</text>
      <text x="284" y="92" style="font:600 22px var(--serif);fill:var(--ink3)" text-anchor="middle">−</text>
      ${TILE(308, 56, 48, 56, 'var(--mark-soft)', 'var(--mark)')}
      <text x="332" y="92" style="font:600 22px var(--serif);fill:var(--ink)" text-anchor="middle">8</text>
      <text x="90" y="132" class="f-step">term</text>
      <text x="227" y="132" class="f-step">term</text>
      <text x="332" y="132" class="f-step">term</text>
    </g>
    <text x="200" y="196" class="f-cap">the + and − signs are the spaces between the words</text>`),

  discSolving: () => S('0 0 400 199', `
    <defs>${LGRAD('dsoBag', '#f6c98d', '#dfa25c', true)}</defs>
    <rect width="400" height="199" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a sealed bag on a balanced scale</text>
    <line x1="70" y1="90" x2="330" y2="90" class="f-beam"/>
    <path d="M200 90 L200 140" class="f-beam"/>
    <path d="M180 140 L220 140 L208 158 L192 158 Z" fill="var(--ink2)"/>
    <path d="M44 94 A 30 30 0 0 0 96 94" class="f-pan"/>
    <path d="M304 94 A 30 30 0 0 0 356 94" class="f-pan"/>
    <g transform="translate(58 66)">
      <path d="M-12 0 q12 -18 24 0 q6 24 -12 24 q-18 0 -12 -24 z" fill="url(#dsoBag)" stroke="#c98a3e" stroke-width="1.6"/>
      <text x="0" y="18" style="font:700 13px var(--serif);fill:#6b4a1f" text-anchor="middle">x</text>
    </g>
    ${[0,1,2].map(i=>`<circle cx="${80+i*10}" cy="82" r="5" fill="var(--ink2)"/>`).join('')}
    ${[...Array(7)].map((_,i)=>`<circle cx="${312+(i%4)*13}" cy="${82-Math.floor(i/4)*13}" r="5" fill="var(--ink2)"/>`).join('')}
    <text x="70" y="182" class="f-step">x + 3</text>
    <text x="330" y="182" class="f-step">7</text>
    <text x="200" y="182" class="f-lab2">balanced</text>`),

  discInequal: () => S('0 0 400 267', `
    <rect width="400" height="267" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a height limit is not a single height</text>
    <rect x="40" y="52" width="320" height="104" rx="8" fill="#e9f1f5" stroke="#b8cdd9" stroke-width="1.4"/>
    <line x1="40" y1="92" x2="360" y2="92" stroke="#8a4638" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="368" y="96" class="f-lab2" text-anchor="end">1.4 m bar</text>
    ${[[80,110,'f-person-2','yes'],[140,124,'f-person-2','yes'],[200,92,'f-person-3','just'],[262,74,'f-person','no'],[320,64,'f-person','no']].map(([x,y,cls,lab])=>
      `${PERSON(x, y, 1.7, cls)}<line x1="${x}" y1="${y+12}" x2="${x}" y2="156" stroke="#b8a895" stroke-width="1"/>
       <text x="${x}" y="172" class="f-step">${lab}</text>`).join('')}
    <text x="200" y="204" class="f-cap">"you must be under 1.4 m" lets in a whole range of people, not one</text>
    <line x1="64" y1="228" x2="336" y2="228" class="f-axis"/>
    <line x1="64" y1="228" x2="236" y2="228" class="f-shade"/>
    <circle cx="236" cy="228" r="6" fill="var(--paper)" stroke="var(--accent)" stroke-width="2.6"/>
    <text x="236" y="250" class="f-lab">1.4</text>
    <text x="140" y="250" class="f-lab2">everyone here rides</text>`),

  discWriteLinear: () => S('0 0 400 301', `
    <rect width="400" height="301" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">read the bill, then write the rule</text>
    <rect x="96" y="42" width="208" height="150" rx="8" class="f-card"/>
    <text x="200" y="64" style="font:700 11px var(--sans);fill:var(--accent-2)" text-anchor="middle">PHONE BILL</text>
    <line x1="112" y1="74" x2="288" y2="74" class="f-rule"/>
    <text x="118" y="96" style="font:500 11px var(--sans);fill:var(--ink2)" text-anchor="start">monthly charge</text>
    <text x="282" y="96" style="font:600 11px var(--sans);fill:var(--ink)" text-anchor="end">$25.00</text>
    <text x="118" y="120" style="font:500 11px var(--sans);fill:var(--ink2)" text-anchor="start">340 texts @ $0.10</text>
    <text x="282" y="120" style="font:600 11px var(--sans);fill:var(--ink)" text-anchor="end">$34.00</text>
    <line x1="112" y1="134" x2="288" y2="134" class="f-rule"/>
    <text x="118" y="158" style="font:700 12px var(--sans);fill:var(--ink)" text-anchor="start">total</text>
    <text x="282" y="158" style="font:700 12px var(--sans);fill:var(--accent-2)" text-anchor="end">$59.00</text>
    <text x="200" y="180" class="f-step">send no texts at all and you still owe $25</text>
    ${ARR(200, 198, 200, 216)}
    <rect x="120" y="224" width="160" height="38" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="200" y="249" style="font:600 16px var(--serif);fill:var(--ink)" text-anchor="middle">C = 0.10t + 25</text>
    <text x="200" y="284" class="f-cap">the fixed line on the bill is b; the per-text line is m</text>`),

  discRegression: () => { const pts = [[74,214],[96,228],[118,196],[142,188],[164,206],[188,166],[212,154],[232,172],[258,138],[282,122],[306,134],[330,102]];
    return S('0 0 400 293', `
    <rect width="400" height="293" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the line summarises; the gaps tell you how well</text>
    <line x1="52" y1="246" x2="368" y2="246" class="f-axis"/>
    <line x1="58" y1="252" x2="58" y2="48" class="f-axis"/>
    <line x1="62" y1="228" x2="344" y2="104" class="f-line"/>
    ${pts.map(p=>{ const ly = 228 - (p[0]-62)*0.44; const above = p[1] < ly;
      return `<line x1="${p[0]}" y1="${p[1]}" x2="${p[0]}" y2="${ly.toFixed(1)}" stroke="${above?'var(--accent)':'var(--mark)'}" stroke-width="1.6" opacity=".7"/>
        <circle cx="${p[0]}" cy="${p[1]}" r="4.4" class="f-dot"/>`; }).join('')}
    <text x="200" y="276" class="f-cap">a gap above the line is a positive residual, below it a negative one</text>`); },

  discExponential: () => S('0 0 400 239', `
    <defs>${GRAD('deG', '#fff6d8', '#f0d38a', '#cfa845')}</defs>
    <rect width="400" height="239" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one grain on the first square, then double every time</text>
    ${[...Array(8)].map((_, n) => { const r = Math.floor(n / 4), c = n % 4,
        x = 56 + c * 74, y = 46 + r * 74, grains = Math.pow(2, n);
      const dots = Math.min(grains, 16);
      let pile = '';
      for (let k = 0; k < dots; k++) {
        const a = k * 2.399, rad = 4 + Math.sqrt(k) * 5.4;
        pile += `<circle cx="${(x + 33 + Math.cos(a) * rad).toFixed(1)}" cy="${(y + 40 + Math.sin(a) * rad * .62).toFixed(1)}" r="3.1" fill="url(#deG)" stroke="#b08a34" stroke-width=".7"/>`;
      }
      return `<rect x="${x}" y="${y}" width="66" height="66" fill="${(r + c) % 2 ? '#e4dccd' : '#f7f2e7'}" stroke="#c9bda8" stroke-width="1"/>`
        + pile
        + `<text x="${x + 33}" y="${y + 16}" class="f-lab2">${grains}</text>`; }).join('')}
    <text x="200" y="222" class="f-cap">square 8 already needs 128 grains, and the board has 64 squares</text>`),

  discSequences: () => S('0 0 400 253', `
    <rect width="400" height="253" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a growing pattern, stage by stage</text>
    ${[1,2,3,4].map((n,i)=>{ const x0 = 26 + i*90, base = 3*n + 1;
      let sq = '';
      for (let k = 0; k < n; k++) sq += TILE(x0 + 14 + k*17, 150 - 17, 15, 15, 'var(--accent-soft)', 'var(--accent)');
      for (let k = 0; k < n; k++) sq += TILE(x0 + 14 + k*17, 150, 15, 15, 'var(--accent-soft)', 'var(--accent)');
      for (let k = 0; k < n; k++) sq += TILE(x0 + 14 + k*17, 150 + 17, 15, 15, 'var(--accent-soft)', 'var(--accent)');
      sq += TILE(x0 + 14 + n*17, 150, 15, 15, 'var(--mark-soft)', 'var(--mark)');
      return `${sq}<text x="${x0 + 14 + n*8.5}" y="128" class="f-step">stage ${n}</text>
        <text x="${x0 + 14 + n*8.5}" y="200" class="f-lab2">${base} tiles</text>`; }).join('')}
    <text x="200" y="236" class="f-cap">each stage adds the same three tiles — one to every row</text>`),

  discPolynomials: () => S('0 0 400 259', `
    <rect width="400" height="259" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="17" class="f-title">a rectangle x + 3 wide and x + 2 tall</text>
    ${TILE(90, 52, 150, 110, 'var(--accent-soft)', 'var(--accent)')}
    ${TILE(240, 52, 66, 110, 'var(--mark-soft)', 'var(--mark)')}
    ${TILE(90, 162, 150, 48, 'var(--mark-soft)', 'var(--mark)')}
    ${TILE(240, 162, 66, 48, 'var(--accent-soft)', 'var(--accent)')}
    <text x="165" y="114" style="font:600 20px var(--serif);fill:var(--ink)" text-anchor="middle">x²</text>
    <text x="273" y="114" style="font:600 18px var(--serif);fill:var(--ink)" text-anchor="middle">3x</text>
    <text x="165" y="194" style="font:600 18px var(--serif);fill:var(--ink)" text-anchor="middle">2x</text>
    <text x="273" y="194" style="font:600 18px var(--serif);fill:var(--ink)" text-anchor="middle">6</text>
    <line x1="90" y1="40" x2="240" y2="40" class="f-dim"/><text x="165" y="34" class="f-lab">x</text>
    <line x1="240" y1="40" x2="306" y2="40" class="f-dim"/><text x="273" y="34" class="f-lab">3</text>
    <line x1="78" y1="52" x2="78" y2="162" class="f-dim"/><text x="70" y="110" class="f-lab" text-anchor="end">x</text>
    <line x1="78" y1="162" x2="78" y2="210" class="f-dim"/><text x="70" y="190" class="f-lab" text-anchor="end">2</text>
    <text x="200" y="242" class="f-cap">four patches, four products</text>`),

  discFactoring: () => S('0 0 400 309', `
    <rect width="400" height="309" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">you are handed the tiles — rebuild the rectangle</text>
    <g>
      ${TILE(36, 50, 56, 56, 'var(--accent-soft)', 'var(--accent)')}
      <text x="64" y="86" style="font:600 17px var(--serif);fill:var(--ink)" text-anchor="middle">x²</text>
      ${[...Array(7)].map((_,i)=>TILE(104 + i*20, 50, 16, 56, 'var(--mark-soft)', 'var(--mark)')).join('')}
      <text x="176" y="122" class="f-step">seven x tiles</text>
      ${[...Array(12)].map((_,i)=>TILE(252 + (i%4)*15, 50 + Math.floor(i/4)*15, 13, 13, '#e4dccd', '#b8a895')).join('')}
      <text x="282" y="122" class="f-step">twelve units</text>
    </g>
    ${ARR(200, 140, 200, 158)}
    <g transform="translate(0 4)">
      ${TILE(120, 166, 90, 62, 'var(--accent-soft)', 'var(--accent)')}
      ${TILE(210, 166, 58, 62, 'var(--mark-soft)', 'var(--mark)')}
      ${TILE(120, 228, 90, 40, 'var(--mark-soft)', 'var(--mark)')}
      ${TILE(210, 228, 58, 40, '#e4dccd', '#b8a895')}
      <text x="165" y="202" style="font:600 15px var(--serif);fill:var(--ink)" text-anchor="middle">x²</text>
      <text x="239" y="202" style="font:600 13px var(--serif);fill:var(--ink)" text-anchor="middle">3x</text>
      <text x="165" y="253" style="font:600 13px var(--serif);fill:var(--ink)" text-anchor="middle">4x</text>
      <text x="239" y="253" style="font:600 13px var(--serif);fill:var(--ink)" text-anchor="middle">12</text>
      <line x1="120" y1="158" x2="210" y2="158" class="f-dim"/><text x="165" y="152" class="f-lab2">x</text>
      <line x1="210" y1="158" x2="268" y2="158" class="f-dim"/><text x="239" y="152" class="f-lab2">3</text>
      <line x1="110" y1="166" x2="110" y2="228" class="f-dim"/><text x="104" y="200" class="f-lab2" text-anchor="end">x</text>
      <line x1="110" y1="228" x2="110" y2="268" class="f-dim"/><text x="104" y="252" class="f-lab2" text-anchor="end">4</text>
    </g>
    <text x="200" y="292" class="f-cap">only one split of the seven x tiles leaves a clean rectangle: 3 and 4</text>`)
,

  discSlopeForms: () => S('0 0 400 257', `
    <rect width="400" height="257" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one line, three ways to describe it</text>
    ${GRID(150, 60, 132, 132, 22)}
    <line x1="142" y1="192" x2="292" y2="192" class="f-axis"/>
    <line x1="150" y1="200" x2="150" y2="52" class="f-axis"/>
    <line x1="150" y1="170" x2="282" y2="60" class="f-line"/>
    <circle cx="150" cy="170" r="5" class="f-hub"/>
    <circle cx="216" cy="115" r="5" class="f-hub"/>
    <g>
      <rect x="18" y="52" width="118" height="44" rx="6" class="f-card"/>
      <text x="77" y="70" class="f-step">if you know a point</text>
      <text x="77" y="88" style="font:600 12px var(--serif);fill:var(--ink)" text-anchor="middle">y − 5 = ⅚(x − 3)</text>
    </g>
    <g>
      <rect x="18" y="120" width="118" height="44" rx="6" class="f-card"/>
      <text x="77" y="138" class="f-step">if you want to graph it</text>
      <text x="77" y="156" style="font:600 12px var(--serif);fill:var(--ink)" text-anchor="middle">y = ⅚x + 2.5</text>
    </g>
    <g>
      <rect x="296" y="86" width="90" height="44" rx="6" class="f-card"/>
      <text x="341" y="104" class="f-step">for intercepts</text>
      <text x="341" y="122" style="font:600 12px var(--serif);fill:var(--ink)" text-anchor="middle">5x − 6y = −15</text>
    </g>
    ${ARR(136, 88, 152, 130)}${ARR(136, 146, 152, 162)}${ARR(296, 110, 260, 96)}
    <text x="200" y="240" class="f-cap">the pencil line on the grid never changed</text>`),

  discSystems9: () => S('0 0 400 266', `
    <rect width="400" height="266" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="17" class="f-title">a fence 44 m long around a pen 3 m longer than it is wide</text>
    <rect x="96" y="54" width="208" height="112" rx="4" fill="#eef5ef" stroke="#6b8f68" stroke-width="3"/>
    ${[...Array(9)].map((_,i)=>`<line x1="${96+i*26}" y1="54" x2="${96+i*26}" y2="166" stroke="#8aa887" stroke-width="1.4"/>`).join('')}
    <line x1="96" y1="90" x2="304" y2="90" stroke="#8aa887" stroke-width="1.4"/>
    <line x1="96" y1="130" x2="304" y2="130" stroke="#8aa887" stroke-width="1.4"/>
    <line x1="96" y1="42" x2="304" y2="42" class="f-dim"/>
    <text x="200" y="36" class="f-lab2">w + 3</text>
    <line x1="84" y1="54" x2="84" y2="166" class="f-dim"/>
    <text x="76" y="114" class="f-lab2" text-anchor="end">w</text>
    <text x="200" y="192" class="f-step">two facts, two unknowns</text>
    <g>
      <rect x="40" y="206" width="150" height="46" rx="6" class="f-card"/>
      <text x="115" y="224" class="f-step">how much fence</text>
      <text x="115" y="242" style="font:600 12.5px var(--serif);fill:var(--ink)" text-anchor="middle">2l + 2w = 44</text>
    </g>
    <g>
      <rect x="210" y="206" width="150" height="46" rx="6" class="f-card"/>
      <text x="285" y="224" class="f-step">how the sides compare</text>
      <text x="285" y="242" style="font:600 12.5px var(--serif);fill:var(--ink)" text-anchor="middle">l = w + 3</text>
    </g>`),

  /* Worked example 2 of Graphing Quadratics: the downward case, every feature the steps find. */
  sketchDown: () => { const X = x => 150 + 40 * x, Y = y => 240 - 20 * y, f = x => -x * x + 4 * x + 5;
    const path = []; for (let x = -1.2; x <= 5.21; x += 0.1) path.push(X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1));
    return S('0 0 480 290', `
    <title>The graph of y = -x^2 + 4x + 5, opening downward</title>
    <text x="14" y="22" class="f-cap" text-anchor="start">y = −x² + 4x + 5</text>
    ${[-1, 1, 2, 3, 4, 5].map(x => `<line x1="${X(x)}" y1="${Y(10)}" x2="${X(x)}" y2="${Y(-1.6)}" class="f-grid"/>`).join('')}
    ${[2, 4, 6, 8].map(y => `<line x1="${X(-1.6)}" y1="${Y(y)}" x2="${X(5.6)}" y2="${Y(y)}" class="f-grid"/>`).join('')}
    <line x1="${X(-1.8)}" y1="${Y(0)}" x2="${X(5.8)}" y2="${Y(0)}" class="f-axis"/>
    <line x1="${X(0)}" y1="${Y(-1.7)}" x2="${X(0)}" y2="${Y(10.2)}" class="f-axis"/>
    <line x1="${X(2)}" y1="${Y(10.4)}" x2="${X(2)}" y2="${Y(-1.6)}" class="f-dash"/>
    <polyline points="${path.join(' ')}" class="f-line"/>
    ${DOTS([[X(2), Y(9)], [X(0), Y(5)], [X(4), Y(5)], [X(-1), Y(0)], [X(5), Y(0)]], 'f-hub')}
    <text x="${X(2) + 10}" y="${Y(9) - 4}" class="f-lab2" text-anchor="start">vertex (2, 9) — a maximum</text>
    <text x="${X(0) - 8}" y="${Y(5) - 6}" class="f-lab" text-anchor="end">(0, 5)</text>
    <text x="${X(4) + 8}" y="${Y(5) - 6}" class="f-lab" text-anchor="start">(4, 5) mirror</text>
    <text x="${X(-1) - 8}" y="${Y(0) - 8}" class="f-lab" text-anchor="end">−1</text>
    <text x="${X(5) + 8}" y="${Y(0) - 8}" class="f-lab" text-anchor="start">5</text>
    <text x="${X(2) + 6}" y="${Y(-1.2)}" class="f-lab3" text-anchor="start">axis x = 2</text>
    <text x="388" y="150" class="f-lab3" text-anchor="start">a &lt; 0, so it</text>
    <text x="388" y="168" class="f-lab3" text-anchor="start">opens downward</text>`); },

  /* Worked example 3: a ball thrown up from a roof. Height against time, so the labels say so —
     the ball itself only goes straight up and down. */
  projectileGraph: () => { const X = t => 70 + 64 * t, Y = h => 250 - 1.2 * h, f = t => -16 * t * t + 64 * t + 80;
    const path = []; for (let t = 0; t <= 5.001; t += 0.1) path.push(X(t).toFixed(1) + ',' + Y(f(t)).toFixed(1));
    return S('0 0 480 306', `
    <title>Height of a ball thrown up from an 80-foot roof, h(t) = -16t^2 + 64t + 80</title>
    <text x="466" y="22" class="f-cap" text-anchor="end">h(t) = −16t² + 64t + 80</text>
    ${[1, 2, 3, 4, 5].map(t => `<line x1="${X(t)}" y1="${Y(0)}" x2="${X(t)}" y2="${Y(170)}" class="f-grid"/>
      <text x="${X(t)}" y="${Y(0) + 17}" class="f-lab3">${t}</text>`).join('')}
    ${[40, 80, 120, 160].map(h => `<line x1="${X(0)}" y1="${Y(h)}" x2="${X(5.5)}" y2="${Y(h)}" class="f-grid"/>
      <text x="${X(0) - 8}" y="${Y(h) + 4}" class="f-lab3" text-anchor="end">${h}</text>`).join('')}
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(5.7)}" y2="${Y(0)}" class="f-axis"/>
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(178)}" class="f-axis"/>
    <text x="${X(5.6)}" y="${Y(0) + 31}" class="f-lab" text-anchor="end">time (seconds)</text>
    <text x="${X(0) - 8}" y="${Y(178) - 4}" class="f-lab" text-anchor="start">height (feet)</text>
    <line x1="${X(2)}" y1="${Y(166)}" x2="${X(2)}" y2="${Y(0)}" class="f-dash"/>
    <polyline points="${path.join(' ')}" class="f-line"/>
    ${DOTS([[X(0), Y(80)], [X(2), Y(144)], [X(4), Y(80)], [X(5), Y(0)]], 'f-hub')}
    <text x="${X(2) + 10}" y="${Y(144) - 8}" class="f-lab2" text-anchor="start">highest: 144 ft at 2 s</text>
    <text x="${X(0) + 10}" y="${Y(80) + 18}" class="f-lab" text-anchor="start">thrown from 80 ft</text>
    <text x="${X(4) + 10}" y="${Y(80) - 6}" class="f-lab" text-anchor="start">back at 80 ft, 4 s</text>
    <text x="${X(5) - 12}" y="${Y(0) - 10}" class="f-lab2" text-anchor="end">lands at 5 s</text>
    <text x="240" y="300" class="f-lab3">a graph of height against time — the ball itself goes straight up and down</text>`); },

  discQuadgraphs: () => { const pts = [];
    for (let t = 0; t <= 10; t++) { const x = 52 + t * 29.6, y = 232 - (4.8 * t - 0.48 * t * t) * 12.5; pts.push([x, y]); }
    return S('0 0 400 295', `
    <defs>${GRAD('dqB', '#ffe9c9', '#f4c07a', '#d9903c')}</defs>
    <rect width="400" height="295" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a thrown ball, photographed every half second</text>
    <line x1="40" y1="232" x2="368" y2="232" stroke="#8fbf8a" stroke-width="4"/>
    <path d="M${pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')}" fill="none" stroke="var(--rule)" stroke-width="1.6" stroke-dasharray="4 4"/>
    ${pts.map((p,i)=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i===5?9:6.4}" fill="url(#dqB)" stroke="#b5762c" stroke-width="1.4" opacity="${i===5?1:.85}"/>`).join('')}
    <line x1="200" y1="72" x2="200" y2="244" class="f-dash"/>
    <text x="208" y="80" class="f-lab2" text-anchor="start">highest point</text>
    <text x="52" y="254" class="f-lab">thrown</text>
    <text x="348" y="254" class="f-lab">lands</text>
    <text x="200" y="278" class="f-cap">the two halves mirror each other</text>`); },

  discSolveQuad: () => S('0 0 400 266', `
    <rect width="400" height="266" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="17" class="f-title">a vegetable bed of 40 m², three metres longer than it is wide</text>
    <rect x="86" y="50" width="228" height="128" rx="4" fill="#e8f0e4" stroke="#6b8f68" stroke-width="2.4"/>
    ${[...Array(5)].map((_,r)=>[...Array(8)].map((_,c)=>
      `<circle cx="${102+c*29}" cy="${66+r*25}" r="5.4" fill="#8fbf8a" opacity=".8"/>
       <path d="M${102+c*29} ${61+r*25} l0 -5" stroke="#5f8a5c" stroke-width="1.4"/>`).join('')).join('')}
    <line x1="86" y1="38" x2="314" y2="38" class="f-dim"/>
    <text x="200" y="32" class="f-lab2">w + 3</text>
    <line x1="74" y1="50" x2="74" y2="178" class="f-dim"/>
    <text x="66" y="120" class="f-lab2" text-anchor="end">w</text>
    <text x="200" y="204" class="f-step">area = width × length = 40</text>
    <rect x="112" y="216" width="176" height="36" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="200" y="240" style="font:600 15px var(--serif);fill:var(--ink)" text-anchor="middle">w(w + 3) = 40</text>`),

  discRadicals: () => S('0 0 400 257', `
    <rect width="400" height="257" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="17" class="f-title">a square patio of 72 tiles — how long is one side?</text>
    ${[...Array(6)].map((_,r)=>[...Array(6)].map((_,c)=>
      TILE(70 + c*24, 48 + r*24, 22, 22, 'var(--accent-soft)', 'var(--accent)')).join('')).join('')}
    ${[...Array(6)].map((_,r)=>[...Array(6)].map((_,c)=>
      TILE(222 + c*24, 48 + r*24, 22, 22, 'var(--mark-soft)', 'var(--mark)')).join('')).join('')}
    <line x1="70" y1="41" x2="214" y2="41" class="f-dim"/>
    <text x="142" y="36" class="f-lab2">6</text>
    <line x1="222" y1="41" x2="366" y2="41" class="f-dim"/>
    <text x="294" y="36" class="f-lab2">6</text>
    <line x1="58" y1="48" x2="58" y2="192" class="f-dim"/>
    <text x="50" y="124" class="f-lab2" text-anchor="end">6</text>
    <text x="142" y="212" class="f-step">36 tiles</text>
    <text x="294" y="212" class="f-step">36 tiles</text>
    <text x="200" y="240" class="f-cap">72 tiles will not make a square — but 36 will, twice over</text>`),

  discAdvFunctions: () => S('0 0 400 245', `
    <rect width="400" height="245" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="17" class="f-title">car park prices do not rise smoothly — they jump</text>
    <line x1="52" y1="180" x2="360" y2="180" class="f-axis"/>
    <line x1="58" y1="188" x2="58" y2="48" class="f-axis"/>
    ${[0,1,2,3,4].map(i=>{ const x0 = 58 + i*58, price = 5 + i*3, y = 180 - price*8;
      return `<line x1="${x0}" y1="${y}" x2="${x0+58}" y2="${y}" stroke="var(--accent)" stroke-width="3.4"/>
        <circle cx="${x0}" cy="${y}" r="4.6" fill="var(--accent)"/>
        <circle cx="${x0+58}" cy="${y}" r="4.6" fill="var(--paper)" stroke="var(--accent)" stroke-width="2.2"/>
        <text x="${x0+29}" y="${y-9}" class="f-lab2">$${price}</text>
        <text x="${x0+29}" y="198" class="f-step">${i}–${i+1} h</text>`; }).join('')}
    <text x="200" y="228" class="f-cap">stay one minute past the hour and the price steps up the whole $3</text>`),

  discStats9: () => S('0 0 400 303', `
    <defs>${LGRAD('dhR', '#e6b9a4', '#cf8f74', true)}</defs>
    <rect width="400" height="303" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">four ordinary houses and one mansion</text>
    ${[0,1,2,3].map(i=>{ const x = 44 + i*62;
      return `<g transform="translate(${x} 150)">
        <rect x="0" y="0" width="44" height="34" fill="#f2ead9" stroke="#8a7a66" stroke-width="1.6"/>
        <path d="M-5 0 L22 -18 L49 0 Z" fill="url(#dhR)" stroke="#8a4638" stroke-width="1.6"/>
        <rect x="16" y="14" width="12" height="20" fill="#8a7a66"/>
        <text x="22" y="52" class="f-step">$${[220,240,250,270][i]}k</text>
      </g>`; }).join('')}
    <g transform="translate(296 92)">
      <rect x="0" y="0" width="82" height="92" fill="#f2ead9" stroke="#8a7a66" stroke-width="1.8"/>
      <path d="M-8 0 L41 -30 L90 0 Z" fill="url(#dhR)" stroke="#8a4638" stroke-width="1.8"/>
      ${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${10+c*24}" y="${12+r*26}" width="14" height="16" fill="#cfe0ec" stroke="#8a7a66" stroke-width="1"/>`).join('')).join('')}
      <text x="41" y="110" class="f-step">$3 000k</text>
    </g>
    <line x1="30" y1="228" x2="370" y2="228" class="f-axis"/>
    <circle cx="66" cy="228" r="5.4" class="f-dot"/><circle cx="72" cy="228" r="5.4" class="f-dot"/>
    <circle cx="79" cy="228" r="5.4" class="f-dot"/><circle cx="86" cy="228" r="5.4" class="f-dot"/>
    <circle cx="352" cy="228" r="5.4" fill="var(--wrong)"/>
    <line x1="76" y1="222" x2="76" y2="244" class="f-tick"/>
    <text x="76" y="258" class="f-lab2">median $245k</text>
    <line x1="196" y1="222" x2="196" y2="244" stroke="var(--wrong)" stroke-width="3"/>
    <text x="196" y="258" class="f-lab" fill="var(--wrong)">mean $796k</text>
    <text x="200" y="286" class="f-cap">not one of the five houses costs anything like $796k</text>`)
,

  /* ---------------- Discovery illustrations: Grade 7 ---------------- */

  discRates: () => S('0 0 400 229', `
    <defs>${LGRAD('drJ', '#f6d9a8', '#e3b46f', true)}</defs>
    <rect width="400" height="229" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">which jar is the better buy?</text>
    ${[[110, 54, 0.78, '400 g', '$3.20'], [268, 44, 1.06, '750 g', '$5.40']].map(([x, y, sc, w, p]) => `
      <g transform="translate(${x} ${y}) scale(${sc})">
        <rect x="-38" y="-6" width="76" height="14" rx="3" fill="#b8a895"/>
        <path d="M-40 8 L-40 104 a 40 14 0 0 0 80 0 L40 8 Z" fill="url(#drJ)" stroke="#a8814a" stroke-width="2"/>
        <rect x="-30" y="34" width="60" height="38" rx="3" fill="#fdfaf3" stroke="#c9bda8" stroke-width="1.2"/>
        <text x="0" y="58" style="font:700 15px var(--sans);fill:#6b4a1f" text-anchor="middle">${w}</text>
      </g>
      <text x="${x}" y="${y + 130 * sc}" class="f-lab2">${p}</text>`).join('')}
    <text x="200" y="212" class="f-cap">the big jar costs more — but you also get more of it</text>`),

  discPercents: () => S('0 0 400 279', `
    <rect width="400" height="279" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">30% off — so how much do you actually pay?</text>
    ${[...Array(10)].map((_, r) => [...Array(10)].map((_, c) => {
      const on = r * 10 + c < 70;
      return `<rect x="${44 + c * 17}" y="${44 + r * 17}" width="15" height="15" rx="2"
        fill="${on ? 'var(--accent)' : 'var(--rule-2)'}" fill-opacity="${on ? '.55' : '1'}"
        stroke="${on ? 'var(--accent)' : 'var(--rule)'}" stroke-width="1"/>`; }).join('')).join('')}
    <text x="126" y="234" class="f-lab2">70 squares you pay for</text>
    <line x1="232" y1="44" x2="232" y2="214" class="f-dim"/>
    <text x="240" y="82" class="f-lab" text-anchor="start">the whole price</text>
    <text x="240" y="102" class="f-lab" text-anchor="start">is 100 squares</text>
    <text x="240" y="140" class="f-lab3" text-anchor="start">30 are taken off</text>
    <text x="240" y="160" class="f-lab3" text-anchor="start">70 are left</text>
    <text x="200" y="262" class="f-cap">so you pay 70 of every 100, whatever the price happens to be</text>`),

  discPosRational: () => S('0 0 400 271', `
    <defs>${LGRAD('dpP', '#f7c98a', '#e09a4c', true)}</defs>
    <rect width="400" height="271" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">half a pizza and a third of a pizza</text>
    ${[[108, '0 180', 'half'], [292, '0 120', 'a third']].map(([cx, arc, lab], i) => `
      <circle cx="${cx}" cy="118" r="56" fill="#fdfaf3" stroke="#c9bda8" stroke-width="2"/>
      <path d="M${cx} 118 L${cx + 56} 118 A 56 56 0 ${i ? '0 1' : '0 1'} ${i ? (cx - 28).toFixed(1) : cx - 56} ${i ? (118 + 48.5).toFixed(1) : 118} Z"
        fill="url(#dpP)" stroke="#b5762c" stroke-width="1.6"/>
      ${[...Array(i ? 3 : 2)].map((_, k) => { const a = (i ? 120 : 180) * k * Math.PI / 180;
        return `<line x1="${cx}" y1="118" x2="${(cx + 56 * Math.cos(a)).toFixed(1)}" y2="${(118 + 56 * Math.sin(a)).toFixed(1)}" stroke="#c9bda8" stroke-width="1.4"/>`; }).join('')}
      <text x="${cx}" y="196" class="f-step">${lab}</text>`).join('')}
    <text x="200" y="128" style="font:600 20px var(--serif);fill:var(--ink3)" text-anchor="middle">+</text>
    <text x="200" y="230" class="f-cap">the slices are different sizes, so you cannot just count them</text>
    <text x="200" y="254" class="f-lab2">2 slices is not the answer, and neither is 2 out of 5</text>`),

  discNegRational: () => S('0 0 400 301', `
    <defs>${LGRAD('dnT', '#e8b4a4', '#cf7a63', true)}</defs>
    <rect width="400" height="301" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a thermometer does not stop at zero</text>
    <rect x="176" y="46" width="24" height="196" rx="12" fill="#fdfaf3" stroke="#8a7a66" stroke-width="2"/>
    <circle cx="188" cy="254" r="20" fill="url(#dnT)" stroke="#8a4638" stroke-width="2"/>
    <rect x="182" y="150" width="12" height="100" fill="url(#dnT)"/>
    ${[15, 10, 5, 0, -5, -10, -15].map((v, i) => {
      const y = 62 + i * 29;
      return `<line x1="${v === 0 ? 160 : 168}" y1="${y}" x2="176" y2="${y}" stroke="#8a7a66" stroke-width="${v === 0 ? 2.4 : 1.4}"/>
        <text x="${v === 0 ? 154 : 162}" y="${y + 4}" class="${v === 0 ? 'f-lab2' : 'f-lab3'}" text-anchor="end">${v}</text>`; }).join('')}
    <line x1="176" y1="149" x2="236" y2="149" class="f-dash"/>
    <text x="244" y="146" class="f-lab2" text-anchor="start">now: −2°</text>
    <line x1="176" y1="91" x2="236" y2="91" class="f-dash"/>
    <text x="244" y="88" class="f-lab" text-anchor="start">this morning: +8°</text>
    <text x="200" y="284" class="f-cap">the drop from +8 to −2 is real, and it is ten degrees</text>`),

  discStats: () => { const beads = [];
    for (let i = 0; i < 90; i++) { const a = i * 2.399, r = 8 + Math.sqrt(i) * 8.6;
      beads.push([112 + Math.cos(a) * r * .92, 148 + Math.sin(a) * r * .68, i % 3 === 0 ? 'var(--accent)' : (i % 3 === 1 ? 'var(--mark)' : 'var(--rule)')]); }
    return S('0 0 400 279', `
    <rect width="400" height="279" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a jar of ten thousand beads — how many are orange?</text>
    <path d="M40 66 L40 216 a 72 20 0 0 0 144 0 L184 66" fill="#eef4f8" fill-opacity=".7" stroke="#8fb4cc" stroke-width="2"/>
    <ellipse cx="112" cy="66" rx="72" ry="20" fill="#f6fafc" stroke="#8fb4cc" stroke-width="2"/>
    ${beads.map(b => `<circle cx="${b[0].toFixed(1)}" cy="${b[1].toFixed(1)}" r="4.6" fill="${b[2]}" opacity=".85"/>`).join('')}
    ${ARR(198, 148, 232, 148)}
    <ellipse cx="300" cy="150" rx="56" ry="30" fill="#fdfaf3" stroke="#b8a895" stroke-width="1.8"/>
    ${[...Array(12)].map((_, i) => { const a = i * 2.399, r = 5 + Math.sqrt(i) * 8;
      return `<circle cx="${(300 + Math.cos(a) * r).toFixed(1)}" cy="${(150 + Math.sin(a) * r * .55).toFixed(1)}" r="4.6" fill="${i % 3 === 0 ? 'var(--accent)' : (i % 3 === 1 ? 'var(--mark)' : 'var(--rule)')}"/>`; }).join('')}
    <text x="300" y="200" class="f-step">one scoop: 12 beads</text>
    <text x="300" y="222" class="f-lab2">4 of them orange</text>
    <text x="200" y="262" class="f-cap">counting all ten thousand is not going to happen</text>`); },

  discProbSimple: () => S('0 0 400 279', `
    <defs>${LGRAD('dbBag', '#d9cbb4', '#bda98a', true)}</defs>
    <rect width="400" height="279" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one bag, ten marbles, eyes closed</text>
    <path d="M132 76 q68 -30 136 0 q22 92 -14 138 q-54 18 -108 0 q-36 -46 -14 -138 z" fill="url(#dbBag)" stroke="#8a7a66" stroke-width="2.2"/>
    <path d="M132 76 q68 -30 136 0" fill="none" stroke="#6b5d4a" stroke-width="3"/>
    ${[[172,124,'a'],[208,116,'a'],[244,126,'a'],[162,158,'b'],[200,152,'b'],[238,160,'b'],[166,192,'c'],[202,190,'c'],[238,192,'c'],[200,224,'c']].map(([x,y,k]) =>
      `<circle cx="${x}" cy="${y}" r="13" fill="${k==='a'?'var(--accent)':k==='b'?'var(--mark)':'var(--rule)'}" opacity=".9" stroke="#6b5d4a" stroke-width="1.2"/>
       <circle cx="${x-4}" cy="${y-4}" r="3.4" fill="#fff" opacity=".55"/>`).join('')}
    <text x="72" y="120" class="f-lab2" text-anchor="middle">3</text>
    <text x="72" y="142" class="f-lab3" text-anchor="middle">orange</text>
    <text x="330" y="120" class="f-lab2" text-anchor="middle">3</text>
    <text x="330" y="142" class="f-lab3" text-anchor="middle">red</text>
    <text x="330" y="180" class="f-lab" text-anchor="middle">4 grey</text>
    <text x="200" y="262" class="f-cap">every marble is equally likely, so counting them is enough</text>`),

  discProbCompound: () => S('0 0 400 295', `
    <rect width="400" height="295" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">flip a coin, then spin for red or blue</text>
    <circle cx="200" cy="62" r="20" fill="#e8d9a8" stroke="#a8914a" stroke-width="2"/>
    <text x="200" y="68" style="font:700 12px var(--sans);fill:#6b5a1f" text-anchor="middle">flip</text>
    ${[[112,'H'],[288,'T']].map(([x,lab]) => `
      <path d="M200 84 L${x} 128" class="f-branch"/>
      <circle cx="${x}" cy="146" r="19" fill="#fdfaf3" stroke="#8a7a66" stroke-width="1.8"/>
      <text x="${x}" y="152" style="font:700 14px var(--sans);fill:var(--ink)" text-anchor="middle">${lab}</text>`).join('')}
    ${[[112,-46,'R'],[112,46,'B'],[288,-46,'R'],[288,46,'B']].map(([x,dx,lab]) => `
      <path d="M${x} 166 L${x+dx} 212" class="f-branch"/>
      <circle cx="${x+dx}" cy="230" r="17" fill="${lab==='R'?'var(--wrong-soft)':'var(--accent-soft)'}" stroke="${lab==='R'?'var(--wrong)':'var(--accent)'}" stroke-width="1.8"/>
      <text x="${x+dx}" y="236" style="font:700 12px var(--sans);fill:var(--ink)" text-anchor="middle">${lab}</text>`).join('')}
    <text x="200" y="278" class="f-cap">two choices, then two more — four endings, not three</text>`)
,

  discProprel: () => S('0 0 400 269', `
    <defs>${LGRAD('dprB', '#f2e3c6', '#ddc498', true)}</defs>
    <rect width="400" height="269" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a recipe for 3 people needs 2 cups of flour</text>
    ${[[1, 3, 2], [2, 6, 4], [3, 9, 6]].map(([n, ppl, cups], i) => { const y = 54 + i * 62;
      return `${[...Array(ppl)].map((_, k) => PERSON(52 + k * 17, y + 20, .82, 'f-person')).join('')}
        <text x="${52 + ppl * 17 + 4}" y="${y + 26}" class="f-lab3" text-anchor="start">${ppl} people</text>
        ${[...Array(cups)].map((_, k) => `<g transform="translate(${244 + k * 22} ${y + 12})">
          <path d="M-9 -10 L9 -10 L7 12 L-7 12 Z" fill="url(#dprB)" stroke="#b09a6a" stroke-width="1.4"/>
          <ellipse cx="0" cy="-10" rx="9" ry="3.2" fill="#f7efdc" stroke="#b09a6a" stroke-width="1.2"/></g>`).join('')}
        <text x="${244 + cups * 22 + 2}" y="${y + 26}" class="f-lab2" text-anchor="start">${cups}</text>`; }).join('')}
    <text x="200" y="252" class="f-cap">double the people, double the flour — the ratio never budges</text>`),

  discAlgrel: () => S('0 0 400 269', `
    <rect width="400" height="269" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">squares made of matchsticks</text>
    ${[1, 2, 3].map((n, i) => { const x0 = 32 + i * 126, y0 = 56;
      let m = '';
      for (let k = 0; k < n; k++) {
        const x = x0 + k * 30;
        m += `<line x1="${x}" y1="${y0}" x2="${x + 30}" y2="${y0}" class="f-match"/>`
           + `<line x1="${x}" y1="${y0 + 30}" x2="${x + 30}" y2="${y0 + 30}" class="f-match"/>`
           + `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + 30}" class="f-match"/>`;
      }
      m += `<line x1="${x0 + n * 30}" y1="${y0}" x2="${x0 + n * 30}" y2="${y0 + 30}" class="f-match"/>`;
      return m + `<text x="${x0 + n * 15}" y="${y0 + 52}" class="f-step">${n} square${n > 1 ? 's' : ''}</text>
        <text x="${x0 + n * 15}" y="${y0 + 72}" class="f-lab2">${3 * n + 1} sticks</text>`; }).join('')}
    <rect x="40" y="168" width="320" height="58" rx="7" class="f-card"/>
    ${[[1,4],[2,7],[3,10],[4,13],[10,31]].map(([a,b],i) => `
      <text x="${76 + i * 62}" y="190" class="f-lab">${a}</text>
      <text x="${76 + i * 62}" y="214" class="f-lab2">${b}</text>`).join('')}
    <text x="52" y="190" class="f-step" text-anchor="start">in</text>
    <text x="52" y="214" class="f-step" text-anchor="start">out</text>
    <text x="200" y="252" class="f-cap">each new square costs 3 sticks, not 4 — it borrows one</text>`),

  discReasoning: () => S('0 0 400 267', `
    <rect width="400" height="267" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">"five less than a number is twelve"</text>
    <rect x="44" y="52" width="312" height="44" rx="7" class="f-card"/>
    <text x="200" y="80" style="font:500 14px var(--serif);fill:var(--ink)" text-anchor="middle">five less than a number is twelve</text>
    ${ARR(140, 102, 140, 124)}${ARR(260, 102, 260, 124)}
    <rect x="70" y="130" width="140" height="40" rx="6" fill="var(--wrong-soft)" stroke="var(--wrong)" stroke-width="1.8"/>
    <text x="140" y="156" style="font:600 16px var(--serif);fill:var(--ink)" text-anchor="middle">5 − x = 12</text>
    <text x="140" y="188" class="f-lab3">reads left to right</text>
    <rect x="216" y="130" width="140" height="40" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="286" y="156" style="font:600 16px var(--serif);fill:var(--ink)" text-anchor="middle">x − 5 = 12</text>
    <text x="286" y="188" class="f-lab2">takes 5 away from x</text>
    <text x="140" y="212" style="font:700 15px var(--sans);fill:var(--wrong)" text-anchor="middle">✗</text>
    <text x="286" y="212" style="font:700 15px var(--sans);fill:var(--accent-2)" text-anchor="middle">✓</text>
    <text x="200" y="250" class="f-cap">"less than" tells you what is taken away, not what comes first</text>`),

  discEquations: () => S('0 0 400 289', `
    <rect width="400" height="289" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">think of a number, and do not tell me what it is</text>
    ${[['think of a number', 'x', 'var(--rule-2)'], ['multiply by 3', '3x', 'var(--accent-soft)'],
       ['add 4', '3x + 4', 'var(--accent-soft)'], ['you get 19', '19', 'var(--mark-soft)']].map(([lab, val, fill], i) => {
      const y = 50 + i * 54;
      return `<rect x="96" y="${y}" width="208" height="38" rx="7" fill="${fill}" stroke="var(--rule)" stroke-width="1.4"/>
        <text x="118" y="${y + 24}" class="f-lab" text-anchor="start">${lab}</text>
        <text x="282" y="${y + 25}" style="font:600 15px var(--serif);fill:var(--ink)" text-anchor="end">${val}</text>
        ${i < 3 ? ARR(200, y + 38, 200, y + 52) : ''}`; }).join('')}
    ${[1, 2, 3].map(i => { const y = 50 + i * 54;
      return `<path d="M86 ${y + 19} L64 ${y + 19} L64 ${y - 35} L86 ${y - 35}" class="f-back"/>
        <path d="M92 ${y - 35} L82 ${y - 40} L82 ${y - 30} Z" class="f-backhead"/>`; }).join('')}
    <text x="52" y="146" class="f-lab2" text-anchor="middle">undo</text>
    <text x="200" y="272" class="f-cap">run the chain backwards: 19 − 4 = 15, then ÷ 3 = 5</text>`),

  discInequalities: () => S('0 0 400 263', `
    <rect width="400" height="263" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a lift that carries at most 600 kg</text>
    <rect x="120" y="46" width="160" height="128" rx="6" fill="#e8eef2" stroke="#5a4a3a" stroke-width="2.4"/>
    <line x1="200" y1="46" x2="200" y2="174" stroke="#8a7a66" stroke-width="1.6"/>
    ${[0,1,2,3,4,5].map(i => PERSON(146 + (i % 3) * 36, 118 + Math.floor(i / 3) * 44, 1.5, i < 3 ? 'f-person' : 'f-person-2')).join('')}
    <rect x="120" y="186" width="160" height="30" rx="5" fill="#2b3a4a"/>
    <text x="200" y="207" style="font:700 15px var(--mono, monospace);fill:#7fe08a" text-anchor="middle">432 kg</text>
    <text x="304" y="82" class="f-lab" text-anchor="start">limit 600 kg</text>
    <text x="304" y="104" class="f-lab3" text-anchor="start">six people</text>
    <text x="304" y="124" class="f-lab3" text-anchor="start">averaging 72 kg</text>
    <text x="304" y="158" class="f-lab2" text-anchor="start">168 kg spare</text>
    <text x="200" y="246" class="f-cap">the limit is not a weight — it is a line you must not cross</text>`),

  discScale: () => S('0 0 400 283', `
    <rect width="400" height="283" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a map, a ruler, and a road</text>
    <rect x="34" y="44" width="238" height="164" rx="6" fill="#f3efe2" stroke="#b8a895" stroke-width="1.8"/>
    <path d="M52 186 Q104 148 118 116 Q132 82 186 68 Q234 56 256 74" fill="none" stroke="#c98a3e" stroke-width="4.6" stroke-linecap="round"/>
    <path d="M34 130 L272 122" fill="none" stroke="#8fbf8a" stroke-width="7" opacity=".5"/>
    ${[...Array(5)].map((_, i) => `<rect x="${58 + i * 44}" y="${150 + (i % 2) * 22}" width="18" height="14" fill="#d8cfc0" stroke="#a89880" stroke-width="1"/>`).join('')}
    <circle cx="52" cy="186" r="5.4" fill="var(--wrong)"/>
    <circle cx="256" cy="74" r="5.4" class="f-hub"/>
    <g transform="translate(34 224)">
      <line x1="0" y1="0" x2="72" y2="0" stroke="var(--ink)" stroke-width="2.4"/>
      <line x1="0" y1="-5" x2="0" y2="5" stroke="var(--ink)" stroke-width="2.4"/>
      <line x1="72" y1="-5" x2="72" y2="5" stroke="var(--ink)" stroke-width="2.4"/>
      <text x="36" y="20" class="f-lab2">3 cm = 5 km</text>
    </g>
    <text x="290" y="130" class="f-lab" text-anchor="start">the road</text>
    <text x="290" y="150" class="f-lab" text-anchor="start">measures</text>
    <text x="290" y="170" class="f-lab2" text-anchor="start">12 cm</text>
    <text x="200" y="266" class="f-cap">the map is small, the road is not — one number connects them</text>`),

  discArea2d: () => S('0 0 400 279', `
    <defs>${LGRAD('daC', '#e2d3bc', '#cbb894', true)}</defs>
    <rect width="400" height="279" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">carpet for an L-shaped room</text>
    <path d="M60 60 L260 60 L260 150 L340 150 L340 226 L60 226 Z" fill="url(#daC)" stroke="#8a7a66" stroke-width="2.4"/>
    <line x1="260" y1="150" x2="60" y2="150" class="f-dash"/>
    <text x="160" y="110" class="f-lab2">piece A</text>
    <text x="160" y="194" class="f-lab2">piece B</text>
    <text x="300" y="194" class="f-lab2">…or cut here?</text>
    <line x1="60" y1="48" x2="260" y2="48" class="f-dim"/><text x="160" y="42" class="f-lab">5 m</text>
    <line x1="352" y1="150" x2="352" y2="226" class="f-dim"/><text x="362" y="192" class="f-lab" text-anchor="start">2 m</text>
    <line x1="48" y1="60" x2="48" y2="226" class="f-dim"/><text x="40" y="148" class="f-lab" text-anchor="end">4 m</text>
    <text x="200" y="262" class="f-cap">no single formula fits this shape — but two rectangles do</text>`)
,

  discSections3d: () => S('0 0 400 261', `
    <rect width="400" height="261" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">slice a block of cheese three ways</text>
    ${[[76, 'M0 40 L0 -20 L44 -44 L44 16 Z', 'M0 -20 L44 -44 L88 -20 L44 4 Z', 'M44 16 L44 -44 L88 -20 L88 40 Z',
        'M0 10 L44 -14 L88 10 L44 34 Z', 'straight down'],
       [200, 'M0 40 L0 -20 L44 -44 L44 16 Z', 'M0 -20 L44 -44 L88 -20 L44 4 Z', 'M44 16 L44 -44 L88 -20 L88 40 Z',
        'M0 -8 L44 16 L88 -8 L44 -32 Z', 'flat across'],
       [324, 'M0 40 L0 -20 L44 -44 L44 16 Z', 'M0 -20 L44 -44 L88 -20 L44 4 Z', 'M44 16 L44 -44 L88 -20 L88 40 Z',
        'M0 22 L44 -44 L88 2 L44 34 Z', 'at a slant']].map(([cx, fa, fb, fc, cut, lab]) => `
      <g transform="translate(${cx - 44} 120)">
        <path d="${fa}" class="f-face-b"/><path d="${fb}" class="f-face-a"/><path d="${fc}" class="f-face-c"/>
        <path d="${fa}" class="f-edge"/><path d="${fb}" class="f-edge"/><path d="${fc}" class="f-edge"/>
        <path d="${cut}" class="f-plane"/>
      </g>
      <text x="${cx}" y="208" class="f-step">${lab}</text>`).join('')}
    <text x="200" y="244" class="f-cap">the cut face is flat — but not the same shape every time</text>`),

  discVolume: () => S('0 0 400 279', `
    <defs>${LGRAD('dvB', '#f0dcb8', '#d9bc85', true)}</defs>
    <rect width="400" height="279" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a cereal box, flattened out</text>
    <g transform="translate(46 56)">
      <path d="M22 0 L22 -22 L70 -40 L70 -18 Z" class="f-face-a"/>
      <path d="M22 0 L22 84 L70 66 L70 -18 Z" class="f-face-c"/>
      <rect x="-26" y="0" width="48" height="84" fill="url(#dvB)"/>
      <path d="M-26 0 L22 -22 L70 -40" class="f-edge"/><path d="M22 0 L22 84" class="f-edge"/>
      <rect x="-26" y="0" width="48" height="84" class="f-edge"/>
      <path d="M22 0 L70 -18 L70 66 L22 84" class="f-edge"/>
      <text x="0" y="108" class="f-step">the box</text>
    </g>
    ${ARR(154, 110, 186, 110)}
    <g transform="translate(216 58)">
      ${[[40,0,40,64,'front'],[0,0,40,64,'side'],[80,0,40,64,'side'],[120,0,40,64,'back'],
         [40,-28,40,28,'top'],[40,64,40,28,'base']].map(([x,y,w,h,lab]) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#dvB)" stroke="#8a7a66" stroke-width="1.6"/>
         <text x="${x + w / 2}" y="${y + h / 2 + 4}" class="f-step">${lab}</text>`).join('')}
      <text x="80" y="118" class="f-step">six faces, laid flat</text>
    </g>
    <text x="200" y="262" class="f-cap">the card you can see is the surface; the cereal inside is the volume</text>`),

  discConstruction: () => S('0 0 400 265', `
    <rect width="400" height="265" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a compass keeps one distance perfectly</text>
    <line x1="80" y1="212" x2="320" y2="212" class="f-axis"/>
    <circle cx="140" cy="212" r="5" class="f-hub"/><circle cx="260" cy="212" r="5" class="f-hub"/>
    <path d="M140 212 m -120 0 a 120 120 0 0 1 240 0" fill="none" class="f-arc-off"/>
    <path d="M260 212 m -120 0 a 120 120 0 0 1 240 0" fill="none" class="f-arc-off"/>
    <circle cx="200" cy="108" r="6" fill="var(--mark)"/>
    <path d="M140 212 L200 108 L260 212" fill="var(--accent)" fill-opacity=".14" stroke="var(--accent)" stroke-width="2.2"/>
    ${TK(140, 212, 200, 108, 1)}${TK(260, 212, 200, 108, 1)}${TK(140, 212, 260, 212, 1)}
    <g transform="translate(316 74) rotate(24)">
      <line x1="0" y1="0" x2="-14" y2="54" stroke="#5a4a3a" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="16" y2="54" stroke="#5a4a3a" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="-3" r="5" fill="#8a7a66"/>
    </g>
    <text x="200" y="248" class="f-cap">both arcs were drawn at the same setting, so all three sides match</text>`),

  discExponents: () => S('0 0 400 257', `
    <defs>${LGRAD('deP', '#f6efdc', '#ded2b4', true)}</defs>
    <rect width="400" height="257" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">fold a sheet of paper in half, again and again</text>
    ${[0, 1, 2, 3, 4].map((n, i) => { const x = 50 + i * 76, layers = Math.pow(2, n), h = Math.min(layers, 16) * 3.4;
      return `<g transform="translate(${x} 150)">
        ${[...Array(Math.min(layers, 16))].map((_, k) =>
          `<rect x="-26" y="${(-k * 3.4 - 3.2).toFixed(1)}" width="52" height="3.2" fill="url(#deP)" stroke="#b8a895" stroke-width=".7"/>`).join('')}
        <text x="0" y="24" class="f-step">${n} fold${n === 1 ? '' : 's'}</text>
        <text x="0" y="${(-h - 10).toFixed(1)}" class="f-lab2">${layers}</text>
      </g>`; }).join('')}
    <text x="200" y="212" class="f-cap">seven folds and it is already 128 sheets thick</text>
    <text x="200" y="240" class="f-lab3">writing 2 × 2 × 2 × 2 × 2 × 2 × 2 is slow, and easy to miscount</text>`),

  discProblemSolving: () => S('0 0 400 275', `
    <defs>${GRAD('dpsC', '#fff3cf', '#f0cf7e', '#d6a93f')}</defs>
    <rect width="400" height="275" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">"I spent half my money, then $6, and have $10 left"</text>
    ${[['started with', '?', 60], ['spent half', '', 128], ['spent $6', '', 196]].map(([lab, v, y], i) => `
      <rect x="54" y="${y}" width="292" height="44" rx="7" fill="${i === 0 ? 'var(--mark-soft)' : 'var(--paper)'}" stroke="var(--rule)" stroke-width="1.4"/>
      <text x="74" y="${y + 27}" class="f-lab" text-anchor="start">${lab}</text>`).join('')}
    <text x="316" y="88" style="font:700 17px var(--serif);fill:var(--ink)" text-anchor="end">?</text>
    ${[...Array(3)].map((_, k) => COIN(190 + k * 30, 150, 11, 'dpsC')).join('')}
    ${[...Array(2)].map((_, k) => COIN(214 + k * 30, 218, 11, 'dpsC')).join('')}
    <text x="316" y="224" style="font:700 15px var(--serif);fill:var(--accent-2)" text-anchor="end">$10 left</text>
    ${[128, 196].map(y => `<path d="M42 ${y + 22} L22 ${y + 22} L22 ${y - 46} L42 ${y - 46}" class="f-back"/>
      <path d="M48 ${y - 46} L38 ${y - 51} L38 ${y - 41} Z" class="f-backhead"/>`).join('')}
    <text x="200" y="258" class="f-cap">the only number you are given is the last one</text>`),

  discSquareroots: () => S('0 0 400 283', `
    <rect width="400" height="283" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">lay tiles into a perfect square</text>
    <g>
      ${[...Array(4)].map((_, r) => [...Array(4)].map((_, c) =>
        TILE(58 + c * 26, 58 + r * 26, 24, 24, 'var(--accent-soft)', 'var(--accent)')).join('')).join('')}
      <text x="110" y="196" class="f-step">16 tiles</text>
      <text x="110" y="216" class="f-lab2">4 by 4 ✓</text>
    </g>
    <g>
      ${[...Array(4)].map((_, r) => [...Array(4)].map((_, c) =>
        TILE(238 + c * 26, 58 + r * 26, 24, 24, 'var(--mark-soft)', 'var(--mark)')).join('')).join('')}
      ${[...Array(4)].map((_, k) => TILE(238 + k * 26, 162, 24, 24, 'var(--mark-soft)', 'var(--mark)')).join('')}
      <text x="290" y="212" class="f-step">20 tiles</text>
      <text x="290" y="232" class="f-lab" fill="var(--wrong)">no square fits</text>
    </g>
    <text x="200" y="266" class="f-cap">16 has a whole-number side; 20 has one between 4 and 5</text>`),

  discRealnumbers: () => S('0 0 400 279', `
    <rect width="400" height="279" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a square one unit wide — how long is the diagonal?</text>
    <rect x="96" y="52" width="104" height="104" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>
    <line x1="96" y1="156" x2="200" y2="52" stroke="var(--mark)" stroke-width="3.4"/>
    <text x="148" y="174" class="f-lab">1</text>
    <text x="86" y="108" class="f-lab" text-anchor="end">1</text>
    <text x="156" y="96" class="f-lab2" text-anchor="start">?</text>
    <text x="252" y="80" class="f-lab" text-anchor="start">it is not 1</text>
    <text x="252" y="104" class="f-lab" text-anchor="start">it is not 1.4</text>
    <text x="252" y="128" class="f-lab" text-anchor="start">it is not 1.41</text>
    <text x="252" y="152" class="f-lab3" text-anchor="start">and it never settles</text>
    <line x1="40" y1="210" x2="360" y2="210" class="f-axis"/>
    ${[[64,'1',232],[156,'1.4',232],[206,'√2',232],[296,'2',232]].map(([x,lab,ty]) =>
      `<line x1="${x}" y1="204" x2="${x}" y2="${ty===250?222:216}" stroke="${lab==='√2'?'var(--mark)':'var(--ink2)'}" stroke-width="${lab==='√2'?3:1.6}"/>
       <text x="${x}" y="${ty}" class="${lab==='√2'?'f-lab2':'f-nl'}">${lab}</text>`).join('')}
    <text x="200" y="262" class="f-cap">the decimals close in on it but never arrive</text>`)
,

  discGcflcm: () => S('0 0 400 283', `
    <rect width="400" height="283" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">two gears, one marked tooth each</text>
    ${[[126, 158, 54, 8, 'var(--accent)'], [266, 158, 40, 6, 'var(--mark)']].map(([cx, cy, r, n, col]) => `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--paper)" stroke="${col}" stroke-width="2.4"/>
      ${[...Array(n * 2)].map((_, k) => { const a = k * Math.PI / n;
        return `<rect x="${(cx + Math.cos(a) * r - 5).toFixed(1)}" y="${(cy + Math.sin(a) * r - 5).toFixed(1)}" width="10" height="10" rx="2"
          fill="${col}" opacity="${k === 0 ? '1' : '.32'}" transform="rotate(${(a * 180 / Math.PI).toFixed(1)} ${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)})"/>`; }).join('')}
      <circle cx="${cx}" cy="${cy}" r="9" fill="${col}" opacity=".3"/>
      <text x="${cx}" y="${cy + 5}" class="f-lab2">${n * 2}</text>`).join('')}
    <text x="126" y="234" class="f-step">16 teeth</text>
    <text x="266" y="234" class="f-step">12 teeth</text>
    <text x="200" y="66" class="f-lab3">both marks start at the top</text>
    <text x="200" y="266" class="f-cap">turn them — after how many teeth are both marks back on top?</text>`),

  discMeasurement: () => S('0 0 400 265', `
    <defs>${LGRAD('dmR', '#f6efdc', '#e0d3b4', true)}</defs>
    <rect width="400" height="265" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the same table, measured twice</text>
    <rect x="52" y="74" width="296" height="18" rx="3" fill="url(#dmR)" stroke="#b09a6a" stroke-width="1.6"/>
    ${[...Array(31)].map((_, i) => `<line x1="${52 + i * 9.87}" y1="74" x2="${52 + i * 9.87}" y2="${i % 10 === 0 ? 92 : (i % 5 === 0 ? 86 : 82)}" stroke="#8a7a66" stroke-width="${i % 10 === 0 ? 1.6 : 1}"/>`).join('')}
    <text x="200" y="112" class="f-lab2">150 centimetres</text>
    <rect x="52" y="146" width="296" height="18" rx="3" fill="url(#dmR)" stroke="#b09a6a" stroke-width="1.6"/>
    ${[...Array(4)].map((_, i) => `<line x1="${52 + i * 98.7}" y1="146" x2="${52 + i * 98.7}" y2="164" stroke="#8a7a66" stroke-width="1.8"/>`).join('')}
    <text x="200" y="184" class="f-lab2">1.5 metres</text>
    <text x="200" y="222" class="f-cap">the table did not change — only the size of the unit did</text>
    <text x="200" y="248" class="f-lab3">smaller unit, bigger number; bigger unit, smaller number</text>`),

  discCircles: () => S('0 0 400 263', `
    <defs>${LGRAD('dcT', '#dcebf7', '#a9cde6', true)}</defs>
    <rect width="400" height="263" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">roll a can along the table for one full turn</text>
    <line x1="40" y1="176" x2="368" y2="176" class="f-axis"/>
    <circle cx="86" cy="140" r="36" fill="url(#dcT)" stroke="#4f86aa" stroke-width="2.2"/>
    <line x1="86" y1="140" x2="86" y2="176" stroke="#8a4638" stroke-width="2.6"/>
    <circle cx="86" cy="140" r="4" fill="#8a4638"/>
    <g transform="rotate(300 312 140)">
      <circle cx="312" cy="140" r="36" fill="url(#dcT)" stroke="#4f86aa" stroke-width="2.2" opacity=".55"/>
      <line x1="312" y1="140" x2="312" y2="176" stroke="#8a4638" stroke-width="2.6"/>
    </g>
    <circle cx="312" cy="140" r="4" fill="#8a4638"/>
    <path d="M86 188 L312 188" stroke="var(--accent)" stroke-width="4.4" stroke-linecap="round"/>
    <line x1="86" y1="182" x2="86" y2="196" class="f-tick"/>
    <line x1="312" y1="182" x2="312" y2="196" class="f-tick"/>
    <text x="199" y="212" class="f-lab2">one full turn</text>
    <line x1="86" y1="140" x2="122" y2="140" class="f-dim"/>
    <text x="104" y="134" class="f-lab">r</text>
    <text x="200" y="246" class="f-cap">one turn leaves a straight track — how long is it?</text>`),

  discGraphs: () => S('0 0 400 283', `
    <rect width="400" height="283" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the same three numbers, drawn twice</text>
    ${[[24, 0, 'axis starts at 0'], [214, 94, 'axis starts at 94']].map(([x0, base, lab]) => `
      <rect x="${x0}" y="44" width="162" height="170" rx="6" class="f-card"/>
      <line x1="${x0 + 26}" y1="196" x2="${x0 + 146}" y2="196" class="f-axis"/>
      <line x1="${x0 + 26}" y1="196" x2="${x0 + 26}" y2="58" class="f-axis"/>
      ${[96, 98, 100].map((v, i) => { const h = (v - base) / (100 - base) * 120;
        return `<rect x="${x0 + 40 + i * 34}" y="${(196 - h).toFixed(1)}" width="24" height="${h.toFixed(1)}" class="ac-bar"/>
          <text x="${x0 + 52 + i * 34}" y="210" class="f-nl">${'ABC'[i]}</text>`; }).join('')}
      <text x="${x0 + 18}" y="${base ? 190 : 190}" class="f-lab3" text-anchor="end">${base || 0}</text>
      <text x="${x0 + 86}" y="234" class="f-step">${lab}</text>`).join('')}
    <text x="200" y="266" class="f-cap">C looks a little ahead on the left and enormously ahead on the right</text>`),

  discPythagorean: () => S('0 0 400 305', `
    <rect width="400" height="305" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">build a square on each side of a right triangle</text>
    <path d="M150 190 L210 190 L210 150 Z" fill="var(--ink3)" fill-opacity=".18" stroke="var(--ink2)" stroke-width="2"/>
    <path d="M150 184 L156 184 L156 190" fill="none" stroke="var(--ink2)" stroke-width="1.6"/>
    ${[...Array(3)].map((_, r) => [...Array(3)].map((_, c) =>
      TILE(150 + c * 20, 190 + r * 20, 18, 18, 'var(--accent-soft)', 'var(--accent)')).join('')).join('')}
    <text x="180" y="266" class="f-lab2">9</text>
    ${[...Array(4)].map((_, r) => [...Array(4)].map((_, c) =>
      TILE(210 + c * 20, 150 - r * 20 - 20, 18, 18, 'var(--mark-soft)', 'var(--mark)')).join('')).join('')}
    <text x="250" y="116" class="f-lab2">16</text>
    <g transform="rotate(-33.7 150 190)">
      ${[...Array(5)].map((_, r) => [...Array(5)].map((_, c) =>
        TILE(150 - 100 + c * 20, 190 - 100 + r * 20, 18, 18, '#cfe6cc', '#6b8f68')).join('')).join('')}
      <text x="100" y="146" class="f-lab2" fill="#4a7a46">25</text>
    </g>
    <text x="200" y="288" class="f-cap">the two small squares hold exactly as many tiles as the big one</text>`),

  discFunctions: () => S('0 0 400 291', `
    <defs>${LGRAD('dfB', '#e8eef5', '#c6d3e0', true)}</defs>
    <rect width="400" height="291" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a currency booth with one fixed rate</text>
    <rect x="112" y="48" width="176" height="96" rx="8" fill="url(#dfB)" stroke="#5a4a3a" stroke-width="2.4"/>
    <rect x="128" y="64" width="144" height="36" rx="4" fill="#0f1720"/>
    <text x="200" y="90" style="font:700 15px var(--mono, monospace);fill:#7fe08a" text-anchor="middle">£1 = $1.25</text>
    <text x="200" y="124" style="font:600 10.5px var(--sans);fill:#5a4a3a" text-anchor="middle">no commission, no haggling</text>
    ${[[70, '£20', '$25'], [200, '£40', '$50'], [330, '£60', '$75']].map(([x, a, b]) => `
      <rect x="${x - 34}" y="172" width="68" height="30" rx="5" fill="var(--mark-soft)" stroke="var(--mark)" stroke-width="1.4"/>
      <text x="${x}" y="192" style="font:700 13px var(--sans);fill:var(--ink)" text-anchor="middle">${a}</text>
      ${ARR(x, 204, x, 220)}
      <rect x="${x - 34}" y="224" width="68" height="30" rx="5" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>
      <text x="${x}" y="244" style="font:700 13px var(--sans);fill:var(--ink)" text-anchor="middle">${b}</text>`).join('')}
    <text x="200" y="274" class="f-cap">hand over the same amount tomorrow and you get the same back</text>`)
,

  /* ---------------- Geometry ---------------- */

  discGeobasics: () => S('0 0 400 292', `
    <rect width="400" height="292" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">describe this shape so a stranger can draw it</text>
    <path d="M70 200 L170 200 L120 110 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/>
    <circle cx="70" cy="200" r="4.6" class="f-hub"/><circle cx="170" cy="200" r="4.6" class="f-hub"/><circle cx="120" cy="110" r="4.6" class="f-hub"/>
    <text x="62" y="216" class="f-lab" text-anchor="end">A</text>
    <text x="178" y="216" class="f-lab" text-anchor="start">B</text>
    <text x="120" y="102" class="f-lab">C</text>
    <rect x="226" y="72" width="150" height="34" rx="6" fill="var(--wrong-soft)" stroke="var(--wrong)" stroke-width="1.6"/>
    <text x="301" y="94" class="f-lab">"a pointy triangle"</text>
    <rect x="226" y="120" width="150" height="34" rx="6" fill="var(--wrong-soft)" stroke="var(--wrong)" stroke-width="1.6"/>
    <text x="301" y="142" class="f-lab">"about this big"</text>
    <rect x="226" y="168" width="150" height="52" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="301" y="188" class="f-lab2">AB = 100, AC = 103</text>
    <text x="301" y="208" class="f-lab2">angle A = 62°</text>
    <text x="301" y="238" class="f-step">only one triangle fits</text>
    <text x="200" y="268" class="f-cap">two of these leave room to argue; one does not</text>`),

  discGeoproof: () => S('0 0 400 300', `
    <rect width="400" height="300" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">why should anyone believe you?</text>
    <rect x="34" y="46" width="160" height="200" rx="8" class="f-card"/>
    <text x="114" y="68" class="f-step">measuring</text>
    <path d="M62 150 L166 150 L114 86 Z" fill="none" stroke="var(--ink3)" stroke-width="1.8"/>
    <text x="114" y="176" class="f-lab3">I measured three</text>
    <text x="114" y="194" class="f-lab3">triangles and each</text>
    <text x="114" y="212" class="f-lab3">came to 180°</text>
    <text x="114" y="234" style="font:700 14px var(--sans);fill:var(--wrong)" text-anchor="middle">not a proof</text>
    <rect x="206" y="46" width="160" height="200" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="286" y="68" class="f-step">proving</text>
    ${[['given','three angles'],['because','parallel lines'],['so','they make a line'],['therefore','180° always']].map(([a,b],i)=>`
      <text x="224" y="${94+i*30}" style="font:700 10px var(--sans);fill:var(--accent-2)" text-anchor="start">${a}</text>
      <text x="280" y="${94+i*30}" class="f-lab3" text-anchor="start">${b}</text>
      ${i<3?`<line x1="232" y1="${99+i*30}" x2="232" y2="${112+i*30}" stroke="var(--accent)" stroke-width="1.4"/>`:''}`).join('')}
    <text x="286" y="234" style="font:700 14px var(--sans);fill:var(--accent-2)" text-anchor="middle">covers every triangle</text>
    <text x="200" y="274" class="f-cap">three examples cannot rule out a fourth; a reason can</text>`),

  discTriproof: () => S('0 0 400 286', `
    <rect width="400" height="286" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">how little do you need to fix a triangle?</text>
    <g>
      <path d="M40 150 L140 150 L92 82 Z" fill="var(--wrong-soft)" stroke="var(--wrong)" stroke-width="2"/>
      <path d="M40 150 L140 150 L110 96 Z" fill="none" stroke="var(--wrong)" stroke-width="1.6" stroke-dasharray="4 3"/>
      ${TK(40,150,140,150,1)}
      <text x="90" y="174" class="f-step">one side</text>
      <text x="90" y="194" class="f-lab" fill="var(--wrong)">endless triangles</text>
    </g>
    <g transform="translate(140 0)">
      <path d="M120 150 L220 150 L172 82 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>
      ${TK(120,150,220,150,1)}${TK(120,150,172,82,2)}${TK(220,150,172,82,3)}
      <text x="170" y="174" class="f-step">all three sides</text>
      <text x="170" y="194" class="f-lab2">exactly one triangle</text>
    </g>
    <text x="200" y="228" class="f-cap">three sides lock it; three angles do not</text>
    <text x="200" y="254" class="f-lab3">two triangles can share all three angles and be different sizes</text>`),

  discPolygons: () => S('0 0 400 300', `
    <rect width="400" height="300" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">every one of these is a quadrilateral</text>
    ${[[64,'M0 0 L76 0 L76 50 L0 50 Z','rectangle'],
       [176,'M0 0 L56 0 L56 56 L0 56 Z','square'],
       [288,'M16 0 L76 0 L60 50 L0 50 Z','parallelogram'],
       [64,'M20 0 L60 0 L80 50 L0 50 Z','trapezoid'],
       [176,'M28 0 L56 26 L28 52 L0 26 Z','rhombus'],
       [288,'M30 0 L62 30 L30 54 L0 30 Z','kite']].map(([x,d,lab],i)=>{
      const y = i<3 ? 52 : 154;
      return `<g transform="translate(${x-38} ${y})"><path d="${d}" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/></g>
        <text x="${x}" y="${y+72}" class="f-step">${lab}</text>`; }).join('')}
    <text x="200" y="266" class="f-cap">four straight sides is all they have in common</text>`),

  discRighttri: () => S('0 0 400 296', `
    <defs>${LGRAD('drL', '#cfe4f2', '#9cc6e0', true)}</defs>
    <rect width="400" height="296" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a ladder leaning at 70°, six metres long</text>
    <rect x="40" y="50" width="26" height="184" fill="#e4dccd" stroke="#b8a895" stroke-width="1.6"/>
    <line x1="66" y1="234" x2="330" y2="234" stroke="#8a7a66" stroke-width="4"/>
    <line x1="66" y1="66" x2="240" y2="234" stroke="url(#drL)" stroke-width="9" stroke-linecap="round"/>
    <line x1="66" y1="66" x2="240" y2="234" stroke="#4f86aa" stroke-width="2"/>
    ${[...Array(7)].map((_,i)=>`<line x1="${80+i*25}" y1="${80+i*24.2}" x2="${94+i*25}" y2="${66+i*24.2}" stroke="#4f86aa" stroke-width="2.4"/>`).join('')}
    ${ARC(240,234,44,180,110,'f-angarc')}
    <text x="196" y="222" class="f-lab2">70°</text>
    <line x1="252" y1="234" x2="252" y2="66" class="f-dim"/>
    <text x="262" y="150" class="f-lab" text-anchor="start">how high?</text>
    <text x="150" y="132" class="f-lab2" text-anchor="end">6 m</text>
    <text x="200" y="268" class="f-cap">one side and one angle — and the height is already decided</text>`),

  discCircleangles: () => S('0 0 400 300', `
    <rect width="400" height="300" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">three people watching the same goalposts</text>
    <circle cx="200" cy="158" r="104" fill="none" stroke="var(--rule)" stroke-width="2"/>
    <circle cx="140" cy="243" r="5" class="f-hub"/><circle cx="260" cy="243" r="5" class="f-hub"/>
    <path d="M140 243 A 104 104 0 0 1 260 243" fill="none" stroke="var(--accent)" stroke-width="5"/>
    ${[[200,54],[122,96],[286,110]].map(([x,y],i)=>`
      <line x1="${x}" y1="${y}" x2="140" y2="243" stroke="var(--mark)" stroke-width="1.8" opacity=".8"/>
      <line x1="${x}" y1="${y}" x2="260" y2="243" stroke="var(--mark)" stroke-width="1.8" opacity=".8"/>
      <circle cx="${x}" cy="${y}" r="6.5" fill="var(--mark)"/>
      <text x="${x}" y="${y-12}" class="f-lab3">${['A','B','C'][i]}</text>`).join('')}
    <text x="200" y="276" class="f-cap">they stand in different places — is the angle the same?</text>`)
,

  discCircleeq: () => S('0 0 400 300', `
    <rect width="400" height="300" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a sprinkler that reaches five metres</text>
    ${GRID(48, 46, 300, 200, 25)}
    <line x1="40" y1="246" x2="356" y2="246" class="f-axis"/>
    <line x1="48" y1="254" x2="48" y2="40" class="f-axis"/>
    <circle cx="198" cy="146" r="100" fill="var(--accent)" fill-opacity=".1" stroke="var(--accent)" stroke-width="2.4"/>
    <circle cx="198" cy="146" r="5.4" class="f-hub"/>
    <line x1="198" y1="146" x2="198" y2="46" class="f-dim"/>
    <text x="208" y="100" class="f-lab2" text-anchor="start">5 m</text>
    <text x="206" y="164" class="f-lab" text-anchor="start">(6, 4)</text>
    ${[[198,46],[298,146],[198,246],[98,146],[269,75]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.4" fill="var(--mark)"/>`).join('')}
    <text x="200" y="278" class="f-cap">every wet point is exactly 5 m from the sprinkler — and no dry one is</text>`),

  discSolids3d: () => S('0 0 400 296', `
    <defs>${LGRAD('dsR', '#cfe4f2', '#8fb8d6', true)}</defs>
    <rect width="400" height="296" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">spin a flat shape and it sweeps out a solid</text>
    <line x1="92" y1="52" x2="92" y2="236" class="f-dash"/>
    <path d="M92 90 L150 90 L150 200 L92 200 Z" fill="var(--mark)" fill-opacity=".3" stroke="var(--mark)" stroke-width="2"/>
    <text x="122" y="222" class="f-step">a rectangle</text>
    ${ARR(178, 145, 214, 145)}
    <g transform="translate(300 90)">
      <ellipse cx="0" cy="0" rx="58" ry="19" fill="#f4f8fa" stroke="#4f86aa" stroke-width="2"/>
      <path d="M-58 0 L-58 110 A 58 19 0 0 0 58 110 L58 0" fill="url(#dsR)" fill-opacity=".85" stroke="#4f86aa" stroke-width="2"/>
      <ellipse cx="0" cy="0" rx="58" ry="19" fill="#f4f8fa" stroke="#4f86aa" stroke-width="2"/>
      <line x1="0" y1="-38" x2="0" y2="148" class="f-dash"/>
      <text x="0" y="146" class="f-step">a cylinder</text>
    </g>
    <text x="200" y="268" class="f-cap">spin a right triangle instead and you get a cone</text>`),

  discSimproof: () => S('0 0 400 292', `
    <rect width="400" height="292" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a line drawn parallel to one side</text>
    <path d="M56 226 L316 226 L186 68 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/>
    <line x1="121" y1="147" x2="251" y2="147" stroke="var(--mark)" stroke-width="3.4"/>
    <path d="M110 140 l12 -5 M110 146 l12 -5" stroke="var(--mark)" stroke-width="1.6" fill="none"/>
    <path d="M56 219 l12 -5 M56 225 l12 -5" stroke="var(--accent)" stroke-width="1.6" fill="none"/>
    <circle cx="121" cy="147" r="4.6" fill="var(--mark)"/><circle cx="251" cy="147" r="4.6" fill="var(--mark)"/>
    <text x="106" y="196" class="f-lab" text-anchor="end">6</text>
    <text x="104" y="110" class="f-lab" text-anchor="end">4</text>
    <text x="284" y="196" class="f-lab" text-anchor="start">9</text>
    <text x="288" y="110" class="f-lab" text-anchor="start">?</text>
    <text x="186" y="140" class="f-lab2">parallel</text>
    <text x="200" y="262" class="f-cap">it cuts both sides — but does it cut them in the same ratio?</text>`),

  discCoordproof: () => S('0 0 400 296', `
    <rect width="400" height="296" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">is this really a rectangle, or does it just look like one?</text>
    ${GRID(48, 46, 300, 190, 25)}
    <line x1="40" y1="236" x2="356" y2="236" class="f-axis"/>
    <line x1="48" y1="244" x2="48" y2="40" class="f-axis"/>
    <path d="M98 186 L198 61 L298 136 L198 236 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/>
    ${DOTS([[98,186],[198,61],[298,136],[198,236]], 'f-hub')}
    <text x="88" y="192" class="f-lab" text-anchor="end">(2, 2)</text>
    <text x="198" y="53" class="f-lab">(6, 7)</text>
    <text x="308" y="134" class="f-lab" text-anchor="start">(10, 4)</text>
    <text x="198" y="256" class="f-lab">(6, -1)</text>
    <text x="200" y="282" class="f-cap">eyes are not evidence — but the four corners are numbers</text>`),

  /* ---- supporting figures ---- */

  trigRatios: () => S('0 0 480 250', `
    <rect width="480" height="250" rx="0" fill="none"/>
    <text x="14" y="22" class="f-cap" text-anchor="start">the three ratios all live in the same triangle</text>
    <path d="M60 190 L260 190 L260 70 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>
    <path d="M244 190 L244 174 L260 174" fill="none" stroke="var(--ink2)" stroke-width="1.6"/>
    ${ARC(60, 190, 40, 0, 31, 'f-angarc')}
    <text x="106" y="182" class="f-lab2" text-anchor="start">θ</text>
    <text x="160" y="206" class="f-lab">adjacent</text>
    <text x="270" y="134" class="f-lab" text-anchor="start">opposite</text>
    <text x="146" y="118" class="f-lab" text-anchor="end">hypotenuse</text>
    <text x="330" y="74" class="f-cap" text-anchor="start">sin θ = opp / hyp</text>
    <text x="330" y="104" class="f-cap" text-anchor="start">cos θ = adj / hyp</text>
    <text x="330" y="134" class="f-cap" text-anchor="start">tan θ = opp / adj</text>
    <text x="330" y="170" class="f-lab3" text-anchor="start">"opposite" and "adjacent"</text>
    <text x="330" y="188" class="f-lab3" text-anchor="start">are named from θ, so they</text>
    <text x="330" y="206" class="f-lab3" text-anchor="start">swap if you move to the</text>
    <text x="330" y="224" class="f-lab3" text-anchor="start">other acute angle</text>
    <text x="14" y="240" class="f-lab3" text-anchor="start">the hypotenuse never moves — it is always opposite the right angle</text>`),

  circleAngleTypes: () => S('0 0 480 256', `
    <text x="14" y="22" class="f-cap" text-anchor="start">where the vertex sits decides the rule</text>
    ${[[92,'centre'],[240,'on the circle'],[388,'outside']].map(([cx,lab],i)=>`
      <circle cx="${cx}" cy="118" r="52" fill="none" stroke="var(--rule)" stroke-width="1.8"/>
      <path d="M${cx-40} 151 A 52 52 0 0 1 ${cx+40} 151" fill="none" stroke="var(--accent)" stroke-width="4"/>
      ${i===0 ? `<line x1="${cx}" y1="118" x2="${cx-40}" y2="151" class="f-line"/><line x1="${cx}" y1="118" x2="${cx+40}" y2="151" class="f-line"/><circle cx="${cx}" cy="118" r="4.6" class="f-hub"/>`
        : i===1 ? `<line x1="${cx}" y1="66" x2="${cx-40}" y2="151" class="f-line"/><line x1="${cx}" y1="66" x2="${cx+40}" y2="151" class="f-line"/><circle cx="${cx}" cy="66" r="4.6" class="f-hub"/>`
        : `<line x1="${cx}" y1="24" x2="${cx-40}" y2="151" class="f-line"/><line x1="${cx}" y1="24" x2="${cx+40}" y2="151" class="f-line"/><circle cx="${cx}" cy="24" r="4.6" class="f-hub"/>`}
      <text x="${cx}" y="192" class="f-name">${lab}</text>
      <text x="${cx}" y="212" class="f-lab2">${['= the arc','= half the arc','= half the difference'][i]}</text>`).join('')}
    <text x="14" y="242" class="f-lab3" text-anchor="start">the orange arc is the same in all three pictures; only the vertex moved</text>`),

  proofSkeleton: () => S('0 0 480 236', `
    <text x="14" y="22" class="f-cap" text-anchor="start">every two-column proof has the same shape</text>
    <rect x="40" y="38" width="400" height="152" rx="7" class="f-card"/>
    <line x1="240" y1="38" x2="240" y2="190" class="f-rule"/>
    <line x1="40" y1="64" x2="440" y2="64" class="f-rule"/>
    <text x="140" y="56" style="font:700 11px var(--sans);fill:var(--accent-2)" text-anchor="middle">STATEMENT</text>
    <text x="340" y="56" style="font:700 11px var(--sans);fill:var(--accent-2)" text-anchor="middle">REASON</text>
    ${[['what you were told','Given'],['a step that follows','a definition'],['another step','a theorem'],['what you wanted','follows from above']].map(([a,b],i)=>`
      <text x="140" y="${86+i*30}" class="f-lab">${a}</text>
      <text x="340" y="${86+i*30}" class="f-lab3">${b}</text>`).join('')}
    <text x="14" y="212" class="f-lab3" text-anchor="start">the left column may never get ahead of the right one</text>
    <text x="14" y="230" class="f-lab3" text-anchor="start">a statement with no reason beside it is a guess, however true it is</text>`),

  polygonFamily: () => S('0 0 480 250', `
    <text x="14" y="22" class="f-cap" text-anchor="start">each step down adds one more condition</text>
    ${[[240,52,120,34,'quadrilateral','4 sides'],
       [150,110,110,32,'parallelogram','2 pairs parallel'],
       [330,110,110,32,'trapezoid','1 pair parallel'],
       [92,168,92,32,'rectangle','4 right angles'],
       [208,168,92,32,'rhombus','4 equal sides'],
       [150,214,92,30,'square','both']].map(([x,y,w,h,lab,sub])=>`
      <rect x="${x-w/2}" y="${y}" width="${w}" height="${h}" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>
      <text x="${x}" y="${y+14}" style="font:700 10.5px var(--sans);fill:var(--ink)" text-anchor="middle">${lab}</text>
      <text x="${x}" y="${y+27}" style="font:500 9px var(--sans);fill:var(--ink3)" text-anchor="middle">${sub}</text>`).join('')}
    ${[[240,86,150,110],[240,86,330,110],[150,142,92,168],[150,142,208,168],[92,200,150,214],[208,200,150,214]].map(([x1,y1,x2,y2])=>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="f-branch"/>`).join('')}
    <text x="410" y="200" class="f-lab3" text-anchor="middle">a square is</text>
    <text x="410" y="216" class="f-lab3" text-anchor="middle">every box above it</text>`),

  /* ---- Algebra II discovery illustrations ---- */

  discFunctionops: () => S('0 0 400 268', `
    <defs>${LGRAD('dfoA', '#dceef5', '#a9d0e2', true)}${LGRAD('dfoB', '#fbeed6', '#eed49a', true)}</defs>
    <rect width="400" height="268" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">two machines, bolted together</text>
    <circle cx="34" cy="128" r="17" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>
    <text x="34" y="133" class="f-lab2">3</text>
    ${ARR(54, 128, 92, 128)}
    <rect x="92" y="94" width="96" height="68" rx="9" fill="url(#dfoA)" stroke="var(--accent)" stroke-width="2"/>
    <text x="140" y="124" class="f-lab2">double it</text>
    <text x="140" y="142" class="f-lab3">g</text>
    ${ARR(190, 128, 222, 128)}
    <circle cx="240" cy="128" r="17" fill="var(--mark-soft)" stroke="var(--mark)" stroke-width="2"/>
    <text x="240" y="133" class="f-lab2">6</text>
    ${ARR(258, 128, 282, 128)}
    <rect x="282" y="94" width="86" height="68" rx="9" fill="url(#dfoB)" stroke="var(--mark)" stroke-width="2"/>
    <text x="325" y="124" class="f-lab2">add 5</text>
    <text x="325" y="142" class="f-lab3">f</text>
    <circle cx="325" cy="192" r="17" fill="var(--right-soft)" stroke="var(--right)" stroke-width="2"/>
    <text x="325" y="197" class="f-lab2">11</text>
    ${ARR(325, 164, 325, 174)}
    <text x="200" y="238" class="f-cap">the middle number never gets written down</text>`),

  discTransformfn: () => S('0 0 400 282', `
    <rect width="400" height="282" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one curve, traced and moved</text>
    ${GRID(40, 44, 320, 176, 32)}
    <line x1="40" y1="220" x2="360" y2="220" class="f-axis"/>
    <line x1="200" y1="44" x2="200" y2="228" class="f-axis"/>
    <path d="M136 220 Q200 60 264 220" fill="none" class="f-ghost" stroke-width="3" stroke-dasharray="5 4"/>
    <path d="M104 156 Q168 -4 232 156" fill="none" stroke="var(--accent)" stroke-width="3.4"/>
    <path d="M200 220 Q248 124 296 220" fill="none" stroke="var(--mark)" stroke-width="3.4"/>
    <text x="96" y="80" class="f-lab3" text-anchor="start">slid up and left</text>
    <text x="304" y="186" class="f-lab3" text-anchor="start">squashed</text>
    <text x="200" y="252" class="f-cap">same shape — only its place and width changed</text>`),

  discPolydiv: () => S('0 0 400 264', `
    <rect width="400" height="264" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">you already know this algorithm</text>
    <rect x="22" y="48" width="170" height="150" rx="10" fill="var(--paper)" stroke="var(--rule)" stroke-width="1.6"/>
    <text x="107" y="72" class="f-lab">long division, grade 4</text>
    <text x="107" y="106" style="font:700 19px var(--disp);fill:var(--ink)" text-anchor="middle">42</text>
    <line x1="52" y1="114" x2="162" y2="114" stroke="var(--ink3)" stroke-width="1.5"/>
    <text x="107" y="136" style="font:700 19px var(--disp);fill:var(--ink)" text-anchor="middle">37 ) 1554</text>
    <text x="107" y="170" class="f-lab3">no remainder — 37 is a factor</text>
    <rect x="208" y="48" width="170" height="150" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="293" y="72" class="f-lab">long division, today</text>
    <text x="293" y="106" style="font:700 17px var(--disp);fill:var(--ink)" text-anchor="middle">x + 4</text>
    <line x1="238" y1="114" x2="348" y2="114" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="293" y="136" style="font:700 15px var(--disp);fill:var(--ink)" text-anchor="middle">x−3 ) x²+x−12</text>
    <text x="293" y="170" class="f-lab3">no remainder — x−3 is a factor</text>
    <text x="200" y="234" class="f-cap">same steps, same question: does it divide exactly?</text>`),

  discPolyfn: () => S('0 0 400 274', `
    <defs>${LGRAD('dpfR', '#f3c9a8', '#d98b52', true)}</defs>
    <rect width="400" height="274" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a track with three hills needs a big enough rule</text>
    <path d="M30 176 C70 60 108 232 152 128 C196 24 236 214 282 116 C318 42 348 150 372 128"
          fill="none" stroke="url(#dpfR)" stroke-width="7" stroke-linecap="round"/>
    <path d="M30 176 C70 60 108 232 152 128 C196 24 236 214 282 116 C318 42 348 150 372 128"
          fill="none" stroke="#b5703a" stroke-width="1.6" stroke-linecap="round"/>
    ${DOTS([[86,120],[126,178],[176,72],[258,168],[316,84]], 'f-dot')}
    <text x="86" y="106" class="f-lab3">turn</text>
    <text x="126" y="200" class="f-lab3">turn</text>
    <text x="176" y="58" class="f-lab3">turn</text>
    <text x="258" y="190" class="f-lab3">turn</text>
    <text x="316" y="70" class="f-lab3">turn</text>
    <text x="200" y="240" class="f-cap">five turns — a line has none, a parabola has one</text>`),

  discComplexnum: () => S('0 0 400 286', `
    <rect width="400" height="286" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">nowhere on the line does x² = −1</text>
    <line x1="34" y1="88" x2="366" y2="88" class="f-nl"/>
    ${[-3,-2,-1,0,1,2,3].map(v=>`<line x1="${200+v*52}" y1="82" x2="${200+v*52}" y2="94" class="f-tick"/>
      <text x="${200+v*52}" y="112" class="f-lab3">${v}</text>`).join('')}
    <text x="200" y="62" class="f-lab">square any of these and you land on the right half</text>
    ${ARR(148, 78, 252, 78, 'f-arrow')}
    <text x="200" y="146" class="f-lab2">so step off the line</text>
    <line x1="60" y1="222" x2="340" y2="222" class="f-axis"/>
    <line x1="200" y1="166" x2="200" y2="262" class="f-axis"/>
    <circle cx="200" cy="184" r="6" fill="var(--mark)"/>
    <text x="216" y="188" class="f-lab2" text-anchor="start">i</text>
    <text x="330" y="240" class="f-lab3">real</text>
    <text x="216" y="172" class="f-lab3" text-anchor="start">imaginary</text>
    <text x="200" y="278" class="f-cap">one new number, and every equation has an answer</text>`),

  discRadicaleq: () => S('0 0 400 272', `
    <rect width="400" height="272" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">every step was legal, and the answer is wrong</text>
    <rect x="26" y="46" width="164" height="132" rx="10" fill="var(--paper)" stroke="var(--rule)" stroke-width="1.6"/>
    <text x="108" y="70" class="f-lab">the algebra</text>
    <text x="108" y="102" style="font:700 17px var(--disp);fill:var(--ink)" text-anchor="middle">√x = −3</text>
    <text x="108" y="130" class="f-lab3">square both sides</text>
    <text x="108" y="158" style="font:700 17px var(--disp);fill:var(--ink)" text-anchor="middle">x = 9</text>
    ${ARR(196, 112, 224, 112)}
    <rect x="232" y="46" width="142" height="132" rx="10" fill="var(--wrong-soft)" stroke="var(--wrong)" stroke-width="1.8"/>
    <text x="303" y="70" class="f-lab">the check</text>
    <text x="303" y="102" style="font:700 17px var(--disp);fill:var(--ink)" text-anchor="middle">√9 = 3</text>
    <text x="303" y="130" class="f-lab3">but we needed −3</text>
    <g transform="translate(303 156)"><circle r="13" fill="none" stroke="var(--wrong)" stroke-width="2.4"/>
      <line x1="-6" y1="-6" x2="6" y2="6" stroke="var(--wrong)" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="6" y1="-6" x2="-6" y2="6" stroke="var(--wrong)" stroke-width="2.8" stroke-linecap="round"/></g>
    <text x="200" y="216" class="f-lab2">squaring forgets the sign it started with</text>
    <text x="200" y="246" class="f-cap">the last line of a radical equation is the check</text>`),

  discRational: () => S('0 0 400 286', `
    <defs>${LGRAD('drW', '#bfe0ef', '#6fb3d6', true)}</defs>
    <rect width="400" height="286" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one tap fills it in 3 hours, the other in 6</text>
    ${[[120,'3 h'],[280,'6 h']].map(([x,lab],i)=>`
      <rect x="${x-17}" y="48" width="34" height="26" rx="5" fill="#b9c3c7" stroke="#7f8b90" stroke-width="1.5"/>
      <rect x="${x-5}" y="74" width="10" height="16" fill="#8d979c"/>
      <text x="${x}" y="42" class="f-lab3">${lab}</text>
      ${[0,1,2].map(k=>`<circle cx="${x}" cy="${100+k*17}" r="3.4" fill="url(#drW)" opacity="${.9-k*.2}"/>`).join('')}`).join('')}
    <path d="M86 156 L106 250 L294 250 L314 156 Z" fill="none" stroke="#8a95a0" stroke-width="2.6"/>
    <path d="M97 208 L106 250 L294 250 L303 208 Z" fill="url(#drW)" opacity=".85"/>
    <text x="200" y="196" class="f-lab2">together?</text>
    <text x="200" y="272" class="f-cap">not 4.5 hours — two taps beat either one alone</text>`),

  discLogarithms: () => S('0 0 400 264', `
    <rect width="400" height="264" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">2 to what power reaches a thousand?</text>
    ${[[1,2],[2,4],[3,8],[4,16],[5,32],[6,64],[7,128],[8,256],[9,512],[10,1024]].map(([e,v],i)=>{
      const h = 8 + Math.log2(v)*13.4, x = 24 + i*37, over = v > 1000;
      return `<rect x="${x}" y="${190-h}" width="26" height="${h}" rx="3" fill="${over?'var(--right)':'var(--accent-soft)'}" stroke="${over?'var(--right)':'var(--accent)'}" stroke-width="1.5"/>
        <text x="${x+13}" y="${182-h}" class="f-lab3">${v}</text>
        <text x="${x+13}" y="206" class="f-lab3">${e}</text>`}).join('')}
    <line x1="18" y1="190" x2="382" y2="190" class="f-axis"/>
    <line x1="18" y1="54" x2="382" y2="54" stroke="var(--mark)" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="22" y="48" class="f-lab3" text-anchor="start">1000</text>
    <text x="200" y="228" class="f-lab">the exponent is what we are hunting for</text>
    <text x="200" y="250" class="f-cap">between 9 and 10 — a log is that exponent</text>`),

  discExpmodels: () => S('0 0 400 278', `
    <defs>${LGRAD('demC', '#e8b98a', '#b9703a', true)}</defs>
    <rect width="400" height="278" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">coffee left on the desk</text>
    <line x1="48" y1="212" x2="370" y2="212" class="f-axis"/>
    <line x1="48" y1="48" x2="48" y2="212" class="f-axis"/>
    <line x1="48" y1="196" x2="370" y2="196" stroke="var(--ink3)" stroke-width="1.4" stroke-dasharray="5 4"/>
    <text x="364" y="190" class="f-lab3" text-anchor="end">room temp</text>
    <path d="M48 62 C110 112 150 156 200 176 C252 196 300 193 370 195" fill="none" stroke="url(#demC)" stroke-width="5"/>
    ${DOTS([[48,62],[124,131],[200,176],[276,192]], 'f-dot')}
    ${[[48,62,'80°'],[124,131,'53°'],[200,176,'37°'],[276,192,'28°']].map(([x,y,t])=>
      `<text x="${x}" y="${y-13}" class="f-lab3">${t}</text>`).join('')}
    ${[[48,124],[124,200],[200,276]].map(([a,b])=>`<line x1="${a}" y1="232" x2="${b}" y2="232" class="f-dim"/>`).join('')}
    <text x="200" y="250" class="f-lab3">equal times</text>
    <text x="200" y="270" class="f-cap">it never drops the same degrees — it drops the same share</text>`),

  discSeries: () => S('0 0 400 262', `
    <rect width="400" height="262" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">add 1 to 100 — without adding 100 things</text>
    ${[1,2,3,4].map((n,i)=>{const y=62+i*34;
      return `<rect x="34" y="${y-16}" width="42" height="26" rx="5" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>
        <text x="55" y="${y+2}" class="f-lab2">${n}</text>
        <rect x="270" y="${y-16}" width="52" height="26" rx="5" fill="var(--mark-soft)" stroke="var(--mark)" stroke-width="1.4"/>
        <text x="296" y="${y+2}" class="f-lab2">${101-n}</text>
        <line x1="78" y1="${y-3}" x2="268" y2="${y-3}" class="f-dim"/>
        <text x="173" y="${y-8}" class="f-lab3">101</text>`}).join('')}
    <text x="55" y="218" class="f-lab2">⋮</text><text x="296" y="218" class="f-lab2">⋮</text>
    <text x="200" y="240" class="f-cap">fifty pairs of 101 — the adding is already done</text>`),

  discUnitcircle: () => S('0 0 400 300', `
    <rect width="400" height="300" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">how many radius-lengths fit around the rim?</text>
    <circle cx="200" cy="158" r="84" fill="none" stroke="var(--rule)" stroke-width="2"/>
    ${[...Array(6)].map((_, k) => {
      const a0 = k, a1 = k + 1, p = t => [200 + 84 * Math.cos(t), 158 - 84 * Math.sin(t)];
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A 84 84 0 0 0 ${x1.toFixed(1)} ${y1.toFixed(1)}"
        fill="none" stroke="${k % 2 ? 'var(--accent)' : 'var(--mark)'}" stroke-width="5" stroke-linecap="butt"/>`;
    }).join('')}
    ${[...Array(7)].map((_, k) => {
      const x = 200 + 84 * Math.cos(k), y = 158 - 84 * Math.sin(k);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" class="f-dot"/>`;
    }).join('')}
    <line x1="200" y1="158" x2="284" y2="158" stroke="var(--ink)" stroke-width="2.6"/>
    <circle cx="200" cy="158" r="3.6" class="f-hub"/>
    <text x="242" y="150" class="f-lab2">r</text>
    <text x="200" y="272" class="f-lab">six fit, with a fraction of a seventh left over</text>
    <text x="200" y="292" class="f-cap">that leftover is why the number is 6.28 and not 6</text>`),

  discTriggraphs: () => S('0 0 400 286', `
    <defs>${LGRAD('dtgC', '#a9d0e2', '#5d9cc0', true)}</defs>
    <rect width="400" height="286" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">your height on a Ferris wheel, minute by minute</text>
    <circle cx="86" cy="150" r="62" fill="none" stroke="var(--rule)" stroke-width="2.4"/>
    ${[...Array(8)].map((_, k) => { const a = k * Math.PI / 4;
      return `<line x1="86" y1="150" x2="${(86 + 62 * Math.cos(a)).toFixed(1)}" y2="${(150 - 62 * Math.sin(a)).toFixed(1)}" stroke="var(--rule-2)" stroke-width="1.4"/>`; }).join('')}
    <circle cx="86" cy="150" r="4.6" class="f-hub"/>
    <circle cx="125.9" cy="102.5" r="7.5" fill="url(#dtgC)" stroke="var(--accent)" stroke-width="2"/>
    <line x1="125.9" y1="102.5" x2="188" y2="102.5" class="f-dim"/>
    <line x1="86" y1="212" x2="380" y2="212" class="f-axis"/>
    <path d="${(() => { let d = ''; for (let i = 0; i <= 42; i++) { const t = i / 42, x = 188 + t * 186,
        y = 150 - 62 * Math.sin(50 * Math.PI / 180 + t * 2 * Math.PI); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' '; } return d.trim(); })()}"
      fill="none" stroke="var(--accent)" stroke-width="3.2"/>
    <circle cx="188" cy="102.5" r="5" fill="var(--accent)"/>
    <line x1="188" y1="88" x2="188" y2="212" stroke="var(--rule)" stroke-width="1.4"/>
    <text x="284" y="232" class="f-lab3">one turn</text>
    <text x="200" y="262" class="f-cap">going round in a circle, drawn flat, is a wave</text>`),

  discTrigid: () => S('0 0 400 292', `
    <rect width="400" height="292" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the oldest theorem, hiding in a circle</text>
    <circle cx="176" cy="178" r="104" fill="none" stroke="var(--rule)" stroke-width="2"/>
    <line x1="60" y1="178" x2="300" y2="178" class="f-axis"/>
    <line x1="176" y1="62" x2="176" y2="290" class="f-axis"/>
    <path d="M176 178 L256 122 L256 178 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>
    <line x1="176" y1="178" x2="256" y2="122" stroke="var(--ink)" stroke-width="2.8"/>
    <rect x="244" y="166" width="12" height="12" fill="none" stroke="var(--accent)" stroke-width="1.6"/>
    <circle cx="256" cy="122" r="5.5" fill="var(--mark)"/>
    <text x="212" y="140" class="f-lab2">1</text>
    <text x="216" y="196" class="f-lab2">cos θ</text>
    <text x="272" y="154" class="f-lab2" text-anchor="start">sin θ</text>
    ${ARC(176, 178, 34, 0, 35, 'f-angarc')}
    <text x="196" y="170" class="f-lab3">θ</text>
    <text x="200" y="272" class="f-cap">legs cos and sin, hypotenuse 1 — Pythagoras does the rest</text>`),

  discNormaldist: () => S('0 0 400 274', `
    <rect width="400" height="274" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">measure enough people and the same hill appears</text>
    ${[3,8,17,32,52,71,80,71,52,32,17,8,3].map((v, i) => {
      const x = 32 + i * 26.5, h = v * 1.68;
      return `<rect x="${x}" y="${206 - h}" width="22" height="${h}" rx="2.5" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.3"/>`;
    }).join('')}
    <path d="${(() => { let d = ''; for (let i = 0; i <= 60; i++) { const t = -3 + i * 0.1,
        x = 43 + (t + 3) * 57.4, y = 206 - 134 * Math.exp(-t * t / 2); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' '; } return d.trim(); })()}"
      fill="none" stroke="var(--mark)" stroke-width="3.4"/>
    <line x1="24" y1="206" x2="376" y2="206" class="f-axis"/>
    <line x1="215" y1="72" x2="215" y2="206" stroke="var(--ink3)" stroke-width="1.6" stroke-dasharray="5 4"/>
    <text x="215" y="228" class="f-lab3">average</text>
    <text x="200" y="252" class="f-cap">nobody arranged it — heights and errors pile up alike</text>`),

  discStatinf: () => S('0 0 400 282', `
    <rect width="400" height="282" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">ask a thousand, speak for millions</text>
    <ellipse cx="112" cy="128" rx="90" ry="66" fill="var(--rule-2)" stroke="var(--rule)" stroke-width="1.6"/>
    ${[...Array(58)].map((_, i) => { const a = i * 2.39996, r = 62 * Math.sqrt(i / 58);
      return `<circle cx="${(112 + r * Math.cos(a)).toFixed(1)}" cy="${(128 + r * 0.76 * Math.sin(a)).toFixed(1)}" r="3" fill="var(--ink3)" opacity=".55"/>`; }).join('')}
    <circle cx="96" cy="120" r="29" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.4"/>
    ${[[84,110],[104,112],[92,128],[108,130],[97,120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="var(--accent)"/>`).join('')}
    <text x="112" y="212" class="f-lab3">everyone</text>
    ${ARR(206, 128, 248, 128)}
    <text x="316" y="84" class="f-lab">the sample said 52%</text>
    <line x1="256" y1="132" x2="380" y2="132" stroke="var(--rule)" stroke-width="2.4"/>
    <line x1="278" y1="120" x2="278" y2="144" stroke="var(--mark)" stroke-width="2.6"/>
    <line x1="358" y1="120" x2="358" y2="144" stroke="var(--mark)" stroke-width="2.6"/>
    <rect x="278" y="124" width="80" height="16" fill="var(--mark-soft)" stroke="var(--mark)" stroke-width="1.6"/>
    <circle cx="318" cy="132" r="4.4" fill="var(--mark)"/>
    <text x="318" y="166" class="f-lab3">49% to 55%</text>
    <text x="200" y="256" class="f-cap">the honest answer is a range, not a single number</text>`),

  polyDivision: () => S('0 0 440 190', `
    <title>Polynomial long division, one step at a time</title>
    <text x="220" y="20" class="f-cap">divide the leading terms, multiply back, subtract, bring down</text>
    <text x="150" y="58" style="font:700 16px var(--disp);fill:var(--accent)" text-anchor="middle">x²  +  5x  +  6</text>
    <line x1="74" y1="68" x2="238" y2="68" stroke="var(--ink3)" stroke-width="1.6"/>
    <path d="M74 68 L74 92" stroke="var(--ink3)" stroke-width="1.6"/>
    <text x="66" y="88" style="font:600 14px var(--disp);fill:var(--ink)" text-anchor="end">x − 2</text>
    <text x="156" y="88" style="font:600 14px var(--disp);fill:var(--ink)" text-anchor="middle">x³ + 3x² − 4x − 12</text>
    ${[[108, '−(x³ − 2x²)'], [130, '5x² − 4x'], [152, '−(5x² − 10x)'], [174, '6x − 12']].map(([y, t]) =>
      `<text x="156" y="${y}" style="font:500 12.5px var(--disp);fill:var(--ink2)" text-anchor="middle">${t}</text>`).join('')}
    <line x1="96" y1="116" x2="238" y2="116" stroke="var(--rule)" stroke-width="1.2"/>
    <line x1="96" y1="160" x2="238" y2="160" stroke="var(--rule)" stroke-width="1.2"/>
    <text x="330" y="70" class="f-lab3">x³ ÷ x = x²</text>
    <text x="330" y="100" class="f-lab3">5x² ÷ x = 5x</text>
    <text x="330" y="130" class="f-lab3">6x ÷ x = 6</text>
    <text x="330" y="166" class="f-lab2">remainder 0</text>
    ${ARR(268, 66, 300, 62)}${ARR(268, 132, 300, 126)}`),

  polyEnds: () => S('0 0 440 216', `
    <title>What the ends do, by degree and sign</title>
    <text x="220" y="18" class="f-cap">two things decide the ends: the degree, and the sign of the lead</text>
    ${[['even, +', 0, 0], ['even, −', 1, 0], ['odd, +', 2, 0], ['odd, −', 3, 0]].map(([lab, i]) => {
      const x0 = 18 + i * 108, y0 = 36, w = 92, h = 130, cx = x0 + w / 2, cy = y0 + h / 2;
      const even = i < 2, pos = i % 2 === 0;
      let d = '';
      for (let k = 0; k <= 30; k++) { const t = -1 + k / 15;
        const v = even ? (t * t * t * t - 1.3 * t * t) : (t * t * t - 0.9 * t);
        const yy = cy - (pos ? v : -v) * 34; d += (k ? 'L' : 'M') + (cx + t * 38).toFixed(1) + ' ' + yy.toFixed(1) + ' '; }
      return `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="8" fill="var(--paper-2)" stroke="var(--rule)" stroke-width="1.4"/>
        <line x1="${x0 + 8}" y1="${cy}" x2="${x0 + w - 8}" y2="${cy}" class="f-axis"/>
        <path d="${d.trim()}" fill="none" stroke="var(--accent)" stroke-width="2.6"/>
        <text x="${cx}" y="${y0 + h + 18}" class="f-lab3">${lab}</text>`;
    }).join('')}
    <text x="220" y="208" class="f-lab3">even degree: both ends agree · odd degree: they disagree</text>`),

  complexPlane: () => S('0 0 380 236', `
    <title>A complex number is a point, not a place on the line</title>
    ${GRID(40, 34, 300, 168, 28)}
    <line x1="40" y1="118" x2="346" y2="118" class="f-axis"/>
    <line x1="180" y1="28" x2="180" y2="208" class="f-axis"/>
    <text x="340" y="136" class="f-lab3">real</text>
    <text x="188" y="38" class="f-lab3" text-anchor="start">imaginary</text>
    <line x1="180" y1="118" x2="264" y2="62" stroke="var(--accent)" stroke-width="2.6"/>
    <circle cx="264" cy="62" r="6" fill="var(--accent)"/>
    <text x="274" y="56" class="f-lab2" text-anchor="start">3 + 2i</text>
    <line x1="180" y1="118" x2="264" y2="118" class="f-dim"/>
    <line x1="264" y1="118" x2="264" y2="62" class="f-dim"/>
    <text x="222" y="136" class="f-lab3">3 right</text>
    <text x="272" y="94" class="f-lab3" text-anchor="start">2 up</text>
    <circle cx="180" cy="90" r="5" fill="var(--mark)"/>
    <text x="166" y="86" class="f-lab3" text-anchor="end">i</text>
    <text x="190" y="228" class="f-cap">real part left-right, imaginary part up-down</text>`),

  rationalAsymptote: () => S('0 0 380 244', `
    <title>Where a rational function cannot go</title>
    ${GRID(34, 30, 312, 180, 26)}
    <line x1="34" y1="120" x2="346" y2="120" class="f-axis"/>
    <line x1="190" y1="24" x2="190" y2="216" class="f-axis"/>
    <line x1="242" y1="24" x2="242" y2="216" stroke="var(--wrong)" stroke-width="2" stroke-dasharray="6 4"/>
    <line x1="34" y1="94" x2="346" y2="94" stroke="var(--mark)" stroke-width="2" stroke-dasharray="6 4"/>
    <path d="${(() => { let d = ''; for (let k = 0; k <= 40; k++) { const x = 34 + k * 5.0, xv = (x - 190) / 26;
      const yv = 1 + 1 / (xv - 2); const y = 120 - yv * 26; if (y > 26 && y < 214) d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' '; } return d.trim(); })()}"
      fill="none" stroke="var(--accent)" stroke-width="2.8"/>
    <path d="${(() => { let d = ''; for (let k = 0; k <= 40; k++) { const x = 250 + k * 2.4, xv = (x - 190) / 26;
      const yv = 1 + 1 / (xv - 2); const y = 120 - yv * 26; if (y > 26 && y < 214) d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' '; } return d.trim(); })()}"
      fill="none" stroke="var(--accent)" stroke-width="2.8"/>
    <text x="250" y="42" class="f-lab3" text-anchor="start">x = 2</text>
    <text x="42" y="86" class="f-lab3" text-anchor="start">y = 1</text>
    <text x="190" y="236" class="f-cap">one input is forbidden; the far ends settle on one output</text>`),

  logLadder: () => S('0 0 420 168', `
    <title>The same fact, written two ways</title>
    <rect x="22" y="40" width="172" height="74" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="108" y="34" class="f-lab3">exponential form</text>
    <text x="108" y="86" style="font:700 22px var(--disp);fill:var(--ink)" text-anchor="middle">2⁵ = 32</text>
    <rect x="228" y="40" width="172" height="74" rx="10" fill="var(--mark-soft)" stroke="var(--mark)" stroke-width="1.8"/>
    <text x="314" y="34" class="f-lab3">logarithmic form</text>
    <text x="314" y="86" style="font:700 20px var(--disp);fill:var(--ink)" text-anchor="middle">log₂ 32 = 5</text>
    ${ARR(198, 66, 224, 66)}${ARR(224, 92, 198, 92)}
    <text x="108" y="140" class="f-lab3">base 2, exponent 5</text>
    <text x="314" y="140" class="f-lab3">base 2, answer 5</text>
    <text x="210" y="162" class="f-cap">a logarithm asks for the exponent</text>`),

  unitCircleValues: () => S('0 0 360 352', `
    <title>The angles worth memorising, in both units</title>
    <circle cx="180" cy="160" r="112" fill="none" stroke="var(--rule)" stroke-width="2"/>
    <line x1="52" y1="160" x2="308" y2="160" class="f-axis"/>
    <line x1="180" y1="32" x2="180" y2="288" class="f-axis"/>
    ${[[0, '0', '0'], [30, '30°', 'π/6'], [45, '45°', 'π/4'], [60, '60°', 'π/3'], [90, '90°', 'π/2'],
       [180, '180°', 'π'], [270, '270°', '3π/2']].map(([deg, d, r]) => {
      const a = deg * Math.PI / 180, x = 180 + 112 * Math.cos(a), y = 160 - 112 * Math.sin(a);
      const lx = 180 + 140 * Math.cos(a), ly = 160 - 140 * Math.sin(a);
      return `<line x1="180" y1="160" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--rule-2)" stroke-width="1.5"/>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.4" fill="var(--accent)"/>
        <text x="${lx.toFixed(1)}" y="${(ly - 3).toFixed(1)}" class="f-lab3">${d}</text>
        <text x="${lx.toFixed(1)}" y="${(ly + 11).toFixed(1)}" style="font:700 10.5px var(--disp);fill:var(--mark)" text-anchor="middle">${r}</text>`;
    }).join('')}
    <circle cx="180" cy="160" r="4" class="f-hub"/>
    <text x="180" y="342" class="f-cap">degrees outside, radians below</text>`),

  sineCosineGraphs: () => S('0 0 440 218', `
    <title>Sine and cosine over one full turn</title>
    <line x1="40" y1="110" x2="412" y2="110" class="f-axis"/>
    <line x1="40" y1="34" x2="40" y2="186" class="f-axis"/>
    <path d="${(() => { let d = ''; for (let k = 0; k <= 72; k++) { const t = k / 72 * 2 * Math.PI;
      d += (k ? 'L' : 'M') + (40 + k * 5.1).toFixed(1) + ' ' + (110 - 62 * Math.sin(t)).toFixed(1) + ' '; } return d.trim(); })()}"
      fill="none" stroke="var(--accent)" stroke-width="3"/>
    <path d="${(() => { let d = ''; for (let k = 0; k <= 72; k++) { const t = k / 72 * 2 * Math.PI;
      d += (k ? 'L' : 'M') + (40 + k * 5.1).toFixed(1) + ' ' + (110 - 62 * Math.cos(t)).toFixed(1) + ' '; } return d.trim(); })()}"
      fill="none" stroke="var(--mark)" stroke-width="3" stroke-dasharray="7 5"/>
    <line x1="34" y1="48" x2="412" y2="48" stroke="var(--rule)" stroke-width="1.2"/>
    <line x1="34" y1="172" x2="412" y2="172" stroke="var(--rule)" stroke-width="1.2"/>
    <text x="30" y="52" class="f-lab3" text-anchor="end">1</text>
    <text x="30" y="176" class="f-lab3" text-anchor="end">−1</text>
    ${[[0, '0'], [18, 'π/2'], [36, 'π'], [54, '3π/2'], [72, '2π']].map(([k, t]) =>
      `<line x1="${40 + k * 5.1}" y1="106" x2="${40 + k * 5.1}" y2="114" class="f-tick"/>
       <text x="${40 + k * 5.1}" y="130" class="f-lab3">${t}</text>`).join('')}
    <text x="126" y="34" style="font:700 11px var(--sans);fill:var(--accent)" text-anchor="middle">sin</text>
    <text x="60" y="34" style="font:700 11px var(--sans);fill:var(--mark)" text-anchor="middle">cos</text>
    <text x="226" y="206" class="f-cap">same wave, same height, shifted a quarter turn apart</text>`),

  normalCurve68: () => S('0 0 440 214', `
    <title>How much of a normal population sits within one, two and three deviations</title>
    <path d="${(() => { let d = 'M42 166 '; for (let k = 0; k <= 70; k++) { const t = -3.5 + k / 10;
      d += 'L' + (218 + t * 50.3).toFixed(1) + ' ' + (166 - 114 * Math.exp(-t * t / 2)).toFixed(1) + ' '; } return d + 'Z'; })()}"
      fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.6"/>
    <line x1="30" y1="166" x2="410" y2="166" class="f-axis"/>
    ${[-3, -2, -1, 0, 1, 2, 3].map(t => `<line x1="${218 + t * 50.3}" y1="166" x2="${218 + t * 50.3}" y2="${166 - 114 * Math.exp(-t * t / 2)}" stroke="var(--rule)" stroke-width="1.3"/>
      <text x="${218 + t * 50.3}" y="184" class="f-lab3">${t > 0 ? '+' + t : t}</text>`).join('')}
    ${[['68%', 0, 52], ['95%', 0, 30], ['99.7%', 0, 8]].map(([lab, , y], i) => {
      const w = (i + 1) * 50.3;
      return `<line x1="${218 - w}" y1="${y + 118}" x2="${218 + w}" y2="${y + 118}" class="f-dim"/>
        <text x="${218 + w + 8}" y="${y + 122}" class="f-lab3" text-anchor="start">${lab}</text>`;
    }).join('')}
    <text x="218" y="204" class="f-cap">standard deviations from the mean</text>`),

  /* ---- Precalculus discovery illustrations ---- */

  discInvtrig: () => S('0 0 400 268', `
    <rect width="400" height="268" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one height, and the wave keeps returning to it</text>
    <line x1="30" y1="150" x2="378" y2="150" class="f-axis"/>
    <path d="${(() => { let d=''; for (let i=0;i<=84;i++){ const t=i/84*4*Math.PI;
      d += (i?'L':'M') + (30 + i*4.14).toFixed(1) + ' ' + (150 - 62*Math.sin(t)).toFixed(1) + ' '; } return d.trim(); })()}"
      fill="none" stroke="var(--accent)" stroke-width="3"/>
    <line x1="30" y1="119" x2="378" y2="119" stroke="var(--mark)" stroke-width="2.2" stroke-dasharray="6 4"/>
    <text x="24" y="115" class="f-lab3" text-anchor="end">0.5</text>
    ${[Math.PI/6, 5*Math.PI/6, 13*Math.PI/6, 17*Math.PI/6].map(t =>
      `<circle cx="${(30 + t/(4*Math.PI)*348).toFixed(1)}" cy="119" r="5.5" fill="var(--mark)"/>`).join('')}
    <rect x="30" y="72" width="43.5" height="156" fill="var(--accent-soft)" opacity=".55"/>
    <text x="52" y="248" class="f-lab3">only here</text>
    <text x="200" y="196" class="f-lab2">which one should arcsin return?</text>
    <text x="200" y="224" class="f-cap">so the domain is cut down until exactly one answer is left</text>`),

  discTrigadv: () => S('0 0 400 262', `
    <defs>${LGRAD('dtaW', '#bfe0ef', '#6fb3d6', true)}</defs>
    <rect width="400" height="262" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">how wide is the lake?</text>
    <path d="M84 132 Q140 98 208 112 Q288 128 316 176 Q270 214 186 206 Q104 196 84 132 Z"
      fill="url(#dtaW)" stroke="#4f86aa" stroke-width="2"/>
    ${PERSON(70, 108, 1.5)}${PERSON(338, 176, 1.5)}
    <circle cx="200" cy="58" r="6" fill="var(--mark)"/>
    <text x="200" y="46" class="f-lab3">far tree</text>
    <line x1="70" y1="104" x2="338" y2="172" stroke="var(--ink)" stroke-width="2.4"/>
    <line x1="70" y1="104" x2="200" y2="58" stroke="var(--mark)" stroke-width="2" stroke-dasharray="5 4"/>
    <line x1="338" y1="172" x2="200" y2="58" stroke="var(--mark)" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="196" y="150" class="f-lab2">180 m, measured</text>
    <text x="104" y="86" class="f-lab3">62°</text>
    <text x="300" y="148" class="f-lab3">41°</text>
    <text x="200" y="240" class="f-cap">no right angle anywhere — SOH-CAH-TOA has nothing to grip</text>`),

  discPolar: () => S('0 0 400 274', `
    <rect width="400" height="274" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">same place, two sets of directions</text>
    ${GRID(24, 44, 152, 160, 32)}
    <line x1="24" y1="204" x2="180" y2="204" class="f-axis"/>
    <line x1="24" y1="40" x2="24" y2="208" class="f-axis"/>
    <line x1="24" y1="204" x2="120" y2="204" stroke="var(--accent)" stroke-width="3"/>
    <line x1="120" y1="204" x2="120" y2="140" stroke="var(--accent)" stroke-width="3"/>
    <circle cx="120" cy="140" r="6" fill="var(--accent)"/>
    <text x="100" y="230" class="f-lab3">3 across</text>
    <text x="132" y="172" class="f-lab3" text-anchor="start">2 up</text>
    <circle cx="300" cy="150" r="76" fill="none" stroke="var(--rule)" stroke-width="1.5"/>
    <circle cx="300" cy="150" r="46" fill="none" stroke="var(--rule)" stroke-width="1.5"/>
    <line x1="300" y1="150" x2="380" y2="150" class="f-axis"/>
    <line x1="300" y1="150" x2="363" y2="107" stroke="var(--mark)" stroke-width="3"/>
    <circle cx="363" cy="107" r="6" fill="var(--mark)"/>
    ${ARC(300, 150, 30, 0, 34, 'f-angarc')}
    <text x="336" y="146" class="f-lab3">34°</text>
    <text x="318" y="118" class="f-lab3" text-anchor="start">3.6</text>
    <text x="102" y="258" class="f-lab">street address</text>
    <text x="300" y="258" class="f-lab">radar address</text>`),

  discVectors: () => S('0 0 400 268', `
    <rect width="400" height="268" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">pointed due north, and not going there</text>
    ${ARR(120, 228, 120, 86, 'f-arrow')}
    <text x="108" y="150" class="f-lab2" text-anchor="end">300</text>
    <text x="108" y="168" class="f-lab3" text-anchor="end">nose</text>
    ${ARR(120, 86, 232, 86, 'f-arrow')}
    <text x="176" y="74" class="f-lab2">50 wind</text>
    <line x1="120" y1="228" x2="232" y2="86" stroke="var(--mark)" stroke-width="3.6"/>
    <path d="M232 86 L221 96 L226 100 Z" fill="var(--mark)"/>
    <text x="196" y="176" class="f-lab2" text-anchor="start">actual path</text>
    <text x="200" y="234" class="f-lab">a heading and a speed, added — but not like numbers</text>
    <text x="200" y="256" class="f-cap">300 plus 50 is not 350 when they point different ways</text>`),

  discMatrices: () => S('0 0 400 256', `
    <rect width="400" height="256" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the letters were never doing any work</text>
    <rect x="20" y="46" width="168" height="126" rx="9" fill="var(--paper)" stroke="var(--rule)" stroke-width="1.6"/>
    ${[['2x + 3y −  z =  7',78],['x −  y + 2z =  4',108],['3x + 2y +  z = 13',138]].map(([t,y])=>
      `<text x="104" y="${y}" style="font:600 12.5px var(--disp);fill:var(--ink)" text-anchor="middle">${t}</text>`).join('')}
    ${ARR(196, 108, 224, 108)}
    <rect x="232" y="46" width="148" height="126" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    ${[[' 2  3 −1 │  7',78],[' 1 −1  2 │  4',108],[' 3  2  1 │ 13',138]].map(([t,y])=>
      `<text x="306" y="${y}" style="font:600 13px var(--disp);fill:var(--ink)" text-anchor="middle">${t}</text>`).join('')}
    <text x="200" y="202" class="f-lab">every x, y and z is in the same column every time</text>
    <text x="200" y="230" class="f-cap">so drop them, and keep the grid of numbers</text>`),

  discConics: () => S('0 0 400 282', `
    <defs>${LGRAD('dcC', '#e2ecf3', '#a8c6d8', true)}</defs>
    <rect width="400" height="282" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one cone, four different cuts</text>
    <path d="M200 48 L296 206 L104 206 Z" fill="url(#dcC)" stroke="#6f93a8" stroke-width="2"/>
    <ellipse cx="200" cy="206" rx="96" ry="22" fill="#cfdde6" stroke="#6f93a8" stroke-width="2"/>
    ${[['160','horizontal','circle','var(--accent)'],
       ['132','tilted','ellipse','var(--mark)'],
       ['104','steeper','parabola','var(--right)']].map(([y,,lab,col],i)=>{
      const yy=+y, half=(206-yy)*0.607, rot=[0,-11,-21][i];
      return `<g transform="rotate(${rot} 200 ${yy})">
        <line x1="${200-half-14}" y1="${yy}" x2="${200+half+14}" y2="${yy}" stroke="${col}" stroke-width="2.6"/>
        <ellipse cx="200" cy="${yy}" rx="${half}" ry="${(half*0.22).toFixed(1)}" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="3 3"/></g>`;
    }).join('')}
    ${[['circle','var(--accent)',164],['ellipse','var(--mark)',128],['parabola','var(--right)',92]].map(([lab,col,y])=>
      `<text x="330" y="${y}" style="font:700 11px var(--sans);fill:${col}" text-anchor="start">${lab}</text>`).join('')}
    <text x="200" y="252" class="f-lab">tilt the knife and the edge changes shape</text>
    <text x="200" y="272" class="f-cap">cut steeper still and the curve never closes</text>`),

  discParamfn: () => S('0 0 400 262', `
    <rect width="400" height="262" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the path does not say when</text>
    <line x1="34" y1="212" x2="376" y2="212" class="f-axis"/>
    <path d="${(() => { let d=''; for(let i=0;i<=40;i++){ const t=i/40*4, x=40+t*80, y=212-(60*t-15*t*t)*1.9;
      d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)+' '; } return d.trim(); })()}"
      fill="none" stroke="var(--rule)" stroke-width="3" stroke-dasharray="5 4"/>
    ${[0,1,2,3,4].map(t=>{ const x=40+t*80, y=212-(60*t-15*t*t)*1.9;
      return `<circle cx="${x}" cy="${y.toFixed(1)}" r="7" fill="var(--accent)"/>
        <text x="${x}" y="${(y-15).toFixed(1)}" class="f-lab3">t=${t}</text>`; }).join('')}
    <text x="200" y="240" class="f-cap">same curve, but the dots say where it was at each second</text>`),

  discProbadv: () => S('0 0 400 278', `
    <rect width="400" height="278" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the coefficients were counted, not calculated</text>
    ${[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]].map((row,r)=>
      row.map((v,c)=>{ const x=200+(c-(row.length-1)/2)*44, y=56+r*36;
        return `<circle cx="${x}" cy="${y}" r="15" fill="${r===3?'var(--accent-soft)':'var(--paper)'}" stroke="${r===3?'var(--accent)':'var(--rule)'}" stroke-width="1.6"/>
          <text x="${x}" y="${y+5}" class="f-lab2">${v}</text>`; }).join('')).join('')}
    <text x="352" y="164" style="font:700 11px var(--sans);fill:var(--accent)" text-anchor="end">this row</text>
    <text x="200" y="238" style="font:700 14px var(--disp);fill:var(--ink)" text-anchor="middle">(a+b)³ = 1a³ + 3a²b + 3ab² + 1b³</text>
    <text x="200" y="264" class="f-cap">each number counts the ways of choosing — nothing else</text>`),

  discLimits: () => S('0 0 400 272', `
    <rect width="400" height="272" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the one point the formula refuses to give</text>
    ${GRID(44, 48, 300, 160, 30)}
    <line x1="44" y1="208" x2="352" y2="208" class="f-axis"/>
    <line x1="74" y1="44" x2="74" y2="214" class="f-axis"/>
    <line x1="44" y1="196" x2="352" y2="76" fill="none" stroke="var(--accent)" stroke-width="3"/>
    <circle cx="164" cy="149" r="7" fill="var(--paper)" stroke="var(--accent)" stroke-width="3"/>
    <line x1="164" y1="149" x2="164" y2="208" stroke="var(--rule)" stroke-width="1.4" stroke-dasharray="4 3"/>
    <line x1="74" y1="149" x2="164" y2="149" stroke="var(--rule)" stroke-width="1.4" stroke-dasharray="4 3"/>
    <text x="164" y="226" class="f-lab3">1</text>
    <text x="66" y="153" class="f-lab3" text-anchor="end">2</text>
    <text x="250" y="110" class="f-lab2" text-anchor="start">y = (x²−1)/(x−1)</text>
    ${ARR(126, 176, 156, 156)}${ARR(206, 122, 176, 142)}
    <text x="200" y="250" class="f-cap">at x = 1 it divides by zero — yet both sides head straight for 2</text>`),

  discDerivintro: () => S('0 0 400 278', `
    <rect width="400" height="278" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">average speed, over shorter and shorter trips</text>
    <line x1="40" y1="218" x2="374" y2="218" class="f-axis"/>
    <line x1="40" y1="44" x2="40" y2="222" class="f-axis"/>
    <path d="${(() => { let d=''; for(let i=0;i<=50;i++){ const t=i/50*4.4, x=40+t*72, y=218-t*t*9.2;
      if(y>44) d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)+' '; } return d.trim(); })()}"
      fill="none" stroke="var(--accent)" stroke-width="3.2"/>
    ${[[3.6,'var(--rule)'],[2.6,'var(--ink3)'],[1.8,'var(--mark)']].map(([t2,col])=>{
      const x1=40+1.2*72, y1=218-1.44*9.2, x2=40+t2*72, y2=218-t2*t2*9.2;
      const m=(y2-y1)/(x2-x1);
      return `<line x1="${(x1-30).toFixed(1)}" y1="${(y1-30*m).toFixed(1)}" x2="${(x2+16).toFixed(1)}" y2="${(y2+16*m).toFixed(1)}" stroke="${col}" stroke-width="2"/>
        <circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="4.6" fill="${col}"/>`; }).join('')}
    <circle cx="126.4" cy="204.8" r="6.5" fill="var(--accent)"/>
    <text x="200" y="250" class="f-cap">bring the second point closer and the slope settles on one number</text>`),

  discAreaintro: () => S('0 0 400 276', `
    <rect width="400" height="276" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a speed graph, and the distance hiding under it</text>
    <line x1="42" y1="208" x2="372" y2="208" class="f-axis"/>
    <line x1="42" y1="46" x2="42" y2="212" class="f-axis"/>
    ${[...Array(11)].map((_,i)=>{ const x=42+i*28, t=i/10*3, h=(18+26*t-4.4*t*t)*2.1;
      return `<rect x="${x}" y="${(208-h).toFixed(1)}" width="27" height="${h.toFixed(1)}" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.1"/>`; }).join('')}
    <path d="${(() => { let d=''; for(let i=0;i<=60;i++){ const t=i/60*3.3, x=42+t*93.3, h=(18+26*t-4.4*t*t)*2.1;
      d+=(i?'L':'M')+x.toFixed(1)+' '+(208-h).toFixed(1)+' '; } return d.trim(); })()}"
      fill="none" stroke="var(--mark)" stroke-width="3.2"/>
    <text x="24" y="120" class="f-lab3" text-anchor="middle" transform="rotate(-90 24 120)">speed</text>
    <text x="207" y="228" class="f-lab3">time</text>
    <text x="200" y="256" class="f-cap">each strip is speed × time, which is a distance — add them up</text>`),

  invtrigRange: () => S('0 0 440 186', `
    <title>What each inverse function is allowed to return</title>
    <text x="220" y="18" class="f-cap">each inverse hands back exactly one angle, from a fixed stretch of the circle</text>
    ${[['arcsin','−90° to 90°','var(--accent)',-90,90],
       ['arccos','0° to 180°','var(--mark)',0,180],
       ['arctan','−90° to 90°','var(--right)',-90,90]].map(([n,r,col,a0,a1],i)=>{
      const cx=90+i*140, cy=100;
      return `<circle cx="${cx}" cy="${cy}" r="42" fill="none" stroke="var(--rule)" stroke-width="1.6"/>
        ${ARC(cx,cy,42,a0,a1,'')}
        <path d="M${(cx+42*Math.cos(a0*Math.PI/180)).toFixed(1)} ${(cy-42*Math.sin(a0*Math.PI/180)).toFixed(1)}
          A 42 42 0 ${Math.abs(a1-a0)>180?1:0} 0 ${(cx+42*Math.cos(a1*Math.PI/180)).toFixed(1)} ${(cy-42*Math.sin(a1*Math.PI/180)).toFixed(1)}"
          fill="none" stroke="${col}" stroke-width="5"/>
        <line x1="${cx-48}" y1="${cy}" x2="${cx+48}" y2="${cy}" class="f-axis"/>
        <text x="${cx}" y="${cy+62}" style="font:700 12px var(--sans);fill:${col}" text-anchor="middle">${n}</text>
        <text x="${cx}" y="${cy+78}" class="f-lab3">${r}</text>`; }).join('')}`),

  obliqueTriangle: () => S('0 0 420 236', `
    <title>Labelling an oblique triangle: side a faces angle A</title>
    <path d="M60 170 L300 170 L216 52 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.2"/>
    ${[[60,170,'A'],[300,170,'B'],[216,52,'C']].map(([x,y,l])=>
      `<circle cx="${x}" cy="${y}" r="4.6" fill="var(--accent)"/>
       <text x="${x+(l==='A'?-14:l==='B'?14:0)}" y="${y+(l==='C'?-12:20)}" class="f-lab2">${l}</text>`).join('')}
    <text x="180" y="188" class="f-lab">c</text>
    <text x="268" y="106" class="f-lab" text-anchor="start">a</text>
    <text x="126" y="102" class="f-lab" text-anchor="end">b</text>
    <text x="360" y="86" style="font:700 12px var(--disp);fill:var(--ink)" text-anchor="middle">a</text>
    <line x1="336" y1="94" x2="384" y2="94" stroke="var(--ink3)" stroke-width="1.3"/>
    <text x="360" y="112" style="font:600 11px var(--disp);fill:var(--ink)" text-anchor="middle">sin A</text>
    <text x="360" y="132" class="f-lab2">=</text>
    <text x="360" y="152" style="font:700 12px var(--disp);fill:var(--ink)" text-anchor="middle">b</text>
    <line x1="336" y1="160" x2="384" y2="160" stroke="var(--ink3)" stroke-width="1.3"/>
    <text x="360" y="178" style="font:600 11px var(--disp);fill:var(--ink)" text-anchor="middle">sin B</text>
    <text x="210" y="226" class="f-cap">each side sits opposite the angle with the same letter</text>`),

  polarGrid: () => S('0 0 360 280', `
    <title>A polar grid, and a point given by distance and direction</title>
    ${[30,60,90,120].map(r=>`<circle cx="180" cy="140" r="${r}" fill="none" stroke="var(--rule-2)" stroke-width="1.3"/>`).join('')}
    ${[...Array(12)].map((_,k)=>{const a=k*30*Math.PI/180;
      return `<line x1="180" y1="140" x2="${(180+120*Math.cos(a)).toFixed(1)}" y2="${(140-120*Math.sin(a)).toFixed(1)}" stroke="var(--rule-2)" stroke-width="1.1"/>`;}).join('')}
    <line x1="48" y1="140" x2="312" y2="140" class="f-axis"/>
    <line x1="180" y1="14" x2="180" y2="266" class="f-axis"/>
    <line x1="180" y1="140" x2="${(180+90*Math.cos(Math.PI/3)).toFixed(1)}" y2="${(140-90*Math.sin(Math.PI/3)).toFixed(1)}" stroke="var(--mark)" stroke-width="3.4"/>
    <circle cx="${(180+90*Math.cos(Math.PI/3)).toFixed(1)}" cy="${(140-90*Math.sin(Math.PI/3)).toFixed(1)}" r="6" fill="var(--mark)"/>
    ${ARC(180,140,34,0,60,'f-angarc')}
    <text x="222" y="134" class="f-lab3">60°</text>
    <text x="196" y="94" class="f-lab2" text-anchor="start">r = 3</text>
    <text x="248" y="72" class="f-lab" text-anchor="start">(3, 60°)</text>
    <text x="180" y="268" class="f-cap">rings count distance, spokes count direction</text>`),

  vectorOps: () => S('0 0 440 200', `
    <title>Adding vectors head to tail, and reading their components</title>
    <text x="110" y="18" class="f-lab">head to tail</text>
    ${ARR(30, 160, 110, 110)}${ARR(110, 110, 170, 52)}
    <line x1="30" y1="160" x2="170" y2="52" stroke="var(--mark)" stroke-width="3.2"/>
    <path d="M170 52 L158 58 L164 66 Z" fill="var(--mark)"/>
    <text x="62" y="152" class="f-lab3">u</text>
    <text x="148" y="94" class="f-lab3">v</text>
    <text x="96" y="90" style="font:700 11px var(--sans);fill:var(--mark)" text-anchor="middle">u + v</text>
    <text x="330" y="18" class="f-lab">components</text>
    ${GRID(250, 34, 160, 126, 32)}
    <line x1="250" y1="160" x2="414" y2="160" class="f-axis"/>
    <line x1="250" y1="30" x2="250" y2="164" class="f-axis"/>
    ${ARR(250, 160, 378, 64, 'f-arrow')}
    <line x1="250" y1="160" x2="378" y2="160" class="f-dim"/>
    <line x1="378" y1="160" x2="378" y2="64" class="f-dim"/>
    <text x="314" y="178" class="f-lab3">4 across</text>
    <text x="386" y="116" class="f-lab3" text-anchor="start">3 up</text>
    <text x="300" y="98" class="f-lab2">length 5</text>
    <text x="220" y="194" class="f-cap">two ways to hold the same arrow</text>`),

  matrixOps: () => S('0 0 420 180', `
    <title>When two matrices can be multiplied, and the size of the result</title>
    <text x="210" y="20" class="f-cap">the inside numbers must match; the outside ones give the size</text>
    <rect x="52" y="44" width="92" height="76" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="98" y="88" style="font:700 15px var(--disp);fill:var(--ink)" text-anchor="middle">2 × 3</text>
    <text x="98" y="136" class="f-lab3">first</text>
    <text x="168" y="88" class="f-lab2">·</text>
    <rect x="192" y="44" width="92" height="76" rx="6" fill="var(--mark-soft)" stroke="var(--mark)" stroke-width="1.8"/>
    <text x="238" y="88" style="font:700 15px var(--disp);fill:var(--ink)" text-anchor="middle">3 × 4</text>
    <text x="238" y="136" class="f-lab3">second</text>
    <text x="308" y="88" class="f-lab2">=</text>
    <rect x="328" y="44" width="80" height="76" rx="6" fill="var(--right-soft)" stroke="var(--right)" stroke-width="1.8"/>
    <text x="368" y="88" style="font:700 15px var(--disp);fill:var(--ink)" text-anchor="middle">2 × 4</text>
    <path d="M132 130 Q170 156 204 130" fill="none" stroke="var(--ink3)" stroke-width="1.6" stroke-dasharray="4 3"/>
    <text x="168" y="156" class="f-lab3">these must agree</text>
    <path d="M68 38 Q210 8 340 38" fill="none" stroke="var(--right)" stroke-width="1.6" stroke-dasharray="4 3"/>`),

  conicFamily: () => S('0 0 440 214', `
    <title>The four conic sections and the equation each one has</title>
    ${[['circle','x² + y² = r²','var(--accent)'],['ellipse','x²/a² + y²/b² = 1','var(--mark)'],
       ['parabola','y = ax² + bx + c','var(--right)'],['hyperbola','x²/a² − y²/b² = 1','#8a5fb0']].map(([n,eq,col],i)=>{
      const x=22+i*106, cy=92;
      let shape='';
      if(i===0) shape=`<circle cx="${x+46}" cy="${cy}" r="34" fill="none" stroke="${col}" stroke-width="2.8"/>`;
      if(i===1) shape=`<ellipse cx="${x+46}" cy="${cy}" rx="42" ry="26" fill="none" stroke="${col}" stroke-width="2.8"/>`;
      if(i===2) shape=`<path d="M${x+10} ${cy-34} Q${x+46} ${cy+52} ${x+82} ${cy-34}" fill="none" stroke="${col}" stroke-width="2.8"/>`;
      if(i===3) shape=`<path d="M${x+12} ${cy-36} Q${x+46} ${cy} ${x+12} ${cy+36}" fill="none" stroke="${col}" stroke-width="2.8"/>
                       <path d="M${x+80} ${cy-36} Q${x+46} ${cy} ${x+80} ${cy+36}" fill="none" stroke="${col}" stroke-width="2.8"/>`;
      return `<rect x="${x}" y="${cy-48}" width="92" height="96" rx="8" fill="var(--paper-2)" stroke="var(--rule)" stroke-width="1.3"/>
        ${shape}
        <text x="${x+46}" y="${cy+66}" style="font:700 11.5px var(--sans);fill:${col}" text-anchor="middle">${n}</text>
        <text x="${x+46}" y="${cy+84}" style="font:600 9.5px var(--disp);fill:var(--ink2)" text-anchor="middle">${eq}</text>`;
    }).join('')}
    <text x="220" y="22" class="f-cap">tell them apart by the signs: same sign is closed, opposite signs open out</text>`),

  paramCircle: () => S('0 0 400 220', `
    <title>A circle traced by a parameter</title>
    <circle cx="112" cy="116" r="66" fill="none" stroke="var(--rule)" stroke-width="2"/>
    ${[0,45,90,135,180,225,270,315].map(d=>{const a=d*Math.PI/180;
      return `<circle cx="${(112+66*Math.cos(a)).toFixed(1)}" cy="${(116-66*Math.sin(a)).toFixed(1)}" r="4.4" fill="var(--accent)"/>`;}).join('')}
    <line x1="112" y1="116" x2="${(112+66*Math.cos(Math.PI/4)).toFixed(1)}" y2="${(116-66*Math.sin(Math.PI/4)).toFixed(1)}" stroke="var(--mark)" stroke-width="2.6"/>
    <text x="172" y="66" class="f-lab3" text-anchor="start">t</text>
    <text x="112" y="204" class="f-lab3">one parameter, two coordinates</text>
    <text x="290" y="90" style="font:700 15px var(--disp);fill:var(--ink)" text-anchor="middle">x = r cos t</text>
    <text x="290" y="120" style="font:700 15px var(--disp);fill:var(--ink)" text-anchor="middle">y = r sin t</text>
    <text x="290" y="152" class="f-lab3">t runs from 0 to 2π</text>
    <text x="290" y="180" class="f-lab3">no y = f(x) can do this</text>`),

  pascalBinomial: () => S('0 0 400 176', `
    <title>Where the binomial coefficients come from</title>
    <text x="200" y="20" class="f-cap">the coefficient counts choices: how many of the n factors gave a b</text>
    <text x="200" y="62" style="font:700 17px var(--disp);fill:var(--ink)" text-anchor="middle">(a + b)⁴</text>
    <text x="200" y="100" style="font:700 15px var(--disp);fill:var(--ink)" text-anchor="middle">a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴</text>
    ${[[80,'1'],[140,'4'],[200,'6'],[260,'4'],[320,'1']].map(([x,v],i)=>
      `<circle cx="${x}" cy="132" r="15" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>
       <text x="${x}" y="137" class="f-lab2">${v}</text>
       <text x="${x}" y="164" class="f-lab3">C(4,${i})</text>`).join('')}`),

  limitTable: () => S('0 0 420 190', `
    <title>Closing in on a value from both sides</title>
    <text x="210" y="20" class="f-cap">the function is undefined at 1, and both columns still agree</text>
    ${[['0.9','1.9'],['0.99','1.99'],['0.999','1.999'],['1','undefined'],['1.001','2.001'],['1.01','2.01'],['1.1','2.1']].map(([x,y],i)=>{
      const yy=48+i*20, mid=(x==='1');
      return `<rect x="96" y="${yy-14}" width="228" height="19" fill="${mid?'var(--wrong-soft)':(i%2?'var(--paper-2)':'var(--paper)')}" stroke="var(--rule-2)" stroke-width="1"/>
        <text x="152" y="${yy}" style="font:600 11.5px var(--disp);fill:${mid?'var(--wrong)':'var(--ink)'}" text-anchor="middle">${x}</text>
        <text x="268" y="${yy}" style="font:600 11.5px var(--disp);fill:${mid?'var(--wrong)':'var(--ink)'}" text-anchor="middle">${y}</text>`;
    }).join('')}
    <text x="152" y="${34}" style="font:700 10px var(--sans);fill:var(--ink3)" text-anchor="middle">x</text>
    <text x="268" y="${34}" style="font:700 10px var(--sans);fill:var(--ink3)" text-anchor="middle">f(x)</text>
    <text x="344" y="118" style="font:700 11px var(--sans);fill:var(--accent)" text-anchor="start">→ 2</text>`),

  tangentSlope: () => S('0 0 400 220', `
    <title>The tangent line, and the slope it carries</title>
    <line x1="34" y1="182" x2="366" y2="182" class="f-axis"/>
    <line x1="34" y1="26" x2="34" y2="186" class="f-axis"/>
    <path d="${(() => { let d=''; for(let i=0;i<=50;i++){ const t=i/50*4.6, x=34+t*70, y=182-t*t*7.4;
      if(y>26) d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)+' '; } return d.trim(); })()}"
      fill="none" stroke="var(--accent)" stroke-width="3"/>
    <line x1="132" y1="196" x2="306" y2="46" stroke="var(--mark)" stroke-width="2.6"/>
    <circle cx="208" cy="130" r="6" fill="var(--mark)"/>
    <line x1="208" y1="130" x2="264" y2="130" class="f-dim"/>
    <line x1="264" y1="130" x2="264" y2="82" class="f-dim"/>
    <text x="236" y="146" class="f-lab3">run</text>
    <text x="272" y="110" class="f-lab3" text-anchor="start">rise</text>
    <text x="300" y="168" class="f-lab2" text-anchor="end">slope here = the rate right now</text>
    <text x="200" y="210" class="f-cap">one line touching at one point</text>`),

  riemannSum: () => S('0 0 440 218', `
    <title>Thinner strips, closer to the true area</title>
    ${[[20,4],[170,8],[320,16]].map(([x0,n],k)=>{
      const W=100, H=110, base=164;
      let bars='';
      for(let i=0;i<n;i++){ const w=W/n, t=(i+0.5)/n, h=(0.35+0.85*t-0.42*t*t)*H;
        bars+=`<rect x="${(x0+i*w).toFixed(1)}" y="${(base-h).toFixed(1)}" width="${(w-0.6).toFixed(1)}" height="${h.toFixed(1)}" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="0.9"/>`; }
      let curve='';
      for(let i=0;i<=40;i++){ const t=i/40, h=(0.35+0.85*t-0.42*t*t)*H;
        curve+=(i?'L':'M')+(x0+t*W).toFixed(1)+' '+(base-h).toFixed(1)+' '; }
      return bars+`<path d="${curve.trim()}" fill="none" stroke="var(--mark)" stroke-width="2.4"/>
        <line x1="${x0}" y1="${base}" x2="${x0+W}" y2="${base}" class="f-axis"/>
        <text x="${x0+W/2}" y="${base+22}" class="f-lab3">${n} strips</text>`;
    }).join('')}
    <text x="220" y="212" class="f-cap">the gaps shrink faster than the strips do</text>`),

  /* ---- Grade 6 discovery illustrations ---- */

  discDecimalops: () => S('0 0 400 262', `
    <defs>${GRAD('ddoP', '#fff6e3', '#f2dcae', '#d9bd7e')}</defs>
    <rect width="400" height="262" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one bill, five friends</text>
    <rect x="132" y="44" width="136" height="88" rx="6" fill="#fffdf6" stroke="#d6c9a8" stroke-width="1.8"/>
    <text x="200" y="70" class="f-lab3">TOTAL</text>
    <text x="200" y="104" style="font:700 26px var(--disp);fill:var(--ink)" text-anchor="middle">$47.85</text>
    ${[0,1,2,3,4].map(i=>PERSON(62+i*70, 176, 1.7)).join('')}
    ${[0,1,2,3,4].map(i=>`<text x="${62+i*70}" y="212" class="f-lab3">?</text>`).join('')}
    <text x="200" y="240" class="f-cap">the answer is not a whole number of dollars — and that is fine</text>`),

  discFracdiv: () => S('0 0 400 254', `
    <defs>${LGRAD('dfdM', '#e8f0f6', '#bcd4e6', true)}</defs>
    <rect width="400" height="254" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">how many quarter-cup scoops fill three cups?</text>
    ${[0,1,2].map(c=>`
      <path d="M${58+c*112} 62 L${138+c*112} 62 L${130+c*112} 150 L${66+c*112} 150 Z" fill="url(#dfdM)" stroke="#6f93a8" stroke-width="2"/>
      ${[0,1,2,3].map(k=>`<line x1="${60+c*112+k*0.9}" y1="${84+k*22}" x2="${136+c*112-k*0.9}" y2="${84+k*22}" stroke="#8fb0c4" stroke-width="1.4" stroke-dasharray="4 3"/>`).join('')}
      <text x="${98+c*112}" y="172" class="f-lab3">1 cup</text>`).join('')}
    <text x="200" y="208" class="f-lab2">dividing by a quarter gave a bigger number</text>
    <text x="200" y="234" class="f-cap">twelve — because each cup holds four of them</text>`),

  discIntegers6: () => S('0 0 400 266', `
    <defs>${LGRAD('diT', '#f3b7ac', '#b5d8ea', true)}</defs>
    <rect width="400" height="266" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">which morning was colder?</text>
    <rect x="176" y="46" width="26" height="172" rx="13" fill="#e9eef1" stroke="#9aa8b0" stroke-width="2"/>
    <rect x="180" y="106" width="18" height="108" rx="9" fill="url(#diT)"/>
    <circle cx="189" cy="222" r="17" fill="#d4655a" stroke="#9aa8b0" stroke-width="2"/>
    ${[[62,'10'],[92,'5'],[122,'0'],[152,'−5'],[182,'−10']].map(([y,l])=>
      `<line x1="166" y1="${y}" x2="176" y2="${y}" stroke="#7d8b93" stroke-width="1.6"/>
       <text x="160" y="${+y+4}" class="f-lab3" text-anchor="end">${l}</text>`).join('')}
    <circle cx="189" cy="152" r="6" fill="var(--accent)"/>
    <text x="220" y="156" class="f-lab2" text-anchor="start">Monday −5°</text>
    <circle cx="189" cy="134" r="6" fill="var(--mark)"/>
    <text x="220" y="130" class="f-lab2" text-anchor="start">Tuesday −2°</text>
    <text x="200" y="248" class="f-cap">−5 is further down, so it is the smaller number</text>`),

  discCoordplane: () => S('0 0 400 282', `
    <rect width="400" height="282" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">four blocks east, three blocks south</text>
    ${GRID(40, 44, 320, 192, 32)}
    <line x1="40" y1="140" x2="360" y2="140" class="f-axis"/>
    <line x1="200" y1="44" x2="200" y2="236" class="f-axis"/>
    <circle cx="200" cy="140" r="5" class="f-hub"/>
    <text x="212" y="134" class="f-lab3" text-anchor="start">town hall</text>
    <line x1="200" y1="140" x2="328" y2="140" stroke="var(--accent)" stroke-width="3"/>
    <line x1="328" y1="140" x2="328" y2="236" stroke="var(--accent)" stroke-width="3"/>
    <circle cx="328" cy="236" r="7" fill="var(--accent)"/>
    <text x="336" y="252" class="f-lab2" text-anchor="end">(4, −3)</text>
    <line x1="200" y1="140" x2="104" y2="140" stroke="var(--mark)" stroke-width="3"/>
    <line x1="104" y1="140" x2="104" y2="76" stroke="var(--mark)" stroke-width="3"/>
    <circle cx="104" cy="76" r="7" fill="var(--mark)"/>
    <text x="96" y="68" class="f-lab2" text-anchor="end">(−3, 2)</text>
    <text x="200" y="270" class="f-cap">the minus is a direction, not a smaller distance</text>`),

  discRatios6: () => S('0 0 400 258', `
    <defs>${GRAD('drB', '#8fc4e8', '#4f8fc4', '#2f6a99')}${GRAD('drY', '#ffe9a8', '#f4cd5c', '#d4a72c')}</defs>
    <rect width="400" height="258" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">two blue, three yellow — the same green every time</text>
    ${[[92,2,3],[236,4,6]].map(([cx,b,y])=>`
      ${[...Array(b)].map((_,i)=>`<circle cx="${cx-46+i*26}" cy="76" r="12" fill="url(#drB)"/>`).join('')}
      ${[...Array(y)].map((_,i)=>`<circle cx="${cx-46+i*26}" cy="110" r="12" fill="url(#drY)"/>`).join('')}
      <circle cx="${cx}" cy="172" r="27" fill="#6f9e63" stroke="#4d7a44" stroke-width="2"/>
      <text x="${cx}" y="214" class="f-lab3">${b} : ${y}</text>`).join('')}
    <text x="164" y="176" class="f-lab2">=</text>
    <text x="200" y="240" class="f-cap">double both and nothing about the colour changes</text>`),

  discUnitrates: () => S('0 0 400 262', `
    <defs>${GRAD('durJ', '#f2b7a0', '#d4795a', '#a85436')}</defs>
    <rect width="400" height="262" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">which jar is the better buy?</text>
    ${[[110,54,86,'12 oz','$3.00'],[276,42,110,'18 oz','$4.05']].map(([cx,w,h,oz,pr])=>`
      <rect x="${+cx-(+w)/2}" y="${196-(+h)}" width="${w}" height="${h}" rx="7" fill="url(#durJ)" stroke="#8d4527" stroke-width="2"/>
      <rect x="${+cx-(+w)/2-4}" y="${188-(+h)}" width="${+w+8}" height="12" rx="3" fill="#7a6a52"/>
      <text x="${cx}" y="220" class="f-lab2">${oz}</text>
      <text x="${cx}" y="240" class="f-lab2">${pr}</text>`).join('')}
    <text x="200" y="120" class="f-lab2">?</text>
    <text x="200" y="176" class="f-cap">bigger and dearer — the prices cannot be compared directly</text>`),

  discPercent6: () => S('0 0 400 274', `
    <rect width="400" height="274" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">a hundred squares, sixty-three shaded</text>
    ${[...Array(10)].map((_,r)=>[...Array(10)].map((_,c)=>{
      const n=r*10+c, on=n<63;
      return `<rect x="${110+c*18}" y="${44+r*18}" width="16" height="16" rx="2"
        fill="${on?'var(--accent)':'var(--paper)'}" stroke="var(--rule)" stroke-width="1"/>`;}).join('')).join('')}
    <text x="200" y="246" class="f-lab2">63 out of 100 — which is what "per cent" says</text>
    <text x="200" y="266" class="f-cap">the same grid works for a fraction and a decimal</text>`),

  discExpressions6: () => S('0 0 400 250', `
    <rect width="400" height="250" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one rule, written once</text>
    <rect x="28" y="46" width="164" height="132" rx="9" fill="var(--paper)" stroke="var(--rule)" stroke-width="1.6"/>
    <text x="110" y="70" class="f-lab">the long way</text>
    ${[['3 people: 3 × 5 + 2',96],['7 people: 7 × 5 + 2',120],['12 people: 12 × 5 + 2',144],['40 people: …',166]].map(([t,y])=>
      `<text x="110" y="${y}" class="f-lab3">${t}</text>`).join('')}
    ${ARR(200, 112, 226, 112)}
    <rect x="236" y="70" width="140" height="84" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>
    <text x="306" y="120" style="font:700 22px var(--disp);fill:var(--ink)" text-anchor="middle">5n + 2</text>
    <text x="306" y="142" class="f-lab3">any n at all</text>
    <text x="200" y="224" class="f-cap">the letter stands for the number you have not been told yet</text>`),

  discEquations6: () => S('0 0 400 258', `
    <defs>${GRAD('deqB', '#d8c7a8', '#b49a72', '#8d7752')}</defs>
    <rect width="400" height="258" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">the scale is level, so the two sides weigh the same</text>
    <line x1="60" y1="96" x2="340" y2="96" stroke="#7d8b93" stroke-width="5" stroke-linecap="round"/>
    <path d="M200 96 L200 186 M170 186 L230 186" stroke="#7d8b93" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M78 96 L78 122 M322 96 L322 122" stroke="#9aa8b0" stroke-width="2"/>
    <rect x="44" y="122" width="68" height="46" rx="6" fill="url(#deqB)" stroke="#7a6444" stroke-width="1.8"/>
    <text x="78" y="151" style="font:700 19px var(--disp);fill:#4a3c28" text-anchor="middle">x</text>
    ${[0,1,2,3,4,5,6].map(i=>`<circle cx="${292+(i%4)*16-24}" cy="${132+Math.floor(i/4)*22}" r="9" fill="#b9c3c7" stroke="#7f8b90" stroke-width="1.4"/>`).join('')}
    <text x="78" y="190" class="f-lab3">the bag</text>
    <text x="300" y="190" class="f-lab3">7 kg</text>
    <text x="200" y="232" class="f-cap">take the same amount off both pans and it stays level</text>`),

  discInequal6: () => S('0 0 400 240', `
    <rect width="400" height="240" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">you must be at least 48 inches tall to ride</text>
    ${[[80,40,'40"','no'],[148,46,'46"','no'],[216,48,'48"','yes'],[300,56,'56"','yes']].map(([x,h,lab,ok])=>`
      ${PERSON(+x, 172-(+h)*1.3, 1.3 + (+h)*0.012)}
      <line x1="${+x-26}" y1="176" x2="${+x+26}" y2="176" stroke="var(--rule)" stroke-width="1.6"/>
      <text x="${x}" y="194" class="f-lab3">${lab}</text>
      <text x="${x}" y="212" style="font:700 11px var(--sans);fill:${ok==='yes'?'var(--right)':'var(--wrong)'}" text-anchor="middle">${ok}</text>`).join('')}
    <line x1="52" y1="108" x2="348" y2="108" stroke="var(--mark)" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="356" y="112" class="f-lab3" text-anchor="end">48"</text>
    <text x="200" y="234" class="f-cap">not one height — every height from 48 upwards</text>`),

  discAreatri: () => S('0 0 400 252', `
    <rect width="400" height="252" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">one cut, corner to corner</text>
    <rect x="42" y="56" width="132" height="96" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>
    <line x1="42" y1="152" x2="174" y2="56" stroke="var(--mark)" stroke-width="2.6" stroke-dasharray="6 4"/>
    <text x="108" y="176" class="f-lab3">8 by 6</text>
    ${ARR(192, 104, 218, 104)}
    <path d="M236 152 L368 152 L368 56 Z" fill="var(--mark-soft)" stroke="var(--mark)" stroke-width="2"/>
    <path d="M236 152 L236 56 L368 56 Z" fill="none" stroke="var(--mark)" stroke-width="1.6" stroke-dasharray="5 4"/>
    <text x="302" y="176" class="f-lab3">two of these</text>
    <text x="200" y="212" class="f-lab2">the two halves are identical — just turned around</text>
    <text x="200" y="236" class="f-cap">so a triangle is half of the rectangle around it</text>`),

  discSurfacenets: () => S('0 0 400 268', `
    <defs>${LGRAD('dsnB', '#e6dcc6', '#c9b892', true)}</defs>
    <rect width="400" height="268" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">unfold the box and lay it flat</text>
    <path d="M44 88 L104 88 L104 148 L44 148 Z" fill="url(#dsnB)" stroke="#9a8865" stroke-width="2"/>
    <path d="M44 88 L66 68 L126 68 L104 88 Z" fill="#d8ccae" stroke="#9a8865" stroke-width="2"/>
    <path d="M104 88 L126 68 L126 128 L104 148 Z" fill="#bfae88" stroke="#9a8865" stroke-width="2"/>
    <text x="86" y="176" class="f-lab3">a box</text>
    ${ARR(150, 110, 180, 110)}
    ${[[200,88,52,52],[252,88,40,52],[304,88,52,52],[200,36,52,52],[200,140,52,52],[344,88,40,52]].map(([x,y,w,h])=>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#dsnB)" stroke="#9a8865" stroke-width="1.6"/>`).join('')}
    <text x="292" y="212" class="f-lab3">six flat rectangles</text>
    <text x="200" y="248" class="f-cap">the wrapping paper is the surface area, and now you can measure it</text>`),

  discVolumefrac: () => S('0 0 400 254', `
    <defs>${LGRAD('dvfC', '#cfe0ef', '#9fc0da', true)}</defs>
    <rect width="400" height="254" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">filling a box with half-inch cubes</text>
    <path d="M96 90 L264 90 L306 58 L138 58 Z" fill="#dfe8ef" stroke="#7d93a4" stroke-width="2"/>
    <path d="M96 90 L96 190 L264 190 L264 90 Z" fill="none" stroke="#7d93a4" stroke-width="2"/>
    <path d="M264 90 L306 58 L306 158 L264 190 Z" fill="none" stroke="#7d93a4" stroke-width="2"/>
    ${[...Array(4)].map((_,r)=>[...Array(7)].map((_,c)=>
      `<rect x="${100+c*23}" y="${98+r*23}" width="21" height="21" rx="2" fill="url(#dvfC)" stroke="#6d8ca3" stroke-width="1"/>`).join('')).join('')}
    <text x="200" y="216" class="f-lab2">each little cube is not one cubic inch</text>
    <text x="200" y="240" class="f-cap">so counting them is not the volume — not yet</text>`),

  discStatquestions: () => S('0 0 400 262', `
    <rect width="400" height="262" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">two questions that look alike</text>
    <rect x="26" y="48" width="164" height="150" rx="10" fill="var(--paper)" stroke="var(--rule)" stroke-width="1.6"/>
    <text x="108" y="74" class="f-lab">how tall am I?</text>
    ${PERSON(108, 128, 2.6)}
    <text x="108" y="168" style="font:700 18px var(--disp);fill:var(--ink)" text-anchor="middle">148 cm</text>
    <text x="108" y="188" class="f-lab3">one answer</text>
    <rect x="206" y="48" width="168" height="150" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.8"/>
    <text x="290" y="74" class="f-lab">how tall is a sixth-grader?</text>
    ${[2,5,9,12,9,5,2].map((h,i)=>`<rect x="${224+i*20}" y="${170-h*7}" width="17" height="${h*7}" rx="2" fill="var(--accent)" opacity=".75"/>`).join('')}
    <line x1="220" y1="170" x2="360" y2="170" class="f-axis"/>
    <text x="290" y="190" class="f-lab3">a spread of answers</text>
    <text x="200" y="238" class="f-cap">only the second one needs statistics</text>`),

  discCenterspread: () => S('0 0 400 268', `
    <rect width="400" height="268" rx="18" fill="var(--paper-2)"/>
    <text x="200" y="26" class="f-title">same average, very different classes</text>
    ${[[70,'Class A',[78,80,80,81,82],'var(--accent)'],[172,'Class B',[60,70,80,90,100],'var(--mark)']].map(([y,lab,vals,col])=>`
      <text x="34" y="${+y-14}" class="f-lab" text-anchor="start">${lab}</text>
      <line x1="46" y1="${y}" x2="360" y2="${y}" class="f-nl"/>
      ${[60,70,80,90,100].map(v=>`<line x1="${46+(v-55)*6.5}" y1="${+y-5}" x2="${46+(v-55)*6.5}" y2="${+y+5}" class="f-tick"/>
        <text x="${46+(v-55)*6.5}" y="${+y+22}" class="f-lab3">${v}</text>`).join('')}
      ${vals.map((v,i)=>`<circle cx="${46+(v-55)*6.5}" cy="${+y-16}" r="6.5" fill="${col}" opacity=".85"/>`).join('')}
      <line x1="${46+25*6.5}" y1="${+y-32}" x2="${46+25*6.5}" y2="${+y+8}" stroke="var(--ink3)" stroke-width="1.6" stroke-dasharray="4 3"/>`).join('')}
    <text x="200" y="232" class="f-lab2">both average 80</text>
    <text x="200" y="256" class="f-cap">the centre alone does not describe a class</text>`),

  decimalPlace: () => S('0 0 500 178', `
    <title>Place value carries on past the point</title>
    <text x="250" y="20" class="f-cap">each column is worth a tenth of the one on its left, in both directions</text>
    ${[['hundreds','100',0],['tens','10',1],['ones','1',2],['·','',3],['tenths','0.1',4],['hundredths','0.01',5],['thousandths','0.001',6]].map(([n,v,i])=>{
      const x=24 + i*68, w = n==='·' ? 22 : 62;
      if (n==='·') return `<text x="${x+11}" y="92" style="font:700 30px var(--disp);fill:var(--mark)" text-anchor="middle">.</text>`;
      return `<rect x="${x}" y="46" width="${w}" height="56" rx="5" fill="${i<3?'var(--accent-soft)':'var(--mark-soft)'}" stroke="${i<3?'var(--accent)':'var(--mark)'}" stroke-width="1.5"/>
        <text x="${x+w/2}" y="80" style="font:700 14px var(--disp);fill:var(--ink)" text-anchor="middle">${v}</text>
        <text x="${x+w/2}" y="120" class="f-lab3">${n}</text>`;
    }).join('')}
    ${ARR(214, 150, 150, 150)}${ARR(286, 150, 350, 150)}
    <text x="250" y="154" class="f-lab3">×10 ← → ÷10</text>`),

  integerLine: () => S('0 0 440 164', `
    <title>Opposites, and what absolute value measures</title>
    <line x1="24" y1="84" x2="416" y2="84" class="f-nl"/>
    ${[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(v=>`
      <line x1="${220+v*36}" y1="78" x2="${220+v*36}" y2="90" class="f-tick"/>
      <text x="${220+v*36}" y="108" class="f-lab3">${v}</text>`).join('')}
    <circle cx="112" cy="84" r="7" fill="var(--mark)"/>
    <circle cx="328" cy="84" r="7" fill="var(--accent)"/>
    <path d="M112 68 Q220 22 328 68" fill="none" stroke="var(--ink3)" stroke-width="1.6" stroke-dasharray="5 4"/>
    <text x="220" y="36" class="f-lab3">opposites</text>
    <line x1="112" y1="128" x2="220" y2="128" class="f-dim"/>
    <line x1="220" y1="128" x2="328" y2="128" class="f-dim"/>
    <text x="166" y="146" class="f-lab3">3 steps</text>
    <text x="274" y="146" class="f-lab3">3 steps</text>
    <text x="220" y="146" style="font:700 10px var(--sans);fill:var(--accent)" text-anchor="middle">|−3| = |3| = 3</text>`),

  fractionCubes: () => S('0 0 420 190', `
    <title>How many half-inch cubes fill one cubic inch</title>
    <defs>${LGRAD('fcC', '#cfe0ef', '#9fc0da', true)}</defs>
    <path d="M60 60 L150 60 L180 34 L90 34 Z" fill="#dfe8ef" stroke="#7d93a4" stroke-width="2"/>
    <path d="M60 60 L60 150 L150 150 L150 60 Z" fill="none" stroke="#7d93a4" stroke-width="2"/>
    <path d="M150 60 L180 34 L180 124 L150 150 Z" fill="none" stroke="#7d93a4" stroke-width="2"/>
    <text x="105" y="172" class="f-lab3">1 inch each way</text>
    ${ARR(200, 92, 232, 92)}
    ${[0,1].map(r=>[0,1].map(c=>
      `<rect x="${260+c*44}" y="${50+r*44}" width="41" height="41" rx="3" fill="url(#fcC)" stroke="#6d8ca3" stroke-width="1.4"/>`).join('')).join('')}
    <text x="302" y="126" class="f-lab3">4 on the front face</text>
    <text x="302" y="150" class="f-lab2">and 2 layers deep</text>
    <text x="302" y="172" style="font:700 12px var(--sans);fill:var(--accent)" text-anchor="middle">8 cubes in one cubic inch</text>`)
  };

  window.FIG = { S, TK, ARR, GRID, DOTS };      // shared with figures-geo.js
  window.figure = id => (window.FIGURES[id] ? window.FIGURES[id]() : '');
})();
