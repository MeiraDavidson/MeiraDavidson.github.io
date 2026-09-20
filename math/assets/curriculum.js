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
  skills: { name: 'Problem Solving', hue: 'f' }
};

window.UNITS = [
{
  id: 'rates', n: 1, strand: 'ratio', fig: 'doubleNumberLine',
  title: 'Proportional Reasoning with Rates',
  big: 'A rate compares two different kinds of quantity. Turn it into a unit rate and you can compare anything.',
  vocab: [
    ['Ratio', 'A comparison of two quantities, like $3$ cups flour to $2$ cups water.'],
    ['Rate', 'A ratio of two <em>different</em> units, like miles per hour or dollars per pound.'],
    ['Unit rate', 'A rate with denominator $1$ — how much for exactly one.'],
    ['Constant of proportionality', 'The unit rate, written $k$, in $y = kx$.']
  ],
  sections: [
    { h: 'What a rate really says',
      p: ['A ratio compares two amounts. When the two amounts have <strong>different units</strong>, we call it a rate.',
          'If a car travels $150$ miles in $3$ hours, the rate is $\\dfrac{150 \\text{ miles}}{3 \\text{ hours}}$. That fraction is the rate. It is true, but it is hard to compare to other cars.',
          'So we shrink the bottom to $1$. Divide both the top and the bottom by $3$: $\\dfrac{150 \\div 3}{3 \\div 3} = \\dfrac{50}{1}$. The car goes $50$ miles every $1$ hour. That is the <strong>unit rate</strong>.'],
      box: { k: 'key', h: 'The one move', t: 'To find a unit rate, divide the top number by the bottom number. Nothing else. $\\dfrac{a}{b} \\to a \\div b$ per one.' } },
    { h: 'Why unit rates win',
      p: ['You cannot compare $\\$7.50$ for $3$ pounds against $\\$11.60$ for $4$ pounds just by looking. The numbers are all different sizes.',
          'But $7.50 \\div 3 = \\$2.50$ per pound, and $11.60 \\div 4 = \\$2.90$ per pound. Now it is obvious. Unit rates put two deals on the same footing.'],
      box: { k: 'slow', h: 'Take it a step at a time', t: 'Ask yourself out loud: <em>"per one what?"</em> That question tells you which number goes on the bottom. Cost per pound &rarr; pounds on the bottom. Miles per hour &rarr; hours on the bottom.' } },
    { h: 'Rates with fractions',
      p: ['Sometimes the numbers themselves are fractions: a snail crawls $\\dfrac{1}{2}$ foot in $\\dfrac{1}{4}$ hour. The rule does not change — still divide.',
          '$\\dfrac{1}{2} \\div \\dfrac{1}{4} = \\dfrac{1}{2} \\times \\dfrac{4}{1} = 2$. The snail moves $2$ feet per hour.',
          'Dividing by a fraction smaller than $1$ makes the answer bigger. That is not a mistake — it is because a quarter hour is a short time, so in a whole hour the snail gets much further.'] },
    { h: 'The double number line',
      p: ['Draw two parallel lines: one for each quantity. Line them up so matching values sit above each other. Now you can step along by equal jumps and read off any value you need.',
          'This is the picture behind every rate problem. If $4$ tickets cost $\\$18$, mark $4$ under $\\$18$, then halve both to get $2$ tickets for $\\$9$, then halve again for $1$ ticket at $\\$4.50$.'] }
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
    'Dividing the wrong way round. "Miles per hour" means miles $\\div$ hours, <em>not</em> hours $\\div$ miles. The word after "per" always goes on the bottom.',
    'Comparing totals instead of unit rates. A bigger box costing more does not make it a worse deal.',
    'Forgetting that dividing by a fraction less than $1$ makes the answer larger.'
  ]
},
{
  id: 'percents', n: 2, strand: 'ratio', fig: 'percentGrid',
  title: 'Proportional Reasoning with Percents',
  big: 'A percent is a rate out of 100. Turn it into a multiplier and every percent problem becomes one multiplication.',
  vocab: [
    ['Percent', 'Parts per hundred. $37\\% = \\dfrac{37}{100} = 0.37$.'],
    ['Multiplier', 'The single number you multiply by. A $20\\%$ increase has multiplier $1.20$.'],
    ['Percent change', '$\\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\%$ — always divided by the <em>original</em>.'],
    ['Markup / discount', 'An increase / a decrease applied to a starting price.']
  ],
  sections: [
    { h: 'Percent means "out of 100"',
      p: ['The word comes from <em>per centum</em> — for each hundred. So $45\\%$ means $45$ out of every $100$.',
          'That gives you three forms of the same thing, and you should be able to slide between them instantly: $45\\% = \\dfrac{45}{100} = 0.45$.',
          'To go from percent to decimal, move the point two places left. To go back, move it two places right.'] },
    { h: 'The multiplier trick',
      p: ['Most students compute the change and then add or subtract. That works, but it is two steps and two chances to slip.',
          'Instead, fold it into one number. A $30\\%$ discount leaves $70\\%$ of the price, so multiply by $0.70$. An $8\\%$ tax gives $108\\%$ of the price, so multiply by $1.08$.'],
      box: { k: 'key', h: 'Multipliers', t: 'Increase by $p\\%$: multiply by $1 + \\dfrac{p}{100}$.<br>Decrease by $p\\%$: multiply by $1 - \\dfrac{p}{100}$.' } },
    { h: 'Why multipliers matter: changes stack',
      p: ['A store raises a price $50\\%$, then puts it $50\\%$ off. Back to where it started? No.',
          'Multipliers: $1.50 \\times 0.50 = 0.75$. The final price is $75\\%$ of the original — a $25\\%$ <em>drop</em>.',
          'The reason is that the two changes are measured from different bases. The increase is on the small original; the decrease is on the bigger new number, so it takes away more.'],
      box: { k: 'warn', h: 'Percent changes never simply cancel', t: 'Up $50\\%$ then down $50\\%$ is <strong>not</strong> a wash. Multiply the multipliers and see what you actually get.' } },
    { h: 'Percent change',
      p: ['To find how much something changed in percent terms: $\\dfrac{\\text{new} - \\text{old}}{\\text{old}}$, then convert to a percent.',
          'The denominator is always the <strong>original</strong> amount. Going from $40$ to $50$ is a $25\\%$ increase ($\\dfrac{10}{40}$). Going from $50$ back to $40$ is a $20\\%$ decrease ($\\dfrac{10}{50}$). Same $10$, different percents, because the starting point changed.'] },
    { h: 'Finding the original',
      p: ['If a jacket is $\\$63$ after a $30\\%$ discount, the $\\$63$ is $70\\%$ of the original. So original $\\times 0.70 = 63$, which means original $= 63 \\div 0.70 = \\$90$.',
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
    'Adding percent changes instead of multiplying multipliers. Up $10\\%$ then up $10\\%$ is $21\\%$, not $20\\%$.',
    'Using the new amount as the denominator in percent change. Always divide by the <em>original</em>.',
    'Multiplying by the multiplier when you should divide. If you are given the result and want the start, divide.'
  ]
},
{
  id: 'posrational', n: 3, strand: 'number', fig: 'fractionBars',
  title: 'Positive Rational Number Operations',
  big: 'Fractions, decimals and percents are three costumes for the same number. Choose whichever makes the arithmetic easiest.',
  vocab: [
    ['Rational number', 'Any number you can write as a fraction $\\dfrac{a}{b}$ with $b \\neq 0$.'],
    ['Reciprocal', 'The flip of a fraction. The reciprocal of $\\dfrac{3}{5}$ is $\\dfrac{5}{3}$.'],
    ['LCD', 'Least common denominator — the smallest number both denominators divide into.'],
    ['Terminating / repeating', 'Every fraction becomes a decimal that either stops or repeats forever.']
  ],
  sections: [
    { h: 'Adding and subtracting needs a common denominator',
      p: ['You can only add pieces that are the same size. Thirds and fourths are different sizes, so first rename both as twelfths.',
          '$\\dfrac{2}{3} + \\dfrac{1}{4} = \\dfrac{8}{12} + \\dfrac{3}{12} = \\dfrac{11}{12}$.',
          'To find the LCD, list multiples of the larger denominator until one is divisible by the other: $4, 8, 12$ — and $12$ works for $3$.'],
      box: { k: 'slow', h: 'A picture that helps', t: 'Imagine slicing a pizza into thirds and another into fourths. You cannot say how much pizza you have in one clean fraction until both pizzas are cut the same way — into twelfths.' } },
    { h: 'Multiplying is easier than adding',
      p: ['Multiplying fractions needs <strong>no</strong> common denominator. Just multiply across the top and across the bottom.',
          '$\\dfrac{2}{3} \\times \\dfrac{1}{4} = \\dfrac{2}{12} = \\dfrac{1}{6}$.',
          'Better: cancel before you multiply. $\\dfrac{2}{3} \\times \\dfrac{1}{4}$ — the $2$ and the $4$ share a factor of $2$, so it becomes $\\dfrac{1}{3} \\times \\dfrac{1}{2} = \\dfrac{1}{6}$. Smaller numbers, less to simplify later.'],
      box: { k: 'warn', h: 'Watch out', t: 'The rule "common denominator" belongs to $+$ and $-$ only. Students often drag it into multiplication, where it just makes extra work.' } },
    { h: 'Dividing: multiply by the reciprocal',
      p: ['$\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}$.',
          'Why? Because "how many $\\dfrac{1}{4}$s fit inside $\\dfrac{1}{2}$?" is asking how many small pieces make a big one — the answer $2$ is bigger than either number.',
          'Keep it, Change it, Flip it: keep the first fraction, change $\\div$ to $\\times$, flip the second.'] },
    { h: 'Fractions to decimals and back',
      p: ['To make a fraction a decimal, divide the top by the bottom: $\\dfrac{5}{8} = 5 \\div 8 = 0.625$.',
          'A fraction terminates exactly when its denominator (in lowest terms) has only $2$s and $5$s as prime factors. $\\dfrac{5}{8}$ terminates because $8 = 2^3$. $\\dfrac{1}{3}$ repeats because $3$ is neither.',
          'To make a terminating decimal a fraction, read it aloud: $0.625$ is "six hundred twenty-five thousandths" $= \\dfrac{625}{1000} = \\dfrac{5}{8}$.'] },
    { h: 'Order of operations still rules',
      p: ['Parentheses, then exponents, then multiply/divide left to right, then add/subtract left to right.',
          'Inside a complex fraction, the bar acts like a giant pair of parentheses: finish the whole top and the whole bottom before dividing.'] }
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
    'Adding denominators: $\\dfrac{1}{2} + \\dfrac{1}{3} \\neq \\dfrac{2}{5}$. You add numerators only, after matching denominators.',
    'Finding a common denominator before multiplying — legal but wasteful, and it usually causes an arithmetic slip.',
    'Flipping the wrong fraction when dividing. Only the <em>second</em> one flips.'
  ]
},
{
  id: 'negrational', n: 4, strand: 'number', fig: 'numberLineHop',
  title: 'Positive & Negative Rational Number Operations',
  big: 'Negative numbers are directions, not just "less than nothing". Subtraction is adding the opposite, and sign rules come from patterns you can see.',
  vocab: [
    ['Opposite', 'Same distance from zero, other side. The opposite of $-7$ is $7$.'],
    ['Absolute value', '$|x|$ — distance from zero, always positive or zero.'],
    ['Additive inverse', 'The number you add to get $0$. $-7 + 7 = 0$.'],
    ['Integer', 'A whole number, positive, negative, or zero.']
  ],
  sections: [
    { h: 'The number line is the whole idea',
      p: ['Put positives to the right of zero and negatives to the left. Adding a positive walks right. Adding a negative walks left.',
          '$-3 + 5$: start at $-3$, walk $5$ to the right, land on $2$.',
          '$4 + (-9)$: start at $4$, walk $9$ left, land on $-5$.'] },
    { h: 'Subtraction is adding the opposite',
      p: ['This one rule replaces all the confusing cases: $a - b = a + (-b)$.',
          '$5 - 8 = 5 + (-8) = -3$. And $-2 - (-6) = -2 + 6 = 4$.',
          'Two minus signs next to each other turn into a plus, because the opposite of going left is going right.'],
      box: { k: 'key', h: 'Keep–Change–Change', t: 'Keep the first number. Change the $-$ to $+$. Change the sign of the second number. Now you only ever add.' } },
    { h: 'Why a negative times a negative is positive',
      p: ['Look at a pattern instead of memorizing:',
          '$3 \\times (-2) = -6$, $\;2 \\times (-2) = -4$, $\;1 \\times (-2) = -2$, $\;0 \\times (-2) = 0$.',
          'Each time the left factor drops by $1$, the answer rises by $2$. Keep going: $-1 \\times (-2)$ must be $2$, and $-2 \\times (-2)$ must be $4$. The pattern forces it.'],
      box: { k: 'key', h: 'Sign rules', t: 'Same signs &rarr; positive. Different signs &rarr; negative. This holds for both $\\times$ and $\\div$.' } },
    { h: 'Counting the negatives',
      p: ['In a long product, count how many negative factors there are. An <strong>even</strong> count gives a positive answer; an <strong>odd</strong> count gives a negative one.',
          '$(-1)(-2)(-3)(-4) = 24$ — four negatives, even, positive.',
          '$(-2)^5 = -32$ — five negatives, odd, negative.'] },
    { h: 'The trap: $-3^2$ versus $(-3)^2$',
      p: ['$(-3)^2 = (-3)(-3) = 9$. The parentheses say the negative is part of the base.',
          '$-3^2 = -(3^2) = -9$. Without parentheses, the exponent grabs only the $3$, and the minus sign waits outside.'] }
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
    'Reading $-3^2$ as $9$. Without parentheses it is $-9$.',
    'Treating "two negatives make a positive" as if it applied to <em>addition</em>. $-3 + (-5) = -8$, not $8$.',
    'Losing the sign halfway through a multi-step problem. Decide the sign first, then do the arithmetic.'
  ]
},
{
  id: 'stats', n: 5, strand: 'data', fig: 'samplingDots',
  title: 'Sampling, Inferences & Comparing Populations',
  big: 'You cannot measure everyone, so you measure some. A random sample lets a small group speak honestly for a large one.',
  vocab: [
    ['Population', 'Every member of the group you care about.'],
    ['Sample', 'The part of the population you actually measure.'],
    ['Random sample', 'Every member has an equal chance of being picked — the only kind you can trust.'],
    ['Mean / median', 'Two kinds of centre: the balance point, and the middle value.'],
    ['MAD', 'Mean absolute deviation — the average distance from the mean; a measure of spread.']
  ],
  sections: [
    { h: 'Why sampling works',
      p: ['If you want to know the average height of every 7th grader in the district, measuring all $900$ is impractical. Measure $60$ chosen at random and you will land very close.',
          'The key word is <strong>random</strong>. Surveying only the basketball team gives a great answer about basketball players and a terrible one about 7th graders.'],
      box: { k: 'warn', h: 'Biased samples', t: 'A sample is biased when some part of the population is more likely to be chosen. Asking people outside a gym about exercise habits is biased. So is a survey only people with strong opinions bother to answer.' } },
    { h: 'Using a sample to estimate the whole',
      p: ['This is proportional reasoning again. If $18$ of $60$ sampled students walk to school, that is $\\dfrac{18}{60} = 0.30$, so about $30\\%$.',
          'Scale up: $0.30 \\times 900 = 270$ students in the whole district, approximately.',
          'Say "about". A sample gives an estimate, not a fact.'] },
    { h: 'Centre: mean and median',
      p: ['The <strong>mean</strong> is the total shared out equally: add everything, divide by how many.',
          'The <strong>median</strong> is the middle value once the data is in order. With an even count, average the two middle numbers.',
          'A single huge value drags the mean but barely moves the median. That is why house prices and incomes are usually reported as medians.'],
      box: { k: 'key', h: 'A useful identity', t: 'Sum $=$ mean $\\times$ count. Most "the average changes when one more score arrives" problems are solved by converting averages back into sums.' } },
    { h: 'Spread: why two groups can share a mean and be nothing alike',
      p: ['Group A: $50, 50, 50, 50$. Group B: $20, 40, 60, 80$. Both have mean $50$, but B is far more spread out.',
          'Mean absolute deviation measures this: find each value\'s distance from the mean, then average those distances. For B: distances are $30, 10, 10, 30$, so MAD $= 20$. For A, MAD $= 0$.'] },
    { h: 'Comparing two populations',
      p: ['To say one group is really higher than another, compare the difference in centres to the spread.',
          'If two 7th grade classes have mean scores $82$ and $86$ but each has a MAD of $12$, the $4$-point gap is small next to the natural variation — not convincing.',
          'If the MADs were $1$, that same $4$-point gap would be a big deal.'] }
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
    'Trusting a convenience sample. Where you stand to ask changes the answer you get.',
    'Forgetting to put the data in order before finding the median.',
    'Claiming a difference is meaningful without looking at the spread.'
  ]
},
{
  id: 'probsimple', n: 6, strand: 'data', fig: 'spinner',
  title: 'Probability of Simple Events',
  big: 'Probability is a fraction: what you want over everything that could happen — as long as every outcome is equally likely.',
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
          'Rolling a $6$-sided die, $P(\\text{even}) = \\dfrac{3}{6} = \\dfrac{1}{2}$, because $2$, $4$ and $6$ are even out of six faces.',
          'Every probability sits between $0$ and $1$. Zero means impossible, one means certain. If you ever get $\\dfrac{7}{5}$, you have made an error.'],
      box: { k: 'warn', h: 'The hidden condition', t: 'That fraction only works when every outcome is <strong>equally likely</strong>. A spinner with unequal wedges breaks it — then you must use area, not a count of regions.' } },
    { h: 'Listing the sample space',
      p: ['When you are unsure, write out every outcome. For two coins: HH, HT, TH, TT — four outcomes, not three.',
          'People often say "two heads, one of each, two tails — so $\\dfrac{1}{3}$ each". That is wrong, because "one of each" happens two ways. $P(\\text{one of each}) = \\dfrac{2}{4} = \\dfrac{1}{2}$.'] },
    { h: 'The complement shortcut',
      p: ['Sometimes counting what you <em>do not</em> want is far easier.',
          '$P(\\text{at least one head in 3 flips})$ has many cases. But the opposite — no heads at all — is a single case, TTT, with probability $\\dfrac{1}{8}$.',
          'So the answer is $1 - \\dfrac{1}{8} = \\dfrac{7}{8}$.'],
      box: { k: 'key', h: 'Watch for "at least"', t: 'The phrase "at least one" is almost always a signal to use the complement.' } },
    { h: 'Theoretical and experimental probability',
      p: ['Theoretical probability comes from reasoning: a fair coin gives $P(\\text{H}) = \\dfrac{1}{2}$.',
          'Experimental probability comes from trials: flip $50$ times, get $28$ heads, so $\\dfrac{28}{50} = 0.56$.',
          'They rarely match exactly, and they do not have to. The more trials you run, the closer experiment usually drifts toward theory — that is the law of large numbers.'] },
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
    'Counting outcomes that are not equally likely, such as treating "one head one tail" as one outcome instead of two.',
    'Giving an answer above $1$ or below $0$.',
    'Confusing odds with probability.'
  ]
},
{
  id: 'probcompound', n: 7, strand: 'data', fig: 'treeDiagram',
  title: 'Probability of Compound Events',
  big: 'Two or more things happening: multiply along a path, add across paths, and watch whether the first event changes the second.',
  vocab: [
    ['Compound event', 'An event made of two or more simple events.'],
    ['Independent', 'The first event does not change the second — like rolling a die twice.'],
    ['Dependent', 'The first event changes the second — like drawing marbles without replacing them.'],
    ['Tree diagram', 'A branching picture of all the ways a sequence can unfold.'],
    ['Fundamental counting principle', 'If one stage has $m$ ways and the next has $n$, together they have $m \\times n$ ways.']
  ],
  sections: [
    { h: 'Counting first',
      p: ['Before probability, get good at counting. If a menu has $4$ mains and $3$ desserts, there are $4 \\times 3 = 12$ meals.',
          'Multiply the number of choices at each independent stage. This is the fundamental counting principle, and it is the engine behind almost every compound probability question.'] },
    { h: 'Multiply along a path',
      p: ['$P(A \\text{ and then } B) = P(A) \\times P(B \\text{ given } A)$.',
          'Roll two dice: $P(\\text{both } 6) = \\dfrac{1}{6} \\times \\dfrac{1}{6} = \\dfrac{1}{36}$. Dice do not remember, so the second probability is unchanged.'],
      box: { k: 'key', h: 'And multiplies, or adds', t: '"And" along a single path &rarr; multiply.<br>"Or" across separate paths &rarr; add.' } },
    { h: 'With replacement vs without',
      p: ['A bag has $4$ red and $6$ blue marbles.',
          '<strong>With replacement:</strong> $P(\\text{two reds}) = \\dfrac{4}{10} \\times \\dfrac{4}{10} = \\dfrac{4}{25}$. You put the first marble back, so nothing changed.',
          '<strong>Without replacement:</strong> $P(\\text{two reds}) = \\dfrac{4}{10} \\times \\dfrac{3}{9} = \\dfrac{2}{15}$. One red is gone, so both the top and the bottom drop by one.'],
      box: { k: 'warn', h: 'The single most common error', t: 'Forgetting to shrink the denominator on the second draw. If the problem says "without replacing", the total goes down too.' } },
    { h: 'Tree diagrams',
      p: ['Draw a branch for each option at each stage. Write the probability on each branch. Multiply along a branch to get that path\'s probability; add the paths that satisfy your event.',
          'Check yourself: all the final path probabilities must add to $1$.'] },
    { h: 'When order does not matter',
      p: ['"How many ways to choose $2$ students from $5$?" If order does not matter, pairs like (Ana, Ben) and (Ben, Ana) are the same team.',
          'Count the ordered ways, $5 \\times 4 = 20$, then divide by the $2$ orderings of each pair: $\\dfrac{20}{2} = 10$.',
          'That is written $\\binom{5}{2} = 10$ and read "5 choose 2". A round-robin tournament with $5$ teams has exactly $10$ games.'] }
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
    'Using the same denominator twice in a "without replacement" problem.',
    'Adding when you should multiply. "And" multiplies; "or" adds.',
    'Forgetting to divide out repeats when order does not matter.'
  ]
},
{
  id: 'proprel', n: 8, strand: 'ratio', fig: 'proportionalLine',
  title: 'Proportional Relationships',
  big: 'A proportional relationship is $y = kx$: a straight line through the origin, with one constant ratio running through every pair.',
  vocab: [
    ['Proportional', 'Two quantities with a constant ratio: $\\dfrac{y}{x} = k$ always.'],
    ['Constant of proportionality', '$k$ — the unit rate, the slope, and the value of $y$ when $x = 1$.'],
    ['Origin', 'The point $(0, 0)$, which every proportional graph passes through.'],
    ['Linear but not proportional', 'A straight line that misses the origin, like $y = 3x + 5$.']
  ],
  sections: [
    { h: 'The three signatures',
      p: ['A relationship is proportional if — and only if — all three of these hold, and any one of them implies the others:',
          '<strong>In a table:</strong> every $\\dfrac{y}{x}$ gives the same number.',
          '<strong>In a graph:</strong> it is a straight line <em>through the origin</em>.',
          '<strong>In an equation:</strong> it can be written $y = kx$, with nothing added on.'],
      box: { k: 'key', h: 'The origin test', t: 'Zero hours worked must mean zero dollars earned. If there is a flat fee, the line misses the origin and the relationship is linear but <strong>not</strong> proportional.' } },
    { h: 'Finding $k$ from a table',
      p: ['Divide $y$ by $x$ for each row. If you get the same value every time, that value is $k$.',
          'Hours $2, 5, 8$ and pay $\\$30, \\$75, \\$120$: $\\dfrac{30}{2} = 15$, $\\dfrac{75}{5} = 15$, $\\dfrac{120}{8} = 15$. So $k = 15$ and $y = 15x$.',
          'If even one row disagrees, it is not proportional.'] },
    { h: 'What $k$ means on the graph',
      p: ['$k$ is the slope: how far up the line climbs for each step right.',
          'It is also the $y$-value at $x = 1$. Find the point directly above $1$ on the graph and read its height — that is $k$.',
          'Steeper line means larger $k$ means a faster rate.'] },
    { h: 'Reading a proportional graph',
      p: ['Every point $(x, y)$ on the line means "$x$ of these go with $y$ of those".',
          'The point $(1, k)$ is the unit rate. The point $(0, 0)$ says nothing goes with nothing.',
          'When two proportional relationships are graphed together, the steeper one is the better rate — if you want more $y$ per $x$.'] },
    { h: 'Solving with proportions',
      p: ['Because the ratio is constant, you can set two ratios equal and cross-multiply.',
          'If $3$ notebooks cost $\\$4.50$, then $\\dfrac{4.50}{3} = \\dfrac{c}{7}$ for $7$ notebooks, so $3c = 31.50$ and $c = \\$10.50$.',
          'Keep the units in the same position on both sides — dollars on top both times, or the equation lies.'] }
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
    'Calling any straight line proportional. It must pass through $(0,0)$.',
    'Computing $\\dfrac{x}{y}$ instead of $\\dfrac{y}{x}$ — you get the reciprocal of $k$.',
    'Setting up a proportion with the units crossed, like dollars over items on one side and items over dollars on the other.'
  ]
},
{
  id: 'algrel', n: 9, strand: 'algebra', fig: 'sequenceBlocks',
  title: 'Representing Other Algebraic Relationships',
  big: 'Not everything is proportional. Learn to read a pattern, name the rule, and write it as an expression you can trust.',
  vocab: [
    ['Expression', 'A math phrase with no equals sign, like $3n + 5$.'],
    ['Term', 'A piece of an expression separated by $+$ or $-$.'],
    ['Coefficient', 'The number multiplying a variable — the $3$ in $3n$.'],
    ['Like terms', 'Terms with exactly the same variable part; only these can be combined.'],
    ['Arithmetic sequence', 'A list that grows by adding the same amount each time.']
  ],
  sections: [
    { h: 'From a pattern to a rule',
      p: ['Suppose a pattern of tiles goes $5, 8, 11, 14, \\dots$',
          'The <strong>step</strong> is $+3$ each time, so the rule contains $3n$. Now find the adjustment: at $n = 1$ we need $5$, and $3 \\times 1 = 3$, so we add $2$.',
          'The rule is $3n + 2$. Test it on another term: $n = 4$ gives $3(4) + 2 = 14$. &check;'],
      box: { k: 'key', h: 'The two-part recipe', t: 'For an arithmetic pattern: <strong>rule $=$ (step) $\\times n + $ (the value before the first step)</strong>. Find the step, then back up one term to find the constant.' } },
    { h: 'Why $3n + 2$ is not proportional',
      p: ['Check the origin: at $n = 0$ the rule gives $2$, not $0$. The graph is a straight line lifted two units up.',
          'The $+2$ is a starting amount that was there before any growth happened — a flat fee, a first tile, a head start.'] },
    { h: 'Combining like terms',
      p: ['$4x + 7 + 2x - 3$ becomes $6x + 4$. You may combine the $4x$ and $2x$ because both count $x$s. You may combine $7$ and $-3$ because both are plain numbers.',
          'You may <strong>not</strong> combine $6x$ and $4$ — they count different things. That is like adding $6$ apples to $4$ dollars.'],
      box: { k: 'slow', h: 'Circle before you combine', t: 'Circle each term <em>with the sign in front of it</em>. $4x + 7 + 2x - 3$ has terms $+4x$, $+7$, $+2x$, $-3$. Sorting them this way stops sign errors.' } },
    { h: 'The distributive property',
      p: ['$a(b + c) = ab + ac$. The multiplier reaches every term inside.',
          '$3(2x - 5) = 6x - 15$. Notice the $-5$ also gets multiplied; the sign travels with it.',
          'Backwards, this is factoring: $12x + 18 = 6(2x + 3)$.'] },
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
    'Forgetting to distribute to the second term: $3(x + 4) \\neq 3x + 4$.',
    'Dropping a negative when distributing: $-2(x + 4) = -2x - 8$, not $-2x + 8$.',
    'Combining unlike terms, such as writing $5x + 3 = 8x$.'
  ]
},
{
  id: 'reasoning', n: 10, strand: 'algebra', fig: 'balanceScale',
  title: 'Reasoning with Equations & Inequalities',
  big: 'Before you solve anything, translate. Most of the difficulty in a word problem is turning English into algebra.',
  vocab: [
    ['Variable', 'A letter standing for an unknown number.'],
    ['Equation', 'A statement that two expressions are equal.'],
    ['Inequality', 'A statement that one expression is less than or greater than another.'],
    ['Solution', 'A value that makes the statement true.']
  ],
  sections: [
    { h: 'Translate the words',
      p: ['Build the habit of writing what each letter means before anything else. "Let $b$ = the number of blue marbles." One sentence, and half the confusion disappears.',
          '<strong>Sum, more than, increased by</strong> &rarr; $+$<br><strong>Difference, less than, decreased by</strong> &rarr; $-$<br><strong>Of, product, times, each</strong> &rarr; $\\times$<br><strong>Per, quotient, shared equally</strong> &rarr; $\\div$<br><strong>Is, was, gives, results in</strong> &rarr; $=$'],
      box: { k: 'warn', h: '"Less than" flips the order', t: '"$5$ less than $x$" is $x - 5$, <strong>not</strong> $5 - x$. Read it as "take 5 away from x". The same flip happens with "subtracted from".' } },
    { h: 'Naming the unknown well',
      p: ['When two quantities are compared, name the <em>smaller or simpler</em> one $x$ and build the other from it.',
          '"Maria has $7$ more than twice as many as Jon." Let $j$ = Jon\'s amount; then Maria has $2j + 7$. Choosing Jon keeps the algebra clean.',
          'If instead you set $m$ = Maria\'s, you would be forced into $\\dfrac{m - 7}{2}$ for Jon — correct but messier.'] },
    { h: 'The balance-scale picture',
      p: ['An equation is a balanced scale. Whatever you do to one side, do to the other, or it tips.',
          'That is the entire justification for "subtract 3 from both sides". You are keeping the scale level while you clear away what you do not want.'] },
    { h: 'What inequalities mean',
      p: ['$x > 5$ does not name one number — it names all of them past $5$.',
          '$\\ge$ and $\\le$ include the endpoint; $>$ and $<$ do not. On a number line, a closed dot includes, an open dot excludes.',
          'Phrases to recognise: "at least" means $\\ge$, "at most" means $\\le$, "more than" means $>$, "no more than" means $\\le$.'] },
    { h: 'Does your answer make sense?',
      p: ['Always return to the story. If you find $x = -3$ chairs, or $2.4$ people, something went wrong — or the answer needs rounding in the direction the story requires.',
          'If $4.2$ buses are needed, you need $5$ buses. Rounding follows the situation, not the usual rule.'] }
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
    'Writing "$5$ less than $x$" as $5 - x$.',
    'Skipping the "let $x$ = ..." step and losing track of what the answer means.',
    'Rounding by the usual rule instead of by what the situation allows.'
  ]
},
{
  id: 'equations', n: 11, strand: 'algebra', fig: 'equationSteps',
  title: 'Solving Equations',
  big: 'Undo what was done, in reverse order, doing the same thing to both sides every time.',
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
          'Undoing in the wrong order still sometimes works, but it usually creates fractions you did not need.'],
      box: { k: 'key', h: 'The order to undo', t: 'Clear $+$ and $-$ first. Then clear $\\times$ and $\\div$. The opposite of PEMDAS.' } },
    { h: 'Variables on both sides',
      p: ['Collect the variable terms on one side and the numbers on the other.',
          '$5x - 2 = 3x + 8$. Subtract $3x$ from both sides: $2x - 2 = 8$. Add $2$: $2x = 10$. Divide: $x = 5$.',
          'A small tip: move the variable to whichever side keeps the coefficient positive. It prevents sign errors.'] },
    { h: 'Equations with parentheses and fractions',
      p: ['Distribute first: $2(x + 3) = 14$ becomes $2x + 6 = 14$, so $x = 4$.',
          'Fractions: multiply every term by the common denominator to clear them. $\\dfrac{x}{3} + \\dfrac{1}{2} = 2$ times $6$ gives $2x + 3 = 12$, so $x = 4.5$.',
          'Multiply <strong>every</strong> term, including the ones without fractions.'],
      box: { k: 'slow', h: 'One line, one change', t: 'Write each step on its own line and change only one thing per line. It is slower on the page and much faster overall, because you can find your mistake instead of starting over.' } },
    { h: 'Always check',
      p: ['Substitute your answer back into the <em>original</em> equation. Not into a line you wrote — into the original, in case you made an error early.',
          '$x = 5$ in $5x - 2 = 3x + 8$: left side $= 23$, right side $= 23$. &check;'] },
    { h: 'No solution, or every solution',
      p: ['Sometimes the variable vanishes. $2x + 3 = 2x + 7$ becomes $3 = 7$ — false, so there is <strong>no solution</strong>.',
          '$2x + 6 = 2(x + 3)$ becomes $6 = 6$ — always true, so <strong>every</strong> number works.',
          'These are not mistakes. They are real answers.'] }
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
    'Doing something to one side only. Every operation must hit both sides.',
    'Multiplying only some terms when clearing fractions.',
    'Checking against a rewritten line instead of the original equation.'
  ]
},
{
  id: 'inequalities', n: 12, strand: 'algebra', fig: 'inequalityLine',
  title: 'Solving Inequalities',
  big: 'Solve them exactly like equations — with one extra rule that catches almost everyone.',
  vocab: [
    ['Inequality symbols', '$<$ less than, $>$ greater than, $\\leq$ at most, $\\geq$ at least.'],
    ['Solution set', 'All the values that make the inequality true — usually infinitely many.'],
    ['Open / closed dot', 'Open excludes the endpoint ($<$, $>$); closed includes it ($\\leq$, $\\geq$).'],
    ['Compound inequality', 'Two conditions at once, like $3 < x \\leq 9$.']
  ],
  sections: [
    { h: 'Same moves as equations',
      p: ['Add, subtract, multiply, divide — all the familiar steps still work, and you still do them to both sides.',
          '$3x + 4 < 19 \\Rightarrow 3x < 15 \\Rightarrow x < 5$. Identical to solving $3x + 4 = 19$, except the answer is a whole range.'] },
    { h: 'The one extra rule',
      p: ['When you multiply or divide both sides by a <strong>negative</strong> number, the inequality sign flips.',
          'Here is why, with real numbers. Start with a true statement: $4 < 10$. Multiply both sides by $-1$: you get $-4$ and $-10$. But $-4$ is <em>greater</em> than $-10$ — on the number line, $-4$ sits to the right. So the correct statement is $-4 > -10$. The sign had to turn around.',
          'Multiplying by a negative reflects the number line, and reflection reverses order.'],
      box: { k: 'warn', h: 'Flip only for negative $\\times$ or $\\div$', t: 'Adding or subtracting a negative does <strong>not</strong> flip the sign. Only multiplying or dividing <em>by</em> a negative does. $x - 5 > 2$ stays $>$; $-2x > 8$ becomes $x < -4$.' } },
    { h: 'Graphing on a number line',
      p: ['Draw the boundary point. Use an open circle for $<$ or $>$, a closed circle for $\\leq$ or $\\geq$.',
          'Shade the side that contains the solutions. Test a point if you are unsure: for $x < 5$, try $x = 0$ — it works, so shade the side containing $0$.'] },
    { h: 'Compound inequalities',
      p: ['$3 < x \\leq 9$ means $x$ is both greater than $3$ and at most $9$. Graph it as a segment with an open left end and a closed right end.',
          'Solve them by doing the same step to all three parts: $2 < x + 5 \\leq 11$ becomes $-3 < x \\leq 6$ by subtracting $5$ everywhere.'] },
    { h: 'Inequalities in stories',
      p: ['"At least", "minimum", "no fewer than" &rarr; $\\geq$.<br>"At most", "maximum", "no more than", "up to" &rarr; $\\leq$.',
          'Then apply common sense to the answer. If $x \\leq 7.3$ counts tickets, the real answer is $7$.'] }
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
    'Forgetting to flip when dividing by a negative — the single most common error in this unit.',
    'Flipping when you only added or subtracted a negative.',
    'Rounding the wrong way in a word problem. Check what the story allows.'
  ]
},
{
  id: 'scale', n: 13, strand: 'ratio', fig: 'scaleFigure',
  title: 'Proportional Reasoning with Scale Drawings',
  big: 'Scaling changes every length by the same factor $k$ — which multiplies area by $k^2$ and volume by $k^3$.',
  vocab: [
    ['Scale factor', 'The number every length is multiplied by.'],
    ['Scale drawing', 'A picture in proportion to the real thing, at a stated scale like $1 : 50$.'],
    ['Similar figures', 'Same shape, different size: equal angles, proportional sides.'],
    ['Corresponding sides', 'Sides in matching positions in two similar figures.']
  ],
  sections: [
    { h: 'What a scale says',
      p: ['A scale of $1 : 50$ means one unit on the drawing stands for $50$ of the same units in reality.',
          'A $6$ cm line on the drawing is $6 \\times 50 = 300$ cm — that is $3$ metres — in real life.',
          'Going the other way, divide: a real length of $12$ m is $1200$ cm, so on the drawing it measures $1200 \\div 50 = 24$ cm.'] },
    { h: 'Similar figures',
      p: ['Two figures are similar if their angles match and their sides are all in the same ratio.',
          'Find the scale factor from one pair of corresponding sides, then use it on all the others. If one triangle has a side of $6$ matching a side of $15$, then $k = \\dfrac{15}{6} = 2.5$ and every other side scales by $2.5$.'],
      box: { k: 'slow', h: 'Match them up first', t: 'Before calculating, list the sides in matching order — shortest with shortest, longest with longest. Most errors here come from pairing the wrong sides, not from the arithmetic.' } },
    { h: 'The big idea: area does not scale the same way',
      p: ['Double every length and the area does <strong>not</strong> double — it quadruples.',
          'A $3 \\times 4$ rectangle has area $12$. Scale by $2$ to get $6 \\times 8$, area $48$. That is $4$ times, because both the length and the width grew: $2 \\times 2 = 4$.',
          'Same idea in three dimensions: volume multiplies by $k^3$. Doubling a cube\'s edge makes it hold $8$ times as much.'],
      box: { k: 'key', h: 'The $k$, $k^2$, $k^3$ rule', t: 'Scale factor $k$ multiplies:<br>lengths by $k$ &nbsp;·&nbsp; areas by $k^2$ &nbsp;·&nbsp; volumes by $k^3$.<br>This is true for every shape, not just rectangles.' } },
    { h: 'Indirect measurement',
      p: ['You can measure a tree without climbing it. At the same moment, a $5$ ft person casts a $4$ ft shadow and the tree casts a $32$ ft shadow.',
          'The sun\'s rays make similar triangles, so $\\dfrac{5}{4} = \\dfrac{h}{32}$, giving $h = 40$ ft.'] },
    { h: 'Reading maps',
      p: ['A map scale of $1$ cm $:$ $2.5$ km works the same way. Measure in cm, multiply by $2.5$ for km.',
          'Keep the units straight. Convert before you multiply, not after, or the numbers will not mean anything.'] }
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
    'Multiplying area by $k$ instead of $k^2$ — the classic scale-drawing error.',
    'Pairing the wrong corresponding sides in similar figures.',
    'Mixing units, like multiplying centimetres by a scale meant for metres.'
  ]
},
{
  id: 'area2d', n: 14, strand: 'geometry', fig: 'areaDecompose',
  title: 'Length and Area in 2-D Figures',
  big: 'Every area formula is a rectangle in disguise. Know where each one comes from and you will never mix them up.',
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
          'Keep them apart by their units. Circumference is a length, so it uses $r$ to the first power. Area is a square measure, so it uses $r^2$.',
          'Why $A = \\pi r^2$: slice the circle into thin wedges and alternate them point-up and point-down. They interlock into something very close to a rectangle of height $r$ and width $\\dfrac{C}{2} = \\pi r$. So $A = \\pi r \\cdot r$.'] },
    { h: 'Composite figures: add or subtract',
      p: ['Break the shape into rectangles, triangles, and parts of circles. Find each area, then combine.',
          'Often subtraction is faster. A circle cut out of a square: find the square, find the circle, subtract. A shaded border: find the outer shape and take away the inner one.'],
      box: { k: 'slow', h: 'Draw the cut lines', t: 'Physically draw lines on the figure to split it up, and label every piece with its own dimensions before computing anything. Doing all the drawing first, then all the arithmetic, is much more reliable than alternating.' } },
    { h: 'Perimeter of composite shapes',
      p: ['Perimeter follows the <em>outside edge only</em>. When you cut a shape into pieces, the cut lines are not part of the perimeter.',
          'For a shape with a semicircular top, the curved part contributes $\\dfrac{1}{2} \\cdot 2\\pi r = \\pi r$, and the straight edge it replaced is no longer on the boundary.'] },
    { h: 'Same perimeter, different area',
      p: ['A $1 \\times 11$ rectangle and a $6 \\times 6$ square both have perimeter $24$, but their areas are $11$ and $36$.',
          'For a fixed perimeter, the closer to a square, the larger the area. Perimeter does not determine area.'] }
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
    'Using the slanted side as the height of a parallelogram or triangle.',
    'Using the diameter where the formula asks for the radius — the answer comes out $4$ times too big for area.',
    'Including an internal cut line in a perimeter.'
  ]
},
{
  id: 'sections3d', n: 15, strand: 'geometry', fig: 'cubeSlice',
  title: 'Plane Sections of 3-D Figures',
  big: 'Slice a solid with a flat plane and a flat shape appears. The angle of the cut decides which shape you get.',
  vocab: [
    ['Cross section', 'The 2-D face revealed when a plane cuts through a solid.'],
    ['Plane', 'A perfectly flat surface extending forever.'],
    ['Net', 'A 3-D shape unfolded flat.'],
    ['Face, edge, vertex', 'A flat surface; a line where two faces meet; a corner point.']
  ],
  sections: [
    { h: 'What a cross section is',
      p: ['Imagine slicing a block of cheese with a single straight cut. The new flat face you expose is the cross section.',
          'The same solid gives different cross sections depending on how you cut it, so the question always has two parts: which solid, and which direction.'] },
    { h: 'Slicing a rectangular prism',
      p: ['<strong>Parallel to a face:</strong> you get a rectangle identical to that face, no matter how deep you cut.',
          '<strong>Perpendicular to a face:</strong> also a rectangle.',
          '<strong>Diagonal cuts:</strong> you can get a non-rectangular parallelogram, a triangle (cutting off one corner), a pentagon, or even a hexagon if you slice cleverly through six faces.',
          'The rule: the cross section has one side for each face the plane passes through. A cube has six faces, so a hexagon is the most sides possible.'],
      box: { k: 'key', h: 'Count the faces you cut', t: 'The number of sides of the cross section equals the number of faces the plane passes through. Cut three faces near a corner, get a triangle. Cut all six, get a hexagon.' } },
    { h: 'Slicing a pyramid',
      p: ['A square pyramid cut <strong>parallel to the base</strong> gives a square — smaller the higher you cut.',
          'Cut <strong>perpendicular through the apex</strong> and you get a triangle.',
          'Cut at a slant and you can get a trapezoid.'] },
    { h: 'Slicing a cylinder and a cone',
      p: ['A cylinder cut parallel to its base gives a <strong>circle</strong>, always the same size. Cut perpendicular (straight down through the middle) and you get a <strong>rectangle</strong>. A slanted cut gives an ellipse — an oval.',
          'A cone cut parallel to the base gives a circle; cut vertically through the tip gives a triangle.'] },
    { h: 'Nets: the other way to flatten',
      p: ['A net is what you get if you unfold a solid along its edges and lay it flat.',
          'A cube has $11$ different nets. A useful check when reading one: on a cube, opposite faces are never adjacent in the net and never share an edge. In a row of four squares, the 1st and 3rd are opposite, and so are the 2nd and 4th.',
          'Nets are also the easiest route to surface area — the surface area is just the area of the net.'] }
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
    'Assuming every slice of a cube is a square. Slanted cuts give many other shapes.',
    'Using the radius instead of the diameter for the width of a vertical cylinder section.',
    'Reading a net without checking which faces end up opposite each other.'
  ]
},
{
  id: 'volume', n: 16, strand: 'geometry', fig: 'prismNet',
  title: 'Volume & Surface Area of 3-D Figures',
  big: 'Volume fills the inside — base area times height. Surface area wraps the outside — add up every face.',
  vocab: [
    ['Volume', 'Space inside, in cubic units.'],
    ['Surface area', 'Total area of all the outside faces, in square units.'],
    ['Prism', 'A solid with two identical parallel bases joined by rectangles.'],
    ['Lateral area', 'The side faces only, not counting the two bases.']
  ],
  sections: [
    { h: 'One formula for every prism and cylinder',
      p: ['$V = Bh$, where $B$ is the area of the <strong>base</strong> and $h$ is the height.',
          'Think of it as stacking: one layer of the base is $B$ cubic units thick, and you stack $h$ of them.',
          'Rectangular prism: $B = lw$, so $V = lwh$. Triangular prism: $B = \\dfrac{1}{2}bh_{\\triangle}$. Cylinder: $B = \\pi r^2$, so $V = \\pi r^2 h$. Same idea each time — only $B$ changes.'],
      box: { k: 'key', h: 'Find the base first', t: 'The base is the shape that repeats all the way through the solid. Find its area, then multiply by how far it repeats. That single habit handles every prism.' } },
    { h: 'Surface area is just adding faces',
      p: ['Unfold the solid into its net, find each piece\'s area, and add.',
          'Rectangular prism: three pairs of matching faces, so $SA = 2lw + 2lh + 2wh$.',
          'Cylinder: two circles plus one rectangle. The rectangle is the label peeled off — its width is the circumference. So $SA = 2\\pi r^2 + 2\\pi r h$.'] },
    { h: 'Keep the units straight',
      p: ['Volume is in cubic units: cm$^3$, m$^3$, in$^3$. Surface area is in square units: cm$^2$, m$^2$.',
          'If your answer has the wrong kind of unit, you used the wrong formula. This is a free check on every problem.'],
      box: { k: 'slow', h: 'Ask "filling or wrapping?"', t: 'Filling a fish tank with water, or a box with sand &rarr; volume. Wrapping a present, or painting a wall &rarr; surface area. Saying which one out loud before you start prevents most errors in this unit.' } },
    { h: 'Pyramids and cones hold a third',
      p: ['A pyramid or cone with the same base and height as a prism or cylinder holds exactly one third as much: $V = \\dfrac{1}{3}Bh$.',
          'You can see this by pouring: three cone-fulls of water fill a cylinder of matching base and height exactly.'] },
    { h: 'Working backwards',
      p: ['Given the volume and two dimensions, divide to find the third. If $V = 240$ cm$^3$ with base $8 \\times 5$, then $240 = 40h$, so $h = 6$ cm.',
          'Given surface area, substitute and solve — often an equation from Unit 11 appears inside a geometry problem.'] }
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
    'Mixing up volume and surface area. Check the units on your answer.',
    'Using the diameter in $\\pi r^2$. Halve it first.',
    'Forgetting a face in surface area — a box has six, not four.'
  ]
},
{
  id: 'construction', n: 17, strand: 'geometry', fig: 'angleFan',
  title: 'Geometric Construction',
  big: 'With only a compass and a straightedge you can copy, bisect and build exactly — and the angle facts tell you when a figure is even possible.',
  vocab: [
    ['Compass / straightedge', 'Tools for drawing exact circles and lines — no measuring allowed.'],
    ['Bisect', 'Cut exactly in half.'],
    ['Complementary / supplementary', 'Two angles summing to $90°$ / to $180°$.'],
    ['Vertical angles', 'The opposite pair formed by two crossing lines — always equal.'],
    ['Triangle inequality', 'Any two sides must sum to more than the third.']
  ],
  sections: [
    { h: 'The angle facts you build on',
      p: ['Angles on a straight line sum to $180°$. Angles around a point sum to $360°$.',
          'Vertical angles are equal. When two lines cross, the opposite angles match.',
          'With parallel lines and a transversal: corresponding angles are equal, alternate interior angles are equal, and co-interior angles sum to $180°$.',
          'A triangle\'s angles sum to $180°$; a quadrilateral\'s to $360°$.'] },
    { h: 'Angle chasing',
      p: ['Most construction and geometry problems are solved by filling in one angle at a time, each justified by a fact above.',
          'Work from what you know outward. Mark every angle you find directly on the figure — the next step usually depends on it.'],
      box: { k: 'slow', h: 'Write the reason beside each angle', t: 'Do not just write $70°$. Write "$70°$ — vertical angles". The reason is what tells you which angle you can find next, and it is what earns credit on a test.' } },
    { h: 'How many triangles fit the clues?',
      p: ['Given three <strong>sides</strong>: exactly one triangle, if the triangle inequality holds. Sides $3, 4, 9$ make nothing, because $3 + 4 < 9$ — the short sides cannot reach.',
          'Given two sides and the angle <strong>between</strong> them: exactly one triangle.',
          'Given three <strong>angles</strong>: infinitely many triangles, all similar but different sizes.',
          'Given two sides and an angle <em>not</em> between them: sometimes two different triangles fit.'],
      box: { k: 'key', h: 'Triangle inequality', t: 'Three lengths form a triangle exactly when the two shortest add to more than the longest. Check only that one comparison — it is enough.' } },
    { h: 'The four core constructions',
      p: ['<strong>Copy a segment:</strong> set the compass to its length, then strike that length off on a new ray.',
          '<strong>Bisect a segment:</strong> from each endpoint, draw arcs of the same radius (more than half the length). They cross above and below; the line joining those crossings cuts the segment in half — and at a right angle.',
          '<strong>Bisect an angle:</strong> from the vertex, draw an arc crossing both sides. From those two crossing points, draw equal arcs that meet. Join the vertex to that meeting point.',
          '<strong>Perpendicular through a point:</strong> a bisected segment gives you a right angle for free.'] },
    { h: 'Why the constructions work',
      p: ['Every one of them relies on the same idea: a compass draws all the points at an equal distance from its centre.',
          'When two equal arcs cross, that crossing point is the same distance from both starting points — which is exactly what "halfway" means. The construction is a proof, not a trick.'] }
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
    'Changing the compass width in the middle of a construction — the equal radii are the whole point.',
    'Checking all three triangle-inequality comparisons when only the longest side matters.',
    'Assuming two angles are equal because they look equal. Name the rule.'
  ]
},

