/* Parameterised problem generators — power the "More like this" button.
   GEN[unitId][skill](rng) -> {q, a, s, hint, unit?, alt?} */
(function () {
  function R(seed) { let s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  function frac(n, d) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1;
    return [n / g, d / g]; }
  function fs(n, d) { const [a, b] = frac(n, d); return b === 1 ? String(a) : a + '/' + b; }
  function tex(n, d) { const [a, b] = frac(n, d);
    if (b === 1) return String(a);
    return (a < 0 ? '-' : '') + '\\dfrac{' + Math.abs(a) + '}{' + b + '}'; }
  const money = v => v.toFixed(2);
  const NAMES = ['Mia', 'Jonah', 'Maya', 'Leo', 'Priya', 'Devon', 'Ana', 'Ben', 'Rosa', 'Kai', 'Nina', 'Omar', 'Ivy', 'Theo'];
  const ITEMS = ['notebooks', 'markers', 'stickers', 'apples', 'batteries', 'candles', 'tiles'];

  window.GEN = {

  rates: {
    unitrate(r) { const per = ri(r, 3, 12) * (r() < .5 ? 1 : 5), n = ri(r, 3, 9), tot = per * n;
      const k = pick(r, [['miles','hours','mph'],['words','minutes','wpm'],['pages','minutes','ppm'],['liters','minutes','L/min']]);
      return { q: `A machine produces $${tot}$ ${k[0]} in $${n}$ ${k[1]}. Find the rate in ${k[0]} per ${k[1].replace(/s$/,'')}.`,
        a: String(per), unit: k[2], hint: `"Per ${k[1].replace(/s$/,'')}" means ${k[0]} divided by ${k[1]}.`,
        s: [`$${tot} \\div ${n} = ${per}$`, `$${per}$ ${k[0]} every ${k[1].replace(/s$/,'')}.`] }; },
    fracrate(r) { const a = ri(r,1,5), b = pick(r,[2,3,4,5,6]), c = ri(r,1,4), d = pick(r,[2,3,4,5]);
      if (a >= b) return this.fracrate(R(ri(r,1,1e9)));
      const [n, dd] = frac(a * d, b * c);
      return { q: `A pump moves $${tex(a,b)}$ of a tank in $${tex(c,d)}$ of an hour. How many tanks per hour?`,
        a: fs(n, dd), hint: `Tanks $\\div$ hours: $${tex(a,b)} \\div ${tex(c,d)}$. Keep, change, flip.`,
        s: [`$${tex(a,b)} \\div ${tex(c,d)} = ${tex(a,b)} \\times ${tex(d,c)}$`, `$= ${tex(a*d, b*c)}$`] }; },
    userate(r) { const rate = ri(r, 6, 24), n = ri(r, 4, 20), tot = rate * n;
      return { q: `A printer runs at $${rate}$ pages per minute. How many minutes to print $${tot}$ pages?`,
        a: String(n), unit: 'min', hint: 'Divide the total pages by the pages per minute.',
        s: [`$${tot} \\div ${rate} = ${n}$ minutes`] }; },
    compare(r) { const c1 = ri(r, 20, 45) / 100, n1 = pick(r, [8, 10, 12, 15]);
      let c2 = c1 + (r() < .5 ? 1 : -1) * pick(r, [2, 3, 4, 5]) / 100; const n2 = n1 + pick(r, [4, 6, 8]);
      const t1 = +(c1 * n1).toFixed(2), t2 = +(c2 * n2).toFixed(2);
      const better = c1 < c2 ? 0 : 1;
      return { q: `A $${n1}$-ounce pack costs $\\$${money(t1)}$. A $${n2}$-ounce pack costs $\\$${money(t2)}$. Which is the better buy?`,
        c: [`The $${n1}$-ounce pack`, `The $${n2}$-ounce pack`], a: better,
        hint: 'Find the price per ounce for each.',
        s: [`$${money(t1)} \\div ${n1} = ${c1.toFixed(2)}$ per ounce`, `$${money(t2)} \\div ${n2} = ${c2.toFixed(2)}$ per ounce`,
            `$${Math.min(c1,c2).toFixed(2)} < ${Math.max(c1,c2).toFixed(2)}$, so the ${better === 0 ? n1 : n2}-ounce pack wins.`] }; },
    avgrate(r) { const d = pick(r, [60, 120, 90, 180]), v1 = pick(r, [20, 30, 45]), v2 = v1 * pick(r, [2, 3]);
      const t = d / v1 + d / v2, avg = (2 * d) / t;
      return { q: `${pick(r, NAMES)} drives $${d}$ miles at $${v1}$ mph, then $${d}$ miles at $${v2}$ mph. Find the average speed for the whole trip.`,
        a: String(+avg.toFixed(2)).replace(/\.00$/, ''), unit: 'mph',
        hint: 'Average speed is total distance divided by total time — never the average of the two speeds.',
        s: [`Time going out: $${d} \\div ${v1} = ${(d/v1)}$ h`, `Time coming back: $${d} \\div ${v2} = ${(d/v2)}$ h`,
            `Total: $${2*d}$ miles in $${t}$ h`, `$${2*d} \\div ${t} = ${+avg.toFixed(2)}$ mph`] }; }
  },

  percents: {
    basicpct(r) { const p = pick(r, [5,10,15,20,25,30,40,60,75]), n = pick(r, [20,40,60,80,120,160,200,240]);
      return { q: `What is $${p}\\%$ of $${n}$?`, a: String(+(p * n / 100).toFixed(2)).replace(/\.00$/, ''),
        hint: `$${p}\\% = ${p / 100}$, and "of" means multiply.`,
        s: [`$${p / 100} \\times ${n} = ${+(p * n / 100).toFixed(2)}$`] }; },
    multiplier(r) { const p = pick(r, [10,15,20,25,30,40]), base = pick(r, [40,60,80,120,150,200,250]);
      const up = r() < .5, m = up ? 1 + p / 100 : 1 - p / 100, res = +(base * m).toFixed(2);
      return { q: `A $\\$${base}$ item ${up ? `has $${p}\\%$ tax added` : `is $${p}\\%$ off`}. Find the ${up ? 'total' : 'sale price'}.`,
        a: String(res), unit: '$', hint: `Multiply by $${m.toFixed(2)}$.`,
        s: [`${up ? `$100\\% + ${p}\\% = ${100+p}\\%$` : `$100\\% - ${p}\\% = ${100-p}\\%$`}`, `$${base} \\times ${m.toFixed(2)} = ${res}$`] }; },
    pctchange(r) { const old = pick(r, [20,25,40,50,60,80,120,200]), pc = pick(r, [10,15,20,25,30,40,50]);
      const up = r() < .5, nw = +(old * (up ? 1 + pc/100 : 1 - pc/100)).toFixed(2);
      return { q: `A value changes from $${old}$ to $${nw}$. Find the percent ${up ? 'increase' : 'decrease'}.`,
        a: String(pc), unit: '%', hint: 'Divide the change by the ORIGINAL value.',
        s: [`Change $= |${nw} - ${old}| = ${Math.abs(+(nw-old).toFixed(2))}$`, `$\\dfrac{${Math.abs(+(nw-old).toFixed(2))}}{${old}} = ${pc/100}$`, `$= ${pc}\\%$`] }; },
    findoriginal(r) { const p = pick(r, [10,20,25,40,50]), orig = pick(r, [40,60,80,120,200,400]);
      const off = r() < .5, m = off ? 1 - p/100 : 1 + p/100, res = +(orig * m).toFixed(2);
      return { q: `After ${off ? `a $${p}\\%$ discount` : `adding a $${p}\\%$ tip`}, the amount is $\\$${money(res)}$. What was the original?`,
        a: String(orig), unit: '$', hint: `$\\$${money(res)}$ is $${(m*100)}\\%$ of the original. Divide.`,
        s: [`$\\text{original} \\times ${m} = ${money(res)}$`, `$${money(res)} \\div ${m} = ${orig}$`, `Check: $${orig} \\times ${m} = ${money(res)}$ &check;`] }; },
    successive(r) { const a = pick(r, [10,20,25,30]), b = pick(r, [10,20,25,30]);
      const m = +((1 + a/100) * (1 - b/100)).toFixed(4), pct = +(m * 100).toFixed(2);
      return { q: `A price rises $${a}\\%$, then falls $${b}\\%$. The final price is what percent of the original?`,
        a: String(pct).replace(/\.00$/, ''), unit: '%', hint: 'Multiply the two multipliers — they do not cancel.',
        s: [`Up: $\\times ${1 + a/100}$`, `Down: $\\times ${(1 - b/100).toFixed(2)}$`, `$${1+a/100} \\times ${(1-b/100).toFixed(2)} = ${m}$`, `$= ${pct}\\%$`] }; }
  },

  posrational: {
    addfrac(r) { const d1 = pick(r, [2,3,4,5,6,8]), d2 = pick(r, [2,3,4,5,6,8]);
      const n1 = ri(r, 1, d1 - 1), n2 = ri(r, 1, d2 - 1);
      const L = d1 * d2 / gcd(d1, d2), num = n1 * (L / d1) + n2 * (L / d2);
      return { q: `Compute $${tex(n1,d1)} + ${tex(n2,d2)}$.`, a: fs(num, L),
        hint: `The least common denominator of $${d1}$ and $${d2}$ is $${L}$.`,
        s: [`$${tex(n1,d1)} = \\dfrac{${n1*(L/d1)}}{${L}}$ and $${tex(n2,d2)} = \\dfrac{${n2*(L/d2)}}{${L}}$`,
            `$\\dfrac{${n1*(L/d1)} + ${n2*(L/d2)}}{${L}} = ${tex(num,L)}$`] }; },
    multfrac(r) { const a = ri(r,1,7), b = ri(r,2,9), c = ri(r,1,7), d = ri(r,2,9);
      return { q: `Compute $${tex(a,b)} \\times ${tex(c,d)}$.`, a: fs(a*c, b*d),
        hint: 'Multiply straight across. No common denominator needed.',
        s: [`$\\dfrac{${a} \\times ${c}}{${b} \\times ${d}} = \\dfrac{${a*c}}{${b*d}}$`, `$= ${tex(a*c, b*d)}$`] }; },
    divfrac(r) { const a = ri(r,1,7), b = ri(r,2,9), c = ri(r,1,7), d = ri(r,2,9);
      return { q: `Compute $${tex(a,b)} \\div ${tex(c,d)}$.`, a: fs(a*d, b*c),
        hint: 'Keep the first, change $\\div$ to $\\times$, flip the second.',
        s: [`$${tex(a,b)} \\times ${tex(d,c)}$`, `$= \\dfrac{${a*d}}{${b*c}} = ${tex(a*d,b*c)}$`] }; },
    mixed(r) { const w1 = ri(r,2,6), d = pick(r,[2,3,4,6]), n1 = ri(r,1,d-1);
      const w2 = ri(r,1,w1-1), d2 = pick(r,[2,3,4,6]), n2 = ri(r,1,d2-1);
      const L = d*d2/gcd(d,d2), A = (w1*d+n1)*(L/d), B = (w2*d2+n2)*(L/d2);
      return { q: `Compute $${w1}${tex(n1,d)} - ${w2}${tex(n2,d2)}$.`, a: fs(A-B, L),
        hint: 'Change both to improper fractions, then find a common denominator.',
        s: [`$${w1}${tex(n1,d)} = ${tex(w1*d+n1,d)} = \\dfrac{${A}}{${L}}$`,
            `$${w2}${tex(n2,d2)} = ${tex(w2*d2+n2,d2)} = \\dfrac{${B}}{${L}}$`,
            `$\\dfrac{${A} - ${B}}{${L}} = ${tex(A-B,L)}$`] }; },
    order(r) { const a = ri(r,1,4), b = pick(r,[2,3,4]), c = ri(r,1,4), d = pick(r,[2,3,4]), e = ri(r,1,4), f = pick(r,[2,3,4]);
      const pn = c*e, pd = d*f, L = b*pd/gcd(b,pd), num = a*(L/b) + pn*(L/pd);
      return { q: `Compute $${tex(a,b)} + ${tex(c,d)} \\times ${tex(e,f)}$.`, a: fs(num,L),
        hint: 'Multiplication comes before addition.',
        s: [`$${tex(c,d)} \\times ${tex(e,f)} = ${tex(pn,pd)}$`, `$${tex(a,b)} + ${tex(pn,pd)} = ${tex(num,L)}$`] }; }
  },

  negrational: {
    addneg(r) { const a = ri(r,-15,15) || 3, b = ri(r,-15,15) || -4;
      return { q: `Compute $${a < 0 ? '(' + a + ')' : a} + ${b < 0 ? '(' + b + ')' : b}$.`, a: String(a + b),
        hint: `Start at $${a}$ and move ${b < 0 ? Math.abs(b) + ' steps left' : b + ' steps right'}.`,
        s: [`$${a} + ${b < 0 ? '(' + b + ')' : b} = ${a + b}$`] }; },
    subneg(r) { const a = ri(r,-12,12), b = ri(r,-12,12) || -5;
      return { q: `Compute $${a} - ${b < 0 ? '(' + b + ')' : b}$.`, a: String(a - b),
        hint: 'Subtracting is adding the opposite: Keep, Change, Change.',
        s: [`$${a} - ${b < 0 ? '(' + b + ')' : b} = ${a} + ${-b < 0 ? '(' + (-b) + ')' : -b}$`, `$= ${a - b}$`] }; },
    multneg(r) { const a = ri(r,2,12) * (r() < .5 ? -1 : 1), b = ri(r,2,12) * (r() < .5 ? -1 : 1);
      const op = r() < .5;
      if (op) return { q: `Compute $(${a}) \\times (${b})$.`, a: String(a * b),
        hint: 'Same signs give a positive; different signs give a negative.',
        s: [`$${Math.abs(a)} \\times ${Math.abs(b)} = ${Math.abs(a*b)}$`,
            `${(a<0)===(b<0) ? 'Same signs, so positive' : 'Different signs, so negative'}: $${a*b}$`] };
      const prod = a * b;
      return { q: `Compute $(${prod}) \\div (${a})$.`, a: String(b),
        hint: 'Same signs give a positive; different signs give a negative.',
        s: [`$${Math.abs(prod)} \\div ${Math.abs(a)} = ${Math.abs(b)}$`,
            `${(prod<0)===(a<0) ? 'Same signs, so positive' : 'Different signs, so negative'}: $${b}$`] }; },
    chain(r) { const a = ri(r,-12,12), b = ri(r,1,9), c = ri(r,1,9);
      return { q: `Compute $${a} - (-${b}) + (-${c})$.`, a: String(a + b - c),
        hint: 'Rewrite every subtraction as addition first.',
        s: [`$${a} + ${b} + (-${c})$`, `$${a} + ${b} = ${a + b}$`, `$${a + b} + (-${c}) = ${a + b - c}$`] }; },
    exponent(r) { const n = ri(r,2,6), p = ri(r,2,3), paren = r() < .5;
      const v = paren ? Math.pow(-n, p) : -Math.pow(n, p);
      return { q: `Compute $${paren ? '(-' + n + ')' : '-' + n}^${p}$.`, a: String(v),
        hint: paren ? 'The parentheses make the negative part of the base.' : 'Without parentheses, the exponent takes only the number — the minus sign waits outside.',
        s: paren ? [`$(-${n})^${p}$ has ${p} negative factors`, `${p % 2 === 0 ? 'Even count, so positive' : 'Odd count, so negative'}: $${v}$`]
                 : [`$-${n}^${p} = -(${n}^${p})$`, `$= -(${Math.pow(n,p)}) = ${v}$`] }; },
    negfrac(r) { const a = ri(r,1,8), b = ri(r,2,9), c = ri(r,1,8), d = ri(r,2,9);
      const s1 = r() < .5 ? -1 : 1, s2 = r() < .5 ? -1 : 1;
      return { q: `Compute $${s1 < 0 ? '-' : ''}${tex(a,b)} \\times ${s2 < 0 ? '\\left(-' + tex(c,d) + '\\right)' : tex(c,d)}$.`,
        a: fs(s1 * s2 * a * c, b * d), hint: 'Decide the sign first, then multiply the sizes.',
        s: [`${s1*s2 > 0 ? 'Same signs, so the answer is positive' : 'Different signs, so the answer is negative'}`,
            `$${tex(a,b)} \\times ${tex(c,d)} = ${tex(a*c,b*d)}$`, `Answer: $${tex(s1*s2*a*c, b*d)}$`] }; },
    context(r) { const start = -ri(r,2,20), up = ri(r,4,25), down = ri(r,1,12);
      return { q: `The temperature is $${start}°$C at dawn, rises $${up}°$ by noon, then falls $${down}°$ by night. Find the night temperature.`,
        a: String(start + up - down), unit: '°C', hint: 'Rising adds; falling subtracts.',
        s: [`$${start} + ${up} = ${start + up}$`, `$${start + up} - ${down} = ${start + up - down}$`] }; }
  },

  stats: {
    mean(r) { const n = ri(r,4,6), v = []; let sum = 0;
      for (let i = 0; i < n - 1; i++) { const x = ri(r,2,30); v.push(x); sum += x; }
      const m = ri(r,5,25), last = m * n - sum; v.push(last);
      if (last < 0 || last > 60) return this.mean(R(ri(r,1,1e9)));
      return { q: `Find the mean of $${v.join('$, $')}$.`, a: String(m),
        hint: 'Add them all up, then divide by how many there are.',
        s: [`$${v.join(' + ')} = ${m * n}$`, `$${m * n} \\div ${n} = ${m}$`] }; },
    median(r) { const n = pick(r, [5, 6, 7]), v = [];
      for (let i = 0; i < n; i++) v.push(ri(r,1,40));
      v.sort((a, b) => a - b);
      const med = n % 2 ? v[(n - 1) / 2] : (v[n/2 - 1] + v[n/2]) / 2;
      return { q: `Find the median of $${[...v].sort(() => .5 - r()).join('$, $')}$.`, a: String(med),
        hint: 'Put them in order first, then find the middle.',
        s: [`In order: $${v.join(', ')}$`,
            n % 2 ? `The middle value is $${med}$.` : `Average the two middle values: $\\dfrac{${v[n/2-1]} + ${v[n/2]}}{2} = ${med}$`] }; },
    meansum(r) { const n = ri(r,4,6), m1 = ri(r,70,85), m2 = m1 + ri(r,1,6);
      const need = m2 * (n + 1) - m1 * n;
      return { q: `${pick(r, NAMES)}'s $${n}$ tests average $${m1}$. What score on the next test raises the average to $${m2}$?`,
        a: String(need), hint: 'Turn both averages into totals, then subtract.',
        s: [`Current total: $${m1} \\times ${n} = ${m1 * n}$`, `Target total: $${m2} \\times ${n + 1} = ${m2 * (n + 1)}$`,
            `$${m2 * (n + 1)} - ${m1 * n} = ${need}$`] }; },
    mad(r) { const m = ri(r,6,20), d = ri(r,2,6);
      const v = [m - 2*d, m - d, m + d, m + 2*d].sort(() => .5 - r());
      return { q: `Find the mean absolute deviation of $${v.join('$, $')}$.`, a: String(1.5 * d),
        hint: `The mean is $${m}$. Average the distances from $${m}$.`,
        s: [`Mean $= ${m}$`, `Distances: $${2*d}$, $${d}$, $${d}$, $${2*d}$`,
            `$(${2*d} + ${d} + ${d} + ${2*d}) \\div 4 = ${1.5 * d}$`] }; },
    sample(r) { const n = pick(r, [50,80,100,200,250]), pct = pick(r, [10,15,20,25,30,40]);
      const k = n * pct / 100, pop = pick(r, [1000,1500,2000,2500,5000]);
      return { q: `In a random sample of $${n}$, exactly $${k}$ have a trait. Estimate how many of $${pop.toLocaleString('en-US')}$ have it.`,
        a: String(pop * pct / 100), hint: 'Find the sample proportion, then apply it to the whole population.',
        s: [`$\\dfrac{${k}}{${n}} = ${pct / 100}$`, `$${pct / 100} \\times ${pop} = ${pop * pct / 100}$`] }; }
  },

  probsimple: {
    basic(r) { const a = ri(r,2,9), b = ri(r,2,9), c = ri(r,0,6);
      const tot = a + b + c, col = pick(r, ['red','blue','green']);
      return { q: `A bag holds $${a}$ red, $${b}$ blue and $${c}$ green marbles. Find $P(\\text{${col}})$.`,
        a: fs(col === 'red' ? a : col === 'blue' ? b : c, tot), hint: `Favourable over total. The total is $${tot}$.`,
        s: [`Total: $${a} + ${b} + ${c} = ${tot}$`, `$P = ${tex(col === 'red' ? a : col === 'blue' ? b : c, tot)}$`] }; },
    complement(r) { const a = ri(r,2,9), b = ri(r,2,9), c = ri(r,1,8), tot = a + b + c;
      return { q: `A bag holds $${a}$ red, $${b}$ blue and $${c}$ green marbles. Find $P(\\text{not blue})$.`,
        a: fs(a + c, tot), hint: 'Count what is not blue, or subtract from $1$.',
        s: [`Total: $${tot}$`, `Not blue: $${a} + ${c} = ${a + c}$`, `$${tex(a+c,tot)}$ — or $1 - ${tex(b,tot)}$, the same thing.`] }; },
    backwards(r) { const d = pick(r, [2,3,4,5,6,8]), tot = d * ri(r,2,9);
      return { q: `A spinner has $${tot}$ equal sections and $P(\\text{win}) = ${tex(1,d)}$. How many sections win?`,
        a: String(tot / d), unit: 'sections', hint: `Find $${tex(1,d)}$ of $${tot}$.`,
        s: [`$\\dfrac{w}{${tot}} = ${tex(1,d)}$`, `$w = ${tot} \\div ${d} = ${tot / d}$`] }; }
  },

  probcompound: {
    counting(r) { const a = ri(r,3,6), b = ri(r,2,5), c = ri(r,2,4);
      return { q: `A menu has $${a}$ appetizers, $${b}$ mains and $${c}$ desserts. How many three-course meals are possible?`,
        a: String(a * b * c), unit: 'meals', hint: 'Multiply the choices at each stage.',
        s: [`$${a} \\times ${b} \\times ${c} = ${a * b * c}$`] }; },
    replacement(r) { const a = ri(r,3,7), b = ri(r,3,8), tot = a + b;
      return { q: `A bag has $${a}$ red and $${b}$ blue marbles. Two are drawn WITHOUT replacement. Find $P(\\text{both red})$.`,
        a: fs(a * (a - 1), tot * (tot - 1)), hint: 'Both the reds and the total drop by one on the second draw.',
        s: [`First: $${tex(a,tot)}$`, `Second: $${tex(a-1,tot-1)}$ — one red gone, one marble gone`,
            `$${tex(a,tot)} \\times ${tex(a-1,tot-1)} = ${tex(a*(a-1), tot*(tot-1))}$`] }; },
    combinations(r) { const n = ri(r,4,15);
      return { q: `At a gathering of $${n}$ people, everyone shakes hands with everyone else exactly once. How many handshakes?`,
        a: String(n * (n - 1) / 2), unit: 'handshakes', hint: 'Count ordered pairs, then divide by $2$.',
        s: [`$${n} \\times ${n - 1} = ${n * (n - 1)}$ ordered pairs`, `Each handshake was counted twice`,
            `$${n * (n - 1)} \\div 2 = ${n * (n - 1) / 2}$`] }; },
    independent(r) { const d1 = pick(r, [2,3,4,6]), d2 = pick(r, [2,3,4,6]);
      return { q: `One spinner has $${d1}$ equal sections and another has $${d2}$. Find the probability that both land on section $1$.`,
        a: fs(1, d1 * d2), hint: '"And" along one path means multiply.',
        s: [`$${tex(1,d1)} \\times ${tex(1,d2)} = ${tex(1, d1*d2)}$`] }; }
  },

  proprel: {
    findk(r) { const k = pick(r, [2,3,4,5,6,7,8,1.5,2.5]), xs = [ri(r,2,5), ri(r,6,9), ri(r,10,14)];
      const q = ri(r,15,25);
      return { q: `A proportional relationship gives $y = ${+(k*xs[0]).toFixed(2)}$ when $x = ${xs[0]}$, and $y = ${+(k*xs[1]).toFixed(2)}$ when $x = ${xs[1]}$. Find $y$ when $x = ${q}$.`,
        a: String(+(k * q).toFixed(2)).replace(/\.00$/, ''), hint: 'Find $k = \\dfrac{y}{x}$ first, then use $y = kx$.',
        s: [`$k = \\dfrac{${+(k*xs[0]).toFixed(2)}}{${xs[0]}} = ${k}$`, `$y = ${k}x$`, `$y = ${k} \\times ${q} = ${+(k*q).toFixed(2)}$`] }; },
    useprop(r) { const k = pick(r, [2,2.5,3,4,5,8,12]), n1 = ri(r,3,9), n2 = ri(r,10,24);
      const it = pick(r, ITEMS);
      return { q: `$${n1}$ ${it} cost $\\$${money(k * n1)}$. What do $${n2}$ ${it} cost?`,
        a: money(k * n2), unit: '$', hint: 'Find the cost of one first.',
        s: [`$${money(k*n1)} \\div ${n1} = \\$${money(k)}$ each`, `$${money(k)} \\times ${n2} = \\$${money(k*n2)}$`] }; }
  },

  algrel: {
    combine(r) { const a = ri(r,2,9), b = ri(r,2,9), c = ri(r,1,9), d = ri(r,1,9), v = pick(r,['x','a','n','y']);
      const co = a + b, k = c - d;
      return { q: `Simplify $${a}${v} + ${c} + ${b}${v} - ${d}$.`, a: `${co}${v}${k >= 0 ? '+' : '-'}${Math.abs(k)}`,
        alt: [`${k >= 0 ? k + '+' : '-' + Math.abs(k) + '+'}${co}${v}`],
        hint: 'Combine the terms that count the same thing.',
        s: [`$${a}${v} + ${b}${v} = ${co}${v}$`, `$${c} - ${d} = ${k}$`, `Answer: $${co}${v} ${k >= 0 ? '+ ' + k : '- ' + Math.abs(k)}$`] }; },
    distribute(r) { const a = ri(r,2,7) * (r() < .4 ? -1 : 1), b = ri(r,2,9), c = ri(r,2,9) * (r() < .5 ? -1 : 1);
      const v = pick(r,['x','n','y']), p = a * b, q = a * c;
      return { q: `Expand $${a}(${b}${v} ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)})$.`,
        a: `${p}${v}${q >= 0 ? '+' : '-'}${Math.abs(q)}`,
        hint: 'The multiplier reaches BOTH terms — including its sign.',
        s: [`$${a} \\times ${b}${v} = ${p}${v}$`, `$${a} \\times (${c}) = ${q}$`, `$${p}${v} ${q >= 0 ? '+ ' + q : '- ' + Math.abs(q)}$`] }; },
    evaluate(r) { const a = ri(r,2,9), b = ri(r,1,20), x = ri(r,-6,9) || 3;
      return { q: `Evaluate $${a}x + ${b}$ when $x = ${x < 0 ? '(' + x + ')' : x}$.`, a: String(a * x + b),
        hint: 'Multiply before you add.', s: [`$${a} \\times ${x} = ${a * x}$`, `$${a * x} + ${b} = ${a * x + b}$`] }; },
    pattern(r) { const step = ri(r,2,9), first = ri(r,1,12), n = pick(r,[10,12,15,20,25,30]);
      const terms = [0,1,2,3].map(i => first + i * step);
      const cst = first - step;
      return { q: `A pattern goes $${terms.join('$, $')}, \\ldots$. Find the $${n}$th term.`,
        a: String(first + (n - 1) * step), hint: `The step is $${step}$, so the rule contains $${step}n$.`,
        s: [`Step $= ${step}$`, `Rule: $${step}n ${cst >= 0 ? '+ ' + cst : '- ' + Math.abs(cst)}$ (check $n = 1$ gives $${first}$)`,
            `$${step}(${n}) ${cst >= 0 ? '+ ' + cst : '- ' + Math.abs(cst)} = ${first + (n-1)*step}$`] }; },
    custom(r) { const p = ri(r,2,5), q = ri(r,2,5), a = ri(r,2,9), b = ri(r,1,8);
      return { q: `Define $a \\star b = ${p}a - ${q}b$. Compute $${a} \\star ${b}$.`, a: String(p * a - q * b),
        hint: 'Just follow the definition exactly.',
        s: [`$${p}(${a}) - ${q}(${b})$`, `$= ${p*a} - ${q*b} = ${p*a - q*b}$`] }; }
  },

  reasoning: {
    solveword(r) { const a = ri(r,2,9), b = ri(r,1,20), n = ri(r,2,15);
      return { q: `${pick(r, NAMES)} thinks of a number, multiplies it by $${a}$, then adds $${b}$. The result is $${a*n+b}$. What was the number?`,
        a: String(n), hint: `Write it as $${a}n + ${b} = ${a*n+b}$.`,
        s: [`$${a}n + ${b} = ${a*n+b}$`, `$${a}n = ${a*n}$`, `$n = ${n}$`] }; },
    consecutive(r) { const n = ri(r,5,40), k = pick(r, [2,3]);
      const sum = k === 2 ? 2*n + 1 : 3*n + 3;
      return { q: `The sum of $${k}$ consecutive integers is $${sum}$. Find the smallest.`, a: String(n),
        hint: `Call them $n$, $n+1$${k === 3 ? ', $n+2$' : ''}.`,
        s: k === 2 ? [`$n + (n+1) = ${sum}$`, `$2n + 1 = ${sum}$`, `$n = ${n}$`]
                   : [`$n + (n+1) + (n+2) = ${sum}$`, `$3n + 3 = ${sum}$`, `$n = ${n}$`] }; },
    twoparts(r) { const s = ri(r,8,40), m = pick(r, [2,3,4]), tot = s * (1 + m);
      return { q: `A $${tot}$ cm rope is cut into two pieces, one $${m}$ times as long as the other. How long is the shorter piece?`,
        a: String(s), unit: 'cm', hint: `Let $s$ be the shorter piece; the longer is $${m}s$.`,
        s: [`$s + ${m}s = ${tot}$`, `$${m+1}s = ${tot}$`, `$s = ${s}$, and the longer piece is $${s*m}$ &check;`] }; }
  },

  equations: {
    onestep(r) { const x = ri(r,-15,25), b = ri(r,2,20), op = pick(r, ['add','sub','mul','div']);
      if (op === 'add') return { q: `Solve $x + ${b} = ${x + b}$.`, a: String(x), hint: `Subtract $${b}$ from both sides.`, s: [`$x = ${x + b} - ${b} = ${x}$`] };
      if (op === 'sub') return { q: `Solve $x - ${b} = ${x - b}$.`, a: String(x), hint: `Add $${b}$ to both sides.`, s: [`$x = ${x - b} + ${b} = ${x}$`] };
      if (op === 'mul') { const c = ri(r,2,9); return { q: `Solve $${c}x = ${c * x}$.`, a: String(x), hint: `Divide both sides by $${c}$.`, s: [`$x = ${c*x} \\div ${c} = ${x}$`] }; }
      const c = ri(r,2,9); return { q: `Solve $\\dfrac{x}{${c}} = ${x}$.`, a: String(c * x), hint: `Multiply both sides by $${c}$.`, s: [`$x = ${x} \\times ${c} = ${c*x}$`] }; },
    twostep(r) { const a = ri(r,2,9), x = ri(r,-9,12), b = ri(r,-15,20);
      return { q: `Solve $${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${a * x + b}$.`, a: String(x),
        hint: `Clear the $${b >= 0 ? '+' + b : b}$ first, then divide by $${a}$.`,
        s: [`$${a}x = ${a*x+b} ${b >= 0 ? '- ' + b : '+ ' + Math.abs(b)} = ${a*x}$`, `$x = ${a*x} \\div ${a} = ${x}$`] }; },
    bothsides(r) { const a = ri(r,4,9), c = ri(r,2,a-1), x = ri(r,-8,12), b = ri(r,-12,15), d = (a - c) * x + b;
      return { q: `Solve $${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${c}x ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}$.`,
        a: String(x), hint: `Subtract $${c}x$ from both sides.`,
        s: [`$${a - c}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${d}$`, `$${a - c}x = ${(a-c)*x}$`, `$x = ${x}$`] }; },
    parens(r) { const a = ri(r,2,6), b = ri(r,2,5), x = ri(r,-6,10), c = ri(r,-9,9);
      return { q: `Solve $${a}(${b}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}) = ${a * (b * x + c)}$.`, a: String(x),
        hint: `Divide both sides by $${a}$ first — it keeps the numbers small.`,
        s: [`$${b}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = ${b*x+c}$`, `$${b}x = ${b*x}$`, `$x = ${x}$`] }; }
  },

  inequalities: {
    twostep(r) { const a = ri(r,2,8), x = ri(r,-8,12), b = ri(r,-12,15), sym = pick(r, ['<','>','\\leq','\\geq']);
      const plain = sym === '\\leq' ? '<=' : sym === '\\geq' ? '>=' : sym;
      return { q: `Solve $${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} ${sym} ${a * x + b}$. Enter it like $x${plain}${x}$.`,
        a: `x${plain}${x}`, hint: `Dividing by $${a}$ is safe — it is positive, so nothing flips.`,
        s: [`$${a}x ${sym} ${a*x}$`, `$x ${sym} ${x}$`] }; },
    flip(r) { const a = -ri(r,2,8), x = ri(r,-8,10), b = ri(r,-10,15), sym = pick(r, ['<','>','\\leq','\\geq']);
      const flipped = { '<': '>', '>': '<', '\\leq': '\\geq', '\\geq': '\\leq' }[sym];
      const plain = flipped === '\\leq' ? '<=' : flipped === '\\geq' ? '>=' : flipped;
      return { q: `Solve $${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} ${sym} ${a * x + b}$. Enter it like $x${plain}${x}$.`,
        a: `x${plain}${x}`, hint: `You will divide by $${a}$ — a negative — so the sign FLIPS.`,
        s: [`$${a}x ${sym} ${a*x}$`, `Divide by $${a}$ and flip: $x ${flipped} ${x}$`] }; }
  },

  scale: {
    scalefactor(r) { const k = pick(r, [1.5,2,2.5,3,4]), s = ri(r,4,14);
      return { q: `A figure is enlarged by scale factor $${k}$. A side of $${s}$ cm becomes how long?`,
        a: String(+(k * s).toFixed(2)).replace(/\.00$/, ''), unit: 'cm', hint: 'Every length multiplies by the scale factor.',
        s: [`$${s} \\times ${k} = ${+(k*s).toFixed(2)}$ cm`] }; },
    readscale(r) { const sc = pick(r, [20,25,40,50,100,250]), d = ri(r,3,15);
      return { q: `A drawing uses scale $1 : ${sc}$. A line measures $${d}$ cm. How long is the real object in cm?`,
        a: String(d * sc), unit: 'cm', hint: `Multiply by $${sc}$.`,
        s: [`$${d} \\times ${sc} = ${d * sc}$ cm`, `That is $${(d*sc/100)}$ m.`] }; },
    similar(r) { const t = pick(r, [[3,4,5],[6,8,10],[5,12,13],[9,12,15]]), k = pick(r, [1.5,2,2.5,3]);
      const per = t.reduce((a, b) => a + b, 0);
      return { q: `A triangle has sides $${t.join('$, $')}$. A similar triangle has its shortest side equal to $${+(t[0]*k).toFixed(1)}$. Find its perimeter.`,
        a: String(+(per * k).toFixed(2)).replace(/\.00$/, ''), hint: 'Find $k$ from the shortest sides, then scale the whole perimeter.',
        s: [`$k = \\dfrac{${+(t[0]*k).toFixed(1)}}{${t[0]}} = ${k}$`, `Original perimeter: $${per}$`, `$${per} \\times ${k} = ${+(per*k).toFixed(2)}$`] }; },
    areascale(r) { const k = pick(r, [2,3,4,5]), a = pick(r, [6,12,20,24,30]);
      return { q: `A shape of area $${a}$ is scaled by factor $${k}$. Find the new area.`,
        a: String(a * k * k), hint: `Area scales by $k^2 = ${k*k}$, not by $k$.`,
        s: [`$k^2 = ${k}^2 = ${k*k}$`, `$${a} \\times ${k*k} = ${a*k*k}$`] }; },
    indirect(r) { const h = ri(r,4,6), s = ri(r,3,8), m = ri(r,4,9);
      return { q: `A $${h}$ ft person casts a $${s}$ ft shadow. At the same moment a tree casts a $${s*m}$ ft shadow. How tall is the tree?`,
        a: String(h * m), unit: 'ft', hint: `The sun makes similar triangles: $\\dfrac{${h}}{${s}} = \\dfrac{t}{${s*m}}$.`,
        s: [`$\\dfrac{${h}}{${s}} = \\dfrac{t}{${s*m}}$`, `$${s}t = ${h * s * m}$`, `$t = ${h * m}$ ft`] }; }
  },

  area2d: {
    rectangle(r) { const a = ri(r,4,18), b = ri(r,4,18);
      return { q: `Find the area of a rectangle $${a}$ cm by $${b}$ cm.`, a: String(a * b), unit: 'cm²',
        hint: 'Base times height.', s: [`$${a} \\times ${b} = ${a*b}$ cm$^2$`] }; },
    triangle(r) { const b = ri(r,2,12) * 2, h = ri(r,3,15);
      return { q: `Find the area of a triangle with base $${b}$ and height $${h}$.`, a: String(b * h / 2),
        hint: 'Half of base times height. Use the PERPENDICULAR height.',
        s: [`$\\dfrac{1}{2}(${b})(${h}) = ${b*h/2}$`] }; },
    trapezoid(r) { const b1 = ri(r,3,12), b2 = b1 + ri(r,2,10), h = ri(r,3,12);
      const avg = (b1 + b2) / 2;
      return { q: `A trapezoid has parallel sides $${b1}$ and $${b2}$, and height $${h}$. Find its area.`,
        a: String(avg * h), hint: 'Average the two parallel sides, then multiply by the height.',
        s: [`$\\dfrac{${b1} + ${b2}}{2} = ${avg}$`, `$${avg} \\times ${h} = ${avg * h}$`] }; },
    circle(r) { const rad = ri(r,2,12), area = r() < .5;
      return area
        ? { q: `Find the area of a circle with radius $${rad}$. Use $\\pi \\approx 3.14$.`, a: String(+(3.14 * rad * rad).toFixed(2)).replace(/\.00$/,''),
            hint: '$A = \\pi r^2$ — square the radius first.', s: [`$${rad}^2 = ${rad*rad}$`, `$3.14 \\times ${rad*rad} = ${+(3.14*rad*rad).toFixed(2)}$`] }
        : { q: `Find the circumference of a circle with radius $${rad}$. Use $\\pi \\approx 3.14$.`, a: String(+(6.28 * rad).toFixed(2)).replace(/\.00$/,''),
            hint: '$C = 2\\pi r$.', s: [`$2 \\times 3.14 \\times ${rad} = ${+(6.28*rad).toFixed(2)}$`] }; },
    backwards(r) { const b = ri(r,2,12) * 2, h = ri(r,3,15), A = b * h / 2;
      return { q: `A triangle has area $${A}$ and base $${b}$. Find its height.`, a: String(h),
        hint: 'Put what you know into $A = \\dfrac{1}{2}bh$ and solve.',
        s: [`$${A} = \\dfrac{1}{2}(${b})h = ${b/2}h$`, `$h = ${A} \\div ${b/2} = ${h}$`] }; },
    perimeter(r) { const l = ri(r,5,20), w = ri(r,3,18);
      return { q: `A rectangle has perimeter $${2*(l+w)}$ and length $${l}$. Find its width.`, a: String(w),
        hint: '$2l + 2w = P$.', s: [`$${2*l} + 2w = ${2*(l+w)}$`, `$2w = ${2*w}$`, `$w = ${w}$`] }; }
  },

  volume: {
    prism(r) { const a = ri(r,2,9), b = ri(r,2,9), c = ri(r,2,9);
      return { q: `Find the volume of a $${a} \\times ${b} \\times ${c}$ rectangular prism.`, a: String(a*b*c), unit: 'units³',
        hint: '$V = lwh$.', s: [`$${a} \\times ${b} \\times ${c} = ${a*b*c}$`] }; },
    cylinder(r) { const rad = ri(r,2,7), h = ri(r,3,12);
      return { q: `A cylinder has radius $${rad}$ and height $${h}$. Find its volume in terms of $\\pi$ (enter just the number in front of $\\pi$).`,
        a: String(rad*rad*h), hint: `$\\pi r^2 h = \\pi \\cdot ${rad*rad} \\cdot ${h}$.`,
        s: [`$r^2 = ${rad*rad}$`, `$${rad*rad} \\times ${h} = ${rad*rad*h}$`, `$V = ${rad*rad*h}\\pi$`] }; },
    surface(r) { const a = ri(r,2,9), b = ri(r,2,9), c = ri(r,2,9);
      return { q: `Find the surface area of a $${a} \\times ${b} \\times ${c}$ rectangular prism.`,
        a: String(2*(a*b + a*c + b*c)), hint: 'Three pairs of matching faces: $2lw + 2lh + 2wh$.',
        s: [`$2(${a} \\times ${b}) = ${2*a*b}$`, `$2(${a} \\times ${c}) = ${2*a*c}$`, `$2(${b} \\times ${c}) = ${2*b*c}$`,
            `$${2*a*b} + ${2*a*c} + ${2*b*c} = ${2*(a*b+a*c+b*c)}$`] }; },
    backwards(r) { const a = ri(r,3,14), b = ri(r,3,14), h = ri(r,2,15);
      return { q: `A tank holds $${a*b*h}$ cm$^3$. Its base is $${a}$ cm by $${b}$ cm. How deep is it?`,
        a: String(h), unit: 'cm', hint: '$V = Bh$, so $h = V \\div B$.',
        s: [`$B = ${a} \\times ${b} = ${a*b}$ cm$^2$`, `$${a*b*h} \\div ${a*b} = ${h}$ cm`] }; }
  },

  construction: {
    angles(r) { const x = ri(r,15,85), kind = pick(r, ['supplement','complement','vertical']);
      if (kind === 'vertical') return { q: `Two lines cross. One angle measures $${x}°$. Find its vertical angle.`, a: String(x), unit: '°',
        hint: 'Vertical angles are equal.', s: [`$${x}°$`] };
      const tot = kind === 'supplement' ? 180 : 90;
      return { q: `Find the ${kind} of $${x}°$.`, a: String(tot - x), unit: '°',
        hint: `${kind === 'supplement' ? 'Supplementary' : 'Complementary'} angles sum to $${tot}°$.`,
        s: [`$${tot} - ${x} = ${tot - x}°$`] }; },
    triangle(r) { const a = ri(r,20,80), b = ri(r,20,180 - a - 20);
      return { q: `A triangle has angles $${a}°$ and $${b}°$. Find the third angle.`, a: String(180 - a - b), unit: '°',
        hint: 'All three sum to $180°$.', s: [`$180 - ${a} - ${b} = ${180 - a - b}°$`] }; },
    polygon(r) { const n = pick(r, [5,6,7,8,9,10,12,15,18,20]);
      const NAME = {5:'pentagon',6:'hexagon',7:'heptagon',8:'octagon',9:'nonagon',10:'decagon',12:'dodecagon',15:'15-gon',18:'18-gon',20:'20-gon'};
      return { q: `Find one interior angle of a regular ${NAME[n]}.`,
        a: String((n - 2) * 180 / n), unit: '°', hint: `Interior angles of an $n$-gon sum to $(n-2)180°$.`,
        s: [`$(${n} - 2) \\times 180 = ${(n-2)*180}°$`, `$${(n-2)*180} \\div ${n} = ${(n-2)*180/n}°$`] }; },
    inequality(r) { const a = ri(r,3,12), b = a + ri(r,1,8), ok = r() < .5;
      const c = ok ? ri(r, b - a + 1, a + b - 1) : pick(r, [a + b + ri(r,1,5), Math.max(1, b - a - ri(r,0,3))]);
      const works = a + Math.min(b, c) > Math.max(b, c) && b + Math.min(a, c) > Math.max(a, c);
      return { q: `Can segments of length $${a}$, $${b}$ and $${c}$ form a triangle?`, c: ['Yes', 'No'], a: works ? 0 : 1,
        hint: 'Compare the two shorter sides against the longest.',
        s: [`Longest side: $${Math.max(a,b,c)}$`, `The other two sum to $${a + b + c - Math.max(a,b,c)}$`,
            works ? `That is greater than $${Math.max(a,b,c)}$, so a triangle exists.` : `That is not greater than $${Math.max(a,b,c)}$, so no triangle exists.`] }; }
  }
  };


  /* ---- fill-ins: every remaining bank skill now has a generator, so any skill can be drilled ---- */
  function mc(r, right, wrongs) {                       // shuffled multiple choice
    const opts = [right].concat(wrongs);
    for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = opts[i]; opts[i] = opts[j]; opts[j] = t; }
    return { c: opts, a: opts.indexOf(right) };
  }
  const ANG = k => k.charAt(0).toUpperCase() + k.slice(1);

  const MORE = {
  percents: {
    convert(r) { const d = pick(r, [4,5,8,10,20,25,50]), n = ri(r, 1, d - 1), pct = +(n / d * 100).toFixed(2);
      const [rn, rd] = frac(n, d);
      return { q: `Write $${tex(n,d)}$ as a percent. (Enter just the number.)`, a: String(pct).replace(/\.00$/, ''), unit: '%',
        hint: `Divide the top by the bottom, then move the decimal point two places right.`,
        s: [`$${rn} \\div ${rd} = ${n / d}$`, `$= ${pct}\\%$`] }; }
  },
  posrational: {
    convert(r) { const d = pick(r, [2,4,5,8,10,16,20,25]), n = ri(r, 1, d - 1), [rn, rd] = frac(n, d);
      return { q: `Write $${tex(n,d)}$ as a decimal.`, a: String(n / d), hint: 'Divide the top by the bottom.',
        s: [`$${rn} \\div ${rd} = ${n / d}$`] }; },
    compare(r) { let a = ri(r,1,9), b = ri(r,2,11), c = ri(r,1,9), d = ri(r,2,11);
      if (a * d === c * b) d = d + 1;
      const first = a * d > c * b;
      return Object.assign({ q: `Which is larger, $${tex(a,b)}$ or $${tex(c,d)}$?`,
        hint: 'Cross-multiply and compare the two products.',
        s: [`$${a} \\times ${d} = ${a*d}$ and $${c} \\times ${b} = ${c*b}$`,
            'The bigger cross-product sits over the bigger fraction',
            `$${Math.max(a*d,c*b)} > ${Math.min(a*d,c*b)}$, so $${first ? tex(a,b) : tex(c,d)}$ is larger.`] },
        mc(r, first ? `$${tex(a,b)}$` : `$${tex(c,d)}$`, [first ? `$${tex(c,d)}$` : `$${tex(a,b)}$`, 'They are equal'])); },
    wordfrac(r) { const a = pick(r,[2,3,4,5]), b = pick(r,[2,3,4,5]);
      const [n1, d1] = frac(a - 1, a), [n2, d2] = frac(b - 1, b);
      const [rn, rd] = frac(n1 * n2, d1 * d2);
      return { q: `${pick(r, NAMES)} spent $${tex(1,a)}$ of her money on a book, then $${tex(1,b)}$ of what was left on lunch. What fraction of her original money remains?`,
        a: fs(rn, rd), hint: `After the book she has $${tex(n1,d1)}$ left. Lunch takes $${tex(1,b)}$ OF THAT.`,
        s: [`After the book: $1 - ${tex(1,a)} = ${tex(n1,d1)}$ remains`,
            `Lunch leaves $${tex(n2,d2)}$ of that`, `$${tex(n1,d1)} \\times ${tex(n2,d2)} = ${tex(rn,rd)}$`] }; }
  },
  negrational: {
    order(r) { const a = ri(r,2,5), p = pick(r,[2,3]), b = ri(r,2,6), c = ri(r,1,9);
      const t1 = -Math.pow(a, p), t2 = Math.pow(b, 2);
      return { q: `Compute $-${a}^${p} + (-${b})^2 - (-${c})$.`, a: String(t1 + t2 + c),
        hint: 'No parentheses on the first term, so the exponent takes only the number.',
        s: [`$-${a}^${p} = -(${Math.pow(a,p)}) = ${t1}$`, `$(-${b})^2 = ${t2}$ — an even count of negatives`,
            `$-(-${c}) = +${c}$`, `$${t1} + ${t2} + ${c} = ${t1 + t2 + c}$`] }; }
  },
  stats: {
    mode(r) { const m = ri(r,2,14); const extra = [];
      while (extra.length < 3) { const x = ri(r,1,20); if (x !== m) extra.push(x); }
      const v = [m, m, m].concat(extra).sort(() => .5 - r());
      return { q: `Find the mode of $${v.join('$, $')}$.`, a: String(m), hint: 'Which value appears most often?',
        s: [`$${m}$ appears three times, more than any other value.`] }; },
    bias(r) { const sc = pick(r, [
        { t: 'how much television a typical student watches', bad: 'students waiting outside the school television studio' },
        { t: 'how often students exercise', bad: 'people leaving the gym after a workout' },
        { t: 'how students travel to school', bad: 'students locking bicycles at the bike rack' },
        { t: 'the most popular sport in town', bad: 'fans leaving a basketball game' }]);
      return Object.assign({ q: `You want to find out ${sc.t}. Which sample is biased?`,
        hint: 'Ask which group is unusually likely to differ from everyone else.',
        s: [`Those people are far more interested in the topic than a typical person.`,
            'That over-represents one kind of answer — a biased sample.',
            'The others give everyone a fair chance of being picked.'] },
        mc(r, ANG(sc.bad), ['$60$ students drawn at random from the full roster',
          'Every 5th name on an alphabetical list of all students', '$20$ students picked at random from each grade'])); },
    centre(r) { const base = [ri(r,10,20), ri(r,10,22), ri(r,10,24), ri(r,10,26)].sort((a,b) => a - b);
      const out = ri(r,100,300), v = base.concat([out]);
      const mean = +(v.reduce((a,b) => a + b, 0) / 5).toFixed(1);
      return Object.assign({ q: `A data set is $${v.join('$, $')}$. Which measure better describes a typical value?`,
        hint: 'Work out both, then ask which one looks like the actual data.',
        s: [`Mean $= ${mean}$`, `Median $= ${base[2]}$`,
            'One large value dragged the mean away from where the data actually sits.'] },
        mc(r, 'The median', ['The mean', 'They are equally good'])); },
    compare(r) { const m1 = ri(r,70,85), gap = pick(r,[3,4,5,6]), mad = pick(r,[1,2,9,12]);
      const big = gap > mad;
      return Object.assign({ q: `Class A: mean $${m1}$, MAD $${mad}$. Class B: mean $${m1 + gap}$, MAD $${mad}$. Is the $${gap}$-point gap convincing?`,
        hint: 'Compare the size of the gap to the size of the typical variation.',
        s: [`Gap between means: $${gap}$`, `Typical variation inside each class: about $${mad}$`,
            big ? 'The gap is bigger than the noise inside the classes, so it means something.'
                : 'The gap is smaller than the variation inside each class, so it is not convincing.'] },
        mc(r, big ? 'Yes — the gap is larger than the spread' : 'No — the gap is smaller than the spread',
           [big ? 'No — the gap is smaller than the spread' : 'Yes — the gap is larger than the spread',
            'There is not enough information'])); },
    capture(r) { const tagged = pick(r,[40,50,60,80,100]), k = pick(r,[3,4,5,6]), inSample = ri(r,8,12);
      const sample = k * inSample;
      return { q: `A biologist tags $${tagged}$ fish and releases them. Later a sample of $${sample}$ fish contains $${inSample}$ tagged ones. Estimate the lake's fish population.`,
        a: String(tagged * k), unit: 'fish', hint: 'The fraction tagged in the sample should match the fraction tagged in the lake.',
        s: [`Sample fraction tagged: $${tex(inSample, sample)}$`,
            `So the $${tagged}$ tagged fish are about $${tex(1,k)}$ of the lake`, `$${tagged} \\times ${k} = ${tagged * k}$ fish`] }; }
  },
  probsimple: {
    samplespace(r) { const n = pick(r,[2,3,4]), k = ri(r,0,n);
      const C = (n,k) => { let x = 1; for (let i = 0; i < k; i++) x = x * (n - i) / (i + 1); return Math.round(x); };
      const num = C(n,k), den = Math.pow(2,n), w = ['no','one','two','three','four'][k];
      return { q: `${['','','Two','Three','Four'][n]} fair coins are flipped. Find $P(\\text{exactly ${w} head${k === 1 ? '' : 's'}})$.`,
        a: fs(num, den), hint: `There are $2^${n} = ${den}$ equally likely outcomes. Count the ones with exactly ${w} head${k === 1 ? '' : 's'}.`,
        s: [`Total outcomes: $2^${n} = ${den}$`, `Ways to get exactly ${w} head${k === 1 ? '' : 's'}: $${num}$`, `$${tex(num,den)}$`] }; },
    experimental(r) { const trials = pick(r,[20,40,60,80,100,200]), pct = pick(r,[10,20,25,30,40,50]);
      const hits = trials * pct / 100;
      return { q: `A spinner is spun $${trials}$ times and lands on red $${hits}$ times. What is the experimental probability of red, as a decimal?`,
        a: String(pct / 100), hint: 'Experimental probability is what actually happened over the number of trials.',
        s: [`$${tex(hits, trials)} = ${pct / 100}$`] }; },
    counting(r) { const N = pick(r,[20,24,30,36,40,50]), d = pick(r,[3,4,5,6]), cnt = Math.floor(N / d);
      return { q: `A number from $1$ to $${N}$ is chosen at random. Find $P(\\text{multiple of } ${d})$.`,
        a: fs(cnt, N), hint: `How many multiples of $${d}$ are there up to $${N}$?`,
        s: [`Multiples of $${d}$ up to $${N}$: $${cnt}$ of them`, `$${tex(cnt,N)}$`] }; },
    area(r) { const d = pick(r,[3,4,5,6,8]), k = pick(r,[2,3,4]);
      const [rn, rd] = frac(d - 2, 2 * d), [en, ed] = frac(d - 2, 2 * d * k);
      return { q: `A spinner is half red, and $${tex(1,d)}$ of it is blue. The rest is split evenly between ${k} other colours. Find the probability of landing on one particular one of those colours.`,
        a: fs(en, ed), hint: 'These sections are not equal, so work with fractions of the whole circle.',
        s: [`Red and blue: $\\dfrac{1}{2} + ${tex(1,d)} = ${tex(d + 2, 2 * d)}$`,
            `That leaves $1 - ${tex(d + 2, 2 * d)} = ${tex(rn, rd)}$`,
            `Split ${k} ways: $${tex(rn, rd)} \\div ${k} = ${tex(en, ed)}$`] }; }
  },
  probcompound: {
    dice(r) { const s = ri(r,2,12), ways = 6 - Math.abs(7 - s);
      return { q: `Two fair dice are rolled. Find $P(\\text{sum} = ${s})$.`, a: fs(ways, 36),
        hint: `List the pairs that add to $${s}$.`,
        s: [`Pairs summing to $${s}$: $${ways}$ of them`, `$${tex(ways,36)}$`] }; },
    complement(r) { const n = pick(r,[2,3]), face = ri(r,1,6), none = Math.pow(5,n), tot = Math.pow(6,n);
      return { q: `${n === 2 ? 'Two' : 'Three'} fair dice are rolled. Find $P(\\text{at least one } ${face})$.`,
        a: fs(tot - none, tot), hint: `The opposite is "no ${face}s at all" — far fewer cases to count.`,
        s: [`$P(\\text{not a } ${face} \\text{ on one die}) = \\dfrac{5}{6}$`,
            `$P(\\text{no } ${face} \\text{ at all}) = ${tex(none, tot)}$`,
            `$1 - ${tex(none,tot)} = ${tex(tot - none, tot)}$`] }; },
    samplespace(r) { const n = pick(r,[2,3,4]), k = ri(r,0,n);
      const row = [[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]][n - 1];
      const C = row[k], den = Math.pow(2,n), w = ['no','one','two','three','four'][k];
      return { q: `${['','','Two','Three','Four'][n]} fair coins are flipped. Find $P(\\text{exactly ${w} head${k === 1 ? '' : 's'}})$.`,
        a: fs(C, den), hint: `There are $2^${n} = ${den}$ equally likely sequences. Count the ones with exactly ${w} head${k === 1 ? '' : 's'}.`,
        s: [`Total outcomes: $2^${n} = ${den}$`, `Ways to get exactly ${w} head${k === 1 ? '' : 's'}: $${C}$`, `$${tex(C,den)}$`] }; }
  },
  proprel: {
    identify(r) { const k = ri(r,2,9), b = ri(r,2,12);
      return Object.assign({ q: 'Which equation represents a proportional relationship?',
        hint: 'It must fit $y = kx$ with nothing added on.',
        s: [`$y = ${k}x$ has the form $y = kx$ with $k = ${k}$.`,
            'The others add a constant, divide, or square — none is proportional.'] },
        mc(r, `$y = ${k}x$`, [`$y = ${k}x + ${b}$`, `$y = \\dfrac{${k}}{x}$`, `$y = x^2 + ${k}$`])); },
    compare(r) { const x1 = ri(r,2,6), x2 = ri(r,2,6), k1 = pick(r,[1.5,2,2.5,3,4]);
      let k2 = pick(r,[1.5,2,2.5,3,4]); if (k2 === k1) k2 = k1 + 0.5;
      const first = k1 > k2;
      return Object.assign({ q: `Line A passes through $(${x1}, ${+(k1*x1).toFixed(1)})$ and line B through $(${x2}, ${+(k2*x2).toFixed(1)})$. Both are proportional. Which is steeper?`,
        hint: 'Compare the two values of $k = \\dfrac{y}{x}$.',
        s: [`A: $k = ${k1}$`, `B: $k = ${k2}$`, `$${Math.max(k1,k2)} > ${Math.min(k1,k2)}$, so line ${first ? 'A' : 'B'} is steeper.`] },
        mc(r, first ? 'Line A' : 'Line B', [first ? 'Line B' : 'Line A', 'They have the same steepness'])); }
  },
  algrel: {
    inverse(r) { const w1 = pick(r,[3,4,5,6]), f = pick(r,[2,3,4]), d2 = pick(r,[3,4,5,6]);
      const d1 = d2 * f, w2 = w1 * f;
      return { q: `$${w1}$ workers finish a job in $${d1}$ days. At the same rate, how many days would $${w2}$ workers take?`,
        a: String(d2), unit: 'days', hint: 'More workers means fewer days — this is inverse, not proportional.',
        s: [`Total work: $${w1} \\times ${d1} = ${w1 * d1}$ worker-days`, `$${w1 * d1} \\div ${w2} = ${d2}$ days`,
            `Notice the product stays constant: $xy = ${w1 * d1}$.`] }; }
  },
  reasoning: {
    translate(r) { const n = ri(r,3,12), v = pick(r,['n','x']);
      const kinds = [
        { q: `"$${n}$ more than $${v}$"`, right: `$${v} + ${n}$`, w: [`$${n} - ${v}$`, `$${v} - ${n}$`, `$${n}${v}$`], why: '"More than" adds.' },
        { q: `"$${n}$ less than $${v}$"`, right: `$${v} - ${n}$`, w: [`$${n} - ${v}$`, `$${v} + ${n}$`, `$\\dfrac{${v}}{${n}}$`], why: 'Read it as "take away from" — the order flips.' },
        { q: `"$${v}$ subtracted from $${n}$"`, right: `$${n} - ${v}$`, w: [`$${v} - ${n}$`, `$${v} + ${n}$`, `$${n}${v}$`], why: 'You start from the number it is subtracted FROM.' },
        { q: `"the quotient of $${v}$ and $${n}$"`, right: `$\\dfrac{${v}}{${n}}$`, w: [`$\\dfrac{${n}}{${v}}$`, `$${n}${v}$`, `$${v} - ${n}$`], why: 'The first named quantity goes on top.' }];
      const k = pick(r, kinds);
      return Object.assign({ q: `Which expression means ${k.q}?`, hint: k.why, s: [k.why, `Answer: ${k.right}`] }, mc(r, k.right, k.w)); },
    inequality(r) { const budget = pick(r,[50,60,75,80,100]), fixed = pick(r,[12,15,20,25,28]), each = pick(r,[3,4,5,6,7]);
      const n = Math.floor((budget - fixed) / each);
      return { q: `${pick(r, NAMES)} has $\\$${budget}$. A ticket costs $\\$${fixed}$ and snacks are $\\$${each}$ each. At most how many snacks?`,
        a: String(n), unit: 'snacks', hint: `Write $${fixed} + ${each}s \\leq ${budget}$, then round DOWN.`,
        s: [`$${fixed} + ${each}s \\leq ${budget}$`, `$${each}s \\leq ${budget - fixed}$`,
            `$s \\leq ${+((budget - fixed) / each).toFixed(2)}$`, `You cannot buy part of a snack, so $${n}$.`] }; },
    geometry(r) { const w = ri(r,3,15), d = ri(r,2,8), l = w + d, P = 2 * (l + w);
      return { q: `A rectangle's length is $${d}$ more than its width, and its perimeter is $${P}$. Find the width.`,
        a: String(w), hint: `Let $w$ be the width; the length is $w + ${d}$.`,
        s: [`$2w + 2(w + ${d}) = ${P}$`, `$4w + ${2*d} = ${P}$`, `$4w = ${P - 2*d}$, so $w = ${w}$ and the length is $${l}$ &check;`] }; },
    ages(r) { const b = ri(r,6,14), d = ri(r,2,8), y = ri(r,2,6);
      const A = pick(r, NAMES); let B = pick(r, NAMES); if (B === A) B = A === 'Mia' ? 'Jonah' : 'Mia';
      const sum = (b + y) + (b + d + y);
      return { q: `${A} is $${d}$ years older than ${B}. In $${y}$ years, their ages will sum to $${sum}$. How old is ${B} now?`,
        a: String(b), unit: 'years', hint: `Let $b$ be ${B} now, so ${A} is $b + ${d}$. In ${y} years add ${y} to EACH.`,
        s: [`In $${y}$ years: ${B} is $b + ${y}$, ${A} is $b + ${d + y}$`, `$(b + ${y}) + (b + ${d + y}) = ${sum}$`,
            `$2b + ${d + 2*y} = ${sum}$`, `$b = ${b}$ — ${B} is $${b}$, ${A} is $${b + d}$ &check;`] }; },
    coins(r) { const total = pick(r,[15,20,25,30]), n = ri(r,3,total - 3), dimes = total - n, value = 5 * n + 10 * dimes;
      return { q: `A jar holds $${total}$ coins, only nickels and dimes, worth $\\$${(value/100).toFixed(2)}$. How many dimes are there?`,
        a: String(dimes), unit: 'dimes', hint: `If there are $n$ nickels there are $${total} - n$ dimes. Work in cents.`,
        s: [`$5n + 10(${total} - n) = ${value}$`, `$5n + ${10*total} - 10n = ${value}$`,
            `$-5n = ${value - 10*total}$, so $n = ${n}$ nickels`, `Dimes: $${total} - ${n} = ${dimes}$ &check;`] }; },
    rounding(r) { const cap = pick(r,[24,30,36,40,45,50]), buses = ri(r,3,8), extra = ri(r,1,cap - 1);
      const students = cap * buses + extra;
      return { q: `A school has $${students}$ students going on a trip. Each bus holds $${cap}$. How many buses are needed?`,
        a: String(buses + 1), unit: 'buses', hint: 'Divide, then think about what to do with the leftover students.',
        s: [`$${students} \\div ${cap} = ${+(students/cap).toFixed(2)}$`, `$${buses}$ buses hold only $${cap*buses}$ students`,
            `Round UP: $${buses + 1}$ buses, because the extra $${extra}$ still need a ride.`] }; }
  },
  equations: {
    fractions(r) { const d = pick(r,[2,3,4,5,6]), b = ri(r,1,12), x = d * ri(r,1,12), c = x / d + b;
      return { q: `Solve $\\dfrac{x}{${d}} + ${b} = ${c}$.`, a: String(x),
        hint: `Subtract $${b}$, then multiply by $${d}$.`,
        s: [`$\\dfrac{x}{${d}} = ${c - b}$`, `$x = ${c - b} \\times ${d} = ${x}$`] }; },
    special(r) { const a = ri(r,2,7), b = ri(r,1,9);
      if (r() < .5) { const c = b + ri(r,1,8);
        return Object.assign({ q: `Solve $${a}x + ${b} = ${a}x + ${c}$.`, hint: `Try subtracting $${a}x$ from both sides.`,
          s: [`Subtract $${a}x$: $${b} = ${c}$`, 'That is false whatever $x$ is', 'So there is no solution.'] },
          mc(r, 'No solution', ['$x = 0$', `$x = ${c - b}$`, 'Every number works'])); }
      return Object.assign({ q: `Solve $${a}(x + ${b}) = ${a}x + ${a*b}$.`, hint: 'Distribute the left side first.',
        s: [`$${a}x + ${a*b} = ${a}x + ${a*b}$`, 'Both sides are identical', 'So every number is a solution.'] },
        mc(r, 'Every number works', ['No solution', `$x = ${b}$`, '$x = 0$'])); },
    wordeq(r) { const flat = pick(r,[2.5,3,3.5,4,5]), rate = pick(r,[1.25,1.5,2,2.25,2.5]), m = ri(r,4,15);
      const tot = +(flat + rate * m).toFixed(2);
      return { q: `A taxi charges $\\$${flat.toFixed(2)}$ plus $\\$${rate.toFixed(2)}$ per mile. A ride cost $\\$${tot.toFixed(2)}$. How many miles?`,
        a: String(m), unit: 'miles', hint: `$${flat.toFixed(2)} + ${rate.toFixed(2)}m = ${tot.toFixed(2)}$.`,
        s: [`$${rate.toFixed(2)}m = ${(tot - flat).toFixed(2)}$`, `$m = ${(tot - flat).toFixed(2)} \\div ${rate.toFixed(2)} = ${m}$ miles`] }; }
  },
  inequalities: {
    onestep(r) { const x = ri(r,-12,20), b = ri(r,2,15), sym = pick(r,['<','>','\\leq','\\geq']);
      const plain = sym === '\\leq' ? '<=' : sym === '\\geq' ? '>=' : sym;
      return r() < .5
        ? { q: `Solve $x + ${b} ${sym} ${x + b}$. Enter it like $x${plain}${x}$.`, a: `x${plain}${x}`,
            hint: `Subtract $${b}$ from both sides — the sign does not change.`, s: [`$x ${sym} ${x}$`] }
        : { q: `Solve $x - ${b} ${sym} ${x - b}$. Enter it like $x${plain}${x}$.`, a: `x${plain}${x}`,
            hint: `Add $${b}$ to both sides — the sign does not change.`, s: [`$x ${sym} ${x}$`] }; },
    notation(r) { const sym = pick(r,['<','>','\\leq','\\geq']), v = ri(r,-8,12);
      const closed = sym === '\\leq' || sym === '\\geq';
      return { q: `On a number line, which dot do you use for $x ${sym} ${v}$?`,
        c: ['A closed (filled) dot', 'An open (hollow) dot'], a: closed ? 0 : 1,
        hint: `Is $${v}$ itself a solution?`,
        s: [closed ? `That symbol includes the endpoint, so $${v}$ is a solution and the dot is closed.`
                   : `That symbol leaves out $${v}$ itself, so the dot is open.`] }; },
    parens(r) { const a = ri(r,2,5), x = ri(r,-6,10), c = ri(r,-8,8), sym = pick(r,['<','>','\\leq','\\geq']);
      const plain = sym === '\\leq' ? '<=' : sym === '\\geq' ? '>=' : sym;
      return { q: `Solve $${a}(x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}) ${sym} ${a * (x + c)}$. Enter it like $x${plain}${x}$.`,
        a: `x${plain}${x}`, hint: `Divide both sides by $${a}$ first — it is positive, so nothing flips.`,
        s: [`$x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} ${sym} ${x + c}$`, `$x ${sym} ${x}$`] }; },
    word(r) { const budget = pick(r,[60,75,85,100,120]), fixed = pick(r,[18,22,25,28,30]), each = pick(r,[9,12,14,15]);
      const n = Math.floor((budget - fixed) / each);
      return { q: `${pick(r, NAMES)} has $\\$${budget}$. After buying a $\\$${fixed}$ jacket, T-shirts cost $\\$${each}$ each. At most how many T-shirts?`,
        a: String(n), unit: 'shirts', hint: `$${fixed} + ${each}t \\leq ${budget}$, then round DOWN.`,
        s: [`$${each}t \\leq ${budget - fixed}$`, `$t \\leq ${+((budget - fixed) / each).toFixed(2)}$`,
            `Part of a shirt is no use, so $${n}$.`] }; },
    bothsides(r) { const a = ri(r,4,9), c = ri(r,2,a - 1), x = ri(r,-8,12), b = ri(r,-10,12), sym = pick(r,['<','>','\\leq','\\geq']);
      const plain = sym === '\\leq' ? '<=' : sym === '\\geq' ? '>=' : sym;
      const d = (a - c) * x + b;
      return { q: `Solve $${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} ${sym} ${c}x ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}$. Enter it like $x${plain}${x}$.`,
        a: `x${plain}${x}`, hint: `Subtract $${c}x$ from both sides — no flip, you are not dividing by a negative.`,
        s: [`$${a - c}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} ${sym} ${d}$`, `$${a - c}x ${sym} ${(a - c) * x}$`, `$x ${sym} ${x}$`] }; },
    compound(r) { const a = ri(r,2,4), lo = ri(r,-6,2), hi = lo + ri(r,3,8), b = ri(r,1,9);
      return { q: `How many integers satisfy $${a*lo - b} \\leq ${a}x - ${b} < ${a*hi - b}$?`,
        a: String(hi - lo), unit: 'integers', hint: 'Solve for $x$ first, then count the whole numbers in the range.',
        s: [`Add $${b}$ everywhere: $${a*lo} \\leq ${a}x < ${a*hi}$`, `Divide by $${a}$: $${lo} \\leq x < ${hi}$`,
            `Integers from $${lo}$ to $${hi - 1}$`, `That is $${hi - lo}$ values — note $${hi}$ is excluded.`] }; }
  },
  scale: {
    map(r) { const km = pick(r,[2,2.5,3,4,5,6]), cm = ri(r,3,15);
      return { q: `On a map, $1$ cm represents $${km}$ km. How many km does $${cm}$ cm represent?`,
        a: String(+(km * cm).toFixed(2)).replace(/\.00$/, ''), unit: 'km', hint: `Multiply by $${km}$.`,
        s: [`$${cm} \\times ${km} = ${+(km * cm).toFixed(2)}$ km`] }; },
    volscale(r) { const k = pick(r,[2,3,4,5,6,10]), shape = pick(r,['cube','prism','cylinder','pyramid']);
      return { q: `A ${shape}'s lengths are all multiplied by $${k}$. Its volume is multiplied by what?`,
        a: String(k*k*k), hint: 'Volume uses three dimensions, so the factor applies three times.',
        s: [`$k^3 = ${k}^3 = ${k*k*k}$`, `A $1$-cube holds $1$; a $${k}$-cube holds $${k*k*k}$.`] }; }
  },
  area2d: {
    parallelogram(r) { const b = ri(r,4,16), h = ri(r,3,14), slant = h + ri(r,1,5);
      return { q: `A parallelogram has base $${b}$ and perpendicular height $${h}$. Its slanted side measures $${slant}$. Find its area.`,
        a: String(b * h), hint: 'Use the perpendicular height, not the slanted side.',
        s: [`$${b} \\times ${h} = ${b*h}$`, `The $${slant}$ is a distractor — the formula wants the perpendicular height.`] }; },
    composite(r) { const L = ri(r,8,16), W = ri(r,5,12);
      const a = ri(r,2,Math.min(L,W) - 2), b = ri(r,2,Math.min(L,W) - 2);
      return { q: `A $${L} \\times ${W}$ rectangle has a $${a} \\times ${b}$ rectangle cut from one corner. Find the remaining area.`,
        a: String(L*W - a*b), hint: 'Find the whole, then subtract the piece removed.',
        s: [`$${L} \\times ${W} = ${L*W}$`, `$${a} \\times ${b} = ${a*b}$`, `$${L*W} - ${a*b} = ${L*W - a*b}$`] }; }
  },
  sections3d: {
    slice(r) { const cases = [
        { q: 'A cube is sliced parallel to one of its faces. What shape is the cross section?', right: 'A square', w: ['A triangle','A circle','A hexagon'], s: ['The plane meets four faces at right angles, giving a square identical to that face.'] },
        { q: 'A cylinder is sliced parallel to its base. What shape is the cross section?', right: 'A circle', w: ['A rectangle','An oval','A triangle'], s: ['A circle, the same size as the base, however deep you cut.'] },
        { q: 'A cylinder is sliced straight down through its central axis. What shape appears?', right: 'A rectangle', w: ['A circle','A triangle','An oval'], s: ['As tall as the cylinder and as wide as the full diameter.'] },
        { q: 'A square pyramid is sliced parallel to its base. What shape is the cross section?', right: 'A square', w: ['A triangle','A trapezoid','A pentagon'], s: ['Parallel cuts copy the base shape — smaller the higher you cut.'] },
        { q: 'A square pyramid is sliced vertically through its apex. What shape appears?', right: 'A triangle', w: ['A square','A trapezoid','A circle'], s: ['The cut passes through the point at the top, so you get a triangle.'] },
        { q: 'A single flat cut slices off one corner of a cube. What shape is the new face?', right: 'A triangle', w: ['A square','A pentagon','A hexagon'], s: ['Three faces meet at a corner, so the plane crosses three faces — a triangle.'] },
        { q: 'A cone is sliced parallel to its base. What shape is the cross section?', right: 'A circle', w: ['A triangle','A trapezoid','An oval'], s: ['A circle — smaller the closer you cut to the tip.'] }];
      const c = pick(r, cases);
      return Object.assign({ q: c.q, hint: 'Count which faces the plane actually passes through.', s: c.s }, mc(r, c.right, c.w)); },
    solids(r) { const cases = [
        ['How many faces does a cube have?', '6', 'faces', 'Top, bottom, and four sides.'],
        ['How many edges does a cube have?', '12', 'edges', 'Four on top, four on the bottom, four verticals.'],
        ['How many vertices does a cube have?', '8', 'vertices', 'Four corners on top, four below.'],
        ['How many faces does a square pyramid have?', '5', 'faces', 'A square base plus four triangles.'],
        ['How many edges does a triangular prism have?', '9', 'edges', 'Three round each triangle, three joining them.'],
        ['How many faces does a triangular prism have?', '5', 'faces', 'Two triangles plus three rectangles.'],
        ['How many vertices does a square pyramid have?', '5', 'vertices', 'Four round the base plus the apex.'],
        ['How many edges does a square pyramid have?', '8', 'edges', 'Four round the base, four rising to the apex.'],
        ['How many vertices does a triangular prism have?', '6', 'vertices', 'Three on each triangle.'],
        ['How many faces does a hexagonal prism have?', '8', 'faces', 'Two hexagons plus six rectangles.'],
        ['How many edges does a hexagonal prism have?', '18', 'edges', 'Six round each hexagon, six joining them.'],
        ['How many faces does a tetrahedron have?', '4', 'faces', 'Four triangles — it is a triangular pyramid.']];
      const c = pick(r, cases);
      return { q: c[0], a: c[1], unit: c[2], hint: c[3], s: [c[3], `Answer: $${c[1]}$`] }; },
    measure(r) { const rad = ri(r,2,8), h = ri(r,5,14);
      return { q: `A cylinder has radius $${rad}$ cm and height $${h}$ cm. It is cut vertically through its axis. Find the area of the cross section.`,
        a: String(2 * rad * h), unit: 'cm²', hint: 'The width of the rectangle is the DIAMETER, not the radius.',
        s: [`Height $= ${h}$ cm`, `Width $= 2 \\times ${rad} = ${2*rad}$ cm`, `$${h} \\times ${2*rad} = ${2*rad*h}$ cm$^2$`] }; },
    nets(r) { const cases = [
        { q: 'A cube net is a row of four squares $A$, $B$, $C$, $D$, with $E$ above $B$ and $F$ below $B$. Which face ends up opposite $A$?', right: '$C$', w: ['$B$','$D$','$E$'], s: ['In a row of four, faces two apart end up opposite each other.','So $A$ is opposite $C$, $B$ opposite $D$, and $E$ opposite $F$.'] },
        { q: 'A cube net is a row of four squares $A$, $B$, $C$, $D$, with $E$ above $B$ and $F$ below $B$. Which face ends up opposite $B$?', right: '$D$', w: ['$A$','$C$','$F$'], s: ['Faces two apart in the row pair up.','$B$ and $D$ are two apart.'] },
        { q: 'A cube net is a row of four squares $A$, $B$, $C$, $D$, with $E$ above $B$ and $F$ below $B$. Which face ends up opposite $E$?', right: '$F$', w: ['$A$','$B$','$D$'], s: ['$A$–$C$ and $B$–$D$ pair up along the row.','That leaves $E$ opposite $F$.'] },
        { q: 'How many distinct nets can fold into a cube?', right: '$11$', w: ['$6$','$8$','$14$'], s: ['There are exactly $11$.','Six have a row of four squares; the rest use rows of three or a staircase.'] }];
      const c = pick(r, cases);
      return Object.assign({ q: c.q, hint: 'Fold it in your head one square at a time.', s: c.s }, mc(r, c.right, c.w)); }
  },
  volume: {
    pyramid(r) { const B = pick(r,[12,18,24,27,36,48]), h = pick(r,[3,6,9,12]);
      return { q: `A pyramid has base area $${B}$ and height $${h}$. Find its volume.`,
        a: String(B * h / 3), hint: 'A pyramid holds one third of the prism with the same base and height.',
        s: ['$V = \\dfrac{1}{3}Bh$', `$= \\dfrac{1}{3} \\times ${B} \\times ${h} = ${B*h/3}$`] }; },
    scaling(r) { const k = pick(r,[2,3,4]), e = ri(r,2,5);
      return { q: `A cube has edge $${e}$. If the edge is multiplied by $${k}$, how many times larger is the new volume?`,
        a: String(k*k*k), hint: 'All three dimensions grow at once.',
        s: [`Old volume: $${e}^3 = ${Math.pow(e,3)}$`, `New edge $${e*k}$, new volume $${Math.pow(e*k,3)}$`,
            `$${Math.pow(e*k,3)} \\div ${Math.pow(e,3)} = ${k*k*k}$`] }; }
  },
  construction: {
    parallel(r) { const a = ri(r,25,85), kind = pick(r,['corresponding','alternate interior','co-interior']);
      const co = kind === 'co-interior', ans = co ? 180 - a : a;
      return { q: `Two parallel lines are cut by a transversal. One angle is $${a}°$. Find the ${kind} angle.`,
        a: String(ans), unit: '°',
        hint: co ? 'Co-interior angles are supplementary.' : `${ANG(kind)} angles are equal.`,
        s: [co ? `They sum to $180°$, so $180 - ${a} = ${ans}°$.` : `${ANG(kind)} angles are equal, so $${ans}°$.`] }; },
    construct(r) { const cases = [
        { q: 'When bisecting an angle with a compass, why must the compass width stay the same for the two final arcs?', right: 'So the crossing point is the same distance from both sides', w: ['So the drawing looks neat','So the arcs fit on the page','It does not actually matter'], s: ['Equal radii put the crossing point the same distance from each side of the angle.','A point equidistant from both sides lies exactly on the bisector — that is what makes it a proof.'] },
        { q: 'Given only the three angle measures of a triangle, how many different triangles fit?', right: 'Infinitely many', w: ['Exactly one','Exactly two','None'], s: ['Angles fix the shape but not the size.','Every such triangle is similar to the others, at any scale you like.'] },
        { q: 'Given three side lengths that satisfy the triangle inequality, how many different triangles fit?', right: 'Exactly one', w: ['Exactly two','Infinitely many','None'], s: ['Three sides pin a triangle down completely — this is why SSS works.'] },
        { q: 'Bisecting a segment with equal arcs struck from each endpoint also produces what?', right: 'A right angle at the midpoint', w: ['A $60°$ angle','A parallel line','An equilateral triangle'], s: ['The line joining the two arc crossings is the perpendicular bisector.','It cuts the segment in half AND at a right angle — you get the right angle for free.'] }];
      const c = pick(r, cases);
      return Object.assign({ q: c.q, hint: 'Think about what the equal compass radii guarantee.', s: c.s }, mc(r, c.right, c.w)); }
  }
  };
  for (const u in MORE) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE[u]); }


  /* ---- generators for the Math 7 units ---- */
  const TRIPLES = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[20,21,29],[6,8,10],[9,12,15],
                   [10,24,26],[12,16,20],[15,20,25],[12,35,37],[16,30,34],[14,48,50]];
  const NONSQ = [2,3,5,6,7,10,11,13,14,15];
  const MORE2 = {
  exponents: {
    evaluate(r) { const b = ri(r,2,9), e = ri(r,2,4);
      return { q: `Evaluate $${b}^${e}$.`, a: String(Math.pow(b,e)),
        hint: `${e} ${b}s multiplied together — not $${b} \\times ${e}$.`,
        s: [`$${Array(e).fill(b).join(' \\times ')} = ${Math.pow(b,e)}$`] }; },
    zero(r) { const b = ri(r,2,15), one = r() < .5;
      return { q: `Evaluate $${b}^${one ? 1 : 0}$.`, a: one ? String(b) : '1',
        hint: one ? 'One factor of the base.' : 'Any non-zero number to the power zero.',
        s: one ? [`$${b}^1 = ${b}$`] : [`Follow the pattern down: $${b}^2$, $${b}^1 = ${b}$, then $${b}^0 = 1$.`] }; },
    product(r) { const b = ri(r,2,6), m = ri(r,2,4), n = ri(r,2,4);
      return { q: `Simplify $${b}^${m} \\cdot ${b}^${n}$ and give its value.`, a: String(Math.pow(b,m+n)),
        hint: 'Same base multiplied, so add the exponents.',
        s: [`$${b}^{${m}+${n}} = ${b}^{${m+n}}$`, `$= ${Math.pow(b,m+n)}$`] }; },
    quotient(r) { const b = ri(r,2,6), n = ri(r,1,3), m = n + ri(r,1,4);
      return { q: `Simplify $\\dfrac{${b}^${m}}{${b}^${n}}$ and give its value.`, a: String(Math.pow(b,m-n)),
        hint: 'Dividing subtracts the exponents.',
        s: [`$${b}^{${m}-${n}} = ${b}^{${m-n}}$`, `$= ${Math.pow(b,m-n)}$`] }; },
    power(r) { const b = ri(r,2,4), m = ri(r,2,3), n = ri(r,2,3);
      return { q: `Simplify $(${b}^${m})^${n}$ and give its value.`, a: String(Math.pow(b,m*n)),
        hint: 'A power of a power multiplies the exponents.',
        s: [`$${b}^{${m} \\times ${n}} = ${b}^{${m*n}}$`, `$= ${Math.pow(b,m*n)}$`] }; },
    negative(r) { const b = ri(r,2,6), e = ri(r,1,3);
      return { q: `Evaluate $${b}^{-${e}}$.`, a: fs(1, Math.pow(b,e)),
        hint: 'A negative exponent flips it under a $1$. The answer stays positive.',
        s: [`$${b}^{-${e}} = \\dfrac{1}{${b}^${e}}$`, `$= ${tex(1, Math.pow(b,e))}$`] }; },
    scientific(r) { const a = ri(r,10,99) / 10, e = ri(r,2,7), big = r() < .5;
      const val = big ? a * Math.pow(10,e) : a / Math.pow(10,e);
      const shown = big ? val.toLocaleString('en-US') : val.toFixed(e + 1).replace(/0+$/,'');
      return { q: `Write $${shown}$ in scientific notation. Enter just the exponent of $10$.`,
        a: String(big ? e : -e), hint: big ? 'Big number, so the exponent is positive.' : 'Small number, so the exponent is negative.',
        s: [`Put one non-zero digit in front: $${a}$`, `The point moves $${e}$ places`,
            `$${a} \\times 10^{${big ? e : -e}}$`] }; },
    scicalc(r) { const a = ri(r,2,4), b = ri(r,2,4), m = ri(r,2,5), n = ri(r,-3,2);
      const coef = a * b, exp = m + n;
      const norm = coef >= 10 ? [coef / 10, exp + 1] : [coef, exp];
      return { q: `Compute $(${a} \\times 10^{${m}})(${b} \\times 10^{${n}})$ in scientific notation. Enter just the exponent of $10$.`,
        a: String(norm[1]), hint: 'Multiply the fronts and add the exponents — then check the front is between $1$ and $10$.',
        s: [`$${a} \\times ${b} = ${coef}$`, `$10^{${m}} \\cdot 10^{${n}} = 10^{${exp}}$`,
            coef >= 10 ? `$${coef} \\times 10^{${exp}} = ${norm[0]} \\times 10^{${norm[1]}}$` : `$${coef} \\times 10^{${exp}}$`] }; },
    compare(r) { const b1 = ri(r,2,4), e1 = ri(r,5,10), b2 = ri(r,5,12), e2 = ri(r,2,4);
      const v1 = Math.pow(b1,e1), v2 = Math.pow(b2,e2);
      if (v1 === v2) return this.compare(R(ri(r,1,1e9)));
      const first = v1 > v2;
      return Object.assign({ q: `Which is larger, $${b1}^{${e1}}$ or $${b2}^{${e2}}$?`, hint: 'Work out both values.',
        s: [`$${b1}^{${e1}} = ${v1}$`, `$${b2}^{${e2}} = ${v2}$`, `$${Math.max(v1,v2)} > ${Math.min(v1,v2)}$`] },
        mc(r, first ? `$${b1}^{${e1}}$` : `$${b2}^{${e2}}$`, [first ? `$${b2}^{${e2}}$` : `$${b1}^{${e1}}$`, 'They are equal'])); }
  },
  problemsolving: {
    backwards(r) { const n = ri(r,2,20), a = ri(r,2,6), b = ri(r,1,15);
      return { q: `A number is multiplied by $${a}$, then $${b}$ is added, giving $${a*n+b}$. Find the number.`,
        a: String(n), hint: 'Undo in reverse: subtract first, then divide.',
        s: [`$${a*n+b} - ${b} = ${a*n}$`, `$${a*n} \\div ${a} = ${n}$`, `Check: $${n} \\times ${a} + ${b} = ${a*n+b}$ &check;`] }; },
    pattern(r) { const kind = pick(r,['arith','square','geo']);
      if (kind === 'square') { const k = ri(r,1,6);
        const t = [k,k+1,k+2,k+3].map(x => x*x);
        return { q: `What comes next in $${t.join('$, $')}, \\ldots$?`, a: String((k+4)*(k+4)),
          hint: 'These are perfect squares.', s: [`$${k}^2, ${k+1}^2, \\ldots$`, `Next is $${k+4}^2 = ${(k+4)*(k+4)}$`] }; }
      if (kind === 'geo') { const a = ri(r,1,4), m = pick(r,[2,3,4]);
        const t = [a, a*m, a*m*m, a*m*m*m];
        return { q: `What comes next in $${t.join('$, $')}, \\ldots$?`, a: String(a*Math.pow(m,4)),
          hint: 'This one multiplies rather than adds.', s: [`Each term is $${m}$ times the one before`, `$${t[3]} \\times ${m} = ${a*Math.pow(m,4)}$`] }; }
      const f = ri(r,1,12), d = ri(r,2,9), t = [0,1,2,3].map(i => f + i*d);
      return { q: `What comes next in $${t.join('$, $')}, \\ldots$?`, a: String(f + 4*d),
        hint: 'How much is added each time?', s: [`It grows by $${d}$`, `$${t[3]} + ${d} = ${f + 4*d}$`] }; },
    count(r) { const a = ri(r,2,7), b = ri(r,2,7);
      return { q: `You have $${a}$ shirts and $${b}$ pairs of trousers. How many different outfits?`,
        a: String(a*b), unit: 'outfits', hint: 'Multiply the choices at each stage.', s: [`$${a} \\times ${b} = ${a*b}$`] }; },
    simpler(r) { const n = ri(r,5,15), hands = r() < .5;
      return hands
        ? { q: `At a gathering of $${n}$ people, everyone shakes hands with everyone else once. How many handshakes?`,
            a: String(n*(n-1)/2), unit: 'handshakes', hint: 'Try $3$ people, then $4$, and look for the pattern.',
            s: [`Each of $${n}$ shakes $${n-1}$ hands: $${n*(n-1)}$`, 'Each handshake was counted twice', `$${n*(n-1)} \\div 2 = ${n*(n-1)/2}$`] }
        : { q: `How many diagonals does a polygon with $${n}$ sides have?`, a: String(n*(n-3)/2), unit: 'diagonals',
            hint: 'Each vertex joins to all but itself and its two neighbours. Then halve.',
            s: [`Each vertex gives $${n} - 3 = ${n-3}$ diagonals`, `$${n} \\times ${n-3} = ${n*(n-3)}$, counting each twice`,
                `$${n*(n-3)} \\div 2 = ${n*(n-3)/2}$`] }; },
    guesscheck(r) { const hi = pick(r,[8,9,10,12]), lo = pick(r,[4,5,6]), tot = ri(r,15,30), nHi = ri(r,4,tot-4);
      if (hi <= lo) return this.guesscheck(R(ri(r,1,1e9)));
      const money = nHi*hi + (tot-nHi)*lo;
      return { q: `Adult tickets cost $\\$${hi}$ and child tickets $\\$${lo}$. $${tot}$ tickets sold for $\\$${money}$. How many adults?`,
        a: String(nHi), unit: 'adults', hint: `All children would be $\\$${tot*lo}$. Each adult swapped in adds $\\$${hi-lo}$.`,
        s: [`All $${tot}$ as children: $\\$${tot*lo}$`, `We need $\\$${money}$, which is $\\$${money - tot*lo}$ more`,
            `Each swap adds $${hi} - ${lo} = ${hi-lo}$`, `$${money - tot*lo} \\div ${hi-lo} = ${nHi}$ adults`] }; },
    consecutive(r) { const n = ri(r,5,45);
      return { q: `Two consecutive whole numbers add to $${2*n+1}$. What is the smaller one?`, a: String(n),
        hint: 'Call them $n$ and $n+1$.', s: [`$2n + 1 = ${2*n+1}$`, `$n = ${n}$`, `They are $${n}$ and $${n+1}$.`] }; }
  },
  squareroots: {
    root(r) { const n = ri(r,2,25);
      return { q: `Find $\\sqrt{${n*n}}$.`, a: String(n), hint: 'What number times itself gives this?',
        s: [`$${n} \\times ${n} = ${n*n}$`] }; },
    square(r) { const n = ri(r,2,25);
      return { q: `Evaluate $${n}^2$.`, a: String(n*n), hint: 'The number times itself.', s: [`$${n} \\times ${n} = ${n*n}$`] }; },
    decimal(r) { const n = pick(r,[1,2,3,4,5,6,7,8,9,15,25]);
      const root = n / 10, val = +(root*root).toFixed(4);
      return { q: `Find $\\sqrt{${val}}$.`, a: String(root), hint: 'What times itself gives this?',
        s: [`$${root} \\times ${root} = ${val}$`] }; },
    perfect(r) { const yes = r() < .5, n = yes ? ri(r,2,20) ** 2 : (() => { let x; do { x = ri(r,5,400); } while (Number.isInteger(Math.sqrt(x))); return x; })();
      const lo = Math.floor(Math.sqrt(n));
      return { q: `Is $${n}$ a perfect square?`, c: ['Yes','No'], a: yes ? 0 : 1,
        hint: 'Is there a whole number that squares to it?',
        s: yes ? [`$${Math.sqrt(n)}^2 = ${n}$, so yes.`]
               : [`$${lo}^2 = ${lo*lo}$ and $${lo+1}^2 = ${(lo+1)*(lo+1)}$`, `$${n}$ sits between them, so no.`] }; },
    estimate(r) { let n; do { n = ri(r,10,400); } while (Number.isInteger(Math.sqrt(n)));
      const lo = Math.floor(Math.sqrt(n));
      return { q: `Estimate $\\sqrt{${n}}$ to the nearest whole number.`, a: String(Math.round(Math.sqrt(n))),
        hint: `It sits between $${lo}$ and $${lo+1}$. Which is it nearer?`,
        s: [`$${lo}^2 = ${lo*lo}$ and $${lo+1}^2 = ${(lo+1)*(lo+1)}$`,
            `$${n}$ is nearer $${Math.round(Math.sqrt(n))**2}$`, `$\\sqrt{${n}} \\approx ${Math.sqrt(n).toFixed(2)}$`] }; },
    simplify(r) { const k = ri(r,2,7), m = pick(r, NONSQ);
      return { q: `Simplify $\\sqrt{${k*k*m}}$ into the form $a\\sqrt{${m}}$. What is $a$?`, a: String(k),
        hint: `Find the largest perfect square dividing $${k*k*m}$.`,
        s: [`$${k*k*m} = ${k*k} \\times ${m}$`, `$\\sqrt{${k*k}} \\times \\sqrt{${m}} = ${k}\\sqrt{${m}}$`] }; },
    solve(r) { const n = ri(r,2,15);
      return Object.assign({ q: `Solve $x^2 = ${n*n}$.`, hint: 'Two numbers square to this.',
        s: [`$${n}^2 = ${n*n}$ and $(-${n})^2 = ${n*n}$`, `An equation keeps both: $x = \\pm ${n}$`,
            `Note $\\sqrt{${n*n}}$ on its own means just $${n}$.`] },
        mc(r, `$x = \\pm ${n}$`, [`$x = ${n}$`, `$x = -${n}$`, `$x = ${n*n}$`])); },
    fraction(r) { const a = ri(r,2,9), b = ri(r,2,12);
      if (a === b) return this.fraction(R(ri(r,1,1e9)));
      return { q: `Find $\\sqrt{\\dfrac{${a*a}}{${b*b}}}$.`, a: fs(a,b),
        hint: 'Take the root of the top and the bottom separately.',
        s: [`$\\dfrac{\\sqrt{${a*a}}}{\\sqrt{${b*b}}} = \\dfrac{${a}}{${b}}$`, `$= ${tex(a,b)}$`] }; }
  },
  realnumbers: {
    classify(r) { const irr = r() < .5;
      const n = irr ? pick(r, NONSQ.concat([17,19,20,21,22,23])) : ri(r,2,15) ** 2;
      return { q: `Classify $\\sqrt{${n}}$.`, c: ['Rational','Irrational'], a: irr ? 1 : 0,
        hint: 'Is the number under the root a perfect square?',
        s: irr ? [`$${n}$ is not a perfect square`, `$\\sqrt{${n}} = ${Math.sqrt(n).toFixed(4)}\\ldots$ never repeats, so irrational.`]
               : [`$\\sqrt{${n}} = ${Math.sqrt(n)}$, a whole number, so rational.`] }; },
    repeating(r) { const two = r() < .5;
      if (two) { const ab = ri(r,10,98); if (ab % 11 === 0) return this.repeating(R(ri(r,1,1e9)));
        const [n,d] = frac(ab, 99);
        return { q: `Write $0.\\overline{${ab}}$ as a fraction in lowest terms.`, a: fs(n,d),
          hint: 'Two-digit block, so multiply by $100$.',
          s: [`Let $x = 0.${ab}${ab}\\ldots$, so $100x = ${ab}.${ab}\\ldots$`, `$99x = ${ab}$`,
              `$x = \\dfrac{${ab}}{99} = ${tex(n,d)}$`] }; }
      const a = ri(r,1,8), [n,d] = frac(a, 9);
      return { q: `Write $0.\\overline{${a}}$ as a fraction in lowest terms.`, a: fs(n,d),
        hint: 'One-digit block, so multiply by $10$.',
        s: [`$10x = ${a}.${a}${a}\\ldots$ and $x = 0.${a}${a}\\ldots$`, `$9x = ${a}$`, `$x = \\dfrac{${a}}{9} = ${tex(n,d)}$`] }; },
    order(r) { const k = ri(r,3,9);
      const opts = [{ t: `$\\dfrac{${k}}{${k+1}}$`, v: k/(k+1) },
                    { t: `$${(k/(k+1) - 0.06).toFixed(2)}$`, v: +(k/(k+1) - 0.06).toFixed(2) },
                    { t: `$\\sqrt{${(+(k/(k+1) + 0.05).toFixed(2)) ** 2 ? ((k/(k+1) + 0.05) ** 2).toFixed(4) : 0}}$`, v: k/(k+1) + 0.05 }];
      const best = opts.reduce((a,b) => a.v > b.v ? a : b);
      return Object.assign({ q: `Which is largest?`, hint: 'Put them all into decimals first.',
        s: opts.map(o => `${o.t} $\\approx ${o.v.toFixed(3)}$`).concat([`Largest is ${best.t}.`]) },
        mc(r, best.t, opts.filter(o => o !== best).map(o => o.t))); }
  },
  gcflcm: {
    gcf(r) { const g = pick(r,[2,3,4,5,6,7,8,9,12,15]), a = g*ri(r,2,9), b = g*ri(r,2,9);
      const G = (x,y) => y ? G(y, x%y) : x;
      const real = G(a,b);
      return { q: `Find the GCF of $${a}$ and $${b}$.`, a: String(real),
        hint: 'Factorise both, then take shared primes at their lowest powers.',
        s: [`Factors shared by $${a}$ and $${b}$`, `The greatest is $${real}$`] }; },
    lcm(r) { const a = ri(r,4,20), b = ri(r,4,20);
      const G = (x,y) => y ? G(y, x%y) : x;
      const l = a*b/G(a,b);
      return { q: `Find the LCM of $${a}$ and $${b}$.`, a: String(l),
        hint: 'Every prime at its highest power — or list multiples of the larger.',
        s: [`GCF is $${G(a,b)}$`, `LCM $= \\dfrac{${a} \\times ${b}}{${G(a,b)}} = ${l}$`] }; },
    primefact(r) { const opts = [[36,'$2^2 \\cdot 3^2$'],[24,'$2^3 \\cdot 3$'],[60,'$2^2 \\cdot 3 \\cdot 5$'],
        [72,'$2^3 \\cdot 3^2$'],[100,'$2^2 \\cdot 5^2$'],[90,'$2 \\cdot 3^2 \\cdot 5$'],[48,'$2^4 \\cdot 3$'],
        [54,'$2 \\cdot 3^3$'],[80,'$2^4 \\cdot 5$'],[126,'$2 \\cdot 3^2 \\cdot 7$'],[84,'$2^2 \\cdot 3 \\cdot 7$']];
      const c = pick(r, opts), wrong = opts.filter(o => o[0] !== c[0]).slice(0,3).map(o => o[1]);
      return Object.assign({ q: `What is the prime factorisation of $${c[0]}$?`,
        hint: 'Break it down until every factor is prime.', s: [`$${c[0]} = $ ${c[1]}`] }, mc(r, c[1], wrong)); },
    word(r) { const useLcm = r() < .5, a = ri(r,4,18), b = ri(r,4,18);
      const G = (x,y) => y ? G(y, x%y) : x;
      return useLcm
        ? { q: `Two lighthouses flash every $${a}$ and $${b}$ seconds, together right now. After how many seconds do they next flash together?`,
            a: String(a*b/G(a,b)), unit: 'sec', hint: 'The next shared moment is later, so you want the LCM.',
            s: [`LCM of $${a}$ and $${b}$`, `$= ${a*b/G(a,b)}$ seconds`] }
        : { q: `A florist has $${a*G(a,b)===0?a:a*3}$ roses and $${b*3}$ tulips and wants identical bunches using every flower. What is the greatest number of bunches?`,
            a: String(3*G(a,b)), unit: 'bunches', hint: 'The answer must divide both counts, so it is smaller — GCF.',
            s: [`GCF of $${a*3}$ and $${b*3}$`, `$= ${3*G(a,b)}$ bunches`] }; },
    product(r) { const g = pick(r,[2,3,4,6,8,12]), m = ri(r,2,7), n = ri(r,2,7);
      const G = (x,y) => y ? G(y, x%y) : x;
      if (G(m,n) !== 1) return this.product(R(ri(r,1,1e9)));
      const a = g*m, b = g*n, l = g*m*n;
      return { q: `Two numbers have GCF $${g}$ and LCM $${l}$. One of them is $${a}$. Find the other.`,
        a: String(b), hint: 'GCF $\\times$ LCM $=$ the product of the two numbers.',
        s: [`$${g} \\times ${l} = ${g*l}$`, `$${g*l} \\div ${a} = ${b}$`] }; }
  },
  measurement: {
    convert(r) { const k = pick(r, [['feet','inches',12],['yards','feet',3],['hours','minutes',60],
        ['minutes','seconds',60],['gallons','quarts',4],['pounds','ounces',16],['weeks','days',7]]);
      const n = ri(r,2,15);
      return { q: `Convert $${n}$ ${k[0]} to ${k[1]}.`, a: String(n*k[2]), unit: k[1],
        hint: `$1$ ${k[0].replace(/s$/,'')} $= ${k[2]}$ ${k[1]}.`, s: [`$${n} \\times ${k[2]} = ${n*k[2]}$ ${k[1]}`] }; },
    metric(r) { const k = pick(r, [['m','cm',100],['km','m',1000],['cm','mm',10],['m','mm',1000],['kg','g',1000],['L','mL',1000]]);
      const up = r() < .5, n = up ? ri(r,2,50)/10 : ri(r,2,90) * k[2] / 10;
      return up
        ? { q: `Convert $${n}$ ${k[0]} to ${k[1]}.`, a: String(+(n*k[2]).toFixed(4)), unit: k[1],
            hint: `$1$ ${k[0]} $= ${k[2]}$ ${k[1]}. A smaller unit gives a bigger number.`,
            s: [`$${n} \\times ${k[2]} = ${+(n*k[2]).toFixed(4)}$ ${k[1]}`] }
        : { q: `Convert $${n}$ ${k[1]} to ${k[0]}.`, a: String(+(n/k[2]).toFixed(4)), unit: k[0],
            hint: `$${k[2]}$ ${k[1]} $= 1$ ${k[0]}. A bigger unit gives a smaller number.`,
            s: [`$${n} \\div ${k[2]} = ${+(n/k[2]).toFixed(4)}$ ${k[0]}`] }; },
    perimeter(r) { const l = ri(r,4,20), w = ri(r,3,18);
      return { q: `A rectangle has perimeter $${2*(l+w)}$ and length $${l}$. Find its width.`, a: String(w),
        hint: '$2l + 2w = P$.', s: [`$${2*l} + 2w = ${2*(l+w)}$`, `$2w = ${2*w}$, so $w = ${w}$`] }; },
    area(r) { const kind = pick(r,['rect','tri','trap']);
      if (kind === 'tri') { const b = ri(r,2,12)*2, h = ri(r,3,15);
        return { q: `Find the area of a triangle with base $${b}$ and perpendicular height $${h}$.`,
          a: String(b*h/2), hint: '$A = \\dfrac{1}{2}bh$.', s: [`$\\dfrac{1}{2}(${b})(${h}) = ${b*h/2}$`] }; }
      if (kind === 'trap') { const b1 = ri(r,3,12), b2 = b1 + ri(r,2,10), h = ri(r,2,7)*2;
        return { q: `A trapezoid has parallel sides $${b1}$ and $${b2}$ and height $${h}$. Find its area.`,
          a: String((b1+b2)/2*h), hint: 'Average the parallel sides, then multiply by the height.',
          s: [`$\\dfrac{${b1} + ${b2}}{2} = ${(b1+b2)/2}$`, `$${(b1+b2)/2} \\times ${h} = ${(b1+b2)/2*h}$`] }; }
      const l = ri(r,4,18), w = ri(r,3,16);
      return { q: `Find the area of a $${l}$ m by $${w}$ m rectangle.`, a: String(l*w), unit: 'm²',
        hint: 'Length times width.', s: [`$${l} \\times ${w} = ${l*w}$ m$^2$`] }; },
    sqconvert(r) { const n = ri(r,2,30);
      return { q: `Convert $${n}$ m$^2$ to square centimetres.`, a: String(n*10000), unit: 'cm²',
        hint: 'Both dimensions convert, so the factor is $100^2$, not $100$.',
        s: ['$1$ m$^2 = 100 \\times 100 = 10{,}000$ cm$^2$', `$${n} \\times 10{,}000 = ${(n*10000).toLocaleString('en-US')}$ cm$^2$`] }; },
    composite(r) { const L = ri(r,8,18), W = ri(r,5,14), a = ri(r,2,4), b = ri(r,2,4);
      return { q: `An L-shape is a $${L} \\times ${W}$ rectangle with a $${a} \\times ${b}$ rectangle cut from one corner. Find its area.`,
        a: String(L*W - a*b), hint: 'Whole rectangle minus the piece removed.',
        s: [`$${L} \\times ${W} = ${L*W}$`, `$${a} \\times ${b} = ${a*b}$`, `$${L*W} - ${a*b} = ${L*W - a*b}$`] }; }
  },
  circles: {
    circumference(r) { const rad = ri(r,2,15);
      return { q: `Find the circumference of a circle with radius $${rad}$. Use $\\pi \\approx 3.14$.`,
        a: String(+(6.28*rad).toFixed(2)).replace(/\.00$/,''), hint: '$C = 2\\pi r$.',
        s: [`$2 \\times 3.14 \\times ${rad} = ${+(6.28*rad).toFixed(2)}$`] }; },
    area(r) { const rad = ri(r,2,12);
      return { q: `Find the area of a circle with radius $${rad}$. Use $\\pi \\approx 3.14$.`,
        a: String(+(3.14*rad*rad).toFixed(2)).replace(/\.00$/,''), hint: '$A = \\pi r^2$ — square the radius first.',
        s: [`$${rad}^2 = ${rad*rad}$`, `$3.14 \\times ${rad*rad} = ${+(3.14*rad*rad).toFixed(2)}$`] }; },
    parts(r) { const d = ri(r,2,20)*2, toR = r() < .5;
      return toR
        ? { q: `A circle has diameter $${d}$. Find its radius.`, a: String(d/2), hint: 'Half the diameter.', s: [`$${d} \\div 2 = ${d/2}$`] }
        : { q: `A circle has radius $${d/2}$. Find its diameter.`, a: String(d), hint: 'Twice the radius.', s: [`$${d/2} \\times 2 = ${d}$`] }; },
    backwards(r) { const rad = ri(r,2,15), fromC = r() < .5;
      return fromC
        ? { q: `A circle has circumference $${+(6.28*rad).toFixed(2)}$. Find its radius. Use $\\pi \\approx 3.14$.`,
            a: String(rad), hint: 'Divide by $2\\pi = 6.28$.', s: [`$${+(6.28*rad).toFixed(2)} \\div 6.28 = ${rad}$`] }
        : { q: `A circle has area $${rad*rad}\\pi$. Find its radius.`, a: String(rad),
            hint: '$\\pi r^2 = $ that, so $r^2$ is the number in front.', s: [`$r^2 = ${rad*rad}$`, `$r = ${rad}$`] }; },
    exact(r) { const rad = ri(r,2,12), wantArea = r() < .5;
      return wantArea
        ? { q: `A circle has radius $${rad}$. Find its area in terms of $\\pi$ (enter just the number in front of $\\pi$).`,
            a: String(rad*rad), hint: '$\\pi r^2$.', s: [`$${rad}^2 = ${rad*rad}$`, `$A = ${rad*rad}\\pi$`] }
        : { q: `A circle has radius $${rad}$. Find its circumference in terms of $\\pi$ (enter just the number in front of $\\pi$).`,
            a: String(2*rad), hint: '$2\\pi r$.', s: [`$2 \\times ${rad} = ${2*rad}$`, `$C = ${2*rad}\\pi$`] }; },
    sector(r) { const rad = pick(r,[4,6,8,10,12]), deg = pick(r,[30,45,60,90,120,180,240,270]);
      const frac1 = deg/360, area = frac1*rad*rad;
      return { q: `Find the area of a $${deg}°$ sector of a circle with radius $${rad}$, in terms of $\\pi$ (enter just the number in front of $\\pi$).`,
        a: String(+area.toFixed(4)).replace(/\.0+$/,''), hint: `$\\dfrac{${deg}}{360}$ of the whole circle.`,
        s: [`$\\dfrac{${deg}}{360} = ${+frac1.toFixed(4)}$`, `Whole circle: $${rad*rad}\\pi$`,
            `$${+frac1.toFixed(4)} \\times ${rad*rad}\\pi = ${+area.toFixed(4)}\\pi$`] }; },
    composite(r) { if (r() < .5) {
        const side = ri(r,2,16)*2, circ = +(3.14*(side/2)*(side/2)).toFixed(2);
        return { q: `A circle is inscribed in a square of side $${side}$. Find the area inside the square but outside the circle. Use $\\pi \\approx 3.14$.`,
          a: String(+(side*side - circ).toFixed(2)), hint: 'The circle touches all four sides, so its diameter equals the side.',
          s: [`Square: $${side} \\times ${side} = ${side*side}$`, `Circle: $r = ${side/2}$, area $= ${circ}$`,
              `$${side*side} - ${circ} = ${+(side*side - circ).toFixed(2)}$`] }; }
      const inner = ri(r,2,12), outer = inner + ri(r,1,8);
      return { q: `Two circles share a centre, with radii $${outer}$ and $${inner}$. Find the area of the ring between them, in terms of $\\pi$ (enter just the number in front of $\\pi$).`,
        a: String(outer*outer - inner*inner), hint: 'Subtract the areas, not the radii.',
        s: [`Outer: $${outer*outer}\\pi$, inner: $${inner*inner}\\pi$`,
            `$${outer*outer}\\pi - ${inner*inner}\\pi = ${outer*outer - inner*inner}\\pi$`,
            `Note it is NOT $\\pi(${outer}-${inner})^2$.`] }; }
  },
  graphs: {
    choose(r) { const cases = [
        { q: 'how temperature changes over a day', right: 'Line graph' },
        { q: 'how a monthly budget splits into categories', right: 'Circle graph' },
        { q: 'the populations of five different towns', right: 'Bar graph' },
        { q: 'a plant\'s height measured each week for two months', right: 'Line graph' },
        { q: 'what fraction of students chose each of four lunch options', right: 'Circle graph' },
        { q: 'how many goals each of six players scored', right: 'Bar graph' },
        { q: 'a company\'s sales each quarter for three years', right: 'Line graph' },
        { q: 'how a dollar of tax revenue is divided up', right: 'Circle graph' }];
      const c = pick(r, cases), all = ['Bar graph','Line graph','Circle graph'];
      return Object.assign({ q: `Which graph best shows ${c.q}?`,
        hint: 'Time → line. Parts of a whole → circle. Separate categories → bar.',
        s: [`${c.right} is the right choice here.`] }, mc(r, c.right, all.filter(x => x !== c.right))); },
    readcircle(r) { const tot = pick(r,[200,250,400,500,800,1200,2400]), pct = pick(r,[5,10,15,18,20,25,30,35,40]);
      return { q: `A circle graph shows that $${pct}\\%$ of $${tot.toLocaleString('en-US')}$ people chose one option. How many people is that?`,
        a: String(tot*pct/100), unit: 'people', hint: `$${pct}\\%$ of $${tot}$.`,
        s: [`$${pct/100} \\times ${tot} = ${tot*pct/100}$`] }; },
    estimate(r) { const a = ri(r,11,99)*10 + ri(r,1,9), b = ri(r,11,49);
      const ra = Math.round(a/100)*100, rb = Math.round(b/10)*10;
      return { q: `Estimate $${a} \\times ${b}$ by rounding.`, a: String(ra*rb),
        hint: `Round to $${ra} \\times ${rb}$.`,
        s: [`$${ra} \\times ${rb} = ${ra*rb}$`, `The exact value is $${a*b}$.`] }; },
    misleading(r) { const start = pick(r,[50,60,70,80]), a = start + ri(r,2,8), b = a + ri(r,3,9);
      return { q: `A bar chart has a vertical axis starting at $${start}$ instead of $0$. One bar reaches $${a}$ and another $${b}$, so the second looks far taller. What is the actual difference?`,
        a: String(b-a), hint: 'Read the values, not the bar heights.',
        s: [`$${b} - ${a} = ${b-a}$`, `Only the part above $${start}$ is drawn — $${a-start}$ against $${b-start}$ — which is why one looks so much bigger.`] }; },
    readline(r) { const t0 = ri(r,5,20), hrs = pick(r,[2,3,4,5,6]), rate = ri(r,2,9);
      return { q: `A line graph shows temperature rising from $${t0}°$ to $${t0 + rate*hrs}°$ over $${hrs}$ hours. What is the rate of increase per hour?`,
        a: String(rate), unit: '°/hr', hint: 'Change in temperature over change in time.',
        s: [`$${t0 + rate*hrs} - ${t0} = ${rate*hrs}$ degrees`, `$${rate*hrs} \\div ${hrs} = ${rate}$ degrees per hour`] }; }
  },
  pythagorean: {
    hyp(r) { const t = pick(r, TRIPLES);
      return { q: `A right triangle has legs $${t[0]}$ and $${t[1]}$. Find the hypotenuse.`, a: String(t[2]),
        hint: '$a^2 + b^2 = c^2$.',
        s: [`$${t[0]}^2 + ${t[1]}^2 = ${t[0]**2} + ${t[1]**2} = ${t[2]**2}$`, `$c = \\sqrt{${t[2]**2}} = ${t[2]}$`] }; },
    leg(r) { const t = pick(r, TRIPLES), known = r() < .5 ? 0 : 1, other = known ? 0 : 1;
      return { q: `A right triangle has hypotenuse $${t[2]}$ and one leg $${t[known]}$. Find the other leg.`,
        a: String(t[other]), hint: 'Subtract, because you are finding a leg.',
        s: [`$${t[2]}^2 - ${t[known]}^2 = ${t[2]**2} - ${t[known]**2} = ${t[other]**2}$`,
            `$\\sqrt{${t[other]**2}} = ${t[other]}$`] }; },
    parts(r) { const cases = [
        { q: 'Which side of a right triangle is the hypotenuse?', right: 'The side opposite the right angle',
          w: ['The shortest side','Either of the two legs','The side next to the right angle'],
          s: ['The hypotenuse is opposite the right angle, and always the longest side.'] },
        { q: 'In $a^2 + b^2 = c^2$, what do $a$ and $b$ represent?', right: 'The two legs',
          w: ['The hypotenuse and one leg','Any two sides','The two angles'],
          s: ['$a$ and $b$ are the legs — the sides forming the right angle. $c$ is always the hypotenuse.'] },
        { q: 'The Pythagorean theorem applies to which triangles?', right: 'Right triangles only',
          w: ['All triangles','Isosceles triangles only','Equilateral triangles only'],
          s: ['No right angle, no theorem. It fails for every other kind of triangle.'] }];
      const c = pick(r, cases);
      return Object.assign({ q: c.q, hint: 'Think about which side sits opposite the right angle.', s: c.s }, mc(r, c.right, c.w)); },
    converse(r) { const t = pick(r, TRIPLES), real = r() < .5;
      const sides = real ? t : [t[0], t[1], t[2] + pick(r,[1,2,3])];
      return { q: `Is a triangle with sides $${sides[0]}$, $${sides[1]}$ and $${sides[2]}$ a right triangle?`,
        c: ['Yes','No'], a: real ? 0 : 1, hint: 'Test $a^2 + b^2 = c^2$ with the longest side as $c$.',
        s: [`$${sides[0]}^2 + ${sides[1]}^2 = ${sides[0]**2 + sides[1]**2}$`, `$${sides[2]}^2 = ${sides[2]**2}$`,
            real ? 'Equal, so it is right-angled.' : 'Not equal, so it is not right-angled.'] }; },
    apply(r) { const t = pick(r, TRIPLES), kind = pick(r,['rect','ladder','coords']);
      if (kind === 'rect') return { q: `A rectangle measures $${t[0]}$ by $${t[1]}$. Find the length of its diagonal.`,
        a: String(t[2]), hint: 'The diagonal splits it into two right triangles.',
        s: [`Legs $${t[0]}$ and $${t[1]}$`, `$${t[0]**2} + ${t[1]**2} = ${t[2]**2}$`, `Diagonal $= ${t[2]}$`] };
      if (kind === 'ladder') return { q: `A $${t[2]}$ ft ladder reaches $${t[1]}$ ft up a wall. How far is its foot from the wall?`,
        a: String(t[0]), unit: 'ft', hint: 'The ladder is the hypotenuse; the height is one leg.',
        s: [`$${t[2]**2} - ${t[1]**2} = ${t[0]**2}$`, `$\\sqrt{${t[0]**2}} = ${t[0]}$ ft`] };
      const x = ri(r,1,6), y = ri(r,1,6);
      return { q: `Find the distance between the points $(${x}, ${y})$ and $(${x + t[0]}, ${y + t[1]})$.`,
        a: String(t[2]), hint: 'The horizontal and vertical gaps are the legs.',
        s: [`Horizontal gap: $${t[0]}$`, `Vertical gap: $${t[1]}$`, `$${t[0]**2} + ${t[1]**2} = ${t[2]**2}$, so the distance is $${t[2]}$.`] }; }
  },
  functions: {
    evaluate(r) { const m = ri(r,2,9), b = ri(r,-9,12), x = ri(r,-5,10);
      return { q: `If $f(x) = ${m}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}$, find $f(${x < 0 ? '(' + x + ')' : x})$.`,
        a: String(m*x + b), hint: `Put $${x}$ in place of $x$.`,
        s: [`$${m}(${x}) = ${m*x}$`, `$${m*x} ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${m*x + b}$`] }; },
    slope(r) { const m = ri(r,-6,8) || 3, x1 = ri(r,0,5), x2 = x1 + ri(r,1,6), b = ri(r,-8,10);
      return { q: `Find the slope of the line through $(${x1}, ${m*x1 + b})$ and $(${x2}, ${m*x2 + b})$.`,
        a: String(m), hint: 'Rise over run: $\\dfrac{y_2 - y_1}{x_2 - x_1}$.',
        s: [`$\\dfrac{${m*x2 + b} - ${m*x1 + b}}{${x2} - ${x1}} = \\dfrac{${m*(x2-x1)}}{${x2-x1}}$`, `$= ${m}$`] }; },
    intercept(r) { const m = ri(r,-6,8) || 2, b = ri(r,-9,12), x = ri(r,1,7);
      return { q: `A line has slope $${m}$ and passes through $(${x}, ${m*x + b})$. Find its $y$-intercept.`,
        a: String(b), hint: `Substitute into $y = ${m}x + b$.`,
        s: [`$${m*x + b} = ${m}(${x}) + b$`, `$${m*x + b} = ${m*x} + b$`, `$b = ${b}$`] }; },
    rule(r) { const m = ri(r,2,8), b = ri(r,-6,10);
      const xs = [1,2,3];
      return { q: `A table gives $x = 1, 2, 3$ and $y = ${xs.map(x => m*x + b).join(', ')}$. Write the rule in the form $mx+b$.`,
        a: `${m}x${b >= 0 ? '+' : '-'}${Math.abs(b)}`,
        hint: 'Find the constant jump, then work back to $x = 0$.',
        s: [`Jump is $${m}$, so the slope is $${m}$`, `At $x = 1$: $${m}(1) + b = ${m + b}$, so $b = ${b}$`,
            `$y = ${m}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}$`] }; },
    solvefn(r) { const m = ri(r,2,9), b = ri(r,-8,12), x = ri(r,2,12);
      return { q: `If $f(x) = ${m}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}$, find $x$ when $f(x) = ${m*x + b}$.`,
        a: String(x), hint: `Solve $${m}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${m*x + b}$.`,
        s: [`$${m}x = ${m*x}$`, `$x = ${x}$`] }; },
    linear(r) { const m = ri(r,2,6), b = ri(r,1,9);
      const lin = `$y = ${[1,2,3,4].map(x => m*x + b).join(', ')}$`;
      const sq = `$y = ${[1,2,3,4].map(x => x*x).join(', ')}$`;
      const geo = `$y = ${[1,2,3,4].map(x => Math.pow(2,x)).join(', ')}$`;
      const odd = `$y = ${[3,4,6,9].join(', ')}$`;
      return Object.assign({ q: 'Which table shows a linear function?',
        hint: 'Look for the same jump between every pair of consecutive $y$ values.',
        s: [`${lin} jumps by $${m}$ every time — linear.`, 'The others square, double, or jump by changing amounts.'] },
        mc(r, lin, [sq, geo, odd])); },
    word(r) { const fee = pick(r,[20,25,30,40,50]), rate = pick(r,[12,15,18,22,25]), months = pick(r,[6,9,12,18]);
      return { q: `A gym charges $\\$${fee}$ to join plus $\\$${rate}$ a month. What does ${months} months cost?`,
        a: String(fee + rate*months), unit: '$', hint: `$y = ${rate}x + ${fee}$.`,
        s: [`$${rate} \\times ${months} = ${rate*months}$`, `$${rate*months} + ${fee} = ${fee + rate*months}$`] }; }
  }
  };
  for (const u in MORE2) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE2[u]); }

  window.makeProblem = function (unitId, skill, seed) {
    const u = window.GEN[unitId];
    if (!u) return null;
    const fn = u[skill] || u[Object.keys(u)[Math.floor(Math.random() * Object.keys(u).length)]];
    if (!fn) return null;
    try { const p = fn.call(u, R(seed || (Date.now() ^ (Math.random() * 1e9)) | 0));
      p.id = 'gen-' + unitId + '-' + skill + '-' + (seed || Date.now()); p.generated = true; p.skill = skill; return p;
    } catch (e) { return null; }
  };
  window.genSkills = function (unitId) { return window.GEN[unitId] ? Object.keys(window.GEN[unitId]) : []; };
})();
