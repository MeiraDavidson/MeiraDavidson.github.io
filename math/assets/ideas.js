/* Big ideas: the threads that run through the grades. A unit is one step on one of these
   ladders — unit rate in Grade 6, constant of proportionality in Grade 7, slope in Grade 8 are
   the same idea at different ages — and the small concepts (the lessons' Words to know) hang
   off the unit that teaches them. So the knowledge is organised in three sizes:
     topic (strand) › big idea › unit › concept
   Every unit sits on exactly one ladder, listed in the order a learner meets them.
   Load after curriculum.js; concepts.js and app.js read window.IDEAS. */
(function () {
  window.IDEAS = [
  /* ---- The Number System ---- */
  { id: 'numops', strand: 'number', name: 'Numbers & operations',
    gist: 'Add, subtract, multiply and divide every kind of number — whole, decimal, fraction and negative — by the same few rules.',
    units: ['decimalops', 'gcflcm', 'fracdiv', 'integers6', 'posrational', 'negrational'] },
  { id: 'powers', strand: 'number', name: 'Powers, roots & real numbers',
    gist: 'Repeated multiplication, its undoing, and the new numbers that undoing creates — irrational and then complex.',
    units: ['exponents', 'squareroots', 'realnumbers', 'scinotation', 'radicals', 'complexnum'] },

  /* ---- Ratio & Proportion ---- */
  { id: 'proportion', strand: 'ratio', name: 'Ratios, rates & proportion',
    gist: 'Two quantities that change together at a fixed rate — and the unit rate that names it.',
    units: ['ratios6', 'unitrates', 'rates', 'proprel', 'scale'] },
  { id: 'percent', strand: 'ratio', name: 'Percent',
    gist: 'A ratio out of a hundred — the language of discounts, tax, interest and change.',
    units: ['percent6', 'percents'] },

  /* ---- Expressions & Equations ---- */
  { id: 'expressions', strand: 'algebra', name: 'Expressions & structure',
    gist: 'Letters stand for numbers, and an expression can be rewritten in many ways without changing its value.',
    units: ['expressions6', 'algrel', 'expressions9'] },
  { id: 'solving', strand: 'algebra', name: 'Equations & inequalities',
    gist: 'Keep both sides balanced and undo what was done to the unknown, one step at a time.',
    units: ['equations6', 'inequal6', 'reasoning', 'equations', 'inequalities', 'multistep', 'solving9', 'inequalities9'] },
  { id: 'functions', strand: 'algebra', name: 'Functions',
    gist: 'A rule that gives each input exactly one output — and ways to combine, invert, shift and stretch such rules.',
    units: ['functions', 'functiondef', 'advfunctions', 'functionops', 'transformfn', 'paramfn'] },
  { id: 'linear', strand: 'algebra', name: 'Linear relationships',
    gist: 'A constant rate of change draws a straight line: y = mx + b, where m is the slope.',
    units: ['slope', 'linearfn', 'slopeforms', 'writelinear'] },
  { id: 'systems', strand: 'algebra', name: 'Systems of equations',
    gist: 'Several conditions at once: the answer is what satisfies them all — where the lines meet.',
    units: ['systems8', 'systems9', 'matrices'] },
  { id: 'polynomials', strand: 'algebra', name: 'Polynomials & factoring',
    gist: 'Expressions built from powers of x — multiplied out, factored back, and divided like numbers.',
    units: ['polynomials', 'factoring', 'polydiv'] },
  { id: 'quadratics', strand: 'algebra', name: 'Quadratics',
    gist: 'The squared relationship: a parabola with a vertex, an axis of symmetry and up to two roots.',
    units: ['quadgraphs', 'solvequad'] },
  { id: 'algfunctions', strand: 'algebra', name: 'Polynomial, rational & radical functions',
    gist: 'The graphs of polynomials, fractions of polynomials and roots — their zeros, asymptotes and restrictions.',
    units: ['polyfn', 'rational', 'radicaleq'] },
  { id: 'exponential', strand: 'algebra', name: 'Exponential growth & logarithms',
    gist: 'Growth by a constant factor instead of a constant amount — and the logarithm that undoes it.',
    units: ['exponential', 'logarithms', 'expmodels'] },
  { id: 'sequences', strand: 'algebra', name: 'Sequences & series',
    gist: 'Patterns that go on step by step, the rule for any term, and the sum of many terms.',
    units: ['sequences9', 'series'] },

  /* ---- Geometry ---- */
  { id: 'coordgeo', strand: 'geometry', name: 'Coordinate geometry',
    gist: 'Points as number pairs, so that shapes, distances and curves can be handled with algebra.',
    units: ['coordplane', 'coordproof', 'vectors', 'conics'] },
  { id: 'area', strand: 'geometry', name: 'Length, perimeter & area',
    gist: 'Measuring flat shapes: the distance around and the space inside, from any shape cut into simple ones.',
    units: ['areatri', 'area2d', 'measurement'] },
  { id: 'volume', strand: 'geometry', name: 'Surface area & volume',
    gist: 'Measuring solids: the area that wraps them, the space they hold, and the shapes their slices make.',
    units: ['surfacenets', 'volumefrac', 'volume', 'sections3d', 'volume8', 'solids3d'] },
  { id: 'proof', strand: 'geometry', name: 'Angles, reasoning & proof',
    gist: 'What must be true from what is given — angle facts, triangle congruence and the proofs that tie them.',
    units: ['construction', 'angles8', 'geobasics', 'geoproof', 'triproof', 'polygons'] },
  { id: 'transform', strand: 'geometry', name: 'Transformations & similarity',
    gist: 'Moving, flipping, turning and scaling shapes — what stays the same tells you they are congruent or similar.',
    units: ['transformations', 'congruence', 'dilations', 'simproof'] },
  { id: 'righttri', strand: 'geometry', name: 'Right triangles',
    gist: 'a² + b² = c², the distance it gives, and the ratios sine, cosine and tangent that solve any triangle.',
    units: ['pythagorean', 'distance8', 'righttri', 'trigadv'] },
  { id: 'circles', strand: 'geometry', name: 'Circles',
    gist: 'π, circumference and area, then the angles, arcs and equations that belong to a circle.',
    units: ['circles', 'circleangles', 'circleeq'] },

  /* ---- Trigonometry ---- */
  { id: 'trigfn', strand: 'trig', name: 'Trigonometric functions',
    gist: 'Angles measured around a circle, the waves sine and cosine make, and the identities that link them.',
    units: ['unitcircle', 'triggraphs', 'trigid', 'invtrig', 'polar'] },

  /* ---- Statistics & Probability ---- */
  { id: 'describe', strand: 'data', name: 'Describing data',
    gist: 'Summarise a set of numbers with a centre and a spread, and choose the picture that shows its shape.',
    units: ['statquestions', 'centerspread', 'graphs', 'stats9', 'normaldist'] },
  { id: 'inference', strand: 'data', name: 'Sampling & inference',
    gist: 'What a fair sample can tell you about a whole population — and how sure you can be.',
    units: ['stats', 'statinf'] },
  { id: 'bivariate', strand: 'data', name: 'Two-variable data',
    gist: 'Do two quantities move together? Scatter plots, lines of best fit and tables of counts.',
    units: ['scatter', 'bestfit', 'twoway', 'regression'] },
  { id: 'probability', strand: 'data', name: 'Probability & counting',
    gist: 'How likely, as a number from 0 to 1 — and how to count the outcomes it depends on.',
    units: ['probsimple', 'probcompound', 'probadv'] },

  /* ---- Introduction to Calculus ---- */
  { id: 'calculus', strand: 'calculus', name: 'Change & accumulation',
    gist: 'The rate of change at a single instant, and the total built up over time — the two halves of calculus.',
    units: ['limits', 'derivintro', 'areaintro'] },

  /* ---- Problem Solving ---- */
  { id: 'strategies', strand: 'skills', name: 'Problem-solving strategies',
    gist: 'What to do when you do not know what to do: draw it, try a case, work backwards, look for a pattern.',
    units: ['problemsolving'] }
  ];

  /* Everyday words a learner might type, pointed at the words the lessons use. */
  window.SEARCH_WORDS = {
    average: 'mean', middle: 'median', 'most common': 'mode', spread: 'range',
    'greatest common factor': 'gcf', 'greatest common divisor': 'gcf', gcd: 'gcf', 'least common multiple': 'lcm',
    'common denominator': 'lcd', 'rise over run': 'slope', gradient: 'slope', 'y intercept': 'y-intercept',
    'x intercept': 'x-intercept', zeros: 'roots', zero: 'roots', solutions: 'roots', pythagoras: 'hypotenuse',
    sohcahtoa: 'sine', soh: 'sine', cah: 'cosine', toa: 'tangent', 'n choose k': 'combination', ncr: 'combination',
    npr: 'permutation', choose: 'combination', 'box and whisker': 'five-number summary', 'box plot': 'five-number summary',
    quartile: 'interquartile range', iqr: 'interquartile range',
    percentage: 'percent', '%': 'percent', 'scientific notation': 'scientific notation', exponent: 'exponent',
    power: 'exponent', 'square root': 'square root', radical: 'radical', log: 'logarithm', ln: 'natural log',
    derivative: 'derivative', integral: 'riemann sum', 'area under': 'riemann sum', 'line of best fit': 'line of best fit',
    'trend line': 'line of best fit', correlation: 'correlation coefficient', 'bell curve': 'normal distribution',
    'standard deviation': 'standard deviation', sd: 'standard deviation', reciprocal: 'reciprocal', flip: 'reciprocal'
  };
})();
