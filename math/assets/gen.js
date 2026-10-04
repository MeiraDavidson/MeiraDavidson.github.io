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
      const timeN = d * (v1 + v2), timeD = v1 * v2;
      const answer = fs(2 * v1 * v2, v1 + v2);
      return { q: `${pick(r, NAMES)} drives $${d}$ miles at $${v1}$ mph, then $${d}$ miles at $${v2}$ mph. Find the average speed for the whole trip.`,
        a: answer, unit: 'mph',
        hint: 'Average speed is total distance divided by total time — never the average of the two speeds.',
        s: [`Time going out: $${d} \\div ${v1} = ${tex(d,v1)}$ h`, `Time coming back: $${d} \\div ${v2} = ${tex(d,v2)}$ h`,
            `Total: $${2*d}$ miles in $${tex(timeN,timeD)}$ h`, `$${2*d} \\div ${tex(timeN,timeD)} = ${tex(2*v1*v2,v1+v2)}$ mph`] }; }
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
      const numerator = deg*rad*rad;
      return { q: `Find the area of a $${deg}°$ sector of a circle with radius $${rad}$, in terms of $\\pi$ (enter just the number in front of $\\pi$).`,
        a: fs(numerator,360), hint: `$\\dfrac{${deg}}{360}$ of the whole circle.`,
        s: [`$\\dfrac{${deg}}{360} = ${tex(deg,360)}$`, `Whole circle: $${rad*rad}\\pi$`,
            `$${tex(deg,360)} \\times ${rad*rad}\\pi = ${tex(numerator,360)}\\pi$`] }; },
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


  /* ---- Grade 8 and Algebra I generators ---- */
  const MORE3 = {
  transformations: {
    translate(r) { const x = ri(r,-8,8), y = ri(r,-8,8), dx = ri(r,-7,7) || 3, dy = ri(r,-7,7) || -2;
      const sx = dx > 0 ? `${dx} right` : `${-dx} left`, sy = dy > 0 ? `${dy} up` : `${-dy} down`;
      return { q: `Translate $(${x}, ${y})$ ${sx} and ${sy}.`, a: `(${x+dx}, ${y+dy})`,
        alt: [`(${x+dx},${y+dy})`], hint: 'Right/left changes $x$; up/down changes $y$.',
        s: [`$${x} ${dx<0?'-':'+'} ${Math.abs(dx)} = ${x+dx}$`, `$${y} ${dy<0?'-':'+'} ${Math.abs(dy)} = ${y+dy}$`,
            `The image is $(${x+dx}, ${y+dy})$.`] }; },
    reflect(r) { const x = ri(r,-9,9)||4, y = ri(r,-9,9)||3, ax = r() < .5;
      const im = ax ? `(${x}, ${-y})` : `(${-x}, ${y})`;
      return { q: `Reflect $(${x}, ${y})$ across the $${ax?'x':'y'}$-axis.`, a: im, alt: [im.replace(/ /g,'')],
        hint: `Across the $${ax?'x':'y'}$-axis, the $${ax?'y':'x'}$ changes sign.`,
        s: [`The $${ax?'x':'y'}$ stays $${ax?x:y}$.`, `The $${ax?'y':'x'}$ becomes $${ax?-y:-x}$.`, `The image is $${im}$.`] }; },
    rotate(r) { const x = ri(r,-8,8)||3, y = ri(r,-8,8)||5, deg = pick(r,[90,180,270]);
      const im = deg === 90 ? [-y, x] : deg === 180 ? [-x, -y] : [y, -x];
      const rule = deg === 90 ? '(x, y) \\to (-y,\\ x)' : deg === 180 ? '(x, y) \\to (-x,\\ -y)' : '(x, y) \\to (y,\\ -x)';
      return { q: `Rotate $(${x}, ${y})$ by $${deg}^\\circ$ counter-clockwise about the origin.`,
        a: `(${im[0]}, ${im[1]})`, alt: [`(${im[0]},${im[1]})`], hint: `Use the rule $${rule}$.`,
        s: [`Rule: $${rule}$`, `Substitute $x = ${x}$, $y = ${y}$.`, `The image is $(${im[0]}, ${im[1]})$.`] }; },
    identify(r) { const x = ri(r,2,9), y = ri(r,2,9), k = ri(r,0,2);
      const im = k === 0 ? [-x, y] : k === 1 ? [x, -y] : [-x, -y];
      const name = k === 0 ? 'reflection across the y-axis' : k === 1 ? 'reflection across the x-axis' : 'rotation of 180 degrees about the origin';
      const alts = k === 0 ? ['reflect over y-axis','y-axis reflection'] : k === 1 ? ['reflect over x-axis','x-axis reflection'] : ['180 rotation','half turn'];
      return { q: `The point $(${x}, ${y})$ maps to $(${im[0]}, ${im[1]})$. Name the single transformation.`,
        a: name, alt: alts, hint: 'Which coordinates changed sign?',
        s: [`$x$: $${x} \\to ${im[0]}$`, `$y$: $${y} \\to ${im[1]}$`, `That is a ${name}.`] }; },
    compose(r) { const x = ri(r,-6,6)||2, y = ri(r,-6,6)||4, dx = ri(r,-5,5)||3, ax = r() < .5;
      const mid = ax ? [x, -y] : [-x, y];
      return { q: `$(${x}, ${y})$ is reflected across the $${ax?'x':'y'}$-axis, then translated ${dx>0?dx+' right':(-dx)+' left'}. Find the image.`,
        a: `(${mid[0]+dx}, ${mid[1]})`, alt: [`(${mid[0]+dx},${mid[1]})`], hint: 'Do the reflection first, then translate the result.',
        s: [`Reflect: $(${x}, ${y}) \\to (${mid[0]}, ${mid[1]})$`,
            `Translate: $(${mid[0]} ${dx<0?'-':'+'} ${Math.abs(dx)},\\ ${mid[1]})$`,
            `The image is $(${mid[0]+dx}, ${mid[1]})$.`] }; }
  },

  congruence: {
    corresp(r) { const v = ri(r,4,19), pair = pick(r,[['AB','DE'],['BC','EF'],['AC','DF']]);
      return { q: `$\\triangle ABC \\cong \\triangle DEF$ and $${pair[0]} = ${v}$. Find $${pair[1]}$.`, a: String(v),
        hint: 'Line the letters up: $A\\!\\to\\!D$, $B\\!\\to\\!E$, $C\\!\\to\\!F$.',
        s: [`$${pair[0]}$ corresponds to $${pair[1]}$.`, 'Corresponding sides of congruent triangles are equal.', `$${pair[1]} = ${v}$`] }; },
    rigid(r) { const v = ri(r,3,15), move = pick(r,['rotated $60^\\circ$','reflected across a line','translated 8 units right','rotated $145^\\circ$']);
      return { q: `A square of side $${v}$ cm is ${move}. Find the side length of the image.`, a: String(v), unit: 'cm',
        hint: 'Is this a rigid motion?', s: ['Slides, flips and turns are rigid motions.', 'They change position, not size.', `The side is still $${v}$ cm.`] }; },
    sequence(r) { const x = ri(r,-6,6)||3, y = ri(r,-6,6)||2, dy = ri(r,-5,5)||4, ax = r() < .5;
      const mid = ax ? [x, -y] : [-x, y];
      return { q: `$(${x}, ${y})$ is reflected across the $${ax?'x':'y'}$-axis, then translated ${dy>0?dy+' up':(-dy)+' down'}. Find the image.`,
        a: `(${mid[0]}, ${mid[1]+dy})`, alt: [`(${mid[0]},${mid[1]+dy})`], hint: 'Reflect, write it down, then translate.',
        s: [`Reflect: $(${mid[0]}, ${mid[1]})$`, `Translate: $(${mid[0]}, ${mid[1]+dy})$`] }; },
    solve(r) { const x = ri(r,3,14), a = ri(r,2,6), b = ri(r,1,9), c = a - 1;
      const d = a*x - b - c*x;   // so that a*x - b = c*x + d
      return { q: `$\\triangle ABC \\cong \\triangle DEF$ with $AB = ${a}x - ${b}$ and $DE = ${c}x + ${d}$. Find $x$.`,
        a: String(x), hint: 'Corresponding sides are equal, so set the expressions equal.',
        s: [`$${a}x - ${b} = ${c}x + ${d}$`, `$${a-c}x = ${b+d}$`, `$x = ${x}$`,
            `Check: both give $${a*x-b}$ &check;`] }; },
    orient(r) { const n = ri(r,1,4);
      return { q: `A figure is reflected ${n} time${n>1?'s':''}, each across a different line. Is the final orientation the same as the original, or reversed?`,
        a: n % 2 ? 'reversed' : 'same', alt: n % 2 ? ['opposite','flipped'] : ['the same','unchanged'],
        hint: 'Each reflection reverses the orientation once.',
        s: ['One reflection reverses the orientation.', `${n} reflections reverse it ${n} time${n>1?'s':''}.`,
            `${n} is ${n%2?'odd, so it ends reversed':'even, so it ends the same'}.`] }; }
  },

  dilations: {
    dilate(r) { const k = pick(r,[2,3,4,5,0.5,0.25]), m = k < 1 ? Math.round(1/k) : 1;
      const x = ri(r,1,6) * m * (r()<.5?1:-1), y = ri(r,1,6) * m * (r()<.5?1:-1);
      const ks = k < 1 ? `\\dfrac{1}{${Math.round(1/k)}}` : String(k);
      return { q: `Dilate $(${x}, ${y})$ by a scale factor of $${ks}$, centred at the origin.`,
        a: `(${x*k}, ${y*k})`, alt: [`(${x*k},${y*k})`], hint: 'Multiply both coordinates by the scale factor.',
        s: [`$${x} \\times ${ks} = ${x*k}$`, `$${y} \\times ${ks} = ${y*k}$`, `The image is $(${x*k}, ${y*k})$.`] }; },
    factor(r) { const old = ri(r,2,12), k = pick(r,[2,3,4,5,1.5,0.5]);
      const nw = old * k;
      return { q: `A side of length $${old}$ becomes $${nw}$ after a dilation. Find the scale factor.`,
        a: String(k), alt: [String(k)], hint: 'New over old.',
        s: [`$k = \\dfrac{${nw}}{${old}}$`, `$k = ${k}$`, k > 1 ? 'Greater than one, so it enlarged.' : 'Less than one, so it shrank.'] }; },
    similar(r) { const a = ri(r,2,9), k = pick(r,[2,3,4,1.5,2.5]), b = ri(r,2,11);
      const ka = a*k, kb = b*k;
      return { q: `$\\triangle ABC \\sim \\triangle DEF$ with $AB = ${a}$, $DE = ${ka}$ and $BC = ${b}$. Find $EF$.`,
        a: String(kb), hint: 'Find the scale factor first.',
        s: [`$k = \\dfrac{${ka}}{${a}} = ${k}$`, `$EF = ${k} \\times ${b}$`, `$EF = ${kb}$`] }; },
    perimeter(r) { const p = ri(r,3,15) * 2, k = pick(r,[2,3,4,5]);
      return { q: `A polygon has perimeter $${p}$. It is dilated by a factor of $${k}$. Find the new perimeter.`,
        a: String(p*k), hint: 'Perimeter scales by $k$, not $k^2$.',
        s: ['Every side is multiplied by $' + k + '$.', 'So the perimeter is too.', `$${p} \\times ${k} = ${p*k}$`] }; },
    area(r) { const A = ri(r,2,15) * 2, k = pick(r,[2,3,4,5]);
      return { q: `A figure has area $${A}$ cm$^2$. After a dilation with $k = ${k}$, find the new area.`,
        a: String(A*k*k), unit: 'cm^2', hint: 'Area scales by $k^2$.',
        s: [`$k^2 = ${k*k}$`, `$${A} \\times ${k*k} = ${A*k*k}$`, `$${A*k*k}$ cm$^2$`] }; },
    volume(r) { const k = pick(r,[2,3,4,5]);
      return { q: `A solid is dilated by a factor of $${k}$. By what factor does its volume grow?`,
        a: String(k**3), hint: 'Volume scales by $k^3$.',
        s: [`$k^3 = ${k}^3$`, `$= ${k**3}$`, `Length $\\times ${k}$, area $\\times ${k*k}$, volume $\\times ${k**3}$.`] }; }
  },

  multistep: {
    both(r) { const x = ri(r,-9,12), a = ri(r,3,9), c = ri(r,1,a-1), b = ri(r,-12,12);
      const d = a*x + b - c*x;
      return { q: `Solve $${a}x ${b<0?'- '+(-b):'+ '+b} = ${c}x ${d<0?'- '+(-d):'+ '+d}$.`, a: String(x),
        hint: `Subtract $${c}x$ from both sides first.`,
        s: [`$${a-c}x ${b<0?'- '+(-b):'+ '+b} = ${d}$`, `$${a-c}x = ${d-b}$`, `$x = ${x}$`,
            `Check: both sides give $${a*x+b}$ &check;`] }; },
    bracket(r) { const x = ri(r,-6,9), a = ri(r,2,7)*(r()<.3?-1:1), b = ri(r,-8,8)||3;
      const tot = a*(x+b);
      return { q: `Solve $${a}(x ${b<0?'- '+(-b):'+ '+b}) = ${tot}$.`, a: String(x),
        hint: 'Distribute, or divide both sides by the number outside.',
        s: [`$${a}x ${a*b<0?'- '+(-a*b):'+ '+a*b} = ${tot}$`, `$${a}x = ${tot - a*b}$`, `$x = ${x}$`] }; },
    collect(r) { const x = ri(r,-8,10), a = ri(r,2,7), b = ri(r,1,6), c = ri(r,-10,10)||4;
      const tot = (a+b)*x + c;
      return { q: `Solve $${a}x + ${b}x ${c<0?'- '+(-c):'+ '+c} = ${tot}$.`, a: String(x),
        hint: 'Collect the like terms first.',
        s: [`$${a+b}x ${c<0?'- '+(-c):'+ '+c} = ${tot}$`, `$${a+b}x = ${tot-c}$`, `$x = ${x}$`] }; },
    fraction(r) { const d = pick(r,[2,3,4,5,6]), x = ri(r,-6,9)*d/d, k = ri(r,-9,9)||3;
      const xx = ri(r,-8,9) * d, tot = xx/d + k;
      return { q: `Solve $\\dfrac{x}{${d}} ${k<0?'- '+(-k):'+ '+k} = ${tot}$.`, a: String(xx),
        hint: `Undo the $${k<0?'-'+(-k):'+'+k}$ first, then multiply by $${d}$.`,
        s: [`$\\dfrac{x}{${d}} = ${tot-k}$`, `$x = ${d} \\times ${tot-k}$`, `$x = ${xx}$`] }; },
    special(r) { const a = ri(r,2,7), b = ri(r,1,9), same = r() < .5, off = ri(r,1,6);
      const rhs = same ? `${a}x + ${a*b}` : `${a}x + ${a*b + off}`;
      return { q: `Solve $${a}(x + ${b}) = ${rhs}$. Answer "all" if every value works, or "none" if there is no solution.`,
        a: same ? 'all' : 'none', alt: same ? ['all real numbers','infinitely many'] : ['no solution'],
        hint: 'Distribute and see what is left after the variables cancel.',
        s: [`$${a}x + ${a*b} = ${rhs}$`, `Subtract $${a}x$: $${a*b} = ${a*b + (same?0:off)}$`,
            same ? 'True, so every value works.' : 'False, so there is no solution.'] }; },
    word(r) { const fee = ri(r,10,60), rate = ri(r,2,15), n = ri(r,3,12), tot = fee + rate*n;
      const k = pick(r,[['hours','per hour'],['miles','per mile'],['days','per day']]);
      return { q: `A service charges $\\$${fee}$ plus $\\$${rate}$ ${k[1]}. The bill was $\\$${tot}$. How many ${k[0]}?`,
        a: String(n), unit: k[0], hint: `Set up $${fee} + ${rate}n = ${tot}$.`,
        s: [`$${rate}n = ${tot - fee}$`, `$n = ${n}$`, `$${n}$ ${k[0]}`] }; }
  },

  angles8: {
    parallel(r) { const a = ri(r,25,155), kind = pick(r,['corresponding','alternate interior','co-interior']);
      const ans = kind === 'co-interior' ? 180 - a : a;
      return { q: `Two parallel lines are cut by a transversal. One angle is $${a}^\\circ$. Find its ${kind} angle.`,
        a: String(ans), unit: 'degrees', hint: kind === 'co-interior' ? 'Co-interior angles add to $180^\\circ$.' : `${ANG(kind)} angles are equal.`,
        s: [kind === 'co-interior' ? `$180 - ${a} = ${ans}$` : `${ANG(kind)} angles are equal.`, `$${ans}^\\circ$`] }; },
    triangle(r) { const a = ri(r,20,110), b = ri(r,20, 165 - a);
      return { q: `A triangle has angles $${a}^\\circ$ and $${b}^\\circ$. Find the third.`, a: String(180-a-b), unit: 'degrees',
        hint: 'The three angles add to $180^\\circ$.', s: [`$${a} + ${b} = ${a+b}$`, `$180 - ${a+b} = ${180-a-b}$`] }; },
    vertical(r) { const a = ri(r,15,165), opp = r() < .5;
      return { q: `Two lines cross. One angle is $${a}^\\circ$. Find the angle ${opp ? 'vertically opposite it' : 'next to it'}.`,
        a: String(opp ? a : 180 - a), unit: 'degrees',
        hint: opp ? 'Vertical angles are equal.' : 'Neighbouring angles on a line add to $180^\\circ$.',
        s: [opp ? 'Vertical angles are always equal, parallel lines or not.' : `$180 - ${a} = ${180-a}$`,
            `$${opp ? a : 180-a}^\\circ$`] }; },
    exterior(r) { const a = ri(r,25,80), b = ri(r,25,80);
      return { q: `A triangle has interior angles $${a}^\\circ$ and $${b}^\\circ$. Find the exterior angle at the third vertex.`,
        a: String(a+b), unit: 'degrees', hint: 'It equals the sum of the two remote interior angles.',
        s: [`$${a} + ${b} = ${a+b}$`, `Check: third angle is $${180-a-b}$, and $180 - ${180-a-b} = ${a+b}$ &check;`] }; },
    solve(r) { const x = ri(r,8,30), a = ri(r,2,6), c = ri(r,a+1,9), b = ri(r,5,40);
      const d = a*x + b - c*x;
      return { q: `Two parallel lines are cut by a transversal. Corresponding angles measure $(${a}x + ${b})^\\circ$ and $(${c}x ${d<0?'- '+(-d):'+ '+d})^\\circ$. Find $x$.`,
        a: String(x), hint: 'Corresponding angles are equal.',
        s: [`$${a}x + ${b} = ${c}x ${d<0?'- '+(-d):'+ '+d}$`, `$${b-d} = ${c-a}x$`, `$x = ${x}$`,
            `Both angles are $${a*x+b}^\\circ$ &check;`] }; },
    aa(r) { const a = ri(r,30,80), b = ri(r,30, 145 - a), c = 180 - a - b, same = r() < .6;
      const d = same ? b : ri(r,20,100), e = same ? c : 180 - a - d;
      return { q: `Triangle 1 has angles $${a}^\\circ$ and $${b}^\\circ$. Triangle 2 has angles $${a}^\\circ$ and $${d}^\\circ$. Are they similar? Answer yes or no.`,
        a: (b === d || c === d) ? 'yes' : 'no', hint: 'Find the third angle of each and compare all three.',
        s: [`Triangle 1: $${a}$, $${b}$, $${c}$`, `Triangle 2: $${a}$, $${d}$, $${180-a-d}$`,
            (b === d || c === d) ? 'The same three angles, so similar by AA.' : 'Different angle sets, so not similar.'] }; },
    polygon(r) { const n = ri(r,3,12), name = ['','','','triangle','quadrilateral','pentagon','hexagon','heptagon','octagon','nonagon','decagon','hendecagon','dodecagon'][n];
      return { q: `Find the sum of the interior angles of a ${name}.`, a: String((n-2)*180), unit: 'degrees',
        hint: 'A polygon with $n$ sides splits into $n - 2$ triangles.',
        s: [`$n = ${n}$, so $${n} - 2 = ${n-2}$ triangles`, `$${n-2} \\times 180 = ${(n-2)*180}$`] }; }
  },

  slope: {
    twopoints(r) { const x1 = ri(r,-8,6), y1 = ri(r,-8,8), run = ri(r,1,7), rise = ri(r,-9,9) || 3;
      const x2 = x1 + run, y2 = y1 + rise, [n,d] = frac(rise, run);
      return { q: `Find the slope of the line through $(${x1}, ${y1})$ and $(${x2}, ${y2})$.`, a: fs(rise, run),
        alt: [String(Math.round(rise/run*1000)/1000)], hint: 'Rise over run — subtract in the same order both times.',
        s: [`Rise: $${y2} - (${y1}) = ${rise}$`, `Run: $${x2} - (${x1}) = ${run}$`, `$m = ${tex(rise, run)}$`] }; },
    special(r) { const k = ri(r,-9,9), horiz = r() < .5;
      return { q: `What is the slope of the line $${horiz ? 'y' : 'x'} = ${k}$?`,
        a: horiz ? '0' : 'undefined', alt: horiz ? ['zero'] : ['no slope'],
        hint: horiz ? 'A horizontal line has no rise.' : 'A vertical line has no run.',
        s: [horiz ? 'Every point has the same $y$, so the rise is $0$.' : 'Every point has the same $x$, so the run is $0$.',
            horiz ? '$m = 0$' : 'Dividing by zero is not allowed, so the slope is undefined.'] }; },
    unitrate(r) { const per = ri(r,4,40), n = ri(r,3,15), tot = per*n;
      const k = pick(r,[['miles','hours','mph'],['pages','minutes','ppm'],['words','minutes','wpm'],['litres','minutes','L/min']]);
      return { q: `A machine covers $${tot}$ ${k[0]} in $${n}$ ${k[1]}. Find the rate in ${k[0]} per ${k[1].replace(/s$/,'')}.`,
        a: String(per), unit: k[2], hint: `Divide the ${k[0]} by the ${k[1]}.`,
        s: [`$${tot} \\div ${n} = ${per}$`, `$${per}$ ${k[0]} every ${k[1].replace(/s$/,'')}.`] }; },
    table(r) { const m = ri(r,2,12), a = ri(r,2,5), b = a*2, c = a*3;
      return { q: `A table shows $x$: $${a}, ${b}, ${c}$ and $y$: $${a*m}, ${b*m}, ${c*m}$. Find the unit rate $\\dfrac{y}{x}$.`,
        a: String(m), hint: 'Divide $y$ by $x$ for any row.',
        s: [`$${a*m} \\div ${a} = ${m}$`, `$${b*m} \\div ${b} = ${m}$ &check;`, `The unit rate is $${m}$.`] }; },
    proportional(r) { const m = ri(r,2,9), b = r() < .5 ? 0 : ri(r,1,8);
      const xs = [1,2,3].map(i => i * ri(r,1,2));
      return { q: `Is the relationship $y = ${m}x${b ? ' + ' + b : ''}$ proportional? Answer yes or no.`,
        a: b ? 'no' : 'yes', hint: 'A proportional graph passes through the origin.',
        s: [`At $x = 0$, $y = ${b}$.`, b ? 'It misses the origin, so it is linear but not proportional.' : 'It passes through the origin, so it is proportional.'] }; },
    compare(r) { const m1 = ri(r,2,9), m2 = ri(r,2,9) + (r()<.5?0.5:0), run = ri(r,2,5);
      return { q: `Line A passes through $(0, 0)$ and $(${run}, ${m1*run})$. Line B is $y = ${m2}x$. Which has the larger slope, A or B?`,
        a: m1 > m2 ? 'A' : m2 > m1 ? 'B' : 'equal', alt: m1 > m2 ? ['line A'] : m2 > m1 ? ['line B'] : ['the same'],
        hint: 'Work out both slopes.', s: [`Line A: $m = \\dfrac{${m1*run}}{${run}} = ${m1}$`, `Line B: $m = ${m2}$`,
            m1 === m2 ? 'They are equal.' : `$${Math.max(m1,m2)} > ${Math.min(m1,m2)}$, so ${m1>m2?'A':'B'}.`] }; },
    graph(r) { const rise = ri(r,1,7), run = ri(r,1,7), down = r() < .5;
      return { q: `A line ${down ? 'falls' : 'rises'} $${rise}$ units for every $${run}$ units to the right. Find the slope.`,
        a: fs(down ? -rise : rise, run), hint: down ? 'Falling means a negative rise.' : 'Rise over run.',
        s: [`Rise $= ${down?-rise:rise}$, run $= ${run}$`, `$m = ${tex(down?-rise:rise, run)}$`] }; },
    missing(r) { const m = ri(r,2,7)*(r()<.3?-1:1), x1 = ri(r,-5,5), run = ri(r,2,6), y1 = ri(r,-8,8);
      const x2 = x1 + run, y2 = y1 + m*run;
      return { q: `A line through $(${x1}, ${y1})$ and $(${x2}, k)$ has slope $${m}$. Find $k$.`, a: String(y2),
        hint: 'Set up the slope formula and solve for $k$.',
        s: [`$\\dfrac{k - (${y1})}{${x2} - (${x1})} = ${m}$`, `$k - (${y1}) = ${m} \\times ${run} = ${m*run}$`, `$k = ${y2}$`] }; }
  },

  linearfn: {
    readmb(r) { const m = ri(r,-9,9)||3, b = ri(r,-12,12)||5;
      return { q: `Give the slope and $y$-intercept of $y = ${m}x ${b<0?'- '+(-b):'+ '+b}$.`,
        a: `m = ${m}, b = ${b}`, alt: [`${m} and ${b}`, `m=${m} b=${b}`], hint: 'The number multiplying $x$ is the slope; the sign belongs to $b$.',
        s: [`$m = ${m}$`, `$b = ${b}$`] }; },
    evaluate(r) { const m = ri(r,-8,8)||2, b = ri(r,-10,10), x = ri(r,-6,8);
      return { q: `For $y = ${m}x ${b<0?'- '+(-b):'+ '+b}$, find $y$ when $x = ${x}$.`, a: String(m*x+b),
        hint: 'Substitute and follow the order of operations.',
        s: [`$${m}(${x}) = ${m*x}$`, `$${m*x} ${b<0?'- '+(-b):'+ '+b} = ${m*x+b}$`] }; },
    intercept(r) { const m = ri(r,2,8)*(r()<.4?-1:1), b = m * ri(r,-6,6);
      const xi = -b/m;
      return { q: `Find the $x$-intercept of $y = ${m}x ${b<0?'- '+(-b):'+ '+b}$.`, a: String(xi),
        hint: 'Set $y = 0$.', s: [`$0 = ${m}x ${b<0?'- '+(-b):'+ '+b}$`, `$${m}x = ${-b}$`, `$x = ${xi}$`] }; },
    rearrange(r) { const A = ri(r,2,9), B = pick(r,[2,3,4,5]), C = B * ri(r,-6,6);
      return { q: `Write $${A}x + ${B}y = ${C}$ in slope-intercept form.`,
        a: `y = ${fs(-A,B)}x + ${C/B}`, alt: [`y=${fs(-A,B)}x+${C/B}`],
        hint: 'Subtract the $x$ term, then divide every term by the coefficient of $y$.',
        s: [`$${B}y = ${-A}x + ${C}$`, `Divide every term by $${B}$.`, `$y = ${tex(-A,B)}x + ${C/B}$`] }; },
    twopoints(r) { const b = ri(r,-10,10), m = ri(r,-8,8)||3, x2 = ri(r,2,7);
      return { q: `Write the equation of the line through $(0, ${b})$ and $(${x2}, ${m*x2+b})$.`,
        a: `y = ${m}x + ${b}`, alt: [`y=${m}x+${b}`, `y = ${m}x ${b<0?'- '+(-b):'+ '+b}`],
        hint: 'The point with $x = 0$ hands you $b$.',
        s: [`$b = ${b}$`, `$m = \\dfrac{${m*x2+b} - (${b})}{${x2}} = ${m}$`, `$y = ${m}x ${b<0?'- '+(-b):'+ '+b}$`] }; },
    graph(r) { const m = ri(r,-6,6)||2, b = ri(r,-8,8)||3, x = ri(r,1,5);
      const y = m*x + b, right = `(${x}, ${y})`;
      const offs = [], w = [];
      for (let d = 1; w.length < 3 && d < 12; d++) { w.push(`(${x}, ${y+d})`); if (w.length < 3) w.push(`(${x}, ${y-d})`); }
      w.length = 3;
      return Object.assign({ q: `A line has $m = ${m}$ and $b = ${b}$. Which point lies on it?`,
        hint: `Substitute into $y = ${m}x ${b<0?'- '+(-b):'+ '+b}$.`,
        s: [`$y = ${m}(${x}) ${b<0?'- '+(-b):'+ '+b} = ${m*x+b}$`, `So $${right}$ is on the line.`] }, mc(r, right, w)); },
    word(r) { const fee = ri(r,10,80), rate = ri(r,5,40), draining = r() < .4;
      if (draining) { const cap = rate * ri(r,5,25);
        return { q: `A tank holds $${cap}$ litres and drains at $${rate}$ litres per minute. After how many minutes is it empty?`,
          a: String(cap/rate), unit: 'min', hint: `Write $y = -${rate}x + ${cap}$ and set $y = 0$.`,
          s: [`$0 = -${rate}x + ${cap}$`, `$${rate}x = ${cap}$`, `$x = ${cap/rate}$ minutes`] }; }
      return { q: `A club charges $\\$${fee}$ to join plus $\\$${rate}$ a month. Write the cost equation.`,
        a: `y = ${rate}x + ${fee}`, alt: [`y=${rate}x+${fee}`, `${rate}x+${fee}`],
        hint: 'The joining fee is the starting value.', s: [`$b = ${fee}$`, `$m = ${rate}$`, `$y = ${rate}x + ${fee}$`] }; }
  },

  functiondef: {
    isfunction(r) { const bad = r() < .5, a = ri(r,1,6), b = a + ri(r,1,4), c = b + ri(r,1,4);
      const y1 = ri(r,1,9), y2 = ri(r,1,9), y3 = ri(r,1,9);
      const set = bad ? `\\{(${a}, ${y1}), (${b}, ${y2}), (${a}, ${y3})\\}` : `\\{(${a}, ${y1}), (${b}, ${y2}), (${c}, ${y3})\\}`;
      return { q: `Is $${set}$ a function? Answer yes or no.`, a: bad ? 'no' : 'yes',
        hint: 'Look for a repeated input.',
        s: bad ? [`The input $${a}$ appears twice.`, `It goes to $${y1}$ and to $${y3}$.`, 'So it is not a function.']
               : [`Inputs are $${a}$, $${b}$, $${c}$ — all different.`, 'Each has exactly one output, so yes.'] }; },
    evaluate(r) { const a = ri(r,1,5), b = ri(r,-9,9), x = ri(r,-5,6), quad = r() < .5;
      const v = quad ? a*x*x + b : a*x + b;
      return { q: `If $f(x) = ${a}x^${quad?2:1} ${b<0?'- '+(-b):'+ '+b}$, find $f(${x})$.`, a: String(v),
        hint: 'Substitute with brackets around the value.',
        s: quad ? [`$(${x})^2 = ${x*x}$`, `$${a}(${x*x}) = ${a*x*x}$`, `$${a*x*x} ${b<0?'- '+(-b):'+ '+b} = ${v}$`]
                : [`$${a}(${x}) = ${a*x}$`, `$${a*x} ${b<0?'- '+(-b):'+ '+b} = ${v}$`] }; },
    vertical(r) { const right = pick(r,['A circle','A sideways parabola','The graph of $x = y^2$']);
      const w = ['A straight line with slope $3$','A parabola opening upward','A horizontal line'];
      return Object.assign({ q: 'Which graph fails the vertical line test?',
        hint: 'A vertical line must never cross the graph twice.',
        s: ['Slide a vertical line across each graph.', `${right} is crossed twice, so one $x$ has two $y$ values.`, 'That is not a function.'] }, mc(r, right, w)); },
    linear(r) { const lin = r() < .5, a = ri(r,2,6), d = ri(r,2,7), b = ri(r,1,8);
      const ys = lin ? [b, b+d, b+2*d, b+3*d] : [b, b*a, b*a*a, b*a*a*a];
      return { q: `Is this table linear? $x$: $1, 2, 3, 4$; $y$: $${ys.join(', ')}$. Answer yes or no.`,
        a: lin ? 'yes' : 'no', hint: 'Take the differences between consecutive $y$ values.',
        s: [`Differences: $${[1,2,3].map(i=>ys[i]-ys[i-1]).join(', ')}$`,
            lin ? `Constant, so linear with slope $${d}$.` : `Not constant. Ratios are $${[1,2,3].map(i=>ys[i]/ys[i-1]).join(', ')}$ — exponential, not linear.`] }; },
    domain(r) { const k = ri(r,-9,9)||4;
      return { q: `For $f(x) = \\dfrac{1}{x ${k<0?'+ '+(-k):'- '+k}}$, which value must be excluded from the domain?`,
        a: String(k), hint: 'You may not divide by zero.',
        s: [`The denominator is zero when $x = ${k}$.`, `So exclude $x = ${k}$.`] }; },
    range(r) { const n = ri(r,2,3), dom = [];
      for (let i = -n; i <= n; i++) dom.push(i);
      const vals = [...new Set(dom.map(v => v*v))].sort((a,b)=>a-b);
      return { q: `For $f(x) = x^2$ with domain $\\{${dom.join(', ')}\\}$, list the range.`,
        a: `{${vals.join(', ')}}`, alt: [vals.join(', '), `{${vals.join(',')}}`],
        hint: 'Square each input and collect the distinct results.',
        s: [`Squares: $${dom.map(v=>v*v).join(', ')}$`, `Distinct values: $${vals.join(', ')}$`] }; }
  },

  systems8: {
    substitute(r) { const x = ri(r,-5,8), m = ri(r,2,6), b = ri(r,-8,8), a = ri(r,1,5);
      const y = m*x + b, c = a*x + y;
      return { q: `Solve $y = ${m}x ${b<0?'- '+(-b):'+ '+b}$ and $${a}x + y = ${c}$.`, a: `(${x}, ${y})`, alt: [`(${x},${y})`],
        hint: 'Replace $y$ with the expression it equals.',
        s: [`$${a}x + ${m}x ${b<0?'- '+(-b):'+ '+b} = ${c}$`, `$${a+m}x = ${c-b}$`, `$x = ${x}$`, `$y = ${y}$`] }; },
    eliminate(r) { const x = ri(r,-6,9), y = ri(r,-6,9), a = ri(r,1,6), b = ri(r,1,6);
      return { q: `Solve $${a}x + ${b}y = ${a*x+b*y}$ and $${a}x - ${b}y = ${a*x-b*y}$.`, a: `(${x}, ${y})`, alt: [`(${x},${y})`],
        hint: 'Add the two equations — the $y$ terms cancel.',
        s: [`Add: $${2*a}x = ${2*a*x}$, so $x = ${x}$`, `$${a*x} + ${b}y = ${a*x+b*y}$`, `$y = ${y}$`] }; },
    check(r) { const x = ri(r,-5,7), y = ri(r,-5,7), a = ri(r,1,5), b = ri(r,1,5), ok = r() < .6;
      const gx = ok ? x : x + ri(r,1,3);
      return { q: `Is $(${gx}, ${y})$ a solution of $${a}x + ${b}y = ${a*x+b*y}$ and $x - y = ${x-y}$? Answer yes or no.`,
        a: ok ? 'yes' : 'no', hint: 'Test it in both equations.',
        s: [`First: $${a}(${gx}) + ${b}(${y}) = ${a*gx+b*y}$, and we need $${a*x+b*y}$.`,
            `Second: $${gx} - (${y}) = ${gx-y}$, and we need $${x-y}$.`,
            ok ? 'Both check out, so yes.' : 'At least one fails, so no.'] }; },
    nosolution(r) { const m = ri(r,2,7), b1 = ri(r,-8,8), same = r() < .4, b2 = same ? b1 : b1 + ri(r,1,6);
      const right = same ? 'Infinitely many' : 'None';
      const w = same ? ['None','Exactly one','Exactly two'] : ['Exactly one','Infinitely many','Exactly two'];
      return Object.assign({ q: `How many solutions does $y = ${m}x ${b1<0?'- '+(-b1):'+ '+b1}$ and $y = ${m}x ${b2<0?'- '+(-b2):'+ '+b2}$ have?`,
        hint: 'Compare the slopes and the intercepts.',
        s: [`Both have slope $${m}$.`, same ? 'Same intercept too, so it is the same line.' : 'Different intercepts, so the lines are parallel.',
            same ? 'Infinitely many solutions.' : 'They never meet, so no solution.'] }, mc(r, right, w)); },
    graph(r) { const x = ri(r,-7,9), y = ri(r,-7,9);
      return { q: `Two lines cross at $(${x}, ${y})$. What is the solution of the system?`, a: `(${x}, ${y})`, alt: [`(${x},${y})`],
        hint: 'The intersection point is the solution.',
        s: ['The crossing point is the one pair satisfying both equations.', `$(${x}, ${y})$`] }; },
    word(r) { const big = ri(r,12,40), small = ri(r,3, big-2), sum = big + small, diff = big - small;
      return { q: `Two numbers add to $${sum}$ and differ by $${diff}$. Find the larger.`, a: String(big),
        hint: 'Write $x + y$ and $x - y$, then add the equations.',
        s: [`$x + y = ${sum}$ and $x - y = ${diff}$`, `Add: $2x = ${sum+diff}$`, `$x = ${big}$`] }; },
    multiply(r) { const x = ri(r,-5,8), y = ri(r,-5,8), a = ri(r,1,4), b = ri(r,2,5), c = ri(r,2,5);
      return { q: `Solve $x + ${b}y = ${x+b*y}$ and $${c}x - y = ${c*x-y}$.`, a: `(${x}, ${y})`, alt: [`(${x},${y})`],
        hint: `Multiply the second equation by $${b}$, then add.`,
        s: [`$\\times ${b}$: $${c*b}x - ${b}y = ${b*(c*x-y)}$`, `Add to the first: $${1+c*b}x = ${x+b*y+b*(c*x-y)}$`,
            `$x = ${x}$, then $y = ${y}$`] }; },
    infinite(r) { const a = ri(r,1,5), b = ri(r,1,5), c = ri(r,2,12), k = pick(r,[2,3,4]);
      return { q: `How many solutions does $${a*k}x + ${b*k}y = ${c*k}$ and $${a}x + ${b}y = ${c}$ have?`,
        a: 'infinitely many', alt: ['infinite','all'], hint: 'Try dividing the first equation through.',
        s: [`Divide the first by $${k}$: $${a}x + ${b}y = ${c}$`, 'Identical to the second.', 'The same line, so infinitely many solutions.'] }; }
  },

  distance8: {
    distance(r) { const t = pick(r, TRIPLES), x1 = ri(r,-6,5), y1 = ri(r,-6,5), flip = r() < .5;
      const dx = flip ? t[1] : t[0], dy = flip ? t[0] : t[1];
      return { q: `Find the distance between $(${x1}, ${y1})$ and $(${x1+dx}, ${y1+dy})$.`, a: String(t[2]),
        hint: 'Find both legs, then use $a^2 + b^2 = c^2$.',
        s: [`Run: $${dx}$. Rise: $${dy}$`, `$${dx}^2 + ${dy}^2 = ${dx*dx+dy*dy}$`, `$\\sqrt{${t[2]*t[2]}} = ${t[2]}$`] }; },
    midpoint(r) { const x1 = ri(r,-9,9), y1 = ri(r,-9,9), x2 = x1 + 2*ri(r,1,7), y2 = y1 + 2*ri(r,-6,6);
      return { q: `Find the midpoint of $(${x1}, ${y1})$ and $(${x2}, ${y2})$.`, a: `(${(x1+x2)/2}, ${(y1+y2)/2})`,
        alt: [`(${(x1+x2)/2},${(y1+y2)/2})`], hint: 'Average each coordinate — add, then halve.',
        s: [`$x$: $\\dfrac{${x1} + ${x2}}{2} = ${(x1+x2)/2}$`, `$y$: $\\dfrac{${y1} + (${y2})}{2} = ${(y1+y2)/2}$`] }; },
    exact(r) { const a = ri(r,1,7), b = ri(r,1,7), sq = a*a + b*b;
      let k = 1; for (let i = 2; i*i <= sq; i++) if (sq % (i*i) === 0) k = i;
      const rest = sq / (k*k), ans = k === 1 ? `sqrt(${sq})` : rest === 1 ? String(k) : `${k}sqrt(${rest})`;
      return { q: `Find the exact distance from $(0, 0)$ to $(${a}, ${b})$, in simplest radical form.`, a: ans,
        alt: [ans.replace('sqrt','√').replace(/[()]/g,''), ans.replace(/[()]/g,'')],
        hint: 'Add the squares, then simplify the root.',
        s: [`$${a}^2 + ${b}^2 = ${sq}$`, k === 1 ? `$\\sqrt{${sq}}$ has no square factor, so it is already simplest.`
            : `$\\sqrt{${sq}} = \\sqrt{${k*k} \\cdot ${rest}} = ${k === 1 ? '' : k}\\sqrt{${rest}}$`] }; },
    perimeter(r) { const t = pick(r, TRIPLES.filter(v => v[0] < 15));
      return { q: `A right triangle has vertices $(0, 0)$, $(${t[0]}, 0)$ and $(${t[0]}, ${t[1]})$. Find its perimeter.`,
        a: String(t[0]+t[1]+t[2]), hint: 'Two sides are along the grid; find the third with Pythagoras.',
        s: [`Legs: $${t[0]}$ and $${t[1]}$`, `Hypotenuse: $\\sqrt{${t[0]*t[0]} + ${t[1]*t[1]}} = ${t[2]}$`,
            `$${t[0]} + ${t[1]} + ${t[2]} = ${t[0]+t[1]+t[2]}$`] }; },
    compare(r) { const a = ri(r,1,8), b = ri(r,1,8), c = ri(r,1,8), d = ri(r,1,8);
      const s1 = a*a+b*b, s2 = c*c+d*d;
      const right = s1 < s2 ? `$(${a}, ${b})$` : s2 < s1 ? `$(${c}, ${d})$` : 'They are the same distance';
      const w = [s1 < s2 ? `$(${c}, ${d})$` : `$(${a}, ${b})$`, 'They are the same distance', 'Cannot be determined'].filter(x => x !== right).slice(0,3);
      return Object.assign({ q: `Which point is closer to the origin, $(${a}, ${b})$ or $(${c}, ${d})$?`,
        hint: 'Compare the sums of the squares — no need for the roots.',
        s: [`$(${a},${b})$: $${a*a} + ${b*b} = ${s1}$`, `$(${c},${d})$: $${c*c} + ${d*d} = ${s2}$`,
            s1 === s2 ? 'Equal, so the same distance.' : `$${Math.min(s1,s2)} < ${Math.max(s1,s2)}$`] }, mc(r, right, w)); },
    missing(r) { const x = ri(r,-8,8), y1 = ri(r,-8,4), d = ri(r,2,11);
      return { q: `The distance from $(${x}, ${y1})$ to $(${x}, k)$ is $${d}$, with $k > ${y1}$. Find $k$.`, a: String(y1+d),
        hint: 'The points share an $x$, so it is a vertical segment.',
        s: [`$|k - (${y1})| = ${d}$`, `Since $k > ${y1}$, $k = ${y1} + ${d}$`, `$k = ${y1+d}$`] }; },
    shape(r) { const s = ri(r,2,9), sq = 2*s*s;
      let k = 1; for (let i = 2; i*i <= sq; i++) if (sq % (i*i) === 0) k = i;
      const rest = sq/(k*k), ans = rest === 1 ? String(k) : `${k}sqrt(${rest})`;
      return { q: `A square has vertices $(0,0)$, $(${s},0)$, $(${s},${s})$, $(0,${s})$. Find the length of a diagonal in simplest radical form.`,
        a: ans, alt: [ans.replace('sqrt','√').replace(/[()]/g,''), ans.replace(/[()]/g,'')],
        hint: 'The diagonal joins opposite corners.',
        s: [`From $(0,0)$ to $(${s},${s})$`, `$${s*s} + ${s*s} = ${sq}$`, `$\\sqrt{${sq}} = ${rest===1?k:k+'\\sqrt{'+rest+'}'}$`] }; }
  },

  scinotation: {
    convert(r) { const a = ri(r,10,99)/10, n = ri(r,2,7), neg = r() < .4;
      const val = neg ? a * Math.pow(10, -n) : a * Math.pow(10, n);
      const std = neg ? val.toFixed(n + 1).replace(/0+$/,'') : val.toLocaleString('en-US');
      return { q: `Write $${std}$ in scientific notation.`, a: `${a} x 10^${neg?-n:n}`,
        alt: [`${a}e${neg?-n:n}`, `${a}x10^${neg?-n:n}`, `${a} * 10^${neg?-n:n}`],
        hint: 'Move the decimal so the front number sits between $1$ and $10$.',
        s: [`Front number: $${a}$`, `Moved $${n}$ place${n>1?'s':''} ${neg?'right':'left'}`, `$${a} \\times 10^{${neg?-n:n}}$`] }; },
    multiply(r) { let a = ri(r,2,9), b = ri(r,2,9), m = ri(r,-5,8), n = ri(r,-5,8);
      let f = a*b, e = m+n; if (f >= 10) { f = f/10; e += 1; }
      return { q: `Compute $(${a} \\times 10^{${m}})(${b} \\times 10^{${n}})$ in scientific notation.`,
        a: `${f} x 10^${e}`, alt: [`${f}e${e}`, `${f}x10^${e}`], hint: 'Multiply the fronts, add the exponents, then tidy.',
        s: [`$${a} \\times ${b} = ${a*b}$`, `$${m} + (${n}) = ${m+n}$`,
            a*b >= 10 ? `$${a*b} \\times 10^{${m+n}} = ${f} \\times 10^{${e}}$` : `$${f} \\times 10^{${e}}$`] }; },
    divide(r) { const b = ri(r,2,9), q = pick(r,[2,3,4,5]), a = b*q, m = ri(r,-4,9), n = ri(r,-5,6);
      return { q: `Compute $\\dfrac{${a} \\times 10^{${m}}}{${b} \\times 10^{${n}}}$.`, a: `${q} x 10^${m-n}`,
        alt: [`${q}e${m-n}`, `${q}x10^${m-n}`], hint: 'Divide the fronts, subtract the exponents.',
        s: [`$${a} \\div ${b} = ${q}$`, `$${m} - (${n}) = ${m-n}$`, `$${q} \\times 10^{${m-n}}$`] }; },
    tidy(r) { const a = ri(r,4,9), b = ri(r,4,9), m = ri(r,1,8);
      const prod = a*b, f = prod/10, e = m+1;
      return { q: `Compute $(${a} \\times 10^{${m}})(${b} \\times 10^{0})$ in proper scientific notation.`,
        a: `${f} x 10^${e}`, alt: [`${f}e${e}`, `${f}x10^${e}`], hint: 'The front number must end up between $1$ and $10$.',
        s: [`$${a} \\times ${b} = ${prod}$`, `$${prod} \\times 10^{${m}}$ — the front is too big`, `$= ${f} \\times 10^{${e}}$`] }; },
    add(r) { const a = ri(r,11,89)/10, b = ri(r,1,9), n = ri(r,3,8), gap = r() < .5 ? 0 : 1;
      const f = +(a + b/Math.pow(10, gap)).toFixed(2);
      return { q: `Compute $${a} \\times 10^{${n}} + ${b} \\times 10^{${n-gap}}$.`, a: `${f} x 10^${n}`,
        alt: [`${f}e${n}`, `${f}x10^${n}`], hint: gap ? 'Rewrite the smaller term so the exponents match.' : 'Same exponent, so just add the fronts.',
        s: gap ? [`$${b} \\times 10^{${n-gap}} = ${b/Math.pow(10,gap)} \\times 10^{${n}}$`, `$${a} + ${b/Math.pow(10,gap)} = ${f}$`, `$${f} \\times 10^{${n}}$`]
               : [`$${a} + ${b} = ${f}$`, `$${f} \\times 10^{${n}}$`] }; },
    subtract(r) { const a = ri(r,40,95)/10, b = ri(r,1,9), n = ri(r,4,9);
      const f = +(a - b/10).toFixed(2);
      return { q: `Compute $${a} \\times 10^{${n}} - ${b} \\times 10^{${n-1}}$.`, a: `${f} x 10^${n}`,
        alt: [`${f}e${n}`, `${f}x10^${n}`], hint: 'Match the exponents first.',
        s: [`$${b} \\times 10^{${n-1}} = ${b/10} \\times 10^{${n}}$`, `$${a} - ${b/10} = ${f}$`, `$${f} \\times 10^{${n}}$`] }; },
    compare(r) { const a = ri(r,2,9), b = ri(r,2,9), m = ri(r,3,9), n = m - ri(r,1,3);
      const right = `$${a} \\times 10^{${m}}$`, w = [`$${b} \\times 10^{${n}}$`, 'They are equal', 'Cannot be determined'];
      return Object.assign({ q: `Which is larger, $${a} \\times 10^{${m}}$ or $${b} \\times 10^{${n}}$?`,
        hint: 'Compare the exponents first.',
        s: [`$10^{${m}} > 10^{${n}}$`, 'A bigger exponent wins whatever the front numbers are.', `So $${a} \\times 10^{${m}}$.`] }, mc(r, right, w)); },
    howmany(r) { const b = ri(r,2,6), q = pick(r,[2,3,4,5]), a = b*q, n = ri(r,2,5);
      return { q: `How many times larger is $${a} \\times 10^{${n+3}}$ than $${b} \\times 10^{${n}}$?`,
        a: String(q*1000), hint: '"How many times" means divide.',
        s: [`$${a} \\div ${b} = ${q}$`, `$10^{${n+3}} \\div 10^{${n}} = 10^3$`, `$${q} \\times 1000 = ${q*1000}$`] }; },
    fix(r) { const a = ri(r,11,99)/1000, n = ri(r,4,9);
      const f = a*100, e = n - 2;
      return { q: `Rewrite $${a} \\times 10^{${n}}$ in proper scientific notation.`, a: `${f} x 10^${e}`,
        alt: [`${f}e${e}`, `${f}x10^${e}`], hint: 'The front number must be at least $1$.',
        s: [`$${a} = ${f} \\times 10^{-2}$`, `$-2 + ${n} = ${e}$`, `$${f} \\times 10^{${e}}$`] }; },
    word(r) { const a = ri(r,2,8), b = ri(r,2,8), m = ri(r,4,9), n = ri(r,1,4);
      let f = a*b, e = m+n; if (f >= 10) { f = f/10; e += 1; }
      return { q: `A signal travels $${a} \\times 10^{${m}}$ metres per second. How far does it go in $${b} \\times 10^{${n}}$ seconds?`,
        a: `${f} x 10^${e}`, alt: [`${f}e${e}`, `${f}x10^${e}`], hint: 'Distance is rate times time.',
        s: [`$${a} \\times ${b} = ${a*b}$`, `$${m} + ${n} = ${m+n}$`, `$${f} \\times 10^{${e}}$ metres`] }; }
  },

  volume8: {
    cylinder(r) { const rad = ri(r,2,9), h = ri(r,2,14), dia = r() < .4;
      return { q: `Find the volume of a cylinder with ${dia?`diameter $${2*rad}$`:`radius $${rad}$`} and height $${h}$, in terms of $\\pi$.`,
        a: `${rad*rad*h}pi`, alt: [`${rad*rad*h}π`, `${rad*rad*h} pi`],
        hint: dia ? 'Halve the diameter first, then use $V = \\pi r^2 h$.' : '$V = \\pi r^2 h$.',
        s: dia ? [`$r = ${rad}$`, `$\\pi(${rad*rad})(${h})$`, `$= ${rad*rad*h}\\pi$`]
               : [`$\\pi(${rad})^2(${h})$`, `$= ${rad*rad*h}\\pi$`] }; },
    cone(r) { const rad = pick(r,[3,6,9,12]), h = ri(r,2,15);
      return { q: `Find the volume of a cone with radius $${rad}$ and height $${h}$, in terms of $\\pi$.`,
        a: `${rad*rad*h/3}pi`, alt: [`${rad*rad*h/3}π`, `${rad*rad*h/3} pi`], hint: '$V = \\dfrac{1}{3}\\pi r^2 h$.',
        s: [`$\\dfrac{1}{3}\\pi(${rad*rad})(${h})$`, `$= \\dfrac{${rad*rad*h}\\pi}{3}$`, `$= ${rad*rad*h/3}\\pi$`] }; },
    sphere(r) { const rad = pick(r,[3,6,9,12]), dia = r() < .4;
      const v = 4*rad*rad*rad/3;
      return { q: `Find the volume of a sphere with ${dia?`diameter $${2*rad}$`:`radius $${rad}$`}, in terms of $\\pi$.`,
        a: `${v}pi`, alt: [`${v}π`, `${v} pi`], hint: '$V = \\dfrac{4}{3}\\pi r^3$.',
        s: dia ? [`$r = ${rad}$`, `$${rad}^3 = ${rad**3}$`, `$\\dfrac{4}{3}\\pi(${rad**3}) = ${v}\\pi$`]
               : [`$${rad}^3 = ${rad**3}$`, `$\\dfrac{4}{3}\\pi(${rad**3}) = ${v}\\pi$`] }; },
    radius(r) { const rad = ri(r,2,15);
      return { q: `A cylinder has diameter $${2*rad}$ cm. What radius goes into the formula?`, a: String(rad), unit: 'cm',
        hint: 'Halve the diameter.', s: [`$${2*rad} \\div 2 = ${rad}$ cm`] }; },
    decimal(r) { const rad = ri(r,2,8), h = ri(r,2,12), exact = rad*rad*h;
      const v = +(exact * 3.14159265).toFixed(1);
      return { q: `Find the volume of a cylinder with radius $${rad}$ and height $${h}$, rounded to one decimal place. Use $\\pi \\approx 3.14159$.`,
        a: String(v), unit: 'cubic units', hint: 'Work out the $\\pi$ coefficient first.',
        s: [`$\\pi(${rad*rad})(${h}) = ${exact}\\pi$`, `$${exact} \\times 3.14159 \\approx ${v}$`] }; },
    backwards(r) { const rad = ri(r,2,9), h = ri(r,2,12), cone = r() < .5;
      if (cone) return { q: `A cone with radius $${rad}$ has volume $${rad*rad*h/3}\\pi$. Find its height.`, a: String(h),
        hint: 'Substitute into $V = \\dfrac{1}{3}\\pi r^2 h$ and divide by $\\pi$.',
        s: [`$\\dfrac{1}{3}\\pi(${rad*rad})h = ${rad*rad*h/3}\\pi$`, `$${rad*rad/3 === Math.round(rad*rad/3) ? rad*rad/3 : rad*rad+'/3'}h$ ... multiply both sides by $3$: $${rad*rad}h = ${rad*rad*h}$`, `$h = ${h}$`] };
      return { q: `A cylinder of height $${h}$ has volume $${rad*rad*h}\\pi$. Find its radius.`, a: String(rad),
        hint: 'Divide by $\\pi$, then by the height.',
        s: [`$\\pi r^2(${h}) = ${rad*rad*h}\\pi$`, `$r^2 = ${rad*rad}$`, `$r = ${rad}$`] }; },
    compare(r) { const right = 'one third of the cylinder\'s', w = ['the same','twice as much','three times as much'];
      return Object.assign({ q: 'A cone and a cylinder have the same radius and the same height. The cone\'s volume is',
        hint: 'Compare the two formulas.',
        s: ['Cylinder: $\\pi r^2 h$', 'Cone: $\\dfrac{1}{3}\\pi r^2 h$', 'So one third.'] }, mc(r, right, w)); },
    composite(r) { const rad = pick(r,[3,6,9]), hc = ri(r,4,14), hk = ri(r,2,9);
      const v = rad*rad*hc + rad*rad*hk/3;
      return { q: `A silo is a cylinder of radius $${rad}$ and height $${hc}$, topped by a cone of the same radius and height $${hk}$. Find the total volume in terms of $\\pi$.`,
        a: `${v}pi`, alt: [`${v}π`, `${v} pi`], hint: 'Find each volume separately and add.',
        s: [`Cylinder: $\\pi(${rad*rad})(${hc}) = ${rad*rad*hc}\\pi$`, `Cone: $\\dfrac{1}{3}\\pi(${rad*rad})(${hk}) = ${rad*rad*hk/3}\\pi$`,
            `$${rad*rad*hc}\\pi + ${rad*rad*hk/3}\\pi = ${v}\\pi$`] }; },
    scale(r) { const k = pick(r,[2,3,4]), what = pick(r,['radius','height']);
      const f = what === 'radius' ? k*k : k;
      return { q: `A cylinder's ${what} is multiplied by $${k}$ and everything else stays the same. By what factor does the volume grow?`,
        a: String(f), hint: 'Look at how that letter appears in $V = \\pi r^2 h$.',
        s: [`$V = \\pi r^2 h$`, what === 'radius' ? `$r$ is squared, so $(${k}r)^2 = ${k*k}r^2$` : `$h$ appears once, so the volume scales by $${k}$.`,
            `Factor $${f}$`] }; }
  },

  scatter: {
    direction(r) { const p = pick(r, [
        ['study time', 'test score', true], ['age of a car', 'its value', false],
        ['rainfall', 'plant height', true], ['altitude', 'air temperature', false],
        ['hours of exercise', 'resting heart rate', false], ['house size', 'house price', true]]);
      const right = p[2] ? 'a positive association' : 'a negative association';
      return Object.assign({ q: `As ${p[0]} increases, ${p[1]} ${p[2]?'increases':'decreases'}. This is`,
        hint: 'Do the two variables move the same way or opposite ways?',
        s: [p[2] ? 'Both rise together.' : 'One rises while the other falls.', right.charAt(0).toUpperCase() + right.slice(1) + '.',
            'Note that this still says nothing about cause.'] },
        mc(r, right, ['no association', 'a causal proof', p[2] ? 'a negative association' : 'a positive association'].slice(0,3))); },
    axes(r) { const p = pick(r, [['rainfall','plant height'],['study time','test score'],['practice hours','free throws made'],['fertiliser used','crop yield']]);
      return { q: `You want to see whether more ${p[0]} gives more ${p[1]}. Which variable belongs on the $x$-axis?`,
        a: p[0], hint: 'The explaining variable goes across.',
        s: [`${p[0].charAt(0).toUpperCase()+p[0].slice(1)} is the explanatory variable.`, `So it goes on $x$, and ${p[1]} goes on $y$.`] }; },
    outlier(r) { const far = r() < .5;
      const right = far ? 'an outlier' : 'not an outlier';
      return Object.assign({ q: far ? 'A point on a scatter plot sits far away from the pattern of the others. It is'
          : 'A point at the far right of a scatter plot lies exactly on the pattern. It is',
        hint: 'Outliers are far from the pattern, not far along it.',
        s: [far ? 'It does not follow the trend.' : 'It follows the trend of the rest.',
            far ? 'So it is an outlier.' : 'So it is not an outlier, however extreme its $x$ value.'] },
        mc(r, right, ['a cluster', 'the median', far ? 'not an outlier' : 'an outlier'])); },
    form(r) { const lin = r() < .5, right = lin ? 'linear' : 'curved';
      return Object.assign({ q: `The dots on a scatter plot lie close to a ${lin?'straight band':'bending arc'}. The form is`,
        hint: 'Would a straight line follow them?',
        s: [lin ? 'A straight line would follow them well.' : 'A straight line would miss the bend.', `So the form is ${right}.`] },
        mc(r, right, ['clustered', 'random', lin ? 'curved' : 'linear'])); },
    cause(r) { const p = pick(r, [
        ['ice cream sales','sunburn cases','hot weather drives both'],
        ['shoe size','reading score','age affects both'],
        ['number of firefighters sent','damage to the building','the size of the fire drives both'],
        ['coffee cups drunk','hours worked','a busy day drives both']]);
      return Object.assign({ q: `${p[0].charAt(0).toUpperCase()+p[0].slice(1)} and ${p[1]} rise together. The best explanation is`,
        hint: 'Look for a third variable.',
        s: ['Neither one need act on the other.', `Here, ${p[2]}.`, 'That is a confounding variable.'] },
        mc(r, p[2], [`${p[0]} causes ${p[1]}`, `${p[1]} causes ${p[0]}`, 'the data must be wrong'])); },
    strength(r) { const right = 'A', w = ['B', 'They are equally strong', 'Cannot be determined'];
      return Object.assign({ q: 'Two plots show positive association. In plot A the dots hug the line; in plot B they are widely scattered. Which is stronger?',
        hint: 'Tighter means stronger.', s: ['Closeness to the pattern measures strength.', 'A is tighter, so A is stronger.'] }, mc(r, right, w)); },
    count(r) { const n = ri(r,12,40);
      return { q: `A scatter plot of one class shows $${n}$ dots. How many students are in the class?`, a: String(n), unit: 'students',
        hint: 'Each dot is one case.', s: ['One dot per student.', `$${n}$ students`] }; },
    predict(r) { return { q: 'A scatter plot of shoe size against height shows a positive association. Does a large shoe size guarantee a tall person? Answer yes or no.',
        a: 'no', hint: 'An association is a tendency, not a rule.',
        s: ['Positive means taller on average.', 'Individual cases still vary widely.', 'So no guarantee.'] }; },
    cluster(r) { const right = 'two different groups are mixed in one plot';
      return Object.assign({ q: 'A scatter plot shows two separate clouds of dots. The likeliest reason is',
        hint: 'Two clouds usually means two populations.',
        s: ['Each group follows its own pattern.', 'Splitting the plot by group would show two clean trends.'] },
        mc(r, right, ['the data is random', 'there is no association', 'the sample is too small'])); },
    reason(r) { const p = pick(r,[
        ['more firefighters sent','more damage','send fewer firefighters'],
        ['more hospital visits','worse health','avoid hospitals'],
        ['more police on patrol','more crime reported','reduce patrols']]);
      return { q: `A study finds that ${p[0]} goes with ${p[1]}. Should we ${p[2]}? Answer yes or no.`, a: 'no',
        hint: 'What third variable drives both?', s: ['The underlying severity drives both variables.',
            'Acting on the association would attack the response, not the cause.', 'So no.'] }; },
    design(r) { const right = 'Randomly assigning subjects to the treatment or a control';
      return Object.assign({ q: 'Which study design could establish that a treatment causes an effect?',
        hint: 'Only one design controls for confounders.',
        s: ['Random assignment balances out other factors.', 'Observational studies cannot rule out confounders.'] },
        mc(r, right, ['Observing who chooses the treatment', 'Comparing two towns', 'Surveying people about results'])); },
    describe(r) { const pos = r() < .5, strong = r() < .5;
      return { q: `A scatter plot has dots ${strong?'tightly packed':'widely scattered'} along a straight band running ${pos?'up to the right':'down to the right'}. Describe the association in three words.`,
        a: `${strong?'strong':'weak'} ${pos?'positive':'negative'} linear`,
        alt: [`${strong?'strong':'weak'}, ${pos?'positive':'negative'}, linear`],
        hint: 'Give strength, direction and form.',
        s: [`${strong?'Tightly packed: strong':'Widely scattered: weak'}`, `${pos?'Rising: positive':'Falling: negative'}`, 'Straight band: linear'] }; }
  },

  bestfit: {
    equation(r) { const b = ri(r,5,60), m = ri(r,-9,9)||3, x2 = ri(r,2,10);
      return { q: `A line of best fit passes through $(0, ${b})$ and $(${x2}, ${m*x2+b})$. Find its equation.`,
        a: `y = ${m}x + ${b}`, alt: [`y=${m}x+${b}`], hint: 'The point with $x = 0$ gives $b$.',
        s: [`$b = ${b}$`, `$m = \\dfrac{${m*x2+b} - ${b}}{${x2}} = ${m}$`, `$y = ${m}x + ${b}$`] }; },
    predict(r) { const m = ri(r,-6,8)||2, b = ri(r,5,70), x = ri(r,2,14);
      return { q: `For $y = ${m}x ${b<0?'- '+(-b):'+ '+b}$, predict $y$ when $x = ${x}$.`, a: String(m*x+b),
        hint: 'Substitute.', s: [`$${m}(${x}) = ${m*x}$`, `$${m*x} + ${b} = ${m*x+b}$`] }; },
    slope(r) { const m = ri(r,10,60)/10, k = pick(r,[['hours','dollars','per hour'],['days','centimetres','per day'],['years','points','per year']]);
      return { q: `For $y = ${m}x + ${ri(r,4,40)}$, where $x$ is in ${k[0]} and $y$ in ${k[1]}, what does $${m}$ mean?`,
        a: `${m} ${k[1]} ${k[2]}`, alt: [`${m} ${k[1]} per ${k[0].replace(/s$/,'')}`, String(m)],
        hint: 'Slope is change in $y$ per one unit of $x$.',
        s: [`Units: ${k[1]} ${k[2]}`, `Each extra ${k[0].replace(/s$/,'')} is associated with $${m}$ more ${k[1]}.`] }; },
    intercept(r) { const b = ri(r,5,80), what = pick(r,['days of growth','hours studied','weeks of training']);
      return { q: `For $y = ${ri(r,2,9)}x + ${b}$, where $x$ is ${what}, what does $${b}$ mean?`,
        a: `the value when x = 0`, alt: ['starting value','initial value',String(b)],
        hint: 'The intercept is the prediction at $x = 0$.',
        s: [`At $x = 0$, $y = ${b}$.`, `So $${b}$ is the predicted starting value.`] }; },
    residual(r) { const pred = ri(r,20,120), diff = ri(r,-15,15)||4;
      return { q: `A line predicts $y = ${pred}$ but the actual value was $${pred+diff}$. Find the residual.`, a: String(diff),
        hint: 'Actual minus predicted.', s: [`$${pred+diff} - ${pred} = ${diff}$`,
            diff > 0 ? 'Positive, so the point sits above the line.' : 'Negative, so the point sits below the line.'] }; },
    extrapolate(r) { const lo = ri(r,1,5), hi = lo + ri(r,6,18), out = hi + ri(r,25,90);
      const right = 'extrapolation, and unsafe';
      return Object.assign({ q: `Data covers $x$ from $${lo}$ to $${hi}$. Predicting at $x = ${out}$ is`,
        hint: 'Is that value inside the data range?',
        s: [`$${out}$ is far outside $${lo}$ to $${hi}$.`, 'That is extrapolation.', 'The pattern may not continue that far.'] },
        mc(r, right, ['interpolation, and safe', 'impossible to compute', 'the same as the mean'])); },
    solve(r) { const m = ri(r,2,9), b = ri(r,4,30), x = ri(r,3,15);
      return { q: `For the line $y = ${m}x + ${b}$, at what $x$ does $y$ reach $${m*x+b}$?`, a: String(x),
        hint: 'Set $y$ equal and solve.', s: [`$${m}x + ${b} = ${m*x+b}$`, `$${m}x = ${m*x}$`, `$x = ${x}$`] }; },
    fit(r) { const right = 'A', w = ['B', 'Equally well', 'Cannot be determined'];
      const a = [ri(r,1,3), -ri(r,1,3), ri(r,1,3), -ri(r,1,3)], b = [ri(r,5,9), -ri(r,4,8), ri(r,4,8), -ri(r,5,9)];
      return Object.assign({ q: `Line A has residuals $${a.join(', ')}$. Line B has residuals $${b.join(', ')}$. Which fits better?`,
        hint: 'Smaller residuals mean a closer line.',
        s: [`A misses by at most $${Math.max(...a.map(Math.abs))}$.`, `B misses by up to $${Math.max(...b.map(Math.abs))}$.`, 'So A fits better.'] }, mc(r, right, w)); },
    reason(r) { const m = ri(r,2,5), b = ri(r,25,40), age = ri(r,30,55);
      return { q: `A best-fit line for a child's height against age gives $y = ${m}x + ${b}$ inches. Predict the height at age $${age}$ and say whether to trust it.`,
        a: `${m*age+b} inches, not trustworthy`, alt: [String(m*age+b), `${m*age+b}, no`],
        hint: 'Compute it, then judge the range.',
        s: [`$${m}(${age}) + ${b} = ${m*age+b}$ inches`, `That is over $${Math.floor((m*age+b)/12)}$ feet.`,
            'Far outside the data range, so an unsafe extrapolation.'] }; },
    compare(r) { const m1 = ri(r,18,30)/10, m2 = +(m1 + ri(r,-3,3)/10).toFixed(1);
      return { q: `Two students fit lines to the same data: $y = ${m1}x + 5$ and $y = ${m2}x + 4.6$. Can both be reasonable? Answer yes or no.`,
        a: 'yes', hint: 'A by-eye fit is not unique.',
        s: ['Both can pass through the middle of the cloud.', 'Slightly different lines can both summarise it well.', 'So yes.'] }; }
  },

  twoway: {
    complete(r) { const tot = ri(r,6,20)*10, a = ri(r,3,9)*5, b = tot - a, c = ri(r,2, Math.floor(a/5))*5;
      return { q: `A two-way table has row totals $${a}$ and $${b}$. Find the grand total.`, a: String(tot),
        hint: 'Row totals add to the grand total.', s: [`$${a} + ${b} = ${tot}$`] }; },
    read(r) { const tot = pick(r,[20,25,40,50,80,100,150,200]), p = pick(r,[10,20,25,30,40,50,60,75]);
      const n = tot*p/100;
      return { q: `In a survey of $${tot}$ people, $${n}$ said yes. What percent said yes?`, a: String(p), unit: '%',
        hint: 'Divide by the grand total.', s: [`$\\dfrac{${n}}{${tot}} = ${n/tot}$`, `$${p}\\%$`] }; },
    joint(r) { const inner = r() < .5;
      return { q: `In a two-way table, a count in an ${inner?'inner cell':'edge total'} is called`,
        a: inner ? 'a joint frequency' : 'a marginal frequency',
        alt: inner ? ['joint frequency','joint'] : ['marginal frequency','marginal'],
        hint: inner ? 'It counts people in both categories at once.' : 'It sits out at the margin.',
        s: [inner ? 'Inner cells are joint frequencies.' : 'Row and column totals are marginal frequencies.'] }; },
    marginal(r) { return { q: 'In a two-way table, the total at the end of a row is called', a: 'a marginal frequency',
        alt: ['marginal frequency','marginal'], hint: 'It sits out at the margin of the table.',
        s: ['Row and column totals are marginal frequencies.', 'Inner cells are joint frequencies.'] }; },
    rowpct(r) { const row = pick(r,[20,25,40,50,80]), p = pick(r,[20,25,40,50,60,75,80]);
      const n = row*p/100;
      return { q: `Of $${row}$ people in one row, $${n}$ answered yes. What percent of that row said yes?`, a: String(p), unit: '%',
        hint: 'The words after "percent of" give the denominator.', s: [`$\\dfrac{${n}}{${row}} = ${n/row}$`, `$${p}\\%$`] }; },
    colpct(r) { const col = pick(r,[20,25,40,50]), n = ri(r,4, col-2);
      const p = +(n/col*100).toFixed(1);
      return { q: `Of the $${col}$ people in one column, $${n}$ also fall in the first row. What percent of that column is that?`,
        a: String(p), unit: '%', hint: 'Divide by the column total this time.',
        s: [`$\\dfrac{${n}}{${col}} \\approx ${(n/col).toFixed(3)}$`, `$\\approx ${p}\\%$`] }; },
    compare(r) { const n1 = pick(r,[40,50,60,80]), p1 = pick(r,[40,50,60,75]), n2 = pick(r,[40,50,60,80]), p2 = pick(r,[25,30,40,50]);
      const a1 = n1*p1/100, a2 = n2*p2/100;
      const A = 'A larger share of the first group', Bb = 'A larger share of the second group', E = 'The shares are equal';
      const right = p1 > p2 ? A : p2 > p1 ? Bb : E;
      const w = [A, Bb, E, 'No comparison is possible without more information'].filter(o => o !== right).slice(0, 3);
      return Object.assign({ q: `$${a1}$ of $${n1}$ in group 1 and $${a2}$ of $${n2}$ in group 2 said yes. Which is true?`,
        hint: 'Compare percentages, not raw counts.',
        s: [`Group 1: $\\dfrac{${a1}}{${n1}} = ${p1}\\%$`, `Group 2: $\\dfrac{${a2}}{${n2}} = ${p2}\\%$`,
            p1 === p2 ? 'Equal shares.' : `$${Math.max(p1,p2)}\\% > ${Math.min(p1,p2)}\\%$`] },
        mc(r, right, w)); },
    association(r) { const n1 = pick(r,[40,50,60]), n2 = pick(r,[40,50,60]);
      const p1 = pick(r,[60,70,75]), p2 = pick(r,[25,30,40]);
      return { q: `$${n1*p1/100}$ of $${n1}$ in one group and $${n2*p2/100}$ of $${n2}$ in the other said yes. Is there an association? Answer yes or no.`,
        a: 'yes', hint: 'Compare the two percentages.',
        s: [`Group 1: $${p1}\\%$`, `Group 2: $${p2}\\%$`, `A gap of $${p1-p2}$ points, so yes.`] }; }
  },

  expressions9: {
    parts(r) { const a = ri(r,2,9), b = ri(r,-9,9)||3, c = ri(r,-12,12)||5, n = pick(r,[2,3,4]);
      const which = pick(r,['terms','degree','coefficient','constant']);
      const ans = which === 'terms' ? '3' : which === 'degree' ? String(n) : which === 'coefficient' ? String(b) : String(c);
      const qs = { terms: 'How many terms are there', degree: 'What is the degree',
        coefficient: 'What is the coefficient of $x$', constant: 'What is the constant' };
      return { q: `${qs[which]} in $${a}x^${n} ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c}$?`, a: ans,
        hint: which === 'terms' ? 'Count the pieces split by $+$ and $-$.' : which === 'degree' ? 'The largest exponent.' : 'The sign belongs to the number.',
        s: [`Terms: $${a}x^${n}$, $${b<0?'-':''}${Math.abs(b)}x$, $${c<0?'-':''}${Math.abs(c)}$`, `Answer: $${ans}$`] }; },
    evaluate(r) { const a = ri(r,2,7), b = ri(r,2,7), x = ri(r,-6,8), y = ri(r,-6,8);
      return { q: `Evaluate $${a}a - ${b}b$ when $a = ${x}$ and $b = ${y}$.`, a: String(a*x - b*y),
        hint: 'Substitute both values, with brackets around negatives.',
        s: [`$${a}(${x}) = ${a*x}$`, `$${b}(${y}) = ${b*y}$`, `$${a*x} - (${b*y}) = ${a*x-b*y}$`] }; },
    simplify(r) { const k = ri(r,2,8), a = ri(r,2,9), b = ri(r,2,12);
      return { q: `Simplify $\\dfrac{${k*a}x + ${k*b}}{${k}}$.`, a: `${a}x + ${b}`, alt: [`${a}x+${b}`],
        hint: 'Divide every term, not just the first.',
        s: [`$\\dfrac{${k*a}x}{${k}} = ${a}x$`, `$\\dfrac{${k*b}}{${k}} = ${b}$`, `$${a}x + ${b}$`] }; },
    structure(r) { const k = ri(r,2,12);
      return { q: `Factor $x^2 - ${k*k}$ using structure.`, a: `(x - ${k})(x + ${k})`, alt: [`(x+${k})(x-${k})`],
        hint: 'Both terms are perfect squares with a minus between.',
        s: [`$x^2 - ${k}^2$`, `$= (x - ${k})(x + ${k})$`] }; },
    units(r) { const k = pick(r, [['km/h','m/s',1000/3600],['m/s','km/h',3.6]]);
      if (k[0] === 'km/h') { const v = pick(r,[36,54,72,90,108]);
        return { q: `Convert $${v}$ km/h to metres per second.`, a: String(v/3.6), unit: 'm/s',
          hint: 'Multiply by $1000$ m per km, divide by $3600$ s per hour.',
          s: [`$${v} \\times 1000 = ${v*1000}$ m per hour`, `$${v*1000} \\div 3600 = ${v/3.6}$`, `$${v/3.6}$ m/s`] }; }
      const v = ri(r,5,30);
      return { q: `Convert $${v}$ m/s to kilometres per hour.`, a: String(v*3.6), unit: 'km/h',
        hint: 'Multiply by $3600$ s per hour, divide by $1000$ m per km.',
        s: [`$${v} \\times 3600 = ${v*3600}$ m per hour`, `$\\div 1000 = ${v*3.6}$`, `$${v*3.6}$ km/h`] }; }
  },

  solving9: {
    linear(r) { const x = ri(r,-9,12), a = ri(r,2,9), b = ri(r,-14,14);
      return { q: `Solve $${a}x ${b<0?'- '+(-b):'+ '+b} = ${a*x+b}$.`, a: String(x),
        hint: 'Undo the constant, then the coefficient.',
        s: [`$${a}x = ${a*x}$`, `$x = ${x}$`] }; },
    both(r) { const x = ri(r,-8,11), a = ri(r,3,9), c = ri(r,1,a-1), b = ri(r,-12,12);
      const d = a*x + b - c*x;
      return { q: `Solve $${a}x ${b<0?'- '+(-b):'+ '+b} = ${c}x ${d<0?'- '+(-d):'+ '+d}$.`, a: String(x),
        hint: `Subtract $${c}x$ from both sides.`,
        s: [`$${a-c}x ${b<0?'- '+(-b):'+ '+b} = ${d}$`, `$${a-c}x = ${d-b}$`, `$x = ${x}$`] }; },
    literal(r) { const p = pick(r, [
        ['P = 2l + 2w', 'w', '(P - 2l)/2', ['w = (P-2l)/2','P/2 - l'], ['Subtract $2l$: $P - 2l = 2w$', 'Divide by $2$: $w = \\dfrac{P - 2l}{2}$']],
        ['A = lw', 'l', 'A/w', ['l = A/w'], ['Divide both sides by $w$.', '$l = \\dfrac{A}{w}$']],
        ['y = mx + b', 'x', '(y - b)/m', ['x = (y-b)/m'], ['Subtract $b$: $y - b = mx$', 'Divide by $m$: $x = \\dfrac{y - b}{m}$']],
        ['A = \\frac{1}{2}bh', 'h', '2A/b', ['h = 2A/b'], ['Multiply by $2$: $2A = bh$', 'Divide by $b$: $h = \\dfrac{2A}{b}$']],
        ['V = \\pi r^2 h', 'h', 'V/(pi r^2)', ['h = V/(pi r^2)'], ['Divide by everything except $h$.', '$h = \\dfrac{V}{\\pi r^2}$']],
        ['d = rt', 't', 'd/r', ['t = d/r'], ['Divide both sides by $r$.', '$t = \\dfrac{d}{r}$']]]);
      return { q: `Solve $${p[0]}$ for $${p[1]}$.`, a: p[2], alt: p[3], hint: 'Treat the other letters exactly like numbers.', s: p[4] }; },
    fraction(r) { const d1 = pick(r,[2,3,4,5,6]), d2 = pick(r,[2,3,4,5,6]), L = d1*d2;
      const a = ri(r,1,5), b = ri(r,1,5), x = ri(r,-6,9)*L, tot = a*x/d1 + b*x/d2;
      if (tot !== Math.round(tot)) return this.fraction(R(ri(r,1,1e9)));
      return { q: `Solve $\\dfrac{${a}x}{${d1}} + \\dfrac{${b}x}{${d2}} = ${tot}$.`, a: String(x),
        hint: `Multiply every term by $${L}$.`,
        s: [`$\\times ${L}$: $${a*L/d1}x + ${b*L/d2}x = ${tot*L}$`, `$${a*L/d1 + b*L/d2}x = ${tot*L}$`, `$x = ${x}$`] }; },
    special(r) { const a = ri(r,2,8), b = ri(r,1,9), same = r() < .5, off = ri(r,1,7);
      return { q: `Solve $${a}(x + ${b}) = ${a}x + ${a*b + (same?0:off)}$. Answer "all" if every value works, or "none" if there is none.`,
        a: same ? 'all' : 'none', alt: same ? ['all real numbers','infinitely many'] : ['no solution'],
        hint: 'Distribute and see what survives.',
        s: [`$${a}x + ${a*b} = ${a}x + ${a*b+(same?0:off)}$`, `Subtract $${a}x$: $${a*b} = ${a*b+(same?0:off)}$`,
            same ? 'True, so every value works.' : 'False, so no solution.'] }; },
    word(r) { const w = ri(r,4,25), extra = ri(r,2,12), l = w + extra, p = 2*(l+w);
      return { q: `A rectangle has perimeter $${p}$ cm and its length is $${extra}$ cm more than its width. Find the width.`,
        a: String(w), unit: 'cm', hint: 'Let the width be $w$; the length is $w + ' + extra + '$.',
        s: [`$2w + 2(w + ${extra}) = ${p}$`, `$4w + ${2*extra} = ${p}$`, `$4w = ${p - 2*extra}$`, `$w = ${w}$ cm`] }; }
  },

  inequalities9: {
    solve(r) { const x = ri(r,-9,12), a = ri(r,2,9), b = ri(r,-12,12), sg = pick(r,['>','<','\\geq','\\leq']);
      const plain = { '>': '>', '<': '<', '\\geq': '>=', '\\leq': '<=' }[sg];
      return { q: `Solve $${a}x ${b<0?'- '+(-b):'+ '+b} ${sg} ${a*x+b}$.`, a: `x ${plain} ${x}`,
        alt: [`x${plain}${x}`], hint: 'Dividing by a positive never changes the direction.',
        s: [`$${a}x ${sg} ${a*x}$`, `$x ${sg} ${x}$`] }; },
    flip(r) { const x = ri(r,-9,9), a = -ri(r,2,8), b = ri(r,-12,12), sg = pick(r,['>','<','\\geq','\\leq']);
      const flipped = { '>': '<', '<': '>', '\\geq': '\\leq', '\\leq': '\\geq' }[sg];
      const plain = { '>': '>', '<': '<', '\\geq': '>=', '\\leq': '<=' }[flipped];
      return { q: `Solve $${a}x ${b<0?'- '+(-b):'+ '+b} ${sg} ${a*x+b}$.`, a: `x ${plain} ${x}`,
        alt: [`x${plain}${x}`], hint: `Dividing by $${a}$ is dividing by a negative — the sign reverses.`,
        s: [`$${a}x ${sg} ${a*x}$`, `Divide by $${a}$ and flip: $x ${flipped} ${x}$`] }; },
    circle(r) { const inc = r() < .5, k = ri(r,-9,9);
      return { q: `For the solution $x ${inc?'\\geq':'>'} ${k}$, is the circle at $${k}$ open or filled?`,
        a: inc ? 'filled' : 'open', alt: inc ? ['closed'] : ['hollow'],
        hint: inc ? 'Does the endpoint itself satisfy the inequality?' : 'Is the endpoint a solution?',
        s: [inc ? `$x = ${k}$ is a solution.` : `$x = ${k}$ is not a solution.`, inc ? 'So the circle is filled.' : 'So the circle is open.'] }; },
    compound(r) { const a = ri(r,2,6), lo = ri(r,-9,3), hi = lo + ri(r,2,8), k = ri(r,-8,8);
      return { q: `Solve $${a*lo+k} \\leq ${a}x ${k<0?'- '+(-k):'+ '+k} < ${a*hi+k}$.`,
        a: `${lo} <= x < ${hi}`, alt: [`${lo}<=x<${hi}`, `${lo} ≤ x < ${hi}`],
        hint: 'Do the same thing to all three parts.',
        s: [`Subtract $${k}$: $${a*lo} \\leq ${a}x < ${a*hi}$`, `Divide by $${a}$: $${lo} \\leq x < ${hi}$`] }; },
    words(r) { const p = pick(r, [['At most','x <= k','\\leq'],['At least','x >= k','\\geq'],['More than','x > k','>'],['Fewer than','x < k','<'],['No more than','x <= k','\\leq']]);
      const k = ri(r,5,50);
      const right = `$x ${p[2]} ${k}$`;
      const w = ['$x > ' + k + '$', '$x < ' + k + '$', '$x \\geq ' + k + '$', '$x \\leq ' + k + '$'].filter(o => o !== right).slice(0,3);
      return Object.assign({ q: `"${p[0]} $${k}$" translates to`, hint: 'Does the boundary value itself count?',
        s: [`"${p[0]}" means ${p[2] === '\\leq' ? 'no more than' : p[2] === '\\geq' ? 'no fewer than' : p[2] === '>' ? 'strictly greater' : 'strictly less'}.`,
            `So $x ${p[2]} ${k}$.`] }, mc(r, right, w)); },
    word(r) { const fee = ri(r,5,30), rate = ri(r,2,9), n = ri(r,4,14), budget = fee + rate*n + ri(r,0, rate-1);
      const k = pick(r,[['games','per game'],['rides','per ride'],['songs','per song']]);
      return { q: `Entry costs $\\$${fee}$ and each ${k[0].replace(/s$/,'')} is $\\$${rate}$. With $\\$${budget}$, how many ${k[0]} can you afford?`,
        a: String(Math.floor((budget-fee)/rate)), unit: k[0], hint: `Write $${fee} + ${rate}n \\leq ${budget}$.`,
        s: [`$${rate}n \\leq ${budget-fee}$`, `$n \\leq ${((budget-fee)/rate).toFixed(2)}$`,
            `Whole ${k[0]} only, so $${Math.floor((budget-fee)/rate)}$.`] }; },
    both(r) { const x = ri(r,-8,11), a = ri(r,3,9), c = ri(r,1,a-1), b = ri(r,-10,10);
      const d = a*x + b - c*x, sg = pick(r,['>','<','\\geq','\\leq']);
      const plain = { '>': '>', '<': '<', '\\geq': '>=', '\\leq': '<=' }[sg];
      return { q: `Solve $${a}x ${b<0?'- '+(-b):'+ '+b} ${sg} ${c}x ${d<0?'- '+(-d):'+ '+d}$.`, a: `x ${plain} ${x}`,
        alt: [`x${plain}${x}`], hint: `Subtract $${c}x$ from both sides — no flip needed.`,
        s: [`$${a-c}x ${b<0?'- '+(-b):'+ '+b} ${sg} ${d}$`, `$${a-c}x ${sg} ${d-b}$`, `$x ${sg} ${x}$`] }; }
  },

  slopeforms: {
    pointslope(r) { const m = ri(r,-8,8)||3, x1 = ri(r,-7,8), y1 = ri(r,-9,9);
      return { q: `Write the equation of the line with slope $${m}$ through $(${x1}, ${y1})$, in point-slope form.`,
        a: `y - ${y1} = ${m}(x - ${x1})`, alt: [`y-${y1}=${m}(x-${x1})`, `y ${y1<0?'+ '+(-y1):'- '+y1} = ${m}(x ${x1<0?'+ '+(-x1):'- '+x1})`],
        hint: 'Substitute into $y - y_1 = m(x - x_1)$.',
        s: [`$y ${y1<0?'+ '+(-y1):'- '+y1} = ${m}(x ${x1<0?'+ '+(-x1):'- '+x1})$`] }; },
    slopeint(r) { const m = ri(r,-8,8)||2, x1 = ri(r,-7,8), y1 = ri(r,-9,9), b = y1 - m*x1;
      return { q: `Write $y ${y1<0?'+ '+(-y1):'- '+y1} = ${m}(x ${x1<0?'+ '+(-x1):'- '+x1})$ in slope-intercept form.`,
        a: `y = ${m}x ${b<0?'- '+(-b):'+ '+b}`, alt: [`y=${m}x${b<0?'-'+(-b):'+'+b}`],
        hint: 'Distribute, then get $y$ alone.',
        s: [`$y ${y1<0?'+ '+(-y1):'- '+y1} = ${m}x ${-m*x1<0?'- '+(m*x1):'+ '+(-m*x1)}$`, `$y = ${m}x ${b<0?'- '+(-b):'+ '+b}$`] }; },
    intercepts(r) { const A = ri(r,2,9), B = ri(r,2,9), k = ri(r,2,9), C = A*B*k, which = r() < .5;
      return { q: `Find the $${which?'x':'y'}$-intercept of $${A}x + ${B}y = ${C}$.`,
        a: String(which ? C/A : C/B), hint: `Set $${which?'y':'x'} = 0$.`,
        s: [`$${which?A+'x':B+'y'} = ${C}$`, `$${which?'x':'y'} = ${which ? C/A : C/B}$`] }; },
    parallel(r) { const m = ri(r,-8,8)||4, b = ri(r,-9,9);
      return { q: `A line parallel to $y = ${m}x ${b<0?'- '+(-b):'+ '+b}$ has what slope?`, a: String(m),
        hint: 'Parallel lines share a slope.', s: [`$m = ${m}$`] }; },
    perp(r) { const n = ri(r,1,9), d = ri(r,1,9), neg = r() < .5;
      const m = neg ? -n/d : n/d, pm = frac(neg ? d : -d, n);
      return { q: `A line perpendicular to $y = ${tex(neg?-n:n, d)}x + ${ri(r,-6,6)}$ has what slope?`,
        a: fs(neg ? d : -d, n), alt: [String(Math.round((neg?d/n:-d/n)*1000)/1000)],
        hint: 'Flip the fraction and change the sign.',
        s: [`Reciprocal of $${tex(neg?-n:n,d)}$ is $${tex(neg?-d:d,n)}$`, `Negated: $${tex(neg?d:-d,n)}$`,
            `Check: $${tex(neg?-n:n,d)} \\times ${tex(neg?d:-d,n)} = -1$ &check;`] }; },
    twopoints(r) { const m = ri(r,-7,7)||2, b = ri(r,-9,9), x1 = ri(r,-6,2), x2 = x1 + ri(r,2,7);
      return { q: `Find the equation of the line through $(${x1}, ${m*x1+b})$ and $(${x2}, ${m*x2+b})$.`,
        a: `y = ${m}x ${b<0?'- '+(-b):'+ '+b}`, alt: [`y=${m}x${b<0?'-'+(-b):'+'+b}`],
        hint: 'Slope first, then use one point.',
        s: [`$m = \\dfrac{${m*x2+b} - (${m*x1+b})}{${x2} - (${x1})} = ${m}$`, `$${m*x1+b} = ${m}(${x1}) + b$, so $b = ${b}$`,
            `$y = ${m}x ${b<0?'- '+(-b):'+ '+b}$`] }; },
    special(r) { const x = ri(r,-9,9), y = ri(r,-9,9), horiz = r() < .5;
      return { q: `What is the equation of the ${horiz?'horizontal':'vertical'} line through $(${x}, ${y})$?`,
        a: horiz ? `y = ${y}` : `x = ${x}`, alt: horiz ? [`y=${y}`] : [`x=${x}`],
        hint: horiz ? 'Horizontal means $y$ never changes.' : 'Vertical means $x$ never changes.',
        s: [horiz ? `$y = ${y}$` : `$x = ${x}$`] }; },
    standard(r) { const n = ri(r,1,9), d = pick(r,[2,3,4,5]), b = ri(r,-9,9);
      return { q: `Write $y = ${tex(n,d)}x ${b<0?'- '+(-b):'+ '+b}$ in standard form $Ax + By = C$ with integer coefficients.`,
        a: `${n}x - ${d}y = ${-b*d}`, alt: [`${n}x-${d}y=${-b*d}`],
        hint: `Multiply everything by $${d}$, then move the $x$ term across.`,
        s: [`$\\times ${d}$: $${d}y = ${n}x ${-b*d<0?'- '+(b*d):'+ '+(-b*d)}$`, `$${n}x - ${d}y = ${-b*d}$`] }; }
  },

  writelinear: {
    model(r) { const fee = ri(r,10,90), rate = ri(r,5,50), drain = r() < .35;
      if (drain) { const cap = rate * ri(r,6,30);
        return { q: `A tank holds $${cap}$ litres and loses $${rate}$ litres an hour. Write $V(t)$.`,
          a: `V(t) = -${rate}t + ${cap}`, alt: [`-${rate}t+${cap}`, `V=-${rate}t+${cap}`],
          hint: 'Losing means a negative slope.', s: [`$b = ${cap}$`, `$m = -${rate}$`, `$V(t) = -${rate}t + ${cap}$`] }; }
      const k = pick(r,[['an hour','h'],['a month','m'],['a day','d']]);
      return { q: `A service charges $\\$${fee}$ up front plus $\\$${rate}$ ${k[0]}. Write $C(${k[1]})$.`,
        a: `C(${k[1]}) = ${rate}${k[1]} + ${fee}`, alt: [`${rate}${k[1]}+${fee}`, `C=${rate}${k[1]}+${fee}`],
        hint: 'The up-front charge is the starting value.', s: [`$b = ${fee}$`, `$m = ${rate}$`, `$C(${k[1]}) = ${rate}${k[1]} + ${fee}$`] }; },
    rate(r) { const m = ri(r,-9,9)||5, b = ri(r,-12,12);
      return { q: `For $f(x) = ${m}x ${b<0?'- '+(-b):'+ '+b}$, what is the rate of change?`, a: String(m),
        hint: 'For a linear function it is the slope.', s: [`$m = ${m}$`, 'Constant everywhere, because the function is linear.'] }; },
    arith(r) { const a1 = ri(r,-9,20), d = ri(r,-9,9)||4, n = ri(r,6,30);
      const which = pick(r,['term','difference','explicit']);
      if (which === 'difference') return { q: `Find the common difference of $${a1}, ${a1+d}, ${a1+2*d}, ${a1+3*d}, \\ldots$.`,
        a: String(d), hint: 'Subtract consecutive terms.', s: [`$${a1+d} - (${a1}) = ${d}$`, `Check: $${a1+2*d} - (${a1+d}) = ${d}$ &check;`] };
      if (which === 'explicit') return { q: `Write an explicit formula for $${a1}, ${a1+d}, ${a1+2*d}, ${a1+3*d}, \\ldots$.`,
        a: `a_n = ${a1} + ${d}(n - 1)`, alt: [`${d}n ${a1-d<0?'- '+(d-a1):'+ '+(a1-d)}`, `a_n = ${d}n ${a1-d<0?'- '+(d-a1):'+ '+(a1-d)}`],
        hint: 'First term plus $(n-1)$ steps.', s: [`$a_1 = ${a1}$, $d = ${d}$`, `$a_n = ${a1} + (n-1)(${d})$`, `Or $${d}n ${a1-d<0?'- '+(d-a1):'+ '+(a1-d)}$`] };
      return { q: `Find the $${n}$th term of $${a1}, ${a1+d}, ${a1+2*d}, \\ldots$.`, a: String(a1 + (n-1)*d),
        hint: `$d = ${d}$; remember it is $n - 1$ steps.`,
        s: [`$${a1} + ${n-1}(${d})$`, `$= ${a1} + ${(n-1)*d}$`, `$= ${a1+(n-1)*d}$`] }; },
    avgrate(r) { const a = ri(r,1,4), c = ri(r,-6,6), x1 = ri(r,0,4), x2 = x1 + ri(r,2,6);
      const f = t => a*t*t + c, num = f(x2) - f(x1), den = x2 - x1;
      return { q: `For $f(x) = ${a}x^2 ${c<0?'- '+(-c):'+ '+c}$, find the average rate of change from $x = ${x1}$ to $x = ${x2}$.`,
        a: fs(num, den), alt: [String(Math.round(num/den*1000)/1000)],
        hint: 'Use $\\dfrac{f(b) - f(a)}{b - a}$.',
        s: [`$f(${x1}) = ${f(x1)}$`, `$f(${x2}) = ${f(x2)}$`, `$\\dfrac{${f(x2)} - (${f(x1)})}{${x2} - ${x1}} = ${tex(num,den)}$`] }; },
    shift(r) { const k = ri(r,1,8), dir = pick(r,['up','down','left','right']);
      const a = dir === 'up' ? `f(x) + ${k}` : dir === 'down' ? `f(x) - ${k}` : dir === 'left' ? `f(x + ${k})` : `f(x - ${k})`;
      return { q: `The graph of $f(x)$ is shifted $${k}$ units ${dir}. Write the new function.`,
        a: a, alt: [a.replace(/ /g,'')],
        hint: (dir === 'up' || dir === 'down') ? 'Vertical shifts act outside the brackets.' : 'Horizontal shifts act inside — and backwards.',
        s: [(dir === 'up' || dir === 'down') ? `${dir === 'up' ? 'Add' : 'Subtract'} $${k}$ outside the brackets.`
            : `${dir === 'left' ? 'Add' : 'Subtract'} $${k}$ inside the brackets — inside is reversed.`, `$${a}$`] }; }
  },

  systems9: {
    substitute(r) { const x = ri(r,-6,8), m = ri(r,2,7), b = ri(r,-9,9), m2 = ri(r,1,5), b2 = (m*x+b) - m2*x;
      return { q: `Solve $y = ${m}x ${b<0?'- '+(-b):'+ '+b}$ and $y = ${m2}x ${b2<0?'- '+(-b2):'+ '+b2}$.`,
        a: `(${x}, ${m*x+b})`, alt: [`(${x},${m*x+b})`], hint: 'Set the two expressions for $y$ equal.',
        s: [`$${m}x ${b<0?'- '+(-b):'+ '+b} = ${m2}x ${b2<0?'- '+(-b2):'+ '+b2}$`, `$${m-m2}x = ${b2-b}$`, `$x = ${x}$, so $y = ${m*x+b}$`] }; },
    eliminate(r) { const x = ri(r,-7,9), y = ri(r,-7,9), a = ri(r,1,7), b = ri(r,1,7);
      return { q: `Solve $${a}x + ${b}y = ${a*x+b*y}$ and $${a}x - ${b}y = ${a*x-b*y}$.`, a: `(${x}, ${y})`, alt: [`(${x},${y})`],
        hint: 'Add the equations.', s: [`Add: $${2*a}x = ${2*a*x}$`, `$x = ${x}$`, `$y = ${y}$`] }; },
    check(r) { const x = ri(r,-6,8), y = ri(r,-6,8), a = ri(r,1,5), b = ri(r,1,5), ok = r() < .6;
      const gy = ok ? y : y + ri(r,1,3);
      return { q: `Is $(${x}, ${gy})$ a solution of $${a}x + ${b}y = ${a*x+b*y}$ and $x - y = ${x-y}$? Answer yes or no.`,
        a: ok ? 'yes' : 'no', hint: 'Test it in both equations.',
        s: [`First: $${a}(${x}) + ${b}(${gy}) = ${a*x+b*gy}$, needed $${a*x+b*y}$`,
            `Second: $${x} - (${gy}) = ${x-gy}$, needed $${x-y}$`, ok ? 'Both pass, so yes.' : 'At least one fails, so no.'] }; },
    boundary(r) { const strict = r() < .5;
      return { q: `For $y ${strict?'>':'\\geq'} 2x + 1$, is the boundary line solid or dashed?`,
        a: strict ? 'dashed' : 'solid', hint: 'Does the line itself satisfy the inequality?',
        s: [strict ? 'A strict inequality excludes the line.' : 'The $\\geq$ includes the line.', strict ? 'So dashed.' : 'So solid.'] }; },
    multiply(r) { const x = ri(r,-5,8), y = ri(r,-5,8), b = ri(r,2,5), c = ri(r,2,5);
      return { q: `Solve $x + ${b}y = ${x+b*y}$ and $${c}x - y = ${c*x-y}$.`, a: `(${x}, ${y})`, alt: [`(${x},${y})`],
        hint: `Multiply the second equation by $${b}$, then add.`,
        s: [`$\\times ${b}$: $${c*b}x - ${b}y = ${b*(c*x-y)}$`, `Add: $${1+b*c}x = ${x+b*y+b*(c*x-y)}$`, `$x = ${x}$, $y = ${y}$`] }; },
    shade(r) { const m = ri(r,-5,5)||2, b = ri(r,1,9)*(r()<.5?1:-1), le = r() < .5;
      const ok = le ? (0 <= b) : (0 >= b);
      return { q: `For $y ${le?'\\leq':'\\geq'} ${m}x ${b<0?'- '+(-b):'+ '+b}$, does the shading include $(0, 0)$? Answer yes or no.`,
        a: ok ? 'yes' : 'no', hint: 'Test the origin.',
        s: [`At $(0,0)$: is $0 ${le?'\\leq':'\\geq'} ${b}$?`, ok ? 'True, so the origin is in the region.' : 'False, so the origin is outside it.'] }; },
    nosolution(r) { const a = ri(r,2,6), b = ri(r,1,6), c = ri(r,2,12), k = pick(r,[2,3]), off = ri(r,1,5);
      return { q: `How many solutions does $${a}x - ${b}y = ${c}$ and $${a*k}x - ${b*k}y = ${c*k + off}$ have?`,
        a: 'none', alt: ['no solution','0'], hint: 'Scale the first equation and compare.',
        s: [`$\\times ${k}$: $${a*k}x - ${b*k}y = ${c*k}$`, `But the second says $${c*k+off}$.`, 'Parallel lines, so no solution.'] }; },
    word(r) { const pa = ri(r,2,12), pb = pa + ri(r,1,9), na = ri(r,3,20), nb = ri(r,3,20);
      const tot = na + nb, money = pa*na + pb*nb;
      return { q: `A shop sells $\\$${pa}$ and $\\$${pb}$ notebooks. It sold $${tot}$ notebooks for $\\$${money}$. How many of the cheaper kind?`,
        a: String(na), unit: 'notebooks', hint: 'One equation for the count, one for the money.',
        s: [`$a + b = ${tot}$ and $${pa}a + ${pb}b = ${money}$`,
            `$b = ${tot} - a$, so $${pa}a + ${pb}(${tot} - a) = ${money}$`,
            `$${pa-pb}a = ${money - pb*tot}$`, `$a = ${na}$`] }; },
    graph(r) { const right = 'the two boundary lines cross';
      return Object.assign({ q: 'A system of two linear inequalities has a wedge-shaped solution region. This means',
        hint: 'Think about where two half-planes overlap.',
        s: ['Two crossing lines cut the plane into four wedges.', 'The solution is whichever wedge satisfies both.'] },
        mc(r, right, ['the lines are parallel', 'there is no solution', 'the lines are identical'])); }
  },

  regression: {
    readr(r) { const v = pick(r,[0.95,0.88,0.72,0.35,0.05,-0.42,-0.79,-0.93]);
      const strong = Math.abs(v) >= 0.7, none = Math.abs(v) < 0.2;
      const right = none ? 'almost no linear relationship' : `${strong?'strong':'weak'} and ${v>0?'positive':'negative'}`;
      const w = ['almost no linear relationship', 'strong and positive', 'weak and negative', 'strong and negative', 'weak and positive']
        .filter(o => o !== right).slice(0,3);
      return Object.assign({ q: `$r = ${v}$ describes a relationship that is`,
        hint: 'Read the sign for direction and the size for strength.',
        s: [none ? `$${v}$ is very close to $0$.` : `Sign: ${v>0?'positive':'negative'}.`,
            none ? 'So almost no linear relationship.' : `$|${v}|$ is ${strong?'close to $1$, so strong':'well below $1$, so weak'}.`] }, mc(r, right, w)); },
    residual(r) { const m = ri(r,2,8), b = ri(r,2,30), x = ri(r,2,12), diff = ri(r,-12,12)||5;
      const pred = m*x + b;
      return { q: `A regression line is $\\hat{y} = ${m}x + ${b}$. For $x = ${x}$ the actual value was $${pred+diff}$. Find the residual.`,
        a: String(diff), hint: 'Predict first, then take actual minus predicted.',
        s: [`Predicted: $${m}(${x}) + ${b} = ${pred}$`, `$${pred+diff} - ${pred} = ${diff}$`] }; },
    predict(r) { const m = +(ri(r,-60,80)/10).toFixed(1) || 2, b = ri(r,10,90), x = ri(r,2,16);
      return { q: `A regression line is $\\hat{y} = ${m}x + ${b}$. Predict $y$ when $x = ${x}$.`,
        a: String(+(m*x+b).toFixed(2)), hint: 'Substitute.', s: [`$${m}(${x}) = ${+(m*x).toFixed(2)}$`, `$+ ${b} = ${+(m*x+b).toFixed(2)}$`] }; },
    slope(r) { const m = +(ri(r,-40,45)/10).toFixed(1) || 1.5;
      const k = pick(r,[['hours','dollars'],['years','hours of sleep'],['kilometres','minutes'],['weeks','kilograms']]);
      return { q: `For $\\hat{y} = ${m}x + ${ri(r,10,60)}$, with $x$ in ${k[0]} and $y$ in ${k[1]}, interpret the slope.`,
        a: `${m} ${k[1]} per ${k[0].replace(/s$/,'')}`, alt: [String(m)],
        hint: 'Attach the units and say "associated with".',
        s: [`Units: ${k[1]} per ${k[0].replace(/s$/,'')}`,
            `Each extra ${k[0].replace(/s$/,'')} is associated with $${Math.abs(m)}$ ${m<0?'fewer':'more'} ${k[1]}.`] }; },
    resplot(r) { const right = 'a line is the wrong model';
      return Object.assign({ q: 'A residual plot shows a clear curved arch. This means',
        hint: 'Residuals should look patternless.',
        s: ['Structure in the residuals means the model missed something systematic.', 'The data curves, but the line cannot.'] },
        mc(r, right, ['the line fits perfectly', '$r$ must be zero', 'the data has no outliers'])); },
    sign(r) { const neg = r() < .5;
      return { q: `A regression line has a ${neg?'negative':'positive'} slope. What is the sign of $r$?`,
        a: neg ? 'negative' : 'positive', hint: '$r$ and the slope always agree.',
        s: [`A ${neg?'falling':'rising'} line means $r$ is ${neg?'negative':'positive'}.`] }; },
    cause(r) { const right = 'nothing about cause';
      return Object.assign({ q: 'A strong $r$ between two observed variables proves',
        hint: 'What can observational data support?',
        s: ['Correlation measures how the variables moved together.', 'Cause needs a controlled, randomised experiment.'] },
        mc(r, right, ['that the first causes the second', 'that the second causes the first', 'that a third variable is involved'])); },
    residsum(r) { return { q: 'For a least-squares regression line, what do all the residuals add up to?', a: '0',
        alt: ['zero'], hint: 'The line splits the misses evenly.',
        s: ['Points above the line give positive residuals, points below give negative.', 'They cancel exactly, so the sum is $0$.'] }; },
    compare(r) { const a = pick(r,[0.4,0.55,0.6,0.7]), b = pick(r,[-0.85,-0.78,-0.5,-0.35]);
      const right = Math.abs(a) > Math.abs(b) ? 'A' : 'B';
      return Object.assign({ q: `Study A has $r = ${a}$; study B has $r = ${b}$. Which has the stronger linear relationship?`,
        hint: 'Compare sizes, ignoring the sign.',
        s: [`$|${a}| = ${Math.abs(a)}$`, `$|${b}| = ${Math.abs(b)}$`, `$${Math.max(Math.abs(a),Math.abs(b))} > ${Math.min(Math.abs(a),Math.abs(b))}$, so ${right}.`] },
        mc(r, right, ['A', 'B', 'They are equal', 'Cannot be determined'].filter(o => o !== right).slice(0,3))); },
    interpret(r) { const m = +(-ri(r,2,9)/10).toFixed(1);
      return { q: `For $\\hat{y} = ${m}x + ${ri(r,20,40)}$, where $x$ is age in years and $y$ is hours of sleep, interpret the slope in context.`,
        a: `sleep drops ${Math.abs(m)} hours per year of age`, alt: [String(m), `${m} hours per year`],
        hint: 'Negative slope means a decrease.',
        s: ['The slope is negative, so sleep falls as age rises.', `Each extra year is associated with $${Math.abs(m)}$ fewer hours.`] }; },
    reason(r) { const lo = ri(r,2,8), hi = lo + ri(r,8,20), out = hi + ri(r,50,200);
      return { q: `A regression on data for $x$ between $${lo}$ and $${hi}$ gives $\\hat{y} = 3x + 10$. Is predicting at $x = ${out}$ reliable? Answer yes or no.`,
        a: 'no', hint: 'Check the data range.',
        s: [`$${out}$ is far outside $${lo}$ to $${hi}$.`, 'That is extrapolation, so not reliable.'] }; }
  },

  exponential: {
    classify(r) { const expo = r() < .5, a = ri(r,2,7), d = ri(r,3,9), b = ri(r,2,4);
      const ys = expo ? [a, a*b, a*b*b, a*b*b*b] : [a, a+d, a+2*d, a+3*d];
      return { q: `Is $${ys.join(', ')}$ linear or exponential?`, a: expo ? 'exponential' : 'linear',
        hint: 'Try subtracting, then try dividing.',
        s: [`Differences: $${[1,2,3].map(i=>ys[i]-ys[i-1]).join(', ')}$`,
            `Ratios: $${[1,2,3].map(i=>ys[i]/ys[i-1]).join(', ')}$`,
            expo ? `Constant ratio $${b}$, so exponential.` : `Constant difference $${d}$, so linear.`] }; },
    evaluate(r) { const a = ri(r,2,9), b = pick(r,[2,3,4,5]), x = ri(r,2,5);
      return { q: `For $f(x) = ${a} \\cdot ${b}^x$, find $f(${x})$.`, a: String(a * b**x),
        hint: 'Work out the power first, then multiply.',
        s: [`$${b}^${x} = ${b**x}$`, `$${a} \\times ${b**x} = ${a * b**x}$`] }; },
    initial(r) { const a = ri(r,2,40), b = pick(r,[2,3,4,5,7,10]);
      return { q: `For $f(x) = ${a} \\cdot ${b}^x$, find $f(0)$.`, a: String(a),
        hint: 'Any base to the power $0$ is $1$.', s: [`$${b}^0 = 1$`, `$${a} \\times 1 = ${a}$`] }; },
    factor(r) { const p = ri(r,1,40), grow = r() < .5;
      const f = grow ? +(1 + p/100).toFixed(2) : +(1 - p/100).toFixed(2);
      return { q: `${grow?'Growing':'Shrinking'} by $${p}\\%$ means multiplying by what factor?`, a: String(f),
        hint: grow ? 'Keep the original and add the growth.' : 'Keep what is left over.',
        s: [grow ? `$1 + ${p/100} = ${f}$` : `$1 - ${p/100} = ${f}$`] }; },
    model(r) { const a = ri(r,2,90)*100, p = ri(r,2,30), grow = r() < .5;
      const f = grow ? +(1 + p/100).toFixed(2) : +(1 - p/100).toFixed(2);
      return { q: `A quantity starts at $${a}$ and ${grow?'grows':'decays'} $${p}\\%$ a year. Write $P(t)$.`,
        a: `P(t) = ${a}(${f})^t`, alt: [`${a}(${f})^t`], hint: `$b = 1 ${grow?'+':'-'} r$.`,
        s: [`$a = ${a}$`, `$b = ${f}$`, `$P(t) = ${a}(${f})^t$`] }; },
    rule(r) { const a = ri(r,2,9), b = pick(r,[2,3,4,5]);
      return { q: `Write the exponential rule for $x$: $0, 1, 2, 3$ and $y$: $${a}, ${a*b}, ${a*b*b}, ${a*b*b*b}$.`,
        a: `y = ${a} * ${b}^x`, alt: [`${a}*${b}^x`, `y = ${a}(${b})^x`, `${a}(${b})^x`],
        hint: 'The value at $x = 0$ is $a$; the ratio is $b$.',
        s: [`$a = ${a}$`, `Ratio $= ${b}$`, `$y = ${a} \\cdot ${b}^x$`] }; },
    compute(r) { const P = ri(r,2,20)*100, p = pick(r,[3,4,5,6,8,10]), t = ri(r,2,6);
      const v = +(P * Math.pow(1 + p/100, t)).toFixed(2);
      return { q: `A $\\$${P}$ investment grows $${p}\\%$ a year. What is it worth after $${t}$ years, to the nearest cent?`,
        a: String(v), unit: '$', hint: `Compute $${P}(1.${p<10?'0'+p:p})^${t}$.`,
        s: [`$(1.${p<10?'0'+p:p})^${t} = ${Math.pow(1+p/100,t).toFixed(6)}$`, `$${P} \\times ${Math.pow(1+p/100,t).toFixed(6)} \\approx ${v}$`] }; },
    graph(r) { const a = ri(r,2,9), b = pick(r,[0.2,0.4,0.5,0.8]);
      const right = 'approaches $0$ but never reaches it';
      return Object.assign({ q: `As $x$ grows without bound, the graph of $y = ${a}(${b})^x$`,
        hint: `Is $${b}$ bigger or smaller than $1$?`,
        s: [`$${b} < 1$, so this is decay.`, 'Each step multiplies by less than one.', 'The $x$-axis is an asymptote.'] },
        mc(r, right, ['increases without bound', 'becomes negative', 'reaches $0$ exactly'])); },
    geometric(r) { const a = ri(r,2,9), b = pick(r,[2,3,4,5]), n = ri(r,4,8);
      return { q: `Find the $${n}$th term of the geometric sequence $${a}, ${a*b}, ${a*b*b}, \\ldots$.`,
        a: String(a * b**(n-1)), hint: `$r = ${b}$; use $a_1 r^{\\,n-1}$.`,
        s: [`$${a} \\cdot ${b}^${n-1}$`, `$${b}^${n-1} = ${b**(n-1)}$`, `$= ${a * b**(n-1)}$`] }; },
    double(r) { const a = ri(r,2,80), t = ri(r,4,10), b = pick(r,[2,3]);
      return { q: `A count ${b===2?'doubles':'triples'} every hour, starting at $${a}$. How many after $${t}$ hours?`,
        a: String(a * b**t), hint: `Write $${a} \\cdot ${b}^t$.`,
        s: [`$${b}^${t} = ${b**t}$`, `$${a} \\times ${b**t} = ${a * b**t}$`] }; },
    solve(r) { const P = ri(r,1,10)*1000, p = pick(r,[5,8,10,12,15]);
      let t = 1; while (P * Math.pow(1+p/100, t) <= 2*P) t++;
      return { q: `For how many years must $\\$${P}$ grow at $${p}\\%$ before it first exceeds $\\$${2*P}$? Give a whole number of years.`,
        a: String(t), unit: 'years', hint: `Try values of $t$ in $${P}(1 + ${p/100})^t$.`,
        s: [`At $t = ${t-1}$: $\\$${(P*Math.pow(1+p/100,t-1)).toFixed(2)}$ — not yet`,
            `At $t = ${t}$: $\\$${(P*Math.pow(1+p/100,t)).toFixed(2)}$`, `$${t}$ years`] }; },
    compare(r) { const m = pick(r,[50,100,200]), b = 2, x = ri(r,8,12);
      const A = m*x, B = b**x;
      const right = A > B ? 'A' : 'B';
      return Object.assign({ q: `Function A is $y = ${m}x$ and B is $y = ${b}^x$. At $x = ${x}$, which is larger?`,
        hint: 'Evaluate both.', s: [`A: $${m}(${x}) = ${A}$`, `B: $${b}^{${x}} = ${B}$`,
            `$${Math.max(A,B)} > ${Math.min(A,B)}$, so ${right}.`] },
        mc(r, right, ['A', 'B', 'They are equal'].filter(o => o !== right).slice(0,2).concat(['Cannot be determined']))); }
  },

  sequences9: {
    classify(r) { const geo = r() < .5, a = ri(r,2,9), d = ri(r,2,9), b = pick(r,[2,3,4,5]);
      const ys = geo ? [a, a*b, a*b*b, a*b*b*b] : [a, a+d, a+2*d, a+3*d];
      return { q: `Classify $${ys.join(', ')}, \\ldots$ as arithmetic or geometric.`, a: geo ? 'geometric' : 'arithmetic',
        hint: 'Subtract, then divide.',
        s: [`Differences: $${[1,2,3].map(i=>ys[i]-ys[i-1]).join(', ')}$`, `Ratios: $${[1,2,3].map(i=>ys[i]/ys[i-1]).join(', ')}$`,
            geo ? `Constant ratio $${b}$, so geometric.` : `Constant difference $${d}$, so arithmetic.`] }; },
    term(r) { const geo = r() < .4, a = ri(r,2,9), d = ri(r,2,8), b = pick(r,[2,3]), n = geo ? ri(r,4,7) : ri(r,8,25);
      if (geo) return { q: `Find the $${n}$th term of $${a}, ${a*b}, ${a*b*b}, \\ldots$.`, a: String(a * b**(n-1)),
        hint: `$r = ${b}$.`, s: [`$${a} \\cdot ${b}^${n-1}$`, `$= ${a * b**(n-1)}$`] };
      return { q: `Find the $${n}$th term of $${a}, ${a+d}, ${a+2*d}, \\ldots$.`, a: String(a + (n-1)*d),
        hint: `$d = ${d}$; that is $n - 1$ steps.`, s: [`$${a} + ${n-1}(${d})$`, `$= ${a + (n-1)*d}$`] }; },
    explicit(r) { const a = ri(r,2,15), d = ri(r,-9,9)||4;
      return { q: `Write an explicit formula for $${a}, ${a+d}, ${a+2*d}, ${a+3*d}, \\ldots$.`,
        a: `a_n = ${a} + ${d}(n - 1)`, alt: [`${d}n ${a-d<0?'- '+(d-a):'+ '+(a-d)}`, `a_n = ${d}n ${a-d<0?'- '+(d-a):'+ '+(a-d)}`],
        hint: 'First term plus $(n-1)$ common differences.',
        s: [`$a_1 = ${a}$, $d = ${d}$`, `$a_n = ${a} + (n-1)(${d})$`, `Simplified: $${d}n ${a-d<0?'- '+(d-a):'+ '+(a-d)}$`] }; },
    recursive(r) { const geo = r() < .4, a = ri(r,2,12), d = ri(r,2,9), b = pick(r,[2,3,4]);
      const ys = geo ? [a, a*b, a*b*b, a*b*b*b] : [a, a+d, a+2*d, a+3*d];
      return { q: `Write a recursive formula for $${ys.join(', ')}, \\ldots$.`,
        a: geo ? `a_1 = ${a}, a_n = ${b}a_(n-1)` : `a_1 = ${a}, a_n = a_(n-1) + ${d}`,
        alt: geo ? [`a1=${a}, an=${b}an-1`] : [`a1=${a}, an=an-1+${d}`],
        hint: 'Two lines: the starting value and the rule.',
        s: [`$a_1 = ${a}$`, geo ? `$a_n = ${b}a_{n-1}$` : `$a_n = a_{n-1} + ${d}$`, 'Both lines are required.'] }; },
    findd(r) { const a = ri(r,-9,12), d = ri(r,2,9), i = ri(r,2,5), j = i + ri(r,2,6);
      return { q: `An arithmetic sequence has $a_{${i}} = ${a + (i-1)*d}$ and $a_{${j}} = ${a + (j-1)*d}$. Find $d$.`,
        a: String(d), hint: `There are $${j-i}$ steps between them.`,
        s: [`$${a+(j-1)*d} - ${a+(i-1)*d} = ${(j-i)*d}$`, `$${(j-i)*d} \\div ${j-i} = ${d}$`] }; },
    findr(r) { const a = ri(r,2,9), b = pick(r,[2,3,4]), i = 2, j = 5;
      return { q: `A geometric sequence has $a_{2} = ${a*b}$ and $a_{5} = ${a * b**4}$. Find $a_1$.`,
        a: String(a), hint: 'Three steps separate the two terms.',
        s: [`$${a*b} \\cdot r^3 = ${a*b**4}$, so $r^3 = ${b**3}$ and $r = ${b}$`, `$a_1 = ${a*b} \\div ${b} = ${a}$`] }; },
    graph(r) { const right = 'a set of separate points';
      return Object.assign({ q: 'The graph of a sequence is',
        hint: 'What is the domain of a sequence?',
        s: ['The domain is the counting numbers only.', 'So the graph is separate dots, never joined.'] },
        mc(r, right, ['a continuous line', 'a smooth curve', 'a shaded region'])); },
    sum(r) { const a = ri(r,2,12), d = ri(r,3,8), n = ri(r,10,30);
      return { q: `How many terms are there in $${a}, ${a+d}, ${a+2*d}, \\ldots, ${a+(n-1)*d}$?`, a: String(n),
        hint: `Solve $${a} + (n-1)(${d}) = ${a+(n-1)*d}$.`,
        s: [`$(n-1)(${d}) = ${(n-1)*d}$`, `$n - 1 = ${n-1}$`, `$n = ${n}$`] }; }
  },

  polynomials: {
    add(r) { const a = ri(r,1,8), b = ri(r,1,9), c = ri(r,1,8), d = ri(r,-9,9)||3;
      return { q: `Simplify $(${a}x^2 + ${b}x) + (${c}x^2 ${d<0?'- '+(-d):'+ '+d}x)$.`,
        a: `${a+c}x^2 + ${b+d}x`, alt: [`${a+c}x^2${b+d<0?'-'+(-(b+d)):'+'+(b+d)}x`],
        hint: 'Collect like terms.', s: [`$${a}x^2 + ${c}x^2 = ${a+c}x^2$`, `$${b}x ${d<0?'- '+(-d):'+ '+d}x = ${b+d}x$`] }; },
    subtract(r) { const a = ri(r,2,9), b = ri(r,-9,9)||3, c = ri(r,-9,9)||4, d = ri(r,1,6), e = ri(r,1,8), f = ri(r,-9,9)||2;
      const A = a - d, B = b - e, C = c - f;
      return { q: `Simplify $(${a}x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c}) - (${d}x^2 + ${e}x ${f<0?'- '+(-f):'+ '+f})$.`,
        a: `${A}x^2 ${B<0?'- '+(-B):'+ '+B}x ${C<0?'- '+(-C):'+ '+C}`,
        alt: [`${A}x^2${B<0?'-'+(-B):'+'+B}x${C<0?'-'+(-C):'+'+C}`],
        hint: 'The minus sign reaches every term in the second bracket.',
        s: [`Signs flip: $- ${d}x^2 - ${e}x ${-f<0?'- '+f:'+ '+(-f)}$`, `$x^2$: $${a} - ${d} = ${A}$`,
            `$x$: $${b} - ${e} = ${B}$`, `Constants: $${c} - (${f}) = ${C}$`] }; },
    multiply(r) { const a = ri(r,1,5), b = ri(r,-9,9)||3, c = ri(r,1,5), d = ri(r,-9,9)||4;
      const A = a*c, B = a*d + b*c, C = b*d;
      return { q: `Expand $(${a}x ${b<0?'- '+(-b):'+ '+b})(${c}x ${d<0?'- '+(-d):'+ '+d})$.`,
        a: `${A}x^2 ${B<0?'- '+(-B):'+ '+B}x ${C<0?'- '+(-C):'+ '+C}`,
        alt: [`${A}x^2${B<0?'-'+(-B):'+'+B}x${C<0?'-'+(-C):'+'+C}`],
        hint: 'Every term in the first bracket meets every term in the second.',
        s: [`$${a}x \\cdot ${c}x = ${A}x^2$`, `Middle: $${a*d}x ${b*c<0?'- '+(-b*c):'+ '+b*c}x = ${B}x$`, `$${b} \\times ${d} = ${C}$`] }; },
    square(r) { const a = ri(r,1,6), b = ri(r,1,9), neg = r() < .5;
      const B = (neg ? -2 : 2)*a*b, C = b*b;
      return { q: `Expand $(${a}x ${neg?'-':'+'} ${b})^2$.`, a: `${a*a}x^2 ${B<0?'- '+(-B):'+ '+B}x + ${C}`,
        alt: [`${a*a}x^2${B<0?'-'+(-B):'+'+B}x+${C}`],
        hint: 'Write the bracket out twice — never square the terms separately.',
        s: [`$(${a}x ${neg?'-':'+'} ${b})(${a}x ${neg?'-':'+'} ${b})$`, `$${a*a}x^2$`,
            `Middle: twice $${a}x \\times ${neg?'-':''}${b}$, so $${B}x$`, `$(${neg?'-':''}${b})^2 = ${C}$`] }; },
    closure(r) { const right = 'Division';
      return Object.assign({ q: 'Polynomials are <em>not</em> closed under which operation?',
        hint: 'Which one can produce a negative exponent?',
        s: ['$\\dfrac{x^2 + 1}{x} = x + \\dfrac{1}{x}$', 'That is not a polynomial.', 'Add, subtract and multiply always stay inside.'] },
        mc(r, right, ['Addition', 'Subtraction', 'Multiplication'])); },
    degree(r) { const m = ri(r,1,4), n = ri(r,1,4);
      return { q: `What is the degree of $(x^${m} + 1)(x^${n} - 4)$?`, a: String(m+n),
        hint: 'Degrees add when you multiply.', s: [`$${m} + ${n} = ${m+n}$`, `The leading term is $x^${m+n}$.`] }; },
    area(r) { const a = ri(r,1,12), b = ri(r,1,12);
      return { q: `A rectangle has length $x + ${a}$ and width $x - ${b}$. Write its area as a polynomial.`,
        a: `x^2 ${a-b<0?'- '+(b-a):'+ '+(a-b)}x - ${a*b}`, alt: [`x^2${a-b<0?'-'+(b-a):'+'+(a-b)}x-${a*b}`],
        hint: 'Area is length times width.',
        s: [`$(x + ${a})(x - ${b})$`, `$x^2 - ${b}x + ${a}x - ${a*b}$`, `$= x^2 ${a-b<0?'- '+(b-a):'+ '+(a-b)}x - ${a*b}$`] }; }
  },

  factoring: {
    gcf(r) { const k = ri(r,2,9), a = ri(r,2,9), b = ri(r,2,12);
      if (a % 1 === 0 && b % 1 === 0 && (function g(m,n){return n?g(n,m%n):m})(a,b) !== 1) return this.gcf(R(ri(r,1,1e9)));
      return { q: `Factor $${k*a}x + ${k*b}$.`, a: `${k}(${a}x + ${b})`, alt: [`${k}(${a}x+${b})`],
        hint: 'Take out the greatest common factor.', s: [`GCF is $${k}$.`, `$${k}(${a}x + ${b})$`] }; },
    trinomial(r) { const p = ri(r,1,9)*(r()<.5?1:-1), q = ri(r,1,9)*(r()<.5?1:-1);
      if (p === q) return this.trinomial(R(ri(r,1,1e9)));
      const b = p + q, c = p*q;
      return { q: `Factor $x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c}$.`,
        a: `(x ${p<0?'- '+(-p):'+ '+p})(x ${q<0?'- '+(-q):'+ '+q})`,
        alt: [`(x${q<0?'-'+(-q):'+'+q})(x${p<0?'-'+(-p):'+'+p})`, `(x${p<0?'-'+(-p):'+'+p})(x${q<0?'-'+(-q):'+'+q})`],
        hint: `Two numbers multiplying to $${c}$ and adding to $${b}$.`,
        s: [`$${p}$ and $${q}$: product $${c}$, sum $${b}$ &check;`, `$(x ${p<0?'- '+(-p):'+ '+p})(x ${q<0?'- '+(-q):'+ '+q})$`] }; },
    squares(r) { const a = ri(r,1,9), b = ri(r,1,12);
      return { q: `Factor $${a*a}x^2 - ${b*b}$.`, a: `(${a}x - ${b})(${a}x + ${b})`,
        alt: [`(${a}x+${b})(${a}x-${b})`, `(${a}x-${b})(${a}x+${b})`],
        hint: 'Both terms are perfect squares with a minus between.',
        s: [`$(${a}x)^2 - ${b}^2$`, `$(${a}x - ${b})(${a}x + ${b})$`] }; },
    gcffirst(r) { const k = ri(r,2,6), p = ri(r,1,7), q = ri(r,1,7);
      if (p === q) return this.gcffirst(R(ri(r,1,1e9)));
      return { q: `Factor $${k}x^2 + ${k*(p+q)}x + ${k*p*q}$ completely.`, a: `${k}(x + ${p})(x + ${q})`,
        alt: [`${k}(x+${q})(x+${p})`, `${k}(x+${p})(x+${q})`],
        hint: 'GCF first, then the trinomial.',
        s: [`$${k}(x^2 + ${p+q}x + ${p*q})$`, `$${p}$ and $${q}$ work.`, `$${k}(x + ${p})(x + ${q})$`] }; },
    lead(r) { const a = ri(r,2,4), p = ri(r,1,5), q = ri(r,1,7);
      // (a x + p)(x + q) = a x^2 + (aq + p) x + pq
      return { q: `Factor $${a}x^2 + ${a*q + p}x + ${p*q}$.`, a: `(${a}x + ${p})(x + ${q})`,
        alt: [`(x+${q})(${a}x+${p})`, `(${a}x+${p})(x+${q})`],
        hint: `Target product $a \\cdot c = ${a*p*q}$, sum $${a*q+p}$.`,
        s: [`Need two numbers multiplying to $${a*p*q}$, adding to $${a*q+p}$: $${a*q}$ and $${p}$`,
            `$${a}x^2 + ${a*q}x + ${p}x + ${p*q}$`, `$${a}x(x + ${q}) + ${p}(x + ${q})$`, `$(${a}x + ${p})(x + ${q})$`] }; },
    perfect(r) { const b = ri(r,2,12), neg = r() < .5;
      return { q: `Factor $x^2 ${neg?'- ':'+ '}${2*b}x + ${b*b}$.`, a: `(x ${neg?'-':'+'} ${b})^2`,
        alt: [`(x${neg?'-':'+'}${b})^2`, `(x${neg?'-':'+'}${b})(x${neg?'-':'+'}${b})`],
        hint: 'Is the middle term twice the product of the square roots?',
        s: [`$${b*b} = ${b}^2$ and $2 \\times ${b} = ${2*b}$ &check;`, `$(x ${neg?'-':'+'} ${b})^2$`] }; },
    prime(r) { const k = ri(r,2,12);
      const right = `$x^2 + ${k*k}$`;
      return Object.assign({ q: 'Which expression will not factor over the integers?',
        hint: 'A sum of squares is the odd one out.',
        s: [`$x^2 + ${k*k}$ is a sum of squares.`, 'It has no real factors.', 'The others are a difference of squares or a perfect square trinomial.'] },
        mc(r, right, [`$x^2 - ${k*k}$`, `$x^2 + ${2*k}x + ${k*k}$`, `$x^2 - ${2*k}x + ${k*k}$`])); },
    grouping(r) { const a = ri(r,1,8), b = ri(r,1,9);
      return { q: `Factor $x^3 + ${a}x^2 + ${b}x + ${a*b}$ by grouping.`, a: `(x + ${a})(x^2 + ${b})`,
        alt: [`(x^2+${b})(x+${a})`, `(x+${a})(x^2+${b})`],
        hint: 'Group in pairs and factor each pair.',
        s: [`$x^2(x + ${a}) + ${b}(x + ${a})$`, `The bracket $(x + ${a})$ is shared.`, `$(x + ${a})(x^2 + ${b})$`] }; },
    complete(r) { const k = ri(r,2,6), a = ri(r,1,9);
      return { q: `Factor $${k}x^3 - ${k*a*a}x$ completely.`, a: `${k}x(x - ${a})(x + ${a})`,
        alt: [`${k}x(x+${a})(x-${a})`, `${k}x(x-${a})(x+${a})`],
        hint: 'GCF first, then a difference of squares.',
        s: [`$${k}x(x^2 - ${a*a})$`, `$${k}x(x - ${a})(x + ${a})$`] }; },
    area(r) { const p = ri(r,1,9), q = ri(r,1,9);
      if (p === q) return this.area(R(ri(r,1,1e9)));
      return { q: `A rectangle has area $x^2 + ${p+q}x + ${p*q}$. Give expressions for its two sides.`,
        a: `x + ${p} and x + ${q}`, alt: [`(x+${p})(x+${q})`, `x+${q} and x+${p}`, `x + ${q} and x + ${p}`],
        hint: 'Factor the area.',
        s: [`$${p}$ and $${q}$: product $${p*q}$, sum $${p+q}$`, `$(x + ${p})(x + ${q})$`] }; }
  },

  quadgraphs: {
    opens(r) { const a = ri(r,-9,9) || 2, b = ri(r,-9,9), c = ri(r,-9,9);
      return { q: `Does $y = ${a}x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c}$ open up or down?`,
        a: a > 0 ? 'up' : 'down', alt: a > 0 ? ['upward'] : ['downward'],
        hint: 'Look at the sign of $a$.', s: [`$a = ${a}$`, `$${a} ${a>0?'>':'<'} 0$, so it opens ${a>0?'up':'down'}ward.`] }; },
    axis(r) { const a = ri(r,1,5)*(r()<.4?-1:1), h = ri(r,-8,8), b = -2*a*h;
      return { q: `Find the axis of symmetry of $y = ${a}x^2 ${b<0?'- '+(-b):'+ '+b}x + ${ri(r,-9,9)}$.`,
        a: `x = ${h}`, alt: [String(h), `x=${h}`], hint: '$x = -\\dfrac{b}{2a}$.',
        s: [`$-\\dfrac{${b}}{2(${a})} = ${h}$`, `$x = ${h}$`] }; },
    yint(r) { const a = ri(r,1,6), b = ri(r,-9,9), c = ri(r,-14,14)||5;
      return { q: `Find the $y$-intercept of $y = ${a}x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c}$.`,
        a: String(c), hint: 'Set $x = 0$.', s: ['Every term with $x$ vanishes.', `$y = ${c}$`] }; },
    vertexform(r) { const a = ri(r,1,4), h = ri(r,-9,9), k = ri(r,-12,12);
      return { q: `Give the vertex of $y = ${a===1?'':a}(x ${h<0?'+ '+(-h):'- '+h})^2 ${k<0?'- '+(-k):'+ '+k}$.`,
        a: `(${h}, ${k})`, alt: [`(${h},${k})`], hint: 'Vertex form gives it directly — watch the sign of $h$.',
        s: [`$x ${h<0?'+ '+(-h):'- '+h}$ is zero at $x = ${h}$.`, `$k = ${k}$`, `Vertex $(${h}, ${k})$`] }; },
    vertex(r) { const a = ri(r,1,4)*(r()<.4?-1:1), h = ri(r,-6,6), k = ri(r,-14,14);
      const b = -2*a*h, c = a*h*h + k;
      return { q: `Find the vertex of $y = ${a===1?'':a===-1?'-':a}x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c}$.`,
        a: `(${h}, ${k})`, alt: [`(${h},${k})`], hint: 'Find the axis with $-\\dfrac{b}{2a}$, then substitute.',
        s: [`$x = -\\dfrac{${b}}{2(${a})} = ${h}$`, `$y = ${a}(${h})^2 ${b<0?'- '+(-b):'+ '+b}(${h}) ${c<0?'- '+(-c):'+ '+c} = ${k}$`,
            `Vertex $(${h}, ${k})$, a ${a>0?'minimum':'maximum'}.`] }; },
    roots(r) { const p = ri(r,-9,9)||2, q = ri(r,-9,9)||5;
      if (p === q) return this.roots(R(ri(r,1,1e9)));
      const b = -(p+q), c = p*q;
      return { q: `Find the roots of $y = x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c}$.`,
        a: `${Math.min(p,q)} and ${Math.max(p,q)}`, alt: [`${Math.max(p,q)} and ${Math.min(p,q)}`, `${p}, ${q}`],
        hint: 'Factor, then set each factor to zero.',
        s: [`$(x ${-p<0?'- '+p:'+ '+(-p)})(x ${-q<0?'- '+q:'+ '+(-q)}) = 0$`, `$x = ${p}$ or $x = ${q}$`] }; },
    width(r) { const big = pick(r,[4,5,6,8]);
      const right = `$y = ${big}x^2$`;
      return Object.assign({ q: 'Which parabola is narrowest?', hint: 'A larger $|a|$ pinches the curve.',
        s: [`$|${big}|$ is the largest coefficient.`, 'So it rises fastest and is narrowest.'] },
        mc(r, right, ['$y = x^2$', '$y = 0.5x^2$', '$y = 0.1x^2$'])); },
    minmax(r) { const a = ri(r,-8,8)||3, b = ri(r,-9,9), c = ri(r,-9,9);
      return { q: `Does $y = ${a}x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c}$ have a maximum or a minimum?`,
        a: a > 0 ? 'minimum' : 'maximum', hint: 'Which way does it open?',
        s: [`$a = ${a}$, so it opens ${a>0?'up':'down'}ward.`, `The vertex is the ${a>0?'lowest':'highest'} point, so a ${a>0?'minimum':'maximum'}.`] }; },
    context(r) { const t = pick(r,[1,1.5,2,2.5,3]), v = 32*t, h0 = ri(r,0,12);
      const top = 16*t*t + h0;
      return { q: `A ball's height is $h(t) = -16t^2 + ${v}t ${h0?'+ '+h0:''}$ feet. Find the greatest height.`,
        a: String(top), unit: 'ft', hint: 'Find the $y$ value of the vertex.',
        s: [`$t = -\\dfrac{${v}}{2(-16)} = ${t}$ s`, `$h(${t}) = -16(${t*t}) + ${v}(${t}) ${h0?'+ '+h0:''}$`, `$= ${top}$ feet`] }; },
    symmetry(r) { const h = ri(r,-6,6), k = ri(r,-9,9), d = ri(r,1,6), y = ri(r,-9,14);
      return { q: `A parabola has vertex $(${h}, ${k})$ and passes through $(${h+d}, ${y})$. Find another point on it.`,
        a: `(${h-d}, ${y})`, alt: [`(${h-d},${y})`], hint: 'Reflect the known point across the axis of symmetry.',
        s: [`The axis is $x = ${h}$.`, `$(${h+d}, ${y})$ is $${d}$ to the right of it.`, `So $(${h-d}, ${y})$ is $${d}$ to the left.`] }; }
  },

  solvequad: {
    factor(r) { const p = ri(r,-9,9)||3, q = ri(r,-9,9)||4;
      if (p === q) return this.factor(R(ri(r,1,1e9)));
      const b = -(p+q), c = p*q;
      return { q: `Solve $x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c} = 0$.`,
        a: `${Math.min(p,q)} and ${Math.max(p,q)}`, alt: [`${Math.max(p,q)} and ${Math.min(p,q)}`, `${p}, ${q}`],
        hint: 'Factor, then set each factor to zero.',
        s: [`$(x ${-p<0?'- '+p:'+ '+(-p)})(x ${-q<0?'- '+q:'+ '+(-q)}) = 0$`, `$x = ${p}$ or $x = ${q}$`] }; },
    sqroot(r) { const k = ri(r,2,13), sh = r() < .5 ? 0 : ri(r,-8,8);
      if (!sh) return { q: `Solve $x^2 = ${k*k}$.`, a: `${k} and -${k}`, alt: [`±${k}`, `-${k} and ${k}`, `+/-${k}`],
        hint: 'A square root step gives two answers.', s: [`$x = \\pm ${k}$`] };
      return { q: `Solve $(x ${sh<0?'+ '+(-sh):'- '+sh})^2 = ${k*k}$.`,
        a: `${sh+k} and ${sh-k}`, alt: [`${sh-k} and ${sh+k}`], hint: 'Take roots, then undo the shift.',
        s: [`$x ${sh<0?'+ '+(-sh):'- '+sh} = \\pm ${k}$`, `$x = ${sh} + ${k} = ${sh+k}$ or $x = ${sh} - ${k} = ${sh-k}$`] }; },
    factorout(r) { const k = ri(r,2,12), a = ri(r,1,4);
      return { q: `Solve $${a===1?'':a}x^2 = ${a*k}x$.`, a: `0 and ${k}`, alt: [`${k} and 0`],
        hint: 'Move everything to one side and factor — never divide by $x$.',
        s: [`$${a===1?'':a}x^2 - ${a*k}x = 0$`, `$${a===1?'':a}x(x - ${k}) = 0$`, `$x = 0$ or $x = ${k}$`,
            'Dividing by $x$ would have lost the root $0$.'] }; },
    formula(r) { const a = pick(r,[1,2,3]), p = ri(r,-7,7)||2, q = ri(r,-7,7)||3;
      // a(x - p/1)(x - q) style: use integer roots p and q with leading a on one factor
      const b = -a*q - p, c = p*q;   // (a x + ... ) keep simple: roots p and q of a x^2 + bx + c? use a=1
      const A = 1, B = -(p+q), C = p*q, disc = B*B - 4*A*C;
      return { q: `Solve $x^2 ${B<0?'- '+(-B):'+ '+B}x ${C<0?'- '+(-C):'+ '+C} = 0$ using the quadratic formula.`,
        a: `${Math.min(p,q)} and ${Math.max(p,q)}`, alt: [`${Math.max(p,q)} and ${Math.min(p,q)}`],
        hint: 'Compute the discriminant on its own line first.',
        s: [`$a = 1$, $b = ${B}$, $c = ${C}$`, `$b^2 - 4ac = ${B*B} - ${4*C} = ${disc}$`,
            `$x = \\dfrac{${-B} \\pm \\sqrt{${disc}}}{2} = \\dfrac{${-B} \\pm ${Math.sqrt(disc)}}{2}$`,
            `$x = ${p}$ or $x = ${q}$`] }; },
    discrim(r) { const a = pick(r,[1,2]), b = ri(r,-9,9), c = ri(r,-9,9);
      const d = b*b - 4*a*c, n = d > 0 ? 'two' : d === 0 ? 'one' : 'no';
      return { q: `Find the discriminant of $${a===1?'':a}x^2 ${b<0?'- '+(-b):'+ '+b}x ${c<0?'- '+(-c):'+ '+c} = 0$ and say how many real solutions there are.`,
        a: `${d}, ${n} real solution${n==='one'?'':'s'}`, alt: [String(d), `${d} and ${n}`],
        hint: '$b^2 - 4ac$.',
        s: [`$(${b})^2 = ${b*b}$`, `$4(${a})(${c}) = ${4*a*c}$`, `$${b*b} - (${4*a*c}) = ${d}$`,
            d > 0 ? 'Positive, so two real solutions.' : d === 0 ? 'Zero, so one repeated solution.' : 'Negative, so no real solutions.'] }; },
    complete(r) { const h = ri(r,1,9), k = ri(r,1,13);
      const b = 2*h, rhs = k*k - h*h;
      return { q: `Solve $x^2 + ${b}x = ${rhs}$ by completing the square.`,
        a: `${-h+k} and ${-h-k}`, alt: [`${-h-k} and ${-h+k}`],
        hint: `Half of $${b}$ is $${h}$; add $${h*h}$ to both sides.`,
        s: [`$x^2 + ${b}x + ${h*h} = ${rhs + h*h}$`, `$(x + ${h})^2 = ${k*k}$`, `$x + ${h} = \\pm ${k}$`,
            `$x = ${-h+k}$ or $x = ${-h-k}$`] }; },
    zeroprod(r) { const k = ri(r,2,12);
      const right = 'Expand and move everything to one side';
      return Object.assign({ q: `Given $(x - 4)(x + 1) = ${k}$, which step is valid?`,
        hint: 'The zero product property only works against zero.',
        s: [`You cannot split a product that equals $${k}$.`, 'Expand first, then subtract to get zero on the right.'] },
        mc(r, right, [`Set $x - 4 = ${k}$`, `Set $x + 1 = ${k}$`, `Set both factors to $${k}$`])); },
    word(r) { const w = ri(r,2,14), extra = ri(r,1,9);
      return { q: `A rectangle is $${extra}$ cm longer than it is wide and has area $${w*(w+extra)}$ cm$^2$. Find its width.`,
        a: String(w), unit: 'cm', hint: 'Let the width be $w$ and write a quadratic.',
        s: [`$w(w + ${extra}) = ${w*(w+extra)}$`, `$w^2 + ${extra}w - ${w*(w+extra)} = 0$`,
            `$(w - ${w})(w + ${w+extra}) = 0$`, `$w = ${w}$ cm — a width cannot be negative.`] }; }
  },

  radicals: {
    simplify(r) { const k = ri(r,2,9), m = pick(r, NONSQ);
      return { q: `Simplify $\\sqrt{${k*k*m}}$.`, a: `${k}sqrt(${m})`, alt: [`${k}√${m}`, `${k}sqrt${m}`],
        hint: 'Find the largest perfect square factor.',
        s: [`$\\sqrt{${k*k} \\cdot ${m}}$`, `$= ${k}\\sqrt{${m}}$`, `Check: $${k}^2 \\times ${m} = ${k*k*m}$ &check;`] }; },
    exponent(r) { const n = pick(r,[2,3,4,5]), m = ri(r,1,7);
      const toExp = r() < .5;
      if (toExp) return { q: `Write $\\sqrt[${n}]{x^${m}}$ using a rational exponent.`, a: `x^(${m}/${n})`,
        alt: [`x^${m}/${n}`], hint: 'Numerator is the power, denominator the root.', s: [`$x^{${m}/${n}}$`] };
      return { q: `Write $x^{${m}/${n}}$ as a radical.`, a: `${n}th root of x^${m}`,
        alt: [`sqrt[${n}](x^${m})`, `x^${m} under a ${n}th root`],
        hint: 'The denominator names the root.', s: [`$\\sqrt[${n}]{x^${m}}$`] }; },
    evaluate(r) { const b = pick(r,[[8,3],[27,3],[64,3],[16,2],[25,2],[81,2],[125,3],[32,5]]);
      const base = b[0], root = b[1], rt = Math.round(Math.pow(base, 1/root)), p = ri(r,2,4);
      return { q: `Evaluate $${base}^{${p}/${root}}$.`, a: String(rt**p),
        hint: 'Take the root first, then raise to the power.',
        s: [`$\\sqrt[${root}]{${base}} = ${rt}$`, `$${rt}^${p} = ${rt**p}$`,
            `The other order would mean $\\sqrt[${root}]{${base**p}}$ — same answer, far more work.`] }; },
    add(r) { const m = pick(r, NONSQ), a = ri(r,1,6), b = ri(r,1,6);
      return { q: `Simplify $\\sqrt{${a*a*m}} + \\sqrt{${b*b*m}}$.`, a: `${a+b}sqrt(${m})`,
        alt: [`${a+b}√${m}`, `${a+b}sqrt${m}`], hint: 'Simplify each root first — the radicands must match.',
        s: [`$\\sqrt{${a*a*m}} = ${a}\\sqrt{${m}}$`, `$\\sqrt{${b*b*m}} = ${b}\\sqrt{${m}}$`,
            `$${a}\\sqrt{${m}} + ${b}\\sqrt{${m}} = ${a+b}\\sqrt{${m}}$`] }; },
    multiply(r) { const a = pick(r,[2,3,5,6,7,10]), b = pick(r,[2,3,5,6,7,10]);
      const prod = a*b; let k = 1; for (let i = 2; i*i <= prod; i++) if (prod % (i*i) === 0) k = i;
      const rest = prod/(k*k);
      return { q: `Simplify $\\sqrt{${a}} \\cdot \\sqrt{${b}}$.`,
        a: k === 1 ? `sqrt(${prod})` : rest === 1 ? String(k) : `${k}sqrt(${rest})`,
        alt: [k === 1 ? `√${prod}` : rest === 1 ? String(k) : `${k}√${rest}`],
        hint: 'Multiply under one root, then simplify.',
        s: [`$\\sqrt{${a} \\times ${b}} = \\sqrt{${prod}}$`,
            k === 1 ? 'No square factor, so that is simplest form.' : `$= ${rest===1?k:k+'\\sqrt{'+rest+'}'}$`] }; },
    irrational(r) { const rat = r() < .5, k = ri(r,2,9), m = pick(r, NONSQ);
      if (rat) return { q: `Is $\\sqrt{${k*k*m}} \\cdot \\sqrt{${m}}$ rational or irrational?`, a: 'rational',
        hint: 'Multiply under one root first.',
        s: [`$\\sqrt{${k*k*m*m}}$`, `$= ${k*m}$`, 'Rational — two irrationals can multiply to a rational.'] };
      return { q: `Is $${k} + \\sqrt{${m}}$ rational or irrational?`, a: 'irrational',
        hint: 'Rational plus irrational is always irrational.',
        s: [`$\\sqrt{${m}}$ is irrational and $${k}$ is rational.`, 'A rational plus an irrational is always irrational.'] }; }
  },

  advfunctions: {
    absvalue(r) { const a = ri(r,-20,20)||7, b = ri(r,-20,20);
      const inner = r() < .5;
      if (inner) return { q: `Evaluate $|${a} ${b<0?'- '+(-b):'+ '+b}|$.`, a: String(Math.abs(a+b)),
        hint: 'Work inside the bars first.', s: [`$${a} ${b<0?'- '+(-b):'+ '+b} = ${a+b}$`, `$|${a+b}| = ${Math.abs(a+b)}$`] };
      return { q: `Evaluate $|${a}|$.`, a: String(Math.abs(a)), hint: 'Absolute value is distance from zero.',
        s: [`$|${a}| = ${Math.abs(a)}$`] }; },
    solve(r) { const sh = ri(r,-9,9), k = ri(r,1,14), mult = pick(r,[1,2]);
      if (mult === 1) return { q: `Solve $|x ${sh<0?'+ '+(-sh):'- '+sh}| = ${k}$.`,
        a: `${sh+k} and ${sh-k}`, alt: [`${sh-k} and ${sh+k}`], hint: 'Split into two equations.',
        s: [`$x ${sh<0?'+ '+(-sh):'- '+sh} = ${k}$ or $= -${k}$`, `$x = ${sh+k}$ or $x = ${sh-k}$`] };
      const c = ri(r,-9,9);
      return { q: `Solve $|2x ${c<0?'- '+(-c):'+ '+c}| = ${2*k}$.`,
        a: `${(2*k-c)/2} and ${(-2*k-c)/2}`, alt: [`${(-2*k-c)/2} and ${(2*k-c)/2}`],
        hint: 'Split, then solve each linear equation.',
        s: [`$2x ${c<0?'- '+(-c):'+ '+c} = ${2*k}$ gives $x = ${(2*k-c)/2}$`,
            `$2x ${c<0?'- '+(-c):'+ '+c} = -${2*k}$ gives $x = ${(-2*k-c)/2}$`] }; },
    vertex(r) { const h = ri(r,-9,9), k = ri(r,-12,12), a = ri(r,-3,3)||1;
      return { q: `Find the vertex of $y = ${a===1?'':a===-1?'-':a}|x ${h<0?'+ '+(-h):'- '+h}| ${k<0?'- '+(-k):'+ '+k}$.`,
        a: `(${h}, ${k})`, alt: [`(${h},${k})`], hint: 'Set the inside of the bars to zero.',
        s: [`$x ${h<0?'+ '+(-h):'- '+h} = 0$ gives $x = ${h}$`, `Then $y = ${k}$`,
            `Vertex $(${h}, ${k})$, opening ${a>0?'up':'down'}ward.`] }; },
    piecewise(r) { const cut = ri(r,-3,4), m = ri(r,1,5), b = ri(r,-6,6), x = ri(r,-6,8);
      const useFirst = x < cut, v = useFirst ? x + b : m*x;
      return { q: `For $f(x) = x ${b<0?'- '+(-b):'+ '+b}$ if $x < ${cut}$, and $f(x) = ${m}x$ if $x \\geq ${cut}$, find $f(${x})$.`,
        a: String(v), hint: `Which interval does $${x}$ fall in?`,
        s: [`$${x} ${useFirst?'<':'\\geq'} ${cut}$, so use the ${useFirst?'first':'second'} rule.`,
            useFirst ? `$f(${x}) = ${x} ${b<0?'- '+(-b):'+ '+b} = ${v}$` : `$f(${x}) = ${m}(${x}) = ${v}$`] }; },
    isolate(r) { const k = ri(r,2,5), sh = ri(r,-9,9), c = ri(r,-12,12), v = ri(r,1,12);
      const tot = k*v + c;
      return { q: `Solve $${k}|x ${sh<0?'+ '+(-sh):'- '+sh}| ${c<0?'- '+(-c):'+ '+c} = ${tot}$.`,
        a: `${sh+v} and ${sh-v}`, alt: [`${sh-v} and ${sh+v}`], hint: 'Isolate the bars before splitting.',
        s: [`$${k}|x ${sh<0?'+ '+(-sh):'- '+sh}| = ${k*v}$`, `$|x ${sh<0?'+ '+(-sh):'- '+sh}| = ${v}$`,
            `$x = ${sh+v}$ or $x = ${sh-v}$`] }; },
    nosolution(r) { const sh = ri(r,-9,9), k = ri(r,1,12);
      return { q: `Solve $|x ${sh<0?'+ '+(-sh):'- '+sh}| = -${k}$. If there is no solution, answer "none".`,
        a: 'none', alt: ['no solution'], hint: 'Can an absolute value be negative?',
        s: ['Absolute value measures distance, so it is never negative.', 'So there is no solution.'] }; },
    graph(r) { const k = ri(r,1,9), right = 'opens downward';
      return Object.assign({ q: `The graph of $y = -|x| + ${k}$ has a vertex at $(0, ${k})$ and`,
        hint: 'What does the minus in front do?',
        s: ['$-|x|$ turns the V upside down.', `So $(0, ${k})$ is a maximum.`] },
        mc(r, right, ['opens upward', 'is a straight line', 'is a parabola'])); },
    step(r) { const first = ri(r,3,9), after = ri(r,2,6), h = ri(r,3,9);
      return { q: `A garage charges $\\$${first}$ for the first hour and $\\$${after}$ for each hour after. What do $${h}$ hours cost?`,
        a: String(first + after*(h-1)), unit: '$', hint: `One hour at $\\$${first}$, then $${h-1}$ more.`,
        s: [`$${first} + ${after}(${h-1})$`, `$= ${first} + ${after*(h-1)}$`, `$= \\$${first + after*(h-1)}$`] }; }
  },

  stats9: {
    mean(r) { const n = ri(r,4,6), xs = []; let sum = 0;
      for (let i = 0; i < n; i++) { const v = ri(r,1,30); xs.push(v); sum += v; }
      return { q: `Find the mean of $${xs.join(', ')}$.`, a: fs(sum,n),
        hint: 'Add them up, then divide by how many.',
        s: [`Sum: $${sum}$`, `$${sum} \\div ${n} = ${tex(sum,n)}$`] }; },
    median(r) { const n = pick(r,[5,6,7,8]), xs = [];
      for (let i = 0; i < n; i++) xs.push(ri(r,1,40));
      const st = [...xs].sort((a,b)=>a-b);
      const med = n % 2 ? st[(n-1)/2] : (st[n/2-1] + st[n/2])/2;
      return { q: `Find the median of $${xs.join(', ')}$.`, a: String(med), hint: 'Put them in order first.',
        s: [`Ordered: $${st.join(', ')}$`, n % 2 ? `The middle value is $${med}$.` : `Middle two are $${st[n/2-1]}$ and $${st[n/2]}$, so $${med}$.`] }; },
    range(r) { const xs = []; for (let i = 0; i < ri(r,4,6); i++) xs.push(ri(r,1,60));
      const lo = Math.min(...xs), hi = Math.max(...xs);
      return { q: `Find the range of $${xs.join(', ')}$.`, a: String(hi-lo), hint: 'Maximum minus minimum.',
        s: [`$${hi} - ${lo} = ${hi-lo}$`] }; },
    quartile(r) { const start = ri(r,1,6), step = ri(r,2,5), xs = [];
      for (let i = 0; i < 8; i++) xs.push(start + i*step);
      const q1 = (xs[1] + xs[2])/2, q3 = (xs[5] + xs[6])/2, which = r() < .5;
      return { q: `Find $Q_${which?1:3}$ of $${xs.join(', ')}$.`, a: String(which ? q1 : q3),
        hint: `It is the median of the ${which?'lower':'upper'} half.`,
        s: [`${which?'Lower':'Upper'} half: $${(which?xs.slice(0,4):xs.slice(4)).join(', ')}$`,
            `Median of that half: $${which?q1:q3}$`] }; },
    iqr(r) { const start = ri(r,1,6), step = ri(r,2,5), xs = [];
      for (let i = 0; i < 8; i++) xs.push(start + i*step);
      const q1 = (xs[1]+xs[2])/2, q3 = (xs[5]+xs[6])/2;
      return { q: `Find the IQR of $${xs.join(', ')}$.`, a: String(q3-q1), hint: '$Q_3 - Q_1$.',
        s: [`$Q_1 = ${q1}$`, `$Q_3 = ${q3}$`, `$${q3} - ${q1} = ${q3-q1}$`] }; },
    choose(r) { const base = ri(r,18,30), out = ri(r,3,9)*100;
      return { q: `Data: $${base}, ${base+2}, ${base+4}, ${base+5}, ${out}$. Should you report the mean or the median?`,
        a: 'median', hint: 'Is there an outlier?',
        s: [`$${out}$ is far from the rest.`, `It drags the mean up to $${((4*base+11+out)/5).toFixed(1)}$.`,
            `The median, $${base+4}$, is representative.`] }; },
    skew(r) { const med = ri(r,50,90), gap = ri(r,4,15), left = r() < .5;
      const mean = left ? med - gap : med + gap;
      return { q: `The mean is $${mean}$ and the median is $${med}$. Describe the skew.`,
        a: left ? 'skewed left' : 'skewed right', alt: left ? ['left','negatively skewed'] : ['right','positively skewed'],
        hint: 'The mean is dragged towards the tail.',
        s: [`Mean ${left?'below':'above'} median.`, `So the tail points ${left?'left':'right'}.`, `Skewed ${left?'left':'right'}.`] }; },
    resistant(r) { const right = 'Median and IQR';
      return Object.assign({ q: 'Which pair of statistics is resistant to outliers?',
        hint: 'Resistant means barely moved by one extreme value.',
        s: ['The median ignores the extremes entirely.', 'The IQR uses only the middle half.',
            'Mean, range and standard deviation all move a lot.'] },
        mc(r, right, ['Mean and standard deviation', 'Mean and range', 'Median and range'])); },
    fivenum(r) { const start = ri(r,2,8), step = ri(r,2,4), xs = [];
      for (let i = 0; i < 7; i++) xs.push(start + i*step + (i===6?ri(r,0,4):0));
      const st = [...xs].sort((a,b)=>a-b);
      return { q: `Find the five-number summary of $${st.join(', ')}$.`,
        a: `${st[0]}, ${st[1]}, ${st[3]}, ${st[5]}, ${st[6]}`,
        alt: [`${st[0]} ${st[1]} ${st[3]} ${st[5]} ${st[6]}`],
        hint: 'Seven values, so the median is the fourth.',
        s: [`Min $${st[0]}$, max $${st[6]}$`, `Median $${st[3]}$`, `$Q_1 = ${st[1]}$, $Q_3 = ${st[5]}$`] }; },
    display(r) { const right = 'Side-by-side box plots';
      return Object.assign({ q: 'Which display best compares three groups at once?',
        hint: 'You need centres and spreads next to each other.',
        s: ['Box plots show the five-number summary.', 'Side by side, they compare groups directly.'] },
        mc(r, right, ['A single dot plot', 'A pie chart', 'A scatter plot'])); },
    missing(r) { const n = ri(r,4,6), m = ri(r,8,30), xs = []; let sum = 0;
      for (let i = 0; i < n-1; i++) { const v = ri(r, Math.max(1,m-12), m+12); xs.push(v); sum += v; }
      const last = n*m - sum;
      return { q: `${n} numbers have a mean of $${m}$. ${n-1} of them are $${xs.join(', ')}$. Find the last one.`,
        a: String(last), hint: `The total must be $${n} \\times ${m}$.`,
        s: [`Total $= ${n*m}$`, `$${xs.join(' + ')} = ${sum}$`, `$${n*m} - ${sum} = ${last}$`] }; },
    outlier(r) { const q1 = ri(r,10,30), iqr = ri(r,6,20), q3 = q1 + iqr;
      const fence = q3 + 1.5*iqr, v = r() < .55 ? Math.ceil(fence) + ri(r,1,10) : Math.floor(fence) - ri(r,1,5);
      return { q: `Using the $1.5 \\times$ IQR rule with $Q_1 = ${q1}$ and $Q_3 = ${q3}$, is $${v}$ an outlier? Answer yes or no.`,
        a: v > fence ? 'yes' : 'no', hint: 'Find the upper fence first.',
        s: [`IQR $= ${iqr}$`, `$1.5 \\times ${iqr} = ${1.5*iqr}$`, `Upper fence $= ${q3} + ${1.5*iqr} = ${fence}$`,
            `$${v} ${v>fence?'>':'\\leq'} ${fence}$, so ${v>fence?'yes':'no'}.`] }; },
    compare(r) { const med = ri(r,50,90), i1 = ri(r,3,9), i2 = i1 + ri(r,6,20);
      return { q: `Group A: median $${med}$, IQR $${i1}$. Group B: median $${med}$, IQR $${i2}$. Which is more consistent?`,
        a: 'A', alt: ['group A'], hint: 'Consistency means a small spread.',
        s: [`A has IQR $${i1}$; B has IQR $${i2}$.`, `$${i1} < ${i2}$, so A is more consistent.`, 'The centres are identical.'] }; },
    effect(r) { const m = ri(r,20,80), sd = ri(r,2,12), k = ri(r,2,15);
      return { q: `A data set has mean $${m}$ and standard deviation $${sd}$. Every value is increased by $${k}$. Find the new mean and standard deviation.`,
        a: `mean ${m+k}, sd ${sd}`, alt: [`${m+k} and ${sd}`, `mean=${m+k} sd=${sd}`],
        hint: 'Adding a constant shifts the data but does not spread it.',
        s: [`Every value up $${k}$, so the mean becomes $${m+k}$.`, 'The distances between values are unchanged.',
            `So the standard deviation is still $${sd}$.`] }; }
  }
  };
  for (const u in MORE3) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE3[u]); }


  /* ---- Geometry generators ---- */
  const MORE4 = {
  geobasics: {
    notation(r) { const kind = pick(r, [['segment', '\\overline{AB}', 'it stops at both ends'],
        ['ray', '\\overrightarrow{AB}', 'it starts at $A$ and carries on past $B$'],
        ['line', '\\overleftrightarrow{AB}', 'it runs forever in both directions']]);
      return { q: `Which symbol means the ${kind[0]} through $A$ and $B$?`, a: kind[1],
        alt: [kind[0] + ' AB'], hint: 'Bars, arrows and double arrows all mean different things.',
        s: [`A ${kind[0]} is written $${kind[1]}$`, `Because ${kind[2]}.`] }; },
    segadd(r) { const a = ri(r,3,25), b = ri(r,3,25);
      const which = r() < .5;
      return which
        ? { q: `$B$ is between $A$ and $C$. $AB = ${a}$ and $BC = ${b}$. Find $AC$.`, a: String(a+b),
            hint: 'Segment addition postulate.', s: [`$AB + BC = AC$`, `$${a} + ${b} = ${a+b}$`] }
        : { q: `$B$ is between $A$ and $C$. $AC = ${a+b}$ and $AB = ${a}$. Find $BC$.`, a: String(b),
            hint: 'Subtract the part you already know.', s: [`$AB + BC = AC$`, `$BC = ${a+b} - ${a} = ${b}$`] }; },
    midpoint(r) { const h = ri(r,3,30);
      return { q: `$M$ is the midpoint of $\\overline{PQ}$ and $PM = ${h}$. Find $PQ$.`, a: String(2*h),
        hint: 'A midpoint makes two equal halves.', s: [`$MQ = PM = ${h}$`, `$PQ = ${h} + ${h} = ${2*h}$`] }; },
    bisector(r) { const half = ri(r,12,70);
      return { q: `$\\overrightarrow{OB}$ bisects $\\angle AOC$. If $m\\angle AOB = ${half}^\\circ$, find $m\\angle AOC$.`,
        a: String(2*half), unit: 'degrees', hint: 'A bisector halves the angle, so double it to get back.',
        s: [`$m\\angle AOC = 2 \\times ${half}$`, `$= ${2*half}^\\circ$`] }; },
    angadd(r) { const a = ri(r,15,70), b = ri(r,15,80);
      return { q: `$\\overrightarrow{OB}$ is inside $\\angle AOC$. $m\\angle AOB = ${a}^\\circ$ and $m\\angle AOC = ${a+b}^\\circ$. Find $m\\angle BOC$.`,
        a: String(b), unit: 'degrees', hint: 'Angle addition postulate.',
        s: [`$${a} + m\\angle BOC = ${a+b}$`, `$m\\angle BOC = ${b}^\\circ$`] }; },
    terms(r) { const right = pick(r, ['Point', 'Line', 'Plane']);
      return Object.assign({ q: 'Which of these is an undefined term in geometry?',
        hint: 'Which one cannot be defined without using itself?',
        s: ['Point, line and plane are taken as undefined.', 'Everything else is defined using them.'] },
        mc(r, right, ['Segment', 'Angle', 'Midpoint', 'Ray'].slice(0,3))); }
  },

  geoproof: {
    structure(r) { const p = pick(r, [
        ['What is always the first line of a two-column proof?', 'The given',
         ['What you are proving','A definition','A theorem'], 'You start from what you were handed.'],
        ['A statement in a proof with no reason beside it is', 'not acceptable, even if true',
         ['fine if obvious','acceptable once per proof','a definition'], 'A true statement is not the same as a proved one.'],
        ['CPCTC may be used', 'only after proving two triangles congruent',
         ['at any point','to prove triangles congruent','only in coordinate proofs'], 'It is what congruence gives you.']]);
      return Object.assign({ q: p[0], hint: p[3], s: [p[3], 'So the answer is: ' + p[1] + '.'] }, mc(r, p[1], p[2])); },
    converse(r) { const p = pick(r, [
        ['if two angles are vertical, they are congruent', 'if two angles are congruent, they are vertical', 'no',
         'the base angles of an isosceles triangle'],
        ['if a shape is a square, it has four right angles', 'if a shape has four right angles, it is a square', 'no',
         'a non-square rectangle'],
        ['if two lines are parallel, they never meet', 'if two lines never meet, they are parallel', 'yes',
         'in a plane this one does hold']]);
      return { q: `Is the converse of "${p[0]}" true? Answer yes or no.`, a: p[2],
        hint: 'Write the converse out, then hunt for a counterexample.',
        s: [`Converse: ${p[1]}.`, p[2] === 'no' ? `Counterexample: ${p[3]}.` : `No counterexample exists — ${p[3]}.`] }; },
    counter(r) { const p = pick(r, [
        ['all quadrilaterals with four equal sides are squares', 'a rhombus'],
        ['all triangles with two equal sides are equilateral', 'an isosceles triangle that is not equilateral'],
        ['if two triangles have the same perimeter they are congruent', 'a 3-4-5 and a 4-4-4 triangle']]);
      return { q: `Give a counterexample to "${p[0]}".`, a: p[1], alt: [p[1].replace(/^an? /, '')],
        hint: 'One failing case is enough to kill a claim.',
        s: [`${p[1].charAt(0).toUpperCase() + p[1].slice(1)} satisfies the condition but not the conclusion.`,
            'Disproving needs one case; proving needs an argument.'] }; },
    reason(r) { const p = pick(r, [
        ['$M$ is the midpoint of $\\overline{AB}$', '$AM = MB$', 'definition of midpoint'],
        ['two triangles share a side', 'that side is congruent to itself', 'reflexive property'],
        ['two lines are parallel', 'alternate interior angles are congruent', 'parallel lines theorem'],
        ['two lines cross', 'vertical angles are congruent', 'vertical angles theorem']]);
      return { q: `You know ${p[0]}. What reason lets you write that ${p[1]}?`, a: p[2],
        alt: ['the ' + p[2], p[2].split(' ')[0]], hint: 'Name the rule, not the observation.',
        s: [`${p[1].charAt(0).toUpperCase() + p[1].slice(1)}.`, `Reason: ${p[2]}.`] }; },
    logic(r) { const right = 'If not $Q$ then not $P$';
      return Object.assign({ q: 'If "if $P$ then $Q$" is true, which of these is also always true?',
        hint: 'One of these is the contrapositive.',
        s: ['The contrapositive is always true alongside the original.',
            'The converse ($Q \\to P$) and inverse are not.'] },
        mc(r, right, ['If $Q$ then $P$', 'If not $P$ then not $Q$', 'None of these'])); }
  },

  triproof: {
    choose(r) { const p = pick(r, [
        ['three pairs of congruent sides', 'SSS'], ['two sides and the angle between them', 'SAS'],
        ['two angles and the side between them', 'ASA'], ['two angles and a side not between them', 'AAS'],
        ['a hypotenuse and a leg of two right triangles', 'HL']]);
      return { q: `You are given ${p[0]}. Name the congruence shortcut.`, a: p[1],
        hint: 'Count the sides and angles, and check whether the middle part is included.',
        s: [`${p[0].charAt(0).toUpperCase() + p[0].slice(1)}.`, `That is ${p[1]}.`] }; },
    reflexive(r) { const s = pick(r, ['BD', 'AC', 'XY', 'PQ']);
      return { q: `Two triangles share side $\\overline{${s}}$. What reason gives $\\overline{${s}} \\cong \\overline{${s}}$?`,
        a: 'reflexive property', alt: ['reflexive', 'the reflexive property'],
        hint: 'Anything is congruent to itself.',
        s: [`$\\overline{${s}} \\cong \\overline{${s}}$`, 'That is the reflexive property — and it is the free third part in most shared-side proofs.'] }; },
    cpctc(r) { const p = pick(r, [['\\angle B', '\\angle E'], ['\\angle C', '\\angle F'], ['\\overline{AC}', '\\overline{DF}'], ['\\overline{BC}', '\\overline{EF}']]);
      return { q: `Given $\\triangle ABC \\cong \\triangle DEF$, which part corresponds to $${p[0]}$?`,
        a: p[1].replace(/\\\\overline\{|\}|\\\\angle /g, '').trim() || p[1], alt: [p[1]],
        hint: 'Line the letters up: $A\\!\\to\\!D$, $B\\!\\to\\!E$, $C\\!\\to\\!F$.',
        s: ['The order of the letters is the correspondence.', `So $${p[0]}$ pairs with $${p[1]}$, by CPCTC.`] }; },
    isosceles(r) { const kind = r() < .5;
      if (kind) { const b = ri(r,25,80);
        return { q: `In $\\triangle ABC$, $AB \\cong AC$ and $m\\angle B = ${b}^\\circ$. Find $m\\angle C$.`,
          a: String(b), unit: 'degrees', hint: 'Base angles theorem.',
          s: ['Equal sides give equal opposite angles.', `$m\\angle C = ${b}^\\circ$`] }; }
      const v = ri(r,20,120);
      return { q: `In $\\triangle ABC$, $AB \\cong AC$ and $m\\angle A = ${v}^\\circ$. Find $m\\angle B$.`,
        a: String((180-v)/2), unit: 'degrees', hint: 'The two base angles share what is left.',
        s: [`$180 - ${v} = ${180-v}$`, `$${180-v} \\div 2 = ${(180-v)/2}^\\circ$`] }; },
    hl(r) { const right = 'right triangles only';
      return Object.assign({ q: 'HL may be used on', hint: 'What does the H stand for?',
        s: ['H is for hypotenuse, which only exists in a right triangle.', 'So HL applies to right triangles only.'] },
        mc(r, right, ['any triangle', 'isosceles triangles only', 'obtuse triangles only'])); },
    vertical(r) { return { q: 'Two triangles meet at a point so a pair of angles are vertical. Are those angles congruent? Answer yes or no.',
        a: 'yes', hint: 'Do you need parallel lines for this?',
        s: ['Vertical angles are always congruent.', 'No parallel lines are required, which is why this is such a common free third part.'] }; },
    solve(r) { const x = ri(r,3,15), a = ri(r,3,6), c = ri(r,1,a-1), b = ri(r,1,20);
      const d = a*x + b - c*x;
      return { q: `$\\triangle ABC \\cong \\triangle DEF$ with $AB = ${a}x + ${b}$ and $DE = ${c}x ${d<0?'- '+(-d):'+ '+d}$. Find $AB$.`,
        a: String(a*x+b), hint: 'Corresponding sides are equal.',
        s: [`$${a}x + ${b} = ${c}x ${d<0?'- '+(-d):'+ '+d}$`, `$x = ${x}$`, `$AB = ${a}(${x}) + ${b} = ${a*x+b}$`] }; },
    proof(r) { const p = pick(r, [
        ['$AB \\cong CB$ and $\\angle ABD \\cong \\angle CBD$, with $\\overline{BD}$ shared', 'SAS', 'side, included angle, side'],
        ['$\\angle A \\cong \\angle C$ and $\\angle ADB \\cong \\angle CDB$, with $\\overline{BD}$ shared', 'AAS', 'two angles and a non-included side'],
        ['$AB \\cong CB$ and $AD \\cong CD$, with $\\overline{BD}$ shared', 'SSS', 'all three sides']]);
      return { q: `Given ${p[0]}. Name the shortcut proving the two triangles congruent.`, a: p[1],
        hint: 'The shared side is the hidden third part.', s: ['The shared side is congruent to itself.', `That gives ${p[2]} — ${p[1]}.`] }; }
  },

  polygons: {
    anglesum(r) { const n = ri(r,3,12);
      const name = ['','','','triangle','quadrilateral','pentagon','hexagon','heptagon','octagon','nonagon','decagon','hendecagon','dodecagon'][n];
      return { q: `Find the sum of the interior angles of a ${name}.`, a: String((n-2)*180), unit: 'degrees',
        hint: 'A polygon splits into $n - 2$ triangles.', s: [`$n = ${n}$, so $${n} - 2 = ${n-2}$ triangles`, `$${n-2} \\times 180 = ${(n-2)*180}^\\circ$`] }; },
    exterior(r) { return { q: 'Find the sum of the exterior angles of any convex polygon.', a: '360', unit: 'degrees',
        hint: 'Walk once round the outside.', s: ['You turn through one full circle.', '$360^\\circ$, whatever $n$ is.'] }; },
    regular(r) { const n = pick(r,[5,6,8,9,10,12,15,18,20,24]), which = r() < .5;
      return which
        ? { q: `Find each exterior angle of a regular ${n}-gon.`, a: String(360/n), unit: 'degrees',
            hint: 'Exteriors total $360^\\circ$.', s: [`$360 \\div ${n} = ${360/n}^\\circ$`] }
        : { q: `Find each interior angle of a regular ${n}-gon.`, a: String(180 - 360/n), unit: 'degrees',
            hint: 'Find the exterior angle first — it is quicker.', s: [`Exterior: $360 \\div ${n} = ${360/n}$`, `Interior: $180 - ${360/n} = ${180-360/n}^\\circ$`] }; },
    family(r) { const p = pick(r, [['Is every square a rectangle?', 'Yes'], ['Is every rectangle a square?', 'No'],
        ['Is every square a rhombus?', 'Yes'], ['Is every rhombus a parallelogram?', 'Yes']]);
      return Object.assign({ q: p[0], hint: 'The family is a ladder — each rung inherits everything above it.',
        s: ['Check whether the first shape meets every condition of the second.', `Answer: ${p[1]}.`] },
        mc(r, p[1], [p[1] === 'Yes' ? 'No' : 'Yes', 'Only sometimes', 'Only in coordinate geometry'])); },
    parallelogram(r) { const a = ri(r,25,155), opp = r() < .5;
      return { q: `In parallelogram $ABCD$, $m\\angle A = ${a}^\\circ$. Find $m\\angle ${opp ? 'C' : 'B'}$.`,
        a: String(opp ? a : 180-a), unit: 'degrees',
        hint: opp ? 'Opposite angles are congruent.' : 'Consecutive angles are supplementary.',
        s: [opp ? `$\\angle A$ and $\\angle C$ are opposite, so congruent.` : `$\\angle A$ and $\\angle B$ are consecutive, so they add to $180$.`,
            `$${opp ? a : 180-a}^\\circ$`] }; },
    diagonals(r) { const p = pick(r, [
        ['congruent diagonals that bisect each other', 'rectangle'],
        ['perpendicular diagonals that bisect each other', 'rhombus'],
        ['diagonals that are congruent, perpendicular and bisect each other', 'square'],
        ['diagonals that bisect each other', 'parallelogram']]);
      return Object.assign({ q: `A quadrilateral with ${p[0]} is a`, hint: 'Bisecting means parallelogram; congruent means rectangle; perpendicular means rhombus.',
        s: ['Work through the diagonal properties one at a time.', `That gives a ${p[1]}.`] },
        mc(r, p[1], ['rectangle','rhombus','trapezoid','kite','square','parallelogram'].filter(x=>x!==p[1]).slice(0,3))); },
    midsegment(r) { const a = ri(r,4,20), b = a + 2*ri(r,1,10), which = r() < .5;
      return which
        ? { q: `A trapezoid has bases $${a}$ and $${b}$. Find its midsegment.`, a: String((a+b)/2),
            hint: 'The midsegment is the average of the bases.', s: [`$\\dfrac{${a} + ${b}}{2} = ${(a+b)/2}$`] }
        : { q: `A trapezoid has one base $${a}$ and midsegment $${(a+b)/2}$. Find the other base.`, a: String(b),
            hint: 'The midsegment is the average, so work backwards.', s: [`$\\dfrac{${a} + x}{2} = ${(a+b)/2}$`, `$${a} + x = ${a+b}$`, `$x = ${b}$`] }; },
    solve(r) { const x = ri(r,8,30), a = ri(r,2,6), c = ri(r,a+1,9), b = ri(r,5,40);
      const d = a*x + b - c*x;
      return { q: `In parallelogram $ABCD$, $m\\angle A = (${a}x + ${b})^\\circ$ and $m\\angle C = (${c}x ${d<0?'- '+(-d):'+ '+d})^\\circ$. Find $x$.`,
        a: String(x), hint: 'Opposite angles are congruent.',
        s: [`$${a}x + ${b} = ${c}x ${d<0?'- '+(-d):'+ '+d}$`, `$${b-d} = ${c-a}x$`, `$x = ${x}$`,
            `Both angles are $${a*x+b}^\\circ$ &check;`] }; },
    identify(r) { const p = pick(r, [
        ['bisect each other and are congruent but not perpendicular', 'rectangle'],
        ['bisect each other and are perpendicular but not congruent', 'rhombus'],
        ['bisect each other, are congruent and perpendicular', 'square'],
        ['bisect each other but are neither congruent nor perpendicular', 'parallelogram']]);
      return { q: `A quadrilateral has diagonals that ${p[0]}. Name it.`, a: p[1],
        hint: 'Take the diagonal properties one at a time.',
        s: ['Bisecting each other makes it a parallelogram.',
            'Congruent means rectangle; perpendicular means rhombus; both means square.', `So: a ${p[1]}.`] }; }
  },

  simproof: {
    aa(r) { const right = 'similar';
      return Object.assign({ q: 'Two pairs of congruent angles prove two triangles', hint: 'Does that fix the size?',
        s: ['The third angle follows, so all three match.', 'Same shape, any size — similar, not congruent.'] },
        mc(r, right, ['congruent','isosceles','right-angled'])); },
    scale(r) { const old = ri(r,2,12), k = pick(r,[2,3,4,5,1.5,2.5]);
      return { q: `$\\triangle ABC \\sim \\triangle DEF$ with $AB = ${old}$ and $DE = ${old*k}$. Find the scale factor.`,
        a: String(k), hint: 'New over old.', s: [`$k = \\dfrac{${old*k}}{${old}} = ${k}$`] }; },
    side(r) { const a = ri(r,2,9), k = pick(r,[2,3,4,1.5,2.5]), b = ri(r,2,11);
      return { q: `$\\triangle ABC \\sim \\triangle DEF$: $AB = ${a}$, $DE = ${a*k}$, $BC = ${b}$. Find $EF$.`,
        a: String(b*k), hint: 'Find $k$, then multiply.', s: [`$k = ${k}$`, `$EF = ${k} \\times ${b} = ${b*k}$`] }; },
    prop(r) { const t = ri(r,2,8), bo = ri(r,2,9), m = pick(r,[1.5,2,2.5,3]);
      return { q: `A line parallel to the base cuts one side into $${t}$ (top) and $${bo}$ (bottom), and the other into $${t*m}$ (top) and $x$ (bottom). Find $x$.`,
        a: String(bo*m), hint: 'Top over bottom on both sides.',
        s: [`$\\dfrac{${t}}{${bo}} = \\dfrac{${t*m}}{x}$`, `$${t}x = ${bo*t*m}$`, `$x = ${bo*m}$`] }; },
    shadow(r) { const h = ri(r,4,8), s1 = ri(r,3,10), k = ri(r,5,20);
      return { q: `A $${h}$ ft person casts a $${s1}$ ft shadow. At the same moment a tree casts a $${s1*k}$ ft shadow. Find the tree height.`,
        a: String(h*k), unit: 'ft', hint: 'The sun makes the two triangles similar.',
        s: [`$\\dfrac{${h}}{${s1}} = \\dfrac{t}{${s1*k}}$`, `$t = ${h} \\times ${k} = ${h*k}$ ft`] }; },
    area(r) { const A = ri(r,3,20)*2, k = pick(r,[2,3,4,1.5,2.5]);
      return { q: `Two similar figures have scale factor $${k}$. The smaller has area $${A}$. Find the larger area.`,
        a: String(A*k*k), hint: 'Areas scale by $k^2$.', s: [`$k^2 = ${k*k}$`, `$${A} \\times ${k*k} = ${A*k*k}$`] }; },
    backarea(r) { const k = ri(r,2,6), A = ri(r,2,15);
      return { q: `Two similar triangles have areas $${A}$ and $${A*k*k}$. Find the scale factor.`,
        a: String(k), hint: 'Areas go by $k^2$, so take a square root.',
        s: [`$k^2 = \\dfrac{${A*k*k}}{${A}} = ${k*k}$`, `$k = ${k}$`] }; },
    test(r) { const p = pick(r, [['two pairs of sides in ratio with the included angles congruent','SAS similarity'],
        ['all three pairs of sides in the same ratio','SSS similarity'],
        ['two pairs of congruent angles','AA similarity']]);
      return { q: `Which similarity test uses ${p[0]}?`, a: p[1], alt: [p[1].split(' ')[0]],
        hint: 'Count the sides and angles.', s: [`${p[0].charAt(0).toUpperCase()+p[0].slice(1)}.`, `That is ${p[1]}.`] }; },
    volume(r) { const k = pick(r,[2,3,4,5]);
      return { q: `Two similar solids have sides in ratio $1:${k}$. Find the ratio of their volumes.`,
        a: `1:${k**3}`, alt: [`1 to ${k**3}`, String(k**3)], hint: 'Volumes scale by $k^3$.',
        s: [`$k^3 = ${k}^3 = ${k**3}$`, `Ratio $1:${k**3}$`] }; },
    perimeter(r) { const p = ri(r,6,30), k = pick(r,[2,3,4,5]);
      return { q: `Similar triangles have scale factor $${k}$. The smaller has perimeter $${p}$. Find the larger.`,
        a: String(p*k), hint: 'Perimeter scales by $k$, not $k^2$.', s: [`$${p} \\times ${k} = ${p*k}$`] }; },
    mean(r) { const a = ri(r,2,12), b = ri(r,2,12);
      const g = a*b, root = Math.sqrt(g);
      if (root !== Math.round(root)) return this.mean(R(ri(r,1,1e9)));
      return { q: `Find the geometric mean of $${a*a}$ and $${b*b}$.`, a: String(a*b),
        hint: 'The geometric mean of $p$ and $q$ is $\\sqrt{pq}$.',
        s: [`$\\sqrt{${a*a} \\times ${b*b}} = \\sqrt{${a*a*b*b}}$`, `$= ${a*b}$`] }; }
  },

  righttri: {
    ratio(r) { const p = pick(r, [['\\dfrac{\\text{opposite}}{\\text{hypotenuse}}','sine','SOH'],
        ['\\dfrac{\\text{adjacent}}{\\text{hypotenuse}}','cosine','CAH'],
        ['\\dfrac{\\text{opposite}}{\\text{adjacent}}','tangent','TOA']]);
      return { q: `Which ratio is $${p[0]}$?`, a: p[1], alt: [p[1].slice(0,3)],
        hint: p[2] + '.', s: [`$\\${p[1].slice(0,3)} \\theta = ${p[0]}$`] }; },
    identify(r) { const p = pick(r, [['always the longest side','hypotenuse'],
        ['across the triangle from the angle you are using','opposite'],
        ['next to the angle but not the hypotenuse','adjacent']]);
      return { q: `Which side of a right triangle is ${p[0]}?`, a: p[1],
        hint: 'Opposite and adjacent are named from the angle; the hypotenuse never moves.',
        s: [`The ${p[1]} is ${p[0]}.`] }; },
    side(r) { const deg = pick(r,[20,25,30,35,40,45,50,55,60,65,70]), h = ri(r,5,20);
      const useSin = r() < .5, v = useSin ? h*Math.sin(deg*Math.PI/180) : h*Math.cos(deg*Math.PI/180);
      return { q: `A right triangle has hypotenuse $${h}$ and an angle of $${deg}^\\circ$. Find the ${useSin?'opposite':'adjacent'} side, to one decimal place.`,
        a: String(+v.toFixed(1)), hint: `${useSin?'Opposite':'Adjacent'} and hypotenuse means ${useSin?'sine':'cosine'}.`,
        s: [`$\\${useSin?'sin':'cos'} ${deg}^\\circ = \\dfrac{x}{${h}}$`,
            `$x = ${h} \\times ${(useSin?Math.sin(deg*Math.PI/180):Math.cos(deg*Math.PI/180)).toFixed(4)}$`,
            `$\\approx ${(+v.toFixed(1))}$`] }; },
    angle(r) { const o = ri(r,2,15), a = ri(r,2,15);
      const t = +(Math.atan(o/a)*180/Math.PI).toFixed(1);
      return { q: `A right triangle has legs $${o}$ (opposite) and $${a}$ (adjacent). Find the angle to one decimal place.`,
        a: String(t), unit: 'degrees', hint: 'Two legs means tangent, then the inverse.',
        s: [`$\\tan \\theta = \\dfrac{${o}}{${a}} = ${(o/a).toFixed(4)}$`, `$\\theta = \\tan^{-1}(${(o/a).toFixed(4)}) \\approx ${t}^\\circ$`] }; },
    depression(r) { const h = ri(r,20,80), deg = pick(r,[15,20,25,30,35,40]);
      const d = +(h/Math.tan(deg*Math.PI/180)).toFixed(1);
      return { q: `From a cliff $${h}$ m high, the angle of depression to a boat is $${deg}^\\circ$. Find the distance to the base, to one decimal place.`,
        a: String(d), unit: 'm', hint: 'Depression from the top equals elevation from the boat.',
        s: [`$\\tan ${deg}^\\circ = \\dfrac{${h}}{d}$`, `$d = \\dfrac{${h}}{${Math.tan(deg*Math.PI/180).toFixed(4)}}$`, `$\\approx ${d}$ m`] }; },
    inverse(r) { const right = 'the angle whose sine is that value';
      return Object.assign({ q: 'What does $\\sin^{-1}(x)$ mean?', hint: 'The $-1$ is not a reciprocal.',
        s: ['It undoes the sine function.', '$\\sin^{-1}(0.5) = 30^\\circ$, not $\\dfrac{1}{\\sin 0.5}$.'] },
        mc(r, right, ['$\\dfrac{1}{\\sin x}$', '$\\sin(x)$ doubled', 'half of $\\sin x$'])); },
    special(r) { const k = ri(r,2,12), which = pick(r,['45leg','30short','30hyp']);
      if (which === '45leg') return { q: `In a $45$-$45$-$90$ triangle each leg is $${k}$. Find the hypotenuse in simplest radical form.`,
        a: `${k}sqrt(2)`, alt: [`${k}√2`, `${k}sqrt2`], hint: 'The sides are in ratio $1 : 1 : \\sqrt2$.',
        s: [`Hypotenuse $= ${k}\\sqrt{2}$`] };
      if (which === '30short') return { q: `In a $30$-$60$-$90$ triangle the short leg is $${k}$. Find the hypotenuse.`,
        a: String(2*k), hint: 'The sides are in ratio $1 : \\sqrt3 : 2$.', s: ['The hypotenuse is twice the short leg.', `$= ${2*k}$`] };
      return { q: `In a $30$-$60$-$90$ triangle the hypotenuse is $${2*k}$. Find the longer leg in simplest radical form.`,
        a: `${k}sqrt(3)`, alt: [`${k}√3`, `${k}sqrt3`], hint: 'Halve for the short leg, then multiply by $\\sqrt3$.',
        s: [`Short leg $= ${k}$`, `Long leg $= ${k}\\sqrt{3}$`] }; },
    twostep(r) { const d = ri(r,10,60), deg = pick(r,[25,30,35,40,45,50,55]);
      const h = Math.round(d*Math.tan(deg*Math.PI/180));
      return { q: `From a point $${d}$ m from a tower, the angle of elevation to the top is $${deg}^\\circ$. Find the height to the nearest metre.`,
        a: String(h), unit: 'm', hint: 'Adjacent and opposite means tangent.',
        s: [`$\\tan ${deg}^\\circ = \\dfrac{h}{${d}}$`, `$h = ${d} \\times ${Math.tan(deg*Math.PI/180).toFixed(4)} \\approx ${h}$ m`] }; }
  },

  circleangles: {
    central(r) { const a = ri(r,20,170);
      return { q: `A central angle cuts an arc of $${a}^\\circ$. Find the angle.`, a: String(a), unit: 'degrees',
        hint: 'A central angle equals its arc.', s: ['Vertex at the centre, so angle = arc.', `$${a}^\\circ$`] }; },
    inscribed(r) { const arc = 2*ri(r,10,85);
      return { q: `An inscribed angle cuts an arc of $${arc}^\\circ$. Find the angle.`, a: String(arc/2), unit: 'degrees',
        hint: 'An inscribed angle is half its arc.', s: [`$${arc} \\div 2 = ${arc/2}^\\circ$`] }; },
    semicircle(r) { return { q: 'An angle is inscribed in a semicircle. Find its measure.', a: '90', unit: 'degrees',
        hint: 'Half the arc — and the arc is a semicircle.', s: ['The arc is $180^\\circ$.', 'Half is $90^\\circ$ — Thales\' theorem.'] }; },
    vertex(r) { const p = pick(r, [['at the centre','its arc'], ['on the circle','half its arc'],
        ['inside but not at the centre','half the sum of the two arcs'], ['outside the circle','half the difference of the arcs']]);
      return Object.assign({ q: `An angle with its vertex ${p[0]} equals`, hint: 'Find the vertex first; the rule follows.',
        s: [`Vertex ${p[0]}.`, `So the angle is ${p[1]}.`] },
        mc(r, p[1], ['its arc','half its arc','half the sum of the two arcs','half the difference of the arcs'].filter(x=>x!==p[1]).slice(0,3))); },
    outside(r) { const near = 2*ri(r,10,50), far = near + 2*ri(r,10,60);
      return { q: `Two secants from an external point cut arcs of $${far}^\\circ$ (far) and $${near}^\\circ$ (near). Find the angle.`,
        a: String((far-near)/2), unit: 'degrees', hint: 'Vertex outside means half the difference.',
        s: [`$${far} - ${near} = ${far-near}$`, `$${far-near} \\div 2 = ${(far-near)/2}^\\circ$`] }; },
    inside(r) { const a = 2*ri(r,10,60), b = 2*ri(r,10,60);
      return { q: `Two chords cross inside a circle cutting arcs of $${a}^\\circ$ and $${b}^\\circ$. Find the angle.`,
        a: String((a+b)/2), unit: 'degrees', hint: 'Vertex inside means half the sum.',
        s: [`$${a} + ${b} = ${a+b}$`, `$${a+b} \\div 2 = ${(a+b)/2}^\\circ$`] }; },
    tangent(r) { const t = pick(r, TRIPLES.filter(v => v[0] >= 3));
      return { q: `A tangent touches a circle of radius $${t[0]}$ at $T$. From external point $P$, $OP = ${t[2]}$. Find $PT$.`,
        a: String(t[1]), hint: 'The radius meets the tangent at a right angle.',
        s: [`$\\triangle OTP$ has a right angle at $T$.`, `$PT^2 = ${t[2]}^2 - ${t[0]}^2 = ${t[1]*t[1]}$`, `$PT = ${t[1]}$`] }; },
    chords(r) { const a = ri(r,2,9), b = ri(r,2,12), c = ri(r,2,9);
      const d = a*b/c;
      if (d !== Math.round(d)) return this.chords(R(ri(r,1,1e9)));
      return { q: `Two chords cross so the pieces are $${a}$, $${b}$ and $${c}$, $x$. Find $x$.`, a: String(d),
        hint: 'The products of the pieces are equal.', s: [`$${a} \\times ${b} = ${c}x$`, `$${a*b} = ${c}x$`, `$x = ${d}$`] }; },
    sameArc(r) { const a = ri(r,15,80);
      return { q: `Two inscribed angles stand on the same arc. One is $${a}^\\circ$. Find the other.`,
        a: String(a), unit: 'degrees', hint: 'They halve the same arc.',
        s: ['Angles on the same arc are congruent.', `$${a}^\\circ$`] }; },
    tangentradius(r) { const right = '$90^\\circ$';
      return Object.assign({ q: 'A tangent meets the radius at the point of contact at', hint: 'This right angle is what makes Pythagoras available.',
        s: ['A tangent is perpendicular to the radius at the point of contact.', 'That is why tangent problems turn into right triangles.'] },
        mc(r, right, ['$45^\\circ$','$180^\\circ$','any angle'])); },
    cyclic(r) { const a = ri(r,40,150);
      return { q: `In a cyclic quadrilateral one angle is $${a}^\\circ$. Find the opposite angle.`,
        a: String(180-a), unit: 'degrees', hint: 'Opposite angles of a cyclic quadrilateral are supplementary.',
        s: [`$180 - ${a} = ${180-a}^\\circ$`] }; },
    solve(r) { const x = ri(r,4,20), a = ri(r,2,5), b = ri(r,2*a+1, 3*a+6), c = (b - 2*a)*x;
      return { q: `An inscribed angle is $(${a}x)^\\circ$ and its arc is $(${b}x - ${c})^\\circ$. Find $x$.`,
        a: String(x), hint: 'The arc is twice the inscribed angle.',
        s: [`$${b}x - ${c} = 2(${a}x)$`, `$${b-2*a}x = ${c}$`, `$x = ${x}$`] }; },
    tangents(r) { const x = ri(r,3,15), a = ri(r,2,6), c = ri(r,a+1,9), b = ri(r,1,20);
      const d = a*x + b - c*x;
      return { q: `Two tangents from an external point have lengths $${a}x + ${b}$ and $${c}x ${d<0?'- '+(-d):'+ '+d}$. Find $x$.`,
        a: String(x), hint: 'Tangents from the same point are congruent.',
        s: [`$${a}x + ${b} = ${c}x ${d<0?'- '+(-d):'+ '+d}$`, `$x = ${x}$`, `Both are $${a*x+b}$ &check;`] }; }
  },

  circleeq: {
    read(r) { const h = ri(r,-9,9), k = ri(r,-9,9), rad = ri(r,2,12), which = r() < .5;
      const eq = `(x ${h<0?'+ '+(-h):'- '+h})^2 + (y ${k<0?'+ '+(-k):'- '+k})^2 = ${rad*rad}`;
      return which
        ? { q: `Give the centre of $${eq}$.`, a: `(${h}, ${k})`, alt: [`(${h},${k})`],
            hint: 'The signs flip: $x + 3$ means $h = -3$.', s: [`$h = ${h}$, $k = ${k}$`, `Centre $(${h}, ${k})$`] }
        : { q: `Give the radius of $${eq}$.`, a: String(rad), hint: 'The right side is $r^2$, not $r$.',
            s: [`$r^2 = ${rad*rad}$`, `$r = ${rad}$`] }; },
    write(r) { const h = ri(r,-9,9), k = ri(r,-9,9), rad = ri(r,2,12);
      return { q: `Write the equation of the circle with centre $(${h}, ${k})$ and radius $${rad}$.`,
        a: `(x ${h<0?'+ '+(-h):'- '+h})^2 + (y ${k<0?'+ '+(-k):'- '+k})^2 = ${rad*rad}`,
        alt: [`(x${h<0?'+'+(-h):'-'+h})^2+(y${k<0?'+'+(-k):'-'+k})^2=${rad*rad}`],
        hint: 'Subtract each coordinate, then square the radius.',
        s: [`Substitute $h = ${h}$, $k = ${k}$, $r = ${rad}$.`, `$(x ${h<0?'+ '+(-h):'- '+h})^2 + (y ${k<0?'+ '+(-k):'- '+k})^2 = ${rad*rad}$`] }; },
    diameter(r) { const t = pick(r, TRIPLES.filter(v=>v[0]%2===0||v[1]%2===0)), x1 = ri(r,-6,6), y1 = ri(r,-6,6);
      const x2 = x1 + t[0]*2, y2 = y1 + t[1]*2, which = r() < .5;
      return which
        ? { q: `A circle has a diameter from $(${x1}, ${y1})$ to $(${x2}, ${y2})$. Find its centre.`,
            a: `(${(x1+x2)/2}, ${(y1+y2)/2})`, alt: [`(${(x1+x2)/2},${(y1+y2)/2})`],
            hint: 'The centre is the midpoint.', s: [`$\\left(\\dfrac{${x1}+${x2}}{2}, \\dfrac{${y1}+${y2}}{2}\\right) = (${(x1+x2)/2}, ${(y1+y2)/2})$`] }
        : { q: `A circle has a diameter from $(${x1}, ${y1})$ to $(${x2}, ${y2})$. Find its radius.`,
            a: String(t[2]), hint: 'Half the distance between the endpoints.',
            s: [`Distance $= \\sqrt{${(2*t[0])**2} + ${(2*t[1])**2}} = ${2*t[2]}$`, `$r = ${t[2]}$`] }; },
    point(r) { const rad = ri(r,4,12), t = pick(r, TRIPLES);
      const on = r() < .4;
      const px = on ? t[0] : ri(r,0,rad-2), py = on ? t[1] : ri(r,0,rad-2);
      const R2 = on ? t[2]*t[2] : rad*rad, d2 = px*px + py*py;
      const ans = d2 < R2 ? 'inside' : d2 === R2 ? 'on' : 'outside';
      return { q: `Is $(${px}, ${py})$ inside, on, or outside $x^2 + y^2 = ${R2}$?`, a: ans,
        hint: 'Compare the squared distance with $r^2$ — no roots needed.',
        s: [`$${px}^2 + ${py}^2 = ${d2}$`, `$${d2} ${d2<R2?'<':d2===R2?'=':'>'} ${R2}$`, `So it is ${ans}.`] }; },
    form(r) { const right = '$r^2$';
      return Object.assign({ q: 'In $(x-h)^2 + (y-k)^2 = r^2$, the number on the right is',
        hint: 'The distance formula was squared to get here.',
        s: ['It stores $r^2$, not $r$.', 'A right side of $25$ means a radius of $5$.'] },
        mc(r, right, ['$r$','$2r$','the diameter'])); },
    complete(r) { const h = ri(r,-7,7), k = ri(r,-7,7), rad = ri(r,2,9), which = r() < .5;
      const D = -2*h, E = -2*k, F = h*h + k*k - rad*rad;
      const eq = `x^2 + y^2 ${D<0?'- '+(-D):'+ '+D}x ${E<0?'- '+(-E):'+ '+E}y ${F<0?'- '+(-F):'+ '+F} = 0`;
      return which
        ? { q: `Find the centre of $${eq}$.`, a: `(${h}, ${k})`, alt: [`(${h},${k})`],
            hint: 'Complete the square in $x$ and again in $y$.',
            s: [`Group: $(x^2 ${D<0?'- '+(-D):'+ '+D}x) + (y^2 ${E<0?'- '+(-E):'+ '+E}y) = ${-F}$`,
                `Add $${h*h}$ and $${k*k}$ to both sides.`,
                `$(x ${h<0?'+ '+(-h):'- '+h})^2 + (y ${k<0?'+ '+(-k):'- '+k})^2 = ${rad*rad}$`, `Centre $(${h}, ${k})$`] }
        : { q: `Find the radius of $${eq}$.`, a: String(rad), hint: 'Complete the square, then root the right side.',
            s: [`$(x ${h<0?'+ '+(-h):'- '+h})^2 + (y ${k<0?'+ '+(-k):'- '+k})^2 = ${rad*rad}$`, `$r = ${rad}$`] }; },
    intersect(r) { const rad = ri(r,3,9), above = rad + ri(r,1,5);
      return { q: `How many points does the line $y = ${above}$ share with $x^2 + y^2 = ${rad*rad}$?`,
        a: '0', alt: ['none','zero'], hint: 'How high does the circle reach?',
        s: [`Radius $${rad}$, centred at the origin, so it reaches $y = ${rad}$.`,
            `$y = ${above}$ is above that, so they never meet.`] }; }
  },

  coordproof: {
    slope(r) { const x1 = ri(r,-8,6), y1 = ri(r,-8,8), run = ri(r,1,7), rise = ri(r,-9,9)||3;
      return { q: `Find the slope of the segment from $(${x1}, ${y1})$ to $(${x1+run}, ${y1+rise})$.`,
        a: fs(rise, run), alt: [String(Math.round(rise/run*1000)/1000)], hint: 'Rise over run.',
        s: [`Rise $= ${rise}$, run $= ${run}$`, `$m = ${tex(rise, run)}$`] }; },
    distance(r) { const t = pick(r, TRIPLES), x1 = ri(r,-6,5), y1 = ri(r,-6,5);
      return { q: `Find the length of the segment from $(${x1}, ${y1})$ to $(${x1+t[0]}, ${y1+t[1]})$.`,
        a: String(t[2]), hint: 'Distance formula.',
        s: [`Legs $${t[0]}$ and $${t[1]}$`, `$\\sqrt{${t[0]*t[0]} + ${t[1]*t[1]}} = ${t[2]}$`] }; },
    midpoint(r) { const x1 = ri(r,-9,9), y1 = ri(r,-9,9), x2 = x1 + 2*ri(r,1,7), y2 = y1 + 2*ri(r,-6,6);
      return { q: `Find the midpoint of $(${x1}, ${y1})$ and $(${x2}, ${y2})$.`,
        a: `(${(x1+x2)/2}, ${(y1+y2)/2})`, alt: [`(${(x1+x2)/2},${(y1+y2)/2})`],
        hint: 'Average each coordinate.',
        s: [`$x$: $\\dfrac{${x1} + ${x2}}{2} = ${(x1+x2)/2}$`, `$y$: $\\dfrac{${y1} + (${y2})}{2} = ${(y1+y2)/2}$`] }; },
    perp(r) { const n = ri(r,1,9), d = ri(r,1,9), neg = r() < .5;
      return { q: `A line has slope $${tex(neg?-n:n, d)}$. What slope is perpendicular to it?`,
        a: fs(neg ? d : -d, n), alt: [String(Math.round((neg?d/n:-d/n)*1000)/1000)],
        hint: 'Flip the fraction and change the sign.',
        s: [`Reciprocal: $${tex(neg?-d:d, n)}$`, `Negated: $${tex(neg?d:-d, n)}$`,
            'Check: the product is $-1$ &check;'] }; },
    tool(r) { const p = pick(r, [['two sides are congruent','distance'], ['two sides are parallel','slope'],
        ['a corner is a right angle','slope'], ['the diagonals bisect each other','midpoint'],
        ['the shape is a rhombus','distance']]);
      return { q: `You want to prove ${p[0]}. Which formula do you use?`, a: p[1],
        alt: ['the ' + p[1] + ' formula', p[1] + ' formula'],
        hint: 'Congruent needs length; parallel and perpendicular need direction; bisecting needs midpoints.',
        s: [`"${p[0]}" is a claim about ${p[1] === 'distance' ? 'length' : p[1] === 'slope' ? 'direction' : 'halving'}.`,
            `So use the ${p[1]} formula.`] }; },
    parallel(r) { const m = ri(r,1,5), same = r() < .6, x1 = ri(r,-5,5), y1 = ri(r,-5,5);
      const m2 = same ? m : m + ri(r,1,3);
      return { q: `Are the segments $(${x1}, ${y1})$–$(${x1+2}, ${y1+2*m})$ and $(0, 0)$–$(2, ${2*m2})$ parallel? Answer yes or no.`,
        a: same ? 'yes' : 'no', hint: 'Compare the two slopes.',
        s: [`First slope: $${m}$`, `Second slope: $${m2}$`, same ? 'Equal, so parallel.' : 'Different, so not parallel.'] }; },
    shape(r) { const p = pick(r, [['both pairs of opposite sides have equal slopes','parallelogram'],
        ['all four sides are the same length and the diagonals are perpendicular','rhombus'],
        ['opposite sides are parallel and adjacent slopes multiply to $-1$','rectangle'],
        ['exactly one pair of sides has equal slopes','trapezoid']]);
      return { q: `A quadrilateral is found to have: ${p[0]}. Name it.`, a: p[1],
        hint: 'Match the evidence to the definition.', s: [`${p[0].charAt(0).toUpperCase()+p[0].slice(1)}.`, `That is a ${p[1]}.`] }; },
    vertical(r) { const right = 'Yes, though the slope product rule does not apply';
      return Object.assign({ q: 'One side is vertical and the next is horizontal. Are they perpendicular?',
        hint: 'What is the slope of a vertical line?',
        s: ['They do meet at a right angle.', 'But a vertical slope is undefined, so $m_1 m_2 = -1$ cannot be used — check for vertical sides first.'] },
        mc(r, right, ['No','Only if the lengths match','Cannot be determined'])); },
    proof(r) { const p = pick(r, [
        ['the diagonals of any rectangle are congruent', 'sqrt(a^2 + b^2)', '$(0,0)$, $(a,0)$, $(a,b)$, $(0,b)$'],
        ['the diagonals of any square are congruent', 'sqrt(2)a', '$(0,0)$, $(a,0)$, $(a,a)$, $(0,a)$']]);
      return { q: `Using convenient coordinates ${p[2]}, prove ${p[0]}. Give the common diagonal length.`,
        a: p[1], alt: [p[1].replace('sqrt','√').replace(/[()]/g,'')],
        hint: 'Place one corner at the origin and keep the sides as letters.',
        s: ['Compute both diagonals with the distance formula.', `Both come to $${p[1].replace('sqrt','\\sqrt')}$.`,
            'The letters were never pinned down, so this covers every such shape.'] }; }
  },

  solids3d: {
    prism(r) { const B = ri(r,6,40), h = ri(r,3,20);
      return { q: `A prism has base area $${B}$ and height $${h}$. Find its volume.`, a: String(B*h),
        unit: 'cubic units', hint: '$V = Bh$ for every prism and cylinder.', s: [`$${B} \\times ${h} = ${B*h}$`] }; },
    cylinder(r) { const rad = ri(r,2,9), h = ri(r,2,14);
      return { q: `Find the volume of a cylinder with $r = ${rad}$ and $h = ${h}$, in terms of $\\pi$.`,
        a: `${rad*rad*h}pi`, alt: [`${rad*rad*h}π`, `${rad*rad*h} pi`], hint: '$V = \\pi r^2 h$.',
        s: [`$\\pi(${rad*rad})(${h})$`, `$= ${rad*rad*h}\\pi$`] }; },
    pyramid(r) { const B = pick(r,[12,15,18,21,24,27,30,36,42,48]), h = ri(r,3,18);
      return { q: `A pyramid has base area $${B}$ and height $${h}$. Find its volume.`, a: String(B*h/3),
        unit: 'cubic units', hint: '$V = \\tfrac13 Bh$ — a tapered solid holds a third.',
        s: [`$\\tfrac13 (${B})(${h}) = ${B*h/3}$`] }; },
    sphere(r) { const rad = pick(r,[3,6,9,12]);
      return { q: `Find the volume of a sphere with $r = ${rad}$, in terms of $\\pi$.`,
        a: `${4*rad**3/3}pi`, alt: [`${4*rad**3/3}π`], hint: '$V = \\tfrac43 \\pi r^3$.',
        s: [`$${rad}^3 = ${rad**3}$`, `$\\tfrac43 \\pi (${rad**3}) = ${4*rad**3/3}\\pi$`] }; },
    section(r) { const p = pick(r, [['a cut parallel to the base of a cylinder','circle'],
        ['a vertical cut through the axis of a cylinder','rectangle'],
        ['a slanted cut through a cylinder','ellipse'],
        ['a cut parallel to a face of a cube','square']]);
      return { q: `What shape does ${p[0]} give?`, a: p[1],
        hint: 'The angle of the plane decides, not the solid alone.', s: [`${p[0].charAt(0).toUpperCase()+p[0].slice(1)} gives a ${p[1]}.`] }; },
    cone(r) { const rad = pick(r,[3,6,9,12]), h = ri(r,2,15);
      return { q: `Find the volume of a cone with $r = ${rad}$ and $h = ${h}$, in terms of $\\pi$.`,
        a: `${rad*rad*h/3}pi`, alt: [`${rad*rad*h/3}π`], hint: '$V = \\tfrac13 \\pi r^2 h$.',
        s: [`$\\tfrac13 \\pi(${rad*rad})(${h})$`, `$= ${rad*rad*h/3}\\pi$`] }; },
    slant(r) { const t = pick(r, TRIPLES);
      return { q: `A cone has radius $${t[0]}$ and vertical height $${t[1]}$. Find its slant height.`,
        a: String(t[2]), hint: '$\\ell^2 = r^2 + h^2$.',
        s: [`$\\sqrt{${t[0]*t[0]} + ${t[1]*t[1]}} = \\sqrt{${t[2]*t[2]}}$`, `$= ${t[2]}$`] }; },
    surface(r) { const t = pick(r, TRIPLES);
      return { q: `A cone has radius $${t[0]}$ and slant height $${t[2]}$. Find its total surface area in terms of $\\pi$.`,
        a: `${t[0]*t[2] + t[0]*t[0]}pi`, alt: [`${t[0]*t[2] + t[0]*t[0]}π`],
        hint: 'Lateral $\\pi r \\ell$ plus base $\\pi r^2$.',
        s: [`Lateral $= \\pi(${t[0]})(${t[2]}) = ${t[0]*t[2]}\\pi$`, `Base $= ${t[0]*t[0]}\\pi$`,
            `Total $= ${t[0]*t[2] + t[0]*t[0]}\\pi$`] }; },
    revolve(r) { const p = pick(r, [['a rectangle about one of its sides','cylinder'],
        ['a right triangle about one of its legs','cone'], ['a semicircle about its diameter','sphere']]);
      return { q: `Spin ${p[0]}. What solid is formed?`, a: p[1],
        hint: 'Every point traces a circle about the axis.', s: [`Spinning ${p[0]} sweeps out a ${p[1]}.`] }; },
    backwards(r) { const rad = ri(r,2,9), h = ri(r,2,12);
      return { q: `A cylinder of height $${h}$ has volume $${rad*rad*h}\\pi$. Find its radius.`, a: String(rad),
        hint: 'Divide by $\\pi$ first — it cancels.',
        s: [`$\\pi r^2 (${h}) = ${rad*rad*h}\\pi$`, `$r^2 = ${rad*rad}$`, `$r = ${rad}$`] }; },
    composite(r) { const rad = pick(r,[3,6,9]), hc = ri(r,4,14), hk = ri(r,2,9);
      const v = rad*rad*hc + rad*rad*hk/3;
      return { q: `A silo is a cylinder of radius $${rad}$ and height $${hc}$, topped by a cone of the same radius and height $${hk}$. Find the total volume in terms of $\\pi$.`,
        a: `${v}pi`, alt: [`${v}π`], hint: 'Find each volume separately and add.',
        s: [`Cylinder: $${rad*rad*hc}\\pi$`, `Cone: $${rad*rad*hk/3}\\pi$`, `Total: $${v}\\pi$`] }; },
    scale(r) { const k = pick(r,[2,3,4,5]);
      return { q: `A solid is scaled up by a factor of $${k}$. By what factor does its volume grow?`,
        a: String(k**3), hint: 'Volume scales by $k^3$.',
        s: [`$${k}^3 = ${k**3}$`, `Length $\\times ${k}$, area $\\times ${k*k}$, volume $\\times ${k**3}$.`] }; }
  }
  };
  for (const u in MORE4) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE4[u]); }

  /* ---- Algebra II ---- */
  const MORE5 = {

  functionops: {
    add(r) { const a=ri(r,2,6), b=ri(r,1,9), c=ri(r,2,5), d=ri(r,1,9), x=ri(r,2,7);
      const fv=a*x+b, gv=c*x-d;
      return { q: `For $f(x)=${a}x+${b}$ and $g(x)=${c}x-${d}$, find $(f+g)(${x})$.`, a: String(fv+gv),
        hint: `Work out each one at $${x}$, then add.`,
        s: [`$f(${x})=${a}(${x})+${b}=${fv}$`, `$g(${x})=${c}(${x})-${d}=${gv}$`, `$${fv}+(${gv})=${fv+gv}$`] }; },
    mult(r) { const a=ri(r,1,8), b=ri(r,1,8), x=ri(r,2,6);
      const fv=x+a, gv=x-b;
      return { q: `For $f(x)=x+${a}$ and $g(x)=x-${b}$, find $(fg)(${x})$.`, a: String(fv*gv),
        hint: 'Evaluate each, then multiply the two numbers.',
        s: [`$f(${x})=${fv}$`, `$g(${x})=${gv}$`, `$${fv} \\times ${gv} = ${fv*gv}$`] }; },
    compose(r) { const a=ri(r,2,5), b=ri(r,1,9), c=ri(r,1,8), x=ri(r,1,6);
      const inner=a*x+b, out=inner+c;
      return { q: `For $f(x)=x+${c}$ and $g(x)=${a}x+${b}$, find $f(g(${x}))$.`, a: String(out),
        hint: 'The function touching the number runs first.',
        s: [`$g(${x})=${a}(${x})+${b}=${inner}$`, `$f(${inner})=${inner}+${c}=${out}$`] }; },
    order(r) { const a=ri(r,2,5), b=ri(r,1,8), x=ri(r,1,6);
      const fv=x+b, gv=a*fv;
      return { q: `For $f(x)=x+${b}$ and $g(x)=${a}x$, find $g(f(${x}))$.`, a: String(gv),
        hint: 'Here $f$ runs first — the order is not the same as $f(g(x))$.',
        s: [`$f(${x})=${fv}$`, `$g(${fv})=${a} \\times ${fv} = ${gv}$`, `Note $f(g(${x}))=${a*x+b}$ — different`] }; },
    formula(r) { const a=ri(r,2,6), b=ri(r,1,7), c=ri(r,1,6);
      return { q: `For $f(x)=${a}x-${c}$ and $g(x)=x+${b}$, write $(f \\circ g)(x)$ in the form $mx+n$.`,
        a: `${a}x+${a*b-c}`, alt: [`${a}x${a*b-c<0?'':'+'}${a*b-c}`],
        hint: 'Replace every $x$ in $f$ with the whole of $g(x)$.',
        s: [`$${a}(x+${b})-${c}$`, `$=${a}x+${a*b}-${c}$`, `$=${a}x+${a*b-c}$`] }; },
    inverse(r) { const a=pick(r,[2,3,4,5]), b=ri(r,1,9)*pick(r,[1,-1]);
      const sign=b<0?'-':'+', ab=Math.abs(b);
      return { q: `Find $f^{-1}(x)$ for $f(x)=${a}x ${sign} ${ab}$. Give it as a single fraction.`,
        a: `(x${b<0?'+':'-'}${ab})/${a}`,
        hint: 'Swap $x$ and $y$, then solve for $y$.',
        s: [`$x=${a}y ${sign} ${ab}$`, `$x ${b<0?'+':'-'} ${ab} = ${a}y$`, `$y=\\dfrac{x ${b<0?'+':'-'} ${ab}}{${a}}$`] }; },
    verify(r) { const a=pick(r,[2,3,4,5,6]), b=ri(r,1,9), x=ri(r,2,8), y=a*x-b;
      return { q: `If $f(x)=${a}x-${b}$, find $f^{-1}(${y})$.`, a: String(x),
        hint: 'Which input gives that output?',
        s: [`$${a}x-${b}=${y}$`, `$${a}x=${y+b}$`, `$x=${x}$`] }; }
  },

  transformfn: {
    vertex(r) { const h=ri(r,1,7)*pick(r,[1,-1]), k=ri(r,1,9)*pick(r,[1,-1]);
      const hs=h<0?`+${-h}`:`-${h}`, ks=k<0?`-${-k}`:`+${k}`;
      return { q: `Give the vertex of $y=(x${hs})^2${ks}$.`, a: `(${h},${k})`, alt: [`${h},${k}`],
        hint: 'The bracket is zero at the vertex.',
        s: [`$x${hs}=0$ at $x=${h}$`, `The constant outside gives $y=${k}$`] }; },
    shift(r) { const d=ri(r,2,8), dir=pick(r,['right','left']);
      const inside = dir==='right' ? `x-${d}` : `x+${d}`;
      return { q: `The graph of $y=(${inside})^2$ is the graph of $y=x^2$ moved which way, and by how much? Give the number of units.`,
        a: String(d), unit: dir,
        hint: 'Ask which $x$ makes the bracket zero.',
        s: [`$${inside}=0$ at $x=${dir==='right'?d:-d}$`, `So the graph has moved ${dir} by $${d}$`] }; },
    start(r) { const d=ri(r,2,9)*pick(r,[1,-1]);
      const ins = d<0 ? `x+${-d}` : `x-${d}`;
      return { q: `At what $x$ does the graph of $y=\\sqrt{${ins}}$ begin?`, a: String(d),
        hint: 'The inside of a square root cannot be negative.',
        s: [`$${ins} \\ge 0$`, `$x \\ge ${d}$`] }; },
    write(r) { const h=ri(r,1,6)*pick(r,[1,-1]), k=ri(r,1,8)*pick(r,[1,-1]);
      const hs=h<0?`+${-h}`:`-${h}`, ks=k<0?`${k}`:`+${k}`;
      return { q: `An absolute value graph has its corner at $(${h}, ${k})$ and is not stretched. Write its equation.`,
        a: `y=|x${hs}|${ks}`, alt: [`|x${hs}|${ks}`],
        hint: 'The bracket must vanish at the corner.',
        s: [`Corner at $x=${h}$ gives $|x${hs}|$`, `Corner at $y=${k}$ gives ${ks} outside`] }; },
    piece(r) { const b=ri(r,1,5), c=ri(r,1,6), lo=ri(r,-4,b-1), hi=ri(r,b,b+4);
      return { q: `For $f(x)=x+${c}$ when $x<${b}$, and $f(x)=x^2$ when $x \\ge ${b}$, find $f(${lo})+f(${hi})$.`,
        a: String(lo+c+hi*hi),
        hint: 'Choose the piece for each input before doing any arithmetic.',
        s: [`$${lo}<${b}$, so $f(${lo})=${lo}+${c}=${lo+c}$`, `$${hi} \\ge ${b}$, so $f(${hi})=${hi*hi}$`, `Sum $=${lo+c+hi*hi}$`] }; },
    stretch(r) { const a=ri(r,2,6);
      return { q: `How many times taller is $y=${a}|x|$ than $y=|x|$?`, a: String(a),
        hint: 'The number outside multiplies every output.',
        s: [`Every height is multiplied by $${a}$`] }; }
  },

  polydiv: {
    remainder(r) { const a=ri(r,1,4), b=ri(r,-6,6), c=ri(r,-9,9), k=ri(r,1,5);
      const v=a*k*k*k + b*k + c;
      const bs = b<0?`- ${-b}x`:`+ ${b}x`, cs = c<0?`- ${-c}`:`+ ${c}`;
      return { q: `Find the remainder when $f(x)=${a}x^3 ${bs} ${cs}$ is divided by $x-${k}$.`, a: String(v),
        hint: 'The remainder theorem: just compute $f(a)$.',
        s: [`$f(${k})=${a}(${k*k*k}) ${bs.replace('x',`(${k})`)} ${cs}$`, `$=${v}$`] }; },
    root(r) { const k=ri(r,2,9), plus=r()<.5;
      return { q: `What number goes in the box for synthetic division by $x${plus?'+':'-'}${k}$?`,
        a: String(plus?-k:k),
        hint: 'Use the root of the divisor, not the number printed.',
        s: [`$x${plus?'+':'-'}${k}=0$ gives $x=${plus?-k:k}$`] }; },
    divide(r) { const p=ri(r,1,9), q2=ri(r,1,9);
      // (x+p)(x+q) / (x+p) = x+q
      return { q: `Divide $x^2+${p+q2}x+${p*q2}$ by $x+${p}$.`, a: `x+${q2}`,
        hint: 'Which factor pairs with the divisor?',
        s: [`$x^2+${p+q2}x+${p*q2}=(x+${p})(x+${q2})$`, `So the quotient is $x+${q2}$`] }; },
    check(r) { const k=ri(r,1,5), a=ri(r,1,3), b=ri(r,-5,5);
      const isfac = r()<.5;
      const c = isfac ? -(a*k*k*k + b*k) : -(a*k*k*k + b*k) + ri(r,1,4);
      const bs = b<0?`- ${-b}x`:`+ ${b}x`, cs = c<0?`- ${-c}`:`+ ${c}`;
      return { q: `Is $x-${k}$ a factor of $${a}x^3 ${bs} ${cs}$? Answer yes or no.`,
        a: isfac?'yes':'no',
        hint: 'Compute $f(a)$ and see whether it is zero.',
        s: [`$f(${k})=${a*k*k*k + b*k + c}$`, isfac?'Zero, so it is a factor':'Not zero, so it is not a factor'] }; },
    findk(r) { const k=ri(r,1,4), c=ri(r,2,12);
      // x^3 + kx - c has root m  =>  m^3 + km - c = 0 => k = (c - m^3)/m
      const m=k, kk=(c - m*m*m)/m;
      if (!Number.isInteger(kk)) return this.findk(R(ri(r,1,1e9)));
      return { q: `For what value of $k$ is $x-${m}$ a factor of $x^3+kx-${c}$?`, a: String(kk),
        hint: 'A factor means the remainder is zero.',
        s: [`$f(${m})=${m*m*m}+${m}k-${c}=0$`, `$${m}k=${c - m*m*m}$`, `$k=${kk}$`] }; }
  },

  polyfn: {
    degree(r) { const d=ri(r,3,7), a=ri(r,2,6), b=ri(r,1,9);
      return { q: `What is the degree of $${b}x^${d<4?d+2:2} - ${a}x^${d} + 7$?`, a: String(Math.max(d<4?d+2:2, d)),
        hint: 'The highest power wins, wherever it is written.',
        s: [`The powers present are $${d<4?d+2:2}$, $${d}$ and $0$`, `The highest is $${Math.max(d<4?d+2:2,d)}$`] }; },
    turns(r) { const n=ri(r,3,8);
      return { q: `What is the greatest number of turning points a degree $${n}$ polynomial can have?`, a: String(n-1),
        hint: 'One fewer than the degree.',
        s: [`At most $n-1 = ${n-1}$`] }; },
    mindegree(r) { const t=ri(r,2,6);
      return { q: `A graph has $${t}$ turning points. What is the smallest degree it could be?`, a: String(t+1),
        hint: 'Turns are capped at one below the degree.',
        s: [`$n-1 \\ge ${t}$`, `So $n \\ge ${t+1}$`] }; },
    roots(r) { const a=ri(r,1,6), b=ri(r,1,6);
      if (a===b) return this.roots(R(ri(r,1,1e9)));
      const rs=[-b,a].sort((x,y)=>x-y);
      return { q: `Give the roots of $y=(x-${a})(x+${b})$, smallest first, separated by a comma.`,
        a: rs.join(','),
        hint: 'Set each factor to zero.',
        s: [`$x-${a}=0$ gives $${a}$`, `$x+${b}=0$ gives $${-b}$`] }; },
    yint(r) { const a=ri(r,1,5), b=ri(r,1,5), c=ri(r,1,5);
      return { q: `Find the $y$-intercept of $y=(x-${a})(x+${b})(x-${c})$.`, a: String((-a)*(b)*(-c)),
        hint: 'Substitute $x=0$.',
        s: [`$(-${a})(${b})(-${c})$`, `$=${(-a)*(b)*(-c)}$`] }; },
    degreefac(r) { const m=ri(r,1,3), n=ri(r,1,4);
      return { q: `Give the degree of $y=(x-1)^${m}(x+3)^${n}$.`, a: String(m+n),
        hint: 'Add the exponents.',
        s: [`$${m}+${n}=${m+n}$`] }; }
  },

  complexnum: {
    power(r) { const n=ri(r,5,60);
      const m=n%4, v=['1','i','-1','-i'][m];
      return { q: `Simplify $i^{${n}}$.`, a: v,
        hint: 'Divide the exponent by $4$ and keep the remainder.',
        s: [`$${n} = 4(${Math.floor(n/4)}) + ${m}$`, `$i^{${m}} = ${v}$`] }; },
    add(r) { const a=ri(r,1,9), b=ri(r,1,9), c=ri(r,1,9), d=ri(r,1,9);
      const re=a+c, im=b-d;
      return { q: `Simplify $(${a}+${b}i)+(${c}-${d}i)$.`,
        a: `${re}${im<0?'':'+'}${im}i`, alt: im===0?[String(re)]:[],
        hint: 'Real with real, imaginary with imaginary.',
        s: [`$${a}+${c}=${re}$`, `$${b}i-${d}i=${im}i$`] }; },
    multiply(r) { const a=ri(r,1,6), b=ri(r,1,6), c=ri(r,1,6), d=ri(r,1,6);
      const re=a*c + b*d, im=b*c - a*d;   // (a+bi)(c-di)
      return { q: `Expand $(${a}+${b}i)(${c}-${d}i)$.`,
        a: `${re}${im<0?'':'+'}${im}i`, alt: im===0?[String(re)]:[],
        hint: 'Expand, then replace $i^2$ with $-1$.',
        s: [`$${a*c} - ${a*d}i + ${b*c}i - ${b*d}i^2$`, `$-${b*d}i^2 = +${b*d}$`, `$${re}${im<0?'':'+'}${im}i$`] }; },
    conjugate(r) { const a=ri(r,1,9), b=ri(r,1,9), neg=r()<.5;
      return { q: `Give the conjugate of $${a}${neg?'-':'+'}${b}i$.`, a: `${a}${neg?'+':'-'}${b}i`,
        hint: 'Flip the sign of the imaginary part only.',
        s: [`The real part is unchanged`, `$${a}${neg?'+':'-'}${b}i$`] }; },
    root(r) { const k=pick(r,[4,9,16,25,36,49,64,81,100]);
      return { q: `Write $\\sqrt{-${k}}$ in terms of $i$.`, a: `${Math.sqrt(k)}i`,
        hint: 'The minus comes out as $i$.',
        s: [`$\\sqrt{-${k}}=\\sqrt{${k}}\\sqrt{-1}$`, `$=${Math.sqrt(k)}i$`] }; },
    norm(r) { const a=ri(r,1,7), b=ri(r,1,7);
      return { q: `Expand $(${a}+${b}i)(${a}-${b}i)$.`, a: String(a*a+b*b),
        hint: 'A difference of two squares — the $i$ vanishes.',
        s: [`$${a*a} - ${b*b}i^2$`, `$=${a*a}+${b*b}=${a*a+b*b}$`] }; }
  }

  };
  for (const u in MORE5) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE5[u]); }

  const MORE6 = {

  radicaleq: {
    solve(r) { const a=pick(r,[1,2,3,4]), k=ri(r,2,9), b=ri(r,1,12);
      const rhs=k*k, x=(rhs-b)/a;
      if (!Number.isInteger(x)) return this.solve(R(ri(r,1,1e9)));
      return { q: `Solve $\\sqrt{${a===1?'':a}x+${b}}=${k}$.`, a: String(x),
        hint: 'Square both sides, then solve what is left.',
        s: [`$${a===1?'':a}x+${b}=${rhs}$`, `$${a===1?'':a}x=${rhs-b}$`, `$x=${x}$`] }; },
    isolate(r) { const c=ri(r,1,9), k=ri(r,2,9);
      return { q: `Solve $\\sqrt{x}+${c}=${k+c}$.`, a: String(k*k),
        hint: 'Get the root alone before squaring.',
        s: [`$\\sqrt{x}=${k}$`, `$x=${k*k}$`] }; },
    exponent(r) { const base=pick(r,[[8,3],[27,3],[16,4],[81,4],[32,5],[64,6],[125,3]]);
      const [n,idx]=base, root=Math.round(Math.pow(n,1/idx)), p=ri(r,2,3);
      return { q: `Evaluate $${n}^{${p}/${idx}}$.`, a: String(Math.pow(root,p)),
        hint: 'The bottom is the root, the top is the power.',
        s: [`$\\sqrt[${idx}]{${n}}=${root}$`, `$${root}^${p}=${Math.pow(root,p)}$`] }; },
    start(r) { const d=ri(r,2,12);
      return { q: `At what $x$ does $y=\\sqrt{x-${d}}$ begin?`, a: String(d),
        hint: 'The inside must be at least zero.',
        s: [`$x-${d} \\ge 0$`, `$x \\ge ${d}$`] }; },
    cube(r) { const k=ri(r,2,6)*pick(r,[1,-1]);
      return { q: `Solve $\\sqrt[3]{x}=${k}$.`, a: String(k*k*k),
        hint: 'Cube both sides — cube roots accept negatives.',
        s: [`$x=${k}^3$`, `$=${k*k*k}$`] }; },
    extraneous(r) { const n=ri(r,2,8), c=n*n-n;   // sqrt(x+c) = x  has root n
      return { q: `Solve $\\sqrt{x+${c}}=x$. Give the only valid answer.`, a: String(n),
        hint: 'Square, solve, then check every candidate.',
        s: [`$x+${c}=x^2$`, `$x^2-x-${c}=0$ gives $x=${n}$ or $x=${1-n}$`,
            `$x=${1-n}$ fails: a square root is never negative`] }; }
  },

  rational: {
    exclude(r) { const a=pick(r,[1,2,3]), b=ri(r,1,12)*pick(r,[1,-1]);
      const x=-b/a;
      if (!Number.isInteger(x)) return this.exclude(R(ri(r,1,1e9)));
      const bs=b<0?`- ${-b}`:`+ ${b}`;
      return { q: `What value must be excluded from $\\dfrac{5}{${a===1?'':a}x ${bs}}$?`, a: String(x),
        hint: 'The denominator can never be zero.',
        s: [`$${a===1?'':a}x ${bs} = 0$`, `$x=${x}$`] }; },
    simplify(r) { const a=ri(r,2,9);
      return { q: `Simplify $\\dfrac{x^2-${a*a}}{x+${a}}$.`, a: `x-${a}`,
        hint: 'Factor the top as a difference of two squares.',
        s: [`$\\dfrac{(x-${a})(x+${a})}{x+${a}}$`, `Cancel the shared factor`] }; },
    add(r) { const a=ri(r,1,9), b=ri(r,1,9);
      return { q: `Simplify $\\dfrac{${a}}{x}+\\dfrac{${b}}{x}$.`, a: `${a+b}/x`,
        hint: 'Same denominator, so add the tops.',
        s: [`$\\dfrac{${a}+${b}}{x}$`, `$=\\dfrac{${a+b}}{x}$`] }; },
    solve(r) { const a=pick(r,[2,3,4,6]), b=pick(r,[2,3,4,6]);
      if (a===b) return this.solve(R(ri(r,1,1e9)));
      const lcm=a*b/gcd(a,b), k=ri(r,2,9), x=k*lcm/(lcm/a + lcm/b);
      if (!Number.isInteger(x)) return this.solve(R(ri(r,1,1e9)));
      return { q: `Solve $\\dfrac{x}{${a}}+\\dfrac{x}{${b}}=${k}$.`, a: String(x),
        hint: `Multiply every term by the common denominator $${lcm}$.`,
        s: [`$${lcm/a}x+${lcm/b}x=${k*lcm}$`, `$${lcm/a + lcm/b}x=${k*lcm}$`, `$x=${x}$`] }; },
    work(r) { const t1=pick(r,[2,3,4,6]), m=pick(r,[2,3,4,5]), t2=t1*m;
      const together=(t1*t2)/(t1+t2);
      if (!Number.isInteger(together)) return this.work(R(ri(r,1,1e9)));
      return { q: `One pipe fills a tank in $${t1}$ hours, another in $${t2}$. How many hours together?`,
        a: String(together), unit: 'hours',
        hint: 'Rates add, not times.',
        s: [`$\\dfrac{1}{${t1}}+\\dfrac{1}{${t2}}=\\dfrac{${t1+t2}}{${t1*t2}}$`,
            `That is $\\dfrac{${t1+t2}}{${t1*t2}}$ of a tank per hour`, `So $${together}$ hours`] }; },
    asymptote(r) { const k=ri(r,2,9)*pick(r,[1,-1]), b=ri(r,1,9);
      const ks=k<0?`+ ${-k}`:`- ${k}`;
      return { q: `Give the vertical asymptote of $y=\\dfrac{x+${b}}{x ${ks}}$ as a value of $x$.`, a: String(k),
        hint: 'Where does the bottom vanish?',
        s: [`$x ${ks} = 0$ at $x=${k}$`, `The top is not zero there, so it is an asymptote`] }; }
  },

  logarithms: {
    evaluate(r) { const b=pick(r,[2,3,4,5,10]), e=ri(r,2,4);
      return { q: `Evaluate $\\log_{${b}} ${Math.pow(b,e)}$.`, a: String(e),
        hint: `$${b}$ to what power?`,
        s: [`$${b}^${e}=${Math.pow(b,e)}$`, `So the log is $${e}$`] }; },
    negative(r) { const b=pick(r,[2,3,5]), e=ri(r,1,3);
      return { q: `Evaluate $\\log_{${b}} \\dfrac{1}{${Math.pow(b,e)}}$.`, a: String(-e),
        hint: 'A fraction needs a negative exponent.',
        s: [`$${b}^{-${e}}=\\dfrac{1}{${Math.pow(b,e)}}$`] }; },
    laws(r) { const a=ri(r,2,9), b=ri(r,2,9), op=r()<.5;
      return { q: `If $\\log x = ${a}$ and $\\log y = ${b}$, find $\\log ${op?'(xy)':'\\dfrac{x}{y}'}$.`,
        a: String(op?a+b:a-b),
        hint: op?'Products become sums.':'Quotients become differences.',
        s: [op?`$${a}+${b}=${a+b}$`:`$${a}-${b}=${a-b}$`] }; },
    power(r) { const a=ri(r,2,7), p=ri(r,2,6);
      return { q: `If $\\log x = ${a}$, find $\\log x^{${p}}$.`, a: String(a*p),
        hint: 'The power comes down in front.',
        s: [`$${p}\\log x = ${p}(${a}) = ${a*p}$`] }; },
    solve(r) { const b=pick(r,[2,3,5]), e=ri(r,2,4);
      return { q: `Solve $\\log_{${b}} x = ${e}$.`, a: String(Math.pow(b,e)),
        hint: 'Rewrite in exponential form.',
        s: [`$x=${b}^${e}$`, `$=${Math.pow(b,e)}$`] }; },
    solvepow(r) { const b=pick(r,[2,3,5]), e=ri(r,2,5);
      return { q: `Solve $${b}^x = ${Math.pow(b,e)}$.`, a: String(e),
        hint: `Write the right side as a power of $${b}$.`,
        s: [`$${Math.pow(b,e)}=${b}^${e}$`, `So $x=${e}$`] }; },
    domain(r) { const c=ri(r,2,12);
      return { q: `For $\\log(x-${c})$ to be defined, what is the smallest integer $x$ can be?`, a: String(c+1),
        hint: 'The inside must be strictly positive.',
        s: [`$x-${c}>0$`, `$x>${c}$, so the smallest integer is $${c+1}$`] }; }
  },

  expmodels: {
    factor(r) { const p=ri(r,2,40), grow=r()<.5;
      const f=grow ? (100+p)/100 : (100-p)/100;
      return { q: `A quantity ${grow?'grows':'falls'} $${p}\\%$ each year. What is the ${grow?'growth':'decay'} factor?`,
        a: String(+f.toFixed(2)),
        hint: grow?'Keep what you have, then add the growth.':'What fraction survives?',
        s: [`$1 ${grow?'+':'-'} ${p/100} = ${+f.toFixed(2)}$`] }; },
    half(r) { const start=pick(r,[16,32,64,80,96,128,160,200,256]), h=pick(r,[2,3,4,5,6,10]), n=ri(r,2,4);
      const left=start/Math.pow(2,n);
      if (!Number.isInteger(left)) return this.half(R(ri(r,1,1e9)));
      return { q: `A $${start}$ g sample has a half-life of $${h}$ days. How many grams remain after $${h*n}$ days?`,
        a: String(left), unit: 'g',
        hint: 'Count the halvings first.',
        s: [`$${h*n} \\div ${h} = ${n}$ halvings`, `$${start} \\div 2^${n} = ${left}$`] }; },
    evaluate(r) { const a=pick(r,[50,100,200,500]), b=pick(r,[2,3]), t=ri(r,2,4);
      return { q: `For $y=${a}(${b})^t$, find $y$ when $t=${t}$.`, a: String(a*Math.pow(b,t)),
        hint: 'Work out the power before multiplying.',
        s: [`$${b}^${t}=${Math.pow(b,t)}$`, `$${a} \\times ${Math.pow(b,t)} = ${a*Math.pow(b,t)}$`] }; },
    classify(r) { const geo=r()<.5, a=ri(r,2,6), k=geo?pick(r,[2,3]):ri(r,2,7);
      const seq = geo ? [a, a*k, a*k*k, a*k*k*k] : [a, a+k, a+2*k, a+3*k];
      return { q: `Is the sequence $${seq.join(', ')}$ linear or exponential? Answer with one word.`,
        a: geo?'exponential':'linear',
        hint: geo?'Try dividing consecutive terms.':'Try subtracting consecutive terms.',
        s: [geo?`Each term is $${k}$ times the last`:`Each term adds $${k}$`,
            geo?'A constant ratio means exponential':'A constant difference means linear'] }; },
    backwards(r) { const now=pick(r,[800,1600,3200,6400]), d=pick(r,[2,3,4,5]), n=ri(r,2,3);
      return { q: `A culture doubles every $${d}$ hours and now has $${now}$ cells. How many were there $${d*n}$ hours ago?`,
        a: String(now/Math.pow(2,n)),
        hint: 'Going back in time means halving.',
        s: [`$${d*n} \\div ${d} = ${n}$ doublings`, `$${now} \\div ${Math.pow(2,n)} = ${now/Math.pow(2,n)}$`] }; }
  },

  series: {
    sigma(r) { const n=ri(r,3,6), a=ri(r,1,5), b=ri(r,0,6);
      let tot=0, terms=[];
      for (let k=1;k<=n;k++){ terms.push(a*k+b); tot+=a*k+b; }
      return { q: `Evaluate $\\sum_{k=1}^{${n}} (${a===1?'':a}k${b?'+'+b:''})$.`, a: String(tot),
        hint: 'Work out each term, then add.',
        s: [`Terms: $${terms.join(', ')}$`, `Total $=${tot}$`] }; },
    arith(r) { const a=ri(r,1,9), d=ri(r,2,7), n=pick(r,[10,12,15,20,25]);
      const last=a+(n-1)*d, tot=n*(a+last)/2;
      return { q: `Find the sum of the first $${n}$ terms of $${a}, ${a+d}, ${a+2*d}, \\ldots$`, a: String(tot),
        hint: 'Find the last term, then pair the ends.',
        s: [`$a_{${n}}=${a}+${n-1}(${d})=${last}$`, `$\\dfrac{${n}}{2}(${a}+${last})=${tot}$`] }; },
    terms(r) { const a=ri(r,2,9), d=pick(r,[2,3,4,5]), n=ri(r,5,12);
      const last=a+(n-1)*d;
      return { q: `How many terms are there from $${a}$ to $${last}$ counting by $${d}$?`, a: String(n),
        hint: 'Count the gaps, then add one.',
        s: [`$\\dfrac{${last}-${a}}{${d}}=${n-1}$ gaps`, `$${n-1}+1=${n}$ terms`] }; },
    geom(r) { const a=ri(r,1,6), k=pick(r,[2,3]), n=ri(r,4,6);
      const tot=a*(Math.pow(k,n)-1)/(k-1);
      return { q: `Find the sum of the first $${n}$ terms of $${a}, ${a*k}, ${a*k*k}, \\ldots$`, a: String(tot),
        hint: `The ratio is $${k}$.`,
        s: [`$S_n = ${a}\\dfrac{1-${k}^{${n}}}{1-${k}}$`, `$=${a} \\cdot \\dfrac{${1-Math.pow(k,n)}}{${1-k}} = ${tot}$`] }; },
    ratio(r) { const a=pick(r,[48,64,81,96,128]), k=pick(r,[2,3,4]);
      return { q: `Find the common ratio of $${a}, ${a/k}, ${a/k/k}, \\ldots$`, a: `1/${k}`, alt: [String(+(1/k).toFixed(4))],
        hint: 'Divide a term by the one before it.',
        s: [`$${a/k} \\div ${a} = \\dfrac{1}{${k}}$`] }; },
    infinite(r) { const k=pick(r,[2,3,4]), a=k*ri(r,2,8);
      const tot=a/(1-1/k);
      if (!Number.isInteger(tot)) return this.infinite(R(ri(r,1,1e9)));
      return { q: `Find the sum of the infinite series $${a}+${a/k}+${a/k/k}+\\cdots$`, a: String(tot),
        hint: 'Check the ratio is under $1$, then use $\\dfrac{a_1}{1-r}$.',
        s: [`$r=\\dfrac{1}{${k}}$`, `$S=\\dfrac{${a}}{1-\\frac{1}{${k}}}=${tot}$`] }; }
  },

  unitcircle: {
    todeg(r) { const f=pick(r,[[1,6,30],[1,4,45],[1,3,60],[1,2,90],[2,3,120],[3,4,135],[5,6,150],[3,2,270]]);
      return { q: `Convert $\\dfrac{${f[0]}\\pi}{${f[1]}}$ radians to degrees.`, a: String(f[2]), unit: 'degrees',
        hint: 'Multiply by $\\dfrac{180}{\\pi}$.',
        s: [`$\\dfrac{${f[0]} \\times 180}{${f[1]}}=${f[2]}$`] }; },
    reference(r) { const d=pick(r,[120,135,150,210,225,240,300,315,330]);
      const ref = d<180 ? 180-d : d<270 ? d-180 : 360-d;
      return { q: `Find the reference angle for $${d}°$.`, a: String(ref), unit: 'degrees',
        hint: 'How far is it from the $x$-axis?',
        s: [d<180?`$180-${d}=${ref}$`:d<270?`$${d}-180=${ref}$`:`$360-${d}=${ref}$`] }; },
    coterminal(r) { const d=ri(r,370,700);
      return { q: `Find the angle between $0°$ and $360°$ coterminal with $${d}°$.`, a: String(d-360), unit: 'degrees',
        hint: 'Subtract a full turn.',
        s: [`$${d}-360=${d-360}$`] }; },
    cotermneg(r) { const d=-ri(r,10,350);
      return { q: `Find the angle between $0°$ and $360°$ coterminal with $${d}°$.`, a: String(d+360), unit: 'degrees',
        hint: 'Add a full turn.',
        s: [`$${d}+360=${d+360}$`] }; },
    arc(r) { const rad=ri(r,2,12), th=pick(r,[0.5,1.5,2.5,2,3]);
      return { q: `A circle of radius $${rad}$ has a central angle of $${th}$ radians. Find the arc length.`,
        a: String(+(rad*th).toFixed(2)),
        hint: 'Use $s=r\\theta$ — the angle is already in radians.',
        s: [`$${rad} \\times ${th} = ${+(rad*th).toFixed(2)}$`] }; }
  },

  triggraphs: {
    amplitude(r) { const a=ri(r,2,9)*pick(r,[1,-1]);
      return { q: `Give the amplitude of $y=${a}\\sin x$.`, a: String(Math.abs(a)),
        hint: 'Amplitude is a distance, so never negative.',
        s: [`$|${a}|=${Math.abs(a)}$`] }; },
    period(r) { const b=pick(r,[2,3,4,5,6]);
      const [n,d]=frac(2,b);
      return { q: `Give the period of $y=\\sin(${b}x)$ as a multiple of $\\pi$. Enter just the number or fraction.`,
        a: fs(2,b),
        hint: 'Divide $2\\pi$ by the number inside.',
        s: [`$\\dfrac{2\\pi}{${b}}$`, `$=${fs(2,b)}\\pi$`] }; },
    midline(r) { const hi=ri(r,8,30), amp=ri(r,2,7), lo=hi-2*amp;
      return { q: `A wave peaks at $${hi}$ and bottoms at $${lo}$. Give its midline as a number.`,
        a: String((hi+lo)/2),
        hint: 'Half the sum of the top and bottom.',
        s: [`$\\dfrac{${hi}+${lo}}{2}=${(hi+lo)/2}$`] }; },
    amp2(r) { const hi=ri(r,8,30), amp=ri(r,2,7), lo=hi-2*amp;
      return { q: `A wave peaks at $${hi}$ and bottoms at $${lo}$. Find its amplitude.`, a: String(amp),
        hint: 'Half the difference.',
        s: [`$\\dfrac{${hi}-${lo}}{2}=${amp}$`] }; },
    maxmin(r) { const a=ri(r,2,8), d=ri(r,1,12), wantMax=r()<.5;
      return { q: `Find the ${wantMax?'maximum':'minimum'} of $y=${a}\\sin x+${d}$.`,
        a: String(wantMax?d+a:d-a),
        hint: wantMax?'Midline plus amplitude.':'Midline minus amplitude.',
        s: [`Midline $${d}$, amplitude $${a}$`, `$${d} ${wantMax?'+':'-'} ${a} = ${wantMax?d+a:d-a}$`] }; },
    wheel(r) { const rad=ri(r,8,30), c=rad+ri(r,1,10);
      return { q: `A Ferris wheel of radius $${rad}$ m has its centre $${c}$ m above the ground. How high is the lowest point?`,
        a: String(c-rad), unit: 'm',
        hint: 'Centre height minus the radius.',
        s: [`$${c}-${rad}=${c-rad}$`] }; }
  },

  trigid: {
    identity(r) { const p=pick(r,[[3,4,5],[4,3,5],[5,12,13],[12,5,13],[8,15,17],[15,8,17]]);
      const [o,a,h]=p;
      return { q: `If $\\cos\\theta=\\dfrac{${a}}{${h}}$ and $\\theta$ is acute, find $\\sin\\theta$.`,
        a: `${o}/${h}`, alt: [String(+(o/h).toFixed(4))],
        hint: 'Use $\\sin^2\\theta+\\cos^2\\theta=1$.',
        s: [`$\\sin^2\\theta = 1-\\dfrac{${a*a}}{${h*h}} = \\dfrac{${o*o}}{${h*h}}$`, `Acute means positive: $\\dfrac{${o}}{${h}}$`] }; },
    quadrant(r) { const p=pick(r,[[3,4,5],[5,12,13],[8,15,17]]);
      const [o,a,h]=p;
      return { q: `If $\\sin\\theta=\\dfrac{${o}}{${h}}$ and $\\theta$ is in quadrant II, find $\\cos\\theta$.`,
        a: `-${a}/${h}`, alt: [String(+(-a/h).toFixed(4))],
        hint: 'Find the size first, then the sign from the quadrant.',
        s: [`$\\cos^2\\theta=1-\\dfrac{${o*o}}{${h*h}}=\\dfrac{${a*a}}{${h*h}}$`, `Quadrant II has $x$ negative`] }; },
    solve(r) { const p=pick(r,[[30,150,'\\dfrac12'],[60,120,'\\dfrac{\\sqrt3}{2}'],[45,135,'\\dfrac{\\sqrt2}{2}']]);
      return { q: `Solve $\\sin\\theta=${p[2]}$ for $0° \\le \\theta < 360°$. Give both answers, smallest first.`,
        a: `${p[0]},${p[1]}`,
        hint: 'Sine is positive in quadrants I and II.',
        s: [`Reference angle $${p[0]}°$`, `$${p[0]}°$ and $180-${p[0]}=${p[1]}°$`] }; },
    solvecos(r) { const p=pick(r,[[60,300],[45,315],[30,330]]);
      return { q: `Solve $\\cos\\theta=\\cos ${p[0]}°$ for $0° \\le \\theta < 360°$, $\\theta \\ne ${p[0]}°$. Give the other answer.`,
        a: String(p[1]), unit: 'degrees',
        hint: 'Cosine is positive in quadrants I and IV.',
        s: [`$360-${p[0]}=${p[1]}$`] }; },
    reciprocal(r) { const n=ri(r,2,9), which=r()<.5;
      return { q: `If $${which?'\\sin':'\\cos'}\\theta=\\dfrac{1}{${n}}$, find $${which?'\\csc':'\\sec'}\\theta$.`,
        a: String(n),
        hint: 'These are reciprocals.',
        s: [`$\\dfrac{1}{1/${n}}=${n}$`] }; },
    tan(r) { const p=pick(r,[[3,4],[4,3],[5,12],[12,5],[8,15]]);
      const [o,a]=p, h=Math.round(Math.hypot(o,a));
      return { q: `If $\\sin\\theta=\\dfrac{${o}}{${h}}$ and $\\cos\\theta=\\dfrac{${a}}{${h}}$, find $\\tan\\theta$.`,
        a: fs(o,a), alt: [String(+(o/a).toFixed(4))],
        hint: '$\\tan = \\dfrac{\\sin}{\\cos}$.',
        s: [`$\\dfrac{${o}/${h}}{${a}/${h}} = \\dfrac{${o}}{${a}}$`] }; }
  },

  normaldist: {
    zscore(r) { const mu=pick(r,[50,60,100,200,500]), sd=pick(r,[5,10,15,20,25,100]), z=ri(r,-3,3);
      if (z===0) return this.zscore(R(ri(r,1,1e9)));
      return { q: `A population is normal with mean $${mu}$ and standard deviation $${sd}$. Find the $z$-score of $${mu+z*sd}$.`,
        a: String(z),
        hint: '$z=\\dfrac{x-\\mu}{\\sigma}$.',
        s: [`$\\dfrac{${mu+z*sd}-${mu}}{${sd}}=${z}$`] }; },
    value(r) { const mu=pick(r,[50,100,170,500]), sd=pick(r,[4,8,10,15,100]), z=ri(r,-3,3);
      if (z===0) return this.value(R(ri(r,1,1e9)));
      return { q: `Mean $${mu}$, standard deviation $${sd}$. What value is $${Math.abs(z)}$ deviation${Math.abs(z)>1?'s':''} ${z>0?'above':'below'} the mean?`,
        a: String(mu+z*sd),
        hint: '$x=\\mu+z\\sigma$.',
        s: [`$${mu} ${z>0?'+':'-'} ${Math.abs(z)}(${sd}) = ${mu+z*sd}$`] }; },
    interval(r) { const mu=pick(r,[50,100,170,500]), sd=pick(r,[4,8,10,15,100]), k=ri(r,1,3);
      const pct=[68,95,99.7][k-1];
      return { q: `Mean $${mu}$, deviation $${sd}$. What percent of the population lies between $${mu-k*sd}$ and $${mu+k*sd}$?`,
        a: String(pct), unit: '%',
        hint: 'How many deviations either side is that?',
        s: [`That is $\\mu \\pm ${k}\\sigma$`, `About $${pct}\\%$`] }; },
    tail(r) { const mu=pick(r,[50,100,170,500]), sd=pick(r,[4,8,10,15,100]), k=pick(r,[1,2]);
      const pct=k===1?16:2.5;
      return { q: `Mean $${mu}$, deviation $${sd}$. What percent of the population is above $${mu+k*sd}$?`,
        a: String(pct), unit: '%',
        hint: 'Find how much lies outside, then halve it.',
        s: [`$${k===1?32:5}\\%$ lies outside $${k}$ deviation${k>1?'s':''}`, `Half of that is above: $${pct}\\%$`] }; },
    count(r) { const n=pick(r,[100,200,400,500,1000]);
      return { q: `In a group of $${n}$ with normally distributed scores, about how many lie within one standard deviation of the mean?`,
        a: String(Math.round(0.68*n)),
        hint: '$68\\%$ of the group.',
        s: [`$0.68 \\times ${n} = ${Math.round(0.68*n)}$`] }; }
  },

  statinf: {
    margin(r) { const n=pick(r,[100,400,625,900,1600,2500,10000]);
      const m=+(100/Math.sqrt(n)).toFixed(1);
      return { q: `Using the conservative $95\\%$ shortcut, estimate the margin of error for a simple random sample of $${n}$. Give a percent rounded to the nearest tenth.`,
        a: String(m), unit: '%',
        hint: 'Use $\\dfrac{1}{\\sqrt n}$.',
        s: [`$\\sqrt{${n}}=${Math.sqrt(n)}$`, `$\\dfrac{1}{${Math.sqrt(n)}} \\approx ${m}\\%$`] }; },
    size(r) { const m=pick(r,[1,2,4,5,10]);
      const n=Math.round(Math.pow(100/m,2));
      return { q: `About what sample size gives a margin of error of $${m}\\%$?`, a: String(n),
        hint: `Solve $\\dfrac{1}{\\sqrt n} = ${m/100}$.`,
        s: [`$\\sqrt n = ${100/m}$`, `$n=${n}$`] }; },
    interval(r) { const p=ri(r,35,65), m=pick(r,[2,3,4,5]);
      const lower=r()<.5;
      return { q: `A poll reports $${p}\\%$ with a margin of error of $${m}\\%$. Give the ${lower?'lower':'upper'} end of the interval, as a percent.`,
        a: String(lower?p-m:p+m), unit: '%',
        hint: lower?'Subtract the margin.':'Add the margin.',
        s: [`$${p} ${lower?'-':'+'} ${m} = ${lower?p-m:p+m}$`] }; },
    decided(r) { const p=ri(r,49,56), m=pick(r,[2,3,4]);
      const decided = p-m > 50;
      return { q: `A poll gives $${p}\\%$ with a margin of $${m}\\%$. Does the interval establish a lead over $50\\%$? Answer yes or no.`,
        a: decided?'yes':'no',
        hint: 'Check whether $50\\%$ falls inside the interval.',
        s: [`The interval is $${p-m}\\%$ to $${p+m}\\%$`,
            decided?'It sits entirely above $50\\%$, so yes':'It contains $50\\%$, so the data has not decided'] }; },
    quadruple(r) { const k=pick(r,[2,3,4]);
      return { q: `To divide a margin of error by $${k}$, by what factor must the sample size grow?`,
        a: String(k*k),
        hint: 'The margin shrinks with the square root of the sample size.',
        s: [`$\\sqrt n$ must grow by $${k}$`, `So $n$ grows by $${k}^2 = ${k*k}$`] }; }
  }

  };
  for (const u in MORE6) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE6[u]); }

  /* ---- Precalculus ---- */
  const MORE7 = {

  invtrig: {
    value(r) { const t=pick(r,[[30,'\\dfrac12','sin'],[45,'\\dfrac{\\sqrt2}{2}','sin'],[60,'\\dfrac{\\sqrt3}{2}','sin'],
        [60,'\\dfrac12','cos'],[45,'\\dfrac{\\sqrt2}{2}','cos'],[30,'\\dfrac{\\sqrt3}{2}','cos'],[45,'1','tan']]);
      const fn = t[2]==='sin'?'\\arcsin':t[2]==='cos'?'\\arccos':'\\arctan';
      return { q: `Find $${fn} ${t[1]}$ in degrees.`, a: String(t[0]), unit: 'degrees',
        hint: 'A special angle, read backwards.',
        s: [`$\\${t[2]} ${t[0]}° = ${t[1]}$`] }; },
    negative(r) { const t=pick(r,[[30,'\\dfrac12'],[45,'\\dfrac{\\sqrt2}{2}'],[60,'\\dfrac{\\sqrt3}{2}']]);
      const useCos = r()<.5;
      return { q: `Find $${useCos?'\\arccos':'\\arcsin'}\\left(-${t[1]}\\right)$ in degrees.`,
        a: String(useCos ? 180-t[0] : -t[0]), unit: 'degrees',
        hint: useCos?'Arccosine returns $0°$ to $180°$.':'Arcsine may return a negative angle.',
        s: [`Reference angle $${t[0]}°$`,
            useCos?`Quadrant II: $180-${t[0]} = ${180-t[0]}°$`:`Negative, so $-${t[0]}°$`] }; },
    obtuse(r) { const a=ri(r,15,75);
      const v=+Math.sin(a*Math.PI/180).toFixed(4);
      return { q: `An obtuse angle has $\\sin A = ${v}$. Find $A$ to the nearest degree.`,
        a: String(180-a), unit: 'degrees',
        hint: 'The calculator returns the acute one.',
        s: [`$\\sin^{-1}(${v}) \\approx ${a}°$`, `Obtuse: $180-${a} = ${180-a}°$`] }; },
    compose(r) { const a=pick(r,[120,135,150,200,210,225]);
      const ref = a<180 ? 180-a : a-180;
      return { q: `Evaluate $\\arcsin(\\sin ${a}°)$ in degrees.`, a: String(a<180?ref:-ref), unit: 'degrees',
        hint: 'The answer must land between $-90°$ and $90°$.',
        s: [`Reference angle $${ref}°$`,
            a<180?`Sine is positive, so the answer is $${ref}°$`:`Sine is negative there, so the answer is $-${ref}°$`] }; },
    range(r) { const w=pick(r,['arcsin','arccos','arctan']);
      const opts=['$-90°$ to $90°$','$0°$ to $180°$','$0°$ to $360°$','$0°$ to $90°$'];
      const ai = w==='arccos'?1:0;
      return { q: `What is the range of $\\${w}$?`, c: opts, a: ai,
        hint: 'Which stretch covers the whole range exactly once?',
        s: [w==='arccos'?'Cosine falls from $1$ to $-1$ across $0°$ to $180°$'
                        :'That stretch covers the full range without repeating'] }; }
  },

  trigadv: {
    third(r) { const a=ri(r,25,80), b=ri(r,25,80);
      if (a+b>=170) return this.third(R(ri(r,1,1e9)));
      return { q: `In triangle $ABC$, $A = ${a}°$ and $B = ${b}°$. Find $C$.`, a: String(180-a-b), unit: 'degrees',
        hint: 'The angles total $180°$.', s: [`$180-${a}-${b} = ${180-a-b}$`] }; },
    sines(r) { const A=ri(r,25,70), B=ri(r,25,70), a=ri(r,5,20);
      if (A+B>=170) return this.sines(R(ri(r,1,1e9)));
      const b=+(a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180)).toFixed(1);
      return { q: `In triangle $ABC$, $A = ${A}°$, $a = ${a}$ and $B = ${B}°$. Find $b$ to one decimal place.`,
        a: String(b),
        hint: 'Use $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$.',
        s: [`$b = \\dfrac{${a}\\sin ${B}°}{\\sin ${A}°}$`, `$\\approx ${b}$`] }; },
    cosines(r) { const a=ri(r,3,12), b=ri(r,3,12), C=pick(r,[30,45,60,90,120,135]);
      const c=+Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180)).toFixed(1);
      return { q: `A triangle has sides $${a}$ and $${b}$ with an included angle of $${C}°$. Find the third side to one decimal place.`,
        a: String(c),
        hint: '$c^2 = a^2+b^2-2ab\\cos C$.',
        s: [`$${a*a}+${b*b}-2(${a})(${b})\\cos ${C}°$`, `$c \\approx ${c}$`] }; },
    angle(r) { const t=pick(r,[[4,5,6],[5,7,9],[6,7,8],[7,8,12],[5,6,10],[8,9,13]]);
      const [x,y,z]=t;
      const C=Math.round(Math.acos((x*x+y*y-z*z)/(2*x*y))*180/Math.PI);
      return { q: `A triangle has sides $${x}$, $${y}$ and $${z}$. Find the largest angle to the nearest degree.`,
        a: String(C), unit: 'degrees',
        hint: 'The largest angle faces the longest side.',
        s: [`$${z*z} = ${x*x}+${y*y}-2(${x})(${y})\\cos C$`,
            `$\\cos C = ${(((x*x+y*y-z*z)/(2*x*y))).toFixed(3)}$`, `$C \\approx ${C}°$`] }; },
    area(r) { const a=ri(r,4,14), b=ri(r,4,14), C=pick(r,[30,90,150]);
      const area=+(0.5*a*b*Math.sin(C*Math.PI/180)).toFixed(2);
      return { q: `Find the area of a triangle with sides $${a}$ and $${b}$ and an included angle of $${C}°$.`,
        a: String(area),
        hint: 'Area $= \\dfrac12 ab \\sin C$.',
        s: [`$\\dfrac12(${a})(${b})\\sin ${C}° = ${area}$`] }; },
    inequality(r) { const x=ri(r,2,8), y=ri(r,2,8), ok=r()<.5;
      const z = ok ? ri(r, Math.abs(x-y)+1, x+y-1) : x+y+ri(r,1,4);
      return { q: `Can a triangle have sides $${x}$, $${y}$ and $${z}$?`, c: ['Yes','No','Only if right-angled','Only if obtuse'],
        a: ok?0:1,
        hint: 'Add the two shorter sides and compare with the longest.',
        s: [ok?`$${x}+${y} = ${x+y}$, which exceeds $${z}$`:`$${x}+${y} = ${x+y}$, which does not reach $${z}$`,
             ok?'So the sides close up':'So the short sides cannot meet'] }; }
  },

  polar: {
    topolar(r) { const t=pick(r,[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25]]);
      const sx=r()<.5?1:-1, sy=r()<.5?1:-1;
      return { q: `Find $r$ for the point $(${sx*t[0]}, ${sy*t[1]})$.`, a: String(t[2]),
        hint: 'Pythagoras — the signs vanish when squared.',
        s: [`$\\sqrt{${t[0]*t[0]}+${t[1]*t[1]}} = ${t[2]}$`] }; },
    torect(r) { const rr=pick(r,[4,6,8,10,12]), th=pick(r,[0,30,60,90,180]);
      const wantX=r()<.5;
      const v = wantX ? rr*Math.cos(th*Math.PI/180) : rr*Math.sin(th*Math.PI/180);
      if (Math.abs(v-Math.round(v))>1e-9) return this.torect(R(ri(r,1,1e9)));
      return { q: `Convert $(${rr}, ${th}°)$ to rectangular form. Give $${wantX?'x':'y'}$.`,
        a: String(Math.round(v)),
        hint: wantX?'$x = r\\cos\\theta$.':'$y = r\\sin\\theta$.',
        s: [`$${rr}\\${wantX?'cos':'sin'} ${th}° = ${Math.round(v)}$`] }; },
    quadrant(r) { const k=ri(r,2,9), q2=pick(r,[2,3]);
      const x = q2===2 ? -k : -k, y = q2===2 ? k : -k;
      const ang = q2===2 ? 135 : 225;
      return { q: `For the point $(${x}, ${y})$, find $\\theta$ in degrees with $0° \\le \\theta < 360°$.`,
        a: String(ang), unit: 'degrees',
        hint: 'Arctangent cannot see this quadrant — sketch the point.',
        s: [`The reference angle is $45°$`, `Quadrant ${q2===2?'II':'III'}, so $\\theta = ${ang}°$`] }; },
    coterminal(r) { const base=ri(r,10,350), extra=pick(r,[360,720]);
      return { q: `Give the angle between $0°$ and $360°$ naming the same direction as $${base+extra}°$.`,
        a: String(base), unit: 'degrees',
        hint: 'Subtract whole turns.',
        s: [`$${base+extra} - ${extra} = ${base}$`] }; },
    modulus(r) { const t=pick(r,[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[7,24,25]]);
      const neg=r()<.5;
      return { q: `Find $|z|$ for the complex number $z = ${t[0]} ${neg?'-':'+'} ${t[1]}i$.`, a: String(t[2]),
        hint: 'Distance from the origin in the complex plane.',
        s: [`$\\sqrt{${t[0]*t[0]}+${t[1]*t[1]}} = ${t[2]}$`] }; }
  },

  vectors: {
    add(r) { const a=ri(r,-8,8), b=ri(r,-8,8), c=ri(r,-8,8), d=ri(r,-8,8);
      const wantX=r()<.5;
      return { q: `For $\\mathbf{u}=\\langle ${a},${b}\\rangle$ and $\\mathbf{v}=\\langle ${c},${d}\\rangle$, find the ${wantX?'first':'second'} component of $\\mathbf{u}+\\mathbf{v}$.`,
        a: String(wantX?a+c:b+d),
        hint: 'Add matching components.',
        s: [wantX?`$${a}+${c} = ${a+c}$`:`$${b}+${d} = ${b+d}$`] }; },
    magnitude(r) { const t=pick(r,[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25],[20,21,29]]);
      const sx=r()<.5?1:-1, sy=r()<.5?1:-1;
      return { q: `Find the magnitude of $\\langle ${sx*t[0]}, ${sy*t[1]} \\rangle$.`, a: String(t[2]),
        hint: 'Pythagoras on the components.',
        s: [`$\\sqrt{${t[0]*t[0]}+${t[1]*t[1]}} = ${t[2]}$`] }; },
    dot(r) { const a=ri(r,-7,7), b=ri(r,-7,7), c=ri(r,-7,7), d=ri(r,-7,7);
      return { q: `Find $\\langle ${a}, ${b} \\rangle \\cdot \\langle ${c}, ${d} \\rangle$.`, a: String(a*c+b*d),
        hint: 'Multiply matching components and add.',
        s: [`$${a}(${c}) + ${b}(${d})$`, `$= ${a*c} + ${b*d} = ${a*c+b*d}$`] }; },
    perp(r) { const a=ri(r,1,8), b=ri(r,1,8), same=r()<.5;
      const c = same ? -b : ri(r,1,8), d = same ? a : ri(r,1,8);
      const dp = a*c + b*d;
      return { q: `Are $\\langle ${a}, ${b} \\rangle$ and $\\langle ${c}, ${d} \\rangle$ perpendicular?`,
        c: ['Yes','No','Only if scaled','Cannot tell'], a: dp===0?0:1,
        hint: 'Compute the dot product.',
        s: [`$${a}(${c})+${b}(${d}) = ${dp}$`, dp===0?'Zero means a right angle':'Not zero, so not perpendicular'] }; },
    findk(r) { const a=ri(r,2,9), c=ri(r,2,9), d=ri(r,2,9);
      const k = -(a*c)/d;
      if (!Number.isInteger(k)) return this.findk(R(ri(r,1,1e9)));
      return { q: `Find $k$ so that $\\langle ${a}, k \\rangle$ is perpendicular to $\\langle ${c}, ${d} \\rangle$.`,
        a: String(k),
        hint: 'Set the dot product to zero.',
        s: [`$${a*c} + ${d}k = 0$`, `$k = ${k}$`] }; },
    resultant(r) { const t=pick(r,[[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17]]);
      return { q: `Two forces, $${t[0]}$ N east and $${t[1]}$ N north, act on a point. Find the magnitude of the resultant.`,
        a: String(t[2]), unit: 'N',
        hint: 'They are at right angles, so use Pythagoras.',
        s: [`$\\sqrt{${t[0]*t[0]}+${t[1]*t[1]}} = ${t[2]}$`] }; }
  },

  matrices: {
    det(r) { const a=ri(r,-6,9), b=ri(r,-6,9), c=ri(r,-6,9), d=ri(r,-6,9);
      return { q: `Find the determinant of $\\begin{bmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{bmatrix}$.`,
        a: String(a*d-b*c),
        hint: 'Down the diagonal minus up the diagonal.',
        s: [`$(${a})(${d}) - (${b})(${c})$`, `$= ${a*d} - ${b*c} = ${a*d-b*c}$`] }; },
    shape(r) { const m=ri(r,2,5), n=ri(r,2,5), p=ri(r,2,5);
      return { q: `A $${m} \\times ${n}$ matrix multiplies an $${n} \\times ${p}$ matrix. Give the dimensions of the result, as rows x columns.`,
        a: `${m}x${p}`, alt: [`${m} x ${p}`, `${m}×${p}`],
        hint: 'The outside numbers give the answer.',
        s: [`Inside numbers are both $${n}$, so it works`, `Result is $${m} \\times ${p}$`] }; },
    multiply(r) { const a=ri(r,0,6), b=ri(r,0,6), x=ri(r,1,7), y=ri(r,1,7);
      const top=r()<.5;
      const c=ri(r,0,6), d=ri(r,0,6);
      return { q: `Find the ${top?'top':'bottom'} entry of $\\begin{bmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{bmatrix}\\begin{bmatrix} ${x} \\\\ ${y} \\end{bmatrix}$.`,
        a: String(top ? a*x+b*y : c*x+d*y),
        hint: 'Take that row and dot it with the column.',
        s: [top?`$${a}(${x}) + ${b}(${y}) = ${a*x+b*y}$`:`$${c}(${x}) + ${d}(${y}) = ${c*x+d*y}$`] }; },
    findk(r) { const b=ri(r,2,9), c=ri(r,2,9), d=ri(r,2,9);
      const k=(b*c)/d;
      if (!Number.isInteger(k)) return this.findk(R(ri(r,1,1e9)));
      return { q: `Find $k$ so that $\\begin{bmatrix} ${k===0?1:k} & ${b} \\\\ ${c} & ${d} \\end{bmatrix}$ has no inverse.`,
        a: String(k),
        hint: 'No inverse means the determinant is zero.',
        s: [`$${d}k - ${b*c} = 0$`, `$k = ${k}$`] }; },
    system(r) { const a=ri(r,1,5), b=ri(r,1,5), m=pick(r,[2,3]);
      return { q: `For the system $${a}x+${b}y=7$, $${a*m}x+${b*m}y=1$, find the determinant of the coefficient matrix.`,
        a: '0',
        hint: 'Strip the letters and take $ad-bc$.',
        s: [`$(${a})(${b*m}) - (${b})(${a*m}) = 0$`, 'So there is no unique solution'] }; }
  }

  };
  for (const u in MORE7) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE7[u]); }

  const MORE8 = {

  conics: {
    identify(r) { const k=ri(r,0,3);
      const eqs=['$x^2+y^2=25$','$y = x^2 - 4$','$\\dfrac{x^2}{9} - \\dfrac{y^2}{4} = 1$','$\\dfrac{x^2}{25}+\\dfrac{y^2}{16}=1$'];
      const names=['A circle','A parabola','A hyperbola','An ellipse'];
      const opts=['A circle','An ellipse','A parabola','A hyperbola'];
      return { q: `What curve is ${eqs[k]}?`, c: opts, a: opts.indexOf(names[k]),
        hint: 'Count the squared terms, then compare their signs.',
        s: [['Two squares, same sign, equal coefficients','Only one variable is squared',
             'Two squares with opposite signs','Two squares, same sign, different coefficients'][k]] }; },
    circle(r) { const h=ri(r,-7,7), k=ri(r,-7,7), rad=ri(r,2,9);
      const hs=h<0?`+${-h}`:`-${h}`, ks=k<0?`+${-k}`:`-${k}`;
      const wantR=r()<.5;
      return { q: `For $(x${hs})^2+(y${ks})^2=${rad*rad}$, give the ${wantR?'radius':'centre as an ordered pair'}.`,
        a: wantR?String(rad):`(${h},${k})`, alt: wantR?[]:[`${h},${k}`],
        hint: wantR?'The right side is $r^2$.':'Read the signs backwards.',
        s: [wantR?`$\\sqrt{${rad*rad}} = ${rad}$`:`$(x${hs})$ gives $${h}$ and $(y${ks})$ gives $${k}$`] }; },
    ellipse(r) { const a=pick(r,[2,3,4,5,6,7,8]), b=pick(r,[2,3,4,5,6,7,8]);
      if (a===b) return this.ellipse(R(ri(r,1,1e9)));
      const wantX=r()<.5;
      return { q: `For $\\dfrac{x^2}{${a*a}}+\\dfrac{y^2}{${b*b}}=1$, how far does the curve reach along the $${wantX?'x':'y'}$-axis?`,
        a: String(wantX?a:b),
        hint: 'Take the square root of the denominator.',
        s: [`$\\sqrt{${wantX?a*a:b*b}} = ${wantX?a:b}$`] }; },
    hyperbola(r) { const a=ri(r,2,7), b=ri(r,2,7), xFirst=r()<.5;
      const q = xFirst ? `\\dfrac{x^2}{${a*a}}-\\dfrac{y^2}{${b*b}}=1` : `\\dfrac{y^2}{${b*b}}-\\dfrac{x^2}{${a*a}}=1`;
      return { q: `Which way does $${q}$ open?`, c: ['Left and right','Up and down','All four ways','It does not open'],
        a: xFirst?0:1,
        hint: 'The positive term names the direction.',
        s: [`The $${xFirst?'x':'y'}^2$ term is the positive one`, `So it opens ${xFirst?'left and right':'up and down'}`] }; },
    complete(r) { const h=ri(r,1,7), k=ri(r,1,7), rad=ri(r,2,7);
      const c = h*h + k*k - rad*rad;
      const cs = c<0 ? `- ${-c}` : `+ ${c}`;
      const wantR=r()<.5;
      return { q: `For $x^2+y^2-${2*h}x+${2*k}y ${cs} = 0$, find the ${wantR?'radius':'centre as an ordered pair'}.`,
        a: wantR?String(rad):`(${h},${-k})`, alt: wantR?[]:[`${h},${-k}`],
        hint: 'Complete the square on each variable.',
        s: [`$(x-${h})^2+(y+${k})^2 = ${rad*rad}$`,
            wantR?`$r = ${rad}$`:`Centre $(${h}, ${-k})$`] }; }
  },

  paramfn: {
    point(r) { const a=ri(r,1,6), b=ri(r,-6,6), t=ri(r,1,6);
      const wantX=r()<.5;
      return { q: `For $x=${a}t${b<0?b:'+'+b}$, $y=t^2$, find $${wantX?'x':'y'}$ when $t=${t}$.`,
        a: String(wantX?a*t+b:t*t),
        hint: 'Substitute into the right equation.',
        s: [wantX?`$${a}(${t})${b<0?b:'+'+b} = ${a*t+b}$`:`$${t}^2 = ${t*t}$`] }; },
    eliminate(r) { const a=pick(r,[2,3,4]), c=ri(r,1,6);
      return { q: `Eliminate $t$ from $x=${a}t$, $y=t^2+${c}$. Give $y$ in terms of $x$.`,
        a: `x^2/${a*a}+${c}`, alt: [`(x^2)/${a*a}+${c}`, `x^2/${a*a} + ${c}`],
        hint: 'Solve the first for $t$, then substitute.',
        s: [`$t = \\dfrac{x}{${a}}$`, `$y = \\dfrac{x^2}{${a*a}}+${c}$`] }; },
    circle(r) { const rad=ri(r,2,9);
      return { q: `For $x=${rad}\\cos t$, $y=${rad}\\sin t$, find $x^2+y^2$.`, a: String(rad*rad),
        hint: 'The Pythagorean identity does the work.',
        s: [`$${rad*rad}(\\cos^2 t+\\sin^2 t) = ${rad*rad}$`] }; },
    projectile(r) { const v=pick(r,[32,48,64,80,96]);
      return { q: `A ball has $y = ${v}t - 16t^2$. At what time does it return to the ground?`,
        a: String(v/16), unit: 'seconds',
        hint: 'Set $y=0$ and factor.',
        s: [`$t(${v}-16t)=0$`, `$t = \\dfrac{${v}}{16} = ${v/16}$`] }; },
    peak(r) { const v=pick(r,[32,48,64,80,96]);
      return { q: `A ball has $y = ${v}t - 16t^2$. At what time is it highest?`,
        a: String(v/32), unit: 'seconds',
        hint: 'The peak sits halfway between the two roots.',
        s: [`Roots at $t=0$ and $t=${v/16}$`, `Halfway: $t = ${v/32}$`] }; },
    largest(r) { const a=ri(r,2,9);
      return { q: `For $x=${a}\\cos t$, what is the largest value $x$ can take?`, a: String(a),
        hint: 'Cosine peaks at $1$.', s: [`$${a}(1) = ${a}$`] }; }
  },

  probadv: {
    factorial(r) { const n=ri(r,3,7);
      let v=1; for(let i=2;i<=n;i++) v*=i;
      return { q: `Evaluate $${n}!$.`, a: String(v),
        hint: 'Multiply every whole number up to it.',
        s: [`$${[...Array(n)].map((_,i)=>i+1).join(' \\cdot ')} = ${v}$`] }; },
    combination(r) { const n=ri(r,5,10), k=ri(r,2,3);
      let v=1; for(let i=0;i<k;i++) v=v*(n-i)/(i+1);
      return { q: `Evaluate $C(${n},${k})$.`, a: String(Math.round(v)),
        hint: 'Order does not matter, so divide by $k!$.',
        s: [`$\\dfrac{${n}!}{${k}!\\,${n-k}!} = ${Math.round(v)}$`] }; },
    permutation(r) { const n=ri(r,5,10), k=ri(r,2,3);
      let v=1; for(let i=0;i<k;i++) v*=(n-i);
      return { q: `Evaluate $P(${n},${k})$.`, a: String(v),
        hint: 'Order matters, so nothing is divided out.',
        s: [`$${[...Array(k)].map((_,i)=>n-i).join(' \\times ')} = ${v}$`] }; },
    counting(r) { const a=ri(r,2,7), b=ri(r,2,7), c=ri(r,2,5);
      const three=r()<.5;
      return { q: three
          ? `A meal is one of $${a}$ starters, one of $${b}$ mains and one of $${c}$ puddings. How many meals?`
          : `A menu has $${a}$ starters and $${b}$ mains. How many two-course meals?`,
        a: String(three?a*b*c:a*b),
        hint: 'Independent choices multiply.',
        s: [three?`$${a} \\times ${b} \\times ${c} = ${a*b*c}$`:`$${a} \\times ${b} = ${a*b}$`] }; },
    binomial(r) { const n=ri(r,4,6), k=ri(r,1,3), cst=ri(r,1,3);
      let cmb=1; for(let i=0;i<k;i++) cmb=cmb*(n-i)/(i+1);
      const coef=Math.round(cmb)*Math.pow(cst,k);
      return { q: `Find the coefficient of $x^{${n-k}}$ in $(x+${cst})^{${n}}$.`, a: String(coef),
        hint: 'The constant gets raised to a power too.',
        s: [`Need $r=${k}$, so $C(${n},${k}) \\cdot ${cst}^{${k}}$`,
            `$= ${Math.round(cmb)} \\times ${Math.pow(cst,k)} = ${coef}$`] }; },
    symmetry(r) { const n=ri(r,6,12), k=ri(r,4,n-2);
      return { q: `$C(${n},${k})$ equals $C(${n},j)$ for which other $j$?`, a: String(n-k),
        hint: 'Choosing what to take is choosing what to leave.',
        s: [`$C(n,r) = C(n,n-r)$`, `$${n}-${k} = ${n-k}$`] }; }
  },

  limits: {
    substitute(r) { const a=ri(r,1,5), b=ri(r,-8,8), c=ri(r,-9,9), x=ri(r,-3,4);
      return { q: `Find $\\lim_{x \\to ${x}}(${a}x^2 ${b<0?'-':'+'} ${Math.abs(b)}x ${c<0?'-':'+'} ${Math.abs(c)})$.`,
        a: String(a*x*x + b*x + c),
        hint: 'A polynomial is continuous, so substitute.',
        s: [`$${a}(${x*x}) ${b<0?'-':'+'} ${Math.abs(b)}(${x}) ${c<0?'-':'+'} ${Math.abs(c)}$`,
            `$= ${a*x*x + b*x + c}$`] }; },
    factor(r) { const a=ri(r,1,9);
      return { q: `Find $\\lim_{x \\to ${a}}\\dfrac{x^2-${a*a}}{x-${a}}$.`, a: String(2*a),
        hint: 'Substituting gives $\\dfrac00$, so factor.',
        s: [`$\\dfrac{(x-${a})(x+${a})}{x-${a}} = x+${a}$`, `At $x=${a}$ that is $${2*a}$`] }; },
    factor2(r) { const p=ri(r,1,7), q2=ri(r,1,7);
      return { q: `Find $\\lim_{x \\to ${-p}}\\dfrac{x^2+${p+q2}x+${p*q2}}{x+${p}}$.`, a: String(q2-p),
        hint: 'Factor the top.',
        s: [`$\\dfrac{(x+${p})(x+${q2})}{x+${p}} = x+${q2}$`, `At $x=${-p}$ that is $${q2-p}$`] }; },
    onesided(r) { const m=ri(r,2,5), b=ri(r,1,8), k=ri(r,1,4);
      const left=r()<.5;
      return { q: `For $f(x)=${m}x$ when $x<${k}$, and $f(x)=x+${b}$ when $x \\ge ${k}$, find the limit as $x$ approaches $${k}$ from the ${left?'left':'right'}.`,
        a: String(left?m*k:k+b),
        hint: `Use the rule that applies ${left?'below':'at or above'} $${k}$.`,
        s: [left?`$${m}(${k}) = ${m*k}$`:`$${k}+${b} = ${k+b}$`] }; },
    cancel(r) { const a=ri(r,1,9);
      return { q: `Find $\\lim_{x \\to 0}\\dfrac{x^2+${a}x}{x}$.`, a: String(a),
        hint: 'Factor $x$ out of the top.',
        s: [`$\\dfrac{x(x+${a})}{x} = x+${a}$`, `At $x=0$ that is $${a}$`] }; }
  },

  derivintro: {
    power(r) { const n=ri(r,2,9), c=ri(r,1,9);
      return { q: `Differentiate $f(x)=${c===1?'':c}x^{${n}}$.`,
        a: `${c*n}x^${n-1===1?'':n-1}`.replace(/x\^$/,'x'),
        alt: [`${c*n}x^{${n-1}}`, n-1===1?`${c*n}x`:''].filter(Boolean),
        hint: 'Bring the power down and drop it by one.',
        s: [`$${c} \\times ${n} = ${c*n}$`, `The power becomes $${n-1}$`] }; },
    average(r) { const a=ri(r,0,3), b=ri(r,4,8);
      return { q: `For $f(x)=x^2$, find the average rate of change from $x=${a}$ to $x=${b}$.`,
        a: String(a+b),
        hint: 'Rise over run.',
        s: [`$\\dfrac{${b*b}-${a*a}}{${b}-${a}} = \\dfrac{${b*b-a*a}}{${b-a}}$`, `$= ${a+b}$`] }; },
    evaluate(r) { const a=ri(r,1,5), b=ri(r,1,9), x=ri(r,-3,4);
      return { q: `For $y=${a===1?'':a}x^3-${b}x$, find the slope at $x=${x}$.`,
        a: String(3*a*x*x - b),
        hint: 'Differentiate first, then substitute.',
        s: [`$\\dfrac{dy}{dx} = ${3*a}x^2-${b}$`, `$${3*a}(${x*x})-${b} = ${3*a*x*x-b}$`] }; },
    flat(r) { const b=pick(r,[2,4,6,8,10,12]), c=ri(r,-9,9);
      return { q: `For $y=x^2-${b}x+${c}$, at what $x$ is the tangent horizontal?`, a: String(b/2),
        hint: 'Set the derivative to zero.',
        s: [`$2x-${b} = 0$`, `$x = ${b/2}$`] }; },
    quotient(r) { return { q: 'Simplify the difference quotient $\\dfrac{(x+h)^2-x^2}{h}$.',
        a: '2x+h', alt: ['h+2x'],
        hint: 'Expand, cancel, then divide by $h$.',
        s: ['$\\dfrac{x^2+2xh+h^2-x^2}{h}$', '$= \\dfrac{2xh+h^2}{h} = 2x+h$'] }; },
    constant(r) { const c=ri(r,2,30);
      return { q: `Differentiate $f(x)=${c}$.`, a: '0',
        hint: 'What is the slope of a horizontal line?',
        s: ['A constant never changes, so its rate of change is $0$'] }; }
  },

  areaintro: {
    rectangle(r) { const rate=ri(r,3,40), t=ri(r,2,9);
      const k=pick(r,[['mph','hours','miles'],['litres per minute','minutes','litres'],['pages per minute','minutes','pages']]);
      return { q: `A steady rate of $${rate}$ ${k[0]} runs for $${t}$ ${k[1]}. How many ${k[2]}?`,
        a: String(rate*t), unit: k[2],
        hint: 'Rate times time — the area of a rectangle.',
        s: [`$${rate} \\times ${t} = ${rate*t}$`] }; },
    triangle(r) { const v=pick(r,[8,12,16,20,24,30,40]), t=pick(r,[2,4,5,6,8,10]);
      if ((v*t)%2) return this.triangle(R(ri(r,1,1e9)));
      return { q: `Speed rises steadily from $0$ to $${v}$ m/s over $${t}$ seconds. Find the distance in metres.`,
        a: String(v*t/2), unit: 'm',
        hint: 'The graph is a triangle.',
        s: [`$\\dfrac12(${t})(${v}) = ${v*t/2}$`] }; },
    trapezium(r) { const a=pick(r,[2,4,6,10]), b=pick(r,[12,16,20,30]), t=pick(r,[4,5,6,10]);
      if (((a+b)*t)%2) return this.trapezium(R(ri(r,1,1e9)));
      return { q: `Speed goes steadily from $${a}$ to $${b}$ m/s over $${t}$ seconds. Find the distance in metres.`,
        a: String((a+b)*t/2), unit: 'm',
        hint: 'Average speed times time.',
        s: [`Average $= \\dfrac{${a}+${b}}{2} = ${(a+b)/2}$`, `$${(a+b)/2} \\times ${t} = ${(a+b)*t/2}$`] }; },
    width(r) { const lo=ri(r,0,4), span=pick(r,[2,4,6,8]), n=pick(r,[4,5,8,10]);
      const w=span/n;
      return { q: `The interval from $${lo}$ to $${lo+span}$ is split into $${n}$ equal strips. How wide is each strip?`,
        a: String(w),
        hint: 'Length divided by the number of strips.',
        s: [`$\\dfrac{${span}}{${n}} = ${w}$`] }; },
    strips(r) { const span=pick(r,[2,3,4,5,6]), w=pick(r,[0.25,0.5]);
      return { q: `How many strips of width $${w}$ fit in an interval of length $${span}$?`,
        a: String(span/w),
        hint: 'Length over width.',
        s: [`$\\dfrac{${span}}{${w}} = ${span/w}$`] }; },
    leftsum(r) { const n=pick(r,[4,5]), b=n;
      let tot=0; for(let i=0;i<n;i++) tot+=i;
      return { q: `Estimate the area under $f(x)=x$ on $[0,${b}]$ using $${n}$ left rectangles of width $1$.`,
        a: String(tot),
        hint: 'Heights come from the left edge of each strip.',
        s: [`Heights $${[...Array(n)].map((_,i)=>i).join(', ')}$`,
            `Sum $= ${tot}$, and each width is $1$`, `True area is $${b*b/2}$, so this underestimates`] }; }
  }

  };
  for (const u in MORE8) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE8[u]); }

  /* ---- Grade 6 ---- */
  const MORE9 = {

  decimalops: {
    add(r) { const a=ri(r,10,400)/10, b=ri(r,100,3000)/100;
      const v=+(a+b).toFixed(2);
      return { q: `Work out $${a} + ${b}$.`, a: String(v),
        hint: 'Line up the decimal points, padding with a zero if you need to.',
        s: [`Write $${a.toFixed(2)}$ so both have two places`, `$${a.toFixed(2)} + ${b.toFixed(2)} = ${v}$`] }; },
    subtract(r) { const b=ri(r,100,2000)/100, a=+(b+ri(r,50,3000)/100).toFixed(2);
      const v=+(a-b).toFixed(2);
      return { q: `Work out $${a} - ${b}$.`, a: String(v),
        hint: 'Pad with zeros so the columns match.',
        s: [`$${a.toFixed(2)} - ${b.toFixed(2)} = ${v}$`] }; },
    multiply(r) { const a=ri(r,2,9)/10, b=ri(r,2,9)/10;
      const v=+(a*b).toFixed(2);
      return { q: `Work out $${a} \\times ${b}$.`, a: String(v),
        hint: 'Multiply as whole numbers, then count the decimal places.',
        s: [`$${a*10} \\times ${b*10} = ${a*10*b*10}$`, `Two decimal places: $${v}$`,
            'Smaller than both, because each factor is under one'] }; },
    divide(r) { const d=pick(r,[2,4,5,8]), q2=ri(r,11,99)/10;
      const a=+(d*q2).toFixed(2);
      return { q: `Work out $${a} \\div ${d}$.`, a: String(+q2.toFixed(2)),
        hint: 'Put the decimal point in the answer straight above the one in the question.',
        s: [`$${a} \\div ${d} = ${+q2.toFixed(2)}$`] }; },
    money(r) { const n=pick(r,[3,4,5,6]), each=ri(r,150,1800)/100;
      const tot=+(each*n).toFixed(2);
      return { q: `A bill of $\\$${tot.toFixed(2)}$ is split ${n} ways. How much each?`,
        a: String(+each.toFixed(2)), alt: [each.toFixed(2)],
        hint: 'Divide, carrying on past the decimal point.',
        s: [`$${tot.toFixed(2)} \\div ${n} = ${each.toFixed(2)}$`] }; },
    convert(r) { const t=pick(r,[[0.75,'3/4'],[0.5,'1/2'],[0.25,'1/4'],[0.2,'1/5'],[0.8,'4/5'],[0.6,'3/5'],[0.125,'1/8'],[0.375,'3/8']]);
      return { q: `Write $${t[0]}$ as a fraction in lowest terms.`, a: t[1],
        hint: 'Read the place value, then simplify.',
        s: [`$${t[0]} = \\dfrac{${t[0]*1000}}{1000}$`, `which simplifies to $${t[1]}$`] }; }
  },

  fracdiv: {
    divide(r) { const a=ri(r,1,5), b=ri(r,2,8), c=ri(r,1,5), d=ri(r,2,8);
      if (a>=b || c>=d) return this.divide(R(ri(r,1,1e9)));
      const [n,dd]=frac(a*d, b*c);
      return { q: `Work out $\\dfrac{${a}}{${b}} \\div \\dfrac{${c}}{${d}}$.`, a: fs(a*d,b*c),
        hint: 'Flip the second fraction and multiply.',
        s: [`$\\dfrac{${a}}{${b}} \\times \\dfrac{${d}}{${c}} = \\dfrac{${a*d}}{${b*c}}$`,
            `which simplifies to $${fs(a*d,b*c)}$`] }; },
    whole(r) { const w=ri(r,2,9), d=pick(r,[2,3,4,5,6,8]);
      return { q: `Work out $${w} \\div \\dfrac{1}{${d}}$.`, a: String(w*d),
        hint: `How many ${d===2?'halves':'pieces'} fit into $${w}$?`,
        s: [`$${w} \\times ${d} = ${w*d}$`, 'Bigger than you started with, as dividing by a small piece must be'] }; },
    reciprocal(r) { const a=ri(r,2,9), b=ri(r,2,9);
      if (a===b) return this.reciprocal(R(ri(r,1,1e9)));
      return { q: `Give the reciprocal of $\\dfrac{${a}}{${b}}$.`, a: `${b}/${a}`,
        hint: 'Turn it upside down.', s: [`$\\dfrac{${b}}{${a}}$`] }; },
    word(r) { const d=pick(r,[2,3,4,6,8]), n=ri(r,2,9);
      const tot=n; // n wholes divided into 1/d pieces
      return { q: `How many $\\dfrac{1}{${d}}$-cup scoops fill $${n}$ cups?`, a: String(n*d),
        hint: `There are $${d}$ of them in every cup.`,
        s: [`$${n} \\times ${d} = ${n*d}$`] }; },
    mixed(r) { const w=ri(r,1,4), a=ri(r,1,3), b=pick(r,[2,3,4]), c=ri(r,1,3), d=pick(r,[2,3,4]);
      if (a>=b || c>=d) return this.mixed(R(ri(r,1,1e9)));
      const top=(w*b+a)*d, bot=b*c;
      return { q: `Work out $${w}\\dfrac{${a}}{${b}} \\div \\dfrac{${c}}{${d}}$.`, a: fs(top,bot),
        hint: 'Turn the mixed number into an improper fraction first.',
        s: [`$${w}\\dfrac{${a}}{${b}} = \\dfrac{${w*b+a}}{${b}}$`,
            `$\\dfrac{${w*b+a}}{${b}} \\times \\dfrac{${d}}{${c}} = ${fs(top,bot)}$`] }; }
  },

  integers6: {
    compare(r) { const a=ri(r,-12,12), b=ri(r,-12,12);
      if (a===b) return this.compare(R(ri(r,1,1e9)));
      return { q: `Which is smaller, $${a}$ or $${b}$?`, a: String(Math.min(a,b)),
        hint: 'Whichever sits further left on the number line.',
        s: [`$${Math.min(a,b)}$ is further left, so it is smaller`] }; },
    abs(r) { const a=ri(r,-20,-1), b=ri(r,1,20);
      const sub=r()<.5;
      return { q: `Work out $|{-}${-a}| ${sub?'-':'+'} |${b}|$.`,
        a: String(sub ? -a-b : -a+b),
        hint: 'Resolve both sets of bars first.',
        s: [`$|{-}${-a}| = ${-a}$ and $|${b}| = ${b}$`, `$${-a} ${sub?'-':'+'} ${b} = ${sub?-a-b:-a+b}$`] }; },
    opposite(r) { const a=ri(r,2,15)*pick(r,[1,-1]);
      return { q: `Give the opposite of $${a}$.`, a: String(-a),
        hint: 'Same distance from zero, other side.', s: [`$${-a}$`] }; },
    order(r) { const vals=[]; while(vals.length<4){const v=ri(r,-9,9); if(!vals.includes(v))vals.push(v);}
      const sorted=[...vals].sort((x,y)=>x-y);
      return { q: `Put $${vals.join('$, $')}$ in order, smallest first, separated by commas.`,
        a: sorted.join(','),
        hint: 'Place them on a number line and read left to right.',
        s: [`$${sorted.join(', ')}$`] }; },
    context(r) { const start=ri(r,-30,-2), change=ri(r,1,40), up=r()<.5;
      const k=pick(r,[['The temperature is','°','and rises','and falls'],['A submarine is at',' m','and rises','and dives']]);
      return { q: `${k[0]} $${start}${k[1]}$ ${up?k[2]:k[3]} $${change}${k[1]}$. What is it now?`,
        a: String(up?start+change:start-change),
        hint: up?'Rising moves right on the number line.':'Falling moves left.',
        s: [`$${start} ${up?'+':'-'} ${change} = ${up?start+change:start-change}$`] }; }
  },

  coordplane: {
    quadrant(r) { const q2=ri(r,1,4);
      const sx=(q2===1||q2===4)?1:-1, sy=(q2===1||q2===2)?1:-1;
      const x=sx*ri(r,1,9), y=sy*ri(r,1,9);
      return { q: `In which quadrant is $(${x}, ${y})$?`, c: ['I','II','III','IV'], a: q2-1,
        hint: 'The signs decide it.',
        s: [`$x$ is ${x>0?'positive':'negative'} and $y$ is ${y>0?'positive':'negative'}`,
            `That is quadrant ${['I','II','III','IV'][q2-1]}`] }; },
    reflect(r) { const x=ri(r,-8,8), y=ri(r,-8,8), overX=r()<.5;
      if (!x||!y) return this.reflect(R(ri(r,1,1e9)));
      return { q: `Reflect $(${x}, ${y})$ across the $${overX?'x':'y'}$-axis.`,
        a: overX?`(${x},${-y})`:`(${-x},${y})`, alt: [overX?`${x},${-y}`:`${-x},${y}`],
        hint: `The $${overX?'x':'y'}$-axis is the mirror, so $${overX?'y':'x'}$ changes sign.`,
        s: [overX?`$(${x}, ${-y})$`:`$(${-x}, ${y})$`] }; },
    distance(r) { const a=ri(r,-9,2), b=ri(r,3,9), c=ri(r,-9,9), vert=r()<.5;
      return { q: `How far is it from $(${vert?c:a}, ${vert?a:c})$ to $(${vert?c:b}, ${vert?b:c})$?`,
        a: String(b-a),
        hint: 'One coordinate is the same, so count along the other.',
        s: [`$${b} - (${a}) = ${b-a}$`] }; },
    read(r) { const x=ri(r,1,9), y=ri(r,1,9), left=r()<.5, down=r()<.5;
      return { q: `A point is $${x}$ ${left?'left':'right'} and $${y}$ ${down?'down':'up'} from the origin. Write it as an ordered pair.`,
        a: `(${left?-x:x},${down?-y:y})`, alt: [`${left?-x:x},${down?-y:y}`],
        hint: 'Across first, then up or down.',
        s: [`$(${left?-x:x}, ${down?-y:y})$`] }; }
  },

  ratios6: {
    simplify(r) { const g=pick(r,[2,3,4,5,6]), a=ri(r,2,7), b=ri(r,2,7);
      if (gcd(a,b)!==1) return this.simplify(R(ri(r,1,1e9)));
      return { q: `Write $${a*g} : ${b*g}$ in its simplest form, as a:b.`, a: `${a}:${b}`,
        hint: `Divide both parts by ${g}.`,
        s: [`Both divide by $${g}$`, `$${a}:${b}$`] }; },
    scale(r) { const a=ri(r,2,6), b=ri(r,2,6), k=ri(r,2,6);
      return { q: `A recipe uses $${a}$ cups of flour to $${b}$ eggs. How much flour for $${b*k}$ eggs?`,
        a: String(a*k), unit: 'cups',
        hint: 'Find how many times bigger the eggs are.',
        s: [`$${b*k} \\div ${b} = ${k}$`, `$${a} \\times ${k} = ${a*k}$`] }; },
    whole(r) { const a=ri(r,1,6), b=ri(r,1,6);
      return { q: `A mix is $${a}$ blue to $${b}$ yellow. What fraction of the mix is blue?`,
        a: fs(a,a+b),
        hint: 'Add the parts to get the total.',
        s: [`$${a}+${b} = ${a+b}$ parts altogether`, `$${fs(a,a+b)}$`] }; },
    share(r) { const a=ri(r,1,6), b=ri(r,1,6), one=pick(r,[3,4,5,6,8,10]);
      const big=r()<.5;
      return { q: `Share $\\$${(a+b)*one}$ in the ratio $${a}:${b}$. How much is the ${big?'larger':'smaller'} share?`,
        a: String((big?Math.max(a,b):Math.min(a,b))*one),
        hint: 'Find the value of one part first.',
        s: [`$${a+b}$ parts, so one part is $\\$${one}$`,
            `$${big?Math.max(a,b):Math.min(a,b)} \\times ${one} = \\$${(big?Math.max(a,b):Math.min(a,b))*one}$`] }; },
    backwards(r) { const a=ri(r,2,6), b=ri(r,2,6), k=ri(r,2,7);
      return { q: `A mix is $${a}$ blue to $${b}$ yellow. If there are $${a*k}$ tins of blue, how many of yellow?`,
        a: String(b*k),
        hint: 'The blue has been multiplied by something.',
        s: [`$${a*k} \\div ${a} = ${k}$`, `$${b} \\times ${k} = ${b*k}$`] }; }
  },

  unitrates: {
    rate(r) { const per=ri(r,5,90), n=ri(r,2,9);
      const k=pick(r,[['miles','hours','miles per hour'],['pages','minutes','pages per minute'],['litres','minutes','litres per minute']]);
      return { q: `A total of $${per*n}$ ${k[0]} in $${n}$ ${k[1]}. Find the rate in ${k[2]}.`,
        a: String(per), unit: k[2],
        hint: '"Per" means divided by.',
        s: [`$${per*n} \\div ${n} = ${per}$`] }; },
    price(r) { const cents=pick(r,[15,20,25,30,40,45,50,75]), n=pick(r,[4,5,6,8,10,12]);
      const tot=+(cents*n/100).toFixed(2);
      return { q: `$${n}$ items cost $\\$${tot.toFixed(2)}$. Find the price of one.`,
        a: String(+(cents/100).toFixed(2)), alt: [(cents/100).toFixed(2)],
        hint: 'Divide the total by how many.',
        s: [`$${tot.toFixed(2)} \\div ${n} = ${(cents/100).toFixed(2)}$`] }; },
    better(r) { const cheap=pick(r,[20,22,24,25]), dear=cheap+pick(r,[2,3,5]);
      const s1=pick(r,[10,12,15]), s2=pick(r,[16,18,20]);
      const bigBetter=r()<.5;
      const pA=bigBetter?dear:cheap, pB=bigBetter?cheap:dear;
      return { q: `A $${s1}$ oz jar costs $\\$${(pA*s1/100).toFixed(2)}$; a $${s2}$ oz jar costs $\\$${(pB*s2/100).toFixed(2)}$. Which is the better buy?`,
        c: [`The $${s1}$ oz jar`, `The $${s2}$ oz jar`, 'They are the same', 'Cannot tell'],
        a: bigBetter?1:0,
        hint: 'Work out the price per ounce for each.',
        s: [`$${s1}$ oz: $${(pA/100).toFixed(3)}$ per ounce`,
            `$${s2}$ oz: $${(pB/100).toFixed(3)}$ per ounce`,
            'The lower price per ounce wins'] }; },
    apply(r) { const rate=ri(r,4,60), t=ri(r,2,9);
      return { q: `At $${rate}$ miles per hour, how far in $${t}$ hours?`, a: String(rate*t), unit: 'miles',
        hint: 'Rate times time.', s: [`$${rate} \\times ${t} = ${rate*t}$`] }; },
    convert(r) { const t=pick(r,[[100,'metres','centimetres'],[12,'feet','inches'],[60,'hours','minutes'],[1000,'kilometres','metres']]);
      const n=ri(r,2,9), up=r()<.5;
      return { q: up ? `How many ${t[2]} are in $${n}$ ${t[1]}?` : `How many ${t[1]} are in $${n*t[0]}$ ${t[2]}?`,
        a: String(up ? n*t[0] : n), unit: up?t[2]:t[1],
        hint: up?'Smaller units, so the number grows.':'Bigger units, so the number shrinks.',
        s: [up?`$${n} \\times ${t[0]} = ${n*t[0]}$`:`$${n*t[0]} \\div ${t[0]} = ${n}$`] }; }
  }

  };
  for (const u in MORE9) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE9[u]); }

  const MORE10 = {

  percent6: {
    of(r) { const p=pick(r,[5,10,15,20,25,30,35,40,50,60,75,80]), n=pick(r,[20,40,60,80,120,160,200,240,300]);
      const v=p*n/100;
      if (!Number.isInteger(v)) return this.of(R(ri(r,1,1e9)));
      return { q: `Find $${p}\\%$ of $${n}$.`, a: String(v),
        hint: 'Start from $10\\%$ and scale.',
        s: [`$10\\%$ of $${n}$ is $${n/10}$`, `So $${p}\\%$ is $${v}$`] }; },
    convert(r) { const p=ri(r,5,95);
      const toDec=r()<.5;
      return { q: toDec ? `Write $${p}\\%$ as a decimal.` : `Write $${p/100}$ as a percent. Give just the number.`,
        a: toDec ? String(p/100) : String(p),
        hint: toDec?'Divide by $100$.':'Multiply by $100$.',
        s: [toDec?`Move the point two places left: $${p/100}$`:`$${p/100} \\times 100 = ${p}$`] }; },
    discount(r) { const p=pick(r,[10,20,25,40,50]), price=pick(r,[40,60,80,100,120,160,200]);
      const v=+(price*(100-p)/100).toFixed(2);
      return { q: `A $\\$${price}$ item is reduced by $${p}\\%$. Find the sale price.`,
        a: String(v%1===0?v:+v.toFixed(2)), alt: [v.toFixed(2)],
        hint: `A $${p}\\%$ discount leaves $${100-p}\\%$.`,
        s: [`$${price} \\times ${(100-p)/100} = ${v}$`] }; },
    increase(r) { const p=pick(r,[5,10,15,20,25,50]), price=pick(r,[40,60,80,100,120,200]);
      const v=+(price*(100+p)/100).toFixed(2);
      return { q: `A $\\$${price}$ price rises by $${p}\\%$. Find the new price.`,
        a: String(v%1===0?v:+v.toFixed(2)), alt: [v.toFixed(2)],
        hint: `A $${p}\\%$ rise leaves $${100+p}\\%$.`,
        s: [`$${price} \\times ${(100+p)/100} = ${v}$`] }; },
    change(r) { const p=pick(r,[10,20,25,30,40,50]), start=pick(r,[20,40,50,60,80,100]);
      const up=r()<.5, end=start*(up?100+p:100-p)/100;
      if (!Number.isInteger(end)) return this.change(R(ri(r,1,1e9)));
      return { q: `A price ${up?'rises':'falls'} from $\\$${start}$ to $\\$${end}$. Find the percent ${up?'increase':'decrease'}.`,
        a: String(p), unit: '%',
        hint: 'Compare the change with the original.',
        s: [`Change $= ${Math.abs(end-start)}$`, `$\\dfrac{${Math.abs(end-start)}}{${start}} = ${p/100}$, so $${p}\\%$`] }; },
    backwards(r) { const p=pick(r,[10,20,25,40,50]), orig=pick(r,[40,60,80,100,120,200]);
      const sale=orig*(100-p)/100;
      if (!Number.isInteger(sale)) return this.backwards(R(ri(r,1,1e9)));
      return { q: `After $${p}\\%$ off, an item costs $\\$${sale}$. What was the original price?`,
        a: String(orig),
        hint: `The sale price is $${100-p}\\%$ of the original, so divide.`,
        s: [`$${sale} \\div ${(100-p)/100} = ${orig}$`, 'Adding the percent back would give a different, wrong number'] }; }
  },

  expressions6: {
    order(r) { const a=ri(r,2,12), b=ri(r,2,9), c=ri(r,2,9);
      const k=ri(r,0,2);
      if (k===0) return { q: `Work out $${a} + ${b} \\times ${c}$.`, a: String(a+b*c),
        hint: 'Multiplication comes before addition.',
        s: [`$${b} \\times ${c} = ${b*c}$`, `$${a} + ${b*c} = ${a+b*c}$`] };
      if (k===1) return { q: `Work out $(${a} + ${b}) \\times ${c}$.`, a: String((a+b)*c),
        hint: 'Brackets first.', s: [`$${a}+${b} = ${a+b}$`, `$${a+b} \\times ${c} = ${(a+b)*c}$`] };
      const d=pick(r,[2,3,4,6]), m=ri(r,2,6);
      return { q: `Work out $${d*m*2} \\div ${d} \\times ${m}$.`, a: String(m*2*m),
        hint: 'Equal ranks, so left to right.',
        s: [`$${d*m*2} \\div ${d} = ${m*2}$`, `$${m*2} \\times ${m} = ${m*2*m}$`] }; },
    exponent(r) { const b=ri(r,2,7), e=ri(r,2,4);
      return { q: `Work out $${b}^{${e}}$.`, a: String(Math.pow(b,e)),
        hint: 'The small number counts the factors.',
        s: [`$${Array(e).fill(b).join(' \\times ')} = ${Math.pow(b,e)}$`,
            `Not $${b} \\times ${e} = ${b*e}$`] }; },
    evaluate(r) { const a=ri(r,2,9), b=ri(r,1,12), n=ri(r,2,8);
      return { q: `Find the value of $${a}n + ${b}$ when $n = ${n}$.`, a: String(a*n+b),
        hint: 'Substitute, then multiply before adding.',
        s: [`$${a}(${n}) = ${a*n}$`, `$${a*n} + ${b} = ${a*n+b}$`] }; },
    square(r) { const a=ri(r,2,6), n=ri(r,2,5)*pick(r,[1,-1]), c=ri(r,1,9);
      return { q: `Find the value of $${a}n^2 - ${c}$ when $n = ${n}$.`, a: String(a*n*n-c),
        hint: 'Square first, then multiply, then subtract.',
        s: [`$(${n})^2 = ${n*n}$`, `$${a} \\times ${n*n} = ${a*n*n}$`, `$- ${c} = ${a*n*n-c}$`] }; },
    write(r) { const per=ri(r,2,9), fee=ri(r,1,12);
      const k=pick(r,[['A taxi charges','a mile','m'],['A club charges','each','n'],['A printer charges','a page','p']]);
      return { q: `${k[0]} $\\$${fee}$ to start plus $\\$${per}$ ${k[1]}. Write the cost for $${k[2]}$ of them.`,
        a: `${per}${k[2]}+${fee}`, alt: [`${fee}+${per}${k[2]}`],
        hint: 'The changing part gets the letter.',
        s: [`$${per}${k[2]} + ${fee}$`] }; },
    expand(r) { const a=ri(r,2,7), b=ri(r,1,9);
      return { q: `Expand $${a}(x + ${b})$.`, a: `${a}x+${a*b}`,
        hint: 'Multiply both terms inside the bracket.',
        s: [`$${a} \\times x = ${a}x$`, `$${a} \\times ${b} = ${a*b}$`] }; }
  },

  equations6: {
    solve(r) { const k=ri(r,0,3), x=ri(r,2,20), n=ri(r,2,15);
      if (k===0) return { q: `Solve $x + ${n} = ${x+n}$.`, a: String(x),
        hint: 'Subtract from both sides.', s: [`$x = ${x+n} - ${n} = ${x}$`] };
      if (k===1) return { q: `Solve $x - ${n} = ${x-n}$.`, a: String(x),
        hint: 'Add to both sides.', s: [`$x = ${x-n} + ${n} = ${x}$`] };
      const c=pick(r,[2,3,4,5,6,7,8,9]);
      if (k===2) return { q: `Solve $${c}x = ${c*x}$.`, a: String(x),
        hint: 'Divide both sides — the number is multiplying.',
        s: [`$x = ${c*x} \\div ${c} = ${x}$`] };
      return { q: `Solve $\\dfrac{x}{${c}} = ${x}$.`, a: String(c*x),
        hint: 'Multiply both sides.', s: [`$x = ${x} \\times ${c} = ${c*x}$`] }; },
    word(r) { const n=ri(r,3,30), k=ri(r,2,15), kind=ri(r,0,2);
      if (kind===0) return { q: `${k} more than a number is $${n+k}$. Find the number.`, a: String(n),
        hint: `Write it as $x + ${k} = ${n+k}$.`, s: [`$x = ${n}$`] };
      if (kind===1) return { q: `${k} less than a number is $${n-k}$. Find the number.`, a: String(n),
        hint: `"Less than" starts at the number: $x - ${k} = ${n-k}$.`,
        s: [`$x = ${n}$`, `Writing $${k} - x$ would give a different answer`] };
      const c=pick(r,[2,3,4,5,6]);
      return { q: `${c} times a number is $${c*n}$. Find the number.`, a: String(n),
        hint: `$${c}x = ${c*n}$.`, s: [`$x = ${n}$`] }; },
    check(r) { const c=pick(r,[3,4,5,6,7]), x=ri(r,3,12), wrong=r()<.5;
      const guess = wrong ? x+pick(r,[1,2,-1,-2]) : x;
      return { q: `Is $x = ${guess}$ a solution of $${c}x = ${c*x}$?`,
        c: ['Yes','No','Only sometimes','Cannot tell'], a: wrong?1:0,
        hint: 'Substitute and see whether it balances.',
        s: [`$${c} \\times ${guess} = ${c*guess}$`,
            wrong?`That is not $${c*x}$, so no`:`That matches, so yes`] }; }
  },

  inequal6: {
    solve(r) { const k=ri(r,0,2), x=ri(r,3,20), n=ri(r,2,12);
      const sym=pick(r,['<','>','<=','>=']);
      const tex={'<':'<','>':'>','<=':'\\le','>=':'\\ge'}[sym];
      if (k===0) return { q: `Solve $x + ${n} ${tex} ${x+n}$. Give the answer in the form x${sym}number.`,
        a: `x${sym}${x}`, alt: [`x ${sym} ${x}`],
        hint: 'Subtract from both sides, exactly as with an equation.',
        s: [`$x ${tex} ${x}$`] };
      if (k===1) return { q: `Solve $x - ${n} ${tex} ${x-n}$. Give the answer in the form x${sym}number.`,
        a: `x${sym}${x}`, alt: [`x ${sym} ${x}`],
        hint: 'Add to both sides.', s: [`$x ${tex} ${x}$`] };
      const c=pick(r,[2,3,4,5]);
      return { q: `Solve $${c}x ${tex} ${c*x}$. Give the answer in the form x${sym}number.`,
        a: `x${sym}${x}`, alt: [`x ${sym} ${x}`],
        hint: 'Divide both sides.', s: [`$x ${tex} ${x}$`] }; },
    count(r) { const a=ri(r,-6,2), b=a+ri(r,3,8), closed=r()<.5;
      const n = closed ? b-a+1 : b-a-1;
      return { q: `How many whole numbers satisfy $${a} ${closed?'\\le':'<'} n ${closed?'\\le':'<'} ${b}$?`,
        a: String(n),
        hint: closed?'Both ends are included.':'Neither end is included.',
        s: [closed?`From $${a}$ to $${b}$ inclusive is $${n}$ numbers`
                  :`From $${a+1}$ to $${b-1}$ is $${n}$ numbers`] }; },
    real(r) { const price=pick(r,[3,4,5,6,7,8,9]), money=pick(r,[20,30,40,50,60,100]);
      return { q: `Tickets cost $\\$${price}$ and you have $\\$${money}$. How many can you buy?`,
        a: String(Math.floor(money/price)),
        hint: 'Set up $' + price + 'n \\le ' + money + '$, then round sensibly.',
        s: [`$n \\le ${(money/price).toFixed(2)}$`,
            `Tickets are whole, so $${Math.floor(money/price)}$`] }; },
    write(r) { const n=ri(r,5,40);
      const t=pick(r,[['at least','>=','\\ge'],['no more than','<=','\\le'],['fewer than','<','<'],['more than','>','>']]);
      return { q: `Write "${t[0]} $${n}$" as an inequality in $x$, using ${t[1]} for the symbol.`,
        a: `x${t[1]}${n}`, alt: [`x ${t[1]} ${n}`],
        hint: t[1].length===2 ? 'This phrase includes the endpoint.' : 'This phrase excludes the endpoint.',
        s: [`$x ${t[2]} ${n}$`] }; }
  },

  areatri: {
    triangle(r) { const b=ri(r,3,20), h=ri(r,2,16);
      if ((b*h)%2) return this.triangle(R(ri(r,1,1e9)));
      return { q: `Find the area of a triangle with base $${b}$ and height $${h}$.`, a: String(b*h/2),
        hint: 'Half of the surrounding rectangle.',
        s: [`$\\dfrac12 \\times ${b} \\times ${h} = ${b*h/2}$`] }; },
    parallelogram(r) { const b=ri(r,3,15), h=ri(r,2,12);
      return { q: `Find the area of a parallelogram with base $${b}$ and height $${h}$.`, a: String(b*h),
        hint: 'No half here — it is a rearranged rectangle.',
        s: [`$${b} \\times ${h} = ${b*h}$`] }; },
    trapezoid(r) { const a=ri(r,2,12), b=a+ri(r,2,10), h=ri(r,2,10);
      if (((a+b)*h)%2) return this.trapezoid(R(ri(r,1,1e9)));
      return { q: `Find the area of a trapezoid with parallel sides $${a}$ and $${b}$ and height $${h}$.`,
        a: String((a+b)*h/2),
        hint: 'Average the parallel sides, then multiply by the height.',
        s: [`$\\dfrac{${a}+${b}}{2} = ${(a+b)/2}$`, `$${(a+b)/2} \\times ${h} = ${(a+b)*h/2}$`] }; },
    backwards(r) { const b=ri(r,3,16), h=ri(r,2,14);
      if ((b*h)%2) return this.backwards(R(ri(r,1,1e9)));
      return { q: `A triangle has area $${b*h/2}$ and base $${b}$. Find its height.`, a: String(h),
        hint: 'Work back from $\\dfrac12 bh$.',
        s: [`$\\dfrac12 \\times ${b} \\times h = ${b*h/2}$`, `$h = ${h}$`] }; },
    composite(r) { const L=ri(r,8,16), W=ri(r,5,12), a=ri(r,2,4), b=ri(r,2,4);
      return { q: `An L-shape is a $${L}$ by $${W}$ rectangle with an $${a}$ by $${b}$ corner removed. Find its area.`,
        a: String(L*W-a*b),
        hint: 'Find the whole rectangle, then subtract the missing piece.',
        s: [`$${L} \\times ${W} = ${L*W}$`, `$${a} \\times ${b} = ${a*b}$`, `$${L*W} - ${a*b} = ${L*W-a*b}$`] }; }
  },

  surfacenets: {
    box(r) { const l=ri(r,2,12), w=ri(r,2,12), h=ri(r,2,12);
      return { q: `Find the surface area of a box $${l}$ by $${w}$ by $${h}$.`,
        a: String(2*(l*w+l*h+w*h)),
        hint: 'Three different faces, then double.',
        s: [`$${l*w} + ${l*h} + ${w*h} = ${l*w+l*h+w*h}$`, `$\\times 2 = ${2*(l*w+l*h+w*h)}$`] }; },
    cube(r) { const e=ri(r,2,12);
      return { q: `Find the surface area of a cube with edge $${e}$.`, a: String(6*e*e),
        hint: 'Six identical square faces.',
        s: [`Each face is $${e*e}$`, `$6 \\times ${e*e} = ${6*e*e}$`,
            `Not $${e*e*e}$ — that would be the volume`] }; },
    pyramid(r) { const b=pick(r,[4,6,8,10,12]), sl=ri(r,3,15);
      if ((b*sl)%2) return this.pyramid(R(ri(r,1,1e9)));
      return { q: `A square pyramid has base edge $${b}$ and slant height $${sl}$. Find its surface area.`,
        a: String(b*b + 4*(b*sl/2)),
        hint: 'Base plus four triangles, using the slant height.',
        s: [`Base $= ${b*b}$`, `Each triangle $= \\dfrac12 \\times ${b} \\times ${sl} = ${b*sl/2}$`,
            `$${b*b} + 4(${b*sl/2}) = ${b*b+4*(b*sl/2)}$`] }; },
    backwards(r) { const e=pick(r,[2,3,4,5,6,7,8,9,10]);
      return { q: `A cube has surface area $${6*e*e}$. Find the length of one edge.`, a: String(e),
        hint: 'Divide by six, then take the square root.',
        s: [`$${6*e*e} \\div 6 = ${e*e}$`, `$\\sqrt{${e*e}} = ${e}$`] }; }
  },

  volumefrac: {
    box(r) { const l=ri(r,2,12), w=ri(r,2,12), h=ri(r,2,12);
      return { q: `Find the volume of a box $${l}$ by $${w}$ by $${h}$.`, a: String(l*w*h),
        hint: 'Base layer times the number of layers.',
        s: [`$${l} \\times ${w} = ${l*w}$ on the bottom`, `$${l*w} \\times ${h} = ${l*w*h}$`] }; },
    cube(r) { const e=ri(r,2,10);
      return { q: `Find the volume of a cube with edge $${e}$.`, a: String(e*e*e),
        hint: 'Edge cubed.', s: [`$${e}^3 = ${e*e*e}$`] }; },
    smallcubes(r) { const d=pick(r,[2,3,4]), v=ri(r,2,9);
      const count=v*d*d*d;
      return { q: `A box holds exactly $${count}$ cubes with $\\dfrac{1}{${d}}$-unit edges. Find its volume in cubic units.`,
        a: String(v),
        hint: `Each small cube is $\\dfrac{1}{${d*d*d}}$ of a cubic unit.`,
        s: [`$\\dfrac{1}{${d}} \\times \\dfrac{1}{${d}} \\times \\dfrac{1}{${d}} = \\dfrac{1}{${d*d*d}}$`,
            `$${count} \\div ${d*d*d} = ${v}$`] }; },
    howmany(r) { const d=pick(r,[2,3,4,5]);
      return { q: `How many cubes with $\\dfrac{1}{${d}}$-inch edges fill one cubic inch?`, a: String(d*d*d),
        hint: `There are $${d}$ along each edge.`,
        s: [`$${d} \\times ${d} \\times ${d} = ${d*d*d}$`] }; },
    backwards(r) { const l=ri(r,2,10), w=ri(r,2,10), h=ri(r,2,10);
      return { q: `A box has volume $${l*w*h}$ with a base $${l}$ by $${w}$. Find its height.`, a: String(h),
        hint: 'Divide the volume by the base area.',
        s: [`Base area $= ${l*w}$`, `$${l*w*h} \\div ${l*w} = ${h}$`] }; }
  },

  statquestions: {
    which(r) { const pairs=[['How tall am I?','How tall are students in my class?'],
        ['How old am I?','How old are people in my street?'],
        ['What is my shoe size?','What shoe sizes do sixth-graders wear?'],
        ['How far do I live from school?','How far do students live from school?']];
      const p=pick(r,pairs), first=r()<.5;
      return { q: `Which of these is a statistical question?`,
        c: first?[p[0],p[1],'Both','Neither']:[p[1],p[0],'Both','Neither'],
        a: first?1:0,
        hint: 'Would the answers vary from person to person?',
        s: ['The one asking about a group produces many answers',
            'The one about a single person has just one'] }; },
    count(r) { const bars=[ri(r,1,6),ri(r,2,8),ri(r,4,12),ri(r,2,8),ri(r,1,6)];
      return { q: `A dot plot has stacks of $${bars.join('$, $')}$ dots. How many values are there altogether?`,
        a: String(bars.reduce((a,b)=>a+b,0)),
        hint: 'Add the heights.',
        s: [`$${bars.join(' + ')} = ${bars.reduce((a,b)=>a+b,0)}$`] }; },
    shape(r) { const kind=ri(r,0,2);
      const bars = kind===0 ? [2,5,9,5,2] : kind===1 ? [12,8,4,2,1] : [1,2,4,8,12];
      return { q: `A histogram has bars of height $${bars.join('$, $')}$. What shape is the distribution?`,
        c: ['Symmetric','Skewed right','Skewed left','Double-humped'],
        a: kind===0?0:kind===1?1:2,
        hint: 'Where is the long tail?',
        s: [kind===0?'The heights mirror each other':kind===1?'The tail stretches to the right':'The tail stretches to the left'] }; },
    range(r) { const lo=ri(r,1,20), hi=lo+ri(r,4,30);
      return { q: `A dot plot runs from $${lo}$ to $${hi}$. Find the range.`, a: String(hi-lo),
        hint: 'Largest minus smallest.', s: [`$${hi} - ${lo} = ${hi-lo}$`] }; }
  },

  centerspread: {
    mean(r) { const n=pick(r,[3,4,5]), m=ri(r,4,20);
      const vals=[]; let tot=0;
      for (let i=0;i<n-1;i++){ const v=m+ri(r,-6,6); vals.push(v); tot+=v; }
      vals.push(m*n-tot);
      if (vals.some(v=>v<0)) return this.mean(R(ri(r,1,1e9)));
      return { q: `Find the mean of $${vals.join('$, $')}$.`, a: String(m),
        hint: 'Add them all, then divide by how many.',
        s: [`Total $= ${m*n}$`, `$${m*n} \\div ${n} = ${m}$`] }; },
    median(r) { const n=pick(r,[4,5,6]);
      const vals=[]; while(vals.length<n){ const v=ri(r,1,25); if(!vals.includes(v))vals.push(v); }
      const s2=[...vals].sort((a,b)=>a-b);
      const med = n%2 ? s2[(n-1)/2] : (s2[n/2-1]+s2[n/2])/2;
      return { q: `Find the median of $${vals.join('$, $')}$.`, a: String(med),
        hint: 'Sort them first — the median of an unsorted list means nothing.',
        s: [`Sorted: $${s2.join(', ')}$`,
            n%2?`The middle value is $${med}$`:`Average the middle two: $${med}$`] }; },
    range(r) { const vals=[]; while(vals.length<4){ const v=ri(r,1,40); if(!vals.includes(v))vals.push(v); }
      return { q: `Find the range of $${vals.join('$, $')}$.`, a: String(Math.max(...vals)-Math.min(...vals)),
        hint: 'Largest minus smallest.',
        s: [`$${Math.max(...vals)} - ${Math.min(...vals)} = ${Math.max(...vals)-Math.min(...vals)}$`] }; },
    mad(r) { const m=ri(r,5,20), d=pick(r,[1,2,3,4,5]);
      const vals=[m-2*d, m-d, m+d, m+2*d];
      return { q: `Find the mean absolute deviation of $${vals.join('$, $')}$.`, a: String(1.5*d),
        hint: 'Find the mean, then average the distances from it.',
        s: [`Mean $= ${m}$`, `Distances: $${2*d}, ${d}, ${d}, ${2*d}$`,
            `$\\dfrac{${6*d}}{4} = ${1.5*d}$`] }; },
    backwards(r) { const n=pick(r,[4,5,6]), m=ri(r,5,20);
      const vals=[]; let tot=0;
      for (let i=0;i<n-1;i++){ const v=m+ri(r,-4,4); vals.push(v); tot+=v; }
      const missing=m*n-tot;
      if (missing<0) return this.backwards(R(ri(r,1,1e9)));
      return { q: `${n} numbers have mean $${m}$. All but one are $${vals.join('$, $')}$. Find the missing one.`,
        a: String(missing),
        hint: 'The total must be the mean times the count.',
        s: [`Total $= ${m} \\times ${n} = ${m*n}$`, `$${m*n} - ${tot} = ${missing}$`] }; }
  }

  };
  for (const u in MORE10) { window.GEN[u] = window.GEN[u] || {}; Object.assign(window.GEN[u], MORE10[u]); }

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