/* ---- Math 7 (regular track) units. Course order lives in window.COURSES. ---- */
{
  id: 'exponents', strand: 'number', fig: 'powerTower',
  title: 'Exponents & Scientific Notation',
  big: 'An exponent counts how many times you multiply, not what you multiply by. That one idea explains every rule.',
  vocab: [
    ['Base', 'The number being multiplied. In $5^3$ the base is $5$.'],
    ['Exponent', 'How many times the base is used as a factor. In $5^3$ the exponent is $3$.'],
    ['Power', 'The whole expression, $5^3$, and also its value, $125$.'],
    ['Scientific notation', 'A number written as $a \\times 10^n$, where $1 \\leq a < 10$.']
  ],
  sections: [
    { h: 'What an exponent actually means',
      p: ['$5^3$ means $5 \\times 5 \\times 5 = 125$. It does <strong>not</strong> mean $5 \\times 3$.',
          'Read it as "five to the third power", or "five cubed". The exponent is a count of factors, nothing more.',
          'Once you hold on to that, you never have to memorise the rules — you can rebuild them.'],
      box: { k: 'warn', h: 'The most common slip', t: '$3^4 \\neq 12$. It is $3 \\times 3 \\times 3 \\times 3 = 81$. Multiplying the base by the exponent is the single most frequent error in this unit.' } },
    { h: 'Multiplying and dividing powers',
      p: ['$2^3 \\times 2^4 = (2 \\cdot 2 \\cdot 2)(2 \\cdot 2 \\cdot 2 \\cdot 2) = 2^7$. Three factors and four factors make seven factors. So you <strong>add</strong> the exponents.',
          '$\\dfrac{2^7}{2^4}$ cancels four of the seven twos, leaving $2^3$. So you <strong>subtract</strong>.',
          'Both rules only work when the bases match. $2^3 \\times 3^4$ cannot be combined at all.'],
      box: { k: 'key', h: 'The three rules', t: '$a^m \\cdot a^n = a^{m+n}$<br>$\\dfrac{a^m}{a^n} = a^{m-n}$<br>$(a^m)^n = a^{mn}$ — a power of a power multiplies.' } },
    { h: 'Zero and negative exponents',
      p: ['Follow the pattern down: $2^3 = 8$, $2^2 = 4$, $2^1 = 2$. Each step divides by $2$. The next step gives $2^0 = 1$.',
          'Keep going: $2^{-1} = \\dfrac{1}{2}$ and $2^{-2} = \\dfrac{1}{4}$.',
          'So a negative exponent means "one over", not "negative number". $2^{-3} = \\dfrac{1}{8}$, which is positive.'],
      box: { k: 'slow', h: 'Say it out loud', t: 'A negative exponent flips the number to the other side of the fraction bar. It never makes the answer negative.' } },
    { h: 'Scientific notation',
      p: ['Very large and very small numbers are painful to write out. Scientific notation packs them into $a \\times 10^n$ with exactly one non-zero digit in front of the decimal point.',
          '$4{,}300{,}000 = 4.3 \\times 10^6$. The point moved $6$ places left, so the exponent is $6$.',
          '$0.00047 = 4.7 \\times 10^{-4}$. The point moved $4$ places right, so the exponent is $-4$.',
          'Big number, positive exponent. Small number, negative exponent. Check that first, every time.'] },
    { h: 'Calculating in scientific notation',
      p: ['Multiply the front numbers, and add the exponents: $(3 \\times 10^5)(2 \\times 10^{-2}) = 6 \\times 10^3$.',
          'If the front number lands outside $1$ to $10$, fix it. $(5 \\times 10^4)(4 \\times 10^3) = 20 \\times 10^7$, which becomes $2 \\times 10^8$.'] }
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
    'Multiplying the base by the exponent: $3^4$ is $81$, not $12$.',
    'Thinking $2^{-3}$ is negative. It is $\\dfrac{1}{8}$.',
    'Adding exponents with different bases. $2^3 \\cdot 3^2$ cannot be combined.',
    'Leaving a front number outside $1$–$10$ in scientific notation.'
  ]
},
{
  id: 'problemsolving', strand: 'skills', fig: 'workBackwards',
  title: 'Problem Solving',
  big: 'A hard problem is rarely beaten by cleverness. It is beaten by a method: understand it, pick a strategy, carry it out, then check.',
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
      box: { k: 'slow', h: 'Step 4 is not optional', t: 'Most lost marks are not from bad thinking. They are from answering a slightly different question, or from an answer that is obviously too big. Re-reading the question at the end catches both.' } },
    { h: 'Draw a picture',
      p: ['A diagram turns words into something you can look at. Rectangles for areas, a number line for distances, boxes and arrows for stages.',
          'It does not need to be beautiful or to scale. It needs to be labelled.'] },
    { h: 'Work backwards',
      p: ['When a problem tells you the ending and asks for the beginning, run the steps in reverse and undo each one.',
          'Someone spends half their money, then $\\$6$, and has $\\$10$ left. Undo: before the $\\$6$ they had $\\$16$; that was half, so they started with $\\$32$.',
          'Undo addition with subtraction, and doubling with halving. Always check by running it forwards.'],
      box: { k: 'key', h: 'The signal', t: 'If the question ends "...how much did they start with?" or "...what was the original number?", work backwards.' } },
    { h: 'Make a table, find a pattern',
      p: ['When something repeats or grows, tabulate the first few cases and look at the differences.',
          'Constant difference means a rule like $an + b$. A constant ratio means repeated multiplying.',
          'Always test your rule on a case you did not use to build it.'] },
    { h: 'Try a simpler problem',
      p: ['Stuck on $100$ people shaking hands? Do $3$ people, then $4$, then $5$. Write the results in a table and the pattern appears.',
          'This is not giving up on the hard problem. It is the standard way mathematicians attack one.'] },
    { h: 'Guess, check, revise',
      p: ['A structured guess beats staring at the page. Guess, test, and note whether you were too high or too low — then use that to aim the next guess.',
          'Three or four rounds usually lands it, and often the pattern in your guesses reveals the equation you could have written.'] }
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
    'Starting to calculate before deciding what the question is asking for.',
    'Working backwards but undoing the steps in the original order instead of reversed.',
    'Finding a pattern from two terms only — always test on a third.'
  ]
},
{
  id: 'squareroots', strand: 'number', fig: 'squareGrid',
  title: 'Squares & Square Roots',
  big: 'Squaring and taking a square root undo each other. A root asks: what number, times itself, gives this?',
  vocab: [
    ['Perfect square', 'A number that is some whole number squared: $1, 4, 9, 16, 25, \\ldots$'],
    ['Square root', '$\\sqrt{k}$ is the number that multiplies by itself to give $k$.'],
    ['Radical', 'The $\\sqrt{\\phantom{x}}$ symbol, and the expression under it.'],
    ['Radicand', 'The number under the radical sign.']
  ],
  sections: [
    { h: 'Squares and roots are opposites',
      p: ['$7^2 = 49$, so $\\sqrt{49} = 7$. Each undoes the other, the way multiplying and dividing do.',
          'Know these by heart — they turn up constantly: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225$.',
          'Recognising $144$ as $12^2$ on sight saves time in every later unit, especially Pythagoras.'],
      box: { k: 'key', h: 'Why "square"?', t: 'A square with side $7$ has area $49$. Going from side to area is squaring; going from area back to side is taking the root. The words are literal.' } },
    { h: 'Estimating roots that are not exact',
      p: ['$\\sqrt{40}$ is not a whole number. Trap it between the perfect squares either side: $36 < 40 < 49$, so $6 < \\sqrt{40} < 7$.',
          '$40$ is much closer to $36$ than to $49$, so the answer is a little above $6$ — about $6.3$.',
          'This bracket-and-judge method is usually all you need, and it catches calculator slips.'] },
    { h: 'Simplifying a radical',
      p: ['Pull out any perfect-square factor. $\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\times \\sqrt{2} = 6\\sqrt{2}$.',
          'Look for the <em>largest</em> perfect square that divides the number. Using $4$ instead of $36$ still works, it just takes another round.',
          '$\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$ — roots multiply straight across, which is what makes this legal.'] },
    { h: 'Solving $x^2 = k$',
      p: ['$x^2 = 25$ has <strong>two</strong> answers: $x = 5$ and $x = -5$, because both square to $25$.',
          'But the symbol $\\sqrt{25}$ means only the positive one, $5$. That is a convention, and it trips people up.',
          'So: solving an equation gives $\\pm$; evaluating a radical gives just the positive root.'],
      box: { k: 'warn', h: 'Two different questions', t: '"Solve $x^2 = 16$" &rarr; $x = \\pm 4$.<br>"Find $\\sqrt{16}$" &rarr; $4$.<br>Read carefully which one is being asked.' } },
    { h: 'Roots of fractions and decimals',
      p: ['$\\sqrt{\\dfrac{9}{25}} = \\dfrac{\\sqrt{9}}{\\sqrt{25}} = \\dfrac{3}{5}$ — take the root of the top and the bottom separately.',
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
    'Halving instead of rooting: $\\sqrt{36}$ is $6$, not $18$.',
    'Giving only the positive answer when solving $x^2 = k$.',
    'Writing $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$. It is false — try $a = 9$, $b = 16$.'
  ]
},
{
  id: 'realnumbers', strand: 'number', fig: 'numberSets',
  title: 'Real Numbers',
  big: 'Every number you meet this year is either rational — a fraction — or irrational. Knowing which tells you how it behaves.',
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
      p: ['Write it as a decimal and watch what happens.',
          '<strong>Stops</strong> — like $0.75$ — rational.',
          '<strong>Repeats a block forever</strong> — like $0.3333\\ldots$ or $0.142857142857\\ldots$ — rational.',
          '<strong>Goes on forever with no repeating block</strong> — like $\\pi = 3.14159\\ldots$ or $\\sqrt{2} = 1.41421\\ldots$ — irrational.'],
      box: { k: 'key', h: 'The root test', t: 'The square root of a perfect square is rational: $\\sqrt{49} = 7$. The square root of any other whole number is irrational: $\\sqrt{50}$ never resolves.' } },
    { h: 'Turning repeating decimals into fractions',
      p: ['$0.\\overline{3}$ means $0.333\\ldots$ forever. Let $x = 0.333\\ldots$, then $10x = 3.333\\ldots$',
          'Subtract: $10x - x = 3$, so $9x = 3$ and $x = \\dfrac{1}{3}$.',
          'The trick is choosing the multiplier so the repeating tails line up and cancel.'] },
    { h: 'Comparing and ordering real numbers',
      p: ['Convert everything to decimals, then compare. $\\dfrac{7}{8} = 0.875$, $\\sqrt{0.81} = 0.9$, and $0.87$ — so the order is $0.87 < \\dfrac{7}{8} < \\sqrt{0.81}$.',
          'For irrationals, use a good estimate: $\\pi \\approx 3.14$ and $\\sqrt{10} \\approx 3.16$, so $\\pi < \\sqrt{10}$.',
          'Careful with negatives: $-\\dfrac{3}{4} > -0.8$, because $-0.75$ sits to the right of $-0.8$.'],
      box: { k: 'slow', h: 'One form at a time', t: 'Never compare a fraction against a decimal against a root in your head. Put them all in the same costume — decimals are usually easiest — and then compare.' } },
    { h: 'Why $\\pi$ is not $\\dfrac{22}{7}$',
      p: ['$\\dfrac{22}{7} = 3.142857\\ldots$ and repeats, so it is rational. $\\pi = 3.14159\\ldots$ and never repeats.',
          '$\\dfrac{22}{7}$ is a convenient approximation, close to $\\pi$ but not equal to it. The same goes for $3.14$.'] }
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
    'Calling every square root irrational. $\\sqrt{25}$ is $5$ — perfectly rational.',
    'Treating $\\dfrac{22}{7}$ or $3.14$ as equal to $\\pi$. They are approximations.',
    'Mis-ordering negatives: $-0.8$ is <em>less</em> than $-0.75$.'
  ]
},
{
  id: 'gcflcm', strand: 'number', fig: 'factorTree',
  title: 'GCF and LCM',
  big: 'Prime factorisation answers both questions at once: shared factors give the GCF, and everything needed gives the LCM.',
  vocab: [
    ['Factor', 'A number that divides evenly into another.'],
    ['Multiple', 'The result of multiplying by a whole number: $12$ is a multiple of $4$.'],
    ['GCF', 'Greatest common factor — the largest number dividing both.'],
    ['LCM', 'Least common multiple — the smallest number both divide into.'],
    ['Prime factorisation', 'A number written as a product of primes: $60 = 2^2 \\cdot 3 \\cdot 5$.']
  ],
  sections: [
    { h: 'Factors go down, multiples go up',
      p: ['Factors of $12$: $1, 2, 3, 4, 6, 12$ — a short, finite list, all no bigger than $12$.',
          'Multiples of $12$: $12, 24, 36, 48, \\ldots$ — an endless list, all no smaller than $12$.',
          'Mixing these two up is the root of most GCF/LCM errors, so fix the direction first: <strong>GCF is small, LCM is large.</strong>'] },
    { h: 'Prime factorisation does both jobs',
      p: ['Break each number into primes with a factor tree. $24 = 2^3 \\cdot 3$ and $36 = 2^2 \\cdot 3^2$.',
          '<strong>GCF:</strong> take each shared prime to the <em>lowest</em> power. Here $2^2 \\cdot 3 = 12$.',
          '<strong>LCM:</strong> take every prime that appears, to the <em>highest</em> power. Here $2^3 \\cdot 3^2 = 72$.'],
      box: { k: 'key', h: 'Lowest for GCF, highest for LCM', t: 'Both use the same factorisations. The GCF keeps only what the numbers share; the LCM keeps everything either one needs.' } },
    { h: 'A useful check',
      p: ['$\\text{GCF} \\times \\text{LCM} = a \\times b$, always.',
          'For $24$ and $36$: $12 \\times 72 = 864$, and $24 \\times 36 = 864$ &check;',
          'This catches mistakes instantly, and it lets you find one if you already know the other.'] },
    { h: 'Which one does the word problem want?',
      p: ['<strong>GCF</strong> when you are splitting things into equal groups, or cutting into equal pieces as large as possible. The answer is smaller than the numbers.',
          '<strong>LCM</strong> when two cycles start together and you want the next time they line up, or when you are buying packs of different sizes to match. The answer is larger.'],
      box: { k: 'slow', h: 'Ask: bigger or smaller?', t: 'Before computing anything, decide whether the answer should be bigger or smaller than the numbers in the problem. That single question picks GCF or LCM correctly almost every time.' } },
    { h: 'Relatively prime numbers',
      p: ['If two numbers share no factor but $1$, their GCF is $1$ and they are called relatively prime — like $8$ and $15$.',
          'In that case the LCM is simply their product: $8 \\times 15 = 120$.'] }
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
    'Swapping them: the GCF can never be larger than the smaller number, and the LCM can never be smaller than the larger one.',
    'Using the highest powers for GCF, or lowest for LCM.',
    'Forgetting a prime that appears in only one number when building the LCM.'
  ]
},
{
  id: 'measurement', strand: 'geometry', fig: 'areaDecompose',
  title: 'Measurement',
  big: 'Every conversion is a multiplication by one. Write the unit you want on top, the unit you have on the bottom, and the wrong units cancel themselves.',
  vocab: [
    ['Unit rate for conversion', 'A fraction equal to $1$, like $\\dfrac{12 \\text{ in}}{1 \\text{ ft}}$.'],
    ['Metric prefixes', 'kilo $= 1000$, centi $= \\dfrac{1}{100}$, milli $= \\dfrac{1}{1000}$.'],
    ['Precision', 'How finely a measurement is recorded — to the nearest cm, mm, and so on.'],
    ['Perimeter / area', 'Distance around, in units; space inside, in square units.']
  ],
  sections: [
    { h: 'Converting by cancelling units',
      p: ['A conversion factor is a fraction worth exactly $1$, because top and bottom are the same amount: $\\dfrac{12 \\text{ in}}{1 \\text{ ft}} = 1$.',
          'Multiplying by $1$ never changes the amount — only how it is written.',
          'Convert $7$ feet to inches: $7 \\text{ ft} \\times \\dfrac{12 \\text{ in}}{1 \\text{ ft}} = 84 \\text{ in}$. The "ft" cancels, leaving inches.'],
      box: { k: 'key', h: 'Which way up?', t: 'Put the unit you are getting <strong>rid of</strong> on the bottom, so it cancels. If your answer comes out with a strange unit like ft²/in, you had the fraction upside down.' } },
    { h: 'The metric system is just powers of ten',
      p: ['km, m, cm, mm — each step is a factor of $10$, $100$ or $1000$, so converting is moving the decimal point.',
          '$1$ m $= 100$ cm, $1$ km $= 1000$ m, $1$ cm $= 10$ mm.',
          'Going to a <em>smaller</em> unit gives a <em>bigger</em> number: $2.5$ m is $250$ cm. If your number shrank when the unit shrank, you went the wrong way.'] },
    { h: 'Square and cubic units do not convert the same way',
      p: ['$1$ m $= 100$ cm, but $1$ m$^2$ is <strong>not</strong> $100$ cm$^2$.',
          'A square metre is $100$ cm by $100$ cm, so $1$ m$^2 = 10{,}000$ cm$^2$. The factor is squared.',
          'Likewise $1$ m$^3 = 1{,}000{,}000$ cm$^3$ — the factor is cubed. This is the same $k$, $k^2$, $k^3$ idea as scaling.'],
      box: { k: 'warn', h: 'The classic trap', t: 'Converting an area by the plain length factor. $5$ m$^2$ is $50{,}000$ cm$^2$, not $500$ cm$^2$.' } },
    { h: 'Perimeter and area, quickly',
      p: ['Rectangle: $P = 2(l + w)$, $A = lw$.',
          'Triangle: $A = \\dfrac{1}{2}bh$, using the perpendicular height.',
          'Parallelogram: $A = bh$. Trapezoid: $A = \\dfrac{1}{2}(b_1 + b_2)h$.',
          'For an odd shape, split it into pieces you recognise, find each area, and add — or find a big shape and subtract what is missing.'] },
    { h: 'Choosing a sensible unit',
      p: ['A room is measured in metres, a pencil in centimetres, a city in kilometres. Choosing badly makes numbers you cannot check.',
          'Before you write an answer, ask whether it is plausible. A desk with an area of $2$ km$^2$ should stop you.'] }
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
    'Converting area or volume with the plain length factor instead of squaring or cubing it.',
    'Flipping the conversion fraction so units multiply instead of cancelling.',
    'Getting a smaller number when converting to a smaller unit.'
  ]
},
{
  id: 'circles', strand: 'geometry', fig: 'circleParts',
  title: 'Circles',
  big: 'Every circle has the same ratio of circumference to diameter. That ratio is $\\pi$, and it drives both formulas.',
  vocab: [
    ['Radius', 'Centre to edge. Half the diameter.'],
    ['Diameter', 'All the way across through the centre. $d = 2r$.'],
    ['Circumference', 'The distance around: $C = 2\\pi r = \\pi d$.'],
    ['Arc / sector', 'Part of the edge; a "pizza slice" bounded by two radii.'],
    ['$\\pi$', 'Circumference divided by diameter — the same for every circle, about $3.14159$.']
  ],
  sections: [
    { h: 'Where $\\pi$ comes from',
      p: ['Wrap a string round any circular object and measure it, then measure straight across. Divide the first by the second.',
          'You always get about $3.14$, whether the circle is a coin or a stadium. That constant ratio is $\\pi$.',
          'So $C \\div d = \\pi$, which rearranges to $C = \\pi d$, and since $d = 2r$, also $C = 2\\pi r$.'] },
    { h: 'Area: why $\\pi r^2$',
      p: ['Cut the circle into thin wedges and lay them alternately point-up and point-down. They interlock into a shape very close to a rectangle.',
          'That rectangle is $r$ tall, and its width is half the circumference, $\\pi r$.',
          'So the area is $\\pi r \\times r = \\pi r^2$. The thinner the wedges, the more exact it becomes.'],
      box: { k: 'key', h: 'Telling them apart', t: 'Circumference is a length, so it uses $r$ once. Area is a square measure, so it uses $r^2$. If your answer is in cm but you squared, something is wrong.' } },
    { h: 'Radius or diameter?',
      p: ['Both formulas want the <strong>radius</strong>. Problems love to give you the diameter instead.',
          'Using $d$ where $r$ belongs makes a circumference twice too big and an area <em>four</em> times too big.',
          'Write down $r = \\ldots$ as your very first line, every time.'],
      box: { k: 'warn', h: 'Halve it first', t: 'A circle of diameter $10$ has area $\\pi(5)^2 = 25\\pi$, not $\\pi(10)^2 = 100\\pi$.' } },
    { h: 'Parts of a circle',
      p: ['A <strong>semicircle</strong> is half: arc $\\pi r$, area $\\dfrac{1}{2}\\pi r^2$. A <strong>quarter circle</strong> is a quarter of each.',
          'In general, a sector of $n$ degrees is $\\dfrac{n}{360}$ of the whole circle — use that fraction for both arc length and sector area.',
          'For a $90°$ sector, $\\dfrac{90}{360} = \\dfrac{1}{4}$.'] },
    { h: 'Exact or decimal?',
      p: ['Leaving the answer as $25\\pi$ is exact. Writing $78.5$ uses $\\pi \\approx 3.14$ and is approximate.',
          'Read the question: "in terms of $\\pi$" means keep the symbol. "Use $\\pi = 3.14$" means give a decimal.',
          'When several steps are involved, keep $\\pi$ until the very end — rounding early compounds the error.'] }
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
    'Using the diameter in $\\pi r^2$ — the answer comes out four times too big.',
    'Mixing up $C$ and $A$. Check whether the units should be plain or squared.',
    'Including the straight edge that a semicircle replaced when finding a perimeter.'
  ]
},
{
  id: 'graphs', strand: 'data', fig: 'barLine',
  title: 'Reading Graphs & Estimation',
  big: 'A graph is an argument. Read the scale before the shape, or you will believe whatever it wants you to believe.',
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
          'Using the wrong type is itself an error: a line graph joining unrelated categories implies change that is not there.'] },
    { h: 'Read the axis first',
      p: ['Before looking at the bars, read: what is measured, in what units, what is one step worth, and <strong>where does the axis start?</strong>',
          'An axis starting at $90$ instead of $0$ makes a bar of $95$ look five times taller than one of $91$, when the real difference is about $4\\%$.',
          'This is the commonest way a truthful graph tells a misleading story.'],
      box: { k: 'warn', h: 'The truncated axis', t: 'If a vertical axis does not start at zero, bar heights cannot be compared by eye. Read the numbers instead.' } },
    { h: 'Other ways graphs mislead',
      p: ['<strong>Uneven spacing</strong> on a time axis makes growth look smooth when it is not.',
          '<strong>Pictures scaled in two directions</strong> — doubling the height of an icon also doubles its width, so it looks four times bigger.',
          '<strong>Missing labels</strong>, or percentages in a circle graph that do not add to $100$.'] },
    { h: 'Estimating to check',
      p: ['Round to friendly numbers and compute in your head first. $487 \\times 21$ is about $500 \\times 20 = 10{,}000$.',
          'If your calculator says $1{,}023$, something went wrong. That is what the estimate is for.',
          'Use <em>compatible</em> numbers, not just rounded ones: for $\\dfrac{7960}{38}$, think $\\dfrac{8000}{40} = 200$.'],
      box: { k: 'slow', h: 'Estimate before, not after', t: 'Do the rough answer <em>first</em>, on paper. Doing it afterwards makes it very easy to talk yourself into whatever the calculator said.' } },
    { h: 'Reading between the marks',
      p: ['If gridlines are $5$ apart and a point sits halfway between $20$ and $25$, read it as about $22.5$ — and say "about".',
          'Never report more precision than the graph can show.'] }
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
    'Comparing bar heights without checking where the axis starts.',
    'Reading a value more precisely than the gridlines allow.',
    'Estimating after calculating, which defeats the purpose.'
  ]
},
{
  id: 'pythagorean', strand: 'geometry', fig: 'pythagoras',
  title: 'Pythagorean Theorem',
  big: 'In any right triangle, the two legs squared add to the hypotenuse squared. It turns a right angle into arithmetic.',
  vocab: [
    ['Leg', 'One of the two sides forming the right angle.'],
    ['Hypotenuse', 'The side opposite the right angle — always the longest.'],
    ['Pythagorean triple', 'Three whole numbers that fit: $3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, $7$-$24$-$25$.'],
    ['Converse', 'If $a^2 + b^2 = c^2$, then the triangle must be right-angled.']
  ],
  sections: [
    { h: 'The statement, and what the letters mean',
      p: ['$a^2 + b^2 = c^2$, where $a$ and $b$ are the legs and $c$ is the hypotenuse.',
          '$c$ is <strong>always</strong> the side opposite the right angle, and always the longest. Getting this wrong is the main source of errors.',
          'The theorem only applies to right triangles. No right angle, no formula.'] },
    { h: 'Finding the hypotenuse',
      p: ['Legs $6$ and $8$: $6^2 + 8^2 = 36 + 64 = 100$, so $c = \\sqrt{100} = 10$.',
          'Square both legs, add, then take the square root. Three steps, in that order.'],
      box: { k: 'key', h: 'Sanity check', t: 'The hypotenuse must be longer than either leg, but shorter than their sum. For legs $6$ and $8$, expect between $8$ and $14$. A "hypotenuse" of $5$ is impossible.' } },
    { h: 'Finding a leg — subtract, do not add',
      p: ['If you know the hypotenuse, rearrange: $a^2 = c^2 - b^2$.',
          'Hypotenuse $13$, one leg $5$: $a^2 = 169 - 25 = 144$, so $a = 12$.',
          'Adding here instead of subtracting is the most common slip in this unit. Identify the hypotenuse first, and the direction follows.'] },
    { h: 'Triples worth memorising',
      p: ['$3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, $7$-$24$-$25$.',
          'Multiples count too: $6$-$8$-$10$ and $9$-$12$-$15$ are both just $3$-$4$-$5$ scaled.',
          'Spotting one saves all the arithmetic — and catching that $10$-$24$-$26$ is $2 \\times (5\\text{-}12\\text{-}13)$ is faster than squaring anything.'] },
    { h: 'The converse: is it a right triangle?',
      p: ['Test the three sides. If $a^2 + b^2 = c^2$ with $c$ the longest, the triangle is right-angled.',
          '$9, 12, 15$: $81 + 144 = 225 = 15^2$ &check; — right-angled.',
          '$4, 5, 8$: $16 + 25 = 41$ but $64$ — not right-angled. Since $41 < 64$, the angle opposite $8$ is obtuse.'] },
    { h: 'Where it actually gets used',
      p: ['The diagonal of a rectangle, the height of a ladder against a wall, the straight-line distance between two points on a grid.',
          'On coordinates, the horizontal and vertical gaps are the legs, and the distance between the points is the hypotenuse.'] }
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
    'Treating a leg as the hypotenuse. $c$ is always opposite the right angle and always longest.',
    'Adding when you should subtract while finding a leg.',
    'Forgetting the final square root and leaving the answer as $c^2$.'
  ]
},
{
  id: 'functions', strand: 'algebra', fig: 'functionMachine',
  title: 'Functions',
  big: 'A function is a machine: one input goes in, exactly one output comes out. The rule is the machine.',
  vocab: [
    ['Function', 'A rule pairing each input with exactly one output.'],
    ['Input / output', 'The value you put in ($x$) and what comes out ($y$).'],
    ['Slope', 'How much $y$ changes for each $1$ that $x$ increases.'],
    ['$y$-intercept', 'The output when $x = 0$ — where the line crosses the vertical axis.'],
    ['Linear function', 'One whose graph is a straight line: $y = mx + b$.']
  ],
  sections: [
    { h: 'The function machine',
      p: ['Picture a machine with a rule written on it, say "multiply by $3$, then add $2$". Feed in $4$, out comes $14$.',
          'The rule in symbols is $y = 3x + 2$, or in function notation $f(x) = 3x + 2$, so $f(4) = 14$.',
          'The defining condition: the same input must always give the same output. One in, exactly one out.'],
      box: { k: 'key', h: 'The test', t: 'If any input produces two different outputs, it is not a function. On a graph, that means a vertical line crossing the curve twice.' } },
    { h: 'Four ways to show the same function',
      p: ['<strong>Rule:</strong> $y = 3x + 2$.',
          '<strong>Table:</strong> $x = 0, 1, 2, 3$ giving $y = 2, 5, 8, 11$.',
          '<strong>Graph:</strong> the points $(0,2), (1,5), (2,8)$ lie on a straight line.',
          '<strong>Words:</strong> "a $\\$2$ booking fee plus $\\$3$ per ticket".',
          'Being able to move between all four is most of this unit.'] },
    { h: 'Slope and intercept, read from anywhere',
      p: ['In $y = mx + b$, $m$ is the slope and $b$ is the $y$-intercept.',
          '<strong>From a table:</strong> the constant jump in $y$ per step of $1$ in $x$ is $m$; the value at $x = 0$ is $b$.',
          '<strong>From a graph:</strong> $m = \\dfrac{\\text{rise}}{\\text{run}}$ between any two points; $b$ is where it crosses the $y$-axis.',
          '<strong>From two points:</strong> $m = \\dfrac{y_2 - y_1}{x_2 - x_1}$, then substitute one point to find $b$.'] },
    { h: 'What the slope means in a story',
      p: ['Slope is a rate: dollars per ticket, miles per hour, cm of growth per week.',
          'Positive slope rises, negative slope falls, and zero slope is flat — no change.',
          'The $y$-intercept is the starting amount, before anything happens: a joining fee, a head start, a tank already part full.'],
      box: { k: 'slow', h: 'Name them in words first', t: 'Before touching the algebra, say aloud: "the slope is ___ per ___, and the starting value is ___." Then write $y = mx + b$. The equation almost writes itself.' } },
    { h: 'Linear or not?',
      p: ['A function is linear exactly when equal steps in $x$ give equal steps in $y$.',
          '$x = 1, 2, 3$ giving $y = 5, 8, 11$ is linear — the jump is always $+3$.',
          '$y = 1, 4, 9$ is not — the jumps are $+3$ then $+5$. That one is $y = x^2$.',
          'And a proportional relationship is just a linear function with $b = 0$.'] }
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
    'Computing slope as $\\dfrac{\\text{run}}{\\text{rise}}$ — it is rise over run.',
    'Reading $b$ from any point instead of from $x = 0$.',
    'Calling a relationship linear after checking only one pair of values.'
  ]
},
];

/* Two courses share one unit registry; each course fixes its own sequence.
   A unit's displayed number is its position in the active course, not a stored field. */
window.COURSES = {
  accel: {
    id: 'accel', name: '7th Grade Accelerated', short: 'Accelerated',
    blurb: 'Ratio and proportion, rational numbers, statistics and probability, equations and inequalities, then geometry.',
    units: ['rates','percents','posrational','negrational','stats','probsimple','probcompound','proprel',
            'algrel','reasoning','equations','inequalities','scale','area2d','sections3d','volume','construction']
  },
  math7: {
    id: 'math7', name: 'Math 7', short: 'Math 7',
    blurb: 'A traditional sequence: number systems and exponents, then algebra, measurement and geometry, finishing with data, Pythagoras and functions.',
    units: ['exponents','problemsolving','squareroots','realnumbers','gcflcm','negrational','algrel','equations',
            'measurement','circles','volume','rates','proprel','graphs','stats','probsimple','probcompound',
            'pythagorean','functions']
  }
};
