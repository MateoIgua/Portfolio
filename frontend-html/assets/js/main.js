// =====================================================================
// PORTFOLIO — main.js
// JavaScript mínimo. Solo lo necesario para que la status bar viva.
// =====================================================================

(function () {
    'use strict';

    // -----------------------------------------------------------------
    // Clock — actualiza HH:MM:SS en la status bar cada segundo
    // -----------------------------------------------------------------
    function updateClock() {
        const el = document.getElementById('clock');
        if (!el) return;
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        el.textContent = `${hh}:${mm}:${ss}`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    // -----------------------------------------------------------------
    // Boot log — pequeño guiño en la consola
    // -----------------------------------------------------------------
    console.log('%c' +
        '╔══════════════════════════════════════╗\n' +
        '║  MATEO IGUA — PORTFOLIO v2.0         ║\n' +
        '║  HTML + CSS · NO FRAMEWORKS          ║\n' +
        '║  https://github.com/MateoIgua        ║\n' +
        '╚══════════════════════════════════════╝',
        'color: #4af04a; font-family: monospace; font-size: 12px;'
    );

})();
