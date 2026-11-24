// Ejemplo para la maqueta "Mañanera en vivo".
// Temas reales de la mañanera del martes 24 de noviembre de 2026, tomados de la cobertura
// pública de ese día y redactados como lo haría la IA (propuestas para el editor).
// Los cortes son aproximados. En el sistema real, la IA trabaja sobre la transcripción
// de la señal oficial y marca el minuto exacto de cada frase.
window.MANANERA_DEMO = {
  fecha: 'Martes 24 de noviembre de 2026',
  cortes: [
    { id: 'c0800', hora: '8:00', rango: '7:30 a 8:00', estado: 'listo' },
    { id: 'c0830', hora: '8:30', rango: '8:00 a 8:30', estado: 'listo' },
    { id: 'c0900', hora: '9:00', rango: '8:30 a 9:00', estado: 'listo' },
    { id: 'c0930', hora: '9:30', rango: '9:00 a 9:30', estado: 'en curso' }
  ],
  temas: [
    {
      id: 't1', corte: 'c0800', tema: 'Salud', seccion: 'Agenda Pública', relevancia: 'Alta',
      titulo: 'Arranca la asignación de médicos y enfermeros para los consultorios del Servicio Universal de Salud',
      entrada: 'El gobierno federal inició la asignación del personal que atenderá los consultorios de atención primaria del nuevo Servicio Universal de Salud, que comenzó su capacitación el lunes.',
      porque: 'Es el arranque operativo del nuevo modelo de atención primaria; afecta a millones de usuarios.',
      datos: ['El personal de los consultorios inició su capacitación el lunes 23.', 'Bienestar reportó avances en las asambleas comunitarias para instalar los consultorios.'],
      voces: 'Eduardo Clark, subsecretario de Salud; Leticia Ramírez, secretaria de Bienestar',
      clip: 'Intervención del subsecretario Eduardo Clark sobre la asignación de personal',
      frase: ''
    },
    {
      id: 't2', corte: 'c0830', tema: 'IMSS', seccion: 'Agenda Pública', relevancia: 'Media',
      titulo: 'IMSS reporta nuevos aceleradores, tomógrafos y mastógrafos en operación',
      entrada: 'El IMSS presentó el avance de su programa de equipamiento médico, con enlace desde el Hospital General Regional de Tecámac, y reportó avances en la basificación de sus trabajadores.',
      porque: 'Datos concretos de inversión en salud; buen material para gráfico en redes.',
      datos: ['Dos de tres aceleradores lineales nuevos ya funcionan.', 'Ocho tomógrafos y 63 mastógrafos, con cerca de 57 mil atenciones a mujeres.', 'Avanza la basificación de trabajadores del IMSS.'],
      voces: 'IMSS; Zoé Robledo, director general',
      clip: 'Enlace en vivo desde el Hospital General Regional de Tecámac',
      frase: 'ya dos de los tres aceleradores lineales nuevos ya están funcionando'
    },
    {
      id: 't3', corte: 'c0900', tema: 'Tecnología', seccion: 'Negocios', relevancia: 'Alta',
      titulo: 'Una de cada diez consultas a ChatGPT en México es sobre salud, dice la Presidenta',
      entrada: 'La presidenta Claudia Sheinbaum compartió un dato que, según dijo, le dio el director de OpenAI: el 10% de las consultas que se hacen en ChatGPT desde México tienen que ver con salud.',
      porque: 'Tema de conversación en redes y cruce entre tecnología y salud; ideal para Negocios y Tendencias.',
      datos: ['El dato fue atribuido al director de la empresa creadora de ChatGPT.', 'El gobierno aclaró que esta tecnología no sustituirá la atención médica.'],
      voces: 'Claudia Sheinbaum, Presidenta de México',
      clip: 'Momento en que la Presidenta comparte el dato de ChatGPT',
      frase: ''
    },
    {
      id: 't4', corte: 'c0930', tema: 'Salud', seccion: 'Agenda Pública', relevancia: 'Alta',
      titulo: 'México registra 12 casos activos de sarampión, concentrados en Chiapas',
      entrada: 'El secretario de Salud, David Kershenobich, informó que el país tiene 12 casos activos de sarampión, la mayoría en Chiapas, y advirtió que siempre existe el riesgo de casos importados.',
      porque: 'Seguimiento directo de una nota de En Voz sobre la pérdida del estatus de país libre de sarampión.',
      datos: ['12 casos activos, concentrados en Chiapas.', 'Riesgo de brotes importados.', 'Salud confía en recuperar el estatus de país libre de sarampión.'],
      voces: 'David Kershenobich, secretario de Salud',
      clip: 'Reporte del secretario de Salud sobre casos de sarampión',
      frase: '',
      relacionada: { titulo: 'México, Estados Unidos y Bolivia pierden el estatus de países libres de sarampión: OPS', url: 'https://envoz.mx/articulo/agenda-publica/mexico-estados-unidos-y-bolivia-pierden-el-estatus-de-paises-libres-de-sarampion-ops' }
    },
    {
      id: 't5', corte: 'c0930', tema: 'Gobierno digital', seccion: 'Tendencias', relevancia: 'Media',
      titulo: 'Gobierno desconectó páginas oficiales por fallas de seguridad; ya fueron restablecidas',
      entrada: 'La Presidenta informó que algunas páginas del Gobierno de México se desconectaron de forma preventiva por fallas críticas de seguridad en PHP, y que ya fueron restablecidas tras las revisiones.',
      porque: 'Explica caídas de sitios oficiales que los lectores pudieron notar.',
      datos: ['La desconexión fue preventiva.', 'El origen: fallas críticas de seguridad en PHP.', 'Los sitios ya fueron restablecidos.'],
      voces: 'Claudia Sheinbaum, Presidenta de México',
      clip: 'Explicación sobre la desconexión de sitios oficiales',
      frase: ''
    }
  ],
  agenda: 'El próximo martes, especialistas explicarán la estrategia de abasto de medicamentos del IMSS-Bienestar.'
};
