/* Inline SVG illustrations. Every figure is legible at rest; motion is an
   indicator moving over content that is already drawn. */
(function () {
  const S = (vb, body, cls) => `<svg viewBox="${vb}" class="fig ${cls || ''}" role="img" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

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
  };

  window.figure = id => (window.FIGURES[id] ? window.FIGURES[id]() : '');
})();
