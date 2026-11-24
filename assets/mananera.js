/* Maqueta "Mañanera en vivo" del back office. No publica nada. */
(function () {
  'use strict';
  var D = window.MANANERA_DEMO;
  if (!D) return;
  var EQUIPO = ['Sin asignar', 'Luis Pacheco', 'León Soto', 'Karina', 'Andrea'];
  var actual = D.cortes[D.cortes.length - 1].id;
  var estado = {}; // id de tema -> 'nuevo' | 'borrador' | 'redes' | 'descartado'

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('show'); }, 3800);
  }
  function corte(id) { for (var i = 0; i < D.cortes.length; i++) if (D.cortes[i].id === id) return D.cortes[i]; return null; }

  function renderCortes() {
    document.getElementById('mz-cortes').innerHTML = D.cortes.map(function (c) {
      var n = D.temas.filter(function (t) { return t.corte === c.id; }).length;
      return '<button role="tab" aria-selected="' + (c.id === actual) + '" data-corte="' + c.id + '">' +
        '<b>Corte ' + esc(c.hora) + '</b><small>' + esc(c.rango) + ' · ' + n + (n === 1 ? ' tema' : ' temas') + (c.estado === 'en curso' ? ' · en curso' : '') + '</small></button>';
    }).join('') +
    '<div class="mz-next"><small>Siguiente corte</small><b>10:00</b></div>';
  }

  function igMini(t) {
    return '<div class="ig mz-ig" role="img" aria-label="Imagen sugerida para redes: ' + esc(t.titulo) + '"><div class="ig-canvas">' +
      '<div class="mz-frame"><span>Cuadro de la transmisión</span></div>' +
      '<div class="ig-top"></div><div class="ig-shade"></div>' +
      '<img class="ig-logo" src="assets/logo-white.svg" alt="">' +
      '<div class="ig-bottom"><span class="ig-pill">' + esc(t.seccion) + '</span>' +
      '<h3 class="ig-title" style="font-size:' + (t.titulo.length <= 70 ? 84 : t.titulo.length <= 95 ? 72 : 62) + 'px">' + esc(t.titulo) + '</h3></div>' +
      '<span class="ig-credit">Crédito: Presidencia</span></div></div>';
  }

  function card(t) {
    var st = estado[t.id] || 'nuevo';
    var badge = { nuevo: 'Nuevo', borrador: 'Borrador creado', redes: 'Enviado a redes', descartado: 'Descartado' }[st];
    return '<article class="mz-card' + (st === 'descartado' ? ' off' : '') + '">' +
      '<div class="mz-meta"><span class="mz-tema">' + esc(t.tema) + '</span><span>Sección sugerida: <b>' + esc(t.seccion) + '</b></span>' +
        '<span class="mz-rel ' + (t.relevancia === 'Alta' ? 'alta' : '') + '">Relevancia ' + esc(t.relevancia.toLowerCase()) + '</span>' +
        '<span class="bo-status ' + (st === 'nuevo' ? '' : st === 'descartado' ? 'descartada' : 'aprobada') + '">' + badge + '</span></div>' +
      '<div class="mz-body">' +
        '<div class="mz-text">' +
          '<label>Título propuesto<input value="' + esc(t.titulo) + '"></label>' +
          '<label>Entrada propuesta<textarea>' + esc(t.entrada) + '</textarea></label>' +
          '<p class="mz-why"><b>Por qué importa:</b> ' + esc(t.porque) + '</p>' +
          '<div class="mz-cols">' +
            '<div><h4>Datos clave</h4><ul>' + t.datos.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul></div>' +
            '<div><h4>Quién lo dijo</h4><p>' + esc(t.voces) + '</p>' +
              (t.frase ? '<h4>Frase textual</h4><blockquote>“' + esc(t.frase) + '”<small>Verificar en el video · minuto exacto marcado</small></blockquote>' : '') +
            '</div>' +
          '</div>' +
          (t.relacionada ? '<p class="mz-relnote"><b>Contexto de En Voz:</b> <a href="' + esc(t.relacionada.url) + '" target="_blank" rel="noopener">' + esc(t.relacionada.titulo) + '</a></p>' : '') +
        '</div>' +
        '<div class="mz-media">' +
          igMini(t) +
          '<div class="mz-clip"><span class="mz-play">▶</span><div><b>Clip sugerido · 45 s</b><small>' + esc(t.clip) + '</small></div></div>' +
        '</div>' +
      '</div>' +
      '<div class="mz-actions">' +
        '<label class="mz-assign">Asignar a<select data-assign="' + t.id + '">' + EQUIPO.map(function (p) { return '<option>' + esc(p) + '</option>'; }).join('') + '</select></label>' +
        '<button class="btn btn-red" data-mz="borrador" data-id="' + t.id + '">Crear borrador de nota</button>' +
        '<button class="btn btn-ghost" data-mz="redes" data-id="' + t.id + '">Preparar para redes</button>' +
        '<button class="btn btn-ghost" data-mz="descartado" data-id="' + t.id + '">Descartar</button>' +
      '</div></article>';
  }

  function renderTemas() {
    var c = corte(actual);
    var list = D.temas.filter(function (t) { return t.corte === actual; });
    var head = '<p class="mz-corte-head"><b>Corte de las ' + esc(c.hora) + '</b> · Temas detectados de ' + esc(c.rango) + (c.estado === 'en curso' ? ' (se sigue actualizando)' : '') + '</p>';
    document.getElementById('mz-temas').innerHTML = head + (list.length ? list.map(card).join('') : '<p class="bo-empty">Sin temas nuevos en este corte.</p>');
    document.querySelectorAll('.ig').forEach(function (el) { el.style.setProperty('--s', String(el.clientWidth / 1080)); });
  }

  document.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-corte]');
    if (tab) { actual = tab.getAttribute('data-corte'); renderCortes(); renderTemas(); return; }
    var b = e.target.closest('[data-mz]');
    if (!b) return;
    var id = b.getAttribute('data-id'), act = b.getAttribute('data-mz');
    var sel = document.querySelector('[data-assign="' + id + '"]');
    var quien = sel ? sel.value : 'Sin asignar';
    estado[id] = act;
    if (act === 'borrador') toast('Se abriría el editor del panel con el título, la entrada y los datos' + (quien !== 'Sin asignar' ? ', asignado a ' + quien : '') + '.');
    else if (act === 'redes') toast('La imagen y el clip pasarían a "Redes por aprobar" para elegir redes y publicar.');
    else toast('Tema descartado.');
    renderTemas();
  });
  window.addEventListener('resize', renderTemas);

  document.getElementById('mz-fecha').textContent = D.fecha;
  document.getElementById('mz-agenda').textContent = D.agenda;
  renderCortes();
  renderTemas();
})();
