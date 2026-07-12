/* ===========================================================================
   Knowledge Map — spaced-review scheduler (pure logic)
   A tiny Leitner-box scheduler. It holds NO state of its own and never touches
   localStorage — app.js owns the progress object and passes in the review map
   plus the current time. That keeps persistence in one place and makes this
   testable in isolation.

   A review map looks like:  { "<kpId>": { box, due, seen, born } }
     box  — Leitner box 0..N. 0 = just learned, not yet spaced-reviewed.
     due  — timestamp (ms) the concept is next due for retrieval.
     seen — timestamp of the last review.
     born — timestamp it first entered the queue.
   A concept "graduates" (is retained for good) once its box reaches the last
   interval — i.e. it was recalled correctly across every spacing gap.
   =========================================================================== */
(function () {
  var DAY = 86400000;
  // Days to wait before the NEXT review after reaching each box (1..N).
  // Matches the ladder: 1 day → 3 days → 7 days → 21 days.
  var INTERVALS = [1, 3, 7, 21];
  var MAX_BOX = INTERVALS.length; // box === MAX_BOX ⇒ graduated / mastered

  function enqueue(map, id, now) {
    if (!map[id]) map[id] = { box: 0, due: now + INTERVALS[0] * DAY, seen: 0, born: now };
    return map[id];
  }
  function dueIds(map, now) {
    return Object.keys(map).filter(function (id) { return !graduated(map[id]) && map[id].due <= now; });
  }
  function pendingIds(map) {
    return Object.keys(map).filter(function (id) { return !graduated(map[id]); });
  }
  function nextDue(map) {
    var t = null;
    Object.keys(map).forEach(function (id) {
      if (graduated(map[id])) return;
      if (t == null || map[id].due < t) t = map[id].due;
    });
    return t;
  }
  // Grade a retrieval attempt: correct promotes a box, a miss knocks it back down.
  function grade(map, id, ok, now) {
    var e = enqueue(map, id, now);
    if (ok) e.box = Math.min(e.box + 1, MAX_BOX);
    else e.box = Math.max(0, e.box - 1);
    e.seen = now;
    var idx = Math.min(Math.max(e.box, 1), INTERVALS.length) - 1;
    e.due = now + INTERVALS[idx] * DAY;
    return e;
  }
  function graduated(e) { return !!e && e.box >= MAX_BOX; }

  // Human label for when something is due, relative to now.
  function whenLabel(due, now) {
    var d = due - now;
    if (d <= 0) return "due now";
    var days = Math.round(d / DAY);
    if (days <= 0) return "later today";
    if (days === 1) return "tomorrow";
    return "in " + days + " days";
  }

  window.KMReview = {
    DAY: DAY, INTERVALS: INTERVALS, MAX_BOX: MAX_BOX,
    enqueue: enqueue, dueIds: dueIds, pendingIds: pendingIds,
    nextDue: nextDue, grade: grade, graduated: graduated, whenLabel: whenLabel
  };
})();
