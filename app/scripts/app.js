(function() {
  'use strict';

  window.CellsPolymer.start({
    routes: {
      'login': '/',
      'dashboard': '/dashboard',
      'movement-detail': '/movement/:id/:label',
      'help': '/help'
    }
  });
}());
