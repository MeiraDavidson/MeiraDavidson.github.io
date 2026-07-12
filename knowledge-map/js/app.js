/* ===========================================================================
   Knowledge Map — SPA (hash router, no build step, works from file://)
   =========================================================================== */
(function () {
  "use strict";
  var KM = window.KNOWLEDGE_MAP || { subjects: [], units: {}, kps: {}, quizzes: {}, problemSets: {} };
  var view = document.getElementById("view");
  var TCLASS = { "math": "t-math", "science": "t-science", "ela": "t-ela", "social-studies": "t-social" };
  var GRADES = ["7", "8", "9"];

  /* ---------- tiny DOM helper --------------------------------------------*/
  function el(tag, props, kids) {
    var e = document.createElement(tag);
    if (props) for (var k in props) {
      if (k === "class") e.className = props[k];
      else if (k === "html") e.innerHTML = props[k];
      else if (k === "text") e.textContent = props[k];
      else if (k.slice(0, 2) === "on" && typeof props[k] === "function") e.addEventListener(k.slice(2), props[k]);
      else if (props[k] != null) e.setAttribute(k, props[k]);
    }
    if (kids != null) (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
      if (c == null) return;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function esc(s) { return String(s == null ? "" : s); }

  /* ---------- progress store ---------------------------------------------*/
  var PKEY = "km-progress-v1";
  var P = load();
  function load() { try { return JSON.parse(localStorage.getItem(PKEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(PKEY, JSON.stringify(P)); } catch (e) {} }
  function kpState(id) { P.kps = P.kps || {}; return (P.kps[id] = P.kps[id] || { done: false, ex: {} }); }
  function quizState(id) { P.quizzes = P.quizzes || {}; return (P.quizzes[id] = P.quizzes[id] || { best: 0, passed: false, attempts: 0 }); }
  function markKP(id, done) { kpState(id).done = done !== false; if (done !== false && P.needsReview) delete P.needsReview[id]; save(); }
  function recordEx(kpId, qid, ok) { var s = kpState(kpId); s.ex[qid] = ok; save(); }
  function recordVisit(id) { P.last = id; save(); }

  /* ---------- concept mastery & gap diagnosis ----------------------------*/
  function rankOf(kp) { return (Number(kp.grade) || 0) * 1e6 + ((KM.units[kp.unitId] || {}).order || 0) * 1e3 + (kp.order || 0); }
  function conceptStats(id) {
    var s = (P.kps && P.kps[id]) || {}, ex = s.ex || {};
    var ids = Object.keys(ex), correct = ids.filter(function (k) { return ex[k]; }).length;
    return { done: !!s.done, attempted: ids.length, correct: correct, ratio: ids.length ? correct / ids.length : null };
  }
  function conceptState(kp) {
    var st = conceptStats(kp.id);
    if (st.done) return "mastered";
    if (st.attempted >= 2 && st.ratio < 0.6) return "shaky";
    if (st.attempted > 0) return "in-progress";
    var rel = kp.related || [];
    return (!rel.length || rel.every(function (r) { return P.kps && P.kps[r.id] && P.kps[r.id].done; })) ? "ready" : "locked";
  }
  // Build a prioritized review plan for a set of struggled-with concepts:
  // the weak concepts + any prerequisites that are themselves shaky or unfinished, foundational-first.
  function reviewPlan(weakIds) {
    var plan = {};
    function needsWork(id) { var kp = KM.kps[id]; if (!kp) return false; var s = conceptState(kp); return s === "shaky" || (!(P.kps && P.kps[id] && P.kps[id].done)); }
    weakIds.forEach(function (id) {
      var kp = KM.kps[id]; if (!kp) return;
      plan[id] = plan[id] || { id: id, isGap: false };
      (kp.related || []).forEach(function (r) {
        if (needsWork(r.id) && conceptState(KM.kps[r.id]) !== "mastered") plan[r.id] = { id: r.id, isGap: true };
      });
    });
    return Object.keys(plan).map(function (id) { return { kp: KM.kps[id], isGap: plan[id].isGap, rank: rankOf(KM.kps[id]) }; })
      .filter(function (x) { return x.kp; }).sort(function (a, b) { return a.rank - b.rank; });
  }
  function allShakyConcepts() {
    var out = [];
    for (var id in (P.kps || {})) { var kp = KM.kps[id]; if (kp && conceptState(kp) === "shaky") out.push(id); }
    return out;
  }
  // Weak = long-term shaky OR flagged by a recent assessment, minus anything now mastered.
  function weakConcepts() {
    var set = {};
    allShakyConcepts().forEach(function (id) { set[id] = true; });
    for (var id in (P.needsReview || {})) { if (KM.kps[id] && !(P.kps && P.kps[id] && P.kps[id].done)) set[id] = true; }
    return Object.keys(set);
  }
  function hasPracticed() {
    if (P.tests && Object.keys(P.tests).length) return true;
    if (P.regents && Object.keys(P.regents).length) return true;
    for (var id in (P.kps || {})) { if (P.kps[id].ex && Object.keys(P.kps[id].ex).length) return true; }
    return false;
  }

  function unitProgress(unitId) {
    var u = KM.units[unitId]; if (!u || !u.knowledgePoints.length) return 0;
    var done = 0;
    u.knowledgePoints.forEach(function (id) { if (P.kps && P.kps[id] && P.kps[id].done) done++; });
    return Math.round(done / u.knowledgePoints.length * 100);
  }
  function gradeUnits(subjKey, grade) {
    var s = subjectByKey(subjKey); if (!s) return [];
    return (s.grades[grade] || []).map(function (id) { return KM.units[id]; }).filter(Boolean)
      .sort(function (a, b) { return a.order - b.order; });
  }
  function subjectGradeProgress(subjKey, grade) {
    var units = gradeUnits(subjKey, grade), total = 0, done = 0;
    units.forEach(function (u) {
      total += u.knowledgePoints.length;
      u.knowledgePoints.forEach(function (id) { if (P.kps && P.kps[id] && P.kps[id].done) done++; });
    });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0, units: units.length };
  }
  function subjectByKey(k) { for (var i = 0; i < KM.subjects.length; i++) if (KM.subjects[i].key === k) return KM.subjects[i]; return null; }

  /* ---------- confetti ----------------------------------------------------*/
  function confetti() {
    var host = document.getElementById("confetti");
    var cols = ["#4f6ef7", "#22b57f", "#ffb020", "#ef5f6b", "#9b5de5", "#17b890"];
    for (var i = 0; i < 40; i++) {
      var p = el("i");
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = cols[i % cols.length];
      p.style.animationDelay = (Math.random() * .3) + "s";
      p.style.transform = "scale(" + (.6 + Math.random()) + ")";
      host.appendChild(p);
    }
    setTimeout(function () { clear(host); }, 1700);
  }

  /* ---------- rendering scaffolds ----------------------------------------*/
  function crumbs(items) {
    var c = el("nav", { class: "crumbs" });
    items.forEach(function (it, i) {
      if (i) c.appendChild(el("span", { class: "sep", text: "›" }));
      if (it.href) c.appendChild(el("a", { href: it.href, text: it.label }));
      else c.appendChild(el("span", { text: it.label }));
    });
    return c;
  }
  function ringWrap(pct, accentVar) {
    var w = el("div", { class: "ring-wrap" });
    var r = el("div", { class: "ring" }, el("span", { text: pct + "%" }));
    r.style.setProperty("--p", pct);
    if (accentVar) r.style.setProperty("--accent", accentVar);
    w.appendChild(r); return w;
  }
  function progressRow(pct, labelText) {
    var bar = el("div", { class: "pbar" }, el("i"));
    bar.firstChild.style.width = pct + "%";
    return el("div", { class: "progress-row" }, [bar, el("small", { text: labelText })]);
  }

  /* ========================================================================
     VIEW: HOME
     ====================================================================== */
  function viewHome() {
    var grade = sessionGet("grade") || "7";
    var root = el("div");
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { html: 'Learn anything, one idea at a time <span class="wave">🚀</span>' }),
      el("p", { text: "Your grades 7–9 map for Math, Science, ELA and Social Studies — built to the New York State standards used in Westchester County. Tap a subject, follow the path, and light up every idea." })
    ]));

    // signature knowledge-map banner
    root.appendChild(el("div", { class: "map-banner", onclick: function () { location.hash = "#/map"; } }, [
      el("div", { class: "mb-emoji", text: "🗺️" }),
      el("div", { class: "mb-body" }, [
        el("div", { class: "mb-title", text: "Explore the Knowledge Map" }),
        el("div", { class: "mb-sub", text: "See how every idea connects — and what you're ready to learn next." })
      ]),
      el("div", { class: "mb-go", text: "Open →" })
    ]));

    // Grade 9 Regents prep banner
    if (grade === "9") {
      root.appendChild(el("div", { class: "map-banner", style: "background:linear-gradient(120deg,#f4813f,#ef5f6b 55%,#9b5de5)", onclick: function () { location.hash = "#/regents"; } }, [
        el("div", { class: "mb-emoji", text: "🎓" }),
        el("div", { class: "mb-body" }, [
          el("div", { class: "mb-title", text: "Grade 9 Regents Prep" }),
          el("div", { class: "mb-sub", text: "Full-length timed practice exams for Algebra I & Earth Science, with a review plan." })
        ]),
        el("div", { class: "mb-go", text: "Prep →" })
      ]));
    }

    // install hint (dismissible)
    if (!localStorage.getItem("km-hide-install")) {
      var hint = el("div", { class: "install-hint" }, [
        el("div", { text: "📲" }),
        el("div", { html: "<b>Use it like an app on iPad:</b> open in Safari, tap Share, then <b>Add to Home Screen</b>. It works offline too." }),
        el("div", { class: "x", text: "✕", onclick: function () { localStorage.setItem("km-hide-install", "1"); hint.remove(); } })
      ]);
      root.appendChild(hint);
    }

    // jump back in
    if (P.last && KM.kps[P.last]) {
      var lk = KM.kps[P.last], lu = KM.units[lk.unitId] || {};
      root.appendChild(el("div", { class: "resume", onclick: function () { location.hash = "#/kp/" + P.last; } }, [
        el("div", { class: "r-emoji", text: "↩️" }),
        el("div", {}, [
          el("div", { style: "font-weight:900", text: "Jump back in: " + lk.title }),
          el("div", { class: "r-sub", text: (subjectByKey(lk.subject) || {}).name + " · " + (lu.title || "") })
        ]),
        el("div", { class: "r-go", text: "Continue →" })
      ]));
    }

    // grade tabs
    var gbar = el("div", { class: "gradebar" });
    GRADES.forEach(function (g) {
      gbar.appendChild(el("button", {
        class: "grade-tab" + (g === grade ? " active" : ""),
        text: "Grade " + g,
        onclick: function () { sessionSet("grade", g); render(); }
      }));
    });
    root.appendChild(gbar);

    // subject cards
    var grid = el("div", { class: "grid subjects" });
    KM.subjects.forEach(function (s) {
      var pr = subjectGradeProgress(s.key, grade);
      var card = el("div", { class: "card subject-card " + (TCLASS[s.key] || ""),
        onclick: function () { location.hash = "#/subject/" + s.key + "/" + grade; } });
      card.appendChild(el("div", { class: "accent-bar" }));
      card.appendChild(el("div", { class: "emoji", text: s.emoji }));
      card.appendChild(el("h3", { text: s.name }));
      card.appendChild(el("div", { class: "meta" }, [
        el("span", { class: "chip", text: pr.units + " units" }),
        el("span", { class: "chip accent", text: pr.total + " ideas" })
      ]));
      card.appendChild(progressRow(pr.pct, pr.done + "/" + pr.total));
      grid.appendChild(card);
    });
    root.appendChild(grid);

    // map-powered "ready to learn next" recommendations
    var readyList = [];
    for (var kid in KM.kps) {
      var k = KM.kps[kid];
      if (P.kps && P.kps[kid] && P.kps[kid].done) continue;
      var rel = k.related || [];
      var isReady = !rel.length || rel.every(function (r) { return P.kps && P.kps[r.id] && P.kps[r.id].done; });
      var startedUnit = (KM.units[k.unitId] || { knowledgePoints: [] }).knowledgePoints.some(function (id) { return P.kps && P.kps[id] && P.kps[id].done; });
      if (isReady) readyList.push({ kp: k, rank: (Number(k.grade) || 0) * 1e6 + ((KM.units[k.unitId] || {}).order || 0) * 1e3 + (k.order || 0), started: startedUnit });
    }
    // prefer concepts in units you've already started, then earliest
    readyList.sort(function (a, b) { return (b.started - a.started) || (a.rank - b.rank); });
    if (readyList.length) {
      root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "⭐ Ready to learn next" }), el("span", { class: "line" }), el("a", { href: "#/map", class: "pill-count", style: "text-decoration:underline", text: "see the map" })]));
      var rgrid = el("div", { class: "grid kps" });
      readyList.slice(0, 4).forEach(function (r) {
        var kp = r.kp, subj = subjectByKey(kp.subject);
        var card = el("div", { class: "card " + (TCLASS[kp.subject] || ""), onclick: function () { location.hash = "#/kp/" + kp.id; } });
        card.appendChild(el("div", { class: "accent-bar" }));
        card.appendChild(el("div", { class: "pill-count", text: subj.name + " · Grade " + kp.grade }));
        card.appendChild(el("h3", { text: kp.title }));
        card.appendChild(el("span", { class: "chip accent", text: r.started ? "continues your unit" : "you're ready for this" }));
        rgrid.appendChild(card);
      });
      root.appendChild(rgrid);
    }

    // map-powered gap diagnosis — "shore up your foundations" (always shown, so it's discoverable)
    root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "🩹 Shore up your foundations" }), el("span", { class: "line" })]));
    var weak = weakConcepts();
    var plan = weak.length ? renderReviewPlan(weak, { title: "Concepts you've found tricky", intro: "You've missed questions on the ideas below. The map traces each back to its foundation — clear these up and everything built on top gets easier. (Open one and mark it complete to clear it from here.)" }) : null;
    if (plan) {
      root.appendChild(plan);
    } else {
      root.appendChild(el("div", { class: "panel reviewplan" }, [
        el("div", { class: "eyebrow", text: hasPracticed() ? "✅ No gaps right now" : "How this works" }),
        el("p", { style: "margin:0;color:var(--ink-soft)", html: hasPracticed()
          ? "Nice — nothing's tracing back to a weak spot. Whenever you miss questions on a <b>practice test</b> or in <b>practice</b>, this is where your personalized, foundations-first review plan appears."
          : "Take a unit's <b>⏱️ Practice Test</b> (or answer some practice questions) and a personalized review plan shows up right here — it traces each idea you miss back through the knowledge map to the foundation it needs, so you fix the root cause first." })
      ]));
    }

    // overall stats
    var totalKp = Object.keys(KM.kps).length;
    var doneKp = Object.keys(P.kps || {}).filter(function (k) { return P.kps[k].done; }).length;
    root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "Your journey" }), el("span", { class: "line" })]));
    root.appendChild(el("div", { class: "panel" }, [
      el("div", { class: "progress-row" }, [
        ringWrap(totalKp ? Math.round(doneKp / totalKp * 100) : 0),
        el("div", {}, [
          el("div", { html: "<b>" + doneKp + "</b> of <b>" + totalKp + "</b> ideas mastered across all subjects." }),
          el("div", { class: "pill-count", text: "Keep your streak going — every idea you complete fills the ring." })
        ])
      ])
    ]));
    root.appendChild(footer());
    mount(root);
  }

  /* ========================================================================
     VIEW: SUBJECT (unit list for one grade)
     ====================================================================== */
  function viewSubject(subjKey, grade) {
    var s = subjectByKey(subjKey);
    if (!s) return notFound();
    var units = gradeUnits(subjKey, grade);
    var root = el("div", { class: TCLASS[subjKey] || "" });
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: s.name + " · Grade " + grade }]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: s.emoji + " " + s.name + " — Grade " + grade }),
      el("p", { text: units.length + " units follow the New York State sequence. Work top to bottom, or jump to what you need." })
    ]));

    // grade switch
    var gbar = el("div", { class: "gradebar" });
    GRADES.forEach(function (g) {
      gbar.appendChild(el("button", { class: "grade-tab" + (g === grade ? " active" : ""), text: "Grade " + g,
        onclick: function () { location.hash = "#/subject/" + subjKey + "/" + g; } }));
    });
    root.appendChild(gbar);

    if (!units.length) { root.appendChild(emptyBox("Content for this grade is coming soon.")); mount(root); return; }

    var grid = el("div", { class: "grid units" });
    units.forEach(function (u) {
      var pct = unitProgress(u.id);
      var card = el("div", { class: "card", onclick: function () { location.hash = "#/unit/" + u.id; } });
      card.appendChild(el("div", { class: "accent-bar" }));
      if (pct === 100) card.appendChild(el("div", { class: "badge-done", text: "★" }));
      card.appendChild(el("div", { class: "emoji", text: u.emoji || "📘" }));
      card.appendChild(el("h3", { text: "Unit " + u.order + ": " + u.title }));
      card.appendChild(el("p", { text: u.description || "" }));
      var chips = el("div", { class: "meta", style: "display:flex;gap:8px;flex-wrap:wrap" }, [
        el("span", { class: "chip", text: u.knowledgePoints.length + " ideas" }),
        u.hasQuiz ? el("span", { class: "chip accent", text: "Quiz" }) : null,
        u.hasProblemSet ? el("span", { class: "chip accent", text: "Problem set" }) : null
      ]);
      card.appendChild(chips);
      card.appendChild(progressRow(pct, pct + "%"));
      grid.appendChild(card);
    });
    root.appendChild(grid);

    // cumulative final exam for this subject + grade
    var exam = KM.finalExams[subjKey + "-g" + grade];
    if (exam) {
      P.finals = P.finals || {};
      var fst = P.finals[subjKey + "-g" + grade] || {};
      root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "Term-end self-check" }), el("span", { class: "line" })]));
      root.appendChild(el("div", { class: "finalexam-card", onclick: function () { location.hash = "#/final/" + subjKey + "/" + grade; } }, [
        el("div", { class: "fe-emoji", text: "🏆" }),
        el("div", { class: "fe-body" }, [
          el("div", { class: "fe-title", text: s.name + " Grade " + grade + " Final Exam" }),
          el("div", { class: "fe-sub", text: exam.questions.length + " cumulative questions across all " + units.length + " units" + (fst.attempts || fst.best ? " · best " + (fst.best || 0) + "%" : "") })
        ]),
        el("div", { class: "fe-go", text: fst.passed ? "★ Passed · Retake →" : "Start →" })
      ]));
    }

    root.appendChild(footer());
    mount(root);
  }

  /* ========================================================================
     VIEW: UNIT overview
     ====================================================================== */
  function viewUnit(unitId) {
    var u = KM.units[unitId];
    if (!u) return notFound();
    var s = subjectByKey(u.subject);
    var root = el("div", { class: TCLASS[u.subject] || "" });
    root.appendChild(crumbs([
      { label: "Home", href: "#/" },
      { label: s.name + " · G" + u.grade, href: "#/subject/" + u.subject + "/" + u.grade },
      { label: "Unit " + u.order }
    ]));

    var pct = unitProgress(unitId);
    var head = el("div", { class: "panel" }, [
      el("div", { class: "eyebrow", text: s.name + " · Unit " + u.order }),
      el("h1", { style: "margin:.2em 0", text: (u.emoji || "📘") + " " + u.title }),
      el("p", { style: "color:var(--ink-soft);font-size:1.05rem", text: u.description || "" }),
      u.essentialQuestion ? el("div", { class: "keyidea", style: "margin-top:12px" }, [
        el("span", { class: "k", text: "💡" }),
        el("div", { html: "<b>Essential question:</b> " + esc(u.essentialQuestion) })
      ]) : null,
      el("div", { style: "margin-top:14px" }, progressRow(pct, pct + "% complete")),
      (u.standardsFocus && u.standardsFocus.length) ? el("div", { class: "meta", style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:12px" },
        u.standardsFocus.map(function (c) { return el("span", { class: "chip std", text: c }); })) : null,
      el("div", { class: "btn-row", style: "margin-top:14px" }, [
        el("a", { class: "btn ghost", href: "#/print/" + unitId, text: "🖨️ Print / Save as PDF" })
      ])
    ]);
    root.appendChild(head);

    root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "Learn the ideas" }), el("span", { class: "line" })]));
    var grid = el("div", { class: "grid kps" });
    u.knowledgePoints.forEach(function (id, i) {
      var kp = KM.kps[id]; if (!kp) return;
      var done = P.kps && P.kps[id] && P.kps[id].done;
      var card = el("div", { class: "card", onclick: function () { location.hash = "#/kp/" + id; } });
      card.appendChild(el("div", { class: "accent-bar" }));
      if (done) card.appendChild(el("div", { class: "badge-done", text: "✓" }));
      card.appendChild(el("div", { class: "pill-count", text: "Idea " + (i + 1) }));
      card.appendChild(el("h3", { text: kp.title }));
      if (kp.standard && kp.standard.code) card.appendChild(el("span", { class: "chip std", text: kp.standard.code }));
      if (kp.visual) card.appendChild(el("span", { class: "chip accent", text: "▶ interactive" }));
      grid.appendChild(card);
    });
    root.appendChild(grid);

    // unit summary — everything in one place
    var sum = u.summary;
    if (sum && (sum.takeaways.length || sum.formulas.length || sum.vocabulary.length)) {
      root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "📋 Unit summary" }), el("span", { class: "line" })]));
      var sp = el("div", { class: "panel summary-card" });
      if (sum.takeaways.length) {
        sp.appendChild(el("div", { class: "eyebrow", text: "Key takeaways" }));
        sp.appendChild(el("ul", { class: "summary-takeaways" }, sum.takeaways.map(function (t) {
          return el("li", {}, [el("a", { class: "st-title", href: "#/kp/" + t.kpId, text: t.title }), document.createTextNode(" — "), el("span", { html: inlineMath(t.keyIdea) })]);
        })));
      }
      if (sum.formulas.length) {
        sp.appendChild(el("div", { class: "eyebrow", style: "margin-top:16px", text: "Formulas" }));
        var fg = el("div", { class: "summary-formulas" });
        sum.formulas.forEach(function (f) {
          fg.appendChild(el("div", { class: "formula-card mini" }, [
            f.name ? el("div", { class: "fc-name", text: f.name }) : null,
            el("div", { class: "fc-eq", html: inlineMath(f.formula) })
          ]));
        });
        sp.appendChild(fg);
      }
      if (sum.vocabulary.length) {
        sp.appendChild(el("div", { class: "eyebrow", style: "margin-top:16px", text: "Must-know vocabulary" }));
        sp.appendChild(el("div", { class: "vocab" }, sum.vocabulary.map(function (v) {
          return el("div", { class: "term", html: "<b>" + esc(v.term) + "</b> — " + inlineMath(v.definition) });
        })));
      }
      root.appendChild(sp);
    }

    // assessments
    var q = KM.quizzes[unitId], ps = KM.problemSets[unitId];
    if (q || ps) {
      root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "Check yourself" }), el("span", { class: "line" })]));
      var arow = el("div", { class: "grid units" });
      if (ps) {
        arow.appendChild(el("div", { class: "card", onclick: function () { location.hash = "#/problemset/" + unitId; } }, [
          el("div", { class: "accent-bar" }), el("div", { class: "emoji", text: "📝" }),
          el("h3", { text: "Summary Problem Set" }),
          el("p", { text: (ps.problems ? ps.problems.length : 0) + " mixed review problems with full worked solutions." })
        ]));
      }
      if (q) {
        var qs = quizState(unitId);
        arow.appendChild(el("div", { class: "card", onclick: function () { location.hash = "#/quiz/" + unitId; } }, [
          el("div", { class: "accent-bar" }),
          qs.passed ? el("div", { class: "badge-done", text: "★" }) : null,
          el("div", { class: "emoji", text: "🎯" }),
          el("h3", { text: "Unit Quiz" }),
          el("p", { text: (q.questions ? q.questions.length : 0) + " questions." + (qs.attempts ? " Best score: " + qs.best + "%." : " Pass at " + (q.passingScore || 70) + "%.") })
        ]));
      }
      // practice test — timed, mixes the whole unit's questions in random order
      var tst = (P.tests || {})[unitId] || {};
      arow.appendChild(el("div", { class: "card", onclick: function () { location.hash = "#/practicetest/" + unitId; } }, [
        el("div", { class: "accent-bar" }),
        el("div", { class: "emoji", text: "⏱️" }),
        el("h3", { text: "Practice Test" }),
        el("p", { text: "A timed, randomized mix of the whole unit's questions." + (tst.attempts ? " Best: " + tst.best + "%." : " Great pre-quiz warm-up.") })
      ]));
      root.appendChild(arow);
    }
    root.appendChild(footer());
    mount(root);
  }

  /* ========================================================================
     VIEW: KNOWLEDGE POINT
     ====================================================================== */
  function viewKP(kpId) {
    var kp = KM.kps[kpId];
    if (!kp) return notFound();
    recordVisit(kpId);
    var u = KM.units[kp.unitId] || {};
    var s = subjectByKey(kp.subject);
    var root = el("div", { class: "kp " + (TCLASS[kp.subject] || "") });
    root.appendChild(crumbs([
      { label: "Home", href: "#/" },
      { label: s.name + " · G" + kp.grade, href: "#/subject/" + kp.subject + "/" + kp.grade },
      { label: "Unit " + (u.order || ""), href: "#/unit/" + kp.unitId },
      { label: kp.title }
    ]));

    // header panel
    var header = el("div", { class: "panel" }, [
      el("div", { class: "eyebrow", text: (kp.standard && kp.standard.code ? kp.standard.code + " · " : "") + s.name }),
      el("h1", { style: "margin:.2em 0", text: kp.title }),
      kp.standard && kp.standard.text ? el("p", { style: "color:var(--ink-faint);font-size:.92rem", text: kp.standard.text }) : null
    ]);
    if (kp.objectives && kp.objectives.length) {
      header.appendChild(el("div", { style: "margin-top:8px" }, [
        el("div", { class: "eyebrow", text: "You'll be able to" }),
        el("ul", { class: "objectives" }, kp.objectives.map(function (o) { return el("li", { text: o }); }))
      ]));
    }
    // "builds on" — jump back to earlier concepts this one uses
    if (kp.related && kp.related.length) {
      var rbar = el("div", { class: "buildson" });
      rbar.appendChild(el("span", { class: "buildson-label", text: "🔗 Builds on" }));
      kp.related.forEach(function (r) {
        rbar.appendChild(el("a", { class: "buildson-chip", href: "#/kp/" + r.id,
          title: "“" + r.term + "” was explained in " + r.unitTitle + " (Grade " + r.grade + ")" }, [
          el("b", { text: r.term }), document.createTextNode(" · " + r.title)
        ]));
      });
      root.appendChild(rbar);
    }

    // explanation
    if (kp.explanation && kp.explanation.length) {
      var ex = el("div", { class: "panel explain" });
      ex.appendChild(el("div", { class: "eyebrow", text: "The idea" }));
      (Array.isArray(kp.explanation) ? kp.explanation : [kp.explanation]).forEach(function (p) {
        ex.appendChild(el("p", { html: inlineMath(p) }));
      });
      if (kp.keyIdea) ex.appendChild(el("div", { class: "keyidea" }, [el("span", { class: "k", text: "🔑" }), el("div", { html: "<b>Key idea:</b> " + inlineMath(kp.keyIdea) })]));
      root.appendChild(ex);
    }

    // Formula cards — pull key formulas out of the prose
    if (kp.formulas && kp.formulas.length) {
      var fp = el("div", { class: "panel" });
      fp.appendChild(el("div", { class: "eyebrow", text: kp.formulas.length > 1 ? "Formulas to remember" : "Formula to remember" }));
      kp.formulas.forEach(function (f) {
        fp.appendChild(el("div", { class: "formula-card" }, [
          f.name ? el("div", { class: "fc-name", text: f.name }) : null,
          el("div", { class: "fc-eq", html: inlineMath(f.formula) }),
          f.where ? el("div", { class: "fc-where", html: "where " + inlineMath(f.where) }) : null
        ]));
      });
      root.appendChild(fp);
    }

    // Go Deeper — richer, expandable content
    if (kp.deepDive && kp.deepDive.length) {
      var dd = el("details", { class: "panel deepdive" });
      var sum = el("summary", {}, [
        el("span", { class: "dd-badge", text: "🔬 Go Deeper" }),
        el("span", { class: "dd-hint", text: kp.deepDive.length + " section" + (kp.deepDive.length > 1 ? "s" : "") + " · tap to expand" })
      ]);
      dd.appendChild(sum);
      kp.deepDive.forEach(function (sec) {
        dd.appendChild(el("h4", { class: "dd-heading", html: inlineMath(sec.heading || "") }));
        (Array.isArray(sec.body) ? sec.body : [sec.body]).forEach(function (para) {
          dd.appendChild(el("p", { html: inlineMath(para) }));
        });
      });
      root.appendChild(dd);
    }

    // visual
    if (kp.visual) {
      var vpanel = el("div", { class: "panel" }, el("div", { class: "eyebrow", text: "See it in action" }));
      var fig = el("figure", { class: "visual" });
      vpanel.appendChild(fig);
      root.appendChild(vpanel);
      // render after mount so sizing works
      setTimeout(function () {
        try { window.AnimLib.render(kp.visual.component || "custom", fig, kp.visual); } catch (e) {}
      }, 30);
    }

    // vocabulary
    if (kp.vocabulary && kp.vocabulary.length) {
      root.appendChild(el("div", { class: "panel" }, [
        el("div", { class: "eyebrow", text: "Words to know" }),
        el("div", { class: "vocab" }, kp.vocabulary.map(function (v) {
          return el("div", { class: "term", html: "<b>" + esc(v.term) + "</b> — " + inlineMath(v.definition) });
        }))
      ]));
    }

    // worked examples
    if (kp.workedExamples && kp.workedExamples.length) {
      var wp = el("div", { class: "panel" }, el("div", { class: "eyebrow", text: "Worked examples" }));
      kp.workedExamples.forEach(function (w) {
        var box = el("div", { class: "example" });
        box.appendChild(el("div", { class: "q", html: inlineMath(w.problem) }));
        if (w.steps) box.appendChild(el("ol", {}, w.steps.map(function (st) { return el("li", { html: inlineMath(st) }); })));
        if (w.answer != null) box.appendChild(el("div", { class: "ans", html: "Answer: " + inlineMath(String(w.answer)) }));
        wp.appendChild(box);
      });
      root.appendChild(wp);
    }

    // real world
    if (kp.realWorld) {
      root.appendChild(el("div", { class: "panel keyidea" }, [el("span", { class: "k", text: "🌎" }), el("div", { html: "<b>Where you'll see this:</b> " + inlineMath(kp.realWorld) })]));
    }

    // cross-subject connections — the same idea, in another subject
    if (kp.crossSubject && kp.crossSubject.length) {
      var cp = el("div", { class: "panel crosslink-panel" });
      cp.appendChild(el("div", { class: "eyebrow", text: "🔗 This connects to other subjects" }));
      kp.crossSubject.forEach(function (c) {
        cp.appendChild(el("a", { class: "crosslink " + (TCLASS[c.subject] || ""), href: "#/kp/" + c.id }, [
          el("span", { class: "cl-badge", text: c.subjectName }),
          el("div", { style: "flex:1" }, [
            el("div", { class: "cl-note", html: inlineMath(c.note) }),
            el("div", { class: "cl-title", text: "→ " + c.title + " (Grade " + c.grade + ")" })
          ])
        ]));
      });
      root.appendChild(cp);
    }

    // exercises
    if (kp.exercises && kp.exercises.length) {
      var xp = el("div", { class: "panel" });
      xp.appendChild(el("div", { class: "eyebrow", text: "Practice" }));
      xp.appendChild(el("p", { style: "color:var(--ink-soft);margin-top:0", text: "Try each one, then check your answer." }));
      kp.exercises.forEach(function (q) { xp.appendChild(renderExercise(q, kpId)); });
      root.appendChild(xp);
    }

    // more practice — extra drill, collapsed by default
    if (kp.morePractice && kp.morePractice.length) {
      var mp = el("details", { class: "panel morepractice" });
      mp.appendChild(el("summary", {}, [
        el("span", { class: "dd-badge", text: "💪 More practice" }),
        el("span", { class: "dd-hint", text: kp.morePractice.length + " extra problems · tap to open" })
      ]));
      var opened = false;
      mp.addEventListener("toggle", function () {
        if (mp.open && !opened) { opened = true; kp.morePractice.forEach(function (q) { mp.appendChild(renderExercise(q, kpId)); }); }
      });
      root.appendChild(mp);
    }

    // complete + next
    var kps = kpState(kpId);
    var doneBtn = el("button", { class: "btn good wide", html: kps.done ? "✓ Idea completed — mark not done" : "Mark this idea complete ✓",
      onclick: function () {
        markKP(kpId, !kps.done);
        if (kps.done) confetti();
        render();
      } });
    var nav = el("div", { class: "panel" }, doneBtn);
    // next KP link
    var idx = (u.knowledgePoints || []).indexOf(kpId);
    var row = el("div", { class: "btn-row", style: "margin-top:12px" });
    if (idx > 0) row.appendChild(el("a", { class: "btn ghost", href: "#/kp/" + u.knowledgePoints[idx - 1], text: "← Previous" }));
    if (idx > -1 && idx < u.knowledgePoints.length - 1) row.appendChild(el("a", { class: "btn", href: "#/kp/" + u.knowledgePoints[idx + 1], text: "Next idea →" }));
    else row.appendChild(el("a", { class: "btn", href: "#/unit/" + kp.unitId, text: "Back to unit ↩" }));
    nav.appendChild(row);
    root.appendChild(nav);
    root.appendChild(footer());
    mount(root);
  }

  /* ---------- exercise renderer (shared by KP & quiz) --------------------*/
  function renderExercise(q, kpId, opts) {
    opts = opts || {};
    var wrap = el("div", { class: "exercise" });
    wrap.appendChild(el("div", { class: "qhead" }, [
      el("div", { class: "prompt", html: inlineMath(q.prompt) }),
      q.difficulty ? el("span", { class: "diff " + q.difficulty, text: q.difficulty }) : null
    ]));
    var feedback = el("div", { class: "feedback" });
    var answered = false;

    function done(ok, msg) {
      if (answered && !opts.quiz) return;
      answered = true;
      feedback.className = "feedback show " + (ok ? "ok" : "no");
      feedback.innerHTML = (ok ? "✅ <b>Correct!</b> " : "❌ <b>Not quite.</b> ") +
        (q.explanation ? '<div class="explain">' + inlineMath(q.explanation) + "</div>" : "");
      if (kpId) recordEx(kpId, q.id, ok);
      if (ok && !opts.quiz) confetti();
      if (opts.onDone) opts.onDone(ok);
    }

    if (q.type === "multiple-choice") {
      var choices = el("div", { class: "choices" });
      (q.choices || []).forEach(function (c, i) {
        var ch = el("div", { class: "choice", html: '<span class="mark">' + String.fromCharCode(65 + i) + "</span><span>" + inlineMath(c) + "</span>" });
        ch.addEventListener("click", function () {
          if (answered) return;
          choices.querySelectorAll(".choice").forEach(function (x) { x.classList.add("disabled"); });
          var ok = i === q.answerIndex;
          ch.classList.add(ok ? "correct" : "wrong");
          if (!ok) { var right = choices.children[q.answerIndex]; if (right) right.classList.add("correct"); }
          done(ok);
        });
        choices.appendChild(ch);
      });
      wrap.appendChild(choices);
    } else if (q.type === "numeric") {
      var inp = el("input", { class: "answer-input", type: "text", inputmode: "decimal", placeholder: "Type a number" + (q.unit ? " (" + q.unit + ")" : "") });
      var btn = el("button", { class: "btn", text: "Check", onclick: function () {
        if (answered) return;
        var val = parseFloat(String(inp.value).replace(/[^0-9.\-]/g, ""));
        var tol = q.tolerance || 0;
        var ok = !isNaN(val) && Math.abs(val - q.answer) <= tol + 1e-9;
        inp.style.borderColor = ok ? "var(--good)" : "var(--bad)";
        if (!ok) feedbackAnswer();
        done(ok);
      } });
      function feedbackAnswer() { /* reveal answer text within explanation */ q.explanation = q.explanation || ("The answer is " + q.answer + (q.unit ? " " + q.unit : "") + "."); }
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") btn.click(); });
      wrap.appendChild(el("div", { class: "btn-row" }, [inp, btn]));
    } else { // short-answer
      var ta = el("textarea", { class: "answer-input", placeholder: "Write your answer…" });
      var revealed = false;
      var sbtn = el("button", { class: "btn ghost", text: "Show a sample answer", onclick: function () {
        revealed = true;
        feedback.className = "feedback show ok";
        feedback.innerHTML = "💬 <b>Sample answer:</b> <div class='explain'>" + inlineMath(q.sampleAnswer || q.explanation || "") + "</div>";
        if (kpId) recordEx(kpId, q.id, true);
        if (opts.onDone) opts.onDone(true);
      } });
      wrap.appendChild(ta);
      wrap.appendChild(el("div", { class: "btn-row" }, sbtn));
    }
    wrap.appendChild(feedback);
    return wrap;
  }

  /* ========================================================================
     Shared assessment runner (unit quizzes AND cumulative final exams)
     ====================================================================== */
  function runAssessment(cfg) {
    var qs = cfg.questions || [];
    var i = 0, correct = 0, startMs = 0, timerEl = null, timerInt = null, missed = {};
    function fmtT(ms) { var s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
    function stopTimer() { if (timerInt) { clearInterval(timerInt); timerInt = null; } }
    var root = el("div", { class: cfg.subjectClass || "" });
    root.appendChild(crumbs(cfg.crumbs));
    var stage = el("div", { class: "panel" });
    var hero = el("div", { class: "hero" }, [
      el("h1", { text: cfg.titleEmoji + " " + cfg.title }),
      cfg.blurb ? el("p", { text: cfg.blurb }) : null
    ]);
    if (cfg.timed) { timerEl = el("div", { class: "exam-timer", text: "⏱ 0:00" }); hero.appendChild(timerEl); }
    root.appendChild(hero);
    root.appendChild(stage);
    var extraHost = el("div");
    root.appendChild(extraHost);
    root.appendChild(footer());
    mount(root);

    function startTimer() {
      if (!cfg.timed || timerInt) return;
      startMs = Date.now();
      timerInt = setInterval(function () { if (timerEl) timerEl.textContent = "⏱ " + fmtT(Date.now() - startMs); }, 1000);
    }

    function renderQuestion() {
      startTimer();
      clear(stage);
      var prog = el("div", { class: "quiz-progress" });
      qs.forEach(function (_, k) { prog.appendChild(el("i", { class: k < i ? "done" : (k === i ? "current" : "") })); });
      stage.appendChild(prog);
      var q = qs[i];
      stage.appendChild(el("div", { class: "pill-count", text: "Question " + (i + 1) + " of " + qs.length + (q.fromUnit ? "  ·  " + q.fromUnit : "") }));
      var last = i === qs.length - 1;
      var nextBtn = el("button", { class: "btn wide", text: last ? "Finish" : "Next question →", disabled: "true", style: "margin-top:14px" });
      stage.appendChild(renderExercise(q, null, { quiz: true, onDone: function (ok) {
        if (ok) correct++;
        else if (q._kpId) missed[q._kpId] = true;
        if (q._kpId && q._qid) recordEx(q._kpId, q._qid, ok);   // feed concept mastery
        nextBtn.removeAttribute("disabled");
      } }));
      nextBtn.addEventListener("click", function () {
        if (!last) { i++; renderQuestion(); window.scrollTo(0, 0); } else finish();
      });
      stage.appendChild(nextBtn);
    }
    function finish() {
      stopTimer();
      var elapsed = cfg.timed && startMs ? Date.now() - startMs : 0;
      var pct = Math.round(correct / qs.length * 100);
      var pass = pct >= (cfg.passingScore || 70);
      var missedIds = Object.keys(missed);
      if (missedIds.length) { P.needsReview = P.needsReview || {}; missedIds.forEach(function (id) { P.needsReview[id] = true; }); save(); }
      if (cfg.onFinish) cfg.onFinish(pct, pass, elapsed);
      if (pass) confetti();
      clear(stage);
      stage.className = "panel result-card";
      stage.appendChild(el("div", { class: "result-emoji", text: pass ? "🎉" : "💪" }));
      stage.appendChild(el("div", { class: "result-score", style: "color:" + (pass ? "var(--good)" : "var(--warn)"), text: pct + "%" }));
      stage.appendChild(el("h2", { text: pass ? "You passed!" : "Keep going — try again!" }));
      stage.appendChild(el("p", { style: "color:var(--ink-soft)", text: "You got " + correct + " of " + qs.length + " correct." + (elapsed ? " Time: " + fmtT(elapsed) + "." : "") + " " + (pass ? cfg.passMsg : "Review the ideas and give it another shot — you've got this.") }));
      stage.appendChild(el("div", { class: "btn-row", style: "justify-content:center" }, [
        el("button", { class: "btn", text: "Try again ↻", onclick: function () { i = 0; correct = 0; startMs = 0; missed = {}; clear(extraHost); if (timerEl) timerEl.textContent = "⏱ 0:00"; stage.className = "panel"; renderQuestion(); } }),
        el("a", { class: "btn ghost", href: cfg.backHref, text: cfg.backLabel })
      ]));
      clear(extraHost);
      if (cfg.resultExtra) { var extra = cfg.resultExtra(Object.keys(missed), pct); if (extra) extraHost.appendChild(extra); }
    }
    renderQuestion();
  }

  function viewQuiz(unitId) {
    var quiz = KM.quizzes[unitId], u = KM.units[unitId];
    if (!quiz || !u) return notFound();
    var s = subjectByKey(u.subject);
    runAssessment({
      subjectClass: TCLASS[u.subject] || "", titleEmoji: "🎯", title: quiz.title,
      questions: quiz.questions || [], passingScore: quiz.passingScore || 70,
      passMsg: "You've mastered this unit's quiz.",
      crumbs: [{ label: "Home", href: "#/" }, { label: s.name + " · G" + u.grade, href: "#/subject/" + u.subject + "/" + u.grade },
        { label: "Unit " + u.order, href: "#/unit/" + unitId }, { label: "Quiz" }],
      backHref: "#/unit/" + unitId, backLabel: "Back to unit",
      onFinish: function (pct, pass) { var st = quizState(unitId); st.attempts++; st.best = Math.max(st.best, pct); if (pass) st.passed = true; save(); }
    });
  }

  function viewFinal(subjKey, grade) {
    var exam = KM.finalExams[subjKey + "-g" + grade];
    var s = subjectByKey(subjKey);
    if (!exam || !s) return notFound();
    runAssessment({
      subjectClass: TCLASS[subjKey] || "", titleEmoji: "🏆", title: exam.title, blurb: exam.blurb,
      questions: exam.questions || [], passingScore: exam.passingScore || 70,
      passMsg: "Outstanding — you've got a strong handle on the whole course!",
      crumbs: [{ label: "Home", href: "#/" }, { label: s.name + " · G" + grade, href: "#/subject/" + subjKey + "/" + grade },
        { label: "Final Exam" }],
      backHref: "#/subject/" + subjKey + "/" + grade, backLabel: "Back to " + s.name,
      onFinish: function (pct, pass) { P.finals = P.finals || {}; var k = subjKey + "-g" + grade;
        P.finals[k] = { best: Math.max((P.finals[k] || {}).best || 0, pct), passed: ((P.finals[k] || {}).passed) || pass }; save(); }
    });
  }

  function shuffle(a) { a = a.slice(); for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)); var t = a[j]; a[j] = a[k]; a[k] = t; } return a; }

  // Renders a prerequisite-traced review plan for a set of struggled-with concepts.
  function renderReviewPlan(weakIds, opts) {
    opts = opts || {};
    var plan = reviewPlan(weakIds);
    if (!plan.length) return null;
    var panel = el("div", { class: "panel reviewplan" });
    panel.appendChild(el("div", { class: "eyebrow", text: opts.title || "📋 Your review plan" }));
    panel.appendChild(el("p", { style: "color:var(--ink-soft);margin-top:0", text: opts.intro || "Based on what you missed, here's the smartest order to review — the map traces each shaky idea back to the foundation it stands on, so you fix the root cause first." }));
    var list = el("div", { class: "plan-list" });
    plan.forEach(function (p, idx) {
      var kp = p.kp, subj = subjectByKey(kp.subject);
      list.appendChild(el("a", { class: "plan-item " + (TCLASS[kp.subject] || ""), href: "#/kp/" + kp.id }, [
        el("span", { class: "plan-num", text: (idx + 1) }),
        el("div", { style: "flex:1" }, [
          el("div", { class: "plan-title", text: kp.title }),
          el("div", { class: "plan-sub", text: subj.name + " · Grade " + kp.grade + (p.isGap ? " · a prerequisite this builds on" : "") })
        ]),
        p.isGap ? el("span", { class: "plan-tag gap", text: "fix first" }) : el("span", { class: "plan-tag", text: "review" })
      ]));
    });
    panel.appendChild(list);
    return panel;
  }

  function viewPracticeTest(unitId) {
    var u = KM.units[unitId];
    if (!u) return notFound();
    var s = subjectByKey(u.subject);
    // pool: every auto-checkable question from the unit's concepts + quiz
    var pool = [];
    (u.knowledgePoints || []).forEach(function (id) {
      var kp = KM.kps[id]; if (!kp) return;
      (kp.exercises || []).concat(kp.morePractice || []).forEach(function (q, n) {
        pool.push(Object.assign({}, q, { id: id + "-" + (q.id || n), _kpId: id, _qid: q.id || ("x" + n), fromUnit: kp.title }));
      });
    });
    var quiz = KM.quizzes[unitId];
    if (quiz) (quiz.questions || []).forEach(function (q, n) { pool.push(Object.assign({}, q, { id: "quiz-" + (q.id || n), fromUnit: "Quiz review" })); });
    var questions = shuffle(pool).slice(0, Math.min(20, pool.length));
    if (!questions.length) return notFound();
    runAssessment({
      subjectClass: TCLASS[u.subject] || "", timed: true, titleEmoji: "📝", title: "Practice Test · " + u.title,
      blurb: questions.length + " mixed questions drawn from this whole unit, in a fresh random order — timed, just like the real thing.",
      questions: questions, passingScore: 70,
      passMsg: "Test-ready! You handled a full mixed set under the clock.",
      crumbs: [{ label: "Home", href: "#/" }, { label: s.name + " · G" + u.grade, href: "#/subject/" + u.subject + "/" + u.grade },
        { label: "Unit " + u.order, href: "#/unit/" + unitId }, { label: "Practice Test" }],
      backHref: "#/unit/" + unitId, backLabel: "Back to unit",
      onFinish: function (pct, pass, ms) {
        P.tests = P.tests || {}; var prev = P.tests[unitId] || {};
        P.tests[unitId] = { best: Math.max(prev.best || 0, pct), attempts: (prev.attempts || 0) + 1 }; save();
      },
      resultExtra: function (missedKpIds) {
        if (!missedKpIds.length) return el("div", { class: "panel reviewplan" }, [el("div", { class: "eyebrow", text: "✅ No gaps found" }), el("p", { style: "margin:0;color:var(--ink-soft)", text: "You didn't miss anything traceable to a weak spot — solid work. Try another unit's test." })]);
        return renderReviewPlan(missedKpIds, { title: "📋 Your personal review plan", intro: "You slipped on the concepts below. The map traced each one back to the foundation it stands on, so tackle these in order — the 'fix first' items are the prerequisites underneath your gaps." });
      }
    });
  }

  /* ========================================================================
     VIEW: PROBLEM SET
     ====================================================================== */
  function viewProblemSet(unitId) {
    var ps = KM.problemSets[unitId];
    var u = KM.units[unitId];
    if (!ps || !u) return notFound();
    var s = subjectByKey(u.subject);
    var root = el("div", { class: TCLASS[u.subject] || "" });
    root.appendChild(crumbs([
      { label: "Home", href: "#/" },
      { label: s.name + " · G" + u.grade, href: "#/subject/" + u.subject + "/" + u.grade },
      { label: "Unit " + u.order, href: "#/unit/" + unitId },
      { label: "Problem set" }
    ]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: "📝 " + ps.title }),
      ps.intro ? el("p", { text: ps.intro }) : null
    ]));

    var revealAll = el("button", { class: "btn ghost", text: "Show all solutions", onclick: function () {
      panel.querySelectorAll(".p-solution").forEach(function (x) { x.classList.add("show"); });
    } });
    root.appendChild(el("div", { class: "btn-row", style: "margin-bottom:14px" }, revealAll));

    var panel = el("div", { class: "panel" });
    (ps.problems || []).forEach(function (p, i) {
      var pr = el("div", { class: "problem" });
      pr.appendChild(el("div", { class: "qhead" }, [
        el("div", { class: "p-prompt", html: "<b>" + (i + 1) + ".</b> " + inlineMath(p.prompt) }),
        p.difficulty ? el("span", { class: "diff " + p.difficulty, text: p.difficulty }) : null
      ]));
      var sol = el("div", { class: "p-solution" }, [
        el("div", { class: "a", html: "Answer: " + inlineMath(String(p.answer)) }),
        p.solution ? el("div", { style: "margin-top:6px;color:var(--ink-soft)", html: inlineMath(p.solution) }) : null,
        p.standard ? el("div", { style: "margin-top:6px" }, el("span", { class: "chip std", text: p.standard })) : null
      ]);
      pr.appendChild(el("button", { class: "btn ghost", style: "margin-top:8px", text: "Show solution", onclick: function () { sol.classList.toggle("show"); } }));
      pr.appendChild(sol);
      panel.appendChild(pr);
    });
    root.appendChild(panel);
    root.appendChild(footer());
    mount(root);
  }

  /* ========================================================================
     VIEW: PRINT (whole unit — explanations, examples, exercises + answer key,
     and the problem set with worked solutions) for paper / PDF.
     ====================================================================== */
  function viewPrint(unitId) {
    var u = KM.units[unitId];
    if (!u) return notFound();
    var s = subjectByKey(u.subject);
    var root = el("div", { class: "printdoc " + (TCLASS[u.subject] || "") });

    // screen-only toolbar
    root.appendChild(el("div", { class: "print-toolbar" }, [
      el("a", { class: "btn ghost", href: "#/unit/" + unitId, text: "← Back" }),
      el("button", { class: "btn", text: "🖨️ Print / Save as PDF", onclick: function () { window.print(); } }),
      el("span", { class: "pill-count", text: "Tip: choose “Save as PDF” in the print dialog to keep a copy." })
    ]));

    // title block
    root.appendChild(el("div", { class: "print-head" }, [
      el("div", { class: "eyebrow", text: s.name + " · Grade " + u.grade + " · Unit " + u.order }),
      el("h1", { text: u.title }),
      el("p", { text: u.description || "" }),
      u.essentialQuestion ? el("p", { html: "<b>Essential question:</b> " + esc(u.essentialQuestion) }) : null,
      (u.standardsFocus && u.standardsFocus.length) ? el("p", { class: "pill-count", text: "Standards: " + u.standardsFocus.join(", ") }) : null
    ]));

    // each knowledge point, fully expanded
    u.knowledgePoints.forEach(function (id, i) {
      var kp = KM.kps[id]; if (!kp) return;
      var sec = el("section", { class: "print-kp" });
      sec.appendChild(el("h2", { text: (i + 1) + ". " + kp.title + (kp.standard && kp.standard.code ? "  (" + kp.standard.code + ")" : "") }));
      if (kp.objectives && kp.objectives.length)
        sec.appendChild(el("ul", { class: "objectives" }, kp.objectives.map(function (o) { return el("li", { text: o }); })));
      (Array.isArray(kp.explanation) ? kp.explanation : [kp.explanation || ""]).forEach(function (p) {
        sec.appendChild(el("p", { html: inlineMath(p) }));
      });
      if (kp.keyIdea) sec.appendChild(el("p", { html: "<b>🔑 Key idea:</b> " + inlineMath(kp.keyIdea) }));
      (kp.formulas || []).forEach(function (f) {
        sec.appendChild(el("div", { class: "formula-card" }, [
          f.name ? el("div", { class: "fc-name", text: f.name }) : null,
          el("div", { class: "fc-eq", html: inlineMath(f.formula) }),
          f.where ? el("div", { class: "fc-where", html: "where " + inlineMath(f.where) }) : null
        ]));
      });
      (kp.deepDive || []).forEach(function (d) {
        sec.appendChild(el("p", { html: "<b>" + inlineMath(d.heading || "") + ":</b> " + inlineMath(Array.isArray(d.body) ? d.body.join(" ") : (d.body || "")) }));
      });
      if (kp.visual && (kp.visual.alt || kp.visual.caption))
        sec.appendChild(el("p", { class: "print-figure", html: "🖼️ <i>" + esc(kp.visual.caption || kp.visual.alt) + "</i>" }));
      if (kp.vocabulary && kp.vocabulary.length) {
        sec.appendChild(el("p", { html: "<b>Words to know:</b>" }));
        sec.appendChild(el("ul", {}, kp.vocabulary.map(function (v) { return el("li", { html: "<b>" + esc(v.term) + "</b> — " + inlineMath(v.definition) }); })));
      }
      (kp.workedExamples || []).forEach(function (w) {
        sec.appendChild(el("p", { html: "<b>Example:</b> " + inlineMath(w.problem) }));
        if (w.steps) sec.appendChild(el("ol", {}, w.steps.map(function (st) { return el("li", { html: inlineMath(st) }); })));
        if (w.answer != null) sec.appendChild(el("p", { html: "<b>Answer:</b> " + inlineMath(String(w.answer)) }));
      });
      // exercises + extra practice, with answer key
      var allPractice = (kp.exercises || []).concat(kp.morePractice || []);
      if (allPractice.length) {
        sec.appendChild(el("p", { html: "<b>Practice</b> (answers below each):" }));
        sec.appendChild(el("ol", { class: "print-ex" }, allPractice.map(function (q) {
          var li = el("li", {}, [el("div", { html: inlineMath(q.prompt) })]);
          if (q.type === "multiple-choice") li.appendChild(el("ol", { class: "print-choices" }, (q.choices || []).map(function (c) { return el("li", { html: inlineMath(c) }); })));
          var ans = q.type === "multiple-choice" ? String.fromCharCode(65 + q.answerIndex) + ") " + inlineMath(q.choices[q.answerIndex])
            : q.type === "numeric" ? inlineMath(String(q.answer)) + (q.unit ? " " + q.unit : "") : inlineMath(q.sampleAnswer || "");
          li.appendChild(el("div", { class: "print-answer", html: "<b>Answer:</b> " + ans + (q.explanation ? " — " + inlineMath(q.explanation) : "") }));
          return li;
        })));
      }
      root.appendChild(sec);
    });

    // problem set with worked solutions
    var ps = KM.problemSets[unitId];
    if (ps && ps.problems) {
      var pssec = el("section", { class: "print-kp print-ps" });
      pssec.appendChild(el("h2", { text: "★ " + (ps.title || "Review Problem Set") }));
      if (ps.intro) pssec.appendChild(el("p", { text: ps.intro }));
      pssec.appendChild(el("ol", { class: "print-ex" }, ps.problems.map(function (p) {
        return el("li", {}, [
          el("div", { html: inlineMath(p.prompt) }),
          el("div", { class: "print-answer", html: "<b>Answer:</b> " + inlineMath(String(p.answer)) + (p.solution ? "<br><b>Solution:</b> " + inlineMath(p.solution) : "") })
        ]);
      })));
      root.appendChild(pssec);
    }

    // unit summary recap
    var psum = u.summary;
    if (psum && (psum.takeaways.length || psum.formulas.length || psum.vocabulary.length)) {
      var ssec = el("section", { class: "print-kp print-summary" });
      ssec.appendChild(el("h2", { text: "📋 Unit Summary" }));
      if (psum.takeaways.length) {
        ssec.appendChild(el("p", { html: "<b>Key takeaways</b>" }));
        ssec.appendChild(el("ul", {}, psum.takeaways.map(function (t) { return el("li", { html: "<b>" + esc(t.title) + ":</b> " + inlineMath(t.keyIdea) }); })));
      }
      if (psum.formulas.length) {
        ssec.appendChild(el("p", { html: "<b>Formulas</b>" }));
        psum.formulas.forEach(function (f) { ssec.appendChild(el("div", { class: "formula-card" }, [f.name ? el("div", { class: "fc-name", text: f.name }) : null, el("div", { class: "fc-eq", html: inlineMath(f.formula) })])); });
      }
      root.appendChild(ssec);
    }

    root.appendChild(el("div", { class: "print-foot", text: "Knowledge Map · " + s.name + " Grade " + u.grade + " · Unit " + u.order + ": " + u.title }));
    mount(root);
  }

  /* ========================================================================
     VIEW: KNOWLEDGE MAP — the interactive concept graph (our signature view)
     ====================================================================== */
  var SVGNS_ = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) { var e = document.createElementNS(SVGNS_, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  var SUBJ_COLOR = { math: "#4f6ef7", science: "#17b890", ela: "#9b5de5", "social-studies": "#f4813f" };

  function subjectConceptStats(sKey) {
    var s = subjectByKey(sKey), total = 0, dn = 0, ready = 0;
    ["7", "8", "9"].forEach(function (g) {
      (s.grades[g] || []).forEach(function (uid) {
        ((KM.units[uid] || {}).knowledgePoints || []).forEach(function (id) {
          total++; var kp = KM.kps[id];
          if (P.kps && P.kps[id] && P.kps[id].done) dn++;
          else if (kp && (!(kp.related || []).length || (kp.related).every(function (r) { return P.kps && P.kps[r.id] && P.kps[r.id].done; }))) ready++;
        });
      });
    });
    return { total: total, done: dn, ready: ready };
  }

  function viewMapPicker() {
    var root = el("div");
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Knowledge Map" }]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { html: "🗺️ The Knowledge Map" }),
      el("p", { text: "This is what makes us different: not a list of topics, but a map of how every idea connects. Each dot is a concept; the lines show which ideas build on which. Filled dots are done; a glowing ring means its prerequisites are met and you're ready to learn it next. Pick a subject to explore." })
    ]));
    var grid = el("div", { class: "grid subjects" });
    KM.subjects.forEach(function (s) {
      var st = subjectConceptStats(s.key);
      var card = el("div", { class: "card subject-card " + (TCLASS[s.key] || ""), onclick: function () { location.hash = "#/map/" + s.key; } });
      card.appendChild(el("div", { class: "accent-bar" }));
      card.appendChild(el("div", { class: "emoji", text: s.emoji }));
      card.appendChild(el("h3", { text: s.name + " map" }));
      card.appendChild(el("div", { class: "meta" }, [
        el("span", { class: "chip", text: st.total + " concepts" }),
        st.ready ? el("span", { class: "chip accent", text: st.ready + " ready now" }) : null
      ]));
      card.appendChild(progressRow(st.total ? Math.round(st.done / st.total * 100) : 0, st.done + "/" + st.total));
      grid.appendChild(card);
    });
    root.appendChild(grid);
    // cross-subject connections entry
    root.appendChild(el("div", { class: "map-banner", style: "background:linear-gradient(120deg,#17b890,#4f6ef7 60%,#9b5de5)", onclick: function () { location.hash = "#/map/connections"; } }, [
      el("div", { class: "mb-emoji", text: "🔗" }),
      el("div", { class: "mb-body" }, [
        el("div", { class: "mb-title", text: "See how the subjects connect" }),
        el("div", { class: "mb-sub", text: "The web of ideas that cross between math, science, ELA and history." })
      ]),
      el("div", { class: "mb-go", text: "Open →" })
    ]));
    root.appendChild(footer());
    mount(root);
  }

  function viewMap(subjKey) {
    if (!subjKey) return viewMapPicker();
    var s = subjectByKey(subjKey);
    if (!s) return notFound();
    var color = SUBJ_COLOR[subjKey] || "#4f6ef7";
    function done(id) { return !!(P.kps && P.kps[id] && P.kps[id].done); }
    function ready(kp) { if (done(kp.id)) return false; var rel = kp.related || []; return !rel.length || rel.every(function (r) { return done(r.id); }); }

    // columns = units in learning order (grade 7 → 9)
    var cols = [];
    ["7", "8", "9"].forEach(function (g) {
      (s.grades[g] || []).forEach(function (uid) {
        var u = KM.units[uid];
        cols.push({ uid: uid, unit: u, grade: g, kps: (u.knowledgePoints || []).map(function (id) { return KM.kps[id]; }).filter(Boolean) });
      });
    });
    var colGap = 98, rowGap = 56, nodeR = 16, topBand = 74, pad = 34;
    var maxRows = cols.reduce(function (m, c) { return Math.max(m, c.kps.length); }, 1);
    var W = pad * 2 + cols.length * colGap, H = topBand + maxRows * rowGap + 30;
    var pos = {};
    cols.forEach(function (c, ci) {
      c.cx = pad + ci * colGap + colGap / 2;
      c.kps.forEach(function (kp, ri) { pos[kp.id] = { x: c.cx, y: topBand + ri * rowGap + rowGap / 2, kp: kp, unit: c.unit }; });
    });

    var st = subjectConceptStats(subjKey);
    var root = el("div", { class: TCLASS[subjKey] || "" });
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Knowledge Map", href: "#/map" }, { label: s.name }]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: s.emoji + " " + s.name + " — Knowledge Map" }),
      el("p", { html: "<b>" + st.done + "</b> of <b>" + st.total + "</b> concepts complete" + (st.ready ? " · <b>" + st.ready + "</b> ready to learn now (glowing)" : "") + ". Tap any dot to see it and what it builds on." })
    ]));

    // info panel (updates on select)
    var info = el("div", { class: "map-info" });
    info.innerHTML = "<span class='map-info-hint'>Tap a concept dot to explore it.</span>";
    root.appendChild(info);

    // scrollable svg
    var scroller = el("div", { class: "map-scroller" });
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, class: "map-svg", width: W, height: H });
    scroller.appendChild(svg);
    root.appendChild(scroller);

    // grade bands
    var gStart = {}, gEnd = {};
    cols.forEach(function (c, ci) { if (gStart[c.grade] == null) gStart[c.grade] = ci; gEnd[c.grade] = ci; });
    ["7", "8", "9"].forEach(function (g, gi) {
      if (gStart[g] == null) return;
      var x0 = pad + gStart[g] * colGap, x1 = pad + (gEnd[g] + 1) * colGap;
      svg.appendChild(svgEl("rect", { x: x0, y: 40, width: x1 - x0, height: H - 46, rx: 12, fill: gi % 2 ? "var(--surface-2)" : "transparent", opacity: 0.6 }));
      var gl = svgEl("text", { x: (x0 + x1) / 2, y: 24, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "var(--ink-faint)" }); gl.textContent = "Grade " + g; svg.appendChild(gl);
    });
    // unit headers
    cols.forEach(function (c) {
      var t = svgEl("text", { x: c.cx, y: 58, "text-anchor": "middle", "font-size": 15 }); t.textContent = c.unit.emoji || "📘"; svg.appendChild(t);
    });

    // edges (prerequisite → concept)
    var edgeEls = [];
    cols.forEach(function (c) {
      c.kps.forEach(function (kp) {
        (kp.related || []).forEach(function (r) {
          var a = pos[r.id], b = pos[kp.id];
          if (!a || !b) return;
          var dx = (b.x - a.x) / 2;
          var path = svgEl("path", { d: "M" + a.x + " " + a.y + " C" + (a.x + dx) + " " + a.y + "," + (b.x - dx) + " " + b.y + "," + b.x + " " + b.y,
            fill: "none", stroke: "var(--line)", "stroke-width": 1.5, opacity: 0.7 });
          path._from = r.id; path._to = kp.id; svg.appendChild(path); edgeEls.push(path);
        });
      });
    });

    // nodes
    var nodeEls = {};
    function select(kp) {
      // reset
      Object.keys(nodeEls).forEach(function (id) { nodeEls[id].ring.setAttribute("stroke-width", nodeEls[id].baseSW); nodeEls[id].ring.setAttribute("stroke", nodeEls[id].baseStroke); });
      edgeEls.forEach(function (e) { e.setAttribute("stroke", "var(--line)"); e.setAttribute("stroke-width", 1.5); e.setAttribute("opacity", 0.5); });
      var n = nodeEls[kp.id]; if (n) { n.ring.setAttribute("stroke", color); n.ring.setAttribute("stroke-width", 4); }
      // highlight prereq edges + prereq nodes
      (kp.related || []).forEach(function (r) {
        edgeEls.forEach(function (e) { if (e._to === kp.id && e._from === r.id) { e.setAttribute("stroke", color); e.setAttribute("stroke-width", 3); e.setAttribute("opacity", 1); } });
        var pn = nodeEls[r.id]; if (pn) pn.ring.setAttribute("stroke", color);
      });
      var u = pos[kp.id].unit;
      var rel = (kp.related || []);
      info.innerHTML = "";
      var left = el("div", {}, [
        el("div", { class: "mi-title", text: kp.title }),
        el("div", { class: "mi-sub", text: (s.name) + " · Grade " + kp.grade + " · " + u.title + (done(kp.id) ? " · ✓ done" : ready(kp) ? " · ⭐ ready now" : "") }),
        rel.length ? el("div", { class: "mi-pre", html: "Builds on: " + rel.map(function (r) { return "<a href='#/kp/" + r.id + "'>" + esc(r.title) + "</a>"; }).join(", ") }) : el("div", { class: "mi-pre", text: "A starting-point concept — no prerequisites." })
      ]);
      info.appendChild(left);
      info.appendChild(el("a", { class: "btn", href: "#/kp/" + kp.id, text: "Open idea →" }));
    }
    cols.forEach(function (c) {
      c.kps.forEach(function (kp, ri) {
        var p = pos[kp.id], stt = conceptState(kp);
        var isDone = stt === "mastered", isShaky = stt === "shaky", isReady = stt === "ready", isLocked = stt === "locked";
        var nodeColor = isShaky ? "var(--warn)" : color;
        var g = svgEl("g", { class: "map-node" + (isReady ? " ready" : ""), style: "cursor:pointer" });
        var ring = svgEl("circle", { cx: p.x, cy: p.y, r: nodeR, fill: isDone ? color : (isShaky ? "var(--warn)" : "var(--surface)"), stroke: nodeColor, "stroke-width": 2, opacity: isLocked ? 0.5 : 1 });
        if (isReady) g.appendChild(svgEl("circle", { cx: p.x, cy: p.y, r: nodeR + 5, fill: "none", stroke: color, "stroke-width": 2, class: "ready-pulse" }));
        g.appendChild(ring);
        var label = svgEl("text", { x: p.x, y: p.y + 4, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: (isDone || isShaky) ? "#fff" : nodeColor }); label.textContent = isDone ? "✓" : isShaky ? "!" : (ri + 1);
        g.appendChild(label);
        g.addEventListener("click", function () { select(kp); });
        svg.appendChild(g);
        nodeEls[kp.id] = { ring: ring, baseSW: 2, baseStroke: nodeColor };
      });
    });

    root.appendChild(el("div", { class: "map-legend" }, [
      legendDot(color, true, "Completed"), legendDot(color, false, "Not yet"),
      el("span", { class: "map-legend-item" }, [el("span", { class: "legend-ready" }), document.createTextNode("Ready now")]),
      el("span", { class: "map-legend-item" }, [(function () { var d = el("span", { class: "legend-dot" }); d.style.background = "var(--warn)"; d.style.borderColor = "var(--warn)"; return d; })(), document.createTextNode("Needs review")]),
      el("span", { class: "map-legend-item", text: "→ lines = prerequisites" })
    ]));
    root.appendChild(footer());
    mount(root);
  }
  function legendDot(color, filled, text) {
    var d = el("span", { class: "map-legend-item" });
    var dot = el("span", { class: "legend-dot" }); dot.style.background = filled ? color : "var(--surface)"; dot.style.borderColor = color;
    d.appendChild(dot); d.appendChild(document.createTextNode(text)); return d;
  }

  /* ---- Cross-subject connection map (dashed lines between subjects) -------*/
  function viewConnections() {
    // collect unique cross-subject edges + the concepts they touch
    var edges = {}, nodesBySubj = { math: [], science: [], ela: [], "social-studies": [] }, seen = {};
    for (var id in KM.kps) {
      (KM.kps[id].crossSubject || []).forEach(function (c) {
        var pair = [id, c.id].sort(), key = pair.join("|");
        if (!edges[key]) edges[key] = { a: pair[0], b: pair[1], note: c.note };
      });
    }
    Object.keys(edges).forEach(function (k) {
      [edges[k].a, edges[k].b].forEach(function (id) { if (!seen[id]) { seen[id] = true; var kp = KM.kps[id]; if (kp && nodesBySubj[kp.subject]) nodesBySubj[kp.subject].push(kp); } });
    });
    var order = ["math", "science", "ela", "social-studies"];
    var pillW = 184, colGap = 58, margin = 16, pillH = 34, rowGap = 46, topPad = 78;
    var W = margin * 2 + order.length * pillW + (order.length - 1) * colGap;
    var colX = order.map(function (_, ci) { return margin + ci * (pillW + colGap); });
    var pos = {};
    order.forEach(function (sk, ci) {
      nodesBySubj[sk].sort(function (a, b) { return rankOf(a) - rankOf(b); }).forEach(function (kp, ri) {
        pos[kp.id] = { x: colX[ci], cx: colX[ci] + pillW / 2, y: topPad + ri * rowGap, kp: kp, ci: ci };
      });
    });
    var maxRows = order.reduce(function (m, sk) { return Math.max(m, nodesBySubj[sk].length); }, 1);
    var H = topPad + maxRows * rowGap + 20;

    var root = el("div");
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Knowledge Map", href: "#/map" }, { label: "Cross-subject connections" }]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: "🔗 How the subjects connect" }),
      el("p", { text: "The big idea most study apps miss: knowledge isn't four separate subjects — it's one web. Each dashed line joins two ideas that are really the same idea. Tap any concept to light up its connections." })
    ]));
    var info = el("div", { class: "map-info" }); info.innerHTML = "<span class='map-info-hint'>Tap a concept to see how it connects across subjects.</span>";
    root.appendChild(info);
    var scroller = el("div", { class: "map-scroller" });
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, class: "map-svg", width: W, height: H });
    scroller.appendChild(svg); root.appendChild(scroller);

    // column headers
    order.forEach(function (sk, ci) {
      var s = subjectByKey(sk);
      var t = svgEl("text", { x: colX[ci] + pillW / 2, y: 30, "text-anchor": "middle", "font-size": 14, "font-weight": 800, fill: SUBJ_COLOR[sk] }); t.textContent = s.emoji + " " + s.name; svg.appendChild(t);
    });
    // dashed edges
    var edgeEls = [];
    Object.keys(edges).forEach(function (k) {
      var e = edges[k], a = pos[e.a], b = pos[e.b]; if (!a || !b) return;
      var x1 = a.ci < b.ci ? a.x + pillW : a.x, x2 = a.ci < b.ci ? b.x : b.x + pillW;
      var dx = (x2 - x1) / 2;
      var path = svgEl("path", { d: "M" + x1 + " " + a.y + " C" + (x1 + dx) + " " + a.y + "," + (x2 - dx) + " " + b.y + "," + x2 + " " + b.y, fill: "none", stroke: "var(--ink-faint)", "stroke-width": 1.5, "stroke-dasharray": "5 4", opacity: 0.45 });
      path._a = e.a; path._b = e.b; path._note = e.note; svg.appendChild(path); edgeEls.push(path);
    });
    // pills
    var pillEls = {};
    function selectC(kp) {
      edgeEls.forEach(function (p) { var on = p._a === kp.id || p._b === kp.id; p.setAttribute("stroke", on ? SUBJ_COLOR[kp.subject] : "var(--ink-faint)"); p.setAttribute("stroke-width", on ? 2.5 : 1.5); p.setAttribute("opacity", on ? 1 : 0.18); });
      Object.keys(pillEls).forEach(function (id) { pillEls[id].setAttribute("opacity", 1); });
      var conns = (kp.crossSubject || []);
      info.innerHTML = "";
      var head = el("div", {}, [el("div", { class: "mi-title", text: kp.title }), el("div", { class: "mi-sub", text: (subjectByKey(kp.subject) || {}).name + " · connects to " + conns.length + " idea" + (conns.length > 1 ? "s" : "") + " in other subjects" })]);
      info.appendChild(head);
      var links = el("div", { class: "mi-conn" });
      conns.forEach(function (c) { links.appendChild(el("a", { class: "mi-conn-item " + (TCLASS[c.subject] || ""), href: "#/kp/" + c.id }, [el("span", { class: "cl-badge", text: c.subjectName }), el("span", { html: inlineMath(c.note) })])); });
      info.appendChild(links);
      info.appendChild(el("a", { class: "btn", href: "#/kp/" + kp.id, text: "Open idea →" }));
    }
    order.forEach(function (sk) {
      nodesBySubj[sk].forEach(function (kp) {
        var p = pos[kp.id], col = SUBJ_COLOR[sk];
        var g = svgEl("g", { style: "cursor:pointer" });
        var rect = svgEl("rect", { x: p.x, y: p.y - pillH / 2, width: pillW, height: pillH, rx: 17, fill: "var(--surface)", stroke: col, "stroke-width": 2 });
        var title = kp.title.length > 26 ? kp.title.slice(0, 25) + "…" : kp.title;
        var tx = svgEl("text", { x: p.cx, y: p.y + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "var(--ink)" }); tx.textContent = title;
        g.appendChild(rect); g.appendChild(tx);
        g.addEventListener("click", function () { selectC(kp); });
        svg.appendChild(g); pillEls[kp.id] = rect;
      });
    });
    root.appendChild(el("div", { class: "map-legend", html: "Dashed lines = the same idea appearing in two different subjects. There are <b>" + Object.keys(edges).length + "</b> cross-subject connections in the map." }));
    root.appendChild(footer());
    mount(root);
  }

  /* ---- Grade-9 Regents prep ----------------------------------------------*/
  var REGENTS = {
    math: { name: "Algebra I", emoji: "📐", blurb: "The NY Algebra I Regents covers everything in Grade 9 math — equations, functions, systems, exponentials, polynomials, quadratics, and statistics." },
    science: { name: "Earth Science", emoji: "🌎", blurb: "The NY Earth Science (Physical Setting) Regents covers plate tectonics, rocks & minerals, weather & climate, astronomy, and Earth's history." }
  };
  function viewRegents(subjKey) {
    if (!subjKey) {
      var root = el("div");
      root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Regents Prep" }]));
      root.appendChild(el("div", { class: "hero" }, [
        el("h1", { text: "🎓 Grade 9 Regents Prep" }),
        el("p", { text: "New York's Regents exams are the real end-of-year tests. Take a full-length, timed practice exam that mixes questions from every unit — then get a personalized review plan for whatever you miss. (Passing is 65%.)" })
      ]));
      var grid = el("div", { class: "grid units" });
      ["math", "science"].forEach(function (sk) {
        var r = REGENTS[sk], s = subjectByKey(sk);
        var st = (P.regents || {})[sk] || {};
        grid.appendChild(el("div", { class: "card " + (TCLASS[sk] || ""), onclick: function () { location.hash = "#/regents/" + sk; } }, [
          el("div", { class: "accent-bar" }), el("div", { class: "emoji", text: r.emoji }),
          el("h3", { text: r.name + " Regents" }),
          el("p", { text: r.blurb }),
          el("span", { class: "chip accent", text: st.attempts ? "Best: " + st.best + "%" : "Full-length timed practice" })
        ]));
      });
      root.appendChild(grid);
      root.appendChild(el("div", { class: "panel", style: "margin-top:18px" }, [
        el("p", { style: "margin:0;color:var(--ink-soft)", html: "Grade 9 typically means the <b>Algebra I</b> and <b>Earth Science</b> Regents. English and Global History Regents come in later grades — those subjects' final exams are on each subject page." })
      ]));
      root.appendChild(footer());
      return mount(root);
    }
    var s = subjectByKey(subjKey), r = REGENTS[subjKey];
    if (!s || !r) return notFound();
    var pool = [];
    (s.grades["9"] || []).forEach(function (uid) {
      var u = KM.units[uid];
      (u.knowledgePoints || []).forEach(function (id) {
        var kp = KM.kps[id]; if (!kp) return;
        (kp.exercises || []).concat(kp.morePractice || []).forEach(function (q, n) { pool.push(Object.assign({}, q, { id: id + "-" + (q.id || n), _kpId: id, _qid: q.id || ("x" + n), fromUnit: kp.title })); });
      });
      var quiz = KM.quizzes[uid]; if (quiz) (quiz.questions || []).forEach(function (q, n) { pool.push(Object.assign({}, q, { id: "qz-" + uid + "-" + (q.id || n), fromUnit: u.title })); });
    });
    var questions = shuffle(pool).slice(0, Math.min(30, pool.length));
    if (!questions.length) return notFound();
    runAssessment({
      subjectClass: TCLASS[subjKey] || "", timed: true, titleEmoji: "🎓", title: r.name + " Regents — Practice Exam",
      blurb: questions.length + " questions across every Grade 9 " + s.name + " unit, timed. Passing is 65%.",
      questions: questions, passingScore: 65,
      passMsg: "That's a passing Regents score — you're on track for the real thing!",
      crumbs: [{ label: "Home", href: "#/" }, { label: "Regents Prep", href: "#/regents" }, { label: r.name }],
      backHref: "#/regents", backLabel: "Back to Regents Prep",
      onFinish: function (pct, pass) { P.regents = P.regents || {}; var prev = P.regents[subjKey] || {}; P.regents[subjKey] = { best: Math.max(prev.best || 0, pct), attempts: (prev.attempts || 0) + 1, passed: prev.passed || pass }; save(); },
      resultExtra: function (missed) { return missed.length ? renderReviewPlan(missed, { title: "📋 Your Regents review plan", intro: "These are the concepts to shore up before the real exam — foundations first." }) : el("div", { class: "panel reviewplan" }, [el("div", { class: "eyebrow", text: "✅ No weak spots found" }), el("p", { style: "margin:0;color:var(--ink-soft)", text: "Nothing traced back to a gap — you're looking Regents-ready." })]); }
    });
  }

  /* ---------- shared bits -------------------------------------------------*/
  function footer() {
    return el("div", { class: "footer" }, [
      el("div", { html: '<a href="../">↩ Part of <b>The Curious Family Library</b></a>' }),
      el("div", { style: "margin-top:6px", html: 'Knowledge Map · aligned to NYS Next Generation Learning Standards · <a href="gallery.html">🔬 Visual Library</a>' }),
      el("div", { style: "margin-top:4px", text: "Built for curious minds in grades 7–9" })
    ]);
  }
  function emptyBox(msg) { return el("div", { class: "empty" }, [el("div", { class: "big", text: "🌱" }), el("p", { text: msg })]); }
  function notFound() { mount(el("div", {}, [crumbs([{ label: "Home", href: "#/" }]), emptyBox("We couldn't find that page. Let's head home.")])); }
  function mount(node) { clear(view); view.appendChild(node); }

  // very light inline "math"/markdown: **bold**, *italic*, `code`, ^superscript^, and keep unicode math as-is
  function inlineMath(str) {
    var s = esc(str);
    s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<i>$2</i>");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\^([0-9n])/g, "<sup>$1</sup>");
    s = s.replace(/_\{?([0-9n]+)\}?/g, "<sub>$1</sub>");
    s = s.replace(/\n/g, "<br>");
    return s;
  }

  /* ---------- session (grade selection) ----------------------------------*/
  function sessionGet(k) { try { return sessionStorage.getItem("km-" + k); } catch (e) { return null; } }
  function sessionSet(k, v) { try { sessionStorage.setItem("km-" + k, v); } catch (e) {} }

  /* ---------- router ------------------------------------------------------*/
  function render() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    window.scrollTo(0, 0);
    if (!parts.length) return viewHome();
    switch (parts[0]) {
      case "subject": return viewSubject(parts[1], parts[2] || "7");
      case "unit": return viewUnit(parts[1]);
      case "kp": return viewKP(parts[1]);
      case "quiz": return viewQuiz(parts[1]);
      case "problemset": return viewProblemSet(parts[1]);
      case "final": return viewFinal(parts[1], parts[2] || "7");
      case "practicetest": return viewPracticeTest(parts[1]);
      case "print": return viewPrint(parts[1]);
      case "map": return parts[1] === "connections" ? viewConnections() : viewMap(parts[1]);
      case "regents": return viewRegents(parts[1]);
      default: return viewHome();
    }
  }
  window.addEventListener("hashchange", render);

  /* ---------- global search ----------------------------------------------*/
  (function () {
    var overlay = document.getElementById("searchOverlay");
    var input = document.getElementById("searchInput");
    var results = document.getElementById("searchResults");
    if (!overlay) return;
    var COLORS = { "math": "#4f6ef7", "science": "#17b890", "ela": "#9b5de5", "social-studies": "#f4813f" };
    var index = null;
    function buildIndex() {
      if (index) return index;
      index = [];
      for (var id in KM.kps) {
        var k = KM.kps[id], u = KM.units[k.unitId] || {};
        var terms = (k.vocabulary || []).map(function (v) { return v.term; }).join(" ");
        index.push({ type: "idea", id: id, title: k.title, sub: (subLabel(k.subject)) + " · G" + k.grade + " · " + (u.title || ""),
          subject: k.subject, hay: (k.title + " " + terms + " " + (k.standard && k.standard.code || "")).toLowerCase(), href: "#/kp/" + id });
      }
      for (var uid in KM.units) {
        var un = KM.units[uid];
        index.push({ type: "unit", id: uid, title: un.title, sub: subLabel(un.subject) + " · Grade " + un.grade,
          subject: un.subject, hay: (un.title + " " + (un.description || "")).toLowerCase(), href: "#/unit/" + uid });
      }
      return index;
    }
    function subLabel(k) { var s = subjectByKey(k); return s ? s.name : k; }
    var activeIdx = -1, shown = [];
    function run(q) {
      q = (q || "").trim().toLowerCase();
      clear(results); activeIdx = -1; shown = [];
      if (!q) { results.appendChild(el("div", { class: "search-empty", text: "Start typing to search every subject, unit and idea." })); return; }
      var idx = buildIndex();
      var matches = idx.filter(function (it) { return it.hay.indexOf(q) > -1; })
        .sort(function (a, b) { return a.title.toLowerCase().indexOf(q) - b.title.toLowerCase().indexOf(q); }).slice(0, 24);
      if (!matches.length) { results.appendChild(el("div", { class: "search-empty", text: "No matches. Try another word." })); return; }
      shown = matches;
      matches.forEach(function (m, i) {
        var row = el("div", { class: "sresult", onclick: function () { go(m); } }, [
          el("span", { class: "dot", style: "background:" + (COLORS[m.subject] || "#4f6ef7") }),
          el("div", {}, [el("div", { class: "st", text: m.title }), el("div", { class: "ss", text: m.sub })]),
          el("span", { class: "kind", text: m.type })
        ]);
        results.appendChild(row);
      });
    }
    function go(m) { close(); location.hash = m.href; }
    function open() { overlay.classList.add("open"); overlay.setAttribute("aria-hidden", "false"); input.value = ""; run(""); setTimeout(function () { input.focus(); }, 30); }
    function close() { overlay.classList.remove("open"); overlay.setAttribute("aria-hidden", "true"); }
    document.getElementById("searchBtn").addEventListener("click", open);
    input.addEventListener("input", function () { run(input.value); });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !/input|textarea|select/i.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); open(); }
      else if (e.key === "Escape") close();
      else if (overlay.classList.contains("open") && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        var rows = results.querySelectorAll(".sresult"); if (!rows.length) return;
        if (activeIdx > -1) rows[activeIdx].classList.remove("active");
        activeIdx = (activeIdx + (e.key === "ArrowDown" ? 1 : rows.length - 1)) % rows.length;
        rows[activeIdx].classList.add("active"); rows[activeIdx].scrollIntoView({ block: "nearest" });
      } else if (overlay.classList.contains("open") && e.key === "Enter" && activeIdx > -1) { go(shown[activeIdx]); }
    });
  })();

  /* ---------- theme toggle ------------------------------------------------*/
  (function () {
    var saved = localStorage.getItem("km-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    document.getElementById("themeBtn").addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var isDark = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      var next = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("km-theme", next);
    });
  })();

  /* ---------- boot --------------------------------------------------------*/
  if (!KM.subjects || !KM.subjects.length) {
    mount(el("div", { class: "empty" }, [
      el("div", { class: "big", text: "🛠️" }),
      el("h2", { text: "No content compiled yet" }),
      el("p", { text: "Run the build step to generate app-data.js from the data/ folder:" }),
      el("pre", { style: "background:var(--surface);padding:14px 18px;border-radius:12px;border:1px solid var(--line);overflow:auto", text: "node build/build.mjs" })
    ]));
  } else {
    render();
  }
})();
