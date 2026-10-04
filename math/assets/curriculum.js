/* Site config. No preset names: everyone types a username, which is remembered
   per browser, so several people can share one computer and keep separate progress. */
window.SITE_TITLE = 'Graph Paper Math';
window.BRAND = 'Graph Paper Math';
window.PRESETS = [];

/* 7th Grade Accelerated — unit lessons.
   Sequence follows the district Grade 7 Accelerated course map (17 units). */
window.STRANDS = {
  ratio: { name: 'Ratio & Proportion', hue: 'a' },
  number: { name: 'The Number System', hue: 'b' },
  data: { name: 'Statistics & Probability', hue: 'c' },
  algebra: { name: 'Expressions & Equations', hue: 'd' },
  geometry: { name: 'Geometry', hue: 'e' },
  trig: { name: 'Trigonometry', hue: 'g' },
  calculus: { name: 'Introduction to Calculus', hue: 'h' },
  skills: { name: 'Problem Solving', hue: 'f' }
};

window.UNITS = [
{
  id: 'rates', strand: 'ratio', fig: 'doubleNumberLine',
  title: 'Proportional Reasoning with Rates',
  big: 'A rate compares two different kinds of quantity. Turn it into a unit rate and you can compare anything.',
  discover: [
    '**Two jars of honey sit on the shelf.** The small one is 400 g for \\$3.20. The big one is 750 g for \\$5.40.',
    'Which is the better buy? The big jar costs more — but you also get more of it.',
    { fig: 'discRates' },
    'Comparing the prices tells you nothing. Comparing the weights tells you nothing either.',
    'So make them comparable. \\$3.20 for 400 g is $\\$0.008$ per gram. \\$5.40 for 750 g is $\\$0.0072$ per gram.',
    'Now they can be compared, because both numbers answer the **same question**: what does one gram cost?',
    { punch: 'That is a **unit rate** — a rate with a $1$ on the bottom. Almost every "which is better?" question becomes easy the moment you divide down to one.' }
  ],
  funfact: [
    'Unit pricing on supermarket shelf labels was forced on shops by law, not offered by them.',
    'The US state of Massachusetts required it in 1971 after studies showed shoppers could not reliably pick the cheaper option without it.',
    'The law was doing exactly what this unit does: dividing everything down to one, so the numbers can be compared at a glance.'
  ],
  vocab: [
    ['Ratio', 'A comparison of two quantities, like $3$ cups flour to $2$ cups water.'],
    ['Rate', 'A ratio of two <em>different</em> units, like miles per hour or dollars per pound.'],
    ['Unit rate', 'A rate with denominator $1$ — how much for exactly one.'],
    ['Constant of proportionality', 'The unit rate, written $k$, in $y = kx$.']
  ],
  sections: [
    { h: 'What a rate really says',
      p: ['A ratio compares two amounts. When the two amounts have <strong>different units</strong>, we call it a rate.',
          'If a car travels $150$ miles in $3$ hours, the <strong>rate</strong> is $\\dfrac{150 \\text{ miles}}{3 \\text{ hours}}$. That fraction is the rate. It is true, but it is hard to compare to other cars.',
          'So we shrink the bottom to $1$. Divide both the top and the bottom by $3$: $\\dfrac{150 \\div 3}{3 \\div 3} = \\dfrac{50}{1}$. The car goes $50$ miles every $1$ hour. That is the <strong>unit rate</strong>.'],
      box: { k: 'key', h: 'The one move', t: 'To find a unit rate, divide the top number by the bottom number. Nothing else. $\\dfrac{a}{b} \\to a \\div b$ per one.' } },
    { h: 'Why unit rates win',
      p: ['You <em>cannot</em> compare $\\$7.50$ for $3$ pounds against $\\$11.60$ for $4$ pounds just by looking. The numbers are all different sizes.',
          'But $7.50 \\div 3 = \\$2.50$ per pound, and $11.60 \\div 4 = \\$2.90$ per pound. Now it is obvious. <strong>Unit rates</strong> put two deals on the same footing.'],
      box: { k: 'slow', h: 'Take it a step at a time', t: 'Ask yourself out loud: <em>"per one what?"</em> That question tells you which number goes on the bottom. Cost per pound &rarr; pounds on the bottom. Miles per hour &rarr; hours on the bottom.' } },
    { h: 'Rates with fractions',
      p: ['Sometimes the numbers themselves are fractions: a snail crawls $\\dfrac{1}{2}$ foot in $\\dfrac{1}{4}$ hour. <strong>The rule does not change</strong> — still divide.',
          '$\\dfrac{1}{2} \\div \\dfrac{1}{4} = \\dfrac{1}{2} \\times \\dfrac{4}{1} = 2$. The snail moves $2$ <strong>feet per hour</strong>.',
          'Dividing by a fraction smaller than $1$ <strong>makes the answer bigger</strong>. That is not a mistake — it is because a quarter hour is a short time, so in a whole hour the snail gets much further.'] },
    { h: 'The double number line',
      p: ['Draw two <strong>parallel</strong> lines: one for each quantity. Line them up so matching values sit above each other. Now you can step along by equal jumps and read off any value you need.',
          'This is the picture behind <em>every</em> rate problem. If $4$ tickets cost $\\$18$, mark $4$ under $\\$18$, then halve both to get $2$ tickets for $\\$9$, then halve again for $1$ ticket at $\\$4.50$.'] }
  ],
  examples: [
    { t: 'Better buy', q: 'A $12$-ounce box of cereal costs $\\$3.96$. An $18$-ounce box costs $\\$5.58$. Which is the better buy?',
      steps: [
        { do: 'Decide what "per one" means.', why: 'We want cost per ounce, so ounces go on the bottom.' },
        { do: 'Small box: $3.96 \\div 12 = 0.33$', why: '$33$ cents per ounce.' },
        { do: 'Large box: $5.58 \\div 18 = 0.31$', why: '$31$ cents per ounce.' },
        { do: 'Compare: $0.31 < 0.33$', why: 'The large box costs less for each ounce.' }
      ], ans: 'The $18$-ounce box is the better buy, by $2$ cents per ounce.' },
    { t: 'Rate with fractions', q: 'Maya paints $\\dfrac{3}{4}$ of a wall in $\\dfrac{2}{3}$ of an hour. How much can she paint in one hour?',
      steps: [
        { do: 'Write the rate as a division: $\\dfrac{3}{4} \\div \\dfrac{2}{3}$', why: 'Wall per hour, so hours go on the bottom.' },
        { do: 'Flip and multiply: $\\dfrac{3}{4} \\times \\dfrac{3}{2}$', why: 'Dividing by $\\dfrac{2}{3}$ is the same as multiplying by $\\dfrac{3}{2}$.' },
        { do: '$\\dfrac{3 \\times 3}{4 \\times 2} = \\dfrac{9}{8}$', why: 'Multiply straight across.' },
        { do: '$\\dfrac{9}{8} = 1\\dfrac{1}{8}$', why: 'More than one wall — makes sense, since $\\dfrac{2}{3}$ hour is less than an hour.' }
      ], ans: '$1\\dfrac{1}{8}$ walls per hour.' },
    { t: 'Working backwards from a unit rate', q: 'A printer runs at $14$ pages per minute. How long to print $196$ pages?',
      steps: [
        { do: 'The unit rate is $14$ pages per $1$ minute.', why: 'Every minute adds $14$ pages.' },
        { do: 'Set up: $14 \\times (\\text{minutes}) = 196$', why: 'Pages per minute times minutes gives total pages.' },
        { do: '$196 \\div 14 = 14$', why: 'Undo the multiplication by dividing.' }
      ], ans: '$14$ minutes.' }
  ],
  mistakes: [
    'Dividing the wrong way round. "Miles per hour" means miles $\\div$ hours, because you want to know how many miles fit into <em>one</em> hour. The word after "per" always goes on the bottom.',
    'Comparing totals instead of unit rates. A bigger box costing more does not make it a worse deal — it just makes it bigger. Only the price per gram, per sheet or per litre can settle it.',
    'Forgetting that dividing by a number less than $1$ makes the answer larger. Half a tank in a quarter of an hour is $2$ tanks per hour, not $\\tfrac18$ — dividing by $\\tfrac14$ multiplies by $4$.',
    'Answering with the rate when the question wanted the total. "$\\$2.50$ per pound" is not the cost of the shopping. Read the question again once you have the rate.'
  ]
},
{
  id: 'percents', strand: 'ratio', fig: 'percentGrid',
  title: 'Proportional Reasoning with Percents',
  big: 'A percent is a rate out of 100. Turn it into a multiplier and every percent problem becomes one multiplication.',
  discover: [
    '**A jacket costs \\$80. The sign says 30% off.** What do you pay?',
    'Most people find $30\\%$ of $80$, get $24$, and then subtract. That works — but there is a faster way to see it.',
    { fig: 'discPercents' },
    'Think of the full price as **100 little squares**. Thirty of them are taken away.',
    'So you are paying for the **70 that remain** — whatever the price happens to be.',
    '$70\\%$ of $80$ is $56$, in one step rather than two.',
    { punch: 'That single number, $0.70$, is called a **multiplier**, and it is what makes percent problems stack. Two successive $10\\%$ rises are $1.10 \\times 1.10 = 1.21$ — a $21\\%$ rise, not $20\\%$.' }
  ],
  funfact: [
    'The word **percent** is from the Latin *per centum*, "by the hundred." Roman emperors taxed goods at rates like $\\tfrac{1}{100}$, so hundredths were already the natural unit.',
    'The $\\%$ sign evolved from a scribal shorthand: Italian clerks wrote *per cento* as "per 100", then "p 100", and the 100 slowly collapsed into $\\%$.',
    'You can see the two zeros still sitting in it, one either side of the slash.'
  ],
  vocab: [
    ['Percent', 'Parts per hundred. $37\\% = \\dfrac{37}{100} = 0.37$.'],
    ['Multiplier', 'The single number you multiply by. A $20\\%$ increase has multiplier $1.20$.'],
    ['Percent change', '$\\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\%$ — always divided by the <em>original</em>.'],
    ['Markup / discount', 'An increase / a decrease applied to a starting price.']
  ],
  sections: [
    { h: 'Percent means "out of 100"',
      p: ['The word comes from <em>per centum</em> — for each hundred. So $45\\%$ means $45$ out of every $100$.',
          'That gives you <strong>three forms of the same thing</strong>, and you should be able to slide between them instantly: $45\\% = \\dfrac{45}{100} = 0.45$.',
          'To go from <strong>percent</strong> to decimal, move the point two places left. To go back, move it two places right.'] },
    { h: 'The multiplier trick',
      p: ['Most students compute the change and then add or subtract. That works, but it is <strong>two steps and two chances to slip</strong>.',
          'Instead, fold it into one number. A $30\\%$ <strong>discount</strong> leaves $70\\%$ of the price, so multiply by $0.70$. An $8\\%$ tax gives $108\\%$ of the price, so multiply by $1.08$.'],
      box: { k: 'key', h: 'Multipliers', t: 'Increase by $p\\%$: multiply by $1 + \\dfrac{p}{100}$.<br>Decrease by $p\\%$: multiply by $1 - \\dfrac{p}{100}$.' } },
    { h: 'Why multipliers matter: changes stack',
      p: ['A store raises a price $50\\%$, then puts it $50\\%$ off. <strong>Back to where it started</strong>? No.',
          'Multipliers: $1.50 \\times 0.50 = 0.75$. The final price is $75\\%$ of the original — a $25\\%$ <em>drop</em>.',
          'The reason is that the two changes are measured from different <strong>bases</strong>. The increase is on the small original; the decrease is on the bigger new number, so it takes away more.'],
      box: { k: 'warn', h: 'Percent changes never simply cancel', t: 'Up $50\\%$ then down $50\\%$ is <strong>not</strong> a wash. Multiply the multipliers and see what you actually get.' } },
    { h: 'Percent change',
      p: ['To find how much something <strong>changed in percent terms</strong>: $\\dfrac{\\text{new} - \\text{old}}{\\text{old}}$, then convert to a percent.',
          'The denominator is always the <strong>original</strong> amount. Going from $40$ to $50$ is a $25\\%$ increase ($\\dfrac{10}{40}$). Going from $50$ back to $40$ is a $20\\%$ decrease ($\\dfrac{10}{50}$). Same $10$, different percents, because the starting point changed.'] },
    { h: 'Finding the original',
      p: ['If a jacket is $\\$63$ after a $30\\%$ discount, the $\\$63$ is $70\\%$ of the original. So original $\\times 0.70 = 63$, which <strong>means</strong> original $= 63 \\div 0.70 = \\$90$.',
          'When you know the result and want the start, <strong>divide</strong> by the multiplier instead of multiplying.'] }
  ],
  examples: [
    { t: 'Tax then tip', q: 'A meal costs $\\$40$. Tax is $8\\%$, and a $20\\%$ tip is added to the after-tax total. What is the final cost?',
      steps: [
        { do: 'Tax multiplier: $1.08$', why: 'You pay $100\\%$ plus $8\\%$ more.' },
        { do: '$40 \\times 1.08 = 43.20$', why: 'The after-tax total.' },
        { do: 'Tip multiplier: $1.20$', why: 'The tip is on the after-tax amount, as stated.' },
        { do: '$43.20 \\times 1.20 = 51.84$', why: 'Or do it in one shot: $40 \\times 1.08 \\times 1.20$.' }
      ], ans: '$\\$51.84$' },
    { t: 'Find the original price', q: 'After a $35\\%$ discount, a bike costs $\\$286$. What was the original price?',
      steps: [
        { do: 'The sale price is $65\\%$ of the original.', why: '$100\\% - 35\\% = 65\\%$.' },
        { do: 'So $\\text{original} \\times 0.65 = 286$', why: 'Write the sentence as an equation.' },
        { do: '$286 \\div 0.65 = 440$', why: 'Undo the multiplication.' },
        { do: 'Check: $440 \\times 0.65 = 286$ &check;', why: 'Always check by running it forward.' }
      ], ans: '$\\$440$' },
    { t: 'Successive changes', q: 'A population grows $20\\%$ one year and falls $20\\%$ the next. What is the overall percent change?',
      steps: [
        { do: 'Multipliers: $1.20$ and $0.80$', why: 'Up $20\\%$, then down $20\\%$.' },
        { do: '$1.20 \\times 0.80 = 0.96$', why: 'Chained changes multiply.' },
        { do: '$0.96$ means $96\\%$ of the start.', why: 'That is $4\\%$ less than $100\\%$.' }
      ], ans: 'A $4\\%$ decrease overall.' }
  ],
  mistakes: [
    'Adding percent changes instead of multiplying multipliers. Up $10\\%$ then up $10\\%$ is $1.10 \\times 1.10 = 1.21$, a $21\\%$ rise — because the second rise is taken on the <em>already larger</em> amount.',
    'Using the new amount as the denominator in percent change. Always divide by the <strong>original</strong>: going from $40$ to $50$ is a $25\\%$ rise, not $20\\%$, because the change is measured against where you started.',
    'Multiplying when you should divide. If you are given the sale price and want the original, you must <strong>undo</strong> the multiplier: $\\$63$ after $30\\%$ off is $63 \\div 0.70 = \\$90$.',
    'Thinking a $20\\%$ fall undoes a $20\\%$ rise. $\\$100$ up $20\\%$ is $\\$120$; down $20\\%$ from there is $\\$96$. The two percentages are taken on different amounts.'
  ]
},
{
  id: 'posrational', strand: 'number', fig: 'fractionBars',
  title: 'Positive Rational Number Operations',
  big: 'Fractions, decimals and percents are three costumes for the same number. Choose whichever makes the arithmetic easiest.',
  discover: [
    '**Half a pizza is left on one tray, and a third of a pizza on another.** How much pizza is that?',
    'Two slices — but that is not an amount. A half and a third are different sizes.',
    { fig: 'discPosRational' },
    '"Two out of five" is wrong too: the five pieces are not equal, so counting them measures nothing.',
    'Cut both pizzas into **sixths** and the problem dissolves. The half is $3$ sixths, the third is $2$ sixths.',
    'Now the pieces *are* the same size, so counting works: $5$ sixths.',
    { punch: 'That is the whole reason for a **common denominator**. It is not a rule about fractions — it is the act of cutting both amounts into pieces of the same size so they can be counted together.' }
  ],
  funfact: [
    'Ancient Egyptians wrote almost every fraction as a sum of **unit fractions** — ones with a $1$ on top.',
    'So $\\tfrac{3}{4}$ was written $\\tfrac{1}{2} + \\tfrac{1}{4}$, and $\\tfrac{2}{7}$ as $\\tfrac{1}{4} + \\tfrac{1}{28}$.',
    'The Rhind Papyrus, from about 1650 BC, contains a table converting dozens of fractions into this form — presumably because sharing loaves in equal pieces was the practical problem.'
  ],
  vocab: [
    ['Rational number', 'Any number you can write as a fraction $\\dfrac{a}{b}$ with $b \\neq 0$.'],
    ['Reciprocal', 'The flip of a fraction. The reciprocal of $\\dfrac{3}{5}$ is $\\dfrac{5}{3}$.'],
    ['LCD', 'Least common denominator — the smallest number both denominators divide into.'],
    ['Terminating / repeating', 'Every fraction becomes a decimal that either stops or repeats forever.']
  ],
  sections: [
    { h: 'Adding and subtracting needs a common denominator',
      p: ['You can <em>only</em> add pieces that are the same size. Thirds and fourths are different sizes, so first rename both as twelfths.',
          '$\\dfrac{2}{3} + \\dfrac{1}{4} = \\dfrac{8}{12} + \\dfrac{3}{12} = \\dfrac{11}{12}$.',
          'To find the LCD, list multiples of the larger <strong>denominator</strong> until one is divisible by the other: $4, 8, 12$ — and $12$ works for $3$.'],
      box: { k: 'slow', h: 'A picture that helps', t: 'Imagine slicing a pizza into thirds and another into fourths. You cannot say how much pizza you have in one clean fraction until <em>both</em> pizzas are cut the same way — into twelfths.' } },
    { h: 'Multiplying is easier than adding',
      p: ['Multiplying fractions needs <strong>no</strong> common denominator. Just multiply across the top and across the bottom.',
          '$\\dfrac{2}{3} \\times \\dfrac{1}{4} = \\dfrac{2}{12} = \\dfrac{1}{6}$.',
          'Better: <strong>cancel before you multiply</strong>. $\\dfrac{2}{3} \\times \\dfrac{1}{4}$ — the $2$ and the $4$ share a factor of $2$, so it becomes $\\dfrac{1}{3} \\times \\dfrac{1}{2} = \\dfrac{1}{6}$. Smaller numbers, less to simplify later.'],
      box: { k: 'warn', h: 'Watch out', t: 'The rule "<strong>common denominator</strong>" belongs to $+$ and $-$ only. Students often drag it into multiplication, where it just makes extra work.' } },
    { h: 'Dividing: multiply by the reciprocal',
      p: ['$\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}$.',
          'Why? Because "how many $\\dfrac{1}{4}$s fit inside $\\dfrac{1}{2}$?" is asking <strong>how many small pieces make a big one</strong> — the answer $2$ is bigger than either number.',
          '<strong>Keep it, Change it, Flip it</strong>: keep the first fraction, change $\\div$ to $\\times$, flip the second.'] },
    { h: 'Fractions to decimals and back',
      p: ['To make a fraction a decimal, <strong>divide the top by the bottom</strong>: $\\dfrac{5}{8} = 5 \\div 8 = 0.625$.',
          'A fraction terminates exactly when its denominator (in lowest terms) has only $2$s and $5$s as prime factors. $\\dfrac{5}{8}$ terminates because $8 = 2^3$. $\\dfrac{1}{3}$ repeats because $3$ is <em>neither</em>.',
          'To make a <strong>terminating</strong> decimal a fraction, read it aloud: $0.625$ is "six hundred twenty-five thousandths" $= \\dfrac{625}{1000} = \\dfrac{5}{8}$.'] },
    { h: 'Order of operations still rules',
      p: ['Parentheses, then <strong>exponents</strong>, then multiply/divide left to right, then add/subtract left to right.',
          'Inside a complex fraction, the bar acts like <strong>a giant pair of parentheses</strong>: finish the whole top and the whole bottom before dividing.'] }
  ],
  examples: [
    { t: 'Mixed numbers', q: 'Compute $3\\dfrac{1}{2} - 1\\dfrac{3}{4}$.',
      steps: [
        { do: 'Turn both into improper fractions: $\\dfrac{7}{2}$ and $\\dfrac{7}{4}$', why: '$3\\dfrac{1}{2} = \\dfrac{3 \\times 2 + 1}{2} = \\dfrac{7}{2}$.' },
        { do: 'Common denominator $4$: $\\dfrac{14}{4} - \\dfrac{7}{4}$', why: 'Rename halves as quarters.' },
        { do: '$\\dfrac{14 - 7}{4} = \\dfrac{7}{4}$', why: 'Subtract the numerators; the denominator stays.' },
        { do: '$\\dfrac{7}{4} = 1\\dfrac{3}{4}$', why: '$7 \\div 4 = 1$ remainder $3$.' }
      ], ans: '$1\\dfrac{3}{4}$' },
    { t: 'Division that surprises people', q: 'How many $\\dfrac{3}{8}$-cup scoops are in $2\\dfrac{1}{4}$ cups?',
      steps: [
        { do: 'This is $2\\dfrac{1}{4} \\div \\dfrac{3}{8}$', why: '"How many fit inside" is division.' },
        { do: '$= \\dfrac{9}{4} \\div \\dfrac{3}{8} = \\dfrac{9}{4} \\times \\dfrac{8}{3}$', why: 'Keep, change, flip.' },
        { do: 'Cancel: $\\dfrac{9}{4} \\times \\dfrac{8}{3} = \\dfrac{3}{1} \\times \\dfrac{2}{1} = 6$', why: '$9$ and $3$ share $3$; $8$ and $4$ share $4$.' }
      ], ans: '$6$ scoops.' },
    { t: 'Mixing forms', q: 'Compute $\\dfrac{3}{4} + 0.35 + 20\\%$ as a decimal.',
      steps: [
        { do: 'Put everything in one costume — decimals.', why: 'Mixing forms invites mistakes.' },
        { do: '$\\dfrac{3}{4} = 0.75$, $20\\% = 0.20$', why: 'Divide $3$ by $4$; move the percent point two left.' },
        { do: '$0.75 + 0.35 + 0.20 = 1.30$', why: 'Line up the decimal points and add.' }
      ], ans: '$1.30$' }
  ],
  mistakes: [
    'Adding the denominators. $\\dfrac{1}{2} + \\dfrac{1}{3} \\neq \\dfrac{2}{5}$ — and a sense check proves it, since $\\tfrac{2}{5}$ is <em>smaller</em> than the half you started with. You add numerators only, after the denominators match.',
    'Finding a common denominator before multiplying. It is legal but pointless: $\\dfrac{2}{3} \\times \\dfrac{4}{5}$ is just $\\dfrac{8}{15}$. Multiplication needs no matching, and the extra step usually causes a slip.',
    'Flipping the wrong fraction when dividing. Only the <strong>second</strong> one flips, because dividing by $\\tfrac{1}{2}$ asks "how many halves fit in?" — which doubles the answer, not halves it.',
    'Leaving an improper fraction where the question wanted a mixed number, or the reverse. $\\tfrac{11}{4}$ and $2\\tfrac34$ are the same amount; read what form the question asked for.'
  ]
},
{
  id: 'negrational', strand: 'number', fig: 'numberLineHop',
  title: 'Positive & Negative Rational Number Operations',
  big: 'Negative numbers are directions, not just "less than nothing". Subtraction is adding the opposite, and sign rules come from patterns you can see.',
  discover: [
    '**At eight this morning it was 8 degrees. Now it is 2 degrees below zero.** How much has it dropped?',
    'You cannot say "$8$ minus $2$ is $6$." The thermometer went past zero, and below zero is real.',
    { fig: 'discNegRational' },
    'Count it on the scale instead. From $+8$ down to $0$ is **eight** degrees. From $0$ down to $-2$ is **two** more.',
    'Ten degrees altogether. Written down, that is $8 - (-2) = 10$.',
    'Subtracting a negative added. Not by decree — because going *down past zero* covers extra ground.',
    { punch: 'Every sign rule in this unit is that number line in disguise. When one is hard to remember, put it back on the thermometer and read it off.' }
  ],
  funfact: [
    'Negative numbers were used in China by about 200 BC, written with black counting rods for positive and **red rods for negative**.',
    'European mathematicians resisted them for another 1,500 years. As late as the 1700s some called them "absurd" or "fictitious" and refused to accept a negative answer.',
    'Modern accounting reversed the colours — being "in the red" now means negative.'
  ],
  vocab: [
    ['Opposite', 'Same distance from zero, other side. The opposite of $-7$ is $7$.'],
    ['Absolute value', '$|x|$ — distance from zero, always positive or zero.'],
    ['Additive inverse', 'The number you add to get $0$. $-7 + 7 = 0$.'],
    ['Integer', 'A whole number, positive, negative, or zero.']
  ],
  sections: [
    { h: 'The number line is the whole idea',
      p: ['Put positives to the right of zero and negatives to the left. Adding a positive walks right. <strong>Adding a negative walks left</strong>.',
          '$-3 + 5$: start at $-3$, walk $5$ <strong>to the right</strong>, land on $2$.',
          '$4 + (-9)$: start at $4$, walk $9$ <strong>left</strong>, land on $-5$.'] },
    { h: 'Subtraction is adding the opposite',
      p: ['This <strong>one rule replaces all the confusing cases</strong>: $a - b = a + (-b)$.',
          '$5 - 8 = 5 + (-8) = -3$. And $-2 - (-6) = -2 + 6 = 4$.',
          'Two minus signs next to each other turn into a plus, because the <strong>opposite</strong> of going left is going right.'],
      box: { k: 'key', h: 'Keep–Change–Change', t: 'Keep the first number. Change the $-$ to $+$. Change the sign of the second number. Now you <em>only</em> ever add.' } },
    { h: 'Why a negative times a negative is positive',
      p: ['<strong>Look at a pattern instead of memorizing</strong>:',
          '$3 \\times (-2) = -6$, $\;2 \\times (-2) = -4$, $\;1 \\times (-2) = -2$, $\;0 \\times (-2) = 0$.',
          'Each time the left factor drops by $1$, the answer rises by $2$. Keep going: $-1 \\times (-2)$ <em>must</em> be $2$, and $-2 \\times (-2)$ must be $4$. The pattern forces it.'],
      box: { k: 'key', h: 'Sign rules', t: 'Same signs &rarr; positive. Different signs &rarr; negative. This holds for both $\\times$ and $\\div$.' } },
    { h: 'Counting the negatives',
      p: ['In a long product, count how many negative factors there are. An <strong>even</strong> count gives a positive answer; an <strong>odd</strong> count gives a negative one.',
          '$(-1)(-2)(-3)(-4) = 24$ — <strong>four negatives, even, positive</strong>.',
          '$(-2)^5 = -32$ — <strong>five negatives, odd, negative</strong>.'] },
    { h: 'The trap: $-3^2$ versus $(-3)^2$',
      p: ['$(-3)^2 = (-3)(-3) = 9$. The parentheses say the negative is part of the <strong>base</strong>.',
          '$-3^2 = -(3^2) = -9$. Without parentheses, the <strong>exponent</strong> grabs only the $3$, and the minus sign waits outside.'] }
  ],
  examples: [
    { t: 'A chain of signs', q: 'Compute $-8 - (-3) + (-5)$.',
      steps: [
        { do: 'Rewrite every subtraction as addition.', why: 'Keep–Change–Change.' },
        { do: '$-8 + 3 + (-5)$', why: '$-(-3)$ became $+3$.' },
        { do: '$-8 + 3 = -5$', why: 'Start at $-8$, walk $3$ right.' },
        { do: '$-5 + (-5) = -10$', why: 'Walk another $5$ left.' }
      ], ans: '$-10$' },
    { t: 'Negatives with fractions', q: 'Compute $-\\dfrac{3}{4} \\div \\dfrac{2}{5}$.',
      steps: [
        { do: 'Handle the sign first: one negative, so the answer is negative.', why: 'Different signs give a negative.' },
        { do: 'Now the size: $\\dfrac{3}{4} \\times \\dfrac{5}{2} = \\dfrac{15}{8}$', why: 'Keep, change, flip.' },
        { do: 'Put the sign back: $-\\dfrac{15}{8}$', why: 'Or $-1\\dfrac{7}{8}$.' }
      ], ans: '$-\\dfrac{15}{8}$' },
    { t: 'Order of operations with signs', q: 'Compute $-2^2 + (-2)^3 - (-4)$.',
      steps: [
        { do: '$-2^2 = -(2 \\times 2) = -4$', why: 'No parentheses, so the exponent takes only the $2$.' },
        { do: '$(-2)^3 = -8$', why: 'Three negatives — odd count — so negative.' },
        { do: '$-(-4) = +4$', why: 'Subtracting a negative adds.' },
        { do: '$-4 + (-8) + 4 = -8$', why: 'Combine left to right.' }
      ], ans: '$-8$' }
  ],
  mistakes: [
    'Reading $-3^2$ as $9$. Without parentheses the exponent attaches only to the $3$, so it is $-(3^2) = -9$. You get $9$ only from $(-3)^2$, where the brackets make $-3$ the base.',
    'Treating "two negatives make a positive" as a rule about addition. It is a rule about <strong>multiplication</strong>. $-3 + (-5) = -8$: two debts make a bigger debt, not a credit.',
    'Losing the sign halfway through a long calculation. Decide the sign first, by counting the negative factors, then do the arithmetic with plain numbers. An even count is positive, an odd count negative.',
    'Ordering negatives by their size. $-0.8$ is <strong>less</strong> than $-0.75$, because it sits further left on the number line. The bigger the digits, the smaller the negative.'
  ]
},
{
  id: 'stats', strand: 'data', fig: 'samplingDots',
  title: 'Sampling, Inferences & Comparing Populations',
  big: 'You cannot measure everyone, so you measure some. A random sample lets a small group speak honestly for a large one.',
  discover: [
    '**A jar holds ten thousand beads. How many are orange?**',
    'Tipping them out and counting is not going to happen. So take one scoop.',
    { fig: 'discStats' },
    'The scoop holds $12$ beads and $4$ are orange — **one third**.',
    'If the beads were well mixed, the jar is probably about one third orange too. Roughly $3{,}300$.',
    'Take a second scoop and you will get a slightly different answer. That wobble is not a mistake; it is what sampling is.',
    { punch: 'The whole of statistics rests on that move: **measure a small part, say something careful about the whole.** The catch is the phrase "well mixed" — a scoop taken only from the top proves nothing about the bottom.' }
  ],
  funfact: [
    'In 1936 the *Literary Digest* polled 2.4 million Americans and confidently predicted Landon would beat Roosevelt. Roosevelt won 46 of 48 states.',
    'Their sample came from telephone directories and car registrations — in the Depression, that meant sampling the well-off.',
    '**George Gallup** predicted the right result the same year from just 50,000 people, because his sample was chosen to look like the country. A small fair sample beat a huge biased one.'
  ],
  vocab: [
    ['Population', 'Every member of the group you care about.'],
    ['Sample', 'The part of the population you actually measure.'],
    ['Random sample', 'Every member has an equal chance of being picked — the only kind you can trust.'],
    ['Mean / median', 'Two kinds of centre: the balance point, and the middle value.'],
    ['MAD', 'Mean absolute deviation — the average distance from the mean; a measure of spread.']
  ],
  sections: [
    { h: 'Why sampling works',
      p: ['If you want to know the average height of <em>every</em> 7th grader in the district, measuring all $900$ is impractical. Measure $60$ chosen at random to get an estimate; another random sample will give a somewhat different result.',
          'The key word is <strong>random</strong>. Surveying only the basketball team gives a great answer about basketball players and a terrible one about 7th graders.'],
      box: { k: 'warn', h: 'Biased samples', t: 'A sampling method can be biased when it systematically over-represents part of the <strong>population</strong> without accounting for that difference. Asking people outside a gym about exercise habits is biased. So is a survey only people with strong opinions bother to answer.' } },
    { h: 'Using a sample to estimate the whole',
      p: ['This is <strong>proportional</strong> reasoning again. If $18$ of $60$ sampled students walk to school, that is $\\dfrac{18}{60} = 0.30$, so about $30\\%$.',
          'Scale up: $0.30 \\times 900 = 270$ students <strong>in the whole district</strong>, approximately.',
          'Say "about". A <strong>sample</strong> gives an estimate, not a fact.'] },
    { h: 'Centre: mean and median',
      p: ['The <strong>mean</strong> is the total shared out equally: add everything, divide by how many.',
          'The <strong>median</strong> is the middle value once the data is in order. With an even count, average the two middle numbers.',
          'A single huge value drags the mean but barely moves the <strong>median</strong>. That is why house prices and incomes are usually reported as medians.'],
      box: { k: 'key', h: 'A useful identity', t: 'Sum $=$ <strong>mean</strong> $\\times$ count. Most "the average changes when one more score arrives" problems are solved by converting averages back into sums.' } },
    { h: 'Spread: why two groups can share a mean and be nothing alike',
      p: ['Group A: $50, 50, 50, 50$. Group B: $20, 40, 60, 80$. Both have mean $50$, but B is far more spread out.',
          '<strong>Mean absolute deviation</strong> measures this: find each value\'s distance from the mean, then average those distances. For B: distances are $30, 10, 10, 30$, so MAD $= 20$. For A, MAD $= 0$.'] },
    { h: 'Comparing two populations',
      p: ['To describe how separated two groups are, compare the difference in centres to the <strong>spread</strong>. This is a descriptive comparison, not a test of statistical significance.',
          'If two 7th grade classes have mean scores $82$ and $86$ but each has a MAD of $12$, the $4$-point gap is small next to the variation within each class.',
          'If the MADs were $1$, that same $4$-point gap would be large relative to the within-class variation. Generalising to populations also needs sample sizes and a suitable sampling design.'] }
  ],
  examples: [
    { t: 'Scaling up a sample', q: 'In a random sample of $80$ fish from a lake, $12$ are trout. The lake holds about $2{,}500$ fish. Estimate the number of trout.',
      steps: [
        { do: 'Sample proportion: $\\dfrac{12}{80} = 0.15$', why: '$15\\%$ of the sample were trout.' },
        { do: 'Assume the lake matches the sample.', why: 'This is what a random sample buys you.' },
        { do: '$0.15 \\times 2500 = 375$', why: 'Apply the proportion to the whole population.' }
      ], ans: 'About $375$ trout.' },
    { t: 'A missing score', q: 'Rosa\'s first four test scores average $84$. What must she score on the fifth test to average $86$?',
      steps: [
        { do: 'Turn averages into sums: $84 \\times 4 = 336$', why: 'Sum $=$ mean $\\times$ count.' },
        { do: 'The target total: $86 \\times 5 = 430$', why: 'Five tests averaging $86$.' },
        { do: '$430 - 336 = 94$', why: 'The fifth score must close the gap.' }
      ], ans: '$94$' },
    { t: 'Mean vs median', q: 'Six houses sell for $\\$210$k, $\\$225$k, $\\$230$k, $\\$240$k, $\\$250$k and $\\$1{,}800$k. Which centre describes the neighbourhood better?',
      steps: [
        { do: 'Median: average the 3rd and 4th values, $\\dfrac{230 + 240}{2} = 235$', why: 'Six values, so the middle is between two.' },
        { do: 'Mean: $\\dfrac{210+225+230+240+250+1800}{6} = 492.5$', why: 'The mansion pulls it hard.' },
        { do: 'No ordinary house costs near $\\$492$k.', why: 'The mean describes none of the actual homes.' }
      ], ans: 'The median, $\\$235$k, because one outlier distorts the mean.' }
  ],
  mistakes: [
    'Trusting a convenience sample. Asking outside a gym about exercise habits gives an answer about gym-goers, not about the town. <strong>Where you stand changes what you hear</strong>, and a bigger biased sample is not less biased.',
    'Forgetting to order the data before finding the median. The median is the middle of the <em>sorted</em> list; the middle of the list as written is just whichever value happened to be typed third.',
    'Claiming a difference is meaningful without looking at the spread. Two groups with medians $78$ and $74$ may overlap almost completely if both are spread wide. Compare centres <strong>and</strong> spreads.',
    'Treating a sample result as exact. A second scoop would give a slightly different number. Say "about a third," not "exactly $3{,}333$" — the false precision claims more than the data can support.'
  ]
},
{
  id: 'probsimple', strand: 'data', fig: 'spinner',
  title: 'Probability of Simple Events',
  big: 'Probability is a fraction: what you want over everything that could happen — as long as every outcome is equally likely.',
  discover: [
    '**A bag holds ten marbles: three orange, three red, four grey.** Reach in without looking.',
    'What are the chances of pulling out an orange one?',
    { fig: 'discProbSimple' },
    'Because you cannot see, **every marble is equally likely**. That is the sentence that makes the counting work.',
    'Three of the ten are orange, so the chance is $\\dfrac{3}{10}$ — a number between $0$ and $1$, as every probability must be.',
    'And the chance of *not* orange is the other seven: $\\dfrac{7}{10}$. Together they make $1$, because something must come out.',
    { punch: 'So simple probability is counting — but only when the outcomes are **equally likely**. The moment they are not, counting them gives the wrong answer, and that is where most mistakes come from.' }
  ],
  funfact: [
    'Probability began with a gambling dispute. In 1654 a French nobleman asked **Blaise Pascal** how to divide the stakes if a game were interrupted part-way.',
    'Pascal wrote to **Pierre de Fermat**, and their letters that summer invented the subject.',
    'It took another century before anyone thought to use it for anything but dice and cards — insurance, medicine and physics all came later.'
  ],
  vocab: [
    ['Outcome', 'One possible result of an experiment.'],
    ['Sample space', 'The set of all possible outcomes.'],
    ['Event', 'A collection of outcomes you care about, like "rolls an even number".'],
    ['Complement', 'Everything <em>except</em> the event. $P(\\text{not } A) = 1 - P(A)$.'],
    ['Theoretical vs experimental', 'What reasoning predicts vs what actually happened when you tried it.']
  ],
  sections: [
    { h: 'The basic formula',
      p: ['$P(\\text{event}) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}$',
          'Rolling a $6$-sided die, $P(\\text{even}) = \\dfrac{3}{6} = \\dfrac{1}{2}$, because $2$, $4$ and $6$ are even <strong>out of six faces</strong>.',
          'Every probability sits between $0$ and $1$. Zero <strong>means</strong> impossible, one means certain. If you ever get $\\dfrac{7}{5}$, you have made an error.'],
      box: { k: 'warn', h: 'The hidden condition', t: 'That fraction only works when every outcome is <strong>equally likely</strong>. A spinner with unequal wedges breaks it — then you must use area, not a count of regions.' } },
    { h: 'Listing the sample space',
      p: ['When you are unsure, write out every <strong>outcome</strong>. For two coins: HH, HT, TH, TT — four outcomes, not three.',
          'People often say "two heads, one of each, two tails — so $\\dfrac{1}{3}$ each". That is wrong, because "one of each" <strong>happens two ways</strong>. $P(\\text{one of each}) = \\dfrac{2}{4} = \\dfrac{1}{2}$.'] },
    { h: 'The complement shortcut',
      p: ['Sometimes counting what you <em>do not</em> want is far easier.',
          '$P(\\text{at least one head in 3 flips})$ has many cases. But the opposite — no heads at all — <strong>is a single case</strong>, TTT, with probability $\\dfrac{1}{8}$.',
          'So the answer is $1 - \\dfrac{1}{8} = \\dfrac{7}{8}$.'],
      box: { k: 'key', h: 'Watch for "at least"', t: 'The phrase "at least one" is almost always a signal to use the complement.' } },
    { h: 'Theoretical and experimental probability',
      p: ['<strong>Theoretical probability comes from reasoning</strong>: a fair coin gives $P(\\text{H}) = \\dfrac{1}{2}$.',
          '<strong>Experimental probability comes from trials</strong>: flip $50$ times, get $28$ heads, so $\\dfrac{28}{50} = 0.56$.',
          'They rarely match <em>exactly</em>, and they do not have to. The more trials you run, the closer experiment usually drifts toward theory — that is the law of large numbers.'] },
    { h: 'Odds versus probability',
      p: ['These are different. If $3$ of $10$ marbles are red, the <em>probability</em> of red is $\\dfrac{3}{10}$, but the <em>odds</em> in favour are $3$ to $7$ — favourable to unfavourable, not favourable to total.'] }
  ],
  examples: [
    { t: 'A bag of marbles', q: 'A bag holds $5$ red, $8$ blue and $7$ green marbles. One is drawn at random. Find $P(\\text{not blue})$.',
      steps: [
        { do: 'Total: $5 + 8 + 7 = 20$', why: 'Everything that could be drawn.' },
        { do: 'Not blue means red or green: $5 + 7 = 12$', why: 'Count the favourable outcomes directly...' },
        { do: '$\\dfrac{12}{20} = \\dfrac{3}{5}$', why: '...or use the complement: $1 - \\dfrac{8}{20} = \\dfrac{12}{20}$. Same answer.' }
      ], ans: '$\\dfrac{3}{5}$' },
    { t: 'Using probability backwards', q: 'A spinner has $12$ equal sections. $P(\\text{win}) = \\dfrac{1}{4}$. How many sections are winners?',
      steps: [
        { do: 'Set up: $\\dfrac{w}{12} = \\dfrac{1}{4}$', why: 'Winners over total equals the given probability.' },
        { do: 'Cross-multiply: $4w = 12$', why: 'Or notice $\\dfrac{1}{4}$ of $12$.' },
        { do: '$w = 3$', why: 'Three winning sections.' }
      ], ans: '$3$ sections.' },
    { t: 'At least one', q: 'A fair coin is flipped $4$ times. What is the probability of getting at least one tail?',
      steps: [
        { do: 'Opposite event: no tails at all — every flip is heads.', why: '"At least one" points to the complement.' },
        { do: '$P(\\text{HHHH}) = \\dfrac{1}{16}$', why: 'There are $2^4 = 16$ equally likely sequences.' },
        { do: '$1 - \\dfrac{1}{16} = \\dfrac{15}{16}$', why: 'Everything else has at least one tail.' }
      ], ans: '$\\dfrac{15}{16}$' }
  ],
  mistakes: [
    'Counting outcomes that are not equally likely. Flipping two coins, "one head and one tail" is <strong>two</strong> outcomes (HT and TH), not one — which is why it is twice as likely as two heads.',
    'Giving an answer above $1$ or below $0$. A probability is a share of the whole, so it cannot exceed $1$ or go negative. An answer outside that range means the count went wrong, not that the event is very likely.',
    'Confusing odds with probability. "$3$ to $7$ against" is the same situation as a probability of $\\tfrac{3}{10}$ — odds compare the two outcomes to each other, probability compares one to the total.',
    'Assuming the last result changes the next. A coin has no memory: after four heads, the next flip is still $\\tfrac12$. Believing otherwise is common enough to have a name, the gambler\'s fallacy.'
  ]
},
{
  id: 'probcompound', strand: 'data', fig: 'treeDiagram',
  title: 'Probability of Compound Events',
  big: 'Two or more things happening: multiply along a path, add across paths, and watch whether the first event changes the second.',
  discover: [
    '**Flip a coin, then spin a pointer that lands on red or blue.** How many different endings are there?',
    'Most people say three: heads, tails, and a colour. Draw it and you can see that is wrong.',
    { fig: 'discProbCompound' },
    'Each of the two flips splits into two spins. **Two branches, then two more on each** — four endings.',
    'H-red, H-blue, T-red, T-blue. And each is equally likely, so each has probability $\\tfrac14$.',
    'Notice where the $4$ came from: $2 \\times 2$. Not $2 + 2$, which also happens to be four and misleads everybody.',
    { punch: '"This **and** then that" multiplies. "This **or** that" adds. Draw the tree whenever you are unsure — it settles the question without any rule at all.' }
  ],
  funfact: [
    'The Chevalier de Méré made money betting he could roll at least one six in four throws of a die, and lost money betting on a double six in 24 throws of two dice.',
    'He thought the two bets were equivalent, and asked Pascal why they were not. The first wins about $51.8\\%$ of the time; the second about $49.1\\%$.',
    'That tiny gap between the two — and one gambler\'s willingness to ask about it — is where the mathematics of compound events began.'
  ],
  vocab: [
    ['Compound event', 'An event made of two or more simple events.'],
    ['Independent', 'The first event does not change the second — like rolling a die twice.'],
    ['Dependent', 'The first event changes the second — like drawing marbles without replacing them.'],
    ['Tree diagram', 'A branching picture of all the ways a sequence can unfold.'],
    ['Fundamental counting principle', 'If one stage has $m$ ways and the next has $n$, together they have $m \\times n$ ways.']
  ],
  sections: [
    { h: 'Counting first',
      p: ['Before probability, <strong>get good at counting</strong>. If a menu has $4$ mains and $3$ desserts, there are $4 \\times 3 = 12$ meals.',
          'Multiply the number of choices at each independent stage. This is the <strong>fundamental counting principle</strong>, and it is the engine behind almost every compound probability question.'] },
    { h: 'Multiply along a path',
      p: ['$P(A \\text{ and then } B) = P(A) \\times P(B \\text{ given } A)$.',
          'Roll two dice: $P(\\text{both } 6) = \\dfrac{1}{6} \\times \\dfrac{1}{6} = \\dfrac{1}{36}$. <strong>Dice do not remember</strong>, so the second probability is unchanged.'],
      box: { k: 'key', h: 'And multiplies, or adds', t: '"And" along a single path &rarr; multiply.<br>"Or" across separate paths &rarr; add.' } },
    { h: 'With replacement vs without',
      p: ['A bag has $4$ red and $6$ blue marbles.',
          '<strong>With replacement:</strong> $P(\\text{two reds}) = \\dfrac{4}{10} \\times \\dfrac{4}{10} = \\dfrac{4}{25}$. You put the first marble back, so nothing changed.',
          '<strong>Without replacement:</strong> $P(\\text{two reds}) = \\dfrac{4}{10} \\times \\dfrac{3}{9} = \\dfrac{2}{15}$. One red is gone, so both the top and the bottom drop by one.'],
      box: { k: 'warn', h: 'The single most common error', t: 'Forgetting to shrink the <strong>denominator</strong> on the second draw. If the problem says "without replacing", the total goes down too.' } },
    { h: 'Tree diagrams',
      p: ['Draw a branch for each option at each stage. Write the probability on each branch. <strong>Multiply along a branch</strong> to get that path\'s probability; add the paths that satisfy your event.',
          'Check yourself: all the final path probabilities <em>must</em> add to $1$.'] },
    { h: 'When order does not matter',
      p: ['"How many ways to choose $2$ students from $5$?" If <strong>order does not matter</strong>, pairs like (Ana, Ben) and (Ben, Ana) are the same team.',
          '<strong>Count the ordered ways</strong>, $5 \\times 4 = 20$, then divide by the $2$ orderings of each pair: $\\dfrac{20}{2} = 10$.',
          'That is written $\\binom{5}{2} = 10$ and read "5 choose 2". A round-robin tournament with $5$ teams has <em>exactly</em> $10$ games.'] }
  ],
  examples: [
    { t: 'Without replacement', q: 'A drawer has $5$ black socks and $3$ white socks. You pull two without looking. What is $P(\\text{both black})$?',
      steps: [
        { do: 'First sock: $\\dfrac{5}{8}$', why: 'Five black out of eight socks.' },
        { do: 'Second sock: $\\dfrac{4}{7}$', why: 'One black sock is gone — both numbers drop by one.' },
        { do: '$\\dfrac{5}{8} \\times \\dfrac{4}{7} = \\dfrac{20}{56} = \\dfrac{5}{14}$', why: 'Multiply along the path, then simplify.' }
      ], ans: '$\\dfrac{5}{14}$' },
    { t: 'Two paths, so add', q: 'Spinner A is red or blue, equally likely. Spinner B is red, blue or green, equally likely. What is $P(\\text{the colours match})$?',
      steps: [
        { do: 'Matching happens two ways: both red, or both blue.', why: 'Spinner A has no green, so green can never match.' },
        { do: 'Both red: $\\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{1}{6}$', why: 'Multiply along that path.' },
        { do: 'Both blue: $\\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{1}{6}$', why: 'Same for the other path.' },
        { do: '$\\dfrac{1}{6} + \\dfrac{1}{6} = \\dfrac{1}{3}$', why: 'Add across separate paths.' }
      ], ans: '$\\dfrac{1}{3}$' },
    { t: 'Counting handshakes', q: 'Eight people at a party each shake hands with every other person exactly once. How many handshakes?',
      steps: [
        { do: 'Each of the $8$ shakes $7$ hands: $8 \\times 7 = 56$', why: 'That counts ordered pairs.' },
        { do: 'But each handshake got counted twice.', why: 'Ana–Ben and Ben–Ana are the same handshake.' },
        { do: '$\\dfrac{56}{2} = 28$', why: 'This is $\\binom{8}{2}$.' }
      ], ans: '$28$ handshakes.' }
  ],
  mistakes: [
    'Using the same denominator twice in a "without replacement" problem. After the first marble is gone there are only nine left, so the second fraction has $9$ on the bottom, not $10$.',
    'Adding when you should multiply. "And" multiplies because each branch splits again; "or" adds because the branches are separate endings. Two coins give $2 \\times 2 = 4$ outcomes, not $2 + 2$.',
    'Forgetting to divide out repeats when order does not matter. Choosing two people from five is $10$ ways, not $20$ — picking Ana then Ben is the same pair as Ben then Ana.',
    'Multiplying probabilities for events that affect each other. Independence is what licenses the multiplication. Drawing two cards without replacing the first is <em>not</em> independent, and the second fraction must change.'
  ]
},
{
  id: 'proprel', strand: 'ratio', fig: 'proportionalLine',
  title: 'Proportional Relationships',
  big: 'A proportional relationship is $y = kx$: a straight line through the origin, with one constant ratio running through every pair.',
  discover: [
    '**A recipe feeds 3 people using 2 cups of flour.** You are cooking for 9.',
    'Nine is three times three, so you need three times the flour: $6$ cups.',
    { fig: 'discProprel' },
    'Look at what stayed fixed. $\\dfrac{2}{3}$, $\\dfrac{4}{6}$, $\\dfrac{6}{9}$ — all the same number, $\\tfrac23$ of a cup each.',
    'That unchanging ratio is the **constant of proportionality**, $k$. Here it is cups per person.',
    'And cooking for zero people needs zero flour — which is why the graph of this goes through the **origin**.',
    { punch: 'That is the test. A relationship is proportional when $\\dfrac{y}{x}$ is the same in every row, which happens exactly when the line passes through $(0, 0)$. A joining fee, a delivery charge or a head start breaks it.' }
  ],
  funfact: [
    'The Parthenon, a credit card and a sheet of A4 paper are all built on fixed ratios — but different ones.',
    'A4 is special: its sides are in the ratio $1 : \\sqrt{2}$, so folding it in half gives A5 with **exactly the same shape**. No other ratio does that.',
    'The system was proposed by the German scientist **Georg Lichtenberg** in 1786 and became a standard in 1922.'
  ],
  vocab: [
    ['Proportional', 'Two quantities with a constant ratio: $\\dfrac{y}{x} = k$ always.'],
    ['Constant of proportionality', '$k$ — the unit rate, the slope, and the value of $y$ when $x = 1$.'],
    ['Origin', 'The point $(0, 0)$, which every proportional graph passes through.'],
    ['Linear but not proportional', 'A straight line that misses the origin, like $y = 3x + 5$.']
  ],
  sections: [
    { h: 'The three signatures',
      p: ['A relationship is <strong>proportional</strong> if — and only if — all three of these hold, and any one of them implies the others:',
          '<strong>In a table:</strong> every $\\dfrac{y}{x}$ gives the same number.',
          '<strong>In a graph:</strong> it is a straight line <em>through the origin</em>.',
          '<strong>In an equation:</strong> it can be written $y = kx$, with nothing added on.'],
      box: { k: 'key', h: 'The origin test', t: 'Zero hours worked must mean zero dollars earned. If there is a flat fee, the line misses the origin and the relationship is linear but <strong>not</strong> proportional.' } },
    { h: 'Finding $k$ from a table',
      p: ['Divide $y$ by $x$ for each row. If you get the same value <em>every</em> time, that value is $k$.',
          'Hours $2, 5, 8$ and pay $\\$30, \\$75, \\$120$: $\\dfrac{30}{2} = 15$, $\\dfrac{75}{5} = 15$, $\\dfrac{120}{8} = 15$. So $k = 15$ and $y = 15x$.',
          'If even one row disagrees, it is <strong>not proportional</strong>.'] },
    { h: 'What $k$ means on the graph',
      p: ['$k$ is the slope: <strong>how far up the line climbs</strong> for each step right.',
          'It is also the $y$-value at $x = 1$. Find the point directly above $1$ on the graph and <strong>read its height</strong> — that is $k$.',
          'Steeper line <strong>means</strong> larger $k$ means a faster rate.'] },
    { h: 'Reading a proportional graph',
      p: ['<strong>Every point</strong> $(x, y)$ on the line means "$x$ of these go with $y$ of those".',
          'The point $(1, k)$ is the <strong>unit rate</strong>. The point $(0, 0)$ says nothing goes with nothing.',
          'When two proportional relationships are graphed together, <strong>the steeper one is the better rate</strong> — if you want more $y$ per $x$.'] },
    { h: 'Solving with proportions',
      p: ['Because the ratio is constant, you can <strong>set two ratios equal and cross-multiply</strong>.',
          'If $3$ notebooks cost $\\$4.50$, then $\\dfrac{4.50}{3} = \\dfrac{c}{7}$ for $7$ notebooks, so $3c = 31.50$ and $c = \\$10.50$.',
          'Keep the units in the same position on <em>both</em> sides — dollars on top both times, or the equation lies.'] }
  ],
  examples: [
    { t: 'Is it proportional?', q: 'A gym charges $\\$25$ to join plus $\\$15$ per month. Is total cost proportional to months?',
      steps: [
        { do: 'Write the rule: $y = 15x + 25$', why: 'A per-month rate plus a one-time fee.' },
        { do: 'Test the origin: at $x = 0$, $y = 25$, not $0$.', why: 'You pay $\\$25$ before any months pass.' },
        { do: 'Test the ratios: $\\dfrac{40}{1} = 40$ but $\\dfrac{55}{2} = 27.5$', why: 'Not constant.' }
      ], ans: 'Linear, but not proportional — the join fee breaks it.' },
    { t: 'Find $k$ and predict', q: 'A car uses $7$ gallons to drive $224$ miles. Write the equation and find the distance on $11$ gallons.',
      steps: [
        { do: '$k = \\dfrac{224}{7} = 32$', why: 'Miles per gallon — the unit rate.' },
        { do: 'Equation: $y = 32x$', why: '$y$ is miles, $x$ is gallons.' },
        { do: '$y = 32 \\times 11 = 352$', why: 'Substitute and multiply.' }
      ], ans: '$y = 32x$, and $352$ miles.' },
    { t: 'Comparing two rates', q: 'Printer A prints $y = 18x$ pages in $x$ minutes. Printer B prints $130$ pages in $10$ minutes. Which is faster, and by how much?',
      steps: [
        { do: 'A\'s rate is $k = 18$ pages per minute.', why: 'Read it straight from $y = kx$.' },
        { do: 'B\'s rate is $\\dfrac{130}{10} = 13$ pages per minute.', why: 'Convert B to a unit rate so the two are comparable.' },
        { do: '$18 - 13 = 5$', why: 'Compare the two constants directly.' }
      ], ans: 'Printer A, by $5$ pages per minute.' }
  ],
  mistakes: [
    'Calling any straight line proportional. It must pass through $(0,0)$. $y = 3x + 5$ is perfectly linear, but at $x = 0$ it gives $5$, so $\\dfrac{y}{x}$ is not constant and doubling $x$ does not double $y$.',
    'Computing $\\dfrac{x}{y}$ instead of $\\dfrac{y}{x}$. You get the reciprocal of $k$ — often a tidy-looking number that then gives wrong answers everywhere. Check it against a row: does $k$ times $x$ really give $y$?',
    'Setting up a proportion with the units crossed. Dollars over items on one side must face dollars over items on the other. Flipping one turns it into a different equation that still solves neatly.',
    'Assuming every doubling is proportional. Doubling the side of a square does not double its area — it quadruples it. Proportional means $y = kx$, and nothing else.'
  ]
},
{
  id: 'algrel', strand: 'algebra', fig: 'sequenceBlocks',
  title: 'Representing Other Algebraic Relationships',
  big: 'Not everything is proportional. Learn to read a pattern, name the rule, and write it as an expression you can trust.',
  discover: [
    '**Build a row of squares out of matchsticks.** One square takes 4 sticks.',
    'Two squares side by side take $7$, not $8$ — the second square **borrows** the stick it shares.',
    { fig: 'discAlgrel' },
    'Three squares take $10$. Four take $13$. Each new square costs **three** sticks, never four.',
    'So $100$ squares take $3 \\times 100$ sticks, plus the one extra at the very start: $301$.',
    'You did not have to build it. The rule $3n + 1$ built it for you.',
    { punch: 'That is what an algebraic expression is for. **The pattern is in the picture; the letter just writes it down** so it works for any $n$, including the ones nobody will ever draw.' }
  ],
  funfact: [
    'Using a letter for an unknown seems obvious now, but it took centuries. The Greeks did algebra with **line segments**, drawing lengths instead of writing symbols.',
    '**Diophantus** of Alexandria, around 250 AD, used a single abbreviation for the unknown — the first step towards a symbol.',
    'The full modern habit, where any letter can stand for any quantity, only settled in the 1600s with Viète and Descartes.'
  ],
  vocab: [
    ['Expression', 'A math phrase with no equals sign, like $3n + 5$.'],
    ['Term', 'A piece of an expression separated by $+$ or $-$.'],
    ['Coefficient', 'The number multiplying a variable — the $3$ in $3n$.'],
    ['Like terms', 'Terms with exactly the same variable part; only these can be combined.'],
    ['Arithmetic sequence', 'A list that grows by adding the same amount each time.']
  ],
  sections: [
    { h: 'From a pattern to a rule',
      p: ['Suppose a <strong>pattern of tiles</strong> goes $5, 8, 11, 14, \\dots$',
          'The <strong>step</strong> is $+3$ each time, so the rule contains $3n$. Now find the adjustment: at $n = 1$ we need $5$, and $3 \\times 1 = 3$, so we add $2$.',
          'The rule is $3n + 2$. Test it on another <strong>term</strong>: $n = 4$ gives $3(4) + 2 = 14$. &check;'],
      box: { k: 'key', h: 'The two-part recipe', t: 'For an arithmetic pattern: <strong>rule $=$ (step) $\\times n + $ (the value before the first step)</strong>. Find the step, then back up one term to find the constant.' } },
    { h: 'Why $3n + 2$ is not proportional',
      p: ['Check <strong>the origin</strong>: at $n = 0$ the rule gives $2$, not $0$. The graph is a straight line lifted two units up.',
          'The $+2$ is a starting amount that was there before any growth happened — <strong>a flat fee, a first tile, a head start</strong>.'] },
    { h: 'Combining like terms',
      p: ['$4x + 7 + 2x - 3$ becomes $6x + 4$. You may combine the $4x$ and $2x$ because <em>both</em> count $x$s. You may combine $7$ and $-3$ because both are plain numbers.',
          'You may <strong>not</strong> combine $6x$ and $4$ — they count different things. That is like adding $6$ apples to $4$ dollars.'],
      box: { k: 'slow', h: 'Circle before you combine', t: 'Circle each term <em>with the sign in front of it</em>. $4x + 7 + 2x - 3$ has terms $+4x$, $+7$, $+2x$, $-3$. Sorting them this way stops sign errors.' } },
    { h: 'The distributive property',
      p: ['$a(b + c) = ab + ac$. The <strong>multiplier</strong> reaches every term inside.',
          '$3(2x - 5) = 6x - 15$. Notice the $-5$ also gets multiplied; <strong>the sign travels with it</strong>.',
          'Backwards, this is <strong>factoring</strong>: $12x + 18 = 6(2x + 3)$.'] },
    { h: 'Other relationships worth knowing',
      p: ['<strong>Inverse:</strong> $xy = k$. Doubling $x$ halves $y$ — like workers and time to finish a job.',
          '<strong>Doubling growth:</strong> $y = 2^n$. Each step multiplies rather than adds. This grows shockingly fast: $2^{10} = 1024$.',
          '<strong>Custom operations:</strong> a problem may define its own symbol, like $a \\star b = 2a - b$. Just follow the definition exactly: $5 \\star 3 = 2(5) - 3 = 7$.'] }
  ],
  examples: [
    { t: 'Find the rule', q: 'A pattern of dots goes $7, 12, 17, 22, \\dots$ How many dots in the $50$th figure?',
      steps: [
        { do: 'Step: $12 - 7 = 5$', why: 'It grows by $5$ each time, so the rule holds $5n$.' },
        { do: 'At $n = 1$: $5(1) = 5$, but we need $7$, so add $2$.', why: 'Find the constant by fitting the first term.' },
        { do: 'Rule: $5n + 2$. Check $n = 3$: $17$ &check;', why: 'Always test on a term you did not use to build it.' },
        { do: '$5(50) + 2 = 252$', why: 'Substitute $n = 50$.' }
      ], ans: '$252$ dots.' },
    { t: 'Simplify carefully', q: 'Simplify $5(2x - 3) - 2(x + 4)$.',
      steps: [
        { do: 'Distribute the $5$: $10x - 15$', why: 'The $5$ hits both terms.' },
        { do: 'Distribute the $-2$: $-2x - 8$', why: 'The minus sign is part of what you distribute — that is the step people miss.' },
        { do: 'Combine: $10x - 2x = 8x$ and $-15 - 8 = -23$', why: 'Like terms with like terms.' }
      ], ans: '$8x - 23$' },
    { t: 'A custom operation', q: 'Define $a \\diamond b = a^2 - 2b$. Compute $4 \\diamond (3 \\diamond 1)$.',
      steps: [
        { do: 'Innermost first: $3 \\diamond 1 = 3^2 - 2(1) = 7$', why: 'Parentheses come first, same as always.' },
        { do: 'Now $4 \\diamond 7 = 4^2 - 2(7)$', why: 'Substitute the result back in.' },
        { do: '$= 16 - 14 = 2$', why: 'Follow the definition exactly.' }
      ], ans: '$2$' }
  ],
  mistakes: [
    'Forgetting to distribute to the second term. $3(x + 4)$ is $3x + 12$, because the bracket means three lots of <em>the whole thing</em> — and the whole thing includes the $4$.',
    'Dropping a negative when distributing. $-2(x + 4) = -2x - 8$, not $-2x + 8$: the $-2$ multiplies both terms, so the second sign changes too.',
    'Combining unlike terms. $5x + 3$ is not $8x$ — $x$ is an unknown quantity and $3$ is just three. You can only add terms whose variable parts are identical.',
    'Reading a pattern from two terms only. $2, 4, \\ldots$ could be $+2$ each time or doubling each time. Always test your rule on a <strong>third</strong> term before trusting it.'
  ]
},
{
  id: 'reasoning', strand: 'algebra', fig: 'balanceScale',
  title: 'Reasoning with Equations & Inequalities',
  big: 'Before you solve anything, translate. Most of the difficulty in a word problem is turning English into algebra.',
  discover: [
    '**"Five less than a number is twelve."** Write that as an equation.',
    'Reading it left to right gives $5 - x = 12$. That is the natural thing to do, and it is wrong.',
    { fig: 'discReasoning' },
    'Say it aloud instead. Five less **than** a number — you start with the number, and five is taken off it.',
    'So it is $x - 5 = 12$, and $x = 17$. Check: five less than $17$ is indeed $12$.',
    'The wrong version gives $x = -7$, which also solves its own equation perfectly. Nothing in the algebra warns you.',
    { punch: 'This is why translating is the hard part, not solving. **English word order and mathematical order are not the same**, and "less than", "subtract from" and "fewer than" all reverse it.' }
  ],
  funfact: [
    'Before symbols, all algebra looked like this. Problems were written as paragraphs and solved in prose — the style is called **rhetorical algebra**.',
    'A 9th-century problem might read: "a square and ten roots are equal to thirty-nine dirhams." That is $x^2 + 10x = 39$.',
    'Every equation you write is a translation out of a language mathematics spent a thousand years escaping.'
  ],
  vocab: [
    ['Variable', 'A letter standing for an unknown number.'],
    ['Equation', 'A statement that two expressions are equal.'],
    ['Inequality', 'A statement that one expression is less than or greater than another.'],
    ['Solution', 'A value that makes the statement true.']
  ],
  sections: [
    { h: 'Translate the words',
      p: ['Build the habit of writing what each letter <strong>means</strong> before anything else. "Let $b$ = the number of blue marbles." One sentence, and half the confusion disappears.',
          '<strong>Sum, more than, increased by</strong> &rarr; $+$<br><strong>Difference, less than, decreased by</strong> &rarr; $-$<br><strong>Of, product, times, each</strong> &rarr; $\\times$<br><strong>Per, quotient, shared equally</strong> &rarr; $\\div$<br><strong>Is, was, gives, results in</strong> &rarr; $=$'],
      box: { k: 'warn', h: '"Less than" flips the order', t: '"$5$ less than $x$" is $x - 5$, <strong>not</strong> $5 - x$. Read it as "take 5 away from x". The same flip happens with "subtracted from".' } },
    { h: 'Naming the unknown well',
      p: ['When two quantities are compared, name the <em>smaller or simpler</em> one $x$ and build the other from it.',
          '"Maria has $7$ more than twice as many as Jon." Let $j$ = Jon\'s amount; then Maria has $2j + 7$. <strong>Choosing Jon keeps the algebra clean</strong>.',
          'If instead you set $m$ = Maria\'s, you would be forced into $\\dfrac{m - 7}{2}$ for Jon — <strong>correct but messier</strong>.'] },
    { h: 'The balance-scale picture',
      p: ['An <strong>equation</strong> is a balanced scale. Whatever you do to one side, do to the other, or it tips.',
          'That is the entire justification for "subtract 3 from <em>both</em> sides". You are keeping the scale level while you clear away what you do not want.'] },
    { h: 'What inequalities mean',
      p: ['$x > 5$ does not name one number — it <strong>names all of them</strong> past $5$.',
          '$\\ge$ and $\\le$ include the endpoint; $>$ and $<$ do not. On a number line, <strong>a closed dot includes, an open dot excludes</strong>.',
          '<strong>Phrases to recognise</strong>: "at least" means $\\ge$, "at most" means $\\le$, "more than" means $>$, "no more than" means $\\le$.'] },
    { h: 'Does your answer make sense?',
      p: ['<em>Always</em> return to the story. If you find $x = -3$ chairs, or $2.4$ people, something went wrong — or the answer needs rounding in the direction the story requires.',
          'If $4.2$ buses are needed, you need $5$ buses. <strong>Rounding follows the situation</strong>, not the usual rule.'] }
  ],
  examples: [
    { t: 'Translate and solve', q: 'Three less than four times a number is $29$. Find the number.',
      steps: [
        { do: 'Let $n$ = the number.', why: 'Name it first, every time.' },
        { do: '"Four times a number" is $4n$.', why: 'Build the expression piece by piece.' },
        { do: '"Three less than" that is $4n - 3$.', why: 'Take 3 away from $4n$ — the order flips.' },
        { do: '$4n - 3 = 29 \\Rightarrow 4n = 32 \\Rightarrow n = 8$', why: 'Add $3$ to both sides, then divide by $4$.' }
      ], ans: '$n = 8$' },
    { t: 'Two related unknowns', q: 'A rope $84$ cm long is cut into two pieces, one three times as long as the other. Find both lengths.',
      steps: [
        { do: 'Let $s$ = the shorter piece.', why: 'Name the simpler quantity.' },
        { do: 'Longer piece $= 3s$.', why: 'Build the second from the first.' },
        { do: '$s + 3s = 84 \\Rightarrow 4s = 84$', why: 'The pieces together make the whole rope.' },
        { do: '$s = 21$, so $3s = 63$', why: 'Check: $21 + 63 = 84$ &check;' }
      ], ans: '$21$ cm and $63$ cm.' },
    { t: 'An inequality from a story', q: 'Devon has $\\$50$ and buys a $\\$12$ ticket. Snacks cost $\\$4$ each. How many can he buy?',
      steps: [
        { do: 'Let $s$ = number of snacks.', why: 'Name the unknown.' },
        { do: '$12 + 4s \\le 50$', why: 'Total spending can be at most $\\$50$.' },
        { do: '$4s \\le 38 \\Rightarrow s \\le 9.5$', why: 'Subtract $12$, then divide by $4$.' },
        { do: 'He cannot buy half a snack.', why: 'Round <em>down</em> — the story demands it.' }
      ], ans: 'At most $9$ snacks.' }
  ],
  mistakes: [
    'Writing "$5$ less than $x$" as $5 - x$. It is $x - 5$: the phrase says five is taken <em>off</em> $x$, so $x$ must come first. "Subtract from" reverses in the same way.',
    'Skipping the "let $x$ = …" step. Without it you can solve correctly and still not know what the answer <strong>means</strong> — was $x$ the number of adults, or the money they spent? Write it down before the first line.',
    'Rounding by the usual rule instead of by what the situation allows. If $9.4$ buses are needed, the answer is $10$ — you cannot send four tenths of a bus. Ask what the context permits.',
    'Answering with $x$ when the question wanted something else. Many problems define $x$ as one part and then ask for the total. Re-read the question after solving, every time.'
  ]
},
{
  id: 'equations', strand: 'algebra', fig: 'equationSteps',
  title: 'Solving Equations',
  big: 'Undo what was done, in reverse order, doing the same thing to both sides every time.',
  discover: [
    '**Think of a number. Multiply it by 3. Add 4. Tell me the answer — 19.**',
    'I can now tell you the number you started with, and I never saw it.',
    { fig: 'discEquations' },
    'Work the chain **backwards**. The last thing done was add $4$, so undo it first: $19 - 4 = 15$.',
    'Before that it was multiplied by $3$, so undo that next: $15 \\div 3 = 5$. Your number was $5$.',
    'Notice the order. Forwards it was $\\times 3$ then $+4$; backwards it is $-4$ then $\\div 3$ — **reversed, not repeated**.',
    { punch: 'Written as algebra that chain is $3x + 4 = 19$, and solving it is exactly the unwinding you just did. The equation is a record of what was done; solving is doing it in reverse.' }
  ],
  funfact: [
    '"Think of a number" puzzles are ancient. The **Rhind Papyrus** from about 1650 BC contains one: a quantity and its seventh, added together, make 19.',
    'The Egyptian scribe solved it by guessing $7$, seeing that it gave $8$ instead of $19$, and then scaling the guess. The method is called **false position**.',
    'It works, it is clever, and it is exactly what algebra was invented to replace.'
  ],
  vocab: [
    ['Inverse operation', 'The operation that undoes another: $+$ undoes $-$, $\\times$ undoes $\\div$.'],
    ['Isolate', 'Get the variable alone on one side.'],
    ['Two-step equation', 'One needing two inverse operations, like $3x + 5 = 20$.'],
    ['Variables on both sides', 'An equation like $5x - 2 = 3x + 8$.']
  ],
  sections: [
    { h: 'Reverse the order of operations',
      p: ['To build $3x + 5$ from $x$, you multiply by $3$, <em>then</em> add $5$. To take it apart, go backwards: subtract $5$ first, then divide by $3$.',
          '$3x + 5 = 20 \\Rightarrow 3x = 15 \\Rightarrow x = 5$.',
          'Undoing in the wrong order still sometimes works, but it usually <strong>creates fractions you did not need</strong>.'],
      box: { k: 'key', h: 'The order to undo', t: 'Clear $+$ and $-$ first. Then clear $\\times$ and $\\div$. The opposite of PEMDAS.' } },
    { h: 'Variables on both sides',
      p: ['<strong>Collect the variable terms on one side</strong> and the numbers on the other.',
          '$5x - 2 = 3x + 8$. Subtract $3x$ from <em>both</em> sides: $2x - 2 = 8$. Add $2$: $2x = 10$. Divide: $x = 5$.',
          'A small tip: move the variable to whichever side <strong>keeps the coefficient positive</strong>. It prevents sign errors.'] },
    { h: 'Equations with parentheses and fractions',
      p: ['<strong>Distribute</strong> first: $2(x + 3) = 14$ becomes $2x + 6 = 14$, so $x = 4$.',
          'Fractions: multiply every term by the <strong>common denominator</strong> to clear them. $\\dfrac{x}{3} + \\dfrac{1}{2} = 2$ times $6$ gives $2x + 3 = 12$, so $x = 4.5$.',
          'Multiply <strong>every</strong> term, including the ones without fractions.'],
      box: { k: 'slow', h: 'One line, one change', t: 'Write each step on its own line and change <em>only</em> one thing per line. It is slower on the page and much faster overall, because you can find your mistake instead of starting over.' } },
    { h: 'Always check',
      p: ['Substitute your answer back into the <em>original</em> equation. Not into a line you wrote — into the original, in case you made an error early.',
          '$x = 5$ in $5x - 2 = 3x + 8$: left side $= 23$, right side $= 23$. &check;'] },
    { h: 'No solution, or every solution',
      p: ['Sometimes the variable vanishes. $2x + 3 = 2x + 7$ becomes $3 = 7$ — false, so there is <strong>no solution</strong>.',
          '$2x + 6 = 2(x + 3)$ becomes $6 = 6$ — always true, so <strong>every</strong> number works.',
          'These are not mistakes. <strong>They are real answers</strong>.'] }
  ],
  examples: [
    { t: 'Variables both sides', q: 'Solve $7x - 4 = 2x + 21$.',
      steps: [
        { do: 'Subtract $2x$ from both sides: $5x - 4 = 21$', why: 'Gather the variables on the left, where the coefficient is bigger.' },
        { do: 'Add $4$ to both sides: $5x = 25$', why: 'Clear the constant.' },
        { do: 'Divide by $5$: $x = 5$', why: 'Undo the multiplication.' },
        { do: 'Check: $7(5) - 4 = 31$ and $2(5) + 21 = 31$ &check;', why: 'Both sides agree, so it is right.' }
      ], ans: '$x = 5$' },
    { t: 'Clear the fractions', q: 'Solve $\\dfrac{2x}{3} - 1 = \\dfrac{x}{2} + 4$.',
      steps: [
        { do: 'Common denominator of $3$ and $2$ is $6$.', why: 'Multiply everything by $6$ to clear fractions.' },
        { do: '$4x - 6 = 3x + 24$', why: '$6 \\cdot \\dfrac{2x}{3} = 4x$, $6 \\cdot 1 = 6$, $6 \\cdot \\dfrac{x}{2} = 3x$, $6 \\cdot 4 = 24$.' },
        { do: 'Subtract $3x$: $x - 6 = 24$', why: 'Variables to one side.' },
        { do: 'Add $6$: $x = 30$', why: 'Check in the original: $\\dfrac{60}{3} - 1 = 19$ and $\\dfrac{30}{2} + 4 = 19$ &check;' }
      ], ans: '$x = 30$' },
    { t: 'A word problem end to end', q: 'A taxi charges $\\$3.50$ plus $\\$2.25$ per mile. A ride cost $\\$23.75$. How many miles?',
      steps: [
        { do: 'Let $m$ = miles.', why: 'Name the unknown.' },
        { do: '$3.50 + 2.25m = 23.75$', why: 'Flat fee plus per-mile charge equals the total.' },
        { do: '$2.25m = 20.25$', why: 'Subtract the flat fee from both sides.' },
        { do: '$m = 20.25 \\div 2.25 = 9$', why: 'Divide by the rate.' }
      ], ans: '$9$ miles.' }
  ],
  mistakes: [
    'Doing something to one side only. The equals sign is a promise that both sides are the same amount; change one and the promise breaks, so every line after it is about a different problem.',
    'Multiplying only some terms when clearing fractions. Multiplying by $12$ must hit <strong>every</strong> term, including whole numbers that were never fractions. Miss one and the equation quietly changes.',
    'Checking against a rewritten line instead of the original. If you made an error on line two, checking against line three will happily confirm it. Always substitute back into the equation you were given.',
    'Undoing the operations in the original order. If the chain was $\\times 3$ then $+4$, the undo is $-4$ then $\\div 3$. Reversing the order is the whole point, and doing them forwards gives a wrong answer that looks tidy.'
  ]
},
{
  id: 'inequalities', strand: 'algebra', fig: 'inequalityLine',
  title: 'Solving Inequalities',
  big: 'Solve them exactly like equations — with one extra rule that catches almost everyone.',
  discover: [
    '**A lift is rated for 600 kg.** Six people get in, averaging 72 kg each.',
    'That is $432$ kg, so the lift is fine. But notice what the sign did *not* say.',
    { fig: 'discInequalities' },
    'It did not say the lift weighs $600$ kg. It said **$600$ is a line you must not cross**.',
    'Any load from $0$ up to $600$ is allowed — a whole range, not one number. In symbols, $w \\leq 600$.',
    'So the answer to "how much more can it take?" is also a range: anything up to $168$ kg more.',
    { punch: 'That is the difference from an equation. An equation pins down a point; **an inequality fences off a region**. And one rule is new: multiply or divide by a negative and the fence flips sides.' }
  ],
  funfact: [
    'Lift weight limits are set with a large safety margin — the cables in a modern passenger lift are typically rated for many times the stated load.',
    'The reason anyone trusts a lift at all is a piece of theatre: in 1854 **Elisha Otis** stood on a raised platform at the New York World\'s Fair and had the rope cut.',
    'His safety brake caught it. He sold lifts afterwards, and the word "elevator" entered ordinary use.'
  ],
  vocab: [
    ['Inequality symbols', '$<$ less than, $>$ greater than, $\\leq$ at most, $\\geq$ at least.'],
    ['Solution set', 'All the values that make the inequality true — usually infinitely many.'],
    ['Open / closed dot', 'Open excludes the endpoint ($<$, $>$); closed includes it ($\\leq$, $\\geq$).'],
    ['Compound inequality', 'Two conditions at once, like $3 < x \\leq 9$.']
  ],
  sections: [
    { h: 'Same moves as equations',
      p: ['Add, subtract, multiply, divide — all the familiar steps still work, and you still do them to <em>both</em> sides.',
          '$3x + 4 < 19 \\Rightarrow 3x < 15 \\Rightarrow x < 5$. Identical to solving $3x + 4 = 19$, except the answer is a whole <strong>range</strong>.'] },
    { h: 'The one extra rule',
      p: ['When you multiply or divide both sides by a <strong>negative</strong> number, the inequality sign flips.',
          'Here is why, with real numbers. Start with a true statement: $4 < 10$. Multiply both sides by $-1$: you get $-4$ and $-10$. But $-4$ is <em>greater</em> than $-10$ — on the number line, $-4$ sits to the right. So the correct statement is $-4 > -10$. The sign had to turn around.',
          'Multiplying by a negative reflects the number line, and <strong>reflection</strong> reverses order.'],
      box: { k: 'warn', h: 'Flip only for negative $\\times$ or $\\div$', t: 'Adding or subtracting a negative does <strong>not</strong> flip the sign. Only multiplying or dividing <em>by</em> a negative does. $x - 5 > 2$ stays $>$; $-2x > 8$ becomes $x < -4$.' } },
    { h: 'Graphing on a number line',
      p: ['Draw the boundary point. Use an <strong>open</strong> circle for $<$ or $>$, a closed circle for $\\leq$ or $\\geq$.',
          'Shade the side that contains the solutions. <strong>Test a point if you are unsure</strong>: for $x < 5$, try $x = 0$ — it works, so shade the side containing $0$.'] },
    { h: 'Compound inequalities',
      p: ['$3 < x \\leq 9$ <strong>means</strong> $x$ is both greater than $3$ and at most $9$. Graph it as a segment with an open left end and a closed right end.',
          'Solve them by <strong>doing the same step to all three parts</strong>: $2 < x + 5 \\leq 11$ becomes $-3 < x \\leq 6$ by subtracting $5$ everywhere.'] },
    { h: 'Inequalities in stories',
      p: ['"At least", "minimum", "<strong>no fewer than</strong>" &rarr; $\\geq$.<br>"At most", "maximum", "no more than", "up to" &rarr; $\\leq$.',
          'Then <strong>apply common sense to the answer</strong>. If $x \\leq 7.3$ counts tickets, the real answer is $7$.'] }
  ],
  examples: [
    { t: 'The flip in action', q: 'Solve $-4x + 3 \\geq 19$ and graph the solution.',
      steps: [
        { do: 'Subtract $3$: $-4x \\geq 16$', why: 'Subtracting does not flip anything.' },
        { do: 'Divide by $-4$ and FLIP: $x \\leq -4$', why: 'Dividing by a negative reverses the inequality.' },
        { do: 'Check with $x = -5$: $-4(-5) + 3 = 23 \\geq 19$ &check;', why: 'A value in the range must work.' },
        { do: 'Graph: closed dot at $-4$, shade left.', why: '$\\leq$ includes the endpoint.' }
      ], ans: '$x \\leq -4$' },
    { t: 'A budget', q: 'Ava has $\\$85$. She buys a $\\$28$ jacket and wants T-shirts at $\\$14$ each. How many can she buy?',
      steps: [
        { do: 'Let $t$ = T-shirts. Write $28 + 14t \\leq 85$', why: 'She cannot spend more than she has.' },
        { do: '$14t \\leq 57$', why: 'Subtract $28$ from both sides.' },
        { do: '$t \\leq 4.07\\ldots$', why: 'Divide by $14$ — positive, so no flip.' },
        { do: 'Round down to $4$.', why: 'She cannot buy part of a shirt.' }
      ], ans: 'At most $4$ T-shirts.' },
    { t: 'Compound inequality', q: 'Solve $-7 \\leq 2x - 1 < 9$.',
      steps: [
        { do: 'Add $1$ to all three parts: $-6 \\leq 2x < 10$', why: 'Whatever you do, do it everywhere.' },
        { do: 'Divide all three by $2$: $-3 \\leq x < 5$', why: 'Positive divisor, so nothing flips.' },
        { do: 'Graph: closed at $-3$, open at $5$, shade between.', why: 'The symbols tell you which ends are included.' }
      ], ans: '$-3 \\leq x < 5$' }
  ],
  mistakes: [
    'Forgetting to flip when dividing by a negative — the single most common error in this unit. $-2x > 8$ becomes $x < -4$, because negating reverses the order of the number line: $3 < 5$ is true, $-3 < -5$ is false.',
    'Flipping when you only added or subtracted a negative. Adding never changes the direction, however many minus signs appear. Only multiplying or <strong>dividing</strong> by a negative does.',
    'Using an open circle where the endpoint counts. $\\leq$ includes the boundary and gets a filled circle; $<$ excludes it and gets a hollow one. That tiny hole is the whole difference between the two.',
    'Rounding the wrong way in a word problem. $r \\leq 9.5$ rides means $9$ rides, not $10$ — round towards what the situation allows, not by the usual rule.'
  ]
},
{
  id: 'scale', strand: 'ratio', fig: 'scaleFigure',
  title: 'Proportional Reasoning with Scale Drawings',
  big: 'Scaling changes every length by the same factor $k$ — which multiplies area by $k^2$ and volume by $k^3$.',
  discover: [
    '**A road on a map measures 12 cm. The scale bar says 3 cm = 5 km.** How long is the road?',
    'The map is small and the road is not. One number connects them.',
    { fig: 'discScale' },
    'Twelve centimetres is **four lots** of three. So the road is four lots of five kilometres: $20$ km.',
    'Everything on the map shrank by the same factor, which is why one scale works for every road on it.',
    'But be careful with what is *inside* those shapes. A park $2$ cm by $3$ cm on the map is not $2$ km by $3$ km of park.',
    { punch: 'Lengths scale by $k$. **Areas scale by $k^2$** — because an area is a length times a length, and both of them scaled. For volumes it is $k^3$, for the same reason.' }
  ],
  funfact: [
    'Every flat map of the round Earth distorts something. The **Mercator** projection keeps directions true, which is why sailors loved it.',
    'The price is area: on a Mercator map Greenland looks about the size of Africa. Africa is roughly **fourteen times larger**.',
    'There is no projection that gets shape, area and direction all right at once — it is a theorem, not a lack of effort.'
  ],
  vocab: [
    ['Scale factor', 'The number every length is multiplied by.'],
    ['Scale drawing', 'A picture in proportion to the real thing, at a stated scale like $1 : 50$.'],
    ['Similar figures', 'Same shape, different size: equal angles, proportional sides.'],
    ['Corresponding sides', 'Sides in matching positions in two similar figures.']
  ],
  sections: [
    { h: 'What a scale says',
      p: ['A scale of $1 : 50$ <strong>means</strong> one unit on the drawing stands for $50$ of the same units in reality.',
          'A $6$ cm line on the drawing is $6 \\times 50 = 300$ cm — that is $3$ metres — <strong>in real life</strong>.',
          '<strong>Going the other way, divide</strong>: a real length of $12$ m is $1200$ cm, so on the drawing it measures $1200 \\div 50 = 24$ cm.'] },
    { h: 'Similar figures',
      p: ['Two figures are <strong>similar</strong> if their angles match and their sides are all in the same ratio.',
          'Find the scale factor from one pair of <strong>corresponding sides</strong>, then use it on all the others. If one triangle has a side of $6$ matching a side of $15$, then $k = \\dfrac{15}{6} = 2.5$ and every other side scales by $2.5$.'],
      box: { k: 'slow', h: 'Match them up first', t: 'Before calculating, list the sides in matching order — shortest with shortest, longest with longest. Most errors here come from pairing the wrong sides, not from the arithmetic.' } },
    { h: 'The big idea: area does not scale the same way',
      p: ['Double every length and the area does <strong>not</strong> double — it quadruples.',
          'A $3 \\times 4$ rectangle has <strong>area</strong> $12$. Scale by $2$ to get $6 \\times 8$, area $48$. That is $4$ times, because both the length and the width grew: $2 \\times 2 = 4$.',
          'Same idea in three dimensions: <strong>volume</strong> multiplies by $k^3$. Doubling a cube\'s edge makes it hold $8$ times as much.'],
      box: { k: 'key', h: 'The $k$, $k^2$, $k^3$ rule', t: '<strong>Scale factor</strong> $k$ multiplies:<br>lengths by $k$ &nbsp;·&nbsp; areas by $k^2$ &nbsp;·&nbsp; volumes by $k^3$.<br>This is true for every shape, not just rectangles.' } },
    { h: 'Indirect measurement',
      p: ['You can measure a tree <strong>without climbing it</strong>. At the same moment, a $5$ ft person casts a $4$ ft shadow and the tree casts a $32$ ft shadow.',
          '<strong>The sun\'s rays</strong> make similar triangles, so $\\dfrac{5}{4} = \\dfrac{h}{32}$, giving $h = 40$ ft.'] },
    { h: 'Reading maps',
      p: ['A map scale of $1$ cm $:$ $2.5$ km <strong>works the same way</strong>. Measure in cm, multiply by $2.5$ for km.',
          'Keep the units straight. <strong>Convert before you multiply</strong>, not after, or the numbers will not mean anything.'] }
  ],
  examples: [
    { t: 'Reading a floor plan', q: 'On a plan at scale $1 : 40$, a room measures $8.5$ cm by $6$ cm. Find the real dimensions and real area.',
      steps: [
        { do: 'Lengths: $8.5 \\times 40 = 340$ cm and $6 \\times 40 = 240$ cm', why: 'Multiply each length by the scale factor.' },
        { do: 'In metres: $3.4$ m by $2.4$ m', why: 'Divide centimetres by $100$.' },
        { do: 'Real area: $3.4 \\times 2.4 = 8.16$ m$^2$', why: 'Compute the area from the real lengths.' },
        { do: 'Check with the rule: drawing area $= 51$ cm$^2$, times $40^2 = 1600$, gives $81600$ cm$^2$ $= 8.16$ m$^2$ &check;', why: 'Area scales by $k^2$, which confirms the answer.' }
      ], ans: '$3.4$ m $\\times$ $2.4$ m, area $8.16$ m$^2$.' },
    { t: 'Similar triangles', q: 'Triangle $ABC$ has sides $6$, $8$, $10$. Similar triangle $DEF$ has its shortest side $= 9$. Find the perimeter of $DEF$.',
      steps: [
        { do: 'Scale factor: $k = \\dfrac{9}{6} = 1.5$', why: 'Shortest side to shortest side.' },
        { do: 'Other sides: $8 \\times 1.5 = 12$ and $10 \\times 1.5 = 15$', why: 'Every length scales by the same $k$.' },
        { do: 'Perimeter $= 9 + 12 + 15 = 36$', why: 'Or scale the original perimeter: $24 \\times 1.5 = 36$ &check;' }
      ], ans: '$36$' },
    { t: 'Scaling area and volume', q: 'A model car is $\\dfrac{1}{12}$ the size of the real one. The real car\'s hood has area $3.6$ m$^2$ and the car holds $60$ L of air. Find the model\'s values.',
      steps: [
        { do: 'Scale factor $k = \\dfrac{1}{12}$', why: 'Every length shrinks by $12$.' },
        { do: 'Area scales by $k^2 = \\dfrac{1}{144}$: $3.6 \\div 144 = 0.025$ m$^2$', why: 'Two dimensions shrink at once.' },
        { do: 'Volume scales by $k^3 = \\dfrac{1}{1728}$: $60 \\div 1728 \\approx 0.035$ L', why: 'Three dimensions shrink at once.' }
      ], ans: 'Area $0.025$ m$^2$; volume about $0.035$ L.' }
  ],
  mistakes: [
    'Multiplying area by $k$ instead of $k^2$ — the classic scale-drawing error. Double every length and you get <strong>four</strong> times the area, because the length and the width both doubled.',
    'Pairing the wrong corresponding sides. In similar figures the sides must be matched by position, not by which looks longest on the page. Mark the equal angles first, then pair the sides between them.',
    'Mixing units. A scale of $1$ cm $= 2$ m means you must measure in centimetres and answer in metres. Multiplying centimetres by a factor meant for metres is out by a hundred.',
    'Assuming the scale factor runs the direction you want. Going map-to-real multiplies; real-to-map divides. Ask which one should be bigger and check your answer against it.'
  ]
},
{
  id: 'area2d', strand: 'geometry', fig: 'areaDecompose',
  title: 'Length and Area in 2-D Figures',
  big: 'Every area formula is a rectangle in disguise. Know where each one comes from and you will never mix them up.',
  discover: [
    '**You need carpet for an L-shaped room.** There is no formula for an L.',
    'But there is a formula for a rectangle, and an L is two rectangles that happen to be joined.',
    { fig: 'discArea2d' },
    'Cut along the dashed line. The top piece is $5 \\times 2$, the bottom is $7 \\times 2$ — add them and you have the floor.',
    'Cut the other way instead and you get two different rectangles, and **the same total**. Both cuts are right.',
    'You could also take the big enclosing rectangle and **subtract** the missing corner. Also right.',
    { punch: 'That is the whole method for awkward shapes: **cut into pieces you have formulas for, or subtract what is not there.** The shape is not the problem; finding a single formula for it was.' }
  ],
  funfact: [
    'The word **area** is Latin for a level piece of open ground — a threshing floor. It meant a real patch of earth long before it meant a number.',
    'Egyptian surveyors were called *harpedonaptai*, "rope-stretchers," and re-measured farmland after every Nile flood so taxes could be set fairly.',
    'Geometry itself is Greek for "earth measurement." The subject is named after that job.'
  ],
  vocab: [
    ['Perimeter', 'Distance all the way around the outside.'],
    ['Area', 'Space inside, measured in square units.'],
    ['Circumference', 'The perimeter of a circle: $C = 2\\pi r$.'],
    ['Composite figure', 'A shape built from simpler ones.'],
    ['$\\pi$', 'The circumference of any circle divided by its diameter — about $3.14159$.']
  ],
  sections: [
    { h: 'Where the formulas come from',
      p: ['<strong>Rectangle:</strong> $A = bh$. Rows of unit squares — $h$ rows of $b$ squares each.',
          '<strong>Parallelogram:</strong> $A = bh$ too. Cut a right triangle off one end and slide it to the other; you have made a rectangle. Nothing was added or lost.',
          '<strong>Triangle:</strong> $A = \\dfrac{1}{2}bh$. Any triangle is exactly half of a parallelogram — copy it, rotate the copy $180°$, and the two fit together.',
          '<strong>Trapezoid:</strong> $A = \\dfrac{1}{2}(b_1 + b_2)h$. Two copies make a parallelogram with base $b_1 + b_2$.'],
      box: { k: 'warn', h: 'Height means perpendicular height', t: 'The $h$ in every formula is the straight-up distance between the two bases, <strong>not</strong> the slanted side. On a tilted parallelogram, the slanted side is longer and will give you an answer that is too big.' } },
    { h: 'Circles',
      p: ['$C = 2\\pi r = \\pi d$ and $A = \\pi r^2$.',
          'Keep them apart by their units. <strong>Circumference</strong> is a length, so it uses $r$ to the first power. Area is a square measure, so it uses $r^2$.',
          'Why $A = \\pi r^2$: <strong>slice the circle into thin wedges</strong> and alternate them point-up and point-down. They interlock into something very close to a rectangle of height $r$ and width $\\dfrac{C}{2} = \\pi r$. So $A = \\pi r \\cdot r$.'] },
    { h: 'Composite figures: add or subtract', fig: 'compositeCutouts',
      p: ['Break the shape into rectangles, triangles, and parts of circles. Find each <strong>area</strong>, then combine.',
          '<strong>Often subtraction is faster</strong>. A circle cut out of a square: find the square, find the circle, subtract. A shaded border: find the outer shape and take away the inner one.'],
      box: { k: 'slow', h: 'Draw the cut lines', t: 'Physically draw lines on the figure to split it up, and label <em>every</em> piece with its own dimensions before computing anything. Doing all the drawing first, then all the arithmetic, is much more reliable than alternating.' } },
    { h: 'Perimeter of composite shapes',
      p: ['Perimeter follows the <em>outside edge only</em>. When you cut a shape into pieces, the cut lines are not part of the perimeter.',
          'For a shape with a semicircular top, the curved part contributes $\\dfrac{1}{2} \\cdot 2\\pi r = \\pi r$, and the straight edge it replaced <strong>is no longer on the boundary</strong>.'] },
    { h: 'Same perimeter, different area', fig: 'samePerimeterRects',
      p: ['A $1 \\times 11$ rectangle and a $6 \\times 6$ square both have <strong>perimeter</strong> $24$, but their areas are $11$ and $36$.',
          'For a fixed perimeter, the closer to a square, the larger the area. <strong>Perimeter does not determine area</strong>.'] }
  ],
  examples: [
    { t: 'Composite by subtraction', q: 'A square of side $10$ cm has a circle of diameter $10$ cm cut out of it. Find the remaining area. Use $\\pi \\approx 3.14$.',
      steps: [
        { do: 'Square: $10 \\times 10 = 100$ cm$^2$', why: 'The whole shape before cutting.' },
        { do: 'Circle radius $= 5$ cm', why: 'Radius is half the diameter — do not use $10$ here.' },
        { do: 'Circle: $\\pi (5)^2 = 25\\pi \\approx 78.5$ cm$^2$', why: 'Square the radius, then multiply by $\\pi$.' },
        { do: '$100 - 78.5 = 21.5$ cm$^2$', why: 'Subtract what was removed.' }
      ], ans: 'About $21.5$ cm$^2$.' },
    { t: 'A trapezoid', q: 'A trapezoid has parallel sides $7$ m and $13$ m, and height $6$ m. Find its area.',
      steps: [
        { do: 'Add the parallel sides: $7 + 13 = 20$', why: 'The two bases go together first.' },
        { do: 'Halve it: $20 \\div 2 = 10$', why: 'This is the average base — the width of the equivalent rectangle.' },
        { do: '$10 \\times 6 = 60$', why: 'Average base times height.' }
      ], ans: '$60$ m$^2$.' },
    { t: 'Working backwards', q: 'A triangle has area $54$ cm$^2$ and base $12$ cm. Find its height.',
      steps: [
        { do: 'Write the formula: $54 = \\dfrac{1}{2}(12)h$', why: 'Put in what you know.' },
        { do: 'Simplify: $54 = 6h$', why: 'Half of $12$ is $6$.' },
        { do: '$h = 9$', why: 'Divide both sides by $6$.' }
      ], ans: '$9$ cm.' }
  ],
  mistakes: [
    'Using the slanted side as the height. In a parallelogram or triangle the height must be <strong>perpendicular</strong> to the base — the straight-up distance, not the sloping edge. The slant is always longer, so the area comes out too big.',
    'Using the diameter where the formula asks for the radius. Since $r$ is squared, using $10$ instead of $5$ makes the area <strong>four</strong> times too large. Halve it and write it down before substituting.',
    'Including an internal cut line in a perimeter. The dashed line you drew to split the shape is not a wall — nobody walks along it. Perimeter follows only the outside edge.',
    'Adding areas of pieces that overlap. If your cuts double-count a corner, the total is too big. Make the pieces meet exactly, edge to edge, with nothing shared.'
  ]
},
{
  id: 'sections3d', strand: 'geometry', fig: 'cubeSlice',
  title: 'Plane Sections of 3-D Figures',
  big: 'Slice a solid with a flat plane and a flat shape appears. The angle of the cut decides which shape you get.',
  discover: [
    '**Take a block of cheese and cut straight down.** The face you expose is a rectangle.',
    'Now cut flat across instead. Also a rectangle, but a different one.',
    { fig: 'discSections3d' },
    'Now cut at a slant, corner to corner. The face is still flat — but it is **longer and thinner** than either of the others.',
    'One solid, three cuts, three different shapes. The shape depends on the **angle of the knife**, not only on the block.',
    'Tilt a cut through a cube far enough and you can expose a triangle, a pentagon, even a hexagon.',
    { punch: 'A cross section is the flat face a cut leaves behind. The question is never "what shape is this solid?" but **"which way did the plane go through it?"**' }
  ],
  funfact: [
    'Slice a cone the right way and you get a circle, an ellipse, a parabola or a hyperbola. The Greeks called these the **conic sections** and studied them for centuries as pure geometry.',
    'Two thousand years later **Kepler** found that planets orbit in ellipses, and **Newton** showed that any object under gravity follows one of those same four curves.',
    'A piece of geometry with no known use outside itself turned out to describe the solar system.'
  ],
  vocab: [
    ['Cross section', 'The 2-D face revealed when a plane cuts through a solid.'],
    ['Plane', 'A perfectly flat surface extending forever.'],
    ['Net', 'A 3-D shape unfolded flat.'],
    ['Face, edge, vertex', 'A flat surface; a line where two faces meet; a corner point.']
  ],
  sections: [
    { h: 'What a cross section is',
      p: ['Imagine slicing a block of cheese with a single straight cut. The new flat face you expose is the <strong>cross section</strong>.',
          'The same solid gives different cross sections depending on how you cut it, so the question <em>always</em> has two parts: which solid, and which direction.'] },
    { h: 'Slicing a rectangular prism',
      p: ['<strong>Parallel to a face:</strong> you get a rectangle identical to that face, no matter how deep you cut.',
          '<strong>Perpendicular to a face:</strong> also a rectangle.',
          '<strong>Diagonal cuts:</strong> you can get a non-rectangular parallelogram, a triangle (cutting off one corner), a pentagon, or even a hexagon if you slice cleverly through six faces.',
          'The rule: the cross section has one side for each face the <strong>plane</strong> passes through. A cube has six faces, so a hexagon is the most sides possible.'],
      box: { k: 'key', h: 'Count the faces you cut', t: 'The number of sides of the <strong>cross section</strong> equals the number of faces the plane passes through. Cut three faces near a corner, get a triangle. Cut all six, get a hexagon.' } },
    { h: 'Slicing a pyramid', fig: 'pyramidSlices',
      p: ['A square pyramid cut <strong>parallel to the base</strong> gives a square — smaller the higher you cut.',
          'Cut <strong>perpendicular through the apex</strong> and you get a triangle.',
          'Cut at a slant and you can get <strong>a trapezoid</strong>.'] },
    { h: 'Slicing a cylinder and a cone', fig: 'roundSlices',
      p: ['A cylinder cut parallel to its base gives a <strong>circle</strong>, always the same size. Cut perpendicular (straight down through the middle) and you get a <strong>rectangle</strong>. A slanted cut gives an ellipse — an oval.',
          'A <strong>cone</strong> cut parallel to the base gives a circle; cut vertically through the tip gives a triangle.'] },
    { h: 'Nets: the other way to flatten',
      p: ['A <strong>net</strong> is what you get if you unfold a solid along its edges and lay it flat.',
          'A cube has $11$ different nets. A useful check when reading one: on a cube, opposite faces are <em>never</em> adjacent in the net and never share an edge. In a row of four squares, the 1st and 3rd are opposite, and so are the 2nd and 4th.',
          'Nets are also the easiest route to <strong>surface area</strong> — the surface area is just the area of the net.'] }
  ],
  examples: [
    { t: 'Cross sections of a cube', q: 'Name three different cross sections you can obtain from a cube.',
      steps: [
        { do: 'Cut parallel to a face &rarr; a square.', why: 'The plane meets four faces, all at right angles.' },
        { do: 'Slice off one corner &rarr; a triangle.', why: 'The plane meets only the three faces at that corner.' },
        { do: 'Cut on a diagonal through opposite edges &rarr; a rectangle.', why: 'Longer than the square, because the diagonal is longer than an edge.' },
        { do: 'A cut crossing all six faces &rarr; a regular hexagon.', why: 'Six faces cut, six sides — the maximum for a cube.' }
      ], ans: 'Square, rectangle, triangle, and hexagon are all possible.' },
    { t: 'Reading a net', q: 'A cube net is a row of four squares labelled $A, B, C, D$, with $E$ above $B$ and $F$ below $B$. Which face is opposite $A$?',
      steps: [
        { do: 'In a row of four, the 1st and 3rd are opposite.', why: 'Folding a row wraps it around, so faces two apart end up facing each other.' },
        { do: 'So $A$ is opposite $C$, and $B$ is opposite $D$.', why: 'Apply the rule to both pairs.' },
        { do: 'That leaves $E$ opposite $F$.', why: 'Six faces make three opposite pairs.' }
      ], ans: '$C$ is opposite $A$.' },
    { t: 'The shape depends on the cut', q: 'A cylindrical can of radius $4$ cm and height $10$ cm is cut straight down through its central axis. Describe and measure the cross section.',
      steps: [
        { do: 'A vertical cut through the axis gives a rectangle.', why: 'You expose a flat slice running the full height.' },
        { do: 'Its height is the can\'s height: $10$ cm.', why: 'The cut runs top to bottom.' },
        { do: 'Its width is the full diameter: $2 \\times 4 = 8$ cm.', why: 'Through the centre means across the widest part.' },
        { do: 'Area $= 10 \\times 8 = 80$ cm$^2$', why: 'A rectangle, so base times height.' }
      ], ans: 'A $10$ cm $\\times$ $8$ cm rectangle, area $80$ cm$^2$.' }
  ],
  mistakes: [
    'Assuming every slice of a cube is a square. Only cuts parallel to a face give squares. Slanted cuts give rectangles, triangles, pentagons and hexagons — the cube is the same, the plane is not.',
    'Using the radius instead of the diameter for the width of a vertical cylinder section. A cut straight down through the middle exposes a rectangle whose width is the <strong>full</strong> diameter, since it crosses the circle from edge to edge.',
    'Reading a net without checking which faces end up opposite. Two faces that touch on the flat net may fold to become opposite sides, and two that look far apart may meet. Fold it mentally, or mark the pairs.',
    'Expecting the cut face to be the largest thing in the picture. A slant cut is longer than a straight one, so it can look bigger than the face it replaced — that is real, not an error.'
  ]
},
{
  id: 'volume', strand: 'geometry', fig: 'prismNet',
  title: 'Volume & Surface Area of 3-D Figures',
  big: 'Volume fills the inside — base area times height. Surface area wraps the outside — add up every face.',
  discover: [
    '**Take a cereal box and cut it open along the edges, then lay it flat.**',
    'What you now have is six rectangles — the front, the back, two sides, a top and a base.',
    { fig: 'discVolume' },
    'Add up those six areas and you have the amount of **card** the box is made from. That is the surface area.',
    'But the cereal inside was never measured by that. The cereal filled the **space**, and space needs three measurements: length, width and height.',
    'One is about the skin, the other about the filling — and they even have different units.',
    { punch: 'Surface area is measured in cm$^2$ because it is a flat thing made of lengths times lengths. Volume is cm$^3$. **If the units on your answer are wrong, you have computed the other quantity.**' }
  ],
  funfact: [
    'Hiero of Syracuse suspected his goldsmith had mixed silver into a gold crown. **Archimedes** is said to have solved it in the bath, noticing the water rise.',
    'Silver is less dense than gold, so a cheated crown of the right weight would take up more space — and displace more water.',
    'Whether he really ran through the streets shouting *eureka* is anyone\'s guess, but displacement is still how you measure the volume of an awkward shape.'
  ],
  vocab: [
    ['Volume', 'Space inside, in cubic units.'],
    ['Surface area', 'Total area of all the outside faces, in square units.'],
    ['Prism', 'A solid with two identical parallel bases joined by rectangles.'],
    ['Lateral area', 'The side faces only, not counting the two bases.']
  ],
  sections: [
    { h: 'One formula for every prism and cylinder',
      p: ['$V = Bh$, where $B$ is the area of the <strong>base</strong> and $h$ is the height.',
          'Think of it as stacking: one layer of the base is $B$ <strong>cubic units</strong> thick, and you stack $h$ of them.',
          'Rectangular <strong>prism</strong>: $B = lw$, so $V = lwh$. Triangular prism: $B = \\dfrac{1}{2}bh_{\\triangle}$. Cylinder: $B = \\pi r^2$, so $V = \\pi r^2 h$. Same idea each time — only $B$ changes.'],
      box: { k: 'key', h: 'Find the base first', t: 'The base is the shape that repeats all the way through the solid. Find its area, then multiply by how far it repeats. That single habit handles every <strong>prism</strong>.' } },
    { h: 'Surface area is just adding faces',
      p: ['Unfold the solid into its <strong>net</strong>, find each piece\'s area, and add.',
          'Rectangular prism: <strong>three pairs of matching faces</strong>, so $SA = 2lw + 2lh + 2wh$.',
          '<strong>Cylinder</strong>: two circles plus one rectangle. The rectangle is the label peeled off — its width is the circumference. So $SA = 2\\pi r^2 + 2\\pi r h$.'] },
    { h: 'Keep the units straight',
      p: ['Volume is in cubic units: cm$^3$, m$^3$, in$^3$. <strong>Surface area</strong> is in square units: cm$^2$, m$^2$.',
          'If your answer has the wrong kind of unit, you used the wrong formula. This is a free check on <em>every</em> problem.'],
      box: { k: 'slow', h: 'Ask "filling or wrapping?"', t: 'Filling a fish tank with water, or a box with sand &rarr; volume. Wrapping a present, or painting a wall &rarr; <strong>surface area</strong>. Saying which one out loud before you start prevents most errors in this unit.' } },
    { h: 'Pyramids and cones hold a third', fig: 'pyrConeThird',
      p: ['A pyramid or <strong>cone</strong> with the same base and height as a prism or cylinder holds exactly one third as much: $V = \\dfrac{1}{3}Bh$.',
          'You can see this by pouring: three cone-fulls of water fill a cylinder of matching <strong>base</strong> and height exactly.'] },
    { h: 'Working backwards',
      p: ['Given the <strong>volume</strong> and two dimensions, divide to find the third. If $V = 240$ cm$^3$ with base $8 \\times 5$, then $240 = 40h$, so $h = 6$ cm.',
          'Given surface area, <strong>substitute</strong> and solve — often an equation from Unit 11 appears inside a geometry problem.'] }
  ],
  examples: [
    { t: 'Triangular prism', q: 'A prism has a triangular base with base $6$ cm and height $4$ cm, and the prism is $10$ cm long. Find its volume.',
      steps: [
        { do: 'Find $B$, the triangle: $\\dfrac{1}{2}(6)(4) = 12$ cm$^2$', why: 'The triangle is the shape that repeats.' },
        { do: 'The prism length is the height of the solid: $10$ cm.', why: 'How far the triangle repeats.' },
        { do: '$V = Bh = 12 \\times 10 = 120$ cm$^3$', why: 'Base area times height.' }
      ], ans: '$120$ cm$^3$.' },
    { t: 'Cylinder, both measures', q: 'A can has radius $3$ cm and height $8$ cm. Find its volume and surface area. Use $\\pi \\approx 3.14$.',
      steps: [
        { do: 'Volume: $\\pi r^2 h = \\pi (9)(8) = 72\\pi \\approx 226.1$ cm$^3$', why: 'Square the radius first, then multiply.' },
        { do: 'Two circles: $2\\pi r^2 = 2\\pi(9) = 18\\pi$', why: 'Top and bottom.' },
        { do: 'The label: $2\\pi r h = 2\\pi(3)(8) = 48\\pi$', why: 'A rectangle, circumference wide and $h$ tall.' },
        { do: 'Total: $18\\pi + 48\\pi = 66\\pi \\approx 207.2$ cm$^2$', why: 'Add all the faces.' }
      ], ans: '$V \\approx 226.1$ cm$^3$; $SA \\approx 207.2$ cm$^2$.' },
    { t: 'Backwards from volume', q: 'A rectangular tank holds $1{,}680$ cm$^3$. Its base is $14$ cm by $10$ cm. How deep is the water when full?',
      steps: [
        { do: 'Base area: $14 \\times 10 = 140$ cm$^2$', why: 'That is $B$.' },
        { do: '$1680 = 140h$', why: 'Put the known volume into $V = Bh$.' },
        { do: '$h = 1680 \\div 140 = 12$', why: 'Divide both sides by $140$.' }
      ], ans: '$12$ cm deep.' }
  ],
  mistakes: [
    'Mixing up volume and surface area. Volume fills, surface area wraps. The units tell you instantly which you computed: cm$^3$ fills a space, cm$^2$ covers one.',
    'Using the diameter in $\\pi r^2$. It must be halved first — and because $r$ is squared, forgetting makes the answer <strong>four</strong> times too big rather than twice.',
    'Forgetting a face in surface area. A box has six, not four: the top and base are easy to lose because you cannot see both at once in a drawing. Unfold it and count.',
    'Doubling the volume when you double a side. Doubling every edge multiplies the volume by <strong>eight</strong>, since all three dimensions grew. A box twice as tall only doubles it.'
  ]
},
{
  id: 'construction', strand: 'geometry', fig: 'angleFan',
  title: 'Geometric Construction',
  big: 'With only a compass and a straightedge you can copy, bisect and build exactly — and the angle facts tell you when a figure is even possible.',
  discover: [
    '**Set a compass to some width and do not touch the screw again.**',
    'Every arc you now draw is made of points at exactly that distance from where the point sat.',
    { fig: 'discConstruction' },
    'Put the point at one end of a line and sweep. Put it at the other end, same width, and sweep again.',
    'Where the arcs cross is a point that is **the same distance from both ends** — and it was found by the tool, not measured by you.',
    'Join it up and every side is equal, because every side was that one compass width.',
    { punch: 'That is why constructions use a compass and a straightedge and nothing else. **A ruler measures and can be misread; a compass simply keeps a distance**, exactly, for as long as you leave it alone.' }
  ],
  funfact: [
    'The Greeks asked whether you could trisect any angle, double a cube, or square a circle with compass and straightedge alone. People tried for two thousand years.',
    'In the 1800s all three were proved **impossible** — not hard, impossible — using algebra that had not existed when the questions were asked.',
    '**Gauss**, aged 19, did construct a regular 17-sided polygon, which nobody had managed. He asked for it on his gravestone.'
  ],
  vocab: [
    ['Compass / straightedge', 'Tools for drawing exact circles and lines — no measuring allowed.'],
    ['Bisect', 'Cut exactly in half.'],
    ['Complementary / supplementary', 'Two angles summing to $90°$ / to $180°$.'],
    ['Vertical angles', 'The opposite pair formed by two crossing lines — always equal.'],
    ['Triangle inequality', 'Any two sides must sum to more than the third.']
  ],
  sections: [
    { h: 'The angle facts you build on', fig: 'angleFacts',
      p: ['<strong>Angles on a straight line</strong> sum to $180°$. Angles around a point sum to $360°$.',
          '<strong>Vertical angles</strong> are equal. When two lines cross, the opposite angles match.',
          'With parallel lines and a transversal: <strong>corresponding angles</strong> are equal, alternate interior angles are equal, and co-interior angles sum to $180°$.',
          '<strong>A triangle\'s angles</strong> sum to $180°$; a quadrilateral\'s to $360°$.'] },
    { h: 'Angle chasing',
      p: ['Most construction and geometry problems are solved by <strong>filling in one angle at a time</strong>, each justified by a fact above.',
          'Work from what you know outward. Mark <em>every</em> angle you find directly on the figure — the next step usually depends on it.'],
      box: { k: 'slow', h: 'Write the reason beside each angle', t: 'Do not just write $70°$. Write "$70°$ — <strong>vertical angles</strong>". The reason is what tells you which angle you can find next, and it is what earns credit on a test.' } },
    { h: 'How many triangles fit the clues?', fig: 'congruenceFails',
      p: ['Given three <strong>sides</strong>: exactly one triangle, if the triangle inequality holds. Sides $3, 4, 9$ make nothing, because $3 + 4 < 9$ — the short sides cannot reach.',
          'Given two sides and the angle <strong>between</strong> them: exactly one triangle.',
          'Given three <strong>angles</strong>: infinitely many triangles, all similar but different sizes.',
          'Given two sides and an angle <em>not</em> between them: sometimes two different triangles fit.'],
      box: { k: 'key', h: 'Triangle inequality', t: 'Three lengths form a triangle exactly when the two shortest add to more than the longest. Check <em>only</em> that one comparison — it is enough.' } },
    { h: 'The four core constructions', fig: 'constructSteps',
      p: ['<strong>Copy a segment:</strong> set the compass to its length, then strike that length off on a new ray.',
          '<strong>Bisect a segment:</strong> from each endpoint, draw arcs of the same radius (more than half the length). They cross above and below; the line joining those crossings cuts the segment in half — and at a right angle.',
          '<strong>Bisect an angle:</strong> from the vertex, draw an arc crossing both sides. From those two crossing points, draw equal arcs that meet. Join the vertex to that meeting point.',
          '<strong>Perpendicular through a point:</strong> a bisected segment gives you a right angle for free.'] },
    { h: 'Why the constructions work',
      p: ['Every one of them relies on the same idea: a <strong>compass</strong> draws all the points at an equal distance from its centre.',
          'When two equal arcs cross, that crossing point is the same distance from both starting points — which is exactly what "halfway" <strong>means</strong>. The construction is a proof, not a trick.'] }
  ],
  examples: [
    { t: 'Angle chasing', q: 'Two lines cross. One angle measures $52°$. Find the other three.',
      steps: [
        { do: 'The vertical angle is also $52°$.', why: 'Vertical angles are equal.' },
        { do: 'A neighbouring angle: $180° - 52° = 128°$', why: 'They sit on a straight line.' },
        { do: 'Its vertical angle is $128°$ too.', why: 'Vertical angles again.' },
        { do: 'Check: $52 + 52 + 128 + 128 = 360$ &check;', why: 'Angles around a point sum to $360°$.' }
      ], ans: '$52°$, $128°$, $128°$.' },
    { t: 'Can these be a triangle?', q: 'Can segments of length $5$, $7$ and $13$ form a triangle?',
      steps: [
        { do: 'Identify the longest side: $13$.', why: 'Only one comparison matters.' },
        { do: 'Add the other two: $5 + 7 = 12$', why: 'The two shorter sides together.' },
        { do: '$12 < 13$', why: 'The short sides cannot reach across the long one.' }
      ], ans: 'No — the triangle inequality fails.' },
    { t: 'Parallel lines', q: 'Two parallel lines are cut by a transversal. One angle is $73°$. Find the co-interior angle on the same side.',
      steps: [
        { do: 'Co-interior angles sit between the parallels, on the same side of the transversal.', why: 'Identify the right pair before computing.' },
        { do: 'They are supplementary: they sum to $180°$.', why: 'This is the co-interior angle rule.' },
        { do: '$180° - 73° = 107°$', why: 'Subtract.' }
      ], ans: '$107°$' }
  ],
  mistakes: [
    'Changing the compass width in the middle of a construction. The equal radii are the entire point — they are what guarantees the sides come out equal. Once the screw moves, the proof is gone.',
    'Checking all three comparisons in the triangle inequality. Only the <strong>longest</strong> side matters: if it is shorter than the other two added together, the triangle closes. The other two checks pass automatically.',
    'Assuming two angles are equal because they look equal. A drawing is evidence of nothing; name the rule that makes them equal — vertical, corresponding, or base angles of an isosceles triangle.',
    'Rubbing out the construction arcs. They are the working, and they show <em>why</em> the figure is right. Marks for a construction are usually for the arcs, not the finished shape.'
  ]
},

/* ---- Math 7 (regular track) units. Course order lives in window.COURSES. ---- */
{
  id: 'exponents', strand: 'number', fig: 'powerTower',
  title: 'Exponents & Scientific Notation',
  big: 'An exponent counts how many times you multiply, not what you multiply by. That one idea explains every rule.',
  discover: [
    '**Fold a sheet of paper in half. Now fold it again, and again.**',
    'One fold gives $2$ layers. Two folds give $4$. Three give $8$.',
    { fig: 'discExponents' },
    'Each fold **doubles** what is already there, so by seven folds you are at $128$ layers.',
    'Writing that as $2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2$ is slow, and easy to miscount.',
    'So write $2^7$ instead. The small raised number simply **counts the twos**.',
    { punch: 'That is all an exponent is: a count of how many copies are multiplied. Every rule in this unit — adding exponents, subtracting them, the meaning of $2^0$ — can be rebuilt by asking how many copies there are.' }
  ],
  funfact: [
    'The word **exponent** comes from Latin *exponere*, "to put out" — it is the number put out above the base.',
    'Before the modern notation, mathematicians wrote $x \\cdot x \\cdot x$ in full. The superscript form was popularised by **René Descartes** in the 1630s.',
    'There is a long-standing claim that paper cannot be folded more than seven times. In 2002 a student named Britney Gallivan folded one **twelve** times, using 1.2 km of toilet paper and a formula she derived herself.'
  ],
  vocab: [
    ['Base', 'The number being multiplied. In $5^3$ the base is $5$.'],
    ['Exponent', 'How many times the base is used as a factor. In $5^3$ the exponent is $3$.'],
    ['Power', 'The whole expression, $5^3$, and also its value, $125$.'],
    ['Scientific notation', 'A number written as $a \\times 10^n$, where $1 \\leq a < 10$.']
  ],
  sections: [
    { h: 'What an exponent actually means',
      p: ['$5^3$ means $5 \\times 5 \\times 5 = 125$. It does <strong>not</strong> mean $5 \\times 3$.',
          'Read it as "five to the third power", or "five cubed". a positive whole-number <strong>exponent</strong> counts factors. Zero, negative and fractional exponents extend that idea.',
          'Once you hold on to that, you <em>never</em> have to memorise the rules — you can rebuild them.'],
      box: { k: 'warn', h: 'The most common slip', t: '$3^4 \\neq 12$. It is $3 \\times 3 \\times 3 \\times 3 = 81$. Multiplying the base by the exponent is the single most frequent error in this unit.' } },
    { h: 'Multiplying and dividing powers',
      p: ['$2^3 \\times 2^4 = (2 \\cdot 2 \\cdot 2)(2 \\cdot 2 \\cdot 2 \\cdot 2) = 2^7$. Three factors and four factors make seven factors. So you <strong>add</strong> the exponents.',
          '$\\dfrac{2^7}{2^4}$ cancels four of the seven twos, leaving $2^3$. So you <strong>subtract</strong>.',
          'Both rules only work when the <strong>bases</strong> match. $2^3 \\times 3^4$ cannot be combined at all.'],
      box: { k: 'key', h: 'The three rules', t: '$a^m \\cdot a^n = a^{m+n}$<br>$\\dfrac{a^m}{a^n} = a^{m-n}$<br>$(a^m)^n = a^{mn}$ — a power of a power multiplies.' } },
    { h: 'Zero and negative exponents',
      p: ['Follow the pattern down: $2^3 = 8$, $2^2 = 4$, $2^1 = 2$. <strong>Each step divides by</strong> $2$. The next step gives $2^0 = 1$.',
          'Keep going: $2^{-1} = \\dfrac{1}{2}$ and $2^{-2} = \\dfrac{1}{4}$.',
          'So a negative exponent <strong>means</strong> "one over", not "negative number". $2^{-3} = \\dfrac{1}{8}$, which is positive.'],
      box: { k: 'slow', h: 'Say it out loud', t: 'A negative <strong>exponent</strong> flips the number to the other side of the fraction bar. It does not change the sign by itself; a negative base can still give a negative result, such as $(-2)^{-3} = -1/8$.' } },
    { h: 'Scientific notation',
      p: ['Very large and very small numbers are painful to write out. <strong>Scientific notation</strong> packs them into $a \\times 10^n$ with exactly one non-zero digit in front of the decimal point.',
          '$4{,}300{,}000 = 4.3 \\times 10^6$. The point moved $6$ <strong>places left</strong>, so the exponent is $6$.',
          '$0.00047 = 4.7 \\times 10^{-4}$. The point moved $4$ <strong>places right</strong>, so the exponent is $-4$.',
          'Big number, positive exponent. Small number, negative exponent. Check that first, <em>every</em> time.'] },
    { h: 'Calculating in scientific notation',
      p: ['Multiply the front numbers, and <strong>add the exponents</strong>: $(3 \\times 10^5)(2 \\times 10^{-2}) = 6 \\times 10^3$.',
          '<strong>If the front number lands outside</strong> $1$ to $10$, fix it. $(5 \\times 10^4)(4 \\times 10^3) = 20 \\times 10^7$, which becomes $2 \\times 10^8$.'] }
  ],
  examples: [
    { t: 'Combining rules', q: 'Simplify $\\dfrac{(2^3)^2 \\cdot 2^4}{2^5}$.',
      steps: [
        { do: '$(2^3)^2 = 2^6$', why: 'A power of a power multiplies: $3 \\times 2 = 6$.' },
        { do: 'Top becomes $2^6 \\cdot 2^4 = 2^{10}$', why: 'Same base multiplied, so add the exponents.' },
        { do: '$\\dfrac{2^{10}}{2^5} = 2^5$', why: 'Dividing subtracts: $10 - 5 = 5$.' },
        { do: '$2^5 = 32$', why: 'Five twos multiplied together.' }
      ], ans: '$2^5 = 32$' },
    { t: 'Into scientific notation', q: 'Write $0.00062$ in scientific notation.',
      steps: [
        { do: 'Put one non-zero digit before the point: $6.2$', why: 'That is the $a$ part, between $1$ and $10$.' },
        { do: 'Count the moves: $0.00062 \\to 6.2$ is $4$ places right.', why: 'Moving right means the original was small.' },
        { do: 'Small number, so the exponent is negative: $10^{-4}$', why: 'Check: $6.2 \\times 0.0001 = 0.00062$ &check;' }
      ], ans: '$6.2 \\times 10^{-4}$' },
    { t: 'Multiplying big numbers', q: 'Compute $(4 \\times 10^6)(5 \\times 10^{-2})$ in scientific notation.',
      steps: [
        { do: 'Front numbers: $4 \\times 5 = 20$', why: 'Multiply the $a$ parts.' },
        { do: 'Powers: $10^6 \\cdot 10^{-2} = 10^4$', why: 'Add the exponents: $6 + (-2) = 4$.' },
        { do: 'So far $20 \\times 10^4$ — but $20$ is too big.', why: 'The front must sit between $1$ and $10$.' },
        { do: '$20 = 2 \\times 10^1$, so the answer is $2 \\times 10^5$', why: 'One more factor of ten moves across.' }
      ], ans: '$2 \\times 10^5$' }
  ],
  mistakes: [
    'Multiplying the base by the exponent. $3^4$ is $3 \\times 3 \\times 3 \\times 3 = 81$, not $12$ — the exponent counts the factors, it is not one of them. This is the single most frequent error in the unit.',
    'Thinking $2^{-3}$ is negative. It is $\\dfrac{1}{8}$: a negative exponent means repeated <strong>division</strong>, not a negative result. Only a minus in front of the whole thing makes it negative.',
    'Adding exponents with different bases. $2^3 \\cdot 3^2$ cannot be combined, because they are counts of different things — three twos and two threes. The rule only works when the bases match.',
    'Leaving a front number outside $1$ to $10$ in scientific notation. $47 \\times 10^3$ has the right value but breaks the form, and two numbers written that way can no longer be compared by exponent.'
  ]
},
{
  id: 'problemsolving', strand: 'skills', fig: 'workBackwards',
  title: 'Problem Solving',
  big: 'A hard problem is rarely beaten by cleverness. It is beaten by a method: understand it, pick a strategy, carry it out, then check.',
  discover: [
    '**"I spent half my money, then \\$6 more, and I have \\$10 left."** How much did I start with?',
    'There is only one number you were actually given, and it is the last one.',
    { fig: 'discProblemSolving' },
    'So start at the end and **undo**. Before spending the \\$6 I must have had $10 + 6 = \\$16$.',
    'And that \\$16 was the half that survived. So the whole was $\\$32$.',
    'Check it forwards: half of $32$ is $16$, take \\$6 and you have \\$10. It fits.',
    { punch: 'The method is the point, not the answer. **Understand, plan, carry out, look back** — and "look back" is the step people skip and the step that catches almost everything.' }
  ],
  funfact: [
    '**George Pólya** set out those four steps in *How to Solve It* (1945). It has never been out of print and has sold over a million copies.',
    'His most quoted advice is to ask, when stuck, "is there a related problem I already know how to do?"',
    'He also recommended solving a deliberately easier version first — smaller numbers, fewer cases — which is why "try a simpler case" appears in this unit.'
  ],
  vocab: [
    ['Strategy', 'A general approach — draw it, tabulate it, work backwards, try a simpler case.'],
    ['Work backwards', 'Start from the result and undo each step.'],
    ['Guess, check, revise', 'Make a sensible guess, test it, and use what you learn to guess better.'],
    ['Simpler case', 'Solve the same problem with small numbers, find the pattern, then scale up.']
  ],
  sections: [
    { h: 'The four steps',
      p: ['<strong>1. Understand.</strong> What are you given, and what exactly is being asked? Say it in your own words.',
          '<strong>2. Plan.</strong> Pick a strategy. Which one is the subject of this whole unit.',
          '<strong>3. Carry it out.</strong> Do the arithmetic carefully, one line at a time.',
          '<strong>4. Look back.</strong> Is the answer sensible? Does it answer the question that was asked?'],
      box: { k: 'slow', h: 'Step 4 is not optional', t: 'Most lost marks are not from bad thinking. They are from answering a slightly different question, or from an answer that is obviously too big. Re-reading the question at the end catches <em>both</em>.' } },
    { h: 'Draw a picture',
      p: ['A diagram turns words into something you can look at. Rectangles for <strong>areas</strong>, a number line for distances, boxes and arrows for stages.',
          'It does not need to be beautiful or to scale. <strong>It needs to be labelled</strong>.'] },
    { h: 'Work backwards',
      p: ['When a problem tells you the ending and asks for the beginning, <strong>run the steps in reverse</strong> and undo each one.',
          'Someone <strong>spends half their money</strong>, then $\\$6$, and has $\\$10$ left. Undo: before the $\\$6$ they had $\\$16$; that was half, so they started with $\\$32$.',
          'Undo addition with subtraction, and doubling with halving. <em>Always</em> check by running it forwards.'],
      box: { k: 'key', h: 'The signal', t: 'If the question ends "...how much did they start with?" or "...what was the original number?", <strong>work backwards</strong>.' } },
    { h: 'Make a table, find a pattern',
      p: ['When something repeats or grows, tabulate the first few cases and <strong>look at the differences</strong>.',
          'Constant difference <strong>means</strong> a rule like $an + b$. A constant ratio means repeated multiplying.',
          'Always test your rule on <strong>a case you did not use to build it</strong>.'] },
    { h: 'Try a simpler problem',
      p: ['Stuck on $100$ people shaking hands? Do $3$ people, then $4$, then $5$. Write the results in a table and <strong>the pattern appears</strong>.',
          'This is not giving up on the hard problem. It is <strong>the standard way mathematicians attack one</strong>.'] },
    { h: 'Guess, check, revise',
      p: ['A structured guess beats staring at the page. Guess, test, and note whether you were <strong>too high or too low</strong> — then use that to aim the next guess.',
          'Three or four rounds usually lands it, and often the pattern in your guesses <strong>reveals the equation you could have written</strong>.'] }
  ],
  examples: [
    { t: 'Working backwards', q: 'Nina spent half her money on a game, then $\\$7$ on lunch, and has $\\$18$ left. How much did she start with?',
      steps: [
        { do: 'Start from the end: $\\$18$ left.', why: 'Working backwards means beginning with the result.' },
        { do: 'Undo the lunch: $18 + 7 = 25$', why: 'She had $\\$25$ before lunch.' },
        { do: 'Undo the half: $25 \\times 2 = 50$', why: '$\\$25$ was half of what she had, so double it.' },
        { do: 'Check forwards: half of $50$ is $25$, minus $7$ is $18$ &check;', why: 'Always run it forwards to confirm.' }
      ], ans: '$\\$50$' },
    { t: 'A simpler case first', q: 'At a party, every pair of the $12$ guests shakes hands once. How many handshakes?',
      steps: [
        { do: 'Try small: $2$ people give $1$; $3$ give $3$; $4$ give $6$; $5$ give $10$.', why: 'Build a table you can actually count.' },
        { do: 'Differences are $2, 3, 4$ — each new person shakes everyone already there.', why: 'The pattern has a reason, which is what makes it trustworthy.' },
        { do: 'So the total is $1 + 2 + \\cdots + 11$ for $12$ people.', why: 'The 12th person adds 11 new handshakes.' },
        { do: '$\\dfrac{11 \\times 12}{2} = 66$', why: 'Or directly: each of $12$ shakes $11$ hands, then halve for double-counting.' }
      ], ans: '$66$ handshakes.' },
    { t: 'Guess, check, revise', q: 'Tickets cost $\\$8$ for adults and $\\$5$ for children. $20$ tickets sold for $\\$136$. How many adults?',
      steps: [
        { do: 'Guess $10$ adults: $10(8) + 10(5) = 130$. Too low by $6$.', why: 'Start in the middle and see which way to move.' },
        { do: 'Each adult swapped in for a child adds $\\$3$.', why: '$8 - 5 = 3$ — this is what makes the next guess exact.' },
        { do: '$6 \\div 3 = 2$ more adults, so $12$.', why: 'Use what the check told you rather than guessing blind.' },
        { do: 'Check: $12(8) + 8(5) = 96 + 40 = 136$ &check;', why: 'Exactly right.' }
      ], ans: '$12$ adults.' }
  ],
  mistakes: [
    'Starting to calculate before deciding what is being asked. Numbers on the page invite arithmetic, and arithmetic on the wrong quantity is still wrong. Say the question in your own words first.',
    'Working backwards but undoing in the original order. If the steps were halve, then subtract $6$, the undo is add $6$, <strong>then</strong> double. Reversing the order is the whole method.',
    'Finding a pattern from two terms only. $2, 4, \\ldots$ could continue $6, 8$ or $8, 16$. Always test a candidate rule on a <strong>third</strong> term before building on it.',
    'Skipping the check. A sensible-looking answer to a slightly different question is the most common way to lose marks, and re-reading the question takes ten seconds.'
  ]
},
{
  id: 'squareroots', strand: 'number', fig: 'squareGrid',
  title: 'Squares & Square Roots',
  big: 'Squaring and taking a square root undo each other. A root asks: what number, times itself, gives this?',
  discover: [
    '**You have 16 square tiles and want to lay them in a perfect square.** Four rows of four. Easy.',
    'Now try it with $20$ tiles.',
    { fig: 'discSquareroots' },
    'Four by four uses $16$ and leaves four over. Five by five needs $25$ and you are five short.',
    'There is **no whole number** that works. The side of a $20$-tile square is somewhere between $4$ and $5$.',
    'That side length has a name: $\\sqrt{20}$. It is a real length — you could cut it with scissors — it is just not a whole number.',
    { punch: 'So $\\sqrt{n}$ asks: **what side length gives a square of area $n$?** Sixteen answers neatly, twenty does not, and that difference is what this unit is about.' }
  ],
  funfact: [
    'The radical sign $\\sqrt{\\ }$ is thought to be a stylised letter **r**, for the Latin *radix*, "root" — the same root as radish and radical.',
    'It first appears in a 1525 German algebra book by **Christoff Rudolff**. The horizontal bar over the top came later, from Descartes.',
    'Before that, writers just wrote the word. The symbol saved so much space that it spread across Europe within a century.'
  ],
  vocab: [
    ['Perfect square', 'A number that is some whole number squared: $1, 4, 9, 16, 25, \\ldots$'],
    ['Square root', 'For $k \\ge 0$, $\\sqrt{k}$ is the nonnegative number whose square is $k$.'],
    ['Radical', 'The $\\sqrt{\\phantom{x}}$ symbol, and the expression under it.'],
    ['Radicand', 'The number under the radical sign.']
  ],
  sections: [
    { h: 'Squares and roots are opposites',
      p: ['$7^2 = 49$, so $\\sqrt{49} = 7$. <strong>They undo each other for nonnegative inputs.</strong> For any real $x$, $\\sqrt{x^2} = |x|$; squaring loses the original sign.',
          '<strong>Know these by heart</strong> — they turn up constantly: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225$.',
          'Recognising $144$ as $12^2$ on sight saves time in <em>every</em> later unit, especially Pythagoras.'],
      box: { k: 'key', h: 'Why "square"?', t: 'A square with side $7$ has <strong>area</strong> $49$. Going from side to area is squaring; going from area back to side is taking the root. The words are literal.' } },
    { h: 'Estimating roots that are not exact',
      p: ['$\\sqrt{40}$ is not a whole number. Trap it between the <strong>perfect squares</strong> either side: $36 < 40 < 49$, so $6 < \\sqrt{40} < 7$.',
          '$40$ is much closer to $36$ than to $49$, so the answer is <strong>a little above</strong> $6$ — about $6.3$.',
          'This bracket-and-judge method is usually all you need, and it <strong>catches calculator slips</strong>.'] },
    { h: 'Simplifying a radical',
      p: ['<strong>Pull out any perfect-square factor</strong>. $\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\times \\sqrt{2} = 6\\sqrt{2}$.',
          'Look for the <em>largest</em> perfect square that divides the number. Using $4$ instead of $36$ still works, it just takes another round.',
          'For $a,b \\ge 0$, $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$ — <strong>real square roots multiply straight across</strong>, which is what makes this legal.'] },
    { h: 'Solving $x^2 = k$',
      p: ['$x^2 = 25$ has <strong>two</strong> answers: $x = 5$ and $x = -5$, because both square to $25$.',
          'But the symbol $\\sqrt{25}$ <strong>means</strong> only the nonnegative one, $5$. That is a convention, and it trips people up.',
          'So: solving an equation gives $\\pm$; evaluating a <strong>square root</strong> gives the nonnegative root. If $k=0$, $x^2=k$ has one real solution; if $k<0$, it has no real solution.'],
      box: { k: 'warn', h: 'Two different questions', t: '"Solve $x^2 = 16$" &rarr; $x = \\pm 4$.<br>"Find $\\sqrt{16}$" &rarr; $4$.<br>Read carefully which one is being asked.' } },
    { h: 'Roots of fractions and decimals',
      p: ['$\\sqrt{\\dfrac{9}{25}} = \\dfrac{\\sqrt{9}}{\\sqrt{25}} = \\dfrac{3}{5}$ — take the root of <strong>the top and the bottom separately</strong>.',
          '$\\sqrt{0.04} = 0.2$, because $0.2 \\times 0.2 = 0.04$. Note the root of a number below $1$ is <em>larger</em> than the number.'] }
  ],
  examples: [
    { t: 'Estimate', q: 'Between which two consecutive whole numbers does $\\sqrt{130}$ lie, and which is it nearer?',
      steps: [
        { do: 'Find the perfect squares either side: $121$ and $144$.', why: '$11^2 = 121$ and $12^2 = 144$.' },
        { do: '$121 < 130 < 144$, so $11 < \\sqrt{130} < 12$', why: 'Bigger radicand means bigger root.' },
        { do: '$130 - 121 = 9$ but $144 - 130 = 14$', why: 'It sits closer to $121$.' }
      ], ans: 'Between $11$ and $12$, nearer $11$ — about $11.4$.' },
    { t: 'Simplify', q: 'Simplify $\\sqrt{98}$.',
      steps: [
        { do: 'Look for a perfect-square factor of $98$.', why: '$98 = 49 \\times 2$, and $49$ is a perfect square.' },
        { do: '$\\sqrt{98} = \\sqrt{49} \\times \\sqrt{2}$', why: 'Roots split across multiplication.' },
        { do: '$= 7\\sqrt{2}$', why: '$\\sqrt{2}$ will not simplify further — $2$ has no square factors.' }
      ], ans: '$7\\sqrt{2}$' },
    { t: 'Solve versus evaluate', q: 'Solve $x^2 = 81$, then find $\\sqrt{81}$.',
      steps: [
        { do: 'For the equation, ask what squares to $81$.', why: 'Both $9$ and $-9$ do.' },
        { do: '$x = 9$ or $x = -9$, written $x = \\pm 9$', why: 'An equation keeps both solutions.' },
        { do: 'But $\\sqrt{81} = 9$ only.', why: 'The radical symbol means the positive root by definition.' }
      ], ans: '$x = \\pm 9$, but $\\sqrt{81} = 9$.' }
  ],
  mistakes: [
    'Halving instead of rooting. $\\sqrt{36}$ is $6$, not $18$ — you want the number that <strong>multiplies by itself</strong> to give $36$, not the one that adds to itself. Check by squaring your answer.',
    'Giving only the positive answer when solving $x^2 = k$. Both $6$ and $-6$ square to $36$, so $x^2 = 36$ has two solutions. (The symbol $\\sqrt{36}$ on its own does mean just $6$ — the two situations are different.)',
    'Writing $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$. Try $a = 9$, $b = 16$: the left is $\\sqrt{25} = 5$, the right is $3 + 4 = 7$. Roots split across multiplication, never across addition.',
    'Assuming a root must be irrational. $\\sqrt{49}$, $\\sqrt{0.25}$ and $\\sqrt{\\tfrac{4}{9}}$ are all perfectly ordinary rational numbers.'
  ]
},
{
  id: 'realnumbers', strand: 'number', fig: 'numberSets',
  title: 'Real Numbers',
  big: 'Every number you meet this year is either rational — a fraction — or irrational. Knowing which tells you how it behaves.',
  discover: [
    '**Draw a square one unit wide.** How long is the diagonal across it?',
    'By Pythagoras it is $\\sqrt{2}$. So write that as a decimal.',
    { fig: 'discRealnumbers' },
    'It is not $1.4$, because $1.4^2 = 1.96$. Not $1.41$ either — that squares to $1.9881$.',
    'Keep going and the decimals get closer but **never arrive**. There is no fraction that gives it exactly.',
    'And yet the diagonal is right there on the page. You can measure it with string.',
    { punch: 'So some perfectly real lengths cannot be written as a fraction. Those are the **irrational** numbers, and together with the fractions they fill the number line completely — with no gaps left over.' }
  ],
  funfact: [
    'The Pythagoreans believed every length was a ratio of whole numbers. The diagonal of a square destroyed that belief, and the proof is short enough to fit on a postcard.',
    'Legend says the discoverer, **Hippasus**, was thrown overboard at sea for revealing it — though the story may have been invented centuries later.',
    '$\\pi$ was proved irrational only in 1761, by **Johann Lambert**. Nobody had managed it in the previous two thousand years of trying.'
  ],
  vocab: [
    ['Rational', 'Any number writable as $\\dfrac{a}{b}$ with integers $a$ and $b$, $b \\neq 0$.'],
    ['Irrational', 'A real number that cannot be written as a fraction — its decimal never repeats and never ends.'],
    ['Integer', 'A whole number, positive, negative or zero.'],
    ['Terminating / repeating', 'A decimal that stops, or one that repeats a block forever.']
  ],
  sections: [
    { h: 'The families, nested inside each other',
      p: ['<strong>Counting numbers:</strong> $1, 2, 3, \\ldots$',
          '<strong>Whole numbers:</strong> the counting numbers plus $0$.',
          '<strong>Integers:</strong> whole numbers and their negatives.',
          '<strong>Rationals:</strong> anything expressible as a fraction — which includes every integer, since $5 = \\dfrac{5}{1}$.',
          '<strong>Reals:</strong> the rationals together with the irrationals.',
          'Each family sits inside the next, so $-3$ is an integer <em>and</em> a rational <em>and</em> a real, all at once.'] },
    { h: 'How to tell rational from irrational',
      p: ['Write it as a decimal and <strong>watch what happens</strong>.',
          '<strong>Stops</strong> — like $0.75$ — rational.',
          '<strong>Repeats a block forever</strong> — like $0.3333\\ldots$ or $0.142857142857\\ldots$ — rational.',
          '<strong>Goes on forever with no repeating block</strong> — like $\\pi = 3.14159\\ldots$ or $\\sqrt{2} = 1.41421\\ldots$ — irrational.'],
      box: { k: 'key', h: 'The root test', t: 'The square root of a perfect square is rational: $\\sqrt{49} = 7$. The square root of any other whole number is <strong>irrational</strong>: $\\sqrt{50}$ never resolves.' } },
    { h: 'Turning repeating decimals into fractions',
      p: ['$0.\\overline{3}$ <strong>means</strong> $0.333\\ldots$ forever. Let $x = 0.333\\ldots$, then $10x = 3.333\\ldots$',
          'Subtract: $10x - x = 3$, so $9x = 3$ and $x = \\dfrac{1}{3}$.',
          'The trick is choosing the multiplier so the <strong>repeating</strong> tails line up and cancel.'] },
    { h: 'Comparing and ordering real numbers',
      p: ['<strong>Convert everything to decimals</strong>, then compare. $\\dfrac{7}{8} = 0.875$, $\\sqrt{0.81} = 0.9$, and $0.87$ — so the order is $0.87 < \\dfrac{7}{8} < \\sqrt{0.81}$.',
          'For <strong>irrationals</strong>, use a good estimate: $\\pi \\approx 3.14$ and $\\sqrt{10} \\approx 3.16$, so $\\pi < \\sqrt{10}$.',
          '<strong>Careful with negatives</strong>: $-\\dfrac{3}{4} > -0.8$, because $-0.75$ sits to the right of $-0.8$.'],
      box: { k: 'slow', h: 'One form at a time', t: '<em>Never</em> compare a fraction against a decimal against a root in your head. Put them all in the same costume — decimals are usually easiest — and then compare.' } },
    { h: 'Why $\\pi$ is not $\\dfrac{22}{7}$',
      p: ['$\\dfrac{22}{7} = 3.142857\\ldots$ and repeats, so it is <strong>rational</strong>. $\\pi = 3.14159\\ldots$ and never repeats.',
          '$\\dfrac{22}{7}$ is <strong>a convenient approximation</strong>, close to $\\pi$ but not equal to it. The same goes for $3.14$.'] }
  ],
  examples: [
    { t: 'Classify', q: 'Classify each: $-7$, $\\dfrac{2}{5}$, $\\sqrt{16}$, $\\sqrt{20}$, $0.\\overline{6}$.',
      steps: [
        { do: '$-7$: integer, and rational since $-7 = \\dfrac{-7}{1}$.', why: 'Every integer is rational.' },
        { do: '$\\dfrac{2}{5} = 0.4$: rational, terminating.', why: 'Already a fraction.' },
        { do: '$\\sqrt{16} = 4$: integer and rational.', why: '$16$ is a perfect square, so the root is whole.' },
        { do: '$\\sqrt{20} \\approx 4.472\\ldots$: irrational.', why: '$20$ is not a perfect square.' },
        { do: '$0.\\overline{6} = \\dfrac{2}{3}$: rational.', why: 'A repeating decimal is always a fraction in disguise.' }
      ], ans: 'All rational except $\\sqrt{20}$, which is irrational.' },
    { t: 'Repeating to fraction', q: 'Write $0.\\overline{27}$ as a fraction in lowest terms.',
      steps: [
        { do: 'Let $x = 0.272727\\ldots$', why: 'Name the number so you can operate on it.' },
        { do: 'The block is two digits, so multiply by $100$: $100x = 27.272727\\ldots$', why: 'Now the tails match exactly.' },
        { do: 'Subtract: $100x - x = 27$, so $99x = 27$', why: 'The infinite tails cancel — that is the whole trick.' },
        { do: '$x = \\dfrac{27}{99} = \\dfrac{3}{11}$', why: 'Divide top and bottom by $9$.' }
      ], ans: '$\\dfrac{3}{11}$' },
    { t: 'Order them', q: 'Put in order from least to greatest: $\\dfrac{5}{6}$, $0.8$, $\\sqrt{0.64}$, $\\dfrac{4}{5}$.',
      steps: [
        { do: 'Convert everything to decimals.', why: 'One costume makes comparison safe.' },
        { do: '$\\dfrac{5}{6} \\approx 0.833$, $0.8$, $\\sqrt{0.64} = 0.8$, $\\dfrac{4}{5} = 0.8$', why: 'Three of them are exactly equal.' },
        { do: 'So $0.8 = \\sqrt{0.64} = \\dfrac{4}{5} < \\dfrac{5}{6}$', why: 'Only $\\dfrac{5}{6}$ is larger.' }
      ], ans: '$0.8 = \\sqrt{0.64} = \\dfrac{4}{5} < \\dfrac{5}{6}$' }
  ],
  mistakes: [
    'Calling every square root irrational. $\\sqrt{25}$ is $5$ — perfectly rational. A root is irrational only when the number under it is <strong>not</strong> a perfect square.',
    'Treating $\\dfrac{22}{7}$ or $3.14$ as equal to $\\pi$. They are approximations, and good ones, but $\\pi$ has no exact fraction at all. Writing $=$ where you mean $\\approx$ quietly claims something false.',
    'Mis-ordering negatives. $-0.8$ is <strong>less</strong> than $-0.75$, because it lies further left on the number line. With negatives, bigger digits mean a smaller number.',
    'Assuming a long decimal must be irrational. $\\tfrac{1}{7} = 0.142857142857\\ldots$ runs forever but <strong>repeats</strong>, and anything that repeats is a fraction. Irrational means never repeating.'
  ]
},
{
  id: 'gcflcm', strand: 'number', fig: 'factorTree',
  title: 'GCF and LCM',
  big: 'Prime factorisation answers both questions at once: shared factors give the GCF, and everything needed gives the LCM.',
  discover: [
    '**Two gears mesh together: one with 16 teeth, one with 12.** Mark one tooth on each with paint, and line the marks up.',
    'Now turn them. How far must they go before both marks are back at the top together?',
    { fig: 'discGcflcm' },
    'The big gear returns every $16$ teeth. The small one every $12$. You need a number that **both** reach.',
    '$24$? The small one is home, the big one is not. $48$ works: $16 \\times 3$ and $12 \\times 4$.',
    'That is the **lowest common multiple** — the first moment two repeating cycles agree.',
    { punch: 'The GCF is the opposite question: not when do they next agree, but **what is the largest piece they share**. Here $4$ — you could split both gears into groups of four teeth, and no larger group works for both.' }
  ],
  funfact: [
    'The bicycle world calls a gear pair with a common factor a **non-hunting** gear — the same teeth meet each other every cycle, so wear concentrates on those teeth.',
    'Engineers deliberately choose tooth counts with no common factor, often a prime, so every tooth eventually meets every other and wear spreads evenly.',
    'Some cicadas emerge every 13 or 17 years. Both are prime, which makes it hard for any predator with a shorter cycle to sync up with them.'
  ],
  vocab: [
    ['Factor', 'A number that divides evenly into another.'],
    ['Multiple', 'The result of multiplying by a whole number: $12$ is a multiple of $4$.'],
    ['GCF', 'Greatest common factor — the largest number dividing both.'],
    ['LCM', 'Least common multiple — the smallest number both divide into.'],
    ['Prime factorisation', 'A number written as a product of primes: $60 = 2^2 \\cdot 3 \\cdot 5$.']
  ],
  sections: [
    { h: 'Factors go down, multiples go up',
      p: ['<strong>Factors</strong> of $12$: $1, 2, 3, 4, 6, 12$ — a short, finite list, all no bigger than $12$.',
          '<strong>Multiples</strong> of $12$: $12, 24, 36, 48, \\ldots$ — an endless list, all no smaller than $12$.',
          'Mixing these two up is the root of most GCF/LCM errors, so fix the direction first: <strong>GCF is small, LCM is large.</strong>'] },
    { h: 'Prime factorisation does both jobs',
      p: ['<strong>Break each number into primes</strong> with a factor tree. $24 = 2^3 \\cdot 3$ and $36 = 2^2 \\cdot 3^2$.',
          '<strong>GCF:</strong> take each shared prime to the <em>lowest</em> power. Here $2^2 \\cdot 3 = 12$.',
          '<strong>LCM:</strong> take every prime that appears, to the <em>highest</em> power. Here $2^3 \\cdot 3^2 = 72$.'],
      box: { k: 'key', h: 'Lowest for GCF, highest for LCM', t: 'Both use the same factorisations. The GCF keeps <em>only</em> what the numbers share; the LCM keeps everything either one needs.' } },
    { h: 'A useful check',
      p: ['$\\text{GCF} \\times \\text{LCM} = a \\times b$, <em>always</em>.',
          'For $24$ and $36$: $12 \\times 72 = 864$, and $24 \\times 36 = 864$ &check;',
          'This catches mistakes instantly, and it lets you find one <strong>if you already know the other</strong>.'] },
    { h: 'Which one does the word problem want?',
      p: ['<strong>GCF</strong> when you are splitting things into equal groups, or cutting into equal pieces as large as possible. The answer is smaller than the numbers.',
          '<strong>LCM</strong> when two cycles start together and you want the next time they line up, or when you are buying packs of different sizes to match. The answer is larger.'],
      box: { k: 'slow', h: 'Ask: bigger or smaller?', t: 'Before computing anything, decide whether the answer should be bigger or smaller than the numbers in the problem. That single question picks GCF or LCM correctly almost <em>every</em> time.' } },
    { h: 'Relatively prime numbers',
      p: ['If two numbers share no factor but $1$, their GCF is $1$ and they are called <strong>relatively prime</strong> — like $8$ and $15$.',
          'In that case the LCM is <strong>simply their product</strong>: $8 \\times 15 = 120$.'] }
  ],
  examples: [
    { t: 'Both at once', q: 'Find the GCF and LCM of $18$ and $30$.',
      steps: [
        { do: 'Factorise: $18 = 2 \\cdot 3^2$ and $30 = 2 \\cdot 3 \\cdot 5$', why: 'Prime factorisation makes both answers readable.' },
        { do: 'GCF: shared primes at lowest powers — $2 \\cdot 3 = 6$', why: 'Both have one $2$ and at least one $3$; neither shares a $5$.' },
        { do: 'LCM: every prime at highest power — $2 \\cdot 3^2 \\cdot 5 = 90$', why: 'Take $3^2$ from $18$ and the $5$ from $30$.' },
        { do: 'Check: $6 \\times 90 = 540 = 18 \\times 30$ &check;', why: 'The product rule confirms both.' }
      ], ans: 'GCF $= 6$, LCM $= 90$.' },
    { t: 'Which one?', q: 'Two lighthouses flash every $12$ and $18$ seconds. They flash together now. When do they next flash together?',
      steps: [
        { do: 'Ask: bigger or smaller than $12$ and $18$?', why: 'The next shared flash is later, so bigger — that means LCM.' },
        { do: '$12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$', why: 'Factorise both.' },
        { do: 'LCM $= 2^2 \\cdot 3^2 = 36$', why: 'Highest power of each prime.' }
      ], ans: 'In $36$ seconds.' },
    { t: 'The other kind', q: 'A florist has $48$ roses and $36$ tulips, and wants identical bunches using every flower. What is the largest number of bunches?',
      steps: [
        { do: 'Ask: bigger or smaller?', why: 'The number of bunches must divide both counts, so smaller — GCF.' },
        { do: '$48 = 2^4 \\cdot 3$ and $36 = 2^2 \\cdot 3^2$', why: 'Factorise.' },
        { do: 'GCF $= 2^2 \\cdot 3 = 12$', why: 'Lowest power of each shared prime.' },
        { do: 'Each bunch: $4$ roses and $3$ tulips.', why: '$48 \\div 12$ and $36 \\div 12$ — worth stating, as it is often the follow-up question.' }
      ], ans: '$12$ bunches.' }
  ],
  mistakes: [
    'Swapping them. The GCF can never be <strong>larger</strong> than the smaller number, and the LCM can never be <strong>smaller</strong> than the larger one. That one sanity check catches the swap immediately.',
    'Using the highest powers for the GCF. It is the other way round: GCF takes the <em>lowest</em> power of each shared prime, LCM the highest. The GCF must divide both, so it cannot take more than either has.',
    'Forgetting a prime that appears in only one number when building the LCM. The LCM must be a multiple of both, so every prime in either number has to be in it.',
    'Reaching for the formula when the question is about timing or sharing. "When do they coincide?" is LCM; "what is the biggest equal group?" is GCF. Decide which story you are in first.'
  ]
},
{
  id: 'measurement', strand: 'geometry', fig: 'areaDecompose',
  title: 'Measurement',
  big: 'Every conversion is a multiplication by one. Write the unit you want on top, the unit you have on the bottom, and the wrong units cancel themselves.',
  discover: [
    '**Measure a table with a centimetre ruler and you get 150.** Measure the same table in metres and you get 1.5.',
    'The table did not shrink. Only the **size of the unit** changed.',
    { fig: 'discMeasurement' },
    'A centimetre is small, so it takes a lot of them — a big number. A metre is big, so it takes few — a small number.',
    'That gives you a check you can apply every time: converting **to a smaller unit must give a bigger number**.',
    'If you convert metres to centimetres and your answer gets smaller, you multiplied when you should have divided.',
    { punch: 'Set conversions up as fractions and let the units cancel: $150\\text{ cm} \\times \\dfrac{1\\text{ m}}{100\\text{ cm}}$. If the unit you want to lose does not cancel, **the fraction is upside down** — and you will know before you do any arithmetic.' }
  ],
  funfact: [
    'In 1999 NASA\'s $\\$125$ million Mars Climate Orbiter was lost. One team worked in pound-seconds, the other in newton-seconds.',
    'Nobody converted. The spacecraft came in roughly 170 km too low and broke up in the Martian atmosphere.',
    'The review board\'s conclusion was blunt: the failure was not the arithmetic but the **missing units** on the numbers being passed between teams.'
  ],
  vocab: [
    ['Unit rate for conversion', 'A fraction equal to $1$, like $\\dfrac{12 \\text{ in}}{1 \\text{ ft}}$.'],
    ['Metric prefixes', 'kilo $= 1000$, centi $= \\dfrac{1}{100}$, milli $= \\dfrac{1}{1000}$.'],
    ['Precision', 'How finely a measurement is recorded — to the nearest cm, mm, and so on.'],
    ['Perimeter / area', 'Distance around, in units; space inside, in square units.']
  ],
  sections: [
    { h: 'Converting by cancelling units',
      p: ['A conversion factor is a fraction worth <em>exactly</em> $1$, because top and bottom are the same amount: $\\dfrac{12 \\text{ in}}{1 \\text{ ft}} = 1$.',
          'Multiplying by $1$ <em>never</em> changes the amount — only how it is written.',
          'Convert $7$ feet to inches: $7 \\text{ ft} \\times \\dfrac{12 \\text{ in}}{1 \\text{ ft}} = 84 \\text{ in}$. The "ft" <strong>cancels, leaving inches</strong>.'],
      box: { k: 'key', h: 'Which way up?', t: 'Put the unit you are getting <strong>rid of</strong> on the bottom, so it cancels. If your answer comes out with a strange unit like ft²/in, you had the fraction upside down.' } },
    { h: 'The metric system is just powers of ten',
      p: ['km, m, cm, mm — each step is a factor of $10$, $100$ or $1000$, so converting is <strong>moving the decimal point</strong>.',
          '$1$ m $= 100$ cm, $1$ km $= 1000$ m, $1$ cm $= 10$ mm.',
          'Going to a <em>smaller</em> unit gives a <em>bigger</em> number: $2.5$ m is $250$ cm. If your number shrank when the unit shrank, you went the wrong way.'] },
    { h: 'Square and cubic units do not convert the same way', fig: 'yardFootSquareCube',
      p: ['$1$ m $= 100$ cm, but $1$ m$^2$ is <strong>not</strong> $100$ cm$^2$.',
          'A square metre is $100$ cm by $100$ cm, so $1$ m$^2 = 10{,}000$ cm$^2$. <strong>The factor is squared</strong>.',
          'Likewise $1$ m$^3 = 1{,}000{,}000$ cm$^3$ — <strong>the factor is cubed</strong>. This is the same $k$, $k^2$, $k^3$ idea as scaling.'],
      box: { k: 'warn', h: 'The classic trap', t: 'Converting an area by the plain length factor. $5$ m$^2$ is $50{,}000$ cm$^2$, not $500$ cm$^2$.' } },
    { h: 'Perimeter and area, quickly',
      p: ['Rectangle: $P = 2(l + w)$, $A = lw$.',
          'Triangle: $A = \\dfrac{1}{2}bh$, using the <strong>perpendicular</strong> height.',
          'Parallelogram: $A = bh$. Trapezoid: $A = \\dfrac{1}{2}(b_1 + b_2)h$.',
          'For an odd shape, split it into pieces you recognise, find each <strong>area</strong>, and add — or find a big shape and subtract what is missing.'] },
    { h: 'Choosing a sensible unit',
      p: ['A room is measured in metres, a pencil in centimetres, a city in kilometres. Choosing badly makes numbers you <em>cannot</em> check.',
          'Before you write an answer, ask <strong>whether it is plausible</strong>. A desk with an area of $2$ km$^2$ should stop you.'] }
  ],
  examples: [
    { t: 'Two-step conversion', q: 'Convert $3$ miles to inches. ($1$ mile $= 5280$ ft, $1$ ft $= 12$ in.)',
      steps: [
        { do: 'Chain the factors so units cancel.', why: 'Miles &rarr; feet &rarr; inches.' },
        { do: '$3 \\text{ mi} \\times \\dfrac{5280 \\text{ ft}}{1 \\text{ mi}} = 15840 \\text{ ft}$', why: 'Miles cancel.' },
        { do: '$15840 \\text{ ft} \\times \\dfrac{12 \\text{ in}}{1 \\text{ ft}} = 190080 \\text{ in}$', why: 'Feet cancel, inches remain.' }
      ], ans: '$190{,}080$ inches.' },
    { t: 'Area conversion', q: 'A floor measures $4$ m by $3$ m. Find its area in square centimetres.',
      steps: [
        { do: 'Area in m$^2$: $4 \\times 3 = 12$ m$^2$', why: 'Work in the given unit first.' },
        { do: '$1$ m$^2 = 100 \\times 100 = 10{,}000$ cm$^2$', why: 'Both dimensions convert, so the factor is squared.' },
        { do: '$12 \\times 10{,}000 = 120{,}000$ cm$^2$', why: 'Check: $400$ cm $\\times$ $300$ cm $= 120{,}000$ cm$^2$ &check;' }
      ], ans: '$120{,}000$ cm$^2$' },
    { t: 'Composite shape', q: 'An L-shape is a $10 \\times 8$ rectangle with a $4 \\times 3$ rectangle removed from one corner. Find its area and perimeter.',
      steps: [
        { do: 'Area: $10 \\times 8 = 80$, minus $4 \\times 3 = 12$', why: 'Whole shape less the bite taken out.' },
        { do: 'Area $= 68$', why: 'Subtraction is faster than splitting here.' },
        { do: 'Perimeter: the cut corner adds two edges but removes two of the same lengths.', why: 'The notch does not change the total distance around an L-shape.' },
        { do: '$P = 2(10 + 8) = 36$', why: 'A surprising result worth remembering.' }
      ], ans: 'Area $68$, perimeter $36$.' }
  ],
  mistakes: [
    'Converting area or volume with the plain length factor. $1$ m$^2$ is $10{,}000$ cm$^2$, not $100$ — because both the length and the width converted. For volume the factor is cubed.',
    'Flipping the conversion fraction. Set it up so the unwanted unit appears top and bottom and <strong>cancels</strong>. If it does not cancel, the fraction is the wrong way up, and you can see that before calculating.',
    'Getting a smaller number when converting to a smaller unit. Smaller units take more of them to cover the same thing. A shrinking number means the operation was reversed.',
    'Dropping the units from the answer. A number without a unit cannot be checked or used, and the Mars orbiter is the expensive proof.'
  ]
},
{
  id: 'circles', strand: 'geometry', fig: 'circleParts',
  title: 'Circles',
  big: 'Every circle has the same ratio of circumference to diameter. That ratio is $\\pi$, and it drives both formulas.',
  discover: [
    '**Stand a can upright, mark the table where it touches, and roll it one full turn.**',
    'Mark where it touches again. The distance between the marks is the distance **around** the can, unrolled into a straight line.',
    { fig: 'discCircles' },
    'Now measure it, and measure across the can too. Divide the first by the second.',
    'Do it with a mug, a coin, a bicycle wheel. You always get about **3.14**.',
    'Not roughly. Always — for every circle that has ever existed or ever will.',
    { punch: 'That constant ratio is $\\pi$. It is not a fact about *a* circle; it is what makes a circle a circle. $C = \\pi d$ is simply that measurement written down.' }
  ],
  funfact: [
    '**Archimedes** trapped $\\pi$ between polygons drawn inside and outside a circle, reaching 96 sides by hand to prove it lies between $3\\tfrac{10}{71}$ and $3\\tfrac17$.',
    'In 1897 the Indiana state legislature nearly passed a bill that would have implied $\\pi = 3.2$. A visiting mathematician happened to be in the building and talked them out of it.',
    'Computers have now found over 100 trillion digits. NASA uses about **fifteen** — enough to navigate the solar system to within a few centimetres.'
  ],
  vocab: [
    ['Radius', 'Centre to edge. Half the diameter.'],
    ['Diameter', 'All the way across through the centre. $d = 2r$.'],
    ['Circumference', 'The distance around: $C = 2\\pi r = \\pi d$.'],
    ['Arc / sector', 'Part of the edge; a "pizza slice" bounded by two radii.'],
    ['$\\pi$', 'Circumference divided by diameter — the same for every circle, about $3.14159$.']
  ],
  sections: [
    { h: 'Where $\\pi$ comes from', fig: 'piRollOut',
      p: ['Wrap a string round any circular object and measure it, then measure straight across. <strong>Divide the first by the second</strong>.',
          'You <em>always</em> get about $3.14$, whether the circle is a coin or a stadium. That constant ratio is $\\pi$.',
          'So $C \\div d = \\pi$, <strong>which rearranges to</strong> $C = \\pi d$, and since $d = 2r$, also $C = 2\\pi r$.'] },
    { h: 'Area: why $\\pi r^2$', fig: 'piAreaWedges',
      p: ['Cut the circle into thin wedges and lay them alternately point-up and point-down. They interlock into a shape <strong>very close to a rectangle</strong>.',
          'That rectangle is $r$ tall, and its width is half the <strong>circumference</strong>, $\\pi r$.',
          'So the <strong>area</strong> is $\\pi r \\times r = \\pi r^2$. The thinner the wedges, the more exact it becomes.'],
      box: { k: 'key', h: 'Telling them apart', t: '<strong>Circumference</strong> is a length, so it uses $r$ once. Area is a square measure, so it uses $r^2$. If your answer is in cm but you squared, something is wrong.' } },
    { h: 'Radius or diameter?', fig: 'circleRadiusTrap',
      p: ['Both formulas want the <strong>radius</strong>. Problems love to give you the diameter instead.',
          'Using $d$ where $r$ belongs makes a circumference twice too big and an area <em>four</em> times too big.',
          'Write down $r = \\ldots$ as your very first line, <em>every</em> time.'],
      box: { k: 'warn', h: 'Halve it first', t: 'A circle of diameter $10$ has area $\\pi(5)^2 = 25\\pi$, not $\\pi(10)^2 = 100\\pi$.' } },
    { h: 'Parts of a circle',
      p: ['A <strong>semicircle</strong> is half: arc $\\pi r$, area $\\dfrac{1}{2}\\pi r^2$. A <strong>quarter circle</strong> is a quarter of each.',
          'In general, a <strong>sector</strong> of $n$ degrees is $\\dfrac{n}{360}$ of the whole circle — use that fraction for both arc length and sector area.',
          'For a $90°$ sector, $\\dfrac{90}{360} = \\dfrac{1}{4}$.'] },
    { h: 'Exact or decimal?',
      p: ['Leaving the answer as $25\\pi$ <strong>is exact</strong>. Writing $78.5$ uses $\\pi \\approx 3.14$ and is approximate.',
          'Read the question: "in terms of $\\pi$" <strong>means</strong> keep the symbol. "Use $\\pi = 3.14$" means give a decimal.',
          'When several steps are involved, keep $\\pi$ until the very end — <strong>rounding early compounds the error</strong>.'] }
  ],
  examples: [
    { t: 'From diameter', q: 'A circular table has diameter $1.4$ m. Find its circumference and area. Use $\\pi \\approx \\dfrac{22}{7}$.',
      steps: [
        { do: '$r = 1.4 \\div 2 = 0.7$ m', why: 'Always the first line.' },
        { do: '$C = \\pi d = \\dfrac{22}{7} \\times 1.4 = 4.4$ m', why: 'Using $d$ directly is fine for circumference.' },
        { do: '$A = \\pi r^2 = \\dfrac{22}{7} \\times 0.49$', why: '$0.7^2 = 0.49$ — square the radius, not the diameter.' },
        { do: '$= 1.54$ m$^2$', why: 'Note the units: m for $C$, m$^2$ for $A$.' }
      ], ans: '$C = 4.4$ m, $A = 1.54$ m$^2$.' },
    { t: 'A sector', q: 'Find the area of a $60°$ sector of a circle with radius $6$. Give an exact answer.',
      steps: [
        { do: 'The sector is $\\dfrac{60}{360} = \\dfrac{1}{6}$ of the circle.', why: 'Degrees out of $360$.' },
        { do: 'Whole circle: $\\pi(6)^2 = 36\\pi$', why: 'Square the radius first.' },
        { do: '$\\dfrac{1}{6} \\times 36\\pi = 6\\pi$', why: '"Exact" means leave $\\pi$ in.' }
      ], ans: '$6\\pi$' },
    { t: 'Running track', q: 'A shape is a $20$ m by $14$ m rectangle with a semicircle of diameter $14$ m on each short end. Find the perimeter. Use $\\pi \\approx 3.14$.',
      steps: [
        { do: 'The two semicircles make one full circle of diameter $14$.', why: 'Two halves join into a whole — a common shortcut.' },
        { do: 'That circle contributes $C = \\pi \\times 14 \\approx 43.96$ m', why: 'Use $C = \\pi d$ directly.' },
        { do: 'The two straight sides contribute $20 + 20 = 40$ m', why: 'The short ends are no longer on the boundary — the curves replaced them.' },
        { do: '$43.96 + 40 = 83.96$ m', why: 'Add the curved and straight parts.' }
      ], ans: 'About $83.96$ m.' }
  ],
  mistakes: [
    'Using the diameter in $\\pi r^2$. Halve it first: since $r$ is squared, using $d$ makes the area <strong>four</strong> times too big, which is not a near miss.',
    'Mixing up circumference and area. $C = 2\\pi r$ is a length in cm; $A = \\pi r^2$ is a covering in cm$^2$. The units on your answer say immediately which one you found.',
    'Including the straight edge that a semicircle replaced. When a semicircle sits on a rectangle, the shared edge is <em>inside</em> the shape — nobody walks along it, so it is not part of the perimeter.',
    'Rounding $\\pi$ too early. Work in terms of $\\pi$ for as long as you can and round once at the end; rounding at every step lets the error grow.'
  ]
},
{
  id: 'graphs', strand: 'data', fig: 'barLine',
  title: 'Reading Graphs & Estimation',
  big: 'A graph is an argument. Read the scale before the shape, or you will believe whatever it wants you to believe.',
  discover: [
    '**Three shops scored 96, 98 and 100 in a survey.** Here are two bar charts of those numbers.',
    'On the left the shops look almost identical. On the right, shop C towers over shop A.',
    { fig: 'discGraphs' },
    'Same three numbers. Same three bars. The only difference is **where the axis starts**.',
    'The chart on the right begins at $94$, so it shows only the tips of the bars — and a gap of $4$ fills the whole picture.',
    'Neither chart is lying about the numbers. The right one is lying about **how big the difference is**.',
    { punch: 'So the first thing to read on any graph is not the bars — it is the **axis**. Check where it starts, what the gridlines are worth, and only then look at the shape.' }
  ],
  funfact: [
    '**Florence Nightingale** is remembered as a nurse, but she was also a formidable statistician and a fellow of the Royal Statistical Society.',
    'Her "rose diagram" of Crimean War deaths showed that far more soldiers died of preventable disease than of wounds — and showed it in a single picture a politician could not argue with.',
    'Sanitary reform followed. She used a graph because she had already tried tables, and tables had not worked.'
  ],
  vocab: [
    ['Bar graph', 'Compares separate categories.'],
    ['Line graph', 'Shows change over time.'],
    ['Circle graph', 'Shows parts of one whole, as percentages summing to $100\\%$.'],
    ['Scale', 'What one grid step is worth — and where the axis starts.'],
    ['Estimate', 'A deliberately rough answer used to check a precise one.']
  ],
  sections: [
    { h: 'Which graph for which job',
      p: ['<strong>Bar:</strong> comparing separate things — favourite sports, sales by shop.',
          '<strong>Line:</strong> change over time — temperature through the day.',
          '<strong>Circle:</strong> how one whole splits up — a budget. Use it only when the parts really do make $100\\%$.',
          'Using the wrong type is itself an error: a <strong>line graph</strong> joining unrelated categories implies change that is not there.'] },
    { h: 'Read the axis first',
      p: ['Before looking at the bars, read: what is measured, in what units, what is one step worth, and <strong>where does the axis start?</strong>',
          'An axis starting at $90$ instead of $0$ makes a bar of $95$ <strong>look five times taller</strong> than one of $91$, when the real difference is about $4\\%$.',
          'This is the commonest way <strong>a truthful graph tells a misleading story</strong>.'],
      box: { k: 'warn', h: 'The truncated axis', t: 'If a vertical axis does not start at zero, bar heights <em>cannot</em> be compared by eye. Read the numbers instead.' } },
    { h: 'Other ways graphs mislead',
      p: ['<strong>Uneven spacing</strong> on a time axis makes growth look smooth when it is not.',
          '<strong>Pictures scaled in two directions</strong> — doubling the height of an icon also doubles its width, so it looks four times bigger.',
          '<strong>Missing labels</strong>, or percentages in a circle graph that do not add to $100$.'] },
    { h: 'Estimating to check',
      p: ['<strong>Round to friendly numbers</strong> and compute in your head first. $487 \\times 21$ is about $500 \\times 20 = 10{,}000$.',
          'If your calculator says $1{,}023$, something went wrong. That is what the <strong>estimate</strong> is for.',
          'Use <em>compatible</em> numbers, not just rounded ones: for $\\dfrac{7960}{38}$, think $\\dfrac{8000}{40} = 200$.'],
      box: { k: 'slow', h: 'Estimate before, not after', t: 'Do the rough answer <em>first</em>, on paper. Doing it afterwards makes it very easy to talk yourself into whatever the calculator said.' } },
    { h: 'Reading between the marks',
      p: ['If gridlines are $5$ apart and a point sits halfway between $20$ and $25$, <strong>read it as about</strong> $22.5$ — and say "about".',
          '<em>Never</em> report more precision than the graph can show.'] }
  ],
  examples: [
    { t: 'A misleading axis', q: 'A bar chart of test averages has a vertical axis from $70$ to $80$. Class A\'s bar reaches $74$ and Class B\'s reaches $78$. B\'s bar looks twice as tall. Is B twice as good?',
      steps: [
        { do: 'Read the actual values: $74$ and $78$.', why: 'Numbers first, shape second.' },
        { do: 'The real difference is $4$ points.', why: 'Not a doubling by any measure.' },
        { do: 'The bars start at $70$, so only the part above $70$ is drawn: $4$ versus $8$.', why: 'That is why one looks twice the other.' },
        { do: 'As a percentage, $78$ is about $5\\%$ more than $74$.', why: 'The visual impression overstates it roughly tenfold.' }
      ], ans: 'No — the truncated axis exaggerates a $4$-point gap.' },
    { t: 'Circle graph', q: 'A circle graph of a $\\$2{,}400$ budget shows housing at $35\\%$ and food at $20\\%$. How much more is spent on housing?',
      steps: [
        { do: 'Difference in percent: $35\\% - 20\\% = 15\\%$', why: 'Subtract the shares before converting.' },
        { do: '$0.15 \\times 2400 = 360$', why: 'One multiplication instead of two.' },
        { do: 'Check: $840 - 480 = 360$ &check;', why: 'Computing both separately confirms it.' }
      ], ans: '$\\$360$ more.' },
    { t: 'Estimate first', q: 'Estimate $\\dfrac{6{,}138}{29}$, then say whether $211.7$ is reasonable.',
      steps: [
        { do: 'Use compatible numbers: $6000 \\div 30$', why: '$30$ divides $6000$ cleanly — that is the point of "compatible".' },
        { do: '$6000 \\div 30 = 200$', why: 'A quick mental benchmark.' },
        { do: 'The true value should be a bit above $200$.', why: 'The top was rounded down and the bottom rounded up, so both push the estimate low.' },
        { do: '$211.7$ sits just above $200$ &check;', why: 'Reasonable.' }
      ], ans: 'Yes — about $200$, so $211.7$ is sensible.' }
  ],
  mistakes: [
    'Comparing bar heights without checking where the axis starts. A truncated axis can make a $2\\%$ difference look like a landslide. The bars are honest only if the axis begins at zero.',
    'Reading a value more precisely than the gridlines allow. If the lines are every $10$, you can say "about $35$" but not "$34.7$." The extra digit is invented, not read.',
    'Estimating after calculating. The point of an estimate is to give you something to <strong>check</strong> the calculation against; doing it afterwards just copies whatever the calculation said, mistakes included.',
    'Assuming a rising line means a rising quantity. On a graph of <em>rate</em> against time, a falling line can still mean the total is growing — just more slowly. Read the axis label, not the slope.'
  ]
},
{
  id: 'pythagorean', strand: 'geometry', fig: 'pythagoras',
  title: 'Pythagorean Theorem',
  big: 'In any right triangle, the two legs squared add to the hypotenuse squared. It turns a right angle into arithmetic.',
  discover: [
    '**Draw a right triangle with legs 3 and 4. Build a square on each of the three sides.**',
    'Count the little tiles in each square: $9$ on one leg, $16$ on the other.',
    { fig: 'discPythagorean' },
    'Now count the square on the long slanted side. It holds exactly **25**.',
    'And $9 + 16 = 25$. Not approximately — exactly, every time, for every right triangle.',
    'Try it with legs $5$ and $12$: the squares hold $25$ and $144$, and the big one holds $169$.',
    { punch: 'That is what $a^2 + b^2 = c^2$ is saying. The letters look like algebra, but the statement is about **areas of real squares** — which is why the theorem is true rather than merely useful.' }
  ],
  funfact: [
    'The theorem has more known proofs than any other in mathematics — one 1927 collection gathered **370** of them.',
    'One was published in 1876 by **James A. Garfield**, five years before he became President of the United States. His proof uses a trapezium and is genuinely elegant.',
    'Babylonian tablets list Pythagorean triples from around 1800 BC, a thousand years before Pythagoras. What the Greeks added was the proof that it always holds.'
  ],
  vocab: [
    ['Leg', 'One of the two sides forming the right angle.'],
    ['Hypotenuse', 'The side opposite the right angle — always the longest.'],
    ['Pythagorean triple', 'Three whole numbers that fit: $3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, $7$-$24$-$25$.'],
    ['Converse', 'If $a^2 + b^2 = c^2$, then the triangle must be right-angled.']
  ],
  sections: [
    { h: 'The statement, and what the letters mean',
      p: ['$a^2 + b^2 = c^2$, where $a$ and $b$ are the legs and $c$ is the <strong>hypotenuse</strong>.',
          '$c$ is <strong>always</strong> the side opposite the right angle, and always the longest. Getting this wrong is the main source of errors.',
          'The theorem only applies to right triangles. No <strong>right angle</strong>, no formula.'] },
    { h: 'Finding the hypotenuse',
      p: ['Legs $6$ and $8$: $6^2 + 8^2 = 36 + 64 = 100$, so $c = \\sqrt{100} = 10$.',
          'Square both legs, add, then take the <strong>square root</strong>. Three steps, in that order.'],
      box: { k: 'key', h: 'Sanity check', t: 'The <strong>hypotenuse</strong> must be longer than either leg, but shorter than their sum. For legs $6$ and $8$, expect between $8$ and $14$. A "hypotenuse" of $5$ is impossible.' } },
    { h: 'Finding a leg — subtract, do not add', fig: 'pythagLegSubtract',
      p: ['If you know the hypotenuse, <strong>rearrange</strong>: $a^2 = c^2 - b^2$.',
          'Hypotenuse $13$, one leg $5$: $a^2 = 169 - 25 = 144$, so $a = 12$.',
          'Adding here instead of subtracting is <strong>the most common slip in this unit</strong>. Identify the hypotenuse first, and the direction follows.'] },
    { h: 'Triples worth memorising',
      p: ['$3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, $7$-$24$-$25$.',
          'Multiples count too: $6$-$8$-$10$ and $9$-$12$-$15$ are <em>both</em> just $3$-$4$-$5$ scaled.',
          '<strong>Spotting one saves all the arithmetic</strong> — and catching that $10$-$24$-$26$ is $2 \\times (5\\text{-}12\\text{-}13)$ is faster than squaring anything.'] },
    { h: 'The converse: is it a right triangle?', fig: 'pythagConverseTest',
      p: ['<strong>Test the three sides</strong>. If $a^2 + b^2 = c^2$ with $c$ the longest, the triangle is right-angled.',
          '$9, 12, 15$: $81 + 144 = 225 = 15^2$ &check; — right-angled.',
          '$4, 5, 8$: $16 + 25 = 41$ but $64$ — <strong>not right-angled</strong>. Since $41 < 64$, the angle opposite $8$ is obtuse.'] },
    { h: 'Where it actually gets used',
      p: ['The diagonal of a rectangle, the height of a ladder against a wall, <strong>the straight-line distance between two points</strong> on a grid.',
          'On coordinates, <strong>the horizontal and vertical gaps</strong> are the legs, and the distance between the points is the hypotenuse.'] }
  ],
  examples: [
    { t: 'Find the hypotenuse', q: 'A right triangle has legs $9$ and $12$. Find the hypotenuse.',
      steps: [
        { do: '$9^2 + 12^2 = 81 + 144 = 225$', why: 'Square each leg and add.' },
        { do: '$c = \\sqrt{225} = 15$', why: 'Take the root of the total.' },
        { do: 'Check: $15 > 12$ and $15 < 21$ &check;', why: 'Between the longest leg and the sum — plausible. Also $3 \\times (3\\text{-}4\\text{-}5)$.' }
      ], ans: '$15$' },
    { t: 'Find a leg', q: 'A ladder $17$ ft long leans against a wall, its foot $8$ ft out. How high up the wall does it reach?',
      steps: [
        { do: 'The ladder is the hypotenuse: $c = 17$.', why: 'It is opposite the right angle between wall and ground.' },
        { do: '$a^2 = 17^2 - 8^2 = 289 - 64 = 225$', why: 'Subtract, because you are finding a leg.' },
        { do: '$a = \\sqrt{225} = 15$', why: 'An $8$-$15$-$17$ triple.' }
      ], ans: '$15$ feet up the wall.' },
    { t: 'Distance on a grid', q: 'Find the distance between $(2, 3)$ and $(7, 15)$.',
      steps: [
        { do: 'Horizontal gap: $7 - 2 = 5$', why: 'One leg of a right triangle.' },
        { do: 'Vertical gap: $15 - 3 = 12$', why: 'The other leg.' },
        { do: '$5^2 + 12^2 = 25 + 144 = 169$', why: 'Apply the theorem to the two gaps.' },
        { do: '$\\sqrt{169} = 13$', why: 'A $5$-$12$-$13$ triple.' }
      ], ans: '$13$' }
  ],
  mistakes: [
    'Treating a leg as the hypotenuse. $c$ is always <strong>opposite the right angle</strong> and always the longest side. Put the longest length in the wrong place and the arithmetic gives a leg that is longer than the hypotenuse — impossible.',
    'Adding when you should subtract. If you know the hypotenuse and one leg, the missing leg comes from $c^2 - a^2$. Adding gives an answer bigger than the hypotenuse, which the picture immediately disproves.',
    'Forgetting the final square root. $9 + 16 = 25$ is $c^2$, not $c$. Stopping there gives an answer five times too large and still looks plausible.',
    'Using it on a triangle with no right angle. The whole proof rests on that corner. Without a right angle the relationship simply does not hold.'
  ]
},
{
  id: 'functions', strand: 'algebra', fig: 'functionMachine',
  title: 'Functions',
  big: 'A function is a machine: one input goes in, exactly one output comes out. The rule is the machine.',
  discover: [
    '**A currency booth posts one rate: £1 = \\$1.25.** No haggling, no commission.',
    'Hand over £20 and you get \\$25. Hand over £40 and you get \\$50.',
    { fig: 'discFunctions' },
    'Come back tomorrow with £20 and you get \\$25 again. The booth is **reliable** — that is the whole point of posting a rate.',
    'One amount in, one amount out, the same every time. Put it in a table and each input appears once.',
    'And the rule is easy to write: dollars $= 1.25 \\times$ pounds.',
    { punch: 'That reliability is the definition of a **function**. A booth that sometimes gave \\$25 for £20 and sometimes \\$18 would be useless — and it would not be a function either.' }
  ],
  funfact: [
    'The word **function** was introduced by **Leibniz** in 1673, and the notation $f(x)$ by **Euler** in 1734.',
    'For a long time "function" meant something you could write a formula for. Mathematicians only widened it to "any rule pairing each input with one output" in the 1800s.',
    'That widening was forced on them by problems in physics where the rule existed but no formula did.'
  ],
  vocab: [
    ['Function', 'A rule pairing each input with exactly one output.'],
    ['Input / output', 'The value you put in ($x$) and what comes out ($y$).'],
    ['Slope', 'How much $y$ changes for each $1$ that $x$ increases.'],
    ['$y$-intercept', 'The output when $x = 0$ — where the line crosses the vertical axis.'],
    ['Linear function', 'One whose graph is a straight line: $y = mx + b$.']
  ],
  sections: [
    { h: 'The function machine',
      p: ['<strong>Picture a machine with a rule written on it</strong>, say "multiply by $3$, then add $2$". Feed in $4$, out comes $14$.',
          'The rule in symbols is $y = 3x + 2$, or in <strong>function</strong> notation $f(x) = 3x + 2$, so $f(4) = 14$.',
          'The defining condition: the same input must always give the same <strong>output</strong>. One in, exactly one out.'],
      box: { k: 'key', h: 'The test', t: 'If any input produces two different outputs, it is not a <strong>function</strong>. On a graph, that means a vertical line crossing the curve twice.' } },
    { h: 'Four ways to show the same function',
      p: ['<strong>Rule:</strong> $y = 3x + 2$.',
          '<strong>Table:</strong> $x = 0, 1, 2, 3$ giving $y = 2, 5, 8, 11$.',
          '<strong>Graph:</strong> the points $(0,2), (1,5), (2,8)$ lie on a straight line.',
          '<strong>Words:</strong> "a $\\$2$ booking fee plus $\\$3$ per ticket".',
          'Being able to <strong>move between all four</strong> is most of this unit.'] },
    { h: 'Slope and intercept, read from anywhere',
      p: ['In $y = mx + b$, $m$ is the <strong>slope</strong> and $b$ is the $y$-intercept.',
          '<strong>From a table:</strong> the constant jump in $y$ per step of $1$ in $x$ is $m$; the value at $x = 0$ is $b$.',
          '<strong>From a graph:</strong> $m = \\dfrac{\\text{rise}}{\\text{run}}$ between any two points; $b$ is where it crosses the $y$-axis.',
          '<strong>From two points:</strong> $m = \\dfrac{y_2 - y_1}{x_2 - x_1}$, then substitute one point to find $b$.'] },
    { h: 'What the slope means in a story',
      p: ['<strong>Slope is a rate</strong>: dollars per ticket, miles per hour, cm of growth per week.',
          'Positive slope rises, negative slope falls, and <strong>zero slope is flat</strong> — no change.',
          'The $y$-intercept is <strong>the starting amount, before anything happens</strong>: a joining fee, a head start, a tank already part full.'],
      box: { k: 'slow', h: 'Name them in words first', t: 'Before touching the algebra, say aloud: "the <strong>slope</strong> is ___ per ___, and the starting value is ___." Then write $y = mx + b$. The equation almost writes itself.' } },
    { h: 'Linear or not?',
      p: ['A function is <strong>linear</strong> exactly when equal steps in $x$ give equal steps in $y$.',
          '$x = 1, 2, 3$ giving $y = 5, 8, 11$ is linear — the jump is <em>always</em> $+3$.',
          '$y = 1, 4, 9$ is not — <strong>the jumps are</strong> $+3$ then $+5$. That one is $y = x^2$.',
          'And a proportional relationship is just a <strong>linear function</strong> with $b = 0$.'] }
  ],
  examples: [
    { t: 'Rule from a table', q: 'A table gives $x = 0, 1, 2, 3$ and $y = 7, 11, 15, 19$. Write the rule and find $y$ when $x = 10$.',
      steps: [
        { do: 'Check the jumps: $11 - 7 = 4$, $15 - 11 = 4$, $19 - 15 = 4$', why: 'Constant, so it is linear with slope $4$.' },
        { do: 'At $x = 0$, $y = 7$, so $b = 7$.', why: 'The $y$-intercept is read straight off the table.' },
        { do: 'Rule: $y = 4x + 7$', why: 'Check $x = 2$: $8 + 7 = 15$ &check;' },
        { do: '$y = 4(10) + 7 = 47$', why: 'Substitute.' }
      ], ans: '$y = 4x + 7$, and $y = 47$.' },
    { t: 'From two points', q: 'A line passes through $(2, 9)$ and $(5, 21)$. Find its equation.',
      steps: [
        { do: '$m = \\dfrac{21 - 9}{5 - 2} = \\dfrac{12}{3} = 4$', why: 'Change in $y$ over change in $x$.' },
        { do: 'Substitute $(2, 9)$ into $y = 4x + b$: $9 = 8 + b$', why: 'Use a known point to pin down $b$.' },
        { do: '$b = 1$', why: 'So the line crosses the $y$-axis at $1$.' },
        { do: 'Check with $(5, 21)$: $4(5) + 1 = 21$ &check;', why: 'Always verify with the point you did not use.' }
      ], ans: '$y = 4x + 1$' },
    { t: 'A function in a story', q: 'A gym charges $\\$30$ to join plus $\\$22$ a month. Write the rule, and find the cost of a year.',
      steps: [
        { do: 'Slope is $22$ dollars per month.', why: 'The repeating, per-unit amount.' },
        { do: 'Intercept is $30$ — paid before any months pass.', why: 'The value at $x = 0$.' },
        { do: '$y = 22x + 30$', why: 'Slope times months, plus the starting fee.' },
        { do: '$y = 22(12) + 30 = 294$', why: 'A year is $12$ months.' }
      ], ans: '$y = 22x + 30$, so $\\$294$.' }
  ],
  mistakes: [
    'Computing slope as $\\dfrac{\\text{run}}{\\text{rise}}$. It is rise over run, because slope answers "how much does $y$ change for <strong>each step</strong> in $x$" — which puts the $x$ change on the bottom.',
    'Reading $b$ from any point instead of from $x = 0$. The $y$-intercept is the value when $x$ is zero, so only the point on the $y$-axis gives it directly. Any other point needs the equation solved.',
    'Calling a relationship linear after checking one pair of values. Two points always lie on some straight line. Test a <strong>third</strong> — and check that the $x$ values step evenly too.',
    'Rejecting a function because an output repeats. Two different inputs may give the same output; a vending machine can sell crisps from two buttons. Only a repeated <em>input</em> with different outputs breaks it.'
  ]
},

/* ---- Grade 8 units. Course order lives in window.COURSES. ---- */
{
  id: 'transformations', strand: 'geometry', fig: 'transformGrid',
  title: 'Translations, Reflections & Rotations',
  big: 'Three moves — slide, flip, turn — never change a shape. Everything in this unit follows from that one fact.',
  discover: [
    '**Cut a triangle out of card.** Now slide it across the desk, flip it over, and spin it round.',
    'Nothing you just did changed the card. The **same three edges** are still the same three lengths.',
    { fig: 'discTransform' },
    'The dot marks one corner, so you can follow where that corner went.',
    'After the flip the dot is on the *other* side — the card is face down. After the spin it has swung round.',
    'But measure any edge at any moment and you get the same answer. The card was **carried**, never stretched.',
    { punch: 'That is the whole of this unit. Slides, flips and turns are called **rigid motions** because the shape rides along unchanged — so everything that follows is just bookkeeping about *where each corner ended up*.' }
  ],
  funfact: [
    'The word **congruent** comes from Latin *congruere*, "to come together, to agree." Two shapes that agree in every measurement are congruent.',
    '**Euclid** wrote about these motions around 300 BC, but he described them as physically picking a figure up and laying it down on another.',
    'Treating them as rules on coordinates is much newer — it needed **Descartes** to invent the coordinate plane in the 1630s, nearly two thousand years later.'
  ],
  vocab: [
    ['Pre-image', 'The shape you start with. Its corners are labelled $A$, $B$, $C$.'],
    ['Image', 'The shape after the move. Its corners get primes: $A\'$, $B\'$, $C\'$.'],
    ['Rigid motion', 'A move that keeps every length and every angle. Slides, flips and turns are all rigid.'],
    ['Translation', 'A slide. Every point moves the same distance in the same direction.'],
    ['Reflection', 'A flip across a line, like a mirror.'],
    ['Rotation', 'A turn about a fixed point, through a given angle and direction.']
  ],
  sections: [
    { h: 'What stays the same',
      p: ['A slide, a flip and a turn all leave the shape exactly as big and exactly as bent as it was. Side lengths do not change. Angles do not change. <em>Only</em> the position changes.',
          'That is why they are called <strong>rigid</strong> motions — imagine the shape cut from card. You can move the card around, but you cannot stretch it.',
          'Everything else in this unit is <strong>bookkeeping: which point went where</strong>.'],
      box: { k: 'key', h: 'The one thing to remember', t: 'After a rigid motion, the image is <strong>congruent</strong> to the pre-image. Same size, same shape, new position.' } },
    { h: 'Translations: slide', fig: 'slideOnGrid',
      p: ['A <strong>translation</strong> is described by how far right or left and how far up or down. "$5$ right, $2$ down" means add $5$ to every $x$ and subtract $2$ from every $y$.',
          'In symbols: $(x, y) \\to (x + 5,\\ y - 2)$.',
          '<em>Every</em> single point moves by the same amount. If one corner goes $5$ right and $2$ down, so does every other corner.'],
      box: { k: 'slow', h: 'Do it one corner at a time', t: 'Write the three corners in a column. Do the $x$ for all three, then the $y$ for all three. Doing one whole point at a time is where mixed-up coordinates come from.' } },
    { h: 'Reflections: flip', fig: 'flipOnGrid',
      p: ['A <strong>reflection</strong> across the $x$-axis keeps $x$ and flips the sign of $y$: $(x, y) \\to (x,\\ -y)$.',
          'A reflection across the $y$-axis keeps $y$ and <strong>flips the sign of</strong> $x$: $(x, y) \\to (-x,\\ y)$.',
          'Every point ends up the same distance from the mirror line, but on the other side. A point sitting <em>on</em> the mirror line does not move at all.'],
      box: { k: 'warn', h: 'Which sign flips?', t: 'Across the $x$-axis, the $y$ flips. Across the $y$-axis, the $x$ flips. It feels backwards, so say it out loud: "over the $x$-axis, $y$ changes."' } },
    { h: 'Rotations: turn', fig: 'turnAboutOrigin',
      p: ['A <strong>rotation</strong> needs three things: a centre, an angle, and a direction. Almost all school rotations are about the origin, by $90^\\circ$, $180^\\circ$ or $270^\\circ$.',
          'About <strong>the origin</strong>, counter-clockwise: $90^\\circ$ gives $(x, y) \\to (-y,\\ x)$; $180^\\circ$ gives $(x, y) \\to (-x,\\ -y)$; $270^\\circ$ gives $(x, y) \\to (y,\\ -x)$.',
          'If you forget, turn the paper. Physically rotating the page a quarter turn and reading off the new coordinates <em>always</em> works.'],
      box: { k: 'key', h: 'A trick that never fails', t: 'For $90^\\circ$ counter-clockwise: swap the two numbers, then flip the sign of the new first one. $(3, 5) \\to (5, 3) \\to (-5, 3)$.' } },
    { h: 'Describing a move you are shown',
      p: ['Given a <strong>pre-image</strong> and an image, work out which move happened by comparing one matching pair of points.',
          'Same <strong>orientation</strong>, just shifted? Translation. Mirror-flipped? Reflection. Spun round? Rotation.',
          'Then check a second pair of points to make sure. One pair can look like two different moves; two pairs almost <em>never</em> can.']}
  ],
  examples: [
    { t: 'Translating a triangle', q: 'Triangle $ABC$ has $A(1, 2)$, $B(4, 2)$, $C(4, 6)$. Translate it $3$ left and $5$ up.',
      steps: [
        { do: 'Write the rule: $(x, y) \\to (x - 3,\\ y + 5)$', why: 'Left means subtract from $x$; up means add to $y$.' },
        { do: '$A(1, 2) \\to A\'(-2, 7)$', why: '$1 - 3 = -2$ and $2 + 5 = 7$.' },
        { do: '$B(4, 2) \\to B\'(1, 7)$', why: 'Same rule, same amounts.' },
        { do: '$C(4, 6) \\to C\'(1, 11)$', why: 'Check: $A\'B\'$ is still $3$ long, just as $AB$ was.' }
      ], ans: '$A\'(-2, 7)$, $B\'(1, 7)$, $C\'(1, 11)$' },
    { t: 'Reflecting across an axis', q: 'Reflect the point $P(-6, 3)$ across the $x$-axis.',
      steps: [
        { do: 'The mirror is the $x$-axis, so the $y$ changes sign.', why: 'Distance from the $x$-axis is measured by $y$.' },
        { do: '$(-6, 3) \\to (-6, -3)$', why: '$P$ was $3$ above the axis; $P\'$ is $3$ below it.' }
      ], ans: '$P\'(-6, -3)$' },
    { t: 'Rotating about the origin', q: 'Rotate $Q(2, -5)$ by $90^\\circ$ counter-clockwise about the origin.',
      steps: [
        { do: 'Rule: $(x, y) \\to (-y,\\ x)$', why: 'Swap, then negate the new first coordinate.' },
        { do: 'Swap: $(2, -5) \\to (-5, 2)$', why: 'The $y$ value moves to the front.' },
        { do: 'Negate the front: $(5, 2)$', why: '$-(-5) = 5$.' },
        { do: 'Check the distance from the origin.', why: '$\\sqrt{2^2 + 5^2}$ before and $\\sqrt{5^2 + 2^2}$ after — equal, as a rotation demands.' }
      ], ans: '$Q\'(5, 2)$' }
  ],
  mistakes: [
    'Flipping the wrong coordinate. Across the $x$-axis it is the $y$ that changes sign, because $y$ measures how far you are <em>from</em> the $x$-axis. $(6, -4) \\to (6, 4)$. The name and the letter that moves are deliberately mismatched, so say it out loud each time.',
    'Translating one corner and drawing the rest by eye. A translation moves <strong>every</strong> point by the same amount, so if $A$ goes $5$ right then $B$ and $C$ do too. Doing one and guessing the others is how a triangle quietly changes shape.',
    'Mixing up clockwise and counter-clockwise. Unless a question says otherwise, rotations are <strong>counter-clockwise</strong> — the direction angles are measured in. A $90^\\circ$ clockwise turn is the same as $270^\\circ$ counter-clockwise, which is why both labels appear on the same picture.',
    'Expecting a rotation to change the size. It never does. If your image looks bigger, you have dilated it by accident — check that the distance from the origin to a corner is the same before and after.'
  ]
},
{
  id: 'congruence', strand: 'geometry', fig: 'congruentPair',
  title: 'Congruence & Sequences of Transformations',
  big: 'Two shapes are congruent exactly when some sequence of slides, flips and turns carries one onto the other.',
  discover: [
    '**Two pieces fall out of the same cookie cutter.** One lands flat, the other lands turned.',
    'Are they the same piece? You cannot just look — turning makes shapes look different.',
    { fig: 'discCongruent' },
    'So mark the sides. One tick on the short side, two on the medium, three on the long.',
    'Now the question answers itself: **one tick fits one tick**, two fit two, three fit three.',
    'Turning the piece never changed how long its sides were, so the ticks still match.',
    { punch: 'Congruent does not mean "looks the same." It means **some sequence of slides, flips and turns carries one exactly onto the other** — and the tick marks are how you check without doing the carrying.' }
  ],
  funfact: [
    'The symbol $\\cong$ is an equals sign with a $\\sim$ on top. The $\\sim$ means "same shape" and the $=$ means "same size."',
    'So $\\sim$ alone is **similar** and $\\cong$ is **congruent** — the notation is telling you that congruent is similar plus one extra condition.',
    'It was introduced by the German mathematician **Gottfried Leibniz** in the 1670s, the same man who invented much of the notation used in calculus.'
  ],
  vocab: [
    ['Congruent', 'Same size and same shape. Written $\\triangle ABC \\cong \\triangle DEF$.'],
    ['Corresponding parts', 'The pieces that match up: $A$ with $D$, side $AB$ with side $DE$, and so on.'],
    ['Sequence of transformations', 'Two or more moves done one after another.'],
    ['Orientation', 'Whether the labels run clockwise or counter-clockwise around the shape.']
  ],
  sections: [
    { h: 'A definition you can actually use',
      p: ['Older books define <strong>congruent</strong> as "same size and shape". True, but it does not tell you what to do.',
          'The useful version: two figures are congruent if a <strong>sequence of rigid motions</strong> maps one exactly onto the other.',
          'So to prove congruence, <strong>describe the moves</strong>. To use congruence, read off equal sides and equal angles.'],
      box: { k: 'key', h: 'Order of the letters matters', t: 'Writing $\\triangle ABC \\cong \\triangle DEF$ claims $A$ matches $D$, $B$ matches $E$, $C$ matches $F$. Get the order right and <em>every</em> equal pair falls out for free.' } },
    { h: 'Reading corresponding parts',
      p: ['From $\\triangle ABC \\cong \\triangle DEF$ <strong>you may immediately write</strong> $AB = DE$, $BC = EF$, $AC = DF$, and $\\angle A = \\angle D$, $\\angle B = \\angle E$, $\\angle C = \\angle F$.',
          'That is six facts from one statement. Most congruence questions are just asking you to <strong>pick the right one</strong>.'],
      box: { k: 'slow', h: 'Line the letters up', t: 'Write $ABC$ above $DEF$ on two lines. Now the matching letters are in the same column, and you can read off pairs without thinking.' } },
    { h: 'Sequences: doing two moves', fig: 'reflectThenSlide',
      p: ['Do the first move completely, <strong>write down the new coordinates</strong>, then do the second move on those.',
          'Reflect across the $y$-axis, then translate $2$ up: first $(x, y) \\to (-x, y)$, <strong>then that result goes to</strong> $(-x,\\ y + 2)$.',
          'Order usually matters. Reflect-then-translate and translate-then-reflect <strong>often land in different places</strong>.'],
      box: { k: 'warn', h: 'Never merge the steps in your head', t: 'Write the intermediate point down. Combining two rules mentally is the single biggest source of errors in this unit.' } },
    { h: 'Orientation tells you how many flips', fig: 'orientationFlips',
      p: ['Translations and rotations keep the <strong>orientation</strong>: if $A$, $B$, $C$ ran clockwise, so do $A\'$, $B\'$, $C\'$.',
          'A <strong>reflection</strong> reverses it. Two reflections reverse it twice, so back to the original.',
          'If the image is flipped over, <strong>an odd number of reflections</strong> happened. That narrows down your answer fast.']}
  ],
  examples: [
    { t: 'Reading off a congruence statement', q: 'Given $\\triangle PQR \\cong \\triangle STU$ with $PQ = 9$ and $\\angle U = 40^\\circ$, find $ST$ and $\\angle R$.',
      steps: [
        { do: 'Line them up: $P\\!\\to\\!S$, $Q\\!\\to\\!T$, $R\\!\\to\\!U$.', why: 'The order of the letters is the correspondence.' },
        { do: '$PQ$ corresponds to $ST$, so $ST = 9$.', why: 'Corresponding sides of congruent triangles are equal.' },
        { do: '$\\angle R$ corresponds to $\\angle U$, so $\\angle R = 40^\\circ$.', why: 'Corresponding angles are equal too.' }
      ], ans: '$ST = 9$ and $\\angle R = 40^\\circ$' },
    { t: 'Carrying out a sequence', q: 'Point $A(3, -1)$ is reflected across the $x$-axis, then translated $4$ left. Where does it end up?',
      steps: [
        { do: 'Reflection across the $x$-axis: $(3, -1) \\to (3, 1)$', why: 'The $y$ changes sign.' },
        { do: 'Now translate that point $4$ left: $(3, 1) \\to (-1, 1)$', why: 'Subtract $4$ from the $x$ of the <em>new</em> point, not the old one.' }
      ], ans: '$(-1, 1)$' },
    { t: 'Describing the move', q: 'Triangle $ABC$ has $A(1, 1)$, $B(4, 1)$, $C(1, 3)$. Its image has $A\'(1, -1)$, $B\'(4, -1)$, $C\'(1, -3)$. What single transformation was used?',
      steps: [
        { do: 'Compare $x$ values: $1 \\to 1$, $4 \\to 4$, $1 \\to 1$. Unchanged.', why: 'So nothing moved left or right.' },
        { do: 'Compare $y$ values: $1 \\to -1$, $1 \\to -1$, $3 \\to -3$. Each one changed sign.', why: 'That is exactly the rule $(x, y) \\to (x, -y)$.' },
        { do: 'So it is a reflection across the $x$-axis.', why: 'Check orientation: it is reversed, which fits a single reflection.' }
      ], ans: 'A reflection across the $x$-axis' }
  ],
  mistakes: [
    'Writing the letters in the wrong order. $\\triangle ABC \\cong \\triangle DEF$ is a claim that $A$ matches $D$, $B$ matches $E$ and $C$ matches $F$. Write $\\triangle DFE$ instead and you have claimed six different facts, most of them false.',
    'Applying the second transformation to the original point. In a sequence, step two acts on the <em>result</em> of step one. Write the middle point down on its own line — it is the single cheapest way to stop this error.',
    'Assuming order does not matter. Reflect-then-translate and translate-then-reflect usually land in different places, because the mirror does not move with the shape. Try $(1, 1)$ both ways and you will see them separate.',
    'Calling two shapes congruent because they look alike. Two rectangles can look similar and have quite different side lengths. Congruence is a measurement claim, so it needs matching measurements, not a glance.'
  ]
},
{
  id: 'dilations', strand: 'geometry', fig: 'dilationRays',
  title: 'Dilations & Similarity',
  big: 'A dilation multiplies every distance from one fixed point by the same number. Angles survive; lengths do not.',
  discover: [
    '**A projector throws a small slide onto a big wall.** The picture on the wall is larger. Is it a different picture?',
    'The hill is still a hill. The sun is still round. Nothing got bent.',
    { fig: 'discDilate' },
    'Move the wall twice as far from the lamp and the picture becomes twice as wide **and** twice as tall.',
    'Every length doubled. But the corner where the roof meets the wall is still the same corner — **angles did not change at all**.',
    'That is the difference between a dilation and every move in the last unit: distances change, angles do not.',
    { punch: 'So a dilation gives you a shape that is the **same shape at a different size**. Mathematicians call that *similar*, and the multiplier — 2 here — is the **scale factor** $k$.' }
  ],
  funfact: [
    '**Thales of Miletus** measured the height of the Great Pyramid around 600 BC using nothing but its shadow and his own.',
    'He waited until his shadow was exactly as long as he was tall, then measured the pyramid\'s shadow. Same scale factor, so that length *was* the pyramid\'s height.',
    'It is said the Egyptian priests were astonished. The trick is in this unit: two similar triangles, one of them enormous.'
  ],
  vocab: [
    ['Dilation', 'A resizing from a centre point by a scale factor $k$.'],
    ['Centre of dilation', 'The one point that does not move.'],
    ['Scale factor', 'The multiplier $k$. $k > 1$ enlarges, $0 < k < 1$ shrinks.'],
    ['Similar', 'Same shape, possibly different size. Written $\\triangle ABC \\sim \\triangle DEF$.']
  ],
  sections: [
    { h: 'What a dilation does',
      p: ['Pick a <strong>centre</strong>. For every point of the shape, measure its distance from the centre and multiply that distance by $k$, staying on the same ray.',
          'With the centre at <strong>the origin</strong> the rule is beautifully simple: $(x, y) \\to (kx,\\ ky)$.',
          'The image is a scaled copy — <em>every</em> length multiplied by $k$, every angle exactly as it was.'],
      box: { k: 'key', h: 'Angles are untouched', t: 'A <strong>dilation</strong> stretches distances but never bends anything. That is why the image is the same shape, and why similar figures have equal angles.' } },
    { h: 'Reading the scale factor', fig: 'scaleFactorRead',
      p: ['If the image is bigger, $k > 1$. If smaller, $k$ is a fraction between $0$ and $1$. $k = 1$ <strong>leaves everything alone</strong>.',
          'To find $k$ from a picture, divide any image length by the matching <strong>pre-image</strong> length: $k = \\dfrac{\\text{image}}{\\text{original}}$.',
          'Do it with two different pairs of sides. If you get the same $k$ both times, the figures really are <strong>similar</strong>.'],
      box: { k: 'slow', h: 'Which goes on top?', t: 'New over old. If a side of $4$ becomes $10$, then $k = \\dfrac{10}{4} = 2.5$ — bigger than one, and the picture got bigger. Sanity check it that way <em>every</em> time.' } },
    { h: 'Similar versus congruent', fig: 'similarVsCongruent',
      p: ['<strong>Congruent</strong> means identical. Similar means the same shape at possibly a different scale.',
          'Every congruent pair is similar, with $k = 1$. <strong>Not every similar pair is congruent</strong>.',
          'In similar figures: <strong>angles are equal</strong>, and <strong>sides are proportional</strong>. Those two sentences solve almost every similarity problem.']},
    { h: 'Finding a missing side',
      p: ['Set up a proportion with <strong>matching sides in matching positions</strong>, then cross-multiply.',
          'If $\\triangle ABC \\sim \\triangle DEF$ then $\\dfrac{AB}{DE} = \\dfrac{BC}{EF} = \\dfrac{AC}{DF}$.',
          'Keep the same triangle on top in every fraction. Flipping one of them midway is <strong>the classic slip</strong>.'],
      box: { k: 'warn', h: 'Perimeter scales by $k$, area by $k^2$', t: 'Double every side and the <strong>perimeter</strong> doubles, but the area becomes four times as large. For volume it is $k^3$.' } }
  ],
  examples: [
    { t: 'Dilating from the origin', q: 'Dilate $A(6, -4)$ by a scale factor of $\\dfrac{1}{2}$, centred at the origin.',
      steps: [
        { do: 'Rule: $(x, y) \\to \\left(\\tfrac{1}{2}x,\\ \\tfrac{1}{2}y\\right)$', why: 'Centre at the origin makes it pure multiplication.' },
        { do: '$\\tfrac{1}{2}(6) = 3$ and $\\tfrac{1}{2}(-4) = -2$', why: 'Halve both coordinates, signs and all.' },
        { do: 'Sanity check: $k < 1$, so the point moved closer to the origin.', why: '$(3, -2)$ is indeed nearer than $(6, -4)$.' }
      ], ans: '$A\'(3, -2)$' },
    { t: 'Finding the scale factor', q: 'A rectangle $8$ by $12$ is dilated into a rectangle $20$ by $30$. Find $k$.',
      steps: [
        { do: 'Use a matching pair: $k = \\dfrac{20}{8} = 2.5$', why: 'New over old.' },
        { do: 'Check with the other pair: $\\dfrac{30}{12} = 2.5$ &check;', why: 'Both give the same factor, so it really is a dilation.' }
      ], ans: '$k = 2.5$' },
    { t: 'Missing side in similar triangles', q: '$\\triangle ABC \\sim \\triangle DEF$ with $AB = 6$, $DE = 9$ and $BC = 8$. Find $EF$.',
      steps: [
        { do: 'Scale factor: $k = \\dfrac{DE}{AB} = \\dfrac{9}{6} = \\dfrac{3}{2}$', why: 'Going from $\\triangle ABC$ to $\\triangle DEF$.' },
        { do: '$EF = k \\cdot BC = \\dfrac{3}{2} \\times 8$', why: 'Every side in $\\triangle DEF$ is $\\tfrac{3}{2}$ times its partner.' },
        { do: '$EF = 12$', why: 'Check: $\\dfrac{12}{8} = 1.5$, matching $\\dfrac{9}{6}$.' }
      ], ans: '$EF = 12$' }
  ],
  mistakes: [
    'Dividing old by new. The scale factor is $\\dfrac{\\text{new}}{\\text{old}}$, so a side of $4$ becoming $10$ gives $k = 2.5$. Get it upside down and you get $0.4$, which claims the picture shrank when you can see that it grew.',
    'Adding the scale factor instead of multiplying. A dilation multiplies every distance from the centre. Adding $2$ to each side turns a $3$-$4$-$5$ triangle into $5$-$6$-$7$, which is not even the same shape any more.',
    'Assuming area scales by $k$ too. Double every side and you get <strong>four</strong> times the area, because area is a length times a length and both of them doubled. For volume it is $k^3$, for the same reason.',
    'Flipping one fraction in a proportion. $\\dfrac{AB}{DE} = \\dfrac{BC}{EF}$ keeps the first triangle on top in both. Turn one over and you are solving a different, wrong equation that often still gives a tidy-looking answer.'
  ]
},
{
  id: 'multistep', strand: 'algebra', fig: 'equationSteps',
  title: 'Multi-Step Equations',
  big: 'Distribute, collect, then undo. Every linear equation, however long, yields to that order.',
  discover: [
    '**Three sealed bags and seven weights balance two sealed bags and twelve weights.** Every bag holds the same amount.',
    'You cannot open a bag. But the scale is level, and that is information.',
    { fig: 'discMultistep' },
    'Lift two bags off the left pan. The scale tips — unless you lift two off the right pan as well.',
    'Do both, and one bag plus seven weights now balances twelve weights. Take seven weights off each side.',
    'One bag balances five weights. Without ever opening it, you know **each bag holds five**.',
    { punch: 'Every legal step in algebra is that one move: **do the same thing to both sides**. Distributing, collecting and dividing are just ways of tidying up between moves.' }
  ],
  funfact: [
    'The word **algebra** comes from the Arabic *al-jabr*, meaning "the reunion of broken parts" — the act of moving a term to the other side to restore balance.',
    'It is from the title of a book written around 820 AD by **al-Khwārizmī** in Baghdad: *al-Kitāb al-mukhtaṣar fī ḥisāb al-jabr wa-l-muqābala*.',
    'His own name, worn down by centuries of Latin translation, gave us the word **algorithm**.'
  ],
  vocab: [
    ['Like terms', 'Terms with exactly the same variable part: $5x$ and $-2x$, but not $5x$ and $5x^2$.'],
    ['Distribute', 'Multiply a bracket out: $3(x + 4) = 3x + 12$.'],
    ['Inverse operation', 'The move that undoes another: subtract undoes add, divide undoes multiply.'],
    ['Solution', 'A value that makes the two sides genuinely equal.']
  ],
  sections: [
    { h: 'The fixed order',
      p: ['<strong>1.</strong> Distribute any brackets. <strong>2.</strong> Collect like terms on each side. <strong>3.</strong> Get all the variables onto one side. <strong>4.</strong> Undo the constant, then undo the coefficient.',
          'Doing the steps out of order is not wrong, but it is <strong>slower and it makes mistakes far more likely</strong>.',
          'Whatever you do to one side, do to the other. That is the <em>only</em> rule underneath all of this.'],
      box: { k: 'slow', h: 'One line, one move', t: 'Write a new line for <em>every</em> single step and say what you did. Four short lines beat one crossed-out line every time.' } },
    { h: 'Variables on both sides',
      p: ['$7x - 4 = 3x + 12$. Subtract $3x$ from <em>both</em> sides to clear the smaller variable term: $4x - 4 = 12$.',
          'Then $+4$ <strong>to both sides</strong>: $4x = 16$. Then $\\div 4$: $x = 4$.',
          'Moving the smaller coefficient <strong>keeps the remaining one positive</strong>, which is easier to work with.'],
      box: { k: 'key', h: 'Always check', t: 'Put $x = 4$ back in: left is $7(4) - 4 = 24$, right is $3(4) + 12 = 24$. Equal, so it is right. Checking takes ten seconds and catches nearly everything.' } },
    { h: 'Brackets and fractions',
      p: ['Distribute first: $2(3x - 5) = 6x - 10$. The multiplier hits <em>every</em> term inside, including the one being subtracted.',
          'With a negative outside, every sign inside flips: $-4(x - 2) = -4x + 8$.',
          'With fractions, multiply every term on both sides by the <strong>common denominator</strong> to clear them all at once.'],
      box: { k: 'warn', h: 'The forgotten second term', t: '$3(x + 4) = 3x + 4$ is wrong. It is $3x + 12$. Draw two little arrows from the $3$ to remind yourself there are two targets.' } },
    { h: 'No solution, or every solution',
      p: ['Sometimes the variables all cancel. If what is left is false, like $5 = 9$, there is <strong>no solution</strong>.',
          'If what is left is true, like $7 = 7$, then every number works — the two sides were the same expression all along.',
          '<em>Neither</em> case is a mistake. They are real answers, and they show up on tests deliberately.']},
    { h: 'Turning words into an equation',
      p: ['Name the unknown with a letter and write down what it <strong>means</strong>: "let $x$ be the number of hours".',
          '<strong>Translate one phrase at a time</strong>. "Three more than twice a number" is $2x + 3$, not $3 + 2$ and not $2(x + 3)$.',
          'Solve, then answer <strong>the question that was actually asked</strong> — sometimes the question wants $x + 5$, not $x$.']}
  ],
  examples: [
    { t: 'Variables on both sides', q: 'Solve $5x + 8 = 2x - 7$.',
      steps: [
        { do: 'Subtract $2x$ from both sides: $3x + 8 = -7$', why: 'Clear the smaller variable term.' },
        { do: 'Subtract $8$ from both sides: $3x = -15$', why: 'Undo the constant next.' },
        { do: 'Divide both sides by $3$: $x = -5$', why: 'Undo the coefficient last.' },
        { do: 'Check: $5(-5) + 8 = -17$ and $2(-5) - 7 = -17$ &check;', why: 'Both sides agree, so it is correct.' }
      ], ans: '$x = -5$' },
    { t: 'Brackets on both sides', q: 'Solve $4(x - 3) = 2(x + 5)$.',
      steps: [
        { do: 'Distribute: $4x - 12 = 2x + 10$', why: 'Both multipliers hit both terms.' },
        { do: 'Subtract $2x$: $2x - 12 = 10$', why: 'Variables to one side.' },
        { do: 'Add $12$: $2x = 22$', why: 'Then undo the constant.' },
        { do: 'Divide by $2$: $x = 11$', why: 'Check: $4(8) = 32$ and $2(16) = 32$ &check;' }
      ], ans: '$x = 11$' },
    { t: 'A word problem', q: 'A taxi charges a $\\$3$ flag fee plus $\\$2$ per mile. A trip cost $\\$27$. How many miles was it?',
      steps: [
        { do: 'Let $m$ be the number of miles.', why: 'Name the unknown before anything else.' },
        { do: 'Cost $= 3 + 2m$, so $3 + 2m = 27$', why: 'Fixed fee plus a rate times the miles.' },
        { do: 'Subtract $3$: $2m = 24$', why: 'Undo the flag fee.' },
        { do: 'Divide by $2$: $m = 12$ miles', why: 'Check: $3 + 2(12) = 27$ &check;' }
      ], ans: '$12$ miles' }
  ],
  mistakes: [
    'Distributing to only the first term. $3(x + 4)$ is $3x + 12$, not $3x + 4$, because the bracket means "three lots of the whole thing" — and the whole thing includes the $4$. Draw two little arrows from the $3$ so you can see both targets.',
    'Forgetting that a negative multiplier flips every sign inside. $-4(x - 2)$ is $-4x + 8$: the second sign changes too, because $-4 \\times -2$ is positive. Missing it is the single most common source of a sign error.',
    'Doing something to one side only. If you subtract $3x$ on the left you must subtract it on the right, or the two sides stop being equal and every line after that is about a different problem.',
    'Answering the wrong question. Some word problems ask for the total, not for $x$. Solve, then read the question again — it takes five seconds and it is where a lot of correct algebra loses its marks.'
  ]
}
,
{
  id: 'angles8', strand: 'geometry', fig: 'parallelCut',
  title: 'Angle Relationships',
  big: 'Parallel lines cut by a transversal make only two different angles. Knowing which is which unlocks every diagram.',
  discover: [
    '**A straight road crosses two parallel railway tracks.** It meets the first track at some tilt.',
    'Now walk along the road to the second track. Has the road changed direction? No — it is straight.',
    { fig: 'discAngles8' },
    'Have the tracks changed direction? No — they are parallel, so they point the same way.',
    'So the road meets the second track at **exactly the same tilt** it met the first. It has to.',
    'That is why the angle in the same position repeats: nothing about the meeting changed.',
    { punch: 'Eight angles appear in the picture, but only **two different sizes** — here $55^\\circ$ and $125^\\circ$. Find one angle and you can label all eight.' }
  ],
  funfact: [
    'That parallel lines behave this way cannot be proved from Euclid\'s other rules. He had to assume it, as his fifth postulate, and it bothered mathematicians for two thousand years.',
    'In the 1820s **Bolyai** and **Lobachevsky** tried assuming it was *false* — and instead of contradiction they found a complete, consistent geometry.',
    'Einstein later used that non-Euclidean geometry to describe gravity. The awkward fifth postulate turned out to be a fact about our universe, not about logic.'
  ],
  vocab: [
    ['Transversal', 'A line that crosses two or more other lines.'],
    ['Corresponding angles', 'Same position at each crossing. Equal when the lines are parallel.'],
    ['Alternate interior angles', 'Between the parallels, on opposite sides of the transversal. Equal.'],
    ['Co-interior angles', 'Between the parallels, same side. They add to $180^\\circ$.'],
    ['Exterior angle', 'The angle formed by extending one side of a triangle.']
  ],
  sections: [
    { h: 'Two angles, eight positions',
      p: ['When a <strong>transversal</strong> crosses two parallel lines, eight angles appear — but only two different sizes. Call them $a$ and $180 - a$.',
          '<em>Every</em> angle in the picture is one or the other. If you can find a single angle, you can label all eight.',
          'So the real skill is not memorising six names. It is <strong>spotting which of the two sizes</strong> an angle is.'],
      box: { k: 'key', h: 'The fastest method', t: 'Find one angle. Then any angle that looks the same size <em>is</em> the same size, and any angle that looks different adds with it to $180^\\circ$. On a decently drawn diagram this is reliable.' } },
    { h: 'The named pairs', fig: 'anglePairs',
      p: ['<strong>Corresponding</strong> (an F shape): equal.',
          '<strong>Alternate interior</strong> (a Z shape): equal.',
          '<strong>Co-interior</strong> (a C or U shape): add to $180^\\circ$.',
          '<strong>Vertical</strong> angles, at a single crossing: always equal, parallel or not.'],
      box: { k: 'slow', h: 'Trace the letter', t: 'Put your finger on the diagram and trace an F, a Z, or a C. If you can trace the letter through the two angles, you have found that pair.' } },
    { h: 'Angles in a triangle', fig: 'triangleSum',
      p: ['The three angles of any triangle add to $180^\\circ$. This is not a coincidence — it follows from the <strong>parallel</strong> line rules.',
          'An <strong>exterior angle</strong> equals the sum of the two <strong>remote interior</strong> angles. If the interior angles are $50^\\circ$ and $60^\\circ$, the exterior angle at the third vertex is $110^\\circ$.',
          'That is quicker than finding the third angle and subtracting, though <em>both</em> work.'],
      box: { k: 'warn', h: 'Remote means the other two', t: 'The exterior angle equals the sum of the two angles it does <em>not</em> touch. It is the neighbour of the third one, and those two add to $180^\\circ$.' } },
    { h: 'Angle-angle similarity', fig: 'twoAnglesForce',
      p: ['If two angles of one triangle equal two angles of another, the third pair <em>must</em> match too, because all three add to $180^\\circ$.',
          'So two equal angles are enough to prove two triangles are <strong>similar</strong>. This is the AA criterion.',
          'Parallel lines inside a figure <strong>hand you equal angles for free</strong>, which is why similarity and parallel lines turn up in the same problems.']}
  ],
  examples: [
    { t: 'Labelling from one angle', q: 'Two parallel lines are cut by a transversal. One angle is $72^\\circ$. Find the co-interior angle and the corresponding angle.',
      steps: [
        { do: 'Corresponding angles are equal, so that one is $72^\\circ$.', why: 'Same position at the other crossing.' },
        { do: 'Co-interior angles add to $180^\\circ$: $180 - 72 = 108^\\circ$', why: 'Same side, between the parallels.' },
        { do: 'So every angle in the figure is $72^\\circ$ or $108^\\circ$.', why: 'Only two sizes exist. Check: $72 + 108 = 180$ &check;' }
      ], ans: 'Corresponding $72^\\circ$, co-interior $108^\\circ$' },
    { t: 'Solving for x', q: 'Two parallel lines are cut by a transversal. One angle is $(3x + 10)^\\circ$ and its alternate interior partner is $(5x - 30)^\\circ$. Find $x$.',
      steps: [
        { do: 'Alternate interior angles are equal: $3x + 10 = 5x - 30$', why: 'Set the two expressions equal.' },
        { do: 'Subtract $3x$: $10 = 2x - 30$', why: 'Collect the variables.' },
        { do: 'Add $30$: $40 = 2x$, so $x = 20$', why: 'Check both angles: $3(20)+10 = 70$ and $5(20)-30 = 70$ &check;' }
      ], ans: '$x = 20$' },
    { t: 'Exterior angle of a triangle', q: 'A triangle has interior angles $47^\\circ$ and $68^\\circ$. Find the exterior angle at the third vertex.',
      steps: [
        { do: 'The exterior angle equals the sum of the two remote interior angles.', why: 'That is the exterior angle theorem.' },
        { do: '$47 + 68 = 115^\\circ$', why: 'Add the two angles it does not touch.' },
        { do: 'Check the long way: third angle $= 180 - 115 = 65$, and $180 - 65 = 115$ &check;', why: 'Both routes agree.' }
      ], ans: '$115^\\circ$' }
  ],
  mistakes: [
    'Setting co-interior angles equal instead of adding them to $180^\\circ$. They sit on the same side of the transversal, so together they make a straight line — $55 + 125 = 180$. Only when both happen to be $90^\\circ$ are they also equal.',
    'Using the parallel-line rules on lines that are not parallel. Everything in this unit depends on the two lines pointing the same way. If the diagram does not say parallel and shows no arrows, you cannot assume it.',
    'Adding a triangle\'s angles to $360^\\circ$. That is a quadrilateral. A triangle is $180^\\circ$ — tear the three corners off a paper triangle and they fit together along a straight edge.',
    'Using the neighbour as a remote interior angle. The exterior angle equals the two angles it does <strong>not</strong> touch. The one it does touch is its supplement, so if you use that you will be $180^\\circ$ out.'
  ]
},
{
  id: 'slope', strand: 'algebra', fig: 'slopeTriangle',
  title: 'Slope & Unit Rate',
  big: 'Slope is a rate of change wearing a geometric coat: how much $y$ moves for every one step in $x$.',
  discover: [
    '**A wheelchair ramp runs from the pavement up to a door.** How steep is it?',
    '"It rises two metres" is not an answer — over what distance? A two-metre rise over one metre is a wall; over a hundred metres it is nearly flat.',
    { fig: 'discSlope' },
    'So measure both. Near the bottom: across $3$, up $2$. Near the top: across $3$, up $2$ again.',
    'Anywhere you measure, the ramp climbs **2 for every 3 across**. That unchanging ratio is what makes it a ramp and not a hill.',
    'A surface whose ratio changed partway would bend — and a bent line is not a straight line.',
    { punch: '**Slope is that ratio**: rise over run. It is the same number as a unit rate, which is why "$75$ miles per hour" and "slope $75$" are the same idea in different clothes.' }
  ],
  funfact: [
    'The $m$ in $y = mx + b$ has no agreed origin. The popular story that it stands for French *monter*, "to climb," appears to be invented — **Descartes** wrote in French and never used it.',
    'One historian traced the earliest $m$ to an 1844 British textbook, where the author simply used the letters $m$ and $b$ without comment.',
    'In other countries the letters differ: Germany uses $y = mx + n$, Sweden $y = kx + m$. The mathematics is identical; only the habit differs.'
  ],
  vocab: [
    ['Slope', 'Rise divided by run. The letter $m$.'],
    ['Rise', 'The vertical change, $y_2 - y_1$.'],
    ['Run', 'The horizontal change, $x_2 - x_1$.'],
    ['Unit rate', 'The amount per one — miles per hour, dollars per pound. The same number as the slope.']
  ],
  sections: [
    { h: 'One idea, two names',
      p: ['A line climbing $3$ units for every $4$ across has slope $\\dfrac{3}{4}$. A car covering $150$ miles every $2$ hours has a <strong>unit rate</strong> of $75$ mph.',
          'They are <strong>the same calculation</strong>: change in the output divided by change in the input.',
          'Once you see that, every "find the unit rate" question is a <strong>slope</strong> question and every slope question is about a rate.'],
      box: { k: 'key', h: 'Slope formula', t: '$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$. Rise on top, run on the bottom. Subtract in the same order in both places.' } },
    { h: 'Reading slope from a graph',
      p: ['Find two points that sit exactly on lattice crossings. Count up or down to get the <strong>rise</strong>, then across to get the run.',
          'Up is positive rise, down is negative. <strong>Right is positive run</strong>.',
          'Pick points far apart — <strong>a long triangle is far more accurate</strong> to read than a short one.'],
      box: { k: 'slow', h: 'Count, do not guess', t: 'Put your pencil on the first point. Count the grid squares up, out loud. Then count across. Write the fraction. <em>Only</em> then simplify.' } },
    { h: 'Positive, negative, zero, undefined',
      p: ['<strong>Uphill left to right</strong>: positive. Downhill: negative.',
          'A horizontal line has rise $0$, so $m = 0$. Flat, and <strong>going nowhere vertically</strong>.',
          'A vertical line has run $0$, and dividing by zero is not allowed, so its slope is <strong>undefined</strong>. Not zero — undefined.'],
      box: { k: 'warn', h: 'Zero and undefined are opposites', t: 'Horizontal: <strong>slope</strong> $0$, equation $y = 5$. Vertical: slope undefined, equation $x = 5$. Learn them as a pair or you will swap them.' } },
    { h: 'Proportional relationships',
      p: ['If a line passes through the origin, then $y = mx$ and the relationship is <strong>proportional</strong>.',
          'In a <strong>proportional</strong> table, $\\dfrac{y}{x}$ is the same for every row. That common value is the unit rate.',
          'If the line misses <strong>the origin</strong>, the relationship is still linear, but not proportional — there is a starting amount.'],
      box: { k: 'key', h: 'Comparing two rates', t: 'The steeper line has the larger <strong>unit rate</strong>. To compare a graph with a table, work out both unit rates and compare the numbers.' } }
  ],
  examples: [
    { t: 'Slope from two points', q: 'Find the slope of the line through $(2, 3)$ and $(8, 12)$.',
      steps: [
        { do: 'Rise: $12 - 3 = 9$', why: 'Change in $y$, second minus first.' },
        { do: 'Run: $8 - 2 = 6$', why: 'Change in $x$, in the same order.' },
        { do: '$m = \\dfrac{9}{6} = \\dfrac{3}{2}$', why: 'Always simplify the fraction.' }
      ], ans: '$m = \\dfrac{3}{2}$' },
    { t: 'A negative slope', q: 'Find the slope through $(-1, 7)$ and $(3, -5)$.',
      steps: [
        { do: 'Rise: $-5 - 7 = -12$', why: 'The line drops as $x$ increases.' },
        { do: 'Run: $3 - (-1) = 4$', why: 'Subtracting a negative adds.' },
        { do: '$m = \\dfrac{-12}{4} = -3$', why: 'Down $3$ for every $1$ across, which fits a falling line.' }
      ], ans: '$m = -3$' },
    { t: 'Unit rate from a table', q: 'A table shows $2$ hours for $\\$26$, $5$ hours for $\\$65$, $8$ hours for $\\$104$. Find the hourly rate, and say whether it is proportional.',
      steps: [
        { do: '$26 \\div 2 = 13$', why: 'Dollars per hour for the first row.' },
        { do: '$65 \\div 5 = 13$ and $104 \\div 8 = 13$', why: 'Same ratio every row.' },
        { do: 'So the rate is $\\$13$ per hour and the relationship is proportional.', why: 'A constant ratio means the graph passes through the origin.' }
      ], ans: '$\\$13$ per hour, proportional' }
  ],
  mistakes: [
    'Putting the run on top. Slope is rise over run — vertical over horizontal — because it answers "how much does $y$ change for each step in $x$." Upside down, a steep line comes out shallow.',
    'Subtracting in opposite orders. If you do $y_2 - y_1$ on top you must do $x_2 - x_1$ underneath. Swap one and the sign flips, turning an uphill line into a downhill one.',
    'Calling a vertical line slope zero. Its run is zero, and dividing by zero is not allowed, so the slope is <strong>undefined</strong>. It is the horizontal line that has slope $0$ — learn the pair together or you will keep swapping them.',
    'Calling every straight-line relationship proportional. Proportional needs the line to pass through the origin, so that $\\dfrac{y}{x}$ is the same in every row. A $\\$20$ joining fee breaks that, even though the graph is perfectly straight.'
  ]
},
{
  id: 'linearfn', strand: 'algebra', fig: 'interceptLine',
  title: 'Linear Functions & y = mx + b',
  big: 'Two numbers describe a whole line: where it starts, and how fast it changes.',
  discover: [
    '**You get into a taxi and the meter already reads \\$3.00.** You have not moved an inch.',
    { fig: 'discLinearfn' },
    'Then it ticks up \\$2 every mile. After one mile, \\$5. After two, \\$7. After three, \\$9.',
    'Two different numbers are doing two different jobs. The \\$3 happened **once, at the start**, and never comes back.',
    'The \\$2 happens **again and again**, once per mile. It is a rate; the \\$3 is not.',
    { punch: 'Those are exactly the two numbers in $y = mx + b$. The **$b$** is what you owe before anything happens; the **$m$** is what each additional one costs. Every linear situation splits this way.' }
  ],
  funfact: [
    'Taximeters were invented in 1891 by **Wilhelm Bruhn** — and Berlin cab drivers hated them so much that they threw one into the river Spree.',
    'Until then fares were argued at the end of the journey. The meter made the rule public and fixed, which is precisely what an equation does.',
    'The word *taxi* is short for **taximeter**, from Latin *taxa*, "charge," and Greek *metron*, "measure."'
  ],
  vocab: [
    ['Slope-intercept form', '$y = mx + b$, with $m$ the slope and $b$ the $y$-intercept.'],
    ['$y$-intercept', 'The $y$ value when $x = 0$ — where the line crosses the $y$-axis.'],
    ['$x$-intercept', 'The $x$ value when $y = 0$ — where it crosses the $x$-axis.'],
    ['Initial value', 'The same thing as $b$ in a real-world context: the starting amount.']
  ],
  sections: [
    { h: 'Reading the equation',
      p: ['In $y = 4x - 7$, the slope is $4$ and the $y$-intercept is $-7$. The number multiplying $x$ is <em>always</em> the slope.',
          'Watch the sign: $y = 4x - 7$ has $b = -7$, not $7$.',
          'If the equation is not in this form, <strong>rearrange it first</strong>. $2y = 6x + 10$ becomes $y = 3x + 5$.'],
      box: { k: 'warn', h: 'Solve for $y$ first', t: 'You cannot read $m$ and $b$ off $3x + y = 12$. Rearranged, it is $y = -3x + 12$, so $m = -3$ — negative, which you would have missed.' } },
    { h: 'Graphing from the equation',
      p: ['Plot $b$ on the $y$-axis. That is your starting point, and <strong>it needs no calculation</strong>.',
          'From there, use the slope as instructions: $m = \\dfrac{2}{3}$ <strong>means</strong> up $2$, right $3$. Mark the new point.',
          'Do it twice more, then draw the line through all of them. <strong>Three points catch an arithmetic slip</strong> that two would hide.'],
      box: { k: 'slow', h: 'Always start at $b$', t: 'Dot on the $y$-axis first. Then count. Starting anywhere else is what makes graphs come out shifted.' } },
    { h: 'Writing the equation from a graph',
      p: ['Read $b$ straight off the $y$-axis. Then <strong>build a slope triangle</strong> between two lattice points and read $m$.',
          'Write $y = mx + b$ with your two numbers in place. Then <strong>test it on a third point</strong> from the graph.',
          'If the third point fails, you misread one of the two numbers. Nearly always it is <strong>the sign of</strong> $m$.']},
    { h: 'Linear functions in words',
      p: ['"A gym charges $\\$40$ to join and $\\$25$ a month" is $y = 25x + 40$. <strong>The joining fee is</strong> $b$; the monthly charge is $m$.',
          'Ask two questions: what happens at the very start, with nothing used? And <strong>what happens for each additional one</strong>?',
          'The first answer is $b$, the second is $m$. In that order, <strong>the equation writes itself</strong>.'],
      box: { k: 'key', h: 'Proportional is the special case $b = 0$', t: 'No joining fee means the line goes through <strong>the origin</strong>: $y = 25x$. A proportional relationship is just a linear one whose $b$ happens to be zero.' } }
  ],
  examples: [
    { t: 'Reading m and b', q: 'Identify the slope and $y$-intercept of $2x + 4y = 12$.',
      steps: [
        { do: 'Subtract $2x$: $4y = -2x + 12$', why: 'Get the $y$ term alone.' },
        { do: 'Divide every term by $4$: $y = -\\dfrac{1}{2}x + 3$', why: 'Divide each term, not just the first.' },
        { do: 'So $m = -\\dfrac{1}{2}$ and $b = 3$.', why: 'Now it is in $y = mx + b$ form.' }
      ], ans: '$m = -\\dfrac{1}{2}$, $b = 3$' },
    { t: 'Equation from two points', q: 'Write the equation of the line through $(0, 5)$ and $(4, 13)$.',
      steps: [
        { do: '$(0, 5)$ has $x = 0$, so $b = 5$.', why: 'The $y$-intercept is handed to you.' },
        { do: 'Slope: $m = \\dfrac{13 - 5}{4 - 0} = \\dfrac{8}{4} = 2$', why: 'Rise over run.' },
        { do: '$y = 2x + 5$', why: 'Check $(4, 13)$: $2(4) + 5 = 13$ &check;' }
      ], ans: '$y = 2x + 5$' },
    { t: 'A word problem', q: 'A pool holds $300$ gallons and drains at $12$ gallons per minute. Write an equation, then find when it is empty.',
      steps: [
        { do: 'At the start, $300$ gallons, so $b = 300$.', why: 'The initial value.' },
        { do: 'Draining means losing, so $m = -12$.', why: 'The amount goes down each minute.' },
        { do: '$y = -12x + 300$', why: 'Slope-intercept form.' },
        { do: 'Empty means $y = 0$: $0 = -12x + 300$, so $x = 25$ minutes.', why: 'Check: $12 \\times 25 = 300$ gallons gone &check;' }
      ], ans: '$y = -12x + 300$; empty after $25$ minutes' }
  ],
  mistakes: [
    'Reading $m$ and $b$ before solving for $y$. From $3x + y = 12$ the slope looks like $3$, but rearranged it is $y = -3x + 12$ — the slope is <strong>negative</strong>. Always get $y$ alone first, then read.',
    'Dividing only the first term. From $4y = -2x + 12$, dividing by $4$ gives $y = -\\tfrac12 x + 3$; the $12$ must be divided too. Halving one term and not the other quietly changes the line.',
    'Losing the minus sign on the intercept. In $y = 4x - 7$ the value of $b$ is $-7$, not $7$. The sign in front belongs to the number after it, and dropping it moves the whole line fourteen units.',
    'Using a positive slope for something that is decreasing. A draining tank, a cooling drink and a depreciating car all have <strong>negative</strong> $m$. If the story says "loses" or "falls," the slope carries a minus sign.'
  ]
},
{
  id: 'functiondef', strand: 'algebra', fig: 'functionMachine',
  title: 'What Is a Function?',
  big: 'A function is a rule with no ambiguity: one input, exactly one output. That is the whole definition.',
  discover: [
    '**Press B4 on a vending machine and a packet of crisps drops out.** Press B4 again tomorrow — crisps again.',
    { fig: 'discFunction' },
    'That reliability is the whole point of the machine. A machine that gave crisps sometimes and a drink other times would be **useless**, and nobody would put money in it.',
    'Notice what *is* allowed, though. B4 and C2 might both give crisps. Two buttons, one snack — that is fine.',
    'What is never allowed is **one button giving two different things**.',
    { punch: 'A function is exactly that machine: each input gives **exactly one** output. Repeats on the output side are fine; a repeated *input* with different outputs breaks it.' }
  ],
  funfact: [
    'The notation $f(x)$ was introduced by **Leonhard Euler** in 1734. He also gave us $e$, $\\pi$ as we write it, $i$, and the summation sign $\\Sigma$.',
    'Euler went blind in his sixties and still produced roughly half of his total work afterwards, dictating it to his sons.',
    'He is often called the most prolific mathematician in history; it took a society of editors more than a century just to publish his collected papers.'
  ],
  vocab: [
    ['Function', 'A relationship where each input gives exactly one output.'],
    ['Input / output', 'What goes in ($x$) and what comes out ($y$).'],
    ['Domain', 'The set of allowed inputs.'],
    ['Range', 'The set of outputs that actually occur.'],
    ['Function notation', '$f(3) = 7$ means: feed in $3$, get out $7$.']
  ],
  sections: [
    { h: 'The test for a function',
      p: ['Ask one question of every input: does it have more than one output? If yes, not a <strong>function</strong>. If no, it is one.',
          'The input $2$ may not go to both $5$ and $9$. But two different inputs <em>may</em> share an output — that is perfectly allowed.',
          'A vending machine is the image to hold: press B4 and you get the same thing <em>every</em> time.'],
      box: { k: 'key', h: 'Repeats are fine on the output side', t: '$\\{(1, 4), (2, 4), (3, 4)\\}$ is a function. $\\{(1, 4), (1, 9)\\}$ is not. Look for a repeated <strong>input</strong>, nothing else.' } },
    { h: 'The vertical line test',
      p: ['On a graph, slide an imaginary vertical line across. If it ever <strong>touches the curve twice at once</strong>, that $x$ has two $y$ values, so it is not a function.',
          'Straight lines pass, except vertical ones. Parabolas pass. <strong>Circles fail</strong>.',
          'It is the same test as before, <strong>drawn instead of listed</strong>.'],
      box: { k: 'slow', h: 'Use the edge of a ruler', t: 'Lay a ruler vertically on the graph and slide it. Two crossings anywhere means not a <strong>function</strong>. Physically doing it is faster than reasoning about it.' } },
    { h: 'Function notation',
      p: ['$f(x)$ is a name for the <strong>output</strong>, not multiplication. $f(x) = 3x + 1$ and $y = 3x + 1$ say the same thing.',
          '$f(4)$ means <strong>substitute</strong> $4$ for $x$: $f(4) = 3(4) + 1 = 13$.',
          'Going the other way, "$f(x) = 13$, find $x$" <strong>means</strong> solve $3x + 1 = 13$, giving $x = 4$.'],
      box: { k: 'warn', h: '$f(4)$ is not $f \\times 4$', t: 'The brackets mean "evaluate at". If $f(x) = x^2$ then $f(3) = 9$, not $3f$.' } },
    { h: 'Linear or not',
      p: ['A function is <strong>linear</strong> if its graph is a straight line — equivalently, if equal steps in $x$ give equal steps in $y$.',
          'In a table, take the differences between consecutive $y$ values. <strong>Constant differences mean linear</strong>.',
          '$y = x^2$ gives differences $1, 3, 5, 7$ — <strong>not constant, so not linear</strong>. $y = 3x$ gives $3, 3, 3$ — linear.'],
      box: { k: 'key', h: 'Check the $x$ steps too', t: 'Constant $y$ differences only prove linearity if the $x$ values also step evenly. Check both columns.' } },
    { h: 'Describing a graph in words',
      p: ['Say where it <strong>increases, where it decreases</strong>, and where it is flat. Say whether it is linear or curved.',
          'Name the intercepts if they matter, and <strong>any maximum or minimum</strong>.',
          'These qualitative descriptions are <strong>worth real marks</strong> and need no calculation at all.']}
  ],
  examples: [
    { t: 'Is it a function?', q: 'Is $\\{(2, 5), (4, 9), (2, 7), (6, 1)\\}$ a function?',
      steps: [
        { do: 'List the inputs: $2, 4, 2, 6$', why: 'Only the inputs matter for this test.' },
        { do: 'The input $2$ appears twice, going to $5$ and to $7$.', why: 'One input, two different outputs.' },
        { do: 'So it is not a function.', why: 'The definition is broken by that one pair.' }
      ], ans: 'No — the input $2$ has two outputs' },
    { t: 'Evaluating', q: 'If $f(x) = 2x^2 - 5$, find $f(-3)$.',
      steps: [
        { do: 'Replace every $x$ with $-3$: $f(-3) = 2(-3)^2 - 5$', why: 'Substitute with brackets around the negative.' },
        { do: '$(-3)^2 = 9$', why: 'Square first: a negative squared is positive.' },
        { do: '$2(9) - 5 = 18 - 5 = 13$', why: 'Then multiply, then subtract.' }
      ], ans: '$f(-3) = 13$' },
    { t: 'Linear from a table', q: 'Is this linear? $x$: $1, 2, 3, 4$ and $y$: $5, 8, 11, 14$.',
      steps: [
        { do: '$x$ steps: $+1, +1, +1$ — even.', why: 'Check the inputs first.' },
        { do: '$y$ differences: $3, 3, 3$', why: '$8 - 5 = 3$, $11 - 8 = 3$, $14 - 11 = 3$.' },
        { do: 'Constant, so linear with slope $3$.', why: 'At $x = 1$, $y = 5$, so $b = 2$: the rule is $y = 3x + 2$.' }
      ], ans: 'Yes — linear, $y = 3x + 2$' }
  ],
  mistakes: [
    'Rejecting a function because an output repeats. $\\{(1, 4), (2, 4), (3, 4)\\}$ is a perfectly good function — three buttons, same snack. Only a repeated <strong>input</strong> with different outputs disqualifies it.',
    'Reading $f(x)$ as $f$ times $x$. The brackets mean "evaluate at," so $f(3)$ is the output when the input is $3$. If $f(x) = x^2$ then $f(3) = 9$, not $3f$.',
    'Forgetting brackets around a negative. $f(-3)$ with $f(x) = x^2$ means $(-3)^2 = 9$. Typing $-3^2$ gives $-9$, because then the exponent only attaches to the $3$.',
    'Calling a table linear from the $y$ column alone. Constant differences only mean linear if the $x$ values also step evenly. Check both columns, or a table that jumps $1, 2, 4$ in $x$ will fool you.'
  ]
}
,
{
  id: 'systems8', strand: 'algebra', fig: 'systemCross',
  title: 'Systems of Linear Equations',
  big: 'Two conditions at once. The answer is the single pair of numbers that satisfies both.',
  discover: [
    '**Two shops hire out the same bike.** Shop A asks \\$20 to join and \\$6 a day. Shop B asks \\$50 to join but only \\$3 a day.',
    'Which is cheaper? The honest answer is: **it depends how long you need it.**',
    { fig: 'discSystems8' },
    'For a weekend, A wins easily — you are barely paying off B\'s joining fee.',
    'For a month, B wins: those cheaper days add up faster than the \\$30 extra you paid at the door.',
    'Somewhere between the two, the lines cross. On **day 10** both shops charge \\$80.',
    { punch: 'That crossing point is the **solution of the system** — the one pair of numbers that satisfies both rules at once. Before it one shop is cheaper, after it the other, and the question "which is cheaper?" has no answer without it.' }
  ],
  funfact: [
    'The method of elimination appears in the Chinese text *Nine Chapters on the Mathematical Art*, compiled around 200 BC.',
    'Its chapter *Fangcheng* lays out the coefficients in a grid and clears them column by column — essentially the matrix method taught today.',
    'Europe arrived at the same technique roughly **1,800 years later**, and now calls it Gaussian elimination.'
  ],
  vocab: [
    ['System', 'Two or more equations that must hold at the same time.'],
    ['Solution of a system', 'The $(x, y)$ pair that works in every equation.'],
    ['Substitution', 'Solve one equation for a variable, then put that expression into the other.'],
    ['Elimination', 'Add or subtract the equations so one variable disappears.']
  ],
  sections: [
    { h: 'What you are looking for',
      p: ['Graphically, each equation is a line. The solution is where they cross — the one point on <em>both</em> lines.',
          'Algebraically, it is the pair of numbers that makes both equations true. Always check it in <strong>both</strong>.',
          'Parallel lines never cross, so that <strong>system</strong> has no solution. Identical lines cross everywhere, so it has infinitely many.'],
      box: { k: 'key', h: 'Same slope tells you the answer early', t: 'Same slope, different intercept: no solution. Same slope, same intercept: infinitely many. Different slopes: <em>exactly</em> one.' } },
    { h: 'Solving by substitution',
      p: ['Best when one equation <strong>already has a lone variable</strong>, like $y = 2x + 1$.',
          'Put that whole expression into the other equation in place of $y$, <strong>using brackets</strong>. Now there is one variable, so solve it.',
          'Then go back and <strong>substitute</strong> to find the other variable. Answer both — a solution is a pair.'],
      box: { k: 'slow', h: 'Brackets, every time', t: 'Replacing $y$ with $2x + 1$ inside $3y$ gives $3(2x + 1)$, which is $6x + 3$. Writing $3 \\cdot 2x + 1$ loses the $3$ on the constant.' } },
    { h: 'Solving by elimination',
      p: ['Line the equations up. If one variable has <strong>coefficients that are opposites</strong>, add the equations and it vanishes.',
          'If they are identical, subtract instead. If <em>neither</em>, multiply one or both equations first to make them match.',
          '$3x + 2y = 16$ and $3x - 2y = 4$: <strong>add them to get</strong> $6x = 20$. The $y$ terms cancel.'],
      box: { k: 'warn', h: 'Subtracting flips every sign', t: 'When you subtract an equation, <em>every</em> term on that line changes sign, including the one after the equals. Rewrite the line with flipped signs and add instead.' } },
    { h: 'Word problems with two unknowns',
      p: ['<strong>Two unknowns need two equations</strong>. One usually counts things; the other usually counts money, or time, or weight.',
          '"$8$ tickets cost $\\$94$; <strong>adult tickets are</strong> $\\$15$ and child tickets $\\$8$" gives $a + c = 8$ and $15a + 8c = 94$.',
          '<strong>Define your letters in writing</strong> before you set anything up. Half of all errors here are forgetting which letter meant which.']}
  ],
  examples: [
    { t: 'Substitution', q: 'Solve $y = 3x - 4$ and $2x + y = 11$.',
      steps: [
        { do: 'Substitute: $2x + (3x - 4) = 11$', why: 'Replace $y$ with what it equals.' },
        { do: 'Combine: $5x - 4 = 11$', why: '$2x + 3x = 5x$.' },
        { do: '$5x = 15$, so $x = 3$', why: 'Add $4$, then divide by $5$.' },
        { do: '$y = 3(3) - 4 = 5$', why: 'Back-substitute. Check in the other: $2(3) + 5 = 11$ &check;' }
      ], ans: '$(3, 5)$' },
    { t: 'Elimination', q: 'Solve $4x + 3y = 18$ and $4x - y = 2$.',
      steps: [
        { do: 'The $x$ coefficients match, so subtract.', why: 'Subtracting kills the $4x$.' },
        { do: '$(4x + 3y) - (4x - y) = 18 - 2$ gives $4y = 16$', why: '$3y - (-y) = 4y$. Both signs on the second line flipped.' },
        { do: '$y = 4$', why: 'Divide by $4$.' },
        { do: '$4x - 4 = 2$, so $4x = 6$ and $x = 1.5$', why: 'Check the first: $4(1.5) + 3(4) = 6 + 12 = 18$ &check;' }
      ], ans: '$(1.5,\\ 4)$' },
    { t: 'Tickets', q: 'A family buys $8$ tickets for $\\$99$. Adult tickets cost $\\$15$, child tickets $\\$8$. How many of each?',
      steps: [
        { do: 'Let $a$ be adult tickets and $c$ child tickets.', why: 'Name both unknowns before anything else.' },
        { do: 'Count: $a + c = 8$. Cost: $15a + 8c = 99$.', why: 'One equation for how many, one for how much.' },
        { do: 'From the first, $c = 8 - a$. Substitute: $15a + 8(8 - a) = 99$', why: 'Brackets around the whole expression.' },
        { do: '$15a + 64 - 8a = 99$, so $7a = 35$ and $a = 5$', why: 'Collect the $a$ terms, then undo.' },
        { do: '$c = 8 - 5 = 3$', why: 'Check: $15(5) + 8(3) = 75 + 24 = 99$ &check;' }
      ], ans: '$5$ adult and $3$ child tickets' }
  ],
  mistakes: [
    'Finding $x$ and stopping. A system\'s solution is an ordered <strong>pair</strong>, because it names a point. Half an answer scores nothing, and back-substituting takes one line.',
    'Forgetting brackets when substituting. Replacing $y$ with $2x + 1$ inside $3y$ gives $3(2x + 1) = 6x + 3$. Writing $3 \\cdot 2x + 1$ loses the $3$ on the constant and quietly changes the equation.',
    'Flipping only the first sign when subtracting an equation. Subtracting $(4x - y = 2)$ changes <strong>every</strong> term, including the one after the equals. Safer: rewrite that line with all signs flipped, then add.',
    'Checking in one equation only. A wrong pair often satisfies one of the two by luck. It is the second check that catches it, and it costs ten seconds.'
  ]
},
{
  id: 'scatter', strand: 'data', fig: 'scatterCloud',
  title: 'Scatter Plots & Association',
  big: 'Two measurements per person, one dot each. The shape of the cloud is the finding.',
  discover: [
    '**You collect two numbers from each child: hours practised, and test score.**',
    'A table of forty rows is hard to see anything in. So plot each row as a single dot.',
    { fig: 'discScatter' },
    'Now look at the cloud rather than any one dot. It **drifts upward to the right**.',
    'So children who practised more tended to score higher. Not every one of them — the cloud is loose, and one child did badly despite practising.',
    'Which is the point: the finding lives in **the shape of the cloud**, never in a single dot.',
    { punch: 'And notice what the picture cannot tell you. It says practice and score *went together*. It cannot say which caused which, or whether something else — a quiet home, a good night\'s sleep — caused both.' }
  ],
  funfact: [
    'The scatter plot was popularised by **Francis Galton** in the 1880s while studying how tall children of tall parents turned out to be.',
    'He noticed the children were tall, but *less* extreme than their parents — and called it "regression towards mediocrity."',
    'That awkward phrase is why fitting a line to a scatter plot is still called **regression** today, long after anyone meant anything by the word.'
  ],
  vocab: [
    ['Scatter plot', 'A graph of paired data, one dot per case.'],
    ['Association', 'A pattern linking the two variables.'],
    ['Cluster', 'A group of dots bunched together.'],
    ['Outlier', 'A dot far away from the rest of the pattern.'],
    ['Linear association', 'The dots roughly follow a straight line.']
  ],
  sections: [
    { h: 'Building the plot',
      p: ['Each case contributes <strong>one dot</strong>: the first variable gives the $x$ position, the second gives the $y$.',
          'Label both axes with the variable and its units. An unlabelled <strong>scatter plot</strong> says nothing.',
          '<em>Never</em> join the dots. These are separate cases, not one thing changing over time.'],
      box: { k: 'slow', h: 'One row, one dot', t: 'Work down the table one row at a time and put in one dot for each. Reading the table column by column is how points end up transposed.' } },
    { h: 'Four questions to ask',
      p: ['<strong>Direction:</strong> as $x$ goes up, does $y$ tend to go up (positive) or down (negative)?',
          '<strong>Form:</strong> is the pattern roughly a straight line, a curve, or nothing?',
          '<strong>Strength:</strong> are the dots tight to the pattern (strong) or loosely scattered (weak)?',
          '<strong>Unusual points:</strong> any outliers or separate clusters?'],
      box: { k: 'key', h: 'Answer all four', t: 'A full description names direction, form, strength and any <strong>outliers</strong>. A one-word answer like "positive" leaves most of the marks on the table.' } },
    { h: 'Association is not cause',
      p: ['Ice cream sales and drowning deaths rise together. Ice cream does not cause drowning — hot weather drives <em>both</em>.',
          'That hidden third variable is a <strong>confounder</strong>. It is the standard reason two things move together without one causing the other.',
          'You can report an <strong>association</strong> from a scatter plot. You cannot report a cause.'],
      box: { k: 'warn', h: 'The sentence to write', t: 'Say "there is a strong positive <strong>association</strong> between $x$ and $y$", not "$x$ causes $y$". Only a controlled experiment can support the second.' } },
    { h: 'Outliers and clusters',
      p: ['An <strong>outlier</strong> is far from the pattern, not merely far along it. A very tall person on a height-weight plot is not an outlier if their weight fits.',
          'Two separate <strong>clusters</strong> often mean two different groups are mixed together in one plot.',
          'Say what you see and, if you can, suggest why. That is <strong>what a statistician would do</strong>.']}
  ],
  examples: [
    { t: 'Describing a plot', q: 'Hours of sleep against test scores: the dots rise from lower left to upper right, fairly tightly, with one student who slept $9$ hours and scored very low.',
      steps: [
        { do: 'Direction: positive.', why: 'More sleep goes with higher scores.' },
        { do: 'Form: roughly linear.', why: 'The dots follow a straight band, not a curve.' },
        { do: 'Strength: fairly strong.', why: 'They sit close to the band.' },
        { do: 'One outlier: the $9$-hour student with a low score.', why: 'Far from the pattern, not just far along it.' }
      ], ans: 'A fairly strong positive linear association, with one outlier' },
    { t: 'Association or cause?', q: 'A town finds that neighbourhoods with more libraries have higher average incomes. Does building a library raise income?',
      steps: [
        { do: 'There is a positive association between libraries and income.', why: 'That is what the data shows.' },
        { do: 'But wealthier areas can afford more libraries.', why: 'The cause may run the other way.' },
        { do: 'And population size affects both.', why: 'A confounding variable.' },
        { do: 'So no — association, not cause.', why: 'Only an experiment could settle it.' }
      ], ans: 'No. This is an association, with obvious confounders' },
    { t: 'Choosing the variables', q: 'You want to see whether studying longer helps. Which variable goes on which axis?',
      steps: [
        { do: 'Study time is the explanatory variable, so it goes on $x$.', why: 'The thing you think does the explaining goes across.' },
        { do: 'Test score is the response, so it goes on $y$.', why: 'The thing being explained goes up.' },
        { do: 'Label the axes "study time (hours)" and "score (points)".', why: 'Variable and units, both.' }
      ], ans: 'Study time on $x$, score on $y$' }
  ],
  mistakes: [
    'Joining the dots. Each dot is a separate person, so a line between them would claim something exists in between — half a child scoring half a mark. Leave them as dots.',
    'Claiming one variable causes the other. Ice cream sales and drowning deaths rise together, and neither causes the other — hot weather causes both. A third variable like that is called a <strong>confounder</strong>, and a scatter plot can never rule one out.',
    'Calling a point an outlier because it sits at the far right. Far <em>along</em> the pattern is not far <em>from</em> it. A very tall adult is not an outlier on a height-weight plot if their weight fits the trend.',
    'Describing only the direction. A complete answer names direction, form, strength <em>and</em> any unusual points — four things. "Positive" on its own leaves most of the marks on the table.'
  ]
},
{
  id: 'bestfit', strand: 'data', fig: 'trendLine',
  title: 'Lines of Best Fit',
  big: 'One line drawn through the middle of the cloud, then read like any other line: slope and intercept, with units.',
  discover: [
    '**The cloud drifts upward, but no single line goes through every dot.** So which line do you draw?',
    { fig: 'discBestfit' },
    'Lay a ruler through the middle of the cloud. Roughly half the dots should end up above it and half below.',
    'The little gaps are the misses — how far each real child sat from what the line predicted.',
    'A good line keeps those gaps **small and balanced**. A line dragged towards one stray dot makes most of the other gaps worse.',
    { punch: 'That is all a line of best fit is: a **summary**. Its slope tells you the typical gain per extra hour, and its intercept the predicted score at zero hours — both with units, and neither one a claim about cause.' }
  ],
  funfact: [
    'The least-squares method — choosing the line that makes the squared gaps as small as possible — was published by **Legendre** in 1805.',
    '**Gauss** then claimed he had been using it since 1795, which caused a long and bitter priority dispute.',
    'Gauss had used it for something spectacular: predicting where the lost asteroid Ceres would reappear. Astronomers pointed their telescopes where he said, and there it was.'
  ],
  vocab: [
    ['Line of best fit', 'A straight line summarising a linear pattern in a scatter plot.'],
    ['Interpolation', 'Predicting inside the range of the data. Usually safe.'],
    ['Extrapolation', 'Predicting outside the range. Risky.'],
    ['Residual', 'The gap between an actual value and the line\'s prediction.']
  ],
  sections: [
    { h: 'Drawing the line',
      p: ['Aim for the middle of the cloud, with roughly <strong>half the dots above and half below</strong>, following the direction of the pattern.',
          'It does not have to touch any dot. It must not be dragged by a single <strong>outlier</strong>.',
          'Draw it right across the plot with a ruler so you can <strong>read off values at either end</strong>.'],
      box: { k: 'slow', h: 'Squint at the plot', t: 'Step back and half-close your eyes so the dots blur into a band. Draw your line down the middle of that band. This works better than any amount of point-by-point fiddling.' } },
    { h: 'Finding its equation',
      p: ['Pick two points <em>on your line</em> — not two data points — that sit on convenient grid crossings.',
          'Find the slope from them, <strong>read the</strong> $y$-intercept, and write $y = mx + b$.',
          'Two people will get slightly different lines from the same data. <em>Both</em> can be right.'],
      box: { k: 'key', h: 'Use the line, not the dots', t: 'The whole point of the line is that it smooths out the dots. Computing the slope from two raw data points defeats it.' } },
    { h: 'Saying what the numbers mean',
      p: ['The slope is the predicted change in $y$ for <em>every</em> one-unit increase in $x$ — with units attached.',
          '"The slope is $4.5$" <strong>is half an answer</strong>. "Each extra hour of practice is associated with about $4.5$ more points" is a full one.',
          'The intercept is the prediction when $x = 0$. Sometimes that is meaningful; <strong>sometimes it is nonsense</strong>, like a newborn weighing $-2$ kg.'],
      box: { k: 'warn', h: '"Associated with", not "causes"', t: 'The line is a summary of what happened together. It still does not establish cause.' } },
    { h: 'Predicting, and knowing when not to',
      p: ['Substitute an $x$ inside the data range and read off the prediction. That is <strong>interpolation</strong>, and it is reasonable.',
          'Substituting an $x$ far outside the range is <strong>extrapolation</strong>. The pattern may simply stop holding.',
          'A line fitted to children aged $5$ to $12$ will confidently predict that a $40$-year-old is $3$ metres tall. The arithmetic is fine; <strong>the prediction is nonsense</strong>.']}
  ],
  examples: [
    { t: 'Equation from a fitted line', q: 'A line of best fit passes through $(0, 20)$ and $(10, 65)$. Write its equation.',
      steps: [
        { do: '$b = 20$, from the point with $x = 0$.', why: 'That is the $y$-intercept.' },
        { do: '$m = \\dfrac{65 - 20}{10 - 0} = \\dfrac{45}{10} = 4.5$', why: 'Rise over run between the two line points.' },
        { do: '$y = 4.5x + 20$', why: 'Slope-intercept form.' }
      ], ans: '$y = 4.5x + 20$' },
    { t: 'Interpreting the slope', q: 'For $y = 4.5x + 20$, where $x$ is hours practised and $y$ is score, what do $4.5$ and $20$ mean?',
      steps: [
        { do: 'The slope $4.5$ is points per hour.', why: 'Units of $y$ divided by units of $x$.' },
        { do: 'Each additional hour of practice is associated with about $4.5$ more points.', why: 'Say "associated with", not "causes".' },
        { do: 'The intercept $20$ predicts the score with no practice at all.', why: 'Meaningful here, since zero hours is possible.' }
      ], ans: '$4.5$ points per hour; $20$ points predicted with no practice' },
    { t: 'When prediction fails', q: 'The data covers $0$ to $10$ hours. Use $y = 4.5x + 20$ to predict the score after $40$ hours, and comment.',
      steps: [
        { do: '$y = 4.5(40) + 20 = 200$', why: 'The arithmetic is straightforward.' },
        { do: 'But $40$ is far outside the $0$–$10$ range.', why: 'That is extrapolation.' },
        { do: 'And a score of $200$ is likely impossible anyway.', why: 'Most tests stop at $100$.' },
        { do: 'So the prediction is not trustworthy.', why: 'The linear pattern almost certainly flattens out.' }
      ], ans: '$200$ — arithmetically correct, but an unsafe extrapolation' }
  ],
  mistakes: [
    'Computing the slope from two data points. The whole purpose of the line is to smooth out individual dots, so its slope must come from two points <strong>on the line</strong> — ideally on grid crossings, far apart.',
    'Tilting the line to chase an outlier. One unusual dot should not move the summary of the other twenty. If your line no longer splits the cloud in half, it is being pulled.',
    'Giving the slope as a bare number. "$4.5$" is half an answer; "about $4.5$ more points for each extra hour of practice" is a whole one. Slope is a rate, and a rate without units means nothing.',
    'Extrapolating far beyond the data and trusting it. A line fitted to children aged $5$ to $12$ will confidently predict a $40$-year-old is three metres tall. The arithmetic is fine — the assumption that the pattern continues is not.'
  ]
},
{
  id: 'twoway', strand: 'data', fig: 'twoWayGrid',
  title: 'Two-Way Tables',
  big: 'Two yes-or-no questions, four boxes, and a set of totals that must agree. Then turn counts into percentages.',
  discover: [
    '**Ask sixty people two yes-or-no questions: do you own a dog? do you own a cat?**',
    'Every single person lands in exactly one of four groups. Nobody is in two, nobody is in none.',
    { fig: 'discTwoway' },
    'Count them and the four boxes hold $12$, $18$, $20$ and $10$. Those add to $60$, and they must — you asked everybody once.',
    'That is your first check. **If the four counts do not reach the grand total, a box is wrong.**',
    'Now a harder question: are dog owners more likely to own a cat than non-dog-owners?',
    { punch: 'Counts alone cannot tell you, because the groups are different sizes. You have to turn them into percentages — and which total you divide by decides which question you just answered.' }
  ],
  funfact: [
    'A famous trap: in 1973 Berkeley appeared to admit men at a higher rate than women, and was nearly sued.',
    'But broken down department by department, most departments favoured **women**. Women had simply applied more often to the departments that rejected nearly everybody.',
    'This reversal is called **Simpson\'s paradox**, and it is the reason statisticians insist on seeing the two-way table rather than the summary.'
  ],
  vocab: [
    ['Two-way table', 'A table of counts sorted by two categorical variables at once.'],
    ['Joint frequency', 'A count in a single inner cell.'],
    ['Marginal frequency', 'A row total or a column total, out at the margin.'],
    ['Relative frequency', 'A count expressed as a fraction or percentage of some total.']
  ],
  sections: [
    { h: 'Filling the table in',
      p: ['One variable labels the rows, the other labels the columns. <em>Every</em> person lands in exactly one inner cell.',
          'Row totals go down the right-hand edge; column totals go along the bottom. <strong>The bottom-right corner is the grand total</strong>.',
          'Fill in everything you are given, then use the totals to <strong>work out what is missing</strong>.'],
      box: { k: 'slow', h: 'Totals are your check', t: 'Add the row totals. Add the column totals. <em>Both</em> must give the grand total. If they disagree, one inner cell is wrong.' } },
    { h: 'Three different percentages',
      p: ['You can divide a cell by its row total, its column total, or the grand total. All three are legitimate, and <strong>they answer different questions</strong>.',
          '"What percent of cat owners have a dog?" divides by the cat <strong>row</strong> total.',
          '"What percent of dog owners have a cat?" divides by the dog <strong>column</strong> total. Different question, different answer.'],
      box: { k: 'key', h: 'Find the "of"', t: 'The words after "percent of" name the denominator. "Of the students who walk" <strong>means</strong> the walk total goes on the bottom. Underline those words before you divide.' } },
    { h: 'Looking for association',
      p: ['If the percentage is roughly the same across the rows, <strong>the two variables are unrelated</strong>.',
          'If it differs markedly, there is an <strong>association</strong>. $60\\%$ of one group against $25\\%$ of the other is a real difference.',
          'Compare percentages, <em>never</em> raw counts — a bigger group will have bigger counts no matter what.'],
      box: { k: 'warn', h: 'Counts mislead', t: '$40$ out of $200$ is a smaller share than $15$ out of $50$, even though $40 > 15$. Convert to percentages before comparing.' } },
    { h: 'Reading an incomplete table',
      p: ['Work out the easy missing entries first: any row or column with <em>exactly</em> one gap.',
          'Each one you fill may open up another. <strong>Keep going round</strong>.',
          'Finish by checking <em>both</em> sets of totals against the grand total.']}
  ],
  examples: [
    { t: 'Completing a table', q: 'Of $60$ students, $32$ walk. Of the walkers, $12$ bring lunch. Altogether $27$ bring lunch. Complete the table.',
      steps: [
        { do: 'Walk row: $12$ bring lunch, so $32 - 12 = 20$ do not.', why: 'The row must total $32$.' },
        { do: 'Not-walk row total: $60 - 32 = 28$', why: 'The column totals must reach $60$.' },
        { do: 'Lunch column: $27$ total, $12$ from walkers, so $15$ from non-walkers.', why: 'Fill the gap in the lunch column.' },
        { do: 'Non-walkers with no lunch: $28 - 15 = 13$', why: 'Check: $12 + 20 + 15 + 13 = 60$ &check;' }
      ], ans: 'Walk: $12$ / $20$. Not walk: $15$ / $13$' },
    { t: 'Which denominator?', q: 'From that table, what percent of walkers bring lunch? And what percent of lunch-bringers walk?',
      steps: [
        { do: '"Percent of walkers" means divide by $32$.', why: 'The words after "of" give the denominator.' },
        { do: '$\\dfrac{12}{32} = 0.375 = 37.5\\%$', why: 'The first answer.' },
        { do: '"Percent of lunch-bringers" means divide by $27$.', why: 'A different denominator entirely.' },
        { do: '$\\dfrac{12}{27} \\approx 44.4\\%$', why: 'Same cell, different question, different answer.' }
      ], ans: '$37.5\\%$ and about $44.4\\%$' },
    { t: 'Is there an association?', q: '$12$ of $32$ walkers bring lunch; $15$ of $28$ non-walkers do. Is walking associated with bringing lunch?',
      steps: [
        { do: 'Walkers: $\\dfrac{12}{32} = 37.5\\%$', why: 'Convert to a percentage.' },
        { do: 'Non-walkers: $\\dfrac{15}{28} \\approx 53.6\\%$', why: 'Same for the other group.' },
        { do: '$53.6\\%$ against $37.5\\%$ is a noticeable gap.', why: 'About $16$ percentage points.' },
        { do: 'So yes, there is some association in this sample.', why: 'Still not proof of cause.' }
      ], ans: 'Yes — non-walkers bring lunch more often here' }
  ],
  mistakes: [
    'Dividing by the grand total when the question asked about one row. The words after "percent <strong>of</strong>" name the denominator. "Of the cat owners" means divide by the cat row total, not by 60.',
    'Comparing raw counts between groups of different sizes. $40$ out of $200$ is a smaller share than $15$ out of $50$, even though $40 > 15$. Convert to percentages first, every time.',
    'Forgetting that both sets of totals must agree. Add the row totals and add the column totals; both must give the grand total. It is the cheapest way to catch a miscounted cell.',
    'Reading the row variable as the column variable. Transposing the table swaps every "percent of" question for a different one — same cells, completely different answers.'
  ]
},
{
  id: 'distance8', strand: 'geometry', fig: 'distancePlane',
  title: 'Distance on the Coordinate Plane',
  big: 'Draw the right triangle and the distance formula stops being something to memorise.',
  discover: [
    '**You are at the corner of 1st and Oak. Your friend is four blocks east and three blocks north.**',
    'Walking the streets is $4 + 3 = 7$ blocks. Easy.',
    { fig: 'discDistance' },
    'But there is a park between you, and you can cut straight across it. How far is the short cut?',
    'It is not $7$ — the short cut is obviously shorter. It is not $3.5$ either.',
    'The two streets meet at a **right angle**, so you are standing on a right triangle whose legs are $4$ and $3$.',
    { punch: 'And you already know what to do with those: $4^2 + 3^2 = 25$, so the short cut is $\\sqrt{25} = 5$ blocks. **The distance formula is Pythagoras wearing coordinates.**' }
  ],
  funfact: [
    'A rope with $12$ evenly spaced knots, pulled into a $3$-$4$-$5$ triangle, gives a perfect right angle. Egyptian surveyors used exactly this to re-mark field boundaries after the Nile flooded.',
    'They were doing it a thousand years before **Pythagoras** was born, and the Babylonian tablet *Plimpton 322* lists such triples from around 1800 BC.',
    'What the Greeks added was not the fact but the **proof** — the argument that it must hold for every right triangle, not just the ones anyone had tried.'
  ],
  vocab: [
    ['Leg', 'A side of a right triangle next to the right angle.'],
    ['Hypotenuse', 'The longest side, opposite the right angle.'],
    ['Distance formula', '$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.'],
    ['Midpoint', 'The point halfway between two others: average the $x$ values and average the $y$ values.']
  ],
  sections: [
    { h: 'Why it is just Pythagoras', fig: 'distanceLegsGrid',
      p: ['Plot the two points. Draw a horizontal segment and a vertical segment to <strong>make a right triangle</strong> with your two points at the ends of the slanted side.',
          'The horizontal leg is <strong>the difference in the</strong> $x$ values. The vertical leg is the difference in the $y$ values.',
          'Then $a^2 + b^2 = c^2$ gives the distance. That is <strong>the entire derivation of the formula</strong>.'],
      box: { k: 'key', h: 'Draw it every time', t: 'Even once you know the formula, sketching the triangle catches sign errors and tells you roughly what the answer should be.' } },
    { h: 'Using the formula',
      p: ['$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. Subtract, square, add, then <strong>square root</strong>.',
          'The squaring <strong>removes any minus signs</strong>, so subtracting in the wrong order does no harm here.',
          'Leave the answer as <strong>an exact root</strong>, like $\\sqrt{29}$, unless you are asked to round.'],
      box: { k: 'warn', h: 'Square before adding', t: '$\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$, not $3 + 4 = 7$. The root of a sum is not the sum of the roots.' } },
    { h: 'Midpoint', fig: 'midpointAverage',
      p: ['The <strong>midpoint</strong> is the average of the two points: $\\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$.',
          '<strong>Add and halve each coordinate separately</strong>.',
          'Sanity check: the midpoint must sit between the two points in <em>both</em> directions.'],
      box: { k: 'slow', h: 'Add for midpoint, subtract for distance', t: 'Midpoint <strong>adds</strong> then halves. Distance <strong>subtracts</strong> then squares. Mixing them up is common, so say which one you need before you start.' } },
    { h: 'Perimeter and shape',
      p: ['To find the <strong>perimeter</strong> of a shape on a grid, compute each side separately and add.',
          'Equal side lengths can <strong>prove a shape is a rhombus</strong>; equal diagonals can help prove a rectangle.',
          'Two sides with the same slope are <strong>parallel</strong> — that plus lengths settles most "what shape is it?" questions.']}
  ],
  examples: [
    { t: 'Distance between two points', q: 'Find the distance from $(1, 2)$ to $(7, 10)$.',
      steps: [
        { do: 'Horizontal leg: $7 - 1 = 6$', why: 'The run.' },
        { do: 'Vertical leg: $10 - 2 = 8$', why: 'The rise.' },
        { do: '$d = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100}$', why: 'Square each leg, then add.' },
        { do: '$d = 10$', why: 'A $6$-$8$-$10$ triangle, which is a $3$-$4$-$5$ doubled.' }
      ], ans: '$d = 10$' },
    { t: 'An exact answer', q: 'Find the distance from $(-3, 4)$ to $(2, -1)$.',
      steps: [
        { do: 'Run: $2 - (-3) = 5$', why: 'Subtracting a negative adds.' },
        { do: 'Rise: $-1 - 4 = -5$', why: 'Negative is fine; squaring will fix it.' },
        { do: '$d = \\sqrt{5^2 + (-5)^2} = \\sqrt{50}$', why: '$25 + 25 = 50$.' },
        { do: '$\\sqrt{50} = 5\\sqrt{2} \\approx 7.07$', why: '$50 = 25 \\times 2$, so pull out the $5$.' }
      ], ans: '$5\\sqrt{2} \\approx 7.07$' },
    { t: 'Midpoint', q: 'Find the midpoint of the segment from $(-4, 3)$ to $(10, -7)$.',
      steps: [
        { do: '$x$: $\\dfrac{-4 + 10}{2} = \\dfrac{6}{2} = 3$', why: 'Average the $x$ values.' },
        { do: '$y$: $\\dfrac{3 + (-7)}{2} = \\dfrac{-4}{2} = -2$', why: 'Average the $y$ values.' },
        { do: 'Midpoint is $(3, -2)$.', why: 'Between $-4$ and $10$, and between $3$ and $-7$ &check;' }
      ], ans: '$(3, -2)$' }
  ],
  mistakes: [
    'Adding the legs instead of squaring them. $\\sqrt{3^2 + 4^2} = 5$, but $3 + 4 = 7$ — that is the street route, not the short cut. The root of a sum is never the sum of the roots.',
    'Subtracting for the midpoint. Midpoint <strong>adds</strong> then halves; distance <strong>subtracts</strong> then squares. Say which one you need before you start, because the two formulas look alike and do opposite things.',
    'Forgetting the square root at the end. $16 + 9 = 25$ is $d^2$, not $d$. Stopping there gives an answer five times too big, and it looks plausible enough to survive a glance.',
    'Mishandling a negative coordinate. The run from $-2$ to $4$ is $4 - (-2) = 6$, not $2$. Subtracting a negative adds — and the squaring afterwards will hide the error rather than reveal it.'
  ]
},
{
  id: 'scinotation', strand: 'number', fig: 'powerTower',
  title: 'Operations with Scientific Notation',
  big: 'Handle the front numbers and the powers of ten separately, then tidy the result back into proper form.',
  discover: [
    '**Light travels 300 000 000 metres every second.**',
    'Read that number again and say how many zeros it had. Most people have to go back and count.',
    { fig: 'discSciNot' },
    'Now write it as $3 \\times 10^8$. The $8$ does the counting for you, and an $8$ cannot slip the way a row of zeros can.',
    'It says: start at $3$ and slide the decimal point **eight places right**.',
    'The same trick runs the other way. A virus is $0.00000012$ m across — or $1.2 \\times 10^{-7}$, where the minus means slide *left*.',
    { punch: 'This is why every number in science is written this way. Not to look clever, but because **comparing two exponents is easy and comparing two rows of zeros is not**.' }
  ],
  funfact: [
    '**Archimedes** wrote *The Sand Reckoner* around 250 BC to answer a taunt: that the number of grains of sand was beyond counting.',
    'He invented a notation for enormous numbers, then estimated the grains needed to fill the universe as about $10^{63}$.',
    'He had no zero, no decimal point and no exponent notation. He built the whole system from scratch just to make the point.'
  ],
  vocab: [
    ['Scientific notation', '$a \\times 10^n$ where $1 \\leq a < 10$ and $n$ is an integer.'],
    ['Order of magnitude', 'The power of ten — roughly how many digits the number has.'],
    ['Coefficient', 'The front number $a$.'],
    ['Standard form', 'The ordinary way of writing a number, like $47{,}000$.']
  ],
  sections: [
    { h: 'The form itself',
      p: ['The front number must be at least $1$ and less than $10$. So $4.7 \\times 10^4$ is correct; $47 \\times 10^3$ is not, even though <em>both</em> equal $47{,}000$.',
          'A positive exponent <strong>means</strong> a big number. A negative exponent means a small one, between $0$ and $1$.',
          'Converting: count how many places the decimal point has to move. Left moves make the <strong>exponent</strong> go up.'],
      box: { k: 'warn', h: 'Negative exponent does not mean negative number', t: '$3 \\times 10^{-5}$ is $0.00003$ — small, but positive. Only a minus in front of the $3$ would make it negative.' } },
    { h: 'Multiplying and dividing',
      p: ['Multiply the front numbers; add the exponents. Divide the front numbers; <strong>subtract the exponents</strong>.',
          '$(3 \\times 10^5)(2 \\times 10^7) = 6 \\times 10^{12}$.',
          'If the new front number falls outside $1$ to $10$, <strong>fix it</strong>: $20 \\times 10^4$ becomes $2 \\times 10^5$.'],
      box: { k: 'key', h: 'Always tidy at the end', t: 'A front number of $20$ or of $0.5$ <strong>means</strong> you are not finished. Move one factor of ten across and adjust the exponent.' } },
    { h: 'Adding and subtracting',
      p: ['You may <em>only</em> add the front numbers when the exponents match. $3 \\times 10^6 + 4 \\times 10^6 = 7 \\times 10^6$.',
          'If they differ, <strong>rewrite one so they agree</strong>. $3 \\times 10^6 + 4 \\times 10^5 = 3 \\times 10^6 + 0.4 \\times 10^6 = 3.4 \\times 10^6$.',
          'This is the same logic as needing a <strong>common denominator</strong> before adding fractions.'],
      box: { k: 'slow', h: 'Match, add, tidy', t: 'Three steps in that order. Trying to add mismatched <strong>exponents</strong> gives answers that are wrong by factors of ten.' } },
    { h: 'Comparing sizes',
      p: ['Compare the exponents first. <strong>A larger exponent wins outright</strong>, whatever the front numbers are.',
          '<strong>Only when the exponents are equal</strong> do you compare the front numbers.',
          '"How many times bigger?" <strong>means divide</strong>: $\\dfrac{6 \\times 10^8}{2 \\times 10^5} = 3 \\times 10^3$, so three thousand times.']}
  ],
  examples: [
    { t: 'Multiplying', q: 'Compute $(5 \\times 10^6)(4 \\times 10^{-3})$ in scientific notation.',
      steps: [
        { do: 'Front numbers: $5 \\times 4 = 20$', why: 'Multiply the coefficients.' },
        { do: 'Powers: $10^6 \\cdot 10^{-3} = 10^3$', why: 'Add the exponents: $6 + (-3) = 3$.' },
        { do: 'So far $20 \\times 10^3$, but $20$ is too big.', why: 'The front must sit between $1$ and $10$.' },
        { do: '$20 = 2 \\times 10^1$, so the answer is $2 \\times 10^4$', why: 'One more factor of ten moves across.' }
      ], ans: '$2 \\times 10^4$' },
    { t: 'Adding with different exponents', q: 'Compute $7.2 \\times 10^5 + 3 \\times 10^4$.',
      steps: [
        { do: 'The exponents differ, so rewrite the smaller one.', why: 'You cannot add until they match.' },
        { do: '$3 \\times 10^4 = 0.3 \\times 10^5$', why: 'Move the decimal left one place, raise the exponent by one.' },
        { do: '$7.2 \\times 10^5 + 0.3 \\times 10^5 = 7.5 \\times 10^5$', why: 'Now add the front numbers.' },
        { do: '$7.5$ is between $1$ and $10$, so it is finished.', why: 'No tidying needed.' }
      ], ans: '$7.5 \\times 10^5$' },
    { t: 'How many times bigger?', q: 'The Sun is about $1.4 \\times 10^6$ km across; the Earth about $1.3 \\times 10^4$ km. How many times wider is the Sun?',
      steps: [
        { do: 'Divide: $\\dfrac{1.4 \\times 10^6}{1.3 \\times 10^4}$', why: '"How many times" means divide.' },
        { do: 'Front numbers: $1.4 \\div 1.3 \\approx 1.08$', why: 'Just over one.' },
        { do: 'Powers: $10^6 \\div 10^4 = 10^2$', why: 'Subtract the exponents.' },
        { do: '$\\approx 1.08 \\times 10^2 \\approx 108$ times', why: 'About a hundred times wider.' }
      ], ans: 'About $108$ times' }
  ],
  mistakes: [
    'Leaving the front number outside $1$ to $10$. $47 \\times 10^3$ has the right value but is not scientific notation — and two numbers written that way cannot be compared by exponent, which was the entire purpose.',
    'Adding the front numbers while the exponents still differ. $3 \\times 10^6 + 4 \\times 10^5$ is not $7 \\times 10^6$. Rewrite one so they match first — it is the same reason fractions need a common denominator.',
    'Multiplying the exponents instead of adding them. $10^3 \\times 10^4 = 10^7$, because you are stacking three tens next to four tens. Multiplying gives $10^{12}$, which is out by a factor of a hundred thousand.',
    'Reading a negative exponent as a negative number. $3 \\times 10^{-5}$ is $0.00003$ — small, but firmly positive. Only a minus in front of the $3$ would make the number itself negative.'
  ]
},
{
  id: 'volume8', strand: 'geometry', fig: 'solidsTrio',
  title: 'Volume of Cylinders, Cones & Spheres',
  big: 'Three formulas, one family. A cone is a third of its cylinder, and a sphere is two thirds of it.',
  discover: [
    '**Take a cone and a can with the same radius and the same height.** Fill the cone with water and pour it into the can.',
    'It does not fill it. Fill the cone again and pour — still not full.',
    { fig: 'discVolume8' },
    'Fill it a third time, pour, and the can is **exactly full**. Not nearly. Exactly.',
    'Three coneloads. Not two, not four — and it works for any radius and any height you choose.',
    'So a cone holds precisely **one third** of the can that would wrap around it.',
    { punch: 'That is where the $\\tfrac13$ in $V = \\tfrac13 \\pi r^2 h$ comes from. It is not an arbitrary constant to memorise; it is something you can pour. A sphere the width of the can takes two of the three — hence $\\tfrac43 \\pi r^3$.' }
  ],
  funfact: [
    '**Archimedes** proved the sphere is two thirds of its cylinder — and was so pleased that he asked for a sphere inside a cylinder to be carved on his tomb.',
    'He got his wish. Around 75 BC the Roman orator **Cicero** found the neglected, overgrown grave near Syracuse by looking for that carving.',
    'It is the only monument we know of chosen by a mathematician to commemorate a theorem rather than a life.'
  ],
  vocab: [
    ['Cylinder', 'Two parallel circles joined by a curved surface. $V = \\pi r^2 h$.'],
    ['Cone', 'A circle tapering to a point. $V = \\dfrac{1}{3}\\pi r^2 h$.'],
    ['Sphere', 'A ball. $V = \\dfrac{4}{3}\\pi r^3$.'],
    ['Radius', 'Half the diameter. Every one of these formulas wants the radius.']
  ],
  sections: [
    { h: 'The cylinder is the parent', fig: 'cylinderFamily',
      p: ['A <strong>cylinder</strong> is a circle dragged upwards: area of the base times the height, so $V = \\pi r^2 h$.',
          'A <strong>cone</strong> with the same base and height holds exactly one third as much. Fill a cone with water three times and it fills the cylinder.',
          'A <strong>sphere</strong> that just fits inside the cylinder holds exactly two thirds of it. That is Archimedes\' result, and he was proud enough of it to have it carved on his tomb.'],
      box: { k: 'key', h: 'Learn one, get three', t: 'Cylinder $\\pi r^2 h$. Cone is a third of that. Sphere is $\\dfrac{4}{3}\\pi r^3$ — and for a sphere the height <em>is</em> $2r$, so it is two thirds of the cylinder around it.' } },
    { h: 'Radius, not diameter', fig: 'radiusNotDiameter',
      p: ['Almost every mistake in this unit is using the diameter where the formula wants the <strong>radius</strong>.',
          'If you are told the <strong>diameter</strong>, halve it before you do anything else. Write the radius down.',
          'Since $r$ gets squared or cubed, using the diameter makes the answer wrong by a factor of $4$ or $8$ — <strong>not a near miss</strong>.'],
      box: { k: 'warn', h: 'Halve it first, in writing', t: 'Diameter $10$ <strong>means</strong> $r = 5$. Write "$r = 5$" on its own line before substituting. Do not try to remember it mid-calculation.' } },
    { h: 'Working through a calculation',
      p: ['Write the formula. <strong>Substitute</strong> the numbers. Simplify step by step. Then attach cubic units.',
          '$r = 3$, $h = 10$ for a cylinder: $V = \\pi(3)^2(10) = \\pi(9)(10) = 90\\pi \\approx 282.7$.',
          'Leave the answer in terms of $\\pi$ if you can — it is exact, and <strong>it shows the working clearly</strong>.'],
      box: { k: 'slow', h: 'Square before multiplying', t: 'In $\\pi r^2 h$, deal with $r^2$ first, then multiply by $h$. Doing $(rh)^2$ by accident is a common slip.' } },
    { h: 'Working backwards',
      p: ['Given the <strong>volume</strong> and asked for a radius or height, substitute what you know and solve the equation.',
          'Volume $= 100\\pi$ <strong>for a cylinder of height</strong> $4$: $100\\pi = \\pi r^2 (4)$, so $r^2 = 25$ and $r = 5$.',
          'Divide by $\\pi$ early — <strong>it cancels</strong>, and the arithmetic gets much easier.']},
    { h: 'Composite solids', fig: 'siloComposite',
      p: ['A silo is a cylinder with a cone or half-sphere on top. <strong>Find each volume separately and add</strong>.',
          'Watch the heights: the cylinder\'s height is its own, <strong>not the total height of the object</strong>.',
          'For "how much is left" problems, <strong>subtract the smaller volume from the larger</strong> one.']}
  ],
  examples: [
    { t: 'Cylinder from a diameter', q: 'A can has diameter $8$ cm and height $12$ cm. Find its volume in terms of $\\pi$.',
      steps: [
        { do: '$r = 8 \\div 2 = 4$ cm', why: 'The formula needs the radius. Write it down.' },
        { do: '$V = \\pi r^2 h = \\pi (4)^2 (12)$', why: 'Substitute into the cylinder formula.' },
        { do: '$= \\pi (16)(12) = 192\\pi$', why: 'Square first, then multiply.' },
        { do: '$\\approx 603.2$ cm$^3$', why: 'Cubic units, because it is a volume.' }
      ], ans: '$192\\pi \\approx 603.2$ cm$^3$' },
    { t: 'Cone', q: 'Find the volume of a cone with radius $6$ and height $10$, in terms of $\\pi$.',
      steps: [
        { do: '$V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi (6)^2 (10)$', why: 'A cone is a third of its cylinder.' },
        { do: '$= \\dfrac{1}{3}\\pi (36)(10) = \\dfrac{360\\pi}{3}$', why: 'Square, multiply, then take the third.' },
        { do: '$= 120\\pi$', why: 'The matching cylinder would hold $360\\pi$ &check;' }
      ], ans: '$120\\pi$' },
    { t: 'Working backwards', q: 'A sphere has volume $\\dfrac{500\\pi}{3}$. Find its radius.',
      steps: [
        { do: '$\\dfrac{4}{3}\\pi r^3 = \\dfrac{500\\pi}{3}$', why: 'Substitute into the sphere formula.' },
        { do: 'Divide both sides by $\\pi$: $\\dfrac{4}{3}r^3 = \\dfrac{500}{3}$', why: '$\\pi$ cancels straight away.' },
        { do: 'Multiply by $3$: $4r^3 = 500$, so $r^3 = 125$', why: 'Clear the fractions.' },
        { do: '$r = \\sqrt[3]{125} = 5$', why: 'Check: $\\dfrac{4}{3}\\pi(125) = \\dfrac{500\\pi}{3}$ &check;' }
      ], ans: '$r = 5$' }
  ],
  mistakes: [
    'Substituting the diameter where the radius belongs. Since $r$ gets squared or cubed, using $10$ instead of $5$ makes the answer four or eight times too big — not a near miss. Write "$r = 5$" on its own line before you start.',
    'Forgetting the $\\tfrac13$ for a cone. The answer then comes out three times too large, and it looks entirely reasonable. Pouring three coneloads into the can is the picture that stops this.',
    'Squaring the wrong thing. In $\\pi r^2 h$ only the radius is squared, so deal with $r^2$ first and then multiply by $h$. Doing $(rh)^2$ by accident is an easy slip when the numbers are written close together.',
    'Giving square units for a volume. Volume is a length times a length times a length, so the units are cubic. Writing cm$^2$ for a volume signals that something was multiplied one time too few.'
  ]
}
,

/* ---- Grade 9: Algebra I. Course order lives in window.COURSES. ---- */
{
  id: 'expressions9', strand: 'algebra', fig: 'structureTerms',
  title: 'Expressions, Structure & Units',
  big: 'Before you manipulate an expression, read it. Its structure tells you what it means and what you are allowed to do.',
  discover: [
    '**Read this out loud: $3x^2 + 5x - 8$.**',
    'Before you do anything to an expression, you have to see how it is built — the way you see where the words are in a sentence.',
    { fig: 'discExpr' },
    'The $+$ and $-$ signs are the spaces. They cut the expression into three **terms** you can handle one at a time.',
    'And the minus belongs to what follows it. The third term is $-8$, not $8$ — that single habit prevents a great many sign errors later.',
    '*Inside* a term, everything is multiplied. $3x^2$ is $3$ times $x$ times $x$.',
    { punch: 'That difference is why $\\dfrac{3x}{3} = x$ but $\\dfrac{3x + 6}{3} = x + 2$ and never $x + 6$. **You may cancel a factor; you may never cancel a single term.**' }
  ],
  funfact: [
    'For most of history algebra was written out in words. "The thing plus five equals twelve" — every problem, a paragraph.',
    '**François Viète** began using letters for unknowns in 1591, and **Descartes** fixed the convention we still use: letters from the end of the alphabet ($x, y, z$) for unknowns, from the start ($a, b, c$) for knowns.',
    '$x$ became the default unknown partly because early French printers had plenty of spare $x$ blocks — $y$ and $z$ were needed for ordinary French words.'
  ],
  vocab: [
    ['Term', 'A piece separated by $+$ or $-$. In $3x^2 + 5x - 8$ there are three terms.'],
    ['Coefficient', 'The number multiplying a variable.'],
    ['Factor', 'Something being multiplied. In $5(x + 2)$ the factors are $5$ and $(x + 2)$.'],
    ['Degree', 'The largest exponent on the variable.'],
    ['Equivalent expressions', 'Two expressions that give the same value for every input.']
  ],
  sections: [
    { h: 'Terms and factors',
      p: ['$+$ and $-$ signs cut an expression into <strong>terms</strong>. Multiplication and division join things into <strong>factors</strong>.',
          '$3x^2 + 5x - 8$ has three terms. $3x^2$ itself has <strong>factors</strong> $3$, $x$ and $x$.',
          'The sign in front belongs to the <strong>term</strong> after it. The third term is $-8$, not $8$.'],
      box: { k: 'key', h: 'Why it matters', t: 'You may cancel a common <strong>factor</strong> from a fraction. You may never cancel a single <strong>term</strong>. $\\dfrac{3x}{3}$ is $x$; $\\dfrac{3x + 6}{3}$ is $x + 2$, not $x + 6$.' } },
    { h: 'Seeing structure',
      p: ['$x^4 - 16$ <strong>looks like a quartic</strong>, but it is also $(x^2)^2 - 4^2$ — a difference of two squares.',
          '$(a + b)^2 - 9$ has <strong>the same shape</strong>, with $a + b$ playing the part of the single thing being squared.',
          'Looking for <strong>a familiar shape inside an unfamiliar expression</strong> is one of the most useful habits in algebra.'],
      box: { k: 'slow', h: 'Cover it up', t: 'Put your finger over the complicated part and ask what shape is left. If $x^4 - 16$ becomes $\\square^2 - 16$, you know it factors as $(\\square - 4)(\\square + 4)$.' } },
    { h: 'Units and quantities',
      p: ['A formula\'s units tell you whether you have used it correctly. Distance divided by time gives speed; distance times time <strong>gives nothing meaningful</strong>.',
          'When converting, multiply by a fraction equal to $1$: $\\dfrac{60 \\text{ min}}{1 \\text{ hr}}$. Arrange it <strong>so the unwanted unit cancels</strong>.',
          'Choose a scale that fits the data. Measuring a country\'s <strong>population</strong> in units of one person is technically right and practically useless.'],
      box: { k: 'warn', h: 'Cancel the units too', t: '$\\dfrac{45 \\text{ mi}}{1 \\text{ hr}} \\times \\dfrac{1 \\text{ hr}}{60 \\text{ min}} = 0.75$ mi/min. If the units do not cancel down to what you want, the fraction is upside down.' } },
    { h: 'Evaluating and rewriting',
      p: ['To evaluate, substitute with brackets and follow the <strong>order of operations</strong>.',
          'To rewrite, use the distributive property and collect <strong>like terms</strong>. Every step must keep the expression equivalent.',
          '<strong>Check equivalence by trying a value</strong>. If $x = 2$ gives different answers, you made a mistake somewhere.'],
      box: { k: 'key', h: 'Test with a number', t: 'Not sure if $2(x + 3)$ equals $2x + 6$? Try $x = 5$: $2(8) = 16$ and $10 + 6 = 16$. It is not proof, but it catches nearly every real error.' } }
  ],
  examples: [
    { t: 'Naming the parts', q: 'In $7x^3 - 2x + 11$, name the number of terms, the degree, the coefficient of $x$, and the constant.',
      steps: [
        { do: 'Three terms: $7x^3$, $-2x$, $+11$', why: 'The $+$ and $-$ signs mark the boundaries.' },
        { do: 'Degree $3$, from the highest exponent.', why: 'That is $x^3$.' },
        { do: 'The coefficient of $x$ is $-2$.', why: 'The sign belongs to the coefficient.' },
        { do: 'The constant is $11$.', why: 'The term with no variable.' }
      ], ans: '$3$ terms, degree $3$, coefficient $-2$, constant $11$' },
    { t: 'Using structure', q: 'Factor $x^4 - 81$ by seeing its structure.',
      steps: [
        { do: 'Notice $x^4 = (x^2)^2$ and $81 = 9^2$.', why: 'A difference of two squares in disguise.' },
        { do: '$(x^2)^2 - 9^2 = (x^2 - 9)(x^2 + 9)$', why: 'Apply $a^2 - b^2 = (a - b)(a + b)$.' },
        { do: 'And $x^2 - 9$ is itself a difference of squares.', why: 'Keep going while you can.' },
        { do: '$= (x - 3)(x + 3)(x^2 + 9)$', why: '$x^2 + 9$ does not factor over the real numbers.' }
      ], ans: '$(x - 3)(x + 3)(x^2 + 9)$' },
    { t: 'Unit conversion', q: 'A tap runs at $18$ litres per minute. Convert to litres per hour.',
      steps: [
        { do: 'Multiply by $\\dfrac{60 \\text{ min}}{1 \\text{ hr}}$', why: 'Minutes must cancel, so minutes goes on top.' },
        { do: '$\\dfrac{18 \\text{ L}}{1 \\text{ min}} \\times \\dfrac{60 \\text{ min}}{1 \\text{ hr}}$', why: 'The min units cancel diagonally.' },
        { do: '$= 1080$ L per hour', why: 'Sensible: an hour is longer, so the number is bigger.' }
      ], ans: '$1080$ L/hr' }
  ],
  mistakes: [
    'Cancelling a term out of a fraction. In $\\dfrac{3x + 6}{3}$ the $3$ on the bottom divides the <strong>whole</strong> top, so both terms must be divided: $x + 2$. Striking out one $3$ answers a different question.',
    'Dropping the minus from a coefficient. In $9 - 5x$ the coefficient of $x$ is $-5$. The sign in front is part of the number, and forgetting it flips the behaviour of the whole term.',
    'Setting up a conversion so the unwanted unit does not cancel. Multiply by $\\dfrac{60 \\text{ min}}{1 \\text{ hr}}$ and the minutes must appear top and bottom somewhere. If they do not cancel, the fraction is upside down.',
    'Confusing the degree with the number of terms. $7x^3 - 2x + 11$ has three terms and degree three by coincidence; $x^5 + 1$ has two terms and degree five. Degree is the largest exponent, nothing else.'
  ]
},
{
  id: 'solving9', strand: 'algebra', fig: 'balanceScale',
  title: 'Solving Equations & Literal Equations',
  big: 'Every step you take must keep the two sides equal. Say which property justifies it, and the algebra never drifts.',
  discover: [
    '**A sealed bag and three weights sit on one pan. Seven weights sit on the other. The scale is level.**',
    'You are not allowed to open the bag. But the scale has already told you something.',
    { fig: 'discSolving' },
    'Lift three weights off the left. The scale tips — so lift three off the right too, and it is level again.',
    'Now the bag alone balances four weights. **The bag holds four**, and you never opened it.',
    'Every step you took was the same step: change both pans identically, so the balance survives.',
    { punch: 'That is all "do the same to both sides" means. It is not a rule to remember — it is the only kind of move that keeps the statement true. Naming the property beside each line is just saying which move you made.' }
  ],
  funfact: [
    'The equals sign was invented in 1557 by the Welsh mathematician **Robert Recorde**.',
    'He was tired of writing "is equalle to" over and over, and chose two parallel lines because, in his words, no two things can be more equal.',
    'His original $=$ was much longer than ours. It took about a century to catch on; until then most books still wrote the words out.'
  ],
  vocab: [
    ['Literal equation', 'An equation with several letters, to be rearranged for one of them.'],
    ['Properties of equality', 'You may add, subtract, multiply or divide both sides by the same thing (never divide by zero).'],
    ['Extraneous solution', 'A value produced by the algebra that fails in the original equation.'],
    ['Identity', 'An equation true for every value, like $2(x + 3) = 2x + 6$.']
  ],
  sections: [
    { h: 'Justifying every step',
      p: ['Regents questions ask you to <em>justify</em>, not merely to solve. Name the property beside each line.',
          '"Subtract $3x$ from both sides — subtraction property of equality." "<strong>Distribute</strong> — distributive property."',
          'It feels pedantic at first, and it is <em>exactly</em> what stops you doing something illegal later on.'],
      box: { k: 'key', h: 'The only real rule', t: 'Do the same thing to both sides. Every legal move in algebra is a version of that one sentence.' } },
    { h: 'Linear equations, reliably',
      p: ['Clear fractions by multiplying every term by the <strong>common denominator</strong>. Clear brackets by distributing.',
          'Collect variables on one side, constants on the other. Then <strong>divide by the coefficient</strong>.',
          'Check by <strong>substitution</strong>. It takes seconds and it is the only way to be certain.'],
      box: { k: 'slow', h: 'Clear the fractions first', t: 'For $\\dfrac{x}{3} + \\dfrac{x}{4} = 7$, multiply everything by $12$: $4x + 3x = 84$, so $x = 12$. Much easier than adding fractions.' } },
    { h: 'Literal equations',
      p: ['Solving $A = \\pi r^2$ for $r$ uses exactly the same moves as solving a numerical equation. <strong>The letters just do not simplify</strong>.',
          'Decide which letter you want alone, then <strong>undo everything around it in reverse order</strong>.',
          '$A = \\pi r^2 \\Rightarrow \\dfrac{A}{\\pi} = r^2 \\Rightarrow r = \\sqrt{\\dfrac{A}{\\pi}}$.'],
      box: { k: 'warn', h: 'Treat the other letters as numbers', t: 'In $y = mx + b$ solved for $x$, the $m$ and $b$ behave exactly like $3$ and $7$ would. Subtract $b$, divide by $m$: $x = \\dfrac{y - b}{m}$.' } },
    { h: 'One solution, none, or all',
      p: ['If the variables cancel and a false statement remains ($0 = 5$), <strong>there is no solution</strong>.',
          'If a true statement remains ($0 = 0$), every number works and the equation is an <strong>identity</strong>.',
          '<em>Both</em> outcomes are real answers. State them in words rather than leaving the page blank.']}
  ],
  examples: [
    { t: 'With fractions', q: 'Solve $\\dfrac{2x}{3} - \\dfrac{x}{4} = 5$.',
      steps: [
        { do: 'Multiply every term by $12$.', why: '$12$ is the least common denominator.' },
        { do: '$8x - 3x = 60$', why: '$12 \\cdot \\dfrac{2x}{3} = 8x$ and $12 \\cdot \\dfrac{x}{4} = 3x$.' },
        { do: '$5x = 60$, so $x = 12$', why: 'Collect, then divide.' },
        { do: 'Check: $\\dfrac{24}{3} - \\dfrac{12}{4} = 8 - 3 = 5$ &check;', why: 'Substitute into the original.' }
      ], ans: '$x = 12$' },
    { t: 'A literal equation', q: 'Solve $P = 2l + 2w$ for $w$.',
      steps: [
        { do: 'Subtract $2l$: $P - 2l = 2w$', why: 'Subtraction property of equality.' },
        { do: 'Divide by $2$: $w = \\dfrac{P - 2l}{2}$', why: 'Division property of equality.' },
        { do: 'Or equivalently $w = \\dfrac{P}{2} - l$.', why: 'Both forms are correct; the second is often tidier.' }
      ], ans: '$w = \\dfrac{P - 2l}{2}$' },
    { t: 'No solution', q: 'Solve $3(x + 4) = 3x + 10$.',
      steps: [
        { do: 'Distribute: $3x + 12 = 3x + 10$', why: 'Distributive property.' },
        { do: 'Subtract $3x$: $12 = 10$', why: 'The variable vanishes entirely.' },
        { do: '$12 = 10$ is false, so there is no solution.', why: 'The two sides are parallel lines — never equal.' }
      ], ans: 'No solution' }
  ],
  mistakes: [
    'Multiplying only some terms when clearing fractions. Multiplying by the common denominator must hit <strong>every</strong> term on both sides, including the ones that were never fractions. Miss one and the equation is no longer the one you started with.',
    'Dividing by a variable. Dividing $x^2 = 5x$ by $x$ loses the solution $x = 0$, because you quietly assumed $x$ was not zero. Factor instead and both roots survive.',
    'Stopping at $12 = 10$ without saying what it means. The variables cancelling is not a dead end — a false statement means <strong>no solution</strong>, a true one means every value works. Both are real answers worth writing down.',
    'Losing track of which letter you are solving for. In a literal equation the other letters behave exactly like numbers. Underline the one you want alone before the first line, and undo everything around it in reverse order.'
  ]
},
{
  id: 'inequalities9', strand: 'algebra', fig: 'inequalityLine',
  title: 'Linear Inequalities',
  big: 'Solve it like an equation, with one extra rule: multiplying or dividing by a negative reverses the sign.',
  discover: [
    '**The sign at the ride says: you must be under 1.4 metres to ride.**',
    'That is not one height. It lets in a whole range of people — and shuts out another range.',
    { fig: 'discInequal' },
    'On a number line the allowed heights are a **stretch**, not a point. That is the first thing an inequality does differently from an equation.',
    'Look at the circle at $1.4$. It is hollow, because $1.4$ exactly is **not** allowed — "under" excludes it.',
    'Change the sign to "$1.4$ or under" and that circle fills in. One tiny hole is the whole difference between $<$ and $\\leq$.',
    { punch: 'Solving works exactly like an equation, with one extra rule. Multiply or divide by a **negative** and the direction reverses — because $3 < 5$ is true, but $-3 < -5$ is false.' }
  ],
  funfact: [
    'The signs $<$ and $>$ first appear in a book by **Thomas Harriot**, published in 1631 — ten years after he died.',
    'Harriot was an astronomer too. He drew the Moon through a telescope several months before **Galileo**, but published almost nothing in his lifetime.',
    'The symbols $\\leq$ and $\\geq$ came much later, from the French mathematician **Pierre Bouguer** in 1734.'
  ],
  vocab: [
    ['Inequality', 'A statement using $<$, $>$, $\\leq$ or $\\geq$.'],
    ['Solution set', 'Every value that satisfies the inequality — usually an interval, not a point.'],
    ['Compound inequality', 'Two conditions joined by "and" or "or".'],
    ['Interval notation', 'A compact way of writing a solution set, like $[3, \\infty)$.']
  ],
  sections: [
    { h: 'The one extra rule',
      p: ['Adding or subtracting never affects the direction. Multiplying or dividing by a <strong>positive</strong> never affects it either.',
          'Multiplying or dividing by a <strong>negative</strong> reverses it. $-2x > 6$ becomes $x < -3$.',
          'Why: $3 < 5$ is true, but $-3 < -5$ is false. Negating <strong>flips the order of the number line</strong>.'],
      box: { k: 'warn', h: 'Flip only for a negative multiply or divide', t: 'Subtracting a negative does <em>not</em> flip anything. Only multiplying or dividing both sides by a negative number does.' } },
    { h: 'Graphing on a number line',
      p: ['An <strong>open circle</strong> for $<$ or $>$: the endpoint itself is not included.',
          'A <strong>filled circle</strong> for $\\leq$ or $\\geq$: the endpoint is included.',
          'Shade in the direction of the solutions, and <strong>test one value from the shaded part</strong> to be sure.'],
      box: { k: 'slow', h: 'Test a point', t: 'After solving, pick any number in your shaded region and put it into the original <strong>inequality</strong>. If it works, the direction is right.' } },
    { h: 'Compound inequalities',
      p: ['"And" <strong>means</strong> both must hold, so you take the overlap. $-2 < x \\leq 5$ is the stretch between them.',
          '"Or" means either will do, so you take everything in <em>both</em> pieces — often two separate arrows.',
          'Solve a three-part <strong>inequality</strong> by doing the same thing to all three parts at once.'],
      box: { k: 'key', h: '"And" is an overlap, "or" is a union', t: '$x > 3$ and $x > 7$ is just $x > 7$ — only the overlap survives. $x > 3$ or $x > 7$ is $x > 3$ — the union.' } },
    { h: 'Inequalities in words',
      p: ['"At least" is $\\geq$. "At most" is $\\leq$. "More than" is $>$. "<strong>No more than</strong>" is $\\leq$.',
          '"A budget of $\\$50$" means the total must be $\\leq 50$.',
          'Then check the context: if the variable counts people or tickets, the answer <em>must</em> be a whole number, so round down for a maximum.'],
      box: { k: 'warn', h: 'Round the right way', t: 'If $n \\leq 7.4$ tickets, the answer is $7$, not $8$ — even though $7.4$ rounds to $7$ only by luck. <em>Always</em> round towards what the context allows.' } }
  ],
  examples: [
    { t: 'A negative coefficient', q: 'Solve $-3x + 5 \\geq 17$ and graph it.',
      steps: [
        { do: 'Subtract $5$: $-3x \\geq 12$', why: 'Subtracting never flips the sign.' },
        { do: 'Divide by $-3$ and flip: $x \\leq -4$', why: 'Dividing by a negative reverses the direction.' },
        { do: 'Graph: filled circle at $-4$, shade left.', why: '$\\leq$ includes the endpoint.' },
        { do: 'Test $x = -10$: $-3(-10) + 5 = 35 \\geq 17$ &check;', why: 'Confirms the direction.' }
      ], ans: '$x \\leq -4$' },
    { t: 'Compound', q: 'Solve $-7 < 2x - 1 \\leq 9$.',
      steps: [
        { do: 'Add $1$ to all three parts: $-6 < 2x \\leq 10$', why: 'Whatever you do, do it to all three.' },
        { do: 'Divide all three by $2$: $-3 < x \\leq 5$', why: 'Dividing by a positive keeps both directions.' },
        { do: 'Graph: open circle at $-3$, filled at $5$, shade between.', why: 'Different endpoints, different circles.' }
      ], ans: '$-3 < x \\leq 5$' },
    { t: 'In context', q: 'A ride costs $\\$4$ and entry is $\\$12$. With $\\$50$, how many rides can you take?',
      steps: [
        { do: 'Let $r$ be the number of rides: $12 + 4r \\leq 50$', why: '"With $\\$50$" means the total is at most $50$.' },
        { do: 'Subtract $12$: $4r \\leq 38$', why: 'Undo the entry fee.' },
        { do: 'Divide by $4$: $r \\leq 9.5$', why: 'Positive divisor, so no flip.' },
        { do: 'Rides are whole, so at most $9$.', why: 'Check: $12 + 36 = \\$48 \\leq \\$50$, but $10$ rides would be $\\$52$ &check;' }
      ], ans: '$9$ rides' }
  ],
  mistakes: [
    'Flipping the sign when merely subtracting a negative. Only multiplying or <strong>dividing</strong> by a negative reverses the direction. Adding and subtracting never do, however many minus signs are on the page.',
    'Forgetting to flip after dividing by a negative. $-2x > 8$ becomes $x < -4$. Test it: $x = -5$ gives $-2(-5) = 10 > 8$, which works — and $x = 0$ does not.',
    'Using an open circle where the endpoint counts. $\\leq$ and $\\geq$ include the boundary, so the circle is filled. It is the difference between being allowed on the ride and not.',
    'Leaving a fractional answer where the context demands whole things. $r \\leq 9.5$ rides means <strong>9</strong> rides. Round towards what the situation allows, not by the usual rounding rule.'
  ]
},
{
  id: 'slopeforms', strand: 'algebra', fig: 'slopeTriangle',
  title: 'Slope & the Forms of a Line',
  big: 'Three ways to write the same line. Each one is best at answering a different question.',
  discover: [
    '**Here is a line on a grid. Describe it to someone on the phone.**',
    'You could say: "it passes through $(3, 5)$ and climbs $5$ for every $6$ across."',
    { fig: 'discSlopeForms' },
    'Or: "it crosses the $y$-axis at $2.5$ and has slope $\\tfrac56$."',
    'Or: "$5x - 6y = -15$."',
    '**All three describe the same pencil line.** Nothing on the grid changed — only the sentence.',
    { punch: 'So "which form should I use?" is really "what am I about to do?" Graphing wants $y = mx + b$. A point and a slope want point-slope, which needs no algebra at all. Hunting intercepts wants $Ax + By = C$.' }
  ],
  funfact: [
    '**Descartes** published the coordinate plane in 1637 — as an appendix to a philosophy book, *Discourse on the Method*.',
    'The mathematics was an illustration of his argument about how to reason well. The appendix outlived the book.',
    'The story that he thought of it while watching a fly on his ceiling is charming and almost certainly invented.'
  ],
  vocab: [
    ['Slope-intercept form', '$y = mx + b$. Best for graphing.'],
    ['Point-slope form', '$y - y_1 = m(x - x_1)$. Best when you know a point and the slope.'],
    ['Standard form', '$Ax + By = C$. Best for finding intercepts fast.'],
    ['Parallel', 'Same slope, different intercept.'],
    ['Perpendicular', 'Slopes multiply to $-1$ — negative reciprocals.']
  ],
  sections: [
    { h: 'Choosing a form',
      p: ['Given a point and a slope, use point-slope. Nothing to solve: <strong>substitute</strong> and you are done.',
          'Given two points, find the slope, then use point-slope with either point. <em>Both</em> give the same line.',
          'Rearrange to $y = mx + b$ at the end <strong>if the question wants it</strong>, or leave it if it does not.'],
      box: { k: 'key', h: 'Point-slope is underrated', t: '$y - y_1 = m(x - x_1)$ takes no algebra to set up. Write it first, then tidy. Trying to jump straight to $y = mx + b$ <strong>means</strong> solving for $b$, which is one more place to slip.' } },
    { h: 'Intercepts from standard form',
      p: ['Set $y = 0$ <strong>to find the</strong> $x$-intercept. Set $x = 0$ to find the $y$-intercept.',
          'For $3x + 4y = 24$: at $y = 0$, $x = 8$; at $x = 0$, $y = 6$. Plot $(8, 0)$ and $(0, 6)$ <strong>and draw the line</strong>.',
          'This is the fastest way to graph a line in <strong>standard form</strong> — faster than rearranging.'],
      box: { k: 'slow', h: 'Zero the other one', t: 'For the $x$-intercept, make $y$ zero. For the $y$-intercept, make $x$ zero. The names sound backwards, so say it deliberately each time.' } },
    { h: 'Parallel and perpendicular',
      p: ['<strong>Parallel</strong> lines have equal slopes. To find a line parallel to $y = 3x + 1$ through a given point, keep $m = 3$ and use point-slope.',
          '<strong>Perpendicular</strong> slopes are negative reciprocals: flip the fraction and change the sign. The perpendicular to $m = \\dfrac{2}{3}$ is $m = -\\dfrac{3}{2}$.',
          'Check: $\\dfrac{2}{3} \\times \\left(-\\dfrac{3}{2}\\right) = -1$ &check;'],
      box: { k: 'warn', h: 'Both changes, not one', t: 'The perpendicular of $4$ is $-\\dfrac{1}{4}$: flip <em>and</em> negate. Doing only one of the two is the standard error.' } },
    { h: 'Horizontal and vertical',
      p: ['Horizontal: slope $0$, equation $y = k$. Vertical: <strong>slope undefined</strong>, equation $x = k$.',
          'They are perpendicular to each other, but the negative-<strong>reciprocal</strong> rule does not apply — you cannot take the reciprocal of zero.',
          'Just remember the pair: $y = 3$ <strong>is flat</strong>, $x = 3$ is upright.']}
  ],
  examples: [
    { t: 'Point and slope', q: 'Write the equation of the line with slope $-2$ through $(3, 7)$, in slope-intercept form.',
      steps: [
        { do: 'Point-slope: $y - 7 = -2(x - 3)$', why: 'Substitute straight in.' },
        { do: 'Distribute: $y - 7 = -2x + 6$', why: 'The negative hits both terms.' },
        { do: 'Add $7$: $y = -2x + 13$', why: 'Check: $-2(3) + 13 = 7$ &check;' }
      ], ans: '$y = -2x + 13$' },
    { t: 'Two points', q: 'Find the equation of the line through $(-2, 5)$ and $(4, -7)$.',
      steps: [
        { do: '$m = \\dfrac{-7 - 5}{4 - (-2)} = \\dfrac{-12}{6} = -2$', why: 'Slope first.' },
        { do: 'Point-slope with $(-2, 5)$: $y - 5 = -2(x + 2)$', why: '$x - (-2)$ is $x + 2$.' },
        { do: '$y - 5 = -2x - 4$, so $y = -2x + 1$', why: 'Check the other point: $-2(4) + 1 = -7$ &check;' }
      ], ans: '$y = -2x + 1$' },
    { t: 'Perpendicular', q: 'Find the line perpendicular to $y = \\dfrac{3}{4}x - 2$ passing through $(6, 1)$.',
      steps: [
        { do: 'Given slope $\\dfrac{3}{4}$, the perpendicular slope is $-\\dfrac{4}{3}$.', why: 'Flip and negate.' },
        { do: 'Point-slope: $y - 1 = -\\dfrac{4}{3}(x - 6)$', why: 'Use the given point.' },
        { do: '$y - 1 = -\\dfrac{4}{3}x + 8$', why: '$-\\dfrac{4}{3} \\times -6 = 8$.' },
        { do: '$y = -\\dfrac{4}{3}x + 9$', why: 'Check: $\\dfrac{3}{4} \\times -\\dfrac{4}{3} = -1$ &check;' }
      ], ans: '$y = -\\dfrac{4}{3}x + 9$' }
  ],
  mistakes: [
    'Using $x + x_1$ in point-slope form. The formula is $y - y_1 = m(x - x_1)$, so a point at $x_1 = -3$ gives $x - (-3) = x + 3$. The sign flips because of the subtraction, not in spite of it.',
    'Taking the reciprocal without changing the sign. A perpendicular slope needs <strong>both</strong> moves: flip the fraction and negate. The perpendicular of $4$ is $-\\tfrac14$, and doing only one of the two is the standard error.',
    'Setting $x = 0$ when hunting the $x$-intercept. To find where it crosses the $x$-axis you set $y$ to zero, because that is what being on the $x$-axis means. The names sound backwards, so say it deliberately.',
    'Subtracting coordinates in opposite orders. $\\dfrac{y_2 - y_1}{x_1 - x_2}$ gives the slope with the wrong sign. Pick an order and use it top and bottom.'
  ]
},
{
  id: 'writelinear', strand: 'algebra', fig: 'shiftLines',
  title: 'Writing & Transforming Linear Functions',
  big: 'Once a linear model is written, every question about it — rate, starting value, prediction, shift — is a short calculation.',
  discover: [
    '**Your phone bill arrives. It has two lines on it.**',
    'One says *monthly charge, \\$25.00*. The other says *340 texts at \\$0.10, \\$34.00*.',
    { fig: 'discWriteLinear' },
    'Notice how differently those two behave. Send no texts at all next month and you still owe the **\\$25**.',
    'The \\$34 exists only because of the texts, and it would grow or shrink with them.',
    'So the bill splits into a part that happens **once** and a part that happens **per text**.',
    { punch: 'Two questions turn any such story into an equation. *What is true at zero?* — that is $b$. *What happens per one more?* — that is $m$. Here: $C = 0.10t + 25$.' }
  ],
  funfact: [
    'The idea that a graph could be shifted by changing the equation is surprisingly recent as a teaching tool, but the surprise inside it is ancient.',
    '$f(x - 3)$ shifts the graph **right**, not left — because to get the output the old graph gave at $x$, the new one needs an input $3$ larger.',
    'Nearly every student meets this once and disbelieves it. Substituting a single number settles it faster than any argument.'
  ],
  vocab: [
    ['Linear model', 'An equation of the form $f(x) = mx + b$ fitted to a situation.'],
    ['Rate of change', 'The slope, in the units of the situation.'],
    ['Average rate of change', '$\\dfrac{f(b) - f(a)}{b - a}$ over an interval.'],
    ['Transformation', 'A change to the function that moves or stretches its graph.'],
    ['Arithmetic sequence', 'A list with a constant difference. Its rule is linear.']
  ],
  sections: [
    { h: 'Writing a model from a description',
      p: ['Find the fixed part: <strong>what is true at the very start</strong>, before anything happens. That is $b$.',
          'Find the per-unit part: <strong>what changes for each additional one</strong>. That is $m$.',
          '"$\\$30$ to join plus $\\$12$ a month" is $C(t) = 12t + 30$. Say what $t$ <strong>means</strong> in words as well.'],
      box: { k: 'slow', h: 'Two questions, in order', t: 'What is the value at zero? What happens per step? Answer those two and the equation is written.' } },
    { h: 'Average rate of change',
      p: ['For a linear function the <strong>rate of change</strong> is the same everywhere, so the average rate equals the slope.',
          'For any other function it varies, and the formula $\\dfrac{f(b) - f(a)}{b - a}$ gives <strong>the slope of the straight line joining the two points</strong>.',
          'It answers "<strong>on average, how fast did it change</strong> between here and there?"'],
      box: { k: 'key', h: 'It is just a slope', t: 'The <strong>average rate of change</strong> over $[a, b]$ is the slope between $(a, f(a))$ and $(b, f(b))$ — nothing more exotic than rise over run.' } },
    { h: 'Transformations',
      p: ['$f(x) + k$ <strong>shifts the graph up</strong> $k$ units. $f(x) - k$ shifts it down.',
          '$f(x + k)$ shifts it <strong>left</strong> $k$ units; $f(x - k)$ shifts it right. This is the one that surprises everybody.',
          '$-f(x)$ reflects it across the $x$-axis. $af(x)$ <strong>stretches it vertically</strong> by a factor of $a$.'],
      box: { k: 'warn', h: 'Inside the brackets is backwards', t: 'Changes to $x$ act in the opposite direction to what the sign suggests. $f(x - 3)$ moves right. Think: to get the old output, $x$ now has to be $3$ bigger.' } },
    { h: 'Arithmetic sequences',
      p: ['A sequence with a constant difference is a <strong>linear</strong> function on the whole numbers.',
          'Explicit rule: $a_n = a_1 + (n - 1)d$, where $d$ is the <strong>common difference</strong>.',
          'Recursive rule: $a_1 = \\text{start}$ and $a_n = a_{n-1} + d$. <em>Both</em> describe the same list.'],
      box: { k: 'key', h: 'Why $(n - 1)$?', t: 'You take the step $d$ one fewer time than the term number, because the first term needs no steps at all.' } }
  ],
  examples: [
    { t: 'Writing a model', q: 'A phone plan costs $\\$25$ a month plus $\\$0.10$ per text. Write $C(t)$ and find the cost of $340$ texts.',
      steps: [
        { do: 'At zero texts the cost is $\\$25$, so $b = 25$.', why: 'The fixed part.' },
        { do: 'Each text adds $\\$0.10$, so $m = 0.10$.', why: 'The per-unit part.' },
        { do: '$C(t) = 0.10t + 25$', why: 'With $t$ the number of texts.' },
        { do: '$C(340) = 0.10(340) + 25 = 34 + 25 = \\$59$', why: 'Substitute and evaluate.' }
      ], ans: '$C(t) = 0.10t + 25$; $\\$59$' },
    { t: 'Average rate of change', q: 'For $f(x) = x^2 + 1$, find the average rate of change from $x = 1$ to $x = 4$.',
      steps: [
        { do: '$f(1) = 1 + 1 = 2$', why: 'Evaluate at the left end.' },
        { do: '$f(4) = 16 + 1 = 17$', why: 'And at the right end.' },
        { do: '$\\dfrac{17 - 2}{4 - 1} = \\dfrac{15}{3} = 5$', why: 'Change in output over change in input.' },
        { do: 'So on average it rose $5$ per unit over that stretch.', why: 'Not constant here — this is an average.' }
      ], ans: '$5$' },
    { t: 'Arithmetic sequence', q: 'A sequence starts $7, 11, 15, 19, \\ldots$. Find the $30$th term.',
      steps: [
        { do: 'Common difference: $11 - 7 = 4$', why: 'Check another pair: $15 - 11 = 4$ &check;' },
        { do: '$a_n = 7 + (n - 1)(4)$', why: 'First term plus $(n-1)$ steps.' },
        { do: '$a_{30} = 7 + 29(4) = 7 + 116$', why: '$29$ steps, not $30$.' },
        { do: '$a_{30} = 123$', why: 'Equivalently $4n + 3$, and $4(30) + 3 = 123$ &check;' }
      ], ans: '$123$' }
  ],
  mistakes: [
    'Swapping $m$ and $b$ in a word problem. The fixed, one-off amount is $b$; the repeated per-unit amount is $m$. Ask "what do I owe before anything happens?" and you have $b$ directly.',
    'Shifting the wrong way for $f(x - 3)$. Changes inside the brackets act in <strong>reverse</strong>: subtracting moves the graph right. Try it with one point — $f(0)$ now happens when $x = 3$.',
    'Using $n$ where the formula needs $n - 1$. The tenth term takes nine steps, because the first term needed none. This single off-by-one causes more sequence errors than everything else combined.',
    'Reporting an average rate of change with no units. It is a rate — "$5$ points per hour," not "$5$." The bare number cannot be checked for sense, and a sense check is what catches the sign errors.'
  ]
}
,
{
  id: 'systems9', strand: 'algebra', fig: 'systemCross',
  title: 'Systems of Equations & Inequalities',
  big: 'Two conditions at once, solved three ways — graph, substitute, or eliminate. The shaded overlap is the answer for inequalities.',
  discover: [
    '**You have 44 metres of fence and want a rectangular pen three metres longer than it is wide.**',
    'Try a width of $10$: the length is $13$, and the fence needed is $2(10) + 2(13) = 46$. Too much.',
    { fig: 'discSystems9' },
    'Try $9$: length $12$, fence $42$. Not enough. The answer is somewhere between, and guessing is slow.',
    'Notice you are holding **two separate facts**. One is about how much fence. One is about how the sides compare.',
    'Either fact alone allows infinitely many pens. A width of $9$ satisfies the second fact perfectly — it just wastes fence.',
    { punch: 'It takes **both together** to pin down a single pen. That is what a system is: two conditions that must hold at once, and a solution that satisfies every one of them.' }
  ],
  funfact: [
    'Systems with thousands of equations are solved every day, and the method is still essentially elimination.',
    'In 1947 **George Dantzig** extended the idea to inequalities, inventing the simplex algorithm — now used to route aircraft, schedule factories and plan diets.',
    'As a graduate student Dantzig once arrived late to a lecture, copied two problems off the board as homework, and solved them. They were famous unsolved problems.'
  ],
  vocab: [
    ['System', 'Equations or inequalities that must all hold together.'],
    ['Consistent / inconsistent', 'Has a solution / has none.'],
    ['Feasible region', 'The shaded overlap for a system of inequalities.'],
    ['Boundary line', 'The line you would get by replacing the inequality sign with $=$.']
  ],
  sections: [
    { h: 'Picking a method',
      p: ['A variable already alone? <strong>Substitute</strong>. Coefficients that match or are opposites? Eliminate. Want a picture, or approximate answers? Graph.',
          'Elimination usually wins for standard-form <strong>systems</strong>; substitution wins when something is already solved for.',
          'Whichever you choose, check the pair in <strong>both</strong> original equations.'],
      box: { k: 'key', h: 'Graphing finds the intersection', t: 'Solving $f(x) = g(x)$ and finding where two graphs cross are the same problem. That is why a graphing calculator can solve equations you <em>cannot</em> factor.' } },
    { h: 'Elimination with a multiplier',
      p: ['When nothing matches, multiply one or <em>both</em> equations to force a match.',
          'For $2x + 3y = 13$ and $5x - y = 7$: <strong>multiply the second by</strong> $3$ to get $15x - 3y = 21$, then add.',
          '$17x = 34$, so $x = 2$ and then $y = 3$. Multiply the <em>whole</em> equation, every term including the constant.'],
      box: { k: 'warn', h: 'Every term', t: 'Multiplying $5x - y = 7$ by $3$ gives $15x - 3y = 21$. Forgetting to triple the $7$ is the single most common error in <strong>elimination</strong>.' } },
    { h: 'Graphing an inequality',
      p: ['Graph the <strong>boundary line</strong>. Dashed for $<$ or $>$, solid for $\\leq$ or $\\geq$.',
          'Then test a point not on the line — $(0, 0)$ if possible. If it satisfies the <strong>inequality</strong>, shade that side.',
          'For a system, shade each one and the answer is <strong>the region shaded by all of them</strong>.'],
      box: { k: 'slow', h: 'Test the origin', t: 'Put $(0,0)$ into the inequality. True means shade the side containing <strong>the origin</strong>. It is faster and safer than reasoning about which way the sign points.' } },
    { h: 'Systems in context',
      p: ['Two unknowns need two relationships. Look for <strong>one about quantity and one about value</strong>, or one about time and one about distance.',
          '<strong>Define both variables in words</strong>. Then read the problem twice, writing one equation each time.',
          'At the end, check the answer makes sense: you <em>cannot</em> buy $-3$ tickets.']}
  ],
  examples: [
    { t: 'Elimination with a multiplier', q: 'Solve $2x + 3y = 13$ and $5x - y = 7$.',
      steps: [
        { do: 'Multiply the second equation by $3$: $15x - 3y = 21$', why: 'Now the $y$ coefficients are opposites.' },
        { do: 'Add: $(2x + 15x) + (3y - 3y) = 13 + 21$', why: 'The $y$ terms cancel.' },
        { do: '$17x = 34$, so $x = 2$', why: 'Divide by $17$.' },
        { do: '$5(2) - y = 7$, so $y = 3$', why: 'Check the first: $2(2) + 3(3) = 13$ &check;' }
      ], ans: '$(2, 3)$' },
    { t: 'Graphing a system of inequalities', q: 'Describe the solution region for $y \\leq 2x + 1$ and $y > -x + 4$.',
      steps: [
        { do: 'Graph $y = 2x + 1$ solid, since $\\leq$ includes it.', why: 'Solid for $\\leq$ and $\\geq$.' },
        { do: 'Test $(0, 0)$: $0 \\leq 1$ is true, so shade below that line.', why: 'The origin side.' },
        { do: 'Graph $y = -x + 4$ dashed, since $>$ excludes it.', why: 'Dashed for strict inequalities.' },
        { do: 'Test $(0, 0)$: $0 > 4$ is false, so shade the other side — above.', why: 'Away from the origin.' },
        { do: 'The solution is the wedge shaded by both.', why: 'A point like $(4, 3)$ satisfies both &check;' }
      ], ans: 'The overlap: below the solid line and above the dashed one' },
    { t: 'In context', q: 'A shop sells $\\$4$ and $\\$7$ notebooks. It sold $50$ notebooks for $\\$275$. How many of each?',
      steps: [
        { do: 'Let $a$ be the cheap ones and $b$ the dear ones.', why: 'Define both variables.' },
        { do: 'Quantity: $a + b = 50$. Value: $4a + 7b = 275$.', why: 'One equation each way.' },
        { do: 'Multiply the first by $4$: $4a + 4b = 200$, then subtract.', why: 'Eliminate $a$.' },
        { do: '$3b = 75$, so $b = 25$ and $a = 25$', why: 'Check: $4(25) + 7(25) = 100 + 175 = 275$ &check;' }
      ], ans: '$25$ of each' }
  ],
  mistakes: [
    'Multiplying only part of an equation. Scaling $5x - y = 7$ by $3$ gives $15x - 3y = 21$ — the constant must be tripled too. Forgetting the $7$ is the most common elimination error there is.',
    'Using a solid boundary line for a strict inequality. $y > 2x + 1$ excludes the line itself, so it is drawn dashed. Solid claims the points on the line are solutions, and they are not.',
    'Shading without testing a point. Put $(0, 0)$ into the inequality: true means shade the side containing the origin. Reasoning about which way the sign points is slower and less reliable.',
    'Reporting only one coordinate. A system\'s solution names a point, so it needs both numbers. If the context is a word problem, check the pair makes sense — you cannot buy $-3$ tickets.'
  ]
},
{
  id: 'regression', strand: 'data', fig: 'trendLine',
  title: 'Bivariate Data & Correlation',
  big: 'Fit a line, read its slope in context, and judge how well it fits — then resist the urge to claim a cause.',
  discover: [
    '**Two students fit a line to the same scatter plot. Their lines are slightly different. Who is right?**',
    'Both might be. But you can measure which line fits better, and the measurement is simple.',
    { fig: 'discRegression' },
    'Drop a little line from each dot to your fitted line. That gap is how much the line **missed that dot by** — its residual.',
    'Above the line is a positive residual, below is negative, and for a least-squares line they cancel out to zero.',
    'Now plot the residuals on their own. If the line was right, they should look like a **formless jumble**.',
    { punch: 'If instead they make an arch — negative at both ends, positive in the middle — the data curves and a line was the wrong shape. This is the one place in mathematics where **finding no pattern is the good outcome**.' }
  ],
  funfact: [
    'The correlation coefficient $r$ was developed by **Karl Pearson** in the 1890s, building on Galton\'s work.',
    'Its sign and size are all it reports: $r = -0.95$ is a very strong relationship, not a weak one, because strength lives in the size and direction in the sign.',
    '$r$ also only sees straight lines. A perfect U-shaped relationship — every point exactly on a parabola — can give $r$ of almost exactly zero.'
  ],
  vocab: [
    ['Regression line', 'The line of best fit computed by a formula rather than by eye.'],
    ['Correlation coefficient', '$r$, between $-1$ and $1$. Its sign gives the direction, its size the strength.'],
    ['Residual', 'Actual value minus predicted value.'],
    ['Residual plot', 'A plot of residuals against $x$, used to judge whether a line was the right model.']
  ],
  sections: [
    { h: 'Reading r',
      p: ['$r$ close to $1$: strong positive linear relationship. Close to $-1$: strong negative. Close to $0$: little or no <em>linear</em> relationship.',
          '$r = 0.9$ is strong; $r = 0.3$ is weak. The sign matches the slope\'s sign, <em>always</em>.',
          '$r$ measures only how <strong>linear</strong> the pattern is. A perfect U-shaped curve can have $r$ near zero.'],
      box: { k: 'key', h: 'Sign then size', t: 'Read the sign for direction, then the size for strength. $r = -0.95$ is a very strong relationship, not a weak one.' } },
    { h: 'Residuals',
      p: ['<strong>Residual</strong> $=$ actual $-$ predicted. A positive residual means the real value was above the line.',
          'Add up the residuals for a least-squares line and you get zero — <strong>the line splits the misses evenly</strong>.',
          'A small residual <strong>means</strong> the line predicted that case well.'],
      box: { k: 'slow', h: 'Actual minus predicted', t: 'Always in that order. If the real score was $82$ and the line predicted $78$, the residual is $+4$.' } },
    { h: 'The residual plot',
      p: ['Plot each residual against its $x$ value. If a line was the right model, the residuals look like <strong>random scatter around zero</strong>.',
          'A clear curve or arch in the <strong>residual plot</strong> means the true relationship is not linear, even if $r$ looked respectable.',
          'This is <strong>the honest check</strong>, and it catches bad models that $r$ alone will let through.'],
      box: { k: 'warn', h: 'Pattern is bad news', t: 'In a <strong>residual plot</strong>, structure means the model is wrong. You want a formless cloud — the one place in mathematics where no pattern is the good outcome.' } },
    { h: 'Correlation is still not causation',
      p: ['A strong $r$ says the two variables moved together. <strong>It says nothing about why</strong>.',
          'Three explanations always remain: $x$ causes $y$, $y$ causes $x$, or something else causes <em>both</em>.',
          'Only a randomised experiment can rule out the third. Observational data <em>never</em> can.']}
  ],
  examples: [
    { t: 'Interpreting r', q: 'A study finds $r = -0.87$ between hours of television and test score. Describe the relationship.',
      steps: [
        { do: 'Negative sign: more television goes with lower scores.', why: 'The direction.' },
        { do: '$|{-0.87}|$ is close to $1$, so it is strong.', why: 'The strength.' },
        { do: 'So: a strong negative linear association.', why: 'Both pieces reported.' },
        { do: 'But television may not be the cause — a third factor could drive both.', why: 'Correlation is not causation.' }
      ], ans: 'A strong negative linear association; no cause established' },
    { t: 'A residual', q: 'A regression line predicts $y = 3x + 10$. For $x = 5$ the actual value was $28$. Find the residual.',
      steps: [
        { do: 'Predicted: $3(5) + 10 = 25$', why: 'Substitute into the line.' },
        { do: 'Residual $=$ actual $-$ predicted $= 28 - 25$', why: 'Always in that order.' },
        { do: '$= +3$', why: 'Positive, so the actual value sat above the line.' }
      ], ans: '$+3$' },
    { t: 'Judging a model', q: 'A residual plot shows residuals that are negative at both ends and positive in the middle. What does that tell you?',
      steps: [
        { do: 'There is a clear pattern — an arch.', why: 'Residuals should look random.' },
        { do: 'The data curves, but the line cannot.', why: 'The line under-predicts in the middle and over-predicts at the ends.' },
        { do: 'So a linear model is the wrong choice here.', why: 'A quadratic or exponential model would fit better.' }
      ], ans: 'The relationship is not linear — try a different model' }
  ],
  mistakes: [
    'Calling $r = -0.9$ weak because it is negative. Read the <strong>sign</strong> for direction and the <strong>size</strong> for strength. $-0.9$ is nearly as strong as a relationship gets.',
    'Computing predicted minus actual for a residual. It is always actual minus predicted, in that order, so that a point above the line gives a positive residual. The other order reverses every sign.',
    'Treating a high $r$ as proof of cause. Three explanations always survive: $x$ causes $y$, $y$ causes $x$, or something else causes both. Only a randomised experiment can rule out the third.',
    'Ignoring a curved residual plot because $r$ looked respectable. $r$ measures how linear the pattern is; the residual plot shows whether a line was the right model at all. The residual plot is the honest one.'
  ]
},
{
  id: 'exponential', strand: 'algebra', fig: 'growthCurves',
  title: 'Exponential Functions & Growth',
  big: 'Linear growth adds the same amount each step. Exponential growth multiplies by the same amount — and always wins in the end.',
  discover: [
    '**A king offers a reward: one grain of rice on the first square of a chessboard, doubling on each square after.**',
    'It sounds modest. One, two, four, eight — you could carry the first dozen squares in a cup.',
    { fig: 'discExponential' },
    'By square $8$ you are at $128$ grains. Adding one grain each time would have reached $8$.',
    'By square $20$ it is half a million. By square $64$ the pile is **larger than a mountain** — more rice than has ever been grown.',
    'And nothing dramatic happened at any single step. Every step was just "times two."',
    { punch: 'That is exponential growth: it looks slow at the start and then suddenly does not. **Linear growth adds a constant; exponential growth multiplies by one** — and multiplying always wins in the end.' }
  ],
  funfact: [
    'The rice-and-chessboard story appears in Indian and Persian sources from at least the 11th century, usually ending with the king realising he cannot pay.',
    'The total is $2^{64} - 1$ grains: about $18$ quintillion, roughly a thousand years of world rice production.',
    'The same arithmetic explains compound interest, viral spread and the growth of computing power — one idea, wearing very different clothes.'
  ],
  vocab: [
    ['Exponential function', '$f(x) = a \\cdot b^x$ with $a \\neq 0$, $b > 0$, $b \\neq 1$.'],
    ['Growth factor', '$b$ itself. $b > 1$ means growth, $0 < b < 1$ means decay.'],
    ['Initial value', '$a$, the output when $x = 0$.'],
    ['Growth rate', 'The percentage change. $b = 1 + r$ for growth, $b = 1 - r$ for decay.'],
    ['Asymptote', 'A line the graph approaches but never reaches — here, the $x$-axis.']
  ],
  sections: [
    { h: 'Spotting exponential behaviour',
      p: ['In a table with evenly spaced $x$ values: if consecutive $y$ values have a constant <strong>difference</strong>, it is linear. If they have a constant <strong>ratio</strong>, it is exponential.',
          '$3, 6, 12, 24$ has ratio $2$ every time, so it is <strong>exponential</strong> with $b = 2$.',
          '$3, 6, 9, 12$ has difference $3$ every time, so it is <strong>linear</strong>.'],
      box: { k: 'key', h: 'Differences or ratios', t: 'Subtract to test for <strong>linear</strong>. Divide to test for exponential. Do both on any unfamiliar table and one of them will come out constant.' } },
    { h: 'Percentages and the growth factor',
      p: ['Growing by $8\\%$ <strong>means</strong> multiplying by $1.08$, because you keep the original $100\\%$ and add $8\\%$ more.',
          '<strong>Shrinking by</strong> $8\\%$ means multiplying by $0.92$.',
          'So $b = 1 + r$ <strong>for growth and</strong> $b = 1 - r$ for decay, with $r$ written as a decimal.'],
      box: { k: 'warn', h: 'Do not use $0.08$ as the base', t: 'Multiplying by $0.08$ destroys $92\\%$ of the amount each step. Growth of $8\\%$ needs the factor $1.08$.' } },
    { h: 'The graph',
      p: ['Growth curves rise slowly at first and then steeply — <em>always</em> increasing, always concave up.',
          'Decay curves fall fast and then level off, approaching the $x$-axis <strong>without ever touching it</strong>.',
          'The $y$-intercept is always $a$, since $b^0 = 1$ <strong>whatever</strong> $b$ is.'],
      box: { k: 'slow', h: 'Check $x = 0$ first', t: 'Whatever the base, $b^0 = 1$, so $f(0) = a$. That gives you one point of the graph with no work at all.' } },
    { h: 'Linear against exponential',
      p: ['Exponential growth eventually overtakes any linear growth, however gentle the <strong>base</strong> or steep the line.',
          'Over small <strong>ranges</strong> a linear model may fit exponential data acceptably, which is why short-term data can mislead.',
          'Doubling <em>every</em> step from $1$ reaches a million in twenty steps. Adding one reaches twenty.']},
    { h: 'Geometric sequences',
      p: ['A <strong>geometric sequence</strong> has a constant ratio: $a_n = a_1 \\cdot r^{n-1}$.',
          'It is an <strong>exponential function</strong> restricted to the whole numbers.',
          'Recursively: $a_n = r \\cdot a_{n-1}$, <strong>starting from</strong> $a_1$.']}
  ],
  examples: [
    { t: 'Table or not', q: 'Is $5, 15, 45, 135$ linear or exponential? Write the rule.',
      steps: [
        { do: 'Differences: $10, 30, 90$ — not constant.', why: 'So not linear.' },
        { do: 'Ratios: $\\dfrac{15}{5} = 3$, $\\dfrac{45}{15} = 3$, $\\dfrac{135}{45} = 3$', why: 'Constant ratio, so exponential.' },
        { do: 'At $x = 0$ the value would be $5$, so $a = 5$ and $b = 3$.', why: 'Treating $5$ as the initial term.' },
        { do: '$f(x) = 5 \\cdot 3^x$', why: 'Check $f(2) = 5(9) = 45$ &check;' }
      ], ans: '$f(x) = 5 \\cdot 3^x$' },
    { t: 'Percentage growth', q: 'A town of $12{,}000$ grows $3\\%$ a year. Write a model and find the population after $10$ years.',
      steps: [
        { do: '$a = 12000$ and $b = 1 + 0.03 = 1.03$', why: 'Keep the original, add $3\\%$.' },
        { do: '$P(t) = 12000(1.03)^t$', why: 'With $t$ in years.' },
        { do: '$P(10) = 12000(1.03)^{10} \\approx 12000(1.3439)$', why: 'Raise to the tenth power.' },
        { do: '$\\approx 16{,}127$ people', why: 'Sensible: about a third more after a decade.' }
      ], ans: '$P(t) = 12000(1.03)^t$; about $16{,}127$' },
    { t: 'Decay', q: 'A car worth $\\$24{,}000$ loses $15\\%$ of its value each year. What is it worth after $4$ years?',
      steps: [
        { do: 'Losing $15\\%$ leaves $85\\%$, so $b = 0.85$.', why: '$1 - 0.15 = 0.85$.' },
        { do: '$V(t) = 24000(0.85)^t$', why: 'Exponential decay.' },
        { do: '$V(4) = 24000(0.85)^4 = 24000(0.52200625)$', why: 'Four years of shrinking.' },
        { do: '$\\approx \\$12{,}528$', why: 'A little over half, which matches losing $15\\%$ four times.' }
      ], ans: 'About $\\$12{,}528$' }
  ],
  mistakes: [
    'Using the percentage as the base. Growth of $8\\%$ means multiplying by $1.08$, because you keep the original $100\\%$ and add $8$ more. Multiplying by $0.08$ destroys $92\\%$ of the amount every step.',
    'Testing only for a constant difference. If the differences are not constant, try the <strong>ratios</strong> — a constant ratio means exponential. Checking only one of the two makes exponential data look like an error.',
    'Multiplying the base by the exponent. $3 \\cdot 2^4$ is $3 \\times 16 = 48$, not $6^4$. The exponent attaches to the $2$ alone, and the $3$ is a separate multiplier waiting its turn.',
    'Believing a decay curve reaches zero. Halving again and again gets arbitrarily small but never arrives. That is what an <strong>asymptote</strong> is, and it is why a drug never completely leaves the body.'
  ]
},
{
  id: 'sequences9', strand: 'algebra', fig: 'sequenceBlocks',
  title: 'Sequences, Explicit & Recursive',
  big: 'A sequence is a function whose inputs are the counting numbers. Describe it from the start, or from the term before.',
  discover: [
    '**A pattern is built from tiles. Stage 1 has 4, stage 2 has 7, stage 3 has 10.**',
    'How many tiles at stage 100? You could draw ninety-seven more pictures.',
    { fig: 'discSequences' },
    'Or look at what each stage actually *does*. Every stage adds one tile to each of the three rows — **three more, every time**.',
    'So the count goes $4, 7, 10, 13, \\ldots$, always stepping by $3$.',
    'Stage $100$ has taken $99$ steps of $3$ from the start: $4 + 99 \\times 3 = 301$.',
    { punch: 'Notice the $99$, not $100$. **The first stage needed no steps at all** — which is exactly why the formula reads $a_1 + (n-1)d$, and why that $-1$ causes more errors here than anything else.' }
  ],
  funfact: [
    'Asked to keep a class busy, a teacher told the young **Carl Friedrich Gauss** to add up every number from $1$ to $100$.',
    'He is said to have answered almost immediately: $5050$. He had paired $1$ with $100$, $2$ with $99$, and so on — fifty pairs each summing to $101$.',
    'He was about nine. The trick works for any arithmetic sequence, and it is still the standard proof of the sum formula.'
  ],
  vocab: [
    ['Sequence', 'An ordered list of numbers. The $n$th one is $a_n$.'],
    ['Explicit formula', 'A rule giving $a_n$ directly from $n$.'],
    ['Recursive formula', 'A rule giving $a_n$ from $a_{n-1}$, plus a starting value.'],
    ['Common difference', 'The constant added each time, in an arithmetic sequence.'],
    ['Common ratio', 'The constant multiplied each time, in a geometric sequence.']
  ],
  sections: [
    { h: 'Arithmetic or geometric?',
      p: ['Subtract consecutive terms. Constant? Arithmetic, with that <strong>common difference</strong> $d$.',
          'Divide consecutive terms. Constant? Geometric, with that <strong>common ratio</strong> $r$.',
          '<em>Neither</em>? It may still have a pattern — squares, or Fibonacci — but it is not one of these two families.'],
      box: { k: 'key', h: 'Test both ways', t: '<em>Always</em> try subtracting and dividing. Two quick checks settle which family you are in, and everything after that follows from the formula.' } },
    { h: 'Explicit formulas',
      p: ['Arithmetic: $a_n = a_1 + (n - 1)d$. The $(n-1)$ is there because <strong>the first term needs no steps</strong>.',
          'Geometric: $a_n = a_1 \\cdot r^{\\,n-1}$, <strong>for the same reason</strong>.',
          '<strong>Explicit formulas</strong> let you jump straight to the $100$th term without computing the other $99$.'],
      box: { k: 'warn', h: 'Off by one', t: 'The $10$th term uses $9$ steps, not $10$. Writing $a_1 + nd$ instead of $a_1 + (n-1)d$ is the most frequent error in this whole unit.' } },
    { h: 'Recursive formulas',
      p: ['A recursive definition needs two lines: <strong>the starting value and the rule</strong>.',
          'Arithmetic: $a_1 = 4$, $a_n = a_{n-1} + 3$. Geometric: $a_1 = 4$, $a_n = 2a_{n-1}$.',
          'Without the starting value the rule describes infinitely many different <strong>sequences</strong>, so it is not optional.'],
      box: { k: 'slow', h: 'Both lines, always', t: 'A recursive answer that omits $a_1$ is incomplete and loses marks, even when the rule is perfect.' } },
    { h: 'Sequences as functions',
      p: ['The <strong>domain</strong> of a sequence is the counting numbers $1, 2, 3, \\ldots$ — not all real numbers.',
          'So its graph is a set of separate dots, <em>never</em> a continuous line. Do not join them up.',
          'An arithmetic sequence sits on a straight line; a geometric one sits on an <strong>exponential</strong> curve.']}
  ],
  examples: [
    { t: 'Which family?', q: 'Classify $80, 40, 20, 10, \\ldots$ and write an explicit formula.',
      steps: [
        { do: 'Differences: $-40, -20, -10$ — not constant.', why: 'Not arithmetic.' },
        { do: 'Ratios: $\\dfrac{40}{80} = \\dfrac{1}{2}$, and the same each time.', why: 'Geometric with $r = \\dfrac{1}{2}$.' },
        { do: '$a_n = 80 \\left(\\dfrac{1}{2}\\right)^{n-1}$', why: 'First term times the ratio, $n-1$ times.' },
        { do: 'Check $a_4 = 80\\left(\\dfrac{1}{8}\\right) = 10$ &check;', why: 'Matches the list.' }
      ], ans: 'Geometric; $a_n = 80\\left(\\dfrac{1}{2}\\right)^{n-1}$' },
    { t: 'Explicit to a far term', q: 'An arithmetic sequence has $a_1 = -5$ and $d = 6$. Find $a_{25}$.',
      steps: [
        { do: '$a_n = -5 + (n - 1)(6)$', why: 'The arithmetic formula.' },
        { do: '$a_{25} = -5 + 24(6)$', why: '$24$ steps to reach the $25$th term.' },
        { do: '$= -5 + 144 = 139$', why: 'Equivalently $6n - 11$, and $6(25) - 11 = 139$ &check;' }
      ], ans: '$a_{25} = 139$' },
    { t: 'Writing both forms', q: 'Write explicit and recursive formulas for $3, 12, 48, 192, \\ldots$.',
      steps: [
        { do: 'Ratios: $\\dfrac{12}{3} = 4$, constant.', why: 'Geometric with $r = 4$.' },
        { do: 'Explicit: $a_n = 3 \\cdot 4^{\\,n-1}$', why: 'Check $a_3 = 3(16) = 48$ &check;' },
        { do: 'Recursive: $a_1 = 3$ and $a_n = 4a_{n-1}$', why: 'Starting value plus the rule — both lines.' }
      ], ans: '$a_n = 3 \\cdot 4^{\\,n-1}$; or $a_1 = 3$, $a_n = 4a_{n-1}$' }
  ],
  mistakes: [
    'Using $n$ where the formula needs $n - 1$. The tenth term is $a_1 + 9d$, because the first term is already there before any step is taken. Count the <em>gaps</em>, not the terms.',
    'Giving a recursive rule without the first term. "$a_n = a_{n-1} + 3$" describes infinitely many sequences — one for every possible start. Both lines are the answer, not just the interesting one.',
    'Joining the dots when graphing a sequence. Its domain is the counting numbers, so there is no stage $2.5$. The graph is separate points, and a connecting line claims something that does not exist.',
    'Testing only for a common difference. If subtracting gives nothing constant, try <strong>dividing</strong>. $80, 40, 20, 10$ has no common difference at all but a perfectly clean ratio of $\\tfrac12$.'
  ]
},
{
  id: 'polynomials', strand: 'algebra', fig: 'areaModelPoly',
  title: 'Polynomial Operations',
  big: 'Add and subtract by collecting like terms. Multiply by making sure every pair meets exactly once.',
  discover: [
    '**Draw a rectangle $x + 3$ wide and $x + 2$ tall.** What is its area?',
    'Its area is $(x + 3)(x + 2)$ — that is just what area means. But you can also cut it up.',
    { fig: 'discPolynomials' },
    'The two cuts make four patches, and each patch is easy: $x \\cdot x$, $3 \\cdot x$, $2 \\cdot x$ and $3 \\cdot 2$.',
    'Add them: $x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.',
    'Nothing can be missed, because **no part of a rectangle is left uncovered**.',
    { punch: 'That is all FOIL ever meant — it just named the four patches in an order. The picture keeps working for bigger brackets, where FOIL does not: a $3 \\times 2$ grid has six patches, and you fill in all six.' }
  ],
  funfact: [
    'Algebra tiles — physical squares and rectangles for $x^2$, $x$ and $1$ — became a standard classroom tool in the 1960s.',
    'But the idea is far older: **Euclid\'s** Book II proves algebraic identities entirely with rectangles, because the Greeks had no algebraic notation.',
    'His Proposition 4 is $(a+b)^2 = a^2 + 2ab + b^2$, stated and proved as a fact about squares on a line.'
  ],
  vocab: [
    ['Polynomial', 'A sum of terms, each a number times a whole-number power of the variable.'],
    ['Like terms', 'Terms with identical variable parts. $4x^2$ and $-9x^2$ are like; $4x^2$ and $4x$ are not.'],
    ['Binomial', 'A polynomial with two terms.'],
    ['Closure', 'Polynomials added, subtracted or multiplied always give another polynomial.'],
    ['Standard form', 'Terms written in order of decreasing degree.']
  ],
  sections: [
    { h: 'Adding and subtracting',
      p: ['Add by collecting <strong>like terms</strong>. $(3x^2 + 5x) + (2x^2 - 8x) = 5x^2 - 3x$.',
          'Subtract by distributing the minus sign to <strong>every</strong> term in the second polynomial, then collecting.',
          '$(4x^2 - 3x + 1) - (x^2 + 5x - 6) = 4x^2 - 3x + 1 - x^2 - 5x + 6 = 3x^2 - 8x + 7$.'],
      box: { k: 'warn', h: 'The minus reaches everything', t: 'Subtracting $(x^2 + 5x - 6)$ gives $-x^2 - 5x + 6$. All three signs change, including the one that was already negative.' } },
    { h: 'Multiplying',
      p: ['Every term in the first bracket must multiply every term in the second. For two <strong>binomials</strong> that is four products — the origin of FOIL.',
          'For bigger brackets, FOIL does not apply, but the principle does. Use a grid and fill in <em>every</em> cell.',
          'Then collect like terms and write the answer in <strong>standard form</strong>.'],
      box: { k: 'key', h: 'Use a box, not a mnemonic', t: 'Draw a rectangle with one <strong>polynomial</strong> along the top and the other down the side. Fill every cell, then add. It never misses a product, whatever the sizes.' } },
    { h: 'Special products worth knowing',
      p: ['$(a + b)^2 = a^2 + 2ab + b^2$. <strong>The middle term is easy to forget</strong>.',
          '$(a - b)^2 = a^2 - 2ab + b^2$.',
          '$(a + b)(a - b) = a^2 - b^2$ — the middle terms cancel, leaving a <strong>difference of squares</strong>.'],
      box: { k: 'slow', h: '$(x + 3)^2$ is not $x^2 + 9$', t: 'It is $(x+3)(x+3) = x^2 + 6x + 9$. Write the bracket out twice. Squaring a sum is not squaring each piece.' } },
    { h: 'Closure',
      p: ['Add, subtract or multiply two <strong>polynomials</strong> and you always get a polynomial. That is what closure means.',
          '<strong>Division breaks it</strong>: $\\dfrac{x^2 + 1}{x}$ is not a polynomial, because of the $\\dfrac{1}{x}$.',
          'So polynomials are closed under addition, subtraction and multiplication, but not division — <em>exactly</em> like the integers.']}
  ],
  examples: [
    { t: 'Subtracting', q: 'Simplify $(5x^2 - 2x + 7) - (2x^2 + 4x - 3)$.',
      steps: [
        { do: 'Distribute the minus: $5x^2 - 2x + 7 - 2x^2 - 4x + 3$', why: 'Every sign in the second bracket flips.' },
        { do: '$x^2$ terms: $5x^2 - 2x^2 = 3x^2$', why: 'Collect like terms.' },
        { do: '$x$ terms: $-2x - 4x = -6x$', why: 'Both negative now.' },
        { do: 'Constants: $7 + 3 = 10$', why: '$-(-3)$ became $+3$.' }
      ], ans: '$3x^2 - 6x + 10$' },
    { t: 'Multiplying binomials', q: 'Expand $(2x - 5)(3x + 4)$.',
      steps: [
        { do: '$2x \\cdot 3x = 6x^2$', why: 'First times first.' },
        { do: '$2x \\cdot 4 = 8x$ and $-5 \\cdot 3x = -15x$', why: 'The two middle products.' },
        { do: '$-5 \\cdot 4 = -20$', why: 'Last times last.' },
        { do: '$6x^2 + 8x - 15x - 20 = 6x^2 - 7x - 20$', why: 'Collect the middle terms.' }
      ], ans: '$6x^2 - 7x - 20$' },
    { t: 'A special product', q: 'Expand $(3x - 4)^2$.',
      steps: [
        { do: 'Write it out: $(3x - 4)(3x - 4)$', why: 'Never square the terms separately.' },
        { do: '$9x^2$ from the first pair.', why: '$3x \\cdot 3x$.' },
        { do: 'Middle: $-12x - 12x = -24x$', why: 'Twice the product of the two terms.' },
        { do: 'Last: $16$', why: '$(-4)(-4) = +16$.' }
      ], ans: '$9x^2 - 24x + 16$' }
  ],
  mistakes: [
    'Distributing a subtraction to only the first term. $-(x^2 + 5x - 6)$ is $-x^2 - 5x + 6$: <strong>all three</strong> signs change, including the one that was already negative. This is the most reliable source of errors in the unit.',
    'Writing $(x + 5)^2$ as $x^2 + 25$. Squaring a sum is not squaring each piece — write the bracket out twice and the middle term $10x$ appears. Check with $x = 1$: $36$, not $26$.',
    'Adding $3x^2$ and $4x$ as like terms. They are not: $x^2$ and $x$ are different quantities, the way an area and a length are. Only identical variable parts can be collected.',
    'Missing a product when the brackets get bigger. FOIL only has four letters and stops working past two binomials. Draw the grid and fill every cell — it never misses.'
  ]
}
,
{
  id: 'factoring', strand: 'algebra', fig: 'factorBox',
  title: 'Factoring',
  big: 'Factoring is multiplication run backwards. Always pull out the common factor first — it makes everything after it easier.',
  discover: [
    '**Someone hands you one big square tile, seven long strips and twelve small squares.** Make one rectangle from all of them.',
    { fig: 'discFactoring' },
    'The big tile is $x^2$, each strip is $x$, each little square is $1$. You are holding $x^2 + 7x + 12$.',
    'Split the seven strips between the right edge and the bottom. Try $2$ and $5$: the corner then needs $10$ small squares, and you have twelve. It does not close.',
    'Try $3$ and $4$: the corner needs exactly $12$. **It closes.**',
    'So the sides are $x + 3$ and $x + 4$ — and the reason $3$ and $4$ worked is that $3 \\times 4 = 12$ and $3 + 4 = 7$.',
    { punch: 'Factoring is the area model run backwards. You are given what is inside and asked for the sides — and only one split of the strips leaves a clean rectangle.' }
  ],
  funfact: [
    'Factoring is easy for small numbers and brutally hard for large ones — and modern banking depends on exactly that.',
    'RSA encryption multiplies two enormous primes together. Anyone can see the product; nobody can factor it back in reasonable time.',
    'In 2020 it took roughly 2,700 core-years of computing to factor a single 250-digit number. Multiplying those primes took a fraction of a second.'
  ],
  vocab: [
    ['Factor', 'Something being multiplied.'],
    ['GCF', 'Greatest common factor: the largest thing dividing every term.'],
    ['Difference of squares', '$a^2 - b^2 = (a - b)(a + b)$.'],
    ['Perfect square trinomial', '$a^2 \\pm 2ab + b^2 = (a \\pm b)^2$.'],
    ['Prime polynomial', 'One that will not factor any further over the integers.']
  ],
  sections: [
    { h: 'The order to try things',
      p: ['<strong>1.</strong> Pull out the GCF. <strong>2.</strong> Count the terms. <strong>3.</strong> Use the matching pattern. <strong>4.</strong> Check whether any factor can go further.',
          'Two terms: look for a <strong>difference of squares</strong>. Three terms: look for a pair of numbers. Four terms: try grouping.',
          'Then multiply your answer back out. Factoring is the one topic where <strong>checking is completely mechanical</strong>.'],
      box: { k: 'key', h: 'GCF first, always', t: '$2x^2 + 10x + 12$ looks awkward until you take out the $2$: $2(x^2 + 5x + 6) = 2(x + 2)(x + 3)$. Skipping the GCF makes easy problems hard.' } },
    { h: 'Trinomials with leading coefficient 1',
      p: ['For $x^2 + bx + c$, find two numbers that <strong>multiply to $c$</strong> and <strong>add to $b$</strong>.',
          '$x^2 + 7x + 12$: the pair is $3$ and $4$, so it <strong>factors</strong> as $(x + 3)(x + 4)$.',
          'If $c$ is positive, <em>both</em> numbers share $b$\'s sign. If $c$ is negative, the numbers have opposite signs.'],
      box: { k: 'slow', h: 'List the factor pairs', t: 'For $c = 12$: $1\\&12$, $2\\&6$, $3\\&4$. Check which pair adds to $b$. Writing all the pairs down beats staring at the problem.' } },
    { h: 'When the leading coefficient is not 1',
      p: ['For $ax^2 + bx + c$, find two numbers multiplying to $a \\cdot c$ and adding to $b$. <strong>Split the middle term</strong> with them, then group.',
          '$6x^2 + 7x - 3$: $a \\cdot c = -18$, and $9 \\times (-2) = -18$ with $9 + (-2) = 7$.',
          '$6x^2 + 9x - 2x - 3 = 3x(2x + 3) - 1(2x + 3) = (2x + 3)(3x - 1)$.'],
      box: { k: 'warn', h: 'Multiply $a$ by $c$, not just use $c$', t: 'With a leading coefficient, the target product is $a \\cdot c$. Using $c$ alone is the reason this method appears not to work.' } },
    { h: 'The patterns',
      p: ['Difference of squares: $9x^2 - 25 = (3x - 5)(3x + 5)$. Both terms must be <strong>perfect squares</strong>, with a minus between them.',
          'A <em>sum</em> of squares, like $x^2 + 25$, does not factor over the real numbers.',
          '<strong>Perfect square trinomial</strong>: $x^2 - 10x + 25 = (x - 5)^2$. Check that the middle term really is twice the product.'],
      box: { k: 'key', h: 'Factoring by grouping', t: 'Four terms: group in pairs, factor each pair, and hope the same bracket appears twice. $x^3 + 2x^2 + 3x + 6 = x^2(x + 2) + 3(x + 2) = (x + 2)(x^2 + 3)$.' } }
  ],
  examples: [
    { t: 'GCF then trinomial', q: 'Factor $3x^2 - 27x + 60$ completely.',
      steps: [
        { do: 'GCF is $3$: $3(x^2 - 9x + 20)$', why: 'Always first.' },
        { do: 'Need two numbers multiplying to $20$, adding to $-9$.', why: 'Both negative, since the product is positive and the sum negative.' },
        { do: '$-4$ and $-5$ work.', why: '$(-4)(-5) = 20$ and $-4 - 5 = -9$.' },
        { do: '$3(x - 4)(x - 5)$', why: 'Check: $3(x^2 - 9x + 20) = 3x^2 - 27x + 60$ &check;' }
      ], ans: '$3(x - 4)(x - 5)$' },
    { t: 'Leading coefficient', q: 'Factor $2x^2 + 11x + 12$.',
      steps: [
        { do: '$a \\cdot c = 2 \\times 12 = 24$; need a pair adding to $11$.', why: 'The split-the-middle method.' },
        { do: '$3$ and $8$: $3 \\times 8 = 24$ and $3 + 8 = 11$ &check;', why: 'Found the pair.' },
        { do: '$2x^2 + 3x + 8x + 12$', why: 'Split the middle term.' },
        { do: '$x(2x + 3) + 4(2x + 3) = (2x + 3)(x + 4)$', why: 'Group and factor out the shared bracket.' }
      ], ans: '$(2x + 3)(x + 4)$' },
    { t: 'Difference of squares twice', q: 'Factor $16x^4 - 81$ completely.',
      steps: [
        { do: '$16x^4 = (4x^2)^2$ and $81 = 9^2$', why: 'Both perfect squares.' },
        { do: '$(4x^2 - 9)(4x^2 + 9)$', why: 'First application of the pattern.' },
        { do: '$4x^2 - 9$ is also a difference of squares: $(2x - 3)(2x + 3)$', why: 'Keep going while you can.' },
        { do: '$(2x - 3)(2x + 3)(4x^2 + 9)$', why: '$4x^2 + 9$ is a sum of squares, so it stops here.' }
      ], ans: '$(2x - 3)(2x + 3)(4x^2 + 9)$' }
  ],
  mistakes: [
    'Skipping the GCF. $2x^2 + 10x + 12$ looks awkward until you take out the $2$, leaving $2(x + 2)(x + 3)$. Going straight to the trinomial makes an easy problem hard and often unfactorable-looking.',
    'Trying to factor a sum of squares. $x^2 + 9$ has no real factors — there is no pair of numbers multiplying to $9$ and adding to $0$. Only a <strong>difference</strong> of squares splits.',
    'Using $c$ instead of $a \\cdot c$ when the leading coefficient is not $1$. For $6x^2 + 7x - 3$ the target product is $-18$, not $-3$. Using $c$ alone is why this method appears not to work.',
    'Stopping too early. After the first split, check each factor again — $x^2 - 9$ inside your answer still factors. "Completely" means until nothing can be taken further.'
  ]
},
{
  id: 'quadgraphs', strand: 'algebra', fig: 'parabolaParts',
  title: 'Graphing Quadratics',
  big: 'Every parabola has a vertex, an axis of symmetry, and up to two roots. Find those and the graph draws itself.',
  discover: [
    '**Throw a ball and photograph it every half second.**',
    'The dots are not evenly spaced. Going up they bunch closer together; coming down they spread apart.',
    { fig: 'discQuadgraphs' },
    'It slows as it rises, stops for an instant at the top, then speeds up on the way down.',
    'Now fold the picture down the dashed line through the highest point. **Every ball lands on its twin.**',
    'The path is perfectly symmetric — the way up is the way down, reversed.',
    { punch: 'That mirror line is the **axis of symmetry**, and the top of it is the **vertex**. Find those two and the rest of the parabola draws itself, because the left half is just the right half reflected.' }
  ],
  funfact: [
    'A parabola reflects every incoming parallel ray to a single point. That is why satellite dishes, car headlights and radio telescopes are all parabolic.',
    '**Archimedes** is said to have used bronze parabolic mirrors to set Roman ships alight during the siege of Syracuse. Modern tests suggest this is a legend.',
    'But the underlying fact is real, and the word *focus* is Latin for **hearth** or fireplace — the point where the heat gathers.'
  ],
  vocab: [
    ['Parabola', 'The U-shaped graph of a quadratic function.'],
    ['Vertex', 'The turning point — the minimum if it opens up, the maximum if it opens down.'],
    ['Axis of symmetry', 'The vertical line through the vertex, $x = -\\dfrac{b}{2a}$.'],
    ['Roots / zeros', 'The $x$ values where $y = 0$.'],
    ['Vertex form', '$y = a(x - h)^2 + k$, with vertex at $(h, k)$.']
  ],
  sections: [
    { h: 'Which way it opens',
      p: ['If $a > 0$ the <strong>parabola</strong> opens upward and the vertex is the lowest point — a minimum.',
          'If $a < 0$ it opens downward and the <strong>vertex</strong> is a maximum.',
          'A larger $|a|$ <strong>makes the curve narrower</strong>; a smaller one makes it wider.'],
      box: { k: 'key', h: 'The sign of $a$ decides', t: 'Positive $a$: happy face, minimum. Negative $a$: sad face, maximum. Check this before anything else — it tells you what kind of answer to expect.' } },
    { h: 'Finding the vertex',
      p: ['From standard form, the <strong>axis of symmetry</strong> is $x = -\\dfrac{b}{2a}$. Substitute that $x$ back in to get the $y$.',
          'For $y = x^2 - 6x + 5$: $x = \\dfrac{6}{2} = 3$, and $y = 9 - 18 + 5 = -4$. Vertex $(3, -4)$.',
          'From <strong>vertex form</strong> $y = a(x - h)^2 + k$, the vertex is simply $(h, k)$ — read straight off.'],
      box: { k: 'warn', h: 'Watch the sign in vertex form', t: '$y = 2(x - 5)^2 + 3$ has vertex $(5, 3)$, but $y = 2(x + 5)^2 + 3$ has vertex $(-5, 3)$. The $h$ is subtracted, so the sign flips.' } },
    { h: 'Roots and the y-intercept',
      p: ['The $y$-intercept is $c$ — set $x = 0$ and everything else disappears. <strong>No work at all</strong>.',
          'The <strong>roots</strong> are where $y = 0$. Factor, or use the quadratic formula.',
          'A parabola can have two roots, one (a repeated root, where <strong>the vertex</strong> sits on the axis), or none.'],
      box: { k: 'slow', h: 'Symmetry gives free points', t: 'Once you know the <strong>vertex</strong> and one other point, its mirror image across the axis is also on the curve. Two calculations, five points.' } },
    { h: 'Sketching it',
      p: ['Plot the vertex. Plot the $y$-intercept. <strong>Reflect that across the axis of symmetry</strong> for a third point.',
          'Plot any roots you have. Then draw a smooth U through them — <em>never</em> a V, and never with straight sides.',
          'Label the vertex and the axis. Those are <strong>what the marks are for</strong>.'],
      box: { k: 'key', h: 'The roots average to the axis', t: 'If the roots are $2$ and $8$, the axis is $x = 5$. Symmetry, and a quick check on your $-\\dfrac{b}{2a}$.' } },
    { h: 'Maximum and minimum problems',
      p: ['"What is the greatest height?" <strong>asks for the</strong> $y$ of the vertex. "When does it happen?" asks for the $x$.',
          'For projectile problems, the roots are when the height is zero — <strong>launch and landing</strong>.',
          'Read carefully which of the two the question wants; <strong>answering with the wrong coordinate</strong> is a common and avoidable loss.']}
  ],
  examples: [
    { t: 'Vertex and axis', q: 'For $y = 2x^2 - 12x + 7$, find the axis of symmetry and the vertex.',
      steps: [
        { do: '$a = 2$, $b = -12$', why: 'Read the coefficients, signs included.' },
        { do: '$x = -\\dfrac{-12}{2(2)} = \\dfrac{12}{4} = 3$', why: 'The axis of symmetry.' },
        { do: '$y = 2(9) - 12(3) + 7 = 18 - 36 + 7 = -11$', why: 'Substitute back for the $y$.' },
        { do: 'Vertex $(3, -11)$, a minimum since $a > 0$.', why: 'Opens upward.' }
      ], ans: 'Axis $x = 3$; vertex $(3, -11)$, a minimum' },
    { t: 'Sketch from the key features', q: 'Sketch $y = -x^2 + 4x + 5$.', fig: 'sketchDown',
      steps: [
        { do: '$a = -1 < 0$, so it opens downward.', why: 'The vertex will be a maximum.' },
        { do: 'Axis: $x = -\\dfrac{4}{2(-1)} = 2$; $y = -4 + 8 + 5 = 9$', why: 'Vertex $(2, 9)$.' },
        { do: '$y$-intercept is $5$, at $(0, 5)$. Its mirror is $(4, 5)$.', why: 'Both $2$ units from the axis.' },
        { do: 'Roots: $-x^2 + 4x + 5 = 0$ gives $(x - 5)(x + 1) = 0$, so $x = 5$ and $x = -1$.', why: 'Check: they average to $2$ &check;' }
      ], ans: 'Vertex $(2, 9)$, roots $-1$ and $5$, $y$-intercept $5$' },
    { t: 'A ball thrown from a roof', fig: 'projectileGraph', try: 'projectile',
      q: 'A ball is thrown straight up from the edge of a roof $80$ feet high, at $64$ feet per second. Gravity gives its height after $t$ seconds as $h(t) = -16t^2 + 64t + 80$ feet. How high does it go, when does it get there, and when does it hit the ground?',
      steps: [
        { do: '$a = -16 < 0$, so the graph opens downward.', why: 'Gravity pulls it back, so the vertex is the highest point.' },
        { do: '$t = -\\dfrac{64}{2(-16)} = \\dfrac{64}{32} = 2$ seconds', why: 'The time of the vertex.' },
        { do: '$h(2) = -16(4) + 64(2) + 80 = -64 + 128 + 80 = 144$ feet', why: 'Substitute for the greatest height.' },
        { do: 'The ground is $h = 0$: $-16t^2 + 64t + 80 = 0$, so $t^2 - 4t - 5 = 0$.', why: 'Divide every term by $-16$.' },
        { do: '$(t - 5)(t + 1) = 0$, so $t = 5$ or $t = -1$.', why: 'A time before the throw means nothing here — keep $t = 5$.' },
        { do: 'Check: $h(5) = -400 + 320 + 80 = 0$ &check;', why: 'Up for $2$ seconds, back to roof height at $4$, the last $80$ feet in one more.' }
      ], ans: 'Highest $144$ feet, after $2$ seconds; it lands after $5$ seconds' }
  ],
  mistakes: [
    'Dropping the minus in $x = -\\dfrac{b}{2a}$. With $b = -12$ it becomes $-\\dfrac{-12}{2a}$, which is <strong>positive</strong>. Writing the minus and the negative $b$ both down stops the two from cancelling by accident.',
    'Reading the vertex of $a(x + 3)^2$ as $x = 3$. Vertex form is $a(x - h)^2 + k$, so $x + 3$ means $h = -3$. Ask where the bracket equals zero and the sign sorts itself out.',
    'Giving the time when the question asked for the height. The $x$ of the vertex answers "when," the $y$ answers "how high." Both are one substitution apart, and picking the wrong one is pure carelessness.',
    'Drawing a parabola with straight sides or a sharp point. It curves everywhere and turns smoothly. A V belongs to absolute value, not to a quadratic.'
  ]
},
{
  id: 'solvequad', strand: 'algebra', fig: 'quadRoots',
  title: 'Solving Quadratic Equations',
  big: 'Four methods, one goal. Factoring is fastest when it works; the quadratic formula always works.',
  discover: [
    '**A vegetable bed has an area of 40 m² and is 3 m longer than it is wide.** How wide is it?',
    'Call the width $w$. The length is $w + 3$, so the area is $w(w + 3) = 40$.',
    { fig: 'discSolveQuad' },
    'Multiply it out and something new appears: $w^2 + 3w = 40$. There is a **squared term**, and the balance-scale moves cannot remove it.',
    'Get everything to one side — $w^2 + 3w - 40 = 0$ — and factor: $(w + 8)(w - 5) = 0$.',
    'A product is zero only if one of its factors is zero. So $w = -8$ or $w = 5$.',
    { punch: 'Two answers, and only one is a garden. **A quadratic often hands you two solutions and leaves you to reject one** — the algebra does not know that widths cannot be negative.' }
  ],
  funfact: [
    'Babylonian clay tablets from around 1800 BC solve quadratics by a procedure equivalent to completing the square.',
    'They had no negative numbers, so they simply never reported the negative root — it was not that they missed it; it was not a number to them.',
    'The formula in its modern form, with both roots and a $\\pm$, took until the 1600s and required Europe to accept negatives as numbers at all.'
  ],
  vocab: [
    ['Zero product property', 'If $AB = 0$ then $A = 0$ or $B = 0$.'],
    ['Quadratic formula', '$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.'],
    ['Discriminant', '$b^2 - 4ac$. Its sign counts the real solutions.'],
    ['Completing the square', 'Rewriting $x^2 + bx$ as a perfect square minus a constant.']
  ],
  sections: [
    { h: 'Get it to zero first',
      p: ['<em>Every</em> method needs the equation in the form $ax^2 + bx + c = 0$. Move everything to one side before starting.',
          '$x^2 + 5x = 6$ <em>must</em> become $x^2 + 5x - 6 = 0$. Factoring the left side of the first version proves nothing.',
          'The <strong>zero product property</strong> only works against zero. Against $6$ it says nothing whatsoever.'],
      box: { k: 'warn', h: 'Never divide by $x$', t: 'For $x^2 = 5x$, dividing by $x$ gives $x = 5$ and loses the solution $x = 0$. Factor instead: $x(x - 5) = 0$, so $x = 0$ or $x = 5$.' } },
    { h: 'Factoring and square roots',
      p: ['If it factors, use the zero product property: <strong>set each factor to zero</strong> and solve.',
          'If there is no $x$ term, take square roots directly — and remember <strong>both</strong> signs. $x^2 = 49$ gives $x = \\pm 7$.',
          '$(x - 3)^2 = 16$ gives $x - 3 = \\pm 4$, so $x = 7$ or $x = -1$.'],
      box: { k: 'key', h: 'Plus or minus', t: 'A <strong>square root</strong> step always produces two answers. Writing only the positive one throws away half the solution.' } },
    { h: 'The quadratic formula',
      p: ['$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ <strong>works on every quadratic</strong>, factorable or not.',
          'Write down $a$, $b$ and $c$ with their signs first. Then <strong>substitute</strong> with brackets.',
          'Compute the <strong>discriminant</strong> on its own line before doing anything else. It keeps the arithmetic manageable.'],
      box: { k: 'slow', h: 'Discriminant on its own line', t: 'Work out $b^2 - 4ac$ separately and write it down. Then put that single number under the root. Doing it all at once inside the formula is where sign errors breed.' } },
    { h: 'What the discriminant tells you',
      p: ['$b^2 - 4ac > 0$: two different real solutions, and the parabola <strong>crosses the</strong> $x$-axis twice.',
          '$b^2 - 4ac = 0$: one repeated solution, and <strong>the vertex</strong> sits exactly on the $x$-axis.',
          '$b^2 - 4ac < 0$: no real solutions, and the parabola <strong>misses the</strong> $x$-axis entirely.'],
      box: { k: 'key', h: 'A perfect square means it factors', t: 'If the <strong>discriminant</strong> is a perfect square, the roots are rational and the quadratic would have factored. Useful to know before you commit to a method.' } },
    { h: 'Completing the square',
      p: ['Halve $b$, square it, and add it to <em>both</em> sides. $x^2 + 6x = 7$ becomes $x^2 + 6x + 9 = 16$.',
          '<strong>The left side is now</strong> $(x + 3)^2$, so $x + 3 = \\pm 4$ and $x = 1$ or $x = -7$.',
          'This is how the <strong>quadratic formula</strong> is derived, and it is the method that converts standard form to vertex form.']}
  ],
  examples: [
    { t: 'By factoring', q: 'Solve $x^2 + 5x = 6$.',
      steps: [
        { do: 'Move everything to one side: $x^2 + 5x - 6 = 0$', why: 'The zero product property needs a zero.' },
        { do: 'Two numbers multiplying to $-6$, adding to $5$: $6$ and $-1$.', why: 'Opposite signs, since the product is negative.' },
        { do: '$(x + 6)(x - 1) = 0$', why: 'Factored.' },
        { do: '$x = -6$ or $x = 1$', why: 'Check $x = 1$: $1 + 5 = 6$ &check;' }
      ], ans: '$x = -6$ or $x = 1$' },
    { t: 'Quadratic formula', q: 'Solve $2x^2 - 7x - 3 = 0$, leaving the answer exact.',
      steps: [
        { do: '$a = 2$, $b = -7$, $c = -3$', why: 'Signs included.' },
        { do: 'Discriminant: $(-7)^2 - 4(2)(-3) = 49 + 24 = 73$', why: 'On its own line. Positive, so two real roots.' },
        { do: '$x = \\dfrac{7 \\pm \\sqrt{73}}{4}$', why: '$-b = 7$ and $2a = 4$.' },
        { do: '$73$ is not a perfect square, so this is the exact answer.', why: 'Approximately $3.89$ and $-0.39$.' }
      ], ans: '$x = \\dfrac{7 \\pm \\sqrt{73}}{4}$' },
    { t: 'Completing the square', q: 'Solve $x^2 - 8x + 3 = 0$ by completing the square.',
      steps: [
        { do: 'Move the constant: $x^2 - 8x = -3$', why: 'Get the variable terms alone.' },
        { do: 'Half of $-8$ is $-4$; squared is $16$. Add to both sides: $x^2 - 8x + 16 = 13$', why: 'Making a perfect square.' },
        { do: '$(x - 4)^2 = 13$', why: 'The left side is now a square.' },
        { do: '$x - 4 = \\pm\\sqrt{13}$, so $x = 4 \\pm \\sqrt{13}$', why: 'Both signs. About $7.61$ and $0.39$.' }
      ], ans: '$x = 4 \\pm \\sqrt{13}$' }
  ],
  mistakes: [
    'Factoring before moving everything to one side. The zero product property needs a <strong>zero</strong>. From $(x - 4)(x + 1) = 6$ you can conclude nothing — $6$ has many factor pairs.',
    'Dividing both sides by $x$. From $x^2 = 5x$ that gives $x = 5$ and silently throws away $x = 0$. Factor to $x(x - 5) = 0$ and both roots survive.',
    'Keeping only the positive square root. $(x - 2)^2 = 25$ means $x - 2 = \\pm 5$, so $x = 7$ or $x = -3$. A square root step always produces two answers.',
    'Mis-signing $-4ac$ when $c$ is already negative. With $c = -3$, $-4ac$ becomes $+24$ and the discriminant grows. Compute $b^2 - 4ac$ on its own line before it goes anywhere near the formula.'
  ]
},
{
  id: 'radicals', strand: 'number', fig: 'radicalLadder',
  title: 'Radicals & Rational Exponents',
  big: 'A root is a fractional power. Once you accept that, every exponent rule you know still applies.',
  discover: [
    '**You have 72 square tiles and want to lay them out as a perfect square patio.**',
    'It cannot be done. $8 \\times 8$ is $64$ and $9 \\times 9$ is $81$ — nothing lands on $72$.',
    { fig: 'discRadicals' },
    'So the side is $\\sqrt{72}$, somewhere between $8$ and $9$. Can that be written more usefully?',
    'Split the $72$ into $36$ and $2$. **$36$ is a perfect square**, so $\\sqrt{36} = 6$ comes straight out.',
    'That leaves $\\sqrt{72} = 6\\sqrt{2}$ — one exact number, about $8.49$.',
    { punch: 'Pulling out the $36$ is not a trick: it is the **largest square hiding inside 72**. Use $4$ instead and you get $2\\sqrt{18}$ — true, but not finished, because $18$ still has a $9$ in it.' }
  ],
  funfact: [
    'The Pythagoreans believed every length was a ratio of whole numbers. Then one of them proved $\\sqrt{2}$ is not.',
    'Legend says the discoverer, **Hippasus**, was drowned at sea for it — though the story may well have been invented later.',
    'The proof survives and is short enough to fit on a postcard. It is usually the first proof by contradiction anyone meets.'
  ],
  vocab: [
    ['Radical', 'A root expression, like $\\sqrt{50}$.'],
    ['Radicand', 'The thing under the root sign.'],
    ['Simplest radical form', 'No perfect square factors left under the root.'],
    ['Rational exponent', '$x^{1/2} = \\sqrt{x}$ and $x^{m/n} = \\sqrt[n]{x^m}$.'],
    ['Rationalise', 'Clear a radical out of a denominator.']
  ],
  sections: [
    { h: 'Simplifying a root',
      p: ['Find the largest perfect square factor of the <strong>radicand</strong>, split the root, and take that square out.',
          '$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$.',
          'If you use a smaller square, you are not wrong — <strong>just not finished</strong>. $\\sqrt{72} = 2\\sqrt{18}$ needs another round.'],
      box: { k: 'slow', h: 'Know your squares', t: '$4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$. Check the <strong>radicand</strong> against that list from the biggest down, and the first hit is the one you want.' } },
    { h: 'Adding and multiplying',
      p: ['You may only add radicals with the <em>same</em> radicand: $3\\sqrt{5} + 4\\sqrt{5} = 7\\sqrt{5}$. Treat $\\sqrt{5}$ like a variable.',
          '$\\sqrt{2} + \\sqrt{3}$ <em>cannot</em> be combined at all. It is certainly not $\\sqrt{5}$.',
          '<strong>Multiplying is easier</strong>: for real $a,b \\ge 0$, $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$, then simplify.'],
      box: { k: 'warn', h: 'Roots do not add', t: '$\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$, but $\\sqrt{25} = 5$. So splitting a square root across a sum is <strong>not a general rule</strong>. For $a,b \\ge 0$, equality holds only when at least one of them is zero.' } },
    { h: 'Rational exponents',
      p: ['$x^{1/2}$ <strong>means</strong> $\\sqrt{x}$; $x^{1/3}$ means $\\sqrt[3]{x}$. The denominator of the exponent is the root.',
          '$x^{2/3}$ means $\\sqrt[3]{x^2}$, or equivalently $\\left(\\sqrt[3]{x}\\right)^2$. <strong>Take the root first when you can</strong> — the numbers stay small.',
          '$8^{2/3} = \\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4$. <strong>Much easier than squaring</strong> $8$ first.'],
      box: { k: 'key', h: 'Denominator is the root', t: 'In $x^{m/n}$, the bottom $n$ is the root and the top $m$ is the <strong>power</strong>. Root on the bottom — it is the only thing to remember here.' } },
    { h: 'Rational or irrational?',
      p: ['The <strong>square root</strong> of a perfect square is rational. Every other square root of a whole number is irrational.',
          'Rational $+$ <strong>irrational</strong> is always irrational. Rational $\\times$ irrational is irrational, unless the rational is zero.',
          'Irrational $+$ irrational can go either way: $\\sqrt{2} + \\left(-\\sqrt{2}\\right) = 0$, which is <strong>rational</strong>.'],
      box: { k: 'key', h: 'Closure', t: 'The rationals are closed under $+$, $-$, $\\times$ and $\\div$ (except by zero). The <strong>irrationals</strong> are closed under none of them.' } }
  ],
  examples: [
    { t: 'Simplest radical form', q: 'Simplify $\\sqrt{200}$.',
      steps: [
        { do: 'Largest perfect square dividing $200$: $100$.', why: '$200 = 100 \\times 2$.' },
        { do: '$\\sqrt{200} = \\sqrt{100}\\sqrt{2}$', why: 'Split the root across the product.' },
        { do: '$= 10\\sqrt{2}$', why: 'Check: $10^2 \\times 2 = 200$ &check;' }
      ], ans: '$10\\sqrt{2}$' },
    { t: 'Adding radicals', q: 'Simplify $\\sqrt{18} + \\sqrt{50}$.',
      steps: [
        { do: '$\\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$', why: 'Simplify each one first.' },
        { do: '$\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$', why: 'Same radicand now.' },
        { do: '$3\\sqrt{2} + 5\\sqrt{2} = 8\\sqrt{2}$', why: 'Add the coefficients, keep the radical.' },
        { do: 'Not $\\sqrt{68}$.', why: 'Roots never add under one sign.' }
      ], ans: '$8\\sqrt{2}$' },
    { t: 'Rational exponent', q: 'Evaluate $27^{4/3}$ without a calculator.',
      steps: [
        { do: 'The denominator $3$ is the root: $\\sqrt[3]{27} = 3$', why: 'Take the root first to keep the numbers small.' },
        { do: 'The numerator $4$ is the power: $3^4$', why: 'Now raise it.' },
        { do: '$= 81$', why: 'The other order would mean $\\sqrt[3]{531441}$ — same answer, far more work.' }
      ], ans: '$81$' }
  ],
  mistakes: [
    'Writing $\\sqrt{a} + \\sqrt{b}$ as $\\sqrt{a+b}$. Test it: $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$, but $\\sqrt{25} = 5$. Roots simply do not add that way — though they <em>do</em> multiply that way.',
    'Using a small perfect square and stopping. $\\sqrt{72} = 2\\sqrt{18}$ is correct but unfinished. Work down from the largest square that divides — $144, 121, 100, 81, 64, 49, 36 \\ldots$ — and the first hit is the right one.',
    'Reading the numerator of a fractional exponent as the root. In $x^{m/n}$ the <strong>denominator</strong> is the root and the numerator the power. For $27^{2/3}$: cube root first, giving $3$, then square it.',
    'Adding radicals with different radicands. $3\\sqrt{2} + 4\\sqrt{5}$ cannot be combined, exactly as $3a + 4b$ cannot. Treat $\\sqrt{2}$ like a variable and the rule becomes obvious.'
  ]
},
{
  id: 'advfunctions', strand: 'algebra', fig: 'absVeeGraph',
  title: 'Absolute Value, Piecewise & Step Functions',
  big: 'Some functions change their rule partway along. Work out where the rule changes, then treat each piece separately.',
  discover: [
    '**A car park charges \\$5 for the first hour, then \\$3 for each hour after.**',
    'Stay 61 minutes and you pay the same as staying two hours. Stay 121 and the price jumps again.',
    { fig: 'discAdvFunctions' },
    'Draw it and the graph is not a line — it is a **staircase**. The price is flat across each hour and then leaps.',
    'Look at the ends of each step: one dot is filled and one is hollow. The filled one is charged; the hollow one belongs to the next step.',
    'No single formula describes this. Each hour band needs its own rule, with its own stretch of $x$.',
    { punch: 'A function built from several rules on several intervals is called **piecewise** — and absolute value is the simplest example: one rule to the left of the bend, another to the right.' }
  ],
  funfact: [
    'The absolute value bars were introduced by **Karl Weierstrass** in 1841 — the same mathematician who built the modern definition of a limit.',
    'He spent years as a schoolteacher, publishing almost nothing, before a single paper made him famous at nearly forty.',
    'He later constructed a function that is continuous everywhere but has a corner at every single point — an infinity of the bends this unit is about.'
  ],
  vocab: [
    ['Absolute value', 'Distance from zero, so never negative. $|-7| = 7$.'],
    ['Piecewise function', 'A function defined by different rules on different intervals.'],
    ['Step function', 'A piecewise function that is constant on each piece, so its graph jumps.'],
    ['Vertex of an absolute value graph', 'The corner, where the inside equals zero.']
  ],
  sections: [
    { h: 'Absolute value graphs',
      p: ['$y = |x|$ is a V with its corner at <strong>the origin</strong>, made of two straight rays.',
          'The corner of $y = |x - h| + k$ is at $(h, k)$. Find it by asking <strong>what makes the inside zero</strong>.',
          'A negative in front, as in $y = -|x|$, <strong>flips the V upside down</strong>.'],
      box: { k: 'key', h: 'Set the inside to zero', t: 'For $y = |2x - 6| + 1$, solve $2x - 6 = 0$ to get $x = 3$. The corner is at $(3, 1)$. This works whatever is inside the bars.' } },
    { h: 'Absolute value equations',
      p: ['$|x| = 5$ has two answers, $x = 5$ and $x = -5$, because <em>both</em> are $5$ away from zero.',
          'So $|2x - 1| = 9$ <strong>splits into</strong> $2x - 1 = 9$ and $2x - 1 = -9$, giving $x = 5$ and $x = -4$.',
          'An <strong>absolute value</strong> can never equal a negative, so $|x + 3| = -2$ has no solution at all.'],
      box: { k: 'warn', h: 'Isolate the bars first', t: 'For $3|x - 2| + 4 = 19$, get to $|x - 2| = 5$ before splitting. Splitting too early gives the wrong two equations.' } },
    { h: 'Piecewise functions',
      p: ['Each piece comes with an interval. Use <strong>the piece whose interval contains the input</strong> you were given.',
          'To evaluate, first ask which interval the input falls in, then use <em>only</em> that rule.',
          'To graph, draw each piece only over its own interval, with <strong>a filled dot where the endpoint is included</strong> and an open dot where it is not.'],
      box: { k: 'slow', h: 'Which interval first', t: 'Before substituting anything, decide which line of the definition applies. Substituting into the wrong piece gives a perfectly tidy wrong answer.' } },
    { h: 'Step functions',
      p: ['A parking garage charging $\\$4$ for the first hour and $\\$2$ for each hour after is a <strong>step function</strong>: the price jumps at whole hours.',
          '<strong>Postage, taxi fares and shipping bands</strong> all behave this way.',
          'The graph is a set of horizontal segments with open and filled endpoints, showing <strong>which end of each band is included</strong>.']}
  ],
  examples: [
    { t: 'Absolute value equation', q: 'Solve $3|x - 2| + 4 = 19$.',
      steps: [
        { do: 'Subtract $4$: $3|x - 2| = 15$', why: 'Isolate the absolute value.' },
        { do: 'Divide by $3$: $|x - 2| = 5$', why: 'Now the bars are alone.' },
        { do: 'Split: $x - 2 = 5$ or $x - 2 = -5$', why: 'Both are $5$ from zero.' },
        { do: '$x = 7$ or $x = -3$', why: 'Check $x = -3$: $3|-5| + 4 = 19$ &check;' }
      ], ans: '$x = 7$ or $x = -3$' },
    { t: 'Evaluating a piecewise function', q: 'For $f(x) = 2x + 1$ if $x < 3$, and $f(x) = x^2 - 4$ if $x \\geq 3$, find $f(1)$ and $f(5)$.',
      steps: [
        { do: '$1 < 3$, so use the first rule.', why: 'Choose the interval first.' },
        { do: '$f(1) = 2(1) + 1 = 3$', why: 'Only that rule applies.' },
        { do: '$5 \\geq 3$, so use the second rule.', why: 'A different piece entirely.' },
        { do: '$f(5) = 25 - 4 = 21$', why: 'The two pieces do not interact.' }
      ], ans: '$f(1) = 3$ and $f(5) = 21$' },
    { t: 'The vertex of a V', q: 'Find the vertex of $y = -2|x + 4| + 5$ and say which way it opens.',
      steps: [
        { do: 'Set the inside to zero: $x + 4 = 0$, so $x = -4$', why: 'That is where the corner sits.' },
        { do: 'Then $y = -2(0) + 5 = 5$', why: 'The absolute value contributes nothing there.' },
        { do: 'Vertex $(-4, 5)$.', why: 'Note the sign: $+4$ inside means $-4$ outside.' },
        { do: 'The $-2$ in front flips it, so it opens downward.', why: 'So $(-4, 5)$ is a maximum.' }
      ], ans: 'Vertex $(-4, 5)$, opening downward' }
  ],
  mistakes: [
    'Splitting before isolating the bars. $3|x - 2| + 4 = 19$ must become $|x - 2| = 5$ first. Splitting early gives two equations that were never equivalent to the original.',
    'Giving only the positive case. $|x| = 6$ has <strong>two</strong> answers, because two numbers sit six units from zero. Missing the negative one throws away half the solution.',
    'Reading the vertex of $|x + 4|$ as $x = 4$. Ask where the inside is zero: $x + 4 = 0$ gives $x = -4$. The sign flips because you are solving, not reading.',
    'Using the wrong piece of a piecewise function. Decide which interval the input falls in <em>before</em> substituting. Putting $x = 5$ into the rule meant for $x < 3$ gives a tidy, confident, wrong answer.'
  ]
},
{
  id: 'stats9', strand: 'data', fig: 'boxPlotSpread',
  title: 'Statistics: Centre, Spread & Displays',
  big: 'Report a centre, a spread, and the shape. One number on its own has almost never told the whole story.',
  discover: [
    '**Five houses on a street sold for \\$220k, \\$240k, \\$250k, \\$270k — and \\$3 000 000.**',
    'What is the typical price on this street? The mean says \\$796k.',
    { fig: 'discStats9' },
    'But **not one of the five houses cost anything like \\$796k.** Four of them sold for under \\$280k.',
    'The mean was dragged away by a single house. Take the middle value instead and you get \\$250k, which describes the street honestly.',
    'Move that mansion to \\$10 million and the mean leaps again — the median does not move at all.',
    { punch: 'A statistic that barely notices one extreme value is called **resistant**. Median and IQR are resistant; mean and standard deviation are not — which is exactly why house prices are always reported as medians.' }
  ],
  funfact: [
    'The box plot was invented by **John Tukey** in 1970, along with the stem-and-leaf plot and the word **software**.',
    'Tukey also coined **bit**, for binary digit, in a 1947 memo at Bell Labs.',
    'His $1.5 \\times$ IQR rule for flagging outliers was chosen for convenience, not derived — he wanted something a person could do by hand, quickly.'
  ],
  vocab: [
    ['Mean', 'The average: total divided by how many.'],
    ['Median', 'The middle value once the data is in order.'],
    ['Interquartile range', '$Q_3 - Q_1$, the spread of the middle half.'],
    ['Standard deviation', 'A measure of typical distance from the mean.'],
    ['Skew', 'A long tail on one side of the distribution.'],
    ['Five-number summary', 'Minimum, $Q_1$, median, $Q_3$, maximum.']
  ],
  sections: [
    { h: 'Choosing mean or median',
      p: ['For roughly symmetric data with no outliers, the mean and <strong>median</strong> agree and either will do.',
          'For skewed data or data with outliers, use the <strong>median</strong>. It is resistant — one extreme value barely moves it.',
          'House prices are always reported as medians, because a few enormous houses would drag the <strong>mean</strong> somewhere unrepresentative.'],
      box: { k: 'key', h: 'Resistant means unmoved by outliers', t: 'Median and IQR are resistant. Mean and <strong>standard deviation</strong> are not. Pick the resistant pair whenever the data is skewed or has outliers.' } },
    { h: 'Spread',
      p: ['<strong>Range</strong> is maximum minus minimum — simple, and ruined by a single outlier.',
          'IQR is $Q_3 - Q_1$, the width of the middle half. <strong>It ignores the extremes entirely</strong>.',
          '<strong>Standard deviation</strong> measures typical distance from the mean. Bigger means more spread out.'],
      box: { k: 'slow', h: 'Match the pair', t: 'Report mean <em>with</em> standard deviation, or median <em>with</em> IQR. Mixing a mean with an IQR is not wrong, but it looks confused.' } },
    { h: 'Shape and skew',
      p: ['Symmetric: the two halves <strong>roughly mirror each other</strong>, and mean $\\approx$ median.',
          'Skewed right: a long tail towards the high values, and the mean is pulled <em>above</em> the median.',
          'Skewed left: a long tail towards the low values, and the mean sits <em>below</em> the median.'],
      box: { k: 'warn', h: 'The tail names the skew', t: 'Skewed right means the <em>tail</em> points right, even though the bulk of the data is on the left. Follow the tail, not the peak.' } },
    { h: 'Choosing a display',
      p: ['Dot plot: small data sets, shows <em>every</em> value.',
          'Histogram: larger data sets, <strong>shows the shape of the distribution</strong>.',
          'Box plot: shows the <strong>five-number summary</strong> and is excellent for comparing two or more groups side by side.'],
      box: { k: 'key', h: 'What a box plot hides', t: 'A box plot <em>cannot</em> show two peaks. Two very different distributions can have identical box plots, so use a histogram when shape matters.' } },
    { h: 'Comparing groups',
      p: ['Compare centres, compare <strong>spreads</strong>, then compare shapes. Three sentences, in that order.',
          'Say which group is higher on average and <strong>which is more consistent</strong>. "More consistent" means a smaller spread.',
          '<em>Always</em> mention overlap. Two groups can have different medians while most of their values overlap completely.']}
  ],
  examples: [
    { t: 'Five-number summary', q: 'Find the five-number summary of $4, 7, 9, 11, 14, 18, 20, 25$.',
      steps: [
        { do: 'Already in order. Minimum $4$, maximum $25$.', why: 'The two extremes.' },
        { do: 'Eight values, so the median is the average of the $4$th and $5$th: $\\dfrac{11 + 14}{2} = 12.5$', why: 'An even count has no single middle.' },
        { do: 'Lower half $4, 7, 9, 11$, so $Q_1 = \\dfrac{7 + 9}{2} = 8$', why: 'The median of the bottom half.' },
        { do: 'Upper half $14, 18, 20, 25$, so $Q_3 = \\dfrac{18 + 20}{2} = 19$', why: 'IQR $= 19 - 8 = 11$.' }
      ], ans: '$4$, $8$, $12.5$, $19$, $25$; IQR $= 11$' },
    { t: 'Which centre?', q: 'Salaries at a small firm are $\\$40$k, $\\$42$k, $\\$45$k, $\\$47$k and $\\$650$k. Which centre should be reported?',
      steps: [
        { do: 'Mean: $\\dfrac{40 + 42 + 45 + 47 + 650}{5} = \\dfrac{824}{5} = \\$164.8$k', why: 'Add and divide.' },
        { do: 'Median: the middle of five values is $\\$45$k.', why: 'Third value in order.' },
        { do: 'Four of the five people earn less than the mean.', why: 'The $\\$650$k dragged it upwards.' },
        { do: 'So report the median, $\\$45$k.', why: 'It is resistant to that outlier.' }
      ], ans: 'The median, $\\$45$k' },
    { t: 'Comparing two groups', q: 'Class A has median $78$ and IQR $8$. Class B has median $74$ and IQR $20$. Compare them.',
      steps: [
        { do: 'Centre: A is higher, $78$ against $74$.', why: 'Compare medians.' },
        { do: 'Spread: A is much more consistent, IQR $8$ against $20$.', why: 'A smaller IQR means less variation.' },
        { do: 'So A scored higher on average and far more consistently.', why: 'Both comparisons reported.' },
        { do: 'But with B\'s spread, plenty of B students beat A\'s median.', why: 'Overlap matters, and is easy to forget.' }
      ], ans: 'A is higher and more consistent, though the groups overlap' }
  ],
  mistakes: [
    'Finding the median without ordering the data first. The median is the middle of the <strong>sorted</strong> list; taking the middle of the list as written gives whichever value happened to be typed third.',
    'Reporting the mean for obviously skewed data. One extreme value pulls the mean towards it and leaves it describing nobody. If mean and median disagree sharply, that gap is itself the finding.',
    'Calling a distribution skewed left when the tail points right. The <strong>tail</strong> names the skew, not the peak. Skewed right means a long tail of high values, with most of the data bunched on the left.',
    'Comparing centres and forgetting spreads. Two classes with the same median can be completely different: IQR $8$ means everyone near the middle, IQR $22$ means the group is all over the place.'
  ]
},

/* ---- Geometry (Grade 10, or Grade 9 accelerated). Course order lives in window.COURSES. ---- */
{
  id: 'geobasics', strand: 'geometry', fig: 'discGeobasics',
  title: 'Definitions, Postulates & Reasoning',
  big: 'Geometry runs on agreed definitions. Once a word is pinned down, arguments about it stop.',
  discover: [
    '**Describe a triangle over the phone so the other person draws exactly yours.**',
    '"A pointy one, about this big" is useless — they will draw something, but not your triangle.',
    { fig: 'discGeobasics' },
    '"$AB = 100$, $AC = 103$, angle $A = 62^\\circ$" leaves **nothing to argue about**. Only one triangle fits.',
    'That is the difference between a description and a **definition**.',
    'Geometry starts by agreeing what words mean, so that afterwards nobody can wriggle.',
    { punch: 'A few things cannot be defined without going in circles — *point*, *line*, *plane*. Those are taken as **undefined terms**, and everything else is built on top of them.' }
  ],
  funfact: [
    '**Euclid\'s** *Elements*, written around 300 BC, starts with 23 definitions, 5 postulates and 5 common notions — and then derives 465 propositions from nothing else.',
    'It was the standard textbook for **over two thousand years**, second only to the Bible in number of editions printed.',
    'Abraham Lincoln kept a copy in his saddlebag and said he read it to learn what it meant to *demonstrate* something.'
  ],
  vocab: [
    ['Undefined term', 'Point, line and plane. Described but never defined, because any definition would use them.'],
    ['Postulate', 'A statement accepted without proof, such as "two points determine exactly one line."'],
    ['Theorem', 'A statement that has been proved from postulates and earlier theorems.'],
    ['Segment', 'Two endpoints and everything between them. Written $\\overline{AB}$.'],
    ['Ray', 'One endpoint and everything beyond it in one direction. Written $\\overrightarrow{AB}$.'],
    ['Bisect', 'To cut exactly in half. A segment bisector gives two equal segments.']
  ],
  sections: [
    { h: 'Words that cannot be defined', fig: 'geoUndefined',
      p: ['Try defining *point*. "A location" — what is a location? "A spot" — what is a spot? Every attempt uses a word that needs the idea of a point.',
          'So geometry gives up gracefully. <strong>Point, line and plane are undefined terms</strong>: described, drawn, used, but never defined.',
          'Everything else is built from them. A *segment* is part of a line. An *angle* is two rays from a point. Each new word is defined using only words already agreed.'],
      box: { k: 'key', h: 'Why this is not cheating', t: 'You must start somewhere. The alternative is an infinite regress of definitions — and <strong>every branch of mathematics does the same thing</strong>, it is just unusually visible in geometry.' } },
    { h: 'Notation matters', fig: 'geoNotation',
      p: ['$\\overline{AB}$ is a <strong>segment</strong>: it stops at both ends. $\\overrightarrow{AB}$ is a <strong>ray</strong>: it starts at $A$ and carries on past $B$ forever.',
          '$\\overleftrightarrow{AB}$ is the whole <strong>line</strong>, going on in both directions. And plain $AB$ with no bar means a *number* — the length.',
          'So $\\overline{AB} \\cong \\overline{CD}$ says two segments are congruent, while $AB = CD$ says two numbers are equal. Both are correct; mixing them up is not.'],
      box: { k: 'warn', h: 'Congruent or equal?', t: 'Shapes are <strong>congruent</strong> ($\\cong$); numbers are <strong>equal</strong> ($=$). Writing $\\overline{AB} = \\overline{CD}$ is a small error that examiners do notice.' } },
    { h: 'Postulates: the rules of the game',
      p: ['Some things are so basic that proving them is impossible and assuming them is harmless. Those are <strong>postulates</strong>.',
          '"Through any two points there is exactly one line." "Through any three points not in a line there is exactly one plane." "A line contains at least two points."',
          'Every theorem you ever prove traces back to a handful of these. They are the floor you are standing on.'] },
    { h: 'Segment and angle arithmetic', fig: 'geoSegmentAdd',
      p: ['If $B$ lies between $A$ and $C$, then $AB + BC = AC$. That is the <strong>segment addition postulate</strong>, and it is exactly as obvious as it sounds.',
          'Angles work the same way: if $\\overrightarrow{OB}$ is inside $\\angle AOC$, then $m\\angle AOB + m\\angle BOC = m\\angle AOC$.',
          'Most early geometry problems are these two facts plus a little algebra.'],
      box: { k: 'slow', h: 'Draw it before you write it', t: 'Sketch the points in the order the question gives them. Half the errors in this unit come from assuming a point is between two others when the question never said so.' } },
    { h: 'Midpoints and bisectors', fig: 'geoBisectors',
      p: ['A <strong>midpoint</strong> cuts a segment into two congruent halves, so $AM = MB$ and each is half of $AB$.',
          'An <strong>angle bisector</strong> does the same for an angle, producing two congruent angles.',
          'Both give you an equation the moment you spot them, which is why questions hide them in the wording: "$M$ is the midpoint of $\\overline{AB}$" is a gift.'] }
  ],
  examples: [
    { t: 'Segment addition', q: '$B$ is between $A$ and $C$. $AB = 3x + 2$, $BC = 2x - 1$ and $AC = 26$. Find $x$.',
      steps: [
        { do: 'Write the postulate: $AB + BC = AC$', why: 'Because $B$ lies between the other two.' },
        { do: '$(3x + 2) + (2x - 1) = 26$', why: 'Substitute the expressions.' },
        { do: '$5x + 1 = 26$, so $5x = 25$', why: 'Collect and undo.' },
        { do: '$x = 5$', why: 'Check: $AB = 17$, $BC = 9$, and $17 + 9 = 26$ &check;' }
      ], ans: '$x = 5$' },
    { t: 'Using a midpoint', q: '$M$ is the midpoint of $\\overline{PQ}$. $PM = 4y - 3$ and $MQ = y + 9$. Find $PQ$.',
      steps: [
        { do: 'A midpoint makes the two halves equal: $PM = MQ$', why: 'That is what "midpoint" means.' },
        { do: '$4y - 3 = y + 9$, so $3y = 12$ and $y = 4$', why: 'Solve for $y$ first.' },
        { do: '$PM = 4(4) - 3 = 13$', why: 'Each half is $13$.' },
        { do: '$PQ = 2 \\times 13 = 26$', why: 'The question asked for the whole segment, not the half.' }
      ], ans: '$PQ = 26$' },
    { t: 'Angle bisector', q: '$\\overrightarrow{OB}$ bisects $\\angle AOC$. If $m\\angle AOC = (6x + 4)^\\circ$ and $m\\angle AOB = (2x + 14)^\\circ$, find $m\\angle AOC$.',
      steps: [
        { do: 'A bisector makes each half exactly half the whole.', why: 'So $m\\angle AOB = \\tfrac12 m\\angle AOC$.' },
        { do: '$2(2x + 14) = 6x + 4$', why: 'Doubling the half must give the whole.' },
        { do: '$4x + 28 = 6x + 4$, so $24 = 2x$ and $x = 12$', why: 'Solve.' },
        { do: '$m\\angle AOC = 6(12) + 4 = 76^\\circ$', why: 'Check: half is $38$, and $2(12) + 14 = 38$ &check;' }
      ], ans: '$76^\\circ$' }
  ],
  mistakes: [
    'Writing $\\overline{AB} = \\overline{CD}$. Segments are <strong>congruent</strong>, lengths are <strong>equal</strong> — so it is either $\\overline{AB} \\cong \\overline{CD}$ or $AB = CD$. The bar tells you which kind of object you are talking about.',
    'Assuming a point is between two others because the drawing looks that way. Betweenness has to be <em>stated</em>, because the segment addition postulate is false without it — and a diagram is not a statement.',
    'Solving for $x$ and stopping. Questions here usually want a length or an angle, and $x$ is only the route to it. Substitute back before you write the answer.',
    'Treating a theorem as a postulate or the reverse. A <strong>postulate</strong> is assumed; a <strong>theorem</strong> is earned. If you cite something as given that actually needs proving, the argument has a hole in it.'
  ]
},
{
  id: 'geoproof', strand: 'geometry', fig: 'proofSkeleton',
  title: 'How to Write a Proof',
  big: 'A proof is not a calculation. It is a chain of statements where every link carries a reason.',
  discover: [
    '**Claim: the three angles of any triangle add to $180^\\circ$.** How would you convince someone?',
    'You could draw three triangles and measure. All three come to $180^\\circ$. Case closed?',
    { fig: 'discGeoproof' },
    'No — because there are infinitely many triangles, and you checked three. A fourth could still misbehave.',
    'Now try the other column. Draw a line through the top vertex **parallel** to the base.',
    'Two of the angles reappear at the top as alternate angles, sitting alongside the third. Together they make a **straight line**.',
    { punch: 'That argument never mentions a particular triangle, so it covers **every** triangle at once. That is what a proof buys you, and why measuring cannot buy it.' }
  ],
  funfact: [
    'The Greeks were the first to insist on proof. Babylonian and Egyptian mathematics was a collection of recipes that worked; nobody asked *why*.',
    '**Thales of Miletus**, around 600 BC, is credited with the first recorded proof — that a circle is bisected by its diameter.',
    'It looks almost too obvious to bother with. That is the point: he was demonstrating what it meant to demonstrate anything.'
  ],
  vocab: [
    ['Given', 'What the problem hands you. Always the first line of a proof.'],
    ['Prove', 'The statement you must arrive at. Always the last line.'],
    ['Two-column proof', 'Statements on the left, the reason for each on the right.'],
    ['Converse', 'A statement with the if and the then swapped. It may or may not be true.'],
    ['Counterexample', 'A single case that makes a claim false. One is enough.']
  ],
  sections: [
    { h: 'What a proof has to do',
      p: ['A proof starts from things already agreed — the <strong>given</strong>, definitions, postulates and earlier theorems — and reaches the required statement by steps nobody can object to.',
          'Every statement needs a reason beside it. A statement with no reason is a guess, even when it happens to be true.',
          'And the reason must already be available: you cannot use a theorem you have not proved yet.'],
      box: { k: 'key', h: 'The test', t: 'Hand your proof to someone who disagrees with the conclusion. If they cannot point at a single line and say "why?", <strong>you have proved it</strong>.' } },
    { h: 'The two-column format',
      p: ['Statements go on the left, reasons on the right, one pair per line. The first line is always the <strong>given</strong>; the last is always what you were asked to prove.',
          'The format is not the point — it is scaffolding that stops you skipping steps. A paragraph proof saying the same things is just as valid.',
          'But while you are learning, the columns are worth keeping, because they make a missing reason impossible to hide.'] },
    { h: 'Working backwards from the goal',
      p: ['Do not start at the top and hope. Start at the <strong>bottom</strong> and ask: what would be enough to give me this?',
          'To prove two segments congruent, it would be enough to have two congruent triangles containing them. To get congruent triangles, I need three matching parts.',
          'Keep asking until you hit something you were given. Then write the whole chain out forwards.'],
      box: { k: 'slow', h: 'Mark the diagram first', t: 'Tick every given onto the picture before writing anything — equal sides, equal angles, right angles. <strong>The proof is usually visible</strong> once the diagram is marked.' } },
    { h: 'Converse, inverse, contrapositive',
      p: ['If a statement says "if $P$ then $Q$", its <strong>converse</strong> says "if $Q$ then $P$" — and the converse can easily be false.',
          '"If it is a square, it has four right angles" is true. Its converse, "if it has four right angles it is a square", is false — a rectangle is a counterexample.',
          'The <strong>contrapositive</strong>, "if not $Q$ then not $P$", is always true whenever the original is. That makes it a legitimate move in a proof; the converse is not.'],
      box: { k: 'warn', h: 'The most common logical slip', t: 'Using a converse as though it followed automatically. It does not. Some converses are true and separately proved — the converse of Pythagoras, for instance — but each one needs earning.' } },
    { h: 'Disproving something',
      p: ['To show a claim is false you do not need an argument. You need **one counterexample**.',
          '"All quadrilaterals with four equal sides are squares" dies the moment you draw a rhombus that is not a square.',
          'This asymmetry is worth noticing: proving needs every case, disproving needs one.'] }
  ],
  examples: [
    { t: 'A short two-column proof', q: 'Given: $M$ is the midpoint of $\\overline{AB}$. Prove: $AM = \\tfrac12 AB$.',
      steps: [
        { do: '$M$ is the midpoint of $\\overline{AB}$ — Given', why: 'Always open with what you were handed.' },
        { do: '$AM = MB$ — definition of midpoint', why: 'The definition is doing the work.' },
        { do: '$AM + MB = AB$ — segment addition postulate', why: '$M$ lies between $A$ and $B$.' },
        { do: '$AM + AM = AB$ — substitution', why: 'Replace $MB$ using line 2.' },
        { do: '$2AM = AB$, so $AM = \\tfrac12 AB$ — algebra', why: 'The required statement, with every line justified.' }
      ], ans: 'Proved: $AM = \\tfrac12 AB$' },
    { t: 'Finding a counterexample', q: 'Disprove: "if a quadrilateral has two pairs of equal sides, it is a parallelogram."',
      steps: [
        { do: 'One counterexample is enough.', why: 'Disproving never needs a general argument.' },
        { do: 'Take a kite with sides $5, 5, 8, 8$.', why: 'Two pairs of equal sides &check;' },
        { do: 'But in a kite the equal sides are <em>adjacent</em>, not opposite.', why: 'So no pair of sides is parallel.' },
        { do: 'A kite is therefore a counterexample, and the claim is false.', why: 'The true version requires the equal sides to be opposite.' }
      ], ans: 'A kite disproves it' },
    { t: 'Spotting a bad converse', q: '"If two angles are vertical, they are congruent." Is the converse true?',
      steps: [
        { do: 'The converse swaps the parts: "if two angles are congruent, they are vertical."', why: 'Write it out before judging it.' },
        { do: 'Look for a counterexample.', why: 'Two angles can be congruent for many reasons.' },
        { do: 'The two base angles of an isosceles triangle are congruent — and nowhere near vertical.', why: 'They do not even share a vertex.' },
        { do: 'So the converse is false.', why: 'The original statement is still perfectly true.' }
      ], ans: 'No — the converse is false' }
  ],
  mistakes: [
    'Writing a statement with no reason beside it. That is the one thing a proof may never contain, because an unjustified line is exactly what a sceptical reader will stop at — and a true statement is not the same as a proved one.',
    'Using the converse of a theorem as if it followed for free. "If $P$ then $Q$" does <strong>not</strong> give you "if $Q$ then $P$": four right angles do not make a square. Some converses are true, but each one has to be proved separately.',
    'Assuming from the picture. A diagram may look like it has a right angle or a midpoint, but unless it is <strong>marked or given</strong>, you may not use it. Diagrams are drawn to help, not to scale.',
    'Proving by example. Three triangles that each total $180^\\circ$ prove nothing about the fourth. Disproving takes one case; proving takes an argument that covers them all.'
  ]
},
{
  id: 'triproof', strand: 'geometry', fig: 'discTriproof',
  title: 'Triangle Congruence Proofs',
  big: 'Six parts make a triangle, but you never need all six. Three of the right kind are enough.',
  discover: [
    '**How much do you have to tell someone before their triangle must match yours exactly?**',
    'One side? Hopeless — they can build endless triangles on it.',
    { fig: 'discTriproof' },
    'All three sides? Now it is **locked**. Try it with three straws: there is only one triangle you can make, however you twist them.',
    'So three sides are enough. That shortcut is called **SSS**.',
    'But three *angles* are not enough — two triangles can share all three angles and be wildly different sizes.',
    { punch: 'Four combinations do lock a triangle: **SSS, SAS, ASA and AAS**. One more, **HL**, works only for right triangles. Everything else leaves room to wriggle.' }
  ],
  funfact: [
    '**SSA is deliberately missing** from the list, and the reason is worth seeing: two sides and a non-included angle can produce two different triangles.',
    'It is called the **ambiguous case**, and it is why the law of sines sometimes gives two answers later on.',
    'Some textbooks avoid writing SSA at all, because reversed it spells something the authors would rather not print.'
  ],
  vocab: [
    ['Included angle', 'The angle *between* two named sides. The A in SAS must be included.'],
    ['Included side', 'The side *between* two named angles. The S in ASA must be included.'],
    ['CPCTC', 'Corresponding Parts of Congruent Triangles are Congruent — used after proving congruence.'],
    ['Reflexive property', 'Anything is congruent to itself. A shared side is congruent to itself.'],
    ['Hypotenuse-Leg', 'HL: for right triangles only, a matching hypotenuse and one leg are enough.']
  ],
  sections: [
    { h: 'The four that work', fig: 'congruenceTests',
      p: ['<strong>SSS</strong>: three pairs of sides. <strong>SAS</strong>: two sides and the angle *between* them. <strong>ASA</strong>: two angles and the side *between* them. <strong>AAS</strong>: two angles and a side not between them.',
          'AAS works because knowing two angles gives you the third for free — so AAS is really ASA in disguise.',
          'For right triangles there is a fifth: <strong>HL</strong>, a matching hypotenuse and one leg.'],
      box: { k: 'key', h: 'What "included" means', t: 'In SAS the angle must sit <strong>between</strong> the two sides. Two sides plus an angle somewhere else is SSA, which does not work — and that single word is the whole difference.' } },
    { h: 'The two that do not', fig: 'congruenceFails',
      p: ['<strong>AAA</strong> gives similar triangles, not congruent ones. All the angles match and the sizes need not.',
          '<strong>SSA</strong> is the ambiguous case: swing the unattached side and it can meet the far line in two different places, giving two different triangles.',
          'If your proof needs one of these, you have not got enough — go back and find another given.'] },
    { h: 'Finding the third part', fig: 'sharedSide',
      p: ['A proof usually hands you two parts and hides the third. The commonest hiding places are worth knowing.',
          'A <strong>shared side</strong> is congruent to itself — cite the reflexive property. A pair of <strong>vertical angles</strong> is automatically congruent.',
          'Parallel lines in the figure give you alternate interior or corresponding angles. A midpoint gives two equal segments.'],
      box: { k: 'slow', h: 'Mark the diagram', t: 'Tick the givens onto the picture, then look for the free third part. <strong>It is almost always a shared side or a pair of vertical angles</strong>, and once marked the proof is visible.' } },
    { h: 'CPCTC: what congruence buys you',
      p: ['Once two triangles are proved congruent, <em>every</em> pair of corresponding parts is congruent. That is <strong>CPCTC</strong>.',
          'This is usually the point of the proof. You want to show two segments are equal, so you prove the triangles containing them are congruent, then cite CPCTC.',
          'The order matters: CPCTC comes <em>after</em> congruence, never before. Using it to prove congruence is circular.'] },
    { h: 'Isosceles triangles', fig: 'isoscelesBase',
      p: ['If two sides of a triangle are congruent, the angles opposite them are congruent. This is the <strong>base angles theorem</strong>.',
          'Its converse is also true and also useful: equal base angles force equal sides.',
          'Both are proved by drawing the bisector from the apex and using SAS — a good example of adding a line to create triangles that were not there.'] }
  ],
  examples: [
    { t: 'Choosing the right shortcut', q: 'In $\\triangle ABC$ and $\\triangle DEF$: $AB \\cong DE$, $\\angle B \\cong \\angle E$, $BC \\cong EF$. Which shortcut applies?',
      steps: [
        { do: 'List what you have in order around the triangle.', why: 'Side $AB$, angle $B$, side $BC$.' },
        { do: 'The angle sits between the two sides.', why: '$\\angle B$ is formed by $AB$ and $BC$.' },
        { do: 'So it is SAS, not SSA.', why: 'Included angle — the shortcut applies.' },
        { do: '$\\triangle ABC \\cong \\triangle DEF$ by SAS.', why: 'Letters in matching order.' }
      ], ans: 'SAS' },
    { t: 'Finding the hidden third part', q: 'Two triangles share side $\\overline{BD}$. You are given $AB \\cong CB$ and $\\angle ABD \\cong \\angle CBD$. Prove $\\triangle ABD \\cong \\triangle CBD$.',
      steps: [
        { do: '$AB \\cong CB$ — Given', why: 'One side.' },
        { do: '$\\angle ABD \\cong \\angle CBD$ — Given', why: 'The angle between them.' },
        { do: '$BD \\cong BD$ — reflexive property', why: 'The shared side is the free third part.' },
        { do: '$\\triangle ABD \\cong \\triangle CBD$ by SAS', why: 'Side, included angle, side.' }
      ], ans: 'Congruent by SAS' },
    { t: 'Using CPCTC', q: 'Having proved $\\triangle ABD \\cong \\triangle CBD$, prove $\\overline{AD} \\cong \\overline{CD}$.',
      steps: [
        { do: '$\\triangle ABD \\cong \\triangle CBD$ — proved above', why: 'Congruence first.' },
        { do: '$\\overline{AD} \\cong \\overline{CD}$ — CPCTC', why: '$AD$ and $CD$ are corresponding sides.' },
        { do: 'Check the correspondence: $A\\!\\to\\!C$, $B\\!\\to\\!B$, $D\\!\\to\\!D$.', why: 'So $AD$ really does pair with $CD$.' }
      ], ans: '$\\overline{AD} \\cong \\overline{CD}$ by CPCTC' }
  ],
  mistakes: [
    'Using SSA as though it were a shortcut. Two sides and a <em>non-included</em> angle can give two different triangles — the ambiguous case — so it proves nothing. Check that the angle in SAS really sits between the two sides.',
    'Treating AAA as congruence. Equal angles give <strong>similar</strong> triangles, which may be any size: a small triangle and a huge one can have identical angles. You need at least one side to fix the scale.',
    'Citing CPCTC before proving congruence. CPCTC is what congruence <em>gives</em> you, so using it to establish congruence is circular. It can only ever appear after the congruence line.',
    'Writing the letters in the wrong order. $\\triangle ABC \\cong \\triangle DFE$ claims $B$ pairs with $F$, which is a different and usually false statement. The order <em>is</em> the correspondence.'
  ]
},
{
  id: 'polygons', strand: 'geometry', fig: 'polygonFamily',
  title: 'Quadrilaterals & Polygon Properties',
  big: 'The quadrilateral family is a ladder of conditions. Each rung adds one requirement and inherits everything above.',
  discover: [
    '**Here are six four-sided shapes. What do they have in common?**',
    'Four straight sides, joined up. That is the entire list.',
    { fig: 'discPolygons' },
    'But some of them have more. A parallelogram has both pairs of sides parallel — an extra condition.',
    'A rectangle is a parallelogram that also has four right angles. A rhombus is one with four equal sides.',
    'A square has *both* extra conditions, which is why it sits at the bottom of the family.',
    { punch: 'So a square **is** a rectangle, and it is also a rhombus, and a parallelogram, and a quadrilateral. Each rung inherits everything above it — and that is what makes "prove it is a rectangle" a finite job.' }
  ],
  funfact: [
    'The word **trapezoid** means opposite things in different countries. In the US it is a quadrilateral with exactly one pair of parallel sides; in the UK that shape is a **trapezium**, and *trapezoid* means no parallel sides at all.',
    'Both come from the Greek *trapeza*, "table" — a four-legged thing.',
    'Exam boards on each side of the Atlantic have quietly accepted the clash for over a century.'
  ],
  vocab: [
    ['Polygon', 'A closed figure made of straight segments that meet only at endpoints.'],
    ['Regular polygon', 'All sides equal and all angles equal.'],
    ['Parallelogram', 'A quadrilateral with both pairs of opposite sides parallel.'],
    ['Rhombus', 'A parallelogram with four congruent sides.'],
    ['Trapezoid', 'A quadrilateral with exactly one pair of parallel sides.'],
    ['Diagonal', 'A segment joining two non-adjacent vertices.']
  ],
  sections: [
    { h: 'Angle sums', fig: 'polygonSum',
      p: ['Any polygon with $n$ sides splits into $n - 2$ triangles by drawing diagonals from one vertex.',
          'So the <strong>interior angles sum</strong> to $(n-2) \\times 180^\\circ$. A quadrilateral gives $360^\\circ$, a pentagon $540^\\circ$, a hexagon $720^\\circ$.',
          'The <strong>exterior angles</strong> of any convex polygon always add to $360^\\circ$ — whatever $n$ is. Walk once round the outside and you have turned through one full circle.'],
      box: { k: 'key', h: 'Regular polygons', t: 'In a regular $n$-gon each exterior angle is $\\dfrac{360}{n}$ and each interior angle is $180 - \\dfrac{360}{n}$. That is usually quicker than the $(n-2)180$ route.' } },
    { h: 'What a parallelogram gives you', fig: 'parallelogramProps',
      p: ['Opposite sides are congruent <em>and</em> parallel. Opposite angles are congruent. Consecutive angles are supplementary.',
          'And the <strong>diagonals bisect each other</strong> — they cut each other exactly in half at their crossing point.',
          'Each of these is also a *test*: prove any one of them and you have proved the shape is a parallelogram.'] },
    { h: 'Rectangles, rhombuses, squares', fig: 'quadDiagonals',
      p: ['A <strong>rectangle</strong> is a parallelogram with a right angle — and then all four are right angles. Its diagonals are congruent.',
          'A <strong>rhombus</strong> is a parallelogram with two adjacent sides congruent — and then all four are. Its diagonals are perpendicular and bisect the angles.',
          'A <strong>square</strong> is both, so it collects every property on the list: congruent diagonals that are also perpendicular.'],
      box: { k: 'warn', h: 'Diagonals tell them apart', t: 'All parallelograms have diagonals that <em>bisect</em>. Only rectangles have <strong>congruent</strong> diagonals; only rhombuses have <strong>perpendicular</strong> ones. A square has both.' } },
    { h: 'Trapezoids', fig: 'trapezoidProps',
      p: ['A trapezoid has exactly one pair of parallel sides, called the <strong>bases</strong>. The other two are the legs.',
          'An <strong>isosceles trapezoid</strong> has congruent legs, and then its base angles are congruent and its diagonals are congruent too.',
          'The <strong>midsegment</strong> joins the midpoints of the legs and its length is the *average* of the two bases: $\\dfrac{b_1 + b_2}{2}$.'] },
    { h: 'Proving which one it is',
      p: ['To prove a quadrilateral is a parallelogram, show any one of: both pairs of opposite sides parallel, both pairs congruent, one pair both parallel and congruent, or diagonals bisecting.',
          'To upgrade to a rectangle, add a right angle or congruent diagonals. To a rhombus, add congruent adjacent sides or perpendicular diagonals.',
          'Pick the test that matches what you were <em>given</em> — that is the whole skill.'] }
  ],
  examples: [
    { t: 'Angle sum', q: 'Find the sum of the interior angles of a decagon, and the size of one interior angle if it is regular.',
      steps: [
        { do: '$n = 10$, so it splits into $10 - 2 = 8$ triangles.', why: 'Diagonals from one vertex.' },
        { do: 'Sum $= 8 \\times 180 = 1440^\\circ$', why: 'The interior angle sum.' },
        { do: 'Regular, so divide: $1440 \\div 10 = 144^\\circ$', why: 'Each interior angle.' },
        { do: 'Check via exteriors: $360 \\div 10 = 36$, and $180 - 36 = 144$ &check;', why: 'The quicker route agrees.' }
      ], ans: '$1440^\\circ$; each angle $144^\\circ$' },
    { t: 'Parallelogram algebra', q: 'In parallelogram $ABCD$, $\\angle A = (3x + 10)^\\circ$ and $\\angle C = (5x - 30)^\\circ$. Find $\\angle B$.',
      steps: [
        { do: '$\\angle A$ and $\\angle C$ are opposite, so they are congruent.', why: 'A parallelogram property.' },
        { do: '$3x + 10 = 5x - 30$, so $40 = 2x$ and $x = 20$', why: 'Solve for $x$.' },
        { do: '$\\angle A = 3(20) + 10 = 70^\\circ$', why: 'Substitute back.' },
        { do: '$\\angle B$ is consecutive to $\\angle A$, so supplementary: $180 - 70 = 110^\\circ$', why: 'Not congruent — consecutive angles add to $180$.' }
      ], ans: '$\\angle B = 110^\\circ$' },
    { t: 'Which quadrilateral?', q: 'A quadrilateral has diagonals that bisect each other and are congruent, but are not perpendicular. What is it?',
      steps: [
        { do: 'Diagonals bisect each other, so it is a parallelogram.', why: 'That is the parallelogram test.' },
        { do: 'Congruent diagonals upgrade it to a rectangle.', why: 'Only rectangles have that.' },
        { do: 'Not perpendicular, so it is not a rhombus — and therefore not a square.', why: 'A square would need both.' },
        { do: 'It is a rectangle that is not a square.', why: 'Every condition accounted for.' }
      ], ans: 'A rectangle (not a square)' }
  ],
  mistakes: [
    'Thinking a square is not a rectangle. It is — a square satisfies every rectangle condition and adds one more. The family is a <strong>ladder of inheritance</strong>, so the more specific shape always keeps the general one\'s properties.',
    'Making consecutive angles in a parallelogram congruent. <strong>Opposite</strong> angles are congruent; consecutive ones are <strong>supplementary</strong>. They are only equal in the special case of a rectangle, where both are $90^\\circ$.',
    'Confusing which diagonals do what. All parallelograms have diagonals that bisect each other; <em>congruent</em> diagonals mean a rectangle, <em>perpendicular</em> ones mean a rhombus. Mixing these up names the wrong shape.',
    'Using $(n-2)180$ for exterior angles. The exterior angles of any convex polygon always total $360^\\circ$, no matter how many sides — you walk round once and turn through one full circle.'
  ]
},
{
  id: 'simproof', strand: 'geometry', fig: 'discSimproof',
  title: 'Similarity & Proportionality',
  big: 'Equal angles force proportional sides. That single fact measures buildings, mountains and stars.',
  discover: [
    '**Draw a triangle, then draw a line across it parallel to the base.**',
    'The line cuts the other two sides. Does it cut them in the same ratio?',
    { fig: 'discSimproof' },
    'Measure and you find it does: if it cuts one side $4$ to $6$, it cuts the other $6$ to $9$ — **both $2:3$**.',
    'The reason is that the small triangle at the top has the *same angles* as the whole one.',
    'Parallel lines gave you corresponding angles, and the apex angle is shared.',
    { punch: 'Two matching angles are enough — that is **AA similarity**. And similar triangles have proportional sides, which is why one measurement plus one shadow can give you the height of a tree.' }
  ],
  funfact: [
    '**Eratosthenes** measured the circumference of the Earth around 240 BC using two sticks and their shadows, in cities about 800 km apart.',
    'Similar triangles gave him the angle between them: about one fiftieth of a circle. Multiply the distance by fifty and you have the Earth.',
    'His answer was within a few percent of the modern figure — obtained with no instrument more advanced than a stick.'
  ],
  vocab: [
    ['Similar', 'Same shape, possibly different size. Written $\\triangle ABC \\sim \\triangle DEF$.'],
    ['AA similarity', 'Two pairs of congruent angles prove two triangles similar.'],
    ['SSS similarity', 'All three pairs of sides in the same ratio.'],
    ['SAS similarity', 'Two pairs of sides in ratio with the included angles congruent.'],
    ['Geometric mean', 'For $a$, $x$, $b$ in proportion, $x = \\sqrt{ab}$.'],
    ['Scale factor', 'The multiplier $k$ between corresponding lengths.']
  ],
  sections: [
    { h: 'Why two angles are enough', fig: 'twoAnglesForce',
      p: ['A triangle has three angles that add to $180^\\circ$. Fix two of them and the third has **no choice**.',
          'So two matching angles guarantee all three match, and the triangles are similar. That is <strong>AA</strong>, and it is the test you will use most.',
          'Note the contrast with congruence: AAA is useless there, because it says nothing about size. For similarity, size is exactly what we are not fixing.'],
      box: { k: 'key', h: 'Where the angles come from', t: 'Parallel lines hand you corresponding or alternate angles. A shared angle is congruent to itself. <strong>Those two sources supply almost every AA proof.</strong>' } },
    { h: 'The side-based tests',
      p: ['<strong>SSS similarity</strong>: all three pairs of sides in the same ratio. Compute all three and check they agree.',
          '<strong>SAS similarity</strong>: two pairs in ratio, with the angles *between* them congruent. The word "included" matters exactly as it did for congruence.',
          'Use these when the question gives lengths rather than angles.'] },
    { h: 'The triangle proportionality theorem', fig: 'sideSplitter',
      p: ['A line parallel to one side of a triangle divides the other two sides <strong>proportionally</strong>.',
          'If the line cuts one side into $a$ and $b$, and the other into $c$ and $d$, then $\\dfrac{a}{b} = \\dfrac{c}{d}$.',
          'Its converse is also true: if a line cuts two sides proportionally, it must be parallel to the third.'],
      box: { k: 'slow', h: 'Match the pieces carefully', t: 'Top piece over bottom piece on <em>both</em> sides — or whole over part on both. What you must not do is mix the two, which is where most errors here come from.' } },
    { h: 'Indirect measurement', fig: 'shadowHeights',
      p: ['A person $5$ ft tall casts a $4$ ft shadow; a tree casts a $32$ ft shadow at the same moment.',
          'The sun\'s rays arrive parallel, so the two triangles have the same angles, so they are similar.',
          '$\\dfrac{5}{4} = \\dfrac{h}{32}$ gives $h = 40$ ft. You measured a tree with a tape measure and no ladder.'] },
    { h: 'Perimeter, area and volume',
      p: ['If the scale factor is $k$, then <strong>perimeters</strong> are in the ratio $k$, <strong>areas</strong> in the ratio $k^2$, and <strong>volumes</strong> in the ratio $k^3$.',
          'Two similar triangles with sides in ratio $2:3$ have areas in ratio $4:9$.',
          'Going backwards, areas in ratio $9:16$ means sides in ratio $3:4$ — take the square root.'] }
  ],
  examples: [
    { t: 'AA similarity', q: 'In $\\triangle ABC$, $DE$ is parallel to $BC$ with $D$ on $AB$ and $E$ on $AC$. Prove $\\triangle ADE \\sim \\triangle ABC$.',
      steps: [
        { do: '$\\angle A \\cong \\angle A$ — reflexive', why: 'The apex angle is shared by both triangles.' },
        { do: '$\\angle ADE \\cong \\angle ABC$ — corresponding angles', why: '$DE \\parallel BC$ cut by transversal $AB$.' },
        { do: 'Two pairs of congruent angles.', why: 'That is enough.' },
        { do: '$\\triangle ADE \\sim \\triangle ABC$ by AA', why: 'The third pair follows automatically.' }
      ], ans: 'Similar by AA' },
    { t: 'Triangle proportionality', q: 'A line parallel to the base cuts one side into $4$ (top) and $6$ (bottom), and the other side into $6$ (top) and $x$ (bottom). Find $x$.',
      steps: [
        { do: 'Top over bottom on both sides: $\\dfrac{4}{6} = \\dfrac{6}{x}$', why: 'Match the pieces the same way on each side.' },
        { do: 'Cross-multiply: $4x = 36$', why: 'Clear the fractions.' },
        { do: '$x = 9$', why: 'Check: $\\dfrac{4}{6} = \\dfrac{6}{9}$, both $\\tfrac23$ &check;' }
      ], ans: '$x = 9$' },
    { t: 'Area from a scale factor', q: 'Two similar pentagons have corresponding sides $6$ cm and $15$ cm. The smaller has area $48$ cm$^2$. Find the larger area.',
      steps: [
        { do: 'Scale factor: $k = \\dfrac{15}{6} = 2.5$', why: 'New over old.' },
        { do: 'Areas scale by $k^2 = 6.25$', why: 'Both dimensions grew.' },
        { do: '$48 \\times 6.25 = 300$', why: 'The larger area.' },
        { do: 'Sense check: $2.5$ times longer should be far more than $2.5$ times the area &check;', why: 'And $300$ is over six times $48$.' }
      ], ans: '$300$ cm$^2$' }
  ],
  mistakes: [
    'Using AAA for congruence. Equal angles give <strong>similar</strong> triangles only — the sizes are still free. For congruence you need at least one side, because something has to fix the scale.',
    'Mixing part-to-part with whole-to-part in a proportion. Use top-over-bottom on <em>both</em> sides, or whole-over-part on both; switching halfway sets up an equation that is simply not the theorem.',
    'Scaling area by $k$ instead of $k^2$. An area is a length times a length and <strong>both</strong> lengths scaled, so a factor of $3$ multiplies area by $9$. Volumes go by $k^3$ for the same reason.',
    'Pairing sides by appearance rather than by position. Corresponding sides are the ones between corresponding angles — mark the equal angles first and the pairing follows.'
  ]
},
{
  id: 'righttri', strand: 'trig', fig: 'trigRatios',
  title: 'Right Triangle Trigonometry',
  big: 'One angle and one side are enough to find every other part of a right triangle.',
  discover: [
    '**A ladder six metres long leans against a wall at $70^\\circ$.** How far up does it reach?',
    'Pythagoras cannot help — you only know one side.',
    { fig: 'discRighttri' },
    'But here is the thing: **every** right triangle with a $70^\\circ$ angle is similar to every other one.',
    'So the ratio of the opposite side to the hypotenuse is the same for all of them. It depends on the angle and nothing else.',
    'Somebody measured that ratio once, for every angle, and wrote it down. We call it $\\sin 70^\\circ \\approx 0.94$.',
    { punch: 'So the height is $6 \\times 0.94 \\approx 5.6$ m. **Trigonometry is a lookup table for similar triangles** — the sine button is reading off work someone did centuries ago.' }
  ],
  funfact: [
    'The word **sine** is a mistranslation. Indian mathematicians called the half-chord *jya*; Arabic scholars transliterated it as *jiba*, written without vowels as *jb*.',
    'A Latin translator read *jb* as *jaib*, Arabic for "bay" or "fold", and rendered it *sinus* — Latin for a fold in a garment.',
    'So the sine function is named after a bay, because of a vowel nobody wrote down.'
  ],
  vocab: [
    ['Opposite', 'The side across the triangle from the angle you are using.'],
    ['Adjacent', 'The side next to that angle which is not the hypotenuse.'],
    ['Hypotenuse', 'The side opposite the right angle. Always the longest.'],
    ['Sine', '$\\sin \\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$.'],
    ['Cosine', '$\\cos \\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$.'],
    ['Tangent', '$\\tan \\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$.'],
    ['Angle of elevation', 'The angle up from horizontal to a line of sight.']
  ],
  sections: [
    { h: 'Naming the sides', fig: 'oppAdjSwap',
      p: ['The <strong>hypotenuse</strong> never moves: it is always opposite the right angle, and always the longest side.',
          'The other two names depend on which acute angle you are working from. <strong>Opposite</strong> is across the triangle from it; <strong>adjacent</strong> is the one touching it that is not the hypotenuse.',
          'Move to the other acute angle and opposite and adjacent **swap**. Label them fresh every time.'],
      box: { k: 'warn', h: 'Label before you calculate', t: 'Write O, A and H on the diagram for the angle you are actually using. <strong>Most errors in this unit are mislabelled sides</strong>, not arithmetic.' } },
    { h: 'SOH-CAH-TOA',
      p: ['$\\sin \\theta = \\dfrac{O}{H}$, $\\cos \\theta = \\dfrac{A}{H}$, $\\tan \\theta = \\dfrac{O}{A}$.',
          'To choose one, look at which two sides the problem involves — the one you know and the one you want — and pick the ratio containing both.',
          'That is the whole decision. You never need to try all three.'] },
    { h: 'Finding a side',
      p: ['Write the ratio, substitute, and solve. If the unknown is on top, multiply; if it is on the bottom, divide.',
          '$\\sin 70^\\circ = \\dfrac{h}{6}$ gives $h = 6 \\sin 70^\\circ \\approx 5.64$.',
          '$\\cos 40^\\circ = \\dfrac{8}{x}$ gives $x = \\dfrac{8}{\\cos 40^\\circ} \\approx 10.4$.'],
      box: { k: 'slow', h: 'Check the size', t: 'The hypotenuse must come out <strong>longest</strong>. If your answer for a leg exceeds the hypotenuse, you multiplied where you should have divided.' } },
    { h: 'Finding an angle',
      p: ['If you know two sides and want the angle, use the <strong>inverse</strong> functions: $\\sin^{-1}$, $\\cos^{-1}$, $\\tan^{-1}$.',
          '$\\tan \\theta = \\dfrac{5}{12}$ gives $\\theta = \\tan^{-1}\\!\\left(\\dfrac{5}{12}\\right) \\approx 22.6^\\circ$.',
          'The $-1$ is not a reciprocal — $\\sin^{-1} x$ is not $\\dfrac{1}{\\sin x}$. It means "the angle whose sine is".'],
      box: { k: 'warn', h: 'Set the calculator to degrees first', t: 'On a TI-84 press <strong>MODE</strong> and choose <strong>DEGREE</strong>, once, before you start. Then $\\tan^{-1}$ is <strong>2nd</strong> then <strong>TAN</strong>. In radian mode $\\tan^{-1}(1.4)$ returns $0.95$ instead of $54.5^\\circ$ — a right answer to a question nobody asked.' } },
    { h: 'What the calculator is doing',
      p: ['Nothing here can be worked out by hand: $\\tan 65^\\circ$ is not a fraction you can simplify to. Someone measured these ratios once, for every angle, and the calculator looks them up.',
          'Before calculators that list was printed in the back of the book as a **table of trigonometric ratios**, and you ran your finger down the column. The $\\sin$ key is that table.',
          'So the inverse keys read the table **backwards**: $\\tan \\theta = 1.4$ asks which angle has that ratio, and $\\tan^{-1}(1.4) \\approx 54.5^\\circ$ is the entry you would have found.',
          'That is also why the mode matters. The same angle is $54.5^\\circ$ or $0.95$ radians — two names for one turn, and the calculator answers in whichever you asked for.'],
      box: { k: 'key', h: 'A quick sanity check', t: 'An angle in a right triangle is <strong>between $0^\\circ$ and $90^\\circ$</strong>. If your answer is under $2$, you are reading radians; if it is over $90$, you have mixed up which sides went into the ratio.' } },
    { h: 'Elevation, depression and real problems', fig: 'elevDepression',
      p: ['The <strong>angle of elevation</strong> is measured up from horizontal; the <strong>angle of depression</strong> is measured down from horizontal.',
          'They are alternate angles, so the angle of depression from a cliff equals the angle of elevation from the boat. That equality solves most of these problems.',
          'Always draw the picture, mark the right angle, and label the sides before reaching for a ratio.'] }
  ],
  examples: [
    { t: 'Finding a side', q: 'A ladder $6$ m long leans at $70^\\circ$ to the ground. How high up the wall does it reach?',
      steps: [
        { do: 'The height is <em>opposite</em> the $70^\\circ$ angle; the ladder is the hypotenuse.', why: 'Label O and H.' },
        { do: 'Opposite and hypotenuse means sine.', why: '$\\sin 70^\\circ = \\dfrac{h}{6}$' },
        { do: '$h = 6 \\sin 70^\\circ = 6 \\times 0.9397$', why: 'Multiply — the unknown was on top.' },
        { do: '$h \\approx 5.6$ m', why: 'Less than the $6$ m ladder, as it must be &check;' }
      ], ans: 'About $5.6$ m' },
    { t: 'Finding an angle', q: 'A ramp rises $1.5$ m over a horizontal run of $9$ m. Find its angle of elevation.',
      steps: [
        { do: 'Rise is opposite, run is adjacent.', why: 'No hypotenuse involved.' },
        { do: 'Opposite and adjacent means tangent: $\\tan \\theta = \\dfrac{1.5}{9}$', why: 'Pick the ratio with both known sides.' },
        { do: '$\\theta = \\tan^{-1}(0.1667)$', why: 'Use the inverse to get the angle.' },
        { do: '$\\theta \\approx 9.5^\\circ$', why: 'A gentle slope, which matches a ramp &check;' }
      ], ans: 'About $9.5^\\circ$' },
    { t: 'Angle of depression', q: 'From a cliff $40$ m high, the angle of depression to a boat is $25^\\circ$. How far is the boat from the base?',
      steps: [
        { do: 'The angle of depression equals the angle of elevation from the boat.', why: 'They are alternate angles.' },
        { do: 'From the boat: cliff height is opposite, distance is adjacent.', why: 'So use tangent.' },
        { do: '$\\tan 25^\\circ = \\dfrac{40}{d}$, so $d = \\dfrac{40}{\\tan 25^\\circ}$', why: 'Unknown on the bottom, so divide.' },
        { do: '$d \\approx 85.8$ m', why: 'A shallow angle gives a long distance &check;' }
      ], ans: 'About $85.8$ m' }
  ],
  mistakes: [
    'Mislabelling opposite and adjacent. They are named <strong>from the angle you are using</strong>, so they swap when you move to the other acute angle. Write O, A and H on the diagram before choosing a ratio.',
    'Reading $\\sin^{-1}$ as a reciprocal. $\\sin^{-1} x$ means "the angle whose sine is $x$", not $\\dfrac{1}{\\sin x}$. The two give wildly different numbers and the notation is genuinely unfortunate.',
    'Multiplying when you should divide. If the unknown is in the <strong>denominator</strong>, as in $\\cos 40^\\circ = \\dfrac{8}{x}$, you divide. A leg that comes out longer than the hypotenuse is the tell-tale.',
    'Using trigonometry on a triangle with no right angle. Every ratio here is defined by the right angle. Without one you need the sine or cosine rule, which come later.',
    'Leaving the calculator in <strong>radian</strong> mode. Every angle in this unit is in degrees, so $\\sin 30^\\circ$ should give $0.5$ — if it gives $-0.988$ the mode is wrong, and every answer after it will be too.',
    'Rounding in the middle. Keep the full value on the calculator and round only the final answer; rounding $\\tan^{-1}$ to a whole degree first can move the final length by a tenth or more.'
  ]
},
{
  id: 'circleangles', strand: 'geometry', fig: 'circleAngleTypes',
  title: 'Circle Angles, Arcs & Chords',
  big: 'Where the vertex of an angle sits — centre, edge or outside — decides which rule applies.',
  discover: [
    '**Three people stand on the edge of a circular field, all watching the same pair of goalposts.**',
    'They are in completely different places. Is the angle they see the goalposts at the same for each?',
    { fig: 'discCircleangles' },
    'It is. Every point on that arc sees the goalposts at **exactly the same angle**.',
    'Move to the centre instead and the angle doubles — the centre sees twice what the edge sees.',
    'Step outside the circle and it shrinks again.',
    { punch: 'So there is no single "circle angle" rule. There are three, and which one you need depends entirely on **where the vertex is**: at the centre, on the circle, or outside it.' }
  ],
  funfact: [
    'That every angle on the same arc is equal is called **Thales\' theorem** in its most famous special case: any angle drawn in a semicircle is a right angle.',
    'Thales is said to have sacrificed an ox in celebration when he proved it.',
    'The result is why a carpenter can find the centre of a circular tabletop with nothing but a set square.'
  ],
  vocab: [
    ['Central angle', 'An angle whose vertex is the centre. Equal to its arc.'],
    ['Inscribed angle', 'An angle whose vertex is on the circle. Half its arc.'],
    ['Chord', 'A segment joining two points on the circle.'],
    ['Tangent', 'A line touching the circle at exactly one point.'],
    ['Arc', 'Part of the circle, measured in degrees like the angle that cuts it.'],
    ['Secant', 'A line that cuts the circle at two points.']
  ],
  sections: [
    { h: 'Vertex at the centre', fig: 'centralAngleArc',
      p: ['A <strong>central angle</strong> is exactly equal to the arc it cuts. A $70^\\circ$ central angle cuts a $70^\\circ$ arc.',
          'This is really a definition — arcs are *measured* by their central angles.',
          'The whole circle is $360^\\circ$, so a semicircular arc is $180^\\circ$ and a quarter is $90^\\circ$.'] },
    { h: 'Vertex on the circle', fig: 'inscribedHalfArc',
      p: ['An <strong>inscribed angle</strong> is <em>half</em> its arc. The same $70^\\circ$ arc is seen as $35^\\circ$ from the edge.',
          'Two consequences follow immediately. Angles on the <strong>same arc are congruent</strong>, because they halve the same number.',
          'And an angle in a <strong>semicircle is a right angle</strong>, because half of $180^\\circ$ is $90^\\circ$.'],
      box: { k: 'key', h: 'The one to remember', t: 'Centre sees the whole arc; edge sees half of it. <strong>The centre is always twice the edge</strong> for the same arc, and nearly every circle question uses that.' } },
    { h: 'Vertex outside', fig: 'outsideAngleArcs',
      p: ['Two secants, two tangents, or one of each meeting outside the circle make an angle equal to <strong>half the difference</strong> of the two arcs they cut.',
          'If the far arc is $110^\\circ$ and the near arc is $40^\\circ$, the angle is $\\dfrac{110 - 40}{2} = 35^\\circ$.',
          'Vertex *inside* but not at the centre gives half the **sum** instead.'],
      box: { k: 'slow', h: 'Three positions, three rules', t: 'Centre: the arc. On the circle: half the arc. Inside: half the sum. Outside: half the difference. <strong>Find the vertex first</strong> and the rule chooses itself.' } },
    { h: 'Chords', fig: 'chordsCrossProduct',
      p: ['Congruent chords cut congruent arcs, and sit the same distance from the centre.',
          'A radius <strong>perpendicular</strong> to a chord bisects it — and the converse holds too.',
          'When two chords cross inside a circle, the products of the pieces are equal: $a \\cdot b = c \\cdot d$.'] },
    { h: 'Tangents', fig: 'tangentRightAngle',
      p: ['A tangent is <strong>perpendicular</strong> to the radius at the point of contact. That right angle turns most tangent problems into Pythagoras.',
          'Two tangents drawn from the same external point are <strong>congruent</strong>.',
          'And a tangent-chord angle is half its intercepted arc — the inscribed angle rule, with one arm flattened onto the circle.'] }
  ],
  examples: [
    { t: 'Inscribed angle', q: 'An inscribed angle cuts an arc of $86^\\circ$. Find the angle, and the central angle on the same arc.',
      steps: [
        { do: 'Inscribed angle is half its arc.', why: 'Vertex on the circle.' },
        { do: '$86 \\div 2 = 43^\\circ$', why: 'The inscribed angle.' },
        { do: 'Central angle equals its arc.', why: 'Vertex at the centre.' },
        { do: '$86^\\circ$ — twice the inscribed angle, as it must be &check;', why: 'Same arc, so centre is double edge.' }
      ], ans: 'Inscribed $43^\\circ$; central $86^\\circ$' },
    { t: 'Angle from outside', q: 'Two secants from an external point cut arcs of $120^\\circ$ (far) and $46^\\circ$ (near). Find the angle at the point.',
      steps: [
        { do: 'Vertex outside, so half the difference.', why: 'Not half the sum — that is for inside.' },
        { do: '$120 - 46 = 74$', why: 'Far arc minus near arc.' },
        { do: '$74 \\div 2 = 37^\\circ$', why: 'Half the difference.' },
        { do: 'Sense check: it is smaller than the inscribed angle would be &check;', why: 'Stepping back always shrinks the angle.' }
      ], ans: '$37^\\circ$' },
    { t: 'Tangent and radius', q: 'A tangent touches a circle of radius $9$ at $T$. From external point $P$, $PO = 15$ where $O$ is the centre. Find $PT$.',
      steps: [
        { do: 'The tangent is perpendicular to the radius at $T$.', why: 'So $\\triangle OTP$ has a right angle at $T$.' },
        { do: '$OT = 9$ (radius) and $OP = 15$ (hypotenuse).', why: 'The hypotenuse is opposite the right angle.' },
        { do: '$PT^2 = 15^2 - 9^2 = 225 - 81 = 144$', why: 'Pythagoras, subtracting to find a leg.' },
        { do: '$PT = 12$', why: 'A $9$-$12$-$15$ triangle — a $3$-$4$-$5$ tripled &check;' }
      ], ans: '$PT = 12$' }
  ],
  mistakes: [
    'Using the inscribed rule when the vertex is at the centre. A central angle <strong>equals</strong> its arc; only an angle with its vertex on the circle is halved. Locate the vertex before choosing a rule.',
    'Taking half the sum when the vertex is outside. Inside the circle it is half the <strong>sum</strong>; outside it is half the <strong>difference</strong>. Getting these backwards gives an answer that is often larger than the whole arc.',
    'Forgetting that a tangent meets the radius at a right angle. That right angle is what makes Pythagoras available, and without it these problems look unsolvable.',
    'Assuming a chord passes through the centre. Only a <strong>diameter</strong> does. A radius bisects a chord only when it is perpendicular to it, and that has to be given or proved.'
  ]
},
{
  id: 'circleeq', strand: 'geometry', fig: 'discCircleeq',
  title: 'Equations of Circles',
  big: 'A circle is every point a fixed distance from a fixed point. Write that with the distance formula and you have its equation.',
  discover: [
    '**A garden sprinkler at the point $(6, 4)$ throws water five metres in every direction.**',
    'Which points get wet? Not the ones nearer than $5$ — those get wet too. Which points are exactly on the edge?',
    { fig: 'discCircleeq' },
    'A point is on the edge exactly when its **distance from $(6, 4)$ is $5$**.',
    'You already know how to say that: $\\sqrt{(x-6)^2 + (y-4)^2} = 5$.',
    'Square both sides and the root disappears: $(x-6)^2 + (y-4)^2 = 25$.',
    { punch: 'That is the whole equation of a circle, and it is not a new idea — it is the **distance formula with the distance fixed**. Centre $(h, k)$, radius $r$: $(x-h)^2 + (y-k)^2 = r^2$.' }
  ],
  funfact: [
    'The equation shows why $\\pi$ never appears in it. $\\pi$ is about a circle\'s *length* and *area*; the equation is only about **which points belong**.',
    '**Descartes** and **Fermat** independently invented this way of writing shapes as equations in the 1630s.',
    'It made a whole class of problems mechanical that had needed ingenuity for two thousand years — you can now find where a line meets a circle by solving, not by drawing.'
  ],
  vocab: [
    ['Standard form', '$(x-h)^2 + (y-k)^2 = r^2$, centre $(h,k)$ and radius $r$.'],
    ['General form', '$x^2 + y^2 + Dx + Ey + F = 0$, which hides the centre until you complete the square.'],
    ['Radius', 'The fixed distance. Note the equation stores $r^2$, not $r$.'],
    ['Completing the square', 'The move that turns general form back into standard form.']
  ],
  sections: [
    { h: 'Reading the equation', fig: 'circleEqTriangle',
      p: ['In $(x-h)^2 + (y-k)^2 = r^2$ the centre is $(h, k)$ and the radius is $r$.',
          'The signs flip: $(x - 6)^2$ means $h = 6$, but $(x + 3)^2$ means $h = -3$, because $x + 3$ is $x - (-3)$.',
          'And the number on the right is $r^2$, <strong>not</strong> $r$. If it says $25$, the radius is $5$.'],
      box: { k: 'warn', h: 'Two sign traps in one line', t: '$(x+2)^2 + (y-5)^2 = 49$ has centre $(-2, 5)$ and radius $7$. The $x$ sign flips, the $y$ sign flips, and the $49$ must be rooted — <strong>three chances to slip in one equation</strong>.' } },
    { h: 'Writing one from scratch',
      p: ['Given a centre and a radius, substitute straight in. Centre $(-1, 4)$, radius $6$: $(x+1)^2 + (y-4)^2 = 36$.',
          'Given a centre and a point on the circle, find the radius with the distance formula first.',
          'Given the two ends of a diameter, the centre is the <strong>midpoint</strong> and the radius is half the distance between them.'] },
    { h: 'From general form back to standard',
      p: ['$x^2 + y^2 - 6x + 8y - 11 = 0$ hides its centre. To find it, <strong>complete the square</strong> in $x$ and again in $y$.',
          'Group: $(x^2 - 6x) + (y^2 + 8y) = 11$. Half of $-6$ is $-3$, squared is $9$. Half of $8$ is $4$, squared is $16$.',
          'Add both to <em>both</em> sides: $(x-3)^2 + (y+4)^2 = 36$. Centre $(3, -4)$, radius $6$.'],
      box: { k: 'slow', h: 'Add to both sides', t: 'Completing the square adds something to the left, so the same amount must go on the right — and you do it <strong>twice</strong>, once for $x$ and once for $y$.' } },
    { h: 'Is a point inside, on, or outside?', fig: 'circlePointTest',
      p: ['Put the point into the left-hand side and compare with $r^2$.',
          'Less than $r^2$ means <strong>inside</strong>; equal means <strong>on</strong>; greater means <strong>outside</strong>.',
          'You are just comparing the squared distance with the squared radius, so no roots are needed.'] },
    { h: 'Circles and lines together',
      p: ['To find where a line meets a circle, substitute the line into the circle equation and solve the resulting quadratic.',
          'Two solutions means the line cuts the circle; one means it is a <strong>tangent</strong>; none means it misses.',
          'The discriminant tells you which before you finish solving — the same $b^2 - 4ac$ from algebra, doing geometry.'] }
  ],
  examples: [
    { t: 'Reading off centre and radius', q: 'Give the centre and radius of $(x+2)^2 + (y-5)^2 = 49$.',
      steps: [
        { do: '$(x + 2)$ is $(x - (-2))$, so $h = -2$.', why: 'The sign flips.' },
        { do: '$(y - 5)$ gives $k = 5$ directly.', why: 'No flip needed here.' },
        { do: '$r^2 = 49$, so $r = 7$.', why: 'Root the right-hand side.' },
        { do: 'Centre $(-2, 5)$, radius $7$.', why: 'All three traps handled.' }
      ], ans: 'Centre $(-2, 5)$, radius $7$' },
    { t: 'From a diameter', q: 'A circle has a diameter from $(1, 2)$ to $(7, 10)$. Write its equation.',
      steps: [
        { do: 'Centre is the midpoint: $\\left(\\dfrac{1+7}{2}, \\dfrac{2+10}{2}\\right) = (4, 6)$', why: 'Midpoint adds and halves.' },
        { do: 'Diameter length: $\\sqrt{6^2 + 8^2} = 10$', why: 'Distance between the endpoints.' },
        { do: 'Radius is half: $r = 5$', why: 'Half the diameter.' },
        { do: '$(x-4)^2 + (y-6)^2 = 25$', why: 'Substitute centre and $r^2$.' }
      ], ans: '$(x-4)^2 + (y-6)^2 = 25$' },
    { t: 'Completing the square', q: 'Find the centre and radius of $x^2 + y^2 - 6x + 8y - 11 = 0$.',
      steps: [
        { do: 'Group and move the constant: $(x^2 - 6x) + (y^2 + 8y) = 11$', why: 'Constants to the right.' },
        { do: 'Half of $-6$ is $-3$; $(-3)^2 = 9$. Half of $8$ is $4$; $4^2 = 16$.', why: 'Two completions.' },
        { do: 'Add both to both sides: $(x-3)^2 + (y+4)^2 = 11 + 9 + 16 = 36$', why: 'Balance is everything here.' },
        { do: 'Centre $(3, -4)$, radius $6$.', why: 'Check: $36 = 6^2$ &check;' }
      ], ans: 'Centre $(3, -4)$, radius $6$' }
  ],
  mistakes: [
    'Reading the radius straight off the right-hand side. The equation stores $r^2$, so $= 25$ means a radius of <strong>5</strong>. Forgetting to root it makes every subsequent answer five times too big.',
    'Getting the sign of the centre wrong. $(x + 3)^2$ means $h = -3$, because the standard form subtracts. Both coordinates can flip independently, so check each one.',
    'Adding to only one side when completing the square. You add $9$ to the left, so $9$ must go on the right — and you do it twice, once for each variable. Forgetting shrinks the radius.',
    'Halving the diameter\'s <em>endpoints</em> instead of finding the midpoint. The centre is the average of the two points, not half of one of them — and the radius is half the <strong>distance</strong>, not half a coordinate.'
  ]
},
{
  id: 'coordproof', strand: 'geometry', fig: 'discCoordproof',
  title: 'Coordinate Geometry Proofs',
  big: 'Put a shape on axes and every claim about it becomes a calculation you can check.',
  discover: [
    '**Four points are plotted and joined up. It looks like a rectangle.** Is it?',
    'Looking is not evidence. A drawing can be a degree off and you would never see it.',
    { fig: 'discCoordproof' },
    'But the corners are *numbers*, and numbers can settle it.',
    'Find the four slopes. If opposite sides have equal slopes, they are **parallel**. If adjacent slopes multiply to $-1$, the corners are **right angles**.',
    'Find the four lengths with the distance formula and you can tell a rectangle from a square.',
    { punch: 'So coordinate geometry converts "does it look like one?" into arithmetic. **Three tools do nearly all of it**: distance for lengths, slope for parallel and perpendicular, midpoint for bisecting.' }
  ],
  funfact: [
    'This is why the plane is called **Cartesian** — after Descartes, who published it in 1637.',
    'Before it, geometry and algebra were separate subjects. Afterwards they were the same subject in two notations, and problems that had needed genius became routine.',
    '**Pierre de Fermat** had the same idea slightly earlier but did not publish, which is a recurring theme in Fermat\'s life.'
  ],
  vocab: [
    ['Distance formula', '$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$ — used to compare lengths.'],
    ['Slope', '$m = \\dfrac{y_2-y_1}{x_2-x_1}$ — used to test parallel and perpendicular.'],
    ['Midpoint formula', '$\\left(\\dfrac{x_1+x_2}{2}, \\dfrac{y_1+y_2}{2}\\right)$ — used to test bisecting.'],
    ['Perpendicular', 'Slopes multiply to $-1$; they are negative reciprocals.']
  ],
  sections: [
    { h: 'Three tools, three jobs',
      p: ['<strong>Distance</strong> answers questions about length: is this side congruent to that one, is it isosceles, is it a rhombus.',
          '<strong>Slope</strong> answers questions about direction: are these parallel, is that a right angle, is it a trapezoid.',
          '<strong>Midpoint</strong> answers questions about bisecting: do the diagonals cut each other in half.'],
      box: { k: 'key', h: 'Pick the tool from the claim', t: '"Congruent" needs distance. "Parallel" or "perpendicular" needs slope. "Bisects" needs midpoint. <strong>Read the thing you are proving and the tool is chosen for you.</strong>' } },
    { h: 'Naming the shape',
      p: ['A <strong>parallelogram</strong>: both pairs of opposite sides have equal slopes. Or: the diagonals share a midpoint.',
          'A <strong>rectangle</strong>: a parallelogram whose adjacent slopes multiply to $-1$. Or: whose diagonals are congruent.',
          'A <strong>rhombus</strong>: a parallelogram with all four sides the same length. A <strong>square</strong> needs both tests.'] },
    { h: 'Writing it up',
      p: ['State what you will show, do the arithmetic, then say what it proves. Three parts, in that order.',
          '"$AB$ and $CD$ both have slope $\\tfrac34$, so $\\overline{AB} \\parallel \\overline{CD}$." The conclusion sentence is not optional — it is the proof.',
          'Show *all four* sides or slopes when the claim is about all four. Two is not a proof about a quadrilateral.'],
      box: { k: 'slow', h: 'Say what it means', t: 'A page of correct calculations with no concluding sentence scores badly. After each computation write the geometric fact it establishes.' } },
    { h: 'Choosing convenient coordinates', fig: 'rectAtOrigin',
      p: ['When a proof is about <em>any</em> rectangle rather than a specific one, you may place it wherever you like.',
          'Put one corner at the <strong>origin</strong> and one side along the $x$-axis: $(0,0)$, $(a,0)$, $(a,b)$, $(0,b)$.',
          'The letters keep it general, and the zeros keep the algebra short. This is called a **coordinate proof**.'] },
    { h: 'Perpendicular, carefully', fig: 'perpSlopeProduct',
      p: ['Two lines are perpendicular when $m_1 \\times m_2 = -1$ — the slopes are negative reciprocals.',
          'The exception is a horizontal and a vertical line: slopes $0$ and undefined, which are perpendicular but whose product is not $-1$.',
          'So check for vertical sides <em>before</em> reaching for the product rule.'] }
  ],
  examples: [
    { t: 'Proving a parallelogram', q: 'Show $A(1,2)$, $B(5,4)$, $C(7,8)$, $D(3,6)$ is a parallelogram.',
      steps: [
        { do: 'Slope $AB = \\dfrac{4-2}{5-1} = \\dfrac12$', why: 'One pair of opposite sides.' },
        { do: 'Slope $DC = \\dfrac{8-6}{7-3} = \\dfrac12$ — equal, so $\\overline{AB} \\parallel \\overline{DC}$', why: 'Same slope means parallel.' },
        { do: 'Slope $BC = \\dfrac{8-4}{7-5} = 2$ and slope $AD = \\dfrac{6-2}{3-1} = 2$', why: 'The other pair.' },
        { do: 'Both pairs of opposite sides are parallel, so $ABCD$ is a parallelogram.', why: 'The concluding sentence is the proof.' }
      ], ans: 'Parallelogram — both pairs of opposite sides parallel' },
    { t: 'Rectangle or not?', q: 'For that same quadrilateral, is it a rectangle?',
      steps: [
        { do: 'A rectangle needs a right angle at a corner.', why: 'It is already a parallelogram.' },
        { do: 'At $B$: slopes $\\dfrac12$ and $2$.', why: 'The two sides meeting at $B$.' },
        { do: '$\\dfrac12 \\times 2 = 1$, not $-1$.', why: 'Perpendicular would require $-1$.' },
        { do: 'So the angle at $B$ is not right, and $ABCD$ is not a rectangle.', why: 'A parallelogram, and no more.' }
      ], ans: 'No — the slopes give $1$, not $-1$' },
    { t: 'A general coordinate proof', q: 'Prove that the diagonals of any rectangle are congruent.',
      steps: [
        { do: 'Place it conveniently: $(0,0)$, $(a,0)$, $(a,b)$, $(0,b)$.', why: 'Letters keep it general; zeros keep it short.' },
        { do: 'One diagonal runs $(0,0)$ to $(a,b)$: length $\\sqrt{a^2+b^2}$', why: 'Distance formula.' },
        { do: 'The other runs $(a,0)$ to $(0,b)$: length $\\sqrt{a^2+b^2}$', why: 'Same value.' },
        { do: 'The two are equal for every $a$ and $b$, so the diagonals of any rectangle are congruent.', why: 'Because $a$ and $b$ were never pinned down, this covers all rectangles.' }
      ], ans: 'Both diagonals are $\\sqrt{a^2+b^2}$' }
  ],
  mistakes: [
    'Concluding from the picture. Four points can look like a rectangle and have a corner that is $88^\\circ$. The <strong>numbers</strong> are the evidence, and a plot is only there to suggest what to test.',
    'Checking two sides and claiming a quadrilateral. A claim about all four sides needs all four computed — one parallel pair only makes it a trapezoid.',
    'Using the $m_1 m_2 = -1$ test on a vertical side. A vertical line has undefined slope, so the product rule breaks; a horizontal and a vertical side are perpendicular anyway. Check for vertical sides first.',
    'Doing the arithmetic and stopping. "Both slopes are $\\tfrac12$" is a fact about numbers; "so the sides are parallel" is the geometry. <strong>Without the sentence, nothing has been proved.</strong>'
  ]
},
{
  id: 'solids3d', strand: 'geometry', fig: 'discSolids3d',
  title: 'Solids: Volume, Sections & Rotations',
  big: 'Every solid here is a flat shape that has been stacked, tapered or spun.',
  discover: [
    '**Take a rectangle and spin it about one of its edges.** What does it sweep out?',
    'The edge stays put. The far side traces a circle. Every point in between traces a circle too.',
    { fig: 'discSolids3d' },
    'The result is a **cylinder** — and its radius is the rectangle\'s width, its height the rectangle\'s height.',
    'Spin a right triangle about a leg instead and you get a **cone**. Spin a semicircle about its diameter and you get a **sphere**.',
    'Three solids, three flat shapes, one idea.',
    { punch: 'And it runs the other way too. **Slice** a solid and you get a flat shape back — which is why cross sections and solids of revolution are two halves of the same unit.' }
  ],
  funfact: [
    '**Cavalieri\'s principle**, from 1635, says two solids with the same height and the same cross-sectional area at every level have the same volume.',
    'So a leaning stack of coins holds exactly as much as a straight one — which is why an oblique prism uses the same formula as a right one.',
    'It was one of the ideas that led directly to integral calculus fifty years later.'
  ],
  vocab: [
    ['Prism', 'Two congruent parallel bases joined by rectangles. $V = Bh$.'],
    ['Pyramid', 'A base tapering to a point. $V = \\tfrac13 Bh$.'],
    ['Cross section', 'The flat face exposed by slicing a solid.'],
    ['Solid of revolution', 'The solid swept out by spinning a flat shape about a line.'],
    ['Lateral area', 'The surface area not counting the bases.'],
    ['Cavalieri\'s principle', 'Same height and same cross sections at every level means same volume.']
  ],
  sections: [
    { h: 'Stacked solids: prisms and cylinders',
      p: ['A prism is a base shape **stacked** straight up. Its volume is the area of the base times the height: $V = Bh$.',
          'A cylinder is the same idea with a circular base, so $V = \\pi r^2 h$ — it is not a separate formula, just $Bh$ with $B = \\pi r^2$.',
          'Because of Cavalieri, this works even if the stack leans over. Only the <em>perpendicular</em> height counts.'],
      box: { k: 'key', h: 'One formula, many solids', t: '$V = Bh$ covers every prism and cylinder. <strong>Find the area of the base and multiply by the height</strong> — the shape of the base is the only thing that changes.' } },
    { h: 'Tapered solids: pyramids and cones',
      p: ['Taper a prism to a point and you get a pyramid, which holds exactly <strong>one third</strong> as much: $V = \\tfrac13 Bh$.',
          'A cone is a pyramid with a circular base, so $V = \\tfrac13 \\pi r^2 h$.',
          'The $\\tfrac13$ is the same one you can pour — three coneloads fill the matching cylinder.'] },
    { h: 'Spheres', fig: 'sphereFourCircles',
      p: ['$V = \\tfrac43 \\pi r^3$ and surface area $= 4\\pi r^2$.',
          'The surface area is worth noticing: it is exactly <strong>four times</strong> the area of the circle you would get by slicing through the middle.',
          'A sphere holds two thirds of the cylinder that just contains it — Archimedes\' result, and the one on his tomb.'] },
    { h: 'Cross sections',
      p: ['Slicing a solid exposes a flat shape, and <strong>which shape depends on the angle of the cut</strong>.',
          'A cut parallel to a cylinder\'s base gives a circle; a vertical cut through the axis gives a rectangle; a slanted cut gives an ellipse.',
          'A cube can be sliced to give a triangle, a rectangle, a pentagon or a regular hexagon — the solid never changed, only the plane.'] },
    { h: 'Surface area',
      p: ['Surface area is the total of every face. The reliable method is to <strong>unfold the solid into its net</strong> and add up the flat pieces.',
          'A cylinder unrolls into two circles and one rectangle whose width is the circumference: $SA = 2\\pi r^2 + 2\\pi r h$.',
          'Volume is in cubic units and surface area in square units, so the units on your answer say which one you found.'],
      box: { k: 'warn', h: 'Slant height, not vertical height', t: 'The lateral surface of a cone uses the <strong>slant height</strong> $\\ell$, not the vertical height $h$. They are different, and related by $\\ell^2 = r^2 + h^2$.' } }
  ],
  examples: [
    { t: 'Prism volume', q: 'A prism has a triangular base with legs $6$ and $8$, and a height of $15$. Find its volume.',
      steps: [
        { do: 'Base area first: $B = \\tfrac12 (6)(8) = 24$', why: 'A right triangle.' },
        { do: '$V = Bh = 24 \\times 15$', why: 'Stacked solid, so base times height.' },
        { do: '$V = 360$ cubic units', why: 'Cubic units, because it fills space.' }
      ], ans: '$360$ cubic units' },
    { t: 'Cone surface area', q: 'A cone has radius $5$ and vertical height $12$. Find its total surface area in terms of $\\pi$.',
      steps: [
        { do: 'Slant height: $\\ell = \\sqrt{5^2 + 12^2} = 13$', why: 'Lateral area needs $\\ell$, not $h$.' },
        { do: 'Lateral area $= \\pi r \\ell = \\pi(5)(13) = 65\\pi$', why: 'The curved surface.' },
        { do: 'Base $= \\pi r^2 = 25\\pi$', why: 'The circle underneath.' },
        { do: 'Total $= 65\\pi + 25\\pi = 90\\pi$', why: 'A $5$-$12$-$13$ triangle made the slant height clean &check;' }
      ], ans: '$90\\pi$ square units' },
    { t: 'A solid of revolution', q: 'A right triangle with legs $3$ and $4$ is spun about the leg of length $4$. Describe the solid and find its volume in terms of $\\pi$.',
      steps: [
        { do: 'Spinning a right triangle about a leg gives a cone.', why: 'The axis leg becomes the height.' },
        { do: 'The axis is the leg of $4$, so $h = 4$; the other leg sweeps the base, so $r = 3$.', why: 'Which leg you spin about decides which is which.' },
        { do: '$V = \\tfrac13 \\pi (3)^2 (4) = \\tfrac13 \\pi (36)$', why: 'Substitute.' },
        { do: '$V = 12\\pi$', why: 'Spinning about the other leg would give $16\\pi$ — a different cone.' }
      ], ans: 'A cone; $12\\pi$' }
  ],
  mistakes: [
    'Using the vertical height where the slant height belongs. A cone\'s lateral area needs $\\ell$, and $\\ell = \\sqrt{r^2 + h^2}$ is always longer than $h$. Using $h$ makes the surface come out too small.',
    'Forgetting the $\\tfrac13$ on pyramids and cones. Tapered solids hold a third of the prism or cylinder that wraps them — you can pour it three times to check, and without the third the answer is triple.',
    'Mixing volume and surface area. Volume fills and is measured in cubic units; surface area wraps and is measured in square units. <strong>The units on your answer identify which one you actually computed.</strong>',
    'Assuming every cross section matches the base. A slanted cut through a cylinder gives an ellipse, not a circle, and a cube can be cut into a hexagon. <strong>The angle of the plane decides the shape</strong>, not the solid alone.'
  ]
},
{
  id: 'functionops', strand: 'algebra', fig: 'functionMachine',
  title: 'Composing & Inverting Functions',
  big: 'Functions can be bolted together end to end, and any chain can be run backwards.',
  discover: [
    '**Two vending machines, bolted together.**',
    'Feed $3$ into the first. It doubles what it is given, so $6$ comes out of the chute.',
    { fig: 'discFunctionops' },
    'That $6$ drops straight into the second machine, which adds $5$. You collect $11$.',
    'Nobody writes the $6$ anywhere. The pair behaves as **one machine** that turns $3$ into $11$.',
    { punch: 'That is composition. Written $f(g(3))$, the inner machine runs first — which is why the notation reads inside-out, and why the order cannot be swapped.' }
  ],
  funfact: [
    'The $\\circ$ in $f \\circ g$ was introduced so nobody had to keep writing nested brackets. It is read "after": $f$ after $g$.',
    'Composition is how almost all software is built. A photo filter is a dozen small functions, each handed the output of the last.',
    'Inverse functions are why you can undo a spreadsheet formula, and why encryption works: some functions are easy forwards and brutal backwards.'
  ],
  vocab: [
    ['Composition', 'Running one function on the output of another, written $(f \\circ g)(x) = f(g(x))$.'],
    ['Inverse function', 'The function that undoes another, written $f^{-1}$. It sends every output back to the input it came from.'],
    ['One-to-one', 'No two inputs share an output. Only a one-to-one function has an inverse that is itself a function.'],
    ['Horizontal line test', 'If any horizontal line meets a graph twice, the function is not one-to-one.'],
    ['Domain of a composition', 'The inputs that survive both machines — the inner function must produce something the outer one accepts.']
  ],
  sections: [
    { h: 'Combining functions the plain way',
      p: ['You can add, subtract, multiply and divide functions the same way you do numbers: $(f+g)(x)$ just means $f(x) + g(x)$.',
          'Do each one separately, then combine. There is no trick here, and no new rule to learn.',
          'The only care needed is division: $\\dfrac{f}{g}$ is undefined wherever $g(x) = 0$, so those inputs **leave the domain**.'],
      box: { k: 'key', h: 'Evaluate first, combine second', t: 'For $(f \\cdot g)(4)$, find $f(4)$ and $g(4)$ as numbers and multiply them. <strong>Multiplying the formulas first is more work and more chances to slip.</strong>' } },
    { h: 'Composition: one machine feeds the other',
      p: ['$(f \\circ g)(x)$ means $f(g(x))$. Work from the **inside out**, exactly as you would with brackets in arithmetic.',
          'With $g(x) = 2x$ and $f(x) = x + 5$: $g(3) = 6$ first, then $f(6) = 11$.',
          'To get a formula rather than a number, substitute the whole inner expression: $f(g(x)) = 2x + 5$.'],
      box: { k: 'warn', h: 'Inside-out, not left to right', t: 'In $f(g(x))$ the function <em>nearest the $x$</em> runs first. Reading it left to right gives you the other composition, and the two are almost never the same.' } },
    { h: 'Why the order matters',
      p: ['Double then add five, starting from $3$, gives $11$. Add five then double gives $16$. Same two machines, **different answers**.',
          'So $f \\circ g$ and $g \\circ f$ are different functions, and asking which one a problem wants is half the work.',
          'Put your socks on before your shoes. Composition has the same kind of order, and the same consequences for getting it wrong.'],
      box: { k: 'slow', h: 'A quick test', t: 'Pick any number, say $2$, and run it both ways. If the two answers differ, the compositions differ — and now you know which is which.' } },
    { h: 'Inverses: running the chain backwards',
      p: ['An inverse takes each output back to the input it came from. If $f(3) = 11$, then $f^{-1}(11) = 3$.',
          'To find the formula, swap $x$ and $y$ and solve for $y$. Swapping is what **reverses the roles** of input and output.',
          'From $y = 2x + 5$: swap to $x = 2y + 5$, then $y = \\dfrac{x - 5}{2}$. That is $f^{-1}$.'],
      box: { k: 'key', h: 'The graph gives it away', t: 'A function and its inverse are mirror images across the line $y = x$. Swapping $x$ and $y$ <em>is</em> that reflection, written algebraically.' } },
    { h: 'Not every function can be undone',
      p: ['$f(x) = x^2$ sends both $3$ and $-3$ to $9$. Asked to undo $9$, the inverse would not know **which one to return**.',
          'A function has an inverse only when it is one-to-one, and the horizontal line test checks exactly that.',
          'That is why $\\sqrt{x}$ is defined as the nonnegative root only, and why the domain of $x^2$ is often restricted to $x \\ge 0$.'],
      box: { k: 'slow', h: 'The check that settles it', t: 'Two functions are inverses when $f(g(x)) = x$ <em>and</em> $g(f(x)) = x$. <strong>Both directions are needed</strong> — one alone can hold by accident.' } }
  ],
  examples: [
    { t: 'A composition, as a number', q: 'For $f(x) = x^2 - 1$ and $g(x) = 3x + 2$, find $(f \\circ g)(1)$.',
      steps: [
        { do: 'Innermost first: $g(1) = 3(1) + 2 = 5$.', why: 'The function next to the $1$ runs first.' },
        { do: 'Now feed that into $f$: $f(5) = 5^2 - 1 = 24$.', why: 'The output of $g$ becomes the input of $f$.' },
        { do: 'So $(f \\circ g)(1) = 24$.', why: 'Reading it left to right would give $f(1) = 0$ then $g(0) = 2$ — a different question.' }
      ], ans: '$24$' },
    { t: 'A composition, as a formula', q: 'For $f(x) = x^2 - 1$ and $g(x) = 3x + 2$, find $(f \\circ g)(x)$.',
      steps: [
        { do: 'Replace every $x$ in $f$ with the whole of $g(x)$: $(3x + 2)^2 - 1$.', why: 'The inner expression travels as one block, so it needs brackets.' },
        { do: 'Expand: $(3x+2)^2 = 9x^2 + 12x + 4$.', why: 'Square the binomial, do not square the terms separately.' },
        { do: 'So $(f \\circ g)(x) = 9x^2 + 12x + 3$.', why: 'Check with $x = 1$: $9 + 12 + 3 = 24$, matching the previous example.' }
      ], ans: '$9x^2 + 12x + 3$' },
    { t: 'Finding an inverse', q: 'Find the inverse of $f(x) = \\dfrac{x + 4}{3}$.',
      steps: [
        { do: 'Write $y = \\dfrac{x+4}{3}$, then swap: $x = \\dfrac{y+4}{3}$.', why: 'Swapping exchanges input and output, which is what an inverse does.' },
        { do: 'Multiply both sides by $3$: $3x = y + 4$.', why: 'Undo the division first, because it was applied last.' },
        { do: 'Subtract $4$: $y = 3x - 4$, so $f^{-1}(x) = 3x - 4$.', why: 'Check: $f(5) = 3$ and $f^{-1}(3) = 5$.' }
      ], ans: '$f^{-1}(x) = 3x - 4$' }
  ],
  mistakes: [
    'Composing in the wrong order. $f(g(x))$ runs $g$ first, because $g$ is the one touching the $x$. Reading left to right gives $g(f(x))$, a genuinely different function — with $f(x)=x+5$ and $g(x)=2x$ the two differ by $5$ at every input.',
    'Dropping the brackets when substituting. $f(x) = x^2$ composed with $g(x) = x+1$ is $(x+1)^2$, not $x^2 + 1$. The inner function arrives as a single block, and a block being squared needs to be held together.',
    'Reading $f^{-1}$ as a reciprocal. $f^{-1}(x)$ is the inverse function, not $\\dfrac{1}{f(x)}$. For $f(x) = 2x$ the inverse is $\\dfrac{x}{2}$ while the reciprocal is $\\dfrac{1}{2x}$ — they agree nowhere except by accident.',
    'Claiming an inverse for a function that has none. $f(x) = x^2$ fails the horizontal line test, so undoing $9$ is ambiguous. Without a restricted domain there is no inverse function to find.',
    'Checking only one direction. $f(g(x)) = x$ on its own is not enough; $g(f(x)) = x$ must hold too. A one-sided check can pass for functions that are not inverses on the full domain.'
  ]
},
{
  id: 'transformfn', strand: 'algebra', fig: 'shiftLines',
  title: 'Parent Functions & Transformations',
  big: 'A handful of basic shapes, moved and stretched, account for almost every graph you will meet.',
  discover: [
    '**Trace a parabola onto tracing paper, then slide the paper.**',
    'Nothing about the curve changed. It is the same width, the same shape, the same everything.',
    { fig: 'discTransformfn' },
    'All that changed is **where it sits**. Two numbers describe that: how far across, how far up.',
    'Now pull the paper wider without moving it. Still the same curve, just stretched — one more number.',
    { punch: 'So a graph needs two things: which family it belongs to, and what was done to it. $y = a(x-h)^2 + k$ is exactly that sentence written in symbols.' }
  ],
  funfact: [
    'Graphic designers call this the same thing mathematicians do: a transform. Moving, scaling and flipping a shape are the only three operations most design tools offer.',
    'The reason $y = f(x - 3)$ shifts the graph <em>right</em> and not left catches almost everyone. The graph does whatever it must so the function still sees its usual input.',
    'Every animation you have watched is a transformation applied over and over, a fraction of a second apart.'
  ],
  vocab: [
    ['Parent function', 'The plainest member of a family — $y = x^2$, $y = |x|$, $y = \\sqrt{x}$, $y = \\dfrac{1}{x}$ — before anything is done to it.'],
    ['Translation', 'A slide. $f(x) + k$ moves the graph up; $f(x - h)$ moves it right.'],
    ['Reflection', 'A flip. $-f(x)$ flips across the $x$-axis; $f(-x)$ flips across the $y$-axis.'],
    ['Vertical stretch', 'Multiplying the whole output: $a f(x)$ pulls the graph away from the $x$-axis when $|a| > 1$.'],
    ['Piecewise function', 'A function defined by different rules on different stretches of the domain.']
  ],
  sections: [
    { h: 'The families worth knowing by sight',
      p: ['Six shapes cover most of the course: the line, the parabola $x^2$, the cubic $x^3$, the absolute value $|x|$, the root $\\sqrt{x}$ and the reciprocal $\\dfrac{1}{x}$.',
          'Learn what each one **looks like at rest**, and every later graph becomes one of them, moved.',
          'Sketch each from three points if you are unsure — the shape returns faster than the formula does.'],
      box: { k: 'key', h: 'Why these six', t: 'They are the graphs you cannot build from the others. Everything else in Algebra II is one of these six with numbers attached.' } },
    { h: 'Outside the function moves it vertically',
      p: ['Anything done **outside** $f$ happens to the output, so it affects the graph vertically and does what it says.',
          '$f(x) + 3$ lifts the graph three; $-f(x)$ flips it upside down; $2f(x)$ stretches it to twice the height.',
          'These are the intuitive ones, because the arithmetic happens after the function has already done its job.'],
      box: { k: 'key', h: 'Outside is honest', t: 'Add three outside, the graph rises three. <strong>What you write is what you get</strong> — vertically.' } },
    { h: 'Inside the function moves it horizontally, backwards',
      p: ['Anything done **inside** the bracket happens to the input, and the graph responds in the opposite direction.',
          '$f(x - 3)$ moves the graph three to the <em>right</em>, not left. To get the output $f$ used to give at $0$, you must now feed in $3$.',
          'Likewise $f(2x)$ squashes the graph to half its width, because the input reaches its usual values twice as fast.'],
      box: { k: 'warn', h: 'The one everybody gets backwards', t: 'Ask what $x$ makes the bracket zero. In $f(x-3)$ that is $x = 3$, so the graph’s starting point has <strong>moved to 3</strong>. The bracket tells you the answer directly.' } },
    { h: 'Reading a transformed formula',
      p: ['In $y = a f(x - h) + k$, read $h$ and $k$ as the new home of the parent point, and $a$ as the stretch.',
          'For $y = -2(x+1)^2 + 5$: the vertex sits at $(-1, 5)$, the graph is **twice as tall** and opens downward.',
          'Order matters when you apply them by hand: stretch and flip first, then translate.'],
      box: { k: 'slow', h: 'Check with one point', t: 'Put the parent’s key point through the transformation and see where it lands. If the vertex of $(x+1)^2 + 5$ does not come out at $(-1,5)$, a sign slipped.' } },
    { h: 'Piecewise functions',
      p: ['Some situations need different rules on different stretches: a parking charge that is flat for two hours, then hourly.',
          'Write each rule with the interval it governs, and evaluate by first asking **which piece the input falls in**.',
          'On the graph, a filled dot means the endpoint is included; an open dot means it is not.'],
      box: { k: 'key', h: 'One input, one piece', t: 'The intervals must not overlap, or a single input would have two outputs — and then it is not a function at all.' } }
  ],
  examples: [
    { t: 'Describing a transformation', q: 'Describe how $y = -\\dfrac{1}{2}(x - 4)^2 + 3$ relates to $y = x^2$.',
      steps: [
        { do: 'The bracket is $(x-4)$, so the graph moves $4$ right.', why: 'Inside the function, and the opposite of the sign shown.' },
        { do: 'The $-\\dfrac{1}{2}$ flips it downward and squashes it to half height.', why: 'Outside the function, so vertical and honest.' },
        { do: 'The $+3$ lifts it $3$. The vertex lands at $(4, 3)$.', why: 'Outside again, so straight up.' }
      ], ans: 'Right $4$, reflected down, half as tall, up $3$; vertex $(4,3)$' },
    { t: 'Writing the formula from a picture', q: 'An absolute value graph has its corner at $(-2, 1)$ and opens upward, twice as steep as $y = |x|$. Write its equation.',
      steps: [
        { do: 'Corner at $x = -2$ means the bracket is $(x + 2)$.', why: 'The bracket must be zero at the corner.' },
        { do: 'Corner at $y = 1$ means $+1$ outside.', why: 'Vertical shift is exactly the $y$-value.' },
        { do: 'Twice as steep is a factor of $2$ in front.', why: 'Positive, since it still opens upward.' }
      ], ans: '$y = 2|x + 2| + 1$' },
    { t: 'Evaluating a piecewise function', q: 'For $f(x) = 2x + 1$ when $x < 3$, and $f(x) = x^2$ when $x \\ge 3$, find $f(2)$ and $f(3)$.',
      steps: [
        { do: '$2 < 3$, so $f(2)$ uses the first rule: $2(2) + 1 = 5$.', why: 'Choose the piece before doing any arithmetic.' },
        { do: '$3 \\ge 3$, so $f(3)$ uses the second rule: $3^2 = 9$.', why: 'The $\\ge$ puts the endpoint $3$ in the second piece.' },
        { do: 'The two rules disagree at $3$ — the graph jumps.', why: 'That is allowed; it is still one output per input.' }
      ], ans: '$f(2) = 5$, $f(3) = 9$' }
  ],
  mistakes: [
    'Shifting horizontally the wrong way. $f(x - 3)$ moves the graph <strong>right</strong>, not left. Ask which $x$ makes the bracket zero: for $(x-3)$ that is $3$, so the graph now starts there.',
    'Treating an inside stretch as a vertical one. $f(2x)$ halves the width; $2f(x)$ doubles the height. They look alike in print and do opposite things, so check whether the $2$ is inside the bracket.',
    'Applying the shift before the stretch. In $y = 2(x-1)^2 + 3$ the stretch acts on the parent, then the shift moves the result. Shifting first moves the wrong curve and lands the vertex in the wrong place.',
    'Squaring the coefficient by accident. In $y = (2x)^2$ the $2$ is inside and gets squared to $4$; in $y = 2x^2$ it is outside and stays $2$. The graphs differ by a factor of two in height.',
    'Using the wrong piece at a boundary. If the definition says $x \\ge 3$, then $3$ belongs to that piece. The inequality sign at the endpoint is the whole instruction, and a filled or open dot on the graph says the same thing.'
  ]
},
{
  id: 'polydiv', strand: 'algebra', fig: 'polyDivision',
  title: 'Dividing Polynomials & the Factor Theorem',
  big: 'Dividing polynomials is the long division you already know, and a remainder of zero names a factor.',
  discover: [
    '**Does $37$ divide $1554$ exactly?**',
    'You would find out by long division. Bring down, multiply back, subtract, repeat.',
    { fig: 'discPolydiv' },
    'It comes out $42$ with **nothing left over**, and that is what makes $37$ a factor of $1554$.',
    'Now ask whether $x - 3$ divides $x^2 + x - 12$. The layout is identical, and again nothing is left over.',
    { punch: 'A remainder of zero means "divides exactly" in both worlds. So division is a factor test — and it works on polynomials nobody could factor by inspection.' }
  ],
  funfact: [
    'Synthetic division, the shortcut with just the coefficients, was in use by the 1800s. It strips away the $x$s because they were never doing any work.',
    'The remainder theorem says the remainder on dividing by $x - a$ equals $f(a)$. Checking a factor costs one substitution, not a whole division.',
    'Computers factor enormous polynomials this way every day — it is how a graphing calculator finds roots it cannot see.'
  ],
  vocab: [
    ['Dividend', 'The polynomial being divided — the one inside the bracket.'],
    ['Divisor', 'The polynomial you are dividing by.'],
    ['Remainder', 'What is left when the divisor no longer fits. Always lower degree than the divisor.'],
    ['Remainder theorem', 'Dividing $f(x)$ by $x - a$ leaves remainder $f(a)$.'],
    ['Factor theorem', 'If $f(a) = 0$ then $x - a$ is a factor, and the other way round.']
  ],
  sections: [
    { h: 'Long division, term by term',
      p: ['Write both polynomials in **descending order**, and put in a $0$ for any missing power — a gap will throw the columns out.',
          'Divide the leading terms, write the result on top, multiply back, subtract, bring the next term down.',
          'Stop when what remains has a **lower degree** than the divisor. That leftover is the remainder.'],
      box: { k: 'warn', h: 'Subtract the whole line', t: 'You are subtracting a bracket, so every sign in it flips. <strong>Forgetting the second sign is the most common error in this unit</strong>, and it derails everything after it.' } },
    { h: 'Synthetic division, when the divisor is $x - a$',
      p: ['If you are dividing by $x - a$, the $x$s carry no information, so drop them and work with coefficients alone.',
          'Write $a$ in the box, bring down the first coefficient, multiply by $a$, add to the next, and repeat.',
          'The last number is the **remainder**; the rest are the coefficients of the quotient, one degree lower.'],
      box: { k: 'key', h: 'Mind the sign of a', t: 'Dividing by $x - 3$ puts $+3$ in the box; dividing by $x + 3$ puts $-3$. <em>Use the root, not the number you see.</em>' } },
    { h: 'The remainder theorem',
      p: ['There is a shortcut worth having: the remainder on dividing $f(x)$ by $x - a$ is simply $f(a)$.',
          'So to find the remainder for $f(x) = x^3 - 2x + 1$ divided by $x - 2$, just compute $f(2) = 5$. **No division needed.**',
          'It works because the division statement $f(x) = (x-a)q(x) + r$ becomes $f(a) = 0 \\cdot q(a) + r$ when you substitute $x = a$.'],
      box: { k: 'key', h: 'One substitution beats one division', t: 'When a question asks only for the remainder, evaluating $f(a)$ is faster and far less error-prone than carrying out the division.' } },
    { h: 'The factor theorem',
      p: ['If the remainder is zero then the divisor went in exactly, so $x - a$ is a **factor** of $f(x)$.',
          'That gives a test with no guessing: $f(a) = 0$ if and only if $x - a$ is a factor.',
          'It also runs the other way. Knowing a root hands you a factor, and dividing by it leaves a smaller polynomial to finish.'],
      box: { k: 'slow', h: 'Roots and factors are the same fact', t: '"$3$ is a root", "$f(3) = 0$", "$x - 3$ is a factor" and "the graph crosses at $3$" are four ways of saying one thing.' } },
    { h: 'Factoring a cubic completely',
      p: ['For a cubic, test the small whole numbers that divide the constant term — those are the only rational roots worth trying.',
          'When one works, divide it out. You are left with a **quadratic**, which you already know how to factor.',
          'So a cubic takes one lucky guess and one routine step, not a flash of insight.'],
      box: { k: 'key', h: 'Where to guess', t: 'For $x^3 - 4x^2 + x + 6$, try $\\pm1, \\pm2, \\pm3, \\pm6$ — the divisors of $6$. Anything else cannot be a rational root.' } }
  ],
  examples: [
    { t: 'Long division', q: 'Divide $x^3 + 3x^2 - 4x - 12$ by $x - 2$.',
      steps: [
        { do: '$x^3 \\div x = x^2$. Multiply back: $x^3 - 2x^2$, and subtract to get $5x^2$.', why: 'Subtracting the bracket flips both signs.' },
        { do: 'Bring down $-4x$. Now $5x^2 \\div x = 5x$; multiply back and subtract to get $6x$.', why: 'Same three moves, one degree lower.' },
        { do: 'Bring down $-12$. Then $6x \\div x = 6$; multiply back and subtract to get $0$.', why: 'Remainder $0$, so $x-2$ is a factor.' }
      ], ans: '$x^2 + 5x + 6$, remainder $0$' },
    { t: 'A remainder without dividing', q: 'Find the remainder when $f(x) = 2x^3 - 5x + 4$ is divided by $x - 3$.',
      steps: [
        { do: 'The divisor is $x - 3$, so $a = 3$.', why: 'Use the root, not the $-3$ on the page.' },
        { do: 'Compute $f(3) = 2(27) - 5(3) + 4 = 54 - 15 + 4$.', why: 'The remainder theorem says this is the remainder.' },
        { do: 'That is $43$.', why: 'Not zero, so $x - 3$ is not a factor.' }
      ], ans: '$43$' },
    { t: 'Factoring a cubic', q: 'Factor $x^3 - 4x^2 + x + 6$ completely.',
      steps: [
        { do: 'Test divisors of $6$. $f(-1) = -1 - 4 - 1 + 6 = 0$, so $x + 1$ is a factor.', why: 'The factor theorem turns a root into a factor.' },
        { do: 'Divide by $x + 1$ to get $x^2 - 5x + 6$.', why: 'Synthetic division with $-1$ in the box.' },
        { do: 'Factor the quadratic: $(x-2)(x-3)$.', why: 'Two numbers multiplying to $6$ and adding to $-5$.' }
      ], ans: '$(x+1)(x-2)(x-3)$' }
  ],
  mistakes: [
    'Forgetting to subtract the whole line. Dividing $x^3 + 3x^2$ by $x-2$ gives $x^3 - 2x^2$ to subtract, and $3x^2 - (-2x^2)$ is $5x^2$, not $x^2$. Every sign in the bracket flips, and one missed sign wrecks the rest.',
    'Leaving a gap for a missing power. In $x^3 - 8$ the $x^2$ and $x$ terms are missing, so write $x^3 + 0x^2 + 0x - 8$. Without the placeholders the columns slide and the quotient comes out a degree wrong.',
    'Putting the wrong number in the synthetic division box. Dividing by $x + 4$ uses $-4$, because $-4$ is the root. Using $+4$ answers a different question entirely.',
    'Reading the last synthetic-division number as part of the quotient. It is the remainder. If a cubic divided by $x-a$ leaves four numbers, the first three are the quotient and the fourth stands alone.',
    'Guessing roots at random. Only divisors of the constant term can be rational roots, so for $x^3 - 4x^2 + x + 6$ the whole list is $\\pm1, \\pm2, \\pm3, \\pm6$. Trying $5$ is wasted effort.'
  ]
},
{
  id: 'polyfn', strand: 'algebra', fig: 'polyEnds',
  title: 'Polynomial Functions & Their Graphs',
  big: 'The degree and the leading coefficient decide the shape before you plot a single point.',
  discover: [
    '**Look at a roller coaster profile and count the hills.**',
    'A straight run has no turns. One hill and you have a parabola. Two turns needs a cubic.',
    { fig: 'discPolyfn' },
    'The track drawn here turns **five times**, so no cubic could hold it — the rule has to be bigger.',
    'A polynomial of degree $n$ can turn at most $n - 1$ times. Five turns needs degree six or more.',
    { punch: 'That is the whole idea of this unit: the degree caps how wiggly a graph can be, and the leading coefficient decides where the ends go. Everything else is detail.' }
  ],
  funfact: [
    'The word comes from Greek <em>poly</em> and Latin <em>nomen</em> — "many names", meaning many terms.',
    'Ships’ hulls, car bodies and font outlines are all drawn with polynomial curves, because they are smooth and a computer can evaluate them fast.',
    'The fundamental theorem of algebra says a degree $n$ polynomial has exactly $n$ roots, if you count repeats and allow complex ones. Gauss proved it at twenty-two.'
  ],
  vocab: [
    ['Degree', 'The highest power of $x$. It caps the number of roots and the number of turns.'],
    ['Leading coefficient', 'The number in front of the highest power. Its sign decides which way the right end goes.'],
    ['End behaviour', 'What the graph does far out to the left and right.'],
    ['Multiplicity', 'How many times a root repeats. It decides whether the graph crosses or just touches.'],
    ['Turning point', 'Where the graph changes from rising to falling or back. At most $n - 1$ of them.']
  ],
  sections: [
    { h: 'What the ends do',
      p: ['Far from the origin the highest power swamps everything else, so the **leading term alone** decides the ends.',
          'Even degree: both ends point the same way — both up if the lead is positive, both down if negative.',
          'Odd degree: the ends disagree. Positive lead falls on the left and rises on the right.'],
      box: { k: 'key', h: 'Two questions, four answers', t: 'Is the degree even or odd? Is the lead positive or negative? <strong>Those two answers fix both ends</strong>, and no other part of the polynomial matters.' } },
    { h: 'Roots are where the graph meets the axis',
      p: ['Setting $y = 0$ and solving gives the $x$-intercepts, so a factored polynomial **shows its roots directly**.',
          '$y = (x-1)(x+2)(x-4)$ crosses at $1$, $-2$ and $4$ — no working required.',
          'A degree $n$ polynomial has at most $n$ real roots, which is why a cubic can never cross four times.'],
      box: { k: 'key', h: 'Factored form is the useful form', t: 'Expanding hides the roots. If a question asks where the graph crosses, factor rather than expand.' } },
    { h: 'Multiplicity: cross, or just touch',
      p: ['A root that appears once makes the graph **cross** the axis cleanly.',
          'A root appearing twice makes it touch and turn back, like a parabola resting on the axis.',
          'Odd multiplicity crosses; even multiplicity bounces. That is why $(x-2)^2$ sits on the axis at $2$ instead of passing through.'],
      box: { k: 'slow', h: 'Count the factor, not the root', t: 'In $y = (x-3)^2(x+1)$ the root $3$ has multiplicity $2$ so the graph bounces there, while $-1$ is single so it crosses.' } },
    { h: 'Turning points',
      p: ['Between two roots the graph has to turn round to come back, so roots and turns are tied together.',
          'A degree $n$ polynomial has **at most $n-1$ turning points** — a cubic turns at most twice.',
          'It can have fewer. $y = x^3$ has none at all, because it rises the whole way.'],
      box: { k: 'key', h: 'Working backwards from a picture', t: 'Count the turns on a graph, add one, and you have the <em>smallest</em> degree that could draw it.' } },
    { h: 'Sketching without plotting',
      p: ['Find the roots from the factors and mark them. Decide cross or bounce from each multiplicity.',
          'Fix the two ends from the degree and the leading sign, then **join it up smoothly**.',
          'One extra point, usually the $y$-intercept at $x = 0$, pins the vertical scale.'],
      box: { k: 'slow', h: 'The sketch checks itself', t: 'If your curve needs more turns than $n-1$ to connect the marks, something is wrong — go back and recheck a multiplicity.' } }
  ],
  examples: [
    { t: 'End behaviour', q: 'Describe the end behaviour of $y = -2x^4 + 7x^3 - 5$.',
      steps: [
        { do: 'The degree is $4$, which is even.', why: 'Even degree means both ends agree.' },
        { do: 'The leading coefficient $-2$ is negative.', why: 'Negative flips both ends downward.' },
        { do: 'So the graph falls at both ends.', why: 'The $7x^3$ shapes the middle but has no say about the ends.' }
      ], ans: 'Down on the left, down on the right' },
    { t: 'Reading a factored polynomial', q: 'For $y = (x+1)(x-2)^2$, give the roots and say whether the graph crosses or touches at each.',
      steps: [
        { do: '$x + 1 = 0$ gives $x = -1$, appearing once.', why: 'Multiplicity $1$, so it crosses.' },
        { do: '$(x-2)^2 = 0$ gives $x = 2$, appearing twice.', why: 'Multiplicity $2$, so it touches and turns back.' },
        { do: 'Degree is $1 + 2 = 3$, positive lead, so it rises to the right.', why: 'Odd degree means the ends disagree.' }
      ], ans: 'Crosses at $-1$, touches at $2$' },
    { t: 'Smallest possible degree', q: 'A graph crosses the $x$-axis three times and has four turning points. What is the smallest degree it could have?',
      steps: [
        { do: 'Four turns needs degree at least $4 + 1 = 5$.', why: 'A degree $n$ polynomial turns at most $n-1$ times.' },
        { do: 'Three crossings needs degree at least $3$, which is already satisfied.', why: 'The turning points are the stronger constraint here.' },
        { do: 'The ends disagree — three crossings with four turns needs an odd degree.', why: 'Degree $5$ meets every requirement.' }
      ], ans: '$5$' }
  ],
  mistakes: [
    'Judging the ends from the wrong term. In $y = -2x^4 + 7x^3$ the $7x^3$ looks cheerful, but at $x = 100$ the $x^4$ term is fourteen times larger. Only the leading term decides the ends.',
    'Assuming a double root crosses. $y = (x-2)^2$ touches the axis at $2$ and turns back. Even multiplicity bounces, odd multiplicity crosses — the graph never passes through a squared factor.',
    'Counting turning points as equal to the degree. Degree $n$ allows at most $n-1$ turns, so a cubic turns twice at most. Reading four turns and calling it degree four is one short.',
    'Expanding before reading the roots. $(x-1)(x+2)(x-4)$ shows its intercepts at a glance; multiplied out it is $x^3 - 3x^2 - 6x + 8$ and they are hidden. Factored form is the useful form.',
    'Forgetting that fewer turns is allowed. $y = x^3$ has no turning points at all, so "degree $3$" does not promise two turns — it only caps them.'
  ]
},
{
  id: 'complexnum', strand: 'number', fig: 'complexPlane',
  title: 'Complex Numbers',
  big: 'One new number, $i$, and every polynomial equation finally has a solution.',
  discover: [
    '**Find a number on the line whose square is $-1$.**',
    'Positive times positive is positive. Negative times negative is also positive. Zero squares to zero.',
    { fig: 'discComplexnum' },
    'So no point anywhere on that line works. The line is **not big enough** for the question.',
    'Mathematicians had two choices: declare the question meaningless, or step off the line. They stepped off.',
    { punch: 'Call the new direction $i$, with $i^2 = -1$. The line becomes a plane, and every quadratic that had "no solution" turns out to have two.' }
  ],
  funfact: [
    'Descartes named them "imaginary" as an insult — he thought they were nonsense. The name stuck, which is a pity, because they are no less real than $\\sqrt{2}$.',
    'Your phone uses complex numbers constantly. Every signal it sends is described by one, because a complex number carries size and phase in a single symbol.',
    'Electrical engineers write $j$ instead of $i$, since $i$ was already taken by current.'
  ],
  vocab: [
    ['Imaginary unit', '$i$, defined by $i^2 = -1$.'],
    ['Complex number', 'Anything of the form $a + bi$, with $a$ the real part and $b$ the imaginary part.'],
    ['Conjugate', '$a - bi$ is the conjugate of $a + bi$. Multiplying them clears the $i$ entirely.'],
    ['Discriminant', '$b^2 - 4ac$. Negative means the two roots are complex.'],
    ['Complex plane', 'The plane where the horizontal axis is real and the vertical axis imaginary.']
  ],
  sections: [
    { h: 'Powers of i go round in fours',
      p: ['$i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$ — and then it **starts again**.',
          'So to find $i^{39}$, divide $39$ by $4$ and keep the remainder $3$: the answer is $i^3 = -i$.',
          'The whole cycle is four steps long, which is why only the remainder matters.'],
      box: { k: 'key', h: 'Divide by four, keep the remainder', t: 'Remainder $0 \\to 1$, $1 \\to i$, $2 \\to -1$, $3 \\to -i$. <strong>Four cases, and they never change.</strong>' } },
    { h: 'Adding and subtracting',
      p: ['Treat $i$ like any other letter: **real with real, imaginary with imaginary**.',
          '$(3 + 4i) + (5 - 2i) = 8 + 2i$. Nothing new is happening here.',
          'The answer is always written $a + bi$, real part first.'],
      box: { k: 'key', h: 'It is collecting like terms', t: 'If you can simplify $3x + 5x$, you can add complex numbers. The only difference is what happens when two $i$s meet.' } },
    { h: 'Multiplying, and the moment $i^2$ appears',
      p: ['Multiply out as usual, then replace every $i^2$ with $-1$. That replacement is the **only new rule**.',
          '$(2+3i)(1-4i) = 2 - 8i + 3i - 12i^2$, and $-12i^2$ becomes $+12$.',
          'Collecting up: $14 - 5i$. Notice the real part grew, because the $i^2$ term crossed over.'],
      box: { k: 'warn', h: 'The sign flip is easy to miss', t: '$-12i^2 = -12(-1) = +12$. <strong>Two negatives make a positive here</strong>, and skipping that step is the commonest slip in the unit.' } },
    { h: 'Dividing by using the conjugate',
      p: ['You cannot leave $i$ in a denominator, so multiply top and bottom by the **conjugate** of the bottom.',
          '$(a+bi)(a-bi) = a^2 + b^2$, a plain real number, because the middle terms cancel and $-b^2i^2$ turns positive.',
          'That single move clears the denominator every time, with no cases to consider.'],
      box: { k: 'key', h: 'Why the conjugate', t: 'It is the difference of two squares, arranged so the leftover $i^2$ becomes real. The same trick rationalises $\\dfrac{1}{2+\\sqrt3}$.' } },
    { h: 'Where complex roots come from',
      p: ['In the quadratic formula, a negative under the square root used to end the problem.',
          'Now $\\sqrt{-16} = 4i$, so the formula keeps going and returns **two complex roots**.',
          'They always arrive as a conjugate pair — if $3 + 2i$ is a root of a real polynomial, so is $3 - 2i$.'],
      box: { k: 'slow', h: 'What the graph shows', t: 'A negative discriminant means the parabola misses the $x$-axis. The roots are still there; they simply are not on the picture.' } }
  ],
  examples: [
    { t: 'A high power of i', q: 'Simplify $i^{47}$.',
      steps: [
        { do: 'Divide $47$ by $4$: $47 = 4(11) + 3$.', why: 'The powers repeat every four steps.' },
        { do: 'The remainder is $3$, so $i^{47} = i^3$.', why: 'Only the remainder survives.' },
        { do: 'And $i^3 = i^2 \\cdot i = -i$.', why: 'Because $i^2 = -1$.' }
      ], ans: '$-i$' },
    { t: 'Multiplying', q: 'Expand $(2 + 3i)(1 - 4i)$.',
      steps: [
        { do: 'Multiply out: $2 - 8i + 3i - 12i^2$.', why: 'Ordinary expansion, nothing special yet.' },
        { do: 'Replace $i^2$ with $-1$: $-12i^2 = +12$.', why: 'The one new rule, and the one easily missed.' },
        { do: 'Collect: $(2 + 12) + (-8 + 3)i = 14 - 5i$.', why: 'Real with real, imaginary with imaginary.' }
      ], ans: '$14 - 5i$' },
    { t: 'Dividing', q: 'Simplify $\\dfrac{5}{2 - i}$.',
      steps: [
        { do: 'Multiply top and bottom by the conjugate $2 + i$.', why: 'This is what clears $i$ from the denominator.' },
        { do: 'Bottom: $(2-i)(2+i) = 4 - i^2 = 4 + 1 = 5$.', why: 'The middle terms cancel, leaving a real number.' },
        { do: 'Top: $5(2+i) = 10 + 5i$, so the answer is $\\dfrac{10+5i}{5} = 2 + i$.', why: 'Divide both parts by $5$.' }
      ], ans: '$2 + i$' }
  ],
  mistakes: [
    'Forgetting that $i^2 = -1$ flips a sign. In $(2+3i)(1-4i)$ the term $-12i^2$ becomes $+12$, so the real part is $14$, not $2$. Leaving the $i^2$ in place, or treating it as $+1$, loses the whole point of the unit.',
    'Writing $\\sqrt{-9} = -3$. It is $3i$. The minus sign lives under the root and comes out as $i$; it does not simply move in front.',
    'Multiplying $\\sqrt{-4} \\cdot \\sqrt{-9}$ as $\\sqrt{36} = 6$. Convert first: $2i \\cdot 3i = 6i^2 = -6$. The rule $\\sqrt{a}\\sqrt{b} = \\sqrt{ab}$ fails once the numbers are negative.',
    'Leaving $i$ in a denominator. $\\dfrac{5}{2-i}$ is not in standard form. Multiply by the conjugate $2+i$ to get $2+i$, which is.',
    'Reporting only one complex root. Complex roots of a real polynomial always come in conjugate pairs, so finding $3+2i$ means $3-2i$ is there too.'
  ]
},
{
  id: 'radicaleq', strand: 'algebra', fig: 'radicalLadder',
  title: 'Radical Functions & Equations',
  big: 'Squaring both sides is legal, and it can still hand you an answer that is wrong.',
  discover: [
    '**Solve $\\sqrt{x} = -3$.**',
    'Square both sides. Squaring is something you are allowed to do to an equation, so nothing improper has happened.',
    { fig: 'discRadicaleq' },
    'You get $x = 9$. Now put it back: $\\sqrt{9} = 3$, and $3$ is **not** $-3$.',
    'Every step was legal, and the answer is still wrong. Something about squaring loses information.',
    { punch: 'Squaring forgets the sign it started with — $3$ and $-3$ both square to $9$. So a radical equation is not finished until every answer has been put back and checked.' }
  ],
  funfact: [
    'Answers like this have a name: <em>extraneous solutions</em>. They are not mistakes in your working — they are created by a legal step that is not reversible.',
    'The square root sign means the <em>positive</em> root only. Without that convention $\\sqrt{9}$ would be two numbers, and $\\sqrt{x}$ would not be a function at all.',
    'Cube roots have no such trouble. $\\sqrt[3]{-8} = -2$ is perfectly happy, because cubing keeps the sign.'
  ],
  vocab: [
    ['Radical equation', 'An equation with the unknown underneath a root sign.'],
    ['Extraneous solution', 'A value the algebra produces that fails in the original equation.'],
    ['Principal root', 'The non-negative one. $\\sqrt{25} = 5$, never $-5$.'],
    ['Index', 'The little number on the root. Square root has index $2$, cube root index $3$.'],
    ['Domain restriction', 'A square root needs its inside to be $\\ge 0$, which limits the inputs allowed.']
  ],
  sections: [
    { h: 'The shape of a root graph',
      p: ['$y = \\sqrt{x}$ starts at the origin and climbs, but **more and more slowly** — it is half a parabola on its side.',
          'It exists only for $x \\ge 0$, because a square root of a negative is not a real number.',
          '$y = \\sqrt[3]{x}$ has no such limit. It accepts negatives and runs through all four quadrants.'],
      box: { k: 'key', h: 'Where a root graph starts', t: 'For $y = \\sqrt{x - 4}$, the inside must be $\\ge 0$, so the graph begins at $x = 4$. <strong>Set the inside to zero and you have the starting point.</strong>' } },
    { h: 'Isolate the root first',
      p: ['Get the radical **alone on one side** before squaring. Squaring a sum squares the cross terms too, and creates work you did not need.',
          '$\\sqrt{x+1} + 2 = 6$ should become $\\sqrt{x+1} = 4$ before anything else happens.',
          'Then square once, cleanly, and solve what is left.'],
      box: { k: 'warn', h: 'Square the sides, not the terms', t: '$(\\sqrt{x} + 2)^2$ is $x + 4\\sqrt{x} + 4$, not $x + 4$. <strong>Squaring does not distribute over addition</strong>, which is exactly why you isolate first.' } },
    { h: 'Always check',
      p: ['Squaring can create solutions that were never there, so the last step of every radical equation is to **put the answers back**.',
          'This is not neatness — it is part of the method. An unchecked answer is an unfinished problem.',
          'If a value fails, say so and discard it. Sometimes every candidate fails, and the honest answer is "no solution".'],
      box: { k: 'slow', h: 'A one-line filter', t: 'A square root can never equal a negative number. If the isolated equation reads $\\sqrt{\\ldots} = -5$, you can stop right there.' } },
    { h: 'Rational exponents say the same thing',
      p: ['$x^{1/2}$ means $\\sqrt{x}$, and $x^{2/3}$ means $\\sqrt[3]{x^2}$. The **denominator is the root**, the numerator is the power.',
          'Writing roots as exponents lets you use the exponent rules instead of learning separate radical rules.',
          '$\\sqrt{x} \\cdot \\sqrt[3]{x}$ is awkward; $x^{1/2} \\cdot x^{1/3} = x^{5/6}$ is not.'],
      box: { k: 'key', h: 'Bottom is the root', t: '$8^{2/3}$: cube root first to get $2$, then square to get $4$. <em>Taking the root first keeps the numbers small.</em>' } },
    { h: 'Two radicals',
      p: ['When two roots appear, isolate one, square, and see what survives. Usually **one radical is left**.',
          'Isolate that one and square again. Two squarings are normal and nothing has gone wrong.',
          'Checking matters even more here, because each squaring is another chance to invent a solution.'],
      box: { k: 'slow', h: 'Expect it to get worse before better', t: 'After the first squaring the equation often looks messier. That is the method working, not a sign you took a wrong turn.' } }
  ],
  examples: [
    { t: 'A straightforward one', q: 'Solve $\\sqrt{2x + 3} = 5$.',
      steps: [
        { do: 'The radical is already alone, so square both sides: $2x + 3 = 25$.', why: 'Squaring undoes the root.' },
        { do: 'Solve: $2x = 22$, so $x = 11$.', why: 'Ordinary linear algebra from here.' },
        { do: 'Check: $\\sqrt{2(11)+3} = \\sqrt{25} = 5$. It works.', why: 'The check is part of the method, not an optional extra.' }
      ], ans: '$x = 11$' },
    { t: 'One that lies to you', q: 'Solve $\\sqrt{x + 6} = x$.',
      steps: [
        { do: 'Square: $x + 6 = x^2$, so $x^2 - x - 6 = 0$.', why: 'A quadratic appears — that is normal.' },
        { do: 'Factor: $(x-3)(x+2) = 0$, giving $x = 3$ or $x = -2$.', why: 'Two candidates, not yet two answers.' },
        { do: 'Check $x=3$: $\\sqrt{9} = 3$, good. Check $x=-2$: $\\sqrt{4} = 2 \\ne -2$, so discard it.', why: 'The root is positive; it can never equal $-2$.' }
      ], ans: '$x = 3$ only' },
    { t: 'A rational exponent', q: 'Evaluate $16^{3/4}$ without a calculator.',
      steps: [
        { do: 'The denominator $4$ is the root: $\\sqrt[4]{16} = 2$.', why: 'Take the root first to keep the numbers small.' },
        { do: 'The numerator $3$ is the power: $2^3 = 8$.', why: 'Power second.' },
        { do: 'So $16^{3/4} = 8$.', why: 'Doing it the other way needs $16^3 = 4096$ first — same answer, much more work.' }
      ], ans: '$8$' }
  ],
  mistakes: [
    'Skipping the check. Solving $\\sqrt{x+6} = x$ gives $x = 3$ and $x = -2$, but $-2$ fails because a square root is never negative. Squaring can invent solutions, so the check is part of the method.',
    'Squaring term by term. $(\\sqrt{x} + 2)^2$ is $x + 4\\sqrt{x} + 4$, not $x + 4$. Squaring does not distribute over addition, which is why the radical is isolated first.',
    'Reading $x^{2/3}$ as $\\dfrac{2}{3}x$. The fraction is an exponent: the bottom is the root and the top is the power, so $8^{2/3} = 4$, not $\\dfrac{16}{3}$.',
    'Ignoring the domain of the graph. $y = \\sqrt{x-4}$ does not exist to the left of $4$, so plotting points at $x = 0$ or $x = 2$ produces a curve that is not there.',
    'Giving up after one squaring when two radicals are present. One squaring usually leaves a single radical behind. Isolate it and square again — the mess in the middle is expected.'
  ]
},
{
  id: 'rational', strand: 'algebra', fig: 'rationalAsymptote',
  title: 'Rational Expressions & Equations',
  big: 'Fractions with letters in them obey the fraction rules you already know — plus one forbidden value.',
  discover: [
    '**One tap fills the tub in 3 hours, the other in 6.**',
    'Turn both on. A tempting answer is the average, four and a half hours, but that cannot be right.',
    { fig: 'discRational' },
    'Two taps must be **faster** than either one alone, so the answer has to be under $3$ hours.',
    'What adds is not the times, it is the rates: $\\dfrac13$ of a tub per hour plus $\\dfrac16$ gives $\\dfrac12$.',
    { punch: 'Half a tub per hour means two hours. Adding rates means adding fractions with letters in them — which is this whole unit.' }
  ],
  funfact: [
    'Work problems like this appear in a Chinese text from around 100 BC, with the same tubs and the same trap.',
    'The forbidden values, where the bottom is zero, are what give rational graphs their vertical asymptotes — the lines the curve races towards and never touches.',
    'Engineers call the ratio of two polynomials a transfer function, and use it to describe everything from a loudspeaker to a suspension bridge.'
  ],
  vocab: [
    ['Rational expression', 'A fraction whose top and bottom are polynomials.'],
    ['Excluded value', 'An input that makes the denominator zero. It can never be in the domain.'],
    ['Vertical asymptote', 'A vertical line the graph approaches but never reaches, at an excluded value that does not cancel.'],
    ['Horizontal asymptote', 'The height the graph settles towards far out to the left and right.'],
    ['Least common denominator', 'The smallest expression every denominator divides into.']
  ],
  sections: [
    { h: 'Simplify by factoring, never by crossing out terms',
      p: ['A rational expression simplifies only when top and bottom share a **whole factor**.',
          '$\\dfrac{x^2-9}{x+3}$ factors to $\\dfrac{(x-3)(x+3)}{x+3}$, and the $(x+3)$ cancels to leave $x - 3$.',
          'But $x = -3$ is still excluded, because the original expression was undefined there.'],
      box: { k: 'warn', h: 'Factors cancel, terms do not', t: '$\\dfrac{x+2}{x}$ is <strong>not</strong> $2$. The $x$ on top is added, not multiplied, so nothing cancels. Factor first, then look.' } },
    { h: 'Multiplying and dividing',
      p: ['Multiplying is the easy one: factor everything, cancel across, and **multiply what is left**.',
          'Dividing is multiplying by the reciprocal, exactly as with numbers. Flip the second fraction and carry on.',
          'Cancel before you multiply out — expanding first creates large polynomials you then have to factor again.'],
      box: { k: 'key', h: 'Cancel early', t: 'Factoring first turns a page of algebra into two lines. <em>The temptation to expand is almost always the longer road.</em>' } },
    { h: 'Adding needs a common denominator',
      p: ['As with numbers, you cannot add until the bottoms match. Factor each denominator to find the **least common denominator**.',
          'For $\\dfrac{1}{x} + \\dfrac{1}{x+2}$ the LCD is $x(x+2)$, so the fractions become $\\dfrac{x+2}{x(x+2)}$ and $\\dfrac{x}{x(x+2)}$.',
          'Add the tops, leave the bottom, then factor the result to see whether anything cancels.'],
      box: { k: 'slow', h: 'Multiply the tops too', t: 'Rewriting $\\dfrac{1}{x}$ over $x(x+2)$ means multiplying top and bottom by $(x+2)$. <strong>Changing only the denominator changes the value.</strong>' } },
    { h: 'Solving: clear the fractions',
      p: ['An equation is different from an expression — here you may multiply **every term** by the LCD and be rid of the fractions entirely.',
          'That turns a rational equation into a polynomial one, which you already know how to solve.',
          'Then check each answer against the excluded values, because multiplying by the LCD can introduce a root that was forbidden all along.'],
      box: { k: 'warn', h: 'Expression or equation?', t: 'You may clear denominators only when there is an equals sign. In an expression, multiplying by the LCD changes what you were given.' } },
    { h: 'Asymptotes',
      p: ['An excluded value that does not cancel gives a **vertical asymptote** — the graph shoots off beside that line.',
          'For the far left and right, compare the degrees: equal degrees give a horizontal asymptote at the ratio of the leading coefficients.',
          'If the bottom has the higher degree, the graph settles on $y = 0$, because the denominator wins the race.'],
      box: { k: 'key', h: 'A hole, not an asymptote', t: 'If every copy of the denominator factor cancels and the reduced expression is defined at that value, the graph has a <em>hole</em>. If a denominator factor remains, there is still a vertical asymptote.' } }
  ],
  examples: [
    { t: 'Simplifying', q: 'Simplify $\\dfrac{x^2 - 4}{x^2 + 5x + 6}$ and state the excluded values.',
      steps: [
        { do: 'Factor both: $\\dfrac{(x-2)(x+2)}{(x+2)(x+3)}$.', why: 'Nothing can cancel until both are in factors.' },
        { do: 'Cancel $(x+2)$ to get $\\dfrac{x-2}{x+3}$.', why: 'A whole factor, top and bottom.' },
        { do: 'Excluded: $x = -2$ and $x = -3$.', why: 'Both came from the original denominator, and $-2$ stays excluded even though it cancelled.' }
      ], ans: '$\\dfrac{x-2}{x+3}$, $x \\ne -2, -3$' },
    { t: 'Adding', q: 'Simplify $\\dfrac{3}{x} + \\dfrac{2}{x+1}$.',
      steps: [
        { do: 'The LCD is $x(x+1)$.', why: 'The denominators share nothing, so the LCD is their product.' },
        { do: 'Rewrite: $\\dfrac{3(x+1)}{x(x+1)} + \\dfrac{2x}{x(x+1)}$.', why: 'Multiply each top by whatever its bottom was missing.' },
        { do: 'Add the tops: $\\dfrac{3x + 3 + 2x}{x(x+1)} = \\dfrac{5x+3}{x(x+1)}$.', why: 'The top does not factor, so this is finished.' }
      ], ans: '$\\dfrac{5x+3}{x(x+1)}$' },
    { t: 'The two taps', q: 'One tap fills a tub in $3$ hours, another in $6$. How long together?',
      steps: [
        { do: 'Rates add: $\\dfrac13 + \\dfrac16$ of a tub per hour.', why: 'Times do not add; rates do.' },
        { do: 'Common denominator $6$: $\\dfrac26 + \\dfrac16 = \\dfrac36 = \\dfrac12$.', why: 'Half a tub per hour.' },
        { do: 'Half a tub per hour means one tub in $2$ hours.', why: 'Under $3$, as it had to be.' }
      ], ans: '$2$ hours' }
  ],
  mistakes: [
    'Cancelling terms instead of factors. In $\\dfrac{x+2}{x}$ nothing cancels, because the $x$ on top is added rather than multiplied. Only a factor shared by the whole top and the whole bottom may go.',
    'Losing an excluded value after it cancels. $\\dfrac{x^2-9}{x+3}$ simplifies to $x-3$, but $x = -3$ is still forbidden — the original expression was undefined there, and simplifying does not undo that.',
    'Adding the denominators. $\\dfrac{1}{x} + \\dfrac{1}{x+2}$ is not $\\dfrac{2}{2x+2}$. Find a common denominator and add only the tops, exactly as with numbers.',
    'Clearing denominators in an expression. Multiplying by the LCD is allowed only across an equals sign. In an expression it changes the value you were asked to simplify.',
    'Averaging the times in a work problem. Two taps taking $3$ and $6$ hours do not average to $4.5$; together they must beat $3$. Add the rates, not the times.'
  ]
},
{
  id: 'logarithms', strand: 'algebra', fig: 'logLadder',
  title: 'Logarithms',
  big: 'A logarithm is the exponent — nothing more, and nothing less.',
  discover: [
    '**Keep doubling: 2, 4, 8, 16, 32, 64...**',
    'How many doublings does it take to pass a thousand? Nine gives $512$, ten gives $1024$.',
    { fig: 'discLogarithms' },
    'So the answer sits **between 9 and 10**. We know what the question is; we just have no symbol for the answer.',
    'Every equation so far has hunted for the base or the result. This one hunts for the exponent.',
    { punch: 'That answer is written $\\log_2 1000$. A logarithm is not a new operation — it is the name of the exponent you were already looking for.' }
  ],
  funfact: [
    'Napier published logarithms in 1614 to make multiplication easier. Turning multiplication into addition cut the labour of astronomy so sharply that it was said to double an astronomer’s life.',
    'The slide rule, which put people on the moon, is a logarithmic scale. Sliding two of them adds the logs, which multiplies the numbers.',
    'Earthquakes, sound and acidity are all measured on log scales, because each is easier to talk about in terms of "how many times bigger".'
  ],
  vocab: [
    ['Logarithm', '$\\log_b y$ is the exponent that turns $b$ into $y$.'],
    ['Common log', 'Base $10$, usually written $\\log$ with no base shown.'],
    ['Natural log', 'Base $e \\approx 2.718$, written $\\ln$.'],
    ['Change of base', '$\\log_b x = \\dfrac{\\log x}{\\log b}$, which is how a calculator handles any base.'],
    ['Argument', 'The thing inside the log. It must be strictly positive.']
  ],
  sections: [
    { h: 'The two forms are one fact',
      p: ['$2^5 = 32$ and $\\log_2 32 = 5$ say **exactly the same thing**, arranged differently.',
          'Reading it aloud helps: "log base two of thirty-two is five" means "two to the fifth is thirty-two".',
          'Every log problem can be turned into an exponent problem, and that is usually the way out.'],
      box: { k: 'key', h: 'The base stays the base', t: 'In both forms the little number is the base. <strong>The log is always the exponent</strong>, never the base and never the answer inside.' } },
    { h: 'The values you should know cold',
      p: ['$\\log_b 1 = 0$ for every valid real base $b>0$, $b \\neq 1$, because $b^0=1$.',
          '$\\log_b b = 1$, because one copy of the base gives the base. And $\\log_b b^k = k$.',
          'These are not rules to memorise separately — each is just the definition read back.'],
      box: { k: 'slow', h: 'Estimate before you calculate', t: '$\\log_2 100$ must lie between $6$ and $7$, since $2^6 = 64$ and $2^7 = 128$. <em>A quick bracket catches a calculator slip instantly.</em>' } },
    { h: 'The three laws for positive arguments, and where they come from',
      p: ['$\\log(MN) = \\log M + \\log N$. Multiplying the numbers **adds the exponents**, which is the exponent rule wearing a different hat.',
          '$\\log\\dfrac{M}{N} = \\log M - \\log N$, for the same reason with division.',
          '$\\log M^p = p \\log M$, because a power is repeated multiplication and so repeats the addition.'],
      box: { k: 'warn', h: 'There is no law for a sum', t: '$\\log(M + N)$ does <strong>not</strong> split up. Try $\\log_2(4+4) = 3$ against $\\log_2 4 + \\log_2 4 = 4$ — they disagree.' } },
    { h: 'Solving equations with the unknown upstairs',
      p: ['When $x$ is an exponent, take the log of both sides. The power law then **brings it down** to ground level.',
          '$3^x = 20$ becomes $x \\log 3 = \\log 20$, so $x = \\dfrac{\\log 20}{\\log 3} \\approx 2.73$.',
          'Any valid real base ($b>0$, $b \\neq 1$) works as long as you use the same one on both sides; base $10$ or $e$ are on the calculator.'],
      box: { k: 'key', h: 'Why this is the whole trick', t: 'The power law is the only tool that moves an exponent. <em>Every "solve for the exponent" problem uses it.</em>' } },
    { h: 'Logs of negatives do not exist',
      p: ['$\\log_b x$ asks what power of a positive base gives $x$. A positive base raised to **any** power stays positive.',
          'So the argument of a log must be strictly greater than zero — never zero, never negative.',
          'This matters when solving: an answer that makes any argument negative has to be discarded.'],
      box: { k: 'warn', h: 'Check the argument, not just the answer', t: 'Solving $\\log(x-3) = 1$ gives $x = 13$, which is fine. But a solution of $x = 1$ would make the inside $-2$, and must be thrown out.' } }
  ],
  examples: [
    { t: 'Reading a log', q: 'Evaluate $\\log_3 81$.',
      steps: [
        { do: 'The question is: three to what power gives $81$?', why: 'A log is the exponent.' },
        { do: '$3^4 = 81$.', why: 'Count up: $3, 9, 27, 81$.' },
        { do: 'So $\\log_3 81 = 4$.', why: 'No calculator needed once the question is read properly.' }
      ], ans: '$4$' },
    { t: 'Condensing', q: 'Write $2\\log x + \\log 3 - \\log y$ as a single logarithm.',
      steps: [
        { do: 'The $2$ becomes a power: $2 \\log x = \\log x^2$.', why: 'The power law, used backwards.' },
        { do: 'Addition becomes multiplication: $\\log x^2 + \\log 3 = \\log 3x^2$.', why: 'The product law.' },
        { do: 'Subtraction becomes division: $\\log \\dfrac{3x^2}{y}$.', why: 'The quotient law.' }
      ], ans: '$\\log \\dfrac{3x^2}{y}$' },
    { t: 'Unknown in the exponent', q: 'Solve $5^x = 90$, to two decimal places.',
      steps: [
        { do: 'Take $\\log$ of both sides: $\\log 5^x = \\log 90$.', why: 'The same operation on both sides keeps the equation true.' },
        { do: 'Bring the power down: $x \\log 5 = \\log 90$.', why: 'The power law is what frees the exponent.' },
        { do: 'So $x = \\dfrac{\\log 90}{\\log 5} \\approx 2.80$.', why: 'Check: $5^2 = 25$ and $5^3 = 125$, so a value near $2.8$ is right.' }
      ], ans: '$x \\approx 2.80$' }
  ],
  mistakes: [
    'Splitting the log of a sum. $\\log(M+N)$ is not $\\log M + \\log N$. Test it: $\\log_2(4+4) = 3$ but $\\log_2 4 + \\log_2 4 = 4$. Only products, quotients and powers have laws.',
    'Reading $\\dfrac{\\log 20}{\\log 3}$ as $\\log\\dfrac{20}{3}$. Division of two logs is not the log of a quotient — the first is about $2.73$, the second about $0.82$.',
    'Taking the log of a negative or zero. $\\log(x-3)$ needs $x > 3$, so any solution at or below $3$ must be discarded however good the algebra looked.',
    'Confusing the base with the answer. In $\\log_2 32 = 5$, the $2$ is the base and the $5$ is the exponent. Writing $\\log_{32} 2$ asks an entirely different question.',
    'Forgetting to apply the power law before solving. $3^x = 20$ does not give $x = \\dfrac{20}{3}$. Taking logs and bringing the exponent down is the only route.'
  ]
},
{
  id: 'expmodels', strand: 'algebra', fig: 'growthCurves',
  title: 'Exponential & Logarithmic Models',
  big: 'Growth and decay that depend on how much is already there, and the logs that solve them.',
  discover: [
    '**A cup of coffee left on the desk.**',
    'It starts at $80°$. After ten minutes it is $53°$; after twenty, $37°$; after thirty, $28°$.',
    { fig: 'discExpmodels' },
    'The drops are $27$, then $16$, then $9$ — **shrinking every time**, though the ten minutes never change.',
    'What stays steady is the share: each interval closes about $40\\%$ of the remaining gap to room temperature.',
    { punch: 'That is the signature of exponential change. Constant difference means a straight line; constant ratio means an exponential — and the two models make wildly different predictions.' }
  ],
  funfact: [
    'Carbon dating is exactly this. Carbon-14 has a half-life of $5730$ years, so measuring what is left dates the sample.',
    'Compound interest, virus spread, drug clearance and cooling coffee all share one equation, because all four grow or shrink in proportion to what is present.',
    'The number $e \\approx 2.718$ turns up wherever growth is continuous rather than in steps — it is what "compounding every instant" converges to.'
  ],
  vocab: [
    ['Growth factor', 'What you multiply by each period. Above $1$ is growth, between $0$ and $1$ is decay.'],
    ['Half-life', 'The time for a decaying quantity to fall to half.'],
    ['Doubling time', 'The time for a growing quantity to double.'],
    ['Initial value', 'The amount at time zero — the $a$ in $y = ab^t$.'],
    ['Continuous growth', 'Growth compounding at every instant, modelled with $A = Pe^{rt}$.']
  ],
  sections: [
    { h: 'Telling the two models apart',
      p: ['Look at what is constant between equal time steps. A constant **difference** means linear; a constant **ratio** means exponential.',
          'A table going $3, 6, 12, 24$ is exponential — each entry is double the last.',
          'A table going $3, 6, 9, 12$ is linear — each entry is three more than the last.'],
      box: { k: 'key', h: 'Divide, do not subtract', t: 'To test for exponential, divide each term by the one before. <strong>If you get the same number every time, you have your growth factor.</strong>' } },
    { h: 'Writing the model',
      p: ['The standard form is $y = ab^t$, where $a$ is the **starting amount** and $b$ is the factor per period.',
          'A $5\\%$ annual rise gives $b = 1.05$; a $5\\%$ fall gives $b = 0.95$. The $1$ carries the part you keep.',
          'A population of $200$ growing $8\\%$ a year is $y = 200(1.08)^t$.'],
      box: { k: 'warn', h: 'The rate is not the factor', t: 'A $30\\%$ decay has $b = 0.70$, not $0.30$. <strong>You keep $70\\%$ each period</strong>, and it is what you keep that gets multiplied.' } },
    { h: 'Half-life and doubling time',
      p: ['When the period is a half-life, the factor is $\\dfrac12$, so $y = a\\left(\\dfrac12\\right)^{t/h}$ with $h$ the half-life.',
          'Dividing $t$ by $h$ **counts the halvings** rather than the years, which is the only adjustment needed.',
          'Doubling works the same way with a factor of $2$ in place of a half.'],
      box: { k: 'key', h: 'Count the halvings first', t: 'For $22920$ years at a half-life of $5730$: that is four halvings, so $\\dfrac{1}{16}$ remains. <em>No logs needed when the number divides evenly.</em>' } },
    { h: 'When the unknown is the time',
      p: ['If you know the amount and want the time, the unknown sits in the exponent — so take logs of both sides.',
          'From $200(1.08)^t = 500$, divide first to get $1.08^t = 2.5$, then **bring $t$ down** with the power law.',
          '$t = \\dfrac{\\log 2.5}{\\log 1.08} \\approx 11.9$ years.'],
      box: { k: 'slow', h: 'Isolate the power first', t: 'Take logs only once the exponential term is alone. Taking logs of $200(1.08)^t$ while the $200$ is still attached makes unnecessary work.' } },
    { h: 'Reading a log scale',
      p: ['On a log scale, equal distances mean equal **multiples**, not equal differences.',
          'A magnitude $7$ earthquake releases about $32$ times the energy of a magnitude $6$, not $17\\%$ more.',
          'That is why log scales are used for things spanning huge ranges — sound, earthquakes, acidity, star brightness.'],
      box: { k: 'key', h: 'Each step multiplies', t: 'Going from pH $5$ to pH $3$ is two steps, so $100$ times more acidic. <em>Steps multiply; they never add.</em>' } }
  ],
  examples: [
    { t: 'Building the model', q: 'A town of $8000$ people grows $3\\%$ a year. Write the model and find the population after $10$ years.',
      steps: [
        { do: 'Initial value $a = 8000$; the factor is $1 + 0.03 = 1.03$.', why: 'The $1$ keeps the people already there.' },
        { do: 'So $P = 8000(1.03)^t$.', why: 'Standard form $ab^t$.' },
        { do: 'At $t = 10$: $8000(1.03)^{10} \\approx 8000(1.344) \\approx 10751$.', why: 'About a third more, not $30\\%$ — compounding adds a little extra.' }
      ], ans: 'about $10{,}751$' },
    { t: 'Half-life', q: 'A sample has $80$ g of an isotope with a half-life of $6$ days. How much remains after $24$ days?',
      steps: [
        { do: '$24 \\div 6 = 4$ half-lives.', why: 'Count the halvings rather than the days.' },
        { do: 'Each halving multiplies by $\\dfrac12$, so four gives $\\dfrac{1}{16}$.', why: 'Not $\\dfrac{4}{2}$ — the halvings compound.' },
        { do: '$80 \\times \\dfrac{1}{16} = 5$ g.', why: 'Halving $80$ four times: $40, 20, 10, 5$.' }
      ], ans: '$5$ g' },
    { t: 'Solving for the time', q: 'How long for $\\$1200$ at $6\\%$ compounded annually to reach $\\$2000$?',
      steps: [
        { do: '$1200(1.06)^t = 2000$, so $1.06^t = \\dfrac{2000}{1200} \\approx 1.667$.', why: 'Isolate the power before taking logs.' },
        { do: 'Take logs: $t \\log 1.06 = \\log 1.667$.', why: 'The power law brings $t$ down.' },
        { do: '$t = \\dfrac{\\log 1.667}{\\log 1.06} \\approx 8.8$ years.', why: 'Check: doubling at $6\\%$ takes about $12$ years, so under $9$ for a smaller rise is sensible.' }
      ], ans: 'about $8.8$ years' }
  ],
  mistakes: [
    'Using the rate as the growth factor. A $30\\%$ decline has factor $0.70$, not $0.30$, because $70\\%$ is what survives each period. Using $0.30$ models a $70\\%$ decline instead.',
    'Multiplying the half-life instead of counting halvings. Four half-lives leave $\\dfrac{1}{16}$, not $\\dfrac14$. Each halving acts on what the last one left, so they compound.',
    'Treating exponential growth as a fixed amount per year. $8\\%$ of $8000$ is $640$, but next year it is $8\\%$ of a bigger number. Adding $640$ every year is a straight line, and it drifts further off each year.',
    'Taking logs before isolating the power. In $200(1.08)^t = 500$, divide by $200$ first. Taking logs with the $200$ attached gives $\\log 200 + t\\log 1.08$, which is correct but needlessly messy.',
    'Reading a log scale additively. Magnitude $7$ is about $32$ times magnitude $6$, not one unit more of anything. On a log scale each step multiplies.'
  ]
},
{
  id: 'series', strand: 'algebra', fig: 'sequenceBlocks',
  title: 'Series & Sigma Notation',
  big: 'Adding a long list of terms without adding them one at a time.',
  discover: [
    '**Add every whole number from 1 to 100.**',
    'The story goes that a schoolmaster set this to keep a class quiet, and one boy answered in seconds.',
    { fig: 'discSeries' },
    'He paired the ends: $1 + 100 = 101$, $2 + 99 = 101$, $3 + 98 = 101$. **Every pair makes 101.**',
    'There are $50$ such pairs, so the total is $50 \\times 101 = 5050$. No adding required.',
    { punch: 'That trick is the formula for an arithmetic series: pair the ends, count the pairs. Every series formula in this unit is a shortcut of the same kind.' }
  ],
  funfact: [
    'The boy was Carl Friedrich Gauss, and he was about nine. He went on to be one of the greatest mathematicians who ever lived.',
    'The $\\Sigma$ symbol is a Greek capital sigma, for "sum". Euler introduced it in 1755 and it has not changed since.',
    'An infinite geometric series can have a finite total: $\\dfrac12 + \\dfrac14 + \\dfrac18 + \\cdots$ adds to exactly $1$, which is how Zeno’s paradox dissolves.'
  ],
  vocab: [
    ['Sequence', 'An ordered list of terms.'],
    ['Series', 'The sum of the terms of a sequence.'],
    ['Sigma notation', '$\\sum_{k=1}^{n} a_k$ — add $a_k$ for every $k$ from $1$ to $n$.'],
    ['Common difference', 'What is added each step in an arithmetic sequence.'],
    ['Common ratio', 'What is multiplied each step in a geometric sequence.']
  ],
  sections: [
    { h: 'Reading sigma notation',
      p: ['$\\sum_{k=1}^{4} (2k+1)$ says: let $k$ run from $1$ to $4$, work out $2k+1$ each time, and **add the results**.',
          'That gives $3 + 5 + 7 + 9 = 24$. The notation is an instruction, not a new operation.',
          'The letter underneath is just a counter — renaming it $j$ or $i$ changes nothing.'],
      box: { k: 'key', h: 'Read it as a loop', t: 'Bottom number is where the counter starts, top is where it stops, and the expression is what to add each pass.' } },
    { h: 'Arithmetic series: pair the ends',
      p: ['When each term adds the same amount, the first and last average out across the whole list.',
          'So $S_n = \\dfrac{n}{2}(a_1 + a_n)$ — **the number of terms, times the average of the ends**.',
          'For $1$ to $100$ that is $\\dfrac{100}{2}(1 + 100) = 5050$, exactly Gauss’s pairing.'],
      box: { k: 'slow', h: 'Count the terms carefully', t: 'From $7$ to $31$ in steps of $3$ there are $\\dfrac{31-7}{3} + 1 = 9$ terms. <strong>The $+1$ is the one people forget</strong> — both ends are included.' } },
    { h: 'Geometric series',
      p: ['When each term multiplies by the same ratio, the sum is $S_n = a_1 \\dfrac{1 - r^n}{1 - r}$.',
          'For $r=1$, use $S_n=na_1$ instead. For $r \\neq 1$, it comes from a neat cancellation: subtract $r$ times the series from the series, and **almost everything vanishes**.',
          'For $2 + 6 + 18 + 54$: $a_1 = 2$, $r = 3$, $n = 4$, giving $2\\dfrac{1-81}{1-3} = 80$.'],
      box: { k: 'key', h: 'Find r by dividing', t: 'Divide any term by the one before it. If you get the same number every time it is geometric; if not, check whether it is arithmetic instead.' } },
    { h: 'When an infinite series has a total',
      p: ['If $|r| < 1$ the terms shrink towards nothing, and the sum settles on $S = \\dfrac{a_1}{1 - r}$.',
          'That is why $\\dfrac12 + \\dfrac14 + \\dfrac18 + \\cdots$ comes to exactly $1$ — **it converges**.',
          'For a nonzero first term, if $|r| \\ge 1$ the partial sums do not converge. They may grow without bound or oscillate, as they do when $r=-1$.'],
      box: { k: 'warn', h: 'Check the ratio first', t: 'The infinite formula only applies when $|r| < 1$. <strong>Using it on $r = 2$ produces a confident, meaningless number</strong> — often a negative one.' } },
    { h: 'Repeating decimals are geometric series',
      p: ['$0.\\overline{7}$ means $0.7 + 0.07 + 0.007 + \\cdots$, a geometric series with $a_1 = 0.7$ and $r = 0.1$.',
          'The formula gives $\\dfrac{0.7}{1 - 0.1} = \\dfrac{0.7}{0.9} = \\dfrac{7}{9}$.',
          'So a repeating decimal is **exactly** a fraction, not approximately one.'],
      box: { k: 'key', h: 'Where the nines come from', t: 'The $9$ in $\\dfrac79$ is $1 - 0.1$ in disguise. Two repeating digits give $1 - 0.01$, and hence a denominator of $99$.' } }
  ],
  examples: [
    { t: 'Expanding sigma notation', q: 'Evaluate $\\sum_{k=1}^{5} (3k - 1)$.',
      steps: [
        { do: 'Run $k$ from $1$ to $5$: $2, 5, 8, 11, 14$.', why: 'Substitute each counter value in turn.' },
        { do: 'These go up by $3$, so it is arithmetic with $5$ terms.', why: 'A constant difference.' },
        { do: 'Sum $= \\dfrac{5}{2}(2 + 14) = \\dfrac{5}{2}(16) = 40$.', why: 'Number of terms times the average of the ends.' }
      ], ans: '$40$' },
    { t: 'A geometric sum', q: 'Find the sum of the first $6$ terms of $3, 6, 12, \\ldots$',
      steps: [
        { do: 'Divide to find $r$: $6 \\div 3 = 2$.', why: 'A constant ratio means geometric.' },
        { do: 'Apply $S_n = a_1\\dfrac{1-r^n}{1-r} = 3\\dfrac{1 - 64}{1 - 2}$.', why: '$r^6 = 2^6 = 64$.' },
        { do: '$= 3 \\cdot \\dfrac{-63}{-1} = 189$.', why: 'Check by listing: $3+6+12+24+48+96 = 189$.' }
      ], ans: '$189$' },
    { t: 'An infinite sum', q: 'Find the sum of $12 + 4 + \\dfrac43 + \\cdots$',
      steps: [
        { do: '$r = 4 \\div 12 = \\dfrac13$.', why: 'Divide consecutive terms.' },
        { do: '$|r| < 1$, so the series converges and $S = \\dfrac{a_1}{1-r}$.', why: 'Check the ratio before using the formula.' },
        { do: '$S = \\dfrac{12}{1 - \\frac13} = \\dfrac{12}{\\frac23} = 18$.', why: 'Dividing by $\\dfrac23$ is multiplying by $\\dfrac32$.' }
      ], ans: '$18$' }
  ],
  mistakes: [
    'Miscounting the terms. From $7$ to $31$ in steps of $3$ there are $9$ terms, not $8$: $\\dfrac{31-7}{3} = 8$ counts the gaps, and both endpoints are included so one more term exists than gaps.',
    'Using the infinite formula when $|r| \\ge 1$. For $r = 2$ the terms grow, so there is no total. The formula still returns a number, which is why the ratio must be checked first.',
    'Confusing the sequence with the series. The $n$th term is one number; the series is everything up to it added together. A question asking for "the $10$th term" does not want the sum.',
    'Mixing up the arithmetic and geometric formulas. Subtract consecutive terms to test for arithmetic, divide them to test for geometric — constant differences indicate arithmetic; constant ratios indicate geometric. If neither is constant, neither formula applies. Ratios cannot be taken through zero terms.',
    'Dropping the $a_1$ in the geometric sum. $\\dfrac{1-r^n}{1-r}$ is the sum only when the first term is $1$. For $3, 6, 12, \\ldots$ the whole fraction still has to be multiplied by $3$.'
  ]
},
{
  id: 'unitcircle', strand: 'trig', fig: 'unitCircleValues',
  title: 'Radians & the Unit Circle',
  big: 'Measure angles by the arc they cut, and trigonometry escapes the right triangle.',
  discover: [
    '**Take the radius of a circle and lay it along the rim.**',
    'Bend it round the edge, mark where it ends, and start again from there.',
    { fig: 'discUnitcircle' },
    'Six of them fit, and there is a **short piece left over** — about a quarter of another radius.',
    'That is true for every circle ever drawn. Big or small, it is always six and a bit.',
    { punch: 'The "six and a bit" is $2\\pi \\approx 6.28$. One radian is the angle whose arc equals the radius — an angle measured by the circle itself, not by a number somebody chose.' }
  ],
  funfact: [
    'The $360$ in a circle is Babylonian, picked because $360$ divides neatly and roughly matches the days in a year. There is nothing mathematical about it.',
    'Radians make calculus work. The derivative of $\\sin x$ is $\\cos x$ only in radians; in degrees an ugly constant appears and never leaves.',
    'Your calculator has both modes because both are in daily use — surveyors in degrees, physicists in radians.'
  ],
  vocab: [
    ['Radian', 'The angle whose arc length equals the radius. A full turn is $2\\pi$ radians.'],
    ['Unit circle', 'The circle of radius $1$ centred at the origin.'],
    ['Reference angle', 'The acute angle between the terminal side and the $x$-axis.'],
    ['Coterminal angles', 'Angles that finish in the same place, differing by whole turns.'],
    ['Terminal side', 'Where the rotating arm ends up after turning through the angle.']
  ],
  sections: [
    { h: 'Converting between degrees and radians',
      p: ['A half turn is $180°$ and also $\\pi$ radians, so **$\\pi$ radians $= 180°$** is the only fact you need.',
          'To go from degrees to radians, multiply by $\\dfrac{\\pi}{180}$. To come back, multiply by $\\dfrac{180}{\\pi}$.',
          'So $60° = 60 \\cdot \\dfrac{\\pi}{180} = \\dfrac{\\pi}{3}$, and $\\dfrac{3\\pi}{4} = 135°$.'],
      box: { k: 'key', h: 'Put pi where you want it', t: 'Multiplying by $\\dfrac{\\pi}{180}$ <em>brings $\\pi$ in</em>; by $\\dfrac{180}{\\pi}$ <em>takes it out</em>. Ask which one your answer should have.' } },
    { h: 'Coordinates are cosine and sine',
      p: ['On the unit circle, the point at angle $\\theta$ has coordinates $(\\cos\\theta, \\sin\\theta)$. That is the **definition**, not a coincidence.',
          'It agrees with the triangle version: the hypotenuse is $1$, so adjacent over hypotenuse is just the adjacent side.',
          'And it keeps working past $90°$, where no right triangle exists — which is the whole point of moving to the circle.'],
      box: { k: 'key', h: 'x is cos, y is sin', t: 'Alphabetical order in both: $x$ before $y$, cos before sin. <em>That is enough to remember it for good.</em>' } },
    { h: 'Signs by quadrant',
      p: ['The signs of $\\cos$ and $\\sin$ just follow the signs of $x$ and $y$ in each quadrant.',
          'Quadrant II has $x$ negative and $y$ positive, so **cosine is negative and sine is positive** there.',
          'Nothing needs memorising beyond the coordinate plane you have used for years.'],
      box: { k: 'slow', h: 'Sketch, do not recite', t: 'Draw the angle, see which quadrant it lands in, read off the signs of $x$ and $y$. <strong>A picture beats a mnemonic you might misremember.</strong>' } },
    { h: 'Reference angles',
      p: ['Every angle has a **reference angle**: the acute angle it makes with the $x$-axis.',
          '$150°$ has reference angle $30°$, so $\\sin 150° = \\sin 30° = \\dfrac12$, with the sign fixed by the quadrant.',
          'That is why knowing $30°$, $45°$ and $60°$ is enough to handle every special angle on the circle.'],
      box: { k: 'key', h: 'Size from the reference, sign from the quadrant', t: 'Two separate questions. Answer the size first, then attach the sign — mixing them is where errors come from.' } },
    { h: 'Arc length and coterminal angles',
      p: ['Arc length is beautifully simple in radians: $s = r\\theta$, with **no conversion factor at all**.',
          'That simplicity is the reason radians exist. In degrees the same formula needs $\\dfrac{\\pi}{180}$ bolted on.',
          'Adding $2\\pi$ to an angle lands you in the same place, so $\\dfrac{\\pi}{6}$ and $\\dfrac{13\\pi}{6}$ have identical trig values.'],
      box: { k: 'warn', h: 'The formula demands radians', t: 'Using $s = r\\theta$ with $\\theta$ in degrees gives an answer about $57$ times too large. <strong>Convert first, always.</strong>' } }
  ],
  examples: [
    { t: 'Degrees to radians', q: 'Convert $135°$ to radians.',
      steps: [
        { do: 'Multiply by $\\dfrac{\\pi}{180}$: $135 \\cdot \\dfrac{\\pi}{180}$.', why: 'This is the factor that brings $\\pi$ in.' },
        { do: 'Simplify $\\dfrac{135}{180} = \\dfrac34$.', why: 'Both divide by $45$.' },
        { do: 'So $135° = \\dfrac{3\\pi}{4}$.', why: 'Sensible: $135°$ is three quarters of $180°$.' }
      ], ans: '$\\dfrac{3\\pi}{4}$' },
    { t: 'A value past 90 degrees', q: 'Find $\\cos 210°$ exactly.',
      steps: [
        { do: '$210°$ is in quadrant III, $30°$ past $180°$.', why: 'The reference angle is $30°$.' },
        { do: '$\\cos 30° = \\dfrac{\\sqrt3}{2}$.', why: 'A special angle worth knowing.' },
        { do: 'In quadrant III, $x$ is negative, so $\\cos 210° = -\\dfrac{\\sqrt3}{2}$.', why: 'Size from the reference, sign from the quadrant.' }
      ], ans: '$-\\dfrac{\\sqrt3}{2}$' },
    { t: 'Arc length', q: 'A circle has radius $9$ cm. Find the arc cut by an angle of $\\dfrac{2\\pi}{3}$.',
      steps: [
        { do: 'The angle is already in radians, so $s = r\\theta$ applies directly.', why: 'No conversion needed.' },
        { do: '$s = 9 \\cdot \\dfrac{2\\pi}{3} = 6\\pi$ cm.', why: 'The $9$ and the $3$ cancel.' },
        { do: 'About $18.8$ cm.', why: 'A third of the way round a circle of circumference $18\\pi$ — consistent.' }
      ], ans: '$6\\pi$ cm' }
  ],
  mistakes: [
    'Converting the wrong way. To turn $60°$ into radians multiply by $\\dfrac{\\pi}{180}$, giving $\\dfrac{\\pi}{3}$. Using $\\dfrac{180}{\\pi}$ instead gives about $3438$, which is not an angle anybody meant.',
    'Using $s = r\\theta$ with degrees. The formula is built for radians, so an angle of $60$ gives an arc $57$ times too long. Convert before substituting.',
    'Getting the sign right but the size wrong, or the reverse. $\\sin 150°$ is $+\\dfrac12$: the reference angle $30°$ gives the size, and quadrant II gives the plus. Both questions must be answered separately.',
    'Swapping cosine and sine on the circle. The point is $(\\cos\\theta, \\sin\\theta)$ — $x$ first. Reading it the other way reflects every answer across the line $y = x$.',
    'Thinking a radian is a kind of degree. It is a pure ratio of arc to radius, which is why $\\pi$ appears without any units attached.'
  ]
},
{
  id: 'triggraphs', strand: 'trig', fig: 'sineCosineGraphs',
  title: 'Graphs of Sine & Cosine',
  big: 'Going round in circles, drawn flat, gives a wave — and four numbers describe any wave.',
  discover: [
    '**Ride a Ferris wheel and write down your height every few seconds.**',
    'You rise, level off at the top, come down, bottom out, and rise again. Then it repeats, exactly.',
    { fig: 'discTriggraphs' },
    'Plotting height against time gives a **wave that never ends**, because the wheel never stops going round.',
    'The circle and the wave are the same motion. One is drawn round, the other drawn flat.',
    { punch: 'That is what $y = \\sin x$ is. Anything that repeats — tides, daylight, sound, a heartbeat — is this curve, stretched and shifted to fit.' }
  ],
  funfact: [
    'Every sound you have ever heard is a sum of sine waves. Fourier proved in 1807 that any repeating signal can be built from them, and that result runs MP3s, JPEGs and mobile phones.',
    'Tide tables have been computed from sine waves since the 1870s, using brass machines that added the waves mechanically.',
    'Daylight hours through the year trace a sine wave too — which is why the days lengthen fastest around the equinoxes, not midsummer.'
  ],
  vocab: [
    ['Amplitude', 'Half the distance from the top to the bottom — how tall the wave is.'],
    ['Period', 'How long before the pattern repeats.'],
    ['Midline', 'The horizontal line halfway between the peaks and troughs.'],
    ['Phase shift', 'A horizontal slide — how far the wave has been moved sideways.'],
    ['Frequency', 'How many full cycles fit in a given interval. The reciprocal of the period.']
  ],
  sections: [
    { h: 'The two parent waves',
      p: ['$y = \\sin x$ starts at $0$, climbs to $1$ at $\\dfrac{\\pi}{2}$, returns to $0$ at $\\pi$, dips to $-1$, and closes at $2\\pi$.',
          '$y = \\cos x$ is **the same wave shifted a quarter turn**, starting at its peak instead of at zero.',
          'Both have amplitude $1$, period $2\\pi$ and midline $y = 0$ before anything is done to them.'],
      box: { k: 'key', h: 'Five points draw it', t: 'Start, quarter, half, three-quarter, end. <strong>Mark those five heights and the curve draws itself</strong> — plotting more points rarely helps.' } },
    { h: 'Amplitude and midline',
      p: ['In $y = a\\sin(bx) + d$, the $a$ sets the **amplitude** — the wave reaches $|a|$ above and below the midline.',
          'The $d$ lifts the whole wave, so the midline becomes $y = d$ rather than the $x$-axis.',
          'A negative $a$ flips the wave upside down without changing how tall it is.'],
      box: { k: 'slow', h: 'Getting them from a picture', t: 'Amplitude is $\\dfrac{\\text{max} - \\text{min}}{2}$ and midline is $\\dfrac{\\text{max} + \\text{min}}{2}$. <em>Half the difference, and half the sum.</em>' } },
    { h: 'Period: the number inside',
      p: ['The $b$ in $\\sin(bx)$ controls how fast the wave cycles, and the period becomes $\\dfrac{2\\pi}{b}$.',
          'Bigger $b$ means a **shorter** period, because the input races through its values faster.',
          '$y = \\sin(3x)$ fits three complete waves where $y = \\sin x$ fits one.'],
      box: { k: 'warn', h: 'b is not the period', t: 'In $\\sin(4x)$ the period is $\\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$, not $4$. <strong>The number inside divides into $2\\pi$</strong>; it is never the answer by itself.' } },
    { h: 'Phase shift',
      p: ['A horizontal slide comes from the bracket: $y = \\sin(x - c)$ moves the wave $c$ to the right.',
          'When there is also a $b$, factor it out first: $\\sin(2x - \\pi) = \\sin\\!\\big(2(x - \\tfrac{\\pi}{2})\\big)$, a shift of $\\dfrac{\\pi}{2}$.',
          'Without factoring you will read the shift as $\\pi$, which is **twice as far as it really goes**.'],
      box: { k: 'warn', h: 'Factor before reading the shift', t: 'The shift is whatever makes the bracket zero. In $2x - \\pi$ that is $x = \\dfrac{\\pi}{2}$, not $\\pi$.' } },
    { h: 'Modelling something real',
      p: ['For a Ferris wheel, the midline is the height of the centre and the amplitude is the radius.',
          'The period is the time for one full turn, and the phase shift says **where you boarded**.',
          'Cosine is often the easier choice when the motion starts at a maximum, since it begins there already.'],
      box: { k: 'key', h: 'Choose the wave that fits the start', t: 'Starting at the midline going up suits sine; starting at the top suits cosine. Either can model it, but one needs no shift.' } }
  ],
  examples: [
    { t: 'Reading a formula', q: 'Give the amplitude, period and midline of $y = 3\\sin(2x) - 1$.',
      steps: [
        { do: '$a = 3$, so the amplitude is $3$.', why: 'The number in front, ignoring sign.' },
        { do: '$b = 2$, so the period is $\\dfrac{2\\pi}{2} = \\pi$.', why: 'The inside number divides into $2\\pi$.' },
        { do: '$d = -1$, so the midline is $y = -1$.', why: 'The wave runs from $-4$ up to $2$.' }
      ], ans: 'Amplitude $3$, period $\\pi$, midline $y = -1$' },
    { t: 'Building from a picture', q: 'A wave peaks at $14$, bottoms at $4$, and repeats every $8$ units. Write a sine model with no phase shift.',
      steps: [
        { do: 'Amplitude $= \\dfrac{14-4}{2} = 5$; midline $= \\dfrac{14+4}{2} = 9$.', why: 'Half the difference, half the sum.' },
        { do: 'Period $8$ means $\\dfrac{2\\pi}{b} = 8$, so $b = \\dfrac{\\pi}{4}$.', why: 'Rearrange, do not just write $8$.' },
        { do: 'So $y = 5\\sin\\!\\left(\\dfrac{\\pi}{4}x\\right) + 9$.', why: 'Check: at $x = 2$ this gives $5 + 9 = 14$, the peak.' }
      ], ans: '$y = 5\\sin\\!\\left(\\dfrac{\\pi}{4}x\\right) + 9$' },
    { t: 'A Ferris wheel', q: 'A wheel of radius $20$ m has its centre $23$ m up and turns once every $4$ minutes. Write the height of a rider who boards at the bottom.',
      steps: [
        { do: 'Amplitude $20$, midline $23$.', why: 'Radius and centre height.' },
        { do: 'Period $4$ gives $b = \\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$.', why: 'Rearranged from period $= \\dfrac{2\\pi}{b}$.' },
        { do: 'Boarding at the bottom is a flipped cosine: $h = -20\\cos\\!\\left(\\dfrac{\\pi}{2}t\\right) + 23$.', why: 'At $t=0$ this gives $3$ m, the lowest point.' }
      ], ans: '$h = -20\\cos\\!\\left(\\dfrac{\\pi}{2}t\\right) + 23$' }
  ],
  mistakes: [
    'Reading the inside number as the period. In $y = \\sin(4x)$ the period is $\\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$. The $4$ counts how many waves fit in the old period, so a bigger $b$ makes a shorter wave, not a longer one.',
    'Taking the phase shift straight from the bracket. $\\sin(2x - \\pi)$ shifts by $\\dfrac{\\pi}{2}$, not $\\pi$ — the $b$ must be factored out first, or the shift comes out doubled.',
    'Mixing up amplitude and maximum. A wave with midline $9$ and amplitude $5$ peaks at $14$. The amplitude is measured from the midline, not from the $x$-axis.',
    'Forgetting that a negative $a$ only flips. $y = -3\\sin x$ has amplitude $3$, not $-3$. Amplitude is a distance, so it is never negative.',
    'Using degrees on a radian-scaled graph. If the axis is marked in $\\pi$s the calculator must be in radian mode, and a graph plotted in degree mode will look flat or wildly wrong.'
  ]
},
{
  id: 'trigid', strand: 'trig', fig: 'trigRatios',
  title: 'Trigonometric Identities & Equations',
  big: 'One identity comes straight from Pythagoras, and it unlocks nearly every trig equation.',
  discover: [
    '**Drop a right triangle inside the unit circle.**',
    'Its horizontal leg is $\\cos\\theta$, its vertical leg is $\\sin\\theta$, and the hypotenuse is the radius — which is $1$.',
    { fig: 'discTrigid' },
    'Pythagoras has something to say about **every** right triangle, and this one is no exception.',
    'So $(\\cos\\theta)^2 + (\\sin\\theta)^2 = 1^2$, whatever angle $\\theta$ happens to be.',
    { punch: 'That is the Pythagorean identity, $\\sin^2\\theta + \\cos^2\\theta = 1$. It is not a new fact — it is the oldest theorem in the book, read off a circle of radius one.' }
  ],
  funfact: [
    'The identity holds for every angle, including ones past $360°$ and negative ones, because the triangle argument is really about coordinates on a circle.',
    'Ptolemy was proving results equivalent to the addition formulas around 150 AD, to build tables of chords for astronomy.',
    'Sound engineers use these identities constantly: two tones played together beat against each other, and the formula for the beat is an identity rearranged.'
  ],
  vocab: [
    ['Identity', 'An equation true for every value of the variable, not just some.'],
    ['Pythagorean identity', '$\\sin^2\\theta + \\cos^2\\theta = 1$.'],
    ['Reciprocal identities', '$\\csc = \\dfrac{1}{\\sin}$, $\\sec = \\dfrac{1}{\\cos}$, $\\cot = \\dfrac{1}{\\tan}$.'],
    ['Quotient identity', '$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$.'],
    ['General solution', 'All the angles satisfying an equation, usually written with $+2\\pi n$ for the repeats.']
  ],
  sections: [
    { h: 'The identities worth knowing',
      p: ['The Pythagorean one, $\\sin^2\\theta + \\cos^2\\theta = 1$, is the one you will reach for most.',
          'The quotient identity $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$ lets you **turn tangents into sines and cosines**.',
          'Between them, almost any expression can be pushed into sines and cosines alone, where it is easier to handle.'],
      box: { k: 'key', h: 'When stuck, convert everything', t: 'Rewriting every term in sines and cosines is the standard opening move. <em>It rarely makes things worse and usually reveals the cancellation.</em>' } },
    { h: 'Proving an identity',
      p: ['Work on **one side only** and transform it until it matches the other. You are not solving an equation.',
          'Start with the messier side — there is more to simplify and more to work with.',
          'Common moves: convert to sines and cosines, find a common denominator, factor, or swap $1$ for $\\sin^2 + \\cos^2$.'],
      box: { k: 'warn', h: 'Do not move terms across', t: 'For a clear first proof, <strong>transform one side into the other</strong>. A chain of reversible equivalences can also prove an identity, but simply assuming the starting equality and manipulating it is not a proof.' } },
    { h: 'Solving a trig equation',
      p: ['Solve as you would any equation until you reach something like $\\sin\\theta = \\dfrac12$.',
          'Then use the reference angle to find the first solution, and the quadrants to find **the others in one turn**.',
          '$\\sin\\theta = \\dfrac12$ gives $\\theta = \\dfrac{\\pi}{6}$ and $\\dfrac{5\\pi}{6}$, because sine is positive in quadrants I and II.'],
      box: { k: 'warn', h: 'The calculator gives one answer', t: '$\\sin^{-1}(0.5)$ returns $30°$ and stops. <strong>The second solution is yours to find</strong>, and questions almost always want both.' } },
    { h: 'Infinitely many answers',
      p: ['Going round again lands on the same place, so every solution repeats every $2\\pi$.',
          'Write the general solution as $\\theta = \\dfrac{\\pi}{6} + 2\\pi n$ and $\\theta = \\dfrac{5\\pi}{6} + 2\\pi n$, with $n$ any integer.',
          'If the question restricts to $0 \\le \\theta < 2\\pi$, list only the solutions **inside that window**.'],
      box: { k: 'slow', h: 'Read the interval first', t: 'The interval given in the question decides how many answers to report. Checking it before you start saves listing solutions nobody wanted.' } },
    { h: 'Quadratic-looking equations',
      p: ['$2\\sin^2\\theta - \\sin\\theta - 1 = 0$ is a quadratic in disguise — let $s = \\sin\\theta$ and it becomes $2s^2 - s - 1 = 0$.',
          'Factor to $(2s+1)(s-1) = 0$, so $\\sin\\theta = -\\dfrac12$ or $\\sin\\theta = 1$.',
          'Then solve each piece separately. **Each value of the sine may give two angles**, so count carefully.'],
      box: { k: 'key', h: 'Substitute to see it', t: 'Writing $s$ for $\\sin\\theta$ makes the structure obvious and stops you trying to divide by $\\sin\\theta$ — which would lose solutions.' } }
  ],
  examples: [
    { t: 'Using the identity', q: 'If $\\sin\\theta = \\dfrac35$ and $\\theta$ is in quadrant II, find $\\cos\\theta$.',
      steps: [
        { do: '$\\sin^2\\theta + \\cos^2\\theta = 1$, so $\\cos^2\\theta = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$.', why: 'Substitute and rearrange.' },
        { do: 'So $\\cos\\theta = \\pm\\dfrac45$.', why: 'Squaring lost the sign, so both are still candidates.' },
        { do: 'Quadrant II has $x$ negative, so $\\cos\\theta = -\\dfrac45$.', why: 'The quadrant settles which one.' }
      ], ans: '$-\\dfrac45$' },
    { t: 'Proving one', q: 'Prove that $\\dfrac{\\sin\\theta}{\\cos\\theta} + \\dfrac{\\cos\\theta}{\\sin\\theta} = \\dfrac{1}{\\sin\\theta\\cos\\theta}$.',
      steps: [
        { do: 'Take the left side and use the common denominator $\\sin\\theta\\cos\\theta$.', why: 'Start with the messier side.' },
        { do: 'It becomes $\\dfrac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta\\cos\\theta}$.', why: 'Add the two fractions.' },
        { do: 'The top is $1$ by the Pythagorean identity, giving the right side.', why: 'One side transformed into the other — the proof is complete.' }
      ], ans: 'Proved' },
    { t: 'Solving in an interval', q: 'Solve $2\\cos\\theta + 1 = 0$ for $0 \\le \\theta < 2\\pi$.',
      steps: [
        { do: 'Rearrange: $\\cos\\theta = -\\dfrac12$.', why: 'Ordinary algebra first.' },
        { do: 'The reference angle is $\\dfrac{\\pi}{3}$, since $\\cos\\dfrac{\\pi}{3} = \\dfrac12$.', why: 'Size from the reference angle.' },
        { do: 'Cosine is negative in quadrants II and III: $\\theta = \\dfrac{2\\pi}{3}$ and $\\dfrac{4\\pi}{3}$.', why: 'Two answers inside one turn.' }
      ], ans: '$\\dfrac{2\\pi}{3}, \\dfrac{4\\pi}{3}$' }
  ],
  mistakes: [
    'Reporting only the calculator’s answer. $\\cos^{-1}(-0.5)$ gives $\\dfrac{2\\pi}{3}$ and stops, but $\\dfrac{4\\pi}{3}$ works too. Every trig equation has a second solution in the turn, and usually infinitely many beyond it.',
    'Dividing both sides by $\\sin\\theta$. In $\\sin\\theta\\cos\\theta = \\sin\\theta$, dividing throws away every solution where $\\sin\\theta = 0$. Factor instead and set each piece to zero.',
    'Losing the sign when taking a square root. $\\cos^2\\theta = \\dfrac{16}{25}$ gives $\\cos\\theta = \\pm\\dfrac45$, and only the quadrant decides which. Taking just the positive root silently assumes quadrant I.',
    'Working on both sides while proving an identity. Moving terms across assumes the result you are trying to establish. Transform one side alone until it looks like the other.',
    'Reading $\\sin^2\\theta$ as $\\sin(\\theta^2)$. The square applies to the whole sine value, so $\\sin^2 30° = (0.5)^2 = 0.25$, while $\\sin(900°) = 1$ — completely different quantities.'
  ]
},
{
  id: 'normaldist', strand: 'data', fig: 'normalCurve68',
  title: 'The Normal Distribution',
  big: 'Some measurements cluster in a bell-shaped pattern that a normal distribution can approximate.',
  discover: [
    '**Measure five hundred people and draw the histogram.**',
    'Most cluster near the middle. A few are unusually short, a few unusually tall, and the numbers thin out smoothly both ways.',
    { fig: 'discNormaldist' },
    'Now do it with shoe sizes, or birth weights, or the errors in five hundred careful measurements.',
    'Many such measurements have an **approximately bell-shaped** histogram. Others are skewed or have several peaks, so check the data before choosing a model.',
    { punch: 'That hill is the normal distribution. Once a normal model is appropriate, two numbers — the mean and standard deviation — describe that model.' }
  ],
  funfact: [
    'It is sometimes called the Gaussian, after Gauss, who met it while studying errors in astronomical measurements.',
    'The reason it keeps appearing has a name: the central limit theorem. Under suitable conditions, including finite variance and no dominating contribution, a standardised sum of many independent effects is approximately normal. Taking more observations does not make an arbitrary population normal.',
    'Heights within a comparable group can be approximately normal; incomes usually are not. Income has a long tail to the right, which is why the mean income is well above the median.'
  ],
  vocab: [
    ['Normal distribution', 'The symmetric bell-shaped distribution described by its mean and standard deviation.'],
    ['Standard deviation', 'The typical distance of a value from the mean — the natural ruler for spread.'],
    ['z-score', 'How many standard deviations a value sits from the mean: $z = \\dfrac{x - \\mu}{\\sigma}$.'],
    ['Empirical rule', 'About $68\\%$, $95\\%$ and $99.7\\%$ lie within one, two and three deviations.'],
    ['Percentile', 'The percentage of the population at or below a value.']
  ],
  sections: [
    { h: 'Two numbers describe the whole curve',
      p: ['The mean $\\mu$ says **where the hill sits**; the standard deviation $\\sigma$ says how wide it spreads.',
          'Change the mean and the curve slides. Change the deviation and it gets taller and narrower, or flatter and wider.',
          'Nothing else is needed, because the shape itself never varies.'],
      box: { k: 'key', h: 'It is a transformation again', t: 'Mean is the horizontal shift, deviation is the horizontal stretch. <em>The same two ideas from graphing, applied to a distribution.</em>' } },
    { h: 'The 68-95-99.7 rule',
      p: ['About $68\\%$ of the population lies within one standard deviation of the mean, on either side.',
          'About $95\\%$ lies within two, and about $99.7\\%$ within three. Beyond three is **genuinely rare**.',
          'These three numbers answer most questions without any table or calculator.'],
      box: { k: 'slow', h: 'Halve it for one side', t: 'If $95\\%$ is within two deviations, then $2.5\\%$ sits above and $2.5\\%$ below. <strong>The curve is symmetric, so split the leftover evenly.</strong>' } },
    { h: 'z-scores put everything on one ruler',
      p: ['A $z$-score reports distance from the mean **in standard deviations**, so different measurements become comparable.',
          '$z = \\dfrac{x - \\mu}{\\sigma}$. A score of $z = 1.5$ is one and a half deviations above average, whatever was being measured.',
          'That lets you compare a test score with a height, which raw numbers never could.'],
      box: { k: 'key', h: 'Sign tells you which side', t: 'A negative $z$ means below the mean. $z = -2$ is two deviations below, and about $2.5\\%$ of the population is further out that way.' } },
    { h: 'Working backwards from a percentage',
      p: ['Questions often run the other way: what score puts someone in the **top $16\\%$**?',
          'Top $16\\%$ means $84\\%$ below, which is one standard deviation above the mean, since $50\\% + 34\\% = 84\\%$.',
          'Convert back with $x = \\mu + z\\sigma$ to get the actual score.'],
      box: { k: 'slow', h: 'Draw the curve and shade', t: 'Sketching the bell and shading the region you want turns a confusing percentage into an obvious one. <em>Almost every error here is a sketch that was never drawn.</em>' } },
    { h: 'When the bell does not apply',
      p: ['Not everything is normal. Incomes, city sizes and word frequencies are all **skewed**, with a long tail one side.',
          'Using the empirical rule on skewed data gives confident answers that are simply wrong.',
          'A quick histogram is the check: if it is lopsided or has two humps, the normal model does not fit.'],
      box: { k: 'warn', h: 'Look before you model', t: 'The rule describes a symmetric bell. <strong>Applied to a long-tailed distribution it will badly understate how extreme the far values get.</strong>' } }
  ],
  examples: [
    { t: 'Using the empirical rule', q: 'Heights are normal with mean $170$ cm and deviation $8$ cm. What percent are between $162$ and $178$ cm?',
      steps: [
        { do: '$162$ is one deviation below; $178$ is one above.', why: '$170 \\pm 8$.' },
        { do: 'Within one deviation holds about $68\\%$.', why: 'Straight from the rule.' },
        { do: 'So about $68\\%$.', why: 'No calculation beyond recognising the interval.' }
      ], ans: 'about $68\\%$' },
    { t: 'A one-sided question', q: 'With the same heights, what percent are taller than $186$ cm?',
      steps: [
        { do: '$186 = 170 + 2(8)$, so $z = 2$.', why: 'Two deviations above the mean.' },
        { do: 'Within two deviations is $95\\%$, leaving $5\\%$ outside.', why: 'That $5\\%$ is split between the two tails.' },
        { do: 'Half of it is above: about $2.5\\%$.', why: 'Symmetry does the splitting.' }
      ], ans: 'about $2.5\\%$' },
    { t: 'Working backwards', q: 'Test scores are normal with mean $500$ and deviation $100$. What score is at the $84$th percentile?',
      steps: [
        { do: '$84\\%$ below means $50\\% + 34\\%$, which is one deviation above.', why: '$34\\%$ is half of the middle $68\\%$.' },
        { do: 'So $z = 1$.', why: 'Read off the empirical rule.' },
        { do: '$x = 500 + 1(100) = 600$.', why: 'Convert the $z$ back to a score.' }
      ], ans: '$600$' }
  ],
  mistakes: [
    'Forgetting to halve the tail. If $95\\%$ lies within two deviations, then $5\\%$ is outside — but that is split between both ends, so only $2.5\\%$ is above. Reporting $5\\%$ doubles the answer.',
    'Mixing up the $z$-score with the value. $z = 2$ is not a height of $2$ cm; it means two deviations above the mean, which for $\\mu = 170$, $\\sigma = 8$ is $186$ cm. Always convert back before answering.',
    'Applying the bell to skewed data. Incomes have a long right tail, so the empirical rule badly misjudges the top end. Check the histogram is roughly symmetric before using the model.',
    'Dropping the sign of $z$. A score of $z = -1.5$ is below the mean, and the percentage below it is about $7\\%$, not $93\\%$. The sign says which side you are on.',
    'Treating $68\\%$ as exact. It is a round figure for $68.27\\%$, fine for estimating but not for a question demanding three decimal places — those need a table or a calculator.'
  ]
},
{
  id: 'statinf', strand: 'data', fig: 'samplingDots',
  title: 'Sampling, Simulation & Inference',
  big: 'A well-chosen thousand can speak for millions, provided you admit how far off you might be.',
  discover: [
    '**A poll asks a thousand people and reports 52%.**',
    'There are millions of voters. Nobody asked them. Yet the number gets printed as though it were a fact.',
    { fig: 'discStatinf' },
    'Ask a different thousand and you would get a different answer — maybe $50\\%$, maybe $54\\%$. The number **moves**.',
    'So the honest report is not a number. It is a range, together with how confident you are that the truth is inside it.',
    { punch: 'That is inference: using a sample to say something about a population, and being explicit about the uncertainty. The margin of error is not an admission of failure — it is the point.' }
  ],
  funfact: [
    'The 1936 <em>Literary Digest</em> poll asked two million people and still got the election wrong, because it surveyed car and telephone owners. A huge biased sample is worse than a small fair one.',
    'Quadrupling the sample size only halves the margin of error, because the margin shrinks with the square root. That is why polls stop at about a thousand — beyond it, accuracy gets expensive fast.',
    'Simulation lets you answer questions with no formula at all: shuffle the data ten thousand times and count how often chance alone produces what you saw.'
  ],
  vocab: [
    ['Population', 'Everyone or everything you want to know about.'],
    ['Random sample', 'A sample where every member had an equal chance of being chosen.'],
    ['Bias', 'A flaw in how the sample was gathered that tilts the result in one direction.'],
    ['Margin of error', 'How far the sample result might sit from the truth.'],
    ['Confidence interval', 'The range formed by the estimate plus and minus the margin of error.']
  ],
  sections: [
    { h: 'Three kinds of study, three kinds of conclusion',
      p: ['A **survey** describes a population. It can tell you what people think, and nothing about why.',
          'An **observational study** watches without interfering, so it can find associations but never causes.',
          'Only a **randomised experiment**, where the treatment is assigned by chance, can establish cause.'],
      box: { k: 'warn', h: 'The claim must match the design', t: 'An observational study showing coffee drinkers live longer cannot say coffee helps. <strong>Something else may cause both</strong>, and only random assignment rules that out.' } },
    { h: 'Why random matters more than large',
      p: ['A well-conducted simple random sample avoids selection bias by design, and sampling error usually shrinks as the sample grows. Nonresponse and measurement errors can still introduce bias.',
          'A biased sample is wrong in a **fixed direction**, and collecting more of it makes the wrong answer more precise, not more true.',
          'Asking only people who answer a landline at noon tells you about that group, however many you ask.'],
      box: { k: 'key', h: 'Size cannot rescue bias', t: 'Two million biased responses beat nobody. <em>A thousand random ones beat two million biased ones.</em>' } },
    { h: 'The margin of error',
      p: ['For a proportion from a simple random sample, a rough conservative margin-of-error shortcut is $\\dfrac{1}{\\sqrt{n}}$ at $95\\%$ confidence.',
          'A thousand people gives about $\\dfrac{1}{\\sqrt{1000}} \\approx 3\\%$, which is why so many polls report exactly that.',
          'To halve the margin you need **four times** the people, because of the square root.'],
      box: { k: 'slow', h: 'What 95% confidence means', t: 'Not that there is a $95\\%$ chance the truth is in this interval. It means that <em>if you repeated the whole process many times, $95\\%$ of the intervals built this way would contain it</em>.' } },
    { h: 'Reading a result honestly',
      p: ['A poll at $52\\%$ with a $3\\%$ margin means the truth is plausibly anywhere from $49\\%$ to $55\\%$.',
          'Since that range includes $50\\%$, the poll does **not** establish a lead. "Too close to call" is the accurate phrase.',
          'Overlapping individual intervals alone do not decide whether two candidates differ. To compare them, analyse the difference directly, accounting for how the estimates are related.'],
      box: { k: 'key', h: 'Check whether the interval crosses the line', t: 'Whatever value would change the conclusion — $50\\%$ here — ask whether it is inside the interval. If it is, the data has not decided.' } },
    { h: 'Simulation instead of formulas',
      p: ['If a formula is out of reach, simulate: model the situation with coins, dice or a random number generator and run it many times.',
          'Choose the alternative first: unusually many heads is one-sided; unusually many heads or tails is two-sided. Count how often the assumed model produces a result at least that extreme. If that is **rare**, chance is a poor explanation.',
          'This is how a statistician decides whether a coin is loaded, or a treatment really worked.'],
      box: { k: 'key', h: 'What "rare" usually means', t: 'Under $5\\%$ is the common threshold. <em>It is a convention, not a law of nature</em>, and it is worth remembering that one result in twenty clears it by luck.' } }
  ],
  examples: [
    { t: 'Reading a poll', q: 'A poll of $1000$ reports $52\\%$ support with a margin of error of $3\\%$. Can the candidate claim a lead?',
      steps: [
        { do: 'The interval is $52 \\pm 3$, so $49\\%$ to $55\\%$.', why: 'Estimate plus and minus the margin.' },
        { do: 'That range includes $50\\%$.', why: '$50\\%$ is the value that decides a lead.' },
        { do: 'So the data does not establish a lead.', why: 'The true support could plausibly be below half.' }
      ], ans: 'No — the interval includes $50\\%$' },
    { t: 'How many to ask', q: 'A margin of error of about $3\\%$ needs roughly what sample size? What about $1.5\\%$?',
      steps: [
        { do: 'Margin $\\approx \\dfrac{1}{\\sqrt n}$, so $0.03 = \\dfrac{1}{\\sqrt n}$ gives $\\sqrt n \\approx 33$.', why: 'Rearrange for $\\sqrt n$.' },
        { do: 'So $n \\approx 1100$.', why: 'Square it.' },
        { do: 'Halving the margin needs four times the sample: about $4400$.', why: 'The square root is why it is four times, not two.' }
      ], ans: 'about $1100$, then about $4400$' },
    { t: 'Judging a claim', q: 'A coin lands heads $62$ times in $100$ flips. A simulation of fair coins gives $62$ or more heads in $1.0\\%$ of trials. What can you say?',
      steps: [
        { do: 'If the coin were fair, this result would show up about once in a hundred runs.', why: 'That is what the simulation measured.' },
        { do: '$1\\%$ is below the usual $5\\%$ threshold.', why: 'Rare enough to doubt the assumption.' },
        { do: 'So there is good evidence the coin is not fair.', why: 'Evidence, not proof — one run in a hundred does happen.' }
      ], ans: 'Good evidence the coin is biased' }
  ],
  mistakes: [
    'Thinking a big sample fixes bias. The 1936 <em>Literary Digest</em> poll asked two million people and still called the election wrong, because it only reached car and phone owners. Randomness matters more than size.',
    'Claiming cause from an observational study. Finding that coffee drinkers live longer does not mean coffee helps — something else may cause both. Only random assignment of the treatment supports a causal claim.',
    'Reporting the estimate without the margin. "$52\\%$ support" sounds decisive; "$49\\%$ to $55\\%$" shows the race is open. The margin is part of the result, not a footnote.',
    'Reading $95\\%$ confidence as a probability about this interval. It describes the method: repeat the process many times and $95\\%$ of the intervals would capture the truth. This particular one either does or does not.',
    'Using interval overlap as a universal significance test. If one candidate is $49$–$55\\%$ and the other $45$–$51\\%$, overlap alone does not settle whether they differ. Test the difference itself; estimates from the same poll are related.'
  ]
},
{
  id: 'invtrig', strand: 'trig', fig: 'invtrigRange',
  title: 'Inverse Trigonometric Functions',
  big: 'Sine repeats forever, so its inverse has to be told which answer to give back.',
  discover: [
    '**Ask for the angle whose sine is $0.5$.**',
    '$30°$ works. So does $150°$. So does $390°$, and $510°$, and on it goes.',
    { fig: 'discInvtrig' },
    'The wave crosses that height **again and again**, so the question has infinitely many right answers.',
    'A function is only allowed to return one. So mathematicians made a choice and wrote it down.',
    { punch: 'Cut the domain until each height is reached exactly once, and the inverse becomes a function. That restriction is not a technicality — it is the whole reason $\\sin^{-1}$ exists.' }
  ],
  funfact: [
    'The notation $\\sin^{-1}$ is unfortunate and everyone knows it. Many textbooks now prefer $\\arcsin$, which cannot be mistaken for a reciprocal.',
    '"Arc" is literal: on the unit circle the answer <em>is</em> the arc length, because radius one makes arc and angle the same number.',
    'Your calculator has already made the restriction for you. That is why $\\sin^{-1}$ never returns an obtuse angle, however much the problem wants one.'
  ],
  vocab: [
    ['Arcsine', 'The inverse of sine, restricted to outputs from $-90°$ to $90°$.'],
    ['Arccosine', 'The inverse of cosine, restricted to outputs from $0°$ to $180°$.'],
    ['Arctangent', 'The inverse of tangent, restricted to outputs strictly between $-90°$ and $90°$.'],
    ['Principal value', 'The single answer the restricted inverse returns.'],
    ['Restricted domain', 'The stretch of the original function kept so that it is one-to-one.']
  ],
  sections: [
    { h: 'Why a restriction is needed at all',
      p: ['A function has an inverse only if it is **one-to-one**, and sine fails that badly — it hits every height in its range infinitely often.',
          'So before inverting, keep just enough of the curve: one rise from bottom to top, and throw the rest away.',
          'For sine that stretch is $-90°$ to $90°$, where the curve climbs steadily from $-1$ to $1$ without repeating.'],
      box: { k: 'key', h: 'One rise is enough', t: 'Any stretch covering the full range exactly once would do. <strong>These particular choices are conventions</strong>, agreed so that everybody’s calculator gives the same answer.' } },
    { h: 'The three ranges, and why they differ',
      p: ['$\\arcsin$ returns $-90°$ to $90°$ — quadrants **IV and I**, where sine sweeps its whole range once.',
          '$\\arccos$ returns $0°$ to $180°$ — quadrants **I and II**. Cosine is falling there, again covering everything once.',
          '$\\arctan$ returns strictly between $-90°$ and $90°$, since tangent runs from $-\\infty$ to $\\infty$ across that stretch.'],
      box: { k: 'slow', h: 'Cosine is the odd one out', t: 'Sine and tangent both return angles around zero; cosine returns angles in the upper half. <em>Forgetting that is the most common source of a wrong quadrant.</em>' } },
    { h: 'Reading a calculator answer honestly',
      p: ['$\\sin^{-1}(0.5)$ gives $30°$ and stops. It is not wrong — it is answering the **restricted** question.',
          'If the problem wants an obtuse angle, you must find it yourself: $180° - 30° = 150°$.',
          'So treat the calculator output as the reference angle, then place it in the quadrant the problem demands.'],
      box: { k: 'warn', h: 'The calculator cannot know your triangle', t: 'In an obtuse triangle the sine rule can give $\\sin A = 0.5$ with $A = 150°$. <strong>The machine will still say $30°$</strong>, and only you know which one the picture needs.' } },
    { h: 'Composing a function with its inverse',
      p: ['$\\sin(\\arcsin x) = x$ for any $x$ in $[-1, 1]$ — the inner one picks an angle, the outer one undoes it.',
          'The other order is **not** always so tidy: $\\arcsin(\\sin 150°) = 30°$, not $150°$.',
          'That is the restriction showing its hand. The answer comes back in the allowed range, whatever went in.'],
      box: { k: 'key', h: 'One direction always works', t: 'Going out and back through the inverse is safe. <em>Going in and back out lands you in the principal range</em>, which may not be where you started.' } },
    { h: 'Exact values worth knowing',
      p: ['$\\arcsin\\dfrac12 = 30°$, $\\arcsin\\dfrac{\\sqrt2}{2} = 45°$, $\\arcsin\\dfrac{\\sqrt3}{2} = 60°$ — the same special angles, read backwards.',
          '$\\arccos\\left(-\\dfrac12\\right) = 120°$, because cosine is negative in the **upper-left** part of its range.',
          'Sketching the unit circle and marking the allowed arc settles every one of these without memorising a table.'],
      box: { k: 'slow', h: 'Draw the arc first', t: 'Shade the range the inverse is allowed to return, then find the point at the right height. The answer has to lie in the shaded part.' } }
  ],
  examples: [
    { t: 'A principal value', q: 'Find $\\arccos\\left(-\\dfrac12\\right)$ in degrees.',
      steps: [
        { do: 'The reference angle has $\\cos = \\dfrac12$, which is $60°$.', why: 'Size first.' },
        { do: 'Arccosine must return something between $0°$ and $180°$, and cosine is negative in quadrant II.', why: 'The restriction decides the quadrant.' },
        { do: 'So the answer is $180° - 60° = 120°$.', why: 'Inside the allowed range, as it must be.' }
      ], ans: '$120°$' },
    { t: 'When the calculator is not enough', q: 'In a triangle, $\\sin A = 0.6$ and $A$ is known to be obtuse. Find $A$ to the nearest degree.',
      steps: [
        { do: '$\\sin^{-1}(0.6) \\approx 37°$.', why: 'The calculator returns the principal value.' },
        { do: 'That is acute, but the problem says $A$ is obtuse.', why: 'Use $37°$ as the reference angle.' },
        { do: '$A = 180° - 37° = 143°$.', why: 'Check: $\\sin 143° \\approx 0.6$, so both fit the equation.' }
      ], ans: '$143°$' },
    { t: 'A composition', q: 'Evaluate $\\arcsin(\\sin 200°)$.',
      steps: [
        { do: '$200°$ is in quadrant III, with reference angle $20°$, so $\\sin 200° = -\\sin 20°$.', why: 'Sine is negative there.' },
        { do: '$\\arcsin$ must return an angle between $-90°$ and $90°$.', why: 'The restriction applies to the output.' },
        { do: 'The angle in that range with that sine is $-20°$.', why: 'Not $200°$ — the function cannot return what it is not allowed to.' }
      ], ans: '$-20°$' }
  ],
  mistakes: [
    'Reading $\\sin^{-1}x$ as $\\dfrac{1}{\\sin x}$. The first is an angle, the second is a number: $\\sin^{-1}(0.5) = 30°$ while $\\dfrac{1}{\\sin 0.5}$ is about $2.09$. The $-1$ marks an inverse function, not a reciprocal.',
    'Accepting the calculator’s answer when the problem needs the other one. $\\sin^{-1}(0.6)$ gives $37°$, but an obtuse angle with the same sine is $143°$. The machine returns the principal value and knows nothing about your triangle.',
    'Using the arcsine range for arccosine. Arcsine returns $-90°$ to $90°$; arccosine returns $0°$ to $180°$. A negative arccosine answer is always wrong.',
    'Assuming $\\arcsin(\\sin\\theta) = \\theta$. It holds only when $\\theta$ is already inside the restricted range — $\\arcsin(\\sin 150°)$ is $30°$, not $150°$.',
    'Taking an arcsine of something outside $[-1, 1]$. Sine never exceeds $1$, so $\\arcsin(2)$ has no answer, and a calculator returning an error there is correct.'
  ]
},
{
  id: 'trigadv', strand: 'trig', fig: 'obliqueTriangle',
  title: 'The Law of Sines & Cosines',
  big: 'Two rules extend trigonometry to every triangle, not just the right-angled ones.',
  discover: [
    '**Two surveyors stand at either end of a lake and sight the same tree.**',
    'They can measure the distance between themselves, and the angle each one turns through. That is all.',
    { fig: 'discTrigadv' },
    'There is **no right angle anywhere** in that triangle, so SOH-CAH-TOA has nothing to grip.',
    'Yet the triangle is completely pinned down — two angles and a side leave no freedom at all.',
    { punch: 'If the shape is determined, some rule must recover the rest. The law of sines is that rule, and it works on every triangle there is.' }
  ],
  funfact: [
    'This is how every map was made before satellites. Surveyors walked a baseline, measured angles to distant landmarks, and triangulated outward across whole countries.',
    'The Great Trigonometrical Survey of India ran for seventy years on these two rules, and measured the height of Everest to within a few metres.',
    'The law of cosines contains Pythagoras. Put $C = 90°$ and $\\cos C = 0$, and $c^2 = a^2 + b^2 - 2ab\\cos C$ collapses to the familiar form.'
  ],
  vocab: [
    ['Oblique triangle', 'Any triangle with no right angle.'],
    ['Law of sines', '$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$.'],
    ['Law of cosines', '$c^2 = a^2 + b^2 - 2ab\\cos C$.'],
    ['Included angle', 'The angle between two given sides.'],
    ['Ambiguous case', 'Two sides and a non-included angle, which can describe two different triangles.']
  ],
  sections: [
    { h: 'Labelling comes first',
      p: ['Name the angles $A$, $B$, $C$ and give each opposite side the **matching lower-case letter**.',
          'Side $a$ faces angle $A$. Every formula in this unit depends on that pairing being right.',
          'Mislabelling is the single biggest source of wrong answers here, and it happens before any calculating starts.'],
      box: { k: 'warn', h: 'Label the picture, not the formula', t: 'Write the letters onto the diagram before you reach for a rule. <strong>A side paired with the wrong angle gives a confident, wrong answer.</strong>' } },
    { h: 'The law of sines: when a side and its angle come as a pair', fig: 'lawSinesPair',
      p: ['$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$ holds in every triangle, so **one complete pair unlocks the rest**.',
          'Use it when you know an angle and the side opposite it, plus one more piece.',
          'That covers two angles and any side, or two sides and a non-included angle.'],
      box: { k: 'key', h: 'Look for a matching pair', t: 'If you can see a side and the angle facing it, the law of sines applies. <em>If you cannot, you need the law of cosines instead.</em>' } },
    { h: 'The law of cosines: when no pair is available', fig: 'lawCosinesNoPair',
      p: ['$c^2 = a^2 + b^2 - 2ab\\cos C$ is Pythagoras with a **correction term** for the angle not being square.',
          'Use it with two sides and the included angle, or with all three sides and no angles.',
          'When $C$ is obtuse, $\\cos C$ is negative and the correction adds, making $c$ longer — exactly as the picture suggests.'],
      box: { k: 'key', h: 'The term that does the work', t: 'At $C = 90°$ the correction vanishes and you are back to $a^2 + b^2$. <strong>The whole law is Pythagoras plus a lean.</strong>' } },
    { h: 'Choosing between them',
      p: ['Two angles and a side, or a matching side-angle pair: **law of sines**.',
          'Two sides with the angle between them, or three sides: **law of cosines**.',
          'Start with the law of cosines when it applies, then finish with the law of sines, which is less arithmetic.'],
      box: { k: 'slow', h: 'Find the largest angle first', t: 'After the law of cosines, use the sine rule on a <em>smaller</em> angle. That avoids the ambiguity, since only one angle in a triangle can be obtuse.' } },
    { h: 'The ambiguous case',
      p: ['Given two sides and an angle **not** between them, two different triangles can sometimes fit the same measurements.',
          'The reason is the one from the previous unit: $\\sin 30°$ and $\\sin 150°$ are equal, so the sine rule cannot tell them apart.',
          'Always check whether the obtuse option still leaves the angles under $180°$. If it does, both triangles are real.'],
      box: { k: 'warn', h: 'Check the second answer', t: 'If the sine rule gives $B = 40°$, also test $B = 140°$. <strong>If $A + 140°$ is still under $180°$, there are two valid triangles</strong> and the problem has two answers.' } }
  ],
  examples: [
    { t: 'Law of sines', q: 'In triangle $ABC$, $A = 40°$, $B = 75°$ and $a = 12$. Find $b$ to one decimal place.',
      steps: [
        { do: '$a$ and $A$ are a matching pair, so the law of sines applies.', why: 'A side with its opposite angle.' },
        { do: '$\\dfrac{b}{\\sin 75°} = \\dfrac{12}{\\sin 40°}$.', why: 'Set the two ratios equal.' },
        { do: '$b = \\dfrac{12 \\sin 75°}{\\sin 40°} \\approx \\dfrac{11.59}{0.643} \\approx 18.0$.', why: 'Larger than $a$, as it should be — $B$ is the bigger angle.' }
      ], ans: '$b \\approx 18.0$' },
    { t: 'Law of cosines', q: 'A triangle has sides $8$ and $11$ with an included angle of $37°$. Find the third side to one decimal place.',
      steps: [
        { do: 'No side-angle pair is available, so use the law of cosines.', why: 'Two sides and the angle between them.' },
        { do: '$c^2 = 8^2 + 11^2 - 2(8)(11)\\cos 37°= 64 + 121 - 176(0.7986)$.', why: 'Substitute directly.' },
        { do: '$c^2 \\approx 185 - 140.6 = 44.4$, so $c \\approx 6.7$.', why: 'Shorter than both sides, which a narrow included angle should give.' }
      ], ans: '$c \\approx 6.7$' },
    { t: 'Finding an angle from three sides', q: 'A triangle has sides $5$, $7$ and $9$. Find the largest angle to the nearest degree.',
      steps: [
        { do: 'The largest angle faces the longest side, so it is opposite $9$.', why: 'Biggest side, biggest angle.' },
        { do: '$81 = 25 + 49 - 2(5)(7)\\cos C$, so $81 = 74 - 70\\cos C$.', why: 'Rearranged law of cosines.' },
        { do: '$\\cos C = -\\dfrac{7}{70} = -0.1$, giving $C \\approx 96°$.', why: 'Negative cosine means obtuse — consistent with $81 > 25 + 49$.' }
      ], ans: '$96°$' }
  ],
  mistakes: [
    'Pairing a side with the wrong angle. Side $a$ must face angle $A$. Using $\\dfrac{a}{\\sin B}$ produces an answer that looks reasonable and is not, so label the diagram before calculating.',
    'Reaching for the law of sines with two sides and the included angle. There is no complete side-angle pair there, so the sine rule cannot start. That case needs the law of cosines.',
    'Missing the second triangle in the ambiguous case. If $\\sin B = 0.64$ gives $B = 40°$, then $B = 140°$ may also fit. Check whether the angles still total under $180°$ before discarding it.',
    'Dropping the minus sign in the law of cosines. It is $a^2 + b^2 - 2ab\\cos C$, and the subtraction is what makes a narrow angle give a short third side.',
    'Trusting Pythagoras on a triangle with no right angle. $5$, $7$ and $9$ do not satisfy $a^2+b^2=c^2$, and using it anyway gives a length that no triangle has.'
  ]
},
{
  id: 'polar', strand: 'trig', fig: 'polarGrid',
  title: 'Polar Coordinates',
  big: 'Distance and direction describe a point just as well as across and up.',
  discover: [
    '**Two ways to send someone to the same doorstep.**',
    'One: go three blocks east, then two blocks north. That is the street grid, and it is what $(3, 2)$ means.',
    { fig: 'discPolar' },
    'Two: face $34°$ north of east and walk $3.6$ blocks. **Same doorstep**, no turns.',
    'Air traffic control uses the second kind. So does radar, and so does anything that spins.',
    { punch: 'Both are honest addresses for one point. Which you choose is a matter of what the problem is shaped like — and circles are far easier in the second.' }
  ],
  funfact: [
    'A rose curve like $r = \\cos(3\\theta)$ takes one line to write in polar form and is a nightmare in $x$ and $y$.',
    'Newton was using polar coordinates by the 1670s to describe planetary orbits, where distance from the sun is the natural variable.',
    'Every complex number has a polar form too, and multiplying in that form just adds the angles — which is why polar coordinates run so much of engineering.'
  ],
  vocab: [
    ['Polar coordinates', 'A point given as $(r, \\theta)$: distance from the origin, and direction.'],
    ['Pole', 'The origin, where $r = 0$.'],
    ['Polar axis', 'The ray pointing along positive $x$, from which $\\theta$ is measured.'],
    ['Rectangular form', 'The ordinary $(x, y)$ description.'],
    ['Modulus', 'The distance $r$, also written $|z|$ for a complex number.']
  ],
  sections: [
    { h: 'Converting polar to rectangular',
      p: ['Drop a right triangle from the point to the horizontal axis and the conversion **writes itself**.',
          '$x = r\\cos\\theta$ and $y = r\\sin\\theta$. That is all there is to it.',
          'For $(4, 60°)$: $x = 4\\cos 60° = 2$ and $y = 4\\sin 60° = 2\\sqrt3$.'],
      box: { k: 'key', h: 'It is the unit circle, scaled', t: 'On the unit circle a point is $(\\cos\\theta, \\sin\\theta)$. <em>At distance $r$ it is that, multiplied by $r$.</em>' } },
    { h: 'Converting rectangular to polar',
      p: ['$r = \\sqrt{x^2+y^2}$ by Pythagoras, and $\\tan\\theta = \\dfrac{y}{x}$ from the same triangle.',
          'But $\\arctan$ only returns angles between $-90°$ and $90°$, so it **cannot see** quadrants II and III.',
          'Sketch the point first, then adjust: if it lies left of the axis, add $180°$ to what the calculator said.'],
      box: { k: 'warn', h: 'Arctangent loses half the plane', t: 'Both $(3, 4)$ and $(-3, -4)$ give $\\tan\\theta = \\dfrac43$. <strong>Only the sketch tells you which one you have.</strong>' } },
    { h: 'One point, many addresses',
      p: ['Adding a full turn changes nothing, so $(3, 40°)$ and $(3, 400°)$ are the **same point**.',
          'A negative $r$ means walk backwards, so $(-3, 40°)$ is the same as $(3, 220°)$.',
          'Rectangular coordinates have no such freedom, which is one thing they are better at.'],
      box: { k: 'slow', h: 'Unique going one way only', t: 'Every polar pair names one point, but every point has endless polar names. <em>That is fine until you try to solve equations, where it needs care.</em>' } },
    { h: 'Equations that polar form makes easy',
      p: ['$r = 5$ is a circle of radius $5$. In rectangular form that needs $x^2 + y^2 = 25$ and a square root to graph.',
          '$\\theta = 30°$ is a straight line through the origin, and **no arithmetic at all**.',
          'Anything built around a centre — circles, spirals, petals — is simpler in polar form.'],
      box: { k: 'key', h: 'Match the coordinates to the shape', t: 'Grids suit straight lines and rectangles. <em>Rings and spokes suit circles and rotation.</em> Neither is more correct.' } },
    { h: 'Complex numbers in polar form',
      p: ['A complex number $a + bi$ is a point, so it has a polar form too: $r(\\cos\\theta + i\\sin\\theta)$.',
          'Here $r = |z|$ is the distance from the origin and $\\theta$ is called the argument.',
          'Multiplying two complex numbers **multiplies the distances and adds the angles**, which is far tidier than expanding brackets.'],
      box: { k: 'key', h: 'Why engineers live here', t: 'Repeated multiplication becomes repeated rotation. Raising to a power is then one multiplication of angles, not $n$ expansions.' } }
  ],
  examples: [
    { t: 'Polar to rectangular', q: 'Convert $(6, 150°)$ to rectangular form, exactly.',
      steps: [
        { do: '$x = 6\\cos 150°$. The reference angle is $30°$ and quadrant II makes cosine negative.', why: 'Size then sign.' },
        { do: '$x = 6\\left(-\\dfrac{\\sqrt3}{2}\\right) = -3\\sqrt3$.', why: 'Left of the axis, as quadrant II requires.' },
        { do: '$y = 6\\sin 150° = 6\\left(\\dfrac12\\right) = 3$.', why: 'Sine is positive in quadrant II.' }
      ], ans: '$(-3\\sqrt3, 3)$' },
    { t: 'Rectangular to polar', q: 'Convert $(-4, 4)$ to polar form with $0° \\le \\theta < 360°$.',
      steps: [
        { do: '$r = \\sqrt{16+16} = \\sqrt{32} = 4\\sqrt2$.', why: 'Pythagoras on the components.' },
        { do: '$\\tan\\theta = \\dfrac{4}{-4} = -1$, and the calculator returns $-45°$.', why: 'Arctangent cannot see quadrant II.' },
        { do: 'The point is up and to the left, so add $180°$: $\\theta = 135°$.', why: 'The sketch settles it.' }
      ], ans: '$(4\\sqrt2, 135°)$' },
    { t: 'Recognising a polar equation', q: 'Describe the graph of $r = 4$.',
      steps: [
        { do: 'Every point on it is exactly $4$ from the origin.', why: '$r$ is the distance.' },
        { do: 'The angle is unrestricted, so all directions are included.', why: 'No condition on $\\theta$.' },
        { do: 'That is a circle of radius $4$ centred at the origin.', why: 'In rectangular form, $x^2 + y^2 = 16$.' }
      ], ans: 'A circle of radius $4$ at the origin' }
  ],
  mistakes: [
    'Trusting arctangent for the quadrant. Both $(3,4)$ and $(-3,-4)$ give $\\tan\\theta = \\dfrac43$, and the calculator returns the same angle for both. Sketch the point and add $180°$ when it lies left of the $y$-axis.',
    'Swapping sine and cosine in the conversion. It is $x = r\\cos\\theta$ and $y = r\\sin\\theta$ — $x$ goes with cosine, alphabetically in both. Swapping them reflects every point across $y = x$.',
    'Treating the polar name of a point as unique. $(3, 40°)$, $(3, 400°)$ and $(-3, 220°)$ are all the same point, which matters when checking whether a solution has already been found.',
    'Forgetting that $r$ can be negative. A negative $r$ means measuring backwards along the ray, landing the point in the opposite direction.',
    'Converting an equation term by term. $r = 2\\cos\\theta$ is a circle, not a cosine wave. Multiply through by $r$ first to get $x^2+y^2 = 2x$, which is recognisable.'
  ]
},
{
  id: 'vectors', strand: 'geometry', fig: 'vectorOps',
  title: 'Vectors',
  big: 'Some quantities need a direction as well as a size, and they do not add like numbers.',
  discover: [
    '**A plane points due north and flies at 300 mph.**',
    'There is a 50 mph wind from the west. The pilot has not turned; the nose is still pointing north.',
    { fig: 'discVectors' },
    'The plane still ends up **east of where it aimed**, because the air it is flying through is moving too.',
    'Its real speed is not $350$, and not $300$ either. It is about $304$, in a direction nobody set.',
    { punch: 'Two quantities that each carry a direction add tip-to-tail, not digit-to-digit. That is the whole idea of a vector, and it is why the answer is a triangle rather than a sum.' }
  ],
  funfact: [
    'Hamilton spent years looking for a way to multiply points in three dimensions, and carved the answer into a Dublin bridge in 1843 when it finally came to him.',
    'Force, velocity, acceleration and momentum are all vectors. Mass, temperature and time are not — they have size and nothing else.',
    'Every 3D game moves its objects by adding vectors thousands of times a second. The arithmetic in this unit is literally what the graphics card does.'
  ],
  vocab: [
    ['Vector', 'A quantity with both magnitude and direction.'],
    ['Scalar', 'A quantity with size only, such as mass or temperature.'],
    ['Magnitude', 'The length of the vector, written $|\\mathbf{v}|$.'],
    ['Component form', 'A vector written as its horizontal and vertical parts, $\\langle a, b \\rangle$.'],
    ['Resultant', 'The single vector that two or more vectors add up to.']
  ],
  sections: [
    { h: 'Components: the useful form',
      p: ['Any vector splits into a horizontal part and a vertical part, written $\\langle a, b \\rangle$.',
          'From a magnitude and direction, the components are $\\langle r\\cos\\theta, r\\sin\\theta \\rangle$ — **the same conversion as polar coordinates**.',
          'Going back, $|\\mathbf{v}| = \\sqrt{a^2+b^2}$ and the direction comes from $\\tan\\theta = \\dfrac{b}{a}$.'],
      box: { k: 'key', h: 'Components are for arithmetic', t: 'Adding is trivial in components and awkward in magnitude-and-direction form. <strong>Convert first, add second, convert back last.</strong>' } },
    { h: 'Adding tip to tail',
      p: ['Draw the second vector starting where the first one ends. The **resultant** runs from the very start to the very end.',
          'In components it is simply $\\langle a_1+a_2, b_1+b_2 \\rangle$ — add the parts that point the same way.',
          'Order does not matter: going east then north lands you where going north then east does.'],
      box: { k: 'warn', h: 'Magnitudes do not add', t: '$|\\mathbf{u}| + |\\mathbf{v}|$ is almost never $|\\mathbf{u}+\\mathbf{v}|$. It is only equal when the two point the <em>same</em> way — otherwise the triangle is shorter than going round two sides.' } },
    { h: 'Scalar multiplication',
      p: ['Multiplying by a number stretches the vector without turning it: $3\\mathbf{v}$ is three times as long, same direction.',
          'A negative scalar **reverses** it, so $-\\mathbf{v}$ has the same length pointing the opposite way.',
          'Subtracting is adding the reverse: $\\mathbf{u}-\\mathbf{v}$ means $\\mathbf{u}+(-\\mathbf{v})$.'],
      box: { k: 'key', h: 'Unit vectors', t: 'Dividing a <strong>nonzero</strong> vector by its own magnitude gives a vector of length $1$ pointing the same way. The zero vector has no direction and cannot be normalised. <em>That is how you keep a direction and throw away the speed.</em>' } },
    { h: 'The dot product',
      p: ['$\\mathbf{u} \\cdot \\mathbf{v} = a_1a_2 + b_1b_2$ — multiply matching components and add. The result is a **number**, not a vector.',
          'It also equals $|\\mathbf{u}||\\mathbf{v}|\\cos\\theta$, which is what makes it useful: it measures how much two vectors agree.',
          'For two <strong>nonzero</strong> vectors, a dot product of zero means $\\cos\\theta = 0$, so the vectors are perpendicular.'],
      box: { k: 'key', h: 'A one-line perpendicularity test', t: '$\\langle 3,4\\rangle \\cdot \\langle -4,3\\rangle = -12+12 = 0$, so those two are at right angles. <em>No angles need to be calculated.</em>' } },
    { h: 'Navigation and force problems',
      p: ['Write every quantity in components, add them, then convert the resultant back to a speed and a bearing.',
          'Bearings are measured **clockwise from north**, not anticlockwise from east — convert carefully or the answer is reflected.',
          'When forces balance, the resultant is the zero vector, which is two equations: horizontal parts cancel, vertical parts cancel.'],
      box: { k: 'slow', h: 'Draw the triangle first', t: 'A rough sketch tells you roughly where the answer should land. <strong>A component slip usually shows up as an answer pointing the wrong way entirely.</strong>' } }
  ],
  examples: [
    { t: 'Adding in components', q: 'Find $\\mathbf{u}+\\mathbf{v}$ and its magnitude, for $\\mathbf{u}=\\langle 3,-2\\rangle$ and $\\mathbf{v}=\\langle -1,5\\rangle$.',
      steps: [
        { do: 'Add matching components: $\\langle 3+(-1),\\, -2+5 \\rangle$.', why: 'Horizontal with horizontal, vertical with vertical.' },
        { do: 'That gives $\\langle 2, 3 \\rangle$.', why: 'The resultant, in component form.' },
        { do: '$|\\langle 2,3\\rangle| = \\sqrt{4+9} = \\sqrt{13} \\approx 3.6$.', why: 'Pythagoras on the components.' }
      ], ans: '$\\langle 2,3 \\rangle$, magnitude $\\sqrt{13}$' },
    { t: 'The plane and the wind', q: 'A plane flies north at $300$ mph in a $50$ mph wind from the west. Find the ground speed to one decimal place.',
      steps: [
        { do: 'North is $\\langle 0, 300 \\rangle$; a wind from the west pushes east, so $\\langle 50, 0 \\rangle$.', why: 'Components first.' },
        { do: 'The resultant is $\\langle 50, 300 \\rangle$.', why: 'Add the parts.' },
        { do: '$\\sqrt{2500+90000} = \\sqrt{92500} \\approx 304.1$ mph.', why: 'Not $350$ — the wind is sideways, so most of it is wasted.' }
      ], ans: 'about $304.1$ mph' },
    { t: 'Testing for perpendicular', q: 'Are $\\langle 6, -2 \\rangle$ and $\\langle 1, 3 \\rangle$ perpendicular?',
      steps: [
        { do: 'Compute the dot product: $6(1) + (-2)(3)$.', why: 'Multiply matching components.' },
        { do: '$= 6 - 6 = 0$.', why: 'The parts cancel exactly.' },
        { do: 'A zero dot product means $\\cos\\theta = 0$, so yes — they meet at $90°$.', why: 'No angle had to be found.' }
      ], ans: 'Yes' }
  ],
  mistakes: [
    'Adding magnitudes instead of vectors. A $300$ mph plane in a $50$ mph crosswind does not travel $350$ mph; it travels about $304$. Only vectors pointing the same way add their lengths.',
    'Treating the dot product as a vector. $\\mathbf{u} \\cdot \\mathbf{v}$ is a single number. An answer written as an ordered pair has confused it with something else.',
    'Getting the wind direction backwards. A wind <em>from</em> the west blows <em>towards</em> the east, so its component is positive. Reversing it puts the plane on the wrong side of its course.',
    'Mixing bearings with standard angles. Bearings run clockwise from north; the usual $\\theta$ runs anticlockwise from east. Using one convention’s number in the other’s formula reflects the answer.',
    'Forgetting that a negative scalar reverses direction. $-2\\mathbf{v}$ is twice as long and points the opposite way, not merely twice as long.'
  ]
},
{
  id: 'matrices', strand: 'algebra', fig: 'matrixOps',
  title: 'Matrices & Systems',
  big: 'Strip the letters from a system of equations and what is left is a grid of numbers that can be solved mechanically.',
  discover: [
    '**Write out three equations in three unknowns and look at them.**',
    'Every one has an $x$ term, then a $y$ term, then a $z$ term, then an equals sign. Always in that order.',
    { fig: 'discMatrices' },
    'The letters never move. They are **column headings**, doing no arithmetic at all.',
    'So cross them out. What is left is a rectangle of numbers, and nothing was lost.',
    { punch: 'That rectangle is a matrix. Once the bookkeeping is separated from the arithmetic, a computer can solve a system of a thousand equations without ever seeing a letter.' }
  ],
  funfact: [
    'The word "matrix" in this sense is Sylvester’s, from 1850 — he meant it as a womb from which determinants are born.',
    'Google’s original PageRank was one enormous matrix problem: find the vector that the web’s link matrix leaves unchanged.',
    'Rotating, scaling and skewing an image are all matrix multiplications, which is why a graphics chip is essentially a machine for multiplying small matrices very fast.'
  ],
  vocab: [
    ['Matrix', 'A rectangular array of numbers, described by its rows then columns.'],
    ['Dimensions', 'Rows × columns. A $2 \\times 3$ matrix has two rows and three columns.'],
    ['Identity matrix', 'The square matrix with ones down the diagonal; it leaves everything unchanged.'],
    ['Determinant', 'A single number computed from a square matrix; zero means it has no inverse.'],
    ['Augmented matrix', 'The coefficients with the constants attached as a final column.']
  ],
  sections: [
    { h: 'Reading and adding',
      p: ['Dimensions are always **rows first, then columns**. A $2 \\times 3$ matrix has two rows of three.',
          'Adding is done entry by entry, so the two matrices must be exactly the same shape.',
          'Multiplying by a number multiplies every entry, exactly as it does with a vector.'],
      box: { k: 'key', h: 'Rows before columns', t: 'The entry $a_{23}$ sits in row $2$, column $3$. <em>The order is fixed, and every convention in the unit follows it.</em>' } },
    { h: 'Multiplying, and why the shapes must fit',
      p: ['To multiply, take a row of the first and a column of the second, multiply term by term and add — a **dot product**.',
          'So the row and column must be the same length: the columns of the first must match the rows of the second.',
          'A $2 \\times 3$ times a $3 \\times 4$ works and gives a $2 \\times 4$. The inside numbers agree, and the outside ones give the answer.'],
      box: { k: 'warn', h: 'Order changes the answer', t: '$AB$ and $BA$ are usually different, and often one of them does not even exist. <strong>Matrix multiplication is not commutative</strong>, unlike every product before this unit.' } },
    { h: 'The determinant',
      p: ['For a $2 \\times 2$ matrix, $\\det = ad - bc$. It measures how much the matrix **stretches area**.',
          'A determinant of zero means the matrix collapses the plane onto a line or a point, and flattening cannot be undone.',
          'So a zero determinant is exactly the signal that no inverse exists.'],
      box: { k: 'key', h: 'What zero means for a system', t: 'A system whose determinant is zero has either no solution or infinitely many — never exactly one. <em>The geometry and the algebra agree.</em>' } },
    { h: 'Inverses, and solving a system in one step',
      p: ['If $A\\mathbf{x} = \\mathbf{b}$, then $\\mathbf{x} = A^{-1}\\mathbf{b}$ — the whole system solved by one multiplication.',
          'For $2 \\times 2$, $A^{-1} = \\dfrac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$: swap the diagonal, flip the signs off it, divide by the determinant.',
          'This is why a calculator can solve a system instantly, and why it refuses when the determinant is zero.'],
      box: { k: 'slow', h: 'Check by multiplying back', t: 'Multiply $A$ by your $A^{-1}$ and you should get the identity. <strong>Anything else means a sign slipped</strong>, and the check costs one line.' } },
    { h: 'Row reduction',
      p: ['Write the coefficients and the constants as one augmented matrix, then use row operations to simplify.',
          'You may swap rows, multiply a row by a non-zero number, or add a multiple of one row to another — each is a legal move on the equations themselves.',
          'Drive it towards ones on the diagonal and zeros below, and the **last row reads off a value** you can back-substitute.'],
      box: { k: 'key', h: 'Nothing new is happening', t: 'Every row operation is something you would do to the equations anyway. The matrix just saves rewriting the letters each time.' } }
  ],
  examples: [
    { t: 'Multiplying', q: 'Find $\\begin{bmatrix} 1 & 2 \\\\ 3 & 0 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix}$.',
      steps: [
        { do: 'Shapes: $2 \\times 2$ times $2 \\times 1$. The inside $2$s agree, so the answer is $2 \\times 1$.', why: 'Check before calculating.' },
        { do: 'Row one with the column: $1(4)+2(5) = 14$.', why: 'Multiply matching entries and add.' },
        { do: 'Row two with the column: $3(4)+0(5) = 12$.', why: 'Same move, next row.' }
      ], ans: '$\\begin{bmatrix} 14 \\\\ 12 \\end{bmatrix}$' },
    { t: 'A determinant', q: 'Find the determinant of $\\begin{bmatrix} 5 & 3 \\\\ 2 & 4 \\end{bmatrix}$ and say whether it has an inverse.',
      steps: [
        { do: '$\\det = ad - bc = 5(4) - 3(2)$.', why: 'Down the diagonal minus up the diagonal.' },
        { do: '$= 20 - 6 = 14$.', why: 'Not zero.' },
        { do: 'A non-zero determinant means the inverse exists.', why: 'The matrix does not flatten the plane.' }
      ], ans: '$14$; yes' },
    { t: 'Solving a system', q: 'Use the determinant to decide how many solutions $2x+3y=7$, $4x+6y=1$ has.',
      steps: [
        { do: 'The coefficient matrix is $\\begin{bmatrix} 2 & 3 \\\\ 4 & 6 \\end{bmatrix}$.', why: 'Strip the letters.' },
        { do: '$\\det = 2(6)-3(4) = 12-12 = 0$.', why: 'Zero, so there is no unique solution.' },
        { do: 'The second equation is twice the first on the left but not on the right, so the lines are parallel.', why: 'Parallel and distinct means no solution at all.' }
      ], ans: 'No solution' }
  ],
  mistakes: [
    'Assuming $AB = BA$. Matrix multiplication depends on order, and often only one of the two products is even defined. Checking the shapes first catches this immediately.',
    'Multiplying entry by entry. That is how addition works, not multiplication — each entry of a product is a whole row dotted with a whole column.',
    'Mismatching dimensions. A $2 \\times 3$ can multiply a $3 \\times 4$ but not a $4 \\times 3$. The inside numbers must agree, and no arithmetic can rescue it if they do not.',
    'Dividing by a zero determinant. A determinant of zero means no inverse exists, so the system has either no solution or infinitely many. Pressing on gives a division by zero.',
    'Forgetting the sign flips in the $2 \\times 2$ inverse. The diagonal entries swap and the other two change sign. Multiplying back to check the identity catches any slip in one line.'
  ]
},
{
  id: 'conics', strand: 'geometry', fig: 'conicFamily',
  title: 'Conic Sections',
  big: 'Slice a cone four ways and you get every curve in this unit.',
  discover: [
    '**Take a cone and cut straight through it, parallel to the base.**',
    'The edge of the cut is a circle. Nobody needed an equation to know that.',
    { fig: 'discConics' },
    'Now tilt the knife slightly. The circle stretches into an **ellipse** — still closed, no longer round.',
    'Tilt further, until the cut runs parallel to the side of the cone, and the curve never closes at all.',
    { punch: 'Circle, ellipse, parabola, hyperbola — one solid, one knife, four curves. They share a family resemblance in their equations because they share an origin.' }
  ],
  funfact: [
    'Apollonius worked all this out around 200 BC, eighteen centuries before anyone had a use for it.',
    'Kepler found that planets travel in ellipses with the sun at one focus. Newton then proved the ellipse follows from an inverse-square force.',
    'A satellite dish is a parabola because every ray arriving parallel to its axis bounces to one point — the focus, where the receiver sits.'
  ],
  vocab: [
    ['Conic section', 'A curve obtained by slicing a cone with a plane.'],
    ['Focus', 'A fixed point used to define the curve. An ellipse and a hyperbola have two.'],
    ['Vertex', 'A turning point of the curve, on its axis.'],
    ['Major axis', 'The longer axis of an ellipse.'],
    ['Eccentricity', 'How far a conic is from being a circle. Zero is a circle; one is a parabola.']
  ],
  sections: [
    { h: 'Telling them apart from the equation',
      p: ['Look at the squared terms. **One squared term** means a parabola — only $x$ or only $y$ is squared.',
          'Two squared terms with the **same sign** give a circle or an ellipse; equal coefficients make it a circle.',
          'Two squared terms with **opposite signs** give a hyperbola, which opens out and never closes.'],
      box: { k: 'key', h: 'Three questions, four answers', t: 'How many squares? Same sign or opposite? Equal coefficients? <strong>For axis-aligned, nondegenerate conics with no $xy$ term, those three answers identify the type. Degenerate equations can instead describe a point, lines or no real points</strong> before a graph is drawn.' } },
    { h: 'Circles and ellipses',
      p: ['$\\dfrac{(x-h)^2}{a^2} + \\dfrac{(y-k)^2}{b^2} = 1$ is an ellipse centred at $(h,k)$.',
          'It reaches $a$ either side horizontally and $b$ vertically, so the **bigger denominator names the long direction**.',
          'When $a = b$ the two reaches are equal and the ellipse is a circle.'],
      box: { k: 'slow', h: 'The denominators are squares', t: 'In $\\dfrac{x^2}{25}$ the reach is $5$, not $25$. <em>Take the square root before drawing.</em>' } },
    { h: 'Parabolas',
      p: ['$y = a(x-h)^2 + k$ opens up or down; $x = a(y-k)^2 + h$ opens left or right.',
          'For $y=a(x-h)^2+k$, the axis of symmetry is $x=h$; for $x=a(y-k)^2+h$, it is $y=k$. Both coordinates can be unbounded.',
          'Every point on the curve is equally far from the focus and from a fixed line called the directrix.'],
      box: { k: 'key', h: 'Which way it opens', t: 'If $y$ is alone, the parabola opens vertically; if $x$ is alone, horizontally. <em>The sign of $a$ then picks which of the two.</em>' } },
    { h: 'Hyperbolas',
      p: ['$\\dfrac{(x-h)^2}{a^2} - \\dfrac{(y-k)^2}{b^2} = 1$ opens left and right; swapping which term is positive opens it up and down.',
          'The **positive term names the opening direction**, which is the only thing you need to sketch it.',
          'Far from the centre the two branches settle onto straight asymptotes, which is why they never close.'],
      box: { k: 'warn', h: 'The minus decides everything', t: 'Changing $-$ to $+$ turns a hyperbola into an ellipse — a curve that opens forever into one that closes. <strong>Check the sign before anything else.</strong>' } },
    { h: 'Completing the square to find the centre',
      p: ['Equations often arrive expanded, like $x^2 + y^2 - 6x + 4y - 3 = 0$, with the centre hidden.',
          'Group the $x$ terms and the $y$ terms, complete the square on each, and the centre **appears in the brackets**.',
          'It is the same move as in Algebra II, done twice — once for each variable.'],
      box: { k: 'slow', h: 'Balance both sides', t: 'Whatever you add inside to complete a square must be added to the right too. <strong>Forgetting that changes the radius</strong> while leaving the centre correct, which makes it hard to spot.' } }
  ],
  examples: [
    { t: 'Identifying', q: 'Identify the curve $4x^2 + 9y^2 = 36$.',
      steps: [
        { do: 'Both variables are squared and both coefficients are positive.', why: 'Same sign, so closed.' },
        { do: 'Divide by $36$: $\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$.', why: 'Standard form needs a $1$ on the right.' },
        { do: 'The coefficients differ, so it is an ellipse reaching $3$ across and $2$ up.', why: 'Square roots of the denominators.' }
      ], ans: 'An ellipse, $a=3$, $b=2$' },
    { t: 'Finding the centre', q: 'Find the centre and radius of $x^2 + y^2 - 6x + 4y - 3 = 0$.',
      steps: [
        { do: 'Group: $(x^2-6x) + (y^2+4y) = 3$.', why: 'Constants to the right.' },
        { do: 'Complete both squares: $(x-3)^2 - 9 + (y+2)^2 - 4 = 3$.', why: 'Half of $-6$ squared is $9$; half of $4$ squared is $4$.' },
        { do: 'So $(x-3)^2+(y+2)^2 = 16$: centre $(3,-2)$, radius $4$.', why: 'Radius is the square root of $16$.' }
      ], ans: 'Centre $(3,-2)$, radius $4$' },
    { t: 'Reading a hyperbola', q: 'Which way does $\\dfrac{y^2}{16} - \\dfrac{x^2}{9} = 1$ open?',
      steps: [
        { do: 'The $y^2$ term is the positive one.', why: 'The minus sits on the $x$ term.' },
        { do: 'The positive term names the direction the branches open.', why: 'That is the rule for every hyperbola.' },
        { do: 'So it opens up and down, with vertices $4$ above and below the centre.', why: '$\\sqrt{16}=4$.' }
      ], ans: 'Up and down' }
  ],
  mistakes: [
    'Reading the denominator as the reach. In $\\dfrac{x^2}{25}=1$ the curve reaches $5$, not $25$ — the denominators are squares and need a root taken before sketching.',
    'Mistaking a hyperbola for an ellipse. The sign between the two squared terms is the whole difference: a plus closes the curve, a minus sends it off to infinity.',
    'Deciding the opening direction of a hyperbola from the larger denominator. It is the <em>positive</em> term that names the direction, whatever the numbers underneath happen to be.',
    'Forgetting to balance while completing the square. Adding $9$ inside the bracket means adding $9$ to the other side too; otherwise the centre is right and the radius is wrong.',
    'Assuming two squared terms always make a circle. Only equal coefficients give a circle; $4x^2+9y^2=36$ is an ellipse, wider than it is tall.'
  ]
},
{
  id: 'paramfn', strand: 'algebra', fig: 'paramCircle',
  title: 'Parametric Equations',
  big: 'Let a third variable drive both coordinates, and curves that were impossible become easy.',
  discover: [
    '**Throw a ball and photograph its flight.**',
    'The path is a neat arc, and $y = f(x)$ describes it perfectly well.',
    { fig: 'discParamfn' },
    'But the photograph has **lost the timing**. Was the ball fast at the top, or slow? The curve cannot say.',
    'Worse, a curve that loops back — a circle, a figure of eight — fails the vertical line test entirely.',
    { punch: 'So let time drive both coordinates separately: $x = f(t)$ and $y = g(t)$. Now the path carries its schedule, and loops are no trouble at all.' }
  ],
  funfact: [
    'Every animation and every CNC machine runs on parametric equations, because a machine needs to know where the tool is <em>at each moment</em>, not merely which line it traces.',
    'A cycloid — the path of a point on a rolling wheel — has a horrible implicit equation and a beautiful parametric one. It was called the Helen of geometers, for all the quarrels it caused.',
    'Bézier curves, which draw every font on your screen, are parametric and cubic.'
  ],
  vocab: [
    ['Parameter', 'The extra variable, usually $t$, that drives both coordinates.'],
    ['Parametric equations', 'A pair $x = f(t)$, $y = g(t)$ describing a curve.'],
    ['Eliminating the parameter', 'Combining the two equations to recover a relation in $x$ and $y$ alone.'],
    ['Orientation', 'The direction the curve is traced as $t$ increases.'],
    ['Plane curve', 'The set of points traced out, with the timing stripped away.']
  ],
  sections: [
    { h: 'Building a table',
      p: ['Choose values of $t$, work out $x$ and $y$ for each, and plot the points **in order**.',
          'The order is the extra information: it tells you the direction of travel, which a plain graph cannot.',
          'Mark a few points with their $t$ values and the curve carries its own schedule.'],
      box: { k: 'key', h: 'The arrow matters', t: 'Two parametrisations can trace the same curve in opposite directions. <em>Same picture, different motion</em>, and physics problems care which.' } },
    { h: 'Eliminating the parameter',
      p: ['To recover a plain $x$–$y$ equation, solve one equation for $t$ and **substitute into the other**.',
          'From $x = t+1$ and $y = t^2$: $t = x-1$, so $y = (x-1)^2$ — an ordinary parabola.',
          'You lose the timing and the direction, but gain a familiar shape.'],
      box: { k: 'warn', h: 'Watch the domain', t: 'If $t \\ge 0$ then only part of the curve is traced. <strong>The eliminated equation usually describes more than the parametric one does</strong>, so state the restriction.' } },
    { h: 'When trigonometry is the parameter',
      p: ['$x = r\\cos t$, $y = r\\sin t$ traces a circle of radius $r$, because $\\cos^2 t + \\sin^2 t = 1$.',
          'That identity is how you eliminate $t$: square both, add, and the **parameter cancels itself**.',
          'Change the two radii and you get $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$, an ellipse.'],
      box: { k: 'key', h: 'Square and add', t: 'Whenever you see $\\cos t$ in one equation and $\\sin t$ in the other, the Pythagorean identity is the tool for removing $t$.' } },
    { h: 'Projectile motion',
      p: ['Horizontally nothing pushes the ball, so $x = v_0\\cos\\theta \\cdot t$ — **steady speed, straight line**.',
          'Vertically gravity pulls, so $y = v_0\\sin\\theta \\cdot t - 16t^2$ in feet, or $-4.9t^2$ in metres.',
          'The two behave completely differently, and keeping them apart is exactly what parametric form allows.'],
      box: { k: 'slow', h: 'Landing time', t: 'Set $y = 0$ and solve for $t$. <em>The positive root is when it lands</em>, and substituting that into $x$ gives the range.' } },
    { h: 'Curves no function can draw',
      p: ['A circle fails the vertical line test, so no $y = f(x)$ can describe it. Parametrically it takes one line.',
          'The same is true of loops, spirals and anything that **crosses its own path**.',
          'That is the real reason this form exists: it removes the requirement that each $x$ have only one $y$.'],
      box: { k: 'key', h: 'One input, two outputs', t: 'The parameter is the input, and it returns a <em>pair</em>. Nothing about that breaks the definition of a function.' } }
  ],
  examples: [
    { t: 'Eliminating the parameter', q: 'Eliminate $t$ from $x = 2t$, $y = t^2 + 1$.',
      steps: [
        { do: 'Solve the simpler one: $t = \\dfrac{x}{2}$.', why: 'Pick whichever is easier to rearrange.' },
        { do: 'Substitute: $y = \\left(\\dfrac{x}{2}\\right)^2 + 1$.', why: 'Replace every $t$.' },
        { do: '$y = \\dfrac{x^2}{4} + 1$.', why: 'A parabola with vertex $(0,1)$.' }
      ], ans: '$y = \\dfrac{x^2}{4}+1$' },
    { t: 'A circle', q: 'What curve is traced by $x = 3\\cos t$, $y = 3\\sin t$?',
      steps: [
        { do: 'Square both: $x^2 = 9\\cos^2 t$ and $y^2 = 9\\sin^2 t$.', why: 'Setting up the identity.' },
        { do: 'Add: $x^2+y^2 = 9(\\cos^2 t + \\sin^2 t) = 9$.', why: 'The identity removes $t$.' },
        { do: 'That is a circle of radius $3$ centred at the origin.', why: 'Traced anticlockwise as $t$ increases.' }
      ], ans: 'A circle of radius $3$' },
    { t: 'A projectile', q: 'A ball is thrown at $40$ ft/s at $30°$. Using $y = 20t - 16t^2$, when does it land?',
      steps: [
        { do: 'It lands when $y = 0$: $20t - 16t^2 = 0$.', why: 'Ground level.' },
        { do: 'Factor: $4t(5 - 4t) = 0$, so $t = 0$ or $t = 1.25$.', why: '$t=0$ is the throw itself.' },
        { do: 'So it lands after $1.25$ seconds.', why: 'The positive root is the one that means anything.' }
      ], ans: '$1.25$ seconds' }
  ],
  mistakes: [
    'Losing the domain when eliminating $t$. If $t \\ge 0$ then $x = 2t$ only reaches $x \\ge 0$, so $y = \\dfrac{x^2}{4}+1$ describes twice as much curve as the original. Say what $x$ is restricted to.',
    'Ignoring the direction of travel. $x=\\cos t$ and $x=\\cos(-t)$ trace the same circle opposite ways. The picture is identical and the motion is not.',
    'Trying to eliminate $t$ by dividing the two equations. From $x=2t$ and $y=t^2$, dividing gives $\\dfrac{y}{x}=\\dfrac{t}{2}$, which still has $t$ in it. Solve one equation for $t$ and substitute.',
    'Forgetting the identity route with trig. Squaring and adding removes $t$ in one step, while solving $x = 3\\cos t$ for $t$ drags an arccosine through the whole problem.',
    'Taking $t=0$ as the landing time. It is the moment of release. The other root of the quadratic is the answer.'
  ]
},
{
  id: 'probadv', strand: 'data', fig: 'pascalBinomial',
  title: 'Counting, Permutations & the Binomial Theorem',
  big: 'Expanding a bracket and counting arrangements turn out to be the same question.',
  discover: [
    '**Multiply out $(a+b)^3$ by hand and look at the coefficients.**',
    'You get $a^3 + 3a^2b + 3ab^2 + b^3$. The numbers are $1, 3, 3, 1$.',
    { fig: 'discProbadv' },
    'Nobody calculated those. Each term comes from picking $a$ or $b$ from **each of the three brackets**.',
    'There are three ways to pick exactly one $b$, which is why $a^2b$ arrives three times.',
    { punch: 'So the coefficient is a count of choices, not an arithmetic result. Pascal’s triangle is a counting table, and the binomial theorem is the sentence that says so.' }
  ],
  funfact: [
    'The triangle was known in China as Yang Hui’s triangle three hundred years before Pascal, and in Persia before that.',
    'Every row sums to a power of two, because choosing any subset of $n$ items can be done in $2^n$ ways.',
    'The shallow diagonals of Pascal’s triangle add up to the Fibonacci numbers, for reasons nobody would guess from either definition.'
  ],
  vocab: [
    ['Permutation', 'An arrangement where order matters. $P(n,r) = \\dfrac{n!}{(n-r)!}$.'],
    ['Combination', 'A selection where order does not matter. $C(n,r) = \\dfrac{n!}{r!(n-r)!}$.'],
    ['Factorial', '$n!$ is the product of every whole number from $1$ to $n$. $0! = 1$.'],
    ['Binomial theorem', 'The rule expanding $(a+b)^n$ using combinations as coefficients.'],
    ['Fundamental counting principle', 'If one choice has $m$ options and the next has $n$, together they have $mn$.']
  ],
  sections: [
    { h: 'Multiply the choices',
      p: ['If a meal is one of $4$ starters and one of $3$ mains, there are $4 \\times 3 = 12$ meals.',
          'Every independent decision **multiplies** the count, because each option of the first pairs with all of the second.',
          'That single principle is behind every formula in this unit.'],
      box: { k: 'key', h: 'And means times', t: 'Choosing this <em>and</em> then that multiplies. Choosing this <em>or</em> that adds. <strong>Getting that backwards is the commonest counting error.</strong>' } },
    { h: 'Does the order matter?',
      p: ['Gold, silver and bronze from $8$ runners: order matters, so it is a **permutation**, $P(8,3) = 336$.',
          'A committee of $3$ from $8$ people: order does not matter, so it is a **combination**, $C(8,3) = 56$.',
          'The combination is smaller by exactly $3! = 6$, since each committee was counted once for every way of ordering it.'],
      box: { k: 'warn', h: 'Ask before you calculate', t: 'Would swapping two of the chosen items give a different outcome? <strong>Yes means permutation, no means combination</strong> — and the two answers differ by a factor of $r!$.' } },
    { h: 'Pascal’s triangle is a table of combinations',
      p: ['Row $n$ of the triangle lists $C(n,0), C(n,1), \\ldots, C(n,n)$.',
          'Each entry is the sum of the two above it, because choosing $r$ from $n$ either **includes the new item or does not**.',
          'That is a proof, not a pattern: the two cases above are exactly the two ways it can happen.'],
      box: { k: 'key', h: 'Symmetry for free', t: '$C(n,r) = C(n, n-r)$, because choosing $3$ to take is the same as choosing $5$ to leave. <em>Use whichever is the smaller calculation.</em>' } },
    { h: 'The binomial theorem',
      p: ['$(a+b)^n = \\sum_{r=0}^{n} C(n,r)\\, a^{n-r} b^{r}$ — each term picks $b$ from $r$ of the brackets.',
          'The powers always **add to $n$**, which is a useful check on any term you write.',
          'So the coefficient of $a^2b^3$ in $(a+b)^5$ is $C(5,3) = 10$, with no expanding required.'],
      box: { k: 'slow', h: 'Finding one term', t: 'The term with $b^r$ is $C(n,r)a^{n-r}b^r$. <em>You never have to expand the whole thing to answer a question about one term.</em>' } },
    { h: 'Counting and probability together',
      p: ['A probability is a count of favourable outcomes divided by a count of all outcomes.',
          'So both halves of the fraction are counting problems, usually of the **same kind**.',
          'The probability of $3$ heads in $5$ flips is $\\dfrac{C(5,3)}{2^5} = \\dfrac{10}{32}$.'],
      box: { k: 'key', h: 'Count both, consistently', t: 'If the top counts unordered selections, the bottom must too. <strong>Mixing ordered and unordered counts is what produces impossible probabilities above $1$.</strong>' } }
  ],
  examples: [
    { t: 'Permutation or combination', q: 'From $10$ students, how many ways to pick a president, a secretary and a treasurer?',
      steps: [
        { do: 'Swapping two of the three chosen people gives different officers, so order matters.', why: 'That makes it a permutation.' },
        { do: '$P(10,3) = 10 \\times 9 \\times 8$.', why: 'Ten choices, then nine, then eight.' },
        { do: '$= 720$.', why: 'A committee of three from ten would be $120$, six times smaller.' }
      ], ans: '$720$' },
    { t: 'One binomial term', q: 'Find the coefficient of $x^3$ in $(x+2)^5$.',
      steps: [
        { do: 'The general term is $C(5,r)x^{5-r}2^r$.', why: 'From the binomial theorem.' },
        { do: 'For $x^3$ we need $5-r=3$, so $r=2$.', why: 'The powers add to $5$.' },
        { do: '$C(5,2) \\cdot 2^2 = 10 \\times 4 = 40$.', why: 'The $2$ gets raised to a power too.' }
      ], ans: '$40$' },
    { t: 'Counting into probability', q: 'A bag has $5$ red and $3$ blue marbles. Two are drawn at once. What is the probability both are red?',
      steps: [
        { do: 'Drawn at once means order does not matter, so count combinations.', why: 'Same kind top and bottom.' },
        { do: 'Both red: $C(5,2) = 10$. All pairs: $C(8,2) = 28$.', why: 'Favourable over total.' },
        { do: '$\\dfrac{10}{28} = \\dfrac{5}{14}$.', why: 'About $36\\%$.' }
      ], ans: '$\\dfrac{5}{14}$' }
  ],
  mistakes: [
    'Using a permutation where order does not matter. A committee of $3$ from $8$ is $C(8,3)=56$, not $P(8,3)=336$ — the permutation counts each committee six times, once per ordering.',
    'Adding when the choices are independent. Four starters and three mains give $12$ meals, not $7$. "And" multiplies; only "or" adds.',
    'Forgetting to raise the constant to its power. In $(x+2)^5$ the term with $x^3$ carries $2^2$, so the coefficient is $40$, not $10$.',
    'Mixing ordered and unordered counts in a probability. If the numerator counts unordered pairs, the denominator must too, or the fraction is meaningless.',
    'Treating $0!$ as $0$. It is $1$, which is what makes $C(n,n)=1$ come out right — there is exactly one way to choose everything.'
  ]
},
{
  id: 'limits', strand: 'calculus', fig: 'limitTable',
  title: 'Limits & Continuity',
  big: 'Where a function is heading matters more than whether it ever arrives.',
  discover: [
    '**Try $x = 1$ in $\\dfrac{x^2-1}{x-1}$.**',
    'The bottom becomes zero, so the expression has no value there. The calculator refuses.',
    { fig: 'discLimits' },
    'Now creep up on it. At $0.9$ you get $1.9$; at $0.99$, $1.99$; at $0.999$, $1.999$.',
    'Come down from above and the same thing happens. Both sides are heading for **exactly 2**.',
    { punch: 'The function never reaches $2$ at $x=1$ — it is not defined there at all. But it is unmistakably going there, and a limit is the word for that.' }
  ],
  funfact: [
    'Newton and Leibniz built calculus on this idea in the 1600s, and could not make it rigorous. It took until the 1820s and Cauchy for limits to be defined properly.',
    'Bishop Berkeley mocked the early version, calling infinitesimals "the ghosts of departed quantities". He was right, and it took two centuries to answer him.',
    'The hole at $x=1$ is real but invisible on a graphing calculator, whose pixels are wider than a single point.'
  ],
  vocab: [
    ['Limit', 'The value a function approaches as the input approaches some number.'],
    ['One-sided limit', 'The value approached from the left, or from the right, alone.'],
    ['Continuous', 'A function you could draw without lifting the pen — no holes, jumps or blow-ups.'],
    ['Removable discontinuity', 'A single missing point; a hole that could be filled in.'],
    ['Indeterminate form', '$\\dfrac00$, which means the limit needs more work — not that it fails to exist.']
  ],
  sections: [
    { h: 'What a limit is asking',
      p: ['$\\lim_{x \\to a} f(x) = L$ means: as $x$ gets close to $a$, $f(x)$ gets close to $L$.',
          'It says **nothing** about $f(a)$ itself. The function may be undefined there, or defined to be something else entirely.',
          'That separation is the whole point — it lets you talk about a value the function never takes.'],
      box: { k: 'key', h: 'Near, not at', t: 'The limit ignores the single point $x=a$ on purpose. <strong>A hole in the graph does not change where the curve is heading.</strong>' } },
    { h: 'Just substitute, first',
      p: ['For most functions at most points, the limit is simply $f(a)$. Substitute and you are done.',
          'This works for every polynomial, and for rationals wherever the bottom is not zero.',
          'When substitution fails, inspect the expression: an indeterminate form, a jump or unbounded behaviour may require another method.'],
      box: { k: 'slow', h: 'Try the easy thing', t: 'Substitution answers most limit questions in one line. <em>Reach for algebra only when it fails.</em>' } },
    { h: 'When you get 0/0',
      p: ['$\\dfrac00$ is **not an answer**. It is an <strong>indeterminate form</strong>. In the rational examples here, factoring may reveal a common factor to cancel; other functions can need different methods.',
          'Factor both, cancel the common piece, and substitute into what is left.',
          '$\\dfrac{x^2-1}{x-1} = \\dfrac{(x-1)(x+1)}{x-1} = x+1$ away from $x=1$, and $x+1$ is $2$ there.'],
      box: { k: 'warn', h: 'It is a signal, not a result', t: 'Writing "the limit is $\\dfrac00$" says only that you have not finished. <strong>$\\dfrac00$ can turn out to be any number at all</strong>, depending on the functions.' } },
    { h: 'One-sided limits, and when the limit fails',
      p: ['Approach from the left and from the right separately. If the two disagree, the limit **does not exist**.',
          'A step function jumps: coming from the left gives one height, from the right another.',
          'For the limit to exist, both sides must head for the same place.'],
      box: { k: 'key', h: 'Three ways it can fail', t: 'The sides disagree, the function blows up to infinity, or it oscillates without settling. <em>Anything else, and the limit exists.</em>' } },
    { h: 'Continuity',
      p: ['A function is continuous at $a$ when three things hold: $f(a)$ exists, the limit exists, and **they are equal**.',
          'A hole fails the first. A jump fails the second. A misplaced single point fails the third.',
          'Continuous functions are the well-behaved ones, and almost every rule later in calculus assumes continuity.'],
      box: { k: 'slow', h: 'The pen test', t: 'Could you draw it without lifting the pen? <em>That is continuity, in a sentence</em> — and it is exactly the three conditions above.' } }
  ],
  examples: [
    { t: 'Substitution works', q: 'Find $\\lim_{x \\to 3} (x^2 - 2x + 4)$.',
      steps: [
        { do: 'This is a polynomial, so it is continuous everywhere.', why: 'Substitution is valid.' },
        { do: '$3^2 - 2(3) + 4 = 9 - 6 + 4$.', why: 'Just evaluate.' },
        { do: '$= 7$.', why: 'No algebra needed.' }
      ], ans: '$7$' },
    { t: 'A 0/0 form', q: 'Find $\\lim_{x \\to 2} \\dfrac{x^2-4}{x-2}$.',
      steps: [
        { do: 'Substituting gives $\\dfrac{0}{0}$, so there is a common factor.', why: 'A signal to factor.' },
        { do: '$\\dfrac{(x-2)(x+2)}{x-2} = x+2$ for every $x \\ne 2$.', why: 'Cancel the shared factor.' },
        { do: 'Now substitute: $2+2 = 4$.', why: 'The function has a hole at $x=2$, and still heads for $4$.' }
      ], ans: '$4$' },
    { t: 'A limit that does not exist', q: 'For $f(x) = 2x$ when $x<1$ and $f(x) = x+5$ when $x \\ge 1$, find $\\lim_{x \\to 1} f(x)$.',
      steps: [
        { do: 'From the left, $f$ follows $2x$, heading for $2$.', why: 'Left-hand limit.' },
        { do: 'From the right, $f$ follows $x+5$, heading for $6$.', why: 'Right-hand limit.' },
        { do: 'The two disagree, so the limit does not exist.', why: 'The graph jumps at $x=1$.' }
      ], ans: 'Does not exist' }
  ],
  mistakes: [
    'Reporting $\\dfrac00$ as the answer. It is an indeterminate form, meaning the work is unfinished. Factoring and cancelling turns $\\dfrac{x^2-4}{x-2}$ at $x=2$ into a clean $4$.',
    'Assuming the limit is $f(a)$. For $\\dfrac{x^2-1}{x-1}$ at $x=1$ the function has no value, yet the limit is $2$. The limit is about the approach, not the arrival.',
    'Checking only one side. A step function heads for $2$ from the left and $6$ from the right, so no limit exists — one side alone would have given a confident wrong answer.',
    'Cancelling and forgetting the hole. $\\dfrac{x^2-4}{x-2}$ equals $x+2$ everywhere except $x=2$, where the original is still undefined. The limit exists; the value does not.',
    'Confusing a limit with continuity. A limit can exist where the function is undefined. Continuity needs the value to exist <em>and</em> match.'
  ]
},
{
  id: 'derivintro', strand: 'calculus', fig: 'tangentSlope',
  title: 'Rates of Change & the Derivative',
  big: 'Average speed over a shorter and shorter trip settles on the speed at one instant.',
  discover: [
    '**A car covers 60 miles in one hour. What was its speed?**',
    'On average, $60$ mph. But the speedometer was never fixed at $60$ — it rose, fell, and stopped at lights.',
    { fig: 'discDerivintro' },
    'Ask about a shorter stretch and the average gets closer to the truth. One minute is better than one hour.',
    'One second is better still. Keep shrinking the interval and the **averages settle on a single number**.',
    { punch: 'That number is the speed at that instant, and it is what the speedometer reads. A derivative is exactly this: the slope between two points, as the points close together.' }
  ],
  funfact: [
    'The speedometer in a car is a physical derivative. It has no way to know your average speed and no interest in it.',
    'Newton called it a fluxion and Leibniz called it a differential. Leibniz’s notation $\\dfrac{dy}{dx}$ won, because it makes the chain rule look obvious.',
    'The same idea runs everything: marginal cost in economics, reaction rate in chemistry, and growth rate in biology are all derivatives.'
  ],
  vocab: [
    ['Average rate of change', 'The slope between two points, $\\dfrac{f(b)-f(a)}{b-a}$.'],
    ['Secant line', 'A line through two points on a curve.'],
    ['Tangent line', 'A line touching the curve at one point, with the same direction there.'],
    ['Derivative', 'The slope of the tangent, written $f\'(x)$ or $\\dfrac{dy}{dx}$.'],
    ['Difference quotient', '$\\dfrac{f(x+h)-f(x)}{h}$, the slope over a gap of $h$.']
  ],
  sections: [
    { h: 'Average rate of change is just slope',
      p: ['Between two points on any graph, the average rate of change is $\\dfrac{f(b)-f(a)}{b-a}$.',
          'That is rise over run, which you have been computing since Grade 8. **Nothing new has happened yet.**',
          'On a distance-time graph it is average speed; on a cost graph it is cost per unit.'],
      box: { k: 'key', h: 'Units come free', t: 'The units of a rate are always the $y$-units over the $x$-units: miles per hour, dollars per item, degrees per minute.' } },
    { h: 'Shrinking the gap',
      p: ['Now hold the first point still and slide the second one towards it. The secant line **pivots**.',
          'As the gap closes, the secant settles onto the tangent — the line with the limiting secant slope at that point. It may cross the curve or meet it again elsewhere.',
          'The slope of that tangent is the instantaneous rate of change.'],
      box: { k: 'slow', h: 'Why not just set the gap to zero', t: 'Then the slope reads $\\dfrac{0}{0}$, which says nothing. <strong>The limit is what gets you past that</strong>, and it is why the previous unit came first.' } },
    { h: 'The difference quotient',
      p: ['Write the gap as $h$. The slope over that gap is $\\dfrac{f(x+h)-f(x)}{h}$.',
          'Simplify until the $h$ in the denominator **cancels**, then let $h \\to 0$.',
          'For $f(x)=x^2$: the quotient is $\\dfrac{2xh+h^2}{h} = 2x+h$, which goes to $2x$.'],
      box: { k: 'warn', h: 'Cancel before you take the limit', t: 'Setting $h=0$ too early gives $\\dfrac00$. <strong>The algebra has to remove the $h$ from the bottom first</strong>, for these polynomial examples. Some functions are not differentiable: $|x|$ at zero has different left and right slopes.' } },
    { h: 'The power rule',
      p: ['Do the difference quotient a few times and a pattern appears: the derivative of $x^n$ is $nx^{n-1}$.',
          'Bring the power down in front, and drop it by one. That is the rule, and it covers most of what you meet.',
          'A constant has derivative zero, because a horizontal line has **slope zero everywhere**.'],
      box: { k: 'key', h: 'Check it against a line', t: 'For $f(x)=5x$, the rule gives $5$ — and a straight line of slope $5$ does have slope $5$ everywhere. <em>The rule agrees with what you already knew.</em>' } },
    { h: 'What the sign tells you',
      p: ['A positive derivative means the function is **rising**; negative means falling.',
          'At a differentiable interior maximum or minimum the derivative is zero, but a zero derivative need not be an extremum. Endpoints and corners need separate checks.',
          'So the derivative turns questions about shape into questions about sign.'],
      box: { k: 'key', h: 'Zero slope, but which kind', t: 'A flat tangent could be a peak, a valley, or a momentary pause. <em>Check whether the slope changes sign around it.</em>' } }
  ],
  examples: [
    { t: 'Average rate of change', q: 'For $f(x)=x^2$, find the average rate of change from $x=1$ to $x=4$.',
      steps: [
        { do: '$f(1)=1$ and $f(4)=16$.', why: 'Evaluate at both ends.' },
        { do: 'Slope $= \\dfrac{16-1}{4-1} = \\dfrac{15}{3}$.', why: 'Rise over run.' },
        { do: '$= 5$.', why: 'The curve climbs an average of $5$ per unit across that stretch.' }
      ], ans: '$5$' },
    { t: 'From the definition', q: 'Use the difference quotient to find $f\'(x)$ for $f(x)=x^2$.',
      steps: [
        { do: '$\\dfrac{(x+h)^2 - x^2}{h} = \\dfrac{x^2+2xh+h^2-x^2}{h}$.', why: 'Expand the bracket.' },
        { do: 'The $x^2$ terms cancel: $\\dfrac{2xh+h^2}{h} = 2x+h$.', why: 'Now $h$ divides out.' },
        { do: 'Let $h \\to 0$: the derivative is $2x$.', why: 'Matches the power rule.' }
      ], ans: '$f\'(x)=2x$' },
    { t: 'Using the power rule', q: 'Find the slope of $y = x^3 - 6x$ at $x=2$.',
      steps: [
        { do: 'Differentiate term by term: $\\dfrac{dy}{dx} = 3x^2 - 6$.', why: 'Power down in front, drop it by one.' },
        { do: 'At $x=2$: $3(4) - 6 = 6$.', why: 'Substitute after differentiating, never before.' },
        { do: 'So the tangent there has slope $6$.', why: 'Positive, so the curve is rising at that point.' }
      ], ans: '$6$' }
  ],
  mistakes: [
    'Substituting the point before differentiating. For $y = x^3-6x$ at $x=2$, plugging in first gives the number $-4$, whose derivative is zero. Differentiate first, then substitute.',
    'Setting $h=0$ too early in the difference quotient. That gives $\\dfrac00$ and stops the problem. The algebra must cancel the $h$ from the denominator first.',
    'Confusing average and instantaneous rates. Covering $60$ miles in an hour is an average; the speedometer reading is a derivative, and the two agree only by coincidence.',
    'Mishandling the constant. The derivative of $7$ is $0$, not $7$ — a horizontal line has slope zero everywhere.',
    'Dropping the power instead of the exponent. The derivative of $x^5$ is $5x^4$: the $5$ comes down in front <em>and</em> the exponent drops by one. Doing only half gives $x^4$ or $5x^5$, both wrong.'
  ]
},
{
  id: 'areaintro', strand: 'calculus', fig: 'riemannSum',
  title: 'Accumulation & Area Under a Curve',
  big: 'Add up enough thin strips and the total is exactly the area — and usually a distance, a cost or a volume.',
  discover: [
    '**A car holds a steady 30 mph for 2 hours. How far did it go?**',
    'Sixty miles, obviously. And on a speed-time graph that is a rectangle: $30$ tall, $2$ wide, area $60$.',
    { fig: 'discAreaintro' },
    'Now let the speed change. There is no single rectangle any more — but the graph is still there.',
    'Chop the trip into short stretches. Over each one the speed barely changes, so each strip is **almost** a rectangle.',
    { punch: 'Add the strips and you have the distance, near enough. Make them thinner and "near enough" becomes exact. Area under a curve is accumulation, and the units tell you what is accumulating.' }
  ],
  funfact: [
    'Archimedes found the area of a parabolic segment this way around 240 BC, two thousand years before calculus had a name.',
    'The integral sign $\\int$ is a stretched letter S, for "summa". Leibniz chose it in 1675 and it has not changed since.',
    'The fundamental theorem of calculus says that accumulating and rating are inverse operations — the two halves of this course are the same subject seen from either end.'
  ],
  vocab: [
    ['Riemann sum', 'An estimate of area made from rectangles under a curve.'],
    ['Left sum', 'Rectangles whose heights come from the left edge of each strip.'],
    ['Right sum', 'Rectangles whose heights come from the right edge.'],
    ['Definite integral', 'The exact area, written $\\int_a^b f(x)\\,dx$.'],
    ['Accumulation', 'The total built up by a rate acting over an interval.']
  ],
  sections: [
    { h: 'Rate times time is a rectangle',
      p: ['When a rate is constant, the total is rate $\\times$ time — and on the graph that is an **area**.',
          '$30$ mph for $2$ hours is a rectangle $30$ tall and $2$ wide, and $60$ is both its area and the distance.',
          'That coincidence is not a coincidence. It is the whole idea, seen in its simplest case.'],
      box: { k: 'key', h: 'Read the units', t: 'Height in mph times width in hours gives miles. <strong>Multiplying the axis units tells you what the area means</strong> — and it is rarely area.' } },
    { h: 'Strips when the rate changes',
      p: ['Cut the interval into $n$ equal strips of width $\\dfrac{b-a}{n}$ and treat the rate as constant on each.',
          'Take the height from the left edge or the right edge — either gives an **estimate**. If the function is monotonic, the two sums bracket the integral; for a function that rises and falls, that bound need not hold.',
          'For a rising function the left sum is too small and the right sum too large.'],
      box: { k: 'slow', h: 'Two estimates are better than one', t: 'For a monotonic function, if the left and right sums are $18$ and $24$, the true integral is between them. <em>The gap tells you how far off you might be.</em>' } },
    { h: 'Why thinner is better',
      p: ['The error lives in the little triangles between each rectangle and the curve.',
          'For a straight-line graph, halving the width quarters each little triangular error, but doubles the number of strips. The <strong>total error is halved</strong>, not quartered.',
          'Let the width go to zero and the error vanishes, leaving the exact area.'],
      box: { k: 'key', h: 'The same move as last unit', t: 'Derivatives shrank a gap to zero to get a slope; integrals shrink a width to zero to get a total. <em>One limit, two uses.</em>' } },
    { h: 'Notation, and what it means',
      p: ['$\\int_a^b f(x)\\,dx$ is the exact accumulation of $f$ from $a$ to $b$.',
          'The $\\int$ is a stretched S for "sum", $f(x)$ is the height of a strip and $dx$ is its **vanishing width**.',
          'Read as a sentence: add up height times width, all the way across.'],
      box: { k: 'key', h: 'Area below the axis counts negative', t: 'A <strong>velocity</strong> graph dipping below zero means motion in the negative direction. Speed is nonnegative; integrating speed, or the absolute value of velocity, gives distance. <strong>The integral subtracts that stretch</strong>, giving displacement rather than distance travelled.' } },
    { h: 'Exact areas you can already find',
      p: ['If the graph is made of straight lines, no calculus is needed — split it into triangles and rectangles.',
          'A speed rising steadily from $0$ to $40$ over $5$ seconds traces a triangle: $\\dfrac12(5)(40) = 100$ metres.',
          'Geometry handles every straight-edged case **exactly**, and it is worth checking a Riemann sum against one.'],
      box: { k: 'slow', h: 'A free accuracy check', t: 'Run your strip method on a straight-line graph where you already know the answer. <em>If it does not converge to the right number, the method is being applied wrongly.</em>' } }
  ],
  examples: [
    { t: 'A left sum', q: 'Estimate the area under $f(x)=x^2$ from $0$ to $2$ using $4$ left rectangles.',
      steps: [
        { do: 'Width is $\\dfrac{2-0}{4} = 0.5$; left edges are $0, 0.5, 1, 1.5$.', why: 'Four strips, heights from the left.' },
        { do: 'Heights: $0, 0.25, 1, 2.25$. Sum $= 3.5$.', why: 'Square each left edge.' },
        { do: 'Area $\\approx 0.5 \\times 3.5 = 1.75$.', why: 'The true value is $\\dfrac83 \\approx 2.67$, so a left sum underestimates here.' }
      ], ans: '$1.75$' },
    { t: 'Distance from a speed graph', q: 'A car speeds up steadily from $0$ to $40$ m/s over $5$ seconds. How far does it travel?',
      steps: [
        { do: 'The speed-time graph is a triangle with base $5$ and height $40$.', why: 'Steady change means a straight line.' },
        { do: 'Area $= \\dfrac12 (5)(40)$.', why: 'No calculus needed for a straight edge.' },
        { do: '$= 100$ metres.', why: 'Same as average speed $20$ times $5$ seconds.' }
      ], ans: '$100$ m' },
    { t: 'Bracketing the answer', q: 'For an increasing function on $[1,3]$, a left sum gives $12$ and a right sum $18$. What can you say?',
      steps: [
        { do: 'For an increasing function the left sum is too small.', why: 'Each rectangle sits under the curve.' },
        { do: 'The right sum is too large, for the mirror reason.', why: 'Each rectangle pokes above.' },
        { do: 'So the exact area is between $12$ and $18$.', why: 'A midpoint estimate of $15$ would be a reasonable guess.' }
      ], ans: 'Between $12$ and $18$' }
  ],
  mistakes: [
    'Using the wrong edge heights. A left sum for four strips on $[0,2]$ takes heights at $0, 0.5, 1, 1.5$ — not at $2$. Including the right endpoint turns it into a different estimate.',
    'Forgetting to multiply by the strip width. Adding the heights gives $3.5$, but the area is $0.5 \\times 3.5 = 1.75$. The sum of heights is not an area until it is given a width.',
    'Reading the area as an area. Under a speed-time graph the units are mph times hours, which is miles. Multiply the axis units to find out what has actually been accumulated.',
    'Ignoring negative regions. A curve below the axis contributes a negative amount, so an integral can be zero for a graph with plenty of visible area.',
    'Assuming the left sum is always too small. That holds for an increasing function; for a decreasing one it is the other way round. Check which way the curve runs before deciding.'
  ]
},
{
  id: 'decimalops', strand: 'number', fig: 'decimalPlace',
  title: 'Decimals & Long Division',
  big: 'Place value carries on past the point, which is why the old methods still work.',
  discover: [
    '**A bill for $\\$47.85$, split five ways.**',
    'You already know how to divide $47$ by $5$: it goes nine times with $2$ left over.',
    { fig: 'discDecimalops' },
    'That leftover $\\$2.85$ still has to be shared. It does not vanish because the whole dollars ran out.',
    'Keep going past the point and you get $\\$9.57$ each. **Nothing new happened** — the columns just carried on.',
    { punch: 'A decimal point is not a barrier. Each column is a tenth of the one before it, all the way down, so every method you learned for whole numbers keeps working.' }
  ],
  funfact: [
    'The decimal point is only about four hundred years old. Before that people wrote awkward fractions, and long division was a specialist skill.',
    'Different countries put it in different places: much of Europe writes $47{,}85$ with a comma, which is why international forms often say which they mean.',
    'A calculator storing $\\dfrac13$ as $0.333333$ is always slightly wrong, which is why bank software works in whole cents rather than decimals.'
  ],
  vocab: [
    ['Place value', 'What each digit is worth, depending on its column.'],
    ['Dividend', 'The number being divided — the one under the bar.'],
    ['Divisor', 'The number you are dividing by.'],
    ['Quotient', 'The answer to a division.'],
    ['Terminating decimal', 'One that stops, like $0.75$, rather than repeating forever.']
  ],
  sections: [
    { h: 'Lining up the point',
      p: ['To add or subtract decimals, line up the **points**, not the ends of the numbers.',
          '$4.5 + 12.35$ needs the $4.5$ written as $4.50$ so the columns match.',
          'Adding a zero on the end changes nothing, because there were already no hundredths there.'],
      box: { k: 'warn', h: 'Ends do not line up, points do', t: 'Writing $4.5$ under $12.35$ flush right puts the $5$ in the hundredths column. <strong>That turns $4.5$ into $0.45$</strong> without you noticing.' } },
    { h: 'Multiplying: count the places',
      p: ['Ignore the points, multiply as whole numbers, then **count the decimal places** in both original numbers.',
          '$0.3 \\times 0.4$: $3 \\times 4 = 12$, and there are two decimal places altogether, so the answer is $0.12$.',
          'It is smaller than either number, because multiplying by less than one shrinks things.'],
      box: { k: 'slow', h: 'Estimate as a check', t: '$0.3 \\times 0.4$ is roughly a third of a half, so well under one. <em>An answer of $1.2$ would fail that check immediately.</em>' } },
    { h: 'Dividing by a decimal',
      p: ['Divide by a whole number if you possibly can — so move the point in the **divisor** until it is whole.',
          'Move it the same number of places in the dividend and the answer is unchanged, since you have scaled both by the same power of ten.',
          '$1.44 \\div 0.6$ becomes $14.4 \\div 6 = 2.4$.'],
      box: { k: 'key', h: 'Both or neither', t: 'Moving the point in only one number changes the answer by a factor of ten. <strong>Whatever you do to one, do to the other.</strong>' } },
    { h: 'Long division that does not stop',
      p: ['When there is a remainder, add a decimal point and zeros to the dividend and **carry on**.',
          '$47 \\div 5$: nine, remainder two. Bring down a zero to make twenty tenths, which is four tenths each.',
          'Some divisions stop; others repeat forever, like $1 \\div 3 = 0.333\\ldots$'],
      box: { k: 'key', h: 'The point goes straight up', t: 'Put the decimal point in the answer directly above the one in the dividend, before you start. <em>Then the columns look after themselves.</em>' } },
    { h: 'Decimals, fractions and money',
      p: ['$0.75$ means $\\dfrac{75}{100}$, which simplifies to $\\dfrac34$. **Reading the place value gives the fraction.**',
          'To go the other way, divide: $\\dfrac38 = 3 \\div 8 = 0.375$.',
          'Money is just decimals with two places, which is why every rule here applies to a till receipt.'],
      box: { k: 'slow', h: 'Rounding money', t: 'Bills are given to the nearest cent, so $9.57$ each is $\\$47.85$ exactly. <em>Not every split works out so neatly</em>, and then somebody pays the extra penny.' } }
  ],
  examples: [
    { t: 'Adding', q: 'Work out $4.5 + 12.35$.',
      steps: [
        { do: 'Write $4.50$ so both have two decimal places.', why: 'The extra zero changes nothing.' },
        { do: 'Line up the points and add column by column.', why: 'Hundredths, then tenths, then ones.' },
        { do: '$4.50 + 12.35 = 16.85$.', why: 'Roughly $4 + 12 = 16$, so this is sensible.' }
      ], ans: '$16.85$' },
    { t: 'Dividing by a decimal', q: 'Work out $1.44 \\div 0.6$.',
      steps: [
        { do: 'Move the point one place right in $0.6$ to make it $6$.', why: 'Dividing by a whole number is far easier.' },
        { do: 'Do the same to $1.44$, giving $14.4$.', why: 'Both scaled by ten, so the answer is unchanged.' },
        { do: '$14.4 \\div 6 = 2.4$.', why: 'Check: $2.4 \\times 0.6 = 1.44$.' }
      ], ans: '$2.4$' },
    { t: 'Splitting a bill', q: 'Share $\\$47.85$ equally among $5$ people.',
      steps: [
        { do: '$47 \\div 5 = 9$ with $2$ left over.', why: 'Whole dollars first.' },
        { do: 'The $\\$2.85$ left is $285$ cents; $285 \\div 5 = 57$.', why: 'Carry on past the point.' },
        { do: 'So each person pays $\\$9.57$.', why: 'Check: $9.57 \\times 5 = 47.85$.' }
      ], ans: '$\\$9.57$' }
  ],
  mistakes: [
    'Lining up the right-hand ends instead of the points. Writing $4.5$ flush right under $12.35$ puts the $5$ in the hundredths column, silently turning it into $0.45$. Line up the points and pad with zeros.',
    'Losing a decimal place when multiplying. $0.3 \\times 0.4$ is $0.12$, not $1.2$ — there are two decimal places in the question, so there must be two in the answer.',
    'Moving the point in only one number when dividing. $1.44 \\div 0.6$ becomes $14.4 \\div 6$, not $1.44 \\div 6$. Both numbers must be scaled by the same amount.',
    'Stopping at the remainder. $47 \\div 5$ is $9.4$, not "$9$ remainder $2$", when the question is about money or measurement. Add a point and zeros and keep going.',
    'Assuming multiplying always makes things bigger. $0.3 \\times 0.4 = 0.12$ is smaller than both. Multiplying by less than one shrinks.'
  ]
},
{
  id: 'fracdiv', strand: 'number', fig: 'fractionBars',
  title: 'Dividing Fractions',
  big: 'Dividing asks how many of these fit into that, and the answer can be bigger than you started with.',
  discover: [
    '**How many quarter-cup scoops fill three cups?**',
    'Twelve. You can count them: four scoops per cup, three cups.',
    { fig: 'discFracdiv' },
    'So $3 \\div \\dfrac14 = 12$. The answer is **bigger** than the three you started with.',
    'That feels wrong, because dividing is supposed to make things smaller. Here it did not.',
    { punch: 'Dividing asks how many fit. Small things fit lots of times, so dividing by something under one always gives a bigger answer — and multiplying by the flipped fraction does exactly that.' }
  ],
  funfact: [
    'The rule "invert and multiply" has been taught for centuries, and generations have learned it without ever being told why it works.',
    'It works because dividing by $\\dfrac14$ and multiplying by $4$ ask the same question: how many quarters are in it?',
    'Recipes are the commonest place people meet this outside school — halving a recipe that calls for $\\dfrac23$ of a cup needs exactly this arithmetic.'
  ],
  vocab: [
    ['Reciprocal', 'The fraction turned upside down. The reciprocal of $\\dfrac34$ is $\\dfrac43$.'],
    ['Dividend', 'The number being divided.'],
    ['Divisor', 'The number you are dividing by — the one that gets flipped.'],
    ['Mixed number', 'A whole number with a fraction, like $2\\dfrac12$.'],
    ['Improper fraction', 'One whose top is bigger than its bottom, like $\\dfrac52$.']
  ],
  sections: [
    { h: 'What dividing really asks',
      p: ['$12 \\div 3$ asks how many threes fit into twelve. **Dividing by a fraction asks the same question.**',
          '$3 \\div \\dfrac14$ asks how many quarters fit into three, and the answer is twelve.',
          'Reading division this way makes the surprising answers stop being surprising.'],
      box: { k: 'key', h: 'Small divisor, big answer', t: 'Dividing by something under one always gives an answer <strong>bigger</strong> than what you started with, because small pieces fit in many times.' } },
    { h: 'Flip and multiply',
      p: ['To divide by a fraction, **flip it over** and multiply instead.',
          '$\\dfrac34 \\div \\dfrac12 = \\dfrac34 \\times \\dfrac21 = \\dfrac64 = \\dfrac32$.',
          'Only the second fraction flips. The first one is left exactly as it is.'],
      box: { k: 'warn', h: 'Only the divisor flips', t: 'Flipping both gives a completely different answer. <strong>The one being divided by is the one that turns over</strong>, and it is always the second.' } },
    { h: 'Why flipping works',
      p: ['Dividing by $\\dfrac14$ means asking how many quarters fit — and there are **four in every whole**.',
          'So dividing by $\\dfrac14$ and multiplying by $4$ are two ways of asking one question.',
          'The same reasoning works for any fraction, which is why the rule is not a trick.'],
      box: { k: 'slow', h: 'Check with a picture', t: 'Draw the whole, cut it into the pieces named by the divisor, and count. <em>For small numbers the picture is faster than the rule.</em>' } },
    { h: 'Mixed numbers first',
      p: ['A mixed number cannot be flipped as it stands, so turn it into an **improper fraction** first.',
          '$2\\dfrac12$ becomes $\\dfrac52$; its reciprocal is $\\dfrac25$.',
          'Convert, divide, then change back to a mixed number at the end if the question asked for one.'],
      box: { k: 'key', h: 'Convert before flipping', t: 'Flipping $2\\dfrac12$ to get $\\dfrac12 2$ is meaningless. <em>Improper fractions exist exactly so that this step is possible.</em>' } },
    { h: 'Word problems',
      p: ['Ask which number is being cut up and which is doing the cutting. The **cutter is the divisor**.',
          '"How many $\\dfrac34$-metre pieces from $6$ metres?" divides $6$ by $\\dfrac34$, giving $8$.',
          'If the answer comes out smaller than expected, the two numbers may be the wrong way round.'],
      box: { k: 'slow', h: 'Sanity-check the size', t: 'Cutting $6$ metres into pieces under a metre must give <em>more than six pieces</em>. An answer of $4.5$ means the division went the wrong way.' } }
  ],
  examples: [
    { t: 'Fraction by fraction', q: 'Work out $\\dfrac34 \\div \\dfrac12$.',
      steps: [
        { do: 'Flip the second fraction: $\\dfrac12$ becomes $\\dfrac21$.', why: 'Only the divisor turns over.' },
        { do: 'Multiply: $\\dfrac34 \\times \\dfrac21 = \\dfrac64$.', why: 'Tops together, bottoms together.' },
        { do: 'Simplify to $\\dfrac32$, or $1\\dfrac12$.', why: 'How many halves in three quarters? One and a half.' }
      ], ans: '$\\dfrac32$' },
    { t: 'A mixed number', q: 'Work out $2\\dfrac12 \\div \\dfrac34$.',
      steps: [
        { do: 'Convert: $2\\dfrac12 = \\dfrac52$.', why: 'Mixed numbers cannot be flipped as they stand.' },
        { do: 'Flip the divisor and multiply: $\\dfrac52 \\times \\dfrac43 = \\dfrac{20}{6}$.', why: 'Only the second one flips.' },
        { do: 'Simplify to $\\dfrac{10}{3} = 3\\dfrac13$.', why: 'Bigger than $2\\dfrac12$, as dividing by a fraction under one must be.' }
      ], ans: '$3\\dfrac13$' },
    { t: 'A word problem', q: 'How many $\\dfrac34$-metre ribbons can be cut from $6$ metres?',
      steps: [
        { do: 'The ribbon length is doing the cutting, so it is the divisor.', why: '$6 \\div \\dfrac34$.' },
        { do: 'Flip and multiply: $6 \\times \\dfrac43 = \\dfrac{24}{3}$.', why: 'The $6$ is $\\dfrac61$.' },
        { do: '$= 8$ ribbons.', why: 'More than six, since each piece is under a metre.' }
      ], ans: '$8$' }
  ],
  mistakes: [
    'Flipping the wrong fraction. In $\\dfrac34 \\div \\dfrac12$ only the $\\dfrac12$ turns over. Flipping the first instead gives $\\dfrac23$, which is not even close to the correct $\\dfrac32$.',
    'Flipping both fractions. That undoes itself and answers a different question entirely — the rule turns over the divisor alone.',
    'Trying to flip a mixed number directly. $2\\dfrac12$ must become $\\dfrac52$ first; there is no sensible way to invert a whole number sitting beside a fraction.',
    'Expecting the answer to shrink. $3 \\div \\dfrac14 = 12$, because twelve quarters fit into three. Dividing by anything under one makes the answer bigger.',
    'Dividing the wrong way round in a word problem. Cutting $6$ metres into $\\dfrac34$-metre pieces is $6 \\div \\dfrac34 = 8$, not $\\dfrac34 \\div 6$. The piece length is the divisor.'
  ]
},
{
  id: 'integers6', strand: 'number', fig: 'integerLine',
  title: 'Integers & Absolute Value',
  big: 'Below zero is a direction, and how far from zero is a separate question.',
  discover: [
    '**Monday morning was $-2°$. Tuesday was $-5°$. Which was colder?**',
    'Tuesday. Everyone knows that from standing outside, even before any arithmetic.',
    { fig: 'discIntegers6' },
    'But $5$ is bigger than $2$, so on the number line $-5$ sits **further left** — and further left means smaller.',
    'So $-5 < -2$, even though $5 > 2$. The minus sign reverses the order.',
    { punch: 'Two different questions hide here: which is smaller, and which is further from zero. Tuesday is colder and also further from zero, and keeping those apart is what this unit is about.' }
  ],
  funfact: [
    'Negative numbers were resisted for centuries. European mathematicians called them "absurd" as late as the 1700s, though Chinese accountants had used them since about 200 BC.',
    'Bank statements, lifts, golf scores and sea level all use them, and each one has its own word for below zero.',
    'The absolute value bars were introduced by Weierstrass in 1841 — remarkably recent for something so basic.'
  ],
  vocab: [
    ['Integer', 'A whole number, positive, negative or zero. No fractions.'],
    ['Opposite', 'The same distance from zero, on the other side. The opposite of $-7$ is $7$.'],
    ['Absolute value', 'Distance from zero, written $|{-}7| = 7$. Never negative.'],
    ['Number line', 'A line with numbers increasing to the right.'],
    ['Inequality', 'A statement that one number is less than or greater than another.']
  ],
  sections: [
    { h: 'Reading the number line',
      p: ['Numbers get bigger as you move **right** and smaller as you move left. That rule never changes.',
          'So $-5$ is less than $-2$, because it sits further left, and $-1$ is less than $0$.',
          'Any two numbers can be compared just by seeing which is further right.'],
      box: { k: 'warn', h: 'The minus reverses the order', t: '$5 > 2$ but $-5 < -2$. <strong>Comparing the digits and ignoring the sign is the commonest mistake here</strong>, and a quick sketch of the line prevents it.' } },
    { h: 'Opposites',
      p: ['Every number has an opposite the same distance from zero on the other side.',
          'The opposite of $7$ is $-7$; the opposite of $-7$ is $7$. Zero is **its own opposite**.',
          'Adding a number to its opposite always gives zero, which is why they cancel.'],
      box: { k: 'key', h: 'Two minuses', t: '$-(-4)$ means the opposite of $-4$, which is $4$. <em>The second minus reverses the first.</em>' } },
    { h: 'Absolute value is a distance',
      p: ['$|{-}7|$ asks only **how far** from zero, not which side. The answer is $7$.',
          'Distance is never negative, so an absolute value is never negative either.',
          'That is why $|{-}7|$ and $|7|$ are equal: the two numbers are the same distance out.'],
      box: { k: 'slow', h: 'Two questions, kept apart', t: '"Which is smaller?" and "which is further from zero?" have different answers for negatives. <strong>$-9$ is smaller than $-2$ but further from zero.</strong>' } },
    { h: 'Where negatives turn up',
      p: ['Temperature below zero, floors below ground, money owed, depths below sea level, golf under par.',
          'In each case the negative is a **direction**, not a smaller amount.',
          'A debt of $\\$50$ is written $-50$, and it is a larger debt than $-20$ even though the number is smaller.'],
      box: { k: 'key', h: 'Read what zero means', t: 'Zero is sea level, or ground floor, or breaking even. <em>Knowing what zero stands for tells you what the negatives mean.</em>' } },
    { h: 'Ordering a mixed list',
      p: ['Put them on a line rather than trying to sort them in your head.',
          'Mark zero first, then place the negatives to the left and the positives to the right.',
          'Reading left to right gives the order, **smallest first**, with no guesswork.'],
      box: { k: 'slow', h: 'Fractions too', t: '$-\\dfrac12$ sits between $-1$ and $0$. <em>The line handles fractions and decimals just as happily as whole numbers.</em>' } }
  ],
  examples: [
    { t: 'Comparing', q: 'Which is smaller, $-8$ or $-3$?',
      steps: [
        { do: 'Sketch the line and mark both.', why: '$-8$ is further left.' },
        { do: 'Further left means smaller.', why: 'The digits alone would mislead here.' },
        { do: 'So $-8 < -3$.', why: 'Though $|{-}8| = 8$ is the larger distance from zero.' }
      ], ans: '$-8$' },
    { t: 'Absolute value', q: 'Work out $|{-}12| + |5|$.',
      steps: [
        { do: '$|{-}12| = 12$, since it is $12$ steps from zero.', why: 'Distance, not direction.' },
        { do: '$|5| = 5$.', why: 'Already positive, so unchanged.' },
        { do: '$12 + 5 = 17$.', why: 'Both bars had to be resolved before adding.' }
      ], ans: '$17$' },
    { t: 'Ordering', q: 'Put $-4$, $2$, $-7$, $0$ and $-1$ in order, smallest first.',
      steps: [
        { do: 'Mark zero, then place the negatives to its left.', why: '$-7$, $-4$, $-1$ in that order going right.' },
        { do: 'Place $2$ to the right of zero.', why: 'The only positive.' },
        { do: 'Read off left to right: $-7, -4, -1, 0, 2$.', why: 'The line does the sorting.' }
      ], ans: '$-7, -4, -1, 0, 2$' }
  ],
  mistakes: [
    'Comparing negatives by their digits. $-8$ is smaller than $-3$, even though $8$ is bigger than $3$. The minus sign reverses the order, and a sketch of the number line settles it every time.',
    'Giving a negative absolute value. $|{-}7| = 7$, never $-7$ — it measures distance from zero, and a distance is never negative.',
    'Confusing "smaller" with "closer to zero". $-9$ is smaller than $-2$ but further from zero. The two questions have opposite answers for negatives.',
    'Reading $-(-4)$ as $-4$. The outer minus takes the opposite, so the answer is $4$. Two minuses undo each other.',
    'Thinking a debt of $-50$ is smaller than a debt of $-20$ in ordinary language. As a number it is smaller; as a debt it is larger, and word problems rely on that distinction.'
  ]
},
{
  id: 'coordplane', strand: 'geometry', fig: 'distancePlane',
  title: 'The Coordinate Plane',
  big: 'Two numbers pin down any point, once you agree which one comes first.',
  discover: [
    '**Give directions from the town hall without naming a single street.**',
    '"Four blocks east, three blocks south." That is enough for anyone to find the spot.',
    { fig: 'discCoordplane' },
    'Write it as $(4, -3)$. The minus does not mean a shorter walk — it means **the other way**.',
    'Go the opposite way on both and you get $(-3, 2)$: three blocks west, two north.',
    { punch: 'Two numbers and one agreement — across before up — locate any point on the plane. The four quadrants are just the four combinations of signs.' }
  ],
  funfact: [
    'Descartes is said to have thought of this while watching a fly on his ceiling, and wondering how to describe exactly where it was.',
    'Every digital map, every game world and every spreadsheet cell reference uses the same idea.',
    'Latitude and longitude are coordinates on a sphere, and they follow the same convention of naming a direction with a sign.'
  ],
  vocab: [
    ['Origin', 'The point $(0,0)$ where the two axes cross.'],
    ['x-coordinate', 'The first number — how far across.'],
    ['y-coordinate', 'The second number — how far up or down.'],
    ['Quadrant', 'One of the four regions the axes divide the plane into.'],
    ['Reflection', 'A flip across an axis, which changes the sign of one coordinate.']
  ],
  sections: [
    { h: 'Across before up',
      p: ['The first number always tells you **how far across**, the second how far up.',
          '$(4, -3)$ means four right and three down; $(-3, 4)$ is a different point entirely.',
          'Alphabetical order helps: $x$ before $y$, across before up.'],
      box: { k: 'warn', h: 'Order is everything', t: '$(2, 5)$ and $(5, 2)$ are different places. <strong>Swapping them reflects the point across the diagonal</strong>, which is rarely what anybody meant.' } },
    { h: 'The four quadrants', fig: 'quadrantSigns',
      p: ['The axes cut the plane into four regions, numbered anticlockwise from the top right.',
          'Quadrant I has both coordinates positive; II has $x$ negative; III has **both negative**; IV has $y$ negative.',
          'Knowing the signs tells you the quadrant without plotting anything.'],
      box: { k: 'key', h: 'Signs name the region', t: 'A point with a negative $x$ and a positive $y$ is up and to the left — quadrant II, every time.' } },
    { h: 'Points on the axes',
      p: ['A point on the $x$-axis has $y = 0$, because it is neither up nor down.',
          'A point on the $y$-axis has $x = 0$. The origin has **both** zero.',
          'Points on an axis belong to no quadrant — the quadrants are the regions between the axes.'],
      box: { k: 'slow', h: 'Zero is a real coordinate', t: '$(0, -4)$ is a genuine point, four below the origin on the $y$-axis. <em>It is not "nowhere" and it is not in quadrant IV.</em>' } },
    { h: 'Reflections', fig: 'pointMirrorAxes',
      p: ['Flipping across the $x$-axis changes the sign of $y$ and leaves $x$ alone.',
          'Flipping across the $y$-axis changes the sign of $x$. **Only the coordinate that had to move changes.**',
          'So $(3, 5)$ reflected in the $x$-axis is $(3, -5)$.'],
      box: { k: 'key', h: 'Which axis, which sign', t: 'Reflecting <em>in</em> the $x$-axis changes $y$. It feels backwards, but the $x$-axis is the mirror, so the across-distance stays put.' } },
    { h: 'Distance between points',
      p: ['If two points share an $x$-coordinate, the distance between them is the gap in the $y$ values.',
          'Count the steps on the grid, or subtract — but subtract the **smaller from the larger**, since distance is never negative.',
          'From $(2, -3)$ to $(2, 5)$ is $5 - (-3) = 8$ units.'],
      box: { k: 'slow', h: 'Crossing zero', t: 'Going from $-3$ to $5$ covers three steps up to zero and five more beyond it. <strong>That is eight, not two</strong>, which subtracting carefully also gives.' } }
  ],
  examples: [
    { t: 'Naming a quadrant', q: 'In which quadrant does $(-6, -2)$ lie?',
      steps: [
        { do: 'The $x$ is negative, so the point is left of the $y$-axis.', why: 'First number, across.' },
        { do: 'The $y$ is negative, so it is below the $x$-axis.', why: 'Second number, up or down.' },
        { do: 'Left and down is quadrant III.', why: 'Numbering runs anticlockwise from the top right.' }
      ], ans: 'Quadrant III' },
    { t: 'Reflecting', q: 'Reflect $(3, 5)$ across the $x$-axis.',
      steps: [
        { do: 'The $x$-axis is the mirror, so the across-distance is unchanged.', why: '$x$ stays $3$.' },
        { do: 'The point flips from above to below, so $y$ changes sign.', why: '$5$ becomes $-5$.' },
        { do: 'The image is $(3, -5)$.', why: 'Same distance from the axis, other side.' }
      ], ans: '$(3, -5)$' },
    { t: 'Distance', q: 'How far is it from $(2, -3)$ to $(2, 5)$?',
      steps: [
        { do: 'Both have $x = 2$, so this is a vertical distance.', why: 'Only the $y$ values differ.' },
        { do: 'Subtract the smaller from the larger: $5 - (-3)$.', why: 'Two minuses make a plus.' },
        { do: '$= 8$ units.', why: 'Count on the grid to check: three up to zero, then five more.' }
      ], ans: '$8$' }
  ],
  mistakes: [
    'Plotting the coordinates in the wrong order. $(2,5)$ is two across and five up; $(5,2)$ is a different point. The first number is always the across one.',
    'Reading a negative coordinate as a shorter distance. $(-3, 2)$ is three blocks <em>west</em>, not a smaller number of blocks east.',
    'Changing the wrong sign when reflecting. Reflecting in the $x$-axis changes $y$, because the $x$-axis is the mirror and across-distances do not move.',
    'Putting points on an axis into a quadrant. $(0,-4)$ lies on the $y$-axis and belongs to no quadrant at all.',
    'Subtracting the wrong way for distance. From $-3$ to $5$ is $8$ units; writing $-3 - 5 = -8$ gives a negative, and a distance is never negative.'
  ]
},
{
  id: 'ratios6', strand: 'ratio', fig: 'doubleNumberLine',
  title: 'Ratios & Ratio Tables',
  big: 'A ratio compares two amounts, and scaling both by the same factor leaves it unchanged.',
  discover: [
    '**Mix two tins of blue paint with three of yellow.**',
    'You get a particular green. Now mix four blue with six yellow.',
    { fig: 'discRatios6' },
    'It is **the same green**. Twice as much of it, but not a shade different.',
    'The amounts changed and the colour did not, because both were doubled together.',
    { punch: 'That is what a ratio captures: the relationship between the amounts, not the amounts themselves. $2:3$ and $4:6$ are two names for one recipe.' }
  ],
  funfact: [
    'Ratios are how every recipe scales, how maps work, and how paint is mixed in shops — the machine adds pigment in a fixed ratio whatever the tin size.',
    'The colon in $2:3$ was first used for ratios in the 1600s, borrowed from the punctuation mark.',
    'Screen sizes are ratios: a 16:9 television and a 32:18 one would be exactly the same shape.'
  ],
  vocab: [
    ['Ratio', 'A comparison of two amounts, written $a : b$.'],
    ['Equivalent ratios', 'Ratios naming the same relationship, like $2:3$ and $4:6$.'],
    ['Ratio table', 'A table of equivalent ratios, useful for scaling up or down.'],
    ['Part-to-part', 'Comparing one part with another, like blue to yellow.'],
    ['Part-to-whole', 'Comparing one part with the total, like blue to all the paint.']
  ],
  sections: [
    { h: 'Reading a ratio',
      p: ['$2 : 3$ means two of the first for every three of the second. **Order matters** as much as it does in coordinates.',
          'Blue to yellow $2:3$ is a different instruction from yellow to blue $2:3$.',
          'Always write down which is which before doing anything else.'],
      box: { k: 'warn', h: 'Name the parts', t: 'A ratio with no labels is ambiguous. <strong>Write "blue : yellow" above the numbers</strong> and half the errors in this unit disappear.' } },
    { h: 'Equivalent ratios',
      p: ['Multiply both parts by the same number and the ratio is unchanged: $2:3 = 4:6 = 10:15$.',
          'Divide both by the same number and it is still unchanged, which is how you **simplify**.',
          '$12:18$ divides by $6$ to give $2:3$, the simplest form.'],
      box: { k: 'key', h: 'Both parts, same number', t: 'Adding to both parts does <em>not</em> keep a ratio: $2:3$ plus one each gives $3:4$, a different mixture entirely.' } },
    { h: 'Ratio tables',
      p: ['Write the two quantities as rows and fill in equivalent columns by scaling.',
          'Each new column is the first one times something, so you can **jump straight** to the number you need.',
          'Tables make the arithmetic visible and are much harder to get backwards than a remembered rule.'],
      box: { k: 'slow', h: 'Go through one', t: 'Finding the amount for a single unit first — the unit rate — lets you reach any other amount in one step.' } },
    { h: 'Part-to-part and part-to-whole',
      p: ['With $2$ blue to $3$ yellow, the **total** is $5$ parts.',
          'So blue to yellow is $2:3$, but blue to the whole mixture is $2:5$.',
          'A question asking "what fraction is blue?" wants $\\dfrac25$, not $\\dfrac23$.'],
      box: { k: 'warn', h: 'Add the parts first', t: 'The total is nowhere in the ratio as written. <strong>$2:3$ hides the $5$</strong>, and most word problems need it.' } },
    { h: 'Sharing in a ratio',
      p: ['To share $\\$40$ in the ratio $3:5$, add the parts to get $8$, then find one part: $\\$5$.',
          'Then multiply: three parts is $\\$15$ and five parts is $\\$25$.',
          'Check by adding — the shares must **come back to the total**.'],
      box: { k: 'key', h: 'One part first', t: 'Dividing the total by the sum of the parts gives the value of a single part. <em>Everything else is one multiplication away.</em>' } }
  ],
  examples: [
    { t: 'Simplifying', q: 'Write the ratio $12 : 18$ in its simplest form.',
      steps: [
        { do: 'Find the largest number dividing both: $6$.', why: 'The greatest common factor.' },
        { do: 'Divide both parts: $12 \\div 6 = 2$ and $18 \\div 6 = 3$.', why: 'Both parts, same number.' },
        { do: 'So $12:18 = 2:3$.', why: 'The relationship is unchanged.' }
      ], ans: '$2:3$' },
    { t: 'Scaling up', q: 'A recipe uses $2$ cups of flour to $3$ eggs. How much flour for $12$ eggs?',
      steps: [
        { do: '$12 \\div 3 = 4$, so the eggs have been multiplied by four.', why: 'Find the scale factor.' },
        { do: 'Multiply the flour by four as well: $2 \\times 4$.', why: 'Both parts, same number.' },
        { do: '$= 8$ cups.', why: 'Check: $8:12$ simplifies back to $2:3$.' }
      ], ans: '$8$ cups' },
    { t: 'Sharing', q: 'Share $\\$40$ between two people in the ratio $3:5$.',
      steps: [
        { do: 'Add the parts: $3 + 5 = 8$.', why: 'The total is divided into eight parts.' },
        { do: 'One part is $\\$40 \\div 8 = \\$5$.', why: 'Find a single part first.' },
        { do: 'So the shares are $3 \\times 5 = \\$15$ and $5 \\times 5 = \\$25$.', why: 'They add to $\\$40$, as they must.' }
      ], ans: '$\\$15$ and $\\$25$' }
  ],
  mistakes: [
    'Adding to both parts instead of multiplying. $2:3$ is not equivalent to $3:4$ — adding one to each changes the mixture. Only multiplying or dividing both by the same number keeps a ratio.',
    'Confusing part-to-part with part-to-whole. With $2$ blue to $3$ yellow, blue is $\\dfrac25$ of the mixture, not $\\dfrac23$. The total has to be worked out; it is not written in the ratio.',
    'Writing the parts in the wrong order. "Blue to yellow is $2:3$" and "yellow to blue is $2:3$" describe different paints. Label the parts before writing the numbers.',
    'Scaling only one part. Doubling the eggs without doubling the flour changes the recipe. Whatever is done to one part must be done to the other.',
    'Forgetting to check the total when sharing. Shares of $\\$15$ and $\\$25$ come back to $\\$40$; if they do not, the value of one part was wrong.'
  ]
},
{
  id: 'unitrates', strand: 'ratio', fig: 'proportionalLine',
  title: 'Unit Rates & Better Buys',
  big: 'Reduce everything to one of something, and comparisons become obvious.',
  discover: [
    '**A 12 oz jar costs $\\$3.00$. An 18 oz jar costs $\\$4.05$.**',
    'The big one costs more, and holds more. So which is the better deal?',
    { fig: 'discUnitrates' },
    'The prices cannot be compared directly, because they are not buying **the same thing**.',
    'Nor can the sizes. Every comparison here is between two things that differ in two ways at once.',
    { punch: 'So make them the same: price for one ounce. $25$ cents against $22.5$ cents, and the question answers itself. A unit rate is a common footing.' }
  ],
  funfact: [
    'Shops in many countries are required by law to print the unit price on the shelf label, precisely because shoppers cannot do this comparison in their heads.',
    'The bigger package is usually but not always cheaper per unit — shops rely on the assumption, and occasionally break it.',
    'Speed, wages, fuel economy and exchange rates are all unit rates: something per one of something else.'
  ],
  vocab: [
    ['Rate', 'A comparison of two quantities with different units, like miles per hour.'],
    ['Unit rate', 'A rate with a denominator of one — per hour, per ounce, per item.'],
    ['Better buy', 'The option with the lower unit price.'],
    ['Constant speed', 'A rate that does not change, so distance and time stay proportional.'],
    ['Conversion factor', 'A rate used to change units, like $12$ inches per foot.']
  ],
  sections: [
    { h: 'Making it "per one"',
      p: ['To find a unit rate, **divide by the second quantity** so that it becomes one.',
          '$\\$3.00$ for $12$ oz is $3.00 \\div 12 = \\$0.25$ per ounce.',
          'The units tell you which way to divide: "per ounce" means dollars divided by ounces.'],
      box: { k: 'key', h: 'Read the word "per"', t: '"Per" means divided by. <strong>Dollars per ounce is dollars $\\div$ ounces</strong>, and getting that backwards gives ounces per dollar — a different, though still useful, number.' } },
    { h: 'Comparing buys',
      p: ['Work out the price per unit for each option, then compare those two numbers.',
          'The **smaller** price per unit is the better buy, whatever the packet size.',
          '$\\$0.25$ per ounce against $\\$0.225$ per ounce makes the larger jar the winner.'],
      box: { k: 'slow', h: 'Or go the other way', t: 'Ounces per dollar works too — and there the <em>larger</em> number wins. <strong>Just be clear which you computed</strong> before deciding.' } },
    { h: 'Speed and other rates',
      p: ['Speed is distance per unit time: $210$ miles in $3$ hours is $70$ miles per hour.',
          'Once you have the unit rate, any other amount is **one multiplication** away.',
          '$70$ mph for $5$ hours covers $350$ miles.'],
      box: { k: 'key', h: 'Two steps, always', t: 'Divide to find the rate for one, then multiply to reach the amount you want. <em>That pattern solves nearly every rate problem.</em>' } },
    { h: 'Converting units',
      p: ['A conversion is a rate: $12$ inches per foot, $60$ minutes per hour, $100$ centimetres per metre.',
          'Multiply or divide depending on which way you are going, and let the **size of the answer** check you.',
          'Changing metres to centimetres should give a bigger number, since centimetres are smaller.'],
      box: { k: 'warn', h: 'Smaller units, bigger number', t: 'Measuring the same length in smaller units needs more of them. <strong>If your answer shrank, you divided when you should have multiplied.</strong>' } },
    { h: 'Rates that are not constant',
      p: ['A unit rate assumes the relationship is steady all the way through.',
          'If a shop gives a discount on bulk, the price per ounce **changes** with the size, and one unit rate will not describe both.',
          'Check whether the situation really is steady before relying on a single rate.'],
      box: { k: 'slow', h: 'Average is not always constant', t: 'A car averaging $60$ mph may never have driven at $60$. <em>The average rate is still useful; it simply is not the whole story.</em>' } }
  ],
  examples: [
    { t: 'Better buy', q: 'A $12$ oz jar costs $\\$3.00$; an $18$ oz jar costs $\\$4.05$. Which is the better buy?',
      steps: [
        { do: 'Small jar: $3.00 \\div 12 = \\$0.25$ per ounce.', why: 'Dollars divided by ounces.' },
        { do: 'Large jar: $4.05 \\div 18 = \\$0.225$ per ounce.', why: 'Same calculation, same units.' },
        { do: '$0.225 < 0.25$, so the large jar is better.', why: 'Lower price per unit wins.' }
      ], ans: 'The $18$ oz jar' },
    { t: 'Speed', q: 'A car travels $210$ miles in $3$ hours. How far in $5$ hours at the same speed?',
      steps: [
        { do: 'Unit rate: $210 \\div 3 = 70$ miles per hour.', why: 'Divide to get "per one hour".' },
        { do: 'Multiply by the new time: $70 \\times 5$.', why: 'The second step of every rate problem.' },
        { do: '$= 350$ miles.', why: 'Sensible: five hours is more than three, so further.' }
      ], ans: '$350$ miles' },
    { t: 'Converting', q: 'How many centimetres are in $2.5$ metres?',
      steps: [
        { do: 'There are $100$ centimetres per metre.', why: 'The conversion rate.' },
        { do: 'Centimetres are smaller, so the number should grow: multiply.', why: 'A check before calculating.' },
        { do: '$2.5 \\times 100 = 250$ cm.', why: 'Bigger number, smaller unit — as expected.' }
      ], ans: '$250$ cm' }
  ],
  mistakes: [
    'Comparing prices without comparing sizes. A $\\$4.05$ jar is dearer than a $\\$3.00$ one and still the better buy, because it holds half as much again. Reduce both to a price per unit first.',
    'Dividing the wrong way round. Dollars per ounce is dollars $\\div$ ounces. Doing it the other way gives ounces per dollar, where the <em>bigger</em> number is the better buy — correct, but the opposite rule.',
    'Multiplying when converting to a larger unit. Metres to centimetres multiplies by $100$; centimetres to metres divides. If the number went the wrong way, so did the operation.',
    'Stopping at the unit rate. Finding $70$ mph answers only half of "how far in five hours" — the rate then has to be multiplied by the new time.',
    'Assuming a rate stays constant. A bulk discount means the price per ounce changes with size, so one unit rate cannot describe both packets.'
  ]
},
{
  id: 'percent6', strand: 'ratio', fig: 'percentGrid',
  title: 'Percents',
  big: 'Per cent means per hundred, so every percent is a fraction with a hundred underneath.',
  discover: [
    '**Shade sixty-three squares of a hundred-square grid.**',
    'How much is shaded? Sixty-three out of a hundred — which is what "sixty-three per cent" says out loud.',
    { fig: 'discPercent6' },
    'The same picture is also $\\dfrac{63}{100}$, and also $0.63$. **One grid, three names.**',
    'Nothing has been converted. They were always the same amount, written differently.',
    { punch: 'A percent is not a new kind of number. It is a fraction whose bottom is always a hundred, which is exactly what makes percents easy to compare.' }
  ],
  funfact: [
    '"Per cent" is Latin for "by the hundred". Roman emperors levied a tax of $\\dfrac{1}{100}$ on goods sold, and the idea stuck.',
    'The $\\%$ symbol evolved from a scribbled abbreviation of "per 100" — you can still see the two zeros in it.',
    'Percentages above $100$ are perfectly sensible: a price that triples has risen by $200\\%$, because the increase is twice the original.'
  ],
  vocab: [
    ['Percent', 'A number out of a hundred, written with $\\%$.'],
    ['Percent of a number', 'A part found by multiplying, as in $25\\%$ of $80$.'],
    ['Percent increase', 'How much something grew, as a percentage of what it was.'],
    ['Discount', 'An amount taken off a price, usually given as a percent.'],
    ['Multiplier', 'The single number you multiply by, such as $0.8$ for $20\\%$ off.']
  ],
  sections: [
    { h: 'Three ways to write one amount',
      p: ['$63\\%$, $\\dfrac{63}{100}$ and $0.63$ are the **same amount** in three notations.',
          'Percent to decimal: divide by $100$, which moves the point two places left.',
          'Decimal to percent: multiply by $100$, moving it two places right.'],
      box: { k: 'key', h: 'Two places, either way', t: 'The only question is which direction. <em>Percents are the bigger-looking numbers</em>, so going to a decimal always makes the number smaller.' } },
    { h: 'Finding a percent of something',
      p: ['Turn the percent into a decimal and **multiply**.',
          '$25\\%$ of $80$ is $0.25 \\times 80 = 20$.',
          'For friendly percents, mental shortcuts are faster: $10\\%$ is a tenth, $50\\%$ is a half, $25\\%$ is a quarter.'],
      box: { k: 'slow', h: 'Build from 10%', t: 'Find $10\\%$ by moving the point one place, then scale. <em>$30\\%$ is three of those; $5\\%$ is half of one.</em>' } },
    { h: 'Discounts and increases in one step',
      p: ['A $20\\%$ discount leaves $80\\%$, so multiply by $0.8$ — **one step, not two**.',
          'A $15\\%$ increase leaves $115\\%$, so multiply by $1.15$.',
          'Working out the change and then subtracting gives the same answer with more chances to slip.'],
      box: { k: 'key', h: 'The multiplier carries the whole story', t: 'The $1$ in $1.15$ keeps what you already had; the $.15$ adds the growth. <strong>Multiplying by $0.15$ alone throws the original away.</strong>' } },
    { h: 'Percent change',
      p: ['Percent change compares the **change with the original**, not with the new value.',
          'A price rising from $\\$40$ to $\\$52$ has changed by $\\$12$, and $\\dfrac{12}{40} = 0.3$, so $30\\%$.',
          'Dividing by the new price instead gives a different and wrong answer.'],
      box: { k: 'warn', h: 'Always over the original', t: 'Up $30\\%$ then down $30\\%$ does not return you to the start, because the second percent is taken of a larger number.' } },
    { h: 'Working backwards',
      p: ['If a sale price is $\\$36$ after $25\\%$ off, then $\\$36$ is $75\\%$ of the original.',
          'So **divide**: $36 \\div 0.75 = 48$.',
          'Adding $25\\%$ back onto $\\$36$ would give $\\$45$, which is not the price it started at.'],
      box: { k: 'warn', h: 'Undo by dividing', t: 'Multiplying got you there, so dividing gets you back. <strong>Adding the percent back on is the commonest error in this unit.</strong>' } }
  ],
  examples: [
    { t: 'A percent of a number', q: 'Find $35\\%$ of $60$.',
      steps: [
        { do: '$10\\%$ of $60$ is $6$.', why: 'Move the point one place.' },
        { do: 'So $30\\%$ is $18$, and $5\\%$ is $3$.', why: 'Scale from the friendly one.' },
        { do: '$18 + 3 = 21$.', why: 'Or directly: $0.35 \\times 60 = 21$.' }
      ], ans: '$21$' },
    { t: 'A discount', q: 'A $\\$60$ coat is reduced by $20\\%$. What is the sale price?',
      steps: [
        { do: 'A $20\\%$ discount leaves $80\\%$.', why: 'What you keep, not what comes off.' },
        { do: 'Multiply by $0.8$: $60 \\times 0.8$.', why: 'One step.' },
        { do: '$= \\$48$.', why: 'Check: the saving is $\\$12$, which is a fifth of $\\$60$.' }
      ], ans: '$\\$48$' },
    { t: 'Working backwards', q: 'After $25\\%$ off, a game costs $\\$36$. What was the original price?',
      steps: [
        { do: '$25\\%$ off leaves $75\\%$, so $\\$36$ is $0.75$ of the original.', why: 'Identify what the $\\$36$ represents.' },
        { do: 'Divide: $36 \\div 0.75$.', why: 'Undo the multiplication.' },
        { do: '$= \\$48$.', why: 'Check: $25\\%$ of $48$ is $12$, and $48 - 12 = 36$.' }
      ], ans: '$\\$48$' }
  ],
  mistakes: [
    'Multiplying by the discount instead of what is left. A $20\\%$ discount on $\\$60$ means multiplying by $0.8$ to get $\\$48$ — multiplying by $0.2$ gives $\\$12$, which is the saving, not the price.',
    'Adding the percent back to reverse a discount. $\\$36$ after $25\\%$ off came from $\\$48$, found by dividing by $0.75$. Adding $25\\%$ of $\\$36$ gives $\\$45$, which is simply a different number.',
    'Dividing by the new value for percent change. The change is always compared with the original: $\\$40$ to $\\$52$ is $\\dfrac{12}{40} = 30\\%$, not $\\dfrac{12}{52}$.',
    'Moving the decimal point the wrong way. $63\\%$ is $0.63$, not $6.3$. Percents look bigger, so the decimal must come out smaller.',
    'Assuming up then down by the same percent returns to the start. A $\\$100$ item up $20\\%$ is $\\$120$; down $20\\%$ from there is $\\$96$, because the second percent is taken of a larger amount.'
  ]
},
{
  id: 'expressions6', strand: 'algebra', fig: 'structureTerms',
  title: 'Expressions & Order of Operations',
  big: 'A letter stands for a number you have not been told yet, and the order of operations settles what a written expression means.',
  discover: [
    '**A club charges $\\$5$ a person plus a $\\$2$ booking fee.**',
    'Three people pay $3 \\times 5 + 2$. Seven people pay $7 \\times 5 + 2$. Twelve pay $12 \\times 5 + 2$.',
    { fig: 'discExpressions6' },
    'The same sentence, over and over, with **one number changing**. Writing it out for every group is tedious.',
    'So write it once: $5n + 2$, where $n$ is however many people turn up.',
    { punch: 'The letter is not mysterious. It is a placeholder for the number you have not been told, and the expression is the rule that will handle any of them.' }
  ],
  funfact: [
    'Using letters for unknowns is due to Viète in the 1590s. Before that, algebra was written out in sentences and was far harder to work with.',
    'The convention that multiplication comes before addition is just that — a convention — but it is universal, and every calculator and programming language obeys it.',
    'Spreadsheets are expressions with letters: a formula in a cell is a rule waiting for whatever numbers arrive.'
  ],
  vocab: [
    ['Variable', 'A letter standing for a number.'],
    ['Coefficient', 'The number multiplying a variable — the $5$ in $5n$.'],
    ['Term', 'A piece of an expression separated by $+$ or $-$.'],
    ['Evaluate', 'To work out the value once you know what the variable is.'],
    ['Exponent', 'A small raised number counting how many times to multiply.']
  ],
  sections: [
    { h: 'Writing a rule with a letter',
      p: ['Look for what stays the same and what changes. The **changing** thing gets the letter.',
          '"Five dollars each plus two" becomes $5n + 2$, whatever $n$ turns out to be.',
          '$5n$ means $5 \\times n$; the multiplication sign is left out to save writing.'],
      box: { k: 'key', h: 'What does the letter stand for', t: 'Say it in words: "$n$ is the number of people". <strong>A letter without a meaning attached is where word problems go wrong.</strong>' } },
    { h: 'The order of operations',
      p: ['Brackets first, then exponents, then multiplication and division, then addition and subtraction.',
          'Multiplication and division rank **equally** and are done left to right; so do addition and subtraction.',
          '$2 + 3 \\times 4$ is $14$, not $20$, because the multiplication goes first.'],
      box: { k: 'warn', h: 'Equal ranks go left to right', t: '$12 \\div 3 \\times 2$ is $8$, not $2$. <strong>Division does not automatically wait for multiplication</strong> — whichever comes first goes first.' } },
    { h: 'Exponents',
      p: ['$5^3$ means $5 \\times 5 \\times 5 = 125$. The small number **counts the factors**.',
          'It is not $5 \\times 3$. That confusion is the most common exponent error at this level.',
          '$2^4 = 16$, while $2 \\times 4 = 8$ — the two answers drift apart quickly.'],
      box: { k: 'slow', h: 'Say it aloud', t: '"Five to the third" means three fives multiplied. <em>Reading it as a count of factors keeps it straight.</em>' } },
    { h: 'Evaluating',
      p: ['Substitute the number for the letter, **putting it in brackets**, then follow the order of operations.',
          'For $5n + 2$ with $n = 7$: $5(7) + 2 = 37$.',
          'Brackets matter when the value is negative: $3n^2$ with $n = -2$ is $3(-2)^2 = 12$, not $-12$.'],
      box: { k: 'warn', h: 'Brackets around the substitution', t: 'Writing $3 \\cdot -2^2$ invites squaring before the minus is applied. <strong>Brackets remove the ambiguity entirely.</strong>' } },
    { h: 'Equivalent expressions',
      p: ['$3(x + 4)$ and $3x + 12$ give the same answer for **every** $x$, so they are equivalent.',
          'Expanding a bracket multiplies each term inside by what is outside.',
          'Collecting like terms goes the other way: $4x + 3x$ is $7x$, because seven $x$s is seven $x$s.'],
      box: { k: 'key', h: 'Test with a number', t: 'Unsure whether two expressions match? Put $x = 2$ into both. <em>If they disagree they are not equivalent; if they agree, try one more.</em>' } }
  ],
  examples: [
    { t: 'Order of operations', q: 'Work out $2 + 3 \\times 4^2$.',
      steps: [
        { do: 'Exponent first: $4^2 = 16$.', why: 'Before any multiplying.' },
        { do: 'Then multiply: $3 \\times 16 = 48$.', why: 'Multiplication outranks addition.' },
        { do: 'Then add: $2 + 48 = 50$.', why: 'Working left to right would have given $400$.' }
      ], ans: '$50$' },
    { t: 'Writing an expression', q: 'A taxi charges $\\$3$ to start and $\\$2$ a mile. Write the cost for $m$ miles.',
      steps: [
        { do: 'The $\\$3$ is paid once, whatever happens.', why: 'A constant term.' },
        { do: 'The $\\$2$ is paid for each mile, so that is $2m$.', why: 'The changing part gets the letter.' },
        { do: 'Total: $2m + 3$.', why: 'Check with $m=4$: $\\$11$, which matches $\\$3 + \\$8$.' }
      ], ans: '$2m + 3$' },
    { t: 'Evaluating', q: 'Find the value of $4n^2 - 5$ when $n = 3$.',
      steps: [
        { do: 'Substitute with brackets: $4(3)^2 - 5$.', why: 'Brackets keep the order clear.' },
        { do: 'Exponent first: $(3)^2 = 9$.', why: 'Before multiplying by $4$.' },
        { do: '$4 \\times 9 - 5 = 36 - 5 = 31$.', why: 'Multiplication, then subtraction.' }
      ], ans: '$31$' }
  ],
  mistakes: [
    'Working strictly left to right. $2 + 3 \\times 4$ is $14$, not $20$ — multiplication goes before addition whatever the order on the page.',
    'Reading $5^3$ as $5 \\times 3$. It means $5 \\times 5 \\times 5 = 125$, not $15$. The exponent counts the factors.',
    'Doing multiplication before division out of habit. $12 \\div 3 \\times 2$ is $8$: they rank equally, so the leftmost goes first.',
    'Squaring without brackets after substituting. For $n = -2$, $3n^2$ is $3(-2)^2 = 12$; writing $3 \\cdot -2^2$ makes it look like $-12$.',
    'Multiplying only the first term in a bracket. $3(x+4)$ is $3x + 12$, not $3x + 4$ — everything inside gets multiplied.'
  ]
},
{
  id: 'equations6', strand: 'algebra', fig: 'balanceScale',
  title: 'One-Step Equations',
  big: 'An equation is a balanced scale, and whatever you do to one side you must do to the other.',
  discover: [
    '**A bag of unknown weight balances against seven one-kilogram blocks.**',
    'The scale is level, so the two sides weigh the same. That is all "equals" means.',
    { fig: 'discEquations6' },
    'Take two blocks off the right and the scale **tips**. It was balanced, and now it is not.',
    'Take two off both sides and it stays level. The bag has not changed, but the picture is simpler.',
    { punch: 'Solving an equation is doing the same thing to both pans until the bag is alone. Every rule in this unit is that one idea.' }
  ],
  funfact: [
    'The equals sign was invented by Robert Recorde in 1557, who chose two parallel lines because "no two things can be more equal".',
    'The word algebra comes from <em>al-jabr</em>, in the title of a book by al-Khwarizmi around 820 — it means "restoring", as in restoring the balance.',
    'Every spreadsheet, every physics formula and every line of computer arithmetic rests on this one rule about doing the same to both sides.'
  ],
  vocab: [
    ['Equation', 'A statement that two expressions are equal.'],
    ['Solution', 'The value of the variable that makes the equation true.'],
    ['Inverse operation', 'The operation that undoes another — subtraction undoes addition.'],
    ['Isolate', 'To get the variable alone on one side.'],
    ['Check', 'Substituting your answer back to confirm it works.']
  ],
  sections: [
    { h: 'What the equals sign promises',
      p: ['$x + 5 = 12$ says that whatever $x$ is, adding five to it gives twelve.',
          'The two sides are **the same amount**, written two ways.',
          'Solving means finding the number that makes the promise true.'],
      box: { k: 'key', h: 'Not an instruction', t: 'Equals does not mean "the answer comes next". <em>It means the two sides are equal</em>, which is why you can work on either one.' } },
    { h: 'Undoing with the inverse',
      p: ['To get $x$ alone, undo whatever was done to it, using the **opposite operation**.',
          'Addition is undone by subtraction; multiplication by division.',
          '$x + 5 = 12$ becomes $x = 12 - 5 = 7$.'],
      box: { k: 'key', h: 'Both sides, every time', t: 'Subtracting five from only one side breaks the balance. <strong>The equation stops being true</strong>, and so does everything after it.' } },
    { h: 'Multiplication and division',
      p: ['$4x = 20$ means four lots of $x$, so divide both sides by four to get $x = 5$.',
          '$\\dfrac{x}{3} = 6$ means $x$ shared into three, so **multiply** both sides by three: $x = 18$.',
          'The operation in the equation tells you which inverse to use.'],
      box: { k: 'warn', h: 'Divide, do not subtract', t: 'For $4x = 20$, subtracting $4$ gives $x = 16$, which is wrong. <strong>The $4$ is multiplying, so it must be divided away.</strong>' } },
    { h: 'Always check',
      p: ['Put your answer back into the original equation and see whether it balances.',
          '$x = 7$ in $x + 5 = 12$ gives $12 = 12$. **True, so it is right.**',
          'Checking costs one line and catches nearly every slip.'],
      box: { k: 'slow', h: 'Check against the original', t: 'Substitute into the equation you were <em>given</em>, not a line you rewrote. A mistake in the rewriting would otherwise go unnoticed.' } },
    { h: 'From words to an equation',
      p: ['Say what the letter stands for, then translate the sentence one piece at a time.',
          '"Seven more than a number is $19$" becomes $n + 7 = 19$.',
          'Watch the order in subtraction: "five less than a number" is $n - 5$, **not** $5 - n$.'],
      box: { k: 'warn', h: 'Less than flips the order', t: '"Five less than $n$" means start at $n$ and go down five: $n - 5$. <strong>Writing $5 - n$ reverses it</strong>, and the two agree only when $n$ is $2.5$.' } }
  ],
  examples: [
    { t: 'Undoing addition', q: 'Solve $x + 9 = 23$.',
      steps: [
        { do: 'Nine has been added, so subtract nine.', why: 'The inverse operation.' },
        { do: 'Do it to both sides: $x + 9 - 9 = 23 - 9$.', why: 'Keeping the balance.' },
        { do: '$x = 14$. Check: $14 + 9 = 23$.', why: 'True, so the answer is right.' }
      ], ans: '$x = 14$' },
    { t: 'Undoing multiplication', q: 'Solve $6x = 42$.',
      steps: [
        { do: 'Six is multiplying $x$, so divide by six.', why: 'Not subtract — the $6$ is a multiplier.' },
        { do: '$\\dfrac{6x}{6} = \\dfrac{42}{6}$.', why: 'Both sides.' },
        { do: '$x = 7$. Check: $6 \\times 7 = 42$.', why: 'Balanced.' }
      ], ans: '$x = 7$' },
    { t: 'From words', q: 'Four less than a number is $11$. Find the number.',
      steps: [
        { do: 'Let $n$ be the number.', why: 'Say what the letter means first.' },
        { do: '"Four less than $n$" is $n - 4$, so $n - 4 = 11$.', why: 'Start at $n$ and go down.' },
        { do: 'Add four to both sides: $n = 15$. Check: $15 - 4 = 11$.', why: 'Writing $4 - n = 11$ would have given $-7$.' }
      ], ans: '$15$' }
  ],
  mistakes: [
    'Doing something to only one side. Subtracting five from the left of $x + 5 = 12$ without doing it to the right leaves $x = 12$, which does not check.',
    'Subtracting a coefficient instead of dividing. In $4x = 20$ the $4$ is multiplying, so divide: $x = 5$. Subtracting gives $16$, which fails the check immediately.',
    'Reversing a subtraction in a word problem. "Four less than a number" is $n - 4$, not $4 - n$; the two give answers of $15$ and $-7$.',
    'Skipping the check. Substituting back takes one line and catches almost every arithmetic slip before it matters.',
    'Treating equals as "here comes the answer". It states that two amounts are the same, which is exactly what allows you to work on either side.'
  ]
},
{
  id: 'inequal6', strand: 'algebra', fig: 'inequalityLine',
  title: 'Inequalities',
  big: 'Some questions have a whole range of answers, and a number line is how you show them all.',
  discover: [
    '**"You must be at least 48 inches tall to ride."**',
    'Is that one height? No. Someone who is $48$ can ride. So can someone who is $52$, or $60$.',
    { fig: 'discInequal6' },
    'Someone who is $46$ cannot. The rule splits every possible height into **two groups**.',
    'An equation would name one height. This names all of them at once.',
    { punch: 'That is an inequality: $h \\ge 48$. The answer is not a number but a stretch of the number line, and the dot at the end says whether $48$ itself is included.' }
  ],
  funfact: [
    'The $<$ and $>$ signs were introduced by Thomas Harriot in a book published in 1631, ten years after he died.',
    'Speed limits, age restrictions, weight limits and dosage ranges are all inequalities, and each one hinges on whether the endpoint counts.',
    'The difference between "under 18" and "18 and under" has decided court cases — it is exactly the open-or-filled dot question.'
  ],
  vocab: [
    ['Inequality', 'A statement that one amount is less than or greater than another.'],
    ['Solution set', 'All the values that make the inequality true.'],
    ['At least', 'Greater than or equal to, written $\\ge$.'],
    ['At most', 'Less than or equal to, written $\\le$.'],
    ['Open circle', 'A hollow dot showing the endpoint is not included.']
  ],
  sections: [
    { h: 'Reading the symbols',
      p: ['$<$ is less than, $>$ is greater than. The wide end **points at the larger** amount.',
          '$\\le$ and $\\ge$ add "or equal to", which changes whether the endpoint itself counts.',
          '"At least $48$" is $\\ge 48$; "under $48$" is $< 48$.'],
      box: { k: 'key', h: 'The line under the sign', t: 'That little line is the "or equal to" part. <strong>It decides whether $48$ itself is allowed</strong>, which is the whole point of the ride rule.' } },
    { h: 'Graphing on a number line',
      p: ['Mark the endpoint, then shade the direction that makes the statement true.',
          'A **filled** circle means the endpoint is included; an **open** circle means it is not.',
          'Shade right for greater than, left for less than — the direction the arrow would point.'],
      box: { k: 'slow', h: 'Test a number', t: 'Pick any number in the shaded part and check it works. <em>If it does not, you shaded the wrong way.</em>' } },
    { h: 'Everyday phrases',
      p: ['"No more than" is $\\le$. "At least" is $\\ge$. "Fewer than" is $<$.',
          '"Minimum" points the same way as "at least"; "maximum" the same way as "at most".',
          'Reading the sentence carefully is most of the work — the **symbol follows** from the words.'],
      box: { k: 'warn', h: 'Over and under exclude', t: '"Over $21$" does not include $21$, so it is $> 21$ with an open circle. <strong>"$21$ and over" does include it.</strong>' } },
    { h: 'Solving one-step inequalities',
      p: ['Solve exactly as you would an equation: do the same thing to both sides.',
          '$x + 3 \\le 10$ becomes $x \\le 7$, and every number up to and including seven works.',
          'The answer is a **set**, not a single value, so it is written as an inequality or drawn on a line.'],
      box: { k: 'key', h: 'One answer becomes many', t: 'An equation gives one number; an inequality gives a range. <em>Checking means testing a value inside the range and one outside.</em>' } },
    { h: 'Does the answer make sense?',
      p: ['In a real problem, some solutions may be impossible even though the algebra allows them.',
          'A number of people cannot be negative or a fraction, so $n \\le 7.5$ really means **at most seven people**.',
          'Always ask what the variable counts before reporting the answer.'],
      box: { k: 'slow', h: 'Round the right way', t: 'With $\\$50$ and $\\$7$ tickets you can buy $7$, not $7.14$. <strong>For "at most" problems, always round down</strong>, whatever the decimal says.' } }
  ],
  examples: [
    { t: 'Writing an inequality', q: 'Write "you must be at least $13$ to join" as an inequality, using $a$ for age.',
      steps: [
        { do: '"At least" means the value counts.', why: 'So the symbol includes equality.' },
        { do: 'Thirteen-year-olds may join, and so may anyone older.', why: 'The range goes upwards.' },
        { do: '$a \\ge 13$, drawn with a filled circle at $13$ shading right.', why: 'A twelve-year-old is excluded.' }
      ], ans: '$a \\ge 13$' },
    { t: 'Solving', q: 'Solve $x + 4 < 11$ and describe the solutions.',
      steps: [
        { do: 'Subtract four from both sides.', why: 'The same move as for an equation.' },
        { do: '$x < 7$.', why: 'Strictly less — seven itself does not work.' },
        { do: 'Every number below seven: $6$, $0$, $-3$, $6.9$.', why: 'An open circle at $7$, shading left.' }
      ], ans: '$x < 7$' },
    { t: 'A real limit', q: 'Tickets cost $\\$7$. With $\\$50$, how many can you buy?',
      steps: [
        { do: '$7n \\le 50$, since you cannot spend more than you have.', why: '"At most" gives $\\le$.' },
        { do: 'Divide both sides by seven: $n \\le 7.14$.', why: 'The algebra allows a fraction.' },
        { do: 'But tickets are whole, so at most $7$.', why: 'Eight would cost $\\$56$, which is too much.' }
      ], ans: '$7$ tickets' }
  ],
  mistakes: [
    'Shading the wrong way. For $x < 7$ the shading goes left, towards the smaller numbers. Testing one shaded value settles it in seconds.',
    'Using a filled circle for a strict inequality. $x < 7$ excludes $7$, so the circle must be open. $x \\le 7$ includes it and gets a filled one.',
    'Reading "over $21$" as including $21$. It does not — that is $> 21$. "$21$ and over" is the phrase that includes it.',
    'Reporting a fractional answer to a counting problem. $n \\le 7.14$ tickets means seven tickets; you cannot buy a seventh of one.',
    'Rounding up on an "at most" problem. $7.14$ rounds to $7$ here, not $8$, because $8$ tickets would break the limit the inequality set.'
  ]
},
{
  id: 'areatri', strand: 'geometry', fig: 'areaDecompose',
  title: 'Area of Triangles & Quadrilaterals',
  big: 'Every area formula in this unit comes from a rectangle that has been cut up or rearranged.',
  discover: [
    '**Draw an $8$ by $6$ rectangle and cut it corner to corner.**',
    'You get two triangles. Slide one on top of the other and they match exactly.',
    { fig: 'discAreatri' },
    'So each triangle is **exactly half** the rectangle — $24$, not something that needs a new idea.',
    'The rectangle had area $48$, and the cut divided it into two equal pieces.',
    { punch: 'That is where $\\dfrac12 bh$ comes from. Every formula here is a rectangle in disguise, which is why you can rebuild any of them from a picture.' }
  ],
  funfact: [
    'Egyptian surveyors were computing field areas this way four thousand years ago, after the Nile floods erased the boundaries each year.',
    'A triangle’s area depends only on its base and its height, not on how lopsided it is — sliding the top corner sideways changes nothing.',
    'That fact is why a stack of paper stays the same volume however much you push the top sideways.'
  ],
  vocab: [
    ['Base', 'Any side of a triangle, chosen as the one to measure from.'],
    ['Height', 'The perpendicular distance from the base to the opposite corner.'],
    ['Parallelogram', 'A quadrilateral with both pairs of opposite sides parallel.'],
    ['Trapezoid', 'A quadrilateral with exactly one pair of parallel sides.'],
    ['Composite figure', 'A shape made by joining simpler ones.']
  ],
  sections: [
    { h: 'Triangles are half a rectangle', fig: 'triHalfRect',
      p: ['Area $= \\dfrac12 bh$. The **height must be perpendicular** to the base, not along a slanted side.',
          'For a right triangle the two legs are the base and height, which is why those are easiest.',
          'For a slanted triangle the height is measured straight down, sometimes landing outside the shape.'],
      box: { k: 'warn', h: 'Slant is not height', t: 'A triangle with sides $5$, $5$ and base $6$ has height $4$, not $5$. <strong>Using a slanted side gives an area that is too big</strong> every time.' } },
    { h: 'Parallelograms', fig: 'paraSlideRect',
      p: ['Area $= bh$, with no half. Cut the triangle off one end and slide it to the other, and you have a **rectangle**.',
          'Nothing was added or removed, so the area never changed.',
          'Again the height is perpendicular, not the slanted side.'],
      box: { k: 'key', h: 'Why there is no half here', t: 'A parallelogram <em>is</em> the rectangle, rearranged. A triangle is only half of one, which is where the $\\dfrac12$ comes from.' } },
    { h: 'Trapezoids', fig: 'trapTwoCopies',
      p: ['Area $= \\dfrac{(b_1+b_2)}{2} \\times h$ — the **average of the two parallel sides**, times the height.',
          'Put two identical trapezoids together, one upside down, and they form a parallelogram of base $b_1+b_2$.',
          'Half of that is one trapezoid, which is exactly the formula.'],
      box: { k: 'slow', h: 'Average the parallel sides', t: 'If the bases were equal it would be a parallelogram, and the average would just be that base. <em>The formula agrees.</em>' } },
    { h: 'Composite shapes', fig: 'compositeTwoRoutes',
      p: ['Cut an awkward shape into rectangles and triangles, find each area, and **add them up**.',
          'Or find the area of a large rectangle and subtract the pieces that are missing.',
          'Either route works; pick whichever needs fewer measurements.'],
      box: { k: 'key', h: 'Mark the pieces on the drawing', t: 'Draw the cutting lines and label each piece before calculating. <strong>Most errors here are pieces counted twice or forgotten.</strong>' } },
    { h: 'Units of area',
      p: ['Area is always in **square** units: square centimetres, square feet, square metres.',
          'That is because you are counting how many unit squares fit inside.',
          'Perimeter, by contrast, is a length, so it is measured in ordinary units.'],
      box: { k: 'warn', h: 'Squared, not doubled', t: 'An answer of "$24$ cm" for an area is wrong; it is $24$ cm². <em>The little two is part of the answer.</em>' } }
  ],
  examples: [
    { t: 'A triangle', q: 'Find the area of a triangle with base $10$ cm and height $6$ cm.',
      steps: [
        { do: 'Area $= \\dfrac12 bh$.', why: 'Half the surrounding rectangle.' },
        { do: '$= \\dfrac12 \\times 10 \\times 6$.', why: 'Substitute.' },
        { do: '$= 30$ cm².', why: 'The rectangle would have been $60$ cm².' }
      ], ans: '$30$ cm²' },
    { t: 'A trapezoid', q: 'Find the area of a trapezoid with parallel sides $8$ and $14$ and height $5$.',
      steps: [
        { do: 'Average the parallel sides: $\\dfrac{8+14}{2} = 11$.', why: 'The formula is an average times a height.' },
        { do: 'Multiply by the height: $11 \\times 5$.', why: 'As if it were a rectangle $11$ wide.' },
        { do: '$= 55$ square units.', why: 'Between $8 \\times 5$ and $14 \\times 5$, as it should be.' }
      ], ans: '$55$' },
    { t: 'A composite shape', q: 'An L-shape is a $10$ by $8$ rectangle with a $4$ by $3$ corner removed. Find its area.',
      steps: [
        { do: 'Whole rectangle: $10 \\times 8 = 80$.', why: 'Start with the shape it came from.' },
        { do: 'Missing corner: $4 \\times 3 = 12$.', why: 'The piece taken away.' },
        { do: '$80 - 12 = 68$ square units.', why: 'Subtracting is easier here than cutting into two pieces.' }
      ], ans: '$68$' }
  ],
  mistakes: [
    'Using a slanted side as the height. A triangle with base $6$ and equal sides $5$ has height $4$; using $5$ gives $15$ instead of the correct $12$. The height must meet the base at a right angle.',
    'Halving a parallelogram. Its area is $bh$ with no half — it is a whole rectangle rearranged, not half of one.',
    'Adding the parallel sides of a trapezoid without averaging. The formula uses $\\dfrac{b_1+b_2}{2}$; forgetting the division doubles the answer.',
    'Leaving off the square units. Area is counted in unit squares, so the answer is $30$ cm², not $30$ cm.',
    'Double-counting in a composite shape. Draw the cutting lines and label each piece; overlapping rectangles quietly add the same region twice.'
  ]
},
{
  id: 'surfacenets', strand: 'geometry', fig: 'prismNet',
  title: 'Surface Area & Nets',
  big: 'Unfold a solid and its surface becomes a flat shape whose area you already know how to find.',
  discover: [
    '**Cut a cardboard box along its edges and lay it flat.**',
    'What you get is six rectangles, joined at the folds.',
    { fig: 'discSurfacenets' },
    'Nothing has been added or lost. The cardboard is **exactly** what was wrapped around the box.',
    'And now every piece is flat, so every piece has an area you can already calculate.',
    { punch: 'That flat shape is called a net, and its total area is the surface area of the solid. There is no new formula to learn — only a solid to unfold.' }
  ],
  funfact: [
    'Packaging designers work in nets. A cereal box begins life as a single flat piece of card, printed and then folded.',
    'A cube has eleven genuinely different nets — a fact that takes some patience to verify.',
    'Surface area decides how fast something cools, which is why radiators have fins and why a crushed ice cube melts faster than a whole one.'
  ],
  vocab: [
    ['Net', 'A flat pattern that folds up into a solid.'],
    ['Surface area', 'The total area of all the faces.'],
    ['Face', 'One flat surface of a solid.'],
    ['Prism', 'A solid with two identical parallel ends joined by rectangles.'],
    ['Pyramid', 'A solid with a polygon base and triangular faces meeting at a point.']
  ],
  sections: [
    { h: 'Unfolding a solid',
      p: ['Cut along enough edges and a solid opens out flat without stretching anything.',
          'The net shows every face **at its true size**, which is what makes measuring possible.',
          'One solid can have several different nets, depending on where you cut.'],
      box: { k: 'key', h: 'Count the faces first', t: 'A rectangular box has six, a triangular prism five, a square pyramid five. <strong>If your net has the wrong number, something has been missed.</strong>' } },
    { h: 'Boxes', fig: 'boxNetFaces',
      p: ['A rectangular box has three **pairs** of identical faces: front and back, top and bottom, two ends.',
          'So find the area of three different faces, add them, and double.',
          'For $5 \\times 3 \\times 4$: $15 + 20 + 12 = 47$, doubled to $94$ square units.'],
      box: { k: 'slow', h: 'Three areas, then double', t: 'Working out all six separately is fine but slower, and it is easier to lose one. <em>Pairing them halves the work.</em>' } },
    { h: 'Prisms',
      p: ['A prism has two identical ends and a set of rectangles wrapped around them.',
          'Surface area is **twice the end** plus the area of the wrapping.',
          'The wrapping is one long rectangle, as tall as the prism and as wide as the perimeter of the end.'],
      box: { k: 'key', h: 'Perimeter times length', t: 'The side faces unroll into a single rectangle. <em>Its width is the perimeter of the end face</em>, which saves computing each side separately.' } },
    { h: 'Pyramids', fig: 'pyramidNetSlant',
      p: ['A square pyramid has a square base and four identical triangles.',
          'Each triangle needs the **slant height**, measured up the face, not the vertical height of the pyramid.',
          'Total is the base plus four triangles.'],
      box: { k: 'warn', h: 'Slant height, not height', t: 'The triangle’s height runs up the sloping face. <strong>Using the pyramid’s vertical height makes every triangle too small.</strong>' } },
    { h: 'Why surface area matters',
      p: ['Surface area is how much material wraps a solid — paint, wrapping paper, cardboard, skin.',
          'Volume is how much fits **inside**. The two answer different questions and use different units.',
          'Surface area is in square units; volume is in cubic units.'],
      box: { k: 'warn', h: 'Square or cubic', t: 'Wrapping a present needs surface area; filling it needs volume. <strong>An answer in cm³ to a wrapping question is answering the wrong question.</strong>' } }
  ],
  examples: [
    { t: 'A box', q: 'Find the surface area of a box $5$ by $3$ by $4$.',
      steps: [
        { do: 'Three different faces: $5 \\times 3 = 15$, $5 \\times 4 = 20$, $3 \\times 4 = 12$.', why: 'One of each pair.' },
        { do: 'Add them: $15 + 20 + 12 = 47$.', why: 'Half the total.' },
        { do: 'Double: $94$ square units.', why: 'Every face has a twin.' }
      ], ans: '$94$' },
    { t: 'A cube', q: 'Find the surface area of a cube with edge $7$ cm.',
      steps: [
        { do: 'Every face is a $7$ by $7$ square, so each is $49$ cm².', why: 'All six are identical.' },
        { do: 'There are six faces.', why: 'A cube unfolds into six squares.' },
        { do: '$6 \\times 49 = 294$ cm².', why: 'Not $7^3 = 343$ — that would be the volume.' }
      ], ans: '$294$ cm²' },
    { t: 'A pyramid', q: 'A square pyramid has base edge $6$ and slant height $5$. Find its surface area.',
      steps: [
        { do: 'Base: $6 \\times 6 = 36$.', why: 'A square.' },
        { do: 'Each triangle: $\\dfrac12 \\times 6 \\times 5 = 15$, and there are four.', why: 'Slant height is the triangle’s height.' },
        { do: '$36 + 4(15) = 96$ square units.', why: 'Base plus the four sloping faces.' }
      ], ans: '$96$' }
  ],
  mistakes: [
    'Forgetting a pair of faces. A box has six faces in three matching pairs; computing three areas and forgetting to double halves the answer.',
    'Using the pyramid’s vertical height for its triangles. The triangles need the slant height, measured up the sloping face, which is always the longer of the two.',
    'Giving surface area in cubic units. It is an area, so the units are squared: $294$ cm², not $294$ cm³.',
    'Confusing surface area with volume. Wrapping a box needs surface area; filling it needs volume. For a $7$ cm cube those are $294$ and $343$ — close enough to hide a mistake.',
    'Drawing a net with the wrong number of faces. Count them against the solid before calculating: six for a box, five for a triangular prism, five for a square pyramid.'
  ]
},
{
  id: 'volumefrac', strand: 'geometry', fig: 'fractionCubes',
  title: 'Volume with Fractional Edges',
  big: 'Volume still counts cubes — but when the cubes are smaller than one unit, counting is not the whole answer.',
  discover: [
    '**Fill a box with half-inch cubes and count them.**',
    'Suppose $48$ fit. Is the volume $48$ cubic inches?',
    { fig: 'discVolumefrac' },
    'No. Each little cube is **half an inch** on every edge, so eight of them make one cubic inch.',
    'So $48$ little cubes is only $6$ cubic inches — a very different answer.',
    { punch: 'Counting cubes works only when the cubes are the unit. Otherwise you must know what each one is worth, and $\\dfrac12 \\times \\dfrac12 \\times \\dfrac12 = \\dfrac18$ is the whole reason.' }
  ],
  funfact: [
    'Halving every edge divides the volume by eight, which is why a small ice cube melts so much faster in proportion to its size.',
    'The same effect explains why a mouse must eat constantly and an elephant need not — surface area and volume do not scale together.',
    'Shipping containers are built to fixed sizes precisely so that boxes stack without leaving fractional gaps.'
  ],
  vocab: [
    ['Volume', 'How much space a solid takes up, measured in cubic units.'],
    ['Cubic unit', 'A cube one unit on every edge.'],
    ['Rectangular prism', 'A box — six rectangular faces meeting at right angles.'],
    ['Edge length', 'The measurement along one side.'],
    ['Capacity', 'How much a container holds, often in litres or gallons.']
  ],
  sections: [
    { h: 'Volume is length times width times height',
      p: ['$V = lwh$. It works because the base holds $l \\times w$ cubes and there are $h$ **layers** of them.',
          'For a $5$ by $3$ by $4$ box: $15$ cubes on the bottom, four layers, so $60$.',
          'The formula is not a rule to memorise; it is a description of stacking.'],
      box: { k: 'key', h: 'Base area times height', t: 'For any prism, volume is the area of the end times how long it is. <em>The box formula is that idea for a rectangular end.</em>' } },
    { h: 'Fractional edges', fig: 'fracEdgeBox',
      p: ['The formula does not change when the edges are fractions: multiply them just the same.',
          'A box $\\dfrac12$ by $\\dfrac34$ by $2$ has volume $\\dfrac12 \\times \\dfrac34 \\times 2 = \\dfrac34$ cubic units.',
          'It is **less than one** cubic unit, which the size of the box confirms.'],
      box: { k: 'slow', h: 'Multiply, then simplify', t: 'Tops together, bottoms together, then cancel. <em>Converting to decimals also works and is sometimes quicker.</em>' } },
    { h: 'Counting small cubes',
      p: ['If the filling cubes are $\\dfrac12$ on a side, each one is $\\dfrac18$ of a cubic unit.',
          'So divide the count by eight — or better, **multiply the count by $\\dfrac18$**.',
          'For third-inch cubes each is $\\dfrac{1}{27}$, since $3^3 = 27$.'],
      box: { k: 'warn', h: 'Cubes shrink faster than edges', t: 'Halving the edge gives an eighth of the volume, not a half. <strong>Three dimensions each shrink</strong>, and the effects multiply.' } },
    { h: 'Which measurement goes where',
      p: ['For a box it does not matter which edge you call length: multiplication does not care about order.',
          '$5 \\times 3 \\times 4$ and $4 \\times 5 \\times 3$ both give $60$.',
          'It matters only when a problem asks about a particular face, such as the base.'],
      box: { k: 'key', h: 'Order-free for volume', t: 'Surface area is different — there you must pair the right edges together. <em>Volume is the forgiving one.</em>' } },
    { h: 'Volume and capacity',
      p: ['A container of volume $1000$ cm³ holds one litre, because a litre **is** $1000$ cm³.',
          'Filling to the brim uses volume; wrapping the outside uses surface area.',
          'The units are the clue: cm³ for filling, cm² for covering.'],
      box: { k: 'warn', h: 'Cubic, not squared', t: 'A volume answer needs the little three. <strong>Writing cm² for a volume answers a different question entirely.</strong>' } }
  ],
  examples: [
    { t: 'A plain box', q: 'Find the volume of a box $6$ by $4$ by $3$.',
      steps: [
        { do: 'Base layer: $6 \\times 4 = 24$ cubes.', why: 'How many fit on the bottom.' },
        { do: 'There are three such layers.', why: 'The height counts the layers.' },
        { do: '$24 \\times 3 = 72$ cubic units.', why: 'Same as $6 \\times 4 \\times 3$.' }
      ], ans: '$72$' },
    { t: 'Fractional edges', q: 'Find the volume of a box $\\dfrac12$ by $\\dfrac34$ by $2$.',
      steps: [
        { do: 'Multiply all three: $\\dfrac12 \\times \\dfrac34 \\times 2$.', why: 'The formula is unchanged.' },
        { do: '$\\dfrac12 \\times \\dfrac34 = \\dfrac38$, then $\\times 2 = \\dfrac68$.', why: 'Tops and bottoms.' },
        { do: '$= \\dfrac34$ cubic units.', why: 'Under one, which fits such a small box.' }
      ], ans: '$\\dfrac34$' },
    { t: 'Counting small cubes', q: 'A box holds exactly $48$ cubes with $\\dfrac12$-inch edges. What is its volume?',
      steps: [
        { do: 'Each small cube is $\\dfrac12 \\times \\dfrac12 \\times \\dfrac12 = \\dfrac18$ cubic inch.', why: 'All three edges are halved.' },
        { do: 'So $48$ of them is $48 \\times \\dfrac18$.', why: 'Count times value.' },
        { do: '$= 6$ cubic inches.', why: 'Not $48$ — the cubes were smaller than the unit.' }
      ], ans: '$6$ in³' }
  ],
  mistakes: [
    'Counting small cubes as if they were unit cubes. Forty-eight half-inch cubes make $6$ cubic inches, not $48$, because each one is only $\\dfrac18$ of a cubic inch.',
    'Halving the volume when halving the edges. All three dimensions shrink, so the volume falls to an eighth — the effects multiply rather than add.',
    'Giving a volume in square units. Volume needs cubic units: $72$ cm³, not $72$ cm².',
    'Adding the edge lengths instead of multiplying. A $6$ by $4$ by $3$ box has volume $72$, not $13$; adding gives something with no meaning at all.',
    'Confusing volume with surface area. Filling a box uses volume; wrapping it uses surface area. The units in the question usually say which is wanted.'
  ]
},
{
  id: 'statquestions', strand: 'data', fig: 'samplingDots',
  title: 'Statistical Questions & Distributions',
  big: 'A statistical question is one that expects a spread of answers, not a single one.',
  discover: [
    '**"How tall am I?" and "How tall is a sixth-grader?"**',
    'The first has one answer. Measure once and you are finished.',
    { fig: 'discStatquestions' },
    'The second does not. Sixth-graders come in **many heights**, and no single number is the answer.',
    'You could measure a hundred of them and still not have one number — you would have a shape.',
    { punch: 'That shape is a distribution, and questions that produce one are called statistical. Everything in this unit exists because the answer is a spread rather than a value.' }
  ],
  funfact: [
    'Florence Nightingale invented a new kind of chart in 1858 to show that most soldiers in the Crimea died of disease rather than wounds. The picture changed policy where tables of numbers had not.',
    'A dot plot is often the most honest chart there is: every single data point is visible, and nothing is averaged away.',
    'The word "statistics" comes from "state" — the subject began as the counting of populations for governments.'
  ],
  vocab: [
    ['Statistical question', 'One that anticipates variability in the answers.'],
    ['Data', 'The collected answers or measurements.'],
    ['Distribution', 'The pattern of how the values are spread out.'],
    ['Dot plot', 'A chart with one dot per value, stacked above a number line.'],
    ['Outlier', 'A value far away from the rest.']
  ],
  sections: [
    { h: 'Spotting a statistical question',
      p: ['Ask whether the answers would **vary**. If they would, the question is statistical.',
          '"How old am I?" is not. "How old are the people in my street?" is.',
          'The test is about the answers, not about how the question is worded.'],
      box: { k: 'key', h: 'Would the answers differ?', t: 'One answer means arithmetic; many answers mean statistics. <em>That single question sorts them every time.</em>' } },
    { h: 'Describing a distribution',
      p: ['Three things are worth saying: where the **centre** is, how **spread out** it is, and what **shape** it has.',
          'Shape covers whether it is symmetric, lopsided, or has two humps.',
          'Anything unusual — a gap, or a value far from the rest — deserves a mention too.'],
      box: { k: 'slow', h: 'Centre, spread, shape', t: 'Three words cover almost every description question. <strong>Answering with only the average leaves two-thirds unsaid.</strong>' } },
    { h: 'Dot plots and histograms',
      p: ['A dot plot puts one dot per value above a number line, so **nothing is hidden**.',
          'A histogram groups values into intervals and draws a bar for each, which suits larger data sets.',
          'Histogram bars touch, because the intervals run into each other; bar-chart bars do not.'],
      box: { k: 'warn', h: 'Not the same as a bar chart', t: 'A bar chart compares separate categories; a histogram shows a distribution across a number line. <strong>The touching bars are the visible difference.</strong>' } },
    { h: 'Shape',
      p: ['Symmetric means the two halves roughly mirror each other.',
          'Skewed means a **long tail** to one side, which drags the mean towards it.',
          'Two humps usually mean two different groups have been mixed together.'],
      box: { k: 'key', h: 'What two humps mean', t: 'A double-humped plot of heights often means two age groups in one data set. <em>The shape is telling you the data should be split.</em>' } },
    { h: 'Outliers',
      p: ['An outlier sits far from everything else, and it can be a real value or a recording error.',
          'Either way it should be **noticed and mentioned**, not silently deleted.',
          'It pulls the mean noticeably while barely moving the median.'],
      box: { k: 'slow', h: 'Investigate, do not delete', t: 'A height of $2$ cm is a typing slip; a salary ten times the rest may be perfectly real. <em>The data cannot tell you which — only checking can.</em>' } }
  ],
  examples: [
    { t: 'Statistical or not', q: 'Which is a statistical question: "How many pets do I have?" or "How many pets do students in my class have?"',
      steps: [
        { do: 'The first has one answer, found by counting once.', why: 'No variability.' },
        { do: 'The second varies from student to student.', why: 'Different answers from different people.' },
        { do: 'So the second is statistical.', why: 'It produces a distribution rather than a number.' }
      ], ans: 'The second' },
    { t: 'Describing a plot', q: 'A dot plot of test scores clusters near $80$, spreads from $70$ to $90$, and has one dot at $30$. Describe it.',
      steps: [
        { do: 'Centre: around $80$, where most dots sit.', why: 'Where the data piles up.' },
        { do: 'Spread: most from $70$ to $90$, so about $20$ points wide.', why: 'Ignoring the stray value for now.' },
        { do: 'The dot at $30$ is an outlier, far from the rest and worth checking.', why: 'Centre, spread, shape, then anything unusual.' }
      ], ans: 'Centred near $80$, spread $70$ to $90$, with an outlier at $30$' },
    { t: 'Reading a histogram', q: 'A histogram has bars of height $2, 5, 9, 5, 2$ across five intervals. What shape is it?',
      steps: [
        { do: 'The tallest bar is in the middle.', why: 'That is where the centre sits.' },
        { do: 'The heights fall away evenly on both sides: $5, 2$ each way.', why: 'The halves mirror each other.' },
        { do: 'So the distribution is symmetric.', why: 'No long tail in either direction.' }
      ], ans: 'Symmetric' }
  ],
  mistakes: [
    'Calling any data question statistical. "How tall am I?" has one answer, so it is not — the test is whether the answers would vary.',
    'Describing a distribution with only its average. Centre, spread and shape are three separate things, and two of them are missing from a lone mean.',
    'Confusing a histogram with a bar chart. Histogram bars touch because the intervals are next to each other on a number line; bar-chart categories are separate.',
    'Deleting an outlier because it looks wrong. It may be a recording error or a genuine extreme value, and only checking the source can tell you which.',
    'Ignoring two humps. A double-peaked plot usually means two different groups have been combined, and the average of the whole describes neither of them.'
  ]
},
{
  id: 'centerspread', strand: 'data', fig: 'boxPlotSpread',
  title: 'Centre & Spread',
  big: 'One number for the middle is never enough, because two very different groups can share an average.',
  discover: [
    '**Two classes both average $80$ on a test.**',
    'Class A scored $78, 80, 80, 81, 82$. Class B scored $60, 70, 80, 90, 100$.',
    { fig: 'discCenterspread' },
    'The averages are **identical**. The classes are not remotely alike.',
    'In one, everyone understood about the same amount. In the other, some sailed through and some were lost.',
    { punch: 'A teacher would treat those classes completely differently, and the mean cannot tell them apart. That is why spread has to be reported alongside the centre.' }
  ],
  funfact: [
    'The mean is the balance point: if the values were weights on a ruler, it is where the ruler would balance.',
    'Median income is usually reported rather than mean income, because a few very large incomes drag the mean well above what most people earn.',
    'The mean absolute deviation asks a simple question — how far is a typical value from the middle — and answers it in the original units.'
  ],
  vocab: [
    ['Mean', 'The total divided by how many values there are.'],
    ['Median', 'The middle value once they are in order.'],
    ['Mode', 'The value that appears most often.'],
    ['Range', 'The largest value minus the smallest.'],
    ['Mean absolute deviation', 'The average distance of the values from the mean.']
  ],
  sections: [
    { h: 'Three kinds of middle',
      p: ['The **mean** is the total shared out evenly. The **median** is the middle one in order. The **mode** is the commonest.',
          'For $3, 4, 4, 5, 14$: mean $6$, median $4$, mode $4$.',
          'They can differ sharply, and which is most useful depends on the data.'],
      box: { k: 'key', h: 'Order before you take a median', t: 'The median of an unsorted list is meaningless. <strong>Sorting first is not optional</strong>, and it is where most median errors come from.' } },
    { h: 'Which centre to use',
      p: ['The mean uses every value, which makes it sensitive to **extremes**.',
          'The median ignores how far out the extremes are, so it is steadier when there are outliers.',
          'For $12, 15, 15, 18, 140$ the median of $15$ describes a typical value far better than the mean of $40$.'],
      box: { k: 'slow', h: 'One big value', t: 'A single outlier can move the mean a long way and the median hardly at all. <em>That difference is a signal worth noticing.</em>' } },
    { h: 'Range: the quickest measure of spread',
      p: ['Range is largest minus smallest — one subtraction.',
          'It is easy but fragile, because it depends on **only two values**.',
          'One unusual value can make a tightly clustered set look widely spread.'],
      box: { k: 'warn', h: 'Two values decide it', t: 'A class of scores all near $80$ with one at $30$ has a range of over $50$. <strong>The range says nothing about the ninety-eight per cent in the middle.</strong>' } },
    { h: 'Mean absolute deviation',
      p: ['Find the mean, then find how far **each** value sits from it, then average those distances.',
          'Distances are taken as positive, since a value five below is just as far out as one five above.',
          'A small MAD means everyone is close to the middle; a large one means they are scattered.'],
      box: { k: 'key', h: 'Why the distances are positive', t: 'Signed differences always add to zero — that is what the mean does. <em>Taking them as distances is what stops the answer being zero every time.</em>' } },
    { h: 'Reporting honestly',
      p: ['Give a centre and a spread together. Either one alone can mislead.',
          '"Mean $80$, MAD $1.2$" and "mean $80$, MAD $12$" describe **completely different** classes.',
          'Adding the shape makes the description complete.'],
      box: { k: 'slow', h: 'Two numbers, not one', t: 'A single average is the most common way to mislead with true numbers. <strong>The spread is what stops it.</strong>' } }
  ],
  examples: [
    { t: 'Mean and median', q: 'Find the mean and median of $3, 4, 4, 5, 14$.',
      steps: [
        { do: 'Mean: $\\dfrac{3+4+4+5+14}{5} = \\dfrac{30}{5} = 6$.', why: 'Total divided by the count.' },
        { do: 'Already in order, so the median is the third value: $4$.', why: 'Five values, so the middle is the third.' },
        { do: 'The $14$ pulls the mean above every other value but one.', why: 'A single outlier moving the mean.' }
      ], ans: 'Mean $6$, median $4$' },
    { t: 'Choosing a centre', q: 'House prices in a street are $\\$210$k, $\\$220$k, $\\$230$k, $\\$240$k and $\\$1.2$m. Which centre describes a typical house?',
      steps: [
        { do: 'The mean is $\\dfrac{210+220+230+240+1200}{5} = 420$ thousand.', why: 'Dragged up by the mansion.' },
        { do: 'No ordinary house on the street costs anything like $\\$420$k.', why: 'The mean describes none of them.' },
        { do: 'The median is $\\$230$k, which is typical.', why: 'The median resists a single extreme value.' }
      ], ans: 'The median, $\\$230$k' },
    { t: 'Mean absolute deviation', q: 'Find the MAD of $4, 8, 10, 14$.',
      steps: [
        { do: 'Mean: $\\dfrac{36}{4} = 9$.', why: 'Needed before any distances.' },
        { do: 'Distances from $9$: $5, 1, 1, 5$.', why: 'All taken as positive.' },
        { do: 'Average them: $\\dfrac{12}{4} = 3$.', why: 'A typical value sits $3$ from the mean.' }
      ], ans: '$3$' }
  ],
  mistakes: [
    'Taking the median without sorting. The median of $5, 1, 9$ is $5$, not $1$ — the list must be in order before the middle means anything.',
    'Using the mean when one value is extreme. House prices of $\\$210$k to $\\$1.2$m have a mean of $\\$420$k, which describes no house on the street. The median of $\\$230$k does.',
    'Reporting a centre with no spread. "Mean $80$" fits a class where everyone scored $80$ and a class split between $60$ and $100$. The spread is what separates them.',
    'Letting the deviations keep their signs. Signed differences from the mean always add to zero, so the MAD would be zero every time. Take each distance as positive.',
    'Trusting the range on a small set. It depends on only the two extreme values, so one outlier makes a tightly grouped set look wildly spread.'
  ]
}
];

/* Courses share one unit registry; each course fixes its own sequence.
   A unit's displayed number is its position in the active course, not a stored field. */
window.COURSES = {
  grade6: {
    id: 'grade6', name: 'Grade 6 Math', short: 'Grade 6',
    blurb: 'Where middle school starts: decimals and fraction division, integers and the coordinate plane, ratios, rates and percents, expressions and one-step equations, area, surface area and volume, and a first look at data.',
    units: ['decimalops','gcflcm','fracdiv','integers6','coordplane','ratios6','unitrates',
            'percent6','expressions6','equations6','inequal6','areatri','surfacenets',
            'volumefrac','statquestions','centerspread','graphs']
  },
  accel: {
    id: 'accel', name: 'Grade 7 Accelerated', short: 'Gr 7 Accel',
    blurb: 'Ratio and proportion, rational numbers, statistics and probability, equations and inequalities, then geometry.',
    units: ['rates','percents','posrational','negrational','stats','probsimple','probcompound','proprel',
            'algrel','reasoning','equations','inequalities','scale','area2d','sections3d','volume','construction']
  },
  math7: {
    id: 'math7', name: 'Grade 7 Math', short: 'Grade 7',
    blurb: 'A traditional sequence: number systems and exponents, then algebra, measurement and geometry, finishing with data, Pythagoras and functions.',
    units: ['exponents','problemsolving','squareroots','realnumbers','gcflcm','negrational','algrel','equations',
            'measurement','circles','volume','rates','proprel','graphs','stats','probsimple','probcompound',
            'pythagorean','functions']
  },
  grade8: {
    id: 'grade8', name: 'Grade 8 Math', short: 'Grade 8',
    blurb: 'Transformations and congruence, linear equations and angles, functions and systems, bivariate data, then real numbers, Pythagoras and volume.',
    units: ['transformations','congruence','dilations','multistep','angles8','slope','linearfn',
            'functiondef','systems8','scatter','bestfit','twoway','squareroots','realnumbers',
            'pythagorean','distance8','exponents','scinotation','volume8']
  },
  grade9: {
    id: 'grade9', name: 'Algebra I · Grade 9 or accelerated Grade 8', short: 'Algebra I',
    blurb: 'Regents Algebra I — the Grade 9 course, and the same course accelerated students take in Grade 8: expressions and equations, linear relationships and data, exponential and quadratic functions, radicals, and statistics.',
    units: ['expressions9','solving9','inequalities9','slopeforms','writelinear','systems9',
            'regression','exponential','sequences9','polynomials','factoring','quadgraphs',
            'solvequad','radicals','advfunctions','stats9']
  },
  geometry: {
    id: 'geometry', name: 'Geometry', short: 'Geometry',
    blurb: 'The Regents Geometry course: definitions and proof, triangles and quadrilaterals, similarity and right-triangle trigonometry, circles, coordinate proof, and solids.',
    units: ['geobasics','geoproof','angles8','triproof','polygons','area2d','transformations',
            'dilations','simproof','pythagorean','righttri','circles','circleangles','distance8',
            'circleeq','coordproof','construction','sections3d','solids3d']
  },
  algebra2: {
    id: 'algebra2', name: 'Algebra II', short: 'Algebra II',
    blurb: 'Regents Algebra II \u2014 the Grade 11 course: functions and their transformations, polynomials, radicals and rational expressions, exponentials and logarithms, series, trigonometry, and inferential statistics.',
    units: ['functionops','transformfn','polynomials','factoring','polydiv','polyfn',
            'solvequad','radicals','complexnum','radicaleq','rational','exponential',
            'logarithms','expmodels','sequences9','series','unitcircle','triggraphs',
            'trigid','normaldist','statinf']
  },
  precalc: {
    id: 'precalc', name: 'Precalculus', short: 'Precalculus',
    blurb: 'The Grade 12 course: every function type revisited, then inverse and oblique trigonometry, polar form, vectors, matrices, conics and parametric curves \u2014 finishing with limits, derivatives and the area under a curve.',
    units: ['functionops','transformfn','polydiv','polyfn','rational','radicaleq','complexnum',
            'logarithms','expmodels','unitcircle','triggraphs','trigid','invtrig','trigadv',
            'polar','vectors','matrices','conics','paramfn','series','probadv','normaldist',
            'limits','derivintro','areaintro']
  }
};