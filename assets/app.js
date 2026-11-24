/* En Voz — prototipo de mejoras
   Arma el encabezado, el menú, el buscador y el pie de página en todas las páginas,
   y en la portada carga las notas (en vivo si se puede; si no, desde data.js). */
(function () {
  'use strict';

  var SITE = 'https://envoz.mx';
  var LIVE_CHANNEL_ID = 'UC6mvc52_1j0okpAaXJj2c_Q'; // Canal oficial de Claudia Sheinbaum Pardo en YouTube
  var LIVE_URL = 'https://www.youtube.com/@ClaudiaSheinbaumP/live';
  var LIVE_CHANNEL_URL = 'https://www.youtube.com/@ClaudiaSheinbaumP/streams';
  var API = 'https://prod.api.envoz.mx/envoz-public/article/';
  var CATEGORIES = [
    { slug: 'entre-voces', name: 'Entre Voces' },
    { slug: 'agenda-publica', name: 'Agenda Pública' },
    { slug: 'estados-cdmx', name: 'Estados / CDMX' },
    { slug: 'internacional', name: 'Internacional' },
    { slug: 'tendencias', name: 'Tendencias' }
  ];
  var CATEGORY_IDS = {
    'agenda-publica': '17918dd6-dd4a-4a03-a646-7c5c723cbdf6',
    'estados-cdmx': 'c66af518-0f1f-4c73-aad3-455e8d04d001',
    'internacional': 'e977b5bc-ec56-4bf3-ae9b-1e1f38263e8d',
    'tendencias': '4323708e-d9c1-4a40-8f3c-be5f9427fcb4'
  };
  var INSTITUTIONAL = [
    { href: 'quienes-somos.html', name: 'Quiénes somos' },
    { href: 'quienes-somos.html#equipo', name: 'Nuestro equipo' },
    { href: 'quienes-somos.html#principios', name: 'Política editorial' },
    { href: 'contacto.html', name: 'Contacto' },
    { href: 'anunciate.html', name: 'Anúnciate con nosotros' },
    { href: 'aviso-de-privacidad.html', name: 'Aviso de privacidad' }
  ];
  var SOCIAL = [
    { name: 'Facebook', href: 'https://www.facebook.com/envozmxoficial', icon: 'facebook' },
    { name: 'Instagram', href: 'https://www.instagram.com/envozmxoficial/', icon: 'instagram' },
    { name: 'X', href: 'https://x.com/envozmxoficial', icon: 'x' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@envozmxoficial', icon: 'tiktok' },
    { name: 'YouTube', href: 'https://www.youtube.com/@envozmxoficial', icon: 'youtube' }
  ];

  var ICONS = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg>',
    mark: '<img src="assets/mark.svg" alt="" width="22" height="22">',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.1 1.8 11.6c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.3Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M14 8.5V6.8c0-.8.5-1 .9-1h2.4V2.1L14 2c-3.6 0-4.4 2.7-4.4 4.4v2.1H7.5v3.9h2.1V22H14v-9.6h3l.4-3.9H14Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-9.1a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM16.6 2H7.4A5.4 5.4 0 0 0 2 7.4v9.2A5.4 5.4 0 0 0 7.4 22h9.2a5.4 5.4 0 0 0 5.4-5.4V7.4A5.4 5.4 0 0 0 16.6 2Zm3.7 14.6a3.7 3.7 0 0 1-3.7 3.7H7.4a3.7 3.7 0 0 1-3.7-3.7V7.4a3.7 3.7 0 0 1 3.7-3.7h9.2a3.7 3.7 0 0 1 3.7 3.7v9.2Z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.3 6.3 0 1 0 5.3 6.2V8.6a8.1 8.1 0 0 0 4.7 1.5V6.8a4.7 4.7 0 0 1-4.7-4.8Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z"/></svg>'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function articleUrl(a) { return SITE + '/articulo/' + a.cat + '/' + a.slug; }
  function categoryUrl(slug) { return SITE + '/categoria/' + slug; }

  function timeAgo(iso) {
    var diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (isNaN(diff)) return '';
    if (diff < 60) return 'hace un momento';
    var units = [['año', 31536000], ['mes', 2592000], ['semana', 604800], ['día', 86400], ['hora', 3600], ['minuto', 60]];
    for (var i = 0; i < units.length; i++) {
      var n = Math.floor(diff / units[i][1]);
      if (n >= 1) {
        var word = units[i][0];
        var plural = n === 1 ? word : (word === 'mes' ? 'meses' : word + 's');
        return 'hace ' + n + ' ' + plural;
      }
    }
    return '';
  }

  /* ---------------- Partes comunes ---------------- */
  function protoBar() {
    return '<div class="proto-bar" role="note"><div class="container">' +
      '<span><strong>Prototipo de mejoras</strong> · Versión de prueba de En Voz, no es el sitio oficial.</span>' +
      '<button class="proto-toggle" type="button" aria-pressed="false" id="toggle-mejoras">Resaltar mejoras</button>' +
      '</div></div>';
  }

  function header(current) {
    var cats = CATEGORIES.map(function (c) {
      return '<li><a href="' + categoryUrl(c.slug) + '"' + (current === c.slug ? ' aria-current="page"' : '') + '>' + esc(c.name) + '</a></li>';
    }).join('');
    return '<header class="site-header">' +
      '<div class="container header-top">' +
        '<button class="icon-btn mejora" data-mejora="Menú completo" type="button" id="open-menu" aria-label="Abrir menú">' + ICONS.menu + '</button>' +
        '<a class="logo" href="index.html" aria-label="En Voz, ir a la portada"><img src="assets/logo.svg" alt="En Voz" width="160" height="40"></a>' +
        '<button class="icon-btn mejora" data-mejora="Buscador" type="button" id="open-search" aria-label="Buscar notas">' + ICONS.search + '</button>' +
      '</div>' +
      '<nav class="cat-nav" aria-label="Secciones"><ul>' + cats + '</ul></nav>' +
      '</header>';
  }

  function drawer() {
    var cats = CATEGORIES.map(function (c) { return '<li><a href="' + categoryUrl(c.slug) + '">' + esc(c.name) + '</a></li>'; }).join('');
    var inst = INSTITUTIONAL.map(function (p) { return '<li><a href="' + p.href + '">' + esc(p.name) + '</a></li>'; }).join('');
    return '<div class="drawer-backdrop" id="drawer-backdrop"></div>' +
      '<aside class="drawer" id="drawer" aria-label="Menú" aria-hidden="true">' +
        '<div class="drawer-head"><img src="assets/logo.svg" alt="En Voz"><button class="icon-btn" type="button" id="close-menu" aria-label="Cerrar menú">' + ICONS.close + '</button></div>' +
        '<h2>Secciones</h2><ul>' + cats + '</ul>' +
        '<h2>El medio</h2><ul>' + inst + '</ul>' +
        '<h2>Recibe En Voz</h2><ul><li><a href="index.html#suscribete">Edición diaria en PDF</a></li></ul>' +
      '</aside>';
  }

  function searchPanel() {
    return '<div class="search-panel" id="search-panel" role="dialog" aria-modal="true" aria-label="Buscar notas"><div class="container">' +
      '<div class="search-row"><label class="sr-only" for="search-input">Buscar</label>' +
        '<input id="search-input" type="search" placeholder="¿Qué estás buscando?" autocomplete="off">' +
        '<button class="icon-btn" type="button" id="close-search" aria-label="Cerrar buscador">' + ICONS.close + '</button></div>' +
      '<p class="search-hint" id="search-hint">Escribe al menos 3 letras. En el prototipo se busca entre las notas recientes de la portada; en el sitio real buscaría en todo el archivo.</p>' +
      '<ul class="search-results" id="search-results"></ul>' +
      '</div></div>';
  }

  function footer() {
    var cats = CATEGORIES.map(function (c) { return '<li><a href="' + categoryUrl(c.slug) + '">' + esc(c.name) + '</a></li>'; }).join('');
    var inst = INSTITUTIONAL.map(function (p) { return '<li><a href="' + p.href + '">' + esc(p.name) + '</a></li>'; }).join('');
    var social = SOCIAL.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="En Voz en ' + s.name + '">' + ICONS[s.icon] + '</a>';
    }).join('');
    var year = new Date().getFullYear();
    return '<footer class="site-footer"><div class="container">' +
      '<div class="footer-cols">' +
        '<div><h2>Categorías</h2><ul>' + cats + '</ul></div>' +
        '<div class="mejora" data-mejora="Nuevo"><h2>El medio</h2><ul>' + inst + '</ul></div>' +
        '<div class="mejora" data-mejora="Nuevo"><h2>Recibe En Voz</h2><ul>' +
          '<li><a href="index.html#suscribete">Edición diaria en PDF</a></li>' +
          '<li><a href="index.html#suscribete">Canal de WhatsApp</a></li>' +
          '<li><a href="index.html#suscribete">Canal de Telegram</a></li>' +
          '<li><a href="index.html#suscribete">Newsletter por correo</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-mid"><a href="index.html" aria-label="En Voz, ir a la portada"><img src="assets/logo-white.svg" alt="En Voz"></a>' +
        '<div class="social mejora" data-mejora="Enlaces reales"><span>SÍGUENOS EN</span>' + social + '</div></div>' +
      '<div class="footer-legal"><span>© ' + year + ' En Voz. Todos los derechos reservados.</span>' +
        '<span><a href="aviso-de-privacidad.html">Aviso de privacidad</a> · <a href="contacto.html">Contacto</a></span></div>' +
      '</div></footer>' +
      '<button class="to-top" type="button" id="to-top" aria-label="Volver arriba">' + ICONS.up + '</button>';
  }

  /* ---------------- Datos ---------------- */
  function slim(a) {
    var m = a.media || {};
    return {
      title: a.title, slug: a.slug,
      cat: a.category && a.category.slug, catName: a.category && a.category.name,
      img: m.imageMediumUrl || m.imageUrl || m.imageSmallUrl,
      publishAt: a.publishAt,
      excerpt: (a.plainBody || '').replace(/^[^.]*?\d{4}\.\s?-\s?/, '').slice(0, 200)
    };
  }
  function getJSON(path) {
    var ctrl = window.AbortController ? new AbortController() : null;
    var t = setTimeout(function () { if (ctrl) ctrl.abort(); }, 6000);
    return fetch(API + path, ctrl ? { signal: ctrl.signal } : {}).then(function (r) {
      clearTimeout(t);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (j) { return (j.data && j.data.articles || []).map(slim); });
  }
  function latest(slug, n) {
    return getJSON('latest-articles?categoryId=' + CATEGORY_IDS[slug] + '&pagination%5Bpage%5D=1&pagination%5BrowsPerPage%5D=' + n);
  }
  function loadData() {
    return Promise.all([
      getJSON('get-highlighted-articles'),
      getJSON('get-between-voices-articles?pagination%5Bpage%5D=1&pagination%5BrowsPerPage%5D=6'),
      latest('agenda-publica', 7), latest('estados-cdmx', 7), latest('internacional', 7), latest('tendencias', 7)
    ]).then(function (r) {
      return { live: true, highlighted: r[0], voces: r[1], 'agenda-publica': r[2], 'estados-cdmx': r[3], internacional: r[4], tendencias: r[5] };
    }).catch(function () {
      var s = window.ENVOZ_SNAPSHOT || {};
      s.live = false;
      return s;
    });
  }

  /* ---------------- Tarjetas ---------------- */
  function img(a, cls) {
    return '<img class="' + (cls || 'thumb') + '" src="' + esc(a.img) + '" alt="" loading="lazy" decoding="async">';
  }
  function heroMain(a) {
    return '<a class="hero-main card-link" href="' + articleUrl(a) + '">' +
      '<img src="' + esc(a.img) + '" alt="" fetchpriority="high">' +
      '<div class="body"><div class="kicker">' + esc(a.catName) + '</div>' +
      '<h2 class="title-bar">' + esc(a.title) + '</h2>' +
      (a.excerpt ? '<p class="excerpt clamp-2">' + esc(a.excerpt) + '</p>' : '') +
      '<div class="time">' + timeAgo(a.publishAt) + '</div></div></a>';
  }
  function sideCard(a) {
    return '<a class="side-card card-link" href="' + articleUrl(a) + '">' + img(a, '') +
      '<div><div class="kicker">' + esc(a.catName) + '</div><h3 class="title-bar clamp-2">' + esc(a.title) + '</h3>' +
      '<div class="time">' + timeAgo(a.publishAt) + '</div></div></a>';
  }
  function carouselCard(a) {
    return '<a class="c-card card-link" href="' + articleUrl(a) + '">' + img(a) +
      '<h3 class="title-bar clamp-2">' + esc(a.title) + '</h3><div class="time">' + timeAgo(a.publishAt) + '</div></a>';
  }
  function bigCard(a) {
    return '<a class="big card-link" href="' + articleUrl(a) + '">' + img(a) +
      '<h3 class="title-bar">' + esc(a.title) + '</h3><div class="time">' + timeAgo(a.publishAt) + '</div></a>';
  }
  function miniCard(a) {
    return '<a class="mini card-link" href="' + articleUrl(a) + '">' + img(a, '') +
      '<div><h3 class="title-bar clamp-3">' + esc(a.title) + '</h3><div class="time">' + timeAgo(a.publishAt) + '</div></div></a>';
  }
  function rowItem(a) {
    return '<a class="row-item card-link" href="' + articleUrl(a) + '"><div><h3 class="title-bar clamp-2">' + esc(a.title) + '</h3>' +
      '<div class="time">' + timeAgo(a.publishAt) + '</div></div>' + img(a, '') + '</a>';
  }
  function sectionHead(title, id, withArrows) {
    return '<div class="section-head"><h2 class="section-title" id="' + id + '">' + ICONS.mark + esc(title) + '</h2>' +
      (withArrows ? '<div class="arrows"><button type="button" data-scroll="' + id + '" data-dir="-1" aria-label="Anteriores">' + ICONS.left + '</button>' +
        '<button type="button" data-scroll="' + id + '" data-dir="1" aria-label="Siguientes">' + ICONS.right + '</button></div>' : '') +
      '</div>';
  }

  var ALL = [];
  function remember(list) {
    (list || []).forEach(function (a) {
      if (!ALL.some(function (b) { return b.slug === a.slug; })) ALL.push(a);
    });
  }

  /* ---------------- Mañanera en vivo ---------------- */
  // Hora del centro de México (UTC-6, sin horario de verano desde 2023)
  function mexicoNow() {
    var now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000 - 6 * 3600000);
  }
  function liveStatus() {
    var t = mexicoNow();
    var day = t.getDay();               // 0 domingo … 6 sábado
    var mins = t.getHours() * 60 + t.getMinutes();
    var weekday = day >= 1 && day <= 5;
    var START = 7 * 60 + 25, END = 10 * 60 + 30;
    if (weekday && mins >= START && mins < END) return 'live';
    if (weekday && mins >= 6 * 60 && mins < START) return 'soon:' + (7 * 60 + 30 - mins);
    var next;
    if (weekday && mins < 6 * 60) next = 'hoy a las 7:30 h';
    else if (day >= 1 && day <= 4) next = 'mañana a las 7:30 h';
    else next = 'el lunes a las 7:30 h';
    return next;
  }
  function liveBox() {
    var st = liveStatus();
    var isLive = st === 'live';
    var isSoon = st.indexOf('soon:') === 0;
    var player, badge;
    if (isLive) {
      player = '<div class="live-player"><iframe src="https://www.youtube-nocookie.com/embed/live_stream?channel=' + LIVE_CHANNEL_ID + '&autoplay=1&mute=1" title="Mañanera en vivo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
      badge = '<span class="live-badge on"><span class="dot"></span>EN VIVO</span>';
    } else if (isSoon) {
      var m = Number(st.slice(5));
      var label = m >= 60 ? 'Comienza en ' + Math.floor(m / 60) + ' h ' + (m % 60) + ' min' : 'Comienza en ' + m + ' min';
      player = '<a class="live-player live-off" href="' + LIVE_URL + '" target="_blank" rel="noopener">' +
        '<span class="live-off-inner"><span class="play">▶</span><span class="countdown">' + label + '</span><span>Hoy a las 7:30 h desde Palacio Nacional</span></span></a>';
      badge = '<span class="live-badge soon"><span class="dot"></span>HOY · 7:30 H</span>';
    } else {
      player = '<a class="live-player live-off" href="' + LIVE_URL + '" target="_blank" rel="noopener">' +
        '<span class="live-off-inner"><span class="play">▶</span><span>La transmisión inicia ' + esc(st) + '</span></span></a>';
      badge = '<span class="live-badge"><span class="dot"></span>PRÓXIMA TRANSMISIÓN</span>';
    }
    return '<section class="live-box mejora" data-mejora="Nuevo: mañanera en vivo" aria-labelledby="live-title">' +
      player +
      '<div class="live-info">' + badge +
        '<h2 id="live-title"><a href="' + LIVE_URL + '" target="_blank" rel="noopener">La Mañanera del Pueblo</a></h2>' +
        '<p>Conferencia de prensa matutina de la presidenta Claudia Sheinbaum desde Palacio Nacional. De lunes a viernes, a partir de las 7:30 h (hora del centro de México).</p>' +
        '<a class="btn btn-red" href="' + LIVE_URL + '" target="_blank" rel="noopener">Ver en vivo en YouTube</a>' +
        '<span class="live-source">Transmisión del canal oficial @ClaudiaSheinbaumP</span>' +
      '</div></section>';
  }

  function renderHome(d) {
    var root = document.getElementById('home');
    if (!root) return;
    ['highlighted', 'voces', 'agenda-publica', 'estados-cdmx', 'internacional', 'tendencias'].forEach(function (k) { remember(d[k]); });

    var h = d.highlighted || [];
    var html = liveBox();
    if (h.length) {
      html += '<section class="hero" aria-label="Lo más importante">' + heroMain(h[0]) +
        '<div class="hero-side">' + h.slice(1, 5).map(sideCard).join('') + '</div></section>';
    }
    if ((d.voces || []).length) {
      html += '<section class="section" aria-labelledby="sec-voces">' + sectionHead('Entre voces', 'sec-voces', true) +
        '<div class="carousel" data-carousel="sec-voces">' + d.voces.map(carouselCard).join('') + '</div></section>';
    }
    html += blockSection('Agenda pública', 'sec-agenda', 'agenda-publica', d['agenda-publica']);

    var est = d['estados-cdmx'] || [];
    if (est.length) {
      html += '<section class="section mejora" data-mejora="Sin espacios vacíos" aria-labelledby="sec-estados">' + sectionHead('Estados / CDMX', 'sec-estados') +
        '<div class="list-block">' + bigCard(est[0]) + '<div class="rows">' + est.slice(1, 6).map(rowItem).join('') + '</div></div>' +
        '<a class="see-all" href="' + categoryUrl('estados-cdmx') + '">Ver todas</a></section>';
    }

    html += subscribeBand();
    html += blockSection('Internacional', 'sec-internacional', 'internacional', d.internacional);

    var tr = d.tendencias || [];
    if (tr.length) {
      html += '<section class="section mejora" data-mejora="Carrusel completo" aria-labelledby="sec-tendencias">' + sectionHead('Tendencias', 'sec-tendencias', true) +
        '<div class="carousel" data-carousel="sec-tendencias">' + tr.map(carouselCard).join('') + '</div></section>';
    }

    if (!d.live) {
      html += '<p class="notice">Este prototipo muestra una copia de las notas del 24 de noviembre de 2026, porque el navegador no permitió leerlas en vivo desde la API de envoz.mx. Al dar clic en una nota se abre en el sitio oficial.</p>';
    }
    root.innerHTML = html;
    bindCarousels();
    // Revisa cada minuto si ya empezó (o terminó) la transmisión y actualiza el recuadro
    var lastStatus = liveStatus();
    setInterval(function () {
      var now = liveStatus();
      if (now !== lastStatus) {
        lastStatus = now;
        var box = document.querySelector('.live-box');
        if (box) box.outerHTML = liveBox();
      }
    }, 60000);
  }

  function blockSection(title, id, slug, list) {
    list = list || [];
    if (!list.length) return '';
    return '<section class="section" aria-labelledby="' + id + '">' + sectionHead(title, id) +
      '<div class="block">' + bigCard(list[0]) + list.slice(1, 5).map(miniCard).join('') + '</div>' +
      '<a class="see-all" href="' + categoryUrl(slug) + '">Ver todas</a></section>';
  }

  function subscribeBand() {
    return '<section class="subscribe mejora" data-mejora="Nuevo: suscripción" id="suscribete" aria-labelledby="sub-title">' +
      '<div><h2 id="sub-title">Recibe la edición diaria de En Voz</h2>' +
      '<p>Cada noche te enviamos en PDF lo más importante del día: Primera Plana, Voces, Nacional, Metrópoli y Tendencias & Mundo. Gratis, en tu WhatsApp, Telegram o correo.</p></div>' +
      '<div class="subscribe-actions">' +
        '<a class="btn btn-red" href="#" data-pending="WhatsApp">' + ICONS.whatsapp + 'Únete al canal de WhatsApp</a>' +
        '<a class="btn btn-outline" href="#" data-pending="Telegram">' + ICONS.telegram + 'Únete al canal de Telegram</a>' +
        '<form class="email-form" onsubmit="event.preventDefault(); this.innerHTML=\'<p>¡Gracias! En el sitio real aquí se confirmaría tu suscripción.</p>\';">' +
          '<label class="sr-only" for="sub-email">Tu correo</label><input id="sub-email" type="email" required placeholder="Tu correo electrónico">' +
          '<button class="btn btn-light" type="submit">Suscribirme</button></form>' +
      '</div></section>';
  }

  function bindCarousels() {
    document.querySelectorAll('[data-scroll]').forEach(function (b) {
      b.addEventListener('click', function () {
        var c = document.querySelector('[data-carousel="' + b.getAttribute('data-scroll') + '"]');
        if (c) c.scrollBy({ left: Number(b.getAttribute('data-dir')) * c.clientWidth, behavior: 'smooth' });
      });
    });
    document.querySelectorAll('[data-pending]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Aquí irá el enlace al canal de ' + a.getAttribute('data-pending') + ' de En Voz.');
      });
    });
  }

  /* ---------------- Buscador ---------------- */
  function normalize(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function runSearch(q) {
    var list = document.getElementById('search-results');
    var hint = document.getElementById('search-hint');
    var nq = normalize(q.trim());
    if (nq.length < 3) { list.innerHTML = ''; return; }
    var words = nq.split(/\s+/);
    var found = ALL.filter(function (a) {
      var hay = normalize(a.title + ' ' + a.catName + ' ' + (a.excerpt || ''));
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    });
    hint.textContent = found.length ? found.length + (found.length === 1 ? ' resultado' : ' resultados') : 'No encontramos notas con esas palabras.';
    list.innerHTML = found.map(function (a) {
      return '<li><a href="' + articleUrl(a) + '">' + img(a, '') + '<div><div class="kicker">' + esc(a.catName) + '</div>' +
        '<div class="title-bar">' + esc(a.title) + '</div></div></a></li>';
    }).join('');
  }

  /* ---------------- Arranque ---------------- */
  function init() {
    var current = document.body.getAttribute('data-current') || '';
    document.body.insertAdjacentHTML('afterbegin', protoBar() + header(current) + drawer() + searchPanel());
    document.body.insertAdjacentHTML('beforeend', footer());

    var toggle = document.getElementById('toggle-mejoras');
    var on = /[?&]mejoras=1/.test(location.search);
    try { if (sessionStorage.getItem('envoz-mejoras') === '1') on = true; } catch (e) {}
    function setMejoras(v) {
      document.body.classList.toggle('show-mejoras', v);
      toggle.setAttribute('aria-pressed', String(v));
      toggle.textContent = v ? 'Ocultar mejoras' : 'Resaltar mejoras';
      try { sessionStorage.setItem('envoz-mejoras', v ? '1' : '0'); } catch (e) {}
    }
    setMejoras(on);
    toggle.addEventListener('click', function () { setMejoras(!document.body.classList.contains('show-mejoras')); });

    var drawerEl = document.getElementById('drawer');
    function setDrawer(v) { document.body.classList.toggle('drawer-open', v); drawerEl.setAttribute('aria-hidden', String(!v)); }
    document.getElementById('open-menu').addEventListener('click', function () { setDrawer(true); });
    document.getElementById('close-menu').addEventListener('click', function () { setDrawer(false); });
    document.getElementById('drawer-backdrop').addEventListener('click', function () { setDrawer(false); });

    var input = document.getElementById('search-input');
    function setSearch(v) { document.body.classList.toggle('search-open', v); if (v) setTimeout(function () { input.focus(); }, 30); }
    document.getElementById('open-search').addEventListener('click', function () { setSearch(true); });
    document.getElementById('close-search').addEventListener('click', function () { setSearch(false); });
    input.addEventListener('input', function () { runSearch(input.value); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setSearch(false); setDrawer(false); }
    });

    var top = document.getElementById('to-top');
    window.addEventListener('scroll', function () { top.classList.toggle('visible', window.scrollY > 600); }, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    loadData().then(function (d) {
      remember([].concat(d.highlighted || [], d.voces || [], d['agenda-publica'] || [], d['estados-cdmx'] || [], d.internacional || [], d.tendencias || []));
      renderHome(d);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
