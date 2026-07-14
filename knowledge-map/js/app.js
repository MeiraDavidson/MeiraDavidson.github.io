/* ===========================================================================
   Knowledge Map — SPA (hash router, no build step, works from file://)
   =========================================================================== */
(function () {
  "use strict";
  var KM = window.KNOWLEDGE_MAP || { subjects: [], units: {}, kps: {}, quizzes: {}, problemSets: {}, challenges: {} };
  var view = document.getElementById("view");
  var TCLASS = { "math": "t-math", "science": "t-science", "ela": "t-ela", "social-studies": "t-social" };
  var GRADES = ["6", "7", "8", "9", "10", "11", "12"];

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
  function markKP(id, done) { kpState(id).done = done !== false; if (done !== false) { if (P.needsReview) delete P.needsReview[id]; enqueueReview(id); bumpDaily(); } save(); }
  function recordEx(kpId, qid, ok) { var s = kpState(kpId); s.ex[qid] = ok; save(); }
  function recordVisit(id) { P.last = id; save(); }

  /* ---------- spaced review + stretch mastery ----------------------------*/
  function reviewMap() { P.review = P.review || {}; return P.review; }
  function enqueueReview(id) { if (window.KMReview) { window.KMReview.enqueue(reviewMap(), id, Date.now()); save(); } }
  function gradeReview(id, ok) { if (window.KMReview) { window.KMReview.grade(reviewMap(), id, ok, Date.now()); bumpDaily(); save(); } }
  function dueReviews() { return window.KMReview ? window.KMReview.dueIds(reviewMap(), Date.now()) : []; }
  function pendingReviews() { return window.KMReview ? window.KMReview.pendingIds(reviewMap()) : []; }
  function stretchState() { P.stretch = P.stretch || {}; return P.stretch; }
  function recordStretch(prob, ok, hintsUsed, thinkMs) {
    var st = stretchState();
    var e = st[prob.id] = st[prob.id] || { solved: false, attempts: 0, hints: 0, thinkMs: 0 };
    e.attempts++; e.hints = Math.max(e.hints, hintsUsed || 0); e.thinkMs = Math.max(e.thinkMs, thinkMs || 0);
    if (ok) { e.solved = true; (prob.kpIds || []).forEach(function (id) { enqueueReview(id); }); }
    save();
  }
  function stretchSolvedForKp(kpId) {
    var set = KM.challenges || {}, st = P.stretch || {};
    for (var uid in set) {
      var probs = set[uid].problems || [];
      for (var i = 0; i < probs.length; i++)
        if ((probs[i].kpIds || []).indexOf(kpId) > -1 && st[probs[i].id] && st[probs[i].id].solved) return true;
    }
    return false;
  }
  // Mastered = learned AND (graduated the full spacing ladder OR conquered a stretch problem).
  function isMastered(kpId) {
    if (!(P.kps && P.kps[kpId] && P.kps[kpId].done)) return false;
    if (window.KMReview && window.KMReview.graduated((P.review || {})[kpId])) return true;
    return stretchSolvedForKp(kpId);
  }
  function challengesForKp(kpId) {
    var uid = KM.kps[kpId] && KM.kps[kpId].unitId, set = (KM.challenges || {})[uid];
    if (!set) return [];
    return (set.problems || []).filter(function (p) { return (p.kpIds || []).indexOf(kpId) > -1; });
  }
  // Reusable nudge: attempt stretch problems AFTER a few days, not right after the lesson.
  function stretchTimingNote() {
    return el("div", { class: "timing-note" }, [
      el("span", { class: "tn-emoji", text: "⏳" }),
      el("div", { html: "<b>Come back to these in a few days.</b> They work best <i>after</i> a gap — once you've slept on the ideas and let them settle, not right after the lesson. Struggling with them a few days later is what carves them into intuition. Finish the lesson now, and swing back to these in a few days." })
    ]);
  }

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
  // Student-facing mastery states → the "living picture" palette (map + cards).
  // "Keep going" is warm amber-orange, NOT alarm red, so a struggling kid is pulled forward, not shamed.
  var MASTERY = {
    "not-started": { label: "Not started", dot: "#9aa5b1", fill: false },
    "ready":       { label: "Ready to learn", dot: "#9aa5b1", fill: false, ready: true },
    "learning":    { label: "Learning", dot: "#e8a400", fill: true, glyph: "…" },
    "keepgoing":   { label: "Keep going", dot: "#f4813f", fill: true, glyph: "!" },
    "mastered":    { label: "Mastered", dot: "#17b890", fill: true, glyph: "✓" },
    "due":         { label: "Review due", dot: "#3b82f6", fill: true, glyph: "↻" }
  };
  function reviewDueNow(id) { var r = (P.review || {})[id]; return !!(r && window.KMReview && !window.KMReview.graduated(r) && r.due <= Date.now()); }
  function masteryLevel(kp) {
    var st = conceptState(kp);
    if (st === "mastered") return reviewDueNow(kp.id) ? "due" : "mastered";
    if (st === "shaky") return "keepgoing";
    if (st === "in-progress") return "learning";
    if (st === "ready") return "ready";
    return "not-started";
  }
  // ---- next-best-action ("Continue" loop, uncapped) + daily rhythm + report tallies ----
  // Ordered "what to do next": finish what you started, then the ready frontier, in curriculum order.
  // Never blocks anything — it only SUGGESTS; a learner can still open any concept from the map.
  function nextActions(limit) {
    var out = [];
    for (var kid in KM.kps) {
      var k = KM.kps[kid];
      if (P.kps && P.kps[kid] && P.kps[kid].done) continue;
      var stt = conceptState(k);
      if (stt === "locked") continue; // only suggest what you're ready for (still reachable elsewhere)
      var pr = (stt === "in-progress" || stt === "shaky") ? 0 : 1;
      var startedUnit = (KM.units[k.unitId] || { knowledgePoints: [] }).knowledgePoints.some(function (id) { return P.kps && P.kps[id] && P.kps[id].done; });
      out.push({ kp: k, state: stt, pr: pr, started: startedUnit, rank: rankOf(k) });
    }
    out.sort(function (a, b) { return (a.pr - b.pr) || (b.started - a.started) || (a.rank - b.rank); });
    return limit ? out.slice(0, limit) : out;
  }
  function suggestedStretch() {
    for (var uid in (KM.challenges || {})) {
      var u = KM.units[uid]; if (!u) continue;
      if ((u.knowledgePoints || []).some(function (id) { return P.kps && P.kps[id] && P.kps[id].done; })) return { unitId: uid, unit: u };
    }
    return null;
  }
  function today() { return new Date().toDateString(); }
  function dailyCount() { return (P.daily && P.daily.date === today()) ? P.daily.count : 0; }
  function bumpDaily() { var t = today(); if (!P.daily || P.daily.date !== t) P.daily = { date: t, count: 0 }; P.daily.count++; save(); }
  function masteryCounts(ids) {
    var c = { total: 0, mastered: 0, due: 0, learning: 0, keepgoing: 0, notstarted: 0 };
    (ids || []).forEach(function (id) { var kp = KM.kps[id]; if (!kp) return; c.total++;
      var lvl = masteryLevel(kp);
      if (lvl === "mastered") c.mastered++; else if (lvl === "due") c.due++;
      else if (lvl === "learning") c.learning++; else if (lvl === "keepgoing") c.keepgoing++; else c.notstarted++;
    });
    return c;
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
      el("p", { text: "Your grades 6–12 map for Math, Science, ELA and Social Studies — built to the New York State standards used in Westchester County. Tap a subject, follow the path, and light up every idea." })
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

    // spaced-review hub — the retention engine
    var rvDue = dueReviews(), rvPend = pendingReviews();
    if (rvPend.length) {
      var nd = window.KMReview.nextDue(P.review || {});
      root.appendChild(el("div", { class: "review-card", onclick: function () { location.hash = "#/review"; } }, [
        el("div", { class: "rv-emoji", text: rvDue.length ? "🔁" : "✅" }),
        el("div", {}, [
          el("div", { style: "font-weight:900", text: rvDue.length ? "Review — bring it back to lock it in" : "Spaced review on track" }),
          el("div", { class: "rv-sub", text: rvDue.length
            ? (rvDue.length + " concept" + (rvDue.length > 1 ? "s" : "") + " ready to recall now")
            : ("All caught up — next review " + window.KMReview.whenLabel(nd, Date.now())) })
        ]),
        el("div", { class: "rv-go", text: rvDue.length ? "Start →" : "Review early →" })
      ]));
    }

    // ▶ Continue — the uncapped next-best-action launchpad (self-paced: sprint as far as you like)
    (function () {
      var acts = nextActions(1), cdue = dueReviews(), dc = dailyCount();
      if (!acts.length && !cdue.length) return;
      var primary = cdue.length ? (cdue.length + " concept" + (cdue.length > 1 ? "s" : "") + " due for review")
        : ("Next up: " + acts[0].kp.title);
      root.appendChild(el("div", { class: "continue-card", onclick: function () { location.hash = "#/next"; } }, [
        el("div", { class: "cc-emoji", text: "▶" }),
        el("div", {}, [
          el("div", { style: "font-weight:900", text: "Continue learning" }),
          el("div", { class: "cc-sub", text: primary + (dc ? "  ·  " + dc + " done today" : "") })
        ]),
        el("div", { class: "cc-go", text: "Go →" })
      ]));
    })();

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
    root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "Your journey" }), el("span", { class: "line" }), el("a", { href: "#/progress", class: "pill-count", style: "text-decoration:underline", text: "full report →" })]));
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
      if (isMastered(id)) card.appendChild(el("div", { class: "badge-done mastered", text: "★", title: "Mastered — recalled after a delay or a stretch problem conquered" }));
      else if (done) card.appendChild(el("div", { class: "badge-done", text: "✓" }));
      card.appendChild(el("div", { class: "pill-count", text: "Idea " + (i + 1) }));
      card.appendChild(el("h3", { text: kp.title }));
      if (kp.standard && kp.standard.code) card.appendChild(el("span", { class: "chip std", text: kp.standard.code }));
      if (kp.visual) card.appendChild(el("span", { class: "chip accent", text: "▶ interactive" }));
      // living-picture status chip for active/due states (mastered/done already shown by the ✓/★ badge)
      var _lvl = masteryLevel(kp);
      if (_lvl === "learning" || _lvl === "keepgoing" || _lvl === "due") {
        var _m = MASTERY[_lvl];
        var _chip = el("span", { class: "chip statechip", title: _m.label });
        var _dot = el("span", { class: "sc-dot" }); _dot.style.background = _m.dot;
        _chip.appendChild(_dot); _chip.appendChild(document.createTextNode(_m.label));
        card.appendChild(_chip);
      }
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
      // 🔥 stretch challenge set (interleaved AMC-8) — only where authored
      if (KM.challenges && KM.challenges[unitId]) {
        var chset = KM.challenges[unitId];
        var chDone = (chset.problems || []).filter(function (p) { return (P.stretch || {})[p.id] && P.stretch[p.id].solved; }).length;
        arow.appendChild(el("div", { class: "card stretch-card", onclick: function () { location.hash = "#/challenge/" + unitId; } }, [
          el("div", { class: "accent-bar" }),
          chDone ? el("div", { class: "badge-done mastered", text: chDone === chset.problems.length ? "★" : chDone }) : null,
          el("div", { class: "emoji", text: "🔥" }),
          el("h3", { text: "Stretch Challenges" }),
          el("p", { text: (chset.problems ? chset.problems.length : 0) + " hard, multi-step problems that mix the whole unit — struggle-first, with staged hints instead of instant answers." })
        ]));
      }
      root.appendChild(arow);
    }
    root.appendChild(footer());
    mount(root);
  }

  /* ========================================================================
     VIEW: STRETCH CHALLENGE SET (interleaved, unit-level)
     ====================================================================== */
  function viewChallengeSet(unitId) {
    var set = (KM.challenges || {})[unitId], u = KM.units[unitId];
    if (!set || !u) return notFound();
    var s = subjectByKey(u.subject);
    var root = el("div", { class: TCLASS[u.subject] || "" });
    root.appendChild(crumbs([
      { label: "Home", href: "#/" },
      { label: s.name + " · G" + u.grade, href: "#/subject/" + u.subject + "/" + u.grade },
      { label: "Unit " + u.order, href: "#/unit/" + unitId },
      { label: "Stretch" }
    ]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: "🔥 " + (set.title || (u.title + " — Stretch Challenges")) }),
      el("p", { text: set.blurb || "Hard, multi-step problems that mix the whole unit. Wrestle first — hints come in stages, and the solution unlocks only after you've taken a real swing." })
    ]));
    root.appendChild(stretchTimingNote());
    var probs = set.problems || [];
    var solved = probs.filter(function (p) { return (P.stretch || {})[p.id] && P.stretch[p.id].solved; }).length;
    root.appendChild(el("div", { class: "panel", style: "margin-bottom:16px" }, progressRow(Math.round(solved / (probs.length || 1) * 100), solved + " of " + probs.length + " conquered")));
    var host = el("div", { class: "panel" });
    host.appendChild(el("div", { class: "eyebrow", text: "Interleaved — first figure out which idea each one needs" }));
    probs.forEach(function (p) { host.appendChild(renderChallenge(p, {})); });
    root.appendChild(host);
    root.appendChild(footer());
    mount(root);
  }

  /* ========================================================================
     VIEW: SPACED REVIEW (retrieval practice pulled from the queue)
     ====================================================================== */
  function viewReview() {
    var root = el("div");
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Review" }]));
    var due = dueReviews(), pend = pendingReviews();
    if (!pend.length) {
      root.appendChild(el("div", { class: "panel result-card" }, [
        el("div", { class: "result-emoji", text: "🌱" }),
        el("h1", { text: "Nothing to review yet" }),
        el("p", { text: "Complete a concept and it enters your spaced-review queue automatically. Then it comes back — tomorrow, in a few days, in a couple of weeks — so it moves from memory into instinct." }),
        el("a", { class: "btn wide", href: "#/", text: "Back home" })
      ]));
      root.appendChild(footer()); mount(root); return;
    }
    var queue = (due.length ? due : pend.slice(0, 5));
    var items = [];
    queue.forEach(function (id) {
      var kp = KM.kps[id]; if (!kp) return;
      var pool = (kp.exercises || []).filter(function (q) { return q.type === "multiple-choice" || q.type === "numeric"; });
      if (!pool.length) return;
      var box = (P.review[id] && P.review[id].box) || 0;
      items.push({ kpId: id, kp: kp, q: pool[(kp.title.length + box) % pool.length] });
    });
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: due.length ? "🔁 Review — recall it cold" : "🔁 Review early" }),
      el("p", { text: due.length
        ? "No peeking at the lesson first. Pull each answer from memory — the effort of retrieval is exactly what strengthens it."
        : "Nothing's due yet, but pulling a few forward is fine practice. (Spacing helps most, so no need to overdo it.)" })
    ]));
    var stage = el("div", { class: "panel" });
    root.appendChild(stage);
    var i = 0, correct = 0;
    function renderOne() {
      clear(stage);
      if (i >= items.length) return finish();
      var it = items[i];
      stage.appendChild(el("div", { class: "pill-count", text: "Concept " + (i + 1) + " of " + items.length + " · " + it.kp.title }));
      var next = el("button", { class: "btn wide", text: (i === items.length - 1 ? "Finish" : "Next →"), disabled: "true", style: "margin-top:14px" });
      stage.appendChild(renderExercise(it.q, null, { quiz: true, onDone: function (ok) {
        if (ok) correct++;
        gradeReview(it.kpId, ok);
        next.removeAttribute("disabled");
      } }));
      stage.appendChild(next);
      next.addEventListener("click", function () { i++; renderOne(); window.scrollTo(0, 0); });
    }
    function finish() {
      clear(stage);
      stage.className = "panel result-card";
      stage.appendChild(el("div", { class: "result-emoji", text: "🎉" }));
      stage.appendChild(el("h1", { text: "Review done — " + correct + "/" + items.length + " recalled" }));
      stage.appendChild(el("p", { text: "Each concept you recalled just got pushed further out in your queue; the ones you missed will come back sooner. That's the spacing doing its job." }));
      stage.appendChild(el("a", { class: "btn wide", href: "#/", text: "Back home" }));
      confetti();
    }
    renderOne();
    root.appendChild(footer());
    mount(root);
  }

  /* ========================================================================
     VIEW: CONTINUE — the uncapped next-best-action session
     ====================================================================== */
  function viewNext() {
    var root = el("div");
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Continue" }]));
    var due = dueReviews(), acts = nextActions(6), dc = dailyCount(), str = suggestedStretch();
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: "▶ Your next steps" }),
      el("p", { html: "Go as far as you want — there's <b>no daily cap</b>. Learn as much as you can hold today; spaced review brings each idea back over the next days so it sticks." + (dc ? " You've done <b>" + dc + "</b> today. 🔥" : "") })
    ]));
    if (due.length) {
      root.appendChild(el("div", { class: "review-card", onclick: function () { location.hash = "#/review"; } }, [
        el("div", { class: "rv-emoji", text: "🔁" }),
        el("div", {}, [
          el("div", { style: "font-weight:900", text: "Review first — lock in what you've learned" }),
          el("div", { class: "rv-sub", text: due.length + " concept" + (due.length > 1 ? "s" : "") + " due to recall" })
        ]),
        el("div", { class: "rv-go", text: "Review →" })
      ]));
    }
    if (acts.length) {
      root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "📚 Learn next" }), el("span", { class: "line" }), el("a", { href: "#/map", class: "pill-count", style: "text-decoration:underline", text: "see the map" })]));
      var grid = el("div", { class: "grid kps" });
      acts.slice(0, 4).forEach(function (a) {
        var kp = a.kp, subj = subjectByKey(kp.subject), mm = MASTERY[masteryLevel(kp)];
        var card = el("div", { class: "card " + (TCLASS[kp.subject] || ""), onclick: function () { location.hash = "#/kp/" + kp.id; } });
        card.appendChild(el("div", { class: "accent-bar" }));
        card.appendChild(el("div", { class: "pill-count", text: subj.name + " · Grade " + kp.grade }));
        card.appendChild(el("h3", { text: kp.title }));
        var chip = el("span", { class: "chip statechip" }); var d = el("span", { class: "sc-dot" }); d.style.background = mm.dot;
        chip.appendChild(d); chip.appendChild(document.createTextNode((a.state === "in-progress" || a.state === "shaky") ? "Continue" : "Start"));
        card.appendChild(chip);
        grid.appendChild(card);
      });
      root.appendChild(grid);
    } else if (!due.length) {
      root.appendChild(el("div", { class: "panel" }, el("p", { style: "margin:0;color:var(--ink-soft)", text: "You've opened everything you're ready for — nice pace. Keep reviewing to lock it in, or explore the map for anything you're curious about (nothing's locked)." })));
    }
    if (str) {
      root.appendChild(el("div", { class: "section-title" }, [el("span", { text: "🔥 Push yourself (optional)" }), el("span", { class: "line" })]));
      root.appendChild(el("div", { class: "card stretch-card", onclick: function () { location.hash = "#/challenge/" + str.unitId; } }, [
        el("div", { class: "accent-bar" }), el("div", { class: "emoji", text: "🔥" }),
        el("h3", { text: str.unit.title + " — Stretch" }),
        el("p", { text: "Hard, struggle-first problems on something you've already learned. Best a few days after the lesson." })
      ]));
    }
    root.appendChild(footer());
    mount(root);
  }

  /* ========================================================================
     VIEW: PROGRESS REPORT (for parents — what's mastered / next)
     ====================================================================== */
  function tallyChip(lvl, n) {
    var m = MASTERY[lvl] || MASTERY["not-started"];
    var chip = el("span", { class: "chip statechip" }); var d = el("span", { class: "sc-dot" }); d.style.background = m.dot;
    chip.appendChild(d); chip.appendChild(document.createTextNode(n + " " + m.label)); return chip;
  }
  function viewProgress() {
    var root = el("div");
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Progress report" }]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: "📊 Progress Report" }),
      el("p", { text: "What's been mastered, what's in progress, and what's next — across every subject and grade." })
    ]));
    root.appendChild(el("div", { class: "btn-row" }, el("button", { class: "btn ghost", text: "🖨️ Print / Save as PDF", onclick: function () { window.print(); } })));
    var C = masteryCounts(Object.keys(KM.kps)), learned = C.mastered + C.due;
    root.appendChild(el("div", { class: "panel", style: "margin-top:14px" }, [
      el("div", { class: "progress-row" }, [
        ringWrap(C.total ? Math.round(learned / C.total * 100) : 0),
        el("div", {}, [
          el("div", { html: "<b>" + learned + "</b> of <b>" + C.total + "</b> concepts mastered" + (C.due ? " · " + C.due + " due for review" : "") + "." }),
          el("div", { class: "pill-count", text: C.learning + " in progress · " + C.keepgoing + " to shore up · " + C.notstarted + " not started" })
        ])
      ])
    ]));
    KM.subjects.forEach(function (s) {
      if (!GRADES.some(function (g) { return (s.grades[g] || []).length; })) return;
      root.appendChild(el("div", { class: "section-title" }, [el("span", { text: s.emoji + " " + s.name }), el("span", { class: "line" })]));
      GRADES.forEach(function (g) {
        var units = (s.grades[g] || []).map(function (id) { return KM.units[id]; }).filter(Boolean);
        if (!units.length) return;
        var ids = []; units.forEach(function (u) { (u.knowledgePoints || []).forEach(function (id) { ids.push(id); }); });
        var gc = masteryCounts(ids), gl = gc.mastered + gc.due;
        var panel = el("div", { class: "panel report-grade" });
        panel.appendChild(el("div", { class: "rg-head" }, [
          el("div", { style: "font-weight:900", text: "Grade " + g }),
          el("a", { class: "pill-count", href: "#/map/" + s.key, style: "text-decoration:underline", text: "open map →" })
        ]));
        panel.appendChild(progressRow(gc.total ? Math.round(gl / gc.total * 100) : 0, gl + " / " + gc.total + " mastered"));
        panel.appendChild(el("div", { class: "report-tally" }, [
          tallyChip("mastered", gc.mastered + gc.due), tallyChip("learning", gc.learning),
          tallyChip("keepgoing", gc.keepgoing), tallyChip("not-started", gc.notstarted)
        ]));
        var ul = el("div", { class: "report-units" });
        units.forEach(function (u) {
          var uc = masteryCounts(u.knowledgePoints || []), ulrn = uc.mastered + uc.due;
          ul.appendChild(el("a", { class: "report-unit", href: "#/unit/" + u.id }, [
            el("span", { class: "ru-title", text: (u.emoji || "📘") + " " + u.title }),
            el("span", { class: "ru-count", text: ulrn + "/" + uc.total })
          ]));
        });
        panel.appendChild(ul);
        root.appendChild(panel);
      });
    });
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

    // 🔥 Stretch — optional AMC-8 challenge, collapsed by default (opt-in)
    var stretch = challengesForKp(kpId);
    if (stretch.length) {
      var sp = el("details", { class: "panel stretch" });
      sp.appendChild(el("summary", {}, [
        el("span", { class: "dd-badge", text: "🔥 Stretch challenge" }),
        el("span", { class: "dd-hint", text: stretch.length + " hard problem" + (stretch.length > 1 ? "s" : "") + " · best a few days from now · optional" })
      ]));
      var spOpened = false;
      sp.addEventListener("toggle", function () {
        if (sp.open && !spOpened) {
          spOpened = true;
          sp.appendChild(stretchTimingNote());
          sp.appendChild(el("p", { class: "stretch-intro", html: "These are meant to be <b>hard</b>. Wrestle first — you'll get staged hints (a nudge, then a method), and the full solution only after you've taken a real swing. Struggling here is what turns the rule into an instinct." }));
          stretch.forEach(function (p) { sp.appendChild(renderChallenge(p, { kpId: kpId })); });
        }
      });
      root.appendChild(sp);
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
    if (idx > -1 && idx < u.knowledgePoints.length - 1) row.appendChild(el("a", { class: "btn ghost", href: "#/kp/" + u.knowledgePoints[idx + 1], text: "Next in unit →" }));
    // Keep going — the uncapped sprint: jump straight to the next concept you're ready for, anywhere in the map
    var nextUp = nextActions(1).filter(function (a) { return a.kp.id !== kpId; })[0];
    if (nextUp) row.appendChild(el("a", { class: "btn", href: "#/kp/" + nextUp.kp.id, text: "Keep going →" }));
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

  /* ---------- stretch challenge renderer (struggle-first, staged hints) ---*/
  function renderChallenge(prob, opts) {
    if (prob.type === "open-response") return renderOpenResponse(prob, opts);
    opts = opts || {};
    var t0 = Date.now();
    var attempts = 0, hintsShown = 0, solved = false, solutionShown = false, solBtnShown = false;
    var wrap = el("div", { class: "exercise challenge" });
    wrap.appendChild(el("div", { class: "qhead" }, [
      el("div", { class: "prompt", html: inlineMath(prob.prompt) }),
      el("span", { class: "diff amc8", text: prob.band || "AMC-8" })
    ]));
    var feedback = el("div", { class: "feedback" });
    var hintWrap = el("div", { class: "hintwrap" });
    var hintList = el("div", { class: "hints" });
    var solWrap = el("div", { class: "solwrap" });

    function celebrate() {
      solved = true;
      recordStretch(prob, true, hintsShown, Date.now() - t0);
      var secs = Math.round((Date.now() - t0) / 1000);
      feedback.className = "feedback show ok";
      feedback.innerHTML = "🎯 <b>You got it — and you earned it.</b>" +
        "<div class='struggle-note'>You wrestled with this for " + secs + "s" +
        (hintsShown ? " and used " + hintsShown + " hint" + (hintsShown > 1 ? "s" : "") : " with no hints") +
        ". That struggle is what turns a rule into an instinct.</div>";
      revealSolution(true);
      confetti();
      if (opts.onSolved) opts.onSolved(prob);
    }
    function revealSolution(force) {
      if (solutionShown) return;
      if (!force && attempts < 1) {
        feedback.className = "feedback show no";
        feedback.innerHTML = "✋ Take a real swing first — then the full solution unlocks.";
        return;
      }
      solutionShown = true;
      clear(solWrap);
      var box = el("div", { class: "solution" });
      box.appendChild(el("div", { class: "eyebrow", text: "Full solution" }));
      (prob.solution || []).forEach(function (stp, i) {
        box.appendChild(el("div", { class: "sol-step" }, [el("span", { class: "sol-n", text: (i + 1) }), el("div", { html: inlineMath(stp) })]));
      });
      solWrap.appendChild(box);
    }
    function showSolBtn() {
      if (solBtnShown || solutionShown) return;
      solBtnShown = true;
      solWrap.appendChild(el("button", { class: "btn ghost sol-btn", text: "I've wrestled with it — show the solution",
        onclick: function () { revealSolution(false); } }));
    }

    if (prob.type === "multiple-choice") {
      var choices = el("div", { class: "choices" });
      (prob.choices || []).forEach(function (c, i) {
        var ch = el("div", { class: "choice", html: '<span class="mark">' + String.fromCharCode(65 + i) + "</span><span>" + inlineMath(c) + "</span>" });
        ch.addEventListener("click", function () {
          if (solved) return;
          attempts++;
          if (i === prob.answerIndex) {
            ch.classList.add("correct");
            choices.querySelectorAll(".choice").forEach(function (x) { x.classList.add("disabled"); });
            celebrate();
          } else {
            ch.classList.add("wrong"); ch.classList.add("disabled");
            recordStretch(prob, false, hintsShown, Date.now() - t0);
            feedback.className = "feedback show no";
            feedback.innerHTML = "❌ Not that one — reason it through, grab a hint, or eliminate what can't be true.";
            showSolBtn();
          }
        });
        choices.appendChild(ch);
      });
      wrap.appendChild(choices);
    } else {
      var inp = el("input", { class: "answer-input", type: "text", inputmode: "decimal", placeholder: "Your answer" + (prob.unit ? " (" + prob.unit + ")" : "") });
      var check = el("button", { class: "btn", text: "Check", onclick: function () {
        if (solved) return;
        var raw = String(inp.value).replace(/[^0-9.\-]/g, "");
        var val = parseFloat(raw);
        if (raw === "" || isNaN(val)) { feedback.className = "feedback show no"; feedback.innerHTML = "Type a number first."; return; }
        attempts++;
        var ok = Math.abs(val - prob.answer) <= (prob.tolerance || 0) + 1e-9;
        inp.style.borderColor = ok ? "var(--good)" : "var(--bad)";
        if (ok) { celebrate(); }
        else {
          recordStretch(prob, false, hintsShown, Date.now() - t0);
          feedback.className = "feedback show no";
          feedback.innerHTML = "❌ Not yet — check your steps and their order. Try again, or open a hint.";
          showSolBtn();
        }
      } });
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") check.click(); });
      wrap.appendChild(el("div", { class: "btn-row" }, [inp, check]));
    }

    var hintBtn = el("button", { class: "btn ghost hint-btn", text: "💡 Need a nudge?", onclick: function () {
      var hints = prob.hints || [];
      if (hintsShown >= hints.length) return;
      hintList.appendChild(el("div", { class: "hint" }, [el("span", { class: "hint-n", text: "Hint " + (hintsShown + 1) }), el("div", { html: inlineMath(hints[hintsShown]) })]));
      hintsShown++;
      if (hintsShown >= hints.length) { hintBtn.textContent = "That's every hint — you've got this"; hintBtn.disabled = true; hintBtn.classList.add("spent"); showSolBtn(); }
      else hintBtn.textContent = "💡 Another hint (" + (hints.length - hintsShown) + " left)";
    } });
    hintWrap.appendChild(hintBtn);
    hintWrap.appendChild(hintList);

    wrap.appendChild(feedback);
    wrap.appendChild(hintWrap);
    wrap.appendChild(solWrap);
    return wrap;
  }

  /* ---------- open-response renderer (ELA / Social Studies) ---------------
     No single right answer: the student writes first, then unlocks a model
     response + a self-check rubric and scores their own work against it. */
  function renderOpenResponse(prob, opts) {
    opts = opts || {};
    var t0 = Date.now();
    var hintsShown = 0, revealed = false, scored = false;
    var wrap = el("div", { class: "exercise challenge open" });
    wrap.appendChild(el("div", { class: "qhead" }, [
      el("div", { class: "prompt", html: inlineMath(prob.prompt) }),
      el("span", { class: "diff amc8", text: prob.band || "Constructed response" })
    ]));
    if (prob.source) {
      var src = el("div", { class: "source-doc" });
      if (prob.sourceAttribution) src.appendChild(el("div", { class: "src-attr", text: prob.sourceAttribution }));
      (Array.isArray(prob.source) ? prob.source : [prob.source]).forEach(function (p) { src.appendChild(el("p", { html: inlineMath(p) })); });
      wrap.appendChild(src);
    }
    var ta = el("textarea", { class: "answer-input open-response", placeholder: "Write your response here — take a real swing before you reveal the model. Putting it in your own words first is where the learning happens." });
    wrap.appendChild(ta);

    var feedback = el("div", { class: "feedback" });
    var hintWrap = el("div", { class: "hintwrap" });
    var hintList = el("div", { class: "hints" });
    var revealWrap = el("div", { class: "revealwrap" });

    var hintBtn = el("button", { class: "btn ghost hint-btn", text: "💡 Need a nudge?", onclick: function () {
      var hints = prob.hints || [];
      if (hintsShown >= hints.length) return;
      hintList.appendChild(el("div", { class: "hint" }, [el("span", { class: "hint-n", text: "Hint " + (hintsShown + 1) }), el("div", { html: inlineMath(hints[hintsShown]) })]));
      hintsShown++;
      if (hintsShown >= hints.length) { hintBtn.textContent = "That's every hint — trust your thinking"; hintBtn.disabled = true; hintBtn.classList.add("spent"); }
      else hintBtn.textContent = "💡 Another hint (" + (hints.length - hintsShown) + " left)";
    } });
    hintWrap.appendChild(hintBtn); hintWrap.appendChild(hintList);

    var revealBtn = el("button", { class: "btn", text: "I've written my answer — reveal the model & rubric", onclick: function () {
      if (revealed) return;
      if ((ta.value || "").trim().length < 40) {
        feedback.className = "feedback show no";
        feedback.innerHTML = "✋ Write a real attempt first — a few sentences at least. Comparing your own words to the model is the whole point.";
        return;
      }
      revealed = true;
      (prob.kpIds || []).forEach(function (id) { enqueueReview(id); }); // engaged → schedule a spaced return
      clear(revealWrap);
      var model = el("div", { class: "solution model" });
      model.appendChild(el("div", { class: "eyebrow", text: "A strong model response" }));
      (Array.isArray(prob.model) ? prob.model : [prob.model]).forEach(function (p) { model.appendChild(el("p", { html: inlineMath(p) })); });
      revealWrap.appendChild(model);

      var rub = el("div", { class: "rubric" });
      rub.appendChild(el("div", { class: "eyebrow", text: "Score yourself — honestly, did YOUR response do each of these?" }));
      var checks = [];
      (prob.rubric || []).forEach(function (item, i) {
        var cid = "rub_" + prob.id + "_" + i;
        var cb = el("input", { type: "checkbox", id: cid });
        checks.push(cb);
        rub.appendChild(el("label", { class: "rubric-item", "for": cid }, [cb, el("span", { html: inlineMath(item) })]));
      });
      rub.appendChild(el("button", { class: "btn good", text: "Score my response", onclick: function () {
        if (scored) return; scored = true;
        var hit = checks.filter(function (c) { return c.checked; }).length, total = checks.length || 1;
        var met = hit / total >= 0.6;
        recordStretch(prob, met, hintsShown, Date.now() - t0);
        feedback.className = "feedback show " + (met ? "ok" : "no");
        feedback.innerHTML = met
          ? ("🎯 <b>Strong work — " + hit + "/" + total + ".</b><div class='struggle-note'>You built the response yourself, then held it to a real standard. In a few days, write a fresh one from memory — that's what locks it in.</div>")
          : ("💪 <b>" + hit + "/" + total + " — good start.</b><div class='struggle-note'>Now you can see what a full response needs. Revise yours, and come back in a few days to write a new one from scratch.</div>");
        if (met) { confetti(); if (opts.onSolved) opts.onSolved(prob); }
      } }));
      revealWrap.appendChild(rub);
    } });

    wrap.appendChild(el("div", { class: "btn-row" }, revealBtn));
    wrap.appendChild(feedback);
    wrap.appendChild(hintWrap);
    wrap.appendChild(revealWrap);
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
    GRADES.forEach(function (g) {
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
    var mode = sessionGet("mapmode") || "graph"; // "graph" = dependency layout | "curriculum" = unit columns
    var GRADE_COL = { "6": "#9db8f7", "7": "#6b8cf0", "8": "#4f6ad6", "9": "#3f57c4", "10": "#334aa6", "11": "#2b3a86", "12": "#26307a" }; // light → dark = grade 6 → 12
    // Real prerequisite edges when curated (kp.prereqs), else the auto vocabulary links (kp.related).
    function edgesFor(kp) { return (kp && kp.prereqs && kp.prereqs.length !== undefined) ? kp.prereqs : ((kp && kp.related) || []); }

    var nodes = [];
    GRADES.forEach(function (g) {
      (s.grades[g] || []).forEach(function (uid) {
        (((KM.units[uid] || {}).knowledgePoints) || []).forEach(function (id) { var kp = KM.kps[id]; if (kp) nodes.push(kp); });
      });
    });

    var colGap = 108, rowGap = 54, nodeR = 15, topBand = mode === "graph" ? 52 : 74, pad = 34;
    var pos = {}, W, H, cols = null;

    if (mode === "graph") {
      // dependency layout: a concept's column = its longest chain of prerequisites (foundations at left)
      var depthMemo = {};
      function depthOf(id) {
        if (depthMemo[id] != null) return depthMemo[id];
        depthMemo[id] = 0; // break any accidental cycle
        var d = 0; edgesFor(KM.kps[id]).forEach(function (p) { if (KM.kps[p.id]) d = Math.max(d, 1 + depthOf(p.id)); });
        return (depthMemo[id] = d);
      }
      var byDepth = {};
      nodes.forEach(function (kp) { var d = depthOf(kp.id); (byDepth[d] = byDepth[d] || []).push(kp); });
      var depths = Object.keys(byDepth).map(Number).sort(function (a, b) { return a - b; });
      var maxRows = 1;
      depths.forEach(function (d) {
        byDepth[d].sort(function (a, b) { return rankOf(a) - rankOf(b); });
        maxRows = Math.max(maxRows, byDepth[d].length);
        var cx = pad + d * colGap + colGap / 2;
        byDepth[d].forEach(function (kp, ri) { pos[kp.id] = { x: cx, y: topBand + ri * rowGap + rowGap / 2, kp: kp }; });
      });
      W = pad * 2 + (depths[depths.length - 1] + 1) * colGap; H = topBand + maxRows * rowGap + 30;
    } else {
      cols = [];
      GRADES.forEach(function (g) {
        (s.grades[g] || []).forEach(function (uid) {
          var u = KM.units[uid];
          cols.push({ uid: uid, unit: u, grade: g, kps: (u.knowledgePoints || []).map(function (id) { return KM.kps[id]; }).filter(Boolean) });
        });
      });
      var maxRows2 = cols.reduce(function (m, c) { return Math.max(m, c.kps.length); }, 1);
      W = pad * 2 + cols.length * colGap; H = topBand + maxRows2 * rowGap + 30;
      cols.forEach(function (c, ci) {
        c.cx = pad + ci * colGap + colGap / 2;
        c.kps.forEach(function (kp, ri) { pos[kp.id] = { x: c.cx, y: topBand + ri * rowGap + rowGap / 2, kp: kp, unit: c.unit }; });
      });
    }

    var st = subjectConceptStats(subjKey);
    var root = el("div", { class: TCLASS[subjKey] || "" });
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Knowledge Map", href: "#/map" }, { label: s.name }]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { text: s.emoji + " " + s.name + " — Knowledge Map" }),
      el("p", { html: mode === "graph"
        ? "How every idea <b>depends on earlier ones</b> — left to right, foundations → advanced. Grades interleave, because understanding doesn't stop at grade lines. Tap any concept."
        : "<b>" + st.done + "</b> of <b>" + st.total + "</b> concepts complete" + (st.ready ? " · <b>" + st.ready + "</b> ready now (glowing)" : "") + ". Tap any concept." })
    ]));

    var toggle = el("div", { class: "map-toggle" });
    [["graph", "🕸️ Knowledge map"], ["curriculum", "📋 Curriculum order"]].forEach(function (mm) {
      toggle.appendChild(el("button", { class: "map-tab" + (mode === mm[0] ? " active" : ""), text: mm[1],
        onclick: function () { sessionSet("mapmode", mm[0]); render(); } }));
    });
    if ((KM.concepts || {})[subjKey]) {
      toggle.appendChild(el("button", { class: "map-tab", html: "🧵 Concept threads <span class='cbeta'>beta</span>",
        onclick: function () { location.hash = "#/concepts/" + subjKey; } }));
    }
    root.appendChild(toggle);

    var info = el("div", { class: "map-info" });
    info.innerHTML = "<span class='map-info-hint'>Tap a concept to see it and what it builds on.</span>";
    root.appendChild(info);

    var scroller = el("div", { class: "map-scroller" });
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, class: "map-svg", width: W, height: H });
    scroller.appendChild(svg);
    root.appendChild(scroller);

    if (mode === "curriculum") {
      var gStart = {}, gEnd = {};
      cols.forEach(function (c, ci) { if (gStart[c.grade] == null) gStart[c.grade] = ci; gEnd[c.grade] = ci; });
      GRADES.forEach(function (g, gi) {
        if (gStart[g] == null) return;
        var x0 = pad + gStart[g] * colGap, x1 = pad + (gEnd[g] + 1) * colGap;
        svg.appendChild(svgEl("rect", { x: x0, y: 40, width: x1 - x0, height: H - 46, rx: 12, fill: gi % 2 ? "var(--surface-2)" : "transparent", opacity: 0.6 }));
        var gl = svgEl("text", { x: (x0 + x1) / 2, y: 24, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "var(--ink-faint)" }); gl.textContent = "Grade " + g; svg.appendChild(gl);
      });
      cols.forEach(function (c) { var t = svgEl("text", { x: c.cx, y: 58, "text-anchor": "middle", "font-size": 15 }); t.textContent = c.unit.emoji || "📘"; svg.appendChild(t); });
    }

    // edges (prerequisite → concept), from the curated prereq graph where available
    var edgeEls = [];
    nodes.forEach(function (kp) {
      edgesFor(kp).forEach(function (r) {
        var a = pos[r.id], b = pos[kp.id];
        if (!a || !b) return;
        var dx = (b.x - a.x) / 2;
        var path = svgEl("path", { d: "M" + a.x + " " + a.y + " C" + (a.x + dx) + " " + a.y + "," + (b.x - dx) + " " + b.y + "," + b.x + " " + b.y,
          fill: "none", stroke: "var(--line)", "stroke-width": 1.5, opacity: 0.55 });
        path._from = r.id; path._to = kp.id; svg.appendChild(path); edgeEls.push(path);
      });
    });

    var nodeEls = {};
    function select(kp) {
      Object.keys(nodeEls).forEach(function (id) { nodeEls[id].ring.setAttribute("stroke-width", nodeEls[id].baseSW); nodeEls[id].ring.setAttribute("stroke", nodeEls[id].baseStroke); });
      edgeEls.forEach(function (e) { e.setAttribute("stroke", "var(--line)"); e.setAttribute("stroke-width", 1.5); e.setAttribute("opacity", 0.3); });
      var n = nodeEls[kp.id]; if (n) { n.ring.setAttribute("stroke", "var(--ink)"); n.ring.setAttribute("stroke-width", 4); }
      edgesFor(kp).forEach(function (r) {
        edgeEls.forEach(function (e) { if (e._to === kp.id && e._from === r.id) { e.setAttribute("stroke", color); e.setAttribute("stroke-width", 3); e.setAttribute("opacity", 1); } });
        var pn = nodeEls[r.id]; if (pn) { pn.ring.setAttribute("stroke", "var(--ink)"); pn.ring.setAttribute("stroke-width", 3); }
      });
      var pre = edgesFor(kp);
      info.innerHTML = "";
      var left = el("div", {}, [
        el("div", { class: "mi-title", text: kp.title }),
        el("div", { class: "mi-sub", text: (s.name) + " · Grade " + kp.grade + " · " + ((KM.units[kp.unitId] || {}).title || "") + " · " + MASTERY[masteryLevel(kp)].label }),
        pre.length ? el("div", { class: "mi-pre", html: "Builds on: " + pre.map(function (r) { return "<a href='#/kp/" + r.id + "'>" + esc(r.title) + "</a>" + (String(r.grade) !== String(kp.grade) ? " <span class='mi-g'>(G" + r.grade + ")</span>" : ""); }).join(", ") }) : el("div", { class: "mi-pre", text: "A starting-point concept — no prerequisites here." })
      ]);
      if (kp.crossSubject && kp.crossSubject.length) {
        left.appendChild(el("div", { class: "mi-pre", html: "↔ Connects to: " + kp.crossSubject.map(function (c) { return "<a href='#/kp/" + c.id + "'>" + esc(c.subjectName) + ": " + esc(c.title) + "</a>"; }).join(", ") }));
      }
      info.appendChild(left);
      info.appendChild(el("a", { class: "btn", href: "#/kp/" + kp.id, text: "Open idea →" }));
    }

    nodes.forEach(function (kp) {
      var p = pos[kp.id]; if (!p) return;
      var lvl = masteryLevel(kp), m = MASTERY[lvl], isReady = !!m.ready;
      var fill = mode === "graph" ? (GRADE_COL[String(kp.grade)] || color) : (m.fill ? m.dot : "var(--surface)");
      var stroke = mode === "graph" ? (GRADE_COL[String(kp.grade)] || color) : m.dot;
      var g = svgEl("g", { class: "map-node" + (isReady ? " ready" : ""), style: "cursor:pointer" });
      var ring = svgEl("circle", { cx: p.x, cy: p.y, r: nodeR, fill: fill, stroke: stroke, "stroke-width": 2 });
      if (isReady) g.appendChild(svgEl("circle", { cx: p.x, cy: p.y, r: nodeR + 5, fill: "none", stroke: stroke, "stroke-width": 2, class: "ready-pulse" }));
      g.appendChild(ring);
      var glyph = m.glyph || "";
      if (glyph) g.appendChild((function () { var t = svgEl("text", { x: p.x, y: p.y + 4, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: "#fff" }); t.textContent = glyph; return t; })());
      g.addEventListener("click", function () { select(kp); });
      svg.appendChild(g);
      nodeEls[kp.id] = { ring: ring, baseSW: 2, baseStroke: stroke };
    });

    var legend = el("div", { class: "map-legend" });
    if (mode === "graph") {
      GRADES.filter(function (g) { return (s.grades[g] || []).length; }).forEach(function (g) {
        var it = el("span", { class: "map-legend-item" }); var d = el("span", { class: "legend-dot" }); d.style.background = GRADE_COL[g]; d.style.borderColor = GRADE_COL[g];
        it.appendChild(d); it.appendChild(document.createTextNode("Grade " + g)); legend.appendChild(it);
      });
      legend.appendChild(el("span", { class: "map-legend-item", text: "→ lines = prerequisites" }));
      legend.appendChild(el("span", { class: "map-legend-item", text: "left → right: foundations → advanced" }));
    } else {
      [masteryLegendDot("not-started"), masteryLegendDot("learning"), masteryLegendDot("keepgoing"), masteryLegendDot("mastered"), masteryLegendDot("due")].forEach(function (x) { legend.appendChild(x); });
      legend.appendChild(el("span", { class: "map-legend-item" }, [el("span", { class: "legend-ready" }), document.createTextNode("Ready now (glowing)")]));
      legend.appendChild(el("span", { class: "map-legend-item", text: "→ lines = prerequisites" }));
    }
    root.appendChild(legend);
    root.appendChild(footer());
    mount(root);
  }
  function legendDot(color, filled, text) {
    var d = el("span", { class: "map-legend-item" });
    var dot = el("span", { class: "legend-dot" }); dot.style.background = filled ? color : "var(--surface)"; dot.style.borderColor = color;
    d.appendChild(dot); d.appendChild(document.createTextNode(text)); return d;
  }
  function masteryLegendDot(lvl) {
    var m = MASTERY[lvl];
    var d = el("span", { class: "map-legend-item" });
    var dot = el("span", { class: "legend-dot" }); dot.style.background = m.fill ? m.dot : "var(--surface)"; dot.style.borderColor = m.dot;
    d.appendChild(dot); d.appendChild(document.createTextNode(m.label)); return d;
  }

  /* ========================================================================
     VIEW: CONCEPT MAP — the evolving, grade-anchored chart (math slice, beta)
     A *concept* is a thread of grade-stamped rungs (existing KPs). The chart is
     a function of (grade + real mastery): each thread shows its deepest rung ≤
     the chosen grade, mastered threads collapse (fold, not hide), and the ready
     frontier glows. This turns the spiral's repetition into visible deepening
     and replaces the 199-node hairball with ~42 threads you can actually read.
     ====================================================================== */
  var GRADE_COL_C = { "6": "#9db8f7", "7": "#6b8cf0", "8": "#4f6ad6", "9": "#3f57c4", "10": "#334aa6", "11": "#2b3a86", "12": "#26307a" };
  function conceptDefaultGrade(data) {
    // meet the student where they are: the highest grade at which they've learned a rung, else 6
    var g = 6;
    data.concepts.forEach(function (c) { c.rungs.forEach(function (r) { if (P.kps && P.kps[r.kpId] && P.kps[r.kpId].done) g = Math.max(g, r.grade); }); });
    return String(g);
  }
  function viewConceptMap(subjKey) {
    subjKey = subjKey || "math";
    var s = subjectByKey(subjKey);
    var data = (KM.concepts || {})[subjKey];
    var root = el("div", { class: TCLASS[subjKey] || "" });
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Knowledge Map", href: "#/map" }, { label: (s ? s.name : subjKey) + " · Concepts" }]));
    if (!data) {
      root.appendChild(el("div", { class: "hero" }, [el("h1", { html: "🧵 Concept threads <span class='cbeta'>beta</span>" })]));
      root.appendChild(emptyBox("The evolving concept chart is a math-only beta for now. Open it from the Math map."));
      root.appendChild(el("a", { class: "btn", href: "#/concepts/math", text: "Go to the Math concept chart →" }));
      root.appendChild(footer()); return mount(root);
    }
    var color = SUBJ_COLOR[subjKey] || "#4f6ef7";
    var grade = Number(sessionGet("conceptGrade") || conceptDefaultGrade(data));
    var allConcepts = data.concepts, byId = {}; allConcepts.forEach(function (c) { byId[c.id] = c; });
    var strandName = {}; (data.strands || []).forEach(function (x) { strandName[x.key] = x.name; });
    // discipline lens: focus on one strand (crosscutting threads always show through)
    var strandKeys = (data.strands || []).filter(function (x) { return allConcepts.some(function (c) { return c.strand === x.key; }); });
    var focusKeyName = "conceptFocus-" + subjKey, focus = sessionGet(focusKeyName) || "all";
    if (focus !== "all" && !strandKeys.some(function (x) { return x.key === focus; })) focus = "all";
    var concepts = focus === "all" ? allConcepts : allConcepts.filter(function (c) { return c.strand === focus || c.crosscutting; });
    var strandsAvailable = allConcepts.some(function (c) { return c.transfer && c.transfer.length; });

    // ---- per-concept state at the chosen grade ----
    // Normally from REAL progress. "Preview mode" instead SIMULATES mastery of every
    // rung below the chosen grade (never touches P) so the evolving/folding behaviour
    // is visible on a fresh, empty account — the way to actually evaluate the idea.
    var sim = sessionGet("conceptSim") === "1";
    function rungLearned(r) { return sim ? r.grade < grade : !!(P.kps && P.kps[r.kpId] && P.kps[r.kpId].done); }
    function rungDeep(r) { return sim ? r.grade < grade : isMastered(r.kpId); }
    function visRungs(c) { return c.rungs.filter(function (r) { return r.grade <= grade; }); }
    var stateMemo = {};
    allConcepts.forEach(function (c) {
      var vis = visRungs(c);
      if (!vis.length) { stateMemo[c.id] = { code: "upcoming", vis: vis, cur: null, learned: 0, deep: 0 }; return; }
      var learned = vis.filter(rungLearned).length;
      var deep = vis.filter(rungDeep).length;
      var attempted = sim ? learned > 0 : vis.some(function (r) { var st = conceptState(KM.kps[r.kpId]); return st !== "ready" && st !== "locked"; });
      var code = learned === vis.length ? "mastered" : (learned > 0 || attempted ? "learning" : "notstarted");
      stateMemo[c.id] = { code: code, vis: vis, cur: vis[vis.length - 1], learned: learned, deep: deep };
    });
    function conceptMasteredAt(id) { var m = stateMemo[id]; return !!(m && m.code === "mastered"); }
    function isFrontier(c) { var m = stateMemo[c.id]; if (!m.cur || m.code === "mastered") return false; return c.prereqConcepts.every(conceptMasteredAt); }

    // ---- layout: column = longest prereq chain (x); stacked within column (y) ----
    var maxCol = concepts.reduce(function (mx, c) { return Math.max(mx, c.col); }, 0);
    var colLists = {};
    concepts.slice().sort(function (a, b) { return ((a.entryGrade || 0) - (b.entryGrade || 0)) || a.title.localeCompare(b.title); })
      .forEach(function (c) { (colLists[c.col] = colLists[c.col] || []).push(c); });
    var NODE_W = 176, colGap = 212, rowGap = 118, padX = 18, padTop = 14;
    var maxRows = 1; Object.keys(colLists).forEach(function (k) { maxRows = Math.max(maxRows, colLists[k].length); });
    var innerH = maxRows * rowGap, W = padX * 2 + (maxCol + 1) * colGap, H = padTop * 2 + innerH;
    var pos = {};
    Object.keys(colLists).forEach(function (col) {
      var list = colLists[col], n = list.length;
      list.forEach(function (c, i) { pos[c.id] = { x: padX + Number(col) * colGap + colGap / 2, y: padTop + innerH * (i + 1) / (n + 1) }; });
    });

    // ---- header + grade rail + consolidation checkpoint ----
    var masteredN = concepts.filter(function (c) { return stateMemo[c.id].code === "mastered"; }).length;
    var frontierN = concepts.filter(isFrontier).length;
    var activeN = concepts.filter(function (c) { return stateMemo[c.id].code !== "upcoming"; }).length;
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { html: s.emoji + " " + esc(s.name) + " — Concept threads <span class='cbeta'>beta</span>" }),
      el("p", { html: "The same ideas, organized by <b>concept</b> instead of grade. Each card is one thread that <b>deepens as you climb the grades</b>; the chart redraws itself for the grade you pick. Master a thread and it folds away — so you always see your <b>frontier</b>, not a tangled hairball of every topic at once." })
    ]));
    // toggle back to the KP knowledge map
    var toggle = el("div", { class: "map-toggle" });
    toggle.appendChild(el("button", { class: "map-tab active", text: "🧵 Concept threads" }));
    toggle.appendChild(el("button", { class: "map-tab", text: "🕸️ Knowledge map", onclick: function () { location.hash = "#/map/" + subjKey; } }));
    root.appendChild(toggle);

    // discipline lens — focus the chart on one strand (e.g. science's Biology / Chemistry / …)
    if (strandKeys.length > 2) {
      var flt = el("div", { class: "cfocus" });
      flt.appendChild(el("span", { class: "cfocus-label", text: "Focus:" }));
      flt.appendChild(el("button", { class: "cgbtn" + (focus === "all" ? " on" : ""), text: "All",
        onclick: function () { sessionSet(focusKeyName, "all"); render(); } }));
      strandKeys.forEach(function (x) {
        flt.appendChild(el("button", { class: "cgbtn" + (focus === x.key ? " on" : ""), text: x.name,
          onclick: function () { sessionSet(focusKeyName, x.key); render(); } }));
      });
      root.appendChild(flt);
      if (focus !== "all") {
        var xcNames = allConcepts.filter(function (c) { return c.crosscutting && c.strand !== focus; }).map(function (c) { return c.title; });
        root.appendChild(el("div", { class: "crail-hint", html: "Showing <b>" + esc(strandName[focus] || focus) + "</b> threads" + (xcNames.length ? " plus the <b>✦ crosscutting</b> " + (xcNames.length === 1 ? "thread" : "threads") + " (" + xcNames.map(esc).join(", ") + ") that run through it" : "") + ". Tap <b>All</b> to see every strand at once." }));
      }
    }

    var rail = el("div", { class: "crail" });
    GRADES.forEach(function (g) {
      rail.appendChild(el("button", { class: "cgbtn" + (Number(g) === grade ? " on" : ""), text: "Grade " + g,
        onclick: function () { sessionSet("conceptGrade", g); render(); } }));
    });
    // Preview-mode toggle: simulate mastery through the chosen grade (no writes to real progress)
    rail.appendChild(el("button", { class: "cgbtn csim" + (sim ? " on" : ""), html: (sim ? "● " : "○ ") + "Preview mode",
      title: "Simulate mastery of everything below the chosen grade, so you can see the chart fold and evolve without any real progress. Doesn't change your data.",
      onclick: function () {
        var on = !(sessionGet("conceptSim") === "1");
        sessionSet("conceptSim", on ? "1" : "0");
        if (on && Number(sessionGet("conceptGrade") || grade) <= 6) sessionSet("conceptGrade", "9"); // jump somewhere with folds to show
        render();
      } }));
    root.appendChild(rail);
    root.appendChild(el("div", { class: "crail-hint", html: sim
      ? "<b>Preview mode is on</b> — the chart is simulating mastery of every rung below Grade " + grade + " so you can watch threads fold and the frontier advance. Your real progress is untouched; slide the grades to see it evolve."
      : "Slide along the grades to watch the chart evolve. On a fresh account nothing is mastered yet — tap <b>Preview mode</b> to simulate progress and see threads fold." }));

    root.appendChild(el("div", { class: "ccheckpoint" }, [
      el("div", { class: "ck-emoji", text: masteredN ? "🗂️" : "🧭" }),
      el("div", {}, [
        el("div", { html: "<b>Grade " + grade + " checkpoint.</b> " + activeN + " of " + concepts.length + " threads are in play — <b>" + masteredN + "</b> folded away as mastered" + (frontierN ? ", <b>" + frontierN + "</b> ready now" : "") + "." }),
        el("div", { class: "ck-sub", text: "Each grade is a chance to consolidate: fold what you know into a cleaner, deeper chart, then push the frontier one thread further." })
      ])
    ]));

    // ---- the chart (SVG edges under absolutely-positioned concept cards) ----
    var scroll = el("div", { class: "cmap-scroll" });
    var chart = el("div", { class: "cchart" }); chart.style.width = W + "px"; chart.style.height = H + "px";
    var svg = svgEl("svg", { class: "cedges", viewBox: "0 0 " + W + " " + H, width: W, height: H });
    chart.appendChild(svg);
    var edgeEls = [];
    concepts.forEach(function (c) {
      var b = pos[c.id]; if (!b) return;
      c.prereqConcepts.forEach(function (pid) {
        var a = pos[pid]; if (!a) return;
        var x1 = a.x + NODE_W / 2 - 8, x2 = b.x - NODE_W / 2 + 8, dx = (x2 - x1) / 2;
        var on = conceptMasteredAt(pid);
        var path = svgEl("path", { d: "M" + x1 + " " + a.y + " C" + (x1 + dx) + " " + a.y + "," + (x2 - dx) + " " + b.y + "," + x2 + " " + b.y,
          fill: "none", stroke: on ? "#17b890" : "var(--line)", "stroke-width": on ? 2.5 : 1.5, opacity: on ? 0.9 : 0.5 });
        path._from = pid; path._to = c.id; svg.appendChild(path); edgeEls.push(path);
      });
    });

    var nodeEls = {};
    concepts.forEach(function (c) {
      var p = pos[c.id]; if (!p) return;
      var m = stateMemo[c.id], up = m.code === "upcoming", front = isFrontier(c);
      var xc = c.crosscutting ? "✦ " : "";
      var node = el("div", { class: "cnode " + m.code + (front ? " frontier" : "") + (c.crosscutting ? " xc" : "") });
      node.style.left = p.x + "px"; node.style.top = p.y + "px";
      if (up) {
        node.appendChild(el("div", { class: "cn-t", html: xc + esc(c.title) }));
        node.appendChild(el("div", { class: "cn-g", text: "▸ introduced Grade " + (c.entryGrade || "?") }));
      } else if (m.code === "mastered") {
        node.appendChild(el("div", { class: "cn-t", html: "✓ " + xc + esc(c.title) }));
        node.appendChild(el("div", { class: "cn-g", text: "mastered · folded" }));
      } else {
        var idx = m.vis.length, tot = c.rungs.length, dotcls = m.learned > 0 ? "learning" : "";
        var t = el("div", { class: "cn-t" }, [el("span", { html: xc + esc(c.title) })]);
        if (front) t.appendChild(el("span", { class: "cn-badge", text: "READY" }));
        t.appendChild(el("span", { class: "cn-dot " + dotcls }));
        node.appendChild(t);
        node.appendChild(el("div", { class: "cn-g", text: "Grade " + m.cur.grade + " · rung " + idx + " of " + tot }));
        node.appendChild(el("div", { class: "cn-r", html: inlineMath(esc(m.cur.title)) }));
        var bar = el("div", { class: "cn-bar" }, el("i"));
        bar.firstChild.style.width = Math.round(m.learned / m.vis.length * 100) + "%";
        node.appendChild(bar);
      }
      node.addEventListener("click", function () { selectConcept(c.id); });
      chart.appendChild(node); nodeEls[c.id] = node;
    });
    scroll.appendChild(chart); root.appendChild(scroll);

    // legend
    var legend = el("div", { class: "map-legend" });
    legend.appendChild(el("span", { class: "map-legend-item" }, [el("span", { class: "legend-ready" }), document.createTextNode("Ready now (glowing)")]));
    [["#e8a400", "Learning"], ["#17b890", "Mastered (folds)"], ["var(--line)", "Upcoming (later grade)"]].forEach(function (x) {
      var it = el("span", { class: "map-legend-item" }); var d = el("span", { class: "legend-dot" }); d.style.background = x[0]; d.style.borderColor = x[0];
      it.appendChild(d); it.appendChild(document.createTextNode(x[1])); legend.appendChild(it);
    });
    legend.appendChild(el("span", { class: "map-legend-item", text: "→ lines = prerequisite concepts" }));
    root.appendChild(legend);

    // ---- entry to the synthesis / tool-choice layer ----
    if (strandsAvailable) {
      root.appendChild(el("div", { class: "map-banner", style: "background:linear-gradient(120deg,#f4813f,#ef5f6b 55%,#9b5de5)", onclick: function () { location.hash = "#/mixed/" + subjKey; } }, [
        el("div", { class: "mb-emoji", text: "🎲" }),
        el("div", { class: "mb-body" }, [
          el("div", { class: "mb-title", text: "Mixed challenge — diagnose the tool" }),
          el("div", { class: "mb-sub", text: "Transfer problems from a whole strand, interleaved and unlabelled. The hard part is knowing which idea each one needs." })
        ]),
        el("div", { class: "mb-go", text: "Open →" })
      ]));
    }

    // ---- detail panel (rung ladder + mastery gate), filled on select ----
    var detail = el("div", { class: "panel cdetail", id: "cdetail", style: "display:none" });
    root.appendChild(detail);
    root.appendChild(footer());
    mount(root);

    function selectConcept(id) {
      sessionSet("conceptSel", id);
      Object.keys(nodeEls).forEach(function (k) { nodeEls[k].classList.toggle("sel", k === id); });
      edgeEls.forEach(function (e) {
        var lit = e._to === id;
        e.setAttribute("stroke", lit ? color : (conceptMasteredAt(e._from) ? "#17b890" : "var(--line)"));
        e.setAttribute("stroke-width", lit ? 3 : (conceptMasteredAt(e._from) ? 2.5 : 1.5));
        e.setAttribute("opacity", lit ? 1 : (conceptMasteredAt(e._from) ? 0.9 : 0.28));
      });
      renderDetail(id);
      detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    function renderDetail(id) {
      var c = byId[id], m = stateMemo[id]; clear(detail); detail.style.display = "block";
      detail.appendChild(el("div", { class: "cd-strand", text: (strandName[c.strand] || c.strand) }));
      detail.appendChild(el("h2", { style: "margin:.15em 0 .1em", html: esc(c.title) }));
      detail.appendChild(el("p", { style: "color:var(--ink-soft);margin:0 0 6px", html: inlineMath(esc(c.gist)) }));
      if (c.prereqConcepts.length) {
        var pre = el("div", { class: "cd-pre" }, [el("span", { text: "Builds on: " })]);
        c.prereqConcepts.forEach(function (pid) {
          if (!byId[pid]) return;
          pre.appendChild(el("span", { class: "cd-chip" + (conceptMasteredAt(pid) ? "" : ""), text: (conceptMasteredAt(pid) ? "✓ " : "") + byId[pid].title, onclick: function () { selectConcept(pid); } }));
        });
        detail.appendChild(pre);
      }
      // the deepening ladder — every rung, real mastery, links to the real KP page
      detail.appendChild(el("div", { class: "eyebrow", style: "margin-top:12px", text: "How it deepens across the grades" }));
      var ladder = el("div", { class: "cladder" });
      c.rungs.forEach(function (r) {
        var future = r.grade > grade, learned = rungLearned(r), deep = rungDeep(r), cur = m.cur && r.kpId === m.cur.kpId;
        var row = el("div", { class: "crung" + (future ? " future" : "") + (cur ? " cur" : "") });
        var gb = el("div", { class: "cr-grade", text: "G" + r.grade }); if (!future) gb.style.setProperty("--gcol", GRADE_COL_C[String(r.grade)] || color);
        row.appendChild(gb);
        var body = el("div", { class: "cr-body", style: "flex:1" }, [
          el("a", { href: "#/kp/" + r.kpId, html: inlineMath(esc(r.title)) }),
          future ? el("span", { class: "mi-g", text: "  · not yet on your chart" }) : null
        ]);
        if (r.note) body.appendChild(el("div", { class: "cr-note", text: r.note }));
        row.appendChild(body);
        row.appendChild(el("div", { class: "cr-mdot" + (deep ? " deep" : learned ? " done" : ""), title: deep ? "Mastered (survived spaced review / stretch)" : learned ? "Learned" : "Not done yet" }));
        ladder.appendChild(row);
      });
      detail.appendChild(ladder);
      // mastery gate (real progress) + the attemptable Transfer tier
      renderGate(c, m);
    }
    function tierCard(label, meta, coming) {
      return el("div", { class: "ctier" + (coming ? " coming" : "") }, [el("h4", { text: label }), el("div", { class: "ct-meta", html: meta })]);
    }
    function renderGate(c, m) {
      var tot = m.vis.length;
      var gateHost = el("div"); detail.appendChild(gateHost); // tiers + gate; repainted when a transfer problem is solved
      function realSolved() { return (c.transfer || []).filter(function (p) { return P.stretch && P.stretch[p.id] && P.stretch[p.id].solved; }).length; }
      function paint() {
        clear(gateHost);
        if (!tot) {
          gateHost.appendChild(el("div", { class: "cgate" }, [el("div", { class: "cg-big", text: "🔭" }),
            el("div", {}, [el("b", { text: "Not on your chart yet." }), el("div", { class: "cg-sub", text: "This thread is introduced in Grade " + (c.entryGrade || "?") + ". Reach that grade and its first rung appears." })])]));
          return;
        }
        var hasT = (c.transfer || []).length, target = c.transferTarget || 0;
        var rs = realSolved(), solved = (sim && m.code === "mastered") ? target : rs;
        var transferCleared = hasT ? solved >= target : true;
        var gateOpen = m.learned === tot && m.deep === tot && transferCleared;
        gateHost.appendChild(el("div", { class: "ctiers" }, [
          tierCard("🟢 Fluency & Application", "<b>" + m.learned + "</b> / " + tot + " rungs practiced", false),
          tierCard("🔁 Retention", "<b>" + m.deep + "</b> / " + tot + " survived spaced review", false),
          hasT ? tierCard("🟠 Transfer", "<b>" + solved + "</b> / " + target + " transfer problems cleared", false)
               : tierCard("🟠 Transfer", "the hard set — authored next", true)
        ]));
        var gate = el("div", { class: "cgate" + (gateOpen ? " open" : "") });
        if (gateOpen) {
          gate.appendChild(el("div", { class: "cg-big", text: "★" }));
          gate.appendChild(el("div", {}, [el("b", { text: "Thread mastered through Grade " + grade + "." }),
            el("div", { class: "cg-sub", html: "Learned, survived spaced retrieval" + (hasT ? ", <b>and</b> cleared the transfer set" : "") + " — so the card folds away. Mastery = it <i>sticks</i>, not that you finished it." })]));
        } else {
          var needLearn = tot - m.learned, needDeep = m.learned - m.deep, needT = hasT ? Math.max(0, target - solved) : 0;
          gate.appendChild(el("div", { class: "cg-big", text: "🔒" }));
          gate.appendChild(el("div", {}, [el("b", { text: "The ★ is earned, not given." }),
            el("div", { class: "cg-sub", html: (needLearn > 0 ? "<b>" + needLearn + "</b> rung" + (needLearn === 1 ? "" : "s") + " still to learn. " : "") + (needDeep > 0 ? "<b>" + needDeep + "</b> waiting on a spaced-review pass (come back in a few days). " : "") + (hasT ? (needT > 0 ? "<b>" + needT + "</b> more transfer problem" + (needT === 1 ? "" : "s") + " to clear — the real bar." : "Transfer cleared. ✓") : "The <b>Transfer</b> tier — the hard, mixed problems that are the real bar — is authored next.") })]));
        }
        gateHost.appendChild(gate);
      }
      paint();
      // the attemptable transfer set (built once; solving one repaints the gate in place)
      if ((c.transfer || []).length) {
        var toggle = el("button", { class: "btn ghost", style: "margin-top:12px", text: "🟠 Attempt the transfer set (" + realSolved() + "/" + c.transfer.length + " solved) →" });
        var box = el("div", { style: "display:none;margin-top:10px" });
        toggle.addEventListener("click", function () {
          if (!box._built) {
            box.appendChild(stretchTimingNote());
            c.transfer.forEach(function (p) { box.appendChild(renderChallenge(p, { onSolved: function () { paint(); toggle.textContent = "🟠 Transfer set (" + realSolved() + "/" + c.transfer.length + " solved) — keep going →"; } })); });
            box._built = true;
          }
          var open = box.style.display === "none";
          box.style.display = open ? "block" : "none";
          if (!open) toggle.textContent = "🟠 Attempt the transfer set (" + realSolved() + "/" + c.transfer.length + " solved) →";
        });
        detail.appendChild(toggle); detail.appendChild(box);
      }
    }

    // restore a prior selection (survives grade changes)
    var savedSel = sessionGet("conceptSel");
    if (savedSel && byId[savedSel]) selectConcept(savedSel);
  }

  /* ========================================================================
     VIEW: MIXED CHALLENGE — synthesis / tool-choice (concept NOT named)
     Interleaves the Transfer-tier problems across a whole strand and presents
     them UNLABELLED, so the student must DIAGNOSE which tool each one needs —
     the judgment per-concept practice can't train. Same problem ids, so a solve
     here also advances that concept's transfer tier + spaced-review queue.
     ====================================================================== */
  function strandsWithTransfer(data) {
    var byStrand = {};
    data.concepts.forEach(function (c) { if (c.transfer && c.transfer.length) (byStrand[c.strand] = byStrand[c.strand] || []).push(c); });
    return byStrand;
  }
  function viewMixedChallenge(subjKey, strandKey) {
    subjKey = subjKey || "math";
    var data = (KM.concepts || {})[subjKey], s = subjectByKey(subjKey);
    if (!data || !s) return notFound();
    var byStrand = strandsWithTransfer(data);
    var strandName = {}; (data.strands || []).forEach(function (x) { strandName[x.key] = x.name; });

    function solvedCount(list) { return list.filter(function (p) { return P.stretch && P.stretch[p.id] && P.stretch[p.id].solved; }).length; }
    if (!strandKey || !byStrand[strandKey]) {
      // picker: choose a strand to mix
      var root0 = el("div", { class: TCLASS[subjKey] || "" });
      root0.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: "Knowledge Map", href: "#/map" }, { label: s.name + " · Concepts", href: "#/concepts/" + subjKey }, { label: "Mixed challenge" }]));
      root0.appendChild(el("div", { class: "hero" }, [
        el("h1", { html: "🎲 Mixed challenge <span class='cbeta'>beta</span>" }),
        el("p", { html: "Per-concept practice quietly tells you which tool to use. <b>This doesn't.</b> Your transfer problems come back <b>interleaved and unlabelled</b> — so the real work is diagnosing <i>which idea each one needs</i> before you can solve it. That judgment is the thing a real test actually measures." })
      ]));
      var grid = el("div", { class: "grid subjects" });
      (data.strands || []).forEach(function (st) {
        var cs = byStrand[st.key]; if (!cs) return;
        var all = cs.reduce(function (a, c) { return a.concat(c.transfer); }, []);
        var synN = (((KM.synthesis || {})[subjKey] || {})[st.key] || []).length;
        var card = el("div", { class: "card subject-card " + (TCLASS[subjKey] || ""), onclick: function () { location.hash = "#/mixed/" + subjKey + "/" + st.key; } });
        card.appendChild(el("div", { class: "accent-bar" }));
        card.appendChild(el("h3", { text: st.name }));
        card.appendChild(el("div", { class: "meta" }, [el("span", { class: "chip", text: cs.length + " concepts" }), el("span", { class: "chip", text: all.length + " problems" }), synN ? el("span", { class: "chip accent", text: "🧬 " + synN + " synthesis" }) : null]));
        card.appendChild(progressRow(Math.round(solvedCount(all) / (all.length || 1) * 100), solvedCount(all) + " / " + all.length + " solved"));
        grid.appendChild(card);
      });
      root0.appendChild(grid);
      root0.appendChild(footer()); return mount(root0);
    }

    // interleave: round-robin across the strand's concepts (adjacent items = different tools)
    var cs = byStrand[strandKey].slice().sort(function (a, b) { return a.col - b.col || a.title.localeCompare(b.title); });
    var pool = [], i = 0, added = true, MAX = 12;
    while (added && pool.length < MAX) { added = false; cs.forEach(function (c) { if (c.transfer[i]) { pool.push({ prob: c.transfer[i], concept: c }); added = true; } }); i++; }
    pool = pool.slice(0, MAX);

    var root = el("div", { class: TCLASS[subjKey] || "" });
    root.appendChild(crumbs([{ label: "Home", href: "#/" }, { label: s.name + " · Concepts", href: "#/concepts/" + subjKey }, { label: "Mixed challenge", href: "#/mixed/" + subjKey }, { label: strandName[strandKey] || strandKey }]));
    root.appendChild(el("div", { class: "hero" }, [
      el("h1", { html: "🎲 Mixed: " + esc(strandName[strandKey] || strandKey) }),
      el("p", { html: "Problems from <b>" + cs.length + " different concepts</b> in this strand, shuffled together and <b>not labelled</b>. For each: first ask <i>which idea does this need?</i>, then solve. The concept is revealed only once you crack it (or tap “Which idea is this?” if you're stuck)." })
    ]));
    root.appendChild(stretchTimingNote());
    var solvedN = pool.filter(function (x) { return P.stretch && P.stretch[x.prob.id] && P.stretch[x.prob.id].solved; }).length;
    root.appendChild(el("div", { class: "panel", style: "margin-bottom:16px" }, progressRow(Math.round(solvedN / (pool.length || 1) * 100), solvedN + " of " + pool.length + " diagnosed & solved")));
    var host = el("div", { class: "panel" });
    host.appendChild(el("div", { class: "eyebrow", text: "Interleaved — diagnose the tool, then solve" }));
    pool.forEach(function (x) {
      var wrap = el("div", { class: "mixed-item" });
      var reveal = el("div", { class: "mixed-reveal" });
      function showConcept() { clear(reveal); reveal.appendChild(el("div", { class: "mixed-tag", html: "🧭 This one drew on <b>" + esc(x.concept.title) + "</b> · <a href='#/concepts/" + subjKey + "'>see the thread</a>" })); }
      wrap.appendChild(renderChallenge(x.prob, { onSolved: function () { showConcept(); } }));
      var peek = el("button", { class: "btn ghost mixed-peek", text: "🧭 Which idea is this?", onclick: showConcept });
      reveal.appendChild(peek);
      wrap.appendChild(reveal);
      host.appendChild(wrap);
    });
    root.appendChild(host);

    // ---- SYNTHESIS: problems that need MORE THAN ONE idea at once (the hardest tier) ----
    var synth = ((KM.synthesis || {})[subjKey] || {})[strandKey] || [];
    if (synth.length) {
      var sSolved = synth.filter(function (p) { return P.stretch && P.stretch[p.id] && P.stretch[p.id].solved; }).length;
      root.appendChild(el("div", { class: "section-title", style: "margin-top:24px" }, [el("span", { text: "🧬 Synthesis — combine more than one idea" }), el("span", { class: "line" }), el("span", { class: "pill-count", text: sSolved + " / " + synth.length })]));
      root.appendChild(el("p", { class: "crail-hint", style: "margin-top:0", html: "The hardest tier. Each of these needs <b>two or three ideas working together at once</b> — and, as always, won't tell you which. Diagnose the <i>combination</i>, then solve." }));
      var shost = el("div", { class: "panel" });
      synth.forEach(function (p) {
        var wrap = el("div", { class: "mixed-item" });
        var reveal = el("div", { class: "mixed-reveal" });
        function showConcepts() { clear(reveal); reveal.appendChild(el("div", { class: "mixed-tag synth", html: "🧬 This combined <b>" + (p.concepts || []).map(function (c) { return esc(c.title); }).join("</b> + <b>") + "</b> · <a href='#/concepts/" + subjKey + "'>see the threads</a>" })); }
        wrap.appendChild(renderChallenge(p, { onSolved: function () { showConcepts(); } }));
        var peek = el("button", { class: "btn ghost mixed-peek", text: "🧬 Which ideas does this need?", onclick: showConcepts });
        reveal.appendChild(peek);
        wrap.appendChild(reveal);
        shost.appendChild(wrap);
      });
      root.appendChild(shost);
    }

    root.appendChild(footer()); mount(root);
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
      el("div", { style: "margin-top:4px", text: "Built for curious minds in grades 6–12" })
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
      case "challenge": return viewChallengeSet(parts[1]);
      case "review": return viewReview();
      case "next": return viewNext();
      case "progress": return viewProgress();
      case "final": return viewFinal(parts[1], parts[2] || "7");
      case "practicetest": return viewPracticeTest(parts[1]);
      case "print": return viewPrint(parts[1]);
      case "map": return parts[1] === "connections" ? viewConnections() : viewMap(parts[1]);
      case "concepts": return viewConceptMap(parts[1]);
      case "mixed": return viewMixedChallenge(parts[1], parts[2]);
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
