(function () {
  'use strict';

  /* ── Year ──────────────────────────────────── */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Reduced motion ────────────────────────── */
  var reducedMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ── Scroll reveals ────────────────────────── */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Count-up ──────────────────────────────── */
  function easeOutQuad(t) { return t * (2 - t); }

  function animateCount(el, target, duration) {
    if (reducedMotion) { el.textContent = target; return; }
    var start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOutQuad(p) * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  var numsSection = document.getElementById('numbers');
  var numsFired = false;
  if (numsSection && 'IntersectionObserver' in window) {
    var numsObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !numsFired) {
        numsFired = true;
        document.querySelectorAll('.stat-val').forEach(function (el) {
          animateCount(el, parseInt(el.getAttribute('data-target'), 10), 1800);
        });
        numsObs.disconnect();
      }
    }, { threshold: 0.3 });
    numsObs.observe(numsSection);
  }

  /* ── FAQ accordion ─────────────────────────── */
  document.querySelectorAll('.faq-btn').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    var inner = panel.querySelector('.faq-inner');
    if (inner) inner.setAttribute('aria-hidden', 'true');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
      if (inner) inner.setAttribute('aria-hidden', String(open));
    });
  });

  /* ── Toast ─────────────────────────────────── */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  /* ── Clipboard copy ────────────────────────── */
  function bindCopy(id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var text = '@ziloky';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.classList.add('copied');
          showToast('Copied to clipboard');
          setTimeout(function () { btn.classList.remove('copied'); }, 2200);
        }).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        if (ok) {
          btn.classList.add('copied');
          showToast('Copied to clipboard');
          setTimeout(function () { btn.classList.remove('copied'); }, 2200);
        } else {
          showToast('Copy @ziloky manually');
        }
      }
    });
  }
  bindCopy('copyDiscord');
  bindCopy('copyHero');

  /* ── Magnetic CTA ──────────────────────────── */
  function magnetic(id) {
    var el = document.getElementById(id);
    if (!el || reducedMotion) return;
    var leaveTimer;
    el.addEventListener('mousemove', function (e) {
      clearTimeout(leaveTimer);
      el.style.transition = '';
      var r = el.getBoundingClientRect();
      var dx = Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width  / 2)) * 0.25));
      var dy = Math.max(-8, Math.min(8, (e.clientY - (r.top  + r.height / 2)) * 0.25));
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transition = 'transform 0.4s ease-out';
      el.style.transform = 'translate(0,0)';
      leaveTimer = setTimeout(function () { el.style.transition = ''; }, 400);
    });
  }
  magnetic('copyDiscord');
  magnetic('copyHero');

}());
