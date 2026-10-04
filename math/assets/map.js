/* Prerequisite graph. An edge A -> B means "B genuinely needs A first", not merely
   "A is taught earlier". Every edge is drawn, including the eleven that another path
   already implies — each of those is a real direct dependency and worth seeing.
   Two invariants the map view relies on, both checked by hand after every edit:
   the graph is acyclic, and no unit names a prerequisite its own course teaches later. */
(function () {

  window.PREREQ = {

  /* ---- grade 6: the roots of the whole graph ---- */
  decimalops:   [],
  gcflcm:       [],
  fracdiv:      [],
  integers6:    [],
  expressions6: [],
  areatri:      [],
  statquestions:[],
  ratios6:      [],
  problemsolving: [],
  coordplane:   ['integers6'],
  unitrates:    ['ratios6', 'decimalops'],
  percent6:     ['ratios6', 'decimalops'],
  equations6:   ['expressions6'],
  inequal6:     ['equations6', 'integers6'],
  surfacenets:  ['areatri'],
  volumefrac:   ['areatri', 'fracdiv'],
  centerspread: ['statquestions', 'decimalops'],
  graphs:       ['percent6', 'ratios6'],

  /* ---- grade 7 ---- */
  rates:        ['unitrates'],
  percents:     ['percent6'],
  posrational:  ['fracdiv'],
  negrational:  ['integers6', 'posrational'],
  stats:        ['centerspread', 'statquestions'],
  probsimple:   ['posrational'],
  probcompound: ['probsimple'],
  proprel:      ['ratios6', 'coordplane'],
  algrel:       ['expressions6'],
  reasoning:    ['equations6', 'algrel'],
  equations:    ['equations6', 'negrational'],
  inequalities: ['inequal6', 'equations'],
  scale:        ['ratios6', 'areatri'],
  area2d:       ['areatri'],
  sections3d:   ['surfacenets'],
  volume:       ['volumefrac', 'area2d'],
  construction: ['area2d'],
  exponents:    ['expressions6'],
  squareroots:  ['expressions6'],
  realnumbers:  ['squareroots', 'fracdiv'],
  measurement:  ['unitrates'],
  circles:      ['areatri'],
  pythagorean:  ['squareroots', 'areatri'],
  functions:    ['proprel', 'coordplane'],

  /* ---- grade 8 ---- */
  transformations: ['coordplane'],
  congruence:   ['transformations'],
  dilations:    ['transformations', 'ratios6'],
  multistep:    ['equations'],
  angles8:      ['equations6'],
  slope:        ['proprel', 'coordplane'],
  linearfn:     ['slope', 'functions'],
  functiondef:  ['functions'],
  systems8:     ['linearfn', 'multistep'],
  scatter:      ['coordplane', 'stats'],
  bestfit:      ['scatter', 'linearfn'],
  twoway:       ['percent6', 'stats'],
  distance8:    ['pythagorean', 'coordplane'],
  scinotation:  ['exponents'],
  volume8:      ['volume', 'circles'],

  /* ---- algebra I ---- */
  expressions9: ['algrel', 'exponents'],
  solving9:     ['multistep'],
  inequalities9:['inequalities', 'solving9'],
  slopeforms:   ['slope', 'linearfn'],
  writelinear:  ['slopeforms', 'functiondef'],
  systems9:     ['systems8', 'solving9'],
  regression:   ['bestfit'],
  exponential:  ['exponents', 'functiondef'],
  sequences9:   ['functiondef', 'algrel'],
  polynomials:  ['expressions9'],
  factoring:    ['polynomials', 'gcflcm'],
  quadgraphs:   ['factoring', 'functiondef'],
  solvequad:    ['factoring', 'squareroots'],
  radicals:     ['squareroots', 'exponents'],
  advfunctions: ['functiondef', 'integers6'],
  stats9:       ['stats', 'centerspread'],

  /* ---- geometry ---- */
  geobasics:    ['equations6'],
  geoproof:     ['geobasics'],
  triproof:     ['geoproof', 'congruence'],
  polygons:     ['triproof', 'angles8'],
  simproof:     ['dilations', 'geoproof', 'proprel'],
  righttri:     ['simproof', 'pythagorean'],
  circleangles: ['circles', 'angles8'],
  circleeq:     ['distance8', 'solvequad'],
  coordproof:   ['distance8', 'slopeforms', 'polygons'],
  solids3d:     ['volume8', 'sections3d'],

  /* ---- algebra II ---- */
  functionops:  ['functiondef', 'solving9'],
  transformfn:  ['quadgraphs', 'advfunctions'],
  polydiv:      ['polynomials', 'factoring'],
  polyfn:       ['polydiv', 'quadgraphs'],
  complexnum:   ['solvequad', 'radicals'],
  radicaleq:    ['radicals', 'solvequad'],
  rational:     ['factoring', 'posrational'],
  logarithms:   ['exponential', 'functionops'],
  expmodels:    ['logarithms'],
  series:       ['sequences9'],
  unitcircle:   ['righttri', 'circles'],
  triggraphs:   ['unitcircle', 'transformfn'],
  trigid:       ['unitcircle', 'pythagorean'],
  normaldist:   ['stats9', 'percent6'],
  statinf:      ['normaldist'],

  /* ---- precalculus ---- */
  invtrig:      ['trigid', 'functionops'],
  trigadv:      ['righttri', 'trigid'],
  polar:        ['unitcircle', 'complexnum'],
  vectors:      ['righttri', 'coordplane'],
  matrices:     ['systems9'],
  conics:       ['circleeq', 'quadgraphs'],
  paramfn:      ['unitcircle', 'functiondef'],
  probadv:      ['probcompound', 'polynomials'],
  limits:       ['rational', 'functionops'],
  derivintro:   ['limits', 'slopeforms'],
  areaintro:    ['derivintro', 'areatri']

  };

  /* A handful of individual skills lean on a unit their own unit does not.
     Keyed "unitId.skill" so a wrong answer can point somewhere more precise. */
  window.SKILL_PREREQ = {
    'circleeq.complete':   ['solvequad'],
    'coordproof.slope':    ['slopeforms'],
    'righttri.inverse':    ['functionops'],
    'polyfn.multiplicity': ['factoring'],
    'rational.work':       ['rates'],
    'expmodels.solve':     ['logarithms'],
    'series.decimal':      ['realnumbers'],
    'statinf.margin':      ['squareroots'],
    'limits.rationalise':  ['radicals'],
    'areaintro.trapezium': ['areatri'],
    'probadv.binomial':    ['polynomials'],
    'conics.complete':     ['solvequad'],
    'trigid.quadratic':    ['solvequad'],
    'vectors.components':  ['righttri'],
    'polar.quadrant':      ['unitcircle']
  };

})();
