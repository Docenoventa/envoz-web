/* Maqueta del back office: genera la imagen de Instagram de cada nota publicada
   con el diseño de En Voz y permite aprobarla o descartarla. No publica nada. */
(function () {
  'use strict';

  var API = 'https://prod.api.envoz.mx/envoz-public/article/';
  var IDS = ['17918dd6-dd4a-4a03-a646-7c5c723cbdf6', 'c66af518-0f1f-4c73-aad3-455e8d04d001', 'e977b5bc-ec56-4bf3-ae9b-1e1f38263e8d', '4323708e-d9c1-4a40-8f3c-be5f9427fcb4'];
  var NAMES = { 'agenda-publica': 'Agenda Pública', 'estados-cdmx': 'Estados / CDMX', 'internacional': 'Internacional', 'tendencias': 'Tendencias', 'entre-voces': 'Entre Voces' };
  var TAGS = { 'agenda-publica': '#AgendaPública', 'estados-cdmx': '#CDMX', 'internacional': '#Internacional', 'tendencias': '#Tendencias', 'entre-voces': '#EntreVoces' };
  var posts = [];
  var filter = 'pendiente';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function niceName(slug, raw) {
    if (NAMES[slug]) return NAMES[slug];
    var t = String(raw || slug || '').toLowerCase();
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  function timeAgo(iso) {
    var m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (isNaN(m)) return '';
    if (m < 60) return 'hace ' + Math.max(m, 1) + ' min';
    var h = Math.floor(m / 60);
    if (h < 24) return 'hace ' + h + (h === 1 ? ' hora' : ' horas');
    var d = Math.floor(h / 24);
    return 'hace ' + d + (d === 1 ? ' día' : ' días');
  }
  function firstSentence(body) {
    var t = String(body || '').replace(/^[^.]*?\d{4}\.\s?-\s?/, '').replace(/\s+/g, ' ').trim();
    var cut = t.search(/[.!?](\s|$)/);
    t = cut > 40 ? t.slice(0, cut + 1) : t.slice(0, 220);
    return t.length > 240 ? t.slice(0, 237) + '…' : t;
  }
  function titleSize(title) {
    var n = title.length;
    if (n <= 40) return 104;
    if (n <= 60) return 92;
    if (n <= 80) return 80;
    if (n <= 105) return 70;
    return 62;
  }
  function caption(p) {
    return p.title + '\n\n' + p.summary + '\n\nLee la nota completa en envoz.mx (enlace en la bio).\n\n#EnVoz ' + (TAGS[p.cat] || '#Noticias') + ' #Noticias #México';
  }

  function slim(a) {
    var m = a.media || {};
    return {
      id: a.articleId || a.slug, title: a.title, slug: a.slug,
      cat: a.category && a.category.slug, catName: a.category && a.category.name,
      img: m.imageLargeUrl || m.imageUrl || m.imageMediumUrl,
      publishAt: a.publishAt, summary: firstSentence(a.plainBody)
    };
  }
  function getJSON(path) {
    return fetch(API + path).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) { return (j.data && j.data.articles || []).map(slim); });
  }
  function load() {
    var calls = [getJSON('get-highlighted-articles'), getJSON('get-between-voices-articles?pagination%5Bpage%5D=1&pagination%5BrowsPerPage%5D=4')];
    IDS.forEach(function (id) { calls.push(getJSON('latest-articles?categoryId=' + id + '&pagination%5Bpage%5D=1&pagination%5BrowsPerPage%5D=6')); });
    return Promise.all(calls).then(function (r) { return [].concat.apply([], r); }).catch(function () {
      var s = window.ENVOZ_SNAPSHOT || {};
      return [].concat(s.highlighted || [], s.voces || [], s['agenda-publica'] || [], s.internacional || [], s.tendencias || [], s['estados-cdmx'] || [])
        .map(function (a) { return { id: a.slug, title: a.title, slug: a.slug, cat: a.cat, catName: a.catName, img: a.img, publishAt: a.publishAt, summary: firstSentence(a.excerpt) }; });
    });
  }

  function postImage(p) {
    var t = p.imgTitle || p.title;
    return '<div class="ig" role="img" aria-label="Vista previa para Instagram: ' + esc(t) + '"><div class="ig-canvas">' +
      '<img class="ig-photo" src="' + esc(p.img) + '" alt="" loading="lazy" referrerpolicy="no-referrer">' +
      '<div class="ig-top"></div><div class="ig-shade"></div>' +
      '<img class="ig-logo" src="assets/logo-white.svg" alt="">' +
      '<div class="ig-bottom"><span class="ig-pill">' + esc(niceName(p.cat, p.catName)) + '</span>' +
      '<h3 class="ig-title" style="font-size:' + titleSize(t) + 'px">' + esc(t) + '</h3></div>' +
      '<span class="ig-credit">Crédito: ' + esc(p.credit || 'Especial') + '</span>' +
      '</div></div>';
  }

  function card(p) {
    var label = { pendiente: 'Por aprobar', aprobada: 'Aprobada', descartada: 'Descartada' }[p.status];
    var actions = p.status === 'pendiente'
      ? '<button class="btn btn-red" data-act="aprobar" data-id="' + esc(p.id) + '">Aprobar y publicar</button>' +
        '<button class="btn btn-ghost" data-act="descartar" data-id="' + esc(p.id) + '">Descartar</button>'
      : '<button class="btn btn-ghost" data-act="regresar" data-id="' + esc(p.id) + '">Regresar a "Por aprobar"</button>';
    return '<article class="bo-card" data-id="' + esc(p.id) + '">' +
      '<div class="bo-meta"><span>' + esc(niceName(p.cat, p.catName)) + ' · ' + timeAgo(p.publishAt) + '</span><span class="bo-status ' + p.status + '">' + label + '</span></div>' +
      '<div class="ig-wrap">' + postImage(p) + '</div>' +
      '<div class="bo-meta"><a href="https://envoz.mx/articulo/' + esc(p.cat) + '/' + esc(p.slug) + '" target="_blank" rel="noopener">Ver la nota en envoz.mx</a></div>' +
      (p.status === 'pendiente'
        ? '<label>Título para la imagen<input data-field="imgTitle" data-id="' + esc(p.id) + '" value="' + esc(p.imgTitle || p.title) + '"></label>' +
          '<label>Crédito de la foto<input data-field="credit" data-id="' + esc(p.id) + '" value="' + esc(p.credit || 'Especial') + '"></label>' +
          '<label>Texto de la publicación<textarea data-field="caption" data-id="' + esc(p.id) + '">' + esc(p.caption) + '</textarea></label>'
        : '') +
      '<div class="bo-actions">' + actions + '</div></article>';
  }

  function counts() {
    var c = { pendiente: 0, aprobada: 0, descartada: 0 };
    posts.forEach(function (p) { c[p.status]++; });
    Object.keys(c).forEach(function (k) { document.getElementById('c-' + k).textContent = c[k]; });
    document.getElementById('side-count').textContent = c.pendiente;
    document.getElementById('quota').textContent = c.aprobada;
  }

  // Escala la publicación de 1080 × 1350 al ancho de su tarjeta
  function fit() {
    document.querySelectorAll('.ig').forEach(function (el) { el.style.setProperty('--s', String(el.clientWidth / 1080)); });
  }
  window.addEventListener('resize', fit);

  function render() {
    var list = posts.filter(function (p) { return p.status === filter; });
    var empty = { pendiente: 'No hay publicaciones pendientes. Cuando se publique una nota, su imagen aparecerá aquí.', aprobada: 'Todavía no se ha aprobado ninguna publicación.', descartada: 'No hay publicaciones descartadas.' }[filter];
    document.getElementById('posts').innerHTML = list.length ? list.map(card).join('') : '<p class="bo-empty">' + empty + '</p>';
    fit();
    counts();
  }

  var toastTimer;
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3800);
  }
  function find(id) { for (var i = 0; i < posts.length; i++) if (String(posts[i].id) === String(id)) return posts[i]; return null; }

  document.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-filter]');
    if (tab) {
      filter = tab.getAttribute('data-filter');
      document.querySelectorAll('[data-filter]').forEach(function (b) { b.setAttribute('aria-selected', String(b === tab)); });
      render(); return;
    }
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var p = find(btn.getAttribute('data-id'));
    if (!p) return;
    var act = btn.getAttribute('data-act');
    if (act === 'aprobar') {
      if (posts.filter(function (x) { return x.status === 'aprobada'; }).length >= 50) { toast('Se alcanzó el límite de 50 publicaciones de Instagram en 24 horas.'); return; }
      p.status = 'aprobada';
      toast('Aprobada. En el sistema real se publicaría ahora en Instagram @envozmxoficial.');
    } else if (act === 'descartar') {
      p.status = 'descartada';
      toast('Descartada. No se publicará en Instagram.');
    } else {
      p.status = 'pendiente';
    }
    render();
  });

  document.addEventListener('input', function (e) {
    var el = e.target.closest('[data-field]');
    if (!el) return;
    var p = find(el.getAttribute('data-id'));
    if (!p) return;
    var field = el.getAttribute('data-field');
    p[field] = el.value;
    if (field === 'imgTitle' || field === 'credit') {
      var wrap = el.closest('.bo-card').querySelector('.ig-wrap');
      wrap.innerHTML = postImage(p);
      fit();
    }
  });

  load().then(function (items) {
    var seen = {};
    posts = items.filter(function (a) {
      if (!a || !a.slug || seen[a.slug] || !a.img) return false;
      seen[a.slug] = true; return true;
    }).sort(function (a, b) { return String(b.publishAt).localeCompare(String(a.publishAt)); }).slice(0, 12)
      .map(function (a) { a.status = 'pendiente'; a.caption = caption(a); return a; });
    render();
  });
})();
