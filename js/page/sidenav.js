document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var elem = document.querySelectorAll('.sidenav')[0];
    var instances = M.Sidenav.init(elems, '');
    var instance = M.Sidenav.getInstance(elem);
  });