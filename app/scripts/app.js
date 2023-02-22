(function() {
  'use strict';

  window.CellsPolymer.start({
    routes: {
      'login': '/',
      'dashboard': '/dashboard',
      'card': '/card',
      'movement-detail': '/movement/:id/:label',
      'help': '/help'
    }
  });
}());
