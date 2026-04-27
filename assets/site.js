(function(){
  'use strict';

  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');

  var moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  var sunIcon = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>';

  function setTheme(mode){
    root.setAttribute('data-theme', mode);
    themeIcon.innerHTML = mode === 'dark' ? moonIcon : sunIcon;
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    try { localStorage.setItem('theme', mode); } catch(e) {}
  }

  var savedTheme = 'dark';
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      savedTheme = stored;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      savedTheme = 'light';
    }
  } catch(e) {}
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function(){
      var current = root.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Copy-to-clipboard for Discord handle
  var copyBtn = document.getElementById('copyDiscord');
  var toast = document.getElementById('toast');
  var toastTimer;

  function showToast(message){
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){
      toast.classList.remove('show');
    }, 2200);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async function(){
      var username = 'ziloky';
      var copied = false;
      try {
        await navigator.clipboard.writeText(username);
        copied = true;
      } catch(e) {
        var textarea = document.createElement('textarea');
        textarea.value = username;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try { copied = document.execCommand('copy'); } catch(err){}
        document.body.removeChild(textarea);
      }

      if (copied) {
        copyBtn.classList.add('copied');
        showToast('Copied “ziloky” to clipboard');
        setTimeout(function(){ copyBtn.classList.remove('copied'); }, 2200);
      } else {
        showToast('Couldn’t copy — long-press to select instead');
      }
    });
  }

  // FAQ accordion (one-open-at-a-time)
  var faqButtons = document.querySelectorAll('.faq-q');
  faqButtons.forEach(function(button){
    var panelId = button.getAttribute('aria-controls');
    var panel = panelId ? document.getElementById(panelId) : null;

    button.addEventListener('click', function(){
      var isOpen = button.getAttribute('aria-expanded') === 'true';

      faqButtons.forEach(function(other){
        var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
        other.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.hidden = true;
      });

      if (!isOpen && panel) {
        button.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Scroll-triggered reveal for major content blocks.
  var revealEls = document.querySelectorAll('[data-reveal]');
  var prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  }

  // Testimonials loader. Renders cards from /data/testimonials.json if it has
  // entries; otherwise the markup keeps its server-rendered empty state.
  var mount = document.getElementById('testimonials-mount');
  if (mount && 'fetch' in window) {
    var src = mount.getAttribute('data-testimonials-src');
    if (src) {
      fetch(src, { cache: 'no-cache' })
        .then(function(r){ return r.ok ? r.json() : null; })
        .then(function(data){
          if (!data || !Array.isArray(data.testimonials) || data.testimonials.length === 0) return;
          renderTestimonials(mount, data.testimonials);
        })
        .catch(function(){ /* silent — empty state stays */ });
    }
  }

  function escapeHtml(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderTestimonials(target, list){
    var grid = document.createElement('div');
    grid.className = 'testimonials-grid';
    list.forEach(function(t){
      if (!t || !t.quote) return;
      var card = document.createElement('article');
      card.className = 'testimonial-card';

      var quoteEl = document.createElement('blockquote');
      quoteEl.className = 'testimonial-quote';
      quoteEl.textContent = t.quote;
      card.appendChild(quoteEl);

      var attr = document.createElement('div');
      attr.className = 'testimonial-attr';

      var avatar = document.createElement('div');
      avatar.className = 'testimonial-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      if (t.avatar) {
        var img = document.createElement('img');
        img.src = t.avatar;
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 38; img.height = 38;
        avatar.appendChild(img);
      } else {
        var initials = (t.initials || (t.name || '?').split(/\s+/).map(function(w){ return w[0]; }).join('').slice(0, 2)).toUpperCase();
        avatar.textContent = initials;
      }
      attr.appendChild(avatar);

      var meta = document.createElement('div');
      meta.className = 'testimonial-meta';
      var html = '';
      if (t.name) html += '<span class="name">' + escapeHtml(t.name) + '</span>';
      if (t.role) html += '<span class="role">' + escapeHtml(t.role) + '</span>';
      if (t.server) html += '<span class="server">' + escapeHtml(t.server) + '</span>';
      meta.innerHTML = html;

      if (t.link) {
        var wrap = document.createElement('a');
        wrap.href = t.link;
        wrap.rel = 'noopener';
        wrap.style.display = 'contents';
        wrap.appendChild(meta);
        attr.appendChild(wrap);
      } else {
        attr.appendChild(meta);
      }

      card.appendChild(attr);
      grid.appendChild(card);
    });
    if (grid.children.length) {
      target.innerHTML = '';
      target.appendChild(grid);
    }
  }
})();